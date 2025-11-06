import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight, Bot, CheckCircle, Database, Shield, Zap } from "lucide-react"

import DemoModeToggle from "@/components/demo-mode-toggle"
import AuthChecker from "@/components/auth-checker"
import ThemeToggle from "@/components/theme-toggle"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

const featureCards = [
  { icon: Zap, title: "Automatización", description: "Flujos inteligentes" },
  { icon: Shield, title: "Seguridad", description: "Datos protegidos" },
  { icon: Database, title: "Base de datos", description: "CRUD completo" },
  { icon: CheckCircle, title: "Tiempo real", description: "Sincronización" },
]

const statCards = [
  { value: "500+", label: "Empresas" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Soporte" },
]

function HeaderBadge({ label }: { label: string }) {
  return (
    <Badge className="flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
      {label}
    </Badge>
  )
}

function Header({ badgeLabel }: { badgeLabel: string }) {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 py-3 sm:h-16 sm:py-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-foreground">SmarterOS Hub</p>
              <p className="text-xs text-muted-foreground">Automatización comercial con IA</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            <div className="hidden sm:block">
              <HeaderBadge label={badgeLabel} />
            </div>
            <Button
              asChild
              className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:from-emerald-500 hover:via-emerald-600 hover:to-emerald-700 hover:shadow lg:px-6 lg:text-sm"
            >
              <Link href="https://wa.me/56979540471" target="_blank" rel="noopener noreferrer">
                CHAT
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2 pb-3 sm:hidden">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">SmarterOS Hub</p>
            <p className="text-xs text-muted-foreground">Automatización comercial con IA</p>
          </div>
          <div className="flex">
            <HeaderBadge label={badgeLabel} />
          </div>
        </div>
      </div>
    </header>
  )
}

function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {featureCards.map(({ icon: Icon, title, description }) => (
        <div
          key={title}
          className="flex items-center gap-3 rounded-2xl border border-border/60 bg-gradient-to-br from-background via-secondary/80 to-secondary p-4 transition-shadow hover:shadow-lg"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/10 bg-accent/10 text-accent">
            <Icon className="h-5 w-5" strokeWidth={2} />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground/90">{title}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function StatGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {statCards.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-border/60 bg-gradient-to-br from-secondary via-background to-secondary p-4 text-center shadow-sm"
        >
          <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
          <p className="text-xs text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}

function LoginSupportPanel({ className = "", linkClassName = "" }: { className?: string; linkClassName?: string }) {
  return (
    <div
      className={`rounded-2xl border border-dashed border-emerald-400/40 bg-emerald-500/10 p-4 text-left sm:flex sm:items-center sm:justify-between sm:gap-6 ${className}`}
    >
      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">¿Necesitas ayuda con tu login?</p>
        <p className="text-xs text-muted-foreground">Nuestro equipo te guía paso a paso desde WhatsApp.</p>
      </div>
      <Link
        href="https://wa.me/56979540471?text=Hola%20SmarterOS%2C%20necesito%20ayuda%20con%20mi%20inicio%20de%20sesión."
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-3 inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-emerald-600 sm:mt-0 sm:w-auto ${linkClassName}`}
      >
        Abrir chat
      </Link>
    </div>
  )
}

function MobileHero() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-b from-primary/10 via-background to-background p-6 shadow-lg sm:p-8">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
        <div className="absolute -left-24 top-6 h-32 w-32 rounded-full bg-emerald-400 blur-3xl" />
        <div className="absolute -right-20 bottom-8 h-40 w-40 rounded-full bg-primary/60 blur-3xl" />
      </div>
      <div className="space-y-6 text-center">
        <HeaderBadge label="Automatización con IA" />
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Tu asistente inteligente para WhatsApp
          </h1>
          <p className="text-sm text-muted-foreground">
            Responde clientes, gestiona leads y automatiza procesos sin salir de tu teléfono.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Link
            href="https://wa.me/56979540471"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-md transition hover:shadow-lg"
          >
            Hablar por WhatsApp
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <Card className="border border-border/50 bg-background/95 shadow-xl">
          <CardContent className="space-y-6 p-5">
            <div className="space-y-1 text-left">
              <h2 className="text-xl font-semibold text-foreground">Accede a tu cuenta</h2>
              <p className="text-xs text-muted-foreground">
                Inicia sesión con tu correo corporativo y continúa donde quedaste.
              </p>
            </div>
            <Suspense
              fallback={
                <div className="flex justify-center py-4">
                  <div className="h-7 w-7 animate-spin rounded-full border-2 border-border border-t-transparent" />
                </div>
              }
            >
              <AuthChecker />
            </Suspense>
            <p className="text-center text-xs text-muted-foreground">
              ¿Prefieres abrirlo directo?
              {" "}
              <Link
                href="https://app.smarterbot.cl"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-emerald-600 underline-offset-2 hover:underline"
              >
                Ir al dashboard
              </Link>
            </p>
            <LoginSupportPanel className="bg-emerald-500/5" />
          </CardContent>
        </Card>
        <div className="-mx-2 flex snap-x gap-3 overflow-x-auto pb-2">
          {featureCards.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="min-w-[200px] snap-center rounded-2xl border border-border/40 bg-secondary/70 p-4 text-left shadow-sm"
            >
              <Icon className="mb-3 h-5 w-5 text-accent" />
              <p className="text-sm font-semibold text-foreground/90">{title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {statCards.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border/50 bg-background/80 p-3 shadow-sm">
              <p className="text-lg font-semibold text-foreground">{stat.value}</p>
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function HeroContent() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <HeaderBadge label="Automatización con IA" />
        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Automatiza tu negocio con WhatsApp + IA
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Gestiona contactos, API keys y comunicaciones desde un hub centralizado alimentado por la infraestructura de
          SmarterOS.
        </p>
      </div>

      <FeatureGrid />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Link
          href="https://app.smarterbot.cl"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-base font-semibold text-accent-foreground transition-transform duration-300 hover:-translate-y-0.5 hover:bg-accent/90"
        >
          Automatizar mi tarea ahora
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <div className="text-sm text-muted-foreground">
          <p>✨ Sin tarjeta de crédito</p>
          <p>⚡ Configuración en 2 minutos</p>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true"

  if (isDemoMode) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header badgeLabel="Demo Mode" />
        <main className="mx-auto flex max-w-4xl flex-col gap-12 px-4 py-16 sm:px-6">
          <section className="space-y-8 text-center">
            <div className="space-y-4">
              <HeaderBadge label="Acceso libre" />
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Explora SmarterOS sin configuración
              </h1>
              <p className="text-lg text-muted-foreground">
                Prueba la experiencia completa antes de conectar tus credenciales reales.
              </p>
            </div>
            <DemoModeToggle />
          </section>
        </main>
      </div>
    )
  }

  return (
    <div className="relative z-0 min-h-screen bg-background text-foreground">
      <Header badgeLabel="Versión 2.0" />
      <main className="mx-auto flex max-w-6xl flex-col gap-14 px-4 py-14 sm:px-6 lg:gap-16 lg:py-16">
        <section className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.05fr_minmax(0,1fr)] lg:gap-12">
          <div className="lg:hidden">
            <MobileHero />
          </div>
          <div className="hidden lg:block">
            <HeroContent />
          </div>

          <div className="hidden space-y-8 lg:block lg:pl-8">
            <Card className="border border-border bg-card/80 backdrop-blur-sm shadow-xl">
              <CardContent className="space-y-8 p-6 sm:p-8">
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl font-semibold text-foreground">Accede a tu dashboard</h2>
                  <p className="text-sm text-muted-foreground">Inicia sesión con tu cuenta SmarterOS.</p>
                </div>
                <Suspense
                  fallback={
                    <div className="flex justify-center py-6">
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-transparent" />
                    </div>
                  }
                >
                  <AuthChecker />
                </Suspense>
                <LoginSupportPanel />
              </CardContent>
            </Card>
            <div className="hidden lg:block">
              <StatGrid />
            </div>
          </div>
        </section>

        <footer className="border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-secondary">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <span className="font-semibold text-foreground">SmarterOS Hub</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="transition-colors hover:text-foreground">
                Términos
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                Privacidad
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                Soporte
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
