import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import DashboardContent from "@/components/dashboard-content"

export default async function Dashboard() {
  const { userId } = await auth()

  // if (!userId) {
  //   redirect("/auth/sign-in")
  // }

  return (
    <div className="p-6">
      <DashboardContent />
    </div>
  )
}
