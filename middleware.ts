import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Simple check for demo mode
function isDemoMode() {
  return process.env.NEXT_PUBLIC_DEMO_MODE === "true"
}

// Check if Clerk is properly configured
function hasValidClerkConfig() {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  const secretKey = process.env.CLERK_SECRET_KEY

  const hasValidPublishableKey =
    Boolean(publishableKey) &&
    publishableKey.startsWith("pk_") &&
    publishableKey !== "pk_test_your_actual_publishable_key_here"
  const hasValidSecretKey =
    Boolean(secretKey) && secretKey.startsWith("sk_") && secretKey !== "sk_test_your_actual_secret_key_here"

  return hasValidPublishableKey && hasValidSecretKey
}

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"])

export default function middleware(request: NextRequest) {
  // If in demo mode, allow all requests
  if (isDemoMode()) {
    return NextResponse.next()
  }

  // If no valid Clerk config, redirect protected routes to home
  if (!hasValidClerkConfig()) {
    if (isProtectedRoute(request)) {
      const url = request.nextUrl.clone()
      url.pathname = "/"
      url.searchParams.set("error", "config")
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  // Use Clerk middleware for protected routes with relaxed dev settings
  return clerkMiddleware(
    async (auth, req) => {
      if (isProtectedRoute(req)) {
        await auth.protect()
      }
    },
    {
      // Modo desarrollo: acepta cookies de diferentes navegadores/contextos
      debug: process.env.NODE_ENV === 'development',
    }
  )(request)
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
