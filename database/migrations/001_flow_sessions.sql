-- Identity Bridge: Flow Sessions Table
-- Tracks users coming from flow.smarterbot.cl (Twilio auth)

CREATE TABLE IF NOT EXISTS public.flow_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_user_id TEXT NOT NULL,
  phone TEXT NOT NULL,
  product_id TEXT,
  cart_data JSONB DEFAULT '{}',
  verified_by_twilio BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending', -- pending, completed, abandoned, failed
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  abandoned_at TIMESTAMPTZ
);

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_flow_sessions_clerk_user ON public.flow_sessions(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_flow_sessions_phone ON public.flow_sessions(phone);
CREATE INDEX IF NOT EXISTS idx_flow_sessions_status ON public.flow_sessions(status);
CREATE INDEX IF NOT EXISTS idx_flow_sessions_product ON public.flow_sessions(product_id);
CREATE INDEX IF NOT EXISTS idx_flow_sessions_created ON public.flow_sessions(created_at DESC);

-- Enable RLS
ALTER TABLE public.flow_sessions ENABLE ROW LEVEL SECURITY;

-- Policies

-- Users can only see their own flow sessions
CREATE POLICY "Users can view own flow sessions" 
  ON public.flow_sessions 
  FOR SELECT 
  USING (auth.uid()::text = clerk_user_id);

-- API can insert flow sessions (authenticated service role)
CREATE POLICY "Service role can insert flow sessions" 
  ON public.flow_sessions 
  FOR INSERT 
  WITH CHECK (true);

-- Users can update their own sessions (for completing/abandoning)
CREATE POLICY "Users can update own flow sessions" 
  ON public.flow_sessions 
  FOR UPDATE 
  USING (auth.uid()::text = clerk_user_id);

-- Service role has full access
CREATE POLICY "Service role full access" 
  ON public.flow_sessions 
  FOR ALL 
  USING (true);

-- Comments for documentation
COMMENT ON TABLE public.flow_sessions IS 'Tracks user sessions from flow.smarterbot.cl (Twilio OTP auth) to app.smarterbot.cl (Clerk auth)';
COMMENT ON COLUMN public.flow_sessions.clerk_user_id IS 'Clerk user ID after bridge authentication';
COMMENT ON COLUMN public.flow_sessions.phone IS 'Phone number verified by Twilio in flow';
COMMENT ON COLUMN public.flow_sessions.verified_by_twilio IS 'Whether phone was verified via Twilio OTP in flow';
COMMENT ON COLUMN public.flow_sessions.status IS 'Session status: pending (just arrived), completed (purchased), abandoned (left), failed (error)';
