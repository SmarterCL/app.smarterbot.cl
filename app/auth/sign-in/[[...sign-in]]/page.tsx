"use client"

import { SignIn } from "@clerk/nextjs"
import Image from "next/image"

export default function SignInPage() {
  return (
    <div className="fixed inset-0 flex flex-col lg:flex-row h-[100dvh] w-full overflow-hidden bg-white">

      {/* Left Column: Brand & Hero (Visible on Desktop) */}
      <div className="relative hidden lg:flex flex-1 flex-col items-center justify-center bg-[#FFCE00] p-12 overflow-hidden">
        {/* Background Decorative Element (Lightning Bolt subtle) */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 opacity-10 pointer-events-none">
          <svg className="w-[800px] h-[800px] text-black" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        <div className="relative z-10 max-w-xl text-center lg:text-left">
          {/* Logo Section */}
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-black shadow-2xl">
              <svg className="h-12 w-12 text-[#FFCE00]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-6xl font-[1000] text-black tracking-tighter">
              SmarterOS
            </h1>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-black leading-tight tracking-tight">
              El sistema operativo para automatizar.<br />
              Tu negocio con inteligencia artificial.
            </h2>
          </div>

          {/* Ecosystem Tags for the left side */}
          <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-3">
            {['Chatwoot', 'N8N', 'Supabase', 'Clerk', 'Odoo'].map((tag) => (
              <span key={tag} className="px-4 py-2 rounded-xl bg-black/5 border border-black/10 text-xs font-black text-black/60 uppercase tracking-widest">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Brand visual reinforcement */}
        <div className="absolute bottom-12 left-12 opacity-20">
          <p className="text-xs font-black text-black tracking-[0.5em] uppercase">Built for Automation</p>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="lg:w-[500px] xl:w-[600px] flex flex-col items-center justify-center bg-slate-50 px-6 py-12 relative overflow-y-auto">

        {/* Mobile Logo (Visible only on mobile) */}
        <div className="lg:hidden flex flex-col items-center mb-12 animate-in fade-in slide-in-from-top-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFCE00] shadow-xl mb-4">
            <svg className="h-10 w-10 text-black" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">SmarterOS</h1>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2">Sistema Operativo</p>
        </div>

        {/* Login Card Container - Centered with absolute focus */}
        <div className="w-full max-w-[420px] mx-auto animate-in fade-in zoom-in duration-700">
          <div className="bg-white rounded-[32px] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden">

            {/* Context Title */}
            <div className="px-8 pt-10 pb-2 text-center">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Bienvenido</h3>
              <p className="text-sm text-slate-500 mt-1 font-medium">Automatización sin límites</p>
            </div>

            {/* Clerk Sign-In */}
            <div className="p-8 pt-6">
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
                    socialButtonsBlockButton: "w-full h-14 bg-white hover:bg-slate-50 border-2 border-slate-100 hover:border-amber-400 transition-all duration-300 rounded-[20px] flex items-center justify-center active:scale-95",
                    socialButtonsBlockButtonText: "text-slate-900 font-extrabold text-sm",
                    socialButtonsProviderIcon: "h-6 w-6 mr-3",
                    formButtonPrimary: "w-full h-14 bg-slate-900 text-white hover:bg-black font-black transition-all duration-300 rounded-[20px] transform active:scale-95",
                    formFieldInput: "w-full h-14 bg-slate-50 border-slate-100 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/5 text-sm rounded-[20px] transition-all border-2",
                    formFieldLabel: "text-slate-600 text-[10px] font-black uppercase tracking-wider ml-3 mb-1.5",
                    footerActionLink: "text-amber-600 hover:text-amber-700 font-black text-sm transition-colors",
                    dividerLine: "bg-slate-200",
                    dividerText: "text-slate-400 text-[10px] font-black uppercase tracking-widest",
                    identityPreviewText: "text-slate-900 font-bold",
                    identityPreviewEditButton: "text-amber-600 hover:text-amber-700 font-bold",
                    footer: "hidden",
                    socialButtons: "w-full",
                    socialButtonsList: "flex flex-col gap-3",
                    socialButtonsItem: "w-full",
                  },
                  layout: {
                    logoPlacement: "none",
                    socialButtonsPlacement: "top",
                    showOptionalFields: false,
                  }
                }}
              />
            </div>

            {/* Support section */}
            <div className="px-8 pb-10">
              <div className="pt-6 border-t border-slate-50">
                <a
                  href="https://flow.smarterbot.cl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors group"
                >
                  <div className="h-8 w-8 flex items-center justify-center rounded-full bg-white shadow-sm">
                    <svg className="h-4 w-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.888-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <span className="text-slate-600 group-hover:text-amber-600 text-xs font-black uppercase tracking-tight transition-colors">
                    Soporte WhatsApp
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* New Account Link */}
          <div className="mt-8 text-center flex flex-col items-center gap-3">
            <span className="text-slate-400 text-sm font-medium">¿No tienes cuenta?</span>
            <a href="/auth/sign-up" className="px-8 py-3 rounded-2xl border-2 border-slate-200 text-slate-900 font-black hover:bg-slate-100 transition-all uppercase tracking-wider text-xs">
              Únete a SmarterOS
            </a>
          </div>
        </div>

        {/* Minimal Footer for Right Side */}
        <div className="mt-auto pt-12 opacity-40 pointer-events-none">
          <p className="text-[10px] font-black text-slate-400 tracking-[0.5em] uppercase">SmarterOS 2026</p>
        </div>
      </div>
    </div>
  )
}