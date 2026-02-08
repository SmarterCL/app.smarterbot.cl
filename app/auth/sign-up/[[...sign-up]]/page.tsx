"use client"

import { SignUp } from "@clerk/nextjs"
import { Bot } from "lucide-react"

export default function SignUpPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#FFCE00] overflow-hidden">
      {/* Background Decorative Element (Lightning Bolt) */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 opacity-10 pointer-events-none">
        <svg className="w-[800px] h-[800px] text-black" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 opacity-10 pointer-events-none rotate-180">
        <svg className="w-[800px] h-[800px] text-black" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>

      <div className="w-full max-w-[440px] px-6 animate-in fade-in zoom-in duration-700 relative z-10">
        <div className="relative group">
          {/* Ambient Shadow */}
          <div className="absolute -inset-1.5 rounded-[52px] bg-black/10 opacity-40 blur-2xl"></div>

          <div className="relative bg-white rounded-[44px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-white/20 overflow-hidden">

            {/* Card Header */}
            <div className="flex flex-col items-center px-6 pt-10 pb-2 md:px-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-black shadow-xl mb-6">
                <Bot className="h-8 w-8 text-[#FFCE00]" />
              </div>

              <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-slate-100 text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4">
                Sistema Operativo
              </div>

              <h3 className="text-2xl md:text-3xl font-[1000] text-slate-900 tracking-tight text-center">Crea tu cuenta</h3>
              <div className="h-1.5 w-12 bg-[#FFCE00] rounded-full mt-3" />
            </div>

            {/* Clerk Sign-Up */}
            <div className="px-6 pb-6 pt-4 md:px-10">
              <SignUp
                routing="path"
                path="/auth/sign-up"
                signInUrl="/auth/sign-in"
                forceRedirectUrl="/auth/onboarding"
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "bg-transparent shadow-none p-0 border-0 w-full",
                    main: "w-full",
                    form: "w-full space-y-4",
                    header: "hidden",
                    socialButtonsBlockButton: "w-full h-12 bg-white hover:bg-slate-50 border-2 border-slate-100 hover:border-amber-400 transition-all duration-300 rounded-[18px] flex items-center justify-center shadow-sm active:scale-[98]",
                    socialButtonsBlockButtonText: "text-slate-900 font-black text-xs uppercase tracking-wider",
                    socialButtonsProviderIcon: "h-5 w-5 mr-3",
                    formButtonPrimary: "w-full h-12 bg-slate-900 text-white hover:bg-black font-black transition-all duration-300 rounded-[18px] transform active:scale-[0.98] shadow-xl text-sm",
                    formFieldInput: "w-full h-12 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/5 text-sm rounded-[18px] transition-all border-2 px-6",
                    formFieldLabel: "text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] ml-2 mb-1",
                    footerActionLink: "hidden",
                    dividerLine: "bg-slate-100",
                    dividerText: "text-slate-300 text-[9px] font-black uppercase tracking-[0.4em]",
                    identityPreviewText: "text-slate-900 font-bold text-xs",
                    identityPreviewEditButton: "text-amber-600 hover:text-amber-700 font-black px-2",
                    footer: "hidden",
                    socialButtons: "w-full",
                    socialButtonsList: "flex flex-col gap-3",
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

            <div className="px-10 pb-10 pt-2 text-center border-t border-slate-50">
              <p className="text-sm font-medium text-slate-500">
                ¿Ya tienes cuenta?{" "}
                <a href="/auth/sign-in" className="text-amber-600 hover:text-amber-700 font-black underline underline-offset-4">
                  Inicia sesión
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 opacity-40 text-center">
          <p className="text-[10px] font-black text-black tracking-[0.6em] uppercase">SmarterOS Hub</p>
        </div>
      </div>
    </div>
  )
}