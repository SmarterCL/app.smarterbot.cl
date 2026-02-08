"use client"

import { SignUp } from "@clerk/nextjs"
import { Bot } from "lucide-react"

export default function SignUpPage() {
  return (
    <div className="fixed inset-0 flex flex-col lg:flex-row h-screen w-full overflow-hidden bg-[#FFCE00]">

      {/* Left Column: Brand & Identity (Visible on Desktop) */}
      <div className="relative hidden lg:flex flex-1 flex-col items-center justify-center px-12 overflow-hidden border-r-4 border-black/5">
        {/* Background Decorative Element (Lightning Bolt) */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 opacity-10 pointer-events-none">
          <svg className="w-[800px] h-[800px] text-black" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        <div className="relative z-10 max-w-xl animate-in slide-in-from-left duration-1000">
          <div className="flex items-center gap-6 mb-12">
            <div className="flex h-24 w-24 items-center justify-center rounded-[28px] bg-black shadow-2xl">
              <Bot className="h-14 w-14 text-[#FFCE00]" />
            </div>
            <div>
              <h1 className="text-7xl font-[1000] text-black tracking-tighter leading-none">
                SmarterOS
              </h1>
              <p className="text-xl font-black text-black/40 uppercase tracking-[0.3em] mt-2">
                Join the Network
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-5xl font-black text-black leading-[1.05] tracking-tight">
              Crea tu propia<br />
              <span className="text-white drop-shadow-sm">Consola de Inteligencia.</span>
            </h2>

            <p className="text-lg font-bold text-black/60 max-w-md leading-relaxed">
              Regístrate ahora y accede a todas las herramientas de automatización empresarial en un solo lugar.
            </p>
          </div>

          {/* Ecosystem Tags */}
          <div className="mt-16 flex flex-wrap gap-3">
            {[
              { name: 'Chatwoot', delay: 'delay-[100ms]' },
              { name: 'N8N', delay: 'delay-[200ms]' },
              { name: 'Supabase', delay: 'delay-[300ms]' },
              { name: 'Clerk', delay: 'delay-[400ms]' },
              { name: 'Odoo v16', delay: 'delay-[500ms]' }
            ].map((tag) => (
              <span
                key={tag.name}
                className={`px-5 py-2.5 rounded-2xl bg-black text-[#FFCE00] text-[10px] font-black uppercase tracking-[0.2em] shadow-lg animate-in zoom-in duration-700 ${tag.delay}`}
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-12 left-12 opacity-30">
          <p className="text-xs font-black text-black tracking-[0.5em] uppercase">Built for Automation</p>
        </div>
      </div>

      {/* Right Column: Sign Up Card */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        {/* Mobile Background decoration */}
        <div className="absolute inset-0 lg:hidden opacity-5 pointer-events-none">
          <svg className="w-full h-full text-black" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        <div className="w-full max-w-[440px] animate-in fade-in zoom-in duration-700 relative z-10">
          <div className="relative group">
            {/* Ambient Shadow */}
            <div className="absolute -inset-1.5 rounded-[52px] bg-black/10 opacity-40 blur-2xl"></div>

            <div className="relative bg-white rounded-[44px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-white/20 overflow-hidden">

              {/* Card Header */}
              <div className="flex flex-col items-center px-6 pt-10 pb-2 md:px-10">
                <div className="lg:hidden flex h-16 w-16 items-center justify-center rounded-[20px] bg-black shadow-xl mb-6">
                  <Bot className="h-8 w-8 text-[#FFCE00]" />
                </div>

                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-slate-100 text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4">
                  Acceso Sistema Operativo
                </div>

                <h3 className="text-2xl md:text-3xl font-[1000] text-slate-900 tracking-tight text-center uppercase italic">Portal Registro</h3>
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
    </div>
  )
}