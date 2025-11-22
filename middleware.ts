import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/env/diagnostic",
    "/api/contacts/test",
    "/favicon.ico",
    "/_next(.*)",
    "/images(.*)",
  ],
})

export const config = {
  matcher: [
    "/((api|trpc))/((?!env/diagnostic).*)",
  ],
}
