import { clerkMiddleware } from "@clerk/nextjs/server"

// Minimal middleware: protect only dashboard routes; `/auth/*` public.
export default clerkMiddleware({
  publicRoutes: [
    "/",
    "/auth/:path*",
    "/api/env/diagnostic",
    "/api/health",
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
