import React from 'react';
import { SunMedium, Coins, Users, Sparkles, Heart } from 'lucide-react';
import DiyaIcon from './DiyaIcon';

export const WishesSection = () => {
  const cards = [
    {
      title: "Happiness & Peace",
      hindiTitle: "सुख एवं शांति",
      wish: "May your home shine with happiness and your heart glow with positivity.",
      hindiWish: "दीपों की आभा आपके जीवन के समस्त अंधकार को मिटा दे और मन को अनंत शांति प्रदान करे।",
      icon: SunMedium,
      badge: "Pure Joy",
      glowColor: "rgba(255, 140, 50, 0.25)"
    },
    {
      title: "Wealth & Prosperity",
      hindiTitle: "वैभव एवं समृद्धि",
      wish: "May Goddess Lakshmi bless you with wealth, success and endless opportunities.",
      hindiWish: "माँ लक्ष्मी का पावन आशीर्वाद आपके व्यवसाय और घर को धन-धान्य और कीर्ति से भर दे।",
      icon: Coins,
      badge: "Divine Abundance",
      glowColor: "rgba(212, 175, 55, 0.3)"
    },
    {
      title: "Love & Togetherness",
      hindiTitle: "स्नेह एवं सौहार्द",
      wish: "May this Diwali bring your family closer and fill every moment with love.",
      hindiWish: "अपनों के संग मीठी यादें बनें, हर रिश्ते में मिठास घुले और परिवार में अटूट प्रेम बना रहे।",
      icon: Users,
      badge: "Warm Bonds",
      glowColor: "rgba(225, 29, 72, 0.25)"
    }
  ];

  return (
    <section id="wishes" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#100807] overflow-hidden">
      {/* Background Mandala & Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(59,7,21,0.5)_0%,rgba(16,8,7,0)_70%)] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#3B0715]/90 border border-[#D4AF37]/40 mb-3 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-[#F5D98B]" />
            <span className="text-xs uppercase tracking-widest text-[#F5D98B] font-serif font-semibold">
              Sacred Diwali Greetings
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-festive text-gold-shimmer mb-4">
            Spread the Light of Happiness
          </h2>

          <p className="text-base sm:text-lg text-[#FFF4DC]/80 font-light max-w-2xl mx-auto">
            On this beautiful occasion, sending you love, light and countless blessings.
          </p>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4"></div>
        </div>

        {/* 3 Elegant Greeting Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-3xl p-8 festive-glass-card hover:border-[#D4AF37] transition-all duration-500 transform hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden"
                style={{
                  boxShadow: `0 10px 30px rgba(0,0,0,0.5)`
                }}
              >
                {/* Golden corner flourishes */}
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]"></div>
                </div>

                <div>
                  {/* Card Top: Badge & Diya Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-serif uppercase tracking-widest px-3 py-1 rounded-full bg-[#650D20]/80 text-[#F5D98B] border border-[#D4AF37]/30">
                      {card.badge}
                    </span>
                    <DiyaIcon className="w-8 h-8 group-hover:scale-110 transition-transform" isLit={true} />
                  </div>

                  {/* Icon representation */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#650D20] to-[#3B0715] border border-[#D4AF37]/50 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(212,175,55,0.2)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all">
                    <Icon className="w-7 h-7 text-[#F5D98B]" />
                  </div>

                  {/* Hindi & English Titles */}
                  <h3 className="font-festive text-xl sm:text-2xl font-bold text-[#FFF4DC] mb-1 group-hover:text-gold-gradient transition-colors">
                    {card.title}
                  </h3>
                  <div className="font-hindi text-base text-[#D4AF37] mb-4 font-medium">
                    {card.hindiTitle}
                  </div>

                  {/* Main Wish */}
                  <p className="text-[#FFF4DC]/90 text-sm sm:text-base leading-relaxed mb-4">
                    "{card.wish}"
                  </p>

                  {/* Hindi Blessings */}
                  <p className="font-hindi text-xs sm:text-sm text-[#F5D98B]/70 leading-relaxed italic border-t border-[#D4AF37]/20 pt-4">
                    {card.hindiWish}
                  </p>
                </div>

                {/* Bottom decorative bar */}
                <div className="mt-6 pt-4 flex items-center justify-between border-t border-[#D4AF37]/15">
                  <span className="text-[10px] tracking-wider uppercase text-[#D4AF37]/60 font-serif">
                    Diwali Ashirwad
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-[#F5D98B] opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WishesSection;

