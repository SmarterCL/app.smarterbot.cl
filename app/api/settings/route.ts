import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { getSupabaseClient } from "@/lib/supabase"

export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

    const supabaseClient = getSupabaseClient()
    const { data: profile, error } = await supabaseClient
      .from("profiles")
      .select("business_name, phone")
      .eq("id", userId)
      .single()

    if (error && error.code !== "PGRST116") {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      settings: {
        business_name: profile?.business_name || "",
        webhook_url: "" // Webhook url not present in profiles, keeping for compatibility
      }
    })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
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
    const { data, error } = await upsertProfile(supabaseClient, userId, { business_name })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ settings: { business_name: data?.business_name, webhook_url } })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Error" }, { status: 500 })
  }
}

async function upsertProfile(supabase: any, userId: string, data: { business_name: string }) {
  return supabase
    .from("profiles")
    .upsert({ id: userId, business_name: data.business_name, updated_at: new Date().toISOString() })
    .select()
    .single()
}
