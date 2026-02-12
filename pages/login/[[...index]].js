import { SignIn } from "@clerk/nextjs";
import { Bot, Zap, ArrowRight, MessageSquare, LayoutDashboard, Rocket, Eye, CreditCard } from "lucide-react";
import Head from 'next/head';

export default function SignInPage() {
    return (
        <div className="min-h-screen w-full flex flex-col lg:grid lg:grid-cols-2 bg-slate-50 selection:bg-[#FFCE00] selection:text-black">
            <Head>
                <title>SmarterOS Hub - Iniciar Sesión</title>
            </Head>

            {/* Left Column: Technical Branding & Vertical Content */}
            <div className="relative hidden lg:flex flex-col items-center justify-center px-12 overflow-hidden bg-white min-h-screen w-full border-r border-slate-200">
                {/* Background Decorative Element */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FFCE00]/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FFCE00]/5 rounded-full blur-[120px]" />

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

                    <div className="relative p-8 rounded-[40px] bg-slate-50 border border-slate-200 shadow-inner group transition-all duration-500 hover:border-[#FFCE00]/30 mr-8">
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center text-[#FFCE00] text-xs font-bold">1</div>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Consola de Inteligencia</h3>
                                </div>
                                <p className="text-slate-500 font-bold leading-relaxed ml-12">
                                    Gestión centralizada de WhatsApp, n8n, Odoo v16 y Supabase en un solo ecosistema integrado.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center text-[#FFCE00] text-xs font-bold">2</div>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Arquitectura Empresarial</h3>
                                </div>
                                <p className="text-slate-500 font-bold leading-relaxed ml-12">
                                    Infraestructura robusta diseñada para la escalabilidad y seguridad de tu información.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center text-[#FFCE00] text-xs font-bold">3</div>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Desarrollado en Chile</h3>
                                </div>
                                <p className="text-slate-500 font-bold leading-relaxed ml-12">
                                    Soporte local y cumplimiento normativo regional para tu tranquilidad operativa.
                                </p>
                            </div>
                        </div>

                        <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-24 h-48 bg-white border-2 border-slate-100 rounded-[30px] shadow-2xl flex flex-col items-center justify-around py-4 opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500">
                            <Zap className="h-6 w-6 text-[#FFCE00] fill-[#FFCE00]" />
                            <Bot className="h-6 w-6 text-slate-900" />
                            <Rocket className="h-6 w-6 text-slate-400" />
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-12 left-12 opacity-40">
                    <p className="text-[10px] font-black text-slate-400 tracking-[0.5em] uppercase">Hecho con amor en Chile - 2026</p>
                </div>
            </div>

            {/* Right Column: Redesigned Hub Card */}
            <div className="flex flex-col items-center justify-center p-6 md:p-12 lg:p-16 relative min-h-screen w-full bg-[#FFCE00]/5">
                <div className="w-full max-w-[500px] relative z-10">
                    <div className="relative group">
                        <div className="absolute -inset-8 rounded-[70px] bg-black/5 opacity-40 blur-3xl transition-all duration-700 group-hover:opacity-60"></div>
                        <div className="relative bg-white rounded-[50px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-white overflow-hidden p-8 md:p-12">
                            <div className="text-center mb-10">
                                <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">SmarterOS Hub</h2>
                                <p className="text-slate-400 font-bold">¿Cómo querés empezar?</p>
                            </div>

                            <div className="space-y-4 mb-10 text-center">
                                <a
                                    href="/precios"
                                    className="w-full h-14 bg-slate-100 hover:bg-slate-200 text-slate-900 font-black rounded-full flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-slate-200"
                                >
                                    <CreditCard className="h-5 w-5 opacity-60" />
                                    Ver planes y precios
                                </a>

                                <a
                                    href="#"
                                    className="w-full h-14 bg-slate-100 hover:bg-slate-200 text-slate-900 font-black rounded-full flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-slate-200"
                                >
                                    <Eye className="h-5 w-5 opacity-60" />
                                    Ver demo en vivo
                                </a>

                                <div className="relative py-6">
                                    <div className="absolute inset-x-0 top-1/2 h-px bg-slate-100" />
                                    <div className="relative inline-block px-4 bg-white text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">
                                        Ir a mi app
                                    </div>
                                </div>

                                <div className="clerk-container w-full">
                                    <SignIn
                                        routing="path"
                                        path="/login"
                                        signUpUrl="/signup"
                                        afterSignInUrl="/dashboard"
                                        appearance={{
                                            elements: {
                                                rootBox: "w-full",
                                                card: "bg-transparent shadow-none p-0 border-0 w-full flex flex-col items-center",
                                                main: "w-full flex flex-col items-center",
                                                form: "w-full space-y-4",
                                                header: "hidden",
                                                socialButtonsBlockButton: "w-full h-14 bg-white hover:bg-slate-50 border-2 border-slate-100 transition-all duration-300 rounded-[22px] flex items-center justify-center shadow-sm active:scale-[0.98] hover:border-[#FFCE00]/50 hover:shadow-md",
                                                socialButtonsBlockButtonText: "text-slate-900 font-bold text-sm",
                                                formButtonPrimary: "w-full h-14 bg-[#FFCE00] text-black hover:bg-slate-900 hover:text-[#FFCE00] font-black transition-all duration-300 rounded-full transform active:scale-[0.95] shadow-lg text-base",
                                                formFieldInput: "w-full h-14 bg-slate-50 border-slate-200 text-slate-900 focus:border-[#FFCE00] focus:ring-4 focus:ring-[#FFCE00]/20 text-sm rounded-[22px] transition-all border-2 px-6",
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

                                <a
                                    href="/signup"
                                    className="w-full h-14 bg-slate-900 hover:bg-black text-[#FFCE00] font-black rounded-full flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mt-8"
                                >
                                    <Rocket className="h-5 w-5" />
                                    Activar CRM/ERP
                                </a>
                            </div>

                            <div className="text-center pt-8 border-t border-slate-50">
                                <a
                                    href="https://wa.me/56979540471"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 text-slate-400 hover:text-slate-600 transition-colors text-xs font-bold"
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
