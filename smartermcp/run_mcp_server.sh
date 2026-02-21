#!/bin/bash
# Script para ejecutar el servidor SmarterMCP MCP
# Asegurarse de estar en el directorio correcto
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

# Cargar variables de entorno si existe .env en la raíz del proyecto
if [ -f "../.env" ]; then
    export $(grep -v '^#' ../.env | xargs)
fi

# Instalar dependencias si es necesario (asumiendo que venv está activo o usando el del proyecto)
# En este caso usamos el venv del proyecto principal para consistencia
../../app.smarterbot.cl/venv/bin/python mcp_server.py
