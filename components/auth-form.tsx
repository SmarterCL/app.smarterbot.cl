"use client"

import { SignIn, SignUp } from "@clerk/nextjs"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>{isSignUp ? "Create Account" : "Sign In"}</CardTitle>
        <CardDescription>
          {isSignUp ? "Create a new account to get started" : "Welcome back! Please sign in to continue"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isSignUp ? (
            <SignUp
              appearance={{
                elements: {
                  formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
                  socialButtonsBlockButton: "border-gray-200 hover:bg-gray-50",
                  dividerLine: "bg-gray-200",
                  dividerText: "text-gray-500",
                },
              }}
              routing="hash"
            />
          ) : (
            <SignIn
              appearance={{
                elements: {
                  formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
                  socialButtonsBlockButton: "border-gray-200 hover:bg-gray-50",
                  dividerLine: "bg-gray-200",
                  dividerText: "text-gray-500",
                },
              }}
              routing="hash"
            />
          )}

          <div className="text-center pt-4">
            <Button
              variant="ghost"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
