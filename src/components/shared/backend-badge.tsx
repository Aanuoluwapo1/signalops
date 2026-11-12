import { useEffect, useState } from 'react'
import { Database } from 'lucide-react'
import { apiClient } from '@/lib/api-client'
import type { ApiHealthResponse } from '@/lib/api-client'

export function BackendBadge() {
  const [health, setHealth] = useState<ApiHealthResponse | null>(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    let mounted = true
    apiClient.checkHealth().then((res) => {
      if (mounted) {
        setHealth(res)
        setChecked(true)
      }
    })

    const interval = setInterval(() => {
      apiClient.checkHealth().then((res) => {
        if (mounted) setHealth(res)
      })
    }, 15000)

    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [])

  if (!checked) return null

  const isConnected = Boolean(health?.status === 'online')

  return (
    <div
      title={
        isConnected
          ? `Connected to ${health?.service} (${health?.database}) - Uptime: ${health?.uptimeSeconds}s`
          : 'Backend API offline - Running in client-side simulation mode'
      }
      className="hidden md:inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono border transition-colors select-none bg-[#091322] border-[#162744] text-slate-300"
    >
      <Database className="h-3 w-3 text-cyan-400" />
      <span className="text-slate-400">DB:</span>
      <span className={isConnected ? 'text-emerald-400 font-semibold' : 'text-slate-400'}>
        {isConnected ? 'SQLite (WAL)' : 'In-Memory'}
      </span>
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
        }`}
      />
    </div>
  )
}
