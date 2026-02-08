"use server"

import { auth } from "@clerk/nextjs/server"
import { createClient } from "@/lib/supabase"

/**
 * Guarda el RUT Persona y RUT Empresa en la tabla profiles de Supabase.
 */
export async function saveRutMetadata(rutPersona: string, rutEmpresa: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const { userId } = await auth()

    if (!userId) {
      return { ok: false, error: "No authenticated user" }
    }

    const supabase = createClient()

    // Upsert into profiles table
    const { error: profileError } = await supabase
      .from("profiles")
      .upsert({
        id: userId,
        rut_persona: rutPersona,
        rut_empresa: rutEmpresa,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' })

    if (profileError) throw profileError

    return { ok: true }
  } catch (error: any) {
    console.error("[saveRutMetadata] Error saving RUT to profiles:", error)
    return { ok: false, error: error?.message || "Failed to save RUT" }
  }
}
