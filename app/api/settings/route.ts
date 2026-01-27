import { NextResponse } from "next/server"
import { createClient } from "../../../lib/supabase"
import { getSupabaseClient, upsertBusinessSettings, fetchBusinessSettings } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = createClient(); const { data: { session }, error: authError } = await supabase.auth.getSession(); if (authError || !session) { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }; const userId = session.user.id
    if (!userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

    const supabaseClient = getSupabaseClient()
    const { data, error } = await fetchBusinessSettings(supabaseClient, userId)
    if (error && error.code !== "PGRST116") {
      // PGRST116: row not found
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ settings: data || { business_name: "", webhook_url: "" } })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const supabase = createClient(); const { data: { session }, error: authError } = await supabase.auth.getSession(); if (authError || !session) { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }; const userId = session.user.id
    if (!userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

    const payload = await req.json().catch(() => ({}))
    const business_name = String(payload?.business_name || "").trim()
    const webhook_url = String(payload?.webhook_url || "").trim()

    if (!business_name) {
      return NextResponse.json({ error: "Nombre del negocio es obligatorio" }, { status: 400 })
    }
    if (webhook_url && !/^https?:\/\//i.test(webhook_url)) {
      return NextResponse.json({ error: "Webhook URL debe comenzar con http:// o https://" }, { status: 400 })
    }

    const supabaseClient = getSupabaseClient()
    const { data, error } = await upsertBusinessSettings(supabaseClient, userId, { business_name, webhook_url })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ settings: data })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Error" }, { status: 500 })
  }
}
