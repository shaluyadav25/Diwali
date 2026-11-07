import React from 'react';
import { GIFTS_DATA } from '../data/festiveData';
import { Gift, Sparkles, Award } from 'lucide-react';
import DiyaIcon from './DiyaIcon';

export const GiftsGallery = () => {
  return (
    <section id="gifts" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#070A14] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(circle,rgba(255,215,0,0.07)_0%,rgba(7,10,20,0)_70%)] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141C30]/90 border border-[#FFD700]/50 mb-3 shadow-[0_0_15px_rgba(255,215,0,0.2)]">
            <Gift className="w-3.5 h-3.5 text-[#FFD700]" />
            <span className="text-xs uppercase tracking-widest text-[#FFE57F] font-festive font-semibold">
              Gifts of Abundance
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-festive text-gold-shimmer mb-4">
            Royal Festive Hampers &amp; Gifts
          </h2>

          <p className="text-base sm:text-lg text-[#FFF7E6]/85 font-light max-w-2xl mx-auto">
            Cherished festive offerings crafted to express gratitude, strengthen familial bonds, and bestow blessings of Lakshmi upon those you love.
          </p>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto mt-4"></div>
        </div>

        {/* 4 Curated Gift Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {GIFTS_DATA.map((gift) => (
            <div
              key={gift.id}
              className="group relative rounded-3xl overflow-hidden festive-glass-card border border-[#FFD700]/30 hover:border-[#FFD700] transition-all duration-500 transform hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(255,215,0,0.25)] flex flex-col justify-between"
            >
              {/* Photo Header */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#0A0E1A]">
                <img
                  src={gift.image}
                  alt={gift.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80";
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#090D18] via-transparent to-black/30"></div>

                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#070A14]/85 backdrop-blur-md border border-[#FFD700]/40 text-xs font-festive text-[#FFE57F] shadow-md flex items-center gap-1">
                  <Award className="w-3 h-3 text-[#FFD700]" />
                  <span>{gift.badge}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-festive text-xl font-bold text-[#FFF7E6] group-hover:text-gold-gradient transition-colors mb-1">
                    {gift.title}
                  </h3>

                  <div className="text-xs uppercase tracking-wider text-[#FFD700] mb-3 font-medium">
                    {gift.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-[#FFF7E6]/80 leading-relaxed">
                    {gift.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#FFD700]/20 flex items-center justify-between text-xs">
                  <span className="text-[11px] uppercase tracking-wider text-[#FFE57F] font-festive">
                    Auspicious Gifting
                  </span>
                  <DiyaIcon className="w-6 h-6" isLit={true} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GiftsGallery;

