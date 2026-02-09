"use client"

import { SignUp } from "@clerk/nextjs"
import { Bot, Zap, MessageSquare } from "lucide-react"

export default function SignUpPage() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:grid lg:grid-cols-2 bg-[#FFCE00] lg:bg-white overflow-x-hidden selection:bg-[#FFCE00] selection:text-black">

      {/* Left Column: Brand & Identity (Visible on Desktop) */}
      <div className="relative hidden lg:flex flex-col items-center justify-center px-12 overflow-hidden bg-slate-950 min-h-screen w-full">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
          style={{ backgroundImage: "url('/login-bg.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />

        <div className="relative z-10 max-w-xl animate-in slide-in-from-left duration-1000">
          <div className="flex items-center gap-6 mb-12">
            <div className="flex h-24 w-24 items-center justify-center rounded-[28px] bg-black shadow-2xl">
              <Bot className="h-14 w-14 text-[#FFCE00]" />
            </div>
            <div>
              <h1 className="text-7xl font-[1000] text-white tracking-tighter leading-none">
                SmarterOS
              </h1>
              <p className="text-xl font-black text-[#FFCE00] uppercase tracking-[0.3em] mt-2">
                Join the Network
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-5xl font-black text-white leading-[1.05] tracking-tight">
              Crea tu propia<br />
              <span className="text-[#FFCE00] drop-shadow-sm">Consola de Inteligencia.</span>
            </h2>

            <p className="text-lg font-bold text-slate-400 max-w-md leading-relaxed">
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
      <div className="flex flex-col items-center justify-center p-6 md:p-12 lg:p-16 relative min-h-screen w-full bg-[#FFCE00] lg:bg-white">
        {/* Mobile Background decoration */}
        <div className="absolute inset-0 lg:hidden opacity-5 pointer-events-none">
          <svg className="w-full h-full text-black" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        <div className="w-full max-w-[480px] animate-in fade-in zoom-in duration-1000 relative z-10 transition-transform hover:scale-[1.01]">
          <div className="relative group animate-float">
            {/* Ambient Shadow - High premium look */}
            <div className="absolute -inset-4 rounded-[60px] bg-black/5 opacity-50 blur-3xl transition-all duration-500 group-hover:opacity-80"></div>
            <div className="absolute -inset-1 rounded-[48px] bg-gradient-to-br from-black/5 to-transparent opacity-50"></div>

            <div className="relative bg-white/90 backdrop-blur-xl rounded-[44px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] border border-white/40 overflow-hidden transition-all duration-500 hover:shadow-[0_70px_120px_-20px_rgba(0,0,0,0.35)]">

              {/* Card Header */}
              <div className="flex flex-col items-center px-6 pt-12 pb-2 md:px-10">
                <div className="relative mb-6 group/logo">
                  <div className="absolute inset-0 bg-[#FFCE00] blur-xl opacity-20 group-hover/logo:opacity-40 transition-opacity"></div>
                  <div className="relative flex items-center justify-center">
                    <Zap className="h-16 w-16 text-[#FFCE00] fill-[#FFCE00] rotate-12 absolute -z-10 opacity-80" />
                    <h1 className="text-4xl font-[1000] italic text-black tracking-tighter drop-shadow-sm">
                      SmarterOS
                    </h1>
                  </div>
                </div>

                <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-slate-100/80 border border-slate-200/50 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6 backdrop-blur-sm">
                  Acceso Sistema Operativo
                </div>
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
                      socialButtonsBlockButtonText: "text-slate-900 font-bold text-xs",
                      socialButtonsProviderIcon: "h-4 w-4",
                      formButtonPrimary: "w-full h-12 bg-slate-900 text-white hover:bg-black font-black transition-all duration-300 rounded-[18px] transform active:scale-[0.98] shadow-xl text-sm",
                      formButtonPrimaryArrow: "hidden",
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
                    },
                    layout: {
                      logoPlacement: "none",
                      socialButtonsPlacement: "top",
                      showOptionalFields: false,
                    }
                  }}
                />
              </div>

              <div className="px-10 pb-10 pt-4 text-center">
                <p className="text-sm font-bold text-slate-400 mb-6">
                  ¿Ya tienes cuenta?{" "}
                  <a href="/auth/sign-in" className="text-black hover:text-amber-600 font-black underline underline-offset-4 decoration-2 transition-colors">
                    Inicia sesión
                  </a>
                </p>
                <a
                  href="https://wa.me/56912345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-black text-[#FFCE00] text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg active:scale-95"
                >
                  <MessageSquare className="h-4 w-4" />
                  Soporte WhatsApp Portal RUT
                </a>
              </div>
            </div>
          </div>

          {/* Footer removed as per user request */}
        </div>
      </div>
    </div>
  )
}