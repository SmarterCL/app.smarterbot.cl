"use client"

import { SignIn } from "@clerk/nextjs"
import { Bot, Zap } from "lucide-react"
import { useState, useEffect } from 'react'

export default function SignInPage() {
  const [plan, setPlan] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setPlan(params.get('plan'));
    }
  }, []);

  const redirectUrl = plan ? `/onboarding?plan=${plan}` : `/dashboard`;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FFCE00] p-6 selection:bg-slate-900 selection:text-[#FFCE00]">
      {/* Dynamic Background elements for premium feel but keeping it minimalist */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-black/5 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-500">
        <div className="relative group">
          {/* Subtle Glow */}
          <div className="absolute -inset-4 rounded-[60px] bg-black/5 opacity-50 blur-2xl"></div>

          <div className="relative bg-white rounded-[44px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border border-white overflow-hidden p-8 sm:p-12">
            
            <div className="flex flex-col items-center mb-10">
              <div className="p-4 bg-slate-900 rounded-[22px] shadow-xl mb-6">
                <Bot className="h-10 w-10 text-[#FFCE00]" />
              </div>
              <h1 className="text-4xl font-[1000] text-slate-900 tracking-tighter italic">
                Picoclaw
              </h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2">Acceso Instantáneo</p>
            </div>

            <div className="clerk-container w-full">
              <SignIn
                routing="path"
                path="/auth/sign-in"
                signUpUrl={plan ? `/auth/sign-up?plan=${plan}` : "/auth/sign-up"}
                fallbackRedirectUrl={redirectUrl}
                forceRedirectUrl={redirectUrl}
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "bg-transparent shadow-none p-0 border-0 w-full flex flex-col items-center",
                    main: "w-full flex flex-col items-center",
                    form: "w-full space-y-4",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    socialButtonsBlockButton: "w-full h-14 bg-white hover:bg-slate-50 border-2 border-slate-100 transition-all duration-300 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md hover:scale-[1.02]",
                    socialButtonsBlockButtonText: "text-slate-900 font-black text-sm uppercase tracking-tight",
                    formButtonPrimary: "w-full h-14 bg-slate-900 hover:bg-black text-[#FFCE00] font-black transition-all duration-300 rounded-2xl shadow-xl hover:scale-[1.02] text-base border-none uppercase tracking-widest",
                    formFieldInput: "w-full h-14 bg-slate-50 border-2 border-slate-100 text-slate-900 shadow-sm focus:border-[#FFCE00] focus:ring-4 focus:ring-[#FFCE00]/10 text-sm rounded-2xl transition-all px-6 font-bold",
                    formFieldLabel: "hidden",
                    footerAction: "hidden",
                    dividerLine: "bg-slate-100",
                    dividerText: "text-slate-400 text-[9px] font-black uppercase tracking-[0.4em]",
                    identityPreviewText: "text-slate-900 font-bold text-xs",
                    footer: "hidden",
                    socialButtonsList: "flex flex-col gap-4 w-full",
                  },
                  layout: {
                    logoPlacement: "none",
                    socialButtonsPlacement: "top",
                    showOptionalFields: false,
                  }
                }}
              />
            </div>

            <div className="mt-10 text-center">
              <p className="text-xs font-bold text-slate-400">
                ¿Nuevo en la red?{" "}
                <a 
                  href={plan ? `/auth/sign-up?plan=${plan}` : "/auth/sign-up"} 
                  className="text-slate-900 hover:text-amber-600 font-black underline underline-offset-4 decoration-2 transition-colors"
                >
                  Regístrate aquí
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center opacity-30">
          <p className="text-[9px] font-black text-slate-900 tracking-[0.5em] uppercase">Picoclaw Engine • 2026</p>
        </div>
      </div>
    </div>
  )
}