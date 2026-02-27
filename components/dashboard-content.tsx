"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { createBrowserClient } from "@supabase/ssr"
import { UserButton, useUser } from "@clerk/nextjs"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SubscriptionsView } from "@/components/subscriptions-view"
import { getUserServices, ensureUserProfile, type UserService } from "@/lib/supabase"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

const ChatwootWidget = dynamic(() => import("@/components/chatwoot-widget"), {
  ssr: false,
  loading: () => <Skeleton className="h-[400px] w-full" />,
})

import {
  Activity,
  BarChart3,
  Bot,
  Database,
  Filter,
  Key,
  MessageSquare,
  Plus,
  QrCode,
  RefreshCw,
  Search,
  Settings,
  Shield,
  Upload,
  Users,
  Zap,
  CreditCard,
} from "lucide-react"

const overviewStats = [
  { title: "Mensajes enviados", value: "2,847", delta: "+12%", icon: MessageSquare },
  { title: "Contactos activos", value: "1,234", delta: "+5%", icon: Users },
  { title: "Automatizaciones", value: "12", delta: "3 activas", icon: Zap },
  { title: "Tasa de respuesta", value: "89.2%", delta: "+2.1%", icon: BarChart3 },
]

const tabItems = [
  { value: "overview", label: "Overview", icon: BarChart3 },
  { value: "messages", label: "Mensajes", icon: MessageSquare },
  { value: "contacts", label: "Contactos", icon: Users },
  { value: "subscriptions", label: "Suscripciones", icon: CreditCard },
  { value: "automation", label: "Automatización", icon: Zap },
  { value: "qr", label: "QR Codes", icon: QrCode },
  { value: "api", label: "API Keys", icon: Key },
  { value: "settings", label: "Configuración", icon: Settings },
]

const dateTimeFormatter = new Intl.DateTimeFormat("es-CL", {
  dateStyle: "medium",
  timeStyle: "short",
})

const formatDateTime = (value?: number | Date | null) => {
  if (!value) return "Sin registro"

  try {
    const date = value instanceof Date ? value : new Date(value)

    if (Number.isNaN(date.getTime())) {
      return "Sin registro"
    }

    return dateTimeFormatter.format(date)
  } catch (error) {
    return "Sin registro"
  }
}

const getInitials = (value?: string | null) => {
  if (!value) return "??"

  const trimmed = value.trim()
  if (!trimmed) return "??"

  const parts = trimmed.split(/\s+/)
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
}

type SyncedContact = {
  id: string
  email: string
  name: string
  source?: string | null
  status?: string | null
  rut_persona?: string | null
  rut_empresa?: string | null
  was_notified?: boolean
  created_at?: string | null
  updated_at?: string | null
}

export default function DashboardContent() {
  const { user, isLoaded } = useUser()
  const [activeTab, setActiveTab] = useState("overview")
  const [supabaseContact, setSupabaseContact] = useState<SyncedContact | null>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [userServices, setUserServices] = useState<UserService[]>([])
  const [tenant, setTenant] = useState<any>(null)
  const [syncState, setSyncState] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [syncError, setSyncError] = useState<string | null>(null)

  // Integration stats from external API
  const [integrationStats, setIntegrationStats] = useState<any>(null)
  const [statsLoading, setStatsLoading] = useState(false)

  // Validate environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Check if Supabase is properly configured
  const isSupabaseConfigured = Boolean(
    supabaseUrl && 
    supabaseKey && 
    !supabaseUrl.includes('placeholder') &&
    !supabaseKey.includes('placeholder')
  )

  // Initialize Supabase client only if configured
  const supabase = isSupabaseConfigured && supabaseUrl && supabaseKey
    ? createBrowserClient(supabaseUrl, supabaseKey)
    : null

  useEffect(() => {
    if (!isLoaded || !user) {
      return
    }

    // Check Supabase configuration before syncing
    if (!isSupabaseConfigured) {
      setSyncState("error")
      setSyncError("Supabase no configurado. Configura NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY")
      return
    }

    let isMounted = true

    const syncData = async () => {
      setSyncState("loading")
      setSyncError(null)

      try {
        // 1. Ensure User Profile exists (Principles: Auth != Entitlement)
        const profile = await ensureUserProfile(user.id, user.primaryEmailAddress?.emailAddress || "", user.fullName || "")
        setUserProfile(profile)

        // 2. Fetch User Entitlements and Runtime Status
        const services = await getUserServices(user.id)
        setUserServices(services)

        // 3. Sync Legacy Contact (Keep for compatibility until fully migrated)
        const response = await fetch("/api/contacts/me")
        if (response.ok) {
          const payload = (await response.json()) as { contact: SyncedContact }
          setSupabaseContact(payload.contact)
        }

        // 4. Fetch Tenant (Legacy) - Only if Supabase is configured
        let tenantData = null
        if (supabase) {
          const { data, error } = await supabase
            .from("tenants")
            .select("*")
            .eq("clerk_user_id", user.id)
            .single()
          
          if (error && error.code !== 'PGRST116') { // PGRST116 = not found, which is OK
            console.warn("Tenant fetch error:", error)
          }
          tenantData = data
        }

        if (!isMounted) return
        setTenant(tenantData)
        setSyncState("success")
      } catch (error: any) {
        console.error("Dashboard sync error:", error)
        if (isMounted) {
          setSyncState("error")
          setSyncError(error.message || "Error al sincronizar dashboard")
        }
      }
    }

    syncData()

    return () => {
      isMounted = false
    }
  }, [isLoaded, user])

  // Fetch integration stats from external API
  useEffect(() => {
    const fetchStats = async () => {
      setStatsLoading(true)
      try {
        const res = await fetch('/api/integrations/stats')
        if (res.ok) {
          const data = await res.json()
          setIntegrationStats(data)
        }
      } catch (error) {
        console.error('Error fetching integration stats:', error)
      } finally {
        setStatsLoading(false)
      }
    }

    fetchStats()
  }, [])

  const contactProfile = user
    ? {
      id: user.id,
      name: user.fullName || user.username || user.primaryEmailAddress?.emailAddress || "Usuario sin nombre",
      email: user.primaryEmailAddress?.emailAddress || "Sin correo registrado",
      phone: user.primaryPhoneNumber?.phoneNumber || "Sin teléfono",
      lastAccess: formatDateTime(user.lastSignInAt),
      createdAt: formatDateTime(user.createdAt),
      imageUrl: user.imageUrl,
      emailStatus: user.primaryEmailAddress?.verification?.status === "verified" ? "verified" : "pending",
    }
    : null;

  const contactDetails = contactProfile
    ? [
      { label: "Último acceso", value: contactProfile.lastAccess },
      { label: "Creado el", value: contactProfile.createdAt },
      { label: "ID Usuario", value: contactProfile.id },
      { label: "Teléfono", value: contactProfile.phone },
    ]
    : [];

  // Restore logic
  const supabaseDetails = supabaseContact
    ? [
      { label: "RUT Persona", value: supabaseContact.rut_persona || "No registrado" },
      { label: "RUT Empresa", value: supabaseContact.rut_empresa || "No registrado" },
      { label: "Estado CRM", value: supabaseContact.status || "Sin estado" },
      { label: "Fuente", value: supabaseContact.source || "Desconocida" },
      { label: "Notificaciones", value: supabaseContact.was_notified ? "Enviadas" : "Pendiente" },
      {
        label: "Actualizado en Supabase",
        value: formatDateTime(supabaseContact.updated_at ? new Date(supabaseContact.updated_at) : null),
      },
    ]
    : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-yellow-50/40 text-foreground">
      <header className="border-b border-amber-200/50 bg-white/70 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-md">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">SmarterOS</h1>
              <p className="text-xs text-amber-700/70">Automatización WhatsApp + IA</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="flex items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              <Activity className="h-3 w-3" /> Online
            </Badge>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9 border-2 border-amber-300 shadow-sm",
                }
              }}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Error Banner - Supabase not configured */}
        {!isSupabaseConfigured && (
          <div className="mb-8 p-6 rounded-2xl bg-red-500/10 border-2 border-red-500/30 text-red-900">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20">
                <Shield className="h-5 w-5 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Configuración Requerida</h3>
                <p className="text-sm mt-1">
                  Las variables de entorno de Supabase no están configuradas. Para usar el dashboard necesitas:
                </p>
                <ul className="mt-3 space-y-1 text-sm">
                  <li>• <code className="bg-red-100 px-2 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_URL</code></li>
                  <li>• <code className="bg-red-100 px-2 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code></li>
                </ul>
                <p className="mt-3 text-xs text-red-700">
                  Mientras tanto, solo se mostrarán datos de demostración.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Banner - Sync Error */}
        {syncState === 'error' && syncError && (
          <div className="mb-8 p-4 rounded-2xl bg-red-500/10 border-2 border-red-500/20 text-red-900 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-red-600" />
              <div>
                <p className="font-bold text-sm">Error de Sincronización</p>
                <p className="text-xs text-red-700">{syncError}</p>
              </div>
            </div>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => {
                setSyncState("idle")
                setSyncError(null)
              }}
              className="border-red-300 text-red-700 hover:bg-red-50"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Reintentar
            </Button>
          </div>
        )}

        {userProfile && !userProfile.onboarding_completed && (
          <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/20 text-amber-900 flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top duration-500">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-amber-600" />
              <div>
                <p className="font-black text-sm uppercase tracking-tight">Onboarding Incompleto</p>
                <p className="text-xs text-amber-700 font-medium">Faltan servicios por provisionar. Tu dashboard no estará completo hasta habilitar tu RUT.</p>
              </div>
            </div>
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white font-black text-[10px] rounded-xl uppercase px-4" asChild>
              <a href="/onboarding">Completar ahora</a>
            </Button>
          </div>
        )}
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {statsLoading ? (
            // Loading skeletons
            [1, 2, 3, 4].map((i) => (
              <Card key={i} className="border border-amber-200/60 bg-white/80 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-8 rounded-lg" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-20 mb-2" />
                  <Skeleton className="h-3 w-16" />
                </CardContent>
              </Card>
            ))
          ) : integrationStats ? (
            // Real stats from API
            [
              { 
                title: "Productos MELI", 
                value: integrationStats.integrations?.meli_products?.toLocaleString() || "0", 
                delta: "Catálogo activo",
                icon: Database 
              },
              { 
                title: "Órdenes Procesadas", 
                value: integrationStats.integrations?.orders_processed?.toLocaleString() || "0", 
                delta: "Este mes",
                icon: Zap 
              },
              { 
                title: "Webhooks Recibidos", 
                value: integrationStats.integrations?.webhooks_received?.toLocaleString() || "0", 
                delta: "+12% vs mes anterior",
                icon: Activity 
              },
              { 
                title: "API Calls Hoy", 
                value: integrationStats.integrations?.api_calls_today?.toLocaleString() || "0", 
                delta: "Tiempo real",
                icon: BarChart3 
              },
            ].map(({ title, value, delta, icon: Icon }) => (
              <Card key={title} className="border border-amber-200/60 bg-white/80 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-100 to-orange-100">
                    <Icon className="h-4 w-4 text-amber-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{value}</div>
                  <p className="text-xs text-amber-600/80">{delta}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            // Fallback stats
            overviewStats.map(({ title, value, delta, icon: Icon }) => (
              <Card key={title} className="border border-amber-200/60 bg-white/80 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-100 to-orange-100">
                    <Icon className="h-4 w-4 text-amber-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{value}</div>
                  <p className="text-xs text-amber-600/80">{delta}</p>
                </CardContent>
              </Card>
            ))
          )}
        </section>

        {/* Integration Health Status */}
        {!statsLoading && integrationStats && (
          <section className="mt-8">
            <Card className="border border-amber-200/60 bg-white/80 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-amber-600" />
                  Estado de Integraciones
                </CardTitle>
                <CardDescription>Monitoreo en tiempo real de servicios externos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {[
                    { name: 'API SmarterOS', key: 'api', url: '/v1/hub/health' },
                    { name: 'Mercado Libre', key: 'meli', url: '/v1/hub/meli/health' },
                    { name: 'Odoo ERP', key: 'odoo', url: null },
                    { name: 'N8N Workflows', key: 'n8n', url: null },
                  ].map((service) => (
                    <div
                      key={service.key}
                      className="flex items-center justify-between rounded-lg border border-amber-100 bg-white p-3"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            integrationStats.health?.[service.key]
                              ? 'bg-green-500'
                              : 'bg-gray-300'
                          }`}
                        />
                        <span className="text-sm font-medium text-gray-700">{service.name}</span>
                      </div>
                      {integrationStats.health?.[service.key] ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                          Activo
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                          --
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                  <span>UF: ${integrationStats.currency?.uf_value?.toLocaleString() || 'N/A'}</span>
                  <span>Catálogo: {integrationStats.catalog?.total_items || 0} productos</span>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        <section className="mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
            <div className="sm:hidden">
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger className="w-full rounded-2xl border border-border bg-secondary text-left text-sm font-semibold">
                  <SelectValue placeholder="Selecciona una sección" />
                </SelectTrigger>
                <SelectContent align="start" className="min-w-[220px] rounded-xl border border-border bg-card shadow-lg">
                  {tabItems.map(({ value, label, icon: Icon }) => (
                    <SelectItem key={value} value={value} className="text-sm">
                      <span className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        {label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <TabsList className="hidden w-full grid-cols-2 gap-2 rounded-2xl border border-border bg-secondary p-1 sm:grid sm:grid-cols-3 lg:grid-cols-6">
              {tabItems.map(({ value, label, icon: Icon }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-transparent text-sm font-semibold text-muted-foreground transition data-[state=active]:border-border data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="overview" className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card className="border border-border bg-card shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-foreground">Actividad reciente</CardTitle>
                    <CardDescription className="text-muted-foreground">Últimas interacciones con contactos</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-lg border border-border bg-secondary p-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                          <MessageSquare className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Mensaje enviado a +56 9 1234 5678</p>
                          <p className="text-xs text-muted-foreground">Hace 2 minutos</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border border-border bg-card shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-foreground">Mis servicios</CardTitle>
                    <CardDescription className="text-muted-foreground">Estado y habilitación de tu consola</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {userServices.length > 0 ? (
                      userServices.map((service) => {
                        const Icon = ({
                          whatsapp: MessageSquare,
                          odoo: Database,
                          smarterchat: Bot,
                          sms: Zap
                        } as any)[service.service_code] || Shield

                        const label = ({
                          whatsapp: "WhatsApp API",
                          odoo: "Tienda Odoo",
                          smarterchat: "SmarterChat AI",
                          sms: "Marketing SMS"
                        } as any)[service.service_code] || service.service_code

                        return (
                          <div key={service.service_code} className="flex items-center justify-between rounded-lg border border-border bg-secondary p-3">
                            <div className="flex items-center gap-3">
                              <Icon className={`h-5 w-5 ${service.enabled ? 'text-amber-500' : 'text-slate-300'}`} />
                              <div className="flex flex-col">
                                <span className={`text-sm ${service.enabled ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                                  {label}
                                </span>
                                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">
                                  Plan {service.plan}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {!service.enabled ? (
                                <Badge variant="outline" className="border-slate-200 bg-slate-50 text-slate-400 font-bold">
                                  No habilitado
                                </Badge>
                              ) : (
                                <Badge
                                  variant="outline"
                                  className={service.status === 'ok'
                                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 font-bold"
                                    : service.status === 'provisioning'
                                      ? "border-amber-500/30 bg-amber-500/10 text-amber-600 font-bold"
                                      : "border-red-500/30 bg-red-500/10 text-red-600 font-bold"
                                  }
                                >
                                  {service.status === 'ok' ? 'Activo' : service.status === 'provisioning' ? 'Configurando' : 'Error'}
                                </Badge>
                              )}
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <div className="text-center py-4 text-sm text-muted-foreground italic">
                        {syncState === 'loading' ? 'Cargando servicios...' : 'No hay servicios habilitados'}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="messages" className="space-y-6 sm:space-y-8">
              <ChatwootWidget />
            </TabsContent>

            <TabsContent value="contacts" className="space-y-6 sm:space-y-8">
              <Card className="border border-border bg-card shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-foreground">Gestión de contactos</CardTitle>
                      <CardDescription className="text-muted-foreground">Administra tu base de contactos</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button className="inline-flex items-center gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                        <Plus className="h-4 w-4" /> Nuevo contacto
                      </Button>
                      <Button variant="outline" className="border border-border text-foreground hover:bg-secondary">
                        <Upload className="h-4 w-4" /> Importar
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 flex items-center gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Buscar contactos..."
                        className="pl-10 border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    <Button variant="outline" className="border border-border text-foreground hover:bg-secondary">
                      <Filter className="h-4 w-4" /> Filtros
                    </Button>
                  </div>
                  {!isLoaded ? (
                    <div className="rounded-xl border border-border bg-secondary/70 p-6">
                      <div className="space-y-4">
                        <Skeleton className="h-8 w-1/3 bg-muted" />
                        <Skeleton className="h-4 w-1/2 bg-muted" />
                        <Skeleton className="h-24 w-full bg-muted" />
                      </div>
                    </div>
                  ) : contactProfile ? (
                    <div className="space-y-6">
                      <div className="flex flex-col gap-4 rounded-xl border border-border bg-secondary/70 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-14 w-14 border border-border">
                            <AvatarImage src={contactProfile.imageUrl} alt={contactProfile.name} />
                            <AvatarFallback className="text-sm font-semibold text-foreground">
                              {getInitials(contactProfile.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                              Contacto autenticado
                            </p>
                            <p className="text-lg font-semibold text-foreground">{contactProfile.name}</p>
                            <p className="text-sm text-muted-foreground">{contactProfile.email}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="border-accent/30 bg-accent/10 text-accent">
                            Fuente: Supabase
                          </Badge>
                          <Badge
                            variant="outline"
                            className={
                              contactProfile.emailStatus === "verified"
                                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
                                : "border-amber-500/30 bg-amber-500/10 text-amber-600"
                            }
                          >
                            Email {contactProfile.emailStatus === "verified" ? "verificado" : "pendiente"}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={
                              syncState === "success"
                                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
                                : syncState === "error"
                                  ? "border-destructive/30 bg-destructive/10 text-destructive"
                                  : "border-accent/30 bg-accent/10 text-accent"
                            }
                          >
                            {syncState === "loading" && (
                              <RefreshCw className="mr-1 h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                            )}
                            {syncState === "success"
                              ? "Sincronizado con Supabase"
                              : syncState === "error"
                                ? "Error al sincronizar"
                                : "Sincronizando..."}
                          </Badge>
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        {[...contactDetails, ...supabaseDetails].map(({ label, value }) => (
                          <div key={label} className="rounded-xl border border-border bg-card/70 p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
                            <p className="mt-1 text-sm font-medium text-foreground break-words">{value}</p>
                          </div>
                        ))}
                      </div>
                      {syncError ? (
                        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                          {syncError}
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-border bg-secondary py-12 text-center">
                      <Users className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        No pudimos recuperar los datos del usuario autenticado
                      </p>
                      <p className="mb-4 text-xs text-muted-foreground">Verifica tu sesión de Supabase para continuar</p>
                      <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Actualizar sesión</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subscriptions" className="space-y-6 sm:space-y-8">
              <SubscriptionsView />
            </TabsContent>

            <TabsContent value="automation" className="space-y-6 sm:space-y-8">
              <Card className="border border-border bg-card shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-foreground">Automatizaciones</CardTitle>
                      <CardDescription className="text-muted-foreground">Configura flujos automáticos</CardDescription>
                    </div>
                    <Button className="inline-flex items-center gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                      <Plus className="h-4 w-4" /> Nueva automatización
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-xl border border-border bg-secondary py-12 text-center">
                    <Zap className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">No hay automatizaciones configuradas</p>
                    <p className="mb-4 text-xs text-muted-foreground">Crea tu primera automatización para WhatsApp</p>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Crear automatización</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="qr" className="space-y-6 sm:space-y-8">
              <Card className="border border-border bg-card shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-foreground">Códigos QR</CardTitle>
                      <CardDescription className="text-muted-foreground">Genera códigos QR para WhatsApp</CardDescription>
                    </div>
                    <Button className="inline-flex items-center gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                      <Plus className="h-4 w-4" /> Generar QR
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-xl border border-border bg-secondary py-12 text-center">
                    <QrCode className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">No hay códigos QR generados</p>
                    <p className="mb-4 text-xs text-muted-foreground">Crea códigos QR para facilitar el contacto</p>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Generar primer QR</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api" className="space-y-6 sm:space-y-8">
              <Card className="border border-border bg-card shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-foreground">API Keys</CardTitle>
                      <CardDescription className="text-muted-foreground">Gestiona tus claves de API</CardDescription>
                    </div>
                    <Button className="inline-flex items-center gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                      <Plus className="h-4 w-4" /> Nueva API Key
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="whatsapp-api" className="text-xs font-medium text-muted-foreground">
                        WhatsApp Business API
                      </Label>
                      <Input
                        id="whatsapp-api"
                        placeholder="Ingresa tu API key"
                        className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    <div>
                      <Label htmlFor="openai-api" className="text-xs font-medium text-muted-foreground">
                        OpenAI API Key
                      </Label>
                      <Input
                        id="openai-api"
                        placeholder="Ingresa tu API key"
                        className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Guardar configuración</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6 sm:space-y-8">
              <Card className="border border-border bg-card shadow-sm">
                <CardHeader>
                  <CardTitle className="text-foreground">Configuración general</CardTitle>
                  <CardDescription className="text-muted-foreground">Personaliza tu experiencia</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="business-name">Nombre del negocio</Label>
                      <Input id="business-name" placeholder="Tu empresa SA" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="webhook-url">URL de Webhook</Label>
                      <Input id="webhook-url" placeholder="https://miempresa.com/webhook" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Zona horaria</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tu zona horaria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gmt-4">GMT-4 (America/Santiago)</SelectItem>
                          <SelectItem value="gmt-3">GMT-3 (America/Buenos Aires)</SelectItem>
                          <SelectItem value="gmt-5">GMT-5 (America/Lima)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Guardar cambios</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div >
  )
}