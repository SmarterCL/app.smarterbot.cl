"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight } from "lucide-react"

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
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-border bg-card p-6 shadow-xl">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-foreground">Vincula tu RUT</h1>
          <p className="text-sm text-muted-foreground">
            Ingresa el RUT de tu empresa para acceder al panel SmarterOS.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rut">RUT empresa</Label>
            <Input
              id="rut"
              placeholder="12.345.678-9"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              Formato: 12.345.678-9 o 12345678-9
            </p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-500">
              {error}
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full group">
            {loading ? "Vinculando..." : "Continuar"}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          ¿No tienes un tenant activo?{" "}
          <a
            href="https://wa.me/56979540471?text=Hola%20SmarterOS%2C%20necesito%20activar%20mi%20cuenta."
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline-offset-2 hover:underline"
          >
            Contacta soporte
          </a>
        </p>
      </div>
    </div>
  )
}
