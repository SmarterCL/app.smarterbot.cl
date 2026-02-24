import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '../components/Footer';

import { Fragment, useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { Bot, Zap, Rocket, X } from "lucide-react";

export default function Home() {
  const [activeMedia, setActiveMedia] = useState('video');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [activePlanTab, setActivePlanTab] = useState('demo');

  useEffect(() => {
    if (typeof window != 'undefined') {
      localStorage.setItem('__sbot_count', 1);
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="SmarterBOT – Automatización y tecnología para tu negocio" />
        <meta name="author" content="SmarterBOT" />
        <title>SmarterBOT – Soluciones tecnológicas integrales</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SmarterBOT - La nueva forma de gestionar tu empresa" />
        <meta property="og:description" content="Suscríbete y obtén beneficios exclusivos" />
        <meta property="og:image" content="https://rut.smarterbot.store/images/logo-smarteros.jpg" />
        <meta property="og:url" content="https://rut.smarterbot.store" />
        <meta property="og:site_name" content="SmarterBOT" />
        <link rel="icon" type="image/png" href="/images/logo-smarteros.jpg" sizes="16x16" />
        <link rel="icon" type="image/png" href="/images/logo-smarteros.jpg" sizes="32x32" />
        <link rel="icon" type="image/png" href="/images/logo-smarteros.jpg" sizes="96x96" />
        <link rel="apple-touch-icon" href="/images/logo-smarteros.jpg" />
      </Head>

      <Script src="https://www.googletagmanager.com/gtag/js?id=G-MRN2ZCR8ZP" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];function gtag(){window.dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-MRN2ZCR8ZP');`}
      </Script>
      <Script src="https://www.googletagmanager.com/gtm.js?id=GTM-WS4L7S5" strategy="afterInteractive" />

      <div className="flex flex-col min-h-screen font-sans bg-slate-50 selection:bg-[#FFCE00] selection:text-black">

        {/* Main Hero Section */}
        <div className="relative min-h-screen flex items-center py-12 lg:py-0 overflow-hidden border-b border-slate-200">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FFCE00]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FFCE00]/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

              {/* Left Column */}
              <div className="w-full max-w-xl mx-auto lg:mx-0">
                <div className="flex flex-wrap items-center gap-6 mb-12">
                  <div className="p-4 bg-[#FFCE00] rounded-[24px] shadow-lg shrink-0">
                    <img src="/logo-smarteros.jpg" alt="SmarterOS" className="h-12 w-auto object-contain rounded-lg" />
                  </div>
                  <div>
                    <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter italic">
                      SmarterOS
                    </h1>
                    <p className="text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-[0.4em] mt-1">Hub de Automatización</p>
                  </div>
                </div>

                <div className="relative p-6 px-4 sm:px-8 sm:p-8 rounded-[40px] bg-slate-50 border border-slate-200 shadow-inner group transition-all duration-500 hover:border-[#FFCE00]/30 mr-0 lg:mr-8">
                  <div className="space-y-8 sm:space-y-10">
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="h-8 w-8 min-w-[2rem] rounded-full bg-slate-900 flex items-center justify-center text-[#FFCE00] text-xs font-bold">1</div>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Consola de Inteligencia</h3>
                      </div>
                      <p className="text-slate-500 font-bold leading-relaxed ml-11 sm:ml-12 text-sm sm:text-base">
                        Gestión centralizada de WhatsApp, n8n, Odoo v16 y Supabase en un solo ecosistema integrado.
                      </p>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="h-8 w-8 min-w-[2rem] rounded-full bg-slate-900 flex items-center justify-center text-[#FFCE00] text-xs font-bold">2</div>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Arquitectura Empresarial</h3>
                      </div>
                      <p className="text-slate-500 font-bold leading-relaxed ml-11 sm:ml-12 text-sm sm:text-base">
                        Infraestructura robusta diseñada para la escalabilidad y seguridad de tu información.
                      </p>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="h-8 w-8 min-w-[2rem] rounded-full bg-slate-900 flex items-center justify-center text-[#FFCE00] text-xs font-bold">3</div>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Desarrollado en Chile</h3>
                      </div>
                      <p className="text-slate-500 font-bold leading-relaxed ml-11 sm:ml-12 text-sm sm:text-base">
                        Soporte local y cumplimiento normativo regional para tu tranquilidad operativa.
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:flex absolute -right-12 top-1/2 -translate-y-1/2 w-24 h-48 bg-white border-2 border-slate-100 rounded-[30px] shadow-2xl flex-col items-center justify-around py-4 opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500">
                    <Zap className="h-6 w-6 text-[#FFCE00] fill-[#FFCE00]" />
                    <Bot className="h-6 w-6 text-slate-900" />
                    <Rocket className="h-6 w-6 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Right Column (Plans as tabs) */}
              <div className="w-full flex justify-center lg:justify-end mt-4 lg:mt-0 relative">
                <div className="w-full max-w-md relative z-10 group mt-8 sm:mt-0">
                  <div className="absolute -inset-8 rounded-[70px] bg-[#FFCE00]/10 opacity-40 blur-3xl transition-all duration-700 group-hover:opacity-60"></div>
                  <div className="relative bg-white rounded-[50px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-white overflow-hidden p-6 sm:p-10">

                    <h2 className="text-center text-3xl font-black text-slate-900 mb-6">Planes</h2>

                    <div className="flex p-1 bg-slate-100 rounded-full mb-8">
                      <button
                        onClick={() => setActivePlanTab('demo')}
                        className={`flex-1 py-3 px-4 rounded-full text-sm font-bold transition-all border-none focus:outline-none ${activePlanTab === 'demo' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        Demo
                      </button>
                      <button
                        onClick={() => setActivePlanTab('enterprise')}
                        className={`flex-1 py-3 px-4 rounded-full text-sm font-bold transition-all border-none focus:outline-none ${activePlanTab === 'enterprise' ? 'bg-[#FFCE00] text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        Enterprise
                      </button>
                    </div>

                    {activePlanTab === 'demo' ? (
                      <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                        <div className="text-center">
                          <div className="text-4xl font-black text-slate-900">Gratis</div>
                          <div className="text-slate-500 font-bold mt-1 text-sm">Pagar por hora</div>
                        </div>
                        <ul className="space-y-3 text-sm text-slate-600 font-medium pb-2 border-b border-slate-100">
                          <li className="flex items-center gap-3"><Zap className="w-4 h-4 text-slate-400" /> Multi-tenant Cloud</li>
                          <li className="flex items-center gap-3"><Zap className="w-4 h-4 text-slate-400" /> CRM, Facturación</li>
                          <li className="flex items-center gap-3"><Zap className="w-4 h-4 text-slate-400" /> Automatizaciones limitadas</li>
                        </ul>
                        <a href="/login" className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-[#FFCE00] font-black rounded-full flex items-center justify-center transition-all mt-6 shadow-xl hover:scale-[1.02] border-none">
                          Inscríbete gratis
                        </a>
                      </div>
                    ) : (
                      <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                        <div className="text-center relative">
                          <div className="absolute -top-4 right-0 bg-slate-900 text-[#FFCE00] text-[10px] uppercase font-black px-3 py-1 rounded-full tracking-widest shadow-md">Más Elegido</div>
                          <div className="text-4xl font-black text-slate-900">1,20 <span className="text-xl">UF</span></div>
                          <div className="text-slate-500 font-bold mt-1 text-sm">/ mes. Avanzada / Autónomo</div>
                        </div>
                        <ul className="space-y-3 text-sm text-slate-600 font-medium pb-2 border-b border-slate-100">
                          <li className="flex items-center gap-3"><Zap className="w-4 h-4 text-[#FFCE00]" /> Aislada (Docker + UFW)</li>
                          <li className="flex items-center gap-3"><Zap className="w-4 h-4 text-[#FFCE00]" /> Odoo ERP Completo</li>
                          <li className="flex items-center gap-3"><Zap className="w-4 h-4 text-[#FFCE00]" /> Integraciones API (MCP)</li>
                          <li className="flex items-center gap-3"><Zap className="w-4 h-4 text-[#FFCE00]" /> Soporte Prioritario</li>
                        </ul>
                        <a href="/subscribe/pro" className="w-full h-14 bg-[#FFCE00] hover:bg-[#E0B800] text-slate-900 font-black rounded-full flex items-center justify-center transition-all mt-6 shadow-xl hover:scale-[1.02] border-none">
                          Comprar suscripción
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Video / Detalle Section */}
        <div className="py-12 bg-white min-h-screen flex items-center">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">

              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                  Aplica a <span className="text-[#FFCE00] underline decoration-4 underline-offset-4">Ruta Digital Sercotec</span>
                </h2>
                <p className="text-lg text-slate-600 font-bold leading-relaxed mb-8">
                  Te apoyamos en el proceso de digitalización con un subsidio de hasta $1,2 millones. Otorga los fondos para concretar actividades de software de gestión de negocios, CRM, inventario y más, todo integrado en <strong className="text-slate-900">Smarter OS</strong>.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <a href="/preguntas-frecuentes" className="h-14 px-8 bg-slate-900 text-white font-black rounded-full flex items-center justify-center hover:bg-slate-800 transition-colors border-none">
                    ¿Cómo funciona?
                  </a>
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <div className="max-w-[500px] mx-auto">
                  <div className="flex justify-center mb-6">
                    <div className="p-1 items-center bg-slate-100 rounded-full inline-flex">
                      <button
                        className={`px-6 py-2.5 flex items-center justify-center rounded-full text-sm font-bold transition-all border-none focus:outline-none ${activeMedia === 'video' ? 'bg-[#FFCE00] text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        onClick={() => setActiveMedia('video')}
                      >
                        Video Explicativo
                      </button>
                      <button
                        className={`px-6 py-2.5 flex items-center justify-center rounded-full text-sm font-bold transition-all border-none focus:outline-none ${activeMedia === 'image' ? 'bg-[#FFCE00] text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        onClick={() => setActiveMedia('image')}
                      >
                        Ver Detalle
                      </button>
                    </div>
                  </div>
                  <div className="relative aspect-[4/3] sm:aspect-video rounded-3xl overflow-hidden shadow-2xl border-[6px] border-slate-50 bg-black group cursor-pointer" onClick={() => { if (activeMedia === 'video') setShowVideoModal(true) }}>
                    {activeMedia === 'image' ? (
                      <img
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src="/images/BOLTAI.jpeg"
                        alt="Detalle"
                      />
                    ) : (
                      <video
                        className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        src="/sercotec.mp4"
                        controls={false}
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    )}
                    {activeMedia === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-16 h-16 bg-[#FFCE00] rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                          <div className="w-0 h-0 border-y-8 border-y-transparent border-l-[12px] border-l-slate-900 ml-1"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <Footer />
      </div>

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
    </Fragment>
  );
}
