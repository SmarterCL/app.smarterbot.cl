"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { getSupabaseClient } from "@/lib/supabase"
import { Building2, User, Plus, Trash2, CheckCircle2, AlertCircle, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatRUT, validateRUT } from "@/lib/utils"
import { toast } from "sonner"

interface Subscription {
    id: string
    name: string
    rut: string
    is_active: boolean
    created_at: string
}

export function SubscriptionsView() {
    const { user } = useUser()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
    const [tenant, setTenant] = useState<any>(null)

    // Form state
    const [newName, setNewName] = useState("")
    const [newRut, setNewRut] = useState("")

    useEffect(() => {
        if (user) {
            fetchData()
        }
    }, [user])

    async function fetchData() {
        try {
            setLoading(true)
            const supabase = getSupabaseClient()

            // 1. Get Tenant for current user
            const { data: tenantData, error: tenantError } = await supabase
                .from("tenants")
                .select("*")
                .eq("clerk_user_id", user?.id)
                .single()

            if (tenantError) throw tenantError
            setTenant(tenantData)

            // 2. Get Subscriptions for this tenant
            const { data: subsData, error: subsError } = await supabase
                .from("subscriptions")
                .select("*")
                .eq("account_id", tenantData.id)
                .eq("deleted", false)
                .order("created_at", { ascending: false })

            if (subsError) throw subsError
            setSubscriptions(subsData || [])
        } catch (error: any) {
            console.error("Error fetching subscriptions:", error)
            toast.error("Error al cargar las suscripciones")
        } finally {
            setLoading(false)
        }
    }

    const handleAddSubscription = async () => {
        if (!newName || !newRut) {
            toast.error("Por favor completa todos los campos")
            return
        }

        const formattedRut = formatRUT(newRut)
        if (!validateRUT(formattedRut)) {
            toast.error("RUT inválido")
            return
        }

        try {
            setSaving(true)
            const supabase = getSupabaseClient()

            const { data, error } = await supabase
                .from("subscriptions")
                .insert({
                    account_id: tenant.id,
                    name: newName,
                    rut: formattedRut,
                    is_active: true,
                    deleted: false
                })
                .select()
                .single()

            if (error) throw error

            setSubscriptions([data, ...subscriptions])
            setNewName("")
            setNewRut("")
            toast.success("Suscriptor añadido correctamente")
        } catch (error: any) {
            console.error("Error saving subscription:", error)
            toast.error("Error al guardar: " + error.message)
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const supabase = getSupabaseClient()
            const { error } = await supabase
                .from("subscriptions")
                .update({ deleted: true })
                .eq("id", id)

            if (error) throw error

            setSubscriptions(subscriptions.filter(s => s.id !== id))
            toast.success("Suscripción eliminada")
        } catch (error: any) {
            toast.error("Error al eliminar")
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
            </div>
        )
    }

    const maxSubs = tenant?.metadata?.max_subscriptions || 3
    const remaining = maxSubs - subscriptions.length

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">

            {/* Dashboard Header Integration Info */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                    <h2 className="text-3xl font-[1000] text-slate-900 tracking-tight">Ciclo de Pagos</h2>
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] mt-1">Gestión de Suscripciones y Facturación</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-2xl border border-amber-100">
                    <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest leading-none">Corte Próximo:</span>
                    <span className="text-xs font-black text-slate-900 leading-none">15 de cada mes</span>
                </div>
            </div>

            {/* Billing Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-slate-950 text-white border-0 shadow-2xl rounded-[40px] overflow-hidden relative group">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-700">
                        <Building2 size={100} />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent" />

                    <CardHeader className="relative z-10 px-8 pt-8 pb-2">
                        <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400">Portal RUT</CardTitle>
                        <CardDescription className="text-slate-500 font-bold uppercase text-[9px]">Empresa Vinculada</CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10 px-8 pb-8">
                        <div className="text-2xl font-black truncate drop-shadow-sm">{tenant?.name || "Sin Empresa"}</div>
                        <div className="inline-flex items-center gap-2 mt-2 px-2.5 py-1 bg-white/5 rounded-lg border border-white/10 backdrop-blur-md">
                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">RUT:</span>
                            <span className="text-xs text-amber-400 font-black tracking-widest">{tenant?.rut || "Pnd."}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border-2 border-slate-100 shadow-xl rounded-[40px] overflow-hidden group">
                    <CardHeader className="px-8 pt-8 pb-2">
                        <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Suscripciones</CardTitle>
                        <CardDescription className="text-slate-500 font-bold uppercase text-[9px]">Capacidad Operativa</CardDescription>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                        <div className="flex items-end gap-2">
                            <span className="text-5xl font-black text-slate-900 leading-none">{subscriptions.length}</span>
                            <div className="flex flex-col mb-1">
                                <span className="text-xs font-black text-slate-400 uppercase leading-none">de {maxSubs}</span>
                                <span className="text-[9px] font-bold text-amber-600 uppercase tracking-tighter mt-1">Suscritos</span>
                            </div>
                        </div>
                        <div className="mt-6 w-full bg-slate-50 h-3 rounded-full border border-slate-100 overflow-hidden p-0.5">
                            <div
                                className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all duration-1000 shadow-sm"
                                style={{ width: `${(subscriptions.length / maxSubs) * 100}%` }}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-amber-400 border-0 shadow-xl rounded-[40px] overflow-hidden group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                    <CardHeader className="relative z-10 px-8 pt-8 pb-2">
                        <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-black/60">Facturación</CardTitle>
                        <CardDescription className="text-black/40 font-bold uppercase text-[9px]">Estado actual</CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10 px-8 pb-8">
                        <div className="flex items-center gap-3">
                            <div className="bg-black/90 p-2 rounded-2xl shadow-lg">
                                <CheckCircle2 className="h-6 w-6 text-amber-400" />
                            </div>
                            <div>
                                <div className="text-2xl font-black text-slate-950 uppercase tracking-tighter">
                                    {tenant?.payment_status || "AL DÍA"}
                                </div>
                                <p className="text-[10px] font-black text-black/50 uppercase tracking-widest mt-1">Plan {tenant?.plan_type || "DEMO"}</p>
                            </div>
                        </div>
                    </CardContent>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10" />
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* List of Subscriptions */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                            <div className="bg-amber-100 p-2 rounded-xl">
                                <User className="h-5 w-5 text-amber-600" />
                            </div>
                            Historial RUTs
                        </h3>
                        <Badge className="bg-slate-100 text-slate-600 border-0 font-black text-[9px] px-3">
                            TOTAL: {subscriptions.length}
                        </Badge>
                    </div>

                    {subscriptions.length === 0 ? (
                        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[44px] p-16 text-center group cursor-pointer hover:bg-white hover:border-amber-300 transition-all duration-500">
                            <div className="h-20 w-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                <Plus className="h-8 w-8 text-slate-300 group-hover:text-amber-500" />
                            </div>
                            <p className="font-black text-slate-900 text-lg">Sin suscriptores activos</p>
                            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400 mt-2">Configura un nuevo RUT para comenzar</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {subscriptions.map((sub) => (
                                <div key={sub.id} className="group flex items-center justify-between p-6 bg-white border border-slate-100 rounded-[32px] hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-500">
                                    <div className="flex items-center gap-5">
                                        <div className="h-14 w-14 rounded-2xl bg-slate-950 flex items-center justify-center text-[#FFCE00] font-black text-xl shadow-lg group-hover:rotate-6 transition-transform">
                                            {sub.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-900 text-lg leading-tight">{sub.name}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge variant="outline" className="bg-slate-50 text-slate-500 border-slate-100 font-black uppercase text-[8px] px-2">RUT</Badge>
                                                <span className="text-sm text-slate-500 font-black tracking-widest">{sub.rut}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="hidden md:flex flex-col items-end mr-2">
                                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Activo</span>
                                            <span className="text-[9px] font-bold text-slate-300 uppercase mt-0.5 whitespace-nowrap">Desde {new Date(sub.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-12 w-12 text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-2xl lg:opacity-0 group-hover:opacity-100 transition-all"
                                            onClick={() => handleDelete(sub.id)}
                                        >
                                            <Trash2 size={20} />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Add New Form */}
                <div className="space-y-6">
                    <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                        <div className="bg-emerald-100 p-2 rounded-xl">
                            <Plus className="h-5 w-5 text-emerald-600" />
                        </div>
                        Nueva Habilitación
                    </h3>

                    <Card className="rounded-[48px] border border-slate-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] overflow-hidden bg-white">
                        {remaining > 0 ? (
                            <CardContent className="p-10 space-y-8">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Nombre del Suscriptor</Label>
                                        <Input
                                            placeholder="Ej: Juan Pérez"
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            className="h-16 border-slate-100 bg-slate-50 rounded-3xl focus:ring-4 focus:ring-amber-500/10 focus:bg-white transition-all px-6 text-base font-bold text-slate-900 placeholder:text-slate-300"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Identificación RUT</Label>
                                        <Input
                                            placeholder="12.345.678-9"
                                            value={newRut}
                                            onChange={(e) => setNewRut(e.target.value)}
                                            className="h-16 border-slate-100 bg-slate-50 rounded-3xl focus:ring-4 focus:ring-amber-500/10 focus:bg-white transition-all px-6 text-base font-bold text-slate-900 placeholder:text-slate-300"
                                        />
                                    </div>
                                </div>

                                <div className="p-5 bg-amber-50 rounded-3xl border border-amber-100 flex items-start gap-4">
                                    <div className="bg-amber-100 p-2 rounded-xl mt-1">
                                        <AlertCircle className="h-5 w-5 text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="font-black text-slate-900 text-sm">Disponibilidad de Plan</p>
                                        <p className="text-xs font-bold text-amber-700/70 mt-1 uppercase tracking-tight">
                                            Te quedan <span className="text-amber-600 underline underline-offset-4">{remaining}</span> cupos para vincular RUTs sin costo adicional.
                                        </p>
                                    </div>
                                </div>

                                <Button
                                    className="w-full h-18 bg-slate-950 hover:bg-black text-[#FFCE00] rounded-[28px] font-black text-lg shadow-2xl active:scale-95 transition-all py-8 mt-2"
                                    onClick={handleAddSubscription}
                                    disabled={saving}
                                >
                                    {saving ? "REGISTRANDO..." : "REGISTRAR SUSCRIPTOR"}
                                </Button>
                            </CardContent>
                        ) : (
                            <CardContent className="p-12 text-center space-y-8">
                                <div className="h-28 w-28 bg-amber-100 rounded-[44px] flex items-center justify-center mx-auto mb-4 group rotate-3 hover:rotate-0 transition-transform duration-500">
                                    <CreditCard className="h-12 w-12 text-amber-600" />
                                </div>
                                <div>
                                    <h4 className="text-3xl font-[1000] text-slate-900 tracking-tight">Plan Full</h4>
                                    <p className="text-slate-500 font-bold mt-3 leading-relaxed max-w-[280px] mx-auto">
                                        Has alcanzado el límite de habilitaciones. Amplía tu plan para gestionar más negocios.
                                    </p>
                                </div>
                                <Button className="w-full h-18 bg-amber-400 hover:bg-amber-500 text-black font-black rounded-[28px] text-lg shadow-xl py-8">
                                    AMPLIAR CAPACIDAD
                                </Button>
                            </CardContent>
                        )}
                        <CardFooter className="bg-slate-50 p-8 border-t border-slate-100 font-bold text-[9px] text-slate-400 text-center uppercase tracking-[0.4em] justify-center">
                            Sistema Operativo Comercial • Portal RUT
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
