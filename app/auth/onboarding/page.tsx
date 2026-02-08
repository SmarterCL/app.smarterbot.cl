"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Building2, ShieldCheck, Sparkles } from "lucide-react"

export default function RutOnboardingPage() {
  const router = useRouter()
  const [rut, setRut] = useState("")
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
        body: JSON.stringify({ rut }),
      })

      const data = await res.json()

      if (!data.ok) {
        setError(data.error || "Error al vincular RUT")
        setLoading(false)
        return
      }

      // RUT vinculado, redirigir al dashboard
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Error de red")
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 overflow-hidden flex items-center justify-center p-4">
      {/* Decorative blur circles */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-yellow-300/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-orange-400/30 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-[450px]">
        {/* Outer frame with shadow for depth */}
        <div className="relative">
          {/* Shadow layer */}
          <div className="absolute inset-0 rounded-[32px] bg-black/20 blur-xl translate-y-4"></div>

          {/* Main card with border frame */}
          <div className="relative rounded-[28px] p-[3px] bg-gradient-to-b from-white/80 to-white/40 shadow-2xl">
            <div className="rounded-[26px] bg-white overflow-hidden p-8">
              <div className="flex flex-col items-center text-center space-y-4 mb-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 shadow-inner">
                  <Building2 className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-gray-900 tracking-tight">Vincular Empresa</h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Configura tu identidad corporativa en SmarterOS
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="rut" className="text-gray-700 text-xs font-black uppercase tracking-widest ml-1">
                    RUT de la empresa
                  </Label>
                  <div className="relative">
                    <Input
                      id="rut"
                      placeholder="12.345.678-9"
                      value={rut}
                      onChange={(e) => setRut(e.target.value)}
                      required
                      className="w-full h-14 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:ring-amber-500 py-3 text-sm rounded-xl pl-4 transition-all"
                    />
                  </div>
                  <div className="flex items-center gap-2 px-1 text-[10px] text-gray-400">
                    <Sparkles className="h-3 w-3 text-amber-500" />
                    <span>Formato: 12.345.678-9 o 12345678-9</span>
                  </div>
                </div>

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-4 flex gap-3 animate-in fade-in slide-in-from-top-2">
                    <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                      <span className="text-red-600 font-bold ml-[1px]">!</span>
                    </div>
                    <p className="text-xs text-red-600 font-medium leading-relaxed">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-lg transition-all duration-300 rounded-xl group active:scale-[0.98]"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Vínculando...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2 w-full text-base">
                      Finalizar Configuración
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <ShieldCheck className="h-5 w-5 text-blue-500 shrink-0" />
                  <p className="text-[11px] text-gray-500 leading-normal">
                    Tu RUT es necesario para sincronizar tus facturas y automatizaciones con el ERP de SmarterOS.
                  </p>
                </div>

                <p className="text-center text-xs text-gray-400 italic">
                  ¿Problemas con tu RUT?{" "}
                  <a
                    href="https://wa.me/56979540471?text=Hola%20SmarterOS%2C%20necesito%20activar%20mi%20cuenta."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-black text-amber-600 hover:text-amber-700 not-italic hover:underline underline-offset-4"
                  >
                    Contacta soporte
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 text-center text-xs text-gray-900/40 z-10 font-medium">
        © 2026 SmarterOS • Enterprise Grade Setup
      </div>
    </div>
  )
}
