import { cn } from '@/lib/utils'

interface SignalOpsMarkProps {
  className?: string
  size?: number
}

/**
 * Custom bespoke vector mark for SignalOps.
 * Combines an angular tactical cyber-aegis, an interlocking kinetic signal pulse (stylized "S"),
 * and perimeter telemetry reticle marks.
 */
export function SignalOpsMark({ className, size = 32 }: SignalOpsMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0 select-none drop-shadow-[0_2px_8px_rgba(6,182,212,0.25)]', className)}
      aria-label="SignalOps Logo Mark"
    >
      <defs>
        {/* Deep faceted navy background shield gradient */}
        <linearGradient id="so-shield-surface" x1="18" y1="2" x2="18" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0b172b" />
          <stop offset="50%" stopColor="#07101e" />
          <stop offset="100%" stopColor="#030712" />
        </linearGradient>

        {/* Tactical neon cyber border gradient */}
        <linearGradient id="so-shield-edge" x1="4" y1="3" x2="32" y2="33" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
          <stop offset="35%" stopColor="#06b6d4" stopOpacity="0.6" />
          <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#1e293b" stopOpacity="0.3" />
        </linearGradient>

        {/* Upper Signal Wave Blade (Electric Cyan) */}
        <linearGradient id="so-blade-cyan" x1="8" y1="9" x2="28" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>

        {/* Lower Signal Wave Blade (Tactical Royal Blue) */}
        <linearGradient id="so-blade-blue" x1="28" y1="27" x2="8" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>

        {/* Glowing telemetry focal filter */}
        <filter id="so-core-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* 1. Tactical Hex-Aegis Shell (Faceted Cyber Crest) */}
      <path
        d="M18 2.5 L31 7.2 V18.5 C31 25.8 25.2 31.2 18 33.5 C10.8 31.2 5 25.8 5 18.5 V7.2 L18 2.5 Z"
        fill="url(#so-shield-surface)"
        stroke="url(#so-shield-edge)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* 2. Perimeter Precision Reticle Crosshairs */}
      <line x1="18" y1="4.5" x2="18" y2="7" stroke="#22d3ee" strokeOpacity="0.7" strokeWidth="1" strokeLinecap="round" />
      <line x1="18" y1="29" x2="18" y2="31.5" stroke="#3b82f6" strokeOpacity="0.5" strokeWidth="1" strokeLinecap="round" />
      <line x1="7" y1="18" x2="9.5" y2="18" stroke="#06b6d4" strokeOpacity="0.5" strokeWidth="1" strokeLinecap="round" />
      <line x1="26.5" y1="18" x2="29" y2="18" stroke="#06b6d4" strokeOpacity="0.5" strokeWidth="1" strokeLinecap="round" />

      {/* 3. Subtle Concentric Signal Radar Sweep Arc */}
      <path
        d="M10.5 15 A8.5 8.5 0 0 1 25.5 15"
        stroke="#06b6d4"
        strokeOpacity="0.25"
        strokeWidth="1"
        strokeDasharray="2.5 2"
        strokeLinecap="round"
      />

      {/* 4. Upper Kinetic Signal Blade (Forms top of stylized 'S') */}
      <path
        d="M26 10.5 H16.2 C13.5 10.5 11.5 12.2 11.5 14.8 C11.5 17.5 13.8 19 16.5 19.4 L19.2 19.8"
        stroke="url(#so-blade-cyan)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 5. Lower Kinetic Signal Blade (Forms bottom of stylized 'S') */}
      <path
        d="M10 25.5 H19.8 C22.5 25.5 24.5 23.8 24.5 21.2 C24.5 18.5 22.2 17 19.5 16.6 L16.8 16.2"
        stroke="url(#so-blade-blue)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 6. High-Frequency Central Telemetry Spike (Active Frequency Pulse) */}
      <path
        d="M13.5 18 L16.5 14 L19.5 22 L22.5 18"
        stroke="#ffffff"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#so-core-glow)"
      />

      {/* 7. Central Focal Node Beacon */}
      <circle cx="18" cy="18" r="2.2" fill="#22d3ee" fillOpacity="0.3" />
      <circle cx="18" cy="18" r="1.3" fill="#67e8f9" />
      <circle cx="18" cy="18" r="0.6" fill="#ffffff" />
    </svg>
  )
}

interface SignalOpsLogoProps {
  collapsed?: boolean
  className?: string
  markSize?: number
}

/**
 * Full Brand Logo Component combining custom mark with tracked enterprise typography.
 */
export function SignalOpsLogo({
  collapsed = false,
  className,
  markSize = 32,
}: SignalOpsLogoProps) {
  return (
    <div className={cn('flex items-center gap-2.5 overflow-hidden', className)}>
      <div className="relative flex items-center justify-center shrink-0">
        <SignalOpsMark size={markSize} />
        {/* Subtle ambient back-glow */}
        <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-sm pointer-events-none -z-10" />
      </div>

      {!collapsed && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center tracking-wider text-sm font-black font-sans">
            <span className="text-slate-100 tracking-[0.14em]">SIGNAL</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400 font-extrabold tracking-[0.08em] ml-0.5">
              OPS
            </span>
          </div>
          <span className="text-[8.5px] font-mono tracking-[0.22em] text-slate-500 uppercase mt-0.5 font-semibold">
            SOC TELEMETRY
          </span>
        </div>
      )}
    </div>
  )
}
