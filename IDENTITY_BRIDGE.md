# 🌉 Identity Bridge - Flow → App

## Arquitectura

```
flow.smarterbot.cl          app.smarterbot.cl
(Twilio Auth - Liviano)     (Clerk + Keyri - Fuerte)
        │                           │
        │  redirect con token       │
        ├──────────────────────────►│
        │                           │
        │                           │
    Twilio OTP                  Clerk Session
    Phone verified              + Keyri Biometric
                                + Pagos
                                + n8n Execution
```

---

## Flujo de Implementación

### 1. Flow (Twilio Login) → Generar Token

```typescript
// flow.smarterbot.cl/lib/auth-bridge.ts
import jwt from 'jsonwebtoken'

export interface FlowAuthPayload {
  phone: string
  verified: boolean
  product_id?: string
  cart?: any[]
  timestamp: number
}

export function generateBridgeToken(payload: FlowAuthPayload): string {
  const token = jwt.sign(
    payload,
    process.env.BRIDGE_JWT_SECRET!,
    { expiresIn: '15m' } // Token válido por 15 minutos
  )
  return token
}

// Cuando usuario hace click en "Comprar"
export function createCheckoutRedirect(
  phone: string,
  productId: string,
  cart?: any[]
): string {
  const token = generateBridgeToken({
    phone,
    verified: true,
    product_id: productId,
    cart,
    timestamp: Date.now()
  })

  // Redirect a app con token
  return `https://app.smarterbot.cl/auth/bridge?token=${token}`
}
```

---

### 2. App (Clerk) → Recibir Token y Crear/Actualizar Usuario

```typescript
// app.smarterbot.cl/app/auth/bridge/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { clerkClient } from '@clerk/nextjs/server'
import jwt from 'jsonwebtoken'

interface BridgePayload {
  phone: string
  verified: boolean
  product_id?: string
  cart?: any[]
  timestamp: number
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }

  try {
    // 1. Validar token desde flow
    const payload = jwt.verify(
      token,
      process.env.BRIDGE_JWT_SECRET!
    ) as BridgePayload

    // 2. Verificar que no sea muy viejo (15 min)
    const now = Date.now()
    const tokenAge = now - payload.timestamp
    if (tokenAge > 15 * 60 * 1000) {
      throw new Error('Token expirado')
    }

    // 3. Buscar usuario por teléfono en Clerk
    const { phone } = payload
    const normalizedPhone = phone.replace(/[^0-9+]/g, '')

    // 4. Buscar en Clerk por teléfono
    const users = await clerkClient.users.getUserList({
      phoneNumber: normalizedPhone
    })

    let userId: string

    if (users.data.length > 0) {
      // Usuario existe → usar ese
      userId = users.data[0].id
    } else {
      // Usuario no existe → crear
      const user = await clerkClient.users.createUser({
        phoneNumber: normalizedPhone,
        skipPasswordRequirement: true,
        skipVerificationChecks: true,
        metadata: {
          source: 'flow-bridge',
          verified_by_twilio: payload.verified,
          product_interest: payload.product_id
        }
      })
      userId = user.id
    }

    // 5. Guardar contexto de la compra en Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    await supabase.from('flow_sessions').insert({
      clerk_user_id: userId,
      phone: normalizedPhone,
      product_id: payload.product_id,
      cart_data: payload.cart,
      verified_by_twilio: payload.verified,
      status: 'pending_payment'
    })

    // 6. Redirigir al dashboard con sesión iniciada
    const redirectUrl = new URL('/dashboard/checkout', request.url)
    redirectUrl.searchParams.set('product_id', payload.product_id || '')
    
    return NextResponse.redirect(redirectUrl)

  } catch (error) {
    console.error('Bridge auth error:', error)
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }
}
```

---

### 3. Base de Datos - Tabla flow_sessions

```sql
-- app.smarterbot.cl/database/migrations/flow_sessions.sql

CREATE TABLE IF NOT EXISTS public.flow_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_user_id TEXT REFERENCES auth.users(id),
  phone TEXT NOT NULL,
  product_id TEXT,
  cart_data JSONB DEFAULT '{}',
  verified_by_twilio BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending', -- pending, completed, abandoned
  created_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  
  -- Indexes para búsqueda rápida
  INDEX idx_flow_phone (phone),
  INDEX idx_flow_clerk_user (clerk_user_id),
  INDEX idx_flow_status (status)
);

-- RLS Policies
ALTER TABLE public.flow_sessions ENABLE ROW LEVEL SECURITY;

-- Users can only see their own flow sessions
CREATE POLICY "Users can view own flow sessions" 
  ON public.flow_sessions 
  FOR SELECT 
  USING (auth.uid()::text = clerk_user_id);

-- Insert from API only
CREATE POLICY "API can insert flow sessions" 
  ON public.flow_sessions 
  FOR INSERT 
  WITH CHECK (true);
```

---

### 4. Checkout Page → Mostrar Producto y Completar Compra

```typescript
// app.smarterbot.cl/app/dashboard/checkout/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { createBrowserClient } from '@supabase/ssr'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Smartphone } from 'lucide-react'

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const { user } = useUser()
  const [flowSession, setFlowSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const productId = searchParams.get('product_id')

  useEffect(() => {
    if (!user || !productId) return

    const fetchFlowSession = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { data } = await supabase
        .from('flow_sessions')
        .select('*')
        .eq('clerk_user_id', user.id)
        .eq('product_id', productId)
        .order('created_at', { ascending: false })
        .single()

      setFlowSession(data)
      setLoading(false)
    }

    fetchFlowSession()
  }, [user, productId])

  const handleCompletePurchase = async () => {
    // Aquí va la lógica de pago
    // Después de pagar, n8n ejecuta
  }

  if (loading) {
    return <div>Cargando...</div>
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6 flex items-center gap-3">
        <CheckCircle className="h-8 w-8 text-emerald-500" />
        <div>
          <h1 className="text-2xl font-bold">Compra Verificada</h1>
          <p className="text-sm text-gray-500">
            Tu identidad fue verificada vía WhatsApp
          </p>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-4">
            <Smartphone className="h-6 w-6 text-gray-400" />
            <div>
              <p className="text-sm font-medium">Teléfono verificado</p>
              <p className="text-lg font-bold">{flowSession?.phone}</p>
            </div>
            <Badge className="bg-emerald-100 text-emerald-700">
              Verificado por Twilio
            </Badge>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-gray-500 mb-2">Producto</p>
            <p className="text-lg font-bold">{flowSession?.product_id}</p>
          </div>
        </CardContent>
      </Card>

      <Button 
        onClick={handleCompletePurchase}
        className="w-full h-14 text-lg font-bold"
      >
        Completar Compra
      </Button>
    </div>
  )
}
```

---

### 5. Variables de Entorno

```bash
# .env.local

# Bridge JWT Secret (compartido entre flow y app)
BRIDGE_JWT_SECRET=your-super-secret-jwt-key-min-32-chars

# Flow URL
FLOW_SMARTERBOT_URL=https://flow.smarterbot.cl

# Clerk (ya existente)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase (ya existente)
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

---

### 6. n8n Workflow → Ejecutar Después del Pago

```json
{
  "name": "Flow Purchase Fulfillment",
  "nodes": [
    {
      "name": "Webhook",
      "parameters": {
        "httpMethod": "POST",
        "path": "flow-purchase-complete",
        "responseMode": "lastNode"
      }
    },
    {
      "name": "Get User Data",
      "parameters": {
        "operation": "getAll",
        "limit": 1,
        "filters": {
          "clerk_user_id": "={{ $json.body.clerk_user_id }}"
        }
      }
    },
    {
      "name": "Send WhatsApp Confirmation",
      "parameters": {
        "to": "={{ $json.phone }}",
        "message": "Tu compra {{ $json.product_id }} ha sido procesada exitosamente."
      }
    },
    {
      "name": "Update Flow Session",
      "parameters": {
        "table": "flow_sessions",
        "operation": "update",
        "id": "={{ $json.body.session_id }}",
        "fields": {
          "status": "completed",
          "completed_at": "={{ new Date().toISOString() }}"
        }
      }
    }
  ]
}
```

---

## Security Considerations

### 1. JWT Signing
- Usar secreto compartido fuerte (min 32 caracteres)
- Token expira en 15 minutos
- Validar timestamp en app

### 2. Phone Verification
- Twilio verifica el teléfono en flow
- App confía en la verificación (si token es válido)
- No pedir verificación doble

### 3. Rate Limiting
- Limitar tokens generados por teléfono
- Prevenir brute force attacks

### 4. CORS
- Configurar CORS en flow para permitir redirect a app
- Validar origen en app

---

## Testing Flow

1. **En flow:**
   ```
   Login con +56 9 1234 5678
   → Twilio OTP
   → Click "Comprar"
   → Redirect a app.smarterbot.cl/auth/bridge?token=xxx
   ```

2. **En app:**
   ```
   Recibe token
   → Valida JWT
   → Busca/crea usuario en Clerk
   → Crea flow_session
   → Redirect a /dashboard/checkout
   ```

3. **Checkout:**
   ```
   Muestra producto
   → Usuario confirma
   → Procesa pago
   → n8n ejecuta fulfillment
   ```

---

## Métricas

| Métrica | Objetivo |
|---------|----------|
| Conversión flow → app | > 80% |
| Tiempo en bridge | < 2s |
| Usuarios creados automáticamente | 100% |
| Pérdida en transición | < 5% |

---

**Estado:** ✅ Listo para implementar
**Siguiente:** Configurar variables en Vercel + n8n
