# Implementation Plan: Multi-Tenant Database System

This document outlines the step-by-step technical implementation of the multi-tenant isolation system for SmarterOS.

## Phase 1: Control Plane Setup (Supabase)
1. **Extend Tenant Schema**: Update `public.tenants` to include:
    - `db_name`: (e.g., `smarter_761234567`)
    - `instance_url`: (e.g., `https://761234567.smarterbot.cl`)
    - `provisioning_status`: (`pending`, `active`, `error`)

2. **Entitlements Table**: Ensure `public.user_services` tracks `web_shop` and `qr_billing` activation status.

## Phase 2: Database Provisioning Tooling (MCP)
1. **Tool `erp.create_tenant_db`**:
    - Connect to Postgres Master.
    - Run `CREATE DATABASE db_{rut} TEMPLATE smarter_base`.
    - Setup `res.users` with the email from the onboarding process.

2. **Odoo Database Manager (DBM) Integration**:
    - Configure `odoo.conf` with `dbfilter = ^%h$` to match the subdomain head.
    - Setup Master Password protection for the database manager.

## Phase 3: Webhook & Orchestration (n8n)
1. **Trigger**: Listen for `onboarding.completed` event.
2. **Action**:
    - Call FastAPI `/api/provision/db`.
    - Wait for DB readiness.
    - Trigger Odoo API to auto-install requested modules (`website`, `l10n_cl`).
    - Send "Welcome/Ready" email to the user with their dynamic link.

## Phase 4: Dynamic UI & Module Toggles
1. **Dashboard Update**:
    - Implement the "Activar Tienda" switch in `components/dashboard-content.tsx`.
    - Implement the "Configurar Facturación QR" section.
    - Each switch calls a server action that updates Supabase and triggers the n8n flow.

## Phase 5: Infrastructure (Docker/Caddy)
1. **Wildcard DNS**: Ensure `*.smarterbot.cl` points to the VPS.
2. **Reverse Proxy**: Update `Caddyfile` to handle wildcard routes and pass headers correctly to the Odoo and Frontend services.
