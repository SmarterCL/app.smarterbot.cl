"use server"

import { auth, clerkClient } from "@clerk/nextjs/server"

/**
 * Guarda el RUT validado en los metadata públicos del usuario Clerk.
 */
export async function saveRutMetadata(rut: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const { userId } = await auth()
    if (!userId) {
      return { ok: false, error: "No authenticated user" }
    }
    
    const client = await clerkClient()
    await client.users.updateUserMetadata(userId, {
      publicMetadata: { rut },
    })
    
    return { ok: true }
  } catch (error: any) {
    return { ok: false, error: error?.message || "Failed to save RUT" }
  }
}
