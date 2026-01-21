'use client';

import { useEffect } from 'react'
import useAuthStore from '@/store/authStore'
import { validateAndCleanupTokens } from '@/lib/utils/tokenValidator'

export function Providers({ children }) {
  const { checkAuth } = useAuthStore()

  useEffect(() => {
    // Clean up expired tokens first
    validateAndCleanupTokens()
    
    // Initialize auth state from localStorage on app mount
    checkAuth()
  }, [checkAuth])

  return <>{children}</>
}
