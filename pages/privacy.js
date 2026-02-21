import Head from 'next/head';
import { Fragment } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Privacy() {
    return (
        <Fragment>
            <Head>
                <title>SmarterBOT - Política de Privacidad</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta
                    name="description"
                    content="Política de privacidad de SmarterBOT y SmarterOS"
                />
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
                        <p className="text-lg text-slate-600 font-bold max-w-2xl mx-auto leading-relaxed">
                            En SmarterOS, tu privacidad es nuestra prioridad técnica. Este documento detalla cómo protegemos tus datos y los de tus clientes en nuestra plataforma.
                        </p>
                    </div>
                </div>

                <div className="py-20 bg-white flex-1">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="max-w-3xl mx-auto prose prose-slate prose-lg lg:prose-xl">

                            <h3 className="text-2xl font-black text-slate-900 mt-12 mb-4">1. Información que Recopilamos</h3>
                            <p className="text-slate-600 mb-4">
                                Recopilamos información que nos proporcionas directamente cuando creas una cuenta, utilizas nuestros servicios o te comunicas con nosotros. Esto incluye:
                            </p>
                            <ul className="text-slate-600 space-y-2 mb-8 list-disc pl-6 font-medium">
                                <li><strong>Datos de cuenta:</strong> Nombre, correo electrónico, RUT y credenciales de acceso.</li>
                                <li><strong>Datos de automatización:</strong> Logs de ejecuciones de n8n, mensajes de WhatsApp (vía API) y registros de Odoo.</li>
                                <li><strong>Datos técnicos:</strong> Dirección IP, tipo de navegador e identificadores de dispositivo.</li>
                            </ul>

                            <h3 className="text-2xl font-black text-slate-900 mt-12 mb-4">2. Uso de la Información</h3>
                            <p className="text-slate-600 mb-4">Utilizamos la información recopilada para:</p>
                            <ul className="text-slate-600 space-y-2 mb-8 list-disc pl-6 font-medium">
                                <li>Proveer, mantener y mejorar la plataforma SmarterOS.</li>
                                <li>Procesar transacciones y enviar notificaciones relacionadas.</li>
                                <li>Orquestar servicios de inteligencia artificial solicitados por el usuario.</li>
                                <li>Garantizar la seguridad y prevenir actividades fraudulentas.</li>
                            </ul>

                            <h3 className="text-2xl font-black text-slate-900 mt-12 mb-4">3. Compartición de Datos</h3>
                            <p className="text-slate-600 mb-4">
                                SmarterOS no vende tus datos personales. Compartimos información únicamente con proveedores de servicios esenciales para el funcionamiento de la plataforma:
                            </p>
                            <ul className="text-slate-600 space-y-2 mb-8 list-disc pl-6 font-medium">
                                <li><strong>Supabase:</strong> Como infraestructura de base de datos.</li>
                                <li><strong>Clerk:</strong> Para la gestión de autenticación segura.</li>
                                <li><strong>Meta:</strong> Para la integración de WhatsApp Business API.</li>
                            </ul>

                            <h3 className="text-2xl font-black text-slate-900 mt-12 mb-4">4. Tus Derechos</h3>
                            <p className="text-slate-600 mb-8 font-medium">
                                Tienes derecho a acceder, rectificar o eliminar tus datos personales en cualquier momento a través de tu panel de configuración o contactando a nuestro equipo de soporte.
                            </p>

                            <h3 className="text-2xl font-black text-slate-900 mt-12 mb-4">5. Actualizaciones</h3>
                            <p className="text-slate-600 mb-12 font-medium">
                                Podemos actualizar esta política ocasionalmente. Te notificaremos sobre cambios significativos a través de la plataforma o por correo electrónico.
                            </p>

                            <hr className="my-12 border-slate-200" />

                            <div className="text-center bg-slate-50 border border-slate-200 rounded-[30px] p-8 shadow-sm">
                                <h4 className="text-xl font-black text-slate-900 mb-2">¿Tienes dudas sobre seguridad?</h4>
                                <p className="text-slate-500 font-bold mb-6">Nuestro equipo técnico está disponible para explicarte nuestras capas de protección.</p>
                                <a href="mailto:seguridad@smarterbot.cl" className="inline-flex h-14 px-8 bg-slate-900 hover:bg-slate-800 text-[#FFCE00] font-black rounded-full items-center justify-center transition-all shadow-xl hover:scale-[1.02]">
                                    Contactar Seguridad
                                </a>
                            </div>

                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </Fragment>
    );
}
