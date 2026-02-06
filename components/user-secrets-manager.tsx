"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"

interface SavedSecret {
    id: string
    secret_name: string
    created_at: string
    updated_at: string
}

const API_KEY_CONFIGS = [
    { name: "whatsapp_api_key", label: "WhatsApp Business API", placeholder: "Ingresa tu API key de WhatsApp" },
    { name: "openai_api_key", label: "OpenAI API Key", placeholder: "sk-..." },
]

export default function UserSecretsManager() {
    const { user, isLoaded } = useUser()
    const [savedSecrets, setSavedSecrets] = useState<SavedSecret[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState<string | null>(null)
    const [values, setValues] = useState<Record<string, string>>({})
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const loadSecrets = async () => {
        try {
            const res = await fetch("/api/user-secrets")
            if (!res.ok) throw new Error("Error cargando secretos")
            const data = await res.json()
            setSavedSecrets(data.secrets || [])
        } catch (e: any) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isLoaded && user) {
            loadSecrets()
        }
    }, [isLoaded, user])

    const saveSecret = async (secretName: string) => {
        const value = values[secretName]
        if (!value || value.trim() === "") {
            setError(`Ingresa un valor para ${secretName}`)
            return
        }

        setSaving(secretName)
        setError("")
        setSuccess("")

        try {
            const res = await fetch("/api/user-secrets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    secret_name: secretName,
                    secret_value: value.trim()
                }),
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || "Error guardando")
            }

            const data = await res.json()
            setSuccess(data.message)
            setValues((prev) => ({ ...prev, [secretName]: "" }))
            await loadSecrets()
        } catch (e: any) {
            setError(e.message)
        } finally {
            setSaving(null)
        }
    }

    const deleteSecret = async (secretName: string) => {
        if (!confirm(`¿Eliminar ${secretName}?`)) return

        try {
            const res = await fetch(`/api/user-secrets?name=${secretName}`, { method: "DELETE" })
            if (!res.ok) throw new Error("Error eliminando")
            setSuccess("Secreto eliminado")
            await loadSecrets()
        } catch (e: any) {
            setError(e.message)
        }
    }

    const isSecretSaved = (name: string) => savedSecrets.some((s) => s.secret_name === name)

    if (!isLoaded || !user) {
        return <div className="text-sm text-muted-foreground">Cargando...</div>
    }

    return (
        <div className="space-y-4 rounded border border-border bg-secondary p-4">
            <div>
                <h2 className="text-lg font-medium">API Keys</h2>
                <p className="text-xs text-muted-foreground">
                    Gestiona tus claves de API para {user.primaryEmailAddress?.emailAddress}
                </p>
            </div>

            {error && (
                <div className="rounded border border-red-400 bg-red-50 p-3 text-sm text-red-700">
                    {error}
                    <button onClick={() => setError("")} className="ml-2 text-red-500">✕</button>
                </div>
            )}

            {success && (
                <div className="rounded border border-green-400 bg-green-50 p-3 text-sm text-green-700">
                    {success}
                    <button onClick={() => setSuccess("")} className="ml-2 text-green-500">✕</button>
                </div>
            )}

            <div className="space-y-4">
                {API_KEY_CONFIGS.map((config) => (
                    <div key={config.name} className="rounded border bg-background p-4">
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium">{config.label}</label>
                            {isSecretSaved(config.name) && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                                    ✓ Guardado
                                </span>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="password"
                                placeholder={config.placeholder}
                                value={values[config.name] || ""}
                                onChange={(e) => setValues((prev) => ({ ...prev, [config.name]: e.target.value }))}
                                className="flex-1 rounded border bg-background px-3 py-2 text-sm"
                            />
                            <button
                                onClick={() => saveSecret(config.name)}
                                disabled={saving === config.name}
                                className="rounded bg-yellow-500 px-4 py-2 text-sm font-medium text-black hover:bg-yellow-600 disabled:opacity-50"
                            >
                                {saving === config.name ? "..." : "Guardar"}
                            </button>
                            {isSecretSaved(config.name) && (
                                <button
                                    onClick={() => deleteSecret(config.name)}
                                    className="rounded border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        {isSecretSaved(config.name) && (
                            <p className="text-xs text-muted-foreground mt-2">
                                Última actualización: {new Date(savedSecrets.find(s => s.secret_name === config.name)?.updated_at || "").toLocaleString()}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            {loading && <p className="text-sm text-muted-foreground">Cargando secretos...</p>}
        </div>
    )
}
