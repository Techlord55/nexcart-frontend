// Location: app/api/proxy/[...path]/route.js
/**
 * API Proxy to handle Django backend requests with proper cookie forwarding
 * This solves the cross-origin session cookie issue
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function GET(request, { params }) {
  const { path } = params;
  const url = `${BACKEND_URL}/${path.join('/')}${request.nextUrl.search}`;
  
  return proxyRequest(request, url, 'GET');
}

export async function POST(request, { params }) {
  const { path } = params;
  const url = `${BACKEND_URL}/${path.join('/')}`;
  const body = await request.text();
  
  return proxyRequest(request, url, 'POST', body);
}

export async function PATCH(request, { params }) {
  const { path } = params;
  const url = `${BACKEND_URL}/${path.join('/')}`;
  const body = await request.text();
  
  return proxyRequest(request, url, 'PATCH', body);
}

export async function DELETE(request, { params }) {
  const { path } = params;
  const url = `${BACKEND_URL}/${path.join('/')}`;
  
  return proxyRequest(request, url, 'DELETE');
}

async function proxyRequest(request, url, method, body = null) {
  try {
    // Forward cookies from client request
    const cookies = request.headers.get('cookie');
    
    // Build headers
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Forward authorization if present
    const auth = request.headers.get('authorization');
    if (auth) {
      headers['Authorization'] = auth;
    }
    
    // Forward cookies if present
    if (cookies) {
      headers['Cookie'] = cookies;
    }
    
    // Make request to Django
    const options = {
      method,
      headers,
      credentials: 'include',
    };
    
    if (body && (method === 'POST' || method === 'PATCH')) {
      options.body = body;
    }
    
    const response = await fetch(url, options);
    const data = await response.text();
    
    // Create response
    const proxyResponse = new Response(data, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // Forward Set-Cookie headers
    const setCookies = response.headers.get('set-cookie');
    if (setCookies) {
      proxyResponse.headers.set('Set-Cookie', setCookies);
    }
    
    return proxyResponse;
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(JSON.stringify({ error: 'Proxy error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
