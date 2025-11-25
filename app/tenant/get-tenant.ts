"use server"

import { auth } from "@clerk/nextjs/server"
import { createClient } from "@/lib/supabase"

export interface Tenant {
  id: string
  rut: string
  business_name: string
  active: boolean
  services_enabled: Record<string, boolean>
  created_at: string
  chatwoot_inbox_id?: string | null
  botpress_workspace_id?: string | null
  odoo_company_id?: string | null
  n8n_project_id?: string | null
  metabase_dashboard_id?: string | null
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
      .eq("active", true)
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
    const { userId } = await auth()
    if (!userId) return null
    
    // En producción, leer el RUT desde user.publicMetadata.rut si está guardado
    // Por ahora, devolvemos null si no hay un RUT asociado
    return null
  } catch {
    return null
  }
}
