#!/usr/bin/env python3
import os
import json
import httpx
import asyncio
import logging
from mcp.server.fastmcp import FastMCP

# Configuración
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("smartermcp")

# Endpoints
EXPRESS_BRIDGE_URL = os.getenv("SMARTERMCP_BRIDGE_URL", "http://localhost:3100")
SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")

# Inicializar FastMCP
mcp = FastMCP("SmarterOS-Advanced")

@mcp.tool()
async def get_tenant_by_rut(rut: str) -> str:
    """
    Busca información detallada de un tenant usando su RUT.
    """
    async with httpx.AsyncClient() as client:
        try:
            url = f"{EXPRESS_BRIDGE_URL}/api/mcp/tenant/{rut}"
            resp = await client.get(url, timeout=10.0)
            if resp.status_code == 200:
                return json.dumps(resp.json(), indent=2)
            else:
                # Intento fallback directo a Supabase si el bridge falla o no encuentra
                headers = {
                    "apikey": SUPABASE_KEY,
                    "Authorization": f"Bearer {SUPABASE_KEY}"
                }
                sb_url = f"{SUPABASE_URL}/rest/v1/accounts?rut=eq.{rut}&select=*"
                sb_resp = await client.get(sb_url, headers=headers)
                return json.dumps(sb_resp.json(), indent=2)
        except Exception as e:
            return f"Error: {str(e)}"

@mcp.tool()
async def install_workflow(workflow_id: str, rut: str) -> str:
    """
    Instala un flujo de automatización (workflow) específico para un cliente identificado por su RUT.
    """
    async with httpx.AsyncClient() as client:
        try:
            resp = await client.post(
                f"{EXPRESS_BRIDGE_URL}/api/mcp/install-workflow",
                json={"workflowId": workflow_id, "rut": rut},
                timeout=30.0
            )
            return json.dumps(resp.json(), indent=2)
        except Exception as e:
            return f"Error instalando workflow: {str(e)}"

@mcp.tool()
async def execute_odoo_operation(rut: str, operation: str, params: dict = None) -> str:
    """
    Ejecuta una operación en la instancia de Odoo de un cliente.
    Operaciones comunes: 'list_partners', 'create_sale_order', 'get_stock'.
    """
    async with httpx.AsyncClient() as client:
        try:
            resp = await client.post(
                f"{EXPRESS_BRIDGE_URL}/api/mcp/odoo",
                json={
                    "operation": operation,
                    "params": params or {},
                    "rut": rut
                },
                timeout=30.0
            )
            return json.dumps(resp.json(), indent=2)
        except Exception as e:
            return f"Error en operación Odoo: {str(e)}"

@mcp.tool()
async def list_available_workflows() -> str:
    """
    Lista todos los flujos de automatización disponibles en el catálogo.
    """
    async with httpx.AsyncClient() as client:
        try:
            # Llamamos a la API existente de Next.js
            resp = await client.get("http://localhost:3000/api/workflows")
            return json.dumps(resp.json(), indent=2)
        except Exception as e:
            # Fallback a una lista resumida si no hay conexión
            return "Error conectando al catálogo. Workflows comunes: whatsapp-leads, odoo-sync, daily-reports."

if __name__ == "__main__":
    mcp.run()
