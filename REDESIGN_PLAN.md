# 🎯 PLAN MAESTRO - SmarterOS Enterprise v2.0

## 📋 **Visión Unificada**
SmarterOS ahora integra totalmente el sistema de gestión de RUTs y suscripciones de `rut.smarterbot.store`. La plataforma centraliza la identidad, los pagos y la automatización comercial en un solo nodo retail escalable.

---

## 🏗️ **ESTRUCTURA UNIFICADA (Normas del Juego)**
```
/Users/mac/dev/2026/app.smarterbot.cl/
├── app/
│   ├── auth/ (Sign-In, Sign-Up, Onboarding)
│   ├── dashboard/ 
│   │   ├── empresa/ ← NUEVA: Gestión de RUTs y Pagos
│   │   ├── automatizaciones/ ← Gestión de n8n
│   ├── api/
│   │   ├── payments/ ← Integración con Flow
│   │   ├── messaging/ ← Webhooks para WA/SMS
├── components/
│   ├── ui/ (Radix/Shadcn)
│   ├── modules/ (Lógica compleja como TenantWizard)
├── lib/
│   ├── supabase.ts (Core DB)
│   ├── messaging.ts (WhatsApp/SMS Service)
│   ├── payments.ts (Flow Client)
├── services/
│   ├── odoo.ts (Integración Retail)
├── database/
│   ├── unified_schema.sql ← Blueprint de Supabase
├── docker-compose.yml ← Local Dev & MCP
```

---

## 🔧 **FUNCIONALIDADES CORE**

### 1. **Gestión de RUTs (Ex-SmarterRUT)**
- Migración de la tabla `subscriptions` a la base unificada.
- Integración de pagos vía Flow directamente en el dashboard.
- Envío de códigos de activación via **WhatsApp/SMS** mediante el nuevo `MessagingService`.

### 2. **Retail Node (Retail Spec)**
- Conexión nativa con **Odoo v16** para inventario y boletas.
- Orquestación mediante **n8n** local o en la nube.
- Dashboards de KPI en tiempo real vía **Metabase**.

### 3. **MCP Local Dev**
- Uso de `@modelcontextprotocol/server-supabase` vía Docker.
- Permite a la IA (Antigravity/Gemini) operar directamente sobre el esquema unificado.

---

## 🎨 **ESTADO DEL PROYECTO**

| Componente | Estado | Versión |
|------------|---------|----------|
| **Next.js** | ✅ Optimizado | 16.1.6 |
| **Node.js** | ✅ Fijado | 24.x |
| **Messaging** | ✅ Abstraído | `lib/messaging.ts` |
| **Database** | ✅ Unificada | `unified_schema.sql` |
| **Local Dev** | ✅ Dockerizado | `docker-compose.yml` |

---

**🚀 SmarterOS es ahora el primer Sistema Operativo Comercial unificado para el mercado chileno.**