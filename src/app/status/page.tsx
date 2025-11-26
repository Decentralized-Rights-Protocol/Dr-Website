'use client'

import { useState, useEffect } from 'react'
import { CheckCircle2, XCircle, Clock, Activity, Database, Globe, Cpu, Link2, AlertCircle } from 'lucide-react'

interface HealthStatus {
  service: string
  status: 'healthy' | 'degraded' | 'down'
  latency?: number
  lastChecked: string
  details?: string
}

export default function StatusPage() {
  const [healthStatuses, setHealthStatuses] = useState<HealthStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  useEffect(() => {
    checkHealth()
    const interval = setInterval(checkHealth, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const checkHealth = async () => {
    setLoading(true)
    const checks: HealthStatus[] = []

    // Check Blockchain Node Status
    try {
      const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://rpc.decentralizedrights.com'
      const startTime = Date.now()
      const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_blockNumber',
          params: [],
          id: 1
        })
      })
      const latency = Date.now() - startTime
      const data = await response.json()
      
      checks.push({
        service: 'Blockchain Node',
        status: response.ok && data.result ? 'healthy' : 'degraded',
        latency,
        lastChecked: new Date().toISOString(),
        details: data.result ? `Block #${parseInt(data.result, 16)}` : 'No response'
      })
    } catch (error) {
      checks.push({
        service: 'Blockchain Node',
        status: 'down',
        lastChecked: new Date().toISOString(),
        details: error instanceof Error ? error.message : 'Connection failed'
      })
    }

    // Check RPC Status
    try {
      const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://rpc.decentralizedrights.com'
      const startTime = Date.now()
      const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'net_version',
          params: [],
          id: 1
        })
      })
      const latency = Date.now() - startTime
      const data = await response.json()
      
      checks.push({
        service: 'RPC Endpoint',
        status: response.ok && data.result ? 'healthy' : 'degraded',
        latency,
        lastChecked: new Date().toISOString(),
        details: data.result ? `Network ID: ${data.result}` : 'No response'
      })
    } catch (error) {
      checks.push({
        service: 'RPC Endpoint',
        status: 'down',
        lastChecked: new Date().toISOString(),
        details: error instanceof Error ? error.message : 'Connection failed'
      })
    }

    // Check OrbitDB Health
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.decentralizedrights.com'
      const startTime = Date.now()
      const response = await fetch(`${apiUrl}/api/health/orbitdb`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const latency = Date.now() - startTime
      const data = await response.json()
      
      checks.push({
        service: 'OrbitDB',
        status: response.ok && data.status === 'healthy' ? 'healthy' : 'degraded',
        latency,
        lastChecked: new Date().toISOString(),
        details: data.details || 'Connected'
      })
    } catch (error) {
      checks.push({
        service: 'OrbitDB',
        status: 'down',
        lastChecked: new Date().toISOString(),
        details: error instanceof Error ? error.message : 'Connection failed'
      })
    }

    // Check IPFS Pinning Status
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.decentralizedrights.com'
      const startTime = Date.now()
      const response = await fetch(`${apiUrl}/api/health/ipfs`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const latency = Date.now() - startTime
      const data = await response.json()
      
      checks.push({
        service: 'IPFS Pinning',
        status: response.ok && data.status === 'healthy' ? 'healthy' : 'degraded',
        latency,
        lastChecked: new Date().toISOString(),
        details: data.details || 'Connected'
      })
    } catch (error) {
      checks.push({
        service: 'IPFS Pinning',
        status: 'down',
        lastChecked: new Date().toISOString(),
        details: error instanceof Error ? error.message : 'Connection failed'
      })
    }

    // Check AI Server Availability
    try {
      const aiUrl = process.env.NEXT_PUBLIC_AI_API || 'https://ai.decentralizedrights.com'
      const startTime = Date.now()
      const response = await fetch(`${aiUrl}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const latency = Date.now() - startTime
      const data = await response.json()
      
      checks.push({
        service: 'AI Server',
        status: response.ok && data.status === 'healthy' ? 'healthy' : 'degraded',
        latency,
        lastChecked: new Date().toISOString(),
        details: data.details || 'Available'
      })
    } catch (error) {
      checks.push({
        service: 'AI Server',
        status: 'down',
        lastChecked: new Date().toISOString(),
        details: error instanceof Error ? error.message : 'Connection failed'
      })
    }

    // Check Explorer Connection Status
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.decentralizedrights.com'
      const startTime = Date.now()
      const response = await fetch(`${apiUrl}/api/transactions?page=1&page_size=1`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const latency = Date.now() - startTime
      const data = await response.json()
      
      checks.push({
        service: 'Explorer API',
        status: response.ok && data.transactions ? 'healthy' : 'degraded',
        latency,
        lastChecked: new Date().toISOString(),
        details: data.transactions ? `${data.total} transactions indexed` : 'No data'
      })
    } catch (error) {
      checks.push({
        service: 'Explorer API',
        status: 'down',
        lastChecked: new Date().toISOString(),
        details: error instanceof Error ? error.message : 'Connection failed'
      })
    }

    setHealthStatuses(checks)
    setLastUpdate(new Date())
    setLoading(false)
  }

  const getStatusIcon = (status: HealthStatus['status']) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle2 className="h-5 w-5 text-emerald-500" />
      case 'degraded':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case 'down':
        return <XCircle className="h-5 w-5 text-red-500" />
    }
  }

  const getStatusColor = (status: HealthStatus['status']) => {
    switch (status) {
      case 'healthy':
        return 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40'
      case 'degraded':
        return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/40'
      case 'down':
        return 'bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/40'
    }
  }

  const getServiceIcon = (service: string) => {
    if (service.includes('Blockchain')) return <Activity className="h-5 w-5" />
    if (service.includes('RPC')) return <Link2 className="h-5 w-5" />
    if (service.includes('OrbitDB')) return <Database className="h-5 w-5" />
    if (service.includes('IPFS')) return <Globe className="h-5 w-5" />
    if (service.includes('AI')) return <Cpu className="h-5 w-5" />
    if (service.includes('Explorer')) return <Activity className="h-5 w-5" />
    return <CheckCircle2 className="h-5 w-5" />
  }

  const overallStatus = healthStatuses.length > 0
    ? healthStatuses.every((s) => s.status === 'healthy')
      ? 'healthy'
      : healthStatuses.some((s) => s.status === 'down')
      ? 'down'
      : 'degraded'
    : 'unknown'

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-primary-950/20">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl">
            System Health Status
          </h1>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300">
            Real-time monitoring of DRP infrastructure components
          </p>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              {overallStatus === 'healthy' ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              ) : overallStatus === 'degraded' ? (
                <AlertCircle className="h-5 w-5 text-yellow-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Overall Status: <span className="capitalize">{overallStatus}</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
              <Clock className="h-4 w-4" />
              Last updated: {lastUpdate.toLocaleTimeString()}
            </div>
          </div>
        </header>

        {loading && healthStatuses.length === 0 ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 h-24" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {healthStatuses.map((status) => (
              <div
                key={status.service}
                className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-neutral-400 dark:text-neutral-500">{getServiceIcon(status.service)}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">{status.service}</h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                        {new Date(status.lastChecked).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  {getStatusIcon(status.status)}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Status</span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold border capitalize ${getStatusColor(status.status)}`}>
                      {status.status}
                    </span>
                  </div>
                  {status.latency !== undefined && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">Latency</span>
                      <span className="text-sm font-mono text-neutral-700 dark:text-neutral-300">{status.latency}ms</span>
                    </div>
                  )}
                  {status.details && (
                    <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{status.details}</p>
                  </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-4">Status Definitions</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
              <div>
                <p className="font-semibold text-sm text-neutral-900 dark:text-neutral-50">Healthy</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">Service is operating normally with expected latency</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <p className="font-semibold text-sm text-neutral-900 dark:text-neutral-50">Degraded</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">Service is operational but experiencing issues or high latency</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <p className="font-semibold text-sm text-neutral-900 dark:text-neutral-50">Down</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">Service is unavailable or not responding</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

