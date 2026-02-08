"use server"

import { auth } from "@clerk/nextjs/server"
import { createClient } from "@/lib/supabase"

export interface Tenant {
  id: string
  rut: string
  name: string
  metabase_card_id?: number | null
  status?: string
}

/**
 * Obtiene el tenant asociado al RUT del usuario autenticado.
 * Si no existe, devuelve null.
 */
export async function getTenantByRut(rut: string): Promise<Tenant | null> {
  try {
    const { userId } = await auth()
    if (!userId) return null

    const supabase = createClient()

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
 * Obtiene el tenant del usuario actual leyendo su clerk_user_id.
 */
export async function getCurrentTenant(): Promise<Tenant | null> {
  try {
    const { userId } = await auth()
    if (!userId) return null

    const supabase = createClient()

    // Intentamos buscar por clerk_user_id
    const { data, error } = await supabase
      .from("tenants")
      .select("*")
      .eq("clerk_user_id", userId)
      .eq("status", "active")
      .limit(1)
      .single()

    if (error || !data) return null

    return data as Tenant
  } catch {
    return null
  }
}
