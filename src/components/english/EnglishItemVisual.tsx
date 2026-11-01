import type { EnglishShopItem } from "../../data/englishLessons";

/**
 * Ánh xạ từng món đồ trong Tiệm Tạp Hóa Kuromi sang ảnh 3D Glossy Kawaii Pastel thật
 * (từ bộ 16 món Tiệm Tạp Hóa 3D & bộ 16 món Bánh Ngọt 3D), không dùng icon SVG tự vẽ.
 */
export const ID_TO_3D_IMAGE_MAP: Record<string, string> = {
  // 2. Kuromi Actions (Verbs & "I can..." / "Let's...") — dùng chung kho Pochacco 3D & Actions 3D
  "verb-clap": "/assets/pochacco/action-clap-two.webp",
  "verb-jump": "/assets/english/items/act_02_jump.webp",
  "verb-sleep": "/assets/pochacco/sticker-sleep.webp",
  "verb-run": "/assets/english/items/act_04_run.webp",
  "verb-sit": "/assets/english/items/act_05_sit.webp",
  "verb-stand": "/assets/pochacco/action-hands-on-hips.webp",
  "verb-wave": "/assets/pochacco/action-wave-hello.webp",
  "verb-dance": "/assets/pochacco/sticker-dance.webp",
  "verb-swim": "/assets/english/items/act_08_swim.webp",
  "verb-sing": "/assets/english/items/act_09_sing.webp",
  "verb-touch-nose": "/assets/pochacco/action-touch-nose.webp",
  "verb-fly": "/assets/pochacco/action-touch-nose.webp",
  "eat-apple": "/assets/items/fruits/fruit_02.webp",
  "drink-milk": "/assets/nam-stickers/nam-eat-milk.webp",
  "read-book": "/assets/nam-stickers/nam-study-read.webp",
  "kick-ball": "/assets/pochacco/sticker-soccer.webp",
  "eat-cake": "/assets/nam-stickers/nam-eat-donut.webp",
  "wash-hands": "/assets/english/items/act_12_wash_hands.webp",
  "raise-hands": "/assets/pochacco/action-hands-up.webp",
  "wash-face": "/assets/pochacco/action-hands-up.webp",
  "brush-teeth": "/assets/nam-stickers/nam-study-brush.webp",
  "draw-picture": "/assets/nam-stickers/nam-study-paint.webp",
  "sing-song": "/assets/nam-stickers/nam-stage-star.webp",
  "ride-bike": "/assets/english/items/act_13_ride_bike.webp",
  "touch-nose": "/assets/pochacco/action-touch-nose.webp",
  "comb-hair": "/assets/pochacco/action-touch-nose.webp",
  "wear-hat": "/assets/english/items/shop_10_hat_yellow.webp",
  "can-swim": "/assets/english/items/act_08_swim.webp",
  "can-sing": "/assets/nam-stickers/nam-stage-star.webp",
  "can-draw": "/assets/nam-stickers/nam-study-paint.webp",
  "can-run": "/assets/english/items/act_04_run.webp",
  "can-dance": "/assets/english/items/act_07_dance.webp",
  "can-cook": "/assets/nam-stickers/nam-eat-cookies.webp",
  "can-read": "/assets/nam-stickers/nam-study-read.webp",
  "lets-bike": "/assets/items/vehicles/vehicle_03.webp",
  "lets-eat": "/assets/nam-stickers/nam-eat-icecream.webp",
  "lets-soccer": "/assets/pochacco/sticker-soccer.webp",
  "lets-clean": "/assets/nam-stickers/nam-study-water.webp",
  "lets-paint": "/assets/nam-stickers/nam-study-paint.webp",

  // 3. Kuromi Pronouns (I, You, He, She, We, They) — ưu tiên hình Bé Nấm thật
  "pronoun-she": "/assets/english/items/act_07_dance.webp",
  "pronoun-he": "/assets/english/items/act_15_boy_kick_ball.webp",
  "pronoun-they": "/assets/english/items/act_16_friends_play.webp",
  "pronoun-i": "/assets/nam-stickers/nam-study-school.webp",
  "pronoun-she-mom": "/assets/english/items/act_09_sing.webp",
  "pronoun-he-dad": "/assets/pochacco/action-strong-fists.webp",
  "pronoun-we": "/assets/nam-stickers/nam-hug-pochacco.webp",
  "pronoun-you": "/assets/pochacco/action-wave-hello.webp",
  "pronoun-i-nam": "/assets/nam-stickers/nam-study-school.webp",
  "pronoun-you-friend": "/assets/nam-stickers/nam-hug-kitty.webp",
  "pronoun-she-kitty": "/assets/english/items/act_07_dance.webp",
  "pronoun-they-minions": "/assets/pochacco/state-listen-duo.webp",
  "pronoun-he-boy": "/assets/nam-stickers/nam-study-read.webp",
  "pronoun-she-girl": "/assets/english/items/act_14_paint_draw.webp",
  "pronoun-they-play": "/assets/english/items/act_16_friends_play.webp",
  "pronoun-i-sing": "/assets/nam-stickers/nam-stage-star.webp",
  "she-eating-cake": "/assets/items/lifeskills/lifeskills_16.webp",
  "he-eating-banana": "/assets/items/fruits/fruit_03.webp",
  "she-drinking-milk": "/assets/nam-stickers/nam-eat-milk.webp",
  "they-eating-pizza": "/assets/math/items/pizza-whole.webp",
  "he-kicking-ball": "/assets/english/items/act_15_boy_kick_ball.webp",
  "she-kicking-ball": "/assets/english/items/color_15_ball_red.webp",
  "he-reading-book": "/assets/nam-stickers/nam-study-read.webp",
  "we-swimming": "/assets/english/items/act_08_swim.webp",
  "we-singing": "/assets/nam-stickers/nam-stage-star.webp",
  "he-sleeping": "/assets/english/items/act_03_sleep.webp",
  "she-running": "/assets/english/items/act_04_run.webp",
  "you-jumping": "/assets/english/items/act_02_jump.webp",
  "she-has-bag": "/assets/items/school/school_01.webp",
  "he-has-car": "/assets/english/items/color_13_car_blue.webp",
  "i-have-teddy": "/assets/nam-stickers/nam-hug-purin.webp",
  "they-have-balls": "/assets/english/items/color_16_ball_blue.webp",
  "he-likes-bananas": "/assets/items/fruits/fruit_03.webp",
  "she-likes-strawberries": "/assets/nam-stickers/nam-eat-strawberry.webp",
  "i-like-icecream": "/assets/nam-stickers/nam-eat-icecream.webp",
  "we-like-music": "/assets/nam-stickers/nam-stage-star.webp",
  "you-are-smart": "/assets/nam-stickers/nam-study-write.webp",
  "i-am-hungry": "/assets/nam-stickers/nam-eat-bento.webp",
  "she-is-princess": "/assets/english/items/shop_13_dress_pink.webp",
  "they-are-tall": "/assets/english/items/act_16_friends_play.webp",

  // 4. Mystery Bag & Daily Speaking
  "color-red": "/assets/items/fruits/fruit_02.webp",
  "color-blue": "/assets/english/items/color_16_ball_blue.webp",
  "color-yellow": "/assets/items/fruits/fruit_03.webp",
  "color-green": "/assets/items/fruits/fruit_07.webp",
  "ans-name": "/assets/nam-stickers/nam-study-school.webp",
  "ans-fine": "/assets/pochacco/action-big-smile.webp",
  "ans-sorry": "/assets/pochacco/action-tilt-head.webp",
  "ans-bye": "/assets/pochacco/action-wave-hello.webp",
  "ans-yes-i-do": "/assets/nam-stickers/nam-eat-icecream.webp",
  "ans-good-morning": "/assets/pochacco/action-stretch-high.webp",
  "ans-sit-down": "/assets/english/items/act_05_sit.webp",
  "ans-im-six": "/assets/nam-stickers/nam-stage-star.webp",
  "ans-thank-you": "/assets/nam-stickers/nam-hug-kitty.webp",
  "ans-excuse-me": "/assets/pochacco/action-touch-ears.webp",
  "ans-stand-up": "/assets/pochacco/action-hands-on-hips.webp",
  "ans-wash-hands": "/assets/english/items/act_12_wash_hands.webp",
};

export function resolve3DKawaiiShopImage(item: EnglishShopItem): {
  src: string;
  filter?: string;
} {
  if (item.image && !item.image.includes("pastry-")) {
    return { src: item.image };
  }

  if (ID_TO_3D_IMAGE_MAP[item.id]) {
    return { src: ID_TO_3D_IMAGE_MAP[item.id] };
  }

  const c = item.colorKey;
  switch (item.shape as string) {
    case "apple":
      if (c === "green") {
        return {
          src: "/assets/items/fruits/fruit_02.webp",
          filter: "hue-rotate(92deg) saturate(1.18)",
        };
      }
      return {
        src: "/assets/items/fruits/fruit_02.webp",
        filter:
          c === "yellow" ? "hue-rotate(48deg) saturate(1.2)" : undefined,
      };
    case "banana":
      return { src: "/assets/items/fruits/fruit_03.webp" };
    case "strawberry":
      return { src: "/assets/items/fruits/fruit_01.webp" };
    case "milk":
      if (c === "pink") {
        return { src: "/assets/items/sweets/sweet_12.webp" };
      }
      return { src: "/assets/english/items/shop_06_milk.webp" };
    case "cake":
      if (c === "pink" || c === "red") {
        return { src: "/assets/items/sweets/sweet_01.webp" };
      }
      if (c === "yellow" || c === "orange") {
        return { src: "/assets/items/sweets/sweet_08.webp" };
      }
      if (c === "purple") {
        return { src: "/assets/items/sweets/sweet_04.webp" };
      }
      return { src: "/assets/items/sweets/sweet_09.webp" };
    case "cookie":
      return { src: "/assets/items/sweets/sweet_10.webp" };
    case "candy":
      if (c === "purple" || c === "blue") {
        return {
          src: "/assets/items/sweets/sweet_13.webp",
          filter: "hue-rotate(245deg) saturate(1.15)",
        };
      }
      return { src: "/assets/items/sweets/sweet_13.webp" };
    case "icecream":
      if (c === "green") {
        return {
          src: "/assets/items/sweets/sweet_11.webp",
          filter: "hue-rotate(115deg) saturate(1.15)",
        };
      }
      return { src: "/assets/items/sweets/sweet_11.webp" };
    case "hat":
      if (c === "pink" || c === "red") {
        return { src: "/assets/english/items/color_09_hat_pink.webp" };
      }
      if (c === "blue" || c === "purple") {
        return { src: "/assets/english/items/color_10_hat_blue.webp" };
      }
      return { src: "/assets/english/items/shop_10_hat_yellow.webp" };
    case "bag":
      if (c === "yellow" || c === "orange") {
        return { src: "/assets/items/school/school_01.webp" };
      }
      if (c === "pink" || c === "red") {
        return {
          src: "/assets/english/items/shop_11_bag_purple.webp",
          filter: "hue-rotate(55deg) saturate(1.2)",
        };
      }
      return { src: "/assets/english/items/shop_11_bag_purple.webp" };
    case "cup":
      if (c === "pink" || c === "red") {
        return {
          src: "/assets/english/items/shop_12_cup_blue.webp",
          filter: "hue-rotate(120deg) saturate(1.2)",
        };
      }
      if (c === "green") {
        return {
          src: "/assets/english/items/shop_12_cup_blue.webp",
          filter: "hue-rotate(285deg) saturate(1.15)",
        };
      }
      return { src: "/assets/english/items/shop_12_cup_blue.webp" };
    case "dress":
      if (c === "purple" || c === "blue") {
        return { src: "/assets/english/items/color_11_dress_purple.webp" };
      }
      if (c === "yellow" || c === "orange") {
        return { src: "/assets/english/items/color_12_dress_yellow.webp" };
      }
      return { src: "/assets/english/items/shop_13_dress_pink.webp" };
    case "flower":
      if (c === "yellow" || c === "orange") {
        return { src: "/assets/items/nature/nature_02.webp" };
      }
      if (c === "purple" || c === "blue") {
        return {
          src: "/assets/english/items/shop_14_flower_pink.webp",
          filter: "hue-rotate(265deg) saturate(1.15)",
        };
      }
      return { src: "/assets/english/items/shop_14_flower_pink.webp" };
    case "car":
      if (c === "blue") {
        return { src: "/assets/english/items/color_13_car_blue.webp" };
      }
      if (c === "yellow" || c === "orange") {
        return { src: "/assets/english/items/color_14_car_yellow.webp" };
      }
      if (c === "green") {
        return {
          src: "/assets/english/items/color_13_car_blue.webp",
          filter: "hue-rotate(290deg) saturate(1.1)",
        };
      }
      return { src: "/assets/english/items/shop_15_car_red.webp" };
    case "shoes":
      return {
        src: "/assets/english/items/toy_02_shoes.webp",
        filter:
          c === "pink" || c === "red"
            ? "hue-rotate(135deg) saturate(1.15)"
            : undefined,
      };
    case "ball":
      if (c === "red" || c === "pink") {
        return { src: "/assets/english/items/color_15_ball_red.webp" };
      }
      if (c === "blue" || c === "purple") {
        return { src: "/assets/english/items/color_16_ball_blue.webp" };
      }
      return { src: "/assets/english/items/shop_16_ball_green.webp" };
    case "teddy":
      return { src: "/assets/english/items/toy_01_teddy.webp" };
    case "book":
      return {
        src: "/assets/english/items/toy_03_book.webp",
        filter: c === "blue" ? "hue-rotate(95deg)" : undefined,
      };
    case "star":
      return { src: "/assets/english/items/toy_04_star.webp" };
    case "cat":
      return { src: "/assets/english/items/animal_05_cat.webp" };
    case "dog":
      return { src: "/assets/english/items/animal_06_dog.webp" };
    case "rabbit":
      return { src: "/assets/english/items/animal_07_rabbit.webp" };
    case "duck":
      return { src: "/assets/english/items/animal_08_duck.webp" };
    default:
      break;
  }

  return { src: "/assets/english/items/toy_04_star.webp" };
}

export function KawaiiItemVisual({ item }: { item: EnglishShopItem }) {
  const count = Math.min(4, Math.max(1, item.quantity || 1));
  const resolved = resolve3DKawaiiShopImage(item);

  return (
    <div className={`eng-item-svg-group qty-${count}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="eng-item-svg-slot">
          <img
            src={resolved.src}
            alt={item.englishName}
            className="eng-item-3d-img"
            style={resolved.filter ? { filter: resolved.filter } : undefined}
          />
        </div>
      ))}
    </div>
  );
}

export interface LocalEnglishClip {
  id: string;
  filename: string;
  title: string;
  sizeMB: number;
  mediaType: "video" | "audio";
  streamUrl: string;
}

export const DEFAULT_ENGLISH_CLIPS: LocalEnglishClip[] = [
  {
    id: "eng:01 - Bài hát Monsters Vui Nhộn.mp4",
    filename: "01 - Bài hát Monsters Vui Nhộn.mp4",
    title: "🦊 01 · I See Your Monsters (Tình bạn)",
    sizeMB: 2.4,
    mediaType: "video",
    streamUrl: "/english-videos/clip-01.mp4",
  },
  {
    id: "eng:02 - Bài hát I Love You Mommy.mp4",
    filename: "02 - Bài hát I Love You Mommy.mp4",
    title: "🐰 02 · I Love You Mommy (Gia đình)",
    sizeMB: 1.5,
    mediaType: "video",
    streamUrl: "/english-videos/clip-02.mp4",
  },
  {
    id: "eng:03 - Bài hát Đếm Ngón Tay Xinh.mp4",
    filename: "03 - Bài hát Đếm Ngón Tay Xinh.mp4",
    title: "🖐️ 03 · Ten Little Fingers (Đếm 1–10)",
    sizeMB: 3.1,
    mediaType: "video",
    streamUrl: "/english-videos/clip-03.mp4",
  },
  {
    id: "eng:04 - Bài hát Tiếng Anh Vui Nhộn (Tập 1).mp4",
    filename: "04 - Bài hát Tiếng Anh Vui Nhộn (Tập 1).mp4",
    title: "🏃 04 · What Can You Do? (6 Động từ)",
    sizeMB: 4.0,
    mediaType: "video",
    streamUrl: "/english-videos/clip-04.mp4",
  },
  {
    id: "eng:05 - Bài hát Lemon Tree (Cây Chanh).mp4",
    filename: "05 - Bài hát Lemon Tree (Cây Chanh).mp4",
    title: "🍋 05 · Yellow Lemon Tree (Màu sắc)",
    sizeMB: 4.3,
    mediaType: "video",
    streamUrl: "/english-videos/clip-05.mp4",
  },
  {
    id: "eng:06 - Bài hát Tiếng Anh Vui Nhộn (Tập 2).mp4",
    filename: "06 - Bài hát Tiếng Anh Vui Nhộn (Tập 2).mp4",
    title: "🪥 06 · Brush Your Teeth (Thói quen tốt)",
    sizeMB: 4.5,
    mediaType: "video",
    streamUrl: "/english-videos/clip-06.mp4",
  },
  {
    id: "eng:07 - Bài hát Tiếng Anh Vui Nhộn (Tập 3).mp4",
    filename: "07 - Bài hát Tiếng Anh Vui Nhộn (Tập 3).mp4",
    title: "🐺 07 · Truyện: Open The Door! (Sói & Dê)",
    sizeMB: 3.7,
    mediaType: "video",
    streamUrl: "/english-videos/clip-07.mp4",
  },
  {
    id: "eng:08 - Kể chuyện Tiếng Anh Hay Cho Bé.mp4",
    filename: "08 - Kể chuyện Tiếng Anh Hay Cho Bé.mp4",
    title: "🐑 08 · Truyện: Do You Like Carrots? (Sói & Cừu)",
    sizeMB: 4.0,
    mediaType: "video",
    streamUrl: "/english-videos/clip-08.mp4",
  },
];
