import {
  POCHACCO_ACTION_BANK,
  POCHACCO_PRAISES,
  type PochaccoActionItem,
} from "../data/pochaccoCommands.ts";
import type { ProgressStorage } from "./progress.ts";

export const POCHACCO_STORAGE_KEY = "nam-hoc-vui:pochacco:v1";
export const TOTAL_POCHACCO_ROUNDS = 10;
export const LISTENING_DELAY_MS = 1200;

export type PochaccoCommandType = "pochacco_says" | "direct_command";
export type PochaccoPlayerChoice = "do" | "freeze";

export interface PochaccoCommandCard {
  id: string;
  actionId: string;
  commandType: PochaccoCommandType;
  /** Câu lệnh hiển thị và phát âm thanh cho bé */
  spokenText: string;
  /** Động tác ngắn gọn */
  shortLabel: string;
  emoji: string;
  /** Ảnh minh họa 3D Pochacco làm động tác */
  imageUrl: string;
  category: PochaccoActionItem["category"];
  /** Đáp án đúng nội bộ (không hiển thị ra UI trước khi bé chọn) */
  expectedChoice: PochaccoPlayerChoice;
  /** Gợi ý dịu dàng khi bé bấm nhầm */
  gentleHint: string;
  /** Lời khen khi bé bấm đúng */
  praiseText: string;
}

/** Dữ liệu câu lệnh an toàn cho UI trước khi bé bấm chọn (ẩn đáp án) */
export interface PublicCommandView {
  id: string;
  roundNumber: number;
  totalRounds: number;
  spokenText: string;
  shortLabel: string;
  emoji: string;
  imageUrl: string;
  category: PochaccoActionItem["category"];
}

export type PochaccoSessionStatus = "idle" | "playing" | "paused" | "completed";
export type PochaccoRoundPhase =
  | "listening"
  | "awaiting_choice"
  | "feedback_correct"
  | "feedback_hint";

export interface PochaccoRoundRecord {
  roundIndex: number;
  commandId: string;
  commandType: PochaccoCommandType;
  spokenText: string;
  playerChoice: PochaccoPlayerChoice | "skipped";
  correct: boolean;
  attemptsOnRound: number;
}

export interface PochaccoGameState {
  status: PochaccoSessionStatus;
  /** Lưu phase trước khi bấm Pause để Resume đúng trạng thái */
  phase: PochaccoRoundPhase;
  roundIndex: number;
  totalRounds: number;
  score: number;
  attempts: number;
  deck: PochaccoCommandCard[];
  history: PochaccoRoundRecord[];
  currentRoundScored: boolean;
  currentRoundAttempts: number;
  lastFeedback: string | null;
  lastChoice: PochaccoPlayerChoice | null;
  stickerEarned: boolean;
}

export interface PochaccoStoredStats {
  version: 1;
  gamesCompleted: number;
  bestScore: number;
  totalStarsEarned: number;
  stickerUnlocked: boolean;
  stickerUnlockedAt: string | null;
}

function capitalizeFirst(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return "";
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export function buildCommandCard(
  action: PochaccoActionItem,
  commandType: PochaccoCommandType,
  index: number,
): PochaccoCommandCard {
  const isPochaccoSays = commandType === "pochacco_says";
  const spokenText = isPochaccoSays
    ? `Pochacco bảo: ${capitalizeFirst(action.actionText)}!`
    : `${capitalizeFirst(action.actionText)}!`;

  const expectedChoice: PochaccoPlayerChoice = isPochaccoSays ? "do" : "freeze";
  const gentleHint = isPochaccoSays
    ? `Câu này có chữ "Pochacco bảo" đấy! Nấm hãy ${action.actionText} rồi bấm "Con đã làm!" nhé!`
    : `Ồ! Câu này không có chữ "Pochacco bảo", nên mình phải đứng im cơ! Nấm thử chọn "Con đứng im!" nhé!`;

  const praiseText = POCHACCO_PRAISES[index % POCHACCO_PRAISES.length];

  return {
    id: `${action.id}-${commandType}-${index + 1}`,
    actionId: action.id,
    commandType,
    spokenText,
    shortLabel: action.shortLabel,
    emoji: action.emoji,
    imageUrl: action.imageUrl,
    category: action.category,
    expectedChoice,
    gentleHint,
    praiseText,
  };
}

function shuffleWithRng<T>(items: readonly T[], rng: () => number): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

/**
 * Sinh bộ câu lệnh 10 vòng trộn ngẫu nhiên nhưng bảo đảm CẢ HAI DẠNG
 * ("Pochacco bảo [động tác]" và "[động tác]") đều xuất hiện (tối thiểu 3 câu mỗi dạng khi roundCount >= 6).
 */
export function generatePochaccoDeck(
  actionBank: readonly PochaccoActionItem[] = POCHACCO_ACTION_BANK,
  roundCount: number = TOTAL_POCHACCO_ROUNDS,
  rng: () => number = Math.random,
): PochaccoCommandCard[] {
  if (actionBank.length === 0) {
    throw new Error("Ngân hàng động tác không được rỗng.");
  }
  const total = Math.max(2, roundCount);
  const minEach = total >= 6 ? 3 : 1;

  // Tạo danh sách các dạng lệnh đảm bảo có cả "pochacco_says" và "direct_command"
  const commandTypes: PochaccoCommandType[] = [];
  for (let i = 0; i < minEach; i++) {
    commandTypes.push("pochacco_says");
    commandTypes.push("direct_command");
  }
  while (commandTypes.length < total) {
    commandTypes.push(rng() < 0.55 ? "pochacco_says" : "direct_command");
  }

  const shuffledTypes = shuffleWithRng(commandTypes, rng);
  const shuffledActions = shuffleWithRng(actionBank, rng);

  return shuffledTypes.map((cmdType, idx) => {
    const action = shuffledActions[idx % shuffledActions.length];
    return buildCommandCard(action, cmdType, idx);
  });
}

export function createPochaccoSession(
  deck: PochaccoCommandCard[] = generatePochaccoDeck(),
): PochaccoGameState {
  if (deck.length === 0) {
    throw new Error("Bộ câu lệnh của vòng chơi không được rỗng.");
  }
  return {
    status: "idle",
    phase: "listening",
    roundIndex: 0,
    totalRounds: deck.length,
    score: 0,
    attempts: 0,
    deck,
    history: [],
    currentRoundScored: false,
    currentRoundAttempts: 0,
    lastFeedback: null,
    lastChoice: null,
    stickerEarned: false,
  };
}

export function startPochaccoSession(state: PochaccoGameState): PochaccoGameState {
  return {
    ...state,
    status: "playing",
    phase: "listening",
    roundIndex: 0,
    score: 0,
    attempts: 0,
    history: [],
    currentRoundScored: false,
    currentRoundAttempts: 0,
    lastFeedback: null,
    lastChoice: null,
    stickerEarned: false,
  };
}

/**
 * Mở khóa xác nhận sau khi bé đã nghe lệnh và có thời gian thực hiện động tác.
 */
export function completeListeningPhase(state: PochaccoGameState): PochaccoGameState {
  if (state.status !== "playing" || state.phase !== "listening") {
    return state;
  }
  return {
    ...state,
    phase: "awaiting_choice",
  };
}

/**
 * Lấy thông tin hiển thị câu lệnh hiện tại mà KHÔNG tiết lộ đáp án đúng trước khi bé chọn.
 */
export function getPublicPromptView(state: PochaccoGameState): PublicCommandView {
  const current = state.deck[state.roundIndex] ?? state.deck[0];
  return {
    id: current.id,
    roundNumber: state.roundIndex + 1,
    totalRounds: state.totalRounds,
    spokenText: current.spokenText,
    shortLabel: current.shortLabel,
    emoji: current.emoji,
    imageUrl: current.imageUrl,
    category: current.category,
  };
}

/**
 * Xử lý khi bé bấm "Con đã làm!" ("do") hoặc "Con đứng im!" ("freeze").
 * - Không cho chọn khi đang ở phase "listening" hoặc đang "paused".
 * - Đúng: +1 sao/điểm (tối đa 1 điểm mỗi vòng), hiện lời khen.
 * - Sai: gợi ý dịu dàng, KHÔNG trừ sao, KHÔNG loại bé.
 */
export function submitPochaccoChoice(
  state: PochaccoGameState,
  choice: PochaccoPlayerChoice,
): PochaccoGameState {
  if (state.status !== "playing") return state;
  if (state.phase === "listening" || state.phase === "feedback_correct") {
    return state;
  }

  const current = state.deck[state.roundIndex];
  if (!current) return state;

  const isCorrect = choice === current.expectedChoice;
  const nextAttempts = state.attempts + 1;
  const nextRoundAttempts = state.currentRoundAttempts + 1;

  if (isCorrect) {
    const pointAward = state.currentRoundScored ? 0 : 1;
    const record: PochaccoRoundRecord = {
      roundIndex: state.roundIndex,
      commandId: current.id,
      commandType: current.commandType,
      spokenText: current.spokenText,
      playerChoice: choice,
      correct: true,
      attemptsOnRound: nextRoundAttempts,
    };

    return {
      ...state,
      phase: "feedback_correct",
      score: state.score + pointAward,
      attempts: nextAttempts,
      currentRoundScored: true,
      currentRoundAttempts: nextRoundAttempts,
      lastChoice: choice,
      lastFeedback: current.praiseText,
      history: [...state.history, record],
    };
  }

  // Khi bấm sai: gợi ý dịu dàng, KHÔNG trừ sao và KHÔNG loại bé
  return {
    ...state,
    phase: "feedback_hint",
    score: state.score,
    attempts: nextAttempts,
    currentRoundAttempts: nextRoundAttempts,
    lastChoice: choice,
    lastFeedback: current.gentleHint,
  };
}

/** Cho phép bé thử chọn lại sau khi đọc gợi ý dịu dàng */
export function retryCurrentRound(state: PochaccoGameState): PochaccoGameState {
  if (state.status !== "playing" || state.phase !== "feedback_hint") {
    return state;
  }
  return {
    ...state,
    phase: "awaiting_choice",
    lastChoice: null,
    lastFeedback: null,
  };
}

/** Chuyển sang vòng tiếp theo hoặc hoàn thành 10 vòng nhận Sticker Pochacco */
export function nextPochaccoRound(state: PochaccoGameState): PochaccoGameState {
  if (state.status !== "playing") return state;

  if (state.roundIndex + 1 >= state.totalRounds) {
    return {
      ...state,
      status: "completed",
      stickerEarned: true,
    };
  }

  return {
    ...state,
    roundIndex: state.roundIndex + 1,
    phase: "listening",
    currentRoundScored: false,
    currentRoundAttempts: 0,
    lastChoice: null,
    lastFeedback: null,
  };
}

/** Bỏ qua câu lệnh hiện tại (Skip) mà không phạt bé */
export function skipPochaccoRound(state: PochaccoGameState): PochaccoGameState {
  if (state.status !== "playing" && state.status !== "paused") {
    return state;
  }
  const current = state.deck[state.roundIndex];
  const skipRecord: PochaccoRoundRecord | null = current
    ? {
        roundIndex: state.roundIndex,
        commandId: current.id,
        commandType: current.commandType,
        spokenText: current.spokenText,
        playerChoice: "skipped",
        correct: false,
        attemptsOnRound: state.currentRoundAttempts,
      }
    : null;

  const updatedHistory = skipRecord
    ? [...state.history, skipRecord]
    : state.history;

  if (state.roundIndex + 1 >= state.totalRounds) {
    return {
      ...state,
      status: "completed",
      history: updatedHistory,
      stickerEarned: true,
    };
  }

  return {
    ...state,
    status: "playing",
    roundIndex: state.roundIndex + 1,
    phase: "listening",
    history: updatedHistory,
    currentRoundScored: false,
    currentRoundAttempts: 0,
    lastChoice: null,
    lastFeedback: null,
  };
}

/** Tạm dừng hoặc tiếp tục vòng chơi (Pause / Resume) */
export function togglePausePochacco(state: PochaccoGameState): PochaccoGameState {
  if (state.status === "playing") {
    return { ...state, status: "paused" };
  }
  if (state.status === "paused") {
    return { ...state, status: "playing" };
  }
  return state;
}

/* =========================================================================
   STORAGE ADAPTER CHO THÀNH TÍCH & STICKER POCHACCO
   ========================================================================= */
export function createInitialPochaccoStats(): PochaccoStoredStats {
  return {
    version: 1,
    gamesCompleted: 0,
    bestScore: 0,
    totalStarsEarned: 0,
    stickerUnlocked: false,
    stickerUnlockedAt: null,
  };
}

export function loadPochaccoStats(storage: ProgressStorage): PochaccoStoredStats {
  try {
    const raw = storage.getItem(POCHACCO_STORAGE_KEY);
    if (!raw) return createInitialPochaccoStats();
    const parsed = JSON.parse(raw) as Partial<PochaccoStoredStats>;
    if (
      parsed.version !== 1 ||
      typeof parsed.gamesCompleted !== "number" ||
      typeof parsed.bestScore !== "number" ||
      typeof parsed.totalStarsEarned !== "number" ||
      typeof parsed.stickerUnlocked !== "boolean"
    ) {
      return createInitialPochaccoStats();
    }
    return {
      version: 1,
      gamesCompleted: Math.max(0, Math.floor(parsed.gamesCompleted)),
      bestScore: Math.max(0, Math.floor(parsed.bestScore)),
      totalStarsEarned: Math.max(0, Math.floor(parsed.totalStarsEarned)),
      stickerUnlocked: parsed.stickerUnlocked,
      stickerUnlockedAt:
        typeof parsed.stickerUnlockedAt === "string"
          ? parsed.stickerUnlockedAt
          : null,
    };
  } catch {
    return createInitialPochaccoStats();
  }
}

export function savePochaccoStats(
  storage: ProgressStorage,
  stats: PochaccoStoredStats,
): boolean {
  try {
    storage.setItem(POCHACCO_STORAGE_KEY, JSON.stringify(stats));
    return true;
  } catch {
    return false;
  }
}

export function recordCompletedPochaccoGame(
  storage: ProgressStorage,
  state: PochaccoGameState,
  now = new Date(),
): PochaccoStoredStats {
  const prev = loadPochaccoStats(storage);
  const stickerUnlocked = prev.stickerUnlocked || state.stickerEarned;
  const next: PochaccoStoredStats = {
    version: 1,
    gamesCompleted: prev.gamesCompleted + 1,
    bestScore: Math.max(prev.bestScore, state.score),
    totalStarsEarned: prev.totalStarsEarned + state.score,
    stickerUnlocked,
    stickerUnlockedAt:
      prev.stickerUnlockedAt ?? (stickerUnlocked ? now.toISOString() : null),
  };
  savePochaccoStats(storage, next);
  return next;
}
