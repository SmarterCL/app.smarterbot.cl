"use client"

import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 overflow-hidden">
      {/* Decorative blur circles */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-yellow-300/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-orange-400/30 rounded-full blur-3xl"></div>

      <div className="relative z-10 flex h-full items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16">

          {/* Left side - Hero content (hidden on mobile, visible on desktop) */}
          <div className="hidden lg:flex flex-1 flex-col items-start space-y-6 max-w-md">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
                <svg className="h-8 w-8 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-black text-gray-900">SmarterOS</h2>
            </div>

            <h1 className="text-4xl font-bold leading-tight text-gray-900">
              Automatización inteligente para tu negocio
            </h1>

            <p className="text-lg text-gray-800/90">
              WhatsApp + IA en una sola plataforma.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-white/25 backdrop-blur-sm px-4 py-2 text-sm font-medium text-gray-900 border border-white/30">Chatwoot</span>
              <span className="rounded-full bg-white/25 backdrop-blur-sm px-4 py-2 text-sm font-medium text-gray-900 border border-white/30">N8N</span>
              <span className="rounded-full bg-white/25 backdrop-blur-sm px-4 py-2 text-sm font-medium text-gray-900 border border-white/30">Supabase</span>
              <span className="rounded-full bg-white/25 backdrop-blur-sm px-4 py-2 text-sm font-medium text-gray-900 border border-white/30">Clerk</span>
              <span className="rounded-full bg-white/25 backdrop-blur-sm px-4 py-2 text-sm font-medium text-gray-900 border border-white/30">Odoo v19</span>
              <span className="rounded-full bg-white/25 backdrop-blur-sm px-4 py-2 text-sm font-medium text-gray-900 border border-white/30">Grafana</span>
            </div>
          </div>

          {/* Mobile header */}
          <div className="lg:hidden flex flex-col items-center gap-2 text-center">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md border border-white/30">
                <svg className="h-6 w-6 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-black text-gray-900">SmarterOS</h2>
            </div>
          </div>

          {/* Login form - Centered with frame effect */}
          <div className="w-full max-w-[400px] lg:max-w-[450px]">
            {/* Outer frame with shadow for depth */}
            <div className="relative">
              {/* Shadow layer */}
              <div className="absolute inset-0 rounded-[32px] bg-black/20 blur-xl translate-y-4"></div>

              {/* Main card with border frame */}
              <div className="relative rounded-[28px] p-[3px] bg-gradient-to-b from-white/80 to-white/40 shadow-2xl">
                <div className="rounded-[26px] bg-white overflow-hidden">
                  {/* Custom header */}
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 border-b border-amber-100">
                    <h3 className="text-xl font-bold text-gray-900 text-center">
                      Sistema Operativo
                    </h3>
                    <p className="text-xs text-gray-500 text-center mt-1">para crear tu cuenta</p>
                  </div>

                  {/* Clerk SignUp */}
                  <SignUp
                    routing="path"
                    path="/auth/sign-up"
                    signInUrl="/auth/sign-in"
                    forceRedirectUrl="/dashboard"
                    appearance={{
                      elements: {
                        rootBox: "w-full",
                        card: "bg-transparent shadow-none px-6 py-5 border-0 w-full",
                        main: "w-full",
                        form: "w-full gap-3",
                        header: "hidden",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                        socialButtonsBlockButton: "w-full bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-all duration-200 py-2.5 rounded-xl relative flex items-center justify-center",
                        socialButtonsBlockButtonText: "text-gray-900 font-medium text-xs sm:text-sm",
                        socialButtonsProviderIcon: "h-5 w-5",
                        formButtonPrimary: "w-full bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-lg transition-all duration-200 py-3 rounded-xl",
                        footerActionLink: "text-amber-600 hover:text-amber-700 font-semibold text-sm",
                        formFieldInput: "w-full bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:ring-amber-500 py-3 text-sm rounded-xl",
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
                        socialButtons: "w-full grid grid-cols-1 sm:grid-cols-2 gap-3",
                        socialButtonsBlockButtonArrow: "hidden",
                        formFieldRow: "mb-3",
                        alternativeMethods: "mt-2",
                      },
                      layout: {
                        logoPlacement: "none",
                        socialButtonsPlacement: "top",
                        showOptionalFields: false,
                      },
                    }}
                  />

                  {/* Custom Social Buttons Grid (WhatsApp + Enterprise) */}
                  <div className="px-6 pb-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* WhatsApp Support */}
                    <a
                      href="https://flow.smarterbot.cl/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-white/50 hover:bg-green-50/80 border border-green-200/50 hover:border-green-300 transition-all duration-300 py-2.5 rounded-xl flex items-center justify-center gap-2 group shadow-sm hover:shadow-md"
                    >
                      <div className="bg-green-100 p-1 rounded-full group-hover:scale-110 transition-transform duration-300">
                        <svg className="h-4 w-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </div>
                      <span className="text-gray-600 group-hover:text-green-700 font-semibold text-xs tracking-tight">Ayuda</span>
                    </a>

                    {/* Enterprise Login */}
                    <a
                      href="https://enterprise.smarterbot.cl/web/login"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-white/50 hover:bg-blue-50/80 border border-blue-200/50 hover:border-blue-300 transition-all duration-300 py-2.5 rounded-xl flex items-center justify-center gap-2 group shadow-sm hover:shadow-md"
                    >
                      <div className="bg-blue-100 p-1 rounded-full group-hover:scale-110 transition-transform duration-300">
                        <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                          <line x1="8" y1="21" x2="16" y2="21"></line>
                          <line x1="12" y1="17" x2="12" y2="21"></line>
                        </svg>
                      </div>
                      <span className="text-gray-600 group-hover:text-blue-700 font-semibold text-xs tracking-tight">Enterprise</span>
                    </a>
                  </div>

                  {/* Footer inside the card */}
                  <div className="px-6 pb-5 text-center">
                    <p className="text-sm text-gray-500">
                      ¿Ya tienes cuenta?{" "}
                      <a href="/auth/sign-in" className="font-bold text-amber-600 hover:text-amber-700">
                        Iniciar sesión
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile footer tags */}
          <div className="lg:hidden flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-gray-900 border border-white/30">Chatwoot</span>
            <span className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-gray-900 border border-white/30">N8N</span>
            <span className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-gray-900 border border-white/30">Supabase</span>
            <span className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-gray-900 border border-white/30">Clerk</span>
            <span className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-gray-900 border border-white/30">Grafana</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-3 left-0 right-0 text-center text-xs text-gray-900/50 z-10">
        © 2026 SmarterOS
      </div>
    </div>
  )
}