import { NextResponse } from 'next/server';

/**
 * Proxy for Next.js 16+
 * 
 * Note: This proxy doesn't block requests because authentication is handled
 * client-side using the useRequireAuth hook. It simply passes through all requests.
 * 
 * If you want to add server-side auth in the future, you can check for auth cookies here.
 */
export function proxy(request) {
  // Pass through all requests - client-side auth handles protection
  return NextResponse.next();
}

/**
 * Optional: Configure which routes this proxy should run on
 * Currently set to protected routes, but since we're not blocking anything,
 * you could also remove the matcher entirely.
 */
export const config = {
  matcher: [
    '/profile/:path*',
    '/orders/:path*',
    '/wishlist/:path*',
    '/checkout/:path*',
  ],
};
