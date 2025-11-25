"use client"

import { SignInButton, SignUpButton } from "@clerk/nextjs"
import { ArrowRight, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function AuthCard() {
  return (
    <div className="space-y-4 rounded-3xl border border-border/70 bg-white/95 p-4 shadow-lg sm:p-5">
      <div className="space-y-2 text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Accede a tu cuenta</p>
        <h2 className="text-xl font-semibold text-foreground">SmarterOS</h2>
        <p className="text-sm text-muted-foreground">Autenticado por Clerk</p>
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <SignInButton mode="modal">
            <Button variant="outline" type="button" className="group h-10 w-full">
              Iniciar sesión
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button type="button" className="group h-10 w-full">
              Crear cuenta
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </SignUpButton>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full bg-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="rounded-full border border-border bg-background px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              seguro
            </span>
          </div>
        </div>

        <p className="flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-emerald-500" /> Clerk
        </p>
      </div>
    </div>
  )
}
