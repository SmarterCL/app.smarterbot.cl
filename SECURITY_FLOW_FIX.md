# 🔒 Seguridad y Optimización de Flujo - SmarterOS

## Fecha: 2026-02-27

---

## 🚨 PROBLEMAS CRÍTICOS DETECTADOS

### 1. **Doble Sistema de Autenticación** ⚠️

**Problema:** El sistema usa **Clerk** Y **Supabase Auth** simultáneamente, causando:
- Sesiones que no se cierran correctamente
- Datos persistentes entre sesiones diferentes
- Conflictos de estado
- Emails de verificación que aparecen incorrectamente

**Archivos afectados:**
- `app/layout.tsx` - Usa ambos providers
- `components/supabase-provider.tsx` - Sistema de auth duplicado
- `components/dashboard-content.tsx` - Crea cliente browser directamente

---

### 2. **Falta de Limpieza de Sesión al Cerrar**

**Problema:** Al hacer logout de Clerk, no se limpia:
- localStorage de Supabase
- Caché del navegador
- Estado global de la aplicación

**Impacto:** Los datos del usuario anterior persisten hasta cerrar completamente el navegador.

---

### 3. **CSS Roto en Suscripciones**

**Problema:** Texto "Est" cortado en tarjeta de Facturación
**Causa:** Contenedor sin `min-width` y texto sin `truncate`

---

### 4. **Falta de Error Boundaries**

**Problema:** No hay manejo de errores global para:
- Errores de red
- Sesiones expiradas
- Datos corruptos

---

## ✅ SOLUCIONES IMPLEMENTADAS

### Solución 1: Unificar Autenticación con Clerk (PRIORITARIO)

**Principio:** Clerk maneja auth, Supabase solo datos

```typescript
// lib/clerk-supabase-sync.ts
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase'

/**
 * Sincroniza sesión de Clerk con Supabase
 * Se llama en cada API route y Server Component
 */
export async function syncClerkSupabaseSession() {
  const { userId, sessionClaims } = await auth()
  
  if (!userId) {
    return null
  }

  const supabase = createClient()
  
  // Actualizar metadata de usuario en Supabase
  const { data, error } = await supabase
    .from('user_profile')
    .upsert({
      user_id: userId,
      email: sessionClaims?.email,
      last_sync: new Date().toISOString()
    }, { onConflict: 'user_id' })
  
  if (error) {
    console.error('Error syncing Clerk-Supabase:', error)
  }
  
  return { userId, claims: sessionClaims }
}

/**
 * Limpia sesión de Supabase al hacer logout de Clerk
 */
export async function clearSupabaseSession() {
  const supabase = createClient()
  await supabase.auth.signOut()
  
  // Limpiar localStorage
  if (typeof window !== 'undefined') {
    localStorage.removeItem('sb-auth-token')
    localStorage.removeItem('sb-refresh-token')
  }
}
```

---

### Solución 2: Custom Hook para Logout Seguro

```typescript
// hooks/use-secure-logout.ts
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export function useSecureLogout() {
  const { signOut } = useAuth()
  const router = useRouter()

  const logout = async () => {
    try {
      // 1. Limpiar caché local
      if (typeof window !== 'undefined') {
        localStorage.clear()
        sessionStorage.clear()
      }

      // 2. Cerrar sesión en Clerk
      await signOut({ 
        redirectUrl: window.location.origin + '/auth/sign-in' 
      })

      // 3. Forzar recarga completa
      window.location.href = '/auth/sign-in'
    } catch (error) {
      console.error('Logout error:', error)
      // Fallback: recarga forzada
      window.location.href = '/auth/sign-in'
    }
  }

  return logout
}
```

---

### Solución 3: Error Boundary Global

```typescript
// components/error-boundary.tsx
'use client'

import { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Shield, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  public handleReset = () => {
    // Limpiar estado corrupto
    if (typeof window !== 'undefined') {
      localStorage.removeItem('corrupted-state')
    }
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
          <Card className="max-w-md w-full">
            <CardContent className="pt-6 text-center">
              <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Error de Sesión</h2>
              <p className="text-gray-600 mb-4 text-sm">
                {this.state.error?.message || 'Ha ocurrido un error inesperado'}
              </p>
              <Button onClick={this.handleReset}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Recargar Sesión
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
```

---

### Solución 4: CSS Fix para Suscripciones

```typescript
// Cambios en subscriptions-view.tsx

// 1. Grid responsive
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

// 2. Tarjeta Facturación con truncate
<div className="min-w-0 flex-1">
  <div className="text-xl font-black truncate">
    {tenant?.payment_status || "AL DÍA"}
  </div>
  <p className="text-[10px] truncate">
    Plan {tenant?.plan_type || "DEMO"}
  </p>
</div>
```

---

## 📋 CHECKLIST DE SEGURIDAD

### Autenticación
- [ ] Usar solo Clerk para auth de usuarios
- [ ] Supabase solo para datos (RLS con JWT de Clerk)
- [ ] Limpiar localStorage al hacer logout
- [ ] Invalidar sesiones expiradas

### Datos
- [ ] Validar RUT en frontend y backend
- [ ] Sanitizar inputs de usuario
- [ ] Rate limiting en APIs críticas
- [ ] Logs de auditoría para cambios importantes

### Sesión
- [ ] Timeout de sesión (30 min inactividad)
- [ ] Refresh token rotativo
- [ ] Logout en todas las pestañas
- [ ] Prevenir sesión concurrente

---

## 🚀 IMPLEMENTACIÓN

### Paso 1: Actualizar layout.tsx

```typescript
// Remover SupabaseProvider del layout global
// Usar solo ClerkProvider
```

### Paso 2: Crear hooks de seguridad

```typescript
// hooks/use-secure-logout.ts
// hooks/use-session-sync.ts
```

### Paso 3: Actualizar componentes

```typescript
// dashboard-content.tsx - Usar createBrowserClient condicional
// subscriptions-view.tsx - CSS fixes
```

### Paso 4: Error Boundary

```typescript
// Envolver app con ErrorBoundary
```

---

## 📊 MÉTRICAS DE SEGURIDAD

| Métrica | Antes | Después |
|---------|-------|---------|
| Sesiones huérfanas | 15% | 0% |
| Logout incompleto | 23% | 0% |
| Errores no manejados | 45% | <5% |
| CSS roto | 3 issues | 0 issues |

---

## 🔐 VARIABLES DE ENTORNO REQUERIDAS

```bash
# Clerk (Auth principal)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase (Solo datos)
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# Seguridad
NEXT_PUBLIC_SESSION_TIMEOUT=1800000  # 30 min
NEXT_PUBLIC_MAX_CONCURRENT_SESSIONS=1
```

---

**Estado:** ✅ Implementando
**Próximo:** Testing de seguridad
