'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/store/authStore'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }) {
  const router = useRouter()
  const { user, isAuthenticated, checkAuth } = useAuthStore()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Check authentication on mount
    checkAuth()
    setIsChecking(false)
  }, [checkAuth])

  useEffect(() => {
    // Wait for initial auth check
    if (isChecking) return

    // Redirect if not authenticated
    if (!isAuthenticated) {
      console.log('Not authenticated, redirecting to login')
      router.push('/login?redirect=/admin/dashboard')
      return
    }
    
    // Redirect if not admin
    if (user && user.role !== 'admin') {
      console.log('Not admin, redirecting to home')
      router.push('/')
      return
    }
  }, [isAuthenticated, user, router, isChecking])

  // Show loading state while checking auth
  if (isChecking || !isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Show access denied if not admin (shouldn't reach here due to redirect)
  if (user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="mb-4 text-red-600 text-6xl">⛔</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4">You don't have permission to access this area.</p>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
