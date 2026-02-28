import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Rutas que NO requieren autenticación
const isPublicRoute = createRouteMatcher([
  '/',
  '/api(.*)',
  '/auth(.*)',
  '/sso-callback',
])

// Rutas que SIEMPRE requieren autenticación
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/tenants(.*)',
  '/services(.*)',
  '/integrations(.*)',
  '/settings(.*)',
  '/profile(.*)',
  '/onboarding(.*)',
  '/kpi(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  // Protected routes always require auth
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
  
  // All other non-public routes require auth
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|eot|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
