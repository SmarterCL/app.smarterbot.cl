import { createClient } from "@/lib/supabase"
import { logger } from "@/lib/logger"

export interface ActivationResult {
  ok: boolean
  error?: string
  keyId?: string
  planType?: string
}

/**
 * Validates and consumes an activation key.
 */
export async function validateAndConsumeKey(key: string, userId: string): Promise<ActivationResult> {
  const supabase = createClient()

  try {
    // 1. Find the key
    const { data, error: findError } = await supabase
      .from("activation_keys" as any)
      .select("*")
      .eq("key", key.toUpperCase())
      .single()

    const keyData = data as any;

    if (findError || !keyData) {
      logger.warn("Activation key not found", { key })
      return { ok: false, error: "Clave de activación no válida" }
    }

    // 2. Check if expired
    if (keyData.expires_at && new Date(keyData.expires_at) < new Date()) {
      return { ok: false, error: "La clave ha expirado" }
    }

    // 3. Check activations remaining
    if (keyData.activations_count >= keyData.max_activations) {
      return { ok: false, error: "La clave ya alcanzó su máximo de activaciones" }
    }

    // 4. Update activations count (Optimistic or Atomic)
    const { error: updateError } = await supabase
      .from("activation_keys" as any)
      .update({ 
        activations_count: keyData.activations_count + 1,
        metadata: { 
          ...keyData.metadata, 
          last_used_by: userId,
          used_at: new Date().toISOString()
        }
      })
      .eq("id", keyData.id)
      .eq("activations_count", keyData.activations_count) // Prevent race conditions

    if (updateError) {
      return { ok: false, error: "Error al procesar la clave. Intente nuevamente." }
    }

    return { 
      ok: true, 
      keyId: keyData.id, 
      planType: keyData.plan_type 
    }
  } catch (error: any) {
    logger.error("Error in validateAndConsumeKey", { error: error.message, key })
    return { ok: false, error: "Error interno de activación" }
  }
}
