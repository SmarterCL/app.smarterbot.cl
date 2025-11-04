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
          className="group flex h-12 w-full items-center justify-center gap-3 border-border bg-secondary text-foreground transition-colors duration-300 hover:bg-secondary/80"
        >
          <Chrome className="h-5 w-5 text-accent transition-transform group-hover:scale-110" />
          Continuar con Google
          <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </Button>
      </SignInButton>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full bg-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-xs font-medium tracking-[0.25em] text-muted-foreground">
            o continúa con email
          </span>
        </div>
      </div>

      {/* Email Sign In */}
      <SignInButton mode="modal">
        <Button
          variant="outline"
          className="group flex h-12 w-full items-center justify-center gap-3 border-border bg-secondary text-foreground transition-colors duration-300 hover:bg-secondary/80"
        >
          <Mail className="h-5 w-5 text-accent transition-transform group-hover:scale-110" />
          Iniciar Sesión
          <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </Button>
      </SignInButton>

      {/* Sign Up */}
      <SignUpButton mode="modal">
        <Button className="flex h-12 w-full items-center justify-center gap-2 bg-accent text-accent-foreground transition-transform duration-300 hover:translate-y-[-1px] hover:bg-accent/90">
          Crear Cuenta Gratis
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </SignUpButton>

      <p className="text-xs text-center text-muted-foreground leading-relaxed">
        Al continuar, aceptas nuestros{" "}
        <a href="#" className="text-accent underline decoration-accent/40 hover:decoration-accent">
          Términos de Servicio
        </a>{" "}
        y{" "}
        <a href="#" className="text-accent underline decoration-accent/40 hover:decoration-accent">
          Política de Privacidad
        </a>
      </p>
    </div>
  )
}
