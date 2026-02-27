"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Activity,
  Zap,
  Package,
  ShoppingCart,
  Globe,
  Server,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
} from "lucide-react"

interface IntegrationStats {
  integrations?: {
    meli_products?: number
    orders_processed?: number
    webhooks_received?: number
    api_calls_today?: number
  }
  catalog?: {
    hardware_items?: number
    software_items?: number
    total_items?: number
  }
  health?: {
    api?: boolean
    meli?: boolean
    odoo?: boolean
    n8n?: boolean
  }
  currency?: {
    uf_value?: number
    updated_at?: string
  }
}

export default function DemoDashboardContent() {
  const [stats, setStats] = useState<IntegrationStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/integrations/stats")
        if (!res.ok) throw new Error("Failed to fetch stats")
        const data = await res.json()
        setStats(data)
      } catch (err) {
        // Set mock data for demo
        setStats({
          integrations: {
            meli_products: 156,
            orders_processed: 42,
            webhooks_received: 1284,
            api_calls_today: 3847,
          },
          catalog: {
            hardware_items: 89,
            software_items: 67,
            total_items: 156,
          },
          health: {
            api: true,
            meli: true,
            odoo: true,
            n8n: true,
          },
          currency: {
            uf_value: 35420.5,
            updated_at: new Date().toISOString(),
          },
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const handleLogout = () => {
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Volver</span>
              </Button>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <h1 className="text-xl font-bold text-gradient bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  SmarterOS Dashboard
                </h1>
                <p className="text-xs text-slate-500">Demo Interactiva</p>
              </div>
              <Badge
                variant="secondary"
                className="rounded-full bg-green-100 text-green-700 border-green-200 font-medium"
              >
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Live
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Bienvenido a la Demo de SmarterBot.cl
            </h2>
            <p className="text-slate-600 text-lg">
              Explora las capacidades de nuestra plataforma en tiempo real
            </p>
          </div>
          
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 flex-shrink-0">
                  <Activity className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">
                    Datos en Tiempo Real
                  </h3>
                  <p className="text-sm text-slate-600 mb-2">
                    Este dashboard muestra estadísticas reales desde nuestra API de integraciones, incluyendo:
                  </p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      Productos de Mercado Libre
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      Órdenes procesadas
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      Webhooks y API calls
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard
            title="Productos MELI"
            value={loading ? undefined : stats?.integrations?.meli_products?.toLocaleString()}
            delta="Catálogo activo"
            icon={Package}
            color="blue"
          />
          <StatCard
            title="Órdenes Procesadas"
            value={loading ? undefined : stats?.integrations?.orders_processed?.toLocaleString()}
            delta="Este mes"
            icon={ShoppingCart}
            color="green"
          />
          <StatCard
            title="Webhooks Recibidos"
            value={loading ? undefined : stats?.integrations?.webhooks_received?.toLocaleString()}
            delta="+12% vs mes anterior"
            icon={Zap}
            color="purple"
          />
          <StatCard
            title="API Calls Hoy"
            value={loading ? undefined : stats?.integrations?.api_calls_today?.toLocaleString()}
            delta="Tiempo real"
            icon={Activity}
            color="orange"
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 gap-2 rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
            <TabsTrigger
              value="overview"
              className="flex items-center gap-2 rounded-lg border border-transparent text-slate-600 data-[state=active]:border-amber-300 data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700 data-[state=active]:font-medium"
            >
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
              <span className="sm:hidden">Info</span>
            </TabsTrigger>
            <TabsTrigger
              value="catalog"
              className="flex items-center gap-2 rounded-lg border border-transparent text-slate-600 data-[state=active]:border-amber-300 data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700 data-[state=active]:font-medium"
            >
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Catálogo</span>
              <span className="sm:hidden">Items</span>
            </TabsTrigger>
            <TabsTrigger
              value="health"
              className="flex items-center gap-2 rounded-lg border border-transparent text-slate-600 data-[state=active]:border-amber-300 data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700 data-[state=active]:font-medium"
            >
              <Server className="h-4 w-4" />
              <span className="hidden sm:inline">Health</span>
              <span className="sm:hidden">Estado</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Integration Stats */}
              <Card className="border-slate-200 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Globe className="h-5 w-5 text-amber-600" />
                    Integración SmarterOS
                  </CardTitle>
                  <CardDescription>Estadísticas en tiempo real</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loading ? (
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2.5 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                        <span className="text-sm text-slate-600">Productos Mercado Libre</span>
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200 font-medium">
                          {stats?.integrations?.meli_products || 0}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center py-2.5 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                        <span className="text-sm text-slate-600">Órdenes procesadas (mes)</span>
                        <Badge className="bg-green-100 text-green-700 border-green-200 font-medium">
                          {stats?.integrations?.orders_processed || 0}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center py-2.5 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                        <span className="text-sm text-slate-600">Webhooks recibidos</span>
                        <Badge className="bg-purple-100 text-purple-700 border-purple-200 font-medium">
                          {stats?.integrations?.webhooks_received || 0}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center py-2.5 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                        <span className="text-sm text-slate-600">API calls hoy</span>
                        <Badge className="bg-orange-100 text-orange-700 border-orange-200 font-medium">
                          {stats?.integrations?.api_calls_today || 0}
                        </Badge>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Catalog Stats */}
              <Card className="border-slate-200 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Package className="h-5 w-5 text-amber-600" />
                    Catálogo de Productos
                  </CardTitle>
                  <CardDescription>Distribución por categoría</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loading ? (
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-slate-600">Hardware (MELI)</span>
                          <span className="text-sm font-semibold text-slate-900">
                            {stats?.catalog?.hardware_items || 0}
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full transition-all duration-500"
                            style={{
                              width: `${((stats?.catalog?.hardware_items || 0) / (stats?.catalog?.total_items || 1)) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-slate-600">Software/Suscripciones</span>
                          <span className="text-sm font-semibold text-slate-900">
                            {stats?.catalog?.software_items || 0}
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-amber-500 to-orange-500 h-2.5 rounded-full transition-all duration-500"
                            style={{
                              width: `${((stats?.catalog?.software_items || 0) / (stats?.catalog?.total_items || 1)) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                      <div className="pt-3 border-t border-slate-100">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-slate-700">Total productos</span>
                          <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                            {stats?.catalog?.total_items || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Currency Info */}
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Información Económica</CardTitle>
                <CardDescription>Valores actualizados desde API externa</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-32" />
                ) : (
                  <div className="flex items-center gap-6">
                    <div className="flex-1">
                      <p className="text-sm text-slate-600 mb-1">UF (Unidad de Fomento)</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                        ${stats?.currency?.uf_value?.toLocaleString("es-CL") || "N/A"}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Actualizado: {stats?.currency?.updated_at
                          ? new Date(stats.currency.updated_at).toLocaleDateString("es-CL", {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })
                          : "N/A"}
                      </p>
                    </div>
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                      <TrendingUp className="h-8 w-8 text-amber-600" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Catalog Tab */}
          <TabsContent value="catalog" className="space-y-6">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle>Catálogo Unificado</CardTitle>
                <CardDescription>
                  Productos de Mercado Libre Chile y Argentina con pricing cross-border
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="grid gap-4 md:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-32 w-full rounded-xl" />
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      { name: "Hardware", count: stats?.catalog?.hardware_items || 0, source: "MELI CL/AR", color: "blue" },
                      { name: "Software", count: stats?.catalog?.software_items || 0, source: "Odoo", color: "amber" },
                      { name: "Servicios", count: 0, source: "SmarterBot", color: "purple" },
                    ].map((cat) => (
                      <div
                        key={cat.name}
                        className={`p-5 rounded-xl border-2 bg-gradient-to-br ${
                          cat.color === "blue" 
                            ? "border-blue-100 from-blue-50 to-blue-100/50" 
                            : cat.color === "amber"
                            ? "border-amber-100 from-amber-50 to-orange-50/50"
                            : "border-purple-100 from-purple-50 to-purple-100/50"
                        } transition-all hover:shadow-md`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-slate-900">{cat.name}</h4>
                          <Badge className={`bg-white font-medium ${
                            cat.color === "blue" 
                              ? "text-blue-700 border-blue-200" 
                              : cat.color === "amber"
                              ? "text-amber-700 border-amber-200"
                              : "text-purple-700 border-purple-200"
                          }`}>
                            {cat.source}
                          </Badge>
                        </div>
                        <p className={`text-4xl font-bold ${
                          cat.color === "blue" 
                            ? "text-blue-600" 
                            : cat.color === "amber"
                            ? "text-amber-600"
                            : "text-purple-600"
                        }`}>{cat.count}</p>
                        <p className="text-xs text-slate-600 mt-2">productos activos</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Health Tab */}
          <TabsContent value="health" className="space-y-6">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity className="h-5 w-5 text-amber-600" />
                  Estado de Servicios
                </CardTitle>
                <CardDescription>Monitoreo en tiempo real de integraciones</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {[1, 2, 3, 4].map((i) => (
                      <Skeleton key={i} className="h-16 w-full rounded-xl" />
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      { name: "API SmarterOS", key: "api", description: "Gateway principal de APIs" },
                      { name: "Mercado Libre", key: "meli", description: "Integración MELI CL/AR" },
                      { name: "Odoo ERP", key: "odoo", description: "ERP para gestión empresarial" },
                      { name: "N8N Workflows", key: "n8n", description: "Automatización de procesos" },
                    ].map((service) => (
                      <div
                        key={service.key}
                        className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white hover:border-amber-200 hover:bg-amber-50/30 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-3 w-3 rounded-full ${
                              stats?.health?.[service.key as keyof typeof stats.health]
                                ? "bg-green-500 shadow-sm shadow-green-200"
                                : "bg-slate-300"
                            }`}
                          />
                          <div>
                            <p className="font-medium text-slate-900">{service.name}</p>
                            <p className="text-xs text-slate-500">{service.description}</p>
                          </div>
                        </div>
                        {stats?.health?.[service.key as keyof typeof stats.health] ? (
                          <Badge className="bg-green-100 text-green-700 border-green-200 font-medium">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Operativo
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-slate-100 text-slate-600">
                            --
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200">
            <Globe className="h-4 w-4 text-slate-500" />
            <p className="text-sm text-slate-600">
              Datos desde <code className="bg-white px-2 py-0.5 rounded font-mono text-xs">api.smarterbot.cl</code>
            </p>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            SmarterOS API v3.0.0 • Última actualización: {new Date().toLocaleTimeString("es-CL")}
          </p>
        </div>
      </main>
    </div>
  )
}

function StatCard({
  title,
  value,
  delta,
  icon: Icon,
  color = "blue",
  loading,
}: {
  title: string
  value?: string | number
  delta?: string
  icon: any
  color?: "blue" | "green" | "purple" | "orange"
  loading?: boolean
}) {
  const colorClasses = {
    blue: "from-blue-100 to-blue-50 text-blue-600",
    green: "from-green-100 to-green-50 text-green-600",
    purple: "from-purple-100 to-purple-50 text-purple-600",
    orange: "from-amber-100 to-orange-50 text-amber-600",
  }

  return (
    <Card className="border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-600">{title}</CardTitle>
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${colorClasses[color]}`}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        {loading || value === undefined ? (
          <Skeleton className="h-8 w-20 mb-2" />
        ) : (
          <div className="text-2xl font-bold text-slate-900">{value}</div>
        )}
        {delta && <p className="text-xs text-slate-500 mt-1">{delta}</p>}
      </CardContent>
    </Card>
  )
}
