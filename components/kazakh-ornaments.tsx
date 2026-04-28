'use client'

export function HorizontalDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <svg width="400" height="24" viewBox="0 0 400 24" fill="none" className="w-full max-w-md">
        {/* Diamond pattern - қошқармүйіз inspired */}
        <path 
          d="M0 12 L20 2 L40 12 L20 22 Z" 
          fill="none" 
          stroke="url(#goldGradient)" 
          strokeWidth="1.5"
        />
        <path 
          d="M40 12 L60 2 L80 12 L60 22 Z" 
          fill="none" 
          stroke="url(#goldGradient)" 
          strokeWidth="1.5"
        />
        <path 
          d="M80 12 L100 2 L120 12 L100 22 Z" 
          fill="none" 
          stroke="url(#goldGradient)" 
          strokeWidth="1.5"
        />
        {/* Center diamond - larger */}
        <path 
          d="M160 12 L200 0 L240 12 L200 24 Z" 
          fill="url(#goldGradient)" 
          fillOpacity="0.2"
          stroke="url(#goldGradient)" 
          strokeWidth="2"
        />
        <circle cx="200" cy="12" r="3" fill="url(#goldGradient)" />
        {/* Right side diamonds */}
        <path 
          d="M280 12 L300 2 L320 12 L300 22 Z" 
          fill="none" 
          stroke="url(#goldGradient)" 
          strokeWidth="1.5"
        />
        <path 
          d="M320 12 L340 2 L360 12 L340 22 Z" 
          fill="none" 
          stroke="url(#goldGradient)" 
          strokeWidth="1.5"
        />
        <path 
          d="M360 12 L380 2 L400 12 L380 22 Z" 
          fill="none" 
          stroke="url(#goldGradient)" 
          strokeWidth="1.5"
        />
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#F4CF47" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export function CardCornerOrnament({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const rotations = {
    'top-left': 'rotate(0)',
    'top-right': 'rotate(90)',
    'bottom-right': 'rotate(180)',
    'bottom-left': 'rotate(270)',
  }
  
  const positions = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
  }

  return (
    <svg 
      width="32" 
      height="32" 
      viewBox="0 0 32 32" 
      fill="none" 
      className={`absolute ${positions[position]} pointer-events-none`}
      style={{ transform: rotations[position] }}
    >
      {/* Ram horn pattern - қошқармүйіз */}
      <path 
        d="M2 2 L2 16 Q2 24 10 28 L16 30" 
        fill="none" 
        stroke="#D4AF37" 
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path 
        d="M6 2 L6 12 Q6 18 12 22" 
        fill="none" 
        stroke="#D4AF37" 
        strokeWidth="1"
        strokeOpacity="0.6"
        strokeLinecap="round"
      />
      <circle cx="4" cy="4" r="2" fill="#D4AF37" fillOpacity="0.3" />
    </svg>
  )
}

export function BackgroundPattern() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-5">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <pattern id="kazakhPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            {/* Geometric diamond grid */}
            <path 
              d="M30 0 L60 30 L30 60 L0 30 Z" 
              fill="none" 
              stroke="#D4AF37" 
              strokeWidth="0.5"
            />
            <circle cx="30" cy="30" r="4" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
            <path 
              d="M15 15 L30 0 L45 15 L30 30 Z" 
              fill="none" 
              stroke="#00D4FF" 
              strokeWidth="0.3"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#kazakhPattern)" />
      </svg>
    </div>
  )
}

export function LogoOrnament() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="inline-block mr-2">
      {/* Stylized Kazakh ornament for logo */}
      <path 
        d="M14 2 L26 14 L14 26 L2 14 Z" 
        fill="none" 
        stroke="url(#logoGold)" 
        strokeWidth="2"
      />
      <path 
        d="M14 6 L22 14 L14 22 L6 14 Z" 
        fill="url(#logoGold)" 
        fillOpacity="0.3"
      />
      <circle cx="14" cy="14" r="3" fill="url(#logoGold)" />
      <defs>
        <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#F4CF47" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function FooterOrnament() {
  return (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
  )
}
