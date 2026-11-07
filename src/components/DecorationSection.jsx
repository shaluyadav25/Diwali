import React from 'react';
import { DECORATION_DATA } from '../data/festiveData';
import { Home, Sparkles, Lightbulb, CheckCircle2 } from 'lucide-react';
import DiyaIcon from './DiyaIcon';

export const DecorationSection = () => {
  return (
    <section id="decor" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#100807] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#FF8C32]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#3B0715]/90 border border-[#D4AF37]/40 mb-3 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <Home className="w-3.5 h-3.5 text-[#F5D98B]" />
            <span className="text-xs uppercase tracking-widest text-[#F5D98B] font-serif font-semibold">
              Festive Home Atmosphere
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-festive text-gold-shimmer mb-4">
            Make Every Corner Glow
          </h2>

          <p className="text-base sm:text-lg text-[#FFF4DC]/85 font-light max-w-2xl mx-auto">
            From whispering hanging lanterns to fragrant marigold torans and sacred pooja altars, explore the timeless aesthetics of an Indian festive home.
          </p>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4"></div>
        </div>

        {/* 6 Decoration Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DECORATION_DATA.map((decor) => (
            <div
              key={decor.id}
              className="group relative rounded-3xl overflow-hidden festive-glass-card border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-500 transform hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.85)] flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#18080C]">
                <img
                  src={decor.image}
                  alt={decor.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100807] via-transparent to-black/20"></div>

                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#100807]/80 backdrop-blur-md border border-[#D4AF37]/40 text-xs font-serif text-[#F5D98B]">
                  {decor.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-festive text-xl font-bold text-[#FFF4DC] group-hover:text-gold-gradient transition-colors">
                    {decor.title}
                  </h3>
                  <DiyaIcon className="w-5 h-5" isLit={true} />
                </div>

                <div className="font-hindi text-sm text-[#D4AF37] mb-2 font-medium">
                  {decor.hindi}
                </div>

                <p className="text-xs sm:text-sm text-[#FFF4DC]/80 leading-relaxed mb-4">
                  {decor.desc}
                </p>

                <div className="pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs text-[#F5D98B]">
                  <span className="font-serif uppercase tracking-wider text-[11px]">Auspicious Vastu &amp; Radiance</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#FF8C32]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DecorationSection;

