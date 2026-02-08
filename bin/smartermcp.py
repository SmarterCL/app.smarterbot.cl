#!/usr/bin/env python3
import sys
import json
import httpx
import argparse

API_URL = "http://localhost:8081"

def list_flows():
    try:
        url = f"{API_URL}/api/v1/flows"
        with httpx.Client() as client:
            resp = client.get(url)
            if resp.status_code == 200:
                data = resp.json()
                print("Flujos disponibles en SmarterMCP:")
                for flow in data.get("flows", []):
                    print(f" - {flow['name']}: {flow['description']}")
            else:
                print(f"No se pudieron cargar los flujos ({resp.status_code})")
    except Exception as e:
        print(f"Error cargando flujos: {e}")

def execute_flow(flow_name, client_id, payload_str):
    try:
        payload = json.loads(payload_str) if payload_str else {}
        url = f"{API_URL}/api/v1/flows/execute"
        print(f"Ejecutando '{flow_name}' para el cliente {client_id}...")
        
        with httpx.Client() as client:
            resp = client.post(url, json={
                "client_id": client_id,
                "flow_name": flow_name,
                "payload": payload
            }, timeout=30.0)
            
            if resp.status_code == 200:
                print(json.dumps(resp.json(), indent=2))
            else:
                print(f"Error ({resp.status_code}): {resp.text}")
    except Exception as e:
        print(f"Error: {str(e)}")

def main():
    parser = argparse.ArgumentParser(description="SmarterMCP CLI - Interfaz de comandos para SmarterOS")
    subparsers = parser.add_subparsers(dest="command")

    # List
    subparsers.add_parser("list", help="Listar flujos disponibles")

    # Execute
    exec_parser = subparsers.add_parser("execute", help="Ejecutar un flujo")
    exec_parser.add_argument("flow", help="Nombre del flujo")
    exec_parser.add_argument("client_id", help="ID del cliente/tenancy")
    exec_parser.add_argument("--payload", default="{}", help="Payload JSON (opcional)")

    args = parser.parse_args()

    if args.command == "list":
        list_flows()
    elif args.command == "execute":
        execute_flow(args.flow, args.client_id, args.payload)
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
