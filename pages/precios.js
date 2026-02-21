import Head from 'next/head';
import { Fragment } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Zap, Bot, Rocket } from 'lucide-react';

export default function Prices() {
  return (
    <Fragment>
      <Head>
        <title>SmarterBOT - Planes y Precios</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="flex flex-col min-h-screen font-sans bg-slate-50 selection:bg-[#FFCE00] selection:text-black">
        <Header showAuthButtons={true} />

        {/* Hero Section */}
        <div className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden border-b border-slate-200">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FFCE00]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FFCE00]/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
              Nuestros <span className="text-[#FFCE00] underline decoration-4 underline-offset-4">Planes</span>
            </h1>
            <p className="text-lg text-slate-600 font-bold max-w-2xl mx-auto leading-relaxed">
              Elige el plan que mejor se adapte a tus necesidades. Precios transparentes para escalar tu negocio sin límites con SmarterOS.
            </p>
          </div>
        </div>

        {/* Pricing Cards Section */}
        <div className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

              {/* Basic Plan */}
              <div className="relative group">
                <div className="absolute -inset-4 flex rounded-3xl bg-slate-100 opacity-40 blur-xl transition-all duration-700 group-hover:opacity-60 pointer-events-none"></div>
                <div className="relative flex flex-col h-full bg-slate-50 rounded-[40px] shadow-sm border border-slate-200 p-8 hover:border-slate-300 transition-colors">
                  <div className="mb-8">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Básico</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black text-slate-900">$0</span>
                      <span className="text-slate-500 font-bold">/ mes</span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <ul className="space-y-4 text-sm font-bold text-slate-600">
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                          <Zap className="w-3 h-3 text-slate-600" />
                        </div>
                        Inscripción Gratis
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                          <Zap className="w-3 h-3 text-slate-600" />
                        </div>
                        Pagar por hora
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                          <Zap className="w-3 h-3 text-slate-600" />
                        </div>
                        Precios Dinámicos: No
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                          <Zap className="w-3 h-3 text-slate-600" />
                        </div>
                        Módulos: Uno a elección
                      </li>
                      <li className="flex items-center gap-3 text-slate-400">
                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                          <span className="text-xs">X</span>
                        </div>
                        Anticipación Reserva: 78h
                      </li>
                      <li className="flex items-center gap-3 text-slate-400">
                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                          <span className="text-xs">X</span>
                        </div>
                        Soporte META & ODOO Whatsapp
                      </li>
                    </ul>
                  </div>

                  <a href="/login" className="mt-10 w-full h-14 bg-slate-200 hover:bg-slate-300 text-slate-900 font-black rounded-full flex items-center justify-center transition-all">
                    Registrarse gratis
                  </a>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="relative group">
                <div className="absolute -inset-4 flex rounded-3xl bg-[#FFCE00]/20 opacity-40 blur-xl transition-all duration-700 group-hover:opacity-60 pointer-events-none"></div>
                <div className="relative flex flex-col h-full bg-white rounded-[40px] shadow-2xl border-2 border-[#FFCE00]/50 p-8 transform lg:-translate-y-4">
                  <div className="absolute -top-4 right-8 bg-slate-900 text-[#FFCE00] text-[10px] uppercase font-black px-4 py-1.5 rounded-full tracking-widest shadow-lg">Más Popular</div>
                  <div className="mb-8">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Enterprise</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black text-slate-900">1,20 <span className="text-3xl">UF</span></span>
                      <span className="text-slate-500 font-bold">/ mes</span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <ul className="space-y-4 text-sm font-bold text-slate-600">
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#FFCE00]/20 flex items-center justify-center shrink-0">
                          <Zap className="w-3 h-3 text-slate-900" />
                        </div>
                        Inscripción Gratis
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#FFCE00]/20 flex items-center justify-center shrink-0">
                          <Zap className="w-3 h-3 text-slate-900" />
                        </div>
                        Pago Mensualizado
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#FFCE00]/20 flex items-center justify-center shrink-0">
                          <Zap className="w-3 h-3 text-slate-900" />
                        </div>
                        Precios Dinámicos & Beneficios
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#FFCE00]/20 flex items-center justify-center shrink-0">
                          <Rocket className="w-3 h-3 text-slate-900" />
                        </div>
                        Módulos: Todos los disponibles
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#FFCE00]/20 flex items-center justify-center shrink-0">
                          <Bot className="w-3 h-3 text-slate-900" />
                        </div>
                        Sin límite de anticipación
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#FFCE00]/20 flex items-center justify-center shrink-0">
                          <span className="text-xs font-black text-slate-900">✓</span>
                        </div>
                        Soporte META
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#FFCE00]/20 flex items-center justify-center shrink-0">
                          <span className="text-xs font-black text-slate-900">✓</span>
                        </div>
                        ODOO Whatsapp API
                      </li>
                    </ul>
                  </div>

                  <a href="/subscribe/pro" className="mt-10 w-full h-14 bg-[#FFCE00] hover:bg-[#E0B800] text-slate-900 font-black rounded-full flex items-center justify-center transition-all shadow-lg hover:scale-[1.02]">
                    Comenzar ahora
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        <Footer />
      </div>
    </Fragment>
  );
}
