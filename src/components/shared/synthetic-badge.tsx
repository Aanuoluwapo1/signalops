import { ShieldAlert } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function SyntheticBadge() {
  return (
    <Badge variant="cyan" className="bg-cyan-950/40 text-cyan-400 border-cyan-800/40 font-mono text-[10px] tracking-wider py-0.5 px-2">
      <ShieldAlert className="h-3 w-3 text-cyan-400 shrink-0" />
      <span>SIMULATED SOC ENVIRONMENT</span>
    </Badge>
  )
}
