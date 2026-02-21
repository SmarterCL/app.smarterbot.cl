import Head from 'next/head';
import { Fragment } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function QuienesSomos() {
  return (
    <Fragment>
      <Head>
        <title>SmarterBOT - Quiénes Somos</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="flex flex-col min-h-screen font-sans bg-slate-50 selection:bg-[#FFCE00] selection:text-black">
        <Header showAuthButtons={true} />

        <div className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden border-b border-slate-200">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FFCE00]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FFCE00]/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <h4 className="text-sm font-black text-slate-500 uppercase tracking-[0.4em] mb-4">¿Quiénes somos?</h4>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
              <span className="text-[#FFCE00] underline decoration-4 underline-offset-4">Smarter</span> BOT
            </h1>
          </div>
        </div>

        <div className="py-20 bg-white flex-1">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              {/* Image Section */}
              <div className="text-center">
                <div className="relative inline-block group">
                  <div className="absolute -inset-4 rounded-3xl bg-[#FFCE00]/20 opacity-40 blur-xl transition-all duration-700 group-hover:opacity-60"></div>
                  <img
                    className="relative align-middle rounded-[40px] shadow-2xl border border-slate-100 object-cover w-full max-w-[460px]"
                    src="/images/logo-smarteros.jpg"
                    alt="SmarterBOT Logo"
                  />
                </div>
              </div>

              {/* Text Section */}
              <div className="space-y-6 lg:pl-8 text-center lg:text-left">
                <p className="text-xl lg:text-2xl font-black text-slate-900 leading-relaxed">
                  <span className="bg-[#FFCE00] px-2 rounded-lg">SmarterBOT</span> es una empresa líder en soluciones tecnológicas y automatización de procesos.
                </p>
                <p className="text-slate-600 font-bold text-lg leading-relaxed">
                  Nuestra misión es ayudar a las empresas a optimizar sus operaciones a través de herramientas digitales avanzadas.
                </p>
                <div className="h-1 w-12 bg-[#FFCE00] rounded-full mx-auto lg:mx-0 my-8"></div>
                <p className="text-slate-600 font-medium">
                  Contamos con un equipo de expertos dedicados a ofrecer el mejor servicio y soporte a nuestros clientes. Nos enfocamos en darte tecnología de alto rendimiento con arquitecturas escalables.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </Fragment>
  );
}
