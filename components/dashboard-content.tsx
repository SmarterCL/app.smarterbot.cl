"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { UserButton, useUser } from "@clerk/nextjs"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import ChatwootWidget from "@/components/chatwoot-widget"
import { CodeVerification } from "@/components/modules/code-verification"

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
  Building,
  CreditCard,
  CheckCircle2,
} from "lucide-react"

const overviewStats = [
  { title: "Mensajes enviados", value: "2,847", delta: "+12%", icon: MessageSquare },
  { title: "Contactos activos", value: "1,234", delta: "+5%", icon: Users },
  { title: "Automatizaciones", value: "12", delta: "3 activas", icon: Zap },
  { title: "Tasa de respuesta", value: "89.2%", delta: "+2.1%", icon: BarChart3 },
]

const tabItems = [
  { value: "overview", label: "Overview", icon: BarChart3 },
  { value: "empresa", label: "Empresa", icon: Building },
  { value: "automation", label: "Automatización", icon: Zap },
  { value: "messages", label: "Mensajes", icon: MessageSquare },
  { value: "contacts", label: "Contactos", icon: Users },
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
  was_notified?: boolean | null
  created_at?: string | null
  updated_at?: string | null
}

export default function DashboardContent() {
  const { user, isLoaded } = useUser()
  const [activeTab, setActiveTab] = useState("overview")
  const [supabaseContact, setSupabaseContact] = useState<SyncedContact | null>(null)
  const [syncError, setSyncError] = useState<string | null>(null)
  const [systemStatus, setSystemStatus] = useState<any>(null)

  // Initialize Supabase client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    if (!isLoaded || !user) {
      return
    }

    let isMounted = true

    const syncContact = async () => {
      setSyncState("loading")
      setSyncError(null)

      try {
        const response = await fetch("/api/contacts/me")

        if (!response.ok) {
          const payload = await response.json().catch(() => ({}))
          throw new Error(payload?.error || "No se pudo sincronizar el contacto")
        }

        const payload = (await response.json()) as { contact: SyncedContact }

        if (!isMounted) return

        setSupabaseContact(payload.contact)
        setSyncState("success")
      } catch (error) {
        console.error("Failed to sync contact", error)
        if (!isMounted) return
        setSyncState("error")
        setSyncError(error instanceof Error ? error.message : "No se pudo sincronizar el contacto")
      }
    }

    syncContact()

    // Fetch system diagnostic
    const fetchDiagnostic = async () => {
      try {
        const res = await fetch("/api/diagnostic")
        const data = await res.json()
        if (isMounted) setSystemStatus(data)
      } catch (e) {
        console.error("Diagnostic failed", e)
      }
    }
    fetchDiagnostic()

    return () => {
      isMounted = false
    }
  }, [isLoaded, user])

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
              <h1 className="text-lg font-semibold text-gray-900">SmarterOS Dashboard</h1>
              <p className="text-xs text-amber-700/70">Automatización WhatsApp + IA</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {systemStatus?.services?.some((s: any) => s.status !== 'online') && (
              <Badge variant="destructive" className="animate-pulse flex items-center gap-1">
                <Shield className="h-3 w-3" /> Backend Offline
              </Badge>
            )}
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
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {overviewStats.map(({ title, value, delta, icon: Icon }) => (
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
          ))}
        </section>

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
                    <CardTitle className="text-foreground">Estado del sistema</CardTitle>
                    <CardDescription className="text-muted-foreground">Monitoreo en tiempo real</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { label: "WhatsApp API", icon: Shield },
                      { label: "Base de datos", icon: Database },
                      { label: "IA Assistant", icon: Bot },
                    ].map(({ label, icon: Icon }) => (
                      <div key={label} className="flex items-center justify-between rounded-lg border border-border bg-secondary p-3">
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-accent" />
                          <span className="text-sm text-foreground">{label}</span>
                        </div>
                        <Badge className="border border-accent/30 bg-accent/10 text-accent">Activo</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="empresa" className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2 border border-border bg-card shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-foreground">Suscripciones y RUTs</CardTitle>
                        <CardDescription className="text-muted-foreground">Gestiona las entidades vinculadas a tu cuenta SmarterOS</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <CodeVerification />

                    <div className="pt-6 border-t border-slate-100 space-y-4">
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Entidades Vinculadas</h3>
                      <div className="rounded-xl border border-amber-100 bg-amber-50/30 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                              <Building className="h-6 w-6 text-amber-600" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">Empresa Principal Ltda.</p>
                              <p className="text-sm text-slate-500">RUT: 76.123.456-K</p>
                            </div>
                          </div>
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Activo</Badge>
                        </div>
                        <div className="mt-4 flex gap-4 border-t border-amber-100/50 pt-3">
                          <div className="flex items-center gap-2 text-[10px] font-black uppercase text-amber-700">
                            <Shield className="h-3 w-3" /> Conexión MCP: <span className="text-emerald-600">En Línea</span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-black uppercase text-amber-700">
                            <Zap className="h-3 w-3" /> Webhook n8n: <span className="text-emerald-600">Vinculado</span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-xl border border-slate-100 bg-slate-50/30 p-4 opacity-60">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
                              <Building className="h-6 w-6 text-slate-400" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">Cupo Disponible</p>
                              <p className="text-sm text-slate-500">Sin RUT asignado</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-amber-600 font-bold">Asignar ahora</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-border bg-card shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-foreground">Acceso MCP (IA)</CardTitle>
                    <CardDescription>Control e histórico de prompts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-bold">Acceso FastAPI</Label>
                        <p className="text-[10px] text-slate-500">Permitir prompts desde n8n</p>
                      </div>
                      <Badge className="bg-amber-500 cursor-pointer">ON</Badge>
                    </div>

                    <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100">
                      <p className="text-[10px] font-bold text-blue-700 uppercase mb-1">Tu Client ID (MCP)</p>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 text-xs bg-white px-2 py-1 rounded border border-blue-200 block truncate">
                          {user?.id || 'demo_id_smarter'}
                        </code>
                        {/* El usuario puede copiar directamente el ID */}
                      </div>
                      <p className="text-[9px] text-blue-600 mt-2">Úsalo en n8n como `client_id`</p>
                    </div>

                    <div className="space-y-2 pt-2">
                      <Label className="text-[10px] font-black uppercase text-slate-400">Webhook n8n (FastAPI)</Label>
                      <div className="text-[10px] bg-slate-900 text-slate-300 p-2 rounded-lg font-mono break-all line-clamp-2">
                        POST http://localhost:8080/webhook/n8n-mcp/{"{client_id}"}/{"{flow_name}"}
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button variant="outline" className="w-full text-xs h-9 border-slate-200 text-slate-600 hover:bg-slate-50">
                        Ver guía de integración
                      </Button>
                    </div>

                    {systemStatus?.services && (
                      <div className="pt-4 border-t border-slate-100">
                        <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Estado de Servicios</p>
                        <div className="space-y-2">
                          {systemStatus.services.map((s: any) => (
                            <div key={s.name} className="flex items-center justify-between text-[10px]">
                              <span className="text-slate-500">{s.name}</span>
                              <Badge
                                variant="outline"
                                className={`text-[9px] h-4 px-1.5 ${s.status === 'online'
                                  ? 'border-emerald-200 text-emerald-600 bg-emerald-50'
                                  : 'border-red-200 text-red-600 bg-red-50'
                                  }`}
                              >
                                {s.status.toUpperCase()}
                              </Badge>
                            </div>
                          ))}
                        </div>
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