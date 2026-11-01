import type { SubjectId } from "../types";

export type BedroomQuestionSkill =
  | "shape"     // Trạm 1: Hình dạng (4 quyển sách / 4 món đồ)
  | "math"      // Trạm 2: Toán tình huống (thêm/ăn bớt/đếm trên đĩa)
  | "reading"   // Trạm 3: Học đọc (điền nốt chữ khuyết: Icon Mây -> M...)
  | "english"   // Trạm 4: Tiếng Anh (tên đồ vật bằng Tiếng Anh ở hộp/rương)
  | "poem";     // Trạm 5: Giá sách/Quyển sách (đọc thơ & quote đáng yêu hàng ngày)

export interface BedroomOptionCard {
  id: string;
  label: string;
  subLabel?: string;
  icon?: string;
  imageSrc?: string;
  visualStyle: "book" | "number" | "word" | "english";
  /** Ngôn ngữ đọc TTS khi bé chạm vào đáp án ('vi-VN' | 'en-US') */
  ttsLang?: "vi-VN" | "en-US";
  ttsText?: string;
  cardBg?: string;
  cardBorder?: string;
}

export interface MathTrayVisual {
  mode: "add" | "subtract" | "count";
  itemIcon: string;
  itemImageSrc?: string;
  itemName: string;
  initialCount: number;
  deltaCount: number;
}

export interface ReadingBlankVisual {
  icon: string;
  imageSrc?: string;
  fullWord: string;
  /** Phần chữ hiển thị sẵn có dấu ba chấm, VD: "M..." hoặc "Bông h..." */
  maskedPrefix: string;
  /** Phần chữ trước chỗ trống để ghép trực tiếp khi bé chọn, VD: "M" hoặc "Bông h" */
  stemBeforeBlank: string;
  phonicsHint: string;
}

export interface EnglishBoxVisual {
  icon: string;
  imageSrc?: string;
  vietnameseName: string;
  englishWord: string;
  phoneticHint: string;
}

export interface DailyPoemVisual {
  id: string;
  badge: string;
  title: string;
  icon: string;
  imageSrc?: string;
  lines: string[];
  moralQuote: string;
}

export interface BedroomQuestionItem {
  id: string;
  skill: BedroomQuestionSkill;
  skillLabel: string;
  bubblePrompt: string;
  questionTitle: string;
  highlightFormula?: string;
  mathVisual?: MathTrayVisual;
  readingVisual?: ReadingBlankVisual;
  englishVisual?: EnglishBoxVisual;
  poemVisual?: DailyPoemVisual;
  options: BedroomOptionCard[];
  correctOptionId: string;
  praiseTitle: string;
  praiseSubtitle: string;
}

export interface BedroomHotspotConfig {
  id: string;
  name: string;
  icon: string;
  /** Loại trạm học tập của ngôi sao này (1 phòng 5 sao = đủ 5 trạm) */
  stationType: BedroomQuestionSkill;
  /** Tọa độ % ngang trên tranh (0..100) */
  x: number;
  /** Tọa độ % dọc trên tranh (0..100) */
  y: number;
  /** Tọa độ tâm khi Zoom cận cảnh */
  zoomOriginX: number;
  zoomOriginY: number;
  zoomScale: number;
}

export interface BedroomThemePalette {
  btnGradient: string;
  btnShadow: string;
  btnBorder: string;
  topPillBg: string;
  cardBg: string;
  cardBorder: string;
  titleColor: string;
  subTextColor: string;
  selectedBorder: string;
  selectedGlow: string;
  selectedBg: string;
  primaryHex: string;
  softTintHex: string;
  starHex: string;
}

export interface SanrioBedroomConfig {
  id: string;
  /** Đánh dấu Map Sự Kiện Đặc Biệt Mùa Lễ Hội Halloween (thay Sao bằng Kẹo, câu hỏi & thưởng Sticker Halloween) */
  isHalloweenTheme?: boolean;
  /** Môn học tương ứng để trao đúng bộ Sticker của nhân vật chủ phòng */
  rewardSubjectId: SubjectId;
  characterName: string;
  roomTitle: string;
  roomSubtitle: string;
  badgeText: string;
  roomImage: string;
  mascotAskImage: string;
  mascotHappyImage: string;
  /** Món bánh/đồ vật đặc trưng dùng trong bài toán tình huống của phòng */
  mathTreatIcon: string;
  mathTreatName: string;
  welcomeSpeech: string;
  chestPrompt: string;
  chestVictorySpeech: string;
  palette: BedroomThemePalette;
  hotspots: BedroomHotspotConfig[];
}

// =============================================================================
// TIỆN ÍCH TRỘN NGẪU NHIÊN CHỐNG HỌC VẸT
// =============================================================================
function shuffleArray<T>(items: readonly T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

function pickRandom<T>(items: readonly T[], excludeId?: string): T {
  const filtered = excludeId
    ? items.filter((item: any) => item.id !== excludeId)
    : items;
  const pool = filtered.length > 0 ? filtered : items;
  return pool[Math.floor(Math.random() * pool.length)];
}

// =============================================================================
// 1. NGÂN HÀNG HÌNH DẠNG (TRẠM 1: 4 QUYỂN SÁCH / ĐỒ VẬT HÌNH KHỐI)
// =============================================================================
interface ShapeCatalogItem {
  id: string;
  shapeName: string;
  bookLabel: string;
  icon: string;
  cardBg: string;
  cardBorder: string;
}

const SHAPE_BOOK_CATALOG: ShapeCatalogItem[] = [
  {
    id: "shape-star",
    shapeName: "hình ngôi sao",
    bookLabel: "Sách Ngôi Sao",
    icon: "⭐",
    cardBg: "linear-gradient(180deg, #90CAF9 0%, #5EB3F6 100%)",
    cardBorder: "#3B89E6",
  },
  {
    id: "shape-flower",
    shapeName: "hình bông hoa",
    bookLabel: "Sách Bông Hoa",
    icon: "🌸",
    cardBg: "linear-gradient(180deg, #F8BBD0 0%, #F48FB1 100%)",
    cardBorder: "#EC407A",
  },
  {
    id: "shape-triangle",
    shapeName: "hình tam giác",
    bookLabel: "Sách Tam Giác",
    icon: "🔺",
    cardBg: "linear-gradient(180deg, #FFE082 0%, #FFCA28 100%)",
    cardBorder: "#F59F00",
  },
  {
    id: "shape-circle",
    shapeName: "hình tròn",
    bookLabel: "Sách Hình Tròn",
    icon: "🟡",
    cardBg: "linear-gradient(180deg, #C5E1A5 0%, #9CCC65 100%)",
    cardBorder: "#7CB342",
  },
  {
    id: "shape-square",
    shapeName: "hình vuông",
    bookLabel: "Sách Hình Vuông",
    icon: "🟦",
    cardBg: "linear-gradient(180deg, #B3E5FC 0%, #4FC3F7 100%)",
    cardBorder: "#039BE5",
  },
  {
    id: "shape-heart",
    shapeName: "hình trái tim",
    bookLabel: "Sách Trái Tim",
    icon: "💖",
    cardBg: "linear-gradient(180deg, #FFCDD2 0%, #F06292 100%)",
    cardBorder: "#D81B60",
  },
  {
    id: "shape-moon",
    shapeName: "hình vầng trăng khuyết",
    bookLabel: "Sách Vầng Trăng",
    icon: "🌙",
    cardBg: "linear-gradient(180deg, #D1C4E9 0%, #9575CD 100%)",
    cardBorder: "#673AB7",
  },
  {
    id: "shape-clover",
    shapeName: "hình cỏ bốn lá",
    bookLabel: "Sách Cỏ Bốn Lá",
    icon: "🍀",
    cardBg: "linear-gradient(180deg, #A5D6A7 0%, #66BB6A 100%)",
    cardBorder: "#43A047",
  },
  {
    id: "shape-diamond",
    shapeName: "hình thoi lấp lánh",
    bookLabel: "Sách Hình Thoi",
    icon: "🔷",
    cardBg: "linear-gradient(180deg, #80DEEA 0%, #26C6DA 100%)",
    cardBorder: "#00ACC1",
  },
];

// =============================================================================
// 2. NGÂN HÀNG HỌC ĐỌC ĐIỀN CHỮ KHUYẾT (TRẠM 3: ICON + M... + 4 ĐÁP ÁN)
// =============================================================================
interface ReadingFillItem {
  id: string;
  icon: string;
  fullWord: string;
  maskedPrefix: string;
  stemBeforeBlank: string;
  correctRhyme: string;
  distractors: [string, string, string];
  phonicsHint: string;
  promptHint: string;
}

const READING_FILL_CATALOG: ReadingFillItem[] = [
  {
    id: "rf-may",
    icon: "☁️",
    fullWord: "Mây",
    maskedPrefix: "M...",
    stemBeforeBlank: "M",
    correctRhyme: "ây",
    distractors: ["ưa", "ăt", "ôi"],
    phonicsHint: "m - ây → mây",
    promptHint: "Đám mây trắng bồng bềnh trên bầu trời",
  },
  {
    id: "rf-sao",
    icon: "⭐",
    fullWord: "Sao",
    maskedPrefix: "S...",
    stemBeforeBlank: "S",
    correctRhyme: "ao",
    distractors: ["ách", "ông", "en"],
    phonicsHint: "s - ao → sao",
    promptHint: "Ngôi sao vàng tỏa sáng lấp lánh",
  },
  {
    id: "rf-hoa",
    icon: "🌸",
    fullWord: "Hoa",
    maskedPrefix: "H...",
    stemBeforeBlank: "H",
    correctRhyme: "oa",
    distractors: ["ơ", "ai", "ôn"],
    phonicsHint: "h - oa → hoa",
    promptHint: "Bông hoa thơm ngát bên khung cửa sổ",
  },
  {
    id: "rf-banh",
    icon: "🧁",
    fullWord: "Bánh",
    maskedPrefix: "B...",
    stemBeforeBlank: "B",
    correctRhyme: "ánh",
    distractors: ["àn", "óng", "út"],
    phonicsHint: "b - anh - sắc → bánh",
    promptHint: "Chiếc bánh ngọt thơm lừng trên bàn trà",
  },
  {
    id: "rf-sach",
    icon: "📘",
    fullWord: "Sách",
    maskedPrefix: "S...",
    stemBeforeBlank: "S",
    correctRhyme: "ách",
    distractors: ["ao", "ữa", "en"],
    phonicsHint: "s - ách - sắc → sách",
    promptHint: "Quyển sách cổ tích có nhiều tranh đẹp",
  },
  {
    id: "rf-den",
    icon: "🏮",
    fullWord: "Đèn",
    maskedPrefix: "Đ...",
    stemBeforeBlank: "Đ",
    correctRhyme: "èn",
    distractors: ["àn", "êm", "ường"],
    phonicsHint: "đ - en - huyền → đèn",
    promptHint: "Chiếc đèn ngủ tỏa ánh sáng ấm áp",
  },
  {
    id: "rf-gau",
    icon: "🧸",
    fullWord: "Gấu",
    maskedPrefix: "G...",
    stemBeforeBlank: "G",
    correctRhyme: "ấu",
    distractors: ["ối", "ương", "à"],
    phonicsHint: "g - âu - sắc → gấu",
    promptHint: "Bạn gấu bông mềm mại đáng yêu",
  },
  {
    id: "rf-goi",
    icon: "🛋️",
    fullWord: "Gối",
    maskedPrefix: "G...",
    stemBeforeBlank: "G",
    correctRhyme: "ối",
    distractors: ["ấu", "ió", "ạch"],
    phonicsHint: "g - ôi - sắc → gối",
    promptHint: "Chiếc gối bông êm ái trên giường ngủ",
  },
  {
    id: "rf-trang",
    icon: "🌙",
    fullWord: "Trăng",
    maskedPrefix: "Tr...",
    stemBeforeBlank: "Tr",
    correctRhyme: "ăng",
    distractors: ["ời", "ứng", "anh"],
    phonicsHint: "tr - ăng → trăng",
    promptHint: "Vầng trăng khuyết tỏa sáng ban đêm",
  },
  {
    id: "rf-keo",
    icon: "🍬",
    fullWord: "Kẹo",
    maskedPrefix: "K...",
    stemBeforeBlank: "K",
    correctRhyme: "ẹo",
    distractors: ["em", "ính", "éo"],
    phonicsHint: "k - eo - nặng → kẹo",
    promptHint: "Viên kẹo ngọt ngào nhiều màu sắc",
  },
  {
    id: "rf-no",
    icon: "🎀",
    fullWord: "Nơ",
    maskedPrefix: "N...",
    stemBeforeBlank: "N",
    correctRhyme: "ơ",
    distractors: ["ấm", "ắng", "ước"],
    phonicsHint: "n - ơ → nơ",
    promptHint: "Chiếc nơ hồng xinh xắn cài trên tóc",
  },
  {
    id: "rf-nam",
    icon: "🍄",
    fullWord: "Nấm",
    maskedPrefix: "N...",
    stemBeforeBlank: "N",
    correctRhyme: "ấm",
    distractors: ["ơ", "ắng", "ồi"],
    phonicsHint: "n - âm - sắc → nấm",
    promptHint: "Tên của em bé Nấm ngoan ngoãn đáng yêu",
  },
];

// =============================================================================
// 3. NGÂN HÀNG TIẾNG ANH ĐỒ VẬT TRONG HỘP/PHÒNG (TRẠM 4)
// =============================================================================
interface EnglishItemEntry {
  id: string;
  icon: string;
  vietnameseName: string;
  englishWord: string;
  phoneticHint: string;
}

const ENGLISH_BOX_CATALOG: EnglishItemEntry[] = [
  { id: "en-star", icon: "⭐", vietnameseName: "Ngôi sao", englishWord: "Star", phoneticHint: "/stɑːr/" },
  { id: "en-cloud", icon: "☁️", vietnameseName: "Đám mây", englishWord: "Cloud", phoneticHint: "/klaʊd/" },
  { id: "en-book", icon: "📖", vietnameseName: "Quyển sách", englishWord: "Book", phoneticHint: "/bʊk/" },
  { id: "en-cake", icon: "🎂", vietnameseName: "Bánh kem", englishWord: "Cake", phoneticHint: "/keɪk/" },
  { id: "en-flower", icon: "🌸", vietnameseName: "Bông hoa", englishWord: "Flower", phoneticHint: "/ˈflaʊ.ər/" },
  { id: "en-bear", icon: "🧸", vietnameseName: "Gấu bông", englishWord: "Bear", phoneticHint: "/ber/" },
  { id: "en-moon", icon: "🌙", vietnameseName: "Mặt trăng", englishWord: "Moon", phoneticHint: "/muːn/" },
  { id: "en-gift", icon: "🎁", vietnameseName: "Hộp quà", englishWord: "Gift", phoneticHint: "/ɡɪft/" },
  { id: "en-cup", icon: "☕", vietnameseName: "Tách trà", englishWord: "Cup", phoneticHint: "/kʌp/" },
  { id: "en-balloon", icon: "🎈", vietnameseName: "Khinh khí cầu / Bóng bay", englishWord: "Balloon", phoneticHint: "/bəˈluːn/" },
  { id: "en-cookie", icon: "🍪", vietnameseName: "Bánh quy", englishWord: "Cookie", phoneticHint: "/ˈkʊk.i/" },
  { id: "en-crown", icon: "👑", vietnameseName: "Vương miện", englishWord: "Crown", phoneticHint: "/kraʊn/" },
  { id: "en-apple", icon: "🍎", vietnameseName: "Quả táo đỏ", englishWord: "Apple", phoneticHint: "/ˈæp.əl/" },
  { id: "en-rabbit", icon: "🐰", vietnameseName: "Bạn thỏ", englishWord: "Rabbit", phoneticHint: "/ˈræb.ɪt/" },
];

// =============================================================================
// 4. NGÂN HÀNG THƠ & QUOTE ĐÁNG YÊU HÀNG NGÀY Ở QUYỂN SÁCH / GIÁ SÁCH (TRẠM 5)
// =============================================================================
export const DAILY_CUTE_POEMS: DailyPoemVisual[] = [
  {
    id: "poem-1",
    badge: "📖 Thơ Hay Mỗi Ngày #1",
    title: "Lâu Đài Trên Mây",
    icon: "☁️",
    lines: [
      "Mây trắng bồng bềnh trôi,",
      "Sao vàng cười lấp lánh,",
      "Em bé Nấm ngoan lành,",
      "Học trăm điều hay nhé!",
    ],
    moralQuote: "💡 Lời nhắn yêu thương: Mỗi ngày học thêm một điều mới là Nấm đã bay cao thêm một tầng mây rồi đấy!",
  },
  {
    id: "poem-2",
    badge: "📖 Thơ Hay Mỗi Ngày #2",
    title: "Chiếc Nơ Hồng Xinh",
    icon: "🎀",
    lines: [
      "Nắng sớm ghé qua phòng,",
      "Chào Kitty nơ hồng,",
      "Nấm cười tươi rạng rỡ,",
      "Yêu bố mẹ thật nhiều!",
    ],
    moralQuote: "💡 Lời nhắn yêu thương: Nụ cười buổi sáng của Nấm là món quà đẹp nhất trong ngôi nhà mình!",
  },
  {
    id: "poem-3",
    badge: "📖 Thơ Hay Mỗi Ngày #3",
    title: "Tiệc Trà Của Bạn Nhỏ",
    icon: "🍵",
    lines: [
      "Bàn trà bày bánh ngọt,",
      "Hương hoa thơm dịu dàng,",
      "Bạn bè cùng chia sẻ,",
      "Niềm vui ngập tràn khoang!",
    ],
    moralQuote: "💡 Lời nhắn yêu thương: Biết chia sẻ bánh ngon và đồ chơi với bạn bè giúp niềm vui nhân đôi!",
  },
  {
    id: "poem-4",
    badge: "📖 Thơ Hay Mỗi Ngày #4",
    title: "Ngôi Sao Nhỏ Chăm Chỉ",
    icon: "🌟",
    lines: [
      "Trên trời có ngàn sao,",
      "Lung linh đêm trăng sáng,",
      "Bé Nấm chăm đọc bài,",
      "Cũng tỏa sáng như sao!",
    ],
    moralQuote: "💡 Lời nhắn yêu thương: Khi Nấm tự giác đọc to rõ từng chữ, Nấm chính là ngôi sao sáng nhất!",
  },
  {
    id: "poem-5",
    badge: "📖 Thơ Hay Mỗi Ngày #5",
    title: "Bánh Pudding Ngọt Ngào",
    icon: "🍮",
    lines: [
      "Bánh Pudding vàng óng,",
      "Thêm quả cherry hồng,",
      "Nấm ăn ngoan chóng lớn,",
      "Khỏe mạnh suốt mùa đông!",
    ],
    moralQuote: "💡 Lời nhắn yêu thương: Ăn uống gọn gàng và ngủ đúng giờ giúp cơ thể Nấm luôn tràn đầy năng lượng!",
  },
  {
    id: "poem-6",
    badge: "📖 Thơ Hay Mỗi Ngày #6",
    title: "Kho Báu Của Trí Tuệ",
    icon: "💎",
    lines: [
      "Mỗi trang sách mở ra,",
      "Bao điều kỳ diệu quá,",
      "Chữ cái và con số,",
      "Là kho báu của ta!",
    ],
    moralQuote: "💡 Lời nhắn yêu thương: Tò mò hỏi và khám phá mỗi ngày giúp Nấm ngày càng thông minh hơn!",
  },
  {
    id: "poem-7",
    badge: "📖 Thơ Hay Mỗi Ngày #7",
    title: "Giấc Mơ Đêm Đầy Sao",
    icon: "🌙",
    lines: [
      "Trăng nghiêng bên cửa sổ,",
      "Kể chuyện cổ tích xưa,",
      "Chúc Nấm ngoan ngủ kỹ,",
      "Mơ thấy vương quốc mây!",
    ],
    moralQuote: "💡 Lời nhắn yêu thương: Trước khi đi ngủ, đọc một trang sách hay sẽ mang đến những giấc mơ đẹp!",
  },
];

// =============================================================================
// NGÂN HÀNG CÂU HỎI & HÌNH CẮT 3D RIÊNG CHO MAP ĐẶC BIỆT ĐÊM HỘI HALLOWEEN
// =============================================================================

interface HalloweenMathTreat {
  icon: string;
  imageSrc: string;
  name: string;
}

const HALLOWEEN_MATH_TREATS: HalloweenMathTreat[] = [
  {
    icon: "🧁",
    imageSrc: "/assets/halloween/sweet-cupcakes.webp",
    name: "chiếc bánh cupcake bí ngô",
  },
  {
    icon: "🍭",
    imageSrc: "/assets/halloween/sweet-lollipops.webp",
    name: "cây kẹo mút Halloween",
  },
  {
    icon: "🍬",
    imageSrc: "/assets/halloween/sweet-candies.webp",
    name: "viên kẹo ngọt giấy xoắn",
  },
  {
    icon: "🍪",
    imageSrc: "/assets/halloween/sweet-cookies.webp",
    name: "chiếc bánh quy ma nhỏ",
  },
  {
    icon: "🍩",
    imageSrc: "/assets/halloween/sweet-donut-cat.webp",
    name: "chiếc bánh donut mèo đen",
  },
  {
    icon: "🧁",
    imageSrc: "/assets/halloween/sweet-ghost-cupcake.webp",
    name: "chiếc bánh kem ma trắng",
  },
];

interface HalloweenReadingFillItem extends ReadingFillItem {
  imageSrc: string;
}

const HALLOWEEN_READING_FILL_CATALOG: HalloweenReadingFillItem[] = [
  {
    id: "hw-read-bingo",
    icon: "🎃",
    imageSrc: "/assets/halloween/toy-pumpkin-basket.webp",
    fullWord: "Bí ngô",
    maskedPrefix: "Bí ng...",
    stemBeforeBlank: "Bí ng",
    correctRhyme: "ô",
    distractors: ["ơ", "o", "a"],
    phonicsHint: "Bí + ng-ô = Bí ngô",
    promptHint: "Giỏ đèn phát sáng đêm hội là quả Bí ngô 🎃",
  },
  {
    id: "hw-read-keo",
    icon: "🍬",
    imageSrc: "/assets/halloween/sweet-candies.webp",
    fullWord: "Kẹo ngọt",
    maskedPrefix: "K... ngọt",
    stemBeforeBlank: "K",
    correctRhyme: "ẹo",
    distractors: ["em", "éo", "êu"],
    phonicsHint: "K-ẹo = Kẹo ngọt",
    promptHint: "Đêm hội Trick or Treat các bạn chia nhau Kẹo ngọt 🍬",
  },
  {
    id: "hw-read-laudai",
    icon: "🏰",
    imageSrc: "/assets/halloween/decor-castle.webp",
    fullWord: "Lâu đài",
    maskedPrefix: "L... đài",
    stemBeforeBlank: "L",
    correctRhyme: "âu",
    distractors: ["á", "ăn", "ên"],
    phonicsHint: "L-âu = Lâu đài",
    promptHint: "Dưới ánh trăng tròn có tòa Lâu đài phép thuật 🏰",
  },
  {
    id: "hw-read-denlong",
    icon: "🏮",
    imageSrc: "/assets/halloween/toy-lantern.webp",
    fullWord: "Đèn lồng",
    maskedPrefix: "Đ... lồng",
    stemBeforeBlank: "Đ",
    correctRhyme: "èn",
    distractors: ["àn", "êm", "ón"],
    phonicsHint: "Đ-èn = Đèn lồng",
    promptHint: "Chiếc Đèn lồng tím tỏa sáng lung linh 🏮",
  },
  {
    id: "hw-read-choibay",
    icon: "🧹",
    imageSrc: "/assets/halloween/toy-broom.webp",
    fullWord: "Chổi bay",
    maskedPrefix: "Ch... bay",
    stemBeforeBlank: "Ch",
    correctRhyme: "ổi",
    distractors: ["ơi", "ải", "im"],
    phonicsHint: "Ch-ổi = Chổi bay",
    promptHint: "Chiếc Chổi bay thắt nơ tím của phù thủy nhỏ 🧹",
  },
  {
    id: "hw-read-meoden",
    icon: "🐈‍⬛",
    imageSrc: "/assets/halloween/toy-black-cat.webp",
    fullWord: "Mèo đen",
    maskedPrefix: "M... đen",
    stemBeforeBlank: "M",
    correctRhyme: "èo",
    distractors: ["ây", "ưa", "ũ"],
    phonicsHint: "M-èo = Mèo đen",
    promptHint: "Bạn Mèo đen đeo nơ cam dễ thương 🐈‍⬛",
  },
  {
    id: "hw-read-mutim",
    icon: "🎩",
    imageSrc: "/assets/halloween/hat-wizard-purple.webp",
    fullWord: "Mũ tím",
    maskedPrefix: "M... tím",
    stemBeforeBlank: "M",
    correctRhyme: "ũ",
    distractors: ["ây", "ưa", "ắt"],
    phonicsHint: "M-ũ = Mũ tím",
    promptHint: "Chiếc Mũ tím đính ngôi sao vàng của phù thủy 🎩",
  },
  {
    id: "hw-read-demtrang",
    icon: "🌙",
    imageSrc: "/assets/halloween/decor-moon.webp",
    fullWord: "Đêm trăng",
    maskedPrefix: "Đêm tr...",
    stemBeforeBlank: "Đêm tr",
    correctRhyme: "ăng",
    distractors: ["ắng", "ong", "ên"],
    phonicsHint: "Tr-ăng = Đêm trăng",
    promptHint: "Bầu trời Đêm trăng sáng rực rỡ 🌙",
  },
  {
    id: "hw-read-banhkem",
    icon: "🎂",
    imageSrc: "/assets/halloween/sweet-ghost-cake.webp",
    fullWord: "Bánh kem",
    maskedPrefix: "B... kem",
    stemBeforeBlank: "B",
    correctRhyme: "ánh",
    distractors: ["óng", "ông", "àn"],
    phonicsHint: "B-ánh = Bánh kem",
    promptHint: "Chiếc Bánh kem trang trí ma nhỏ ngọt ngào 🎂",
  },
];

interface HalloweenEnglishBoxItem extends EnglishItemEntry {
  imageSrc: string;
}

const HALLOWEEN_ENGLISH_BOX_CATALOG: HalloweenEnglishBoxItem[] = [
  {
    id: "hw-eng-pumpkin",
    icon: "🎃",
    imageSrc: "/assets/halloween/toy-pumpkin-basket.webp",
    vietnameseName: "Quả bí ngô",
    englishWord: "Pumpkin",
    phoneticHint: "/ˈpʌmp.kɪn/ — Quả bí ngô",
  },
  {
    id: "hw-eng-candy",
    icon: "🍬",
    imageSrc: "/assets/halloween/sweet-candies.webp",
    vietnameseName: "Viên kẹo ngọt",
    englishWord: "Candy",
    phoneticHint: "/ˈkæn.di/ — Kẹo ngọt",
  },
  {
    id: "hw-eng-ghost",
    icon: "👻",
    imageSrc: "/assets/halloween/toy-ghost.webp",
    vietnameseName: "Bạn ma nhỏ",
    englishWord: "Ghost",
    phoneticHint: "/ɡoʊst/ — Bạn ma nhỏ",
  },
  {
    id: "hw-eng-castle",
    icon: "🏰",
    imageSrc: "/assets/halloween/decor-castle.webp",
    vietnameseName: "Lâu đài",
    englishWord: "Castle",
    phoneticHint: "/ˈkæs.əl/ — Lâu đài",
  },
  {
    id: "hw-eng-hat",
    icon: "🎩",
    imageSrc: "/assets/halloween/hat-wizard-purple.webp",
    vietnameseName: "Mũ phù thủy",
    englishWord: "Witch Hat",
    phoneticHint: "/wɪtʃ hæt/ — Mũ phù thủy",
  },
  {
    id: "hw-eng-broom",
    icon: "🧹",
    imageSrc: "/assets/halloween/toy-broom.webp",
    vietnameseName: "Chổi bay",
    englishWord: "Broom",
    phoneticHint: "/bruːm/ — Chổi bay",
  },
  {
    id: "hw-eng-bat",
    icon: "🦇",
    imageSrc: "/assets/halloween/toy-bat.webp",
    vietnameseName: "Chú dơi nhỏ",
    englishWord: "Bat",
    phoneticHint: "/bæt/ — Chú dơi nhỏ",
  },
  {
    id: "hw-eng-cat",
    icon: "🐈‍⬛",
    imageSrc: "/assets/halloween/toy-black-cat.webp",
    vietnameseName: "Mèo đen",
    englishWord: "Black Cat",
    phoneticHint: "/blæk kæt/ — Mèo đen",
  },
  {
    id: "hw-eng-lantern",
    icon: "🏮",
    imageSrc: "/assets/halloween/toy-lantern.webp",
    vietnameseName: "Đèn lồng",
    englishWord: "Lantern",
    phoneticHint: "/ˈlæn.tɚn/ — Đèn lồng",
  },
  {
    id: "hw-eng-wand",
    icon: "🪄",
    imageSrc: "/assets/halloween/toy-wand.webp",
    vietnameseName: "Đũa thần ngôi sao",
    englishWord: "Magic Wand",
    phoneticHint: "/ˈmædʒ.ɪk wɑːnd/ — Đũa thần",
  },
  {
    id: "hw-eng-cupcake",
    icon: "🧁",
    imageSrc: "/assets/halloween/sweet-cupcakes.webp",
    vietnameseName: "Bánh cupcake",
    englishWord: "Cupcake",
    phoneticHint: "/ˈkʌp.keɪk/ — Bánh cupcake",
  },
  {
    id: "hw-eng-moon",
    icon: "🌙",
    imageSrc: "/assets/halloween/decor-moon.webp",
    vietnameseName: "Vầng trăng khuyết",
    englishWord: "Moon",
    phoneticHint: "/muːn/ — Mặt trăng",
  },
];

const HALLOWEEN_CUTE_POEMS: DailyPoemVisual[] = [
  {
    id: "hw-poem-1",
    badge: "🎃 Thơ Đêm Hội Halloween #1",
    title: "Đêm Hội Bí Ngô Sáng",
    icon: "🎃",
    imageSrc: "/assets/halloween/char-nam-wizard.webp",
    lines: [
      "Đêm trăng tròn lấp lánh,",
      "Bí ngô cười thật tươi,",
      "Nấm khoác áo phù thủy,",
      "Rước đèn cùng mọi người!",
    ],
    moralQuote:
      "🍬 Lời chúc đêm hội: Chúc Phù Thủy Nhỏ Nấm có một mùa lễ hội Halloween ngập tràn tiếng cười và kẹo ngọt!",
  },
  {
    id: "hw-poem-2",
    badge: "🎃 Thơ Đêm Hội Halloween #2",
    title: "Trick or Treat Chia Kẹo",
    icon: "🍬",
    imageSrc: "/assets/halloween/sweet-candy-bowl.webp",
    lines: [
      "Gõ cửa từng ngôi nhà,",
      "Giỏ bí ngô đầy quà,",
      "Kẹo thơm chia các bạn,",
      "Tiếng cười vang ngân nga!",
    ],
    moralQuote:
      "🍬 Lời chúc đêm hội: Những viên kẹo sẽ ngọt gấp đôi khi Nấm biết chia sẻ cùng bố mẹ và các bạn Sanrio!",
  },
  {
    id: "hw-poem-3",
    badge: "🎃 Thơ Đêm Hội Halloween #3",
    title: "Lâu Đài Trăng Phép Thuật",
    icon: "🏰",
    imageSrc: "/assets/halloween/decor-castle.webp",
    lines: [
      "Cinnamoroll bay cao,",
      "Kuromi vẫy chào,",
      "Lâu đài lung linh sáng,",
      "Đón bé Nấm bước vào!",
    ],
    moralQuote:
      "🍬 Lời chúc đêm hội: Dũng cảm khám phá điều mới giúp Nấm mở ra bao phép màu kỳ diệu!",
  },
  {
    id: "hw-poem-4",
    badge: "🎃 Thơ Đêm Hội Halloween #4",
    title: "Sách Phép Thuật Ngọt Ngào",
    icon: "📚",
    imageSrc: "/assets/halloween/decor-spellbooks.webp",
    lines: [
      "Đũa thần điểm ngôi sao,",
      "Sách phép thuật ngọt ngào,",
      "Học trăm điều kỳ diệu,",
      "Nấm giỏi giang biết bao!",
    ],
    moralQuote:
      "🍬 Lời chúc đêm hội: Mỗi chữ cái và con số Nấm học được chính là một phép thuật tuyệt vời!",
  },
];

// =============================================================================
// BỘ SINH ĐỀ ĐỘNG THEO TỪNG TRẠM (MỖI LẦN BẤM LÀ 1 CÂU HỎI MỚI 100%)
// =============================================================================
export function generateDynamicQuestionForHotspot(
  room: SanrioBedroomConfig,
  hotspot: BedroomHotspotConfig,
  visitSeed: number,
): BedroomQuestionItem {
  const station = hotspot.stationType;

  // ---------------------------------------------------------------------------
  // TRẠM 1: HÌNH DẠNG TRONG 4 QUYỂN SÁCH / 4 MÓN ĐỒ (SHAPES)
  // ---------------------------------------------------------------------------
  if (station === "shape") {
    const target = pickRandom(SHAPE_BOOK_CATALOG);
    const distractors = shuffleArray(
      SHAPE_BOOK_CATALOG.filter((s) => s.id !== target.id),
    ).slice(0, 3);
    const fourBooks = shuffleArray([target, ...distractors]);
    const isHw = Boolean(room.isHalloweenTheme);

    return {
      id: `dyn-shape-${target.id}-${Date.now()}`,
      skill: "shape",
      skillLabel: isHw
        ? "🎃 Sách Phép Thuật Hình Khối"
        : "Hình dạng & Tinh mắt",
      bubblePrompt: isHw
        ? `Đêm hội Halloween! Cùng ${room.characterName} tìm cuốn Sách Phép Thuật có ${target.shapeName} để nhận Kẹo nhé! ${target.icon}`
        : `Cùng ${room.characterName} tìm cuốn sách có ${target.shapeName} nhé! ${target.icon}`,
      questionTitle: isHw
        ? `Đâu là cuốn Sách Phép Thuật có ${target.shapeName}?`
        : `Đâu là cuốn sách có ${target.shapeName}?`,
      options: fourBooks.map((bk) => ({
        id: bk.id,
        label: bk.bookLabel,
        icon: bk.icon,
        visualStyle: "book",
        cardBg: bk.cardBg,
        cardBorder: bk.cardBorder,
        ttsLang: "vi-VN",
        ttsText: bk.bookLabel,
      })),
      correctOptionId: target.id,
      praiseTitle: isHw
        ? "Úm ba la! Đúng cuốn Sách Phép Thuật rồi! 🍬"
        : "Tuyệt vời! Bạn tìm đúng rồi! 🎉",
      praiseSubtitle: isHw
        ? `Nấm tìm đúng ${target.bookLabel} có ${target.shapeName} ${target.icon} và nhận được 1 Viên Kẹo Halloween!`
        : `Đó chính là ${target.bookLabel} có ${target.shapeName} ${target.icon}!`,
    };
  }

  // ---------------------------------------------------------------------------
  // TRẠM 2: TOÁN HỌC TÌNH HUỐNG TRÊN BÀN / ĐĨA BÁNH (SITUATIONAL MATH)
  // ---------------------------------------------------------------------------
  if (station === "math") {
    const modes: Array<"add" | "subtract" | "count"> = [
      "subtract",
      "add",
      "count",
    ];
    const mode = modes[visitSeed % modes.length];
    const isHw = Boolean(room.isHalloweenTheme);
    const hwTreat = isHw
      ? HALLOWEEN_MATH_TREATS[visitSeed % HALLOWEEN_MATH_TREATS.length]
      : undefined;
    const icon = hwTreat ? hwTreat.icon : room.mathTreatIcon;
    const itemImageSrc = hwTreat ? hwTreat.imageSrc : undefined;
    const treat = hwTreat ? hwTreat.name : room.mathTreatName;

    let initialCount = 4;
    let deltaCount = 2;
    let correctAnswer = 6;
    let bubblePrompt = "";
    let questionTitle = "";
    let formula = "";

    if (mode === "subtract") {
      // Bài toán: Trên bàn có A cái, Nấm ăn mất B cái, hỏi còn lại bao nhiêu?
      initialCount = 4 + Math.floor(Math.random() * 5); // 4..8
      deltaCount = 1 + Math.floor(Math.random() * (initialCount - 2)); // 1..(initialCount-2)
      correctAnswer = initialCount - deltaCount;
      bubblePrompt = isHw
        ? `Trick or Treat! Trong giỏ đang có ${initialCount} ${treat}, Nấm và Kuromi ăn mất ${deltaCount} cái rồi! Đố Nấm còn lại mấy cái? 🎃`
        : `Trên bàn đang có ${initialCount} ${treat}, Nấm ăn mất ${deltaCount} cái rồi! Đố Nấm trên đĩa còn lại mấy cái? ${icon}`;
      questionTitle = `Có ${initialCount} ${treat}, ăn mất ${deltaCount} cái thì còn lại mấy?`;
      formula = `${initialCount} - ${deltaCount} = ?`;
    } else if (mode === "add") {
      // Bài toán: Trên bàn có A cái, mẹ cho thêm B cái, hỏi có tất cả bao nhiêu?
      initialCount = 2 + Math.floor(Math.random() * 4); // 2..5
      deltaCount = 1 + Math.floor(Math.random() * 4); // 1..4
      correctAnswer = initialCount + deltaCount;
      bubblePrompt = isHw
        ? `Trong giỏ bí ngô của Nấm có ${initialCount} ${treat}, Cinnamoroll bay xuống tặng thêm ${deltaCount} cái nữa! Hỏi có tất cả bao nhiêu cái? 🍬`
        : `Trên đĩa có ${initialCount} ${treat}, mẹ cho Nấm thêm ${deltaCount} cái nữa! Hỏi có tất cả bao nhiêu ${treat}? ${icon}`;
      questionTitle = isHw
        ? `Có ${initialCount} ${treat}, được tặng thêm ${deltaCount} cái là mấy cái?`
        : `Có ${initialCount} ${treat}, mẹ cho thêm ${deltaCount} cái là mấy cái?`;
      formula = `${initialCount} + ${deltaCount} = ?`;
    } else {
      // Bài toán: Đếm số bánh vừa bày ra trên đĩa trong bảng
      initialCount = 3 + Math.floor(Math.random() * 6); // 3..8
      deltaCount = 0;
      correctAnswer = initialCount;
      bubblePrompt = isHw
        ? `Đêm hội Halloween vừa bày một khay ${treat}! Đố Nấm đếm xem trên khay có bao nhiêu cái để nhận Kẹo nhé! 🎃`
        : `${room.characterName} vừa bày một đĩa ${treat} mới tinh! Đố Nấm đếm xem trên đĩa có bao nhiêu cái nhé! ${icon}`;
      questionTitle = `Có bao nhiêu ${treat} trên đĩa?`;
      formula = `Đếm cùng ${room.characterName} nhé!`;
    }

    // Sinh 4 đáp án số gần nhau bao gồm correctAnswer
    const numberSet = new Set<number>([correctAnswer]);
    const offsets = [-2, -1, 1, 2, 3, -3];
    for (const off of shuffleArray(offsets)) {
      if (numberSet.size >= 4) break;
      const cand = correctAnswer + off;
      if (cand >= 1 && cand <= 10) {
        numberSet.add(cand);
      }
    }
    const sortedNumbers = Array.from(numberSet).sort((a, b) => a - b);

    return {
      id: `dyn-math-${mode}-${correctAnswer}-${Date.now()}`,
      skill: "math",
      skillLabel: isHw ? "🍬 Toán Đêm Hội Trick-or-Treat" : "Toán Tình Huống Vui",
      bubblePrompt,
      questionTitle,
      highlightFormula: formula,
      mathVisual: {
        mode,
        itemIcon: icon,
        itemImageSrc,
        itemName: treat,
        initialCount,
        deltaCount,
      },
      options: sortedNumbers.map((num) => ({
        id: `num-${num}`,
        label: String(num),
        visualStyle: "number",
        ttsLang: "vi-VN",
        ttsText: `Số ${num}`,
      })),
      correctOptionId: `num-${correctAnswer}`,
      praiseTitle: isHw
        ? "Siêu quá Phù Thủy Nấm ơi! +1 Kẹo Ngọt! 🍬"
        : "Giỏi quá! Nấm tính chuẩn 100%! 🎉",
      praiseSubtitle:
        mode === "subtract"
          ? `Trên bàn có ${initialCount} cái, ăn ${deltaCount} cái thì còn lại đúng ${correctAnswer} ${treat}!`
          : mode === "add"
            ? `Có ${initialCount} cái thêm ${deltaCount} cái là được ${correctAnswer} ${treat}!`
            : `Trên đĩa có đúng ${correctAnswer} ${treat} thơm ngon!`,
    };
  }

  // ---------------------------------------------------------------------------
  // TRẠM 3: HỌC ĐỌC ĐIỀN NỐT CHỮ KHUYẾT (ICON MÂY -> M... + 4 ĐÁP ÁN)
  // ---------------------------------------------------------------------------
  if (station === "reading") {
    const isHw = Boolean(room.isHalloweenTheme);
    const catalog = isHw
      ? HALLOWEEN_READING_FILL_CATALOG
      : READING_FILL_CATALOG;
    const item = catalog[visitSeed % catalog.length] as HalloweenReadingFillItem;
    const allChoices = shuffleArray([item.correctRhyme, ...item.distractors]);

    return {
      id: `dyn-read-${item.id}-${Date.now()}`,
      skill: "reading",
      skillLabel: isHw ? "🎃 Đánh Vần Đêm Hội Halloween" : "Điền Vần & Đánh Vần",
      bubblePrompt: `${item.promptHint}! Đố Nấm điền tiếp vào chữ "${item.maskedPrefix}" để tạo thành từ "${item.fullWord}" nhé!`,
      questionTitle: `Điền tiếp phần còn thiếu cho chữ "${item.maskedPrefix}":`,
      highlightFormula: item.phonicsHint,
      readingVisual: {
        icon: item.icon,
        imageSrc: item.imageSrc,
        fullWord: item.fullWord,
        maskedPrefix: item.maskedPrefix,
        stemBeforeBlank: item.stemBeforeBlank,
        phonicsHint: item.phonicsHint,
      },
      options: allChoices.map((rhyme) => {
        const previewWord = `${item.stemBeforeBlank}${rhyme}`;
        return {
          id: `rhyme-${rhyme}`,
          label: `...${rhyme}`,
          subLabel: `Ghép: ${previewWord}`,
          visualStyle: "word",
          ttsLang: "vi-VN",
          ttsText: `${rhyme}. ${previewWord}`,
        };
      }),
      correctOptionId: `rhyme-${item.correctRhyme}`,
      praiseTitle: isHw
        ? `Trick or Treat! "${item.fullWord}"! +1 Kẹo! 🍬`
        : `Tuyệt vời! "${item.fullWord}"! 🎉`,
      praiseSubtitle: `${item.phonicsHint}: Em bé Nấm ghép vần siêu chuẩn luôn!`,
    };
  }

  // ---------------------------------------------------------------------------
  // TRẠM 4: TIẾNG ANH ĐỒ VẬT Ở CHIẾC HỘP / RƯƠNG TRONG PHÒNG
  // ---------------------------------------------------------------------------
  if (station === "english") {
    const isHw = Boolean(room.isHalloweenTheme);
    const catalog = isHw ? HALLOWEEN_ENGLISH_BOX_CATALOG : ENGLISH_BOX_CATALOG;
    const target = catalog[
      visitSeed % catalog.length
    ] as HalloweenEnglishBoxItem;
    const distractors = shuffleArray(
      catalog.filter((e) => e.id !== target.id),
    ).slice(0, 3) as HalloweenEnglishBoxItem[];
    const choices = shuffleArray([target, ...distractors]);

    return {
      id: `dyn-eng-${target.id}-${Date.now()}`,
      skill: "english",
      skillLabel: isHw ? "🎃 Tiếng Anh Lễ Hội Halloween" : "Tiếng Anh Đồ Vật",
      bubblePrompt: isHw
        ? `Trick or Treat! Bạn nhỏ vừa tìm thấy "${target.vietnameseName}" ${target.icon}! Đố Nấm trong Tiếng Anh gọi là gì để nhận Kẹo nhé?`
        : `Oa, trong hộp bí mật có "${target.vietnameseName}" ${target.icon}! Đố Nấm trong Tiếng Anh "${target.vietnameseName}" gọi là gì?`,
      questionTitle: `"${target.vietnameseName}" trong Tiếng Anh là từ nào?`,
      englishVisual: {
        icon: target.icon,
        imageSrc: target.imageSrc,
        vietnameseName: target.vietnameseName,
        englishWord: target.englishWord,
        phoneticHint: target.phoneticHint,
      },
      options: choices.map((c) => ({
        id: c.id,
        label: c.englishWord,
        subLabel: c.vietnameseName,
        icon: c.icon,
        imageSrc: c.imageSrc,
        visualStyle: "english",
        ttsLang: "en-US",
        ttsText: c.englishWord,
      })),
      correctOptionId: target.id,
      praiseTitle: isHw
        ? `Happy Halloween! ${target.englishWord}! +1🍬`
        : `Awesome! ${target.englishWord}! 🌟`,
      praiseSubtitle: `${target.icon} ${target.englishWord} nghĩa là ${target.vietnameseName}!`,
    };
  }

  // ---------------------------------------------------------------------------
  // TRẠM 5: QUYỂN SÁCH / GIÁ SÁCH — THƠ & QUOTE ĐÁNG YÊU THAY ĐỔI HÀNG NGÀY
  // ---------------------------------------------------------------------------
  const isHw = Boolean(room.isHalloweenTheme);
  const poemPool = isHw ? HALLOWEEN_CUTE_POEMS : DAILY_CUTE_POEMS;
  const dayOfYear = Math.floor(Date.now() / 86_400_000);
  const poemIdx = (dayOfYear + visitSeed) % poemPool.length;
  const poem = poemPool[poemIdx];

  return {
    id: `dyn-poem-${poem.id}-${Date.now()}`,
    skill: "poem",
    skillLabel: isHw
      ? "🎃 Sách Phép Thuật Thơ Đêm Hội"
      : "Góc Đọc Thơ & Quote Hàng Ngày",
    bubblePrompt: isHw
      ? `Cùng ${room.characterName} mở Sách Phép Thuật đêm Halloween và đọc to bài thơ "${poem.title}" để nhận Kẹo nhé! 📖🍬`
      : `Cùng ${room.characterName} mở trang sách hôm nay và đọc to bài thơ "${poem.title}" nhé! 📖`,
    questionTitle: poem.title,
    poemVisual: poem,
    options: [],
    correctOptionId: "poem-read-done",
    praiseTitle: isHw
      ? "Phép thuật ngân vang! Tặng Nấm +1 Viên Kẹo! 🍬"
      : "Giọng đọc của Nấm đáng yêu quá! 🎉",
    praiseSubtitle: isHw
      ? `${room.characterName} tặng Nấm 1 Viên Kẹo Halloween Ngọt Ngào nhé!`
      : `${room.characterName} tặng Nấm 1 Ngôi Sao Chăm Đọc Sách nhé!`,
  };
}

// =============================================================================
// CẤU HÌNH 6 PHÒNG NGỦ SANRIO (MỖI PHÒNG 5 NGÔI SAO = ĐỦ 5 TRẠM SÁNG TẠO)
// =============================================================================
export const SANRIO_BEDROOMS: SanrioBedroomConfig[] = [
  // 0. MAP SỰ KIỆN ĐẶC BIỆT MÙA LỄ HỘI HALLOWEEN: BÉ NẤM PHÙ THỦY & HỘI BẠN SANRIO
  {
    id: "halloween",
    isHalloweenTheme: true,
    rewardSubjectId: "storybook",
    characterName: "Phù Thủy Nấm & Hội Bạn",
    roomTitle: "Lâu Đài Đêm Hội Halloween Trick-or-Treat",
    roomSubtitle:
      "Chạm vào 5 Viên Kẹo Halloween phát sáng để giải đố đêm hội và mở Giỏ Bí Ngô nhận Bộ Sticker Halloween!",
    badgeText: "🎃 SỰ KIỆN HALLOWEEN · Săn 5 Kẹo",
    roomImage: "/assets/bedrooms/halloween-room.webp",
    mascotAskImage: "/assets/halloween/char-nam-wizard.webp",
    mascotHappyImage: "/assets/halloween/char-cinnamoroll-wizard.webp",
    mathTreatIcon: "🍬",
    mathTreatName: "viên kẹo Halloween",
    welcomeSpeech:
      "Trick or Treat! Chào mừng bé Nấm đến Lâu Đài Đêm Hội Halloween! Nấm chạm vào 5 Viên Kẹo phát sáng để giải đố và mở Giỏ Bí Ngô nhận Bộ Sticker Halloween nhé!",
    chestPrompt:
      "Thu thập đủ 5 Viên Kẹo Halloween để mở Giỏ Bí Ngô nhận 1 Nhân Vật + 1 Đồ Chơi Halloween nhé!",
    chestVictorySpeech:
      "Happy Halloween! Bé Nấm đã thu thập đủ 5 Viên Kẹo và mở khóa Bộ Sticker Halloween siêu dễ thương!",
    palette: {
      btnGradient: "linear-gradient(180deg, #FB923C 0%, #EA580C 100%)",
      btnShadow: "0 6px 0 #9A3412, 0 12px 24px rgba(234, 88, 12, 0.44)",
      btnBorder: "#FED7AA",
      topPillBg: "rgba(46, 16, 101, 0.86)",
      cardBg: "rgba(255, 251, 245, 0.97)",
      cardBorder: "#FDBA74",
      titleColor: "#4C1D95",
      subTextColor: "#7C2D12",
      selectedBorder: "#F97316",
      selectedGlow:
        "0 0 0 4px rgba(249, 115, 22, 0.42), 0 12px 26px rgba(124, 58, 237, 0.32)",
      selectedBg: "linear-gradient(180deg, #FFF7ED 0%, #FFEDD5 100%)",
      primaryHex: "#7C3AED",
      softTintHex: "#FAF5FF",
      starHex: "#FB923C",
    },
    hotspots: [
      {
        id: "hw-sign-trick-or-treat",
        name: "Bảng gỗ Trick or Treat",
        icon: "🪧",
        stationType: "reading",
        x: 11,
        y: 34,
        zoomOriginX: 14,
        zoomOriginY: 34,
        zoomScale: 1.75,
      },
      {
        id: "hw-flying-cinna",
        name: "Cinnamoroll & Kuromi Phép Thuật",
        icon: "🧙‍♂️",
        stationType: "english",
        x: 41,
        y: 23,
        zoomOriginX: 45,
        zoomOriginY: 25,
        zoomScale: 1.72,
      },
      {
        id: "hw-nam-star-pumpkin",
        name: "Giỏ Bí Ngô Ánh Sao Của Nấm",
        icon: "🎃",
        stationType: "math",
        x: 47,
        y: 80,
        zoomOriginX: 48,
        zoomOriginY: 78,
        zoomScale: 1.76,
      },
      {
        id: "hw-moon-castle",
        name: "Lâu Đài Đêm Trăng Tròn",
        icon: "🏰",
        stationType: "shape",
        x: 74,
        y: 20,
        zoomOriginX: 74,
        zoomOriginY: 22,
        zoomScale: 1.75,
      },
      {
        id: "hw-lantern-garden",
        name: "Đèn Lồng & Vườn Bí Ngô",
        icon: "📖",
        stationType: "poem",
        x: 91,
        y: 58,
        zoomOriginX: 88,
        zoomOriginY: 58,
        zoomScale: 1.76,
      },
    ],
  },

  // 1. CINNAMOROLL
  {
    id: "cinnamoroll",
    rewardSubjectId: "music",
    characterName: "Cinnamoroll",
    roomTitle: "Phòng Ngủ Mây Trắng Cinnamoroll",
    roomSubtitle: "Khám phá 5 ngôi sao bí mật cùng Cinnamoroll trên lâu đài mây!",
    badgeText: "☁️ Mây Xanh & Sao Vàng",
    roomImage: "/assets/bedrooms/cinnamoroll-room.webp",
    mascotAskImage: "/assets/rewards/sticker-music-2.webp",
    mascotHappyImage: "/assets/rewards/sticker-music-6.webp",
    mathTreatIcon: "🧁",
    mathTreatName: "chiếc bánh mây",
    welcomeSpeech:
      "Chạm vào 5 ngôi sao lấp lánh trong phòng Cinnamoroll để khám phá bí mật và nhận Sticker nhé!",
    chestPrompt: "Thu thập đủ 5 ngôi sao để mở rương quà và nhận 1 Sticker mới nhé!",
    chestVictorySpeech:
      "Tuyệt vời! Bé Nấm đã thu thập đủ 5 ngôi sao trong phòng Cinnamoroll rồi!",
    palette: {
      btnGradient: "linear-gradient(180deg, #74C6FF 0%, #4495E8 100%)",
      btnShadow: "0 6px 0 #2D74C4, 0 12px 24px rgba(68, 149, 232, 0.38)",
      btnBorder: "#A6DCFF",
      topPillBg: "rgba(32, 54, 86, 0.78)",
      cardBg: "rgba(252, 254, 255, 0.96)",
      cardBorder: "#D6ECFF",
      titleColor: "#1F3B5C",
      subTextColor: "#4A6B8C",
      selectedBorder: "#FFD147",
      selectedGlow:
        "0 0 0 4px rgba(255, 209, 71, 0.38), 0 12px 26px rgba(255, 193, 37, 0.32)",
      selectedBg: "linear-gradient(180deg, #FFFDF5 0%, #FFF5D6 100%)",
      primaryHex: "#4A9FF5",
      softTintHex: "#EBF5FF",
      starHex: "#FFC833",
    },
    hotspots: [
      {
        id: "cinna-bookshelf",
        name: "Kệ sách",
        icon: "📚",
        stationType: "shape",
        x: 41,
        y: 25,
        zoomOriginX: 41,
        zoomOriginY: 25,
        zoomScale: 1.72,
      },
      {
        id: "cinna-teatable",
        name: "Bàn trà",
        icon: "🍵",
        stationType: "math",
        x: 60,
        y: 65,
        zoomOriginX: 58,
        zoomOriginY: 65,
        zoomScale: 1.8,
      },
      {
        id: "cinna-canopy",
        name: "Giường mây",
        icon: "☁️",
        stationType: "reading",
        x: 20,
        y: 28,
        zoomOriginX: 20,
        zoomOriginY: 28,
        zoomScale: 1.72,
      },
      {
        id: "cinna-window",
        name: "Khinh khí cầu",
        icon: "🎈",
        stationType: "english",
        x: 88,
        y: 15,
        zoomOriginX: 84,
        zoomOriginY: 18,
        zoomScale: 1.75,
      },
      {
        id: "cinna-openbook",
        name: "Cuốn sách mở",
        icon: "📖",
        stationType: "poem",
        x: 41,
        y: 85,
        zoomOriginX: 41,
        zoomOriginY: 84,
        zoomScale: 1.78,
      },
    ],
  },

  // 2. HELLO KITTY
  {
    id: "hellokitty",
    rewardSubjectId: "reading",
    characterName: "Hello Kitty",
    roomTitle: "Phòng Ngủ Nơ Hồng Hello Kitty",
    roomSubtitle: "Khám phá 5 ngôi sao bí mật cùng Hello Kitty và nhận Sticker xinh!",
    badgeText: "🎀 Hồng Phấn & Nơ Xinh",
    roomImage: "/assets/bedrooms/hellokitty-room.webp",
    mascotAskImage: "/assets/rewards/sticker-reading-3.webp",
    mascotHappyImage: "/assets/rewards/sticker-reading-1.webp",
    mathTreatIcon: "🧁",
    mathTreatName: "chiếc bánh dâu hồng",
    welcomeSpeech:
      "Chào Nấm! Chạm vào 5 ngôi sao lấp lánh trong phòng Hello Kitty để khám phá nhé!",
    chestPrompt: "Thu thập đủ 5 ngôi sao để mở hộp quà nơ hồng và nhận 1 Sticker mới nhé!",
    chestVictorySpeech:
      "Hoan hô Nấm! Bạn đã thu thập đủ 5 ngôi sao trong phòng Hello Kitty rồi!",
    palette: {
      btnGradient: "linear-gradient(180deg, #FF8EB5 0%, #EA5289 100%)",
      btnShadow: "0 6px 0 #C23368, 0 12px 24px rgba(234, 82, 137, 0.36)",
      btnBorder: "#FFC2D9",
      topPillBg: "rgba(88, 32, 58, 0.78)",
      cardBg: "rgba(255, 252, 254, 0.96)",
      cardBorder: "#FFD6E6",
      titleColor: "#5C213B",
      subTextColor: "#8E4A67",
      selectedBorder: "#FFCA3A",
      selectedGlow:
        "0 0 0 4px rgba(255, 202, 58, 0.4), 0 12px 26px rgba(240, 101, 149, 0.28)",
      selectedBg: "linear-gradient(180deg, #FFFDF5 0%, #FFF3D1 100%)",
      primaryHex: "#EA5289",
      softTintHex: "#FFF0F5",
      starHex: "#FFC833",
    },
    hotspots: [
      {
        id: "kitty-shelf",
        name: "Kệ sách hồng",
        icon: "📚",
        stationType: "poem",
        x: 43,
        y: 24,
        zoomOriginX: 43,
        zoomOriginY: 24,
        zoomScale: 1.75,
      },
      {
        id: "kitty-window",
        name: "Bàn hoa Tulip",
        icon: "🌷",
        stationType: "math",
        x: 15,
        y: 44,
        zoomOriginX: 16,
        zoomOriginY: 44,
        zoomScale: 1.75,
      },
      {
        id: "kitty-bed",
        name: "Giường Nơ Hồng",
        icon: "🎀",
        stationType: "reading",
        x: 56,
        y: 46,
        zoomOriginX: 55,
        zoomOriginY: 46,
        zoomScale: 1.7,
      },
      {
        id: "kitty-mirror",
        name: "Bàn gương",
        icon: "🪞",
        stationType: "shape",
        x: 91,
        y: 34,
        zoomOriginX: 88,
        zoomOriginY: 35,
        zoomScale: 1.78,
      },
      {
        id: "kitty-box",
        name: "Hộp quà hồng",
        icon: "🎁",
        stationType: "english",
        x: 79,
        y: 58,
        zoomOriginX: 78,
        zoomOriginY: 58,
        zoomScale: 1.78,
      },
    ],
  },

  // 3. MY MELODY
  {
    id: "mymelody",
    rewardSubjectId: "math",
    characterName: "My Melody",
    roomTitle: "Phòng Ngủ Hoa Hồng My Melody",
    roomSubtitle: "Cùng My Melody tìm 5 ngôi sao ẩn và mở khóa Sticker đáng yêu!",
    badgeText: "🌸 Hoa Hồng & Ren Trắng",
    roomImage: "/assets/bedrooms/mymelody-room.webp",
    mascotAskImage: "/assets/rewards/sticker-math-4.webp",
    mascotHappyImage: "/assets/rewards/sticker-math-1.webp",
    mathTreatIcon: "🍓",
    mathTreatName: "chiếc bánh kem dâu",
    welcomeSpeech:
      "Chào bạn nhỏ! Cùng My Melody tìm 5 ngôi sao ẩn trong căn phòng hoa hồng nhé!",
    chestPrompt: "Thu thập đủ 5 ngôi sao để mở rương quà hoa hồng và nhận 1 Sticker nhé!",
    chestVictorySpeech:
      "Tuyệt quá! My Melody tặng Nấm 1 Sticker mới và thật nhiều sao vàng!",
    palette: {
      btnGradient: "linear-gradient(180deg, #FF9EBB 0%, #EE5D8B 100%)",
      btnShadow: "0 6px 0 #C43B68, 0 12px 24px rgba(238, 93, 139, 0.36)",
      btnBorder: "#FFD0DF",
      topPillBg: "rgba(92, 36, 56, 0.78)",
      cardBg: "rgba(255, 253, 254, 0.96)",
      cardBorder: "#FFD8E4",
      titleColor: "#5E2438",
      subTextColor: "#8C4C62",
      selectedBorder: "#FFD166",
      selectedGlow:
        "0 0 0 4px rgba(255, 209, 102, 0.42), 0 12px 26px rgba(238, 93, 139, 0.28)",
      selectedBg: "linear-gradient(180deg, #FFFDF6 0%, #FFF4D6 100%)",
      primaryHex: "#EE5D8B",
      softTintHex: "#FFF3F7",
      starHex: "#FFCA3A",
    },
    hotspots: [
      {
        id: "melody-cabinet",
        name: "Tủ sách & Búp bê",
        icon: "📚",
        stationType: "poem",
        x: 64,
        y: 31,
        zoomOriginX: 64,
        zoomOriginY: 31,
        zoomScale: 1.78,
      },
      {
        id: "melody-tea",
        name: "Bàn trà hoa",
        icon: "🍵",
        stationType: "math",
        x: 88,
        y: 76,
        zoomOriginX: 86,
        zoomOriginY: 76,
        zoomScale: 1.78,
      },
      {
        id: "melody-bed",
        name: "Giường màn hoa",
        icon: "🌸",
        stationType: "reading",
        x: 36,
        y: 56,
        zoomOriginX: 38,
        zoomOriginY: 56,
        zoomScale: 1.72,
      },
      {
        id: "melody-lamp",
        name: "Bàn đèn ngủ",
        icon: "🏮",
        stationType: "shape",
        x: 11,
        y: 46,
        zoomOriginX: 13,
        zoomOriginY: 46,
        zoomScale: 1.78,
      },
      {
        id: "melody-window",
        name: "Cửa sổ hoa xuân",
        icon: "🎁",
        stationType: "english",
        x: 86,
        y: 44,
        zoomOriginX: 84,
        zoomOriginY: 44,
        zoomScale: 1.75,
      },
    ],
  },

  // 4. KUROMI
  {
    id: "kuromi",
    rewardSubjectId: "english",
    characterName: "Kuromi",
    roomTitle: "Phòng Ngủ Tím Lavender Kuromi",
    roomSubtitle: "Giải 5 câu đố tinh nghịch của Kuromi để mở Vali Kho Báu & nhận Sticker!",
    badgeText: "💜 Tím Lavender & Ánh Sao",
    roomImage: "/assets/bedrooms/kuromi-room.webp",
    mascotAskImage: "/assets/rewards/sticker-english-2.webp",
    mascotHappyImage: "/assets/rewards/sticker-english-1.webp",
    mathTreatIcon: "🍬",
    mathTreatName: "viên kẹo tím",
    welcomeSpeech:
      "Hế lô Nấm! Vào phòng Kuromi tìm đủ 5 ngôi sao để mở vali kho báu nhận Sticker nhé!",
    chestPrompt: "Thu thập đủ 5 ngôi sao để mở chiếc vali kho báu của Kuromi nhé!",
    chestVictorySpeech:
      "Đỉnh của chóp! Nấm đã chinh phục cả 5 ngôi sao trong phòng Kuromi rồi!",
    palette: {
      btnGradient: "linear-gradient(180deg, #B589FA 0%, #845EF7 100%)",
      btnShadow: "0 6px 0 #5F3DC4, 0 12px 24px rgba(132, 94, 247, 0.38)",
      btnBorder: "#DEC9FF",
      topPillBg: "rgba(48, 28, 84, 0.80)",
      cardBg: "rgba(253, 251, 255, 0.96)",
      cardBorder: "#E5D6FF",
      titleColor: "#361E61",
      subTextColor: "#674B96",
      selectedBorder: "#FFD43B",
      selectedGlow:
        "0 0 0 4px rgba(255, 212, 59, 0.42), 0 12px 26px rgba(132, 94, 247, 0.30)",
      selectedBg: "linear-gradient(180deg, #FFFDF5 0%, #FFF3CC 100%)",
      primaryHex: "#845EF7",
      softTintHex: "#F5F0FF",
      starHex: "#FFD43B",
    },
    hotspots: [
      {
        id: "kuromi-bed",
        name: "Gối ngôi sao",
        icon: "⭐",
        stationType: "shape",
        x: 51,
        y: 69,
        zoomOriginX: 50,
        zoomOriginY: 68,
        zoomScale: 1.75,
      },
      {
        id: "kuromi-tea",
        name: "Khay trà tím",
        icon: "🍵",
        stationType: "math",
        x: 11,
        y: 68,
        zoomOriginX: 13,
        zoomOriginY: 68,
        zoomScale: 1.78,
      },
      {
        id: "kuromi-window",
        name: "Cửa sổ sao tím",
        icon: "🌙",
        stationType: "reading",
        x: 37,
        y: 26,
        zoomOriginX: 37,
        zoomOriginY: 26,
        zoomScale: 1.75,
      },
      {
        id: "kuromi-chest",
        name: "Vali kho báu",
        icon: "🧳",
        stationType: "english",
        x: 92,
        y: 80,
        zoomOriginX: 88,
        zoomOriginY: 80,
        zoomScale: 1.8,
      },
      {
        id: "kuromi-shelf",
        name: "Kệ sách Kuromi",
        icon: "📖",
        stationType: "poem",
        x: 62,
        y: 22,
        zoomOriginX: 62,
        zoomOriginY: 22,
        zoomScale: 1.78,
      },
    ],
  },

  // 5. POMPOMPURIN
  {
    id: "pompompurin",
    rewardSubjectId: "coloring",
    characterName: "Pompompurin",
    roomTitle: "Phòng Ngủ Bánh Pudding Pompompurin",
    roomSubtitle: "Khám phá 5 ngôi sao ấm áp cùng Pompompurin và nhận Sticker!",
    badgeText: "🍮 Vàng Kem & Caramel",
    roomImage: "/assets/bedrooms/pompompurin-room.webp",
    mascotAskImage: "/assets/rewards/sticker-coloring-1.webp",
    mascotHappyImage: "/assets/rewards/sticker-coloring-6.webp",
    mathTreatIcon: "🍮",
    mathTreatName: "chiếc bánh Pudding",
    welcomeSpeech:
      "Gâu gâu! Chào Nấm đến phòng Pompompurin! Tìm đủ 5 ngôi sao để nhận Sticker nhé!",
    chestPrompt: "Thu thập đủ 5 ngôi sao để mở hũ quà bánh Pudding của Purin nhé!",
    chestVictorySpeech:
      "Ngon tuyệt cú mèo! Nấm đã tìm đủ 5 ngôi sao trong phòng Pompompurin rồi!",
    palette: {
      btnGradient: "linear-gradient(180deg, #FFBE3D 0%, #E58E26 100%)",
      btnShadow: "0 6px 0 #B8680E, 0 12px 24px rgba(229, 142, 38, 0.38)",
      btnBorder: "#FFE299",
      topPillBg: "rgba(82, 48, 16, 0.80)",
      cardBg: "rgba(255, 253, 247, 0.96)",
      cardBorder: "#FFE6B3",
      titleColor: "#57340F",
      subTextColor: "#8C5B28",
      selectedBorder: "#FFA800",
      selectedGlow:
        "0 0 0 4px rgba(255, 168, 0, 0.42), 0 12px 26px rgba(229, 142, 38, 0.30)",
      selectedBg: "linear-gradient(180deg, #FFFDF5 0%, #FFF0C2 100%)",
      primaryHex: "#E58E26",
      softTintHex: "#FFF9E6",
      starHex: "#FFB800",
    },
    hotspots: [
      {
        id: "purin-table",
        name: "Bàn bánh Pudding",
        icon: "🍮",
        stationType: "math",
        x: 38,
        y: 66,
        zoomOriginX: 38,
        zoomOriginY: 66,
        zoomScale: 1.8,
      },
      {
        id: "purin-cushion",
        name: "Đệm Pudding",
        icon: "🛋️",
        stationType: "shape",
        x: 15,
        y: 64,
        zoomOriginX: 16,
        zoomOriginY: 64,
        zoomScale: 1.75,
      },
      {
        id: "purin-bed",
        name: "Giường kem bơ",
        icon: "🛏️",
        stationType: "reading",
        x: 29,
        y: 38,
        zoomOriginX: 30,
        zoomOriginY: 38,
        zoomScale: 1.72,
      },
      {
        id: "purin-shelf",
        name: "Tủ gỗ bánh quy",
        icon: "🍪",
        stationType: "english",
        x: 91,
        y: 28,
        zoomOriginX: 88,
        zoomOriginY: 28,
        zoomScale: 1.8,
      },
      {
        id: "purin-window",
        name: "Kệ sách cửa sổ",
        icon: "📖",
        stationType: "poem",
        x: 64,
        y: 26,
        zoomOriginX: 64,
        zoomOriginY: 26,
        zoomScale: 1.78,
      },
    ],
  },

  // 6. LITTLE TWIN STARS (KIKI & LALA)
  {
    id: "twinstars",
    rewardSubjectId: "storybook",
    characterName: "Kiki & Lala",
    roomTitle: "Lâu Đài Trăng Sao Kiki & Lala",
    roomSubtitle: "Thắp sáng 5 ngôi sao phép thuật cùng Kiki & Lala để nhận Sticker!",
    badgeText: "🌟 Xanh Hồng & Ánh Trăng",
    roomImage: "/assets/bedrooms/twinstars-room.webp",
    mascotAskImage: "/assets/rewards/sticker-storybook-1.webp",
    mascotHappyImage: "/assets/rewards/sticker-storybook-6.webp",
    mathTreatIcon: "🌟",
    mathTreatName: "viên kẹo ánh sao",
    welcomeSpeech:
      "Chào Nấm đến lâu đài mây của Kiki và Lala! Chạm vào 5 ngôi sao để khám phá điều kỳ diệu nhé!",
    chestPrompt: "Thu thập đủ 5 ngôi sao để mở rương phép thuật và nhận 1 Sticker mới nhé!",
    chestVictorySpeech:
      "Kỳ diệu quá! Cả bầu trời sao của Kiki và Lala tỏa sáng tặng Sticker cho Nấm!",
    palette: {
      btnGradient: "linear-gradient(180deg, #8EC5FC 0%, #6C8AE8 100%)",
      btnShadow: "0 6px 0 #4A63B8, 0 12px 24px rgba(108, 138, 232, 0.38)",
      btnBorder: "#C9E2FF",
      topPillBg: "rgba(44, 48, 96, 0.80)",
      cardBg: "rgba(253, 253, 255, 0.96)",
      cardBorder: "#DCE4FF",
      titleColor: "#2C3268",
      subTextColor: "#5C639E",
      selectedBorder: "#FFD43B",
      selectedGlow:
        "0 0 0 4px rgba(255, 212, 59, 0.44), 0 12px 26px rgba(108, 138, 232, 0.30)",
      selectedBg: "linear-gradient(180deg, #FFFDF5 0%, #FFF4CC 100%)",
      primaryHex: "#6C8AE8",
      softTintHex: "#F2F5FF",
      starHex: "#FFD43B",
    },
    hotspots: [
      {
        id: "twins-globe",
        name: "Bàn sách & Cầu tuyết",
        icon: "📖",
        stationType: "poem",
        x: 15,
        y: 74,
        zoomOriginX: 16,
        zoomOriginY: 74,
        zoomScale: 1.8,
      },
      {
        id: "twins-star",
        name: "Đám mây sao",
        icon: "🌟",
        stationType: "math",
        x: 50,
        y: 62,
        zoomOriginX: 50,
        zoomOriginY: 62,
        zoomScale: 1.75,
      },
      {
        id: "twins-moon",
        name: "Cửa sổ Vầng Trăng",
        icon: "🌙",
        stationType: "reading",
        x: 79,
        y: 16,
        zoomOriginX: 76,
        zoomOriginY: 18,
        zoomScale: 1.78,
      },
      {
        id: "twins-loft",
        name: "Kệ sách gác sao",
        icon: "📚",
        stationType: "shape",
        x: 34,
        y: 31,
        zoomOriginX: 34,
        zoomOriginY: 31,
        zoomScale: 1.78,
      },
      {
        id: "twins-unicorn",
        name: "Giường mây Kỳ lân",
        icon: "🦄",
        stationType: "english",
        x: 88,
        y: 62,
        zoomOriginX: 86,
        zoomOriginY: 62,
        zoomScale: 1.8,
      },
    ],
  },
];
