import React, { useState } from 'react';
import { RANGOLI_DATA } from '../data/festiveData';
import { Palette, Sparkles, Eye, X } from 'lucide-react';
import DiyaIcon from './DiyaIcon';

export const RangoliSection = () => {
  const [selectedRangoli, setSelectedRangoli] = useState(null);

  return (
    <section id="rangoli" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#100807] overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#3B0715]/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#3B0715]/90 border border-[#D4AF37]/40 mb-3 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <Palette className="w-3.5 h-3.5 text-[#F5D98B]" />
            <span className="text-xs uppercase tracking-widest text-[#F5D98B] font-serif font-semibold">
              Sacred Floor Artistry
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-festive text-gold-shimmer mb-4">
            Colors of Tradition
          </h2>

          <p className="text-base sm:text-lg text-[#FFF4DC]/85 font-light max-w-2xl mx-auto">
            Sacred geometry and blossoming petals designed at thresholds to welcome Lakshmi, ward off negativity, and bring vibrant blessings into the household.
          </p>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4"></div>
        </div>

        {/* 6 Grid of High-Resolution Rangoli Artworks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RANGOLI_DATA.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedRangoli(item)}
              className="group relative rounded-3xl overflow-hidden festive-glass-card border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-500 cursor-pointer transform hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(212,175,55,0.2)] flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#18080A]">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=800&q=80";
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#100807] via-transparent to-black/20"></div>

                {/* Type Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#100807]/80 backdrop-blur-md border border-[#D4AF37]/40 text-xs font-serif text-[#F5D98B]">
                  {item.type}
                </div>

                {/* Quick inspect button */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#100807]/70 backdrop-blur-md border border-[#D4AF37]/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[#F5D98B]">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-festive text-xl font-bold text-[#FFF4DC] group-hover:text-gold-gradient transition-colors">
                    {item.title}
                  </h3>
                  <DiyaIcon className="w-5 h-5" isLit={true} />
                </div>

                <div className="font-hindi text-sm text-[#D4AF37] mb-2 font-medium">
                  {item.hindi}
                </div>

                <p className="text-xs sm:text-sm text-[#FFF4DC]/80 leading-relaxed">
                  {item.desc}
                </p>

                <div className="mt-4 pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs text-[#F5D98B]">
                  <span className="font-serif uppercase tracking-wider text-[11px]">Symbol of Divine Welcome</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#FF8C32]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal View */}
        {selectedRangoli && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#100807]/90 backdrop-blur-md animate-fadeIn"
            onClick={() => setSelectedRangoli(null)}
          >
            <div
              className="relative max-w-2xl w-full rounded-3xl overflow-hidden festive-glass border border-[#D4AF37] shadow-[0_0_50px_rgba(212,175,55,0.4)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedRangoli(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#100807]/80 text-[#FFF4DC] border border-[#D4AF37]/40 hover:bg-[#650D20] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={selectedRangoli.image}
                  alt={selectedRangoli.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="p-6 sm:p-8 bg-[#100807]">
                <span className="text-xs font-serif uppercase tracking-widest px-3 py-1 rounded-full bg-[#650D20] text-[#F5D98B] border border-[#D4AF37]/40 mb-3 inline-block">
                  {selectedRangoli.type}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-festive text-gold-shimmer mb-2">
                  {selectedRangoli.title}
                </h3>
                <p className="font-hindi text-base text-[#D4AF37] mb-3">
                  {selectedRangoli.hindi}
                </p>
                <p className="text-sm sm:text-base text-[#FFF4DC]/90 leading-relaxed">
                  {selectedRangoli.desc}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RangoliSection;

