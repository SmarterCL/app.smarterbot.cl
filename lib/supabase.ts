import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js"

type SupabaseClientOptions = Parameters<typeof createSupabaseClient>[2]

let cachedClient: SupabaseClient | null = null
let cachedAuthClient: SupabaseClient | null = null

const getEnv = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error("Supabase environment variables are missing")
  }

  return { url, anonKey }
}

export function createClient(options?: SupabaseClientOptions): SupabaseClient {
  const { url, anonKey } = getEnv()

  return createSupabaseClient(url, anonKey, {
    db: {
      schema: 'public'
    },
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    },
    global: {
      headers: {
        "x-application-name": "smarteros-hub",
      },
    },
    ...options,
  })
}

export function getSupabaseClient(options?: SupabaseClientOptions): SupabaseClient {
  if (cachedClient) {
    return cachedClient
  }

  cachedClient = createClient(options)
  return cachedClient
}

// =========================================================
// Tenant Helpers (Phase 3 - Multi-tenant support)
// =========================================================

export type Tenant = {
  id: string
  rut: string
  business_name: string
  contact_email: string | null
  user_id: string  // Cambiado de clerk_user_id a user_id
  owner_email: string | null
  services_enabled: {
    crm: boolean
    bot: boolean
    erp: boolean
    workflows: boolean
    kpi: boolean
  }
  chatwoot_inbox_id: number | null
  botpress_workspace_id: string | null
  odoo_company_id: number | null
  n8n_project_id: string | null
  metabase_dashboard_id: string | null
  active: boolean
  created_at: string
  updated_at: string
}

/**
 * List all tenants for the current user
 */
export async function listTenantsForUser(userId: string) {
  const supabase = getSupabaseClient()
  if (!supabase) throw new Error('Supabase not initialized')

  const { data, error } = await supabase
    .from("tenants")
    .select("*")
    .eq("user_id", userId)
    .eq("active", true)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Tenant[]
}

/**
 * Get a single tenant by ID (with ownership check via RLS)
 */
export async function getTenantById(tenantId: string) {
  const supabase = getSupabaseClient()
  if (!supabase) throw new Error('Supabase not initialized')

  const { data, error } = await supabase
    .from("tenants")
    .select("*")
    .eq("id", tenantId)
    .single()

  if (error) throw error
  return data as Tenant
}

/**
 * Create a new tenant
 */
export async function createTenant(tenant: {
  rut: string
  business_name: string
  contact_email: string
  user_id: string  // Cambiado de clerk_user_id a user_id
  owner_email?: string
  services_enabled?: Partial<Tenant["services_enabled"]>
}) {
  const supabase = getSupabaseClient()
  if (!supabase) throw new Error('Supabase not initialized')

  const { data, error } = await supabase
    .from("tenants")
    .insert({
      ...tenant,
      services_enabled: {
        crm: false,
        bot: false,
        erp: false,
        workflows: false,
        kpi: false,
        ...tenant.services_enabled,
      },
    })
    .select()
    .single()

  if (error) throw error
  return data as Tenant
}

/**
 * Update tenant services
 */
export async function updateTenantServices(
  tenantId: string,
  services: Partial<Tenant["services_enabled"]>
) {
  const supabase = getSupabaseClient()
  if (!supabase) throw new Error('Supabase not initialized')

  const { data, error } = await supabase
    .from("tenants")
    .update({ services_enabled: services })
    .eq("id", tenantId)
    .select()
    .single()

  if (error) throw error
  return data as Tenant
}

/**
 * Update tenant integration IDs (after bootstrap)
 */
export async function updateTenantIntegrations(
  tenantId: string,
  integrations: {
    chatwoot_inbox_id?: number
    botpress_workspace_id?: string
    odoo_company_id?: number
    n8n_project_id?: string
    metabase_dashboard_id?: string
  }
) {
  const supabase = getSupabaseClient()
  if (!supabase) throw new Error('Supabase not initialized')

  const { data, error } = await supabase
    .from("tenants")
    .update(integrations)
    .eq("id", tenantId)
    .select()
    .single()

  if (error) throw error
  return data as Tenant
}

// =========================================================
// Legacy helpers (business_settings - deprecated)
// =========================================================

export async function upsertBusinessSettings(
  supabase: ReturnType<typeof getSupabaseClient>,
  userId: string,
  data: { business_name: string; webhook_url: string }
) {
  return supabase
    .from("business_settings")
    .upsert(
      { user_id: userId, business_name: data.business_name, webhook_url: data.webhook_url },
      { onConflict: "user_id" }
    )
    .select()
    .single()
}

export async function fetchBusinessSettings(
  supabase: ReturnType<typeof getSupabaseClient>,
  userId: string
) {
  return supabase.from("business_settings").select("business_name, webhook_url").eq("user_id", userId).single()
}

