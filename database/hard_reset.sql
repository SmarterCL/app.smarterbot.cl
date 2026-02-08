-- PELIGRO: Este script borra y recrea las tablas para asegurar compatibilidad con Clerk y los nuevos campos de RUT.
-- Úsalo solo si necesitas resetear la estructura de datos.

-- Borrar tablas antiguas (en orden inverso de FK)
DROP TABLE IF EXISTS public.message_logs CASCADE;
DROP TABLE IF EXISTS public.sales_history CASCADE;
DROP TABLE IF EXISTS public.res_partner CASCADE;
DROP TABLE IF EXISTS public.subscriptions CASCADE;
DROP TABLE IF EXISTS public.tenants CASCADE;
DROP TABLE IF EXISTS public.accounts CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.contacts CASCADE;

-- 1. Profiles (Compatible con Clerk)
CREATE TABLE public.profiles (
  id TEXT PRIMARY KEY, -- Clerk User ID
  email TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  rut_persona TEXT,
  rut_empresa TEXT,
  phone TEXT,
  company_id UUID,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. Tenants (Empresas)
CREATE TABLE public.tenants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_user_id TEXT REFERENCES public.profiles(id),
  name TEXT NOT NULL,
  rut TEXT UNIQUE,
  plan_type TEXT DEFAULT 'DEMO',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 3. Contacts (Sincronización de CRM)
CREATE TABLE public.contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id),
  full_name TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  source TEXT,
  status TEXT DEFAULT 'active',
  was_notified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- SEED: Crear el tenant DEMO
INSERT INTO public.tenants (id, name, rut, status)
VALUES ('00000000-0000-0000-0000-000000000000', 'SmarterOS Billing System', '76.123.456-7', 'active')
ON CONFLICT (rut) DO NOTHING;

-- Habilitar RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Políticas básicas
CREATE POLICY "Users can only see their own profile" ON public.profiles FOR ALL USING (auth.uid()::text = id);
CREATE POLICY "Owners can manage their tenants" ON public.tenants FOR ALL USING (auth.uid()::text = clerk_user_id);
