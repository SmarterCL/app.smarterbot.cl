"use server"

import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase"

/**
 * Guarda el RUT validado en los metadata públicos del usuario.
 */
export async function saveRutMetadata(rut: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('sb-access-token')?.value

    if (!token) {
      return { ok: false, error: "No authenticated user" }
    }

    const supabase = createClient({
      global: { headers: { Authorization: `Bearer ${token}` } }
    })

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return { ok: false, error: "No authenticated user" }
    }

    const { error } = await supabase.auth.updateUser({
      data: { rut }
    })

    if (error) throw error

    return { ok: true }
  } catch (error: any) {
    return { ok: false, error: error?.message || "Failed to save RUT" }
  }
}
