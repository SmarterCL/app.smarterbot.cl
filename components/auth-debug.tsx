"use client"
import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Calendar, Shield } from "lucide-react"

export default function AuthDebug() {
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return (
      <Card className="bg-white/10 backdrop-blur-xl border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-400"></div>
            <p className="text-white">Cargando información del usuario...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!user) {
    return (
      <Card className="bg-red-500/10 backdrop-blur-xl border-red-500/20">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6 text-red-400" />
            <p className="text-red-300">No hay usuario autenticado</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-emerald-500/10 backdrop-blur-xl border-emerald-500/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-white">
          <Shield className="h-5 w-5 text-emerald-400" />
          <span>Sesión Activa</span>
          <Badge className="bg-emerald-500/20 text-emerald-200 border-emerald-500/30">Autenticado</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
            <User className="h-5 w-5 text-cyan-400" />
            <div>
              <p className="text-sm text-slate-400">Nombre completo</p>
              <p className="font-semibold text-white">{user.fullName || "No disponible"}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
            <Mail className="h-5 w-5 text-sky-400" />
            <div>
              <p className="text-sm text-slate-400">Email principal</p>
              <p className="font-semibold text-white">{user.primaryEmailAddress?.emailAddress || "No disponible"}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
            <Calendar className="h-5 w-5 text-emerald-400" />
            <div>
              <p className="text-sm text-slate-400">Último acceso</p>
              <p className="font-semibold text-white">
                {user.lastSignInAt ? new Date(user.lastSignInAt).toLocaleString("es-ES") : "Primer acceso"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
            <Shield className="h-5 w-5 text-cyan-300" />
            <div>
              <p className="text-sm text-slate-400">ID de usuario</p>
              <p className="font-mono text-xs text-white break-all">{user.id}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
