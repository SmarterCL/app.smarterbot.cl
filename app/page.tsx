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
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary">
            <Bot className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">SmarterOS Hub</p>
            <p className="text-xs text-muted-foreground">Automatización comercial con IA</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <HeaderBadge label={badgeLabel} />
          <Button asChild variant="outline" className="border border-border text-sm">
            <Link href="https://app.smarterbot.cl" target="_blank" rel="noopener noreferrer">
              ACCESO
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

function FeatureGrid() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {featureCards.map(({ icon: Icon, title, description }) => (
        <div key={title} className="flex items-center gap-3 rounded-xl border border-border bg-secondary p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-accent">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{title}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function StatGrid() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {statCards.map((stat) => (
        <div key={stat.label} className="rounded-xl border border-border bg-secondary p-4 text-center">
          <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
          <p className="text-xs text-muted-foreground">{stat.label}</p>
        </div>
      ))}
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
      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16 sm:px-6">
        <section className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <HeroContent />

          <div className="space-y-8 lg:pl-8">
            <Card className="border border-border bg-card shadow-xl">
              <CardContent className="space-y-8 p-8">
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
              </CardContent>
            </Card>
            <StatGrid />
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
