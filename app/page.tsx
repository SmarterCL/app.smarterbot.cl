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

          {/* Login form - iOS style glassmorphism */}
          <div className="w-full max-w-[360px] mx-auto lg:mx-0 lg:w-[380px] lg:flex-shrink-0">
            <div className="relative rounded-3xl bg-white/15 backdrop-blur-xl border border-white/40 p-6 lg:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.15)] transition-shadow duration-300">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>

              <div className="relative z-10">
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
                      headerTitle: "text-lg lg:text-xl font-bold text-gray-900 text-center w-full",
                      headerSubtitle: "text-xs lg:text-sm text-gray-700 text-center w-full",
                      socialButtonsBlockButton: "w-full bg-white/50 backdrop-blur-sm border border-white/60 hover:bg-white/70 transition-all duration-200 py-3 rounded-2xl shadow-sm",
                      socialButtonsBlockButtonText: "text-gray-900 font-semibold text-sm",
                      socialButtonsProviderIcon: "h-5 w-5",
                      formButtonPrimary: "w-full bg-gray-900 hover:bg-gray-800 text-white font-bold shadow-lg transition-all duration-200 hover:shadow-xl py-3 rounded-2xl",
                      footerActionLink: "text-gray-900 hover:text-gray-700 font-semibold text-sm underline",
                      formFieldInput: "w-full bg-white/50 backdrop-blur-sm border-white/60 text-gray-900 placeholder:text-gray-500 focus:border-gray-900 focus:ring-gray-900 py-3 text-sm rounded-2xl",
                      formFieldLabel: "text-gray-800 text-xs font-semibold",
                      dividerLine: "bg-gray-900/20",
                      dividerText: "text-gray-600 text-xs",
                      logoImage: "hidden",
                      logoBox: "hidden",
                      identityPreviewText: "text-gray-900 text-sm",
                      identityPreviewEditButton: "text-gray-900 text-sm underline",
                      formFieldInputShowPasswordButton: "text-gray-600 hover:text-gray-900",
                      otpCodeFieldInput: "bg-white/50 border-white/60 text-gray-900",
                      formResendCodeLink: "text-gray-900 underline text-sm",
                      footer: "hidden",
                      socialButtons: "w-full flex flex-col gap-3",
                      socialButtonsBlockButtonArrow: "hidden",
                      formFieldRow: "mb-4",
                      alternativeMethods: "mt-4",
                    },
                    layout: {
                      logoPlacement: "none",
                      socialButtonsPlacement: "top",
                      showOptionalFields: false,
                    },
                  }}
                />

                {/* Footer inside the card */}
                <div className="mt-5 text-center border-t border-gray-900/10 pt-4">
                  <p className="text-xs lg:text-sm text-gray-700">
                    ¿No tienes cuenta?{" "}
                    <a href="/auth/sign-up" className="font-bold text-gray-900 hover:underline">
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
