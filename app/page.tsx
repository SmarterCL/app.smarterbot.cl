"use client";

import Link from 'next/link';
import { Zap } from "lucide-react";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-white selection:bg-[#FFCE00] selection:text-black">
            {/* Header */}
            <header className="sticky top-0 z-[60] bg-white/80 backdrop-blur-xl border-b border-slate-100">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
                                <Zap className="h-6 w-6 text-[#FFCE00] fill-[#FFCE00]" />
                            </div>
                            <span className="text-xl font-black text-slate-900 tracking-tighter italic">
                                Smarter<span className="text-[#FFCE00]">OS</span>
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <Link 
                                href="/auth/sign-in" 
                                className="bg-slate-900 text-[#FFCE00] text-sm font-black px-6 py-2.5 rounded-xl hover:scale-105 transition-transform shadow-lg shadow-yellow-500/10"
                            >
                                Entrar
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Simple Hero */}
            <main className="flex-1 flex items-center justify-center py-20">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-xs font-bold text-slate-600 uppercase tracking-widest">
                            <div className="h-2 w-2 rounded-full bg-[#FFCE00] animate-pulse" />
                            Acceso Corporativo
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter italic leading-none">
                            SmarterOS <span className="text-slate-500">+</span> <span className="text-[#FFCE00]">OpenClaw</span>
                        </h1>
                        
                        <p className="text-xl text-slate-500 font-bold max-w-xl mx-auto">
                            Infraestructura de agentes inteligentes para empresas modernas.
                        </p>

                        <div className="pt-8">
                            <Link 
                                href="/auth/sign-in" 
                                className="inline-flex h-16 px-10 bg-slate-900 text-[#FFCE00] font-black rounded-2xl items-center justify-center hover:bg-black transition-all hover:scale-105 shadow-2xl text-lg uppercase tracking-widest"
                            >
                                Iniciar Sesión
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            {/* Simple Footer */}
            <footer className="py-12 border-t border-slate-100 mt-auto">
                <div className="container mx-auto px-4 text-center text-slate-400 text-sm font-bold">
                    <p>© 2026 SmarterOS • Network Protocol</p>
                </div>
            </footer>
        </div>
    );
}
