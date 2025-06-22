import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import AuthForm from "@/components/auth-form"
import DemoModeToggle from "@/components/demo-mode-toggle"

export default async function Home() {
  // Safely check if we're in demo mode
  let isDemoMode = false
  try {
    isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true"
  } catch (error) {
    console.warn("Failed to check demo mode:", error)
    isDemoMode = true // Default to demo mode on error
  }

  if (isDemoMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Demo Mode</h1>
            <p className="text-gray-600">Experience the authentication system without setup</p>
          </div>
          <DemoModeToggle />
        </div>
      </div>
    )
  }

  // Only call auth() if not in demo mode and Clerk is properly configured
  try {
    const { userId } = await auth()

    if (userId) {
      redirect("/dashboard")
    }
  } catch (error) {
    console.warn("Auth check failed:", error)
    // If there's an auth error, show demo mode option
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Authentication Error</h1>
            <p className="text-gray-600">There was an issue with your Clerk configuration</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center mb-4">
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
              <h2 className="text-xl font-bold text-gray-900 mb-2">Clerk Configuration Error</h2>
              <p className="text-gray-600 mb-4">Please check your environment variables.</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Quick Fix:</h3>
              <div className="text-sm text-blue-800">
                <p>Add this to your Vercel environment variables:</p>
                <div className="bg-gray-900 text-gray-100 rounded p-2 font-mono text-xs mt-2">
                  NEXT_PUBLIC_DEMO_MODE=true
                </div>
                <p className="mt-2">Then redeploy to use demo mode.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account or create a new one</p>
        </div>
        <AuthForm />
      </div>
    </div>
  )
}
