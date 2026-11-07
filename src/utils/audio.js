// Lightweight Web Audio API festive synthesizer for subtle sparkle chime and firework burst sound
// Zero external mp3 dependencies, works offline, safe and gentle volume

let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playDiyaChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Harmonic bell chime notes (pentatonic Indian raga tones: Sa, Ga, Pa, Dha)
    const freqs = [523.25, 659.25, 783.99, 1046.5];
    const now = ctx.currentTime;

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0, now + idx * 0.05);
      gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.05 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.85);
    });
  } catch (e) {
    // Ignore audio permission or context errors silently
  }
}

export function playFireworkBurstSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    // Low pop thump
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.25);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);

    // Sparkle crackle high notes
    for (let i = 0; i < 4; i++) {
      const spOsc = ctx.createOscillator();
      const spGain = ctx.createGain();
      const delay = 0.15 + i * 0.06;
      spOsc.type = 'sine';
      spOsc.frequency.setValueAtTime(1400 + Math.random() * 800, now + delay);
      spGain.gain.setValueAtTime(0.04, now + delay);
      spGain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.12);

      spOsc.connect(spGain);
      spGain.connect(ctx.destination);
      spOsc.start(now + delay);
      spOsc.stop(now + delay + 0.15);
    }
  } catch (e) {
    // Ignore audio errors silently
  }
}

