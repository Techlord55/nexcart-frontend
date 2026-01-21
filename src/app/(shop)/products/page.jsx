'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { api } from '@/lib/api'
import { formatRating } from '@/lib/utils/format'
import useCartStore from '@/store/cartStore'
import useAuthStore from '@/store/authStore'
import { useToast } from '@/hooks/useToast'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { ShoppingCart, Heart, Star, Search, Filter, Loader2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

function ProductsList() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { addItem } = useCartStore()
  const { isAuthenticated } = useAuthStore()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [addingToCart, setAddingToCart] = useState(null)
  const [addingToWishlist, setAddingToWishlist] = useState(null)

  useEffect(() => {
    loadProducts()
  }, [searchParams])

  const loadProducts = async () => {
    try {
      const response = await api.getProducts({
        search: searchParams.get('search'),
        category: searchParams.get('category'),
      })
      setProducts(response.results || response)
    } catch (error) {
      console.error('Failed to load products:', error)
      toast({
        title: 'Error',
        description: 'Failed to load products',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async (product) => {
    setAddingToCart(product.id)
    try {
      const result = await addItem(product.id, 1)
      if (result.success) {
        toast({
          title: 'Added to cart!',
          description: `${product.name} has been added to your cart.`,
          variant: 'success'
        })
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to add to cart',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.error('Failed to add to cart:', error)
      toast({
        title: 'Error',
        description: 'Failed to add to cart',
        variant: 'destructive'
      })
    } finally {
      setAddingToCart(null)
    }
  }

  const handleAddToWishlist = async (product) => {
    if (!isAuthenticated) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to add items to your wishlist',
        variant: 'destructive'
      })
      return
    }

    setAddingToWishlist(product.id)
    try {
      await api.addToWishlist(product.id)
      toast({
        title: 'Added to wishlist!',
        description: `${product.name} has been added to your wishlist.`,
        variant: 'success'
      })
    } catch (error) {
      console.error('Failed to add to wishlist:', error)
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to add to wishlist',
        variant: 'destructive'
      })
    } finally {
      setAddingToWishlist(null)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-64 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Card key={i}>
              <Skeleton className="aspect-square" />
              <CardContent className="p-4">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-3 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold">All Products</h1>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl text-muted-foreground mb-4">No products found</p>
          <Button asChild>
            <Link href="/">Go to Homepage</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const isAddingThisToCart = addingToCart === product.id
            const isAddingThisToWishlist = addingToWishlist === product.id

            return (
              <Card key={product.id} className="group hover:shadow-xl transition-all">
                <CardHeader className="p-0">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
                    <Link href={`/products/${product.id}`}>
                      <Image
                        src={product.featured_image || '/placeholder.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110 cursor-zoom-in"
                      />
                    </Link>
                    {product.discount_percentage > 0 && (
                      <Badge className="absolute top-3 right-3 bg-destructive">
                        -{product.discount_percentage}%
                      </Badge>
                    )}
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleAddToWishlist(product)}
                      disabled={isAddingThisToWishlist}
                    >
                      {isAddingThisToWishlist ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Heart className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  <Link href={`/products/${product.id}`}>
                    <CardTitle className="text-lg mb-3 hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </CardTitle>
                  </Link>
                  
                  <div className="flex items-center mb-3">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm">{formatRating(product.average_rating)}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      ({product.review_count || 0})
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
                    className="w-full" 
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.is_in_stock || isAddingThisToCart}
                  >
                    {isAddingThisToCart ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : product.is_in_stock ? (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </>
                    ) : (
                      'Out of Stock'
                    )}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-64 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Card key={i}>
              <Skeleton className="aspect-square" />
              <CardContent className="p-4">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-3 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    }>
      <ProductsList />
    </Suspense>
  )
}
