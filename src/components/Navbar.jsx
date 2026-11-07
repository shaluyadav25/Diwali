import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Volume2, VolumeX } from 'lucide-react';
import DiyaIcon from './DiyaIcon';

export const Navbar = ({ soundEnabled, setSoundEnabled }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Highlights', href: '#festive-highlights' },
    { name: 'Send Wishes', href: '#send-wishes' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'festive-glass py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.9)] border-b border-[#FFD700]/25'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#18233C] to-[#070A14] border border-[#FFD700]/60 flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.35)] group-hover:shadow-[0_0_30px_rgba(255,215,0,0.7)] transition-all">
              <DiyaIcon className="w-8 h-8" isLit={true} />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-royal text-xl md:text-2xl font-bold tracking-wider text-gold-shimmer">
                DIWALI <span className="text-xs md:text-sm font-sans font-semibold text-[#FFD700] px-1.5 py-0.5 rounded bg-[#18233C] border border-[#FFD700]/40 ml-1">2026</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#FFE57F]/80 font-medium">
                The Grand Festival of Lights
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-2 xl:gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative px-4 py-1.5 text-sm font-medium text-[#FFF7E6]/90 hover:text-[#FFD700] transition-colors rounded-full hover:bg-[#18233C]/60"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2.5 rounded-full border border-[#FFD700]/30 bg-[#141C30]/80 text-[#FFD700] hover:bg-[#1E2B4A] hover:border-[#FFD700] transition-all shadow-[0_0_15px_rgba(255,215,0,0.2)]"
              title={soundEnabled ? 'Mute festive chimes' : 'Enable festive chimes'}
              aria-label="Sound Toggle"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-[#FFD700]" />
              ) : (
                <VolumeX className="w-4 h-4 text-[#FFF7E6]/60" />
              )}
            </button>

            {/* CTA Button */}
            <a
              href="#send-wishes"
              onClick={(e) => handleNavClick(e, '#send-wishes')}
              className="relative group overflow-hidden px-5 py-2.5 rounded-full text-xs md:text-sm font-bold tracking-wider uppercase text-[#070A14] transition-all shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:shadow-[0_0_35px_rgba(255,215,0,0.8)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#FFF0A3] via-[#FFD700] to-[#FF8C00] transition-transform duration-300 group-hover:scale-105"></span>
              <span className="relative flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#070A14]" />
                Send Wishes
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-full border border-[#FFD700]/30 bg-[#141C30] text-[#FFD700] sm:hidden"
              aria-label="Sound Toggle"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-white/50" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-[#141C30] border border-[#FFD700]/40 text-[#FFD700] focus:outline-none"
              aria-label="Open navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden festive-glass border-b border-[#FFD700]/30 px-6 pt-4 pb-6 mt-2 space-y-2 shadow-2xl animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-4 py-2.5 rounded-lg text-base font-medium text-[#FFF7E6] hover:text-[#FFD700] hover:bg-[#18233C] transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#send-wishes"
              onClick={(e) => handleNavClick(e, '#send-wishes')}
              className="block w-full text-center py-3 rounded-full text-sm font-bold uppercase tracking-wider text-[#070A14] bg-gradient-to-r from-[#FFF0A3] via-[#FFD700] to-[#FF8C00] shadow-[0_0_20px_rgba(255,215,0,0.5)]"
            >
              ✨ Send Your Wishes
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
