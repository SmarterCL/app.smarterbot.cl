import Head from 'next/head';
import { Fragment } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Terminos() {
  return (
    <Fragment>
      <Head>
        <title>SmarterBOT - Términos y Condiciones</title>
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
              Términos y <span className="text-[#FFCE00] underline decoration-4 underline-offset-4">Condiciones</span>
            </h1>
          </div>
        </div>

        <div className="py-20 bg-white flex-1">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto prose prose-slate prose-lg lg:prose-xl">
              <p className="font-bold text-slate-600">
                Bienvenido a SmarterBOT. Estos términos y condiciones describen las reglas y regulaciones para el uso del sitio web de SmarterBOT.
              </p>
              <p className="font-bold text-slate-600 mb-8">
                Al acceder a este sitio web, asumimos que aceptas estos términos y condiciones en su totalidad. No continúes usando el sitio web de SmarterBOT si no aceptas todos los términos y condiciones establecidos en esta página.
              </p>

              <h3 className="text-2xl font-black text-slate-900 mt-12 mb-4">Cookies</h3>
              <p className="text-slate-600">
                Empleamos el uso de cookies. Al utilizar el sitio web de SmarterBOT, usted acepta el uso de cookies de acuerdo con la política de privacidad de SmarterBOT.
              </p>

              <h3 className="text-2xl font-black text-slate-900 mt-12 mb-4">Licencia</h3>
              <p className="text-slate-600">
                A menos que se indique lo contrario, SmarterBOT y/o sus licenciantes poseen los derechos de propiedad intelectual de todo el material en SmarterBOT. Todos los derechos de propiedad intelectual están reservados. Puedes ver y/o imprimir páginas desde https://rut.smarterbot.store para tu uso personal sujeto a las restricciones establecidas en estos términos y condiciones.
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </Fragment>
  );
}
