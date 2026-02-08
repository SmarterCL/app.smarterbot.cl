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

      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Error de red")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FFCE00] overflow-x-hidden relative py-12">
      {/* Background Decorative Element (Lightning Bolt) */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 opacity-10 pointer-events-none">
        <svg className="w-[800px] h-[800px] text-black" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 opacity-10 pointer-events-none rotate-180">
        <svg className="w-[800px] h-[800px] text-black" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>

      <div className="w-full max-w-[440px] md:max-w-[480px] px-6 animate-in fade-in zoom-in duration-700 relative z-10 m-auto">
        <div className="relative group">
          {/* Ambient Shadow */}
          <div className="absolute -inset-1.5 rounded-[52px] bg-black/10 opacity-40 blur-2xl"></div>

          <div className="relative bg-white rounded-[44px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-white/20 overflow-hidden">

            {/* Card Header */}
            <div className="flex flex-col items-center px-6 pt-10 pb-6 md:px-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-black shadow-xl mb-6">
                <Bot className="h-8 w-8 text-[#FFCE00]" />
              </div>

              <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-slate-100 text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4">
                Configuración Final
              </div>

              <h3 className="text-2xl md:text-3xl font-[1000] text-slate-900 tracking-tight text-center">Datos de Acceso</h3>
              <div className="h-1.5 w-12 bg-[#FFCE00] rounded-full mt-3" />
            </div>

            <form onSubmit={handleSubmit} className="px-10 pb-10 space-y-5">
              <div className="space-y-3">
                <Label htmlFor="rutPersona" className="text-slate-500 text-[11px] font-black uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                  <User className="h-3 w-3" /> RUT Persona
                </Label>
                <Input
                  id="rutPersona"
                  placeholder="12.345.678-k"
                  value={rutPersona}
                  onChange={(e) => setRutPersona(formatRUT(e.target.value))}
                  required
                  className="w-full h-12 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 text-base rounded-[18px] transition-all border-2 px-6"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="rutEmpresa" className="text-slate-500 text-[11px] font-black uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                  <Building2 className="h-3 w-3" /> RUT Empresa
                </Label>
                <Input
                  id="rutEmpresa"
                  placeholder="76.123.456-7"
                  value={rutEmpresa}
                  onChange={(e) => setRutEmpresa(formatRUT(e.target.value))}
                  required
                  className="w-full h-12 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/5 text-base rounded-[18px] transition-all border-2 px-6"
                />
              </div>

              {error && (
                <div className="rounded-2xl border-2 border-red-100 bg-red-50 p-4 text-xs font-bold text-red-600 animate-in shake duration-300">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-slate-900 text-white hover:bg-black font-black transition-all duration-300 rounded-[20px] transform active:scale-[0.98] shadow-xl text-base flex items-center justify-center gap-2 group"
              >
                {loading ? "ACTUALIZANDO..." : "COMPLETAR PERFIL"}
                {!loading && <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />}
              </Button>

              <div className="pt-2 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  SmarterOS Billing System
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8 opacity-40 text-center">
          <p className="text-[10px] font-black text-black tracking-[0.6em] uppercase">SmarterOS Hub</p>
        </div>
      </div>
    </div>
  )
}
