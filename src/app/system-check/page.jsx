'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, Loader2, RefreshCw } from 'lucide-react'
import api from '@/lib/api'

export default function SystemCheckPage() {
  const [tests, setTests] = useState({})
  const [testing, setTesting] = useState(false)

  const endpoints = [
    { name: 'Health Check', method: 'get', url: '/health/', auth: false },
    { name: 'Products List', method: 'get', url: '/products/', auth: false },
    { name: 'Featured Products', method: 'get', url: '/products/featured/', auth: false },
    { name: 'Categories', method: 'get', url: '/categories/', auth: false },
    { name: 'Recommendations', method: 'get', url: '/recommendations/', auth: false },
    { name: 'Cart (Guest)', method: 'get', url: '/cart/', auth: false },
  ]

  const runTests = async () => {
    setTesting(true)
    const results = {}

    for (const endpoint of endpoints) {
      try {
        const startTime = Date.now()
        const response = await api.client[endpoint.method](endpoint.url)
        const duration = Date.now() - startTime

        results[endpoint.name] = {
          status: 'success',
          statusCode: response.status,
          duration,
          dataLength: JSON.stringify(response.data).length
        }
      } catch (error) {
        results[endpoint.name] = {
          status: 'error',
          error: error.response?.data?.detail || error.message,
          statusCode: error.response?.status || 'Network Error'
        }
      }
    }

    setTests(results)
    setTesting(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">System Status Check</h1>
        <p className="text-muted-foreground">
          Test all API endpoints to ensure everything is working correctly
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Connection Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">API URL:</span>
              <code className="bg-muted px-2 py-1 rounded text-sm">
                {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}
              </code>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Auth Status:</span>
              <Badge variant={api.getAccessToken() ? 'default' : 'secondary'}>
                {api.getAccessToken() ? 'Authenticated' : 'Guest'}
              </Badge>
            </div>
          </div>
          <Button 
            onClick={runTests} 
            disabled={testing}
            className="w-full mt-4"
          >
            {testing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Run Tests
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {endpoints.map((endpoint) => {
          const result = tests[endpoint.name]
          
          return (
            <Card key={endpoint.name}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {result ? (
                      result.status === 'success' ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-muted" />
                    )}
                    
                    <div>
                      <div className="font-medium">{endpoint.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {endpoint.method.toUpperCase()} {endpoint.url}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    {result && (
                      <div className="space-y-1">
                        <Badge 
                          variant={result.status === 'success' ? 'default' : 'destructive'}
                        >
                          {result.statusCode}
                        </Badge>
                        {result.duration && (
                          <div className="text-xs text-muted-foreground">
                            {result.duration}ms
                          </div>
                        )}
                        {result.error && (
                          <div className="text-xs text-red-500 max-w-xs truncate">
                            {result.error}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {Object.keys(tests).length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-500">
                  {Object.values(tests).filter(t => t.status === 'success').length}
                </div>
                <div className="text-sm text-muted-foreground">Passed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-500">
                  {Object.values(tests).filter(t => t.status === 'error').length}
                </div>
                <div className="text-sm text-muted-foreground">Failed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-500">
                  {Object.values(tests).length}
                </div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
