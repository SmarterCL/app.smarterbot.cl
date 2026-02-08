"use client"

import { SignIn } from "@clerk/nextjs"
import { Bot } from "lucide-react"

export default function SignInPage() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:grid lg:grid-cols-2 bg-[#FFCE00] overflow-x-hidden selection:bg-black selection:text-[#FFCE00]">

      {/* Left Column: Brand & Identity (Visible on Desktop) */}
      <div className="relative hidden lg:flex flex-col items-center justify-center px-12 overflow-hidden border-r-4 border-black/5 min-h-screen w-full">
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
                The AI Console
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-5xl font-black text-black leading-[1.05] tracking-tight">
              Automatiza tu negocio<br />
              <span className="text-white drop-shadow-sm">con Inteligencia Artificial.</span>
            </h2>

            <p className="text-lg font-bold text-black/60 max-w-md leading-relaxed">
              Gestiona WhatsApp, n8n, Odoo y Supabase desde una sola consola unificada y premium.
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
          <p className="text-xs font-black text-black tracking-[0.5em] uppercase">Enterprise Grade Platform</p>
        </div>
      </div>

      {/* Right Column: Login Card */}
      <div className="flex flex-col items-center justify-center p-6 md:p-12 lg:p-16 relative min-h-screen w-full">
        {/* Mobile Background decoration */}
        <div className="absolute inset-0 lg:hidden opacity-5 pointer-events-none">
          <svg className="w-full h-full text-black" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        <div className="w-full max-w-[480px] animate-in fade-in zoom-in duration-700 relative z-10">
          <div className="relative group">
            {/* Ambient Shadow */}
            <div className="absolute -inset-1.5 rounded-[52px] bg-black/10 opacity-40 blur-2xl"></div>

            <div className="relative bg-white rounded-[44px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-white/20 overflow-hidden">

              {/* Card Header */}
              <div className="flex flex-col items-center px-6 pt-10 pb-2 md:px-10">
                {/* Logo removed as per user request */}

                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-slate-100 text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4">
                  Acceso Sistema Operativo
                </div>

                <h3 className="text-2xl md:text-3xl font-[1000] text-slate-900 tracking-tight text-center uppercase italic">Login SmarterOS + RUT</h3>
                <div className="h-1.5 w-12 bg-[#FFCE00] rounded-full mt-3" />
              </div>

              {/* Clerk Sign-In */}
              <div className="px-6 pb-6 pt-4 md:px-10">
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
                      form: "w-full space-y-5",
                      header: "hidden",
                      socialButtonsBlockButton: "w-full h-14 bg-white hover:bg-slate-50 border-[3px] border-slate-50 hover:border-amber-400 transition-all duration-300 rounded-[22px] flex items-center justify-center shadow-sm active:scale-[95]",
                      socialButtonsBlockButtonText: "text-slate-900 font-[900] text-sm uppercase tracking-wide",
                      socialButtonsProviderIcon: "hidden",
                      formButtonPrimary: "w-full h-14 bg-slate-900 text-white hover:bg-black font-black transition-all duration-300 rounded-[22px] transform active:scale-[0.95] shadow-xl text-base",
                      formButtonPrimaryArrow: "hidden",
                      formFieldInput: "w-full h-14 bg-slate-50 border-slate-100 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/5 text-sm rounded-[22px] transition-all border-2 px-6",
                      formFieldLabel: "text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] ml-6 mb-2",
                      footerActionLink: "hidden",
                      dividerLine: "bg-slate-100",
                      dividerText: "text-slate-300 text-[10px] font-black uppercase tracking-[0.4em]",
                      identityPreviewText: "text-slate-900 font-bold text-xs",
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

              <div className="px-10 pb-8 pt-2 text-center border-t border-slate-50">
                <p className="text-sm font-medium text-slate-500 mb-4">
                  ¿No tienes cuenta?{" "}
                  <a href="/auth/sign-up" className="text-amber-600 hover:text-amber-700 font-black underline underline-offset-4">
                    Regístrate gratis
                  </a>
                </p>
                <a
                  href="https://wa.me/56912345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wider hover:bg-emerald-100 transition-colors"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.67-1.611-.918-2.206-.242-.593-.487-.514-.67-.523-.173-.008-.371-.009-.57-.009-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
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