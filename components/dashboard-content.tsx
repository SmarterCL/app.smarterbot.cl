"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { createBrowserClient } from "@supabase/ssr"
import { UserButton, useUser, useClerk, useOrganization } from "@clerk/nextjs"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SubscriptionsView } from "@/components/subscriptions-view"
import { FlowBridgeStatus } from "@/components/flow-bridge-status"
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
  FileText,
  Globe,
  Cloud,
  Layers,
  Cpu,
  Terminal,
  Copy,
  Check,
} from "lucide-react"

const overviewStats = [
  { title: "Mensajes enviados", value: "2,847", delta: "+12%", icon: MessageSquare },
  { title: "Contactos activos", value: "1,234", delta: "+5%", icon: Users },
  { title: "Automatizaciones", value: "12", delta: "3 activas", icon: Zap },
  { title: "Tasa de respuesta", value: "89.2%", delta: "+2.1%", icon: BarChart3 },
]

const tabItems = [
  { value: "overview", label: "Overview", icon: BarChart3 },
  { value: "ai", label: "AI Agents", icon: Bot },
  { value: "documents", label: "DOK & RAG", icon: FileText },
  { value: "mcp", label: "MCP Cluster", icon: Shield },
  { value: "payments", label: "Pagos & Opt", icon: CreditCard },
  { value: "chile", label: "Chile Gateway", icon: Globe },
  { value: "contacts", label: "CRM Contactos", icon: Users },
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
  const { organization } = useOrganization()
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
  const [configCopied, setConfigCopied] = useState(false)

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
            <Badge className="flex items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 hidden sm:flex">
              <Activity className="h-3 w-3" /> Online
            </Badge>
            <Button
              variant="outline"
              size="sm"
              className="h-8 rounded-full border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 text-xs px-3"
              asChild
            >
              <a href="/api/logout-telegram">Salir de Telegram</a>
            </Button>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9 border-2 border-amber-300 shadow-sm",
                }
              }}
              afterSignOutUrl="/"
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

        {/* Flow Bridge Status (from flow.smarterbot.cl) */}
        <FlowBridgeStatus />

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
                          className={`h-2 w-2 rounded-full ${integrationStats.health?.[service.key]
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
            <TabsList className="hidden w-full grid-cols-2 gap-2 rounded-2xl border border-border bg-secondary p-1 sm:grid sm:grid-cols-4 lg:grid-cols-8">
              {tabItems.map(({ value, label, icon: Icon }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-transparent text-[11px] font-bold text-muted-foreground transition data-[state=active]:border-border data-[state=active]:bg-background data-[state=active]:text-foreground uppercase tracking-tight"
                >
                  <Icon className="h-3.5 w-3.5" />
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

            <TabsContent value="ai" className="space-y-6 sm:space-y-8">
              <Card className="border border-border bg-card shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-amber-500" />
                    AI Agents (SmarterOS v3.3.0)
                  </CardTitle>
                  <CardDescription>Gestión de modelos y agentes autónomos</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-xl border border-border bg-secondary p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm uppercase">Qwen Model</h4>
                      <Badge className="bg-amber-100 text-amber-700">/ai/qwen</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Modelo optimizado para razonamiento y herramientas.</p>
                    <Button size="sm" className="w-full">Probar Chat</Button>
                  </div>
                  <div className="rounded-xl border border-border bg-secondary p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm uppercase">OpenRouter Bridge</h4>
                      <Badge className="bg-blue-100 text-blue-700">/ai/openrouter</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Acceso a Claude, GPT-4 y Llama vía bridge unificado.</p>
                    <Button size="sm" variant="outline" className="w-full">Configurar Tokens</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6 sm:space-y-8">
              <Card className="border border-border bg-card shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-amber-500" />
                    DOK & RAG Architecture
                  </CardTitle>
                  <CardDescription>Procesamiento de documentos e inteligencia vectorial</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-3 rounded-lg border border-border bg-secondary text-center">
                      <Upload className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                      <span className="text-[10px] font-bold uppercase block mb-1">Upload</span>
                      <code className="text-[9px]">/v1/documents/upload</code>
                    </div>
                    <div className="p-3 rounded-lg border border-border bg-secondary text-center">
                      <Search className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                      <span className="text-[10px] font-bold uppercase block mb-1">RAG Search</span>
                      <code className="text-[9px]">/v1/rag/search</code>
                    </div>
                    <div className="p-3 rounded-lg border border-border bg-secondary text-center">
                      <Activity className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                      <span className="text-[10px] font-bold uppercase block mb-1">RAG Stats</span>
                      <code className="text-[9px]">/v1/rag/stats</code>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs">
                    <p className="text-amber-400"># Docling External Service</p>
                    <p>Docling Status: https://docling.smarterbot.store/health</p>
                    <p className="mt-2 text-blue-400"># Native RAG Query</p>
                    <p>POST /v1/rag/query {"{ 'prompt': '...' }"}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mcp" className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2 border border-border bg-card shadow-sm overflow-hidden">
                  <CardHeader className="bg-slate-900 text-white pb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-5 w-5 text-amber-500" />
                        <CardTitle className="text-white">Configuración Cliente SmarterMCP</CardTitle>
                      </div>
                      <Badge variant="outline" className="border-amber-500/50 text-amber-500 font-bold uppercase tracking-widest text-[10px]">
                        Recomendado
                      </Badge>
                    </div>
                    <CardDescription className="text-slate-400">
                      Configuración para el Picoclaw Engine. Usa este fragmento en tu cliente MCP (Cursor, Claude, VSCode) para conectar con tu nodo.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 relative bg-slate-950">
                    <button
                      onClick={() => {
                        const config = {
                          mcpServers: {
                            "clerk-auth": {
                              command: "npx",
                              args: ["-y", "@clerk/mcp-server"],
                              env: {
                                CLERK_TENANT_ID: organization?.id || "ORG_ID_PENDING",
                                CLERK_SECRET_KEY: "sk_live_..."
                              }
                            },
                            "smarteros-brain": {
                              command: "npx",
                              args: ["-y", "@smarterbot/mcp-server"],
                              env: {
                                API_URL: "https://api.smarterbot.cl",
                                API_KEY: `sk_live_${user?.id?.split('_')[1] || user?.id?.slice(-12) || "xxxxxx"}`
                              }
                            }
                          }
                        };
                        navigator.clipboard.writeText(JSON.stringify(config, null, 2));
                        setConfigCopied(true);
                        setTimeout(() => setConfigCopied(false), 2000);
                      }}
                      className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                      title="Copiar configuración"
                    >
                      {configCopied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    </button>
                    <pre className="p-6 text-[12px] font-mono text-slate-300 overflow-x-auto">
                      <code>
{`{
  "mcpServers": {
    "clerk-auth": {
      "command": "npx",
      "args": ["-y", "@clerk/mcp-server"],
      "env": {
        "CLERK_TENANT_ID": "${organization?.id || "ORG_ID_PENDING"}",
        "CLERK_SECRET_KEY": "sk_live_..."
      }
    },
    "smarteros-brain": {
      "command": "npx",
      "args": ["-y", "@smarterbot/mcp-server"],
      "env": {
        "API_URL": "https://api.smarterbot.cl",
        "API_KEY": "sk_live_${user?.id?.split('_')[1] || user?.id?.slice(-12) || "xxxxxx"}"
      }
    }
  }
}`}
                      </code>
                    </pre>
                  </CardContent>
                  <div className="bg-slate-900/50 p-4 border-t border-white/5">
                    <p className="text-[11px] text-slate-400 leading-relaxed italic">
                      Al pegar esta llave, SmarterOS aprovisiona automáticamente tu agente, wallet y canal de chat en menos de 5 segundos.
                    </p>
                  </div>
                </Card>

                <div className="space-y-6">
                  <Card className="border border-border bg-card shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-wider">
                        <Activity className="h-4 w-4 text-emerald-500" />
                        Estado del Nodo
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                        <span className="text-xs font-bold text-emerald-700 uppercase">Endpoint Externo</span>
                        <Badge variant="outline" className="bg-white border-emerald-200 text-emerald-600 text-[10px]">
                          ONLINE
                        </Badge>
                      </div>
                      <code className="block w-full text-[10px] p-2 bg-secondary rounded border border-border truncate text-muted-foreground">
                        https://os.smarterbot.cl/mcp
                      </code>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50 border border-amber-100">
                        <span className="text-xs font-bold text-amber-700 uppercase">Local Bridge</span>
                        <code className="text-[10px] text-amber-600 font-mono">127.0.0.1:8088</code>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-border bg-card shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-sm uppercase tracking-wider">Herramientas MCP</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-2">
                      <Button variant="outline" className="justify-between text-xs h-9 font-medium border-slate-200">
                        <span className="flex items-center gap-2"><Terminal className="h-3.5 w-3.5 text-slate-400" /> Listar Herramientas</span>
                        <code className="text-[10px] text-muted-foreground">/tools/list</code>
                      </Button>
                      <Button variant="outline" className="justify-between text-xs h-9 font-medium border-slate-200">
                        <span className="flex items-center gap-2"><Layers className="h-3.5 w-3.5 text-slate-400" /> Explorar Schema</span>
                        <code className="text-[10px] text-muted-foreground">/tools/schema</code>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="payments" className="space-y-6 sm:space-y-8">
              <Card className="border border-border bg-card shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-amber-500" />
                    Pagos & Optimization
                  </CardTitle>
                  <CardDescription>Orquestación de pagos y analíticas inteligentes</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-border bg-secondary">
                      <h4 className="text-xs font-bold uppercase mb-2">Payment Optimizer</h4>
                      <p className="text-[10px] text-muted-foreground mb-3">Enrutamiento dinámico según tasa de aprobación.</p>
                      <Badge variant="outline" className="text-[9px]">/v1/payments/optimize</Badge>
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-secondary">
                      <h4 className="text-xs font-bold uppercase mb-2">Khipu Gateway</h4>
                      <p className="text-[10px] text-muted-foreground mb-3">Integración nativa para transferencias CL.</p>
                      <Badge variant="outline" className="text-[9px]">/v1/payments/khipu/create</Badge>
                    </div>
                  </div>
                  <Button className="w-full bg-slate-900">Ver Analytics de Pagos</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chile" className="space-y-6 sm:space-y-8">
              <Card className="border border-border bg-card shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-amber-500" />
                    Chile Gateway Tools
                  </CardTitle>
                  <CardDescription>Servicios específicos para el mercado chileno</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col gap-4">
                    <div className="p-4 rounded-xl border border-border bg-card">
                      <div className="flex items-center gap-3 mb-2">
                        <Shield className="h-4 w-4 text-amber-600" />
                        <span className="text-sm font-bold">Validación RUT & SII</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-4">Verificación automática de identidades y datos tributarios.</p>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between text-[11px] bg-secondary p-2 rounded">
                          <code className="text-amber-700">/rut/validate/{"{rut}"}</code>
                          <Badge variant="secondary">GET</Badge>
                        </div>
                        <div className="flex items-center justify-between text-[11px] bg-secondary p-2 rounded">
                          <code className="text-amber-700">/sii/empresa/{"{rut}"}</code>
                          <Badge variant="secondary">GET</Badge>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full border-amber-200 text-amber-700 hover:bg-amber-50">
                      Onboarding de Empresa (/onboard/company)
                    </Button>
                  </div>
                </CardContent>
              </Card>
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

            <TabsContent value="settings" className="space-y-6 sm:space-y-8">
              <Card className="border border-border bg-card shadow-sm">
                <CardHeader>
                  <CardTitle className="text-foreground">Configuración general</CardTitle>
                  <CardDescription className="text-muted-foreground">Personaliza tu experiencia</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                      <Building2 className="h-4 w-4" /> Administración de Organización
                    </h3>
                    <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <Label className="text-xs text-slate-500 font-bold uppercase tracking-tight">Clerk Tenant ID / Organization ID</Label>
                      <div className="flex gap-2">
                        <Input 
                          readOnly 
                          value={organization?.id || "No detectado (Usa una Organización)"} 
                          className="bg-white font-mono text-xs" 
                        />
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => {
                            if (organization?.id) {
                              navigator.clipboard.writeText(organization.id);
                              alert("Copiado al portapapeles");
                            }
                          }}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-[10px] text-slate-400 italic">Este ID es necesario para configurar el MCP de clerk-auth.</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Ajustes del Perfil</h3>
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
                          <SelectTrigger className="rounded-xl">
                            <SelectValue placeholder="Selecciona tu zona horaria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gmt-4">GMT-4 (America/Santiago)</SelectItem>
                            <SelectItem value="gmt-3">GMT-3 (America/Buenos Aires)</SelectItem>
                            <SelectItem value="gmt-5">GMT-5 (America/Lima)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full bg-slate-900 rounded-xl h-12 font-bold shadow-lg">Guardar cambios</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  )
}