-- Unified SmarterOS Database Schema
-- Combines Retail Node (Odoo/n8n/WhatsApp) + RUT/Subscription Management

-- compatibility for plain Postgres (without full Supabase)
CREATE SCHEMA IF NOT EXISTS auth;
CREATE TABLE IF NOT EXISTS auth.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  raw_user_meta_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 1. Profiles (from app.smarterbot.cl)
-- Extends auth.users for identity
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  email TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  rut TEXT, -- Chilean ID linked to the person
  phone TEXT,
  company_id UUID, -- Link to a tenant if applicable
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tenants / Accounts (Unifying company and subscription)
CREATE TABLE IF NOT EXISTS public.accounts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES public.profiles(id),
  company_name TEXT NOT NULL,
  rut_company TEXT UNIQUE, -- RUT of the business entity
  plan_type TEXT DEFAULT 'DEMO', -- 'DEMO', 'PRO', 'ENTERPRISE'
  payment_status TEXT DEFAULT 'ACTIVE', -- 'PENDING', 'ACTIVE', 'EXPIRED'
  subscriptions_count INTEGER DEFAULT 1,
  total_price DECIMAL(12,2) DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Subscriptions (Linked RUTs that can use the service)
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  account_id UUID REFERENCES public.accounts(id),
  name TEXT NOT NULL,
  rut TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  deleted BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Sales & Customers (Retail Node functionality)
CREATE TABLE IF NOT EXISTS public.res_partner ( -- Synced with Odoo
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.accounts(id),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  rut TEXT,
  odoo_id INTEGER, -- Link back to Odoo DB
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.sales_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.accounts(id),
  customer_id UUID REFERENCES public.res_partner(id),
  amount DECIMAL(12,2) NOT NULL,
  currency TEXT DEFAULT 'CLP',
  odoo_order_id INTEGER,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Messaging & Integration Logs
CREATE TABLE IF NOT EXISTS public.message_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.accounts(id),
  recipient TEXT NOT NULL,
  provider TEXT NOT NULL, -- 'whatsapp', 'sms'
  content TEXT NOT NULL,
  status TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for everything
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.res_partner ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_logs ENABLE ROW LEVEL SECURITY;

-- Basic Policies (Owner-only)
CREATE POLICY "Users can only see their own profile" ON public.profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Owners can manage their accounts" ON public.accounts FOR ALL USING (auth.uid() = owner_id);
