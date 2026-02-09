import { Bot, Shield, Lock, Eye, FileText, ChevronRight } from "lucide-react"

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-white text-slate-900 selection:bg-[#FFCE00] selection:text-black">
            {/* Navigation Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black">
                            <Bot className="h-6 w-6 text-[#FFCE00]" />
                        </div>
                        <span className="text-xl font-black tracking-tighter italic">SmarterOS</span>
                    </div>
                    <a
                        href="/"
                        className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 hover:text-black transition-colors"
                    >
                        Volver al inicio
                    </a>
                </div>
            </header>

            <main className="pt-32 pb-24 px-6">
                <div className="max-w-3xl mx-auto">
                    {/* Hero Section */}
                    <div className="mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6 font-mono">
                            <Shield className="h-3 w-3" /> Security & Privacy
                        </div>
                        <h1 className="text-6xl font-black tracking-tighter leading-[0.9] mb-8">
                            Nuestra <br />
                            <span className="text-slate-400">Política de</span> <br />
                            Privacidad.
                        </h1>
                        <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
                            En SmarterOS, tu privacidad es nuestra prioridad técnica. Este documento detalla cómo protegemos tus datos y los de tus clientes en nuestra plataforma.
                        </p>
                    </div>

                    <div className="space-y-12">
                        {/* Principles */}
                        <section className="grid md:grid-cols-2 gap-6 mb-16">
                            {[
                                {
                                    icon: Lock,
                                    title: "Encriptación End-to-End",
                                    desc: "Tus datos viajan siempre bajo protocolos TLS 1.3 y se almacenan con encriptación en reposo."
                                },
                                {
                                    icon: Eye,
                                    title: "Transparencia Total",
                                    desc: "Solo recopilamos la información estrictamente necesaria para la operación de tus automatizaciones."
                                }
                            ].map((item, i) => (
                                <div key={i} className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 hover:border-[#FFCE00] transition-colors group">
                                    <div className="h-12 w-12 rounded-2xl bg-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <item.icon className="h-6 w-6 text-[#FFCE00]" />
                                    </div>
                                    <h3 className="text-lg font-black mb-2 tracking-tight">{item.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                                </div>
                            ))}
                        </section>

                        {/* Detailed Content */}
                        <section className="prose prose-slate prose-headings:font-black prose-headings:tracking-tighter prose-p:font-medium prose-p:leading-relaxed max-w-none">
                            <h2 className="text-3xl mt-0">1. Información que Recopilamos</h2>
                            <p>
                                Recopilamos información que nos proporcionas directamente cuando creas una cuenta, utilizas nuestros servicios o te comunicas con nosotros. Esto incluye:
                            </p>
                            <ul>
                                <li>Datos de cuenta: Nombre, correo electrónico, RUT y credenciales de acceso.</li>
                                <li>Datos de automatización: Logs de ejecuciones de n8n, mensajes de WhatsApp (vía API) y registros de Odoo.</li>
                                <li>Datos técnicos: Dirección IP, tipo de navegador e identificadores de dispositivo.</li>
                            </ul>

                            <h2>2. Uso de la Información</h2>
                            <p>
                                Utilizamos la información recopilada para:
                            </p>
                            <ul>
                                <li>Proveer, mantener y mejorar la plataforma SmarterOS.</li>
                                <li>Procesar transacciones y enviar notificaciones relacionadas.</li>
                                <li>Orquestar servicios de inteligencia artificial solicitados por el usuario.</li>
                                <li>Garantizar la seguridad y prevenir actividades fraudulentas.</li>
                            </ul>

                            <h2>3. Compartición de Datos</h2>
                            <p>
                                SmarterOS no vende tus datos personales. Compartimos información únicamente con proveedores de servicios esenciales para el funcionamiento de la plataforma:
                            </p>
                            <ul>
                                <li><strong>Supabase:</strong> Como infraestructura de base de datos.</li>
                                <li><strong>Clerk:</strong> Para la gestión de autenticación segura.</li>
                                <li><strong>Meta:</strong> Para la integración de WhatsApp Business API.</li>
                            </ul>

                            <h2>4. Tus Derechos</h2>
                            <p>
                                Tienes derecho a acceder, rectificar o eliminar tus datos personales en cualquier momento a través de tu panel de configuración o contactando a nuestro equipo de soporte.
                            </p>

                            <h2>5. Actualizaciones</h2>
                            <p>
                                Podemos actualizar esta política ocasionalmente. Te notificaremos sobre cambios significativos a través de la plataforma o por correo electrónico.
                            </p>
                        </section>

                        {/* Contact Footer */}
                        <section className="mt-24 pt-12 border-t border-slate-100">
                            <div className="bg-black rounded-[40px] p-12 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-120 transition-transform group-hover:rotate-12">
                                    <Shield className="h-32 w-32 text-white" />
                                </div>
                                <div className="relative z-10 max-w-md">
                                    <h2 className="text-3xl font-black text-white mb-4 tracking-tighter">¿Tienes dudas sobre seguridad?</h2>
                                    <p className="text-slate-400 font-medium mb-8">Nuestro equipo técnico está disponible para explicarte nuestras capas de protección.</p>
                                    <a
                                        href="mailto:seguridad@smarterbot.cl"
                                        className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#FFCE00] text-black font-black uppercase text-xs tracking-widest hover:bg-white transition-colors"
                                    >
                                        Contactar Seguridad <ChevronRight className="h-4 w-4" />
                                    </a>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <footer className="py-12 border-t border-slate-100 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                        © 2026 SmarterOS SPA · Providencia, Chile
                    </p>
                    <div className="flex gap-8">
                        <a href="/terms" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-black transition-colors">Términos</a>
                        <a href="/privacy" className="text-[10px] font-black text-black uppercase tracking-[0.3em]">Privacidad</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
