import type { SubjectId } from "../types";
import {
  type CharacterStickerItem,
  type StickerCollectionStore,
} from "./rewardStickers";
import {
  KAWAII_PASTRY_CATALOG,
  type KawaiiPastryAsset,
} from "./mathLessons";

export interface DailyQuestItem {
  subjectId: SubjectId;
  shortTitle: string;
  fullLabel: string;
  icon: string;
  done: boolean;
}

export interface DailyQuestState {
  dateKey: string; // YYYY-MM-DD
  round: number;
  quests: DailyQuestItem[];
  chestClaimed: boolean;
  totalChestsOpened: number;
}

/**
 * Kho Sticker Đồ Vật Nhiệm Vụ Ngày (itemId -> tổng số lượng đã mở được x1, x2...)
 * Khác biệt hoàn toàn với Sticker Nhân Vật Sanrio của bài học thông thường.
 */
export type QuestItemInventory = Record<string, number>;

const DAILY_QUEST_STORAGE_KEY = "nam-hoc-vui.daily-quests.v1";
const QUEST_ITEM_INVENTORY_KEY = "nam-hoc-vui.quest-item-stickers.v1";

export const STARTER_QUEST_ITEMS: QuestItemInventory = {
  "fruit-strawberry": 1,
  "fruit-apple": 1,
  "sweet-cupcake": 1,
  "sweet-donut": 1,
  "vehicle-redcar": 1,
  "vehicle-yellowbus": 1,
  "school-backpack": 1,
  "home-teacup": 1,
  "ls-strawberry-cake": 1,
  "ls-fried-egg-pan": 1,
};

export function loadQuestItemInventory(): QuestItemInventory {
  try {
    const raw = window.localStorage.getItem(QUEST_ITEM_INVENTORY_KEY);
    if (!raw) {
      saveQuestItemInventory(STARTER_QUEST_ITEMS);
      return { ...STARTER_QUEST_ITEMS };
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return { ...STARTER_QUEST_ITEMS };
    }
    const result: QuestItemInventory = {};
    for (const [k, v] of Object.entries(parsed)) {
      if (typeof v === "number" && v > 0) {
        result[k] = Math.floor(v);
      }
    }
    return Object.keys(result).length > 0 ? result : { ...STARTER_QUEST_ITEMS };
  } catch {
    return { ...STARTER_QUEST_ITEMS };
  }
}

export function saveQuestItemInventory(inv: QuestItemInventory): void {
  try {
    window.localStorage.setItem(QUEST_ITEM_INVENTORY_KEY, JSON.stringify(inv));
  } catch {
    // ignore storage errors
  }
}

export function getUnlockedQuestItemTypesCount(inv: QuestItemInventory): number {
  return KAWAII_PASTRY_CATALOG.filter((item) => (inv[item.id] || 0) > 0).length;
}

const QUEST_META: Record<
  SubjectId,
  { shortTitle: string; fullLabel: string; icon: string }
> = {
  reading: {
    shortTitle: "Học Đọc",
    fullLabel: "1 bài Học Đọc Thơ",
    icon: "📖",
  },
  math: {
    shortTitle: "Học Toán",
    fullLabel: "1 bài Đếm & Tính Toán",
    icon: "🧮",
  },
  music: {
    shortTitle: "Học Hát",
    fullLabel: "1 bài Hát / Đàn",
    icon: "🎹",
  },
  english: {
    shortTitle: "Tiếng Anh",
    fullLabel: "1 bài Tiếng Anh",
    icon: "🔤",
  },
  storybook: {
    shortTitle: "Đọc Truyện",
    fullLabel: "1 truyện Cổ Tích",
    icon: "📚",
  },
  coloring: {
    shortTitle: "Tô Màu",
    fullLabel: "1 bức Tô Màu",
    icon: "🎨",
  },
  minigame: {
    shortTitle: "Thể Dục",
    fullLabel: "1 trò Vận Động Thể Dục",
    icon: "⚽",
  },
  lifeskills: {
    shortTitle: "Kỹ Năng",
    fullLabel: "1 bài Đầu Bếp Nhí & Tự Lập",
    icon: "🍳",
  },
};

const QUEST_TRIOS: [SubjectId, SubjectId, SubjectId][] = [
  ["reading", "math", "lifeskills"],
  ["english", "math", "coloring"],
  ["reading", "storybook", "minigame"],
  ["math", "music", "lifeskills"],
  ["reading", "coloring", "music"],
  ["english", "storybook", "lifeskills"],
];

export function getTodayDateKey(): string {
  const now = new Date();
  const y = new Date().getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function buildQuestsForRound(
  dateKey: string,
  round: number,
): DailyQuestItem[] {
  const seed =
    dateKey
      .split("")
      .reduce((acc, ch) => acc + ch.charCodeAt(0), 0) +
    round * 7;
  const trio = QUEST_TRIOS[seed % QUEST_TRIOS.length];
  return trio.map((sid) => ({
    subjectId: sid,
    shortTitle: QUEST_META[sid].shortTitle,
    fullLabel: QUEST_META[sid].fullLabel,
    icon: QUEST_META[sid].icon,
    done: false,
  }));
}

export function loadDailyQuestState(): DailyQuestState {
  const today = getTodayDateKey();
  try {
    const raw = window.localStorage.getItem(DAILY_QUEST_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as DailyQuestState;
      if (
        parsed &&
        parsed.dateKey === today &&
        Array.isArray(parsed.quests) &&
        parsed.quests.length === 3
      ) {
        return parsed;
      }
      const prevTotal =
        typeof parsed?.totalChestsOpened === "number"
          ? parsed.totalChestsOpened
          : 0;
      const fresh: DailyQuestState = {
        dateKey: today,
        round: 1,
        quests: buildQuestsForRound(today, 1),
        chestClaimed: false,
        totalChestsOpened: prevTotal,
      };
      saveDailyQuestState(fresh);
      return fresh;
    }
  } catch {
    // ignore storage errors
  }

  const initial: DailyQuestState = {
    dateKey: today,
    round: 1,
    quests: buildQuestsForRound(today, 1),
    chestClaimed: false,
    totalChestsOpened: 0,
  };
  saveDailyQuestState(initial);
  return initial;
}

export function saveDailyQuestState(state: DailyQuestState): void {
  try {
    window.localStorage.setItem(DAILY_QUEST_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage errors
  }
}

export interface MarkQuestOutcome {
  updatedQuestState: DailyQuestState;
  wasQuestSubject: boolean;
  justCompletedAllThree: boolean;
}

export function markDailyQuestSubjectDone(
  currentState: DailyQuestState,
  subjectId: SubjectId,
): MarkQuestOutcome {
  const idx = currentState.quests.findIndex(
    (q) => q.subjectId === subjectId && !q.done,
  );
  if (idx === -1) {
    return {
      updatedQuestState: currentState,
      wasQuestSubject: false,
      justCompletedAllThree: false,
    };
  }

  const nextQuests = currentState.quests.map((q, i) =>
    i === idx ? { ...q, done: true } : q,
  );
  const allDone = nextQuests.every((q) => q.done);

  const updatedQuestState: DailyQuestState = {
    ...currentState,
    quests: nextQuests,
  };
  saveDailyQuestState(updatedQuestState);

  return {
    updatedQuestState,
    wasQuestSubject: true,
    justCompletedAllThree: allDone && !currentState.chestClaimed,
  };
}

export function startNewQuestRound(
  currentState: DailyQuestState,
): DailyQuestState {
  const today = getTodayDateKey();
  const nextRound = (currentState.round || 1) + 1;
  const nextState: DailyQuestState = {
    dateKey: today,
    round: nextRound,
    quests: buildQuestsForRound(today, nextRound),
    chestClaimed: false,
    totalChestsOpened: currentState.totalChestsOpened || 0,
  };
  saveDailyQuestState(nextState);
  return nextState;
}

export interface ClaimDailyChestOutcome {
  updatedQuestState: DailyQuestState;
  updatedStickerStore: StickerCollectionStore;
  updatedQuestItemInventory: QuestItemInventory;
  bonusItems: KawaiiPastryAsset[];
  bonusStickers: {
    subjectId: SubjectId;
    sticker: CharacterStickerItem;
  }[];
}

function pickRandomFromGroup(
  items: KawaiiPastryAsset[],
  inv: QuestItemInventory,
): KawaiiPastryAsset {
  const unowned = items.filter((it) => !inv[it.id] || inv[it.id] <= 0);
  const pool = unowned.length > 0 ? unowned : items;
  return pool[Math.floor(Math.random() * pool.length)] || items[0];
}

/**
 * Mở Rương Kho Báu Ngày Mới (sau khi hoàn thành 3 Nhiệm Vụ Ngày):
 * Tặng 4 Sticker Đồ Vật 3D Kawaii (1 Hoa quả + 1 Bánh/Đồ uống siêu thị + 1 Xe cộ + 1 Đồ học tập/Gia đình)
 * vào Kho Đồ Vật Nhiệm Vụ để bé dán lên Kệ Siêu Thị, Thùng Hoa Quả, Bãi Đỗ Xe!
 */
export function claimDailyTreasureChest(
  currentQuestState: DailyQuestState,
  currentStickerStore: StickerCollectionStore,
  currentItemInventory?: QuestItemInventory,
): ClaimDailyChestOutcome {
  const baseInv = currentItemInventory
    ? { ...currentItemInventory }
    : loadQuestItemInventory();

  const fruits = KAWAII_PASTRY_CATALOG.filter((i) => i.themeGroup === "fruits");
  const sweets = KAWAII_PASTRY_CATALOG.filter((i) => i.themeGroup === "sweets");
  const vehicles = KAWAII_PASTRY_CATALOG.filter(
    (i) => i.themeGroup === "vehicles",
  );
  const schoolHomeAndKitchen = KAWAII_PASTRY_CATALOG.filter(
    (i) =>
      i.themeGroup === "school" ||
      i.themeGroup === "home" ||
      i.themeGroup === "lifeskills",
  );

  const bonusItems: KawaiiPastryAsset[] = [
    pickRandomFromGroup(fruits, baseInv),
    pickRandomFromGroup(sweets, baseInv),
    pickRandomFromGroup(vehicles, baseInv),
    pickRandomFromGroup(schoolHomeAndKitchen, baseInv),
  ].filter(Boolean);

  for (const item of bonusItems) {
    baseInv[item.id] = (baseInv[item.id] || 0) + 1;
  }
  saveQuestItemInventory(baseInv);

  const updatedQuestState: DailyQuestState = {
    ...currentQuestState,
    chestClaimed: true,
    totalChestsOpened: (currentQuestState.totalChestsOpened || 0) + 1,
  };
  saveDailyQuestState(updatedQuestState);

  return {
    updatedQuestState,
    updatedStickerStore: currentStickerStore,
    updatedQuestItemInventory: baseInv,
    bonusItems,
    bonusStickers: [],
  };
}
