import DemoModeToggle from "@/components/demo-mode-toggle"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Zap, Shield, Database, ArrowRight, CheckCircle } from "lucide-react"
import { Suspense } from "react"
import AuthChecker from "@/components/auth-checker"
import BackgroundPattern from "@/components/background-pattern"

// Force dynamic rendering for this page
export const dynamic = "force-dynamic"

export default function Home() {
  // Check if we're in demo mode
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true"

  if (isDemoMode) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#050508] text-white">
        <BackgroundPattern />

        <div className="relative z-10">
          {/* Header */}
          <header className="border-b border-white/10 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/10 border border-white/20">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">SmarterBot</h1>
                    <p className="text-xs text-slate-400">Dashboard de Automatización</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-white/10 text-white border-white/20 uppercase tracking-[0.2em]">
                  DEMO MODE
                </Badge>
              </div>
            </div>
          </header>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
              <Badge className="bg-white/10 text-white border-white/20 uppercase tracking-[0.2em] mb-4">
                🚀 Modo Demostración
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">Explora SmarterBot sin configuración</h1>
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

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050508] text-white">
      <BackgroundPattern />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/10 border border-white/20">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">SmarterBot</h1>
                  <p className="text-xs text-slate-400">Dashboard de Automatización</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20 uppercase tracking-[0.2em]">
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
                <Badge className="bg-white/10 text-white border-white/20 uppercase tracking-[0.2em]">
                  🚀 Automatización con IA
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">Automatiza tu negocio con WhatsApp + IA</h1>
                <p className="text-xl text-slate-300 leading-relaxed">
                  Gestiona contactos, API keys, códigos QR y perfiles de usuario desde un dashboard centralizado y
                  potente.
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Automatización</p>
                    <p className="text-sm text-slate-400">Flujos inteligentes</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Seguridad</p>
                    <p className="text-sm text-slate-400">Datos protegidos</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                    <Database className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Base de Datos</p>
                    <p className="text-sm text-slate-400">CRUD completo</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Tiempo Real</p>
                    <p className="text-sm text-slate-400">Sincronización</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex items-center space-x-4">
                <button className="group bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
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
                  <Suspense
                    fallback={
                      <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                      </div>
                    }
                  >
                    <AuthChecker />
                  </Suspense>
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
                <div className="w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center">
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
