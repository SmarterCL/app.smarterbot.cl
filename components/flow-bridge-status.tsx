'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { createBrowserClient } from '@supabase/ssr'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, Smartphone, ShoppingBag, AlertCircle, Loader2 } from 'lucide-react'

interface FlowSession {
  id: string
  phone: string
  product_id: string | null
  verified_by_twilio: boolean
  status: string
  created_at: string
}

export function FlowBridgeStatus() {
  const searchParams = useSearchParams()
  const { user } = useUser()
  const [flowSession, setFlowSession] = useState<FlowSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fromFlow = searchParams?.get('from_flow') === 'true'
  const productId = searchParams?.get('product_id')
  const isNewUser = searchParams?.get('new_user') === 'true'

  useEffect(() => {
    if (!user || !fromFlow) {
      setLoading(false)
      return
    }

    const fetchFlowSession = async () => {
      try {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        const { data, error } = await supabase
          .from('flow_sessions')
          .select('*')
          .eq('clerk_user_id', user.id)
          .eq('status', 'pending')
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        if (error && error.code !== 'PGRST116') {
          throw error
        }

        setFlowSession(data)
      } catch (err: any) {
        console.error('Error fetching flow session:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchFlowSession()
  }, [user, fromFlow])

  if (!fromFlow || loading) {
    return null
  }

  return (
    <Card className="mb-6 border-emerald-200 bg-emerald-50/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
              {loading ? (
                <Loader2 className="h-5 w-5 text-emerald-600 animate-spin" />
              ) : flowSession ? (
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-amber-600" />
              )}
            </div>
            <div>
              <CardTitle className="text-lg">
                {isNewUser ? '¡Bienvenido!' : 'Sesión verificada desde Flow'}
              </CardTitle>
              <CardDescription className="text-sm">
                {flowSession 
                  ? 'Tu identidad fue verificada vía WhatsApp' 
                  : 'Verificando tu sesión...'}
              </CardDescription>
            </div>
          </div>
          {flowSession?.verified_by_twilio && (
            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
              <Smartphone className="h-3 w-3 mr-1" />
              Verificado por Twilio
            </Badge>
          )}
        </div>
      </CardHeader>
      
      {flowSession && (
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-emerald-100">
              <Smartphone className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Teléfono</p>
                <p className="text-sm font-bold text-gray-900">{flowSession.phone}</p>
              </div>
            </div>
            
            {flowSession.product_id && (
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-emerald-100">
                <ShoppingBag className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Producto</p>
                  <p className="text-sm font-bold text-gray-900">{flowSession.product_id}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-emerald-100">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Estado</p>
                <p className="text-sm font-bold text-gray-900 capitalize">
                  {flowSession.status.replace('_', ' ')}
                </p>
              </div>
            </div>
          </div>

          {isNewUser && (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800 font-medium">
                👋 ¡Es tu primera vez! Hemos creado tu cuenta automáticamente con tu teléfono verificado.
              </p>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}
