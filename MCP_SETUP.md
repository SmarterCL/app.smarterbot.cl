# 🚀 SmarterMCP Setup Guide

SmarterOS ahora utiliza el **Model Context Protocol (MCP)** para permitir que agentes externos (Cursor, Claude, VSCode) se conecten directamente a tu nodo y utilicen tus herramientas y datos.

## **1. Configuración Estándar para Clientes**

Para activar SmarterMCP en tu agente (por ejemplo, en Claude Desktop o Cursor), usa el siguiente formato de configuración:

```json
{
  "mcpServers": {
    "smartermcp": {
      "command": "npx",
      "args": [
        "-y",
        "@smarterbot/mcp-client"
      ],
      "env": {
        "SMARTER_API_KEY": "TU_API_KEY_AQUI",
        "SMARTER_NODE": "https://os.smarterbot.cl",
        "SMARTER_AGENT": "copaw",
        "wallet": "openclaw",
        "plan": "demo"
      }
    }
  }
}
```

## **2. Versión de Onboarding Rápido (Single)**

Si prefieres una activación simplificada:

```json
{
  "key": "sk_demo_xxxx",
  "name": "SmarterMCP",
  "command": "npx @smarterbot/mcp-client"
}
```

---

## 🎯 **Capacidades del Agente**

Una vez conectado, el agente podrá:
- **Ejecutar flujos n8n** directamente.
- **Consultar la base de datos** del tenant de forma segura.
- **Orquestar pagos** y validar identidades (RUT/SII).
- **Interactuar con tu wallet** OpenClaw.

---

## 📋 **Flujo de Activación**

```
Signup → API KEY → MCP Config → Cliente MCP → Nodo SmarterOS → Copaw Container → Agente Activo
```

---

## 🎯 **Endpoints del Nodo**

- **Bridge Local:** `http://127.0.0.1:8088/mcp`
- **Bridge Externo:** `https://os.smarterbot.cl/mcp`

---

**🎉 SmarterOS se convierte en tu Agent Hosting Platform personal con wallet integrada.**