// Location: lib\constants.js
/**
 * NexCart Constants
 */

export const APP_NAME = 'NexCart'
export const APP_DESCRIPTION = 'AI-Powered Smart E-Commerce Platform'

// API Configuration
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

// OAuth Configuration
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
export const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
export const MICROSOFT_CLIENT_ID = process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID

// Pagination
export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
}

export const ORDER_STATUS_LABELS = {
  pending: 'Pending',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
}

export const ORDER_STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  refunded: 'bg-gray-100 text-gray-800',
}

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
}

export const PAYMENT_STATUS_LABELS = {
  pending: 'Pending',
  completed: 'Completed',
  failed: 'Failed',
  refunded: 'Refunded',
}

// Payment Methods
export const PAYMENT_METHODS = [
  { value: 'MTN', label: 'MTN Mobile Money', icon: '📱' },
  { value: 'ORANGE', label: 'Orange Money', icon: '🟠' },
]

// User Roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
}

// Product Sort Options
export const SORT_OPTIONS = [
  { value: 'created_at', label: 'Newest First' },
  { value: '-created_at', label: 'Oldest First' },
  { value: 'price', label: 'Price: Low to High' },
  { value: '-price', label: 'Price: High to Low' },
  { value: '-average_rating', label: 'Highest Rated' },
  { value: '-purchase_count', label: 'Most Popular' },
]

// Price Range
export const PRICE_RANGES = [
  { min: 0, max: 10000, label: 'Under 10,000 XAF' },
  { min: 10000, max: 25000, label: '10,000 - 25,000 XAF' },
  { min: 25000, max: 50000, label: '25,000 - 50,000 XAF' },
  { min: 50000, max: 100000, label: '50,000 - 100,000 XAF' },
  { min: 100000, max: null, label: 'Over 100,000 XAF' },
]

// Rating Filters
export const RATING_FILTERS = [
  { value: 5, label: '5 Stars' },
  { value: 4, label: '4 Stars & Up' },
  { value: 3, label: '3 Stars & Up' },
  { value: 2, label: '2 Stars & Up' },
  { value: 1, label: '1 Star & Up' },
]

// Activity Types
export const ACTIVITY_TYPES = {
  VIEW: 'view',
  CLICK: 'click',
  ADD_CART: 'add_cart',
  PURCHASE: 'purchase',
  WISHLIST: 'wishlist',
  REVIEW: 'review',
  SEARCH: 'search',
}

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id) => `/products/${id}`,
  CATEGORIES: '/categories',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDERS: '/orders',
  ORDER_DETAIL: (id) => `/orders/${id}`,
  PROFILE: '/profile',
  WISHLIST: '/wishlist',
  ADMIN: '/admin',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_USERS: '/admin/users',
  ADMIN_ANALYTICS: '/admin/analytics',
}

// Navigation Items
export const NAV_ITEMS = [
  { label: 'Home', href: ROUTES.HOME },
  { label: 'Products', href: ROUTES.PRODUCTS },
  { label: 'Categories', href: ROUTES.CATEGORIES },
]

// Admin Navigation
export const ADMIN_NAV_ITEMS = [
  { label: 'Dashboard', href: ROUTES.ADMIN, icon: 'LayoutDashboard' },
  { label: 'Products', href: ROUTES.ADMIN_PRODUCTS, icon: 'Package' },
  { label: 'Orders', href: ROUTES.ADMIN_ORDERS, icon: 'ShoppingCart' },
  { label: 'Users', href: ROUTES.ADMIN_USERS, icon: 'Users' },
  { label: 'Analytics', href: ROUTES.ADMIN_ANALYTICS, icon: 'BarChart' },
]

// Validation Rules
export const VALIDATION = {
  EMAIL: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
  },
  PASSWORD: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters',
    },
  },
  PHONE: {
    pattern: {
      value: /^[0-9]{9}$/,
      message: 'Invalid phone number (9 digits)',
    },
  },
}

// Toast Messages
export const TOAST_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in!',
  LOGIN_ERROR: 'Invalid credentials',
  REGISTER_SUCCESS: 'Account created successfully!',
  REGISTER_ERROR: 'Registration failed',
  ADD_TO_CART_SUCCESS: 'Added to cart',
  ADD_TO_CART_ERROR: 'Failed to add to cart',
  REMOVE_FROM_CART_SUCCESS: 'Removed from cart',
  UPDATE_CART_SUCCESS: 'Cart updated',
  ORDER_SUCCESS: 'Order placed successfully!',
  ORDER_ERROR: 'Failed to place order',
  PAYMENT_SUCCESS: 'Payment completed!',
  PAYMENT_ERROR: 'Payment failed',
  UPDATE_PROFILE_SUCCESS: 'Profile updated',
  UPDATE_PROFILE_ERROR: 'Failed to update profile',
}

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'Please login to continue.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION_ERROR: 'Please check your input.',
}

// Image Placeholder
export const PLACEHOLDER_IMAGE = '/placeholder.jpg'

// Limits
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
export const MAX_CART_ITEMS = 50
export const MAX_REVIEW_LENGTH = 1000

// Currency
export const DEFAULT_CURRENCY = 'XAF'
export const CURRENCY_SYMBOL = 'FCFA'

// Date Formats
export const DATE_FORMAT = 'MMM dd, yyyy'
export const DATETIME_FORMAT = 'MMM dd, yyyy HH:mm'

// Local Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  CART: 'cart',
  THEME: 'theme',
}

// Debounce Delays
export const DEBOUNCE_DELAY = {
  SEARCH: 500,
  INPUT: 300,
  SCROLL: 100,
}