import Head from 'next/head';
import { Fragment } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Faq from '../components/Faq';

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>SmarterBOT - Preguntas Frecuentes</title>
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
              Preguntas <span className="text-[#FFCE00] underline decoration-4 underline-offset-4">Frecuentes</span>
            </h1>
            <p className="text-lg text-slate-600 font-bold max-w-2xl mx-auto leading-relaxed">
              Resolvemos tus dudas sobre nuestra plataforma, planes y los servicios de automatización de SmarterOS.
            </p>
          </div>
        </div>

        {/* FAQ Area */}
        <div className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Note: the Faq component might still be Bootstrap-based internals (like accordion), but we place it in a modern container. */}
              <div className="bg-slate-50 border border-slate-200 rounded-[30px] p-6 shadow-sm hover:border-slate-300 transition-colors">
                <Faq
                  title="¿Qué es SmarterBOT?"
                  answer="SmarterBOT es una plataforma integral para la gestión y automatización de procesos empresariales. Integra los mejores CRMs y ERPs con Inteligencia Artificial alojados de manera local o compartida."
                />
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-[30px] p-6 shadow-sm hover:border-slate-300 transition-colors">
                <Faq
                  title="¿Cómo puedo registrarme?"
                  answer="Puedes registrarte completando nuestro formulario de registro en la pantalla de inicio ('Crear cuenta' o 'Pro'). El registro con nosotros proveerá una instancia para tu empresa que escalará a medida que crezcas."
                />
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-[30px] p-6 shadow-sm hover:border-slate-300 transition-colors">
                <Faq
                  title="¿Tienen soporte técnico?"
                  answer="Sí, ofrecemos soporte técnico a través de WhatsApp, correo electrónico y para los planes Enterprise incluimos atención prioritaria y asesorías conjuntas."
                />
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-[30px] p-6 shadow-sm hover:border-slate-300 transition-colors">
                <Faq
                  title="¿Puedo cancelar mi suscripción?"
                  answer="Sí, las suscripciones mensuales (Plan Enterprise o Pro) pueden ser anuladas o pausadas desde tu consola de control en cualquier momento. ¡Las instancias en DEMO no requieren cancelación pues son a demanda!"
                />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </Fragment>
  );
}
