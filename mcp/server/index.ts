import { Server } from '@modelcontextprotocol/sdk/server';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio';
import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { tenantTools } from '../tools/supabase-tenants';

const ENABLED = process.env.MCP_ENABLED === 'true';

// Minimal MCP server scaffold. Will register tools in future phases.

async function main() {
  if (!ENABLED) {
    // eslint-disable-next-line no-console
    console.log('[MCP] Disabled (set MCP_ENABLED=true to activate)');
    return;
  }

  const server = new Server({ name: 'smarterbot-mcp', version: '0.0.1' });
  const tools: Tool[] = [
    {
      name: 'tenants.list',
      description: 'List active tenants for the authenticated Clerk user',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    },
    {
      name: 'tenants.get',
      description: 'Get a tenant by UUID (must belong to authenticated user)',
      inputSchema: {
        type: 'object',
        properties: { id: { type: 'string', description: 'Tenant UUID' } },
        required: ['id'],
        additionalProperties: false,
      },
    },
    {
      name: 'tenants.create',
      description: 'Create a new tenant (rut, businessName)',
      inputSchema: {
        type: 'object',
        properties: {
          rut: { type: 'string' },
          businessName: { type: 'string' },
        },
        required: ['rut', 'businessName'],
        additionalProperties: false,
      },
    },
    {
      name: 'tenants.updateServices',
      description: 'Update tenant services_enabled flags',
      inputSchema: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          services: { type: 'object', additionalProperties: { type: 'boolean' } },
        },
        required: ['id', 'services'],
        additionalProperties: false,
      },
    },
  ];
  server.setTools(tools);
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // eslint-disable-next-line no-console
  console.log('[MCP] Server started: smarterbot-mcp v0.0.1');
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('[MCP] Fatal error', err);
  process.exit(1);
});
