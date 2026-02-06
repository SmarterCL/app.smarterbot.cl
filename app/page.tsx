"use client"

import { SignIn } from "@clerk/nextjs"

export default function Home() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 overflow-hidden">
      {/* Decorative blur circles */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-yellow-300/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-orange-400/30 rounded-full blur-3xl"></div>

      <div className="relative z-10 flex h-full items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-16">

          {/* Left side - Hero content (hidden on mobile, visible on desktop) */}
          <div className="hidden lg:flex flex-1 flex-col items-start space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
                <svg className="h-9 w-9 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-4xl font-black text-gray-900" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                  SmarterOS
                </h2>
              </div>
            </div>

            <h1 className="text-4xl font-bold leading-tight text-gray-900 lg:text-5xl" style={{ textShadow: '0 2px 15px rgba(0,0,0,0.08)' }}>
              Automatización inteligente para tu negocio
            </h1>

            <p className="text-xl text-gray-800/90">
              WhatsApp + IA en una sola plataforma.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-white/25 backdrop-blur-sm px-4 py-2 text-sm font-medium text-gray-900 border border-white/30">Chatwoot</span>
              <span className="rounded-full bg-white/25 backdrop-blur-sm px-4 py-2 text-sm font-medium text-gray-900 border border-white/30">N8N</span>
              <span className="rounded-full bg-white/25 backdrop-blur-sm px-4 py-2 text-sm font-medium text-gray-900 border border-white/30">Supabase</span>
              <span className="rounded-full bg-white/25 backdrop-blur-sm px-4 py-2 text-sm font-medium text-gray-900 border border-white/30">Odoo v19</span>
              <span className="rounded-full bg-white/25 backdrop-blur-sm px-4 py-2 text-sm font-medium text-gray-900 border border-white/30">Grafana</span>
              <span className="rounded-full bg-white/25 backdrop-blur-sm px-4 py-2 text-sm font-medium text-gray-900 border border-white/30">SmarterMCP</span>
            </div>
          </div>

          {/* Mobile header */}
          <div className="lg:hidden flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md border border-white/30">
                <svg className="h-6 w-6 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-black text-gray-900">SmarterOS</h2>
            </div>
          </div>

          {/* Login form - Clean white border frame */}
          <div className="w-full max-w-[340px] mx-auto lg:mx-0 lg:w-[360px] lg:flex-shrink-0">
            <div className="rounded-[28px] border-2 border-white/50 p-1 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
              <div className="rounded-3xl bg-white/95 backdrop-blur-xl p-5 sm:p-6">
                <SignIn
                  routing="path"
                  path="/"
                  signUpUrl="/auth/sign-up"
                  forceRedirectUrl="/dashboard"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "bg-transparent shadow-none p-0 border-0 w-full",
                      main: "w-full",
                      form: "w-full",
                      headerTitle: "text-lg font-bold text-gray-900 text-center w-full",
                      headerSubtitle: "text-xs text-gray-500 text-center w-full",
                      socialButtonsBlockButton: "w-full bg-gray-100 border-0 hover:bg-gray-200 transition-all duration-200 py-2.5 rounded-xl",
                      socialButtonsBlockButtonText: "text-gray-900 font-medium text-sm",
                      socialButtonsProviderIcon: "h-5 w-5",
                      formButtonPrimary: "w-full bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-md transition-all duration-200 hover:shadow-lg py-2.5 rounded-xl",
                      footerActionLink: "text-amber-600 hover:text-amber-700 font-semibold text-sm",
                      formFieldInput: "w-full bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:ring-amber-500 py-2.5 text-sm rounded-xl",
                      formFieldLabel: "text-gray-700 text-xs font-medium",
                      dividerLine: "bg-gray-200",
                      dividerText: "text-gray-400 text-xs",
                      logoImage: "hidden",
                      logoBox: "hidden",
                      identityPreviewText: "text-gray-900 text-sm",
                      identityPreviewEditButton: "text-amber-600 text-sm",
                      formFieldInputShowPasswordButton: "text-gray-400 hover:text-gray-600",
                      otpCodeFieldInput: "bg-gray-50 border-gray-200 text-gray-900",
                      formResendCodeLink: "text-amber-600 text-sm",
                      footer: "hidden",
                      socialButtons: "w-full flex flex-col gap-2",
                      socialButtonsBlockButtonArrow: "hidden",
                      formFieldRow: "mb-3",
                      alternativeMethods: "mt-3",
                    },
                    layout: {
                      logoPlacement: "none",
                      socialButtonsPlacement: "top",
                      showOptionalFields: false,
                    },
                  }}
                />

                {/* Footer inside the card */}
                <div className="mt-4 text-center border-t border-gray-100 pt-3">
                  <p className="text-xs text-gray-500">
                    ¿No tienes cuenta?{" "}
                    <a href="/auth/sign-up" className="font-bold text-amber-600 hover:text-amber-700">
                      Crear cuenta
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile footer tags */}
          <div className="lg:hidden flex flex-wrap justify-center gap-1.5 mt-1">
            <span className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-gray-900 border border-white/30">Chatwoot</span>
            <span className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-gray-900 border border-white/30">N8N</span>
            <span className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-gray-900 border border-white/30">Supabase</span>
            <span className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-gray-900 border border-white/30">Grafana</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-3 lg:bottom-4 left-0 right-0 text-center text-xs text-gray-900/50 z-10">
        © 2026 SmarterOS
      </div>
    </div>
  )
}
