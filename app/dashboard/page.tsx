import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import DashboardContent from "@/components/dashboard-content"

export default async function Dashboard() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/auth/sign-in")
  }

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <DashboardContent />
    </div>
  )
}
