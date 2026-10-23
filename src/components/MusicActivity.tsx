import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  FastForward,
  Maximize2,
  Mic,
  Minimize2,
  Music,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Star,
  Volume2,
} from "lucide-react";
import musicLessons from "../data/music.json";
import {
  DEFAULT_KARAOKE_SONGS,
  type KaraokeLine,
  type KaraokeSong,
} from "../data/karaokeDefaultSongs";
import { useSpeech } from "../hooks/useSpeech";
import type { ActivityProps } from "../types";
import { BandStageView } from "./BandStageView";

const NOTE_KEYS = [
  { name: "Đồ", freq: 261.63, bass: 130.81, color: "#FF4757" },
  { name: "Rê", freq: 293.66, bass: 146.83, color: "#FFA502" },
  { name: "Mi", freq: 329.63, bass: 130.81, color: "#FFD32A" },
  { name: "Pha", freq: 349.23, bass: 174.61, color: "#2ED573" },
  { name: "Son", freq: 392.0, bass: 196.0, color: "#1E90FF" },
  { name: "La", freq: 440.0, bass: 174.61, color: "#5352ED" },
  { name: "Si", freq: 493.88, bass: 196.0, color: "#9B59B6" },
];

const SONG_ICONS = ["🔢🎵", "🦋🌼", "👵💖", "🐥🌻"];

interface NeonLedIconItem {
  id: string;
  src: string;
  label: string;
  glow: string;
}

const ALL_NEON_ICONS: NeonLedIconItem[] = [
  { id: "star", src: "/assets/karaoke-led/neon-icon-01.png", label: "Ngôi Sao Vàng Neon", glow: "#facc15" },
  { id: "sparkle", src: "/assets/karaoke-led/neon-icon-02.png", label: "Sao Lấp Lánh Neon", glow: "#e879f9" },
  { id: "bow", src: "/assets/karaoke-led/neon-icon-03.png", label: "Nơ Hồng Neon", glow: "#ff2e93" },
  { id: "heart", src: "/assets/karaoke-led/neon-icon-04.png", label: "Trái Tim Neon", glow: "#fb7185" },
  { id: "note1", src: "/assets/karaoke-led/neon-icon-05.png", label: "Nốt Nhạc Xanh Neon", glow: "#38bdf8" },
  { id: "note2", src: "/assets/karaoke-led/neon-icon-06.png", label: "Nốt Nhạc Đôi Neon", glow: "#4ade80" },
  { id: "mic", src: "/assets/karaoke-led/neon-icon-07.png", label: "Micro Neon", glow: "#c084fc" },
  { id: "kitty", src: "/assets/karaoke-led/neon-icon-08.png", label: "Hello Kitty Neon", glow: "#ff4da6" },
  { id: "paw", src: "/assets/karaoke-led/neon-icon-09.png", label: "Chân Mèo Neon", glow: "#f472b6" },
  { id: "rainbow", src: "/assets/karaoke-led/neon-icon-10.png", label: "Cầu Vồng Neon", glow: "#38bdf8" },
  { id: "moon", src: "/assets/karaoke-led/neon-icon-11.png", label: "Trăng Sao Neon", glow: "#facc15" },
  { id: "cloud", src: "/assets/karaoke-led/neon-icon-12.png", label: "Mây Cười Neon", glow: "#60a5fa" },
];

interface SpawnedLedNode {
  uid: string;
  icon: NeonLedIconItem;
  topPct: number;
  leftPct: number;
  rotateDeg: number;
  delaySec: number;
  durationSec: number;
  pattern: 1 | 2 | 3;
}

function spawnRandomLedPair(
  cycle: number,
  prevIds: string[] = [],
): { left: SpawnedLedNode[]; right: SpawnedLedNode[]; usedIds: string[] } {
  const pool = [...ALL_NEON_ICONS].sort(() => Math.random() - 0.5);
  // Ưu tiên chọn các hình khác với lượt vừa rồi để mỗi lần nháy lại đổi hình mới
  const freshFirst = [
    ...pool.filter((ic) => !prevIds.includes(ic.id)),
    ...pool.filter((ic) => prevIds.includes(ic.id)),
  ];

  const leftCount = Math.random() < 0.42 ? 1 : 2;
  const rightCount = Math.random() < 0.42 ? 1 : 2;

  const leftIcons = freshFirst.slice(0, leftCount);
  const rightIcons = freshFirst.slice(leftCount, leftCount + rightCount);

  const buildNodes = (icons: NeonLedIconItem[], side: "L" | "R"): SpawnedLedNode[] => {
    if (icons.length === 1) {
      return [
        {
          uid: `${side}-${cycle}-0-${icons[0].id}`,
          icon: icons[0],
          topPct: 20 + Math.floor(Math.random() * 44), // 20%..64%
          leftPct: 10 + Math.floor(Math.random() * 34), // 10%..44%
          rotateDeg: Math.floor(Math.random() * 21) - 10,
          delaySec: side === "R" ? 0.18 : 0,
          durationSec: 2.15 + Math.round(Math.random() * 35) / 100,
          pattern: ((cycle % 3) + 1) as 1 | 2 | 3,
        },
      ];
    }
    return icons.map((ic, idx) => ({
      uid: `${side}-${cycle}-${idx}-${ic.id}`,
      icon: ic,
      topPct:
        idx === 0
          ? 6 + Math.floor(Math.random() * 24) // nửa trên 6%..30%
          : 52 + Math.floor(Math.random() * 22), // nửa dưới 52%..74%
      leftPct: 8 + Math.floor(Math.random() * 36), // 8%..44%
      rotateDeg: Math.floor(Math.random() * 23) - 11,
      delaySec: (side === "R" ? 0.16 : 0) + idx * 0.28,
      durationSec: 2.1 + Math.round(Math.random() * 35) / 100,
      pattern: (((cycle + idx) % 3) + 1) as 1 | 2 | 3,
    }));
  };

  return {
    left: buildNodes(leftIcons, "L"),
    right: buildNodes(rightIcons, "R"),
    usedIds: [...leftIcons, ...rightIcons].map((i) => i.id),
  };
}

// Bảng xung nhịp PWM êm dịu theo nhịp bài hát (12 bước mỗi chu kỳ):
// 3 = Sáng rực (MAX), 2 = Sáng vừa (BRIGHT), 1 = Dịu nhẹ (DIM), 0 = Tắt hẳn (OFF)
// Giữ sáng nhiều nhịp rồi dịu xuống từ từ, chỉ nháy nhẹ 2 nhịp mỗi chu kỳ rồi tắt tối hẳn trước khi đổi hình
const CPP_LED_PWM_SEQ_0 = [1, 2, 3, 3, 2, 1, 2, 3, 2, 0, 0, 0] as const;
const CPP_LED_PWM_SEQ_1 = [0, 0, 1, 2, 3, 3, 2, 1, 2, 3, 1, 0] as const;

function computeCppLedStyle(
  node: SpawnedLedNode,
  idx: number,
  side: "L" | "R",
  tick: number,
): React.CSSProperties {
  const seq = idx === 0 ? CPP_LED_PWM_SEQ_0 : CPP_LED_PWM_SEQ_1;
  // Lệch pha 2 bước giữa bên Trái và bên Phải để 2 bên sáng luân phiên dịu mắt
  const stepIdx = (tick + (side === "R" ? 2 : 0)) % seq.length;
  const level = seq[stepIdx];

  let opacity = 0;
  let scale = 0.74;
  let filter = "brightness(0.15)";

  if (level === 3) {
    opacity = 1;
    scale = 1.1;
    filter = `brightness(1.38) drop-shadow(0 0 16px ${node.icon.glow})`;
  } else if (level === 2) {
    opacity = 0.94;
    scale = 1.02;
    filter = `brightness(1.22) drop-shadow(0 0 11px ${node.icon.glow})`;
  } else if (level === 1) {
    opacity = 0.16;
    scale = 0.88;
    filter = "brightness(0.42)";
  }

  return {
    top: `${node.topPct}%`,
    left: `${node.leftPct}%`,
    opacity,
    transform: `scale(${scale}) rotate(${node.rotateDeg}deg)`,
    filter,
  };
}

interface MelodyStep {
  word: string;
  note: number;
  dur: number;
  line: number;
}

interface KaraokeStanza {
  index: number;
  startTime: number;
  endTime: number;
  nextStanzaStart: number;
  lines: KaraokeLine[];
}

function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return "00:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/**
 * Gom các câu hát thành từng khổ (stanza) có từ 2 - 4 dòng.
 * Tự động ngắt khổ khi gặp đoạn nhạc dạo dài (> 7 giây).
 */
function groupLinesIntoStanzas(
  lines: KaraokeLine[],
  songDuration = 337,
): KaraokeStanza[] {
  if (!lines || lines.length === 0) return [];

  // Bước 1: Tách thành các cụm liền mạch (ngắt khi nghỉ nhạc dạo > 7s)
  const sections: KaraokeLine[][] = [];
  let currentSec: KaraokeLine[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    currentSec.push(line);
    const nextLine = lines[i + 1];
    if (nextLine && nextLine.startTime - line.endTime > 7.0 && currentSec.length >= 2) {
      sections.push(currentSec);
      currentSec = [];
    }
  }
  if (currentSec.length > 0) {
    sections.push(currentSec);
  }

  // Bước 2: Chia mỗi cụm thành các khổ 2 - 4 dòng
  const rawChunks: KaraokeLine[][] = [];
  for (const sec of sections) {
    let idx = 0;
    while (idx < sec.length) {
      const rem = sec.length - idx;
      let take = 4;
      if (rem <= 4) {
        take = rem;
      } else if (rem === 5 || rem === 6) {
        take = 3;
      } else {
        take = 4;
      }
      rawChunks.push(sec.slice(idx, idx + take));
      idx += take;
    }
  }

  return rawChunks.map((chunk, sIdx) => {
    const first = chunk[0];
    const last = chunk[chunk.length - 1];
    const nextChunk = rawChunks[sIdx + 1];
    return {
      index: sIdx,
      startTime: first.startTime,
      endTime: last.endTime,
      nextStanzaStart: nextChunk ? nextChunk[0].startTime : songDuration,
      lines: chunk,
    };
  });
}

export function MusicActivity({
  soundEnabled,
  onComplete,
  onReaction,
  onLessonIndexChange,
}: ActivityProps) {
  const [viewMode, setViewMode] = useState<
    | "module-select"
    | "karaoke-list"
    | "xylophone-list"
    | "xylophone-lesson"
    | "karaoke-player"
    | "band-stage"
  >("module-select");
  const [enteringHouse, setEnteringHouse] = useState<
    "karaoke" | "piano" | "concert" | null
  >(null);

  // --- STATE CHO LOẠI 1: HỌC NHẠC & ĐÁNH ĐÀN XYLOPHONE ---
  const [lessonIndex, setLessonIndex] = useState(0);
  const lessons = Array.isArray(musicLessons) ? musicLessons : [musicLessons];
  const lesson = (lessons[lessonIndex] || lessons[0]) as {
    id: string;
    title: string;
    shortTab?: string;
    level?: string;
    lines: string[];
    melody: MelodyStep[];
  };

  const melody: MelodyStep[] = lesson.melody || [];
  const totalSlides = lesson.lines.length;

  const [playingAuto, setPlayingAuto] = useState(false);
  const [stepIdx, setStepIdx] = useState<number>(0);
  const [activeKey, setActiveKey] = useState<number | null>(null);
  const [tapCount, setTapCount] = useState(0);

  // --- STATE CHO LOẠI 2: HÁT KARAOKE MP3 ---
  const [karaokeSongs, setKaraokeSongs] = useState<KaraokeSong[]>(
    DEFAULT_KARAOKE_SONGS,
  );
  const [selectedSongIdx, setSelectedSongIdx] = useState(0);
  const [isKaraokePlaying, setIsKaraokePlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLedStageFullscreen, setIsLedStageFullscreen] = useState(false);
  const [ledBatch, setLedBatch] = useState(() => spawnRandomLedPair(0, []));
  const [ledTick, setLedTick] = useState(0);
  const ledCycleRef = useRef(0);

  const audioRef = useRef<AudioContext | null>(null);
  const mp3AudioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastReactedLineRef = useRef<number>(-1);
  const completedRef = useRef(false);
  const speech = useSpeech(soundEnabled);

  // Cho phép bấm phím ESC để thoát chế độ Màn LED Rộng
  useEffect(() => {
    if (!isLedStageFullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLedStageFullscreen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isLedStageFullscreen]);

  const currentKaraokeSong =
    karaokeSongs[selectedSongIdx] ||
    karaokeSongs[0] ||
    DEFAULT_KARAOKE_SONGS[0];

  const stanzas = useMemo(
    () =>
      groupLinesIntoStanzas(
        currentKaraokeSong?.lines || [],
        duration || currentKaraokeSong?.duration || 337,
      ),
    [currentKaraokeSong, duration],
  );

  // Tải danh sách bài hát Karaoke từ D:\Nấm học\Karaoke (hoặc dùng bản đóng gói sẵn trên Vercel)
  useEffect(() => {
    let cancelled = false;
    fetch("/api/karaoke-songs")
      .then((res) => {
        const ct = res.headers.get("content-type") || "";
        return res.ok && ct.includes("application/json") ? res.json() : null;
      })
      .then((data) => {
        if (
          !cancelled &&
          data &&
          Array.isArray(data.songs) &&
          data.songs.length > 0
        ) {
          setKaraokeSongs(data.songs);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    onLessonIndexChange?.(lessonIndex);
  }, [lessonIndex]);

  // Đồng bộ 60fps để màu chữ quét mượt theo nhạc
  useEffect(() => {
    if (viewMode !== "karaoke-player" || !isKaraokePlaying) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    const updateTick = () => {
      const el = mp3AudioRef.current;
      if (el && !el.paused) {
        setCurrentTime(el.currentTime);
      }
      rafRef.current = requestAnimationFrame(updateTick);
    };

    rafRef.current = requestAnimationFrame(updateTick);
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [viewMode, isKaraokePlaying]);

  useEffect(() => {
    if (mp3AudioRef.current) {
      mp3AudioRef.current.muted = !soundEnabled;
    }
  }, [soundEnabled]);

  // Tìm khổ (stanza) hiện tại
  let activeStanzaIdx = 0;
  for (let i = 0; i < stanzas.length; i++) {
    const st = stanzas[i];
    // Chuyển sang khổ tiếp theo trước 1.2s khi đã hát xong khổ trước
    if (i === 0 || currentTime >= st.startTime - 1.2) {
      activeStanzaIdx = i;
    } else {
      break;
    }
  }

  // Nếu đã hát xong khổ hiện tại và đang trong đoạn nhạc dạo chờ khổ kế tiếp, hiển thị luôn khổ kế tiếp để bé chuẩn bị
  const rawStanza = stanzas[activeStanzaIdx] || stanzas[0] || null;
  if (
    rawStanza &&
    activeStanzaIdx + 1 < stanzas.length &&
    currentTime > rawStanza.endTime + 1.0
  ) {
    activeStanzaIdx = activeStanzaIdx + 1;
  }

  const currentStanza = stanzas[activeStanzaIdx] || stanzas[0] || null;

  // Tìm câu đang hát để nhân vật nhún nhảy theo
  const kLines = currentKaraokeSong?.lines || [];
  let activeLineIdx = -1;
  for (let i = 0; i < kLines.length; i++) {
    if (currentTime >= kLines[i].startTime - 0.15) {
      activeLineIdx = i;
    } else {
      break;
    }
  }

  const isWaitingForStanza =
    currentStanza !== null && currentTime < currentStanza.startTime - 0.3;
  const secondsUntilStanza = currentStanza
    ? Math.max(0, Math.ceil(currentStanza.startTime - currentTime))
    : 0;

  // Thời lượng Intro đầu bài (13 giây nằm trong khoảng 10-15s):
  // - Trong 13s đầu bài: hiện màn hình Intro (Tên bài hát + Ca sỹ) kèm 2 dải LED dài chạy dọc.
  // - Sau 13s đến hết bài (kể cả phần Outro cuối bài): tắt dải LED dài, chỉ dùng Icon Neon nhấp nháy theo nhịp hát.
  const INTRO_LED_DURATION_SEC = 13;
  const firstLineStartTime = kLines.length > 0 ? kLines[0].startTime : 14;
  const isIntroLedStripActive = currentTime < INTRO_LED_DURATION_SEC;
  const introFullCardEndTime =
    firstLineStartTime >= INTRO_LED_DURATION_SEC
      ? INTRO_LED_DURATION_SEC
      : Math.max(6.8, firstLineStartTime - 0.6);
  const isShowingFullIntroCard = currentTime < introFullCardEndTime;
  const isShowingIntroTopPill =
    !isShowingFullIntroCard && currentTime < INTRO_LED_DURATION_SEC;

  // Đo nhịp điệu (rhythm) của câu đang hát để tự động điều chỉnh tốc độ nhấp nháy LED:
  // - Đang tạm dừng hoặc đoạn nhạc dạo: rất chậm, êm dịu (720ms / nhịp)
  // - Đoạn hát ngân dài, trữ tình (< 2.2 từ/s): chậm rãi (580ms / nhịp)
  // - Đoạn hát nhịp vừa (2.2 - 3.3 từ/s): nhịp nhàng vừa phải (450ms / nhịp)
  // - Đoạn điệp khúc nhanh, sôi động (> 3.3 từ/s): vui tươi hơn (340ms / nhịp)
  const activeLineObj = activeLineIdx >= 0 ? kLines[activeLineIdx] : null;
  const isActivelySingingLine =
    isKaraokePlaying &&
    !isWaitingForStanza &&
    activeLineObj !== null &&
    currentTime >= activeLineObj.startTime - 0.15 &&
    currentTime <= activeLineObj.endTime + 0.6;

  let ledStepMs = 720;
  if (isActivelySingingLine && activeLineObj) {
    const lineDur = Math.max(
      0.8,
      activeLineObj.endTime - activeLineObj.startTime,
    );
    const wordsPerSec = (activeLineObj.words?.length || 4) / lineDur;
    if (wordsPerSec >= 3.3) {
      ledStepMs = 340;
    } else if (wordsPerSec >= 2.2) {
      ledStepMs = 450;
    } else {
      ledStepMs = 580;
    }
  }

  useEffect(() => {
    if (viewMode !== "karaoke-player") return;
    const timer = window.setInterval(() => {
      setLedTick((prevTick) => {
        const nextTick = (prevTick + 1) % 12;
        if (nextTick === 0) {
          ledCycleRef.current += 1;
          setLedBatch((prevBatch) =>
            spawnRandomLedPair(ledCycleRef.current, prevBatch.usedIds),
          );
        }
        return nextTick;
      });
    }, ledStepMs);
    return () => window.clearInterval(timer);
  }, [viewMode, ledStepMs]);

  useEffect(() => {
    if (viewMode !== "karaoke-player" || !isKaraokePlaying) return;
    if (activeLineIdx >= 0 && activeLineIdx !== lastReactedLineRef.current) {
      lastReactedLineRef.current = activeLineIdx;
      const lineObj = kLines[activeLineIdx];
      if (lineObj) {
        onReaction?.("singing", `🎤 "${lineObj.text}" 🎶`);
      }
    }
  }, [activeLineIdx, viewMode, isKaraokePlaying]);

  const currentStep = melody[stepIdx] || melody[0];
  const currentSlide = currentStep ? currentStep.line : 0;

  function goToSlide(slideIndex: number) {
    const clamped = Math.max(0, Math.min(totalSlides - 1, slideIndex));
    const firstStepOfSlide = melody.findIndex((m) => m.line === clamped);
    if (firstStepOfSlide >= 0) {
      setStepIdx(firstStepOfSlide);
    }
  }

  function playMusicBoxNote(noteIdx: number, playChord = true) {
    if (!soundEnabled || !window.AudioContext) return;
    try {
      const ctx = audioRef.current ?? new AudioContext();
      audioRef.current = ctx;
      if (ctx.state === "suspended") void ctx.resume().catch(() => {});

      const key = NOTE_KEYS[noteIdx % NOTE_KEYS.length];
      const now = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainMain = ctx.createGain();

      osc1.type = "triangle";
      osc1.frequency.setValueAtTime(key.freq, now);

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(key.freq * 2, now);

      const gainOvertone = ctx.createGain();
      gainOvertone.gain.setValueAtTime(0.08, now);
      gainOvertone.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      gainMain.gain.setValueAtTime(0.001, now);
      gainMain.gain.linearRampToValueAtTime(0.28, now + 0.015);
      gainMain.gain.exponentialRampToValueAtTime(0.001, now + 0.48);

      osc1.connect(gainMain);
      osc2.connect(gainOvertone);
      gainOvertone.connect(gainMain);
      gainMain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.5);
      osc2.stop(now + 0.5);

      if (playChord) {
        const bassOsc = ctx.createOscillator();
        const bassGain = ctx.createGain();
        bassOsc.type = "sine";
        bassOsc.frequency.setValueAtTime(key.bass, now);
        bassGain.gain.setValueAtTime(0.001, now);
        bassGain.gain.linearRampToValueAtTime(0.11, now + 0.02);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
        bassOsc.connect(bassGain);
        bassGain.connect(ctx.destination);
        bassOsc.start(now);
        bassOsc.stop(now + 0.45);
      }
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    if (!playingAuto || melody.length === 0) return;

    const current = melody[stepIdx] || melody[0];
    setActiveKey(current.note);
    playMusicBoxNote(current.note, true);

    const lineText = lesson.lines[current.line] || lesson.title;
    onReaction?.("singing", `🎶 "${lineText}" 🎤`);

    const timer = window.setTimeout(() => {
      if (stepIdx + 1 < melody.length) {
        setStepIdx((s) => s + 1);
      } else {
        setPlayingAuto(false);
        setActiveKey(null);
        onReaction?.(
          "happy",
          `Hoan hô! Nấm và Cinnamoroll vừa hát xong bài "${lesson.title}"! 🎶`,
        );
      }
    }, current.dur || 450);

    return () => window.clearTimeout(timer);
  }, [playingAuto, stepIdx, lessonIndex]);

  useEffect(() => {
    return () => {
      if (audioRef.current) void audioRef.current.close().catch(() => {});
      if (mp3AudioRef.current) {
        mp3AudioRef.current.pause();
      }
    };
  }, []);

  function handleTapKey(noteIdx: number) {
    speech.stop();
    setPlayingAuto(false);
    setActiveKey(noteIdx);
    playMusicBoxNote(noteIdx, true);
    setTapCount((c) => c + 1);

    if (currentStep && noteIdx === currentStep.note) {
      const nextIdx = (stepIdx + 1) % melody.length;
      setStepIdx(nextIdx);
      if (stepIdx + 1 === melody.length) {
        onReaction?.(
          "happy",
          `Giỏi quá! Nấm vừa tự đánh đàn xong cả bài "${lesson.title}"! 🎹🌟`,
        );
      } else {
        const lineText = lesson.lines[currentStep.line] || lesson.title;
        onReaction?.("singing", `🎤 "${lineText}" 🎵`);
      }
    } else {
      onReaction?.(
        "singing",
        `🎵 Nốt ${NOTE_KEYS[noteIdx].name}! Bấm phím "${NOTE_KEYS[currentStep?.note || 0].name}" để đàn chữ "${currentStep?.word}" nhé!`,
      );
    }
  }

  function startAutoPlay() {
    speech.stop();
    if (playingAuto) {
      setPlayingAuto(false);
      setActiveKey(null);
      onReaction?.("idle", "");
    } else {
      setStepIdx(0);
      setPlayingAuto(true);
    }
  }

  function toggleKaraokePlay() {
    const el = mp3AudioRef.current;
    if (!el) return;
    speech.stop();
    if (el.paused) {
      void el.play().catch(() => {});
    } else {
      el.pause();
    }
  }

  function seekKaraokeTo(timeSec: number, autoPlay = true) {
    const el = mp3AudioRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(duration || 340, timeSec));
    el.currentTime = clamped;
    setCurrentTime(clamped);
    if (autoPlay && el.paused) {
      void el.play().catch(() => {});
    }
  }

  function complete(modeLabel?: string) {
    if (completedRef.current) return;
    completedRef.current = true;
    setPlayingAuto(false);
    if (mp3AudioRef.current) {
      mp3AudioRef.current.pause();
    }
    onReaction?.("happy", "Hoan hô ca sĩ nhí Nấm hát hay quá!");
    onComplete({
      attempts: 1,
      answers: [
        modeLabel ||
          (viewMode === "karaoke-player"
            ? `Hát Karaoke bài ${currentKaraokeSong.title}`
            : `Đàn bài ${lesson.title} (${tapCount} nốt)`),
      ],
    });
  }

  const slideSteps = melody
    .map((m, idx) => ({ ...m, idx }))
    .filter((m) => m.line === currentSlide);

  const SONG_COLORS = ["#FF6B81", "#FFA502", "#2ED573", "#1E90FF"];
  const SONG_TOPICS = ["Chủ đề Toán Hát", "Chủ đề Gia Đình", "Chủ đề Vui Nhộn"];

  return (
    <div className="wb-content music-wb">
      {/* =====================================================================
          THANH 3 MODULE HỌC HÁT ĐẨY LÊN TRÊN CÙNG (KHÔNG NẰM TRONG BẢNG)
          - Khi mới vào (viewMode === "module-select"): Chỉ hiện 3 module ở trên, không hiện danh sách bên trong bảng.
          - Khi chọn 1 module: Mở nội dung module đó.
         ===================================================================== */}
      {(viewMode === "module-select" ||
        viewMode === "karaoke-list" ||
        viewMode === "xylophone-list") && (
        <div
          className={`lesson-picker-screen music-dual-menu ${
            viewMode === "module-select" ? "music-3-zones-hub" : ""
          }`}
        >
          {viewMode === "module-select" ? (
            <div
              className="hub-3d-panorama-stage music-hub-stage"
              style={{
                backgroundImage: `url("/assets/canva/music-hub-bg.png")`,
              }}
            >
              <div className="hub-3d-houses-layer">
                {/* NHÀ 1 (TRÁI): PHÒNG KARAOKE */}
                <button
                  type="button"
                  className={`hub-3d-house-btn house-left ${
                    enteringHouse === "karaoke" ? "is-entering" : ""
                  }`}
                  onClick={() => {
                    if (enteringHouse) return;
                    setEnteringHouse("karaoke");
                    playMusicBoxNote(0, true);
                    if (soundEnabled) {
                      speech.speak(
                        "Chào mừng Nấm vào Phòng Karaoke! Con chọn bài hát mình thích để hát cùng đèn LED nhé!",
                        "vi-VN",
                      );
                    }
                    window.setTimeout(() => {
                      setEnteringHouse(null);
                      setViewMode("karaoke-list");
                    }, 380);
                  }}
                  aria-label="Phòng Karaoke"
                >
                  <img
                    src="/assets/canva/music-house-karaoke.png"
                    alt="Phòng Karaoke"
                    className="hub-3d-house-img"
                    draggable={false}
                  />
                </button>

                {/* NHÀ 2 (GIỮA): PHÒNG ĐÁNH ĐÀN */}
                <button
                  type="button"
                  className={`hub-3d-house-btn house-center ${
                    enteringHouse === "piano" ? "is-entering" : ""
                  }`}
                  onClick={() => {
                    if (enteringHouse) return;
                    setEnteringHouse("piano");
                    playMusicBoxNote(2, true);
                    if (soundEnabled) {
                      speech.speak(
                        "Chào mừng Nấm vào Phòng Đánh Đàn! Mình cùng gõ đàn Xylophone 7 nốt nhạc nhé!",
                        "vi-VN",
                      );
                    }
                    window.setTimeout(() => {
                      setEnteringHouse(null);
                      setViewMode("xylophone-list");
                    }, 380);
                  }}
                  aria-label="Phòng Đánh Đàn"
                >
                  <img
                    src="/assets/canva/music-house-piano.png"
                    alt="Phòng Đánh Đàn"
                    className="hub-3d-house-img"
                    draggable={false}
                  />
                </button>

                {/* NHÀ 3 (PHẢI): SÂN KHẤU CONCERT */}
                <button
                  type="button"
                  className={`hub-3d-house-btn house-right ${
                    enteringHouse === "concert" ? "is-entering" : ""
                  }`}
                  onClick={() => {
                    if (enteringHouse) return;
                    setEnteringHouse("concert");
                    playMusicBoxNote(4, true);
                    setPlayingAuto(false);
                    if (mp3AudioRef.current) {
                      mp3AudioRef.current.pause();
                    }
                    setIsKaraokePlaying(false);
                    onReaction?.(
                      "singing",
                      "🎪 Chào mừng Nấm đến Sân Khấu Concert 3D! Nấm bấm Thu Âm Giọng Hát để 5 bạn tạo nhạc đệm hát cùng Nấm nhé!",
                    );
                    window.setTimeout(() => {
                      setEnteringHouse(null);
                      setViewMode("band-stage");
                    }, 380);
                  }}
                  aria-label="Sân Khấu Concert"
                >
                  <img
                    src="/assets/canva/music-house-concert.png"
                    alt="Sân Khấu Concert"
                    className="hub-3d-house-img"
                    draggable={false}
                  />
                </button>
              </div>
            </div>
          ) : (
            <div
              className="music-mode-switcher music-top-module-bar"
              role="tablist"
              aria-label="Chọn học phần Âm Nhạc"
            >
              <button
                type="button"
                className="music-mode-tab"
                onClick={() => setViewMode("module-select")}
              >
                <ArrowLeft size={16} />
                <span>3 Khu Âm Nhạc</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === "karaoke-list"}
                className={`music-mode-tab karaoke-tab ${
                  viewMode === "karaoke-list" ? "active" : ""
                }`}
                onClick={() => setViewMode("karaoke-list")}
              >
                <Mic size={18} />
                <span>🎤 Phòng Karaoke</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === "xylophone-list"}
                className={`music-mode-tab xylo-tab ${
                  viewMode === "xylophone-list" ? "active" : ""
                }`}
                onClick={() => setViewMode("xylophone-list")}
              >
                <Music size={18} />
                <span>🎹 Phòng Đánh Đàn</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={false}
                className="music-mode-tab band-stage-tab"
                onClick={() => {
                  setPlayingAuto(false);
                  if (mp3AudioRef.current) {
                    mp3AudioRef.current.pause();
                  }
                  setIsKaraokePlaying(false);
                  setViewMode("band-stage");
                  onReaction?.(
                    "singing",
                    "🎪 Chào mừng Nấm đến Sân Khấu Concert 3D! Nấm bấm Thu Âm Giọng Hát để 5 bạn tạo nhạc đệm hát cùng Nấm nhé!",
                  );
                }}
              >
                <Sparkles size={18} />
                <span>🎪 Sân Khấu Concert</span>
              </button>
            </div>
          )}

          {viewMode === "karaoke-list" && (
            <div className="wb-lesson-list karaoke-song-list">
              {karaokeSongs.map((song, idx) => (
                <button
                  key={song.id}
                  type="button"
                  className="wb-lesson-row karaoke-song-row"
                  style={
                    {
                      "--cluster-accent": "#FF477E",
                    } as React.CSSProperties
                  }
                  onClick={() => {
                    setSelectedSongIdx(idx);
                    setCurrentTime(0);
                    setDuration(song.duration || 337);
                    lastReactedLineRef.current = -1;
                    setViewMode("karaoke-player");
                    onReaction?.(
                      "singing",
                      `🎤 Nấm cùng hát Karaoke bài "${song.title}" nhé! Chữ đổi màu tới đâu mình hát tới đó nha!`,
                    );
                  }}
                >
                  {song.thumbUrl ? (
                    <img
                      src={song.thumbUrl}
                      alt={song.title}
                      className="karaoke-row-thumb"
                    />
                  ) : (
                    <span className="wb-row-icon">🎤🎵</span>
                  )}
                  <span className="wb-row-badge karaoke-badge">
                    KARAOKE · {formatTime(song.duration)}
                  </span>
                  <div className="karaoke-row-text">
                    <strong className="wb-row-title">
                      Bài hát: {song.title}
                    </strong>
                    <span className="karaoke-row-artist">
                      {song.artist}
                    </span>
                  </div>
                  <span className="wb-row-go karaoke-go-btn">
                    🎤 Vào Hát ▶
                  </span>
                </button>
              ))}

              <div className="karaoke-folder-hint">
                💡 Bố/Mẹ bỏ thêm file <strong>.mp3</strong> vào{" "}
                <code>D:\Nấm học\Karaoke</code> để Nấm hát nhé!
              </div>
            </div>
          )}

          {viewMode === "xylophone-list" && (
            <div className="wb-lesson-list">
              {lessons.map((item: any, idx: number) => (
                <button
                  key={item.id}
                  type="button"
                  className="wb-lesson-row"
                  style={
                    {
                      "--cluster-accent": SONG_COLORS[idx % SONG_COLORS.length],
                    } as React.CSSProperties
                  }
                  onClick={() => {
                    setPlayingAuto(false);
                    setLessonIndex(idx);
                    setStepIdx(0);
                    setActiveKey(null);
                    setViewMode("xylophone-lesson");
                  }}
                >
                  <span className="wb-row-icon">
                    {SONG_ICONS[idx % SONG_ICONS.length]}
                  </span>
                  <span className="wb-row-badge">
                    {SONG_TOPICS[idx % SONG_TOPICS.length]}
                  </span>
                  <strong className="wb-row-title">
                    Bài {idx + 1}: {item.title}
                  </strong>
                  <span className="wb-row-go">Vào đàn ▶</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          BƯỚC 2A: MÀN HÌNH KARAOKE ĐƠN GIẢN (1 KHỔ 2-4 DÒNG, CHỮ 1 MÀU ĐỔI MÀU KHI HÁT)
         ===================================================================== */}
      {viewMode === "karaoke-player" && currentKaraokeSong && (
        <div
          className={`karaoke-mp3-stage ${
            isLedStageFullscreen ? "karaoke-led-stage-fullscreen" : ""
          } ${isKaraokePlaying ? "is-playing-led" : ""}`}
        >
          <audio
            ref={mp3AudioRef}
            src={currentKaraokeSong.audioUrl}
            preload="auto"
            autoPlay
            muted={!soundEnabled}
            onPlay={() => setIsKaraokePlaying(true)}
            onPause={() => setIsKaraokePlaying(false)}
            onLoadedMetadata={(e) => {
              const d = e.currentTarget.duration;
              if (Number.isFinite(d) && d > 0) {
                setDuration(d);
              }
            }}
            onTimeUpdate={(e) => {
              setCurrentTime(e.currentTarget.currentTime);
            }}
            onEnded={() => {
              setIsKaraokePlaying(false);
              onReaction?.(
                "happy",
                `Hoan hô! Ca sĩ Nấm vừa hát xong bài "${currentKaraokeSong.title}"! 🎤🌟`,
              );
            }}
          />

          {/* Màn hình Karaoke 1 khổ 2-4 dòng + 2 cột đèn LED Neon nhấp nháy hai bên */}
          <div className="karaoke-simple-screen">
            {/* Thanh tiêu đề nhỏ gọn + chuyển khổ + nút bỏ qua nhạc dạo + nút Toàn màn hình LED */}
            <div className="karaoke-screen-header">
              <span className="karaoke-screen-title">
                🎵 {currentKaraokeSong.title} ·{" "}
                {isShowingFullIntroCard
                  ? `Intro (${Math.max(1, Math.ceil(introFullCardEndTime - currentTime))}s)`
                  : `Khổ ${activeStanzaIdx + 1}/${stanzas.length}`}
              </span>

              <div className="karaoke-header-right">
                {isWaitingForStanza && secondsUntilStanza > 0 && (
                  <div className="karaoke-wait-pill">
                    <span>
                      {secondsUntilStanza <= 3
                        ? `Đếm ngược: ${secondsUntilStanza}...`
                        : `Nhạc dạo (${secondsUntilStanza}s)`}
                    </span>
                    {secondsUntilStanza > 3 && currentStanza && (
                      <button
                        type="button"
                        className="karaoke-skip-wait-btn"
                        onClick={() =>
                          seekKaraokeTo(
                            Math.max(0, currentStanza.startTime - 1.0),
                            true,
                          )
                        }
                      >
                        <FastForward size={12} /> Qua nhạc dạo
                      </button>
                    )}
                  </div>
                )}

                <button
                  type="button"
                  className={`karaoke-led-fullscreen-btn ${
                    isLedStageFullscreen ? "active" : ""
                  }`}
                  onClick={() => setIsLedStageFullscreen((prev) => !prev)}
                  title={
                    isLedStageFullscreen
                      ? "Thu về khung bảng học"
                      : "Mở Màn Hình LED Karaoke Toàn Màn Hình"
                  }
                >
                  {isLedStageFullscreen ? (
                    <>
                      <Minimize2 size={13} />
                      <span>Thu màn LED</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={13} />
                      <span>Màn LED Rộng</span>
                    </>
                  )}
                </button>

                <div className="karaoke-stanza-nav-group">
                  <button
                    type="button"
                    className="karaoke-stanza-nav-btn"
                    disabled={activeStanzaIdx <= 0}
                    onClick={() => {
                      const prevSt = stanzas[Math.max(0, activeStanzaIdx - 1)];
                      if (prevSt) seekKaraokeTo(prevSt.startTime, true);
                    }}
                    title="Khổ trước"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    className="karaoke-stanza-nav-btn"
                    disabled={activeStanzaIdx >= stanzas.length - 1}
                    onClick={() => {
                      const nextSt =
                        stanzas[
                          Math.min(stanzas.length - 1, activeStanzaIdx + 1)
                        ];
                      if (nextSt) seekKaraokeTo(nextSt.startTime, true);
                    }}
                    title="Khổ tiếp theo"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Khung thân màn hình Karaoke: Cột LED Trái + Lời bài hát giữa + Cột LED Phải */}
            <div className="karaoke-stanza-body">
              {/* VÙNG LED NEON BÊN TRÁI (Chỉ hiển thị ở chế độ Phóng to):
                  - Trong 13s Intro đầu bài: chạy dải LED dài trượt dọc liên tục
                  - Sau 13s đến hết bài (kể cả phần Outro cuối bài): hiện Icon Neon nhấp nháy theo nhịp hát */}
              <div className="karaoke-led-wing left-wing" aria-hidden="true">
                {isIntroLedStripActive ? (
                  <div className="led-long-strip-viewport">
                    <div className="led-long-strip-track scroll-up">
                      <img
                        src="/assets/karaoke-led/led-strip-left.png"
                        alt=""
                        className="led-long-strip-img"
                      />
                      <img
                        src="/assets/karaoke-led/led-strip-left.png"
                        alt=""
                        className="led-long-strip-img"
                      />
                    </div>
                  </div>
                ) : (
                  ledBatch.left.map((node, idx) => (
                    <div
                      key={node.uid}
                      className="led-random-node"
                      style={computeCppLedStyle(node, idx, "L", ledTick)}
                    >
                      <img
                        src={node.icon.src}
                        alt={node.icon.label}
                        className="led-neon-icon-img"
                      />
                    </div>
                  ))
                )}
              </div>

              {/* CỘT CHÍNH GIỮA: MÀN HÌNH INTRO (TÊN BÀI HÁT + CA SỸ TRONG 10-15S ĐẦU) HOẶC LỜI BÀI HÁT */}
              <div className="karaoke-stanza-center">
                <div className="karaoke-top-neon-dots" aria-hidden="true">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <span
                      key={i}
                      className="karaoke-eq-pill"
                      style={{ "--eq-idx": i } as React.CSSProperties}
                    />
                  ))}
                </div>

                {isShowingFullIntroCard ? (
                  <div className="karaoke-intro-showcase">
                    <span className="karaoke-intro-tag">
                      ✨ KARAOKE INTRO · SÂN KHẤU CA NHẠC ✨
                    </span>

                    <div className="karaoke-intro-main-row">
                      {currentKaraokeSong.thumbUrl && (
                        <img
                          src={currentKaraokeSong.thumbUrl}
                          alt={currentKaraokeSong.title}
                          className="karaoke-intro-cover"
                        />
                      )}
                      <div className="karaoke-intro-meta">
                        <h3 className="karaoke-intro-song-title">
                          {currentKaraokeSong.title}
                        </h3>
                        <p className="karaoke-intro-artist">
                          🎤 Ca sĩ: <strong>{currentKaraokeSong.artist}</strong>
                        </p>
                      </div>
                    </div>

                    {kLines[0] && (
                      <div className="karaoke-intro-next-preview">
                        <span>🎶 Câu đầu: "{kLines[0].text}"</span>
                        <button
                          type="button"
                          className="karaoke-intro-skip-btn"
                          onClick={() =>
                            seekKaraokeTo(
                              Math.max(0, firstLineStartTime - 1.0),
                              true,
                            )
                          }
                        >
                          <FastForward size={13} /> Vào hát ngay
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="karaoke-stanza-lines">
                    {isShowingIntroTopPill && (
                      <div className="karaoke-intro-mini-banner">
                        <strong>🎵 {currentKaraokeSong.title}</strong>
                        <span>— {currentKaraokeSong.artist}</span>
                      </div>
                    )}
                    {currentStanza?.lines.map((line) => (
                      <div
                        key={line.id}
                        className="karaoke-stanza-line"
                        onClick={() => seekKaraokeTo(line.startTime, true)}
                        title="Bấm để hát từ dòng này"
                      >
                        {line.words.map((wObj, wIdx) => {
                          const wordDur = Math.max(0.08, wObj.end - wObj.start);
                          let fillPct = 0;
                          if (currentTime >= wObj.end) {
                            fillPct = 100;
                          } else if (currentTime > wObj.start) {
                            fillPct = Math.min(
                              100,
                              Math.max(
                                0,
                                Math.round(
                                  ((currentTime - wObj.start) / wordDur) * 100,
                                ),
                              ),
                            );
                          }

                          return (
                            <span
                              key={wIdx}
                              className="karaoke-plain-word"
                              style={
                                {
                                  "--fill-pct": `${fillPct}%`,
                                } as React.CSSProperties
                              }
                            >
                              {wObj.word}
                            </span>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}

                <div className="karaoke-bottom-neon-dots" aria-hidden="true">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <span
                      key={i}
                      className="karaoke-eq-pill"
                      style={{ "--eq-idx": 11 - i } as React.CSSProperties}
                    />
                  ))}
                </div>
              </div>

              {/* VÙNG LED NEON BÊN PHẢI (Chỉ hiển thị ở chế độ Phóng to):
                  - Trong 13s Intro đầu bài: chạy dải LED dài trượt dọc liên tục
                  - Sau 13s đến hết bài (kể cả phần Outro cuối bài): hiện Icon Neon nhấp nháy theo nhịp hát */}
              <div className="karaoke-led-wing right-wing" aria-hidden="true">
                {isIntroLedStripActive ? (
                  <div className="led-long-strip-viewport">
                    <div className="led-long-strip-track scroll-down">
                      <img
                        src="/assets/karaoke-led/led-strip-right.png"
                        alt=""
                        className="led-long-strip-img"
                      />
                      <img
                        src="/assets/karaoke-led/led-strip-right.png"
                        alt=""
                        className="led-long-strip-img"
                      />
                    </div>
                  </div>
                ) : (
                  ledBatch.right.map((node, idx) => (
                    <div
                      key={node.uid}
                      className="led-random-node"
                      style={computeCppLedStyle(node, idx, "R", ledTick)}
                    >
                      <img
                        src={node.icon.src}
                        alt={node.icon.label}
                        className="led-neon-icon-img"
                      />
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Thanh tiến trình thời gian giống chuẩn video Karaoke */}
            <div className="karaoke-progress-bar-row">
              <span className="karaoke-time-label">
                {formatTime(currentTime)} /{" "}
                {formatTime(duration || currentKaraokeSong.duration)}
              </span>
              <input
                type="range"
                min={0}
                max={duration || currentKaraokeSong.duration || 337}
                step={0.1}
                value={currentTime}
                onChange={(e) =>
                  seekKaraokeTo(parseFloat(e.target.value), false)
                }
                className="karaoke-red-slider"
                aria-label="Thanh tua nhạc Karaoke"
              />
            </div>
          </div>

          {/* Hàng nút điều khiển phía dưới */}
          <div className="wb-actions-row">
            <button
              type="button"
              className="chunky-btn chunky-pink btn-sm"
              onClick={() => {
                if (mp3AudioRef.current) {
                  mp3AudioRef.current.pause();
                }
                setIsKaraokePlaying(false);
                setIsLedStageFullscreen(false);
                onReaction?.("idle", "");
                setViewMode("karaoke-list");
              }}
            >
              <ArrowLeft size={14} /> Bài khác
            </button>

            <button
              type="button"
              className={`chunky-btn ${
                isKaraokePlaying ? "chunky-pink" : "chunky-orange"
              } btn-sm`}
              onClick={toggleKaraokePlay}
            >
              {isKaraokePlaying ? <Pause size={15} /> : <Play size={15} />}
              {isKaraokePlaying ? "Tạm dừng" : "▶ Phát nhạc"}
            </button>

            <button
              type="button"
              className="chunky-btn chunky-blue btn-sm"
              onClick={() => {
                const firstStart =
                  kLines.length > 0 ? Math.max(0, kLines[0].startTime - 1.2) : 0;
                seekKaraokeTo(firstStart, true);
              }}
            >
              <RotateCcw size={14} /> Hát lại
            </button>

            {isLedStageFullscreen && (
              <button
                type="button"
                className="chunky-btn chunky-gold btn-sm"
                onClick={() => setIsLedStageFullscreen(false)}
                title="Thu nhỏ màn LED rộng về bảng học"
              >
                <Minimize2 size={14} /> Thu màn LED
              </button>
            )}

            <button
              type="button"
              className="chunky-btn chunky-green btn-sm"
              onClick={() =>
                complete(`Hát Karaoke bài ${currentKaraokeSong.title}`)
              }
            >
              <Star size={15} fill="currentColor" /> Con hát xong!
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          BƯỚC 2B: MÀN HÌNH HỌC NHẠC & ĐÁNH ĐÀN XYLOPHONE (NHƯ HIỆN CÓ)
         ===================================================================== */}
      {viewMode === "xylophone-lesson" && (
        <div className="music-clean-stage">
          <div className="music-slide-stage">
            <button
              type="button"
              className="music-slide-arrow"
              disabled={currentSlide <= 0}
              onClick={() => {
                setPlayingAuto(false);
                goToSlide(currentSlide - 1);
              }}
              title="Câu hát trước"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="music-slide-card">
              <div className="music-slide-badge-row">
                <span className="music-slide-counter">
                  🎼 {lesson.title} · Câu {currentSlide + 1}/{totalSlides}
                </span>
                <div className="music-slide-right-tools">
                  <div className="music-slide-dots">
                    {lesson.lines.map((_, sIdx) => (
                      <button
                        key={sIdx}
                        type="button"
                        className={`music-slide-dot ${
                          sIdx === currentSlide ? "active" : ""
                        }`}
                        onClick={() => {
                          setPlayingAuto(false);
                          goToSlide(sIdx);
                        }}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    className="slide-mini-listen-btn"
                    onClick={() => {
                      setPlayingAuto(false);
                      onReaction?.(
                        "singing",
                        `🎤 "${lesson.lines[currentSlide]}" 🎶`,
                      );
                      speech.speak(
                        lesson.lines[currentSlide] || lesson.title,
                        "vi-VN",
                      );
                    }}
                  >
                    <Volume2 size={12} /> Đọc mẫu
                  </button>
                </div>
              </div>

              <div className="karaoke-lyric-row single-slide-row">
                {slideSteps.map((item) => {
                  const isCurrent = item.idx === stepIdx;
                  const noteInfo = NOTE_KEYS[item.note % NOTE_KEYS.length];
                  return (
                    <button
                      key={item.idx}
                      type="button"
                      className={`karaoke-word-chip slide-big-chip ${
                        isCurrent ? "active" : ""
                      }`}
                      onClick={() => {
                        setPlayingAuto(false);
                        setStepIdx(item.idx);
                        setActiveKey(item.note);
                        playMusicBoxNote(item.note, true);
                        onReaction?.(
                          "singing",
                          `🎤 "${lesson.lines[currentSlide]}" 🎶`,
                        );
                      }}
                    >
                      <span
                        className="karaoke-note-tag"
                        style={{ backgroundColor: noteInfo.color }}
                      >
                        {noteInfo.name}
                      </span>
                      <span className="karaoke-word-text">{item.word}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              className="music-slide-arrow"
              disabled={currentSlide >= totalSlides - 1}
              onClick={() => {
                setPlayingAuto(false);
                goToSlide(currentSlide + 1);
              }}
              title="Câu hát tiếp theo"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="wb-xylo-row guided-xylo-row">
            {NOTE_KEYS.map((keyItem, i) => {
              const isTarget = currentStep && currentStep.note === i;
              const isPressed = activeKey === i;
              return (
                <button
                  key={keyItem.name}
                  type="button"
                  className={`wb-xylo-key ${isTarget ? "target-glow" : ""} ${
                    isPressed ? "pressed-pop" : ""
                  }`}
                  style={{ backgroundColor: keyItem.color }}
                  onClick={() => handleTapKey(i)}
                >
                  {isTarget && (
                    <span className="xylo-guide-bubble">
                      👇 {currentStep.word.replace(/[,!]/g, "")}
                    </span>
                  )}
                  <span className="xylo-key-name">{keyItem.name}</span>
                </button>
              );
            })}
          </div>

          <div className="wb-actions-row">
            <button
              type="button"
              className="chunky-btn chunky-pink btn-sm"
              onClick={() => {
                speech.stop();
                setPlayingAuto(false);
                onReaction?.("idle", "");
                setViewMode("xylophone-list");
              }}
            >
              <ArrowLeft size={14} /> Bài hát khác
            </button>
            <button
              type="button"
              className={`chunky-btn ${
                playingAuto ? "chunky-pink" : "chunky-orange"
              } btn-sm`}
              onClick={startAutoPlay}
            >
              {playingAuto ? <Pause size={15} /> : <Play size={15} />}
              {playingAuto ? "Dừng nhạc" : "🎵 Phát Nhạc Cả Bài"}
            </button>
            <button
              type="button"
              className="chunky-btn chunky-blue btn-sm"
              onClick={() => {
                setPlayingAuto(false);
                setStepIdx(0);
                setActiveKey(null);
              }}
            >
              <RotateCcw size={14} /> Đàn từ đầu
            </button>
            <button
              type="button"
              className="chunky-btn chunky-green btn-sm"
              onClick={() => complete()}
            >
              <Star size={15} fill="currentColor" /> Con hát xong!
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          BƯỚC 2C: SÂN KHẤU BAN NHẠC 3D TƯƠNG TÁC (THU ÂM BÉ HÁT + NHẠC ĐỆM 5 NHẠC CỤ)
         ===================================================================== */}
      {viewMode === "band-stage" && (
        <BandStageView
          soundEnabled={soundEnabled}
          onBackToMenu={() => setViewMode("module-select")}
          onComplete={(summaryText) => complete(summaryText)}
          onReaction={onReaction}
        />
      )}
    </div>
  );
}
