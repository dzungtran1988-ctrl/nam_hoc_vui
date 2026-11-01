import type { SubjectId } from "../types.ts";
import { LIFESKILLS_SHARED_ASSETS } from "./sharedAssetCatalog.ts";

export interface CharacterStickerItem {
  id: string;
  index: number; // 1..6
  name: string;
  image: string;
}

export interface SubjectCupConfig {
  subjectId: SubjectId;
  cupTitle: string;
  characterName: string;
  cupImage: string;
  accentColor: string;
  stickers: CharacterStickerItem[];
}

export const NAM_MASTER_CUP_IMAGE = "/assets/rewards/cup-nam.webp";

export const SUBJECT_CUPS: Record<SubjectId, SubjectCupConfig> = {
  reading: {
    subjectId: "reading",
    cupTitle: "Cúp Học Đọc",
    characterName: "Hello Kitty",
    cupImage: "/assets/rewards/cup-reading.webp",
    accentColor: "#FF4D79",
    stickers: [
      {
        id: "reading-1",
        index: 1,
        name: "Kitty Cúp Vàng",
        image: "/assets/rewards/sticker-reading-1.webp",
      },
      {
        id: "reading-2",
        index: 2,
        name: "Kitty Tưới Hoa",
        image: "/assets/rewards/sticker-reading-2.webp",
      },
      {
        id: "reading-3",
        index: 3,
        name: "Kitty Tặng Quà",
        image: "/assets/rewards/sticker-reading-3.webp",
      },
      {
        id: "reading-4",
        index: 4,
        name: "Đầu Bếp Kitty",
        image: "/assets/rewards/sticker-reading-4.webp",
      },
      {
        id: "reading-5",
        index: 5,
        name: "Kitty Thổi Bong Bóng",
        image: "/assets/rewards/sticker-reading-5.webp",
      },
      {
        id: "reading-6",
        index: 6,
        name: "Kitty Dạo Phố",
        image: "/assets/rewards/sticker-reading-6.webp",
      },
    ],
  },
  math: {
    subjectId: "math",
    cupTitle: "Cúp Toán Học",
    characterName: "My Melody",
    cupImage: "/assets/rewards/cup-math.webp",
    accentColor: "#F06595",
    stickers: [
      {
        id: "math-1",
        index: 1,
        name: "My Melody Cúp Vàng",
        image: "/assets/rewards/sticker-math-1.webp",
      },
      {
        id: "math-2",
        index: 2,
        name: "My Melody Dâu Tây",
        image: "/assets/rewards/sticker-math-2.webp",
      },
      {
        id: "math-3",
        index: 3,
        name: "Họa Sĩ My Melody",
        image: "/assets/rewards/sticker-math-3.webp",
      },
      {
        id: "math-4",
        index: 4,
        name: "My Melody Đọc Sách",
        image: "/assets/rewards/sticker-math-4.webp",
      },
      {
        id: "math-5",
        index: 5,
        name: "Đầu Bếp My Melody",
        image: "/assets/rewards/sticker-math-5.webp",
      },
      {
        id: "math-6",
        index: 6,
        name: "My Melody Chở Hoa",
        image: "/assets/rewards/sticker-math-6.webp",
      },
    ],
  },
  music: {
    subjectId: "music",
    cupTitle: "Cúp Học Hát",
    characterName: "Cinnamoroll",
    cupImage: "/assets/rewards/cup-music.webp",
    accentColor: "#339AF0",
    stickers: [
      {
        id: "music-1",
        index: 1,
        name: "Cinna Ôm Vầng Trăng",
        image: "/assets/rewards/sticker-music-1.webp",
      },
      {
        id: "music-2",
        index: 2,
        name: "Cinna Đọc Sách",
        image: "/assets/rewards/sticker-music-2.webp",
      },
      {
        id: "music-3",
        index: 3,
        name: "Ca Sĩ Cinnamoroll",
        image: "/assets/rewards/sticker-music-3.webp",
      },
      {
        id: "music-4",
        index: 4,
        name: "Cinna Tiệc Trà Bánh",
        image: "/assets/rewards/sticker-music-4.webp",
      },
      {
        id: "music-5",
        index: 5,
        name: "Phi Công Cinnamoroll",
        image: "/assets/rewards/sticker-music-5.webp",
      },
      {
        id: "music-6",
        index: 6,
        name: "Cinna Cúp Sao Vàng",
        image: "/assets/rewards/sticker-music-6.webp",
      },
    ],
  },
  english: {
    subjectId: "english",
    cupTitle: "Cúp Tiếng Anh",
    characterName: "Kuromi",
    cupImage: "/assets/rewards/cup-english.webp",
    accentColor: "#845EF7",
    stickers: [
      {
        id: "english-1",
        index: 1,
        name: "Kuromi Cúp Vàng",
        image: "/assets/rewards/sticker-english-1.webp",
      },
      {
        id: "english-2",
        index: 2,
        name: "Kuromi Đọc Sách",
        image: "/assets/rewards/sticker-english-2.webp",
      },
      {
        id: "english-3",
        index: 3,
        name: "Kuromi Kem Parfait",
        image: "/assets/rewards/sticker-english-3.webp",
      },
      {
        id: "english-4",
        index: 4,
        name: "Ca Sĩ Kuromi",
        image: "/assets/rewards/sticker-english-4.webp",
      },
      {
        id: "english-5",
        index: 5,
        name: "Kuromi Trượt Ván",
        image: "/assets/rewards/sticker-english-5.webp",
      },
      {
        id: "english-6",
        index: 6,
        name: "Kuromi Ôm Thú Bông",
        image: "/assets/rewards/sticker-english-6.webp",
      },
    ],
  },
  storybook: {
    subjectId: "storybook",
    cupTitle: "Cúp Đọc Truyện",
    characterName: "Little Twin Stars",
    cupImage: "/assets/rewards/cup-storybook.webp",
    accentColor: "#22B8CF",
    stickers: [
      {
        id: "storybook-1",
        index: 1,
        name: "Twin Stars Vầng Trăng",
        image: "/assets/rewards/sticker-storybook-1.webp",
      },
      {
        id: "storybook-2",
        index: 2,
        name: "Sách Cổ Tích Phép Thuật",
        image: "/assets/rewards/sticker-storybook-2.webp",
      },
      {
        id: "storybook-3",
        index: 3,
        name: "Đũa Phép Ngôi Sao",
        image: "/assets/rewards/sticker-storybook-3.webp",
      },
      {
        id: "storybook-4",
        index: 4,
        name: "Tiệc Bánh Trên Mây",
        image: "/assets/rewards/sticker-storybook-4.webp",
      },
      {
        id: "storybook-5",
        index: 5,
        name: "Xe Cầu Vồng Mây",
        image: "/assets/rewards/sticker-storybook-5.webp",
      },
      {
        id: "storybook-6",
        index: 6,
        name: "Twin Stars Cúp Sao",
        image: "/assets/rewards/sticker-storybook-6.webp",
      },
    ],
  },
  coloring: {
    subjectId: "coloring",
    cupTitle: "Cúp Họa Sĩ Nhí",
    characterName: "Pompompurin",
    cupImage: "/assets/rewards/cup-coloring.webp",
    accentColor: "#F59F00",
    stickers: [
      {
        id: "coloring-1",
        index: 1,
        name: "Purin Bánh Pudding",
        image: "/assets/rewards/sticker-coloring-1.webp",
      },
      {
        id: "coloring-2",
        index: 2,
        name: "Purin Chăm Đọc Sách",
        image: "/assets/rewards/sticker-coloring-2.webp",
      },
      {
        id: "coloring-3",
        index: 3,
        name: "Cầu Thủ Purin",
        image: "/assets/rewards/sticker-coloring-3.webp",
      },
      {
        id: "coloring-4",
        index: 4,
        name: "Purin Nhảy Múa",
        image: "/assets/rewards/sticker-coloring-4.webp",
      },
      {
        id: "coloring-5",
        index: 5,
        name: "Purin Kem Ốc Quế",
        image: "/assets/rewards/sticker-coloring-5.webp",
      },
      {
        id: "coloring-6",
        index: 6,
        name: "Purin Ôm Sao Ngủ",
        image: "/assets/rewards/sticker-coloring-6.webp",
      },
    ],
  },
  minigame: {
    subjectId: "minigame",
    cupTitle: "Cúp Vận Động",
    characterName: "Pochacco",
    cupImage: "/assets/rewards/cup-minigame.webp",
    accentColor: "#20C997",
    stickers: [
      {
        id: "minigame-1",
        index: 1,
        name: "Pochacco Vẫy Tay",
        image: "/assets/rewards/sticker-minigame-1.webp",
      },
      {
        id: "minigame-2",
        index: 2,
        name: "Pochacco Đọc Sách",
        image: "/assets/rewards/sticker-minigame-2.webp",
      },
      {
        id: "minigame-3",
        index: 3,
        name: "Cầu Thủ Pochacco",
        image: "/assets/rewards/sticker-minigame-3.webp",
      },
      {
        id: "minigame-4",
        index: 4,
        name: "Pochacco Nhảy Múa",
        image: "/assets/rewards/sticker-minigame-4.webp",
      },
      {
        id: "minigame-5",
        index: 5,
        name: "Pochacco Ăn Kem",
        image: "/assets/rewards/sticker-minigame-5.webp",
      },
      {
        id: "minigame-6",
        index: 6,
        name: "Pochacco Ngủ Ngon",
        image: "/assets/rewards/sticker-minigame-6.webp",
      },
    ],
  },
  lifeskills: {
    subjectId: "lifeskills",
    cupTitle: "Cúp Kỹ Năng Sống",
    characterName: "Đầu Bếp & Món Ngon 3D",
    cupImage: "/assets/items/lifeskills/lifeskills_08.webp",
    accentColor: "#F6AD55",
    stickers: LIFESKILLS_SHARED_ASSETS.slice(0, 6).map((asset, idx) => ({
      id: `lifeskills-${idx + 1}`,
      index: idx + 1,
      name: asset.name,
      image: asset.imageUrl,
    })),
  },
};

/**
 * 4 BỘ STICKER 3D KỸ NĂNG SỐNG (24 MÓN TỪ KHO DÙNG CHUNG LIFESKILLS_SHARED_ASSETS):
 * - Bộ 1 (lifeskills_01..06): Nguyên Liệu & Sơ Chế
 * - Bộ 2 (lifeskills_07..12): Dụng Cụ Nấu Nướng
 * - Bộ 3 (lifeskills_13..18): Tiệm Bánh Ngọt Của Nấm
 * - Bộ 4 (lifeskills_19..24): Bữa Cơm & Món Ngon
 */
export const LIFESKILLS_STICKER_SETS: Record<1 | 2 | 3 | 4, CharacterStickerItem[]> = {
  1: SUBJECT_CUPS.lifeskills.stickers,
  2: LIFESKILLS_SHARED_ASSETS.slice(6, 12).map((asset, idx) => ({
    id: `lifeskills-s2-${idx + 1}`,
    index: idx + 1,
    name: asset.name,
    image: asset.imageUrl,
  })),
  3: LIFESKILLS_SHARED_ASSETS.slice(12, 18).map((asset, idx) => ({
    id: `lifeskills-s3-${idx + 1}`,
    index: idx + 1,
    name: asset.name,
    image: asset.imageUrl,
  })),
  4: LIFESKILLS_SHARED_ASSETS.slice(18, 24).map((asset, idx) => ({
    id: `lifeskills-s4-${idx + 1}`,
    index: idx + 1,
    name: asset.name,
    image: asset.imageUrl,
  })),
};

export const STORYBOOK_HALLOWEEN_SET_2: CharacterStickerItem[] = [
  {
    id: "hw-char-kitty-witch",
    index: 1,
    name: "Hello Kitty Phù Thủy Nơ Cam",
    image: "/assets/halloween/char-kitty-witch.webp",
  },
  {
    id: "hw-char-mymelody-witch",
    index: 2,
    name: "My Melody Áo Choàng Đêm",
    image: "/assets/halloween/char-mymelody-witch.webp",
  },
  {
    id: "hw-char-cinnamoroll-wizard",
    index: 3,
    name: "Cinnamoroll Phù Thủy Sao",
    image: "/assets/halloween/char-cinnamoroll-wizard.webp",
  },
  {
    id: "hw-char-kuromi-devil",
    index: 4,
    name: "Kuromi Tiểu Quỷ Đinh Ba",
    image: "/assets/halloween/char-kuromi-devil.webp",
  },
  {
    id: "hw-char-twinstars-halloween",
    index: 5,
    name: "Kiki & Lala Đêm Phép Thuật",
    image: "/assets/halloween/char-twinstars-halloween.webp",
  },
  {
    id: "hw-char-pompompurin-vampire",
    index: 6,
    name: "Pompompurin Áo Choàng Bí Ngô",
    image: "/assets/halloween/char-pompompurin-vampire.webp",
  },
];

export interface ThemedSpecialStickerItem {
  id: string;
  index: number; // 1..20
  name: string;
  image: string;
  collection: "careers" | "countries" | "instruments";
  badgeLabel: string;
}

export const SANRIO_CAREER_STICKERS: ThemedSpecialStickerItem[] = [
  { id: "career-01", index: 1, name: "Cô Giáo Hello Kitty", image: "/assets/stickers/careers/career_01.webp", collection: "careers", badgeLabel: "👩‍🏫 Nghề Nghiệp" },
  { id: "career-02", index: 2, name: "Y Tá My Melody", image: "/assets/stickers/careers/career_02.webp", collection: "careers", badgeLabel: "👩‍⚕️ Nghề Nghiệp" },
  { id: "career-03", index: 3, name: "Đầu Bếp Bánh Cinnamoroll", image: "/assets/stickers/careers/career_03.webp", collection: "careers", badgeLabel: "👨‍🍳 Nghề Nghiệp" },
  { id: "career-04", index: 4, name: "Họa Sĩ Thiết Kế Kuromi", image: "/assets/stickers/careers/career_04.webp", collection: "careers", badgeLabel: "🎨 Nghề Nghiệp" },
  { id: "career-05", index: 5, name: "Kỹ Sư Xây Dựng Pompompurin", image: "/assets/stickers/careers/career_05.webp", collection: "careers", badgeLabel: "👷 Nghề Nghiệp" },
  { id: "career-06", index: 6, name: "Cảnh Sát Giao Thông Keroppi", image: "/assets/stickers/careers/career_06.webp", collection: "careers", badgeLabel: "👮 Nghề Nghiệp" },
  { id: "career-07", index: 7, name: "Phi Công Pochacco", image: "/assets/stickers/careers/career_07.webp", collection: "careers", badgeLabel: "✈️ Nghề Nghiệp" },
  { id: "career-08", index: 8, name: "Thuyền Trưởng Tuxedosam", image: "/assets/stickers/careers/career_08.webp", collection: "careers", badgeLabel: "⚓ Nghề Nghiệp" },
  { id: "career-09", index: 9, name: "Giám Đốc Nhí Badtz-Maru", image: "/assets/stickers/careers/career_09.webp", collection: "careers", badgeLabel: "💼 Nghề Nghiệp" },
  { id: "career-10", index: 10, name: "Phóng Viên Kiki & Lala", image: "/assets/stickers/careers/career_10.webp", collection: "careers", badgeLabel: "📸 Nghề Nghiệp" },
  { id: "career-11", index: 11, name: "Nhiếp Ảnh Gia Pochacco", image: "/assets/stickers/careers/career_11.webp", collection: "careers", badgeLabel: "📷 Nghề Nghiệp" },
  { id: "career-12", index: 12, name: "DJ Âm Nhạc Kuromi", image: "/assets/stickers/careers/career_12.webp", collection: "careers", badgeLabel: "🎧 Nghề Nghiệp" },
  { id: "career-13", index: 13, name: "Pha Chế Cà Phê Pompompurin", image: "/assets/stickers/careers/career_13.webp", collection: "careers", badgeLabel: "☕ Nghề Nghiệp" },
  { id: "career-14", index: 14, name: "Cô Chủ Tiệm Hoa My Melody", image: "/assets/stickers/careers/career_14.webp", collection: "careers", badgeLabel: "💐 Nghề Nghiệp" },
  { id: "career-15", index: 15, name: "Bác Sĩ Nhí Hello Kitty", image: "/assets/stickers/careers/career_15.webp", collection: "careers", badgeLabel: "🩺 Nghề Nghiệp" },
  { id: "career-16", index: 16, name: "Cứu Hộ Bãi Biển Keroppi", image: "/assets/stickers/careers/career_16.webp", collection: "careers", badgeLabel: "🛟 Nghề Nghiệp" },
  { id: "career-17", index: 17, name: "Kỹ Sư Máy Tính Cinnamoroll", image: "/assets/stickers/careers/career_17.webp", collection: "careers", badgeLabel: "💻 Nghề Nghiệp" },
  { id: "career-18", index: 18, name: "Đầu Bếp Chảo Nóng Kuromi", image: "/assets/stickers/careers/career_18.webp", collection: "careers", badgeLabel: "🍳 Nghề Nghiệp" },
  { id: "career-19", index: 19, name: "Nghệ Sĩ Đàn Tuxedosam", image: "/assets/stickers/careers/career_19.webp", collection: "careers", badgeLabel: "🎸 Nghề Nghiệp" },
  { id: "career-20", index: 20, name: "Nhà Khoa Học Kiki & Lala", image: "/assets/stickers/careers/career_20.webp", collection: "careers", badgeLabel: "🔬 Nghề Nghiệp" },
];

export const SANRIO_COUNTRY_STICKERS: ThemedSpecialStickerItem[] = [
  { id: "country-01", index: 1, name: "Hello Kitty Kimono Nhật Bản", image: "/assets/stickers/countries/country_01.webp", collection: "countries", badgeLabel: "🇯🇵 Quốc Gia" },
  { id: "country-02", index: 2, name: "My Melody Lễ Hội Nhật Bản", image: "/assets/stickers/countries/country_02.webp", collection: "countries", badgeLabel: "🇯🇵 Quốc Gia" },
  { id: "country-03", index: 3, name: "Cinnamoroll Bánh Mì Pháp", image: "/assets/stickers/countries/country_03.webp", collection: "countries", badgeLabel: "🇫🇷 Quốc Gia" },
  { id: "country-04", index: 4, name: "Kuromi Tháp Eiffel Paris", image: "/assets/stickers/countries/country_04.webp", collection: "countries", badgeLabel: "🇫🇷 Quốc Gia" },
  { id: "country-05", index: 5, name: "Pompompurin Lễ Hội Nước Đức", image: "/assets/stickers/countries/country_05.webp", collection: "countries", badgeLabel: "🇩🇪 Quốc Gia" },
  { id: "country-06", index: 6, name: "Keroppi Cao Bồi Nước Mỹ", image: "/assets/stickers/countries/country_06.webp", collection: "countries", badgeLabel: "🇺🇸 Quốc Gia" },
  { id: "country-07", index: 7, name: "Pochacco Cối Xay Gió Hà Lan", image: "/assets/stickers/countries/country_07.webp", collection: "countries", badgeLabel: "🇳🇱 Quốc Gia" },
  { id: "country-08", index: 8, name: "Tuxedosam Lính Hoàng Gia Anh", image: "/assets/stickers/countries/country_08.webp", collection: "countries", badgeLabel: "🇬🇧 Quốc Gia" },
  { id: "country-09", index: 9, name: "Badtz-Maru Võ Sĩ Samurai", image: "/assets/stickers/countries/country_09.webp", collection: "countries", badgeLabel: "🇯🇵 Quốc Gia" },
  { id: "country-10", index: 10, name: "Kiki & Lala Cổ Phục Đèn Lồng", image: "/assets/stickers/countries/country_10.webp", collection: "countries", badgeLabel: "🏮 Quốc Gia" },
  { id: "country-11", index: 11, name: "Hello Kitty Cờ Nước Mỹ", image: "/assets/stickers/countries/country_11.webp", collection: "countries", badgeLabel: "🇺🇸 Quốc Gia" },
  { id: "country-12", index: 12, name: "My Melody Hoa Tulip Hà Lan", image: "/assets/stickers/countries/country_12.webp", collection: "countries", badgeLabel: "🇳🇱 Quốc Gia" },
  { id: "country-13", index: 13, name: "Cinnamoroll Đèn Lồng Trung Hoa", image: "/assets/stickers/countries/country_13.webp", collection: "countries", badgeLabel: "🇨🇳 Quốc Gia" },
  { id: "country-14", index: 14, name: "Kuromi Hoa Anh Đào Nhật Bản", image: "/assets/stickers/countries/country_14.webp", collection: "countries", badgeLabel: "🇯🇵 Quốc Gia" },
  { id: "country-15", index: 15, name: "Pompompurin Nhạc Công Mexico", image: "/assets/stickers/countries/country_15.webp", collection: "countries", badgeLabel: "🇲🇽 Quốc Gia" },
  { id: "country-16", index: 16, name: "Keroppi Thủy Thủ Biển Xanh", image: "/assets/stickers/countries/country_16.webp", collection: "countries", badgeLabel: "⚓ Quốc Gia" },
  { id: "country-17", index: 17, name: "Pochacco Hanbok Hàn Quốc", image: "/assets/stickers/countries/country_17.webp", collection: "countries", badgeLabel: "🇰🇷 Quốc Gia" },
  { id: "country-18", index: 18, name: "Tuxedosam Hoàng Tử Ả Rập", image: "/assets/stickers/countries/country_18.webp", collection: "countries", badgeLabel: "🇦🇪 Quốc Gia" },
  { id: "country-19", index: 19, name: "Badtz-Maru Kèn Túi Scotland", image: "/assets/stickers/countries/country_19.webp", collection: "countries", badgeLabel: "🏴󠁧󠁢󠁳󠁣󠁴󠁿 Quốc Gia" },
  { id: "country-20", index: 20, name: "Kiki & Lala Bắc Cực Tuyết Trắng", image: "/assets/stickers/countries/country_20.webp", collection: "countries", badgeLabel: "❄️ Quốc Gia" },
];

export const SANRIO_INSTRUMENT_STICKERS: ThemedSpecialStickerItem[] = [
  { id: "instrument-01", index: 1, name: "Hello Kitty Đàn Guitar", image: "/assets/stickers/instruments/music_01.webp", collection: "instruments", badgeLabel: "🎸 Nhạc Cụ" },
  { id: "instrument-02", index: 2, name: "My Melody Đàn Organ Hồng", image: "/assets/stickers/instruments/music_02.webp", collection: "instruments", badgeLabel: "🎹 Nhạc Cụ" },
  { id: "instrument-03", index: 3, name: "Cinnamoroll Dàn Trống Jazz", image: "/assets/stickers/instruments/music_03.webp", collection: "instruments", badgeLabel: "🥁 Nhạc Cụ" },
  { id: "instrument-04", index: 4, name: "Kuromi Guitar Điện Tím", image: "/assets/stickers/instruments/music_04.webp", collection: "instruments", badgeLabel: "🎸 Nhạc Cụ" },
  { id: "instrument-05", index: 5, name: "Pompompurin Kèn Saxophone", image: "/assets/stickers/instruments/music_05.webp", collection: "instruments", badgeLabel: "🎷 Nhạc Cụ" },
  { id: "instrument-06", index: 6, name: "Keroppi Kèn Phím Melodica", image: "/assets/stickers/instruments/music_06.webp", collection: "instruments", badgeLabel: "🎹 Nhạc Cụ" },
  { id: "instrument-07", index: 7, name: "Pochacco Đàn Guitar Gỗ", image: "/assets/stickers/instruments/music_07.webp", collection: "instruments", badgeLabel: "🪕 Nhạc Cụ" },
  { id: "instrument-08", index: 8, name: "Tuxedosam Kèn Trumpet Vàng", image: "/assets/stickers/instruments/music_08.webp", collection: "instruments", badgeLabel: "🎺 Nhạc Cụ" },
  { id: "instrument-09", index: 9, name: "Badtz-Maru Đàn Bass Đỏ", image: "/assets/stickers/instruments/music_09.webp", collection: "instruments", badgeLabel: "🎸 Nhạc Cụ" },
  { id: "instrument-10", index: 10, name: "Kiki & Lala Hòa Tấu Violin", image: "/assets/stickers/instruments/music_10.webp", collection: "instruments", badgeLabel: "🎻 Nhạc Cụ" },
  { id: "instrument-11", index: 11, name: "Cinnamoroll Đàn Ukulele", image: "/assets/stickers/instruments/music_11.webp", collection: "instruments", badgeLabel: "🪕 Nhạc Cụ" },
  { id: "instrument-12", index: 12, name: "Kuromi Đại Dương Cầm Tím", image: "/assets/stickers/instruments/music_12.webp", collection: "instruments", badgeLabel: "🎹 Nhạc Cụ" },
  { id: "instrument-13", index: 13, name: "Pompompurin Đàn Cello", image: "/assets/stickers/instruments/music_13.webp", collection: "instruments", badgeLabel: "🎻 Nhạc Cụ" },
  { id: "instrument-14", index: 14, name: "Hello Kitty Thổi Sáo Bạc", image: "/assets/stickers/instruments/music_14.webp", collection: "instruments", badgeLabel: "🪈 Nhạc Cụ" },
  { id: "instrument-15", index: 15, name: "My Melody Đàn Hạc Vàng", image: "/assets/stickers/instruments/music_15.webp", collection: "instruments", badgeLabel: "🪉 Nhạc Cụ" },
  { id: "instrument-16", index: 16, name: "Keroppi Trống Hành Quân", image: "/assets/stickers/instruments/music_16.webp", collection: "instruments", badgeLabel: "🥁 Nhạc Cụ" },
  { id: "instrument-17", index: 17, name: "Tuxedosam Kèn Đồng Jazz", image: "/assets/stickers/instruments/music_17.webp", collection: "instruments", badgeLabel: "🎺 Nhạc Cụ" },
  { id: "instrument-18", index: 18, name: "Pochacco Guitar Điện Xanh", image: "/assets/stickers/instruments/music_18.webp", collection: "instruments", badgeLabel: "🎸 Nhạc Cụ" },
  { id: "instrument-19", index: 19, name: "Badtz-Maru Bàn DJ Sân Khấu", image: "/assets/stickers/instruments/music_19.webp", collection: "instruments", badgeLabel: "🎧 Nhạc Cụ" },
  { id: "instrument-20", index: 20, name: "Kiki & Lala Đàn Gỗ Xylophone", image: "/assets/stickers/instruments/music_20.webp", collection: "instruments", badgeLabel: "🎼 Nhạc Cụ" },
];

export const ALL_THEMED_SPECIAL_STICKERS: ThemedSpecialStickerItem[] = [
  ...SANRIO_CAREER_STICKERS,
  ...SANRIO_COUNTRY_STICKERS,
  ...SANRIO_INSTRUMENT_STICKERS,
];

function pickSixAsCharacterSet(
  list: ThemedSpecialStickerItem[],
  indicesOneBased: number[],
): CharacterStickerItem[] {
  return indicesOneBased.map((idx1, i) => {
    const found = list.find((item) => item.index === idx1) || list[i] || list[0];
    return {
      id: found.id,
      index: i + 1,
      name: found.name,
      image: found.image,
    };
  });
}

export const SUBJECT_STICKER_SET_2: Record<SubjectId, CharacterStickerItem[]> = {
  reading: pickSixAsCharacterSet(SANRIO_CAREER_STICKERS, [1, 2, 10, 14, 15, 20]),
  math: pickSixAsCharacterSet(SANRIO_CAREER_STICKERS, [3, 5, 7, 8, 9, 17]),
  coloring: pickSixAsCharacterSet(SANRIO_CAREER_STICKERS, [4, 6, 11, 12, 13, 18]),
  english: pickSixAsCharacterSet(SANRIO_COUNTRY_STICKERS, [1, 3, 4, 8, 11, 17]),
  minigame: pickSixAsCharacterSet(SANRIO_COUNTRY_STICKERS, [5, 6, 7, 9, 15, 20]),
  music: pickSixAsCharacterSet(SANRIO_INSTRUMENT_STICKERS, [1, 2, 3, 4, 5, 12]),
  storybook: STORYBOOK_HALLOWEEN_SET_2,
  lifeskills: LIFESKILLS_STICKER_SETS[2],
};

export function isSubjectSet2Available(_subjectId: SubjectId): boolean {
  return true;
}

export function getSubjectStickerSet(
  subjectId: SubjectId,
  setNumber: 1 | 2 | 3 | 4 = 1,
): CharacterStickerItem[] {
  if (subjectId === "lifeskills") {
    return LIFESKILLS_STICKER_SETS[setNumber] || LIFESKILLS_STICKER_SETS[1];
  }
  if (setNumber === 2) {
    return SUBJECT_STICKER_SET_2[subjectId] || SUBJECT_CUPS[subjectId].stickers;
  }
  return SUBJECT_CUPS[subjectId].stickers;
}

export interface SubjectStickerBoardState {
  litIndices: number[]; // 1..6 trên bảng đèn hiện tại
  completedCycles: number; // Số Cúp Vàng đã thắp sáng
  everUnlockedIndices?: number[]; // 1..6 đã mở khóa vĩnh viễn trong Quyển Vở Sticker
  earnedCounts?: Record<number, number>; // Tổng số lượng từng sticker đã mở được (x1, x2...)
}

export type StickerCollectionStore = Record<
  SubjectId,
  SubjectStickerBoardState
>;

const STICKER_STORAGE_KEY = "nam-hoc-vui.sticker-cups.v1";

export const ALL_SUBJECT_IDS: SubjectId[] = [
  "reading",
  "math",
  "english",
  "music",
  "coloring",
  "storybook",
  "minigame",
  "lifeskills",
];

export function createDefaultStickerStore(): StickerCollectionStore {
  return {
    reading: { litIndices: [], completedCycles: 0, everUnlockedIndices: [], earnedCounts: {} },
    math: { litIndices: [], completedCycles: 0, everUnlockedIndices: [], earnedCounts: {} },
    music: { litIndices: [], completedCycles: 0, everUnlockedIndices: [], earnedCounts: {} },
    english: { litIndices: [], completedCycles: 0, everUnlockedIndices: [], earnedCounts: {} },
    storybook: { litIndices: [], completedCycles: 0, everUnlockedIndices: [], earnedCounts: {} },
    coloring: { litIndices: [], completedCycles: 0, everUnlockedIndices: [], earnedCounts: {} },
    minigame: { litIndices: [], completedCycles: 0, everUnlockedIndices: [], earnedCounts: {} },
    lifeskills: { litIndices: [], completedCycles: 0, everUnlockedIndices: [], earnedCounts: {} },
  };
}

export function loadStickerStore(): StickerCollectionStore {
  try {
    const raw = window.localStorage.getItem(STICKER_STORAGE_KEY);
    if (!raw) return createDefaultStickerStore();
    const parsed = JSON.parse(raw);
    const store = createDefaultStickerStore();
    for (const sid of ALL_SUBJECT_IDS) {
      if (parsed && parsed[sid]) {
        const arr: number[] = Array.isArray(parsed[sid].litIndices)
          ? parsed[sid].litIndices.filter(
              (n: unknown): n is number =>
                typeof n === "number" && n >= 1 && n <= 6,
            )
          : [];
        const everArr: number[] = Array.isArray(parsed[sid].everUnlockedIndices)
          ? parsed[sid].everUnlockedIndices.filter(
              (n: unknown): n is number =>
                typeof n === "number" && n >= 1 && n <= 6,
            )
          : [];
        const cycles =
          typeof parsed[sid].completedCycles === "number"
            ? Math.max(0, parsed[sid].completedCycles)
            : 0;
        const mergedEver =
          cycles > 0
            ? [1, 2, 3, 4, 5, 6]
            : Array.from(new Set<number>([...arr, ...everArr])).sort(
                (a, b) => a - b,
              );

        const rawCounts =
          parsed[sid].earnedCounts && typeof parsed[sid].earnedCounts === "object"
            ? (parsed[sid].earnedCounts as Record<string, unknown>)
            : {};
        const earnedCounts: Record<number, number> = {};
        for (let i = 1; i <= 6; i++) {
          const savedVal =
            typeof rawCounts[String(i)] === "number"
              ? Math.max(0, Math.floor(rawCounts[String(i)] as number))
              : 0;
          const fallbackMin =
            cycles + (arr.includes(i) ? 1 : mergedEver.includes(i) ? 1 : 0);
          const finalCount = Math.max(savedVal, fallbackMin);
          if (finalCount > 0) {
            earnedCounts[i] = finalCount;
          }
        }

        store[sid] = {
          litIndices: Array.from(new Set<number>(arr)).sort((a, b) => a - b),
          completedCycles: cycles,
          everUnlockedIndices: mergedEver,
          earnedCounts,
        };
      }
    }
    return store;
  } catch {
    return createDefaultStickerStore();
  }
}

export function saveStickerStore(store: StickerCollectionStore): void {
  try {
    window.localStorage.setItem(STICKER_STORAGE_KEY, JSON.stringify(store));
  } catch {
    // ignore storage errors
  }
}

export interface AwardStickerOutcome {
  updatedStore: StickerCollectionStore;
  awardedSticker: CharacterStickerItem;
  litCount: number;
  justCompletedFullSet: boolean;
}

/**
 * Tặng 1 sticker tiếp theo của môn học (1 -> 6).
 * Nếu trước đó cả 6 sticker đã sáng đủ (6/6), tự động cất vào vở rồi bật sáng sticker số 1 của vòng mới.
 * Đồng thời cộng +1 số lượng (x1, x2...) của sticker đó trong kho dán.
 */
export function awardStickerForSubject(
  currentStore: StickerCollectionStore,
  subjectId: SubjectId,
): AwardStickerOutcome {
  const cup = SUBJECT_CUPS[subjectId];
  const prevBoard = currentStore[subjectId] || {
    litIndices: [],
    completedCycles: 0,
    everUnlockedIndices: [],
    earnedCounts: {},
  };

  const baseLit =
    prevBoard.litIndices.length >= 6 ? [] : [...prevBoard.litIndices];

  let nextIdx = 1;
  for (let i = 1; i <= 6; i++) {
    if (!baseLit.includes(i)) {
      nextIdx = i;
      break;
    }
  }

  const nextLit = Array.from(new Set([...baseLit, nextIdx])).sort(
    (a, b) => a - b,
  );
  const justCompletedFullSet = nextLit.length === 6;
  const nextCycles = justCompletedFullSet
    ? prevBoard.completedCycles + 1
    : prevBoard.completedCycles;

  const nextEver =
    nextCycles > 0
      ? [1, 2, 3, 4, 5, 6]
      : Array.from(
          new Set([...(prevBoard.everUnlockedIndices || []), ...nextLit]),
        ).sort((a, b) => a - b);

  const nextEarnedCounts: Record<number, number> = {
    ...(prevBoard.earnedCounts || {}),
  };
  nextEarnedCounts[nextIdx] = (nextEarnedCounts[nextIdx] || 0) + 1;

  const updatedStore: StickerCollectionStore = {
    ...currentStore,
    [subjectId]: {
      litIndices: nextLit,
      completedCycles: nextCycles,
      everUnlockedIndices: nextEver,
      earnedCounts: nextEarnedCounts,
    },
  };

  saveStickerStore(updatedStore);

  const activeSetNum: 1 | 2 | 3 | 4 =
    subjectId === "lifeskills"
      ? (((prevBoard.completedCycles || 0) % 4) + 1 as 1 | 2 | 3 | 4)
      : subjectId === "storybook"
        ? 2
        : (prevBoard.completedCycles || 0) >= 1
          ? 2
          : 1;
  const activeStickers = getSubjectStickerSet(subjectId, activeSetNum);
  const awardedSticker =
    activeStickers.find((s) => s.index === nextIdx) || activeStickers[0];

  // Khi nhận Sticker ở Khu Giải Trí (storybook - Bộ 2 Nhân Vật Halloween), đồng bộ cộng luôn vào Kho Sticker Halloween!
  if (subjectId === "storybook" && awardedSticker.id.startsWith("hw-")) {
    const hwInv = loadHalloweenStickerInventory();
    saveHalloweenStickerInventory({
      ...hwInv,
      [awardedSticker.id]: (hwInv[awardedSticker.id] || 0) + 1,
    });
  }

  // Đồng bộ mở khóa thêm Sticker thuộc 3 Bộ Mới (Nghề Nghiệp, Quốc Gia, Nhạc Cụ) theo môn học
  awardThemedStickerForSubject(subjectId, awardedSticker.id);

  return {
    updatedStore,
    awardedSticker,
    litCount: nextLit.length,
    justCompletedFullSet,
  };
}

/**
 * Khi bé đạt 6/6 Sticker và bấm "Hợp Nhất Mở Cúp Vàng & Cất Vào Vở Sticker":
 * Giữ vĩnh viễn cả 6 Sticker trong Quyển Vở Sticker (everUnlockedIndices = [1..6]),
 * đảm bảo Cúp Vàng tăng cấp, và mở bảng mới (litIndices = []) để bé sưu tập vòng Cúp tiếp theo.
 */
export function resetSubjectStickerBoard(
  currentStore: StickerCollectionStore,
  subjectId: SubjectId,
): StickerCollectionStore {
  const prevBoard = currentStore[subjectId] || {
    litIndices: [],
    completedCycles: 0,
    everUnlockedIndices: [],
    earnedCounts: {},
  };
  const nextCycles = Math.max(1, prevBoard.completedCycles);
  const nextEarnedCounts: Record<number, number> = {
    ...(prevBoard.earnedCounts || {}),
  };
  for (let i = 1; i <= 6; i++) {
    nextEarnedCounts[i] = Math.max(nextEarnedCounts[i] || 0, nextCycles);
  }
  const updatedStore: StickerCollectionStore = {
    ...currentStore,
    [subjectId]: {
      litIndices: [],
      completedCycles: nextCycles,
      everUnlockedIndices: [1, 2, 3, 4, 5, 6],
      earnedCounts: nextEarnedCounts,
    },
  };
  saveStickerStore(updatedStore);
  return updatedStore;
}

export function getCharacterStickerEarnedCount(
  store: StickerCollectionStore,
  subjectId: SubjectId,
  stickerIndex: number,
): number {
  const b = store[subjectId];
  if (!b) return 0;
  const fromMap = b.earnedCounts?.[stickerIndex] || 0;
  const fallback =
    (b.completedCycles || 0) +
    (b.litIndices.includes(stickerIndex)
      ? 1
      : b.everUnlockedIndices?.includes(stickerIndex)
        ? 1
        : 0);
  return Math.max(fromMap, fallback);
}

export function isStickerUnlockedInBook(
  store: StickerCollectionStore,
  subjectId: SubjectId,
  stickerIndex: number,
): boolean {
  return getCharacterStickerEarnedCount(store, subjectId, stickerIndex) > 0;
}

/**
 * Quy tắc Bộ 2:
 * - Riêng môn Kỹ Năng Sống (lifeskills): Có 4 bộ Hoa Quả & Bánh Kẹo.
 * - Khu Giải Trí (storybook): Bộ 2 Nhân Vật Halloween.
 * - Đọc Chữ, Toán Học, Tô Màu: Bộ 2 Nghề Nghiệp (20 mẫu chia vào các môn & Kho Sticker Nghề Nghiệp).
 * - Tiếng Anh, Trò Chơi: Bộ 2 Quốc Gia (20 mẫu chia vào các môn & Kho Sticker Quốc Gia).
 * - Âm Nhạc: Bộ 2 Nhạc Cụ (20 mẫu chia vào môn Âm Nhạc & Kho Sticker Nhạc Cụ).
 */
export function getSubjectSetStickerEarnedCount(
  store: StickerCollectionStore,
  subjectId: SubjectId,
  setNumber: 1 | 2 | 3 | 4,
  stickerIndex: number,
): number {
  if (setNumber === 1) {
    return getCharacterStickerEarnedCount(store, subjectId, stickerIndex);
  }
  if (!isSubjectSet2Available(subjectId)) return 0;
  if (subjectId === "storybook" && setNumber === 2) {
    const hwItem = STORYBOOK_HALLOWEEN_SET_2.find(
      (s) => s.index === stickerIndex,
    );
    const hwInv = loadHalloweenStickerInventory();
    const fromHw = hwItem ? hwInv[hwItem.id] || 0 : 0;
    const fromBoard = getCharacterStickerEarnedCount(
      store,
      "storybook",
      stickerIndex,
    );
    return Math.max(fromHw, fromBoard);
  }
  if (subjectId !== "lifeskills" && setNumber === 2) {
    const s2List = SUBJECT_STICKER_SET_2[subjectId] || [];
    const s2Item = s2List.find((s) => s.index === stickerIndex);
    const themedInv = loadThemedStickerInventory();
    const fromThemed = s2Item ? themedInv[s2Item.id] || 0 : 0;
    const b = store[subjectId];
    const cycles = b?.completedCycles || 0;
    const fromCycles =
      cycles >= 1
        ? Math.max(0, cycles - 1) +
          (cycles === 1 && b?.litIndices.includes(stickerIndex) ? 1 : 0)
        : 0;
    return Math.max(fromThemed, fromCycles);
  }
  const b = store[subjectId];
  if (!b) return 0;
  const cycles = b.completedCycles || 0;
  const requiredPrevCycles = setNumber - 1;
  if (cycles < requiredPrevCycles) return 0;
  const completedFullRunsOfThisSet = Math.max(0, cycles - requiredPrevCycles);
  const inCurrentRun =
    cycles === requiredPrevCycles && b.litIndices.includes(stickerIndex)
      ? 1
      : 0;
  return completedFullRunsOfThisSet + inCurrentRun;
}

export function getSubjectSetUnlockedCount(
  store: StickerCollectionStore,
  subjectId: SubjectId,
  setNumber: 1 | 2 | 3 | 4,
): number {
  if (setNumber === 1) {
    const b = store[subjectId];
    if (!b) return 0;
    if ((b.completedCycles || 0) >= 1) return 6;
    return b.litIndices.length;
  }
  if (!isSubjectSet2Available(subjectId)) return 0;
  if (subjectId === "storybook" && setNumber === 2) {
    let unlocked = 0;
    for (let i = 1; i <= 6; i++) {
      if (getSubjectSetStickerEarnedCount(store, "storybook", 2, i) > 0) {
        unlocked++;
      }
    }
    return unlocked;
  }
  if (subjectId !== "lifeskills" && setNumber === 2) {
    let unlocked = 0;
    for (let i = 1; i <= 6; i++) {
      if (getSubjectSetStickerEarnedCount(store, subjectId, 2, i) > 0) {
        unlocked++;
      }
    }
    return unlocked;
  }
  const b = store[subjectId];
  if (!b) return 0;
  const cycles = b.completedCycles || 0;
  const requiredPrevCycles = setNumber - 1;
  if (cycles > requiredPrevCycles) return 6;
  if (cycles === requiredPrevCycles) return b.litIndices.length;
  return 0;
}

export function getSet2StickerEarnedCount(
  store: StickerCollectionStore,
  subjectId: SubjectId,
  stickerIndex: number,
): number {
  return getSubjectSetStickerEarnedCount(store, subjectId, 2, stickerIndex);
}

export function getSet2UnlockedCountForSubject(
  store: StickerCollectionStore,
  subjectId: SubjectId,
): number {
  return getSubjectSetUnlockedCount(store, subjectId, 2);
}

export function getTotalLitStickers(store: StickerCollectionStore): number {
  return ALL_SUBJECT_IDS.reduce(
    (sum, sid) => sum + (store[sid]?.litIndices.length || 0),
    0,
  );
}

export function getTotalUnlockedInBook(store: StickerCollectionStore): number {
  let count = 0;
  for (const sid of ALL_SUBJECT_IDS) {
    for (let i = 1; i <= 6; i++) {
      if (isStickerUnlockedInBook(store, sid, i)) count++;
    }
  }
  return count;
}

export function getTotalGoldenCups(store: StickerCollectionStore): number {
  return ALL_SUBJECT_IDS.reduce(
    (sum, sid) => sum + (store[sid]?.completedCycles || 0),
    0,
  );
}

export interface NamRankInfo {
  icon: string;
  title: string;
  color: string;
}

export function getNamRankInfo(store: StickerCollectionStore): NamRankInfo {
  const unlocked = getTotalUnlockedInBook(store);
  const cups = getTotalGoldenCups(store);
  if (unlocked >= 36 || cups >= 4) {
    return {
      icon: "🏆",
      title: "Siêu Anh Hùng 7 Môn Học",
      color: "#d97706",
    };
  }
  if (unlocked >= 16 || cups >= 2) {
    return {
      icon: "👑",
      title: "Hoàng Tử Sưu Tập Sticker",
      color: "#db2777",
    };
  }
  if (unlocked >= 6 || cups >= 1) {
    return {
      icon: "⭐",
      title: "Ngôi Sao Nhí Tài Năng",
      color: "#2563eb",
    };
  }
  return {
    icon: "🌱",
    title: "Mầm Non Chăm Chỉ",
    color: "#16a34a",
  };
}

export type DrawerTabId =
  | "unlocked"
  | "nam-special"
  | "halloween-special"
  | "careers"
  | "countries"
  | "instruments"
  | "claw-plushies"
  | SubjectId
  | "quest-unlocked"
  | "quest-sweets"
  | "quest-fruits"
  | "quest-vehicles"
  | "quest-school-home"
  | "quest-lifeskills";

export type NamStickerTier = "stage" | "study" | "food";

export interface NamSpecialStickerItem {
  id: string;
  name: string;
  image: string;
  tier: NamStickerTier;
  badgeLabel: string;
  /** Phần thưởng ngoài đời thật từ Mẹ khi mở trúng Sticker Nấm Ăn (Độ khó cao: mở từ Cúp Vàng thứ 2 trở lên) */
  momRewardVoucher?: string;
}

export const NAM_SPECIAL_STICKERS: NamSpecialStickerItem[] = [
  // 1. CA SĨ NẤM 3D CONCERT TRÊN SÂN KHẤU TRUNG TÂM (Mở sẵn để Nấm biểu diễn ở giữa sân khấu)
  {
    id: "nam-stage-star",
    name: "Ca Sĩ Nấm Concert 3D",
    image: "/assets/nam-stickers/nam-stage-star.webp?v=3dclay",
    tier: "stage",
    badgeLabel: "🎤 Ngôi Sao Sân Khấu 3D",
  },

  // 2. BỘ STICKER NẤM CHĂM HỌC & NGOAN NGOÃN (Mở Cúp Vàng 6 Nhãn Môn Học)
  {
    id: "nam-halloween-wizard",
    name: "Bé Nấm Phù Thủy Ánh Sao",
    image: "/assets/halloween/char-nam-wizard.webp",
    tier: "study",
    badgeLabel: "🎃 Phù Thủy Nhí",
  },
  {
    id: "nam-3d-cup",
    name: "Nấm 3D Ôm Cúp Vàng",
    image: "/assets/nam-stickers/nam-3d-cup.webp",
    tier: "study",
    badgeLabel: "🏆 Nấm 3D Đất Nặn",
  },
  {
    id: "nam-3d-read",
    name: "Nấm 3D Đọc Sách Hồng",
    image: "/assets/nam-stickers/nam-3d-read.webp",
    tier: "study",
    badgeLabel: "📖 Nấm 3D Đất Nặn",
  },
  {
    id: "nam-3d-paint",
    name: "Họa Sĩ Nấm 3D Vẽ Tranh",
    image: "/assets/nam-stickers/nam-3d-paint.webp",
    tier: "study",
    badgeLabel: "🎨 Nấm 3D Đất Nặn",
  },
  {
    id: "nam-3d-scooter",
    name: "Nấm 3D Lái Xe Chở Hoa",
    image: "/assets/nam-stickers/nam-3d-scooter.webp",
    tier: "study",
    badgeLabel: "🛵 Nấm 3D Đất Nặn",
  },
  {
    id: "nam-study-read",
    name: "Nấm Chăm Đọc Sách",
    image: "/assets/nam-stickers/nam-study-read.webp",
    tier: "study",
    badgeLabel: "📚 Nấm Học Giỏi",
  },
  {
    id: "nam-study-write",
    name: "Nấm Ngồi Viết Bài",
    image: "/assets/nam-stickers/nam-study-write.webp",
    tier: "study",
    badgeLabel: "✏️ Nấm Học Giỏi",
  },
  {
    id: "nam-study-paint",
    name: "Họa Sĩ Nấm Vẽ Tranh",
    image: "/assets/nam-stickers/nam-study-paint.webp",
    tier: "study",
    badgeLabel: "🎨 Nấm Học Giỏi",
  },
  {
    id: "nam-study-school",
    name: "Nấm Đeo Cặp Đi Học",
    image: "/assets/nam-stickers/nam-study-school.webp",
    tier: "study",
    badgeLabel: "🎒 Nấm Học Giỏi",
  },
  {
    id: "nam-study-brush",
    name: "Nấm Ngoan Đánh Răng",
    image: "/assets/nam-stickers/nam-study-brush.webp",
    tier: "study",
    badgeLabel: "🪥 Bé Ngoan",
  },
  {
    id: "nam-study-water",
    name: "Nấm Tưới Cây Xanh",
    image: "/assets/nam-stickers/nam-study-water.webp",
    tier: "study",
    badgeLabel: "🌱 Bé Ngoan",
  },

  // 3. BỘ STICKER HIẾM: NẤM ĂN NGON + PHIẾU THƯỞNG MẸ MUA ĐỒ ĂN THẬT (Độ khó cao: Cúp Cấp 2+ hoặc mỗi 2 Cúp Vàng = 12 bài học)
  {
    id: "nam-eat-icecream",
    name: "Nấm Ăn Kem Ốc Quế",
    image: "/assets/nam-stickers/nam-eat-icecream.webp",
    tier: "food",
    badgeLabel: "🍦 Siêu Hiếm · Quà Mẹ Mua",
    momRewardVoucher:
      "🎟️ PHIẾU THƯỞNG MẸ TẶNG: Nấm khoe Mẹ để Mẹ mua cho Nấm 1 cây Kem mát lạnh ngoài đời thật nhé!",
  },
  {
    id: "nam-3d-mymelody-strawberry",
    name: "Nấm 3D Mũ My Melody",
    image: "/assets/nam-stickers/nam-3d-mymelody-strawberry.webp",
    tier: "food",
    badgeLabel: "🍓 3D Siêu Hiếm · Quà Mẹ Mua",
    momRewardVoucher:
      "🎟️ PHIẾU THƯỞNG MẸ TẶNG: Mẹ thưởng cho Nấm Dâu Tây ngọt lịm / Sữa Dâu thơm ngon!",
  },
  {
    id: "nam-3d-strawberry",
    name: "Nấm 3D Ôm Dâu Tây",
    image: "/assets/nam-stickers/nam-3d-strawberry.webp",
    tier: "food",
    badgeLabel: "🍓 3D Siêu Hiếm · Quà Mẹ Mua",
    momRewardVoucher:
      "🎟️ PHIẾU THƯỞNG MẸ TẶNG: Mẹ mua Dâu Tây / Sinh Tố Trái Cây mát lạnh cho Nấm!",
  },
  {
    id: "nam-3d-cookies",
    name: "Đầu Bếp Nấm 3D Bánh Quy",
    image: "/assets/nam-stickers/nam-3d-cookies.webp",
    tier: "food",
    badgeLabel: "🍪 3D Siêu Hiếm · Quà Mẹ Mua",
    momRewardVoucher:
      "🎟️ PHIẾU THƯỞNG MẸ TẶNG: Mẹ mua Bánh Quy Bơ hình thú thơm giòn cho Nấm!",
  },
  {
    id: "nam-eat-milktea",
    name: "Nấm Uống Trà Sữa",
    image: "/assets/nam-stickers/nam-eat-milktea.webp",
    tier: "food",
    badgeLabel: "🧋 Siêu Hiếm · Quà Mẹ Mua",
    momRewardVoucher:
      "🎟️ PHIẾU THƯỞNG MẸ TẶNG: Mẹ thưởng cho Nấm 1 ly Trà Sữa / Sữa Trái Cây thơm ngon!",
  },
  {
    id: "nam-eat-donut",
    name: "Nấm Ăn Bánh Donut",
    image: "/assets/nam-stickers/nam-eat-donut.webp",
    tier: "food",
    badgeLabel: "🍩 Siêu Hiếm · Quà Mẹ Mua",
    momRewardVoucher:
      "🎟️ PHIẾU THƯỞNG MẸ TẶNG: Mẹ mua cho Nấm 1 chiếc Bánh Ngọt / Bánh Donut thật ngon!",
  },
  {
    id: "nam-eat-cookies",
    name: "Nấm Khay Bánh Quy",
    image: "/assets/nam-stickers/nam-eat-cookies.webp",
    tier: "food",
    badgeLabel: "🍪 Siêu Hiếm · Quà Mẹ Mua",
    momRewardVoucher:
      "🎟️ PHIẾU THƯỞNG MẸ TẶNG: Mẹ thưởng cho Nấm 1 gói Bánh Quy giòn thơm!",
  },
  {
    id: "nam-eat-strawberry",
    name: "Nấm Ăn Dâu Tây",
    image: "/assets/nam-stickers/nam-eat-strawberry.webp",
    tier: "food",
    badgeLabel: "🍓 Siêu Hiếm · Quà Mẹ Mua",
    momRewardVoucher:
      "🎟️ PHIẾU THƯỞNG MẸ TẶNG: Mẹ mua Dâu Tây / Trái Cây tươi ngon cho Nấm!",
  },
  {
    id: "nam-eat-watermelon",
    name: "Nấm Ăn Dưa Hấu",
    image: "/assets/nam-stickers/nam-eat-watermelon.webp",
    tier: "food",
    badgeLabel: "🍉 Siêu Hiếm · Quà Mẹ Mua",
    momRewardVoucher:
      "🎟️ PHIẾU THƯỞNG MẸ TẶNG: Mẹ bổ Dưa Hấu / Hoa Quả mát ngọt cho Nấm ăn!",
  },
  {
    id: "nam-eat-chicken",
    name: "Nấm Ăn Đùi Gà Rán",
    image: "/assets/nam-stickers/nam-eat-chicken.webp",
    tier: "food",
    badgeLabel: "🍗 Siêu Hiếm · Quà Mẹ Mua",
    momRewardVoucher:
      "🎟️ PHIẾU THƯỞNG MẸ TẶNG: Mẹ thưởng cho Nấm 1 phần Đùi Gà Rán giòn rụm!",
  },
  {
    id: "nam-eat-burger",
    name: "Nấm Ăn Hamburger",
    image: "/assets/nam-stickers/nam-eat-burger.webp",
    tier: "food",
    badgeLabel: "🍔 Siêu Hiếm · Quà Mẹ Mua",
    momRewardVoucher:
      "🎟️ PHIẾU THƯỞNG MẸ TẶNG: Mẹ mua Bánh Burger / Pizza ngon tuyệt cho Nấm!",
  },
  {
    id: "nam-eat-noodles",
    name: "Nấm Ăn Mì Trứng",
    image: "/assets/nam-stickers/nam-eat-noodles.webp",
    tier: "food",
    badgeLabel: "🍜 Siêu Hiếm · Quà Mẹ Mua",
    momRewardVoucher:
      "🎟️ PHIẾU THƯỞNG MẸ TẶNG: Mẹ nấu cho Nấm 1 tô Mì Trứng / Phở thật ngon!",
  },
  {
    id: "nam-eat-bento",
    name: "Nấm Cơm Hộp Bento",
    image: "/assets/nam-stickers/nam-eat-bento.webp",
    tier: "food",
    badgeLabel: "🍱 Siêu Hiếm · Quà Mẹ Mua",
    momRewardVoucher:
      "🎟️ PHIẾU THƯỞNG MẸ TẶNG: Mẹ làm Cơm Hộp Xúc Xích Trứng Cuộn cho Nấm!",
  },
  {
    id: "nam-eat-milk",
    name: "Nấm Uống Sữa Tươi",
    image: "/assets/nam-stickers/nam-eat-milk.webp",
    tier: "food",
    badgeLabel: "🥛 Siêu Hiếm · Quà Mẹ Mua",
    momRewardVoucher:
      "🎟️ PHIẾU THƯỞNG MẸ TẶNG: Mẹ tặng Nấm 1 hộp Sữa Tươi / Sữa Chua uống mát lành!",
  },
  {
    id: "nam-eat-rice",
    name: "Nấm Ăn Cơm Ngoan",
    image: "/assets/nam-stickers/nam-eat-rice.webp",
    tier: "food",
    badgeLabel: "🍚 Siêu Hiếm · Quà Mẹ Mua",
    momRewardVoucher:
      "🎟️ PHIẾU THƯỞNG MẸ TẶNG: Mẹ nấu món Nấm thích nhất trong bữa cơm hôm nay!",
  },

  // 4. BỘ STICKER NẤM ÔM BẠN THÂN SANRIO & DORAEMON (Mở Cúp Vàng 6 Nhãn Môn Học)
  {
    id: "nam-hug-kitty",
    name: "Nấm Ôm Hello Kitty",
    image: "/assets/nam-stickers/nam-hug-kitty.webp",
    tier: "study",
    badgeLabel: "🎀 Đôi Bạn Thân",
  },
  {
    id: "nam-hug-mymelody",
    name: "Nấm Ôm My Melody",
    image: "/assets/nam-stickers/nam-hug-mymelody.webp",
    tier: "study",
    badgeLabel: "🐰 Đôi Bạn Thân",
  },
  {
    id: "nam-hug-cinna",
    name: "Nấm Ôm Cinnamoroll",
    image: "/assets/nam-stickers/nam-hug-cinna.webp",
    tier: "study",
    badgeLabel: "☁️ Đôi Bạn Thân",
  },
  {
    id: "nam-hug-kuromi",
    name: "Nấm Ôm Kuromi",
    image: "/assets/nam-stickers/nam-hug-kuromi.webp",
    tier: "study",
    badgeLabel: "💜 Đôi Bạn Thân",
  },
  {
    id: "nam-hug-purin",
    name: "Nấm Ôm Pompompurin",
    image: "/assets/nam-stickers/nam-hug-purin.webp",
    tier: "study",
    badgeLabel: "🍮 Đôi Bạn Thân",
  },
  {
    id: "nam-hug-pochacco",
    name: "Nấm Ôm Pochacco",
    image: "/assets/nam-stickers/nam-hug-pochacco.webp",
    tier: "study",
    badgeLabel: "⚽ Đôi Bạn Thân",
  },
  {
    id: "nam-hug-doraemon",
    name: "Nấm Ôm Doraemon",
    image: "/assets/nam-stickers/nam-hug-doraemon.webp",
    tier: "study",
    badgeLabel: "🔔 Đôi Bạn Thân",
  },
  {
    id: "nam-hug-capybara",
    name: "Nấm Ôm Capybara",
    image: "/assets/nam-stickers/nam-hug-capybara.webp",
    tier: "study",
    badgeLabel: "🍊 Đôi Bạn Thân",
  },
  {
    id: "nam-hug-keroppi",
    name: "Nấm Ôm Keroppi",
    image: "/assets/nam-stickers/nam-hug-keroppi.webp",
    tier: "study",
    badgeLabel: "🐸 Đôi Bạn Thân",
  },
  {
    id: "nam-hug-tuxedosam",
    name: "Nấm Ôm Tuxedosam",
    image: "/assets/nam-stickers/nam-hug-tuxedosam.webp",
    tier: "study",
    badgeLabel: "🐧 Đôi Bạn Thân",
  },
  {
    id: "nam-hug-badtz",
    name: "Nấm Ôm Badtz-Maru",
    image: "/assets/nam-stickers/nam-hug-badtz.webp",
    tier: "study",
    badgeLabel: "🎸 Đôi Bạn Thân",
  },
  {
    id: "nam-hug-twinstars",
    name: "Nấm & Twin Stars",
    image: "/assets/nam-stickers/nam-hug-twinstars.webp",
    tier: "study",
    badgeLabel: "🌟 Đôi Bạn Thân",
  },
];

export type NamSpecialInventory = Record<string, number>;

const NAM_SPECIAL_STORAGE_KEY = "nam-hoc-vui.nam-special-stickers.v1";

export function loadNamSpecialInventory(): NamSpecialInventory {
  const defaultInv: NamSpecialInventory = {
    "nam-stage-star": 2, // 1 đang biểu diễn ở giữa Sân Khấu Nấm + 1 dự phòng trong khay
  };
  try {
    const raw = window.localStorage.getItem(NAM_SPECIAL_STORAGE_KEY);
    if (!raw) return defaultInv;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return defaultInv;
    const out: NamSpecialInventory = { ...defaultInv };
    for (const [k, v] of Object.entries(parsed)) {
      if (typeof v === "number" && v > 0) {
        out[k] = Math.max(out[k] || 0, Math.floor(v));
      }
    }
    return out;
  } catch {
    return defaultInv;
  }
}

export function saveNamSpecialInventory(inv: NamSpecialInventory): void {
  try {
    window.localStorage.setItem(NAM_SPECIAL_STORAGE_KEY, JSON.stringify(inv));
  } catch {
    // ignore storage errors
  }
}

export function getUnlockedNamSpecialCount(inv?: NamSpecialInventory): number {
  const store = inv || loadNamSpecialInventory();
  return NAM_SPECIAL_STICKERS.filter((s) => (store[s.id] || 0) > 0).length;
}

export interface AwardedNamCupStickerResult {
  sticker: NamSpecialStickerItem;
  newCount: number;
  isHardFoodReward: boolean;
  inventory: NamSpecialInventory;
}

export const SUBJECT_PREFERRED_STUDY_STICKER: Record<SubjectId, string> = {
  reading: "nam-study-read",
  math: "nam-study-write",
  coloring: "nam-study-paint",
  english: "nam-study-school",
  storybook: "nam-halloween-wizard",
  minigame: "nam-study-brush",
  music: "nam-hug-cinna",
  lifeskills: "nam-hug-doraemon",
};

/**
 * Khi bé thắp sáng đủ 6/6 nhãn môn học và bấm Mở Cúp Vàng:
 * - Riêng môn Kỹ Năng Sống (lifeskills): Dễ hơn nên chỉ nhận Bộ Bánh Kẹo & Hoa Quả, KHÔNG nhận Sticker Nấm.
 * - 7 môn học chính còn lại: Mở đủ 6/6 ô sẽ nhận được 1 Sticker Bé Nấm xịn nhất!
 * - Quà ăn thật của Mẹ (tier === "food"): Chỉ rơi đúng 1 lần mỗi khi bé gom đủ trọn 1 bảng 6 Sticker Nấm Học Tập/Đôi Bạn (mốc 6, 12, 18, 24 sticker study).
 */
export function awardNamStickerOnCupOpen(
  updatedStore: StickerCollectionStore,
  subjectId: SubjectId,
): AwardedNamCupStickerResult | undefined {
  if (subjectId === "lifeskills") {
    return undefined;
  }

  const inv = loadNamSpecialInventory();
  const subjectCycles = Math.max(
    1,
    updatedStore[subjectId]?.completedCycles || 1,
  );
  const totalCups = getTotalGoldenCups(updatedStore);

  const studyPool = NAM_SPECIAL_STICKERS.filter((s) => s.tier === "study");
  const foodPool = NAM_SPECIAL_STICKERS.filter((s) => s.tier === "food");
  const unlockedStudyCount = studyPool.filter(
    (s) => (inv[s.id] || 0) > 0,
  ).length;
  const unlockedFoodCount = foodPool.filter(
    (s) => (inv[s.id] || 0) > 0,
  ).length;

  // Phải hoàn thành trọn 1 ô bảng 6 Sticker Nấm (6, 12, 18, 24) mới được 1 lần thưởng đồ ăn thật
  const allowedFoodRewards = Math.floor(unlockedStudyCount / 6);
  const isHardFoodMilestone =
    unlockedStudyCount >= 6 &&
    unlockedStudyCount % 6 === 0 &&
    unlockedFoodCount < allowedFoodRewards;

  let chosen: NamSpecialStickerItem;

  if (isHardFoodMilestone) {
    const unownedFood = foodPool.filter((s) => (inv[s.id] || 0) === 0);
    const pool = unownedFood.length > 0 ? unownedFood : foodPool;
    const iceCream = unownedFood.find((s) => s.id === "nam-eat-icecream");
    chosen =
      iceCream ||
      pool[(totalCups + subjectCycles) % pool.length] ||
      foodPool[0];
  } else {
    const preferredId = SUBJECT_PREFERRED_STUDY_STICKER[subjectId];
    const preferredSticker = studyPool.find((s) => s.id === preferredId);
    if (preferredSticker && (inv[preferredSticker.id] || 0) === 0) {
      chosen = preferredSticker;
    } else {
      const unownedAllStudy = studyPool.filter((s) => (inv[s.id] || 0) === 0);
      const pool = unownedAllStudy.length > 0 ? unownedAllStudy : studyPool;
      chosen = pool[totalCups % pool.length] || studyPool[0];
    }
  }

  const nextCount = (inv[chosen.id] || 0) + 1;
  const nextInv: NamSpecialInventory = {
    ...inv,
    [chosen.id]: nextCount,
  };
  saveNamSpecialInventory(nextInv);

  return {
    sticker: chosen,
    newCount: nextCount,
    isHardFoodReward: isHardFoodMilestone,
    inventory: nextInv,
  };
}

/**
 * Khi bé hoàn thành đủ 3/3 Nhiệm Vụ Ngày và mở Rương Kho Báu:
 * Tặng thêm +1 Sticker Bé Nấm Chăm Học / Đôi Bạn Thân (KHÔNG rơi phiếu đồ ăn thật ở NV Ngày)!
 */
export function awardNamStickerOnDailyQuest(
  roundNumber = 1,
): AwardedNamCupStickerResult {
  const inv = loadNamSpecialInventory();
  const candidates = NAM_SPECIAL_STICKERS.filter((s) => s.tier === "study");
  const unowned = candidates.filter((s) => (inv[s.id] || 0) === 0);
  const pool = unowned.length > 0 ? unowned : candidates;
  const wizardFirst = unowned.find((s) => s.id === "nam-halloween-wizard");
  const chosen =
    wizardFirst || pool[roundNumber % pool.length] || candidates[0];

  const nextCount = (inv[chosen.id] || 0) + 1;
  const nextInv: NamSpecialInventory = {
    ...inv,
    [chosen.id]: nextCount,
  };
  saveNamSpecialInventory(nextInv);

  return {
    sticker: chosen,
    newCount: nextCount,
    isHardFoodReward: false,
    inventory: nextInv,
  };
}

export interface PlacedSticker {
  uid: string;
  stickerId: string;
  name: string;
  image: string;
  x: number; // % 8..92
  y: number; // % 14..86
  scale: number; // 0.65 .. 1.85
  rotation: number; // deg
  flipX: boolean;
}

export type BookPagesStore = Record<string, PlacedSticker[]>;

const STICKER_BOOK_STORAGE_KEY = "nam-hoc-vui.sticker-book-pages.v1";

const DEFAULT_NAM_STAGE_STICKERS: PlacedSticker[] = [
  {
    uid: "stk-nam-stage-center",
    stickerId: "nam-stage-star",
    name: "Ca Sĩ Nấm Concert 3D",
    image: "/assets/nam-stickers/nam-stage-star.webp?v=3dclay",
    x: 50,
    y: 58,
    scale: 1.42,
    rotation: 0,
    flipX: false,
  },
];

function normalizePlacedList(
  list: unknown,
  fallback: PlacedSticker[],
  dedupeStageStar = false,
): PlacedSticker[] {
  if (!Array.isArray(list)) return fallback;
  let seenStageStar = false;
  const out: PlacedSticker[] = [];
  for (const item of list as PlacedSticker[]) {
    if (!item) continue;
    if (item.stickerId === "nam-stage-star") {
      if (dedupeStageStar && seenStageStar) continue;
      seenStageStar = true;
      out.push({
        ...item,
        name: "Ca Sĩ Nấm Concert 3D",
        image: "/assets/nam-stickers/nam-stage-star.webp?v=3dclay",
        scale: Math.max(item.scale || 1.42, 1.38),
      });
    } else {
      out.push(item);
    }
  }
  return out;
}

export function loadBookPages(): BookPagesStore {
  const defaultPages: BookPagesStore = {
    "nam-stage": DEFAULT_NAM_STAGE_STICKERS,
    "halloween-night": [],
    "plushie-shelf": [],
    supermarket: [],
    fruits: [],
    parking: [],
    park: [],
    party: [],
    beach: [],
    forest: [],
  };
  try {
    const raw = window.localStorage.getItem(STICKER_BOOK_STORAGE_KEY);
    if (!raw) return defaultPages;
    const parsed = JSON.parse(raw);
    return {
      "nam-stage": normalizePlacedList(
        parsed?.["nam-stage"],
        DEFAULT_NAM_STAGE_STICKERS,
        true,
      ),
      "halloween-night": normalizePlacedList(parsed?.["halloween-night"], []),
      "plushie-shelf": normalizePlacedList(parsed?.["plushie-shelf"], []),
      supermarket: normalizePlacedList(parsed?.supermarket, []),
      fruits: normalizePlacedList(parsed?.fruits, []),
      parking: normalizePlacedList(parsed?.parking, []),
      park: normalizePlacedList(parsed?.park, []),
      party: normalizePlacedList(parsed?.party, []),
      beach: normalizePlacedList(parsed?.beach, []),
      forest: normalizePlacedList(parsed?.forest, []),
    };
  } catch {
    return defaultPages;
  }
}

export function saveBookPages(store: BookPagesStore): void {
  try {
    window.localStorage.setItem(
      STICKER_BOOK_STORAGE_KEY,
      JSON.stringify(store),
    );
  } catch {
    // ignore storage errors
  }
}

export function getPlacedStickerCountMap(
  pages?: BookPagesStore,
): Record<string, number> {
  const store = pages || loadBookPages();
  const counts: Record<string, number> = {};
  for (const list of Object.values(store)) {
    if (Array.isArray(list)) {
      for (const item of list) {
        if (item?.stickerId) {
          counts[item.stickerId] = (counts[item.stickerId] || 0) + 1;
        }
      }
    }
  }
  return counts;
}

// ============================================================================
// BỘ SƯU TẬP STICKER ĐẶC BIỆT MÙA LỄ HỘI HALLOWEEN (8 NHÂN VẬT + 26 VẬT PHẨM)
// ============================================================================

export type HalloweenStickerCategory = "character" | "sweet" | "toy" | "decor";

export interface HalloweenStickerItem {
  id: string;
  name: string;
  image: string;
  category: HalloweenStickerCategory;
  badgeLabel: string;
}

export const HALLOWEEN_SPECIAL_STICKERS: HalloweenStickerItem[] = [
  // 1. 8 NHÂN VẬT CHÍNH HÓA TRANG HALLOWEEN
  {
    id: "hw-char-nam-wizard",
    name: "Bé Nấm Phù Thủy Ánh Sao",
    image: "/assets/halloween/char-nam-wizard.webp",
    category: "character",
    badgeLabel: "🧙‍♂️ Nhân Vật Halloween",
  },
  {
    id: "hw-char-kitty-witch",
    name: "Hello Kitty Phù Thủy Nơ Cam",
    image: "/assets/halloween/char-kitty-witch.webp",
    category: "character",
    badgeLabel: "🎃 Nhân Vật Halloween",
  },
  {
    id: "hw-char-mymelody-witch",
    name: "My Melody Áo Choàng Đêm",
    image: "/assets/halloween/char-mymelody-witch.webp",
    category: "character",
    badgeLabel: "🎃 Nhân Vật Halloween",
  },
  {
    id: "hw-char-cinnamoroll-wizard",
    name: "Cinnamoroll Phù Thủy Sao",
    image: "/assets/halloween/char-cinnamoroll-wizard.webp",
    category: "character",
    badgeLabel: "🎃 Nhân Vật Halloween",
  },
  {
    id: "hw-char-kuromi-devil",
    name: "Kuromi Tiểu Quỷ Đinh Ba",
    image: "/assets/halloween/char-kuromi-devil.webp",
    category: "character",
    badgeLabel: "🎃 Nhân Vật Halloween",
  },
  {
    id: "hw-char-twinstars-halloween",
    name: "Kiki & Lala Đêm Phép Thuật",
    image: "/assets/halloween/char-twinstars-halloween.webp",
    category: "character",
    badgeLabel: "🎃 Nhân Vật Halloween",
  },
  {
    id: "hw-char-pompompurin-vampire",
    name: "Pompompurin Áo Choàng Bí Ngô",
    image: "/assets/halloween/char-pompompurin-vampire.webp",
    category: "character",
    badgeLabel: "🎃 Nhân Vật Halloween",
  },
  {
    id: "hw-char-pochacco-vampire",
    name: "Pochacco Bá Tước Dơi Nhỏ",
    image: "/assets/halloween/char-pochacco-vampire.webp",
    category: "character",
    badgeLabel: "🎃 Nhân Vật Halloween",
  },

  // 2. BÁNH KẸO HALLOWEEN (10 MÓN)
  {
    id: "hw-sweet-cupcakes",
    name: "Cặp Bánh Cupcake Bí Ngô & Ma",
    image: "/assets/halloween/sweet-cupcakes.webp",
    category: "sweet",
    badgeLabel: "🧁 Bánh Kẹo Halloween",
  },
  {
    id: "hw-sweet-cookies",
    name: "Bộ Bánh Quy Bí Ngô & Mèo Đen",
    image: "/assets/halloween/sweet-cookies.webp",
    category: "sweet",
    badgeLabel: "🍪 Bánh Kẹo Halloween",
  },
  {
    id: "hw-sweet-lollipops",
    name: "Bộ Kẹo Mút Halloween",
    image: "/assets/halloween/sweet-lollipops.webp",
    category: "sweet",
    badgeLabel: "🍭 Bánh Kẹo Halloween",
  },
  {
    id: "hw-sweet-candies",
    name: "Kẹo Ngọt Giấy Xoắn Sắc Màu",
    image: "/assets/halloween/sweet-candies.webp",
    category: "sweet",
    badgeLabel: "🍬 Bánh Kẹo Halloween",
  },
  {
    id: "hw-sweet-candy-bowl",
    name: "Thố Bí Ngô Đầy Ắp Kẹo",
    image: "/assets/halloween/sweet-candy-bowl.webp",
    category: "sweet",
    badgeLabel: "🎃 Bánh Kẹo Halloween",
  },
  {
    id: "hw-sweet-ghost-cake",
    name: "Bánh Kem Ma Nhỏ Đêm Hội",
    image: "/assets/halloween/sweet-ghost-cake.webp",
    category: "sweet",
    badgeLabel: "🎂 Bánh Kẹo Halloween",
  },
  {
    id: "hw-sweet-ghost-cupcake",
    name: "Bánh Cupcake Kem Ma Trắng",
    image: "/assets/halloween/sweet-ghost-cupcake.webp",
    category: "sweet",
    badgeLabel: "🧁 Bánh Kẹo Halloween",
  },
  {
    id: "hw-sweet-smoothie",
    name: "Ly Kem Sinh Tố Bí Ngô",
    image: "/assets/halloween/sweet-smoothie.webp",
    category: "sweet",
    badgeLabel: "🥤 Bánh Kẹo Halloween",
  },
  {
    id: "hw-sweet-donut-cat",
    name: "Bánh Donut Mèo Đen",
    image: "/assets/halloween/sweet-donut-cat.webp",
    category: "sweet",
    badgeLabel: "🍩 Bánh Kẹo Halloween",
  },
  {
    id: "hw-sweet-donut-ghost",
    name: "Bánh Donut Ma Nhỏ",
    image: "/assets/halloween/sweet-donut-ghost.webp",
    category: "sweet",
    badgeLabel: "🍩 Bánh Kẹo Halloween",
  },

  // 3. ĐỒ CHƠI & PHỤ KIỆN PHÉP THUẬT (12 MÓN)
  {
    id: "hw-toy-pumpkin-basket",
    name: "Giỏ Bí Ngô Trick or Treat",
    image: "/assets/halloween/toy-pumpkin-basket.webp",
    category: "toy",
    badgeLabel: "🎃 Đồ Chơi Halloween",
  },
  {
    id: "hw-toy-ghost",
    name: "Bạn Ma Nhỏ Đáng Yêu",
    image: "/assets/halloween/toy-ghost.webp",
    category: "toy",
    badgeLabel: "👻 Đồ Chơi Halloween",
  },
  {
    id: "hw-toy-bat",
    name: "Chú Dơi Tím Nhỏ",
    image: "/assets/halloween/toy-bat.webp",
    category: "toy",
    badgeLabel: "🦇 Đồ Chơi Halloween",
  },
  {
    id: "hw-toy-black-cat",
    name: "Mèo Đen Đeo Nơ Cam",
    image: "/assets/halloween/toy-black-cat.webp",
    category: "toy",
    badgeLabel: "🐈‍⬛ Đồ Chơi Halloween",
  },
  {
    id: "hw-toy-bear",
    name: "Gấu Bông Nơ Bí Ngô",
    image: "/assets/halloween/toy-bear.webp",
    category: "toy",
    badgeLabel: "🧸 Đồ Chơi Halloween",
  },
  {
    id: "hw-toy-train",
    name: "Tàu Hỏa Bí Ngô Phép Thuật",
    image: "/assets/halloween/toy-train.webp",
    category: "toy",
    badgeLabel: "🚂 Đồ Chơi Halloween",
  },
  {
    id: "hw-toy-car",
    name: "Ô Tô Bí Ngô Pastel",
    image: "/assets/halloween/toy-car.webp",
    category: "toy",
    badgeLabel: "🚗 Đồ Chơi Halloween",
  },
  {
    id: "hw-toy-snowglobe",
    name: "Quả Cầu Tuyết Ánh Sao",
    image: "/assets/halloween/toy-snowglobe.webp",
    category: "toy",
    badgeLabel: "🔮 Đồ Chơi Halloween",
  },
  {
    id: "hw-toy-lantern",
    name: "Đèn Lồng Tím Phép Thuật",
    image: "/assets/halloween/toy-lantern.webp",
    category: "toy",
    badgeLabel: "🏮 Đồ Chơi Halloween",
  },
  {
    id: "hw-toy-wand",
    name: "Đũa Thần Ngôi Sao",
    image: "/assets/halloween/toy-wand.webp",
    category: "toy",
    badgeLabel: "🪄 Đồ Chơi Halloween",
  },
  {
    id: "hw-toy-broom",
    name: "Chổi Bay Nơ Tím",
    image: "/assets/halloween/toy-broom.webp",
    category: "toy",
    badgeLabel: "🧹 Đồ Chơi Halloween",
  },
  {
    id: "hw-hat-wizard-purple",
    name: "Mũ Phù Thủy Ngôi Sao",
    image: "/assets/halloween/hat-wizard-purple.webp",
    category: "toy",
    badgeLabel: "🎩 Phụ Kiện Halloween",
  },

  // 4. ĐỒ TRANG TRÍ ĐÊM HỘI (5 MÓN)
  {
    id: "hw-decor-castle",
    name: "Lâu Đài Tím Đêm Trăng",
    image: "/assets/halloween/decor-castle.webp",
    category: "decor",
    badgeLabel: "🏰 Cảnh Vật Halloween",
  },
  {
    id: "hw-decor-sign",
    name: "Bảng Gỗ Trick or Treat",
    image: "/assets/halloween/decor-sign.webp",
    category: "decor",
    badgeLabel: "🪧 Cảnh Vật Halloween",
  },
  {
    id: "hw-decor-cauldron",
    name: "Vạc Kẹo Phép Thuật",
    image: "/assets/halloween/decor-cauldron.webp",
    category: "decor",
    badgeLabel: "🧪 Cảnh Vật Halloween",
  },
  {
    id: "hw-decor-spellbooks",
    name: "Sách Phép Thuật Thắp Nến",
    image: "/assets/halloween/decor-spellbooks.webp",
    category: "decor",
    badgeLabel: "📚 Cảnh Vật Halloween",
  },
  {
    id: "hw-decor-moon",
    name: "Vầng Trăng Khuyết Ánh Sao",
    image: "/assets/halloween/decor-moon.webp",
    category: "decor",
    badgeLabel: "🌙 Cảnh Vật Halloween",
  },
];

export type HalloweenStickerInventory = Record<string, number>;

const HALLOWEEN_STICKER_STORAGE_KEY = "nam-hoc-vui.halloween-stickers.v1";

export function loadHalloweenStickerInventory(): HalloweenStickerInventory {
  const defaultInv: HalloweenStickerInventory = {
    "hw-char-nam-wizard": 1, // Mở sẵn Bé Nấm Phù Thủy Ánh Sao để bé dán ngay
    "hw-toy-pumpkin-basket": 1, // Kèm 1 Giỏ Bí Ngô khởi đầu
  };
  try {
    const raw = window.localStorage.getItem(HALLOWEEN_STICKER_STORAGE_KEY);
    if (!raw) return defaultInv;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return defaultInv;
    const out: HalloweenStickerInventory = { ...defaultInv };
    for (const [k, v] of Object.entries(parsed)) {
      if (typeof v === "number" && v > 0) {
        out[k] = Math.max(out[k] || 0, Math.floor(v));
      }
    }
    return out;
  } catch {
    return defaultInv;
  }
}

export function saveHalloweenStickerInventory(
  inv: HalloweenStickerInventory,
): void {
  try {
    window.localStorage.setItem(
      HALLOWEEN_STICKER_STORAGE_KEY,
      JSON.stringify(inv),
    );
  } catch {
    // ignore storage errors
  }
}

export function getUnlockedHalloweenStickerCount(
  inv?: HalloweenStickerInventory,
): number {
  const store = inv || loadHalloweenStickerInventory();
  return HALLOWEEN_SPECIAL_STICKERS.filter((s) => (store[s.id] || 0) > 0).length;
}

export interface AwardedHalloweenBundleResult {
  characterSticker: HalloweenStickerItem;
  itemSticker: HalloweenStickerItem;
  isNewCharacter: boolean;
  isNewItem: boolean;
  inventory: HalloweenStickerInventory;
}

/**
 * Khi bé thu thập đủ 5/5 Viên Kẹo ở Map Halloween và mở Giỏ Bí Ngô:
 * Thưởng Kép: 1 Nhân Vật Halloween (Nấm Phù Thủy / 7 bạn Sanrio) + 1 Món Đồ Chơi / Bánh Kẹo Halloween!
 */
export function awardHalloweenCandyChestBundle(): AwardedHalloweenBundleResult {
  const inv = loadHalloweenStickerInventory();

  const charPool = HALLOWEEN_SPECIAL_STICKERS.filter(
    (s) => s.category === "character",
  );
  const unownedChars = charPool.filter((s) => (inv[s.id] || 0) === 0);
  const activeCharPool = unownedChars.length > 0 ? unownedChars : charPool;
  const chosenChar =
    activeCharPool[Math.floor(Math.random() * activeCharPool.length)] ||
    charPool[0];
  const isNewCharacter = (inv[chosenChar.id] || 0) === 0;

  const itemPool = HALLOWEEN_SPECIAL_STICKERS.filter(
    (s) => s.category !== "character",
  );
  const unownedItems = itemPool.filter((s) => (inv[s.id] || 0) === 0);
  const activeItemPool = unownedItems.length > 0 ? unownedItems : itemPool;
  const chosenItem =
    activeItemPool[Math.floor(Math.random() * activeItemPool.length)] ||
    itemPool[0];
  const isNewItem = (inv[chosenItem.id] || 0) === 0;

  const nextInv: HalloweenStickerInventory = {
    ...inv,
    [chosenChar.id]: (inv[chosenChar.id] || 0) + 1,
    [chosenItem.id]: (inv[chosenItem.id] || 0) + 1,
  };
  saveHalloweenStickerInventory(nextInv);

  return {
    characterSticker: chosenChar,
    itemSticker: chosenItem,
    isNewCharacter,
    isNewItem,
    inventory: nextInv,
  };
}

// ============================================================================
// KHO LƯU TRỮ 3 BỘ STICKER CHỦ ĐỀ MỚI (NGHỀ NGHIỆP, QUỐC GIA, NHẠC CỤ - 60 MẪU)
// ============================================================================

export type ThemedStickerInventory = Record<string, number>;

const THEMED_STICKER_STORAGE_KEY = "nam-hoc-vui.themed-stickers.v1";

export function loadThemedStickerInventory(): ThemedStickerInventory {
  const defaultInv: ThemedStickerInventory = {
    "career-01": 1, // Mở sẵn Bác Sĩ Hello Kitty
    "career-02": 1, // Mở sẵn Đầu Bếp Bánh My Melody
    "country-01": 1, // Mở sẵn Hello Kitty Kimono Nhật Bản
    "country-02": 1, // Mở sẵn My Melody Hanbok Hàn Quốc
    "music-01": 1, // Mở sẵn Hello Kitty Đàn Violin
    "music-02": 1, // Mở sẵn My Melody Thổi Sáo Ngang
  };
  try {
    const raw = window.localStorage.getItem(THEMED_STICKER_STORAGE_KEY);
    if (!raw) return defaultInv;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return defaultInv;
    const out: ThemedStickerInventory = { ...defaultInv };
    for (const [k, v] of Object.entries(parsed)) {
      if (typeof v === "number" && v > 0) {
        out[k] = Math.max(out[k] || 0, Math.floor(v));
      }
    }
    return out;
  } catch {
    return defaultInv;
  }
}

export function saveThemedStickerInventory(inv: ThemedStickerInventory): void {
  try {
    window.localStorage.setItem(
      THEMED_STICKER_STORAGE_KEY,
      JSON.stringify(inv),
    );
  } catch {
    // ignore storage errors
  }
}

export function getUnlockedThemedStickerCount(
  collection: "careers" | "countries" | "instruments",
  inv?: ThemedStickerInventory,
): number {
  const store = inv || loadThemedStickerInventory();
  const list =
    collection === "careers"
      ? SANRIO_CAREER_STICKERS
      : collection === "countries"
        ? SANRIO_COUNTRY_STICKERS
        : SANRIO_INSTRUMENT_STICKERS;
  return list.filter((s) => (store[s.id] || 0) > 0).length;
}

export function awardThemedStickerForSubject(
  subjectId: SubjectId,
  preferredStickerId?: string,
): ThemedSpecialStickerItem | undefined {
  if (subjectId === "lifeskills" || subjectId === "storybook") {
    return undefined;
  }
  const inv = loadThemedStickerInventory();
  const pool =
    subjectId === "reading" || subjectId === "math" || subjectId === "coloring"
      ? SANRIO_CAREER_STICKERS
      : subjectId === "english" || subjectId === "minigame"
        ? SANRIO_COUNTRY_STICKERS
        : SANRIO_INSTRUMENT_STICKERS;

  let chosen: ThemedSpecialStickerItem | undefined;
  if (
    preferredStickerId &&
    (preferredStickerId.startsWith("career-") ||
      preferredStickerId.startsWith("country-") ||
      preferredStickerId.startsWith("music-"))
  ) {
    chosen = pool.find((s) => s.id === preferredStickerId);
  }
  if (!chosen) {
    const unowned = pool.filter((s) => (inv[s.id] || 0) === 0);
    const activePool = unowned.length > 0 ? unowned : pool;
    chosen =
      activePool[Math.floor(Math.random() * activePool.length)] || pool[0];
  }
  if (!chosen) return undefined;

  const nextInv: ThemedStickerInventory = {
    ...inv,
    [chosen.id]: (inv[chosen.id] || 0) + 1,
  };
  saveThemedStickerInventory(nextInv);
  return chosen;
}





