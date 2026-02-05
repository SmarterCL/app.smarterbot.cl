import { NextResponse } from "next/server"
import { auth, currentUser } from "@clerk/nextjs/server"
import { createClient } from "@/lib/supabase"

const ensureValue = (value?: string | null, fallback = "") => {
  if (!value) return fallback
  const trimmed = value.trim()
  return trimmed || fallback
}

export async function GET() {
  try {
    const { userId } = await auth()
    const user = await currentUser()

    if (!userId || !user) {
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
    const { data, error } = await supabase
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

    if (error) {
      console.error("[contacts:sync] Supabase error", error)
      return NextResponse.json({ error: "No se pudo sincronizar el contacto" }, { status: 502 })
    }

    return NextResponse.json({
      contact: data,
    })
  } catch (error) {
    console.error("[contacts:sync] Unexpected error", error)
    return NextResponse.json({ error: "Error al sincronizar el contacto" }, { status: 500 })
  }
}
