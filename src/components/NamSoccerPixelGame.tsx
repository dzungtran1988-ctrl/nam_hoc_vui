import { useEffect, useRef, useState } from "react";
import { ArrowLeft, RotateCcw, Volume2 } from "lucide-react";
import { playCardPlaceSound, playRewardTone } from "../lib/sound";

interface RawSoccerQuizQuestion {
  subject: string;
  visual: string;
  question: string;
  options: [string, string, string];
  correct: number;
}

interface ShuffledSoccerOption {
  text: string;
  isCorrect: boolean;
}

interface ActiveSoccerQuiz {
  subject: string;
  visual: string;
  question: string;
  options: ShuffledSoccerOption[];
}

const SOCCER_QUESTION_BANK: RawSoccerQuizQuestion[] = [
  // 1. Toán Học
  {
    subject: "🧮 Toán Học",
    visual: "🍎🍎 + 🍎 = ?",
    question: "2 quả táo thêm 1 quả táo là mấy quả táo?",
    options: ["3 quả táo", "2 quả táo", "5 quả táo"],
    correct: 0,
  },
  {
    subject: "🧮 Toán Học",
    visual: "⚽⚽ + ⚽⚽ = ?",
    question: "2 quả bóng cộng 2 quả bóng bằng mấy?",
    options: ["4 quả bóng", "3 quả bóng", "5 quả bóng"],
    correct: 0,
  },
  {
    subject: "🧮 Toán Học",
    visual: "⭐⭐⭐⭐⭐",
    question: "Đếm xem trên bảng có tất cả mấy ngôi sao vàng?",
    options: ["5 ngôi sao", "4 ngôi sao", "6 ngôi sao"],
    correct: 0,
  },
  {
    subject: "🧮 Toán Học",
    visual: "🍓🍓🍓 - 🍓 = ?",
    question: "Có 3 quả dâu tây, Nấm ăn mất 1 quả thì còn mấy quả?",
    options: ["2 quả dâu", "1 quả dâu", "3 quả dâu"],
    correct: 0,
  },
  {
    subject: "🧮 Toán Học",
    visual: "🐘 Voi  vs  🐁 Chuột",
    question: "Con Voi và con Chuột, con nào to lớn hơn?",
    options: ["🐘 Con Voi", "🐁 Con Chuột", "Bằng nhau"],
    correct: 0,
  },
  {
    subject: "🧮 Toán Học",
    visual: "🔺 Hình có 3 cạnh",
    question: "Hình nào dưới đây có 3 cạnh và 3 góc nhọn?",
    options: ["🔺 Hình tam giác", "⚪ Hình tròn", "🟦 Hình vuông"],
    correct: 0,
  },
  {
    subject: "🧮 Toán Học",
    visual: "🖐️ Một bàn tay",
    question: "Một bàn tay của Nấm có mấy ngón tay?",
    options: ["5 ngón tay", "4 ngón tay", "6 ngón tay"],
    correct: 0,
  },
  {
    subject: "🧮 Toán Học",
    visual: "1, 2, 3, [ ? ], 5",
    question: "Số nào đứng liền sau số 3 và đứng trước số 5?",
    options: ["Số 4", "Số 2", "Số 6"],
    correct: 0,
  },

  // 2. Tiếng Việt
  {
    subject: "📖 Tiếng Việt",
    visual: "🐱 Meo... meo...",
    question: "Con gì kêu 'Meo meo', rất thích bắt chuột?",
    options: ["🐱 Con Mèo", "🐶 Con Chó", "🐷 Con Lợn"],
    correct: 0,
  },
  {
    subject: "📖 Tiếng Việt",
    visual: "🐟 Chữ cái đầu của 'CÁ'",
    question: "Từ 'CON CÁ' bắt đầu bằng chữ cái nào?",
    options: ["Chữ C", "Chữ B", "Chữ M"],
    correct: 0,
  },
  {
    subject: "📖 Tiếng Việt",
    visual: "👵 B - À",
    question: "Đánh vần 'Bờ - A - Ba - Huyền - ...' đọc là gì?",
    options: ["👵 Bà", "👩 Mẹ", "👨 Bố"],
    correct: 0,
  },
  {
    subject: "📖 Tiếng Việt",
    visual: "🌸 Hoa mùa xuân",
    question: "Đâu là tên một loài hoa đẹp thường nở vào dịp Tết?",
    options: ["🌸 Hoa Đào", "🥕 Củ Cà Rốt", "🥒 Dưa Chuột"],
    correct: 0,
  },
  {
    subject: "📖 Tiếng Việt",
    visual: "🐓 Ò... ó... o...",
    question: "Con vật nào gáy 'Ò ó o' gọi mặt trời dậy mỗi sáng?",
    options: ["🐓 Gà Trống", "🦆 Con Vịt", "🐦 Chim Sẻ"],
    correct: 0,
  },
  {
    subject: "📖 Tiếng Việt",
    visual: "🌕 Tròn như...",
    question: "Câu thơ: 'Trăng tròn như quả ...' điền từ gì cho đúng?",
    options: ["⚽ Quả bóng", "📏 Cái thước", "📚 Quyển sách"],
    correct: 0,
  },
  {
    subject: "📖 Tiếng Việt",
    visual: "🐝 Chăm chỉ hút mật",
    question: "Con gì chăm chỉ bay đi tìm hoa làm mật ngọt?",
    options: ["🐝 Con Ong", "🐢 Con Rùa", "🦀 Con Cua"],
    correct: 0,
  },

  // 3. Tiếng Anh
  {
    subject: "🔤 Tiếng Anh",
    visual: "🍎 APPLE",
    question: "Trong Tiếng Anh, quả 'APPLE' là quả gì?",
    options: ["🍎 Quả Táo", "🍌 Quả Chuối", "🍊 Quả Cam"],
    correct: 0,
  },
  {
    subject: "🔤 Tiếng Anh",
    visual: "🐶 DOG",
    question: "Từ 'DOG' trong Tiếng Anh nghĩa là con vật nào?",
    options: ["🐶 Con Chó", "🐱 Con Mèo", "🐰 Con Thỏ"],
    correct: 0,
  },
  {
    subject: "🔤 Tiếng Anh",
    visual: "🔴 RED",
    question: "Màu 'RED' trên áo đấu của Nấm là màu gì?",
    options: ["🔴 Màu Đỏ", "🔵 Màu Xanh", "🟡 Màu Vàng"],
    correct: 0,
  },
  {
    subject: "🔤 Tiếng Anh",
    visual: "☀️ Good Morning!",
    question: "Khi gặp cô giáo buổi sáng, bé chào 'Good Morning' nghĩa là gì?",
    options: ["☀️ Chào buổi sáng", "🌙 Chúc ngủ ngon", "🙏 Cảm ơn"],
    correct: 0,
  },
  {
    subject: "🔤 Tiếng Anh",
    visual: "1️⃣ ONE - 2️⃣ TWO - 3️⃣ THREE",
    question: "Trong Tiếng Anh, 'THREE' là số mấy?",
    options: ["3️⃣ Số 3", "1️⃣ Số 1", "5️⃣ Số 5"],
    correct: 0,
  },
  {
    subject: "🔤 Tiếng Anh",
    visual: "🍌 BANANA",
    question: "Chú khỉ rất thích ăn 'BANANA', đó là quả gì?",
    options: ["🍌 Quả Chuối", "🍉 Dưa Hấu", "🍇 Chùm Nho"],
    correct: 0,
  },

  // 4. Kỹ Năng Sống
  {
    subject: "🚦 Kỹ Năng Sống",
    visual: "🛑 ĐÈN GIAO THÔNG ĐỎ",
    question: "Khi đi đường gặp Đèn Giao Thông màu ĐỎ, chúng mình phải làm gì?",
    options: ["🛑 Dừng lại ngay", "🏃 Chạy thật nhanh", "💃 Nhảy múa"],
    correct: 0,
  },
  {
    subject: "🚦 Kỹ Năng Sống",
    visual: "🧼🤲 Trước khi ăn cơm",
    question: "Trước khi ăn cơm, Nấm cần làm gì để bụng luôn khỏe mạnh?",
    options: ["🧼 Rửa tay sạch", "🎮 Chơi điện tử", "👟 Đi giày vào"],
    correct: 0,
  },
  {
    subject: "🚦 Kỹ Năng Sống",
    visual: "🎁 Khi được tặng quà",
    question: "Khi ông bà hoặc bố mẹ tặng quà, bé ngoan sẽ nói lời gì?",
    options: ["🙏 Con cảm ơn ạ!", "😠 Không thích đâu", "😶 Im lặng"],
    correct: 0,
  },
  {
    subject: "🚦 Kỹ Năng Sống",
    visual: "🪥🦷 Trước khi đi ngủ",
    question: "Buổi tối trước khi đi ngủ, bé làm gì để răng trắng xinh không bị sâu?",
    options: ["🪥 Đánh răng sạch", "🍬 Ăn nhiều kẹo", "🥤 Uống nước ngọt"],
    correct: 0,
  },
  {
    subject: "🚦 Kỹ Năng Sống",
    visual: "🚒 Xe Cứu Hỏa chữa cháy",
    question: "Số điện thoại khẩn cấp để gọi Xe Cứu Hỏa chữa cháy là số nào?",
    options: ["🚒 Số 114", "🎲 Số 000", "🎈 Số 999"],
    correct: 0,
  },
  {
    subject: "🚦 Kỹ Năng Sống",
    visual: "🧸 Đồ chơi sau khi chơi xong",
    question: "Sau khi chơi đồ chơi xong, bé tự lập sẽ làm gì?",
    options: ["🧺 Cất gọn vào hộp", "💥 Vứt khắp sàn", "🛏️ Ném lên giường"],
    correct: 0,
  },

  // 5. Âm Nhạc & Mỹ Thuật
  {
    subject: "🎨 Âm Nhạc & Mỹ Thuật",
    visual: "🎹 Phím đen & Phím trắng",
    question: "Nhạc cụ nào có hàng phím trắng và phím đen để gõ thành tiếng đàn?",
    options: ["🎹 Đàn Piano", "🥁 Cái Trống", "🎺 Kèn Đồng"],
    correct: 0,
  },
  {
    subject: "🎨 Âm Nhạc & Mỹ Thuật",
    visual: "🔴 Đỏ + 🟡 Vàng = ?",
    question: "Khi pha màu Đỏ với màu Vàng, chúng mình được màu gì?",
    options: ["🟠 Màu Cam", "🟣 Màu Tím", "⚫ Màu Đen"],
    correct: 0,
  },
  {
    subject: "🎨 Âm Nhạc & Mỹ Thuật",
    visual: "🇻🇳 Lá Cờ Tổ Quốc",
    question: "Lá cờ Việt Nam có nền màu Đỏ và ngôi sao ở giữa màu gì?",
    options: ["⭐ Màu Vàng", "🔵 Màu Xanh", "⚪ Màu Trắng"],
    correct: 0,
  },

  // 6. Tự Nhiên & Khám Phá
  {
    subject: "🌿 Tự Nhiên & Khám Phá",
    visual: "🥕 Món ăn yêu thích",
    question: "Bạn Thỏ trắng tai dài thích ăn củ gì nhất?",
    options: ["🥕 Củ Cà Rốt", "🦴 Cục Xương", "🌶️ Quả Ớt Cay"],
    correct: 0,
  },
  {
    subject: "🌿 Tự Nhiên & Khám Phá",
    visual: "✈️ Bay trên bầu trời",
    question: "Phương tiện nào có hai cánh lớn bay vút trên bầu trời qua những đám mây?",
    options: ["✈️ Máy Bay", "🚢 Tàu Thủy", "🚲 Xe Đạp"],
    correct: 0,
  },
  {
    subject: "🌿 Tự Nhiên & Khám Phá",
    visual: "🌈 Sau cơn mưa rào",
    question: "Sau cơn mưa và có nắng lên, dải 7 sắc màu rực rỡ trên bầu trời gọi là gì?",
    options: ["🌈 Cầu Vồng", "❄️ Bông Tuyết", "🌪️ Cơn Gió"],
    correct: 0,
  },
];

const C = {
  out: "#2A1610",
  hairDark: "#472617",
  hairMid: "#683B24",
  hairLight: "#8E5436",
  hairSpec: "#B57653",
  skin: "#FFE5CF",
  skinShade: "#F5C4A1",
  blush: "#FF8FB3",
  glassRim: "#18181B",
  lensBg: "#EBF8FF",
  eyeWhite: "#FFFFFF",
  redMain: "#E63946",
  redShade: "#B91C1C",
  goldStar: "#FFD166",
  goldCore: "#F59E0B",
  white: "#FFFFFF",
  pochaccoBlue: "#38BDF8",
  gloveYellow: "#FACC15",
};

function px(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string,
) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawRoundLens(
  ctx: CanvasRenderingContext2D,
  lx: number,
  ly: number,
  eyeMode: "normal" | "happy",
) {
  px(ctx, lx + 2, ly + 1, 4, 6, C.lensBg);
  px(ctx, lx + 1, ly + 2, 6, 4, C.lensBg);

  if (eyeMode === "happy") {
    px(ctx, lx + 2, ly + 4, 1, 1, C.glassRim);
    px(ctx, lx + 3, ly + 3, 2, 1, C.glassRim);
    px(ctx, lx + 5, ly + 4, 1, 1, C.glassRim);
  } else {
    px(ctx, lx + 3, ly + 3, 2, 3, C.glassRim);
    px(ctx, lx + 3, ly + 3, 1, 1, C.eyeWhite);
    px(ctx, lx + 5, ly + 2, 1, 1, C.eyeWhite);
  }

  px(ctx, lx + 2, ly, 4, 1, C.glassRim);
  px(ctx, lx + 2, ly + 7, 4, 1, C.glassRim);
  px(ctx, lx, ly + 2, 1, 4, C.glassRim);
  px(ctx, lx + 7, ly + 2, 1, 4, C.glassRim);
  px(ctx, lx + 1, ly + 1, 1, 1, C.glassRim);
  px(ctx, lx + 6, ly + 1, 1, 1, C.glassRim);
  px(ctx, lx + 1, ly + 6, 1, 1, C.glassRim);
  px(ctx, lx + 6, ly + 6, 1, 1, C.glassRim);
}

function drawNamChibiHead(
  ctx: CanvasRenderingContext2D,
  ox: number,
  oy: number,
  eyeMode: "normal" | "happy",
) {
  px(ctx, ox + 15, oy + 0, 3, 1, C.out);
  px(ctx, ox + 14, oy + 1, 1, 1, C.out);
  px(ctx, ox + 15, oy + 1, 2, 1, C.hairLight);
  px(ctx, ox + 17, oy + 1, 1, 1, C.out);

  px(ctx, ox + 10, oy + 2, 12, 1, C.out);
  px(ctx, ox + 8, oy + 3, 16, 1, C.out);
  px(ctx, ox + 7, oy + 4, 18, 1, C.out);
  px(ctx, ox + 6, oy + 5, 20, 3, C.out);
  px(ctx, ox + 5, oy + 8, 22, 6, C.out);
  px(ctx, ox + 6, oy + 14, 20, 5, C.out);
  px(ctx, ox + 7, oy + 19, 18, 2, C.out);
  px(ctx, ox + 9, oy + 21, 14, 1, C.out);

  px(ctx, ox + 4, oy + 14, 2, 3, C.out);
  px(ctx, ox + 5, oy + 14, 1, 2, C.skinShade);
  px(ctx, ox + 26, oy + 14, 2, 3, C.out);
  px(ctx, ox + 26, oy + 14, 1, 2, C.skinShade);

  px(ctx, ox + 7, oy + 10, 18, 9, C.skin);
  px(ctx, ox + 8, oy + 19, 16, 2, C.skin);
  px(ctx, ox + 9, oy + 20, 14, 1, C.skinShade);

  px(ctx, ox + 7, oy + 17, 3, 2, C.blush);
  px(ctx, ox + 22, oy + 17, 3, 2, C.blush);

  px(ctx, ox + 10, oy + 3, 12, 1, C.hairMid);
  px(ctx, ox + 8, oy + 4, 16, 1, C.hairMid);
  px(ctx, ox + 7, oy + 5, 18, 3, C.hairMid);
  px(ctx, ox + 6, oy + 8, 20, 3, C.hairDark);

  px(ctx, ox + 10, oy + 4, 5, 1, C.hairSpec);
  px(ctx, ox + 17, oy + 4, 4, 1, C.hairSpec);
  px(ctx, ox + 9, oy + 5, 6, 1, C.hairLight);
  px(ctx, ox + 17, oy + 5, 5, 1, C.hairLight);

  px(ctx, ox + 6, oy + 11, 2, 3, C.hairDark);
  px(ctx, ox + 24, oy + 11, 2, 3, C.hairDark);
  px(ctx, ox + 8, oy + 9, 4, 2, C.hairMid);
  px(ctx, ox + 13, oy + 9, 5, 2, C.hairMid);
  px(ctx, ox + 19, oy + 9, 5, 2, C.hairMid);
  px(ctx, ox + 10, oy + 11, 2, 1, C.hairDark);
  px(ctx, ox + 15, oy + 11, 2, 1, C.hairDark);
  px(ctx, ox + 20, oy + 11, 2, 1, C.hairDark);

  drawRoundLens(ctx, ox + 7, oy + 11, eyeMode);
  drawRoundLens(ctx, ox + 17, oy + 11, eyeMode);
  px(ctx, ox + 15, oy + 14, 2, 1, C.glassRim);
  px(ctx, ox + 6, oy + 14, 1, 1, C.glassRim);
  px(ctx, ox + 25, oy + 14, 1, 1, C.glassRim);
}

function drawJerseyStar(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
  px(ctx, cx, cy - 2, 2, 5, C.goldStar);
  px(ctx, cx - 2, cy, 6, 1, C.goldStar);
  px(ctx, cx - 1, cy - 1, 4, 3, C.goldStar);
  px(ctx, cx - 1, cy + 2, 1, 1, C.goldStar);
  px(ctx, cx + 2, cy + 2, 1, 1, C.goldStar);
  px(ctx, cx, cy, 2, 1, C.goldCore);
}

function createNamSpriteCanvas(
  poseVariant:
    | "idle_0"
    | "idle_1"
    | "run_0"
    | "run_1"
    | "kick"
    | "celebrate"
    | "trophy_0"
    | "trophy_1",
): HTMLCanvasElement {
  const isTrophy = poseVariant === "trophy_0" || poseVariant === "trophy_1";
  const off = document.createElement("canvas");
  off.width = 32;
  off.height = isTrophy ? 50 : 38;
  const c = off.getContext("2d")!;

  if (poseVariant === "idle_0" || poseVariant === "idle_1") {
    const bob = poseVariant === "idle_1" ? 1 : 0;
    drawNamChibiHead(c, 0, bob, "normal");

    const by = 22 + bob;
    px(c, 8, by, 16, 8, C.out);
    px(c, 6, by + 1, 2, 5, C.out);
    px(c, 24, by + 1, 2, 5, C.out);

    px(c, 9, by, 14, 7, C.redMain);
    px(c, 9, by + 6, 14, 1, C.redShade);
    px(c, 13, by, 6, 1, C.white);
    px(c, 14, by + 1, 4, 1, C.white);

    px(c, 7, by + 1, 2, 3, C.redMain);
    px(c, 7, by + 4, 2, 1, C.white);
    px(c, 6, by + 4, 2, 2, C.skin);
    px(c, 23, by + 1, 2, 3, C.redMain);
    px(c, 23, by + 4, 2, 1, C.white);
    px(c, 24, by + 4, 2, 2, C.skin);

    drawJerseyStar(c, 15, by + 3);

    px(c, 9, by + 8, 14, 4, C.out);
    px(c, 10, by + 8, 5, 3, C.white);
    px(c, 17, by + 8, 5, 3, C.white);
    px(c, 10, by + 8, 1, 3, C.redMain);
    px(c, 21, by + 8, 1, 3, C.redMain);

    px(c, 10, by + 12, 4, 3, C.out);
    px(c, 18, by + 12, 4, 3, C.out);
    px(c, 11, by + 12, 2, 1, C.skin);
    px(c, 19, by + 12, 2, 1, C.skin);
    px(c, 11, by + 13, 2, 1, C.white);
    px(c, 19, by + 13, 2, 1, C.white);

    px(c, 9, 35, 5, 3, C.out);
    px(c, 10, 35, 4, 2, C.redMain);
    px(c, 10, 36, 2, 1, C.white);

    px(c, 18, 35, 5, 3, C.out);
    px(c, 18, 35, 4, 2, C.redMain);
    px(c, 20, 36, 2, 1, C.white);
  } else if (poseVariant === "run_0" || poseVariant === "run_1") {
    const step = poseVariant === "run_0" ? 0 : 1;
    drawNamChibiHead(c, 1, step, "normal");

    const by = 22 + step;
    px(c, 8, by, 16, 8, C.out);
    px(c, 9, by, 14, 7, C.redMain);
    px(c, 13, by, 6, 1, C.white);
    drawJerseyStar(c, 16, by + 3);

    if (step === 0) {
      px(c, 5, by + 1, 4, 3, C.redMain);
      px(c, 4, by + 2, 2, 2, C.skin);
      px(c, 23, by + 2, 4, 3, C.redMain);
      px(c, 26, by + 3, 2, 2, C.skin);
    } else {
      px(c, 6, by + 3, 3, 3, C.redMain);
      px(c, 5, by + 4, 2, 2, C.skin);
      px(c, 23, by + 0, 4, 3, C.redMain);
      px(c, 26, by + 0, 2, 2, C.skin);
    }

    px(c, 9, by + 8, 14, 3, C.out);
    px(c, 10, by + 8, 5, 2, C.white);
    px(c, 17, by + 8, 5, 2, C.white);

    if (step === 0) {
      px(c, 8, 33, 5, 4, C.out);
      px(c, 9, 34, 3, 2, C.redMain);
      px(c, 20, 31, 5, 4, C.out);
      px(c, 21, 32, 3, 2, C.redMain);
    } else {
      px(c, 11, 31, 5, 4, C.out);
      px(c, 12, 32, 3, 2, C.redMain);
      px(c, 18, 33, 5, 4, C.out);
      px(c, 19, 34, 3, 2, C.redMain);
    }
  } else if (poseVariant === "kick") {
    drawNamChibiHead(c, -1, 1, "normal");

    const by = 23;
    px(c, 7, by, 16, 8, C.out);
    px(c, 8, by, 14, 7, C.redMain);
    px(c, 12, by, 6, 1, C.white);
    drawJerseyStar(c, 15, by + 3);

    px(c, 3, by + 1, 5, 3, C.out);
    px(c, 4, by + 1, 4, 2, C.redMain);
    px(c, 2, by + 1, 2, 2, C.skin);

    px(c, 22, by, 6, 3, C.out);
    px(c, 22, by, 4, 2, C.redMain);
    px(c, 26, by, 2, 2, C.skin);

    px(c, 8, 31, 5, 6, C.out);
    px(c, 9, 31, 3, 2, C.white);
    px(c, 9, 33, 3, 1, C.skin);
    px(c, 9, 34, 4, 2, C.redMain);

    px(c, 17, 29, 9, 5, C.out);
    px(c, 17, 30, 4, 3, C.white);
    px(c, 21, 29, 5, 3, C.redMain);
    px(c, 25, 28, 2, 2, C.white);
    px(c, 27, 26, 3, 3, C.goldStar);
    px(c, 28, 27, 2, 2, C.white);
  } else if (poseVariant === "celebrate") {
    drawNamChibiHead(c, 0, 0, "happy");

    const by = 22;
    px(c, 8, by, 16, 8, C.out);
    px(c, 9, by, 14, 7, C.redMain);
    px(c, 13, by, 6, 1, C.white);
    drawJerseyStar(c, 15, by + 3);

    px(c, 4, by - 4, 4, 6, C.out);
    px(c, 5, by - 2, 2, 3, C.redMain);
    px(c, 5, by - 4, 2, 2, C.skin);

    px(c, 24, by - 4, 4, 6, C.out);
    px(c, 25, by - 2, 2, 3, C.redMain);
    px(c, 25, by - 4, 2, 2, C.skin);

    px(c, 9, by + 8, 14, 3, C.out);
    px(c, 10, by + 8, 5, 2, C.white);
    px(c, 17, by + 8, 5, 2, C.white);

    px(c, 7, 32, 5, 4, C.out);
    px(c, 8, 33, 3, 2, C.redMain);

    px(c, 20, 32, 5, 4, C.out);
    px(c, 21, 33, 3, 2, C.redMain);
  } else if (poseVariant === "trophy_0" || poseVariant === "trophy_1") {
    const upStep = poseVariant === "trophy_1" ? 1 : 0;
    const yOff = 12; // Dành 12px phía trên đầu để giơ cao Cúp Vàng không che áo đấu
    drawNamChibiHead(c, 0, yOff, "happy");

    // Áo Đỏ Sao Vàng khoe trọn 100% trước ngực
    const by = 22 + yOff;
    px(c, 8, by, 16, 8, C.out);
    px(c, 9, by, 14, 7, C.redMain);
    px(c, 9, by + 6, 14, 1, C.redShade);
    px(c, 13, by, 6, 1, C.white);
    px(c, 14, by + 1, 4, 1, C.white);
    drawJerseyStar(c, 15, by + 3);

    // Hai cánh tay vươn cao lên trời nâng Cúp Vàng trên đỉnh đầu
    px(c, 5, by - 5 - upStep, 4, 7, C.out);
    px(c, 6, by - 2 - upStep, 2, 3, C.redMain);
    px(c, 6, by - 5 - upStep, 2, 3, C.skin);

    px(c, 23, by - 5 - upStep, 4, 7, C.out);
    px(c, 24, by - 2 - upStep, 2, 3, C.redMain);
    px(c, 24, by - 5 - upStep, 2, 3, C.skin);

    px(c, 9, by + 8, 14, 3, C.out);
    px(c, 10, by + 8, 5, 2, C.white);
    px(c, 17, by + 8, 5, 2, C.white);

    if (upStep === 0) {
      px(c, 7, 32 + yOff, 5, 4, C.out);
      px(c, 8, 33 + yOff, 3, 2, C.redMain);
      px(c, 20, 34 + yOff, 5, 4, C.out);
      px(c, 21, 35 + yOff, 3, 2, C.redMain);
    } else {
      px(c, 7, 34 + yOff, 5, 4, C.out);
      px(c, 8, 35 + yOff, 3, 2, C.redMain);
      px(c, 20, 32 + yOff, 5, 4, C.out);
      px(c, 21, 33 + yOff, 3, 2, C.redMain);
    }

    // Chiếc Cúp Vàng Vô Địch (12x12 pixel) giơ cao rực rỡ trên đỉnh đầu Nấm
    const tx = 10;
    const ty = 1 - upStep;
    px(c, tx + 2, ty, 8, 1, C.out);
    px(c, tx, ty + 1, 12, 5, C.out);
    px(c, tx + 2, ty + 6, 8, 2, C.out);
    px(c, tx + 4, ty + 8, 4, 2, C.out);
    px(c, tx + 2, ty + 10, 8, 2, C.out);

    px(c, tx + 1, ty + 2, 1, 3, "#FACC15");
    px(c, tx + 10, ty + 2, 1, 3, "#FACC15");
    px(c, tx + 3, ty + 1, 6, 5, "#FACC15");
    px(c, tx + 3, ty + 6, 6, 1, "#EAB308");
    px(c, tx + 3, ty + 1, 2, 4, "#FEF08A");
    px(c, tx + 3, ty + 1, 1, 2, "#FFFFFF");
    px(c, tx + 7, ty + 2, 2, 4, "#D97706");
    px(c, tx + 5, ty + 3, 2, 2, "#EF4444");
    px(c, tx + 5, ty + 8, 2, 2, "#FACC15");
    px(c, tx + 3, ty + 10, 6, 1, "#FACC15");
    px(c, tx + 3, ty + 11, 6, 1, "#B45309");
  }

  return off;
}

function createPochaccoSpriteCanvas(mode: "idle" | "dive"): HTMLCanvasElement {
  const off = document.createElement("canvas");
  off.width = 28;
  off.height = 28;
  const c = off.getContext("2d")!;

  const diveShift = mode === "dive" ? 2 : 0;
  px(c, 2, 3 + diveShift, 5, 7, C.out);
  px(c, 21, 3 - diveShift, 5, 7, C.out);
  px(c, 6, 2, 16, 13, C.out);
  px(c, 7, 3, 14, 11, C.white);
  px(c, 9, 8, 2, 2, C.out);
  px(c, 17, 8, 2, 2, C.out);
  px(c, 13, 9, 2, 1, C.out);
  px(c, 7, 10, 2, 2, C.blush);
  px(c, 19, 10, 2, 2, C.blush);

  px(c, 7, 15, 14, 8, C.out);
  px(c, 8, 15, 12, 7, C.pochaccoBlue);
  px(c, 12, 16, 4, 2, C.white);

  px(c, 3, 15 - diveShift, 4, 4, C.out);
  px(c, 4, 16 - diveShift, 2, 2, C.gloveYellow);
  px(c, 21, 15 + diveShift, 4, 4, C.out);
  px(c, 22, 16 + diveShift, 2, 2, C.gloveYellow);

  px(c, 8, 23, 4, 4, C.out);
  px(c, 9, 23, 2, 3, C.white);
  px(c, 16, 23, 4, 4, C.out);
  px(c, 17, 23, 2, 3, C.white);

  return off;
}

const GOAL_ZONES = [
  { id: 0, label: "GÓC TRÁI", targetX: 102, targetY: 50, missX: 50, missY: 40 },
  { id: 1, label: "GIỮA GÔN", targetX: 160, targetY: 46, missX: 160, missY: 14 },
  { id: 2, label: "GÓC PHẢI", targetX: 218, targetY: 50, missX: 270, missY: 40 },
] as const;

const TOTAL_SOCCER_ROUNDS = 5;

let soccerAudioCtx: AudioContext | null = null;
function getSoccerAudioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext;
  if (!AC) return null;
  if (!soccerAudioCtx || soccerAudioCtx.state === "closed") {
    soccerAudioCtx = new AC();
  }
  if (soccerAudioCtx.state === "suspended") {
    void soccerAudioCtx.resume().catch(() => {});
  }
  return soccerAudioCtx;
}

/** Tiếng chân sút bóng "Bịch!" uy lực trên sân cỏ */
function playSoccerKickSfx() {
  const ctx = getSoccerAudioCtx();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(195, now);
    osc.frequency.exponentialRampToValueAtTime(42, now + 0.14);
    gain.gain.setValueAtTime(0.32, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.17);
  } catch {
    // ignore
  }
}

/**
 * Tiếng Khán Giả Sân Vận Động Hò Reo Vang Dội ("ỒỒỒ — YEAHHH!!") khi sút tung lưới
 * Kết hợp: (1) Tiếng bóng căng lưới + (2) 3 tầng Formant Crowd Roar (Pink Noise) + (3) Tiếng vỗ tay & Kèn đồng sân vận động
 */
function playStadiumCrowdCheerSfx() {
  const ctx = getSoccerAudioCtx();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const dur = 2.6;

    // 1. Tạo bộ đệm Pink Noise mô phỏng hàng vạn khán giả đồng thanh hô vang
    const sampleRate = ctx.sampleRate;
    const bufferSize = Math.floor(sampleRate * dur);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0,
      b1 = 0,
      b2 = 0,
      b3 = 0,
      b4 = 0,
      b5 = 0,
      b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05;
      b6 = white * 0.115926;
    }

    // 3 dải tần Formant tạo âm sắc "ỒỒỒ — AAA — YEAHHH!" của đám đông sân vận động
    const formants = [
      { startFreq: 380, peakFreq: 620, q: 2.2, gainPeak: 0.38 },
      { startFreq: 820, peakFreq: 1280, q: 2.8, gainPeak: 0.32 },
      { startFreq: 1850, peakFreq: 2650, q: 1.6, gainPeak: 0.22 },
    ];

    formants.forEach((f) => {
      const src = ctx.createBufferSource();
      src.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.Q.setValueAtTime(f.q, now);
      filter.frequency.setValueAtTime(f.startFreq, now);
      filter.frequency.exponentialRampToValueAtTime(f.peakFreq, now + 0.35);
      filter.frequency.exponentialRampToValueAtTime(f.startFreq * 1.15, now + dur);

      const g = ctx.createGain();
      g.gain.setValueAtTime(0.001, now);
      g.gain.linearRampToValueAtTime(f.gainPeak, now + 0.12);
      g.gain.setValueAtTime(f.gainPeak * 0.92, now + 1.15);
      g.gain.exponentialRampToValueAtTime(0.001, now + dur);

      src.connect(filter);
      filter.connect(g);
      g.connect(ctx.destination);
      src.start(now);
      src.stop(now + dur);
    });

    // 2. Tiếng vỗ tay rào rào trên khán đài (Clap bursts)
    for (let c = 0; c < 14; c++) {
      const clapTime = now + 0.08 + c * 0.13 + Math.random() * 0.04;
      const clapSrc = ctx.createBufferSource();
      clapSrc.buffer = noiseBuffer;
      const hp = ctx.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.setValueAtTime(1500, clapTime);
      const cg = ctx.createGain();
      cg.gain.setValueAtTime(0.14, clapTime);
      cg.gain.exponentialRampToValueAtTime(0.001, clapTime + 0.065);
      clapSrc.connect(hp);
      hp.connect(cg);
      cg.connect(ctx.destination);
      clapSrc.start(clapTime, Math.random() * 0.5, 0.07);
    }

    // 3. Tiếng kèn đồng Stadium Goal Horn ngân vang
    const hornNotes = [
      { freq: 523.25, t: 0, d: 0.16 },
      { freq: 659.25, t: 0.12, d: 0.16 },
      { freq: 783.99, t: 0.24, d: 0.2 },
      { freq: 1046.5, t: 0.38, d: 0.65 },
    ];
    hornNotes.forEach((n) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      const st = now + n.t;
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(n.freq, st);

      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.setValueAtTime(2200, st);

      g.gain.setValueAtTime(0.001, st);
      g.gain.linearRampToValueAtTime(0.09, st + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, st + n.d);

      osc.connect(lp);
      lp.connect(g);
      g.connect(ctx.destination);
      osc.start(st);
      osc.stop(st + n.d + 0.02);
    });
  } catch {
    // ignore
  }
}

/** Tiếng bóng dội cột / khán giả tiếc nuối ngắn khi sút trượt */
function playCrowdMissSighSfx() {
  const ctx = getSoccerAudioCtx();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(310, now);
    osc.frequency.exponentialRampToValueAtTime(155, now + 0.35);
    g.gain.setValueAtTime(0.12, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.4);
  } catch {
    // ignore
  }
}

export interface NamSoccerPixelGameProps {
  soundEnabled: boolean;
  onSpeak: (text: string) => void;
  onReaction?: (mood: "idle" | "happy" | "sad", text: string) => void;
  onExit: () => void;
  onFinishMatch: (goalsScored: number, totalRounds: number) => void;
}

export function NamSoccerPixelGame({
  soundEnabled,
  onSpeak,
  onReaction,
  onExit,
  onFinishMatch,
}: NamSoccerPixelGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const victoryCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const deckRef = useRef<RawSoccerQuizQuestion[]>([]);

  const [roundIndex, setRoundIndex] = useState(0);
  const [goalsScored, setGoalsScored] = useState(0);
  const [history, setHistory] = useState<Array<"scored" | "saved">>([]);
  const [phaseUi, setPhaseUi] = useState<
    "aiming" | "quiz" | "animating" | "completed"
  >("aiming");
  const [selectedDir, setSelectedDir] = useState<number>(1);
  const [currentQuiz, setCurrentQuiz] = useState<ActiveSoccerQuiz | null>(null);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(
    null,
  );
  const [quizFeedback, setQuizFeedback] = useState<string>(
    "💡 Trả lời ĐÚNG để Nấm sút VÀO GÔN, trả lời sai là sút trượt nhé!",
  );
  const [coachText, setCoachText] = useState<string>(
    "Quả thứ 1/5: Nấm bấm chọn góc sút (Góc Trái, Giữa Gôn hoặc Góc Phải) rồi trả lời câu đố để ghi bàn nhé!",
  );

  const engineRef = useRef({
    phase: "aiming" as
      | "aiming"
      | "quiz"
      | "running"
      | "flying"
      | "celebrating"
      | "saved_feedback"
      | "match_over",
    roundIdx: 0,
    goals: 0,
    selectedDir: 1,
    keeperDir: 1,
    isSuperShot: false,
    willScore: true,
    missType: "keeper" as "keeper" | "wide",
    phaseTimer: 0,
    namX: 122,
    namY: 110,
    namPose: "idle" as "idle" | "run" | "kick" | "celebrate" | "trophy",
    ballX: 160,
    ballY: 142,
    ballStartX: 160,
    ballStartY: 142,
    ballTargetX: 160,
    ballTargetY: 50,
    ballScale: 1,
    ballTrail: [] as Array<{
      x: number;
      y: number;
      color: string;
      radius: number;
      life: number;
      maxLife: number;
    }>,
    shockwaves: [] as Array<{
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      color: string;
      alpha: number;
    }>,
    keeperX: 160,
    keeperY: 54,
    keeperState: "idle" as "idle" | "dive",
    netShake: 0,
    bannerText: "",
    particles: [] as Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      life: number;
      maxLife: number;
    }>,
  });

  const drawNextRandomQuestion = (): ActiveSoccerQuiz => {
    if (deckRef.current.length === 0) {
      const copy = [...SOCCER_QUESTION_BANK];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      deckRef.current = copy;
    }
    const raw = deckRef.current.pop()!;
    const opts: ShuffledSoccerOption[] = raw.options.map((text, idx) => ({
      text,
      isCorrect: idx === raw.correct,
    }));
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    return {
      subject: raw.subject,
      visual: raw.visual,
      question: raw.question,
      options: opts,
    };
  };

  const spawnBloomSparks = (cx: number, cy: number, count = 48) => {
    const colors = [
      "#FFE066",
      "#FF5C8A",
      "#06D6A0",
      "#38BDF8",
      "#A855F7",
      "#FF9F1C",
    ];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.7 + Math.random() * 3.1;
      const maxLife = 40 + Math.floor(Math.random() * 30);
      engineRef.current.particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 1.8 + Math.random() * 2.4,
        life: maxLife,
        maxLife,
      });
    }
  };

  const spawnShockwave = (cx: number, cy: number, color: string, maxR = 28) => {
    engineRef.current.shockwaves.push({
      x: cx,
      y: cy,
      radius: 3,
      maxRadius: maxR,
      color,
      alpha: 0.95,
    });
  };

  const resetRoundPositions = (nextRound: number) => {
    const st = engineRef.current;
    st.phase = "aiming";
    st.roundIdx = nextRound;
    st.phaseTimer = 0;
    st.namX = 122;
    st.namY = 110;
    st.namPose = "idle";
    st.ballX = 160;
    st.ballY = 142;
    st.ballScale = 1;
    st.ballTrail = [];
    st.shockwaves = [];
    st.keeperX = 160;
    st.keeperY = 54;
    st.keeperState = "idle";
    st.netShake = 0;
    st.bannerText = "";
    setRoundIndex(nextRound);
    setPhaseUi("aiming");
    setSelectedOptionIdx(null);
    setCoachText(
      `Quả thứ ${nextRound + 1}/${TOTAL_SOCCER_ROUNDS}: Nấm bấm chọn góc sút (Trái, Giữa hoặc Phải) rồi trả lời câu đố để ghi bàn nhé!`,
    );
  };

  const handleSelectCorner = (dirIndex: number) => {
    if (engineRef.current.phase !== "aiming") return;
    if (soundEnabled) {
      playCardPlaceSound(1);
    }
    engineRef.current.selectedDir = dirIndex;
    engineRef.current.phase = "quiz";
    setSelectedDir(dirIndex);
    setSelectedOptionIdx(null);
    setQuizFeedback(
      "💡 Trả lời ĐÚNG để Nấm sút VÀO GÔN, trả lời sai là sút trượt nhé!",
    );
    const quiz = drawNextRandomQuestion();
    setCurrentQuiz(quiz);
    setPhaseUi("quiz");
    if (soundEnabled) {
      onSpeak(quiz.question);
    }
  };

  const handleSelectQuizOption = (opt: ShuffledSoccerOption, idx: number) => {
    if (selectedOptionIdx !== null || !currentQuiz) return;
    setSelectedOptionIdx(idx);

    const st = engineRef.current;
    const zone = GOAL_ZONES[st.selectedDir] ?? GOAL_ZONES[1];

    if (opt.isCorrect) {
      if (soundEnabled) {
        playRewardTone();
      }
      setQuizFeedback("✅ Chính xác! Nấm nạp đầy năng lượng sút Siêu Phẩm!");
      st.willScore = true;
      st.isSuperShot = true;
      const otherDirs = [0, 1, 2].filter((d) => d !== st.selectedDir);
      st.keeperDir = otherDirs[Math.floor(Math.random() * otherDirs.length)];
      st.ballStartX = st.ballX;
      st.ballStartY = st.ballY;
      st.ballTargetX = zone.targetX;
      st.ballTargetY = zone.targetY;

      window.setTimeout(() => {
        st.phase = "running";
        st.phaseTimer = 0;
        setPhaseUi("animating");
      }, 480);
    } else {
      const rightAns =
        currentQuiz.options.find((o) => o.isCorrect)?.text ?? "";
      setQuizFeedback(
        `❌ Tiếc quá! Đáp án đúng là: ${rightAns} — Cú sút bị trượt rồi!`,
      );
      st.willScore = false;
      st.isSuperShot = false;
      st.missType = Math.random() < 0.55 ? "wide" : "keeper";
      st.keeperDir = st.selectedDir;
      st.ballStartX = st.ballX;
      st.ballStartY = st.ballY;
      if (st.missType === "wide") {
        st.ballTargetX = zone.missX;
        st.ballTargetY = zone.missY;
      } else {
        st.ballTargetX = zone.targetX;
        st.ballTargetY = zone.targetY;
      }

      window.setTimeout(() => {
        st.phase = "running";
        st.phaseTimer = 0;
        setPhaseUi("animating");
      }, 900);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Cấu hình Engine <canvas> 2D Retina (devicePixelRatio = 2)
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const LOGICAL_W = 320;
    const LOGICAL_H = 180;
    const HD_SCALE = 3; // 320x180 * 3 * dpr(2) = 1920x1080 Full HD Retina
    canvas.width = LOGICAL_W * HD_SCALE * dpr;
    canvas.height = LOGICAL_H * HD_SCALE * dpr;

    const sprites = {
      nam_idle_0: createNamSpriteCanvas("idle_0"),
      nam_idle_1: createNamSpriteCanvas("idle_1"),
      nam_run_0: createNamSpriteCanvas("run_0"),
      nam_run_1: createNamSpriteCanvas("run_1"),
      nam_kick: createNamSpriteCanvas("kick"),
      nam_celebrate: createNamSpriteCanvas("celebrate"),
      nam_trophy_0: createNamSpriteCanvas("trophy_0"),
      nam_trophy_1: createNamSpriteCanvas("trophy_1"),
      pochacco_idle: createPochaccoSpriteCanvas("idle"),
      pochacco_dive: createPochaccoSpriteCanvas("dive"),
    };

    const confettiColors = [
      "#EF4444",
      "#FACC15",
      "#38BDF8",
      "#22C55E",
      "#A855F7",
      "#FB7185",
      "#F97316",
      "#2DD4BF",
    ];
    type PaperPiece = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      w: number;
      h: number;
      color: string;
      angle: number;
      spin: number;
      wobble: number;
      wobbleSpeed: number;
    };
    const makeConfettiPiece = (
      w: number,
      h: number,
      fromBottomCannon = false,
    ): PaperPiece => {
      const side = Math.random() < 0.5 ? "left" : "right";
      return {
        x: fromBottomCannon
          ? side === "left"
            ? 14
            : w - 14
          : Math.random() * w,
        y: fromBottomCannon ? h - 18 : -6 - Math.random() * 40,
        vx: fromBottomCannon
          ? side === "left"
            ? 1.2 + Math.random() * 2.4
            : -1.2 - Math.random() * 2.4
          : (Math.random() - 0.5) * 0.9,
        vy: fromBottomCannon
          ? -2.6 - Math.random() * 2.2
          : 0.7 + Math.random() * 1.1,
        w: 4.2 + Math.random() * 3.2,
        h: 2.2 + Math.random() * 1.8,
        color:
          confettiColors[Math.floor(Math.random() * confettiColors.length)],
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.22,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.07 + Math.random() * 0.06,
      };
    };

    const fieldConfetti: PaperPiece[] = Array.from({ length: 54 }, (_, i) =>
      makeConfettiPiece(LOGICAL_W, LOGICAL_H, i < 20),
    );
    const stageConfetti: PaperPiece[] = Array.from({ length: 42 }, (_, i) =>
      makeConfettiPiece(240, 136, i < 16),
    );

    const stepConfetti = (list: PaperPiece[], w: number, h: number) => {
      for (let i = 0; i < list.length; i++) {
        const c = list[i];
        c.wobble += c.wobbleSpeed;
        c.x += c.vx + Math.sin(c.wobble) * 0.45;
        c.y += c.vy;
        c.vx *= 0.985;
        c.vy = Math.min(c.vy + 0.055, 1.35);
        c.angle += c.spin;
        if (c.y > h + 8) {
          Object.assign(c, makeConfettiPiece(w, h, Math.random() < 0.28));
        }
      }
    };

    const drawConfetti = (
      targetCtx: CanvasRenderingContext2D,
      list: PaperPiece[],
    ) => {
      targetCtx.save();
      for (let i = 0; i < list.length; i++) {
        const c = list[i];
        targetCtx.save();
        targetCtx.translate(c.x, c.y);
        targetCtx.rotate(c.angle);
        const flipScale = 0.35 + 0.65 * Math.abs(Math.cos(c.wobble));
        targetCtx.fillStyle = c.color;
        targetCtx.fillRect(
          -c.w / 2,
          (-c.h * flipScale) / 2,
          c.w,
          c.h * flipScale,
        );
        targetCtx.restore();
      }
      targetCtx.restore();
    };

    let animId = 0;
    let tick = 0;

    const renderFrame = () => {
      tick++;
      const st = engineRef.current;

      // 1. Cập nhật Vật lý Sub-pixel Float mượt mà
      for (let i = st.particles.length - 1; i >= 0; i--) {
        const p = st.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.065;
        p.life--;
        if (p.life <= 0) st.particles.splice(i, 1);
      }

      for (let i = st.shockwaves.length - 1; i >= 0; i--) {
        const sw = st.shockwaves[i];
        sw.radius += (sw.maxRadius - sw.radius) * 0.18;
        sw.alpha *= 0.86;
        if (sw.alpha < 0.04) st.shockwaves.splice(i, 1);
      }

      if (st.netShake > 0) {
        st.netShake *= 0.86;
        if (st.netShake < 0.15) st.netShake = 0;
      }

      if (st.phase === "aiming" || st.phase === "quiz") {
        st.keeperX = 160 + Math.sin(tick * 0.055) * 14.5;
        st.namPose = "idle";
      } else if (st.phase === "running") {
        st.phaseTimer++;
        st.namPose = "run";
        const progress = Math.min(1, st.phaseTimer / 18);
        // Nội suy Easing mượt mà
        const ease = 1 - Math.pow(1 - progress, 2);
        st.namX = 122 + ease * 16;
        st.namY = 110 + ease * 4;

        if (st.phaseTimer >= 18) {
          st.phase = "flying";
          st.phaseTimer = 0;
          st.namPose = "kick";
          if (soundEnabled) {
            playSoccerKickSfx();
          }
          spawnShockwave(st.ballX, st.ballY, "#FFD166", 24);
          spawnBloomSparks(st.ballX, st.ballY, 14);
        }
      } else if (st.phase === "flying") {
        st.phaseTimer++;
        const duration = 28;
        const t = Math.min(1, st.phaseTimer / duration);
        const arcHeight = st.isSuperShot ? 28 : 15;
        st.ballX = st.ballStartX + (st.ballTargetX - st.ballStartX) * t;
        st.ballY =
          st.ballStartY +
          (st.ballTargetY - st.ballStartY) * t -
          Math.sin(t * Math.PI) * arcHeight;
        st.ballScale = 1 - t * 0.34;

        if (st.isSuperShot) {
          const rainbowColors = [
            "#FF4D6D",
            "#FF9F1C",
            "#FFE066",
            "#06D6A0",
            "#38BDF8",
          ];
          st.ballTrail.push({
            x: st.ballX,
            y: st.ballY,
            color: rainbowColors[st.phaseTimer % rainbowColors.length],
            radius: 6.5 * st.ballScale,
            life: 16,
            maxLife: 16,
          });
        }

        const keeperTarget = GOAL_ZONES[st.keeperDir]?.targetX ?? 160;
        st.keeperX = 160 + (keeperTarget - 160) * Math.min(1, t * 1.25);
        st.keeperState = st.keeperDir === 1 ? "idle" : "dive";

        if (st.phaseTimer >= duration) {
          if (st.willScore) {
            st.phase = "celebrating";
            st.phaseTimer = 0;
            st.namPose = "celebrate";
            st.goals += 1;
            st.netShake = 7;
            st.bannerText = "⚽ VÀO RỒI!! SIÊU PHẨM!!";
            spawnShockwave(st.ballTargetX, st.ballTargetY, "#38BDF8", 42);
            spawnShockwave(st.ballTargetX, st.ballTargetY, "#FFE066", 28);
            spawnBloomSparks(st.ballTargetX, st.ballTargetY, 60);
            setGoalsScored(st.goals);
            setHistory((prev) => [...prev, "scored"]);
            const msg =
              "🎉 VÀO RỒI! Cả sân vận động đang hò reo vang dội cho siêu phẩm của Nấm!";
            setCoachText(msg);
            onReaction?.("happy", "⚽ VÀO RỒI!! Cú sút Cầu Vồng tuyệt đẹp!");
            if (soundEnabled) {
              playStadiumCrowdCheerSfx();
            }
          } else {
            st.phase = "saved_feedback";
            st.phaseTimer = 0;
            st.namPose = "idle";
            st.bannerText =
              st.missType === "wide"
                ? "SÚT CHỆCH CỘT DỌC!"
                : "POCHACCO BẮT ĐƯỢC RỒI!";
            spawnShockwave(st.ballTargetX, st.ballTargetY, "#F97316", 20);
            setHistory((prev) => [...prev, "saved"]);
            setCoachText(
              "Tiếc quá, trả lời sai nên sút trượt mất rồi! Quả sau Nấm nghe kỹ câu hỏi để ghi bàn nhé!",
            );
            onReaction?.(
              "sad",
              "Suýt vào rồi! Quả tiếp theo Nấm trả lời đúng để ghi bàn nhé!",
            );
            if (soundEnabled) {
              playCrowdMissSighSfx();
            }
          }
        }
      } else if (
        st.phase === "celebrating" ||
        st.phase === "saved_feedback"
      ) {
        st.phaseTimer++;
        if (st.phaseTimer >= 88) {
          if (st.roundIdx + 1 < TOTAL_SOCCER_ROUNDS) {
            resetRoundPositions(st.roundIdx + 1);
          } else {
            st.phase = "match_over";
            st.namPose = "trophy";
            st.namX = 144;
            st.namY = 104;
            setPhaseUi("completed");
            onFinishMatch(st.goals, TOTAL_SOCCER_ROUNDS);
          }
        }
      } else if (st.phase === "match_over") {
        st.namPose = "trophy";
        stepConfetti(fieldConfetti, LOGICAL_W, LOGICAL_H);
        stepConfetti(stageConfetti, 240, 136);
      }

      for (let i = st.ballTrail.length - 1; i >= 0; i--) {
        st.ballTrail[i].life--;
        if (st.ballTrail[i].life <= 0) st.ballTrail.splice(i, 1);
      }

      // =======================================================================
      // 2. DỰNG HÌNH HD-2D RETINA + ADDITIVE BLOOM GLOW ('lighter')
      // =======================================================================
      ctx.save();
      ctx.setTransform(HD_SCALE * dpr, 0, 0, HD_SCALE * dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";

      // Bầu trời Đêm Chung Kết Cúp Ánh Sáng (Deep Twilight Arena)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, 44);
      skyGrad.addColorStop(0, "#090D16");
      skyGrad.addColorStop(0.55, "#14213D");
      skyGrad.addColorStop(1, "#1E3A8A");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, LOGICAL_W, 44);

      // Khán đài cổ vũ & dải bảng LED rực rỡ
      ctx.fillStyle = "#0F172A";
      ctx.fillRect(0, 32, LOGICAL_W, 12);
      const bannerColors = [
        "#EF4444",
        "#FACC15",
        "#38BDF8",
        "#A855F7",
        "#22C55E",
      ];
      for (let i = 0; i < 32; i++) {
        ctx.fillStyle = bannerColors[i % bannerColors.length];
        ctx.fillRect(i * 10 + 1, 36, 8, 6);
      }

      // Mặt sân cỏ Emerald Retina sọc mượt
      for (let y = 44; y < LOGICAL_H; y += 12) {
        const isEven = ((y - 44) / 12) % 2 === 0;
        ctx.fillStyle = isEven ? "#2D936C" : "#247BA0";
        ctx.fillRect(0, y, LOGICAL_W, 12);
        ctx.fillStyle = isEven ? "rgba(82, 183, 136, 0.82)" : "rgba(64, 145, 108, 0.85)";
        ctx.fillRect(0, y, LOGICAL_W, 12);
      }

      // HIỆU ỨNG ADDITIVE BLOOM 1: Đèn pha sân vận động (Stadium Floodlights)
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      const floodSpots = [45, 118, 202, 275];
      floodSpots.forEach((fx, idx) => {
        const pulseR = 52 + Math.sin(tick * 0.04 + idx) * 4;
        const beam = ctx.createRadialGradient(fx, 8, 2, fx, 52, pulseR);
        beam.addColorStop(0, "rgba(224, 242, 254, 0.42)");
        beam.addColorStop(0.45, "rgba(56, 189, 248, 0.14)");
        beam.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = beam;
        ctx.beginPath();
        ctx.arc(fx, 34, pulseR, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // Vạch vôi vòng cấm Retina sắc nét
      ctx.strokeStyle = "rgba(255, 255, 255, 0.82)";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(20, 54);
      ctx.lineTo(300, 54);
      ctx.moveTo(58, 54);
      ctx.lineTo(58, 98);
      ctx.lineTo(262, 98);
      ctx.lineTo(262, 54);
      ctx.stroke();

      // Chấm phạt đền phát sáng nhẹ
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.ellipse(160, 143, 3.2, 1.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Khung thành & Lưới co giãn
      const shakeX = st.netShake ? (Math.random() - 0.5) * st.netShake : 0;
      const shakeY = st.netShake ? (Math.random() - 0.5) * st.netShake : 0;
      const gx = 82 + shakeX;
      const gy = 20 + shakeY;
      const gw = 156;
      const gh = 36;

      ctx.strokeStyle = "rgba(255, 255, 255, 0.28)";
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      for (let nx = gx + 5; nx < gx + gw - 2; nx += 6) {
        ctx.moveTo(nx, gy + 3);
        ctx.lineTo(nx, gy + gh - 2);
      }
      for (let ny = gy + 5; ny < gy + gh - 2; ny += 5) {
        ctx.moveTo(gx + 3, ny);
        ctx.lineTo(gx + gw - 3, ny);
      }
      ctx.stroke();

      // Cột gôn trắng bóng
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(gx, gy, gw, 3.5);
      ctx.fillRect(gx, gy, 3.5, gh);
      ctx.fillRect(gx + gw - 3.5, gy, 3.5, gh);
      ctx.fillStyle = "#EF4444";
      for (let py = gy + 6; py < gy + gh; py += 8) {
        ctx.fillRect(gx, py, 3.5, 3);
        ctx.fillRect(gx + gw - 3.5, py, 3.5, 3);
      }

      // HIỆU ỨNG ADDITIVE BLOOM 2: Tâm ngắm 3 góc gôn phát sáng Neon ('lighter')
      if (st.phase === "aiming") {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        const pulse = 0.75 + Math.sin(tick * 0.1) * 0.25;
        GOAL_ZONES.forEach((z) => {
          const rGrad = ctx.createRadialGradient(
            z.targetX,
            z.targetY,
            1,
            z.targetX,
            z.targetY,
            15 * pulse,
          );
          rGrad.addColorStop(0, "rgba(254, 240, 138, 0.85)");
          rGrad.addColorStop(0.5, "rgba(250, 204, 21, 0.35)");
          rGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
          ctx.fillStyle = rGrad;
          ctx.beginPath();
          ctx.arc(z.targetX, z.targetY, 15 * pulse, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = "rgba(254, 249, 195, 0.9)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(z.targetX, z.targetY, 6.5, 0, Math.PI * 2);
          ctx.stroke();
        });
        ctx.restore();
      }

      // LỚP PIXEL CRISP: Vẽ Thủ môn Pochacco giữ nguyên hạt Pixel sắc lẹm
      ctx.imageSmoothingEnabled = false;
      const pSprite =
        st.keeperState === "dive"
          ? sprites.pochacco_dive
          : sprites.pochacco_idle;
      const kx = st.keeperX - pSprite.width / 2;
      const ky = st.keeperY - pSprite.height + 6;
      ctx.fillStyle = "rgba(15, 23, 42, 0.32)";
      ctx.beginPath();
      ctx.ellipse(st.keeperX, st.keeperY + 4, 10, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.drawImage(pSprite, kx, ky);

      // HIỆU ỨNG ADDITIVE BLOOM 3: Đuôi bóng Sao Chổi Cầu Vồng & Sóng xung kích ('lighter')
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      st.ballTrail.forEach((tr) => {
        const ratio = tr.life / tr.maxLife;
        const r = Math.max(1, tr.radius * ratio * 2.1);
        const grad = ctx.createRadialGradient(tr.x, tr.y, 0.5, tr.x, tr.y, r);
        grad.addColorStop(0, "#FFFFFF");
        grad.addColorStop(0.4, tr.color);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(tr.x, tr.y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      st.shockwaves.forEach((sw) => {
        ctx.strokeStyle = sw.color;
        ctx.globalAlpha = sw.alpha;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.restore();

      // Quả bóng Retina + Hào quang nhẹ quanh bóng
      const bx = st.ballX;
      const by = st.ballY;
      const br = 4.8 * st.ballScale;

      if (st.isSuperShot && st.phase === "flying") {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        const aura = ctx.createRadialGradient(bx, by, 1, bx, by, br * 3.2);
        aura.addColorStop(0, "rgba(255, 230, 109, 0.85)");
        aura.addColorStop(0.5, "rgba(56, 189, 248, 0.45)");
        aura.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = aura;
        ctx.beginPath();
        ctx.arc(bx, by, br * 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(bx, by, br, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#1E293B";
      ctx.stroke();
      ctx.fillStyle = "#1E293B";
      ctx.beginPath();
      ctx.arc(
        bx + Math.cos(tick * 0.25) * 1.5,
        by + Math.sin(tick * 0.25) * 1.5,
        br * 0.38,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      // LỚP PIXEL CRISP: Cầu thủ Nhí Nấm (Không có nhãn tên trên đầu, hạt Pixel vuông nét căng)
      ctx.imageSmoothingEnabled = false;
      const nSprite =
        st.namPose === "idle"
          ? Math.floor(tick / 22) % 2 === 0
            ? sprites.nam_idle_0
            : sprites.nam_idle_1
          : st.namPose === "run"
            ? Math.floor(tick / 5) % 2 === 0
              ? sprites.nam_run_0
              : sprites.nam_run_1
            : st.namPose === "kick"
              ? sprites.nam_kick
              : st.namPose === "trophy"
                ? Math.floor(tick / 9) % 2 === 0
                  ? sprites.nam_trophy_0
                  : sprites.nam_trophy_1
                : sprites.nam_celebrate;

      const isBouncing =
        st.namPose === "celebrate" || st.namPose === "trophy";
      const bounceWave = Math.abs(Math.sin(tick * 0.2));
      const jumpOffset = isBouncing ? bounceWave * 7.5 : 0;
      const nx = st.namX;
      const ny = st.namY - jumpOffset;
      const shadowScale = isBouncing ? 1 - bounceWave * 0.25 : 1;

      ctx.fillStyle = "rgba(15, 23, 42, 0.35)";
      ctx.beginPath();
      ctx.ellipse(
        nx + 16,
        st.namY + 36,
        9 * shadowScale,
        2.5 * shadowScale,
        0,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      ctx.save();
      if (st.namPose === "trophy") {
        const sx = 1 + (0.5 - bounceWave) * 0.08;
        const sy = 1 + (bounceWave - 0.5) * 0.08;
        ctx.translate(nx + 16, ny + 38);
        ctx.scale(sx, sy);
        ctx.drawImage(nSprite, -16, -nSprite.height);
      } else {
        ctx.drawImage(nSprite, nx, ny);
      }
      ctx.restore();

      if (st.phase === "match_over") {
        drawConfetti(ctx, fieldConfetti);
      }

      const vCanvas = victoryCanvasRef.current;
      if (vCanvas && st.phase === "match_over") {
        const vctx = vCanvas.getContext("2d");
        if (vctx) {
          const lw = 240;
          const lh = 136;
          if (vCanvas.width !== lw * dpr) {
            vCanvas.width = lw * dpr;
            vCanvas.height = lh * dpr;
          }
          vctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          vctx.clearRect(0, 0, lw, lh);

          const vSky = vctx.createLinearGradient(0, 0, 0, 90);
          vSky.addColorStop(0, "#090D16");
          vSky.addColorStop(1, "#1E3A8A");
          vctx.fillStyle = vSky;
          vctx.fillRect(0, 0, lw, 90);

          vctx.fillStyle = "#2D936C";
          vctx.fillRect(0, 90, lw, 46);
          vctx.fillStyle = "#40916C";
          vctx.fillRect(0, 104, lw, 14);
          vctx.fillStyle = "rgba(255, 255, 255, 0.75)";
          vctx.fillRect(16, 92, lw - 32, 1.5);

          vctx.fillStyle = "#1E293B";
          vctx.fillRect(78, 114, 84, 14);
          vctx.fillStyle = "#FACC15";
          vctx.fillRect(76, 112, 88, 3);

          const tSprite =
            Math.floor(tick / 9) % 2 === 0
              ? sprites.nam_trophy_0
              : sprites.nam_trophy_1;
          const bWave = Math.abs(Math.sin(tick * 0.22));
          const jumpY = bWave * 9.5;
          const scale = 1.95;
          const drawW = tSprite.width * scale;
          const drawH = tSprite.height * scale;
          const shScale = 1 - bWave * 0.25;

          vctx.fillStyle = "rgba(15, 23, 42, 0.38)";
          vctx.beginPath();
          vctx.ellipse(
            lw / 2,
            113,
            18 * shScale,
            4 * shScale,
            0,
            0,
            Math.PI * 2,
          );
          vctx.fill();

          vctx.save();
          vctx.imageSmoothingEnabled = false;
          const sx = 1 + (0.5 - bWave) * 0.08;
          const sy = 1 + (bWave - 0.5) * 0.08;
          vctx.translate(lw / 2, 114 - jumpY);
          vctx.scale(sx, sy);
          vctx.drawImage(tSprite, -drawW / 2, -drawH, drawW, drawH);
          vctx.restore();

          drawConfetti(vctx, stageConfetti);
        }
      }

      // HIỆU ỨNG ADDITIVE BLOOM 4: Hạt Pháo Sáng Phát Quang ('lighter')
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      st.particles.forEach((p) => {
        const alpha = Math.max(0, p.life / p.maxLife);
        const pGrad = ctx.createRadialGradient(
          p.x,
          p.y,
          0.2,
          p.x,
          p.y,
          p.size * 2.2,
        );
        pGrad.addColorStop(0, "#FFFFFF");
        pGrad.addColorStop(0.45, p.color);
        pGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.globalAlpha = alpha;
        ctx.fillStyle = pGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // Băng rôn thông báo Bàn thắng Retina sắc nét
      if (st.bannerText) {
        ctx.fillStyle = "rgba(15, 23, 42, 0.88)";
        ctx.fillRect(50, 74, 220, 24);
        ctx.strokeStyle = "#FACC15";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(50, 74, 220, 24);
        ctx.fillStyle = "#FEF08A";
        ctx.font = "800 10.5px 'Baloo 2', 'Nunito', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(st.bannerText, 160, 89.5);
      }

      ctx.restore();
      animId = window.requestAnimationFrame(renderFrame);
    };

    animId = window.requestAnimationFrame(renderFrame);
    return () => window.cancelAnimationFrame(animId);
  }, [soundEnabled]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (engineRef.current.phase !== "aiming") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * 320;
    if (relX < 132) {
      handleSelectCorner(0);
    } else if (relX > 188) {
      handleSelectCorner(2);
    } else {
      handleSelectCorner(1);
    }
  };

  const handleRestartMatch = () => {
    engineRef.current.goals = 0;
    setGoalsScored(0);
    setHistory([]);
    resetRoundPositions(0);
  };

  return (
    <div
      className="pochacco-game-stage"
      style={{
        background: "linear-gradient(180deg, #16223f 0%, #0f172a 100%)",
        border: "3px solid rgba(56, 189, 248, 0.42)",
        borderRadius: "26px",
        padding: "14px 16px 16px",
        boxShadow:
          "0 22px 50px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
      }}
    >
      {/* Top Broadcast Scorebar */}
      <div
        className="pochacco-top-bar"
        style={{
          background:
            "linear-gradient(90deg, #0b132b 0%, #1e293b 55%, #0f172a 100%)",
          border: "2px solid rgba(250, 204, 21, 0.45)",
          borderRadius: "18px",
          padding: "8px 14px",
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.35)",
        }}
      >
        <button
          type="button"
          onClick={onExit}
          style={{
            cursor: "pointer",
            border: "2px solid #475569",
            background: "linear-gradient(180deg, #334155 0%, #1e293b 100%)",
            color: "#f8fafc",
            borderRadius: "13px",
            padding: "6px 12px",
            fontWeight: 800,
            fontSize: "13px",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            boxShadow: "0 3px 0 #0f172a",
          }}
        >
          <ArrowLeft size={14} /> Chọn bài khác
        </button>

        <div
          className="pochacco-progress-group"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <span
            style={{
              background: "rgba(15, 23, 42, 0.9)",
              border: "2px solid rgba(56, 189, 248, 0.55)",
              color: "#e0f2fe",
              borderRadius: "13px",
              padding: "5px 12px",
              fontWeight: 900,
              fontSize: "13px",
            }}
          >
            ⚽ Quả {roundIndex + 1}/{TOTAL_SOCCER_ROUNDS}
          </span>
          <span
            style={{
              background: "linear-gradient(180deg, #fef08a 0%, #facc15 100%)",
              border: "2px solid #ffffff",
              color: "#713f12",
              borderRadius: "13px",
              padding: "5px 13px",
              fontWeight: 900,
              fontSize: "13px",
              boxShadow: "0 3px 0 #a16207",
            }}
          >
            🏆 Bàn thắng: {goalsScored}/{TOTAL_SOCCER_ROUNDS}
          </span>
        </div>

        <button
          type="button"
          onClick={handleRestartMatch}
          style={{
            cursor: "pointer",
            border: "2px solid #6ee7b7",
            background: "linear-gradient(180deg, #10b981 0%, #059669 100%)",
            color: "#ffffff",
            borderRadius: "13px",
            padding: "6px 12px",
            fontWeight: 800,
            fontSize: "13px",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            boxShadow: "0 3px 0 #065f46",
          }}
        >
          <RotateCcw size={14} /> Đá ván mới
        </button>
      </div>

      {/* Sân cỏ HD-2D Retina Canvas */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          maxHeight: "48vh",
          borderRadius: "22px",
          overflow: "hidden",
          border: "3px solid rgba(56, 189, 248, 0.55)",
          background: "#090d16",
          boxShadow: "0 16px 36px rgba(0, 0, 0, 0.5)",
        }}
      >
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            cursor: phaseUi === "aiming" ? "pointer" : "default",
          }}
        />

        {/* Dãy 5 quả bóng tiến độ góc trên phải */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "12px",
            background: "rgba(15, 23, 42, 0.86)",
            backdropFilter: "blur(6px)",
            padding: "5px 11px",
            borderRadius: "999px",
            display: "flex",
            gap: "6px",
            border: "2px solid rgba(56, 189, 248, 0.5)",
          }}
        >
          {[0, 1, 2, 3, 4].map((idx) => {
            const status = history[idx];
            return (
              <span
                key={idx}
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  background:
                    status === "scored"
                      ? "linear-gradient(180deg, #4ade80 0%, #16a34a 100%)"
                      : status === "saved"
                        ? "linear-gradient(180deg, #f87171 0%, #dc2626 100%)"
                        : "rgba(30, 41, 59, 0.9)",
                  color: "#fff",
                  border:
                    idx === roundIndex && phaseUi !== "completed"
                      ? "2px solid #fde047"
                      : "1.5px solid rgba(148, 163, 184, 0.45)",
                  boxShadow:
                    idx === roundIndex && phaseUi !== "completed"
                      ? "0 0 10px #fde047"
                      : "none",
                }}
              >
                {status === "scored" ? "⚽" : status === "saved" ? "❌" : "•"}
              </span>
            );
          })}
        </div>

        {/* Lời nhắc của Pochacco — Broadcast Lower-Third Banner */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "12px",
            background:
              "linear-gradient(90deg, rgba(15, 23, 42, 0.92) 0%, rgba(30, 41, 59, 0.9) 100%)",
            backdropFilter: "blur(8px)",
            border: "2px solid rgba(250, 204, 21, 0.75)",
            borderLeft: "5px solid #facc15",
            borderRadius: "14px",
            padding: "7px 13px",
            maxWidth: "76%",
            fontSize: "13px",
            fontWeight: 800,
            color: "#f8fafc",
            pointerEvents: "none",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.45)",
          }}
        >
          🐾 {coachText}
        </div>

        {/* Modal Câu Hỏi Trắc Nghiệm Đa Lĩnh Vực (Broadcast Arena Card) */}
        {phaseUi === "quiz" && currentQuiz && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(7, 11, 25, 0.78)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px",
              zIndex: 10,
            }}
          >
            <div
              style={{
                background: "linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)",
                border: "4px solid #38bdf8",
                borderRadius: "24px",
                overflow: "hidden",
                width: "min(540px, 96%)",
                display: "flex",
                flexDirection: "column",
                boxShadow:
                  "0 22px 55px rgba(0,0,0,0.65), 0 0 28px rgba(56, 189, 248, 0.35)",
              }}
            >
              {/* Royal Broadcast Header Ribbon */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "6px",
                  flexWrap: "wrap",
                  background:
                    "linear-gradient(90deg, #0f172a 0%, #1e3a8a 55%, #0284c7 100%)",
                  padding: "10px 14px",
                  borderBottom: "3px solid #facc15",
                }}
              >
                <span
                  style={{
                    background: "rgba(255, 255, 255, 0.16)",
                    color: "#ffffff",
                    border: "1.5px solid rgba(125, 211, 252, 0.75)",
                    padding: "4px 11px",
                    borderRadius: "999px",
                    fontWeight: 900,
                    fontSize: "12px",
                  }}
                >
                  {currentQuiz.subject}
                </span>
                <span
                  style={{
                    background:
                      "linear-gradient(180deg, #fef08a 0%, #facc15 100%)",
                    color: "#713f12",
                    border: "1.5px solid #ffffff",
                    padding: "4px 11px",
                    borderRadius: "999px",
                    fontWeight: 900,
                    fontSize: "12px",
                    boxShadow: "0 2px 0 #a16207",
                  }}
                >
                  🎯 Nhắm sút: {GOAL_ZONES[selectedDir]?.label}
                </span>
                <button
                  type="button"
                  onClick={() => onSpeak(currentQuiz.question)}
                  style={{
                    cursor: "pointer",
                    border: "2px solid #7dd3fc",
                    background:
                      "linear-gradient(180deg, #38bdf8 0%, #0284c7 100%)",
                    color: "#ffffff",
                    borderRadius: "999px",
                    padding: "4px 11px",
                    fontWeight: 900,
                    fontSize: "12px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    boxShadow: "0 3px 0 #0369a1",
                  }}
                >
                  <Volume2 size={13} /> Nghe câu hỏi
                </button>
              </div>

              <div
                style={{
                  padding: "14px 16px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    background:
                      "linear-gradient(180deg, #f8fafc 0%, #e0f2fe 100%)",
                    border: "2px solid #bae6fd",
                    borderRadius: "18px",
                    padding: "10px 14px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      background: "#ffffff",
                      border: "2px solid #e2e8f0",
                      borderRadius: "14px",
                      padding: "4px 14px",
                      fontSize: "22px",
                      fontWeight: 900,
                      color: "#0f172a",
                      marginBottom: "6px",
                    }}
                  >
                    {currentQuiz.visual}
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: 900,
                      color: "#0f172a",
                    }}
                  >
                    {currentQuiz.question}
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "10px",
                  }}
                >
                  {currentQuiz.options.map((opt, idx) => {
                    const isChosen = selectedOptionIdx === idx;
                    const showCorrect =
                      selectedOptionIdx !== null && opt.isCorrect;
                    const showWrong = isChosen && !opt.isCorrect;
                    const badgeColors = [
                      "linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)",
                      "linear-gradient(180deg, #f59e0b 0%, #b45309 100%)",
                      "linear-gradient(180deg, #a855f7 0%, #7e22ce 100%)",
                    ];
                    const letters = ["A", "B", "C"];
                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={selectedOptionIdx !== null}
                        onClick={() => handleSelectQuizOption(opt, idx)}
                        style={{
                          cursor:
                            selectedOptionIdx !== null ? "default" : "pointer",
                          border: `2.5px solid ${
                            showCorrect
                              ? "#16a34a"
                              : showWrong
                                ? "#dc2626"
                                : "#cbd5e1"
                          }`,
                          background: showCorrect
                            ? "linear-gradient(180deg, #dcfce7 0%, #bbf7d0 100%)"
                            : showWrong
                              ? "linear-gradient(180deg, #fee2e2 0%, #fecaca 100%)"
                              : "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
                          color: showCorrect
                            ? "#14532d"
                            : showWrong
                              ? "#7f1d1d"
                              : "#0f172a",
                          borderRadius: "16px",
                          padding: "10px",
                          fontWeight: 900,
                          fontSize: "14px",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          boxShadow: showCorrect
                            ? "0 4px 0 #15803d"
                            : showWrong
                              ? "0 4px 0 #b91c1c"
                              : "0 4px 0 #94a3b8",
                        }}
                      >
                        <span
                          style={{
                            width: "26px",
                            height: "26px",
                            borderRadius: "8px",
                            background: showCorrect
                              ? "#16a34a"
                              : showWrong
                                ? "#dc2626"
                                : badgeColors[idx % 3],
                            color: "#fff",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "12px",
                            fontWeight: 900,
                            flexShrink: 0,
                          }}
                        >
                          {letters[idx] || idx + 1}
                        </span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                <div
                  style={{
                    background: "#f1f5f9",
                    border: "1.5px solid #e2e8f0",
                    borderRadius: "10px",
                    padding: "6px 10px",
                    textAlign: "center",
                    fontSize: "12.5px",
                    fontWeight: 800,
                    color: "#334155",
                  }}
                >
                  {quizFeedback}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Màn hình Tổng Kết Hiệp Đấu: Nấm Cầm Cúp Vàng Nhún Nhảy + Pháo Giấy Nhiều Màu */}
        {phaseUi === "completed" && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(15, 23, 42, 0.58)",
              backdropFilter: "blur(2.5px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "14px",
              zIndex: 15,
            }}
          >
            <div
              style={{
                background: "#ffffff",
                border: "5px solid #facc15",
                borderRadius: "28px",
                padding: "16px 22px 18px",
                textAlign: "center",
                maxWidth: "430px",
                width: "100%",
                boxShadow: "0 24px 50px rgba(0, 0, 0, 0.45)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "140px",
                  margin: "0 auto 10px",
                  borderRadius: "18px",
                  overflow: "hidden",
                  border: "3px solid #cbd5e1",
                  background: "#090d16",
                }}
              >
                <canvas
                  ref={victoryCanvasRef}
                  width={240}
                  height={136}
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: 900,
                  color: "#dc2626",
                  marginBottom: "4px",
                }}
              >
                {goalsScored >= 4
                  ? `🏆 Vua Phá Lưới Thông Thái (${goalsScored}/${TOTAL_SOCCER_ROUNDS})!`
                  : `⚽ Cầu Thủ Nhí Đáng Yêu (${goalsScored}/${TOTAL_SOCCER_ROUNDS})!`}
              </div>
              <div
                style={{
                  fontSize: "13.5px",
                  fontWeight: 800,
                  color: "#334155",
                  marginBottom: "12px",
                }}
              >
                {goalsScored >= 4
                  ? `Siêu quá Nấm ơi! Nấm đã trả lời đúng và ghi ${goalsScored}/${TOTAL_SOCCER_ROUNDS} bàn thắng tuyệt đẹp!`
                  : `Nấm đã ghi được ${goalsScored}/${TOTAL_SOCCER_ROUNDS} bàn thắng! Cùng đá thêm một hiệp nữa nhé!`}
              </div>
              <button
                type="button"
                onClick={handleRestartMatch}
                style={{
                  cursor: "pointer",
                  border: "none",
                  background: "linear-gradient(180deg, #ef4444 0%, #dc2626 100%)",
                  color: "#ffffff",
                  fontWeight: 900,
                  fontSize: "15px",
                  padding: "9px 24px",
                  borderRadius: "999px",
                  boxShadow: "0 5px 0 #991b1b",
                }}
              >
                ⚽ Đá Tiếp Hiệp Mới!
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3 Nút Chọn Góc Sút 3D Arcade + Icon SVG Sắc Nét */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
          marginTop: "10px",
        }}
      >
        {[
          {
            dir: 0,
            label: "Sút Góc Trái",
            bg: "linear-gradient(180deg, #38bdf8 0%, #2563eb 100%)",
            shadow: "0 6px 0 #1e3a8a, 0 8px 18px rgba(37, 99, 235, 0.3)",
            path: "M19 12H5M12 19l-7-7 7-7",
          },
          {
            dir: 1,
            label: "Sút Giữa Gôn",
            bg: "linear-gradient(180deg, #facc15 0%, #ea580c 100%)",
            shadow: "0 6px 0 #9a3412, 0 8px 18px rgba(234, 88, 12, 0.3)",
            path: "M12 19V5M5 12l7-7 7 7",
          },
          {
            dir: 2,
            label: "Sút Góc Phải",
            bg: "linear-gradient(180deg, #34d399 0%, #059669 100%)",
            shadow: "0 6px 0 #065f46, 0 8px 18px rgba(5, 150, 105, 0.3)",
            path: "M5 12h14M12 5l7 7-7 7",
          },
        ].map((btn) => (
          <button
            key={btn.dir}
            type="button"
            disabled={phaseUi !== "aiming"}
            onClick={() => handleSelectCorner(btn.dir)}
            style={{
              cursor: phaseUi === "aiming" ? "pointer" : "not-allowed",
              opacity: phaseUi === "aiming" ? 1 : 0.32,
              filter: phaseUi === "aiming" ? "none" : "saturate(0.45)",
              border: "2px solid rgba(255, 255, 255, 0.35)",
              borderRadius: "18px",
              padding: "11px 14px",
              background: btn.bg,
              boxShadow: btn.shadow,
              color: "#ffffff",
              fontWeight: 900,
              fontSize: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.35)",
            }}
          >
            <span
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "10px",
                background: "rgba(15, 23, 42, 0.26)",
                border: "1.5px solid rgba(255, 255, 255, 0.45)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={btn.path} />
              </svg>
            </span>
            <span>{btn.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
