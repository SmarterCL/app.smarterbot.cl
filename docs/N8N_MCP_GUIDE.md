# 🤖 Guía: n8n + FastAPI + SmarterMCP

Esta guía explica cómo activar el acceso MCP desde un flujo de n8n usando tu **Client ID**.

## 1. El Nodo n8n (HTTP Request)
Para "hacer un prompt" que tenga acceso a tu base de datos vía MCP, configura un nodo **HTTP Request** así:

- **Method**: `POST`
- **URL**: `https://api.smarterbot.cl/v1/orchestrate` (o tu URL de FastAPI)
- **Authentication**: `Header: X-Smarter-Token`
- **Body Parameters (JSON)**:
```json
{
  "client_id": "TU_ID_DE_USUARIO_CLERK_O_SUPABASE",
  "flow_name": "nombre_del_flujo_n8n",
  "prompt": "Explica al cliente su estado de cuenta basándote en su historial de pagos.",
  "context": {
    "module": "payments",
    "mcp_enabled": true
  }
}
```

## 2. ¿Cómo funciona la conexión?
1. **n8n** envía el `client_id` + `prompt` a **FastAPI**.
2. **FastAPI** reconoce tu ID y activa el **MCP Server** (que corre en tu Docker).
3. El **MCP** le da "herramientas" al modelo (Gemini/Claude) para leer las tablas de Supabase:
   - `read_client_status(client_id)`
   - `list_last_sales(client_id)`
4. El modelo genera una respuesta inteligente usando tus datos reales y la devuelve a n8n.

## 3. Lo que necesitas en el Frontend
He añadido en tu Dashboard (`Pestaña Empresa`):
- **Indicator de Conexión MCP**: Verifica que el servidor Docker esté respondiendo.
- **Client ID Copy Tool**: Para copiar fácilmente tu ID a n8n.
- **Toggle de Acceso**: Para habilitar/deshabilitar esta conexión instantáneamente.

## 4. Ejemplo de Prompt Dinámico en n8n
Puedes usar variables de n8n en el prompt:
`"Hola IA, el cliente con RUT {{ $node["Webhook"].json["rut"] }} pregunta por su saldo. Usa el acceso MCP para responderle."`
