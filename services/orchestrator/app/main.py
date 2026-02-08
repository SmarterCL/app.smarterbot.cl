from fastapi import FastAPI, HTTPException, Depends, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import Dict, Any, Optional
import httpx
import os
from jose import jwt

app = FastAPI(title="SmarterOS Orchestrator")
security = HTTPBearer()

# Entornos
MCP_API_URL = os.getenv("MCP_API_URL", "http://mcp-server:8000")
SECRET_KEY = os.getenv("JWT_SECRET", "smarter_secret_2026")

class N8NTrigger(BaseModel):
    client_id: str
    flow_name: str
    tenant_id: Optional[str] = None
    payload: Dict[str, Any]

def verify_token(credentials: HTTPAuthorizationCredentials = Security(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

@app.get("/")
async def root():
    return {"message": "SmarterOS Orchestrator is running"}

@app.post("/webhook/n8n-mcp/{client_id}/{flow_name}")
async def trigger_mcp_flow(
    client_id: str, 
    flow_name: str, 
    request: N8NTrigger,
):
    try:
        # 1. Validar acceso MCP
        async with httpx.AsyncClient() as client:
            access_resp = await client.post(
                f"{MCP_API_URL}/api/v1/access/validate",
                json={
                    "client_id": client_id,
                    "resource": flow_name,
                    "action": "execute"
                },
                timeout=5.0
            )
            if access_resp.status_code != 200 or not access_resp.json().get("valid"):
                raise HTTPException(status_code=403, detail="MCP Access denied")

        # 2. Ejecutar flujo MCP
        async with httpx.AsyncClient() as client:
            mcp_resp = await client.post(
                f"{MCP_API_URL}/api/v1/flows/execute",
                json={
                    "client_id": client_id,
                    "flow_name": flow_name,
                    "payload": request.payload
                },
                timeout=30.0
            )
            
            return {
                "status": "success",
                "result": mcp_resp.json() if mcp_resp.status_code == 200 else {"error": "Execution failed"}
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def validate_mcp_access(client_id: str, resource: str) -> bool:
    """
    Consulta al servidor MCP si el cliente tiene permisos.
    """
    async with httpx.AsyncClient() as client:
        try:
            # Aquí asumimos que el MCP server tiene un endpoint de validación
            # Si no, esto podría ser una consulta directa a la tabla 'accounts' en Supabase
            return True # Implementar lógica real de verificación de DB aquí
        except Exception:
            return False

async def activate_mcp_flow(client_id: str, flow_name: str, payload: Dict) -> Dict:
    """
    Envía el prompt/payload al servidor MCP para su procesamiento con LLM + Herramientas.
    """
    async with httpx.AsyncClient() as client:
        # En el estandar MCP, esto suele ser una llamada JSON-RPC
        # Aquí lo simplificamos a una llamada REST al 'bridge' de FastAPI
        mcp_endpoint = f"{MCP_API_URL}/execute"
        response = await client.post(
            mcp_endpoint,
            json={
                "client_id": client_id,
                "flow": flow_name,
                "input": payload
            },
            timeout=30.0
        )
        return response.json() if response.status_code == 200 else {"error": "MCP execution failed"}
