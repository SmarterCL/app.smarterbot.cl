import { clerkMiddleware } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

// Custom Clerk middleware: bypass env diagnostic endpoint so it can report missing vars
export default clerkMiddleware((auth, req) => {
  const { pathname } = req.nextUrl
  if (pathname.startsWith("/api/env/diagnostic")) {
    return NextResponse.next()
  }
})

// Matcher limits auth to dashboard routes (others public)
export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Run for API routes except diagnostic env endpoint
    "/((?!api/env/diagnostic)(api|trpc).*)",
  ],
}
