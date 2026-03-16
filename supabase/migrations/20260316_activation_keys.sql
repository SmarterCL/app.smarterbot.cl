-- Migration: Create Activation Keys System
-- Table: public.activation_keys

CREATE TABLE IF NOT EXISTS public.activation_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL, -- e.g. SMRT-8F3K-22AX
    type TEXT NOT NULL DEFAULT 'PAYMENT', -- 'PAYMENT' or 'PARTNER'
    plan_type TEXT DEFAULT 'PROMO',
    max_activations INTEGER DEFAULT 1,
    activations_count INTEGER DEFAULT 0,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    partner_id TEXT, -- e.g. 'HOSTINGER'
    metadata JSONB DEFAULT '{}'
);

-- Index for fast lookup
CREATE INDEX IF NOT EXISTS idx_activation_keys_key ON public.activation_keys(key);

-- Add activation_key_id to tenants
ALTER TABLE public.tenants 
ADD COLUMN IF NOT EXISTS activation_key_id UUID REFERENCES public.activation_keys(id);

-- Policy to allow users to read keys (if needed)
-- ALTER TABLE public.activation_keys ENABLE ROW LEVEL SECURITY;
