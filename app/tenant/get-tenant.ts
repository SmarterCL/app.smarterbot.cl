"use server"

import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase"

export interface Tenant {
  id: string
  rut: string
  business_name: string
  metabase_card_id?: number | null
  status?: string
}

/**
 * Obtiene el tenant asociado al RUT del usuario autenticado.
 * Si no existe, devuelve null.
 */
export async function getTenantByRut(rut: string): Promise<Tenant | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('sb-access-token')?.value
    if (!token) return null

    const supabase = createClient({
      global: { headers: { Authorization: `Bearer ${token}` } }
    })

    // Auth check implicitly handled by RLS if configured, but good to check user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return null

    const { data, error } = await supabase
      .from("tenants")
      .select("*")
      .eq("rut", rut)
      .eq("status", "active")
      .single()

    if (error || !data) return null

    return data as Tenant
  } catch {
    return null
  }
}

/**
 * Obtiene el tenant del usuario actual leyendo su metadata.rut.
 */
export async function getCurrentTenant(): Promise<Tenant | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('sb-access-token')?.value
    if (!token) return null

    const supabase = createClient({
      global: { headers: { Authorization: `Bearer ${token}` } }
    })

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return null

    // Attempt to get RUT from metadata
    const rut = user.user_metadata?.rut as string
    if (rut) {
      const tenant = await getTenantByRut(rut)
      if (tenant) return tenant
    }

    // Fallback: list tenants and pick first
    const { data, error } = await supabase
      .from("tenants")
      .select("*")
      .eq("clerk_user_id", user.id)
      .eq("status", "active")
      .limit(1)
      .single()

    if (error || !data) return null

    return data as Tenant
  } catch {
    return null
  }
}
