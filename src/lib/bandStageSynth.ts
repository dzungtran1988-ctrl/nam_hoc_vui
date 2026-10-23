// ============================================================================
// BỘ TỔNG HỢP ÂM THANH SÂN KHẤU BAN NHẠC 3D & RHYTHM ENGINE (V10 - PRO STUDIO)
// Tinh chỉnh sau khi nghe file .WAV lần 2 (Bé Nấm hát "Happy Birthday" - Đàn Gỗ Nhịp 1-2):
// 1. ÂM SẮC ĐÀN GỖ XYLOPHONE / MARIMBA THẬT (KHÔNG CÒN TIẾNG Ù NHƯ ORGAN):
//    - File .wav trước bị ù dải trầm ("ờm... ờm...") do lớp Pad dùng sóng triangle
//      và Đàn Gỗ có thêm sub-oscillator 0.5x làm mất tiếng gõ dùi gỗ đặc trưng.
//    - Bản V10: Tái tạo đúng âm học thanh gỗ Rosewood Marimba/Xylophone (Sóng cơ bản
//      quãng 5 trong trẻo + Hài âm bậc 4 đặc trưng của thanh gỗ + Tiếng dùi gõ Mallet
//      Click mềm 15ms). Ở Nhịp 2 ("Tách"), Kuromi gõ kép 2 dùi (Quãng 3 & Quãng 5)
//      tạo nhịp "1 - 2" (Tóc - Tách, Tóc - Tách) cực kỳ rõ ràng và vui tươi!
// 2. TỰ ĐỘNG NÂNG ÂM LƯỢNG NHẠC Ở INTRO (5s) & OUTRO (3s), HẠ NHẸ KHI BÉ HÁT:
//    - Khi dạo Intro (0s -> 4.8s) và dạo Outro ngay sau câu "Chúc mừng sinh nhật!"
//      (15.5s -> 19s), ban nhạc tự động chơi với âm lượng đầy đặn (0.92) để rộn ràng.
//    - Khi Nấm đang hát chính (4.8s -> 15.5s), nhạc đệm tự động lùi xuống (0.58)
//      vừa đủ giữ nhịp "1 - 2" / "1 - 2 - 3" rõ nét dưới giọng hát trong vắt của bé!
// ============================================================================

export type BandInstrumentId =
  | "drums"
  | "xylophone"
  | "vocal"
  | "guitar"
  | "bells";

export type BandBackboneMode = "organ" | "guitar" | "xylophone";

export interface BandRiffStep {
  delayMs: number;
  durationMs: number;
  freq?: number;
  chordFreqs?: number[];
  drumType?: "kick" | "snare" | "hat" | "kick-hat" | "crash";
  visualKey?: number;
  lyricChip?: string;
}

export interface BandSongTheme {
  id: string;
  title: string;
  icon: string;
  tempoLabel: string;
  riffs: Record<BandInstrumentId, BandRiffStep[]>;
}

// Thời lượng chuẩn cho Intro (~4.8s trước khi hát) và Outro (~3.2s sau khi hát)
export const VOCAL_INTRO_OFFSET_MS = 4800;
export const VOCAL_OUTRO_TAIL_MS = 3200;

// Tần số chuẩn (C4..G5)
const N = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.0,
  A4: 440.0,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  G5: 783.99,
};

// Hợp âm chuẩn (C, G, Am, F): phần tử [0] là nốt Bass gốc, [1..4] là các nốt hòa âm
const CHORD_C = [130.81, 196.0, 261.63, 329.63, 392.0];
const CHORD_G = [146.83, 196.0, 246.94, 293.66, 392.0];
const CHORD_F = [174.61, 220.0, 261.63, 349.23, 440.0];
const CHORD_AM = [146.83, 220.0, 261.63, 329.63, 440.0];

export const BAND_SONG_THEMES: BandSongTheme[] = [
  {
    id: "jam-1",
    title: "Giai Điệu Sôi Động 1",
    icon: "🎵",
    tempoLabel: "Sôi động · Trong trẻo",
    riffs: {
      drums: [
        { delayMs: 0, durationMs: 240, drumType: "kick", visualKey: 0, lyricChip: "Bùm!" },
        { delayMs: 240, durationMs: 240, drumType: "hat", visualKey: 1, lyricChip: "Tách!" },
        { delayMs: 480, durationMs: 240, drumType: "snare", visualKey: 2, lyricChip: "Chát!" },
        { delayMs: 720, durationMs: 240, drumType: "kick-hat", visualKey: 1, lyricChip: "Bùm-Tách!" },
        { delayMs: 960, durationMs: 200, drumType: "kick", visualKey: 0, lyricChip: "Bùm" },
        { delayMs: 1160, durationMs: 200, drumType: "kick", visualKey: 0, lyricChip: "Bùm" },
        { delayMs: 1380, durationMs: 260, drumType: "snare", visualKey: 2, lyricChip: "Chát!" },
        { delayMs: 1660, durationMs: 480, drumType: "crash", visualKey: 3, lyricChip: "Boong! 🌟" },
      ],
      xylophone: [
        { delayMs: 0, durationMs: 260, freq: N.C5, visualKey: 0, lyricChip: "Đồ" },
        { delayMs: 250, durationMs: 260, freq: N.D5, visualKey: 1, lyricChip: "Rê" },
        { delayMs: 500, durationMs: 260, freq: N.E5, visualKey: 2, lyricChip: "Mi" },
        { delayMs: 750, durationMs: 260, freq: N.G5, visualKey: 4, lyricChip: "Son" },
        { delayMs: 1020, durationMs: 260, freq: N.E5, visualKey: 5, lyricChip: "Mi" },
        { delayMs: 1280, durationMs: 260, freq: N.D5, visualKey: 4, lyricChip: "Rê" },
        { delayMs: 1550, durationMs: 480, freq: N.C5, visualKey: 6, lyricChip: "Đố! 🎶" },
      ],
      vocal: [
        { delayMs: 0, durationMs: 420, freq: N.C4, visualKey: 0, lyricChip: "Là lá la... 🎤" },
        { delayMs: 420, durationMs: 420, freq: N.E4, visualKey: 2, lyricChip: "la là la... 💕" },
        { delayMs: 840, durationMs: 480, freq: N.G4, visualKey: 4, lyricChip: "Hát bè ngân vang... ✨" },
        { delayMs: 1320, durationMs: 620, freq: N.C5, visualKey: 6, lyricChip: "...cùng Nấm nè! 💖" },
      ],
      guitar: [
        { delayMs: 0, durationMs: 360, chordFreqs: CHORD_C, visualKey: 0, lyricChip: "Đô Trưởng 🎸" },
        { delayMs: 360, durationMs: 300, chordFreqs: CHORD_C, visualKey: 1, lyricChip: "Bass & Strum" },
        { delayMs: 680, durationMs: 360, chordFreqs: CHORD_G, visualKey: 2, lyricChip: "Son Trưởng 🎸" },
        { delayMs: 1040, durationMs: 360, chordFreqs: CHORD_AM, visualKey: 3, lyricChip: "La Thứ" },
        { delayMs: 1400, durationMs: 360, chordFreqs: CHORD_F, visualKey: 1, lyricChip: "Pha Trưởng" },
        { delayMs: 1780, durationMs: 520, chordFreqs: CHORD_C, visualKey: 0, lyricChip: "Quạt hợp âm! ✨" },
      ],
      bells: [
        { delayMs: 0, durationMs: 340, freq: N.C4, chordFreqs: CHORD_C, visualKey: 0, lyricChip: "Organ Đô 🎹" },
        { delayMs: 320, durationMs: 300, freq: N.E4, chordFreqs: CHORD_C, visualKey: 1, lyricChip: "Lead Mi" },
        { delayMs: 640, durationMs: 340, freq: N.G4, chordFreqs: CHORD_G, visualKey: 2, lyricChip: "Organ Son 🎹" },
        { delayMs: 960, durationMs: 300, freq: N.A4, chordFreqs: CHORD_F, visualKey: 1, lyricChip: "Synth La" },
        { delayMs: 1280, durationMs: 320, freq: N.G4, chordFreqs: CHORD_G, visualKey: 0, lyricChip: "Hợp âm" },
        { delayMs: 1620, durationMs: 560, freq: N.C5, chordFreqs: CHORD_C, visualKey: 2, lyricChip: "Organ Ngân Vang! 🎹✨" },
      ],
    },
  },
  {
    id: "jam-2",
    title: "Giai Điệu Vui Nhộn 2",
    icon: "🎶",
    tempoLabel: "Ấm áp · Vui nhộn",
    riffs: {
      drums: [
        { delayMs: 0, durationMs: 220, drumType: "kick", visualKey: 0, lyricChip: "Bùm!" },
        { delayMs: 220, durationMs: 220, drumType: "kick-hat", visualKey: 1, lyricChip: "Tách!" },
        { delayMs: 450, durationMs: 240, drumType: "snare", visualKey: 2, lyricChip: "Chát!" },
        { delayMs: 700, durationMs: 220, drumType: "hat", visualKey: 1, lyricChip: "Tách!" },
        { delayMs: 920, durationMs: 220, drumType: "kick", visualKey: 0, lyricChip: "Bùm!" },
        { delayMs: 1150, durationMs: 240, drumType: "snare", visualKey: 2, lyricChip: "Chát!" },
        { delayMs: 1420, durationMs: 500, drumType: "crash", visualKey: 3, lyricChip: "Boong! 🥁" },
      ],
      xylophone: [
        { delayMs: 0, durationMs: 250, freq: N.G5, visualKey: 4, lyricChip: "Son" },
        { delayMs: 250, durationMs: 250, freq: N.E5, visualKey: 5, lyricChip: "Mi" },
        { delayMs: 500, durationMs: 250, freq: N.G5, visualKey: 4, lyricChip: "Son" },
        { delayMs: 750, durationMs: 250, freq: N.E5, visualKey: 2, lyricChip: "Mi" },
        { delayMs: 1000, durationMs: 250, freq: N.D5, visualKey: 1, lyricChip: "Rê" },
        { delayMs: 1260, durationMs: 480, freq: N.C5, visualKey: 0, lyricChip: "Đồ! 🎶" },
      ],
      vocal: [
        { delayMs: 0, durationMs: 420, freq: N.G4, visualKey: 4, lyricChip: "Đồ rê mi... 🎤" },
        { delayMs: 420, durationMs: 420, freq: N.E4, visualKey: 2, lyricChip: "...mi rê đồ 💕" },
        { delayMs: 840, durationMs: 480, freq: N.G4, visualKey: 4, lyricChip: "Giọng bè nhỏ nhẹ..." },
        { delayMs: 1320, durationMs: 600, freq: N.C5, visualKey: 6, lyricChip: "...ngân dài theo Nấm! 💕" },
      ],
      guitar: [
        { delayMs: 0, durationMs: 340, chordFreqs: CHORD_F, visualKey: 1, lyricChip: "Pha Trưởng 🎸" },
        { delayMs: 340, durationMs: 340, chordFreqs: CHORD_G, visualKey: 2, lyricChip: "Son Trưởng 🎸" },
        { delayMs: 680, durationMs: 340, chordFreqs: CHORD_C, visualKey: 0, lyricChip: "Đô Trưởng" },
        { delayMs: 1020, durationMs: 340, chordFreqs: CHORD_AM, visualKey: 3, lyricChip: "La Thứ" },
        { delayMs: 1380, durationMs: 520, chordFreqs: CHORD_C, visualKey: 0, lyricChip: "Hợp âm ấm áp! 🌟" },
      ],
      bells: [
        { delayMs: 0, durationMs: 300, freq: N.G4, chordFreqs: CHORD_G, visualKey: 2, lyricChip: "Organ Son 🎹" },
        { delayMs: 300, durationMs: 300, freq: N.E4, chordFreqs: CHORD_C, visualKey: 1, lyricChip: "Organ Mi" },
        { delayMs: 600, durationMs: 300, freq: N.C5, chordFreqs: CHORD_F, visualKey: 2, lyricChip: "Synth Đố" },
        { delayMs: 920, durationMs: 300, freq: N.A4, chordFreqs: CHORD_AM, visualKey: 1, lyricChip: "Synth La" },
        { delayMs: 1240, durationMs: 540, freq: N.G4, chordFreqs: CHORD_C, visualKey: 0, lyricChip: "Hợp Âm Điện Tử! 🎹" },
      ],
    },
  },
];

// ============================================================================
// MASTER STAGE AUDIO BUS (CLEAN ANTI-CLIPPING LIMITER - KHÔNG BAO GIỜ RÈ)
// ============================================================================
const masterBusMap = new WeakMap<BaseAudioContext, AudioNode>();

export function getMasterStageBus(ctx: BaseAudioContext): AudioNode {
  const existing = masterBusMap.get(ctx);
  if (existing) {
    return existing;
  }

  const preGain = ctx.createGain();
  preGain.gain.value = 0.92;

  const subCleanHp = ctx.createBiquadFilter();
  subCleanHp.type = "highpass";
  subCleanHp.frequency.value = 55;

  const harshCleanLp = ctx.createBiquadFilter();
  harshCleanLp.type = "lowpass";
  harshCleanLp.frequency.value = 9200;

  const limiter = ctx.createDynamicsCompressor();
  limiter.threshold.value = -6;
  limiter.knee.value = 8;
  limiter.ratio.value = 10.0;
  limiter.attack.value = 0.003;
  limiter.release.value = 0.18;

  const postGain = ctx.createGain();
  postGain.gain.value = 0.9;

  preGain.connect(subCleanHp);
  subCleanHp.connect(harshCleanLp);
  harshCleanLp.connect(limiter);
  limiter.connect(postGain);
  postGain.connect(ctx.destination);

  masterBusMap.set(ctx, preGain);
  return preGain;
}

// ============================================================================
// BỘ TẠO TIẾNG VANG PHÒNG THU MƯỢT MÀ (SMOOTH SILK HALL REVERB)
// ============================================================================
const reverbBufferMap = new WeakMap<BaseAudioContext, AudioBuffer>();

export function getVocalLushReverbBuffer(ctx: BaseAudioContext): AudioBuffer {
  const cached = reverbBufferMap.get(ctx);
  if (cached) return cached;

  const durationSec = 1.8;
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * durationSec);
  const impulse = ctx.createBuffer(2, length, sampleRate);

  for (let ch = 0; ch < 2; ch++) {
    const channelData = impulse.getChannelData(ch);
    let prev = 0;
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const env = Math.min(1, t / 0.06) * Math.pow(1 - i / length, 3.0);
      const rawNoise = (Math.random() * 2 - 1) * 0.32;
      prev = prev * 0.76 + rawNoise * 0.24;
      channelData[i] = prev * env * 0.38;
    }
  }

  reverbBufferMap.set(ctx, impulse);
  return impulse;
}

// ============================================================================
// HỆ THỐNG XỬ LÝ GIỌNG HÁT TỰ NHIÊN & SIDECHAIN DUCKING CHO BÈ MY MELODY
// ============================================================================

export interface ProcessedChildVocal {
  leadVocalBuffer: AudioBuffer;
  myMelodyBackingBuffer: AudioBuffer;
  trimmedVoiceSamples: VoiceSamplePoint[];
  totalSongDurationMs: number;
  vocalStartOffsetMs: number;
  vocalEndOffsetMs: number;
  detectedBeatMs: number;
}

export function detectNaturalBeatIntervalMs(samples: VoiceSamplePoint[]): number {
  const maxRms = samples.reduce((m, s) => Math.max(m, s.rms), 0);
  const threshold = Math.max(0.016, maxRms * 0.3);

  const peaks: number[] = [];
  let lastPeakMs = -500;

  for (let i = 1; i < samples.length - 1; i++) {
    const cur = samples[i];
    if (
      cur.rms >= threshold &&
      cur.rms >= samples[i - 1].rms &&
      cur.rms >= samples[i + 1].rms &&
      cur.offsetMs - lastPeakMs >= 340
    ) {
      peaks.push(cur.offsetMs);
      lastPeakMs = cur.offsetMs;
    }
  }

  if (peaks.length < 2) {
    return 480;
  }

  const intervals: number[] = [];
  for (let i = 1; i < peaks.length; i++) {
    const diff = peaks[i] - peaks[i - 1];
    if (diff >= 390 && diff <= 600) {
      intervals.push(diff);
    } else if (diff > 600 && diff <= 1200) {
      intervals.push(Math.round(diff / 2));
    }
  }

  if (intervals.length === 0) return 480;
  intervals.sort((a, b) => a - b);
  const median = intervals[Math.floor(intervals.length / 2)];
  return Math.max(430, Math.min(540, median));
}

export async function processChildVocalStudioAI(
  rawBuffer: AudioBuffer,
): Promise<ProcessedChildVocal> {
  const sr = rawBuffer.sampleRate;
  const rawData = rawBuffer.getChannelData(0);
  const totalRawSamples = rawData.length;

  const marginSamples = Math.min(
    Math.floor(sr * 0.08),
    Math.floor(totalRawSamples * 0.05),
  );

  const winSize = Math.max(256, Math.floor(sr * 0.025));
  const envFrames: number[] = [];
  let maxEnv = 0;

  for (
    let i = marginSamples;
    i + winSize < totalRawSamples - marginSamples;
    i += winSize
  ) {
    let sum = 0;
    for (let j = 0; j < winSize; j++) {
      const v = rawData[i + j];
      sum += v * v;
    }
    const rms = Math.sqrt(sum / winSize);
    envFrames.push(rms);
    if (rms > maxEnv) maxEnv = rms;
  }

  const sortedEnv = [...envFrames].sort((a, b) => a - b);
  const noiseFloor = sortedEnv[Math.floor(sortedEnv.length * 0.25)] ?? 0.004;
  const onsetThreshold = Math.max(0.014, noiseFloor * 2.4, maxEnv * 0.14);

  let firstActiveFrame = 0;
  let lastActiveFrame = envFrames.length - 1;

  for (let f = 0; f < envFrames.length; f++) {
    if (envFrames[f] >= onsetThreshold) {
      firstActiveFrame = Math.max(0, f - 2);
      break;
    }
  }

  for (let f = envFrames.length - 1; f >= firstActiveFrame; f--) {
    if (envFrames[f] >= onsetThreshold * 0.85) {
      lastActiveFrame = Math.min(envFrames.length - 1, f + 8);
      break;
    }
  }

  let startSample = marginSamples + firstActiveFrame * winSize;
  let endSample = Math.min(
    totalRawSamples - marginSamples,
    marginSamples + (lastActiveFrame + 1) * winSize,
  );

  if (endSample - startSample < Math.floor(sr * 1.6)) {
    startSample = marginSamples;
    endSample = totalRawSamples - marginSamples;
  }

  const trimmedLength = Math.max(Math.floor(sr * 1.2), endSample - startSample);
  const cleanedMono = new Float32Array(trimmedLength);
  const phraseTailOnlyMono = new Float32Array(trimmedLength);

  let smoothGain = 1.0;
  let smoothGate = 0.0;
  const targetRms = 0.17;

  const isPhraseEndingFrame = new Uint8Array(envFrames.length);
  for (let f = firstActiveFrame; f <= lastActiveFrame; f++) {
    const curSinging = (envFrames[f] ?? 0) >= onsetThreshold * 0.85;
    if (!curSinging) continue;
    let silentCount = 0;
    const lookAhead = Math.min(envFrames.length - 1, f + 16);
    for (let k = f + 3; k <= lookAhead; k++) {
      if ((envFrames[k] ?? 0) < onsetThreshold * 0.65) {
        silentCount++;
      }
    }
    if (silentCount >= 6 || f >= lastActiveFrame - 12) {
      for (let b = Math.max(0, f - 12); b <= f; b++) {
        isPhraseEndingFrame[b] = 1;
      }
    }
  }

  let tailGateSmooth = 0;
  for (let i = 0; i < trimmedLength; i++) {
    const frameIdx = Math.min(
      envFrames.length - 1,
      Math.max(0, Math.floor((startSample + i - marginSamples) / winSize)),
    );
    const localRms = envFrames[frameIdx] ?? 0.01;

    const isSinging = localRms >= noiseFloor * 1.85 && localRms >= 0.009;
    const targetGate = isSinging
      ? 1.0
      : Math.max(
          0.03,
          Math.pow(localRms / Math.max(0.009, noiseFloor * 1.85), 2),
        );
    smoothGate = smoothGate * 0.996 + targetGate * 0.004;

    const desiredGain =
      localRms > 0.012
        ? Math.min(1.75, Math.max(0.75, targetRms / (localRms + 0.035)))
        : 1.0;
    smoothGain = smoothGain * 0.9985 + desiredGain * 0.0015;

    let sample = rawData[startSample + i] * smoothGate * smoothGain;

    const fadeInLen = Math.floor(sr * 0.045);
    const fadeOutLen = Math.floor(sr * 0.12);
    if (i < fadeInLen) {
      sample *= i / fadeInLen;
    } else if (i > trimmedLength - fadeOutLen) {
      sample *= (trimmedLength - i) / fadeOutLen;
    }

    const cleanSample = Math.max(-0.85, Math.min(0.85, sample));
    cleanedMono[i] = cleanSample;

    const targetTail = isPhraseEndingFrame[frameIdx] ? 1.0 : 0.0;
    tailGateSmooth = tailGateSmooth * 0.995 + targetTail * 0.005;
    phraseTailOnlyMono[i] = cleanSample * tailGateSmooth;
  }

  const renderSr = 44100;
  const trimmedDurationSec = trimmedLength / sr;
  const leadTotalSec = trimmedDurationSec + 0.6;
  const leadCtx = new OfflineAudioContext(
    2,
    Math.ceil(leadTotalSec * renderSr),
    renderSr,
  );

  const cleanBuf = leadCtx.createBuffer(1, trimmedLength, sr);
  cleanBuf.copyToChannel(cleanedMono, 0);

  const centerSrc = leadCtx.createBufferSource();
  centerSrc.buffer = cleanBuf;

  const hp = leadCtx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 105;

  const warmBody = leadCtx.createBiquadFilter();
  warmBody.type = "peaking";
  warmBody.frequency.value = 250;
  warmBody.Q.value = 0.75;
  warmBody.gain.value = 1.2;

  const presence = leadCtx.createBiquadFilter();
  presence.type = "peaking";
  presence.frequency.value = 2600;
  presence.Q.value = 0.8;
  presence.gain.value = 1.4;

  const deFizzLp = leadCtx.createBiquadFilter();
  deFizzLp.type = "lowpass";
  deFizzLp.frequency.value = 7800;

  const leadReverb = leadCtx.createConvolver();
  leadReverb.buffer = getVocalLushReverbBuffer(leadCtx);
  const leadWet = leadCtx.createGain();
  leadWet.gain.value = 0.11;

  const leadComp = leadCtx.createDynamicsCompressor();
  leadComp.threshold.value = -14;
  leadComp.knee.value = 10;
  leadComp.ratio.value = 2.4;
  leadComp.attack.value = 0.006;
  leadComp.release.value = 0.16;

  const leadOutGain = leadCtx.createGain();
  leadOutGain.gain.value = 1.15;

  centerSrc.connect(hp);
  hp.connect(warmBody);
  warmBody.connect(presence);
  presence.connect(deFizzLp);

  deFizzLp.connect(leadComp);
  deFizzLp.connect(leadReverb);
  leadReverb.connect(leadWet);
  leadWet.connect(leadComp);

  leadComp.connect(leadOutGain);
  leadOutGain.connect(leadCtx.destination);

  centerSrc.start(0);
  const leadVocalBuffer = await leadCtx.startRendering();

  const backingTotalSec = trimmedDurationSec + 1.8;
  const backCtx = new OfflineAudioContext(
    2,
    Math.ceil(backingTotalSec * renderSr),
    renderSr,
  );

  const phraseBuf = backCtx.createBuffer(1, trimmedLength, sr);
  phraseBuf.copyToChannel(phraseTailOnlyMono, 0);

  const reverbNode = backCtx.createConvolver();
  reverbNode.buffer = getVocalLushReverbBuffer(backCtx);

  const backHp = backCtx.createBiquadFilter();
  backHp.type = "highpass";
  backHp.frequency.value = 240;

  const backLp = backCtx.createBiquadFilter();
  backLp.type = "lowpass";
  backLp.frequency.value = 2100;

  const backDry = backCtx.createGain();
  backDry.gain.value = 0.16;

  const backWet = backCtx.createGain();
  backWet.gain.value = 0.45;

  backHp.connect(backLp);
  backLp.connect(backDry);
  backLp.connect(reverbNode);
  reverbNode.connect(backWet);
  backDry.connect(backCtx.destination);
  backWet.connect(backCtx.destination);

  const repeat1 = backCtx.createBufferSource();
  repeat1.buffer = phraseBuf;
  repeat1.playbackRate.value = 1.0;
  const repDelay1 = backCtx.createDelay(1.0);
  repDelay1.delayTime.value = 0.34;
  const repGain1 = backCtx.createGain();
  repGain1.gain.value = 0.38;
  repeat1.connect(repDelay1);
  repDelay1.connect(repGain1);
  repGain1.connect(backHp);
  repeat1.start(0);

  const myMelodyBackingBufferRendered = await backCtx.startRendering();

  for (let ch = 0; ch < myMelodyBackingBufferRendered.numberOfChannels; ch++) {
    const backCh = myMelodyBackingBufferRendered.getChannelData(ch);
    const leadCh = leadVocalBuffer.getChannelData(
      Math.min(ch, leadVocalBuffer.numberOfChannels - 1),
    );
    let duckEnv = 1.0;
    for (let i = 0; i < backCh.length; i++) {
      const leadAbs = i < leadCh.length ? Math.abs(leadCh[i]) : 0;
      const targetDuck = leadAbs > 0.045 ? 0.1 : 1.0;
      duckEnv = duckEnv * 0.998 + targetDuck * 0.002;
      backCh[i] *= duckEnv;
    }
  }

  const rawSamples = analyzeAudioBufferToVoiceSamples(leadVocalBuffer);
  const detectedBeatMs = detectNaturalBeatIntervalMs(rawSamples);

  const introBeats = Math.max(8, Math.round(VOCAL_INTRO_OFFSET_MS / detectedBeatMs));
  const dynamicIntroOffsetMs = introBeats * detectedBeatMs;

  const vocalDurationMs = Math.round(trimmedDurationSec * 1000);
  const vocalEndOffsetMs = dynamicIntroOffsetMs + vocalDurationMs;

  const outroBeats = Math.max(6, Math.round(VOCAL_OUTRO_TAIL_MS / detectedBeatMs));
  const dynamicOutroDurationMs = outroBeats * detectedBeatMs;

  const shiftedSamples: VoiceSamplePoint[] = rawSamples.map((s) => ({
    offsetMs: s.offsetMs + dynamicIntroOffsetMs,
    rms: s.rms,
    freqHz: s.freqHz,
  }));

  const totalSongDurationMs = Math.max(
    9500,
    Math.min(24000, vocalEndOffsetMs + dynamicOutroDurationMs),
  );

  return {
    leadVocalBuffer,
    myMelodyBackingBuffer: myMelodyBackingBufferRendered,
    trimmedVoiceSamples: shiftedSamples,
    totalSongDurationMs,
    vocalStartOffsetMs: dynamicIntroOffsetMs,
    vocalEndOffsetMs,
    detectedBeatMs,
  };
}

export function scheduleMyMelodyHumanEcho(
  ctx: BaseAudioContext,
  recordedVoiceBuffer: AudioBuffer,
  masterBus: AudioNode,
  startOffsetSec = 0,
): AudioBufferSourceNode[] {
  const reverbConvolver = ctx.createConvolver();
  reverbConvolver.buffer = getVocalLushReverbBuffer(ctx);

  const warmHighpass = ctx.createBiquadFilter();
  warmHighpass.type = "highpass";
  warmHighpass.frequency.value = 240;

  const silkyLowpass = ctx.createBiquadFilter();
  silkyLowpass.type = "lowpass";
  silkyLowpass.frequency.value = 2100;

  const dryBus = ctx.createGain();
  dryBus.gain.value = 0.14;

  const wetReverbGain = ctx.createGain();
  wetReverbGain.gain.value = 0.36;

  warmHighpass.connect(silkyLowpass);
  silkyLowpass.connect(dryBus);
  silkyLowpass.connect(reverbConvolver);
  reverbConvolver.connect(wetReverbGain);

  dryBus.connect(masterBus);
  wetReverbGain.connect(masterBus);

  const echoSrc1 = ctx.createBufferSource();
  echoSrc1.buffer = recordedVoiceBuffer;
  echoSrc1.playbackRate.value = 1.0;

  const delay1 = ctx.createDelay(1.0);
  delay1.delayTime.value = 0.35;

  const gain1 = ctx.createGain();
  gain1.gain.value = 0.24;

  echoSrc1.connect(delay1);
  delay1.connect(gain1);
  gain1.connect(warmHighpass);
  echoSrc1.start(startOffsetSec);

  return [echoSrc1];
}

// ============================================================================
// LỚP NỀN HOÀ ÂM TRONG SUỐT (PURE SINE AIR PAD - KHÔNG GÂY TIẾNG Ù ORGAN)
// Chỉ dùng sóng Sine thuần khiết ở âm lượng nhỏ (0.04) để giữ không gian ấm áp
// ============================================================================
function playWarmHarmonicPad(
  ctx: BaseAudioContext,
  chordFreqs: number[],
  now: number,
  durationSec: number,
  volume: number,
): void {
  if (chordFreqs.length < 3) return;
  const bus = getMasterStageBus(ctx);
  const padNotes = [chordFreqs[1] ?? 196.0, chordFreqs[2], chordFreqs[3] ?? 329.63];

  const padEnv = ctx.createGain();
  padEnv.gain.setValueAtTime(0.0001, now);
  padEnv.gain.linearRampToValueAtTime(volume * 0.55, now + 0.1);
  padEnv.gain.setValueAtTime(volume * 0.45, now + durationSec * 0.65);
  padEnv.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

  padNotes.forEach((f) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(f, now);
    osc.connect(padEnv);
    osc.start(now);
    osc.stop(now + durationSec + 0.04);
  });

  padEnv.connect(bus);
}

// ============================================================================
// 1. TRỐNG JAZZ & PERCUSSION MỀM ẤM (CINNAMOROLL)
// ============================================================================
export function playDrumHit(
  ctx: BaseAudioContext,
  type: "kick" | "snare" | "hat" | "kick-hat" | "crash" = "kick",
  volumeScale = 1,
  startTimeSec?: number,
): void {
  const now = startTimeSec ?? ctx.currentTime;
  const bus = getMasterStageBus(ctx);
  const v = Math.min(1.2, Math.max(0.12, volumeScale));

  if (type === "kick" || type === "kick-hat") {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(112, now);
    osc.frequency.exponentialRampToValueAtTime(58, now + 0.13);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.28 * v, now + 0.009);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);

    osc.connect(gain);
    gain.connect(bus);

    osc.start(now);
    osc.stop(now + 0.26);
  }

  if (type === "snare") {
    const bodyOsc = ctx.createOscillator();
    const bodyGain = ctx.createGain();
    bodyOsc.type = "triangle";
    bodyOsc.frequency.setValueAtTime(210, now);
    bodyOsc.frequency.exponentialRampToValueAtTime(118, now + 0.09);

    bodyGain.gain.setValueAtTime(0.0001, now);
    bodyGain.gain.linearRampToValueAtTime(0.24 * v, now + 0.007);
    bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

    bodyOsc.connect(bodyGain);
    bodyGain.connect(bus);
    bodyOsc.start(now);
    bodyOsc.stop(now + 0.16);
  }

  if (type === "hat" || type === "kick-hat") {
    // Tiếng phách gỗ Wood-Tick nhẹ nhàng đánh dấu Nhịp 2 ("Tách")
    const tickOsc = ctx.createOscillator();
    const tickGain = ctx.createGain();
    tickOsc.type = "sine";
    tickOsc.frequency.setValueAtTime(1480, now);
    tickOsc.frequency.exponentialRampToValueAtTime(980, now + 0.035);
    tickGain.gain.setValueAtTime(0.0001, now);
    tickGain.gain.linearRampToValueAtTime(0.075 * v, now + 0.004);
    tickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.048);

    tickOsc.connect(tickGain);
    tickGain.connect(bus);
    tickOsc.start(now);
    tickOsc.stop(now + 0.055);
  }

  if (type === "crash") {
    // Tiếng Chuông Gió kết bài (Wind Chime C-Major Arpeggio)
    const chimeFreqs = [N.C4, N.E4, N.G4, N.C5, N.E5, N.G5];
    chimeFreqs.forEach((f, idx) => {
      const noteTime = now + idx * 0.065;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(f, noteTime);

      gain.gain.setValueAtTime(0.0001, noteTime);
      gain.gain.linearRampToValueAtTime(0.11 * v, noteTime + 0.018);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 1.55);

      osc.connect(gain);
      gain.connect(bus);
      osc.start(noteTime);
      osc.stop(noteTime + 1.6);
    });
  }
}

// ============================================================================
// 2. ĐÀN GỖ CẦU VỒNG XYLOPHONE / MARIMBA (KUROMI) - CHUẨN CHẤT GỖ TRONG TRẺO
// - Tái tạo đúng âm học thanh gỗ Rosewood: Sóng cơ bản + Hài âm bậc 3/4 + Tiếng dùi gõ
// - Khi đệm nhịp 1-2:
//   + Nhịp 1 (downbeat - "TÓC"): Gõ thanh Gỗ Trầm ấm (Quãng 4 + Quãng 5)
//   + Nhịp 2 (offbeat  - "TÁCH"): Gõ kép 2 thanh Gỗ Cao (Quãng 5 Mi-Son) nảy gọn!
// ============================================================================
function strikeSingleXylophoneBar(
  ctx: BaseAudioContext,
  barFreq: number,
  now: number,
  vol: number,
  sustainSec: number,
): void {
  const bus = getMasterStageBus(ctx);

  // 1. Thanh gỗ chính (Fundamental Sine)
  const mainOsc = ctx.createOscillator();
  const mainGain = ctx.createGain();
  mainOsc.type = "sine";
  mainOsc.frequency.setValueAtTime(barFreq, now);

  mainGain.gain.setValueAtTime(0.0001, now);
  mainGain.gain.linearRampToValueAtTime(0.28 * vol, now + 0.006);
  mainGain.gain.exponentialRampToValueAtTime(0.0001, now + sustainSec);

  // 2. Hài âm thanh gỗ Rosewood (3.0x & 3.98x ngắn 55ms tạo chất "Kính-coong / Tóc-tách" đặc trưng của Xylophone)
  const woodHarmonicOsc = ctx.createOscillator();
  const woodHarmonicGain = ctx.createGain();
  woodHarmonicOsc.type = "sine";
  woodHarmonicOsc.frequency.setValueAtTime(barFreq * 3.0, now);

  woodHarmonicGain.gain.setValueAtTime(0.0001, now);
  woodHarmonicGain.gain.linearRampToValueAtTime(0.11 * vol, now + 0.004);
  woodHarmonicGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.065);

  // 3. Tiếng đầu dùi gỗ chạm vào thanh đàn (Wood Mallet Transient 18ms)
  const malletOsc = ctx.createOscillator();
  const malletGain = ctx.createGain();
  malletOsc.type = "triangle";
  malletOsc.frequency.setValueAtTime(Math.min(1800, barFreq * 2.0), now);
  malletOsc.frequency.exponentialRampToValueAtTime(barFreq, now + 0.018);

  malletGain.gain.setValueAtTime(0.0001, now);
  malletGain.gain.linearRampToValueAtTime(0.14 * vol, now + 0.003);
  malletGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.024);

  mainOsc.connect(mainGain);
  woodHarmonicOsc.connect(woodHarmonicGain);
  malletOsc.connect(malletGain);

  mainGain.connect(bus);
  woodHarmonicGain.connect(bus);
  malletGain.connect(bus);

  mainOsc.start(now);
  woodHarmonicOsc.start(now);
  malletOsc.start(now);

  mainOsc.stop(now + sustainSec + 0.03);
  woodHarmonicOsc.stop(now + 0.075);
  malletOsc.stop(now + 0.03);
}

export function playWoodyXylophoneNote(
  ctx: BaseAudioContext,
  freq: number,
  volumeScale = 1,
  startTimeSec?: number,
  beatRole: "downbeat" | "offbeat" | "full" = "full",
  chordFreqs?: number[],
): void {
  const now = startTimeSec ?? ctx.currentTime;
  const v = Math.min(1.25, Math.max(0.12, volumeScale));

  // Đẩy tần số Đàn Gỗ lên vùng sáng (Quãng 5: 523Hz - 1046Hz) để nghe rõ tiếng gõ gỗ lanh lảnh, không bị chìm vào giọng hát!
  const brightFreq = freq < 380 ? freq * 2 : freq;

  if (beatRole === "downbeat") {
    // NHỊP 1 ("TÓC" - Phách mạnh): Gõ thanh Gỗ gốc trầm + thanh quãng 8 sáng
    const rootWoodFreq = chordFreqs && chordFreqs.length >= 3 ? chordFreqs[2] : brightFreq * 0.5;
    strikeSingleXylophoneBar(ctx, rootWoodFreq, now, v * 0.85, 0.48);
    strikeSingleXylophoneBar(ctx, rootWoodFreq * 2, now + 0.012, v * 0.95, 0.44);
    return;
  }

  if (beatRole === "offbeat") {
    // NHỊP 2 ("TÁCH" - Phách nhẹ): Gõ kép 2 thanh Gỗ cao (Quãng 3 & Quãng 5 ở quãng 5) nảy gọn 0.28s!
    const thirdFreq =
      chordFreqs && chordFreqs.length >= 4 ? chordFreqs[3] * 2 : brightFreq;
    const fifthFreq =
      chordFreqs && chordFreqs.length >= 5
        ? chordFreqs[4] * 2
        : brightFreq * 1.25;
    strikeSingleXylophoneBar(ctx, thirdFreq, now, v * 0.82, 0.28);
    strikeSingleXylophoneBar(ctx, fifthFreq, now + 0.022, v * 0.9, 0.28);
    return;
  }

  // Chế độ "full" (gõ giai điệu Intro / Outro hoặc bấm trực tiếp vào Kuromi)
  strikeSingleXylophoneBar(ctx, brightFreq, now, v, 0.52);
}

// ============================================================================
// 3. TIẾNG NGÂN NGUYÊN ÂM MỀM
// ============================================================================
export function playVocalLeadNote(
  ctx: BaseAudioContext,
  freq: number,
  volumeScale = 1,
  startTimeSec?: number,
): void {
  const now = startTimeSec ?? ctx.currentTime;
  const bus = getMasterStageBus(ctx);
  const v = Math.min(1.15, Math.max(0.12, volumeScale));

  const mainVoice = ctx.createOscillator();
  mainVoice.type = "sine";
  mainVoice.frequency.setValueAtTime(freq, now);

  const vocalEnv = ctx.createGain();
  vocalEnv.gain.setValueAtTime(0.0001, now);
  vocalEnv.gain.linearRampToValueAtTime(0.18 * v, now + 0.05);
  vocalEnv.gain.exponentialRampToValueAtTime(0.0001, now + 0.68);

  mainVoice.connect(vocalEnv);
  vocalEnv.connect(bus);

  mainVoice.start(now);
  mainVoice.stop(now + 0.7);
}

// ============================================================================
// 4. ĐÀN GUITAR ACOUSTIC RẢI HỢP ÂM LIỀN MẠCH (POCHACCO)
// ============================================================================
export function playGuitarChordStrum(
  ctx: BaseAudioContext,
  chordFreqs: number[],
  volumeScale = 1,
  startTimeSec?: number,
  sustainSec = 0.75,
  beatRole: "downbeat" | "offbeat" | "full" = "full",
): void {
  const now = startTimeSec ?? ctx.currentTime;
  const bus = getMasterStageBus(ctx);
  const v = Math.min(1.2, Math.max(0.12, volumeScale));

  if (beatRole === "downbeat") {
    playWarmHarmonicPad(ctx, chordFreqs, now, 1.05, 0.06 * v);

    const rootFreq = chordFreqs[0] ?? 130.81;
    const fifthFreq = chordFreqs[1] ?? 196.0;

    const bassOsc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const bassGain = ctx.createGain();

    bassOsc.type = "triangle";
    bassOsc.frequency.setValueAtTime(rootFreq, now);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(680, now);

    bassGain.gain.setValueAtTime(0.0001, now);
    bassGain.gain.linearRampToValueAtTime(0.28 * v, now + 0.014);
    bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.62);

    bassOsc.connect(filter);
    filter.connect(bassGain);
    bassGain.connect(bus);
    bassOsc.start(now);
    bassOsc.stop(now + 0.65);

    const secondStringOsc = ctx.createOscillator();
    const secondGain = ctx.createGain();
    secondStringOsc.type = "sine";
    secondStringOsc.frequency.setValueAtTime(fifthFreq, now + 0.032);
    secondGain.gain.setValueAtTime(0.0001, now + 0.032);
    secondGain.gain.linearRampToValueAtTime(0.16 * v, now + 0.048);
    secondGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

    secondStringOsc.connect(secondGain);
    secondGain.connect(bus);
    secondStringOsc.start(now + 0.032);
    secondStringOsc.stop(now + 0.58);
    return;
  }

  if (beatRole === "offbeat") {
    const upperStrings = chordFreqs.slice(2, 5);
    upperStrings.forEach((freq, idx) => {
      const noteStart = now + idx * 0.02;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = idx === 0 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq * 2, noteStart);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1600, noteStart);

      gain.gain.setValueAtTime(0.0001, noteStart);
      gain.gain.linearRampToValueAtTime(0.14 * v, noteStart + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.34);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(bus);
      osc.start(noteStart);
      osc.stop(noteStart + 0.37);
    });
    return;
  }

  const dur = Math.max(0.9, Math.min(2.2, sustainSec));
  chordFreqs.forEach((freq, idx) => {
    const noteStart = now + idx * 0.055;
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = idx < 2 ? "triangle" : "sine";
    osc.frequency.setValueAtTime(freq, noteStart);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1350, noteStart);

    gain.gain.setValueAtTime(0.0001, noteStart);
    gain.gain.linearRampToValueAtTime(0.13 * v, noteStart + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + dur);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(bus);

    osc.start(noteStart);
    osc.stop(noteStart + dur + 0.05);
  });
}

// ============================================================================
// 5. ĐÀN ORGAN / ELECTRIC PIANO ĐA ÂM (POMPOMPURIN)
// ============================================================================
export function playGoldenBellChime(
  ctx: BaseAudioContext,
  freq: number,
  volumeScale = 1,
  chordFreqs?: number[],
  startTimeSec?: number,
  sustainSec = 0.75,
  beatRole: "downbeat" | "offbeat" | "full" = "full",
): void {
  const now = startTimeSec ?? ctx.currentTime;
  const bus = getMasterStageBus(ctx);
  const v = Math.min(1.2, Math.max(0.12, volumeScale));

  if (beatRole === "downbeat") {
    if (chordFreqs && chordFreqs.length >= 3) {
      playWarmHarmonicPad(ctx, chordFreqs, now, 1.05, 0.065 * v);
    }

    const bassFreq =
      chordFreqs && chordFreqs.length > 0 ? chordFreqs[0] : freq * 0.5;
    const rootMidFreq =
      chordFreqs && chordFreqs.length > 2 ? chordFreqs[2] : bassFreq * 2;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const env = ctx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(bassFreq, now);
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(rootMidFreq, now);

    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(0.24 * v, now + 0.016);
    env.gain.exponentialRampToValueAtTime(0.0001, now + 0.58);

    osc1.connect(env);
    osc2.connect(env);
    env.connect(bus);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.62);
    osc2.stop(now + 0.62);
    return;
  }

  if (beatRole === "offbeat") {
    const upperNotes =
      chordFreqs && chordFreqs.length >= 4
        ? chordFreqs.slice(2, 5)
        : [freq * 0.75, freq, freq * 1.25];

    upperNotes.forEach((nFreq, idx) => {
      const noteTime = now + idx * 0.018;
      const osc = ctx.createOscillator();
      const env = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(nFreq * 2, noteTime);

      env.gain.setValueAtTime(0.0001, noteTime);
      env.gain.linearRampToValueAtTime(0.12 * v, noteTime + 0.012);
      env.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.32);

      osc.connect(env);
      env.connect(bus);
      osc.start(noteTime);
      osc.stop(noteTime + 0.35);
    });
    return;
  }

  const dur = Math.max(0.9, Math.min(2.2, sustainSec));
  const padNotes =
    chordFreqs && chordFreqs.length >= 4
      ? chordFreqs.slice(1, 5)
      : [freq * 0.5, freq * 0.75, freq];

  padNotes.forEach((pFreq, i) => {
    const noteTime = now + i * 0.055;
    const padOsc = ctx.createOscillator();
    const padEnv = ctx.createGain();
    padOsc.type = "sine";
    padOsc.frequency.setValueAtTime(pFreq, noteTime);

    padEnv.gain.setValueAtTime(0.0001, noteTime);
    padEnv.gain.linearRampToValueAtTime(0.12 * v, noteTime + 0.025);
    padEnv.gain.exponentialRampToValueAtTime(0.0001, noteTime + dur);

    padOsc.connect(padEnv);
    padEnv.connect(bus);
    padOsc.start(noteTime);
    padOsc.stop(noteTime + dur + 0.05);
  });
}

// ============================================================================
// HỆ THỐNG DỰNG BÀI HÁT NGẮN (MINI SONG BUILDER V10):
// - INTRO (~4.8s): Giai điệu mở màn tươi sáng (vol = 0.92)
// - VOCAL BODY (Khi Nấm hát): Nhạc cụ giữ nhịp 1-2 / 1-2-3 rõ nét dưới giọng hát (vol = 0.62)
// - OUTRO (~3.2s): Giai điệu vĩ thanh nổi lên chúc mừng bé (vol = 0.92) & kết bài
// ============================================================================

export interface VoiceSamplePoint {
  offsetMs: number;
  rms: number;
  freqHz: number;
}

export interface RecordedBandStep {
  offsetMs: number;
  instruments: BandInstrumentId[];
  drum?: "kick" | "snare" | "hat" | "kick-hat" | "crash";
  xyloFreq?: number;
  vocalFreq?: number;
  chordFreqs?: number[];
  bellFreq?: number;
  sustainSec?: number;
  beatRole?: "downbeat" | "offbeat" | "full";
  section?: "intro" | "body" | "outro";
  noteLabel: string;
}

interface PentatonicNoteDef {
  freq: number;
  lowFreq: number;
  organFreq: number;
  chordFreqs: number[];
  label: string;
}

const PENTATONIC_SCALE: PentatonicNoteDef[] = [
  { freq: N.C4, lowFreq: N.C4 * 0.5, organFreq: N.C4, chordFreqs: CHORD_C, label: "Đồ" },
  { freq: N.D4, lowFreq: N.D4 * 0.5, organFreq: N.D4, chordFreqs: CHORD_G, label: "Rê" },
  { freq: N.E4, lowFreq: N.E4 * 0.5, organFreq: N.E4, chordFreqs: CHORD_C, label: "Mi" },
  { freq: N.G4, lowFreq: N.G4 * 0.5, organFreq: N.G4, chordFreqs: CHORD_G, label: "Son" },
  { freq: N.A4, lowFreq: N.A4 * 0.5, organFreq: N.A4, chordFreqs: CHORD_AM, label: "La" },
  { freq: N.C5, lowFreq: N.C4, organFreq: N.C5, chordFreqs: CHORD_F, label: "Đố" },
];

export function quantizeToPentatonic(
  rawFreqHz: number,
  fallbackIndex = 0,
): PentatonicNoteDef {
  if (!Number.isFinite(rawFreqHz) || rawFreqHz < 110) {
    return PENTATONIC_SCALE[fallbackIndex % PENTATONIC_SCALE.length];
  }
  let normalized = rawFreqHz;
  while (normalized < 245) normalized *= 2;
  while (normalized > 560) normalized *= 0.5;

  let best = PENTATONIC_SCALE[0];
  let minDiff = Math.abs(normalized - best.freq);
  for (const item of PENTATONIC_SCALE) {
    const diff = Math.abs(normalized - item.freq);
    if (diff < minDiff) {
      minDiff = diff;
      best = item;
    }
  }
  return best;
}

export function estimatePitchFromTimeDomain(
  buf: Float32Array,
  sampleRate: number,
): { rms: number; freqHz: number } {
  const n = buf.length;
  if (n === 0) return { rms: 0, freqHz: 0 };

  let sumSq = 0;
  for (let i = 0; i < n; i++) {
    sumSq += buf[i] * buf[i];
  }
  const rms = Math.sqrt(sumSq / n);
  if (rms < 0.012) {
    return { rms, freqHz: 0 };
  }

  const minLag = Math.max(8, Math.floor(sampleRate / 700));
  const maxLag = Math.min(Math.floor(n / 2), Math.floor(sampleRate / 150));

  let bestLag = -1;
  let bestCorr = 0;
  for (let lag = minLag; lag <= maxLag; lag++) {
    let corr = 0;
    for (let i = 0; i < n - lag; i += 2) {
      corr += buf[i] * buf[i + lag];
    }
    if (corr > bestCorr) {
      bestCorr = corr;
      bestLag = lag;
    }
  }

  const freqHz = bestLag > 0 ? sampleRate / bestLag : 0;
  return { rms, freqHz };
}

export function analyzeAudioBufferToVoiceSamples(
  audioBuffer: AudioBuffer,
): VoiceSamplePoint[] {
  const channelData = audioBuffer.getChannelData(0);
  const sampleRate = audioBuffer.sampleRate;
  const windowSize = Math.min(2048, Math.floor(sampleRate * 0.06));
  const stepSamples = Math.max(512, Math.floor(sampleRate * 0.08));
  const samples: VoiceSamplePoint[] = [];

  for (
    let start = 0;
    start + windowSize <= channelData.length;
    start += stepSamples
  ) {
    const slice = channelData.subarray(start, start + windowSize);
    const { rms, freqHz } = estimatePitchFromTimeDomain(slice, sampleRate);
    const offsetMs = Math.round((start / sampleRate) * 1000);
    samples.push({ offsetMs, rms, freqHz });
  }
  return samples;
}

// Giai điệu dạo đầu Intro (~5 giây) và dạo kết Outro (~3 giây) ở Quãng 5 trong trẻo, vui tươi
const INTRO_MELODY_NOTES = [
  N.C5,
  N.D5,
  N.E5,
  N.G5,
  N.E5,
  N.D5,
  N.C5,
  N.E5,
  N.G5,
  N.C5,
];
const OUTRO_MELODY_NOTES = [N.G5, N.E5, N.D5, N.E5, N.G5, N.C5];

export function buildBandArrangementFromVoice(
  samples: VoiceSamplePoint[],
  manualTaps: RecordedBandStep[],
  durationMs: number,
  backboneMode: BandBackboneMode = "organ",
  customBeatMs?: number,
  vocalStartOffsetMs = VOCAL_INTRO_OFFSET_MS,
  vocalEndOffsetMs?: number,
): RecordedBandStep[] {
  const safeDuration = Math.max(9000, Math.min(25000, durationMs));
  const result: RecordedBandStep[] = [];

  const beatMs = customBeatMs ?? detectNaturalBeatIntervalMs(samples);
  const meter = backboneMode === "guitar" ? 3 : 2;
  const backboneInst: BandInstrumentId =
    backboneMode === "organ"
      ? "bells"
      : backboneMode === "guitar"
        ? "guitar"
        : "xylophone";

  const maxRms = samples.reduce((m, s) => Math.max(m, s.rms), 0);
  const voiceThreshold = Math.max(0.015, maxRms * 0.26);

  const inferredVocalEndMs =
    vocalEndOffsetMs ??
    Math.max(
      vocalStartOffsetMs + 1800,
      samples.reduce(
        (maxT, s) => (s.rms >= voiceThreshold ? Math.max(maxT, s.offsetMs) : maxT),
        vocalStartOffsetMs + 2200,
      ) + 300,
    );

  const phraseEndsMs: number[] = [];
  let inPhrase = false;
  let lastVoicedMs = 0;

  for (const s of samples) {
    if (s.rms >= voiceThreshold) {
      inPhrase = true;
      lastVoicedMs = s.offsetMs;
    } else if (inPhrase && s.offsetMs - lastVoicedMs >= 360) {
      phraseEndsMs.push(lastVoicedMs);
      inPhrase = false;
    }
  }
  if (inPhrase && lastVoicedMs > 0) {
    phraseEndsMs.push(lastVoicedMs);
  }

  const chordCycle = [CHORD_C, CHORD_G, CHORD_AM, CHORD_F];
  const introBeatIndex = Math.max(1, Math.round(vocalStartOffsetMs / beatMs));
  const totalBeats = Math.max(
    introBeatIndex + 8,
    Math.floor((safeDuration - 350) / beatMs),
  );

  const instName =
    backboneMode === "organ"
      ? "🎹 Organ"
      : backboneMode === "guitar"
        ? "🎸 Guitar"
        : "🎶 Đàn Gỗ";

  for (let b = 0; b < totalBeats; b++) {
    const tMs = b * beatMs;
    const isLastBeat = b === totalBeats - 1;

    const relBeat = b - introBeatIndex;
    const beatInBar = ((relBeat % meter) + meter) % meter;
    const isDownbeat = beatInBar === 0;
    const beatNumberLabel = beatInBar + 1;
    const barIndex = Math.floor(b / meter);

    const isIntroSection = tMs < vocalStartOffsetMs - 80;
    const isOutroSection = tMs >= inferredVocalEndMs;

    const activeChord = isLastBeat
      ? CHORD_C
      : chordCycle[barIndex % chordCycle.length];
    const rootNote = PENTATONIC_SCALE[barIndex % PENTATONIC_SCALE.length];

    // ------------------------------------------------------------------------
    // 1. PHÁCH KẾT BÀI CUỐI CÙNG (CUỐI OUTRO): Rải nhẹ hợp âm Đô Trưởng + Chuông gió
    // ------------------------------------------------------------------------
    if (isLastBeat) {
      result.push({
        offsetMs: tMs,
        instruments: [backboneInst, "xylophone"],
        drum: "crash",
        chordFreqs: CHORD_C,
        bellFreq: backboneInst === "bells" ? N.C4 : undefined,
        xyloFreq: N.C5,
        beatRole: "full",
        section: "outro",
        sustainSec: 1.85,
        noteLabel:
          "🎆 Kết bài (Outro): Rải hợp âm Đô Trưởng êm dịu & tắt dần (Fade-out)!",
      });
      continue;
    }

    // ------------------------------------------------------------------------
    // 2. PHẦN INTRO DẠO ĐẦU (~5 GIÂY TRƯỚC KHI NẤM HÁT)
    // ------------------------------------------------------------------------
    if (isIntroSection) {
      const introMelodyFreq =
        INTRO_MELODY_NOTES[b % INTRO_MELODY_NOTES.length];
      const secLeft = Math.max(
        1,
        Math.ceil((vocalStartOffsetMs - tMs) / 1000),
      );
      const isLastIntroBeat = b === introBeatIndex - 1;

      const introInstruments: BandInstrumentId[] = [backboneInst];
      if (!introInstruments.includes("xylophone")) {
        introInstruments.push("xylophone");
      }
      if (isDownbeat) {
        introInstruments.push("drums");
      }

      result.push({
        offsetMs: tMs,
        instruments: introInstruments,
        drum: isDownbeat ? "kick" : "hat",
        chordFreqs: activeChord,
        bellFreq: backboneInst === "bells" ? rootNote.organFreq : undefined,
        xyloFreq: introMelodyFreq,
        beatRole: isDownbeat ? "downbeat" : "offbeat",
        section: "intro",
        sustainSec: isDownbeat ? 0.55 : 0.35,
        noteLabel: isLastIntroBeat
          ? `🎵 Dạo Intro hoàn tất — Đón giọng hát Ca sĩ Nấm vào đúng Nhịp 1!`
          : `🎵 Đang dạo nhạc Intro (${secLeft}s)... ${instName} giữ nhịp ${beatNumberLabel}/${meter}`,
      });
      continue;
    }

    // ------------------------------------------------------------------------
    // 3. PHẦN OUTRO VĨ THANH (~3 GIÂY SAU KHI NẤM HÁT XONG)
    // ------------------------------------------------------------------------
    if (isOutroSection) {
      const outroStepIdx = Math.max(
        0,
        Math.round((tMs - inferredVocalEndMs) / beatMs),
      );
      const outroMelodyFreq =
        OUTRO_MELODY_NOTES[outroStepIdx % OUTRO_MELODY_NOTES.length];

      const outroInstruments: BandInstrumentId[] = [backboneInst];
      if (!outroInstruments.includes("xylophone")) {
        outroInstruments.push("xylophone");
      }
      if (outroStepIdx <= 1) {
        outroInstruments.push("vocal");
      }

      result.push({
        offsetMs: tMs,
        instruments: outroInstruments,
        drum: isDownbeat ? "kick" : "hat",
        chordFreqs: activeChord,
        bellFreq: backboneInst === "bells" ? rootNote.organFreq : undefined,
        xyloFreq: outroMelodyFreq,
        beatRole: isDownbeat ? "downbeat" : "offbeat",
        section: "outro",
        sustainSec: isDownbeat ? 0.55 : 0.35,
        noteLabel: `🎶 Dạo nhạc Outro kết bài: ${instName} & Đàn Gỗ ngân giai điệu vĩ thanh...`,
      });
      continue;
    }

    // ------------------------------------------------------------------------
    // 4. PHẦN THÂN BÀI (KHI NẤM ĐANG HÁT):
    //    Nhạc cụ chủ đạo đánh Nhịp 1 ("TÓC / BÙM") - Nhịp 2 ("TÁCH / CHÁT") rõ nét!
    // ------------------------------------------------------------------------
    const isPhrasePauseEcho = phraseEndsMs.some(
      (endMs) => tMs - endMs >= 80 && tMs - endMs <= beatMs * 1.25,
    );

    const bodyInstruments: BandInstrumentId[] = [backboneInst];
    if (isPhrasePauseEcho) {
      bodyInstruments.push("vocal");
    } else if (isDownbeat) {
      bodyInstruments.push("drums");
    }

    let bodyXyloFreq: number | undefined;
    if (backboneInst === "xylophone") {
      bodyXyloFreq = isDownbeat ? activeChord[2] * 2 : activeChord[4] * 2;
    }

    const bodyLabel = isPhrasePauseEcho
      ? `🎤💕 Khoảng nghỉ câu hát: My Melody ngân nhẹ chữ cuối của Nấm!`
      : isDownbeat
        ? `${instName} • Nhịp 1 ("TÓC / BÙM" - Phách mạnh giữ nhịp)`
        : `${instName} • Nhịp ${beatNumberLabel} ("TÁCH / CHÁT" - Phách nhẹ nảy gọn)`;

    result.push({
      offsetMs: tMs,
      instruments: bodyInstruments,
      drum: isDownbeat ? "kick" : "hat",
      chordFreqs: activeChord,
      bellFreq: backboneInst === "bells" ? rootNote.organFreq : undefined,
      xyloFreq: bodyXyloFreq,
      beatRole: isDownbeat ? "downbeat" : "offbeat",
      section: "body",
      sustainSec: isDownbeat ? 0.48 : 0.28,
      noteLabel: bodyLabel,
    });
  }

  for (const tap of manualTaps) {
    if (tap.offsetMs <= safeDuration) {
      result.push(tap);
    }
  }

  result.sort((a, b) => a.offsetMs - b.offsetMs);
  return result;
}

// ============================================================================
// BỘ KẾT XUẤT FILE NHẠC HOÀN CHỈNH (.WAV MIXDOWN) QUA OFFLINEAUDIOCONTEXT
// ============================================================================

function encodeAudioBufferToWavBlob(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const numSamples = buffer.length;
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const dataSize = numSamples * blockAlign;
  const arrayBuffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(arrayBuffer);

  const writeStr = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeStr(0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeStr(8, "WAVE");
  writeStr(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true);
  writeStr(36, "data");
  view.setUint32(40, dataSize, true);

  const channels: Float32Array[] = [];
  for (let c = 0; c < numChannels; c++) {
    channels.push(buffer.getChannelData(c));
  }

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    for (let c = 0; c < numChannels; c++) {
      const sample = Math.max(-1, Math.min(1, channels[c][i]));
      view.setInt16(
        offset,
        sample < 0 ? sample * 0x8000 : sample * 0x7fff,
        true,
      );
      offset += 2;
    }
  }

  return new Blob([arrayBuffer], { type: "audio/wav" });
}

export async function renderConcertToWavBlob(
  polishedLeadBuffer: AudioBuffer | null,
  steps: RecordedBandStep[],
  durationMs: number,
  myMelodyBackingBuffer?: AudioBuffer | null,
  vocalStartOffsetMs = VOCAL_INTRO_OFFSET_MS,
): Promise<Blob> {
  const sampleRate = 44100;
  const lastStepMs =
    steps.length > 0 ? steps[steps.length - 1].offsetMs + 1800 : durationMs;
  const totalSec = Math.max(
    9.5,
    Math.min(26, Math.max(durationMs, lastStepMs) / 1000 + 0.8),
  );
  const totalFrames = Math.ceil(totalSec * sampleRate);

  const offlineCtx = new OfflineAudioContext(2, totalFrames, sampleRate);
  const masterBus = getMasterStageBus(offlineCtx);
  const startSec = Math.max(0, vocalStartOffsetMs / 1000);

  if (polishedLeadBuffer) {
    const leadSrc = offlineCtx.createBufferSource();
    leadSrc.buffer = polishedLeadBuffer;
    const leadGain = offlineCtx.createGain();
    leadGain.gain.value = 1.32;
    leadSrc.connect(leadGain);
    leadGain.connect(masterBus);
    leadSrc.start(startSec);

    if (myMelodyBackingBuffer) {
      const backSrc = offlineCtx.createBufferSource();
      backSrc.buffer = myMelodyBackingBuffer;
      const backGain = offlineCtx.createGain();
      backGain.gain.value = 0.72;
      backSrc.connect(backGain);
      backGain.connect(masterBus);
      backSrc.start(startSec);
    } else {
      scheduleMyMelodyHumanEcho(
        offlineCtx,
        polishedLeadBuffer,
        masterBus,
        startSec,
      );
    }
  }

  for (const step of steps) {
    const stepSec = Math.max(0, step.offsetMs / 1000);
    const sustain = step.sustainSec ?? 0.55;
    const role = step.beatRole ?? "full";
    // Ở Intro và Outro (khi bé không hát), ban nhạc chơi đầy đặn (0.92); khi bé hát, nhạc đệm dịu xuống (0.64)
    const instVol =
      !polishedLeadBuffer || step.section === "intro" || step.section === "outro"
        ? 0.92
        : 0.64;

    if (step.drum) {
      playDrumHit(offlineCtx, step.drum, instVol * 0.7, stepSec);
    }
    if (step.xyloFreq && step.instruments.includes("xylophone")) {
      const xyloRole =
        step.section === "intro" || step.section === "outro" ? "full" : role;
      playWoodyXylophoneNote(
        offlineCtx,
        step.xyloFreq,
        instVol * 0.92,
        stepSec,
        xyloRole,
        step.chordFreqs,
      );
    }
    if (
      !polishedLeadBuffer &&
      step.vocalFreq &&
      step.instruments.includes("vocal")
    ) {
      playVocalLeadNote(offlineCtx, step.vocalFreq, instVol, stepSec);
    }
    if (step.chordFreqs && step.instruments.includes("guitar")) {
      playGuitarChordStrum(
        offlineCtx,
        step.chordFreqs,
        instVol,
        stepSec,
        sustain,
        role,
      );
    }
    if (step.bellFreq && step.instruments.includes("bells")) {
      playGoldenBellChime(
        offlineCtx,
        step.bellFreq,
        instVol,
        step.chordFreqs,
        stepSec,
        sustain,
        role,
      );
    }
  }

  const renderedBuffer = await offlineCtx.startRendering();
  return encodeAudioBufferToWavBlob(renderedBuffer);
}
