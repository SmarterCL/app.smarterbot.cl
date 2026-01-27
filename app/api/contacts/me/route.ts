import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase"

const ensureValue = (value?: string | null, fallback = "") => {
  if (!value) return fallback
  const trimmed = value.trim()
  return trimmed || fallback
}

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('sb-access-token')?.value

    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const supabase = createClient({
      global: { headers: { Authorization: `Bearer ${token}` } }
    })

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const email = user.email

    if (!email) {
      return NextResponse.json({ error: "El usuario no tiene un email asociado" }, { status: 400 })
    }

    const name =
      ensureValue(user.user_metadata?.full_name) ||
      ensureValue(user.user_metadata?.name) ||
      ensureValue(email.split("@")[0]) ||
      "Contacto SmarterOS"

    const { data, error } = await supabase
      .from("contacts")
      .upsert(
        {
          email: ensureValue(email, "sin-correo@smarteros.cl"),
          name,
          source: "supabase",
          status: "active",
          was_notified: true,
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
