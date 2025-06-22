import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if we're in demo mode first
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true"

  // If in demo mode, allow all requests to pass through
  if (isDemoMode) {
    return NextResponse.next()
  }

  // Check if we have valid Clerk configuration
  const hasValidClerkConfig =
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_") &&
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== "pk_test_your_actual_publishable_key_here"

  // If no valid Clerk config, allow requests but redirect protected routes to setup
  if (!hasValidClerkConfig) {
    const url = request.nextUrl.clone()

    // If trying to access dashboard without proper config, redirect to home with error
    if (url.pathname.startsWith("/dashboard")) {
      url.pathname = "/"
      url.searchParams.set("error", "config")
      return NextResponse.redirect(url)
    }

    return NextResponse.next()
  }

  // Only use Clerk middleware if we have valid configuration
  try {
    // Dynamic import to avoid loading Clerk when not needed
    return import("@clerk/nextjs/server").then(({ clerkMiddleware, createRouteMatcher }) => {
      const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"])

      return clerkMiddleware(async (auth, req) => {
        if (isProtectedRoute(req)) {
          await auth.protect()
        }
      })(request)
    })
  } catch (error) {
    console.warn("Clerk middleware failed:", error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
