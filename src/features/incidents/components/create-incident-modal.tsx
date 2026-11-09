import { useState, type FormEvent } from 'react'
import { X, Flame, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { IncidentSeverity } from '@/types/incidents'
import { useIncidentsStore } from '../stores/use-incidents-store'

interface CreateIncidentModalProps {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly onCreated?: (newId: string) => void
}

export function CreateIncidentModal({ isOpen, onClose, onCreated }: CreateIncidentModalProps) {
  const { createIncident } = useIncidentsStore()

  const [title, setTitle] = useState('')
  const [severity, setSeverity] = useState<IncidentSeverity>('high')
  const [analyst, setAnalyst] = useState('Analyst Reynolds')
  const [assetName, setAssetName] = useState('')
  const [summary, setSummary] = useState('')
  const [linkedAlert, setLinkedAlert] = useState('ALT-1042')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !summary.trim()) return

    setIsSubmitting(true)
    const newId = createIncident({
      title: title.trim(),
      severity,
      summary: summary.trim(),
      assignedAnalyst: analyst,
      affectedAssetsNames: [assetName.trim() || 'WIN-DC-01.corp.internal'],
      linkedAlertIds: linkedAlert ? [linkedAlert.trim()] : [],
    })

    setIsSubmitting(false)
    if (onCreated) {
      onCreated(newId)
    }
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Simulate New Security Incident"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-xl border border-[#203152] bg-[#090f1e] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#141f33] bg-[#070c17]">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-red-950/80 border border-red-800/80 text-red-400">
              <Flame className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Create Security Incident (Simulation)</h2>
              <p className="text-[11px] font-mono text-slate-400">Generate a synthetic SOC response case</p>
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

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Incident Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Rogue Domain Admin Account Provisioning"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-8 px-3 text-xs rounded-md bg-[#0c1424] border border-[#1e2e4f] text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Severity Level
              </label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as IncidentSeverity)}
                className="w-full h-8 px-2.5 text-xs rounded-md bg-[#0c1424] border border-[#1e2e4f] text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                <option value="critical" className="text-red-400">Critical</option>
                <option value="high" className="text-orange-400">High</option>
                <option value="medium" className="text-amber-400">Medium</option>
                <option value="low" className="text-blue-400">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Incident Commander
              </label>
              <input
                type="text"
                value={analyst}
                onChange={(e) => setAnalyst(e.target.value)}
                className="w-full h-8 px-3 text-xs rounded-md bg-[#0c1424] border border-[#1e2e4f] text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Target Asset
              </label>
              <input
                type="text"
                placeholder="e.g. DC-02.corp.internal"
                value={assetName}
                onChange={(e) => setAssetName(e.target.value)}
                className="w-full h-8 px-3 text-xs rounded-md bg-[#0c1424] border border-[#1e2e4f] text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Link Alert ID
              </label>
              <input
                type="text"
                placeholder="e.g. ALT-1042"
                value={linkedAlert}
                onChange={(e) => setLinkedAlert(e.target.value)}
                className="w-full h-8 px-3 text-xs rounded-md bg-[#0c1424] border border-[#1e2e4f] text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Executive Incident Summary *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Describe the initial attack vector, compromised scopes, and immediate risk..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full p-2.5 text-xs rounded-md bg-[#0c1424] border border-[#1e2e4f] text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 leading-relaxed"
            />
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-[#141f33]">
            <span className="text-[10px] font-mono text-cyan-400">
              SYNTHETIC CASE CREATION
            </span>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="cyan" size="sm" type="submit" disabled={isSubmitting}>
                <Plus className="h-3.5 w-3.5 mr-1" />
                <span>Create Incident</span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
