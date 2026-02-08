# 📜 SmarterOS - Normas de Codificación (Rules of the Game)

Para mantener una plataforma Enterprise robusta, escalable y mantenible, todos los colaboradores y procesos de IA deben seguir estas normas estrictas.

## 1. Arquitectura de Directorios Optimizada
- `app/`: Rutas, layouts y server components (Next.js 16 App Router).
- `components/ui/`: Componentes base (Shadcn/UI, Radix). Únicamente visuales.
- `components/modules/`: Componentes con lógica de negocio o estado complejo.
- `lib/`: Utilidades core, clientes de API (Supabase, Messaging, Payments).
- `services/`: Lógica de integración externa (Integración con Flow, Odoo, Botpress).
- `hooks/`: Lógica de estado reutilizable en el cliente.
- `actions/`: Server Actions para mutaciones de base de datos (Supabase).
- `types/`: Definiciones de TypeScript unificadas.

## 2. Tipado Estricto (TypeScript)
- **Cero `any`**: El uso de `any` está prohibido. Si un tipo es desconocido, usar `unknown` y validar.
- **Interfaces sobre Types**: Preferir `interface` para objetos que puedan ser extendidos.
- **Enums**: Usar `Enums` para estados fijos (ej. `PaymentStatus`, `IntegrationType`).

## 3. Manejo de Datos y Estado
- **fetching**: Usar Server Components para lectura de datos inicial.
- **mutations**: Usar Server Actions (`'use server'`) para insertar o actualizar datos.
- **Auth**: La fuente única de verdad para el usuario es `SupabaseProvider`.

## 4. UI/UX y Estética (Aesthetics First)
- **Glassmorphism**: Uso de fondos translúcidos, desenfoques (`backdrop-blur`) y bordes sutiles.
- **Micro-interacciones**: Todo botón o acción debe tener un estado hover/active y feedback visual (Sonner/Toast).
- **Responsive**: Mobile-first siempre. Las cajas deben ajustarse dinámicamente (`flex-wrap`, `grid-cols-auto`).

## 5. Integración y Mensajería
- **Messaging Service**: Toda comunicación (WhatsApp/SMS) debe pasar por el `MessagingService` centralizado para logging y control de calidad.
- **Seguridad**: Nunca exponer keys sensibles en el cliente (usar `NEXT_PUBLIC_` solo para lo estrictamente necesario).

---

*Estas normas son de cumplimiento obligatorio para asegurar que SmarterOS sea el Sistema Operativo Empresarial definitivo.*
