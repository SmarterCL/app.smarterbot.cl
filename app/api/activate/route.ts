import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { validateAndConsumeKey } from "@/lib/activation"
import { logger } from "@/lib/logger"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 })
    }

    const { key, rutEmpresa } = await req.json()

    if (!key) {
      return NextResponse.json({ ok: false, error: "Clave de activación requerida" }, { status: 400 })
    }

    if (!rutEmpresa) {
        return NextResponse.json({ ok: false, error: "RUT de Empresa requerido para vincular la licencia" }, { status: 400 })
    }

    const result = await validateAndConsumeKey(key, userId)

    if (!result.ok) {
      return NextResponse.json(result, { status: 400 })
    }

    logger.info("Activation successful", { userId, keyId: result.keyId, rutEmpresa })

    return NextResponse.json({
      ok: true,
      message: "Licencia activada correctamente",
      plan: result.planType
    })
  } catch (error: any) {
    logger.error("[api/activate] Error", { error: error?.message })
    return NextResponse.json(
      { ok: false, error: "Error procesando activación" },
      { status: 500 }
    )
  }
}
