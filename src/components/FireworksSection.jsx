import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, Rocket, Zap, Wand2, Disc } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CRACKERS_DATA } from '../data/festiveData';
import DiyaIcon from './DiyaIcon';
import { playFireworkBurstSound } from '../utils/audio';

export const FireworksSection = ({ soundEnabled }) => {
  const canvasRef = useRef(null);
  const [activeCracker, setActiveCracker] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const rockets = [];

    const colorPalettes = [
      ['#FFD700', '#FFA500', '#FF4500', '#FFF8DC'], // Golden Amber
      ['#FF1493', '#FF69B4', '#9400D3', '#FFE57F'], // Magenta Gold
      ['#00FA9A', '#00CED1', '#FFD700', '#E0FFFF'], // Emerald Teal
      ['#FF3B30', '#FF9500', '#FFCC00', '#FFFFFF'], // Firecracker Red Gold
      ['#FFE57F', '#FFD700', '#FFF7E6', '#B8860B']  // 24K Liquid Gold
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

    const loop = () => {
      ctx.fillStyle = 'rgba(7, 10, 20, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.02) {
        const tx = Math.random() * (canvas.width * 0.8) + canvas.width * 0.1;
        const ty = Math.random() * (canvas.height * 0.5) + canvas.height * 0.1;
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
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          const tx = (canvas.width * 0.2) + Math.random() * (canvas.width * 0.6);
          const ty = (canvas.height * 0.15) + Math.random() * (canvas.height * 0.4);
          rockets.push(new RocketParticle(tx, ty));
        }, i * 250);
      }
    };

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [soundEnabled]);

  const handleLightSky = () => {
    if (soundEnabled) {
      playFireworkBurstSound();
    }
    if (canvasRef.current && canvasRef.current._triggerGrandDisplay) {
      canvasRef.current._triggerGrandDisplay();
    }

    confetti({
      particleCount: 120,
      angle: 60,
      spread: 70,
      origin: { x: 0.1, y: 0.7 },
      colors: ['#FFD700', '#FF8C00', '#FF1493', '#FFE57F']
    });

    confetti({
      particleCount: 120,
      angle: 120,
      spread: 70,
      origin: { x: 0.9, y: 0.7 },
      colors: ['#00FA9A', '#FFD700', '#FF8C00', '#FFFFFF']
    });
  };

  const handleIgniteCracker = (cracker) => {
    setActiveCracker(cracker.id);
    if (soundEnabled) playFireworkBurstSound();

    if (cracker.id === 'sparkler') {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFE57F', '#FFFFFF']
      });
    } else if (cracker.id === 'chakri') {
      confetti({
        particleCount: 80,
        spread: 120,
        origin: { y: 0.7 },
        colors: ['#FF8C00', '#FFD700', '#FF3B30']
      });
    } else if (cracker.id === 'anar') {
      confetti({
        particleCount: 100,
        angle: 90,
        spread: 45,
        origin: { y: 0.8 },
        colors: ['#FFD700', '#00FA9A', '#FFE57F']
      });
    } else {
      handleLightSky();
    }

    setTimeout(() => setActiveCracker(null), 2500);
  };

  const getCrackerIcon = (type) => {
    switch (type) {
      case 'wand':
        return <Wand2 className="w-5 h-5 text-[#FFD700]" />;
      case 'spinner':
        return <Disc className="w-5 h-5 text-[#FF8C00] animate-spin-cracker" />;
      case 'fountain':
        return <Zap className="w-5 h-5 text-[#FFE57F]" />;
      default:
        return <Rocket className="w-5 h-5 text-[#00FA9A]" />;
    }
  };

  return (
    <section
      id="fireworks"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#070A14] via-[#0B1020] to-[#070A14] overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Section Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141C30]/90 border border-[#FFD700]/50 mb-3 shadow-[0_0_15px_rgba(255,215,0,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
          <span className="text-xs uppercase tracking-widest text-[#FFE57F] font-festive font-semibold">
            Celebration &amp; Crackers
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold font-festive text-gold-shimmer mb-4 drop-shadow-[0_4px_25px_rgba(255,215,0,0.4)]">
          Let the Sky Sparkle!
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[#FFF7E6]/85 font-light max-w-2xl mx-auto mb-14">
          Experience the joyous crackle and glittering brilliance of festive fireworks. Tap any cracker to ignite it safely!
        </p>

        {/* 4 Interactive Firecracker Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full mb-16 text-left">
          {CRACKERS_DATA.map((cracker) => {
            const isIgnited = activeCracker === cracker.id;
            return (
              <div
                key={cracker.id}
                onClick={() => handleIgniteCracker(cracker)}
                className={`group relative rounded-3xl overflow-hidden festive-glass-card border transition-all duration-500 cursor-pointer transform hover:-translate-y-2 flex flex-col justify-between ${
                  isIgnited
                    ? 'border-[#FFD700] shadow-[0_0_40px_rgba(255,215,0,0.6)] scale-102'
                    : 'border-[#FFD700]/30 hover:border-[#FFD700] hover:shadow-[0_20px_45px_rgba(255,215,0,0.25)]'
                }`}
              >
                {/* Photo Frame */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0A0E1A]">
                  <img
                    src={cracker.image}
                    alt={cracker.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?auto=format&fit=crop&w=800&q=80";
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D18] via-transparent to-black/30"></div>

                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#070A14]/85 backdrop-blur-md border border-[#FFD700]/40 text-xs font-festive text-[#FFE57F] shadow-md">
                    {cracker.badge}
                  </div>

                  <div className="absolute top-3 right-3 p-2 rounded-full bg-[#070A14]/80 backdrop-blur-md border border-[#FFD700]/40">
                    {getCrackerIcon(cracker.iconType)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-festive text-lg font-bold text-[#FFF7E6] group-hover:text-gold-gradient transition-colors mb-1">
                      {cracker.name}
                    </h3>
                    <div className="text-xs uppercase tracking-wider text-[#FFD700] mb-3 font-medium">
                      {cracker.subtitle}
                    </div>
                    <p className="text-xs sm:text-sm text-[#FFF7E6]/80 leading-relaxed">
                      {cracker.desc}
                    </p>
                  </div>

                  {/* Ignition Action Button */}
                  <div className="mt-5 pt-3.5 border-t border-[#FFD700]/20 flex items-center justify-between text-xs">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-[#FFD700] flex items-center gap-1.5">
                      <span>{isIgnited ? '✨ Sparking!' : 'Click to Ignite'}</span>
                    </span>
                    <DiyaIcon className="w-5 h-5" isLit={true} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Fireworks Stage Canvas */}
        <div className="relative w-full h-80 sm:h-96 md:h-[450px] rounded-3xl overflow-hidden festive-glass border border-[#FFD700]/50 shadow-[0_0_40px_rgba(14,20,36,0.9)] mb-8 cursor-crosshair group">
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
          />

          <div className="absolute top-4 left-4 pointer-events-none px-3.5 py-1.5 rounded-full bg-[#070A14]/80 backdrop-blur-md border border-[#FFD700]/40 text-xs text-[#FFE57F] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF8C00] animate-ping"></span>
            <span>Tap anywhere in the sky to launch fireworks</span>
          </div>

          <div className="absolute bottom-4 right-4 pointer-events-none text-xs text-[#FFD700]/80 font-festive">
            ✨ Virtual Eco-Friendly Celebration ✨
          </div>
        </div>

        {/* Action Button: Light Up The Sky */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={handleLightSky}
            className="relative group overflow-hidden px-10 py-4 rounded-full text-base sm:text-lg font-bold uppercase tracking-wider text-[#070A14] transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-[0_0_30px_rgba(255,215,0,0.6)] hover:shadow-[0_0_50px_rgba(255,140,0,0.85)] cursor-pointer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#FFF0A3] via-[#FFD700] to-[#FF8C00] transition-transform duration-300 group-hover:scale-105"></span>
            <span className="relative flex items-center gap-2.5">
              <Rocket className="w-5 h-5 text-[#070A14] group-hover:rotate-12 transition-transform" />
              Light Up the Sky
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FireworksSection;
