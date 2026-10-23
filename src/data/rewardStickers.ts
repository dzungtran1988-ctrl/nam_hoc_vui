import type { SubjectId } from "../types.ts";
import { LIFESKILLS_SHARED_ASSETS } from "./sharedAssetCatalog.ts";

export interface CharacterStickerItem {
  id: string;
  index: number; // 1..6
  name: string;
  image: string;
}

export interface SubjectCupConfig {
  subjectId: SubjectId;
  cupTitle: string;
  characterName: string;
  cupImage: string;
  accentColor: string;
  stickers: CharacterStickerItem[];
}

export const NAM_MASTER_CUP_IMAGE = "/assets/rewards/cup-nam.png";

export const SUBJECT_CUPS: Record<SubjectId, SubjectCupConfig> = {
  reading: {
    subjectId: "reading",
    cupTitle: "Cúp Học Đọc",
    characterName: "Hello Kitty",
    cupImage: "/assets/rewards/cup-reading.png",
    accentColor: "#FF4D79",
    stickers: [
      {
        id: "reading-1",
        index: 1,
        name: "Kitty Cúp Vàng",
        image: "/assets/rewards/sticker-reading-1.png",
      },
      {
        id: "reading-2",
        index: 2,
        name: "Kitty Tưới Hoa",
        image: "/assets/rewards/sticker-reading-2.png",
      },
      {
        id: "reading-3",
        index: 3,
        name: "Kitty Tặng Quà",
        image: "/assets/rewards/sticker-reading-3.png",
      },
      {
        id: "reading-4",
        index: 4,
        name: "Đầu Bếp Kitty",
        image: "/assets/rewards/sticker-reading-4.png",
      },
      {
        id: "reading-5",
        index: 5,
        name: "Kitty Thổi Bong Bóng",
        image: "/assets/rewards/sticker-reading-5.png",
      },
      {
        id: "reading-6",
        index: 6,
        name: "Kitty Dạo Phố",
        image: "/assets/rewards/sticker-reading-6.png",
      },
    ],
  },
  math: {
    subjectId: "math",
    cupTitle: "Cúp Toán Học",
    characterName: "My Melody",
    cupImage: "/assets/rewards/cup-math.png",
    accentColor: "#F06595",
    stickers: [
      {
        id: "math-1",
        index: 1,
        name: "My Melody Cúp Vàng",
        image: "/assets/rewards/sticker-math-1.png",
      },
      {
        id: "math-2",
        index: 2,
        name: "My Melody Dâu Tây",
        image: "/assets/rewards/sticker-math-2.png",
      },
      {
        id: "math-3",
        index: 3,
        name: "Họa Sĩ My Melody",
        image: "/assets/rewards/sticker-math-3.png",
      },
      {
        id: "math-4",
        index: 4,
        name: "My Melody Đọc Sách",
        image: "/assets/rewards/sticker-math-4.png",
      },
      {
        id: "math-5",
        index: 5,
        name: "Đầu Bếp My Melody",
        image: "/assets/rewards/sticker-math-5.png",
      },
      {
        id: "math-6",
        index: 6,
        name: "My Melody Chở Hoa",
        image: "/assets/rewards/sticker-math-6.png",
      },
    ],
  },
  music: {
    subjectId: "music",
    cupTitle: "Cúp Học Hát",
    characterName: "Cinnamoroll",
    cupImage: "/assets/rewards/cup-music.png",
    accentColor: "#339AF0",
    stickers: [
      {
        id: "music-1",
        index: 1,
        name: "Cinna Ôm Vầng Trăng",
        image: "/assets/rewards/sticker-music-1.png",
      },
      {
        id: "music-2",
        index: 2,
        name: "Cinna Đọc Sách",
        image: "/assets/rewards/sticker-music-2.png",
      },
      {
        id: "music-3",
        index: 3,
        name: "Ca Sĩ Cinnamoroll",
        image: "/assets/rewards/sticker-music-3.png",
      },
      {
        id: "music-4",
        index: 4,
        name: "Cinna Tiệc Trà Bánh",
        image: "/assets/rewards/sticker-music-4.png",
      },
      {
        id: "music-5",
        index: 5,
        name: "Phi Công Cinnamoroll",
        image: "/assets/rewards/sticker-music-5.png",
      },
      {
        id: "music-6",
        index: 6,
        name: "Cinna Cúp Sao Vàng",
        image: "/assets/rewards/sticker-music-6.png",
      },
    ],
  },
  english: {
    subjectId: "english",
    cupTitle: "Cúp Tiếng Anh",
    characterName: "Kuromi",
    cupImage: "/assets/rewards/cup-english.png",
    accentColor: "#845EF7",
    stickers: [
      {
        id: "english-1",
        index: 1,
        name: "Kuromi Cúp Vàng",
        image: "/assets/rewards/sticker-english-1.png",
      },
      {
        id: "english-2",
        index: 2,
        name: "Kuromi Đọc Sách",
        image: "/assets/rewards/sticker-english-2.png",
      },
      {
        id: "english-3",
        index: 3,
        name: "Kuromi Kem Parfait",
        image: "/assets/rewards/sticker-english-3.png",
      },
      {
        id: "english-4",
        index: 4,
        name: "Ca Sĩ Kuromi",
        image: "/assets/rewards/sticker-english-4.png",
      },
      {
        id: "english-5",
        index: 5,
        name: "Kuromi Trượt Ván",
        image: "/assets/rewards/sticker-english-5.png",
      },
      {
        id: "english-6",
        index: 6,
        name: "Kuromi Ôm Thú Bông",
        image: "/assets/rewards/sticker-english-6.png",
      },
    ],
  },
  storybook: {
    subjectId: "storybook",
    cupTitle: "Cúp Đọc Truyện",
    characterName: "Little Twin Stars",
    cupImage: "/assets/rewards/cup-storybook.png",
    accentColor: "#22B8CF",
    stickers: [
      {
        id: "storybook-1",
        index: 1,
        name: "Twin Stars Vầng Trăng",
        image: "/assets/rewards/sticker-storybook-1.png",
      },
      {
        id: "storybook-2",
        index: 2,
        name: "Sách Cổ Tích Phép Thuật",
        image: "/assets/rewards/sticker-storybook-2.png",
      },
      {
        id: "storybook-3",
        index: 3,
        name: "Đũa Phép Ngôi Sao",
        image: "/assets/rewards/sticker-storybook-3.png",
      },
      {
        id: "storybook-4",
        index: 4,
        name: "Tiệc Bánh Trên Mây",
        image: "/assets/rewards/sticker-storybook-4.png",
      },
      {
        id: "storybook-5",
        index: 5,
        name: "Xe Cầu Vồng Mây",
        image: "/assets/rewards/sticker-storybook-5.png",
      },
      {
        id: "storybook-6",
        index: 6,
        name: "Twin Stars Cúp Sao",
        image: "/assets/rewards/sticker-storybook-6.png",
      },
    ],
  },
  coloring: {
    subjectId: "coloring",
    cupTitle: "Cúp Họa Sĩ Nhí",
    characterName: "Pompompurin",
    cupImage: "/assets/rewards/cup-coloring.png",
    accentColor: "#F59F00",
    stickers: [
      {
        id: "coloring-1",
        index: 1,
        name: "Purin Bánh Pudding",
        image: "/assets/rewards/sticker-coloring-1.png",
      },
      {
        id: "coloring-2",
        index: 2,
        name: "Purin Chăm Đọc Sách",
        image: "/assets/rewards/sticker-coloring-2.png",
      },
      {
        id: "coloring-3",
        index: 3,
        name: "Cầu Thủ Purin",
        image: "/assets/rewards/sticker-coloring-3.png",
      },
      {
        id: "coloring-4",
        index: 4,
        name: "Purin Nhảy Múa",
        image: "/assets/rewards/sticker-coloring-4.png",
      },
      {
        id: "coloring-5",
        index: 5,
        name: "Purin Kem Ốc Quế",
        image: "/assets/rewards/sticker-coloring-5.png",
      },
      {
        id: "coloring-6",
        index: 6,
        name: "Purin Ôm Sao Ngủ",
        image: "/assets/rewards/sticker-coloring-6.png",
      },
    ],
  },
  minigame: {
    subjectId: "minigame",
    cupTitle: "Cúp Vận Động",
    characterName: "Pochacco",
    cupImage: "/assets/rewards/cup-minigame.png",
    accentColor: "#20C997",
    stickers: [
      {
        id: "minigame-1",
        index: 1,
        name: "Pochacco Vẫy Tay",
        image: "/assets/rewards/sticker-minigame-1.png",
      },
      {
        id: "minigame-2",
        index: 2,
        name: "Pochacco Đọc Sách",
        image: "/assets/rewards/sticker-minigame-2.png",
      },
      {
        id: "minigame-3",
        index: 3,
        name: "Cầu Thủ Pochacco",
        image: "/assets/rewards/sticker-minigame-3.png",
      },
      {
        id: "minigame-4",
        index: 4,
        name: "Pochacco Nhảy Múa",
        image: "/assets/rewards/sticker-minigame-4.png",
      },
      {
        id: "minigame-5",
        index: 5,
        name: "Pochacco Ăn Kem",
        image: "/assets/rewards/sticker-minigame-5.png",
      },
      {
        id: "minigame-6",
        index: 6,
        name: "Pochacco Ngủ Ngon",
        image: "/assets/rewards/sticker-minigame-6.png",
      },
    ],
  },
  lifeskills: {
    subjectId: "lifeskills",
    cupTitle: "Cúp Kỹ Năng Sống",
    characterName: "Đầu Bếp & Món Ngon 3D",
    cupImage: "/assets/items/lifeskills/lifeskills_08.png",
    accentColor: "#F6AD55",
    stickers: LIFESKILLS_SHARED_ASSETS.slice(0, 6).map((asset, idx) => ({
      id: `lifeskills-${idx + 1}`,
      index: idx + 1,
      name: asset.name,
      image: asset.imageUrl,
    })),
  },
};

/**
 * 4 BỘ STICKER 3D KỸ NĂNG SỐNG (24 MÓN TỪ KHO DÙNG CHUNG LIFESKILLS_SHARED_ASSETS):
 * - Bộ 1 (lifeskills_01..06): Nguyên Liệu & Sơ Chế
 * - Bộ 2 (lifeskills_07..12): Dụng Cụ Nấu Nướng
 * - Bộ 3 (lifeskills_13..18): Tiệm Bánh Ngọt Của Nấm
 * - Bộ 4 (lifeskills_19..24): Bữa Cơm & Món Ngon
 */
export const LIFESKILLS_STICKER_SETS: Record<1 | 2 | 3 | 4, CharacterStickerItem[]> = {
  1: SUBJECT_CUPS.lifeskills.stickers,
  2: LIFESKILLS_SHARED_ASSETS.slice(6, 12).map((asset, idx) => ({
    id: `lifeskills-s2-${idx + 1}`,
    index: idx + 1,
    name: asset.name,
    image: asset.imageUrl,
  })),
  3: LIFESKILLS_SHARED_ASSETS.slice(12, 18).map((asset, idx) => ({
    id: `lifeskills-s3-${idx + 1}`,
    index: idx + 1,
    name: asset.name,
    image: asset.imageUrl,
  })),
  4: LIFESKILLS_SHARED_ASSETS.slice(18, 24).map((asset, idx) => ({
    id: `lifeskills-s4-${idx + 1}`,
    index: idx + 1,
    name: asset.name,
    image: asset.imageUrl,
  })),
};

export const SUBJECT_STICKER_SET_2: Record<SubjectId, CharacterStickerItem[]> = {
  reading: SUBJECT_CUPS.reading.stickers.map((s) => ({
    ...s,
    id: `reading-s2-${s.index}`,
    name: `Bộ 2 · Ô #${s.index} (Chờ mở)`,
  })),
  math: SUBJECT_CUPS.math.stickers.map((s) => ({
    ...s,
    id: `math-s2-${s.index}`,
    name: `Bộ 2 · Ô #${s.index} (Chờ mở)`,
  })),
  english: SUBJECT_CUPS.english.stickers.map((s) => ({
    ...s,
    id: `english-s2-${s.index}`,
    name: `Bộ 2 · Ô #${s.index} (Chờ mở)`,
  })),
  music: SUBJECT_CUPS.music.stickers.map((s) => ({
    ...s,
    id: `music-s2-${s.index}`,
    name: `Bộ 2 · Ô #${s.index} (Chờ mở)`,
  })),
  coloring: SUBJECT_CUPS.coloring.stickers.map((s) => ({
    ...s,
    id: `coloring-s2-${s.index}`,
    name: `Bộ 2 · Ô #${s.index} (Chờ mở)`,
  })),
  storybook: SUBJECT_CUPS.storybook.stickers.map((s) => ({
    ...s,
    id: `storybook-s2-${s.index}`,
    name: `Bộ 2 · Ô #${s.index} (Chờ mở)`,
  })),
  minigame: SUBJECT_CUPS.minigame.stickers.map((s) => ({
    ...s,
    id: `minigame-s2-${s.index}`,
    name: `Bộ 2 · Ô #${s.index} (Chờ mở)`,
  })),
  lifeskills: LIFESKILLS_STICKER_SETS[2],
};

export function isSubjectSet2Available(subjectId: SubjectId): boolean {
  return subjectId === "lifeskills";
}

export function getSubjectStickerSet(
  subjectId: SubjectId,
  setNumber: 1 | 2 | 3 | 4 = 1,
): CharacterStickerItem[] {
  if (subjectId === "lifeskills") {
    return LIFESKILLS_STICKER_SETS[setNumber] || LIFESKILLS_STICKER_SETS[1];
  }
  if (setNumber === 2) {
    return SUBJECT_STICKER_SET_2[subjectId] || SUBJECT_CUPS[subjectId].stickers;
  }
  return SUBJECT_CUPS[subjectId].stickers;
}

export interface SubjectStickerBoardState {
  litIndices: number[]; // 1..6 trên bảng đèn hiện tại
  completedCycles: number; // Số Cúp Vàng đã thắp sáng
  everUnlockedIndices?: number[]; // 1..6 đã mở khóa vĩnh viễn trong Quyển Vở Sticker
  earnedCounts?: Record<number, number>; // Tổng số lượng từng sticker đã mở được (x1, x2...)
}

export type StickerCollectionStore = Record<
  SubjectId,
  SubjectStickerBoardState
>;

const STICKER_STORAGE_KEY = "nam-hoc-vui.sticker-cups.v1";

export const ALL_SUBJECT_IDS: SubjectId[] = [
  "reading",
  "math",
  "english",
  "music",
  "coloring",
  "storybook",
  "minigame",
  "lifeskills",
];

export function createDefaultStickerStore(): StickerCollectionStore {
  return {
    reading: { litIndices: [], completedCycles: 0, everUnlockedIndices: [], earnedCounts: {} },
    math: { litIndices: [], completedCycles: 0, everUnlockedIndices: [], earnedCounts: {} },
    music: { litIndices: [], completedCycles: 0, everUnlockedIndices: [], earnedCounts: {} },
    english: { litIndices: [], completedCycles: 0, everUnlockedIndices: [], earnedCounts: {} },
    storybook: { litIndices: [], completedCycles: 0, everUnlockedIndices: [], earnedCounts: {} },
    coloring: { litIndices: [], completedCycles: 0, everUnlockedIndices: [], earnedCounts: {} },
    minigame: { litIndices: [], completedCycles: 0, everUnlockedIndices: [], earnedCounts: {} },
    lifeskills: { litIndices: [], completedCycles: 0, everUnlockedIndices: [], earnedCounts: {} },
  };
}

export function loadStickerStore(): StickerCollectionStore {
  try {
    const raw = window.localStorage.getItem(STICKER_STORAGE_KEY);
    if (!raw) return createDefaultStickerStore();
    const parsed = JSON.parse(raw);
    const store = createDefaultStickerStore();
    for (const sid of ALL_SUBJECT_IDS) {
      if (parsed && parsed[sid]) {
        const arr: number[] = Array.isArray(parsed[sid].litIndices)
          ? parsed[sid].litIndices.filter(
              (n: unknown): n is number =>
                typeof n === "number" && n >= 1 && n <= 6,
            )
          : [];
        const everArr: number[] = Array.isArray(parsed[sid].everUnlockedIndices)
          ? parsed[sid].everUnlockedIndices.filter(
              (n: unknown): n is number =>
                typeof n === "number" && n >= 1 && n <= 6,
            )
          : [];
        const cycles =
          typeof parsed[sid].completedCycles === "number"
            ? Math.max(0, parsed[sid].completedCycles)
            : 0;
        const mergedEver =
          cycles > 0
            ? [1, 2, 3, 4, 5, 6]
            : Array.from(new Set<number>([...arr, ...everArr])).sort(
                (a, b) => a - b,
              );

        const rawCounts =
          parsed[sid].earnedCounts && typeof parsed[sid].earnedCounts === "object"
            ? (parsed[sid].earnedCounts as Record<string, unknown>)
            : {};
        const earnedCounts: Record<number, number> = {};
        for (let i = 1; i <= 6; i++) {
          const savedVal =
            typeof rawCounts[String(i)] === "number"
              ? Math.max(0, Math.floor(rawCounts[String(i)] as number))
              : 0;
          const fallbackMin =
            cycles + (arr.includes(i) ? 1 : mergedEver.includes(i) ? 1 : 0);
          const finalCount = Math.max(savedVal, fallbackMin);
          if (finalCount > 0) {
            earnedCounts[i] = finalCount;
          }
        }

        store[sid] = {
          litIndices: Array.from(new Set<number>(arr)).sort((a, b) => a - b),
          completedCycles: cycles,
          everUnlockedIndices: mergedEver,
          earnedCounts,
        };
      }
    }
    return store;
  } catch {
    return createDefaultStickerStore();
  }
}

export function saveStickerStore(store: StickerCollectionStore): void {
  try {
    window.localStorage.setItem(STICKER_STORAGE_KEY, JSON.stringify(store));
  } catch {
    // ignore storage errors
  }
}

export interface AwardStickerOutcome {
  updatedStore: StickerCollectionStore;
  awardedSticker: CharacterStickerItem;
  litCount: number;
  justCompletedFullSet: boolean;
}

/**
 * Tặng 1 sticker tiếp theo của môn học (1 -> 6).
 * Nếu trước đó cả 6 sticker đã sáng đủ (6/6), tự động cất vào vở rồi bật sáng sticker số 1 của vòng mới.
 * Đồng thời cộng +1 số lượng (x1, x2...) của sticker đó trong kho dán.
 */
export function awardStickerForSubject(
  currentStore: StickerCollectionStore,
  subjectId: SubjectId,
): AwardStickerOutcome {
  const cup = SUBJECT_CUPS[subjectId];
  const prevBoard = currentStore[subjectId] || {
    litIndices: [],
    completedCycles: 0,
    everUnlockedIndices: [],
    earnedCounts: {},
  };

  const baseLit =
    prevBoard.litIndices.length >= 6 ? [] : [...prevBoard.litIndices];

  let nextIdx = 1;
  for (let i = 1; i <= 6; i++) {
    if (!baseLit.includes(i)) {
      nextIdx = i;
      break;
    }
  }

  const nextLit = Array.from(new Set([...baseLit, nextIdx])).sort(
    (a, b) => a - b,
  );
  const justCompletedFullSet = nextLit.length === 6;
  const nextCycles = justCompletedFullSet
    ? prevBoard.completedCycles + 1
    : prevBoard.completedCycles;

  const nextEver =
    nextCycles > 0
      ? [1, 2, 3, 4, 5, 6]
      : Array.from(
          new Set([...(prevBoard.everUnlockedIndices || []), ...nextLit]),
        ).sort((a, b) => a - b);

  const nextEarnedCounts: Record<number, number> = {
    ...(prevBoard.earnedCounts || {}),
  };
  nextEarnedCounts[nextIdx] = (nextEarnedCounts[nextIdx] || 0) + 1;

  const updatedStore: StickerCollectionStore = {
    ...currentStore,
    [subjectId]: {
      litIndices: nextLit,
      completedCycles: nextCycles,
      everUnlockedIndices: nextEver,
      earnedCounts: nextEarnedCounts,
    },
  };

  saveStickerStore(updatedStore);

  const activeSetNum: 1 | 2 | 3 | 4 =
    subjectId === "lifeskills"
      ? (((prevBoard.completedCycles || 0) % 4) + 1 as 1 | 2 | 3 | 4)
      : 1;
  const activeStickers = getSubjectStickerSet(subjectId, activeSetNum);
  const awardedSticker =
    activeStickers.find((s) => s.index === nextIdx) || activeStickers[0];

  return {
    updatedStore,
    awardedSticker,
    litCount: nextLit.length,
    justCompletedFullSet,
  };
}

/**
 * Khi bé đạt 6/6 Sticker và bấm "Hợp Nhất Mở Cúp Vàng & Cất Vào Vở Sticker":
 * Giữ vĩnh viễn cả 6 Sticker trong Quyển Vở Sticker (everUnlockedIndices = [1..6]),
 * đảm bảo Cúp Vàng tăng cấp, và mở bảng mới (litIndices = []) để bé sưu tập vòng Cúp tiếp theo.
 */
export function resetSubjectStickerBoard(
  currentStore: StickerCollectionStore,
  subjectId: SubjectId,
): StickerCollectionStore {
  const prevBoard = currentStore[subjectId] || {
    litIndices: [],
    completedCycles: 0,
    everUnlockedIndices: [],
    earnedCounts: {},
  };
  const nextCycles = Math.max(1, prevBoard.completedCycles);
  const nextEarnedCounts: Record<number, number> = {
    ...(prevBoard.earnedCounts || {}),
  };
  for (let i = 1; i <= 6; i++) {
    nextEarnedCounts[i] = Math.max(nextEarnedCounts[i] || 0, nextCycles);
  }
  const updatedStore: StickerCollectionStore = {
    ...currentStore,
    [subjectId]: {
      litIndices: [],
      completedCycles: nextCycles,
      everUnlockedIndices: [1, 2, 3, 4, 5, 6],
      earnedCounts: nextEarnedCounts,
    },
  };
  saveStickerStore(updatedStore);
  return updatedStore;
}

export function getCharacterStickerEarnedCount(
  store: StickerCollectionStore,
  subjectId: SubjectId,
  stickerIndex: number,
): number {
  const b = store[subjectId];
  if (!b) return 0;
  const fromMap = b.earnedCounts?.[stickerIndex] || 0;
  const fallback =
    (b.completedCycles || 0) +
    (b.litIndices.includes(stickerIndex)
      ? 1
      : b.everUnlockedIndices?.includes(stickerIndex)
        ? 1
        : 0);
  return Math.max(fromMap, fallback);
}

export function isStickerUnlockedInBook(
  store: StickerCollectionStore,
  subjectId: SubjectId,
  stickerIndex: number,
): boolean {
  return getCharacterStickerEarnedCount(store, subjectId, stickerIndex) > 0;
}

/**
 * Quy tắc Bộ 2:
 * - Riêng môn Kỹ Năng Sống (lifeskills): Có 2 bộ Hoa Quả & Bánh Kẹo (vì dễ). Sau khi mở hết 6/6 Bộ 1 (Bánh Kẹo), bé mở tiếp từng ô của Bộ 2 (Hoa Quả).
 * - 7 môn học chính còn lại: Bộ 2 để tối (khóa chờ) để sau này cập nhật thêm hình mới.
 */
export function getSubjectSetStickerEarnedCount(
  store: StickerCollectionStore,
  subjectId: SubjectId,
  setNumber: 1 | 2 | 3 | 4,
  stickerIndex: number,
): number {
  if (setNumber === 1) {
    return getCharacterStickerEarnedCount(store, subjectId, stickerIndex);
  }
  if (!isSubjectSet2Available(subjectId)) return 0;
  const b = store[subjectId];
  if (!b) return 0;
  const cycles = b.completedCycles || 0;
  const requiredPrevCycles = setNumber - 1;
  if (cycles < requiredPrevCycles) return 0;
  const completedFullRunsOfThisSet = Math.max(0, cycles - requiredPrevCycles);
  const inCurrentRun =
    cycles === requiredPrevCycles && b.litIndices.includes(stickerIndex)
      ? 1
      : 0;
  return completedFullRunsOfThisSet + inCurrentRun;
}

export function getSubjectSetUnlockedCount(
  store: StickerCollectionStore,
  subjectId: SubjectId,
  setNumber: 1 | 2 | 3 | 4,
): number {
  if (setNumber === 1) {
    const b = store[subjectId];
    if (!b) return 0;
    if ((b.completedCycles || 0) >= 1) return 6;
    return b.litIndices.length;
  }
  if (!isSubjectSet2Available(subjectId)) return 0;
  const b = store[subjectId];
  if (!b) return 0;
  const cycles = b.completedCycles || 0;
  const requiredPrevCycles = setNumber - 1;
  if (cycles > requiredPrevCycles) return 6;
  if (cycles === requiredPrevCycles) return b.litIndices.length;
  return 0;
}

export function getSet2StickerEarnedCount(
  store: StickerCollectionStore,
  subjectId: SubjectId,
  stickerIndex: number,
): number {
  return getSubjectSetStickerEarnedCount(store, subjectId, 2, stickerIndex);
}

export function getSet2UnlockedCountForSubject(
  store: StickerCollectionStore,
  subjectId: SubjectId,
): number {
  return getSubjectSetUnlockedCount(store, subjectId, 2);
}

export function getTotalLitStickers(store: StickerCollectionStore): number {
  return ALL_SUBJECT_IDS.reduce(
    (sum, sid) => sum + (store[sid]?.litIndices.length || 0),
    0,
  );
}

export function getTotalUnlockedInBook(store: StickerCollectionStore): number {
  let count = 0;
  for (const sid of ALL_SUBJECT_IDS) {
    for (let i = 1; i <= 6; i++) {
      if (isStickerUnlockedInBook(store, sid, i)) count++;
    }
  }
  return count;
}

export function getTotalGoldenCups(store: StickerCollectionStore): number {
  return ALL_SUBJECT_IDS.reduce(
    (sum, sid) => sum + (store[sid]?.completedCycles || 0),
    0,
  );
}

export interface NamRankInfo {
  icon: string;
  title: string;
  color: string;
}

export function getNamRankInfo(store: StickerCollectionStore): NamRankInfo {
  const unlocked = getTotalUnlockedInBook(store);
  const cups = getTotalGoldenCups(store);
  if (unlocked >= 36 || cups >= 4) {
    return {
      icon: "🏆",
      title: "Siêu Anh Hùng 7 Môn Học",
      color: "#d97706",
    };
  }
  if (unlocked >= 16 || cups >= 2) {
    return {
      icon: "👑",
      title: "Hoàng Tử Sưu Tập Sticker",
      color: "#db2777",
    };
  }
  if (unlocked >= 6 || cups >= 1) {
    return {
      icon: "⭐",
      title: "Ngôi Sao Nhí Tài Năng",
      color: "#2563eb",
    };
  }
  return {
    icon: "🌱",
    title: "Mầm Non Chăm Chỉ",
    color: "#16a34a",
  };
}

export type DrawerTabId =
  | "unlocked"
  | "nam-special"
  | SubjectId
  | "quest-unlocked"
  | "quest-sweets"
  | "quest-fruits"
  | "quest-vehicles"
  | "quest-school-home"
  | "quest-lifeskills";

export type NamStickerTier = "stage" | "study" | "food";

export interface NamSpecialStickerItem {
  id: string;
  name: string;
  image: string;
  tier: NamStickerTier;
  badgeLabel: string;
  /** Phần thưởng ngoài đời thật từ Mẹ khi mở trúng Sticker Nấm Ăn (Độ khó cao: mở từ Cúp Vàng thứ 2 trở lên) */
  momRewardVoucher?: string;
}

export const NAM_SPECIAL_STICKERS: NamSpecialStickerItem[] = [
  // 1. CA SĨ NẤM 3D CONCERT TRÊN SÂN KHẤU TRUNG TÂM (Mở sẵn để Nấm biểu diễn ở giữa sân khấu)
  {
    id: "nam-stage-star",
    name: "Ca Sĩ Nấm Concert 3D",
    image: "/assets/nam-stickers/nam-stage-star.png?v=3dclay",
    tier: "stage",
    badgeLabel: "🎤 Ngôi Sao Sân Khấu 3D",
  },

  // 2. BỘ STICKER NẤM CHĂM HỌC & NGOAN NGOÃN (Mở Cúp Vàng 6 Nhãn Môn Học)
  {
    id: "nam-3d-cup",
    name: "Nấm 3D Ôm Cúp Vàng",
    image: "/assets/nam-stickers/nam-3d-cup.png",
    tier: "study",
    badgeLabel: "🏆 Nấm 3D Đất Nặn",
  },
  {
    id: "nam-3d-read",
    name: "Nấm 3D Đọc Sách Hồng",
    image: "/assets/nam-stickers/nam-3d-read.png",
    tier: "study",
    badgeLabel: "📖 Nấm 3D Đất Nặn",
  },
  {
    id: "nam-3d-paint",
    name: "Họa Sĩ Nấm 3D Vẽ Tranh",
    image: "/assets/nam-stickers/nam-3d-paint.png",
    tier: "study",
    badgeLabel: "🎨 Nấm 3D Đất Nặn",
  },
  {
    id: "nam-3d-scooter",
    name: "Nấm 3D Lái Xe Chở Hoa",
    image: "/assets/nam-stickers/nam-3d-scooter.png",
    tier: "study",
    badgeLabel: "🛵 Nấm 3D Đất Nặn",
  },
  {
    id: "nam-study-read",
    name: "Nấm Chăm Đọc Sách",
    image: "/assets/nam-stickers/nam-study-read.png",
    tier: "study",
    badgeLabel: "📚 Nấm Học Giỏi",
  },
  {
    id: "nam-study-write",
    name: "Nấm Ngồi Viết Bài",
    image: "/assets/nam-stickers/nam-study-write.png",
    tier: "study",
    badgeLabel: "✏️ Nấm Học Giỏi",
  },
  {
    id: "nam-study-paint",
    name: "Họa Sĩ Nấm Vẽ Tranh",
    image: "/assets/nam-stickers/nam-study-paint.png",
    tier: "study",
    badgeLabel: "🎨 Nấm Học Giỏi",
  },
  {
    id: "nam-study-school",
    name: "Nấm Đeo Cặp Đi Học",
    image: "/assets/nam-stickers/nam-study-school.png",
    tier: "study",
    badgeLabel: "🎒 Nấm Học Giỏi",
  },
  {
    id: "nam-study-brush",
    name: "Nấm Ngoan Đánh Răng",
    image: "/assets/nam-stickers/nam-study-brush.png",
    tier: "study",
    badgeLabel: "🪥 Bé Ngoan",
  },
  {
    id: "nam-study-water",
    name: "Nấm Tưới Cây Xanh",
    image: "/assets/nam-stickers/nam-study-water.png",
    tier: "study",
    badgeLabel: "🌱 Bé Ngoan",
  },

  // 3. BỘ STICKER HIẾM: NẤM ĂN NGON + PHIẾU THƯỞNG MẸ MUA ĐỒ ĂN THẬT (Độ khó cao: Cúp Cấp 2+ hoặc mỗi 2 Cúp Vàng = 12 bài học)
  {
    id: "nam-eat-icecream",
    name: "Nấm Ăn Kem Ốc Quế",
    image: "/assets/nam-stickers/nam-eat-icecream.png",
    tier: "food",
    badgeLabel: "🍦 Siêu Hiếm · Quà Mẹ Mua",
    momRewardVoucher:
      "🎟️ PHIẾU THƯỞNG MẸ TẶNG: Nấm khoe Mẹ để Mẹ mua cho Nấm 1 cây Kem mát lạnh ngoài đời thật nhé!",
  },
  {
    id: "nam-3d-mymelody-strawberry",
    name: "Nấm 3D Mũ My Melody",
    image: "/assets/nam-stickers/nam-3d-mymelody-strawberry.png",
    tier: "food",
    badgeLabel: "🍓 3D Siêu Hiếm · Quà Mẹ Mua",
    momRewardVoucher:
      "🎟️ PHIẾU THƯỞNG MẸ TẶNG: Mẹ thưởng cho Nấm Dâu Tây ngọt lịm / Sữa Dâu thơm ngon!",
  },
  {
    id: "nam-3d-strawberry",
    name: "Nấm 3D Ôm Dâu Tây",
    image: "/assets/nam-stickers/nam-3d-strawberry.png",
    tier: "food",
    badgeLabel: "🍓 3D Siêu Hiếm · Quà Mẹ Mua",
    momRewardVoucher:
      "🎟️ PHIẾU THƯỞNG MẸ TẶNG: Mẹ mua Dâu Tây / Sinh Tố Trái Cây mát lạnh cho Nấm!",
  },
  {
    id: "nam-3d-cookies",
    name: "Đầu Bếp Nấm 3D Bánh Quy",
    image: "/assets/nam-stickers/nam-3d-cookies.png",
    tier: "food",
    badgeLabel: "🍪 3D Siêu Hiếm · Quà Mẹ Mua",
    momRewardVoucher:
      "🎟️ PHIẾU THƯỞNG MẸ TẶNG: Mẹ mua Bánh Quy Bơ hình thú thơm giòn cho Nấm!",
  },
  {
    id: "nam-eat-milktea",
    name: "Nấm Uống Trà Sữa",
    image: "/assets/nam-stickers/nam-eat-milktea.png",
    tier: "food",
    badgeLabel: "🧋 Siêu Hiếm · Quà Mẹ Mua",
    momRewardVoucher:
      "🎟️ PHIẾU THƯỞNG MẸ TẶNG: Mẹ thưởng cho Nấm 1 ly Trà Sữa / Sữa Trái Cây thơm ngon!",
  },
  {
    id: "nam-eat-donut",
    name: "Nấm Ăn Bánh Donut",
    image: "/assets/nam-stickers/nam-eat-donut.png",
    tier: "food",
    badgeLabel: "🍩 Siêu Hiếm · Quà Mẹ Mua",
    momRewardVoucher:
      "🎟️ PHIẾU THƯỞNG MẸ TẶNG: Mẹ mua cho Nấm 1 chiếc Bánh Ngọt / Bánh Donut thật ngon!",
  },
  {
    id: "nam-eat-cookies",
    name: "Nấm Khay Bánh Quy",
    image: "/assets/nam-stickers/nam-eat-cookies.png",
    tier: "food",
    badgeLabel: "🍪 Siêu Hiếm · Quà Mẹ Mua",
    momRewardVoucher:
      "🎟️ PHIẾU THƯỞNG MẸ TẶNG: Mẹ thưởng cho Nấm 1 gói Bánh Quy giòn thơm!",
  },
  {
    id: "nam-eat-strawberry",
    name: "Nấm Ăn Dâu Tây",
    image: "/assets/nam-stickers/nam-eat-strawberry.png",
    tier: "food",
    badgeLabel: "🍓 Siêu Hiếm · Quà Mẹ Mua",
    momRewardVoucher:
      "🎟️ PHIẾU THƯỞNG MẸ TẶNG: Mẹ mua Dâu Tây / Trái Cây tươi ngon cho Nấm!",
  },
  {
    id: "nam-eat-watermelon",
    name: "Nấm Ăn Dưa Hấu",
    image: "/assets/nam-stickers/nam-eat-watermelon.png",
    tier: "food",
    badgeLabel: "🍉 Siêu Hiếm · Quà Mẹ Mua",
    momRewardVoucher:
      "🎟️ PHIẾU THƯỞNG MẸ TẶNG: Mẹ bổ Dưa Hấu / Hoa Quả mát ngọt cho Nấm ăn!",
  },
  {
    id: "nam-eat-chicken",
    name: "Nấm Ăn Đùi Gà Rán",
    image: "/assets/nam-stickers/nam-eat-chicken.png",
    tier: "food",
    badgeLabel: "🍗 Siêu Hiếm · Quà Mẹ Mua",
    momRewardVoucher:
      "🎟️ PHIẾU THƯỞNG MẸ TẶNG: Mẹ thưởng cho Nấm 1 phần Đùi Gà Rán giòn rụm!",
  },
  {
    id: "nam-eat-burger",
    name: "Nấm Ăn Hamburger",
    image: "/assets/nam-stickers/nam-eat-burger.png",
    tier: "food",
    badgeLabel: "🍔 Siêu Hiếm · Quà Mẹ Mua",
    momRewardVoucher:
      "🎟️ PHIẾU THƯỞNG MẸ TẶNG: Mẹ mua Bánh Burger / Pizza ngon tuyệt cho Nấm!",
  },
  {
    id: "nam-eat-noodles",
    name: "Nấm Ăn Mì Trứng",
    image: "/assets/nam-stickers/nam-eat-noodles.png",
    tier: "food",
    badgeLabel: "🍜 Siêu Hiếm · Quà Mẹ Mua",
    momRewardVoucher:
      "🎟️ PHIẾU THƯỞNG MẸ TẶNG: Mẹ nấu cho Nấm 1 tô Mì Trứng / Phở thật ngon!",
  },
  {
    id: "nam-eat-bento",
    name: "Nấm Cơm Hộp Bento",
    image: "/assets/nam-stickers/nam-eat-bento.png",
    tier: "food",
    badgeLabel: "🍱 Siêu Hiếm · Quà Mẹ Mua",
    momRewardVoucher:
      "🎟️ PHIẾU THƯỞNG MẸ TẶNG: Mẹ làm Cơm Hộp Xúc Xích Trứng Cuộn cho Nấm!",
  },
  {
    id: "nam-eat-milk",
    name: "Nấm Uống Sữa Tươi",
    image: "/assets/nam-stickers/nam-eat-milk.png",
    tier: "food",
    badgeLabel: "🥛 Siêu Hiếm · Quà Mẹ Mua",
    momRewardVoucher:
      "🎟️ PHIẾU THƯỞNG MẸ TẶNG: Mẹ tặng Nấm 1 hộp Sữa Tươi / Sữa Chua uống mát lành!",
  },
  {
    id: "nam-eat-rice",
    name: "Nấm Ăn Cơm Ngoan",
    image: "/assets/nam-stickers/nam-eat-rice.png",
    tier: "food",
    badgeLabel: "🍚 Siêu Hiếm · Quà Mẹ Mua",
    momRewardVoucher:
      "🎟️ PHIẾU THƯỞNG MẸ TẶNG: Mẹ nấu món Nấm thích nhất trong bữa cơm hôm nay!",
  },

  // 4. BỘ STICKER NẤM ÔM BẠN THÂN SANRIO & DORAEMON (Mở Cúp Vàng 6 Nhãn Môn Học)
  {
    id: "nam-hug-kitty",
    name: "Nấm Ôm Hello Kitty",
    image: "/assets/nam-stickers/nam-hug-kitty.png",
    tier: "study",
    badgeLabel: "🎀 Đôi Bạn Thân",
  },
  {
    id: "nam-hug-mymelody",
    name: "Nấm Ôm My Melody",
    image: "/assets/nam-stickers/nam-hug-mymelody.png",
    tier: "study",
    badgeLabel: "🐰 Đôi Bạn Thân",
  },
  {
    id: "nam-hug-cinna",
    name: "Nấm Ôm Cinnamoroll",
    image: "/assets/nam-stickers/nam-hug-cinna.png",
    tier: "study",
    badgeLabel: "☁️ Đôi Bạn Thân",
  },
  {
    id: "nam-hug-kuromi",
    name: "Nấm Ôm Kuromi",
    image: "/assets/nam-stickers/nam-hug-kuromi.png",
    tier: "study",
    badgeLabel: "💜 Đôi Bạn Thân",
  },
  {
    id: "nam-hug-purin",
    name: "Nấm Ôm Pompompurin",
    image: "/assets/nam-stickers/nam-hug-purin.png",
    tier: "study",
    badgeLabel: "🍮 Đôi Bạn Thân",
  },
  {
    id: "nam-hug-pochacco",
    name: "Nấm Ôm Pochacco",
    image: "/assets/nam-stickers/nam-hug-pochacco.png",
    tier: "study",
    badgeLabel: "⚽ Đôi Bạn Thân",
  },
  {
    id: "nam-hug-doraemon",
    name: "Nấm Ôm Doraemon",
    image: "/assets/nam-stickers/nam-hug-doraemon.png",
    tier: "study",
    badgeLabel: "🔔 Đôi Bạn Thân",
  },
  {
    id: "nam-hug-capybara",
    name: "Nấm Ôm Capybara",
    image: "/assets/nam-stickers/nam-hug-capybara.png",
    tier: "study",
    badgeLabel: "🍊 Đôi Bạn Thân",
  },
  {
    id: "nam-hug-keroppi",
    name: "Nấm Ôm Keroppi",
    image: "/assets/nam-stickers/nam-hug-keroppi.png",
    tier: "study",
    badgeLabel: "🐸 Đôi Bạn Thân",
  },
  {
    id: "nam-hug-tuxedosam",
    name: "Nấm Ôm Tuxedosam",
    image: "/assets/nam-stickers/nam-hug-tuxedosam.png",
    tier: "study",
    badgeLabel: "🐧 Đôi Bạn Thân",
  },
  {
    id: "nam-hug-badtz",
    name: "Nấm Ôm Badtz-Maru",
    image: "/assets/nam-stickers/nam-hug-badtz.png",
    tier: "study",
    badgeLabel: "🎸 Đôi Bạn Thân",
  },
  {
    id: "nam-hug-twinstars",
    name: "Nấm & Twin Stars",
    image: "/assets/nam-stickers/nam-hug-twinstars.png",
    tier: "study",
    badgeLabel: "🌟 Đôi Bạn Thân",
  },
];

export type NamSpecialInventory = Record<string, number>;

const NAM_SPECIAL_STORAGE_KEY = "nam-hoc-vui.nam-special-stickers.v1";

export function loadNamSpecialInventory(): NamSpecialInventory {
  const defaultInv: NamSpecialInventory = {
    "nam-stage-star": 2, // 1 đang biểu diễn ở giữa Sân Khấu Nấm + 1 dự phòng trong khay
  };
  try {
    const raw = window.localStorage.getItem(NAM_SPECIAL_STORAGE_KEY);
    if (!raw) return defaultInv;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return defaultInv;
    const out: NamSpecialInventory = { ...defaultInv };
    for (const [k, v] of Object.entries(parsed)) {
      if (typeof v === "number" && v > 0) {
        out[k] = Math.max(out[k] || 0, Math.floor(v));
      }
    }
    return out;
  } catch {
    return defaultInv;
  }
}

export function saveNamSpecialInventory(inv: NamSpecialInventory): void {
  try {
    window.localStorage.setItem(NAM_SPECIAL_STORAGE_KEY, JSON.stringify(inv));
  } catch {
    // ignore storage errors
  }
}

export function getUnlockedNamSpecialCount(inv?: NamSpecialInventory): number {
  const store = inv || loadNamSpecialInventory();
  return NAM_SPECIAL_STICKERS.filter((s) => (store[s.id] || 0) > 0).length;
}

export interface AwardedNamCupStickerResult {
  sticker: NamSpecialStickerItem;
  newCount: number;
  isHardFoodReward: boolean;
  inventory: NamSpecialInventory;
}

export const SUBJECT_PREFERRED_STUDY_STICKER: Record<SubjectId, string> = {
  reading: "nam-study-read",
  math: "nam-study-write",
  coloring: "nam-study-paint",
  english: "nam-study-school",
  storybook: "nam-study-water",
  minigame: "nam-study-brush",
  music: "nam-hug-cinna",
  lifeskills: "nam-hug-doraemon",
};

/**
 * Khi bé thắp sáng đủ 6/6 nhãn môn học và bấm Mở Cúp Vàng:
 * - Riêng môn Kỹ Năng Sống (lifeskills): Dễ hơn nên chỉ nhận Bộ Bánh Kẹo & Hoa Quả, KHÔNG nhận Sticker Nấm.
 * - 7 môn học chính còn lại: Mở đủ 6/6 ô sẽ nhận được 1 Sticker Bé Nấm xịn nhất!
 */
export function awardNamStickerOnCupOpen(
  updatedStore: StickerCollectionStore,
  subjectId: SubjectId,
): AwardedNamCupStickerResult | undefined {
  if (subjectId === "lifeskills") {
    return undefined;
  }

  const inv = loadNamSpecialInventory();
  const subjectCycles = Math.max(
    1,
    updatedStore[subjectId]?.completedCycles || 1,
  );
  const totalCups = getTotalGoldenCups(updatedStore);

  const isHardFoodMilestone =
    subjectCycles >= 2 || (totalCups >= 2 && totalCups % 2 === 0);

  let chosen: NamSpecialStickerItem;

  if (isHardFoodMilestone) {
    const foodPool = NAM_SPECIAL_STICKERS.filter((s) => s.tier === "food");
    const unownedFood = foodPool.filter((s) => (inv[s.id] || 0) === 0);
    const pool = unownedFood.length > 0 ? unownedFood : foodPool;
    const iceCream = unownedFood.find((s) => s.id === "nam-eat-icecream");
    chosen =
      iceCream ||
      pool[(totalCups + subjectCycles) % pool.length] ||
      foodPool[0];
  } else {
    const studyPool = NAM_SPECIAL_STICKERS.filter((s) => s.tier === "study");
    const preferredId = SUBJECT_PREFERRED_STUDY_STICKER[subjectId];
    const preferredSticker = studyPool.find((s) => s.id === preferredId);
    if (preferredSticker && (inv[preferredSticker.id] || 0) === 0) {
      chosen = preferredSticker;
    } else {
      const unownedAllStudy = studyPool.filter((s) => (inv[s.id] || 0) === 0);
      const pool = unownedAllStudy.length > 0 ? unownedAllStudy : studyPool;
      chosen = pool[totalCups % pool.length] || studyPool[0];
    }
  }

  const nextCount = (inv[chosen.id] || 0) + 1;
  const nextInv: NamSpecialInventory = {
    ...inv,
    [chosen.id]: nextCount,
  };
  saveNamSpecialInventory(nextInv);

  return {
    sticker: chosen,
    newCount: nextCount,
    isHardFoodReward: isHardFoodMilestone,
    inventory: nextInv,
  };
}

/**
 * Khi bé hoàn thành đủ 3/3 Nhiệm Vụ Ngày và mở Rương Kho Báu:
 * Tặng thêm +1 Sticker Bé Nấm xịn nhất vào Kho Sticker Nấm!
 */
export function awardNamStickerOnDailyQuest(
  roundNumber = 1,
): AwardedNamCupStickerResult {
  const inv = loadNamSpecialInventory();
  const candidates = NAM_SPECIAL_STICKERS.filter((s) => s.tier !== "stage");
  const unowned = candidates.filter((s) => (inv[s.id] || 0) === 0);
  const pool = unowned.length > 0 ? unowned : candidates;
  const chosen = pool[roundNumber % pool.length] || candidates[0];

  const nextCount = (inv[chosen.id] || 0) + 1;
  const nextInv: NamSpecialInventory = {
    ...inv,
    [chosen.id]: nextCount,
  };
  saveNamSpecialInventory(nextInv);

  return {
    sticker: chosen,
    newCount: nextCount,
    isHardFoodReward: chosen.tier === "food",
    inventory: nextInv,
  };
}

export interface PlacedSticker {
  uid: string;
  stickerId: string;
  name: string;
  image: string;
  x: number; // % 8..92
  y: number; // % 14..86
  scale: number; // 0.65 .. 1.85
  rotation: number; // deg
  flipX: boolean;
}

export type BookPagesStore = Record<string, PlacedSticker[]>;

const STICKER_BOOK_STORAGE_KEY = "nam-hoc-vui.sticker-book-pages.v1";

const DEFAULT_NAM_STAGE_STICKERS: PlacedSticker[] = [
  {
    uid: "stk-nam-stage-center",
    stickerId: "nam-stage-star",
    name: "Ca Sĩ Nấm Concert 3D",
    image: "/assets/nam-stickers/nam-stage-star.png?v=3dclay",
    x: 50,
    y: 58,
    scale: 1.42,
    rotation: 0,
    flipX: false,
  },
];

function normalizePlacedList(
  list: unknown,
  fallback: PlacedSticker[],
  dedupeStageStar = false,
): PlacedSticker[] {
  if (!Array.isArray(list)) return fallback;
  let seenStageStar = false;
  const out: PlacedSticker[] = [];
  for (const item of list as PlacedSticker[]) {
    if (!item) continue;
    if (item.stickerId === "nam-stage-star") {
      if (dedupeStageStar && seenStageStar) continue;
      seenStageStar = true;
      out.push({
        ...item,
        name: "Ca Sĩ Nấm Concert 3D",
        image: "/assets/nam-stickers/nam-stage-star.png?v=3dclay",
        scale: Math.max(item.scale || 1.42, 1.38),
      });
    } else {
      out.push(item);
    }
  }
  return out;
}

export function loadBookPages(): BookPagesStore {
  const defaultPages: BookPagesStore = {
    "nam-stage": DEFAULT_NAM_STAGE_STICKERS,
    supermarket: [],
    fruits: [],
    parking: [],
    park: [],
    party: [],
    beach: [],
    forest: [],
  };
  try {
    const raw = window.localStorage.getItem(STICKER_BOOK_STORAGE_KEY);
    if (!raw) return defaultPages;
    const parsed = JSON.parse(raw);
    return {
      "nam-stage": normalizePlacedList(
        parsed?.["nam-stage"],
        DEFAULT_NAM_STAGE_STICKERS,
        true,
      ),
      supermarket: normalizePlacedList(parsed?.supermarket, []),
      fruits: normalizePlacedList(parsed?.fruits, []),
      parking: normalizePlacedList(parsed?.parking, []),
      park: normalizePlacedList(parsed?.park, []),
      party: normalizePlacedList(parsed?.party, []),
      beach: normalizePlacedList(parsed?.beach, []),
      forest: normalizePlacedList(parsed?.forest, []),
    };
  } catch {
    return defaultPages;
  }
}

export function saveBookPages(store: BookPagesStore): void {
  try {
    window.localStorage.setItem(
      STICKER_BOOK_STORAGE_KEY,
      JSON.stringify(store),
    );
  } catch {
    // ignore storage errors
  }
}

export function getPlacedStickerCountMap(
  pages?: BookPagesStore,
): Record<string, number> {
  const store = pages || loadBookPages();
  const counts: Record<string, number> = {};
  for (const list of Object.values(store)) {
    if (Array.isArray(list)) {
      for (const item of list) {
        if (item?.stickerId) {
          counts[item.stickerId] = (counts[item.stickerId] || 0) + 1;
        }
      }
    }
  }
  return counts;
}



