import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Volume2,
} from "lucide-react";
import {
  drawNonRepeatingItems,
  shuffleArrayRandom,
} from "../../lib/nonRepeatingDeck";
import {
  playCorrectDingSound,
  playRewardTone,
  playWrongBuzzSound,
} from "../../lib/sound";

export const BLEND_QUESTIONS_PER_ROUND = 5;

export interface BlendQuizWordItem {
  id: string;
  /** Phụ âm đầu hiển thị chữ hoa đầu (VD: "S", "Ch", "Th", "Đ") */
  onset: string;
  /** Phần vần có dấu (VD: "ách", "uối", "ìa", "ép") */
  rhymeWithTone: string;
  /** Từ đơn ghép hoàn chỉnh (VD: "Sách", "Chuối", "Thìa", "Dép") */
  targetSyllable: string;
  /** Từ đứng trước tiếng chính nếu có (VD: "Quyển" trong "Quyển sách") */
  prefixWord?: string;
  /** Từ đứng sau tiếng chính nếu có (VD: "sách" trong "Cặp sách") */
  suffixWord?: string;
  /** Cụm từ đầy đủ (VD: "Quyển sách") */
  fullPhrase: string;
  /** Hình 3D minh họa */
  imageUrl?: string;
  /** Biểu tượng dự phòng */
  emoji: string;
  /** Câu đọc đánh vần khi bé ghép đúng */
  spokenSuccess: string;
}

/**
 * Kho 108 từ vựng trực quan có hình 3D rõ nét & tách sẵn Phụ âm đầu + Vần có dấu
 * phục vụ trò chơi Ghép Chữ 5 Câu (đổi mới liên tục không trùng lặp giữa các lần học).
 */
export const BLEND_QUIZ_WORD_POOL: BlendQuizWordItem[] = [
  // --- NHÓM ĐỒ DÙNG HỌC TẬP (SCHOOL) ---
  {
    id: "bq-quyen-sach",
    onset: "S",
    rhymeWithTone: "ách",
    targetSyllable: "Sách",
    prefixWord: "Quyển",
    fullPhrase: "Quyển sách",
    imageUrl: "/assets/items/school/school_03.webp",
    emoji: "📖",
    spokenSuccess: "Sờ, ách, sách, sắc, sách! Quyển sách!",
  },
  {
    id: "bq-quyen-sach-1",
    onset: "Qu",
    rhymeWithTone: "yển",
    targetSyllable: "Quyển",
    suffixWord: "sách",
    fullPhrase: "Quyển sách",
    imageUrl: "/assets/items/school/school_03.webp",
    emoji: "📖",
    spokenSuccess: "Quờ, uyên, quyên, hỏi, quyển! Quyển sách!",
  },
  {
    id: "bq-cap-sach",
    onset: "C",
    rhymeWithTone: "ặp",
    targetSyllable: "Cặp",
    suffixWord: "sách",
    fullPhrase: "Cặp sách",
    imageUrl: "/assets/items/school/school_01.webp",
    emoji: "🎒",
    spokenSuccess: "Cờ, ăp, căp, nặng, cặp! Cặp sách!",
  },
  {
    id: "bq-quyen-vo",
    onset: "V",
    rhymeWithTone: "ở",
    targetSyllable: "Vở",
    prefixWord: "Quyển",
    fullPhrase: "Quyển vở",
    imageUrl: "/assets/items/school/school_02.webp",
    emoji: "📓",
    spokenSuccess: "Vờ, ơ, vơ, hỏi, vở! Quyển vở!",
  },
  {
    id: "bq-but-chi",
    onset: "Ch",
    rhymeWithTone: "ì",
    targetSyllable: "Chì",
    prefixWord: "Bút",
    fullPhrase: "Bút chì",
    imageUrl: "/assets/items/school/school_04.webp",
    emoji: "✏️",
    spokenSuccess: "Chờ, i, chi, huyền, chì! Bút chì!",
  },
  {
    id: "bq-cay-but",
    onset: "B",
    rhymeWithTone: "út",
    targetSyllable: "Bút",
    prefixWord: "Cây",
    fullPhrase: "Cây bút",
    imageUrl: "/assets/items/school/school_05.webp",
    emoji: "🖊️",
    spokenSuccess: "Bờ, út, bút, sắc, bút! Cây bút!",
  },
  {
    id: "bq-but-sap",
    onset: "S",
    rhymeWithTone: "áp",
    targetSyllable: "Sáp",
    prefixWord: "Bút",
    fullPhrase: "Bút sáp",
    imageUrl: "/assets/items/school/school_08.webp",
    emoji: "🖍️",
    spokenSuccess: "Sờ, áp, sáp, sắc, sáp! Bút sáp!",
  },
  {
    id: "bq-but-mau",
    onset: "M",
    rhymeWithTone: "àu",
    targetSyllable: "Màu",
    prefixWord: "Bút",
    fullPhrase: "Bút màu",
    imageUrl: "/assets/items/school/school_08.webp",
    emoji: "🖍️",
    spokenSuccess: "Mờ, au, mau, huyền, màu! Bút màu!",
  },
  {
    id: "bq-cay-keo",
    onset: "K",
    rhymeWithTone: "éo",
    targetSyllable: "Kéo",
    prefixWord: "Cây",
    fullPhrase: "Cây kéo",
    imageUrl: "/assets/items/school/school_09.webp",
    emoji: "✂️",
    spokenSuccess: "Kờ, eo, keo, sắc, kéo! Cây kéo!",
  },
  {
    id: "bq-thuoc-ke",
    onset: "Th",
    rhymeWithTone: "ước",
    targetSyllable: "Thước",
    suffixWord: "kẻ",
    fullPhrase: "Thước kẻ",
    imageUrl: "/assets/items/school/school_06.webp",
    emoji: "📏",
    spokenSuccess: "Thờ, ươc, thươc, sắc, thước! Thước kẻ!",
  },
  {
    id: "bq-thuoc-ke-2",
    onset: "K",
    rhymeWithTone: "ẻ",
    targetSyllable: "Kẻ",
    prefixWord: "Thước",
    fullPhrase: "Thước kẻ",
    imageUrl: "/assets/items/school/school_06.webp",
    emoji: "📏",
    spokenSuccess: "Kờ, e, ke, hỏi, kẻ! Thước kẻ!",
  },
  {
    id: "bq-cuc-tay",
    onset: "T",
    rhymeWithTone: "ẩy",
    targetSyllable: "Tẩy",
    prefixWord: "Cục",
    fullPhrase: "Cục tẩy",
    imageUrl: "/assets/items/school/school_07.webp",
    emoji: "🧼",
    spokenSuccess: "Tờ, ây, tây, hỏi, tẩy! Cục tẩy!",
  },
  {
    id: "bq-ho-dan",
    onset: "D",
    rhymeWithTone: "án",
    targetSyllable: "Dán",
    prefixWord: "Hồ",
    fullPhrase: "Hồ dán",
    imageUrl: "/assets/items/school/school_10.webp",
    emoji: "🧴",
    spokenSuccess: "Dờ, an, dan, sắc, dán! Hồ dán!",
  },
  {
    id: "bq-bang-mau",
    onset: "B",
    rhymeWithTone: "ảng",
    targetSyllable: "Bảng",
    suffixWord: "màu",
    fullPhrase: "Bảng màu",
    imageUrl: "/assets/items/school/school_11.webp",
    emoji: "🎨",
    spokenSuccess: "Bờ, ang, bang, hỏi, bảng! Bảng màu!",
  },
  {
    id: "bq-hop-but",
    onset: "H",
    rhymeWithTone: "ộp",
    targetSyllable: "Hộp",
    suffixWord: "bút",
    fullPhrase: "Hộp bút",
    imageUrl: "/assets/items/school/school_12.webp",
    emoji: "👝",
    spokenSuccess: "Hờ, ôp, hôp, nặng, hộp! Hộp bút!",
  },
  {
    id: "bq-may-tinh",
    onset: "T",
    rhymeWithTone: "ính",
    targetSyllable: "Tính",
    prefixWord: "Máy",
    fullPhrase: "Máy tính",
    imageUrl: "/assets/items/school/school_13.webp",
    emoji: "🧮",
    spokenSuccess: "Tờ, inh, tinh, sắc, tính! Máy tính!",
  },
  {
    id: "bq-dia-cau",
    onset: "C",
    rhymeWithTone: "ầu",
    targetSyllable: "Cầu",
    prefixWord: "Địa",
    fullPhrase: "Địa cầu",
    imageUrl: "/assets/items/school/school_15.webp",
    emoji: "🌍",
    spokenSuccess: "Cờ, âu, câu, huyền, cầu! Quả địa cầu!",
  },

  // --- NHÓM TRÁI CÂY TƯƠI MÁT (FRUITS) ---
  {
    id: "bq-qua-chuoi",
    onset: "Ch",
    rhymeWithTone: "uối",
    targetSyllable: "Chuối",
    prefixWord: "Quả",
    fullPhrase: "Quả chuối",
    imageUrl: "/assets/items/fruits/fruit_03.webp",
    emoji: "🍌",
    spokenSuccess: "Chờ, uôi, chuôi, sắc, chuối! Quả chuối!",
  },
  {
    id: "bq-qua-cam",
    onset: "C",
    rhymeWithTone: "am",
    targetSyllable: "Cam",
    prefixWord: "Quả",
    fullPhrase: "Quả cam",
    imageUrl: "/assets/items/fruits/fruit_04.webp",
    emoji: "🍊",
    spokenSuccess: "Cờ, am, cam! Quả cam!",
  },
  {
    id: "bq-qua-tao",
    onset: "T",
    rhymeWithTone: "áo",
    targetSyllable: "Táo",
    prefixWord: "Quả",
    fullPhrase: "Quả táo",
    imageUrl: "/assets/items/fruits/fruit_02.webp",
    emoji: "🍎",
    spokenSuccess: "Tờ, ao, tao, sắc, táo! Quả táo!",
  },
  {
    id: "bq-dau-tay",
    onset: "D",
    rhymeWithTone: "âu",
    targetSyllable: "Dâu",
    suffixWord: "tây",
    fullPhrase: "Dâu tây",
    imageUrl: "/assets/items/fruits/fruit_01.webp",
    emoji: "🍓",
    spokenSuccess: "Dờ, âu, dâu! Quả dâu tây!",
  },
  {
    id: "bq-dau-tay-2",
    onset: "T",
    rhymeWithTone: "ây",
    targetSyllable: "Tây",
    prefixWord: "Dâu",
    fullPhrase: "Dâu tây",
    imageUrl: "/assets/items/fruits/fruit_01.webp",
    emoji: "🍓",
    spokenSuccess: "Tờ, ây, tây! Dâu tây!",
  },
  {
    id: "bq-dua-hau",
    onset: "D",
    rhymeWithTone: "ưa",
    targetSyllable: "Dưa",
    suffixWord: "hấu",
    fullPhrase: "Dưa hấu",
    imageUrl: "/assets/items/fruits/fruit_05.webp",
    emoji: "🍉",
    spokenSuccess: "Dờ, ưa, dưa! Dưa hấu!",
  },
  {
    id: "bq-dua-hau-2",
    onset: "H",
    rhymeWithTone: "ấu",
    targetSyllable: "Hấu",
    prefixWord: "Dưa",
    fullPhrase: "Dưa hấu",
    imageUrl: "/assets/items/fruits/fruit_05.webp",
    emoji: "🍉",
    spokenSuccess: "Hờ, âu, hâu, sắc, hấu! Dưa hấu!",
  },
  {
    id: "bq-chum-nho",
    onset: "Ch",
    rhymeWithTone: "ùm",
    targetSyllable: "Chùm",
    suffixWord: "nho",
    fullPhrase: "Chùm nho",
    imageUrl: "/assets/items/fruits/fruit_06.webp",
    emoji: "🍇",
    spokenSuccess: "Chờ, um, chum, huyền, chùm! Chùm nho!",
  },
  {
    id: "bq-qua-nho",
    onset: "Nh",
    rhymeWithTone: "o",
    targetSyllable: "Nho",
    prefixWord: "Chùm",
    fullPhrase: "Chùm nho",
    imageUrl: "/assets/items/fruits/fruit_06.webp",
    emoji: "🍇",
    spokenSuccess: "Nhờ, o, nho! Chùm nho!",
  },
  {
    id: "bq-qua-le",
    onset: "L",
    rhymeWithTone: "ê",
    targetSyllable: "Lê",
    prefixWord: "Quả",
    fullPhrase: "Quả lê",
    imageUrl: "/assets/items/fruits/fruit_07.webp",
    emoji: "🍐",
    spokenSuccess: "Lờ, ê, lê! Quả lê!",
  },
  {
    id: "bq-qua-dao",
    onset: "Đ",
    rhymeWithTone: "ào",
    targetSyllable: "Đào",
    prefixWord: "Quả",
    fullPhrase: "Quả đào",
    imageUrl: "/assets/items/fruits/fruit_08.webp",
    emoji: "🍑",
    spokenSuccess: "Đờ, ao, đao, huyền, đào! Quả đào!",
  },
  {
    id: "bq-qua-chanh",
    onset: "Ch",
    rhymeWithTone: "anh",
    targetSyllable: "Chanh",
    prefixWord: "Quả",
    fullPhrase: "Quả chanh",
    imageUrl: "/assets/items/fruits/fruit_09.webp",
    emoji: "🍋",
    spokenSuccess: "Chờ, anh, chanh! Quả chanh!",
  },
  {
    id: "bq-viet-quat",
    onset: "V",
    rhymeWithTone: "iệt",
    targetSyllable: "Việt",
    suffixWord: "quất",
    fullPhrase: "Việt quất",
    imageUrl: "/assets/items/fruits/fruit_11.webp",
    emoji: "🫐",
    spokenSuccess: "Vờ, iêt, viêt, nặng, việt! Việt quất!",
  },
  {
    id: "bq-viet-quat-2",
    onset: "Qu",
    rhymeWithTone: "ất",
    targetSyllable: "Quất",
    prefixWord: "Việt",
    fullPhrase: "Việt quất",
    imageUrl: "/assets/items/fruits/fruit_11.webp",
    emoji: "🫐",
    spokenSuccess: "Quờ, uât, quât, sắc, quất! Việt quất!",
  },
  {
    id: "bq-qua-dua",
    onset: "D",
    rhymeWithTone: "ứa",
    targetSyllable: "Dứa",
    prefixWord: "Quả",
    fullPhrase: "Quả dứa",
    imageUrl: "/assets/items/fruits/fruit_12.webp",
    emoji: "🍍",
    spokenSuccess: "Dờ, ưa, dưa, sắc, dứa! Quả dứa!",
  },
  {
    id: "bq-qua-xoai",
    onset: "X",
    rhymeWithTone: "oài",
    targetSyllable: "Xoài",
    prefixWord: "Quả",
    fullPhrase: "Quả xoài",
    imageUrl: "/assets/items/fruits/fruit_13.webp",
    emoji: "🥭",
    spokenSuccess: "Xờ, oai, xoai, huyền, xoài! Quả xoài!",
  },
  {
    id: "bq-qua-bo",
    onset: "B",
    rhymeWithTone: "ơ",
    targetSyllable: "Bơ",
    prefixWord: "Quả",
    fullPhrase: "Quả bơ",
    imageUrl: "/assets/items/fruits/fruit_15.webp",
    emoji: "🥑",
    spokenSuccess: "Bờ, ơ, bơ! Quả bơ!",
  },

  // --- NHÓM ĐỒ DÙNG GIA ĐÌNH (HOME) ---
  {
    id: "bq-chiec-thia",
    onset: "Th",
    rhymeWithTone: "ìa",
    targetSyllable: "Thìa",
    prefixWord: "Chiếc",
    fullPhrase: "Chiếc thìa",
    imageUrl: "/assets/items/home/home_03.webp",
    emoji: "🥄",
    spokenSuccess: "Thờ, ia, thia, huyền, thìa! Chiếc thìa!",
  },
  {
    id: "bq-chiec-dia",
    onset: "Đ",
    rhymeWithTone: "ĩa",
    targetSyllable: "Đĩa",
    prefixWord: "Chiếc",
    fullPhrase: "Chiếc đĩa",
    imageUrl: "/assets/items/home/home_04.webp",
    emoji: "🍽️",
    spokenSuccess: "Đờ, ia, đia, ngã, đĩa! Chiếc đĩa!",
  },
  {
    id: "bq-tach-tra",
    onset: "T",
    rhymeWithTone: "ách",
    targetSyllable: "Tách",
    suffixWord: "trà",
    fullPhrase: "Tách trà",
    imageUrl: "/assets/items/home/home_02.webp",
    emoji: "🍵",
    spokenSuccess: "Tờ, ách, tách, sắc, tách! Tách trà!",
  },
  {
    id: "bq-tach-tra-2",
    onset: "Tr",
    rhymeWithTone: "à",
    targetSyllable: "Trà",
    prefixWord: "Tách",
    fullPhrase: "Tách trà",
    imageUrl: "/assets/items/home/home_02.webp",
    emoji: "🍵",
    spokenSuccess: "Trờ, a, tra, huyền, trà! Tách trà!",
  },
  {
    id: "bq-dong-ho",
    onset: "Đ",
    rhymeWithTone: "ồng",
    targetSyllable: "Đồng",
    suffixWord: "hồ",
    fullPhrase: "Đồng hồ",
    imageUrl: "/assets/items/home/home_05.webp",
    emoji: "⏰",
    spokenSuccess: "Đờ, ông, đông, huyền, đồng! Đồng hồ!",
  },
  {
    id: "bq-dong-ho-2",
    onset: "H",
    rhymeWithTone: "ồ",
    targetSyllable: "Hồ",
    prefixWord: "Đồng",
    fullPhrase: "Đồng hồ",
    imageUrl: "/assets/items/home/home_05.webp",
    emoji: "⏰",
    spokenSuccess: "Hờ, ô, hô, huyền, hồ! Đồng hồ!",
  },
  {
    id: "bq-chiec-goi",
    onset: "G",
    rhymeWithTone: "ối",
    targetSyllable: "Gối",
    prefixWord: "Chiếc",
    fullPhrase: "Chiếc gối",
    imageUrl: "/assets/items/home/home_07.webp",
    emoji: "🛌",
    spokenSuccess: "Gờ, ôi, gôi, sắc, gối! Chiếc gối!",
  },
  {
    id: "bq-bon-tam",
    onset: "T",
    rhymeWithTone: "ắm",
    targetSyllable: "Tắm",
    prefixWord: "Bồn",
    fullPhrase: "Bồn tắm",
    imageUrl: "/assets/items/home/home_08.webp",
    emoji: "🛁",
    spokenSuccess: "Tờ, ăm, tăm, sắc, tắm! Bồn tắm!",
  },
  {
    id: "bq-bon-tam-1",
    onset: "B",
    rhymeWithTone: "ồn",
    targetSyllable: "Bồn",
    suffixWord: "tắm",
    fullPhrase: "Bồn tắm",
    imageUrl: "/assets/items/home/home_08.webp",
    emoji: "🛁",
    spokenSuccess: "Bờ, ôn, bôn, huyền, bồn! Bồn tắm!",
  },
  {
    id: "bq-xa-phong",
    onset: "Ph",
    rhymeWithTone: "òng",
    targetSyllable: "Phòng",
    prefixWord: "Xà",
    fullPhrase: "Xà phòng",
    imageUrl: "/assets/items/home/home_09.webp",
    emoji: "🧴",
    spokenSuccess: "Phờ, ong, phong, huyền, phòng! Xà phòng!",
  },
  {
    id: "bq-khan-mat",
    onset: "Kh",
    rhymeWithTone: "ăn",
    targetSyllable: "Khăn",
    suffixWord: "mặt",
    fullPhrase: "Khăn mặt",
    imageUrl: "/assets/items/home/home_10.webp",
    emoji: "🧖",
    spokenSuccess: "Khờ, ăn, khăn! Khăn mặt!",
  },
  {
    id: "bq-khan-mat-2",
    onset: "M",
    rhymeWithTone: "ặt",
    targetSyllable: "Mặt",
    prefixWord: "Khăn",
    fullPhrase: "Khăn mặt",
    imageUrl: "/assets/items/home/home_10.webp",
    emoji: "🧖",
    spokenSuccess: "Mờ, ăt, măt, nặng, mặt! Khăn mặt!",
  },
  {
    id: "bq-chau-cay",
    onset: "C",
    rhymeWithTone: "ây",
    targetSyllable: "Cây",
    prefixWord: "Chậu",
    fullPhrase: "Chậu cây",
    imageUrl: "/assets/items/home/home_11.webp",
    emoji: "🪴",
    spokenSuccess: "Cờ, ây, cây! Chậu cây!",
  },
  {
    id: "bq-chau-cay-1",
    onset: "Ch",
    rhymeWithTone: "ậu",
    targetSyllable: "Chậu",
    suffixWord: "cây",
    fullPhrase: "Chậu cây",
    imageUrl: "/assets/items/home/home_11.webp",
    emoji: "🪴",
    spokenSuccess: "Chờ, âu, châu, nặng, chậu! Chậu cây!",
  },
  {
    id: "bq-den-ban",
    onset: "Đ",
    rhymeWithTone: "èn",
    targetSyllable: "Đèn",
    suffixWord: "bàn",
    fullPhrase: "Đèn bàn",
    imageUrl: "/assets/items/home/home_01.webp",
    emoji: "💡",
    spokenSuccess: "Đờ, en, đen, huyền, đèn! Đèn bàn!",
  },
  {
    id: "bq-den-ban-2",
    onset: "B",
    rhymeWithTone: "àn",
    targetSyllable: "Bàn",
    prefixWord: "Đèn",
    fullPhrase: "Đèn bàn",
    imageUrl: "/assets/items/home/home_01.webp",
    emoji: "💡",
    spokenSuccess: "Bờ, an, ban, huyền, bàn! Đèn bàn!",
  },
  {
    id: "bq-ghe-dem",
    onset: "Đ",
    rhymeWithTone: "ệm",
    targetSyllable: "Đệm",
    prefixWord: "Ghế",
    fullPhrase: "Ghế đệm",
    imageUrl: "/assets/items/home/home_06.webp",
    emoji: "🛋️",
    spokenSuccess: "Đờ, êm, đêm, nặng, đệm! Ghế đệm!",
  },
  {
    id: "bq-tu-lanh",
    onset: "L",
    rhymeWithTone: "ạnh",
    targetSyllable: "Lạnh",
    prefixWord: "Tủ",
    fullPhrase: "Tủ lạnh",
    imageUrl: "/assets/items/home/home_12.webp",
    emoji: "🧊",
    spokenSuccess: "Lờ, anh, lanh, nặng, lạnh! Tủ lạnh!",
  },
  {
    id: "bq-tu-lanh-1",
    onset: "T",
    rhymeWithTone: "ủ",
    targetSyllable: "Tủ",
    suffixWord: "lạnh",
    fullPhrase: "Tủ lạnh",
    imageUrl: "/assets/items/home/home_12.webp",
    emoji: "🧊",
    spokenSuccess: "Tờ, u, tu, hỏi, tủ! Tủ lạnh!",
  },
  {
    id: "bq-may-giat",
    onset: "Gi",
    rhymeWithTone: "ặt",
    targetSyllable: "Giặt",
    prefixWord: "Máy",
    fullPhrase: "Máy giặt",
    imageUrl: "/assets/items/home/home_13.webp",
    emoji: "🫧",
    spokenSuccess: "Giờ, ăt, giăt, nặng, giặt! Máy giặt!",
  },
  {
    id: "bq-cay-choi",
    onset: "Ch",
    rhymeWithTone: "ổi",
    targetSyllable: "Chổi",
    prefixWord: "Cây",
    fullPhrase: "Cây chổi",
    imageUrl: "/assets/items/home/home_14.webp",
    emoji: "🧹",
    spokenSuccess: "Chờ, ôi, chôi, hỏi, chổi! Cây chổi!",
  },
  {
    id: "bq-binh-tuoi",
    onset: "B",
    rhymeWithTone: "ình",
    targetSyllable: "Bình",
    suffixWord: "tưới",
    fullPhrase: "Bình tưới",
    imageUrl: "/assets/items/home/home_15.webp",
    emoji: "🚿",
    spokenSuccess: "Bờ, inh, binh, huyền, bình! Bình tưới!",
  },
  {
    id: "bq-binh-tuoi-2",
    onset: "T",
    rhymeWithTone: "ưới",
    targetSyllable: "Tưới",
    prefixWord: "Bình",
    fullPhrase: "Bình tưới",
    imageUrl: "/assets/items/home/home_15.webp",
    emoji: "🚿",
    spokenSuccess: "Tờ, ươi, tươi, sắc, tưới! Bình tưới!",
  },

  // --- NHÓM ĐẦU BẾP NHÍ & MÓN ĂN (LIFESKILLS) ---
  {
    id: "bq-thot-go",
    onset: "Th",
    rhymeWithTone: "ớt",
    targetSyllable: "Thớt",
    suffixWord: "gỗ",
    fullPhrase: "Thớt gỗ",
    imageUrl: "/assets/items/lifeskills/lifeskills_01.webp",
    emoji: "🪵",
    spokenSuccess: "Thờ, ơt, thơt, sắc, thớt! Thớt gỗ!",
  },
  {
    id: "bq-thot-go-2",
    onset: "G",
    rhymeWithTone: "ỗ",
    targetSyllable: "Gỗ",
    prefixWord: "Thớt",
    fullPhrase: "Thớt gỗ",
    imageUrl: "/assets/items/lifeskills/lifeskills_01.webp",
    emoji: "🪵",
    spokenSuccess: "Gờ, ô, gô, ngã, gỗ! Thớt gỗ!",
  },
  {
    id: "bq-to-bot",
    onset: "B",
    rhymeWithTone: "ột",
    targetSyllable: "Bột",
    prefixWord: "Trộn",
    fullPhrase: "Trộn bột",
    imageUrl: "/assets/items/lifeskills/lifeskills_02.webp",
    emoji: "🥣",
    spokenSuccess: "Bờ, ôt, bôt, nặng, bột! Trộn bột!",
  },
  {
    id: "bq-hop-sua",
    onset: "S",
    rhymeWithTone: "ữa",
    targetSyllable: "Sữa",
    prefixWord: "Hộp",
    fullPhrase: "Hộp sữa",
    imageUrl: "/assets/items/lifeskills/lifeskills_03.webp",
    emoji: "🥛",
    spokenSuccess: "Sờ, ưa, sưa, ngã, sữa! Hộp sữa!",
  },
  {
    id: "bq-qua-trung",
    onset: "Tr",
    rhymeWithTone: "ứng",
    targetSyllable: "Trứng",
    prefixWord: "Quả",
    fullPhrase: "Quả trứng",
    imageUrl: "/assets/items/lifeskills/lifeskills_04.webp",
    emoji: "🥚",
    spokenSuccess: "Trờ, ưng, trưng, sắc, trứng! Quả trứng!",
  },
  {
    id: "bq-bot-mi",
    onset: "M",
    rhymeWithTone: "ì",
    targetSyllable: "Mì",
    prefixWord: "Bột",
    fullPhrase: "Bột mì",
    imageUrl: "/assets/items/lifeskills/lifeskills_05.webp",
    emoji: "🌾",
    spokenSuccess: "Mờ, i, mi, huyền, mì! Bột mì!",
  },
  {
    id: "bq-ro-rau",
    onset: "R",
    rhymeWithTone: "au",
    targetSyllable: "Rau",
    prefixWord: "Rổ",
    fullPhrase: "Rổ rau",
    imageUrl: "/assets/items/lifeskills/lifeskills_06.webp",
    emoji: "🥦",
    spokenSuccess: "Rờ, au, rau! Rổ rau!",
  },
  {
    id: "bq-ro-rau-1",
    onset: "R",
    rhymeWithTone: "ổ",
    targetSyllable: "Rổ",
    suffixWord: "rau",
    fullPhrase: "Rổ rau",
    imageUrl: "/assets/items/lifeskills/lifeskills_06.webp",
    emoji: "🥦",
    spokenSuccess: "Rờ, ô, rô, hỏi, rổ! Rổ rau!",
  },
  {
    id: "bq-chao-trung",
    onset: "Ch",
    rhymeWithTone: "ảo",
    targetSyllable: "Chảo",
    suffixWord: "trứng",
    fullPhrase: "Chảo trứng",
    imageUrl: "/assets/items/lifeskills/lifeskills_07.webp",
    emoji: "🍳",
    spokenSuccess: "Chờ, ao, chao, hỏi, chảo! Chảo trứng!",
  },
  {
    id: "bq-cai-noi",
    onset: "N",
    rhymeWithTone: "ồi",
    targetSyllable: "Nồi",
    prefixWord: "Cái",
    fullPhrase: "Cái nồi",
    imageUrl: "/assets/items/lifeskills/lifeskills_08.webp",
    emoji: "🍲",
    spokenSuccess: "Nờ, ôi, nôi, huyền, nồi! Cái nồi!",
  },
  {
    id: "bq-xeng-go",
    onset: "X",
    rhymeWithTone: "ẻng",
    targetSyllable: "Xẻng",
    suffixWord: "gỗ",
    fullPhrase: "Xẻng gỗ",
    imageUrl: "/assets/items/lifeskills/lifeskills_09.webp",
    emoji: "🥄",
    spokenSuccess: "Xờ, eng, xeng, hỏi, xẻng! Xẻng gỗ!",
  },
  {
    id: "bq-muoi-canh",
    onset: "C",
    rhymeWithTone: "anh",
    targetSyllable: "Canh",
    prefixWord: "Muôi",
    fullPhrase: "Muôi canh",
    imageUrl: "/assets/items/lifeskills/lifeskills_10.webp",
    emoji: "🥣",
    spokenSuccess: "Cờ, anh, canh! Muôi canh!",
  },
  {
    id: "bq-muong-dong",
    onset: "Đ",
    rhymeWithTone: "ong",
    targetSyllable: "Đong",
    prefixWord: "Muỗng",
    fullPhrase: "Muỗng đong",
    imageUrl: "/assets/items/lifeskills/lifeskills_11.webp",
    emoji: "🥄",
    spokenSuccess: "Đờ, ong, đong! Muỗng đong!",
  },
  {
    id: "bq-tap-de",
    onset: "T",
    rhymeWithTone: "ạp",
    targetSyllable: "Tạp",
    suffixWord: "dề",
    fullPhrase: "Tạp dề",
    imageUrl: "/assets/items/lifeskills/lifeskills_12.webp",
    emoji: "🎽",
    spokenSuccess: "Tờ, ap, tap, nặng, tạp! Tạp dề!",
  },
  {
    id: "bq-can-bot",
    onset: "C",
    rhymeWithTone: "án",
    targetSyllable: "Cán",
    suffixWord: "bột",
    fullPhrase: "Cán bột",
    imageUrl: "/assets/items/lifeskills/lifeskills_13.webp",
    emoji: "🥖",
    spokenSuccess: "Cờ, an, can, sắc, cán! Cây cán bột!",
  },
  {
    id: "bq-khay-banh",
    onset: "Kh",
    rhymeWithTone: "ay",
    targetSyllable: "Khay",
    suffixWord: "bánh",
    fullPhrase: "Khay bánh",
    imageUrl: "/assets/items/lifeskills/lifeskills_14.webp",
    emoji: "🍪",
    spokenSuccess: "Khờ, ay, khay! Khay bánh!",
  },
  {
    id: "bq-gang-tay",
    onset: "G",
    rhymeWithTone: "ăng",
    targetSyllable: "Găng",
    suffixWord: "tay",
    fullPhrase: "Găng tay",
    imageUrl: "/assets/items/lifeskills/lifeskills_17.webp",
    emoji: "🧤",
    spokenSuccess: "Gờ, ăng, găng! Găng tay!",
  },
  {
    id: "bq-may-tron",
    onset: "Tr",
    rhymeWithTone: "ộn",
    targetSyllable: "Trộn",
    prefixWord: "Máy",
    fullPhrase: "Máy trộn",
    imageUrl: "/assets/items/lifeskills/lifeskills_18.webp",
    emoji: "🎛️",
    spokenSuccess: "Trờ, ôn, trôn, nặng, trộn! Máy trộn!",
  },
  {
    id: "bq-bat-com",
    onset: "C",
    rhymeWithTone: "ơm",
    targetSyllable: "Cơm",
    prefixWord: "Bát",
    fullPhrase: "Bát cơm",
    imageUrl: "/assets/items/lifeskills/lifeskills_19.webp",
    emoji: "🍚",
    spokenSuccess: "Cờ, ơm, cơm! Bát cơm!",
  },
  {
    id: "bq-bat-com-1",
    onset: "B",
    rhymeWithTone: "át",
    targetSyllable: "Bát",
    suffixWord: "cơm",
    fullPhrase: "Bát cơm",
    imageUrl: "/assets/items/lifeskills/lifeskills_19.webp",
    emoji: "🍚",
    spokenSuccess: "Bờ, át, bát, sắc, bát! Bát cơm!",
  },
  {
    id: "bq-to-mi",
    onset: "T",
    rhymeWithTone: "ô",
    targetSyllable: "Tô",
    suffixWord: "mì",
    fullPhrase: "Tô mì",
    imageUrl: "/assets/items/lifeskills/lifeskills_20.webp",
    emoji: "🍜",
    spokenSuccess: "Tờ, ô, tô! Tô mì!",
  },
  {
    id: "bq-ga-ran",
    onset: "R",
    rhymeWithTone: "án",
    targetSyllable: "Rán",
    prefixWord: "Gà",
    fullPhrase: "Gà rán",
    imageUrl: "/assets/items/lifeskills/lifeskills_22.webp",
    emoji: "🍗",
    spokenSuccess: "Rờ, an, ran, sắc, rán! Gà rán!",
  },
  {
    id: "bq-ga-ran-1",
    onset: "G",
    rhymeWithTone: "à",
    targetSyllable: "Gà",
    suffixWord: "rán",
    fullPhrase: "Gà rán",
    imageUrl: "/assets/items/lifeskills/lifeskills_22.webp",
    emoji: "🍗",
    spokenSuccess: "Gờ, a, ga, huyền, gà! Gà rán!",
  },

  // --- NHÓM TIỆM BÁNH & ĐỒ UỐNG (SWEETS) ---
  {
    id: "bq-banh-nho",
    onset: "Nh",
    rhymeWithTone: "ỏ",
    targetSyllable: "Nhỏ",
    prefixWord: "Bánh",
    fullPhrase: "Bánh nhỏ",
    imageUrl: "/assets/items/sweets/sweet_01.webp",
    emoji: "🧁",
    spokenSuccess: "Nhờ, o, nho, hỏi, nhỏ! Bánh nhỏ!",
  },
  {
    id: "bq-banh-vong",
    onset: "V",
    rhymeWithTone: "òng",
    targetSyllable: "Vòng",
    prefixWord: "Bánh",
    fullPhrase: "Bánh vòng",
    imageUrl: "/assets/items/sweets/sweet_02.webp",
    emoji: "🍩",
    spokenSuccess: "Vờ, ong, vong, huyền, vòng! Bánh vòng!",
  },
  {
    id: "bq-keo-mut",
    onset: "M",
    rhymeWithTone: "út",
    targetSyllable: "Mút",
    prefixWord: "Kẹo",
    fullPhrase: "Kẹo mút",
    imageUrl: "/assets/items/sweets/sweet_03.webp",
    emoji: "🍭",
    spokenSuccess: "Mờ, út, mút, sắc, mút! Kẹo mút!",
  },
  {
    id: "bq-vien-keo",
    onset: "K",
    rhymeWithTone: "ẹo",
    targetSyllable: "Kẹo",
    prefixWord: "Viên",
    fullPhrase: "Viên kẹo",
    imageUrl: "/assets/items/sweets/sweet_04.webp",
    emoji: "🍬",
    spokenSuccess: "Kờ, eo, keo, nặng, kẹo! Viên kẹo!",
  },
  {
    id: "bq-banh-quy",
    onset: "Qu",
    rhymeWithTone: "y",
    targetSyllable: "Quy",
    prefixWord: "Bánh",
    fullPhrase: "Bánh quy",
    imageUrl: "/assets/items/sweets/sweet_05.webp",
    emoji: "🍪",
    spokenSuccess: "Quờ, uy, quy! Bánh quy!",
  },
  {
    id: "bq-banh-kem",
    onset: "B",
    rhymeWithTone: "ánh",
    targetSyllable: "Bánh",
    suffixWord: "kem",
    fullPhrase: "Bánh kem",
    imageUrl: "/assets/items/sweets/sweet_07.webp",
    emoji: "🍰",
    spokenSuccess: "Bờ, anh, banh, sắc, bánh! Bánh kem!",
  },
  {
    id: "bq-cay-kem",
    onset: "K",
    rhymeWithTone: "em",
    targetSyllable: "Kem",
    prefixWord: "Cây",
    fullPhrase: "Cây kem",
    imageUrl: "/assets/items/sweets/sweet_09.webp",
    emoji: "🍦",
    spokenSuccess: "Kờ, em, kem! Cây kem!",
  },
  {
    id: "bq-kem-que",
    onset: "Qu",
    rhymeWithTone: "e",
    targetSyllable: "Que",
    prefixWord: "Kem",
    fullPhrase: "Kem que",
    imageUrl: "/assets/items/sweets/sweet_10.webp",
    emoji: "🍧",
    spokenSuccess: "Quờ, e, que! Kem que!",
  },
  {
    id: "bq-tra-sua",
    onset: "Tr",
    rhymeWithTone: "à",
    targetSyllable: "Trà",
    suffixWord: "sữa",
    fullPhrase: "Trà sữa",
    imageUrl: "/assets/items/sweets/sweet_11.webp",
    emoji: "🧋",
    spokenSuccess: "Trờ, a, tra, huyền, trà! Trà sữa!",
  },
  {
    id: "bq-nuoc-cam",
    onset: "N",
    rhymeWithTone: "ước",
    targetSyllable: "Nước",
    suffixWord: "cam",
    fullPhrase: "Nước cam",
    imageUrl: "/assets/items/sweets/sweet_13.webp",
    emoji: "🧃",
    spokenSuccess: "Nờ, ươc, nươc, sắc, nước! Nước cam!",
  },
  {
    id: "bq-cai-coc",
    onset: "C",
    rhymeWithTone: "ốc",
    targetSyllable: "Cốc",
    prefixWord: "Cái",
    fullPhrase: "Cái cốc",
    imageUrl: "/assets/items/sweets/sweet_14.webp",
    emoji: "☕",
    spokenSuccess: "Cờ, ôc, côc, sắc, cốc! Cái cốc!",
  },
  {
    id: "bq-keo-ngot",
    onset: "Ng",
    rhymeWithTone: "ọt",
    targetSyllable: "Ngọt",
    prefixWord: "Kẹo",
    fullPhrase: "Kẹo ngọt",
    imageUrl: "/assets/items/sweets/sweet_04.webp",
    emoji: "🍬",
    spokenSuccess: "Ngờ, ot, ngot, nặng, ngọt! Kẹo ngọt!",
  },
  {
    id: "bq-banh-cuon",
    onset: "C",
    rhymeWithTone: "uộn",
    targetSyllable: "Cuộn",
    prefixWord: "Bánh",
    fullPhrase: "Bánh cuộn",
    imageUrl: "/assets/math/pastries16/pastry16_05.webp",
    emoji: "🍰",
    spokenSuccess: "Cờ, uôn, cuôn, nặng, cuộn! Bánh cuộn!",
  },
  {
    id: "bq-banh-mi",
    onset: "M",
    rhymeWithTone: "ì",
    targetSyllable: "Mì",
    prefixWord: "Bánh",
    fullPhrase: "Bánh mì",
    imageUrl: "/assets/math/pastries16/pastry16_10.webp",
    emoji: "🍞",
    spokenSuccess: "Mờ, i, mi, huyền, mì! Bánh mì!",
  },
  {
    id: "bq-sung-bo",
    onset: "S",
    rhymeWithTone: "ừng",
    targetSyllable: "Sừng",
    suffixWord: "bò",
    fullPhrase: "Sừng bò",
    imageUrl: "/assets/math/pastries16/pastry16_11.webp",
    emoji: "🥐",
    spokenSuccess: "Sờ, ưng, sưng, huyền, sừng! Bánh sừng bò!",
  },
  {
    id: "bq-trai-tim",
    onset: "T",
    rhymeWithTone: "im",
    targetSyllable: "Tim",
    prefixWord: "Trái",
    fullPhrase: "Trái tim",
    imageUrl: "/assets/math/pastries16/pastry16_12.webp",
    emoji: "🍪",
    spokenSuccess: "Tờ, im, tim! Bánh trái tim!",
  },
  {
    id: "bq-con-so",
    onset: "S",
    rhymeWithTone: "ò",
    targetSyllable: "Sò",
    prefixWord: "Bánh",
    fullPhrase: "Bánh sò",
    imageUrl: "/assets/math/pastries16/pastry16_14.webp",
    emoji: "🥮",
    spokenSuccess: "Sờ, o, so, huyền, sò! Bánh con sò!",
  },
  {
    id: "bq-banh-vuong",
    onset: "V",
    rhymeWithTone: "uông",
    targetSyllable: "Vuông",
    prefixWord: "Bánh",
    fullPhrase: "Bánh vuông",
    imageUrl: "/assets/math/pastries16/pastry16_15.webp",
    emoji: "🍰",
    spokenSuccess: "Vờ, uông, vuông! Bánh kem vuông!",
  },
  {
    id: "bq-banh-kep",
    onset: "K",
    rhymeWithTone: "ẹp",
    targetSyllable: "Kẹp",
    prefixWord: "Bánh",
    fullPhrase: "Bánh kẹp",
    imageUrl: "/assets/items/lifeskills/lifeskills_21.webp",
    emoji: "🍔",
    spokenSuccess: "Kờ, ep, kep, nặng, kẹp! Bánh kẹp!",
  },

  // --- NHÓM PHƯƠNG TIỆN & BẠN THÚ (VEHICLES & ANIMALS) ---
  {
    id: "bq-o-to",
    onset: "T",
    rhymeWithTone: "ô",
    targetSyllable: "Tô",
    prefixWord: "Ô",
    fullPhrase: "Ô tô",
    imageUrl: "/assets/items/vehicles/vehicle_01.webp",
    emoji: "🚗",
    spokenSuccess: "Tờ, ô, tô! Ô tô!",
  },
  {
    id: "bq-xe-dap",
    onset: "Đ",
    rhymeWithTone: "ạp",
    targetSyllable: "Đạp",
    prefixWord: "Xe",
    fullPhrase: "Xe đạp",
    imageUrl: "/assets/items/vehicles/vehicle_03.webp",
    emoji: "🚲",
    spokenSuccess: "Đờ, ap, đap, nặng, đạp! Xe đạp!",
  },
  {
    id: "bq-xe-may",
    onset: "M",
    rhymeWithTone: "áy",
    targetSyllable: "Máy",
    prefixWord: "Xe",
    fullPhrase: "Xe máy",
    imageUrl: "/assets/items/vehicles/vehicle_04.webp",
    emoji: "🛵",
    spokenSuccess: "Mờ, ay, may, sắc, máy! Xe máy!",
  },
  {
    id: "bq-tau-hoa",
    onset: "T",
    rhymeWithTone: "àu",
    targetSyllable: "Tàu",
    suffixWord: "hỏa",
    fullPhrase: "Tàu hỏa",
    imageUrl: "/assets/items/vehicles/vehicle_05.webp",
    emoji: "🚂",
    spokenSuccess: "Tờ, au, tau, huyền, tàu! Tàu hỏa!",
  },
  {
    id: "bq-tau-hoa-2",
    onset: "H",
    rhymeWithTone: "ỏa",
    targetSyllable: "Hỏa",
    prefixWord: "Tàu",
    fullPhrase: "Tàu hỏa",
    imageUrl: "/assets/items/vehicles/vehicle_05.webp",
    emoji: "🚂",
    spokenSuccess: "Hờ, oa, hoa, hỏi, hỏa! Tàu hỏa!",
  },
  {
    id: "bq-may-bay",
    onset: "B",
    rhymeWithTone: "ay",
    targetSyllable: "Bay",
    prefixWord: "Máy",
    fullPhrase: "Máy bay",
    imageUrl: "/assets/items/vehicles/vehicle_06.webp",
    emoji: "✈️",
    spokenSuccess: "Bờ, ay, bay! Máy bay!",
  },
  {
    id: "bq-truc-thang",
    onset: "Th",
    rhymeWithTone: "ăng",
    targetSyllable: "Thăng",
    prefixWord: "Trực",
    fullPhrase: "Trực thăng",
    imageUrl: "/assets/items/vehicles/vehicle_07.webp",
    emoji: "🚁",
    spokenSuccess: "Thờ, ăng, thăng! Trực thăng!",
  },
  {
    id: "bq-xe-buyt",
    onset: "B",
    rhymeWithTone: "uýt",
    targetSyllable: "Buýt",
    prefixWord: "Xe",
    fullPhrase: "Xe buýt",
    imageUrl: "/assets/items/vehicles/vehicle_02.webp",
    emoji: "🚌",
    spokenSuccess: "Bờ, uyt, buyt, sắc, buýt! Xe buýt!",
  },
  {
    id: "bq-thuyen-buom",
    onset: "B",
    rhymeWithTone: "uồm",
    targetSyllable: "Buồm",
    prefixWord: "Thuyền",
    fullPhrase: "Thuyền buồm",
    imageUrl: "/assets/items/vehicles/vehicle_08.webp",
    emoji: "⛵",
    spokenSuccess: "Bờ, uôm, buôm, huyền, buồm! Thuyền buồm!",
  },
  {
    id: "bq-thuyen-buom-1",
    onset: "Th",
    rhymeWithTone: "uyền",
    targetSyllable: "Thuyền",
    suffixWord: "buồm",
    fullPhrase: "Thuyền buồm",
    imageUrl: "/assets/items/vehicles/vehicle_08.webp",
    emoji: "⛵",
    spokenSuccess: "Thờ, uyên, thuyên, huyền, thuyền! Thuyền buồm!",
  },
  {
    id: "bq-tau-ngam",
    onset: "Ng",
    rhymeWithTone: "ầm",
    targetSyllable: "Ngầm",
    prefixWord: "Tàu",
    fullPhrase: "Tàu ngầm",
    imageUrl: "/assets/items/vehicles/vehicle_09.webp",
    emoji: "🚤",
    spokenSuccess: "Ngờ, âm, ngâm, huyền, ngầm! Tàu ngầm!",
  },
  {
    id: "bq-ten-lua",
    onset: "L",
    rhymeWithTone: "ửa",
    targetSyllable: "Lửa",
    prefixWord: "Tên",
    fullPhrase: "Tên lửa",
    imageUrl: "/assets/items/vehicles/vehicle_10.webp",
    emoji: "🚀",
    spokenSuccess: "Lờ, ưa, lưa, hỏi, lửa! Tên lửa!",
  },
  {
    id: "bq-ten-lua-1",
    onset: "T",
    rhymeWithTone: "ên",
    targetSyllable: "Tên",
    suffixWord: "lửa",
    fullPhrase: "Tên lửa",
    imageUrl: "/assets/items/vehicles/vehicle_10.webp",
    emoji: "🚀",
    spokenSuccess: "Tờ, ên, tên! Tên lửa!",
  },
  {
    id: "bq-cuu-hoa",
    onset: "C",
    rhymeWithTone: "ứu",
    targetSyllable: "Cứu",
    suffixWord: "hỏa",
    fullPhrase: "Cứu hỏa",
    imageUrl: "/assets/items/vehicles/vehicle_11.webp",
    emoji: "🚒",
    spokenSuccess: "Cờ, ưu, cưu, sắc, cứu! Xe cứu hỏa!",
  },
  {
    id: "bq-canh-sat",
    onset: "S",
    rhymeWithTone: "át",
    targetSyllable: "Sát",
    prefixWord: "Cảnh",
    fullPhrase: "Cảnh sát",
    imageUrl: "/assets/items/vehicles/vehicle_12.webp",
    emoji: "🚓",
    spokenSuccess: "Sờ, át, sát, sắc, sát! Xe cảnh sát!",
  },
  {
    id: "bq-cuu-thuong",
    onset: "Th",
    rhymeWithTone: "ương",
    targetSyllable: "Thương",
    prefixWord: "Cứu",
    fullPhrase: "Cứu thương",
    imageUrl: "/assets/items/vehicles/vehicle_13.webp",
    emoji: "🚑",
    spokenSuccess: "Thờ, ương, thương! Xe cứu thương!",
  },
  {
    id: "bq-khi-cau",
    onset: "Kh",
    rhymeWithTone: "í",
    targetSyllable: "Khí",
    suffixWord: "cầu",
    fullPhrase: "Khí cầu",
    imageUrl: "/assets/items/vehicles/vehicle_14.webp",
    emoji: "🎈",
    spokenSuccess: "Khờ, i, khi, sắc, khí! Khinh khí cầu!",
  },
  {
    id: "bq-van-truot",
    onset: "Tr",
    rhymeWithTone: "ượt",
    targetSyllable: "Trượt",
    prefixWord: "Ván",
    fullPhrase: "Ván trượt",
    imageUrl: "/assets/items/vehicles/vehicle_15.webp",
    emoji: "🛹",
    spokenSuccess: "Trờ, ươt, trươt, nặng, trượt! Ván trượt!",
  },
  {
    id: "bq-van-truot-1",
    onset: "V",
    rhymeWithTone: "án",
    targetSyllable: "Ván",
    suffixWord: "trượt",
    fullPhrase: "Ván trượt",
    imageUrl: "/assets/items/vehicles/vehicle_15.webp",
    emoji: "🛹",
    spokenSuccess: "Vờ, an, van, sắc, ván! Ván trượt!",
  },
  {
    id: "bq-con-meo",
    onset: "M",
    rhymeWithTone: "èo",
    targetSyllable: "Mèo",
    prefixWord: "Con",
    fullPhrase: "Con mèo",
    imageUrl: "/assets/english/items/animal_05_cat.webp",
    emoji: "🐱",
    spokenSuccess: "Mờ, eo, meo, huyền, mèo! Con mèo!",
  },
  {
    id: "bq-con-cho",
    onset: "Ch",
    rhymeWithTone: "ó",
    targetSyllable: "Chó",
    prefixWord: "Con",
    fullPhrase: "Con chó",
    imageUrl: "/assets/english/items/animal_06_dog.webp",
    emoji: "🐶",
    spokenSuccess: "Chờ, o, cho, sắc, chó! Con chó!",
  },
  {
    id: "bq-con-tho",
    onset: "Th",
    rhymeWithTone: "ỏ",
    targetSyllable: "Thỏ",
    prefixWord: "Con",
    fullPhrase: "Con thỏ",
    imageUrl: "/assets/english/items/animal_07_rabbit.webp",
    emoji: "🐰",
    spokenSuccess: "Thờ, o, tho, hỏi, thỏ! Con thỏ!",
  },
  {
    id: "bq-con-vit",
    onset: "V",
    rhymeWithTone: "ịt",
    targetSyllable: "Vịt",
    prefixWord: "Con",
    fullPhrase: "Con vịt",
    imageUrl: "/assets/english/items/animal_08_duck.webp",
    emoji: "🦆",
    spokenSuccess: "Vờ, it, vit, nặng, vịt! Con vịt!",
  },
  {
    id: "bq-gau-bong",
    onset: "G",
    rhymeWithTone: "ấu",
    targetSyllable: "Gấu",
    suffixWord: "bông",
    fullPhrase: "Gấu bông",
    imageUrl: "/assets/english/items/toy_01_teddy.webp",
    emoji: "🧸",
    spokenSuccess: "Gờ, âu, gâu, sắc, gấu! Gấu bông!",
  },
  {
    id: "bq-gau-bong-2",
    onset: "B",
    rhymeWithTone: "ông",
    targetSyllable: "Bông",
    prefixWord: "Gấu",
    fullPhrase: "Gấu bông",
    imageUrl: "/assets/english/items/toy_01_teddy.webp",
    emoji: "🧸",
    spokenSuccess: "Bờ, ông, bông! Gấu bông!",
  },
  {
    id: "bq-ngoi-sao",
    onset: "S",
    rhymeWithTone: "ao",
    targetSyllable: "Sao",
    prefixWord: "Ngôi",
    fullPhrase: "Ngôi sao",
    imageUrl: "/assets/english/items/toy_04_star.webp",
    emoji: "⭐",
    spokenSuccess: "Sờ, ao, sao! Ngôi sao!",
  },
  {
    id: "bq-ngoi-sao-1",
    onset: "Ng",
    rhymeWithTone: "ôi",
    targetSyllable: "Ngôi",
    suffixWord: "sao",
    fullPhrase: "Ngôi sao",
    imageUrl: "/assets/english/items/toy_04_star.webp",
    emoji: "⭐",
    spokenSuccess: "Ngờ, ôi, ngôi! Ngôi sao!",
  },
  {
    id: "bq-qua-bong",
    onset: "B",
    rhymeWithTone: "óng",
    targetSyllable: "Bóng",
    prefixWord: "Quả",
    fullPhrase: "Quả bóng",
    imageUrl: "/assets/english/items/color_15_ball_red.webp",
    emoji: "⚽",
    spokenSuccess: "Bờ, ong, bong, sắc, bóng! Quả bóng!",
  },
  {
    id: "bq-chiec-vay",
    onset: "V",
    rhymeWithTone: "áy",
    targetSyllable: "Váy",
    prefixWord: "Chiếc",
    fullPhrase: "Chiếc váy",
    imageUrl: "/assets/english/items/shop_13_dress_pink.webp",
    emoji: "👗",
    spokenSuccess: "Vờ, ay, vay, sắc, váy! Chiếc váy!",
  },
  {
    id: "bq-doi-giay",
    onset: "Gi",
    rhymeWithTone: "ày",
    targetSyllable: "Giày",
    prefixWord: "Đôi",
    fullPhrase: "Đôi giày",
    imageUrl: "/assets/english/items/toy_02_shoes.webp",
    emoji: "👟",
    spokenSuccess: "Giờ, ay, giay, huyền, giày! Đôi giày!",
  },
  {
    id: "bq-chiec-mu",
    onset: "M",
    rhymeWithTone: "ũ",
    targetSyllable: "Mũ",
    prefixWord: "Chiếc",
    fullPhrase: "Chiếc mũ",
    imageUrl: "/assets/english/items/shop_10_hat_yellow.webp",
    emoji: "👒",
    spokenSuccess: "Mờ, u, mu, ngã, mũ! Chiếc mũ!",
  },

  // --- NHÓM BÉ NẤM: THÚ CƯNG, MÓN ĂN & THÓI QUEN HÀNG NGÀY ---
  {
    id: "bq-nam-gau-truc",
    onset: "Tr",
    rhymeWithTone: "úc",
    targetSyllable: "Trúc",
    prefixWord: "Gấu",
    fullPhrase: "Gấu trúc",
    imageUrl: "/assets/nam-stickers/nam-hug-panda.webp",
    emoji: "🐼",
    spokenSuccess: "Trờ, úc, trúc, sắc, trúc! Gấu trúc!",
  },
  {
    id: "bq-nam-gau-trang",
    onset: "Tr",
    rhymeWithTone: "ắng",
    targetSyllable: "Trắng",
    prefixWord: "Gấu",
    fullPhrase: "Gấu trắng",
    imageUrl: "/assets/nam-stickers/nam-hug-whitebear.webp",
    emoji: "🐻‍❄️",
    spokenSuccess: "Trờ, ăng, trăng, sắc, trắng! Gấu trắng!",
  },
  {
    id: "bq-nam-ga-con",
    onset: "G",
    rhymeWithTone: "à",
    targetSyllable: "Gà",
    suffixWord: "con",
    fullPhrase: "Gà con",
    imageUrl: "/assets/nam-stickers/nam-hug-chick.webp",
    emoji: "🐥",
    spokenSuccess: "Gờ, a, ga, huyền, gà! Gà con!",
  },
  {
    id: "bq-nam-khung-long",
    onset: "Kh",
    rhymeWithTone: "ủng",
    targetSyllable: "Khủng",
    suffixWord: "long",
    fullPhrase: "Khủng long",
    imageUrl: "/assets/nam-stickers/nam-hug-dino.webp",
    emoji: "🦖",
    spokenSuccess: "Khờ, ung, khung, hỏi, khủng! Khủng long!",
  },
  {
    id: "bq-nam-cun-con",
    onset: "C",
    rhymeWithTone: "ún",
    targetSyllable: "Cún",
    suffixWord: "con",
    fullPhrase: "Cún con",
    imageUrl: "/assets/nam-stickers/nam-hug-puppy.webp",
    emoji: "🐶",
    spokenSuccess: "Cờ, un, cun, sắc, cún! Cún con!",
  },
  {
    id: "bq-nam-canh-cut",
    onset: "C",
    rhymeWithTone: "ụt",
    targetSyllable: "Cụt",
    prefixWord: "Cánh",
    fullPhrase: "Cánh cụt",
    imageUrl: "/assets/nam-stickers/nam-hug-penguin.webp",
    emoji: "🐧",
    spokenSuccess: "Cờ, ut, cut, nặng, cụt! Chim cánh cụt!",
  },
  {
    id: "bq-nam-khoai-tay",
    onset: "Kh",
    rhymeWithTone: "oai",
    targetSyllable: "Khoai",
    suffixWord: "tây",
    fullPhrase: "Khoai tây",
    imageUrl: "/assets/nam-stickers/nam-eat-fries.webp",
    emoji: "🍟",
    spokenSuccess: "Khờ, oai, khoai! Khoai tây chiên!",
  },
  {
    id: "bq-nam-banh-nuong",
    onset: "N",
    rhymeWithTone: "ướng",
    targetSyllable: "Nướng",
    prefixWord: "Bánh",
    fullPhrase: "Bánh nướng",
    imageUrl: "/assets/nam-stickers/nam-eat-pizza.webp",
    emoji: "🍕",
    spokenSuccess: "Nờ, ương, nương, sắc, nướng! Bánh nướng Pizza!",
  },
  {
    id: "bq-nam-thuc-day",
    onset: "D",
    rhymeWithTone: "ậy",
    targetSyllable: "Dậy",
    prefixWord: "Thức",
    fullPhrase: "Thức dậy",
    imageUrl: "/assets/nam-stickers/nam-routine-wakeup.webp",
    emoji: "⏰",
    spokenSuccess: "Dờ, ây, dây, nặng, dậy! Bé thức dậy sớm!",
  },
  {
    id: "bq-nam-ngu-ngon",
    onset: "Ng",
    rhymeWithTone: "ủ",
    targetSyllable: "Ngủ",
    suffixWord: "ngon",
    fullPhrase: "Ngủ ngon",
    imageUrl: "/assets/nam-stickers/nam-routine-sleep.webp",
    emoji: "😴",
    spokenSuccess: "Ngờ, u, ngu, hỏi, ngủ! Bé ngủ ngon!",
  },
  {
    id: "bq-nam-di-hoc",
    onset: "H",
    rhymeWithTone: "ọc",
    targetSyllable: "Học",
    prefixWord: "Đi",
    fullPhrase: "Đi học",
    imageUrl: "/assets/nam-stickers/nam-routine-school-run.webp",
    emoji: "🎒",
    spokenSuccess: "Hờ, oc, hoc, nặng, học! Bé đi học!",
  },
  {
    id: "bq-nam-the-duc",
    onset: "D",
    rhymeWithTone: "ục",
    targetSyllable: "Dục",
    prefixWord: "Thể",
    fullPhrase: "Thể dục",
    imageUrl: "/assets/nam-stickers/nam-routine-exercise.webp",
    emoji: "🤸",
    spokenSuccess: "Dờ, uc, duc, nặng, dục! Tập thể dục!",
  },
  {
    id: "bq-nam-thu-cong",
    onset: "C",
    rhymeWithTone: "ông",
    targetSyllable: "Công",
    prefixWord: "Thủ",
    fullPhrase: "Thủ công",
    imageUrl: "/assets/nam-stickers/nam-routine-craft.webp",
    emoji: "✂️",
    spokenSuccess: "Cờ, ông, công! Làm thủ công!",
  },
  {
    id: "bq-nam-viet-bai",
    onset: "V",
    rhymeWithTone: "iết",
    targetSyllable: "Viết",
    suffixWord: "bài",
    fullPhrase: "Viết bài",
    imageUrl: "/assets/nam-stickers/nam-routine-homework.webp",
    emoji: "✍️",
    spokenSuccess: "Vờ, iêt, viêt, sắc, viết! Bé viết bài!",
  },
  {
    id: "bq-nam-vay-chao",
    onset: "Ch",
    rhymeWithTone: "ào",
    targetSyllable: "Chào",
    prefixWord: "Vẫy",
    fullPhrase: "Vẫy chào",
    imageUrl: "/assets/nam-stickers/nam-routine-hello.webp",
    emoji: "👋",
    spokenSuccess: "Chờ, ao, chao, huyền, chào! Vẫy tay chào!",
  },
  {
    id: "bq-nam-suy-nghi",
    onset: "Ngh",
    rhymeWithTone: "ĩ",
    targetSyllable: "Nghĩ",
    prefixWord: "Suy",
    fullPhrase: "Suy nghĩ",
    imageUrl: "/assets/nam-stickers/nam-study-think.webp",
    emoji: "💡",
    spokenSuccess: "Nghờ, i, nghi, ngã, nghĩ! Suy nghĩ!",
  },
  {
    id: "bq-nam-diem-muoi",
    onset: "Đ",
    rhymeWithTone: "iểm",
    targetSyllable: "Điểm",
    suffixWord: "mười",
    fullPhrase: "Điểm mười",
    imageUrl: "/assets/nam-stickers/nam-study-100pts.webp",
    emoji: "💯",
    spokenSuccess: "Đờ, iêm, điêm, hỏi, điểm! Điểm mười giỏi!",
  },
  {
    id: "bq-nam-tot-nghiep",
    onset: "T",
    rhymeWithTone: "ốt",
    targetSyllable: "Tốt",
    suffixWord: "nghiệp",
    fullPhrase: "Tốt nghiệp",
    imageUrl: "/assets/nam-stickers/nam-study-graduate.webp",
    emoji: "🎓",
    spokenSuccess: "Tờ, ôt, tôt, sắc, tốt! Lễ tốt nghiệp!",
  },
  {
    id: "bq-nam-da-bong",
    onset: "Đ",
    rhymeWithTone: "á",
    targetSyllable: "Đá",
    suffixWord: "bóng",
    fullPhrase: "Đá bóng",
    imageUrl: "/assets/nam-stickers/nam-sub-soccer.webp",
    emoji: "⚽",
    spokenSuccess: "Đờ, a, đa, sắc, đá! Đá bóng!",
  },
  {
    id: "bq-nam-am-nhac",
    onset: "Nh",
    rhymeWithTone: "ạc",
    targetSyllable: "Nhạc",
    prefixWord: "Âm",
    fullPhrase: "Âm nhạc",
    imageUrl: "/assets/nam-stickers/nam-sub-music.webp",
    emoji: "🎵",
    spokenSuccess: "Nhờ, ac, nhac, nặng, nhạc! Âm nhạc!",
  },
  {
    id: "bq-nam-thi-nghiem",
    onset: "Th",
    rhymeWithTone: "í",
    targetSyllable: "Thí",
    suffixWord: "nghiệm",
    fullPhrase: "Thí nghiệm",
    imageUrl: "/assets/nam-stickers/nam-sub-science.webp",
    emoji: "🧪",
    spokenSuccess: "Thờ, i, thi, sắc, thí! Làm thí nghiệm!",
  },
  {
    id: "bq-nam-trong-cay",
    onset: "Tr",
    rhymeWithTone: "ồng",
    targetSyllable: "Trồng",
    suffixWord: "cây",
    fullPhrase: "Trồng cây",
    imageUrl: "/assets/nam-stickers/nam-sub-planting.webp",
    emoji: "🌱",
    spokenSuccess: "Trờ, ông, trông, huyền, trồng! Trồng cây xanh!",
  },
  {
    id: "bq-nam-lich-su",
    onset: "S",
    rhymeWithTone: "ử",
    targetSyllable: "Sử",
    prefixWord: "Lịch",
    fullPhrase: "Lịch sử",
    imageUrl: "/assets/nam-stickers/nam-sub-history.webp",
    emoji: "🏛️",
    spokenSuccess: "Sờ, ư, sư, hỏi, sử! Môn lịch sử!",
  },

  // --- NHÓM NGHỀ NGHIỆP (CAREERS) ---
  {
    id: "bq-career-co-giao",
    onset: "Gi",
    rhymeWithTone: "áo",
    targetSyllable: "Giáo",
    prefixWord: "Cô",
    fullPhrase: "Cô giáo",
    imageUrl: "/assets/stickers/careers/career_01.webp",
    emoji: "👩‍🏫",
    spokenSuccess: "Giờ, ao, giao, sắc, giáo! Cô giáo!",
  },
  {
    id: "bq-career-y-ta",
    onset: "T",
    rhymeWithTone: "á",
    targetSyllable: "Tá",
    prefixWord: "Y",
    fullPhrase: "Y tá",
    imageUrl: "/assets/stickers/careers/career_02.webp",
    emoji: "👩‍⚕️",
    spokenSuccess: "Tờ, a, ta, sắc, tá! Cô y tá!",
  },
  {
    id: "bq-career-dau-bep",
    onset: "B",
    rhymeWithTone: "ếp",
    targetSyllable: "Bếp",
    prefixWord: "Đầu",
    fullPhrase: "Đầu bếp",
    imageUrl: "/assets/stickers/careers/career_03.webp",
    emoji: "👨‍🍳",
    spokenSuccess: "Bờ, êp, bêp, sắc, bếp! Đầu bếp!",
  },
  {
    id: "bq-career-hoa-si",
    onset: "H",
    rhymeWithTone: "ọa",
    targetSyllable: "Họa",
    suffixWord: "sĩ",
    fullPhrase: "Họa sĩ",
    imageUrl: "/assets/stickers/careers/career_04.webp",
    emoji: "🎨",
    spokenSuccess: "Hờ, oa, hoa, nặng, họa! Họa sĩ!",
  },
  {
    id: "bq-career-ky-su",
    onset: "S",
    rhymeWithTone: "ư",
    targetSyllable: "Sư",
    prefixWord: "Kỹ",
    fullPhrase: "Kỹ sư",
    imageUrl: "/assets/stickers/careers/career_05.webp",
    emoji: "👷",
    spokenSuccess: "Sờ, ư, sư! Chú kỹ sư!",
  },
  {
    id: "bq-career-canh-sat",
    onset: "C",
    rhymeWithTone: "ảnh",
    targetSyllable: "Cảnh",
    suffixWord: "sát",
    fullPhrase: "Cảnh sát",
    imageUrl: "/assets/stickers/careers/career_06.webp",
    emoji: "👮",
    spokenSuccess: "Cờ, anh, canh, hỏi, cảnh! Chú cảnh sát!",
  },
  {
    id: "bq-career-phi-cong",
    onset: "Ph",
    rhymeWithTone: "i",
    targetSyllable: "Phi",
    suffixWord: "công",
    fullPhrase: "Phi công",
    imageUrl: "/assets/stickers/careers/career_07.webp",
    emoji: "✈️",
    spokenSuccess: "Phờ, i, phi! Chú phi công!",
  },
  {
    id: "bq-career-thuyen-truong",
    onset: "Tr",
    rhymeWithTone: "ưởng",
    targetSyllable: "Trưởng",
    prefixWord: "Thuyền",
    fullPhrase: "Thuyền trưởng",
    imageUrl: "/assets/stickers/careers/career_08.webp",
    emoji: "⚓",
    spokenSuccess: "Trờ, ương, trương, hỏi, trưởng! Thuyền trưởng!",
  },
  {
    id: "bq-career-giam-doc",
    onset: "Đ",
    rhymeWithTone: "ốc",
    targetSyllable: "Đốc",
    prefixWord: "Giám",
    fullPhrase: "Giám đốc",
    imageUrl: "/assets/stickers/careers/career_09.webp",
    emoji: "💼",
    spokenSuccess: "Đờ, ôc, đôc, sắc, đốc! Giám đốc!",
  },
  {
    id: "bq-career-phong-vien",
    onset: "Ph",
    rhymeWithTone: "óng",
    targetSyllable: "Phóng",
    suffixWord: "viên",
    fullPhrase: "Phóng viên",
    imageUrl: "/assets/stickers/careers/career_10.webp",
    emoji: "📸",
    spokenSuccess: "Phờ, ong, phong, sắc, phóng! Phóng viên!",
  },
  {
    id: "bq-career-nhiep-anh",
    onset: "Nh",
    rhymeWithTone: "iếp",
    targetSyllable: "Nhiếp",
    suffixWord: "ảnh",
    fullPhrase: "Nhiếp ảnh",
    imageUrl: "/assets/stickers/careers/career_11.webp",
    emoji: "📷",
    spokenSuccess: "Nhờ, iêp, nhiêp, sắc, nhiếp! Nhiếp ảnh!",
  },
  {
    id: "bq-career-pha-che",
    onset: "Ph",
    rhymeWithTone: "a",
    targetSyllable: "Pha",
    suffixWord: "chế",
    fullPhrase: "Pha chế",
    imageUrl: "/assets/stickers/careers/career_13.webp",
    emoji: "☕",
    spokenSuccess: "Phờ, a, pha! Pha chế đồ uống!",
  },
  {
    id: "bq-career-tiem-hoa",
    onset: "T",
    rhymeWithTone: "iệm",
    targetSyllable: "Tiệm",
    suffixWord: "hoa",
    fullPhrase: "Tiệm hoa",
    imageUrl: "/assets/stickers/careers/career_14.webp",
    emoji: "💐",
    spokenSuccess: "Tờ, iêm, tiêm, nặng, tiệm! Tiệm hoa tươi!",
  },
  {
    id: "bq-career-bac-si",
    onset: "B",
    rhymeWithTone: "ác",
    targetSyllable: "Bác",
    suffixWord: "sĩ",
    fullPhrase: "Bác sĩ",
    imageUrl: "/assets/stickers/careers/career_15.webp",
    emoji: "🩺",
    spokenSuccess: "Bờ, ác, bác, sắc, bác! Bác sĩ!",
  },
  {
    id: "bq-career-cuu-ho",
    onset: "H",
    rhymeWithTone: "ộ",
    targetSyllable: "Hộ",
    prefixWord: "Cứu",
    fullPhrase: "Cứu hộ",
    imageUrl: "/assets/stickers/careers/career_16.webp",
    emoji: "🛟",
    spokenSuccess: "Hờ, ô, hô, nặng, hộ! Đội cứu hộ!",
  },
  {
    id: "bq-career-khoa-hoc",
    onset: "Kh",
    rhymeWithTone: "oa",
    targetSyllable: "Khoa",
    suffixWord: "học",
    fullPhrase: "Khoa học",
    imageUrl: "/assets/stickers/careers/career_20.webp",
    emoji: "🔬",
    spokenSuccess: "Khờ, oa, khoa! Nhà khoa học!",
  },

  // --- NHÓM ĐẤT NƯỚC & VĂN HÓA (COUNTRIES) ---
  {
    id: "bq-country-nhat-ban",
    onset: "Nh",
    rhymeWithTone: "ật",
    targetSyllable: "Nhật",
    suffixWord: "Bản",
    fullPhrase: "Nhật Bản",
    imageUrl: "/assets/stickers/countries/country_01.webp",
    emoji: "🇯🇵",
    spokenSuccess: "Nhờ, ât, nhât, nặng, nhật! Nước Nhật Bản!",
  },
  {
    id: "bq-country-nuoc-phap",
    onset: "Ph",
    rhymeWithTone: "áp",
    targetSyllable: "Pháp",
    prefixWord: "Nước",
    fullPhrase: "Nước Pháp",
    imageUrl: "/assets/stickers/countries/country_03.webp",
    emoji: "🇫🇷",
    spokenSuccess: "Phờ, áp, pháp, sắc, pháp! Nước Pháp!",
  },
  {
    id: "bq-country-nuoc-duc",
    onset: "Đ",
    rhymeWithTone: "ức",
    targetSyllable: "Đức",
    prefixWord: "Nước",
    fullPhrase: "Nước Đức",
    imageUrl: "/assets/stickers/countries/country_05.webp",
    emoji: "🇩🇪",
    spokenSuccess: "Đờ, ưc, đưc, sắc, đức! Nước Đức!",
  },
  {
    id: "bq-country-nuoc-my",
    onset: "M",
    rhymeWithTone: "ỹ",
    targetSyllable: "Mỹ",
    prefixWord: "Nước",
    fullPhrase: "Nước Mỹ",
    imageUrl: "/assets/stickers/countries/country_06.webp",
    emoji: "🇺🇸",
    spokenSuccess: "Mờ, y, my, ngã, mỹ! Nước Mỹ!",
  },
  {
    id: "bq-country-coi-xay",
    onset: "X",
    rhymeWithTone: "ay",
    targetSyllable: "Xay",
    prefixWord: "Cối",
    fullPhrase: "Cối xay",
    imageUrl: "/assets/stickers/countries/country_07.webp",
    emoji: "🇳🇱",
    spokenSuccess: "Xờ, ay, xay! Cối xay gió Hà Lan!",
  },
  {
    id: "bq-country-vo-si",
    onset: "V",
    rhymeWithTone: "õ",
    targetSyllable: "Võ",
    suffixWord: "sĩ",
    fullPhrase: "Võ sĩ",
    imageUrl: "/assets/stickers/countries/country_09.webp",
    emoji: "🥋",
    spokenSuccess: "Vờ, o, vo, ngã, võ! Võ sĩ Nhật Bản!",
  },
  {
    id: "bq-country-den-long",
    onset: "L",
    rhymeWithTone: "ồng",
    targetSyllable: "Lồng",
    prefixWord: "Đèn",
    fullPhrase: "Đèn lồng",
    imageUrl: "/assets/stickers/countries/country_10.webp",
    emoji: "🏮",
    spokenSuccess: "Lờ, ông, lông, huyền, lồng! Đèn lồng!",
  },
  {
    id: "bq-country-hoa-dao",
    onset: "Đ",
    rhymeWithTone: "ào",
    targetSyllable: "Đào",
    prefixWord: "Hoa",
    fullPhrase: "Hoa đào",
    imageUrl: "/assets/stickers/countries/country_14.webp",
    emoji: "🌸",
    spokenSuccess: "Đờ, ao, đao, huyền, đào! Hoa anh đào!",
  },
  {
    id: "bq-country-thuy-thu",
    onset: "Th",
    rhymeWithTone: "ủy",
    targetSyllable: "Thủy",
    suffixWord: "thủ",
    fullPhrase: "Thủy thủ",
    imageUrl: "/assets/stickers/countries/country_16.webp",
    emoji: "⚓",
    spokenSuccess: "Thờ, uy, thuy, hỏi, thủy! Chú thủy thủ!",
  },
  {
    id: "bq-country-han-quoc",
    onset: "H",
    rhymeWithTone: "àn",
    targetSyllable: "Hàn",
    suffixWord: "Quốc",
    fullPhrase: "Hàn Quốc",
    imageUrl: "/assets/stickers/countries/country_17.webp",
    emoji: "🇰🇷",
    spokenSuccess: "Hờ, an, han, huyền, hàn! Hàn Quốc!",
  },
  {
    id: "bq-country-bac-cuc",
    onset: "B",
    rhymeWithTone: "ắc",
    targetSyllable: "Bắc",
    suffixWord: "Cực",
    fullPhrase: "Bắc Cực",
    imageUrl: "/assets/stickers/countries/country_20.webp",
    emoji: "❄️",
    spokenSuccess: "Bờ, ăc, băc, sắc, bắc! Vùng Bắc Cực!",
  },

  // --- NHÓM NHẠC CỤ (INSTRUMENTS) ---
  {
    id: "bq-inst-dan-phim",
    onset: "Đ",
    rhymeWithTone: "àn",
    targetSyllable: "Đàn",
    suffixWord: "phím",
    fullPhrase: "Đàn phím",
    imageUrl: "/assets/stickers/instruments/music_02.webp",
    emoji: "🎹",
    spokenSuccess: "Đờ, an, đan, huyền, đàn! Đàn phím!",
  },
  {
    id: "bq-inst-dan-trong",
    onset: "Tr",
    rhymeWithTone: "ống",
    targetSyllable: "Trống",
    prefixWord: "Dàn",
    fullPhrase: "Dàn trống",
    imageUrl: "/assets/stickers/instruments/music_03.webp",
    emoji: "🥁",
    spokenSuccess: "Trờ, ông, trông, sắc, trống! Dàn trống!",
  },
  {
    id: "bq-inst-ken-dong",
    onset: "K",
    rhymeWithTone: "èn",
    targetSyllable: "Kèn",
    suffixWord: "đồng",
    fullPhrase: "Kèn đồng",
    imageUrl: "/assets/stickers/instruments/music_08.webp",
    emoji: "🎺",
    spokenSuccess: "Kờ, en, ken, huyền, kèn! Kèn đồng!",
  },
  {
    id: "bq-inst-vi-cam",
    onset: "C",
    rhymeWithTone: "ầm",
    targetSyllable: "Cầm",
    prefixWord: "Vĩ",
    fullPhrase: "Vĩ cầm",
    imageUrl: "/assets/stickers/instruments/music_10.webp",
    emoji: "🎻",
    spokenSuccess: "Cờ, âm, câm, huyền, cầm! Đàn vĩ cầm!",
  },
  {
    id: "bq-inst-duong-cam",
    onset: "D",
    rhymeWithTone: "ương",
    targetSyllable: "Dương",
    suffixWord: "cầm",
    fullPhrase: "Dương cầm",
    imageUrl: "/assets/stickers/instruments/music_12.webp",
    emoji: "🎹",
    spokenSuccess: "Dờ, ương, dương! Đàn dương cầm!",
  },
  {
    id: "bq-inst-thoi-sao",
    onset: "S",
    rhymeWithTone: "áo",
    targetSyllable: "Sáo",
    prefixWord: "Thổi",
    fullPhrase: "Thổi sáo",
    imageUrl: "/assets/stickers/instruments/music_14.webp",
    emoji: "🪈",
    spokenSuccess: "Sờ, ao, sao, sắc, sáo! Thổi sáo trúc!",
  },
  {
    id: "bq-inst-dan-hac",
    onset: "H",
    rhymeWithTone: "ạc",
    targetSyllable: "Hạc",
    prefixWord: "Đàn",
    fullPhrase: "Đàn hạc",
    imageUrl: "/assets/stickers/instruments/music_15.webp",
    emoji: "🪉",
    spokenSuccess: "Hờ, ac, hac, nặng, hạc! Đàn hạc vàng!",
  },
  {
    id: "bq-inst-dan-go",
    onset: "G",
    rhymeWithTone: "ỗ",
    targetSyllable: "Gỗ",
    prefixWord: "Đàn",
    fullPhrase: "Đàn gỗ",
    imageUrl: "/assets/stickers/instruments/music_20.webp",
    emoji: "🎼",
    spokenSuccess: "Gờ, ô, gô, ngã, gỗ! Đàn gõ bằng gỗ!",
  },
];

/**
 * Rút 5 câu hỏi không trùng lặp với các lượt chơi trước (lưu trong localStorage qua NonRepeatingDeck),
 * đồng thời đảm bảo 5 câu trong cùng 1 vòng có vần và hình ảnh khác nhau.
 */
export function drawFiveBlendQuestions(
  excludeIds: string[] = [],
): BlendQuizWordItem[] {
  const candidates = drawNonRepeatingItems(
    "reading:blend-quiz:v2",
    BLEND_QUIZ_WORD_POOL,
    18,
    (item) => item.id,
    excludeIds,
  );

  const picked: BlendQuizWordItem[] = [];
  const usedRhymes = new Set<string>();
  const usedPhrases = new Set<string>();

  for (const item of candidates) {
    if (picked.length >= BLEND_QUESTIONS_PER_ROUND) break;
    if (
      !usedRhymes.has(item.rhymeWithTone) &&
      !usedPhrases.has(item.fullPhrase)
    ) {
      usedRhymes.add(item.rhymeWithTone);
      usedPhrases.add(item.fullPhrase);
      picked.push(item);
    }
  }

  for (const item of candidates) {
    if (picked.length >= BLEND_QUESTIONS_PER_ROUND) break;
    if (!picked.some((p) => p.id === item.id)) {
      picked.push(item);
    }
  }

  return picked.slice(0, BLEND_QUESTIONS_PER_ROUND);
}

/** Giữ bí danh tương thích ngược */
export const drawThreeBlendQuestions = drawFiveBlendQuestions;

/**
 * Sinh 5 thẻ đáp án (1 thẻ đúng + 4 thẻ nhiễu khác biệt hoàn toàn)
 */
export function buildFiveBlendChoices(
  question: BlendQuizWordItem,
  mode: "fill-rhyme" | "fill-onset",
): string[] {
  const correctValue =
    mode === "fill-rhyme" ? question.rhymeWithTone : question.onset;

  const allValues = Array.from(
    new Set(
      BLEND_QUIZ_WORD_POOL.map((item) =>
        mode === "fill-rhyme" ? item.rhymeWithTone : item.onset,
      ),
    ),
  ).filter((val) => val.toLowerCase() !== correctValue.toLowerCase());

  const distractors = shuffleArrayRandom(allValues).slice(0, 4);
  return shuffleArrayRandom([correctValue, ...distractors]);
}

interface WordBlendQuizModalProps {
  soundEnabled: boolean;
  speak: (
    text: string,
    lang?: string,
    opts?: { playbackRate?: number; onEnd?: () => void },
  ) => void;
  stopSpeech: () => void;
  onClose: () => void;
  onCompleteRound: (answers: string[], attempts: number) => void;
  onReaction?: (
    type: "happy" | "sad" | "singing" | "idle",
    message?: string,
  ) => void;
}

export const WordBlendQuizModal: React.FC<WordBlendQuizModalProps> = ({
  soundEnabled,
  speak,
  stopSpeech,
  onClose,
  onCompleteRound,
  onReaction,
}) => {
  // Mặc định: "fill-rhyme" -> hiện "S ___" và 5 thẻ vần ("ách", "uối", "ìa"...)
  // Có thể đổi sang "fill-onset" -> hiện "___ ách" và 5 thẻ phụ âm đầu ("S", "B", "M"...)
  const [quizMode, setQuizMode] = useState<"fill-rhyme" | "fill-onset">(
    "fill-rhyme",
  );

  const [questions, setQuestions] = useState<BlendQuizWordItem[]>(() =>
    drawFiveBlendQuestions(),
  );

  const [stepIdx, setStepIdx] = useState(0);
  const [earnedStars, setEarnedStars] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [wrongChoice, setWrongChoice] = useState<string | null>(null);
  const [solvedCurrent, setSolvedCurrent] = useState(false);
  const [roundDone, setRoundDone] = useState(false);

  const advanceTimerRef = useRef<number | null>(null);

  const currentQuestion = questions[stepIdx] || questions[0];

  const fiveChoices = useMemo(() => {
    if (!currentQuestion) return [];
    return buildFiveBlendChoices(currentQuestion, quizMode);
  }, [currentQuestion, quizMode]);

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) {
        window.clearTimeout(advanceTimerRef.current);
      }
    };
  }, []);

  const speakCurrentWordPrompt = (q: BlendQuizWordItem) => {
    if (!soundEnabled) return;
    speak(`${q.fullPhrase}! Đố bé ghép chữ ${q.targetSyllable}!`, "vi-VN", {
      playbackRate: 0.95,
    });
  };

  useEffect(() => {
    if (!roundDone && currentQuestion && soundEnabled) {
      speakCurrentWordPrompt(currentQuestion);
    }
  }, [stepIdx, questions]);

  const handleStartNewRound = () => {
    if (advanceTimerRef.current) {
      window.clearTimeout(advanceTimerRef.current);
    }
    stopSpeech();
    const drawn = drawFiveBlendQuestions(questions.map((q) => q.id));
    setQuestions(drawn);
    setStepIdx(0);
    setEarnedStars(0);
    setAttempts(0);
    setWrongChoice(null);
    setSolvedCurrent(false);
    setRoundDone(false);
  };

  const handlePickChoice = (choice: string) => {
    if (solvedCurrent || roundDone || !currentQuestion) return;

    const expected =
      quizMode === "fill-rhyme"
        ? currentQuestion.rhymeWithTone
        : currentQuestion.onset;

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    if (choice.toLowerCase() === expected.toLowerCase()) {
      // ĐÚNG!
      setWrongChoice(null);
      setSolvedCurrent(true);
      setEarnedStars((prev) => prev + 1);
      playCorrectDingSound();
      playRewardTone();

      onReaction?.(
        "happy",
        `Đúng rồi! ${currentQuestion.onset} + ${currentQuestion.rhymeWithTone} = ${currentQuestion.targetSyllable} (${currentQuestion.fullPhrase})!`,
      );

      if (soundEnabled) {
        speak(currentQuestion.spokenSuccess, "vi-VN-North", {
          playbackRate: 0.96,
        });
      }

      advanceTimerRef.current = window.setTimeout(() => {
        if (stepIdx + 1 < questions.length) {
          setStepIdx((prev) => prev + 1);
          setSolvedCurrent(false);
          setWrongChoice(null);
        } else {
          setRoundDone(true);
        }
      }, 1550);
    } else {
      // SAI!
      setWrongChoice(choice);
      playWrongBuzzSound();
      onReaction?.("sad", "Chưa đúng rồi, Nấm nhìn kỹ chữ rồi chọn lại nhé!");
    }
  };

  if (!currentQuestion) return null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "8px",
        height: "100%",
        minHeight: 0,
        padding: "4px 6px",
      }}
    >
      {/* DÒNG 1: THANH ĐIỀU KHIỂN GỌN TRÊN 1 HÀNG */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}
      >
        <button
          type="button"
          className="back-to-menu-pill"
          onClick={() => {
            stopSpeech();
            onClose();
          }}
        >
          <ArrowLeft size={14} /> Quay lại
        </button>

        {/* Chuyển đổi 2 chế độ: Điền Vần (S ___) hoặc Điền Âm Đầu (___ ách) */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <button
            type="button"
            className={`level-switch-pill ${
              quizMode === "fill-rhyme" ? "active-pink" : ""
            }`}
            style={{ padding: "4px 12px", fontSize: "0.8rem" }}
            onClick={() => {
              setWrongChoice(null);
              setQuizMode("fill-rhyme");
            }}
          >
            🔤 Điền Vần (S ___)
          </button>

          <button
            type="button"
            className={`level-switch-pill ${
              quizMode === "fill-onset" ? "active-orange" : ""
            }`}
            style={{ padding: "4px 12px", fontSize: "0.8rem" }}
            onClick={() => {
              setWrongChoice(null);
              setQuizMode("fill-onset");
            }}
          >
            🅰️ Điền Âm Đầu (___ ách)
          </button>
        </div>

        {/* Tiến độ 5 Câu & Sao */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              background: "#FEF3C7",
              border: "2px solid #F59E0B",
              color: "#B45309",
              fontWeight: 900,
              fontSize: "0.82rem",
              padding: "3px 12px",
              borderRadius: "999px",
            }}
          >
            Câu {stepIdx + 1}/{questions.length} • {"⭐".repeat(earnedStars)}
            {"☆".repeat(Math.max(0, questions.length - earnedStars))}
          </span>

          <button
            type="button"
            className="chunky-btn chunky-orange btn-sm"
            style={{ padding: "4px 10px", fontSize: "0.76rem" }}
            onClick={handleStartNewRound}
            title="Đổi 5 câu hỏi mới"
          >
            <RotateCcw size={13} /> Đổi 5 câu mới
          </button>
        </div>
      </div>

      {/* KHU VỰC CHƠI CHÍNH */}
      {roundDone ? (
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
            background: "linear-gradient(135deg, #FFFBEB 0%, #FDF2F8 100%)",
            borderRadius: "24px",
            border: "3px solid #F59E0B",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "3.4rem", lineHeight: 1 }}>🎉⭐⭐⭐⭐⭐🎉</div>
          <h3
            style={{
              margin: 0,
              fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
              fontWeight: 900,
              color: "#BE185D",
            }}
          >
            Xuất sắc! Bé đã ghép đúng cả {questions.length}/{questions.length} từ!
          </h3>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {questions.map((q) => (
              <div
                key={q.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "#FFFFFF",
                  padding: "8px 16px",
                  borderRadius: "16px",
                  border: "2px solid #86EFAC",
                  fontWeight: 900,
                  fontSize: "1.1rem",
                }}
              >
                <span>{q.emoji}</span>
                <span>
                  {q.prefixWord ? `${q.prefixWord} ` : ""}
                  <span style={{ color: "#2563EB" }}>{q.onset}</span>
                  <span style={{ color: "#DB2777" }}>{q.rhymeWithTone}</span>
                  {q.suffixWord ? ` ${q.suffixWord}` : ""}
                </span>
                <CheckCircle2 size={18} color="#16A34A" />
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "6px",
            }}
          >
            <button
              type="button"
              className="chunky-btn chunky-pink"
              style={{
                padding: "10px 22px",
                fontSize: "1rem",
              }}
              onClick={() =>
                onCompleteRound(
                  questions.map((q) => `Ghép chữ: ${q.fullPhrase}`),
                  Math.max(questions.length, attempts),
                )
              }
            >
              <Award size={18} /> Nhận 3 Sao & Mở Quà Sticker 🏆
            </button>

            <button
              type="button"
              className="chunky-btn chunky-green"
              style={{
                padding: "10px 22px",
                fontSize: "1rem",
              }}
              onClick={handleStartNewRound}
            >
              <Sparkles size={18} /> Chơi Tiếp 5 Câu Mới 🔄
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          {/* NỬA TRÊN: THẺ HÌNH MINH HỌA + CHÂN CHỮ KHUYẾT (VD: S ___) */}
          <div
            onClick={() => speakCurrentWordPrompt(currentQuestion)}
            style={{
              flex: 1.15,
              minHeight: 0,
              background: "#FFFFFF",
              borderRadius: "24px",
              border: solvedCurrent
                ? "3px solid #22C55E"
                : "3px solid #F472B6",
              boxShadow: "0 8px 22px rgba(236, 72, 153, 0.12)",
              padding: "12px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "28px",
              cursor: "pointer",
              position: "relative",
            }}
          >
            {/* Hình 3D lớn bên trái */}
            <div
              style={{
                width: "clamp(110px, 24vh, 165px)",
                height: "clamp(110px, 24vh, 165px)",
                borderRadius: "22px",
                background: "linear-gradient(135deg, #FDF2F8 0%, #EFF6FF 100%)",
                border: "2px dashed #F9A8D4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {currentQuestion.imageUrl ? (
                <img
                  src={currentQuestion.imageUrl}
                  alt={currentQuestion.fullPhrase}
                  style={{
                    width: "86%",
                    height: "86%",
                    objectFit: "contain",
                    filter: "drop-shadow(0 8px 12px rgba(15,23,42,0.16))",
                  }}
                />
              ) : (
                <span style={{ fontSize: "4.5rem" }}>
                  {currentQuestion.emoji}
                </span>
              )}
            </div>

            {/* Chân chữ khuyết bên phải */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
              }}
            >
              <span
                style={{
                  background: "#FCE7F3",
                  color: "#BE185D",
                  fontSize: "0.8rem",
                  fontWeight: 900,
                  padding: "3px 12px",
                  borderRadius: "999px",
                }}
              >
                {quizMode === "fill-rhyme"
                  ? "🎯 Chọn thẻ VẦN ghép vào chỗ trống:"
                  : "🎯 Chọn thẻ PHỤ ÂM ĐẦU ghép vào chỗ trống:"}
              </span>

              {/* Dòng chữ chính: VD "Quyển  S [ ___ ]" */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  flexWrap: "wrap",
                  gap: "10px",
                  fontSize: "clamp(2rem, 3.8vw, 3.1rem)",
                  fontWeight: 900,
                  lineHeight: 1.15,
                }}
              >
                {currentQuestion.prefixWord && (
                  <span style={{ color: "#475569" }}>
                    {currentQuestion.prefixWord}
                  </span>
                )}

                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "baseline",
                    gap: "3px",
                    background: solvedCurrent ? "#DCFCE7" : "#FFF1F2",
                    padding: "4px 16px",
                    borderRadius: "18px",
                    border: solvedCurrent
                      ? "2.5px solid #22C55E"
                      : "2.5px solid #F9A8D4",
                  }}
                >
                  {/* Phần Phụ âm đầu */}
                  {quizMode === "fill-rhyme" || solvedCurrent ? (
                    <span style={{ color: "#2563EB" }}>
                      {currentQuestion.onset}
                    </span>
                  ) : (
                    <span
                      style={{
                        display: "inline-block",
                        minWidth: "64px",
                        borderBottom: "4px dashed #2563EB",
                        color: "#2563EB",
                        textAlign: "center",
                        marginRight: "4px",
                      }}
                    >
                      ?
                    </span>
                  )}

                  {/* Phần Vần có dấu */}
                  {quizMode === "fill-onset" || solvedCurrent ? (
                    <span style={{ color: "#DB2777" }}>
                      {currentQuestion.rhymeWithTone}
                    </span>
                  ) : (
                    <span
                      style={{
                        display: "inline-block",
                        minWidth: "82px",
                        borderBottom: "4px dashed #DB2777",
                        color: "#DB2777",
                        textAlign: "center",
                        marginLeft: "4px",
                      }}
                    >
                      ___
                    </span>
                  )}
                </span>

                {currentQuestion.suffixWord && (
                  <span style={{ color: "#475569" }}>
                    {currentQuestion.suffixWord}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  speakCurrentWordPrompt(currentQuestion);
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 14px",
                  borderRadius: "999px",
                  border: "none",
                  background: "#E0F2FE",
                  color: "#0369A1",
                  fontWeight: 900,
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                <Volume2 size={15} /> Nghe từ cần ghép
              </button>
            </div>
          </div>

          {/* NỬA DƯỚI: 5 THẺ ĐÁP ÁN KHÁC NHAU ĐỂ BÉ CHỌN GHÉP */}
          <div
            style={{
              flex: 0.85,
              minHeight: 0,
              display: "grid",
              gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
              gap: "12px",
              alignItems: "stretch",
            }}
          >
            {fiveChoices.map((choice) => {
              const expected =
                quizMode === "fill-rhyme"
                  ? currentQuestion.rhymeWithTone
                  : currentQuestion.onset;
              const isCorrectChoice =
                solvedCurrent &&
                choice.toLowerCase() === expected.toLowerCase();
              const isWrongChoice = wrongChoice === choice;

              return (
                <button
                  key={choice}
                  type="button"
                  onClick={() => handlePickChoice(choice)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    borderRadius: "22px",
                    background: isCorrectChoice
                      ? "linear-gradient(180deg, #DCFCE7 0%, #BBF7D0 100%)"
                      : isWrongChoice
                        ? "linear-gradient(180deg, #FEE2E2 0%, #FECACA 100%)"
                        : "#FFFFFF",
                    border: isCorrectChoice
                      ? "3.5px solid #22C55E"
                      : isWrongChoice
                        ? "3.5px solid #EF4444"
                        : quizMode === "fill-rhyme"
                          ? "3px solid #F472B6"
                          : "3px solid #60A5FA",
                    boxShadow: isCorrectChoice
                      ? "0 6px 0 #16A34A"
                      : isWrongChoice
                        ? "0 6px 0 #DC2626"
                        : quizMode === "fill-rhyme"
                          ? "0 6px 0 #DB2777"
                          : "0 6px 0 #2563EB",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "transform 0.15s ease",
                  }}
                >
                  <strong
                    style={{
                      fontSize: "clamp(1.85rem, 3.2vw, 2.75rem)",
                      fontWeight: 900,
                      color: isCorrectChoice
                        ? "#15803D"
                        : isWrongChoice
                          ? "#B91C1C"
                          : quizMode === "fill-rhyme"
                            ? "#DB2777"
                            : "#2563EB",
                      lineHeight: 1.1,
                    }}
                  >
                    {choice}
                  </strong>

                  <span
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 800,
                      color: "#64748B",
                    }}
                  >
                    {isCorrectChoice
                      ? "🌟 Đúng rồi!"
                      : isWrongChoice
                        ? "Thử lại nhé!"
                        : quizMode === "fill-rhyme"
                          ? `${currentQuestion.onset} + ${choice}`
                          : `${choice} + ${currentQuestion.rhymeWithTone}`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
