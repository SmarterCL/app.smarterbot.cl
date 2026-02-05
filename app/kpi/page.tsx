"use client"

import { useState } from "react"

export default function KPIPage() {
  const [dashboardId, setDashboardId] = useState<number | "">(1)
  const [iframeUrl, setIframeUrl] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")

  const generate = async () => {
    setLoading(true)
    setError("")
    setIframeUrl("")
    try {
      if (!dashboardId || Number.isNaN(Number(dashboardId))) {
        setError("Ingresa un ID de dashboard válido")
        setLoading(false)
        return
      }
      const res = await fetch("/api/metabase/embed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resource: { dashboard: Number(dashboardId) } }),
      })
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}))
        throw new Error(payload?.error || `Error ${res.status}`)
      }
      const payload = await res.json()
      setIframeUrl(payload.iframeUrl)
    } catch (e: any) {
      setError(e?.message || "Error desconocido")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <h1 className="text-2xl font-semibold">KPI (Metabase)</h1>
        <p className="text-sm text-muted-foreground">
          Esta página genera un token de Metabase (JWT) usando tu sesión de Clerk y embebe el dashboard solicitado.
        </p>

        <div className="flex items-center gap-3">
          <label className="text-sm" htmlFor="dashboardId">Dashboard ID</label>
          <input
            id="dashboardId"
            type="number"
            value={dashboardId}
            onChange={(e) => setDashboardId(Number(e.target.value))}
            className="rounded-lg border border-border bg-secondary px-3 py-2 text-sm"
          />
          <button
            onClick={generate}
            disabled={loading}
            className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50"
          >
            {loading ? "Generando..." : "Generar embed"}
          </button>
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-500">
            {error}
          </div>
        )}

        {iframeUrl && (
          <div className="space-y-3">
            <div className="rounded-lg border border-border bg-secondary p-4">
              <p className="text-sm font-medium">URL del iframe:</p>
              <p className="break-all text-xs text-muted-foreground">{iframeUrl}</p>
            </div>
            <iframe
              src={iframeUrl}
              width="100%"
              height="800"
              frameBorder="0"
              className="rounded-lg border border-border"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  )
}