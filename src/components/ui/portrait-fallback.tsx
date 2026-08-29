'use client';

interface PortraitFallbackProps {
  title?: string;
  subtitle?: string;
}

export function PortraitFallback({
  title = 'Visual Core Online',
  subtitle = 'Awaiting Portrait Image',
}: PortraitFallbackProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-neutral-950 to-black p-8 select-none">
      {/* Glowing background circle */}
      <div className="absolute w-[200px] h-[200px] rounded-full bg-[var(--accent)]/10 blur-[80px] animate-pulse" />

      {/* Digital cyber grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Geometric elements */}
      <svg className="w-16 h-16 sm:w-20 sm:h-20 text-white/20 mb-6 relative z-10" viewBox="0 0 100 100" fill="none" stroke="currentColor">
        <circle cx="50" cy="50" r="40" strokeWidth="1" strokeDasharray="4 4" className="animate-[spin_120s_linear_infinite]" />
        <circle cx="50" cy="50" r="30" strokeWidth="1.5" strokeDasharray="10 5" className="animate-[spin_60s_linear_infinite_reverse] text-[var(--accent)]/40" />
        <polygon points="50,25 72,65 28,65" strokeWidth="1" />
        <line x1="50" y1="10" x2="50" y2="90" strokeWidth="0.5" strokeDasharray="2 2" />
        <line x1="10" y1="50" x2="90" y2="50" strokeWidth="0.5" strokeDasharray="2 2" />
      </svg>

      <span className="text-[11px] text-white/60 tracking-[0.2em] font-[family-name:var(--font-body)] uppercase z-10 text-center mb-1">
        {title}
      </span>
      <span className="text-[9px] text-[var(--accent)] tracking-[0.1em] font-[family-name:var(--font-body)] uppercase z-10 text-center opacity-80">
        {subtitle}
      </span>
    </div>
  );
}
