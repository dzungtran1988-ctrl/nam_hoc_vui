export type BaseMixColorId =
  | "red"
  | "yellow"
  | "blue"
  | "green"
  | "purple"
  | "orange"
  | "pink"
  | "brown"
  | "white";

export interface BaseMixColor {
  id: BaseMixColorId;
  name: string;
  hex: string;
  shadowHex: string;
  highlightHex: string;
  /** Tọa độ màu trong hệ sắc tố RYB mở rộng để pha màu mỹ thuật chuẩn */
  ryb: [number, number, number];
}

export interface MixDropSlot {
  colorId: BaseMixColorId;
  drops: number; // 1..5 giọt
}

export interface MixedColorResult {
  id: string;
  name: string;
  hex: string;
  shadowHex: string;
  badgeIcon: string;
  spokenDesc: string;
}

export interface SpecialRecipeCard {
  id: string;
  targetName: string;
  targetHex: string;
  targetShadowHex: string;
  badgeIcon: string;
  ingredients: { colorId: BaseMixColorId; drops: number }[];
  mascotName: string;
  mascotAvatar: string;
  challengePrompt: string;
  successSpeech: string;
}

/**
 * 9 Màu gốc chuẩn Pastel Kawaii (Thay màu Đen xỉn bằng Trắng Kem để bé pha hệ màu Pastel trong trẻo)
 */
export const BASE_MIX_COLORS: BaseMixColor[] = [
  {
    id: "red",
    name: "Đỏ",
    hex: "#FF5A67",
    shadowHex: "#D93848",
    highlightHex: "#FF9EAA",
    ryb: [1, 0, 0],
  },
  {
    id: "yellow",
    name: "Vàng",
    hex: "#FFE047",
    shadowHex: "#E0B619",
    highlightHex: "#FFF3A1",
    ryb: [0, 1, 0],
  },
  {
    id: "blue",
    name: "Xanh dương",
    hex: "#4599FF",
    shadowHex: "#2374D9",
    highlightHex: "#99CAFF",
    ryb: [0, 0, 1],
  },
  {
    id: "green",
    name: "Xanh lá",
    hex: "#5FD36A",
    shadowHex: "#38AA44",
    highlightHex: "#A8F0B0",
    ryb: [0, 0.55, 0.45],
  },
  {
    id: "purple",
    name: "Tím",
    hex: "#A873F5",
    shadowHex: "#7E48CC",
    highlightHex: "#D6BAFF",
    ryb: [0.48, 0, 0.52],
  },
  {
    id: "orange",
    name: "Cam",
    hex: "#FF9C3B",
    shadowHex: "#DC7414",
    highlightHex: "#FFCA94",
    ryb: [0.48, 0.52, 0],
  },
  {
    id: "pink",
    name: "Hồng",
    hex: "#FF92B8",
    shadowHex: "#DF638F",
    highlightHex: "#FFC9DD",
    ryb: [0.55, 0.05, 0.08],
  },
  {
    id: "brown",
    name: "Nâu",
    hex: "#9B6744",
    shadowHex: "#734627",
    highlightHex: "#C79673",
    ryb: [0.45, 0.35, 0.2],
  },
  {
    id: "white",
    name: "Trắng kem",
    hex: "#FFF6E8",
    shadowHex: "#DFCFB8",
    highlightHex: "#FFFFFF",
    ryb: [0.02, 0.05, 0.02],
  },
];

export const BASE_COLOR_MAP: Record<BaseMixColorId, BaseMixColor> = Object.fromEntries(
  BASE_MIX_COLORS.map((c) => [c.id, c]),
) as Record<BaseMixColorId, BaseMixColor>;

/**
 * Danh sách Công Thức Đặc Biệt & Thử Thách Sanrio (Hiển thị trực quan bằng giọt màu ở cột phải)
 */
export const SPECIAL_RECIPES: SpecialRecipeCard[] = [
  {
    id: "mint-pastel",
    targetName: "Xanh Mint",
    targetHex: "#82DFBA",
    targetShadowHex: "#52B58F",
    badgeIcon: "🌿",
    ingredients: [
      { colorId: "blue", drops: 2 },
      { colorId: "yellow", drops: 2 },
      { colorId: "pink", drops: 1 },
    ],
    mascotName: "Cinnamoroll",
    mascotAvatar: "/assets/char-cinnamoroll.webp",
    challengePrompt: "Đố Nấm pha màu Xanh Mint mát lạnh nhé!",
    successSpeech: "Hoan hô Nấm! Màu Xanh Mint mát lạnh đẹp quá đi thôi!",
  },
  {
    id: "peach-orange",
    targetName: "Cam Đào",
    targetHex: "#FFAA64",
    targetShadowHex: "#DF8138",
    badgeIcon: "🍑",
    ingredients: [
      { colorId: "red", drops: 1 },
      { colorId: "yellow", drops: 2 },
      { colorId: "pink", drops: 1 },
    ],
    mascotName: "Hello Kitty",
    mascotAvatar: "/assets/char-kitty.webp",
    challengePrompt: "Nấm thử pha màu Cam Đào ngọt ngào nào!",
    successSpeech: "Tuyệt vời! Màu Cam Đào ngọt lịm giống quả đào tiên luôn!",
  },
  {
    id: "purple-pastel",
    targetName: "Tím Pastel",
    targetHex: "#C299FC",
    targetShadowHex: "#9366D6",
    badgeIcon: "🔮",
    ingredients: [
      { colorId: "blue", drops: 2 },
      { colorId: "pink", drops: 2 },
    ],
    mascotName: "Kuromi",
    mascotAvatar: "/assets/char-kuromi.webp",
    challengePrompt: "Đố Nấm pha được màu Tím Pastel của Kuromi!",
    successSpeech: "Đỉnh quá Nấm ơi! Đúng màu Tím Pastel Kuromi thích nhất rồi!",
  },
  {
    id: "aqua-jade",
    targetName: "Xanh Ngọc",
    targetHex: "#69D6D2",
    targetShadowHex: "#3AA8A4",
    badgeIcon: "💎",
    ingredients: [
      { colorId: "blue", drops: 2 },
      { colorId: "green", drops: 2 },
      { colorId: "yellow", drops: 1 },
    ],
    mascotName: "My Melody",
    mascotAvatar: "/assets/char-mymelody.webp",
    challengePrompt: "Cùng pha màu Xanh Ngọc lấp lánh nhé Nấm!",
    successSpeech: "Oa! Màu Xanh Ngọc trong veo như viên ngọc biển luôn!",
  },
  {
    id: "strawberry-milk",
    targetName: "Hồng Sữa Dâu",
    targetHex: "#FFAEC9",
    targetShadowHex: "#DE7A9B",
    badgeIcon: "🍓",
    ingredients: [
      { colorId: "red", drops: 1 },
      { colorId: "white", drops: 2 },
    ],
    mascotName: "My Melody",
    mascotAvatar: "/assets/rewards/sticker-math-3.webp",
    challengePrompt: "Đố Nấm pha màu Hồng Sữa Dâu từ Đỏ và Trắng kem!",
    successSpeech: "Giỏi quá! Màu Hồng Sữa Dâu thơm ngọt đáng yêu quá!",
  },
  {
    id: "butter-pudding",
    targetName: "Vàng Bơ Pudding",
    targetHex: "#FFEC8B",
    targetShadowHex: "#D9C04E",
    badgeIcon: "🍮",
    ingredients: [
      { colorId: "yellow", drops: 2 },
      { colorId: "white", drops: 2 },
    ],
    mascotName: "Pompompurin",
    mascotAvatar: "/assets/rewards/sticker-coloring-1.webp",
    challengePrompt: "Nấm pha màu Vàng Bơ bánh Pudding cho Purin nhé!",
    successSpeech: "Yummy! Đúng màu Vàng Bơ bánh Pudding của Pompompurin rồi!",
  },
];

function clampByte(n: number): number {
  return Math.max(0, Math.min(255, Math.round(n)));
}

function rgbToHex(r: number, g: number, b: number): string {
  const h = (v: number) => clampByte(v).toString(16).padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`.toUpperCase();
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function darkenHex(hex: string, amount = 0.2): string {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(r * (1 - amount), g * (1 - amount), b * (1 - amount));
}

/**
 * Chuyển đổi tọa độ màu sắc tố RYB sang RGB mỹ thuật tươi sáng (vàng + xanh dương = xanh lá)
 */
function rybToArtisticRgb(r: number, y: number, b: number): [number, number, number] {
  // Bảng 8 đỉnh lập phương RYB chuẩn mỹ thuật tươi tắn
  const c000 = [255, 250, 242]; // Trắng kem
  const c100 = [255, 85, 102];  // Đỏ
  const c010 = [255, 226, 70];  // Vàng
  const c001 = [65, 150, 255];  // Xanh dương
  const c110 = [255, 150, 55];  // Đỏ + Vàng = Cam tươi
  const c011 = [88, 214, 118];  // Vàng + Xanh dương = Xanh lá tươi
  const c101 = [175, 115, 248]; // Đỏ + Xanh dương = Tím pastel
  const c111 = [145, 115, 95];  // Đỏ + Vàng + Xanh dương = Nâu mocha dịu

  const out: [number, number, number] = [0, 0, 0];
  for (let i = 0; i < 3; i++) {
    const v =
      c000[i] * (1 - r) * (1 - y) * (1 - b) +
      c100[i] * r * (1 - y) * (1 - b) +
      c010[i] * (1 - r) * y * (1 - b) +
      c001[i] * (1 - r) * (1 - y) * b +
      c110[i] * r * y * (1 - b) +
      c011[i] * (1 - r) * y * b +
      c101[i] * r * (1 - y) * b +
      c111[i] * r * y * b;
    out[i] = clampByte(v);
  }
  return out;
}

/**
 * Kiểm tra xem tổ hợp giọt màu trên khay có khớp với một công thức đặc biệt hay quy tắc mỹ thuật quen thuộc không
 */
export function computeMixedColor(slots: MixDropSlot[]): MixedColorResult {
  const active = slots.filter((s) => s.drops > 0);
  if (active.length === 0) {
    return {
      id: "empty",
      name: "Chưa có màu",
      hex: "#F3EEF8",
      shadowHex: "#D5C9E2",
      badgeIcon: "✨",
      spokenDesc: "Nấm hãy chọn 2 hoặc 3 màu ở bên trái để trộn nhé!",
    };
  }

  // Nếu chỉ có 1 màu duy nhất trên khay
  if (active.length === 1) {
    const base = BASE_COLOR_MAP[active[0].colorId];
    return {
      id: `single-${base.id}`,
      name: base.name,
      hex: base.hex,
      shadowHex: base.shadowHex,
      badgeIcon: "🎨",
      spokenDesc: `Màu ${base.name}! Nấm hãy thêm một màu khác nữa để pha ra màu mới kỳ diệu nhé!`,
    };
  }

  const totalDrops = active.reduce((sum, s) => sum + s.drops, 0);
  const countMap: Partial<Record<BaseMixColorId, number>> = {};
  for (const s of active) {
    countMap[s.colorId] = (countMap[s.colorId] || 0) + s.drops;
  }

  const hasOnly = (...ids: BaseMixColorId[]) =>
    active.length === ids.length && ids.every((id) => (countMap[id] || 0) > 0);

  // 1. Ưu tiên khớp chính xác hoặc gần đúng các Công Thức Đặc Biệt (Special Recipes)
  for (const recipe of SPECIAL_RECIPES) {
    if (
      recipe.ingredients.length === active.length &&
      recipe.ingredients.every((ing) => (countMap[ing.colorId] || 0) === ing.drops)
    ) {
      return {
        id: recipe.id,
        name: recipe.targetName,
        hex: recipe.targetHex,
        shadowHex: recipe.targetShadowHex,
        badgeIcon: recipe.badgeIcon,
        spokenDesc: `Tuyệt vời! Nấm đã pha được màu ${recipe.targetName}!`,
      };
    }
  }

  // Hỗ trợ cả khi bé chọn đúng bộ nguyên liệu của Công thức đặc biệt dù lệch 1 giọt
  if (hasOnly("blue", "yellow", "pink")) {
    return {
      id: "mint-pastel",
      name: "Xanh Mint",
      hex: "#82DFBA",
      shadowHex: "#52B58F",
      badgeIcon: "🌿",
      spokenDesc: "Oa! Xanh dương, Vàng và Hồng hòa quyện thành màu Xanh Mint mát lạnh!",
    };
  }

  if (hasOnly("red", "yellow", "pink")) {
    return {
      id: "peach-orange",
      name: "Cam Đào",
      hex: "#FFAA64",
      shadowHex: "#DF8138",
      badgeIcon: "🍑",
      spokenDesc: "Tuyệt quá! Đỏ, Vàng và Hồng tạo thành màu Cam Đào ngọt ngào!",
    };
  }

  if (hasOnly("blue", "green", "yellow")) {
    return {
      id: "aqua-jade",
      name: "Xanh Ngọc",
      hex: "#69D6D2",
      shadowHex: "#3AA8A4",
      badgeIcon: "💎",
      spokenDesc: "Lấp lánh quá! Nấm đã tạo ra màu Xanh Ngọc biển xanh!",
    };
  }

  // Hỗ trợ thêm công thức trong ảnh tham khảo (Đỏ + Vàng + Xanh dương) theo tỷ lệ giọt
  if (hasOnly("red", "yellow", "blue")) {
    const rDrops = countMap.red || 0;
    const yDrops = countMap.yellow || 0;
    const bDrops = countMap.blue || 0;
    if (yDrops > rDrops && yDrops >= bDrops) {
      return {
        id: "peach-orange",
        name: "Cam Đào",
        hex: "#FFAA64",
        shadowHex: "#DF8138",
        badgeIcon: "🍑",
        spokenDesc: "Oa! Nhiều màu Vàng hơn nên tạo ra màu Cam Đào ấm áp!",
      };
    }
    if (bDrops >= rDrops) {
      return {
        id: "aqua-jade",
        name: "Xanh Ngọc",
        hex: "#69D6D2",
        shadowHex: "#3AA8A4",
        badgeIcon: "💎",
        spokenDesc: "Kỳ diệu chưa! Nấm đã pha ra màu Xanh Ngọc lấp lánh!",
      };
    }
    return {
      id: "caramel-pastel",
      name: "Nâu Trà Sữa",
      hex: "#C89B7B",
      shadowHex: "#9C6E4E",
      badgeIcon: "🧋",
      spokenDesc: "Ba màu gốc hòa lại thành màu Nâu Trà Sữa thơm ngon!",
    };
  }

  // 2. Các cặp 2 màu mỹ thuật kinh điển (có phân biệt tỷ lệ giọt!)
  if (hasOnly("red", "yellow")) {
    const r = countMap.red || 1;
    const y = countMap.yellow || 1;
    if (y > r) {
      return {
        id: "peach-orange",
        name: "Cam Đào",
        hex: "#FFAD5A",
        shadowHex: "#DE832C",
        badgeIcon: "🍑",
        spokenDesc: "Đỏ pha với nhiều Vàng ra màu Cam Đào tươi sáng!",
      };
    }
    if (r > y) {
      return {
        id: "coral-red",
        name: "Đỏ Cam San Hô",
        hex: "#FF785A",
        shadowHex: "#D94E34",
        badgeIcon: "🌺",
        spokenDesc: "Nhiều Đỏ pha với Vàng tạo thành màu Đỏ Cam San Hô rực rỡ!",
      };
    }
    return {
      id: "orange-fresh",
      name: "Cam Tươi",
      hex: "#FF9838",
      shadowHex: "#D97116",
      badgeIcon: "🍊",
      spokenDesc: "Đỏ cộng với Vàng biến thành màu Cam Tươi giống quả cam!",
    };
  }

  if (hasOnly("yellow", "blue")) {
    const y = countMap.yellow || 1;
    const b = countMap.blue || 1;
    if (y > b) {
      return {
        id: "lime-pastel",
        name: "Xanh Cốm Non",
        hex: "#94E26B",
        shadowHex: "#65B83E",
        badgeIcon: "🌱",
        spokenDesc: "Nhiều Vàng pha với Xanh dương ra màu Xanh Cốm Non mơn mởn!",
      };
    }
    if (b > y) {
      return {
        id: "mint-pastel",
        name: "Xanh Mint",
        hex: "#72DDB8",
        shadowHex: "#43B28C",
        badgeIcon: "🌿",
        spokenDesc: "Nhiều Xanh dương pha với Vàng ra màu Xanh Mint mát rượi!",
      };
    }
    return {
      id: "green-leaf",
      name: "Xanh Lá Non",
      hex: "#68D87B",
      shadowHex: "#3CAE50",
      badgeIcon: "🍀",
      spokenDesc: "Vàng pha với Xanh dương biến thành màu Xanh Lá Non kỳ diệu!",
    };
  }

  if (hasOnly("red", "blue")) {
    const r = countMap.red || 1;
    const b = countMap.blue || 1;
    if (b > r) {
      return {
        id: "indigo-pastel",
        name: "Tím Xanh Ngân Hà",
        hex: "#9688FA",
        shadowHex: "#6959D4",
        badgeIcon: "🌌",
        spokenDesc: "Nhiều Xanh dương pha Đỏ tạo ra màu Tím Xanh Ngân Hà!",
      };
    }
    if (r > b) {
      return {
        id: "berry-purple",
        name: "Tím Mận Chín",
        hex: "#CE74DF",
        shadowHex: "#A348B5",
        badgeIcon: "🍇",
        spokenDesc: "Nhiều Đỏ pha Xanh dương tạo ra màu Tím Mận Chín ngọt ngào!",
      };
    }
    return {
      id: "purple-pastel",
      name: "Tím Pastel",
      hex: "#B585F7",
      shadowHex: "#8756CC",
      badgeIcon: "🔮",
      spokenDesc: "Đỏ kết hợp Xanh dương biến thành màu Tím Pastel mộng mơ!",
    };
  }

  if (hasOnly("blue", "pink")) {
    return {
      id: "purple-pastel",
      name: "Tím Pastel",
      hex: "#C299FC",
      shadowHex: "#9366D6",
      badgeIcon: "🔮",
      spokenDesc: "Xanh dương pha với Hồng tạo ra màu Tím Pastel ngọt ngào!",
    };
  }

  if (hasOnly("blue", "green")) {
    return {
      id: "aqua-jade",
      name: "Xanh Ngọc",
      hex: "#64D4CE",
      shadowHex: "#38A8A2",
      badgeIcon: "💎",
      spokenDesc: "Xanh dương và Xanh lá hòa quyện thành màu Xanh Ngọc tuyệt đẹp!",
    };
  }

  if (hasOnly("red", "white") || hasOnly("red", "pink")) {
    return {
      id: "strawberry-milk",
      name: "Hồng Sữa Dâu",
      hex: "#FFA6C4",
      shadowHex: "#DC7296",
      badgeIcon: "🍓",
      spokenDesc: "Màu Hồng Sữa Dâu ngọt ngào như chiếc nơ của My Melody!",
    };
  }

  if (hasOnly("yellow", "white")) {
    return {
      id: "butter-pudding",
      name: "Vàng Bơ Pudding",
      hex: "#FFEC8B",
      shadowHex: "#D9C04E",
      badgeIcon: "🍮",
      spokenDesc: "Màu Vàng Bơ Pudding thơm lừng của bạn Pompompurin!",
    };
  }

  if (hasOnly("blue", "white")) {
    return {
      id: "sky-cinnamoroll",
      name: "Xanh Mây Trời",
      hex: "#96CEFF",
      shadowHex: "#62A2DE",
      badgeIcon: "☁️",
      spokenDesc: "Màu Xanh Mây Trời bồng bềnh của bạn Cinnamoroll!",
    };
  }

  if (hasOnly("green", "white")) {
    return {
      id: "mint-pastel",
      name: "Xanh Mint",
      hex: "#8CE6C0",
      shadowHex: "#59BA92",
      badgeIcon: "🌿",
      spokenDesc: "Xanh lá pha Trắng kem tạo thành màu Xanh Mint mát lạnh!",
    };
  }

  if (hasOnly("purple", "white") || hasOnly("purple", "pink")) {
    return {
      id: "taro-lilac",
      name: "Tím Khoai Môn",
      hex: "#D5B3FF",
      shadowHex: "#A67EE0",
      badgeIcon: "🪻",
      spokenDesc: "Màu Tím Khoai Môn dịu dàng và thơm ngát!",
    };
  }

  if (hasOnly("orange", "white") || hasOnly("yellow", "pink")) {
    return {
      id: "peach-orange",
      name: "Cam Đào",
      hex: "#FFB478",
      shadowHex: "#DF8A48",
      badgeIcon: "🍑",
      spokenDesc: "Màu Cam Đào phơn phớt hồng thật đáng yêu!",
    };
  }

  if (hasOnly("brown", "white") || hasOnly("brown", "yellow")) {
    return {
      id: "milk-tea",
      name: "Nâu Trà Sữa",
      hex: "#CFA07A",
      shadowHex: "#A37451",
      badgeIcon: "🧸",
      spokenDesc: "Màu Nâu Trà Sữa ấm áp giống chú gấu bông!",
    };
  }

  if (hasOnly("green", "yellow")) {
    return {
      id: "lime-pastel",
      name: "Xanh Cốm Non",
      hex: "#9BE56A",
      shadowHex: "#6CBA3B",
      badgeIcon: "🍏",
      spokenDesc: "Màu Xanh Cốm Non tươi mát như quả táo xanh!",
    };
  }

  // 3. Thuật toán nội suy RYB + Pastel thông minh cho mọi tổ hợp tự do khác của bé
  let sumR = 0;
  let sumY = 0;
  let sumB = 0;
  let whiteRatio = 0;

  for (const s of active) {
    const c = BASE_COLOR_MAP[s.colorId];
    const w = s.drops / totalDrops;
    sumR += c.ryb[0] * w;
    sumY += c.ryb[1] * w;
    sumB += c.ryb[2] * w;
    if (s.colorId === "white" || s.colorId === "pink") {
      whiteRatio += w * (s.colorId === "white" ? 0.45 : 0.22);
    }
  }

  // Chuẩn hóa nhẹ để màu luôn rực rỡ chuẩn Pastel mà không bị đục
  const maxC = Math.max(sumR, sumY, sumB, 0.01);
  const normScale = Math.min(1, 0.85 / maxC);
  const [rawR, rawG, rawB] = rybToArtisticRgb(
    sumR * normScale,
    sumY * normScale,
    sumB * normScale,
  );

  // Pha thêm độ sáng Pastel dịu mắt
  const pastelLift = Math.min(0.48, 0.16 + whiteRatio);
  const finalR = clampByte(rawR + (255 - rawR) * pastelLift);
  const finalG = clampByte(rawG + (252 - rawG) * pastelLift);
  const finalB = clampByte(rawB + (248 - rawB) * pastelLift);

  const hex = rgbToHex(finalR, finalG, finalB);
  const shadowHex = darkenHex(hex, 0.2);
  const autoName = nameColorByRgb(finalR, finalG, finalB);

  return {
    id: `custom-${hex.slice(1)}`,
    name: autoName.name,
    hex,
    shadowHex,
    badgeIcon: autoName.icon,
    spokenDesc: `Oa! Nấm tự sáng tạo ra màu ${autoName.name} đẹp tuyệt vời!`,
  };
}

function nameColorByRgb(
  r: number,
  g: number,
  b: number,
): { name: string; icon: string } {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  if (d < 22) {
    return { name: "Kem Sữa Mây", icon: "☁️" };
  }

  let h = 0;
  if (max === r) {
    h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
  } else if (max === g) {
    h = ((b - r) / d + 2) * 60;
  } else {
    h = ((r - g) / d + 4) * 60;
  }

  if (h < 18 || h >= 342) return { name: "Hồng Dâu Pastel", icon: "🍓" };
  if (h < 42) return { name: "Cam Đào Ngọt", icon: "🍑" };
  if (h < 68) return { name: "Vàng Kem Nắng", icon: "🌼" };
  if (h < 150) return { name: "Xanh Lá Mơ", icon: "🌿" };
  if (h < 195) return { name: "Xanh Ngọc Bích", icon: "💎" };
  if (h < 250) return { name: "Xanh Mây Biển", icon: "🌊" };
  if (h < 305) return { name: "Tím Hoa Cà", icon: "🔮" };
  return { name: "Hồng Phấn Hoa", icon: "🌸" };
}
