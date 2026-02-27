'use client'

import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

/**
 * Custom hook para logout seguro
 * Limpia todas las sesiones (Clerk + Supabase + localStorage)
 */
export function useSecureLogout() {
  const { signOut } = useAuth()
  const router = useRouter()

  const logout = useCallback(async () => {
    try {
      // 1. Limpiar caché local ANTES de cerrar sesión
      if (typeof window !== 'undefined') {
        // Limpiar solo claves relacionadas con la sesión
        const keysToRemove = [
          'sb-auth-token',
          'sb-refresh-token', 
          'sb-access-token',
          'corrupted-state',
          'smarteros-dashboard-cache'
        ]
        
        keysToRemove.forEach(key => localStorage.removeItem(key))
        
        // Opcional: limpiar todo (descomentar si es necesario)
        // localStorage.clear()
        // sessionStorage.clear()
      }

      // 2. Cerrar sesión en Clerk con redirección explícita
      await signOut({ 
        redirectUrl: typeof window !== 'undefined' 
          ? window.location.origin + '/auth/sign-in' 
          : '/auth/sign-in'
      })

      // 3. Forzar navegación para limpiar caché del navegador
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/sign-in'
      }
    } catch (error) {
      console.error('Secure logout error:', error)
      // Fallback: recarga forzada
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/sign-in'
      }
    }
  }, [signOut])

  return logout
}
