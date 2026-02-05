import { createClient as createSupabaseClient, SupabaseClient } from "@supabase/supabase-js"
import { Database } from "@/types/supabase"

type SupabaseClientOptions = Parameters<typeof createSupabaseClient>[2]

let cachedClient: SupabaseClient<Database> | null = null
let cachedAuthClient: SupabaseClient<Database> | null = null

const getEnv = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    // During build time on Vercel, these might be missing.
    // Instead of crashing, we log a warning and return strict fallbacks.
    console.warn("Supabase environment variables are missing! Using fallbacks for build.")
    return {
      url: "https://placeholder.supabase.co",
      anonKey: "placeholder"
    }
  }

  return { url, anonKey }
}

export function createClient(options?: SupabaseClientOptions): SupabaseClient<Database> {
  const { url, anonKey } = getEnv()

  return createSupabaseClient(url, anonKey, {
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

export function getSupabaseClient(options?: SupabaseClientOptions): SupabaseClient<Database> {
  if (cachedClient) {
    return cachedClient
  }

  cachedClient = createClient(options)
  return cachedClient
}

// =========================================================
// Tenant Helpers (Phase 3 - Multi-tenant support)
// =========================================================

export type Tenant = Database["public"]["Tables"]["tenants"]["Row"] & {
  services_enabled: {
    crm: boolean
    bot: boolean
    erp: boolean
    workflows: boolean
    kpi: boolean
  } | null
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
    .eq("clerk_user_id", userId)
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
  user_id: string
  owner_email?: string
  services_enabled?: Partial<Tenant["services_enabled"]>
}) {
  const supabase = getSupabaseClient()
  if (!supabase) throw new Error('Supabase not initialized')

  // Con los tipos reales, ya podemos usar "tenants" directamente
  const { data, error } = await supabase
    .from("tenants")
    .insert({
      rut: tenant.rut,
      business_name: tenant.business_name,
      contact_email: tenant.contact_email,
      clerk_user_id: tenant.user_id,
      owner_email: tenant.owner_email,
      services_enabled: {
        crm: false,
        bot: false,
        erp: false,
        workflows: false,
        kpi: false,
        ...(tenant.services_enabled || {}),
      } as any,
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
  services: any
) {
  const supabase = getSupabaseClient()
  if (!supabase) throw new Error('Supabase not initialized')

  const { data, error } = await supabase
    .from("tenants")
    .update({ services_enabled: services as any })
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

