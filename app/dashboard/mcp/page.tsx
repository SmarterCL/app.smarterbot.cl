import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import McpConsoleClient from '@/components/mcp-console-client'

export default async function McpConsolePage() {
  const { userId } = await auth()
  if (!userId) redirect('/')
  
  const mcpEnabled = process.env.MCP_ENABLED === 'true'
  
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">MCP Console</h1>
            <p className="text-muted-foreground mt-1">Model Context Protocol Tool Tester</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`px-3 py-1 rounded text-xs font-medium ${mcpEnabled ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {mcpEnabled ? 'ENABLED' : 'DISABLED'}
            </div>
          </div>
        </div>
        
        <McpConsoleClient mcpEnabled={mcpEnabled} />
      </div>
    </div>
  )
}
