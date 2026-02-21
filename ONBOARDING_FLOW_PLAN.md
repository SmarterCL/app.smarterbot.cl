# Plan de Implementación: Onboarding, Flow y Trial de 15 Días

Este documento describe la secuencia exacta sugerida para orquestar el alta de un nuevo inquilino (tenant) en SmarterOS, conectando la identidad principal, la pasarela de pago (Flow) y la asignación del entorno de prueba (Demo 15 días).

## Fase 1: Identidad Central (MAIN KEY)
**Contexto**: El sistema `app.smarterbot.cl` funciona como el orquestador principal (Control Plane).
1. El usuario se registra/inicia sesión a través de **Clerk** en `app.smarterbot.cl`.
2. Al autenticarse, se genera o asocia un UUID de usuario y un Token JWT. Esta identidad es la **MAIN KEY**, que servirá de "llave de paso" maestra para todas las aplicaciones y microservicios del ecosistema (Odoo, n8n, FastAPI).

## Fase 2: Recolección de Datos Core
1. Tras el registro (`/signup`), el usuario es redirigido a un Wizard interno (`/dashboard/onboarding` o similar).
2. Se solicita y valida el **RUT** de la empresa. Este RUT será la semilla para crear una nueva **base de datos aislada** (ej: `db_76xxxxxx`) en Odoo, la cual será operada directamente desde esta consola (`app.smarterbot.cl`).
3. (Opcional) Captura de otros datos que ya tenemos pre-completados por el SSO (Nombre, Email, etc.).

## Fase 3: Validación y Trial (Integración Flow.cl)
**Objetivo**: Obtener la tokenización de pago o "device" asegurando la identidad financiera y activar la cuenta DEMO.
1. Una vez con el RUT, el sistema presenta el plan seleccionado (Trial 15 días gratis).
2. El usuario es redirigido a la pasarela **Flow.cl** para suscribirse o atar un medio de pago, incluso si el cargo inicial es $0.
3. Se realiza la transacción. Flow retorna un Webhook (o redirection) al sistema con el `token_suscripción` o el identificador del "device/order".
4. **Condición DEMO 15 días**: La suscripción se crea en estado `active_trial` calculando la fecha de vencimiento (`timestamp_actual + 15 días`).

## Fase 4: Despliegue de Infraestructura y Obtención de KEY
1. Al confirmarse el retorno de Flow, el backend (o The Conductor a través de n8n/FastAPI) toma la petición con todas las variables recolectadas:
- `MAIN KEY` (User Auth Clerk)
- `RUT` (Del onboarding)
- `FLOW_TOKEN` (Validación de pago).
2. El sistema reserva y despliega la base de datos PostgreSQL, el contenedor Odoo v16 / v19, instancias aisladas, etc.
3. Se genera la sub-llave de acceso local para ese entorno (**Tenant Key / SmarterMCP Key**) asociada al "Device" asignado (el servidor Mac Mini M4 que procesará al cliente).
4. El usuario es redirigido finalmente a su dashboard (en `app.smarterbot.cl/dashboard`). Las consultas y vistas consumen la base de datos específica seleccionada mediante el ID del usuario / Session token, sin necesidad de navegar a subdominios externos.

## Próximos Pasos Técnicos Sugeridos:
- Integrar la API / SDK de Flow (ej. `flowcl-node-api-client` que ya está en `package.json`).
- Crear el componente `tenant-wizard.tsx` para captura del RUT (se ve que existe parcialmente en la carpeta components).
- Crear el Endpoint `api/webhooks/flow` para procesar la confirmación y hacer update en Supabase del status a `DEMO_ACTIVE`.
