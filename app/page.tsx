"use client"

import { SignIn } from "@clerk/nextjs"
import { Badge } from "@/components/ui/badge"

function HeaderBadge({ label }: { label: string }) {
  return (
    <Badge className="flex items-center gap-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-600">
      {label}
    </Badge>
  )
}

function HeroContent() {
  return (
    <div className="space-y-4 text-center lg:text-left">
      <HeaderBadge label="WhatsApp + IA" />
      <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
        <span className="text-gray-900">Smarter</span>
        <span className="text-yellow-500">OS</span>
      </h1>
      <p className="text-lg text-gray-600">
        Automatiza tu negocio con WhatsApp + IA. Impulsa tus ventas y operaciones desde una sola plataforma integrada.
      </p>
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
        Chatwoot • N8N • Odoo • Botpress
      </p>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500">
      <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">

          {/* Left side - Hero content */}
          <div className="flex-1 space-y-6 text-white lg:pr-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-2xl font-bold">SmarterOS</span>
            </div>

            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Únete a la revolución de la automatización inteligente
            </h1>

            <p className="text-lg text-white/90">
              Conecta WhatsApp, IA y automatizaciones en una sola plataforma.
              Impulsa tus ventas y operaciones desde cualquier lugar.
            </p>

            <div className="flex flex-wrap gap-2 text-sm text-white/80">
              <span className="rounded-full bg-white/20 px-3 py-1">Chatwoot</span>
              <span className="rounded-full bg-white/20 px-3 py-1">N8N</span>
              <span className="rounded-full bg-white/20 px-3 py-1">Odoo</span>
              <span className="rounded-full bg-white/20 px-3 py-1">Botpress</span>
            </div>
          </div>

          {/* Right side - Login form */}
          <div className="w-full lg:w-auto lg:min-w-[400px]">
            <SignIn
              routing="path"
              path="/"
              signUpUrl="/auth/sign-up"
              forceRedirectUrl="/dashboard"
              appearance={{
                elements: {
                  rootBox: "mx-auto w-full",
                  card: "bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-2xl p-2",
                  headerTitle: "text-xl font-semibold text-gray-900",
                  headerSubtitle: "text-sm text-gray-500",
                  socialButtonsBlockButton: "border border-gray-200 hover:bg-gray-50 transition-colors font-medium",
                  socialButtonsBlockButtonText: "text-gray-700",
                  formButtonPrimary: "bg-yellow-500 hover:bg-yellow-600 text-black font-semibold shadow-lg transition-all hover:shadow-xl",
                  footerActionLink: "text-yellow-600 hover:text-yellow-700 font-medium",
                  formFieldInput: "border-gray-300 focus:border-yellow-500 focus:ring-yellow-500",
                  dividerLine: "bg-gray-200",
                  dividerText: "text-gray-400",
                  logoImage: "h-10 w-auto",
                  logoBox: "justify-center mb-2",
                },
                layout: {
                  logoPlacement: "inside",
                  socialButtonsPlacement: "top",
                  showOptionalFields: false,
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-white/70">
        © 2026 SmarterOS. Todos los derechos reservados.
      </div>
    </div>
  )
}
