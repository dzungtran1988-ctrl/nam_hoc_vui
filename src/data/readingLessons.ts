import {
  getSharedAssetById,
  querySharedAssets,
  type SharedAssetMetadata,
} from "./sharedAssetCatalog.ts";

export type PoemQuestionType = "comprehension" | "fill_blank" | "life_skill";

export interface PoemQuizItem {
  id: string;
  type: PoemQuestionType;
  badgeLabel: string;
  question: string;
  blankLinePreview?: string;
  choices: string[];
  correctIndex: number;
  evidenceSlideIndex: number;
  evidenceLineIndex: number;
  evidenceWord: string;
  hint: string;
  feedback: string;
}

export interface PoemReadingItem {
  id: string;
  level: 1 | 2;
  topic: string;
  title: string;
  icon: string;
  heroImage?: string;
  color: string;
  slides: string[][];
  questions: PoemQuizItem[];
  comprehensionQuestion: PoemQuizItem;
}

/**
 * Xáo trộn mảng tất định hoặc ngẫu nhiên nhưng luôn đảm bảo không giữ nguyên thứ tự gốc
 * nếu có từ 2 phần tử trở lên.
 */
export function shuffleArray<T>(items: readonly T[], seed?: number): T[] {
  const arr = [...items];
  if (arr.length <= 1) return arr;

  let currentSeed =
    typeof seed === "number" ? seed : Math.floor(Math.random() * 100000);
  const nextRand = () => {
    currentSeed = (currentSeed * 1664525 + 1013904223) % 4294967296;
    return currentSeed / 4294967296;
  };

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(nextRand() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  const unchanged = arr.every((val, idx) => val === items[idx]);
  if (unchanged) {
    const first = arr[0];
    arr[0] = arr[1];
    arr[1] = first;
  }

  return arr;
}

/**
 * Kiểm tra thứ tự câu bé xếp có khớp hoàn toàn với mảng đích không.
 */
export function isSentenceOrderCorrect(
  placedChunks: readonly string[],
  targetChunks: readonly string[],
): boolean {
  if (placedChunks.length !== targetChunks.length) return false;
  return placedChunks.every(
    (chunk, idx) => chunk.trim() === targetChunks[idx].trim(),
  );
}

// =============================================================================
// KHO 10 BÀI THƠ CỦA NẤM:
// - Mức 1 (5 bài): Thơ ngắn 1–2 khổ (6–8 dòng) khởi động nhẹ nhàng
// - Mức 2 (5 bài): Thơ dài 3 khổ (12 dòng) rèn tập trung lâu theo từng dòng
// - Mỗi bài có chuỗi 3 câu hỏi cuối bài + tọa độ dòng/khổ thơ bằng chứng
// =============================================================================
export const POEM_READING_LIBRARY: PoemReadingItem[] = [
  {
    id: "lv1-bap-cai-xanh",
    level: 1,
    topic: "Thơ 3 chữ · 2 khổ",
    title: "Bắp Cải Xanh",
    icon: "🥬",
    heroImage: "/assets/items/lifeskills/lifeskills_06.png",
    color: "#2ED573",
    slides: [
      ["Bắp cải xanh", "Xanh man mát", "Lá cải sắp"],
      ["Sắp vòng tròn", "Búp cải non", "Nằm ngủ giữa"],
    ],
    comprehensionQuestion: {
      id: "bap-cai-q1",
      type: "comprehension",
      badgeLabel: "Câu 1/3 · Hiểu nội dung",
      question: "Búp cải non nằm ngủ ở đâu hả Nấm?",
      choices: ["Nằm ngủ giữa", "Trên ngọn cây", "Dưới mặt nước"],
      correctIndex: 0,
      evidenceSlideIndex: 1,
      evidenceLineIndex: 2,
      evidenceWord: "Nằm ngủ giữa",
      feedback: "Đúng rồi! Búp cải non nằm ngủ ở chính giữa vòng tròn lá cải!",
      hint: "Nấm nhìn dòng cuối ở Khổ 2 nhé: Búp cải non / Nằm ngủ giữa!",
    },
    questions: [
      {
        id: "bap-cai-q1",
        type: "comprehension",
        badgeLabel: "Câu 1/3 · Hiểu nội dung",
        question: "Búp cải non nằm ngủ ở đâu hả Nấm?",
        choices: ["Nằm ngủ giữa", "Trên ngọn cây", "Dưới mặt nước"],
        correctIndex: 0,
        evidenceSlideIndex: 1,
        evidenceLineIndex: 2,
        evidenceWord: "Nằm ngủ giữa",
        feedback: "Đúng rồi! Búp cải non nằm ngủ ở chính giữa vòng tròn lá cải!",
        hint: "Nấm nhìn dòng cuối ở Khổ 2 nhé: Búp cải non / Nằm ngủ giữa!",
      },
      {
        id: "bap-cai-q2",
        type: "fill_blank",
        badgeLabel: "Câu 2/3 · Điền từ thơ",
        question: "Nấm chọn từ còn thiếu để hoàn thành câu thơ ở Khổ 1 nhé:",
        blankLinePreview: "Bắp cải xanh / Xanh [ ___ ]",
        choices: ["man mát", "nóng bức", "đỏ chói"],
        correctIndex: 0,
        evidenceSlideIndex: 0,
        evidenceLineIndex: 1,
        evidenceWord: "Xanh man mát",
        feedback: "Giỏi quá! Câu thơ đúng là: Bắp cải xanh, Xanh man mát!",
        hint: "Nấm nhìn dòng thứ 2 của Khổ 1 nhé: Xanh man mát!",
      },
      {
        id: "bap-cai-q3",
        type: "life_skill",
        badgeLabel: "Câu 3/3 · Bài học của Nấm",
        question: "Rau bắp cải xanh là món ăn gì tốt cho sức khỏe của Nấm nhỉ?",
        choices: [
          "Rau xanh nấu canh, luộc mát lành",
          "Đồ chơi bằng nhựa",
          "Bánh kẹo ngọt",
        ],
        correctIndex: 0,
        evidenceSlideIndex: 0,
        evidenceLineIndex: 0,
        evidenceWord: "Bắp cải xanh",
        feedback: "Tuyệt vời! Ăn nhiều rau bắp cải xanh giúp Nấm khỏe mạnh và mát lành!",
        hint: "Bắp cải xanh là loại rau xanh mẹ nấu trong bữa cơm hằng ngày đó Nấm!",
      },
    ],
  },
  {
    id: "lv1-cu-ca-rot",
    level: 1,
    topic: "Thơ 2 chữ · 2 khổ",
    title: "Củ Cà Rốt",
    icon: "🥕",
    heroImage: "/assets/english/items/animal_07_rabbit.png",
    color: "#FF7F50",
    slides: [
      ["Lá xanh", "Củ đỏ", "Lớn nhỏ", "Bên nhau"],
      ["Đất đội", "Ngập đầu", "Tên em", "Cà rốt"],
    ],
    comprehensionQuestion: {
      id: "ca-rot-q1",
      type: "comprehension",
      badgeLabel: "Câu 1/3 · Hiểu nội dung",
      question: "Củ cà rốt có lá màu gì và củ màu gì nhỉ?",
      choices: ["Lá xanh, củ đỏ", "Lá tím, củ vàng", "Lá đen, củ trắng"],
      correctIndex: 0,
      evidenceSlideIndex: 0,
      evidenceLineIndex: 1,
      evidenceWord: "Củ đỏ",
      feedback: "Giỏi lắm! Củ cà rốt có lá màu xanh và củ màu đỏ!",
      hint: "Nấm nhìn 2 dòng đầu của Khổ 1 nhé: Lá xanh / Củ đỏ!",
    },
    questions: [
      {
        id: "ca-rot-q1",
        type: "comprehension",
        badgeLabel: "Câu 1/3 · Hiểu nội dung",
        question: "Củ cà rốt có lá màu gì và củ màu gì nhỉ?",
        choices: ["Lá xanh, củ đỏ", "Lá tím, củ vàng", "Lá đen, củ trắng"],
        correctIndex: 0,
        evidenceSlideIndex: 0,
        evidenceLineIndex: 1,
        evidenceWord: "Củ đỏ",
        feedback: "Giỏi lắm! Củ cà rốt có lá màu xanh và củ màu đỏ!",
        hint: "Nấm nhìn 2 dòng đầu của Khổ 1 nhé: Lá xanh / Củ đỏ!",
      },
      {
        id: "ca-rot-q2",
        type: "fill_blank",
        badgeLabel: "Câu 2/3 · Điền từ thơ",
        question: "Nấm chọn từ đúng điền vào câu cuối của bài thơ nhé:",
        blankLinePreview: "Tên em / [ ___ ]",
        choices: ["Cà rốt", "Quả bóng", "Con mèo"],
        correctIndex: 0,
        evidenceSlideIndex: 1,
        evidenceLineIndex: 3,
        evidenceWord: "Cà rốt",
        feedback: "Chính xác! Tên em là Cà rốt!",
        hint: "Dòng cuối cùng của Khổ 2 có tên của củ đỏ đấy Nấm!",
      },
      {
        id: "ca-rot-q3",
        type: "life_skill",
        badgeLabel: "Câu 3/3 · Bài học của Nấm",
        question: "Củ cà rốt mọc ở đâu và giúp đôi mắt Nấm thế nào?",
        choices: [
          "Mọc dưới đất, giúp sáng mắt",
          "Bay trên trời cao",
          "Bơi dưới đáy biển",
        ],
        correctIndex: 0,
        evidenceSlideIndex: 1,
        evidenceLineIndex: 0,
        evidenceWord: "Đất đội",
        feedback: "Hoan hô Nấm! Củ cà rốt mọc dưới đất và giúp đôi mắt sáng khỏe!",
        hint: "Ở Khổ 2 có câu: Đất đội / Ngập đầu vì củ cà rốt nằm dưới đất!",
      },
    ],
  },
  {
    id: "lv1-chau-chao-ong",
    level: 1,
    topic: "Thơ 4 chữ · 2 khổ",
    title: "Cháu Chào Ông Ạ",
    icon: "🐤",
    heroImage: "/assets/pochacco/action-wave-hello.png",
    color: "#FFA502",
    slides: [
      [
        "Gà con nhỏ xíu",
        "Lông vàng dễ thương",
        "Gặp ông trên đường",
        "Cháu chào ông ạ!",
      ],
      [
        "Gà con ngoan quá",
        "Ông khen gật đầu",
        "Đi học thuộc câu",
        "Lễ phép chào hỏi",
      ],
    ],
    comprehensionQuestion: {
      id: "chao-ong-q1",
      type: "comprehension",
      badgeLabel: "Câu 1/3 · Hiểu nội dung",
      question: "Khi gặp ông trên đường, bạn Gà con đã nói gì nhỉ?",
      choices: ["Cháu chào ông ạ!", "Con đi chơi đây", "Ông cho con kẹo"],
      correctIndex: 0,
      evidenceSlideIndex: 0,
      evidenceLineIndex: 3,
      evidenceWord: "Cháu chào ông ạ!",
      feedback: "Hoan hô! Gà con khoanh cánh lễ phép: Cháu chào ông ạ!",
      hint: "Nấm xem dòng thứ 4 của Khổ 1 nhé: Cháu chào ông ạ!",
    },
    questions: [
      {
        id: "chao-ong-q1",
        type: "comprehension",
        badgeLabel: "Câu 1/3 · Hiểu nội dung",
        question: "Khi gặp ông trên đường, bạn Gà con đã nói gì nhỉ?",
        choices: ["Cháu chào ông ạ!", "Con đi chơi đây", "Ông cho con kẹo"],
        correctIndex: 0,
        evidenceSlideIndex: 0,
        evidenceLineIndex: 3,
        evidenceWord: "Cháu chào ông ạ!",
        feedback: "Hoan hô! Gà con khoanh cánh lễ phép: Cháu chào ông ạ!",
        hint: "Nấm xem dòng thứ 4 của Khổ 1 nhé: Cháu chào ông ạ!",
      },
      {
        id: "chao-ong-q2",
        type: "fill_blank",
        badgeLabel: "Câu 2/3 · Điền từ thơ",
        question: "Bộ lông của bạn Gà con có màu gì? Nấm điền vào câu thơ nhé:",
        blankLinePreview: "Gà con nhỏ xíu / [ ___ ] dễ thương",
        choices: ["Lông vàng", "Lông tím", "Lông xanh"],
        correctIndex: 0,
        evidenceSlideIndex: 0,
        evidenceLineIndex: 1,
        evidenceWord: "Lông vàng dễ thương",
        feedback: "Đúng rồi! Gà con nhỏ xíu, Lông vàng dễ thương!",
        hint: "Dòng thứ 2 của Khổ 1 nhắc đến màu lông của Gà con đấy!",
      },
      {
        id: "chao-ong-q3",
        type: "life_skill",
        badgeLabel: "Câu 3/3 · Bài học của Nấm",
        question: "Khi Nấm gặp ông bà, thầy cô hoặc người lớn thì Nấm làm gì?",
        choices: [
          "Khoanh tay lễ phép chào hỏi",
          "Quay mặt chạy đi",
          "Im lặng không nói gì",
        ],
        correctIndex: 0,
        evidenceSlideIndex: 1,
        evidenceLineIndex: 3,
        evidenceWord: "Lễ phép chào hỏi",
        feedback: "Nấm ngoan lắm! Gặp người lớn mình khoanh tay lễ phép chào hỏi nhé!",
        hint: "Dòng cuối của Khổ 2 dặn chúng mình: Lễ phép chào hỏi!",
      },
    ],
  },
  {
    id: "lv1-ke-cho-be-nghe",
    level: 1,
    topic: "Đồng dao · 2 khổ",
    title: "Kể Cho Bé Nghe",
    icon: "🦆",
    heroImage: "/assets/english/items/animal_08_duck.png",
    color: "#1E90FF",
    slides: [
      [
        "Hay nói ầm ĩ",
        "Là con vịt bầu",
        "Hay hỏi đâu đâu",
        "Là con chó vện",
      ],
      [
        "Hay chăng dây điện",
        "Là con nhện con",
        "Ăn no quay tròn",
        "Là cối xay lúa",
      ],
    ],
    comprehensionQuestion: {
      id: "ke-nghe-q1",
      type: "comprehension",
      badgeLabel: "Câu 1/3 · Hiểu nội dung",
      question: "Trong bài thơ, bạn nào hay nói ầm ĩ nhỉ?",
      choices: ["Con vịt bầu", "Con mèo lười", "Con cá vàng"],
      correctIndex: 0,
      evidenceSlideIndex: 0,
      evidenceLineIndex: 1,
      evidenceWord: "Là con vịt bầu",
      feedback: "Chuẩn luôn! Hay nói ầm ĩ là con vịt bầu!",
      hint: "Hai dòng đầu Khổ 1: Hay nói ầm ĩ / Là con vịt bầu!",
    },
    questions: [
      {
        id: "ke-nghe-q1",
        type: "comprehension",
        badgeLabel: "Câu 1/3 · Hiểu nội dung",
        question: "Trong bài thơ, bạn nào hay nói ầm ĩ nhỉ?",
        choices: ["Con vịt bầu", "Con mèo lười", "Con cá vàng"],
        correctIndex: 0,
        evidenceSlideIndex: 0,
        evidenceLineIndex: 1,
        evidenceWord: "Là con vịt bầu",
        feedback: "Chuẩn luôn! Hay nói ầm ĩ là con vịt bầu!",
        hint: "Hai dòng đầu Khổ 1: Hay nói ầm ĩ / Là con vịt bầu!",
      },
      {
        id: "ke-nghe-q2",
        type: "fill_blank",
        badgeLabel: "Câu 2/3 · Điền từ thơ",
        question: "Bạn nào hay chăng dây như dây điện ở Khổ 2 nhỉ?",
        blankLinePreview: "Hay chăng dây điện / Là con [ ___ ]",
        choices: ["nhện con", "gà trống", "thỏ trắng"],
        correctIndex: 0,
        evidenceSlideIndex: 1,
        evidenceLineIndex: 1,
        evidenceWord: "Là con nhện con",
        feedback: "Giỏi lắm! Hay chăng dây điện là con nhện con!",
        hint: "Nấm nhìn dòng thứ 2 của Khổ 2 nhé: Là con nhện con!",
      },
      {
        id: "ke-nghe-q3",
        type: "life_skill",
        badgeLabel: "Câu 3/3 · Bài học của Nấm",
        question: "Con vịt bầu thường kêu thế nào và bơi ở đâu hả Nấm?",
        choices: [
          "Kêu cạp cạp và bơi dưới ao nước",
          "Kêu meo meo và trèo cây",
          "Kêu gâu gâu và canh nhà",
        ],
        correctIndex: 0,
        evidenceSlideIndex: 0,
        evidenceLineIndex: 1,
        evidenceWord: "Là con vịt bầu",
        feedback: "Đúng rồi! Con vịt bầu kêu cạp cạp rất to và thích bơi dưới ao!",
        hint: "Vịt bầu hay kêu cạp cạp ầm ĩ dưới ao nước đó Nấm!",
      },
    ],
  },
  {
    id: "lv1-xe-chua-chay",
    level: 1,
    topic: "Thơ 4 chữ · 2 khổ",
    title: "Xe Chữa Cháy",
    icon: "🚒",
    heroImage: "/assets/english/items/shop_15_car_red.png",
    color: "#FF4757",
    slides: [
      [
        "Mình đỏ như lửa",
        "Bụng chứa nước đầy",
        "Tôi chạy như bay",
        "Hét vang đường phố",
      ],
      [
        "Nhà nào bốc lửa",
        "Tôi dập liền tay",
        "Ai gọi chữa cháy?",
        "Có ngay! Có ngay!",
      ],
    ],
    comprehensionQuestion: {
      id: "chua-chay-q1",
      type: "comprehension",
      badgeLabel: "Câu 1/3 · Hiểu nội dung",
      question: "Bụng của chiếc xe chữa cháy màu đỏ chứa đầy cái gì nhỉ?",
      choices: ["Chứa nước đầy", "Chứa đầy kẹo", "Chứa bóng bay"],
      correctIndex: 0,
      evidenceSlideIndex: 0,
      evidenceLineIndex: 1,
      evidenceWord: "Bụng chứa nước đầy",
      feedback: "Đúng rồi! Xe chữa cháy bụng chứa nước đầy để dập lửa!",
      hint: "Dòng thứ 2 của Khổ 1: Bụng chứa nước đầy!",
    },
    questions: [
      {
        id: "chua-chay-q1",
        type: "comprehension",
        badgeLabel: "Câu 1/3 · Hiểu nội dung",
        question: "Bụng của chiếc xe chữa cháy màu đỏ chứa đầy cái gì nhỉ?",
        choices: ["Chứa nước đầy", "Chứa đầy kẹo", "Chứa bóng bay"],
        correctIndex: 0,
        evidenceSlideIndex: 0,
        evidenceLineIndex: 1,
        evidenceWord: "Bụng chứa nước đầy",
        feedback: "Đúng rồi! Xe chữa cháy bụng chứa nước đầy để dập lửa!",
        hint: "Dòng thứ 2 của Khổ 1: Bụng chứa nước đầy!",
      },
      {
        id: "chua-chay-q2",
        type: "fill_blank",
        badgeLabel: "Câu 2/3 · Điền từ thơ",
        question: "Khi có nhà bốc lửa thì xe chữa cháy làm gì? Nấm điền từ nhé:",
        blankLinePreview: "Nhà nào bốc lửa / Tôi [ ___ ] liền tay",
        choices: ["dập", "ngủ", "chơi"],
        correctIndex: 0,
        evidenceSlideIndex: 1,
        evidenceLineIndex: 1,
        evidenceWord: "Tôi dập liền tay",
        feedback: "Chính xác! Nhà nào bốc lửa, Tôi dập liền tay!",
        hint: "Nấm xem dòng thứ 2 ở Khổ 2 nhé: Tôi dập liền tay!",
      },
      {
        id: "chua-chay-q3",
        type: "life_skill",
        badgeLabel: "Câu 3/3 · Bài học của Nấm",
        question: "Để phòng cháy an toàn ở nhà, Nấm cần nhớ điều gì?",
        choices: [
          "Không nghịch lửa, bật lửa và ổ điện",
          "Mang diêm ra đốt giấy chơi",
          "Chạm tay vào bếp đang nóng",
        ],
        correctIndex: 0,
        evidenceSlideIndex: 1,
        evidenceLineIndex: 0,
        evidenceWord: "Nhà nào bốc lửa",
        feedback: "Giỏi lắm! Nấm luôn tránh xa lửa nóng và ổ điện để giữ an toàn nhé!",
        hint: "Lửa rất nguy hiểm nên mình tuyệt đối không nghịch lửa nhé!",
      },
    ],
  },

  // ===========================================================================
  // MỨC 2: THƠ DÀI RÈN TẬP TRUNG (3 KHỔ · 12 DÒNG THƠ)
  // ===========================================================================
  {
    id: "lv2-co-day",
    level: 2,
    topic: "Thơ dài 3 khổ · Phạm Hổ",
    title: "Thơ: Cô Dạy",
    icon: "🤲",
    heroImage: "/assets/english/items/act_12_wash_hands.png",
    color: "#E84393",
    slides: [
      [
        "Mẹ mẹ ơi cô dạy",
        "Phải giữ sạch đôi tay",
        "Bàn tay mà dây bẩn",
        "Sách áo cũng bẩn ngay",
      ],
      [
        "Mẹ mẹ ơi cô dạy",
        "Cãi nhau là không hay",
        "Cái miệng nó xinh thế",
        "Chỉ nói điều hay thôi",
      ],
      [
        "Mẹ mẹ ơi cô dạy",
        "Quần áo xếp gọn gàng",
        "Đi học về cất cặp",
        "Giúp mẹ việc nhẹ nhàng",
      ],
    ],
    comprehensionQuestion: {
      id: "co-day-q1",
      type: "comprehension",
      badgeLabel: "Câu 1/3 · Hiểu nội dung",
      question: "Ở khổ thơ đầu, nếu bàn tay mà dây bẩn thì điều gì sẽ xảy ra?",
      choices: [
        "Sách áo cũng bẩn ngay",
        "Được thưởng nhiều kẹo",
        "Quần áo thơm tho hơn",
      ],
      correctIndex: 0,
      evidenceSlideIndex: 0,
      evidenceLineIndex: 3,
      evidenceWord: "Sách áo cũng bẩn ngay",
      feedback: "Đúng rồi! Bàn tay mà dây bẩn thì sách áo cũng bẩn ngay!",
      hint: "Nấm nhìn dòng cuối của Khổ 1 nhé: Sách áo cũng bẩn ngay!",
    },
    questions: [
      {
        id: "co-day-q1",
        type: "comprehension",
        badgeLabel: "Câu 1/3 · Hiểu nội dung",
        question: "Ở khổ thơ đầu, nếu bàn tay mà dây bẩn thì điều gì sẽ xảy ra?",
        choices: [
          "Sách áo cũng bẩn ngay",
          "Được thưởng nhiều kẹo",
          "Quần áo thơm tho hơn",
        ],
        correctIndex: 0,
        evidenceSlideIndex: 0,
        evidenceLineIndex: 3,
        evidenceWord: "Sách áo cũng bẩn ngay",
        feedback: "Đúng rồi! Bàn tay mà dây bẩn thì sách áo cũng bẩn ngay!",
        hint: "Nấm nhìn dòng cuối của Khổ 1 nhé: Sách áo cũng bẩn ngay!",
      },
      {
        id: "co-day-q2",
        type: "fill_blank",
        badgeLabel: "Câu 2/3 · Điền từ thơ",
        question: "Ở Khổ 2, cái miệng xinh của bé chỉ nói điều gì? Nấm điền từ nhé:",
        blankLinePreview: "Cái miệng nó xinh thế / Chỉ nói [ ___ ] thôi",
        choices: ["điều hay", "cãi nhau", "hét to"],
        correctIndex: 0,
        evidenceSlideIndex: 1,
        evidenceLineIndex: 3,
        evidenceWord: "Chỉ nói điều hay thôi",
        feedback: "Tuyệt vời! Cái miệng nó xinh thế, Chỉ nói điều hay thôi!",
        hint: "Nấm xem dòng cuối của Khổ 2 nhé: Chỉ nói điều hay thôi!",
      },
      {
        id: "co-day-q3",
        type: "life_skill",
        badgeLabel: "Câu 3/3 · Bài học của Nấm",
        question: "Theo Khổ 3, khi đi học về nhà thì Nấm nên làm gì giúp mẹ?",
        choices: [
          "Xếp quần áo gọn gàng, cất cặp đúng chỗ",
          "Vứt cặp sách lung tung trên sàn",
          "Để tay bẩn cầm vào sách vở",
        ],
        correctIndex: 0,
        evidenceSlideIndex: 2,
        evidenceLineIndex: 2,
        evidenceWord: "Đi học về cất cặp",
        feedback: "Quá giỏi! Đi học về Nấm tự cất cặp và xếp quần áo gọn gàng nhé!",
        hint: "Nấm nhìn Khổ 3 nhé: Quần áo xếp gọn gàng / Đi học về cất cặp!",
      },
    ],
  },
  {
    id: "lv2-me-va-co",
    level: 2,
    topic: "Thơ dài 3 khổ · Trần Quốc Toàn",
    title: "Thơ: Mẹ Và Cô",
    icon: "👩‍🏫",
    heroImage: "/assets/english/items/act_09_sing.png",
    color: "#8E44AD",
    slides: [
      [
        "Buổi sáng bé chào mẹ",
        "Chạy đến ôm cổ cô",
        "Buổi chiều bé chào cô",
        "Rồi sà vào lòng mẹ",
      ],
      [
        "Ở trường cô dạy hát",
        "Cô dắt tay tập tô",
        "Về nhà mẹ nấu cơm",
        "Mẹ ru con ngủ kỹ",
      ],
      [
        "Mặt trời mọc rồi lặn",
        "Trên đôi chân lon ton",
        "Hai chân trời của con",
        "Là mẹ và cô giáo",
      ],
    ],
    comprehensionQuestion: {
      id: "me-co-q1",
      type: "comprehension",
      badgeLabel: "Câu 1/3 · Hiểu nội dung",
      question: "Buổi sáng khi chào mẹ đến lớp, bé đã làm gì với cô giáo?",
      choices: [
        "Chạy đến ôm cổ cô",
        "Đòi đi về nhà ngủ",
        "Quên không chào cô",
      ],
      correctIndex: 0,
      evidenceSlideIndex: 0,
      evidenceLineIndex: 1,
      evidenceWord: "Chạy đến ôm cổ cô",
      feedback: "Đúng rồi! Buổi sáng bé chào mẹ, chạy đến ôm cổ cô!",
      hint: "Nấm nhìn dòng thứ 2 ở Khổ 1 nhé: Chạy đến ôm cổ cô!",
    },
    questions: [
      {
        id: "me-co-q1",
        type: "comprehension",
        badgeLabel: "Câu 1/3 · Hiểu nội dung",
        question: "Buổi sáng khi chào mẹ đến lớp, bé đã làm gì với cô giáo?",
        choices: [
          "Chạy đến ôm cổ cô",
          "Đòi đi về nhà ngủ",
          "Quên không chào cô",
        ],
        correctIndex: 0,
        evidenceSlideIndex: 0,
        evidenceLineIndex: 1,
        evidenceWord: "Chạy đến ôm cổ cô",
        feedback: "Đúng rồi! Buổi sáng bé chào mẹ, chạy đến ôm cổ cô!",
        hint: "Nấm nhìn dòng thứ 2 ở Khổ 1 nhé: Chạy đến ôm cổ cô!",
      },
      {
        id: "me-co-q2",
        type: "fill_blank",
        badgeLabel: "Câu 2/3 · Điền từ thơ",
        question: "Nấm chọn từ đúng để hoàn thành câu thơ cuối bài ở Khổ 3 nhé:",
        blankLinePreview: "Hai chân trời của con / Là [ ___ ]",
        choices: ["mẹ và cô giáo", "trăng và sao", "bánh và kẹo"],
        correctIndex: 0,
        evidenceSlideIndex: 2,
        evidenceLineIndex: 3,
        evidenceWord: "Là mẹ và cô giáo",
        feedback: "Chính xác! Hai chân trời của con là mẹ và cô giáo!",
        hint: "Nấm nhìn dòng cuối cùng của Khổ 3 nhé: Là mẹ và cô giáo!",
      },
      {
        id: "me-co-q3",
        type: "life_skill",
        badgeLabel: "Câu 3/3 · Bài học của Nấm",
        question: "Ở trường cô dạy Nấm học bài, còn về nhà mẹ chăm Nấm thế nào?",
        choices: [
          "Mẹ nấu cơm ngon và ru con ngủ kỹ",
          "Mẹ bỏ đi chơi xa",
          "Mẹ không nấu cơm",
        ],
        correctIndex: 0,
        evidenceSlideIndex: 1,
        evidenceLineIndex: 2,
        evidenceWord: "Về nhà mẹ nấu cơm",
        feedback: "Hoan hô Nấm! Cả mẹ và cô đều rất yêu thương, chăm sóc cho con!",
        hint: "Ở Khổ 2 có câu: Về nhà mẹ nấu cơm / Mẹ ru con ngủ kỹ!",
      },
    ],
  },
  {
    id: "lv2-trang-sang",
    level: 2,
    topic: "Thơ dài 3 khổ · Nhược Thủy",
    title: "Thơ: Trăng Sáng",
    icon: "🌕",
    heroImage: "/assets/english/items/toy_04_star.png",
    color: "#F39C12",
    slides: [
      [
        "Sân nhà em sáng quá",
        "Nhờ ánh trăng sáng ngời",
        "Trăng tròn như cái đĩa",
        "Lơ lửng mà không rơi",
      ],
      [
        "Những hôm nào trăng khuyết",
        "Trông giống con thuyền trôi",
        "Em đi trăng theo bước",
        "Như muốn cùng đi chơi",
      ],
      [
        "Gió mát thổi ngoài hiên",
        "Ông trăng cười hiền hậu",
        "Soi sáng khắp sân nhà",
        "Cho bé ngồi nghe chuyện",
      ],
    ],
    comprehensionQuestion: {
      id: "trang-sang-q1",
      type: "comprehension",
      badgeLabel: "Câu 1/3 · Hiểu nội dung",
      question: "Ở Khổ 1, khi ông trăng tròn thì trông giống đồ vật gì nhỉ?",
      choices: ["Như cái đĩa", "Như cái ghế", "Như đôi giày"],
      correctIndex: 0,
      evidenceSlideIndex: 0,
      evidenceLineIndex: 2,
      evidenceWord: "Trăng tròn như cái đĩa",
      feedback: "Giỏi lắm! Trăng tròn như cái đĩa, lơ lửng mà không rơi!",
      hint: "Nấm nhìn dòng thứ 3 của Khổ 1 nhé: Trăng tròn như cái đĩa!",
    },
    questions: [
      {
        id: "trang-sang-q1",
        type: "comprehension",
        badgeLabel: "Câu 1/3 · Hiểu nội dung",
        question: "Ở Khổ 1, khi ông trăng tròn thì trông giống đồ vật gì nhỉ?",
        choices: ["Như cái đĩa", "Như cái ghế", "Như đôi giày"],
        correctIndex: 0,
        evidenceSlideIndex: 0,
        evidenceLineIndex: 2,
        evidenceWord: "Trăng tròn như cái đĩa",
        feedback: "Giỏi lắm! Trăng tròn như cái đĩa, lơ lửng mà không rơi!",
        hint: "Nấm nhìn dòng thứ 3 của Khổ 1 nhé: Trăng tròn như cái đĩa!",
      },
      {
        id: "trang-sang-q2",
        type: "fill_blank",
        badgeLabel: "Câu 2/3 · Điền từ thơ",
        question: "Còn những hôm trăng khuyết ở Khổ 2 thì trông giống gì hả Nấm?",
        blankLinePreview: "Những hôm nào trăng khuyết / Trông giống [ ___ ]",
        choices: ["con thuyền trôi", "quả dưa hấu", "chiếc xe đạp"],
        correctIndex: 0,
        evidenceSlideIndex: 1,
        evidenceLineIndex: 1,
        evidenceWord: "Trông giống con thuyền trôi",
        feedback: "Chuẩn luôn! Những hôm nào trăng khuyết, Trông giống con thuyền trôi!",
        hint: "Dòng thứ 2 của Khổ 2 viết: Trông giống con thuyền trôi!",
      },
      {
        id: "trang-sang-q3",
        type: "life_skill",
        badgeLabel: "Câu 3/3 · Bài học của Nấm",
        question: "Ông trăng sáng ngời thường xuất hiện trên bầu trời vào lúc nào?",
        choices: [
          "Vào buổi tối khi trời đêm xuống",
          "Vào giữa trưa nắng gắt",
          "Nằm ở trong tủ lạnh",
        ],
        correctIndex: 0,
        evidenceSlideIndex: 2,
        evidenceLineIndex: 2,
        evidenceWord: "Soi sáng khắp sân nhà",
        feedback: "Hoan hô! Buổi tối ông trăng hiện lên soi sáng khắp sân nhà!",
        hint: "Buổi tối khi trời tối thì ánh trăng mới soi sáng sân nhà đó Nấm!",
      },
    ],
  },
  {
    id: "lv2-lam-anh",
    level: 2,
    topic: "Thơ dài 3 khổ · Phan Thị Thanh Nhàn",
    title: "Thơ: Làm Anh",
    icon: "👦",
    heroImage: "/assets/english/items/toy_01_teddy.png",
    color: "#10AC84",
    slides: [
      [
        "Làm anh khó đấy",
        "Phải đâu chuyện đùa",
        "Với em gái bé",
        "Phải người lớn cơ",
      ],
      [
        "Khi em bé khóc",
        "Anh phải dỗ dành",
        "Nếu em bé ngã",
        "Anh nâng dịu dàng",
      ],
      [
        "Mẹ cho quà bánh",
        "Chia em phần hơn",
        "Có đồ chơi đẹp",
        "Cũng nhường em luôn",
      ],
    ],
    comprehensionQuestion: {
      id: "lam-anh-q1",
      type: "comprehension",
      badgeLabel: "Câu 1/3 · Hiểu nội dung",
      question: "Ở Khổ 2, khi em bé khóc hoặc bị ngã thì người anh phải làm gì?",
      choices: [
        "Dỗ dành và nâng dịu dàng",
        "Trêu cho em khóc to hơn",
        "Bỏ chạy đi chơi một mình",
      ],
      correctIndex: 0,
      evidenceSlideIndex: 1,
      evidenceLineIndex: 1,
      evidenceWord: "Anh phải dỗ dành",
      feedback: "Đúng rồi! Khi em khóc phải dỗ dành, khi em ngã nâng dịu dàng!",
      hint: "Nấm xem lại Khổ 2 nhé: Khi em bé khóc / Anh phải dỗ dành!",
    },
    questions: [
      {
        id: "lam-anh-q1",
        type: "comprehension",
        badgeLabel: "Câu 1/3 · Hiểu nội dung",
        question: "Ở Khổ 2, khi em bé khóc hoặc bị ngã thì người anh phải làm gì?",
        choices: [
          "Dỗ dành và nâng dịu dàng",
          "Trêu cho em khóc to hơn",
          "Bỏ chạy đi chơi một mình",
        ],
        correctIndex: 0,
        evidenceSlideIndex: 1,
        evidenceLineIndex: 1,
        evidenceWord: "Anh phải dỗ dành",
        feedback: "Đúng rồi! Khi em khóc phải dỗ dành, khi em ngã nâng dịu dàng!",
        hint: "Nấm xem lại Khổ 2 nhé: Khi em bé khóc / Anh phải dỗ dành!",
      },
      {
        id: "lam-anh-q2",
        type: "fill_blank",
        badgeLabel: "Câu 2/3 · Điền từ thơ",
        question: "Ở Khổ 3, khi có đồ chơi đẹp thì người anh làm gì? Nấm điền từ nhé:",
        blankLinePreview: "Có đồ chơi đẹp / Cũng [ ___ ] em luôn",
        choices: ["nhường", "giấu", "tranh"],
        correctIndex: 0,
        evidenceSlideIndex: 2,
        evidenceLineIndex: 3,
        evidenceWord: "Cũng nhường em luôn",
        feedback: "Tuyệt vời! Có đồ chơi đẹp, Cũng nhường em luôn!",
        hint: "Dòng cuối của Khổ 3 viết: Cũng nhường em luôn!",
      },
      {
        id: "lam-anh-q3",
        type: "life_skill",
        badgeLabel: "Câu 3/3 · Bài học của Nấm",
        question: "Khi ở nhà có quà bánh ngon hoặc đồ chơi đẹp, Nấm sẽ làm gì?",
        choices: [
          "Biết chia sẻ và nhường nhịn mọi người",
          "Giữ hết một mình không cho ai",
          "Giận dỗi ném đồ chơi",
        ],
        correctIndex: 0,
        evidenceSlideIndex: 2,
        evidenceLineIndex: 1,
        evidenceWord: "Chia em phần hơn",
        feedback: "Nấm ngoan quá! Biết chia sẻ quà bánh và đồ chơi là người lớn đáng yêu!",
        hint: "Khổ 3 dạy mình: Mẹ cho quà bánh / Chia em phần hơn!",
      },
    ],
  },
  {
    id: "lv2-meo-con-di-hoc",
    level: 2,
    topic: "Thơ dài 3 khổ · Phan Thị Vàng Anh",
    title: "Thơ: Mèo Con Đi Học",
    icon: "🐱",
    heroImage: "/assets/english/items/animal_05_cat.png",
    color: "#FF6B81",
    slides: [
      [
        "Hôm nay trời nắng",
        "Mèo con buồn phiền",
        "Mai phải đến trường",
        "Bèn kiếm cớ luôn:",
      ],
      [
        "Cái đuôi tôi ốm",
        "Nằm kêu meo meo",
        "Chẳng đi học được",
        "Muốn nằm ngủ khoèo!",
      ],
      [
        "Cừu mới be toáng:",
        "Tôi sẽ chữa lành",
        "Cắt đuôi khỏi hết!",
        "Tôi đi học thôi!",
      ],
    ],
    comprehensionQuestion: {
      id: "meo-hoc-q1",
      type: "comprehension",
      badgeLabel: "Câu 1/3 · Hiểu nội dung",
      question: "Để trốn đi học, bạn Mèo con đã giả vờ cái gì bị ốm nhỉ?",
      choices: ["Cái đuôi bị ốm", "Cái tai bị ốm", "Cái chân bị ốm"],
      correctIndex: 0,
      evidenceSlideIndex: 1,
      evidenceLineIndex: 0,
      evidenceWord: "Cái đuôi tôi ốm",
      feedback: "Đúng rồi! Mèo con kiếm cớ: Cái đuôi tôi ốm!",
      hint: "Dòng đầu tiên của Khổ 2 viết: Cái đuôi tôi ốm!",
    },
    questions: [
      {
        id: "meo-hoc-q1",
        type: "comprehension",
        badgeLabel: "Câu 1/3 · Hiểu nội dung",
        question: "Để trốn đi học, bạn Mèo con đã giả vờ cái gì bị ốm nhỉ?",
        choices: ["Cái đuôi bị ốm", "Cái tai bị ốm", "Cái chân bị ốm"],
        correctIndex: 0,
        evidenceSlideIndex: 1,
        evidenceLineIndex: 0,
        evidenceWord: "Cái đuôi tôi ốm",
        feedback: "Đúng rồi! Mèo con kiếm cớ: Cái đuôi tôi ốm!",
        hint: "Dòng đầu tiên của Khổ 2 viết: Cái đuôi tôi ốm!",
      },
      {
        id: "meo-hoc-q2",
        type: "fill_blank",
        badgeLabel: "Câu 2/3 · Điền từ thơ",
        question: "Nghe bạn Cừu đòi cắt đuôi, Mèo con sợ quá liền nói gì ở cuối bài?",
        blankLinePreview: "Cắt đuôi khỏi hết! / Tôi [ ___ ] thôi!",
        choices: ["đi học", "đi ngủ", "đi trốn"],
        correctIndex: 0,
        evidenceSlideIndex: 2,
        evidenceLineIndex: 3,
        evidenceWord: "Tôi đi học thôi!",
        feedback: "Haha chuẩn luôn! Sợ mất đuôi nên Mèo con vội nói: Tôi đi học thôi!",
        hint: "Dòng cuối cùng của Khổ 3 đấy Nấm: Tôi đi học thôi!",
      },
      {
        id: "meo-hoc-q3",
        type: "life_skill",
        badgeLabel: "Câu 3/3 · Bài học của Nấm",
        question: "Mỗi sáng đến giờ học bài, Nấm sẽ làm thế nào để giỏi hơn Mèo con?",
        choices: [
          "Vui vẻ ngồi vào bàn học chăm ngoan",
          "Giả vờ đau bụng để ngủ nướng",
          "Khóc nhè không chịu học",
        ],
        correctIndex: 0,
        evidenceSlideIndex: 2,
        evidenceLineIndex: 3,
        evidenceWord: "Tôi đi học thôi!",
        feedback: "Hoan hô Nấm chăm ngoan! Con học bài vui vẻ và tập trung hết cả 3 câu hỏi rồi!",
        hint: "Đi học rất vui, mình chăm chỉ học bài chứ không kiếm cớ nghỉ học như Mèo con nhé!",
      },
    ],
  },
];

export interface PoemDifficultWord {
  word: string;
  tip: string;
}

export const DIFFICULT_WORDS_BY_POEM: Record<string, PoemDifficultWord[][]> = {
  "lv1-bap-cai-xanh": [
    [
      { word: "man mát", tip: "Mát dịu, sờ vào thấy mát lành dễ chịu" },
      { word: "lá cải sắp", tip: "Các tàu lá xếp ôm sát vào nhau" },
    ],
    [
      { word: "vòng tròn", tip: "Xếp tròn quanh tâm như hình tròn" },
      { word: "búp cải non", tip: "Phần lá non mềm nằm ở chính giữa" },
    ],
  ],
  "lv1-cu-ca-rot": [
    [
      { word: "lớn nhỏ", tip: "Củ to và củ bé đứng cạnh nhau" },
      { word: "bên nhau", tip: "Mọc sát gần nhau trên luống rau" },
    ],
    [
      { word: "đất đội", tip: "Củ cà rốt lớn lên đẩy lớp đất nhô lên" },
      { word: "ngập đầu", tip: "Nằm sâu kín dưới mặt đất" },
    ],
  ],
  "lv1-chau-chao-ong": [
    [
      { word: "nhỏ xíu", tip: "Rất bé nhỏ, xinh xắn" },
      { word: "dễ thương", tip: "Đáng yêu, ai nhìn cũng quý" },
    ],
    [
      { word: "gật đầu", tip: "Cúi đầu nhẹ khen ngợi và đồng ý" },
      { word: "lễ phép", tip: "Ngoan ngoãn, biết thưa gửi chào hỏi người lớn" },
    ],
  ],
  "lv1-ke-cho-be-nghe": [
    [
      { word: "ầm ĩ", tip: "Kêu to tiếng, ồn ào khắp sân" },
      { word: "chó vện", tip: "Chú chó có bộ lông vằn vện" },
    ],
    [
      { word: "chăng dây", tip: "Giăng sợi tơ dài nối từ cành này sang cành kia" },
      { word: "cối xay lúa", tip: "Đồ vật quay tròn để xay hạt thóc thành gạo" },
    ],
  ],
  "lv1-xe-chua-chay": [
    [
      { word: "chứa nước đầy", tip: "Mang thật nhiều nước ở trong bồn xe" },
      { word: "hét vang", tip: "Tiếng còi hú vang to trên đường phố" },
    ],
    [
      { word: "bốc lửa", tip: "Đám cháy có ngọn lửa bùng lên" },
      { word: "dập liền tay", tip: "Phun nước tắt lửa ngay lập tức" },
    ],
  ],
  "lv2-co-day": [
    [
      { word: "giữ sạch", tip: "Rửa tay sạch sẽ, không để dính bẩn" },
      { word: "dây bẩn", tip: "Làm vết bẩn lem sang sách và quần áo" },
    ],
    [
      { word: "cãi nhau", tip: "Tranh giành, nói to tiếng với bạn" },
      { word: "điều hay", tip: "Lời nói ngoan ngoãn, lịch sự, yêu thương" },
    ],
    [
      { word: "gọn gàng", tip: "Xếp ngăn nắp, ngay ngắn đúng chỗ" },
      { word: "nhẹ nhàng", tip: "Việc vừa sức mà bé có thể phụ giúp mẹ" },
    ],
  ],
  "lv2-me-va-co": [
    [
      { word: "ôm cổ cô", tip: "Vòng tay ôm cô giáo thật tình cảm" },
      { word: "sà vào lòng", tip: "Chạy ùa vào vòng tay ấm áp của mẹ" },
    ],
    [
      { word: "tập tô", tip: "Cầm bút tô màu, tô chữ cùng cô giáo" },
      { word: "ngủ kỹ", tip: "Ngủ ngon giấc, sâu giấc" },
    ],
    [
      { word: "lon ton", tip: "Dáng bước chân nhỏ nhắn chạy vui vẻ" },
      { word: "chân trời", tip: "Nơi rộng lớn đầy yêu thương che chở cho con" },
    ],
  ],
  "lv2-trang-sang": [
    [
      { word: "sáng ngời", tip: "Tỏa ánh sáng trong trẻo, rực rỡ" },
      { word: "lơ lửng", tip: "Treo nhẹ nhàng trên bầu trời cao" },
    ],
    [
      { word: "trăng khuyết", tip: "Ông trăng cong cong như chiếc thuyền" },
      { word: "thuyền trôi", tip: "Con thuyền lướt nhẹ trên mặt nước" },
    ],
    [
      { word: "ngoài hiên", tip: "Khoảng sân nhỏ ngay trước cửa nhà" },
      { word: "hiền hậu", tip: "Dịu dàng, ấm áp và tốt bụng" },
    ],
  ],
  "lv2-lam-anh": [
    [
      { word: "chuyện đùa", tip: "Việc dễ dàng làm chơi (làm anh cần nghiêm túc hơn)" },
      { word: "người lớn", tip: "Biết suy nghĩ, chững chạc và thương em" },
    ],
    [
      { word: "dỗ dành", tip: "Vỗ về nhẹ nhàng cho em nín khóc" },
      { word: "dịu dàng", tip: "Nhẹ tay, ân cần đỡ em dậy" },
    ],
    [
      { word: "phần hơn", tip: "Nhường phần nhiều hơn, ngon hơn cho em" },
      { word: "nhường em", tip: "Chia sẻ cho em chơi trước mà không tranh giành" },
    ],
  ],
  "lv2-meo-con-di-hoc": [
    [
      { word: "buồn phiền", tip: "Mặt ỉu xìu, lo lắng không vui" },
      { word: "kiếm cớ", tip: "Bịa ra lý do giả vờ để trốn việc" },
    ],
    [
      { word: "cái đuôi", tip: "Chiếc đuôi dài phía sau của bạn Mèo" },
      { word: "ngủ khoèo", tip: "Nằm co chân ngủ nướng suốt ngày" },
    ],
    [
      { word: "be toáng", tip: "Bạn Cừu kêu be be thật to lên" },
      { word: "chữa lành", tip: "Làm cho hết đau, khỏi ốm" },
    ],
  ],
};

export function getDifficultWordsForSlide(
  poemId: string,
  slideIdx: number,
): PoemDifficultWord[] {
  return DIFFICULT_WORDS_BY_POEM[poemId]?.[slideIdx] || [];
}

export interface PictureWordCard {
  id: string;
  assetId?: string;
  word: string;
  syllables: string[];
  englishName: string;
  pronunciationIpa?: string;
  icon: string;
  imageUrl: string;
  spokenTip: string;
  activityLabelVi?: string;
  colorLabelVi?: string;
}

export interface PictureWordFlashcardSet {
  id: string;
  title: string;
  topic: string;
  icon: string;
  heroImage: string;
  color: string;
  cards: PictureWordCard[];
  cardPool: PictureWordCard[];
}

function cardFromAssetMetadata(
  asset: SharedAssetMetadata,
  overrideWord?: string,
  overrideTip?: string,
): PictureWordCard {
  const word = (overrideWord || asset.readingWordVi).toUpperCase();
  return {
    id: `w-${asset.id}`,
    assetId: asset.id,
    word,
    syllables: word.split(/\s+/).filter(Boolean),
    englishName: asset.englishName,
    pronunciationIpa: asset.pronunciationIpa,
    icon: asset.icon,
    imageUrl: asset.imageUrl,
    spokenTip:
      overrideTip ||
      `${word}. ${asset.name}. ${asset.activityLabelVi}!`,
    activityLabelVi: asset.activityLabelVi,
    colorLabelVi: asset.colorLabelVi,
  };
}

function cardFromSharedAsset(
  assetId: string,
  overrideWord?: string,
  overrideTip?: string,
): PictureWordCard {
  const asset = getSharedAssetById(assetId);
  if (!asset) {
    throw new Error(`Missing shared asset: ${assetId}`);
  }
  return cardFromAssetMetadata(asset, overrideWord, overrideTip);
}

function buildUniqueWordPool(cards: PictureWordCard[]): PictureWordCard[] {
  const seenWords = new Set<string>();
  const unique: PictureWordCard[] = [];
  for (const c of cards) {
    const key = c.word.trim().toUpperCase();
    if (!seenWords.has(key)) {
      seenWords.add(key);
      unique.push(c);
    }
  }
  return unique;
}

const FRUITS_POOL = buildUniqueWordPool([
  cardFromSharedAsset("fruit-strawberry", "QUẢ DÂU"),
  cardFromSharedAsset("fruit-apple", "QUẢ TÁO"),
  cardFromSharedAsset("fruit-banana", "QUẢ CHUỐI"),
  cardFromSharedAsset("fruit-orange", "QUẢ CAM"),
  cardFromSharedAsset("fruit-watermelon", "DƯA HẤU"),
  ...querySharedAssets({ themeGroup: "fruits" }).map((a) =>
    cardFromAssetMetadata(a),
  ),
]);

const KITCHEN_POOL = buildUniqueWordPool([
  cardFromSharedAsset("ls-cutting-board", "THỚT GỖ"),
  cardFromSharedAsset("ls-frying-pan", "CHẢO TRỨNG"),
  cardFromSharedAsset("ls-cooking-pot", "CÁI NỒI"),
  cardFromSharedAsset("ls-rice-bowl", "BÁT CƠM"),
  cardFromSharedAsset("ls-ramen-bowl", "TÔ MÌ"),
  ...querySharedAssets({ themeGroup: "lifeskills" }).map((a) =>
    cardFromAssetMetadata(a),
  ),
]);

const SWEETS_POOL = buildUniqueWordPool(
  querySharedAssets({ themeGroup: "sweets" }).map((a) =>
    cardFromAssetMetadata(a),
  ),
);

const HOME_POOL = buildUniqueWordPool(
  querySharedAssets({ themeGroup: "home" }).map((a) =>
    cardFromAssetMetadata(a),
  ),
);

const SCHOOL_POOL = buildUniqueWordPool(
  querySharedAssets({ themeGroup: "school" }).map((a) =>
    cardFromAssetMetadata(a),
  ),
);

const ANIMAL_EXTRA_CARDS: PictureWordCard[] = [
  {
    id: "w-con-meo",
    word: "CON MÈO",
    syllables: ["CON", "MÈO"],
    englishName: "Cat",
    pronunciationIpa: "/kæt/",
    icon: "🐱",
    imageUrl: "/assets/english/items/animal_05_cat.png",
    spokenTip: "Con mèo. Con mèo kêu meo meo!",
  },
  {
    id: "w-con-cho",
    word: "CON CHÓ",
    syllables: ["CON", "CHÓ"],
    englishName: "Dog",
    pronunciationIpa: "/dɔːɡ/",
    icon: "🐶",
    imageUrl: "/assets/english/items/animal_06_dog.png",
    spokenTip: "Con chó. Con chó vẫy đuôi mừng!",
  },
  {
    id: "w-con-tho",
    word: "CON THỎ",
    syllables: ["CON", "THỎ"],
    englishName: "Rabbit",
    pronunciationIpa: "/ˈræb.ɪt/",
    icon: "🐰",
    imageUrl: "/assets/english/items/animal_07_rabbit.png",
    spokenTip: "Con thỏ. Bạn thỏ trắng nhảy thật cao!",
  },
  {
    id: "w-con-vit",
    word: "CON VỊT",
    syllables: ["CON", "VỊT"],
    englishName: "Duck",
    pronunciationIpa: "/dʌk/",
    icon: "🦆",
    imageUrl: "/assets/english/items/animal_08_duck.png",
    spokenTip: "Con vịt. Con vịt bầu bơi dưới ao!",
  },
];

const VEHICLES_AND_ANIMALS_POOL = buildUniqueWordPool([
  cardFromSharedAsset("vehicle-redcar", "Ô TÔ"),
  cardFromSharedAsset("vehicle-airplane", "MÁY BAY"),
  cardFromSharedAsset("vehicle-train", "TÀU HỎA"),
  ...ANIMAL_EXTRA_CARDS,
  ...querySharedAssets({ themeGroup: "vehicles" }).map((a) =>
    cardFromAssetMetadata(a),
  ),
]);

export const PICTURE_WORD_FLASHCARD_SETS: PictureWordFlashcardSet[] = [
  {
    id: "fc-fruits",
    title: "Thẻ Từ: Quả Ngọt Tươi Mát",
    topic: `5 Thẻ Chữ · Kho ${FRUITS_POOL.length} Quả 3D`,
    icon: "🍓",
    heroImage: "/assets/items/fruits/fruit_01.png",
    color: "#ff4757",
    cards: FRUITS_POOL.slice(0, 5),
    cardPool: FRUITS_POOL,
  },
  {
    id: "fc-kitchen",
    title: "Thẻ Từ: Đầu Bếp Nhí & Nấu Ăn",
    topic: `5 Thẻ Chữ · Kho ${KITCHEN_POOL.length} Đồ Bếp 3D`,
    icon: "🍳",
    heroImage: "/assets/items/lifeskills/lifeskills_07.png",
    color: "#f97316",
    cards: KITCHEN_POOL.slice(0, 5),
    cardPool: KITCHEN_POOL,
  },
  {
    id: "fc-sweets",
    title: "Thẻ Từ: Tiệm Bánh Ngọt Ngào",
    topic: `5 Thẻ Chữ · Kho ${SWEETS_POOL.length} Bánh & Kem 3D`,
    icon: "🧁",
    heroImage: "/assets/items/sweets/sweet_07.png",
    color: "#ec4899",
    cards: SWEETS_POOL.slice(0, 5),
    cardPool: SWEETS_POOL,
  },
  {
    id: "fc-home",
    title: "Thẻ Từ: Đồ Dùng Gia Đình",
    topic: `5 Thẻ Chữ · Kho ${HOME_POOL.length} Đồ Nhà 3D`,
    icon: "🏠",
    heroImage: "/assets/items/home/home_05.png",
    color: "#eab308",
    cards: HOME_POOL.slice(0, 5),
    cardPool: HOME_POOL,
  },
  {
    id: "fc-school",
    title: "Thẻ Từ: Bé Vui Đến Trường",
    topic: `5 Thẻ Chữ · Kho ${SCHOOL_POOL.length} Đồ Học Tập 3D`,
    icon: "🎒",
    heroImage: "/assets/items/school/school_01.png",
    color: "#2ed573",
    cards: SCHOOL_POOL.slice(0, 5),
    cardPool: SCHOOL_POOL,
  },
  {
    id: "fc-vehicles",
    title: "Thẻ Từ: Xe Cộ & Bạn Thú",
    topic: `5 Thẻ Chữ · Kho ${VEHICLES_AND_ANIMALS_POOL.length} Xe & Thú 3D`,
    icon: "🚗",
    heroImage: "/assets/items/vehicles/vehicle_01.png",
    color: "#1e90ff",
    cards: VEHICLES_AND_ANIMALS_POOL.slice(0, 5),
    cardPool: VEHICLES_AND_ANIMALS_POOL,
  },
];

function randomShuffle<T>(items: readonly T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Rút ngẫu nhiên `count` (mặc định 5) thẻ chữ khác nhau từ kho `cardPool` của chủ đề,
 * ưu tiên các ảnh chưa xuất hiện ở lượt trước (`excludeCardIds`) để mỗi lần vào là nội dung mới.
 */
export function drawRandomFlashcardsForSet(
  setId: string,
  count = 5,
  excludeCardIds: string[] = [],
): PictureWordCard[] {
  const foundSet =
    PICTURE_WORD_FLASHCARD_SETS.find((s) => s.id === setId) ||
    PICTURE_WORD_FLASHCARD_SETS[0];
  const pool = foundSet.cardPool;
  const excludeSet = new Set(excludeCardIds);

  const freshCandidates = randomShuffle(
    pool.filter((c) => !excludeSet.has(c.id)),
  );
  const fallbackCandidates = randomShuffle(
    pool.filter((c) => excludeSet.has(c.id)),
  );

  const combined = [...freshCandidates, ...fallbackCandidates];
  const result: PictureWordCard[] = [];
  const usedWords = new Set<string>();

  for (const card of combined) {
    if (result.length >= count) break;
    if (!usedWords.has(card.word)) {
      usedWords.add(card.word);
      result.push(card);
    }
  }

  return result;
}


