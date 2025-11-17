"use client"

import { useState } from "react"
import { Cloud, Database, Box, CheckCircle2, XCircle, Loader2, ExternalLink } from "lucide-react"

interface AzureConfig {
  subscription_id: string
  resource_group: string
  n8n_url: string
  postgres_host: string
  vault_integration: boolean
}

export default function AzureSettingsPage() {
  const [config, setConfig] = useState<AzureConfig>({
    subscription_id: "",
    resource_group: "smarteros-n8n-prod",
    n8n_url: "",
    postgres_host: "",
    vault_integration: false,
  })
  const [isValidating, setIsValidating] = useState(false)
  const [validationStatus, setValidationStatus] = useState<{
    n8n: boolean | null
    postgres: boolean | null
    vault: boolean | null
  }>({
    n8n: null,
    postgres: null,
    vault: null,
  })

  const validateServices = async () => {
    setIsValidating(true)
    setValidationStatus({ n8n: null, postgres: null, vault: null })

    // Simular validación (en producción, llamar a /api/azure/validate)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setValidationStatus({
      n8n: !!config.n8n_url,
      postgres: !!config.postgres_host,
      vault: config.vault_integration,
    })
    setIsValidating(false)
  }

  const StatusIcon = ({ status }: { status: boolean | null }) => {
    if (status === null) return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
    if (status) return <CheckCircle2 className="h-5 w-5 text-green-600" />
    return <XCircle className="h-5 w-5 text-red-600" />
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configuración Azure</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Conecta tu suscripción de Azure para desplegar n8n, Postgres y servicios de automatización.
          </p>
        </div>

        {/* Free Trial Banner */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
          <div className="flex items-start gap-4">
            <Cloud className="h-8 w-8 text-blue-600" />
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900">¿No tienes suscripción de Azure?</h3>
              <p className="mt-1 text-sm text-blue-700">
                Obtén <strong>$200 USD en créditos gratis</strong> por 30 días con Azure Free Trial.
              </p>
              <a
                href="https://azure.microsoft.com/free"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Crear cuenta gratuita <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Azure Subscription Form */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
            <Database className="h-5 w-5" />
            Suscripción de Azure
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground">Subscription ID</label>
              <input
                type="text"
                value={config.subscription_id}
                onChange={(e) => setConfig({ ...config, subscription_id: e.target.value })}
                placeholder="00000000-0000-0000-0000-000000000000"
                className="mt-1 w-full rounded border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Encuéntralo en{" "}
                <a
                  href="https://portal.azure.com/#view/Microsoft_Azure_Billing/SubscriptionsBlade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Azure Portal → Subscriptions
                </a>
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground">Resource Group</label>
              <input
                type="text"
                value={config.resource_group}
                onChange={(e) => setConfig({ ...config, resource_group: e.target.value })}
                placeholder="smarteros-n8n-prod"
                className="mt-1 w-full rounded border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <p className="mt-1 text-xs text-muted-foreground">Nombre del resource group donde se deployará n8n</p>
            </div>
          </div>
        </div>

        {/* n8n Configuration */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
            <Box className="h-5 w-5" />
            n8n Workflow Automation
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground">n8n URL</label>
              <input
                type="url"
                value={config.n8n_url}
                onChange={(e) => setConfig({ ...config, n8n_url: e.target.value })}
                placeholder="https://n8n.smarterbot.cl"
                className="mt-1 w-full rounded border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                URL de tu instancia n8n desplegada en Azure Container Apps
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground">Postgres Host</label>
              <input
                type="text"
                value={config.postgres_host}
                onChange={(e) => setConfig({ ...config, postgres_host: e.target.value })}
                placeholder="n8n-postgres-abc123.postgres.database.azure.com"
                className="mt-1 w-full rounded border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Hostname de Azure Postgres Flexible Server (tier Production)
              </p>
            </div>

            <div className="flex items-center gap-3 rounded border border-border bg-secondary p-4">
              <input
                type="checkbox"
                id="vault-integration"
                checked={config.vault_integration}
                onChange={(e) => setConfig({ ...config, vault_integration: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
              />
              <label htmlFor="vault-integration" className="text-sm text-foreground">
                Habilitar integración con HashiCorp Vault (
                <code className="rounded bg-muted px-1 text-xs">vault.smarterbot.cl</code>)
              </label>
            </div>
          </div>
        </div>

        {/* Validation */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-foreground">Validar Configuración</h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between rounded border border-border bg-secondary p-3">
              <span className="text-sm text-foreground">n8n accesible</span>
              <StatusIcon status={validationStatus.n8n} />
            </div>
            <div className="flex items-center justify-between rounded border border-border bg-secondary p-3">
              <span className="text-sm text-foreground">Postgres conectado</span>
              <StatusIcon status={validationStatus.postgres} />
            </div>
            <div className="flex items-center justify-between rounded border border-border bg-secondary p-3">
              <span className="text-sm text-foreground">Vault configurado</span>
              <StatusIcon status={validationStatus.vault} />
            </div>
          </div>

          <button
            onClick={validateServices}
            disabled={isValidating || !config.subscription_id}
            className="mt-4 inline-flex items-center gap-2 rounded bg-accent px-6 py-2 text-sm font-medium text-accent-foreground hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isValidating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Validando...
              </>
            ) : (
              "Validar servicios"
            )}
          </button>
        </div>

        {/* Deployment Instructions */}
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6">
          <h3 className="font-semibold text-yellow-900">Instrucciones de Deploy</h3>
          <ol className="mt-3 space-y-2 text-sm text-yellow-800">
            <li>
              1. <strong>Instala Azure Developer CLI:</strong>{" "}
              <code className="rounded bg-yellow-100 px-2 py-1 text-xs">brew tap azure/azd && brew install azd</code>
            </li>
            <li>
              2. <strong>Login a Azure:</strong>{" "}
              <code className="rounded bg-yellow-100 px-2 py-1 text-xs">azd auth login</code>
            </li>
            <li>
              3. <strong>Deploy n8n:</strong>{" "}
              <code className="rounded bg-yellow-100 px-2 py-1 text-xs">
                cd n8n-smarteros && azd env new smarteros-n8n-prod && azd up
              </code>
            </li>
            <li>
              4. <strong>Configura DNS:</strong> CNAME <code>n8n.smarterbot.cl</code> → Output de{" "}
              <code>azd up</code>
            </li>
            <li>
              5. <strong>Vuelve aquí</strong> y completa los campos con los valores del deployment
            </li>
          </ol>
          <a
            href="https://github.com/SmarterCL/n8n-smarteros"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-yellow-900 hover:underline"
          >
            Ver repositorio n8n-smarteros <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* Costos estimados */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-foreground">Costos Estimados (Tier Production)</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Azure Container Apps</span>
              <span className="font-medium text-foreground">~$150/mes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Postgres Flexible Server (Standard_B2s)</span>
              <span className="font-medium text-foreground">~$50/mes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Azure Files Premium (100GB)</span>
              <span className="font-medium text-foreground">~$30/mes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">VNet + Private Endpoints</span>
              <span className="font-medium text-foreground">~$20/mes</span>
            </div>
            <div className="mt-3 flex justify-between border-t border-border pt-3">
              <span className="font-semibold text-foreground">Total estimado</span>
              <span className="text-lg font-bold text-accent">~$250/mes</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            * Free Trial incluye $200 USD de créditos. El primer mes es prácticamente gratis.
          </p>
        </div>
      </div>
    </div>
  )
}
