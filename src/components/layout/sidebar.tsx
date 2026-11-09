import { NavLink } from 'react-router-dom'
import { Shield, ChevronLeft, ChevronRight } from 'lucide-react'
import { MAIN_NAV_ITEMS } from './nav-config'
import { useUIStore } from '@/stores/use-ui-store'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const { isSidebarCollapsed, toggleSidebar } = useUIStore()

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col h-screen shrink-0 border-r border-[#152238] bg-[#070c17] transition-all duration-200 z-30 select-none',
        isSidebarCollapsed ? 'w-16' : 'w-60',
      )}
    >
      {/* Brand & Logo */}
      <div className="h-14 flex items-center px-4 border-b border-[#141f33] justify-between">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-2.5 overflow-hidden focus:outline-none"
        >
          <div className="h-8 w-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center shrink-0 shadow-sm shadow-cyan-950">
            <Shield className="h-4 w-4 text-cyan-400" />
          </div>
          {!isSidebarCollapsed && (
            <div className="flex flex-col leading-none">
              <span className="font-bold text-sm tracking-wide text-white">
                SIGNAL<span className="text-cyan-400">OPS</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase mt-0.5">
                SOC PLATFORM
              </span>
            </div>
          )}
        </NavLink>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {MAIN_NAV_ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.href}
              to={item.href}
              title={isSidebarCollapsed ? item.title : undefined}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-all group relative',
                  isActive
                    ? 'bg-cyan-950/30 text-cyan-300 border border-cyan-800/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#0d1629] border border-transparent',
                  isSidebarCollapsed && 'justify-center px-2',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={cn(
                      'h-4 w-4 shrink-0 transition-colors',
                      isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200',
                    )}
                  />
                  {!isSidebarCollapsed && (
                    <span className="truncate flex-1">{item.title}</span>
                  )}
                  {!isSidebarCollapsed && item.badge && (
                    <span
                      className={cn(
                        'px-1.5 py-0.5 rounded text-[10px] font-mono leading-none font-semibold border',
                        item.badgeColor === 'red' && 'bg-red-950/80 text-red-400 border-red-800/60',
                        item.badgeColor === 'amber' && 'bg-amber-950/80 text-amber-400 border-amber-800/60',
                        (!item.badgeColor || item.badgeColor === 'default') &&
                          'bg-[#17253d] text-slate-300 border-[#223555]',
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                  {/* Collapsed dot badge */}
                  {isSidebarCollapsed && item.badge && (
                    <span
                      className={cn(
                        'absolute top-1.5 right-2 h-1.5 w-1.5 rounded-full',
                        item.badgeColor === 'red' ? 'bg-red-400' : 'bg-amber-400',
                      )}
                    />
                  )}
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* Collapse Toggle Footer */}
      <div className="p-2 border-t border-[#141f33]">
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="w-full flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-200 hover:bg-[#0d1629] transition-colors text-xs"
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <div className="flex items-center gap-2 w-full justify-between px-1">
              <span className="text-[11px] text-slate-500 font-mono">COLLAPSE SIDEBAR</span>
              <ChevronLeft className="h-4 w-4" />
            </div>
          )}
        </button>
      </div>
    </aside>
  )
}
