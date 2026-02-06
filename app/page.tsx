"use client"

import { SignIn } from "@clerk/nextjs"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500">
      <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">

          {/* Left side - Hero content */}
          <div className="flex-1 space-y-6 lg:pr-8">
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

          {/* Right side - Login form */}
          <div className="w-full lg:w-[420px] lg:flex-shrink-0">
            <div className="rounded-3xl bg-slate-900 p-8 shadow-2xl">
              <SignIn
                routing="path"
                path="/"
                signUpUrl="/auth/sign-up"
                forceRedirectUrl="/dashboard"
                appearance={{
                  elements: {
                    rootBox: "w-full mx-auto",
                    card: "bg-transparent shadow-none p-0 border-0 w-full",
                    main: "w-full",
                    form: "w-full",
                    headerTitle: "text-xl font-semibold text-white text-center",
                    headerSubtitle: "text-sm text-gray-400 text-center",
                    socialButtonsBlockButton: "w-full bg-white/10 border-0 hover:bg-white/20 transition-colors",
                    socialButtonsBlockButtonText: "text-white font-medium",
                    socialButtonsProviderIcon: "brightness-0 invert",
                    formButtonPrimary: "w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold shadow-lg transition-all hover:shadow-xl",
                    footerActionLink: "text-yellow-400 hover:text-yellow-300 font-medium",
                    formFieldInput: "w-full bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-yellow-500 focus:ring-yellow-500",
                    formFieldLabel: "text-gray-300",
                    dividerLine: "bg-white/20",
                    dividerText: "text-gray-500",
                    logoImage: "h-10 w-auto brightness-0 invert mx-auto",
                    logoBox: "justify-center mb-4",
                    identityPreviewText: "text-white",
                    identityPreviewEditButton: "text-yellow-400",
                    formFieldInputShowPasswordButton: "text-gray-400 hover:text-white",
                    otpCodeFieldInput: "bg-white/10 border-white/20 text-white",
                    formResendCodeLink: "text-yellow-400",
                    footer: "hidden",
                    socialButtons: "w-full",
                    socialButtonsBlockButtonArrow: "hidden",
                  },
                  layout: {
                    logoPlacement: "inside",
                    socialButtonsPlacement: "top",
                    showOptionalFields: false,
                  },
                }}
              />

              {/* Footer inside the card */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  ¿No tienes cuenta?{" "}
                  <a href="/auth/sign-up" className="font-medium text-yellow-400 hover:text-yellow-300">
                    Crear cuenta
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-black/60">
        © 2026 SmarterOS. Todos los derechos reservados.
      </div>
    </div>
  )
}
