import { clerkMiddleware } from "@clerk/nextjs/server"

// Minimal middleware: protect only dashboard routes; `/auth/*` and onboarding public.
export default clerkMiddleware({
  publicRoutes: [
    "/",
    "/auth/:path*",
    "/api/env/diagnostic",
    "/api/health",
    "/api/tenant/link-rut",
    "/favicon.ico",
    "/_next/:path*",
    "/images/:path*",
  ],
})

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
  ],
}
