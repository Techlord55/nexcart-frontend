// Location: app\page.jsx
'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { formatRating, formatProductsArray } from '@/lib/utils/format'; // <--- Double check this path
import { ShoppingCart, Heart, Star, TrendingUp, Sparkles, ArrowRight, Package, Shield, Truck } from 'lucide-react'
import Link from 'next/link'
import ProductImage from '@/components/ProductImage'

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

 const loadData = async () => {
  try {
    setError(null)
    const [featured, recommended] = await Promise.all([
      api.getFeaturedProducts().catch(() => ({ results: [] })),
      api.getRecommendations().catch(() => ({ results: [] })),
    ])
    
    // Clean the data using your new utility
    const cleanedFeatured = formatProductsArray(featured.results || featured || [])
    const cleanedRecommended = formatProductsArray(recommended.results || recommended || [])
    
    setFeaturedProducts(cleanedFeatured)
    setRecommendations(cleanedRecommended)
  } catch (error) {
    console.error('Failed to load data:', error)
    setError('Unable to load products. Please check if the backend is running.')
  } finally {
    setLoading(false)
  }

  }

  const handleAddToCart = async (productId) => {
    // Check if user is authenticated
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
    if (!token) {
      // Redirect to login with current page as redirect
      window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname)
      return
    }

    try {
      await api.addToCart(productId, 1)
      await api.trackActivity('add_cart', productId)
    } catch (error) {
      console.error('Failed to add to cart:', error)
      // If 401, redirect to login
      if (error.response?.status === 401) {
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname)
      }
    }
  }

  const handleAddToWishlist = async (productId) => {
    try {
      await api.addToWishlist(productId)
      await api.trackActivity('wishlist', productId)
    } catch (error) {
      console.error('Failed to add to wishlist:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        {/* Hero Skeleton */}
        <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <Skeleton className="h-12 w-3/4 mx-auto" />
              <Skeleton className="h-6 w-2/3 mx-auto" />
              <div className="flex gap-4 justify-center mt-8">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-32" />
              </div>
            </div>
          </div>
        </section>

        {/* Products Skeleton */}
        <section className="container mx-auto px-4 py-16">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <Skeleton className="aspect-square" />
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-3 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)]" />
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 text-base px-4 py-2" variant="secondary">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Shopping Experience
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent leading-tight">
              Shop Smarter with NexCart
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed">
              Discover products tailored just for you with our intelligent recommendation system. The future of shopping is here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link href="/products">
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
                <Link href="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Truck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-muted-foreground">On orders over $50</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-muted-foreground">100% secure transactions</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Package className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-muted-foreground">30-day return policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <section className="container mx-auto px-4 py-8">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
            <p className="text-destructive font-medium mb-2">{error}</p>
            <p className="text-sm text-muted-foreground">
              Make sure the backend server is running at http://localhost:8000
            </p>
            <Button onClick={loadData} className="mt-4">
              Try Again
            </Button>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-primary" />
              <h2 className="text-4xl font-bold">Featured Products</h2>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/products">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300">
                <CardHeader className="p-0">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
                    <ProductImage
                      src={product.featured_image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.discount_percentage > 0 && (
                      <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">
                        -{product.discount_percentage}%
                      </Badge>
                    )}
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      onClick={() => handleAddToWishlist(product.id)}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  <Link href={`/products/${product.id}`}>
                    <CardTitle className="text-lg mb-3 hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {product.name}
                    </CardTitle>
                  </Link>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
<span className="ml-1 text-sm font-medium">
  {formatRating(product.average_rating)}
</span>                    </div>
                    <span className="text-sm text-muted-foreground ml-2">
                      ({product.review_count || 0} reviews)
                    </span>
                  </div>
                  
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary">${product.price}</span>
                    {product.compare_price && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.compare_price}
                      </span>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="p-4 pt-0">
                  <Button 
                    className="w-full group/btn" 
                    onClick={() => handleAddToCart(product.id)}
                    disabled={!product.is_in_stock}
                  >
                    {product.is_in_stock ? (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4 group-hover/btn:animate-bounce" />
                        Add to Cart
                      </>
                    ) : (
                      'Out of Stock'
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Recommended Products */}
      {recommendations.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-8">
              <Sparkles className="w-8 h-8 mr-3 text-primary" />
              <h2 className="text-4xl font-bold">Recommended For You</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.slice(0, 4).map((product) => (
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-300">
                  <CardHeader className="p-0">
                    <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
                      <ProductImage
                        src={product.featured_image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-4">
                    <Link href={`/products/${product.id}`}>
                      <CardTitle className="text-lg mb-2 hover:text-primary transition-colors line-clamp-2">
                        {product.name}
                      </CardTitle>
                    </Link>
                    
                    <div className="flex items-center mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm">{product.average_rating?.toFixed(1) || '0.0'}</span>
                    </div>
                    
                    <span className="text-2xl font-bold text-primary">${product.price}</span>
                  </CardContent>
                  
                  <CardFooter className="p-4 pt-0">
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of happy customers today</p>
          <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
            <Link href="/products">
              Browse All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
