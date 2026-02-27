'use client'

import { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, RefreshCw, LogOut } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({ error, errorInfo })
    
    // Limpiar estado corrupto del localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('corrupted-state')
        // Guardar info del error para debugging
        localStorage.setItem('last-error', JSON.stringify({
          message: error.message,
          stack: error.stack,
          timestamp: Date.now()
        }))
      } catch (e) {
        console.error('Failed to clean localStorage:', e)
      }
    }
  }

  public handleReload = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  public handleLogout = () => {
    if (typeof window !== 'undefined') {
      // Limpiar todo y redirigir a login
      localStorage.clear()
      sessionStorage.clear()
      window.location.href = '/auth/sign-in'
    }
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-6">
          <Card className="max-w-lg w-full shadow-2xl border-red-200">
            <CardHeader className="text-center">
              <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <CardTitle className="text-2xl font-black text-slate-900">
                Error de Sesión
              </CardTitle>
              <CardDescription className="text-slate-600">
                Ha ocurrido un error inesperado. No te preocupes, podemos solucionarlo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {this.state.error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-sm font-mono text-red-800 break-words">
                    {this.state.error.message}
                  </p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={this.handleReload}
                  className="flex-1 bg-slate-900 hover:bg-slate-800"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Recargar Página
                </Button>
                
                <Button 
                  onClick={this.handleLogout}
                  variant="outline"
                  className="flex-1 border-red-300 text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
                </Button>
              </div>
              
              <p className="text-xs text-slate-500 text-center">
                Si el problema persiste, contacta a soporte técnico.
              </p>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
