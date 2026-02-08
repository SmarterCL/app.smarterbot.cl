-- PELIGRO: Este script borra y recrea las tablas para asegurar compatibilidad con Clerk.
-- Úsalo solo en desarrollo local si la base de datos está "bloqueada" o con tipos de datos antiguos.

-- Borrar tablas antiguas (en orden inverso de FK)
DROP TABLE IF EXISTS public.message_logs CASCADE;
DROP TABLE IF EXISTS public.sales_history CASCADE;
DROP TABLE IF EXISTS public.res_partner CASCADE;
DROP TABLE IF EXISTS public.subscriptions CASCADE;
DROP TABLE IF EXISTS public.tenants CASCADE;
DROP TABLE IF EXISTS public.accounts CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- 1. Profiles (Compatible con Clerk)
CREATE TABLE public.profiles (
  id TEXT PRIMARY KEY, -- Clerk User ID
  email TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  rut TEXT,
  phone TEXT,
  company_id UUID,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. Tenants
CREATE TABLE public.tenants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_user_id TEXT REFERENCES public.profiles(id),
  business_name TEXT NOT NULL,
  rut TEXT UNIQUE,
  plan_type TEXT DEFAULT 'DEMO',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 3. Ventas de Prueba
CREATE TABLE public.sales_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id),
  amount DECIMAL(12,2) NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- SEED: Crear el tenant para el RUT que estás usando
-- Reemplaza 'user_demo_clerk' con tu ID si lo conoces, o deja que el onboarding lo cree.
INSERT INTO public.tenants (id, business_name, rut, status)
VALUES ('11111111-1111-1111-1111-111111111111', 'SmarterOS Enterprise Demo', '78.233.417-4', 'active')
ON CONFLICT (rut) DO UPDATE SET business_name = EXCLUDED.business_name;
