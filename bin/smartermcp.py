#!/usr/bin/env python3
import os
import sys
import json
import httpx
import asyncio
from mcp.server.fastmcp import FastMCP

# Configuración de la API
# Por defecto apuntamos al contenedor de mcp-server en el puerto 8001 (mapeado en docker-compose)
API_URL = os.getenv("SMARTERMCP_SERVER_URL", "http://localhost:8001")

# Inicializar FastMCP
mcp = FastMCP("SmarterOS")

@mcp.tool()
async def get_client_data(client_id: str) -> str:
    """
    Obtiene información básica de la cuenta de un cliente o tenant.
    """
    async with httpx.AsyncClient() as client:
        try:
            resp = await client.post(
                f"{API_URL}/api/v1/flows/execute",
                json={
                    "client_id": client_id,
                    "flow_name": "get_client_data",
                    "payload": {}
                },
                timeout=10.0
            )
            return json.dumps(resp.json(), indent=2)
        except Exception as e:
            return f"Error conectando con el orquestador: {e}"

@mcp.tool()
async def list_sales(client_id: str) -> str:
    """
    Obtiene el historial de las últimas ventas de un inquilino específico.
    """
    async with httpx.AsyncClient() as client:
        try:
            resp = await client.post(
                f"{API_URL}/api/v1/flows/execute",
                json={
                    "client_id": client_id,
                    "flow_name": "list_sales",
                    "payload": {}
                },
                timeout=10.0
            )
            return json.dumps(resp.json(), indent=2)
        except Exception as e:
            return f"Error conectando con el orquestador: {e}"

@mcp.tool()
async def provision_erp(client_id: str, rut: str) -> str:
    """
    Provisiona y configura una nueva instancia de Odoo/ERP para un cliente dado su RUT.
    Este proceso clona la base de datos template y activa el subdominio.
    """
    async with httpx.AsyncClient() as client:
        try:
            resp = await client.post(
                f"{API_URL}/api/v1/flows/execute",
                json={
                    "client_id": client_id,
                    "flow_name": "provision_erp",
                    "payload": {"rut": rut}
                },
                timeout=60.0
            )
            return json.dumps(resp.json(), indent=2)
        except Exception as e:
            return f"Error ejecutando provisionamiento: {e}"

def list_flows_cli():
    """Función de compatibilidad para listar flujos vía CLI"""
    print("SmarterMCP - Herramientas de Inteligencia Artificial disponibles:")
    print(" - get_client_data: Consulta información de cuentas")
    print(" - list_sales: Consulta historial de transacciones")
    print(" - provision_erp: Despliegue automático de instancias ERP")

def main():
    # Si se pasa 'list', actuamos como CLI para compatibilidad
    if len(sys.argv) > 1 and sys.argv[1] == "list":
        list_flows_cli()
    else:
        # Por defecto, iniciamos el servidor MCP (STDIO)
        mcp.run()

if __name__ == "__main__":
    main()
