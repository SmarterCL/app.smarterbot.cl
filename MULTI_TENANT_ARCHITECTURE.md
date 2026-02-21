# Architecture: SmarterOS Multi-Tenant Isolation (2026)

## 1. Overview
The SmarterOS architecture is designed for high-security isolation between business entities (Tenants). Each tenant is uniquely identified by their **RUT (Rol Único Tributario)** and the **Email** associated with `app.smarterbot.cl`. 

## 2. Core Pillars of Isolation

### A. Data Layer (PostgreSQL)
- **Separate Databases**: Instead of shared tables with `tenant_id` filters, each tenant receives a physically distinct PostgreSQL database (e.g., `smarter_761234567`).
- **Isolation Benefit**: This prevents accidental data leaks and allows for individual database backups, restores, and custom schema migrations per tenant.
- **Odoo Integration**: Leverages Odoo's native `dbfilter` capability to automatically route requests to the correct database based on the subdomain.

### B. Routing & API Layer
- **Centralized Door**: The infrastructure is accessed entirely through `app.smarterbot.cl`.
- **Dynamic Database Routing**: Odoo and other services dynamically route traffic by matching the authorized user to their specific database (`db_{rut}`). No wildcard subdomains are created.
- **SSL Termination**: Simplified, requires SSL only for the main platform `app.smarterbot.cl` and internal API gateways, avoiding the need for continuous wildcard generation.

### C. Application Layer (Next.js & Orchestrator)
- **Unified Auth**: Clerk handles identity. The login email from `app.smarterbot.cl` is mapped to the admin user in the tenant's isolated environment.
- **Metadata Registry**: Supabase acts as the "Global Registry" (Control Plane), storing the mapping between IDs, RUTs, and their specific infrastructure status.

## 3. Dynamic Service Provisioning

| Module | Activation Trigger | Impact |
| --- | --- | --- |
| **Tienda Web** | `service_code: 'web_shop'` | Installs Odoo `website` module + configures default theme. |
| **Facturación QR** | `service_code: 'qr_billing'` | Configures `l10n_cl` + sets up electronic invoicing credentials via n8n. |

## 4. Visual Flow
1. **User Sign Up** -> `app.smarterbot.cl` (`MAIN KEY` created via Clerk)
2. **Onboarding** -> User provides RUT 76.xxx.xxx-k.
3. **Provisioning** -> Orchestrator deployed Flow validation and creates `db_76xxxxxx`.
4. **Access** -> User accesses their system directly from `app.smarterbot.cl/dashboard`, switching databases transparently in the background without needing a separate subdomain.
