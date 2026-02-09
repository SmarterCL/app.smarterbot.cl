# Guía de Integración Frontend: Registro de Tenants

## 1. Descripción General
Esta documentación define el contrato de interfaz entre el Frontend (Next.js) y el Backend para el proceso de **Registro de Tenants**. El objetivo es que el frontend capture los datos, los envíe al backend y maneje los estados de respuesta (éxito, error, carga) para la redirección final del usuario.

## 2. Contrato de API

### A. Registro de Nuevo Tenant
**Endpoint**: `POST /api/tenants/register`
**Autenticación**: Requerida (Bearer Token o Cookie de Sesión)

#### Petición (Request Payload)
El frontend debe enviar un objeto JSON con la siguiente estructura estricta:

```json
{
  "rut": "12.345.678-9",          // String. Formato chileno con puntos y guión. (Obligatorio)
  "email": "cliente@empresa.cl",  // String. Email corporativo o de administración. (Obligatorio)
  "businessName": "Empresa SpA",  // String. Razón social o nombre de fantasía. (Obligatorio)
  "modules": {                    // Object. Configuración inicial de módulos.
    "webPage": true,              // Boolean. Activar módulo de página web.
    "qrInvoicing": false          // Boolean. Activar módulo de facturación QR.
  }
}
```

#### Respuesta de Éxito (HTTP 200/201)
```json
{
  "success": true,
  "data": {
    "tenantId": "tenant_123456789_cliente",
    "accessUrl": "https://tenant-123456789.smarterbot.cl",
    "status": "provisioning"      // El backend indica que está procesando
  },
  "message": "Tenant registrado exitosamente. La instancia se está aprovisionando."
}
```

#### Respuestas de Error
*   **400 Bad Request**: Datos inválidos (ej: RUT mal formado).
    ```json
    { "success": false, "error": "INVALID_RUT", "message": "El RUT ingresado no es válido." }
    ```
*   **409 Conflict**: El RUT o Email ya existe.
    ```json
    { "success": false, "error": "ALREADY_EXISTS", "message": "Este RUT ya se encuentra registrado." }
    ```
*   **500 Server Error**: Fallo interno.

---

### B. Consulta de Estado (Polling)
*Opcional: Si el provisionamiento no es inmediato, el frontend puede consultar el estado.*

**Endpoint**: `GET /api/tenants/:tenantId/status`

#### Respuesta
```json
{
  "status": "ready", // o 'provisioning', 'error'
  "accessUrl": "https://tenant-123456789.smarterbot.cl"
}
```

---

## 3. Responsabilidades del Frontend

### Validaciones (UX Inmediata)
Antes de enviar la petición, el frontend debe validar:
1.  **Formato de RUT**: Validar dígito verificador y formato (XX.XXX.XXX-X).
2.  **Formato de Email**: Regex estándar de correo.
3.  **Campos Requeridos**: No permitir envío si faltan datos.

### Manejo de Estados (UI)
1.  **Idle**: Formulario habilitado.
2.  **Submitting (Loading)**:
    *   Bloquear botón de envío.
    *   Mostrar spinner o indicador de carga "Registrando tienda...".
3.  **Success**:
    *   Mostrar mensaje de éxito.
    *   Redirigir al usuario a `accessUrl` o al Dashboard con el nuevo tenant seleccionado.
    *   *Nota*: No mostrar detalles técnicos del backend (IDs de base de datos, logs internos).
4.  **Error**:
    *   Mostrar alerta legible basada en el campo `message` de la respuesta de error.
    *   Permitir reintentar si es un error de red.

---

## 4. Estructura de Datos en Frontend (Store/State)

Recomendamos mantener este esquema en el estado de React/Form:

```typescript
interface RegistrationFormState {
  rut: string;
  email: string;
  businessName: string;
  modules: {
    webPage: boolean;
    qrInvoicing: boolean;
  };
}
```
