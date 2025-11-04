import type React from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "User Authentication System",
  description: "Complete user management with Clerk and Supabase",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Safely check environment variables
  let isDemoMode = false
  let hasValidClerkConfig = false

  try {
    isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true"
    const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    const clerkSecretKey = process.env.CLERK_SECRET_KEY

    const hasValidPublishableKey =
      Boolean(clerkPublishableKey) &&
      clerkPublishableKey !== "pk_test_your_actual_publishable_key_here" &&
      clerkPublishableKey.startsWith("pk_")
    const hasValidSecretKey =
      Boolean(clerkSecretKey) &&
      clerkSecretKey !== "sk_test_your_actual_secret_key_here" &&
      clerkSecretKey.startsWith("sk_")

    hasValidClerkConfig = hasValidPublishableKey && hasValidSecretKey
  } catch (error) {
    console.warn("Environment variable check failed:", error)
    // Default to demo mode if there's an error
    isDemoMode = true
  }

  // If in demo mode, don't use ClerkProvider at all
  if (isDemoMode) {
    return (
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    )
  }

  // If not in demo mode but Clerk is not configured, show error
  if (!hasValidClerkConfig) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h1 className="text-xl font-bold text-gray-900 mb-2">Setup Required</h1>
                <p className="text-gray-600 mb-4">Please configure your environment variables to continue.</p>
                <div className="text-left bg-gray-50 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Required Environment Variables:</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</li>
                    <li>• CLERK_SECRET_KEY</li>
                    <li>• NEXT_PUBLIC_SUPABASE_URL</li>
                    <li>• NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
                  </ul>
                </div>
                <div className="text-left bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Quick Start Options:</h3>
                  <ol className="text-sm text-blue-800 space-y-1">
                    <li>1. Enable demo mode (add NEXT_PUBLIC_DEMO_MODE=true)</li>
                    <li>2. Or configure real Clerk API keys</li>
                    <li>3. Restart your development server</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    )
  }

  // Only use ClerkProvider when we have valid keys
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
