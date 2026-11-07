import React from 'react';

export const DiyaIcon = ({ className = "w-10 h-10", isLit = true, onClick }) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center select-none ${onClick ? 'cursor-pointer hover:scale-110 active:scale-95' : ''} transition-transform duration-300`}
      onClick={onClick}
    >
      <svg
        viewBox="0 0 120 120"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Flame Gradient: White Core to Saffron to Ruby Amber */}
          <radialGradient id="flameHotCore" cx="50%" cy="75%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FFF9C4" />
            <stop offset="55%" stopColor="#FFB300" />
            <stop offset="85%" stopColor="#FF6F00" />
            <stop offset="100%" stopColor="#D84315" stopOpacity="0" />
          </radialGradient>

          {/* Diya Body: 24K Polished Metallic Gold */}
          <linearGradient id="brassBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="30%" stopColor="#FFD700" />
            <stop offset="70%" stopColor="#B38600" />
            <stop offset="100%" stopColor="#5E4300" />
          </linearGradient>

          {/* Diya Base Pedestal */}
          <linearGradient id="pedestalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7A5800" />
            <stop offset="50%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#7A5800" />
          </linearGradient>

          {/* Flame Bloom Glow Filter */}
          <filter id="royalFlameGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient Halo behind flame */}
        {isLit && (
          <ellipse
            cx="60"
            cy="48"
            rx="32"
            ry="36"
            fill="#FF8C00"
            opacity="0.25"
            className="animate-pulse"
          />
        )}

        {/* Sculpted Brass Pedestal / Foot */}
        <ellipse cx="60" cy="100" rx="26" ry="6" fill="url(#pedestalGrad)" stroke="#FFE57F" strokeWidth="1" />
        <path d="M52 94 L50 100 L70 100 L68 94 Z" fill="url(#pedestalGrad)" />

        {/* Outer Curved Diya Bowl */}
        <path
          d="M16 68 C 24 96, 96 96, 104 68 C 96 78, 76 84, 60 84 C 44 84, 24 78, 16 68 Z"
          fill="url(#brassBody)"
          stroke="#FFE57F"
          strokeWidth="1.8"
        />

        {/* Inner Elliptical Rim of Diya */}
        <ellipse
          cx="60"
          cy="68"
          rx="44"
          ry="10"
          fill="#1C1306"
          stroke="#FFD700"
          strokeWidth="1.5"
        />

        {/* Glowing Oil Reservoir */}
        <ellipse
          cx="60"
          cy="68"
          rx="32"
          ry="6"
          fill="#E65100"
          opacity="0.8"
        />
        <ellipse
          cx="60"
          cy="68"
          rx="22"
          ry="3.5"
          fill="#FFB300"
          opacity="0.6"
        />

        {/* Ornate Gold Filigree Dots on the Diya Rim */}
        <circle cx="35" cy="69" r="1.5" fill="#FFE57F" />
        <circle cx="47" cy="71" r="1.8" fill="#FFE57F" />
        <circle cx="60" cy="72" r="2" fill="#FFE57F" />
        <circle cx="73" cy="71" r="1.8" fill="#FFE57F" />
        <circle cx="85" cy="69" r="1.5" fill="#FFE57F" />

        {/* Sacred Flame Wick */}
        <path d="M60 67 L60 60" stroke="#422006" strokeWidth="2" strokeLinecap="round" />

        {/* Glowing Teardrop Flame (Animated) */}
        {isLit && (
          <g className="animate-flame" style={{ transformOrigin: "60px 65px" }}>
            {/* Outer Warm Flame Aura */}
            <path
              d="M60 12 C 72 36, 80 50, 60 65 C 40 50, 48 36, 60 12 Z"
              fill="url(#flameHotCore)"
              filter="url(#royalFlameGlow)"
            />
            {/* Inner Intense Golden Flame */}
            <path
              d="M60 26 C 68 40, 72 50, 60 62 C 48 50, 52 40, 60 26 Z"
              fill="#FFEA00"
              opacity="0.9"
            />
            {/* White-Hot Core Spark */}
            <path
              d="M60 36 C 64 45, 66 52, 60 59 C 54 52, 56 45, 60 36 Z"
              fill="#FFFFFF"
              opacity="0.95"
            />
          </g>
        )}
      </svg>
    </div>
  );
};

export default DiyaIcon;
