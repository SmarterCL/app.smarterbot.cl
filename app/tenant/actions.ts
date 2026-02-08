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
    name: string
  }
}

/**
 * Vincula el RUT de Persona y el RUT de Empresa al usuario autenticado.
 */
export async function linkRutToUser(rutPersonaInput: string, rutEmpresaInput: string): Promise<LinkRutResult> {
  const rutPersona = formatRUT(rutPersonaInput)
  const rutEmpresa = formatRUT(rutEmpresaInput)

  if (!validateRUT(rutPersona)) {
    return { ok: false, error: "RUT Persona inválido" }
  }

  if (!validateRUT(rutEmpresa)) {
    return { ok: false, error: "RUT Empresa inválido" }
  }

  // Guardamos ambos en perfiles
  const saveResult = await saveRutMetadata(rutPersona, rutEmpresa)
  if (!saveResult.ok) {
    return { ok: false, error: saveResult.error }
  }

  // Buscamos si existe un tenant para el RUT de Empresa
  const tenant = await getTenantByRut(rutEmpresa)

  if (!tenant) {
    return {
      ok: true,
      error: "RUTs guardados. No se encontró un tenant activo para esta empresa. Contacta soporte."
    }
  }

  return {
    ok: true,
    tenant: {
      id: tenant.id,
      rut: tenant.rut,
      name: tenant.business_name || (tenant as any).name, // handle possible field name variants
    },
  }
}