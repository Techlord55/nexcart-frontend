/**
 * Custom hook for protecting routes that require authentication
 */
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/store/authStore'

export function useRequireAuth(redirectTo = '/login') {
  const router = useRouter()
  const { isAuthenticated, checkAuth } = useAuthStore()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const verifyAuth = async () => {
      // First, check auth status from localStorage
      await checkAuth()
      
      // Small delay to ensure state is updated
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Get the current auth state
      const currentAuthState = useAuthStore.getState().isAuthenticated
      
      if (!currentAuthState) {
        // Not authenticated, redirect to login with return URL
        const returnUrl = window.location.pathname + window.location.search
        router.push(`${redirectTo}?returnUrl=${encodeURIComponent(returnUrl)}`)
      } else {
        // Authenticated, allow access
        setIsAuthorized(true)
      }
      
      setIsLoading(false)
    }

    verifyAuth()
  }, [checkAuth, router, redirectTo])

  return { isLoading, isAuthorized }
}

/**
 * Hook to check if user is admin
 */
export function useRequireAdmin(redirectTo = '/') {
  const router = useRouter()
  const { user, isAuthenticated, checkAuth } = useAuthStore()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const verifyAdmin = async () => {
      await checkAuth()
      
      // Small delay to ensure state is updated
      await new Promise(resolve => setTimeout(resolve, 100))
      
      const currentUser = useAuthStore.getState().user
      const currentAuthState = useAuthStore.getState().isAuthenticated
      
      if (!currentAuthState || currentUser?.role !== 'admin') {
        router.push(redirectTo)
      } else {
        setIsAuthorized(true)
      }
      
      setIsLoading(false)
    }

    verifyAdmin()
  }, [checkAuth, router, redirectTo])

  return { isLoading, isAuthorized, user }
}
