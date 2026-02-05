import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"
import { listTenantsForUser } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = createClient()

    // Auth check using Supabase
    const { data: { session }, error: authError } = await supabase.auth.getSession()

    if (authError || !session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id

    // Fetch tenants with RLS (only user's own tenants)
    const tenants = await listTenantsForUser(userId)

    return NextResponse.json({
      success: true,
      tenants: tenants.map((t) => ({
        id: t.id,
        rut: t.rut,
        business_name: t.business_name,
        contact_email: t.contact_email,
        services_enabled: t.services_enabled,
        chatwoot_inbox_id: t.chatwoot_inbox_id,
        botpress_workspace_id: t.botpress_workspace_id,
        odoo_company_id: t.odoo_company_id,
        n8n_project_id: t.n8n_project_id,
        metabase_card_id: t.metabase_card_id,
        status: t.status,
        created_at: t.created_at,
        updated_at: t.updated_at,
      })),
      count: tenants.length,
    })
  } catch (error: any) {
    console.error("Tenant list error:", error)

    return NextResponse.json(
      {
        error: "Internal server error",
        message: error?.message || "Error listando tenants",
      },
      { status: 500 }
    )
  }
}
