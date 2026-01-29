# Configuración de Vercel para app.smarterbot.cl

## Variables de Entorno Requeridas

### 1. NEXT_PUBLIC_SUPABASE_URL

Key: NEXT_PUBLIC_SUPABASE_URL
Value: https://your-project.supabase.co

### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY

Key: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxxxxxxxxxxxxx

### 3. FASTAPI_URL

Key: FASTAPI_URL
Value: https://api.smarterbot.cl

## Variables de Entorno Opcionales

### 4. NEXT_PUBLIC_DEMO_MODE

Key: NEXT_PUBLIC_DEMO_MODE
Value: true (para activar modo demo)

### 5. RESEND_API_KEY

Key: RESEND_API_KEY
Value: re_1234567890 (clave API para envío de emails)

## Pasos para Despliegue

1. Conecta tu repositorio a Vercel
2. Agrega las variables de entorno mencionadas arriba
3. Asegúrate de que el framework preset esté configurado como "Next.js"
4. El comando de build predeterminado debería ser suficiente: `pnpm build`
5. El directorio de salida predeterminado debería ser: `.next`

## Verificación Post-Despliegue

- [ ] La aplicación carga correctamente
- [ ] El dashboard requiere autenticación
- [ ] Las funciones de la API responden adecuadamente
- [ ] La conexión a Supabase funciona correctamente