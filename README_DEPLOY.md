# Deploy estable en Vercel (SmarterOS)

## Requisitos
- Node en Vercel: 22.x (forzado por `package.json` y `.vercel/project.json`).
- Variables mínimas (Production):
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `CLERK_SECRET_KEY`
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `FASTAPI_URL` (opcional si se usa)

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
   - `/auth/sign-in` y `/auth/sign-up` renderizan Clerk
   - `/dashboard` redirige a `/auth/sign-in` si no hay sesión

## Middleware
Protege únicamente `/dashboard/**`. Rutas `/auth/*` son públicas.

## Notas
- `NEXT_PUBLIC_DEMO_MODE` eliminado del flujo.
- MCP sigue disponible pero está detrás de `MCP_ENABLED`.
- Cualquier error de auth redirige a `/auth/sign-in`.
