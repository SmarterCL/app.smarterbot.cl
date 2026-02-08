import { NextRequest, NextResponse } from "next/server"
import { linkRutToUser } from "@/app/tenant/actions"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const { rutPersona, rutEmpresa } = await req.json()

    if (!rutPersona || typeof rutPersona !== "string") {
      return NextResponse.json({ ok: false, error: "RUT Persona requerido" }, { status: 400 })
    }

    if (!rutEmpresa || typeof rutEmpresa !== "string") {
      return NextResponse.json({ ok: false, error: "RUT Empresa requerido" }, { status: 400 })
    }

    const result = await linkRutToUser(rutPersona, rutEmpresa)

    if (!result.ok) {
      return NextResponse.json(result, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error: any) {
    console.error("[api/tenant/link-rut] Error:", error)
    return NextResponse.json(
      { ok: false, error: error?.message || "Error interno" },
      { status: 500 }
    )
  }
}
