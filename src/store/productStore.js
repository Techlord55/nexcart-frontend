// Location: store\productStore.js
/**
 * Product Store using Zustand
 */
import { create } from 'zustand'
import api from '@/lib/api'

const useProductStore = create((set, get) => ({
  // State
  products: [],
  featuredProducts: [],
  categories: [],
  currentProduct: null,
  recommendations: [],
  filters: {
    category: null,
    search: '',
    min_price: null,
    max_price: null,
    ordering: '-created_at',
  },
  pagination: {
    page: 1,
    totalPages: 1,
    count: 0,
  },
  isLoading: false,
  error: null,

  // Fetch products with filters
  fetchProducts: async (params = {}) => {
    set({ isLoading: true, error: null })
    try {
      const { filters } = get()
      const queryParams = {
        page: params.page || 1,
        ...filters,
        ...params,
      }

      const data = await api.getProducts(queryParams)

      set({
        products: data.results,
        pagination: {
          page: data.current_page || 1,
          totalPages: data.total_pages || 1,
          count: data.count || 0,
        },
        isLoading: false,
      })

      return { success: true }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to load products'
      set({ error: errorMessage, isLoading: false })
      return { success: false, error: errorMessage }
    }
  },

  // Fetch single product
  fetchProduct: async (productId) => {
    set({ isLoading: true, error: null })
    try {
      const product = await api.getProduct(productId)

      // Track view
      await api.trackActivity('view', productId)

      set({
        currentProduct: product,
        isLoading: false,
      })

      return { success: true, product }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to load product'
      set({ error: errorMessage, isLoading: false, currentProduct: null })
      return { success: false, error: errorMessage }
    }
  },

  // Fetch featured products
  fetchFeaturedProducts: async () => {
    try {
      const products = await api.getFeaturedProducts()
      set({ featuredProducts: products.results || products })
    } catch (error) {
      console.error('Error fetching featured products:', error)
    }
  },

  // Fetch categories
  fetchCategories: async () => {
    try {
      const categories = await api.getCategories()
      set({ categories: categories.results || categories })
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  },

  // Fetch recommendations
  fetchRecommendations: async () => {
    try {
      const recommendations = await api.getRecommendations()
      set({ recommendations: recommendations.results || recommendations })
    } catch (error) {
      console.error('Error fetching recommendations:', error)
    }
  },

  // Update filters
  setFilter: (key, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    }))
  },

  // Reset filters
  resetFilters: () => {
    set({
      filters: {
        category: null,
        search: '',
        min_price: null,
        max_price: null,
        ordering: '-created_at',
      },
    })
  },

  // Set page
  setPage: (page) => {
    set((state) => ({
      pagination: {
        ...state.pagination,
        page,
      },
    }))
  },

  // Search products
  searchProducts: async (searchTerm) => {
    set((state) => ({
      filters: {
        ...state.filters,
        search: searchTerm,
      },
    }))
    await get().fetchProducts({ search: searchTerm, page: 1 })
  },

  // Filter by category
  filterByCategory: async (categoryId) => {
    set((state) => ({
      filters: {
        ...state.filters,
        category: categoryId,
      },
    }))
    await get().fetchProducts({ category: categoryId, page: 1 })
  },

  // Sort products
  sortProducts: async (ordering) => {
    set((state) => ({
      filters: {
        ...state.filters,
        ordering,
      },
    }))
    await get().fetchProducts({ ordering, page: 1 })
  },

  // Filter by price range
  filterByPrice: async (minPrice, maxPrice) => {
    set((state) => ({
      filters: {
        ...state.filters,
        min_price: minPrice,
        max_price: maxPrice,
      },
    }))
    await get().fetchProducts({ min_price: minPrice, max_price: maxPrice, page: 1 })
  },

  // Clear current product
  clearCurrentProduct: () => {
    set({ currentProduct: null })
  },

  // Clear error
  clearError: () => set({ error: null }),
}))

export default useProductStore