# Especificación de Integración de Dominios

## Objetivo
Integrar rut.smarterbot.store, app.smarterbot.cl y crm.smarterbot.cl

## Requisitos
- Certificados SSL válidos para cada dominio
- Token de acceso seguro para SmarterMCP
- Configuración de CORS entre dominios
- Autenticación JWT centralizada

## Arquitectura
La integración utiliza un modelo centralizado de identidad donde `rut.smarterbot.store` actúa como el proveedor de identidad (IdP), `app.smarterbot.cl` es la aplicación de gestión (SmarterOS Hub) y `crm.smarterbot.cl` es el sistema de gestión de relaciones con clientes (Chatwoot).

La comunicación se asegura mediante el token `SMARTERMCP_ACCESS_TOKEN` y validación JWT.
