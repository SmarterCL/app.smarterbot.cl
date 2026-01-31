# 🚀 Comandos de Instalación

## **1. Instalar servidor MCP localmente**
```bash
# Instalar paquete MCP de Supabase
npx @supabase/mcp-server-supabase@latest --help

# O instalarlo globalmente
npm install -g @supabase/mcp-server-supabase
```

## **2. Iniciar servidor local**
```bash
# Con token de acceso
npx @supabase/mcp-server-supabase --access-token TU_TOKEN_AQUI

# Sin token (usará .env)
npx @supabase/mcp-server-supabase
```

---

## 🎯 **Herramientas Disponibles**

Una vez configurado, tendrás acceso a:

### **🗃️ Gestión de Base de Datos**
- Query SQL con IA
- Crear/modificar tablas
- Migraciones automáticas
- Generación de tipos TypeScript

### **🔧 Funciones Avanzadas**
- Branch management
- Config management
- Logging y debugging
- Database backups

### **⚡ Integración con tu App**
- Cursor/VSCode pueden acceder a tus datos directamente
- Claude puede analizar y ejecutar operaciones SQL
- ChatGPT puede interactuar con tu base de datos

---

## 📋 **Estructura Creada**

```
/Users/mac/dev/2025/app.smarterbot.cl/
├── .cursor/mcp.json          ← Configuración para IA
└── (proyecto optimizado)     ← Listo para MCP
```

---

## 🎯 **Próximos Pasos**

1. **Crea tu Personal Access Token** en Supabase
2. **Reemplaza el token** en el archivo .cursor/mcp.json
3. **Inicia Cursor** - MCP se conectará automáticamente
4. **Prueba** haciendo preguntas sobre tus datos

---

**🎉 ¡SmarterOS Hub ahora soporta IA avanzada con MCP!**