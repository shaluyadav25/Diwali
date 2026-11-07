import React from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';
import DiyaIcon from './DiyaIcon';

const InstagramIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const WhatsAppIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const socialLinks = [
    {
      name: 'Instagram',
      icon: InstagramIcon,
      href: 'https://instagram.com',
      color: 'hover:text-[#E1306C] hover:border-[#E1306C]'
    },
    {
      name: 'LinkedIn',
      icon: LinkedinIcon,
      href: 'https://linkedin.com',
      color: 'hover:text-[#0A66C2] hover:border-[#0A66C2]'
    },
    {
      name: 'Facebook',
      icon: FacebookIcon,
      href: 'https://facebook.com',
      color: 'hover:text-[#1877F2] hover:border-[#1877F2]'
    },
    {
      name: 'WhatsApp',
      icon: WhatsAppIcon,
      href: 'https://api.whatsapp.com',
      color: 'hover:text-[#25D366] hover:border-[#25D366]'
    }
  ];

  return (
    <footer className="relative bg-[#05070D] text-[#FFF7E6] border-t border-[#FFD700]/30 pt-20 pb-12 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-40 bg-gradient-to-b from-[#141C30]/40 to-transparent pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center gap-3 mb-6">
            <DiyaIcon className="w-8 h-8" isLit={true} />
            <DiyaIcon className="w-12 h-12" isLit={true} />
            <DiyaIcon className="w-8 h-8" isLit={true} />
          </div>

          <h3 className="font-festive text-3xl sm:text-4xl md:text-5xl font-bold text-gold-shimmer mb-4">
            May Your Life Always Shine!
          </h3>

          <p className="text-base sm:text-lg text-[#FFF7E6]/80 font-light max-w-xl">
            Wishing You and Your Family a Very Happy, Glorious &amp; Prosperous Diwali 2026.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-8 border-y border-[#FFD700]/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#141C30] border border-[#FFD700]/60 flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.3)]">
              <DiyaIcon className="w-7 h-7" isLit={true} />
            </div>
            <span className="font-festive text-lg font-bold text-gold-shimmer">
              DIWALI 2026
            </span>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full bg-[#0D1220] border border-[#FFD700]/40 flex items-center justify-center text-[#FFE57F] transition-all transform hover:scale-110 shadow-sm ${social.color}`}
                  aria-label={social.name}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#141C30] hover:bg-[#1E2B4A] border border-[#FFD700]/60 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#FFE57F] transition-all hover:border-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.2)] cursor-pointer"
          >
            <ArrowUp className="w-4 h-4 text-[#FFD700]" />
            Back to Top
          </button>
        </div>

        <div className="mt-8 text-center text-xs text-[#FFF7E6]/60 flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>© 2026 Diwali Celebration. Crafted with ❤️ and festive warmth.</span>
          <span className="hidden sm:inline">•</span>
          <span>May peace and prosperity illuminate your journey.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
