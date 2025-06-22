"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Database, Shield, ArrowRight } from "lucide-react"

export default function DemoModeToggle() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<string | null>(null)

  const demoUsers = [
    { id: "demo-1", name: "John Doe", email: "john@demo.com", role: "Admin" },
    { id: "demo-2", name: "Jane Smith", email: "jane@demo.com", role: "User" },
    { id: "demo-3", name: "Mike Johnson", email: "mike@demo.com", role: "Manager" },
  ]

  const handleDemoLogin = (user: (typeof demoUsers)[0]) => {
    setCurrentUser(user.name)
    setIsLoggedIn(true)
    // Simulate login delay
    setTimeout(() => {
      window.location.href = "/demo-dashboard"
    }, 1000)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
  }

  if (isLoggedIn) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Logging in as {currentUser}...</h3>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm">Redirecting to dashboard...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Database className="h-5 w-5 text-blue-600" />
            Demo Authentication System
          </CardTitle>
          <CardDescription>Try the full authentication system without any setup required</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Demo Features:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Full CRUD operations on all database tables</li>
                <li>• User profile management</li>
                <li>• Contact management system</li>
                <li>• API key management</li>
                <li>• QR code management</li>
                <li>• Responsive design</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Choose a demo user:</h4>
              {demoUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{user.role}</Badge>
                    <Button size="sm" onClick={() => handleDemoLogin(user)} className="flex items-center gap-1">
                      Login <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-yellow-900 mb-2">Note:</h4>
              <p className="text-sm text-yellow-800">
                This is a demo mode. No real authentication is performed, and data changes are temporary. To use real
                authentication with Google OAuth, configure your Clerk API keys.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
