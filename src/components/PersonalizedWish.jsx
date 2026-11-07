import React, { useState } from 'react';
import { Send, Share2, Copy, Check, Sparkles, Wand2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import DiyaIcon from './DiyaIcon';
import { playDiyaChime } from '../utils/audio';

export const PersonalizedWish = ({ soundEnabled }) => {
  const [recipientName, setRecipientName] = useState('All of you');
  const [senderName, setSenderName] = useState('Shalu yadav');
  const [relation, setRelation] = useState('Family');
  const [copied, setCopied] = useState(false);

  const relationTemplates = {
    Family: "May this sacred Diwali bring health, boundless prosperity, and eternal peace to our home. May the divine grace of Goddess Lakshmi bless our family always.",
    Friends: "Wishing you a Diwali full of unstoppable laughter, sweet midnight mithai treats, sparkling crackers, and a year filled with grand victories and happiness!",
    Colleagues: "May the festival of lights illuminate new heights of career milestones, leadership achievements, and collaborative triumph for you this year.",
    'Loved One': "You bring more warmth into my world than a million glowing golden diyas. May our journey together be blessed with endless light and joy."
  };

  const currentWishBody = relationTemplates[relation];

  const fullWishText = `✨ *Happy Diwali 2026* ✨\n\nDear *${recipientName.trim() || 'All of you'}*,\n\n"${currentWishBody}"\n\nMay your life shine brighter than a thousand golden diyas!\n\nWarmest wishes,\n~ *${senderName.trim() || 'Shalu yadav'}* 🪔\n\nCelebrate Diwali: https://diwali-celebration-2026.web.app`;

  const handleGenerateWish = (e) => {
    e.preventDefault();
    if (soundEnabled) playDiyaChime();
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.75 },
      colors: ['#FFD700', '#FF8C00', '#FFE57F', '#FFFFFF']
    });
  };

  const handleCopyWish = () => {
    navigator.clipboard.writeText(fullWishText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const encodedText = encodeURIComponent(fullWishText);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="send-wishes" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#070A14] via-[#0D1326] to-[#070A14] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(255,215,0,0.08)_0%,rgba(7,10,20,0)_70%)] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141C30]/90 border border-[#FFD700]/50 mb-3 shadow-[0_0_15px_rgba(255,215,0,0.2)]">
            <Send className="w-3.5 h-3.5 text-[#FFD700]" />
            <span className="text-xs uppercase tracking-widest text-[#FFE57F] font-festive font-semibold">
              Personalized Greetings
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-royal text-gold-shimmer mb-4">
            Send a Little Light &amp; Love
          </h2>

          <p className="font-luxury text-base sm:text-lg text-[#FFF7E6]/85 font-light max-w-2xl mx-auto">
            Create a custom, personalized royal Diwali blessing for your family, friends, or colleagues, and share it instantly on WhatsApp.
          </p>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto mt-4"></div>
        </div>

        {/* 2-Column Layout: Form on Left, Live Card Preview on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-5 festive-glass p-6 sm:p-8 rounded-3xl border border-[#FFD700]/40 shadow-[0_0_35px_rgba(14,20,36,0.8)]">
            <h3 className="font-royal text-xl font-bold text-[#FFE57F] mb-6 flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-[#FF8C00]" />
              Personalize Your Blessing
            </h3>

            <form onSubmit={handleGenerateWish} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider font-festive text-[#FFE57F] mb-2">
                  Family / Recipient Name
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g. All of you, The Family..."
                  maxLength={40}
                  className="w-full px-4 py-3 rounded-xl bg-[#070A14] border border-[#FFD700]/50 text-[#FFF7E6] placeholder-[#FFF7E6]/40 focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-festive text-[#FFE57F] mb-2">
                  Your Name (Sender)
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Shalu yadav..."
                  maxLength={40}
                  className="w-full px-4 py-3 rounded-xl bg-[#070A14] border border-[#FFD700]/50 text-[#FFF7E6] placeholder-[#FFF7E6]/40 focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-festive text-[#FFE57F] mb-2">
                  Select Blessing Tone
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(relationTemplates).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setRelation(item)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        relation === item
                          ? 'bg-[#18233C] text-[#FFD700] border border-[#FFD700] shadow-[0_0_10px_rgba(255,215,0,0.3)] font-semibold'
                          : 'bg-[#070A14] text-[#FFF7E6]/70 border border-[#FFD700]/25 hover:border-[#FFD700]/60'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full relative group overflow-hidden py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider text-[#070A14] transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:shadow-[0_0_30px_rgba(255,215,0,0.7)] cursor-pointer"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#FFF0A3] via-[#FFD700] to-[#FF8C00]"></span>
                <span className="relative flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#070A14]" />
                  Create My Diwali Wish
                </span>
              </button>
            </form>
          </div>

          {/* Right Column: Live Luxury Card Preview */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="w-full relative rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#141C30] via-[#0D1326] to-[#070A14] border-2 border-[#FFD700] shadow-[0_0_50px_rgba(255,215,0,0.25)] flex flex-col justify-between overflow-hidden">
              {/* Corner Ornamental Golden Accents */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#FFD700] pointer-events-none"></div>
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#FFD700] pointer-events-none"></div>
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#FFD700] pointer-events-none"></div>
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#FFD700] pointer-events-none"></div>

              {/* Watermark Diya */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
                <DiyaIcon className="w-72 h-72" isLit={true} />
              </div>

              {/* Top of Card */}
              <div className="text-center relative z-10 mb-6">
                <div className="flex justify-center mb-2">
                  <DiyaIcon className="w-12 h-12" isLit={true} />
                </div>
                <div className="font-royal text-xl sm:text-2xl text-gold-shimmer font-bold">
                  DIWALI 2026
                </div>
                <div className="text-[11px] font-festive uppercase tracking-[0.25em] text-[#FFE57F]/90 mt-1">
                  Divine Festive Blessing
                </div>
                <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto mt-2"></div>
              </div>

              {/* Body of Card - Clean golden highlight without any squiggly error line */}
              <div className="relative z-10 space-y-4 my-2 text-center sm:text-left">
                <div className="font-royal text-xl sm:text-2xl text-[#FFF7E6] font-bold">
                  Happy Diwali,{' '}
                  <span className="text-gold-gradient font-bold px-2.5 py-0.5 rounded-lg bg-[#FFD700]/15 border-b-2 border-[#FFD700] tracking-wide inline-block shadow-sm">
                    {recipientName.trim() || 'All of you'}
                  </span>
                  !
                </div>

                <p className="font-luxury text-sm sm:text-base text-[#FFF7E6]/90 leading-relaxed font-light italic">
                  "{currentWishBody}"
                </p>

                <p className="font-luxury text-xs sm:text-sm text-[#FFE57F] leading-relaxed">
                  May your life shine brighter than a thousand golden diyas!
                </p>

                <div className="pt-4 border-t border-[#FFD700]/30 flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-[#FFF7E6]/70">With warmest wishes from,</span>
                  <span className="font-royal font-bold text-gold-gradient text-sm sm:text-base">
                    ~ {senderName.trim() || 'Shalu yadav'}
                  </span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="relative z-10 mt-8 pt-6 border-t border-[#FFD700]/25 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleShareWhatsApp}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,211,102,0.35)] transition-all cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  Share on WhatsApp
                </button>

                <button
                  onClick={handleCopyWish}
                  className="py-3 px-5 rounded-xl bg-[#141C30] hover:bg-[#1E2B4A] border border-[#FFD700]/60 text-[#FFE57F] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#4ADE80]" />
                      <span className="text-[#4ADE80]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Wish</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalizedWish;
