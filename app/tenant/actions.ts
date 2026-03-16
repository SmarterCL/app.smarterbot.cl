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
 * Requiere una clave de activación para crear un nuevo tenant.
 */
export async function linkRutToUser(rutPersonaInput: string, rutEmpresaInput: string, activationKey?: string): Promise<LinkRutResult> {
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

  const { userId } = await auth()
  if (!userId) return { ok: false, error: "No autorizado" }

  // Buscamos si existe un tenant para el RUT de Empresa
  let tenant = await getTenantByRut(rutEmpresa)

  if (!tenant) {
    let planType: any = 'DEMO'
    let activationKeyId: string | undefined = undefined

    // Si hay una clave, la validamos y consumimos
    if (activationKey) {
      const { validateAndConsumeKey } = await import("@/lib/activation")
      const activation = await validateAndConsumeKey(activationKey, userId)
      
      if (activation.ok) {
        planType = activation.planType || 'PROMO'
        activationKeyId = activation.keyId
      } else {
        // Si hay una clave pero es inválida, informamos el error
        // Pero si no hay clave, dejamos pasar (según requerimiento de no fricción)
        return { ok: false, error: (activation as any).error || "Clave de activación no válida" }
      }
    }

    // Si no existe, lo creamos (con o sin licencia vinculada)
    const supabase = createClient()

    const { data: newTenant, error: createError } = await supabase
      .from("tenants")
      .insert({
        rut: rutEmpresa,
        business_name: `Empresa ${rutEmpresa}`,
        clerk_user_id: userId,
        plan_type: planType,
        payment_status: 'ACTIVE' as any,
        status: 'active',
        activation_key_id: activationKeyId,
      } as any)
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
      rut: (tenant as any).rut || rutEmpresa,
      name: (tenant as any).business_name || (tenant as any).name,
    },
  }
}