// Location: app\(auth)\layout.jsx
'use client'

import Link from 'next/link'
import { Package } from 'lucide-react'
import { APP_NAME } from '@/lib/constants'

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center space-x-2 mb-8">
            <Package className="h-10 w-10 text-primary" />
            <span className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {APP_NAME}
            </span>
          </Link>

          {/* Content */}
          {children}
        </div>
      </div>

      {/* Right Side - Image/Branding */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20 items-center justify-center p-12">
        <div className="max-w-md text-center space-y-6">
          <h2 className="text-4xl font-bold">Welcome to {APP_NAME}</h2>
          <p className="text-xl text-muted-foreground">
            Discover personalized shopping experiences powered by AI
          </p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="p-4 bg-background/50 rounded-lg backdrop-blur">
              <h3 className="font-semibold mb-2">🤖 AI Recommendations</h3>
              <p className="text-sm text-muted-foreground">
                Get personalized product suggestions
              </p>
            </div>
            <div className="p-4 bg-background/50 rounded-lg backdrop-blur">
              <h3 className="font-semibold mb-2">🛒 Easy Shopping</h3>
              <p className="text-sm text-muted-foreground">
                Seamless cart and checkout
              </p>
            </div>
            <div className="p-4 bg-background/50 rounded-lg backdrop-blur">
              <h3 className="font-semibold mb-2">💳 Secure Payments</h3>
              <p className="text-sm text-muted-foreground">
                MTN & Orange Money
              </p>
            </div>
            <div className="p-4 bg-background/50 rounded-lg backdrop-blur">
              <h3 className="font-semibold mb-2">📦 Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Track your orders easily
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}