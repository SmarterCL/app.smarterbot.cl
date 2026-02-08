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
        </div>
      </div>

      {/* Right Column: Clean Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 px-6 relative">

        {/* Mobile Logo Visibility */}
        <div className="lg:hidden mb-12 flex flex-col items-center">
          <div className="h-16 w-16 bg-[#FFCE00] rounded-2xl flex items-center justify-center shadow-xl mb-4">
            <svg className="h-10 w-10 text-black" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">SmarterOS</h1>
        </div>

        {/* Reformulated Central Card */}
        <div className="w-full max-w-[420px] animate-in fade-in zoom-in duration-700">
          <div className="bg-white rounded-[44px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden">

            {/* Brand Focal Point */}
            <div className="flex flex-col items-center pt-12 pb-6">
              <div className="h-24 w-24 bg-[#FFCE00] rounded-[32px] flex items-center justify-center shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-500">
                <svg className="h-14 w-14 text-black" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Acceso Seguro</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mt-2">Continuar con tu cuenta</p>
            </div>

            <div className="px-10 pb-12">
              {/* Clerk Sign-In with prominence */}
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
                    socialButtonsBlockButton: "w-full h-16 bg-white hover:bg-slate-50 border-[3px] border-slate-50 hover:border-amber-400 transition-all duration-300 rounded-[24px] flex items-center justify-center shadow-sm active:scale-95 group",
                    socialButtonsBlockButtonText: "text-slate-900 font-black text-sm uppercase tracking-wide",
                    socialButtonsProviderIcon: "h-7 w-7 mr-4",
                    formButtonPrimary: "w-full h-16 bg-slate-900 text-white hover:bg-black font-black transition-all duration-300 rounded-[24px] transform active:scale-95 shadow-xl shadow-slate-200",
                    formFieldInput: "w-full h-16 bg-slate-50 border-slate-100 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/5 text-sm rounded-[24px] transition-all border-2",
                    formFieldLabel: "text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] ml-5 mb-2",
                    footerActionLink: "hidden",
                    dividerLine: "bg-slate-100",
                    dividerText: "text-slate-300 text-[10px] font-black uppercase tracking-[0.4em]",
                    identityPreviewText: "text-slate-900 font-bold",
                    identityPreviewEditButton: "text-amber-600 hover:text-amber-700 font-black",
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

              {/* Double Option: Enterprise/Brand Custom Button */}
              <div className="mt-4">
                <a
                  href="https://enterprise.smarterbot.cl/web/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-16 bg-[#FFCE00] hover:bg-[#E6BA00] text-black font-black rounded-[24px] flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 shadow-lg shadow-amber-500/10"
                >
                  <div className="bg-black p-1.5 rounded-lg shadow-sm">
                    <svg className="h-5 w-5 text-[#FFCE00]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="uppercase text-sm tracking-wide">Acceso Enterprise</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}