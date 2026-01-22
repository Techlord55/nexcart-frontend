// Location: components/ProductImage.jsx
'use client'

import Image from 'next/image'
import { Package } from 'lucide-react'

export default function ProductImage({ src, alt, className = '', fill = false, ...props }) {
  if (!src) {
    // Fallback placeholder when no image is provided
    return (
      <div className={`flex items-center justify-center bg-muted ${className}`} {...props}>
        <Package className="w-1/3 h-1/3 text-muted-foreground" />
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      fill={fill}
      unoptimized
      onError={(e) => {
        // Fallback to placeholder on error
        e.target.style.display = 'none'
        if (e.target.parentElement) {
          e.target.parentElement.innerHTML = `
            <div class="flex items-center justify-center w-full h-full bg-muted">
              <svg class="w-1/3 h-1/3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          `
        }
      }}
      {...props}
    />
  )
}
