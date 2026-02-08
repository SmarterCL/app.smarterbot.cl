-- Semillas de prueba para SmarterOS MCP
-- Ejecutar en: http://localhost:5432 (o vía psql)

-- 1. Crear un usuario de prueba en auth.users (si no existe)
INSERT INTO auth.users (id, email)
VALUES ('00000000-0000-0000-0000-000000000000', 'demo@smarterbot.cl')
ON CONFLICT (id) DO NOTHING;

-- 2. Crear un perfil vinculado
INSERT INTO public.profiles (id, email, full_name, rut)
VALUES ('00000000-0000-0000-0000-000000000000', 'demo@smarterbot.cl', 'Usuario Demo SmarterOS', '12.345.678-9')
ON CONFLICT (id) DO NOTHING;

-- 3. Crear una cuenta (Tenant)
INSERT INTO public.accounts (id, owner_id, company_name, rut_company, plan_type)
VALUES (
  '11111111-1111-1111-1111-111111111111', 
  '00000000-0000-0000-0000-000000000000', 
  'Empresa de Prueba SpA', 
  '76.543.210-K', 
  'ENTERPRISE'
)
ON CONFLICT (id) DO NOTHING;

-- 4. Agregar historial de ventas ficticio
INSERT INTO public.sales_history (tenant_id, amount, metadata)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 45000.00, '{"note": "Venta presencial", "items": 3}'),
  ('11111111-1111-1111-1111-111111111111', 120000.00, '{"note": "Venta online", "items": 12}');
