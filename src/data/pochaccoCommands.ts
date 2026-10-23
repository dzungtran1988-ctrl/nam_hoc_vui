export interface PochaccoActionItem {
  id: string;
  /** Động tác gốc (ví dụ: "vỗ tay hai cái thật vui") */
  actionText: string;
  /** Nhãn hiển thị ngắn gọn của động tác */
  shortLabel: string;
  /** Biểu tượng minh họa dự phòng */
  emoji: string;
  /** Ảnh minh họa 3D Pochacco tập động tác tương ứng */
  imageUrl: string;
  /** Chủ đề vận động */
  category: "Tay xinh" | "Đầu & Tai" | "Vận động khỏe" | "Thăng bằng";
}

export interface PochaccoStickerItem {
  id: string;
  name: string;
  imageUrl: string;
}

/**
 * Bộ ảnh trạng thái tương tác của Bé Nấm & Pochacco (Lắng nghe, Đứng im, Đã làm, Thử lại).
 */
export const POCHACCO_STATE_IMAGES = {
  freezeDuo: "/assets/pochacco/state-freeze-duo.png",
  doneDuo: "/assets/pochacco/state-done-duo.png",
  listenDuo: "/assets/pochacco/state-listen-duo.png",
  retryDuo: "/assets/pochacco/state-retry-duo.png",
  freezeSolo: "/assets/pochacco/state-freeze-solo.png",
  doneSolo: "/assets/pochacco/state-done-solo.png",
  listenSolo: "/assets/pochacco/state-listen-solo.png",
  retrySolo: "/assets/pochacco/state-retry-solo.png",
} as const;

/**
 * Bộ 6 Sticker Pochacco phần thưởng khi bé hoàn thành các vòng vận động 10 lệnh.
 */
export const POCHACCO_STICKERS: readonly PochaccoStickerItem[] = [
  {
    id: "sticker-love",
    name: "Pochacco Thả Tim",
    imageUrl: "/assets/pochacco/sticker-love.png",
  },
  {
    id: "sticker-soccer",
    name: "Cầu Thủ Pochacco",
    imageUrl: "/assets/pochacco/sticker-soccer.png",
  },
  {
    id: "sticker-dance",
    name: "Pochacco Nhảy Múa",
    imageUrl: "/assets/pochacco/sticker-dance.png",
  },
  {
    id: "sticker-book",
    name: "Pochacco Chăm Đọc",
    imageUrl: "/assets/pochacco/sticker-book.png",
  },
  {
    id: "sticker-icecream",
    name: "Pochacco Kem Ngọt",
    imageUrl: "/assets/pochacco/sticker-icecream.png",
  },
  {
    id: "sticker-sleep",
    name: "Pochacco Ôm Sao",
    imageUrl: "/assets/pochacco/sticker-sleep.png",
  },
] as const;

/**
 * Ngân hàng 18 động tác vận động an toàn trong nhà cho bé Nấm,
 * khớp 1-1 với 18 hình minh họa 3D Pochacco trong thư mục D:\Nấm học\game.
 */
export const POCHACCO_ACTION_BANK: readonly PochaccoActionItem[] = [
  {
    id: "clap-two",
    actionText: "vỗ tay hai cái thật vui",
    shortLabel: "Vỗ tay hai cái",
    emoji: "👏",
    imageUrl: "/assets/pochacco/action-clap-two.png",
    category: "Tay xinh",
  },
  {
    id: "hands-up",
    actionText: "giơ hai tay lên cao",
    shortLabel: "Giơ hai tay lên cao",
    emoji: "🙌",
    imageUrl: "/assets/pochacco/action-hands-up.png",
    category: "Tay xinh",
  },
  {
    id: "hands-on-head",
    actionText: "đặt hai tay lên đầu",
    shortLabel: "Đặt hai tay lên đầu",
    emoji: "🙆",
    imageUrl: "/assets/pochacco/action-hands-on-head.png",
    category: "Đầu & Tai",
  },
  {
    id: "wave-hello",
    actionText: "vẫy tay chào bạn Pochacco",
    shortLabel: "Vẫy tay chào",
    emoji: "👋",
    imageUrl: "/assets/pochacco/action-wave-hello.png",
    category: "Tay xinh",
  },
  {
    id: "touch-ears",
    actionText: "giơ một tay cao chạm tai xinh",
    shortLabel: "Giơ tay chạm tai",
    emoji: "👂",
    imageUrl: "/assets/pochacco/action-touch-ears.png",
    category: "Đầu & Tai",
  },
  {
    id: "tilt-head",
    actionText: "nghiêng đầu sang bên đáng yêu",
    shortLabel: "Nghiêng đầu xinh",
    emoji: "🐶",
    imageUrl: "/assets/pochacco/action-tilt-head.png",
    category: "Đầu & Tai",
  },
  {
    id: "stretch-side",
    actionText: "nghiêng người tập thể dục",
    shortLabel: "Nghiêng người",
    emoji: "🤸",
    imageUrl: "/assets/pochacco/action-stretch-side.png",
    category: "Vận động khỏe",
  },
  {
    id: "squat-down",
    actionText: "ngồi xổm chạm hai tay xuống gối",
    shortLabel: "Ngồi xổm chạm gối",
    emoji: "🦵",
    imageUrl: "/assets/pochacco/action-squat-down.png",
    category: "Vận động khỏe",
  },
  {
    id: "stand-one-leg",
    actionText: "đứng một chân giữ thăng bằng",
    shortLabel: "Đứng một chân",
    emoji: "🦩",
    imageUrl: "/assets/pochacco/action-stand-one-leg.png",
    category: "Thăng bằng",
  },
  {
    id: "march-in-place",
    actionText: "giậm chân nhẹ tại chỗ",
    shortLabel: "Giậm chân tại chỗ",
    emoji: "🦶",
    imageUrl: "/assets/pochacco/action-march-in-place.png",
    category: "Vận động khỏe",
  },
  {
    id: "strong-fists",
    actionText: "nắm hai tay trước ngực thật khỏe",
    shortLabel: "Nắm tay khỏe mạnh",
    emoji: "💪",
    imageUrl: "/assets/pochacco/action-strong-fists.png",
    category: "Tay xinh",
  },
  {
    id: "spin-waist",
    actionText: "xoay người vòng tròn thật vui",
    shortLabel: "Xoay người tròn",
    emoji: "🌀",
    imageUrl: "/assets/pochacco/action-spin-waist.png",
    category: "Thăng bằng",
  },
  {
    id: "touch-nose",
    actionText: "chạm nhẹ tay vào mũi xinh",
    shortLabel: "Chạm tay vào mũi",
    emoji: "👃",
    imageUrl: "/assets/pochacco/action-touch-nose.png",
    category: "Đầu & Tai",
  },
  {
    id: "hands-on-hips",
    actionText: "chống hai tay lên hông",
    shortLabel: "Chống tay lên hông",
    emoji: "🕺",
    imageUrl: "/assets/pochacco/action-hands-on-hips.png",
    category: "Thăng bằng",
  },
  {
    id: "deep-breath",
    actionText: "hít thở sâu phồng má thật to",
    shortLabel: "Hít thở phồng má",
    emoji: "😮‍💨",
    imageUrl: "/assets/pochacco/action-deep-breath.png",
    category: "Vận động khỏe",
  },
  {
    id: "bunny-ears",
    actionText: "giơ hai tay làm tai thỏ trên đầu",
    shortLabel: "Làm tai thỏ",
    emoji: "🐰",
    imageUrl: "/assets/pochacco/action-bunny-ears.png",
    category: "Đầu & Tai",
  },
  {
    id: "stretch-high",
    actionText: "vươn vai cao như chú hươu",
    shortLabel: "Vươn vai cao",
    emoji: "🦒",
    imageUrl: "/assets/pochacco/action-stretch-high.png",
    category: "Vận động khỏe",
  },
  {
    id: "big-smile",
    actionText: "cười thật tươi khoe răng xinh",
    shortLabel: "Cười khoe răng xinh",
    emoji: "😁",
    imageUrl: "/assets/pochacco/action-big-smile.png",
    category: "Đầu & Tai",
  },
] as const;

export const POCHACCO_PRAISES = [
  "Giỏi quá Nấm ơi! Con nghe hiệu lệnh của Pochacco siêu chuẩn luôn!",
  "Hoan hô! Phản xạ của Nấm tuyệt vời quá, tặng con thêm một ngôi sao nhé!",
  "Đúng rồi! Nấm vừa tinh tai vừa nhanh nhẹn, Pochacco khen con!",
  "Xuất sắc luôn! Bé Nấm nhớ luật chơi Pochacco Bảo giỏi ghê!",
] as const;
