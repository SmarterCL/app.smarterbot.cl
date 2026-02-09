-- Comprehensive Schema Update: Tenants, Profiles, and Sync Logic
-- Ensures that deleting a Clerk user (Profile) cascades or handles tenant data correctly.
-- Addresses user question: "si la cuenta la elimino cuando ingreso debe estar registrado el RUT mil correos un RUT que pasa con el schema ?"

-- 1. Ensure Profiles table exists and has unique constraints on Email
-- The 'id' is the Clerk User ID. 'email' MUST be unique.
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY, -- Clerk User ID
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  rut_persona TEXT, -- Encrypted or strictly validated
  rut_empresa TEXT,
  phone TEXT,
  company_id UUID,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tenants (Companies) Table Update
-- One RUT (Business) can have multiple users/emails associated, but usually one Owner.
-- IF the owner deletes their account, the Tenant should persist if meaningful data exists, 
-- OR ripple delete if it's a personal account. 
-- For B2B, we usually soft-delete or reassign ownership.
ALTER TABLE public.tenants
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ, -- Soft delete support
ADD COLUMN IF NOT EXISTS owner_email TEXT; -- Snapshot of owner email for recovery

-- 3. Cascade Logic
-- If a Profile is deleted (e.g., Clerk webhook triggers deletion), 
-- we need to decide what happens to the Tenant.
-- Option A: CASCADE (Delete tenant + all data). Dangerous for businesses.
-- Option B: SET NULL (Orphan tenant). Needs manual cleanup.
-- Option C: Soft Delete (Recommended).

-- Let's enforce Foreign Key with specific behavior (Update if it doesn't match)
ALTER TABLE public.tenants
DROP CONSTRAINT IF EXISTS tenants_clerk_user_id_fkey;

ALTER TABLE public.tenants
ADD CONSTRAINT tenants_clerk_user_id_fkey
FOREIGN KEY (clerk_user_id) REFERENCES public.profiles(id)
ON DELETE SET NULL; -- If user is deleted, tenant remains but has no owner (orphaned). Admin must resolve.

-- 4. Unique Constraints for Business Logic
-- A single RUT (Business) should ideally strictly map to ONE active Tenant to avoid duplicates.
-- "mil correos un RUT" -> Multiple emails can belong to the same company, but only one Tenant record per RUT.
CREATE UNIQUE INDEX IF NOT EXISTS idx_tenants_rut_unique_active 
ON public.tenants (rut) 
WHERE deleted_at IS NULL;

-- 5. Tenant Users / Memberships (Many-to-Many)
-- To allow "mil correos" (thousand emails) to access one RUT/Tenant.
CREATE TABLE IF NOT EXISTS public.tenant_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member', -- 'owner', 'admin', 'member'
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(tenant_id, user_id)
);

-- 6. RLS Policies for Members
ALTER TABLE public.tenant_members ENABLE ROW LEVEL SECURITY;

-- Members can see their own memberships
CREATE POLICY "Users can view own memberships" ON public.tenant_members
FOR SELECT USING (auth.uid()::text = user_id);

-- 7. Update Tenant Policies to include Members
-- "Owners AND Members can access tenant data"
DROP POLICY IF EXISTS "Owners can manage their tenants" ON public.tenants;

CREATE POLICY "Owners and Members can view tenants" ON public.tenants
FOR SELECT USING (
  clerk_user_id = auth.uid()::text -- Is Owner
  OR 
  EXISTS ( -- Is Member
    SELECT 1 FROM public.tenant_members 
    WHERE tenant_id = public.tenants.id 
    AND user_id = auth.uid()::text
  )
);
