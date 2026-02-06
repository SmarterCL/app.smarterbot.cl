import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import crypto from "crypto"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Generate a secure API key
function generateApiKey(): string {
    const prefix = "sk_live_"
    const randomBytes = crypto.randomBytes(32).toString("hex")
    return `${prefix}${randomBytes}`
}

// GET - List user's API keys
export async function GET() {
    try {
        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 })
        }

        const { data, error } = await supabase
            .from("api_keys")
            .select("id, key_name, api_key, is_active, created_at")
            .eq("user_id", userId)
            .order("created_at", { ascending: false })

        if (error) {
            console.error("Error fetching API keys:", error)
            return NextResponse.json({ error: "Error al obtener API keys" }, { status: 500 })
        }

        // Mask API keys for display (show only last 8 chars)
        const maskedKeys = data?.map((key) => ({
            ...key,
            api_key_masked: `${"•".repeat(20)}${key.api_key.slice(-8)}`,
        }))

        return NextResponse.json({ apiKeys: maskedKeys || [] })
    } catch (error) {
        console.error("API Keys GET error:", error)
        return NextResponse.json({ error: "Error interno" }, { status: 500 })
    }
}

// POST - Create new API key
export async function POST(request: Request) {
    try {
        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 })
        }

        const body = await request.json()
        const { key_name } = body

        if (!key_name || key_name.trim() === "") {
            return NextResponse.json({ error: "Nombre de API key requerido" }, { status: 400 })
        }

        const newApiKey = generateApiKey()

        const { data, error } = await supabase
            .from("api_keys")
            .insert({
                user_id: userId,
                key_name: key_name.trim(),
                api_key: newApiKey,
                is_active: true,
            })
            .select()
            .single()

        if (error) {
            console.error("Error creating API key:", error)
            return NextResponse.json({ error: "Error al crear API key" }, { status: 500 })
        }

        // Return the full key only on creation (user should save it)
        return NextResponse.json({
            apiKey: {
                id: data.id,
                key_name: data.key_name,
                api_key: data.api_key, // Full key shown only once
                is_active: data.is_active,
                created_at: data.created_at,
            },
            message: "API key creada. Guárdala en un lugar seguro, no se mostrará de nuevo."
        })
    } catch (error) {
        console.error("API Keys POST error:", error)
        return NextResponse.json({ error: "Error interno" }, { status: 500 })
    }
}

// DELETE - Delete API key
export async function DELETE(request: Request) {
    try {
        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const keyId = searchParams.get("id")

        if (!keyId) {
            return NextResponse.json({ error: "ID de API key requerido" }, { status: 400 })
        }

        const { error } = await supabase
            .from("api_keys")
            .delete()
            .eq("id", keyId)
            .eq("user_id", userId) // Ensure user owns the key

        if (error) {
            console.error("Error deleting API key:", error)
            return NextResponse.json({ error: "Error al eliminar API key" }, { status: 500 })
        }

        return NextResponse.json({ message: "API key eliminada" })
    } catch (error) {
        console.error("API Keys DELETE error:", error)
        return NextResponse.json({ error: "Error interno" }, { status: 500 })
    }
}

// PATCH - Toggle API key status
export async function PATCH(request: Request) {
    try {
        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 })
        }

        const body = await request.json()
        const { id, is_active } = body

        if (!id) {
            return NextResponse.json({ error: "ID de API key requerido" }, { status: 400 })
        }

        const { data, error } = await supabase
            .from("api_keys")
            .update({ is_active })
            .eq("id", id)
            .eq("user_id", userId)
            .select()
            .single()

        if (error) {
            console.error("Error updating API key:", error)
            return NextResponse.json({ error: "Error al actualizar API key" }, { status: 500 })
        }

        return NextResponse.json({ apiKey: data })
    } catch (error) {
        console.error("API Keys PATCH error:", error)
        return NextResponse.json({ error: "Error interno" }, { status: 500 })
    }
}
