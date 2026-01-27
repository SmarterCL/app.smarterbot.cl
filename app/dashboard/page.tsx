import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase"
import DashboardContent from "@/components/dashboard-content"
import TenantSelector from "@/components/tenant-selector"
import ServiceCard from "@/components/service-card"
import React from "react"

function TenantDashboardClient() {
  "use client";
  const [selected, setSelected] = React.useState<any>(null);
  const [sending, setSending] = React.useState(false);
  const [testResult, setTestResult] = React.useState<string | null>(null);

  async function sendTest() {
    setSending(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/contacts/test", { method: "POST" });
      const data = await res.json();
      setTestResult(data.ok ? "Contacto enviado" : data.error || "Error");
    } catch (e: any) {
      setTestResult(e.message);
    } finally {
      setSending(false);
    }
  }

  const services = selected?.services_enabled || {};

  return (
    <div className="space-y-6">
      <TenantSelector onChange={setSelected} selectedId={selected?.id} />
      {selected && (
        <div className="grid gap-4 md:grid-cols-3">
          <ServiceCard name="CRM" enabled={services.crm} link={selected?.chatwoot_inbox_id ? `https://crm.smarterbot.cl` : undefined} />
          <ServiceCard name="BOT" enabled={services.bot} link={selected?.botpress_workspace_id ? `https://bot.smarterbot.cl` : undefined} />
          <ServiceCard name="ERP" enabled={services.erp} link={selected?.odoo_company_id ? `https://erp.smarterbot.cl` : undefined} />
          <ServiceCard name="Workflows" enabled={services.workflows} link={selected?.n8n_project_id ? `https://n8n.smarterbot.cl` : undefined} />
          <ServiceCard name="KPI" enabled={services.kpi} link={selected?.metabase_dashboard_id ? `https://kpi.smarterbot.cl` : undefined} />
        </div>
      )}
      <div className="space-y-2">
        <button
          onClick={sendTest}
          disabled={sending}
          className="px-4 py-2 rounded bg-primary text-primary-foreground text-sm"
        >
          {sending ? "Enviando..." : "Enviar contacto de prueba"}
        </button>
        {testResult && <div className="text-xs text-muted-foreground">{testResult}</div>}
      </div>
    </div>
  );
}

export default async function Dashboard() {
  const supabase = createClient();

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="space-y-8">
      <TenantDashboardClient />
      <DashboardContent />
    </div>
  )
}
