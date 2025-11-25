import { NextRequest, NextResponse } from "next/server"
import { linkRutToUser } from "@/app/tenant/actions"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const { rut } = await req.json()

    if (!rut || typeof rut !== "string") {
      return NextResponse.json({ ok: false, error: "RUT requerido" }, { status: 400 })
    }

    const result = await linkRutToUser(rut)

    if (!result.ok) {
      return NextResponse.json(result, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Error interno" },
      { status: 500 }
    )
  }
}
