"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"

interface ApiKey {
    id: string
    key_name: string
    api_key?: string
    api_key_masked?: string
    is_active: boolean
    created_at: string
}

export default function ApiKeysManager() {
    const { user, isLoaded } = useUser()
    const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
    const [loading, setLoading] = useState(true)
    const [creating, setCreating] = useState(false)
    const [newKeyName, setNewKeyName] = useState("")
    const [newlyCreatedKey, setNewlyCreatedKey] = useState<string | null>(null)
    const [error, setError] = useState("")
    const [copied, setCopied] = useState(false)

    const loadApiKeys = async () => {
        try {
            const res = await fetch("/api/api-keys")
            if (!res.ok) throw new Error("Error cargando API keys")
            const data = await res.json()
            setApiKeys(data.apiKeys || [])
        } catch (e: any) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isLoaded && user) {
            loadApiKeys()
        }
    }, [isLoaded, user])

    const createApiKey = async () => {
        if (!newKeyName.trim()) {
            setError("Ingresa un nombre para la API key")
            return
        }

        setCreating(true)
        setError("")
        setNewlyCreatedKey(null)

        try {
            const res = await fetch("/api/api-keys", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ key_name: newKeyName.trim() }),
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || "Error creando API key")
            }

            const data = await res.json()
            setNewlyCreatedKey(data.apiKey.api_key)
            setNewKeyName("")
            await loadApiKeys()
        } catch (e: any) {
            setError(e.message)
        } finally {
            setCreating(false)
        }
    }

    const deleteApiKey = async (id: string) => {
        if (!confirm("¿Estás seguro de eliminar esta API key?")) return

        try {
            const res = await fetch(`/api/api-keys?id=${id}`, { method: "DELETE" })
            if (!res.ok) throw new Error("Error eliminando API key")
            await loadApiKeys()
        } catch (e: any) {
            setError(e.message)
        }
    }

    const toggleApiKey = async (id: string, currentStatus: boolean) => {
        try {
            const res = await fetch("/api/api-keys", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, is_active: !currentStatus }),
            })
            if (!res.ok) throw new Error("Error actualizando API key")
            await loadApiKeys()
        } catch (e: any) {
            setError(e.message)
        }
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    if (!isLoaded || !user) {
        return <div className="text-sm text-muted-foreground">Cargando usuario...</div>
    }

    return (
        <div className="space-y-4 rounded border border-border bg-secondary p-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-medium">API Keys</h2>
                    <p className="text-xs text-muted-foreground">
                        Gestiona tus claves de API para {user.primaryEmailAddress?.emailAddress}
                    </p>
                </div>
            </div>

            {error && (
                <div className="rounded border border-red-400 bg-red-50 p-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {/* Create new API Key */}
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Nombre de la API key (ej: Producción)"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="flex-1 rounded border bg-background px-3 py-2 text-sm"
                />
                <button
                    onClick={createApiKey}
                    disabled={creating}
                    className="rounded bg-yellow-500 px-4 py-2 text-sm font-medium text-black hover:bg-yellow-600 disabled:opacity-50"
                >
                    {creating ? "Creando..." : "Nueva API Key"}
                </button>
            </div>

            {/* Newly created key - show only once */}
            {newlyCreatedKey && (
                <div className="rounded border border-green-400 bg-green-50 p-4">
                    <p className="text-sm font-medium text-green-800 mb-2">
                        ⚠️ Guarda esta API key ahora. No se mostrará de nuevo.
                    </p>
                    <div className="flex items-center gap-2">
                        <code className="flex-1 rounded bg-white px-3 py-2 text-xs font-mono border break-all">
                            {newlyCreatedKey}
                        </code>
                        <button
                            onClick={() => copyToClipboard(newlyCreatedKey)}
                            className="rounded bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700"
                        >
                            {copied ? "✓ Copiado" : "Copiar"}
                        </button>
                    </div>
                </div>
            )}

            {/* API Keys list */}
            {loading ? (
                <p className="text-sm text-muted-foreground">Cargando API keys...</p>
            ) : apiKeys.length === 0 ? (
                <p className="text-sm text-muted-foreground">No tienes API keys. Crea una para comenzar.</p>
            ) : (
                <div className="space-y-2">
                    {apiKeys.map((key) => (
                        <div
                            key={key.id}
                            className="flex items-center justify-between rounded border bg-background p-3"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-sm">{key.key_name}</span>
                                    <span
                                        className={`text-xs px-2 py-0.5 rounded-full ${key.is_active
                                                ? "bg-green-100 text-green-700"
                                                : "bg-gray-100 text-gray-500"
                                            }`}
                                    >
                                        {key.is_active ? "Activa" : "Inactiva"}
                                    </span>
                                </div>
                                <code className="text-xs text-muted-foreground font-mono">
                                    {key.api_key_masked}
                                </code>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => toggleApiKey(key.id, key.is_active)}
                                    className="text-xs px-2 py-1 rounded border hover:bg-gray-100"
                                >
                                    {key.is_active ? "Desactivar" : "Activar"}
                                </button>
                                <button
                                    onClick={() => deleteApiKey(key.id)}
                                    className="text-xs px-2 py-1 rounded border border-red-200 text-red-600 hover:bg-red-50"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
