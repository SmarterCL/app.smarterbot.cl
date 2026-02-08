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
      </div>

      {/* Right Column: Login Form Only */}
      <div className="flex-1 lg:flex-[0.8] xl:flex-[0.7] flex flex-col items-center justify-center bg-slate-50 px-6 py-12 relative">

        {/* Mobile Logo (Visible only on mobile) */}
        <div className="lg:hidden flex flex-col items-center mb-10 animate-in fade-in slide-in-from-top-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFCE00] shadow-xl mb-4">
            <svg className="h-10 w-10 text-black" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">SmarterOS</h1>
        </div>

        {/* Minimal Login Card - Pure focus on entry */}
        <div className="w-full max-w-[420px] mx-auto animate-in fade-in zoom-in duration-700">
          <div className="bg-white rounded-[40px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden">

            {/* Header section inside the card */}
            <div className="px-10 pt-12 pb-4 text-center">
              <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-slate-100 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">
                Acceso Sistema Operativo
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Bienvenido</h3>
              <div className="mt-2 h-1.5 w-12 bg-[#FFCE00] mx-auto rounded-full" />
            </div>

            {/* Clerk Sign-In */}
            <div className="p-10 pt-6">
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
                    form: "w-full space-y-6",
                    header: "hidden",
                    socialButtonsBlockButton: "w-full h-14 bg-white hover:bg-slate-50 border-2 border-slate-100 hover:border-amber-400 transition-all duration-300 rounded-[22px] flex items-center justify-center active:scale-[0.98]",
                    socialButtonsBlockButtonText: "text-slate-900 font-extrabold text-sm",
                    socialButtonsProviderIcon: "h-6 w-6 mr-3",
                    formButtonPrimary: "w-full h-14 bg-slate-900 text-white hover:bg-black font-black transition-all duration-300 rounded-[22px] transform active:scale-[0.98] shadow-lg shadow-slate-200",
                    formFieldInput: "w-full h-14 bg-slate-50 border-slate-100 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/5 text-sm rounded-[22px] transition-all border-2",
                    formFieldLabel: "text-slate-500 text-[10px] font-black uppercase tracking-widest ml-4 mb-2",
                    footerActionLink: "hidden",
                    dividerLine: "bg-slate-100",
                    dividerText: "text-slate-300 text-[10px] font-black uppercase tracking-widest",
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
          </div>
        </div>
      </div>
    </div>
  )
}