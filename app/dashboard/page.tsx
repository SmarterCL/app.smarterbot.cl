import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import DashboardContent from "@/components/dashboard-content"
import AuthDebug from "@/components/auth-debug"

export default async function Dashboard() {
  // Check if we're in demo mode
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true"

  if (isDemoMode) {
    // In demo mode, redirect to demo dashboard
    redirect("/demo-dashboard")
  }

  try {
    const { userId } = await auth()

    if (!userId) {
      redirect("/")
    }
  } catch (error) {
    // If auth fails, redirect to home
    redirect("/")
  }

  return (
    <div className="space-y-6">
      <DashboardContent />
      {/* Debug component - remove in production */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AuthDebug />
      </div>
    </div>
  )
}
