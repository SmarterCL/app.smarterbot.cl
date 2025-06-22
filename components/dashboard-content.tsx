"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserButton } from "@clerk/nextjs"
import {
  Bot,
  MessageSquare,
  Users,
  Key,
  QrCode,
  BarChart3,
  Settings,
  Plus,
  Search,
  Filter,
  Upload,
  Zap,
  Shield,
  Database,
  Activity,
} from "lucide-react"

export default function DashboardContent() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fillOpacity=&quot;0.1&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">SmarterBot Dashboard</h1>
                  <p className="text-xs text-purple-300">Automatización WhatsApp + IA</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  <Activity className="h-3 w-3 mr-1" />
                  Online
                </Badge>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10",
                      userButtonPopoverCard: "bg-slate-800 border-slate-700",
                      userButtonPopoverActionButton: "text-white hover:bg-slate-700",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/10 backdrop-blur-xl border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Mensajes Enviados</CardTitle>
                <MessageSquare className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">2,847</div>
                <p className="text-xs text-green-400">+12% desde ayer</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-xl border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Contactos Activos</CardTitle>
                <Users className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">1,234</div>
                <p className="text-xs text-green-400">+5% desde ayer</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-xl border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Automatizaciones</CardTitle>
                <Zap className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">12</div>
                <p className="text-xs text-purple-400">3 activas</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-xl border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Tasa de Respuesta</CardTitle>
                <BarChart3 className="h-4 w-4 text-pink-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">89.2%</div>
                <p className="text-xs text-green-400">+2.1% desde ayer</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 bg-white/10 backdrop-blur-xl border-white/20">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-white text-slate-300"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="contacts"
                className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-white text-slate-300"
              >
                <Users className="h-4 w-4 mr-2" />
                Contactos
              </TabsTrigger>
              <TabsTrigger
                value="automation"
                className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-white text-slate-300"
              >
                <Zap className="h-4 w-4 mr-2" />
                Automatización
              </TabsTrigger>
              <TabsTrigger
                value="qr"
                className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-white text-slate-300"
              >
                <QrCode className="h-4 w-4 mr-2" />
                QR Codes
              </TabsTrigger>
              <TabsTrigger
                value="api"
                className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-white text-slate-300"
              >
                <Key className="h-4 w-4 mr-2" />
                API Keys
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-white text-slate-300"
              >
                <Settings className="h-4 w-4 mr-2" />
                Configuración
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">Actividad Reciente</CardTitle>
                    <CardDescription className="text-slate-300">Últimas interacciones con contactos</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <MessageSquare className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium">Mensaje enviado a +56 9 1234 5678</p>
                          <p className="text-xs text-slate-400">Hace 2 minutos</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">Estado del Sistema</CardTitle>
                    <CardDescription className="text-slate-300">Monitoreo en tiempo real</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <div className="flex items-center space-x-3">
                        <Shield className="h-5 w-5 text-green-400" />
                        <span className="text-white">WhatsApp API</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Conectado</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <div className="flex items-center space-x-3">
                        <Database className="h-5 w-5 text-blue-400" />
                        <span className="text-white">Base de Datos</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Operativa</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <div className="flex items-center space-x-3">
                        <Bot className="h-5 w-5 text-purple-400" />
                        <span className="text-white">IA Assistant</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Activo</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="contacts" className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">Gestión de Contactos</CardTitle>
                      <CardDescription className="text-slate-300">Administra tu base de contactos</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Nuevo Contacto
                      </Button>
                      <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <Upload className="h-4 w-4 mr-2" />
                        Importar
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Buscar contactos..."
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                      />
                    </div>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtros
                    </Button>
                  </div>
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-300">No hay contactos registrados</p>
                    <p className="text-sm text-slate-400 mb-4">Comienza agregando tu primer contacto</p>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      Agregar Contacto
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="automation" className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">Automatizaciones</CardTitle>
                      <CardDescription className="text-slate-300">Configura flujos automáticos</CardDescription>
                    </div>
                    <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Nueva Automatización
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Zap className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-300">No hay automatizaciones configuradas</p>
                    <p className="text-sm text-slate-400 mb-4">Crea tu primera automatización para WhatsApp</p>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      Crear Automatización
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="qr" className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">Códigos QR</CardTitle>
                      <CardDescription className="text-slate-300">Genera códigos QR para WhatsApp</CardDescription>
                    </div>
                    <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Generar QR
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <QrCode className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-300">No hay códigos QR generados</p>
                    <p className="text-sm text-slate-400 mb-4">Crea códigos QR para facilitar el contacto</p>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      Generar Primer QR
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api" className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">API Keys</CardTitle>
                      <CardDescription className="text-slate-300">Gestiona tus claves de API</CardDescription>
                    </div>
                    <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Nueva API Key
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="whatsapp-api" className="text-white">
                          WhatsApp Business API
                        </Label>
                        <Input
                          id="whatsapp-api"
                          placeholder="Ingresa tu API key"
                          className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="openai-api" className="text-white">
                          OpenAI API Key
                        </Label>
                        <Input
                          id="openai-api"
                          placeholder="Ingresa tu API key"
                          className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      Guardar Configuración
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Configuración General</CardTitle>
                  <CardDescription className="text-slate-300">Personaliza tu experiencia</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="business-name" className="text-white">
                        Nombre del Negocio
                      </Label>
                      <Input
                        id="business-name"
                        placeholder="Mi Empresa"
                        className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="webhook-url" className="text-white">
                        Webhook URL
                      </Label>
                      <Input
                        id="webhook-url"
                        placeholder="https://mi-webhook.com/endpoint"
                        className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                      />
                    </div>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Guardar Cambios</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
