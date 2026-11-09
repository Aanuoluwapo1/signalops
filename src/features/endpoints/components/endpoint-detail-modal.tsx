import { X, Laptop, Shield, WifiOff, Wifi, AlertCircle, Bug, Clock, Network } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EndpointStatusBadge } from './endpoint-status-badge'
import type { EndpointRecord } from '@/types/endpoints'
import { useEndpointsStore } from '../stores/use-endpoints-store'
import { Link } from 'react-router-dom'

interface EndpointDetailModalProps {
  readonly endpoint: EndpointRecord | null
  readonly onClose: () => void
}

export function EndpointDetailModal({ endpoint, onClose }: EndpointDetailModalProps) {
  const { toggleEndpointIsolation } = useEndpointsStore()

  if (!endpoint) return null

  const isIsolated = endpoint.agentStatus === 'isolated'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Endpoint Dossier for ${endpoint.hostname}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-xl border border-[#203152] bg-[#090f1e] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#141f33] bg-[#070c17]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-cyan-950 border border-cyan-800 text-cyan-400">
              <Laptop className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">{endpoint.hostname}</h2>
              <p className="text-[11px] font-mono text-slate-400">
                Asset ID: {endpoint.id} &bull; Synthetic Endpoint Telemetry
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-[#121c32]"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          {/* Status & Action Bar */}
          <div className="p-3.5 rounded-lg bg-[#0c1424] border border-[#16233b] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">EDR Sensor:</span>
              <EndpointStatusBadge status={endpoint.agentStatus} />
            </div>

            <Button
              variant={isIsolated ? 'default' : 'danger'}
              size="sm"
              onClick={() => toggleEndpointIsolation(endpoint.id)}
              className="text-xs"
            >
              {isIsolated ? (
                <>
                  <Wifi className="h-3.5 w-3.5 mr-1.5" />
                  <span>Restore Network Connection</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-3.5 w-3.5 mr-1.5" />
                  <span>Quarantine Host (Isolate)</span>
                </>
              )}
            </Button>
          </div>

          {/* Specifications */}
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded bg-[#070d18] border border-[#141f33]">
              <span className="text-slate-500 text-[10px] uppercase block">IP Address</span>
              <span className="text-cyan-400 font-semibold">{endpoint.ipAddress}</span>
            </div>
            <div className="p-3 rounded bg-[#070d18] border border-[#141f33]">
              <span className="text-slate-500 text-[10px] uppercase block">Operating System</span>
              <span className="text-slate-200">{endpoint.operatingSystem}</span>
            </div>
            <div className="p-3 rounded bg-[#070d18] border border-[#141f33]">
              <span className="text-slate-500 text-[10px] uppercase block">Network Segment</span>
              <span className="text-slate-300 flex items-center gap-1">
                <Network className="h-3 w-3 text-cyan-400 shrink-0" />
                {endpoint.vlan}
              </span>
            </div>
            <div className="p-3 rounded bg-[#070d18] border border-[#141f33]">
              <span className="text-slate-500 text-[10px] uppercase block">Last Heartbeat</span>
              <span className="text-slate-300 flex items-center gap-1">
                <Clock className="h-3 w-3 text-slate-400 shrink-0" />
                {new Date(endpoint.lastHeartbeat).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} UTC
              </span>
            </div>
          </div>

          {/* Vulnerability & Active Threats Summary */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded bg-[#070d18] border border-[#141f33] space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <Bug className="h-3.5 w-3.5 text-amber-400" />
                <span>CVE Vulnerabilities</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-1.5 py-0.5 rounded bg-red-950/80 border border-red-800 text-red-300 text-[11px]">
                  {endpoint.vulnerabilitySummary.critical} Crit
                </span>
                <span className="px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-800 text-amber-300 text-[11px]">
                  {endpoint.vulnerabilitySummary.high} High
                </span>
                <span className="px-1.5 py-0.5 rounded bg-blue-950/80 border border-blue-800 text-blue-300 text-[11px]">
                  {endpoint.vulnerabilitySummary.medium} Med
                </span>
              </div>
            </div>

            <div className="p-3 rounded bg-[#070d18] border border-[#141f33] space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <AlertCircle className="h-3.5 w-3.5 text-red-400" />
                <span>Active Threat Detections</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white font-bold text-base">
                  {endpoint.activeAlertsCount} Alerts
                </span>
                {endpoint.activeAlertsCount > 0 ? (
                  <Link to="/alerts" onClick={onClose}>
                    <Button variant="ghost" size="sm" className="h-6 text-[11px] text-cyan-400 hover:text-cyan-300">
                      View In Queue
                    </Button>
                  </Link>
                ) : (
                  <span className="text-[11px] text-emerald-400">Clean Fleet Status</span>
                )}
              </div>
            </div>
          </div>

          {/* Footer declaration */}
          <div className="pt-2 flex items-center justify-between border-t border-[#141f33] text-[10px] font-mono text-slate-500">
            <span className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-cyan-400" />
              <span>EDR SENSOR SIMULATION AGENT</span>
            </span>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-7 text-xs">
              Close Dossier
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
