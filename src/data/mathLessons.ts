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
import {
  drawNonRepeatingItems,
  drawSingleNonRepeatingItem,
} from "../lib/nonRepeatingDeck.ts";

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
    label: "Tất cả (131 món)",
    icon: "✨",
    sampleImg: "/assets/items/fruits/fruit_01.webp",
  },
  {
    id: "toys",
    label: "Đồ chơi 3D (16)",
    icon: "🧸",
    sampleImg: "/assets/items/toys/toy_01.webp",
  },
  {
    id: "fruits",
    label: "Trái cây (15)",
    icon: "🍓",
    sampleImg: "/assets/items/fruits/fruit_02.webp",
  },
  {
    id: "sweets",
    label: "Bánh & Kem (31)",
    icon: "🍰",
    sampleImg: "/assets/items/sweets/sweet_01.webp",
  },
  {
    id: "lifeskills",
    label: "Bếp & Món ăn (24)",
    icon: "🍳",
    sampleImg: "/assets/items/lifeskills/lifeskills_07.webp",
  },
  {
    id: "school",
    label: "Học tập (15)",
    icon: "🎒",
    sampleImg: "/assets/items/school/school_01.webp",
  },
  {
    id: "home",
    label: "Gia đình (15)",
    icon: "🏠",
    sampleImg: "/assets/items/home/home_02.webp",
  },
  {
    id: "vehicles",
    label: "Xe cộ (15)",
    icon: "🚗",
    sampleImg: "/assets/items/vehicles/vehicle_01.webp",
  },
];

export const KAWAII_ITEM_IMAGES = {
  pizzaSlice: "/assets/math/items/pizza-slice.webp",
  pizzaWhole: "/assets/math/items/pizza-whole.webp",
  pinkPlate: "/assets/math/items/pink-plate.webp",
  pizzaBox: "/assets/math/items/pizza-box.webp",
  goldCoin: "/assets/math/items/gold-coin.webp",
  mysteryGift: "/assets/math/items/mystery-gift.webp",
  bakeryBasket: "/assets/math/items/bakery-basket.webp",
  cashRegister: "/assets/math/items/cash-register.webp",
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
    cardImage: "/assets/canva/card-math-1.webp",
    heroImage: "/assets/canva/thumb-math-1.webp",
    secondaryImage: "/assets/items/fruits/fruit_01.webp",
    accentColor: "#EC4899",
    skillIds: ["counting-within-12", "addition-subtraction-bakery"],
  },
  {
    id: "pizza-party",
    title: "Bàn Tiệc So Sánh (< > =)",
    subtitle: "So sánh lớn hơn, bé hơn, bằng nhau",
    badge: "Bài 2",
    cardImage: "/assets/canva/card-math-2.webp",
    heroImage: "/assets/canva/thumb-math-2.webp",
    secondaryImage: KAWAII_ITEM_IMAGES.pizzaWhole,
    accentColor: "#10B981",
    skillIds: ["comparison-operators", "equal-sharing-division"],
  },
  {
    id: "coin-market",
    title: "Siêu Thị Xu Vàng",
    subtitle: "Cộng tiền mua hàng, tính tiền thừa",
    badge: "Bài 3",
    cardImage: "/assets/canva/card-math-3.webp",
    heroImage: "/assets/canva/thumb-math-3.webp",
    secondaryImage: KAWAII_ITEM_IMAGES.goldCoin,
    accentColor: "#F59E0B",
    skillIds: ["money-addition-subtraction", "word-problems-within-12"],
  },
  {
    id: "arithmetic-tables",
    title: "Bảng Tính & Hộp Quà",
    subtitle: "Bảng cộng, trừ, nhân, chia 1 đến 9",
    badge: "Bài 4",
    cardImage: "/assets/canva/card-math-4.webp",
    heroImage: "/assets/canva/thumb-math-4.webp",
    secondaryImage: KAWAII_ITEM_IMAGES.mysteryGift,
    accentColor: "#8B5CF6",
    skillIds: ["arithmetic-tables-1-to-9", "mental-math-fluency"],
  },
];

// ============================================================================
// BỘ XÁO TRỘN THÔNG MINH & CHỐNG TRÙNG 2 BÀI GẦN NHẤT (ANTI-REPEAT SHUFFLER)
// ============================================================================
const recentMathTemplates = new Map<string, string[]>();

function shuffleMathArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickRandomDistinctItems(count: number): KawaiiPastryAsset[] {
  return drawNonRepeatingItems(
    "math:kawaii-items:v2",
    KAWAII_PASTRY_CATALOG,
    count,
    (item) => item.id,
  );
}

function pickNonRepeatingTemplates<T extends { key: string }>(
  historyGroup: string,
  pool: T[],
  count: number,
): T[] {
  const prev = recentMathTemplates.get(historyGroup) || [];
  const chosen = drawNonRepeatingItems(
    `math:tpl:${historyGroup}:v2`,
    pool,
    count,
    (t) => t.key,
    prev,
  );
  recentMathTemplates.set(
    historyGroup,
    chosen.map((x) => x.key),
  );
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

const BAKERY_L1_LIBRARY = (() => {
  const list: Array<{ key: string; init: number; target: number; pIdx: number }> = [];
  let pCursor = 0;
  // Tất cả các cặp phép cộng & trừ trong phạm vi 1..10 (72 mẫu câu khác nhau)
  for (let init = 1; init <= 9; init++) {
    for (let target = 1; target <= 10; target++) {
      if (init === target) continue;
      const diff = Math.abs(target - init);
      if (diff >= 1 && diff <= 8) {
        list.push({
          key: `l1-${init}-${target}`,
          init,
          target,
          pIdx: (pCursor * 7) % 90,
        });
        pCursor++;
      }
    }
  }
  return list;
})();

const BAKERY_L2_LIBRARY = (() => {
  const list: Array<{ key: string; init: number; target: number; pIdx: number }> = [];
  let pCursor = 3;
  // Tất cả các bài toán tìm thành phần chưa biết x ± ? = y trong phạm vi 1..10 (72 mẫu câu)
  for (let init = 1; init <= 10; init++) {
    for (let target = 1; target <= 10; target++) {
      if (init === target) continue;
      const diff = Math.abs(target - init);
      if (diff >= 1 && diff <= 8) {
        list.push({
          key: `l2-${init}-${target}`,
          init,
          target,
          pIdx: (pCursor * 11) % 90,
        });
        pCursor++;
      }
    }
  }
  return list;
})();

const BAKERY_L3_LIBRARY = (() => {
  const list: Array<{
    key: string;
    initA: number;
    targetA: number;
    initB: number;
    targetB: number;
    pA: number;
    pB: number;
  }> = [];
  let pCursor = 0;
  // Kho 36 mẫu tách-gộp số ? + ? = Tổng (Tổng từ 3 đến 10 với nhiều cặp món 3D khác nhau)
  for (let total = 3; total <= 10; total++) {
    for (let a = 1; a < total; a++) {
      const b = total - a;
      list.push({
        key: `l3-${total}-${a}-${b}`,
        initA: 0,
        targetA: a,
        initB: 0,
        targetB: b,
        pA: (pCursor * 5) % 90,
        pB: (pCursor * 5 + 17) % 90,
      });
      pCursor++;
    }
  }
  return list;
})();

export function generateBakeryOrders(
  level: MathDifficultyLevel,
  seedOffset = 0,
  theme: MathItemTheme = "all",
): BakeryOrderRound[] {
  const pool = getCatalogByTheme(theme);
  const randomItems = pickRandomDistinctItems(16);

  if (level === 1) {
    const templates = pickNonRepeatingTemplates("bakery-l1", BAKERY_L1_LIBRARY, 6);
    return templates.map((t, i) => {
      const pastry =
        randomItems[i % randomItems.length] || pool[(t.pIdx + i) % pool.length];
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
    const templates = pickNonRepeatingTemplates("bakery-l2", BAKERY_L2_LIBRARY, 6);
    return templates.map((t, i) => {
      const pastry =
        randomItems[i % randomItems.length] || pool[(t.pIdx + i) % pool.length];
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

  const dualTemplates = pickNonRepeatingTemplates("bakery-l3", BAKERY_L3_LIBRARY, 6);
  return dualTemplates.map((t, i) => {
    const pastryA =
      randomItems[(i * 2) % randomItems.length] || pool[(t.pA + i) % pool.length];
    let pastryB =
      randomItems[(i * 2 + 1) % randomItems.length] ||
      pool[(t.pB + i + 3) % pool.length];
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
      rightItemImageUrl: "/assets/items/sweets/sweet_02.webp",
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
      itemImageUrl: "/assets/items/fruits/fruit_01.webp",
      rightItemName: "Quả Táo Đỏ",
      rightItemImageUrl: "/assets/items/fruits/fruit_02.webp",
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
      itemImageUrl: "/assets/items/sweets/sweet_01.webp",
      rightItemName: "Bánh Macaron Kem Hồng",
      rightItemImageUrl: "/assets/items/sweets/sweet_06.webp",
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
      itemImageUrl: "/assets/items/fruits/fruit_04.webp",
      rightItemName: "Quả Đào Hồng",
      rightItemImageUrl: "/assets/items/fruits/fruit_08.webp",
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
      itemImageUrl: "/assets/items/sweets/sweet_09.webp",
      rightItemName: "Kẹo Mút Xoáy Nơ Hồng",
      rightItemImageUrl: "/assets/items/sweets/sweet_03.webp",
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
      itemImageUrl: "/assets/items/fruits/fruit_01.webp",
      rightItemName: "Bánh Cupcake Cherry",
      rightItemImageUrl: "/assets/items/sweets/sweet_01.webp",
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
      itemImageUrl: "/assets/items/sweets/sweet_02.webp",
      rightItemName: "Quả Táo Đỏ",
      rightItemImageUrl: "/assets/items/fruits/fruit_02.webp",
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
      itemImageUrl: "/assets/items/fruits/fruit_08.webp",
      rightItemName: "Quả Đào Hồng",
      rightItemImageUrl: "/assets/items/fruits/fruit_08.webp",
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
      itemImageUrl: "/assets/items/vehicles/vehicle_01.webp",
      rightItemName: "Máy Bay Trắng Xanh",
      rightItemImageUrl: "/assets/items/vehicles/vehicle_06.webp",
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
      itemImageUrl: "/assets/items/school/school_01.webp",
      rightItemName: "Hộp Bút Sáp Cầu Vồng",
      rightItemImageUrl: "/assets/items/school/school_08.webp",
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
      rightItemImageUrl: "/assets/items/sweets/sweet_07.webp",
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
      itemImageUrl: "/assets/items/fruits/fruit_01.webp",
      rightItemName: "Quả Cam Tươi",
      rightItemImageUrl: "/assets/items/fruits/fruit_04.webp",
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
      itemImageUrl: "/assets/items/sweets/sweet_06.webp",
      rightItemName: "Ly Trà Sữa Trân Châu",
      rightItemImageUrl: "/assets/items/sweets/sweet_11.webp",
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
      itemImageUrl: "/assets/items/vehicles/vehicle_10.webp",
      rightItemName: "Tàu Ngầm Vàng Thám Hiểm",
      rightItemImageUrl: "/assets/items/vehicles/vehicle_09.webp",
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
      itemImageUrl: "/assets/items/school/school_04.webp",
      rightItemName: "Quyển Sổ Lò Xo Tím",
      rightItemImageUrl: "/assets/items/school/school_02.webp",
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
      itemImageUrl: "/assets/items/home/home_02.webp",
      rightItemName: "Đồng Hồ Báo Thức Hồng",
      rightItemImageUrl: "/assets/items/home/home_05.webp",
      prompt: "So sánh phép tính: Đĩa Trái có 2 + 3 món, Đĩa Phải có 7 món. Nấm điền dấu <, = hay > nhé!",
      formulaText: "2 + 3 = 5, mà 5 < 7",
    },
  ],
};

const PIZZA_PROCEDURAL_POOLS: Record<
  MathDifficultyLevel,
  Array<PizzaRound & { key: string }>
> = (() => {
  const lv1: Array<PizzaRound & { key: string }> = [];
  // Cấp 1 (choose-sign): 64 mẫu câu so sánh 2 đĩa (leftCount, rightCount trong phạm vi 1..8)
  for (let l = 1; l <= 8; l++) {
    for (let r = 1; r <= 8; r++) {
      const sign: ComparisonSign = l < r ? "<" : l > r ? ">" : "=";
      lv1.push({
        key: `pz-l1-${l}-${r}`,
        id: `pz-l1-${l}-${r}`,
        level: 1,
        mode: "divide",
        comparisonMode: "choose-sign",
        leftCount: l,
        rightCount: r,
        initialRightCount: r,
        expectedSign: sign,
        totalSlices: l + r,
        containerCount: 2,
        slicesPerContainer: Math.max(1, Math.round((l + r) / 2)),
        prompt: "",
        formulaText: "",
      });
    }
  }

  const lv2: Array<PizzaRound & { key: string }> = [];
  // Cấp 2 (balance-plate): 48 mẫu câu cân bằng đĩa phải theo dấu (=, <, >)
  for (let l = 2; l <= 7; l++) {
    for (const diff of [-2, -1, 1, 2]) {
      const initR = l + diff;
      if (initR >= 1 && initR <= 8) {
        lv2.push({
          key: `pz-l2-eq-${l}-init${initR}`,
          id: `pz-l2-eq-${l}-init${initR}`,
          level: 2,
          mode: "divide",
          comparisonMode: "balance-plate",
          leftCount: l,
          rightCount: l,
          initialRightCount: initR,
          expectedSign: "=",
          totalSlices: l * 2,
          containerCount: 2,
          slicesPerContainer: l,
          prompt: "",
          formulaText: "",
        });
      }
    }
    for (const initR of [Math.max(1, l - 2), Math.max(1, l - 1), l]) {
      const targetR = Math.min(8, l + 2);
      lv2.push({
        key: `pz-l2-lt-${l}-init${initR}`,
        id: `pz-l2-lt-${l}-init${initR}`,
        level: 2,
        mode: "divide",
        comparisonMode: "balance-plate",
        leftCount: l,
        rightCount: targetR,
        initialRightCount: initR,
        expectedSign: "<",
        totalSlices: l + targetR,
        containerCount: 2,
        slicesPerContainer: l,
        prompt: "",
        formulaText: "",
      });
    }
    for (const initR of [l, Math.min(8, l + 1), Math.min(8, l + 2)]) {
      const targetR = Math.max(1, l - 2);
      lv2.push({
        key: `pz-l2-gt-${l}-init${initR}`,
        id: `pz-l2-gt-${l}-init${initR}`,
        level: 2,
        mode: "divide",
        comparisonMode: "balance-plate",
        leftCount: l,
        rightCount: targetR,
        initialRightCount: initR,
        expectedSign: ">",
        totalSlices: l + targetR,
        containerCount: 2,
        slicesPerContainer: l,
        prompt: "",
        formulaText: "",
      });
    }
  }

  const lv3: Array<PizzaRound & { key: string }> = [];
  // Cấp 3 (expression-compare): 60+ mẫu so sánh phép tính (a ± b) với số bên phải
  for (let a = 1; a <= 6; a++) {
    for (let b = 1; b <= 4; b++) {
      const sum = a + b;
      if (sum <= 9) {
        for (const delta of [-2, 0, 2]) {
          const r = sum + delta;
          if (r >= 2 && r <= 9) {
            const sign: ComparisonSign = sum < r ? "<" : sum > r ? ">" : "=";
            lv3.push({
              key: `pz-l3-add-${a}-${b}-vs-${r}`,
              id: `pz-l3-add-${a}-${b}-vs-${r}`,
              level: 3,
              mode: "multiply",
              comparisonMode: "expression-compare",
              leftCount: sum,
              rightCount: r,
              initialRightCount: r,
              expectedSign: sign,
              leftExprParts: { a, op: "+", b, label: `${a} + ${b}` },
              totalSlices: sum + r,
              containerCount: 2,
              slicesPerContainer: sum,
              prompt: "",
              formulaText: "",
            });
          }
        }
      }
    }
  }
  for (let a = 4; a <= 9; a++) {
    for (let b = 1; b <= 4; b++) {
      const diff = a - b;
      if (diff >= 2) {
        for (const delta of [-1, 0, 2]) {
          const r = diff + delta;
          if (r >= 1 && r <= 8) {
            const sign: ComparisonSign = diff < r ? "<" : diff > r ? ">" : "=";
            lv3.push({
              key: `pz-l3-sub-${a}-${b}-vs-${r}`,
              id: `pz-l3-sub-${a}-${b}-vs-${r}`,
              level: 3,
              mode: "multiply",
              comparisonMode: "expression-compare",
              leftCount: diff,
              rightCount: r,
              initialRightCount: r,
              expectedSign: sign,
              leftExprParts: { a, op: "−", b, label: `${a} − ${b}` },
              totalSlices: diff + r,
              containerCount: 2,
              slicesPerContainer: diff,
              prompt: "",
              formulaText: "",
            });
          }
        }
      }
    }
  }

  return { 1: lv1, 2: lv2, 3: lv3 };
})();

export function generatePizzaRounds(
  level: MathDifficultyLevel,
  seedOffset = 0,
): PizzaRound[] {
  const baseList = [
    ...PIZZA_ROUNDS_BY_LEVEL[level].map((r) => ({ ...r, key: r.id })),
    ...PIZZA_PROCEDURAL_POOLS[level],
  ];
  const chosen = pickNonRepeatingTemplates(`pizza-l${level}`, baseList, 6);
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
  _seedOffset = 0,
): number[] {
  const allIndices = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  // Mọi mức độ đều cần mở tối thiểu 5 hộp quà bí ẩn (Cấp 1: 5 hộp, Cấp 2: 7 hộp, Cấp 3: 9 hộp)
  const count = level === 1 ? 5 : level === 2 ? 7 : 9;
  return shuffleMathArray(allIndices)
    .slice(0, count)
    .sort((a, b) => a - b);
}

const ALL_TABLE_CONFIGS: Array<{
  key: string;
  op: TableOperation;
  baseNum: number;
}> = (() => {
  const ops: TableOperation[] = ["add", "sub", "mul", "div"];
  const list: Array<{ key: string; op: TableOperation; baseNum: number }> = [];
  for (const op of ops) {
    for (let baseNum = 1; baseNum <= 9; baseNum++) {
      list.push({ key: `${op}-${baseNum}`, op, baseNum });
    }
  }
  return list;
})();

export function drawRandomArithmeticTableConfig(excludeKey?: string): {
  op: TableOperation;
  baseNum: number;
} {
  const chosen = drawSingleNonRepeatingItem(
    "math:arithmetic-table-config:v2",
    ALL_TABLE_CONFIGS,
    (c) => c.key,
    excludeKey,
  );
  return { op: chosen.op, baseNum: chosen.baseNum };
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

const COIN_L1_LIBRARY = (() => {
  const list: Array<{ key: string; prices: number[] }> = [];
  for (let p1 = 1; p1 <= 6; p1++) {
    for (let p2 = 1; p2 <= 5; p2++) {
      const sum = p1 + p2;
      if (sum >= 2 && sum <= 9) {
        list.push({ key: `c1-${p1}-${p2}`, prices: [p1, p2] });
      }
    }
  }
  return list;
})();

const COIN_L2_LIBRARY = (() => {
  const list: Array<{ key: string; prices: number[] }> = [
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
    { key: "c2-3-3-2", prices: [3, 3, 2] },
    { key: "c2-3-4-2", prices: [3, 4, 2] },
    { key: "c2-5-2-2", prices: [5, 2, 2] },
    { key: "c2-4-3-2", prices: [4, 3, 2] },
    { key: "c2-5-4-2", prices: [5, 4, 2] },
    { key: "c2-6-2-2", prices: [6, 2, 2] },
    { key: "c2-4-4-3", prices: [4, 4, 3] },
    { key: "c2-5-3-3", prices: [5, 3, 3] },
    { key: "c2-6-3-2", prices: [6, 3, 2] },
    { key: "c2-7-2-2", prices: [7, 2, 2] },
    { key: "c2-4-2-3", prices: [4, 2, 3] },
    { key: "c2-3-5-2", prices: [3, 5, 2] },
    { key: "c2-7-4", prices: [7, 4] },
    { key: "c2-8-3", prices: [8, 3] },
    { key: "c2-6-6", prices: [6, 6] },
    { key: "c2-7-5", prices: [7, 5] },
    { key: "c2-8-4", prices: [8, 4] },
    { key: "c2-5-4-3", prices: [5, 4, 3] },
  ];
  return list;
})();

const COIN_L3_LIBRARY = [
  { key: "c3-8-5", paid: 8, prices: [5] },
  { key: "c3-8-3", paid: 8, prices: [3] },
  { key: "c3-8-2-3", paid: 8, prices: [2, 3] },
  { key: "c3-9-4", paid: 9, prices: [4] },
  { key: "c3-9-6", paid: 9, prices: [6] },
  { key: "c3-9-3-2", paid: 9, prices: [3, 2] },
  { key: "c3-10-6", paid: 10, prices: [6] },
  { key: "c3-10-7", paid: 10, prices: [7] },
  { key: "c3-10-5", paid: 10, prices: [5] },
  { key: "c3-10-8", paid: 10, prices: [8] },
  { key: "c3-10-4", paid: 10, prices: [4] },
  { key: "c3-10-3", paid: 10, prices: [3] },
  { key: "c3-10-2", paid: 10, prices: [2] },
  { key: "c3-10-3-3", paid: 10, prices: [3, 3] },
  { key: "c3-10-4-3", paid: 10, prices: [4, 3] },
  { key: "c3-10-5-2", paid: 10, prices: [5, 2] },
  { key: "c3-10-4-2", paid: 10, prices: [4, 2] },
  { key: "c3-12-4-4", paid: 12, prices: [4, 4] },
  { key: "c3-12-7", paid: 12, prices: [7] },
  { key: "c3-12-9", paid: 12, prices: [9] },
  { key: "c3-12-8", paid: 12, prices: [8] },
  { key: "c3-12-6", paid: 12, prices: [6] },
  { key: "c3-12-5", paid: 12, prices: [5] },
  { key: "c3-12-5-4", paid: 12, prices: [5, 4] },
  { key: "c3-12-6-3", paid: 12, prices: [6, 3] },
  { key: "c3-12-5-3", paid: 12, prices: [5, 3] },
  { key: "c3-12-4-3", paid: 12, prices: [4, 3] },
  { key: "c3-14-9", paid: 14, prices: [9] },
  { key: "c3-14-8", paid: 14, prices: [8] },
  { key: "c3-14-5-4", paid: 14, prices: [5, 4] },
  { key: "c3-15-10", paid: 15, prices: [10] },
  { key: "c3-15-9", paid: 15, prices: [9] },
  { key: "c3-15-8", paid: 15, prices: [8] },
  { key: "c3-15-7", paid: 15, prices: [7] },
  { key: "c3-15-6-4", paid: 15, prices: [6, 4] },
  { key: "c3-15-5-4", paid: 15, prices: [5, 4] },
];

export function generateCoinMarketRounds(
  level: MathDifficultyLevel,
  seedOffset = 0,
  theme: MathItemTheme = "all",
): CoinMarketRound[] {
  const pool = getCatalogByTheme(theme);
  const randomItems = pickRandomDistinctItems(18);
  let itemCursor = 0;
  const nextItem = (fallbackIdx: number) => {
    const it =
      randomItems[itemCursor % randomItems.length] ||
      pool[(fallbackIdx + seedOffset * 2) % pool.length];
    itemCursor++;
    return it;
  };

  if (level === 1) {
    const templates = pickNonRepeatingTemplates("coin-l1", COIN_L1_LIBRARY, 6);
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
    const templates = pickNonRepeatingTemplates("coin-l2", COIN_L2_LIBRARY, 6);
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

  const templates = pickNonRepeatingTemplates("coin-l3", COIN_L3_LIBRARY, 6);
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


