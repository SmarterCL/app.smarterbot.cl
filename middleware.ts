import { clerkMiddleware } from "@clerk/nextjs/server"

// Clerk middleware with explicit public routes; avoids invalid regex groups for Next 15
export default clerkMiddleware({
  publicRoutes: [
    "/",
    "/sign-in",
    "/sign-in/:path*",
    "/sign-up",
    "/sign-up/:path*",
    "/api/env/diagnostic",
    "/api/mcp/ping",
    "/api/health",
    "/api/contacts/test",
    "/favicon.ico",
    "/_next/:path*",
    "/images/:path*",
  ],
})

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/api/:path*",
  ],
}
