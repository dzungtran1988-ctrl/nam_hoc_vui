/**
 * Bộ hiệu ứng âm thanh "Game Juice" (0ms latency) & Nhạc đệm nhịp điệu học tập
 * bằng WebAudio Synthesizer theo chuẩn thiết kế Phòng nhạc nhỏ của Nấm.
 */

let sharedCtx: AudioContext | null = null;
let beatIntervalId: number | null = null;

function getAudioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctx) return null;
  if (!sharedCtx || sharedCtx.state === "closed") {
    sharedCtx = new Ctx();
  }
  if (sharedCtx.state === "suspended") {
    void sharedCtx.resume().catch(() => {});
  }
  return sharedCtx;
}

/** Dừng ngay lập tức nhạc đệm nhịp điệu khi bé bắt đầu đọc/suy nghĩ/làm bài */
export function stopGentleMusicalBeat() {
  if (beatIntervalId !== null && typeof window !== "undefined") {
    window.clearInterval(beatIntervalId);
    beatIntervalId = null;
  }
}

/**
 * Bắt đầu nhịp đệm Music-Box / Ukulele nhẹ nhàng (88 BPM) chỉ dùng cho bước Mở Bài (Model).
 * Tự động tắt sau maxDurationSec hoặc khi gọi stopGentleMusicalBeat().
 */
export function startGentleMusicalBeat(bpm = 88, maxDurationSec = 14) {
  stopGentleMusicalBeat();
  const ctx = getAudioCtx();
  if (!ctx || typeof window === "undefined") return;

  // Vòng hợp âm C - Am - F - G dịu nhẹ kiểu hộp nhạc thiếu nhi
  const melodyPattern = [
    523.25, // C5
    659.25, // E5
    783.99, // G5
    659.25, // E5
    587.33, // D5
    698.46, // F5
    783.99, // G5
    659.25, // E5
  ];

  let step = 0;
  const stepMs = Math.round((60 / bpm) * 1000);
  const maxSteps = Math.ceil((maxDurationSec * 1000) / stepMs);

  const playTick = () => {
    if (step >= maxSteps) {
      stopGentleMusicalBeat();
      return;
    }
    const c = getAudioCtx();
    if (!c) return;
    try {
      const now = c.currentTime;
      const freq = melodyPattern[step % melodyPattern.length];
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      // Âm lượng rất nhỏ (0.032) để làm nền nhịp điệu mà không lấn giọng cô đọc
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.032, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      osc.connect(gain);
      gain.connect(c.destination);
      osc.start(now);
      osc.stop(now + 0.35);
      step += 1;
    } catch {
      stopGentleMusicalBeat();
    }
  };

  playTick();
  beatIntervalId = window.setInterval(playTick, stepMs);
}

/** Tiếng chuông gom sự chú ý "Đinh-Đong" nhẹ nhàng trước khi mở nhiệm vụ mới */
export function playAttentionChime() {
  const ctx = getAudioCtx();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const notes = [
      { freq: 659.25, offset: 0, dur: 0.22 },
      { freq: 880.0, offset: 0.16, dur: 0.32 },
    ];
    notes.forEach(({ freq, offset, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const st = now + offset;
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, st);
      gain.gain.setValueAtTime(0.001, st);
      gain.gain.linearRampToValueAtTime(0.075, st + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, st + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(st);
      osc.stop(st + dur + 0.02);
    });
  } catch {
    // Ignore audio errors
  }
}

/** Tiếng chạm đặt thẻ từ / đồ vật vào khay ("Tách" gỗ ấm áp) */
export function playCardPlaceSound(index = 0) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const scale = [523.25, 587.33, 659.25, 783.99, 880.0];
    const freq = scale[index % scale.length];
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.09, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.16);
  } catch {
    // Ignore audio errors
  }
}

/** Tiếng chạm đàn hồi "Boing + Sparkle" khi chọt vào nhân vật */
export function playCharacterTapSound() {
  const ctx = getAudioCtx();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;

    const boingOsc = ctx.createOscillator();
    const boingGain = ctx.createGain();
    boingOsc.type = "sine";
    boingOsc.frequency.setValueAtTime(280, now);
    boingOsc.frequency.exponentialRampToValueAtTime(620, now + 0.09);
    boingOsc.frequency.exponentialRampToValueAtTime(440, now + 0.16);
    boingOsc.frequency.exponentialRampToValueAtTime(780, now + 0.26);

    boingGain.gain.setValueAtTime(0.001, now);
    boingGain.gain.linearRampToValueAtTime(0.14, now + 0.02);
    boingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    boingOsc.connect(boingGain);
    boingGain.connect(ctx.destination);
    boingOsc.start(now);
    boingOsc.stop(now + 0.29);

    const sparkleNotes = [1046.5, 1318.5, 1567.98, 2093.0];
    sparkleNotes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = now + 0.06 + idx * 0.045;
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.001, start);
      gain.gain.linearRampToValueAtTime(0.07, start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.2);
    });
  } catch {
    // Ignore audio errors if blocked
  }
}

/** Tiếng chúc mừng chiến thắng khi hoàn thành bài học */
export function playRewardTone() {
  const ctx = getAudioCtx();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((frequency, index) => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = now + index * 0.11;
      oscillator.frequency.value = frequency;
      oscillator.type = "triangle";
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(0.09, start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.28);
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start(start);
      oscillator.stop(start + 0.3);
    });
  } catch {
    // Stars and visual feedback remain available if audio is blocked.
  }
}

/** Tiếng "Póc! ✨" vui tai khi bóc & dán Sticker vào Quyển Vở */
export function playStickerPeelStickSound() {
  const ctx = getAudioCtx();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const popOsc = ctx.createOscillator();
    const popGain = ctx.createGain();
    popOsc.type = "sine";
    popOsc.frequency.setValueAtTime(190, now);
    popOsc.frequency.exponentialRampToValueAtTime(680, now + 0.065);
    popGain.gain.setValueAtTime(0.001, now);
    popGain.gain.linearRampToValueAtTime(0.18, now + 0.012);
    popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.085);
    popOsc.connect(popGain);
    popGain.connect(ctx.destination);
    popOsc.start(now);
    popOsc.stop(now + 0.09);

    [1318.5, 1760.0].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      const st = now + 0.055 + i * 0.045;
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, st);
      g.gain.setValueAtTime(0.001, st);
      g.gain.linearRampToValueAtTime(0.065, st + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, st + 0.14);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(st);
      osc.stop(st + 0.15);
    });
  } catch {
    // Ignore audio errors
  }
}

/** Tiếng máy ảnh "Tách! 📸" khi chụp ảnh trang Vở Sticker khoe bố mẹ */
export function playCameraShutterSound() {
  const ctx = getAudioCtx();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const bufferSize = ctx.sampleRate * 0.06;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1800;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);

    [880, 1174.66, 1760].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      const st = now + 0.07 + idx * 0.06;
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, st);
      g.gain.setValueAtTime(0.001, st);
      g.gain.linearRampToValueAtTime(0.08, st + 0.015);
      g.gain.exponentialRampToValueAtTime(0.001, st + 0.22);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(st);
      osc.stop(st + 0.24);
    });
  } catch {
    // Ignore audio errors
  }
}

/** Nhạc kèn chiến thắng Cúp Vàng khi hợp nhất đủ 6/6 Sticker */
export function playGoldenCupFanfare() {
  const ctx = getAudioCtx();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const notes = [
      { f: 523.25, t: 0.0, d: 0.14 },
      { f: 659.25, t: 0.12, d: 0.14 },
      { f: 783.99, t: 0.24, d: 0.14 },
      { f: 1046.5, t: 0.36, d: 0.26 },
      { f: 783.99, t: 0.62, d: 0.14 },
      { f: 1046.5, t: 0.76, d: 0.45 },
    ];
    notes.forEach(({ f, t, d }) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      const st = now + t;
      osc.type = "triangle";
      osc.frequency.setValueAtTime(f, st);
      g.gain.setValueAtTime(0.001, st);
      g.gain.linearRampToValueAtTime(0.13, st + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, st + d);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(st);
      osc.stop(st + d + 0.02);
    });
  } catch {
    // Ignore audio errors
  }
}
