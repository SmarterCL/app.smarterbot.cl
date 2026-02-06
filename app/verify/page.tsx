import { redirect } from "next/navigation"

export default function VerifyPage() {
  // Clerk verification redirects here, send to dashboard
  redirect("/dashboard")
}
