"use client"

import { SignIn } from "@clerk/nextjs"

export default function Home() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 overflow-hidden">
      <div className="flex h-full items-center justify-center p-3 sm:p-6 lg:p-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 lg:flex-row lg:items-center lg:gap-16">

          {/* Left side - Hero content (hidden on mobile, visible on desktop) */}
          <div className="hidden lg:flex flex-1 flex-col space-y-6 lg:pr-8">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black/20 backdrop-blur-sm">
                <svg className="h-8 w-8 text-black" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-3xl font-bold text-black">SmarterOS</span>
            </div>

            <h1 className="text-4xl font-bold leading-tight text-black sm:text-5xl lg:text-6xl">
              Únete a la revolución de la automatización inteligente
            </h1>

            <p className="text-xl text-black/80">
              Conecta WhatsApp, IA y automatizaciones en una sola plataforma.
              Impulsa tus ventas y operaciones desde cualquier lugar.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-black/20 px-4 py-2 text-sm font-medium text-black">Chatwoot</span>
              <span className="rounded-full bg-black/20 px-4 py-2 text-sm font-medium text-black">N8N</span>
              <span className="rounded-full bg-black/20 px-4 py-2 text-sm font-medium text-black">Odoo</span>
              <span className="rounded-full bg-black/20 px-4 py-2 text-sm font-medium text-black">Botpress</span>
            </div>
          </div>

          {/* Mobile header */}
          <div className="lg:hidden text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/20 backdrop-blur-sm">
                <svg className="h-5 w-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-black">SmarterOS</span>
            </div>
            <p className="text-sm text-black/70">Automatización inteligente</p>
          </div>

          {/* Login form */}
          <div className="w-full lg:w-[420px] lg:flex-shrink-0">
            <div className="rounded-2xl lg:rounded-3xl bg-slate-900 p-4 sm:p-6 lg:p-8 shadow-2xl">
              <SignIn
                routing="path"
                path="/"
                signUpUrl="/auth/sign-up"
                forceRedirectUrl="/dashboard"
                appearance={{
                  elements: {
                    rootBox: "w-full mx-auto",
                    card: "bg-transparent shadow-none p-0 border-0 w-full",
                    main: "w-full gap-3",
                    form: "w-full gap-3",
                    headerTitle: "text-lg lg:text-xl font-semibold text-white text-center",
                    headerSubtitle: "text-xs lg:text-sm text-gray-400 text-center",
                    socialButtonsBlockButton: "w-full bg-white/10 border-0 hover:bg-white/20 transition-colors py-2.5",
                    socialButtonsBlockButtonText: "text-white font-medium text-sm",
                    socialButtonsProviderIcon: "brightness-0 invert h-4 w-4",
                    formButtonPrimary: "w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold shadow-lg transition-all hover:shadow-xl py-2.5",
                    footerActionLink: "text-yellow-400 hover:text-yellow-300 font-medium text-sm",
                    formFieldInput: "w-full bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-yellow-500 focus:ring-yellow-500 py-2.5 text-sm",
                    formFieldLabel: "text-gray-300 text-xs",
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
                    socialButtons: "w-full gap-2",
                    socialButtonsBlockButtonArrow: "hidden",
                    formFieldRow: "mb-2",
                    alternativeMethods: "mt-2",
                  },
                  layout: {
                    logoPlacement: "none",
                    socialButtonsPlacement: "top",
                    showOptionalFields: false,
                  },
                }}
              />

              {/* Footer inside the card */}
              <div className="mt-4 text-center">
                <p className="text-xs lg:text-sm text-gray-400">
                  ¿No tienes cuenta?{" "}
                  <a href="/auth/sign-up" className="font-medium text-yellow-400 hover:text-yellow-300">
                    Crear cuenta
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Mobile footer tags */}
          <div className="lg:hidden flex flex-wrap justify-center gap-1.5">
            <span className="rounded-full bg-black/20 px-3 py-1 text-xs font-medium text-black">Chatwoot</span>
            <span className="rounded-full bg-black/20 px-3 py-1 text-xs font-medium text-black">N8N</span>
            <span className="rounded-full bg-black/20 px-3 py-1 text-xs font-medium text-black">Odoo</span>
            <span className="rounded-full bg-black/20 px-3 py-1 text-xs font-medium text-black">Botpress</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-2 lg:bottom-4 left-0 right-0 text-center text-xs text-black/50">
        © 2026 SmarterOS
      </div>
    </div>
  )
}
