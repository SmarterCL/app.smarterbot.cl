"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import AuthForm from "@/components/auth-form"

export default function AuthChecker() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && user) {
      router.push("/dashboard")
    }
  }, [user, isLoaded, router])

  if (!isLoaded) {
    return (
      <div className="flex justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-200 border-t-transparent" />
      </div>
    )
  }

  if (user) {
    return (
      <div className="text-center py-8">
        <p className="text-emerald-700">Redirigiendo al dashboard...</p>
      </div>
    )
  }

  return <AuthForm />
}
