import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// GET - Retrieve user's secrets (masked)
export async function GET() {
    try {
        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 })
        }

        // Get user's secrets from vault (we store metadata separately)
        const { data, error } = await supabase
            .from("user_secrets")
            .select("id, secret_name, created_at, updated_at")
            .eq("user_id", userId)

        if (error) {
            console.error("Error fetching secrets:", error)
            return NextResponse.json({ error: "Error al obtener secretos" }, { status: 500 })
        }

        return NextResponse.json({ secrets: data || [] })
    } catch (error) {
        console.error("User secrets GET error:", error)
        return NextResponse.json({ error: "Error interno" }, { status: 500 })
    }
}

// POST - Save a user secret to vault
export async function POST(request: Request) {
    try {
        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 })
        }

        const body = await request.json()
        const { secret_name, secret_value } = body

        if (!secret_name || !secret_value) {
            return NextResponse.json({ error: "Nombre y valor del secreto requeridos" }, { status: 400 })
        }

        // Create unique secret name for this user
        const vaultSecretName = `user_${userId}_${secret_name}`

        // First, try to delete existing secret if it exists
        await supabase.rpc("delete_user_secret_if_exists", {
            p_secret_name: vaultSecretName
        }).catch(() => {
            // Ignore if it doesn't exist
        })

        // Store in Supabase Vault
        const { data: vaultData, error: vaultError } = await supabase.rpc("vault_create_secret", {
            p_secret: secret_value,
            p_name: vaultSecretName,
            p_description: `${secret_name} for user ${userId}`
        })

        if (vaultError) {
            console.error("Vault error:", vaultError)
            // Try alternative method - direct insert to user_secrets table
            const { error: insertError } = await supabase
                .from("user_secrets")
                .upsert({
                    user_id: userId,
                    secret_name: secret_name,
                    vault_secret_id: null, // Will use separate encrypted storage
                    encrypted_value: secret_value, // In production, encrypt this client-side
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }, {
                    onConflict: "user_id,secret_name"
                })

            if (insertError) {
                console.error("Insert error:", insertError)
                return NextResponse.json({ error: "Error al guardar secreto" }, { status: 500 })
            }

            return NextResponse.json({
                message: `${secret_name} guardado correctamente`,
                stored: true
            })
        }

        // Save reference in user_secrets table
        const { error: refError } = await supabase
            .from("user_secrets")
            .upsert({
                user_id: userId,
                secret_name: secret_name,
                vault_secret_id: vaultData,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }, {
                onConflict: "user_id,secret_name"
            })

        if (refError) {
            console.error("Reference save error:", refError)
        }

        return NextResponse.json({
            message: `${secret_name} guardado en Vault`,
            vault_id: vaultData
        })
    } catch (error) {
        console.error("User secrets POST error:", error)
        return NextResponse.json({ error: "Error interno" }, { status: 500 })
    }
}

// DELETE - Remove a user secret
export async function DELETE(request: Request) {
    try {
        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const secretName = searchParams.get("name")

        if (!secretName) {
            return NextResponse.json({ error: "Nombre del secreto requerido" }, { status: 400 })
        }

        // Delete from user_secrets table
        const { error } = await supabase
            .from("user_secrets")
            .delete()
            .eq("user_id", userId)
            .eq("secret_name", secretName)

        if (error) {
            console.error("Delete error:", error)
            return NextResponse.json({ error: "Error al eliminar secreto" }, { status: 500 })
        }

        // Also try to delete from vault
        const vaultSecretName = `user_${userId}_${secretName}`
        await supabase.rpc("delete_vault_secret", {
            p_secret_name: vaultSecretName
        }).catch(() => {
            // Ignore vault errors
        })

        return NextResponse.json({ message: "Secreto eliminado" })
    } catch (error) {
        console.error("User secrets DELETE error:", error)
        return NextResponse.json({ error: "Error interno" }, { status: 500 })
    }
}
