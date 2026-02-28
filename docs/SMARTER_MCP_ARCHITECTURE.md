# 🧠 Arquitectura de SmarterMCP

SmarterMCP ha evolucionado de ser un simple script de validación (relacionado con los OTP de Twilio y el puente de identidad `flow.smarterbot.cl`) a convertirse en un **Servidor MCP (Model Context Protocol)** completo.

## 🔄 Evolución del Sistema

### Arquitectura Anterior (Twilio/Flow)
Originalmente, el diseño del script y del puente de identidad se componía de:
- Un frontend en `flow.smarterbot.cl` que gestionaba las identificaciones ligeras (vía SMS OTP de Twilio).
- Generación de un JWT que redirigía al dashboard.
- Un script local `smartermcp.py` que actuaba únicamente como una **CLI (Command Line Interface)** para listar y solicitar manualmente la ejecución de flujos a la API (`/api/v1/flows`).

### Nueva Arquitectura (Servidor MCP para IA)
Actualmente, `smartermcp.py` ya no es solo una CLI. Hace uso del estándar **Model Context Protocol** (a través de la librería `FastMCP`) para servir de "puente" nativo entre tu orquestador (backend Dockerizado en el puerto `8001`) y agentes o asistentes de Inteligencia Artificial (como Cursor, Claude, o n8n).

La IA ahora posee capacidades directas para descubrir y ejecutar las herramientas de tu ecosistema.

## 🛠️ Herramientas Expuestas para la IA

A través del servidor MCP, cualquier LLM o IDE conectado (mediante `mcp.json`) tiene acceso a las siguientes tareas delegadas:

1. 📊 **`get_client_data(client_id)`**
   - **Propósito:** Consulta la información de la cuenta o del inquilino (tenant) en tiempo real.
   - **Flujo:** Comunica al orquestador para resolver datos del cliente.

2. 💰 **`list_sales(client_id)`**
   - **Propósito:** Recupera el historial de las últimas transacciones y ventas de un inquilino específico.
   - **Flujo:** Cruza los datos de facturación/ventas asociados al tenant ID.

3. 🚀 **`provision_erp(client_id, rut)`**
   - **Propósito:** Automatización integral de infraestructura (la más potente). 
   - **Flujo:** La IA le envía al backend la instrucción de provisionar una nueva instancia de **Odoo/ERP** para un cliente (clonación de DB template y configuración del dominio/subdominio) con tan solo requerir el RUT, ahorrando todo el despliegue manual.

## 🔗 Conexión al Orquestador

El archivo `smartermcp.py` opera bajo tu entorno virtualizado de Python (`venv`) y se comunica localmente mediante peticiones POST con tu orquestador en Docker:

```
[ Agente IA (Cursor/Claude) ]
           |
           | (Interfaz MCP stdio)
           v
[ smartermcp.py (FastMCP) ] -> [ POST http://localhost:8001/api/v1/flows/execute ] -> [ Backend Orquestador FastAPI ]
```

De esta forma, todo se estandariza. El código ya no está acoplado explícitamente a una interfaz o un auth (como Twilio), sino que se volvió tu marco de abstracción para proveer herramientas (Tools) de forma desatendida y segura a las distintas IAs que asisten en SmarterOS.
