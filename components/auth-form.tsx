"use client"

import { SignInButton, SignUpButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Chrome, Mail, ArrowRight } from "lucide-react"

export default function AuthForm() {
  return (
    <div className="space-y-6">
      {/* Google Sign In */}
      <SignInButton mode="modal">
        <Button
          variant="outline"
          className="w-full h-12 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 group"
        >
          <Chrome className="mr-3 h-5 w-5 text-blue-400 group-hover:scale-110 transition-transform" />
          Continuar con Google
          <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </Button>
      </SignInButton>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full bg-white/20" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-transparent px-2 text-slate-400">o continúa con email</span>
        </div>
      </div>

      {/* Email Sign In */}
      <SignInButton mode="modal">
        <Button
          variant="outline"
          className="w-full h-12 bg-white/5 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 group"
        >
          <Mail className="mr-3 h-5 w-5 text-white group-hover:scale-110 transition-transform" />
          Iniciar Sesión
          <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </Button>
      </SignInButton>

      {/* Sign Up */}
      <SignUpButton mode="modal">
        <Button className="w-full h-12 bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
          Crear Cuenta Gratis
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </SignUpButton>

      <p className="text-xs text-center text-slate-400 leading-relaxed">
        Al continuar, aceptas nuestros{" "}
        <a href="#" className="text-white underline decoration-white/40 hover:decoration-white">
          Términos de Servicio
        </a>{" "}
        y{" "}
        <a href="#" className="text-white underline decoration-white/40 hover:decoration-white">
          Política de Privacidad
        </a>
      </p>
    </div>
  )
}
