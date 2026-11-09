import { useState, useRef, useEffect } from 'react'
import { User, Shield, Radio, ChevronDown, Check } from 'lucide-react'

export function AnalystMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1 rounded-md hover:bg-[#121c33] transition-colors border border-transparent hover:border-[#1d2d4a] focus:outline-none"
        aria-label="Analyst menu"
        aria-expanded={isOpen}
      >
        <div className="h-6 w-6 rounded bg-cyan-950 border border-cyan-800/80 flex items-center justify-center text-cyan-300 font-mono text-xs font-semibold">
          AR
        </div>
        <div className="hidden md:flex flex-col text-left">
          <span className="text-xs font-medium text-slate-200 leading-tight">Analyst Reynolds</span>
          <span className="text-[10px] text-cyan-400 font-mono leading-tight">Tier 2 SOC</span>
        </div>
        <ChevronDown className="h-3 w-3 text-slate-400 hidden sm:block" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg border border-[#203152] bg-[#0c1322] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3.5 py-3 border-b border-[#182640] bg-[#090f1e]">
            <p className="text-xs font-semibold text-white">Analyst Reynolds</p>
            <p className="text-[11px] text-slate-400">a.reynolds@soc.internal</p>
            <div className="mt-2 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Shift Active: 08:00 - 16:00 UTC</span>
            </div>
          </div>

          <div className="p-1 space-y-0.5 text-xs text-slate-300">
            <div className="px-2.5 py-1.5 flex items-center justify-between rounded hover:bg-[#121c32] cursor-pointer">
              <span className="flex items-center gap-2">
                <Shield className="h-3.5 w-3.5 text-cyan-400" />
                <span>Analyst Role</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">Tier 2</span>
            </div>

            <div className="px-2.5 py-1.5 flex items-center justify-between rounded hover:bg-[#121c32] cursor-pointer">
              <span className="flex items-center gap-2">
                <Radio className="h-3.5 w-3.5 text-emerald-400" />
                <span>Simulation Mode</span>
              </span>
              <Check className="h-3 w-3 text-cyan-400" />
            </div>

            <div className="px-2.5 py-1.5 flex items-center gap-2 rounded hover:bg-[#121c32] cursor-pointer text-slate-400">
              <User className="h-3.5 w-3.5" />
              <span>Analyst Settings</span>
            </div>
          </div>

          <div className="px-3 py-2 border-t border-[#182640] bg-[#080d1a] text-[10px] font-mono text-slate-500">
            SESSION: SIM-AUTH-ACTIVE
          </div>
        </div>
      )}
    </div>
  )
}
