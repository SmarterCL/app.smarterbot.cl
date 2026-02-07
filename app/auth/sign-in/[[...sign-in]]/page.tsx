"use client"

import { SignIn, useSignIn } from "@clerk/nextjs"
import Image from "next/image"

export default function SignInPage() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-black/90">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/login-bg.png"
          alt="SmarterOS Background"
          fill
          className="object-cover opacity-90"
          priority
        />
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">

        {/* Hero Section - Web Header */}
        <div className="mb-8 hidden lg:block text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">HERO SmarterOS</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            El sistema operativo para automatizar tu negocio con inteligencia artificial.
          </p>
        </div>

        {/* Mobile Header */}
        <div className="mb-8 lg:hidden text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
              <img 
                src="/placeholder-logo.png" 
                alt="SmarterOS Logo" 
                className="h-7 w-7 object-contain"
              />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">SmarterOS</h1>
          </div>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-[400px] animate-in fade-in zoom-in duration-500 slide-in-from-bottom-4">
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-amber-500 to-orange-600 opacity-30 blur-xl transition duration-500 group-hover:opacity-50"></div>

            <div className="relative overflow-hidden rounded-[28px] bg-white/80 backdrop-blur-xl shadow-2xl ring-1 ring-white/50">

              {/* Card Header */}
              <div className="bg-white/50 px-6 py-6 text-center border-b border-white/20">
                <h3 className="text-xl font-bold text-gray-900">Sistema Operativo</h3>
                <p className="text-xs font-medium text-gray-500 mt-1 uppercase tracking-wider">para continuar ingresa</p>
              </div>

              {/* Clerk Component with only Google provider */}
              <div className="px-6 py-4">
                <SignIn
                  routing="path"
                  path="/auth/sign-in"
                  signUpUrl="/auth/sign-up"
                  forceRedirectUrl="/dashboard"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "bg-transparent shadow-none p-0 border-0 w-full",
                      main: "w-full",
                      form: "w-full gap-3",
                      header: "hidden",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      socialButtonsBlockButton: "w-full bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 py-3 rounded-xl relative flex items-center justify-center shadow-sm",
                      socialButtonsBlockButtonText: "text-gray-700 font-semibold text-xs sm:text-sm",
                      socialButtonsProviderIcon: "h-5 w-5",
                      formButtonPrimary: "w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold shadow-lg shadow-orange-500/30 transition-all duration-200 py-3.5 rounded-xl transform hover:-translate-y-0.5",
                      footerActionLink: "text-orange-600 hover:text-orange-700 font-bold text-sm",
                      formFieldInput: "w-full bg-white/50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500/20 py-3 text-sm rounded-xl transition-all",
                      formFieldLabel: "text-gray-600 text-xs font-semibold uppercase tracking-wide ml-1 mb-1",
                      dividerLine: "bg-gray-300/50",
                      dividerText: "text-gray-400 text-[10px] font-bold uppercase tracking-widest",
                      logoImage: "hidden",
                      logoBox: "hidden",
                      identityPreviewText: "text-gray-900 text-sm font-medium",
                      identityPreviewEditButton: "text-orange-600 text-sm font-medium",
                      formFieldInputShowPasswordButton: "text-gray-400 hover:text-gray-600",
                      otpCodeFieldInput: "bg-white border-gray-200 text-gray-900 font-bold",
                      formResendCodeLink: "text-orange-600 text-sm font-medium",
                      footer: "hidden",
                      socialButtons: "w-full",
                      socialButtonsList: "flex flex-col gap-3",
                      socialButtonsItem: "w-full", // This makes each button take full width
                      socialButtonsBlockButtonArrow: "hidden",
                      formFieldRow: "mb-3",
                      alternativeMethods: "mt-4",
                    },
                    layout: {
                      logoPlacement: "none",
                      socialButtonsPlacement: "top",
                      showOptionalFields: false,
                    },
                  }}
                  signInUrl="/auth/sign-in"
                  signInFallbackRedirectUrl="/dashboard"
                  socialProviders={['google']} // Only show Google provider
                />
              </div>

              {/* Support Button - Outside the main form but inside the card */}
              <div className="px-6 pb-6 space-y-3">
                <a
                  href="https://flow.smarterbot.cl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white/50 hover:bg-green-50/80 border border-green-200/50 hover:border-green-300 transition-all duration-300 py-3 rounded-xl flex items-center justify-center gap-2 group shadow-sm hover:shadow-md"
                >
                  <div className="bg-green-100 p-1 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <svg className="h-4 w-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.888-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <span className="text-gray-600 group-hover:text-green-700 font-semibold text-xs sm:text-sm tracking-wide">¿Necesitas ayuda para ingresar?</span>
                </a>

                {/* Register Link */}
                <div className="pb-6 text-center">
                  <p className="text-xs font-medium text-gray-500">
                    ¿No tienes cuenta?{" "}
                    <a href="/auth/sign-up" className="font-bold text-orange-600 hover:text-orange-700 transition-colors uppercase tracking-tight">
                      Crear cuenta
                    </a>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Floating Tags for Mobile feeling */}
        <div className="mt-8 flex flex-wrap justify-center gap-2 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          {['Chatwoot', 'N8N', 'Supabase', 'Clerk', 'Odoo'].map((tag) => (
            <span key={tag} className="rounded-full bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1 text-[10px] font-medium text-white/80 uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-[10px] font-medium text-white/40 uppercase tracking-[0.2em]">
            © 2026 SmarterOS
          </p>
        </div>
      </div>
    </div>
  )
}