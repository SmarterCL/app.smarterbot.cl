from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import Dict, Any, List
import asyncpg
import os

app = FastAPI(title="SmarterMCP HTTP Bridge")

# Helper para obtener secretos de Docker
def get_secret(name: str, default: str = None) -> str:
    file_path = os.getenv(f"{name}_FILE")
    if file_path and os.path.exists(file_path):
        try:
            with open(file_path, "r") as f:
                return f.read().strip()
        except Exception:
            pass
    return os.getenv(name, default)

DATABASE_URL = get_secret("DATABASE_URL", "postgresql://postgres:postgres_password@db:5432/postgres")

class FlowExecutionRequest(BaseModel):
    client_id: str
    flow_name: str
    payload: Dict[str, Any]

class AccessValidationRequest(BaseModel):
    client_id: str
    resource: str
    action: str

import time

async def get_db():
    retries = 5
    while retries > 0:
        try:
            conn = await asyncpg.connect(DATABASE_URL)
            try:
                yield conn
            finally:
                await conn.close()
            return
        except Exception as e:
            print(f"Database not ready, retrying... ({retries} left). Error: {e}")
            retries -= 1
            time.sleep(2)
    raise HTTPException(status_code=500, detail="Database connection failed after multiple retries")

@app.post("/api/v1/access/validate")
async def validate_access(request: AccessValidationRequest, db = Depends(get_db)):
    # Lógica de validación: Buscar si el cliente existe en 'accounts' o 'profiles'
    try:
        row = await db.fetchrow("SELECT id FROM public.accounts WHERE owner_id::text = $1 OR id::text = $1", request.client_id)
        if row:
            return {"valid": True}
        
        # Si no está en accounts, buscamos en profiles
        row = await db.fetchrow("SELECT id FROM public.profiles WHERE id::text = $1", request.client_id)
        return {"valid": row is not None}
    except Exception as e:
        print(f"Error validating access: {e}")
        return {"valid": False}

@app.post("/api/v1/flows/execute")
async def execute_flow(request: FlowExecutionRequest, db = Depends(get_db)):
    """
    Ejecuta un flujo MCP (Consulta herramientas de DB para el LLM o n8n)
    """
    client_id = request.client_id
    flow = request.flow_name
    
    try:
        if flow == "get_client_data":
            # Herramienta: Obtener datos del cliente
            data = await db.fetchrow("SELECT * FROM public.accounts WHERE id::text = $1 OR owner_id::text = $1", client_id)
            return {"status": "executed", "result": dict(data) if data else {}}
        
        elif flow == "list_sales":
            # Herramienta: Listar últimas ventas
            sales = await db.fetch("SELECT * FROM public.sales_history WHERE tenant_id::text = $1 ORDER BY created_at DESC LIMIT 5", client_id)
            return {"status": "executed", "result": [dict(s) for s in sales]}
            
        elif flow == "provision_erp":
            # Herramienta: Crear base de datos aislada para el tenant
            rut = request.payload.get("rut", "").replace(".", "").replace("-", "")
            if not rut:
                return {"status": "error", "message": "RUT is required"}
            
            db_name = f"smarter_{rut}"
            try:
                # 1. Conectamos al servidor de bases de datos de Odoo (usamos env vars dedicadas)
                ODOO_DB_URL = get_secret("ODOO_DB_URL", DATABASE_URL)
                conn = await asyncpg.connect(ODOO_DB_URL)
                
                # 2. Verificamos si ya existe
                exists = await conn.fetchval("SELECT 1 FROM pg_database WHERE datname = $1", db_name)
                if exists:
                    await conn.close()
                    return {"status": "already_exists", "db_name": db_name}
                
                # 3. Clonamos desde el template maestro 'smarter_base' que creamos en el VPS
                # Nota: CREATE DATABASE no puede ejecutarse dentro de una transacción
                await conn.execute(f'CREATE DATABASE {db_name} TEMPLATE smarter_base OWNER odoo')
                await conn.close()
                
                return {
                    "status": "success", 
                    "db_name": db_name,
                    "url": f"https://{rut}.smarterbot.cl"
                }
            except Exception as e:
                return {"status": "error", "message": f"Provisioning failed: {str(e)}"}
            
        return {"status": "error", "message": f"Flow '{flow}' not found"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.get("/health")
async def health():
    return {"status": "ok"}
