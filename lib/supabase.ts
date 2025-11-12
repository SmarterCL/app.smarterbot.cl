// Añadimos helper para tabla de settings de negocio
export async function upsertBusinessSettings(supabase: ReturnType<typeof getSupabaseClient>, userId: string, data: { business_name: string; webhook_url: string }) {
  return supabase
    .from("business_settings")
    .upsert({ user_id: userId, business_name: data.business_name, webhook_url: data.webhook_url }, { onConflict: "user_id" })
    .select()
    .single()
}

export async function fetchBusinessSettings(supabase: ReturnType<typeof getSupabaseClient>, userId: string) {
  return supabase.from("business_settings").select("business_name, webhook_url").eq("user_id", userId).single()
}
import { createClient, type SupabaseClient } from "@supabase/supabase-js"

type SupabaseClientOptions = Parameters<typeof createClient>[2]

let cachedClient: SupabaseClient | null = null

const getEnv = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error("Supabase environment variables are missing")
  }

  return { url, anonKey }
}

export function getSupabaseClient(options?: SupabaseClientOptions) {
  if (cachedClient) {
    return cachedClient
  }

  const { url, anonKey } = getEnv()

  cachedClient = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      headers: {
        "x-application-name": "smarteros-hub",
      },
    },
    ...options,
  })

  return cachedClient
}
