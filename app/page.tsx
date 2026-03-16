"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Bot, Zap, Rocket, X, ChevronDown, Play, Brain, ShieldCheck, Scale, Globe, Flag, Search, Filter } from "lucide-react";
import { Badge } from '@/components/ui/badge';

function Faq({ title, answer }: { title: string, answer: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="bg-slate-50 border border-slate-200 rounded-[30px] p-6 shadow-sm hover:border-slate-300 transition-colors">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center text-left focus:outline-none"
            >
                <span className="font-bold text-slate-900">{title}</span>
                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
                <div className="mt-4 text-slate-600 text-sm leading-relaxed animate-in fade-in slide-in-from-top-2">
                    {answer}
                </div>
            )}
        </div>
    );
}

function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-400 py-12 mt-auto text-sm">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h5 className="text-white font-bold">Smarter SPA</h5>
                        <div className="opacity-80 space-y-2">
                            <p>RUT: 78.233.417-4</p>
                            <p>Servicios de consultoría de desarrollo de software</p>
                            <p>Padre Mariano 103 Of 201, Providencia, Santiago</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h5 className="text-white font-bold">Nosotros</h5>
                        <ul className="space-y-2">
                            <li><Link href="/" className="hover:text-white transition-colors">Quiénes somos</Link></li>
                            <li><Link href="/" className="hover:text-white transition-colors">Precios</Link></li>
                            <li><a href="mailto:contacto@smarterbot.store" className="hover:text-white transition-colors">Contacto</a></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h5 className="text-white font-bold">Legal</h5>
                        <ul className="space-y-2">
                            <li><Link href="/" className="hover:text-white transition-colors">Privacidad</Link></li>
                            <li><Link href="/" className="hover:text-white transition-colors">Términos</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h5 className="text-white font-bold">Enlaces</h5>
                        <ul className="space-y-2">
                            <li><a href="https://smarterbot.cl" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Volver a smarterbot.cl</a></li>
                            <li><a href="https://odoo.smarterbot.store" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Portal Clientes</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default function Home() {
    const [activeMedia, setActiveMedia] = useState('video');
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [activePlanTab, setActivePlanTab] = useState('demo');
    const [activeCountry, setActiveCountry] = useState('chile');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('__sbot_count', '1');
        }
    }, []);

    return (
        <div className="flex flex-col min-h-screen font-sans bg-white selection:bg-[#FFCE00] selection:text-black">
            {/* Navigation Header */}
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
                        
                        <nav className="hidden md:flex items-center gap-1 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                            {['chile', 'argentina', 'peru', 'uruguay'].map((country) => (
                                <button
                                    key={country}
                                    onClick={() => setActiveCountry(country)}
                                    className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                                        activeCountry === country 
                                        ? 'bg-slate-900 text-[#FFCE00] shadow-md' 
                                        : 'text-slate-400 hover:text-slate-600'
                                    }`}
                                >
                                    {country}
                                </button>
                            ))}
                        </nav>

                        <div className="flex items-center gap-4">
                            <Link href="/auth/sign-in" className="text-sm font-bold text-slate-600 hover:text-slate-900 px-4">Entrar</Link>
                            <Link href="/auth/sign-up" className="bg-slate-900 text-[#FFCE00] text-sm font-black px-6 py-2.5 rounded-xl hover:scale-105 transition-transform shadow-lg shadow-yellow-500/10">Activar</Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Hero Section */}
            <div className="relative min-h-[90vh] flex items-center py-12 lg:py-0 overflow-hidden border-b border-slate-200">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FFCE00]/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FFCE00]/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                        {/* Left Column */}
                        <div className="w-full max-w-xl mx-auto lg:mx-0">
                            <div className="flex flex-wrap items-center gap-6 mb-12">
                                <div className="p-4 bg-slate-900 rounded-[24px] shadow-lg shrink-0 border border-slate-700">
                                    <Zap className="h-10 w-10 text-[#FFCE00] fill-[#FFCE00]" />
                                </div>
                                <div>
                                    <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter italic leading-none">
                                        SmarterOS <span className="text-slate-500 text-3xl sm:text-4xl">+</span> <span className="text-[#FFCE00]">OpenClaw</span>
                                    </h1>
                                    <p className="text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-[0.4em] mt-2">Infraestructura AI lista en minutos</p>
                                </div>
                            </div>

                            <div className="relative p-6 px-4 sm:px-8 sm:p-8 rounded-[40px] bg-white border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)] group transition-all duration-500 hover:border-[#FFCE00]/30 mr-0 lg:mr-8 overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFCE00]/5 rounded-full blur-3xl -mr-16 -mt-16" />
                                
                                <div className="space-y-8 sm:space-y-10 relative z-10">
                                    <div className="space-y-3 sm:space-y-4">
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <div className="h-9 w-9 min-w-[2.25rem] rounded-xl bg-slate-900 flex items-center justify-center text-[#FFCE00] text-sm font-black shadow-lg shadow-yellow-500/10">01</div>
                                            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">AI Agents 24/7</h3>
                                        </div>
                                        <p className="text-slate-500 font-bold leading-relaxed ml-12 sm:ml-13 text-sm sm:text-base">
                                            Operación autónoma ininterrumpida de agentes inteligentes especializados en ventas y soporte.
                                        </p>
                                    </div>

                                    <div className="space-y-3 sm:space-y-4">
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <div className="h-9 w-9 min-w-[2.25rem] rounded-xl bg-slate-900 flex items-center justify-center text-[#FFCE00] text-sm font-black shadow-lg shadow-yellow-500/10">02</div>
                                            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Automatización Empresarial</h3>
                                        </div>
                                        <p className="text-slate-500 font-bold leading-relaxed ml-12 sm:ml-13 text-sm sm:text-base">
                                            Integración perfecta con CRM, pagos y facturación. Todo conectado en un solo flujo inteligente.
                                        </p>
                                    </div>

                                    <div className="space-y-3 sm:space-y-4">
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <div className="h-9 w-9 min-w-[2.25rem] rounded-xl bg-slate-900 flex items-center justify-center text-[#FFCE00] text-sm font-black shadow-lg shadow-yellow-500/10">03</div>
                                            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Infraestructura Elástica</h3>
                                        </div>
                                        <p className="text-slate-500 font-bold leading-relaxed ml-12 sm:ml-13 text-sm sm:text-base">
                                            Sin hardware propio. Despliega en servidores VPS optimizados y opera desde cualquier lugar.
                                        </p>
                                    </div>
                                </div>

                                <div className="hidden sm:flex absolute -right-12 top-1/2 -translate-y-1/2 w-24 h-48 bg-white border border-slate-100 rounded-[30px] shadow-2xl flex-col items-center justify-around py-4 opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500">
                                    <div className="p-2 bg-slate-50 rounded-lg"><Zap className="h-6 w-6 text-[#FFCE00] fill-[#FFCE00]" /></div>
                                    <div className="p-2 bg-slate-50 rounded-lg"><Bot className="h-6 w-6 text-slate-900" /></div>
                                    <div className="p-2 bg-slate-50 rounded-lg"><Rocket className="h-6 w-6 text-slate-400" /></div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column (Planes) */}
                        <div className="w-full flex justify-center lg:justify-end mt-4 lg:mt-0 relative">
                            <div className="w-full max-w-md relative z-10 group mt-8 sm:mt-0">
                                <div className="absolute -inset-8 rounded-[70px] bg-[#FFCE00]/15 opacity-40 blur-3xl transition-all duration-700 group-hover:opacity-70"></div>
                                <div className="relative bg-white rounded-[50px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.18)] border border-slate-100 overflow-hidden p-6 sm:p-10">

                                    <div className="mb-6 flex items-center justify-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-[#FFCE00] animate-pulse"></div>
                                        <span className="text-[10px] uppercase font-black tracking-widest text-[#FFCE00]">Promoción Limitada</span>
                                    </div>

                                    <h2 className="text-center text-4xl font-black text-slate-900 mb-2 tracking-tighter">OpenClaw</h2>
                                    <p className="text-center text-slate-500 font-bold mb-8 text-sm">Tu agente IA listo para operar</p>

                                    <div className="flex p-1 bg-slate-100 rounded-2xl mb-8">
                                        <button
                                            onClick={() => setActivePlanTab('promo')}
                                            className={`flex-1 py-3 px-4 rounded-xl text-sm font-black transition-all border-none focus:outline-none ${activePlanTab === 'promo' ? 'bg-slate-900 text-[#FFCE00] shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                                        >
                                            Promoción
                                        </button>
                                        <button
                                            onClick={() => setActivePlanTab('enterprise')}
                                            className={`flex-1 py-3 px-4 rounded-xl text-sm font-black transition-all border-none focus:outline-none ${activePlanTab === 'enterprise' ? 'bg-[#FFCE00] text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                                        >
                                            Corporativo
                                        </button>
                                    </div>

                                    {(activePlanTab === 'promo' || activePlanTab === 'demo') ? (
                                        <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                                            <div className="text-center">
                                                <div className="flex items-center justify-center gap-3 mb-1">
                                                    <span className="text-lg text-slate-400 line-through font-bold">$21.990</span>
                                                    <span className="text-5xl font-black text-slate-900 tracking-tighter">$7.990</span>
                                                </div>
                                                <div className="text-[#FFCE00] font-black text-xs uppercase tracking-wider bg-slate-100 py-1.5 px-4 rounded-full inline-block">Plan 24 meses • Cupón: <span className="text-slate-900">SMARTER</span> • $191.760 total</div>
                                                <div className="text-slate-400 font-bold mt-2 text-[10px] uppercase italic">Luego $14.990/mes</div>
                                            </div>
                                            
                                            <div className="space-y-4 py-4 border-t border-slate-100">
                                                <div className="flex items-start gap-4">
                                                    <div className="mt-1 p-1 bg-green-100 rounded-md"><Zap className="w-3.5 h-3.5 text-green-600" /></div>
                                                    <div>
                                                        <p className="font-black text-slate-900 text-sm">IA Agents 24/7</p>
                                                        <p className="text-xs text-slate-500">Operación continua sin pausas</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-4">
                                                    <div className="mt-1 p-1 bg-green-100 rounded-md"><Zap className="w-3.5 h-3.5 text-green-600" /></div>
                                                    <div>
                                                        <p className="font-black text-slate-900 text-sm">Workflows Autónomos</p>
                                                        <p className="text-xs text-slate-500">Automatización total del CRM</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-4">
                                                    <div className="mt-1 p-1 bg-green-100 rounded-md"><Zap className="w-3.5 h-3.5 text-green-600" /></div>
                                                    <div>
                                                        <p className="font-black text-slate-900 text-sm">Acceso Remoto</p>
                                                        <p className="text-xs text-slate-500">Gestiona desde tu móvil</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <a 
                                                href="https://www.hostinger.com/es?REFERRALCODE=SMARTER" 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-[#FFCE00] font-black rounded-2xl flex items-center justify-center transition-all mt-6 shadow-xl hover:scale-[1.02] border-none group/btn"
                                            >
                                                Activar OpenClaw Ahora <Rocket className="ml-2 w-4 h-4 transition-transform group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1" />
                                            </a>
                                        </div>
                                    ) : (
                                        <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                                            <div className="text-center relative">
                                                <div className="text-4xl font-black text-slate-900 tracking-tighter">1,20 <span className="text-xl">UF</span></div>
                                                <div className="text-slate-500 font-bold mt-1 text-sm">/ mes • Infraestuctura Aislada</div>
                                            </div>
                                            
                                            <div className="space-y-4 py-4 border-t border-slate-100">
                                                <div className="flex items-start gap-4">
                                                    <div className="mt-1 p-1 bg-yellow-100 rounded-md"><Zap className="w-3.5 h-3.5 text-yellow-600" /></div>
                                                    <div>
                                                        <p className="font-black text-slate-900 text-sm">Capa de Seguridad</p>
                                                        <p className="text-xs text-slate-500">VPN + Firewall + Docker Aislado</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-4">
                                                    <div className="mt-1 p-1 bg-yellow-100 rounded-md"><Zap className="w-3.5 h-3.5 text-yellow-600" /></div>
                                                    <div>
                                                        <p className="font-black text-slate-900 text-sm">Odoo ERP Senior</p>
                                                        <p className="text-xs text-slate-500">Módulos completos de facturación</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-4">
                                                    <div className="mt-1 p-1 bg-yellow-100 rounded-md"><Zap className="w-3.5 h-3.5 text-yellow-600" /></div>
                                                    <div>
                                                        <p className="font-black text-slate-900 text-sm">Soporte Prioritario</p>
                                                        <p className="text-xs text-slate-500">Ingeniería dedicada 1:1</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <Link href="/auth/sign-up?plan=enterprise" className="w-full h-14 bg-[#FFCE00] hover:bg-[#E0B800] text-slate-900 font-black rounded-2xl flex items-center justify-center transition-all mt-6 shadow-xl hover:scale-[1.02] border-none">
                                                Suscribirse Plan Senior
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            {/* Activación Empresarial Section */}
            <div className="py-24 bg-slate-900 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#FFCE00]/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
                
                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-6">
                            Activación <span className="text-[#FFCE00]">Empresarial</span> en 4 Pasos
                        </h2>
                        <p className="text-xl text-slate-400 font-bold max-w-2xl mx-auto italic">
                            Tu centro operativo digital completo, operando desde el primer día.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { step: "01", title: "Registro RUT", desc: "Registra tu empresa con identificador tributario oficial." },
                            { step: "02", title: "Activa SmarterOS", desc: "Inicia tu instancia dedicada del sistema operativo." },
                            { step: "03", title: "VPS Billing", desc: "Genera la facturación automática de tu infraestructura." },
                            { step: "04", title: "Gestiona", desc: "Controla usuarios, servicios y agentes desde tu celular." }
                        ].map((item, idx) => (
                            <div key={idx} className="p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-all">
                                <span className="text-5xl font-black text-[#FFCE00]/20 group-hover:text-[#FFCE00]/40 transition-colors">{item.step}</span>
                                <h4 className="text-xl font-black mt-4 mb-2">{item.title}</h4>
                                <p className="text-slate-400 text-sm font-bold leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 p-12 rounded-[50px] bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 shadow-2xl">
                        <div className="flex flex-col lg:flex-row items-center gap-12">
                            <div className="flex-1 text-center lg:text-left">
                                <h3 className="text-3xl font-black mb-4 italic">SmarterOS + OpenClaw</h3>
                                <p className="text-slate-300 font-bold text-lg mb-8 leading-relaxed">
                                    Conecta IA, CRM, ERP, WhatsApp y Automatización en un solo ecosistema sobre tu propio VPS.
                                </p>
                                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                    <Badge className="bg-slate-700/50 text-white border-slate-600 px-4 py-2">WhatsApp API</Badge>
                                    <Badge className="bg-slate-700/50 text-white border-slate-600 px-4 py-2">Odoo v16</Badge>
                                    <Badge className="bg-slate-700/50 text-white border-slate-600 px-4 py-2">n8n Workflows</Badge>
                                    <Badge className="bg-slate-700/50 text-white border-slate-600 px-4 py-2">Supabase DB</Badge>
                                </div>
                            </div>
                            <div className="w-full max-w-[400px]">
                                <img 
                                    src="/openclaw_ai_infrastructure_1773588974584.png" 
                                    alt="OpenClaw Infrastructure" 
                                    className="rounded-[32px] shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 border-4 border-slate-800"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Video / Detalle Section (REBRANDED) */}
            <div className="py-24 bg-white min-h-screen flex items-center">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16">

                        <div className="w-full lg:w-1/2 text-center lg:text-left">
                            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-none mb-8">
                                <span className="text-[#FFCE00]">Ruta Digital</span><br />Empresarial
                            </h2>
                            <p className="text-xl text-slate-600 font-bold leading-relaxed mb-10">
                                Digitaliza tu operación con subsidios estatales y tecnología de vanguardia. SmarterOS integra CRM, inventario y gestión de ventas en una sola consola de comando AI.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                                <a href="#preguntas-frecuentes" className="h-16 px-10 bg-slate-900 text-white font-black rounded-2xl flex items-center justify-center hover:bg-slate-800 transition-all hover:scale-105 shadow-xl border-none">
                                    Documentación Técnica
                                </a>
                                <a href="https://app.smarterbot.cl" className="text-slate-900 font-black flex items-center gap-2 hover:underline">
                                    Planos del Sistema <ChevronDown className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2">
                            <div className="max-w-[550px] mx-auto">
                                <div className="flex justify-center mb-8">
                                    <div className="p-1.5 items-center bg-slate-100 rounded-2xl inline-flex shadow-inner">
                                        <button
                                            className={`px-8 py-3 flex items-center justify-center rounded-xl text-sm font-black transition-all border-none focus:outline-none ${activeMedia === 'video' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                                            onClick={() => setActiveMedia('video')}
                                        >
                                            Infraestructura
                                        </button>
                                        <button
                                            className={`px-8 py-3 flex items-center justify-center rounded-xl text-sm font-black transition-all border-none focus:outline-none ${activeMedia === 'image' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                                            onClick={() => setActiveMedia('image')}
                                        >
                                            Consola Agent
                                        </button>
                                    </div>
                                </div>
                                <div className="relative aspect-[16/10] rounded-[40px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[8px] border-slate-50 bg-black group cursor-pointer" onClick={() => { if (activeMedia === 'video') setShowVideoModal(true) }}>
                                    {activeMedia === 'image' ? (
                                        <img
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                            src="/openclaw_ai_infrastructure_1773588974584.png"
                                            alt="SmarterOS Dashboard"
                                        />
                                    ) : (
                                        <video
                                            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                            src="/sercotec.mp4"
                                            controls={false}
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                        <div className="flex items-center gap-4 text-white">
                                            <div className="w-12 h-12 bg-[#FFCE00] rounded-full flex items-center justify-center shadow-lg text-slate-900">
                                                <Play className="fill-current w-5 h-5 ml-1" />
                                            </div>
                                            <div>
                                                <p className="font-black text-lg">Ver Demo Técnica</p>
                                                <p className="text-xs font-bold text-white/70">Arquitectura SmarterOS + OpenClaw</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            {/* Neuronal Intelligence & Legal Framework Section */}
            <div className="py-24 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#FFCE00]/5 rounded-full blur-[120px] pointer-events-none" />
                
                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        {/* Text Content */}
                        <div className="lg:col-span-12">
                            <div className="flex flex-col items-center text-center mb-16">
                                <div className="inline-flex items-center justify-center p-3 bg-slate-900 rounded-2xl shadow-xl mb-6 border border-slate-700">
                                    <Brain className="h-8 w-8 text-[#FFCE00]" />
                                </div>
                                <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-none mb-6">
                                    Inteligencia <span className="text-[#FFCE00]">Neuronal</span> &<br /> 
                                    <span className="italic">Marco Legal Soberano</span>
                                </h2>
                                <p className="text-lg text-slate-500 font-bold max-w-2xl leading-relaxed">
                                    Liderando la vanguardia tecnológica con absoluto respeto a la integridad humana y la soberanía de datos en el Cono Sur.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-16">
                                {['chile', 'argentina', 'peru', 'uruguay'].map((country) => (
                                    <button 
                                        key={country}
                                        onClick={() => setActiveCountry(country)}
                                        className={`group relative p-6 rounded-[32px] border transition-all duration-500 text-left overflow-hidden ${
                                            activeCountry === country 
                                            ? 'bg-white border-slate-200 shadow-xl' 
                                            : 'bg-transparent border-transparent hover:border-slate-200 grayscale opacity-60 hover:opacity-100 hover:grayscale-0'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Hub Regional</span>
                                            <Flag className={`h-4 w-4 ${activeCountry === country ? 'text-[#FFCE00]' : 'text-slate-300'}`} />
                                        </div>
                                        <h4 className="text-2xl font-black text-slate-900 capitalize mb-2">{country}</h4>
                                        <p className="text-xs font-bold text-slate-500">Liderazgo en {country === 'chile' ? 'Neuroderechos' : country === 'argentina' ? 'Talento Dev' : country === 'peru' ? 'Operación Cloud' : 'Servicios Globales'}</p>
                                        
                                        {activeCountry === country && (
                                            <div className="absolute bottom-0 left-0 h-1.5 bg-[#FFCE00] w-full" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {activeCountry === 'chile' ? (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                        <div className="relative group">
                                            <div className="absolute -inset-4 bg-gradient-to-tr from-[#FFCE00]/20 to-transparent rounded-[48px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="relative bg-white p-8 sm:p-12 rounded-[40px] border border-slate-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]">
                                                <Badge className="bg-slate-900 text-[#FFCE00] border-none mb-6 px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest">Pionero Mundial</Badge>
                                                <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                                                    Legislación Neuronal <br /> 
                                                    <span className="text-slate-400">Senado de Chile</span>
                                                </h3>
                                                <p className="text-slate-600 font-bold leading-relaxed mb-8">
                                                    Chile es pionero mundial en legislación neuronal al aprobar en 2021 la reforma constitucional que protege los neuroderechos. Esta ley resguarda la actividad cerebral, datos neuronales, identidad personal y libre albedrío frente al uso de neurotecnologías.
                                                </p>
                                                <div className="space-y-4">
                                                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                                        <ShieldCheck className="h-6 w-6 text-green-500 mt-1 shrink-0" />
                                                        <div>
                                                            <p className="font-black text-slate-900 text-sm">Protección de Datos</p>
                                                            <p className="text-xs text-slate-500 font-bold">Los datos cerebrales se clasifican como información sensible, equivalente a órganos humanos.</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                                        <Scale className="h-6 w-6 text-amber-500 mt-1 shrink-0" />
                                                        <div>
                                                            <p className="font-black text-slate-900 text-sm">Precedente Judicial (2023)</p>
                                                            <p className="text-xs text-slate-500 font-bold">La Corte Suprema dictaminó contra Emotiv (dispositivo Insight) por almacenar datos sin consentimiento explícito.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-8 pl-0 lg:pl-12">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFCE00]" />
                                                    <h5 className="font-black text-slate-900 uppercase tracking-widest text-xs">Neuroprotección</h5>
                                                </div>
                                                <p className="text-slate-500 font-bold text-sm leading-relaxed">
                                                    Prohíbe la intromisión o manipulación de conexiones neuronales sin consentimiento expreso e informado.
                                                </p>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFCE00]" />
                                                    <h5 className="font-black text-slate-900 uppercase tracking-widest text-xs">Uso de Neurotecnologías</h5>
                                                </div>
                                                <p className="text-slate-500 font-bold text-sm leading-relaxed">
                                                    Regula el desarrollo y uso de tecnologías, asegurando que estén al servicio de la salud y no para alterar la personalidad.
                                                </p>
                                            </div>
                                            <div className="p-8 rounded-[40px] bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFCE00]/10 rounded-full blur-3xl" />
                                                <p className="text-[#FFCE00] font-black text-xs uppercase tracking-[0.2em] mb-4">Hito Histórico</p>
                                                <p className="text-xl font-bold leading-tight mb-6 tracking-tight">
                                                    "Chile fue el primer país en aprobar una reforma constitucional que protege la integridad mental."
                                                </p>
                                                <div className="flex items-center gap-3 pt-6 border-t border-white/10">
                                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                                        <Globe className="h-5 w-5 text-[#FFCE00]" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-white uppercase tracking-wider">Senado de Chile</p>
                                                        <p className="text-[10px] font-bold text-white/50 italic tracking-wide">Modelo Internacional de Neuroética</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 h-[400px] flex items-center justify-center bg-white rounded-[40px] border border-slate-100 shadow-sm">
                                    <div className="text-center space-y-4">
                                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Globe className="h-8 w-8 text-slate-300" />
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Expansión Regional: {activeCountry}</h3>
                                        <p className="text-slate-400 font-bold max-w-md mx-auto">
                                            Integrando infraestructura SmarterOS y marcos éticos de neuroprotección en toda la región. Próximamente contenido detallado para {activeCountry}.
                                        </p>
                                        <Badge variant="outline" className="border-slate-200 text-slate-400">Consulte por activación local</Badge>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>


            {/* Preguntas Frecuentes Section */}
            <div id="preguntas-frecuentes" className="py-20 bg-white">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-4">
                            Preguntas <span className="text-[#FFCE00] underline decoration-4 underline-offset-4">Frecuentes</span>
                        </h2>
                        <p className="text-lg text-slate-600 font-bold max-w-2xl mx-auto leading-relaxed">
                            Resolvemos tus dudas sobre nuestra plataforma, planes y los servicios de automatización de SmarterOS.
                        </p>
                    </div>
                    <div className="max-w-3xl mx-auto space-y-6">
                        <Faq
                            title="¿Qué es SmarterBOT?"
                            answer="SmarterBOT es una plataforma integral para la gestión y automatización de procesos empresariales. Integra los mejores CRMs y ERPs con Inteligencia Artificial alojados de manera local o compartida."
                        />
                        <Faq
                            title="¿Cómo puedo registrarme?"
                            answer="Puedes registrarte completando nuestro formulario de registro en la pantalla de inicio ('Crear cuenta' o 'Pro'). El registro con nosotros proveerá una instancia para tu empresa que escalará a medida que crezcas."
                        />
                        <Faq
                            title="¿Tienen soporte técnico?"
                            answer="Sí, ofrecemos soporte técnico a través de WhatsApp, correo electrónico y para los planes Enterprise incluimos atención prioritaria y asesorías conjuntas."
                        />
                        <Faq
                            title="¿Puedo cancelar mi suscripción?"
                            answer="Sí, las suscripciones mensuales (Plan Enterprise o Pro) pueden ser anuladas o pausadas desde tu consola de control en cualquier momento. ¡Las instancias en DEMO no requieren cancelación pues son a demanda!"
                        />
                    </div>
                </div>
            </div>

            <Footer />

            {showVideoModal && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/95 backdrop-blur-sm transition-all"
                    onClick={() => setShowVideoModal(false)}
                >
                    <div className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl bg-black" onClick={e => e.stopPropagation()}>
                        <button
                            className="absolute z-10 top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors border-none"
                            onClick={() => setShowVideoModal(false)}
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className="relative pt-[56.25%] bg-black">
                            <video
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                src="/sercotec.mp4"
                                controls
                                autoPlay
                                playsInline
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
