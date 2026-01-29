# Deploy estable en Vercel (SmarterOS)

## Requisitos
- Node en Vercel: 22.x (definido en `package.json`).
- Variables mínimas (Production):
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `FASTAPI_URL`

## Configuración de Infraestructura (Vercel)
Estos ajustes deben coincidir en el dashboard del proyecto:
- **Build Machine:** Standard (4 vCPUs, 8 GB Memory).
- **Function CPU:** Standard (1 vCPU, 2 GB Memory).
- **Fluid Compute:** Enabled.
- **Skew Protection:** Disabled.
- **Deployment Protection:** Standard.

## Pasos
1. Revisar variables:
   ```zsh
   pnpm ts-node scripts/env-audit.ts
   ./scripts/env-verify.sh
   ```
2. Desplegar a Vercel en `main`.
3. Verificar salud:
   - `/_next/static/chunks` cargan sin error
   - `/api/env/diagnostic` `ok: true`
   - `/auth/sign-in` y `/auth/sign-up` renderizan formulario de autenticación de Supabase
   - `/dashboard` redirige a `/auth/sign-in` si no hay sesión

## Middleware
Protege únicamente `/dashboard/**`. Rutas `/auth/*` son públicas.

## Notas
- `NEXT_PUBLIC_DEMO_MODE` eliminado del flujo.
- Cualquier error de auth redirige a `/auth/sign-in`.
- Sistema de autenticación migrado de Clerk a Supabase.
