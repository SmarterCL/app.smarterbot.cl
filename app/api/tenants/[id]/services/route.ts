import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { z } from "zod"
import { updateTenantServices } from "@/lib/supabase"

const servicesUpdateSchema = z.object({
  crm: z.boolean().optional(),
  bot: z.boolean().optional(),
  erp: z.boolean().optional(),
  workflows: z.boolean().optional(),
  kpi: z.boolean().optional(),
})

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(id)) {
      return NextResponse.json({ error: "Invalid tenant ID format" }, { status: 400 })
    }

    // Parse and validate body
    const body = await req.json().catch(() => ({}))
    const validation = servicesUpdateSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const services = validation.data

    // Update services (RLS ensures ownership)
    const tenant = await updateTenantServices(id, services)

    return NextResponse.json({
      success: true,
      tenant: {
        id: tenant.id,
        rut: tenant.rut,
        business_name: tenant.business_name,
        services_enabled: tenant.services_enabled,
        updated_at: tenant.updated_at,
      },
      message: "Servicios actualizados correctamente",
    })
  } catch (error: any) {
    console.error("Services update error:", error)

    if (error?.code === "PGRST116" || error?.message?.includes("no rows")) {
      return NextResponse.json(
        {
          error: "Tenant not found",
          message: "Tenant no encontrado o sin permisos de actualización",
        },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        error: "Internal server error",
        message: error?.message || "Error actualizando servicios",
      },
      { status: 500 }
    )
  }
}
