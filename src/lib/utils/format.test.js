// Location: lib/utils/format.test.js
/**
 * Test file for format utilities
 * Run this in your browser console to verify the functions work
 */

import { toNumber, formatRating, formatPrice, formatProductData } from './format'

console.log('=== Testing Format Utilities ===\n')

// Test toNumber
console.log('Testing toNumber:')
console.log('toNumber("4.50"):', toNumber("4.50"))           // 4.5
console.log('toNumber(4.5):', toNumber(4.5))                 // 4.5
console.log('toNumber(null):', toNumber(null))               // 0
console.log('toNumber(undefined):', toNumber(undefined))     // 0
console.log('toNumber(""):', toNumber(""))                   // 0
console.log('toNumber("abc", 10):', toNumber("abc", 10))     // 10 (default)
console.log('')

// Test formatRating
console.log('Testing formatRating:')
console.log('formatRating("4.50"):', formatRating("4.50"))   // "4.5"
console.log('formatRating(4.567, 2):', formatRating(4.567, 2)) // "4.57"
console.log('formatRating(null):', formatRating(null))       // "0.0"
console.log('')

// Test formatPrice
console.log('Testing formatPrice:')
console.log('formatPrice("99.99"):', formatPrice("99.99"))   // "$99.99"
console.log('formatPrice(150, "€"):', formatPrice(150, "€")) // "€150.00"
console.log('')

// Test formatProductData
console.log('Testing formatProductData:')
const mockProduct = {
  id: '123',
  name: 'Test Product',
  price: "99.99",
  average_rating: "4.50",
  review_count: "42",
  stock_quantity: "100"
}

const formatted = formatProductData(mockProduct)
console.log('Original:', mockProduct)
console.log('Formatted:', formatted)
console.log('price type:', typeof formatted.price)
console.log('average_rating type:', typeof formatted.average_rating)
console.log('')

console.log('=== All Tests Complete ===')
