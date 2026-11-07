import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Rocket, Heart, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import DiyaIcon from './DiyaIcon';
import { playDiyaChime, playFireworkBurstSound } from '../utils/audio';

export const HeroSection = ({ soundEnabled }) => {
  const [litDiyas, setLitDiyas] = useState([true, true, true, true, true, true, true]);
  const canvasRef = useRef(null);

  // Full-featured Fireworks & Golden Embers Canvas in the Hero
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const rockets = [];

    const colorPalettes = [
      ['#FFD700', '#FFA500', '#FF4500', '#FFF8DC'], // Golden Amber
      ['#FF1493', '#FF69B4', '#9400D3', '#FFE57F'], // Magenta Gold
      ['#00FA9A', '#00CED1', '#FFD700', '#E0FFFF'], // Emerald Teal
      ['#FFE57F', '#FFD700', '#FFF7E6', '#B8860B'], // 24K Liquid Gold
      ['#FF3B30', '#FF9500', '#FFCC00', '#FFFFFF']  // Festive Red & Gold
    ];

    class RocketParticle {
      constructor(targetX, targetY) {
        this.x = targetX + (Math.random() - 0.5) * 40;
        this.y = canvas.height;
        this.targetX = targetX;
        this.targetY = targetY;
        this.speed = Math.random() * 3 + 8;
        const angle = Math.atan2(targetY - this.y, targetX - this.x);
        this.velX = Math.cos(angle) * this.speed;
        this.velY = Math.sin(angle) * this.speed;
        this.trail = [];
        this.palette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
      }

      update() {
        this.trail.push({ x: this.x, y: this.y, alpha: 0.8 });
        if (this.trail.length > 6) this.trail.shift();

        this.x += this.velX;
        this.y += this.velY;
        this.velY += 0.05;

        if (this.y <= this.targetY || this.velY >= 0) {
          this.explode();
          return false;
        }
        return true;
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        for (let i = 0; i < this.trail.length; i++) {
          const pt = this.trail[i];
          ctx.strokeStyle = '#FFE57F';
          ctx.globalAlpha = (i / this.trail.length) * 0.7;
          ctx.lineWidth = 2;
          ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFF7E6';
        ctx.shadowColor = '#FF8C00';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      }

      explode() {
        const particleCount = Math.floor(Math.random() * 35 + 45);
        for (let i = 0; i < particleCount; i++) {
          particles.push(new SparkParticle(this.x, this.y, this.palette));
        }
      }
    }

    class SparkParticle {
      constructor(x, y, palette) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1.5;
        this.velX = Math.cos(angle) * speed;
        this.velY = Math.sin(angle) * speed;
        this.friction = 0.95;
        this.gravity = 0.08;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.012;
        this.color = palette[Math.floor(Math.random() * palette.length)];
        this.size = Math.random() * 2.5 + 1.2;
      }

      update() {
        this.velX *= this.friction;
        this.velY *= this.friction;
        this.velY += this.gravity;
        this.x += this.velX;
        this.y += this.velY;
        this.alpha -= this.decay;
        return this.alpha > 0;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }
    }

    const embers = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.8,
      speedY: -(Math.random() * 0.4 + 0.15),
      speedX: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.6 + 0.3,
      color: Math.random() > 0.4 ? '#FFD700' : '#FF8C00'
    }));

    const loop = () => {
      ctx.fillStyle = 'rgba(7, 10, 20, 0.22)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      embers.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      });

      if (Math.random() < 0.015) {
        const tx = Math.random() * (canvas.width * 0.8) + canvas.width * 0.1;
        const ty = Math.random() * (canvas.height * 0.4) + canvas.height * 0.1;
        rockets.push(new RocketParticle(tx, ty));
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        if (!rockets[i].update()) {
          rockets.splice(i, 1);
        } else {
          rockets[i].draw();
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        if (!particles[i].update()) {
          particles.splice(i, 1);
        } else {
          particles[i].draw();
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    const handleCanvasClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      rockets.push(new RocketParticle(x, y));
      if (soundEnabled) playFireworkBurstSound();
    };

    canvas.addEventListener('click', handleCanvasClick);

    canvas._triggerGrandDisplay = () => {
      for (let i = 0; i < 7; i++) {
        setTimeout(() => {
          const tx = (canvas.width * 0.15) + Math.random() * (canvas.width * 0.7);
          const ty = (canvas.height * 0.12) + Math.random() * (canvas.height * 0.4);
          rockets.push(new RocketParticle(tx, ty));
        }, i * 220);
      }
    };

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [soundEnabled]);

  const handleLightUpTheSky = () => {
    if (soundEnabled) {
      playFireworkBurstSound();
    }

    if (canvasRef.current && canvasRef.current._triggerGrandDisplay) {
      canvasRef.current._triggerGrandDisplay();
    }

    confetti({
      particleCount: 110,
      spread: 90,
      origin: { y: 0.55 },
      colors: ['#FFD700', '#FFE57F', '#FF8C00', '#00FA9A', '#FFFFFF']
    });
  };

  const handleToggleDiya = (index) => {
    if (soundEnabled) playDiyaChime();
    setLitDiyas((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between items-center text-center px-4 pt-24 pb-8 overflow-hidden bg-[#070A14]"
    >
      {/* Background High-res Atmosphere Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=2000&q=85"
          alt="Golden Diwali Illumination"
          className="w-full h-full object-cover object-center opacity-20 transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070A14]/90 via-[#0C1222]/75 to-[#070A14]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.12)_0%,rgba(7,10,20,0.88)_70%)]"></div>
      </div>

      {/* Interactive Fireworks & Embers Canvas in the Hero */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 cursor-crosshair"
        title="Click anywhere on the night sky to launch fireworks!"
      />

      {/* Hanging Golden Lanterns (Akash Kandils) from top */}
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-between px-4 sm:px-12 md:px-24 pointer-events-none">
        <div className="animate-sway flex flex-col items-center">
          <div className="w-[1.5px] h-12 sm:h-20 bg-gradient-to-b from-[#FFE57F] to-[#FFD700]"></div>
          <div className="w-7 sm:w-10 h-10 sm:h-14 rounded-b-xl border border-[#FFD700] bg-gradient-to-b from-[#18233C] to-[#0A0E1A] shadow-[0_0_20px_rgba(255,215,0,0.5)] flex flex-col items-center justify-center p-1 relative">
            <div className="w-2.5 h-3.5 bg-[#FF8C00] rounded-full blur-[2px] animate-pulse"></div>
            <div className="absolute -bottom-5 flex gap-1">
              <span className="w-[1px] h-5 bg-[#FFD700]"></span>
              <span className="w-[1px] h-6 bg-[#FFE57F]"></span>
              <span className="w-[1px] h-5 bg-[#FFD700]"></span>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex animate-sway-delayed flex-col items-center">
          <div className="w-[1.5px] h-9 sm:h-12 bg-gradient-to-b from-[#FFE57F] to-[#FFD700]"></div>
          <div className="w-6 sm:w-8 h-9 sm:h-11 rounded-b-xl border border-[#FFD700] bg-gradient-to-b from-[#18233C] to-[#0A0E1A] shadow-[0_0_15px_rgba(255,215,0,0.4)] flex flex-col items-center justify-center p-1 relative">
            <div className="w-2 h-2.5 bg-[#FF8C00] rounded-full blur-[2px] animate-pulse"></div>
            <div className="absolute -bottom-4 flex gap-1">
              <span className="w-[1px] h-4 bg-[#FFD700]"></span>
              <span className="w-[1px] h-5 bg-[#FFE57F]"></span>
              <span className="w-[1px] h-4 bg-[#FFD700]"></span>
            </div>
          </div>
        </div>

        <div className="hidden md:flex animate-sway flex-col items-center">
          <div className="w-[1.5px] h-10 sm:h-16 bg-gradient-to-b from-[#FFE57F] to-[#FFD700]"></div>
          <div className="w-7 sm:w-9 h-10 sm:h-13 rounded-b-xl border border-[#FFD700] bg-gradient-to-b from-[#18233C] to-[#0A0E1A] shadow-[0_0_18px_rgba(255,215,0,0.45)] flex flex-col items-center justify-center p-1 relative">
            <div className="w-2.5 h-3 bg-[#FF8C00] rounded-full blur-[2px] animate-pulse"></div>
            <div className="absolute -bottom-5 flex gap-1">
              <span className="w-[1px] h-5 bg-[#FFD700]"></span>
              <span className="w-[1px] h-6 bg-[#FFE57F]"></span>
              <span className="w-[1px] h-5 bg-[#FFD700]"></span>
            </div>
          </div>
        </div>

        <div className="animate-sway-delayed flex flex-col items-center">
          <div className="w-[1.5px] h-12 sm:h-20 bg-gradient-to-b from-[#FFE57F] to-[#FFD700]"></div>
          <div className="w-7 sm:w-10 h-10 sm:h-14 rounded-b-xl border border-[#FFD700] bg-gradient-to-b from-[#18233C] to-[#0A0E1A] shadow-[0_0_20px_rgba(255,215,0,0.5)] flex flex-col items-center justify-center p-1 relative">
            <div className="w-2.5 h-3.5 bg-[#FF8C00] rounded-full blur-[2px] animate-pulse"></div>
            <div className="absolute -bottom-5 flex gap-1">
              <span className="w-[1px] h-5 bg-[#FFD700]"></span>
              <span className="w-[1px] h-6 bg-[#FFE57F]"></span>
              <span className="w-[1px] h-5 bg-[#FFD700]"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center w-full">
        {/* Sky Tap Hint */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141C30]/85 border border-[#FFD700]/50 shadow-[0_0_15px_rgba(255,215,0,0.2)] mb-3 animate-pulse text-[11px] sm:text-xs text-[#FFE57F]">
          <span className="w-2 h-2 rounded-full bg-[#FF8C00] animate-ping"></span>
          <span>Click anywhere in the night sky to launch fireworks</span>
        </div>

        {/* High-End Luxury Typography */}
        <h1 className="font-royal text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-widest text-gold-shimmer mb-1 drop-shadow-[0_4px_30px_rgba(255,215,0,0.45)]">
          HAPPY DIWALI
        </h1>

        <h2 className="font-luxury italic text-xl sm:text-3xl md:text-4xl font-medium tracking-wide text-[#FFF7E6] mb-3">
          The Grand <span className="text-gold-gradient font-normal not-italic font-royal">Festival of Lights</span>
        </h2>

        {/* Poetic Subtitle */}
        <p className="font-luxury text-sm sm:text-base md:text-lg text-[#FFF7E6]/90 font-light max-w-2xl leading-relaxed mb-5 px-2">
          May the sacred warmth of glowing diyas illuminate your home with eternal joy, boundless prosperity, and cherished beginnings.
        </p>

        {/* PRIMARY CTA BUTTONS - PROMINENTLY AT TOP OF HERO FOR INSTANT ACCESSIBILITY */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 mb-6 w-full justify-center">
          {/* Main Action: Light Up the Sky */}
          <button
            onClick={handleLightUpTheSky}
            className="w-full sm:w-auto relative group overflow-hidden px-8 py-3.5 rounded-full text-sm sm:text-base font-bold uppercase tracking-wider text-[#070A14] transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-[0_0_25px_rgba(255,215,0,0.6)] hover:shadow-[0_0_45px_rgba(255,140,0,0.9)] cursor-pointer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#FFF0A3] via-[#FFD700] to-[#FF8C00] transition-transform duration-300 group-hover:scale-105"></span>
            <span className="relative flex items-center justify-center gap-2">
              <Rocket className="w-4 h-4 text-[#070A14] group-hover:rotate-12 transition-transform" />
              Light Up the Sky
            </span>
          </button>

          {/* Action 2: Send Wishes */}
          <button
            onClick={() => scrollToSection('#send-wishes')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#FFE57F] border border-[#FFD700]/80 bg-[#141C30]/80 hover:bg-[#1E2B4A] hover:border-[#FFE57F] transition-all shadow-[0_0_20px_rgba(20,28,48,0.6)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Heart className="w-4 h-4 text-[#FF8C00]" />
            Send Festive Wishes
          </button>
        </div>

        {/* Sacred Festive Blessing Card with User's Ornate Diya Photo */}
        <div className="relative p-4 sm:p-5 rounded-2xl festive-glass max-w-2xl mx-auto mb-4 border border-[#FFD700]/50 shadow-[0_0_35px_rgba(14,20,36,0.9)] flex flex-col sm:flex-row items-center gap-4 text-left">
          <div className="absolute -top-3 left-6 px-3.5 py-0.5 bg-[#18233C] border border-[#FFD700]/60 rounded-full text-[10px] uppercase tracking-widest text-[#FFE57F] font-semibold">
            Sacred Festive Blessing
          </div>

          {/* Premium Ornate Diya Photo */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 border-[#FFD700] shadow-[0_0_20px_rgba(255,140,0,0.4)] flex-shrink-0 bg-black">
            <img
              src="/images/diya_ornate.jpg"
              alt="Sacred Royal Diya"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070A14]/60 via-transparent to-transparent"></div>
          </div>

          {/* Blessing Text */}
          <div className="flex-1">
            <p className="font-luxury italic text-xs sm:text-sm text-[#FFE57F] leading-relaxed mb-1.5 font-normal">
              "Where there is light, there is hope. Where there is hope, there is happiness.
              May this sacred flame bring endless radiance, health, and peace into your life."
            </p>
            <div className="flex items-center gap-2 text-xs text-[#FFD700]">
              <Sparkles className="w-3 h-3 text-[#FF8C00]" />
              <span className="font-royal tracking-wider uppercase text-[10px]">Auspicious Divine Glow</span>
            </div>
          </div>
        </div>
      </div>

      {/* Center Bottom: Grand Arrangement of 7 Glowing Diyas with Interactive Lighting */}
      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center mt-2">
        <div className="text-[10px] uppercase tracking-widest text-[#FFD700]/80 mb-1.5 font-royal flex items-center gap-2">
          <span>✨ Click any diya to ignite or calm its sacred flame ✨</span>
        </div>

        <div className="relative flex items-center justify-center py-2 px-2">
          <div className="absolute w-72 h-16 bg-[#FF8C00]/20 rounded-full blur-2xl"></div>

          <div className="flex items-end justify-center gap-2 sm:gap-4 md:gap-5 relative z-10">
            {litDiyas.map((isLit, idx) => {
              const sizes = ['w-9 h-9', 'w-10 h-10', 'w-12 h-12', 'w-14 h-14', 'w-12 h-12', 'w-10 h-10', 'w-9 h-9'];
              const offsets = ['translate-y-2', 'translate-y-1', 'translate-y-0.5', 'translate-y-0', 'translate-y-0.5', 'translate-y-1', 'translate-y-2'];
              return (
                <div
                  key={idx}
                  className={`transform ${offsets[idx]} transition-transform hover:scale-115 active:scale-95`}
                  title={isLit ? "Click to calm flame" : "Click to ignite diya"}
                >
                  <DiyaIcon
                    className={sizes[idx]}
                    isLit={isLit}
                    onClick={() => handleToggleDiya(idx)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full max-w-sm h-[1px] bg-gradient-to-r from-transparent via-[#FFD700]/60 to-transparent my-1"></div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#festive-highlights"
        className="relative z-10 mt-2 inline-flex flex-col items-center text-[#FFE57F]/70 hover:text-[#FFD700] transition-colors"
        aria-label="Scroll to Festive Highlights"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-medium mb-0.5">Festive Highlights</span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce text-[#FFD700]" />
      </a>
    </section>
  );
};

export default HeroSection;
