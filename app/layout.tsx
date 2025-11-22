import type React from "react"
import { ClerkProvider, type ClerkProviderProps } from "@clerk/nextjs"
import { esES } from "@clerk/localizations"
import Script from "next/script"
import { Onest } from "next/font/google"

import "./globals.css"

const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
})

const baseBodyClass = `${onest.variable} font-sans antialiased`

const themeInitScript = `
;(function () {
  var STORAGE_KEY = 'smarteros-theme';
  var THEMES = ['theme-light', 'theme-bw'];
  try {
    var root = document.documentElement;
    var stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && THEMES.indexOf(stored) !== -1) {
      THEMES.forEach(function (name) {
        root.classList.remove(name);
      });
      root.classList.add(stored);
      root.dataset.theme = stored;
      return;
    }
    if (!root.classList.contains('theme-light')) {
      root.classList.add('theme-light');
    }
    root.dataset.theme = 'theme-light';
  } catch (error) {
    if (root && !root.dataset.theme) {
      root.dataset.theme = 'theme-light';
    }
  }
})();
`

export const metadata = {
  title: "SmarterOS Hub",
  description: "Gestión de automatizaciones y datos para SmarterOS",
  generator: "v0.dev",
}

const localization = {
  ...esES,
  unstable__errors: {
    ...esES.unstable__errors,
    form_identifier_exists__email_address:
      "El correo electrónico asociado a esta cuenta OAuth ya está vinculado a otro usuario. Inicia sesión con ese perfil o conecta un correo distinto.",
    form_password_pwned:
      "Esta contraseña ha sido comprometida en una filtración de datos y no se puede usar. Por favor, elige otra.",
    form_username_invalid_character:
      "El nombre de usuario contiene caracteres no válidos.",
    form_param_format_invalid:
      "Formato inválido. Por favor, revisa los datos ingresados.",
    form_identifier_not_found:
      "No se encontró ninguna cuenta con este correo electrónico.",
    form_password_incorrect:
      "Contraseña incorrecta. Por favor, inténtalo de nuevo.",
    clerk_js_error:
      "Error de autenticación. Por favor, recarga la página.",
  },
  signIn: {
    ...esES.signIn,
    start: {
      title: "Iniciar sesión",
      subtitle: "para continuar a {{applicationName}}",
      actionText: "¿No tienes una cuenta?",
      actionLink: "Regístrate",
    },
    password: {
      title: "Ingresa tu contraseña",
      subtitle: "para continuar a {{applicationName}}",
      actionLink: "Usar otro método",
    },
  },
  signUp: {
    ...esES.signUp,
    start: {
      title: "Crear cuenta",
      subtitle: "para continuar a {{applicationName}}",
      actionText: "¿Ya tienes una cuenta?",
      actionLink: "Inicia sesión",
    },
  },
}

const clerkAppearance: ClerkProviderProps["appearance"] = {
  layout: {
    socialButtonsVariant: "blockButton",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let isDemoMode = false
  let hasValidClerkConfig = false

  try {
    isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true"
    const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    const secretKey = process.env.CLERK_SECRET_KEY

    const hasPublishableKey = Boolean(publishableKey && publishableKey.startsWith("pk_") && publishableKey.length > 10)
    const hasSecretKey = Boolean(secretKey && secretKey.startsWith("sk_") && secretKey.length > 10)

    hasValidClerkConfig = hasPublishableKey && hasSecretKey
  } catch (error) {
    console.warn("Environment variable check failed", error)
    isDemoMode = true
  }

  const htmlAttributes = {
    lang: "es",
    className: "theme-light",
    "data-theme": "theme-light",
    suppressHydrationWarning: true as const,
  }

  const errorScreen = (
    <html {...htmlAttributes}>
      <body className={baseBodyClass}>
        <Script id="smarteros-theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <div className="flex min-h-screen items-center justify-center bg-secondary/40 p-6">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div className="space-y-6 text-center">
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-destructive/40 bg-destructive/10 text-destructive">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M7.938 4h8.124c1.54 0 2.502 1.667 1.732 2.5L13.732 16.5c-.77.833-1.964.833-2.732 0L6.206 6.5C5.436 5.667 6.398 4 7.938 4z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h1 className="text-lg font-semibold text-foreground">Configuración requerida</h1>
                <p className="text-sm text-muted-foreground">
                  Configura tus variables de entorno para continuar utilizando SmarterOS Hub.
                </p>
              </div>
              <div className="space-y-3 text-left text-sm text-muted-foreground">
                <div className="rounded-xl border border-border bg-secondary p-4">
                  <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">Variables necesarias</h2>
                  <ul className="space-y-1">
                    <li>• NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</li>
                    <li>• CLERK_SECRET_KEY</li>
                    <li>• NEXT_PUBLIC_SUPABASE_URL</li>
                    <li>• NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-border bg-secondary p-4">
                  <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">Opciones rápidas</h2>
                  <ol className="space-y-1 list-decimal pl-4">
                    <li>Activa el modo demo con <code className="font-mono text-xs">NEXT_PUBLIC_DEMO_MODE=true</code>.</li>
                    <li>Configura tus claves reales de Clerk.</li>
                    <li>Reinicia el servidor de desarrollo.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )

  if (isDemoMode) {
    return (
      <html {...htmlAttributes}>
        <body className={baseBodyClass}>
          <Script id="smarteros-theme-init" strategy="beforeInteractive">
            {themeInitScript}
          </Script>
          {children}
        </body>
      </html>
    )
  }

  if (!hasValidClerkConfig) {
    return errorScreen
  }

  return (
    <ClerkProvider localization={localization} appearance={clerkAppearance}>
      <html {...htmlAttributes}>
        <body className={baseBodyClass}>
          <Script id="smarteros-theme-init" strategy="beforeInteractive">
            {themeInitScript}
          </Script>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
