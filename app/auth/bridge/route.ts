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
    console.warn('[Bridge] No token provided')
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }

  try {
    // 1. Validar token desde flow
    const payload = jwt.verify(
      token,
      process.env.BRIDGE_JWT_SECRET || 'fallback-dev-secret-key-change-in-production'
    ) as BridgePayload

    console.log('[Bridge] Token validated:', { 
      phone: payload.phone, 
      verified: payload.verified,
      product_id: payload.product_id 
    })

    // 2. Verificar que no sea muy viejo (15 min)
    const now = Date.now()
    const tokenAge = now - payload.timestamp
    if (tokenAge > 15 * 60 * 1000) {
      throw new Error('Token expirado')
    }

    // 3. Buscar usuario por teléfono en Clerk
    const { phone } = payload
    const normalizedPhone = phone.replace(/[^0-9+]/g, '')

    console.log('[Bridge] Looking up user by phone:', normalizedPhone)

    // 4. Buscar en Clerk por teléfono
    const client = await clerkClient()
    const users = await client.users.getUserList({
      phoneNumber: [normalizedPhone]
    })

    let userId: string
    let isNewUser = false

    if (users.data.length > 0) {
      // Usuario existe → usar ese
      userId = users.data[0].id
      console.log('[Bridge] Existing user found:', userId)
    } else {
      // Usuario no existe → crear
      console.log('[Bridge] Creating new user for phone:', normalizedPhone)

      const user = await client.users.createUser({
        externalId: `flow_${normalizedPhone}_${Date.now()}`,
        skipPasswordRequirement: true,
        unsafeMetadata: {
          source: 'flow-bridge',
          verified_by_twilio: payload.verified,
          product_interest: payload.product_id,
          onboarding_completed: false,
          phone: normalizedPhone
        }
      })
      userId = user.id
      isNewUser = true
      console.log('[Bridge] New user created:', userId)
    }

    // 5. Guardar contexto de la compra en Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const flowSessionData = {
      clerk_user_id: userId,
      phone: normalizedPhone,
      product_id: payload.product_id,
      cart_data: payload.cart || {},
      verified_by_twilio: payload.verified,
      status: 'pending_payment',
      metadata: {
        token_timestamp: payload.timestamp,
        token_age_seconds: Math.round(tokenAge / 1000),
        is_new_user: isNewUser
      }
    }

    console.log('[Bridge] Inserting flow session:', flowSessionData)

    const { data: sessionData, error: sessionError } = await supabase
      .from('flow_sessions')
      .insert(flowSessionData)
      .select()
      .single()

    if (sessionError) {
      console.error('[Bridge] Error saving flow session:', sessionError)
      // No throw, continue anyway
    }

    console.log('[Bridge] Flow session created:', sessionData?.id)

    // 6. Redirigir al dashboard con contexto
    const redirectUrl = new URL('/dashboard', request.url)
    
    if (payload.product_id) {
      redirectUrl.searchParams.set('product_id', payload.product_id)
      redirectUrl.searchParams.set('from_flow', 'true')
    }
    
    if (isNewUser) {
      redirectUrl.searchParams.set('new_user', 'true')
    }

    console.log('[Bridge] Redirecting to:', redirectUrl.toString())
    
    return NextResponse.redirect(redirectUrl)

  } catch (error: any) {
    console.error('[Bridge] Auth error:', error.message)
    
    // Token inválido o expirado → redirect a sign-in
    return NextResponse.redirect(new URL('/auth/sign-in?error=bridge_invalid', request.url))
  }
}

// POST endpoint para validar token sin redirect (para API calls)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = body

    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 400 })
    }

    const payload = jwt.verify(
      token,
      process.env.BRIDGE_JWT_SECRET || 'fallback-dev-secret-key-change-in-production'
    ) as BridgePayload

    const tokenAge = Date.now() - payload.timestamp
    if (tokenAge > 15 * 60 * 1000) {
      return NextResponse.json({ error: 'Token expired' }, { status: 401 })
    }

    return NextResponse.json({ 
      valid: true,
      phone: payload.phone,
      verified: payload.verified,
      product_id: payload.product_id
    })
  } catch (error: any) {
    return NextResponse.json({ 
      valid: false, 
      error: error.message 
    }, { status: 401 })
  }
}
