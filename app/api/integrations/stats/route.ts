import { NextResponse } from 'next/server'

const API_BASE = process.env.SMARTEROS_API_URL || 'https://api.smarterbot.cl'
const API_KEY = process.env.SMARTEROS_API_KEY

/**
 * GET /api/integrations/stats
 * 
 * Obtiene estadísticas desde la API externa de SmarterOS
 * Incluye: transacciones, dominios, catálogo, integraciones
 */
export async function GET() {
  try {
    // Fetch stats from external API
    const [statsRes, transactionsRes, domainsRes] = await Promise.all([
      fetch(`${API_BASE}/v1/hub/stats`, {
        headers: API_KEY ? { 'X-Api-Key': API_KEY } : {},
      }).catch(() => null),
      fetch(`${API_BASE}/api/v1/webhooks/transactions?limit=10`, {
        headers: API_KEY ? { 'X-Api-Key': API_KEY } : {},
      }).catch(() => null),
      fetch(`${API_BASE}/web-domains/`, {
        headers: API_KEY ? { 'X-Api-Key': API_KEY } : {},
      }).catch(() => null),
    ])

    const stats = await statsRes?.json().catch(() => ({})) || {}
    const transactions = await transactionsRes?.json().catch(() => ({})) || {}
    const domains = await domainsRes?.json().catch(() => []) || []

    // Build dashboard data
    const dashboardData = {
      // Integration stats
      integrations: {
        meli_products: stats.meli_products || 0,
        orders_processed: stats.orders_processed || 0,
        webhooks_received: stats.webhooks_received || 0,
        api_calls_today: stats.api_calls_today || 0,
      },

      // Recent transactions
      transactions: Array.isArray(transactions.transactions)
        ? transactions.transactions.slice(0, 10)
        : [],

      // Web domains
      domains: Array.isArray(domains) ? domains : [],

      // Catalog stats
      catalog: {
        hardware_items: stats.catalog_hardware || 0,
        software_items: stats.catalog_software || 0,
        total_items: (stats.catalog_hardware || 0) + (stats.catalog_software || 0),
      },

      // Health status
      health: {
        api: true,
        meli: stats.meli_health ?? true,
        odoo: stats.odoo_health ?? true,
        n8n: stats.n8n_health ?? true,
      },

      // Currency info (UF Chile)
      currency: {
        uf_value: stats.uf_value || 35000,
        updated_at: stats.uf_updated_at || new Date().toISOString(),
      },
    }

    return NextResponse.json(dashboardData)
  } catch (error) {
    console.error('Error fetching integration stats:', error)
    
    // Return mock data for demo purposes
    return NextResponse.json({
      integrations: {
        meli_products: 0,
        orders_processed: 0,
        webhooks_received: 0,
        api_calls_today: 0,
      },
      transactions: [],
      domains: [],
      catalog: {
        hardware_items: 0,
        software_items: 0,
        total_items: 0,
      },
      health: {
        api: true,
        meli: true,
        odoo: true,
        n8n: true,
      },
      currency: {
        uf_value: 35000,
        updated_at: new Date().toISOString(),
      },
    })
  }
}
