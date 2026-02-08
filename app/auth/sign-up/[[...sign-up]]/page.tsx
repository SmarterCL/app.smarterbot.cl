"use client"

import { SignUp } from "@clerk/nextjs"
import { usePathname } from "next/navigation"

export default function SignUpPage() {
  const pathname = usePathname()
  const isContinueStep = pathname.includes("/continue")

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 overflow-hidden flex items-center justify-center">
      {/* Decorative blur circles - More dynamic */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-yellow-300/40 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-orange-400/30 rounded-full blur-[120px]"></div>

      <div className="relative z-10 w-full max-w-5xl px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left side - Hero content (hidden on mobile, visible on desktop) */}
        <div className="hidden lg:flex flex-1 flex-col items-start space-y-8 max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-black shadow-2xl transform hover:scale-105 transition-transform">
              <svg className="h-10 w-10 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tighter">SmarterOS</h2>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl font-black leading-[1.1] text-gray-900 tracking-tight">
              {isContinueStep ? "Un último paso" : "Tu negocio, automatizado."}
            </h1>
            <p className="text-xl text-gray-800 font-medium opacity-90">
              {isContinueStep
                ? "Completa los datos restantes para activar tu sistema operativo empresarial."
                : "La plataforma definitiva de WhatsApp + IA para escalar tus ventas."}
            </p>
          </div>

          {!isContinueStep && (
            <div className="flex flex-wrap gap-2 pt-4">
              {['Chatwoot', 'N8N', 'Supabase', 'Clerk', 'Odoo v16', 'Grafana'].map(tech => (
                <span key={tech} className="rounded-xl bg-white/20 backdrop-blur-md px-4 py-2 text-xs font-black text-gray-900 border border-white/40 uppercase tracking-widest">
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Mobile header (Small logo) */}
        <div className="lg:hidden flex flex-col items-center mb-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black shadow-xl">
            <svg className="h-7 w-7 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>

        {/* Login form card */}
        <div className="w-full max-w-[480px]">
          <div className="relative">
            {/* Soft Ambient Shadow */}
            <div className="absolute -inset-4 rounded-[40px] bg-black/10 blur-3xl"></div>

            <div className="relative rounded-[32px] bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] overflow-hidden">
              {/* Header inside the card */}
              <div className="bg-slate-50 border-b border-slate-100 px-8 py-6 text-center">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">
                  {isContinueStep ? "Completar Registro" : "Crear Cuenta"}
                </h3>
                <div className="h-1 w-12 bg-yellow-400 mx-auto mt-2 rounded-full" />
              </div>

              {/* Clerk Wrapper - NO GAP - FULL ADJUST */}
              <div className="w-full">
                <SignUp
                  routing="path"
                  path="/auth/sign-up"
                  signInUrl="/auth/sign-in"
                  forceRedirectUrl="/auth/onboarding"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      cardBox: "w-full",
                      card: "bg-transparent shadow-none p-0 border-0 w-full max-w-none",
                      main: "w-full p-8 pt-4",
                      form: "w-full gap-5",
                      header: "hidden",
                      socialButtonsBlockButton: "w-full h-14 bg-white hover:bg-slate-50 border-2 border-slate-100 hover:border-amber-400 transition-all duration-300 rounded-[20px] flex items-center justify-center shadow-sm active:scale-[0.98]",
                      socialButtonsBlockButtonText: "text-slate-900 font-black text-sm uppercase tracking-wider",
                      socialButtonsProviderIcon: "h-6 w-6 mr-3",
                      formButtonPrimary: "w-full h-14 bg-slate-900 text-white hover:bg-black font-black transition-all duration-300 rounded-[20px] shadow-xl text-base active:scale-[0.98]",
                      footerActionLink: "text-amber-600 hover:text-amber-700 font-black",
                      formFieldInput: "w-full h-14 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/5 px-6 text-base rounded-[20px] transition-all border-2",
                      formFieldLabel: "text-slate-500 text-[11px] font-black uppercase tracking-[0.2em] ml-2 mb-2",
                      dividerLine: "bg-slate-100",
                      dividerText: "text-slate-300 text-[10px] font-black uppercase tracking-[0.4em]",
                      logoImage: "hidden",
                      logoBox: "hidden",
                      identityPreviewText: "text-slate-900 font-bold",
                      identityPreviewEditButton: "text-amber-600 font-black",
                      formFieldInputShowPasswordButton: "text-slate-400 hover:text-slate-600",
                      footer: "hidden",
                      socialButtons: "w-full grid grid-cols-1 sm:grid-cols-2 gap-4",
                      socialButtonsBlockButtonArrow: "hidden",
                      formFieldRow: "mb-0",
                    },
                    layout: {
                      logoPlacement: "none",
                      socialButtonsPlacement: "top",
                      showOptionalFields: false,
                    }
                  }}
                />
              </div>

              {/* Custom Bottom Actions */}
              {!isContinueStep && (
                <div className="px-8 pb-3 grid grid-cols-2 gap-4">
                  <a href="https://flow.smarterbot.cl/" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-green-50/50 border border-green-100 hover:bg-green-50 transition-colors">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="h-4 w-4 text-green-600" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    </div>
                    <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">Soporte</span>
                  </a>
                  <a href="https://enterprise.smarterbot.cl/web/login" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-blue-50/50 border border-blue-100 hover:bg-blue-50 transition-colors">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                    </div>
                    <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">Odoo</span>
                  </a>
                </div>
              )}

              <div className="px-8 pb-8 pt-4 text-center border-t border-slate-50">
                <p className="text-sm font-medium text-slate-500">
                  ¿Ya tienes cuenta?{" "}
                  <a href="/auth/sign-in" className="text-amber-600 hover:text-amber-700 font-black underline underline-offset-4">
                    Inicia sesión
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Extreme Footer */}
      <div className="absolute bottom-6 left-0 right-0 text-center text-[10px] font-black text-gray-900/30 uppercase tracking-[0.4em]">
        SmarterOS Global • v1.6.4
      </div>
    </div>
  )
}