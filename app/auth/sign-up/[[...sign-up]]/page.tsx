"use client"

import { SignUp } from "@clerk/nextjs"
import { Bot, Zap, MessageSquare, LayoutDashboard, Rocket, Eye, CreditCard, CheckCircle2 } from "lucide-react"

export default function SignUpPage() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:grid lg:grid-cols-2 bg-slate-50 selection:bg-[#FFCE00] selection:text-black">

      {/* Left Column: Technical Branding & Vertical Content */}
      <div className="relative hidden lg:flex flex-col items-center justify-center px-12 overflow-hidden bg-white min-h-screen w-full border-r border-slate-200">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FFCE00]/10 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-xl w-full">
          <div className="flex items-center gap-6 mb-16 px-4">
            <div className="p-4 bg-[#FFCE00] rounded-[24px] shadow-lg">
              <img
                src="/logo-smarteros.jpg"
                alt="SmarterOS"
                className="h-12 w-auto object-contain rounded-lg"
              />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic">
                SmarterOS
              </h1>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Hub de Automatización</p>
            </div>
          </div>

          <div className="relative p-10 rounded-[40px] bg-slate-50 border border-slate-200 shadow-inner group transition-all duration-500">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-8">Un ecosistema diseñado para crecer</h2>

            <div className="space-y-6">
              {[
                { title: 'Multi-Tenant', desc: 'Aislamiento total de datos por RUT.' },
                { title: 'Odoo v16', desc: 'ERP empresarial integrado nativamente.' },
                { title: 'IA Generativa', desc: 'Automatización inteligente de procesos.' },
                { title: 'Soporte 24/7', desc: 'Acompañamiento experto en cada paso.' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-[#FFCE00] shrink-0" />
                  <div>
                    <h4 className="font-black text-slate-900">{item.title}</h4>
                    <p className="text-sm text-slate-500 font-bold">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#FFCE00] rounded-full blur-[60px] opacity-20" />
          </div>
        </div>

        <div className="absolute bottom-12 left-12 opacity-40">
          <p className="text-[10px] font-black text-slate-400 tracking-[0.5em] uppercase">Hecho con amor en Chile - 2026</p>
        </div>
      </div>

      {/* Right Column: Redesigned Hub Card */}
      <div className="flex flex-col items-center justify-center p-6 md:p-12 lg:p-16 relative min-h-screen w-full bg-[#FFCE00]/5">
        <div className="w-full max-w-md relative z-10 group mt-8 sm:mt-0">
          <div className="relative group">
            <div className="absolute -inset-8 rounded-[70px] bg-[#FFCE00]/10 opacity-40 blur-3xl transition-all duration-700 group-hover:opacity-60"></div>
            <div className="relative bg-white rounded-[50px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-white overflow-hidden p-6 sm:p-10">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">SmarterOS Hub</h2>
                <p className="text-slate-400 font-bold italic">Activa tu Consola de Inteligencia</p>
              </div>

              <div className="space-y-4 mb-10 text-center">
                <div className="relative py-2">
                  <div className="absolute inset-x-0 top-1/2 h-px bg-slate-100" />
                  <div className="relative inline-block px-4 bg-white text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                    Registro de cuenta
                  </div>
                </div>

                {/* Clerk Sign-Up Component */}
                <div className="clerk-container w-full">
                  <SignUp
                    routing="path"
                    path="/auth/sign-up"
                    signInUrl="/auth/sign-in"
                    fallbackRedirectUrl="/dashboard"
                    forceRedirectUrl="/dashboard"
                    appearance={{
                      elements: {
                        rootBox: "w-full",
                        card: "bg-transparent shadow-none p-0 border-0 w-full flex flex-col items-center",
                        main: "w-full flex flex-col items-center",
                        form: "w-full space-y-5",
                        header: "hidden",
                        socialButtonsBlockButton: "w-full h-14 bg-white hover:bg-slate-50 border border-slate-200 transition-all duration-300 rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:scale-[1.02]",
                        socialButtonsBlockButtonText: "text-slate-900 font-bold text-sm",
                        formButtonPrimary: "w-full h-14 bg-slate-900 text-[#FFCE00] hover:bg-black font-black transition-all duration-300 rounded-full shadow-xl hover:scale-[1.02] text-base",
                        formFieldInput: "w-full h-14 bg-slate-50 border border-slate-100 text-slate-900 shadow-sm focus:border-[#FFCE00] focus:ring-4 focus:ring-[#FFCE00]/10 text-sm rounded-full transition-all px-6",
                        formFieldLabel: "hidden",
                        footerAction: "hidden",
                        dividerLine: "bg-slate-100",
                        dividerText: "text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]",
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

                <div className="pt-8">
                  <p className="text-sm font-bold text-slate-400">
                    ¿Ya tienes cuenta?{" "}
                    <a href="/auth/sign-in" className="text-slate-900 hover:text-[#FFCE00] font-black underline underline-offset-4 decoration-2 transition-colors">
                      Inicia sesión
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}