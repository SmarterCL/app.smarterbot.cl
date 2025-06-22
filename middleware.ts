import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import type { NextRequest } from "next/server"

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Check if we're in demo mode using headers or URL search params as fallback
  const isDemoMode =
    process.env.NEXT_PUBLIC_DEMO_MODE === "true" ||
    req.nextUrl.searchParams.get("demo") === "true" ||
    req.headers.get("x-demo-mode") === "true"

  // Skip Clerk middleware entirely in demo mode
  if (isDemoMode) {
    return
  }

  // Check if Clerk keys are available
  const hasClerkKeys =
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== "pk_test_your_actual_publishable_key_here" &&
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_")

  // If no valid Clerk keys and trying to access protected route, skip protection
  if (!hasClerkKeys && isProtectedRoute(req)) {
    return
  }

  // Only protect routes if we have valid Clerk configuration
  if (hasClerkKeys && isProtectedRoute(req)) {
    try {
      await auth.protect()
    } catch (error) {
      // If auth fails, let it pass through to show error page
      console.warn("Auth protection failed:", error)
      return
    }
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
