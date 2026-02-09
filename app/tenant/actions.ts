"use server"

import { auth } from "@clerk/nextjs/server"
import { createClient } from "@/lib/supabase"
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
  let tenant = await getTenantByRut(rutEmpresa)

  if (!tenant) {
    // Si no existe, lo creamos automáticamente para permitir el acceso inmediato
    const { userId } = await auth()
    const supabase = createClient()

    const { data: newTenant, error: createError } = await supabase
      .from("tenants")
      .insert({
        rut: rutEmpresa,
        name: `Empresa ${rutEmpresa}`,
        clerk_user_id: userId,
        plan_type: 'DEMO',
        payment_status: 'ACTIVE',
        status: 'active'
      })
      .select()
      .single()

    if (createError || !newTenant) {
      return { ok: false, error: "Error al crear tenant automático" }
    }

    tenant = newTenant as any

    // Disparamos la creación de la DB aislada en el Orchestrator
    try {
      const FASTAPI_URL = process.env.FASTAPI_URL || "http://api-backend:8000"
      await fetch(`${FASTAPI_URL}/webhook/n8n-mcp/${userId}/provision_erp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: userId,
          flow_name: "provision_erp",
          payload: { rut: rutEmpresa }
        })
      })
    } catch (e) {
      console.error("[linkRutToUser] Async provisioning trigger failed:", e)
    }
  }

  return {
    ok: true,
    tenant: {
      id: tenant!.id,
      rut: tenant!.rut,
      name: (tenant as any).business_name || (tenant as any).name,
    },
  }
}