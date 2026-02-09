# Report: Frontend Integration & Schema Alignment

## Summary
Per your request, we have realigned the integration documentation and the database schema to ensure a clean separation of concerns between the Frontend (Next.js) and the Backend.

## 1. Frontend Integration Guide (`FRONTEND_INTEGRATION.md`)
**Status: UPDATED**
- **Action**: Removed all backend implementation details (database creation scripts, internal logic).
- **Focus**: Restricted the document to define the **API Contract** only.
- **Key Changes**:
  - Validated the JSON Payload structure: `{ rut, email, businessName, modules: { webPage, qrInvoicing } }`.
  - Defined explicit Success/Error response formats for UI implementation.
  - Clarified UX states (Loading vs Success vs Error).

## 2. Database Schema Alignment (`database/2026_02_09_tenant_modules.sql`)
**Status: ADJUSTED**
- **Action**: Created a new SQL migration file to support the multi-tenant module configuration.
- **Rationale**: The previous schema focused on *user* entitlements (`user_services`). The new schema adds *tenant* level configuration (`tenant_modules`) because features like "Web Page" or "QR Invoicing" belong to the Company (Tenant), not just a single user.
- **New Structure**:
  - `public.tenants`: Added `business_email` and `status` fields to support the registration flow.
  - `public.tenant_modules`: New table to store the enabled modules per tenant, matching the `modules` JSON object from the frontend.

## 3. Confirmed Schema
The Frontend and Database are now aligned on this data structure:

### Frontend Sends:
```json
{
  "modules": {
    "webPage": true,
    "qrInvoicing": false
  }
}
```

### Database Stores:
- **Table**: `public.tenant_modules`
- **Rows**:
  - `{ tenant_id: "...", module_code: "web_page", is_active: true }`
  - `{ tenant_id: "...", module_code: "qr_invoicing", is_active: false }`

This alignment ensures the backend can correctly persist the user's choices.
