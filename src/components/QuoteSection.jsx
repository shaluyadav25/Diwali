import React from 'react';
import { Sparkles, Quote, Flame, Compass, Sun, Trophy } from 'lucide-react';
import DiyaIcon from './DiyaIcon';

export const QuoteSection = () => {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#070A14]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle,rgba(255,140,0,0.12)_0%,rgba(7,10,20,0)_70%)] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: User's Gorgeous Ornate Diya Photo with Luxury Golden Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-3xl p-3 bg-gradient-to-b from-[#FFD700]/40 via-[#18233C] to-[#070A14] shadow-[0_0_50px_rgba(255,140,0,0.35)] border border-[#FFD700]/60 group">
              {/* Corner Accents */}
              <div className="absolute -top-2 -left-2 w-7 h-7 border-t-2 border-l-2 border-[#FFD700] rounded-tl-lg pointer-events-none"></div>
              <div className="absolute -top-2 -right-2 w-7 h-7 border-t-2 border-r-2 border-[#FFD700] rounded-tr-lg pointer-events-none"></div>
              <div className="absolute -bottom-2 -left-2 w-7 h-7 border-b-2 border-l-2 border-[#FFD700] rounded-bl-lg pointer-events-none"></div>
              <div className="absolute -bottom-2 -right-2 w-7 h-7 border-b-2 border-r-2 border-[#FFD700] rounded-br-lg pointer-events-none"></div>

              {/* Image Container */}
              <div className="relative aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden bg-black">
                <img
                  src="/images/diya_ornate.jpg"
                  alt="Ornate Royal Brass Diya with Marigolds"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A14]/80 via-transparent to-transparent"></div>

                {/* Floating Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl festive-glass border border-[#FFD700]/40 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-royal text-[#FFE57F] font-bold block">Sacred Akhand Deepak</span>
                    <span className="text-[11px] text-[#FFF7E6]/75">Symbol of eternal hope &amp; light</span>
                  </div>
                  <DiyaIcon className="w-8 h-8" isLit={true} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inspiring Motivational Lines for Diwali */}
          <div className="lg:col-span-7 flex flex-col text-left">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141C30]/90 border border-[#FFD700]/50 mb-4 shadow-[0_0_15px_rgba(255,215,0,0.2)] w-fit">
              <Flame className="w-3.5 h-3.5 text-[#FF8C00]" />
              <span className="text-xs uppercase tracking-widest text-[#FFE57F] font-festive font-semibold">
                Words of Radiance &amp; Courage
              </span>
            </div>

            {/* Main Motivational Heading */}
            <h2 className="font-royal text-2xl sm:text-3xl md:text-4xl font-bold text-gold-shimmer mb-4 leading-tight">
              Where There Is Light, Darkness Must Flee
            </h2>

            {/* Lead Inspirational Quote */}
            <div className="relative pl-6 border-l-2 border-[#FFD700] mb-6">
              <Quote className="absolute -top-3 -left-3.5 w-6 h-6 text-[#FFD700] bg-[#070A14] p-0.5 rounded-full rotate-180" />
              <p className="font-luxury text-base sm:text-lg text-[#FFF7E6] leading-relaxed italic">
                "Every tiny diya is a silent testimony that light does not need an army to conquer darkness—it only needs the courage to shine. May this festival ignite an unshakeable fire within you to conquer your doubts, embrace new horizons, and shine fearlessly."
              </p>
            </div>

            {/* 3 Motivational Pillars */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#141C30]/60 border border-[#FFD700]/25">
                <div className="p-1.5 rounded-lg bg-[#FFD700]/15 text-[#FFD700] mt-0.5">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-royal text-sm font-bold text-[#FFE57F]">Unstoppable Inner Strength</h4>
                  <p className="font-luxury text-xs text-[#FFF7E6]/80 mt-0.5">
                    No winter lasts forever, and no shadow can extinguish the flame of a persistent spirit.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#141C30]/60 border border-[#FFD700]/25">
                <div className="p-1.5 rounded-lg bg-[#FFD700]/15 text-[#FFD700] mt-0.5">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-royal text-sm font-bold text-[#FFE57F]">Victory of Truth &amp; Hard Work</h4>
                  <p className="font-luxury text-xs text-[#FFF7E6]/80 mt-0.5">
                    Goodness and dedication always overcome adversity. Let your milestones inspire others.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#141C30]/60 border border-[#FFD700]/25">
                <div className="p-1.5 rounded-lg bg-[#FFD700]/15 text-[#FFD700] mt-0.5">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-royal text-sm font-bold text-[#FFE57F]">Wisdom &amp; New Beginnings</h4>
                  <p className="font-luxury text-xs text-[#FFF7E6]/80 mt-0.5">
                    Step boldly into this new year with clarity, kindness, and boundless optimism.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-[#FFD700]/20 text-xs text-[#FFE57F]">
              <Sparkles className="w-4 h-4 text-[#FF8C00]" />
              <span className="font-royal tracking-wider uppercase">— Eternal Wisdom of Diwali</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
