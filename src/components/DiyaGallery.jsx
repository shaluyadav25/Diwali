import React, { useState } from 'react';
import { DIYA_DATA } from '../data/festiveData';
import { Flame, Sparkles, Maximize2, X } from 'lucide-react';
import DiyaIcon from './DiyaIcon';
import { playDiyaChime } from '../utils/audio';

export const DiyaGallery = ({ soundEnabled }) => {
  const [selectedDiya, setSelectedDiya] = useState(null);
  const [cardFlameLit, setCardFlameLit] = useState({
    1: true,
    2: true,
    3: true,
    4: true
  });

  const toggleCardDiya = (id, e) => {
    e.stopPropagation();
    if (soundEnabled) playDiyaChime();
    setCardFlameLit(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="diyas" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#070A14] overflow-hidden">
      {/* Background radial lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(circle,rgba(255,215,0,0.08)_0%,rgba(7,10,20,0)_70%)] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141C30]/90 border border-[#FFD700]/50 mb-3 shadow-[0_0_15px_rgba(255,215,0,0.2)]">
            <Flame className="w-3.5 h-3.5 text-[#FF8C00]" />
            <span className="text-xs uppercase tracking-widest text-[#FFE57F] font-festive font-semibold">
              Sacred Illumination
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-festive text-gold-shimmer mb-4">
            Sacred Festive Diyas
          </h2>

          <p className="text-base sm:text-lg text-[#FFF7E6]/85 font-light max-w-2xl mx-auto">
            Explore the four sacred lamps of Diwali. Click any diya to ignite its glowing flame and banish all shadows with golden warmth.
          </p>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto mt-4"></div>
        </div>

        {/* 4 Curated High-Impact Diya Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DIYA_DATA.map((diya) => {
            const isLit = cardFlameLit[diya.id] !== false;
            return (
              <div
                key={diya.id}
                onClick={() => setSelectedDiya(diya)}
                className="group relative rounded-3xl overflow-hidden festive-glass-card border border-[#FFD700]/30 hover:border-[#FFD700] transition-all duration-500 cursor-pointer transform hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(255,215,0,0.25)] flex flex-col justify-between"
              >
                {/* Photo Header Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0A0E1A]">
                  <img
                    src={diya.image}
                    alt={diya.title}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=800&q=80";
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D18] via-transparent to-black/30"></div>

                  {/* Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#070A14]/85 backdrop-blur-md border border-[#FFD700]/40 text-xs font-festive text-[#FFE57F] shadow-md">
                    {diya.badge}
                  </div>

                  {/* Dedicated Interactive Diya Icon on Card */}
                  <div
                    onClick={(e) => toggleCardDiya(diya.id, e)}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-[#070A14]/85 backdrop-blur-md border border-[#FFD700]/50 hover:bg-[#18233C] transition-all shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                    title={isLit ? "Click to calm flame" : "Click to ignite diya"}
                  >
                    <DiyaIcon className="w-7 h-7" isLit={isLit} />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-festive text-xl font-bold text-[#FFF7E6] group-hover:text-gold-gradient transition-colors mb-1">
                      {diya.title}
                    </h3>

                    <div className="text-xs uppercase tracking-wider text-[#FFD700] mb-3 font-medium">
                      {diya.subtitle}
                    </div>

                    <p className="text-xs sm:text-sm text-[#FFF7E6]/80 leading-relaxed">
                      {diya.desc}
                    </p>
                  </div>

                  {/* Card Bottom: Click to ignite hint */}
                  <div className="mt-5 pt-3.5 border-t border-[#FFD700]/20 flex items-center justify-between text-xs text-[#FFE57F]">
                    <span className="font-medium text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                      <span>{isLit ? 'Flame Glowing' : 'Tap Diya to Light'}</span>
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-[#FF8C00]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal View */}
        {selectedDiya && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070A14]/90 backdrop-blur-md animate-fadeIn"
            onClick={() => setSelectedDiya(null)}
          >
            <div
              className="relative max-w-2xl w-full rounded-3xl overflow-hidden festive-glass border border-[#FFD700] shadow-[0_0_50px_rgba(255,215,0,0.35)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedDiya(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#070A14]/80 text-[#FFF7E6] border border-[#FFD700]/40 hover:bg-[#18233C] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={selectedDiya.image}
                  alt={selectedDiya.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="p-6 sm:p-8 bg-[#090D18]">
                <span className="text-xs font-festive uppercase tracking-widest px-3 py-1 rounded-full bg-[#18233C] text-[#FFE57F] border border-[#FFD700]/40 mb-3 inline-block">
                  {selectedDiya.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-festive text-gold-shimmer mb-1">
                  {selectedDiya.title}
                </h3>
                <p className="text-xs uppercase tracking-wider text-[#FFD700] mb-4">
                  {selectedDiya.subtitle}
                </p>
                <p className="text-sm sm:text-base text-[#FFF7E6]/90 leading-relaxed mb-6">
                  {selectedDiya.desc}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-[#FFD700]/20 text-xs text-[#FFE57F]">
                  <span>✨ Pure golden radiance dispelling all ignorance</span>
                  <DiyaIcon className="w-8 h-8" isLit={true} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DiyaGallery;
