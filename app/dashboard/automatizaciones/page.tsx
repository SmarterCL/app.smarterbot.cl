'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Activity,
  Calendar,
  Clock,
  TrendingUp 
} from 'lucide-react';

interface Workflow {
  id: string;
  name: string;
  description: string;
  category: string;
  executions_today: number;
  last_execution: string;
  status: 'active' | 'inactive';
  n8n_id?: number;
}

const ITEMS_PER_PAGE = 10;

export default function AutomatizacionesPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadWorkflows();
  }, [currentPage]);

  async function loadWorkflows() {
    setLoading(true);
    try {
      // Use internal API that reads from GitHub
      const response = await fetch(
        `/api/workflows?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
      );

      if (response.ok) {
        const data = await response.json();
        setWorkflows(data.workflows || []);
        setTotalPages(Math.ceil((data.total || 0) / ITEMS_PER_PAGE));
      } else {
        setWorkflows(getDemoWorkflows());
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Error loading workflows:', error);
      setWorkflows(getDemoWorkflows());
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }

  async function toggleWorkflow(id: string, currentStatus: string) {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      
      await fetch(`/api/workflows/${id}/toggle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });

      setWorkflows(workflows.map(w => 
        w.id === id ? { ...w, status: newStatus as 'active' | 'inactive' } : w
      ));
    } catch (error) {
      console.error('Error toggling workflow:', error);
    }
  }

  async function triggerWorkflow(id: string) {
    try {
      await fetch(`/api/workflows/${id}/trigger`, {
        method: 'POST',
      });
      
      loadWorkflows();
    } catch (error) {
      console.error('Error triggering workflow:', error);
    }
  }

  function getDemoWorkflows(): Workflow[] {
    return [
      {
        id: '431',
        name: 'WhatsApp Leads → CRM',
        description: 'Captura leads desde WhatsApp y los sincroniza automáticamente con el CRM',
        category: 'Comunicación',
        executions_today: 14,
        last_execution: '2 min',
        status: 'active',
        n8n_id: 431
      },
      {
        id: '219',
        name: 'Agenda Confirmaciones',
        description: 'Sincroniza citas de Google Calendar y envía confirmaciones automáticas',
        category: 'Calendario',
        executions_today: 8,
        last_execution: '8 min',
        status: 'active',
        n8n_id: 219
      },
      {
        id: '102',
        name: 'Reporte Diario a Sheets',
        description: 'Genera y envía reportes diarios de inventario a Google Sheets',
        category: 'Reportes',
        executions_today: 1,
        last_execution: '09:00',
        status: 'active',
        n8n_id: 102
      },
      {
        id: '305',
        name: 'Slack Notificaciones Ventas',
        description: 'Envía alertas a Slack cuando se registra una nueva venta',
        category: 'E-commerce',
        executions_today: 23,
        last_execution: '1 min',
        status: 'active',
        n8n_id: 305
      },
      {
        id: '187',
        name: 'Email Marketing Automatizado',
        description: 'Campaña de email marketing basada en comportamiento del usuario',
        category: 'Marketing',
        executions_today: 45,
        last_execution: '5 min',
        status: 'active',
        n8n_id: 187
      },
      {
        id: '412',
        name: 'Sync Shopify → Odoo',
        description: 'Sincronización bidireccional de productos entre Shopify y Odoo ERP',
        category: 'E-commerce',
        executions_today: 12,
        last_execution: '15 min',
        status: 'active',
        n8n_id: 412
      },
      {
        id: '298',
        name: 'Procesar Facturas PDF',
        description: 'Extrae datos de facturas PDF y los registra en base de datos',
        category: 'Automatización',
        executions_today: 6,
        last_execution: '22 min',
        status: 'active',
        n8n_id: 298
      },
      {
        id: '521',
        name: 'Respuestas AI WhatsApp',
        description: 'Bot con IA que responde consultas frecuentes en WhatsApp',
        category: 'IA',
        executions_today: 87,
        last_execution: '30 seg',
        status: 'active',
        n8n_id: 521
      },
      {
        id: '156',
        name: 'Backup Automático Diario',
        description: 'Realiza backup de bases de datos y los sube a la nube',
        category: 'Mantenimiento',
        executions_today: 1,
        last_execution: '02:00',
        status: 'active',
        n8n_id: 156
      },
      {
        id: '389',
        name: 'Monitor Redes Sociales',
        description: 'Monitorea menciones de marca en redes sociales y alerta al equipo',
        category: 'Marketing',
        executions_today: 34,
        last_execution: '3 min',
        status: 'active',
        n8n_id: 389
      }
    ];
  }

  function getCategoryColor(category: string) {
    const colors: Record<string, string> = {
      'Comunicación': 'bg-blue-500/10 text-blue-500',
      'Calendario': 'bg-green-500/10 text-green-500',
      'Reportes': 'bg-purple-500/10 text-purple-500',
      'E-commerce': 'bg-orange-500/10 text-orange-500',
      'Marketing': 'bg-pink-500/10 text-pink-500',
      'Automatización': 'bg-cyan-500/10 text-cyan-500',
      'IA': 'bg-violet-500/10 text-violet-500',
      'Mantenimiento': 'bg-gray-500/10 text-gray-500',
    };
    return colors[category] || 'bg-gray-500/10 text-gray-500';
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Automatizaciones en SmarterOS</h1>
        <p className="text-muted-foreground">
          Controla tus flujos de N8N desde el dashboard
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Workflows Activos
                </p>
                <p className="text-2xl font-bold">
                  {workflows.filter(w => w.status === 'active').length}
                </p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Ejecuciones Hoy
                </p>
                <p className="text-2xl font-bold">
                  {workflows.reduce((sum, w) => sum + w.executions_today, 0)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Workflows
                </p>
                <p className="text-2xl font-bold">{workflows.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-xl">{workflow.name}</CardTitle>
                    <Badge className={getCategoryColor(workflow.category)} variant="secondary">
                      {workflow.category}
                    </Badge>
                    <Badge variant={workflow.status === 'active' ? 'default' : 'outline'}>
                      N8N #{workflow.n8n_id}
                    </Badge>
                  </div>
                  <CardDescription>{workflow.description}</CardDescription>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Activity className="h-4 w-4" />
                      <span>{workflow.executions_today} ejecuciones hoy</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Último disparo hace {workflow.last_execution}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => triggerWorkflow(workflow.id)}
                    title="Ejecutar ahora"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                  
                  <Switch
                    checked={workflow.status === 'active'}
                    onCheckedChange={() => toggleWorkflow(workflow.id, workflow.status)}
                  />
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                size="icon"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Ver dashboard completo en N8N</h3>
              <p className="text-sm text-muted-foreground">
                Accede a n8n.smarterbot.cl para configuración avanzada
              </p>
            </div>
            <Button asChild>
              <a href="https://n8n.smarterbot.cl" target="_blank" rel="noopener noreferrer">
                Ver dashboard
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
