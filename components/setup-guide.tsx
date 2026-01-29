import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, Key, Database, Shield } from "lucide-react"

export default function SetupGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Setup Your Authentication System</h1>
          <p className="text-xl text-gray-600">Follow these steps to configure Supabase authentication</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Supabase Setup */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Supabase Authentication Setup
              </CardTitle>
              <CardDescription>Configure user authentication with Email/Password and OAuth</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    1
                  </Badge>
                  <span className="text-sm">
                    Create account at{" "}
                    <a
                      href="https://supabase.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline inline-flex items-center gap-1"
                    >
                      supabase.com <ExternalLink className="h-3 w-3" />
                    </a>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    2
                  </Badge>
                  <span className="text-sm">Create a new project in your dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    3
                  </Badge>
                  <span className="text-sm">Navigate to Authentication → Settings</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    4
                  </Badge>
                  <span className="text-sm">Copy your Project URL and Anonymous Key</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Environment Variables */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-green-600" />
                Environment Variables
              </CardTitle>
              <CardDescription>Add these to your deployment platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="rounded-lg bg-gray-50 p-4 font-mono text-sm">
                  <div>NEXT_PUBLIC_SUPABASE_URL=your-supabase-url</div>
                  <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key</div>
                </div>
                <div className="text-sm text-gray-600">
                  These variables allow your frontend to securely communicate with Supabase.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 bg-white rounded-xl border p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Database className="h-5 w-5 text-indigo-600" />
            Database Configuration
          </h2>
          <div className="space-y-4">
            <p>Your Supabase project includes a PostgreSQL database. You can:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Define your database schema using the SQL editor</li>
              <li>Use the Table Editor for a visual interface</li>
              <li>Enable Row Level Security (RLS) for fine-grained access control</li>
              <li>Set up database functions and triggers</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600">
          <div className="text-green-400"># Supabase Configuration</div>
          <div>NEXT_PUBLIC_SUPABASE_URL=your_actual_project_url_here</div>
          <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here</div>
        </div>
      </div>
    </div>
  )
}