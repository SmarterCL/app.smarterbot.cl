import { SignUp } from "@clerk/nextjs";
import { Bot, Zap, MessageSquare } from "lucide-react";
import Head from 'next/head';

export default function SignUpPage() {
    return (
        <div className="min-h-screen w-full flex flex-col lg:grid lg:grid-cols-2 bg-[#FFCE00] lg:bg-white overflow-x-hidden selection:bg-[#FFCE00] selection:text-black">
            <Head>
                <title>SmarterOS - Registro</title>
            </Head>

            {/* Left Column: Brand & Identity (Visible on Desktop) */}
            <div className="relative hidden lg:flex flex-col items-center justify-center px-12 overflow-hidden bg-slate-950 min-h-screen w-full">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
                    style={{ backgroundImage: "url('/login-bg.png')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />

                <div className="relative z-10 max-w-xl">
                    <div className="flex items-center gap-6 mb-12">
                        <img
                            src="/logo-smarteros.jpg"
                            alt="SmarterOS"
                            className="h-24 w-auto rounded-[28px] shadow-2xl"
                        />
                    </div>

                    <div className="space-y-8 text-left">
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
                            { name: 'Chatwoot' },
                            { name: 'N8N' },
                            { name: 'Supabase' },
                            { name: 'Clerk' },
                            { name: 'Odoo v16' }
                        ].map((tag) => (
                            <span
                                key={tag.name}
                                className={`px-5 py-2.5 rounded-2xl bg-black text-[#FFCE00] text-[10px] font-black uppercase tracking-[0.2em] shadow-lg`}
                            >
                                {tag.name}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="absolute bottom-12 left-12 opacity-30">
                    <p className="text-xs font-black text-white tracking-[0.5em] uppercase">Built for Automation</p>
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

                <div className="w-full max-w-[480px] relative z-10">
                    <div className="relative group">
                        {/* Ambient Shadow - High premium look */}
                        <div className="absolute -inset-4 rounded-[60px] bg-black/5 opacity-50 blur-3xl transition-all duration-500 group-hover:opacity-80"></div>
                        <div className="absolute -inset-1 rounded-[48px] bg-gradient-to-br from-black/5 to-transparent opacity-50"></div>

                        <div className="relative bg-white/90 backdrop-blur-xl rounded-[44px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] border border-white/40 overflow-hidden transition-all duration-500 hover:shadow-[0_70px_120px_-20px_rgba(0,0,0,0.35)]">
                            {/* Card Header */}
                            <div className="flex flex-col items-center px-6 pt-12 pb-2 md:px-10">
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 bg-[#FFCE00] blur-xl opacity-20"></div>
                                    <div className="relative flex items-center justify-center">
                                        <img
                                            src="/logo-smarteros.jpg"
                                            alt="SmarterOS"
                                            className="h-16 w-auto object-contain rounded-2xl"
                                        />
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
                                    path="/signup"
                                    signInUrl="/login"
                                    afterSignUpUrl="/dashboard"
                                    appearance={{
                                        elements: {
                                            rootBox: "w-full flex justify-center",
                                            card: "bg-transparent shadow-none p-0 border-0 w-full mx-auto flex flex-col items-center",
                                            main: "w-full flex flex-col items-center",
                                            form: "w-full space-y-4",
                                            header: "hidden",
                                            socialButtonsBlockButton: "w-full h-12 bg-white hover:bg-slate-50 border-2 border-slate-100 transition-all duration-300 rounded-[18px] flex items-center justify-center shadow-sm active:scale-[0.98] hover:border-amber-400/50 hover:shadow-md",
                                            socialButtonsBlockButton__google: "hover:border-red-500/30",
                                            socialButtonsBlockButton__github: "hover:border-slate-800",
                                            socialButtonsBlockButtonText: "text-slate-900 font-bold text-xs",
                                            socialButtonsProviderIcon: "h-4 w-4",
                                            formButtonPrimary: "w-full h-12 bg-slate-900 text-white hover:bg-black font-black transition-all duration-300 rounded-[18px] transform active:scale-[0.98] shadow-xl text-sm",
                                            formButtonPrimaryArrow: "hidden",
                                            formFieldInput: "w-full h-12 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#FFCE00] focus:bg-white focus:ring-4 focus:ring-[#FFCE00]/5 text-sm rounded-[18px] transition-all border-2 px-6",
                                            formFieldLabel: "text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] ml-2 mb-1",
                                            footerActionLink: "hidden",
                                            dividerLine: "bg-slate-100",
                                            dividerText: "text-slate-300 text-[9px] font-black uppercase tracking-[0.4em]",
                                            identityPreviewText: "text-slate-900 font-bold text-xs",
                                            identityPreviewEditButton: "text-slate-600 hover:text-black font-black px-2",
                                            footer: "hidden",
                                            socialButtons: "w-full",
                                            socialButtonsList: "flex flex-col gap-3 w-full",
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
                                    <a href="/login" className="text-black hover:text-[#FFCE00] font-black underline underline-offset-4 decoration-2 transition-colors">
                                        Inicia sesión
                                    </a>
                                </p>
                                <a
                                    href="https://wa.me/56979540471"
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
                </div>
            </div>
        </div>
    );
}
