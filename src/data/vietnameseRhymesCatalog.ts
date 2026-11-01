export type RhymeHeadGroupId =
  | "A"
  | "AW"
  | "AA"
  | "O"
  | "OO"
  | "OW"
  | "E"
  | "EE"
  | "I_IE"
  | "U_UO"
  | "UW_UOW"
  | "OA_OE_UY";

export type RhymeTailGroupId =
  | "VOWEL_END" // -i, -y, -o, -u, -a, -e
  | "MP_END" // -m, -p (khép môi)
  | "NT_END" // -n, -t (đầu lưỡi)
  | "NGNH_END" // -ng, -nh (cuối lưỡi vang)
  | "CCH_END"; // -c, -ch (cuối lưỡi tắc)

export interface VietnameseRhymeItem {
  id: string;
  rhyme: string;
  headPart: string;
  tailPart: string;
  headGroup: RhymeHeadGroupId;
  tailGroup: RhymeTailGroupId;
  /** Âm đầu màu xanh dương của từ móc neo (VD: "d" trong "dép") */
  anchorOnset: string;
  /** Phần vần có dấu màu hồng đậm của từ móc neo (VD: "ép" trong "dép") */
  anchorRhymeWithTone: string;
  /** Từ ghép quen thuộc giúp bé nhìn phát nhớ ngay cách đọc vần */
  anchorPhrase: string;
  emoji: string;
  imageUrl?: string;
  /** Gợi ý bắc cầu cho vần dài 3 chữ (VD: "a+n=an ➔ o+an=oan") */
  bridgeHint?: string;
  /** Cặp vần dễ nhầm (nếu có) */
  confusingGroup?: string;
  /** Câu đọc Giọng Nữ Miền Bắc chuẩn sư phạm */
  spokenNorth: string;
}

export interface HeadGroupMeta {
  id: RhymeHeadGroupId;
  shortLabel: string;
  title: string;
  tip: string;
  bg: string;
  border: string;
  color: string;
}

export const RHYME_HEAD_GROUPS: HeadGroupMeta[] = [
  {
    id: "A",
    shortLabel: "Bảng A (12)",
    title: "Bảng Cửu Chương Vần Chữ A",
    tip: "Miệng mở rộng tự nhiên: ai, ay, ao, au, am, ap, an, at, ang, anh, ac, ach",
    bg: "#FFF1F2",
    border: "#F43F5E",
    color: "#BE185D",
  },
  {
    id: "AW",
    shortLabel: "Bảng Ă (6)",
    title: "Bảng Cửu Chương Vần Chữ Ă (Á)",
    tip: "Âm ngắn và nảy nhanh hơn chữ A: ăm, ăp, ăn, ăt, ăng, ăc",
    bg: "#FFF7ED",
    border: "#F97316",
    color: "#C2410C",
  },
  {
    id: "AA",
    shortLabel: "Bảng Â (8)",
    title: "Bảng Cửu Chương Vần Chữ Â (Ớ)",
    tip: "Âm ấm phát ra từ giữa miệng: ây, âu, âm, âp, ân, ât, âng, âc",
    bg: "#FEFCE8",
    border: "#EAB308",
    color: "#A16207",
  },
  {
    id: "O",
    shortLabel: "Bảng O (9)",
    title: "Bảng Cửu Chương Vần Chữ O Tròn",
    tip: "Môi tròn mở: oi, oa, oe, om, op, on, ot, ong, oc",
    bg: "#FAF5FF",
    border: "#A855F7",
    color: "#7E22CE",
  },
  {
    id: "OO",
    shortLabel: "Bảng Ô (7)",
    title: "Bảng Cửu Chương Vần Chữ Ô Đội Nón",
    tip: "Môi chúm tròn: ôi, ôm, ôp, ôn, ôt, ông, ôc",
    bg: "#FDF2F8",
    border: "#EC4899",
    color: "#BE185D",
  },
  {
    id: "OW",
    shortLabel: "Bảng Ơ (5)",
    title: "Bảng Cửu Chương Vần Chữ Ơ Có Râu",
    tip: "Môi thả lỏng tự nhiên: ơi, ơm, ơp, ơn, ơt",
    bg: "#ECFDF5",
    border: "#10B981",
    color: "#047857",
  },
  {
    id: "E",
    shortLabel: "Bảng E (7)",
    title: "Bảng Cửu Chương Vần Chữ E",
    tip: "Miệng mở ngang tươi cười: eo, em, ep, en, et, eng, ec",
    bg: "#F0FDF4",
    border: "#22C55E",
    color: "#15803D",
  },
  {
    id: "EE",
    shortLabel: "Bảng Ê (7)",
    title: "Bảng Cửu Chương Vần Chữ Ê Đội Nón",
    tip: "Hẹp hơn chữ E: êu, êm, êp, ên, êt, ênh, êch",
    bg: "#EFF6FF",
    border: "#3B82F6",
    color: "#1D4ED8",
  },
  {
    id: "I_IE",
    shortLabel: "Bảng I & IÊ (16)",
    title: "Bảng Cửu Chương Vần Chữ I/Y & Nguyên Âm Đôi IÊ/YÊ",
    tip: "Từ vần ngắn (ia, iu, im, ip, in, it, inh, ich) bắc cầu sang vần dài (iêu, iêm, iêp, iên, iêt, iêng, iêc)",
    bg: "#E0F2FE",
    border: "#0EA5E9",
    color: "#0369A1",
  },
  {
    id: "U_UO",
    shortLabel: "Bảng U & UÔ (16)",
    title: "Bảng Cửu Chương Vần Chữ U & Nguyên Âm Đôi UÔ",
    tip: "Chúm môi tròn (ui, ua, um, up, un, ut, ung, uc) & vần dài (uôi, uôm, uôn, uôt, uông, uôc)",
    bg: "#FEF9C3",
    border: "#F59E0B",
    color: "#B45309",
  },
  {
    id: "UW_UOW",
    shortLabel: "Bảng Ư & ƯƠ (14)",
    title: "Bảng Cửu Chương Vần Chữ Ư & Nguyên Âm Đôi ƯƠ",
    tip: "Răng khép nhẹ (ưi, ưu, ưa, ưt, ưng, ưc) & vần dài (ươi, ươu, ươm, ươp, ươn, ươt, ương, ươc)",
    bg: "#F3E8FF",
    border: "#8B5CF6",
    color: "#6D28D9",
  },
  {
    id: "OA_OE_UY",
    shortLabel: "Vần Tròn Môi Oa/Oe/Uy (25)",
    title: "Bảng Vần Tròn Môi Ghép 3–4 Chữ (OA, OĂ, OE, UÂ, UY, UYÊ)",
    tip: "Bắc cầu: cụm tròn môi đứng trước (oai, oan, oang, oanh, oăn, oăt, uây, uân, uât, uya, uyt, uyên, uyêt...)",
    bg: "#FFE4E6",
    border: "#E11D48",
    color: "#9F1239",
  },
];

export const RHYME_TAIL_GROUPS: {
  id: RhymeTailGroupId;
  shortLabel: string;
  title: string;
  desc: string;
  color: string;
}[] = [
  {
    id: "VOWEL_END",
    shortLabel: "🌸 Đuôi Nguyên Âm (-i, -y, -o, -u, -a, -e)",
    title: "Nhóm 1: Hai Nguyên Âm Nắm Tay Nhau (Mở Miệng Ngân Dài)",
    desc: "ai, ay, ao, au, âu, oi, ôi, ơi, oa, oe, eo, êu, ia, iu, ua, uôi, ưa, ưu, ươi, oai...",
    color: "#DB2777",
  },
  {
    id: "MP_END",
    shortLabel: "👄 Đuôi Khép Môi (-m, -p)",
    title: "Nhóm 2: Đọc Xong Hai Môi Khép Lại (-M ngân êm, -P bật gọn)",
    desc: "am/ap, ăm/ăp, âm/âp, om/op, ôm/ôp, ơm/ơp, em/ep, êm/êp, im/ip, um/up, iêm/iêp, ươm/ươp...",
    color: "#EA580C",
  },
  {
    id: "NT_END",
    shortLabel: "👅 Đuôi Đầu Lưỡi (-n, -t)",
    title: "Nhóm 3: Đầu Lưỡi Chạm Chân Răng Trên (-N ngân, -T bật gọn)",
    desc: "an/at, ăn/ăt, ân/ât, on/ot, ôn/ôt, ơn/ơt, en/et, ên/êt, in/it, un/ut, ưn/ưt, oan/oat, iên/iêt, uôn/uôt, ươn/ươt...",
    color: "#059669",
  },
  {
    id: "NGNH_END",
    shortLabel: "🔔 Đuôi Ngân Vang (-ng, -nh)",
    title: "Nhóm 4: Âm Cuối Ngân Vang Như Tiếng Chuông (-NG, -NH)",
    desc: "ang/anh, ăng, âng, ong, ông, eng, ênh, inh, ung, ưng, oang/oanh, iêng, uông, ương...",
    color: "#2563EB",
  },
  {
    id: "CCH_END",
    shortLabel: "⚡ Đuôi Bật Gọn (-c, -ch)",
    title: "Nhóm 5: Âm Cuối Dứt Khoát (-C, -CH)",
    desc: "ac/ach, ăc, âc, oc, ôc, ec, êch, ich, uc, ưc, oăc/oach, iêc, uôc, ươc, uych...",
    color: "#7C3AED",
  },
];

type RawRhymeSeed = [
  rhyme: string,
  headPart: string,
  tailPart: string,
  headGroup: RhymeHeadGroupId,
  tailGroup: RhymeTailGroupId,
  anchorOnset: string,
  anchorRhymeWithTone: string,
  anchorPhrase: string,
  emoji: string,
  spokenNorth: string,
  bridgeHint?: string,
  confusingGroup?: string,
  imageUrl?: string,
];

const RAW_132_RHYMES: RawRhymeSeed[] = [
  // =========================================================================
  // 1. BẢNG A (12 VẦN)
  // =========================================================================
  ["ai", "a", "i", "A", "VOWEL_END", "nh", "ài", "Hoa nhài", "🌼", "A, I, Ai! Nhờ, Ai, Nhai, Huyền, Nhài! Hoa nhài!", undefined, "ai-ay"],
  ["ay", "a", "y", "A", "VOWEL_END", "b", "ay", "Máy bay", "✈️", "A, Y, Ay! Bờ, Ay, Bay! Máy bay!", "Chữ Y dài làm âm ngắn và nhanh hơn AI", "ai-ay", "/assets/items/vehicles/vehicle_06.webp"],
  ["ao", "a", "o", "A", "VOWEL_END", "đ", "ào", "Quả đào", "🍑", "A, O, Ao! Đờ, Ao, Đao, Huyền, Đào! Quả đào!", undefined, "ao-au", "/assets/items/fruits/fruit_08.webp"],
  ["au", "a", "u", "A", "VOWEL_END", "r", "au", "Rổ rau", "🥦", "A, U, Au! Rờ, Au, Rau! Rổ rau xanh!", undefined, "ao-au", "/assets/items/lifeskills/lifeskills_06.webp"],
  ["am", "a", "m", "A", "MP_END", "c", "am", "Quả cam", "🍊", "A, Mờ, Am! Cờ, Am, Cam! Quả cam tươi!", undefined, "am-ap", "/assets/items/fruits/fruit_04.webp"],
  ["ap", "a", "p", "A", "MP_END", "s", "áp", "Bút sáp", "🖍️", "A, Pờ, Áp! Sờ, Áp, Sáp, Sắc, Sáp! Hộp bút sáp!", undefined, "am-ap", "/assets/items/school/school_08.webp"],
  ["an", "a", "n", "A", "NT_END", "b", "àn", "Cái bàn", "🪑", "A, Nờ, An! Bờ, An, Ban, Huyền, Bàn! Cái bàn học!"],
  ["at", "a", "t", "A", "NT_END", "b", "át", "Cái bát", "🥣", "A, Tờ, Át! Bờ, Át, Bát, Sắc, Bát! Cái bát ăn cơm!"],
  ["ang", "a", "ng", "A", "NGNH_END", "v", "àng", "Màu vàng", "⭐", "A, Ngờ, Ang! Vờ, Ang, Vang, Huyền, Vàng! Ngôi sao vàng!"],
  ["anh", "a", "nh", "A", "NGNH_END", "ch", "anh", "Quả chanh", "🍋", "A, Nhờ, Anh! Chờ, Anh, Chanh! Quả chanh vàng!", undefined, undefined, "/assets/items/fruits/fruit_09.webp"],
  ["ac", "a", "c", "A", "CCH_END", "b", "ác", "Bác sĩ", "🩺", "A, Cờ, Ác! Bờ, Ác, Bác, Sắc, Bác! Bác sĩ!"],
  ["ach", "a", "ch", "A", "CCH_END", "s", "ách", "Quyển sách", "📖", "A, Chờ, Ách! Sờ, Ách, Sách, Sắc, Sách! Quyển sách!", undefined, undefined, "/assets/items/school/school_03.webp"],

  // =========================================================================
  // 2. BẢNG Ă (6 VẦN)
  // =========================================================================
  ["ăm", "ă", "m", "AW", "MP_END", "t", "ắm", "Bồn tắm", "🛁", "Á, Mờ, Ăm! Tờ, Ăm, Tăm, Sắc, Tắm! Bồn tắm!", undefined, undefined, "/assets/items/home/home_08.webp"],
  ["ăp", "ă", "p", "AW", "MP_END", "c", "ặp", "Cặp sách", "🎒", "Á, Pờ, Ăp! Cờ, Ăp, Căp, Nặng, Cặp! Cặp sách!", undefined, "ep-êp-ăp", "/assets/items/school/school_01.webp"],
  ["ăn", "ă", "n", "AW", "NT_END", "kh", "ăn", "Khăn mặt", "🧖", "Á, Nờ, Ăn! Khờ, Ăn, Khăn! Khăn mặt sạch!", undefined, undefined, "/assets/items/home/home_10.webp"],
  ["ăt", "ă", "t", "AW", "NT_END", "m", "ắt", "Đôi mắt", "👀", "Á, Tờ, Ăt! Mờ, Ăt, Măt, Sắc, Mắt! Đôi mắt sáng!"],
  ["ăng", "ă", "ng", "AW", "NGNH_END", "tr", "ăng", "Mặt trăng", "🌙", "Á, Ngờ, Ăng! Trờ, Ăng, Trăng! Ông mặt trăng!"],
  ["ăc", "ă", "c", "AW", "CCH_END", "m", "ặc", "Mặc áo", "👕", "Á, Cờ, Ăc! Mờ, Ăc, Măc, Nặng, Mặc! Mặc áo mới!"],

  // =========================================================================
  // 3. BẢNG Â (8 VẦN)
  // =========================================================================
  ["ây", "â", "y", "AA", "VOWEL_END", "c", "ây", "Chậu cây", "🌱", "Ớ, Y, Ây! Cờ, Ây, Cây! Chậu cây xanh!", undefined, "ai-ay", "/assets/items/home/home_11.webp"],
  ["âu", "â", "u", "AA", "VOWEL_END", "d", "âu", "Dâu tây", "🍓", "Ớ, U, Âu! Dờ, Âu, Dâu! Quả dâu tây!", undefined, "ao-au", "/assets/items/fruits/fruit_01.webp"],
  ["âm", "â", "m", "AA", "MP_END", "n", "ấm", "Bé Nấm", "🍄", "Ớ, Mờ, Âm! Nờ, Âm, Nâm, Sắc, Nấm! Bé Nấm chăm học!"],
  ["âp", "â", "p", "AA", "MP_END", "t", "ập", "Tập thể dục", "🤸", "Ớ, Pờ, Âp! Tờ, Âp, Tâp, Nặng, Tập! Tập thể dục!"],
  ["ân", "â", "n", "AA", "NT_END", "c", "ân", "Cái cân", "⚖️", "Ớ, Nờ, Ân! Cờ, Ân, Cân! Cái cân!"],
  ["ât", "â", "t", "AA", "NT_END", "t", "ất", "Đôi tất", "🧦", "Ớ, Tờ, Ât! Tờ, Ât, Tât, Sắc, Tất! Đôi tất ấm!"],
  ["âng", "â", "ng", "AA", "NGNH_END", "v", "âng", "Dạ vâng", "🙇", "Ớ, Ngờ, Âng! Vờ, Âng, Vâng! Khoanh tay dạ vâng!"],
  ["âc", "â", "c", "AA", "CCH_END", "g", "ấc", "Quả gấc", "🍅", "Ớ, Cờ, Âc! Gờ, Âc, Gâc, Sắc, Gấc! Quả gấc đỏ!"],

  // =========================================================================
  // 4. BẢNG O (9 VẦN)
  // =========================================================================
  ["oi", "o", "i", "O", "VOWEL_END", "v", "oi", "Con voi", "🐘", "O, I, Oi! Vờ, Oi, Voi! Chú voi con!", undefined, "oi-ôi-ơi"],
  ["oa", "o", "a", "O", "VOWEL_END", "h", "oa", "Bông hoa", "🌸", "O, A, Oa! Hờ, Oa, Hoa! Bông hoa xinh!", undefined, "oe-eo"],
  ["oe", "o", "e", "O", "VOWEL_END", "x", "òe", "Hoa xòe", "🌺", "O, E, Oe! Xờ, Oe, Xoe, Huyền, Xòe! Bông hoa xòe cánh!", "O tròn đứng trước E ➔ đọc tròn môi là OE", "oe-eo"],
  ["om", "o", "m", "O", "MP_END", "đ", "om", "Đom đóm", "✨", "O, Mờ, Om! Đờ, Om, Đom, Sắc, Đóm! Đom đóm phát sáng!"],
  ["op", "o", "p", "O", "MP_END", "h", "ọp", "Họp tổ", "🏫", "O, Pờ, Op! Hờ, Op, Hop, Nặng, Họp! Lớp học vui!"],
  ["on", "o", "n", "O", "NT_END", "c", "on", "Con mèo", "🐱", "O, Nờ, On! Cờ, On, Con! Con mèo nhỏ!"],
  ["ot", "o", "t", "O", "NT_END", "ng", "ọt", "Kẹo ngọt", "🍬", "O, Tờ, Ot! Ngờ, Ot, Ngot, Nặng, Ngọt! Viên kẹo ngọt!", undefined, undefined, "/assets/items/sweets/sweet_04.webp"],
  ["ong", "o", "ng", "O", "NGNH_END", "b", "óng", "Quả bóng", "⚽", "O, Ngờ, Ong! Bờ, Ong, Bong, Sắc, Bóng! Quả bóng tròn!"],
  ["oc", "o", "c", "O", "CCH_END", "s", "óc", "Con sóc", "🐿️", "O, Cờ, Oc! Sờ, Oc, Soc, Sắc, Sóc! Chú sóc nâu!"],

  // =========================================================================
  // 5. BẢNG Ô (7 VẦN)
  // =========================================================================
  ["ôi", "ô", "i", "OO", "VOWEL_END", "g", "ối", "Chiếc gối", "🛌", "Ô, I, Ôi! Gờ, Ôi, Gôi, Sắc, Gối! Chiếc gối êm!", undefined, "oi-ôi-ơi", "/assets/items/home/home_07.webp"],
  ["ôm", "ô", "m", "OO", "MP_END", "t", "ôm", "Con tôm", "🦐", "Ô, Mờ, Ôm! Tờ, Ôm, Tôm! Con tôm đỏ!"],
  ["ôp", "ô", "p", "OO", "MP_END", "h", "ộp", "Hộp bút", "👝", "Ô, Pờ, Ôp! Hờ, Ôp, Hôp, Nặng, Hộp! Hộp bút xinh!", undefined, undefined, "/assets/items/school/school_12.webp"],
  ["ôn", "ô", "n", "OO", "NT_END", "kh", "ôn", "Khôn lớn", "🧒", "Ô, Nờ, Ôn! Khờ, Ôn, Khôn! Bé khôn lớn!"],
  ["ôt", "ô", "t", "OO", "NT_END", "b", "ột", "Bột mì", "🌾", "Ô, Tờ, Ôt! Bờ, Ôt, Bôt, Nặng, Bột! Bao bột mì!", undefined, undefined, "/assets/items/lifeskills/lifeskills_05.webp"],
  ["ông", "ô", "ng", "OO", "NGNH_END", "h", "ồng", "Màu hồng", "🎀", "Ô, Ngờ, Ông! Hờ, Ông, Hông, Huyền, Hồng! Chiếc nơ hồng!"],
  ["ôc", "ô", "c", "OO", "CCH_END", "c", "ốc", "Cái cốc", "☕", "Ô, Cờ, Ôc! Cờ, Ôc, Côc, Sắc, Cốc! Cái cốc uống nước!", undefined, undefined, "/assets/items/sweets/sweet_14.webp"],

  // =========================================================================
  // 6. BẢNG Ơ (5 VẦN)
  // =========================================================================
  ["ơi", "ơ", "i", "OW", "VOWEL_END", "b", "ơi", "Đi bơi", "🏊", "Ơ, I, Ơi! Bờ, Ơi, Bơi! Bé đi bơi!", undefined, "oi-ôi-ơi"],
  ["ơm", "ơ", "m", "OW", "MP_END", "c", "ơm", "Bát cơm", "🍚", "Ơ, Mờ, Ơm! Cờ, Ơm, Cơm! Bát cơm trắng!", undefined, undefined, "/assets/items/lifeskills/lifeskills_19.webp"],
  ["ơp", "ơ", "p", "OW", "MP_END", "l", "ớp", "Lớp học", "🏫", "Ơ, Pờ, Ơp! Lờ, Ơp, Lơp, Sắc, Lớp! Lớp học vui!"],
  ["ơn", "ơ", "n", "OW", "NT_END", "l", "ớn", "Cao lớn", "🌱", "Ơ, Nờ, Ơn! Lờ, Ơn, Lơn, Sắc, Lớn! Mau ăn chóng lớn!"],
  ["ơt", "ơ", "t", "OW", "NT_END", "th", "ớt", "Thớt gỗ", "🔪", "Ơ, Tờ, Ơt! Thờ, Ơt, Thơt, Sắc, Thớt! Cái thớt gỗ!", undefined, undefined, "/assets/items/lifeskills/lifeskills_01.webp"],

  // =========================================================================
  // 7. BẢNG E (7 VẦN)
  // =========================================================================
  ["eo", "e", "o", "E", "VOWEL_END", "k", "éo", "Cây kéo", "✂️", "E, O, Eo! Kờ, Eo, Keo, Sắc, Kéo! Cây kéo thủ công!", "E đứng trước O ➔ miệng mở ngang rồi tròn lại thành EO", "oe-eo", "/assets/items/school/school_09.webp"],
  ["em", "e", "m", "E", "MP_END", "k", "em", "Cây kem", "🍦", "E, Mờ, Em! Kờ, Em, Kem! Cây kem ốc quế!", undefined, undefined, "/assets/items/sweets/sweet_09.webp"],
  ["ep", "e", "p", "E", "MP_END", "d", "ép", "Đôi dép", "👡", "E, Pờ, Ép! Dờ, Ép, Dép, Sắc, Dép! Đôi dép xinh!", undefined, "ep-êp-ăp"],
  ["en", "e", "n", "E", "NT_END", "đ", "èn", "Đèn bàn", "💡", "E, Nờ, En! Đờ, En, Đen, Huyền, Đèn! Đèn bàn học!", undefined, undefined, "/assets/items/home/home_01.webp"],
  ["et", "e", "t", "E", "NT_END", "v", "ẹt", "Con vẹt", "🦜", "E, Tờ, Ét! Vờ, Ét, Vẹt, Nặng, Vẹt! Con vẹt nhiều màu!"],
  ["eng", "e", "ng", "E", "NGNH_END", "k", "ẻng", "Tiếng kẻng", "🔔", "E, Ngờ, Eng! Kờ, Eng, Keng, Hỏi, Kẻng! Leng keng!"],
  ["ec", "e", "c", "E", "CCH_END", "ph", "éc", "Kéo phéc", "🧥", "E, Cờ, Éc! Phờ, Éc, Phéc, Sắc, Phéc! Kéo phéc áo!"],

  // =========================================================================
  // 8. BẢNG Ê (7 VẦN)
  // =========================================================================
  ["êu", "ê", "u", "EE", "VOWEL_END", "l", "ều", "Lều truyện", "⛺", "Ê, U, Êu! Lờ, Êu, Lêu, Huyền, Lều! Cái lều đọc truyện!"],
  ["êm", "ê", "m", "EE", "MP_END", "đ", "ệm", "Ghế đệm", "🛋️", "Ê, Mờ, Êm! Đờ, Êm, Đêm, Nặng, Đệm! Ghế đệm êm ái!", undefined, undefined, "/assets/items/home/home_06.webp"],
  ["êp", "ê", "p", "EE", "MP_END", "b", "ếp", "Nhà bếp", "🍳", "Ê, Pờ, Êp! Bờ, Êp, Bêp, Sắc, Bếp! Đầu bếp nhí!", undefined, "ep-êp-ăp", "/assets/items/lifeskills/lifeskills_07.webp"],
  ["ên", "ê", "n", "EE", "NT_END", "n", "ến", "Ngọn nến", "🕯️", "Ê, Nờ, Ên! Nờ, Ên, Nên, Sắc, Nến! Thổi nến sinh nhật!"],
  ["êt", "ê", "t", "EE", "NT_END", "t", "ết", "Ngày Tết", "🧧", "Ê, Tờ, Êt! Tờ, Êt, Têt, Sắc, Tết! Vui ngày Tết!"],
  ["ênh", "ê", "nh", "EE", "NGNH_END", "k", "ênh", "Dòng kênh", "🚤", "Ê, Nhờ, Ênh! Kờ, Ênh, Kênh! Dòng kênh xanh!"],
  ["êch", "ê", "ch", "EE", "CCH_END", "", "ếch", "Con ếch", "🐸", "Ê, Chờ, Êch! Êch, Sắc, Ếch! Chú ếch xanh!"],

  // =========================================================================
  // 9. BẢNG I / Y & IÊ / YÊ (16 VẦN)
  // =========================================================================
  ["ia", "i", "a", "I_IE", "VOWEL_END", "th", "ìa", "Chiếc thìa", "🥄", "I, A, Ia! Thờ, Ia, Thia, Huyền, Thìa! Chiếc thìa!", undefined, undefined, "/assets/items/home/home_03.webp"],
  ["iu", "i", "u", "I_IE", "VOWEL_END", "d", "ịu", "Dịu dàng", "🌸", "I, U, Iu! Dờ, Iu, Diu, Nặng, Dịu! Dịu dàng!"],
  ["im", "i", "m", "I_IE", "MP_END", "t", "im", "Trái tim", "💖", "I, Mờ, Im! Tờ, Im, Tim! Trái tim hồng!"],
  ["ip", "i", "p", "I_IE", "MP_END", "nh", "ịp", "Nhịp điệu", "🎵", "I, Pờ, Íp! Nhờ, Íp, Nhíp, Nặng, Nhịp! Nhịp điệu vui!"],
  ["in", "i", "n", "I_IE", "NT_END", "ch", "ín", "Xoài chín", "🥭", "I, Nờ, In! Chờ, In, Chin, Sắc, Chín! Quả xoài chín!", undefined, undefined, "/assets/items/fruits/fruit_13.webp"],
  ["it", "i", "t", "I_IE", "NT_END", "v", "ịt", "Con vịt", "🦆", "I, Tờ, Ít! Vờ, Ít, Vít, Nặng, Vịt! Chú vịt vàng!"],
  ["inh", "i", "nh", "I_IE", "NGNH_END", "b", "ình", "Bình tưới", "🚿", "I, Nhờ, Inh! Bờ, Inh, Binh, Huyền, Bình! Bình tưới hoa!", undefined, undefined, "/assets/items/home/home_15.webp"],
  ["ich", "i", "ch", "I_IE", "CCH_END", "l", "ịch", "Tờ lịch", "📅", "I, Chờ, Ích! Lờ, Ích, Lích, Nặng, Lịch! Tờ lịch mới!"],
  ["iêu", "iê", "u", "I_IE", "VOWEL_END", "d", "iều", "Cánh diều", "🪁", "I, Ê, U, Iêu! Dờ, Iêu, Diêu, Huyền, Diều! Thả diều!", "Nguyên âm đôi IÊ ghép với âm cuối U: iê + u = iêu", "iêu-uôi-ươi"],
  ["yêu", "yê", "u", "I_IE", "VOWEL_END", "", "yêu", "Yêu thương", "❤️", "Y, Ê, U, Yêu! Bé yêu ba mẹ!", "Đứng một mình không có âm đầu thì viết YÊ + U = YÊU"],
  ["iêm", "iê", "m", "I_IE", "MP_END", "d", "iêm", "Que diêm", "🔥", "I, Ê, Mờ, Iêm! Dờ, Iêm, Diêm!"],
  ["iêp", "iê", "p", "I_IE", "MP_END", "th", "iệp", "Tấm thiệp", "💌", "I, Ê, Pờ, Iêp! Thờ, Iêp, Thiêp, Nặng, Thiệp! Tấm thiệp hồng!"],
  ["iên", "iê", "n", "I_IE", "NT_END", "b", "iển", "Bãi biển", "🏖️", "I, Ê, Nờ, Iên! Bờ, Iên, Biên, Hỏi, Biển! Bãi biển xanh!", "Nguyên âm đôi IÊ ghép với âm cuối N: iê + n = iên"],
  ["iêt", "iê", "t", "I_IE", "NT_END", "v", "iết", "Tập viết", "✏️", "I, Ê, Tờ, Iêt! Vờ, Iêt, Viêt, Sắc, Viết! Bé tập viết!", undefined, undefined, "/assets/items/school/school_04.webp"],
  ["iêng", "iê", "ng", "I_IE", "NGNH_END", "ch", "iêng", "Tiếng chiêng", "🥁", "I, Ê, Ngờ, Iêng! Chờ, Iêng, Chiêng!"],
  ["iêc", "iê", "c", "I_IE", "CCH_END", "t", "iệc", "Bữa tiệc", "🎂", "I, Ê, Cờ, Iêc! Tờ, Iêc, Tiêc, Nặng, Tiệc! Bữa tiệc sinh nhật!"],

  // =========================================================================
  // 10. BẢNG U & UÔ (16 VẦN)
  // =========================================================================
  ["ui", "u", "i", "U_UO", "VOWEL_END", "v", "ui", "Học vui", "😄", "U, I, Ui! Vờ, Ui, Vui! Nấm học vui!"],
  ["ua", "u", "a", "U_UO", "VOWEL_END", "c", "ua", "Con cua", "🦀", "U, A, Ua! Cờ, Ua, Cua! Con cua tám cẳng!"],
  ["uê", "u", "ê", "U_UO", "VOWEL_END", "h", "uệ", "Hoa huệ", "💮", "U, Ê, Uê! Hờ, Uê, Huê, Nặng, Huệ! Bông hoa huệ!"],
  ["uơ", "u", "ơ", "U_UO", "VOWEL_END", "h", "uơ", "Voi huơ vòi", "🐘", "U, Ơ, Uơ! Hờ, Uơ, Huơ! Chú voi huơ vòi!"],
  ["um", "u", "m", "U_UO", "MP_END", "ch", "ùm", "Chùm nho", "🍇", "U, Mờ, Um! Chờ, Um, Chum, Huyền, Chùm! Chùm nho tím!", undefined, undefined, "/assets/items/fruits/fruit_06.webp"],
  ["up", "u", "p", "U_UO", "MP_END", "b", "úp", "Búp bê", "🎎", "U, Pờ, Úp! Bờ, Úp, Búp, Sắc, Búp! Búp bê xinh!"],
  ["un", "u", "n", "U_UO", "NT_END", "c", "ún", "Cún con", "🐶", "U, Nờ, Un! Cờ, Un, Cun, Sắc, Cún! Chú cún con!"],
  ["ut", "u", "t", "U_UO", "NT_END", "b", "út", "Cây bút", "🖊️", "U, Tờ, Út! Bờ, Út, Bút, Sắc, Bút! Cây bút hồng!", undefined, undefined, "/assets/items/school/school_05.webp"],
  ["ung", "u", "ng", "U_UO", "NGNH_END", "th", "ùng", "Thùng quà", "🎁", "U, Ngờ, Ung! Thờ, Ung, Thung, Huyền, Thùng!"],
  ["uc", "u", "c", "U_UO", "CCH_END", "c", "úc", "Hoa cúc", "🌼", "U, Cờ, Úc! Cờ, Úc, Cúc, Sắc, Cúc! Hoa cúc vàng!"],
  ["uôi", "uô", "i", "U_UO", "VOWEL_END", "ch", "uối", "Quả chuối", "🍌", "U, Ô, I, Uôi! Chờ, Uôi, Chuôi, Sắc, Chuối! Quả chuối vàng!", "Nguyên âm đôi UÔ ghép với âm cuối I: uô + i = uôi", "iêu-uôi-ươi", "/assets/items/fruits/fruit_03.webp"],
  ["uôm", "uô", "m", "U_UO", "MP_END", "b", "uồm", "Thuyền buồm", "⛵", "U, Ô, Mờ, Uôm! Bờ, Uôm, Buôm, Huyền, Buồm! Thuyền buồm!", "Nguyên âm đôi UÔ ghép với âm cuối M: uô + m = uôm", undefined, "/assets/items/vehicles/vehicle_08.webp"],
  ["uôn", "uô", "n", "U_UO", "NT_END", "c", "uộn", "Bánh cuộn", "🍰", "U, Ô, Nờ, Uôn! Cờ, Uôn, Cuôn, Nặng, Cuộn! Bánh kem cuộn!", "Nguyên âm đôi UÔ ghép với âm cuối N: uô + n = uôn", undefined, "/assets/math/pastries16/pastry16_05.webp"],
  ["uôt", "uô", "t", "U_UO", "NT_END", "ch", "uột", "Con chuột", "🐭", "U, Ô, Tờ, Uôt! Chờ, Uôt, Chuôt, Nặng, Chuột! Chú chuột nhỏ!"],
  ["uông", "uô", "ng", "U_UO", "NGNH_END", "ch", "uông", "Đồng hồ chuông", "⏰", "U, Ô, Ngờ, Uông! Chờ, Uông, Chuông! Tiếng chuông reo!", undefined, undefined, "/assets/items/home/home_05.webp"],
  ["uôc", "uô", "c", "U_UO", "CCH_END", "th", "uốc", "Viên thuốc", "💊", "U, Ô, Cờ, Uôc! Thờ, Uôc, Thuôc, Sắc, Thuốc!"],

  // =========================================================================
  // 11. BẢNG Ư & ƯƠ (14 VẦN)
  // =========================================================================
  ["ưi", "ư", "i", "UW_UOW", "VOWEL_END", "g", "ửi", "Gửi thư", "✉️", "Ư, I, Ưi! Gờ, Ưi, Gưi, Hỏi, Gửi! Gửi lá thư!"],
  ["ưu", "ư", "u", "UW_UOW", "VOWEL_END", "c", "ừu", "Con cừu", "🐑", "Ư, U, Ưu! Cờ, Ưu, Cưu, Huyền, Cừu! Chú cừu bông!"],
  ["ưa", "ư", "a", "UW_UOW", "VOWEL_END", "d", "ưa", "Dưa hấu", "🍉", "Ư, A, Ưa! Dờ, Ưa, Dưa! Miếng dưa hấu đỏ!", undefined, undefined, "/assets/items/fruits/fruit_05.webp"],
  ["ưt", "ư", "t", "UW_UOW", "NT_END", "m", "ứt", "Khay mứt", "🍬", "Ư, Tờ, Ưt! Mờ, Ưt, Mưt, Sắc, Mứt! Mứt Tết ngọt ngào!"],
  ["ưng", "ư", "ng", "UW_UOW", "NGNH_END", "tr", "ứng", "Quả trứng", "🥚", "Ư, Ngờ, Ưng! Trờ, Ưng, Trưng, Sắc, Trứng! Quả trứng gà!", undefined, undefined, "/assets/items/lifeskills/lifeskills_04.webp"],
  ["ưc", "ư", "c", "UW_UOW", "CCH_END", "m", "ực", "Lọ mực", "🖋️", "Ư, Cờ, Ưc! Mờ, Ưc, Mưc, Nặng, Mực!"],
  ["ươi", "ươ", "i", "UW_UOW", "VOWEL_END", "t", "ươi", "Tươi cười", "😁", "Ư, Ơ, I, Ươi! Tờ, Ươi, Tươi! Nụ cười tươi!", "Nguyên âm đôi ƯƠ ghép với âm cuối I: ươ + i = ươi", "iêu-uôi-ươi"],
  ["ươu", "ươ", "u", "UW_UOW", "VOWEL_END", "h", "ươu", "Hươu cao cổ", "🦒", "Ư, Ơ, U, Ươu! Hờ, Ươu, Hươu! Chú hươu cao cổ!"],
  ["ươm", "ươ", "m", "UW_UOW", "MP_END", "b", "ướm", "Con bướm", "🦋", "Ư, Ơ, Mờ, Ươm! Bờ, Ươm, Bươm, Sắc, Bướm! Cánh bướm xinh!"],
  ["ươp", "ươ", "p", "UW_UOW", "MP_END", "m", "ướp", "Quả mướp", "🥒", "Ư, Ơ, Pờ, Ươp! Mờ, Ươp, Mươp, Sắc, Mướp!"],
  ["ươn", "ươ", "n", "UW_UOW", "NT_END", "v", "ườn", "Khu vườn", "🏡", "Ư, Ơ, Nờ, Ươn! Vờ, Ươn, Vươn, Huyền, Vườn! Vườn hoa!"],
  ["ươt", "ươ", "t", "UW_UOW", "NT_END", "tr", "ượt", "Ván trượt", "🛹", "Ư, Ơ, Tờ, Ươt! Trờ, Ươt, Trươt, Nặng, Trượt! Ván trượt!", undefined, undefined, "/assets/items/vehicles/vehicle_15.webp"],
  ["ương", "ươ", "ng", "UW_UOW", "NGNH_END", "tr", "ường", "Trường học", "🏫", "Ư, Ơ, Ngờ, Ương! Trờ, Ương, Trương, Huyền, Trường! Đến trường!", "Nguyên âm đôi ƯƠ ghép với âm cuối NG: ươ + ng = ương"],
  ["ươc", "ươ", "c", "UW_UOW", "CCH_END", "th", "ước", "Thước kẻ", "📏", "Ư, Ơ, Cờ, Ươc! Thờ, Ươc, Thươc, Sắc, Thước! Thước kẻ gỗ!", undefined, undefined, "/assets/items/school/school_06.webp"],

  // =========================================================================
  // 12. BẢNG VẦN TRÒN MÔI 3–4 CHỮ: OA, OĂ, OE, UÂ, UY, UYÊ (25 VẦN)
  // =========================================================================
  ["oai", "oa", "i", "OA_OE_UY", "VOWEL_END", "x", "oài", "Quả xoài", "🥭", "O, A, I, Oai! Xờ, Oai, Xoai, Huyền, Xoài! Quả xoài chín!", "Cụm tròn môi OA ghép với âm cuối I: oa + i = oai", undefined, "/assets/items/fruits/fruit_13.webp"],
  ["oay", "oa", "y", "OA_OE_UY", "VOWEL_END", "x", "oay", "Xoay vòng", "🌀", "O, A, Y, Oay! Xờ, Oay, Xoay! Xoay quả địa cầu!", "Cụm tròn môi OA ghép với âm cuối Y: oa + y = oay", undefined, "/assets/items/school/school_15.webp"],
  ["oan", "oa", "n", "OA_OE_UY", "NT_END", "ng", "oan", "Bé ngoan", "🌟", "O, A, Nờ, Oan! Ngờ, Oan, Ngoan! Bé Nấm chăm ngoan!", "Cụm tròn môi OA ghép với âm cuối N: oa + n = oan", "oan-oang"],
  ["oat", "oa", "t", "OA_OE_UY", "NT_END", "h", "oạt", "Hoạt hình", "🎬", "O, A, Tờ, Oat! Hờ, Oat, Hoat, Nặng, Hoạt! Phim hoạt hình!"],
  ["oang", "oa", "ng", "OA_OE_UY", "NGNH_END", "ch", "oàng", "Áo choàng", "👑", "O, A, Ngờ, Oang! Chờ, Oang, Choang, Huyền, Choàng! Áo choàng!", "Cụm tròn môi OA ghép với âm cuối NG: oa + ng = oang", "oan-oang"],
  ["oanh", "oa", "nh", "OA_OE_UY", "NGNH_END", "kh", "oanh", "Khoanh tay", "🙇", "O, A, Nhờ, Oanh! Khờ, Oanh, Khoanh! Khoanh tay lễ phép!"],
  ["oach", "oa", "ch", "OA_OE_UY", "CCH_END", "h", "oạch", "Thu hoạch", "🧺", "O, A, Chờ, Oach! Hờ, Oach, Hoach, Nặng, Hoạch! Thu hoạch quả!"],
  ["oăm", "oă", "m", "OA_OE_UY", "MP_END", "kh", "oằm", "Mỏ khoằm", "🦅", "O, Á, Mờ, Oăm! Khờ, Oăm, Khoăm, Huyền, Khoằm! Mỏ khoằm!"],
  ["oăn", "oă", "n", "OA_OE_UY", "NT_END", "x", "oăn", "Tóc xoăn", "🦱", "O, Á, Nờ, Oăn! Xờ, Oăn, Xoăn! Mái tóc xoăn!"],
  ["oăt", "oă", "t", "OA_OE_UY", "NT_END", "th", "oắt", "Thoăn thoắt", "⚡", "O, Á, Tờ, Oăt! Thờ, Oăt, Thoăt, Sắc, Thoắt! Nhanh thoăn thoắt!"],
  ["oăng", "oă", "ng", "OA_OE_UY", "NGNH_END", "h", "oẵng", "Con hoẵng", "🦌", "O, Á, Ngờ, Oăng! Hờ, Oăng, Hoăng, Ngã, Hoẵng! Con hoẵng!"],
  ["oăc", "oă", "c", "OA_OE_UY", "CCH_END", "ng", "oặc", "Dấu ngoặc", "📝", "O, Á, Cờ, Oăc! Ngờ, Oăc, Ngoăc, Nặng, Ngoặc!"],
  ["oen", "oe", "n", "OA_OE_UY", "NT_END", "h", "oen", "Hoen ố", "💧", "O, E, Nờ, Oen! Hờ, Oen, Hoen!"],
  ["oet", "oe", "t", "OA_OE_UY", "NT_END", "kh", "oét", "Khoét lỗ", "🕳️", "O, E, Tờ, Oet! Khờ, Oet, Khoet, Sắc, Khoét!"],
  ["uây", "uâ", "y", "OA_OE_UY", "VOWEL_END", "kh", "uấy", "Khuấy bột", "🥣", "U, Ớ, Y, Uây! Khờ, Uây, Khuây, Sắc, Khuấy! Khuấy bột làm bánh!", "Cụm tròn môi UÂ ghép với âm cuối Y: uâ + y = uây", undefined, "/assets/items/lifeskills/lifeskills_02.webp"],
  ["uân", "uâ", "n", "OA_OE_UY", "NT_END", "x", "uân", "Mùa xuân", "🌸", "U, Ớ, Nờ, Uân! Xờ, Uân, Xuân! Hoa nở mùa xuân!", "Cụm tròn môi UÂ ghép với âm cuối N: uâ + n = uân"],
  ["uât", "uâ", "t", "OA_OE_UY", "NT_END", "th", "uật", "Mỹ thuật", "🎨", "U, Ớ, Tờ, Uât! Thờ, Uât, Thuât, Nặng, Thuật! Môn Mỹ thuật!", undefined, undefined, "/assets/items/school/school_11.webp"],
  ["uâng", "uâ", "ng", "OA_OE_UY", "NGNH_END", "kh", "uâng", "Bâng khuâng", "☁️", "U, Ớ, Ngờ, Uâng! Khờ, Uâng, Khuâng! Bâng khuâng!"],
  ["uya", "uy", "a", "OA_OE_UY", "VOWEL_END", "kh", "uya", "Đêm khuya", "🌌", "U, Y, A, Uya! Khờ, Uya, Khuya! Đêm khuya đầy sao!"],
  ["uyn", "uy", "n", "OA_OE_UY", "NT_END", "t", "uyn", "Màn tuyn", "⛺", "U, Y, Nờ, Uyn! Tờ, Uyn, Tuyn! Màn tuyn chống muỗi!"],
  ["uyt", "uy", "t", "OA_OE_UY", "NT_END", "b", "uýt", "Xe buýt", "🚌", "U, Y, Tờ, Uyt! Bờ, Uyt, Buyt, Sắc, Buýt! Xe buýt vàng!", "Cụm tròn môi UY ghép với âm cuối T: uy + t = uyt", undefined, "/assets/items/vehicles/vehicle_02.webp"],
  ["uynh", "uy", "nh", "OA_OE_UY", "NGNH_END", "h", "uỳnh", "Đèn huỳnh quang", "💡", "U, Y, Nhờ, Uynh! Hờ, Uynh, Huynh, Huyền, Huỳnh! Đèn huỳnh quang!"],
  ["uych", "uy", "ch", "OA_OE_UY", "CCH_END", "h", "uỵch", "Chạy huỳnh huỵch", "🏃", "U, Y, Chờ, Uych! Hờ, Uych, Huych, Nặng, Huỵch! Chạy huỳnh huỵch!"],
  ["uyên", "uyê", "n", "OA_OE_UY", "NT_END", "th", "uyền", "Thuyền buồm", "⛵", "U, Y, Ê, Nờ, Uyên! Thờ, Uyên, Thuyên, Huyền, Thuyền! Thuyền buồm!", "Cụm tròn môi UYÊ ghép với âm cuối N: uyê + n = uyên", undefined, "/assets/items/vehicles/vehicle_08.webp"],
  ["uyêt", "uyê", "t", "OA_OE_UY", "NT_END", "t", "uyết", "Bông tuyết", "❄️", "U, Y, Ê, Tờ, Uyêt! Tờ, Uyêt, Tuyêt, Sắc, Tuyết! Bông tuyết trắng!", "Cụm tròn môi UYÊ ghép với âm cuối T: uyê + t = uyêt", undefined, "/assets/stickers/countries/country_20.webp"],
];

export const VIETNAMESE_132_RHYMES: VietnameseRhymeItem[] = RAW_132_RHYMES.map(
  (seed, idx) => ({
    id: `rhyme-${idx + 1}-${seed[0]}`,
    rhyme: seed[0],
    headPart: seed[1],
    tailPart: seed[2],
    headGroup: seed[3],
    tailGroup: seed[4],
    anchorOnset: seed[5],
    anchorRhymeWithTone: seed[6],
    anchorPhrase: seed[7],
    emoji: seed[8],
    spokenNorth: seed[9],
    bridgeHint: seed[10],
    confusingGroup: seed[11],
    imageUrl: seed[12],
  }),
);

export const CONFUSING_RHYME_PAIRS = [
  {
    id: "oe-eo",
    title: "🔄 Cặp Đảo Chiều: OE ↔ EO & OA ↔ AO",
    tip: "Nhìn chữ đứng trước để mở miệng: E đứng trước là EO (Cây kéo), O tròn đứng trước là OE (Hoa xòe)!",
    rhymes: ["eo", "oe", "oa", "ao", "au", "âu"],
  },
  {
    id: "oi-ôi-ơi",
    title: "🎩 Bộ Ba Anh Em: OI – ÔI – ƠI & AI – AY – ÂY",
    tip: "O tròn (Con voi) • Ô đội nón (Chiếc gối) • Ơ thêm râu (Đi bơi)!",
    rhymes: ["oi", "ôi", "ơi", "ai", "ay", "ây"],
  },
  {
    id: "ep-êp-ăp",
    title: "👄 Vần Khép Môi: EP – ÊP – ĂP – AP & EM – AM",
    tip: "Đọc xong hai môi chạm nhau: ep (Đôi dép), êp (Nhà bếp), ăp (Cặp sách), ap (Bút sáp)!",
    rhymes: ["ep", "êp", "ăp", "ap", "em", "am"],
  },
  {
    id: "iêu-uôi-ươi",
    title: "🌉 Vần Dài 3 Chữ: IÊU – UÔI – ƯƠI – OAI – OAN – ƯƠNG",
    tip: "Ghép cụm nguyên âm đầu + âm cuối: (uô + i = uôi: Quả chuối), (oa + n = oan: Bé ngoan), (ươ + ng = ương: Trường học)!",
    rhymes: ["uôi", "ươi", "iêu", "oai", "oan", "ương", "uyt", "ươc"],
  },
];
