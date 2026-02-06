"use client"

import { SignIn } from "@clerk/nextjs"
import Image from "next/image"

export default function Home() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 overflow-hidden">
      <div className="flex h-full items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-16">

          {/* Left side - Hero content (hidden on mobile, visible on desktop) */}
          <div className="hidden lg:flex flex-1 flex-col items-start space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="relative flex h-20 w-20 items-center justify-center">
                <div className="absolute inset-0 rounded-2xl bg-yellow-300 shadow-lg"></div>
                <svg className="relative h-12 w-12 text-gray-900 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-4xl font-black text-gray-900 drop-shadow-sm" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.1)' }}>
                  Smarter<span className="text-gray-800">OS</span>
                </h2>
              </div>
            </div>

            <h1 className="text-4xl font-bold leading-tight text-gray-900 lg:text-5xl" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
              Únete a la revolución de la automatización
            </h1>

            <p className="text-xl text-gray-800/90" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.05)' }}>
              Conecta WhatsApp, IA y automatizaciones en una sola plataforma.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-gray-900/10 px-4 py-2 text-sm font-semibold text-gray-900 backdrop-blur-sm shadow-sm">Chatwoot</span>
              <span className="rounded-full bg-gray-900/10 px-4 py-2 text-sm font-semibold text-gray-900 backdrop-blur-sm shadow-sm">N8N</span>
              <span className="rounded-full bg-gray-900/10 px-4 py-2 text-sm font-semibold text-gray-900 backdrop-blur-sm shadow-sm">Supabase</span>
              <span className="rounded-full bg-gray-900/10 px-4 py-2 text-sm font-semibold text-gray-900 backdrop-blur-sm shadow-sm">Odoo v19</span>
              <span className="rounded-full bg-gray-900/10 px-4 py-2 text-sm font-semibold text-gray-900 backdrop-blur-sm shadow-sm">Grafana</span>
              <span className="rounded-full bg-gray-900/10 px-4 py-2 text-sm font-semibold text-gray-900 backdrop-blur-sm shadow-sm">SmarterMCP</span>
            </div>
          </div>

          {/* Mobile header */}
          <div className="lg:hidden flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center">
                <div className="absolute inset-0 rounded-xl bg-yellow-300 shadow-md"></div>
                <svg className="relative h-7 w-7 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-black text-gray-900" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.1)' }}>
                SmarterOS
              </h2>
            </div>
            <p className="text-sm text-gray-800/80">Automatización inteligente</p>
          </div>

          {/* Login form - centered container */}
          <div className="w-full max-w-[400px] lg:w-[400px] lg:flex-shrink-0">
            <div className="rounded-2xl lg:rounded-3xl bg-slate-900/95 backdrop-blur-sm p-5 sm:p-6 lg:p-8 shadow-2xl shadow-black/30">
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
                    headerTitle: "text-lg lg:text-xl font-bold text-white text-center w-full",
                    headerSubtitle: "text-xs lg:text-sm text-gray-400 text-center w-full",
                    socialButtonsBlockButton: "w-full bg-white/10 border-0 hover:bg-white/20 transition-all duration-200 py-3 rounded-xl",
                    socialButtonsBlockButtonText: "text-white font-medium text-sm",
                    socialButtonsProviderIcon: "brightness-0 invert h-5 w-5",
                    formButtonPrimary: "w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold shadow-lg transition-all duration-200 hover:shadow-xl py-3 rounded-xl",
                    footerActionLink: "text-yellow-400 hover:text-yellow-300 font-medium text-sm",
                    formFieldInput: "w-full bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-yellow-500 focus:ring-yellow-500 py-3 text-sm rounded-xl",
                    formFieldLabel: "text-gray-300 text-xs font-medium",
                    dividerLine: "bg-white/20",
                    dividerText: "text-gray-500 text-xs",
                    logoImage: "hidden",
                    logoBox: "hidden",
                    identityPreviewText: "text-white text-sm",
                    identityPreviewEditButton: "text-yellow-400 text-sm",
                    formFieldInputShowPasswordButton: "text-gray-400 hover:text-white",
                    otpCodeFieldInput: "bg-white/10 border-white/20 text-white",
                    formResendCodeLink: "text-yellow-400 text-sm",
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
              <div className="mt-5 text-center border-t border-white/10 pt-4">
                <p className="text-xs lg:text-sm text-gray-400">
                  ¿No tienes cuenta?{" "}
                  <a href="/auth/sign-up" className="font-semibold text-yellow-400 hover:text-yellow-300 transition-colors">
                    Crear cuenta
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Mobile footer tags */}
          <div className="lg:hidden flex flex-wrap justify-center gap-2 mt-2">
            <span className="rounded-full bg-gray-900/10 px-3 py-1.5 text-xs font-semibold text-gray-900 shadow-sm">Chatwoot</span>
            <span className="rounded-full bg-gray-900/10 px-3 py-1.5 text-xs font-semibold text-gray-900 shadow-sm">N8N</span>
            <span className="rounded-full bg-gray-900/10 px-3 py-1.5 text-xs font-semibold text-gray-900 shadow-sm">Supabase</span>
            <span className="rounded-full bg-gray-900/10 px-3 py-1.5 text-xs font-semibold text-gray-900 shadow-sm">Odoo v19</span>
            <span className="rounded-full bg-gray-900/10 px-3 py-1.5 text-xs font-semibold text-gray-900 shadow-sm">Grafana</span>
            <span className="rounded-full bg-gray-900/10 px-3 py-1.5 text-xs font-semibold text-gray-900 shadow-sm">SmarterMCP</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-3 lg:bottom-4 left-0 right-0 text-center text-xs text-gray-900/50">
        © 2026 SmarterOS
      </div>
    </div>
  )
}
