import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';

interface EarthDefenderSpaceGameProps {
  soundEnabled?: boolean;
  onBack?: () => void;
  onEarnStars?: (stars: number) => void;
  onReaction?: (type: 'happy' | 'sad' | 'singing' | 'idle', message?: string) => void;
  onEarnReward?: (coins: number, summaryText: string) => void;
}

type GameStatus = 'menu' | 'playing' | 'quiz' | 'paused' | 'victory' | 'gameover';
type QuizTargetCount = 5 | 10 | 15;
type QuizTopicId = 'all' | 'math' | 'vietnamese' | 'english' | 'lifeskills' | 'custom';
type QuizMilestoneReason =
  | 'stage_start_1'
  | 'stage_fleet_2'
  | 'stage_fleet_3'
  | 'mid_wave'
  | 'boss_intro'
  | 'boss_65'
  | 'boss_half'
  | 'boss_30';

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
  hitFlash: number;
  dying: boolean;
  dyingTimer: number;
}

interface StageQuizFlags {
  stageStartAsked: boolean;
  midWaveAsked: boolean;
  bossSpawned: boolean;
  bossDefeated: boolean;
  bossIntroAsked: boolean;
  boss65Asked: boolean;
  boss50Asked: boolean;
  boss30Asked: boolean;
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

export interface SpaceQuizQuestion {
  topic: Exclude<QuizTopicId, 'all' | 'custom'>;
  subject: string;
  visual: string;
  question: string;
  options: string[];
  correct: number;
}

interface ActiveQuiz extends SpaceQuizQuestion {
  shuffledOptions: { text: string; isCorrect: boolean }[];
}

const BEST_SCORE_KEY = 'nam_kitty_space_campaign_best_v3';
const CUSTOM_RAW_QUIZ_KEY = 'nam_kitty_space_custom_raw_quiz_v1';
const QUIZ_COUNT_STORAGE_KEY = 'nam_kitty_space_quiz_count_v1';
const QUIZ_TOPIC_STORAGE_KEY = 'nam_kitty_space_quiz_topic_v1';

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

const BUILTIN_QUESTION_BANK: SpaceQuizQuestion[] = [
  { topic: 'math', subject: '🧮 Toán Học', visual: '🍎🍎 + 🍎 = ?', question: '2 quả táo thêm 1 quả táo là mấy quả táo?', options: ['3 quả táo', '2 quả táo', '5 quả táo'], correct: 0 },
  { topic: 'math', subject: '🧮 Toán Học', visual: '⭐⭐ + ⭐⭐ = ?', question: '2 ngôi sao cộng 2 ngôi sao bằng mấy ngôi sao?', options: ['4 ngôi sao', '3 ngôi sao', '5 ngôi sao'], correct: 0 },
  { topic: 'math', subject: '🧮 Toán Học', visual: '🚀🚀🚀🚀🚀', question: 'Đếm xem trên bảng có tất cả mấy chiếc tên lửa?', options: ['5 chiếc', '4 chiếc', '6 chiếc'], correct: 0 },
  { topic: 'math', subject: '🧮 Toán Học', visual: '🍓🍓🍓 - 🍓 = ?', question: 'Có 3 quả dâu tây, Nấm ăn 1 quả thì còn mấy quả?', options: ['2 quả dâu', '1 quả dâu', '3 quả dâu'], correct: 0 },
  { topic: 'math', subject: '🧮 Toán Học', visual: '🐘 Voi vs 🐁 Chuột', question: 'Con Voi và con Chuột, con nào to lớn hơn?', options: ['🐘 Con Voi', '🐁 Con Chuột', 'Bằng nhau'], correct: 0 },
  { topic: 'math', subject: '🧮 Toán Học', visual: '🔺 Hình có 3 cạnh', question: 'Hình nào dưới đây có 3 cạnh và 3 góc?', options: ['🔺 Hình tam giác', '⚪ Hình tròn', '🟦 Hình vuông'], correct: 0 },
  { topic: 'math', subject: '🧮 Toán Học', visual: '🖐️ Một bàn tay', question: 'Một bàn tay của Nấm có mấy ngón tay?', options: ['5 ngón tay', '4 ngón tay', '6 ngón tay'], correct: 0 },
  { topic: 'math', subject: '🧮 Toán Học', visual: '1, 2, 3, [ ? ], 5', question: 'Số nào đứng liền sau số 3 và đứng trước số 5?', options: ['Số 4', 'Số 2', 'Số 6'], correct: 0 },
  { topic: 'math', subject: '🧮 Toán Học', visual: '🧁🧁🧁 + 🧁🧁 = ?', question: 'Có 3 chiếc bánh kem, thêm 2 chiếc nữa là mấy chiếc?', options: ['5 chiếc bánh', '4 chiếc bánh', '6 chiếc bánh'], correct: 0 },
  { topic: 'vietnamese', subject: '📖 Tiếng Việt', visual: '🐱 Meo meo!', question: 'Con gì kêu "Meo meo", rất thích bắt chuột?', options: ['🐱 Con Mèo', '🐶 Con Chó', '🐷 Con Lợn'], correct: 0 },
  { topic: 'vietnamese', subject: '📖 Tiếng Việt', visual: '🐟 C - O - N   C - Á', question: 'Từ "CON CÁ" bắt đầu bằng chữ cái nào?', options: ['Chữ C', 'Chữ B', 'Chữ M'], correct: 0 },
  { topic: 'vietnamese', subject: '📖 Tiếng Việt', visual: '🐓 Ò... ó... o...', question: 'Con vật nào gáy "Ò ó o" gọi mặt trời dậy mỗi sáng?', options: ['🐓 Gà Trống', '🦆 Con Vịt', '🐦 Chim Sẻ'], correct: 0 },
  { topic: 'vietnamese', subject: '📖 Tiếng Việt', visual: '🐝 Chăm chỉ hút mật', question: 'Con gì chăm chỉ bay đi tìm hoa làm mật ngọt?', options: ['🐝 Con Ong', '🐢 Con Rùa', '🦀 Con Cua'], correct: 0 },
  { topic: 'vietnamese', subject: '📖 Tiếng Việt', visual: '🌸 M - Ẹ   Y - Ê - U', question: 'Ai là người sinh ra và bế bồng chăm sóc Nấm từ nhỏ?', options: ['👩‍👧 Mẹ yêu', '🤖 Người máy', '⛄ Người tuyết'], correct: 0 },
  { topic: 'english', subject: '🔤 Tiếng Anh', visual: '🍎 APPLE', question: 'Trong Tiếng Anh, quả "APPLE" là quả gì?', options: ['🍎 Quả Táo', '🍌 Quả Chuối', '🍊 Quả Cam'], correct: 0 },
  { topic: 'english', subject: '🔤 Tiếng Anh', visual: '⭐ STAR', question: 'Trong Tiếng Anh, từ "STAR" có nghĩa là gì?', options: ['⭐ Ngôi Sao', '🌙 Mặt Trăng', '☁️ Đám Mây'], correct: 0 },
  { topic: 'english', subject: '🔤 Tiếng Anh', visual: '🔴 RED', question: 'Màu "RED" trên chiếc áo của Nấm là màu gì?', options: ['🔴 Màu Đỏ', '🔵 Màu Xanh', '🟡 Màu Vàng'], correct: 0 },
  { topic: 'english', subject: '🔤 Tiếng Anh', visual: '🐱 CAT', question: 'Bạn mèo Hello Kitty trong Tiếng Anh gọi là gì?', options: ['🐱 Cat', '🐶 Dog', '🦆 Duck'], correct: 0 },
  { topic: 'english', subject: '🔤 Tiếng Anh', visual: '🌞 SUN', question: 'Trong Tiếng Anh, "THE SUN" là gì?', options: ['🌞 Mặt Trời', '🌧️ Cơn Mưa', '❄️ Bông Tuyết'], correct: 0 },
  { topic: 'lifeskills', subject: '🚦 Kỹ Năng Sống', visual: '🛑 ĐÈN ĐỎ GIAO THÔNG', question: 'Khi đi đường gặp Đèn Giao Thông màu ĐỎ, bé phải làm gì?', options: ['🛑 Dừng lại ngay', '🏃 Chạy thật nhanh', '💃 Nhảy múa'], correct: 0 },
  { topic: 'lifeskills', subject: '🚦 Kỹ Năng Sống', visual: '🧼🤲 Trước khi ăn', question: 'Trước khi ăn cơm, Nấm cần làm gì để bụng luôn khỏe mạnh?', options: ['🧼 Rửa tay sạch', '🎮 Chơi điện tử', '👟 Đi giày vào'], correct: 0 },
  { topic: 'lifeskills', subject: '🚦 Kỹ Năng Sống', visual: '🎁 Khi được tặng quà', question: 'Khi ông bà hoặc bố mẹ tặng quà, bé ngoan sẽ nói lời gì?', options: ['🙏 Con cảm ơn ạ!', '😠 Không thích đâu', '😶 Im lặng bỏ đi'], correct: 0 },
  { topic: 'lifeskills', subject: '🎨 Mỹ Thuật & Vũ Trụ', visual: '🔴 Đỏ + 🟡 Vàng = ?', question: 'Khi pha màu Đỏ với màu Vàng, chúng mình được màu gì?', options: ['🟠 Màu Cam', '🟣 Màu Tím', '⚫ Màu Đen'], correct: 0 },
  { topic: 'lifeskills', subject: '🌿 Tự Nhiên & Vũ Trụ', visual: '🌍 Hành tinh xanh', question: 'Hành tinh thân yêu nơi chúng mình đang sống tên là gì?', options: ['🌍 Trái Đất', '🔥 Sao Hỏa', '🪐 Sao Thổ'], correct: 0 },
  { topic: 'lifeskills', subject: '🌿 Tự Nhiên & Vũ Trụ', visual: '☀️ Ban ngày tỏa nắng', question: 'Ông gì mọc vào buổi sáng tỏa nắng ấm áp cho muôn loài?', options: ['☀️ Ông Mặt Trời', '🌙 Ông Mặt Trăng', '🌧️ Đám Mây Mưa'], correct: 0 },
];

const SAMPLE_CUSTOM_QUIZ_TEXT = `Câu 1: 3 ngôi sao vàng thêm 2 ngôi sao vàng là mấy ngôi sao?
*A. 5 ngôi sao
B. 4 ngôi sao
C. 6 ngôi sao

Câu 2: Hành tinh xanh nơi Bé Nấm và Hello Kitty đang bảo vệ tên là gì?
*A. Trái Đất
B. Sao Hỏa
C. Mặt Trăng

Câu 3: Trong Tiếng Anh, từ "STAR" có nghĩa là gì?
A. Đám mây
*B. Ngôi sao
C. Mặt trời

Câu 4: Khi gặp đèn giao thông màu ĐỎ, bé phải làm gì?
*A. Dừng lại ngay
B. Chạy thật nhanh
C. Nhắm mắt đi tiếp

Câu 5: Một bàn tay của Nấm có mấy ngón tay?
A. 4 ngón tay
*B. 5 ngón tay
C. 6 ngón tay`;

export function parseRawSpaceQuestions(rawText: string): SpaceQuizQuestion[] {
  const lines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  const result: SpaceQuizQuestion[] = [];
  let currentQ = '';
  let options: string[] = [];
  let correctIdx = 0;

  const flush = () => {
    if (currentQ && options.length >= 2) {
      result.push({
        topic: 'math',
        subject: '✍️ Bộ Đề Tự Soạn',
        visual: `🌟 Câu đố #${result.length + 1}`,
        question: currentQ,
        options: options.slice(0, 4),
        correct: Math.min(Math.max(0, correctIdx), Math.min(3, options.length - 1)),
      });
    }
    currentQ = '';
    options = [];
    correctIdx = 0;
  };

  for (const line of lines) {
    const ansMatch = line.match(/^(?:đáp\s*án|dap\s*an|answer)\s*[:=-]?\s*([A-D])/i);
    if (ansMatch) {
      const letter = ansMatch[1].toUpperCase();
      correctIdx = letter.charCodeAt(0) - 65;
      continue;
    }

    const optMatch = line.match(/^(\*)?\s*([A-D])[.):\s-]+\s*(.+)$/i);
    if (optMatch) {
      const isStarred = Boolean(optMatch[1]) || optMatch[3].trim().startsWith('*');
      const cleanOpt = optMatch[3].replace(/^\*\s*/, '').trim();
      if (isStarred) {
        correctIdx = options.length;
      }
      options.push(cleanOpt);
      continue;
    }

    if (options.length >= 2) {
      flush();
    }
    const cleanQ = line.replace(/^(?:câu|cau|question|bài|bai)\s*\d+\s*[:.)-]?\s*/i, '').trim();
    currentQ = currentQ ? `${currentQ} ${cleanQ}` : cleanQ;
  }
  flush();
  return result;
}

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

function createEmptyStageFlags(): StageQuizFlags {
  return {
    stageStartAsked: false,
    midWaveAsked: false,
    bossSpawned: false,
    bossDefeated: false,
    bossIntroAsked: false,
    boss65Asked: false,
    boss50Asked: false,
    boss30Asked: false,
  };
}

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
  const quizCloseTimerRef = useRef<number | null>(null);

  const [status, setStatus] = useState<GameStatus>('menu');
  const [soundOn, setSoundOn] = useState<boolean>(soundEnabled);
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(() => {
    try {
      return Number(localStorage.getItem(BEST_SCORE_KEY) || 0);
    } catch {
      return 0;
    }
  });
  const [stageIdx, setStageIdx] = useState<number>(0);
  const [stageKills, setStageKills] = useState<number>(0);
  const [bossHpPct, setBossHpPct] = useState<number | null>(null);
  const [shipHp, setShipHp] = useState<number>(5);
  const [earthHp, setEarthHp] = useState<number>(100);
  const [fleetCount, setFleetCount] = useState<number>(1);
  const [novaEnergy, setNovaEnergy] = useState<number>(50);
  const [activeQuiz, setActiveQuiz] = useState<ActiveQuiz | null>(null);
  const [quizReason, setQuizReason] = useState<QuizMilestoneReason>('boss_intro');
  const [quizFeedback, setQuizFeedback] = useState<string>('');
  const [quizSelectedIdx, setQuizSelectedIdx] = useState<number | null>(null);
  const [quizStats, setQuizStats] = useState<{ correct: number; total: number }>({
    correct: 0,
    total: 0,
  });

  // Question Bank Config & Editor State
  const [showQuizEditorModal, setShowQuizEditorModal] = useState<boolean>(false);
  const [hideEditorAnswers, setHideEditorAnswers] = useState<boolean>(false);
  const [quizTargetCount, setQuizTargetCount] = useState<QuizTargetCount>(() => {
    try {
      const saved = Number(localStorage.getItem(QUIZ_COUNT_STORAGE_KEY));
      if (saved === 5 || saved === 10 || saved === 15) return saved;
    } catch {
      // ignore
    }
    return 5;
  });
  const [selectedTopic, setSelectedTopic] = useState<QuizTopicId>(() => {
    try {
      const saved = localStorage.getItem(QUIZ_TOPIC_STORAGE_KEY) as QuizTopicId;
      if (saved && ['all', 'math', 'vietnamese', 'english', 'lifeskills', 'custom'].includes(saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'all';
  });
  const [customRawText, setCustomRawText] = useState<string>(() => {
    try {
      return localStorage.getItem(CUSTOM_RAW_QUIZ_KEY) || SAMPLE_CUSTOM_QUIZ_TEXT;
    } catch {
      return SAMPLE_CUSTOM_QUIZ_TEXT;
    }
  });

  const parsedCustomQuestions = useMemo(
    () => parseRawSpaceQuestions(customRawText),
    [customRawText]
  );

  const activeQuestionPool = useMemo(() => {
    if (selectedTopic === 'custom') {
      return parsedCustomQuestions.length > 0 ? parsedCustomQuestions : BUILTIN_QUESTION_BANK;
    }
    if (selectedTopic === 'all') {
      return BUILTIN_QUESTION_BANK;
    }
    const filtered = BUILTIN_QUESTION_BANK.filter((q) => q.topic === selectedTopic);
    return filtered.length > 0 ? filtered : BUILTIN_QUESTION_BANK;
  }, [selectedTopic, parsedCustomQuestions]);

  const activeQuestionPoolRef = useRef<SpaceQuizQuestion[]>(activeQuestionPool);
  useEffect(() => {
    activeQuestionPoolRef.current = activeQuestionPool;
    usedQuizRef.current = [];
  }, [activeQuestionPool]);

  const quizTargetCountRef = useRef<QuizTargetCount>(quizTargetCount);
  useEffect(() => {
    quizTargetCountRef.current = quizTargetCount;
    try {
      localStorage.setItem(QUIZ_COUNT_STORAGE_KEY, String(quizTargetCount));
    } catch {
      // ignore
    }
  }, [quizTargetCount]);

  useEffect(() => {
    try {
      localStorage.setItem(QUIZ_TOPIC_STORAGE_KEY, selectedTopic);
    } catch {
      // ignore
    }
  }, [selectedTopic]);

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_RAW_QUIZ_KEY, customRawText);
    } catch {
      // ignore
    }
  }, [customRawText]);

  useEffect(() => {
    setSoundOn(soundEnabled);
  }, [soundEnabled]);

  const clearPendingQuizTimer = useCallback(() => {
    if (quizCloseTimerRef.current !== null) {
      window.clearTimeout(quizCloseTimerRef.current);
      quizCloseTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearPendingQuizTimer();
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [clearPendingQuizTimer]);

  const handleOverrideCustomAnswer = (qIndex: number, newCorrectIdx: number) => {
    const blocks = customRawText
      .trim()
      .split(/\n\s*\n/)
      .filter(Boolean);
    if (!blocks[qIndex]) return;
    const lines = blocks[qIndex].split(/\r?\n/);
    let optCounter = 0;
    const updatedLines = lines
      .filter((l) => !/^(?:đáp\s*án|dap\s*an|answer)\s*[:=-]/i.test(l.trim()))
      .map((line) => {
        const m = line.trim().match(/^(\*)?\s*([A-D])([.):\s-]+)\s*(.+)$/i);
        if (!m) return line;
        const cleanBody = m[4].replace(/^\*\s*/, '').trim();
        const prefix = optCounter === newCorrectIdx ? '*' : '';
        optCounter++;
        return `${prefix}${m[2].toUpperCase()}. ${cleanBody}`;
      });
    blocks[qIndex] = updatedLines.join('\n');
    setCustomRawText(blocks.join('\n\n'));
  };

  const stateRef = useRef({
    status: 'menu' as GameStatus,
    width: 960,
    height: 560,
    frame: 0,
    shipX: 205,
    shipY: 280,
    targetX: 205,
    targetY: 280,
    shipVy: 0,
    shipScale: 1.0,
    shipHp: 5,
    maxShipHp: 5,
    earthHp: 100,
    score: 0,
    stageIndex: 0,
    stageKills: 0,
    boss: null as BossState | null,
    stageFlags: [
      createEmptyStageFlags(),
      createEmptyStageFlags(),
      createEmptyStageFlags(),
    ] as StageQuizFlags[],
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
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  }, [soundOn]);

  const speakVi = useCallback(
    (text: string) => {
      if (!soundOn || !('speechSynthesis' in window)) return;
      try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'vi-VN';
        u.rate = 1.04;
        u.pitch = 1.1;
        window.speechSynthesis.speak(u);
      } catch {
        // ignore
      }
    },
    [soundOn]
  );

  const playLaserSfx = useCallback(
    (ships: number) => {
      const ac = getAudio();
      if (!ac) return;
      const now = ac.currentTime;
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = ships >= 3 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(880 + ships * 95, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.08);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    },
    [getAudio]
  );

  const playPopSfx = useCallback(
    (radius: number) => {
      const ac = getAudio();
      if (!ac) return;
      const now = ac.currentTime;
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = 'sawtooth';
      const baseFreq = Math.max(70, 220 - radius * 1.2);
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.24);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.start(now);
      osc.stop(now + 0.24);
    },
    [getAudio]
  );

  const playMegaBoomSfx = useCallback(() => {
    const ac = getAudio();
    if (!ac) return;
    const now = ac.currentTime;
    const sub = ac.createOscillator();
    const subG = ac.createGain();
    sub.type = 'sawtooth';
    sub.frequency.setValueAtTime(140, now);
    sub.frequency.exponentialRampToValueAtTime(24, now + 0.75);
    subG.gain.setValueAtTime(0.32, now);
    subG.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
    sub.connect(subG);
    subG.connect(ac.destination);
    sub.start(now);
    sub.stop(now + 0.76);

    [261.63, 329.63, 392.0, 523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + 0.12 + idx * 0.06);
      gain.gain.setValueAtTime(0.13, now + 0.12 + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12 + idx * 0.06 + 0.48);
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.start(now + 0.12 + idx * 0.06);
      osc.stop(now + 0.12 + idx * 0.06 + 0.5);
    });
  }, [getAudio]);

  const playWarpWhooshSfx = useCallback(() => {
    const ac = getAudio();
    if (!ac) return;
    const now = ac.currentTime;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(1280, now + 0.55);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.58);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(now);
    osc.stop(now + 0.6);
  }, [getAudio]);

  const playPickupSfx = useCallback(() => {
    const ac = getAudio();
    if (!ac) return;
    const now = ac.currentTime;
    [587.33, 783.99, 1046.5, 1318.5].forEach((freq, idx) => {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.042);
      gain.gain.setValueAtTime(0.11, now + idx * 0.042);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.042 + 0.16);
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.start(now + idx * 0.042);
      osc.stop(now + idx * 0.042 + 0.16);
    });
  }, [getAudio]);

  const playNovaSfx = useCallback(() => {
    const ac = getAudio();
    if (!ac) return;
    const now = ac.currentTime;
    [261.6, 392.0, 523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.048);
      gain.gain.setValueAtTime(0.14, now + idx * 0.048);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.048 + 0.42);
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.start(now + idx * 0.048);
      osc.stop(now + idx * 0.048 + 0.42);
    });
  }, [getAudio]);

  const syncHud = useCallback(() => {
    const s = stateRef.current;
    setScore(s.score);
    setStageIdx(s.stageIndex);
    setStageKills(s.stageKills);
    setShipHp(s.shipHp);
    setEarthHp(Math.max(0, Math.round(s.earthHp)));
    setFleetCount(s.fleetCount);
    setNovaEnergy(Math.floor(s.novaEnergy));
    setQuizStats({ correct: s.correctQuizCount, total: s.totalQuizAsked });
    if (s.boss) {
      setBossHpPct(Math.max(0, Math.round((s.boss.hp / s.boss.maxHp) * 100)));
    } else {
      setBossHpPct(null);
    }
    setBestScore((prev) => {
      if (s.score > prev) {
        try {
          localStorage.setItem(BEST_SCORE_KEY, String(s.score));
        } catch {
          // ignore
        }
        return s.score;
      }
      return prev;
    });
  }, []);

  const addBurst = useCallback(
    (
      x: number,
      y: number,
      colors: string[],
      count = 18,
      speedScale = 1,
      show3dExplosion = false
    ) => {
      const s = stateRef.current;
      if (show3dExplosion) {
        s.explosions.push({ x, y, scale: 0.35, maxScale: 1.25 * speedScale, alpha: 1 });
      }
      for (let i = 0; i < count; i++) {
        const ang = Math.random() * Math.PI * 2;
        const spd = (1.2 + Math.random() * 5.2) * speedScale;
        s.particles.push({
          x,
          y,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd,
          r: 2.2 + Math.random() * 4.5,
          color: colors[i % colors.length],
          alpha: 1,
          decay: 0.018 + Math.random() * 0.02,
        });
      }
    },
    []
  );

  const openMilestoneQuiz = useCallback(
    (reason: QuizMilestoneReason) => {
      const s = stateRef.current;
      const maxAllowed = quizTargetCountRef.current;
      // Strict guard: never open quiz if game ended, celebrating victory, or quota reached!
      if (
        s.status !== 'playing' ||
        s.victoryCelebrationTimer > 0 ||
        s.totalQuizAsked >= maxAllowed ||
        (s.stageIndex >= STAGES.length - 1 && s.stageFlags[2]?.bossDefeated)
      ) {
        return;
      }

      clearPendingQuizTimer();
      s.status = 'quiz';
      s.totalQuizAsked++;
      setStatus('quiz');
      setQuizReason(reason);
      setQuizSelectedIdx(null);

      const pool = activeQuestionPoolRef.current;
      if (usedQuizRef.current.length >= pool.length) {
        usedQuizRef.current = [];
      }
      const avail = pool.map((_, i) => i).filter((i) => !usedQuizRef.current.includes(i));
      const pickIdx = avail[Math.floor(Math.random() * avail.length)] ?? 0;
      usedQuizRef.current.push(pickIdx);
      const raw = pool[pickIdx] || BUILTIN_QUESTION_BANK[0];

      const shuffledOptions = raw.options.map((text, idx) => ({
        text,
        isCorrect: idx === raw.correct,
      }));
      for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
      }

      const stg = STAGES[s.stageIndex] || STAGES[0];
      const promptMap: Record<QuizMilestoneReason, string> = {
        stage_start_1: '🚀 Khởi động Chiến Dịch! Trả lời đúng để bật Khiên Bất Tử & Nạp Bão Sao xuất kích!',
        stage_fleet_2: '🛸 Tín hiệu từ Chặng 2! Trả lời đúng để triệu hồi Phi Thuyền thứ 2 (Kitty & My Melody) cùng Khiên Bất Tử!',
        stage_fleet_3: '🛸 Tiến vào Chặng Quyết Chiến! Trả lời đúng để triệu hồi Đội Hình 3 Phi Thuyền (Nấm, Kitty & Mũ Nấm)!',
        mid_wave: '🛰️ Vệ Tinh Tiếp Tế giữa chặng! Trả lời đúng để nhận Siêu Nam Châm + Tia Sét Bắn Nhanh!',
        boss_intro: `⚠️ ${stg.bossName} xuất hiện! Trả lời đúng để bắn Pháo Khai Cuộc giảm ngay 20% Máu Boss + Siêu Đạn Sao Xanh!`,
        boss_65: `🔥 ${stg.bossName} đang phản công! Trả lời đúng để Phá Giáp Boss (-15% HP) + Phóng 4 Tên Lửa Tự Dẫn!`,
        boss_half: `💥 Boss còn 50% máu! Trả lời đúng để phóng mưa Tên Lửa Tự Dẫn Đường & Nạp Bão Sao áp đảo Boss!`,
        boss_30: `⚡ Đòn Quyết Định! Trả lời đúng để nạp Đầy 100% Siêu Bão Sao kết liễu ${stg.bossName}!`,
      };

      setQuizFeedback(promptMap[reason]);
      setActiveQuiz({ ...raw, shuffledOptions });
      syncHud();
      speakVi(raw.question);
    },
    [clearPendingQuizTimer, speakVi, syncHud]
  );

  const startBossDyingSequence = useCallback(() => {
    const s = stateRef.current;
    if (!s.boss || s.boss.dying) return;
    clearPendingQuizTimer();
    setActiveQuiz(null);
    if (s.status === 'quiz') {
      s.status = 'playing';
      setStatus('playing');
    }
    s.boss.hp = 0;
    s.boss.dying = true;
    s.boss.dyingTimer = s.stageIndex >= STAGES.length - 1 ? 115 : 75;
    if (s.stageFlags[s.stageIndex]) {
      s.stageFlags[s.stageIndex].bossDefeated = true;
    }
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
  }, [clearPendingQuizTimer, playPopSfx, syncHud]);

  const handleSelectQuizOption = (opt: { text: string; isCorrect: boolean }, idx: number) => {
    if (quizSelectedIdx !== null || !activeQuiz) return;
    setQuizSelectedIdx(idx);
    const s = stateRef.current;

    if (opt.isCorrect) {
      playPickupSfx();
      s.correctQuizCount++;
      s.blasterLevel = 3;
      s.rapidTimer = 420;
      s.shipHp = Math.min(s.maxShipHp, s.shipHp + 1);
      s.score += 120;

      let rewardBanner = '🚀 CƯỜNG HÓA ĐỘI TÀU: ĐẠN SAO XANH + TÊN LỬA!';
      if (quizReason === 'stage_fleet_2') {
        s.fleetCount = Math.max(s.fleetCount, 2);
        s.novaEnergy = Math.min(100, s.novaEnergy + 50);
        s.invincibleTimer = 240;
        rewardBanner = '🛸 ĐỘI HÌNH 2 PHI THUYỀN (+KITTY & MELODY) + KHIÊN BẤT TỬ!';
      } else if (quizReason === 'stage_fleet_3') {
        s.fleetCount = 3;
        s.novaEnergy = Math.min(100, s.novaEnergy + 60);
        s.invincibleTimer = 260;
        rewardBanner = '🛸 ĐỘI HÌNH 3 PHI THUYỀN (NẤM, KITTY & MŨ NẤM) XUẤT KÍCH!';
      } else if (quizReason === 'mid_wave') {
        s.magnetTimer = 480;
        s.novaEnergy = Math.min(100, s.novaEnergy + 45);
        rewardBanner = '🧲 TIẾP TẾ VỆ TINH: SIÊU NAM CHÂM + BẮN NHANH!';
      } else if (quizReason === 'boss_30') {
        s.novaEnergy = 100;
        if (s.boss && !s.boss.dying) {
          s.boss.hp = Math.max(1, s.boss.hp - s.boss.maxHp * 0.15);
          s.boss.hitFlash = 10;
        }
        rewardBanner = '🌈 NẠP ĐẦY 100% SIÊU BÃO SAO + PHÁ GIÁP BOSS!';
      } else {
        s.novaEnergy = Math.min(100, s.novaEnergy + 45);
        if (s.boss && !s.boss.dying) {
          const bossCut = quizReason === 'boss_intro' ? 0.2 : 0.15;
          s.boss.hp = Math.max(1, s.boss.hp - s.boss.maxHp * bossCut);
          s.boss.hitFlash = 10;
          addBurst(s.boss.x, s.boss.y, ['#FEF08A', '#38BDF8', '#EC4899'], 24, 1.3, true);
        }
      }

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

      setQuizFeedback(`🎉 CHÍNH XÁC! ${rewardBanner}`);
      syncHud();

      clearPendingQuizTimer();
      quizCloseTimerRef.current = window.setTimeout(() => {
        quizCloseTimerRef.current = null;
        if (s.status === 'victory' || s.status === 'gameover') return;
        s.invincibleTimer = Math.max(s.invincibleTimer, 150);
        s.status = 'playing';
        setStatus('playing');
        setActiveQuiz(null);
        s.popups.push({
          x: s.shipX + 90,
          y: s.shipY - 50,
          text: rewardBanner,
          color: '#4ADE80',
          vy: -1.2,
          alpha: 1,
          scale: 1.3,
        });
        syncHud();
      }, 1150);
    } else {
      playPopSfx(40);
      // Even if wrong on stage 2/3 entry, still grant the new companion ship so the child doesn't lose fleet progression!
      if (quizReason === 'stage_fleet_2') {
        s.fleetCount = Math.max(s.fleetCount, 2);
      } else if (quizReason === 'stage_fleet_3') {
        s.fleetCount = 3;
      }
      const rightText = activeQuiz.shuffledOptions.find((o) => o.isCorrect)?.text || '';
      setQuizFeedback(
        `💡 Đáp án đúng là: "${rightText}". Cố lên nhé, đội tàu của Nấm vẫn được bật Khiên bảo vệ!`
      );
      syncHud();

      clearPendingQuizTimer();
      quizCloseTimerRef.current = window.setTimeout(() => {
        quizCloseTimerRef.current = null;
        if (s.status === 'victory' || s.status === 'gameover') return;
        s.invincibleTimer = Math.max(s.invincibleTimer, 140);
        s.status = 'playing';
        setStatus('playing');
        setActiveQuiz(null);
        syncHud();
      }, 1450);
    }
  };

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
    clearPendingQuizTimer();
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
    s.stageFlags = [
      createEmptyStageFlags(),
      createEmptyStageFlags(),
      createEmptyStageFlags(),
    ];
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
    usedQuizRef.current = [];

    setActiveQuiz(null);
    setStatus('playing');
    syncHud();

    // If 10 or 15 questions selected, open the Stage 1 Launch Quiz right after takeoff!
    if (quizTargetCountRef.current >= 10) {
      s.stageFlags[0].stageStartAsked = true;
      quizCloseTimerRef.current = window.setTimeout(() => {
        quizCloseTimerRef.current = null;
        if (s.status === 'playing' && s.stageIndex === 0) {
          openMilestoneQuiz('stage_start_1');
        }
      }, 650);
    }
  }, [clearPendingQuizTimer, getAudio, openMilestoneQuiz, syncHud]);

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
      const w = Math.max(640, rect.width || 920);
      const h = Math.max(420, rect.height || 520);
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
      clearPendingQuizTimer();
      setActiveQuiz(null);
      const bx = s.boss ? s.boss.x : s.width - 165;
      const by = s.boss ? s.boss.y : s.height * 0.5;
      s.boss = null;
      if (s.stageFlags[s.stageIndex]) {
        s.stageFlags[s.stageIndex].bossDefeated = true;
      }

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
              s.stageIndex = Math.min(STAGES.length - 1, s.stageIndex + 1);
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
              s.popups.push({
                x: W * 0.5,
                y: H * 0.34,
                text: `🌌 ẢI ${nextStg.stage}/3: ${nextStg.name.toUpperCase()}!`,
                color: '#FEF08A',
                vy: -1.0,
                alpha: 1,
                scale: 1.4,
              });

              // Milestone: Entering Stage 2 or Stage 3 -> Ask question to summon the new companion spaceship!
              const curFlags = s.stageFlags[s.stageIndex];
              if (curFlags && !curFlags.stageStartAsked) {
                curFlags.stageStartAsked = true;
                openMilestoneQuiz(s.stageIndex === 1 ? 'stage_fleet_2' : 'stage_fleet_3');
              }
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
            clearPendingQuizTimer();
            setActiveQuiz(null);
            s.status = 'victory';
            setStatus('victory');
            syncHud();
            if (onEarnStars) onEarnStars(15);
            if (onEarnReward) {
              onEarnReward(20, `Chiến thắng 3 Đại Boss Vũ Trụ (${s.score} điểm)`);
            }
            if (onReaction) {
              onReaction('happy', 'Hoan hô! Nấm, Hello Kitty và các bạn đã bảo vệ Trái Đất thành công!');
            }
            speakVi('Hoan hô! Nấm, Hello Kitty và các bạn đã chiến thắng bảo vệ Trái Đất thành công!');
            return;
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
        const curFlags = s.stageFlags[s.stageIndex];

        if (!s.boss && !s.portalScene && s.victoryCelebrationTimer === 0 && curFlags && !curFlags.bossDefeated) {
          if (s.stageKills >= stg.targetMeteors && !curFlags.bossSpawned) {
            curFlags.bossSpawned = true;
            curFlags.bossIntroAsked = true;
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
              hitFlash: 0,
              dying: false,
              dyingTimer: 0,
            };
            syncHud();
            openMilestoneQuiz('boss_intro');
          } else if (!curFlags.bossSpawned) {
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

            const qTarget = quizTargetCountRef.current;
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

                if (boss.hp <= 0) {
                  startBossDyingSequence();
                  break;
                }

                // Boss HP Milestones based on selected question package (10 or 15 questions)
                if (curFlags && qTarget === 15) {
                  if (!curFlags.boss65Asked && boss.hp <= boss.maxHp * 0.65 && boss.hp > boss.maxHp * 0.35) {
                    curFlags.boss65Asked = true;
                    syncHud();
                    openMilestoneQuiz('boss_65');
                    break;
                  }
                  if (!curFlags.boss30Asked && boss.hp <= boss.maxHp * 0.32) {
                    curFlags.boss30Asked = true;
                    syncHud();
                    openMilestoneQuiz('boss_30');
                    break;
                  }
                } else if (curFlags && qTarget === 10) {
                  if (!curFlags.boss50Asked && boss.hp <= boss.maxHp * 0.5) {
                    curFlags.boss50Asked = true;
                    syncHud();
                    openMilestoneQuiz('boss_half');
                    break;
                  }
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
                clearPendingQuizTimer();
                setActiveQuiz(null);
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

                // Mid-wave supply quiz check (for 15-question mode on all stages, or 10-question mode on Stage 3)
                const qTarget = quizTargetCountRef.current;
                const halfTarget = Math.floor(stg.targetMeteors * 0.5);
                if (
                  curFlags &&
                  !curFlags.midWaveAsked &&
                  s.stageKills >= halfTarget &&
                  (qTarget === 15 || (qTarget === 10 && s.stageIndex === 2))
                ) {
                  curFlags.midWaveAsked = true;
                  openMilestoneQuiz('mid_wave');
                }
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
                clearPendingQuizTimer();
                setActiveQuiz(null);
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
              clearPendingQuizTimer();
              setActiveQuiz(null);
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
    clearPendingQuizTimer,
    onEarnReward,
    onEarnStars,
    onReaction,
    openMilestoneQuiz,
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

  const topicLabels: Record<QuizTopicId, string> = {
    all: '🌟 Tổng Hợp Đa Môn',
    math: '🧮 Toán Học',
    vietnamese: '📖 Tiếng Việt',
    english: '🔤 Tiếng Anh',
    lifeskills: '🚦 Kỹ Năng & Vũ Trụ',
    custom: `✍️ Tự Soạn (${parsedCustomQuestions.length} câu)`,
  };

  return (
    <div className="sd-shell">
      <style>{`
        .sd-shell {
          position: relative;
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          min-height: 530px;
          background: radial-gradient(circle at 20% 15%, #230F45 0%, #100626 55%, #070212 100%);
          color: #ffffff;
          border-radius: 24px;
          overflow: hidden;
          border: 2.5px solid rgba(244, 114, 182, 0.42);
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.55);
          user-select: none;
          font-family: 'Nunito', sans-serif;
        }
        .sd-topbar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 8px 14px;
          background: rgba(16, 7, 38, 0.92);
          border-bottom: 2px solid rgba(244, 114, 182, 0.32);
          z-index: 20;
        }
        .sd-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .sd-brand-icon {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          background: linear-gradient(135deg, #FF66B2, #8B5CF6);
          padding: 3px;
          box-shadow: 0 4px 12px rgba(255, 102, 178, 0.45);
          object-fit: contain;
        }
        .sd-brand-title {
          font-family: 'Baloo 2', 'Nunito', sans-serif;
          font-size: 17px;
          font-weight: 900;
          line-height: 1.1;
          background: linear-gradient(90deg, #FFFFFF, #FFD1EA, #FDE047);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
        }
        .sd-brand-sub {
          font-size: 11px;
          color: #E9D5FF;
          font-weight: 700;
          margin: 0;
        }
        .sd-top-stats {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px;
        }
        .sd-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 11px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 800;
          background: rgba(255, 255, 255, 0.08);
          border: 1.5px solid rgba(255, 255, 255, 0.16);
          color: #fff;
        }
        .sd-pill.gold { border-color: rgba(250, 204, 21, 0.55); color: #FEF08A; }
        .sd-pill.pink { border-color: rgba(244, 114, 182, 0.55); color: #FBCFE8; }
        .sd-pill.cyan { border-color: rgba(56, 189, 248, 0.55); color: #BAE6FD; }
        .sd-pill.green { border-color: rgba(74, 222, 128, 0.55); color: #BBF7D0; }
        .sd-btn {
          cursor: pointer;
          border: 1.5px solid rgba(255, 255, 255, 0.25);
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
          padding: 5px 11px;
          border-radius: 12px;
          font-weight: 800;
          font-size: 12px;
          font-family: inherit;
          transition: transform 0.12s, background 0.15s;
        }
        .sd-btn:hover { background: rgba(255, 255, 255, 0.22); transform: translateY(-1px); }
        .sd-btn.quiz-cfg {
          background: linear-gradient(135deg, #F59E0B, #EC4899);
          border-color: #FEF08A;
          color: #fff;
          box-shadow: 0 4px 12px rgba(236, 72, 153, 0.4);
        }
        .sd-stage-wrap {
          position: relative;
          flex: 1;
          width: 100%;
          min-height: 460px;
          overflow: hidden;
        }
        .sd-canvas {
          display: block;
          width: 100%;
          height: 100%;
          min-height: 460px;
          touch-action: none;
          cursor: crosshair;
        }
        .sd-hud-row {
          position: absolute;
          top: 10px;
          left: 14px;
          right: 14px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          pointer-events: none;
          z-index: 10;
        }
        .sd-hud-box {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(16, 7, 38, 0.84);
          backdrop-filter: blur(8px);
          padding: 7px 14px;
          border-radius: 16px;
          border: 1.5px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
        }
        .sd-bar-track {
          width: 115px;
          height: 9px;
          background: rgba(15, 23, 42, 0.9);
          border-radius: 999px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.22);
        }
        .sd-bar-fill {
          height: 100%;
          transition: width 0.2s ease;
        }
        .sd-nova-btn {
          pointer-events: auto;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 15px;
          border-radius: 999px;
          font-weight: 900;
          font-size: 12px;
          color: #fff;
          background: rgba(16, 7, 38, 0.85);
          border: 2px solid rgba(255, 255, 255, 0.22);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
        }
        .sd-nova-btn.ready {
          background: linear-gradient(135deg, #EC4899, #F59E0B, #EC4899);
          border-color: #FEF08A;
          box-shadow: 0 0 22px rgba(250, 204, 21, 0.75);
        }
        .sd-overlay {
          position: absolute;
          inset: 0;
          background: rgba(8, 3, 24, 0.84);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          z-index: 30;
        }
        .sd-modal-card {
          max-width: 560px;
          width: 100%;
          background: linear-gradient(180deg, rgba(38, 17, 77, 0.97), rgba(18, 7, 41, 0.99));
          border: 3px solid rgba(244, 114, 182, 0.65);
          border-radius: 28px;
          padding: 20px 24px;
          text-align: center;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.75);
        }
        .sd-quiz-card {
          max-width: 600px;
          width: 100%;
          background: linear-gradient(180deg, #271258 0%, #140832 100%);
          border: 3.5px solid #FDE047;
          border-radius: 28px;
          padding: 18px 22px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85);
        }
        .sd-quiz-opt {
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          text-align: left;
          padding: 11px 15px;
          border-radius: 16px;
          border: 2.5px solid rgba(255, 255, 255, 0.25);
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          font-family: inherit;
          font-size: 15px;
          font-weight: 800;
          transition: all 0.14s;
        }
        .sd-quiz-opt:hover:not(:disabled) {
          background: rgba(244, 114, 182, 0.28);
          border-color: #FDE047;
          transform: translateX(4px);
        }
        .sd-quiz-opt.correct {
          background: linear-gradient(135deg, #22C55E, #16A34A) !important;
          border-color: #BBF7D0 !important;
        }
        .sd-quiz-opt.wrong {
          background: linear-gradient(135deg, #EF4444, #DC2626) !important;
          border-color: #FECACA !important;
        }
        .sd-primary-cta {
          cursor: pointer;
          width: 100%;
          padding: 13px 24px;
          border-radius: 999px;
          border: 2.5px solid #FEF08A;
          background: linear-gradient(135deg, #FF4D94 0%, #8B5CF6 100%);
          color: #ffffff;
          font-family: 'Baloo 2', 'Nunito', sans-serif;
          font-size: 18px;
          font-weight: 900;
          box-shadow: 0 10px 25px rgba(255, 77, 148, 0.5);
          transition: transform 0.15s;
        }
        .sd-primary-cta:hover { transform: scale(1.02); }
      `}</style>

      {/* TOP BAR */}
      <div className="sd-topbar">
        <div className="sd-brand">
          {onBack && (
            <button type="button" onClick={onBack} className="sd-btn">
              ← Quay lại
            </button>
          )}
          <img
            src="/assets/space-defender/ship-kitty-nam.webp"
            alt="Kitty & Nấm"
            className="sd-brand-icon"
          />
          <div>
            <h2 className="sd-brand-title">HELLO KITTY &amp; NẤM BẮN SAO</h2>
            <p className="sd-brand-sub">
              3 Ải: 1 Tàu (Nấm &amp; Kitty) ➔ 2 Tàu (+Melody) ➔ 3 Tàu (+Mũ Nấm)
            </p>
          </div>
        </div>

        <div className="sd-top-stats">
          <span className="sd-pill gold">⭐ {score.toLocaleString('vi-VN')}</span>
          <span className="sd-pill pink">🏆 Kỷ lục: {bestScore.toLocaleString('vi-VN')}</span>
          <span className="sd-pill cyan">🚀 x{fleetCount} Tàu</span>
          <span className="sd-pill green">🌌 Ải {stg.stage}/3</span>
          <span className="sd-pill gold">
            🧠 Câu đố: {quizStats.total}/{quizTargetCount}
          </span>
          <button
            type="button"
            onClick={() => setShowQuizEditorModal(true)}
            className="sd-btn quiz-cfg"
            title="Chọn gói 5 - 10 - 15 câu hỏi hoặc tự soạn câu hỏi"
          >
            ⚙️ Bộ Câu Hỏi ({quizTargetCount} câu)
          </button>
          <button
            type="button"
            onClick={() => setSoundOn((v) => !v)}
            className="sd-btn"
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
              className="sd-btn"
            >
              {status === 'playing' ? '⏸️ Tạm dừng' : '▶️ Tiếp tục'}
            </button>
          )}
        </div>
      </div>

      {/* CANVAS STAGE */}
      <div className="sd-stage-wrap">
        <canvas
          ref={canvasRef}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          className="sd-canvas"
        />

        {/* FLOATING HUD */}
        {status === 'playing' && (
          <div className="sd-hud-row">
            <div className="sd-hud-box">
              <div style={{ display: 'flex', gap: 3 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: 16,
                      opacity: i < shipHp ? 1 : 0.22,
                      filter: i < shipHp ? 'none' : 'grayscale(1)',
                    }}
                  >
                    ❤️
                  </span>
                ))}
              </div>
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 10,
                    fontWeight: 900,
                    color: '#BAE6FD',
                    marginBottom: 3,
                  }}
                >
                  <span>🌍 TRÁI ĐẤT</span>
                  <span>{earthHp}%</span>
                </div>
                <div className="sd-bar-track">
                  <div
                    className="sd-bar-fill"
                    style={{
                      width: `${earthHp}%`,
                      background: 'linear-gradient(90deg, #22C55E, #38BDF8)',
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              className="sd-hud-box"
              style={{
                minWidth: 230,
                borderColor: bossHpPct !== null ? '#F43F5E' : 'rgba(56, 189, 248, 0.5)',
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 11,
                    fontWeight: 900,
                    color: '#FEF08A',
                    marginBottom: 4,
                  }}
                >
                  <span>
                    {bossHpPct !== null
                      ? `👾 ${stg.bossName}`
                      : `☄️ ẢI ${stg.stage}/3: ${stg.name.toUpperCase()}`}
                  </span>
                  <span style={{ marginLeft: 8 }}>
                    {bossHpPct !== null ? `${bossHpPct}% HP` : `${stageKills}/${stg.targetMeteors}`}
                  </span>
                </div>
                <div className="sd-bar-track" style={{ width: '100%' }}>
                  <div
                    className="sd-bar-fill"
                    style={{
                      width: `${stagePct}%`,
                      background:
                        bossHpPct !== null
                          ? 'linear-gradient(90deg, #EF4444, #F97316, #FACC15)'
                          : 'linear-gradient(90deg, #38BDF8, #A855F7, #EC4899)',
                    }}
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={triggerSuperNova}
              disabled={novaEnergy < 100}
              className={`sd-nova-btn ${novaEnergy >= 100 ? 'ready' : ''}`}
            >
              <span>🌈</span>
              <span>
                {novaEnergy >= 100
                  ? 'CHẠM ĐÚP / ĂN SAO CẦU VỒNG!'
                  : `Bão Sao (${novaEnergy}%)`}
              </span>
            </button>
          </div>
        )}

        {/* QUIZ MODAL OVERLAY */}
        {status === 'quiz' && activeQuiz && (
          <div className="sd-overlay" style={{ zIndex: 40 }}>
            <div className="sd-quiz-card">
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <span className="sd-pill cyan">
                  {activeQuiz.subject} • Câu {quizStats.total}/{quizTargetCount}
                </span>
                <span
                  className="sd-pill gold"
                  style={{
                    background: 'linear-gradient(135deg, #EC4899, #F59E0B)',
                    color: '#fff',
                  }}
                >
                  {quizReason === 'stage_fleet_2'
                    ? '🎁 Đúng: Triệu Hồi Tàu 2 (Kitty & Melody) + Khiên!'
                    : quizReason === 'stage_fleet_3'
                      ? '🎁 Đúng: Triệu Hồi 3 Tàu (Nấm, Kitty & Mũ Nấm)!'
                      : quizReason === 'boss_intro'
                        ? '🎁 Đúng: Giảm 20% Máu Boss + Đạn Sao Xanh!'
                        : '🎁 Đúng: Phóng Mưa Tên Lửa + Nạp Bão Sao!'}
                </span>
                <button
                  type="button"
                  onClick={() => speakVi(activeQuiz.question)}
                  className="sd-btn"
                  style={{ background: '#FDE047', color: '#0F172A' }}
                >
                  🔊 Nghe câu hỏi
                </button>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  background: 'rgba(15, 7, 38, 0.78)',
                  border: '2px solid rgba(244, 114, 182, 0.4)',
                  borderRadius: 20,
                  padding: '12px 16px',
                  marginBottom: 14,
                }}
              >
                <img
                  src={
                    quizReason === 'stage_fleet_2'
                      ? '/assets/space-defender/ship-kitty-melody.webp'
                      : quizReason === 'stage_fleet_3'
                        ? '/assets/space-defender/ship-trio-nam-kitty.webp'
                        : stg.bossFile
                  }
                  alt="Quiz Icon"
                  style={{ width: 68, height: 68, objectFit: 'contain' }}
                />
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <div
                    style={{
                      fontSize: 19,
                      fontWeight: 900,
                      color: '#FDE047',
                      marginBottom: 4,
                    }}
                  >
                    {activeQuiz.visual}
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.35 }}>
                    {activeQuiz.question}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 12 }}>
                {activeQuiz.shuffledOptions.map((opt, idx) => {
                  const letters = ['A', 'B', 'C', 'D'];
                  let cls = 'sd-quiz-opt';
                  if (quizSelectedIdx !== null) {
                    if (opt.isCorrect) cls += ' correct';
                    else if (quizSelectedIdx === idx) cls += ' wrong';
                  }
                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={quizSelectedIdx !== null}
                      onClick={() => handleSelectQuizOption(opt, idx)}
                      className={cls}
                    >
                      <span
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 10,
                          background: 'linear-gradient(135deg, #FDE047, #F59E0B)',
                          color: '#0F172A',
                          fontWeight: 900,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {letters[idx]}
                      </span>
                      <span>{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              <div
                style={{
                  textAlign: 'center',
                  fontSize: 13,
                  fontWeight: 900,
                  color: '#FDE047',
                }}
              >
                {quizFeedback}
              </div>
            </div>
          </div>
        )}

        {/* MENU / PAUSE / VICTORY / GAMEOVER OVERLAY */}
        {(status === 'menu' || status === 'paused' || status === 'victory' || status === 'gameover') && (
          <div className="sd-overlay">
            <div className="sd-modal-card">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  gap: 12,
                  marginBottom: 10,
                }}
              >
                <img
                  src={
                    status === 'victory'
                      ? '/assets/space-defender/char-nam-cheer.webp'
                      : '/assets/space-defender/ship-kitty-melody.webp'
                  }
                  alt="Left"
                  style={{ height: 86, width: 'auto', objectFit: 'contain' }}
                />
                <img
                  src={
                    status === 'victory'
                      ? '/assets/space-defender/victory-sanrio-friends.webp'
                      : '/assets/space-defender/ship-trio-nam-kitty.webp'
                  }
                  alt="Hero"
                  style={{
                    height: 126,
                    width: 'auto',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 10px 22px rgba(236,72,153,0.5))',
                  }}
                />
                <img
                  src={
                    status === 'victory'
                      ? '/assets/space-defender/char-kitty-cheer.webp'
                      : '/assets/space-defender/boss-3-king.webp'
                  }
                  alt="Right"
                  style={{ height: 86, width: 'auto', objectFit: 'contain' }}
                />
              </div>

              <h3
                style={{
                  fontFamily: "'Baloo 2', cursive",
                  fontSize: 26,
                  fontWeight: 900,
                  margin: '0 0 8px',
                  color: '#FEF08A',
                }}
              >
                {status === 'menu' && 'HELLO KITTY & NẤM BẮN SAO'}
                {status === 'paused' && 'TẠM DỪNG PHI VỤ'}
                {status === 'victory' && '🏆 CHIẾN THẮNG VINH QUANG!'}
                {status === 'gameover' && 'CỐ LÊN NẤM ƠI!'}
              </h3>

              <p
                style={{
                  fontSize: 13.5,
                  color: '#F3E8FF',
                  lineHeight: 1.5,
                  margin: '0 0 14px',
                }}
              >
                {status === 'menu' &&
                  'Cùng Hello Kitty & Nấm vượt qua 3 Ải Vũ Trụ! Qua mỗi Ải sẽ trả lời câu đố triệu hồi thêm Phi thuyền mới: 1 Tàu (Nấm & Kitty) ➔ 2 Tàu (+My Melody) ➔ 3 Tàu (Nấm, Kitty & Mũ Nấm) và giảm máu Đại Boss!'}
                {status === 'paused' &&
                  'Đội hình phi thuyền của Hello Kitty & Nấm đang nghỉ giải lao.'}
                {status === 'victory' &&
                  `Hoan hô Nấm, Hello Kitty & Hội Bạn Sanrio đã tiêu diệt nổ tung cả 3 Đại Boss Vũ Trụ! Tổng điểm: ${score.toLocaleString('vi-VN')} (Kỷ lục: ${bestScore.toLocaleString('vi-VN')}) • Trả lời đúng: ${quizStats.correct}/${quizStats.total} câu!`}
                {status === 'gameover' &&
                  `Phi thuyền đã chiến đấu tới Ải ${stageIdx + 1}/3 và đạt ${score.toLocaleString('vi-VN')} điểm. Cùng cất cánh phục thù nhé!`}
              </p>

              {/* Quick Question Package & Topic Selector right on Menu */}
              {status !== 'paused' && (
                <div
                  style={{
                    background: 'rgba(15, 7, 38, 0.72)',
                    border: '1.5px solid rgba(250, 204, 21, 0.45)',
                    borderRadius: 18,
                    padding: '10px 12px',
                    marginBottom: 14,
                    textAlign: 'left',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 8,
                      marginBottom: 8,
                      flexWrap: 'wrap',
                    }}
                  >
                    <span style={{ fontSize: 12, fontWeight: 900, color: '#FEF08A' }}>
                      🎯 Gói câu hỏi trong trận ({topicLabels[selectedTopic]}):
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowQuizEditorModal(true)}
                      className="sd-btn quiz-cfg"
                      style={{ fontSize: 11, padding: '4px 10px' }}
                    >
                      📝 Soạn / Đổi Bộ Câu Hỏi
                    </button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                    {([5, 10, 15] as QuizTargetCount[]).map((cnt) => {
                      const active = quizTargetCount === cnt;
                      return (
                        <button
                          key={cnt}
                          type="button"
                          onClick={() => setQuizTargetCount(cnt)}
                          style={{
                            cursor: 'pointer',
                            padding: '7px 8px',
                            borderRadius: 12,
                            border: active ? '2px solid #FDE047' : '1.5px solid rgba(255,255,255,0.2)',
                            background: active
                              ? 'linear-gradient(135deg, rgba(236,72,153,0.45), rgba(139,92,246,0.45))'
                              : 'rgba(255,255,255,0.06)',
                            color: '#fff',
                            fontFamily: 'inherit',
                            fontWeight: 900,
                            fontSize: 12,
                          }}
                        >
                          {cnt} Câu ({cnt === 5 ? 'Nhanh' : cnt === 10 ? 'Chuẩn' : 'Chuyên sâu'})
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

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
                className="sd-primary-cta"
              >
                {status === 'paused'
                  ? '▶️ TIẾP TỤC CHIẾN ĐẤU'
                  : `🚀 BẮT ĐẦU CHIẾN DỊCH (${quizTargetCount} CÂU HỎI)!`}
              </button>
            </div>
          </div>
        )}

        {/* QUESTION BANK EDITOR & CONFIGURATION MODAL */}
        {showQuizEditorModal && (
          <div className="sd-overlay" style={{ zIndex: 55 }}>
            <div
              className="sd-modal-card"
              style={{
                maxWidth: 760,
                maxHeight: '90%',
                overflowY: 'auto',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 10,
                  marginBottom: 12,
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "'Baloo 2', cursive",
                    fontSize: 22,
                    color: '#FEF08A',
                  }}
                >
                  📝 Module Soạn &amp; Chia Mốc Bộ Câu Hỏi Phi Thuyền
                </h3>
                <button
                  type="button"
                  onClick={() => setShowQuizEditorModal(false)}
                  className="sd-btn"
                  style={{ background: '#22C55E', borderColor: '#86EFAC' }}
                >
                  ✅ Lưu &amp; Đóng
                </button>
              </div>

              {/* 1. Chọn số câu hỏi và giải thích cách chia mốc */}
              <div
                style={{
                  background: 'rgba(15, 7, 38, 0.78)',
                  border: '1.5px solid rgba(56, 189, 248, 0.4)',
                  borderRadius: 16,
                  padding: 12,
                  marginBottom: 12,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 900, color: '#BAE6FD', marginBottom: 8 }}>
                  1️⃣ Chọn số câu hỏi xuất hiện trong 1 chiến dịch (3 Ải):
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 8 }}>
                  {([
                    {
                      cnt: 5 as QuizTargetCount,
                      title: '⚡ Gói 5 Câu (Nhanh)',
                      desc: 'Nhận Tàu 2 & 3 ở đầu Ải 2, 3 + Trước khi đánh 3 Đại Boss',
                    },
                    {
                      cnt: 10 as QuizTargetCount,
                      title: '⭐ Gói 10 Câu (Chuẩn)',
                      desc: 'Mở màn + Nhận Tàu 2, 3 + Trước 3 Boss + Khi Boss còn 50% máu',
                    },
                    {
                      cnt: 15 as QuizTargetCount,
                      title: '👑 Gói 15 Câu (5 câu/Ải)',
                      desc: 'Đầu ải + Giữa chặng 50% + Đầu Boss + Boss 65% HP + Boss 30% HP',
                    },
                  ]).map((item) => {
                    const active = quizTargetCount === item.cnt;
                    return (
                      <button
                        key={item.cnt}
                        type="button"
                        onClick={() => setQuizTargetCount(item.cnt)}
                        style={{
                          cursor: 'pointer',
                          textAlign: 'left',
                          padding: '9px 11px',
                          borderRadius: 14,
                          border: active ? '2.5px solid #FDE047' : '1.5px solid rgba(255,255,255,0.18)',
                          background: active
                            ? 'linear-gradient(135deg, rgba(236,72,153,0.42), rgba(139,92,246,0.42))'
                            : 'rgba(255,255,255,0.06)',
                          color: '#fff',
                          fontFamily: 'inherit',
                        }}
                      >
                        <div style={{ fontWeight: 900, fontSize: 13, color: '#FEF08A' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: 11, color: '#E2E8F0', marginTop: 3, lineHeight: 1.3 }}>
                          {item.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Chọn chủ đề có sẵn hoặc Tự soạn */}
              <div
                style={{
                  background: 'rgba(15, 7, 38, 0.78)',
                  border: '1.5px solid rgba(244, 114, 182, 0.4)',
                  borderRadius: 16,
                  padding: 12,
                  marginBottom: 12,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 900, color: '#FBCFE8', marginBottom: 8 }}>
                  2️⃣ Chọn Nguồn Câu Hỏi:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {(['all', 'math', 'vietnamese', 'english', 'lifeskills', 'custom'] as QuizTopicId[]).map(
                    (tId) => {
                      const active = selectedTopic === tId;
                      return (
                        <button
                          key={tId}
                          type="button"
                          onClick={() => setSelectedTopic(tId)}
                          style={{
                            cursor: 'pointer',
                            padding: '6px 12px',
                            borderRadius: 999,
                            border: active ? '2px solid #FDE047' : '1.5px solid rgba(255,255,255,0.2)',
                            background: active ? '#EC4899' : 'rgba(255,255,255,0.08)',
                            color: '#fff',
                            fontFamily: 'inherit',
                            fontWeight: 800,
                            fontSize: 12,
                          }}
                        >
                          {topicLabels[tId]}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* 3. Ô Dán Nhanh Câu Hỏi Từ Word / ChatGPT */}
              <div
                style={{
                  background: 'rgba(15, 7, 38, 0.85)',
                  border: '1.5px solid rgba(250, 204, 21, 0.45)',
                  borderRadius: 16,
                  padding: 12,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 8,
                    flexWrap: 'wrap',
                    marginBottom: 6,
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 900, color: '#FEF08A' }}>
                    3️⃣ Dán Nhanh Bộ Câu Hỏi Tự Soạn (Word / ChatGPT dấu * trước đáp án đúng):
                  </span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      type="button"
                      onClick={() => {
                        setCustomRawText(SAMPLE_CUSTOM_QUIZ_TEXT);
                        setSelectedTopic('custom');
                      }}
                      className="sd-btn"
                    >
                      📋 Nạp đề mẫu
                    </button>
                    <button
                      type="button"
                      onClick={() => setHideEditorAnswers((v) => !v)}
                      className="sd-btn"
                    >
                      {hideEditorAnswers ? '👁️ Hiện đáp án' : '🙈 Ẩn đáp án'}
                    </button>
                  </div>
                </div>

                <textarea
                  value={customRawText}
                  onChange={(e) => {
                    setCustomRawText(e.target.value);
                    if (selectedTopic !== 'custom') setSelectedTopic('custom');
                  }}
                  rows={6}
                  style={{
                    width: '100%',
                    borderRadius: 12,
                    border: '2px solid rgba(255,255,255,0.22)',
                    background: '#090318',
                    color: '#F8FAFC',
                    padding: 10,
                    fontFamily: 'inherit',
                    fontSize: 12.5,
                    fontWeight: 700,
                    lineHeight: 1.4,
                    resize: 'vertical',
                  }}
                  placeholder="Dán câu hỏi và các đáp án A., B., C. (đặt dấu * trước đáp án đúng)..."
                />

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 8,
                    marginBottom: 6,
                  }}
                >
                  <span className="sd-pill green">
                    ✅ Đã nhận diện: {parsedCustomQuestions.length} câu hỏi tự soạn
                  </span>
                  <span style={{ fontSize: 11, color: '#CBD5E1', fontWeight: 700 }}>
                    Bấm A / B / C / D để đổi nhanh đáp án đúng:
                  </span>
                </div>

                <div
                  style={{
                    maxHeight: 135,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                  }}
                >
                  {parsedCustomQuestions.map((q, qIdx) => (
                    <div
                      key={qIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 8,
                        background: 'rgba(255,255,255,0.06)',
                        borderRadius: 10,
                        padding: '6px 10px',
                        fontSize: 12,
                      }}
                    >
                      <span
                        style={{
                          flex: 1,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          fontWeight: 800,
                        }}
                      >
                        Câu {qIdx + 1}: {q.question}
                      </span>
                      <div style={{ display: 'flex', gap: 4 }}>
                        {q.options.map((_, oIdx) => {
                          const isAns = !hideEditorAnswers && q.correct === oIdx;
                          return (
                            <button
                              key={oIdx}
                              type="button"
                              onClick={() => handleOverrideCustomAnswer(qIdx, oIdx)}
                              style={{
                                cursor: 'pointer',
                                width: 24,
                                height: 24,
                                borderRadius: 6,
                                border: isAns ? '1.5px solid #86EFAC' : '1px solid rgba(255,255,255,0.25)',
                                background: isAns ? '#22C55E' : 'rgba(255,255,255,0.1)',
                                color: '#fff',
                                fontWeight: 900,
                                fontSize: 11,
                              }}
                            >
                              {String.fromCharCode(65 + oIdx)}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EarthDefenderSpaceGame;
