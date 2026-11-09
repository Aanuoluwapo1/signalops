import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react'
import { MAIN_NAV_ITEMS } from './nav-config'
import { SignalOpsLogo } from '@/components/shared/signalops-logo'
import { useUIStore } from '@/stores/use-ui-store'
import { cn } from '@/lib/utils'

export function MobileNav() {
  const { isMobileNavOpen, setMobileNavOpen } = useUIStore()

  if (!isMobileNavOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={() => setMobileNavOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-64 max-w-[80%] bg-[#070c17] border-r border-[#152238] flex flex-col h-full z-10 animate-in slide-in-from-left duration-200">
        <div className="h-14 flex items-center justify-between px-4 border-b border-[#141f33]">
          <SignalOpsLogo markSize={30} />
          <button
            type="button"
            onClick={() => setMobileNavOpen(false)}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-[#121c32]"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {MAIN_NAV_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setMobileNavOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-medium transition-colors',
                    isActive
                      ? 'bg-cyan-950/40 text-cyan-300 border border-cyan-800/40 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#0d1629] border border-transparent',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={cn(
                        'h-4 w-4 shrink-0',
                        isActive ? 'text-cyan-400' : 'text-slate-400',
                      )}
                    />
                    <span className="truncate flex-1">{item.title}</span>
                    {item.badge && (
                      <span
                        className={cn(
                          'px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold border',
                          item.badgeColor === 'red' && 'bg-red-950 text-red-400 border-red-800',
                          item.badgeColor === 'amber' && 'bg-amber-950 text-amber-400 border-amber-800',
                          (!item.badgeColor || item.badgeColor === 'default') &&
                            'bg-[#17253d] text-slate-300 border-[#223555]',
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>

        <div className="p-4 border-t border-[#141f33] text-[10px] font-mono text-slate-500">
          SIMULATED SOC &bull; v1.0.0
        </div>
      </div>
    </div>
  )
}
