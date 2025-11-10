import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Bot, CheckCircle, Database, Shield, Zap } from "lucide-react"

import DemoModeToggle from "@/components/demo-mode-toggle"
import AuthChecker from "@/components/auth-checker"
import { Badge } from "@/components/ui/badge"

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

function LoginSection({ className = "" }: { className?: string }) {
  return (
    <div className={`space-y-4 ${className}`}>
      <Suspense
        fallback={
          <div className="flex justify-center py-6">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-transparent" />
          </div>
        }
      >
        <AuthChecker />
      </Suspense>
      <div className="hidden sm:block">
        <LoginSupportPanel />
      </div>
    </div>
  )
}

function HeroContent() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Automatiza tu negocio con WhatsApp + IA
        </h1>
        <p className="hidden max-w-xl text-lg text-muted-foreground sm:block">
          Gestiona contactos, API keys y comunicaciones desde un hub centralizado alimentado por la infraestructura de
          SmarterOS.
        </p>
      </div>

      <div className="hidden sm:block">
        <FeatureGrid />
      </div>

      <div className="hidden gap-4 sm:flex sm:flex-row sm:items-center">
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

function HeroIllustration() {
  return (
    <div className="hidden lg:flex">
      <div className="relative w-full overflow-hidden rounded-3xl border border-border/60 bg-secondary shadow-2xl shadow-primary/10">
        <Image
          src="/santi.png"
          alt="Automatización con SmarterOS"
          width={1024}
          height={1024}
          priority
          sizes="(min-width: 1024px) 520px, 100vw"
          className="h-full w-full object-cover object-center"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
      </div>
    </div>
  )
}

export default function Home() {
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true"

  if (isDemoMode) {
    return (
      <div className="min-h-screen bg-background text-foreground">
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
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:gap-14 sm:px-6 sm:py-14 lg:gap-16 lg:py-16">
        <section className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.05fr_minmax(0,1fr)] lg:gap-12">
          <div className="space-y-8">
            <HeroContent />
            <LoginSection className="lg:hidden" />
          </div>

          <div className="hidden flex-col space-y-6 lg:flex lg:pl-8">
            <HeroIllustration />
            <LoginSection />
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
