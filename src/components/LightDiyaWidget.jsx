import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import DiyaIcon from './DiyaIcon';
import { playDiyaChime } from '../utils/audio';

export const LightDiyaWidget = ({ soundEnabled }) => {
  const [diyaCount, setDiyaCount] = useState(10824);
  const [hasLit, setHasLit] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('diwali_diyas_lit_count');
    if (saved) {
      setDiyaCount(parseInt(saved, 10));
    }
  }, []);

  const handleLightDiya = () => {
    const newCount = diyaCount + 1;
    setDiyaCount(newCount);
    setHasLit(true);
    localStorage.setItem('diwali_diyas_lit_count', newCount.toString());

    if (soundEnabled) {
      playDiyaChime();
    }

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { x: 0.85, y: 0.85 },
      colors: ['#FFD700', '#FF8C00', '#FFE57F', '#FFFFFF']
    });

    setTimeout(() => setHasLit(false), 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={handleLightDiya}
        className="group relative flex items-center gap-3 px-4 py-3 rounded-full festive-glass border border-[#FFD700] shadow-[0_0_25px_rgba(255,215,0,0.4)] hover:shadow-[0_0_35px_rgba(255,140,0,0.7)] transition-all transform hover:-translate-y-1 active:translate-y-0 cursor-pointer"
        title="Click to light a sacred Diwali Diya"
      >
        <div className="relative">
          <DiyaIcon className="w-8 h-8" isLit={true} />
          {hasLit && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF8C00] rounded-full animate-ping"></span>
          )}
        </div>

        <div className="flex flex-col text-left">
          <span className="text-[11px] font-festive uppercase tracking-wider text-[#FFE57F] font-semibold flex items-center gap-1">
            <span>Light a Diya</span>
            <Sparkles className="w-3 h-3 text-[#FF8C00]" />
          </span>
          <span className="text-xs font-bold text-[#FFF7E6]">
            {diyaCount.toLocaleString()} <span className="font-light text-[#FFF7E6]/70">Lamps Lit</span>
          </span>
        </div>
      </button>
    </div>
  );
};

export default LightDiyaWidget;
