"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Bot, Building2, User } from "lucide-react"
import { formatRUT } from "@/lib/utils"

export default function RutOnboardingPage() {
  const router = useRouter()
  const [rutPersona, setRutPersona] = useState("")
  const [rutEmpresa, setRutEmpresa] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/tenant/link-rut", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rutPersona, rutEmpresa }),
      })

      const data = await res.json()

      if (!data.ok) {
        setError(data.error || "Error al vincular los datos")
        setLoading(false)
        return
      }

      // Proceso Híbrido: Identificar si traen un plan
      const params = new window.URLSearchParams(window.location.search);
      const chosenPlan = params.get('plan');

      if (chosenPlan) {
        // Redirigir directamente a la pasarela Flow (o procesador) según el plan elegido
        // Reemplazar con URL real de Flow.cl o Stripe API
        window.location.href = `https://www.flow.cl/app/webpay/pago.php?token=${chosenPlan}-demo-token-123`;
      } else {
        router.push("/dashboard")
      }
    } catch (err: any) {
      setError(err.message || "Error de red")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:grid lg:grid-cols-2 bg-[#FFCE00] lg:bg-white overflow-x-hidden selection:bg-[#FFCE00] selection:text-black">

      {/* Left Column: Brand & Info (Visible on Desktop) */}
      <div className="relative hidden lg:flex flex-col items-center justify-center px-12 overflow-hidden bg-slate-950 min-h-screen w-full">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
          style={{ backgroundImage: "url('/login-bg.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />

        <div className="relative z-10 max-w-xl animate-in slide-in-from-left duration-1000">
          <div className="flex items-center gap-6 mb-12">
            <div className="flex h-24 w-24 items-center justify-center rounded-[28px] bg-black shadow-2xl">
              <Bot className="h-14 w-14 text-[#FFCE00]" />
            </div>
            <div>
              <h1 className="text-7xl font-[1000] text-white tracking-tighter leading-none">
                Consola
              </h1>
              <p className="text-xl font-black text-[#FFCE00] uppercase tracking-[0.3em] mt-2">
                Habilitación RUT
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-5xl font-black text-white leading-[1.05] tracking-tight">
              Vincula tu identidad<br />
              <span className="text-[#FFCE00] drop-shadow-sm">para activar los servicios.</span>
            </h2>

            <p className="text-lg font-bold text-slate-400 max-w-md leading-relaxed">
              Necesitaremos tu RUT personal y el de tu empresa para configurar el ciclo de pagos y la facturación automatizada.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Onboarding Form */}
      <div className="flex flex-col items-center justify-center p-6 md:p-12 lg:p-16 relative min-h-screen w-full bg-[#FFCE00] lg:bg-white">
        {/* Mobile Background decoration */}
        <div className="absolute inset-0 lg:hidden opacity-10 pointer-events-none">
          <svg className="w-full h-full text-black" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        <div className="w-full max-w-[480px] animate-in fade-in zoom-in duration-1000 relative z-10">
          <div className="relative group">
            {/* Ambient Shadow */}
            <div className="absolute -inset-4 rounded-[60px] bg-black/5 opacity-50 blur-3xl transition-all duration-500 group-hover:opacity-80"></div>

            <div className="relative bg-white/95 backdrop-blur-xl rounded-[44px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] border border-white/40 overflow-hidden">

              {/* Card Header */}
              <div className="flex flex-col items-center px-6 pt-12 pb-2 md:px-10">
                <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6">
                  Configuración Billing 2026
                </div>
                <h3 className="text-3xl font-[1000] text-slate-900 tracking-tight text-center">Datos del Portal RUT</h3>
                <div className="h-1.5 w-16 bg-[#FFCE00] rounded-full mt-4" />
              </div>

              <form onSubmit={handleSubmit} className="px-6 pb-10 pt-8 md:px-12 space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="rutPersona" className="text-slate-500 text-[11px] font-black uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                    <User className="h-3.5 w-3.5 text-amber-500" /> RUT Persona (Titular)
                  </Label>
                  <Input
                    id="rutPersona"
                    placeholder="12.345.678-k"
                    value={rutPersona}
                    onChange={(e) => setRutPersona(formatRUT(e.target.value))}
                    required
                    className="w-full h-14 bg-slate-50 border-slate-100 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/5 text-base rounded-[22px] transition-all border-2 px-6 shadow-sm"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="rutEmpresa" className="text-slate-500 text-[11px] font-black uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                    <Building2 className="h-3.5 w-3.5 text-amber-500" /> RUT Empresa (Facturación)
                  </Label>
                  <Input
                    id="rutEmpresa"
                    placeholder="76.123.456-7"
                    value={rutEmpresa}
                    onChange={(e) => setRutEmpresa(formatRUT(e.target.value))}
                    required
                    className="w-full h-14 bg-slate-50 border-slate-100 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/5 text-base rounded-[22px] transition-all border-2 px-6 shadow-sm"
                  />
                </div>

                {error && (
                  <div className="rounded-2xl border-2 border-red-100 bg-red-50 p-4 text-xs font-bold text-red-600 animate-in shake duration-300">
                    ⚠️ {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-16 bg-slate-900 text-white hover:bg-black font-black transition-all duration-300 rounded-[24px] transform active:scale-[0.98] shadow-2xl text-lg flex items-center justify-center gap-3 group mt-4"
                >
                  {loading ? "PROCESANDO..." : "ACTIVAR CONSOLA"}
                  {!loading && <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />}
                </Button>

                <div className="text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                    Cifrado con estándares SmarterOS
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
