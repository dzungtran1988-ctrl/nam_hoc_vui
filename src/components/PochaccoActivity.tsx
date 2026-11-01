import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Award,
  Eye,
  RotateCcw,
  Sparkles,
  Star,
  Volume2,
} from "lucide-react";
import type { ActivityProps } from "../types";
import { useSpeech } from "../hooks/useSpeech";
import { playCardPlaceSound, playRewardTone } from "../lib/sound";
import {
  POCHACCO_ACTION_BANK,
  POCHACCO_STATE_IMAGES,
  POCHACCO_STICKERS,
} from "../data/pochaccoCommands";
import {
  completeListeningPhase,
  createPochaccoSession,
  generatePochaccoDeck,
  getPublicPromptView,
  LISTENING_DELAY_MS,
  loadPochaccoStats,
  nextPochaccoRound,
  recordCompletedPochaccoGame,
  retryCurrentRound,
  startPochaccoSession,
  submitPochaccoChoice,
  type PochaccoGameState,
  type PochaccoPlayerChoice,
  type PochaccoStoredStats,
} from "../lib/pochaccoGame";
import {
  generateMemoryDeck,
  MEMORY_LEVEL_CONFIGS,
  type MemoryCard,
  type MemoryDifficultyLevel,
} from "../lib/pochaccoMemoryGame";
import type { MathItemTheme } from "../data/mathLessons";
import { NamSoccerPixelGame } from "./NamSoccerPixelGame";

const AEROBIC_EXERCISES = [
  {
    id: "hands-up",
    title: "Động tác 1: Giơ Cao Hai Tay Vươn Vai",
    spokenText:
      "Động tác một! Nấm đứng dậy giơ cao hai tay lên trời và nhún theo nhịp cùng Pochacco nào! Một, hai, ba, bốn, năm, sáu, bảy, tám!",
    shortHint: "🙌 Giơ cao hai tay lên trời, vươn vai thật khỏe!",
    imageUrl: "/assets/pochacco/action-hands-up.webp",
  },
  {
    id: "hips-shake",
    title: "Động tác 2: Chống Hông Lắc Lư",
    spokenText:
      "Động tác hai! Nấm chống hai tay lên hông và lắc hông qua trái, qua phải thật vui nhé! Một, hai, ba, bốn, năm, sáu, bảy, tám!",
    shortHint: "💃 Chống hai tay lên hông, lắc lư trái phải!",
    imageUrl: "/assets/pochacco/action-hands-on-hips.webp",
  },
  {
    id: "squat-jump",
    title: "Động tác 3: Nhún Gối Bật Nhảy",
    spokenText:
      "Động tác ba! Nấm khuỵu gối nhún xuống rồi bật thẳng người lên thật khỏe nào! Một, hai, ba, bốn, năm, sáu, bảy, tám!",
    shortHint: "🦵 Nhún đầu gối xuống rồi đứng thẳng dậy!",
    imageUrl: "/assets/pochacco/action-squat-down.webp",
  },
  {
    id: "clap-cheer",
    title: "Động tác 4: Vỗ Tay Reo Hò Chiến Thắng",
    spokenText:
      "Động tác bốn! Nấm vỗ hai tay thật to và xoay người ăn mừng cùng Pochacco nào! Một, hai, ba, bốn, năm, sáu, bảy, tám!",
    shortHint: "👏 Vỗ tay thật kêu và cười thật tươi!",
    imageUrl: "/assets/pochacco/action-clap-two.webp",
  },
];

const POCHACCO_QUICK_ROUNDS = 4;

const MEMORY_THEME_PILLS: Array<{ id: MathItemTheme; label: string }> = [
  { id: "all", label: "✨ Đủ loại" },
  { id: "toys", label: "🧸 Đồ chơi" },
  { id: "fruits", label: "🍓 Trái cây" },
  { id: "school", label: "🎒 Học tập" },
  { id: "vehicles", label: "🚗 Xe cộ" },
  { id: "sweets", label: "🍦 Bánh kem" },
];

function safeLoadStats(): PochaccoStoredStats {
  try {
    return loadPochaccoStats(window.localStorage);
  } catch {
    return {
      version: 1,
      gamesCompleted: 0,
      bestScore: 0,
      totalStarsEarned: 0,
      stickerUnlocked: false,
      stickerUnlockedAt: null,
    };
  }
}

export interface PochaccoActivityProps extends ActivityProps {
  initialViewMode?:
    | "menu"
    | "aerobic"
    | "game"
    | "memory"
    | "soccer"
    | "space-defender";
  onBackToHub?: () => void;
}

export function PochaccoActivity({
  soundEnabled,
  onComplete,
  onReaction,
  onLessonIndexChange,
  initialViewMode = "menu",
  onBackToHub,
}: PochaccoActivityProps) {
  const [viewMode, setViewMode] = useState<
    "menu" | "aerobic" | "game" | "memory" | "soccer" | "space-defender"
  >(initialViewMode);
  const [soccerCompletedResult, setSoccerCompletedResult] = useState<{
    goals: number;
    total: number;
  } | null>(null);
  const [gameState, setGameState] = useState<PochaccoGameState>(() =>
    createPochaccoSession(
      generatePochaccoDeck(POCHACCO_ACTION_BANK, POCHACCO_QUICK_ROUNDS),
    ),
  );
  const [stats, setStats] = useState<PochaccoStoredStats>(safeLoadStats);
  const [actionDurationSec] = useState<5 | 10>(5);
  const [remainingSec, setRemainingSec] = useState<number>(5);

  // State cho Trò 0: Thể Dục Nhịp Điệu (4 Động tác · 40 giây)
  const [aerobicIndex, setAerobicIndex] = useState(0);
  const [aerobicBeat, setAerobicBeat] = useState(1);
  const [isAerobicCompleted, setIsAerobicCompleted] = useState(false);

  // State cho Mini-game 2: Lật Thẻ Tìm Cặp Đôi (Memory Match - mặc định 4 cặp dễ nhớ)
  const [memoryLevel, setMemoryLevel] = useState<MemoryDifficultyLevel>(1);
  const [memoryTheme, setMemoryTheme] = useState<MathItemTheme>("all");
  const [memoryDeck, setMemoryDeck] = useState<MemoryCard[]>(() =>
    generateMemoryDeck(1, "all"),
  );
  const [flippedUids, setFlippedUids] = useState<string[]>([]);
  const [matchedItemIds, setMatchedItemIds] = useState<string[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [isPeeking, setIsPeeking] = useState(false);
  const [isCheckingPair, setIsCheckingPair] = useState(false);
  const [lastMatchedCard, setLastMatchedCard] = useState<MemoryCard | null>(
    null,
  );

  const speech = useSpeech(soundEnabled);
  const savedCompletionRef = useRef(false);
  const peekTimerRef = useRef<number | null>(null);
  const mismatchTimerRef = useRef<number | null>(null);

  const promptView = getPublicPromptView(gameState);
  const memoryConfig = MEMORY_LEVEL_CONFIGS[memoryLevel];
  const isMemoryCompleted =
    matchedItemIds.length > 0 &&
    matchedItemIds.length >= memoryConfig.pairCount;
  const currentAerobic =
    AEROBIC_EXERCISES[aerobicIndex] ?? AEROBIC_EXERCISES[0];

  // Dọn timer khi unmount & tự khởi động bàn Lật Thẻ nếu mở trực tiếp từ Khu Giải Trí
  useEffect(() => {
    if (initialViewMode === "memory") {
      startNewMemoryBoard(1, "all", true);
    }
    return () => {
      if (peekTimerRef.current) window.clearTimeout(peekTimerRef.current);
      if (mismatchTimerRef.current)
        window.clearTimeout(mismatchTimerRef.current);
    };
  }, []);

  // Cố định 1 khung bảng duy nhất suốt cả ván game
  useEffect(() => {
    if (viewMode === "aerobic") {
      onLessonIndexChange?.(0);
    } else if (viewMode === "game") {
      onLessonIndexChange?.(1);
    } else if (viewMode === "memory") {
      onLessonIndexChange?.(2);
    } else {
      onLessonIndexChange?.(0);
    }
  }, [viewMode]);

  // Đếm nhịp 1..8 cho bài Thể Dục Nhịp Điệu
  useEffect(() => {
    if (viewMode !== "aerobic" || isAerobicCompleted) return;
    setAerobicBeat(1);
    if (soundEnabled) {
      speech.speak(currentAerobic.spokenText, "vi-VN");
    }
    const timer = window.setInterval(() => {
      setAerobicBeat((prev) => (prev < 8 ? prev + 1 : 8));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [viewMode, aerobicIndex, isAerobicCompleted, soundEnabled]);

  // Phát câu lệnh tiếng Việt và mở khóa xác nhận sau khoảng thời gian nghe (Game 1: Pochacco Bảo)
  useEffect(() => {
    if (viewMode !== "game" || gameState.status !== "playing") return;
    if (gameState.phase !== "listening") return;

    setRemainingSec(actionDurationSec);

    if (soundEnabled) {
      speech.speak(promptView.spokenText, "vi-VN");
    }

    const timer = window.setTimeout(() => {
      setGameState((prev) => completeListeningPhase(prev));
    }, LISTENING_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [
    viewMode,
    gameState.status,
    gameState.phase,
    gameState.roundIndex,
    promptView.spokenText,
    soundEnabled,
  ]);

  // Đồng hồ đếm giờ tập động tác (5s, khích lệ vui nhộn, không phạt bé)
  useEffect(() => {
    if (viewMode !== "game" || gameState.status !== "playing") return;
    if (
      gameState.phase !== "listening" &&
      gameState.phase !== "awaiting_choice"
    ) {
      return;
    }
    if (remainingSec <= 0) return;

    const interval = window.setInterval(() => {
      setRemainingSec((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [viewMode, gameState.status, gameState.phase, remainingSec]);

  // Lưu thành tích khi hoàn thành bài Thể Dục Nhịp Điệu
  useEffect(() => {
    if (
      viewMode === "aerobic" &&
      isAerobicCompleted &&
      !savedCompletionRef.current
    ) {
      savedCompletionRef.current = true;
      try {
        const syntheticCompleted: PochaccoGameState = {
          ...gameState,
          status: "completed",
          score: 10,
        };
        const updated = recordCompletedPochaccoGame(
          window.localStorage,
          syntheticCompleted,
        );
        setStats(updated);
      } catch {
        // Ignore storage error
      }
      if (soundEnabled) {
        playRewardTone();
        speech.speak(
          "Hoan hô Nấm! Nấm đã tập xong bốn động tác thể dục nhịp điệu thật khỏe và mở khóa Sticker Pochacco!",
          "vi-VN",
        );
      }
      onReaction?.(
        "happy",
        "Hoan hô Nấm! Hoàn thành 4/4 động tác Thể Dục Nhịp Điệu! 🎵🌟",
      );
    }
  }, [viewMode, isAerobicCompleted]);

  // Lưu thành tích và mở khóa Sticker Pochacco khi hoàn thành 4 vòng Pochacco Bảo
  useEffect(() => {
    if (
      viewMode === "game" &&
      gameState.status === "completed" &&
      !savedCompletionRef.current
    ) {
      savedCompletionRef.current = true;
      try {
        const updated = recordCompletedPochaccoGame(
          window.localStorage,
          gameState,
        );
        setStats(updated);
      } catch {
        // Ignore storage error in restricted mode
      }
      if (soundEnabled) {
        playRewardTone();
        speech.speak(
          `Hoan hô Nấm! Con đã hoàn thành ${gameState.totalRounds} vòng chơi và nhận được Sticker Pochacco Siêu Vận Động!`,
          "vi-VN",
        );
      }
      onReaction?.(
        "happy",
        "Chúc mừng Nấm nhận được Sticker Pochacco Siêu Vận Động! 🐾🌟",
      );
    }
  }, [viewMode, gameState.status]);

  // Lưu thành tích khi hoàn thành bàn Lật Thẻ Tìm Cặp Đôi
  useEffect(() => {
    if (
      viewMode === "memory" &&
      isMemoryCompleted &&
      !savedCompletionRef.current
    ) {
      savedCompletionRef.current = true;
      try {
        const syntheticCompleted: PochaccoGameState = {
          ...gameState,
          status: "completed",
          score: 10,
        };
        const updated = recordCompletedPochaccoGame(
          window.localStorage,
          syntheticCompleted,
        );
        setStats(updated);
      } catch {
        // Ignore storage error
      }
      if (soundEnabled) {
        playRewardTone();
        speech.speak(
          `Siêu quá Nấm ơi! Nấm đã lật đúng cả ${memoryConfig.pairCount} cặp đồ vật và mở khóa Sticker Pochacco!`,
          "vi-VN",
        );
      }
      onReaction?.(
        "happy",
        `Hoan hô Nấm! Đã tìm đủ ${memoryConfig.pairCount}/${memoryConfig.pairCount} cặp đồ vật! 🃏🌟`,
      );
    }
  }, [viewMode, isMemoryCompleted, memoryConfig.pairCount]);

  const handleStartAerobic = () => {
    speech.stop();
    savedCompletionRef.current = false;
    setAerobicIndex(0);
    setAerobicBeat(1);
    setIsAerobicCompleted(false);
    setViewMode("aerobic");
    onReaction?.(
      "happy",
      "Nấm đứng dậy tập 4 động tác thể dục nhịp điệu cùng Pochacco nhé! 🎵🐾",
    );
  };

  const handleNextAerobicMove = () => {
    speech.stop();
    if (soundEnabled) {
      playRewardTone();
    }
    if (aerobicIndex + 1 < AEROBIC_EXERCISES.length) {
      setAerobicIndex((prev) => prev + 1);
      setAerobicBeat(1);
    } else {
      setIsAerobicCompleted(true);
    }
  };

  const handleStartNewGame = () => {
    speech.stop();
    savedCompletionRef.current = false;
    const fresh = startPochaccoSession(
      createPochaccoSession(
        generatePochaccoDeck(POCHACCO_ACTION_BANK, POCHACCO_QUICK_ROUNDS),
      ),
    );
    setGameState(fresh);
    setRemainingSec(actionDurationSec);
    setViewMode("game");
    onReaction?.(
      "happy",
      "Nghe kỹ xem có chữ 'Pochacco bảo' không nhé Nấm ơi!",
    );
  };

  // Khởi tạo ván mới cho Game 2: Lật Thẻ Tìm Cặp Đôi (kèm 2.5s nhìn trước)
  const startNewMemoryBoard = (
    lvl: MemoryDifficultyLevel = memoryLevel,
    theme: MathItemTheme = memoryTheme,
    speakIntro = true,
  ) => {
    if (peekTimerRef.current) window.clearTimeout(peekTimerRef.current);
    if (mismatchTimerRef.current) window.clearTimeout(mismatchTimerRef.current);
    speech.stop();

    savedCompletionRef.current = false;
    const cfg = MEMORY_LEVEL_CONFIGS[lvl];
    const freshDeck = generateMemoryDeck(lvl, theme);

    setMemoryLevel(lvl);
    setMemoryTheme(theme);
    setMemoryDeck(freshDeck);
    setFlippedUids([]);
    setMatchedItemIds([]);
    setMemoryMoves(0);
    setIsCheckingPair(false);
    setLastMatchedCard(null);
    setIsPeeking(true);
    setViewMode("memory");

    if (soundEnabled) {
      const seenItems = new Set<string>();
      for (const c of freshDeck) {
        if (!seenItems.has(c.itemId)) {
          seenItems.add(c.itemId);
          void speech.prefetch(`Đúng rồi! ${c.name} — ${c.englishName}!`, "vi-VN");
        }
      }
      if (speakIntro) {
        speech.speak(
          `Nấm nhìn kỹ vị trí ${cfg.pairCount} cặp đồ vật rồi lật tìm hai hình giống nhau nhé!`,
          "vi-VN",
        );
      }
    }
    onReaction?.(
      "happy",
      `Nhìn kỹ vị trí ${cfg.pairCount} cặp đồ vật trước khi thẻ úp xuống nhé Nấm! 👀`,
    );

    peekTimerRef.current = window.setTimeout(() => {
      setIsPeeking(false);
    }, cfg.peekMs);
  };

  const handlePeekHint = () => {
    if (isPeeking || isCheckingPair || isMemoryCompleted) return;
    if (peekTimerRef.current) window.clearTimeout(peekTimerRef.current);
    setIsPeeking(true);
    if (soundEnabled) {
      playCardPlaceSound(1);
    }
    peekTimerRef.current = window.setTimeout(() => {
      setIsPeeking(false);
    }, 1500);
  };

  const handleFlipMemoryCard = (card: MemoryCard) => {
    if (isPeeking || isCheckingPair || isMemoryCompleted) return;
    if (matchedItemIds.includes(card.itemId)) return;
    if (flippedUids.includes(card.uid)) return;

    if (soundEnabled) {
      playCardPlaceSound(flippedUids.length + 1);
    }

    const nextFlipped = [...flippedUids, card.uid];
    setFlippedUids(nextFlipped);

    if (nextFlipped.length === 1) {
      return;
    }

    // Đã lật đủ 2 thẻ -> kiểm tra xem có trùng itemId không
    setMemoryMoves((prev) => prev + 1);
    const firstCard = memoryDeck.find((c) => c.uid === nextFlipped[0]);
    if (!firstCard) return;

    if (firstCard.itemId === card.itemId) {
      // Ghép đúng cặp!
      const nextMatched = [...matchedItemIds, card.itemId];
      setMatchedItemIds(nextMatched);
      setFlippedUids([]);
      setLastMatchedCard(card);

      if (soundEnabled) {
        playRewardTone();
        // Nếu chưa phải cặp cuối cùng thì đọc tên đồ vật
        if (nextMatched.length < memoryConfig.pairCount) {
          speech.speak(
            `Đúng rồi! ${card.name} — ${card.englishName}!`,
            "vi-VN",
          );
        }
      }
      onReaction?.(
        "happy",
        `🌟 Tuyệt vời! Cặp "${card.name}" (${card.englishName})!`,
      );
    } else {
      // Chưa trùng -> giữ ngửa 850ms cho bé nhìn nhớ vị trí rồi úp lại
      setIsCheckingPair(true);
      mismatchTimerRef.current = window.setTimeout(() => {
        setFlippedUids([]);
        setIsCheckingPair(false);
      }, 850);
    }
  };

  const handleRepeatAudio = () => {
    setRemainingSec(actionDurationSec);
    speech.speak(promptView.spokenText, "vi-VN");
  };

  const handleExitToMenu = () => {
    if (peekTimerRef.current) window.clearTimeout(peekTimerRef.current);
    if (mismatchTimerRef.current) window.clearTimeout(mismatchTimerRef.current);
    speech.stop();
    onReaction?.("idle", "");
    if (onBackToHub) {
      onBackToHub();
      return;
    }
    setViewMode("menu");
  };

  const handlePlayerChoice = (choice: PochaccoPlayerChoice) => {
    if (
      gameState.status !== "playing" ||
      gameState.phase !== "awaiting_choice"
    ) {
      return;
    }
    speech.stop();
    const nextState = submitPochaccoChoice(gameState, choice);
    setGameState(nextState);

    if (nextState.phase === "feedback_correct") {
      if (soundEnabled) {
        playRewardTone();
        if (nextState.lastFeedback) {
          speech.speak(nextState.lastFeedback, "vi-VN");
        }
      }
      onReaction?.("happy", nextState.lastFeedback || "Đúng rồi! +1 sao! 🌟");
    } else if (nextState.phase === "feedback_hint") {
      if (soundEnabled && nextState.lastFeedback) {
        speech.speak(nextState.lastFeedback, "vi-VN");
      }
      onReaction?.(
        "sad",
        "Không sao đâu, Nấm nghe gợi ý của Pochacco rồi thử lại nhé!",
      );
    }
  };

  const handleNextRound = () => {
    speech.stop();
    setGameState((prev) => nextPochaccoRound(prev));
  };

  // Tự động chuyển sang vòng lệnh tiếp theo sau ~1.6s khi Nấm phản xạ ĐÚNG
  useEffect(() => {
    if (
      viewMode !== "game" ||
      gameState.status !== "playing" ||
      gameState.phase !== "feedback_correct"
    ) {
      return;
    }
    const timer = window.setTimeout(() => {
      handleNextRound();
    }, 1600);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode, gameState.status, gameState.phase, gameState.roundIndex]);

  const handleRetryRound = () => {
    speech.stop();
    setGameState((prev) => retryCurrentRound(prev));
  };

  const handleStartSoccer = () => {
    speech.stop();
    savedCompletionRef.current = false;
    setSoccerCompletedResult(null);
    setViewMode("soccer");
    onReaction?.(
      "happy",
      "⚽ Cầu thủ Nhí Nấm chọn góc sút và trả lời câu đố để ghi bàn nhé!",
    );
  };

  const handleFinishSoccerMatch = (goals: number, total: number) => {
    setSoccerCompletedResult({ goals, total });
    if (!savedCompletionRef.current) {
      savedCompletionRef.current = true;
      try {
        const syntheticCompleted: PochaccoGameState = {
          ...gameState,
          status: "completed",
          score: Math.max(4, goals * 2),
        };
        const updated = recordCompletedPochaccoGame(
          window.localStorage,
          syntheticCompleted,
        );
        setStats(updated);
      } catch {
        // Ignore storage error
      }
      if (soundEnabled) {
        playRewardTone();
      }
      onReaction?.(
        "happy",
        `🏆 Vua Phá Lưới Nhí Nấm: Ghi ${goals}/${total} bàn thắng!`,
      );
    }
  };

  const handleClaimTreasureReward = () => {
    speech.stop();
    onComplete({
      attempts:
        viewMode === "aerobic"
          ? AEROBIC_EXERCISES.length
          : viewMode === "soccer"
            ? (soccerCompletedResult?.total ?? 5)
            : viewMode === "memory"
              ? Math.max(1, memoryMoves)
              : Math.max(1, gameState.attempts),
      answers: [
        viewMode === "aerobic"
          ? `Thể Dục Nhịp Điệu: ${AEROBIC_EXERCISES.length} động tác`
          : viewMode === "soccer"
            ? `Đá Bóng Vào Gôn: ${soccerCompletedResult?.goals ?? 5}/${soccerCompletedResult?.total ?? 5} bàn thắng`
            : viewMode === "memory"
              ? `Lật Thẻ Đồ Vật: ${memoryConfig.pairCount} cặp (${memoryMoves} lượt)`
              : `Pochacco Bảo: ${gameState.score}/${gameState.totalRounds} sao`,
      ],
    });
  };

  const unlockedStickerCount = Math.min(
    POCHACCO_STICKERS.length,
    stats.stickerUnlocked ? Math.max(1, stats.gamesCompleted) : 0,
  );
  const featuredSticker =
    POCHACCO_STICKERS[
      Math.max(0, (stats.gamesCompleted - 1) % POCHACCO_STICKERS.length)
    ] ?? POCHACCO_STICKERS[0];

  const leftFigureUrl =
    gameState.phase === "feedback_correct"
      ? gameState.lastChoice === "freeze"
        ? POCHACCO_STATE_IMAGES.freezeDuo
        : POCHACCO_STATE_IMAGES.doneDuo
      : gameState.phase === "feedback_hint"
        ? POCHACCO_STATE_IMAGES.retryDuo
        : promptView.imageUrl;

  const leftFigureCaption =
    gameState.phase === "feedback_correct"
      ? gameState.lastChoice === "freeze"
        ? "🌟 Đứng Im Tượng Đá Chuẩn Luôn!"
        : "🌟 Con Đã Làm Tuyệt Vời!"
      : gameState.phase === "feedback_hint"
        ? "💛 Không sao đâu, Nấm thử lại nhé!"
        : `🔊 ${promptView.shortLabel} (${promptView.category})`;

  return (
    <div className="wb-content pochacco-wb">
      {/* =====================================================================
          1. MÀN HÌNH CHỌN HOẠT ĐỘNG CÙNG POCHACCO (3 HOẠT ĐỘNG NGẮN GỌN)
         ===================================================================== */}
      {viewMode === "menu" && (
        <div className="lesson-picker-screen pochacco-menu-screen">
          <div className="reading-level-header single-row-level-bar pochacco-header-banner">
            <span className="reading-level-label">🐾 Khu Vận Động Cùng Pochacco</span>
            <div className="pochacco-stats-pills">
              <span className="pochacco-stat-pill">
                ⭐ {stats.gamesCompleted} ván
              </span>
              <span
                className={`pochacco-sticker-pill ${
                  unlockedStickerCount > 0 ? "unlocked" : ""
                }`}
              >
                🏅 {unlockedStickerCount}/{POCHACCO_STICKERS.length}
              </span>
            </div>
          </div>

          <div className="wb-lesson-list">
            {/* Hoạt động 1: Thể Dục Nhịp Điệu 4 Động Tác */}
            <button
              type="button"
              className="wb-lesson-row pochacco-entry-row"
              style={{ "--cluster-accent": "#f97316" } as React.CSSProperties}
              onClick={handleStartAerobic}
            >
              <img
                src="/assets/pochacco/action-hands-up.webp"
                alt="Thể Dục Nhịp Điệu"
                className="wb-row-thumb-img"
              />
              <span className="wb-row-badge">Bài 1</span>
              <strong className="wb-row-title">Thể Dục Nhịp Điệu</strong>
              <span className="wb-row-go">▶</span>
            </button>

            {/* Hoạt động 2: Pochacco Bảo (4 lệnh ngắn gọn) */}
            <button
              type="button"
              className="wb-lesson-row pochacco-entry-row"
              style={{ "--cluster-accent": "#0abde3" } as React.CSSProperties}
              onClick={handleStartNewGame}
            >
              <img
                src={POCHACCO_STATE_IMAGES.doneDuo}
                alt="Pochacco Bảo"
                className="wb-row-thumb-img"
              />
              <span className="wb-row-badge">Bài 2</span>
              <strong className="wb-row-title">Pochacco Bảo!</strong>
              <span className="wb-row-go">▶</span>
            </button>

            {/* Hoạt động 3: Siêu Cầu Thủ Nhí Nấm (Đá Bóng Trắc Nghiệm Pixel) */}
            <button
              type="button"
              className="wb-lesson-row pochacco-entry-row"
              style={{ "--cluster-accent": "#10b981" } as React.CSSProperties}
              onClick={handleStartSoccer}
            >
              <img
                src="/assets/pochacco/sticker-soccer.webp"
                alt="Siêu Cầu Thủ Nhí Nấm"
                className="wb-row-thumb-img"
              />
              <span className="wb-row-badge">Bài 3</span>
              <strong className="wb-row-title">
                Siêu Cầu Thủ Nhí Nấm (Đá Bóng ⚽)
              </strong>
              <span className="wb-row-go">▶</span>
            </button>
          </div>

          {/* Bộ Sưu Tập 6 Sticker Pochacco */}
          <div className="pochacco-sticker-strip">
            {POCHACCO_STICKERS.map((sticker, idx) => {
              const isUnlocked = idx < unlockedStickerCount;
              return (
                <button
                  key={sticker.id}
                  type="button"
                  className={`pochacco-sticker-card ${
                    isUnlocked ? "unlocked" : "locked"
                  }`}
                  onClick={() => {
                    if (soundEnabled) {
                      speech.speak(
                        isUnlocked
                          ? `Sticker ${sticker.name}`
                          : `Hoàn thành thêm trò chơi để mở khóa ${sticker.name} nhé!`,
                        "vi-VN",
                      );
                    }
                  }}
                  title={sticker.name}
                >
                  <img src={sticker.imageUrl} alt={sticker.name} />
                  <span>{sticker.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* =====================================================================
          1B. HOẠT ĐỘNG 0: THỂ DỤC NHỊP ĐIỆU CÙNG POCHACCO (4 ĐỘNG TÁC · 40 GIÂY)
         ===================================================================== */}
      {viewMode === "aerobic" && !isAerobicCompleted && (
        <div className="pochacco-game-stage">
          {/* Thanh điều khiển tối giản 3 phần tử */}
          <div className="pochacco-top-bar">
            <button
              type="button"
              className="pochacco-ctrl-btn ctrl-gray"
              onClick={handleExitToMenu}
            >
              <ArrowLeft size={14} /> Chọn bài khác
            </button>

            <span className="pochacco-round-pill">
              🎵 Động tác {aerobicIndex + 1}/{AEROBIC_EXERCISES.length}
            </span>

            <button
              type="button"
              className="pochacco-ctrl-btn ctrl-blue"
              onClick={() => {
                setAerobicBeat(1);
                speech.speak(currentAerobic.spokenText, "vi-VN");
              }}
            >
              <Volume2 size={14} /> Nghe lại
            </button>
          </div>

          <div className="pochacco-command-card pochacco-split-card">
            <button
              type="button"
              className="command-half-figure"
              onClick={() => speech.speak(currentAerobic.spokenText, "vi-VN")}
              title="Chạm để nghe Pochacco hô nhịp"
            >
              <img
                src={currentAerobic.imageUrl}
                alt={currentAerobic.title}
                className="command-action-img"
              />
              <span className="figure-caption-pill">
                🔊 Chạm nghe Pochacco hô nhịp
              </span>
            </button>

            <div className="command-half-content">
              <div className="command-text-box">
                <span className="command-speaker-badge">
                  🐾 Tập Thể Dục Cùng Pochacco:
                </span>
                <h3 className="command-spoken-text">{currentAerobic.title}</h3>
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#0369a1",
                  }}
                >
                  {currentAerobic.shortHint}
                </p>
              </div>

              {/* Thanh đếm 8 nhịp trực quan */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  flexWrap: "wrap",
                  padding: "6px 8px",
                  borderRadius: "14px",
                  background: "#fff7ed",
                  border: "2px solid #fed7aa",
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((b) => (
                  <span
                    key={b}
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "999px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      fontSize: "14px",
                      background: b <= aerobicBeat ? "#f97316" : "#ffedd5",
                      color: b <= aerobicBeat ? "#ffffff" : "#9a3412",
                      transform: b === aerobicBeat ? "scale(1.12)" : "scale(1)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>

              <button
                type="button"
                className="chunky-btn chunky-green"
                onClick={handleNextAerobicMove}
                style={{ width: "100%", justifyContent: "center" }}
              >
                <Sparkles size={18} />{" "}
                {aerobicIndex + 1 < AEROBIC_EXERCISES.length
                  ? "Nấm tập xong rồi! Qua động tác tiếp ▶"
                  : "Hoàn thành 4 động tác! Nhận Sticker 🎁"}
              </button>
            </div>
          </div>
        </div>
      )}

      {viewMode === "aerobic" && isAerobicCompleted && (
        <div className="pochacco-complete-card">
          <div className="pochacco-sticker-showcase">
            <div className="pochacco-sticker-badge">
              <img
                src={featuredSticker.imageUrl}
                alt={featuredSticker.name}
                className="sticker-reward-img"
              />
              <span className="sticker-star-crown">👑</span>
            </div>
            <div className="pochacco-complete-info">
              <span className="sticker-award-tag">
                <Award size={14} /> BÉ KHỎE BÉ NGOAN!
              </span>
              <h3>Hoàn thành 4/4 động tác Thể Dục!</h3>
              <p>
                Nấm đã vận động toàn thân thật khỏe khoắn cùng Pochacco!
              </p>
            </div>
          </div>

          <div className="pochacco-complete-actions">
            <button
              type="button"
              className="chunky-btn chunky-blue btn-sm"
              onClick={handleStartAerobic}
            >
              <RotateCcw size={15} /> Tập lại 4 động tác
            </button>
            <button
              type="button"
              className="chunky-btn chunky-green btn-sm"
              onClick={handleClaimTreasureReward}
            >
              <Sparkles size={15} /> Nhận Sao & Sticker!
            </button>
            <button
              type="button"
              className="chunky-btn chunky-pink btn-sm"
              onClick={handleExitToMenu}
            >
              <ArrowLeft size={15} /> Về Menu
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          2. TRÒ CHƠI 2: LẬT THẺ TÌM CẶP ĐÔI (ICON ĐỒ VẬT RÕ NÉT - THANH TOP TỐI GIẢN)
         ===================================================================== */}
      {viewMode === "memory" && !isMemoryCompleted && (
        <div className="pochacco-memory-stage">
          {/* Thanh điều khiển tối giản 3 phần tử */}
          <div className="pochacco-top-bar memory-top-bar">
            <button
              type="button"
              className="pochacco-ctrl-btn ctrl-gray"
              onClick={handleExitToMenu}
              title="Quay về Menu"
            >
              <ArrowLeft size={14} /> Chọn bài khác
            </button>

            <div className="pochacco-progress-group">
              <span className="pochacco-round-pill">
                🃏 Cặp: {matchedItemIds.length}/{memoryConfig.pairCount}
              </span>
              {([1, 2, 3] as MemoryDifficultyLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  className={`duration-pill-btn ${
                    memoryLevel === lvl ? "active" : ""
                  }`}
                  onClick={() => startNewMemoryBoard(lvl, memoryTheme, false)}
                >
                  {MEMORY_LEVEL_CONFIGS[lvl].shortLabel}
                </button>
              ))}
              {MEMORY_THEME_PILLS.map((tp) => (
                <button
                  key={tp.id}
                  type="button"
                  className={`memory-theme-pill ${
                    memoryTheme === tp.id ? "active" : ""
                  }`}
                  onClick={() => startNewMemoryBoard(memoryLevel, tp.id, false)}
                >
                  {tp.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="pochacco-ctrl-btn ctrl-yellow"
              onClick={handlePeekHint}
              disabled={isPeeking}
              title="Pochacco cho nhìn trộm 1.5 giây"
            >
              <Eye size={14} /> {isPeeking ? "Đang mở..." : "Nhìn trộm 1.5s"}
            </button>
          </div>

          {/* Lưới Thẻ Bài Đồ Vật (4x2, 4x3 hoặc 4x4) vừa khít 1 màn hình */}
          <div
            className={`pochacco-memory-grid grid-cols-${memoryConfig.cols} grid-rows-${memoryConfig.rows}`}
          >
            {memoryDeck.map((card, index) => {
              const isMatched = matchedItemIds.includes(card.itemId);
              const isFlipped =
                isPeeking || isMatched || flippedUids.includes(card.uid);

              return (
                <button
                  key={card.uid}
                  type="button"
                  className={`memory-flip-card ${
                    isFlipped ? "is-flipped" : "is-facedown"
                  } ${isMatched ? "is-matched" : ""}`}
                  onClick={() => handleFlipMemoryCard(card)}
                  disabled={isMatched}
                >
                  {isFlipped ? (
                    <div className="memory-card-face memory-card-front">
                      <div className="memory-item-img-wrap">
                        <img
                          src={card.imageUrl}
                          alt={card.name}
                          className="memory-item-img"
                          draggable={false}
                        />
                      </div>
                      <span className="memory-item-label">{card.name}</span>
                      {isMatched && (
                        <span className="memory-matched-badge">✓</span>
                      )}
                    </div>
                  ) : (
                    <div className="memory-card-face memory-card-back">
                      <span className="memory-card-num">{index + 1}</span>
                      <span className="memory-card-paw">🐾</span>
                      <span className="memory-card-qmark">?</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Màn hình hoàn thành bàn Lật Thẻ Tìm Cặp Đôi */}
      {viewMode === "memory" && isMemoryCompleted && (
        <div className="pochacco-complete-card">
          <div className="pochacco-sticker-showcase">
            <div className="pochacco-sticker-badge">
              <img
                src={featuredSticker.imageUrl}
                alt={featuredSticker.name}
                className="sticker-reward-img"
              />
              <span className="sticker-star-crown">👑</span>
            </div>
            <div className="pochacco-complete-info">
              <span className="sticker-award-tag">
                <Award size={14} /> SIÊU TRÍ NHỚ ĐỒ VẬT!
              </span>
              <h3>
                Hoàn thành {memoryConfig.pairCount}/{memoryConfig.pairCount} cặp!
              </h3>
              <p>
                Nấm đã ghép đúng toàn bộ các cặp đồ vật chỉ trong{" "}
                <strong>{memoryMoves} lượt lật</strong>!
              </p>
            </div>
          </div>

          <div className="pochacco-complete-actions">
            <button
              type="button"
              className="chunky-btn chunky-blue btn-sm"
              onClick={() =>
                startNewMemoryBoard(memoryLevel, memoryTheme, true)
              }
            >
              <RotateCcw size={15} /> Chơi ván mới (Đồ vật mới)
            </button>
            <button
              type="button"
              className="chunky-btn chunky-green btn-sm"
              onClick={handleClaimTreasureReward}
            >
              <Sparkles size={15} /> Nhận Sticker Lên Bảng Cúp!
            </button>
            <button
              type="button"
              className="chunky-btn chunky-pink btn-sm"
              onClick={handleExitToMenu}
            >
              <ArrowLeft size={15} /> Về Menu
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          3. TRÒ CHƠI 1: POCHACCO BẢO (4 VÒNG LỆNH NHANH - THANH TOP TỐI GIẢN)
         ===================================================================== */}
      {viewMode === "game" && gameState.status !== "completed" && (
        <div className="pochacco-game-stage">
          <div className="pochacco-top-bar">
            <button
              type="button"
              className="pochacco-ctrl-btn ctrl-gray"
              onClick={handleExitToMenu}
              title="Thoát về menu Mini Game"
            >
              <ArrowLeft size={14} /> Chọn bài khác
            </button>

            <div className="pochacco-progress-group">
              <span className="pochacco-round-pill">
                🎯 Lệnh {promptView.roundNumber}/{promptView.totalRounds}
              </span>
              <span className="pochacco-score-pill">
                <Star size={14} fill="currentColor" /> {gameState.score} Sao
              </span>
            </div>

            <button
              type="button"
              className="pochacco-ctrl-btn ctrl-blue"
              onClick={handleRepeatAudio}
              title="Nghe lại câu lệnh & đếm lại giờ"
            >
              <Volume2 size={14} /> Nghe lại
            </button>
          </div>

          <div className="pochacco-command-card pochacco-split-card">
            <button
              type="button"
              className="command-half-figure"
              onClick={handleRepeatAudio}
              title="Chạm vào hình để nghe lại lệnh"
            >
              <img
                src={leftFigureUrl}
                alt={promptView.shortLabel}
                className="command-action-img"
              />
              <span className="figure-caption-pill">{leftFigureCaption}</span>
            </button>

            <div className="command-half-content">
              <div className="command-text-box">
                <div className="command-speaker-row">
                  <img
                    src={
                      gameState.phase === "feedback_hint"
                        ? POCHACCO_STATE_IMAGES.retrySolo
                        : POCHACCO_STATE_IMAGES.listenSolo
                    }
                    alt="Pochacco lắng nghe"
                    className="speaker-mini-pose"
                  />
                  <span className="command-speaker-badge">
                    {gameState.phase === "listening"
                      ? "🎧 Lắng nghe kỹ nhé:"
                      : "🐾 Hiệu lệnh của Pochacco:"}
                  </span>
                </div>
                <h3 className="command-spoken-text">
                  "{promptView.spokenText}"
                </h3>
              </div>

              {gameState.phase !== "feedback_correct" &&
                gameState.phase !== "feedback_hint" && (
                  <div className="pochacco-timer-widget">
                    <div className="timer-top-row">
                      <span
                        className={`timer-countdown-badge ${
                          remainingSec > 0 ? "ticking" : "done"
                        }`}
                      >
                        {remainingSec > 0
                          ? `⏱️ Thời gian tập: ${remainingSec} giây`
                          : "✅ Đã hết giờ tập! Nấm bấm kết quả nhé!"}
                      </span>
                    </div>
                    <div className="timer-progress-track">
                      <div
                        className="timer-progress-fill"
                        style={{
                          width: `${
                            (remainingSec / actionDurationSec) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                )}

              {gameState.phase === "feedback_correct" && (
                <div className="pochacco-feedback-banner correct">
                  <span>🌟 +1 Sao! {gameState.lastFeedback}</span>
                  <button
                    type="button"
                    className="chunky-btn chunky-green btn-sm"
                    onClick={handleNextRound}
                  >
                    {gameState.roundIndex + 1 >= gameState.totalRounds
                      ? "Nhận Sticker Pochacco 🎁"
                      : "Lệnh tiếp theo ➔"}
                  </button>
                </div>
              )}

              {gameState.phase === "feedback_hint" && (
                <div className="pochacco-feedback-banner hint">
                  <span>💡 {gameState.lastFeedback}</span>
                  <div className="hint-actions">
                    <button
                      type="button"
                      className="chunky-btn chunky-blue btn-sm"
                      onClick={handleRetryRound}
                    >
                      Thử chọn lại 🔄
                    </button>
                    <button
                      type="button"
                      className="chunky-btn chunky-gold btn-sm"
                      onClick={handleNextRound}
                    >
                      Câu tiếp ➔
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {gameState.phase !== "feedback_correct" &&
            gameState.phase !== "feedback_hint" && (
              <div className="pochacco-confirm-row">
                <button
                  type="button"
                  className="pochacco-big-choice-btn choice-do"
                  disabled={gameState.phase === "listening"}
                  onClick={() => handlePlayerChoice("do")}
                >
                  <img
                    src={POCHACCO_STATE_IMAGES.doneSolo}
                    alt="Con đã làm"
                    className="choice-btn-thumb"
                  />
                  <div className="choice-btn-labels">
                    <strong>Con đã làm!</strong>
                    <small>Em làm theo Pochacco</small>
                  </div>
                </button>

                <button
                  type="button"
                  className="pochacco-big-choice-btn choice-freeze"
                  disabled={gameState.phase === "listening"}
                  onClick={() => handlePlayerChoice("freeze")}
                >
                  <img
                    src={POCHACCO_STATE_IMAGES.freezeSolo}
                    alt="Con đứng im"
                    className="choice-btn-thumb"
                  />
                  <div className="choice-btn-labels">
                    <strong>Con đứng im!</strong>
                    <small>Đứng im tượng đá</small>
                  </div>
                </button>
              </div>
            )}
        </div>
      )}

      {/* =====================================================================
          4. MÀN HÌNH HOÀN THÀNH 4 VÒNG POCHACCO BẢO & NHẬN STICKER
         ===================================================================== */}
      {viewMode === "game" && gameState.status === "completed" && (
        <div className="pochacco-complete-card">
          <div className="pochacco-sticker-showcase">
            <div className="pochacco-sticker-badge">
              <img
                src={featuredSticker.imageUrl}
                alt={featuredSticker.name}
                className="sticker-reward-img"
              />
              <span className="sticker-star-crown">👑</span>
            </div>
            <div className="pochacco-complete-info">
              <span className="sticker-award-tag">
                <Award size={14} /> STICKER MỚI MỞ KHÓA!
              </span>
              <h3>{featuredSticker.name}</h3>
              <p>
                Nấm đã hoàn thành trọn vẹn{" "}
                <strong>
                  {gameState.totalRounds}/{gameState.totalRounds} vòng lệnh
                </strong>{" "}
                và đạt <strong>{gameState.score} ngôi sao phản xạ</strong>!
              </p>
            </div>
          </div>

          <div className="pochacco-complete-actions">
            <button
              type="button"
              className="chunky-btn chunky-blue btn-sm"
              onClick={handleStartNewGame}
            >
              <RotateCcw size={15} /> Chơi lại ({POCHACCO_QUICK_ROUNDS} lệnh mới)
            </button>
            <button
              type="button"
              className="chunky-btn chunky-green btn-sm"
              onClick={handleClaimTreasureReward}
            >
              <Sparkles size={15} /> Nhận Sticker Lên Bảng Cúp!
            </button>
            <button
              type="button"
              className="chunky-btn chunky-pink btn-sm"
              onClick={handleExitToMenu}
            >
              <ArrowLeft size={15} /> Về Menu
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          5. TRÒ CHƠI 3: SIÊU CẦU THỦ NHÍ NẤM (CHIBI PIXEL ĐÁ BÓNG ĐỐ VUI)
         ===================================================================== */}
      {viewMode === "soccer" && !soccerCompletedResult && (
        <NamSoccerPixelGame
          soundEnabled={soundEnabled}
          onSpeak={(txt) => speech.speak(txt, "vi-VN-North")}
          onReaction={onReaction}
          onExit={handleExitToMenu}
          onFinishMatch={handleFinishSoccerMatch}
        />
      )}

      {viewMode === "soccer" && soccerCompletedResult && (
        <div className="pochacco-complete-card">
          <div className="pochacco-sticker-showcase">
            <div className="pochacco-sticker-badge">
              <img
                src="/assets/pochacco/sticker-soccer.webp"
                alt="Pochacco Cầu Thủ"
                className="sticker-reward-img"
              />
              <span className="sticker-star-crown">⚽</span>
            </div>
            <div className="pochacco-complete-info">
              <span className="sticker-award-tag">
                <Award size={14} /> VUA PHÁ LƯỚI NHÍ NẤM!
              </span>
              <h3>
                Ghi được {soccerCompletedResult.goals}/
                {soccerCompletedResult.total} bàn thắng!
              </h3>
              <p>
                Cầu thủ Nhí Nấm vừa trả lời đúng câu đố đa lĩnh vực vừa sút bóng
                cực siêu cùng Thủ môn Pochacco!
              </p>
            </div>
          </div>

          <div className="pochacco-complete-actions">
            <button
              type="button"
              className="chunky-btn chunky-blue btn-sm"
              onClick={handleStartSoccer}
            >
              <RotateCcw size={15} /> Đá hiệp mới (5 quả)
            </button>
            <button
              type="button"
              className="chunky-btn chunky-green btn-sm"
              onClick={handleClaimTreasureReward}
            >
              <Sparkles size={15} /> Nhận Sao & Sticker Lên Bảng Cúp!
            </button>
            <button
              type="button"
              className="chunky-btn chunky-pink btn-sm"
              onClick={handleExitToMenu}
            >
              <ArrowLeft size={15} /> Về Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

