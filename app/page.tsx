import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import AuthForm from "@/components/auth-form"
import DemoModeToggle from "@/components/demo-mode-toggle"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Zap, Shield, Database, ArrowRight, CheckCircle } from "lucide-react"

export default async function Home() {
  // Safely check if we're in demo mode
  let isDemoMode = false
  try {
    isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true"
  } catch (error) {
    console.warn("Failed to check demo mode:", error)
    isDemoMode = true // Default to demo mode on error
  }

  if (isDemoMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fillOpacity=&quot;0.1&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

        <div className="relative z-10">
          {/* Header */}
          <header className="border-b border-white/10 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">SmarterBot</h1>
                    <p className="text-xs text-purple-300">Dashboard de Automatización</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                  DEMO MODE
                </Badge>
              </div>
            </div>
          </header>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 mb-4">
                🚀 Modo Demostración
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Explora{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  SmarterBot
                </span>{" "}
                sin configuración
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                Experimenta todas las funcionalidades de automatización con WhatsApp + IA sin necesidad de configurar
                API keys.
              </p>
            </div>

            <div className="flex justify-center">
              <DemoModeToggle />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Only call auth() if not in demo mode and Clerk is properly configured
  try {
    const { userId } = await auth()

    if (userId) {
      redirect("/dashboard")
    }
  } catch (error) {
    console.warn("Auth check failed:", error)
    // If there's an auth error, show demo mode option
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Authentication Error</h1>
            <p className="text-gray-600">There was an issue with your Clerk configuration</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Clerk Configuration Error</h2>
              <p className="text-gray-600 mb-4">Please check your environment variables.</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Quick Fix:</h3>
              <div className="text-sm text-blue-800">
                <p>Add this to your Vercel environment variables:</p>
                <div className="bg-gray-900 text-gray-100 rounded p-2 font-mono text-xs mt-2">
                  NEXT_PUBLIC_DEMO_MODE=true
                </div>
                <p className="mt-2">Then redeploy to use demo mode.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fillOpacity=&quot;0.1&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">SmarterBot</h1>
                  <p className="text-xs text-purple-300">Dashboard de Automatización</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                v2.0
              </Badge>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                  🚀 Automatización con IA
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Automatiza tu negocio con{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    WhatsApp + IA
                  </span>
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed">
                  Gestiona contactos, API keys, códigos QR y perfiles de usuario desde un dashboard centralizado y
                  potente.
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Zap className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Automatización</p>
                    <p className="text-sm text-slate-400">Flujos inteligentes</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Seguridad</p>
                    <p className="text-sm text-slate-400">Datos protegidos</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Database className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Base de Datos</p>
                    <p className="text-sm text-slate-400">CRUD completo</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-pink-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Tiempo Real</p>
                    <p className="text-sm text-slate-400">Sincronización</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex items-center space-x-4">
                <button className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                  <span>Probar el Demo</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="text-sm text-slate-400">
                  <p>✨ Sin tarjeta de crédito</p>
                  <p>🚀 Configuración en 2 minutos</p>
                </div>
              </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="lg:pl-8">
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">Accede a tu Dashboard</h2>
                    <p className="text-slate-300">Inicia sesión para gestionar tu automatización</p>
                  </div>
                  <AuthForm />
                </CardContent>
              </Card>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <p className="text-2xl font-bold text-white">500+</p>
                  <p className="text-sm text-slate-400">Empresas</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <p className="text-2xl font-bold text-white">99.9%</p>
                  <p className="text-sm text-slate-400">Uptime</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <p className="text-2xl font-bold text-white">24/7</p>
                  <p className="text-sm text-slate-400">Soporte</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <span className="text-white font-semibold">SmarterBot.cl</span>
              </div>
              <div className="flex items-center space-x-6 text-sm text-slate-400">
                <a href="#" className="hover:text-white transition-colors">
                  Términos
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Privacidad
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Soporte
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
