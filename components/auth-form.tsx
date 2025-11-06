"use client"

import { useState } from "react"

import { SignInButton, SignUpButton } from "@clerk/nextjs"
import { Chrome, ArrowRight, Sun, Moon, ShieldCheck, type LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type ThemeOption = "theme-light" | "theme-bw"

const STORAGE_KEY = "smarteros-theme"
const THEME_OPTIONS: Array<{ value: ThemeOption; label: string; icon: LucideIcon }> = [
  { value: "theme-light", label: "Luz", icon: Sun },
  { value: "theme-bw", label: "Noche", icon: Moon },
]

function readInitialTheme(): ThemeOption {
  if (typeof window === "undefined") {
    return "theme-light"
  }

  const root = document.documentElement
  const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeOption | null

  if (stored && (stored === "theme-light" || stored === "theme-bw")) {
    return stored
  }

  const fromDataset = root.dataset.theme as ThemeOption | undefined
  if (fromDataset && (fromDataset === "theme-light" || fromDataset === "theme-bw")) {
    return fromDataset
  }

  return root.classList.contains("theme-bw") ? "theme-bw" : "theme-light"
}

function updateRootTheme(theme: ThemeOption) {
  if (typeof document === "undefined") {
    return
  }

  const root = document.documentElement
  root.classList.remove("theme-light", "theme-bw")
  root.classList.add(theme)
  root.dataset.theme = theme
}

function ThemeIconSelector({
  value,
  onChange,
}: {
  value: ThemeOption
  onChange: (value: ThemeOption) => void
}) {
  return (
    <div
      role="group"
      aria-label="Selector de tema"
      className="grid grid-cols-2 gap-2 rounded-full border border-border/60 bg-secondary/70 p-1 text-xs"
    >
      {THEME_OPTIONS.map(({ value: optionValue, label, icon: Icon }) => {
        const isActive = value === optionValue
        return (
          <button
            key={optionValue}
            type="button"
            onClick={() => onChange(optionValue)}
            aria-pressed={isActive}
            className={cn(
              "group flex items-center justify-center gap-2 rounded-full px-3 py-2 font-semibold uppercase tracking-[0.2em] transition",
              isActive ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className={cn("h-4 w-4 transition-transform", isActive ? "scale-110" : "opacity-70")} />
            <span>{label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default function AuthForm() {
  const [theme, setTheme] = useState<ThemeOption>(() => (typeof window !== "undefined" ? readInitialTheme() : "theme-light"))

  const handleThemeChange = (nextTheme: ThemeOption) => {
    setTheme(nextTheme)
    updateRootTheme(nextTheme)

    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, nextTheme)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-6 rounded-3xl border border-border/70 bg-background/90 p-6 shadow-lg backdrop-blur">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2 text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Crea tu cuenta</p>
            <h2 className="text-2xl font-semibold text-foreground">¡Bienvenido/a, estamos listos! 👋</h2>
            <p className="text-sm text-muted-foreground">
              ¡Completa los siguientes datos para comenzar a automatizar tu negocio con SmarterOS!
            </p>
          </div>
          <ThemeIconSelector value={theme} onChange={handleThemeChange} />
        </div>

        <div className="space-y-5">
          <SignInButton mode="modal">
            <Button
              variant="outline"
              className="group flex h-12 w-full items-center justify-center gap-3 border-border bg-secondary text-foreground transition-colors duration-300 hover:bg-secondary/80"
            >
              <Chrome className="h-5 w-5 text-accent transition-transform group-hover:scale-110" />
              Continuar con Google
              <ArrowRight className="ml-auto h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
            </Button>
          </SignInButton>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full bg-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="rounded-full border border-border bg-background px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                o
              </span>
            </div>
          </div>

          <form className="space-y-4">
            <div className="space-y-2 text-left">
              <Label htmlFor="login-email">Correo electrónico</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="nombre@empresa.com"
                defaultValue="mainkeystore@gmail.com"
                autoComplete="email"
              />
            </div>
            <div className="space-y-2 text-left">
              <Label htmlFor="login-password">Contraseña</Label>
              <Input
                id="login-password"
                type="password"
                defaultValue="•••••••••••••"
                autoComplete="current-password"
                className="tracking-[0.35em]"
              />
              <p className="text-xs font-medium text-emerald-500">
                Tu contraseña cumple con todos los requisitos necesarios.
              </p>
            </div>
            <SignUpButton mode="modal">
              <Button className="group flex h-12 w-full items-center justify-center gap-2 bg-accent text-accent-foreground transition-transform duration-300 hover:-translate-y-0.5 hover:bg-accent/90">
                Crear cuenta
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </SignUpButton>
          </form>

          <div className="space-y-3 text-center text-xs text-muted-foreground">
            <p>
              ¿Ya tienes una cuenta?
              {" "}
              <SignInButton mode="modal">
                <span className="cursor-pointer font-semibold text-foreground underline-offset-2 hover:underline">
                  Iniciar sesión
                </span>
              </SignInButton>
            </p>
            <p className="flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              Protegido por Development mode
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
