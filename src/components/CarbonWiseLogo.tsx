import React from 'react';

interface CarbonWiseLogoProps {
  size?: number; // Size of the SVG icon
  showText?: boolean; // Whether to display the text "CarbonWise"
  className?: string; // Additional classes for placement
  textColorClass?: string; // Custom text color class (e.g., 'text-white')
  animated?: boolean; // Whether the arrow pulsates/shines
}

export function CarbonWiseLogo({ 
  size = 32, 
  showText = true, 
  className = '', 
  textColorClass = 'text-white',
  animated = true
}: CarbonWiseLogoProps) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Scalable Premium Vector Logo */}
      <div 
        className="relative shrink-0 flex items-center justify-center" 
        style={{ width: size, height: size }}
      >
        <svg 
          viewBox="0 0 200 200" 
          width="100%" 
          height="100%" 
          className="overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* 3D Glossy Leaf Gradient with vibrant emerald and lime tones */}
            <linearGradient id="cwLeafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#022c22" /> {/* Dark emerald base */}
              <stop offset="35%" stopColor="#059669" /> {/* Rich medium emerald */}
              <stop offset="75%" stopColor="#10b981" /> {/* Lighter emerald */}
              <stop offset="100%" stopColor="#4ade80" /> {/* Glowing green top */}
            </linearGradient>

            {/* Glowing Golden-Lime Arrow Gradient */}
            <linearGradient id="cwArrowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#84cc16" /> {/* Vibrant Lime */}
              <stop offset="60%" stopColor="#bef264" /> {/* Bright Lime-Yellow */}
              <stop offset="100%" stopColor="#fbbf24" /> {/* Golden Highlight */}
            </linearGradient>

            {/* Subtle glow filter */}
            <filter id="cwShadowFilter" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#042f1a" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Core leaf base circle backdrop shadow for solid contrast */}
          <circle cx="100" cy="110" r="75" fill="#022c22" opacity="0.25" filter="blur(6px)" />

          {/* Main Leaf Curl (forms the beautiful stylized "C" circular ring) */}
          <path 
            d="M 115,25 
               C 50,22 15,72 15,125 
               C 15,178 68,188 120,185 
               C 154,183 175,155 170,125 
               C 166,108 148,106 137,118 
               C 122,133 105,148 85,148 
               C 58,148 45,123 45,98 
               C 45,70 65,48 95,48 
               C 112,48 125,58 132,70 
               L 152,55 
               C 140,35 128,27 115,25 Z" 
            fill="url(#cwLeafGrad)"
            stroke="#022c22"
            strokeWidth="1.5"
            filter="drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.15))"
          />

          {/* Leaf Tech Veins & Interactive Nodes */}
          {/* Main vein spine */}
          <path 
            d="M 52,112 C 58,95 72,82 92,72" 
            fill="none" 
            stroke="#a3e635" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            opacity="0.85"
          />

          {/* Vein Node 1 */}
          <path 
            d="M 64,96 C 70,88 80,85 88,86" 
            fill="none" 
            stroke="#a3e635" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            opacity="0.8"
          />
          <circle cx="88" cy="86" r="5" fill="#fbbf24" stroke="#047857" strokeWidth="1" />

          {/* Vein Node 2 */}
          <path 
            d="M 72,110 C 80,105 92,105 100,111" 
            fill="none" 
            stroke="#a3e635" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            opacity="0.8"
          />
          <circle cx="100" cy="111" r="5" fill="#fbbf24" stroke="#047857" strokeWidth="1" />

          {/* Vein Node 3 */}
          <path 
            d="M 82,122 C 92,120 102,125 107,134" 
            fill="none" 
            stroke="#a3e635" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            opacity="0.8"
          />
          <circle cx="107" cy="134" r="5" fill="#fbbf24" stroke="#047857" strokeWidth="1" />

          {/* The Swooshing Upward Yellow-Green Growth Arrow */}
          <path 
            d="M 95,115 
               C 125,110 152,78 178,40 
               L 165,33 
               L 195,22 
               L 190,52 
               L 176,44 
               C 152,80 128,118 95,115 Z" 
            fill="url(#cwArrowGrad)" 
            filter="url(#cwShadowFilter)"
            className={animated ? "animate-[pulse_2.5s_infinite_ease-in-out]" : ""}
          />
        </svg>
      </div>

      {/* Structured "CarbonWise" Wordmark next to Logo */}
      {showText && (
        <div className="flex flex-col select-none">
          <div className="flex items-center text-xl font-extrabold tracking-tight leading-none font-sans">
            <span className={textColorClass}>Carbon</span>
            <span className="text-emerald-400">Wise</span>
          </div>
          <p className="text-[9px] text-emerald-300/80 font-bold tracking-widest uppercase mt-0.5 whitespace-nowrap">
            TRACK. UNDERSTAND. ACT.
          </p>
        </div>
      )}
    </div>
  );
}
