# Tenant Module (RUT Multi-Tenant)

Módulo que implementa el flujo multi-tenant usando RUT chileno como identificador.

## Arquitectura

```
app/
  tenant/
    validate-rut.ts      → Validación y formato RUT
    save-metadata.ts     → Guarda RUT en Supabase metadata
    get-tenant.ts        → Busca tenant en Supabase por RUT
    actions.ts           → Orquesta: valida + guarda + busca
  auth/
    onboarding/page.tsx  → Formulario RUT post-login
  api/
    tenant/link-rut/     → Endpoint POST para vincular RUT
```

## Flujo completo

1. Usuario se loguea con Supabase → `/auth/sign-in`
2. Dashboard verifica `user.user_metadata.rut`:
   - Si no existe → redirige a `/auth/onboarding`
   - Si existe → carga tenant y servicios
3. Usuario ingresa RUT → API `/api/tenant/link-rut` valida y guarda
4. Dashboard recarga con tenant activo

## Validación RUT

Algoritmo estándar chileno:
- Formato: `12.345.678-9` o `12345678-9`
- Dígito verificador (DV) calculado con módulo 11
- Soporta K como DV 10

## Schema Supabase (esperado)

```sql
create table tenants (
  id uuid primary key default gen_random_uuid(),
  rut text unique not null,
  business_name text not null,
  active boolean default true,
  services_enabled jsonb default '{}',
  created_at timestamptz default now(),
  chatwoot_inbox_id text,
  botpress_workspace_id text,
  odoo_company_id text,
  n8n_project_id text,
  metabase_dashboard_id text
);

create index on tenants(rut);
```

## Supabase User Metadata

```ts
{
  user_metadata: {
    rut: "12.345.678-9"
  }
}
```

## Uso en dashboard

```ts
import { getCurrentTenant } from "@/app/tenant/get-tenant"

const tenant = await getCurrentTenant()
if (tenant) {
  // render services
}
```

## Testing local

```zsh
# Validar RUT
pnpm ts-node -e "const {validateRUT} = require('./app/tenant/validate-rut'); console.log(validateRUT('12.345.678-5'))"

# Link RUT (con sesión Supabase activa)
curl -X POST http://localhost:3000/api/tenant/link-rut \
  -H 'Content-Type: application/json' \
  -H 'Cookie: sb-access-token=YOUR_ACCESS_TOKEN' \
  -d '{"rut":"12.345.678-5"}'
```