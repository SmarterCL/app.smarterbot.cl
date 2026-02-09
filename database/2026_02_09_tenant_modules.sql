-- Schema Adjustment: Tenant Modules Configuration
-- Aligns with Frontend Integration Guide (2026-02-09)

-- 1. Tenant Modules Table
-- Stores the enabled modules for a specific tenant (Company)
-- Replaces/Augments the per-user entitlement for organization-level features.

CREATE TABLE IF NOT EXISTS public.tenant_modules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  module_code TEXT NOT NULL, -- 'web_page', 'qr_invoicing', etc.
  is_active BOOLEAN DEFAULT TRUE,
  configuration JSONB DEFAULT '{}', -- Module specific config
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(tenant_id, module_code)
);

-- 2. Update Tenants Table (if needed)
-- Ensure 'tenants' has the fields required by the registration flow
ALTER TABLE public.tenants 
ADD COLUMN IF NOT EXISTS business_email TEXT, -- Admin/Contact email different from owner
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'provisioning'; -- 'provisioning', 'active', 'suspended'

-- 3. RLS Policies
ALTER TABLE public.tenant_modules ENABLE ROW LEVEL SECURITY;

-- Allow tenant owners to view their modules
CREATE POLICY "Tenant owners can view modules" ON public.tenant_modules
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.tenants
    WHERE public.tenants.id = public.tenant_modules.tenant_id
    AND public.tenants.clerk_user_id = auth.uid()::text
  )
);

-- Allow tenant owners to update modules (if self-service is allowed)
CREATE POLICY "Tenant owners can update modules" ON public.tenant_modules
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.tenants
    WHERE public.tenants.id = public.tenant_modules.tenant_id
    AND public.tenants.clerk_user_id = auth.uid()::text
  )
);
