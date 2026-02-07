"use client"

import { SignIn } from "@clerk/nextjs"
import Image from "next/image"

export default function SignInPage() {
  return (
    <div className="fixed inset-0 h-[100dvh] w-full overflow-hidden bg-black">
      {/* Background with deep contrast for focus */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/login-bg.png"
          alt="SmarterOS Background"
          fill
          className="object-cover opacity-60 contrast-125 brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90" />
      </div>

      {/* Main Content Wrapper - Ensures centering and "air" */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 md:px-12 py-8">

        {/* Brand Header - Symmetrical & Clean */}
        <div className="mb-8 md:mb-12 text-center w-full max-w-2xl animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
            SmarterOS
          </h1>
          <p className="text-sm md:text-base text-white/40 max-w-lg mx-auto font-medium uppercase tracking-[0.2em] leading-relaxed">
            El sistema operativo para automatizar.<br />
            Tu negocio con inteligencia artificial.
          </p>
        </div>

        {/* Login Container - The "Card" with rounded corners and justified space */}
        <div className="w-full max-w-[440px] animate-in fade-in zoom-in duration-700 delay-200">
          <div className="relative overflow-hidden rounded-[38px] bg-white/[0.04] backdrop-blur-3xl border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]">

            {/* Inner Padding for "Air" inside the container */}
            <div className="p-8 md:p-10">

              {/* Context Title */}
              <div className="mb-8 text-center">
                <h3 className="text-xl font-bold text-white tracking-tight">Bienvenido</h3>
                <p className="text-xs text-white/40 mt-1 font-medium uppercase tracking-widest">Ingresa para continuar</p>
              </div>

              {/* Clerk Sign-In Integration - Buttons are back! */}
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
                    form: "w-full space-y-4",
                    header: "hidden",
                    socialButtonsBlockButton: "w-full bg-white hover:bg-gray-100 border-0 transition-all duration-300 py-3.5 rounded-2xl flex items-center justify-center shadow-lg active:scale-95",
                    socialButtonsBlockButtonText: "text-black font-bold text-sm",
                    socialButtonsProviderIcon: "h-5 w-5",
                    formButtonPrimary: "w-full h-12 bg-white text-black hover:bg-gray-100 font-black shadow-lg transition-all duration-300 rounded-2xl transform active:scale-95",
                    formFieldInput: "w-full h-12 bg-white/[0.05] border-white/10 text-white placeholder:text-white/20 focus:border-white/40 focus:ring-0 text-sm rounded-2xl transition-all border",
                    formFieldLabel: "text-white/40 text-[10px] font-black uppercase tracking-wider ml-2 mb-1.5",
                    footerActionLink: "text-white hover:underline font-bold text-sm",
                    dividerLine: "bg-white/10",
                    dividerText: "text-white/20 text-[10px] font-black uppercase tracking-widest",
                    identityPreviewText: "text-white",
                    identityPreviewEditButton: "text-white/60 hover:text-white",
                    footer: "hidden",
                  },
                }}
              />

              {/* Support & Help Link */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <a
                  href="https://flow.smarterbot.cl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 group transition-colors"
                >
                  <span className="text-white/30 group-hover:text-white/60 text-xs font-medium transition-colors tracking-tight">
                    ¿Necesitas ayuda para ingresar?
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* New Account Link - Outside but centered */}
          <div className="mt-6 text-center">
            <a href="/auth/sign-up" className="text-xs font-black text-white/30 hover:text-white uppercase tracking-widest transition-all">
              Crear una cuenta nueva
            </a>
          </div>
        </div>

        {/* Ecosystem Tags - Balanced at the bottom */}
        <div className="mt-12 flex flex-wrap justify-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          {['Chatwoot', 'N8N', 'Supabase', 'Clerk', 'Odoo'].map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-lg bg-white/[0.02] border border-white/5 text-[9px] font-bold text-white/20 uppercase tracking-widest">
              {tag}
            </span>
          ))}
        </div>

        {/* Hidden Footer Space */}
        <div className="absolute bottom-6 opacity-10 pointer-events-none">
          <p className="text-[10px] font-black text-white tracking-[1em]">© 2026</p>
        </div>
      </div>
    </div>
  )
}