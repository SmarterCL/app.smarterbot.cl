/**
 * Configuración de Integración: FastAPI + n8n + SmarterMCP
 * 
 * 1. El Flujo n8n (Trigger):
 *    - Nodo: HTTP Request
 *    - Método: POST
 *    - URL: ${FASTAPI_URL}/v1/orchestrate
 *    - Body (JSON):
 *      {
 *        "client_id": "{{ $node["Webhook"].json["id"] }}",
 *        "flow_name": "atencion_clientes_pro",
 *        "query": "El cliente pregunta por su estado de cuenta",
 *        "mcp_enabled": true
 *      }
 * 
 * 2. El Conductor (FastAPI):
 *    - Recibe el client_id y valida su suscripción en Supabase.
 *    - Si mcp_enabled es true, inicializa una sesión de Model Context Protocol.
 *    - El MCP Server (Docker) provee herramientas al LLM para consultar:
 *      - get_client_sales(client_id)
 *      - get_subscription_status(rut)
 * 
 * 3. Frontend (Lo que necesitas):
 *    - Un toggle "Habilitar Acceso MCP" en la vista de Empresa/Automatización.
 *    - Este toggle guarda un flag en la tabla `accounts.metadata->'mcp_access_enabled'`.
 */

export const mcpConfig = {
  endpoint: process.env.FASTAPI_URL + "/v1/mcp",
  headers: {
    "X-Smarter-Token": process.env.SMARTER_INTERNAL_KEY,
  }
};
