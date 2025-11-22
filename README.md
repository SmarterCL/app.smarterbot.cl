# SmarterOS Frontend

SmarterOS is the operations hub for SmarterBot customers. This repo hosts the public marketing page (`/`) and the authenticated dashboard (`/dashboard`) used in the `app.smarterbot.cl` subdomain. The UI has been restyled to match the SmarterOS brand: a dark grid background, monochrome accents, and a consistent typography system.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/smarterbotcl/app-smarterbot-cl)

## Tech Stack

- **Framework:** Next.js 15 (App Router, React 19)
- **Auth:** Clerk (Google OAuth, email)
- **Styling:** Tailwind CSS + custom design tokens (SmarterOS theme)
- **Forms & Validation:** React Hook Form, Zod
- **Charts & UI:** Shadcn UI components, Lucide icons, Recharts

## Getting Started

```bash
pnpm install
pnpm dev
```

The app runs on `http://localhost:3000`.

### Required Environment Variables

Create `.env.local` with:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_ENABLE_AUTH_DEBUG=false
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Set `NEXT_PUBLIC_ENABLE_AUTH_DEBUG=true` only while debugging user sessions; production deployments keep it `false`.

### Production Environment Variables

Set ONLY the following in Vercel for a stable deployment:

Required:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `FASTAPI_URL`

Optional (use only if referenced):
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL` (`/sign-in`)
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL` (`/sign-up`)
- `NEXT_PUBLIC_DEMO_MODE`
- `RESEND_API_KEY`

Remove / do not set (not used by the Next.js app, can cause confusion):
`anonpublic`, `service_rolesecret`, `SUPABASE_URL`, `SUPABASE_JWT_SECRET`, `POSTGRES_URL`, `POSTGRES_PRISMA_URL`, `POSTGRES_URL_NON_POOLING`, `POSTGRES_USER`, `POSTGRES_PASSWORD`.

Verification scripts:

```bash
pnpm ts-node scripts/env-audit.ts
./scripts/env-verify.sh
```

Production check endpoint: `/api/env/diagnostic`.

### Demo Mode

Setting `NEXT_PUBLIC_DEMO_MODE=true` switches the landing page and `/dashboard` to demo flows that skip Clerk authentication and redirect to the in-memory demo dashboard (`/demo-dashboard`).

## Project Structure Highlights

- `app/page.tsx` – Public marketing/landing page with SmarterOS branding.
- `app/dashboard/page.tsx` – Authenticated dashboard shell; uses Clerk server-side `auth()`.
- `components/background-pattern.tsx` – Shared grid background rendered on both landing and dashboard pages.
- `components/demo-dashboard-content.tsx` – In-memory CRUD simulator used in demo mode.
- `middleware.ts` – Protects `/dashboard` routes while still allowing demo mode or unconfigured environments to fail gracefully.

## Linting & Formatting

```bash
pnpm lint
```

The repo uses the flat ESLint config (`eslint.config.mjs`) with `eslint-config-next`. Prettier is not configured; code follows the conventions enforced by Next.js and the component library.

## Deployment

The main branch is deployed on Vercel to `app.smarterbot.cl`. Pushing to `main` triggers an automatic deployment. Use preview deployments for QA before merging large UI updates.

## Contributing

1. Create a feature branch.
2. Run `pnpm lint` before opening a PR.
3. Provide screenshots or Loom videos when altering UI layouts.

For support or design requests, reach the SmarterBot team on Slack or at `soporte@smarterbot.cl`.
