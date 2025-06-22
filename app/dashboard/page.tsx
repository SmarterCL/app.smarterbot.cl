import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import DashboardContent from "@/components/dashboard-content"

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

  return <DashboardContent />
}
