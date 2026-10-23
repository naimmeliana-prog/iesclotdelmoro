import React from 'react';
import { AnimeWorldId } from '../types';

interface AnimeWorldBannerProps {
  worldId: AnimeWorldId;
  className?: string;
}

export const AnimeWorldIllustration: React.FC<AnimeWorldBannerProps> = ({ worldId, className = 'w-full h-44' }) => {
  if (worldId === 'NARUTO') {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-stone-900 select-none ${className}`} role="img" aria-label="Ilustración anime Naruto Aldea Oculta">
        <svg viewBox="0 0 800 260" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="ninjaSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7C2D12" />
              <stop offset="55%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#FDE68A" />
            </linearGradient>
          </defs>
          <rect width="800" height="260" fill="url(#ninjaSky)" />
          <circle cx="620" cy="88" r="52" fill="#FEF3C7" opacity="0.92" />
          <path d="M0 185 L120 85 L230 140 L350 70 L490 165 L640 95 L800 175 L800 260 L0 260 Z" fill="#431407" opacity="0.78" />
          <g transform="translate(135, 82)" fill="#1C1917">
            <path d="M10 18 Q65 6 120 18 L116 27 Q65 17 14 27 Z" />
            <rect x="20" y="34" width="90" height="7" />
            <rect x="30" y="22" width="9" height="90" />
            <rect x="91" y="22" width="9" height="90" />
          </g>
          <g transform="translate(420, 95)" stroke="#FDE047" strokeWidth="2.5" fill="none" opacity="0.9">
            <circle cx="0" cy="0" r="28" />
            <path d="M0 0 Q10 -12 18 0 Q14 16 -4 14 Q-18 8 -14 -12" />
          </g>
          <path d="M0 205 L280 185 L520 208 L800 188 L800 260 L0 260 Z" fill="#1C1917" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />
      </div>
    );
  }

  if (worldId === 'HEROES') {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-stone-900 select-none ${className}`} role="img" aria-label="Ilustración anime My Hero Academia U.A.">
        <svg viewBox="0 0 800 260" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="heroSky" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#065F46" />
              <stop offset="55%" stopColor="#059669" />
              <stop offset="100%" stopColor="#FBBF24" />
            </linearGradient>
          </defs>
          <rect width="800" height="260" fill="url(#heroSky)" />
          <path d="M0 40 L350 0 M0 110 L480 0 M650 260 L800 80" stroke="#FEF08A" strokeWidth="1.5" opacity="0.35" />
          <g transform="translate(460, 38)">
            <rect x="20" y="20" width="55" height="160" fill="#1C1917" opacity="0.88" />
            <rect x="95" y="20" width="55" height="160" fill="#1C1917" opacity="0.88" />
            <rect x="10" y="55" width="150" height="28" fill="#292524" />
            <rect x="32" y="35" width="30" height="8" fill="#34D399" opacity="0.85" />
            <rect x="107" y="35" width="30" height="8" fill="#34D399" opacity="0.85" />
            <rect x="32" y="95" width="30" height="8" fill="#FACC15" opacity="0.9" />
            <rect x="107" y="95" width="30" height="8" fill="#FACC15" opacity="0.9" />
          </g>
          <g transform="translate(210, 96)">
            <circle cx="0" cy="0" r="44" fill="#FACC15" opacity="0.25" />
            <polygon points="0,-38 9,-11 38,-11 14,6 23,34 0,17 -23,34 -14,6 -38,-11 -9,-11" fill="#FDE047" />
          </g>
          <path d="M0 195 L800 175 L800 260 L0 260 Z" fill="#064E3B" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />
      </div>
    );
  }

  if (worldId === 'PIRATES') {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-stone-900 select-none ${className}`} role="img" aria-label="Ilustración anime One Piece Grand Line">
        <svg viewBox="0 0 800 260" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="pirateSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#B45309" />
              <stop offset="55%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#FEF3C7" />
            </linearGradient>
            <linearGradient id="pirateSea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
          </defs>
          <rect width="800" height="260" fill="url(#pirateSky)" />
          <circle cx="640" cy="95" r="58" fill="#FEF08A" fillOpacity="0.92" />
          <circle cx="640" cy="95" r="76" fill="none" stroke="#FEF9C3" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.75" />
          <path d="M460 175 L535 90 L610 175 Z" fill="#92400E" opacity="0.65" />
          <path d="M550 175 L630 78 L720 175 Z" fill="#78350F" opacity="0.8" />
          <g transform="translate(170, 62)">
            <rect x="76" y="10" width="5" height="98" fill="#78350F" />
            <path d="M35 24 Q80 16 125 24 Q135 55 120 82 Q80 74 40 82 Q25 55 35 24 Z" fill="#FFFBEB" />
            <circle cx="80" cy="53" r="14" fill="#FACC15" />
            <path d="M62 54 L98 54" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
            <path d="M18 88 L142 88 L124 118 L36 118 Z" fill="#92400E" />
            <path d="M26 96 L134 96" stroke="#FBBF24" strokeWidth="3" />
          </g>
          <path d="M0 170 Q100 155 200 170 T400 170 T600 170 T800 170 L800 260 L0 260 Z" fill="url(#pirateSea)" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />
      </div>
    );
  }

  // ALCHEMIST
  return (
    <div className={`relative overflow-hidden rounded-xl bg-stone-900 select-none ${className}`} role="img" aria-label="Ilustración anime Alquimia y Kimetsu">
      <svg viewBox="0 0 800 260" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="alchSky" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#451A03" />
            <stop offset="50%" stopColor="#78350F" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>
        <rect width="800" height="260" fill="url(#alchSky)" />
        <g transform="translate(560, 110)" stroke="#FCD34D" fill="none" opacity="0.8">
          <circle cx="0" cy="0" r="68" strokeWidth="2" />
          <circle cx="0" cy="0" r="56" strokeWidth="1" strokeDasharray="4 4" />
          <polygon points="0,-55 48,28 -48,28" strokeWidth="1.5" />
          <polygon points="0,55 48,-28 -48,-28" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="16" stroke="#FDE047" strokeWidth="2" />
        </g>
        <path d="M40 140 Q110 90 180 140 T320 140 T460 140" fill="none" stroke="#FBBF24" strokeWidth="3" opacity="0.65" />
        <path d="M40 160 Q110 110 180 160 T320 160 T460 160" fill="none" stroke="#FDE68A" strokeWidth="2" opacity="0.5" />
        <path d="M0 200 L800 185 L800 260 L0 260 Z" fill="#1C1917" />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />
    </div>
  );
};
