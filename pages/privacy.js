import Head from 'next/head';
import { Fragment } from 'react';
import Link from 'next/link';
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
            <div className="mont d-flex flex-column h-100">
                <header>
                    <nav className="navbar navbar-expand-md fixed-top">
                        <div className="container-fluid">
                            <Link className="navbar-brand" href="/">
                                <img
                                    className="margin-top img-fluid"
                                    src="/images/logo-smarteros.jpg"
                                    width={220}
                                />
                            </Link>
                            <div className="collapse navbar-collapse" id="navbarCollapse">
                                <ul className="navbar-nav me-auto mb-2 mb-md-0"></ul>
                                <a
                                    className="btn btn-secondary mx-2 btn-header"
                                    href="/login"
                                >
                                    Ingresa
                                </a>
                            </div>
                        </div>
                    </nav>
                </header>
                <div className="section-single">
                    <div className="container">
                        <h1 className="text-center mb-5">Política de Privacidad</h1>

                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <p className="lead text-center mb-5">
                                    En SmarterOS, tu privacidad es nuestra prioridad técnica. Este documento detalla cómo protegemos tus datos y los de tus clientes en nuestra plataforma.
                                </p>

                                <div className="mb-5">
                                    <h3 className="mb-3">1. Información que Recopilamos</h3>
                                    <p>
                                        Recopilamos información que nos proporcionas directamente cuando creas una cuenta, utilizas nuestros servicios o te comunicas con nosotros. Esto incluye:
                                    </p>
                                    <ul>
                                        <li><strong>Datos de cuenta:</strong> Nombre, correo electrónico, RUT y credenciales de acceso.</li>
                                        <li><strong>Datos de automatización:</strong> Logs de ejecuciones de n8n, mensajes de WhatsApp (vía API) y registros de Odoo.</li>
                                        <li><strong>Datos técnicos:</strong> Dirección IP, tipo de navegador e identificadores de dispositivo.</li>
                                    </ul>
                                </div>

                                <div className="mb-5">
                                    <h3 className="mb-3">2. Uso de la Información</h3>
                                    <p>Utilizamos la información recopilada para:</p>
                                    <ul>
                                        <li>Proveer, mantener y mejorar la plataforma SmarterOS.</li>
                                        <li>Procesar transacciones y enviar notificaciones relacionadas.</li>
                                        <li>Orquestar servicios de inteligencia artificial solicitados por el usuario.</li>
                                        <li>Garantizar la seguridad y prevenir actividades fraudulentas.</li>
                                    </ul>
                                </div>

                                <div className="mb-5">
                                    <h3 className="mb-3">3. Compartición de Datos</h3>
                                    <p>
                                        SmarterOS no vende tus datos personales. Compartimos información únicamente con proveedores de servicios esenciales para el funcionamiento de la plataforma:
                                    </p>
                                    <ul>
                                        <li><strong>Supabase:</strong> Como infraestructura de base de datos.</li>
                                        <li><strong>Clerk:</strong> Para la gestión de autenticación segura.</li>
                                        <li><strong>Meta:</strong> Para la integración de WhatsApp Business API.</li>
                                    </ul>
                                </div>

                                <div className="mb-5">
                                    <h3 className="mb-3">4. Tus Derechos</h3>
                                    <p>
                                        Tienes derecho a acceder, rectificar o eliminar tus datos personales en cualquier momento a través de tu panel de configuración o contactando a nuestro equipo de soporte.
                                    </p>
                                </div>

                                <div className="mb-5">
                                    <h3 className="mb-3">5. Actualizaciones</h3>
                                    <p>
                                        Podemos actualizar esta política ocasionalmente. Te notificaremos sobre cambios significativos a través de la plataforma o por correo electrónico.
                                    </p>
                                </div>

                                <hr />

                                <div className="text-center mt-5">
                                    <h4>¿Tienes dudas sobre seguridad?</h4>
                                    <p className="text-muted">Nuestro equipo técnico está disponible para explicarte nuestras capas de protección.</p>
                                    <a href="mailto:seguridad@smarterbot.cl" className="btn btn-primary mt-3">Contactar Seguridad</a>
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
