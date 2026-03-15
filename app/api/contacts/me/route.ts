import { NextResponse } from "next/server"
import { auth, currentUser } from "@clerk/nextjs/server"
import { createClient } from "@/lib/supabase"
import { logger } from "@/lib/logger"

const ensureValue = (value?: string | null, fallback = "") => {
  if (!value) return fallback
  const trimmed = value.trim()
  return trimmed || fallback
}

export async function GET() {
  try {
    const authData = await auth()
    const userId = authData.userId
    const user = await currentUser()

    logger.debug("[contacts:GET] Sincronizando contacto", { userId, hasUser: !!user })

    if (!userId || !user) {
      logger.warn("[contacts:GET] Unauthorized access attempt or missing session")
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const email = user.primaryEmailAddress?.emailAddress

    if (!email) {
      return NextResponse.json({ error: "El usuario no tiene un email asociado" }, { status: 400 })
    }

    const name =
      user.fullName ||
      user.username ||
      ensureValue(email.split("@")[0]) ||
      "Contacto SmarterOS"

    const supabase = createClient()

    // First, sync basic contact info
    const { data: contactData, error: contactError } = await supabase
      .from("contacts")
      .upsert(
        {
          email: ensureValue(email, "sin-correo@smarteros.cl"),
          full_name: name,
          source: "clerk",
          tenant_id: "00000000-0000-0000-0000-000000000000", // placeholder
        },
        { onConflict: "email" }
      )
      .select()
      .single()

    if (contactError) {
      logger.error("[contacts:sync] Supabase contacts error", contactError)
      return NextResponse.json({ error: "No se pudo sincronizar el contacto" }, { status: 502 })
    }

    // Then, fetch extended profile info (RUTs)
    // Note: RUTs are stored in profiles table if available
    const { data: profileData } = await supabase
      .from("profiles")
      .select("id, updated_at")
      .eq("id", userId)
      .single()

    return NextResponse.json({
      contact: {
        ...contactData,
        rut_persona: profileData ? "Disponible" : "No registrado",
        rut_empresa: "No registrado"
      },
    })
  } catch (error) {
    logger.error("[contacts:sync] Unexpected error", error instanceof Error ? error : new Error(String(error)))
    return NextResponse.json({ error: "Error al sincronizar el contacto" }, { status: 500 })
  }
}
