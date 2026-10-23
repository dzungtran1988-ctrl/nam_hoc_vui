import { useEffect, useMemo, useState } from "react";
import {
  Check,
  ChefHat,
  RotateCcw,
  Sparkles,
  Utensils,
  Volume2,
} from "lucide-react";
import type { ActivityProps } from "../types";
import { useSpeech } from "../hooks/useSpeech";
import { playCardPlaceSound, playRewardTone } from "../lib/sound";
import { getSharedAssetByImage } from "../data/sharedAssetCatalog";

interface IngredientOption {
  id: string;
  name: string;
  englishName: string;
  emoji: string;
  imageUrl: string;
  isCorrect: boolean;
  prepActionLabel?: string;
  prepDoneLabel?: string;
  preppedEmoji?: string;
  preppedImageUrl?: string;
}

interface CookingRecipe {
  id: string;
  title: string;
  shortTitle: string;
  emoji: string;
  platedImageUrl: string;
  namSticker: string;
  companionSticker: string;
  companionName: string;
  introLine: string;
  prepPromptLine: string;
  cookPromptLine: string;
  successLine: string;
  cookActionLabel: string;
  platedLabel: string;
  platedSubtitle?: string;
  step2TabLabel?: string;
  step2Title?: string;
  step3TabLabel?: string;
  step3Title?: string;
  step3DoneTitle?: string;
  ingredients: IngredientOption[];
}

interface DailyHabitQuest {
  id: string;
  title: string;
  shortTitle: string;
  emoji: string;
  namSticker: string;
  companionSticker: string;
  companionName: string;
  introLine: string;
  successLine: string;
  steps: {
    id: string;
    order: number;
    label: string;
    englishLabel?: string;
    emoji: string;
    imageUrl?: string;
  }[];
}

const COOKING_RECIPES: CookingRecipe[] = [
  {
    id: "recipe-cookies",
    title: "Làm Bánh Quy Gấu, Trái Tim & Ngôi Sao",
    shortTitle: "🍪 Bánh Quy",
    emoji: "🍪",
    platedImageUrl: "/assets/items/lifeskills/lifeskills_14.png",
    namSticker: "/assets/nam-stickers/nam-chef-cookies.png",
    companionSticker: "/assets/nam-stickers/nam-3d-cookies.png",
    companionName: "My Melody",
    introLine:
      "Hôm nay thợ làm bánh Nấm nướng khay Bánh Quy Gấu, Trái Tim và Ngôi Sao nhé! Bước 1: Con hãy chọn 3 nguyên liệu làm bánh đưa lên bàn nào!",
    prepPromptLine:
      "Đủ 3 nguyên liệu làm bánh rồi! Bước 2: Mình cùng nhào bột mịn, cán bột ấn khuôn Tim - Sao và phết kem dâu nhé!",
    cookPromptLine:
      "Những chiếc bánh quy đã tạo hình xinh xắn! Bước 3: Bấm nút Đút Lò Nướng Bánh Vàng Thơm ngay thôi!",
    successLine:
      "Thơm phức cả căn bếp! Khay bánh quy hình Trái Tim hồng và Ngôi Sao vàng của Nấm đã ra lò tuyệt đẹp!",
    cookActionLabel: "🔥 Đút Lò Nướng Khay Bánh Quy Vàng Thơm!",
    platedLabel: "🍪 Khay Bánh Quy Sao & Tim (Cookie Tray)",
    platedSubtitle: "Mẻ bánh quy mới ra lò thơm phức cho Nấm!",
    step2TabLabel: "2. Nhào & Tạo khuôn",
    step2Title: "🥣 Nhào bột, cán khuôn & trang trí bánh",
    step3TabLabel: "3. Đút lò nướng",
    step3Title: "🔥 Đút lò nướng chín khay bánh quy",
    step3DoneTitle: "🍪 Đã nướng chín khay bánh quy thơm lừng!",
    ingredients: [
      {
        id: "flour-butter",
        name: "Bao bột mì thơm",
        englishName: "Flour Sack",
        emoji: "🌾",
        imageUrl: "/assets/items/lifeskills/lifeskills_05.png",
        isCorrect: true,
        prepActionLabel: "🥣 Nhào bột mịn trong tô",
        prepDoneLabel: "Đã trộn bột mịn",
        preppedEmoji: "🥣",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_02.png",
      },
      {
        id: "egg-milk-cookie",
        name: "Bát trứng gà tươi",
        englishName: "Cracked Egg",
        emoji: "🥚",
        imageUrl: "/assets/items/lifeskills/lifeskills_04.png",
        isCorrect: true,
        prepActionLabel: "🥖 Cán bột & ấn khuôn Sao Tim",
        prepDoneLabel: "Đã cán khuôn bánh",
        preppedEmoji: "🥖",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_13.png",
      },
      {
        id: "icing-choco",
        name: "Kem dâu trang trí",
        englishName: "Strawberry Icing",
        emoji: "🍓",
        imageUrl: "/assets/items/lifeskills/lifeskills_15.png",
        isCorrect: true,
        prepActionLabel: "🎛️ Đánh bông kem & phết bánh",
        prepDoneLabel: "Đã phết kem dâu",
        preppedEmoji: "🎛️",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_18.png",
      },
      {
        id: "scissors-wrong",
        name: "Cây kéo thủ công",
        englishName: "Pink Scissors",
        emoji: "✂️",
        imageUrl: "/assets/items/school/school_09.png",
        isCorrect: false,
      },
      {
        id: "clock-wrong",
        name: "Đồng hồ báo thức",
        englishName: "Alarm Clock",
        emoji: "⏰",
        imageUrl: "/assets/items/home/home_05.png",
        isCorrect: false,
      },
    ],
  },
  {
    id: "recipe-milktea",
    title: "Pha Trà Sữa Trân Châu & Nước Cam Mát",
    shortTitle: "🧋 Trà Sữa",
    emoji: "🧋",
    platedImageUrl: "/assets/items/sweets/sweet_11.png",
    namSticker: "/assets/nam-stickers/nam-chef-milktea.png",
    companionSticker: "/assets/nam-stickers/nam-hug-capybara.png",
    companionName: "Gấu Bông & Capybara",
    introLine:
      "Cùng pha ly Trà Sữa Trân Châu thơm béo cho Nấm và bạn Gấu Bông nhé! Bước 1: Con hãy chọn 3 nguyên liệu pha trà sữa đưa lên quầy nào!",
    prepPromptLine:
      "Đủ 3 nguyên liệu rồi! Bước 2: Con bấm ủ trà thơm, nấu trân châu dẻo mềm và đong sữa bò tươi nhé!",
    cookPromptLine:
      "Trà thơm, sữa béo và trân châu dẻo đã sẵn sàng! Bước 3: Bấm Lắc Đều Ly Trà Sữa & Cắm Ống Hút nào!",
    successLine:
      "Ngọt mát mê ly! Ly Trà Sữa Trân Châu Đường Đen của Nấm và bạn Gấu Bông ngon số một luôn!",
    cookActionLabel: "🧊 Lắc Đều Ly Trà Sữa & Cắm Ống Hút!",
    platedLabel: "🧋 Ly Trà Sữa Trân Châu (Bubble Tea)",
    platedSubtitle: "Trà sữa thơm béo dẻo ngọt đã sẵn sàng cho Nấm!",
    step2TabLabel: "2. Ủ trà & Đong sữa",
    step2Title: "🫖 Ủ hồng trà, nấu trân châu & đong sữa",
    step3TabLabel: "3. Lắc & Cắm ống hút",
    step3Title: "🧊 Lắc bình trà sữa & cắm ống hút",
    step3DoneTitle: "🧋 Đã pha xong ly trà sữa trân châu!",
    ingredients: [
      {
        id: "black-tea",
        name: "Tách hồng trà thơm",
        englishName: "Pink Teacup",
        emoji: "🍵",
        imageUrl: "/assets/items/home/home_02.png",
        isCorrect: true,
        prepActionLabel: "🍲 Đun ủ cốt hồng trà",
        prepDoneLabel: "Đã ủ cốt trà thơm",
        preppedEmoji: "🍲",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_08.png",
      },
      {
        id: "boba-pearls",
        name: "Trân châu & Pudding",
        englishName: "Caramel Pudding",
        emoji: "🍮",
        imageUrl: "/assets/items/lifeskills/lifeskills_24.png",
        isCorrect: true,
        prepActionLabel: "🥣 Múc trân châu & pudding",
        prepDoneLabel: "Trân châu dẻo mềm",
        preppedEmoji: "🥣",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_10.png",
      },
      {
        id: "fresh-milk-cream",
        name: "Hộp sữa bò tươi",
        englishName: "Fresh Milk Carton",
        emoji: "🥛",
        imageUrl: "/assets/items/lifeskills/lifeskills_03.png",
        isCorrect: true,
        prepActionLabel: "🥄 Đong sữa bằng muỗng màu",
        prepDoneLabel: "Đã đong sữa béo",
        preppedEmoji: "🥄",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_11.png",
      },
      {
        id: "soap-bar",
        name: "Chai sữa tắm hồng",
        englishName: "Pink Soap",
        emoji: "🧴",
        imageUrl: "/assets/items/home/home_09.png",
        isCorrect: false,
      },
      {
        id: "ruler-tool",
        name: "Thước kẻ gỗ",
        englishName: "Wooden Ruler",
        emoji: "📏",
        imageUrl: "/assets/items/school/school_06.png",
        isCorrect: false,
      },
    ],
  },
  {
    id: "recipe-bento",
    title: "Cơm Hộp Bento Gấu Trứng Cuộn",
    shortTitle: "🍱 Cơm Bento",
    emoji: "🍱",
    platedImageUrl: "/assets/items/lifeskills/lifeskills_19.png",
    namSticker: "/assets/nam-stickers/nam-eat-bento.png",
    companionSticker: "/assets/nam-stickers/nam-hug-mymelody.png",
    companionName: "My Melody",
    introLine:
      "Hôm nay đầu bếp Nấm cùng My Melody làm Cơm Hộp Bento Gấu nhé! Bước 1: Con hãy chọn 3 nguyên liệu nấu ăn trong 5 món dưới đây!",
    prepPromptLine:
      "Đủ 3 nguyên liệu trên bảng rồi! Bước 2: Mình cùng nấu cơm dẻo, chiên trứng ốp la trên chảo và thái rau củ trên thớt nhé!",
    cookPromptLine:
      "Sơ chế xong hết rồi! Bước 3: Bấm nút Nấu Chín và Bày Lên Đĩa hộp Bento Gấu nào!",
    successLine:
      "Oa! Hộp cơm Bento Gấu có bát cơm trắng nóng hổi, trứng chiên và rau củ xanh đã bày lên đĩa tuyệt đẹp!",
    cookActionLabel: "🍳 Nấu Chín & Bày Hộp Bento Lên Đĩa!",
    platedLabel: "🍚 Bát Cơm Bento Nóng Hổi (Steamed Rice Bowl)",
    ingredients: [
      {
        id: "rice",
        name: "Gạo & Cơm trắng",
        englishName: "Steamed Rice",
        emoji: "🍚",
        imageUrl: "/assets/items/lifeskills/lifeskills_19.png",
        isCorrect: true,
        prepActionLabel: "🍲 Vo gạo & nấu nồi hoa đào",
        prepDoneLabel: "Đã nấu cơm dẻo",
        preppedEmoji: "🍲",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_08.png",
      },
      {
        id: "egg",
        name: "Bát trứng đập vỏ",
        englishName: "Cracked Egg Bowl",
        emoji: "🥚",
        imageUrl: "/assets/items/lifeskills/lifeskills_04.png",
        isCorrect: true,
        prepActionLabel: "🍳 Chiên trứng trên chảo hồng",
        prepDoneLabel: "Đã chiên trứng vàng",
        preppedEmoji: "🍳",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_07.png",
      },
      {
        id: "broccoli",
        name: "Rổ rau củ tươi",
        englishName: "Vegetable Basket",
        emoji: "🥦",
        imageUrl: "/assets/items/lifeskills/lifeskills_06.png",
        isCorrect: true,
        prepActionLabel: "🪵 Thái rau củ trên thớt gỗ",
        prepDoneLabel: "Đã rửa & thái rau",
        preppedEmoji: "🪵",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_01.png",
      },
      {
        id: "toy",
        name: "Ô tô đồ chơi đỏ",
        englishName: "Red Car",
        emoji: "🚗",
        imageUrl: "/assets/items/vehicles/vehicle_01.png",
        isCorrect: false,
      },
      {
        id: "crayon",
        name: "Hộp bút sáp màu",
        englishName: "Crayons",
        emoji: "🖍️",
        imageUrl: "/assets/items/school/school_08.png",
        isCorrect: false,
      },
    ],
  },
  {
    id: "recipe-ramen",
    title: "Mì Ramen Trứng Đào Thơm Lừng",
    shortTitle: "🍜 Mì Ramen",
    emoji: "🍜",
    platedImageUrl: "/assets/items/lifeskills/lifeskills_20.png",
    namSticker: "/assets/nam-stickers/nam-eat-noodles.png",
    companionSticker: "/assets/nam-stickers/nam-hug-doraemon.png",
    companionName: "Doraemon",
    introLine:
      "Cùng Doraemon nấu tô Mì Ramen nóng hổi nhé! Bước 1: Con hãy chọn đúng 3 nguyên liệu nấu mì đưa lên bảng nào!",
    prepPromptLine:
      "Tuyệt quá! Bước 2: Con chạm vào từng món để cán sợi mì tươi, luộc trứng lòng đào và thái rau củ trên thớt nhé!",
    cookPromptLine:
      "Nguyên liệu đã sơ chế sạch sẽ! Bước 3: Bấm nút Nấu Mì & Bày Ra Tô ngay thôi!",
    successLine:
      "Xì xụp! Tô Mì Ramen trứng đào và rau cải thơm lừng đã bày ra đĩa rồi! Nấm nấu ăn giỏi quá đi!",
    cookActionLabel: "🍲 Nấu Mì Chín & Bày Ra Tô Lớn!",
    platedLabel: "🍜 Tô Mì Ramen Trứng Đào (Ramen Noodle Bowl)",
    ingredients: [
      {
        id: "noodle",
        name: "Bột mì làm sợi mì",
        englishName: "Flour Sack",
        emoji: "🌾",
        imageUrl: "/assets/items/lifeskills/lifeskills_05.png",
        isCorrect: true,
        prepActionLabel: "🍲 Trụng mì trong nồi hoa đào",
        prepDoneLabel: "Đã trụng mì mềm",
        preppedEmoji: "🍲",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_08.png",
      },
      {
        id: "egg2",
        name: "Bát trứng gà tươi",
        englishName: "Cracked Egg Bowl",
        emoji: "🥚",
        imageUrl: "/assets/items/lifeskills/lifeskills_04.png",
        isCorrect: true,
        prepActionLabel: "🥣 Múc trứng lòng đào bằng muôi",
        prepDoneLabel: "Đã luộc trứng đào",
        preppedEmoji: "🥣",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_10.png",
      },
      {
        id: "greens",
        name: "Rổ rau củ tươi",
        englishName: "Vegetable Basket",
        emoji: "🥬",
        imageUrl: "/assets/items/lifeskills/lifeskills_06.png",
        isCorrect: true,
        prepActionLabel: "🪵 Rửa & thái hành rau trên thớt",
        prepDoneLabel: "Đã thái rau xanh",
        preppedEmoji: "🪵",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_01.png",
      },
      {
        id: "shoe",
        name: "Cặp sách đi học",
        englishName: "Pink Backpack",
        emoji: "🎒",
        imageUrl: "/assets/items/school/school_01.png",
        isCorrect: false,
      },
      {
        id: "ball",
        name: "Máy bay đồ chơi",
        englishName: "Airplane",
        emoji: "✈️",
        imageUrl: "/assets/items/vehicles/vehicle_06.png",
        isCorrect: false,
      },
    ],
  },
  {
    id: "recipe-burger",
    title: "Bánh Burger Bò Phô Mai Rau Xanh",
    shortTitle: "🍔 Bánh Burger",
    emoji: "🍔",
    platedImageUrl: "/assets/items/lifeskills/lifeskills_21.png",
    namSticker: "/assets/nam-stickers/nam-eat-burger.png",
    companionSticker: "/assets/nam-stickers/nam-hug-purin.png",
    companionName: "Pompompurin",
    introLine:
      "Đầu bếp Nấm ơi, cùng Pompompurin làm Bánh Burger nhé! Bước 1: Chọn 3 nguyên liệu làm bánh đưa lên bảng nào!",
    prepPromptLine:
      "Đủ 3 món rồi! Bước 2: Cùng nướng vỏ bánh mì, áp chảo thịt phô mai bằng xẻng gỗ và thái cà chua xà lách nhé!",
    cookPromptLine:
      "Sơ chế hoàn tất! Bước 3: Bấm nút Áp Chảo & Bày Bánh Burger Lên Đĩa nào!",
    successLine:
      "Tuyệt vời! Chiếc bánh Burger cao tầng có đủ bánh mì, phô mai và rau xà lách đã bày lên đĩa ngon tuyệt cú mèo!",
    cookActionLabel: "🔥 Áp Chảo & Bày Bánh Burger Lên Đĩa!",
    platedLabel: "🍔 Bánh Burger Bò Phô Mai (Cheeseburger)",
    ingredients: [
      {
        id: "bread",
        name: "Bánh mì tròn mềm",
        englishName: "Burger Bun",
        emoji: "🥯",
        imageUrl: "/assets/math/pastries16/pastry16_10.png",
        isCorrect: true,
        prepActionLabel: "🧤 Đeo găng nướng thơm vỏ bánh",
        prepDoneLabel: "Đã nướng vỏ bánh",
        preppedEmoji: "🧤",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_17.png",
      },
      {
        id: "cheese",
        name: "Trứng & Phô mai bò",
        englishName: "Frying Pan & Patty",
        emoji: "🍳",
        imageUrl: "/assets/items/lifeskills/lifeskills_07.png",
        isCorrect: true,
        prepActionLabel: "🥄 Dùng xẻng gỗ lật chín thịt",
        prepDoneLabel: "Đã áp chảo thơm",
        preppedEmoji: "🥄",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_09.png",
      },
      {
        id: "salad",
        name: "Rổ cà chua & xà lách",
        englishName: "Vegetable Basket",
        emoji: "🥬",
        imageUrl: "/assets/items/lifeskills/lifeskills_06.png",
        isCorrect: true,
        prepActionLabel: "🪵 Thái lát cà chua trên thớt",
        prepDoneLabel: "Đã rửa & thái lát",
        preppedEmoji: "🪵",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_01.png",
      },
      {
        id: "book",
        name: "Quyển sổ lò xo tím",
        englishName: "Purple Notebook",
        emoji: "📓",
        imageUrl: "/assets/items/school/school_02.png",
        isCorrect: false,
      },
      {
        id: "umbrella",
        name: "Đèn bàn ánh vàng",
        englishName: "Table Lamp",
        emoji: "💡",
        imageUrl: "/assets/items/home/home_01.png",
        isCorrect: false,
      },
    ],
  },
  {
    id: "recipe-chicken",
    title: "Đùi Gà Rán Giòn & Salad Cà Chua",
    shortTitle: "🍗 Gà Rán Giòn",
    emoji: "🍗",
    platedImageUrl: "/assets/items/lifeskills/lifeskills_22.png",
    namSticker: "/assets/nam-stickers/nam-eat-chicken.png",
    companionSticker: "/assets/nam-stickers/nam-hug-cinna.png",
    companionName: "Cinnamoroll",
    introLine:
      "Cùng Cinnamoroll làm món Đùi Gà Rán Giòn & Salad nhé! Bước 1: Nấm chọn 3 nguyên liệu tươi ngon đưa lên bảng nào!",
    prepPromptLine:
      "Giỏi quá! Bước 2: Mình tẩm bột mì trứng cho gà, thái rau cà chua và vắt nước cam tươi mát nhé!",
    cookPromptLine:
      "Mọi thứ đã sẵn sàng! Bước 3: Bấm Chiên Vàng Giòn & Bày Lên Đĩa thôi!",
    successLine:
      "Giòn rụm thơm phức! Đĩa gà rán vàng ươm ăn kèm salad cà chua và chanh vàng ngon hết sẩy luôn!",
    cookActionLabel: "🍳 Chiên Vàng Giòn & Bày Đĩa Gà Rán!",
    platedLabel: "🍗 Đĩa Gà Rán Giòn & Salad (Fried Chicken Plate)",
    ingredients: [
      {
        id: "drumstick",
        name: "Bột chiên giòn thơm",
        englishName: "Crispy Flour",
        emoji: "🌾",
        imageUrl: "/assets/items/lifeskills/lifeskills_05.png",
        isCorrect: true,
        prepActionLabel: "🥣 Áo lớp bột chiên giòn trong tô",
        prepDoneLabel: "Đã tẩm bột gà",
        preppedEmoji: "🥣",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_02.png",
      },
      {
        id: "tomato",
        name: "Rổ cà chua & xà lách",
        englishName: "Vegetable Basket",
        emoji: "🍅",
        imageUrl: "/assets/items/lifeskills/lifeskills_06.png",
        isCorrect: true,
        prepActionLabel: "🪵 Rửa & bày rau trên thớt",
        prepDoneLabel: "Đã soạn salad tươi",
        preppedEmoji: "🪵",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_01.png",
      },
      {
        id: "corn",
        name: "Cam & Chanh vàng tươi",
        englishName: "Yellow Lemon",
        emoji: "🍋",
        imageUrl: "/assets/items/fruits/fruit_09.png",
        isCorrect: true,
        prepActionLabel: "🍊 Pha thêm ly nước cam đá",
        prepDoneLabel: "Đã có nước cam mát",
        preppedEmoji: "🍊",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_23.png",
      },
      {
        id: "clock",
        name: "Đồng hồ báo thức",
        englishName: "Alarm Clock",
        emoji: "⏰",
        imageUrl: "/assets/items/home/home_05.png",
        isCorrect: false,
      },
      {
        id: "hat",
        name: "Cây chổi quét nhà",
        englishName: "Broom",
        emoji: "🧹",
        imageUrl: "/assets/items/home/home_14.png",
        isCorrect: false,
      },
    ],
  },
  {
    id: "recipe-icecream",
    title: "Bánh Kem Dâu Tây & Kem Sữa Tươi",
    shortTitle: "🍰 Bánh Kem Dâu",
    emoji: "🍰",
    platedImageUrl: "/assets/items/lifeskills/lifeskills_16.png",
    namSticker: "/assets/nam-stickers/nam-eat-icecream.png",
    companionSticker: "/assets/nam-stickers/nam-hug-kitty.png",
    companionName: "Hello Kitty",
    introLine:
      "Cùng Hello Kitty làm Bánh Kem Dâu Tây & Kem Sữa mát lạnh nào! Bước 1: Chọn đúng 3 nguyên liệu làm bánh kem đưa lên bảng nhé!",
    prepPromptLine:
      "Đủ 3 món rồi! Bước 2: Con bấm đong sữa tươi, đánh bông kem bằng máy và cắt dâu tây chín đỏ nhé!",
    cookPromptLine:
      "Sơ chế xong rồi! Bước 3: Bấm Phết Kem & Bày Bánh Dâu Tây Lên Đĩa nào!",
    successLine:
      "Ngọt mát quá đi! Đĩa Bánh Kem Dâu Tây Cắt Lát của đầu bếp Nấm đẹp xuất sắc!",
    cookActionLabel: "🎂 Phết Kem Bông & Bày Bánh Dâu Tây Lên Đĩa!",
    platedLabel: "🍰 Bánh Kem Dâu Tây Cắt Lát (Strawberry Shortcake)",
    ingredients: [
      {
        id: "milk",
        name: "Hộp sữa bò tươi",
        englishName: "Fresh Milk Carton",
        emoji: "🥛",
        imageUrl: "/assets/items/lifeskills/lifeskills_03.png",
        isCorrect: true,
        prepActionLabel: "🎛️ Đánh bông kem sữa bằng máy",
        prepDoneLabel: "Đã đánh bông kem",
        preppedEmoji: "🎛️",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_18.png",
      },
      {
        id: "strawberry",
        name: "Quả dâu tây chín đỏ",
        englishName: "Strawberry",
        emoji: "🍓",
        imageUrl: "/assets/items/fruits/fruit_01.png",
        isCorrect: true,
        prepActionLabel: "🪵 Cắt lát dâu tây trên thớt",
        prepDoneLabel: "Đã rửa & thái dâu",
        preppedEmoji: "🪵",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_01.png",
      },
      {
        id: "cone",
        name: "Cốt bánh bông lan",
        englishName: "Strawberry Cupcake",
        emoji: "🧁",
        imageUrl: "/assets/items/lifeskills/lifeskills_15.png",
        isCorrect: true,
        prepActionLabel: "🥣 Trộn kem & phết cốt bánh",
        prepDoneLabel: "Cốt bánh thơm mềm",
        preppedEmoji: "🥣",
        preppedImageUrl: "/assets/items/lifeskills/lifeskills_02.png",
      },
      {
        id: "pencil",
        name: "Bút chì vàng",
        englishName: "Yellow Pencil",
        emoji: "✏️",
        imageUrl: "/assets/items/school/school_04.png",
        isCorrect: false,
      },
      {
        id: "sock",
        name: "Ghế sofa xanh",
        englishName: "Blue Sofa",
        emoji: "🛋️",
        imageUrl: "/assets/items/home/home_06.png",
        isCorrect: false,
      },
    ],
  },
];

const DAILY_HABITS: DailyHabitQuest[] = [
  {
    id: "habit-water",
    title: "Chăm Sóc & Tưới Cây Xanh",
    shortTitle: "🌱 Tưới Cây",
    emoji: "🌱",
    namSticker: "/assets/nam-stickers/nam-study-water.png",
    companionSticker: "/assets/nam-stickers/nam-hug-capybara.png",
    companionName: "Capybara & Doraemon",
    introLine:
      "Cùng Capybara và Doraemon chăm sóc chậu cây xanh mỗi sáng nhé! Con hãy bấm lần lượt Bước 1, Bước 2, Bước 3 theo đúng thứ tự nào!",
    successLine:
      "Hoan hô bé Nấm! Nhờ Nấm tưới nước và đặt cây ra nắng ấm mà chậu cây nở hoa xanh tươi rồi!",
    steps: [
      {
        id: "w1",
        order: 1,
        label: "Lấy bình tưới nước sạch",
        englishLabel: "Watering Can",
        emoji: "🚿",
        imageUrl: "/assets/items/home/home_15.png",
      },
      {
        id: "w2",
        order: 2,
        label: "Tưới nước nhẹ vào chậu cây",
        englishLabel: "Green Plant",
        emoji: "🪴",
        imageUrl: "/assets/items/home/home_11.png",
      },
      {
        id: "w3",
        order: 3,
        label: "Thu hoạch rau quả tươi ngon",
        englishLabel: "Vegetable Basket",
        emoji: "🥦",
        imageUrl: "/assets/items/lifeskills/lifeskills_06.png",
      },
    ],
  },
  {
    id: "habit-brush",
    title: "Đánh Răng & Vệ Sinh Cá Nhân",
    shortTitle: "🪥 Đánh Răng",
    emoji: "🪥",
    namSticker: "/assets/nam-stickers/nam-study-brush.png",
    companionSticker: "/assets/nam-stickers/nam-hug-pochacco.png",
    companionName: "Pochacco",
    introLine:
      "Để hàm răng trắng tinh và cơ thể thơm tho, Nấm cùng Pochacco thực hiện đúng 3 bước vệ sinh sạch sẽ nhé!",
    successLine:
      "Hàm răng của Nấm trắng bóng, thơm tho! Nấm là em bé tự giác số một luôn!",
    steps: [
      {
        id: "b1",
        order: 1,
        label: "Lấy bàn chải & xà phòng thơm",
        englishLabel: "Pink Soap",
        emoji: "🧴",
        imageUrl: "/assets/items/home/home_09.png",
      },
      {
        id: "b2",
        order: 2,
        label: "Đánh răng & rửa mặt sạch bọt",
        englishLabel: "Bubble Wash",
        emoji: "🛁",
        imageUrl: "/assets/items/home/home_08.png",
      },
      {
        id: "b3",
        order: 3,
        label: "Lau khô bằng khăn bông êm ái",
        englishLabel: "Mint Towel",
        emoji: "🧖",
        imageUrl: "/assets/items/home/home_10.png",
      },
    ],
  },
  {
    id: "habit-school",
    title: "Tự Soạn Cặp Sách Đi Học",
    shortTitle: "🎒 Soạn Cặp Sách",
    emoji: "🎒",
    namSticker: "/assets/nam-stickers/nam-study-school.png",
    companionSticker: "/assets/nam-stickers/nam-hug-kuromi.png",
    companionName: "Kuromi",
    introLine:
      "Trước khi đến lớp, Nấm cùng Kuromi tự tay sắp xếp sách vở và hộp bút gọn gàng vào cặp nhé!",
    successLine:
      "Tuyệt quá! Cặp sách của Nấm đã gọn gàng ngăn nắp, sẵn sàng đến trường cùng các bạn rồi!",
    steps: [
      {
        id: "s1",
        order: 1,
        label: "Xếp sách vở ngay ngắn vào ngăn lớn",
        englishLabel: "Open Book",
        emoji: "📖",
        imageUrl: "/assets/items/school/school_03.png",
      },
      {
        id: "s2",
        order: 2,
        label: "Cất hộp bút & thước vào ngăn nhỏ",
        englishLabel: "Pencil Case",
        emoji: "👝",
        imageUrl: "/assets/items/school/school_12.png",
      },
      {
        id: "s3",
        order: 3,
        label: "Kéo khóa cặp hồng & đeo lên vai",
        englishLabel: "Pink Backpack",
        emoji: "🎒",
        imageUrl: "/assets/items/school/school_01.png",
      },
    ],
  },
  {
    id: "habit-rice",
    title: "Mặc Tạp Dề & Phụ Mẹ Bữa Cơm Ngoan",
    shortTitle: "🍚 Bữa Cơm Ngoan",
    emoji: "🍚",
    namSticker: "/assets/nam-stickers/nam-eat-rice.png",
    companionSticker: "/assets/nam-stickers/nam-hug-doraemon.png",
    companionName: "Doraemon",
    introLine:
      "Đến giờ ăn cơm gia đình rồi! Cùng Doraemon thực hiện 3 thói quen lễ phép và gọn gàng trong bữa ăn nhé!",
    successLine:
      "Nấm vừa lễ phép mời ba mẹ, vừa ăn hết suất và phụ dọn bát đĩa! Ba mẹ tự hào về Nấm lắm!",
    steps: [
      {
        id: "r1",
        order: 1,
        label: "Mặc tạp dề hoa cúc phụ mẹ dọn bàn",
        englishLabel: "Chef Apron",
        emoji: "🎽",
        imageUrl: "/assets/items/lifeskills/lifeskills_12.png",
      },
      {
        id: "r2",
        order: 2,
        label: "Bưng bát cơm trắng & mời Ba Mẹ",
        englishLabel: "Steamed Rice Bowl",
        emoji: "🍚",
        imageUrl: "/assets/items/lifeskills/lifeskills_19.png",
      },
      {
        id: "r3",
        order: 3,
        label: "Ăn gọn gàng & xếp đĩa sạch sẽ",
        englishLabel: "Blue Plate",
        emoji: "🍽️",
        imageUrl: "/assets/items/home/home_04.png",
      },
    ],
  },
];

export function LifeSkillsActivity({
  soundEnabled,
  onComplete,
  onReaction,
  onLessonIndexChange,
}: ActivityProps) {
  const speech = useSpeech(soundEnabled);
  const [mode, setMode] = useState<"cooking" | "habits">("cooking");
  const [recipeIdx, setRecipeIdx] = useState(0);
  const [habitIdx, setHabitIdx] = useState(0);

  // Trạng thái Cooking Studio 3 bước:
  // Bước 1: Chọn 3/5 nguyên liệu (hiện trực tiếp lên bảng bên phải)
  // Bước 2: Rửa hoặc sơ chế (thái, gọt, đập trứng...) từng nguyên liệu đã chọn
  // Bước 3: Nấu chín & bày lên đĩa
  const [cookingStep, setCookingStep] = useState<1 | 2 | 3>(1);
  const [selectedIngIds, setSelectedIngIds] = useState<string[]>([]);
  const [preppedIngIds, setPreppedIngIds] = useState<string[]>([]);
  const [wrongIngId, setWrongIngId] = useState<string | null>(null);
  const [dishCooked, setDishCooked] = useState(false);
  const [attempts, setAttempts] = useState(1);
  const [shuffleSeed, setShuffleSeed] = useState(0);

  // Trạng thái Daily Habits
  const [completedStepOrders, setCompletedStepOrders] = useState<number[]>([]);

  const currentRecipe = COOKING_RECIPES[recipeIdx] || COOKING_RECIPES[0];
  const currentHabit = DAILY_HABITS[habitIdx] || DAILY_HABITS[0];

  // Xáo trộn vị trí 5 nguyên liệu mỗi khi đổi món hoặc bấm Làm lại
  // Đảm bảo không bao giờ cả 3 nguyên liệu đúng cùng nằm ở 3 vị trí đầu tiên (0, 1, 2)
  const shuffledIngredients = useMemo(() => {
    const base = [...currentRecipe.ingredients];
    for (let attempt = 0; attempt < 12; attempt++) {
      for (let i = base.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [base[i], base[j]] = [base[j], base[i]];
      }
      const firstThreeAllCorrect =
        base[0]?.isCorrect && base[1]?.isCorrect && base[2]?.isCorrect;
      if (!firstThreeAllCorrect) {
        break;
      }
    }
    return base;
  }, [currentRecipe, shuffleSeed]);

  useEffect(() => {
    onLessonIndexChange?.(1);
  }, [onLessonIndexChange]);

  const resetCookingState = () => {
    setCookingStep(1);
    setSelectedIngIds([]);
    setPreppedIngIds([]);
    setWrongIngId(null);
    setDishCooked(false);
    setShuffleSeed((s) => s + 1);
  };

  useEffect(() => {
    resetCookingState();
  }, [recipeIdx, mode]);

  useEffect(() => {
    setCompletedStepOrders([]);
  }, [habitIdx, mode]);

  const pickedIngredients = selectedIngIds
    .map((id) => currentRecipe.ingredients.find((ing) => ing.id === id))
    .filter((ing): ing is IngredientOption => Boolean(ing));

  // Bước 1: Chọn 3/5 nguyên liệu -> hiện ngay lên bảng bên phải
  const handleSelectIngredient = (ing: IngredientOption) => {
    if (dishCooked) return;

    if (!ing.isCorrect) {
      setAttempts((a) => a + 1);
      setWrongIngId(ing.id);
      const msg = `Hihi, ${ing.name} không nấu ăn được đâu! Nấm chọn thực phẩm tươi ngon nhé!`;
      onReaction?.("sad", msg);
      speech.speak(msg, "vi-VN");
      window.setTimeout(() => setWrongIngId(null), 850);
      return;
    }

    if (selectedIngIds.includes(ing.id)) return;
    playCardPlaceSound();
    const next = [...selectedIngIds, ing.id];
    setSelectedIngIds(next);
    const assetMeta = getSharedAssetByImage(ing.imageUrl);

    if (next.length === 3) {
      playRewardTone();
      onReaction?.("happy", currentRecipe.prepPromptLine);
      speech.speak(currentRecipe.prepPromptLine, "vi-VN");
      window.setTimeout(() => {
        setCookingStep(2);
      }, 450);
    } else {
      speech.speak(
        assetMeta
          ? `Đã đặt ${ing.name} lên bảng! Tiếng Anh là ${assetMeta.englishName}!`
          : `Đã đặt ${ing.name} lên bảng!`,
        "vi-VN",
      );
    }
  };

  // Bước 2: Rửa hoặc sơ chế (thái, gọt, đập trứng...)
  const handlePrepIngredient = (ing: IngredientOption) => {
    if (preppedIngIds.includes(ing.id)) return;
    playCardPlaceSound();
    const next = [...preppedIngIds, ing.id];
    setPreppedIngIds(next);
    const preppedMeta = getSharedAssetByImage(
      ing.preppedImageUrl || ing.imageUrl,
    );

    if (next.length === 3) {
      playRewardTone();
      onReaction?.("happy", currentRecipe.cookPromptLine);
      speech.speak(currentRecipe.cookPromptLine, "vi-VN");
      window.setTimeout(() => {
        setCookingStep(3);
      }, 450);
    } else {
      const soundLine = preppedMeta ? `${preppedMeta.soundLabelVi} ` : "";
      onReaction?.(
        "happy",
        `${soundLine}${ing.prepDoneLabel || "Đã sơ chế"} ${ing.name}!`,
      );
      speech.speak(
        `${soundLine}${ing.prepDoneLabel || "Đã sơ chế"} ${ing.name}!`,
        "vi-VN",
      );
    }
  };

  // Bước 3: Nấu và bày lên đĩa
  const handleCookAndPlateDish = () => {
    if (selectedIngIds.length < 3 || preppedIngIds.length < 3 || dishCooked)
      return;
    playRewardTone();
    setDishCooked(true);
    onReaction?.("happy", currentRecipe.successLine);
    speech.speak(currentRecipe.successLine, "vi-VN");
  };

  const handleHabitStepTap = (stepOrder: number, label: string) => {
    const expectedOrder = completedStepOrders.length + 1;
    if (stepOrder === expectedOrder) {
      playCardPlaceSound();
      const next = [...completedStepOrders, stepOrder];
      setCompletedStepOrders(next);
      if (next.length === currentHabit.steps.length) {
        playRewardTone();
        onReaction?.("happy", currentHabit.successLine);
        speech.speak(currentHabit.successLine, "vi-VN");
      } else {
        speech.speak(`Bước ${stepOrder}: ${label}`, "vi-VN");
      }
    } else if (!completedStepOrders.includes(stepOrder)) {
      setAttempts((a) => a + 1);
      const hint = `Nấm ơi, mình làm Bước ${expectedOrder} trước nhé!`;
      onReaction?.("idle", hint);
      speech.speak(hint, "vi-VN");
    }
  };

  const isHabitFinished =
    completedStepOrders.length === currentHabit.steps.length;

  return (
    <div className="lifeskills-studio-stage">
      {/* Thanh chuyển đổi 2 chế độ + danh sách món ăn / thói quen (1 hàng gọn trên cả điện thoại) */}
      <div className="lifeskills-top-toolbar">
        <div className="lifeskills-mode-tabs">
          <button
            type="button"
            className={`lifeskills-mode-btn ${mode === "cooking" ? "active" : ""}`}
            onClick={() => setMode("cooking")}
          >
            <ChefHat size={15} /> 🍳 Nấu Ăn
          </button>
          <button
            type="button"
            className={`lifeskills-mode-btn ${mode === "habits" ? "active" : ""}`}
            onClick={() => setMode("habits")}
          >
            🌱 Tự Lập
          </button>
        </div>

        <div className="lifeskills-sub-pills">
          {mode === "cooking"
            ? COOKING_RECIPES.map((rcp, idx) => (
                <button
                  key={rcp.id}
                  type="button"
                  className={`lifeskills-recipe-pill ${recipeIdx === idx ? "active" : ""}`}
                  onClick={() => setRecipeIdx(idx)}
                >
                  {rcp.shortTitle}
                </button>
              ))
            : DAILY_HABITS.map((hb, idx) => (
                <button
                  key={hb.id}
                  type="button"
                  className={`lifeskills-recipe-pill ${habitIdx === idx ? "active" : ""}`}
                  onClick={() => setHabitIdx(idx)}
                >
                  {hb.shortTitle}
                </button>
              ))}
        </div>

        <button
          type="button"
          className="chunky-btn chunky-blue btn-sm lifeskills-speak-btn"
          onClick={() =>
            speech.speak(
              mode === "cooking"
                ? cookingStep === 1
                  ? currentRecipe.introLine
                  : cookingStep === 2
                    ? currentRecipe.prepPromptLine
                    : dishCooked
                      ? currentRecipe.successLine
                      : currentRecipe.cookPromptLine
                : currentHabit.introLine,
              "vi-VN",
            )
          }
        >
          <Volume2 size={14} /> Nghe
        </button>
      </div>

      {/* NỘI DUNG CHẾ ĐỘ 1: ĐẦU BẾP NHÍ NẤM (COOKING STUDIO 3 BƯỚC) */}
      {mode === "cooking" ? (
        <div className="lifeskills-cooking-grid">
          {/* Cột Trái: Chuyển từng bước gọn gàng, không bao giờ bị khuất trên điện thoại */}
          <div className="lifeskills-steps-panel">
            {/* Header tên món + Thanh 3 bước */}
            <div className="lifeskills-header-and-stepper">
              <div className="lifeskills-dish-header">
                <span className="dish-badge-emoji">{currentRecipe.emoji}</span>
                <h3>{currentRecipe.title}</h3>
              </div>

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
                  onClick={() =>
                    selectedIngIds.length === 3 && setCookingStep(2)
                  }
                >
                  <span>
                    {currentRecipe.step2TabLabel || "2. Sơ chế"} (
                    {preppedIngIds.length}/3)
                  </span>
                  {preppedIngIds.length === 3 && <Check size={12} />}
                </button>

                <button
                  type="button"
                  disabled={preppedIngIds.length < 3}
                  className={`cooking-wizard-tab ${
                    cookingStep === 3 ? "active" : dishCooked ? "done" : ""
                  }`}
                  onClick={() =>
                    preppedIngIds.length === 3 && setCookingStep(3)
                  }
                >
                  <span>
                    {currentRecipe.step3TabLabel || "3. Nấu & Bày đĩa"}
                  </span>
                  {dishCooked && <Check size={12} />}
                </button>
              </div>
            </div>

            {/* Vùng nội dung Bước hiện tại (chiếm trọn khung, rõ ràng trên cả điện thoại) */}
            <div className="cooking-active-step-stage">
              {cookingStep === 1 && (
                <div className="cooking-step-card step-active full-step-box">
                  <div className="cooking-step-title">
                    <span className="step-num-badge">Bước 1</span>
                    <strong>
                      🥗 Chọn 3/5 nguyên liệu đưa lên bảng ({selectedIngIds.length}
                      /3)
                    </strong>
                  </div>
                  <div className="cooking-ingredients-grid">
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
                            <span className="ing-mini-icon">{ing.emoji}</span>
                          </div>
                          <span className="ing-name">{ing.name}</span>
                          <span className="ing-en-name">{ing.englishName}</span>
                          {isPicked && <span className="ing-check">✅</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {cookingStep === 2 && (
                <div className="cooking-step-card step-active full-step-box">
                  <div className="cooking-step-title">
                    <span className="step-num-badge">Bước 2</span>
                    <strong>
                      {currentRecipe.step2Title ||
                        "🔪 Bấm rửa & sơ chế 3 nguyên liệu"}{" "}
                      ({preppedIngIds.length}/3)
                    </strong>
                  </div>
                  <div className="cooking-prep-cards-grid">
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
                            <span className="prep-mini-icon">
                              {isPrepped
                                ? ing.preppedEmoji || ing.emoji
                                : ing.emoji}
                            </span>
                            {isPrepped && (
                              <span className="prep-done-check">✨</span>
                            )}
                          </div>
                          <strong className="prep-ing-name">{ing.name}</strong>
                          <span className="prep-ing-en">{ing.englishName}</span>
                          <span className="prep-action-pill">
                            {isPrepped
                              ? `✅ ${ing.prepDoneLabel || "Đã sơ chế"}`
                              : ing.prepActionLabel || "🚿 Rửa & sơ chế"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {cookingStep === 3 && (
                <div className="cooking-step-card step-active full-step-box step-cook-plate-box">
                  <div className="cooking-step-title">
                    <span className="step-num-badge">Bước 3</span>
                    <strong>
                      {dishCooked
                        ? currentRecipe.step3DoneTitle ||
                          "🍽️ Đã nấu chín & bày lên đĩa!"
                        : currentRecipe.step3Title ||
                          "🍳 Nấu chín & Bày món ăn lên đĩa"}
                    </strong>
                  </div>

                  <div className="cook-plate-interactive-area">
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

                    {!dishCooked ? (
                      <button
                        type="button"
                        className="cook-big-stove-btn"
                        onClick={handleCookAndPlateDish}
                      >
                        <Utensils size={18} />
                        <span>{currentRecipe.cookActionLabel}</span>
                      </button>
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
                          <span>
                            {currentRecipe.platedSubtitle ||
                              "Món ngon đã bày ra đĩa cho Nấm!"}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Hàng nút dưới cùng */}
            <div className="cooking-bottom-cta-row">
              <button
                type="button"
                className="chunky-btn chunky-orange btn-sm"
                onClick={resetCookingState}
              >
                <RotateCcw size={14} /> Làm lại
              </button>

              {cookingStep === 1 && selectedIngIds.length === 3 && (
                <button
                  type="button"
                  className="chunky-btn chunky-pink lifeskills-primary-cta"
                  onClick={() => setCookingStep(2)}
                >
                  Sang {currentRecipe.step2TabLabel || "Bước 2: Sơ chế"} ▶
                </button>
              )}

              {cookingStep === 2 && preppedIngIds.length === 3 && (
                <button
                  type="button"
                  className="chunky-btn chunky-pink lifeskills-primary-cta"
                  onClick={() => setCookingStep(3)}
                >
                  Sang {currentRecipe.step3TabLabel || "Bước 3: Nấu & Bày đĩa"}{" "}
                  ▶
                </button>
              )}

              {cookingStep === 3 && !dishCooked && (
                <button
                  type="button"
                  className="chunky-btn chunky-pink lifeskills-primary-cta"
                  onClick={handleCookAndPlateDish}
                >
                  <Utensils size={15} /> {currentRecipe.cookActionLabel} ✨
                </button>
              )}

              {dishCooked && (
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
            </div>
          </div>

          {/* Cột Phải: Bảng Bếp & Đĩa Bày Món Ăn (Hiện trực tiếp từng món lúc chọn -> sơ chế -> bày đĩa) */}
          <div
            className={`lifeskills-showcase-panel ${dishCooked ? "is-cooked" : ""}`}
          >
            <div className="showcase-status-pill">
              {dishCooked
                ? `✨ ${currentRecipe.platedLabel}`
                : cookingStep === 1
                  ? `📋 Bảng nguyên liệu (${selectedIngIds.length}/3)`
                  : cookingStep === 2
                    ? `🥣 Bàn chế biến (${preppedIngIds.length}/3)`
                    : "✨ Sẵn sàng hoàn thành món ngon!"}
            </div>

            <div className="showcase-sticker-stage">
              <img
                src={
                  dishCooked
                    ? currentRecipe.namSticker
                    : currentRecipe.companionSticker
                }
                alt={currentRecipe.title}
                className={`showcase-main-sticker ${dishCooked ? "pop-celebrate" : ""}`}
              />
            </div>

            {/* Bảng 3 ô nguyên liệu trực quan: Chọn tới đâu hiện lên bảng tới đó, sơ chế đổi hình, nấu xong thành đĩa */}
            <div className="showcase-board-slots">
              {[0, 1, 2].map((slotIdx) => {
                const ing = pickedIngredients[slotIdx];
                if (!ing) {
                  return (
                    <div
                      key={`empty-${slotIdx}`}
                      className="board-ing-slot empty"
                    >
                      <span className="slot-placeholder-plus">
                        Ô {slotIdx + 1}
                      </span>
                    </div>
                  );
                }
                const isPrepped = preppedIngIds.includes(ing.id);
                const slotImgSrc = dishCooked
                  ? currentRecipe.platedImageUrl
                  : isPrepped
                    ? ing.preppedImageUrl || ing.imageUrl
                    : ing.imageUrl;
                return (
                  <div
                    key={ing.id}
                    className={`board-ing-slot filled ${
                      dishCooked
                        ? "plated"
                        : isPrepped
                          ? "prepped"
                          : "raw-picked"
                    }`}
                  >
                    <img
                      src={slotImgSrc}
                      alt={ing.name}
                      className="board-slot-3d-img"
                      draggable={false}
                    />
                    <span className="board-slot-name">
                      {dishCooked
                        ? ing.name
                        : isPrepped
                          ? ing.prepDoneLabel || ing.name
                          : ing.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* NỘI DUNG CHẾ ĐỘ 2: BÉ TỰ LẬP MỖI NGÀY (DAILY HABITS) */
        <div className="lifeskills-cooking-grid">
          <div className="lifeskills-steps-panel">
            <div className="lifeskills-dish-header">
              <span className="dish-badge-emoji">{currentHabit.emoji}</span>
              <h3>{currentHabit.title}</h3>
            </div>

            <div className="habit-steps-list">
              {currentHabit.steps.map((st) => {
                const isDone = completedStepOrders.includes(st.order);
                const isNext = completedStepOrders.length + 1 === st.order;
                return (
                  <button
                    key={st.id}
                    type="button"
                    className={`habit-step-row-btn ${
                      isDone ? "done" : isNext ? "next-active" : ""
                    }`}
                    onClick={() => handleHabitStepTap(st.order, st.label)}
                  >
                    <span className="habit-order-pill">Bước {st.order}</span>
                    {st.imageUrl ? (
                      <img
                        src={st.imageUrl}
                        alt={st.label}
                        className="habit-step-3d-img"
                        draggable={false}
                      />
                    ) : (
                      <span className="habit-step-emoji">{st.emoji}</span>
                    )}
                    <div className="habit-step-text-wrap">
                      <strong className="habit-step-text">{st.label}</strong>
                      {st.englishLabel && (
                        <span className="habit-step-en">
                          {st.emoji} {st.englishLabel}
                        </span>
                      )}
                    </div>
                    <span className="habit-step-status">
                      {isDone ? "✅" : isNext ? "👆" : "⏳"}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="cooking-bottom-cta-row">
              <button
                type="button"
                className="chunky-btn chunky-orange btn-sm"
                onClick={() => setCompletedStepOrders([])}
              >
                <RotateCcw size={14} /> Làm lại
              </button>

              <button
                type="button"
                disabled={!isHabitFinished}
                className="chunky-btn chunky-gold lifeskills-primary-cta"
                onClick={() =>
                  onComplete({
                    attempts,
                    answers: [currentHabit.id],
                    activityId: currentHabit.id,
                    skillIds: ["lifeskills-habit"],
                    independentResult: attempts <= 2 ? "passed" : "assisted",
                    completionSource: "system-checked",
                  })
                }
              >
                <Sparkles size={15} /> Nhận Sao! ⭐
              </button>
            </div>
          </div>

          <div
            className={`lifeskills-showcase-panel ${
              isHabitFinished ? "is-cooked" : ""
            }`}
          >
            <div className="showcase-status-pill">
              {isHabitFinished
                ? "🌟 NẤM ĐÃ HOÀN THÀNH!"
                : `🌱 Bước ${completedStepOrders.length}/3 cùng ${currentHabit.companionName}`}
            </div>

            <div className="showcase-sticker-stage">
              <img
                src={
                  isHabitFinished
                    ? currentHabit.namSticker
                    : currentHabit.companionSticker
                }
                alt={currentHabit.title}
                className={`showcase-main-sticker ${
                  isHabitFinished ? "pop-celebrate" : ""
                }`}
              />
            </div>

            <div className="showcase-pot-tray">
              <span className="pot-empty-hint">
                {isHabitFinished
                  ? currentHabit.successLine
                  : "Chạm lần lượt Bước 1 ➔ Bước 2 ➔ Bước 3"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
