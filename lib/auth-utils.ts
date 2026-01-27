import { createClient } from '@/lib/supabase'

// Función para proteger rutas del lado del servidor usando Supabase
export async function requireAuth() {
  const supabase = createClient()
  
  const { data: { session }, error } = await supabase.auth.getSession()
  
  if (error || !session) {
    // En Next.js 13+, usar redirect
    import('next/navigation').then(({ redirect }) => {
      redirect('/auth/sign-in')
    })
    return null
  }
  
  return session.user
}

// Función para verificar si el usuario está autenticado
export async function checkAuth() {
  const supabase = createClient()
  
  const { data: { session }, error } = await supabase.auth.getSession()
  
  if (error || !session) {
    return null
  }
  
  return session.user
}