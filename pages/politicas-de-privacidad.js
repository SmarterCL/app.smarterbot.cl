import Head from 'next/head';
import { Fragment } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Politicas() {
  return (
    <Fragment>
      <Head>
        <title>SmarterBOT - Política de Privacidad</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="flex flex-col min-h-screen font-sans bg-slate-50 selection:bg-[#FFCE00] selection:text-black">
        <Header showAuthButtons={true} />

        <div className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden border-b border-slate-200">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FFCE00]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FFCE00]/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
              Política de <span className="text-[#FFCE00] underline decoration-4 underline-offset-4">Privacidad</span>
            </h1>
          </div>
        </div>

        <div className="py-20 bg-white flex-1">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto prose prose-slate prose-lg lg:prose-xl">
              <p className="font-bold text-slate-600">
                En SmarterBOT, accesible desde rut.smarterbot.store, una de nuestras principales prioridades es la privacidad de nuestros visitantes. Este documento de Política de Privacidad contiene tipos de información que SmarterBOT recopila y registra y cómo la utilizamos.
              </p>

              <h3 className="text-2xl font-black text-slate-900 mt-12 mb-4">Archivos de registro</h3>
              <p className="text-slate-600">
                SmarterBOT sigue un procedimiento estándar de uso de archivos de registro. Estos archivos registran a los visitantes cuando visitan sitios web. Todas las empresas de alojamiento hacen esto y forman parte del análisis de los servicios de alojamiento.
              </p>

              <h3 className="text-2xl font-black text-slate-900 mt-12 mb-4">Políticas de privacidad</h3>
              <p className="text-slate-600 mb-4">
                Puede consultar esta lista para encontrar la Política de Privacidad de cada uno de los socios publicitarios de SmarterBOT.
              </p>
              <p className="text-slate-600">
                Los servidores de anuncios de terceros o las redes publicitarias utilizan tecnologías como cookies, JavaScript o Web Beacons que se utilizan en sus respectivos anuncios y enlaces que aparecen en SmarterBOT, que se envían directamente al navegador de los usuarios. Reciben automáticamente su dirección IP cuando esto ocurre. Estas tecnologías se utilizan para medir la eficacia de sus campañas publicitarias y/o para personalizar el contenido publicitario que ve en los sitios web que visita.
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </Fragment>
  );
}
