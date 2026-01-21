/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker - Required for your Dockerfile
  output: 'standalone',
  
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        '192.168.228.106:3000',
        '192.168.115.106:3000', // Added your other local IP from .env
      ],
    },
  },
  
  // Proxy backend requests
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // Use 'backend' (the docker service name) instead of 'localhost'
        destination: 'http://backend:8000/api/:path*',
      },
    ];
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Covers Cloudinary and others
      },
      {
        protocol: 'http',
        hostname: '**', // Covers local network testing
      },
    ],
  },
};

export default nextConfig;