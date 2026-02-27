"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QrCode, Plus, Download, Share2, Link, MessageCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface QRCodeItem {
  id: string
  type: "whatsapp" | "url" | "text"
  content: string
  label: string
  createdAt: Date
  scanCount: number
}

export default function QRCodeGenerator() {
  const [qrCodes, setQRCodes] = useState<QRCodeItem[]>([])
  const [generating, setGenerating] = useState(false)
  const [qrType, setQrType] = useState<"whatsapp" | "url" | "text">("whatsapp")
  const [content, setContent] = useState("")
  const [label, setLabel] = useState("")

  const generateQR = async () => {
    if (!content) {
      toast.error("Ingresa el contenido para generar el QR")
      return
    }

    setGenerating(true)

    try {
      // Using nocodeapi QR generator
      const qrEndpoint = "https://v1.nocodeapi.com/smarterbot/qrCode/PCAbTfWyTtVzBTes"
      
      let qrContent = content
      if (qrType === "whatsapp" && !content.startsWith("https://wa.me/")) {
        // Convert phone to WhatsApp link
        const phone = content.replace(/[^0-9]/g, "")
        qrContent = `https://wa.me/${phone}`
      }

      const response = await fetch(`${qrEndpoint}?url=${encodeURIComponent(qrContent)}`)
      
      if (!response.ok) {
        throw new Error("Error generando QR")
      }

      const blob = await response.blob()
      const qrUrl = URL.createObjectURL(blob)

      const newQR: QRCodeItem = {
        id: Date.now().toString(),
        type: qrType,
        content: qrContent,
        label: label || `${qrType.toUpperCase()} QR`,
        createdAt: new Date(),
        scanCount: 0
      }

      // Store QR code (in production, save to database)
      const stored = localStorage.getItem("smarteros-qrcodes")
      const existing: QRCodeItem[] = stored ? JSON.parse(stored) : []
      const updated = [newQR, ...existing]
      localStorage.setItem("smarteros-qrcodes", JSON.stringify(updated))
      
      setQRCodes(updated)
      
      toast.success("QR generado exitosamente")
      setContent("")
      setLabel("")
    } catch (error) {
      console.error("QR generation error:", error)
      toast.error("Error al generar el código QR")
    } finally {
      setGenerating(false)
    }
  }

  const downloadQR = async (qr: QRCodeItem) => {
    try {
      const qrEndpoint = "https://v1.nocodeapi.com/smarterbot/qrCode/PCAbTfWyTtVzBTes"
      const response = await fetch(`${qrEndpoint}?url=${encodeURIComponent(qr.content)}`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      
      const link = document.createElement("a")
      link.href = url
      link.download = `qr-${qr.label.toLowerCase().replace(/\s+/g, "-")}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      toast.success("QR descargado")
    } catch (error) {
      toast.error("Error al descargar QR")
    }
  }

  const shareQR = async (qr: QRCodeItem) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: qr.label,
          text: `Escanea este QR: ${qr.content}`,
          url: qr.content
        })
        toast.success("QR compartido")
      } catch (error) {
        console.error("Share error:", error)
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(qr.content)
      toast.success("Enlace copiado al portapapeles")
    }
  }

  const deleteQR = (id: string) => {
    const updated = qrCodes.filter(qr => qr.id !== id)
    setQRCodes(updated)
    localStorage.setItem("smarteros-qrcodes", JSON.stringify(updated))
    toast.success("QR eliminado")
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Códigos QR</h1>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] mt-1">
            Genera códigos QR para WhatsApp y más
          </p>
        </div>
        <Badge className="bg-amber-100 text-amber-700 border-amber-200">
          <QrCode className="h-3 w-3 mr-1" />
          {qrCodes.length} QRs
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Generator Form */}
        <Card className="rounded-[48px] border border-slate-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] overflow-hidden bg-white">
          <CardHeader className="px-10 pt-10 pb-4">
            <CardTitle className="flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-xl">
                <Plus className="h-5 w-5 text-emerald-600" />
              </div>
              Generar QR
            </CardTitle>
            <CardDescription>Selecciona el tipo y contenido del código QR</CardDescription>
          </CardHeader>
          <CardContent className="px-10 pb-10 space-y-6">
            {/* Type Selection */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setQrType("whatsapp")}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                  qrType === "whatsapp"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-slate-100 hover:border-slate-200"
                }`}
              >
                <MessageCircle className="h-6 w-6" />
                <span className="text-xs font-black uppercase">WhatsApp</span>
              </button>
              <button
                onClick={() => setQrType("url")}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                  qrType === "url"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-slate-100 hover:border-slate-200"
                }`}
              >
                <Link className="h-6 w-6" />
                <span className="text-xs font-black uppercase">URL</span>
              </button>
              <button
                onClick={() => setQrType("text")}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                  qrType === "text"
                    ? "border-amber-500 bg-amber-50 text-amber-700"
                    : "border-slate-100 hover:border-slate-200"
                }`}
              >
                <QrCode className="h-6 w-6" />
                <span className="text-xs font-black uppercase">Texto</span>
              </button>
            </div>

            {/* Content Input */}
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                {qrType === "whatsapp" ? "Número de WhatsApp" : qrType === "url" ? "URL" : "Texto"}
              </Label>
              <Input
                placeholder={
                  qrType === "whatsapp" 
                    ? "+56 9 1234 5678" 
                    : qrType === "url"
                    ? "https://ejemplo.com"
                    : "Tu mensaje aquí"
                }
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="h-16 border-slate-100 bg-slate-50 rounded-3xl focus:ring-4 focus:ring-emerald-500/10 focus:bg-white transition-all px-6 text-base font-bold text-slate-900 placeholder:text-slate-300"
              />
            </div>

            {/* Label Input */}
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                Etiqueta (opcional)
              </Label>
              <Input
                placeholder="Ej: QR Tienda Principal"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="h-16 border-slate-100 bg-slate-50 rounded-3xl focus:ring-4 focus:ring-emerald-500/10 focus:bg-white transition-all px-6 text-base font-bold text-slate-900 placeholder:text-slate-300"
              />
            </div>

            <Button
              className="w-full h-16 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[28px] font-black text-lg shadow-2xl active:scale-95 transition-all"
              onClick={generateQR}
              disabled={generating}
            >
              {generating ? "GENERANDO..." : "GENERAR CÓDIGO QR"}
            </Button>
          </CardContent>
        </Card>

        {/* QR List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
              <div className="bg-slate-100 p-2 rounded-xl">
                <QrCode className="h-5 w-5 text-slate-600" />
              </div>
              Mis QRs
            </h3>
            <Badge className="bg-slate-100 text-slate-600 border-0 font-black text-[9px] px-3">
              TOTAL: {qrCodes.length}
            </Badge>
          </div>

          {qrCodes.length === 0 ? (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[44px] p-16 text-center group cursor-pointer hover:bg-white hover:border-emerald-300 transition-all duration-500">
              <div className="h-20 w-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <QrCode className="h-8 w-8 text-slate-300 group-hover:text-emerald-500" />
              </div>
              <p className="font-black text-slate-900 text-lg">Sin códigos QR</p>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400 mt-2">
                Genera tu primer QR para comenzar
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {qrCodes.map((qr) => (
                <div
                  key={qr.id}
                  className="group flex items-center justify-between p-6 bg-white border border-slate-100 rounded-[32px] hover:border-emerald-400 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-500"
                >
                  <div className="flex items-center gap-5">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform">
                      <QrCode className="h-8 w-8" />
                    </div>
                    <div>
                      <p className="font-black text-slate-900 text-lg leading-tight">{qr.label}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="bg-slate-50 text-slate-500 border-slate-100 font-black uppercase text-[8px] px-2">
                          {qr.type}
                        </Badge>
                        <span className="text-xs text-slate-400 font-bold truncate max-w-[200px]">
                          {qr.content}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl"
                      onClick={() => shareQR(qr)}
                    >
                      <Share2 size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl"
                      onClick={() => downloadQR(qr)}
                    >
                      <Download size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl lg:opacity-0 group-hover:opacity-100 transition-all"
                      onClick={() => deleteQR(qr.id)}
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
