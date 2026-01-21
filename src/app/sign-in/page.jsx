'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SignInRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to /login
    router.replace('/login')
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-lg">Redirecting to login...</p>
      </div>
    </div>
  )
}
