// Web Audio synthesizer for vintage TV effects (dial clicks, CRT static, ambient hum)

class SoundEngine {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying = false;

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Rotary channel dial mechanical click
  playDialClick() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio not supported or blocked
    }
  }

  // CRT channel switch static burst
  playStaticBurst(duration = 0.15) {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1200;
      filter.Q.value = 1.2;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // Audio muted or not supported
    }
  }

  // Toggle soothing ambient forest rain & warm 60Hz tube hum
  toggleAmbient(enable: boolean) {
    const ctx = this.getContext();
    if (!ctx) return;

    if (!enable) {
      if (this.ambientGain) {
        this.ambientGain.gain.setTargetAtTime(0, ctx.currentTime, 0.2);
      }
      this.isAmbientPlaying = false;
      return;
    }

    try {
      if (!this.ambientGain) {
        this.ambientGain = ctx.createGain();
        this.ambientGain.connect(ctx.destination);

        // Warm 60Hz CRT power transformer hum
        const humOsc = ctx.createOscillator();
        humOsc.type = "sine";
        humOsc.frequency.value = 60;

        const humGain = ctx.createGain();
        humGain.gain.value = 0.02;
        humOsc.connect(humGain);
        humGain.connect(this.ambientGain);
        humOsc.start();

        // Soothing rain / foliage pink noise
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          data[i] = (b0 + b1 + b2) * 0.15;
        }

        const rainSource = ctx.createBufferSource();
        rainSource.buffer = buffer;
        rainSource.loop = true;

        const rainFilter = ctx.createBiquadFilter();
        rainFilter.type = "lowpass";
        rainFilter.frequency.value = 850;

        const rainGain = ctx.createGain();
        rainGain.gain.value = 0.04;

        rainSource.connect(rainFilter);
        rainFilter.connect(rainGain);
        rainGain.connect(this.ambientGain);
        rainSource.start();
      }

      this.ambientGain.gain.setTargetAtTime(0.8, ctx.currentTime, 0.4);
      this.isAmbientPlaying = true;
    } catch {
      // Audio autoplay restrictions
    }
  }

  isAmbient(): boolean {
    return this.isAmbientPlaying;
  }
}

export const sound = new SoundEngine();
