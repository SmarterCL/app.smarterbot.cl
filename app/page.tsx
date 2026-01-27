import Image from "next/image"
import Link from "next/link"
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
    <div className={`space-y-3 ${className}`}>
      <div className="space-y-3">
        <Link
          href="/auth/sign-in"
          className="block w-full rounded-xl border border-border bg-white px-4 py-3 text-center text-sm font-semibold text-foreground shadow-sm transition hover:bg-accent hover:text-accent-foreground"
        >
          Iniciar sesión
        </Link>
        <Link
          href="/auth/sign-up"
          className="block w-full rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
        >
          Crear cuenta
        </Link>
      </div>
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
      <p className="text-sm font-semibold uppercase tracking-[0.4em] text-muted-foreground">
        Chatwoot • N8N • Odoo • Botpress • Tienda
      </p>
      <p className="text-lg text-muted-foreground">
        Impulsa tus ventas y operaciones desde una sola plataforma integrada.
      </p>
    </div>
  )
}

function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-3xl bg-white shadow-2xl shadow-primary/10 ${className}`}
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

export default function Home() {

  return (
    <div className="relative z-0 flex min-h-screen flex-col bg-white text-foreground">
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:gap-10 sm:px-6 sm:py-10 lg:gap-8 lg:px-0 lg:py-12">
        <section className="grid gap-8 lg:grid-cols-[1.05fr_minmax(0,0.95fr)] lg:items-center">
          <div className="space-y-6 lg:pr-6">
            <HeroContent />
            <HeroIllustration className="h-[16rem] w-full lg:h-[22rem]" />
          </div>
          <LoginSection className="lg:ml-auto lg:max-w-md" />
        </section>
      </main>
    </div>
  )
}
