import {
  KAWAII_PASTRY_CATALOG,
  type KawaiiPastryAsset,
  type MathItemTheme,
} from "../data/mathLessons.ts";

export type MemoryDifficultyLevel = 1 | 2 | 3;

export interface MemoryLevelConfig {
  level: MemoryDifficultyLevel;
  label: string;
  shortLabel: string;
  pairCount: number;
  cols: number;
  rows: number;
  peekMs: number;
}

export const MEMORY_LEVEL_CONFIGS: Record<
  MemoryDifficultyLevel,
  MemoryLevelConfig
> = {
  1: {
    level: 1,
    label: "Mức 1: Khởi Động (4 cặp - 8 thẻ)",
    shortLabel: "🌱 4 Cặp (8 thẻ)",
    pairCount: 4,
    cols: 4,
    rows: 2,
    peekMs: 2200,
  },
  2: {
    level: 2,
    label: "Mức 2: Tinh Mắt (6 cặp - 12 thẻ)",
    shortLabel: "⭐ 6 Cặp (12 thẻ)",
    pairCount: 6,
    cols: 4,
    rows: 3,
    peekMs: 2600,
  },
  3: {
    level: 3,
    label: "Mức 3: Siêu Trí Nhớ (8 cặp - 16 thẻ)",
    shortLabel: "👑 8 Cặp (16 thẻ)",
    pairCount: 8,
    cols: 4,
    rows: 4,
    peekMs: 3000,
  },
};

export interface MemoryCard {
  uid: string;
  itemId: string;
  name: string;
  englishName: string;
  icon: string;
  categoryLabel: string;
  imageUrl: string;
  themeGroup: Exclude<MathItemTheme, "all">;
}

/**
 * Kho 99 icon Đồ Vật 3D thật có hình khối & màu sắc tương phản cao
 * (Loại bỏ bộ 16 bánh thỏ Sanrio có hình dáng na ná nhau để bé phân biệt dễ dàng trong 1 giây)
 */
export const MEMORY_OBJECT_POOL: KawaiiPastryAsset[] =
  KAWAII_PASTRY_CATALOG.filter((item) => !item.id.includes("-bunny") && !item.imageUrl.includes("pastries16"));

let recentMemoryItemIds: string[] = [];

function shuffleItems<T>(items: readonly T[], rng: () => number = Math.random): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Chọn `pairCount` đồ vật khác nhau và nhân đôi thành `pairCount * 2` thẻ bài đã xáo trộn.
 * - Khi chọn "all", ưu tiên lấy luân phiên (round-robin) từ 5 nhóm (Trái cây, Học tập, Gia đình, Xe cộ, Bánh kem)
 *   để các cặp trên bàn có màu sắc và hình khối khác biệt tối đa.
 * - Tránh lặp lại các đồ vật vừa xuất hiện ở ván liền trước.
 */
export function generateMemoryDeck(
  level: MemoryDifficultyLevel = 2,
  theme: MathItemTheme = "all",
  rng: () => number = Math.random,
): MemoryCard[] {
  const config = MEMORY_LEVEL_CONFIGS[level];
  const pairCount = config.pairCount;

  const basePool =
    theme === "all"
      ? MEMORY_OBJECT_POOL
      : MEMORY_OBJECT_POOL.filter((item) => item.themeGroup === theme);

  const freshPool = basePool.filter((item) => !recentMemoryItemIds.includes(item.id));
  const effectivePool = freshPool.length >= pairCount ? freshPool : basePool;

  const chosenItems: KawaiiPastryAsset[] = [];

  if (theme === "all") {
    const groups: Array<Exclude<MathItemTheme, "all">> = shuffleItems(
      ["fruits", "school", "home", "vehicles", "sweets", "lifeskills"],
      rng,
    );
    const buckets = new Map<Exclude<MathItemTheme, "all">, KawaiiPastryAsset[]>();
    for (const g of groups) {
      buckets.set(
        g,
        shuffleItems(
          effectivePool.filter((item) => item.themeGroup === g),
          rng,
        ),
      );
    }

    let round = 0;
    while (chosenItems.length < pairCount && round < 10) {
      for (const g of groups) {
        if (chosenItems.length >= pairCount) break;
        const list = buckets.get(g) ?? [];
        const candidate = list[round];
        if (candidate && !chosenItems.some((c) => c.id === candidate.id)) {
          chosenItems.push(candidate);
        }
      }
      round++;
    }
  }

  if (chosenItems.length < pairCount) {
    const remaining = shuffleItems(
      effectivePool.filter((item) => !chosenItems.some((c) => c.id === item.id)),
      rng,
    );
    chosenItems.push(...remaining.slice(0, pairCount - chosenItems.length));
  }

  // Lưu lịch sử để ván kế tiếp không trùng đồ vật vừa chơi
  recentMemoryItemIds = [
    ...chosenItems.map((item) => item.id),
    ...recentMemoryItemIds,
  ].slice(0, 16);

  const rawCards: MemoryCard[] = [];
  for (const item of chosenItems) {
    const base = {
      itemId: item.id,
      name: item.name,
      englishName: item.englishName || item.name,
      icon: item.icon,
      categoryLabel: item.categoryLabel,
      imageUrl: item.imageUrl,
      themeGroup: (item.themeGroup || "fruits") as Exclude<MathItemTheme, "all">,
    };
    rawCards.push({ ...base, uid: `${item.id}-a` });
    rawCards.push({ ...base, uid: `${item.id}-b` });
  }

  // Xáo trộn vị trí thẻ và hạn chế 2 thẻ giống hệt nhau nằm sát cạnh nhau
  let shuffled = shuffleItems(rawCards, rng);
  for (let attempt = 0; attempt < 4; attempt++) {
    let hasAdjacentSame = false;
    for (let i = 0; i < shuffled.length - 1; i++) {
      if (shuffled[i].itemId === shuffled[i + 1].itemId) {
        hasAdjacentSame = true;
        break;
      }
    }
    if (!hasAdjacentSame) break;
    shuffled = shuffleItems(rawCards, rng);
  }

  return shuffled;
}
