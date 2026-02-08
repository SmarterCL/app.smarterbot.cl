"use server"

import { auth } from "@clerk/nextjs/server"
import { createClient } from "@/lib/supabase"

/**
 * Guarda el RUT validado en la tabla de perfiles de Supabase.
 */
export async function saveRutMetadata(rut: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const { userId } = await auth()

    if (!userId) {
      return { ok: false, error: "No authenticated user" }
    }

    const supabase = createClient()

    // Intentar actualizar el perfil del usuario con el RUT
    // Usamos upsert para asegurar que el perfil exista
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: userId as any, // Manejar como UUID si es necesario, o cambiar esquema
        rut,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' })

    if (error) {
      console.error("Error updating profile RUT:", error)
      // Si falla por el tipo UUID, intentaremos guardarlo en los tenants directamente o en el metadata de Clerk
      // Pero por ahora, sigamos el flujo de la base de datos
      throw error
    }

    return { ok: true }
  } catch (error: any) {
    console.error("Save RUT error:", error)
    return { ok: false, error: error?.message || "Failed to save RUT" }
  }
}
