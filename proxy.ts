import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);
const isPublicRoute = createRouteMatcher([
  "/",
  "/login(.*)",
  "/signup(.*)",
  "/sign-up(.*)",
  "/auth(.*)",
  "/pay(.*)",
  "/subscribe(.*)",
  "/precios",
  "/quienes-somos",
  "/preguntas-frecuentes",
  "/terminos-y-condiciones",
  "/politicas-de-privacidad",
  "/privacy"
]);
const isApiRoute = createRouteMatcher(["/(api|trpc)(.*)"]);

const proxy = clerkMiddleware(async (auth, req) => {
  // 1. Authentication Logic
  if (!isPublicRoute(req)) {
    if (isProtectedRoute(req) || isApiRoute(req)) {
      await auth.protect();
    }
  }
});

export default proxy;

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
