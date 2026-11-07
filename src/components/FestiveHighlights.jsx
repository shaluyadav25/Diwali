import React, { useState } from 'react';
import { CELEBRATION_FOUR_CARDS } from '../data/festiveData';
import { Sparkles, X, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import DiyaIcon from './DiyaIcon';
import { playDiyaChime } from '../utils/audio';

export const FestiveHighlights = ({ soundEnabled }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardLitStates, setCardLitStates] = useState({
    sweets: true,
    gifts: true,
    crackers: true,
    rangoli: true
  });

  const handleCardDiyaClick = (id, e) => {
    e.stopPropagation();
    if (soundEnabled) playDiyaChime();
    setCardLitStates(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCardClick = (item) => {
    if (soundEnabled) playDiyaChime();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FFD700', '#FFE57F', '#FF8C00', '#FFFFFF']
    });
    setSelectedCard(item);
  };

  return (
    <section id="festive-highlights" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#070A14] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[radial-gradient(circle,rgba(255,215,0,0.07)_0%,rgba(7,10,20,0)_70%)] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141C30]/90 border border-[#FFD700]/50 mb-3 shadow-[0_0_15px_rgba(255,215,0,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
            <span className="text-xs uppercase tracking-widest text-[#FFE57F] font-festive font-semibold">
              The Four Sacred Essentials
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-royal text-gold-shimmer mb-4">
            Diwali Celebration Highlights
          </h2>

          <p className="font-luxury text-base sm:text-lg text-[#FFF7E6]/85 font-light max-w-2xl mx-auto">
            The essence of Diwali captured in four timeless traditions: royal sweets, thoughtful gifts, authentic crackers, and sacred rangoli with glowing diyas.
          </p>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto mt-4"></div>
        </div>

        {/* EXACTLY ONE ROW OF 4 CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {CELEBRATION_FOUR_CARDS.map((card) => {
            const isLit = cardLitStates[card.id] !== false;
            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card)}
                className="group relative rounded-3xl overflow-hidden festive-glass-card border border-[#FFD700]/30 hover:border-[#FFD700] transition-all duration-500 cursor-pointer transform hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(255,215,0,0.25)] flex flex-col justify-between"
              >
                {/* Photo Header */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0A0E1A]">
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "/images/diya_ornate.jpg";
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D18] via-transparent to-black/30"></div>

                  {/* Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#070A14]/85 backdrop-blur-md border border-[#FFD700]/40 text-xs font-festive text-[#FFE57F] shadow-md flex items-center gap-1.5">
                    <Star className="w-3 h-3 text-[#FFD700] fill-[#FFD700]" />
                    <span>{card.badge}</span>
                  </div>

                  {/* Dedicated Interactive Glowing Diya on Card */}
                  <div
                    onClick={(e) => handleCardDiyaClick(card.id, e)}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-[#070A14]/85 backdrop-blur-md border border-[#FFD700]/50 hover:bg-[#18233C] transition-all shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                    title={isLit ? "Click to calm flame" : "Click to light diya"}
                  >
                    <DiyaIcon className="w-7 h-7" isLit={isLit} />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-festive text-xl font-bold text-[#FFF7E6] group-hover:text-gold-gradient transition-colors mb-1">
                      {card.title}
                    </h3>

                    <div className="text-xs uppercase tracking-wider text-[#FFD700] mb-3 font-medium">
                      {card.subtitle}
                    </div>

                    <p className="font-luxury text-xs sm:text-sm text-[#FFF7E6]/80 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  {/* Card Bottom */}
                  <div className="mt-5 pt-3.5 border-t border-[#FFD700]/20 flex items-center justify-between text-xs text-[#FFE57F]">
                    <span className="font-medium text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                      <span>{isLit ? 'Diya Glowing' : 'Tap Diya to Light'}</span>
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-[#FF8C00]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal View on Card Click */}
        {selectedCard && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070A14]/90 backdrop-blur-md animate-fadeIn"
            onClick={() => setSelectedCard(null)}
          >
            <div
              className="relative max-w-2xl w-full rounded-3xl overflow-hidden festive-glass border border-[#FFD700] shadow-[0_0_50px_rgba(255,215,0,0.35)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#070A14]/80 text-[#FFF7E6] border border-[#FFD700]/40 hover:bg-[#18233C] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={selectedCard.image}
                  alt={selectedCard.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="p-6 sm:p-8 bg-[#090D18]">
                <span className="text-xs font-festive uppercase tracking-widest px-3 py-1 rounded-full bg-[#18233C] text-[#FFE57F] border border-[#FFD700]/40 mb-3 inline-block">
                  {selectedCard.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-royal text-gold-shimmer mb-1">
                  {selectedCard.title}
                </h3>
                <p className="text-xs uppercase tracking-wider text-[#FFD700] mb-4">
                  {selectedCard.subtitle}
                </p>
                <p className="font-luxury text-sm sm:text-base text-[#FFF7E6]/90 leading-relaxed mb-6">
                  {selectedCard.desc}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-[#FFD700]/20 text-xs text-[#FFE57F]">
                  <span>✨ Cherished Diwali Festive Heritage</span>
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

export default FestiveHighlights;
