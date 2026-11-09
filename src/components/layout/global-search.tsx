import { useEffect, useState, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, ShieldAlert, Flame, Laptop, ArrowRight } from 'lucide-react'
import { useUIStore } from '@/stores/use-ui-store'

interface SearchItem {
  readonly id: string
  readonly title: string
  readonly category: 'Navigation' | 'Simulated Alert' | 'Simulated Incident'
  readonly path: string
  readonly hint?: string
}

const SEARCH_ITEMS: readonly SearchItem[] = [
  { id: 'nav-dashboard', title: 'Dashboard Overview', category: 'Navigation', path: '/dashboard', hint: 'Overview' },
  { id: 'nav-alerts', title: 'Alerts Triage Queue', category: 'Navigation', path: '/alerts', hint: '14 Active' },
  { id: 'nav-incidents', title: 'Incident Response Queue', category: 'Navigation', path: '/incidents', hint: '3 Open' },
  { id: 'nav-endpoints', title: 'Endpoint Fleet Inventory', category: 'Navigation', path: '/endpoints', hint: 'Fleet' },
  { id: 'nav-events', title: 'SIEM Event Stream', category: 'Navigation', path: '/events', hint: 'Raw telemetry' },
  { id: 'nav-analytics', title: 'Threat Intelligence & ATT&CK', category: 'Navigation', path: '/analytics', hint: 'Metrics' },
  { id: 'nav-reports', title: 'SOC Compliance Reports', category: 'Navigation', path: '/reports', hint: 'Audits' },
  { id: 'nav-settings', title: 'Platform Settings & Integrations', category: 'Navigation', path: '/settings', hint: 'Config' },
  { id: 'alt-1042', title: 'ALT-1042: Pass-the-Hash Detected on DC-01', category: 'Simulated Alert', path: '/alerts/ALT-1042', hint: 'Critical' },
  { id: 'alt-1043', title: 'ALT-1043: Suspicious PowerShell Download Cradle', category: 'Simulated Alert', path: '/alerts/ALT-1043', hint: 'High' },
  { id: 'inc-401', title: 'INC-401: Suspected Cobalt Strike C2 Beaconing', category: 'Simulated Incident', path: '/incidents/INC-401', hint: 'Critical' },
]

interface GlobalSearchModalProps {
  readonly onClose: () => void
}

function GlobalSearchModal({ onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const navigate = useNavigate()

  const filteredItems = SEARCH_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase()) ||
    item.path.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = (item: SearchItem) => {
    onClose()
    navigate(item.path)
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length))
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault()
      handleSelect(filteredItems[selectedIndex])
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Global search command palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-xl border border-[#233555] bg-[#0c1424] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 border-b border-[#182742]">
          <Search className="h-4 w-4 text-cyan-400 shrink-0 mr-3" />
          <input
            autoFocus
            type="text"
            placeholder="Search commands, simulated alerts, or navigation... (e.g. ALT-1042)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleInputKeyDown}
            className="w-full h-12 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-slate-500 hover:text-slate-300 p-1"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block ml-2 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-[#16233b] border border-[#25375c] rounded">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No results found for &ldquo;<span className="text-slate-200">{query}</span>&rdquo; in simulated catalog.
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-cyan-950/40 border border-cyan-800/50 text-cyan-200'
                      : 'text-slate-300 hover:bg-[#121c33] border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    {item.category === 'Simulated Alert' ? (
                      <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0" />
                    ) : item.category === 'Simulated Incident' ? (
                      <Flame className="h-4 w-4 text-red-400 shrink-0" />
                    ) : (
                      <Laptop className="h-4 w-4 text-cyan-400 shrink-0" />
                    )}
                    <span className="text-xs font-medium truncate">{item.title}</span>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0 ml-3">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      {item.category}
                    </span>
                    <ArrowRight className="h-3 w-3 text-slate-600" />
                  </div>
                </div>
              )
            })
          )}
        </div>

        <div className="px-4 py-2 border-t border-[#182742] bg-[#090f1d] flex items-center justify-between text-[11px] text-slate-500">
          <span>Navigate with &uarr; &darr;, select with Enter</span>
          <span className="font-mono text-cyan-400/80">SIMULATED CATALOG</span>
        </div>
      </div>
    </div>
  )
}

export function GlobalSearch() {
  const { isSearchOpen, setSearchOpen } = useUIStore()

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(!isSearchOpen)
      } else if (e.key === 'Escape' && isSearchOpen) {
        setSearchOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSearchOpen, setSearchOpen])

  if (!isSearchOpen) {
    return null
  }

  return <GlobalSearchModal onClose={() => setSearchOpen(false)} />
}
