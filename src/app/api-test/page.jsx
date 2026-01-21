'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function APITestPage() {
  const [results, setResults] = useState({})
  const [loading, setLoading] = useState(false)

  const testEndpoint = async (name, url) => {
    setLoading(true)
    try {
      const response = await fetch(url)
      const data = await response.json()
      setResults(prev => ({
        ...prev,
        [name]: { success: true, data, status: response.status }
      }))
    } catch (error) {
      setResults(prev => ({
        ...prev,
        [name]: { success: false, error: error.message }
      }))
    } finally {
      setLoading(false)
    }
  }

  const tests = [
    { name: 'Products', url: 'http://localhost:8000/api/products/' },
    { name: 'Featured', url: 'http://localhost:8000/api/products/featured/' },
    { name: 'Categories', url: 'http://localhost:8000/api/categories/' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">API Test Page</h1>
      
      <div className="space-y-4 mb-8">
        {tests.map(test => (
          <Card key={test.name}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{test.name}</span>
                <Button onClick={() => testEndpoint(test.name, test.url)} disabled={loading}>
                  Test
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{test.url}</p>
              {results[test.name] && (
                <div className="mt-4">
                  {results[test.name].success ? (
                    <div className="bg-green-50 border border-green-200 rounded p-4">
                      <p className="text-green-800 font-semibold mb-2">
                        ✓ Success (Status: {results[test.name].status})
                      </p>
                      <pre className="text-xs overflow-auto max-h-40">
                        {JSON.stringify(results[test.name].data, null, 2)}
                      </pre>
                    </div>
                  ) : (
                    <div className="bg-red-50 border border-red-200 rounded p-4">
                      <p className="text-red-800 font-semibold">✗ Error:</p>
                      <p className="text-sm">{results[test.name].error}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Button onClick={() => window.location.reload()}>Clear Results</Button>
    </div>
  )
}
