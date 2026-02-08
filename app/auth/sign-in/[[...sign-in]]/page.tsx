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
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-10">
            <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-black shadow-2xl">
              <svg className="h-12 w-12 text-[#FFCE00]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-7xl font-[1000] text-black tracking-tighter">
              SmarterOS
            </h1>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-black leading-[1.1] tracking-tight">
              El sistema operativo para automatizar.<br />
              Tu negocio con inteligencia artificial.
            </h2>
          </div>

          {/* Ecosystem Tags for the left side */}
          <div className="mt-14 flex flex-wrap justify-center lg:justify-start gap-3">
            {['Chatwoot', 'N8N', 'Supabase', 'Clerk', 'Odoo'].map((tag) => (
              <span key={tag} className="px-5 py-2.5 rounded-xl bg-black/5 border border-black/10 text-xs font-black text-black/60 uppercase tracking-widest transition-all hover:bg-black hover:text-[#FFCE00] cursor-default">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Brand visual reinforcement */}
        <div className="absolute bottom-12 left-12 opacity-20">
          <p className="text-xs font-black text-black tracking-[0.5em] uppercase">Enterprise Grade Automation</p>
        </div>
      </div>

      {/* Right Column: Clean Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 px-6 sm:px-12 py-12 relative overflow-y-auto">

        {/* Mobile Logo Visibility */}
        <div className="lg:hidden mb-12 flex flex-col items-center animate-in fade-in slide-in-from-top-4">
          <div className="h-16 w-16 bg-[#FFCE00] rounded-2xl flex items-center justify-center shadow-xl mb-4">
            <svg className="h-10 w-10 text-black" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">SmarterOS</h1>
        </div>

        {/* Reformulated Central Card - Fixed Centering & No Cut Offs */}
        <div className="w-full max-w-[460px] mx-auto animate-in fade-in zoom-in duration-700">
          <div className="relative group">
            {/* Ambient Shadow for depth */}
            <div className="absolute -inset-2 rounded-[52px] bg-slate-200 opacity-50 blur-2xl transition duration-1000 group-hover:opacity-75"></div>

            <div className="relative bg-white rounded-[48px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden">

              {/* Brand Focal Point / Header inside card */}
              <div className="flex flex-col items-center px-10 pt-14 pb-4">
                <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-slate-100 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6">
                  Acceso Sistema Operativo
                </div>

                <div className="flex items-center justify-center gap-4 mb-2">
                  <div className="h-px w-8 bg-slate-200" />
                  <h3 className="text-3xl font-[1000] text-slate-900 tracking-tight">Bienvenido</h3>
                  <div className="h-px w-8 bg-slate-200" />
                </div>
                <div className="h-1.5 w-14 bg-[#FFCE00] rounded-full mt-2" />
              </div>

              {/* Clerk Sign-In - Spacing Improved */}
              <div className="px-10 pb-14 pt-8">
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
                      socialButtonsBlockButton: "w-full h-16 bg-white hover:bg-slate-50 border-[3px] border-slate-50 hover:border-amber-400 transition-all duration-300 rounded-[24px] flex items-center justify-center shadow-sm active:scale-[0.98] group",
                      socialButtonsBlockButtonText: "text-slate-900 font-[900] text-sm uppercase tracking-wide",
                      socialButtonsProviderIcon: "h-7 w-7 mr-4",
                      formButtonPrimary: "w-full h-16 bg-slate-900 text-white hover:bg-black font-black transition-all duration-300 rounded-[24px] transform active:scale-[0.98] shadow-2xl shadow-slate-200",
                      formFieldInput: "w-full h-16 bg-slate-50 border-slate-100 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/5 text-sm rounded-[24px] transition-all border-2",
                      formFieldLabel: "text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] ml-6 mb-2",
                      footerActionLink: "hidden",
                      dividerLine: "bg-slate-100",
                      dividerText: "text-slate-300 text-[10px] font-black uppercase tracking-[0.4em]",
                      identityPreviewText: "text-slate-900 font-bold",
                      identityPreviewEditButton: "text-amber-600 hover:text-amber-700 font-black px-2",
                      footer: "hidden",
                      socialButtons: "w-full",
                      socialButtonsList: "flex flex-col gap-4",
                      socialButtonsItem: "w-full",
                      socialButtonsBlockButtonArrow: "hidden",
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

        {/* Brand visual reinforcement for the right side - subtle */}
        <div className="mt-8 opacity-20 hidden lg:block">
          <p className="text-[10px] font-black text-slate-400 tracking-[0.6em] uppercase">SmarterOS Hub</p>
        </div>
      </div>
    </div>
  )
}