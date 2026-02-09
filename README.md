# SmarterOS Frontend

SmarterOS is the operations hub for SmarterBot customers. This repo hosts the public marketing page (`/`) and the authenticated dashboard (`/dashboard`) used in the `app.smarterbot.cl` subdomain. The UI has been restyled to match the SmarterOS brand: a dark grid background, monochrome accents, and a consistent typography system.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/smarterbotcl/app-smarterbot-cl)

## ✨ Latest Features

### Dashboard de Automatizaciones N8N (Nov 2024) ✅
- 🔄 **10 workflows reales** desde automation-manifest.json en GitHub
- 📊 **Paginación funcional** (10 items por página)
- 🎯 **Integración completa**: GitHub → API → Dashboard
- 🎛️ **Control ON/OFF** por workflow (próximamente funcional)
- ▶️ **Ejecución manual** con botón Play
- 📈 **Estadísticas globales**: workflows activos, ejecuciones, totales
- 🏷️ **7 categorías**: Odoo, Shopify, Marketing, WhatsApp, CRM, PDF, Backup
- 🇪🇸 **100% en español**
- 🎨 **UI moderna** con Shadcn/UI + badges con colores por categoría
- 🔗 **API REST**: `api.smarterbot.cl/n8n/templates`

Ver: `/dashboard/automatizaciones` | Docs: `specs/N8N-AUTOMATION-INTEGRATION.md`

## Tech Stack

- **Framework:** Next.js 16.1.6 (App Router, React 19)
- **Auth:** Supabase (Email/password, OAuth)
- **Styling:** Tailwind CSS + custom design tokens (SmarterOS theme)
- **Forms & Validation:** React Hook Form, Zod
- **Charts & UI:** Shadcn UI components, Lucide icons, Recharts
- **Automation:** N8N Integration (workflows dashboard)

## Quick Start

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Copy `.env.example` to `.env.local` and add your environment variables
4. Run the development server: `pnpm dev`

## Environment Variables

Required:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- `FASTAPI_URL` - Your FastAPI backend URL

Optional:
- `NEXT_PUBLIC_DEMO_MODE` - Set to `true` to enable demo mode
- `RESEND_API_KEY` - API key for email sending

## Deployment

This project is configured for deployment on Vercel. Simply connect your repository to Vercel and it will automatically build and deploy.

## Architecture

- `/app` - Next.js 16.1.6 App Router pages
- `/components` - Reusable UI components
- `/lib` - Shared utilities and Supabase client
- `/public` - Static assets
- `/styles` - Global styles