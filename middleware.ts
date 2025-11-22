import { authMiddleware } from "@clerk/nextjs"

// Next.js 15 safe middleware: only path wildcards, no capturing groups / lookaheads
export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in",
    "/sign-in/:path*",
    "/sign-up",
    "/sign-up/:path*",
    "/api/env/diagnostic",
    "/api/contacts/test",
    "/favicon.ico",
    "/_next/:path*",
    "/images/:path*",
  ],
})

export const config = {
  matcher: [
    "/api/:path*",
    "/trpc/:path*",
    "/dashboard",
    "/dashboard/:path*",
  ],
}
