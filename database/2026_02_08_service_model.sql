-- SmarterOS Service Model Migration (2026-02-08)
-- Principle: Auth != Entitlement != Provisioning

-- 1. User Profile (Source of truth for user identity)
CREATE TABLE IF NOT EXISTS public.user_profile (
  user_id TEXT PRIMARY KEY, -- Clerk User ID
  email TEXT UNIQUE NOT NULL,
  nombre TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. User Services (Entitlements: What they can use)
CREATE TABLE IF NOT EXISTS public.user_services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT REFERENCES public.user_profile(user_id) ON DELETE CASCADE,
  service_code TEXT NOT NULL, -- 'whatsapp' | 'odoo' | 'smarterchat' | 'sms'
  enabled BOOLEAN DEFAULT FALSE,
  plan TEXT DEFAULT 'FREE', -- 'free' | 'trial' | 'paid'
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, service_code)
);

-- 3. User Service Status (Runtime: Is it working?)
CREATE TABLE IF NOT EXISTS public.user_service_status (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT REFERENCES public.user_profile(user_id) ON DELETE CASCADE,
  service_code TEXT NOT NULL,
  status TEXT DEFAULT 'provisioning', -- 'ok' | 'error' | 'provisioning' | 'disconnected'
  last_check TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  error_msg TEXT,
  UNIQUE(user_id, service_code)
);

-- Enable RLS
ALTER TABLE public.user_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_service_status ENABLE ROW LEVEL SECURITY;

-- Policies (Owner-only access)
DROP POLICY IF EXISTS "Users can only see their own user_profile" ON public.user_profile;
CREATE POLICY "Users can only see their own user_profile" ON public.user_profile 
FOR ALL USING (auth.uid()::text = user_id);

DROP POLICY IF EXISTS "Users can only see their own user_services" ON public.user_services;
CREATE POLICY "Users can only see their own user_services" ON public.user_services 
FOR ALL USING (auth.uid()::text = user_id);

DROP POLICY IF EXISTS "Users can only see their own user_service_status" ON public.user_service_status;
CREATE POLICY "Users can only see their own user_service_status" ON public.user_service_status 
FOR ALL USING (auth.uid()::text = user_id);

-- Migration Helper: Initialize services for existing users
-- (This can be run manually or triggered on sign-in)
CREATE OR REPLACE FUNCTION public.initialize_user_services(target_user_id TEXT)
RETURNS void AS $$
BEGIN
  -- WhatsApp
  INSERT INTO public.user_services (user_id, service_code, enabled, plan)
  VALUES (target_user_id, 'whatsapp', FALSE, 'FREE')
  ON CONFLICT DO NOTHING;
  
  -- Odoo
  INSERT INTO public.user_services (user_id, service_code, enabled, plan)
  VALUES (target_user_id, 'odoo', FALSE, 'FREE')
  ON CONFLICT DO NOTHING;

  -- SmarterChat
  INSERT INTO public.user_services (user_id, service_code, enabled, plan)
  VALUES (target_user_id, 'smarterchat', FALSE, 'FREE')
  ON CONFLICT DO NOTHING;

  -- SMS
  INSERT INTO public.user_services (user_id, service_code, enabled, plan)
  VALUES (target_user_id, 'sms', FALSE, 'FREE')
  ON CONFLICT DO NOTHING;

  -- Statuses
  INSERT INTO public.user_service_status (user_id, service_code, status)
  VALUES 
    (target_user_id, 'whatsapp', 'provisioning'),
    (target_user_id, 'odoo', 'provisioning'),
    (target_user_id, 'smarterchat', 'provisioning'),
    (target_user_id, 'sms', 'provisioning')
  ON CONFLICT DO NOTHING;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
