import { Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

export type DateRangePreset = '1h' | '6h' | '24h' | '7d' | '30d'

interface DateRangeFilterProps {
  readonly selected: DateRangePreset
  readonly onChange: (preset: DateRangePreset) => void
}

const PRESETS: readonly { readonly id: DateRangePreset; readonly label: string }[] = [
  { id: '1h', label: 'Last 1h' },
  { id: '6h', label: 'Last 6h' },
  { id: '24h', label: 'Last 24h' },
  { id: '7d', label: '7 Days' },
  { id: '30d', label: '30 Days' },
]

export function DateRangeFilter({ selected, onChange }: DateRangeFilterProps) {
  return (
    <div className="inline-flex items-center gap-1 p-0.5 rounded-lg bg-[#070d18] border border-[#16233b]">
      <div className="hidden sm:flex items-center pl-2 pr-1 text-slate-500">
        <Calendar className="h-3.5 w-3.5" />
      </div>
      {PRESETS.map((preset) => {
        const isSelected = selected === preset.id
        return (
          <button
            key={preset.id}
            type="button"
            onClick={() => onChange(preset.id)}
            className={cn(
              'px-2.5 py-1 text-xs font-mono rounded-md transition-colors select-none font-medium',
              isSelected
                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-700/60 shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#0e1628]',
            )}
          >
            {preset.label}
          </button>
        )
      })}
    </div>
  )
}
