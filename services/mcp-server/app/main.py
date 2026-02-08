from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import Dict, Any, List
import asyncpg
import os

app = FastAPI(title="SmarterMCP HTTP Bridge")

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres_password@db:5432/postgres")

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
            
        return {"status": "error", "message": f"Flow '{flow}' not found"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.get("/health")
async def health():
    return {"status": "ok"}
