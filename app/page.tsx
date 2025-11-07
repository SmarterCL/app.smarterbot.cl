import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight, Bot, CheckCircle, Database, Shield, Zap } from "lucide-react"

import DemoModeToggle from "@/components/demo-mode-toggle"
import AuthChecker from "@/components/auth-checker"
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

function HeaderBadge({ label }: { label: string }) {
  return (
    <Badge className="flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
      {label}
    </Badge>
  )
}

function Header() {
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
            </div>
          </div>
          <div className="flex flex-col gap-3 text-left sm:flex-row sm:items-center sm:gap-4">
            <div className="flex flex-col rounded-2xl border border-accent/30 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-4 py-3 text-white shadow-sm">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">¿Necesitas ayuda con tu login?</span>
              <span className="text-xs font-medium text-white/80">Nuestro equipo te guía paso a paso desde WhatsApp</span>
            </div>
            <Button asChild className="px-6 text-sm font-semibold">
              <Link href="https://wa.me/56979540471" target="_blank" rel="noopener noreferrer">
                Abrir chat
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2 pb-3 sm:hidden">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">SmarterOS Hub</p>
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

function MobileHero() {
  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] flex-col justify-center overflow-hidden rounded-[42px] border border-emerald-100/70 bg-gradient-to-b from-white via-emerald-50 to-white p-6 shadow-[0_60px_160px_-80px_rgba(16,185,129,0.75)] sm:p-8">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute -left-14 top-6 h-48 w-48 rounded-full bg-emerald-200 blur-[120px]" />
        <div className="absolute right-0 bottom-4 h-40 w-40 rounded-full bg-emerald-100 blur-[110px]" />
      </div>
      <div className="space-y-4 text-center">
        <p className="text-[12px] font-semibold uppercase tracking-[0.45em] text-emerald-500">Smarter Login</p>
        <h1 className="text-3xl font-semibold tracking-tight text-emerald-950 sm:text-4xl">
          Tu asistente inteligente para WhatsApp
        </h1>
        <p className="text-sm text-emerald-800/80">
          Responde clientes, gestiona leads y automatiza procesos desde un panel delicado, sin scroll innecesario.
        </p>
      </div>
      <div className="mt-4 flex flex-col gap-3">
        <Link
          href="https://wa.me/56979540471"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-emerald-100 bg-white/90 text-sm font-semibold text-emerald-700 shadow-inner shadow-white/60 transition hover:border-emerald-200"
        >
          Hablar por WhatsApp
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-6 rounded-[36px] border border-emerald-100 bg-white/95 p-4 shadow-[0_40px_120px_-70px_rgba(16,185,129,0.85)]">
        <div className="space-y-1 text-left">
          <h2 className="text-xl font-semibold text-emerald-900">Accede a tu cuenta</h2>
          <p className="text-xs text-emerald-700/70">
            Inicia sesión con tu correo corporativo y continúa donde quedaste.
          </p>
        </div>
        <div className="mt-4">
          <Suspense
            fallback={
              <div className="flex justify-center py-6">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-200 border-t-transparent" />
              </div>
            }
          >
            <AuthChecker />
          </Suspense>
        </div>
        <p className="pt-4 text-center text-xs text-emerald-600">
          ¿Prefieres abrirlo directo?
          {" "}
          <Link
            href="https://app.smarterbot.cl"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-emerald-700 underline-offset-2 hover:underline"
          >
            Ir al dashboard
          </Link>
        </p>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 text-left">
        {featureCards.slice(0, 2).map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-3xl border border-emerald-100/70 bg-white/80 px-4 py-3 text-emerald-900 shadow-inner shadow-emerald-100"
          >
            <Icon className="mb-2 h-5 w-5 text-emerald-500" />
            <p className="text-sm font-semibold">{title}</p>
            <p className="text-xs text-emerald-700/80">{description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function HeroContent() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
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
        <Header />
        <main className="mx-auto flex max-w-4xl flex-col gap-10 px-4 py-10 sm:gap-12 sm:px-6 sm:py-16">
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
      <Header />
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:gap-14 sm:px-6 sm:py-14 lg:gap-16 lg:py-16">
        <section className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.05fr_minmax(0,1fr)] lg:gap-12">
          <div className="lg:hidden">
            <MobileHero />
          </div>
          <div className="hidden lg:block">
            <HeroContent />
          </div>

          <div className="hidden lg:block lg:pl-8">
            <Card className="border border-border bg-card/80 backdrop-blur-sm shadow-xl">
              <CardContent className="p-5 sm:p-8">
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
