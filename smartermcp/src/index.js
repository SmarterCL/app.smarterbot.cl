require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 3100;

app.use(cors());
app.use(express.json());

// Supabase Setup
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Basic Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'SmarterMCP Express Bridge' });
});

/**
 * Install a workflow for a specific tenant
 * POST /api/mcp/install-workflow
 */
app.post('/api/mcp/install-workflow', async (req, res) => {
    const { workflowId, rut } = req.body;
    console.log(`Installing workflow ${workflowId} for RUT ${rut}`);

    try {
        // 1. Simular instalación (en un entorno real aquí se llamaría a n8n API)
        // Por ahora registramos la intención en Supabase o respondemos éxito
        res.status(200).json({
            status: 'success',
            message: `Workflow ${workflowId} scheduled for installation on tenant ${rut}`,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Execute an Odoo operation
 * POST /api/mcp/odoo
 */
app.post('/api/mcp/odoo', async (req, res) => {
    const { operation, params, rut } = req.body;
    console.log(`Odoo Operation: ${operation} for RUT ${rut}`);

    try {
        // Aquí se conectaría con la instancia de Odoo del tenant
        res.status(200).json({
            status: 'success',
            operation,
            result: `Sample result for ${operation} on ${rut}`,
            data: params
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Get Tenant Information by RUT
 * GET /api/mcp/tenant/:rut
 */
app.get('/api/mcp/tenant/:rut', async (req, res) => {
    const { rut } = req.params;

    try {
        const { data, error } = await supabase
            .from('accounts') // Basado en el esquema que vi en main.py
            .select('*')
            .eq('rut', rut)
            .single();

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(404).json({ error: 'Tenant not found' });
    }
});

app.listen(port, () => {
    console.log(`SmarterMCP Express Bridge listening at http://localhost:${port}`);
});
