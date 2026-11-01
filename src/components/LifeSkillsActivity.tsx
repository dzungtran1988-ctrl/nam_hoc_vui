import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  ChefHat,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Utensils,
  Volume2,
} from "lucide-react";
import type { ActivityProps } from "../types";
import { prefetchSpeech, useSpeech } from "../hooks/useSpeech";
import { drawNonRepeatingItems } from "../lib/nonRepeatingDeck";
import {
  playCorrectDingSound,
  playRewardTone,
  playWrongBuzzSound,
} from "../lib/sound";

// 6 câu lệnh ngắn phổ quát dùng chung cho toàn bộ Kỹ năng sống (được cache 100%, phát 0ms)
const UNIVERSAL_PROMPTS = {
  cookStep1: "Con chọn 3 nguyên liệu đúng nhé!",
  cookStep2: "Con chạm vào từng món để sơ chế nhé!",
  cookStep3: "Bấm nút nấu chín và bày ra đĩa nào!",
  habitStage1: "Con chọn 3 đồ dùng cần chuẩn bị nhé!",
  habitStage2: "Con xếp các bước theo thứ tự 1, 2, 3 nhé!",
  completed: "Giỏi quá! Nấm đã hoàn thành xuất sắc!",
} as const;

interface IngredientOption {
  id: string;
  name: string;
  imageUrl: string;
  isCorrect: boolean;
  prepActionLabel?: string;
  prepDoneLabel?: string;
  preppedImageUrl?: string;
}

interface CookingRecipe {
  id: string;
  shortTitle: string;
  emoji: string;
  platedImageUrl: string;
  namSticker: string;
  cookActionLabel: string;
  platedLabel: string;
  ingredients: IngredientOption[];
}

interface HabitPrepTool {
  id: string;
  name: string;
  imageUrl: string;
  isCorrect: boolean;
}

interface HabitSequenceStep {
  id: string;
  order: 1 | 2 | 3;
  label: string;
  imageUrl: string;
}

interface DailyHabitQuest {
  id: string;
  shortTitle: string;
  emoji: string;
  heroImageUrl: string;
  namSticker: string;
  prepTools: HabitPrepTool[];
  steps: HabitSequenceStep[];
}

const COOKING_RECIPES: CookingRecipe[] = [
  {
    id: "recipe-cookies",
    shortTitle: "🍪 Bánh Quy",
    emoji: "🍪",
    platedImageUrl: "/assets/items/lifeskills/lifeskills_14.webp",
    namSticker: "/assets/nam-stickers/nam-chef-cookies.webp",
    cookActionLabel: "🔥 Nướng Bánh Quy!",
    platedLabel: "🍪 Khay Bánh Quy Thơm Phức",
    ingredients: [
      {
        id: "flour-butter",
        name: "Bột mì",
        imageUrl: "/assets/items/lifeskills/lifeskills_05.webp",
        isCorrect: true,
        prepActionLabel: "Nhào bột",
        prepDoneLabel: "Đã nhào bột",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_02.webp",
      },
      {
        id: "egg-milk-cookie",
        name: "Trứng gà",
        imageUrl: "/assets/items/lifeskills/lifeskills_04.webp",
        isCorrect: true,
        prepActionLabel: "Cán khuôn",
        prepDoneLabel: "Đã cán khuôn",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_13.webp",
      },
      {
        id: "icing-choco",
        name: "Kem dâu",
        imageUrl: "/assets/items/lifeskills/lifeskills_15.webp",
        isCorrect: true,
        prepActionLabel: "Đánh kem",
        prepDoneLabel: "Đã đánh kem",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_18.webp",
      },
      {
        id: "scissors-wrong",
        name: "Cây kéo",
        imageUrl: "/assets/items/school/school_09.webp",
        isCorrect: false,
      },
      {
        id: "clock-wrong",
        name: "Đồng hồ",
        imageUrl: "/assets/items/home/home_05.webp",
        isCorrect: false,
      },
    ],
  },
  {
    id: "recipe-milktea",
    shortTitle: "🧋 Trà Sữa",
    emoji: "🧋",
    platedImageUrl: "/assets/items/sweets/sweet_11.webp",
    namSticker: "/assets/nam-stickers/nam-chef-milktea.webp",
    cookActionLabel: "🧊 Lắc Trà Sữa!",
    platedLabel: "🧋 Ly Trà Sữa Trân Châu",
    ingredients: [
      {
        id: "black-tea",
        name: "Hồng trà",
        imageUrl: "/assets/items/home/home_02.webp",
        isCorrect: true,
        prepActionLabel: "Ủ cốt trà",
        prepDoneLabel: "Đã ủ trà",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_08.webp",
      },
      {
        id: "boba-pearls",
        name: "Trân châu",
        imageUrl: "/assets/items/lifeskills/lifeskills_24.webp",
        isCorrect: true,
        prepActionLabel: "Múc trân châu",
        prepDoneLabel: "Đã múc",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_10.webp",
      },
      {
        id: "fresh-milk-cream",
        name: "Sữa tươi",
        imageUrl: "/assets/items/lifeskills/lifeskills_03.webp",
        isCorrect: true,
        prepActionLabel: "Đong sữa",
        prepDoneLabel: "Đã đong sữa",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_11.webp",
      },
      {
        id: "soap-bar",
        name: "Sữa tắm",
        imageUrl: "/assets/items/home/home_09.webp",
        isCorrect: false,
      },
      {
        id: "ruler-tool",
        name: "Thước kẻ",
        imageUrl: "/assets/items/school/school_06.webp",
        isCorrect: false,
      },
    ],
  },
  {
    id: "recipe-bento",
    shortTitle: "🍱 Cơm Bento",
    emoji: "🍱",
    platedImageUrl: "/assets/items/lifeskills/lifeskills_19.webp",
    namSticker: "/assets/nam-stickers/nam-eat-bento.webp",
    cookActionLabel: "🍳 Bày Cơm Bento!",
    platedLabel: "🍚 Hộp Cơm Bento Nóng Hổi",
    ingredients: [
      {
        id: "rice",
        name: "Cơm trắng",
        imageUrl: "/assets/items/lifeskills/lifeskills_19.webp",
        isCorrect: true,
        prepActionLabel: "Nấu cơm",
        prepDoneLabel: "Đã nấu cơm",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_08.webp",
      },
      {
        id: "egg",
        name: "Trứng gà",
        imageUrl: "/assets/items/lifeskills/lifeskills_04.webp",
        isCorrect: true,
        prepActionLabel: "Chiên trứng",
        prepDoneLabel: "Đã chiên trứng",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_07.webp",
      },
      {
        id: "broccoli",
        name: "Rau củ",
        imageUrl: "/assets/items/lifeskills/lifeskills_06.webp",
        isCorrect: true,
        prepActionLabel: "Thái rau",
        prepDoneLabel: "Đã thái rau",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_01.webp",
      },
      {
        id: "toy",
        name: "Ô tô",
        imageUrl: "/assets/items/vehicles/vehicle_01.webp",
        isCorrect: false,
      },
      {
        id: "crayon",
        name: "Bút màu",
        imageUrl: "/assets/items/school/school_08.webp",
        isCorrect: false,
      },
    ],
  },
  {
    id: "recipe-ramen",
    shortTitle: "🍜 Mì Ramen",
    emoji: "🍜",
    platedImageUrl: "/assets/items/lifeskills/lifeskills_20.webp",
    namSticker: "/assets/nam-stickers/nam-eat-noodles.webp",
    cookActionLabel: "🍲 Nấu Tô Mì Ramen!",
    platedLabel: "🍜 Tô Mì Ramen Trứng Đào",
    ingredients: [
      {
        id: "noodle",
        name: "Vắt mì",
        imageUrl: "/assets/items/lifeskills/lifeskills_05.webp",
        isCorrect: true,
        prepActionLabel: "Trụng mì",
        prepDoneLabel: "Đã trụng mì",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_08.webp",
      },
      {
        id: "egg2",
        name: "Trứng gà",
        imageUrl: "/assets/items/lifeskills/lifeskills_04.webp",
        isCorrect: true,
        prepActionLabel: "Luộc trứng",
        prepDoneLabel: "Đã luộc trứng",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_10.webp",
      },
      {
        id: "greens",
        name: "Rau xanh",
        imageUrl: "/assets/items/lifeskills/lifeskills_06.webp",
        isCorrect: true,
        prepActionLabel: "Thái rau",
        prepDoneLabel: "Đã thái rau",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_01.webp",
      },
      {
        id: "shoe",
        name: "Cặp sách",
        imageUrl: "/assets/items/school/school_01.webp",
        isCorrect: false,
      },
      {
        id: "ball",
        name: "Máy bay",
        imageUrl: "/assets/items/vehicles/vehicle_06.webp",
        isCorrect: false,
      },
    ],
  },
  {
    id: "recipe-burger",
    shortTitle: "🍔 Bánh Burger",
    emoji: "🍔",
    platedImageUrl: "/assets/items/lifeskills/lifeskills_21.webp",
    namSticker: "/assets/nam-stickers/nam-eat-burger.webp",
    cookActionLabel: "🔥 Kẹp Bánh Burger!",
    platedLabel: "🍔 Bánh Burger Bò Phô Mai",
    ingredients: [
      {
        id: "bread",
        name: "Vỏ bánh mì",
        imageUrl: "/assets/math/pastries16/pastry16_10.webp",
        isCorrect: true,
        prepActionLabel: "Nướng bánh",
        prepDoneLabel: "Đã nướng bánh",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_17.webp",
      },
      {
        id: "cheese",
        name: "Thịt & Phô mai",
        imageUrl: "/assets/items/lifeskills/lifeskills_07.webp",
        isCorrect: true,
        prepActionLabel: "Áp chảo",
        prepDoneLabel: "Đã áp chảo",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_09.webp",
      },
      {
        id: "salad",
        name: "Rau & Cà chua",
        imageUrl: "/assets/items/lifeskills/lifeskills_06.webp",
        isCorrect: true,
        prepActionLabel: "Thái lát",
        prepDoneLabel: "Đã thái lát",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_01.webp",
      },
      {
        id: "book",
        name: "Quyển sổ",
        imageUrl: "/assets/items/school/school_02.webp",
        isCorrect: false,
      },
      {
        id: "umbrella",
        name: "Đèn bàn",
        imageUrl: "/assets/items/home/home_01.webp",
        isCorrect: false,
      },
    ],
  },
  {
    id: "recipe-chicken",
    shortTitle: "🍗 Gà Rán Giòn",
    emoji: "🍗",
    platedImageUrl: "/assets/items/lifeskills/lifeskills_22.webp",
    namSticker: "/assets/nam-stickers/nam-eat-chicken.webp",
    cookActionLabel: "🍳 Chiên Đĩa Gà Rán!",
    platedLabel: "🍗 Đĩa Gà Rán Giòn & Salad",
    ingredients: [
      {
        id: "drumstick",
        name: "Bột chiên gà",
        imageUrl: "/assets/items/lifeskills/lifeskills_05.webp",
        isCorrect: true,
        prepActionLabel: "Tẩm bột",
        prepDoneLabel: "Đã tẩm bột",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_02.webp",
      },
      {
        id: "tomato",
        name: "Rau salad",
        imageUrl: "/assets/items/lifeskills/lifeskills_06.webp",
        isCorrect: true,
        prepActionLabel: "Rửa rau",
        prepDoneLabel: "Đã rửa rau",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_01.webp",
      },
      {
        id: "corn",
        name: "Cam tươi",
        imageUrl: "/assets/items/fruits/fruit_09.webp",
        isCorrect: true,
        prepActionLabel: "Vắt nước cam",
        prepDoneLabel: "Đã vắt cam",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_23.webp",
      },
      {
        id: "clock",
        name: "Đồng hồ",
        imageUrl: "/assets/items/home/home_05.webp",
        isCorrect: false,
      },
      {
        id: "hat",
        name: "Cây chổi",
        imageUrl: "/assets/items/home/home_14.webp",
        isCorrect: false,
      },
    ],
  },
  {
    id: "recipe-icecream",
    shortTitle: "🍰 Bánh Kem Dâu",
    emoji: "🍰",
    platedImageUrl: "/assets/items/lifeskills/lifeskills_16.webp",
    namSticker: "/assets/nam-stickers/nam-eat-icecream.webp",
    cookActionLabel: "🎂 Phết Kem Bày Đĩa!",
    platedLabel: "🍰 Bánh Kem Dâu Tây",
    ingredients: [
      {
        id: "milk",
        name: "Sữa tươi",
        imageUrl: "/assets/items/lifeskills/lifeskills_03.webp",
        isCorrect: true,
        prepActionLabel: "Đánh kem",
        prepDoneLabel: "Đã đánh kem",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_18.webp",
      },
      {
        id: "strawberry",
        name: "Dâu tây",
        imageUrl: "/assets/items/fruits/fruit_01.webp",
        isCorrect: true,
        prepActionLabel: "Cắt dâu",
        prepDoneLabel: "Đã cắt dâu",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_01.webp",
      },
      {
        id: "cone",
        name: "Cốt bánh",
        imageUrl: "/assets/items/lifeskills/lifeskills_15.webp",
        isCorrect: true,
        prepActionLabel: "Phết bánh",
        prepDoneLabel: "Đã phết bánh",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_02.webp",
      },
      {
        id: "pencil",
        name: "Bút chì",
        imageUrl: "/assets/items/school/school_04.webp",
        isCorrect: false,
      },
      {
        id: "sock",
        name: "Ghế sofa",
        imageUrl: "/assets/items/home/home_06.webp",
        isCorrect: false,
      },
    ],
  },
  {
    id: "recipe-pizza",
    shortTitle: "🍕 Bánh Pizza",
    emoji: "🍕",
    platedImageUrl: "/assets/nam-stickers/nam-eat-pizza.webp",
    namSticker: "/assets/nam-stickers/nam-eat-pizza.webp",
    cookActionLabel: "🔥 Nướng Bánh Pizza!",
    platedLabel: "🍕 Bánh Pizza Phô Mai Nóng Hổi",
    ingredients: [
      {
        id: "pz-dough",
        name: "Bột đế bánh",
        imageUrl: "/assets/items/lifeskills/lifeskills_05.webp",
        isCorrect: true,
        prepActionLabel: "Cán đế bánh",
        prepDoneLabel: "Đã cán đế",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_13.webp",
      },
      {
        id: "pz-cheese",
        name: "Phô mai & Xúc xích",
        imageUrl: "/assets/items/lifeskills/lifeskills_07.webp",
        isCorrect: true,
        prepActionLabel: "Rắc phô mai",
        prepDoneLabel: "Đã rắc phô mai",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_09.webp",
      },
      {
        id: "pz-veggie",
        name: "Cà chua & Ớt chuông",
        imageUrl: "/assets/items/lifeskills/lifeskills_06.webp",
        isCorrect: true,
        prepActionLabel: "Thái lát mỏng",
        prepDoneLabel: "Đã thái lát",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_01.webp",
      },
      {
        id: "pz-wrong-bag",
        name: "Cặp sách",
        imageUrl: "/assets/items/school/school_01.webp",
        isCorrect: false,
      },
      {
        id: "pz-wrong-broom",
        name: "Cây chổi",
        imageUrl: "/assets/items/home/home_14.webp",
        isCorrect: false,
      },
    ],
  },
  {
    id: "recipe-fries",
    shortTitle: "🍟 Khoai Tây Chiên",
    emoji: "🍟",
    platedImageUrl: "/assets/nam-stickers/nam-eat-fries.webp",
    namSticker: "/assets/nam-stickers/nam-eat-fries.webp",
    cookActionLabel: "🍳 Chiên Khoai Tây Vàng Giòn!",
    platedLabel: "🍟 Hộp Khoai Tây Chiên Giòn Rụm",
    ingredients: [
      {
        id: "fr-potato",
        name: "Khoai tây tươi",
        imageUrl: "/assets/items/lifeskills/lifeskills_06.webp",
        isCorrect: true,
        prepActionLabel: "Thái thanh dài",
        prepDoneLabel: "Đã thái khoai",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_01.webp",
      },
      {
        id: "fr-crispy-flour",
        name: "Bột chiên giòn",
        imageUrl: "/assets/items/lifeskills/lifeskills_05.webp",
        isCorrect: true,
        prepActionLabel: "Áo lớp bột",
        prepDoneLabel: "Đã áo bột",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_02.webp",
      },
      {
        id: "fr-pan-oil",
        name: "Chảo chiên nóng",
        imageUrl: "/assets/items/lifeskills/lifeskills_07.webp",
        isCorrect: true,
        prepActionLabel: "Làm nóng chảo",
        prepDoneLabel: "Chảo đã nóng",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_09.webp",
      },
      {
        id: "fr-wrong-pillow",
        name: "Chiếc gối",
        imageUrl: "/assets/items/home/home_07.webp",
        isCorrect: false,
      },
      {
        id: "fr-wrong-ruler",
        name: "Thước kẻ",
        imageUrl: "/assets/items/school/school_06.webp",
        isCorrect: false,
      },
    ],
  },
];

// ============================================================================
// 6 BÀI BÉ TỰ LẬP: NHÃN NGẮN GỌN 2-4 CHỮ, HÌNH TRỰC QUAN
// ============================================================================
const DAILY_HABITS: DailyHabitQuest[] = [
  {
    id: "habit-dishes",
    shortTitle: "🍽️ Rửa Bát Đĩa",
    emoji: "🍽️",
    heroImageUrl: "/assets/items/home/home_04.webp",
    namSticker: "/assets/nam-stickers/nam-eat-rice.webp",
    prepTools: [
      {
        id: "dish-bowl",
        name: "Bát đĩa bẩn",
        imageUrl: "/assets/items/lifeskills/lifeskills_19.webp",
        isCorrect: true,
      },
      {
        id: "dish-soap",
        name: "Nước rửa bát",
        imageUrl: "/assets/items/home/home_09.webp",
        isCorrect: true,
      },
      {
        id: "dish-rack",
        name: "Kệ úp đĩa",
        imageUrl: "/assets/items/home/home_04.webp",
        isCorrect: true,
      },
      {
        id: "dish-wrong-car",
        name: "Ô tô",
        imageUrl: "/assets/items/vehicles/vehicle_01.webp",
        isCorrect: false,
      },
      {
        id: "dish-wrong-ball",
        name: "Quả bóng",
        imageUrl: "/assets/english/items/shop_16_ball_green.webp",
        isCorrect: false,
      },
    ],
    steps: [
      {
        id: "d-step-1",
        order: 1,
        label: "Chà xà phòng",
        imageUrl: "/assets/items/home/home_09.webp",
      },
      {
        id: "d-step-2",
        order: 2,
        label: "Tráng nước sạch",
        imageUrl: "/assets/items/home/home_08.webp",
      },
      {
        id: "d-step-3",
        order: 3,
        label: "Úp lên kệ",
        imageUrl: "/assets/items/home/home_04.webp",
      },
    ],
  },
  {
    id: "habit-laundry",
    shortTitle: "👗 Gấp Quần Áo",
    emoji: "👗",
    heroImageUrl: "/assets/items/home/home_13.webp",
    namSticker: "/assets/nam-stickers/nam-hug-mymelody.webp",
    prepTools: [
      {
        id: "laundry-dress",
        name: "Quần áo",
        imageUrl: "/assets/english/items/shop_13_dress_pink.webp",
        isCorrect: true,
      },
      {
        id: "laundry-washer",
        name: "Máy giặt",
        imageUrl: "/assets/items/home/home_13.webp",
        isCorrect: true,
      },
      {
        id: "laundry-towel",
        name: "Ngăn tủ",
        imageUrl: "/assets/items/home/home_10.webp",
        isCorrect: true,
      },
      {
        id: "laundry-wrong-pan",
        name: "Chảo rán",
        imageUrl: "/assets/items/lifeskills/lifeskills_07.webp",
        isCorrect: false,
      },
      {
        id: "laundry-wrong-cake",
        name: "Bánh kem",
        imageUrl: "/assets/items/lifeskills/lifeskills_16.webp",
        isCorrect: false,
      },
    ],
    steps: [
      {
        id: "l-step-1",
        order: 1,
        label: "Giặt & phơi khô",
        imageUrl: "/assets/items/home/home_13.webp",
      },
      {
        id: "l-step-2",
        order: 2,
        label: "Gập hai tay áo",
        imageUrl: "/assets/english/items/shop_13_dress_pink.webp",
      },
      {
        id: "l-step-3",
        order: 3,
        label: "Gập đôi cất tủ",
        imageUrl: "/assets/items/home/home_10.webp",
      },
    ],
  },
  {
    id: "habit-room",
    shortTitle: "🛌 Dọn Phòng",
    emoji: "🛌",
    heroImageUrl: "/assets/items/home/home_07.webp",
    namSticker: "/assets/nam-stickers/nam-study-read.webp",
    prepTools: [
      {
        id: "room-pillow",
        name: "Chăn gối",
        imageUrl: "/assets/items/home/home_07.webp",
        isCorrect: true,
      },
      {
        id: "room-broom",
        name: "Cây chổi",
        imageUrl: "/assets/items/home/home_14.webp",
        isCorrect: true,
      },
      {
        id: "room-lamp",
        name: "Đèn bàn học",
        imageUrl: "/assets/items/home/home_01.webp",
        isCorrect: true,
      },
      {
        id: "room-wrong-ramen",
        name: "Tô mì",
        imageUrl: "/assets/items/lifeskills/lifeskills_20.webp",
        isCorrect: false,
      },
      {
        id: "room-wrong-bike",
        name: "Xe đạp",
        imageUrl: "/assets/items/vehicles/vehicle_03.webp",
        isCorrect: false,
      },
    ],
    steps: [
      {
        id: "r-step-1",
        order: 1,
        label: "Gấp chăn gối",
        imageUrl: "/assets/items/home/home_07.webp",
      },
      {
        id: "r-step-2",
        order: 2,
        label: "Quét sạch sàn",
        imageUrl: "/assets/items/home/home_14.webp",
      },
      {
        id: "r-step-3",
        order: 3,
        label: "Xếp gọn bàn học",
        imageUrl: "/assets/items/home/home_01.webp",
      },
    ],
  },
  {
    id: "habit-school",
    shortTitle: "🎒 Soạn Cặp Sách",
    emoji: "🎒",
    heroImageUrl: "/assets/items/school/school_01.webp",
    namSticker: "/assets/nam-stickers/nam-study-school.webp",
    prepTools: [
      {
        id: "sch-book",
        name: "Sách vở",
        imageUrl: "/assets/items/school/school_03.webp",
        isCorrect: true,
      },
      {
        id: "sch-pencilcase",
        name: "Hộp bút",
        imageUrl: "/assets/items/school/school_12.webp",
        isCorrect: true,
      },
      {
        id: "sch-bag",
        name: "Cặp sách",
        imageUrl: "/assets/items/school/school_01.webp",
        isCorrect: true,
      },
      {
        id: "sch-wrong-bath",
        name: "Bồn tắm",
        imageUrl: "/assets/items/home/home_08.webp",
        isCorrect: false,
      },
      {
        id: "sch-wrong-sofa",
        name: "Ghế sofa",
        imageUrl: "/assets/items/home/home_06.webp",
        isCorrect: false,
      },
    ],
    steps: [
      {
        id: "s-step-1",
        order: 1,
        label: "Cất bút vào hộp",
        imageUrl: "/assets/items/school/school_12.webp",
      },
      {
        id: "s-step-2",
        order: 2,
        label: "Xếp sách vào cặp",
        imageUrl: "/assets/items/school/school_03.webp",
      },
      {
        id: "s-step-3",
        order: 3,
        label: "Kéo khóa đeo cặp",
        imageUrl: "/assets/items/school/school_01.webp",
      },
    ],
  },
  {
    id: "habit-brush",
    shortTitle: "🪥 Đánh Răng",
    emoji: "🪥",
    heroImageUrl: "/assets/english/items/act_11_brush_teeth.webp",
    namSticker: "/assets/nam-stickers/nam-study-brush.webp",
    prepTools: [
      {
        id: "br-soap",
        name: "Bàn chải & Kem",
        imageUrl: "/assets/english/items/act_11_brush_teeth.webp",
        isCorrect: true,
      },
      {
        id: "br-water",
        name: "Nước sạch",
        imageUrl: "/assets/english/items/act_12_wash_hands.webp",
        isCorrect: true,
      },
      {
        id: "br-towel",
        name: "Khăn mặt",
        imageUrl: "/assets/items/home/home_10.webp",
        isCorrect: true,
      },
      {
        id: "br-wrong-crayon",
        name: "Bút màu",
        imageUrl: "/assets/items/school/school_08.webp",
        isCorrect: false,
      },
      {
        id: "br-wrong-plane",
        name: "Máy bay",
        imageUrl: "/assets/items/vehicles/vehicle_06.webp",
        isCorrect: false,
      },
    ],
    steps: [
      {
        id: "b-step-1",
        order: 1,
        label: "Chải sạch răng",
        imageUrl: "/assets/english/items/act_11_brush_teeth.webp",
      },
      {
        id: "b-step-2",
        order: 2,
        label: "Súc miệng rửa mặt",
        imageUrl: "/assets/english/items/act_12_wash_hands.webp",
      },
      {
        id: "b-step-3",
        order: 3,
        label: "Lau khô bằng khăn",
        imageUrl: "/assets/items/home/home_10.webp",
      },
    ],
  },
  {
    id: "habit-water",
    shortTitle: "🌱 Tưới Cây",
    emoji: "🌱",
    heroImageUrl: "/assets/items/home/home_11.webp",
    namSticker: "/assets/nam-stickers/nam-study-water.webp",
    prepTools: [
      {
        id: "wt-can",
        name: "Bình tưới",
        imageUrl: "/assets/items/home/home_15.webp",
        isCorrect: true,
      },
      {
        id: "wt-plant",
        name: "Chậu cây",
        imageUrl: "/assets/items/home/home_11.webp",
        isCorrect: true,
      },
      {
        id: "wt-basket",
        name: "Rổ thu hoạch",
        imageUrl: "/assets/items/lifeskills/lifeskills_06.webp",
        isCorrect: true,
      },
      {
        id: "wt-wrong-clock",
        name: "Đồng hồ",
        imageUrl: "/assets/items/home/home_05.webp",
        isCorrect: false,
      },
      {
        id: "wt-wrong-mitt",
        name: "Găng tay",
        imageUrl: "/assets/items/lifeskills/lifeskills_17.webp",
        isCorrect: false,
      },
    ],
    steps: [
      {
        id: "w-step-1",
        order: 1,
        label: "Lấy nước vào bình",
        imageUrl: "/assets/items/home/home_15.webp",
      },
      {
        id: "w-step-2",
        order: 2,
        label: "Tưới gốc cây",
        imageUrl: "/assets/items/home/home_11.webp",
      },
      {
        id: "w-step-3",
        order: 3,
        label: "Thu hoạch rau quả",
        imageUrl: "/assets/items/lifeskills/lifeskills_06.webp",
      },
    ],
  },
  {
    id: "habit-wakeup",
    shortTitle: "⏰ Thức Dậy Sớm",
    emoji: "⏰",
    heroImageUrl: "/assets/nam-stickers/nam-routine-wakeup.webp",
    namSticker: "/assets/nam-stickers/nam-routine-wakeup.webp",
    prepTools: [
      {
        id: "wk-clock",
        name: "Đồng hồ báo thức",
        imageUrl: "/assets/items/home/home_05.webp",
        isCorrect: true,
      },
      {
        id: "wk-pillow",
        name: "Chăn gối gọn",
        imageUrl: "/assets/items/home/home_07.webp",
        isCorrect: true,
      },
      {
        id: "wk-towel",
        name: "Khăn mặt sạch",
        imageUrl: "/assets/items/home/home_10.webp",
        isCorrect: true,
      },
      {
        id: "wk-wrong-pan",
        name: "Chảo rán",
        imageUrl: "/assets/items/lifeskills/lifeskills_07.webp",
        isCorrect: false,
      },
      {
        id: "wk-wrong-car",
        name: "Xe ô tô",
        imageUrl: "/assets/items/vehicles/vehicle_01.webp",
        isCorrect: false,
      },
    ],
    steps: [
      {
        id: "wk-step-1",
        order: 1,
        label: "Tắt chuông & vươn vai",
        imageUrl: "/assets/nam-stickers/nam-routine-wakeup.webp",
      },
      {
        id: "wk-step-2",
        order: 2,
        label: "Gấp gọn chăn gối",
        imageUrl: "/assets/items/home/home_07.webp",
      },
      {
        id: "wk-step-3",
        order: 3,
        label: "Đánh răng rửa mặt",
        imageUrl: "/assets/nam-stickers/nam-study-brush.webp",
      },
    ],
  },
  {
    id: "habit-exercise",
    shortTitle: "🤸 Tập Thể Dục",
    emoji: "🤸",
    heroImageUrl: "/assets/nam-stickers/nam-routine-exercise.webp",
    namSticker: "/assets/nam-stickers/nam-routine-exercise.webp",
    prepTools: [
      {
        id: "ex-shoes",
        name: "Giày thể thao",
        imageUrl: "/assets/english/items/shop_16_shoes_blue.webp",
        isCorrect: true,
      },
      {
        id: "ex-ball",
        name: "Quả bóng",
        imageUrl: "/assets/english/items/shop_16_ball_green.webp",
        isCorrect: true,
      },
      {
        id: "ex-water",
        name: "Bình nước ấm",
        imageUrl: "/assets/items/home/home_02.webp",
        isCorrect: true,
      },
      {
        id: "ex-wrong-cake",
        name: "Bánh kem",
        imageUrl: "/assets/items/lifeskills/lifeskills_16.webp",
        isCorrect: false,
      },
      {
        id: "ex-wrong-scissors",
        name: "Cây kéo",
        imageUrl: "/assets/items/school/school_09.webp",
        isCorrect: false,
      },
    ],
    steps: [
      {
        id: "ex-step-1",
        order: 1,
        label: "Vươn tay khởi động",
        imageUrl: "/assets/nam-stickers/nam-routine-exercise.webp",
      },
      {
        id: "ex-step-2",
        order: 2,
        label: "Vận động đá bóng",
        imageUrl: "/assets/nam-stickers/nam-sub-soccer.webp",
      },
      {
        id: "ex-step-3",
        order: 3,
        label: "Lau mồ hôi & uống nước",
        imageUrl: "/assets/items/home/home_02.webp",
      },
    ],
  },
  {
    id: "habit-desk",
    shortTitle: "✂️ Gọn Gàng Bàn Học",
    emoji: "✂️",
    heroImageUrl: "/assets/nam-stickers/nam-routine-craft.webp",
    namSticker: "/assets/nam-stickers/nam-routine-craft.webp",
    prepTools: [
      {
        id: "dk-holder",
        name: "Ống đựng bút",
        imageUrl: "/assets/items/school/school_12.webp",
        isCorrect: true,
      },
      {
        id: "dk-books",
        name: "Sách vở",
        imageUrl: "/assets/items/school/school_03.webp",
        isCorrect: true,
      },
      {
        id: "dk-lamp",
        name: "Đèn bàn học",
        imageUrl: "/assets/items/home/home_01.webp",
        isCorrect: true,
      },
      {
        id: "dk-wrong-ramen",
        name: "Tô mì",
        imageUrl: "/assets/items/lifeskills/lifeskills_20.webp",
        isCorrect: false,
      },
      {
        id: "dk-wrong-washer",
        name: "Máy giặt",
        imageUrl: "/assets/items/home/home_13.webp",
        isCorrect: false,
      },
    ],
    steps: [
      {
        id: "dk-step-1",
        order: 1,
        label: "Cắm bút gọn vào ống",
        imageUrl: "/assets/nam-stickers/nam-routine-craft.webp",
      },
      {
        id: "dk-step-2",
        order: 2,
        label: "Xếp sách vở ngay ngắn",
        imageUrl: "/assets/nam-stickers/nam-routine-homework.webp",
      },
      {
        id: "dk-step-3",
        order: 3,
        label: "Lau sạch mặt bàn",
        imageUrl: "/assets/items/home/home_01.webp",
      },
    ],
  },
  {
    id: "habit-bedtime",
    shortTitle: "🌙 Đi Ngủ Đúng Giờ",
    emoji: "🌙",
    heroImageUrl: "/assets/nam-stickers/nam-routine-sleep.webp",
    namSticker: "/assets/nam-stickers/nam-routine-sleep.webp",
    prepTools: [
      {
        id: "bt-brush",
        name: "Bàn chải răng",
        imageUrl: "/assets/english/items/act_11_brush_teeth.webp",
        isCorrect: true,
      },
      {
        id: "bt-book",
        name: "Truyện cổ tích",
        imageUrl: "/assets/items/school/school_03.webp",
        isCorrect: true,
      },
      {
        id: "bt-pillow",
        name: "Chăn gối êm",
        imageUrl: "/assets/items/home/home_07.webp",
        isCorrect: true,
      },
      {
        id: "bt-wrong-ball",
        name: "Quả bóng",
        imageUrl: "/assets/english/items/shop_16_ball_green.webp",
        isCorrect: false,
      },
      {
        id: "bt-wrong-fries",
        name: "Khoai tây chiên",
        imageUrl: "/assets/nam-stickers/nam-eat-fries.webp",
        isCorrect: false,
      },
    ],
    steps: [
      {
        id: "bt-step-1",
        order: 1,
        label: "Đánh răng sạch buổi tối",
        imageUrl: "/assets/nam-stickers/nam-study-brush.webp",
      },
      {
        id: "bt-step-2",
        order: 2,
        label: "Đọc sách cùng mẹ",
        imageUrl: "/assets/nam-stickers/nam-study-read.webp",
      },
      {
        id: "bt-step-3",
        order: 3,
        label: "Tắt đèn ngủ ngon giấc",
        imageUrl: "/assets/nam-stickers/nam-routine-sleep.webp",
      },
    ],
  },
];

// ============================================================================
// TAB 3: THƯỜNG THỨC & AN TOÀN CƠ BẢN (25 CÂU HỎI TÌNH HUỐNG THỰC TẾ — RÚT 5 CÂU/LƯỢT)
// ============================================================================
interface SafetyChoice {
  id: string;
  label: string;
  emoji: string;
  isCorrect: boolean;
}

interface SafetyCommonSenseQuestion {
  id: string;
  categoryBadge: string;
  question: string;
  heroImage: string;
  explainSuccess: string;
  choices: SafetyChoice[];
}

const SAFETY_QUESTIONS_PER_ROUND = 5;

const SAFETY_COMMON_SENSE_POOL: SafetyCommonSenseQuestion[] = [
  // --- CHỦ ĐỀ 1: PHÒNG CHÁY CHỮA CHÁY (PCCC & KHI CÓ CHÁY) ---
  {
    id: "sf-fire-1",
    categoryBadge: "🔥 PCCC · Khi Có Cháy",
    question: "Khi thấy khói hoặc lửa bốc lên trong nhà, Nấm cần làm gì ngay lập tức?",
    heroImage: "/assets/items/vehicles/vehicle_11.webp",
    explainSuccess: "Đúng rồi! Thấy khói lửa phải hô to báo người lớn và chạy nhanh ra ngoài, tuyệt đối không trốn vào tủ kín nhé!",
    choices: [
      {
        id: "a",
        label: "Hô to báo người lớn và chạy nhanh ra ngoài nơi thoáng",
        emoji: "🏃‍♂️",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Chui vào tủ quần áo hoặc gầm giường trốn kỹ",
        emoji: "🚪",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Ngồi yên trong phòng chơi đồ chơi tiếp",
        emoji: "🧸",
        isCorrect: false,
      },
    ],
  },
  {
    id: "sf-fire-2",
    categoryBadge: "🔥 PCCC · Thoát Khỏi Đám Khói",
    question: "Khi phải đi qua chỗ có khói để thoát ra ngoài, Nấm nên đi như thế nào?",
    heroImage: "/assets/nam-stickers/nam-study-think.webp",
    explainSuccess: "Giỏi lắm! Khói bay lên cao nên mình lấy khăn ướt che mũi miệng và cúi thấp người men theo tường ra ngoài nhé!",
    choices: [
      {
        id: "a",
        label: "Dùng khăn ướt che mũi miệng và cúi thấp người đi ra",
        emoji: "😷",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Đứng thẳng cao đầu và hít thở thật sâu",
        emoji: "🧍",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Nhắm mắt chạy lung tung vào chỗ tối",
        emoji: "🙈",
        isCorrect: false,
      },
    ],
  },
  {
    id: "sf-fire-3",
    categoryBadge: "🚒 Số Điện Thoại Cứu Hỏa",
    question: "Đố Nấm: Số điện thoại khẩn cấp để gọi các chú Lính Cứu Hỏa khi có cháy là số mấy?",
    heroImage: "/assets/items/vehicles/vehicle_11.webp",
    explainSuccess: "Chính xác! Số 114 là số gọi Xe Cứu Hỏa khi có đám cháy nhé!",
    choices: [
      {
        id: "a",
        label: "Số 114 — Gọi Xe Cứu Hỏa chữa cháy",
        emoji: "🚒",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Số 999 — Gọi tiệm bánh kem",
        emoji: "🎂",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Số 000 — Không cần gọi ai cả",
        emoji: "📵",
        isCorrect: false,
      },
    ],
  },
  {
    id: "sf-fire-4",
    categoryBadge: "🔥 PCCC · Thoát Hiểm Nhà Cao Tầng",
    question: "Khi chuông báo cháy kêu vang ở tòa nhà cao tầng, mình đi lối nào để xuống đất an toàn?",
    heroImage: "/assets/nam-stickers/nam-routine-school-run.webp",
    explainSuccess: "Chuẩn luôn! Khi có cháy có thể mất điện nên tuyệt đối không đi thang máy, phải đi cầu thang bộ thoát hiểm cùng người lớn!",
    choices: [
      {
        id: "a",
        label: "Đi theo lối Cầu Thang Bộ thoát hiểm cùng người lớn",
        emoji: "🪜",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Chui vào Thang Máy bấm nút một mình",
        emoji: "🛗",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Trèo ra ban công nhảy xuống",
        emoji: "⚠️",
        isCorrect: false,
      },
    ],
  },
  {
    id: "sf-fire-5",
    categoryBadge: "🔥 PCCC · Xử Lý Khi Quần Áo Bén Lửa",
    question: "Nếu chẳng may vạt áo bị bén lửa nhỏ, mình cần làm gì ngay để lửa tắt?",
    heroImage: "/assets/stickers/careers/career_16.webp",
    explainSuccess: "Tuyệt vời! Dừng lại, nằm xuống đất, hai tay che mặt và lăn qua lăn lại sẽ làm lửa tắt ngay!",
    choices: [
      {
        id: "a",
        label: "Dừng lại, nằm xuống đất lấy tay che mặt rồi lăn qua lăn lại",
        emoji: "🛡️",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Chạy thật nhanh quanh sân cho gió thổi bùng lửa to hơn",
        emoji: "💨",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Giấu không nói cho người lớn biết",
        emoji: "🤫",
        isCorrect: false,
      },
    ],
  },

  // --- CHỦ ĐỀ 2: KHI BỊ THƯƠNG / CHẢY MÁU / BỎNG NHẸ & SƠ CỨU ---
  {
    id: "sf-aid-1",
    categoryBadge: "🩹 Sơ Cứu · Khi Bị Trầy Xước Tay Chân",
    question: "Khi Nấm chẳng may bị ngã trầy xước da hoặc đứt tay chảy máu nhẹ, Nấm nên làm gì?",
    heroImage: "/assets/stickers/careers/career_02.webp",
    explainSuccess: "Đúng rồi! Báo ngay cho bố mẹ hoặc cô giáo để rửa vết thương bằng nước sạch, sát khuẩn nhẹ và dán băng cá nhân nhé!",
    choices: [
      {
        id: "a",
        label: "Báo bố mẹ/cô giáo rửa bằng nước sạch và dán băng cá nhân",
        emoji: "🩹",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Lấy đất cát hoặc tay bẩn chà lên vết thương",
        emoji: "🦠",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Giấu đi không nói với ai cả",
        emoji: "🙈",
        isCorrect: false,
      },
    ],
  },
  {
    id: "sf-aid-2",
    categoryBadge: "🩹 Sơ Cứu · Khi Bị Bỏng Nước Nóng Nhẹ",
    question: "Nếu tay vô tình chạm vào bát canh nóng bị đỏ rát nhẹ, việc đầu tiên cần làm ngay là gì?",
    heroImage: "/assets/stickers/careers/career_15.webp",
    explainSuccess: "Chính xác! Xả ngay vết bỏng dưới vòi nước mát sạch khoảng 10–15 phút để làm dịu vết bỏng và báo cho người lớn nhé!",
    choices: [
      {
        id: "a",
        label: "Xả ngay tay dưới vòi nước mát sạch và gọi bố mẹ",
        emoji: "🚰",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Lấy kem đánh răng hoặc nước mắm bôi lên vết bỏng",
        emoji: "❌",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Chà mạnh vào chỗ bị bỏng",
        emoji: "😖",
        isCorrect: false,
      },
    ],
  },
  {
    id: "sf-aid-3",
    categoryBadge: "🩹 Sơ Cứu · Khi Bị Chảy Máu Cam",
    question: "Khi tự nhiên bị chảy máu cam ở mũi, Nấm nên ngồi như thế nào cho đúng cách?",
    heroImage: "/assets/stickers/careers/career_15.webp",
    explainSuccess: "Rất chuẩn! Khi chảy máu cam, mình ngồi hơi cúi đầu về phía trước và bóp nhẹ hai cánh mũi, không ngửa cổ ra sau nhé!",
    choices: [
      {
        id: "a",
        label: "Ngồi hơi cúi đầu về trước, bóp nhẹ hai cánh mũi và báo người lớn",
        emoji: "👩‍⚕️",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Ngửa cổ thật cao ra sau cho máu chảy xuống họng",
        emoji: "🚫",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Vừa chạy nhảy vừa ngoáy mũi mạnh",
        emoji: "🏃",
        isCorrect: false,
      },
    ],
  },
  {
    id: "sf-aid-4",
    categoryBadge: "🚑 Số Điện Thoại Cấp Cứu Y Tế",
    question: "Khi có người bị thương nặng hoặc ốm ngất xỉu cần gọi Xe Cứu Thương & Bác Sĩ, mình gọi số mấy?",
    heroImage: "/assets/items/vehicles/vehicle_13.webp",
    explainSuccess: "Hoan hô Nấm! Số 115 là số gọi Xe Cứu Thương và Bác Sĩ cấp cứu y tế!",
    choices: [
      {
        id: "a",
        label: "Số 115 — Gọi Xe Cứu Thương & Bác Sĩ",
        emoji: "🚑",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Số 123 — Gọi cửa hàng đồ chơi",
        emoji: "🧸",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Không gọi cho ai hết",
        emoji: "😶",
        isCorrect: false,
      },
    ],
  },
  {
    id: "sf-aid-5",
    categoryBadge: "🩹 Sơ Cứu · Khi Bị Muỗi Hoặc Côn Trùng Đốt",
    question: "Khi bị muỗi hoặc kiến đốt sưng ngứa trên tay, Nấm nên làm gì?",
    heroImage: "/assets/stickers/careers/career_02.webp",
    explainSuccess: "Đúng rồi! Không dùng móng tay gãi trầy da, hãy rửa sạch và nhờ mẹ bôi kem dịu vết đốt nhé!",
    choices: [
      {
        id: "a",
        label: "Rửa sạch bằng nước mát và nhờ mẹ bôi thuốc dịu vết đốt",
        emoji: "🧴",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Dùng móng tay cào gãi thật mạnh cho chảy máu",
        emoji: "💅",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Lấy bút mực tô kín lên nốt muỗi đốt",
        emoji: "🖊️",
        isCorrect: false,
      },
    ],
  },

  // --- CHỦ ĐỀ 3: AN TOÀN ĐIỆN, BẾP NÓNG & ĐỒ SẮC NHỌN ---
  {
    id: "sf-home-1",
    categoryBadge: "⚡ An Toàn Điện Trong Nhà",
    question: "Khi nhìn thấy ổ cắm điện trên tường, Nấm cần nhớ quy tắc an toàn nào?",
    heroImage: "/assets/nam-stickers/nam-study-think.webp",
    explainSuccess: "Tuyệt đối nhớ nhé! Điện rất nguy hiểm, không bao giờ thọc ngón tay hay que sắt, đồ chơi vào ổ điện!",
    choices: [
      {
        id: "a",
        label: "Tuyệt đối không chạm hay thọc ngón tay, đồ vật vào ổ điện",
        emoji: "⚡",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Cầm que sắt hoặc đũa chọc thử vào lỗ ổ điện",
        emoji: "🚫",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Đổ nước vào ổ cắm điện",
        emoji: "💧",
        isCorrect: false,
      },
    ],
  },
  {
    id: "sf-home-2",
    categoryBadge: "⚡ Tay Ướt & Thiết Bị Điện",
    question: "Khi hai bàn tay vừa rửa xong còn đang ướt sũng nước, Nấm có được cắm hoặc rút phích điện không?",
    heroImage: "/assets/items/home/home_10.webp",
    explainSuccess: "Chuẩn xác! Nước dẫn điện rất nguy hiểm, phải lau thật khô tay và nhờ bố mẹ cắm điện giúp nhé!",
    choices: [
      {
        id: "a",
        label: "Không chạm tay ướt vào ổ điện; phải lau khô tay và nhờ bố mẹ",
        emoji: "🧻",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Cứ để tay ướt sũng tự rút dây điện",
        emoji: "💦",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Vẩy nước vào quạt điện đang quay",
        emoji: "🪭",
        isCorrect: false,
      },
    ],
  },
  {
    id: "sf-home-3",
    categoryBadge: "✂️ An Toàn Khi Dùng Kéo & Đũa",
    question: "Khi Nấm dùng kéo cắt giấy thủ công hoặc cầm đũa, thìa, Nấm cần ngồi như thế nào?",
    heroImage: "/assets/nam-stickers/nam-routine-craft.webp",
    explainSuccess: "Đúng rồi! Khi cầm kéo hay đũa phải ngồi ngay ngắn tại bàn, tuyệt đối không vừa cầm vật nhọn vừa chạy nhảy nhé!",
    choices: [
      {
        id: "a",
        label: "Ngồi ngay ngắn tại bàn, không cầm kéo hay đũa vừa đi vừa chạy",
        emoji: "🪑",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Cầm kéo nhọn chạy đuổi nhau quanh phòng",
        emoji: "🏃",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Dùng kéo cắt quần áo và rèm cửa",
        emoji: "✂️",
        isCorrect: false,
      },
    ],
  },
  {
    id: "sf-home-4",
    categoryBadge: "🍲 An Toàn Trong Nhà Bếp",
    question: "Khi mẹ đang đun nồi canh sôi hoặc ấm nước nóng trên bếp, Nấm nên làm gì?",
    heroImage: "/assets/stickers/careers/career_18.webp",
    explainSuccess: "Giỏi lắm! Nồi nước đang sôi rất bỏng, Nấm phải đứng tránh xa bếp nóng và không tự ý chạm vào nồi nhé!",
    choices: [
      {
        id: "a",
        label: "Đứng tránh xa bếp nóng và không tự ý chạm vào nồi đang sôi",
        emoji: "🛡️",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Kiễng chân thò tay mở vung nồi nước đang sôi",
        emoji: "♨️",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Tự ý vặn bật bếp ga nghịch lửa",
        emoji: "🔥",
        isCorrect: false,
      },
    ],
  },
  {
    id: "sf-home-5",
    categoryBadge: "🧸 An Toàn Với Vật Nhỏ (Bi, Đồng Xu, Hạt)",
    question: "Khi chơi các viên bi nhỏ, đồng xu hoặc mảnh ghép đồ chơi tí hon, điều gì tuyệt đối không được làm?",
    heroImage: "/assets/nam-stickers/nam-routine-game.webp",
    explainSuccess: "Chính xác! Không bao giờ ngậm đồ chơi nhỏ vào miệng hay nhét vào mũi, tai vì rất dễ bị hóc nghẹn!",
    choices: [
      {
        id: "a",
        label: "Không ngậm vào miệng hay nhét vào mũi, tai để tránh bị hóc",
        emoji: "✅",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Cho viên bi vào miệng ngậm như kẹo",
        emoji: "🚫",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Nhét hạt nhỏ vào lỗ mũi hoặc lỗ tai",
        emoji: "⚠️",
        isCorrect: false,
      },
    ],
  },

  // --- CHỦ ĐỀ 4: PHÒNG CHỐNG NGƯỜI LẠ & XỬ LÝ KHI ĐI LẠC ---
  {
    id: "sf-stranger-1",
    categoryBadge: "🚨 Cảnh Giác Với Người Lạ",
    question: "Nếu một người lạ mặt cho Nấm kẹo và rủ: 'Đi theo chú/cô ra xe lấy đồ chơi nhé!', Nấm làm gì?",
    heroImage: "/assets/stickers/careers/career_06.webp",
    explainSuccess: "Nấm thông minh lắm! Tuyệt đối không nhận quà hay đi theo người lạ, hãy lắc đầu từ chối và chạy về phía bố mẹ/cô giáo!",
    choices: [
      {
        id: "a",
        label: "Lắc đầu từ chối 'Cháu không đi đâu ạ!' và chạy về phía bố mẹ, cô giáo",
        emoji: "🙅‍♂️",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Cầm kẹo rồi đi theo người lạ ra chỗ vắng",
        emoji: "🍬",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Leo lên xe của người lạ ngay",
        emoji: "🚗",
        isCorrect: false,
      },
    ],
  },
  {
    id: "sf-stranger-2",
    categoryBadge: "🛍️ Xử Lý Khi Bị Lạc Ở Siêu Thị",
    question: "Nếu chẳng may bị lạc bố mẹ trong siêu thị hoặc trung tâm thương mại, Nấm nên làm gì?",
    heroImage: "/assets/stickers/careers/career_06.webp",
    explainSuccess: "Đúng rồi! Bình tĩnh đứng yên ở quầy sáng và nhờ chú bảo vệ hoặc cô thu ngân mặc đồng phục gọi điện cho bố mẹ!",
    choices: [
      {
        id: "a",
        label: "Đứng yên và nhờ chú bảo vệ hoặc cô thu ngân gọi điện cho bố mẹ",
        emoji: "👮",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Chạy một mình ra ngoài đường lớn tìm bố mẹ",
        emoji: "🛣️",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Đi theo một người lạ mặt ra bãi để xe",
        emoji: "🚫",
        isCorrect: false,
      },
    ],
  },
  {
    id: "sf-stranger-3",
    categoryBadge: "🏠 An Toàn Khi Ở Nhà",
    question: "Khi ở trong nhà mà có người lạ gõ cửa bảo 'Mở cửa cho chú vào nhờ một chút', Nấm làm gì?",
    heroImage: "/assets/nam-stickers/nam-routine-hello.webp",
    explainSuccess: "Chính xác! Tuyệt đối không tự ý mở cửa cho người lạ, hãy giữ cửa khóa và vào báo ngay cho bố mẹ/ông bà!",
    choices: [
      {
        id: "a",
        label: "Không tự mở cửa cho người lạ, vào báo ngay cho bố mẹ/người lớn trong nhà",
        emoji: "🔒",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Mở toang cửa mời người lạ vào nhà ngay",
        emoji: "🚪",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Đưa chìa khóa nhà cho người lạ",
        emoji: "🔑",
        isCorrect: false,
      },
    ],
  },
  {
    id: "sf-stranger-4",
    categoryBadge: "🚓 Số Điện Thoại Công An Cảnh Sát",
    question: "Số điện thoại khẩn cấp để gọi các chú Công An / Cảnh Sát khi gặp kẻ xấu hoặc nguy hiểm là số mấy?",
    heroImage: "/assets/items/vehicles/vehicle_12.webp",
    explainSuccess: "Giỏi quá! Số 113 là số gọi các chú Công An Cảnh Sát bảo vệ an ninh!",
    choices: [
      {
        id: "a",
        label: "Số 113 — Gọi các chú Công An / Cảnh Sát",
        emoji: "🚓",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Số 555 — Gọi rạp chiếu phim",
        emoji: "🎬",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Số 888 — Gọi tiệm kem",
        emoji: "🍦",
        isCorrect: false,
      },
    ],
  },
  {
    id: "sf-stranger-5",
    categoryBadge: "📞 Thông Tin Quan Trọng Bé Cần Nhớ",
    question: "Để các chú công an hoặc bảo vệ giúp Nấm liên lạc với gia đình khi đi lạc, Nấm cần thuộc lòng điều gì?",
    heroImage: "/assets/nam-stickers/nam-study-100pts.webp",
    explainSuccess: "Chuẩn luôn! Thuộc lòng họ tên của mình, tên bố mẹ và số điện thoại của bố mẹ là kỹ năng cực kỳ quan trọng!",
    choices: [
      {
        id: "a",
        label: "Thuộc họ tên của con, tên bố mẹ và số điện thoại của bố mẹ",
        emoji: "📱",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Chỉ cần nhớ tên bộ phim hoạt hình yêu thích",
        emoji: "📺",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Chỉ cần nhớ màu sắc của đôi giày đang đi",
        emoji: "👟",
        isCorrect: false,
      },
    ],
  },

  // --- CHỦ ĐỀ 5: AN TOÀN GIAO THÔNG & THƯỜNG THỨC SỨC KHỎE ---
  {
    id: "sf-traffic-1",
    categoryBadge: "🚦 An Toàn Khi Qua Đường",
    question: "Khi đi bộ qua đường ở ngã tư, Nấm cần đi như thế nào để an toàn nhất?",
    heroImage: "/assets/nam-stickers/nam-routine-school-run.webp",
    explainSuccess: "Đúng rồi! Luôn nắm tay người lớn, chờ đèn Xanh cho người đi bộ bật sáng và đi trên vạch kẻ trắng qua đường nhé!",
    choices: [
      {
        id: "a",
        label: "Nắm tay người lớn, đợi đèn Xanh và đi đúng trên vạch kẻ trắng",
        emoji: "🟢",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Vừa đá bóng vừa tự chạy băng qua đường khi đèn Đỏ",
        emoji: "🔴",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Nhắm mắt chạy vọt qua trước đầu xe đang đi",
        emoji: "⚠️",
        isCorrect: false,
      },
    ],
  },
  {
    id: "sf-traffic-2",
    categoryBadge: "🛵 Đội Mũ Bảo Hiểm Khi Đi Xe",
    question: "Khi ngồi trên xe máy hoặc xe đạp điện cùng bố mẹ, Nấm cần làm gì để bảo vệ vùng đầu?",
    heroImage: "/assets/items/vehicles/vehicle_04.webp",
    explainSuccess: "Chính xác! Đội mũ bảo hiểm vừa vặn và cài quai chắc chắn mỗi khi ngồi trên xe máy nhé!",
    choices: [
      {
        id: "a",
        label: "Đội mũ bảo hiểm vừa vặn, cài quai chắc chắn và ngồi ngay ngắn",
        emoji: "ヘルメット",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Đứng nhún nhảy trên yên xe máy",
        emoji: "🚫",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Treo mũ bảo hiểm ở tay lái, không cần đội",
        emoji: "❌",
        isCorrect: false,
      },
    ],
  },
  {
    id: "sf-traffic-3",
    categoryBadge: "🚗 An Toàn Khi Ngồi Ô Tô & Xe Buýt",
    question: "Khi đang ngồi trong xe ô tô hoặc xe buýt đang chạy trên đường, Nấm cần nhớ quy tắc nào?",
    heroImage: "/assets/items/vehicles/vehicle_02.webp",
    explainSuccess: "Rất giỏi! Ngồi yên thắt dây an toàn, tuyệt đối không thò đầu hay thò tay ra ngoài cửa sổ xe đang chạy!",
    choices: [
      {
        id: "a",
        label: "Thắt dây an toàn, không bao giờ thò đầu hay tay ra ngoài cửa sổ xe",
        emoji: "💺",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Thò cả đầu và hai tay ra ngoài cửa sổ ô tô hóng gió",
        emoji: "🪟",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Mở chốt cửa xe khi xe đang chạy nhanh",
        emoji: "⚠️",
        isCorrect: false,
      },
    ],
  },
  {
    id: "sf-traffic-4",
    categoryBadge: "⛈️ An Toàn Khi Trời Mưa Giông Sấm Chớp",
    question: "Khi đang chơi ngoài sân mà trời nổi cơn giông, có sấm chớp đùng đoàng, mình cần làm gì?",
    heroImage: "/assets/nam-stickers/nam-sub-nature.webp",
    explainSuccess: "Đúng rồi! Khi có giông sét phải đi ngay vào trong nhà an toàn, không đứng trú dưới gốc cây to đơn độc ngoài bãi trống!",
    choices: [
      {
        id: "a",
        label: "Đi ngay vào trong nhà kiên cố, không đứng dưới gốc cây to ngoài bãi trống",
        emoji: "🏠",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Đứng dưới cái cây cao nhất giữa cánh đồng cầm que sắt",
        emoji: "⚡",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Nhảy xuống hồ bơi tắm khi trời đang sấm sét",
        emoji: "🏊",
        isCorrect: false,
      },
    ],
  },
  {
    id: "sf-traffic-5",
    categoryBadge: "🧼 Vệ Sinh Phòng Bệnh Hàng Ngày",
    question: "Để đôi bàn tay sạch vi khuẩn và bụng không bị đau, Nấm cần rửa tay bằng xà phòng vào lúc nào?",
    heroImage: "/assets/stickers/careers/career_01.webp",
    explainSuccess: "Hoan hô Nấm ngoan! Luôn rửa tay bằng xà phòng trước khi ăn, sau khi đi vệ sinh và sau khi chơi đồ chơi nhé!",
    choices: [
      {
        id: "a",
        label: "Trước khi ăn, sau khi đi vệ sinh và sau khi đi chơi về",
        emoji: "🧼",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Vừa nghịch đất cát xong bốc bánh ăn luôn không cần rửa",
        emoji: "🦠",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Chỉ cần lau tay vào quần áo là sạch",
        emoji: "👕",
        isCorrect: false,
      },
    ],
  },
];

function shuffleWithoutNaturalOrder<
  T extends { isCorrect?: boolean; order?: number },
>(items: T[]): T[] {
  const base = [...items];
  for (let attempt = 0; attempt < 16; attempt++) {
    for (let i = base.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [base[i], base[j]] = [base[j], base[i]];
    }
    if (
      base.length === 5 &&
      base[0]?.isCorrect &&
      base[1]?.isCorrect &&
      base[2]?.isCorrect
    ) {
      continue;
    }
    if (
      base.length === 3 &&
      base[0]?.order === 1 &&
      base[1]?.order === 2 &&
      base[2]?.order === 3
    ) {
      continue;
    }
    break;
  }
  return base;
}

export function LifeSkillsActivity({
  soundEnabled,
  onComplete,
  onLessonIndexChange,
}: ActivityProps) {
  const speech = useSpeech(soundEnabled);

  const [viewMode, setViewMode] = useState<"menu" | "game">("menu");
  const [mode, setMode] = useState<"cooking" | "habits" | "safety">("cooking");
  const [recipeIdx, setRecipeIdx] = useState(0);
  const [habitIdx, setHabitIdx] = useState(0);
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  // Trạng thái Cooking Studio 3 bước
  const [cookingStep, setCookingStep] = useState<1 | 2 | 3>(1);
  const [selectedIngIds, setSelectedIngIds] = useState<string[]>([]);
  const [preppedIngIds, setPreppedIngIds] = useState<string[]>([]);
  const [wrongIngId, setWrongIngId] = useState<string | null>(null);
  const [dishCooked, setDishCooked] = useState(false);

  // Trạng thái Bé Tự Lập 2 Chặng
  const [habitStage, setHabitStage] = useState<1 | 2>(1);
  const [pickedToolIds, setPickedToolIds] = useState<string[]>([]);
  const [wrongToolId, setWrongToolId] = useState<string | null>(null);
  const [completedStepOrders, setCompletedStepOrders] = useState<number[]>([]);
  const [wrongStepId, setWrongStepId] = useState<string | null>(null);

  // Trạng thái Thường Thức & An Toàn (5 câu / lượt không trùng lặp)
  const [safetyDeck, setSafetyDeck] = useState<SafetyCommonSenseQuestion[]>(() =>
    drawNonRepeatingItems(
      "lifeskills:safety:v1",
      SAFETY_COMMON_SENSE_POOL,
      SAFETY_QUESTIONS_PER_ROUND,
      (q) => q.id,
    ),
  );
  const [safetyIdx, setSafetyIdx] = useState(0);
  const [safetyAnswered, setSafetyAnswered] = useState(false);
  const [wrongSafetyChoiceId, setWrongSafetyChoiceId] = useState<string | null>(
    null,
  );

  const [attempts, setAttempts] = useState(1);
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [showDoraemonClockClip, setShowDoraemonClockClip] = useState(false);

  const currentRecipe = COOKING_RECIPES[recipeIdx] || COOKING_RECIPES[0];
  const currentHabit = DAILY_HABITS[habitIdx] || DAILY_HABITS[0];
  const currentSafetyQ = safetyDeck[safetyIdx] || safetyDeck[0] || SAFETY_COMMON_SENSE_POOL[0];

  const shuffledSafetyChoices = useMemo(
    () => shuffleWithoutNaturalOrder(currentSafetyQ.choices),
    [currentSafetyQ, shuffleSeed],
  );

  const shuffledIngredients = useMemo(
    () => shuffleWithoutNaturalOrder(currentRecipe.ingredients),
    [currentRecipe, shuffleSeed],
  );

  const shuffledHabitTools = useMemo(
    () => shuffleWithoutNaturalOrder(currentHabit.prepTools),
    [currentHabit, shuffleSeed],
  );

  const shuffledHabitSteps = useMemo(
    () => shuffleWithoutNaturalOrder(currentHabit.steps),
    [currentHabit, shuffleSeed],
  );

  useEffect(() => {
    onLessonIndexChange?.(1);
  }, [onLessonIndexChange]);

  // Nạp sẵn 6 câu lệnh ngắn phổ quát vào RAM ngay khi mở môn Kỹ năng sống
  useEffect(() => {
    if (!soundEnabled) return;
    Object.values(UNIVERSAL_PROMPTS).forEach((line) => {
      void prefetchSpeech(line, "vi-VN");
    });
  }, [soundEnabled]);

  const resetCookingState = () => {
    setCookingStep(1);
    setSelectedIngIds([]);
    setPreppedIngIds([]);
    setWrongIngId(null);
    setDishCooked(false);
    setAttempts(1);
    setShuffleSeed((s) => s + 1);
  };

  const resetHabitState = () => {
    setHabitStage(1);
    setPickedToolIds([]);
    setWrongToolId(null);
    setCompletedStepOrders([]);
    setWrongStepId(null);
    setAttempts(1);
    setShuffleSeed((s) => s + 1);
  };

  const startNewSafetyRound = (firstQuestionId?: string) => {
    const drawn = drawNonRepeatingItems(
      "lifeskills:safety:v1",
      SAFETY_COMMON_SENSE_POOL,
      SAFETY_QUESTIONS_PER_ROUND,
      (q) => q.id,
    );
    let finalDeck = drawn;
    if (firstQuestionId) {
      const targetQ = SAFETY_COMMON_SENSE_POOL.find(
        (q) => q.id === firstQuestionId,
      );
      if (targetQ) {
        const others = drawn.filter((q) => q.id !== targetQ.id);
        finalDeck = [targetQ, ...others].slice(0, SAFETY_QUESTIONS_PER_ROUND);
      }
    }
    setSafetyDeck(finalDeck);
    setSafetyIdx(0);
    setSafetyAnswered(false);
    setWrongSafetyChoiceId(null);
    setAttempts(1);
    setShuffleSeed((s) => s + 1);
    setMode("safety");
    setViewMode("game");
    if (finalDeck[0]) {
      speech.speak(finalDeck[0].question, "vi-VN");
    }
  };

  const handleOpenCookingRecipe = (idx: number) => {
    setMode("cooking");
    setRecipeIdx(idx);
    resetCookingState();
    setViewMode("game");
    speech.speak(UNIVERSAL_PROMPTS.cookStep1, "vi-VN");
  };

  const handleOpenHabitQuest = (idx: number) => {
    setMode("habits");
    setHabitIdx(idx);
    resetHabitState();
    setViewMode("game");
    speech.speak(UNIVERSAL_PROMPTS.habitStage1, "vi-VN");
  };

  const handleSelectSafetyChoice = (choice: SafetyChoice) => {
    if (safetyAnswered) return;
    if (!choice.isCorrect) {
      setAttempts((a) => a + 1);
      setWrongSafetyChoiceId(choice.id);
      playWrongBuzzSound();
      window.setTimeout(() => setWrongSafetyChoiceId(null), 650);
      return;
    }
    playCorrectDingSound();
    playRewardTone();
    setSafetyAnswered(true);
    setCompletedIds((prev) =>
      prev.includes(currentSafetyQ.id) ? prev : [...prev, currentSafetyQ.id],
    );
    speech.speak(currentSafetyQ.explainSuccess, "vi-VN");
  };

  const handleNextSafetyQuestion = () => {
    if (safetyIdx + 1 < safetyDeck.length) {
      const nextIdx = safetyIdx + 1;
      setSafetyIdx(nextIdx);
      setSafetyAnswered(false);
      setWrongSafetyChoiceId(null);
      setShuffleSeed((s) => s + 1);
      if (safetyDeck[nextIdx]) {
        speech.speak(safetyDeck[nextIdx].question, "vi-VN");
      }
    }
  };

  const isSafetyRoundFinished =
    mode === "safety" &&
    safetyIdx === safetyDeck.length - 1 &&
    safetyAnswered;

  const pickedIngredients = selectedIngIds
    .map((id) => currentRecipe.ingredients.find((ing) => ing.id === id))
    .filter((ing): ing is IngredientOption => Boolean(ing));

  const pickedHabitTools = pickedToolIds
    .map((id) => currentHabit.prepTools.find((t) => t.id === id))
    .filter((t): t is HabitPrepTool => Boolean(t));

  // ==========================================================================
  // HANDLERS: ĐẦU BẾP NHÍ (CHỈ DÙNG TIẾNG "TINH!" / "TÈNG!" 0ms)
  // ==========================================================================
  const handleSelectIngredient = (ing: IngredientOption) => {
    if (dishCooked) return;

    if (!ing.isCorrect) {
      setAttempts((a) => a + 1);
      setWrongIngId(ing.id);
      playWrongBuzzSound();
      window.setTimeout(() => setWrongIngId(null), 650);
      return;
    }

    if (selectedIngIds.includes(ing.id)) return;
    playCorrectDingSound();
    const next = [...selectedIngIds, ing.id];
    setSelectedIngIds(next);

    if (next.length === 3) {
      playRewardTone();
      speech.speak(UNIVERSAL_PROMPTS.cookStep2, "vi-VN");
      window.setTimeout(() => {
        setCookingStep(2);
      }, 420);
    }
  };

  const handlePrepIngredient = (ing: IngredientOption) => {
    if (preppedIngIds.includes(ing.id)) return;
    playCorrectDingSound();
    const next = [...preppedIngIds, ing.id];
    setPreppedIngIds(next);

    if (next.length === 3) {
      playRewardTone();
      speech.speak(UNIVERSAL_PROMPTS.cookStep3, "vi-VN");
      window.setTimeout(() => {
        setCookingStep(3);
      }, 420);
    }
  };

  const handleCookAndPlateDish = () => {
    if (selectedIngIds.length < 3 || preppedIngIds.length < 3 || dishCooked)
      return;
    playRewardTone();
    setDishCooked(true);
    setCompletedIds((prev) =>
      prev.includes(currentRecipe.id) ? prev : [...prev, currentRecipe.id],
    );
    speech.speak(UNIVERSAL_PROMPTS.completed, "vi-VN");
  };

  // ==========================================================================
  // HANDLERS: BÉ TỰ LẬP (CHỈ DÙNG TIẾNG "TINH!" / "TÈNG!" 0ms)
  // ==========================================================================
  const handleSelectHabitTool = (tool: HabitPrepTool) => {
    if (!tool.isCorrect) {
      setAttempts((a) => a + 1);
      setWrongToolId(tool.id);
      playWrongBuzzSound();
      window.setTimeout(() => setWrongToolId(null), 650);
      return;
    }

    if (pickedToolIds.includes(tool.id)) return;
    playCorrectDingSound();
    const next = [...pickedToolIds, tool.id];
    setPickedToolIds(next);

    if (next.length === 3) {
      playRewardTone();
      speech.speak(UNIVERSAL_PROMPTS.habitStage2, "vi-VN");
      window.setTimeout(() => {
        setHabitStage(2);
      }, 450);
    }
  };

  const handleSelectHabitSequenceStep = (step: HabitSequenceStep) => {
    if (completedStepOrders.includes(step.order)) return;

    const expectedOrder = completedStepOrders.length + 1;
    if (step.order === expectedOrder) {
      playCorrectDingSound();
      const next = [...completedStepOrders, step.order];
      setCompletedStepOrders(next);

      if (next.length === 3) {
        playRewardTone();
        setCompletedIds((prev) =>
          prev.includes(currentHabit.id) ? prev : [...prev, currentHabit.id],
        );
        speech.speak(UNIVERSAL_PROMPTS.completed, "vi-VN");
      }
    } else {
      setAttempts((a) => a + 1);
      setWrongStepId(step.id);
      playWrongBuzzSound();
      window.setTimeout(() => setWrongStepId(null), 650);
    }
  };

  const isHabitFinished =
    habitStage === 2 && completedStepOrders.length === currentHabit.steps.length;

  const currentUniversalPrompt =
    mode === "safety"
      ? safetyAnswered
        ? currentSafetyQ.explainSuccess
        : currentSafetyQ.question
      : mode === "cooking"
        ? cookingStep === 1
          ? UNIVERSAL_PROMPTS.cookStep1
          : cookingStep === 2
            ? UNIVERSAL_PROMPTS.cookStep2
            : dishCooked
              ? UNIVERSAL_PROMPTS.completed
              : UNIVERSAL_PROMPTS.cookStep3
        : habitStage === 1
          ? UNIVERSAL_PROMPTS.habitStage1
          : isHabitFinished
            ? UNIVERSAL_PROMPTS.completed
            : UNIVERSAL_PROMPTS.habitStage2;

  // ==========================================================================
  // MÀN HÌNH 1: MENU CHỌN BÀI (TRỰC QUAN, ÍT CHỮ)
  // ==========================================================================
  if (viewMode === "menu") {
    return (
      <div className="lifeskills-studio-stage lifeskills-open-board">
        <div className="reading-level-header single-row-level-bar">
          <div className="level-tabs-group">
            <button
              type="button"
              className={`level-tab-btn ${mode === "cooking" ? "active" : ""}`}
              onClick={() => setMode("cooking")}
            >
              <ChefHat size={15} />
              <strong>🍳 Đầu Bếp Nhí ({COOKING_RECIPES.length})</strong>
            </button>
            <button
              type="button"
              className={`level-tab-btn ${mode === "habits" ? "active" : ""}`}
              onClick={() => setMode("habits")}
            >
              <Sparkles size={15} />
              <strong>🌱 Bé Tự Lập ({DAILY_HABITS.length})</strong>
            </button>
            <button
              type="button"
              className={`level-tab-btn ${mode === "safety" ? "active" : ""}`}
              onClick={() => setMode("safety")}
            >
              <ShieldCheck size={15} />
              <strong>
                🛡️ Thường Thức &amp; An Toàn ({SAFETY_COMMON_SENSE_POOL.length})
              </strong>
            </button>
            <button
              type="button"
              className="level-tab-btn active"
              style={{
                background: "linear-gradient(135deg, #0284C7 0%, #38BDF8 100%)",
                color: "#FFFFFF",
                border: "2px solid #FFFFFF",
                boxShadow: "0 6px 16px rgba(2, 132, 199, 0.32)",
              }}
              onClick={() => {
                speech.stop();
                setShowDoraemonClockClip(true);
              }}
            >
              <strong>🎬 Doraemon Dạy Xem Đồng Hồ</strong>
            </button>
          </div>
        </div>

        {mode === "safety" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              background: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
              border: "3px solid #F59E0B",
              borderRadius: 20,
              padding: "10px 16px",
              marginBottom: 8,
            }}
          >
            <div>
              <strong style={{ fontSize: 16, color: "#92400E" }}>
                🛡️ Thử Thách 5 Tình Huống An Toàn &amp; Thường Thức (Không Trùng Lặp)
              </strong>
              <p style={{ margin: "2px 0 0", fontSize: 13, color: "#B45309", fontWeight: 700 }}>
                Cháy nổ PCCC (114) · Bị thương &amp; Sơ cứu (115) · Người lạ (113) · An toàn điện &amp; Giao thông
              </p>
            </div>
            <button
              type="button"
              className="chunky-btn chunky-gold btn-sm"
              onClick={() => startNewSafetyRound()}
            >
              🎲 Bắt Đầu 5 Câu Mới!
            </button>
          </div>
        )}

        <div className="lifeskills-menu-grid">
          {mode === "cooking"
            ? COOKING_RECIPES.map((rcp, idx) => {
                const isDone = completedIds.includes(rcp.id);
                return (
                  <button
                    key={rcp.id}
                    type="button"
                    className={`lifeskills-menu-card ${isDone ? "done" : ""}`}
                    onClick={() => handleOpenCookingRecipe(idx)}
                  >
                    <div className="ls-menu-card-visual">
                      <img
                        src={rcp.platedImageUrl}
                        alt={rcp.shortTitle}
                        className="ls-menu-3d-img"
                        draggable={false}
                      />
                    </div>
                    <strong className="ls-menu-card-title">
                      {rcp.shortTitle}
                    </strong>
                    {isDone && <span className="ls-menu-done-badge">✓</span>}
                  </button>
                );
              })
            : mode === "habits"
              ? DAILY_HABITS.map((hb, idx) => {
                  const isDone = completedIds.includes(hb.id);
                  return (
                    <button
                      key={hb.id}
                      type="button"
                      className={`lifeskills-menu-card habit-variant ${
                        isDone ? "done" : ""
                      }`}
                      onClick={() => handleOpenHabitQuest(idx)}
                    >
                      <div className="ls-menu-card-visual">
                        <img
                          src={hb.heroImageUrl}
                          alt={hb.shortTitle}
                          className="ls-menu-3d-img"
                          draggable={false}
                        />
                      </div>
                      <strong className="ls-menu-card-title">
                        {hb.shortTitle}
                      </strong>
                      {isDone && <span className="ls-menu-done-badge">✓</span>}
                    </button>
                  );
                })
              : SAFETY_COMMON_SENSE_POOL.map((sq) => {
                  const isDone = completedIds.includes(sq.id);
                  return (
                    <button
                      key={sq.id}
                      type="button"
                      className={`lifeskills-menu-card habit-variant ${
                        isDone ? "done" : ""
                      }`}
                      onClick={() => startNewSafetyRound(sq.id)}
                    >
                      <div className="ls-menu-card-visual">
                        <img
                          src={sq.heroImage}
                          alt={sq.categoryBadge}
                          className="ls-menu-3d-img"
                          draggable={false}
                        />
                      </div>
                      <strong className="ls-menu-card-title">
                        {sq.categoryBadge}
                      </strong>
                      {isDone && <span className="ls-menu-done-badge">✓</span>}
                    </button>
                  );
                })}
        </div>

        {showDoraemonClockClip && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "rgba(15, 23, 42, 0.82)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
            }}
            onClick={() => setShowDoraemonClockClip(false)}
          >
            <div
              style={{
                width: "min(980px, 95vw)",
                background: "#F8FAFC",
                borderRadius: 28,
                border: "4px solid #38BDF8",
                boxShadow: "0 24px 60px rgba(0, 0, 0, 0.45)",
                padding: 18,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <strong style={{ fontSize: 20, color: "#0369A1" }}>
                  ⏰ Bài Giảng: Doraemon Dạy Bé Xem Đồng Hồ (Giờ Đúng &amp; Giờ Rưỡi)
                </strong>
                <button
                  type="button"
                  className="chunky-btn chunky-blue btn-sm"
                  onClick={() => setShowDoraemonClockClip(false)}
                >
                  ✕ Đóng &amp; Vào Học
                </button>
              </div>
              <video
                src="/videos/doraemon-clock-lesson.mp4"
                controls
                autoPlay
                playsInline
                style={{
                  width: "100%",
                  maxHeight: "74vh",
                  borderRadius: 18,
                  background: "#000",
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================================================
  // MÀN HÌNH 2: 1 MẶT BẢNG LỚN TRỰC QUAN (BỎ HƯỚNG DẪN DÀI DÒNG)
  // ==========================================================================
  return (
    <div className="lifeskills-studio-stage lifeskills-open-board">
      {/* Thanh trên cùng: Chọn bài + Tên ngắn + Các bước + 3 ô đồ đã nhặt + Loa */}
      <div className="lifeskills-top-toolbar">
        <button
          type="button"
          className="back-to-menu-pill"
          onClick={() => setViewMode("menu")}
        >
          <ArrowLeft size={14} /> Chọn bài
        </button>

        <div className="lifeskills-active-title-pill">
          <strong>
            {mode === "cooking"
              ? currentRecipe.shortTitle
              : mode === "habits"
                ? currentHabit.shortTitle
                : `🛡️ Câu ${safetyIdx + 1}/${safetyDeck.length} · ${currentSafetyQ.categoryBadge}`}
          </strong>
        </div>

        {mode === "cooking" ? (
          <div className="cooking-wizard-tabs">
            <button
              type="button"
              className={`cooking-wizard-tab ${
                cookingStep === 1
                  ? "active"
                  : selectedIngIds.length === 3
                    ? "done"
                    : ""
              }`}
              onClick={() => setCookingStep(1)}
            >
              <span>1. Chọn ({selectedIngIds.length}/3)</span>
              {selectedIngIds.length === 3 && <Check size={12} />}
            </button>
            <button
              type="button"
              disabled={selectedIngIds.length < 3}
              className={`cooking-wizard-tab ${
                cookingStep === 2
                  ? "active"
                  : preppedIngIds.length === 3
                    ? "done"
                    : ""
              }`}
              onClick={() => selectedIngIds.length === 3 && setCookingStep(2)}
            >
              <span>2. Sơ chế ({preppedIngIds.length}/3)</span>
              {preppedIngIds.length === 3 && <Check size={12} />}
            </button>
            <button
              type="button"
              disabled={preppedIngIds.length < 3}
              className={`cooking-wizard-tab ${
                cookingStep === 3 ? "active" : dishCooked ? "done" : ""
              }`}
              onClick={() => preppedIngIds.length === 3 && setCookingStep(3)}
            >
              <span>3. Nấu</span>
              {dishCooked && <Check size={12} />}
            </button>
          </div>
        ) : mode === "habits" ? (
          <div className="cooking-wizard-tabs">
            <button
              type="button"
              className={`cooking-wizard-tab ${
                habitStage === 1
                  ? "active"
                  : pickedToolIds.length === 3
                    ? "done"
                    : ""
              }`}
              onClick={() => setHabitStage(1)}
            >
              <span>1. Chuẩn bị ({pickedToolIds.length}/3)</span>
              {pickedToolIds.length === 3 && <Check size={12} />}
            </button>
            <button
              type="button"
              disabled={pickedToolIds.length < 3}
              className={`cooking-wizard-tab ${
                habitStage === 2 ? "active" : isHabitFinished ? "done" : ""
              }`}
              onClick={() => pickedToolIds.length === 3 && setHabitStage(2)}
            >
              <span>2. Thứ tự ({completedStepOrders.length}/3)</span>
              {isHabitFinished && <Check size={12} />}
            </button>
          </div>
        ) : (
          <div className="cooking-wizard-tabs">
            {safetyDeck.map((sq, idx) => {
              const isDone =
                idx < safetyIdx || (idx === safetyIdx && safetyAnswered);
              const isCurrent = idx === safetyIdx;
              return (
                <span
                  key={sq.id}
                  className={`cooking-wizard-tab ${
                    isCurrent ? "active" : isDone ? "done" : ""
                  }`}
                >
                  <span>Câu {idx + 1}</span>
                  {isDone && <Check size={12} />}
                </span>
              );
            })}
          </div>
        )}

        {/* 3 Ô đồ vật vừa chọn hiển thị trực tiếp trên thanh trên cùng */}
        {((mode === "cooking" && !dishCooked) ||
          (mode === "habits" && habitStage === 1)) && (
          <div className="ls-inline-slots-row">
            {[0, 1, 2].map((slotIdx) => {
              if (mode === "cooking") {
                const ing = pickedIngredients[slotIdx];
                const isPrepped = ing && preppedIngIds.includes(ing.id);
                return (
                  <div
                    key={slotIdx}
                    className={`ls-mini-slot ${ing ? "filled" : "empty"}`}
                  >
                    {ing ? (
                      <img
                        src={
                          isPrepped
                            ? ing.preppedImageUrl || ing.imageUrl
                            : ing.imageUrl
                        }
                        alt={ing.name}
                        draggable={false}
                      />
                    ) : (
                      <span>{slotIdx + 1}</span>
                    )}
                  </div>
                );
              }
              const tool = pickedHabitTools[slotIdx];
              return (
                <div
                  key={slotIdx}
                  className={`ls-mini-slot ${tool ? "filled" : "empty"}`}
                >
                  {tool ? (
                    <img src={tool.imageUrl} alt={tool.name} draggable={false} />
                  ) : (
                    <span>{slotIdx + 1}</span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="button"
            className="chunky-btn chunky-pink btn-sm"
            onClick={() => {
              speech.stop();
              setShowDoraemonClockClip(true);
            }}
            title="Xem Clip Doraemon Dạy Xem Đồng Hồ"
          >
            🎬 Clip Xem Giờ
          </button>
          <button
            type="button"
            className="chunky-btn chunky-blue btn-sm lifeskills-speak-btn"
            onClick={() => speech.speak(currentUniversalPrompt, "vi-VN")}
            title="Đọc yêu cầu"
          >
            <Volume2 size={14} />
          </button>
        </div>
      </div>

      {/* Mặt bảng lớn 100% hình ảnh trực quan + nhãn 2-4 chữ */}
      <div className="lifeskills-fullboard-stage">
        {mode === "cooking" ? (
          <>
            {cookingStep === 1 && (
              <div className="cooking-ingredients-grid fullboard-5-cols">
                {shuffledIngredients.map((ing) => {
                  const isPicked = selectedIngIds.includes(ing.id);
                  const isWrong = wrongIngId === ing.id;
                  return (
                    <button
                      key={ing.id}
                      type="button"
                      className={`ingredient-card-btn ${
                        isPicked ? "picked" : ""
                      } ${isWrong ? "wrong-shake" : ""}`}
                      onClick={() => handleSelectIngredient(ing)}
                    >
                      <div className="ing-visual-wrap">
                        <img
                          src={ing.imageUrl}
                          alt={ing.name}
                          className="ing-3d-img"
                          draggable={false}
                        />
                      </div>
                      <span className="ing-name">{ing.name}</span>
                      {isPicked && <span className="ing-check">✓</span>}
                    </button>
                  );
                })}
              </div>
            )}

            {cookingStep === 2 && (
              <div className="cooking-prep-cards-grid fullboard-3-cols">
                {pickedIngredients.map((ing) => {
                  const isPrepped = preppedIngIds.includes(ing.id);
                  const visualSrc = isPrepped
                    ? ing.preppedImageUrl || ing.imageUrl
                    : ing.imageUrl;
                  return (
                    <button
                      key={ing.id}
                      type="button"
                      className={`prep-action-card-btn ${
                        isPrepped ? "prepped-done" : "prep-ready"
                      }`}
                      onClick={() => handlePrepIngredient(ing)}
                    >
                      <div className="prep-card-visual">
                        <img
                          src={visualSrc}
                          alt={ing.name}
                          className="prep-3d-img"
                          draggable={false}
                        />
                      </div>
                      <strong className="prep-ing-name">{ing.name}</strong>
                      <span className="prep-action-pill">
                        {isPrepped
                          ? `✓ ${ing.prepDoneLabel || "Xong"}`
                          : ing.prepActionLabel || "Sơ chế"}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {cookingStep === 3 && (
              <div className="cook-plate-interactive-area fullboard-center-stage">
                {!dishCooked ? (
                  <>
                    <div className="cook-prepped-summary-row">
                      {pickedIngredients.map((ing) => (
                        <div key={ing.id} className="cook-ready-chip">
                          <img
                            src={ing.preppedImageUrl || ing.imageUrl}
                            alt={ing.name}
                            className="cook-chip-3d-img"
                            draggable={false}
                          />
                          <span>{ing.prepDoneLabel || ing.name}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="cook-big-stove-btn"
                      onClick={handleCookAndPlateDish}
                    >
                      <Utensils size={20} />
                      <span>{currentRecipe.cookActionLabel}</span>
                    </button>
                  </>
                ) : (
                  <div className="cooked-dish-plated-banner">
                    <img
                      src={currentRecipe.platedImageUrl}
                      alt={currentRecipe.platedLabel}
                      className="plated-dish-3d-img"
                      draggable={false}
                    />
                    <div className="plated-dish-texts">
                      <strong>{currentRecipe.platedLabel}</strong>
                    </div>
                    <img
                      src={currentRecipe.namSticker}
                      alt="Bé Nấm"
                      className="plated-nam-sticker"
                      draggable={false}
                    />
                  </div>
                )}
              </div>
            )}
          </>
        ) : mode === "habits" ? (
          /* CHẾ ĐỘ 2: BÉ TỰ LẬP (CHẶNG 1 CHUẨN BỊ -> CHẶNG 2 THỨ TỰ 1-2-3) */
          <>
            {habitStage === 1 ? (
              <div className="cooking-ingredients-grid fullboard-5-cols">
                {shuffledHabitTools.map((tool) => {
                  const isPicked = pickedToolIds.includes(tool.id);
                  const isWrong = wrongToolId === tool.id;
                  return (
                    <button
                      key={tool.id}
                      type="button"
                      className={`ingredient-card-btn ${
                        isPicked ? "picked" : ""
                      } ${isWrong ? "wrong-shake" : ""}`}
                      onClick={() => handleSelectHabitTool(tool)}
                    >
                      <div className="ing-visual-wrap">
                        <img
                          src={tool.imageUrl}
                          alt={tool.name}
                          className="ing-3d-img"
                          draggable={false}
                        />
                      </div>
                      <span className="ing-name">{tool.name}</span>
                      {isPicked && <span className="ing-check">✓</span>}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="habit-sequence-stage">
                {/* Hàng trên: 3 Ô Thứ Tự 1 -> 2 -> 3 */}
                <div className="habit-target-slots-row">
                  {[1, 2, 3].map((orderNum) => {
                    const isFilled = completedStepOrders.includes(orderNum);
                    const isCurrentTarget =
                      completedStepOrders.length + 1 === orderNum;
                    const matchedStep = currentHabit.steps.find(
                      (s) => s.order === orderNum,
                    );
                    return (
                      <div
                        key={orderNum}
                        className={`habit-sequence-slot ${
                          isFilled
                            ? "slot-filled"
                            : isCurrentTarget
                              ? "slot-active-target"
                              : "slot-waiting"
                        }`}
                      >
                        <span className="habit-slot-badge">
                          Bước {orderNum}
                        </span>
                        {isFilled && matchedStep ? (
                          <div className="habit-slot-content">
                            <img
                              src={matchedStep.imageUrl}
                              alt={matchedStep.label}
                              className="habit-slot-img"
                              draggable={false}
                            />
                            <strong>{matchedStep.label}</strong>
                          </div>
                        ) : (
                          <span className="habit-slot-placeholder">
                            {isCurrentTarget ? "?" : "..."}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Hàng dưới: 3 Thẻ Hành Động Xáo Trộn (Hình 3D lớn + Nhãn 2-4 chữ) */}
                <div className="habit-shuffled-cards-grid">
                  {shuffledHabitSteps.map((step) => {
                    const isPlaced = completedStepOrders.includes(step.order);
                    const isWrong = wrongStepId === step.id;
                    return (
                      <button
                        key={step.id}
                        type="button"
                        disabled={isPlaced}
                        className={`habit-shuffled-card-btn ${
                          isPlaced ? "placed-done" : ""
                        } ${isWrong ? "wrong-shake" : ""}`}
                        onClick={() => handleSelectHabitSequenceStep(step)}
                      >
                        <div className="habit-card-img-wrap">
                          <img
                            src={step.imageUrl}
                            alt={step.label}
                            className="habit-card-3d-img"
                            draggable={false}
                          />
                        </div>
                        <p className="habit-card-desc">{step.label}</p>
                        {isPlaced && (
                          <span className="habit-card-order-tag">
                            ✓ Bước {step.order}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        ) : (
          /* CHẾ ĐỘ 3: THƯỜNG THỨC & AN TOÀN (5 CÂU HỎI TÌNH HUỐNG TRỰC QUAN) */
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              width: "100%",
              maxWidth: 920,
              margin: "0 auto",
            }}
          >
            {/* Khung câu hỏi + Hình minh họa Bé Nấm / Bác Sĩ / Cảnh Sát */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
                border: "3px solid #60A5FA",
                borderRadius: 24,
                padding: "14px 18px",
                boxShadow: "0 8px 20px rgba(59, 130, 246, 0.14)",
              }}
            >
              <img
                src={currentSafetyQ.heroImage}
                alt={currentSafetyQ.categoryBadge}
                style={{
                  width: 96,
                  height: 96,
                  objectFit: "contain",
                  background: "#FFFFFF",
                  borderRadius: 20,
                  padding: 6,
                  border: "2px solid #93C5FD",
                  flexShrink: 0,
                }}
                draggable={false}
              />
              <div style={{ flex: 1 }}>
                <span
                  style={{
                    display: "inline-block",
                    background: "#2563EB",
                    color: "#FFFFFF",
                    fontSize: 12,
                    fontWeight: 800,
                    padding: "3px 10px",
                    borderRadius: 999,
                    marginBottom: 6,
                  }}
                >
                  {currentSafetyQ.categoryBadge}
                </span>
                <div
                  style={{
                    fontSize: 19,
                    fontWeight: 900,
                    color: "#1E3A8A",
                    lineHeight: 1.35,
                  }}
                >
                  {currentSafetyQ.question}
                </div>
              </div>
              <button
                type="button"
                className="chunky-btn chunky-blue btn-sm"
                onClick={() => speech.speak(currentSafetyQ.question, "vi-VN")}
                title="Nghe câu hỏi"
              >
                <Volume2 size={16} /> Nghe
              </button>
            </div>

            {/* 3 Phương án lựa chọn */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: 12,
              }}
            >
              {shuffledSafetyChoices.map((ch) => {
                const isSelectedCorrect = safetyAnswered && ch.isCorrect;
                const isWrong = wrongSafetyChoiceId === ch.id;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    className={`habit-shuffled-card-btn ${
                      isSelectedCorrect ? "placed-done" : ""
                    } ${isWrong ? "wrong-shake" : ""}`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "16px 14px",
                      minHeight: 138,
                      borderRadius: 22,
                      border: isSelectedCorrect
                        ? "4px solid #16A34A"
                        : "3px solid #CBD5E1",
                      background: isSelectedCorrect ? "#DCFCE7" : "#FFFFFF",
                      cursor: safetyAnswered ? "default" : "pointer",
                    }}
                    onClick={() => handleSelectSafetyChoice(ch)}
                  >
                    <span style={{ fontSize: 38, lineHeight: 1 }}>
                      {ch.emoji}
                    </span>
                    <strong
                      style={{
                        fontSize: 16,
                        color: "#0F172A",
                        textAlign: "center",
                        lineHeight: 1.35,
                        marginTop: 8,
                      }}
                    >
                      {ch.label}
                    </strong>
                    {isSelectedCorrect && (
                      <span className="habit-card-order-tag">✓ Chính xác!</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Hộp giải thích ấm áp khi Nấm chọn đúng */}
            {safetyAnswered && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 14,
                  background: "linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)",
                  border: "3px solid #22C55E",
                  borderRadius: 20,
                  padding: "12px 18px",
                }}
              >
                <strong style={{ fontSize: 16, color: "#14532D", flex: 1 }}>
                  💡 {currentSafetyQ.explainSuccess}
                </strong>
                {safetyIdx + 1 < safetyDeck.length && (
                  <button
                    type="button"
                    className="chunky-btn chunky-gold btn-sm"
                    onClick={handleNextSafetyQuestion}
                  >
                    Câu Tiếp Theo ({safetyIdx + 2}/{safetyDeck.length}) ➔
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hàng nút dưới cùng */}
      <div className="cooking-bottom-cta-row">
        <button
          type="button"
          className="chunky-btn chunky-orange btn-sm"
          onClick={
            mode === "cooking"
              ? resetCookingState
              : mode === "habits"
                ? resetHabitState
                : () => startNewSafetyRound()
          }
        >
          <RotateCcw size={14} /> Làm lại
        </button>

        {mode === "cooking" && dishCooked && (
          <button
            type="button"
            className="chunky-btn chunky-gold lifeskills-primary-cta"
            onClick={() =>
              onComplete({
                attempts,
                answers: [currentRecipe.id, ...selectedIngIds],
                activityId: currentRecipe.id,
                skillIds: ["lifeskills-cooking", "food-hygiene"],
                independentResult: attempts <= 2 ? "passed" : "assisted",
                completionSource: "system-checked",
              })
            }
          >
            <Sparkles size={15} /> Nhận Sao! ⭐
          </button>
        )}

        {mode === "habits" && isHabitFinished && (
          <button
            type="button"
            className="chunky-btn chunky-gold lifeskills-primary-cta"
            onClick={() =>
              onComplete({
                attempts,
                answers: [currentHabit.id, ...pickedToolIds],
                activityId: currentHabit.id,
                skillIds: ["lifeskills-habit"],
                independentResult: attempts <= 2 ? "passed" : "assisted",
                completionSource: "system-checked",
              })
            }
          >
            <Sparkles size={15} /> Nhận Sao! ⭐
          </button>
        )}

        {mode === "safety" && isSafetyRoundFinished && (
          <button
            type="button"
            className="chunky-btn chunky-gold lifeskills-primary-cta"
            onClick={() =>
              onComplete({
                attempts,
                answers: safetyDeck.map((q) => q.id),
                activityId: `safety-round-${safetyDeck[0]?.id || "general"}`,
                skillIds: ["lifeskills-safety", "emergency-response"],
                independentResult: attempts <= 2 ? "passed" : "assisted",
                completionSource: "system-checked",
              })
            }
          >
            <Sparkles size={15} /> Đủ 5/5 Câu! Nhận Sao! ⭐
          </button>
        )}
      </div>

      {showDoraemonClockClip && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(15, 23, 42, 0.82)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
          onClick={() => setShowDoraemonClockClip(false)}
        >
          <div
            style={{
              width: "min(980px, 95vw)",
              background: "#F8FAFC",
              borderRadius: 28,
              border: "4px solid #38BDF8",
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.45)",
              padding: 18,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <strong style={{ fontSize: 20, color: "#0369A1" }}>
                ⏰ Bài Giảng: Doraemon Dạy Bé Xem Đồng Hồ (Giờ Đúng &amp; Giờ Rưỡi)
              </strong>
              <button
                type="button"
                className="chunky-btn chunky-blue btn-sm"
                onClick={() => setShowDoraemonClockClip(false)}
              >
                ✕ Đóng &amp; Vào Học
              </button>
            </div>
            <video
              src="/videos/doraemon-clock-lesson.mp4"
              controls
              autoPlay
              playsInline
              style={{
                width: "100%",
                maxHeight: "74vh",
                borderRadius: 18,
                background: "#000",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
