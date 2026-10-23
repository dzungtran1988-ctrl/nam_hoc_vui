import {
  LIFESKILLS_SHARED_ASSETS,
  SHARED_ASSET_CATALOG,
  type AssetPrimaryColor,
} from "./sharedAssetCatalog.ts";

export type EnglishMiniGameId =
  | "kuromi-shop"
  | "kuromi-actions"
  | "kuromi-pronouns"
  | "mystery-bag";

export type EnglishDifficultyLevel = 1 | 2 | 3;

export type EnglishColorKey =
  | "red"
  | "yellow"
  | "blue"
  | "pink"
  | "green"
  | "purple"
  | "orange"
  | "white";

export type EnglishItemShape =
  | "hat"
  | "cap"
  | "bag"
  | "car"
  | "ball"
  | "dress"
  | "shoes"
  | "cup"
  | "book"
  | "icecream"
  | "apple"
  | "banana"
  | "strawberry"
  | "milk"
  | "cake"
  | "cookie"
  | "juice"
  | "teddy"
  | "star"
  | "cat"
  | "dog"
  | "rabbit"
  | "duck";

export interface EnglishShopItem {
  id: string;
  englishName: string;
  vietnameseName: string;
  phoneticHint: string;
  emoji: string;
  shape?: EnglishItemShape;
  colorKey?: EnglishColorKey;
  quantity?: number;
  image?: string;
  badgeText?: string;
}

export interface EnglishRound {
  id: string;
  level: EnglishDifficultyLevel;
  /** Câu tiếng Anh Kuromi nói với Nấm */
  kuromiSpeechEn: string;
  /** Dịch nghĩa / giải thích tiếng Việt ngắn gọn */
  kuromiSpeechVi: string;
  /** Mẫu câu gợi ý để Nấm đọc to theo (Speaking practice) */
  speakingTargetEn: string;
  speakingTargetVi: string;
  /** Gợi ý ngữ pháp / từ vựng (Danh từ / Màu sắc / Động từ / Ngôi) */
  grammarTag: string;
  /** Danh sách 3 - 5 món đồ / thẻ hiển thị trên kệ (mỗi món có tên tiếng Anh) */
  items: EnglishShopItem[];
  /** ID của món đúng cần lấy */
  correctItemId: string;
  /** Gợi ý nhẹ nhàng khi bé chọn nhầm */
  hintVi: string;
}

export interface EnglishMiniGameMeta {
  id: EnglishMiniGameId;
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  cardImage: string;
  heroImage: string;
  secondaryImage: string;
  accentColor: string;
  teacherNote: string;
}

export const ENGLISH_COLOR_PALETTE: Record<
  EnglishColorKey,
  {
    en: string;
    vi: string;
    fill: string;
    stroke: string;
    lightBg: string;
    badgeBg: string;
  }
> = {
  red: {
    en: "Red",
    vi: "Màu đỏ",
    fill: "#ef4444",
    stroke: "#991b1b",
    lightBg: "#fef2f2",
    badgeBg: "#dc2626",
  },
  yellow: {
    en: "Yellow",
    vi: "Màu vàng",
    fill: "#facc15",
    stroke: "#854d0e",
    lightBg: "#fefce8",
    badgeBg: "#ca8a04",
  },
  blue: {
    en: "Blue",
    vi: "Xanh dương",
    fill: "#3b82f6",
    stroke: "#1e40af",
    lightBg: "#eff6ff",
    badgeBg: "#2563eb",
  },
  pink: {
    en: "Pink",
    vi: "Màu hồng",
    fill: "#f472b6",
    stroke: "#9d174d",
    lightBg: "#fdf2f8",
    badgeBg: "#db2777",
  },
  green: {
    en: "Green",
    vi: "Xanh lá",
    fill: "#22c55e",
    stroke: "#166534",
    lightBg: "#f0fdf4",
    badgeBg: "#16a34a",
  },
  purple: {
    en: "Purple",
    vi: "Màu tím",
    fill: "#a855f7",
    stroke: "#581c87",
    lightBg: "#faf5ff",
    badgeBg: "#9333ea",
  },
  orange: {
    en: "Orange",
    vi: "Màu cam",
    fill: "#fb923c",
    stroke: "#9a3412",
    lightBg: "#fff7ed",
    badgeBg: "#ea580c",
  },
  white: {
    en: "White",
    vi: "Màu trắng",
    fill: "#f8fafc",
    stroke: "#475569",
    lightBg: "#f8fafc",
    badgeBg: "#64748b",
  },
};

export const ENGLISH_MINI_GAMES: EnglishMiniGameMeta[] = [
  {
    id: "kuromi-shop",
    title: "Tiệm Tạp Hóa Kuromi",
    subtitle: "Nhặt đồ vào Giỏ Hàng theo đơn của Kuromi",
    badge: "Bài 1",
    icon: "🛒",
    cardImage: "/assets/canva/card-english-1.png",
    heroImage: "/assets/canva/thumb-english-1.png",
    secondaryImage: "/assets/canva/3d_icecream.png",
    accentColor: "#ec4899",
    teacherNote: "Cấp 1: Danh từ đơn • Cấp 2: Tính từ + Danh từ (Vị, Nhiệt độ, Cỡ, Màu...) • Cấp 3: Đếm số lượng bỏ giỏ",
  },
  {
    id: "kuromi-actions",
    title: "Làm Theo Kuromi",
    subtitle: "Động từ + Danh từ & Phản xạ hỏi đáp",
    badge: "Bài 2",
    icon: "🏃‍♀️",
    cardImage: "/assets/canva/card-english-2.png",
    heroImage: "/assets/canva/thumb-english-2.png",
    secondaryImage: "/assets/canva/3d_pochacco_run.png",
    accentColor: "#10b981",
    teacherNote: "Cấp 1: Động từ 1 âm tiết • Cấp 2: Động từ + Danh từ • Cấp 3: Hỏi & Đáp giao tiếp",
  },
  {
    id: "kuromi-pronouns",
    title: "Ai Đang Làm Gì?",
    subtitle: "Nối 2 cột: Ngôi (He, She, It, They) + Hành động",
    badge: "Bài 3",
    icon: "👑",
    cardImage: "/assets/canva/card-english-3.png",
    heroImage: "/assets/canva/thumb-english-3.png",
    secondaryImage: "/assets/canva/kuromi_reading.png",
    accentColor: "#f59e0b",
    teacherNote: "Trò chơi Nối 2 Cột: Phân biệt He, She, It, They kết hợp Động từ & Danh từ",
  },
  {
    id: "mystery-bag",
    title: "Chiếc Túi Bí Mật",
    subtitle: "Mở túi 3 bước: Màu sắc ➔ Đặc trưng & Tác dụng ➔ Đồ vật 3D",
    badge: "Bài 4",
    icon: "🎒",
    cardImage: "/assets/canva/card-english-4.png",
    heroImage: "/assets/canva/thumb-english-4.png",
    secondaryImage: "/assets/canva/3d_redhat.png",
    accentColor: "#8b5cf6",
    teacherNote: "Hé góc đoán Màu ➔ Gợi ý Tính năng/Tác dụng/Đặc trưng ➔ Mở túi đoán Đồ vật 3D",
  },
];

// ============================================================================
// 1. TIỆM TẠP HÓA & QUÁN KEM KUROMI (3 MỨC ĐỘ: ĐỒ VẬT -> MÀU SẮC + ĐỒ VẬT -> SỐ LƯỢNG + TẬP NÓI)
// ============================================================================
export const KUROMI_SHOP_ROUNDS: Record<EnglishDifficultyLevel, EnglishRound[]> = {
  // MỨC 1: CHỌN ĐÚNG MÓN ĐỒ VẬT / HOA QUẢ / KEM (4 MÓN TRÊN KỆ, HIỆN RÕ TÊN TIẾNG ANH)
  1: [
    {
      id: "shop-l1-1",
      level: 1,
      kuromiSpeechEn: "Banana, please! Can I have a banana?",
      kuromiSpeechVi: "Kuromi muốn mua Quả Chuối (Banana). Nấm lấy giúp Kuromi nhé!",
      speakingTargetEn: "Banana, please! — Here you are!",
      speakingTargetVi: "Cho tớ quả chuối nhé! — Của bạn đây!",
      grammarTag: "Danh từ: Quả ngọt (Fruits)",
      correctItemId: "banana",
      hintVi: "Banana là Quả Chuối vàng ươm đấy Nấm ơi!",
      items: [
        {
          id: "apple",
          englishName: "Apple",
          vietnameseName: "Quả táo",
          phoneticHint: "/ˈæp.əl/",
          emoji: "🍎",
          shape: "apple",
          colorKey: "red",
        },
        {
          id: "banana",
          englishName: "Banana",
          vietnameseName: "Quả chuối",
          phoneticHint: "/bəˈnæn.ə/",
          emoji: "🍌",
          shape: "banana",
          colorKey: "yellow",
        },
        {
          id: "strawberry",
          englishName: "Strawberry",
          vietnameseName: "Quả dâu tây",
          phoneticHint: "/ˈstrɔː.bər.i/",
          emoji: "🍓",
          shape: "strawberry",
          colorKey: "pink",
        },
        {
          id: "milk",
          englishName: "Milk",
          vietnameseName: "Hộp sữa",
          phoneticHint: "/mɪlk/",
          emoji: "🥛",
          shape: "milk",
          colorKey: "blue",
        },
      ],
    },
    {
      id: "shop-l1-2",
      level: 1,
      kuromiSpeechEn: "Ice cream, please! I want an ice cream!",
      kuromiSpeechVi: "Trời nắng quá! Kuromi nhờ Nấm lấy Cây Kem (Ice cream) mát lạnh nhé!",
      speakingTargetEn: "Ice cream, please! — Yummy ice cream!",
      speakingTargetVi: "Cho tớ cây kem nhé! — Kem ngon tuyệt!",
      grammarTag: "Danh từ: Món tráng miệng (Treats)",
      correctItemId: "icecream",
      hintVi: "Ice cream là Cây Kem ốc quế mát lạnh đấy Nấm ơi!",
      items: [
        {
          id: "icecream",
          englishName: "Ice cream",
          vietnameseName: "Cây kem",
          phoneticHint: "/ˈaɪs kriːm/",
          emoji: "🍦",
          shape: "icecream",
          colorKey: "pink",
        },
        {
          id: "cake",
          englishName: "Cake",
          vietnameseName: "Bánh kem",
          phoneticHint: "/keɪk/",
          emoji: "🍰",
          shape: "cake",
          colorKey: "yellow",
        },
        {
          id: "cookie",
          englishName: "Cookie",
          vietnameseName: "Bánh quy",
          phoneticHint: "/ˈkʊk.i/",
          emoji: "🍪",
          shape: "cookie",
          colorKey: "orange",
        },
        {
          id: "juice",
          englishName: "Orange juice",
          vietnameseName: "Nước cam",
          phoneticHint: "/ˈɒr.ɪndʒ dʒuːs/",
          emoji: "🧃",
          shape: "juice",
          colorKey: "orange",
        },
      ],
    },
    {
      id: "shop-l1-3",
      level: 1,
      kuromiSpeechEn: "Hat, please! Give me the hat, please!",
      kuromiSpeechVi: "Kuromi chuẩn bị đi dạo nắng, Nấm lấy giúp Kuromi Chiếc Mũ (Hat) trên kệ nhé!",
      speakingTargetEn: "Hat, please! — I wear a hat!",
      speakingTargetVi: "Cho tớ chiếc mũ nhé! — Tớ đội mũ!",
      grammarTag: "Danh từ: Đồ vật & Trang phục (Objects)",
      correctItemId: "hat",
      hintVi: "Hat là Chiếc Mũ đội đầu đấy Nấm ơi!",
      items: [
        {
          id: "hat",
          englishName: "Hat",
          vietnameseName: "Chiếc mũ",
          phoneticHint: "/hæt/",
          emoji: "👒",
          shape: "hat",
          colorKey: "pink",
        },
        {
          id: "bag",
          englishName: "Bag",
          vietnameseName: "Chiếc cặp",
          phoneticHint: "/bæɡ/",
          emoji: "🎒",
          shape: "bag",
          colorKey: "blue",
        },
        {
          id: "book",
          englishName: "Book",
          vietnameseName: "Quyển sách",
          phoneticHint: "/bʊk/",
          emoji: "📖",
          shape: "book",
          colorKey: "green",
        },
        {
          id: "ball",
          englishName: "Ball",
          vietnameseName: "Quả bóng",
          phoneticHint: "/bɔːl/",
          emoji: "⚽",
          shape: "ball",
          colorKey: "orange",
        },
      ],
    },
    {
      id: "shop-l1-4",
      level: 1,
      kuromiSpeechEn: "Teddy bear, please! I love the teddy bear!",
      kuromiSpeechVi: "Kuromi muốn mua bạn Gấu Bông (Teddy bear) ở quầy đồ chơi. Nấm chọn giúp nhé!",
      speakingTargetEn: "Teddy bear, please! — I hug my teddy bear!",
      speakingTargetVi: "Cho tớ gấu bông nhé! — Tớ ôm bạn gấu bông!",
      grammarTag: "Danh từ: Đồ chơi (Toys)",
      correctItemId: "teddy",
      hintVi: "Teddy bear là Bạn Gấu Bông đáng yêu đấy!",
      items: [
        {
          id: "car",
          englishName: "Car",
          vietnameseName: "Xe ô tô",
          phoneticHint: "/kɑːr/",
          emoji: "🚗",
          shape: "car",
          colorKey: "red",
        },
        {
          id: "teddy",
          englishName: "Teddy bear",
          vietnameseName: "Gấu bông",
          phoneticHint: "/ˈted.i beər/",
          emoji: "🧸",
          shape: "teddy",
          colorKey: "orange",
        },
        {
          id: "dress",
          englishName: "Dress",
          vietnameseName: "Chiếc váy",
          phoneticHint: "/dres/",
          emoji: "👗",
          shape: "dress",
          colorKey: "purple",
        },
        {
          id: "shoes",
          englishName: "Shoes",
          vietnameseName: "Đôi giày",
          phoneticHint: "/ʃuːz/",
          emoji: "👟",
          shape: "shoes",
          colorKey: "blue",
        },
      ],
    },
    {
      id: "shop-l1-5",
      level: 1,
      kuromiSpeechEn: "Apple and Milk? No, just Milk, please!",
      kuromiSpeechVi: "Kuromi khát nước rồi! Nấm lấy đúng Hộp Sữa (Milk) trên kệ cho Kuromi nhé!",
      speakingTargetEn: "Milk, please! — I drink milk!",
      speakingTargetVi: "Cho tớ hộp sữa nhé! — Tớ uống sữa!",
      grammarTag: "Danh từ: Đồ uống (Drinks)",
      correctItemId: "milk",
      hintVi: "Milk là Hộp Sữa tươi trắng thơm ngon đấy!",
      items: [
        {
          id: "apple",
          englishName: "Apple",
          vietnameseName: "Quả táo",
          phoneticHint: "/ˈæp.əl/",
          emoji: "🍎",
          shape: "apple",
          colorKey: "red",
        },
        {
          id: "milk",
          englishName: "Milk",
          vietnameseName: "Hộp sữa",
          phoneticHint: "/mɪlk/",
          emoji: "🥛",
          shape: "milk",
          colorKey: "blue",
        },
        {
          id: "cake",
          englishName: "Cake",
          vietnameseName: "Bánh kem",
          phoneticHint: "/keɪk/",
          emoji: "🍰",
          shape: "cake",
          colorKey: "pink",
        },
        {
          id: "cup",
          englishName: "Cup",
          vietnameseName: "Chiếc cốc",
          phoneticHint: "/kʌp/",
          emoji: "🥤",
          shape: "cup",
          colorKey: "yellow",
        },
      ],
    },
    {
      id: "shop-l1-6",
      level: 1,
      kuromiSpeechEn: "Watermelon, please! I love juicy watermelon!",
      kuromiSpeechVi:
        "Trời nắng quá! Nấm lấy giúp Kuromi Miếng Dưa Hấu (Watermelon) mát lạnh trên kệ nhé!",
      speakingTargetEn: "Watermelon, please! — I like watermelon!",
      speakingTargetVi: "Cho tớ miếng dưa hấu nhé! — Tớ thích dưa hấu!",
      grammarTag: "Danh từ: Trái cây nhiệt đới (Fruits)",
      correctItemId: "watermelon",
      hintVi: "Watermelon là Miếng Dưa Hấu vỏ xanh ruột đỏ mọng nước đấy!",
      items: [
        {
          id: "watermelon",
          englishName: "Watermelon",
          vietnameseName: "Miếng dưa hấu",
          phoneticHint: "/ˈwɔː.təˌmel.ən/",
          emoji: "🍉",
          image: "/assets/items/fruits/fruit_05.png",
          colorKey: "red",
        },
        {
          id: "grapes",
          englishName: "Grapes",
          vietnameseName: "Chùm nho tím",
          phoneticHint: "/ɡreɪps/",
          emoji: "🍇",
          image: "/assets/items/fruits/fruit_06.png",
          colorKey: "purple",
        },
        {
          id: "pineapple",
          englishName: "Pineapple",
          vietnameseName: "Quả dứa vàng",
          phoneticHint: "/ˈpaɪnˌæp.əl/",
          emoji: "🍍",
          image: "/assets/items/fruits/fruit_12.png",
          colorKey: "yellow",
        },
        {
          id: "avocado",
          englishName: "Avocado",
          vietnameseName: "Quả bơ xanh",
          phoneticHint: "/ˌæv.əˈkɑː.dəʊ/",
          emoji: "🥑",
          image: "/assets/items/fruits/fruit_15.png",
          colorKey: "green",
        },
      ],
    },
    {
      id: "shop-l1-7",
      level: 1,
      kuromiSpeechEn: "Bubble tea, please! Can I have a bubble tea?",
      kuromiSpeechVi:
        "Nấm và Kuromi cùng uống Trà Sữa Trân Châu (Bubble tea) nhé! Đâu là ly trà sữa nhỉ?",
      speakingTargetEn: "Bubble tea, please! — Yummy bubble tea!",
      speakingTargetVi: "Cho tớ ly trà sữa nhé! — Trà sữa ngon tuyệt!",
      grammarTag: "Danh từ: Bánh kẹo & Đồ uống (Sweets & Drinks)",
      correctItemId: "bubble-tea",
      hintVi: "Bubble tea là Ly Trà Sữa có hạt trân châu đen ở đáy ly đấy!",
      items: [
        {
          id: "bubble-tea",
          englishName: "Bubble tea",
          vietnameseName: "Trà sữa trân châu",
          phoneticHint: "/ˈbʌb.əl tiː/",
          emoji: "🧋",
          image: "/assets/items/sweets/sweet_11.png",
          colorKey: "orange",
        },
        {
          id: "donut",
          englishName: "Donut",
          vietnameseName: "Bánh donut hồng",
          phoneticHint: "/ˈdəʊ.nʌt/",
          emoji: "🍩",
          image: "/assets/items/sweets/sweet_02.png",
          colorKey: "pink",
        },
        {
          id: "lollipop",
          englishName: "Lollipop",
          vietnameseName: "Kẹo mút xoáy",
          phoneticHint: "/ˈlɒl.i.pɒp/",
          emoji: "🍭",
          image: "/assets/items/sweets/sweet_03.png",
          colorKey: "pink",
        },
        {
          id: "popsicle",
          englishName: "Popsicle",
          vietnameseName: "Kem que 3 màu",
          phoneticHint: "/ˈpɒp.sɪ.kəl/",
          emoji: "🍧",
          image: "/assets/items/sweets/sweet_10.png",
          colorKey: "blue",
        },
      ],
    },
    {
      id: "shop-l1-8",
      level: 1,
      kuromiSpeechEn: "Scissors, please! Pass me the pink scissors!",
      kuromiSpeechVi:
        "Giờ học thủ công đến rồi! Nấm lấy giúp Kuromi Cây Kéo Hồng (Scissors) trên kệ nhé!",
      speakingTargetEn: "Scissors, please! — Here are the scissors!",
      speakingTargetVi: "Cho tớ cây kéo nhé! — Cây kéo của bạn đây!",
      grammarTag: "Danh từ: Đồ dùng học tập (School Supplies)",
      correctItemId: "scissors",
      hintVi: "Scissors là Cây Kéo cắt giấy màu hồng xinh xắn!",
      items: [
        {
          id: "pencil",
          englishName: "Pencil",
          vietnameseName: "Bút chì vàng",
          phoneticHint: "/ˈpen.səl/",
          emoji: "✏️",
          image: "/assets/items/school/school_04.png",
          colorKey: "yellow",
        },
        {
          id: "crayons",
          englishName: "Crayons",
          vietnameseName: "Hộp bút sáp màu",
          phoneticHint: "/ˈkreɪ.ɒnz/",
          emoji: "🖍️",
          image: "/assets/items/school/school_08.png",
          colorKey: "blue",
        },
        {
          id: "scissors",
          englishName: "Scissors",
          vietnameseName: "Cây kéo hồng",
          phoneticHint: "/ˈsɪz.əz/",
          emoji: "✂️",
          image: "/assets/items/school/school_09.png",
          colorKey: "pink",
        },
        {
          id: "globe",
          englishName: "Globe",
          vietnameseName: "Quả địa cầu",
          phoneticHint: "/ɡləʊb/",
          emoji: "🌍",
          image: "/assets/items/school/school_15.png",
          colorKey: "green",
        },
      ],
    },
    {
      id: "shop-l1-9",
      level: 1,
      kuromiSpeechEn: "Airplane, please! Look at the big airplane!",
      kuromiSpeechVi:
        "Nấm nhìn lên kệ đồ chơi kìa! Hãy chọn Chiếc Máy Bay (Airplane) cho Kuromi nhé!",
      speakingTargetEn: "Airplane, please! — I see an airplane!",
      speakingTargetVi: "Cho tớ chiếc máy bay nhé! — Tớ thấy một chiếc máy bay!",
      grammarTag: "Danh từ: Phương tiện giao thông (Vehicles)",
      correctItemId: "airplane",
      hintVi: "Airplane là Chiếc Máy Bay màu trắng xanh có hai cánh bay trên bầu trời!",
      items: [
        {
          id: "airplane",
          englishName: "Airplane",
          vietnameseName: "Máy bay trắng xanh",
          phoneticHint: "/ˈeə.pleɪn/",
          emoji: "✈️",
          image: "/assets/items/vehicles/vehicle_06.png",
          colorKey: "blue",
        },
        {
          id: "rocket",
          englishName: "Rocket",
          vietnameseName: "Tên lửa vũ trụ",
          phoneticHint: "/ˈrɒk.ɪt/",
          emoji: "🚀",
          image: "/assets/items/vehicles/vehicle_10.png",
          colorKey: "red",
        },
        {
          id: "train",
          englishName: "Train",
          vietnameseName: "Đoàn tàu hỏa",
          phoneticHint: "/treɪn/",
          emoji: "🚂",
          image: "/assets/items/vehicles/vehicle_05.png",
          colorKey: "yellow",
        },
        {
          id: "bicycle",
          englishName: "Bicycle",
          vietnameseName: "Xe đạp xanh",
          phoneticHint: "/ˈbaɪ.sɪ.kəl/",
          emoji: "🚲",
          image: "/assets/items/vehicles/vehicle_03.png",
          colorKey: "blue",
        },
      ],
    },
  ],

  // MỨC 2: TÍNH TỪ + DANH TỪ ĐA DẠNG (ADJECTIVE + NOUN: HƯƠNG VỊ, NHIỆT ĐỘ, KÍCH CỠ, ĐẶC TÍNH, MÀU SẮC)
  2: [
    {
      id: "shop-l2-1",
      level: 2,
      kuromiSpeechEn: "Sweet cake, please! Can I have the sweet cake?",
      kuromiSpeechVi:
        "Kuromi muốn mua một chiếc Bánh Kem Ngọt Ngào (Sweet cake) cho bữa tiệc! Nấm chọn giúp nhé!",
      speakingTargetEn: "Sweet cake, please! — Here is the sweet cake!",
      speakingTargetVi: "Cho tớ chiếc bánh kem ngọt nhé! — Bánh ngọt của bạn đây!",
      grammarTag: "Cấp 2 · Tính từ + Danh từ: Sweet + Cake (Bánh ngọt)",
      correctItemId: "sweet-cake",
      hintVi: "Sweet là Ngọt ngào, Cake là Bánh kem -> Sweet cake là Chiếc Bánh Kem Ngọt đấy Nấm ơi!",
      items: [
        {
          id: "sweet-cake",
          englishName: "Sweet cake",
          vietnameseName: "Bánh kem ngọt ngào",
          phoneticHint: "Sweet (Ngọt) + Cake (Bánh)",
          emoji: "🍰",
          image: "/assets/items/sweets/sweet_07.png",
          colorKey: "pink",
        },
        {
          id: "sour-lemon",
          englishName: "Sour lemon",
          vietnameseName: "Quả chanh chua",
          phoneticHint: "Sour (Chua) + Lemon (Chanh)",
          emoji: "🍋",
          image: "/assets/items/fruits/fruit_09.png",
          colorKey: "yellow",
        },
        {
          id: "crunchy-cookie",
          englishName: "Crunchy cookie",
          vietnameseName: "Bánh quy giòn rụm",
          phoneticHint: "Crunchy (Giòn) + Cookie (Bánh quy)",
          emoji: "🍪",
          image: "/assets/items/sweets/sweet_05.png",
          colorKey: "orange",
        },
        {
          id: "juicy-orange",
          englishName: "Juicy orange",
          vietnameseName: "Quả cam mọng nước",
          phoneticHint: "Juicy (Mọng nước) + Orange (Cam)",
          emoji: "🍊",
          image: "/assets/items/fruits/fruit_04.png",
          colorKey: "orange",
        },
      ],
    },
    {
      id: "shop-l2-2",
      level: 2,
      kuromiSpeechEn: "Cold ice cream, please! I love cold ice cream!",
      kuromiSpeechVi:
        "Trời nắng ấm quá, Kuromi muốn ăn Cây Kem Mát Lạnh (Cold ice cream)! Nấm lấy đúng món nhé!",
      speakingTargetEn: "Cold ice cream, please! — Yummy cold ice cream!",
      speakingTargetVi: "Cho tớ cây kem mát lạnh nhé! — Kem mát lạnh ngon tuyệt!",
      grammarTag: "Cấp 2 · Tính từ + Danh từ: Cold + Ice cream (Kem mát lạnh)",
      correctItemId: "cold-ice-cream",
      hintVi: "Cold là Mát lạnh, Ice cream là Cây kem -> Cold ice cream!",
      items: [
        {
          id: "cold-ice-cream",
          englishName: "Cold ice cream",
          vietnameseName: "Cây kem mát lạnh",
          phoneticHint: "Cold (Lạnh) + Ice cream (Kem)",
          emoji: "🍦",
          image: "/assets/items/sweets/sweet_09.png",
          colorKey: "pink",
        },
        {
          id: "hot-cocoa",
          englishName: "Hot cocoa",
          vietnameseName: "Cốc ca-cao nóng ấm",
          phoneticHint: "Hot (Nóng) + Cocoa (Ca-cao)",
          emoji: "☕",
          image: "/assets/items/sweets/sweet_14.png",
          colorKey: "pink",
        },
        {
          id: "warm-rice",
          englishName: "Warm rice",
          vietnameseName: "Bát cơm ấm nóng",
          phoneticHint: "Warm (Ấm) + Rice (Cơm)",
          emoji: "🍚",
          image: "/assets/items/lifeskills/lifeskills_19.png",
          colorKey: "white",
        },
        {
          id: "fresh-milk",
          englishName: "Fresh milk",
          vietnameseName: "Hộp sữa tươi ngon",
          phoneticHint: "Fresh (Tươi) + Milk (Sữa)",
          emoji: "🥛",
          image: "/assets/items/lifeskills/lifeskills_03.png",
          colorKey: "blue",
        },
      ],
    },
    {
      id: "shop-l2-3",
      level: 2,
      kuromiSpeechEn: "Fast car, please! Give me the fast car!",
      kuromiSpeechVi:
        "Pochacco thích chiếc Ô Tô Chạy Nhanh (Fast car)! Nấm chọn đúng chiếc xe trên kệ nhé!",
      speakingTargetEn: "Fast car, please! — Look at the fast car!",
      speakingTargetVi: "Cho tớ chiếc ô tô chạy nhanh nhé! — Nhìn chiếc xe chạy nhanh kìa!",
      grammarTag: "Cấp 2 · Tính từ + Danh từ: Fast + Car (Ô tô nhanh)",
      correctItemId: "fast-car",
      hintVi: "Fast là Nhanh, Car là Ô tô -> Fast car là Chiếc Ô Tô Chạy Nhanh!",
      items: [
        {
          id: "fast-car",
          englishName: "Fast car",
          vietnameseName: "Ô tô chạy nhanh",
          phoneticHint: "Fast (Nhanh) + Car (Ô tô)",
          emoji: "🚗",
          image: "/assets/items/vehicles/vehicle_01.png",
          colorKey: "red",
        },
        {
          id: "big-airplane",
          englishName: "Big airplane",
          vietnameseName: "Máy bay to lớn",
          phoneticHint: "Big (To lớn) + Airplane (Máy bay)",
          emoji: "✈️",
          image: "/assets/items/vehicles/vehicle_06.png",
          colorKey: "blue",
        },
        {
          id: "long-train",
          englishName: "Long train",
          vietnameseName: "Đoàn tàu hỏa dài",
          phoneticHint: "Long (Dài) + Train (Tàu hỏa)",
          emoji: "🚂",
          image: "/assets/items/vehicles/vehicle_05.png",
          colorKey: "red",
        },
        {
          id: "cute-scooter",
          englishName: "Cute scooter",
          vietnameseName: "Xe máy điện xinh xắn",
          phoneticHint: "Cute (Xinh) + Scooter (Xe máy điện)",
          emoji: "🛵",
          image: "/assets/items/vehicles/vehicle_04.png",
          colorKey: "pink",
        },
      ],
    },
    {
      id: "shop-l2-4",
      level: 2,
      kuromiSpeechEn: "Soft pillow, please! Can I have the soft pillow?",
      kuromiSpeechVi:
        "Đến giờ đi ngủ rồi, Kuromi muốn mua Chiếc Gối Êm Mềm (Soft pillow). Nấm lấy giúp nhé!",
      speakingTargetEn: "Soft pillow, please! — A very soft pillow!",
      speakingTargetVi: "Cho tớ chiếc gối êm mềm nhé! — Một chiếc gối thật êm!",
      grammarTag: "Cấp 2 · Tính từ + Danh từ: Soft + Pillow (Gối êm mềm)",
      correctItemId: "soft-pillow",
      hintVi: "Soft là Mềm mại êm ái, Pillow là Chiếc Gối -> Soft pillow!",
      items: [
        {
          id: "soft-pillow",
          englishName: "Soft pillow",
          vietnameseName: "Chiếc gối êm mềm",
          phoneticHint: "Soft (Mềm) + Pillow (Gối)",
          emoji: "🛌",
          image: "/assets/items/home/home_07.png",
          colorKey: "yellow",
        },
        {
          id: "bright-lamp",
          englishName: "Bright lamp",
          vietnameseName: "Đèn bàn sáng rõ",
          phoneticHint: "Bright (Sáng) + Lamp (Đèn)",
          emoji: "💡",
          image: "/assets/items/home/home_01.png",
          colorKey: "yellow",
        },
        {
          id: "clean-towel",
          englishName: "Clean towel",
          vietnameseName: "Khăn mặt sạch thơm",
          phoneticHint: "Clean (Sạch) + Towel (Khăn)",
          emoji: "🧖",
          image: "/assets/items/home/home_10.png",
          colorKey: "green",
        },
        {
          id: "sharp-scissors",
          englishName: "Sharp scissors",
          vietnameseName: "Cây kéo thủ công sắc",
          phoneticHint: "Sharp (Sắc) + Scissors (Kéo)",
          emoji: "✂️",
          image: "/assets/items/school/school_09.png",
          colorKey: "pink",
        },
      ],
    },
    {
      id: "shop-l2-5",
      level: 2,
      kuromiSpeechEn: "Red hat, please! Can I have the red hat?",
      kuromiSpeechVi:
        "Trên kệ có nhiều đồ khác nhau! Nấm lấy đúng Chiếc Mũ Đỏ (Red hat) cho Kuromi nhé!",
      speakingTargetEn: "Red hat, please! — Here is the red hat!",
      speakingTargetVi: "Cho tớ chiếc mũ đỏ nhé! — Chiếc mũ đỏ của bạn đây!",
      grammarTag: "Cấp 2 · Tính từ + Danh từ: Red + Hat (Mũ đỏ)",
      correctItemId: "red-hat",
      hintVi: "Red là Màu Đỏ, Hat là Chiếc Mũ -> Red hat là Chiếc Mũ Đỏ đấy Nấm ơi!",
      items: [
        {
          id: "red-hat",
          englishName: "Red hat",
          vietnameseName: "Mũ màu đỏ",
          phoneticHint: "Red (Đỏ) + Hat (Mũ)",
          emoji: "🧢",
          shape: "hat",
          colorKey: "red",
        },
        {
          id: "yellow-hat",
          englishName: "Yellow hat",
          vietnameseName: "Mũ màu vàng",
          phoneticHint: "Yellow (Vàng) + Hat (Mũ)",
          emoji: "👒",
          shape: "hat",
          colorKey: "yellow",
        },
        {
          id: "blue-bag",
          englishName: "Blue bag",
          vietnameseName: "Cặp xanh dương",
          phoneticHint: "Blue (Xanh) + Bag (Cặp)",
          emoji: "🎒",
          shape: "bag",
          colorKey: "blue",
        },
        {
          id: "pink-dress",
          englishName: "Pink dress",
          vietnameseName: "Váy màu hồng",
          phoneticHint: "Pink (Hồng) + Dress (Váy)",
          emoji: "👗",
          shape: "dress",
          colorKey: "pink",
        },
      ],
    },
  ],

  // MỨC 3: SỐ LƯỢNG + MÀU SẮC + ĐỒ VẬT & ĐỔI VAI NẤM TẬP NÓI ĐẶT HÀNG
  3: [
    {
      id: "shop-l3-1",
      level: 3,
      kuromiSpeechEn: "Two red apples, please! I want two red apples!",
      kuromiSpeechVi:
        "Đơn hàng đặc biệt: Kuromi cần 2 Quả Táo Đỏ (Two red apples). Nấm chọn đúng khay rồi nói to câu giao tiếp nhé!",
      speakingTargetEn: "I want two red apples, please!",
      speakingTargetVi: "Tớ muốn 2 quả táo đỏ, làm ơn!",
      grammarTag: "Số đếm + Màu sắc + Danh từ số nhiều (-s)",
      correctItemId: "two-red-apples",
      hintVi: "Two = 2, Red = Đỏ, Apples = Những quả táo -> Two red apples!",
      items: [
        {
          id: "one-red-apple",
          englishName: "One red apple",
          vietnameseName: "1 quả táo đỏ",
          phoneticHint: "1 + Red + Apple",
          emoji: "🍎",
          shape: "apple",
          colorKey: "red",
          quantity: 1,
        },
        {
          id: "two-red-apples",
          englishName: "Two red apples",
          vietnameseName: "2 quả táo đỏ",
          phoneticHint: "2 + Red + Apples",
          emoji: "🍎🍎",
          shape: "apple",
          colorKey: "red",
          quantity: 2,
        },
        {
          id: "two-yellow-bananas",
          englishName: "Two yellow bananas",
          vietnameseName: "2 quả chuối vàng",
          phoneticHint: "2 + Yellow + Bananas",
          emoji: "🍌🍌",
          shape: "banana",
          colorKey: "yellow",
          quantity: 2,
        },
        {
          id: "three-green-apples",
          englishName: "Three green apples",
          vietnameseName: "3 quả táo xanh",
          phoneticHint: "3 + Green + Apples",
          emoji: "🍏🍏🍏",
          shape: "apple",
          colorKey: "green",
          quantity: 3,
        },
      ],
    },
    {
      id: "shop-l3-2",
      level: 3,
      kuromiSpeechEn: "Three pink ice creams, please!",
      kuromiSpeechVi:
        "Nấm, Kitty và Kuromi đi ăn kem! Hãy lấy khay 3 Cây Kem Hồng (Three pink ice creams) nhé!",
      speakingTargetEn: "Can I have three pink ice creams, please?",
      speakingTargetVi: "Cho tớ 3 cây kem màu hồng với nhé?",
      grammarTag: "Số đếm + Màu sắc + Danh từ: Three pink ice creams",
      correctItemId: "three-pink-icecreams",
      hintVi: "Three = 3, Pink = Màu hồng, Ice creams = Những cây kem!",
      items: [
        {
          id: "two-pink-icecreams",
          englishName: "Two pink ice creams",
          vietnameseName: "2 cây kem hồng",
          phoneticHint: "2 + Pink + Ice creams",
          emoji: "🍦🍦",
          shape: "icecream",
          colorKey: "pink",
          quantity: 2,
        },
        {
          id: "three-pink-icecreams",
          englishName: "Three pink ice creams",
          vietnameseName: "3 cây kem hồng",
          phoneticHint: "3 + Pink + Ice creams",
          emoji: "🍦🍦🍦",
          shape: "icecream",
          colorKey: "pink",
          quantity: 3,
        },
        {
          id: "three-yellow-cakes",
          englishName: "Three yellow cakes",
          vietnameseName: "3 bánh kem vàng",
          phoneticHint: "3 + Yellow + Cakes",
          emoji: "🍰🍰🍰",
          shape: "cake",
          colorKey: "yellow",
          quantity: 3,
        },
        {
          id: "one-blue-cup",
          englishName: "One blue cup",
          vietnameseName: "1 chiếc cốc xanh",
          phoneticHint: "1 + Blue + Cup",
          emoji: "🥤",
          shape: "cup",
          colorKey: "blue",
          quantity: 1,
        },
      ],
    },
    {
      id: "shop-l3-3",
      level: 3,
      kuromiSpeechEn: "Two yellow hats, please! For Nam and Kitty!",
      kuromiSpeechVi:
        "Nấm lấy giúp Kuromi 2 Chiếc Mũ Màu Vàng (Two yellow hats) để Nấm và Kitty đội đi biển nhé!",
      speakingTargetEn: "Here you are! Two yellow hats!",
      speakingTargetVi: "Của bạn đây! Hai chiếc mũ màu vàng!",
      grammarTag: "Số đếm + Màu sắc + Đồ vật: Two yellow hats",
      correctItemId: "two-yellow-hats",
      hintVi: "Two = 2, Yellow = Màu vàng, Hats = Những chiếc mũ!",
      items: [
        {
          id: "one-yellow-hat",
          englishName: "One yellow hat",
          vietnameseName: "1 chiếc mũ vàng",
          phoneticHint: "1 + Yellow + Hat",
          emoji: "👒",
          shape: "hat",
          colorKey: "yellow",
          quantity: 1,
        },
        {
          id: "two-yellow-hats",
          englishName: "Two yellow hats",
          vietnameseName: "2 chiếc mũ vàng",
          phoneticHint: "2 + Yellow + Hats",
          emoji: "👒👒",
          shape: "hat",
          colorKey: "yellow",
          quantity: 2,
        },
        {
          id: "two-red-hats",
          englishName: "Two red hats",
          vietnameseName: "2 chiếc mũ đỏ",
          phoneticHint: "2 + Red + Hats",
          emoji: "🧢🧢",
          shape: "hat",
          colorKey: "red",
          quantity: 2,
        },
        {
          id: "three-blue-bags",
          englishName: "Three blue bags",
          vietnameseName: "3 chiếc cặp xanh",
          phoneticHint: "3 + Blue + Bags",
          emoji: "🎒🎒🎒",
          shape: "bag",
          colorKey: "blue",
          quantity: 3,
        },
      ],
    },
    {
      id: "shop-l3-4",
      level: 3,
      kuromiSpeechEn: "Two blue cars, please! Can I have two blue cars?",
      kuromiSpeechVi:
        "Đơn hàng Cấp 3: Kuromi muốn mua 2 Chiếc Xe Ô Tô Xanh Dương (Two blue cars). Nấm chạm nhặt đủ 2 chiếc xe bỏ vào giỏ nhé!",
      speakingTargetEn: "Here are two blue cars for you!",
      speakingTargetVi: "Hai chiếc ô tô xanh dương của bạn đây!",
      grammarTag: "Cấp 3 · Số đếm + Màu sắc + Danh từ: Two blue cars",
      correctItemId: "two-blue-cars",
      hintVi: "Two = 2, Blue = Xanh dương, Cars = Những chiếc ô tô!",
      items: [
        {
          id: "two-blue-cars",
          englishName: "Two blue cars",
          vietnameseName: "2 ô tô xanh dương",
          phoneticHint: "2 + Blue + Cars",
          emoji: "🚙🚙",
          shape: "car",
          colorKey: "blue",
          quantity: 2,
        },
        {
          id: "two-red-cars",
          englishName: "Two red cars",
          vietnameseName: "2 ô tô màu đỏ",
          phoneticHint: "2 + Red + Cars",
          emoji: "🚗🚗",
          shape: "car",
          colorKey: "red",
          quantity: 2,
        },
        {
          id: "three-green-balls",
          englishName: "Three green balls",
          vietnameseName: "3 quả bóng xanh lá",
          phoneticHint: "3 + Green + Balls",
          emoji: "🟢🟢🟢",
          shape: "ball",
          colorKey: "green",
          quantity: 3,
        },
        {
          id: "two-purple-dresses",
          englishName: "Two purple dresses",
          vietnameseName: "2 chiếc váy tím",
          phoneticHint: "2 + Purple + Dresses",
          emoji: "👗👗",
          shape: "dress",
          colorKey: "purple",
          quantity: 2,
        },
      ],
    },
  ],
};

// ============================================================================
// 2. KUROMI BẢO! — HỌC ĐỘNG TỪ HÀNH ĐỘNG & MẪU CÂU "I CAN..." (VERBS & ACTIONS)
// ============================================================================
export const KUROMI_ACTION_ROUNDS: Record<EnglishDifficultyLevel, EnglishRound[]> = {
  // MỨC 1: ĐỘNG TỪ CƠ BẢN (JUMP, CLAP, RUN, DANCE, SIT DOWN, STAND UP, SLEEP, SWIM)
  1: [
    {
      id: "act-l1-1",
      level: 1,
      kuromiSpeechEn: "Kuromi says: Clap your hands! Clap, clap, clap!",
      kuromiSpeechVi:
        "Kuromi hô: 'Clap your hands!' — Nấm vừa vỗ tay vừa chọn thẻ hành động Vỗ Tay nhé!",
      speakingTargetEn: "Clap! Clap your hands!",
      speakingTargetVi: "Vỗ tay! Hãy vỗ hai bàn tay nào!",
      grammarTag: "Động từ (Verb): Clap = Vỗ tay",
      correctItemId: "verb-clap",
      hintVi: "Clap your hands nghĩa là Vỗ hai bàn tay đấy Nấm ơi!",
      items: [
        {
          id: "verb-clap",
          englishName: "Clap your hands",
          vietnameseName: "Vỗ hai bàn tay",
          phoneticHint: "Verb: Clap (Vỗ tay)",
          emoji: "👏",
          colorKey: "pink",
          badgeText: "VERB",
        },
        {
          id: "verb-jump",
          englishName: "Jump up high",
          vietnameseName: "Bật nhảy lên cao",
          phoneticHint: "Verb: Jump (Nhảy)",
          emoji: "🦘",
          colorKey: "yellow",
          badgeText: "VERB",
        },
        {
          id: "verb-sleep",
          englishName: "Go to sleep",
          vietnameseName: "Nhắm mắt đi ngủ",
          phoneticHint: "Verb: Sleep (Ngủ)",
          emoji: "😴",
          colorKey: "purple",
          badgeText: "VERB",
        },
        {
          id: "verb-run",
          englishName: "Run fast",
          vietnameseName: "Chạy thật nhanh",
          phoneticHint: "Verb: Run (Chạy)",
          emoji: "🏃‍♀️",
          colorKey: "blue",
          badgeText: "VERB",
        },
      ],
    },
    {
      id: "act-l1-2",
      level: 1,
      kuromiSpeechEn: "Kuromi says: Jump! Jump up high like a rabbit!",
      kuromiSpeechVi:
        "Kuromi hô: 'Jump up high!' — Đâu là động từ Bật Nhảy Lên Cao hả Nấm?",
      speakingTargetEn: "Jump! I can jump up high!",
      speakingTargetVi: "Nhảy nào! Tớ có thể bật nhảy thật cao!",
      grammarTag: "Động từ (Verb): Jump = Bật nhảy",
      correctItemId: "verb-jump",
      hintVi: "Jump là Bật nhảy lên cao giống bạn thỏ đấy!",
      items: [
        {
          id: "verb-sit",
          englishName: "Sit down",
          vietnameseName: "Ngồi xuống ghế",
          phoneticHint: "Verb: Sit (Ngồi)",
          emoji: "🪑",
          colorKey: "green",
          badgeText: "VERB",
        },
        {
          id: "verb-jump",
          englishName: "Jump up high",
          vietnameseName: "Bật nhảy lên cao",
          phoneticHint: "Verb: Jump (Nhảy)",
          emoji: "🦘",
          colorKey: "yellow",
          badgeText: "VERB",
        },
        {
          id: "verb-dance",
          englishName: "Dance happily",
          vietnameseName: "Nhảy múa vui vẻ",
          phoneticHint: "Verb: Dance (Múa)",
          emoji: "💃",
          colorKey: "pink",
          badgeText: "VERB",
        },
        {
          id: "verb-swim",
          englishName: "Swim in the sea",
          vietnameseName: "Bơi dưới nước",
          phoneticHint: "Verb: Swim (Bơi)",
          emoji: "🏊‍♀️",
          colorKey: "blue",
          badgeText: "VERB",
        },
      ],
    },
    {
      id: "act-l1-3",
      level: 1,
      kuromiSpeechEn: "Kuromi says: Stand up! Then Sit down! Pick 'Stand up'!",
      kuromiSpeechVi:
        "Trong lớp học, khi cô giáo bước vào, cả lớp Đứng Lên chào cô. Đâu là 'Stand up'?",
      speakingTargetEn: "Stand up, please! — Sit down, please!",
      speakingTargetVi: "Xin mời đứng lên! — Xin mời ngồi xuống!",
      grammarTag: "Cặp động từ trái ngược: Stand up ↔ Sit down",
      correctItemId: "verb-stand",
      hintVi: "Stand up là Đứng thẳng lên đấy Nấm ơi!",
      items: [
        {
          id: "verb-stand",
          englishName: "Stand up",
          vietnameseName: "Đứng thẳng lên",
          phoneticHint: "Verb: Stand up",
          emoji: "🧍‍♀️",
          colorKey: "orange",
          badgeText: "VERB",
        },
        {
          id: "verb-sit",
          englishName: "Sit down",
          vietnameseName: "Ngồi xuống ngay ngắn",
          phoneticHint: "Verb: Sit down",
          emoji: "🪑",
          colorKey: "blue",
          badgeText: "VERB",
        },
        {
          id: "verb-sing",
          englishName: "Sing a song",
          vietnameseName: "Hát vang bài ca",
          phoneticHint: "Verb: Sing (Hát)",
          emoji: "🎤",
          colorKey: "pink",
          badgeText: "VERB",
        },
        {
          id: "verb-wave",
          englishName: "Wave hello",
          vietnameseName: "Vẫy tay xin chào",
          phoneticHint: "Verb: Wave (Vẫy tay)",
          emoji: "👋",
          colorKey: "yellow",
          badgeText: "VERB",
        },
      ],
    },
    {
      id: "act-l1-4",
      level: 1,
      kuromiSpeechEn: "Kuromi says: Swim! Swim like a little fish!",
      kuromiSpeechVi:
        "Mùa hè đi biển, Nấm thích Bơi Lội dưới làn nước mát! Đâu là động từ 'Swim'?",
      speakingTargetEn: "Swim! I like to swim!",
      speakingTargetVi: "Bơi lội! Tớ rất thích bơi!",
      grammarTag: "Động từ (Verb): Swim = Bơi lội",
      correctItemId: "verb-swim",
      hintVi: "Swim là Bơi lội dưới nước giống chú cá nhỏ đấy!",
      items: [
        {
          id: "verb-run",
          englishName: "Run fast",
          vietnameseName: "Chạy bộ nhanh",
          phoneticHint: "Verb: Run",
          emoji: "🏃‍♀️",
          colorKey: "green",
          badgeText: "VERB",
        },
        {
          id: "verb-swim",
          englishName: "Swim",
          vietnameseName: "Bơi dưới nước",
          phoneticHint: "Verb: Swim",
          emoji: "🏊‍♀️",
          colorKey: "blue",
          badgeText: "VERB",
        },
        {
          id: "verb-touch-nose",
          englishName: "Touch your nose",
          vietnameseName: "Chạm tay vào mũi",
          phoneticHint: "Verb: Touch (Chạm)",
          emoji: "👉👃",
          colorKey: "purple",
          badgeText: "VERB",
        },
        {
          id: "verb-sleep",
          englishName: "Sleep",
          vietnameseName: "Đi ngủ ngoan",
          phoneticHint: "Verb: Sleep",
          emoji: "🛌",
          colorKey: "pink",
          badgeText: "VERB",
        },
      ],
    },
  ],

  // MỨC 2: CỤM ĐỘNG TỪ + DANH TỪ (EAT AN APPLE, DRINK MILK, READ A BOOK, KICK A BALL...)
  2: [
    {
      id: "act-l2-1",
      level: 2,
      kuromiSpeechEn: "Eat an apple! Yummy, yummy, eat an apple!",
      kuromiSpeechVi:
        "Ghép Động từ + Danh từ: Đâu là hành động 'Eat an apple' (Ăn một quả táo)?",
      speakingTargetEn: "I eat a red apple! Yummy!",
      speakingTargetVi: "Tớ ăn một quả táo đỏ! Ngon tuyệt!",
      grammarTag: "Động từ + Tân ngữ: Eat (Ăn) + an apple",
      correctItemId: "eat-apple",
      hintVi: "Eat là Ăn, Apple là Quả táo -> Eat an apple!",
      items: [
        {
          id: "eat-apple",
          englishName: "Eat an apple",
          vietnameseName: "Ăn một quả táo",
          phoneticHint: "Eat (Ăn) + Apple",
          emoji: "😋🍎",
          colorKey: "red",
          badgeText: "EAT + NOUN",
        },
        {
          id: "drink-milk",
          englishName: "Drink milk",
          vietnameseName: "Uống sữa tươi",
          phoneticHint: "Drink (Uống) + Milk",
          emoji: "🥤🥛",
          colorKey: "blue",
          badgeText: "DRINK + NOUN",
        },
        {
          id: "read-book",
          englishName: "Read a book",
          vietnameseName: "Đọc một quyển sách",
          phoneticHint: "Read (Đọc) + Book",
          emoji: "👧📖",
          colorKey: "green",
          badgeText: "READ + NOUN",
        },
        {
          id: "kick-ball",
          englishName: "Kick a ball",
          vietnameseName: "Đá một quả bóng",
          phoneticHint: "Kick (Đá) + Ball",
          emoji: "👟⚽",
          colorKey: "orange",
          badgeText: "KICK + NOUN",
        },
      ],
    },
    {
      id: "act-l2-2",
      level: 2,
      kuromiSpeechEn: "Drink milk! Every morning, drink warm milk!",
      kuromiSpeechVi:
        "Buổi sáng Nấm Uống Sữa Tươi cho cao lớn. Đâu là cụm động từ 'Drink milk'?",
      speakingTargetEn: "I drink milk every morning!",
      speakingTargetVi: "Tớ uống sữa vào mỗi buổi sáng!",
      grammarTag: "Động từ + Tân ngữ: Drink (Uống) + milk",
      correctItemId: "drink-milk",
      hintVi: "Drink nghĩa là Uống, Milk nghĩa là Sữa tươi đấy!",
      items: [
        {
          id: "eat-cake",
          englishName: "Eat a cake",
          vietnameseName: "Ăn bánh kem",
          phoneticHint: "Eat (Ăn) + Cake",
          emoji: "🍴🍰",
          colorKey: "pink",
          badgeText: "EAT",
        },
        {
          id: "drink-milk",
          englishName: "Drink milk",
          vietnameseName: "Uống sữa tươi",
          phoneticHint: "Drink (Uống) + Milk",
          emoji: "🥤🥛",
          colorKey: "blue",
          badgeText: "DRINK",
        },
        {
          id: "wash-hands",
          englishName: "Wash hands",
          vietnameseName: "Rửa sạch hai tay",
          phoneticHint: "Wash (Rửa) + Hands",
          emoji: "🧼👐",
          colorKey: "green",
          badgeText: "WASH",
        },
        {
          id: "brush-teeth",
          englishName: "Brush teeth",
          vietnameseName: "Đánh răng trắng tinh",
          phoneticHint: "Brush (Chải) + Teeth",
          emoji: "🪥😁",
          colorKey: "purple",
          badgeText: "BRUSH",
        },
      ],
    },
    {
      id: "act-l2-3",
      level: 2,
      kuromiSpeechEn: "Read a book! Let's read a storybook together!",
      kuromiSpeechVi:
        "Nấm và Pochacco rất chăm Đọc Sách Truyện. Đâu là cụm từ 'Read a book'?",
      speakingTargetEn: "Let's read a book together!",
      speakingTargetVi: "Chúng mình cùng đọc sách với nhau nhé!",
      grammarTag: "Động từ + Tân ngữ: Read (Đọc) + a book",
      correctItemId: "read-book",
      hintVi: "Read là Đọc, Book là Quyển sách -> Read a book!",
      items: [
        {
          id: "read-book",
          englishName: "Read a book",
          vietnameseName: "Đọc một quyển sách",
          phoneticHint: "Read + a book",
          emoji: "📚🐶",
          colorKey: "green",
          badgeText: "READ",
        },
        {
          id: "draw-picture",
          englishName: "Draw a picture",
          vietnameseName: "Vẽ một bức tranh",
          phoneticHint: "Draw (Vẽ) + picture",
          emoji: "🎨🖍️",
          colorKey: "pink",
          badgeText: "DRAW",
        },
        {
          id: "sing-song",
          englishName: "Sing a song",
          vietnameseName: "Hát một bài hát",
          phoneticHint: "Sing (Hát) + a song",
          emoji: "🎵🎤",
          colorKey: "yellow",
          badgeText: "SING",
        },
        {
          id: "ride-bike",
          englishName: "Ride a bike",
          vietnameseName: "Đạp xe đạp",
          phoneticHint: "Ride (Lái/Đạp) + bike",
          emoji: "🚲🌟",
          colorKey: "blue",
          badgeText: "RIDE",
        },
      ],
    },
    {
      id: "act-l2-4",
      level: 2,
      kuromiSpeechEn: "Brush your teeth! Before bedtime, brush your teeth!",
      kuromiSpeechVi:
        "Trước khi đi ngủ và sau khi ăn, bé ngoan Đánh Răng sạch sẽ. Đâu là 'Brush your teeth'?",
      speakingTargetEn: "I brush my teeth every day!",
      speakingTargetVi: "Tớ đánh răng sạch sẽ mỗi ngày!",
      grammarTag: "Cụm động từ thói quen tốt: Brush teeth",
      correctItemId: "brush-teeth",
      hintVi: "Brush your teeth là Chải/Đánh răng trắng sáng đấy!",
      items: [
        {
          id: "raise-hands",
          englishName: "Raise your hands",
          vietnameseName: "Giơ hai tay lên cao",
          phoneticHint: "Raise + hands",
          emoji: "🙌✨",
          colorKey: "blue",
          badgeText: "RAISE",
        },
        {
          id: "brush-teeth",
          englishName: "Brush your teeth",
          vietnameseName: "Đánh răng sạch sẽ",
          phoneticHint: "Brush + teeth",
          emoji: "🪥✨",
          colorKey: "purple",
          badgeText: "BRUSH",
        },
        {
          id: "touch-nose",
          englishName: "Touch your nose",
          vietnameseName: "Chạm tay vào mũi xinh",
          phoneticHint: "Touch + nose",
          emoji: "👉👃",
          colorKey: "pink",
          badgeText: "TOUCH",
        },
        {
          id: "wear-hat",
          englishName: "Wear a yellow hat",
          vietnameseName: "Đội chiếc mũ vàng",
          phoneticHint: "Wear (Đội/Mặc) + hat",
          emoji: "👒☀️",
          colorKey: "yellow",
          badgeText: "WEAR",
        },
      ],
    },
  ],

  // MỨC 3: MẪU CÂU "I CAN + VERB" & "LET'S + VERB"
  3: [
    {
      id: "act-l3-1",
      level: 3,
      kuromiSpeechEn: "I can swim fast in the blue sea!",
      kuromiSpeechVi:
        "Nấm khoe với Kuromi: 'Tớ có thể bơi thật nhanh!' — Đâu là câu 'I can swim fast'?",
      speakingTargetEn: "I can swim fast! Look at me!",
      speakingTargetVi: "Tớ có thể bơi thật nhanh! Nhìn tớ này!",
      grammarTag: "Mẫu câu: I can + Động từ (Tớ có thể...)",
      correctItemId: "can-swim",
      hintVi: "I can = Tớ có thể, Swim fast = Bơi nhanh!",
      items: [
        {
          id: "can-swim",
          englishName: "I can swim fast!",
          vietnameseName: "Tớ có thể bơi nhanh!",
          phoneticHint: "I can + swim",
          emoji: "🏊‍♀️🌊",
          colorKey: "blue",
          badgeText: "I CAN...",
        },
        {
          id: "can-sing",
          englishName: "I can sing a song!",
          vietnameseName: "Tớ có thể hát vang!",
          phoneticHint: "I can + sing",
          emoji: "🎤🎶",
          colorKey: "pink",
          badgeText: "I CAN...",
        },
        {
          id: "can-draw",
          englishName: "I can draw a cat!",
          vietnameseName: "Tớ có thể vẽ bạn mèo!",
          phoneticHint: "I can + draw",
          emoji: "🎨🐱",
          colorKey: "yellow",
          badgeText: "I CAN...",
        },
        {
          id: "can-run",
          englishName: "I can run fast!",
          vietnameseName: "Tớ có thể chạy nhanh!",
          phoneticHint: "I can + run",
          emoji: "🏃‍♀️💨",
          colorKey: "green",
          badgeText: "I CAN...",
        },
      ],
    },
    {
      id: "act-l3-2",
      level: 3,
      kuromiSpeechEn: "I can sing a happy song with Cinnamoroll!",
      kuromiSpeechVi:
        "Trong giờ Âm Nhạc, Nấm tự tin nói: 'Tớ có thể hát một bài hát!' — Nấm chọn câu nào?",
      speakingTargetEn: "I can sing a happy song!",
      speakingTargetVi: "Tớ có thể hát một bài hát vui tươi!",
      grammarTag: "Mẫu câu: I can + sing a song",
      correctItemId: "can-sing",
      hintVi: "Sing a song là Hát một bài hát đấy Nấm ơi!",
      items: [
        {
          id: "can-dance",
          englishName: "I can dance!",
          vietnameseName: "Tớ có thể nhảy múa!",
          phoneticHint: "I can + dance",
          emoji: "💃✨",
          colorKey: "purple",
          badgeText: "I CAN...",
        },
        {
          id: "can-sing",
          englishName: "I can sing a song!",
          vietnameseName: "Tớ có thể hát một bài!",
          phoneticHint: "I can + sing a song",
          emoji: "🎤🎵",
          colorKey: "pink",
          badgeText: "I CAN...",
        },
        {
          id: "can-cook",
          englishName: "I can make a cake!",
          vietnameseName: "Tớ có thể làm bánh kem!",
          phoneticHint: "I can + make a cake",
          emoji: "👩‍🍳🍰",
          colorKey: "orange",
          badgeText: "I CAN...",
        },
        {
          id: "can-read",
          englishName: "I can read English!",
          vietnameseName: "Tớ có thể đọc tiếng Anh!",
          phoneticHint: "I can + read English",
          emoji: "📖🌟",
          colorKey: "green",
          badgeText: "I CAN...",
        },
      ],
    },
    {
      id: "act-l3-3",
      level: 3,
      kuromiSpeechEn: "Let's ride a bike in the park!",
      kuromiSpeechVi:
        "Chiều mát, Nấm rủ Kuromi: 'Chúng mình cùng đạp xe ở công viên nhé!' — Đâu là câu đó?",
      speakingTargetEn: "Let's ride a bike together!",
      speakingTargetVi: "Chúng mình cùng đạp xe với nhau nào!",
      grammarTag: "Mẫu câu rủ bạn: Let's + Động từ (Chúng mình cùng...)",
      correctItemId: "lets-bike",
      hintVi: "Let's ride a bike nghĩa là Chúng mình cùng đạp xe đạp nhé!",
      items: [
        {
          id: "lets-bike",
          englishName: "Let's ride a bike!",
          vietnameseName: "Cùng đạp xe đạp nào!",
          phoneticHint: "Let's + ride a bike",
          emoji: "🚲🌳",
          colorKey: "green",
          badgeText: "LET'S...",
        },
        {
          id: "lets-eat",
          englishName: "Let's eat ice cream!",
          vietnameseName: "Cùng ăn kem mát nào!",
          phoneticHint: "Let's + eat ice cream",
          emoji: "🍦😋",
          colorKey: "pink",
          badgeText: "LET'S...",
        },
        {
          id: "lets-soccer",
          englishName: "Let's play soccer!",
          vietnameseName: "Cùng đá bóng vui nào!",
          phoneticHint: "Let's + play soccer",
          emoji: "⚽🐶",
          colorKey: "yellow",
          badgeText: "LET'S...",
        },
        {
          id: "lets-paint",
          englishName: "Let's paint a picture!",
          vietnameseName: "Cùng tô màu bức tranh nào!",
          phoneticHint: "Let's + paint",
          emoji: "🎨🖌️",
          colorKey: "blue",
          badgeText: "LET'S...",
        },
      ],
    },
  ],
};

// ============================================================================
// 3. HỌC CÁC NGÔI NHÂN XƯNG (I, YOU, HE, SHE, WE, THEY) + ĐỘNG TỪ
// ============================================================================
export const KUROMI_PRONOUN_ROUNDS: Record<EnglishDifficultyLevel, EnglishRound[]> = {
  // MỨC 1: NHẬN BIẾT NGÔI I (TỚ), YOU (BẠN), SHE (CHỊ/CÔ ẤY), HE (ANH/CẬU ẤY), THEY (HỌ/CÁC BẠN ẤY)
  1: [
    {
      id: "pro-l1-1",
      level: 1,
      kuromiSpeechEn: "She is a happy girl! She loves dancing!",
      kuromiSpeechVi:
        "Khi nói về một bạn nữ hay chị gái, tiếng Anh dùng ngôi 'SHE' (Cô ấy / Chị ấy). Nấm chọn thẻ SHE nhé!",
      speakingTargetEn: "She is a happy girl! She is kind!",
      speakingTargetVi: "Cô ấy là một bạn gái vui vẻ! Cô ấy rất tốt bụng!",
      grammarTag: "Ngôi số ít nữ: SHE = Cô ấy / Chị ấy / Bà ấy",
      correctItemId: "pronoun-she",
      hintVi: "Bạn nữ đang múa là con gái nên mình dùng ngôi SHE (Cô ấy / Chị ấy) nhé!",
      items: [
        {
          id: "pronoun-she",
          englishName: "She is a girl",
          vietnameseName: "SHE = Cô ấy / Chị ấy (Nữ)",
          phoneticHint: "SHE /ʃiː/ (1 bạn nữ)",
          emoji: "👧💃",
          colorKey: "blue",
          badgeText: "SHE (NỮ)",
        },
        {
          id: "pronoun-he",
          englishName: "He is a boy",
          vietnameseName: "HE = Cậu ấy / Anh ấy (Nam)",
          phoneticHint: "HE /hiː/ (1 bạn nam)",
          emoji: "👦⚽",
          colorKey: "orange",
          badgeText: "HE (NAM)",
        },
        {
          id: "pronoun-they",
          englishName: "They are friends",
          vietnameseName: "THEY = Họ / Các bạn ấy (Nhiều)",
          phoneticHint: "THEY /ðeɪ/ (Nhiều bạn)",
          emoji: "👯‍♀️🎉",
          colorKey: "purple",
          badgeText: "THEY (NHIỀU)",
        },
        {
          id: "pronoun-i",
          englishName: "I am Nam",
          vietnameseName: "I = Tớ / Con (Chính mình)",
          phoneticHint: "I /aɪ/ (Bản thân mình)",
          emoji: "👧🌟",
          colorKey: "pink",
          badgeText: "I (TỚ)",
        },
      ],
    },
    {
      id: "pro-l1-2",
      level: 1,
      kuromiSpeechEn: "He is strong! Look, he is flexing his arms!",
      kuromiSpeechVi:
        "Khi nói về một bạn nam hay Ba yêu, tiếng Anh dùng ngôi 'HE' (Cậu ấy / Anh ấy / Ông ấy). Nấm chọn thẻ HE nhé!",
      speakingTargetEn: "He is strong and brave!",
      speakingTargetVi: "Cậu ấy thật khỏe mạnh và dũng cảm!",
      grammarTag: "Ngôi số ít nam: HE = Anh ấy / Cậu ấy / Ông ấy",
      correctItemId: "pronoun-he-dad",
      hintVi: "Khi nói về một bạn nam khỏe mạnh, mình dùng ngôi HE nhé Nấm ơi!",
      items: [
        {
          id: "pronoun-she-mom",
          englishName: "She is singing",
          vietnameseName: "SHE = Cô ấy đang hát (Nữ)",
          phoneticHint: "She is singing",
          emoji: "👧🎤",
          colorKey: "pink",
          badgeText: "SHE (NỮ)",
        },
        {
          id: "pronoun-he-dad",
          englishName: "He is strong",
          vietnameseName: "HE = Cậu ấy thật khỏe (Nam)",
          phoneticHint: "He is strong",
          emoji: "💪🐶",
          colorKey: "blue",
          badgeText: "HE (NAM)",
        },
        {
          id: "pronoun-we",
          englishName: "We are friends",
          vietnameseName: "WE = Chúng mình là bạn tốt",
          phoneticHint: "We /wiː/ (Chúng mình)",
          emoji: "🐶🐥🎉",
          colorKey: "yellow",
          badgeText: "WE (CHÚNG TA)",
        },
        {
          id: "pronoun-you",
          englishName: "You are cute",
          vietnameseName: "YOU = Bạn thật dễ thương",
          phoneticHint: "You /juː/ (Bạn)",
          emoji: "👋🐶",
          colorKey: "purple",
          badgeText: "YOU (BẠN)",
        },
      ],
    },
    {
      id: "pro-l1-3",
      level: 1,
      kuromiSpeechEn: "I am Nam! I am six years old!",
      kuromiSpeechVi:
        "Khi Nấm tự giới thiệu về bản thân mình ('Tớ là Nấm!'), Nấm dùng ngôi nào nhỉ?",
      speakingTargetEn: "I am Nam! I am a happy girl!",
      speakingTargetVi: "Tớ là Nấm! Tớ là một cô bé vui vẻ!",
      grammarTag: "Ngôi thứ nhất: I + am (Tớ là / Con là)",
      correctItemId: "pronoun-i-nam",
      hintVi: "Khi tự nói về chính mình, Nấm luôn dùng chữ 'I am...' nhé!",
      items: [
        {
          id: "pronoun-i-nam",
          englishName: "I am Nam",
          vietnameseName: "I = Tớ là Nấm",
          phoneticHint: "I am... (Tớ là...)",
          emoji: "👧🎒",
          colorKey: "pink",
          badgeText: "I AM",
        },
        {
          id: "pronoun-you-friend",
          englishName: "You are my friend",
          vietnameseName: "YOU = Bạn là bạn của tớ",
          phoneticHint: "You are... (Bạn là...)",
          emoji: "👋😊",
          colorKey: "green",
          badgeText: "YOU ARE",
        },
        {
          id: "pronoun-she-kitty",
          englishName: "She is dancing",
          vietnameseName: "SHE = Cô ấy đang nhảy múa",
          phoneticHint: "She is... (Cô ấy đang...)",
          emoji: "👧💃",
          colorKey: "red",
          badgeText: "SHE IS",
        },
        {
          id: "pronoun-they-minions",
          englishName: "They are listening",
          vietnameseName: "THEY = Các bạn ấy đang lắng nghe",
          phoneticHint: "They are... (Họ đang...)",
          emoji: "🐶🐥👂",
          colorKey: "yellow",
          badgeText: "THEY ARE",
        },
      ],
    },
    {
      id: "pro-l1-4",
      level: 1,
      kuromiSpeechEn: "They are playing together in the schoolyard!",
      kuromiSpeechVi:
        "Khi chỉ nhiều bạn đang chơi chung ở sân trường ('Các bạn ấy / Họ'), mình dùng ngôi 'THEY'. Nấm chọn thẻ THEY nhé!",
      speakingTargetEn: "They are my good friends!",
      speakingTargetVi: "Các bạn ấy là những người bạn tốt của tớ!",
      grammarTag: "Ngôi số nhiều: THEY + are (Họ / Các bạn ấy)",
      correctItemId: "pronoun-they-play",
      hintVi: "Có nhiều bạn cùng chơi thì dùng THEY (Các bạn ấy / Họ) nhé!",
      items: [
        {
          id: "pronoun-he-boy",
          englishName: "He is reading",
          vietnameseName: "Cậu ấy đang đọc sách (1 nam)",
          phoneticHint: "He is...",
          emoji: "👦📖",
          colorKey: "blue",
          badgeText: "HE (1 NAM)",
        },
        {
          id: "pronoun-she-girl",
          englishName: "She is drawing",
          vietnameseName: "Cô ấy đang vẽ tranh (1 nữ)",
          phoneticHint: "She is...",
          emoji: "👧🎨",
          colorKey: "pink",
          badgeText: "SHE (1 NỮ)",
        },
        {
          id: "pronoun-they-play",
          englishName: "They are playing",
          vietnameseName: "Các bạn ấy đang chơi (Nhiều bạn)",
          phoneticHint: "They are...",
          emoji: "👧👦🐰⚽",
          colorKey: "green",
          badgeText: "THEY (NHIỀU)",
        },
        {
          id: "pronoun-i-sing",
          englishName: "I am singing",
          vietnameseName: "Tớ đang hát (Chính mình)",
          phoneticHint: "I am...",
          emoji: "🎤👧",
          colorKey: "yellow",
          badgeText: "I (TỚ)",
        },
      ],
    },
  ],

  // MỨC 2: NGÔI + ĐỘNG TỪ ĐANG DIỄN RA (HE IS..., SHE IS..., THEY ARE..., WE ARE...)
  2: [
    {
      id: "pro-l2-1",
      level: 2,
      kuromiSpeechEn: "Look! She is eating a pink strawberry cake!",
      kuromiSpeechVi:
        "Nghe kỹ cả Ngôi và Động từ nhé: 'She is eating a cake!' (Cô ấy đang ăn bánh kem!). Nấm chọn bức tranh nào?",
      speakingTargetEn: "She is eating a yummy cake!",
      speakingTargetVi: "Cô ấy đang ăn một chiếc bánh kem ngon tuyệt!",
      grammarTag: "She is + V-ing (Cô ấy đang làm gì)",
      correctItemId: "she-eating-cake",
      hintVi: "She = 1 bạn nữ, eating a cake = đang ăn bánh kem!",
      items: [
        {
          id: "she-eating-cake",
          englishName: "She is eating a cake",
          vietnameseName: "Cô ấy đang ăn bánh kem",
          phoneticHint: "She (Nữ) + eating cake",
          emoji: "👧🍰",
          colorKey: "pink",
          badgeText: "SHE + EAT",
        },
        {
          id: "he-eating-banana",
          englishName: "He is eating a banana",
          vietnameseName: "Cậu ấy đang ăn quả chuối",
          phoneticHint: "He (Nam) + eating banana",
          emoji: "👦🍌",
          colorKey: "yellow",
          badgeText: "HE + EAT",
        },
        {
          id: "she-drinking-milk",
          englishName: "She is drinking milk",
          vietnameseName: "Cô ấy đang uống sữa",
          phoneticHint: "She (Nữ) + drinking milk",
          emoji: "👧🥛",
          colorKey: "blue",
          badgeText: "SHE + DRINK",
        },
        {
          id: "they-eating-pizza",
          englishName: "They are eating pizza",
          vietnameseName: "Các bạn ấy đang ăn Pizza",
          phoneticHint: "They (Nhiều) + eating pizza",
          emoji: "👧👦🍕",
          colorKey: "orange",
          badgeText: "THEY + EAT",
        },
      ],
    },
    {
      id: "pro-l2-2",
      level: 2,
      kuromiSpeechEn: "Look at the boy! He is kicking a soccer ball!",
      kuromiSpeechVi:
        "Kuromi chỉ bạn trai ngoài sân: 'He is kicking a ball!' (Cậu ấy đang đá bóng!). Đâu là thẻ đúng?",
      speakingTargetEn: "He is kicking a ball in the park!",
      speakingTargetVi: "Cậu ấy đang đá bóng ở trong công viên!",
      grammarTag: "He is + V-ing (Cậu ấy đang làm gì)",
      correctItemId: "he-kicking-ball",
      hintVi: "He = Cậu ấy (bạn nam), kicking a ball = đang đá quả bóng!",
      items: [
        {
          id: "he-kicking-ball",
          englishName: "He is kicking a ball",
          vietnameseName: "Cậu ấy đang đá bóng",
          phoneticHint: "He (Nam) + kicking a ball",
          emoji: "👦⚽",
          colorKey: "green",
          badgeText: "HE + KICK",
        },
        {
          id: "she-kicking-ball",
          englishName: "She is kicking a ball",
          vietnameseName: "Cô ấy đang đá bóng",
          phoneticHint: "She (Nữ) + kicking a ball",
          emoji: "👧⚽",
          colorKey: "pink",
          badgeText: "SHE + KICK",
        },
        {
          id: "he-reading-book",
          englishName: "He is reading a book",
          vietnameseName: "Cậu ấy đang đọc sách",
          phoneticHint: "He (Nam) + reading a book",
          emoji: "👦📖",
          colorKey: "blue",
          badgeText: "HE + READ",
        },
        {
          id: "we-swimming",
          englishName: "We are swimming",
          vietnameseName: "Chúng mình đang bơi lội",
          phoneticHint: "We (Chúng mình) + swimming",
          emoji: "👧🐰🏊",
          colorKey: "purple",
          badgeText: "WE + SWIM",
        },
      ],
    },
    {
      id: "pro-l2-3",
      level: 2,
      kuromiSpeechEn: "We are singing a song together! You and I!",
      kuromiSpeechVi:
        "Khi có cả Nấm và các bạn cùng làm ('Chúng mình / Chúng tớ'), tiếng Anh dùng 'WE ARE...'. Nấm chọn câu 'We are singing' nhé!",
      speakingTargetEn: "We are singing and dancing together!",
      speakingTargetVi: "Chúng mình đang cùng nhau ca hát và nhảy múa!",
      grammarTag: "Ngôi thứ nhất số nhiều: WE + are (Chúng mình)",
      correctItemId: "we-singing",
      hintVi: "We = Chúng mình (Nấm cùng các bạn), singing = đang ca hát!",
      items: [
        {
          id: "we-singing",
          englishName: "We are singing",
          vietnameseName: "Chúng mình đang ca hát",
          phoneticHint: "We are + singing",
          emoji: "👧🐰🎤🎶",
          colorKey: "pink",
          badgeText: "WE ARE",
        },
        {
          id: "he-sleeping",
          englishName: "He is sleeping",
          vietnameseName: "Cậu ấy đang ngủ",
          phoneticHint: "He is + sleeping",
          emoji: "👦😴",
          colorKey: "purple",
          badgeText: "HE IS",
        },
        {
          id: "she-running",
          englishName: "She is running",
          vietnameseName: "Cô ấy đang chạy",
          phoneticHint: "She is + running",
          emoji: "👧🏃‍♀️",
          colorKey: "yellow",
          badgeText: "SHE IS",
        },
        {
          id: "you-jumping",
          englishName: "You are jumping",
          vietnameseName: "Bạn đang bật nhảy",
          phoneticHint: "You are + jumping",
          emoji: "👉🦘",
          colorKey: "green",
          badgeText: "YOU ARE",
        },
      ],
    },
  ],

  // MỨC 3: CHIA ĐỘNG TỪ THEO NGÔI (I LIKE / SHE LIKES · I HAVE / HE HAS)
  3: [
    {
      id: "pro-l3-1",
      level: 3,
      kuromiSpeechEn: "She has a pink bag! And He has a blue car!",
      kuromiSpeechVi:
        "Bí kíp ngữ pháp cho Nấm: Với I/You/We/They mình dùng 'HAVE', còn với He/She mình dùng 'HAS'. Hãy chọn thẻ: 'She has a pink bag'!",
      speakingTargetEn: "I have a red hat, and she has a pink bag!",
      speakingTargetVi: "Tớ có chiếc mũ đỏ, còn cô ấy có chiếc cặp hồng!",
      grammarTag: "Ngữ pháp: I/We/They HAVE ↔ He/She HAS (Có)",
      correctItemId: "she-has-bag",
      hintVi: "She = Cô ấy, has a pink bag = có một chiếc cặp màu hồng!",
      items: [
        {
          id: "she-has-bag",
          englishName: "She has a pink bag",
          vietnameseName: "Cô ấy có chiếc cặp hồng",
          phoneticHint: "She + HAS + a pink bag",
          emoji: "👧🎒🩷",
          colorKey: "pink",
          badgeText: "SHE HAS",
        },
        {
          id: "he-has-car",
          englishName: "He has a blue car",
          vietnameseName: "Cậu ấy có ô tô xanh dương",
          phoneticHint: "He + HAS + a blue car",
          emoji: "👦🚙🔵",
          colorKey: "blue",
          badgeText: "HE HAS",
        },
        {
          id: "i-have-teddy",
          englishName: "I have a teddy bear",
          vietnameseName: "Tớ có một bạn gấu bông",
          phoneticHint: "I + HAVE + a teddy bear",
          emoji: "👧🧸🧡",
          colorKey: "orange",
          badgeText: "I HAVE",
        },
        {
          id: "they-have-balls",
          englishName: "They have two balls",
          vietnameseName: "Các bạn ấy có 2 quả bóng",
          phoneticHint: "They + HAVE + two balls",
          emoji: "👯‍♀️⚽⚽",
          colorKey: "green",
          badgeText: "THEY HAVE",
        },
      ],
    },
    {
      id: "pro-l3-2",
      level: 3,
      kuromiSpeechEn: "He likes yellow bananas! Yummy bananas!",
      kuromiSpeechVi:
        "Bạn Minion là con trai nên mình nói 'He likes...' (có âm -s ở cuối chữ likes). Nấm chọn thẻ 'He likes yellow bananas' nhé!",
      speakingTargetEn: "I like apples, and he likes bananas!",
      speakingTargetVi: "Tớ thích táo, còn cậu ấy thích chuối!",
      grammarTag: "Ngữ pháp: I/You/We/They LIKE ↔ He/She LIKES (Thích)",
      correctItemId: "he-likes-bananas",
      hintVi: "He likes yellow bananas = Cậu ấy thích những quả chuối vàng!",
      items: [
        {
          id: "he-likes-bananas",
          englishName: "He likes yellow bananas",
          vietnameseName: "Cậu ấy thích chuối vàng",
          phoneticHint: "He + LIKES + bananas",
          emoji: "👦🍌💛",
          colorKey: "yellow",
          badgeText: "HE LIKES",
        },
        {
          id: "she-likes-strawberries",
          englishName: "She likes strawberries",
          vietnameseName: "Cô ấy thích dâu tây",
          phoneticHint: "She + LIKES + strawberries",
          emoji: "👧🍓❤️",
          colorKey: "red",
          badgeText: "SHE LIKES",
        },
        {
          id: "i-like-icecream",
          englishName: "I like ice cream",
          vietnameseName: "Tớ thích ăn kem",
          phoneticHint: "I + LIKE + ice cream",
          emoji: "👧🍦🩷",
          colorKey: "pink",
          badgeText: "I LIKE",
        },
        {
          id: "we-like-music",
          englishName: "We like music",
          vietnameseName: "Chúng mình thích âm nhạc",
          phoneticHint: "We + LIKE + music",
          emoji: "👧🐰🎵",
          colorKey: "purple",
          badgeText: "WE LIKE",
        },
      ],
    },
    {
      id: "pro-l3-3",
      level: 3,
      kuromiSpeechEn: "You are a smart and brave kid, Nam!",
      kuromiSpeechVi:
        "Kuromi khen trực tiếp Nấm: 'You are smart!' (Bạn thật thông minh!). Khi nói với người đối diện, mình dùng 'YOU ARE'!",
      speakingTargetEn: "Thank you, Kuromi! You are cute, too!",
      speakingTargetVi: "Cảm ơn Kuromi! Bạn cũng rất dễ thương!",
      grammarTag: "Ngôi thứ hai: YOU + are (Bạn / Cậu)",
      correctItemId: "you-are-smart",
      hintVi: "You are smart = Bạn thật thông minh giỏi giang!",
      items: [
        {
          id: "you-are-smart",
          englishName: "You are smart!",
          vietnameseName: "Bạn thật thông minh!",
          phoneticHint: "You are + smart",
          emoji: "👉🌟👧",
          colorKey: "yellow",
          badgeText: "YOU ARE",
        },
        {
          id: "i-am-hungry",
          englishName: "I am hungry!",
          vietnameseName: "Tớ đang đói bụng!",
          phoneticHint: "I am + hungry",
          emoji: "👧🍽️",
          colorKey: "orange",
          badgeText: "I AM",
        },
        {
          id: "she-is-princess",
          englishName: "She is a princess!",
          vietnameseName: "Cô ấy là một nàng công chúa!",
          phoneticHint: "She is + a princess",
          emoji: "👸👑",
          colorKey: "pink",
          badgeText: "SHE IS",
        },
        {
          id: "they-are-tall",
          englishName: "They are happy!",
          vietnameseName: "Họ đang rất vui vẻ!",
          phoneticHint: "They are + happy",
          emoji: "👯‍♀️😄",
          colorKey: "green",
          badgeText: "THEY ARE",
        },
      ],
    },
  ],
};

// ============================================================================
// 4. CHIẾC TÚI BÍ MẬT & PHẢN XẠ HỎI – ĐÁP GIAO TIẾP (MYSTERY BAG & SPEAKING)
// ============================================================================
export const MYSTERY_BAG_ROUNDS: Record<EnglishDifficultyLevel, EnglishRound[]> = {
  // MỨC 1: ĐOÁN ĐỒ VẬT / CON VẬT TRONG TÚI BÍ MẬT ("WHAT IS IT? — IT'S A...")
  1: [
    {
      id: "bag-l1-1",
      level: 1,
      kuromiSpeechEn: "Mystery Bag! It says 'Meow, meow!'. What is it? — It's a cat!",
      kuromiSpeechVi:
        "Trong chiếc túi bí mật của Kuromi có một bạn nhỏ kêu 'Meow, meow!'. Hỏi: 'What is it?' -> Trả lời thế nào nhỉ?",
      speakingTargetEn: "What is it? — It is a cute cat!",
      speakingTargetVi: "Đó là con gì thế? — Đó là một chú mèo dễ thương!",
      grammarTag: "Hỏi – Đáp đồ vật/con vật: What is it? → It's a...",
      correctItemId: "its-cat",
      hintVi: "Bạn kêu Meow meow chính là A cat (Con mèo) -> It's a cat!",
      items: [
        {
          id: "its-cat",
          englishName: "It's a cat!",
          vietnameseName: "Đó là một chú mèo!",
          phoneticHint: "It is a cat",
          emoji: "🐱",
          shape: "cat",
          colorKey: "pink",
        },
        {
          id: "its-dog",
          englishName: "It's a dog!",
          vietnameseName: "Đó là một chú cún!",
          phoneticHint: "It is a dog",
          emoji: "🐶",
          shape: "dog",
          colorKey: "yellow",
        },
        {
          id: "its-rabbit",
          englishName: "It's a rabbit!",
          vietnameseName: "Đó là một chú thỏ!",
          phoneticHint: "It is a rabbit",
          emoji: "🐰",
          shape: "rabbit",
          colorKey: "purple",
        },
        {
          id: "its-duck",
          englishName: "It's a duck!",
          vietnameseName: "Đó là một chú vịt!",
          phoneticHint: "It is a duck",
          emoji: "🦆",
          shape: "duck",
          colorKey: "orange",
        },
      ],
    },
    {
      id: "bag-l1-2",
      level: 1,
      kuromiSpeechEn: "Peek-a-boo! It has long ears and loves carrots! What is it? — It's a rabbit!",
      kuromiSpeechVi:
        "Chiếc túi bí mật hé lộ đôi tai dài trắng muốt và củ cà rốt! Đó là bạn nào nhỉ?",
      speakingTargetEn: "It's a white rabbit!",
      speakingTargetVi: "Đó là một chú thỏ trắng!",
      grammarTag: "Hỏi – Đáp: What is it? → It's a rabbit!",
      correctItemId: "its-rabbit",
      hintVi: "Bạn có tai dài thích ăn cà rốt tiếng Anh là Rabbit (Con thỏ)!",
      items: [
        {
          id: "its-duck",
          englishName: "It's a duck!",
          vietnameseName: "Đó là một chú vịt!",
          phoneticHint: "It is a duck",
          emoji: "🦆",
          shape: "duck",
          colorKey: "yellow",
        },
        {
          id: "its-rabbit",
          englishName: "It's a rabbit!",
          vietnameseName: "Đó là một chú thỏ!",
          phoneticHint: "It is a rabbit",
          emoji: "🐰",
          shape: "rabbit",
          colorKey: "pink",
        },
        {
          id: "its-cat",
          englishName: "It's a cat!",
          vietnameseName: "Đó là một chú mèo!",
          phoneticHint: "It is a cat",
          emoji: "🐱",
          shape: "cat",
          colorKey: "orange",
        },
        {
          id: "its-car",
          englishName: "It's a car!",
          vietnameseName: "Đó là chiếc ô tô!",
          phoneticHint: "It is a car",
          emoji: "🚗",
          shape: "car",
          colorKey: "red",
        },
      ],
    },
    {
      id: "bag-l1-3",
      level: 1,
      kuromiSpeechEn: "Twinkle, twinkle in the night sky! What is it? — It's a yellow star!",
      kuromiSpeechVi:
        "Trong túi phát ra ánh sáng lấp lánh trên bầu trời đêm! Đó là 'It's a yellow star!' (Ngôi sao vàng)!",
      speakingTargetEn: "Look! It's a bright yellow star!",
      speakingTargetVi: "Nhìn kìa! Đó là một ngôi sao vàng lấp lánh!",
      grammarTag: "Hỏi – Đáp: It's a + Màu + Danh từ",
      correctItemId: "its-star",
      hintVi: "Star là Ngôi sao -> It's a yellow star!",
      items: [
        {
          id: "its-star",
          englishName: "It's a yellow star!",
          vietnameseName: "Đó là ngôi sao vàng!",
          phoneticHint: "It's a yellow star",
          emoji: "⭐",
          shape: "star",
          colorKey: "yellow",
        },
        {
          id: "its-ball",
          englishName: "It's a green ball!",
          vietnameseName: "Đó là quả bóng xanh!",
          phoneticHint: "It's a green ball",
          emoji: "🟢",
          shape: "ball",
          colorKey: "green",
        },
        {
          id: "its-book",
          englishName: "It's a blue book!",
          vietnameseName: "Đó là quyển sách xanh!",
          phoneticHint: "It's a blue book",
          emoji: "📘",
          shape: "book",
          colorKey: "blue",
        },
        {
          id: "its-hat",
          englishName: "It's a red hat!",
          vietnameseName: "Đó là chiếc mũ đỏ!",
          phoneticHint: "It's a red hat",
          emoji: "🧢",
          shape: "hat",
          colorKey: "red",
        },
      ],
    },
  ],

  // MỨC 2: HỎI MÀU SẮC & SỐ LƯỢNG ("WHAT COLOR IS IT?" / "HOW MANY...?")
  2: [
    {
      id: "bag-l2-1",
      level: 2,
      kuromiSpeechEn: "Look at the strawberry! What color is it? — It is red!",
      kuromiSpeechVi:
        "Kuromi giơ quả dâu tây chín mọng và hỏi: 'What color is it?' (Nó có màu gì thế?). Nấm trả lời câu nào?",
      speakingTargetEn: "What color is it? — It is red!",
      speakingTargetVi: "Nó màu gì thế? — Nó màu đỏ!",
      grammarTag: "Câu hỏi màu sắc: What color is it? → It is...",
      correctItemId: "color-red",
      hintVi: "Quả dâu tây và quả táo chín có màu Đỏ -> It is red!",
      items: [
        {
          id: "color-red",
          englishName: "It is red!",
          vietnameseName: "Nó có màu đỏ!",
          phoneticHint: "It is red /red/",
          emoji: "🍓🔴",
          colorKey: "red",
        },
        {
          id: "color-blue",
          englishName: "It is blue!",
          vietnameseName: "Nó có màu xanh dương!",
          phoneticHint: "It is blue /bluː/",
          emoji: "🐳🔵",
          colorKey: "blue",
        },
        {
          id: "color-yellow",
          englishName: "It is yellow!",
          vietnameseName: "Nó có màu vàng!",
          phoneticHint: "It is yellow /ˈjel.əʊ/",
          emoji: "🍋🟡",
          colorKey: "yellow",
        },
        {
          id: "color-green",
          englishName: "It is green!",
          vietnameseName: "Nó có màu xanh lá!",
          phoneticHint: "It is green /ɡriːn/",
          emoji: "🐸🟢",
          colorKey: "green",
        },
      ],
    },
    {
      id: "bag-l2-2",
      level: 2,
      kuromiSpeechEn: "How many cakes are in the box? One, two, three! — Three cakes!",
      kuromiSpeechVi:
        "Kuromi hỏi số lượng: 'How many cakes?' (Có bao nhiêu chiếc bánh?). Đếm 1, 2, 3 -> 'Three cakes!'",
      speakingTargetEn: "There are three sweet cakes!",
      speakingTargetVi: "Có 3 chiếc bánh ngọt ngào!",
      grammarTag: "Câu hỏi số lượng: How many...? → Số + Danh từ-s",
      correctItemId: "count-3-cakes",
      hintVi: "One, two, three -> Three cakes (3 chiếc bánh kem)!",
      items: [
        {
          id: "count-1-cake",
          englishName: "One cake",
          vietnameseName: "Có 1 chiếc bánh",
          phoneticHint: "One cake",
          emoji: "🍰",
          shape: "cake",
          colorKey: "pink",
          quantity: 1,
        },
        {
          id: "count-2-cakes",
          englishName: "Two cakes",
          vietnameseName: "Có 2 chiếc bánh",
          phoneticHint: "Two cakes",
          emoji: "🍰🍰",
          shape: "cake",
          colorKey: "yellow",
          quantity: 2,
        },
        {
          id: "count-3-cakes",
          englishName: "Three cakes",
          vietnameseName: "Có 3 chiếc bánh",
          phoneticHint: "Three cakes",
          emoji: "🍰🍰🍰",
          shape: "cake",
          colorKey: "purple",
          quantity: 3,
        },
        {
          id: "count-4-apples",
          englishName: "Four apples",
          vietnameseName: "Có 4 quả táo",
          phoneticHint: "Four apples",
          emoji: "🍎🍎🍎🍎",
          shape: "apple",
          colorKey: "red",
          quantity: 4,
        },
      ],
    },
  ],

  // MỨC 3: PHẢN XẠ HỎI – ĐÁP GIAO TIẾP HÀNG NGÀY CÙNG KUROMI
  3: [
    {
      id: "bag-l3-1",
      level: 3,
      kuromiSpeechEn: "Hello! What is your name?",
      kuromiSpeechVi:
        "Khi người nước ngoài hoặc bạn mới hỏi: 'What is your name?' (Tên của em là gì?), Nấm đáp lại thế nào?",
      speakingTargetEn: "Hello! My name is Nam! Nice to meet you!",
      speakingTargetVi: "Xin chào! Tên tớ là Nấm! Rất vui được gặp bạn!",
      grammarTag: "Giao tiếp: What is your name? → My name is...",
      correctItemId: "ans-name",
      hintVi: "My name is Nam! nghĩa là Tên của con là Nấm!",
      items: [
        {
          id: "ans-name",
          englishName: "My name is Nam!",
          vietnameseName: "Tên của tớ là Nấm!",
          phoneticHint: "My name is Nam",
          emoji: "👧✨",
          colorKey: "pink",
        },
        {
          id: "ans-fine",
          englishName: "Good night, Mommy!",
          vietnameseName: "Chúc mẹ ngủ ngon!",
          phoneticHint: "Good night",
          emoji: "🌙💤",
          colorKey: "purple",
        },
        {
          id: "ans-sorry",
          englishName: "I am sorry!",
          vietnameseName: "Cho con xin lỗi!",
          phoneticHint: "I am sorry",
          emoji: "🙏💗",
          colorKey: "yellow",
        },
        {
          id: "ans-bye",
          englishName: "Goodbye, see you!",
          vietnameseName: "Tạm biệt, hẹn gặp lại!",
          phoneticHint: "Goodbye",
          emoji: "👋🌈",
          colorKey: "blue",
        },
      ],
    },
    {
      id: "bag-l3-2",
      level: 3,
      kuromiSpeechEn: "Do you like strawberry ice cream, Nam?",
      kuromiSpeechVi:
        "Kuromi hỏi Nấm: 'Do you like strawberry ice cream?' (Bạn có thích kem dâu tây không?). Nấm trả lời đồng ý thật vui nhé!",
      speakingTargetEn: "Yes, I do! I love strawberry ice cream!",
      speakingTargetVi: "Có chứ! Tớ rất thích kem dâu tây!",
      grammarTag: "Câu hỏi Do you like...? → Yes, I do! / No, I don't.",
      correctItemId: "ans-yes-i-do",
      hintVi: "Khi được hỏi 'Do you like...?', nếu thích mình trả lời 'Yes, I do!' nhé!",
      items: [
        {
          id: "ans-yes-i-do",
          englishName: "Yes, I do! Yummy!",
          vietnameseName: "Dạ có! Ngon tuyệt!",
          phoneticHint: "Yes, I do!",
          emoji: "🍦😋",
          colorKey: "pink",
        },
        {
          id: "ans-good-morning",
          englishName: "Good morning!",
          vietnameseName: "Chào buổi sáng!",
          phoneticHint: "Good morning",
          emoji: "☀️🌻",
          colorKey: "yellow",
        },
        {
          id: "ans-sit-down",
          englishName: "Sit down, please!",
          vietnameseName: "Mời ngồi xuống ạ!",
          phoneticHint: "Sit down",
          emoji: "🪑✨",
          colorKey: "blue",
        },
        {
          id: "ans-im-six",
          englishName: "I am six years old!",
          vietnameseName: "Tớ lên 6 tuổi!",
          phoneticHint: "I am six",
          emoji: "🎂6️⃣",
          colorKey: "green",
        },
      ],
    },
    {
      id: "bag-l3-3",
      level: 3,
      kuromiSpeechEn: "Here is a gift for you, Nam! Happy day!",
      kuromiSpeechVi:
        "Khi Kuromi hoặc người lớn đưa quà và nói 'Here is a gift for you!' (Tặng quà cho con này!), Nấm lịch sự nói câu gì?",
      speakingTargetEn: "Thank you very much, Kuromi! I love it!",
      speakingTargetVi: "Cảm ơn bạn Kuromi rất nhiều! Tớ thích lắm!",
      grammarTag: "Phép lịch sự: Nhận quà → Thank you very much!",
      correctItemId: "ans-thank-you",
      hintVi: "Khi được nhận quà hay giúp đỡ, mình nói 'Thank you very much!' nhé!",
      items: [
        {
          id: "ans-thank-you",
          englishName: "Thank you very much!",
          vietnameseName: "Con cảm ơn rất nhiều ạ!",
          phoneticHint: "Thank you very much",
          emoji: "🎁💖",
          colorKey: "pink",
        },
        {
          id: "ans-excuse-me",
          englishName: "Open the book!",
          vietnameseName: "Hãy mở sách ra nào!",
          phoneticHint: "Open the book",
          emoji: "📖👀",
          colorKey: "blue",
        },
        {
          id: "ans-stand-up",
          englishName: "Stand up, please!",
          vietnameseName: "Xin mời đứng lên!",
          phoneticHint: "Stand up",
          emoji: "🧍‍♀️⬆️",
          colorKey: "orange",
        },
        {
          id: "ans-wash-hands",
          englishName: "Wash your hands!",
          vietnameseName: "Hãy rửa sạch tay nhé!",
          phoneticHint: "Wash your hands",
          emoji: "🧼👐",
          colorKey: "green",
        },
      ],
    },
  ],
};

// ============================================================================
// KHO ĐỒ VẬT DÙNG CHUNG (KẾ THỪA TRỰC TIẾP TỪ SHARED_ASSET_CATALOG - KHÔNG PHÂN MẢNH)
// Tự động lấy tên Tiếng Anh, Tiếng Việt, Phiên âm IPA, Màu sắc, Hoạt động, Âm thanh từ Kho Trung Tâm
// ============================================================================
function mapPrimaryColorToEnglishColorKey(c: AssetPrimaryColor): EnglishColorKey {
  if (c === "brown") return "orange";
  return c;
}

function formatSentenceCaseVi(raw: string): string {
  const trimmed = raw.trim().toLowerCase();
  if (!trimmed) return "";
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

function extractCoreNounEn(rawWord: string, fallbackName: string): string {
  const base = (rawWord || fallbackName).trim();
  const stripped = base
    .replace(
      /^(Red|Yellow|Blue|Pink|Green|Purple|Orange|White|Brown|Golden|Rainbow|Sweet|Cute|Mini|Big|Fresh|Hot|Warm|Cold|Soft|Shiny)\s+/i,
      "",
    )
    .trim();
  const finalized = stripped || base;
  return finalized.charAt(0).toUpperCase() + finalized.slice(1).toLowerCase();
}

function pluralizeEnglishNoun(singularLower: string): string {
  const w = singularLower.trim().toLowerCase();
  if (w.endsWith("s") || w.endsWith("sh") || w.endsWith("ch") || w.endsWith("x")) {
    return w.endsWith("s") ? w : `${w}es`;
  }
  if (w.endsWith("y") && !/[aeiou]y$/.test(w)) {
    return `${w.slice(0, -1)}ies`;
  }
  if (w.endsWith("fe")) {
    return `${w.slice(0, -2)}ves`;
  }
  if (w.endsWith("f") && w !== "roof" && w !== "chef") {
    return `${w.slice(0, -1)}ves`;
  }
  return `${w}s`;
}

const UNCOUNTABLE_OR_PLURAL_NOUNS = new Set([
  "milk",
  "juice",
  "water",
  "tea",
  "bubble tea",
  "milk tea",
  "rice",
  "soup",
  "bread",
  "cheese",
  "jam",
  "honey",
  "scissors",
  "glasses",
  "shoes",
  "chopsticks",
  "noodles",
  "grapes",
  "crayons",
]);

export const KAWAII_SHOP_VOCAB_POOL: EnglishShopItem[] = SHARED_ASSET_CATALOG.filter(
  (asset) => !asset.imageUrl.includes("pastries16"),
).map((asset) => {
  const coreNounEn = extractCoreNounEn(asset.englishWord, asset.englishName);
  const shortVi = formatSentenceCaseVi(asset.readingWordVi);
  return {
    id: `kw-${asset.id}`,
    englishName: coreNounEn,
    vietnameseName: shortVi,
    phoneticHint: asset.pronunciationIpa,
    emoji: asset.icon,
    colorKey: mapPrimaryColorToEnglishColorKey(asset.primaryColor),
    image: asset.imageUrl,
    badgeText:
      asset.themeGroup === "lifeskills"
        ? "ĐỒ BẾP"
        : asset.categoryLabel.toUpperCase(),
  };
});

function buildDynamicLifeSkillsActionRounds(
  level: EnglishDifficultyLevel,
): EnglishRound[] {
  const pool = LIFESKILLS_SHARED_ASSETS;
  const rounds: EnglishRound[] = [];

  for (let i = 0; i < pool.length; i++) {
    const target = pool[i];
    const distractors = shuffleInPlace(
      pool.filter(
        (x) => x.id !== target.id && x.activityPhraseEn !== target.activityPhraseEn,
      ),
    ).slice(0, 3);

    const toShopItem = (a: (typeof pool)[number]): EnglishShopItem => ({
      id: `act-ls-${a.id}`,
      englishName: a.activityPhraseEn,
      vietnameseName: `${a.activityLabelVi} (${formatSentenceCaseVi(a.readingWordVi)})`,
      phoneticHint: `Verb: ${a.activityVerbEn.toUpperCase()} · ${a.pronunciationIpa}`,
      emoji: a.icon,
      colorKey: mapPrimaryColorToEnglishColorKey(a.primaryColor),
      image: a.imageUrl,
      badgeText: a.activityVerbEn.toUpperCase(),
    });

    const targetItem = toShopItem(target);
    const distractorItems = distractors.map(toShopItem);

    rounds.push({
      id: `dyn-act-ls-l${level}-${target.id}`,
      level,
      kuromiSpeechEn: `Kuromi says: Let's ${target.activityPhraseEn.toLowerCase()}!`,
      kuromiSpeechVi: `Hoạt động Kỹ Năng Sống: "${target.activityPhraseEn}" — ${target.activityLabelVi}!`,
      speakingTargetEn: `I can ${target.activityPhraseEn.toLowerCase()}!`,
      speakingTargetVi: `${target.activityLabelVi}!`,
      grammarTag: `Hoạt động Bếp & Tự Lập: ${target.activityVerbEn}`,
      correctItemId: targetItem.id,
      hintVi: `Nấm chọn hình ${formatSentenceCaseVi(target.readingWordVi)} (${target.activityLabelVi}) nhé!`,
      items: [targetItem, ...distractorItems],
    });
  }

  return rounds;
}

function shuffleInPlace<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildDynamicShopRounds(level: EnglishDifficultyLevel): EnglishRound[] {
  const pool = [...KAWAII_SHOP_VOCAB_POOL];
  const dynamicRounds: EnglishRound[] = [];

  for (let i = 0; i < pool.length; i++) {
    const target = pool[i];
    const distractors = shuffleInPlace(
      pool.filter(
        (x) =>
          x.id !== target.id &&
          x.englishName.toLowerCase() !== target.englishName.toLowerCase(),
      ),
    ).slice(0, 3);

    if (level === 1) {
      // CẤP 1: CHỈ HỎI TỪ ĐƠN (SINGLE NOUN), NGẮN GỌN, DỄ NHỚ, CHỌN 1 MÓN BỎ GIỎ
      const nounLower = target.englishName.toLowerCase();
      const article = /^[aeiou]/i.test(nounLower) ? "an" : "a";
      const askPhrase = UNCOUNTABLE_OR_PLURAL_NOUNS.has(nounLower)
        ? nounLower
        : `${article} ${nounLower}`;
      dynamicRounds.push({
        id: `dyn-shop-l1-${target.id}`,
        level: 1,
        kuromiSpeechEn: `${target.englishName}, please! Can I have ${askPhrase}?`,
        kuromiSpeechVi: `Kuromi muốn mua "${target.englishName}" (${target.vietnameseName}). Nấm lấy giúp nhé!`,
        speakingTargetEn: `${target.englishName}, please! — Here you are!`,
        speakingTargetVi: `Cho tớ ${target.vietnameseName.toLowerCase()} nhé! — Của bạn đây!`,
        grammarTag: "Cấp 1 · Từ đơn: Đồ vật & Trái cây",
        correctItemId: target.id,
        hintVi: `"${target.englishName}" nghĩa là ${target.vietnameseName} đấy Nấm ơi!`,
        items: [target, ...distractors],
      });
    } else if (level === 2) {
      // CẤP 2: TÍNH TỪ + DANH TỪ ĐA DẠNG (ADJECTIVE + NOUN: VỊ, NHIỆT ĐỘ, KÍCH CỠ, ĐẶC TÍNH, MÀU SẮC)
      const ADJECTIVE_BY_NOUN: Record<string, { adjEn: string; adjVi: string }> = {
        strawberry: { adjEn: "Sweet", adjVi: "ngọt lịm" },
        apple: { adjEn: "Crunchy", adjVi: "giòn ngọt" },
        banana: { adjEn: "Ripe", adjVi: "chín vàng" },
        orange: { adjEn: "Juicy", adjVi: "mọng nước" },
        watermelon: { adjEn: "Juicy", adjVi: "mát ngọt" },
        grapes: { adjEn: "Sweet", adjVi: "ngọt ngào" },
        pear: { adjEn: "Crisp", adjVi: "giòn mát" },
        peach: { adjEn: "Soft", adjVi: "mềm thơm" },
        lemon: { adjEn: "Sour", adjVi: "chua mát" },
        cherry: { adjEn: "Sweet", adjVi: "đỏ mọng" },
        blueberry: { adjEn: "Sweet", adjVi: "ngọt mát" },
        pineapple: { adjEn: "Juicy", adjVi: "thơm ngọt" },
        mango: { adjEn: "Sweet", adjVi: "chín ngọt" },
        kiwi: { adjEn: "Fresh", adjVi: "tươi xanh" },
        avocado: { adjEn: "Creamy", adjVi: "béo mịn" },
        cupcake: { adjEn: "Sweet", adjVi: "kem ngọt" },
        donut: { adjEn: "Yummy", adjVi: "thơm ngon" },
        lollipop: { adjEn: "Sweet", adjVi: "ngọt ngào" },
        candy: { adjEn: "Sweet", adjVi: "ngọt lịm" },
        cookie: { adjEn: "Crunchy", adjVi: "giòn rụm" },
        macaron: { adjEn: "Soft", adjVi: "mềm xốp" },
        cake: { adjEn: "Sweet", adjVi: "ngọt ngào" },
        pudding: { adjEn: "Soft", adjVi: "mềm mịn" },
        "ice cream": { adjEn: "Cold", adjVi: "mát lạnh" },
        popsicle: { adjEn: "Cold", adjVi: "mát rượi" },
        "bubble tea": { adjEn: "Sweet", adjVi: "thơm béo" },
        "strawberry milk": { adjEn: "Fresh", adjVi: "thơm mát" },
        "orange juice": { adjEn: "Fresh", adjVi: "tươi mát" },
        "hot cocoa": { adjEn: "Warm", adjVi: "ấm áp" },
        sundae: { adjEn: "Cold", adjVi: "mát lạnh" },
        backpack: { adjEn: "Cute", adjVi: "xinh xắn" },
        notebook: { adjEn: "New", adjVi: "mới tinh" },
        book: { adjEn: "Good", adjVi: "hay" },
        pencil: { adjEn: "Long", adjVi: "dài" },
        pen: { adjEn: "Cute", adjVi: "xinh" },
        ruler: { adjEn: "Long", adjVi: "thẳng dài" },
        eraser: { adjEn: "Soft", adjVi: "mềm" },
        crayons: { adjEn: "Bright", adjVi: "rực rỡ" },
        scissors: { adjEn: "Sharp", adjVi: "sắc bén" },
        glue: { adjEn: "Sticky", adjVi: "dính chắc" },
        palette: { adjEn: "Bright", adjVi: "nhiều màu" },
        "pencil case": { adjEn: "Cute", adjVi: "đáng yêu" },
        calculator: { adjEn: "Smart", adjVi: "thông minh" },
        "school bus": { adjEn: "Big", adjVi: "to lớn" },
        globe: { adjEn: "Round", adjVi: "tròn xoay" },
        lamp: { adjEn: "Bright", adjVi: "sáng rõ" },
        teacup: { adjEn: "Warm", adjVi: "ấm áp" },
        spoon: { adjEn: "Shiny", adjVi: "sáng bóng" },
        plate: { adjEn: "Clean", adjVi: "sạch bóng" },
        clock: { adjEn: "Loud", adjVi: "kêu vang" },
        sofa: { adjEn: "Soft", adjVi: "êm ái" },
        pillow: { adjEn: "Soft", adjVi: "êm mềm" },
        bathtub: { adjEn: "Warm", adjVi: "ấm áp" },
        soap: { adjEn: "Clean", adjVi: "thơm sạch" },
        towel: { adjEn: "Soft", adjVi: "mềm sạch" },
        plant: { adjEn: "Green", adjVi: "xanh tươi" },
        fridge: { adjEn: "Cold", adjVi: "mát lạnh" },
        "washing machine": { adjEn: "Clean", adjVi: "giặt sạch" },
        broom: { adjEn: "Clean", adjVi: "quét sạch" },
        "watering can": { adjEn: "Full", adjVi: "đầy nước" },
        car: { adjEn: "Fast", adjVi: "chạy nhanh" },
        bus: { adjEn: "Big", adjVi: "to lớn" },
        bicycle: { adjEn: "Fast", adjVi: "chạy nhanh" },
        scooter: { adjEn: "Cute", adjVi: "xinh xắn" },
        train: { adjEn: "Long", adjVi: "dài" },
        airplane: { adjEn: "Big", adjVi: "to lớn" },
        helicopter: { adjEn: "Fast", adjVi: "bay nhanh" },
        sailboat: { adjEn: "White", adjVi: "cánh buồm trắng" },
        submarine: { adjEn: "Deep", adjVi: "lặn sâu" },
        rocket: { adjEn: "Fast", adjVi: "bay vút" },
        "fire truck": { adjEn: "Big", adjVi: "to lớn" },
        "police car": { adjEn: "Fast", adjVi: "chạy nhanh" },
        ambulance: { adjEn: "Fast", adjVi: "cấp cứu nhanh" },
        balloon: { adjEn: "High", adjVi: "bay cao" },
        skateboard: { adjEn: "Cool", adjVi: "siêu ngầu" },
        "cutting board": { adjEn: "Clean", adjVi: "sạch sẽ" },
        "mixing bowl": { adjEn: "Big", adjVi: "to" },
        milk: { adjEn: "Fresh", adjVi: "tươi ngon" },
        egg: { adjEn: "Fresh", adjVi: "tươi" },
        flour: { adjEn: "Soft", adjVi: "mịn màng" },
        vegetables: { adjEn: "Fresh", adjVi: "tươi xanh" },
        "frying pan": { adjEn: "Hot", adjVi: "nóng" },
        "cooking pot": { adjEn: "Hot", adjVi: "nóng hổi" },
        spatula: { adjEn: "Clean", adjVi: "sạch sẽ" },
        ladle: { adjEn: "Deep", adjVi: "lòng sâu" },
        "measuring spoons": { adjEn: "Cute", adjVi: "nhiều màu" },
        apron: { adjEn: "Clean", adjVi: "sạch đẹp" },
        "rolling pin": { adjEn: "Smooth", adjVi: "nhẵn mịn" },
        "cookie tray": { adjEn: "Warm", adjVi: "thơm phức" },
        "oven mitt": { adjEn: "Thick", adjVi: "dày dặn" },
        mixer: { adjEn: "Fast", adjVi: "quay nhanh" },
        rice: { adjEn: "Warm", adjVi: "dẻo thơm" },
        noodles: { adjEn: "Hot", adjVi: "nóng hổi" },
        burger: { adjEn: "Yummy", adjVi: "thơm ngon" },
        "fried chicken": { adjEn: "Crispy", adjVi: "giòn rụm" },
      };

      const toDescribedItem = (it: EnglishShopItem, idxSeed: number): EnglishShopItem => {
        const nounKey = it.englishName.toLowerCase();
        const desc = ADJECTIVE_BY_NOUN[nounKey];
        const useColorFallback = !desc || idxSeed % 4 === 3;
        if (useColorFallback) {
          const cInfo = it.colorKey ? ENGLISH_COLOR_PALETTE[it.colorKey] : null;
          const cEn = cInfo ? cInfo.en : "Pink";
          const cVi = cInfo ? cInfo.vi.toLowerCase() : "màu hồng";
          return {
            ...it,
            englishName: `${cEn} ${nounKey}`,
            vietnameseName: `${it.vietnameseName} ${cVi}`,
            phoneticHint: `${cEn} + ${it.englishName}`,
          };
        }
        return {
          ...it,
          englishName: `${desc.adjEn} ${nounKey}`,
          vietnameseName: `${it.vietnameseName} ${desc.adjVi}`,
          phoneticHint: `${desc.adjEn} + ${it.englishName}`,
        };
      };
      const describedTarget = toDescribedItem(target, i);
      const describedDistractors = distractors.map((d, dIdx) =>
        toDescribedItem(d, i + dIdx + 1),
      );
      dynamicRounds.push({
        id: `dyn-shop-l2-${target.id}`,
        level: 2,
        kuromiSpeechEn: `${describedTarget.englishName}, please! I want the ${describedTarget.englishName.toLowerCase()}!`,
        kuromiSpeechVi: `Kuromi cần "${describedTarget.englishName}" (${describedTarget.vietnameseName}). Nấm chọn đúng món nhé!`,
        speakingTargetEn: `Here is the ${describedTarget.englishName.toLowerCase()}!`,
        speakingTargetVi: `Đây là ${describedTarget.vietnameseName.toLowerCase()} của bạn!`,
        grammarTag: "Cấp 2 · Tính từ + Danh từ (Adjective + Noun)",
        correctItemId: describedTarget.id,
        hintVi: `Nấm tìm ${describedTarget.vietnameseName} (${describedTarget.englishName}) nhé!`,
        items: [describedTarget, ...describedDistractors],
      });
    } else {
      // CẤP 3: SỐ ĐẾM (2-3 MÓN) + MÀU SẮC + DANH TỪ SỐ NHIỀU (KHỚP 100% GIỎ MUA HÀNG ĐẾM MÓN)
      const nounLower = target.englishName.toLowerCase();
      if (UNCOUNTABLE_OR_PLURAL_NOUNS.has(nounLower)) {
        continue;
      }
      const targetQty: 2 | 3 = i % 2 === 0 ? 2 : 3;
      const toCountedItem = (
        it: EnglishShopItem,
        qty: 1 | 2 | 3,
      ): EnglishShopItem => {
        const cInfo = it.colorKey ? ENGLISH_COLOR_PALETTE[it.colorKey] : null;
        const cEn = (cInfo ? cInfo.en : "Pink").toLowerCase();
        const cVi = cInfo ? cInfo.vi.toLowerCase() : "màu hồng";
        const baseNoun = it.englishName.toLowerCase();
        const nounForm = qty > 1 ? pluralizeEnglishNoun(baseNoun) : baseNoun;
        const numWord = qty === 1 ? "One" : qty === 2 ? "Two" : "Three";
        return {
          ...it,
          quantity: qty,
          englishName: `${numWord} ${cEn} ${nounForm}`,
          vietnameseName: `${qty} ${it.vietnameseName.toLowerCase()} ${cVi}`,
          phoneticHint: `${qty} + ${cEn} + ${nounForm}`,
        };
      };

      const countedTarget = toCountedItem(target, targetQty);
      const distractorQtys: Array<1 | 2 | 3> = [
        targetQty === 2 ? 3 : 2,
        targetQty,
        1,
      ];
      const countedDistractors = distractors.map((d, dIdx) =>
        toCountedItem(d, distractorQtys[dIdx % distractorQtys.length]),
      );

      dynamicRounds.push({
        id: `dyn-shop-l3-${target.id}`,
        level: 3,
        kuromiSpeechEn: `${countedTarget.englishName}, please! I want ${countedTarget.englishName.toLowerCase()}!`,
        kuromiSpeechVi: `Đơn hàng Cấp 3: Kuromi cần ${countedTarget.vietnameseName} (${countedTarget.englishName}). Nấm chạm nhặt đủ ${targetQty} món vào giỏ nhé!`,
        speakingTargetEn: `Here are ${countedTarget.englishName.toLowerCase()}!`,
        speakingTargetVi: `Của bạn đây: ${countedTarget.vietnameseName}!`,
        grammarTag: "Cấp 3 · Số đếm + Màu sắc + Danh từ số nhiều",
        correctItemId: countedTarget.id,
        hintVi: `Nấm chạm chọn đúng ${countedTarget.vietnameseName} (${countedTarget.englishName}) đủ ${targetQty} lần vào giỏ nhé!`,
        items: [countedTarget, ...countedDistractors],
      });
    }
  }

  return dynamicRounds;
}

// ============================================================================
// 5. BỘ CÂU HỎI ĐẶC BIỆT VỚI HÌNH DÁN BÉ NẤM THẬT ("I am Nam", "Nam likes cake", "Nam reads a book"...)
// ============================================================================
export const NAM_FEATURED_ROUNDS_BY_GAME: Record<
  EnglishMiniGameId,
  EnglishRound[]
> = {
  "kuromi-shop": [
    {
      id: "nam-en-shop-cake",
      level: 1,
      kuromiSpeechEn: "Nam likes cake! Can Nam have a sweet cake, please?",
      kuromiSpeechVi:
        "Câu hỏi của Nấm: 'Nam likes cake!' (Nấm thích ăn bánh ngọt!). Đâu là hình Bé Nấm đang ăn bánh ngọt?",
      speakingTargetEn: "I am Nam! Nam likes cake!",
      speakingTargetVi: "Tớ là Nấm! Nấm rất thích ăn bánh ngọt!",
      grammarTag: "Mẫu câu của Nấm: Nam likes + Đồ ăn",
      correctItemId: "nam-cake-item",
      hintVi: "Chọn hình Bé Nấm đang cầm chiếc bánh Donut ngọt ngào nhé!",
      items: [
        {
          id: "nam-cake-item",
          englishName: "Nam likes cake",
          vietnameseName: "Nấm thích ăn bánh ngọt",
          phoneticHint: "Nam + likes + cake",
          emoji: "👦🍩",
          colorKey: "pink",
          image: "/assets/nam-stickers/nam-eat-donut.png",
          badgeText: "NAM LIKES",
        },
        {
          id: "nam-milk-item",
          englishName: "Nam drinks milk",
          vietnameseName: "Nấm uống sữa tươi",
          phoneticHint: "Nam + drinks + milk",
          emoji: "👦🥛",
          colorKey: "blue",
          image: "/assets/nam-stickers/nam-eat-milk.png",
          badgeText: "NAM DRINKS",
        },
        {
          id: "nam-watermelon-item",
          englishName: "Nam likes watermelon",
          vietnameseName: "Nấm ăn dưa hấu",
          phoneticHint: "Nam + likes + watermelon",
          emoji: "👦🍉",
          colorKey: "red",
          image: "/assets/nam-stickers/nam-eat-watermelon.png",
          badgeText: "NAM LIKES",
        },
        {
          id: "nam-noodles-item",
          englishName: "Nam eats noodles",
          vietnameseName: "Nấm ăn mì trứng",
          phoneticHint: "Nam + eats + noodles",
          emoji: "👦🍜",
          colorKey: "yellow",
          image: "/assets/nam-stickers/nam-eat-noodles.png",
          badgeText: "NAM EATS",
        },
      ],
    },
    {
      id: "nam-en-shop-icecream",
      level: 1,
      kuromiSpeechEn: "Yummy! Nam likes ice cream! Pick Nam with ice cream!",
      kuromiSpeechVi:
        "Trời nắng ấm, 'Nam likes ice cream!' (Nấm thích ăn kem ốc quế!). Nấm chọn đúng hình của mình nhé!",
      speakingTargetEn: "Nam likes yummy ice cream!",
      speakingTargetVi: "Nấm thích kem ốc quế ngon tuyệt!",
      grammarTag: "Mẫu câu của Nấm: Nam likes ice cream",
      correctItemId: "nam-icecream-item",
      hintVi: "Chọn hình Bé Nấm đang cầm cây Kem Ốc Quế mát lạnh nhé!",
      items: [
        {
          id: "nam-icecream-item",
          englishName: "Nam likes ice cream",
          vietnameseName: "Nấm thích ăn kem ốc quế",
          phoneticHint: "Nam + likes + ice cream",
          emoji: "👦🍦",
          colorKey: "pink",
          image: "/assets/nam-stickers/nam-eat-icecream.png",
          badgeText: "ICE CREAM",
        },
        {
          id: "nam-cookies-item",
          englishName: "Nam likes cookies",
          vietnameseName: "Nấm thích bánh quy",
          phoneticHint: "Nam + likes + cookies",
          emoji: "👦🍪",
          colorKey: "orange",
          image: "/assets/nam-stickers/nam-eat-cookies.png",
          badgeText: "COOKIES",
        },
        {
          id: "nam-strawberry-item",
          englishName: "Nam likes strawberries",
          vietnameseName: "Nấm thích dâu tây đỏ",
          phoneticHint: "Nam + likes + strawberries",
          emoji: "👦🍓",
          colorKey: "red",
          image: "/assets/nam-stickers/nam-eat-strawberry.png",
          badgeText: "STRAWBERRY",
        },
        {
          id: "nam-burger-item",
          englishName: "Nam likes burgers",
          vietnameseName: "Nấm thích bánh Burger",
          phoneticHint: "Nam + likes + burgers",
          emoji: "👦🍔",
          colorKey: "yellow",
          image: "/assets/nam-stickers/nam-eat-burger.png",
          badgeText: "BURGER",
        },
      ],
    },
  ],
  "kuromi-actions": [
    {
      id: "nam-en-act-read",
      level: 1,
      kuromiSpeechEn: "Look at Nam! Nam can read a book!",
      kuromiSpeechVi:
        "Nhìn hình Nấm kìa: 'Nam can read a book!' (Nấm đọc sách rất chăm!). Đâu là hình Nấm Đọc Sách?",
      speakingTargetEn: "I am Nam! I can read a book!",
      speakingTargetVi: "Tớ là Nấm! Tớ có thể đọc sách!",
      grammarTag: "Hành động của Nấm: Read a book",
      correctItemId: "nam-act-read",
      hintVi: "Chọn hình Bé Nấm đang mở quyển sách ngồi đọc chăm chú nhé!",
      items: [
        {
          id: "nam-act-read",
          englishName: "Nam reads a book",
          vietnameseName: "Nấm chăm đọc sách",
          phoneticHint: "Read a book (Đọc sách)",
          emoji: "👦📖",
          colorKey: "blue",
          image: "/assets/nam-stickers/nam-study-read.png",
          badgeText: "READ",
        },
        {
          id: "nam-act-paint",
          englishName: "Nam paints a picture",
          vietnameseName: "Họa sĩ Nấm vẽ tranh",
          phoneticHint: "Paint a picture (Vẽ tranh)",
          emoji: "👦🎨",
          colorKey: "pink",
          image: "/assets/nam-stickers/nam-study-paint.png",
          badgeText: "PAINT",
        },
        {
          id: "nam-act-brush",
          englishName: "Nam brushes teeth",
          vietnameseName: "Nấm ngoan đánh răng",
          phoneticHint: "Brush teeth (Đánh răng)",
          emoji: "👦🪥",
          colorKey: "green",
          image: "/assets/nam-stickers/nam-study-brush.png",
          badgeText: "BRUSH",
        },
        {
          id: "nam-act-sing",
          englishName: "Nam sings a song",
          vietnameseName: "Ca sĩ Nấm hát vang",
          phoneticHint: "Sing a song (Ca hát)",
          emoji: "👦🎤",
          colorKey: "yellow",
          image: "/assets/nam-stickers/nam-stage-star.png?v=3dclay",
          badgeText: "SING",
        },
      ],
    },
    {
      id: "nam-en-act-sing",
      level: 1,
      kuromiSpeechEn: "Superstar Nam! Nam can sing a song on stage!",
      kuromiSpeechVi:
        "Ca sĩ Nấm biểu diễn giữa sân khấu: 'Nam can sing a song!' (Nấm hát vang bài ca!). Đâu là hình Ca Sĩ Nấm?",
      speakingTargetEn: "I am Nam! I love singing songs!",
      speakingTargetVi: "Tớ là Nấm! Tớ rất thích ca hát!",
      grammarTag: "Hành động của Nấm: Sing a song",
      correctItemId: "nam-act-sing-star",
      hintVi: "Chọn hình Ca Sĩ Nấm cầm micro đứng trên sân khấu nhé!",
      items: [
        {
          id: "nam-act-sing-star",
          englishName: "Nam sings a song",
          vietnameseName: "Ca sĩ Nấm cầm mic hát",
          phoneticHint: "Sing a song (Hát)",
          emoji: "👦🎤",
          colorKey: "pink",
          image: "/assets/nam-stickers/nam-stage-star.png?v=3dclay",
          badgeText: "SING",
        },
        {
          id: "nam-act-write",
          englishName: "Nam writes a lesson",
          vietnameseName: "Nấm ngồi viết bài",
          phoneticHint: "Write (Viết bài)",
          emoji: "👦✏️",
          colorKey: "yellow",
          image: "/assets/nam-stickers/nam-study-write.png",
          badgeText: "WRITE",
        },
        {
          id: "nam-act-water",
          englishName: "Nam waters plants",
          vietnameseName: "Nấm tưới cây xanh",
          phoneticHint: "Water plants (Tưới cây)",
          emoji: "👦🌱",
          colorKey: "green",
          image: "/assets/nam-stickers/nam-study-water.png",
          badgeText: "WATER",
        },
        {
          id: "nam-act-school",
          englishName: "Nam goes to school",
          vietnameseName: "Nấm đeo cặp đi học",
          phoneticHint: "Go to school (Đi học)",
          emoji: "👦🎒",
          colorKey: "blue",
          image: "/assets/nam-stickers/nam-study-school.png",
          badgeText: "SCHOOL",
        },
      ],
    },
  ],
  "kuromi-pronouns": [
    {
      id: "nam-en-pro-iam",
      level: 1,
      kuromiSpeechEn: "Hello! I am Nam! I go to school with my backpack!",
      kuromiSpeechVi:
        "Nấm tự giới thiệu bản thân bằng tiếng Anh: 'I am Nam!' (Tớ là Nấm!). Hãy chọn thẻ của Bé Nấm đeo cặp đi học nhé!",
      speakingTargetEn: "Hello! I am Nam! Nice to meet you!",
      speakingTargetVi: "Xin chào! Tớ là Nấm! Rất vui được gặp bạn!",
      grammarTag: " Tự giới thiệu: I am Nam!",
      correctItemId: "nam-pro-iam",
      hintVi: "Chọn hình Bé Nấm đeo cặp sách vẫy tay 'I am Nam!' nhé!",
      items: [
        {
          id: "nam-pro-iam",
          englishName: "I am Nam!",
          vietnameseName: "Tớ là Nấm (Đeo cặp đi học)",
          phoneticHint: "I am Nam /aɪ æm nɑːm/",
          emoji: "👦🎒",
          colorKey: "pink",
          image: "/assets/nam-stickers/nam-study-school.png",
          badgeText: "I AM NAM",
        },
        {
          id: "nam-pro-kitty",
          englishName: "We hug Hello Kitty",
          vietnameseName: "Nấm ôm bạn Hello Kitty",
          phoneticHint: "Nam & Hello Kitty",
          emoji: "👦🎀",
          colorKey: "red",
          image: "/assets/nam-stickers/nam-hug-kitty.png",
          badgeText: "WE ARE FRIENDS",
        },
        {
          id: "nam-pro-doraemon",
          englishName: "He hugs Doraemon",
          vietnameseName: "Nấm ôm bạn Doraemon",
          phoneticHint: "Nam & Doraemon",
          emoji: "👦🔔",
          colorKey: "blue",
          image: "/assets/nam-stickers/nam-hug-doraemon.png",
          badgeText: "BEST FRIENDS",
        },
        {
          id: "nam-pro-cinna",
          englishName: "We love Cinnamoroll",
          vietnameseName: "Nấm ôm bạn Cinnamoroll",
          phoneticHint: "Nam & Cinnamoroll",
          emoji: "👦☁️",
          colorKey: "yellow",
          image: "/assets/nam-stickers/nam-hug-cinna.png",
          badgeText: "WE LOVE",
        },
      ],
    },
    {
      id: "nam-en-pro-likes",
      level: 1,
      kuromiSpeechEn: "Nam likes cookies and milk tea! He is so happy!",
      kuromiSpeechVi:
        "Khi nói về món Nấm thích: 'Nam likes cookies!' (Nấm thích ăn bánh quy!). Đâu là hình Nấm bưng khay bánh quy?",
      speakingTargetEn: "I am Nam, and I like yummy cookies!",
      speakingTargetVi: "Tớ là Nấm, và tớ thích bánh quy thơm ngon!",
      grammarTag: "Ngôi thứ 3 số ít: Nam likes...",
      correctItemId: "nam-pro-cookies",
      hintVi: "Chọn hình Bé Nấm đang bưng khay Bánh Quy (Cookies) thơm phức nhé!",
      items: [
        {
          id: "nam-pro-cookies",
          englishName: "Nam likes cookies",
          vietnameseName: "Nấm thích bánh quy thơm",
          phoneticHint: "Nam + likes + cookies",
          emoji: "👦🍪",
          colorKey: "orange",
          image: "/assets/nam-stickers/nam-eat-cookies.png",
          badgeText: "NAM LIKES",
        },
        {
          id: "nam-pro-milktea",
          englishName: "Nam likes milk tea",
          vietnameseName: "Nấm uống trà sữa trân châu",
          phoneticHint: "Nam + likes + milk tea",
          emoji: "👦🧋",
          colorKey: "pink",
          image: "/assets/nam-stickers/nam-eat-milktea.png",
          badgeText: "NAM LIKES",
        },
        {
          id: "nam-pro-chicken",
          englishName: "Nam eats fried chicken",
          vietnameseName: "Nấm ăn đùi gà rán",
          phoneticHint: "Nam + eats + chicken",
          emoji: "👦🍗",
          colorKey: "yellow",
          image: "/assets/nam-stickers/nam-eat-chicken.png",
          badgeText: "NAM EATS",
        },
        {
          id: "nam-pro-rice",
          englishName: "Nam eats white rice",
          vietnameseName: "Nấm ăn cơm trắng ngoan",
          phoneticHint: "Nam + eats + rice",
          emoji: "👦🍚",
          colorKey: "green",
          image: "/assets/nam-stickers/nam-eat-rice.png",
          badgeText: "NAM EATS",
        },
      ],
    },
  ],
  "mystery-bag": [
    {
      id: "nam-en-bag-kitty",
      level: 1,
      kuromiSpeechEn: "Who is Nam's best friend? Hint: Nam hugs Hello Kitty!",
      kuromiSpeechVi:
        "Đố Nấm: Hình nào là 'Nam hugs Hello Kitty' (Nấm ôm người bạn thân Hello Kitty)?",
      speakingTargetEn: "I am Nam! I love Hello Kitty!",
      speakingTargetVi: "Tớ là Nấm! Tớ yêu bạn Hello Kitty!",
      grammarTag: "Câu về Nấm & Bạn thân Sanrio",
      correctItemId: "nam-bag-kitty",
      hintVi: "Chọn hình Bé Nấm đang ôm bạn mèo Hello Kitty đeo nơ đỏ nhé!",
      items: [
        {
          id: "nam-bag-kitty",
          englishName: "Nam hugs Hello Kitty",
          vietnameseName: "Nấm ôm bạn Hello Kitty",
          phoneticHint: "Nam + hugs + Hello Kitty",
          emoji: "👦🎀",
          colorKey: "pink",
          image: "/assets/nam-stickers/nam-hug-kitty.png",
          badgeText: "HELLO KITTY",
        },
        {
          id: "nam-bag-kuromi",
          englishName: "Nam hugs Kuromi",
          vietnameseName: "Nấm ôm bạn Kuromi",
          phoneticHint: "Nam + hugs + Kuromi",
          emoji: "👦💜",
          colorKey: "purple",
          image: "/assets/nam-stickers/nam-hug-kuromi.png",
          badgeText: "KUROMI",
        },
        {
          id: "nam-bag-pochacco",
          englishName: "Nam hugs Pochacco",
          vietnameseName: "Nấm ôm bạn Pochacco",
          phoneticHint: "Nam + hugs + Pochacco",
          emoji: "👦⚽",
          colorKey: "green",
          image: "/assets/nam-stickers/nam-hug-pochacco.png",
          badgeText: "POCHACCO",
        },
        {
          id: "nam-bag-purin",
          englishName: "Nam hugs Pompompurin",
          vietnameseName: "Nấm ôm bạn Pompompurin",
          phoneticHint: "Nam + hugs + Purin",
          emoji: "👦🍮",
          colorKey: "yellow",
          image: "/assets/nam-stickers/nam-hug-purin.png",
          badgeText: "POMPOMPURIN",
        },
      ],
    },
  ],
};

// Lưu lịch sử 2 lần chơi gần nhất của từng game+level để không bao giờ lặp lại câu vừa chơi
const recentEnglishHistory = new Map<string, string[]>();

export function getEnglishRounds(
  gameId: EnglishMiniGameId,
  level: EnglishDifficultyLevel,
): EnglishRound[] {
  // Câu dài về Bé Nấm chỉ xuất hiện ở Cấp 3 (Mẫu câu phức hợp), tránh làm Cấp 1 & Cấp 2 bị giống nhau
  const namFeatured =
    level === 3
      ? (NAM_FEATURED_ROUNDS_BY_GAME[gameId] || []).map((r) => ({
          ...r,
          level,
        }))
      : [];

  let basePool: EnglishRound[] = [];
  switch (gameId) {
    case "kuromi-shop":
      basePool = [
        ...KUROMI_SHOP_ROUNDS[level],
        ...buildDynamicShopRounds(level),
      ];
      break;
    case "kuromi-actions":
      basePool = [
        ...KUROMI_ACTION_ROUNDS[level],
        ...(level >= 2 ? buildDynamicLifeSkillsActionRounds(level) : []),
        ...namFeatured,
      ];
      break;
    case "kuromi-pronouns":
      basePool = [...KUROMI_PRONOUN_ROUNDS[level], ...namFeatured];
      break;
    case "mystery-bag":
      basePool = [
        ...MYSTERY_BAG_ROUNDS[level],
        ...namFeatured,
      ];
      break;
  }

  const historyKey = `${gameId}-${level}`;
  const recentIds = recentEnglishHistory.get(historyKey) || [];

  const freshOthers = shuffleInPlace(
    basePool.filter((r) => !recentIds.includes(r.id)),
  );
  const fallbackOthers = shuffleInPlace(
    basePool.filter((r) => recentIds.includes(r.id)),
  );
  const combined = [...freshOthers, ...fallbackOthers];

  // Chọn ra 8 câu cho 1 lượt chơi, đảm bảo 2 câu liên tiếp không bao giờ trùng đáp án đúng
  const targetDeckSize = Math.min(8, basePool.length);
  const selectedDeck: EnglishRound[] = [];

  for (const cand of combined) {
    if (selectedDeck.length >= targetDeckSize) break;
    const prev1 = selectedDeck[selectedDeck.length - 1];
    const prev2 = selectedDeck[selectedDeck.length - 2];
    if (
      (prev1 && prev1.correctItemId === cand.correctItemId) ||
      (prev2 && prev2.correctItemId === cand.correctItemId)
    ) {
      continue;
    }
    selectedDeck.push({
      ...cand,
      // Xáo trộn vị trí 4 món đồ trên kệ ở mỗi lần vào bài
      items: shuffleInPlace([...cand.items]),
    });
  }

  // Nếu lọc chặt quá chưa đủ 8 câu thì bù thêm từ combined
  for (const cand of combined) {
    if (selectedDeck.length >= targetDeckSize) break;
    if (!selectedDeck.some((x) => x.id === cand.id)) {
      selectedDeck.push({
        ...cand,
        items: shuffleInPlace([...cand.items]),
      });
    }
  }

  // Lưu các câu đầu và danh sách vừa chơi vào lịch sử 2 phiên gần nhất
  const newHistory = [
    ...selectedDeck.slice(0, 4).map((r) => r.id),
    ...recentIds,
  ].slice(0, Math.min(8, Math.max(2, basePool.length - 3)));
  recentEnglishHistory.set(historyKey, newHistory);

  return selectedDeck;
}

// ============================================================================
// BỘ DỮ LIỆU CHUYÊN BIỆT CHO BÀI 3 (NỐI 2 CỘT: NGÔI HE/SHE/IT/THEY + HÀNH ĐỘNG)
// & BÀI 4 (CHIẾC TÚI BÍ MẬT MỞ KHÓA 3 BƯỚC: MÀU SẮC -> HÌNH DẠNG/TÍNH CHẤT -> ĐỒ VẬT)
// ============================================================================

export interface PronounMatchPair {
  id: string;
  pronounEn: "He" | "She" | "It" | "They";
  pronounVi: string;
  subjectImage: string;
  subjectLabelVi: string;
  actionEn: string;
  actionVi: string;
  fullSentenceEn: string;
  fullSentenceVi: string;
  actionImage: string;
  accentColor: string;
}

export interface PronounMatchRound {
  id: string;
  level: EnglishDifficultyLevel;
  titleEn: string;
  titleVi: string;
  pairs: PronounMatchPair[];
}

export const PRONOUN_MATCH_ROUNDS: Record<
  EnglishDifficultyLevel,
  PronounMatchRound[]
> = {
  // CẤP 1: TỪ ĐƠN 1 ÂM TIẾT (NGÔI + ĐỘNG TỪ 1 ÂM TIẾT: RUN, SING, SLEEP, JUMP)
  1: [
    {
      id: "pm-l1-1",
      level: 1,
      titleEn: "Match the person with the action! (He, She, It, They)",
      titleVi: "Nối nhân vật bên trái với đúng Ngôi và Động từ 1 âm tiết bên phải nhé!",
      pairs: [
        {
          id: "p1-he",
          pronounEn: "He",
          pronounVi: "Anh ấy / Bạn nam",
          subjectImage: "/assets/english/items/act_04_run.png",
          subjectLabelVi: "👦 Bạn nam (He)",
          actionEn: "He runs",
          actionVi: "Anh ấy chạy",
          fullSentenceEn: "He runs!",
          fullSentenceVi: "Bạn nam đang chạy!",
          actionImage: "/assets/english/items/act_04_run.png",
          accentColor: "#3b82f6",
        },
        {
          id: "p1-she",
          pronounEn: "She",
          pronounVi: "Cô ấy / Bạn nữ",
          subjectImage: "/assets/english/items/act_09_sing.png",
          subjectLabelVi: "👧 Bạn nữ (She)",
          actionEn: "She sings",
          actionVi: "Cô ấy hát",
          fullSentenceEn: "She sings!",
          fullSentenceVi: "Bạn nữ đang hát!",
          actionImage: "/assets/english/items/act_09_sing.png",
          accentColor: "#ec4899",
        },
        {
          id: "p1-it",
          pronounEn: "It",
          pronounVi: "Nó (Thú cưng)",
          subjectImage: "/assets/english/items/animal_05_cat.png",
          subjectLabelVi: "🐱 Chú mèo (It)",
          actionEn: "It sleeps",
          actionVi: "Nó ngủ",
          fullSentenceEn: "It sleeps!",
          fullSentenceVi: "Chú mèo đang ngủ!",
          actionImage: "/assets/pochacco/sticker-sleep.png",
          accentColor: "#10b981",
        },
        {
          id: "p1-they",
          pronounEn: "They",
          pronounVi: "Họ / Các bạn",
          subjectImage: "/assets/english/items/act_16_friends_play.png",
          subjectLabelVi: "👫 Các bạn (They)",
          actionEn: "They jump",
          actionVi: "Họ nhảy cao",
          fullSentenceEn: "They jump!",
          fullSentenceVi: "Các bạn cùng nhảy cao!",
          actionImage: "/assets/english/items/act_02_jump.png",
          accentColor: "#f59e0b",
        },
      ],
    },
    {
      id: "pm-l1-2",
      level: 1,
      titleEn: "Who does what? Match He, She, It, They!",
      titleVi: "Ai đang làm gì nhỉ? Nối cột Trái với cột Phải tương ứng nhé!",
      pairs: [
        {
          id: "p2-he",
          pronounEn: "He",
          pronounVi: "Anh ấy / Bạn nam",
          subjectImage: "/assets/english/items/act_08_swim.png",
          subjectLabelVi: "👦 Bạn nam (He)",
          actionEn: "He swims",
          actionVi: "Anh ấy bơi",
          fullSentenceEn: "He swims!",
          fullSentenceVi: "Bạn nam đang bơi!",
          actionImage: "/assets/english/items/act_08_swim.png",
          accentColor: "#3b82f6",
        },
        {
          id: "p2-she",
          pronounEn: "She",
          pronounVi: "Cô ấy / Bạn nữ",
          subjectImage: "/assets/english/items/act_07_dance.png",
          subjectLabelVi: "👧 Bạn nữ (She)",
          actionEn: "She dances",
          actionVi: "Cô ấy múa",
          fullSentenceEn: "She dances!",
          fullSentenceVi: "Bạn nữ đang múa!",
          actionImage: "/assets/english/items/act_07_dance.png",
          accentColor: "#ec4899",
        },
        {
          id: "p2-it",
          pronounEn: "It",
          pronounVi: "Nó (Cún con)",
          subjectImage: "/assets/english/items/animal_06_dog.png",
          subjectLabelVi: "🐶 Cún con (It)",
          actionEn: "It sits",
          actionVi: "Nó ngồi ngoan",
          fullSentenceEn: "It sits!",
          fullSentenceVi: "Cún con đang ngồi ngoan!",
          actionImage: "/assets/english/items/act_05_sit.png",
          accentColor: "#10b981",
        },
        {
          id: "p2-they",
          pronounEn: "They",
          pronounVi: "Họ / Các bạn",
          subjectImage: "/assets/pochacco/action-clap-two.png",
          subjectLabelVi: "👫 Các bạn (They)",
          actionEn: "They clap",
          actionVi: "Họ vỗ tay",
          fullSentenceEn: "They clap!",
          fullSentenceVi: "Các bạn đang vỗ tay!",
          actionImage: "/assets/pochacco/action-clap-two.png",
          accentColor: "#f59e0b",
        },
      ],
    },
  ],

  // CẤP 2: CỤM 2-3 ÂM TIẾT (NGÔI + ĐỘNG TỪ + DANH TỪ — CỦNG CỐ BÀI 2)
  2: [
    {
      id: "pm-l2-1",
      level: 2,
      titleEn: "Match Pronoun + Verb + Noun!",
      titleVi: "Nối Ngôi (He, She, It, They) với cụm Hành động + Đồ vật nhé!",
      pairs: [
        {
          id: "p21-he",
          pronounEn: "He",
          pronounVi: "Bạn nam (He)",
          subjectImage: "/assets/english/items/act_15_boy_kick_ball.png",
          subjectLabelVi: "👦 Bạn nam (He)",
          actionEn: "He kicks the ball",
          actionVi: "Bạn nam đá bóng",
          fullSentenceEn: "He kicks the ball!",
          fullSentenceVi: "Bạn nam đang đá quả bóng!",
          actionImage: "/assets/pochacco/sticker-soccer.png",
          accentColor: "#3b82f6",
        },
        {
          id: "p21-she",
          pronounEn: "She",
          pronounVi: "Bạn nữ (She)",
          subjectImage: "/assets/nam-stickers/nam-eat-strawberry.png",
          subjectLabelVi: "👧 Bạn nữ (She)",
          actionEn: "She eats an apple",
          actionVi: "Bạn nữ ăn táo",
          fullSentenceEn: "She eats an apple!",
          fullSentenceVi: "Bạn nữ đang ăn quả táo!",
          actionImage: "/assets/items/fruits/fruit_02.png",
          accentColor: "#ec4899",
        },
        {
          id: "p21-it",
          pronounEn: "It",
          pronounVi: "Chú mèo (It)",
          subjectImage: "/assets/english/items/animal_05_cat.png",
          subjectLabelVi: "🐱 Chú mèo (It)",
          actionEn: "It drinks milk",
          actionVi: "Chú mèo uống sữa",
          fullSentenceEn: "It drinks milk!",
          fullSentenceVi: "Chú mèo đang uống sữa!",
          actionImage: "/assets/items/lifeskills/lifeskills_03.png",
          accentColor: "#10b981",
        },
        {
          id: "p21-they",
          pronounEn: "They",
          pronounVi: "Các bạn (They)",
          subjectImage: "/assets/english/items/act_16_friends_play.png",
          subjectLabelVi: "👫 Các bạn (They)",
          actionEn: "They read books",
          actionVi: "Các bạn đọc sách",
          fullSentenceEn: "They read books!",
          fullSentenceVi: "Các bạn đang cùng đọc sách!",
          actionImage: "/assets/english/items/toy_03_book.png",
          accentColor: "#f59e0b",
        },
      ],
    },
    {
      id: "pm-l2-2",
      level: 2,
      titleEn: "Match Pronoun with Daily Actions!",
      titleVi: "Nối từng nhân vật với hoạt động hàng ngày tương ứng nhé!",
      pairs: [
        {
          id: "p22-he",
          pronounEn: "He",
          pronounVi: "Bạn nam (He)",
          subjectImage: "/assets/english/items/act_13_ride_bike.png",
          subjectLabelVi: "👦 Bạn nam (He)",
          actionEn: "He rides a bike",
          actionVi: "Bạn nam đạp xe",
          fullSentenceEn: "He rides a bike!",
          fullSentenceVi: "Bạn nam đang đạp xe đạp!",
          actionImage: "/assets/items/vehicles/vehicle_03.png",
          accentColor: "#3b82f6",
        },
        {
          id: "p22-she",
          pronounEn: "She",
          pronounVi: "Bạn nữ (She)",
          subjectImage: "/assets/english/items/act_12_wash_hands.png",
          subjectLabelVi: "👧 Bạn nữ (She)",
          actionEn: "She washes hands",
          actionVi: "Bạn nữ rửa tay",
          fullSentenceEn: "She washes her hands!",
          fullSentenceVi: "Bạn nữ đang rửa tay sạch sẽ!",
          actionImage: "/assets/english/items/act_12_wash_hands.png",
          accentColor: "#ec4899",
        },
        {
          id: "p22-it",
          pronounEn: "It",
          pronounVi: "Thỏ trắng (It)",
          subjectImage: "/assets/english/items/animal_07_rabbit.png",
          subjectLabelVi: "🐰 Thỏ trắng (It)",
          actionEn: "It eats a banana",
          actionVi: "Thỏ ăn quả chuối",
          fullSentenceEn: "It eats a banana!",
          fullSentenceVi: "Bạn thỏ đang ăn chuối!",
          actionImage: "/assets/items/fruits/fruit_03.png",
          accentColor: "#10b981",
        },
        {
          id: "p22-they",
          pronounEn: "They",
          pronounVi: "Các bạn (They)",
          subjectImage: "/assets/nam-stickers/nam-stage-star.png",
          subjectLabelVi: "👫 Các bạn (They)",
          actionEn: "They sing a song",
          actionVi: "Các bạn hát vang",
          fullSentenceEn: "They sing a song!",
          fullSentenceVi: "Các bạn đang cùng hát vang!",
          actionImage: "/assets/nam-stickers/nam-stage-star.png",
          accentColor: "#f59e0b",
        },
      ],
    },
  ],

  // CẤP 3: MẪU CÂU ĐẦY ĐỦ ĐA TÍNH CHẤT (NGÔI + ĐỘNG TỪ + MÀU SẮC/HÌNH DẠNG + ĐỒ VẬT)
  3: [
    {
      id: "pm-l3-1",
      level: 3,
      titleEn: "Match Full Sentences with Color & Shape!",
      titleVi: "Nối Ngôi với Mẫu câu hoàn chỉnh có cả Hành động + Màu sắc + Đồ vật nhé!",
      pairs: [
        {
          id: "p31-he",
          pronounEn: "He",
          pronounVi: "Bạn nam (He)",
          subjectImage: "/assets/nam-stickers/nam-study-school.png",
          subjectLabelVi: "👦 Bạn nam (He)",
          actionEn: "He has a fast blue car",
          actionVi: "Anh ấy có xe ô tô xanh chạy nhanh",
          fullSentenceEn: "He has a fast blue car!",
          fullSentenceVi: "Bạn nam có chiếc ô tô màu xanh dương!",
          actionImage: "/assets/english/items/color_13_car_blue.png",
          accentColor: "#3b82f6",
        },
        {
          id: "p31-she",
          pronounEn: "She",
          pronounVi: "Bạn nữ (She)",
          subjectImage: "/assets/english/items/act_07_dance.png",
          subjectLabelVi: "👧 Bạn nữ (She)",
          actionEn: "She wears a cute pink dress",
          actionVi: "Cô ấy mặc chiếc váy hồng xinh",
          fullSentenceEn: "She wears a cute pink dress!",
          fullSentenceVi: "Bạn nữ mặc chiếc váy màu hồng xinh xắn!",
          actionImage: "/assets/english/items/shop_13_dress_pink.png",
          accentColor: "#ec4899",
        },
        {
          id: "p31-it",
          pronounEn: "It",
          pronounVi: "Cún con (It)",
          subjectImage: "/assets/english/items/animal_06_dog.png",
          subjectLabelVi: "🐶 Cún con (It)",
          actionEn: "It plays with a red ball",
          actionVi: "Nó chơi với quả bóng tròn màu đỏ",
          fullSentenceEn: "It plays with a round red ball!",
          fullSentenceVi: "Cún con chơi với quả bóng tròn màu đỏ!",
          actionImage: "/assets/english/items/color_15_ball_red.png",
          accentColor: "#10b981",
        },
        {
          id: "p31-they",
          pronounEn: "They",
          pronounVi: "Các bạn (They)",
          subjectImage: "/assets/english/items/act_16_friends_play.png",
          subjectLabelVi: "👫 Các bạn (They)",
          actionEn: "They eat sweet pink cakes",
          actionVi: "Các bạn ăn bánh kem hồng ngọt ngào",
          fullSentenceEn: "They eat sweet pink cakes!",
          fullSentenceVi: "Các bạn cùng ăn bánh kem màu hồng ngọt ngào!",
          actionImage: "/assets/items/sweets/sweet_07.png",
          accentColor: "#f59e0b",
        },
      ],
    },
  ],
};

// ============================================================================
// BÀI 4: CHIẾC TÚI BÍ MẬT — MỞ KHÓA 3 BƯỚC LIÊN TIẾP:
// BƯỚC 1 (HÉ 1 GÓC TÚI): HỎI MÀU SẮC ("What color is it?")
// BƯỚC 2 (MỞ NỬA TÚI): HỎI HÌNH DẠNG & TÍNH CHẤT ("What shape / How is it?")
// BƯỚC 3 (MỞ HẾT TÚI): HỎI ĐÂY LÀ CÁI GÌ ("What is it?")
// ============================================================================

export interface MysteryBagOption {
  id: string;
  en: string;
  vi: string;
  image?: string;
  colorHex?: string;
  emoji?: string;
}

export interface MysteryBagStep {
  stepNumber: 1 | 2 | 3;
  stepBadgeVi: string;
  questionEn: string;
  questionVi: string;
  speakingEn: string;
  speakingVi: string;
  correctOptionId: string;
  hintVi: string;
  options: MysteryBagOption[];
}

export interface MysteryBagProgressiveRound {
  id: string;
  level: EnglishDifficultyLevel;
  targetNameEn: string;
  targetNameVi: string;
  targetImage: string;
  shapeImage: string;
  colorHex: string;
  steps: [MysteryBagStep, MysteryBagStep, MysteryBagStep];
}

export const MYSTERY_BAG_PROGRESSIVE_ROUNDS: Record<
  EnglishDifficultyLevel,
  MysteryBagProgressiveRound[]
> = {
  // CẤP 1: ĐỒ VẬT & TRÁI CÂY 3D QUEN THUỘC — MÀU SẮC -> TÍNH NĂNG/VỊ/TÁC DỤNG -> TỪ ĐƠN
  1: [
    {
      id: "mb-l1-apple",
      level: 1,
      targetNameEn: "Apple",
      targetNameVi: "Quả táo đỏ giòn ngọt",
      targetImage: "/assets/items/fruits/fruit_02.png",
      shapeImage: "/assets/items/fruits/fruit_02.png",
      colorHex: "#ef4444",
      steps: [
        {
          stepNumber: 1,
          stepBadgeVi: "Bước 1/3: Hé góc túi đoán Màu sắc",
          questionEn: "Peek inside! What color is it?",
          questionVi: "Túi hé 1 góc rồi! Đố Nấm biết quả trong túi có MÀU GÌ?",
          speakingEn: "Red!",
          speakingVi: "Màu đỏ!",
          correctOptionId: "c-red",
          hintVi: "Nhìn góc túi kìa, đó là màu Đỏ tươi (Red) đấy!",
          options: [
            { id: "c-red", en: "Red", vi: "Màu đỏ", colorHex: "#ef4444", emoji: "❤️" },
            { id: "c-blue", en: "Blue", vi: "Xanh dương", colorHex: "#3b82f6", emoji: "💙" },
            { id: "c-purple", en: "Purple", vi: "Màu tím", colorHex: "#a855f7", emoji: "💜" },
          ],
        },
        {
          stepNumber: 2,
          stepBadgeVi: "Bước 2/3: Đoán Đặc trưng & Hương vị",
          questionEn: "It is round! How does it taste when we bite it?",
          questionVi: "Nó tròn xoe! Khi cắn một miếng thì có vị và cảm giác thế nào nhỉ?",
          speakingEn: "Sweet and crunchy!",
          speakingVi: "Ngọt và giòn tan!",
          correctOptionId: "f-sweet-crunchy",
          hintVi: "Quả táo khi cắn kêu rộp rộp rất Giòn và Ngọt (Sweet & Crunchy)!",
          options: [
            {
              id: "f-sweet-crunchy",
              en: "Sweet & Crunchy",
              vi: "Ngọt lịm & Giòn tan",
              emoji: "😋🍎",
            },
            {
              id: "f-hot-salty",
              en: "Hot & Salty",
              vi: "Nóng hổi & Mặn",
              emoji: "🍲🔥",
            },
            {
              id: "f-loud-bell",
              en: "Rings a loud bell",
              vi: "Kêu reng reng báo thức",
              emoji: "⏰🔔",
            },
          ],
        },
        {
          stepNumber: 3,
          stepBadgeVi: "Bước 3/3: Mở tung túi — Đây là quả gì?",
          questionEn: "Open the bag! Red, round and crunchy — What is it?",
          questionVi: "Mở hết túi rồi! Màu đỏ, tròn và giòn ngọt — Đây là quả gì?",
          speakingEn: "Apple!",
          speakingVi: "Quả táo!",
          correctOptionId: "t-apple",
          hintVi: "Chọn Apple (Quả táo đỏ) nhé!",
          options: [
            {
              id: "t-apple",
              en: "Apple",
              vi: "Quả táo",
              image: "/assets/items/fruits/fruit_02.png",
            },
            {
              id: "t-banana",
              en: "Banana",
              vi: "Quả chuối",
              image: "/assets/items/fruits/fruit_03.png",
            },
            {
              id: "t-grapes",
              en: "Grapes",
              vi: "Chùm nho",
              image: "/assets/items/fruits/fruit_06.png",
            },
          ],
        },
      ],
    },
    {
      id: "mb-l1-banana",
      level: 1,
      targetNameEn: "Banana",
      targetNameVi: "Quả chuối chín vàng",
      targetImage: "/assets/items/fruits/fruit_03.png",
      shapeImage: "/assets/items/fruits/fruit_03.png",
      colorHex: "#facc15",
      steps: [
        {
          stepNumber: 1,
          stepBadgeVi: "Bước 1/3: Hé góc túi đoán Màu sắc",
          questionEn: "Look at the corner! What color is it?",
          questionVi: "Nhìn góc túi hé mở kìa! Đây là MÀU GÌ nhỉ?",
          speakingEn: "Yellow!",
          speakingVi: "Màu vàng!",
          correctOptionId: "c-yellow",
          hintVi: "Đó là màu Vàng tươi (Yellow) đấy!",
          options: [
            { id: "c-yellow", en: "Yellow", vi: "Màu vàng", colorHex: "#facc15", emoji: "💛" },
            { id: "c-blue", en: "Blue", vi: "Xanh dương", colorHex: "#3b82f6", emoji: "💙" },
            { id: "c-pink", en: "Pink", vi: "Màu hồng", colorHex: "#f472b6", emoji: "🩷" },
          ],
        },
        {
          stepNumber: 2,
          stepBadgeVi: "Bước 2/3: Đoán Đặc điểm & Cách ăn",
          questionEn: "Monkeys love it! What do we do before eating it?",
          questionVi: "Các bạn khỉ rất thích quả dài cong này! Trước khi ăn mình làm gì nhỉ?",
          speakingEn: "Peel the soft skin!",
          speakingVi: "Bóc lớp vỏ mềm!",
          correctOptionId: "f-peel",
          hintVi: "Trước khi ăn chuối, mình bóc vỏ mềm (Peel the skin) nhé!",
          options: [
            {
              id: "f-peel",
              en: "Peel the skin",
              vi: "Bóc vỏ mềm thơm ngọt",
              emoji: "🐒🍌",
            },
            {
              id: "f-cut-paper",
              en: "Cut paper",
              vi: "Dùng để cắt giấy",
              emoji: "✂️📄",
            },
            {
              id: "f-drive-road",
              en: "Drive on the road",
              vi: "Chạy bon bon trên đường",
              emoji: "🚗🛣️",
            },
          ],
        },
        {
          stepNumber: 3,
          stepBadgeVi: "Bước 3/3: Mở tung túi — Đây là quả gì?",
          questionEn: "Ta-da! What fruit is inside the bag?",
          questionVi: "Mở tung túi rồi! Đây là quả gì nhỉ?",
          speakingEn: "Banana!",
          speakingVi: "Quả chuối!",
          correctOptionId: "t-banana",
          hintVi: "Chọn Banana (Quả chuối vàng) nhé!",
          options: [
            {
              id: "t-banana",
              en: "Banana",
              vi: "Quả chuối",
              image: "/assets/items/fruits/fruit_03.png",
            },
            {
              id: "t-strawberry",
              en: "Strawberry",
              vi: "Quả dâu tây",
              image: "/assets/items/fruits/fruit_01.png",
            },
            {
              id: "t-pear",
              en: "Pear",
              vi: "Quả lê xanh",
              image: "/assets/items/fruits/fruit_07.png",
            },
          ],
        },
      ],
    },
    {
      id: "mb-l1-car",
      level: 1,
      targetNameEn: "Car",
      targetNameVi: "Chiếc ô tô đỏ",
      targetImage: "/assets/items/vehicles/vehicle_01.png",
      shapeImage: "/assets/items/vehicles/vehicle_01.png",
      colorHex: "#ef4444",
      steps: [
        {
          stepNumber: 1,
          stepBadgeVi: "Bước 1/3: Hé góc túi đoán Màu sắc",
          questionEn: "What bright color do you see?",
          questionVi: "Nấm nhìn thấy MÀU GÌ ở góc túi nhỉ?",
          speakingEn: "Red!",
          speakingVi: "Màu đỏ!",
          correctOptionId: "c-red",
          hintVi: "Màu Đỏ tươi (Red) đấy!",
          options: [
            { id: "c-red", en: "Red", vi: "Màu đỏ", colorHex: "#ef4444", emoji: "❤️" },
            { id: "c-green", en: "Green", vi: "Xanh lá", colorHex: "#22c55e", emoji: "💚" },
            { id: "c-purple", en: "Purple", vi: "Màu tím", colorHex: "#a855f7", emoji: "💜" },
          ],
        },
        {
          stepNumber: 2,
          stepBadgeVi: "Bước 2/3: Đoán Tính năng & Âm thanh",
          questionEn: "It has 4 wheels and goes Beep-Beep! What does it do?",
          questionVi: "Vật này có 4 bánh xe và kêu Bíp-Bíp! Nó dùng để làm gì nhỉ?",
          speakingEn: "Drive on the road!",
          speakingVi: "Chạy trên đường phố!",
          correctOptionId: "f-drive",
          hintVi: "Có 4 bánh xe kêu Bíp-Bíp dùng để chạy trên đường (Drive on the road)!",
          options: [
            {
              id: "f-drive",
              en: "Drive on the road",
              vi: "Có 4 bánh xe chạy trên đường",
              emoji: "🛞🛣️",
            },
            {
              id: "f-write",
              en: "Write in a notebook",
              vi: "Dùng để viết chữ vào vở",
              emoji: "✏️📓",
            },
            {
              id: "f-drink-milk",
              en: "Drink fresh milk",
              vi: "Dùng để uống sữa tươi",
              emoji: "🥛😋",
            },
          ],
        },
        {
          stepNumber: 3,
          stepBadgeVi: "Bước 3/3: Mở tung túi — Đây là gì?",
          questionEn: "Open the bag! What vehicle is it?",
          questionVi: "Mở hết túi rồi! Đây là phương tiện gì nhỉ?",
          speakingEn: "Car!",
          speakingVi: "Chiếc ô tô!",
          correctOptionId: "t-car",
          hintVi: "Chọn Car (Chiếc ô tô) nhé!",
          options: [
            {
              id: "t-car",
              en: "Car",
              vi: "Ô tô",
              image: "/assets/items/vehicles/vehicle_01.png",
            },
            {
              id: "t-sailboat",
              en: "Sailboat",
              vi: "Thuyền buồm",
              image: "/assets/items/vehicles/vehicle_08.png",
            },
            {
              id: "t-book",
              en: "Book",
              vi: "Quyển sách",
              image: "/assets/items/school/school_03.png",
            },
          ],
        },
      ],
    },
    {
      id: "mb-l1-icecream",
      level: 1,
      targetNameEn: "Ice cream",
      targetNameVi: "Cây kem ốc quế mát lạnh",
      targetImage: "/assets/items/sweets/sweet_09.png",
      shapeImage: "/assets/items/sweets/sweet_09.png",
      colorHex: "#f472b6",
      steps: [
        {
          stepNumber: 1,
          stepBadgeVi: "Bước 1/3: Hé góc túi đoán Màu sắc",
          questionEn: "What sweet color is on top?",
          questionVi: "Phần kem phía trên có MÀU GÌ nhỉ?",
          speakingEn: "Pink!",
          speakingVi: "Màu hồng!",
          correctOptionId: "c-pink",
          hintVi: "Đó là màu Hồng phấn (Pink) ngọt ngào!",
          options: [
            { id: "c-pink", en: "Pink", vi: "Màu hồng", colorHex: "#f472b6", emoji: "🩷" },
            { id: "c-blue", en: "Blue", vi: "Xanh dương", colorHex: "#3b82f6", emoji: "💙" },
            { id: "c-green", en: "Green", vi: "Xanh lá", colorHex: "#22c55e", emoji: "💚" },
          ],
        },
        {
          stepNumber: 2,
          stepBadgeVi: "Bước 2/3: Đoán Nhiệt độ & Hương vị",
          questionEn: "We love eating it on sunny summer days! How is it?",
          questionVi: "Mùa hè nắng ấm ăn món này thích mê! Nó có đặc trưng gì nhỉ?",
          speakingEn: "Cold and sweet!",
          speakingVi: "Mát lạnh và ngọt ngào!",
          correctOptionId: "f-cold-sweet",
          hintVi: "Kem ăn vào mùa hè rất Mát lạnh và Ngọt (Cold & Sweet)!",
          options: [
            {
              id: "f-cold-sweet",
              en: "Cold & Sweet",
              vi: "Mát lạnh & Ngọt ngào",
              emoji: "❄️😋",
            },
            {
              id: "f-boil-hot",
              en: "Boiling hot",
              vi: "Đun sôi nóng bỏng",
              emoji: "🔥🍲",
            },
            {
              id: "f-sweep-floor",
              en: "Sweep the floor",
              vi: "Dùng để quét nhà",
              emoji: "🧹✨",
            },
          ],
        },
        {
          stepNumber: 3,
          stepBadgeVi: "Bước 3/3: Mở tung túi — Đây là món gì?",
          questionEn: "Open the bag! Pink, cold and sweet — What is it?",
          questionVi: "Mở hết túi rồi! Màu hồng, mát lạnh và ngọt — Đây là món gì?",
          speakingEn: "Ice cream!",
          speakingVi: "Cây kem ốc quế!",
          correctOptionId: "t-icecream",
          hintVi: "Chọn Ice cream (Cây kem ốc quế) nhé!",
          options: [
            {
              id: "t-icecream",
              en: "Ice cream",
              vi: "Cây kem",
              image: "/assets/items/sweets/sweet_09.png",
            },
            {
              id: "t-hotcocoa",
              en: "Hot cocoa",
              vi: "Cốc ca-cao nóng",
              image: "/assets/items/sweets/sweet_14.png",
            },
            {
              id: "t-broom",
              en: "Broom",
              vi: "Cây chổi",
              image: "/assets/items/home/home_14.png",
            },
          ],
        },
      ],
    },
    {
      id: "mb-l1-book",
      level: 1,
      targetNameEn: "Book",
      targetNameVi: "Quyển sách mở xanh",
      targetImage: "/assets/items/school/school_03.png",
      shapeImage: "/assets/items/school/school_03.png",
      colorHex: "#3b82f6",
      steps: [
        {
          stepNumber: 1,
          stepBadgeVi: "Bước 1/3: Hé góc túi đoán Màu sắc",
          questionEn: "What color is the cover?",
          questionVi: "Bìa của vật trong túi có MÀU GÌ nhỉ?",
          speakingEn: "Blue!",
          speakingVi: "Màu xanh dương!",
          correctOptionId: "c-blue",
          hintVi: "Đó là màu Xanh Dương (Blue) đấy!",
          options: [
            { id: "c-blue", en: "Blue", vi: "Xanh dương", colorHex: "#3b82f6", emoji: "💙" },
            { id: "c-red", en: "Red", vi: "Màu đỏ", colorHex: "#ef4444", emoji: "❤️" },
            { id: "c-yellow", en: "Yellow", vi: "Màu vàng", colorHex: "#facc15", emoji: "💛" },
          ],
        },
        {
          stepNumber: 2,
          stepBadgeVi: "Bước 2/3: Đoán Tác dụng & Công năng",
          questionEn: "It has many pages with pictures and stories! What is it for?",
          questionVi: "Vật này có nhiều trang giấy in tranh và truyện hay! Nó dùng để làm gì?",
          speakingEn: "Read stories!",
          speakingVi: "Đọc truyện và học bài!",
          correctOptionId: "f-read",
          hintVi: "Có nhiều trang giấy để mở ra đọc truyện và học điều hay (Read stories)!",
          options: [
            {
              id: "f-read",
              en: "Read stories & learn",
              vi: "Mở trang giấy đọc truyện",
              emoji: "📖✨",
            },
            {
              id: "f-fry-egg",
              en: "Fry an egg",
              vi: "Bắc lên bếp rán trứng",
              emoji: "🍳🔥",
            },
            {
              id: "f-ride-park",
              en: "Ride in the park",
              vi: "Đạp xe quanh công viên",
              emoji: "🚲🌳",
            },
          ],
        },
        {
          stepNumber: 3,
          stepBadgeVi: "Bước 3/3: Mở tung túi — Đây là gì?",
          questionEn: "Open the bag! What school item is it?",
          questionVi: "Mở hết túi rồi! Đây là đồ dùng học tập gì nhỉ?",
          speakingEn: "Book!",
          speakingVi: "Quyển sách!",
          correctOptionId: "t-book",
          hintVi: "Chọn Book (Quyển sách) nhé!",
          options: [
            {
              id: "t-book",
              en: "Book",
              vi: "Quyển sách",
              image: "/assets/items/school/school_03.png",
            },
            {
              id: "t-pillow",
              en: "Pillow",
              vi: "Chiếc gối",
              image: "/assets/items/home/home_07.png",
            },
            {
              id: "t-cupcake",
              en: "Cupcake",
              vi: "Bánh cupcake",
              image: "/assets/items/sweets/sweet_01.png",
            },
          ],
        },
      ],
    },
    {
      id: "mb-l1-clock",
      level: 1,
      targetNameEn: "Clock",
      targetNameVi: "Đồng hồ báo thức",
      targetImage: "/assets/items/home/home_05.png",
      shapeImage: "/assets/items/home/home_05.png",
      colorHex: "#f472b6",
      steps: [
        {
          stepNumber: 1,
          stepBadgeVi: "Bước 1/3: Hé góc túi đoán Màu sắc",
          questionEn: "Peek inside! What color is it?",
          questionVi: "Nhìn qua khe túi kìa! Vật này có MÀU GÌ?",
          speakingEn: "Pink!",
          speakingVi: "Màu hồng!",
          correctOptionId: "c-pink",
          hintVi: "Đó là màu Hồng đỏ (Pink) đấy!",
          options: [
            { id: "c-pink", en: "Pink", vi: "Màu hồng", colorHex: "#f472b6", emoji: "🩷" },
            { id: "c-green", en: "Green", vi: "Xanh lá", colorHex: "#22c55e", emoji: "💚" },
            { id: "c-blue", en: "Blue", vi: "Xanh dương", colorHex: "#3b82f6", emoji: "💙" },
          ],
        },
        {
          stepNumber: 2,
          stepBadgeVi: "Bước 2/3: Đoán Tính năng & Âm thanh",
          questionEn: "It has numbers and goes Ring-Ring in the morning! What does it do?",
          questionVi: "Nó có các con số chỉ giờ và kêu Reng-Reng mỗi sáng! Nó giúp gì cho Nấm?",
          speakingEn: "Tell time and wake us up!",
          speakingVi: "Chỉ giờ và gọi bé thức dậy!",
          correctOptionId: "f-wake",
          hintVi: "Nó kêu Reng-Reng để báo thức và xem giờ (Tell time & Wake us up)!",
          options: [
            {
              id: "f-wake",
              en: "Tell time & Wake us up",
              vi: "Xem giờ & Báo thức buổi sáng",
              emoji: "⏰🔔",
            },
            {
              id: "f-water",
              en: "Water the flowers",
              vi: "Dùng để tưới nước cho hoa",
              emoji: "🚿🌱",
            },
            {
              id: "f-eat-soup",
              en: "Scoop warm soup",
              vi: "Dùng để múc canh nóng",
              emoji: "🥣🍲",
            },
          ],
        },
        {
          stepNumber: 3,
          stepBadgeVi: "Bước 3/3: Mở tung túi — Đây là gì?",
          questionEn: "Open the bag! What is it?",
          questionVi: "Mở hết túi rồi! Đây là cái gì nhỉ?",
          speakingEn: "Clock!",
          speakingVi: "Đồng hồ báo thức!",
          correctOptionId: "t-clock",
          hintVi: "Chọn Clock (Đồng hồ báo thức) nhé!",
          options: [
            {
              id: "t-clock",
              en: "Clock",
              vi: "Đồng hồ",
              image: "/assets/items/home/home_05.png",
            },
            {
              id: "t-lamp",
              en: "Lamp",
              vi: "Đèn bàn",
              image: "/assets/items/home/home_01.png",
            },
            {
              id: "t-sofa",
              en: "Sofa",
              vi: "Ghế đệm",
              image: "/assets/items/home/home_06.png",
            },
          ],
        },
      ],
    },
  ],

  // CẤP 2: CỤM TÍNH TỪ + DANH TỪ — MÀU SẮC -> CÔNG DỤNG / TÍNH NĂNG / ĐẶC TRƯNG -> CỤM TỪ
  2: [
    {
      id: "mb-l2-backpack",
      level: 2,
      targetNameEn: "Pink backpack",
      targetNameVi: "Chiếc cặp sách màu hồng",
      targetImage: "/assets/items/school/school_01.png",
      shapeImage: "/assets/items/school/school_01.png",
      colorHex: "#f472b6",
      steps: [
        {
          stepNumber: 1,
          stepBadgeVi: "Bước 1/3: Hé góc túi đoán Màu sắc",
          questionEn: "What color is this school item?",
          questionVi: "Đồ dùng đi học trong túi có MÀU GÌ nhỉ?",
          speakingEn: "Pink!",
          speakingVi: "Màu hồng!",
          correctOptionId: "c-pink",
          hintVi: "Đó là màu Hồng (Pink) trang trí hoa cúc đấy!",
          options: [
            { id: "c-pink", en: "Pink", vi: "Màu hồng", colorHex: "#f472b6", emoji: "🩷" },
            { id: "c-yellow", en: "Yellow", vi: "Màu vàng", colorHex: "#facc15", emoji: "💛" },
            { id: "c-green", en: "Green", vi: "Xanh lá", colorHex: "#22c55e", emoji: "💚" },
          ],
        },
        {
          stepNumber: 2,
          stepBadgeVi: "Bước 2/3: Đoán Công dụng khi đi học",
          questionEn: "It has two straps and a zipper! How do we use it?",
          questionVi: "Nó có 2 quai đeo và khóa kéo! Mỗi ngày đi học Nấm dùng nó để làm gì?",
          speakingEn: "Carry books to school!",
          speakingVi: "Đeo trên lưng đựng sách vở đến trường!",
          correctOptionId: "f-carry-books",
          hintVi: "Chúng mình đeo trên lưng để đựng sách vở và hộp bút đến trường (Carry books to school)!",
          options: [
            {
              id: "f-carry-books",
              en: "Carry books on our back",
              vi: "Đeo trên lưng đựng sách vở đi học",
              emoji: "🎒📚",
            },
            {
              id: "f-slice-fruit",
              en: "Slice fresh fruit",
              vi: "Dùng để gọt và cắt hoa quả",
              emoji: "🔪🍎",
            },
            {
              id: "f-sail-sea",
              en: "Sail on the sea",
              vi: "Căng buồm lướt trên sóng biển",
              emoji: "⛵🌊",
            },
          ],
        },
        {
          stepNumber: 3,
          stepBadgeVi: "Bước 3/3: Mở hết túi — Ghép Tính từ + Danh từ",
          questionEn: "Open the bag! What is inside?",
          questionVi: "Mở hết túi rồi! Đây là cái gì nhỉ?",
          speakingEn: "Pink backpack!",
          speakingVi: "Chiếc cặp sách màu hồng!",
          correctOptionId: "t-pink-backpack",
          hintVi: "Chọn Pink backpack (Cặp sách màu hồng) nhé!",
          options: [
            {
              id: "t-pink-backpack",
              en: "Pink backpack",
              vi: "Cặp sách màu hồng",
              image: "/assets/items/school/school_01.png",
            },
            {
              id: "t-yellow-pencil",
              en: "Yellow pencil",
              vi: "Bút chì màu vàng",
              image: "/assets/items/school/school_04.png",
            },
            {
              id: "t-blue-calculator",
              en: "Blue calculator",
              vi: "Máy tính màu xanh",
              image: "/assets/items/school/school_13.png",
            },
          ],
        },
      ],
    },
    {
      id: "mb-l2-scissors",
      level: 2,
      targetNameEn: "Sharp scissors",
      targetNameVi: "Cây kéo thủ công",
      targetImage: "/assets/items/school/school_09.png",
      shapeImage: "/assets/items/school/school_09.png",
      colorHex: "#f472b6",
      steps: [
        {
          stepNumber: 1,
          stepBadgeVi: "Bước 1/3: Hé góc túi đoán Màu sắc",
          questionEn: "Look at the handle! What color is it?",
          questionVi: "Nhìn tay cầm của vật trong túi kìa! Nó có MÀU GÌ?",
          speakingEn: "Pink!",
          speakingVi: "Màu hồng!",
          correctOptionId: "c-pink",
          hintVi: "Tay cầm có màu Hồng (Pink) đấy!",
          options: [
            { id: "c-pink", en: "Pink", vi: "Màu hồng", colorHex: "#f472b6", emoji: "🩷" },
            { id: "c-blue", en: "Blue", vi: "Xanh dương", colorHex: "#3b82f6", emoji: "💙" },
            { id: "c-orange", en: "Orange", vi: "Màu cam", colorHex: "#fb923c", emoji: "🧡" },
          ],
        },
        {
          stepNumber: 2,
          stepBadgeVi: "Bước 2/3: Đoán Tính năng & Tác dụng",
          questionEn: "It goes Snip-Snip! What do we use it for in art class?",
          questionVi: "Nó kêu Xoẹt-Xoẹt! Trong giờ thủ công chúng mình dùng nó để làm gì?",
          speakingEn: "Cut paper for crafts!",
          speakingVi: "Cắt giấy thủ công!",
          correctOptionId: "f-cut-paper",
          hintVi: "Cây kéo dùng để cắt giấy thủ công (Cut paper for crafts)!",
          options: [
            {
              id: "f-cut-paper",
              en: "Cut paper for crafts",
              vi: "Dùng để cắt giấy làm thủ công",
              emoji: "✂️🎨",
            },
            {
              id: "f-sleep-night",
              en: "Rest our head & sleep",
              vi: "Dùng để gối đầu đi ngủ",
              emoji: "🛌💤",
            },
            {
              id: "f-drink-tea",
              en: "Serve warm tea",
              vi: "Dùng để pha trà mời khách",
              emoji: "🍵✨",
            },
          ],
        },
        {
          stepNumber: 3,
          stepBadgeVi: "Bước 3/3: Mở hết túi — Ghép Tính từ + Danh từ",
          questionEn: "Open the bag! What is it?",
          questionVi: "Mở hết túi rồi! Đây là dụng cụ gì nhỉ?",
          speakingEn: "Sharp scissors!",
          speakingVi: "Cây kéo thủ công sắc bén!",
          correctOptionId: "t-sharp-scissors",
          hintVi: "Chọn Sharp scissors (Cây kéo thủ công) nhé!",
          options: [
            {
              id: "t-sharp-scissors",
              en: "Sharp scissors",
              vi: "Cây kéo thủ công",
              image: "/assets/items/school/school_09.png",
            },
            {
              id: "t-long-ruler",
              en: "Long ruler",
              vi: "Thước kẻ thẳng dài",
              image: "/assets/items/school/school_06.png",
            },
            {
              id: "t-soft-eraser",
              en: "Soft eraser",
              vi: "Cục tẩy mềm",
              image: "/assets/items/school/school_07.png",
            },
          ],
        },
      ],
    },
    {
      id: "mb-l2-watermelon",
      level: 2,
      targetNameEn: "Juicy watermelon",
      targetNameVi: "Miếng dưa hấu mọng nước",
      targetImage: "/assets/items/fruits/fruit_05.png",
      shapeImage: "/assets/items/fruits/fruit_05.png",
      colorHex: "#ef4444",
      steps: [
        {
          stepNumber: 1,
          stepBadgeVi: "Bước 1/3: Hé góc túi đoán Màu sắc",
          questionEn: "It has green skin outside! What bright color is inside?",
          questionVi: "Vỏ ngoài màu xanh lá, còn ruột bên trong có MÀU GÌ nhỉ?",
          speakingEn: "Red!",
          speakingVi: "Màu đỏ!",
          correctOptionId: "c-red",
          hintVi: "Ruột dưa hấu có màu Đỏ tươi (Red)!",
          options: [
            { id: "c-red", en: "Red", vi: "Màu đỏ", colorHex: "#ef4444", emoji: "❤️" },
            { id: "c-blue", en: "Blue", vi: "Xanh dương", colorHex: "#3b82f6", emoji: "💙" },
            { id: "c-purple", en: "Purple", vi: "Màu tím", colorHex: "#a855f7", emoji: "💜" },
          ],
        },
        {
          stepNumber: 2,
          stepBadgeVi: "Bước 2/3: Đoán Đặc trưng & Hương vị",
          questionEn: "What is this yummy summer fruit like?",
          questionVi: "Loại quả giải nhiệt mùa hè này có đặc điểm gì nhỉ?",
          speakingEn: "Juicy, sweet with tiny black seeds!",
          speakingVi: "Mọng nước, ngọt mát và có hạt đen nhỏ!",
          correctOptionId: "f-juicy-seeds",
          hintVi: "Dưa hấu rất Mọng nước, ngọt mát và có hạt đen nhỏ (Juicy & sweet with black seeds)!",
          options: [
            {
              id: "f-juicy-seeds",
              en: "Juicy, sweet & black seeds",
              vi: "Mọng nước, ngọt mát & có hạt đen",
              emoji: "🍉💧",
            },
            {
              id: "f-wooden-hard",
              en: "Hard & made of wood",
              vi: "Cứng cáp và làm bằng gỗ",
              emoji: "🪵🔨",
            },
            {
              id: "f-fly-sky",
              en: "Flies high in the sky",
              vi: "Bay vút cao trên bầu trời",
              emoji: "✈️☁️",
            },
          ],
        },
        {
          stepNumber: 3,
          stepBadgeVi: "Bước 3/3: Mở hết túi — Ghép Tính từ + Danh từ",
          questionEn: "Open the bag! What fruit is it?",
          questionVi: "Mở hết túi rồi! Đây là quả gì nhỉ?",
          speakingEn: "Juicy watermelon!",
          speakingVi: "Miếng dưa hấu mọng nước!",
          correctOptionId: "t-juicy-watermelon",
          hintVi: "Chọn Juicy watermelon (Dưa hấu mọng nước) nhé!",
          options: [
            {
              id: "t-juicy-watermelon",
              en: "Juicy watermelon",
              vi: "Dưa hấu mọng nước",
              image: "/assets/items/fruits/fruit_05.png",
            },
            {
              id: "t-sour-lemon",
              en: "Sour lemon",
              vi: "Quả chanh chua",
              image: "/assets/items/fruits/fruit_09.png",
            },
            {
              id: "t-sweet-grapes",
              en: "Sweet grapes",
              vi: "Chùm nho ngọt",
              image: "/assets/items/fruits/fruit_06.png",
            },
          ],
        },
      ],
    },
    {
      id: "mb-l2-lamp",
      level: 2,
      targetNameEn: "Bright lamp",
      targetNameVi: "Chiếc đèn bàn sáng rõ",
      targetImage: "/assets/items/home/home_01.png",
      shapeImage: "/assets/items/home/home_01.png",
      colorHex: "#facc15",
      steps: [
        {
          stepNumber: 1,
          stepBadgeVi: "Bước 1/3: Hé góc túi đoán Màu sắc",
          questionEn: "What warm color is shining inside?",
          questionVi: "Ánh sáng ấm áp lấp ló trong túi có MÀU GÌ nhỉ?",
          speakingEn: "Yellow!",
          speakingVi: "Màu vàng!",
          correctOptionId: "c-yellow",
          hintVi: "Ánh đèn có màu Vàng ấm (Yellow)!",
          options: [
            { id: "c-yellow", en: "Yellow", vi: "Màu vàng ấm", colorHex: "#facc15", emoji: "💛" },
            { id: "c-purple", en: "Purple", vi: "Màu tím", colorHex: "#a855f7", emoji: "💜" },
            { id: "c-green", en: "Green", vi: "Xanh lá", colorHex: "#22c55e", emoji: "💚" },
          ],
        },
        {
          stepNumber: 2,
          stepBadgeVi: "Bước 2/3: Đoán Tác dụng trên bàn học",
          questionEn: "It stands on the desk! How does it help us at night?",
          questionVi: "Nó đặt trên bàn học! Khi trời tối nó giúp ích gì cho Nấm?",
          speakingEn: "Shines bright light to read and study!",
          speakingVi: "Tỏa ánh sáng rõ ràng để học bài và đọc sách!",
          correctOptionId: "f-shine-light",
          hintVi: "Đèn bàn giúp tỏa ánh sáng rõ ràng để Nấm đọc sách học bài (Shines bright light)!",
          options: [
            {
              id: "f-shine-light",
              en: "Shine bright light to study",
              vi: "Chiếu sáng rõ để đọc sách học bài",
              emoji: "💡📖",
            },
            {
              id: "f-wash-clothes",
              en: "Wash dirty clothes",
              vi: "Giặt quần áo sạch thơm",
              emoji: "🫧👕",
            },
            {
              id: "f-freeze-ice",
              en: "Keep ice cream frozen",
              vi: "Giữ kem đông đá mát lạnh",
              emoji: "🧊🍦",
            },
          ],
        },
        {
          stepNumber: 3,
          stepBadgeVi: "Bước 3/3: Mở hết túi — Ghép Tính từ + Danh từ",
          questionEn: "Open the bag! What home item is it?",
          questionVi: "Mở hết túi rồi! Đây là đồ vật gì trong nhà nhỉ?",
          speakingEn: "Bright lamp!",
          speakingVi: "Chiếc đèn bàn sáng rõ!",
          correctOptionId: "t-bright-lamp",
          hintVi: "Chọn Bright lamp (Đèn bàn sáng rõ) nhé!",
          options: [
            {
              id: "t-bright-lamp",
              en: "Bright lamp",
              vi: "Đèn bàn sáng rõ",
              image: "/assets/items/home/home_01.png",
            },
            {
              id: "t-cold-fridge",
              en: "Cold fridge",
              vi: "Tủ lạnh mát",
              image: "/assets/items/home/home_12.png",
            },
            {
              id: "t-soft-sofa",
              en: "Soft sofa",
              vi: "Ghế đệm êm ái",
              image: "/assets/items/home/home_06.png",
            },
          ],
        },
      ],
    },
    {
      id: "mb-l2-broom",
      level: 2,
      targetNameEn: "Clean broom",
      targetNameVi: "Cây chổi quét nhà sạch bong",
      targetImage: "/assets/items/home/home_14.png",
      shapeImage: "/assets/items/home/home_14.png",
      colorHex: "#facc15",
      steps: [
        {
          stepNumber: 1,
          stepBadgeVi: "Bước 1/3: Hé góc túi đoán Màu sắc",
          questionEn: "Look at the brush part! What color is it?",
          questionVi: "Nhìn phần bông chổi kìa! Nó có MÀU GÌ nhỉ?",
          speakingEn: "Yellow!",
          speakingVi: "Màu vàng!",
          correctOptionId: "c-yellow",
          hintVi: "Bông chổi có màu Vàng (Yellow)!",
          options: [
            { id: "c-yellow", en: "Yellow", vi: "Màu vàng", colorHex: "#facc15", emoji: "💛" },
            { id: "c-blue", en: "Blue", vi: "Xanh dương", colorHex: "#3b82f6", emoji: "💙" },
            { id: "c-pink", en: "Pink", vi: "Màu hồng", colorHex: "#f472b6", emoji: "🩷" },
          ],
        },
        {
          stepNumber: 2,
          stepBadgeVi: "Bước 2/3: Đoán Công dụng giúp mẹ",
          questionEn: "It has a long handle! How do we use it to help Mom?",
          questionVi: "Nó có cán dài! Nấm dùng vật này phụ mẹ làm việc nhà gì nhỉ?",
          speakingEn: "Sweep the floor clean!",
          speakingVi: "Quét sàn nhà sạch bong!",
          correctOptionId: "f-sweep",
          hintVi: "Cây chổi dùng để quét sàn nhà sạch bong (Sweep the floor clean)!",
          options: [
            {
              id: "f-sweep",
              en: "Sweep the floor clean",
              vi: "Quét bụi cho sàn nhà sạch bong",
              emoji: "🧹✨",
            },
            {
              id: "f-bake-cake",
              en: "Bake a birthday cake",
              vi: "Nướng bánh kem sinh nhật",
              emoji: "🎂🔥",
            },
            {
              id: "f-launch-space",
              en: "Fly into outer space",
              vi: "Phóng vút lên vũ trụ",
              emoji: "🚀🌟",
            },
          ],
        },
        {
          stepNumber: 3,
          stepBadgeVi: "Bước 3/3: Mở hết túi — Ghép Tính từ + Danh từ",
          questionEn: "Open the bag! What is inside?",
          questionVi: "Mở hết túi rồi! Đây là vật gì nhỉ?",
          speakingEn: "Clean broom!",
          speakingVi: "Cây chổi quét nhà!",
          correctOptionId: "t-clean-broom",
          hintVi: "Chọn Clean broom (Cây chổi quét nhà) nhé!",
          options: [
            {
              id: "t-clean-broom",
              en: "Clean broom",
              vi: "Cây chổi quét nhà",
              image: "/assets/items/home/home_14.png",
            },
            {
              id: "t-mint-towel",
              en: "Soft towel",
              vi: "Khăn tắm mềm",
              image: "/assets/items/home/home_10.png",
            },
            {
              id: "t-pink-teacup",
              en: "Warm teacup",
              vi: "Tách trà ấm",
              image: "/assets/items/home/home_02.png",
            },
          ],
        },
      ],
    },
    {
      id: "mb-l2-bicycle",
      level: 2,
      targetNameEn: "Blue bicycle",
      targetNameVi: "Chiếc xe đạp màu xanh dương",
      targetImage: "/assets/items/vehicles/vehicle_03.png",
      shapeImage: "/assets/items/vehicles/vehicle_03.png",
      colorHex: "#3b82f6",
      steps: [
        {
          stepNumber: 1,
          stepBadgeVi: "Bước 1/3: Hé góc túi đoán Màu sắc",
          questionEn: "What color is the frame of this vehicle?",
          questionVi: "Khung của chiếc xe trong túi có MÀU GÌ nhỉ?",
          speakingEn: "Blue!",
          speakingVi: "Màu xanh dương!",
          correctOptionId: "c-blue",
          hintVi: "Chiếc xe có màu Xanh Dương (Blue)!",
          options: [
            { id: "c-blue", en: "Blue", vi: "Xanh dương", colorHex: "#3b82f6", emoji: "💙" },
            { id: "c-red", en: "Red", vi: "Màu đỏ", colorHex: "#ef4444", emoji: "❤️" },
            { id: "c-yellow", en: "Yellow", vi: "Màu vàng", colorHex: "#facc15", emoji: "💛" },
          ],
        },
        {
          stepNumber: 2,
          stepBadgeVi: "Bước 2/3: Đoán Đặc trưng & Vận động",
          questionEn: "It has 2 wheels, pedals, and a bell! How do we ride it?",
          questionVi: "Nó có 2 bánh xe, bàn đạp và chuông kính coong! Mình dùng nó thế nào?",
          speakingEn: "Pedal and ride in the park!",
          speakingVi: "Đạp bàn đạp đi dạo quanh công viên!",
          correctOptionId: "f-pedal",
          hintVi: "Xe đạp có 2 bánh, mình đạp bàn đạp đi dạo công viên (Pedal & ride in the park)!",
          options: [
            {
              id: "f-pedal",
              en: "Pedal & ride in the park",
              vi: "Đạp xe tập thể dục quanh công viên",
              emoji: "🚲🌳",
            },
            {
              id: "f-dive-ocean",
              en: "Dive deep under the sea",
              vi: "Lặn sâu dưới đáy đại dương",
              emoji: "🌊🐠",
            },
            {
              id: "f-boil-soup",
              en: "Boil hot soup in a pot",
              vi: "Đun sôi nồi canh trên bếp",
              emoji: "🍲🔥",
            },
          ],
        },
        {
          stepNumber: 3,
          stepBadgeVi: "Bước 3/3: Mở hết túi — Ghép Tính từ + Danh từ",
          questionEn: "Open the bag! What vehicle is it?",
          questionVi: "Mở hết túi rồi! Đây là chiếc xe gì nhỉ?",
          speakingEn: "Blue bicycle!",
          speakingVi: "Chiếc xe đạp màu xanh dương!",
          correctOptionId: "t-blue-bicycle",
          hintVi: "Chọn Blue bicycle (Xe đạp xanh dương) nhé!",
          options: [
            {
              id: "t-blue-bicycle",
              en: "Blue bicycle",
              vi: "Xe đạp xanh dương",
              image: "/assets/items/vehicles/vehicle_03.png",
            },
            {
              id: "t-red-firetruck",
              en: "Big fire truck",
              vi: "Xe cứu hỏa to lớn",
              image: "/assets/items/vehicles/vehicle_11.png",
            },
            {
              id: "t-yellow-bus",
              en: "Yellow bus",
              vi: "Xe buýt màu vàng",
              image: "/assets/items/vehicles/vehicle_02.png",
            },
          ],
        },
      ],
    },
  ],

  // CẤP 3: MẪU CÂU ĐẦY ĐỦ — HỎI ĐÁP MÀU SẮC -> SUY LUẬN ĐA TÍNH NĂNG/TÁC DỤNG -> CẢ CÂU HOÀN CHỈNH
  3: [
    {
      id: "mb-l3-airplane",
      level: 3,
      targetNameEn: "It is a big fast airplane!",
      targetNameVi: "Đó là chiếc máy bay to lớn bay nhanh!",
      targetImage: "/assets/items/vehicles/vehicle_06.png",
      shapeImage: "/assets/items/vehicles/vehicle_06.png",
      colorHex: "#3b82f6",
      steps: [
        {
          stepNumber: 1,
          stepBadgeVi: "Bước 1/3: Hỏi đáp Màu sắc bằng cả câu",
          questionEn: "What colors can you see on this sky vehicle?",
          questionVi: "Phương tiện bầu trời trong túi có màu gì nhỉ?",
          speakingEn: "It is white and blue!",
          speakingVi: "Nó có màu trắng và xanh dương!",
          correctOptionId: "c-white-blue",
          hintVi: "It is white and blue! (Màu trắng và xanh dương)",
          options: [
            { id: "c-white-blue", en: "It is white and blue", vi: "Màu trắng & xanh dương", colorHex: "#3b82f6", emoji: "🤍💙" },
            { id: "c-purple", en: "It is purple", vi: "Nó màu tím", colorHex: "#a855f7", emoji: "💜" },
            { id: "c-green", en: "It is green", vi: "Nó màu xanh lá", colorHex: "#22c55e", emoji: "💚" },
          ],
        },
        {
          stepNumber: 2,
          stepBadgeVi: "Bước 2/3: Suy luận Tính năng & Đặc trưng",
          questionEn: "It has two big wings! Where does it travel?",
          questionVi: "Nó có đôi cánh lớn! Nó di chuyển ở đâu và có tác dụng gì nhỉ?",
          speakingEn: "It flies high in the sky above the clouds!",
          speakingVi: "Nó chở hành khách bay cao trên bầu trời!",
          correctOptionId: "f-fly-sky",
          hintVi: "Có 2 cánh lớn giúp bay cao trên bầu trời (It flies high in the sky)!",
          options: [
            {
              id: "f-fly-sky",
              en: "It flies high above the clouds",
              vi: "Bay vút cao trên bầu trời và đám mây",
              emoji: "✈️☁️",
            },
            {
              id: "f-dive-sea",
              en: "It dives deep under the sea",
              vi: "Lặn sâu dưới đáy đại dương",
              emoji: "🚤🌊",
            },
            {
              id: "f-bake-cookies",
              en: "It bakes cookies in the oven",
              vi: "Nướng bánh quy thơm trong bếp",
              emoji: "🍪🔥",
            },
          ],
        },
        {
          stepNumber: 3,
          stepBadgeVi: "Bước 3/3: Mở hết túi — Nói cả câu hoàn chỉnh",
          questionEn: "Open the bag! Tell Kuromi the full sentence:",
          questionVi: "Mở tung túi rồi! Nấm nói cả câu tiếng Anh hoàn chỉnh nhé:",
          speakingEn: "It is a big fast airplane!",
          speakingVi: "Đó là chiếc máy bay to lớn bay nhanh!",
          correctOptionId: "t-airplane",
          hintVi: "Chọn 'It is a big fast airplane!' nhé!",
          options: [
            {
              id: "t-airplane",
              en: "It is a big fast airplane!",
              vi: "Đó là chiếc máy bay to lớn bay nhanh!",
              image: "/assets/items/vehicles/vehicle_06.png",
            },
            {
              id: "t-submarine",
              en: "It is a yellow submarine!",
              vi: "Đó là chiếc tàu ngầm màu vàng!",
              image: "/assets/items/vehicles/vehicle_09.png",
            },
            {
              id: "t-train",
              en: "It is a long red train!",
              vi: "Đó là đoàn tàu hỏa màu đỏ!",
              image: "/assets/items/vehicles/vehicle_05.png",
            },
          ],
        },
      ],
    },
    {
      id: "mb-l3-firetruck",
      level: 3,
      targetNameEn: "It is a brave red fire truck!",
      targetNameVi: "Đó là chiếc xe cứu hỏa màu đỏ dũng cảm!",
      targetImage: "/assets/items/vehicles/vehicle_11.png",
      shapeImage: "/assets/items/vehicles/vehicle_11.png",
      colorHex: "#ef4444",
      steps: [
        {
          stepNumber: 1,
          stepBadgeVi: "Bước 1/3: Hỏi đáp Màu sắc bằng cả câu",
          questionEn: "What color is this rescue vehicle?",
          questionVi: "Chiếc xe cứu hộ trong túi có màu gì nhỉ?",
          speakingEn: "It is bright red!",
          speakingVi: "Nó có màu đỏ tươi!",
          correctOptionId: "c-red",
          hintVi: "It is bright red! (Màu đỏ tươi)",
          options: [
            { id: "c-red", en: "It is bright red", vi: "Nó màu đỏ tươi", colorHex: "#ef4444", emoji: "❤️" },
            { id: "c-blue", en: "It is blue", vi: "Nó màu xanh dương", colorHex: "#3b82f6", emoji: "💙" },
            { id: "c-pink", en: "It is pink", vi: "Nó màu hồng", colorHex: "#f472b6", emoji: "🩷" },
          ],
        },
        {
          stepNumber: 2,
          stepBadgeVi: "Bước 2/3: Suy luận Nhiệm vụ & Công dụng",
          questionEn: "It has a loud siren, a ladder, and a water hose! What does it do?",
          questionVi: "Nó có còi hú vang, thang dài và vòi phun nước! Nó làm nhiệm vụ gì?",
          speakingEn: "It sprays water to put out fires!",
          speakingVi: "Nó phun nước chữa cháy và cứu giúp mọi người!",
          correctOptionId: "f-put-out-fire",
          hintVi: "Xe cứu hỏa phun nước dập lửa giúp mọi người (It sprays water to put out fires)!",
          options: [
            {
              id: "f-put-out-fire",
              en: "Sprays water to put out fires",
              vi: "Phun nước chữa cháy cứu giúp mọi người",
              emoji: "🚒💦",
            },
            {
              id: "f-sell-icecream",
              en: "Sells sweet ice cream",
              vi: "Bán kem ốc quế ngọt mát",
              emoji: "🍦😋",
            },
            {
              id: "f-color-picture",
              en: "Colors a rainbow picture",
              vi: "Tô màu bức tranh cầu vồng",
              emoji: "🖍️🌈",
            },
          ],
        },
        {
          stepNumber: 3,
          stepBadgeVi: "Bước 3/3: Mở hết túi — Nói cả câu hoàn chỉnh",
          questionEn: "Open the bag! What is it?",
          questionVi: "Mở tung túi rồi! Đây là chiếc xe gì nhỉ?",
          speakingEn: "It is a brave red fire truck!",
          speakingVi: "Đó là chiếc xe cứu hỏa màu đỏ dũng cảm!",
          correctOptionId: "t-firetruck",
          hintVi: "Chọn 'It is a brave red fire truck!' nhé!",
          options: [
            {
              id: "t-firetruck",
              en: "It is a brave red fire truck!",
              vi: "Chiếc xe cứu hỏa màu đỏ dũng cảm!",
              image: "/assets/items/vehicles/vehicle_11.png",
            },
            {
              id: "t-bicycle",
              en: "It is a blue bicycle!",
              vi: "Chiếc xe đạp màu xanh dương!",
              image: "/assets/items/vehicles/vehicle_03.png",
            },
            {
              id: "t-scooter",
              en: "It is a cute pink scooter!",
              vi: "Chiếc xe máy điện màu hồng!",
              image: "/assets/items/vehicles/vehicle_04.png",
            },
          ],
        },
      ],
    },
    {
      id: "mb-l3-fridge",
      level: 3,
      targetNameEn: "It is a cold blue fridge!",
      targetNameVi: "Đó là chiếc tủ lạnh màu xanh mát lạnh!",
      targetImage: "/assets/items/home/home_12.png",
      shapeImage: "/assets/items/home/home_12.png",
      colorHex: "#3b82f6",
      steps: [
        {
          stepNumber: 1,
          stepBadgeVi: "Bước 1/3: Hỏi đáp Màu sắc bằng cả câu",
          questionEn: "What color is this big kitchen item?",
          questionVi: "Đồ dùng nhà bếp to lớn trong túi có màu gì nhỉ?",
          speakingEn: "It is sky blue!",
          speakingVi: "Nó có màu xanh da trời!",
          correctOptionId: "c-blue",
          hintVi: "It is sky blue! (Màu xanh da trời)",
          options: [
            { id: "c-blue", en: "It is sky blue", vi: "Màu xanh da trời", colorHex: "#3b82f6", emoji: "💙" },
            { id: "c-red", en: "It is red", vi: "Nó màu đỏ", colorHex: "#ef4444", emoji: "❤️" },
            { id: "c-yellow", en: "It is yellow", vi: "Nó màu vàng", colorHex: "#facc15", emoji: "💛" },
          ],
        },
        {
          stepNumber: 2,
          stepBadgeVi: "Bước 2/3: Suy luận Tính năng & Công dụng",
          questionEn: "It feels cold inside! How does it help our family?",
          questionVi: "Bên trong nó rất mát lạnh! Nó giúp gia đình mình việc gì nhỉ?",
          speakingEn: "It keeps milk, fruit and food fresh and cold!",
          speakingVi: "Giữ cho sữa, hoa quả và thức ăn luôn tươi mát!",
          correctOptionId: "f-keep-fresh",
          hintVi: "Tủ lạnh giúp bảo quản sữa và hoa quả tươi mát (Keeps food fresh and cold)!",
          options: [
            {
              id: "f-keep-fresh",
              en: "Keeps milk & fruit fresh and cold",
              vi: "Bảo quản sữa và hoa quả luôn tươi mát",
              emoji: "🧊🥛",
            },
            {
              id: "f-boil-soup",
              en: "Boils hot soup on the stove",
              vi: "Đun sôi nồi canh nóng trên bếp",
              emoji: "🍲🔥",
            },
            {
              id: "f-sweep-dust",
              en: "Sweeps dust off the floor",
              vi: "Quét sạch bụi trên sàn nhà",
              emoji: "🧹✨",
            },
          ],
        },
        {
          stepNumber: 3,
          stepBadgeVi: "Bước 3/3: Mở hết túi — Nói cả câu hoàn chỉnh",
          questionEn: "Open the bag! What is inside?",
          questionVi: "Mở tung túi rồi! Đây là cái gì nhỉ?",
          speakingEn: "It is a cold blue fridge!",
          speakingVi: "Đó là chiếc tủ lạnh màu xanh mát lạnh!",
          correctOptionId: "t-fridge",
          hintVi: "Chọn 'It is a cold blue fridge!' nhé!",
          options: [
            {
              id: "t-fridge",
              en: "It is a cold blue fridge!",
              vi: "Chiếc tủ lạnh màu xanh mát lạnh!",
              image: "/assets/items/home/home_12.png",
            },
            {
              id: "t-lamp",
              en: "It is a warm yellow lamp!",
              vi: "Chiếc đèn bàn ánh vàng ấm áp!",
              image: "/assets/items/home/home_01.png",
            },
            {
              id: "t-pillow",
              en: "It is a soft yellow pillow!",
              vi: "Chiếc gối màu vàng êm mềm!",
              image: "/assets/items/home/home_07.png",
            },
          ],
        },
      ],
    },
    {
      id: "mb-l3-cookingpot",
      level: 3,
      targetNameEn: "It is a hot cooking pot!",
      targetNameVi: "Đó là chiếc nồi nấu canh nóng hổi!",
      targetImage: "/assets/items/lifeskills/lifeskills_08.png",
      shapeImage: "/assets/items/lifeskills/lifeskills_08.png",
      colorHex: "#f472b6",
      steps: [
        {
          stepNumber: 1,
          stepBadgeVi: "Bước 1/3: Hỏi đáp Màu sắc bằng cả câu",
          questionEn: "What color is the lid of this kitchen item?",
          questionVi: "Nắp của dụng cụ nhà bếp này có màu gì nhỉ?",
          speakingEn: "It is pink and cream!",
          speakingVi: "Nó có màu hồng và kem!",
          correctOptionId: "c-pink",
          hintVi: "It is pink and cream! (Màu hồng và kem)",
          options: [
            { id: "c-pink", en: "It is pink and cream", vi: "Màu hồng & kem", colorHex: "#f472b6", emoji: "🩷🤍" },
            { id: "c-blue", en: "It is blue", vi: "Nó màu xanh dương", colorHex: "#3b82f6", emoji: "💙" },
            { id: "c-green", en: "It is green", vi: "Nó màu xanh lá", colorHex: "#22c55e", emoji: "💚" },
          ],
        },
        {
          stepNumber: 2,
          stepBadgeVi: "Bước 2/3: Suy luận Công dụng nấu ăn",
          questionEn: "It has two handles and a lid! What do we cook inside it?",
          questionVi: "Nó có 2 quai cầm và nắp đậy! Trong bếp mình dùng nó nấu món gì?",
          speakingEn: "We boil yummy warm soup inside it!",
          speakingVi: "Dùng để nấu những nồi canh nóng hổi thơm ngon!",
          correctOptionId: "f-cook-soup",
          hintVi: "Chiếc nồi dùng để đun nấu canh súp nóng hổi (Boil yummy warm soup)!",
          options: [
            {
              id: "f-cook-soup",
              en: "Boil yummy warm soup inside",
              vi: "Ninh nấu nồi canh rau củ nóng hổi",
              emoji: "🍲🥕",
            },
            {
              id: "f-erase-pencil",
              en: "Erase pencil marks",
              vi: "Tẩy sạch nét bút chì viết nhầm",
              emoji: "🧼✏️",
            },
            {
              id: "f-ride-school",
              en: "Ride to school on the road",
              vi: "Chở học sinh đến trường",
              emoji: "🚌🏫",
            },
          ],
        },
        {
          stepNumber: 3,
          stepBadgeVi: "Bước 3/3: Mở hết túi — Nói cả câu hoàn chỉnh",
          questionEn: "Open the bag! What is it?",
          questionVi: "Mở tung túi rồi! Đây là dụng cụ bếp gì nhỉ?",
          speakingEn: "It is a hot cooking pot!",
          speakingVi: "Đó là chiếc nồi nấu canh nóng hổi!",
          correctOptionId: "t-cookingpot",
          hintVi: "Chọn 'It is a hot cooking pot!' nhé!",
          options: [
            {
              id: "t-cookingpot",
              en: "It is a hot cooking pot!",
              vi: "Chiếc nồi nấu canh nóng hổi!",
              image: "/assets/items/lifeskills/lifeskills_08.png",
            },
            {
              id: "t-cuttingboard",
              en: "It is a wooden cutting board!",
              vi: "Chiếc thớt gỗ đầu bếp!",
              image: "/assets/items/lifeskills/lifeskills_01.png",
            },
            {
              id: "t-milkcarton",
              en: "It is a fresh milk carton!",
              vi: "Hộp sữa bò tươi mát!",
              image: "/assets/items/lifeskills/lifeskills_03.png",
            },
          ],
        },
      ],
    },
    {
      id: "mb-l3-globe",
      level: 3,
      targetNameEn: "It is a round Earth globe!",
      targetNameVi: "Đó là quả địa cầu tròn xoay!",
      targetImage: "/assets/items/school/school_15.png",
      shapeImage: "/assets/items/school/school_15.png",
      colorHex: "#3b82f6",
      steps: [
        {
          stepNumber: 1,
          stepBadgeVi: "Bước 1/3: Hỏi đáp Màu sắc bằng cả câu",
          questionEn: "What colors are the oceans and land on it?",
          questionVi: "Màu của đại dương và đất liền trên vật này là màu gì nhỉ?",
          speakingEn: "It is blue and green!",
          speakingVi: "Nó có màu xanh biển và xanh lá!",
          correctOptionId: "c-blue-green",
          hintVi: "It is blue and green! (Xanh biển và xanh lá)",
          options: [
            { id: "c-blue-green", en: "It is blue and green", vi: "Xanh biển & xanh lá", colorHex: "#3b82f6", emoji: "💙💚" },
            { id: "c-pink", en: "It is pink", vi: "Nó màu hồng", colorHex: "#f472b6", emoji: "🩷" },
            { id: "c-orange", en: "It is orange", vi: "Nó màu cam", colorHex: "#fb923c", emoji: "🧡" },
          ],
        },
        {
          stepNumber: 2,
          stepBadgeVi: "Bước 2/3: Suy luận Hình dạng & Công dụng",
          questionEn: "It is round like a ball and spins! What do we learn from it?",
          questionVi: "Nó tròn như quả bóng và xoay quanh trục! Nó giúp Nấm học điều gì?",
          speakingEn: "We spin it to explore countries and oceans!",
          speakingVi: "Xoay để khám phá các đất nước và đại dương trên thế giới!",
          correctOptionId: "f-explore-world",
          hintVi: "Quả địa cầu giúp mình xoay và khám phá thế giới (Spin to explore countries & oceans)!",
          options: [
            {
              id: "f-explore-world",
              en: "Spin to explore the world",
              vi: "Xoay tròn khám phá các nước & đại dương",
              emoji: "🌍🧭",
            },
            {
              id: "f-eat-noodles",
              en: "Eat hot ramen noodles",
              vi: "Dùng để ăn mì trứng nóng hổi",
              emoji: "🍜😋",
            },
            {
              id: "f-wash-hands",
              en: "Wash hands with bubbles",
              vi: "Xịt bọt xà phòng rửa tay",
              emoji: "🧴🫧",
            },
          ],
        },
        {
          stepNumber: 3,
          stepBadgeVi: "Bước 3/3: Mở hết túi — Nói cả câu hoàn chỉnh",
          questionEn: "Open the bag! What is it?",
          questionVi: "Mở tung túi rồi! Đây là vật gì nhỉ?",
          speakingEn: "It is a round Earth globe!",
          speakingVi: "Đó là quả địa cầu tròn xoay!",
          correctOptionId: "t-globe",
          hintVi: "Chọn 'It is a round Earth globe!' nhé!",
          options: [
            {
              id: "t-globe",
              en: "It is a round Earth globe!",
              vi: "Quả địa cầu tròn xoay!",
              image: "/assets/items/school/school_15.png",
            },
            {
              id: "t-schoolbus",
              en: "It is a yellow school bus!",
              vi: "Chiếc xe buýt trường học màu vàng!",
              image: "/assets/items/school/school_14.png",
            },
            {
              id: "t-pencilcase",
              en: "It is a purple pencil case!",
              vi: "Chiếc hộp bút màu tím hoa cúc!",
              image: "/assets/items/school/school_12.png",
            },
          ],
        },
      ],
    },
    {
      id: "mb-l3-apple",
      level: 3,
      targetNameEn: "It is a crunchy sweet red apple!",
      targetNameVi: "Đó là quả táo đỏ giòn tan và ngọt lịm!",
      targetImage: "/assets/items/fruits/fruit_02.png",
      shapeImage: "/assets/items/fruits/fruit_02.png",
      colorHex: "#ef4444",
      steps: [
        {
          stepNumber: 1,
          stepBadgeVi: "Bước 1/3: Hỏi đáp Màu sắc bằng cả câu",
          questionEn: "What color is this healthy fruit?",
          questionVi: "Quả ngon lành trong túi có màu gì nhỉ?",
          speakingEn: "It is red!",
          speakingVi: "Nó có màu đỏ!",
          correctOptionId: "c-red",
          hintVi: "It is red! (Nó có màu đỏ)",
          options: [
            { id: "c-red", en: "It is red", vi: "Nó màu đỏ", colorHex: "#ef4444", emoji: "❤️" },
            { id: "c-blue", en: "It is blue", vi: "Nó màu xanh dương", colorHex: "#3b82f6", emoji: "💙" },
            { id: "c-purple", en: "It is purple", vi: "Nó màu tím", colorHex: "#a855f7", emoji: "💜" },
          ],
        },
        {
          stepNumber: 2,
          stepBadgeVi: "Bước 2/3: Suy luận Hương vị & Ích lợi",
          questionEn: "How does it taste, and why is it good for us?",
          questionVi: "Quả này có vị như thế nào và giúp ích gì cho cơ thể?",
          speakingEn: "It is crunchy, sweet and full of vitamins!",
          speakingVi: "Nó giòn tan, ngọt mát và có nhiều vitamin tốt cho sức khỏe!",
          correctOptionId: "f-crunchy-vitamin",
          hintVi: "Quả táo tròn, giòn ngọt và giàu vitamin (Crunchy, sweet & full of vitamins)!",
          options: [
            {
              id: "f-crunchy-vitamin",
              en: "Crunchy, sweet & healthy vitamins",
              vi: "Giòn tan, ngọt mát & giàu vitamin",
              emoji: "🍎💪",
            },
            {
              id: "f-metal-wheels",
              en: "Made of metal with 4 wheels",
              vi: "Làm bằng sắt và có 4 bánh xe",
              emoji: "🚗🛞",
            },
            {
              id: "f-cut-paper",
              en: "Sharp blades for cutting paper",
              vi: "Có hai lưỡi sắc để cắt giấy",
              emoji: "✂️📄",
            },
          ],
        },
        {
          stepNumber: 3,
          stepBadgeVi: "Bước 3/3: Mở hết túi — Câu mô tả đầy đủ",
          questionEn: "Open the bag! What is it?",
          questionVi: "Mở tung túi rồi! Kết hợp cả Màu + Vị + Tên quả, đây là gì?",
          speakingEn: "It is a crunchy sweet red apple!",
          speakingVi: "Đó là quả táo đỏ giòn và ngọt!",
          correctOptionId: "t-red-apple",
          hintVi: "Chọn 'It is a crunchy sweet red apple!' nhé!",
          options: [
            {
              id: "t-red-apple",
              en: "It is a crunchy sweet red apple!",
              vi: "Quả táo đỏ giòn tan ngọt ngào!",
              image: "/assets/items/fruits/fruit_02.png",
            },
            {
              id: "t-yellow-banana",
              en: "It is a long yellow banana!",
              vi: "Quả chuối vàng dài!",
              image: "/assets/items/fruits/fruit_03.png",
            },
            {
              id: "t-pink-donut",
              en: "It is a sweet pink donut!",
              vi: "Chiếc bánh vòng màu hồng!",
              image: "/assets/items/sweets/sweet_02.png",
            },
          ],
        },
      ],
    },
  ],
};


