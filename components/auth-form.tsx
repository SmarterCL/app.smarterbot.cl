"use client"

import { SignInButton, SignUpButton } from "@clerk/nextjs"
import { Chrome, ArrowRight, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AuthForm() {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-emerald-100 bg-white/95 p-6 shadow-[0_40px_120px_-60px_rgba(16,185,129,0.8)] backdrop-blur">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
        <div className="absolute -top-10 left-6 h-36 w-36 rounded-full bg-emerald-200 blur-[80px]" />
        <div className="absolute bottom-0 right-0 h-28 w-28 rounded-full bg-emerald-100 blur-[70px]" />
      </div>

      <div className="relative space-y-6 text-left">
        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-emerald-500">Acceso seguro</p>
          <h2 className="text-3xl font-semibold leading-snug text-emerald-900">Automatiza tu WhatsApp con estilo.</h2>
          <p className="text-sm text-emerald-800/80">
            Conecta tu cuenta y mantén tus flujos vivos con una experiencia delicada, sin ruido y sin scroll innecesario.
          </p>
        </div>

        <SignInButton mode="modal">
          <Button
            type="button"
            className="group flex h-12 w-full items-center gap-3 rounded-[20px] border border-emerald-100 bg-emerald-500/10 text-emerald-900 shadow-none transition-colors hover:bg-emerald-500/20"
          >
            <Chrome className="h-5 w-5 text-emerald-500 transition-transform group-hover:scale-110" />
            <span className="flex-1 text-center text-sm font-semibold tracking-wide">Continuar con Google</span>
            <ArrowRight className="h-4 w-4 text-emerald-500 transition-transform group-hover:translate-x-1" />
          </Button>
        </SignInButton>

        <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-400">
          <span className="h-px flex-1 bg-emerald-100" />
          <span>o con correo</span>
          <span className="h-px flex-1 bg-emerald-100" />
        </div>

        <form className="space-y-4">
          <div className="space-y-2 text-left">
            <Label htmlFor="login-email" className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
              Correo electrónico
            </Label>
            <Input
              id="login-email"
              type="email"
              placeholder="nombre@empresa.com"
              autoComplete="email"
              className="h-12 rounded-2xl border border-emerald-100 bg-white/80 px-4 text-sm text-emerald-900 placeholder:text-emerald-300 focus-visible:ring-emerald-200"
            />
          </div>
          <div className="space-y-2 text-left">
            <Label htmlFor="login-password" className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
              Contraseña
            </Label>
            <Input
              id="login-password"
              type="password"
              autoComplete="current-password"
              className="h-12 rounded-2xl border border-emerald-100 bg-white/80 px-4 text-sm tracking-[0.35em] text-emerald-900 placeholder:text-emerald-300 focus-visible:ring-emerald-200"
            />
            <p className="text-xs font-medium text-emerald-600">Nunca compartimos estos datos con terceros.</p>
          </div>
          <SignUpButton mode="modal">
            <Button
              type="button"
              className="group flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 text-white shadow-[0_20px_50px_-24px_rgba(16,185,129,1)] transition-transform hover:-translate-y-0.5"
            >
              Crear cuenta
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </SignUpButton>
        </form>

        <div className="space-y-3 rounded-2xl border border-emerald-50 bg-emerald-50/80 p-4 text-center text-xs text-emerald-700">
          <p>
            ¿Ya tienes una cuenta?
            {" "}
            <SignInButton mode="modal">
              <span className="cursor-pointer font-semibold underline-offset-2 hover:underline">Iniciar sesión</span>
            </SignInButton>
          </p>
          <div className="space-y-2 rounded-xl border border-emerald-100/70 bg-white/80 p-3 text-left text-[11px] leading-relaxed text-emerald-700">
            <p className="flex items-center gap-2 font-semibold uppercase tracking-[0.3em] text-emerald-500">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              Protegido por Smarter SPA Chile
            </p>
            <p className="text-emerald-800">
              Las instancias “Clerk Development & Staging” autorizadas para <strong>SmarterCL</strong> necesitan validar tu identidad.
            </p>
            <ul className="list-disc space-y-1 pl-4 text-emerald-700/80">
              <li>Lectura de todo tu perfil de usuario.</li>
              <li>Acceso de solo lectura a tus correos corporativos.</li>
            </ul>
            <p className="text-[10px] text-emerald-600">
              Al autorizar serás redirigido a <span className="font-mono text-[10px]">https://clerk.shared.lcl.dev</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
