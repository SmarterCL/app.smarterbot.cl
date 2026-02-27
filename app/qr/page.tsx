import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import QRCodeGenerator from "@/components/qr-generator"

export default async function QRPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/auth/sign-in")
  }

  return (
    <div className="p-6">
      <QRCodeGenerator />
    </div>
  )
}
