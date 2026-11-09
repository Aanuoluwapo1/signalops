import { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { AlertStatus } from '@/types/alerts'
import { useAlertsStore } from '../stores/use-alerts-store'
import { CheckCircle2, Clock, XCircle, AlertCircle, UserCheck, ShieldAlert } from 'lucide-react'

interface AlertStatusActionsProps {
  readonly alertId: string
  readonly currentStatus: AlertStatus
  readonly assignedAnalyst?: string
}

export function AlertStatusActions({
  alertId,
  currentStatus,
  assignedAnalyst,
}: AlertStatusActionsProps) {
  const { updateAlertStatus, assignAlert } = useAlertsStore()
  const [feedback, setFeedback] = useState<string | null>(null)

  const handleStatusChange = (newStatus: AlertStatus) => {
    updateAlertStatus(alertId, newStatus)
    setFeedback(`Status transitioned to: ${newStatus.replace('_', ' ').toUpperCase()}`)
    setTimeout(() => setFeedback(null), 3000)
  }

  const handleAssignToMe = () => {
    assignAlert(alertId, 'Analyst Reynolds')
    setFeedback('Assigned to Analyst Reynolds (Tier 2)')
    setTimeout(() => setFeedback(null), 3000)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 flex-wrap">
        {!assignedAnalyst && (
          <Button
            variant="secondary"
            size="sm"
            onClick={handleAssignToMe}
            className="text-xs"
          >
            <UserCheck className="h-3.5 w-3.5 mr-1.5 text-cyan-400" />
            <span>Assign to Me</span>
          </Button>
        )}

        {currentStatus !== 'investigating' && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleStatusChange('investigating')}
            className="text-xs text-amber-300 border-amber-900/50 hover:bg-amber-950/40"
          >
            <Clock className="h-3.5 w-3.5 mr-1.5 text-amber-400" />
            <span>Mark Investigating</span>
          </Button>
        )}

        {currentStatus !== 'resolved' && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleStatusChange('resolved')}
            className="text-xs text-emerald-300 border-emerald-900/50 hover:bg-emerald-950/40"
          >
            <CheckCircle2 className="h-3.5 w-3.5 mr-1.5 text-emerald-400" />
            <span>Resolve Alert</span>
          </Button>
        )}

        {currentStatus !== 'false_positive' && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleStatusChange('false_positive')}
            className="text-xs text-slate-300 border-slate-700/50 hover:bg-slate-900/60"
          >
            <XCircle className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
            <span>Flag False Positive</span>
          </Button>
        )}

        {currentStatus !== 'open' && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleStatusChange('open')}
            className="text-xs text-cyan-300 border-cyan-900/50 hover:bg-cyan-950/40"
          >
            <AlertCircle className="h-3.5 w-3.5 mr-1.5 text-cyan-400" />
            <span>Reopen Alert</span>
          </Button>
        )}
      </div>

      {feedback && (
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-1 rounded animate-in fade-in duration-150">
          <ShieldAlert className="h-3 w-3 text-cyan-400 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}
    </div>
  )
}
