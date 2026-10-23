import {
  SHARED_ASSET_CATALOG,
  getSharedAssetById,
  getSharedAssetByImage,
  querySharedAssets,
  type AssetCategoryType,
  type AssetPrimaryColor,
  type AssetSoundEffect,
  type AssetThemeGroup,
  type SharedAssetMetadata,
  type SharedAssetQueryFilter,
} from "./sharedAssetCatalog.ts";

export {
  SHARED_ASSET_CATALOG,
  getSharedAssetById,
  getSharedAssetByImage,
  querySharedAssets,
  type AssetCategoryType,
  type AssetPrimaryColor,
  type AssetSoundEffect,
  type AssetThemeGroup,
  type SharedAssetMetadata,
  type SharedAssetQueryFilter,
};

export type MathDifficultyLevel = 1 | 2 | 3;

export type MathMiniGameId =
  | "melody-bakery"      // Mini-game 1: Tiệm Bánh Ngọt My Melody (Thêm/Bớt bánh trên Khay & Kệ: Đếm + Cộng + Trừ)
  | "pizza-party"        // Mini-game 2: Tiệm Pizza Cinnamoroll (Chia đều vào đĩa ÷ & Đóng hộp nhân ×)
  | "arithmetic-tables"  // Mini-game 3: Bảng Tính & Cửu Chương (+, -, ×, ÷ từ 1 đến 9) kèm mở Hộp Quà
  | "coin-market";       // Mini-game 4: Siêu Thị Xu Vàng (Tính tổng tiền bánh + & Thối tiền thừa -)

export type TableOperation = "add" | "sub" | "mul" | "div";

export type MathItemTheme = "all" | AssetThemeGroup;

export type KawaiiPastryAsset = SharedAssetMetadata;

export const MATH_ITEM_THEMES: Array<{
  id: MathItemTheme;
  label: string;
  icon: string;
  sampleImg: string;
}> = [
  {
    id: "all",
    label: "Tất cả (115 món)",
    icon: "✨",
    sampleImg: "/assets/items/fruits/fruit_01.png",
  },
  {
    id: "fruits",
    label: "Trái cây (15)",
    icon: "🍓",
    sampleImg: "/assets/items/fruits/fruit_02.png",
  },
  {
    id: "sweets",
    label: "Bánh & Kem (31)",
    icon: "🍰",
    sampleImg: "/assets/items/sweets/sweet_01.png",
  },
  {
    id: "lifeskills",
    label: "Bếp & Món ăn (24)",
    icon: "🍳",
    sampleImg: "/assets/items/lifeskills/lifeskills_07.png",
  },
  {
    id: "school",
    label: "Học tập (15)",
    icon: "🎒",
    sampleImg: "/assets/items/school/school_01.png",
  },
  {
    id: "home",
    label: "Gia đình (15)",
    icon: "🏠",
    sampleImg: "/assets/items/home/home_02.png",
  },
  {
    id: "vehicles",
    label: "Xe cộ (15)",
    icon: "🚗",
    sampleImg: "/assets/items/vehicles/vehicle_01.png",
  },
];

export const KAWAII_ITEM_IMAGES = {
  pizzaSlice: "/assets/math/items/pizza-slice.png",
  pizzaWhole: "/assets/math/items/pizza-whole.png",
  pinkPlate: "/assets/math/items/pink-plate.png",
  pizzaBox: "/assets/math/items/pizza-box.png",
  goldCoin: "/assets/math/items/gold-coin.png",
  mysteryGift: "/assets/math/items/mystery-gift.png",
  bakeryBasket: "/assets/math/items/bakery-basket.png",
  cashRegister: "/assets/math/items/cash-register.png",
} as const;

/**
 * Kho 115 vật phẩm 3D Kawaii dùng chung toàn hệ thống (kế thừa trực tiếp từ SHARED_ASSET_CATALOG):
 * Đầy đủ Metadata: Tiếng Việt, Đánh vần, Tiếng Anh, Phiên âm IPA, Icon, Màu sắc, Hoạt động, Âm thanh, Nơi sử dụng.
 */
export const KAWAII_PASTRY_CATALOG: KawaiiPastryAsset[] = SHARED_ASSET_CATALOG;

export function getCatalogByTheme(theme: MathItemTheme = "all"): KawaiiPastryAsset[] {
  if (theme === "all") return KAWAII_PASTRY_CATALOG;
  const filtered = KAWAII_PASTRY_CATALOG.filter((item) => item.themeGroup === theme);
  return filtered.length > 0 ? filtered : KAWAII_PASTRY_CATALOG;
}

export interface MathMiniGameMeta {
  id: MathMiniGameId;
  title: string;
  subtitle: string;
  badge: string;
  cardImage: string;
  heroImage: string;
  secondaryImage: string;
  accentColor: string;
  skillIds: string[];
}

export const MATH_MINI_GAMES: MathMiniGameMeta[] = [
  {
    id: "melody-bakery",
    title: "Tiệm Tạp Hóa Đếm & Tính",
    subtitle: "Đếm số lượng, cộng và trừ",
    badge: "Bài 1",
    cardImage: "/assets/canva/card-math-1.png",
    heroImage: "/assets/canva/thumb-math-1.png",
    secondaryImage: "/assets/items/fruits/fruit_01.png",
    accentColor: "#EC4899",
    skillIds: ["counting-within-12", "addition-subtraction-bakery"],
  },
  {
    id: "pizza-party",
    title: "Bàn Tiệc So Sánh (< > =)",
    subtitle: "So sánh lớn hơn, bé hơn, bằng nhau",
    badge: "Bài 2",
    cardImage: "/assets/canva/card-math-2.png",
    heroImage: "/assets/canva/thumb-math-2.png",
    secondaryImage: KAWAII_ITEM_IMAGES.pizzaWhole,
    accentColor: "#10B981",
    skillIds: ["comparison-operators", "equal-sharing-division"],
  },
  {
    id: "coin-market",
    title: "Siêu Thị Xu Vàng",
    subtitle: "Cộng tiền mua hàng, tính tiền thừa",
    badge: "Bài 3",
    cardImage: "/assets/canva/card-math-3.png",
    heroImage: "/assets/canva/thumb-math-3.png",
    secondaryImage: KAWAII_ITEM_IMAGES.goldCoin,
    accentColor: "#F59E0B",
    skillIds: ["money-addition-subtraction", "word-problems-within-12"],
  },
  {
    id: "arithmetic-tables",
    title: "Bảng Tính & Hộp Quà",
    subtitle: "Bảng cộng, trừ, nhân, chia 1 đến 9",
    badge: "Bài 4",
    cardImage: "/assets/canva/card-math-4.png",
    heroImage: "/assets/canva/thumb-math-4.png",
    secondaryImage: KAWAII_ITEM_IMAGES.mysteryGift,
    accentColor: "#8B5CF6",
    skillIds: ["arithmetic-tables-1-to-9", "mental-math-fluency"],
  },
];

// ============================================================================
// BỘ XÁO TRỘN THÔNG MINH & CHỐNG TRÙNG 2 BÀI GẦN NHẤT (ANTI-REPEAT SHUFFLER)
// ============================================================================
const recentMathTemplates = new Map<string, string[]>();
const recentMathItemIds: string[] = [];

function shuffleMathArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickRandomDistinctItems(count: number): KawaiiPastryAsset[] {
  const freshPool = shuffleMathArray(
    KAWAII_PASTRY_CATALOG.filter((item) => !recentMathItemIds.includes(item.id)),
  );
  const fallbackPool = shuffleMathArray(
    KAWAII_PASTRY_CATALOG.filter((item) => recentMathItemIds.includes(item.id)),
  );
  const combined = [...freshPool, ...fallbackPool];
  const chosen = combined.slice(0, count);

  for (const ch of chosen.slice(0, 6)) {
    recentMathItemIds.unshift(ch.id);
  }
  if (recentMathItemIds.length > 24) {
    recentMathItemIds.length = 24;
  }
  return chosen;
}

function pickNonRepeatingTemplates<T extends { key: string }>(
  historyGroup: string,
  pool: T[],
  count: number,
): T[] {
  const recentKeys = recentMathTemplates.get(historyGroup) || [];
  const fresh = shuffleMathArray(pool.filter((t) => !recentKeys.includes(t.key)));
  const fallback = shuffleMathArray(pool.filter((t) => recentKeys.includes(t.key)));
  const combined = [...fresh, ...fallback];
  const chosen = combined.slice(0, count);

  const updatedHistory = [
    ...chosen.slice(0, 3).map((x) => x.key),
    ...recentKeys,
  ].slice(0, Math.min(8, Math.max(2, pool.length - 3)));
  recentMathTemplates.set(historyGroup, updatedHistory);

  return chosen;
}

// ============================================================================
// 1. THƯ VIỆN BÀI HỌC & BỘ SINH ĐƠN HÀNG «TIỆM TẠP HÓA ĐẾM & TÍNH» (91 MÓN)
// ============================================================================
export interface BakeryOrderRound {
  id: string;
  level: MathDifficultyLevel;
  mode: "single" | "equation" | "dual";
  pastryA: KawaiiPastryAsset;
  initialCountA: number;
  targetCountA: number;
  operator?: "+" | "−";
  missingOperand?: number;
  equationPrompt?: string;
  pastryB?: KawaiiPastryAsset;
  initialCountB?: number;
  targetCountB?: number;
  totalTargetCount?: number;
  orderTitle: string;
}

const BAKERY_L1_LIBRARY = [
  { key: "l1-2-5", init: 2, target: 5, pIdx: 0 },
  { key: "l1-5-3", init: 5, target: 3, pIdx: 16 },
  { key: "l1-3-6", init: 3, target: 6, pIdx: 31 },
  { key: "l1-6-4", init: 6, target: 4, pIdx: 46 },
  { key: "l1-1-5", init: 1, target: 5, pIdx: 61 },
  { key: "l1-4-7", init: 4, target: 7, pIdx: 5 },
  { key: "l1-7-4", init: 7, target: 4, pIdx: 20 },
  { key: "l1-2-6", init: 2, target: 6, pIdx: 35 },
  { key: "l1-8-5", init: 8, target: 5, pIdx: 50 },
  { key: "l1-3-8", init: 3, target: 8, pIdx: 65 },
  { key: "l1-6-2", init: 6, target: 2, pIdx: 10 },
  { key: "l1-5-9", init: 5, target: 9, pIdx: 25 },
  { key: "l1-9-6", init: 9, target: 6, pIdx: 40 },
  { key: "l1-1-4", init: 1, target: 4, pIdx: 55 },
  { key: "l1-7-3", init: 7, target: 3, pIdx: 70 },
  { key: "l1-4-8", init: 4, target: 8, pIdx: 12 },
];

const BAKERY_L2_LIBRARY = [
  { key: "l2-3-5", init: 3, target: 5, pIdx: 1 },
  { key: "l2-10-4", init: 10, target: 4, pIdx: 17 },
  { key: "l2-5-10", init: 5, target: 10, pIdx: 33 },
  { key: "l2-9-3", init: 9, target: 3, pIdx: 48 },
  { key: "l2-4-9", init: 4, target: 9, pIdx: 63 },
  { key: "l2-2-7", init: 2, target: 7, pIdx: 6 },
  { key: "l2-8-3", init: 8, target: 3, pIdx: 22 },
  { key: "l2-6-10", init: 6, target: 10, pIdx: 38 },
  { key: "l2-7-2", init: 7, target: 2, pIdx: 52 },
  { key: "l2-1-6", init: 1, target: 6, pIdx: 68 },
  { key: "l2-9-5", init: 9, target: 5, pIdx: 11 },
  { key: "l2-3-8", init: 3, target: 8, pIdx: 27 },
  { key: "l2-10-7", init: 10, target: 7, pIdx: 42 },
  { key: "l2-4-8", init: 4, target: 8, pIdx: 57 },
  { key: "l2-8-4", init: 8, target: 4, pIdx: 72 },
  { key: "l2-2-9", init: 2, target: 9, pIdx: 14 },
];

const BAKERY_L3_LIBRARY = [
  { key: "l3-4-3", initA: 2, targetA: 4, initB: 5, targetB: 3, pA: 0, pB: 15 },
  { key: "l3-3-5", initA: 5, targetA: 3, initB: 2, targetB: 5, pA: 30, pB: 45 },
  { key: "l3-5-4", initA: 3, targetA: 5, initB: 6, targetB: 4, pA: 60, pB: 2 },
  { key: "l3-6-4", initA: 4, targetA: 6, initB: 6, targetB: 4, pA: 18, pB: 34 },
  { key: "l3-2-4", initA: 4, targetA: 2, initB: 1, targetB: 4, pA: 49, pB: 64 },
  { key: "l3-3-3", initA: 1, targetA: 3, initB: 5, targetB: 3, pA: 7, pB: 23 },
  { key: "l3-5-2", initA: 2, targetA: 5, initB: 4, targetB: 2, pA: 39, pB: 53 },
  { key: "l3-4-5", initA: 6, targetA: 4, initB: 2, targetB: 5, pA: 69, pB: 9 },
  { key: "l3-3-6", initA: 5, targetA: 3, initB: 3, targetB: 6, pA: 26, pB: 41 },
  { key: "l3-5-5", initA: 2, targetA: 5, initB: 3, targetB: 5, pA: 56, pB: 71 },
  { key: "l3-2-6", initA: 4, targetA: 2, initB: 3, targetB: 6, pA: 13, pB: 29 },
  { key: "l3-4-4", initA: 1, targetA: 4, initB: 6, targetB: 4, pA: 44, pB: 59 },
];

export function generateBakeryOrders(
  level: MathDifficultyLevel,
  seedOffset = 0,
  theme: MathItemTheme = "all",
): BakeryOrderRound[] {
  const pool = getCatalogByTheme(theme);
  const useRandomShuffle = seedOffset > 0;
  const randomItems = useRandomShuffle ? pickRandomDistinctItems(14) : [];

  if (level === 1) {
    const templates = useRandomShuffle
      ? pickNonRepeatingTemplates("bakery-l1", BAKERY_L1_LIBRARY, 6)
      : BAKERY_L1_LIBRARY.slice(0, 5);
    return templates.map((t, i) => {
      const pastry = useRandomShuffle
        ? randomItems[i % randomItems.length]
        : pool[(t.pIdx + i) % pool.length];
      const isAdd = t.target >= t.init;
      const opSymbol = isAdd ? "+" : "−";
      const diff = Math.abs(t.target - t.init);
      return {
        id: `bk-l1-${seedOffset}-${t.key}-${i}`,
        level: 1,
        mode: "single",
        pastryA: pastry,
        initialCountA: t.init,
        targetCountA: t.target,
        operator: opSymbol,
        missingOperand: diff,
        equationPrompt: `${t.init} ${opSymbol} ${diff} = ?`,
        orderTitle: `Tính kết quả phép tính: ${t.init} ${opSymbol} ${diff} = ?`,
      };
    });
  }

  if (level === 2) {
    const templates = useRandomShuffle
      ? pickNonRepeatingTemplates("bakery-l2", BAKERY_L2_LIBRARY, 6)
      : BAKERY_L2_LIBRARY.slice(0, 5);
    return templates.map((t, i) => {
      const pastry = useRandomShuffle
        ? randomItems[i % randomItems.length]
        : pool[(t.pIdx + i) % pool.length];
      const isAdd = t.target >= t.init;
      const opSymbol = isAdd ? "+" : "−";
      const diff = Math.abs(t.target - t.init);
      return {
        id: `bk-l2-${seedOffset}-${t.key}-${i}`,
        level: 2,
        mode: "equation",
        pastryA: pastry,
        initialCountA: t.init,
        targetCountA: t.target,
        operator: opSymbol,
        missingOperand: diff,
        equationPrompt: `${t.init} ${opSymbol} ? = ${t.target}`,
        orderTitle: `Điền số còn thiếu: ${t.init} ${opSymbol} ? = ${t.target}`,
      };
    });
  }

  const dualTemplates = useRandomShuffle
    ? pickNonRepeatingTemplates("bakery-l3", BAKERY_L3_LIBRARY, 6)
    : BAKERY_L3_LIBRARY.slice(0, 5);
  return dualTemplates.map((t, i) => {
    const pastryA = useRandomShuffle
      ? randomItems[(i * 2) % randomItems.length]
      : pool[(t.pA + i) % pool.length];
    let pastryB = useRandomShuffle
      ? randomItems[(i * 2 + 1) % randomItems.length]
      : pool[(t.pB + i + 3) % pool.length];
    if (pastryB.id === pastryA.id) {
      pastryB =
        pool.find((item) => item.id !== pastryA.id) ||
        KAWAII_PASTRY_CATALOG.find((item) => item.id !== pastryA.id) ||
        pastryB;
    }
    const totalTarget = t.targetA + t.targetB;
    return {
      id: `bk-l3-${seedOffset}-${t.key}-${i}`,
      level: 3,
      mode: "dual",
      pastryA,
      initialCountA: 0,
      targetCountA: t.targetA,
      operator: "+",
      pastryB,
      initialCountB: 0,
      targetCountB: t.targetB,
      totalTargetCount: totalTarget,
      equationPrompt: `? + ? = ${totalTarget}`,
      orderTitle: `Gộp 2 món bất kỳ sao cho: ? + ? = ${totalTarget}`,
    };
  });
}

// ============================================================================
// 2. THƯ VIỆN BÀI HỌC «BÀN TIỆC SO SÁNH (<, >, =) & CÂN BẰNG ĐĨA» (91 MÓN KAWAII + PIZZA)
// - Cấp 1 (choose-sign):        Đếm 2 đĩa a [?] b -> Chọn dấu <, =, >
// - Cấp 2 (balance-plate):      Cho sẵn dấu <, =, > ở giữa -> Thêm/Bớt đồ ở Đĩa Phải cho đúng dấu
// - Cấp 3 (expression-compare): So sánh phép tính với số: x ± y [?] z -> Chọn dấu <, =, >
// ============================================================================
export type ComparisonSign = "<" | "=" | ">";

export interface PizzaRound {
  id: string;
  level: MathDifficultyLevel;
  mode: "divide" | "multiply";
  comparisonMode: "choose-sign" | "balance-plate" | "expression-compare";
  leftCount: number;
  rightCount: number;
  initialRightCount: number;
  expectedSign: ComparisonSign;
  leftExprParts?: {
    a: number;
    op: "+" | "−";
    b: number;
    label: string;
  };
  totalSlices: number;
  containerCount: number;
  slicesPerContainer: number;
  itemName?: string;
  itemImageUrl?: string;
  rightItemName?: string;
  rightItemImageUrl?: string;
  prompt: string;
  formulaText: string;
}

const COMPARISON_ITEMS_POOL: Array<{ name: string; imageUrl: string }> = [
  { name: "miếng Pizza", imageUrl: KAWAII_ITEM_IMAGES.pizzaSlice },
  ...KAWAII_PASTRY_CATALOG.map((item) => ({
    name: item.name,
    imageUrl: item.imageUrl,
  })),
];

function signToSpokenWord(sign: ComparisonSign): string {
  if (sign === ">") return "lớn hơn";
  if (sign === "<") return "bé hơn";
  return "bằng";
}

export const PIZZA_ROUNDS_BY_LEVEL: Record<MathDifficultyLevel, PizzaRound[]> = {
  1: [
    {
      id: "pz-1-1",
      level: 1,
      mode: "divide",
      comparisonMode: "choose-sign",
      leftCount: 5,
      rightCount: 3,
      initialRightCount: 3,
      expectedSign: ">",
      totalSlices: 4,
      containerCount: 2,
      slicesPerContainer: 2,
      itemName: "miếng Pizza",
      itemImageUrl: KAWAII_ITEM_IMAGES.pizzaSlice,
      rightItemName: "Bánh Donut Cốm Hồng",
      rightItemImageUrl: "/assets/items/sweets/sweet_02.png",
      prompt: "Đĩa Trái có 5 miếng Pizza, Đĩa Phải có 3 Bánh Donut. Nấm chọn dấu <, = hay > điền vào giữa nhé!",
      formulaText: "5 > 3 (5 lớn hơn 3)",
    },
    {
      id: "pz-1-2",
      level: 1,
      mode: "divide",
      comparisonMode: "choose-sign",
      leftCount: 2,
      rightCount: 6,
      initialRightCount: 6,
      expectedSign: "<",
      totalSlices: 6,
      containerCount: 2,
      slicesPerContainer: 3,
      itemName: "Quả Dâu Tây Đỏ",
      itemImageUrl: "/assets/items/fruits/fruit_01.png",
      rightItemName: "Quả Táo Đỏ",
      rightItemImageUrl: "/assets/items/fruits/fruit_02.png",
      prompt: "Đĩa Trái có 2 Quả Dâu Tây, Đĩa Phải có 6 Quả Táo Đỏ. Đĩa Trái như thế nào so với Đĩa Phải?",
      formulaText: "2 < 6 (2 bé hơn 6)",
    },
    {
      id: "pz-1-3",
      level: 1,
      mode: "divide",
      comparisonMode: "choose-sign",
      leftCount: 4,
      rightCount: 4,
      initialRightCount: 4,
      expectedSign: "=",
      totalSlices: 8,
      containerCount: 2,
      slicesPerContainer: 4,
      itemName: "Bánh Cupcake Cherry",
      itemImageUrl: "/assets/items/sweets/sweet_01.png",
      rightItemName: "Bánh Macaron Kem Hồng",
      rightItemImageUrl: "/assets/items/sweets/sweet_06.png",
      prompt: "Đĩa Trái có 4 Bánh Cupcake, Đĩa Phải cũng có 4 Bánh Macaron. Nấm chọn dấu nào nhỉ?",
      formulaText: "4 = 4 (4 bằng 4)",
    },
    {
      id: "pz-1-4",
      level: 1,
      mode: "divide",
      comparisonMode: "choose-sign",
      leftCount: 7,
      rightCount: 4,
      initialRightCount: 4,
      expectedSign: ">",
      totalSlices: 10,
      containerCount: 2,
      slicesPerContainer: 5,
      itemName: "Quả Cam Tươi",
      itemImageUrl: "/assets/items/fruits/fruit_04.png",
      rightItemName: "Quả Đào Hồng",
      rightItemImageUrl: "/assets/items/fruits/fruit_08.png",
      prompt: "Đĩa Trái có 7 Quả Cam, Đĩa Phải có 4 Quả Đào. Bên nào nhiều hơn nhỉ?",
      formulaText: "7 > 4 (7 lớn hơn 4)",
    },
    {
      id: "pz-1-5",
      level: 1,
      mode: "divide",
      comparisonMode: "choose-sign",
      leftCount: 3,
      rightCount: 5,
      initialRightCount: 5,
      expectedSign: "<",
      totalSlices: 6,
      containerCount: 3,
      slicesPerContainer: 2,
      itemName: "Kem Ốc Quế Hai Tầng",
      itemImageUrl: "/assets/items/sweets/sweet_09.png",
      rightItemName: "Kẹo Mút Xoáy Nơ Hồng",
      rightItemImageUrl: "/assets/items/sweets/sweet_03.png",
      prompt: "Đĩa Trái có 3 cây Kem, Đĩa Phải có 5 cây Kẹo Mút. Nấm điền dấu <, = hay > nhé!",
      formulaText: "3 < 5 (3 bé hơn 5)",
    },
    {
      id: "pz-1-6",
      level: 1,
      mode: "divide",
      comparisonMode: "choose-sign",
      leftCount: 6,
      rightCount: 6,
      initialRightCount: 6,
      expectedSign: "=",
      totalSlices: 9,
      containerCount: 3,
      slicesPerContainer: 3,
      itemName: "miếng Pizza",
      itemImageUrl: KAWAII_ITEM_IMAGES.pizzaSlice,
      rightItemName: "miếng Pizza",
      rightItemImageUrl: KAWAII_ITEM_IMAGES.pizzaSlice,
      prompt: "Hai đĩa đều có 6 miếng Pizza thơm lừng! Nấm chọn dấu nào?",
      formulaText: "6 = 6 (6 bằng 6)",
    },
  ],
  2: [
    {
      id: "pz-2-1",
      level: 2,
      mode: "divide",
      comparisonMode: "balance-plate",
      leftCount: 4,
      rightCount: 4,
      initialRightCount: 2,
      expectedSign: "=",
      totalSlices: 6,
      containerCount: 3,
      slicesPerContainer: 2,
      itemName: "miếng Pizza",
      itemImageUrl: KAWAII_ITEM_IMAGES.pizzaSlice,
      rightItemName: "miếng Pizza",
      rightItemImageUrl: KAWAII_ITEM_IMAGES.pizzaSlice,
      prompt: "Ở giữa là dấu BẰNG (=). Đĩa Trái có 4 miếng Pizza, Nấm thêm vào Đĩa Phải để hai đĩa BẰNG NHAU (4 = 4) nhé!",
      formulaText: "4 = 4 (Hai đĩa đều có 4)",
    },
    {
      id: "pz-2-2",
      level: 2,
      mode: "divide",
      comparisonMode: "balance-plate",
      leftCount: 3,
      rightCount: 5,
      initialRightCount: 2,
      expectedSign: "<",
      totalSlices: 9,
      containerCount: 3,
      slicesPerContainer: 3,
      itemName: "Quả Dâu Tây Đỏ",
      itemImageUrl: "/assets/items/fruits/fruit_01.png",
      rightItemName: "Bánh Cupcake Cherry",
      rightItemImageUrl: "/assets/items/sweets/sweet_01.png",
      prompt: "Ở giữa là dấu BÉ HƠN (<). Đĩa Trái có 3 món, Nấm thêm vào Đĩa Phải sao cho NHIỀU HƠN 3 món (3 < ?) nhé!",
      formulaText: "3 < 4 (hoặc 3 < 5, Đĩa Phải nhiều hơn 3)",
    },
    {
      id: "pz-2-3",
      level: 2,
      mode: "divide",
      comparisonMode: "balance-plate",
      leftCount: 5,
      rightCount: 3,
      initialRightCount: 5,
      expectedSign: ">",
      totalSlices: 8,
      containerCount: 4,
      slicesPerContainer: 2,
      itemName: "Bánh Donut Cốm Hồng",
      itemImageUrl: "/assets/items/sweets/sweet_02.png",
      rightItemName: "Quả Táo Đỏ",
      rightItemImageUrl: "/assets/items/fruits/fruit_02.png",
      prompt: "Ở giữa là dấu LỚN HƠN (>). Đĩa Trái có 5 món, Nấm bớt ở Đĩa Phải để ÍT HƠN 5 món (5 > ?) nhé!",
      formulaText: "5 > 3 (Đĩa Phải ít hơn 5)",
    },
    {
      id: "pz-2-4",
      level: 2,
      mode: "divide",
      comparisonMode: "balance-plate",
      leftCount: 5,
      rightCount: 5,
      initialRightCount: 3,
      expectedSign: "=",
      totalSlices: 12,
      containerCount: 3,
      slicesPerContainer: 4,
      itemName: "Quả Đào Hồng",
      itemImageUrl: "/assets/items/fruits/fruit_08.png",
      rightItemName: "Quả Đào Hồng",
      rightItemImageUrl: "/assets/items/fruits/fruit_08.png",
      prompt: "Ở giữa là dấu BẰNG (=). Đĩa Trái có 5 Quả Đào, Nấm thêm vào Đĩa Phải cho bằng 5 (5 = 5) nhé!",
      formulaText: "5 = 5 (Hai đĩa bằng nhau)",
    },
    {
      id: "pz-2-5",
      level: 2,
      mode: "divide",
      comparisonMode: "balance-plate",
      leftCount: 4,
      rightCount: 6,
      initialRightCount: 3,
      expectedSign: "<",
      totalSlices: 12,
      containerCount: 4,
      slicesPerContainer: 3,
      itemName: "Ô Tô Đỏ Nhỏ Xinh",
      itemImageUrl: "/assets/items/vehicles/vehicle_01.png",
      rightItemName: "Máy Bay Trắng Xanh",
      rightItemImageUrl: "/assets/items/vehicles/vehicle_06.png",
      prompt: "Ở giữa là dấu BÉ HƠN (<). Đĩa Trái có 4 chiếc xe, Nấm thêm vào Đĩa Phải để nhiều hơn 4 chiếc (4 < ?) nhé!",
      formulaText: "4 < 5 (Đĩa Phải nhiều hơn 4)",
    },
    {
      id: "pz-2-6",
      level: 2,
      mode: "divide",
      comparisonMode: "balance-plate",
      leftCount: 6,
      rightCount: 4,
      initialRightCount: 6,
      expectedSign: ">",
      totalSlices: 10,
      containerCount: 2,
      slicesPerContainer: 5,
      itemName: "Cặp Sách Hồng Hoa Cúc",
      itemImageUrl: "/assets/items/school/school_01.png",
      rightItemName: "Hộp Bút Sáp Cầu Vồng",
      rightItemImageUrl: "/assets/items/school/school_08.png",
      prompt: "Ở giữa là dấu LỚN HƠN (>). Đĩa Trái có 6 món, Nấm bớt ở Đĩa Phải để ít hơn 6 món (6 > ?) nhé!",
      formulaText: "6 > 4 (Đĩa Phải ít hơn 6)",
    },
  ],
  3: [
    {
      id: "pz-3-1",
      level: 3,
      mode: "multiply",
      comparisonMode: "expression-compare",
      leftCount: 5,
      rightCount: 4,
      initialRightCount: 4,
      expectedSign: ">",
      leftExprParts: { a: 2, op: "+", b: 3, label: "2 + 3" },
      totalSlices: 6,
      containerCount: 3,
      slicesPerContainer: 2,
      itemName: "miếng Pizza",
      itemImageUrl: KAWAII_ITEM_IMAGES.pizzaSlice,
      rightItemName: "Bánh Kem Dâu Tây",
      rightItemImageUrl: "/assets/items/sweets/sweet_07.png",
      prompt: "So sánh phép tính: Đĩa Trái có 2 + 3 món, Đĩa Phải có 4 món. Nấm chọn dấu <, = hay > nhé!",
      formulaText: "2 + 3 = 5, mà 5 > 4",
    },
    {
      id: "pz-3-2",
      level: 3,
      mode: "multiply",
      comparisonMode: "expression-compare",
      leftCount: 6,
      rightCount: 6,
      initialRightCount: 6,
      expectedSign: "=",
      leftExprParts: { a: 4, op: "+", b: 2, label: "4 + 2" },
      totalSlices: 8,
      containerCount: 2,
      slicesPerContainer: 4,
      itemName: "Quả Dâu Tây Đỏ",
      itemImageUrl: "/assets/items/fruits/fruit_01.png",
      rightItemName: "Quả Cam Tươi",
      rightItemImageUrl: "/assets/items/fruits/fruit_04.png",
      prompt: "So sánh phép tính: Đĩa Trái có 4 + 2 quả, Đĩa Phải có 6 quả. Nấm điền dấu nào?",
      formulaText: "4 + 2 = 6, vậy 4 + 2 = 6",
    },
    {
      id: "pz-3-3",
      level: 3,
      mode: "multiply",
      comparisonMode: "expression-compare",
      leftCount: 3,
      rightCount: 5,
      initialRightCount: 5,
      expectedSign: "<",
      leftExprParts: { a: 6, op: "−", b: 3, label: "6 − 3" },
      totalSlices: 9,
      containerCount: 3,
      slicesPerContainer: 3,
      itemName: "Bánh Macaron Kem Hồng",
      itemImageUrl: "/assets/items/sweets/sweet_06.png",
      rightItemName: "Ly Trà Sữa Trân Châu",
      rightItemImageUrl: "/assets/items/sweets/sweet_11.png",
      prompt: "So sánh phép tính: Đĩa Trái có 6 − 3 món, Đĩa Phải có 5 món. Nấm chọn dấu <, = hay > nhé!",
      formulaText: "6 − 3 = 3, mà 3 < 5",
    },
    {
      id: "pz-3-4",
      level: 3,
      mode: "multiply",
      comparisonMode: "expression-compare",
      leftCount: 7,
      rightCount: 5,
      initialRightCount: 5,
      expectedSign: ">",
      leftExprParts: { a: 3, op: "+", b: 4, label: "3 + 4" },
      totalSlices: 12,
      containerCount: 4,
      slicesPerContainer: 3,
      itemName: "Tên Lửa Bay Vào Vũ Trụ",
      itemImageUrl: "/assets/items/vehicles/vehicle_10.png",
      rightItemName: "Tàu Ngầm Vàng Thám Hiểm",
      rightItemImageUrl: "/assets/items/vehicles/vehicle_09.png",
      prompt: "So sánh phép tính: Đĩa Trái có 3 + 4 chiếc, Đĩa Phải có 5 chiếc. Bên nào lớn hơn nhỉ?",
      formulaText: "3 + 4 = 7, mà 7 > 5",
    },
    {
      id: "pz-3-5",
      level: 3,
      mode: "multiply",
      comparisonMode: "expression-compare",
      leftCount: 4,
      rightCount: 4,
      initialRightCount: 4,
      expectedSign: "=",
      leftExprParts: { a: 7, op: "−", b: 3, label: "7 − 3" },
      totalSlices: 8,
      containerCount: 4,
      slicesPerContainer: 2,
      itemName: "Bút Chì Vàng Chăm Chỉ",
      itemImageUrl: "/assets/items/school/school_04.png",
      rightItemName: "Quyển Sổ Lò Xo Tím",
      rightItemImageUrl: "/assets/items/school/school_02.png",
      prompt: "So sánh phép tính: Đĩa Trái có 7 − 3 món, Đĩa Phải có 4 món. Nấm chọn dấu nào?",
      formulaText: "7 − 3 = 4, vậy 7 − 3 = 4",
    },
    {
      id: "pz-3-6",
      level: 3,
      mode: "multiply",
      comparisonMode: "expression-compare",
      leftCount: 5,
      rightCount: 7,
      initialRightCount: 7,
      expectedSign: "<",
      leftExprParts: { a: 2, op: "+", b: 3, label: "2 + 3" },
      totalSlices: 10,
      containerCount: 2,
      slicesPerContainer: 5,
      itemName: "Tách Trà Hồng Chấm Bi",
      itemImageUrl: "/assets/items/home/home_02.png",
      rightItemName: "Đồng Hồ Báo Thức Hồng",
      rightItemImageUrl: "/assets/items/home/home_05.png",
      prompt: "So sánh phép tính: Đĩa Trái có 2 + 3 món, Đĩa Phải có 7 món. Nấm điền dấu <, = hay > nhé!",
      formulaText: "2 + 3 = 5, mà 5 < 7",
    },
  ],
};

export function generatePizzaRounds(
  level: MathDifficultyLevel,
  seedOffset = 0,
): PizzaRound[] {
  const baseList = PIZZA_ROUNDS_BY_LEVEL[level].map((r) => ({ ...r, key: r.id }));
  if (seedOffset === 0) {
    return PIZZA_ROUNDS_BY_LEVEL[level];
  }
  const chosen = pickNonRepeatingTemplates(`pizza-l${level}`, baseList, 5);
  const shuffledItems = shuffleMathArray(COMPARISON_ITEMS_POOL);

  return chosen.map((r, idx) => {
    const leftTreat = shuffledItems[(idx * 2) % shuffledItems.length];
    const rightTreat =
      r.expectedSign === "=" && r.comparisonMode === "balance-plate"
        ? leftTreat
        : shuffledItems[(idx * 2 + 1) % shuffledItems.length];

    let prompt = "";
    let formulaText = "";

    if (r.comparisonMode === "choose-sign") {
      prompt = `Đĩa Trái có ${r.leftCount} ${leftTreat.name}, Đĩa Phải có ${r.rightCount} ${rightTreat.name}. Nấm chọn dấu bé hơn, bằng, hay lớn hơn điền vào giữa nhé!`;
      formulaText = `${r.leftCount} ${r.expectedSign} ${r.rightCount} (${r.leftCount} ${signToSpokenWord(r.expectedSign)} ${r.rightCount})`;
    } else if (r.comparisonMode === "balance-plate") {
      if (r.expectedSign === "=") {
        prompt = `Ở giữa là dấu BẰNG (=). Đĩa Trái có ${r.leftCount} ${leftTreat.name}, Nấm thêm hoặc bớt ở Đĩa Phải để hai đĩa BẰNG NHAU (${r.leftCount} = ${r.leftCount}) nhé!`;
        formulaText = `${r.leftCount} = ${r.leftCount} (Hai đĩa bằng nhau)`;
      } else if (r.expectedSign === "<") {
        prompt = `Ở giữa là dấu BÉ HƠN (<). Đĩa Trái có ${r.leftCount} ${leftTreat.name}, Nấm chỉnh Đĩa Phải sao cho NHIỀU HƠN ${r.leftCount} món nhé!`;
        formulaText = `${r.leftCount} < ${r.rightCount} (${r.leftCount} bé hơn ${r.rightCount})`;
      } else {
        prompt = `Ở giữa là dấu LỚN HƠN (>). Đĩa Trái có ${r.leftCount} ${leftTreat.name}, Nấm chỉnh Đĩa Phải sao cho ÍT HƠN ${r.leftCount} món nhé!`;
        formulaText = `${r.leftCount} > ${r.rightCount} (${r.leftCount} lớn hơn ${r.rightCount})`;
      }
    } else {
      const expr = r.leftExprParts!;
      const opWord = expr.op === "+" ? "cộng" : "trừ";
      prompt = `So sánh phép tính: Đĩa Trái có ${expr.a} ${opWord} ${expr.b} (${leftTreat.name}), Đĩa Phải có ${r.rightCount} ${rightTreat.name}. Nấm chọn dấu nào nhỉ?`;
      formulaText = `${expr.label} = ${r.leftCount}, vậy ${expr.label} ${r.expectedSign} ${r.rightCount}`;
    }

    return {
      ...r,
      id: `${r.id}-s${seedOffset}-${idx}`,
      itemName: leftTreat.name,
      itemImageUrl: leftTreat.imageUrl,
      rightItemName: rightTreat.name,
      rightItemImageUrl: rightTreat.imageUrl,
      prompt,
      formulaText,
    };
  });
}

// ============================================================================
// 3. BỘ SINH BẢNG TÍNH & BẢNG CỬU CHƯƠNG (+, -, ×, ÷ TỪ 1 ĐẾN 9)
// ============================================================================
export interface ArithmeticTableRow {
  index: number; // 1..9
  a: number;
  b: number;
  opSymbol: "+" | "−" | "×" | "÷";
  expressionText: string;
  spokenExpression: string;
  spokenFull: string;
  spokenQuestion: string;
  answer: number;
  visualGroups: number;
  visualItemsPerGroup: number;
}

/**
 * Chuyển đổi mọi ký hiệu Toán học (+, −, -, ×, ÷, =, <, >, ?) trong câu sang từ Tiếng Việt chuẩn
 * để trình đọc giọng nói (TTS vi-VN) không bao giờ đọc sai hoặc bỏ sót dấu.
 */
export function formatMathForSpeech(text: string): string {
  return text
    .replace(/\+/g, " cộng ")
    .replace(/−/g, " trừ ")
    .replace(/(\d+)\s*-\s*(\d+|\?)/g, "$1 trừ $2")
    .replace(/×/g, " nhân ")
    .replace(/÷/g, " chia ")
    .replace(/=/g, " bằng ")
    .replace(/>/g, " lớn hơn ")
    .replace(/</g, " bé hơn ")
    .replace(/\?\s+cộng\s+\?/g, "mấy cộng mấy")
    .replace(/(cộng|trừ|nhân|chia|bằng|hơn)\s*\?/g, "$1 mấy")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function buildArithmeticTable(
  op: TableOperation,
  baseNum: number,
): ArithmeticTableRow[] {
  const rows: ArithmeticTableRow[] = [];
  for (let i = 1; i <= 9; i++) {
    if (op === "add") {
      const ans = baseNum + i;
      rows.push({
        index: i,
        a: baseNum,
        b: i,
        opSymbol: "+",
        expressionText: `${baseNum} + ${i}`,
        spokenExpression: `${baseNum} cộng ${i}`,
        spokenFull: `${baseNum} cộng ${i} bằng ${ans}`,
        spokenQuestion: `${baseNum} cộng ${i} bằng mấy?`,
        answer: ans,
        visualGroups: 2,
        visualItemsPerGroup: ans,
      });
    } else if (op === "sub") {
      const minuend = baseNum + i;
      rows.push({
        index: i,
        a: minuend,
        b: baseNum,
        opSymbol: "−",
        expressionText: `${minuend} − ${baseNum}`,
        spokenExpression: `${minuend} trừ ${baseNum}`,
        spokenFull: `${minuend} trừ ${baseNum} bằng ${i}`,
        spokenQuestion: `${minuend} trừ ${baseNum} bằng mấy?`,
        answer: i,
        visualGroups: 1,
        visualItemsPerGroup: i,
      });
    } else if (op === "mul") {
      const ans = baseNum * i;
      rows.push({
        index: i,
        a: baseNum,
        b: i,
        opSymbol: "×",
        expressionText: `${baseNum} × ${i}`,
        spokenExpression: `${baseNum} nhân ${i}`,
        spokenFull: `${baseNum} nhân ${i} bằng ${ans}`,
        spokenQuestion: `${baseNum} nhân ${i} bằng mấy?`,
        answer: ans,
        visualGroups: i,
        visualItemsPerGroup: baseNum,
      });
    } else {
      const dividend = baseNum * i;
      rows.push({
        index: i,
        a: dividend,
        b: baseNum,
        opSymbol: "÷",
        expressionText: `${dividend} ÷ ${baseNum}`,
        spokenExpression: `${dividend} chia ${baseNum}`,
        spokenFull: `${dividend} chia ${baseNum} bằng ${i}`,
        spokenQuestion: `${dividend} chia ${baseNum} bằng mấy?`,
        answer: i,
        visualGroups: baseNum,
        visualItemsPerGroup: i,
      });
    }
  }
  return rows;
}

export function generateHiddenTableIndices(
  level: MathDifficultyLevel,
  seedOffset = 0,
): number[] {
  if (level === 1) return [];
  if (seedOffset === 0) {
    return level === 2 ? [2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }
  const allIndices = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const count = level === 2 ? 4 : 7;
  return shuffleMathArray(allIndices)
    .slice(0, count)
    .sort((a, b) => a - b);
}

// ============================================================================
// 4. THƯ VIỆN BÀI HỌC «SIÊU THỊ XU VÀNG» (MUA HÀNG & THỐI TIỀN THỪA)
// ============================================================================
export interface CoinMarketRound {
  id: string;
  level: MathDifficultyLevel;
  mode: "pay" | "change";
  items: Array<{ pastry: KawaiiPastryAsset; price: number }>;
  customerPaid?: number;
  targetCoinsTotal: number;
  prompt: string;
  formulaText: string;
}

const COIN_L1_LIBRARY = [
  { key: "c1-2-2", prices: [2, 2] },
  { key: "c1-3-2", prices: [3, 2] },
  { key: "c1-4-2", prices: [4, 2] },
  { key: "c1-2-1", prices: [2, 1] },
  { key: "c1-3-1", prices: [3, 1] },
  { key: "c1-3-3", prices: [3, 3] },
  { key: "c1-4-1", prices: [4, 1] },
  { key: "c1-5-1", prices: [5, 1] },
  { key: "c1-5-2", prices: [5, 2] },
  { key: "c1-4-3", prices: [4, 3] },
];

const COIN_L2_LIBRARY = [
  { key: "c2-5-3", prices: [5, 3] },
  { key: "c2-5-4", prices: [5, 4] },
  { key: "c2-4-3-3", prices: [4, 3, 3] },
  { key: "c2-6-3", prices: [6, 3] },
  { key: "c2-5-5", prices: [5, 5] },
  { key: "c2-6-4", prices: [6, 4] },
  { key: "c2-4-4-2", prices: [4, 4, 2] },
  { key: "c2-5-3-2", prices: [5, 3, 2] },
  { key: "c2-6-5", prices: [6, 5] },
  { key: "c2-7-3", prices: [7, 3] },
];

const COIN_L3_LIBRARY = [
  { key: "c3-10-6", paid: 10, prices: [6] },
  { key: "c3-10-7", paid: 10, prices: [7] },
  { key: "c3-12-4-4", paid: 12, prices: [4, 4] },
  { key: "c3-10-5", paid: 10, prices: [5] },
  { key: "c3-10-8", paid: 10, prices: [8] },
  { key: "c3-10-4", paid: 10, prices: [4] },
  { key: "c3-10-3", paid: 10, prices: [3] },
  { key: "c3-12-7", paid: 12, prices: [7] },
  { key: "c3-12-9", paid: 12, prices: [9] },
  { key: "c3-12-5-4", paid: 12, prices: [5, 4] },
  { key: "c3-15-10", paid: 15, prices: [10] },
  { key: "c3-15-9", paid: 15, prices: [9] },
];

export function generateCoinMarketRounds(
  level: MathDifficultyLevel,
  seedOffset = 0,
  theme: MathItemTheme = "all",
): CoinMarketRound[] {
  const pool = getCatalogByTheme(theme);
  const useRandomShuffle = seedOffset > 0;
  const randomItems = useRandomShuffle ? pickRandomDistinctItems(18) : [];
  let itemCursor = 0;
  const nextItem = (fallbackIdx: number) => {
    if (useRandomShuffle) {
      const it = randomItems[itemCursor % randomItems.length];
      itemCursor++;
      return it;
    }
    return pool[(fallbackIdx + seedOffset * 2) % pool.length];
  };

  if (level === 1) {
    const templates = useRandomShuffle
      ? pickNonRepeatingTemplates("coin-l1", COIN_L1_LIBRARY, 5)
      : COIN_L1_LIBRARY.slice(0, 3);
    return templates.map((t, idx) => {
      const items = t.prices.map((p, pIdx) => ({
        pastry: nextItem(idx * 15 + pIdx * 7),
        price: p,
      }));
      const total = t.prices.reduce((a, b) => a + b, 0);
      return {
        id: `cm-1-${seedOffset}-${t.key}-${idx}`,
        level: 1,
        mode: "pay",
        items,
        targetCoinsTotal: total,
        prompt: `Khách mua ${items.map((x) => `${x.pastry.name} (${x.price} xu)`).join(" + ")}. Tổng cộng cần mấy xu?`,
        formulaText: `${t.prices.map((p) => `${p} xu`).join(" + ")} = ${total} xu`,
      };
    });
  }

  if (level === 2) {
    const templates = useRandomShuffle
      ? pickNonRepeatingTemplates("coin-l2", COIN_L2_LIBRARY, 5)
      : COIN_L2_LIBRARY.slice(0, 3);
    return templates.map((t, idx) => {
      const items = t.prices.map((p, pIdx) => ({
        pastry: nextItem(idx * 15 + pIdx * 9 + 3),
        price: p,
      }));
      const total = t.prices.reduce((a, b) => a + b, 0);
      return {
        id: `cm-2-${seedOffset}-${t.key}-${idx}`,
        level: 2,
        mode: "pay",
        items,
        targetCoinsTotal: total,
        prompt: `Giỏ hàng có ${items.map((x) => `${x.pastry.name} (${x.price} xu)`).join(" + ")}. Nấm nhặt đủ ${total} xu nhé!`,
        formulaText: `${t.prices.map((p) => `${p} xu`).join(" + ")} = ${total} xu`,
      };
    });
  }

  const templates = useRandomShuffle
    ? pickNonRepeatingTemplates("coin-l3", COIN_L3_LIBRARY, 5)
    : COIN_L3_LIBRARY.slice(0, 3);
  return templates.map((t, idx) => {
    const items = t.prices.map((p, pIdx) => ({
      pastry: nextItem(idx * 15 + pIdx * 11 + 8),
      price: p,
    }));
    const cost = t.prices.reduce((a, b) => a + b, 0);
    const change = t.paid - cost;
    return {
      id: `cm-3-${seedOffset}-${t.key}-${idx}`,
      level: 3,
      mode: "change",
      items,
      customerPaid: t.paid,
      targetCoinsTotal: change,
      prompt: `Mua hết ${cost} xu, khách đưa ${t.paid} xu. Nấm lấy mấy xu trả lại tiền thừa cho khách?`,
      formulaText: `${t.paid} xu − ${cost} xu = Trả lại ${change} xu`,
    };
  });
}

export const COIN_MARKET_ROUNDS: Record<MathDifficultyLevel, CoinMarketRound[]> = {
  1: generateCoinMarketRounds(1, 0, "all"),
  2: generateCoinMarketRounds(2, 0, "all"),
  3: generateCoinMarketRounds(3, 0, "all"),
};


