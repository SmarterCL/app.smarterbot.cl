"use server"

import { validateRUT, formatRUT } from "./validate-rut"
import { saveRutMetadata } from "./save-metadata"
import { getTenantByRut } from "./get-tenant"

export interface LinkRutResult {
  ok: boolean
  error?: string
  tenant?: {
    id: string
    rut: string
    business_name: string
  }
}

/**
 * Vincula un RUT al usuario autenticado:
 * 1. Valida formato y DV
 * 2. Guarda en Clerk metadata
 * 3. Busca tenant en Supabase
 * 4. Retorna info del tenant si existe
 */
export async function linkRutToUser(rutInput: string): Promise<LinkRutResult> {
  const rut = formatRUT(rutInput)
  
  if (!validateRUT(rut)) {
    return { ok: false, error: "RUT inválido" }
  }
  
  const saveResult = await saveRutMetadata(rut)
  if (!saveResult.ok) {
    return { ok: false, error: saveResult.error }
  }
  
  const tenant = await getTenantByRut(rut)
  
  if (!tenant) {
    return { 
      ok: true, 
      error: "RUT guardado pero no hay tenant asociado. Contacta soporte para activar tu cuenta."
    }
  }
  
  return {
    ok: true,
    tenant: {
      id: tenant.id,
      rut: tenant.rut,
      business_name: tenant.business_name,
    },
  }
}
