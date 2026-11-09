import { useState } from 'react'
import { X, Copy, Check, Terminal, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EventLevelBadge } from './event-level-badge'
import type { SecurityEventRecord } from '@/types/events'

interface EventDetailModalProps {
  readonly event: SecurityEventRecord | null
  readonly onClose: () => void
}

export function EventDetailModal({ event, onClose }: EventDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'structured' | 'json'>('structured')
  const [copied, setCopied] = useState(false)

  if (!event) return null

  const fullJsonString = JSON.stringify(
    {
      RecordId: event.id,
      EventId: event.eventId,
      EventName: event.eventName,
      Timestamp: event.timestamp,
      SourceHost: event.sourceHost,
      Provider: event.provider,
      Level: event.level,
      Fields: event.rawFields,
      SimulationEnvironment: 'SIGNALOPS_SIEM_SANDBOX',
      isSynthetic: true,
    },
    null,
    2,
  )

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullJsonString)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Security Event Inspector: Event ID ${event.eventId}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-xl border border-[#203152] bg-[#090f1e] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#141f33] bg-[#070c17]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-cyan-950 border border-cyan-800 text-cyan-400">
              <Terminal className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white font-mono">
                  Event ID: {event.eventId}
                </span>
                <EventLevelBadge level={event.level} />
              </div>
              <p className="text-[11px] font-mono text-slate-400 truncate max-w-md">
                {event.eventName}
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

        {/* Tab Controls & Copy button */}
        <div className="px-5 py-2.5 border-b border-[#141f33] bg-[#0a1020] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('structured')}
              className={`px-3 py-1 text-xs font-mono rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'structured'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="h-3 w-3" />
              <span>Structured Fields</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('json')}
              className={`px-3 py-1 text-xs font-mono rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'json'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="h-3 w-3" />
              <span>Raw JSON Log</span>
            </button>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopy}
            className="h-7 text-xs font-mono"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 mr-1 text-emerald-400" />
                <span className="text-emerald-300">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 mr-1 text-slate-400" />
                <span>Copy JSON</span>
              </>
            )}
          </Button>
        </div>

        {/* Modal Body */}
        <div className="p-5 max-h-[460px] overflow-y-auto space-y-4">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded bg-[#070d18] border border-[#141f33]">
              <span className="text-[10px] text-slate-500 uppercase block">Host Source</span>
              <span className="text-slate-200 font-semibold truncate block">{event.sourceHost}</span>
            </div>
            <div className="p-2.5 rounded bg-[#070d18] border border-[#141f33]">
              <span className="text-[10px] text-slate-500 uppercase block">Provider</span>
              <span className="text-cyan-400 truncate block">{event.provider}</span>
            </div>
            <div className="p-2.5 rounded bg-[#070d18] border border-[#141f33]">
              <span className="text-[10px] text-slate-500 uppercase block">Record ID</span>
              <span className="text-slate-300 font-semibold">{event.id}</span>
            </div>
            <div className="p-2.5 rounded bg-[#070d18] border border-[#141f33]">
              <span className="text-[10px] text-slate-500 uppercase block">Timestamp</span>
              <span className="text-slate-300">{new Date(event.timestamp).toLocaleTimeString()} UTC</span>
            </div>
          </div>

          {activeTab === 'structured' ? (
            /* Structured Field Inspector */
            <div className="rounded-lg border border-[#16233b] overflow-hidden">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="bg-[#070d18] border-b border-[#141f33] text-[10px] text-slate-500 uppercase">
                    <th className="py-2 px-3 font-semibold w-1/3">Field Name</th>
                    <th className="py-2 px-3 font-semibold">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#131f33]">
                  {Object.entries(event.rawFields).map(([key, val]) => (
                    <tr key={key} className="hover:bg-[#0c1424]">
                      <td className="py-2 px-3 text-cyan-300 font-semibold break-all">
                        {key}
                      </td>
                      <td className="py-2 px-3 text-slate-200 break-all select-text">
                        {String(val)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Raw JSON View */
            <pre className="p-4 rounded-lg bg-[#050811] border border-[#152033] text-xs font-mono text-cyan-300/90 overflow-x-auto leading-relaxed select-text">
              {fullJsonString}
            </pre>
          )}

          <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-[#141f33]">
            <span>SYNTHETIC SECURITY EVENT LOG &bull; SIEM STREAM</span>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-7 text-xs">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
