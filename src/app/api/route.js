// Location: app\api\route.js
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'NexCart API is running',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth/*',
      products: '/api/products/*',
      cart: '/api/cart/*',
      orders: '/api/orders/*',
      users: '/api/users/*',
      admin: '/api/admin/*'
    },
    documentation: 'https://docs.nexcart.com'
  })
}

export async function POST(request) {
  try {
    const body = await request.json()
    
    // Handle different API operations
    return NextResponse.json({
      success: true,
      data: body,
      message: 'Request processed successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Invalid request',
        message: error.message 
      },
      { status: 400 }
    )
  }
}