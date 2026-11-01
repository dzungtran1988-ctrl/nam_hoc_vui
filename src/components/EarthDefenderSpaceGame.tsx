import React, { useEffect, useRef, useState, useCallback } from 'react';

interface EarthDefenderSpaceGameProps {
  soundEnabled?: boolean;
  onBack?: () => void;
  onEarnStars?: (stars: number) => void;
  onReaction?: (type: 'happy' | 'sad' | 'singing' | 'idle', message?: string) => void;
  onEarnReward?: (coins: number, summaryText: string) => void;
}

type GameStatus = 'menu' | 'playing' | 'quiz' | 'paused' | 'victory' | 'gameover';

interface StarBg {
  x: number;
  y: number;
  r: number;
  speed: number;
  alpha: number;
  twinkle: number;
  color: string;
}

interface Bullet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  dmg: number;
  spriteKey: string;
  scale: number;
  homing?: boolean;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hp: number;
  maxHp: number;
  kind: 'sm' | 'md' | 'lg';
  wobblePhase: number;
  hitFlash: number;
}

interface BossState {
  x: number;
  y: number;
  vy: number;
  hp: number;
  maxHp: number;
  radius: number;
  spriteKey: string;
  fireCd: number;
  halfQuizTriggered: boolean;
  hitFlash: number;
  dying: boolean;
  dyingTimer: number;
}

interface PortalSceneState {
  phase: 'zoom_in' | 'ship_enter' | 'warp_speed';
  timer: number;
  x: number;
  y: number;
  portalScale: number;
  warpFlash: number;
}

interface BossProjectile {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

type PickupKind =
  | 'star'
  | 'upgrade'
  | 'shield'
  | 'medkit'
  | 'magnet'
  | 'bolt'
  | 'clock'
  | 'rocket'
  | 'nova_rainbow';

interface PickupItem {
  x: number;
  y: number;
  vx: number;
  vy: number;
  kind: PickupKind;
  bobPhase: number;
}

interface Explosion3D {
  x: number;
  y: number;
  scale: number;
  maxScale: number;
  alpha: number;
}

interface ShockwaveRing {
  x: number;
  y: number;
  r: number;
  maxR: number;
  color: string;
  alpha: number;
  width: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  alpha: number;
  decay: number;
}

interface FloatingPopup {
  x: number;
  y: number;
  text: string;
  color: string;
  vy: number;
  alpha: number;
  scale: number;
}

interface QuizQuestion {
  subject: string;
  visual: string;
  question: string;
  options: string[];
  correct: number;
}

interface ActiveQuiz extends QuizQuestion {
  shuffledOptions: { text: string; isCorrect: boolean }[];
}

const BEST_SCORE_KEY = 'nam_kitty_space_campaign_best_v3';

const STAGES = [
  {
    stage: 1,
    name: 'Vành Đai Sao Băng (1 Tàu: Nấm & Kitty)',
    targetMeteors: 12,
    bossName: 'BOSS ẢI 1: VUA ĐÁ LỬA',
    bossHp: 65,
    bossSpriteKey: 'boss1',
    bossFile: '/assets/space-defender/boss-1-fire.webp',
    bossRadius: 82,
    bgColors: ['#14082E', '#22104D', '#090318'],
  },
  {
    stage: 2,
    name: 'Tinh Vân Điện Tím (2 Tàu: +Kitty & Melody)',
    targetMeteors: 16,
    bossName: 'BOSS ẢI 2: CHÚA TỂ ĐIỆN TÍM',
    bossHp: 105,
    bossSpriteKey: 'boss2',
    bossFile: '/assets/space-defender/boss-2-lightning.webp',
    bossRadius: 92,
    bgColors: ['#1D093B', '#32105E', '#0D0420'],
  },
  {
    stage: 3,
    name: 'Quyết Chiến (3 Tàu: +Nấm, Kitty & Mũ Nấm)',
    targetMeteors: 20,
    bossName: 'ĐẠI BOSS CUỐI: ĐẾ VƯƠNG VƯƠNG MIỆN VÀNG',
    bossHp: 155,
    bossSpriteKey: 'boss3',
    bossFile: '/assets/space-defender/boss-3-king.webp',
    bossRadius: 106,
    bgColors: ['#26082E', '#3D0E4A', '#11031C'],
  },
];

const QUESTION_BANK: QuizQuestion[] = [
  { subject: '🧮 Toán Học', visual: '🍎🍎 + 🍎 = ?', question: '2 quả táo thêm 1 quả táo là mấy quả táo?', options: ['3 quả táo', '2 quả táo', '5 quả táo'], correct: 0 },
  { subject: '🧮 Toán Học', visual: '⭐⭐ + ⭐⭐ = ?', question: '2 ngôi sao cộng 2 ngôi sao bằng mấy ngôi sao?', options: ['4 ngôi sao', '3 ngôi sao', '5 ngôi sao'], correct: 0 },
  { subject: '🧮 Toán Học', visual: '🚀🚀🚀🚀🚀', question: 'Đếm xem trên bảng có tất cả mấy chiếc tên lửa?', options: ['5 chiếc', '4 chiếc', '6 chiếc'], correct: 0 },
  { subject: '🧮 Toán Học', visual: '🍓🍓🍓 - 🍓 = ?', question: 'Có 3 quả dâu tây, Nấm ăn 1 quả thì còn mấy quả?', options: ['2 quả dâu', '1 quả dâu', '3 quả dâu'], correct: 0 },
  { subject: '🧮 Toán Học', visual: '🐘 Voi vs 🐁 Chuột', question: 'Con Voi và con Chuột, con nào to lớn hơn?', options: ['🐘 Con Voi', '🐁 Con Chuột', 'Bằng nhau'], correct: 0 },
  { subject: '🧮 Toán Học', visual: '🔺 Hình có 3 cạnh', question: 'Hình nào dưới đây có 3 cạnh và 3 góc?', options: ['🔺 Hình tam giác', '⚪ Hình tròn', '🟦 Hình vuông'], correct: 0 },
  { subject: '🧮 Toán Học', visual: '🖐️ Một bàn tay', question: 'Một bàn tay của Nấm có mấy ngón tay?', options: ['5 ngón tay', '4 ngón tay', '6 ngón tay'], correct: 0 },
  { subject: '🧮 Toán Học', visual: '1, 2, 3, [ ? ], 5', question: 'Số nào đứng liền sau số 3 và đứng trước số 5?', options: ['Số 4', 'Số 2', 'Số 6'], correct: 0 },
  { subject: '📖 Tiếng Việt', visual: '🐱 Meo meo!', question: 'Con gì kêu "Meo meo", rất thích bắt chuột?', options: ['🐱 Con Mèo', '🐶 Con Chó', '🐷 Con Lợn'], correct: 0 },
  { subject: '📖 Tiếng Việt', visual: '🐟 C - O - N   C - Á', question: 'Từ "CON CÁ" bắt đầu bằng chữ cái nào?', options: ['Chữ C', 'Chữ B', 'Chữ M'], correct: 0 },
  { subject: '📖 Tiếng Việt', visual: '🐓 Ò... ó... o...', question: 'Con vật nào gáy "Ò ó o" gọi mặt trời dậy mỗi sáng?', options: ['🐓 Gà Trống', '🦆 Con Vịt', '🐦 Chim Sẻ'], correct: 0 },
  { subject: '📖 Tiếng Việt', visual: '🐝 Chăm chỉ hút mật', question: 'Con gì chăm chỉ bay đi tìm hoa làm mật ngọt?', options: ['🐝 Con Ong', '🐢 Con Rùa', '🦀 Con Cua'], correct: 0 },
  { subject: '🔤 Tiếng Anh', visual: '🍎 APPLE', question: 'Trong Tiếng Anh, quả "APPLE" là quả gì?', options: ['🍎 Quả Táo', '🍌 Quả Chuối', '🍊 Quả Cam'], correct: 0 },
  { subject: '🔤 Tiếng Anh', visual: '⭐ STAR', question: 'Trong Tiếng Anh, từ "STAR" có nghĩa là gì?', options: ['⭐ Ngôi Sao', '🌙 Mặt Trăng', '☁️ Đám Mây'], correct: 0 },
  { subject: '🔤 Tiếng Anh', visual: '🔴 RED', question: 'Màu "RED" trên chiếc áo của Nấm là màu gì?', options: ['🔴 Màu Đỏ', '🔵 Màu Xanh', '🟡 Màu Vàng'], correct: 0 },
  { subject: '🔤 Tiếng Anh', visual: '🐱 CAT', question: 'Bạn mèo Hello Kitty trong Tiếng Anh gọi là gì?', options: ['🐱 Cat', '🐶 Dog', '🦆 Duck'], correct: 0 },
  { subject: '🚦 Kỹ Năng Sống', visual: '🛑 ĐÈN ĐỎ GIAO THÔNG', question: 'Khi đi đường gặp Đèn Giao Thông màu ĐỎ, bé phải làm gì?', options: ['🛑 Dừng lại ngay', '🏃 Chạy thật nhanh', '💃 Nhảy múa'], correct: 0 },
  { subject: '🚦 Kỹ Năng Sống', visual: '🧼🤲 Trước khi ăn', question: 'Trước khi ăn cơm, Nấm cần làm gì để bụng luôn khỏe mạnh?', options: ['🧼 Rửa tay sạch', '🎮 Chơi điện tử', '👟 Đi giày vào'], correct: 0 },
  { subject: '🚦 Kỹ Năng Sống', visual: '🎁 Khi được tặng quà', question: 'Khi ông bà hoặc bố mẹ tặng quà, bé ngoan sẽ nói lời gì?', options: ['🙏 Con cảm ơn ạ!', '😠 Không thích đâu', '😶 Im lặng bỏ đi'], correct: 0 },
  { subject: '🎨 Âm Nhạc & Mỹ Thuật', visual: '🔴 Đỏ + 🟡 Vàng = ?', question: 'Khi pha màu Đỏ với màu Vàng, chúng mình được màu gì?', options: ['🟠 Màu Cam', '🟣 Màu Tím', '⚫ Màu Đen'], correct: 0 },
  { subject: '🎨 Âm Nhạc & Mỹ Thuật', visual: '🇻🇳 Lá Cờ Tổ Quốc', question: 'Lá cờ Việt Nam có nền màu Đỏ và ngôi sao ở giữa màu gì?', options: ['⭐ Màu Vàng', '🔵 Màu Xanh', '⚪ Màu Trắng'], correct: 0 },
  { subject: '🌿 Tự Nhiên & Vũ Trụ', visual: '🌍 Hành tinh xanh', question: 'Hành tinh thân yêu nơi chúng mình đang sống tên là gì?', options: ['🌍 Trái Đất', '🔥 Sao Hỏa', '🪐 Sao Thổ'], correct: 0 },
  { subject: '🌿 Tự Nhiên & Vũ Trụ', visual: '☀️ Ban ngày tỏa nắng', question: 'Ông gì mọc vào buổi sáng tỏa nắng ấm áp cho muôn loài?', options: ['☀️ Ông Mặt Trời', '🌙 Ông Mặt Trăng', '🌧️ Đám Mây Mưa'], correct: 0 },
];

const SPRITE_PATHS: Record<string, string> = {
  shipMain: '/assets/space-defender/ship-kitty-nam.webp',
  shipMelody: '/assets/space-defender/ship-kitty-melody.webp',
  shipTrio: '/assets/space-defender/ship-trio-nam-kitty.webp',
  meteorSm: '/assets/space-defender/meteor-crater-1.webp',
  meteorMd: '/assets/space-defender/meteor-angry-sm.webp',
  meteorLg: '/assets/space-defender/meteor-angry-purple.webp',
  boss1: '/assets/space-defender/boss-1-fire.webp',
  boss2: '/assets/space-defender/boss-2-lightning.webp',
  boss3: '/assets/space-defender/boss-3-king.webp',
  earth: '/assets/space-defender/planet-earth-3d.webp',
  drone: '/assets/space-defender/drone-satellite-3d.webp',
  bulletLv1: '/assets/space-defender/bullet-star-lv1.webp',
  bulletLv2: '/assets/space-defender/bullet-star-lv2.webp',
  bulletBlue: '/assets/space-defender/bullet-star-blue.webp',
  fxExplosion: '/assets/space-defender/fx-star-explosion.webp',
  fxBlackHole: '/assets/space-defender/fx-black-hole.webp',
  portalGate: '/assets/space-defender/portal-gate-3d.webp',
  victorySanrioFriends: '/assets/space-defender/victory-sanrio-friends.webp',
  charKitty: '/assets/space-defender/char-kitty-cheer.webp',
  charNam: '/assets/space-defender/char-nam-cheer.webp',
  itemStar: '/assets/space-defender/item-star-3d.webp',
  itemShield: '/assets/space-defender/item-shield-3d.webp',
  itemMagnet: '/assets/space-defender/item-magnet-3d.webp',
  itemClock: '/assets/space-defender/item-clock-3d.webp',
  itemMedkit: '/assets/space-defender/item-medkit-3d.webp',
  itemHeart: '/assets/space-defender/item-heart-3d.webp',
  itemBolt: '/assets/space-defender/item-bolt-3d.webp',
  itemUpgrade: '/assets/space-defender/item-upgrade-3d.webp',
  itemRocket: '/assets/space-defender/item-rocket-3d.webp',
};

export const EarthDefenderSpaceGame: React.FC<EarthDefenderSpaceGameProps> = ({
  soundEnabled = true,
  onBack,
  onEarnStars,
  onReaction,
  onEarnReward,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const spritesRef = useRef<Record<string, HTMLImageElement>>({});
  const usedQuizRef = useRef<number[]>([]);
  const lastTapRef = useRef<number>(0);

  const [status, setStatus] = useState<GameStatus>('menu');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    try {
      return Number(localStorage.getItem(BEST_SCORE_KEY) || '0');
    } catch {
      return 0;
    }
  });
  const [stageIdx, setStageIdx] = useState(0);
  const [stageKills, setStageKills] = useState(0);
  const [bossHpPct, setBossHpPct] = useState<number | null>(null);
  const [fleetCount, setFleetCount] = useState(1);
  const [shipHp, setShipHp] = useState(5);
  const [earthHp, setEarthHp] = useState(100);
  const [novaEnergy, setNovaEnergy] = useState(50);
  const [soundOn, setSoundOn] = useState(soundEnabled);

  useEffect(() => {
    setSoundOn(soundEnabled);
  }, [soundEnabled]);

  const [activeQuiz, setActiveQuiz] = useState<ActiveQuiz | null>(null);
  const [quizReason, setQuizReason] = useState<'boss_intro' | 'boss_half'>('boss_intro');
  const [quizSelectedIdx, setQuizSelectedIdx] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<string>('');
  const [quizStats, setQuizStats] = useState({ correct: 0, total: 0 });

  useEffect(() => {
    const loaded: Record<string, HTMLImageElement> = {};
    Object.entries(SPRITE_PATHS).forEach(([key, src]) => {
      const img = new Image();
      img.src = src;
      loaded[key] = img;
    });
    spritesRef.current = loaded;
  }, []);

  const getAudio = useCallback(() => {
    if (!soundOn) return null;
    if (!audioCtxRef.current) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AC) audioCtxRef.current = new AC();
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, [soundOn]);

  const speakVi = useCallback(
    (text: string) => {
      if (!soundOn || !text) return;
      const cleaned = text.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '').trim();
      if (!cleaned) return;
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodeURIComponent(cleaned)}`;
      const audio = new Audio(url);
      audio.play().catch(() => {
        if ('speechSynthesis' in window) {
          const u = new SpeechSynthesisUtterance(cleaned);
          u.lang = 'vi-VN';
          window.speechSynthesis.speak(u);
        }
      });
    },
    [soundOn]
  );

  const playLaserSfx = useCallback(
    (fleet: number) => {
      const ctx = getAudio();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = fleet >= 3 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(880 + fleet * 95, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.08);
      gain.gain.setValueAtTime(0.065, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    },
    [getAudio]
  );

  const playPopSfx = useCallback(
    (radius: number) => {
      const ctx = getAudio();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      const baseFreq = Math.max(70, 220 - radius * 1.2);
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.24);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.24);
    },
    [getAudio]
  );

  const playMegaBoomSfx = useCallback(() => {
    const ctx = getAudio();
    if (!ctx) return;
    const now = ctx.currentTime;
    const sub = ctx.createOscillator();
    const subG = ctx.createGain();
    sub.type = 'sawtooth';
    sub.frequency.setValueAtTime(140, now);
    sub.frequency.exponentialRampToValueAtTime(24, now + 0.75);
    subG.gain.setValueAtTime(0.32, now);
    subG.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
    sub.connect(subG);
    subG.connect(ctx.destination);
    sub.start(now);
    sub.stop(now + 0.76);

    [261.63, 329.63, 392.0, 523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + 0.12 + idx * 0.06);
      gain.gain.setValueAtTime(0.14, now + 0.12 + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12 + idx * 0.06 + 0.48);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + 0.12 + idx * 0.06);
      osc.stop(now + 0.12 + idx * 0.06 + 0.5);
    });
  }, [getAudio]);

  const playWarpWhooshSfx = useCallback(() => {
    const ctx = getAudio();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(1280, now + 0.55);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.58);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.6);
  }, [getAudio]);

  const playPickupSfx = useCallback(() => {
    const ctx = getAudio();
    if (!ctx) return;
    const now = ctx.currentTime;
    [587.33, 783.99, 1046.5, 1318.5].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.042);
      gain.gain.setValueAtTime(0.11, now + idx * 0.042);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.042 + 0.16);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.042);
      osc.stop(now + idx * 0.042 + 0.16);
    });
  }, [getAudio]);

  const playNovaSfx = useCallback(() => {
    const ctx = getAudio();
    if (!ctx) return;
    const now = ctx.currentTime;
    [261.6, 392.0, 523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.048);
      gain.gain.setValueAtTime(0.14, now + idx * 0.048);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.048 + 0.42);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.048);
      osc.stop(now + idx * 0.048 + 0.42);
    });
  }, [getAudio]);

  const stateRef = useRef({
    status: 'menu' as GameStatus,
    width: 960,
    height: 580,
    shipX: 205,
    shipY: 290,
    targetX: 205,
    targetY: 290,
    shipVy: 0,
    shipScale: 1.0,
    shipHp: 5,
    maxShipHp: 5,
    earthHp: 100,
    score: 0,
    stageIndex: 0,
    stageKills: 0,
    boss: null as BossState | null,
    portalScene: null as PortalSceneState | null,
    victoryCelebrationTimer: 0,
    fleetCount: 1,
    blasterLevel: 1,
    rapidTimer: 0,
    magnetTimer: 0,
    slowMoTimer: 0,
    invincibleTimer: 0,
    correctQuizCount: 0,
    totalQuizAsked: 0,
    novaEnergy: 50,
    novaOrbSpawned: false,
    novaFlash: 0,
    shake: 0,
    frame: 0,
    fireCooldown: 0,
    rocketCooldown: 45,
    spawnCooldown: 30,
    keys: {} as Record<string, boolean>,
    stars: [] as StarBg[],
    bullets: [] as Bullet[],
    bossProjectiles: [] as BossProjectile[],
    meteors: [] as Meteor[],
    pickups: [] as PickupItem[],
    explosions: [] as Explosion3D[],
    shockwaves: [] as ShockwaveRing[],
    particles: [] as Particle[],
    popups: [] as FloatingPopup[],
  });

  const syncHud = useCallback(() => {
    const s = stateRef.current;
    setScore(s.score);
    setStageIdx(s.stageIndex);
    setStageKills(s.stageKills);
    setFleetCount(s.fleetCount);
    setShipHp(s.shipHp);
    setEarthHp(Math.max(0, Math.round(s.earthHp)));
    setNovaEnergy(Math.min(100, Math.floor(s.novaEnergy)));
    setBossHpPct(s.boss ? Math.max(0, Math.round((s.boss.hp / s.boss.maxHp) * 100)) : null);
    setQuizStats({ correct: s.correctQuizCount, total: s.totalQuizAsked });

    if (s.score > bestScore) {
      setBestScore(s.score);
      try {
        localStorage.setItem(BEST_SCORE_KEY, String(s.score));
      } catch {
        // ignore
      }
    }
  }, [bestScore]);

  const addBurst = useCallback(
    (x: number, y: number, colors: string[], count = 18, speedScale = 1, show3dExplosion = false) => {
      const s = stateRef.current;
      if (show3dExplosion) {
        s.explosions.push({ x, y, scale: 0.35, maxScale: 1.25 * speedScale, alpha: 1 });
      }
      for (let i = 0; i < count; i++) {
        const ang = Math.random() * Math.PI * 2;
        const spd = (1.2 + Math.random() * 5.0) * speedScale;
        s.particles.push({
          x,
          y,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd,
          r: 2.2 + Math.random() * 4.2,
          color: colors[i % colors.length],
          alpha: 1,
          decay: 0.02 + Math.random() * 0.022,
        });
      }
    },
    []
  );

  const openBossQuiz = useCallback(
    (reason: 'boss_intro' | 'boss_half') => {
      const s = stateRef.current;
      s.status = 'quiz';
      s.totalQuizAsked++;
      setStatus('quiz');
      setQuizReason(reason);
      setQuizSelectedIdx(null);

      if (usedQuizRef.current.length >= QUESTION_BANK.length) {
        usedQuizRef.current = [];
      }
      const avail = QUESTION_BANK.map((_, i) => i).filter((i) => !usedQuizRef.current.includes(i));
      const pickIdx = avail[Math.floor(Math.random() * avail.length)];
      usedQuizRef.current.push(pickIdx);
      const raw = QUESTION_BANK[pickIdx];
      const shuffledOptions = raw.options.map((text, idx) => ({
        text,
        isCorrect: idx === raw.correct,
      }));
      for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
      }

      const stg = STAGES[s.stageIndex] || STAGES[0];
      setQuizFeedback(
        reason === 'boss_intro'
          ? `⚠️ ${stg.bossName} xuất hiện! Trả lời đúng để cường hóa Siêu Vũ Khí cho cả đội tàu nhé!`
          : `🔥 Boss đang suy yếu! Trả lời đúng để phóng mưa Tên Lửa Tự Dẫn Đường kết liễu Boss!`
      );
      setActiveQuiz({ ...raw, shuffledOptions });
      speakVi(raw.question);
    },
    [speakVi]
  );

  const handleSelectQuizOption = (opt: { text: string; isCorrect: boolean }, idx: number) => {
    if (quizSelectedIdx !== null || !activeQuiz) return;
    setQuizSelectedIdx(idx);
    const s = stateRef.current;

    if (opt.isCorrect) {
      playPickupSfx();
      s.correctQuizCount++;
      s.blasterLevel = 3;
      s.rapidTimer = 420;
      s.novaEnergy = Math.min(100, s.novaEnergy + 45);
      s.shipHp = Math.min(s.maxShipHp, s.shipHp + 1);
      s.score += 120;
      for (let r = 0; r < 4; r++) {
        s.bullets.push({
          x: s.shipX + 35,
          y: s.shipY + (r - 1.5) * 28,
          vx: 11.5,
          vy: (r - 1.5) * 1.2,
          dmg: 3.5,
          spriteKey: 'itemRocket',
          scale: 0.78,
          homing: true,
        });
      }
      setQuizFeedback(
        `🎉 CHÍNH XÁC! Toàn đội tàu đã kích hoạt Siêu Đạn Sao Xanh + Phóng Tên Lửa Tự Dẫn!`
      );

      setTimeout(() => {
        s.invincibleTimer = 150;
        s.status = 'playing';
        setStatus('playing');
        setActiveQuiz(null);
        s.popups.push({
          x: s.shipX + 70,
          y: s.shipY - 50,
          text: `🚀 CƯỜNG HÓA ĐỘI TÀU: ĐẠN SAO XANH + TÊN LỬA!`,
          color: '#4ADE80',
          vy: -1.3,
          alpha: 1,
          scale: 1.35,
        });
        syncHud();
      }, 950);
    } else {
      playPopSfx(40);
      const rightText = activeQuiz.shuffledOptions.find((o) => o.isCorrect)?.text || '';
      setQuizFeedback(
        `💡 Đáp án đúng là: "${rightText}". Cố lên nhé, Nấm vẫn được tặng Khiên bảo vệ!`
      );
      setTimeout(() => {
        s.invincibleTimer = 140;
        s.status = 'playing';
        setStatus('playing');
        setActiveQuiz(null);
        syncHud();
      }, 1350);
    }
  };

  const startBossDyingSequence = useCallback(() => {
    const s = stateRef.current;
    if (!s.boss || s.boss.dying) return;
    s.boss.hp = 0;
    s.boss.dying = true;
    s.boss.dyingTimer = s.stageIndex >= STAGES.length - 1 ? 115 : 75;
    s.bossProjectiles = [];
    s.meteors = [];
    s.invincibleTimer = 240;
    playPopSfx(90);
    s.popups.push({
      x: s.boss.x,
      y: s.boss.y - s.boss.radius - 20,
      text: '💥 SIÊU BOSS PHÁT NỔ BÙM!!',
      color: '#FEF08A',
      vy: -0.9,
      alpha: 1,
      scale: 1.45,
    });
    syncHud();
  }, [playPopSfx, syncHud]);

  const triggerSuperNova = useCallback(() => {
    const s = stateRef.current;
    if (s.status !== 'playing' || s.novaEnergy < 100) return;
    s.novaEnergy = 0;
    s.novaOrbSpawned = false;
    s.pickups = s.pickups.filter((p) => p.kind !== 'nova_rainbow');
    s.novaFlash = 1.0;
    s.shake = 18;
    playNovaSfx();

    let bonus = 0;
    const stg = STAGES[s.stageIndex] || STAGES[0];
    s.meteors.forEach((m) => {
      bonus += 25;
      if (!s.boss && s.stageKills < stg.targetMeteors) {
        s.stageKills++;
      }
      addBurst(m.x, m.y, ['#F472B6', '#FACC15', '#38BDF8', '#FFFFFF'], 18, 1.25, true);
    });
    s.meteors = [];
    s.bossProjectiles = [];

    if (s.boss && !s.boss.dying) {
      s.boss.hp = Math.max(0, s.boss.hp - 32);
      s.boss.hitFlash = 10;
      bonus += 80;
      addBurst(s.boss.x, s.boss.y, ['#FDE047', '#EC4899', '#38BDF8'], 32, 1.5, true);
      if (s.boss.hp <= 0) {
        startBossDyingSequence();
      }
    }

    s.score += bonus;
    s.popups.push({
      x: s.width * 0.5,
      y: s.height * 0.4,
      text: `🌈 SIÊU BÃO SAO KITTY & NẤM! +${bonus}`,
      color: '#FEF08A',
      vy: -1.4,
      alpha: 1,
      scale: 1.4,
    });
    syncHud();
  }, [addBurst, playNovaSfx, startBossDyingSequence, syncHud]);

  const startNewGame = useCallback(() => {
    getAudio();
    const s = stateRef.current;
    s.status = 'playing';
    s.shipX = 205;
    s.shipY = s.height * 0.5;
    s.targetX = 205;
    s.targetY = s.height * 0.5;
    s.shipVy = 0;
    s.shipScale = 1.0;
    s.shipHp = 5;
    s.earthHp = 100;
    s.score = 0;
    s.stageIndex = 0;
    s.stageKills = 0;
    s.boss = null;
    s.portalScene = null;
    s.victoryCelebrationTimer = 0;
    s.fleetCount = 1;
    s.blasterLevel = 1;
    s.rapidTimer = 0;
    s.magnetTimer = 0;
    s.slowMoTimer = 0;
    s.invincibleTimer = 90;
    s.correctQuizCount = 0;
    s.totalQuizAsked = 0;
    s.novaEnergy = 50;
    s.novaOrbSpawned = false;
    s.novaFlash = 0;
    s.shake = 0;
    s.fireCooldown = 0;
    s.rocketCooldown = 45;
    s.spawnCooldown = 25;
    s.bullets = [];
    s.bossProjectiles = [];
    s.meteors = [];
    s.pickups = [];
    s.explosions = [];
    s.shockwaves = [];
    s.particles = [];
    s.popups = [];

    setActiveQuiz(null);
    setStatus('playing');
    syncHud();
  }, [getAudio, syncHud]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const initStars = (w: number, h: number) => {
      const stars: StarBg[] = [];
      for (let i = 0; i < 95; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.8 + Math.random() * 2.2,
          speed: 0.45 + Math.random() * 2.3,
          alpha: 0.35 + Math.random() * 0.65,
          twinkle: Math.random() * Math.PI * 2,
          color: ['#FFFFFF', '#FDE047', '#F9A8D4', '#7DD3FC'][i % 4],
        });
      }
      stateRef.current.stars = stars;
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(640, rect.width);
      const h = Math.max(440, rect.height);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stateRef.current.width = w;
      stateRef.current.height = h;
      if (stateRef.current.stars.length === 0) initStars(w, h);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const onKeyDown = (e: KeyboardEvent) => {
      stateRef.current.keys[e.code] = true;
      if (e.code === 'Space' && stateRef.current.status === 'playing') {
        e.preventDefault();
        triggerSuperNova();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      stateRef.current.keys[e.code] = false;
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    const spawnRandomPickup = (x: number, y: number) => {
      const types: PickupKind[] = ['star', 'upgrade', 'shield', 'medkit', 'magnet', 'bolt', 'clock', 'rocket'];
      const weights = [0.3, 0.16, 0.12, 0.12, 0.08, 0.08, 0.07, 0.07];
      let r = Math.random();
      let picked: PickupKind = 'star';
      for (let i = 0; i < types.length; i++) {
        if (r < weights[i]) {
          picked = types[i];
          break;
        }
        r -= weights[i];
      }
      stateRef.current.pickups.push({
        x,
        y,
        vx: -1.35,
        vy: (Math.random() - 0.5) * 0.9,
        kind: picked,
        bobPhase: Math.random() * Math.PI * 2,
      });
    };

    const finalizeBossExplosion = () => {
      const s = stateRef.current;
      const bx = s.boss ? s.boss.x : s.width - 165;
      const by = s.boss ? s.boss.y : s.height * 0.5;
      s.boss = null;

      playMegaBoomSfx();
      s.novaFlash = 1.0;
      s.shake = 28;
      s.explosions.push({ x: bx, y: by, scale: 0.5, maxScale: 3.1, alpha: 1 });
      for (let k = 0; k < 5; k++) {
        const ang = (k * Math.PI * 2) / 5;
        s.explosions.push({
          x: bx + Math.cos(ang) * 65,
          y: by + Math.sin(ang) * 65,
          scale: 0.3,
          maxScale: 1.7,
          alpha: 1,
        });
      }
      s.shockwaves.push({ x: bx, y: by, r: 12, maxR: 420, color: '#FEF08A', alpha: 1, width: 10 });
      s.shockwaves.push({ x: bx, y: by, r: 6, maxR: 290, color: '#EC4899', alpha: 1, width: 7 });
      addBurst(bx, by, ['#FDE047', '#EC4899', '#38BDF8', '#4ADE80', '#FFFFFF'], 95, 2.2, false);

      const stageBonus = (s.stageIndex + 1) * 350;
      s.score += stageBonus;
      syncHud();

      if (s.stageIndex >= STAGES.length - 1) {
        s.victoryCelebrationTimer = 110;
        for (let i = 0; i < 14; i++) {
          s.pickups.push({
            x: bx + (Math.random() - 0.5) * 160,
            y: by + (Math.random() - 0.5) * 160,
            vx: -2.5 - Math.random() * 3.5,
            vy: (Math.random() - 0.5) * 4.5,
            kind: 'star',
            bobPhase: Math.random() * Math.PI * 2,
          });
        }
        s.popups.push({
          x: s.width * 0.5,
          y: s.height * 0.35,
          text: `🏆 ĐẠI BOSS ĐÃ NỔ TUNG! CHIẾN THẮNG +${stageBonus}!`,
          color: '#FEF08A',
          vy: -1.0,
          alpha: 1,
          scale: 1.55,
        });
        return;
      }

      s.portalScene = {
        phase: 'zoom_in',
        timer: 0,
        x: bx,
        y: by,
        portalScale: 0.12,
        warpFlash: 0,
      };
      s.popups.push({
        x: bx,
        y: by - 95,
        text: '🌀 CỔNG KHÔNG GIAN MỞ RA! BAY VÀO CỔNG!',
        color: '#67E8F9',
        vy: -0.8,
        alpha: 1,
        scale: 1.35,
      });
    };

    let animId = 0;
    const loop = () => {
      const s = stateRef.current;
      const W = s.width;
      const H = s.height;
      const sp = spritesRef.current;
      s.frame++;

      if (s.status === 'playing') {
        if (s.portalScene) {
          const ps = s.portalScene;
          ps.timer++;
          if (ps.phase === 'zoom_in') {
            ps.portalScale = Math.min(1.35, ps.portalScale + (1.35 - ps.portalScale) * 0.14 + 0.02);
            if (ps.timer >= 36) {
              ps.phase = 'ship_enter';
              ps.timer = 0;
              playWarpWhooshSfx();
            }
          } else if (ps.phase === 'ship_enter') {
            s.shipX += (ps.x - s.shipX) * 0.12;
            s.shipY += (ps.y - s.shipY) * 0.12;
            s.shipVy = (ps.y - s.shipY) * 0.08;
            const dist = Math.hypot(ps.x - s.shipX, ps.y - s.shipY);
            s.shipScale = Math.max(0.08, Math.min(1.0, dist / 240));
            s.particles.push({
              x: s.shipX - 30 * s.shipScale,
              y: s.shipY + (Math.random() - 0.5) * 16,
              vx: -5 - Math.random() * 3,
              vy: (Math.random() - 0.5) * 1.5,
              r: 4,
              color: '#38BDF8',
              alpha: 1,
              decay: 0.05,
            });
            if (dist < 26 || ps.timer >= 54) {
              ps.phase = 'warp_speed';
              ps.timer = 0;
              ps.warpFlash = 1.0;
              s.stageIndex++;
              s.fleetCount = Math.min(3, s.stageIndex + 1);
              s.stageKills = 0;
              s.shipHp = Math.min(s.maxShipHp, s.shipHp + 1);
              s.earthHp = Math.min(100, s.earthHp + 20);
              s.invincibleTimer = 120;
              syncHud();
            }
          } else if (ps.phase === 'warp_speed') {
            ps.portalScale *= 0.88;
            ps.warpFlash = Math.max(0, ps.warpFlash - 0.035);
            s.shipX = 90 + (205 - 90) * Math.min(1, ps.timer / 32);
            s.shipY = H * 0.5;
            s.targetX = 205;
            s.targetY = H * 0.5;
            s.shipScale = Math.min(1.0, 0.2 + (ps.timer / 32) * 0.8);
            if (ps.timer >= 36) {
              const nextStg = STAGES[s.stageIndex] || STAGES[0];
              s.shipScale = 1.0;
              s.portalScene = null;
              const fleetJoinText =
                s.fleetCount === 2
                  ? '🚀 HỘI NGỘ PHI THUYỀN KITTY & MELODY (x2 TÀU)!'
                  : '🚀 ĐỘI HÌNH 3 PHI THUYỀN: NẤM - KITTY - MŨ NẤM XUẤT KÍCH!';
              s.popups.push({
                x: W * 0.5,
                y: H * 0.34,
                text: `🌌 ẢI ${nextStg.stage}/3: ${nextStg.name.toUpperCase()}!`,
                color: '#FEF08A',
                vy: -1.0,
                alpha: 1,
                scale: 1.4,
              });
              s.popups.push({
                x: W * 0.5,
                y: H * 0.44,
                text: fleetJoinText,
                color: '#4ADE80',
                vy: -0.9,
                alpha: 1,
                scale: 1.3,
              });
            }
          }
        } else {
          const moveSpd = 6.8;
          if (s.keys['ArrowUp'] || s.keys['KeyW']) s.targetY = Math.max(75, s.targetY - moveSpd);
          if (s.keys['ArrowDown'] || s.keys['KeyS']) s.targetY = Math.min(H - 75, s.targetY + moveSpd);
          if (s.keys['ArrowLeft'] || s.keys['KeyA']) s.targetX = Math.max(125, s.targetX - moveSpd);
          if (s.keys['ArrowRight'] || s.keys['KeyD']) s.targetX = Math.min(W * 0.62, s.targetX + moveSpd);

          const prevY = s.shipY;
          s.shipX += (s.targetX - s.shipX) * 0.17;
          s.shipY += (s.targetY - s.shipY) * 0.17;
          s.shipVy = s.shipY - prevY;
        }

        if (s.victoryCelebrationTimer > 0) {
          s.victoryCelebrationTimer--;
          if (s.victoryCelebrationTimer % 12 === 0) {
            const fxX = W * 0.25 + Math.random() * (W * 0.55);
            const fxY = H * 0.2 + Math.random() * (H * 0.55);
            addBurst(fxX, fxY, ['#FDE047', '#EC4899', '#38BDF8', '#4ADE80', '#FFFFFF'], 28, 1.35, true);
            playPickupSfx();
          }
          if (s.victoryCelebrationTimer === 0) {
            s.status = 'victory';
            setStatus('victory');
            syncHud();
            if (onEarnStars) onEarnStars(15);
            if (onEarnReward) {
              onEarnReward(20, `Chiến thắng 3 Đại Boss Vũ Trụ (${s.score} điểm)!`);
            }
            if (onReaction) {
              onReaction('happy', 'Hoan hô! Nấm, Hello Kitty và các bạn đã bảo vệ Trái Đất thành công!');
            }
            speakVi('Hoan hô! Nấm, Hello Kitty và các bạn đã chiến thắng bảo vệ Trái Đất thành công!');
          }
        }

        if (s.rapidTimer > 0) s.rapidTimer--;
        if (s.magnetTimer > 0) s.magnetTimer--;
        if (s.slowMoTimer > 0) s.slowMoTimer--;
        if (s.invincibleTimer > 0) s.invincibleTimer--;

        if (s.novaEnergy >= 100 && !s.novaOrbSpawned && !s.portalScene && s.victoryCelebrationTimer === 0) {
          s.novaOrbSpawned = true;
          s.pickups.push({
            x: Math.min(W - 140, s.shipX + 260),
            y: Math.max(90, Math.min(H - 90, s.shipY)),
            vx: -2.2,
            vy: 0,
            kind: 'nova_rainbow',
            bobPhase: 0,
          });
          s.popups.push({
            x: s.shipX + 140,
            y: s.shipY - 50,
            text: '🌈 SAO CẦU VỒNG BÃO SAO ĐANG TỰ HÚT VÀO TÀU!',
            color: '#FEF08A',
            vy: -1.1,
            alpha: 1,
            scale: 1.15,
          });
        }

        if (!s.portalScene && s.victoryCelebrationTimer === 0 && (!s.boss || !s.boss.dying)) {
          s.fireCooldown--;
          const fireInterval = s.rapidTimer > 0 ? 6 : 11;
          if (s.fireCooldown <= 0) {
            s.fireCooldown = fireInterval;
            const noseX = s.shipX + 56;
            const y = s.shipY;
            const isMax = s.blasterLevel >= 3 || s.fleetCount >= 3;
            s.bullets.push({
              x: noseX,
              y: y - 12,
              vx: 15.5,
              vy: 0,
              dmg: isMax ? 1.5 : 1.1,
              spriteKey: isMax ? 'bulletBlue' : 'bulletLv2',
              scale: 1.0,
            });
            s.bullets.push({
              x: noseX,
              y: y + 12,
              vx: 15.5,
              vy: 0,
              dmg: isMax ? 1.5 : 1.1,
              spriteKey: isMax ? 'bulletBlue' : 'bulletLv2',
              scale: 1.0,
            });

            if (s.fleetCount >= 2) {
              s.bullets.push({
                x: s.shipX + 20,
                y: y - 74,
                vx: 15.5,
                vy: -0.35,
                dmg: 1.25,
                spriteKey: 'bulletLv2',
                scale: 0.92,
              });
            }
            if (s.fleetCount >= 3) {
              s.bullets.push({
                x: s.shipX + 20,
                y: y + 74,
                vx: 15.5,
                vy: 0.35,
                dmg: 1.35,
                spriteKey: 'bulletBlue',
                scale: 0.95,
              });
            }
            playLaserSfx(s.fleetCount);
          }

          if (s.fleetCount >= 3 || s.blasterLevel >= 3) {
            s.rocketCooldown--;
            if (s.rocketCooldown <= 0 && (s.meteors.length > 0 || s.boss)) {
              s.rocketCooldown = 48;
              s.bullets.push({
                x: s.shipX + 30,
                y: s.shipY,
                vx: 11.5,
                vy: 0,
                dmg: 3.2,
                spriteKey: 'itemRocket',
                scale: 0.72,
                homing: true,
              });
            }
          }
        }

        for (let i = s.bullets.length - 1; i >= 0; i--) {
          const b = s.bullets[i];
          if (b.homing) {
            const target = s.boss || s.meteors[0];
            if (target) {
              const dy = target.y - b.y;
              b.vy += Math.sign(dy) * 0.42;
              b.vy = Math.max(-6, Math.min(6, b.vy));
            }
          }
          b.x += b.vx;
          b.y += b.vy;
          if (b.x > W + 90 || b.y < -70 || b.y > H + 70) {
            s.bullets.splice(i, 1);
          }
        }

        const stg = STAGES[s.stageIndex] || STAGES[0];
        if (!s.boss && !s.portalScene && s.victoryCelebrationTimer === 0) {
          if (s.stageKills >= stg.targetMeteors) {
            s.meteors = [];
            s.bossProjectiles = [];
            s.boss = {
              x: W - 165,
              y: H * 0.5,
              vy: 1.8 + s.stageIndex * 0.45,
              hp: stg.bossHp,
              maxHp: stg.bossHp,
              radius: stg.bossRadius,
              spriteKey: stg.bossSpriteKey,
              fireCd: 75,
              halfQuizTriggered: false,
              hitFlash: 0,
              dying: false,
              dyingTimer: 0,
            };
            syncHud();
            openBossQuiz('boss_intro');
          } else {
            s.spawnCooldown--;
            if (s.spawnCooldown <= 0) {
              s.spawnCooldown = Math.max(26, 58 - s.stageIndex * 8) + Math.floor(Math.random() * 20);
              const roll = Math.random();
              const kind = roll > 0.72 ? 'lg' : roll > 0.35 ? 'md' : 'sm';
              const radius = kind === 'lg' ? 50 : kind === 'md' ? 40 : 32;
              const hp = kind === 'lg' ? 3 + s.stageIndex * 2 : kind === 'md' ? 2 + s.stageIndex : 1 + s.stageIndex;
              const speed = (kind === 'lg' ? 1.35 : kind === 'md' ? 1.7 : 2.0) + Math.random() * 0.9 + s.stageIndex * 0.3;
              s.meteors.push({
                x: W + radius + 30,
                y: 80 + Math.random() * (H - 160),
                vx: -speed,
                vy: (Math.random() - 0.5) * 1.1,
                radius,
                hp,
                maxHp: hp,
                kind,
                wobblePhase: Math.random() * Math.PI * 2,
                hitFlash: 0,
              });
            }
          }
        }

        const slowFactor = s.slowMoTimer > 0 ? 0.48 : 1.0;
        const shieldLineX = 95;

        if (s.boss && s.status === 'playing') {
          const boss = s.boss;
          if (boss.dying) {
            boss.dyingTimer--;
            boss.hitFlash = boss.dyingTimer % 6 < 3 ? 4 : 0;
            if (boss.dyingTimer % 8 === 0) {
              const exX = boss.x + (Math.random() - 0.5) * boss.radius * 1.6;
              const exY = boss.y + (Math.random() - 0.5) * boss.radius * 1.6;
              addBurst(exX, exY, ['#FEF08A', '#FB923C', '#F43F5E', '#EC4899'], 16, 1.3, true);
              playPopSfx(75 + Math.random() * 25);
              s.shake = 11;
            }
            if (boss.dyingTimer <= 0) {
              finalizeBossExplosion();
            }
          } else {
            boss.y += boss.vy * slowFactor;
            if (boss.y < boss.radius + 70) {
              boss.y = boss.radius + 70;
              boss.vy = Math.abs(boss.vy);
            }
            if (boss.y > H - boss.radius - 60) {
              boss.y = H - boss.radius - 60;
              boss.vy = -Math.abs(boss.vy);
            }
            if (boss.hitFlash > 0) boss.hitFlash--;

            boss.fireCd--;
            if (boss.fireCd <= 0) {
              boss.fireCd = Math.max(46, 84 - s.stageIndex * 14);
              const count = s.stageIndex === 2 ? 3 : 2;
              for (let k = 0; k < count; k++) {
                const spreadY = (k - (count - 1) / 2) * 1.9;
                s.bossProjectiles.push({
                  x: boss.x - boss.radius * 0.65,
                  y: boss.y + spreadY * 18,
                  vx: -(4.4 + s.stageIndex * 0.65),
                  vy: spreadY,
                  radius: 22,
                });
              }
            }

            for (let j = s.bullets.length - 1; j >= 0; j--) {
              const b = s.bullets[j];
              if (Math.hypot(b.x - boss.x, b.y - boss.y) <= boss.radius + 18) {
                boss.hp -= b.dmg;
                boss.hitFlash = 4;
                s.bullets.splice(j, 1);
                s.novaEnergy = Math.min(100, s.novaEnergy + 1.8);
                addBurst(b.x, b.y, ['#FEF08A', '#F472B6', '#38BDF8'], 5, 0.7, false);

                if (Math.random() < 0.08) {
                  spawnRandomPickup(boss.x - 40, boss.y + (Math.random() - 0.5) * 90);
                }

                if (!boss.halfQuizTriggered && boss.hp > 0 && boss.hp <= boss.maxHp * 0.5) {
                  boss.halfQuizTriggered = true;
                  syncHud();
                  openBossQuiz('boss_half');
                  break;
                }

                if (boss.hp <= 0) {
                  startBossDyingSequence();
                  break;
                }
                syncHud();
              }
            }
          }
        }

        for (let i = s.bossProjectiles.length - 1; i >= 0; i--) {
          const bp = s.bossProjectiles[i];
          bp.x += bp.vx * slowFactor;
          bp.y += bp.vy * slowFactor;

          let shotDown = false;
          for (let j = s.bullets.length - 1; j >= 0; j--) {
            const b = s.bullets[j];
            if (Math.hypot(b.x - bp.x, b.y - bp.y) < bp.radius + 16) {
              s.bullets.splice(j, 1);
              addBurst(bp.x, bp.y, ['#C084FC', '#38BDF8'], 8, 0.75, false);
              s.bossProjectiles.splice(i, 1);
              shotDown = true;
              break;
            }
          }
          if (shotDown) continue;

          if (Math.hypot(bp.x - s.shipX, bp.y - s.shipY) < bp.radius + 34) {
            s.bossProjectiles.splice(i, 1);
            if (s.invincibleTimer <= 0) {
              playPopSfx(45);
              s.shake = 12;
              s.shipHp = Math.max(0, s.shipHp - 1);
              s.invincibleTimer = 60;
              addBurst(s.shipX, s.shipY, ['#F43F5E', '#C084FC'], 18, 1.1, true);
              syncHud();
              if (s.shipHp <= 0) {
                s.status = 'gameover';
                setStatus('gameover');
                return;
              }
            }
            continue;
          }

          if (bp.x < -50 || bp.y < -50 || bp.y > H + 50) {
            s.bossProjectiles.splice(i, 1);
          }
        }

        for (let i = s.meteors.length - 1; i >= 0; i--) {
          const m = s.meteors[i];
          m.x += m.vx * slowFactor;
          m.y += (m.vy + Math.sin(s.frame * 0.04 + m.wobblePhase) * 0.35) * slowFactor;
          if (m.y < m.radius + 55) {
            m.y = m.radius + 55;
            m.vy = Math.abs(m.vy);
          }
          if (m.y > H - m.radius - 45) {
            m.y = H - m.radius - 45;
            m.vy = -Math.abs(m.vy);
          }
          if (m.hitFlash > 0) m.hitFlash--;

          let destroyed = false;
          for (let j = s.bullets.length - 1; j >= 0; j--) {
            const b = s.bullets[j];
            if (Math.hypot(b.x - m.x, b.y - m.y) <= m.radius + 18) {
              m.hp -= b.dmg;
              m.hitFlash = 4;
              s.bullets.splice(j, 1);

              if (m.hp <= 0) {
                destroyed = true;
                playPopSfx(m.radius);
                s.stageKills++;
                s.novaEnergy = Math.min(100, s.novaEnergy + 9);
                const pts = m.kind === 'lg' ? 35 : m.kind === 'md' ? 25 : 15;
                s.score += pts;
                addBurst(m.x, m.y, ['#FB923C', '#FACC15', '#F472B6', '#38BDF8'], 18, 1.1, true);
                s.popups.push({
                  x: m.x,
                  y: m.y - 10,
                  text: `+${pts}`,
                  color: '#FEF08A',
                  vy: -1.3,
                  alpha: 1,
                  scale: 1.05,
                });
                if (Math.random() < 0.46) spawnRandomPickup(m.x, m.y);
                s.meteors.splice(i, 1);
                syncHud();
                break;
              }
            }
          }
          if (destroyed) continue;

          if (Math.hypot(m.x - s.shipX, m.y - s.shipY) < m.radius + 36) {
            s.meteors.splice(i, 1);
            if (s.invincibleTimer <= 0) {
              playPopSfx(55);
              s.shake = 14;
              s.shipHp = Math.max(0, s.shipHp - 1);
              s.invincibleTimer = 65;
              addBurst(m.x, m.y, ['#F43F5E', '#FB923C'], 22, 1.15, true);
              syncHud();
              if (s.shipHp <= 0) {
                s.status = 'gameover';
                setStatus('gameover');
                return;
              }
            }
            continue;
          }

          if (m.x - m.radius < shieldLineX) {
            playPopSfx(55);
            s.shake = 10;
            const dmg = m.kind === 'lg' ? 15 : 10;
            s.earthHp = Math.max(0, s.earthHp - dmg);
            addBurst(shieldLineX, m.y, ['#38BDF8', '#F43F5E'], 20, 1.1, true);
            s.meteors.splice(i, 1);
            syncHud();
            if (s.earthHp <= 0) {
              s.status = 'gameover';
              setStatus('gameover');
              return;
            }
          }
        }

        for (let i = s.pickups.length - 1; i >= 0; i--) {
          const p = s.pickups[i];
          p.x += p.vx;
          p.y += p.vy + Math.sin(s.frame * 0.08 + p.bobPhase) * 0.65;

          const dx = s.shipX - p.x;
          const dy = s.shipY - p.y;
          const dist = Math.hypot(dx, dy);
          const pullRadius = p.kind === 'nova_rainbow' ? 9999 : s.magnetTimer > 0 ? 480 : 230;
          const pullSpeed = p.kind === 'nova_rainbow' ? 7.5 : 6.4;
          if (dist < pullRadius) {
            p.x += (dx / Math.max(1, dist)) * pullSpeed;
            p.y += (dy / Math.max(1, dist)) * pullSpeed;
          }

          if (dist < 64) {
            if (p.kind === 'nova_rainbow') {
              s.pickups.splice(i, 1);
              triggerSuperNova();
              continue;
            }
            playPickupSfx();
            addBurst(p.x, p.y, ['#FEF08A', '#F472B6', '#38BDF8', '#FFFFFF'], 16, 0.9, false);

            let msg = '⭐ +40 ĐIỂM SAO!';
            let col = '#FDE047';
            if (p.kind === 'upgrade') {
              s.blasterLevel = Math.min(3, s.blasterLevel + 1);
              msg = `⬆️ NÂNG CẤP PHÁO SAO LV.${s.blasterLevel}!`;
              col = '#4ADE80';
            } else if (p.kind === 'shield') {
              s.invincibleTimer = 240;
              s.earthHp = Math.min(100, s.earthHp + 15);
              msg = '🛡️ LÁ CHẮN BẤT TỬ + HỒI KHIÊN!';
              col = '#67E8F9';
            } else if (p.kind === 'medkit') {
              s.shipHp = Math.min(s.maxShipHp, s.shipHp + 1);
              msg = '🧰 HỘP CỨU THƯƠNG +1 TIM!';
              col = '#FDA4AF';
            } else if (p.kind === 'magnet') {
              s.magnetTimer = 420;
              msg = '🧲 SIÊU NAM CHÂM HÚT SAO!';
              col = '#F472B6';
            } else if (p.kind === 'bolt') {
              s.rapidTimer = 360;
              msg = '⚡ TIA SÉT BẮN SIÊU TỐC!';
              col = '#FDE047';
            } else if (p.kind === 'clock') {
              s.slowMoTimer = 360;
              msg = '⏰ ĐỒNG HỒ LÀM CHẬM THIÊN THẠCH!';
              col = '#7DD3FC';
            } else if (p.kind === 'rocket') {
              s.rapidTimer = Math.max(s.rapidTimer, 240);
              for (let r = 0; r < 3; r++) {
                s.bullets.push({
                  x: s.shipX + 35,
                  y: s.shipY + (r - 1) * 28,
                  vx: 11.5,
                  vy: (r - 1) * 1.1,
                  dmg: 3.2,
                  spriteKey: 'itemRocket',
                  scale: 0.76,
                  homing: true,
                });
              }
              msg = `🚀 PHÓNG LOẠT TÊN LỬA TỰ DẪN ĐƯỜNG!`;
              col = '#FB923C';
            } else {
              s.novaEnergy = Math.min(100, s.novaEnergy + 22);
            }

            s.score += 40;
            s.popups.push({ x: p.x, y: p.y - 16, text: msg, color: col, vy: -1.4, alpha: 1, scale: 1.18 });
            s.pickups.splice(i, 1);
            syncHud();
            continue;
          }

          if (p.x < -70) s.pickups.splice(i, 1);
        }
      }

      for (let i = s.explosions.length - 1; i >= 0; i--) {
        const ex = s.explosions[i];
        ex.scale += (ex.maxScale - ex.scale) * 0.2;
        ex.alpha -= 0.038;
        if (ex.alpha <= 0) s.explosions.splice(i, 1);
      }
      for (let i = s.shockwaves.length - 1; i >= 0; i--) {
        const sw = s.shockwaves[i];
        sw.r += (sw.maxR - sw.r) * 0.14 + 2.5;
        sw.alpha -= 0.026;
        if (sw.alpha <= 0) s.shockwaves.splice(i, 1);
      }
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const pt = s.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.alpha -= pt.decay;
        if (pt.alpha <= 0) s.particles.splice(i, 1);
      }
      for (let i = s.popups.length - 1; i >= 0; i--) {
        const pp = s.popups[i];
        pp.y += pp.vy;
        pp.alpha -= 0.017;
        if (pp.alpha <= 0) s.popups.splice(i, 1);
      }

      // =====================================================
      // RENDER 60FPS SCENE
      // =====================================================
      ctx.save();
      if (s.shake > 0) {
        ctx.translate((Math.random() - 0.5) * s.shake, (Math.random() - 0.5) * s.shake);
        s.shake *= 0.86;
        if (s.shake < 0.4) s.shake = 0;
      }

      const stgRender = STAGES[s.stageIndex] || STAGES[0];
      const bgGrad = ctx.createLinearGradient(0, 0, W, H);
      bgGrad.addColorStop(0, stgRender.bgColors[0]);
      bgGrad.addColorStop(0.5, stgRender.bgColors[1]);
      bgGrad.addColorStop(1, stgRender.bgColors[2]);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      const isWarp = s.portalScene && s.portalScene.phase === 'warp_speed';
      s.stars.forEach((st) => {
        const spdMult = isWarp ? 14 : s.status === 'playing' ? 1 : 0.25;
        st.x -= st.speed * spdMult;
        if (st.x < 0) {
          st.x = W;
          st.y = Math.random() * H;
        }
        const tw = 0.55 + 0.45 * Math.sin(s.frame * 0.05 + st.twinkle);
        ctx.globalAlpha = st.alpha * tw;
        ctx.fillStyle = st.color;
        if (isWarp) {
          ctx.fillRect(st.x, st.y, st.r * 18, st.r * 1.4);
        } else {
          ctx.beginPath();
          ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;

      if (sp.earth && sp.earth.complete && sp.earth.naturalWidth > 0) {
        ctx.save();
        const bobY = Math.sin(s.frame * 0.025) * 8;
        ctx.shadowColor = '#38BDF8';
        ctx.shadowBlur = 32;
        ctx.drawImage(sp.earth, -65, H * 0.5 - 140 + bobY, 220, 172);
        ctx.restore();
      }

      ctx.save();
      const shieldGrad = ctx.createLinearGradient(65, 0, 110, 0);
      shieldGrad.addColorStop(0, 'rgba(56, 189, 248, 0)');
      shieldGrad.addColorStop(0.6, s.earthHp > 35 ? 'rgba(56, 189, 248, 0.44)' : 'rgba(244, 63, 94, 0.58)');
      shieldGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.strokeStyle = shieldGrad;
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(-190, H * 0.5, 295, -0.95, 0.95);
      ctx.stroke();
      ctx.restore();

      if (s.portalScene && sp.portalGate?.complete) {
        const ps = s.portalScene;
        ctx.save();
        ctx.translate(ps.x, ps.y);
        ctx.scale(ps.portalScale, ps.portalScale);

        ctx.save();
        ctx.rotate(s.frame * 0.06);
        const pGlow = ctx.createRadialGradient(0, 0, 10, 0, 0, 155);
        pGlow.addColorStop(0, 'rgba(103, 232, 249, 0.9)');
        pGlow.addColorStop(0.5, 'rgba(168, 85, 247, 0.45)');
        pGlow.addColorStop(1, 'rgba(56, 189, 248, 0)');
        ctx.fillStyle = pGlow;
        ctx.beginPath();
        ctx.arc(0, 0, 155, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        ctx.drawImage(sp.portalGate, -135, -118, 270, 236);
        ctx.restore();
      }

      const ITEM_CFG: Record<PickupKind, { sprite: string; color: string; label: string }> = {
        star: { sprite: 'itemStar', color: '#FACC15', label: '⭐ +40 SAO' },
        upgrade: { sprite: 'itemUpgrade', color: '#4ADE80', label: '⬆️ LÊN PHÁO' },
        shield: { sprite: 'itemShield', color: '#38BDF8', label: '🛡️ +KHIÊN' },
        medkit: { sprite: 'itemMedkit', color: '#FB7185', label: '🧰 +1 TIM' },
        magnet: { sprite: 'itemMagnet', color: '#F472B6', label: '🧲 HÚT SAO' },
        bolt: { sprite: 'itemBolt', color: '#FDE047', label: '⚡ BẮN NHANH' },
        clock: { sprite: 'itemClock', color: '#67E8F9', label: '⏰ LÀM CHẬM' },
        rocket: { sprite: 'itemRocket', color: '#FB923C', label: '🚀 TÊN LỬA' },
        nova_rainbow: { sprite: 'itemStar', color: '#EC4899', label: '🌈 SIÊU BÃO SAO' },
      };

      s.pickups.forEach((p) => {
        const cfg = ITEM_CFG[p.kind];
        const isNova = p.kind === 'nova_rainbow';
        const pulse = (isNova ? 1.32 : 1.0) + Math.sin(s.frame * 0.15 + p.bobPhase) * 0.12;

        ctx.save();
        ctx.translate(p.x, p.y);

        ctx.save();
        ctx.rotate(s.frame * (isNova ? 0.07 : 0.035));
        const rayGrad = ctx.createRadialGradient(0, 0, 4, 0, 0, 44 * pulse);
        rayGrad.addColorStop(0, 'rgba(255, 255, 255, 0.96)');
        rayGrad.addColorStop(0.5, cfg.color + '88');
        rayGrad.addColorStop(1, 'rgba(250, 204, 21, 0)');
        ctx.fillStyle = rayGrad;
        ctx.beginPath();
        const rays = 8;
        for (let r = 0; r < rays * 2; r++) {
          const rad = r % 2 === 0 ? 44 * pulse : 18 * pulse;
          const ang = (r * Math.PI) / rays;
          if (r === 0) ctx.moveTo(Math.cos(ang) * rad, Math.sin(ang) * rad);
          else ctx.lineTo(Math.cos(ang) * rad, Math.sin(ang) * rad);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        ctx.beginPath();
        ctx.arc(0, 0, 29 * pulse, 0, Math.PI * 2);
        ctx.strokeStyle = isNova ? '#FEF08A' : cfg.color;
        ctx.lineWidth = isNova ? 3.5 : 2.5;
        ctx.setLineDash([6, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        const itemImg = sp[cfg.sprite];
        ctx.save();
        ctx.scale(pulse, pulse);
        if (itemImg && itemImg.complete && itemImg.naturalWidth > 0) {
          ctx.drawImage(itemImg, -25, -25, 50, 50);
        }
        ctx.restore();

        ctx.font = '900 11px "Nunito", sans-serif';
        ctx.textAlign = 'center';
        const pillW = isNova ? 98 : 76;
        const pillH = 18;
        ctx.fillStyle = 'rgba(15, 7, 38, 0.88)';
        ctx.strokeStyle = cfg.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(-pillW / 2, 24 * pulse, pillW, pillH, 8);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(cfg.label, 0, 24 * pulse + 13);

        ctx.restore();
      });

      s.bullets.forEach((b) => {
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(Math.atan2(b.vy, b.vx));
        const bImg = sp[b.spriteKey] || sp.bulletLv2;
        if (bImg && bImg.complete && bImg.naturalWidth > 0) {
          const w = (b.homing ? 56 : 68) * b.scale;
          const h = (b.homing ? 46 : 36) * b.scale;
          ctx.drawImage(bImg, -w * 0.55, -h * 0.5, w, h);
        }
        ctx.restore();
      });

      const tilt = Math.max(-0.22, Math.min(0.22, s.shipVy * 0.024));
      const sc = s.shipScale;

      if (s.fleetCount === 2) {
        if (sp.shipMelody?.complete && sp.shipMelody.naturalWidth > 0) {
          ctx.save();
          ctx.translate(s.shipX - 14 * sc, s.shipY - 82 * sc + Math.sin(s.frame * 0.08) * 4 * sc);
          ctx.scale(sc, sc);
          ctx.rotate(tilt);
          ctx.drawImage(sp.shipMelody, -64, -54, 128, 108);
          ctx.restore();
        }
      } else if (s.fleetCount >= 3) {
        if (sp.shipMain?.complete && sp.shipMain.naturalWidth > 0) {
          ctx.save();
          ctx.translate(s.shipX - 24 * sc, s.shipY - 84 * sc + Math.sin(s.frame * 0.08) * 4 * sc);
          ctx.scale(sc, sc);
          ctx.rotate(tilt);
          ctx.drawImage(sp.shipMain, -63, -44, 126, 88);
          ctx.restore();
        }
        if (sp.shipMelody?.complete && sp.shipMelody.naturalWidth > 0) {
          ctx.save();
          ctx.translate(s.shipX - 24 * sc, s.shipY + 84 * sc + Math.cos(s.frame * 0.08) * 4 * sc);
          ctx.scale(sc, sc);
          ctx.rotate(tilt);
          ctx.drawImage(sp.shipMelody, -60, -50, 120, 100);
          ctx.restore();
        }
      }

      ctx.save();
      ctx.translate(s.shipX, s.shipY);
      ctx.scale(sc, sc);
      ctx.rotate(tilt);
      if (s.invincibleTimer > 0 && !s.portalScene) {
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.arc(0, 0, 74 + Math.sin(s.frame * 0.2) * 4, 0, Math.PI * 2);
        ctx.stroke();
      }
      const leadShipImg = s.fleetCount >= 3 ? (sp.shipTrio || sp.shipMain) : sp.shipMain;
      if (leadShipImg && leadShipImg.complete && leadShipImg.naturalWidth > 0) {
        const lw = s.fleetCount >= 3 ? 166 : 152;
        const lh = s.fleetCount >= 3 ? 116 : 106;
        ctx.drawImage(leadShipImg, -lw * 0.5, -lh * 0.5, lw, lh);
      }
      ctx.restore();

      s.meteors.forEach((m) => {
        ctx.save();
        ctx.translate(m.x, m.y);
        ctx.rotate(Math.sin(s.frame * 0.06 + m.wobblePhase) * 0.1);
        const mImg = m.kind === 'lg' ? sp.meteorLg : m.kind === 'md' ? sp.meteorMd : sp.meteorSm;
        const w = m.radius * 2.15;
        const h = m.radius * 2.0;
        if (m.hitFlash > 0) ctx.filter = 'brightness(1.85)';
        if (mImg && mImg.complete && mImg.naturalWidth > 0) {
          ctx.drawImage(mImg, -w * 0.5, -h * 0.5, w, h);
        }
        ctx.filter = 'none';
        ctx.restore();
      });

      if (s.boss) {
        const boss = s.boss;
        const jitterX = boss.dying ? (Math.random() - 0.5) * 20 : 0;
        const jitterY = boss.dying ? (Math.random() - 0.5) * 20 : 0;
        ctx.save();
        ctx.translate(boss.x + jitterX, boss.y + jitterY);
        ctx.rotate(Math.sin(s.frame * (boss.dying ? 0.35 : 0.04)) * (boss.dying ? 0.16 : 0.06));

        const bAura = ctx.createRadialGradient(0, 0, boss.radius * 0.3, 0, 0, boss.radius * 1.5);
        bAura.addColorStop(0, boss.dying ? 'rgba(250, 204, 21, 0.75)' : 'rgba(244, 63, 94, 0.38)');
        bAura.addColorStop(1, 'rgba(244, 63, 94, 0)');
        ctx.fillStyle = bAura;
        ctx.beginPath();
        ctx.arc(0, 0, boss.radius * 1.5, 0, Math.PI * 2);
        ctx.fill();

        if (boss.hitFlash > 0) ctx.filter = 'brightness(1.9) contrast(1.25)';
        const bImg = sp[boss.spriteKey] || sp.boss1;
        if (bImg && bImg.complete && bImg.naturalWidth > 0) {
          const bw = boss.radius * 2.35;
          const bh = boss.radius * 2.15;
          ctx.drawImage(bImg, -bw * 0.5, -bh * 0.5, bw, bh);
        }
        ctx.filter = 'none';

        if (!boss.dying) {
          const barW = 140;
          const barH = 10;
          ctx.fillStyle = 'rgba(15, 7, 38, 0.9)';
          ctx.fillRect(-barW / 2, -boss.radius - 24, barW, barH);
          ctx.fillStyle = '#EF4444';
          ctx.fillRect(-barW / 2, -boss.radius - 24, barW * Math.max(0, boss.hp / boss.maxHp), barH);
          ctx.strokeStyle = '#FEF08A';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(-barW / 2, -boss.radius - 24, barW, barH);
        }
        ctx.restore();
      }

      s.bossProjectiles.forEach((bp) => {
        ctx.save();
        ctx.translate(bp.x, bp.y);
        ctx.rotate(s.frame * 0.12);
        if (sp.fxBlackHole && sp.fxBlackHole.complete && sp.fxBlackHole.naturalWidth > 0) {
          ctx.drawImage(sp.fxBlackHole, -28, -28, 56, 56);
        }
        ctx.restore();
      });

      s.shockwaves.forEach((sw) => {
        ctx.save();
        ctx.globalAlpha = Math.max(0, sw.alpha);
        ctx.strokeStyle = sw.color;
        ctx.lineWidth = sw.width || 8;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      });

      s.explosions.forEach((ex) => {
        if (sp.fxExplosion && sp.fxExplosion.complete && sp.fxExplosion.naturalWidth > 0) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, ex.alpha);
          ctx.translate(ex.x, ex.y);
          ctx.scale(ex.scale, ex.scale);
          ctx.drawImage(sp.fxExplosion, -55, -48, 110, 96);
          ctx.restore();
        }
      });

      s.particles.forEach((pt) => {
        ctx.save();
        ctx.globalAlpha = Math.max(0, pt.alpha);
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      s.popups.forEach((pp) => {
        ctx.save();
        ctx.globalAlpha = Math.max(0, pp.alpha);
        ctx.font = `900 ${Math.round(15 * pp.scale)}px "Baloo 2", "Nunito", sans-serif`;
        ctx.textAlign = 'center';
        ctx.strokeStyle = 'rgba(15, 7, 38, 0.92)';
        ctx.lineWidth = 4;
        ctx.strokeText(pp.text, pp.x, pp.y);
        ctx.fillStyle = pp.color;
        ctx.fillText(pp.text, pp.x, pp.y);
        ctx.restore();
      });

      if (s.novaFlash > 0) {
        ctx.fillStyle = `rgba(254, 240, 138, ${s.novaFlash * 0.55})`;
        ctx.fillRect(0, 0, W, H);
        s.novaFlash = Math.max(0, s.novaFlash - 0.04);
      }
      if (s.portalScene && s.portalScene.warpFlash > 0) {
        ctx.fillStyle = `rgba(103, 232, 249, ${s.portalScene.warpFlash * 0.65})`;
        ctx.fillRect(0, 0, W, H);
      }

      ctx.restore();
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [
    addBurst,
    onEarnReward,
    onEarnStars,
    onReaction,
    openBossQuiz,
    playLaserSfx,
    playMegaBoomSfx,
    playNovaSfx,
    playPickupSfx,
    playPopSfx,
    playWarpWhooshSfx,
    speakVi,
    startBossDyingSequence,
    syncHud,
    triggerSuperNova,
  ]);

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const s = stateRef.current;
    if (s.status !== 'playing' || s.portalScene) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * s.width;
    const y = ((e.clientY - rect.top) / rect.height) * s.height;
    s.targetX = Math.max(125, Math.min(s.width * 0.62, x));
    s.targetY = Math.max(75, Math.min(s.height - 75, y));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    handlePointerMove(e);
    const now = performance.now();
    if (now - lastTapRef.current < 320 && stateRef.current.novaEnergy >= 100) {
      triggerSuperNova();
    }
    lastTapRef.current = now;
  };

  const stg = STAGES[stageIdx] || STAGES[0];
  const stagePct =
    bossHpPct !== null
      ? bossHpPct
      : Math.min(100, Math.round((stageKills / stg.targetMeteors) * 100));

  return (
    <div className="relative flex flex-col w-full h-full min-h-[560px] bg-[#09031C] text-white rounded-3xl overflow-hidden shadow-2xl border-2 border-pink-400/30 select-none">
      {/* TOP BAR */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[#0F0726]/90 backdrop-blur-md border-b border-pink-400/25 z-20">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition"
            >
              ← Quay lại
            </button>
          )}
          <div className="flex items-center gap-2">
            <img
              src="/assets/space-defender/ship-kitty-nam.webp"
              alt="Kitty & Nấm"
              className="w-9 h-9 object-contain"
            />
            <div>
              <h2 className="text-base sm:text-lg font-extrabold tracking-wide bg-gradient-to-r from-white via-pink-200 to-yellow-200 bg-clip-text text-transparent">
                HELLO KITTY & NẤM BẮN SAO
              </h2>
              <p className="text-[11px] text-pink-200/80 hidden sm:block">
                Chiến Dịch 3 Ải: 1 Tàu (Nấm & Kitty) • 2 Tàu (+Melody) • 3 Tàu (+Mũ Nấm)
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3 py-1 rounded-xl bg-yellow-400/15 border border-yellow-300/40 text-xs font-extrabold text-yellow-200">
            ⭐ {score.toLocaleString('vi-VN')}
          </div>
          <div className="px-3 py-1 rounded-xl bg-pink-500/15 border border-pink-300/40 text-xs font-extrabold text-pink-200">
            🏆 Kỷ lục: {bestScore.toLocaleString('vi-VN')}
          </div>
          <div className="px-3 py-1 rounded-xl bg-cyan-500/15 border border-cyan-300/40 text-xs font-extrabold text-cyan-200">
            🚀 x{fleetCount} Tàu
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-500/15 border border-emerald-300/40 text-xs font-extrabold text-emerald-200">
            🌌 Ải {stg.stage}/3
          </div>
          <button
            type="button"
            onClick={() => setSoundOn((v) => !v)}
            className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold"
          >
            {soundOn ? '🔊' : '🔇'}
          </button>
          {(status === 'playing' || status === 'paused') && (
            <button
              type="button"
              onClick={() => {
                const next = status === 'playing' ? 'paused' : 'playing';
                stateRef.current.status = next;
                setStatus(next);
              }}
              className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold"
            >
              {status === 'playing' ? '⏸️ Tạm dừng' : '▶️ Tiếp tục'}
            </button>
          )}
        </div>
      </div>

      {/* CANVAS STAGE */}
      <div className="relative flex-1 w-full h-full min-h-[480px] overflow-hidden">
        <canvas
          ref={canvasRef}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          className="block w-full h-full touch-none cursor-crosshair"
        />

        {/* FLOATING HUD */}
        {status === 'playing' && (
          <div className="absolute top-3 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none z-10">
            <div className="flex items-center gap-3 bg-[#100726]/85 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/15 shadow-lg">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`text-base ${i < shipHp ? 'opacity-100' : 'opacity-25 grayscale'}`}>
                    ❤️
                  </span>
                ))}
              </div>
              <div className="w-28">
                <div className="flex justify-between text-[10px] font-extrabold text-cyan-200 mb-0.5">
                  <span>🌍 TRÁI ĐẤT</span>
                  <span>{earthHp}%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-white/15">
                  <div
                    className="h-full transition-all duration-200 bg-gradient-to-r from-emerald-400 to-cyan-400"
                    style={{ width: `${earthHp}%` }}
                  />
                </div>
              </div>
            </div>

            {/* STAGE / BOSS BAR */}
            <div
              className={`flex items-center gap-3 px-4 py-2 rounded-2xl border-2 backdrop-blur-md shadow-lg min-w-[230px] ${
                bossHpPct !== null
                  ? 'bg-rose-950/90 border-rose-500'
                  : 'bg-[#140A34]/90 border-cyan-400/50'
              }`}
            >
              <div className="flex-1">
                <div className="flex justify-between text-[11px] font-black text-yellow-200 mb-1">
                  <span>{bossHpPct !== null ? `👾 ${stg.bossName}` : `☄️ ẢI ${stg.stage}/3: ${stg.name.toUpperCase()}`}</span>
                  <span>{bossHpPct !== null ? `${bossHpPct}% HP` : `${stageKills}/${stg.targetMeteors}`}</span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-white/20">
                  <div
                    className={`h-full transition-all duration-200 ${
                      bossHpPct !== null
                        ? 'bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300'
                        : 'bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400'
                    }`}
                    style={{ width: `${stagePct}%` }}
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={triggerSuperNova}
              disabled={novaEnergy < 100}
              className={`pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-2xl font-extrabold text-xs transition-all shadow-lg border-2 ${
                novaEnergy >= 100
                  ? 'bg-gradient-to-r from-pink-500 via-amber-400 to-pink-500 text-white border-yellow-200 animate-pulse'
                  : 'bg-[#100726]/80 text-slate-300 border-white/15'
              }`}
            >
              <span>🌈</span>
              <span>
                {novaEnergy >= 100 ? 'CHẠM ĐÚP / ĂN SAO CẦU VỒNG!' : `Bão Sao (${novaEnergy}%)`}
              </span>
            </button>
          </div>
        )}

        {/* QUIZ MODAL OVERLAY */}
        {status === 'quiz' && activeQuiz && (
          <div className="absolute inset-0 bg-[#080318]/85 backdrop-blur-md flex items-center justify-center p-4 z-40">
            <div className="max-w-xl w-full bg-gradient-to-b from-[#271258] to-[#140832] border-4 border-yellow-300 rounded-3xl p-5 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-300 text-cyan-200 text-xs font-black">
                  {activeQuiz.subject}
                </span>
                <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-pink-500 to-amber-500 border border-yellow-200 text-white text-xs font-black">
                  {quizReason === 'boss_intro'
                    ? '🎁 Đúng: Siêu Đạn Sao Xanh + Tên Lửa!'
                    : '🎁 Đúng: Cường Hóa Đội Tàu + Nạp Bão Sao!'}
                </span>
                <button
                  type="button"
                  onClick={() => speakVi(activeQuiz.question)}
                  className="px-3 py-1 rounded-full bg-yellow-300 text-slate-950 text-xs font-black hover:scale-105 transition"
                >
                  🔊 Nghe câu hỏi
                </button>
              </div>

              <div className="flex items-center gap-3.5 bg-[#0F0726]/80 border border-pink-400/35 rounded-2xl p-3.5 mb-3.5">
                <img
                  src={stg.bossFile}
                  alt="Boss"
                  className="w-16 h-16 object-contain animate-bounce"
                />
                <div className="text-left flex-1">
                  <div className="text-xl font-black text-yellow-300 mb-1">{activeQuiz.visual}</div>
                  <div className="text-base sm:text-lg font-extrabold text-white leading-snug">
                    {activeQuiz.question}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2.5 mb-3">
                {activeQuiz.shuffledOptions.map((opt, idx) => {
                  const letters = ['A', 'B', 'C'];
                  let btnStyle = 'bg-[#1E1144] border-white/25 hover:border-yellow-300';
                  if (quizSelectedIdx !== null) {
                    if (opt.isCorrect) {
                      btnStyle = 'bg-emerald-600 border-emerald-200';
                    } else if (quizSelectedIdx === idx) {
                      btnStyle = 'bg-rose-600 border-rose-200';
                    }
                  }
                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={quizSelectedIdx !== null}
                      onClick={() => handleSelectQuizOption(opt, idx)}
                      className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-2xl border-2 font-extrabold text-sm sm:text-base transition ${btnStyle}`}
                    >
                      <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-yellow-300 to-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0">
                        {letters[idx]}
                      </span>
                      <span>{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              <div className="text-center text-xs sm:text-sm font-black text-yellow-300">
                {quizFeedback}
              </div>
            </div>
          </div>
        )}

        {/* MENU / PAUSE / VICTORY / GAMEOVER OVERLAY */}
        {(status === 'menu' || status === 'paused' || status === 'victory' || status === 'gameover') && (
          <div className="absolute inset-0 bg-[#09031C]/85 backdrop-blur-md flex items-center justify-center p-5 z-30">
            <div className="max-w-lg w-full bg-gradient-to-b from-[#231048] to-[#110626] border-2 border-pink-400/50 rounded-3xl p-6 text-center shadow-2xl">
              <div className="flex items-end justify-center gap-3 mb-3">
                <img
                  src={
                    status === 'victory'
                      ? '/assets/space-defender/char-nam-cheer.webp'
                      : '/assets/space-defender/ship-kitty-melody.webp'
                  }
                  alt="Left"
                  className="h-24 w-auto object-contain animate-bounce"
                />
                <img
                  src={
                    status === 'victory'
                      ? '/assets/space-defender/victory-sanrio-friends.webp'
                      : '/assets/space-defender/ship-trio-nam-kitty.webp'
                  }
                  alt="Hero"
                  className="h-36 w-auto object-contain drop-shadow-[0_10px_25px_rgba(236,72,153,0.5)]"
                />
                <img
                  src={
                    status === 'victory'
                      ? '/assets/space-defender/char-kitty-cheer.webp'
                      : '/assets/space-defender/boss-3-king.webp'
                  }
                  alt="Right"
                  className="h-24 w-auto object-contain animate-bounce"
                />
              </div>

              <h3 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-white via-pink-200 to-yellow-200 bg-clip-text text-transparent mb-2">
                {status === 'menu' && 'HELLO KITTY & NẤM BẮN SAO'}
                {status === 'paused' && 'TẠM DỪNG PHI VỤ'}
                {status === 'victory' && '🏆 CHIẾN THẮNG VINH QUANG!'}
                {status === 'gameover' && 'CỐ LÊN NẤM ƠI!'}
              </h3>

              <p className="text-sm text-pink-100/90 leading-relaxed mb-5">
                {status === 'menu' &&
                  'Cùng Hello Kitty & Nấm vượt qua 3 Ải Vũ Trụ! Qua mỗi Ải sẽ mở khóa đội hình 1 Tàu (Nấm & Kitty) ➔ 2 Tàu (+My Melody) ➔ 3 Tàu (Nấm, Kitty & Mũ Nấm), trả lời câu đố bắn Siêu Đạn Sao Xanh + Tên Lửa diệt Boss!'}
                {status === 'paused' && 'Đội hình phi thuyền của Hello Kitty & Nấm đang nghỉ giải lao.'}
                {status === 'victory' &&
                  `Hoan hô Nấm, Hello Kitty & Hội Bạn Sanrio đã tiêu diệt nổ tung cả 3 Đại Boss Vũ Trụ! Tổng điểm: ${score.toLocaleString('vi-VN')} (Kỷ lục: ${bestScore.toLocaleString('vi-VN')}) • Trả lời đúng: ${quizStats.correct}/${quizStats.total} câu!`}
                {status === 'gameover' &&
                  `Phi thuyền đã chiến đấu tới Ải ${stageIdx + 1}/3 và đạt ${score.toLocaleString('vi-VN')} điểm. Cùng cất cánh phục thù nhé!`}
              </p>

              <button
                type="button"
                onClick={() => {
                  if (status === 'paused') {
                    stateRef.current.status = 'playing';
                    setStatus('playing');
                  } else {
                    startNewGame();
                  }
                }}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 hover:from-pink-400 hover:to-purple-400 text-white font-black text-base shadow-[0_8px_25px_rgba(236,72,153,0.5)] border-2 border-yellow-200/80 transition transform active:scale-95"
              >
                {status === 'paused' ? '▶️ TIẾP TỤC CHIẾN ĐẤU' : '🚀 BẮT ĐẦU CHIẾN DỊCH 3 ẢI!'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EarthDefenderSpaceGame;
