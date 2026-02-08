"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { sendVerificationCode } from "@/lib/messaging"
import { toast } from "sonner"
import { MessageSquare, Smartphone } from "lucide-react"

export function CodeVerification() {
    const [phone, setPhone] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSendCode = async (provider: 'whatsapp' | 'sms') => {
        if (!phone) {
            toast.error("Por favor, ingresa un número de teléfono")
            return
        }

        setIsLoading(true)
        const code = Math.floor(100000 + Math.random() * 900000).toString()

        try {
            const result = await sendVerificationCode(phone, code)
            if (result.success) {
                toast.success(`Código enviado vía ${provider.toUpperCase()}`)
            } else {
                toast.error("Error al enviar el código")
            }
        } catch (error) {
            toast.error("Error de conexión")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto border-slate-200/60 shadow-xl backdrop-blur-md bg-white/80">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">Verificación de Identidad</CardTitle>
                <CardDescription>
                    Ingresa tu número para recibir un código de acceso seguro.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-500 ml-1">Teléfono (ej: +569...)</label>
                    <Input
                        placeholder="+56 9 1234 5678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:ring-amber-500"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Button
                        variant="outline"
                        className="h-14 rounded-xl border-2 border-green-100 hover:bg-green-50 text-green-700 font-bold gap-2"
                        onClick={() => handleSendCode('whatsapp')}
                        disabled={isLoading}
                    >
                        <MessageSquare className="h-5 w-5" />
                        WhatsApp
                    </Button>

                    <Button
                        variant="outline"
                        className="h-14 rounded-xl border-2 border-blue-100 hover:bg-blue-50 text-blue-700 font-bold gap-2"
                        onClick={() => handleSendCode('sms')}
                        disabled={isLoading}
                    >
                        <Smartphone className="h-5 w-5" />
                        SMS
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
