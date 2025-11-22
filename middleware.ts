import { clerkMiddleware } from "@clerk/nextjs/server"

// Minimal Clerk middleware: protect dashboard; rely on Clerk config env vars
export default clerkMiddleware()

// Matcher limits auth to dashboard routes (others public)
export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
