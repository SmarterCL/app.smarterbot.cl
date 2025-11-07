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
