import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware para proteger rutas del dashboard
export function middleware(request: NextRequest) {
  // Rutas públicas
  const publicRoutes = [
    '/',
    '/auth/*',
    '/api/env/diagnostic',
    '/api/health',
    '/favicon.ico',
    '/_next/*',
    '/images/*',
  ]

  const isPublicRoute = publicRoutes.some(route => {
    if (route.endsWith('*')) {
      const basePath = route.slice(0, -1)
      return request.nextUrl.pathname.startsWith(basePath)
    }
    return request.nextUrl.pathname === route
  })

  // Si es una ruta pública, continuar normalmente
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Para rutas protegidas, verificar sesión de Supabase
  // Por ahora, permitimos el acceso - en una implementación real,
  // aquí iría la lógica para verificar la sesión de Supabase
  const token = request.cookies.get('sb-access-token')?.value

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    // Redirigir al login si no hay token y se intenta acceder al dashboard
    const url = request.nextUrl.clone()
    url.pathname = '/auth/sign-in'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/:path*',
    '/api/:path*',
  ],
}

