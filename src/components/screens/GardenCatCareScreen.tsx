import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Archive,
  BookOpen,
  Crown,
  GraduationCap,
  Home,
  Moon,
  RotateCcw,
  Sparkles,
  Sun,
  Trophy,
} from "lucide-react";
import {
  KAWAII_PASTRY_CATALOG,
  type KawaiiPastryAsset,
} from "../../data/mathLessons";
import {
  getTodayDateKey,
  saveQuestItemInventory,
  type QuestItemInventory,
} from "../../data/dailyQuests";
import {
  STORYBOOK_GARDEN_CAT_SET_3,
  awardGardenCatGraduationSticker,
  awardNamStickerOnDailyQuest,
  loadGardenCatStickerInventory,
  type AwardedNamCupStickerResult,
  type CharacterStickerItem,
  type DrawerTabId,
} from "../../data/rewardStickers";
import { playCharacterTapSound, playRewardTone } from "../../lib/sound";
import type { SubjectId } from "../../types";

export type CareModeTab = "tree" | "cat";
export type TreeBreedId = "rainbow" | "dessert" | "crystal";
export type CatBreedId = "white" | "ginger" | "fairy";
export type TreeBgTheme = "greenhouse" | "palace";

export interface BreedEntityState {
  exp: number;
  graduatedCount: number;
  totalCareActions: number;
  /** Daily coin/free care count used today */
  dailyCareUsed: number;
  /** Date key YYYY-MM-DD for daily care tracking */
  dailyCareDate: string;
  /** Daily specialty drops claimed from the 2 side pedestals today */
  dailyDropsClaimed?: number;
  /** Date key YYYY-MM-DD for daily side-pedestal drop tracking */
  dailyDropsDate?: string;
}

export interface GardenCatSaveState {
  activeTab: CareModeTab;
  treeBgTheme: TreeBgTheme;
  nightMode: boolean;
  activeTreeBreed: TreeBreedId;
  activeCatBreed: CatBreedId;
  trees: Record<TreeBreedId, BreedEntityState>;
  cats: Record<CatBreedId, BreedEntityState>;
  /** Number of completed lessons from main app already converted into Lesson Dew */
  claimedLessonCompletions: number;
  /** Stored Lesson Dew charges ready to use on either Tree or Cat */
  lessonDewCharges: number;
  /** Total mini-quizzes answered inside Garden/Cat studio */
  quizSolvedCount: number;
  /** Daily mini-quiz count used today */
  dailyQuizUsed: number;
  dailyQuizDate: string;
  /** Harvested fruit count in basket */
  harvestedFruitTotal: number;
}

const STORAGE_KEY = "nam-hoc-vui.garden-cat-care.v2";

/**
 * 5–6 Day Daily Growth Pacing:
 * Total 700 EXP from Stage 1 to Stage 6 (~120–140 EXP per day when combining
 * 3 daily care actions + 2 daily mini-quizzes + 2–3 main lessons!).
 */
export const STAGE_THRESHOLDS = [0, 100, 220, 360, 520, 700] as const;
export const MAX_DAILY_COIN_CARES = 3;
export const MAX_DAILY_QUIZZES = 2;

export function getStageFromExp(exp: number): 1 | 2 | 3 | 4 | 5 | 6 {
  if (exp >= STAGE_THRESHOLDS[5]) return 6;
  if (exp >= STAGE_THRESHOLDS[4]) return 5;
  if (exp >= STAGE_THRESHOLDS[3]) return 4;
  if (exp >= STAGE_THRESHOLDS[2]) return 3;
  if (exp >= STAGE_THRESHOLDS[1]) return 2;
  return 1;
}

export function getStageProgressInfo(exp: number) {
  const stage = getStageFromExp(exp);
  if (stage === 6) {
    return {
      stage,
      currentInStage: 100,
      neededForNext: 100,
      percent: 100,
      isMax: true,
    };
  }
  const curMin = STAGE_THRESHOLDS[stage - 1];
  const nextMin = STAGE_THRESHOLDS[stage];
  const currentInStage = Math.max(0, exp - curMin);
  const neededForNext = Math.max(1, nextMin - curMin);
  const percent = Math.min(
    100,
    Math.round((currentInStage / neededForNext) * 100),
  );
  return {
    stage,
    currentInStage,
    neededForNext,
    percent,
    isMax: false,
  };
}

export interface TreeBreedMeta {
  id: TreeBreedId;
  stickerId: "gc-tree-rainbow" | "gc-tree-dessert" | "gc-tree-crystal";
  name: string;
  shortName: string;
  badge: string;
  accent: string;
  glowColor: string;
  fruitColor: string;
  fruitSecondary: string;
  stageNames: [string, string, string, string, string, string];
  speechLines: string[];
}

export const TREE_BREEDS: Record<TreeBreedId, TreeBreedMeta> = {
  rainbow: {
    id: "rainbow",
    stickerId: "gc-tree-rainbow",
    name: "Cây Anh Đào Cầu Vồng",
    shortName: "Anh Đào Cầu Vồng",
    badge: "🌸",
    accent: "#FF5C8A",
    glowColor: "rgba(255, 115, 179, 0.72)",
    fruitColor: "#FF4D79",
    fruitSecondary: "#FFD166",
    stageNames: [
      "Cấp 1 · Hạt Mầm Cầu Vồng",
      "Cấp 2 · Chồi Non Tỏa Sáng",
      "Cấp 3 · Cây Nhỏ Nở Nụ",
      "Cấp 4 · Tán Hoa Rực Rỡ",
      "Cấp 5 · Cây Anh Đào Kết Quả",
      "Cấp 6 · Đại Thụ Cầu Vồng Cổ Tích",
    ],
    speechLines: [
      "Mỗi ngày Nấm vào học bài và tưới nước một chút là tớ lớn lên đấy!",
      "Đạt Cấp 6 tớ sẽ hóa thành Sticker Đại Thụ trong Khu Giải Trí nhé!",
      "Hoa anh đào nở rộ chúc mừng bé Nấm chăm học!",
      "Chạm vào quả chín trên tán cây để thu hoạch vào giỏ nhé!",
    ],
  },
  dessert: {
    id: "dessert",
    stickerId: "gc-tree-dessert",
    name: "Cây Tháp Bánh Kem Dâu",
    shortName: "Cây Bánh Kem Dâu",
    badge: "🍓",
    accent: "#F06595",
    glowColor: "rgba(255, 140, 180, 0.75)",
    fruitColor: "#FF2A6D",
    fruitSecondary: "#FFF0F5",
    stageNames: [
      "Cấp 1 · Mầm Kem Tươi Dâu Tây",
      "Cấp 2 · Chồi Bánh Quy Giòn",
      "Cấp 3 · Cây Kẹo Bông Hồng",
      "Cấp 4 · Cây Hoa Kem Bơ",
      "Cấp 5 · Cây Bánh Macaron Dâu",
      "Cấp 6 · Lâu Đài Tháp Bánh Hoàng Gia",
    ],
    speechLines: [
      "Thơm mùi dâu tây và kem bơ quá bé Nấm ơi!",
      "Mỗi bài học Nấm làm xong đều biến thành Giọt Sương Tri Thức ngọt ngào!",
      "Bấm vào những quả dâu trên cành để hái lấy Xu Vàng nhé!",
      "Khi đạt Cấp 6, Nấm nhớ cất tớ vào Kho & lấy Sticker Lâu Đài Bánh nhé!",
    ],
  },
  crystal: {
    id: "crystal",
    stickerId: "gc-tree-crystal",
    name: "Cây Pha Lê Ánh Trăng",
    shortName: "Pha Lê Ánh Trăng",
    badge: "🌙",
    accent: "#7950F2",
    glowColor: "rgba(140, 120, 255, 0.82)",
    fruitColor: "#74C0FC",
    fruitSecondary: "#E599F7",
    stageNames: [
      "Cấp 1 · Tinh Thể Sao Đêm",
      "Cấp 2 · Mầm Pha Lê Tím",
      "Cấp 3 · Cây Ngọc Ánh Sao",
      "Cấp 4 · Cây Đèn Lồng Ngân Hà",
      "Cấp 5 · Cây Trăng Khuyết Tỏa Sáng",
      "Cấp 6 · Thần Mộc Pha Lê Vũ Trụ",
    ],
    speechLines: [
      "Bật Đêm Đom Đóm ở góc trên để ngắm pha lê phát sáng nhé!",
      "Tri thức hàng ngày của Nấm làm những viên ngọc ánh sao ngân vang!",
      "Chạm vào tinh thể trên cành để thu hoạch vào giỏ nào!",
      "Cây Pha Lê Ánh Trăng tự hào về bé Nấm lắm!",
    ],
  },
};

export interface CatBreedMeta {
  id: CatBreedId;
  stickerId: "gc-cat-white" | "gc-cat-ginger" | "gc-cat-fairy";
  name: string;
  shortName: string;
  badge: string;
  accent: string;
  glowColor: string;
  stageNames: [string, string, string, string, string, string];
  speechLines: string[];
}

export const CAT_BREEDS: Record<CatBreedId, CatBreedMeta> = {
  white: {
    id: "white",
    stickerId: "gc-cat-white",
    name: "Mèo Kem Tuyết Hoàng Gia",
    shortName: "Mèo Kem Tuyết",
    badge: "🤍",
    accent: "#FF6B9D",
    glowColor: "rgba(255, 160, 205, 0.75)",
    stageNames: [
      "Cấp 1 · Mèo Tuyết Sơ Sinh Trong Giỏ",
      "Cấp 2 · Mèo Con Uống Sữa Ngoan",
      "Cấp 3 · Mèo Bông Vờn Cuộn Len",
      "Cấp 4 · Tiểu Thư Mèo Nơ Hồng",
      "Cấp 5 · Mèo Tuyết Ôm Cá Vàng",
      "Cấp 6 · Nữ Hoàng Mèo Tuyết Vương Miện",
    ],
    speechLines: [
      "Meo meo~ Mỗi ngày Nấm cho tớ ăn một chút là tớ lớn khỏe mạnh!",
      "Nấm học xong 1 bài là tớ có thêm Sương Bài Học để lớn nhanh!",
      "Khi tớ lớn đạt Cấp 6, tớ sẽ tặng Nấm Sticker Nữ Hoàng Mèo Tuyết!",
      "Yêu chị Nấm nhất trên đời luôn! Meo meo~ 💖",
    ],
  },
  ginger: {
    id: "ginger",
    stickerId: "gc-cat-ginger",
    name: "Mèo Cam Tai Cụp Đầu Bếp",
    shortName: "Mèo Cam Đầu Bếp",
    badge: "🧡",
    accent: "#F76707",
    glowColor: "rgba(255, 175, 95, 0.78)",
    stageNames: [
      "Cấp 1 · Mèo Cam Ngủ Trong Tách Trà",
      "Cấp 2 · Mèo Cam Tập Bò Tinh Nghịch",
      "Cấp 3 · Mèo Cam Đuổi Bắt Bướm Vàng",
      "Cấp 4 · Đầu Bếp Nhí Mèo Cam",
      "Cấp 5 · Mèo Cam Ôm Bánh Donut",
      "Cấp 6 · Vua Đầu Bếp Mèo Cam Hoàng Gia",
    ],
    speechLines: [
      "Meo! Tớ thích ăn bánh cá Taiyaki giòn rụm lắm!",
      "Nấm tung bánh ra thảm đi, tớ sẽ nhảy ra bắt liền!",
      "Mỗi ngày tớ ăn tối đa 3 bữa Xu thôi kẻo no bụng quá nhé!",
      "Bụng tròn ủm ấm áp, chạm vào tớ để nghe tiếng gừ gừ nhé!",
    ],
  },
  fairy: {
    id: "fairy",
    stickerId: "gc-cat-fairy",
    name: "Mèo Tiên Bướm Tím Ánh Sao",
    shortName: "Mèo Tiên Bướm Tím",
    badge: "💜",
    accent: "#9C36B5",
    glowColor: "rgba(195, 120, 255, 0.82)",
    stageNames: [
      "Cấp 1 · Mèo Tím Ngủ Trên Đệm Trăng",
      "Cấp 2 · Mèo Tím Đeo Chuông Sao",
      "Cấp 3 · Mèo Nhí Cánh Bướm Phép Thuật",
      "Cấp 4 · Phù Thủy Mèo Tím Vẫy Đũa Thần",
      "Cấp 5 · Mèo Tiên Cưỡi Mây Cầu Vồng",
      "Cấp 6 · Nữ Thần Mèo Tinh Tú Bảo Ngọc",
    ],
    speechLines: [
      "Úm ba la! Phép thuật ánh sao giúp Nấm thông minh học giỏi!",
      "Đôi cánh bướm pha lê của tớ phát sáng khi Nấm trả lời đúng!",
      "Tung cuộn len hoặc bánh cupcake cho tớ bay ra đón nhé!",
      "Khi đạt Cấp 6 tớ sẽ vào Kho Vinh Danh và hóa thành Sticker tặng Nấm!",
    ],
  },
};

export interface CareActionConfig {
  id: string;
  mode: CareModeTab;
  title: string;
  iconSrc: string;
  expGain: number;
  coinCost: number;
  canUseFreeCooldown?: boolean;
  canUseStickerTrade?: boolean;
  particleColor: string;
  particleSecondary: string;
  soundFreq: number;
}

export const CARE_ACTIONS: CareActionConfig[] = [
  // TREE ACTIONS (Balanced for 5-6 day progression)
  {
    id: "tree_water",
    mode: "tree",
    title: "Tưới Nước Mây",
    iconSrc: "/assets/garden-cat/icon_water.webp",
    expGain: 15,
    coinCost: 2,
    canUseFreeCooldown: true,
    particleColor: "#4DABF7",
    particleSecondary: "#A5D8FF",
    soundFreq: 540,
  },
  {
    id: "tree_sun",
    mode: "tree",
    title: "Tắm Nắng Ấm",
    iconSrc: "/assets/garden-cat/icon_sun.webp",
    expGain: 20,
    coinCost: 3,
    particleColor: "#FFD43B",
    particleSecondary: "#FFA94D",
    soundFreq: 660,
  },
  {
    id: "tree_fertilizer",
    mode: "tree",
    title: "Bón Phân Sao",
    iconSrc: "/assets/garden-cat/icon_fertilizer.webp",
    expGain: 25,
    coinCost: 5,
    particleColor: "#69DB7C",
    particleSecondary: "#FFE066",
    soundFreq: 780,
  },
  {
    id: "tree_music",
    mode: "tree",
    title: "Loa Nhạc Hoa",
    iconSrc: "/assets/garden-cat/icon_music.webp",
    expGain: 35,
    coinCost: 8,
    canUseStickerTrade: true,
    particleColor: "#F783AC",
    particleSecondary: "#DA77F2",
    soundFreq: 880,
  },

  // CAT ACTIONS (Balanced for 5-6 day progression)
  {
    id: "cat_milk",
    mode: "cat",
    title: "Sữa Ấm Ngọt",
    iconSrc: "/assets/garden-cat/icon_milk.webp",
    expGain: 15,
    coinCost: 2,
    canUseFreeCooldown: true,
    particleColor: "#FFC9DE",
    particleSecondary: "#FFF0F6",
    soundFreq: 560,
  },
  {
    id: "cat_fish",
    mode: "cat",
    title: "Bánh Cá Taiyaki",
    iconSrc: "/assets/garden-cat/icon_fish.webp",
    expGain: 20,
    coinCost: 3,
    particleColor: "#FFB347",
    particleSecondary: "#FFE066",
    soundFreq: 680,
  },
  {
    id: "cat_yarn",
    mode: "cat",
    title: "Cuộn Len Màu",
    iconSrc: "/assets/garden-cat/icon_yarn.webp",
    expGain: 25,
    coinCost: 5,
    particleColor: "#74C0FC",
    particleSecondary: "#F783AC",
    soundFreq: 790,
  },
  {
    id: "cat_cupcake",
    mode: "cat",
    title: "Cupcake Hoàng Gia",
    iconSrc: "/assets/garden-cat/icon_cupcake.webp",
    expGain: 35,
    coinCost: 8,
    canUseStickerTrade: true,
    particleColor: "#FF6B9D",
    particleSecondary: "#FFD43B",
    soundFreq: 920,
  },
];

interface MiniQuizQuestion {
  id: string;
  subjectLabel: string;
  prompt: string;
  options: { label: string; isCorrect: boolean }[];
}

const MINI_QUIZ_BANK: MiniQuizQuestion[] = [
  {
    id: "q1",
    subjectLabel: "🧮 Toán Vui",
    prompt: "Trong vườn có 3 quả dâu đỏ, mọc thêm 2 quả dâu nữa. Hỏi có tất cả mấy quả dâu?",
    options: [
      { label: "5 quả dâu 🍓", isCorrect: true },
      { label: "4 quả dâu 🍓", isCorrect: false },
      { label: "6 quả dâu 🍓", isCorrect: false },
    ],
  },
  {
    id: "q2",
    subjectLabel: "🔤 Tiếng Anh",
    prompt: "Chú mèo đáng yêu trong Tiếng Anh đọc là gì nhỉ?",
    options: [
      { label: "Cat 🐱", isCorrect: true },
      { label: "Dog 🐶", isCorrect: false },
      { label: "Bird 🐦", isCorrect: false },
    ],
  },
  {
    id: "q3",
    subjectLabel: "📖 Tiếng Việt",
    prompt: "Từ nào dưới đây chỉ bộ phận xanh tươi mọc trên cành cây?",
    options: [
      { label: "Chiếc lá 🍃", isCorrect: true },
      { label: "Viên sỏi 🪨", isCorrect: false },
      { label: "Đám mây ☁️", isCorrect: false },
    ],
  },
  {
    id: "q4",
    subjectLabel: "🧮 Toán Vui",
    prompt: "Bạn Mèo Kem Tuyết có 4 chiếc bánh cá, ăn mất 1 chiếc. Hỏi còn lại mấy chiếc bánh cá?",
    options: [
      { label: "3 chiếc bánh 🐟", isCorrect: true },
      { label: "2 chiếc bánh 🐟", isCorrect: false },
      { label: "5 chiếc bánh 🐟", isCorrect: false },
    ],
  },
  {
    id: "q5",
    subjectLabel: "🔤 Tiếng Anh",
    prompt: "Màu hồng phấn xinh xắn trong Tiếng Anh gọi là gì?",
    options: [
      { label: "Pink 🌸", isCorrect: true },
      { label: "Blue 💙", isCorrect: false },
      { label: "Green 🌿", isCorrect: false },
    ],
  },
  {
    id: "q6",
    subjectLabel: "🍳 Kỹ Năng Ngoan",
    prompt: "Để cây xanh lớn nhanh và nở hoa đẹp, bé Nấm cần làm gì mỗi ngày?",
    options: [
      { label: "Tưới nước & chiếu nắng ấm ☀️", isCorrect: true },
      { label: "Bứt lá của cây 🍂", isCorrect: false },
      { label: "Cất cây vào tủ tối 🚪", isCorrect: false },
    ],
  },
  {
    id: "q7",
    subjectLabel: "🧮 Toán Vui",
    prompt: "Trên thảm có 2 bạn mèo trắng và 2 bạn mèo cam. Tổng cộng có mấy bạn mèo?",
    options: [
      { label: "4 bạn mèo 🐾", isCorrect: true },
      { label: "3 bạn mèo 🐾", isCorrect: false },
      { label: "6 bạn mèo 🐾", isCorrect: false },
    ],
  },
  {
    id: "q8",
    subjectLabel: "🔤 Tiếng Anh",
    prompt: "Quả táo đỏ giòn ngọt trong Tiếng Anh là từ nào?",
    options: [
      { label: "Apple 🍎", isCorrect: true },
      { label: "Banana 🍌", isCorrect: false },
      { label: "Milk 🥛", isCorrect: false },
    ],
  },
];

function createDefaultBreedState(today: string): BreedEntityState {
  return {
    exp: 0,
    graduatedCount: 0,
    totalCareActions: 0,
    dailyCareUsed: 0,
    dailyCareDate: today,
    dailyDropsClaimed: 0,
    dailyDropsDate: today,
  };
}

function normalizeBreedState(
  raw: Partial<BreedEntityState> | undefined,
  today: string,
): BreedEntityState {
  const def = createDefaultBreedState(today);
  if (!raw) return def;
  const isSameDay = raw.dailyCareDate === today;
  const isSameDropDay = raw.dailyDropsDate === today;
  return {
    exp: typeof raw.exp === "number" ? Math.min(STAGE_THRESHOLDS[5], Math.max(0, raw.exp)) : 0,
    graduatedCount: typeof raw.graduatedCount === "number" ? Math.max(0, raw.graduatedCount) : 0,
    totalCareActions: typeof raw.totalCareActions === "number" ? Math.max(0, raw.totalCareActions) : 0,
    dailyCareUsed: isSameDay && typeof raw.dailyCareUsed === "number" ? raw.dailyCareUsed : 0,
    dailyCareDate: today,
    dailyDropsClaimed: isSameDropDay && typeof raw.dailyDropsClaimed === "number" ? raw.dailyDropsClaimed : 0,
    dailyDropsDate: today,
  };
}

function createDefaultSaveState(initialCompletedLessons: number): GardenCatSaveState {
  const today = getTodayDateKey();
  const baselineClaimed = Math.max(0, initialCompletedLessons - 2);
  const starterCharges = Math.max(2, Math.min(4, initialCompletedLessons - baselineClaimed));
  return {
    activeTab: "tree",
    treeBgTheme: "greenhouse",
    nightMode: false,
    activeTreeBreed: "rainbow",
    activeCatBreed: "white",
    trees: {
      rainbow: createDefaultBreedState(today),
      dessert: createDefaultBreedState(today),
      crystal: createDefaultBreedState(today),
    },
    cats: {
      white: createDefaultBreedState(today),
      ginger: createDefaultBreedState(today),
      fairy: createDefaultBreedState(today),
    },
    claimedLessonCompletions: baselineClaimed,
    lessonDewCharges: starterCharges,
    quizSolvedCount: 0,
    dailyQuizUsed: 0,
    dailyQuizDate: today,
    harvestedFruitTotal: 0,
  };
}

function loadGardenCatState(currentCompletions: number): GardenCatSaveState {
  const today = getTodayDateKey();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const fresh = createDefaultSaveState(currentCompletions);
      saveGardenCatState(fresh);
      return fresh;
    }
    const parsed = JSON.parse(raw) as Partial<GardenCatSaveState>;
    const def = createDefaultSaveState(currentCompletions);
    const claimed =
      typeof parsed.claimedLessonCompletions === "number"
        ? Math.min(parsed.claimedLessonCompletions, currentCompletions)
        : def.claimedLessonCompletions;
    const newlyEarned = Math.max(0, currentCompletions - claimed);
    const savedCharges =
      typeof parsed.lessonDewCharges === "number" ? parsed.lessonDewCharges : 2;
    const sameQuizDay = parsed.dailyQuizDate === today;

    const merged: GardenCatSaveState = {
      activeTab: parsed.activeTab === "cat" ? "cat" : "tree",
      treeBgTheme: parsed.treeBgTheme === "palace" ? "palace" : "greenhouse",
      nightMode: Boolean(parsed.nightMode),
      activeTreeBreed:
        parsed.activeTreeBreed && parsed.activeTreeBreed in TREE_BREEDS
          ? parsed.activeTreeBreed
          : "rainbow",
      activeCatBreed:
        parsed.activeCatBreed && parsed.activeCatBreed in CAT_BREEDS
          ? parsed.activeCatBreed
          : "white",
      trees: {
        rainbow: normalizeBreedState(parsed.trees?.rainbow, today),
        dessert: normalizeBreedState(parsed.trees?.dessert, today),
        crystal: normalizeBreedState(parsed.trees?.crystal, today),
      },
      cats: {
        white: normalizeBreedState(parsed.cats?.white, today),
        ginger: normalizeBreedState(parsed.cats?.ginger, today),
        fairy: normalizeBreedState(parsed.cats?.fairy, today),
      },
      claimedLessonCompletions: currentCompletions,
      lessonDewCharges: savedCharges + newlyEarned,
      quizSolvedCount: parsed.quizSolvedCount || 0,
      dailyQuizUsed: sameQuizDay ? parsed.dailyQuizUsed || 0 : 0,
      dailyQuizDate: today,
      harvestedFruitTotal: parsed.harvestedFruitTotal || 0,
    };
    saveGardenCatState(merged);
    return merged;
  } catch {
    return createDefaultSaveState(currentCompletions);
  }
}

function saveGardenCatState(state: GardenCatSaveState): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage errors
  }
}

function playArcadeCareSfx(
  freq = 620,
  type: "care" | "levelup" | "harvest" = "care",
  actionId?: string,
) {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (type === "levelup") {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((n, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(n, now + idx * 0.09);
        gain.gain.setValueAtTime(0.001, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.18, now + idx * 0.09 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.32);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.34);
      });
      return;
    }

    if (type === "harvest") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.exponentialRampToValueAtTime(1180, now + 0.18);
      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
      return;
    }

    if (actionId === "tree_water") {
      // 1. Realistic 1.45s Water Pouring Shower Stream (Bandpass-filtered white noise)
      const duration = 1.45;
      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.7;
      }
      const noiseSrc = ctx.createBufferSource();
      noiseSrc.buffer = noiseBuffer;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = "bandpass";
      bandpass.frequency.setValueAtTime(860, now);
      bandpass.frequency.linearRampToValueAtTime(1480, now + 0.7);
      bandpass.frequency.linearRampToValueAtTime(980, now + duration);
      bandpass.Q.value = 2.1;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.001, now);
      noiseGain.gain.linearRampToValueAtTime(0.095, now + 0.16);
      noiseGain.gain.setValueAtTime(0.095, now + 1.05);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noiseSrc.connect(bandpass);
      bandpass.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noiseSrc.start(now);
      noiseSrc.stop(now + duration);

      // 2. Cascade of 9 Water Droplet "Bloop-Plink" Sine Notes
      const dropNotes = [420, 510, 460, 590, 530, 660, 610, 740, 820];
      dropNotes.forEach((baseF, idx) => {
        const startT = now + 0.07 + idx * 0.13;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(baseF, startT);
        osc.frequency.exponentialRampToValueAtTime(
          baseF * 1.72,
          startT + 0.095,
        );
        gain.gain.setValueAtTime(0.001, startT);
        gain.gain.linearRampToValueAtTime(0.11, startT + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, startT + 0.11);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startT);
        osc.stop(startT + 0.115);
      });

      // 3. Final Absorption Sparkle Chime when Tree Swells
      [784, 1046.5, 1318.5].forEach((chimeF, idx) => {
        const startT = now + 1.08 + idx * 0.09;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(chimeF, startT);
        gain.gain.setValueAtTime(0.085, startT);
        gain.gain.exponentialRampToValueAtTime(0.001, startT + 0.28);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startT);
        osc.stop(startT + 0.29);
      });
      return;
    }

    if (actionId === "tree_sun" || actionId === "tree_fertilizer") {
      // Warm Shimmering Harp Arpeggio (1.3s)
      const harpNotes = [523.25, 659.25, 783.99, 987.77, 1046.5, 1318.5, 1567.98];
      harpNotes.forEach((f, idx) => {
        const startT = now + idx * 0.11;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(f, startT);
        gain.gain.setValueAtTime(0.095, startT);
        gain.gain.exponentialRampToValueAtTime(0.001, startT + 0.36);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startT);
        osc.stop(startT + 0.38);
      });
      return;
    }

    if (actionId === "tree_music") {
      // Playful 6-Note Music Box Melody
      const melody = [659.25, 783.99, 880, 783.99, 1046.5, 987.77];
      melody.forEach((f, idx) => {
        const startT = now + idx * 0.14;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(f, startT);
        gain.gain.setValueAtTime(0.1, startT);
        gain.gain.exponentialRampToValueAtTime(0.001, startT + 0.24);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startT);
        osc.stop(startT + 0.25);
      });
      return;
    }

    if (actionId && actionId.startsWith("cat_")) {
      // Cute Glug/Munch + Sweet Synthesized Kitten "Mew~" Contour
      [440, 554.37, 659.25].forEach((f, idx) => {
        const startT = now + idx * 0.11;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(f, startT);
        osc.frequency.exponentialRampToValueAtTime(f * 1.25, startT + 0.08);
        gain.gain.setValueAtTime(0.09, startT);
        gain.gain.exponentialRampToValueAtTime(0.001, startT + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startT);
        osc.stop(startT + 0.11);
      });
      const mewStart = now + 0.36;
      const mewOsc = ctx.createOscillator();
      const mewGain = ctx.createGain();
      mewOsc.type = "triangle";
      mewOsc.frequency.setValueAtTime(640, mewStart);
      mewOsc.frequency.exponentialRampToValueAtTime(1020, mewStart + 0.18);
      mewOsc.frequency.exponentialRampToValueAtTime(760, mewStart + 0.48);
      mewGain.gain.setValueAtTime(0.001, mewStart);
      mewGain.gain.linearRampToValueAtTime(0.105, mewStart + 0.06);
      mewGain.gain.exponentialRampToValueAtTime(0.001, mewStart + 0.5);
      mewOsc.connect(mewGain);
      mewGain.connect(ctx.destination);
      mewOsc.start(mewStart);
      mewOsc.stop(mewStart + 0.52);
      return;
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.35, now + 0.16);
    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.19);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  } catch {
    // ignore audio errors
  }
}

interface GlowParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  kind: "sparkle" | "droplet" | "heart" | "star" | "note" | "pillar";
}

interface FloatingTextPopup {
  x: number;
  y: number;
  vy: number;
  text: string;
  color: string;
  life: number;
  maxLife: number;
}

interface HangingFruit {
  id: number;
  relX: number;
  relY: number;
  radius: number;
  phase: number;
  flying: boolean;
  flyProgress: number;
  startX: number;
  startY: number;
}

interface TossedCatToy {
  active: boolean;
  iconKey: string;
  x: number;
  y: number;
  vy: number;
  groundY: number;
  timer: number;
}

type CatStationId = "center" | "left" | "right";

interface SidePedestalDrop {
  id: number;
  side: "left" | "right";
  slotIdx: number;
  iconUrl: string;
  label: string;
  coinValue: number;
  dropProgress: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  collecting: boolean;
  collectProgress: number;
  phase: number;
}

export function getDailyDropQuota(stage: 1 | 2 | 3 | 4 | 5 | 6): number {
  const table = [3, 3, 4, 4, 5, 6] as const;
  return table[stage - 1];
}

export function getDropCoinReward(stage: 1 | 2 | 3 | 4 | 5 | 6): number {
  const table = [2, 2, 3, 3, 4, 5] as const;
  return table[stage - 1];
}

function getTreeBreedDropSpec(breedId: TreeBreedId, indexSeed: number) {
  if (breedId === "rainbow") {
    const isBerry = indexSeed % 2 === 1;
    return {
      iconUrl: isBerry
        ? "/assets/items/fruits/fruit_02.webp"
        : "/assets/items/fruits/fruit_01.webp",
      label: isBerry ? "Quả Dâu Cầu Vồng" : "Quả Táo Cầu Vồng",
    };
  }
  if (breedId === "dessert") {
    return {
      iconUrl: "/assets/garden-cat/icon_cupcake.webp",
      label: "Bánh Kem Ngọt Ngào",
    };
  }
  return {
    iconUrl: "/assets/english/items/toy_04_star.webp",
    label: "Pha Lê Ánh Sao",
  };
}

export interface GardenCatCareScreenProps {
  goldCoins: number;
  onSpendCoins: (cost: number) => boolean;
  onAddCoins: (amount: number) => void;
  questItemInventory: QuestItemInventory;
  onUpdateQuestItemInventory: (next: QuestItemInventory) => void;
  completedLessonsCount: number;
  soundEnabled: boolean;
  onSpeak: (text: string) => void;
  onGoHome: () => void;
  onStartLesson: (subject: SubjectId) => void;
  onOpenStickerBook: (filter: DrawerTabId) => void;
}

// Logical Canvas Resolution inside the 2/3 Left Stage Frame
const LOGICAL_W = 1080;
const LOGICAL_H = 720;

// Center Pedestal / Rug Anchor: dead-center on the circular stage/rug and pushed back with depth!
const PEDESTAL_CENTER = {
  x: Math.round(LOGICAL_W * 0.498),
  y: Math.round(LOGICAL_H * 0.755),
};
// Left & Right Circular Side Pedestals / Cat Beds in the 3 room backgrounds
const LEFT_STAGE = { x: 248, y: 416 };
const RIGHT_STAGE = { x: 832, y: 416 };
// Compact Mini Shelf on the top-left corner for the 2 inactive varieties
const MINI_SLOT_1 = { x: 86, y: 158 };
const MINI_SLOT_2 = { x: 204, y: 158 };
const BASKET_POS = { x: 96, y: LOGICAL_H * 0.84 };

/**
 * Progressive 6-Stage Size Curve:
 * Starts compact at Stage 1 (seedling / newborn kitten) and grows steadily through Stage 6,
 * while keeping Stage 6 capped at a balanced size so it never overwhelms the screen.
 */
const TREE_STAGE_SIZES = [152, 178, 206, 234, 262, 290] as const;
const CAT_STAGE_SIZES = [138, 160, 184, 208, 232, 255] as const;

function getEntityDisplaySize(isTree: boolean, exp: number): number {
  const info = getStageProgressInfo(exp);
  const table = isTree ? TREE_STAGE_SIZES : CAT_STAGE_SIZES;
  const idx = info.stage - 1;
  const curSize = table[idx];
  const nextSize = table[Math.min(5, idx + 1)];
  // Smoothly grow 75% of the step within the current stage as EXP increases, plus 25% pop on level-up
  const intraRatio = info.stage < 6 ? (info.percent / 100) * 0.75 : 0;
  return curSize + (nextSize - curSize) * intraRatio;
}

export function GardenCatCareScreen({
  goldCoins,
  onSpendCoins,
  onAddCoins,
  questItemInventory,
  onUpdateQuestItemInventory,
  completedLessonsCount,
  soundEnabled,
  onSpeak,
  onGoHome,
  onStartLesson,
  onOpenStickerBook,
}: GardenCatCareScreenProps) {
  const [state, setState] = useState<GardenCatSaveState>(() =>
    loadGardenCatState(completedLessonsCount),
  );
  const [gardenCatStickerInv, setGardenCatStickerInv] = useState(() =>
    loadGardenCatStickerInventory(),
  );

  // Sync if completedLessonsCount increases while mounted
  useEffect(() => {
    if (completedLessonsCount > state.claimedLessonCompletions) {
      const diff = completedLessonsCount - state.claimedLessonCompletions;
      setState((prev) => {
        const next: GardenCatSaveState = {
          ...prev,
          claimedLessonCompletions: completedLessonsCount,
          lessonDewCharges: prev.lessonDewCharges + diff,
        };
        saveGardenCatState(next);
        return next;
      });
    }
  }, [completedLessonsCount, state.claimedLessonCompletions]);

  const [freeCareCooldown, setFreeCareCooldown] = useState<number>(0);
  const [speechBubble, setSpeechBubble] = useState<string>(
    "Mỗi ngày Nấm học bài và chăm sóc một chút để cây & mèo lớn dần nhé! ✨",
  );
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);
  const [wrongQuizLabels, setWrongQuizLabels] = useState<string[]>([]);
  const [quizCorrectLabel, setQuizCorrectLabel] = useState<string | null>(null);
  const [stickerTradeModalAction, setStickerTradeModalAction] =
    useState<CareActionConfig | null>(null);
  const [vaultModalOpen, setVaultModalOpen] = useState(false);
  const [graduationModalAward, setGraduationModalAward] = useState<{
    title: string;
    graduatedSticker: CharacterStickerItem;
    namSticker: AwardedNamCupStickerResult;
    coinsEarned: number;
  } | null>(null);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  useEffect(() => {
    if (freeCareCooldown <= 0) return;
    const timer = window.setInterval(() => {
      setFreeCareCooldown((c) => Math.max(0, c - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [freeCareCooldown]);

  const activeTreeState = state.trees[state.activeTreeBreed];
  const activeCatState = state.cats[state.activeCatBreed];
  const activeEntityState =
    state.activeTab === "tree" ? activeTreeState : activeCatState;
  const progressInfo = getStageProgressInfo(activeEntityState.exp);

  const sideBreeds = useMemo(() => {
    if (state.activeTab === "tree") {
      const all: TreeBreedId[] = ["rainbow", "dessert", "crystal"];
      const others = all.filter((id) => id !== state.activeTreeBreed);
      return { first: others[0], second: others[1] };
    } else {
      const all: CatBreedId[] = ["white", "ginger", "fairy"];
      const others = all.filter((id) => id !== state.activeCatBreed);
      return { first: others[0], second: others[1] };
    }
  }, [state.activeTab, state.activeTreeBreed, state.activeCatBreed]);

  const tradableObjectStickers = useMemo(() => {
    return KAWAII_PASTRY_CATALOG.filter(
      (item) => (questItemInventory[item.id] || 0) > 0,
    ).map((item) => ({
      item,
      count: questItemInventory[item.id] || 0,
    }));
  }, [questItemInventory]);

  const unlockedVaultCount = useMemo(() => {
    return STORYBOOK_GARDEN_CAT_SET_3.filter(
      (s) => (gardenCatStickerInv[s.id] || 0) > 0,
    ).length;
  }, [gardenCatStickerInv]);

  // ============================================================================
  // HTML5 <canvas> 2D RETINA ENGINE REFS & PHYSICS STATE
  // ============================================================================
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageCacheRef = useRef<Record<string, HTMLImageElement>>({});
  const stateRef = useRef<GardenCatSaveState>(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const animRef = useRef<{
    scaleX: number;
    scaleY: number;
    velX: number;
    velY: number;
    catOffsetX: number;
    catTargetX: number;
    catJumpY: number;
    catStation: CatStationId;
    catPosX: number;
    catPosY: number;
    catScale: number;
    catFromX: number;
    catFromY: number;
    catFromScale: number;
    catToX: number;
    catToY: number;
    catToScale: number;
    catJumpProgress: number;
    catStationTimer: number;
    catStationActivityTimer: number;
    activeToolIcon: string | null;
    activeToolActionId: string | null;
    activeToolTimer: number;
    levelUpFlashTimer: number;
    particles: GlowParticle[];
    popups: FloatingTextPopup[];
    fruits: HangingFruit[];
    sideDrops: SidePedestalDrop[];
    tossedToy: TossedCatToy;
    fireflies: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      phase: number;
      color: string;
    }[];
  }>({
    scaleX: 1,
    scaleY: 1,
    velX: 0,
    velY: 0,
    catOffsetX: 0,
    catTargetX: 0,
    catJumpY: 0,
    catStation: "center",
    catPosX: PEDESTAL_CENTER.x,
    catPosY: PEDESTAL_CENTER.y,
    catScale: 1,
    catFromX: PEDESTAL_CENTER.x,
    catFromY: PEDESTAL_CENTER.y,
    catFromScale: 1,
    catToX: PEDESTAL_CENTER.x,
    catToY: PEDESTAL_CENTER.y,
    catToScale: 1,
    catJumpProgress: 1,
    catStationTimer: 260,
    catStationActivityTimer: 0,
    activeToolIcon: null,
    activeToolActionId: null,
    activeToolTimer: 0,
    levelUpFlashTimer: 0,
    particles: [],
    popups: [],
    fruits: [],
    sideDrops: [],
    tossedToy: {
      active: false,
      iconKey: "",
      x: 0,
      y: 0,
      vy: 0,
      groundY: PEDESTAL_CENTER.y - 16,
      timer: 0,
    },
    fireflies: Array.from({ length: 30 }, (_, i) => ({
      x: Math.random() * LOGICAL_W,
      y: Math.random() * (LOGICAL_H * 0.85),
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.4,
      size: 3.5 + (i % 5) * 2,
      phase: Math.random() * Math.PI * 2,
      color:
        i % 3 === 0
          ? "rgba(255, 230, 110, 0.9)"
          : i % 3 === 1
            ? "rgba(255, 135, 200, 0.85)"
            : "rgba(130, 215, 255, 0.85)",
    })),
  });

  useEffect(() => {
    const urls: string[] = [
      "/assets/garden-cat/bg_greenhouse.webp",
      "/assets/garden-cat/bg_sky_palace.webp",
      "/assets/garden-cat/bg_cat_lounge.webp",
      "/assets/garden-cat/icon_water.webp",
      "/assets/garden-cat/icon_sun.webp",
      "/assets/garden-cat/icon_fertilizer.webp",
      "/assets/garden-cat/icon_music.webp",
      "/assets/garden-cat/icon_milk.webp",
      "/assets/garden-cat/icon_fish.webp",
      "/assets/garden-cat/icon_yarn.webp",
      "/assets/garden-cat/icon_cupcake.webp",
      "/assets/garden-cat/icon_basket.webp",
      "/assets/garden-cat/icon_trophy_tree.webp",
      "/assets/garden-cat/icon_trophy_cat.webp",
      "/assets/garden-cat/icon_nam_mascot.webp",
      "/assets/items/fruits/fruit_01.webp",
      "/assets/items/fruits/fruit_02.webp",
      "/assets/english/items/toy_04_star.webp",
    ];
    for (let i = 1; i <= 6; i++) {
      urls.push(`/assets/garden-cat/tree_rainbow_${i}.webp`);
      urls.push(`/assets/garden-cat/tree_dessert_${i}.webp`);
      urls.push(`/assets/garden-cat/tree_crystal_${i}.webp`);
      urls.push(`/assets/garden-cat/cat_white_${i}.webp`);
      urls.push(`/assets/garden-cat/cat_ginger_${i}.webp`);
      urls.push(`/assets/garden-cat/cat_fairy_${i}.webp`);
    }
    urls.forEach((u) => {
      if (!imageCacheRef.current[u]) {
        const img = new Image();
        img.src = u;
        imageCacheRef.current[u] = img;
      }
    });
  }, []);

  function spawnSidePedestalDrops(
    breedId: TreeBreedId,
    stage: 1 | 2 | 3 | 4 | 5 | 6,
    countToSpawn: number,
  ) {
    if (countToSpawn <= 0) return;
    const activeDrops = animRef.current.sideDrops.filter((d) => !d.collecting);
    const maxOnFloor = 6;
    const allowed = Math.min(countToSpawn, maxOnFloor - activeDrops.length);
    if (allowed <= 0) return;

    const slotOffsets: [number, number][] = [
      [-32, -8],
      [32, -8],
      [0, 14],
    ];
    const coinVal = getDropCoinReward(stage);

    for (let k = 0; k < allowed; k++) {
      const currentActive = animRef.current.sideDrops.filter((d) => !d.collecting);
      const leftCount = currentActive.filter((d) => d.side === "left").length;
      const rightCount = currentActive.filter((d) => d.side === "right").length;
      const side: "left" | "right" = leftCount <= rightCount ? "left" : "right";
      const usedSlots = currentActive
        .filter((d) => d.side === side)
        .map((d) => d.slotIdx);
      const freeSlot = [0, 1, 2].find((s) => !usedSlots.includes(s)) ?? (currentActive.length % 3);
      const stageAnchor = side === "left" ? LEFT_STAGE : RIGHT_STAGE;
      const [ox, oy] = slotOffsets[freeSlot] || [0, 0];
      const spec = getTreeBreedDropSpec(breedId, Date.now() + k + currentActive.length);

      animRef.current.sideDrops.push({
        id: Date.now() + Math.random() * 1000 + k,
        side,
        slotIdx: freeSlot,
        iconUrl: spec.iconUrl,
        label: spec.label,
        coinValue: coinVal,
        dropProgress: 0,
        startX: PEDESTAL_CENTER.x + (side === "left" ? -42 : 42),
        startY: PEDESTAL_CENTER.y - 175,
        targetX: stageAnchor.x + ox,
        targetY: stageAnchor.y + oy,
        collecting: false,
        collectProgress: 0,
        phase: (currentActive.length + k) * 1.15,
      });
    }
  }

  function jumpCatToStation(targetStation: CatStationId, activityDuration = 170) {
    const anim = animRef.current;
    anim.catFromX = anim.catPosX;
    anim.catFromY = anim.catPosY;
    anim.catFromScale = anim.catScale;

    if (targetStation === "left") {
      anim.catToX = LEFT_STAGE.x;
      anim.catToY = LEFT_STAGE.y + 8;
      anim.catToScale = 0.78;
    } else if (targetStation === "right") {
      anim.catToX = RIGHT_STAGE.x;
      anim.catToY = RIGHT_STAGE.y + 8;
      anim.catToScale = 0.78;
    } else {
      anim.catToX = PEDESTAL_CENTER.x;
      anim.catToY = PEDESTAL_CENTER.y;
      anim.catToScale = 1.0;
    }

    anim.catStation = targetStation;
    anim.catJumpProgress = 0;
    anim.catOffsetX = 0;
    anim.catTargetX = 0;
    anim.catStationTimer = 240 + Math.floor(Math.random() * 140);
    anim.catStationActivityTimer = activityDuration;
    triggerSquashStretch(0.86, 1.18);
  }

  // Spawn daily specialty drops onto the 2 side pedestals for ANY tree stage (Stages 1..6)!
  useEffect(() => {
    if (state.activeTab !== "tree") return;
    const today = getTodayDateKey();
    const treeState = state.trees[state.activeTreeBreed];
    const stage = getStageFromExp(treeState.exp);
    const quota = getDailyDropQuota(stage);
    const claimedToday =
      treeState.dailyDropsDate === today ? treeState.dailyDropsClaimed || 0 : 0;
    const remainingDaily = Math.max(0, quota - claimedToday);

    // Clear previous breed's uncollected drops when switching breed
    animRef.current.sideDrops = [];
    if (remainingDaily > 0) {
      spawnSidePedestalDrops(
        state.activeTreeBreed,
        stage,
        Math.min(4, remainingDaily),
      );
    }
  }, [state.activeTab, state.activeTreeBreed]);

  // Spawn hanging fruits on Stage 4-6 trees (scaled to fit the new balanced tree size)
  useEffect(() => {
    if (state.activeTab !== "tree") return;
    const stage = getStageFromExp(state.trees[state.activeTreeBreed].exp);
    if (stage < 4) {
      animRef.current.fruits = [];
      return;
    }
    const desiredCount = stage === 4 ? 3 : stage === 5 ? 4 : 5;
    const treeScale = getEntityDisplaySize(true, activeTreeState.exp) / 260;
    const presets: [number, number][] = [
      [Math.round(-62 * treeScale), Math.round(-162 * treeScale)],
      [Math.round(60 * treeScale), Math.round(-158 * treeScale)],
      [0, Math.round(-196 * treeScale)],
      [Math.round(-35 * treeScale), Math.round(-124 * treeScale)],
      [Math.round(38 * treeScale), Math.round(-126 * treeScale)],
    ];
    const currentNonFlying = animRef.current.fruits.filter((f) => !f.flying);
    if (currentNonFlying.length === 0) {
      animRef.current.fruits = presets
        .slice(0, desiredCount)
        .map(([rx, ry], idx) => ({
          id: Date.now() + idx,
          relX: rx,
          relY: ry,
          radius: 16,
          phase: idx * 1.3,
          flying: false,
          flyProgress: 0,
          startX: 0,
          startY: 0,
        }));
    }
  }, [state.activeTab, state.activeTreeBreed, activeTreeState.exp]);

  function triggerSquashStretch(sx = 1.2, sy = 0.82) {
    animRef.current.scaleX = sx;
    animRef.current.scaleY = sy;
  }

  function spawnParticleBurst(
    cx: number,
    cy: number,
    color1: string,
    color2: string,
    count = 26,
    kind: GlowParticle["kind"] = "sparkle",
  ) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.35;
      const speed = 2.0 + Math.random() * 5.2;
      animRef.current.particles.push({
        x: cx + (Math.random() - 0.5) * 32,
        y: cy + (Math.random() - 0.5) * 32,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.6,
        radius: 5 + Math.random() * 8,
        color: i % 2 === 0 ? color1 : color2,
        alpha: 1,
        life: 0,
        maxLife: 40 + Math.random() * 24,
        kind,
      });
    }
  }

  function addFloatingPopup(
    x: number,
    y: number,
    text: string,
    color = "#FFE066",
  ) {
    animRef.current.popups.push({
      x,
      y,
      vy: -1.6,
      text,
      color,
      life: 0,
      maxLife: 62,
    });
  }

  function applyExpToActiveEntity(
    rawExpGain: number,
    actionIconSrc: string | null,
    pColor1: string,
    pColor2: string,
    incrementDailyCare: boolean,
    customPopupText?: string,
    actionId?: string,
  ) {
    const today = getTodayDateKey();
    setState((prev) => {
      const isTree = prev.activeTab === "tree";
      const breedId = isTree ? prev.activeTreeBreed : prev.activeCatBreed;
      const prevEntity = isTree
        ? prev.trees[prev.activeTreeBreed]
        : prev.cats[prev.activeCatBreed];

      const crownMultiplier = 1 + Math.min(0.6, prevEntity.graduatedCount * 0.15);
      const finalGain = Math.round(rawExpGain * crownMultiplier);

      const oldStage = getStageFromExp(prevEntity.exp);
      const nextExp = Math.min(STAGE_THRESHOLDS[5], prevEntity.exp + finalGain);
      const newStage = getStageFromExp(nextExp);

      const sameDay = prevEntity.dailyCareDate === today;
      const nextDailyCareUsed = incrementDailyCare
        ? (sameDay ? prevEntity.dailyCareUsed : 0) + 1
        : sameDay
          ? prevEntity.dailyCareUsed
          : 0;

      const updatedEntity: BreedEntityState = {
        ...prevEntity,
        exp: nextExp,
        totalCareActions: prevEntity.totalCareActions + 1,
        dailyCareUsed: nextDailyCareUsed,
        dailyCareDate: today,
      };

      const nextState: GardenCatSaveState = isTree
        ? {
            ...prev,
            trees: { ...prev.trees, [breedId]: updatedEntity },
          }
        : {
            ...prev,
            cats: { ...prev.cats, [breedId]: updatedEntity },
          };

      saveGardenCatState(nextState);

      triggerSquashStretch(1.22, 0.78);
      if (actionIconSrc) {
        animRef.current.activeToolIcon = actionIconSrc;
        animRef.current.activeToolActionId = actionId || null;
        animRef.current.activeToolTimer = 110;
      }

      const centerY = PEDESTAL_CENTER.y - 135;
      spawnParticleBurst(
        isTree ? PEDESTAL_CENTER.x : animRef.current.catPosX,
        isTree ? centerY : animRef.current.catPosY - 95,
        pColor1,
        pColor2,
        36,
        actionId === "tree_water" ? "droplet" : "sparkle",
      );
      addFloatingPopup(
        isTree ? PEDESTAL_CENTER.x : animRef.current.catPosX,
        (isTree ? centerY : animRef.current.catPosY - 110) - 45,
        customPopupText || `+${finalGain} EXP ✨`,
        "#FFF3BF",
      );

      // In Tree Mode: when caring with a tool/dew, shake the tree and drop 1 specialty gift onto the left/right pedestal!
      if (isTree && actionIconSrc) {
        spawnSidePedestalDrops(prev.activeTreeBreed, newStage, 1);
      }

      // In Cat Mode: jump to the Left Eating Bed for food/milk/cupcake, or Right Toy Bed for yarn!
      if (!isTree && actionIconSrc) {
        const targetStation: CatStationId =
          actionId === "cat_yarn"
            ? "right"
            : actionId === "cat_milk" ||
                actionId === "cat_fish" ||
                actionId === "cat_cupcake"
              ? "left"
              : animRef.current.catStation;
        jumpCatToStation(targetStation, 200);
        const anchor =
          targetStation === "left"
            ? LEFT_STAGE
            : targetStation === "right"
              ? RIGHT_STAGE
              : PEDESTAL_CENTER;
        animRef.current.tossedToy = {
          active: true,
          iconKey: actionIconSrc,
          x: anchor.x + (targetStation === "left" ? -18 : targetStation === "right" ? 18 : 35),
          y: anchor.y - 125,
          vy: 2,
          groundY: anchor.y - 10,
          timer: 115,
        };
      }

      if (newStage > oldStage) {
        animRef.current.levelUpFlashTimer = 90;
        spawnParticleBurst(
          PEDESTAL_CENTER.x,
          centerY,
          "#FFE066",
          "#FF6B9D",
          55,
          "star",
        );
        addFloatingPopup(
          PEDESTAL_CENTER.x,
          centerY - 105,
          `🎉 LÊN CẤP ${newStage}!`,
          "#FFD43B",
        );
        if (soundEnabled) {
          playArcadeCareSfx(700, "levelup");
          const stageTitle = isTree
            ? TREE_BREEDS[prev.activeTreeBreed].stageNames[newStage - 1]
            : CAT_BREEDS[prev.activeCatBreed].stageNames[newStage - 1];
          onSpeak(`Oa! Chúc mừng bé Nấm! Đã tiến hóa lên ${stageTitle}!`);
        }
      }

      return nextState;
    });
  }

  function handleUseCareAction(action: CareActionConfig) {
    // Check daily coin-care limit (3 per day per breed for steady 5-6 day growth!)
    if (activeEntityState.dailyCareUsed >= MAX_DAILY_COIN_CARES) {
      const msg =
        "Hôm nay cây/mèo đã no 3 lượt quà Xu rồi! Nấm hãy dùng 🌟 Sương Bài Học hoặc bấm 🎓 Đố Vui để lớn thêm nhé!";
      setSpeechBubble(msg);
      if (soundEnabled) onSpeak(msg);
      return;
    }

    if (action.canUseFreeCooldown && freeCareCooldown === 0) {
      setFreeCareCooldown(15);
      if (soundEnabled) playArcadeCareSfx(action.soundFreq, "care", action.id);
      applyExpToActiveEntity(
        action.expGain,
        action.iconSrc,
        action.particleColor,
        action.particleSecondary,
        true,
        undefined,
        action.id,
      );
      return;
    }

    if (goldCoins < action.coinCost) {
      if (action.canUseStickerTrade && tradableObjectStickers.length > 0) {
        setStickerTradeModalAction(action);
        return;
      }
      if (soundEnabled) {
        onSpeak(
          `Bé cần ${action.coinCost} xu vàng hoặc dùng Giọt Sương Bài Học miễn phí nhé!`,
        );
      }
      return;
    }

    const ok = onSpendCoins(action.coinCost);
    if (!ok) return;
    if (soundEnabled) playArcadeCareSfx(action.soundFreq, "care", action.id);
    applyExpToActiveEntity(
      action.expGain,
      action.iconSrc,
      action.particleColor,
      action.particleSecondary,
      true,
      undefined,
      action.id,
    );
  }

  function handleTradeObjectStickerForCare(
    pastry: KawaiiPastryAsset,
    action: CareActionConfig,
  ) {
    const currentCount = questItemInventory[pastry.id] || 0;
    if (currentCount <= 0) return;
    const nextInv: QuestItemInventory = {
      ...questItemInventory,
      [pastry.id]: currentCount - 1,
    };
    if (nextInv[pastry.id] <= 0) {
      delete nextInv[pastry.id];
    }
    saveQuestItemInventory(nextInv);
    onUpdateQuestItemInventory(nextInv);
    setStickerTradeModalAction(null);

    if (soundEnabled) {
      playArcadeCareSfx(action.soundFreq, "care", action.id);
      onSpeak(
        `Đã đổi một sticker ${pastry.name} lấy gói chăm sóc ${action.title}!`,
      );
    }
    applyExpToActiveEntity(
      action.expGain + 10,
      action.iconSrc,
      action.particleColor,
      action.particleSecondary,
      true,
      `Đổi Sticker +${action.expGain + 10} EXP 🌟`,
      action.id,
    );
  }

  function handleUseLessonDewCharge() {
    if (state.lessonDewCharges <= 0) {
      if (state.dailyQuizUsed < MAX_DAILY_QUIZZES) {
        setQuizModalOpen(true);
        setQuizFeedback(null);
        setWrongQuizLabels([]);
        setQuizCorrectLabel(null);
      } else {
        const msg =
          "Hôm nay Nấm đã giải hết 2 câu Đố Vui tại vườn rồi! Hãy ra Sảnh Chính học thêm bài mới để nhận 🌟 Sương Bài Học nhé!";
        setSpeechBubble(msg);
        if (soundEnabled) onSpeak(msg);
      }
      return;
    }
    setState((prev) => {
      const next = {
        ...prev,
        lessonDewCharges: Math.max(0, prev.lessonDewCharges - 1),
      };
      saveGardenCatState(next);
      return next;
    });
    if (soundEnabled) {
      playArcadeCareSfx(840, "levelup");
      onSpeak(
        "Giọt sương bài học của bé Nấm đã truyền năng lượng tri thức giúp cây và mèo lớn lên!",
      );
    }
    applyExpToActiveEntity(
      25,
      "/assets/garden-cat/icon_nam_mascot.webp",
      "#FFD43B",
      "#74C0FC",
      false,
      "🌟 Sương Bài Học +25 EXP!",
    );
  }

  function handleAnswerMiniQuiz(option: { label: string; isCorrect: boolean }) {
    if (quizCorrectLabel !== null || wrongQuizLabels.includes(option.label)) {
      return;
    }
    if (!option.isCorrect) {
      setWrongQuizLabels((prev) =>
        prev.includes(option.label) ? prev : [...prev, option.label],
      );
      setQuizFeedback("Chưa đúng rồi, bé Nấm thử chọn đáp án khác nhé! 💪");
      if (soundEnabled) {
        playCharacterTapSound();
        onSpeak("Chưa đúng rồi, bé Nấm thử chọn lại nhé!");
      }
      return;
    }

    setQuizCorrectLabel(option.label);
    const today = getTodayDateKey();
    if (soundEnabled) {
      playRewardTone();
      onSpeak(
        "Chính xác! Bé Nấm giỏi quá! Con nhận được hai mươi điểm năng lượng và thêm ba xu vàng!",
      );
    }
    onAddCoins(3);
    setState((prev) => {
      const next: GardenCatSaveState = {
        ...prev,
        quizSolvedCount: prev.quizSolvedCount + 1,
        dailyQuizUsed:
          (prev.dailyQuizDate === today ? prev.dailyQuizUsed : 0) + 1,
        dailyQuizDate: today,
      };
      saveGardenCatState(next);
      return next;
    });

    window.setTimeout(() => {
      setQuizModalOpen(false);
      setQuizFeedback(null);
      setWrongQuizLabels([]);
      setQuizCorrectLabel(null);
      setQuizIdx((i) => (i + 1) % MINI_QUIZ_BANK.length);

      applyExpToActiveEntity(
        20,
        "/assets/garden-cat/icon_nam_mascot.webp",
        "#69DB7C",
        "#FFD43B",
        false,
        "🎓 Đố Vui +20 EXP & +3 Xu!",
      );
    }, 550);
  }

  function handleHarvestAllFruits() {
    let harvestedNow = 0;
    animRef.current.fruits.forEach((f) => {
      if (!f.flying) {
        f.flying = true;
        f.flyProgress = 0;
        f.startX = PEDESTAL_CENTER.x + f.relX;
        f.startY = PEDESTAL_CENTER.y + f.relY;
        harvestedNow++;
      }
    });
    if (harvestedNow > 0) {
      if (soundEnabled) playArcadeCareSfx(760, "harvest");
      const coinsEarned = harvestedNow * 2;
      onAddCoins(coinsEarned);
      setState((prev) => {
        const next = {
          ...prev,
          harvestedFruitTotal: prev.harvestedFruitTotal + harvestedNow,
        };
        saveGardenCatState(next);
        return next;
      });
      addFloatingPopup(
        PEDESTAL_CENTER.x,
        PEDESTAL_CENTER.y - 210,
        `🧺 Thu hoạch +${coinsEarned} Xu Vàng!`,
        "#FFD43B",
      );
      window.setTimeout(() => {
        setState((s) => ({ ...s }));
      }, 4200);
    }
  }

  function handleGraduateStage6() {
    if (progressInfo.stage < 6) return;
    const isTree = state.activeTab === "tree";
    const activeStickerId = isTree
      ? TREE_BREEDS[state.activeTreeBreed].stickerId
      : CAT_BREEDS[state.activeCatBreed].stickerId;

    // 1. Unlock the Stage 6 Sticker in Set 3 of Storybook (Khu Giải Trí) + Vault!
    const graduatedSticker = awardGardenCatGraduationSticker(activeStickerId);
    setGardenCatStickerInv(loadGardenCatStickerInventory());

    // 2. Also award +1 Nấm VIP Sticker & +20 Gold Coins!
    const roundSeed =
      activeEntityState.graduatedCount +
      state.quizSolvedCount +
      completedLessonsCount +
      1;
    const namSticker = awardNamStickerOnDailyQuest(roundSeed);
    const coinsEarned = 20;
    onAddCoins(coinsEarned);

    const graduatedTitle = isTree
      ? TREE_BREEDS[state.activeTreeBreed].name
      : CAT_BREEDS[state.activeCatBreed].name;

    // 3. Store in Vault (graduatedCount + 1), reset this breed to Stage 1 for future cycles, and switch to next breed!
    setState((prev) => {
      if (isTree) {
        const curId = prev.activeTreeBreed;
        const cur = prev.trees[curId];
        const order: TreeBreedId[] = ["rainbow", "dessert", "crystal"];
        const nextBreed =
          order.find(
            (id) => id !== curId && prev.trees[id].graduatedCount === 0,
          ) || order[(order.indexOf(curId) + 1) % order.length];

        const nextState: GardenCatSaveState = {
          ...prev,
          activeTreeBreed: nextBreed,
          trees: {
            ...prev.trees,
            [curId]: {
              ...cur,
              exp: 0, // Stored in Vault & converted to Sticker, so stage resets cleanly!
              graduatedCount: cur.graduatedCount + 1,
            },
          },
        };
        saveGardenCatState(nextState);
        return nextState;
      } else {
        const curId = prev.activeCatBreed;
        const cur = prev.cats[curId];
        const order: CatBreedId[] = ["white", "ginger", "fairy"];
        const nextBreed =
          order.find(
            (id) => id !== curId && prev.cats[id].graduatedCount === 0,
          ) || order[(order.indexOf(curId) + 1) % order.length];

        const nextState: GardenCatSaveState = {
          ...prev,
          activeCatBreed: nextBreed,
          cats: {
            ...prev.cats,
            [curId]: {
              ...cur,
              exp: 0, // Stored in Vault & converted to Sticker!
              graduatedCount: cur.graduatedCount + 1,
            },
          },
        };
        saveGardenCatState(nextState);
        return nextState;
      }
    });

    if (soundEnabled) {
      playRewardTone();
      onSpeak(
        `Chúc mừng bé Nấm! ${graduatedTitle} đã đạt Cấp Sáu, được cất vào Kho Vinh Danh và hóa thành Sticker Cấp Sáu trong Khu Giải Trí! Con nhận thêm hai mươi xu vàng và Sticker Bé Nấm: ${namSticker.sticker.name}!`,
      );
    }

    setGraduationModalAward({
      title: graduatedTitle,
      graduatedSticker,
      namSticker,
      coinsEarned,
    });
  }

  function handleResetCurrentBreedToStage1() {
    setState((prev) => {
      const isTree = prev.activeTab === "tree";
      if (isTree) {
        const id = prev.activeTreeBreed;
        const cur = prev.trees[id];
        const next: GardenCatSaveState = {
          ...prev,
          trees: {
            ...prev.trees,
            [id]: {
              ...cur,
              exp: 0,
            },
          },
        };
        saveGardenCatState(next);
        return next;
      } else {
        const id = prev.activeCatBreed;
        const cur = prev.cats[id];
        const next: GardenCatSaveState = {
          ...prev,
          cats: {
            ...prev.cats,
            [id]: {
              ...cur,
              exp: 0,
            },
          },
        };
        saveGardenCatState(next);
        return next;
      }
    });
    setConfirmResetOpen(false);
    triggerSquashStretch(0.8, 1.25);
    if (soundEnabled) {
      playArcadeCareSfx(580, "care");
      onSpeak("Đã ươm lại từ Cấp Một! Mình cùng chăm sóc hàng ngày nhé!");
    }
  }

  function collectSidePedestalDropItem(drop: SidePedestalDrop) {
    if (drop.collecting) return;
    drop.collecting = true;
    drop.collectProgress = 0;
    drop.startX = drop.targetX;
    drop.startY = drop.targetY;

    if (soundEnabled) playArcadeCareSfx(860, "harvest");
    onAddCoins(drop.coinValue);
    spawnParticleBurst(
      drop.targetX,
      drop.targetY - 12,
      "#FFE066",
      "#FF6B9D",
      22,
      "star",
    );
    applyExpToActiveEntity(
      5,
      null,
      "#FFD43B",
      "#FF6B9D",
      false,
      `🎁 ${drop.label}: +${drop.coinValue} Xu & +5 EXP!`,
    );

    const today = getTodayDateKey();
    setState((prev) => {
      const curBreed = prev.activeTreeBreed;
      const curTree = prev.trees[curBreed];
      const sameDay = curTree.dailyDropsDate === today;
      const nextClaimed = (sameDay ? curTree.dailyDropsClaimed || 0 : 0) + 1;
      const next: GardenCatSaveState = {
        ...prev,
        harvestedFruitTotal: prev.harvestedFruitTotal + 1,
        trees: {
          ...prev.trees,
          [curBreed]: {
            ...curTree,
            dailyDropsClaimed: nextClaimed,
            dailyDropsDate: today,
          },
        },
      };
      saveGardenCatState(next);
      return next;
    });
  }

  // ============================================================================
  // CANVAS CLICK / TOUCH HIT-TESTING (Mini Corner Shelf Swap, Petting, Fruits, Side Pedestals)
  // ============================================================================
  function handleCanvasPointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const lx = ((e.clientX - rect.left) / rect.width) * LOGICAL_W;
    const ly = ((e.clientY - rect.top) / rect.height) * LOGICAL_H;

    // 1. Check if tapping a specialty drop on the Left/Right Pedestal OR a hanging fruit in Tree Mode
    if (state.activeTab === "tree") {
      for (const d of animRef.current.sideDrops) {
        if (!d.collecting) {
          const p = Math.min(1, d.dropProgress);
          const curX = d.startX + (d.targetX - d.startX) * p;
          const curY = d.startY + (d.targetY - d.startY) * p;
          if (Math.hypot(lx - curX, ly - (curY - 14)) <= 48) {
            collectSidePedestalDropItem(d);
            setSpeechBubble(
              `Nấm nhặt được ${d.label} ở bệ phụ, đổi ngay +${d.coinValue} Xu Vàng và +5 EXP! 🪙✨`,
            );
            return;
          }
        }
      }

      // Also allow tapping anywhere on the Left or Right Pedestal surface to collect a gift resting there
      const nearLeftStage = Math.hypot(lx - LEFT_STAGE.x, ly - LEFT_STAGE.y) <= 95;
      const nearRightStage = Math.hypot(lx - RIGHT_STAGE.x, ly - RIGHT_STAGE.y) <= 95;
      if (nearLeftStage || nearRightStage) {
        const targetSide = nearLeftStage ? "left" : "right";
        const candidate = animRef.current.sideDrops.find(
          (d) => !d.collecting && d.side === targetSide,
        );
        if (candidate) {
          collectSidePedestalDropItem(candidate);
          setSpeechBubble(
            `Nấm thu hoạch ${candidate.label} ở bệ ${targetSide === "left" ? "trái" : "phải"}, nhận +${candidate.coinValue} Xu Vàng! 🪙✨`,
          );
          return;
        }
      }

      for (const f of animRef.current.fruits) {
        if (!f.flying) {
          const fx = PEDESTAL_CENTER.x + f.relX;
          const fy = PEDESTAL_CENTER.y + f.relY;
          if (Math.hypot(lx - fx, ly - fy) <= 38) {
            f.flying = true;
            f.flyProgress = 0;
            f.startX = fx;
            f.startY = fy;
            if (soundEnabled) playArcadeCareSfx(820, "harvest");
            onAddCoins(2);
            applyExpToActiveEntity(
              5,
              null,
              "#FFD43B",
              "#FF6B9D",
              false,
              "🍓 Hái Quả +2 Xu & +5 EXP!",
            );
            setState((prev) => {
              const next = {
                ...prev,
                harvestedFruitTotal: prev.harvestedFruitTotal + 1,
              };
              saveGardenCatState(next);
              return next;
            });
            return;
          }
        }
      }
    }

    // 1B. In Cat Mode: Check if tapping the Left Eating Bed, Right Toy Bed, or Center Rug to make the cat jump!
    if (state.activeTab === "cat") {
      if (Math.hypot(lx - LEFT_STAGE.x, ly - (LEFT_STAGE.y - 25)) <= 105) {
        jumpCatToStation("left", 190);
        if (soundEnabled) {
          playCharacterTapSound();
          playArcadeCareSfx(680, "care", "cat_fish");
        }
        spawnParticleBurst(LEFT_STAGE.x, LEFT_STAGE.y - 45, "#FF92B2", "#FFE066", 20, "heart");
        addFloatingPopup(LEFT_STAGE.x, LEFT_STAGE.y - 95, "🍽️ Măm măm ngon quá ~!", "#FFF3BF");
        setSpeechBubble("Meo ~ Mình nhảy sang Bệ Ăn bên trái măm sữa ấm và bánh cá đây! 🍼🐟");
        return;
      }
      if (Math.hypot(lx - RIGHT_STAGE.x, ly - (RIGHT_STAGE.y - 25)) <= 105) {
        jumpCatToStation("right", 190);
        if (soundEnabled) {
          playCharacterTapSound();
          playArcadeCareSfx(740, "care", "cat_yarn");
        }
        spawnParticleBurst(RIGHT_STAGE.x, RIGHT_STAGE.y - 45, "#DA77F2", "#74C0FC", 20, "star");
        addFloatingPopup(RIGHT_STAGE.x, RIGHT_STAGE.y - 95, "🧶 Vờn cuộn len vui ghê ~!", "#E5DBFF");
        setSpeechBubble("Meo ~ Mình nhảy phóc sang Đệm Đồ Chơi bên phải vờn cuộn len cầu vồng! 🧶🌟");
        return;
      }
      if (
        animRef.current.catStation !== "center" &&
        Math.hypot(lx - PEDESTAL_CENTER.x, ly - (PEDESTAL_CENTER.y - 50)) <= 125
      ) {
        jumpCatToStation("center", 120);
        if (soundEnabled) playCharacterTapSound();
        spawnParticleBurst(PEDESTAL_CENTER.x, PEDESTAL_CENTER.y - 60, "#FFE066", "#FF6B9D", 18, "heart");
        addFloatingPopup(PEDESTAL_CENTER.x, PEDESTAL_CENTER.y - 120, "🐾 Về thảm chính nào ~!", "#FFF3BF");
        return;
      }
    }

    // 2. Check if tapping Compact Mini Slot 1 (Top-Left Shelf)
    if (Math.hypot(lx - MINI_SLOT_1.x, ly - (MINI_SLOT_1.y - 30)) <= 56) {
      if (soundEnabled) playArcadeCareSfx(640, "care");
      spawnParticleBurst(
        MINI_SLOT_1.x,
        MINI_SLOT_1.y - 30,
        "#FFE066",
        "#74C0FC",
        18,
        "star",
      );
      triggerSquashStretch(1.18, 0.84);
      setState((prev) => {
        const next: GardenCatSaveState =
          prev.activeTab === "tree"
            ? { ...prev, activeTreeBreed: sideBreeds.first as TreeBreedId }
            : { ...prev, activeCatBreed: sideBreeds.first as CatBreedId };
        saveGardenCatState(next);
        return next;
      });
      return;
    }

    // 3. Check if tapping Compact Mini Slot 2 (Top-Left Shelf)
    if (Math.hypot(lx - MINI_SLOT_2.x, ly - (MINI_SLOT_2.y - 30)) <= 56) {
      if (soundEnabled) playArcadeCareSfx(640, "care");
      spawnParticleBurst(
        MINI_SLOT_2.x,
        MINI_SLOT_2.y - 30,
        "#FFE066",
        "#DA77F2",
        18,
        "star",
      );
      triggerSquashStretch(1.18, 0.84);
      setState((prev) => {
        const next: GardenCatSaveState =
          prev.activeTab === "tree"
            ? { ...prev, activeTreeBreed: sideBreeds.second as TreeBreedId }
            : { ...prev, activeCatBreed: sideBreeds.second as CatBreedId };
        saveGardenCatState(next);
        return next;
      });
      return;
    }

    // 4. Check if tapping Active Tree (at PEDESTAL_CENTER) or Active Cat (at its current station!)
    const activeCharX =
      state.activeTab === "cat"
        ? animRef.current.catPosX + animRef.current.catOffsetX
        : PEDESTAL_CENTER.x;
    const activeCharY =
      (state.activeTab === "cat" ? animRef.current.catPosY : PEDESTAL_CENTER.y) -
      115 * (state.activeTab === "cat" ? animRef.current.catScale : 1);
    if (Math.hypot(lx - activeCharX, ly - activeCharY) <= 145) {
      triggerSquashStretch(1.2, 0.82);
      if (soundEnabled) playCharacterTapSound();
      spawnParticleBurst(lx, ly, "#FF6B9D", "#FFE066", 20, "heart");
      const lines =
        state.activeTab === "tree"
          ? TREE_BREEDS[state.activeTreeBreed].speechLines
          : CAT_BREEDS[state.activeCatBreed].speechLines;
      const line = lines[Math.floor(Math.random() * lines.length)];
      setSpeechBubble(line);
      if (soundEnabled) onSpeak(line);
      if (state.activeTab === "cat") {
        // Cycle jumping between Center -> Left Eating Bed -> Right Toy Bed when tapped!
        const nextOrder: Record<CatStationId, CatStationId> = {
          center: "left",
          left: "right",
          right: "center",
        };
        jumpCatToStation(nextOrder[animRef.current.catStation], 180);
      }
    }
  }

  // ============================================================================
  // 60FPS RETINA <canvas> RENDER LOOP WITH `globalCompositeOperation = 'lighter'`
  // ============================================================================
  useEffect(() => {
    let rafId = 0;
    let frameCount = 0;

    const renderLoop = () => {
      frameCount++;
      const canvas = canvasRef.current;
      if (canvas) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const targetW = LOGICAL_W * dpr;
        const targetH = LOGICAL_H * dpr;
        if (canvas.width !== targetW || canvas.height !== targetH) {
          canvas.width = targetW;
          canvas.height = targetH;
        }
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.save();
          ctx.scale(dpr, dpr);

          const curState = stateRef.current;
          const anim = animRef.current;
          const t = frameCount * 0.035;

          // 1. Update Spring Squash & Stretch
          const stiffness = 0.18;
          const damping = 0.76;
          anim.velX = (anim.velX + (1 - anim.scaleX) * stiffness) * damping;
          anim.velY = (anim.velY + (1 - anim.scaleY) * stiffness) * damping;
          anim.scaleX += anim.velX;
          anim.scaleY += anim.velY;

          // Update Cat 3-Station Jumping & Eating/Playing AI
          if (curState.activeTab === "cat") {
            if (anim.catJumpProgress < 1) {
              anim.catJumpProgress = Math.min(1, anim.catJumpProgress + 0.036);
              const p = anim.catJumpProgress;
              const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
              const arcHeight = Math.sin(p * Math.PI) * 118;
              anim.catPosX = anim.catFromX + (anim.catToX - anim.catFromX) * ease;
              anim.catPosY =
                anim.catFromY + (anim.catToY - anim.catFromY) * ease - arcHeight;
              anim.catScale =
                anim.catFromScale + (anim.catToScale - anim.catFromScale) * ease;
              anim.catJumpY = 0;
              if (anim.catJumpProgress >= 1) {
                triggerSquashStretch(1.22, 0.8);
                if (anim.catStation === "left") {
                  spawnParticleBurst(
                    LEFT_STAGE.x,
                    LEFT_STAGE.y - 36,
                    "#FF92B2",
                    "#FFE066",
                    14,
                    "heart",
                  );
                } else if (anim.catStation === "right") {
                  spawnParticleBurst(
                    RIGHT_STAGE.x,
                    RIGHT_STAGE.y - 36,
                    "#DA77F2",
                    "#74C0FC",
                    14,
                    "star",
                  );
                }
              }
            } else {
              // At rest on current station (`center`, `left`, or `right`)
              const dx = anim.catTargetX - anim.catOffsetX;
              if (Math.abs(dx) > 2.0) {
                anim.catOffsetX += Math.sign(dx) * Math.min(Math.abs(dx), 2.8);
                anim.catJumpY = -Math.abs(Math.sin(frameCount * 0.22)) * 12;
              } else {
                anim.catJumpY *= 0.8;
              }

              // Munching at Left Bed or Batting Yarn at Right Bed
              if (anim.catStationActivityTimer > 0) {
                anim.catStationActivityTimer--;
                if (anim.catStation === "left") {
                  anim.catJumpY = -Math.abs(Math.sin(frameCount * 0.28)) * 9;
                  if (frameCount % 38 === 0) {
                    spawnParticleBurst(
                      LEFT_STAGE.x - 16,
                      LEFT_STAGE.y - 52,
                      "#FF6B9D",
                      "#FFE066",
                      4,
                      "heart",
                    );
                  }
                } else if (anim.catStation === "right") {
                  anim.catJumpY = -Math.abs(Math.sin(frameCount * 0.34)) * 18;
                  if (frameCount % 36 === 0) {
                    spawnParticleBurst(
                      RIGHT_STAGE.x + 16,
                      RIGHT_STAGE.y - 56,
                      "#DA77F2",
                      "#74C0FC",
                      4,
                      "star",
                    );
                  }
                }
              }

              // Autonomous station hopping every ~6–7 seconds so the cat explores all 3 beds!
              anim.catStationTimer--;
              if (anim.catStationTimer <= 0 && !anim.tossedToy.active) {
                const stations: CatStationId[] = ["center", "left", "right"];
                const choices = stations.filter((s) => s !== anim.catStation);
                const nextSt = choices[Math.floor(Math.random() * choices.length)];
                jumpCatToStation(nextSt, 165);
              }
            }
          } else {
            anim.catOffsetX = 0;
            anim.catJumpY = 0;
            // In Tree Mode: periodically drop unclaimed daily gifts onto the 2 side pedestals
            if (frameCount % 360 === 120) {
              const today = getTodayDateKey();
              const treeEntity = curState.trees[curState.activeTreeBreed];
              const stage = getStageFromExp(treeEntity.exp);
              const quota = getDailyDropQuota(stage);
              const claimed =
                treeEntity.dailyDropsDate === today
                  ? treeEntity.dailyDropsClaimed || 0
                  : 0;
              const onFloor = anim.sideDrops.filter((d) => !d.collecting).length;
              if (claimed + onFloor < quota && onFloor < 6) {
                spawnSidePedestalDrops(curState.activeTreeBreed, stage, 1);
              }
            }
          }

          // 2. Draw Room Background
          const bgUrl =
            curState.activeTab === "cat"
              ? "/assets/garden-cat/bg_cat_lounge.webp"
              : curState.treeBgTheme === "palace"
                ? "/assets/garden-cat/bg_sky_palace.webp"
                : "/assets/garden-cat/bg_greenhouse.webp";
          const bgImg = imageCacheRef.current[bgUrl];
          if (bgImg && bgImg.complete && bgImg.naturalWidth > 0) {
            ctx.drawImage(bgImg, 0, 0, LOGICAL_W, LOGICAL_H);
          } else {
            const grad = ctx.createLinearGradient(0, 0, 0, LOGICAL_H);
            grad.addColorStop(0, "#FCE8F6");
            grad.addColorStop(1, "#E3F2FD");
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, LOGICAL_W, LOGICAL_H);
          }

          if (curState.nightMode) {
            ctx.save();
            const nightGrad = ctx.createLinearGradient(0, 0, 0, LOGICAL_H);
            nightGrad.addColorStop(0, "rgba(18, 12, 54, 0.56)");
            nightGrad.addColorStop(0.6, "rgba(28, 18, 68, 0.44)");
            nightGrad.addColorStop(1, "rgba(15, 10, 42, 0.52)");
            ctx.fillStyle = nightGrad;
            ctx.fillRect(0, 0, LOGICAL_W, LOGICAL_H);
            ctx.restore();
          }

          // 3. Volumetric God Rays / Moonbeams (`globalCompositeOperation = 'lighter'`)
          ctx.save();
          ctx.globalCompositeOperation = "lighter";
          for (let r = 0; r < 3; r++) {
            const rayX = 210 + r * 300 + Math.sin(t * 0.5 + r) * 28;
            const rayGrad = ctx.createLinearGradient(
              rayX,
              0,
              rayX + 150,
              LOGICAL_H * 0.85,
            );
            if (curState.nightMode) {
              rayGrad.addColorStop(0, "rgba(150, 130, 255, 0.16)");
              rayGrad.addColorStop(0.5, "rgba(110, 200, 255, 0.08)");
              rayGrad.addColorStop(1, "rgba(110, 200, 255, 0)");
            } else {
              rayGrad.addColorStop(0, "rgba(255, 245, 190, 0.22)");
              rayGrad.addColorStop(0.5, "rgba(255, 210, 150, 0.09)");
              rayGrad.addColorStop(1, "rgba(255, 210, 150, 0)");
            }
            ctx.fillStyle = rayGrad;
            ctx.beginPath();
            ctx.moveTo(rayX - 55, 0);
            ctx.lineTo(rayX + 75, 0);
            ctx.lineTo(rayX + 240, LOGICAL_H * 0.9);
            ctx.lineTo(rayX - 10, LOGICAL_H * 0.9);
            ctx.closePath();
            ctx.fill();
          }
          ctx.restore();

          // 4. Draw Compact Corner Mini Shelf for the 2 Inactive Varieties (Top-Left, 84px each!)
          ctx.save();
          ctx.fillStyle = "rgba(255, 255, 255, 0.82)";
          ctx.strokeStyle = "rgba(255, 224, 102, 0.95)";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.roundRect(24, 56, 242, 136, 20);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = "#5C2B48";
          ctx.font = "bold 12px 'Nunito', sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("✨ Góc Cây/Mèo Đang Nghỉ (Bấm để đổi)", 145, 74);
          ctx.restore();

          const drawMiniCornerSlot = (
            breedId: TreeBreedId | CatBreedId,
            slotX: number,
            slotY: number,
          ) => {
            const isTree = curState.activeTab === "tree";
            const entityState = isTree
              ? curState.trees[breedId as TreeBreedId]
              : curState.cats[breedId as CatBreedId];
            const stage = getStageFromExp(entityState.exp);
            const spriteUrl = isTree
              ? `/assets/garden-cat/tree_${breedId}_${stage}.webp`
              : `/assets/garden-cat/cat_${breedId}_${stage}.webp`;
            const spriteImg = imageCacheRef.current[spriteUrl];
            const meta = isTree
              ? TREE_BREEDS[breedId as TreeBreedId]
              : CAT_BREEDS[breedId as CatBreedId];

            // Soft circular pad
            ctx.save();
            ctx.fillStyle = "rgba(248, 240, 252, 0.9)";
            ctx.strokeStyle = meta.accent;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(slotX, slotY - 30, 40, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.restore();

            const miniSize = 76;
            if (spriteImg && spriteImg.complete && spriteImg.naturalWidth > 0) {
              ctx.save();
              ctx.translate(slotX, slotY + 4);
              ctx.drawImage(
                spriteImg,
                -miniSize / 2,
                -miniSize,
                miniSize,
                miniSize,
              );
              ctx.restore();
            }

            // Mini badge
            ctx.save();
            ctx.fillStyle = meta.accent;
            ctx.beginPath();
            ctx.roundRect(slotX - 46, slotY + 6, 92, 20, 10);
            ctx.fill();
            ctx.fillStyle = "#FFFFFF";
            ctx.font = "bold 11px 'Nunito', sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            const label =
              entityState.graduatedCount > 0
                ? `👑×${entityState.graduatedCount} · Cấp ${stage}`
                : `${meta.badge} Cấp ${stage}`;
            ctx.fillText(label, slotX, slotY + 16);
            ctx.restore();
          };

          const curSideList =
            curState.activeTab === "tree"
              ? (["rainbow", "dessert", "crystal"].filter(
                  (id) => id !== curState.activeTreeBreed,
                ) as TreeBreedId[])
              : (["white", "ginger", "fairy"].filter(
                  (id) => id !== curState.activeCatBreed,
                ) as CatBreedId[]);

          drawMiniCornerSlot(curSideList[0], MINI_SLOT_1.x, MINI_SLOT_1.y);
          drawMiniCornerSlot(curSideList[1], MINI_SLOT_2.x, MINI_SLOT_2.y);

          // 4B. Draw Interactive Left & Right Stations (Cat Feeding/Toy Beds OR Tree Gift Pedestals!)
          const isTree = curState.activeTab === "tree";
          if (!isTree) {
            // LEFT STATION: 🍽️ Góc Măm Măm (Milk + Fish + Cupcake)
            const milkImg = imageCacheRef.current["/assets/garden-cat/icon_milk.webp"];
            const fishImg = imageCacheRef.current["/assets/garden-cat/icon_fish.webp"];
            const cakeImg = imageCacheRef.current["/assets/garden-cat/icon_cupcake.webp"];
            const yarnImg = imageCacheRef.current["/assets/garden-cat/icon_yarn.webp"];
            const starToyImg = imageCacheRef.current["/assets/english/items/toy_04_star.webp"];

            // Highlight ring on Left Eating Bed
            ctx.save();
            ctx.globalCompositeOperation = "lighter";
            const leftGlow = ctx.createRadialGradient(
              LEFT_STAGE.x,
              LEFT_STAGE.y,
              6,
              LEFT_STAGE.x,
              LEFT_STAGE.y,
              82,
            );
            leftGlow.addColorStop(
              0,
              anim.catStation === "left"
                ? "rgba(255, 165, 195, 0.55)"
                : "rgba(255, 210, 225, 0.25)",
            );
            leftGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
            ctx.fillStyle = leftGlow;
            ctx.beginPath();
            ctx.ellipse(LEFT_STAGE.x, LEFT_STAGE.y, 82, 34, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Draw Food & Milk Bowls on Left Bed
            const munchBounce =
              anim.catStation === "left" && anim.catJumpProgress >= 1
                ? Math.sin(t * 7) * 3.5
                : Math.sin(t * 2) * 1.5;
            if (milkImg && milkImg.complete && milkImg.naturalWidth > 0) {
              ctx.save();
              ctx.drawImage(
                milkImg,
                LEFT_STAGE.x - 68,
                LEFT_STAGE.y - 34 + munchBounce,
                48,
                48,
              );
              ctx.restore();
            }
            if (fishImg && fishImg.complete && fishImg.naturalWidth > 0) {
              ctx.save();
              ctx.drawImage(
                fishImg,
                LEFT_STAGE.x + 22,
                LEFT_STAGE.y - 30 - munchBounce,
                48,
                48,
              );
              ctx.restore();
            }
            if (cakeImg && cakeImg.complete && cakeImg.naturalWidth > 0) {
              ctx.save();
              ctx.drawImage(
                cakeImg,
                LEFT_STAGE.x - 20,
                LEFT_STAGE.y - 12 + munchBounce * 0.6,
                42,
                42,
              );
              ctx.restore();
            }

            // Pill Label under Left Eating Bed
            ctx.save();
            ctx.fillStyle =
              anim.catStation === "left"
                ? "rgba(230, 73, 128, 0.94)"
                : "rgba(255, 255, 255, 0.88)";
            ctx.strokeStyle = "#F783AC";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(LEFT_STAGE.x - 68, LEFT_STAGE.y + 34, 136, 24, 12);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = anim.catStation === "left" ? "#FFFFFF" : "#A61E4D";
            ctx.font = "bold 11.5px 'Nunito', sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(
              anim.catStation === "left" ? "🍼 Đang Măm Măm ~" : "🍽️ Góc Măm Măm",
              LEFT_STAGE.x,
              LEFT_STAGE.y + 46,
            );
            ctx.restore();

            // RIGHT STATION: 🧶 Góc Đồ Chơi (Rainbow Yarn + Star Toy)
            ctx.save();
            ctx.globalCompositeOperation = "lighter";
            const rightGlow = ctx.createRadialGradient(
              RIGHT_STAGE.x,
              RIGHT_STAGE.y,
              6,
              RIGHT_STAGE.x,
              RIGHT_STAGE.y,
              82,
            );
            rightGlow.addColorStop(
              0,
              anim.catStation === "right"
                ? "rgba(185, 135, 255, 0.55)"
                : "rgba(210, 180, 255, 0.25)",
            );
            rightGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
            ctx.fillStyle = rightGlow;
            ctx.beginPath();
            ctx.ellipse(RIGHT_STAGE.x, RIGHT_STAGE.y, 82, 34, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            const playRoll =
              anim.catStation === "right" && anim.catJumpProgress >= 1
                ? Math.sin(t * 8) * 10
                : Math.sin(t * 2.2) * 3;
            if (yarnImg && yarnImg.complete && yarnImg.naturalWidth > 0) {
              ctx.save();
              ctx.translate(RIGHT_STAGE.x - 36 + playRoll, RIGHT_STAGE.y - 6);
              ctx.rotate(playRoll * 0.08);
              ctx.drawImage(yarnImg, -26, -26, 52, 52);
              ctx.restore();
            }
            if (starToyImg && starToyImg.complete && starToyImg.naturalWidth > 0) {
              ctx.save();
              ctx.translate(
                RIGHT_STAGE.x + 38,
                RIGHT_STAGE.y - 10 - Math.abs(playRoll * 0.7),
              );
              ctx.rotate(-playRoll * 0.06);
              ctx.drawImage(starToyImg, -23, -23, 46, 46);
              ctx.restore();
            }

            // Pill Label under Right Toy Bed
            ctx.save();
            ctx.fillStyle =
              anim.catStation === "right"
                ? "rgba(156, 54, 181, 0.94)"
                : "rgba(255, 255, 255, 0.88)";
            ctx.strokeStyle = "#CC5DE8";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(RIGHT_STAGE.x - 68, RIGHT_STAGE.y + 34, 136, 24, 12);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = anim.catStation === "right" ? "#FFFFFF" : "#5F3DC4";
            ctx.font = "bold 11.5px 'Nunito', sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(
              anim.catStation === "right" ? "🧶 Đang Vờn Đồ Chơi ~" : "🧶 Góc Đồ Chơi",
              RIGHT_STAGE.x,
              RIGHT_STAGE.y + 46,
            );
            ctx.restore();
          }

          // 5. Draw Center Active Tree or 3-Station Jumping Cat!
          const centerBreedId = isTree
            ? curState.activeTreeBreed
            : curState.activeCatBreed;
          const centerEntity = isTree
            ? curState.trees[curState.activeTreeBreed]
            : curState.cats[curState.activeCatBreed];
          const centerStage = getStageFromExp(centerEntity.exp);
          const centerSpriteUrl = isTree
            ? `/assets/garden-cat/tree_${centerBreedId}_${centerStage}.webp`
            : `/assets/garden-cat/cat_${centerBreedId}_${centerStage}.webp`;
          const centerImg = imageCacheRef.current[centerSpriteUrl];
          const centerMeta = isTree
            ? TREE_BREEDS[curState.activeTreeBreed]
            : CAT_BREEDS[curState.activeCatBreed];

          const baseCenterSize = getEntityDisplaySize(
            isTree,
            centerEntity.exp,
          );
          const careSwellBoost =
            anim.activeToolTimer > 0
              ? 1 +
                Math.sin(
                  Math.min(1, (110 - anim.activeToolTimer) / 35) * Math.PI,
                ) *
                  0.075 +
                Math.sin(t * 9) * 0.015
              : 1;
          const entityPerspectiveScale = isTree ? 1 : anim.catScale;
          const centerSize =
            baseCenterSize * entityPerspectiveScale * careSwellBoost;
          const drawX = isTree
            ? PEDESTAL_CENTER.x
            : anim.catPosX + anim.catOffsetX;
          const drawY = isTree
            ? PEDESTAL_CENTER.y
            : anim.catPosY + anim.catJumpY;
          const shadowBaseY = isTree
            ? PEDESTAL_CENTER.y - 4
            : (anim.catStation === "left"
                ? LEFT_STAGE.y + 4
                : anim.catStation === "right"
                  ? RIGHT_STAGE.y + 4
                  : PEDESTAL_CENTER.y - 4);

          // Pedestal Magic Aura (`globalCompositeOperation = 'lighter'`)
          ctx.save();
          ctx.globalCompositeOperation = "lighter";
          const auraRadius = Math.max(62, centerSize * 0.44);
          const pulse = 1 + Math.sin(t * 1.6) * 0.08;
          const auraGrad = ctx.createRadialGradient(
            drawX,
            shadowBaseY - 4,
            8,
            drawX,
            shadowBaseY - 4,
            auraRadius * pulse,
          );
          auraGrad.addColorStop(0, centerMeta.glowColor);
          auraGrad.addColorStop(0.55, "rgba(255, 220, 130, 0.24)");
          auraGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.fillStyle = auraGrad;
          ctx.beginPath();
          ctx.ellipse(
            drawX,
            shadowBaseY - 4,
            auraRadius * pulse,
            auraRadius * 0.34 * pulse,
            0,
            0,
            Math.PI * 2,
          );
          ctx.fill();
          ctx.restore();

          // Contact Shadow on the center or side bed
          ctx.save();
          ctx.fillStyle = "rgba(65, 35, 60, 0.24)";
          ctx.beginPath();
          ctx.ellipse(
            drawX,
            shadowBaseY,
            centerSize * 0.31,
            centerSize * 0.08,
            0,
            0,
            Math.PI * 2,
          );
          ctx.fill();
          ctx.restore();

          // Active Character Sprite
          if (centerImg && centerImg.complete && centerImg.naturalWidth > 0) {
            ctx.save();
            ctx.translate(drawX, drawY);
            const breathScaleX =
              anim.scaleX * (1 + Math.sin(t * 1.4) * 0.022);
            const breathScaleY =
              anim.scaleY * (1 - Math.sin(t * 1.4) * 0.022);
            const swayAngle = isTree
              ? Math.sin(t * 1.1) * 0.025
              : Math.sin(t * 1.8) * 0.016;
            ctx.rotate(swayAngle);
            ctx.scale(breathScaleX, breathScaleY);
            ctx.drawImage(
              centerImg,
              -centerSize / 2,
              -centerSize,
              centerSize,
              centerSize,
            );
            ctx.restore();
          }

          // Crown Badge above Center Entity if graduated previously
          if (centerEntity.graduatedCount > 0) {
            ctx.save();
            const badgeY = drawY - centerSize - 16 + Math.sin(t * 2) * 3;
            ctx.fillStyle = "rgba(255, 248, 220, 0.94)";
            ctx.strokeStyle = "#F59F00";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(drawX - 78, badgeY - 14, 156, 28, 14);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = "#B45309";
            ctx.font = "bold 13.5px 'Nunito', sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(
              `👑 Đã Tốt Nghiệp ×${centerEntity.graduatedCount}`,
              drawX,
              badgeY,
            );
            ctx.restore();
          }

          // 6. Render Harvest Basket, Side Pedestal Specialty Drops & Hanging Fruits in Tree Mode
          if (isTree) {
            // Draw Left & Right Pedestal Gift Labels
            const leftHasDrop = anim.sideDrops.some(
              (d) => !d.collecting && d.side === "left",
            );
            const rightHasDrop = anim.sideDrops.some(
              (d) => !d.collecting && d.side === "right",
            );
            const drawSidePedestalTag = (
              stagePos: { x: number; y: number },
              hasDrop: boolean,
              title: string,
            ) => {
              ctx.save();
              ctx.fillStyle = hasDrop
                ? "rgba(255, 243, 191, 0.94)"
                : "rgba(255, 255, 255, 0.78)";
              ctx.strokeStyle = hasDrop ? "#F59F00" : "rgba(218, 119, 242, 0.6)";
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.roundRect(stagePos.x - 68, stagePos.y + 34, 136, 24, 12);
              ctx.fill();
              ctx.stroke();
              ctx.fillStyle = hasDrop ? "#B45309" : "#6741D9";
              ctx.font = "bold 11.5px 'Nunito', sans-serif";
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText(title, stagePos.x, stagePos.y + 46);
              ctx.restore();
            };

            drawSidePedestalTag(
              LEFT_STAGE,
              leftHasDrop,
              leftHasDrop ? "🎁 Bấm nhặt quà đổi Xu!" : "🌸 Bệ Quà Bên Trái",
            );
            drawSidePedestalTag(
              RIGHT_STAGE,
              rightHasDrop,
              rightHasDrop ? "🎁 Bấm nhặt quà đổi Xu!" : "🌸 Bệ Quà Bên Phải",
            );

            // Render Specialty Drops on Left & Right Pedestals (Fruits / Cupcakes / Star Crystals)
            for (let i = anim.sideDrops.length - 1; i >= 0; i--) {
              const d = anim.sideDrops[i];
              let dx = d.targetX;
              let dy = d.targetY;

              if (!d.collecting && d.dropProgress < 1) {
                d.dropProgress = Math.min(1, d.dropProgress + 0.032);
                const p = d.dropProgress;
                const ctrlX = (d.startX + d.targetX) * 0.5;
                const ctrlY = Math.min(d.startY, d.targetY) - 115;
                dx =
                  (1 - p) * (1 - p) * d.startX +
                  2 * (1 - p) * p * ctrlX +
                  p * p * d.targetX;
                dy =
                  (1 - p) * (1 - p) * d.startY +
                  2 * (1 - p) * p * ctrlY +
                  p * p * d.targetY;
              } else if (d.collecting) {
                d.collectProgress = Math.min(1, d.collectProgress + 0.05);
                const p = d.collectProgress;
                const ctrlX = (d.startX + BASKET_POS.x) * 0.5;
                const ctrlY = Math.min(d.startY, BASKET_POS.y) - 135;
                dx =
                  (1 - p) * (1 - p) * d.startX +
                  2 * (1 - p) * p * ctrlX +
                  p * p * BASKET_POS.x;
                dy =
                  (1 - p) * (1 - p) * d.startY +
                  2 * (1 - p) * p * ctrlY +
                  p * p * BASKET_POS.y;
                if (p >= 1) {
                  anim.sideDrops.splice(i, 1);
                  continue;
                }
              } else {
                dy = d.targetY + Math.sin(t * 2.5 + d.phase) * 4.5;
              }

              // Golden sparkle halo under the gift item
              ctx.save();
              ctx.globalCompositeOperation = "lighter";
              const dg = ctx.createRadialGradient(dx, dy - 14, 4, dx, dy - 14, 34);
              dg.addColorStop(0, "rgba(255, 224, 102, 0.85)");
              dg.addColorStop(1, "rgba(255, 255, 255, 0)");
              ctx.fillStyle = dg;
              ctx.beginPath();
              ctx.arc(dx, dy - 14, 34, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();

              const dropImg = imageCacheRef.current[d.iconUrl];
              if (dropImg && dropImg.complete && dropImg.naturalWidth > 0) {
                ctx.save();
                ctx.translate(dx, dy - 16);
                ctx.rotate(Math.sin(t * 2.2 + d.phase) * 0.08);
                ctx.drawImage(dropImg, -25, -25, 50, 50);
                ctx.restore();
              }

              // Coin reward mini-tag on resting drops
              if (!d.collecting && d.dropProgress >= 1) {
                ctx.save();
                ctx.fillStyle = "#FFF3BF";
                ctx.strokeStyle = "#F59F00";
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.roundRect(dx - 24, dy + 6, 48, 17, 8);
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = "#B45309";
                ctx.font = "bold 10px 'Nunito', sans-serif";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(`+${d.coinValue} Xu`, dx, dy + 14.5);
                ctx.restore();
              }
            }

            const basketImg =
              imageCacheRef.current["/assets/garden-cat/icon_basket.webp"];
            if (basketImg && basketImg.complete && basketImg.naturalWidth > 0) {
              ctx.save();
              ctx.drawImage(
                basketImg,
                BASKET_POS.x - 46,
                BASKET_POS.y - 46,
                92,
                92,
              );
              ctx.fillStyle = "rgba(255,255,255,0.92)";
              ctx.strokeStyle = "#F59F00";
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.roundRect(BASKET_POS.x - 52, BASKET_POS.y + 34, 104, 24, 12);
              ctx.fill();
              ctx.stroke();
              ctx.fillStyle = "#B45309";
              ctx.font = "bold 12px 'Nunito', sans-serif";
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText(
                `🧺 Giỏ: ${curState.harvestedFruitTotal} món`,
                BASKET_POS.x,
                BASKET_POS.y + 46,
              );
              ctx.restore();
            }

            const treeMeta = TREE_BREEDS[curState.activeTreeBreed];
            for (let i = anim.fruits.length - 1; i >= 0; i--) {
              const f = anim.fruits[i];
              let fx = PEDESTAL_CENTER.x + f.relX;
              let fy =
                PEDESTAL_CENTER.y + f.relY + Math.sin(t * 2 + f.phase) * 4;

              if (f.flying) {
                f.flyProgress += 0.045;
                const p = Math.min(1, f.flyProgress);
                const ctrlX = (f.startX + BASKET_POS.x) * 0.5;
                const ctrlY = Math.min(f.startY, BASKET_POS.y) - 140;
                fx =
                  (1 - p) * (1 - p) * f.startX +
                  2 * (1 - p) * p * ctrlX +
                  p * p * BASKET_POS.x;
                fy =
                  (1 - p) * (1 - p) * f.startY +
                  2 * (1 - p) * p * ctrlY +
                  p * p * BASKET_POS.y;
                if (p >= 1) {
                  anim.fruits.splice(i, 1);
                  continue;
                }
              }

              ctx.save();
              ctx.globalCompositeOperation = "lighter";
              const fg = ctx.createRadialGradient(fx, fy, 3, fx, fy, 26);
              fg.addColorStop(0, treeMeta.fruitColor);
              fg.addColorStop(1, "rgba(255,255,255,0)");
              ctx.fillStyle = fg;
              ctx.beginPath();
              ctx.arc(fx, fy, 26, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();

              ctx.save();
              ctx.fillStyle = treeMeta.fruitColor;
              ctx.strokeStyle = "#FFFFFF";
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.arc(fx, fy, 12.5, 0, Math.PI * 2);
              ctx.fill();
              ctx.stroke();

              ctx.fillStyle = treeMeta.fruitSecondary;
              ctx.beginPath();
              ctx.arc(fx - 4, fy - 4, 3.5, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            }
          }

          // 7. Render Tossed Cat Toy/Treat on the Rug
          if (!isTree && anim.tossedToy.active) {
            const toy = anim.tossedToy;
            toy.timer--;
            if (toy.y < toy.groundY) {
              toy.vy += 0.55;
              toy.y = Math.min(toy.groundY, toy.y + toy.vy);
            }
            const toyImg = imageCacheRef.current[toy.iconKey];
            if (toyImg && toyImg.complete && toyImg.naturalWidth > 0) {
              ctx.save();
              ctx.translate(toy.x, toy.y);
              ctx.rotate(Math.sin(t * 4) * 0.2);
              ctx.drawImage(toyImg, -32, -32, 64, 64);
              ctx.restore();
            }
            if (toy.timer <= 0) {
              toy.active = false;
            }
          }

          // 8. Render Large Active Care Tool Icon (152x152px) on Top-Left + Right-Facing Spout Pouring Stream
          if (anim.activeToolTimer > 0 && anim.activeToolIcon) {
            anim.activeToolTimer--;
            const toolImg = imageCacheRef.current[anim.activeToolIcon];
            if (toolImg && toolImg.complete && toolImg.naturalWidth > 0) {
              const totalFrames = 110;
              const elapsed = totalFrames - anim.activeToolTimer;
              const enterProgress = Math.min(1, elapsed / 14);
              const exitProgress = Math.min(1, anim.activeToolTimer / 16);
              const pourFactor = Math.min(enterProgress, exitProgress);

              // Position on the TOP-LEFT of the tree/cat so the right-facing spout of icon_water.png pours directly into the canopy!
              const tx =
                PEDESTAL_CENTER.x -
                108 -
                (1 - enterProgress) * 60 +
                Math.sin(elapsed * 0.22) * 5;
              const ty =
                PEDESTAL_CENTER.y -
                baseCenterSize -
                44 -
                (1 - enterProgress) * 35 +
                Math.cos(elapsed * 0.22) * 4;

              const isPouringTool =
                anim.activeToolActionId === "tree_water" ||
                anim.activeToolActionId === "tree_fertilizer" ||
                anim.activeToolActionId === "cat_milk" ||
                !anim.activeToolActionId;

              // Tilt CLOCKWISE (+angle) so the right-side spout tilts down toward the tree center!
              const tiltAngle = isPouringTool
                ? 0.06 +
                  pourFactor * 0.38 +
                  Math.sin(elapsed * 0.35) * 0.045
                : 0.12 + Math.sin(elapsed * 0.28) * 0.14;

              // Exact right-facing spout tip position when tilted clockwise
              const spoutX = tx + 54;
              const spoutY = ty + 18;
              const targetCanopyX = PEDESTAL_CENTER.x + 2;
              const targetCanopyY = PEDESTAL_CENTER.y - baseCenterSize * 0.58;

              // Draw Continuous Pouring Streams & Falling Droplets while tilted
              if (
                pourFactor > 0.25 &&
                (anim.activeToolActionId === "tree_water" ||
                  !anim.activeToolActionId)
              ) {
                ctx.save();
                ctx.globalAlpha = pourFactor * 0.92;
                const streamOffsets = [-15, -5, 5, 15];
                streamOffsets.forEach((offset, sIdx) => {
                  const endX =
                    targetCanopyX +
                    offset * 1.45 +
                    Math.sin(t * 7 + sIdx) * 5;
                  const endY = targetCanopyY + (sIdx % 2) * 16;
                  const ctrlX = (spoutX + endX) * 0.5 + 14;
                  const ctrlY = spoutY + (endY - spoutY) * 0.32;

                  // Soft cyan outer water ribbon
                  ctx.strokeStyle = "rgba(77, 171, 247, 0.55)";
                  ctx.lineWidth = 5.2 - sIdx * 0.45;
                  ctx.lineCap = "round";
                  ctx.beginPath();
                  ctx.moveTo(spoutX, spoutY + sIdx * 2);
                  ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY);
                  ctx.stroke();

                  // Animated white-aqua sparkling water flow dashes
                  ctx.strokeStyle = "rgba(225, 248, 255, 0.95)";
                  ctx.lineWidth = 2.5;
                  ctx.setLineDash([12, 10]);
                  ctx.lineDashOffset = -(elapsed * 5.5 + sIdx * 7);
                  ctx.beginPath();
                  ctx.moveTo(spoutX, spoutY + sIdx * 2);
                  ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY);
                  ctx.stroke();
                });
                ctx.setLineDash([]);
                ctx.restore();

                // Emit continuous falling water droplets from the right-facing spout tip toward the tree
                if (anim.activeToolTimer % 2 === 0) {
                  for (let d = 0; d < 2; d++) {
                    anim.particles.push({
                      x: spoutX + (Math.random() - 0.5) * 10,
                      y: spoutY + (Math.random() - 0.5) * 10,
                      vx: 1.7 + Math.random() * 1.5,
                      vy: 2.5 + Math.random() * 2.3,
                      radius: 4.2 + Math.random() * 2.8,
                      color: d % 2 === 0 ? "#4DABF7" : "#A5D8FF",
                      alpha: 1,
                      life: 0,
                      maxLife: 26 + Math.random() * 10,
                      kind: "droplet",
                    });
                  }
                  // Splash sparkles on the tree canopy leaves
                  anim.particles.push({
                    x:
                      targetCanopyX +
                      (Math.random() - 0.5) * (baseCenterSize * 0.36),
                    y:
                      targetCanopyY +
                      (Math.random() - 0.5) * (baseCenterSize * 0.22),
                    vx: (Math.random() - 0.5) * 3.0,
                    vy: -1.4 - Math.random() * 2.0,
                    radius: 3.0 + Math.random() * 2.4,
                    color: "#E7F5FF",
                    alpha: 1,
                    life: 0,
                    maxLife: 22,
                    kind: "sparkle",
                  });
                }
              } else if (
                pourFactor > 0.25 &&
                anim.activeToolActionId === "tree_fertilizer" &&
                anim.activeToolTimer % 2 === 0
              ) {
                anim.particles.push({
                  x: spoutX + (Math.random() - 0.5) * 14,
                  y: spoutY + (Math.random() - 0.5) * 10,
                  vx: 1.5 + Math.random() * 1.4,
                  vy: 2.2 + Math.random() * 2.2,
                  radius: 4.2 + Math.random() * 2.5,
                  color:
                    anim.activeToolTimer % 4 === 0 ? "#FFD43B" : "#69DB7C",
                  alpha: 1,
                  life: 0,
                  maxLife: 28,
                  kind: "sparkle",
                });
              } else if (
                pourFactor > 0.25 &&
                anim.activeToolActionId === "tree_sun"
              ) {
                ctx.save();
                ctx.globalCompositeOperation = "lighter";
                const rayGrad = ctx.createLinearGradient(
                  tx,
                  ty,
                  PEDESTAL_CENTER.x,
                  PEDESTAL_CENTER.y - 40,
                );
                rayGrad.addColorStop(
                  0,
                  `rgba(255, 224, 102, ${0.48 * pourFactor})`,
                );
                rayGrad.addColorStop(1, "rgba(255, 224, 102, 0)");
                ctx.fillStyle = rayGrad;
                ctx.beginPath();
                ctx.moveTo(tx - 20, ty + 10);
                ctx.lineTo(tx + 25, ty + 25);
                ctx.lineTo(PEDESTAL_CENTER.x + 88, PEDESTAL_CENTER.y - 16);
                ctx.lineTo(PEDESTAL_CENTER.x - 88, PEDESTAL_CENTER.y - 16);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
              }

              // Draw the 152x152 Care Tool Icon with soft golden-aqua halo
              const toolSize = 152;
              ctx.save();
              ctx.globalAlpha = Math.min(1, exitProgress * 1.4);
              ctx.translate(tx, ty);
              ctx.rotate(tiltAngle);

              ctx.shadowColor = "rgba(77, 171, 247, 0.45)";
              ctx.shadowBlur = 18;
              ctx.drawImage(
                toolImg,
                -toolSize / 2,
                -toolSize / 2,
                toolSize,
                toolSize,
              );
              ctx.restore();
            }
          }

          // 9. Render Level-Up Light Pillar (`globalCompositeOperation = 'lighter'`)
          if (anim.levelUpFlashTimer > 0) {
            anim.levelUpFlashTimer--;
            const alpha = Math.min(1, anim.levelUpFlashTimer / 45) * 0.65;
            ctx.save();
            ctx.globalCompositeOperation = "lighter";
            const pillarGrad = ctx.createLinearGradient(
              PEDESTAL_CENTER.x - 105,
              0,
              PEDESTAL_CENTER.x + 105,
              0,
            );
            pillarGrad.addColorStop(0, "rgba(255, 220, 100, 0)");
            pillarGrad.addColorStop(0.5, `rgba(255, 240, 150, ${alpha})`);
            pillarGrad.addColorStop(1, "rgba(255, 220, 100, 0)");
            ctx.fillStyle = pillarGrad;
            ctx.fillRect(PEDESTAL_CENTER.x - 105, 0, 210, LOGICAL_H);
            ctx.restore();
          }

          // 10. Render Ambient Fireflies (`globalCompositeOperation = 'lighter'`)
          ctx.save();
          ctx.globalCompositeOperation = "lighter";
          const fireflyCount = curState.nightMode ? anim.fireflies.length : 14;
          for (let i = 0; i < fireflyCount; i++) {
            const ff = anim.fireflies[i];
            ff.x += ff.vx;
            ff.y += ff.vy;
            if (ff.x < 0) ff.x = LOGICAL_W;
            if (ff.x > LOGICAL_W) ff.x = 0;
            if (ff.y < 20) ff.y = LOGICAL_H * 0.85;
            if (ff.y > LOGICAL_H * 0.85) ff.y = 20;

            const glowR =
              ff.size *
              (curState.nightMode ? 2.5 : 1.5) *
              (0.75 + 0.35 * Math.sin(t * 2 + ff.phase));
            const fg = ctx.createRadialGradient(
              ff.x,
              ff.y,
              1,
              ff.x,
              ff.y,
              glowR,
            );
            fg.addColorStop(0, ff.color);
            fg.addColorStop(1, "rgba(255, 255, 255, 0)");
            ctx.fillStyle = fg;
            ctx.beginPath();
            ctx.arc(ff.x, ff.y, glowR, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();

          // 11. Render Care & Evolution Particles (`globalCompositeOperation = 'lighter'`)
          ctx.save();
          ctx.globalCompositeOperation = "lighter";
          for (let i = anim.particles.length - 1; i >= 0; i--) {
            const p = anim.particles[i];
            p.life++;
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.kind === "droplet" ? 0.18 : 0.08;
            const ratio = 1 - p.life / p.maxLife;
            if (ratio <= 0) {
              anim.particles.splice(i, 1);
              continue;
            }
            const r = p.radius * (0.6 + ratio * 1.15);
            if (p.kind === "droplet") {
              ctx.save();
              ctx.globalCompositeOperation = "source-over";
              ctx.globalAlpha = Math.min(1, ratio * 1.25);
              const angle = Math.atan2(p.vy, p.vx) - Math.PI / 2;
              ctx.translate(p.x, p.y);
              ctx.rotate(angle);
              ctx.fillStyle = p.color;
              ctx.beginPath();
              ctx.moveTo(0, -r * 1.6);
              ctx.quadraticCurveTo(r * 1.1, 0, 0, r * 1.1);
              ctx.quadraticCurveTo(-r * 1.1, 0, 0, -r * 1.6);
              ctx.fill();

              // Crisp white specular highlight on each water droplet
              ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
              ctx.beginPath();
              ctx.arc(-r * 0.25, -r * 0.15, r * 0.28, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            } else {
              const pg = ctx.createRadialGradient(p.x, p.y, 1, p.x, p.y, r * 2);
              pg.addColorStop(0, p.color);
              pg.addColorStop(1, "rgba(255, 255, 255, 0)");
              ctx.fillStyle = pg;
              ctx.globalAlpha = ratio;
              ctx.beginPath();
              ctx.arc(p.x, p.y, r * 2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          ctx.restore();

          // 12. Render Floating EXP Popups
          for (let i = anim.popups.length - 1; i >= 0; i--) {
            const pop = anim.popups[i];
            pop.life++;
            pop.y += pop.vy;
            const alpha = Math.max(0, 1 - pop.life / pop.maxLife);
            if (alpha <= 0) {
              anim.popups.splice(i, 1);
              continue;
            }
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.font = "bold 20px 'Nunito', 'Quicksand', sans-serif";
            ctx.textAlign = "center";
            ctx.lineWidth = 4.5;
            ctx.strokeStyle = "rgba(75, 25, 65, 0.85)";
            ctx.strokeText(pop.text, pop.x, pop.y);
            ctx.fillStyle = pop.color;
            ctx.fillText(pop.text, pop.x, pop.y);
            ctx.restore();
          }

          ctx.restore();
        }
      }
      rafId = window.requestAnimationFrame(renderLoop);
    };

    rafId = window.requestAnimationFrame(renderLoop);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  const currentCareActions = useMemo(
    () => CARE_ACTIONS.filter((a) => a.mode === state.activeTab),
    [state.activeTab],
  );

  const activeMeta =
    state.activeTab === "tree"
      ? TREE_BREEDS[state.activeTreeBreed]
      : CAT_BREEDS[state.activeCatBreed];

  const currentQuestion = MINI_QUIZ_BANK[quizIdx % MINI_QUIZ_BANK.length];
  const dailyCareRemaining = Math.max(
    0,
    MAX_DAILY_COIN_CARES - activeEntityState.dailyCareUsed,
  );
  const dailyQuizRemaining = Math.max(
    0,
    MAX_DAILY_QUIZZES - state.dailyQuizUsed,
  );

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(135deg, #FFF0F6 0%, #F3D9FA 50%, #E7F5FF 100%)",
        userSelect: "none",
        fontFamily: "'Nunito', 'Quicksand', sans-serif",
        padding: "10px 14px",
        gap: "8px",
        boxSizing: "border-box",
      }}
    >
      {/* =====================================================================
          1. COMPACT TOP BAR
         ===================================================================== */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            type="button"
            className="hud-pill hud-pink"
            onClick={onGoHome}
          >
            <Home size={16} /> Về Sảnh
          </button>

          <button
            type="button"
            onClick={() => {
              if (soundEnabled) playCharacterTapSound();
              setState((prev) => {
                const next: GardenCatSaveState = { ...prev, activeTab: "tree" };
                saveGardenCatState(next);
                return next;
              });
            }}
            style={{
              padding: "6px 14px",
              borderRadius: "999px",
              border:
                state.activeTab === "tree"
                  ? "2.5px solid #0CA678"
                  : "2px solid #FFF",
              background:
                state.activeTab === "tree"
                  ? "linear-gradient(135deg, #20C997, #0CA678)"
                  : "rgba(255,255,255,0.88)",
              color: state.activeTab === "tree" ? "#FFFFFF" : "#3B2045",
              fontWeight: 900,
              fontSize: "13.5px",
              cursor: "pointer",
            }}
          >
            🌱 Vườn Cây Thần Kỳ
          </button>

          <button
            type="button"
            onClick={() => {
              if (soundEnabled) playCharacterTapSound();
              setState((prev) => {
                const next: GardenCatSaveState = { ...prev, activeTab: "cat" };
                saveGardenCatState(next);
                return next;
              });
            }}
            style={{
              padding: "6px 14px",
              borderRadius: "999px",
              border:
                state.activeTab === "cat"
                  ? "2.5px solid #D6336C"
                  : "2px solid #FFF",
              background:
                state.activeTab === "cat"
                  ? "linear-gradient(135deg, #FF6B9D, #F06595)"
                  : "rgba(255,255,255,0.88)",
              color: state.activeTab === "cat" ? "#FFFFFF" : "#3B2045",
              fontWeight: 900,
              fontSize: "13.5px",
              cursor: "pointer",
            }}
          >
            🐱 Phòng Nuôi Mèo Kawaii
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            type="button"
            onClick={() => setVaultModalOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 13px",
              borderRadius: "999px",
              border: "2px solid #F59F00",
              background: "linear-gradient(135deg, #FFF9DB, #FFE066)",
              color: "#8A4B00",
              fontWeight: 900,
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            <Archive size={15} />
            <span>🏛️ Kho Cây & Mèo Lớn ({unlockedVaultCount}/6)</span>
          </button>

          <div className="hud-pill hud-gold" style={{ cursor: "default" }}>
            <img
              src="/assets/math/items/gold-coin.webp"
              alt=""
              className="inline-coin-3d-icon"
            />
            <span>{goldCoins} Xu</span>
          </div>

          <button
            type="button"
            className="hud-pill hud-pink"
            onClick={() => onOpenStickerBook("garden-cat-special")}
            title="Mở trang Vườn Cây & Mèo trong Vở Dán Sticker"
          >
            <BookOpen size={15} /> Vở Sticker ({unlockedVaultCount}/6)
          </button>
        </div>
      </header>

      {/* =====================================================================
          2. MAIN SPLIT STUDIO: 2/3 LEFT <canvas> FRAME + 1/3 RIGHT CONTROL PANEL
         ===================================================================== */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.85fr) minmax(300px, 1fr)",
          gap: "12px",
        }}
      >
        {/* LEFT 2/3: FRAMED 2D RETINA CANVAS WINDOW (UNOBSTRUCTED!) */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: "24px",
            overflow: "hidden",
            border: "4px solid #FFFFFF",
            boxShadow: "0 10px 28px rgba(75, 30, 90, 0.18)",
            background: "#1A1128",
          }}
        >
          <canvas
            ref={canvasRef}
            onPointerDown={handleCanvasPointerDown}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              cursor: "pointer",
            }}
          />

          {/* Small unobtrusive atmosphere buttons at top-right of canvas frame */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              display: "flex",
              gap: "6px",
              zIndex: 5,
            }}
          >
            {state.activeTab === "tree" && (
              <button
                type="button"
                onClick={() => {
                  if (soundEnabled) playCharacterTapSound();
                  setState((prev) => {
                    const next: GardenCatSaveState = {
                      ...prev,
                      treeBgTheme:
                        prev.treeBgTheme === "greenhouse"
                          ? "palace"
                          : "greenhouse",
                    };
                    saveGardenCatState(next);
                    return next;
                  });
                }}
                style={{
                  padding: "5px 10px",
                  borderRadius: "99px",
                  border: "2px solid #FFF",
                  background: "rgba(255,255,255,0.88)",
                  color: "#5F3DC4",
                  fontWeight: 800,
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                {state.treeBgTheme === "greenhouse"
                  ? "🏰 Cung Điện Mây"
                  : "🏡 Nhà Kính Hoa"}
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                if (soundEnabled) playCharacterTapSound();
                setState((prev) => {
                  const next: GardenCatSaveState = {
                    ...prev,
                    nightMode: !prev.nightMode,
                  };
                  saveGardenCatState(next);
                  return next;
                });
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "5px 10px",
                borderRadius: "99px",
                border: "2px solid #FFE066",
                background: state.nightMode
                  ? "linear-gradient(135deg, #3B28CC, #6741D9)"
                  : "linear-gradient(135deg, #FCC419, #F59F00)",
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              {state.nightMode ? <Moon size={13} /> : <Sun size={13} />}
              <span>{state.nightMode ? "Đêm Đom Đóm" : "Nắng Sớm"}</span>
            </button>
          </div>

          {/* Bottom floating speech pill inside canvas frame */}
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(255, 255, 255, 0.92)",
              border: `2px solid ${activeMeta.accent}`,
              borderRadius: "999px",
              padding: "5px 14px",
              fontSize: "12.5px",
              fontWeight: 800,
              color: "#3B2045",
              maxWidth: "88%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              pointerEvents: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            }}
          >
            💬 {speechBubble}
          </div>
        </div>

        {/* RIGHT 1/3: DEDICATED SIDEBAR CONTROL MODULE */}
        <aside
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            background: "rgba(255, 255, 255, 0.92)",
            borderRadius: "24px",
            border: "3px solid #FFFFFF",
            padding: "12px",
            boxShadow: "0 10px 28px rgba(75, 30, 90, 0.14)",
            overflowY: "auto",
          }}
        >
          {/* MODULE 1: 3 BREED SELECTOR TABS */}
          <div>
            <div
              style={{
                fontSize: "12px",
                fontWeight: 900,
                color: "#7048E8",
                marginBottom: "5px",
                textTransform: "uppercase",
              }}
            >
              1. Chọn Giống {state.activeTab === "tree" ? "Cây" : "Mèo"} Đang Chăm
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "6px",
              }}
            >
              {state.activeTab === "tree"
                ? (["rainbow", "dessert", "crystal"] as TreeBreedId[]).map(
                    (tid) => {
                      const m = TREE_BREEDS[tid];
                      const st = state.trees[tid];
                      const isSel = state.activeTreeBreed === tid;
                      return (
                        <button
                          key={tid}
                          type="button"
                          onClick={() => {
                            if (soundEnabled) playCharacterTapSound();
                            triggerSquashStretch(1.16, 0.86);
                            setState((prev) => {
                              const next = { ...prev, activeTreeBreed: tid };
                              saveGardenCatState(next);
                              return next;
                            });
                          }}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "6px 4px",
                            borderRadius: "14px",
                            border: isSel
                              ? `2.5px solid ${m.accent}`
                              : "1.5px solid #E9ECEF",
                            background: isSel ? "#FFF0F6" : "#F8F9FA",
                            cursor: "pointer",
                          }}
                        >
                          <span style={{ fontSize: "16px" }}>{m.badge}</span>
                          <span
                            style={{
                              fontSize: "11.5px",
                              fontWeight: 900,
                              color: "#3B2045",
                              textAlign: "center",
                              lineHeight: 1.15,
                            }}
                          >
                            {m.shortName}
                          </span>
                          <span
                            style={{
                              fontSize: "10.5px",
                              fontWeight: 800,
                              color: m.accent,
                            }}
                          >
                            Cấp {getStageFromExp(st.exp)}
                            {st.graduatedCount > 0
                              ? ` · 👑×${st.graduatedCount}`
                              : ""}
                          </span>
                        </button>
                      );
                    },
                  )
                : (["white", "ginger", "fairy"] as CatBreedId[]).map((cid) => {
                    const m = CAT_BREEDS[cid];
                    const st = state.cats[cid];
                    const isSel = state.activeCatBreed === cid;
                    return (
                      <button
                        key={cid}
                        type="button"
                        onClick={() => {
                          if (soundEnabled) playCharacterTapSound();
                          triggerSquashStretch(1.16, 0.86);
                          setState((prev) => {
                            const next = { ...prev, activeCatBreed: cid };
                            saveGardenCatState(next);
                            return next;
                          });
                        }}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          padding: "6px 4px",
                          borderRadius: "14px",
                          border: isSel
                            ? `2.5px solid ${m.accent}`
                            : "1.5px solid #E9ECEF",
                          background: isSel ? "#FFF0F6" : "#F8F9FA",
                          cursor: "pointer",
                        }}
                      >
                        <span style={{ fontSize: "16px" }}>{m.badge}</span>
                        <span
                          style={{
                            fontSize: "11.5px",
                            fontWeight: 900,
                            color: "#3B2045",
                            textAlign: "center",
                            lineHeight: 1.15,
                          }}
                        >
                          {m.shortName}
                        </span>
                        <span
                          style={{
                            fontSize: "10.5px",
                            fontWeight: 800,
                            color: m.accent,
                          }}
                        >
                          Cấp {getStageFromExp(st.exp)}
                          {st.graduatedCount > 0
                            ? ` · 👑×${st.graduatedCount}`
                            : ""}
                        </span>
                      </button>
                    );
                  })}
            </div>
          </div>

          {/* MODULE 2: STAGE PROGRESS BAR & STAGE 6 GRADUATION / HARVEST */}
          <div
            style={{
              background: "#FDF8FF",
              borderRadius: "16px",
              padding: "10px 12px",
              border: `2px solid ${activeMeta.accent}`,
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "13px",
                fontWeight: 900,
                color: "#3B2045",
              }}
            >
              <span>
                {activeMeta.badge}{" "}
                {activeMeta.stageNames[progressInfo.stage - 1]}
              </span>
              <span style={{ color: activeMeta.accent }}>
                {progressInfo.isMax
                  ? "🌟 ĐẠT CẤP 6!"
                  : `${progressInfo.currentInStage}/${progressInfo.neededForNext} EXP`}
              </span>
            </div>

            <div
              style={{
                width: "100%",
                height: "12px",
                background: "#E9D8FD",
                borderRadius: "99px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progressInfo.percent}%`,
                  height: "100%",
                  background: `linear-gradient(90deg, ${activeMeta.accent}, #FCC419)`,
                  borderRadius: "99px",
                  transition: "width 0.35s ease",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "11.5px",
                fontWeight: 800,
                color: "#6C4A75",
              }}
            >
              <span>
                Tổng tiến độ: {activeEntityState.exp} / {STAGE_THRESHOLDS[5]} EXP
              </span>
              {activeEntityState.exp > 0 && (
                <button
                  type="button"
                  onClick={() => setConfirmResetOpen(true)}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#7950F2",
                    fontWeight: 800,
                    fontSize: "11.5px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                  }}
                >
                  <RotateCcw size={12} /> Ươm lại Cấp 1
                </button>
              )}
            </div>

            {state.activeTab === "tree" && progressInfo.stage >= 4 && (
              <button
                type="button"
                onClick={handleHarvestAllFruits}
                style={{
                  padding: "7px 10px",
                  borderRadius: "12px",
                  border: "2px solid #F59F00",
                  background: "linear-gradient(135deg, #FFD43B, #FAB005)",
                  color: "#4A2545",
                  fontWeight: 900,
                  fontSize: "12.5px",
                  cursor: "pointer",
                }}
              >
                🧺 Hái Quả Chín Trên Cây (+2 Xu/quả)
              </button>
            )}

            {progressInfo.isMax && (
              <button
                type="button"
                onClick={handleGraduateStage6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "9px 12px",
                  borderRadius: "14px",
                  border: "2px solid #FFF",
                  background: "linear-gradient(135deg, #F59F00, #E8590C)",
                  color: "#FFFFFF",
                  fontWeight: 900,
                  fontSize: "13px",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(245, 159, 0, 0.45)",
                }}
              >
                <Trophy size={16} />
                <span>Cất Vào Kho & Đổi Thành Sticker Cấp 6!</span>
              </button>
            )}
          </div>

          {/* MODULE 3: LESSON ACCUMULATION & DAILY PACING */}
          <div
            style={{
              background: "#FFF9DB",
              borderRadius: "16px",
              padding: "9px 11px",
              border: "2px solid #FCC419",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "12px",
                fontWeight: 900,
                color: "#8A4B00",
              }}
            >
              <span>📚 Năng Lượng Học Tập Hàng Ngày</span>
              <span>Đã học: {completedLessonsCount} bài</span>
            </div>

            <div style={{ display: "flex", gap: "6px" }}>
              <button
                type="button"
                onClick={handleUseLessonDewCharge}
                style={{
                  flex: 1.2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                  padding: "8px 8px",
                  borderRadius: "12px",
                  border: "none",
                  background:
                    state.lessonDewCharges > 0
                      ? "linear-gradient(135deg, #F59F00, #FD7E14)"
                      : "linear-gradient(135deg, #868E96, #495057)",
                  color: "#FFFFFF",
                  fontWeight: 900,
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                <Sparkles size={14} />
                <span>
                  Sương Bài Học ({state.lessonDewCharges}) · +25 EXP
                </span>
              </button>

              <button
                type="button"
                disabled={dailyQuizRemaining <= 0}
                onClick={() => {
                  setQuizFeedback(null);
                  setQuizModalOpen(true);
                }}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                  padding: "8px 8px",
                  borderRadius: "12px",
                  border: "2px solid #7950F2",
                  background: dailyQuizRemaining > 0 ? "#F3F0FF" : "#E9ECEF",
                  color: dailyQuizRemaining > 0 ? "#5F3DC4" : "#868E96",
                  fontWeight: 900,
                  fontSize: "12px",
                  cursor: dailyQuizRemaining > 0 ? "pointer" : "not-allowed",
                }}
              >
                <GraduationCap size={14} />
                <span>Đố Vui ({dailyQuizRemaining}/2)</span>
              </button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "11px",
                fontWeight: 800,
                color: "#5C3C00",
              }}
            >
              <span>
                Mỗi bài học mới tặng <strong>+1 Sương (+25 EXP)</strong>
              </span>
              <button
                type="button"
                onClick={() => onStartLesson("math")}
                style={{
                  padding: "2px 8px",
                  borderRadius: "99px",
                  border: "none",
                  background: "#7950F2",
                  color: "#FFF",
                  fontWeight: 800,
                  fontSize: "11px",
                  cursor: "pointer",
                }}
              >
                🚀 Đi Học Bài Mới
              </button>
            </div>
          </div>

          {/* MODULE 4: 2x2 CARE TOOLS GRID (WITH DAILY 3/3 LIMIT) */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "12px",
                fontWeight: 900,
                color: "#3B2045",
                marginBottom: "5px",
              }}
            >
              <span>2. Dụng Cụ Chăm Sóc Hàng Ngày</span>
              <span
                style={{
                  color: dailyCareRemaining > 0 ? "#0CA678" : "#E03131",
                  background: dailyCareRemaining > 0 ? "#E6FCF5" : "#FFE3E3",
                  padding: "1px 8px",
                  borderRadius: "99px",
                }}
              >
                Hôm nay còn: {dailyCareRemaining}/{MAX_DAILY_COIN_CARES} lượt
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "7px",
                flex: 1,
              }}
            >
              {currentCareActions.map((act) => {
                const isFreeNow =
                  Boolean(act.canUseFreeCooldown) && freeCareCooldown === 0;
                const canStickerTrade =
                  Boolean(act.canUseStickerTrade) &&
                  tradableObjectStickers.length > 0;
                const isDailyFull = dailyCareRemaining <= 0;

                return (
                  <div
                    key={act.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      background: "#FFFFFF",
                      borderRadius: "15px",
                      padding: "7px 8px",
                      border: `2px solid ${act.particleColor}`,
                      opacity: isDailyFull ? 0.65 : 1,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <img
                        src={act.iconSrc}
                        alt={act.title}
                        style={{
                          width: "36px",
                          height: "36px",
                          objectFit: "contain",
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontWeight: 900,
                            fontSize: "12.5px",
                            color: "#3B2045",
                            lineHeight: 1.15,
                          }}
                        >
                          {act.title}
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: 800,
                            color: "#0CA678",
                          }}
                        >
                          +{act.expGain} EXP
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "4px",
                        marginTop: "5px",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => handleUseCareAction(act)}
                        style={{
                          flex: 1,
                          padding: "5px 6px",
                          borderRadius: "9px",
                          border: "none",
                          background: isDailyFull
                            ? "#ADB5BD"
                            : isFreeNow
                              ? "linear-gradient(135deg, #20C997, #0CA678)"
                              : "linear-gradient(135deg, #FF6B9D, #F06595)",
                          color: "#FFFFFF",
                          fontWeight: 900,
                          fontSize: "11.5px",
                          cursor: isDailyFull ? "not-allowed" : "pointer",
                        }}
                      >
                        {isDailyFull
                          ? "Đã no hôm nay"
                          : isFreeNow
                            ? "🎁 Miễn Phí"
                            : act.canUseFreeCooldown && freeCareCooldown > 0
                              ? `${act.coinCost} Xu (${freeCareCooldown}s)`
                              : `🪙 ${act.coinCost} Xu`}
                      </button>

                      {canStickerTrade && !isDailyFull && (
                        <button
                          type="button"
                          onClick={() => setStickerTradeModalAction(act)}
                          style={{
                            padding: "5px 6px",
                            borderRadius: "9px",
                            border: "1.5px solid #9C36B5",
                            background: "#F3D9FA",
                            color: "#862E9C",
                            fontWeight: 900,
                            fontSize: "10.5px",
                            cursor: "pointer",
                          }}
                          title="Đổi 1 Sticker Đồ Vật dư"
                        >
                          🎟️ Đổi
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </div>

      {/* =====================================================================
          3. MODAL: TROPHY VAULT ("🏛️ KHO CÂY & MÈO ĐÃ LỚN + BỘ 6 STICKER GIẢI TRÍ")
         ===================================================================== */}
      {vaultModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 65,
            background: "rgba(25, 10, 40, 0.72)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <div
            style={{
              background: "linear-gradient(180deg, #FFF9DB 0%, #FFFFFF 100%)",
              border: "4px solid #F59F00",
              borderRadius: "28px",
              padding: "20px 22px",
              maxWidth: "680px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              boxShadow: "0 20px 55px rgba(0,0,0,0.4)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: "20px", color: "#B45309" }}>
                  🏛️ Kho Cây & Mèo Đã Lớn (Bộ 3 Sticker Khu Giải Trí:{" "}
                  {unlockedVaultCount}/6)
                </h3>
                <p
                  style={{
                    margin: "2px 0 0",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#5C3C00",
                  }}
                >
                  Mỗi khi nuôi 1 Cây hoặc Mèo đạt <strong>Cấp 6</strong>, bé sẽ
                  mở khóa <strong>Sticker Cấp 6</strong> tương ứng để mang sang{" "}
                  <strong>Vở Sticker</strong> và <strong>Phòng Cúp</strong>!
                </p>
              </div>
              <button
                type="button"
                onClick={() => setVaultModalOpen(false)}
                style={{
                  border: "none",
                  background: "#FFE3E3",
                  color: "#C92A2A",
                  fontWeight: 900,
                  borderRadius: "99px",
                  padding: "6px 14px",
                  cursor: "pointer",
                }}
              >
                Đóng ✕
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px",
              }}
            >
              {STORYBOOK_GARDEN_CAT_SET_3.map((stk) => {
                const count = gardenCatStickerInv[stk.id] || 0;
                const unlocked = count > 0;
                return (
                  <div
                    key={stk.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "5px",
                      padding: "12px 10px",
                      borderRadius: "18px",
                      border: unlocked
                        ? "2.5px solid #FCC419"
                        : "2px dashed #CED4DA",
                      background: unlocked ? "#FFFFFF" : "#F8F9FA",
                      opacity: unlocked ? 1 : 0.65,
                    }}
                  >
                    <img
                      src={stk.image}
                      alt={stk.name}
                      style={{
                        width: "84px",
                        height: "84px",
                        objectFit: "contain",
                        filter: unlocked ? "none" : "grayscale(1) opacity(0.55)",
                      }}
                    />
                    <strong
                      style={{
                        fontSize: "12.5px",
                        color: "#3B2045",
                        textAlign: "center",
                      }}
                    >
                      {stk.name}
                    </strong>
                    <span
                      style={{
                        fontSize: "11.5px",
                        fontWeight: 900,
                        padding: "2px 10px",
                        borderRadius: "99px",
                        background: unlocked ? "#FFF3BF" : "#E9ECEF",
                        color: unlocked ? "#D9480F" : "#868E96",
                      }}
                    >
                      {unlocked
                        ? `👑 Đã mở Sticker ×${count}`
                        : "🔒 Nuôi lên Cấp 6 để mở"}
                    </span>
                  </div>
                );
              })}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                type="button"
                onClick={() => {
                  setVaultModalOpen(false);
                  onOpenStickerBook("garden-cat-special");
                }}
                style={{
                  padding: "10px 18px",
                  borderRadius: "14px",
                  border: "none",
                  background: "linear-gradient(135deg, #20C997, #0CA678)",
                  color: "#FFFFFF",
                  fontWeight: 900,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                📒 Mang Sang Vở Sticker Để Dán Ngay!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          4. MODAL: IN-GAME MINI-QUIZ
         ===================================================================== */}
      {quizModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 60,
            background: "rgba(25, 10, 40, 0.68)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <div
            style={{
              background: "#FFF9DB",
              border: "4px solid #FAB005",
              borderRadius: "28px",
              padding: "22px 24px",
              maxWidth: "520px",
              width: "100%",
              boxShadow: "0 18px 48px rgba(0,0,0,0.35)",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  background: "#FFD43B",
                  color: "#5C3C00",
                  padding: "4px 12px",
                  borderRadius: "99px",
                  fontWeight: 900,
                  fontSize: "13px",
                }}
              >
                {currentQuestion.subjectLabel} · Thưởng +20 EXP & +3 Xu Vàng
              </span>
              <button
                type="button"
                onClick={() => setQuizModalOpen(false)}
                style={{
                  border: "none",
                  background: "#FFE3E3",
                  color: "#C92A2A",
                  fontWeight: 900,
                  borderRadius: "99px",
                  padding: "4px 12px",
                  cursor: "pointer",
                }}
              >
                Đóng ✕
              </button>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                background: "#FFFFFF",
                padding: "14px",
                borderRadius: "18px",
                border: "2px solid #FFE066",
              }}
            >
              <img
                src="/assets/garden-cat/icon_nam_mascot.webp"
                alt=""
                style={{ width: "64px", height: "64px", objectFit: "contain" }}
              />
              <div
                style={{
                  fontSize: "17px",
                  fontWeight: 800,
                  color: "#3B2045",
                  lineHeight: 1.35,
                }}
              >
                {currentQuestion.prompt}
              </div>
            </div>

            {quizFeedback && (
              <div
                style={{
                  padding: "8px 12px",
                  borderRadius: "12px",
                  background: "#FFE8CC",
                  color: "#D9480F",
                  fontWeight: 800,
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                {quizFeedback}
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
              {currentQuestion.options.map((opt, idx) => {
                const isEliminated = wrongQuizLabels.includes(opt.label);
                const isRightPicked = quizCorrectLabel === opt.label;
                const isDimmedOther =
                  quizCorrectLabel !== null && !isRightPicked;
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isEliminated || quizCorrectLabel !== null}
                    className={
                      isRightPicked
                        ? "kawaii-answer-correct"
                        : isEliminated
                          ? "kawaii-answer-eliminated"
                          : isDimmedOther
                            ? "kawaii-answer-dimmed-others"
                            : ""
                    }
                    onClick={() => handleAnswerMiniQuiz(opt)}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "16px",
                      border: "2.5px solid #FCC419",
                      background: "#FFFFFF",
                      color: "#3B2045",
                      fontWeight: 900,
                      fontSize: "16px",
                      cursor:
                        isEliminated || quizCorrectLabel !== null
                          ? "default"
                          : "pointer",
                      textAlign: "left",
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          5. MODAL: TRADE DUPLICATE OBJECT STICKER FOR CARE PACK
         ===================================================================== */}
      {stickerTradeModalAction && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 60,
            background: "rgba(25, 10, 40, 0.68)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <div
            style={{
              background: "#FFF0F6",
              border: "4px solid #F06595",
              borderRadius: "26px",
              padding: "20px",
              maxWidth: "560px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <strong style={{ fontSize: "18px", color: "#A61E4D" }}>
                🎟️ Đổi 1 Sticker Đồ Vật Lấy {stickerTradeModalAction.title} (+
                {stickerTradeModalAction.expGain + 10} EXP)
              </strong>
              <button
                type="button"
                onClick={() => setStickerTradeModalAction(null)}
                style={{
                  border: "none",
                  background: "#FFD8E4",
                  color: "#A61E4D",
                  fontWeight: 900,
                  borderRadius: "99px",
                  padding: "4px 12px",
                  cursor: "pointer",
                }}
              >
                Đóng ✕
              </button>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "13.5px",
                color: "#5C2B48",
                fontWeight: 700,
              }}
            >
              💡 Chỉ đổi các <strong>Sticker Đồ Vật</strong> trong rương nhiệm vụ
              (tuyệt đối giữ nguyên 100% các Sticker Bé Nấm VIP của con!).
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                gap: "8px",
                maxHeight: "260px",
                overflowY: "auto",
                padding: "4px",
              }}
            >
              {tradableObjectStickers.map(({ item, count }) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    handleTradeObjectStickerForCare(
                      item,
                      stickerTradeModalAction,
                    )
                  }
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                    padding: "8px",
                    borderRadius: "14px",
                    border: "2px solid #FAA2C1",
                    background: "#FFFFFF",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{
                      width: "44px",
                      height: "44px",
                      objectFit: "contain",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 800,
                      color: "#3B2045",
                      textAlign: "center",
                    }}
                  >
                    {item.name}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 900,
                      color: "#D6336C",
                    }}
                  >
                    Đang có: ×{count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          6. MODAL: STAGE 6 GRADUATION CEREMONY -> VAULT + NEW STICKER SET
         ===================================================================== */}
      {graduationModalAward && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 70,
            background: "rgba(20, 8, 38, 0.76)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <div
            style={{
              background: "linear-gradient(180deg, #FFF9DB 0%, #FFF0F6 100%)",
              border: "4px solid #F59F00",
              borderRadius: "30px",
              padding: "22px",
              maxWidth: "540px",
              width: "100%",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Crown size={30} color="#F59F00" />
              <h2 style={{ margin: 0, color: "#B45309", fontSize: "21px" }}>
                Thu Hoạch Vào Kho & Nhận Sticker Cấp 6!
              </h2>
            </div>

            <p
              style={{
                margin: 0,
                fontSize: "14.5px",
                fontWeight: 800,
                color: "#4A2545",
              }}
            >
              Chúc mừng bé Nấm đã kiên trì nuôi{" "}
              <strong>{graduationModalAward.title}</strong> đạt{" "}
              <strong>Cấp 6 Tối Thượng</strong>! Thành quả đã được cất vào{" "}
              <strong>Kho Cây & Mèo Lớn</strong> và hóa thành{" "}
              <strong>Sticker Bộ 3 Khu Giải Trí</strong>!
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                width: "100%",
              }}
            >
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: "18px",
                  padding: "12px",
                  border: "2.5px solid #20C997",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <img
                  src={graduationModalAward.graduatedSticker.image}
                  alt={graduationModalAward.graduatedSticker.name}
                  style={{ width: "90px", height: "90px", objectFit: "contain" }}
                />
                <div
                  style={{
                    fontWeight: 900,
                    fontSize: "13px",
                    color: "#087F5B",
                  }}
                >
                  🌱🐱 Sticker Mới: {graduationModalAward.graduatedSticker.name}
                </div>
              </div>

              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: "18px",
                  padding: "12px",
                  border: "2.5px solid #FCC419",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <img
                  src={graduationModalAward.namSticker.sticker.image}
                  alt={graduationModalAward.namSticker.sticker.name}
                  style={{ width: "90px", height: "90px", objectFit: "contain" }}
                />
                <div
                  style={{
                    fontWeight: 900,
                    fontSize: "13px",
                    color: "#D6336C",
                  }}
                >
                  👑 Sticker VIP: {graduationModalAward.namSticker.sticker.name}
                </div>
              </div>
            </div>

            <div
              style={{
                fontWeight: 900,
                fontSize: "15px",
                color: "#E67700",
                background: "#FFF3BF",
                padding: "4px 16px",
                borderRadius: "99px",
              }}
            >
              🪙 Thưởng Thêm: +{graduationModalAward.coinsEarned} Xu Vàng!
            </div>

            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <button
                type="button"
                onClick={() => setGraduationModalAward(null)}
                style={{
                  flex: 1,
                  padding: "11px",
                  borderRadius: "15px",
                  border: "none",
                  background: "linear-gradient(135deg, #20C997, #0CA678)",
                  color: "#FFFFFF",
                  fontWeight: 900,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                🌱 Nuôi Tiếp Giống Mới!
              </button>
              <button
                type="button"
                onClick={() => {
                  setGraduationModalAward(null);
                  onOpenStickerBook("garden-cat-special");
                }}
                style={{
                  flex: 1,
                  padding: "11px",
                  borderRadius: "15px",
                  border: "none",
                  background: "linear-gradient(135deg, #FF6B9D, #F06595)",
                  color: "#FFFFFF",
                  fontWeight: 900,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                📒 Dán Sticker Vừa Nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          7. MODAL: CONFIRM GENTLE RESET TO STAGE 1
         ===================================================================== */}
      {confirmResetOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 70,
            background: "rgba(20, 8, 38, 0.72)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              border: "4px solid #9C36B5",
              borderRadius: "26px",
              padding: "22px",
              maxWidth: "430px",
              width: "100%",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <h3 style={{ margin: 0, color: "#5F3DC4", fontSize: "19px" }}>
              🔄 Ươm Lại Từ Cấp 1?
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "14.5px",
                fontWeight: 700,
                color: "#4A2545",
              }}
            >
              Bé Nấm muốn đưa <strong>{activeMeta.name}</strong> về lại{" "}
              <strong>Cấp 1</strong> để chăm sóc từ đầu phải không? (Các Sticker
              Cấp 6 trong Kho Vinh Danh vẫn được giữ nguyên!)
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="button"
                onClick={() => setConfirmResetOpen(false)}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "14px",
                  border: "2px solid #CED4DA",
                  background: "#F8F9FA",
                  color: "#495057",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Để Sau
              </button>
              <button
                type="button"
                onClick={handleResetCurrentBreedToStage1}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "14px",
                  border: "none",
                  background: "linear-gradient(135deg, #7950F2, #9C36B5)",
                  color: "#FFFFFF",
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                Đồng Ý Ươm Lại!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
