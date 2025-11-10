import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { Bot } from "lucide-react"

import DemoModeToggle from "@/components/demo-mode-toggle"
import AuthChecker from "@/components/auth-checker"
import { Badge } from "@/components/ui/badge"

export const dynamic = "force-dynamic"

function HeaderBadge({ label }: { label: string }) {
  return (
    <Badge className="flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
      {label}
    </Badge>
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
    <div className="space-y-4 text-muted-foreground">
      <HeaderBadge label="WhatsApp + IA" />
      <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground lg:text-5xl">
        Automatiza tu negocio con WhatsApp + IA
      </h1>
      <p className="text-lg text-muted-foreground">
        Impulsa tus ventas y operaciones desde una sola plataforma integrada.
      </p>
    </div>
  )
}

function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-3xl border border-border/60 bg-secondary shadow-2xl shadow-primary/10 ${className}`}
    >
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
  )
}

function SiteHeader() {
  return (
    <header className="hidden bg-background/90 shadow-sm backdrop-blur lg:block">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-0">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">WhatsApp + IA</p>
            <p className="text-base font-semibold text-foreground">SmarterOS Hub</p>
          </div>
        </div>
        <div className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <a href="#" className="transition-colors hover:text-foreground">
            Producto
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            Recursos
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            Soporte
          </a>
        </div>
      </div>
    </header>
  )
}

function SiteFooter() {
  return (
    <footer className="hidden bg-background/95 px-4 py-8 text-sm text-muted-foreground shadow-inner sm:px-6 lg:block lg:px-0">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
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
    <div className="relative z-0 flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-10 sm:gap-14 sm:px-6 sm:py-14 lg:justify-center lg:gap-0 lg:px-0 lg:py-0">
        <section className="hidden h-full lg:grid lg:grid-cols-[1.1fr_minmax(0,0.9fr)] lg:items-stretch lg:gap-14">
          <HeroIllustration className="h-full min-h-[32rem]" />
          <div className="flex h-full flex-col justify-center gap-10 lg:pr-10">
            <div className="w-full max-w-lg space-y-10">
              <HeroContent />
              <LoginSection />
            </div>
          </div>
        </section>
        <section className="lg:hidden">
          <LoginSection />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
