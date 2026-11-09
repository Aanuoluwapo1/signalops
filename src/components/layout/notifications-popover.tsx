import { useState, useRef, useEffect } from 'react'
import { Bell, Info, ShieldAlert, CheckCircle2 } from 'lucide-react'

interface NotificationItem {
  readonly id: string
  readonly title: string
  readonly time: string
  readonly type: 'alert' | 'system' | 'resolution'
  readonly read: boolean
}

const SIMULATED_NOTIFICATIONS: readonly NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Synthetic rule triggered: Cobalt Strike Malleable C2 pattern',
    time: '2m ago',
    type: 'alert',
    read: false,
  },
  {
    id: 'notif-2',
    title: 'Endpoint isolator test passed on synthetic host WIN-SRV-02',
    time: '18m ago',
    type: 'resolution',
    read: false,
  },
  {
    id: 'notif-3',
    title: 'Simulated SIEM ingestion rate normalized at 4,200 EPS',
    time: '45m ago',
    type: 'system',
    read: true,
  },
]

export function NotificationsPopover() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState(SIMULATED_NOTIFICATIONS)
  const popoverRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter((n) => !n.read).length

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <div className="relative" ref={popoverRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-md text-slate-400 hover:text-slate-200 hover:bg-[#121c33] transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
        aria-label="View notifications"
        aria-expanded={isOpen}
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-lg border border-[#203152] bg-[#0c1322] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#182640] bg-[#0a0f1d]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-200">Notifications</span>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.2 bg-cyan-950 border border-cyan-800 text-[10px] font-mono text-cyan-300 rounded">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-72 overflow-y-auto divide-y divide-[#141f36]">
            {notifications.map((item) => (
              <div
                key={item.id}
                className={`p-3 flex items-start space-x-3 transition-colors ${
                  item.read ? 'bg-transparent text-slate-400' : 'bg-[#0e172a]/70 text-slate-200'
                }`}
              >
                {item.type === 'alert' ? (
                  <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                ) : item.type === 'resolution' ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <Info className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium leading-relaxed">{item.title}</p>
                  <p className="text-[10px] text-slate-500 mt-1 font-mono">{item.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 py-2 border-t border-[#182640] bg-[#080d1a] text-center text-[10px] font-mono text-slate-500">
            SIMULATED NOTIFICATION QUEUE
          </div>
        </div>
      )}
    </div>
  )
}
