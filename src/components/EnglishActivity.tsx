import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Lightbulb,
  Sparkles,
  Star,
  Volume2,
} from "lucide-react";
import {
  ENGLISH_COLOR_PALETTE,
  ENGLISH_MINI_GAMES,
  MYSTERY_BAG_PROGRESSIVE_ROUNDS,
  PRONOUN_MATCH_ROUNDS,
  getEnglishRounds,
  type EnglishColorKey,
  type EnglishDifficultyLevel,
  type EnglishItemShape,
  type EnglishMiniGameId,
  type EnglishShopItem,
  type MysteryBagOption,
  type PronounMatchPair,
} from "../data/englishLessons";
import {
  getEnglishSongLessonForClip,
  type EnglishSongQuizOption,
  type EnglishSongVocabCard,
} from "../data/englishSongLessons";
import { useSpeech } from "../hooks/useSpeech";
import {
  playAttentionChime,
  playCardPlaceSound,
  playRewardTone,
} from "../lib/sound";
import type { ActivityProps } from "../types";

/**
 * Ánh xạ từng món đồ trong Tiệm Tạp Hóa Kuromi sang ảnh 3D Glossy Kawaii Pastel thật
 * (từ bộ 16 món Tiệm Tạp Hóa 3D & bộ 16 món Bánh Ngọt 3D), không dùng icon SVG tự vẽ.
 */
const ID_TO_3D_IMAGE_MAP: Record<string, string> = {
  // 2. Kuromi Actions (Verbs & "I can..." / "Let's...") — dùng chung kho Pochacco 3D & Actions 3D
  "verb-clap": "/assets/pochacco/action-clap-two.png",
  "verb-jump": "/assets/english/items/act_02_jump.png",
  "verb-sleep": "/assets/pochacco/sticker-sleep.png",
  "verb-run": "/assets/english/items/act_04_run.png",
  "verb-sit": "/assets/english/items/act_05_sit.png",
  "verb-stand": "/assets/pochacco/action-hands-on-hips.png",
  "verb-wave": "/assets/pochacco/action-wave-hello.png",
  "verb-dance": "/assets/pochacco/sticker-dance.png",
  "verb-swim": "/assets/english/items/act_08_swim.png",
  "verb-sing": "/assets/english/items/act_09_sing.png",
  "verb-touch-nose": "/assets/pochacco/action-touch-nose.png",
  "verb-fly": "/assets/pochacco/action-touch-nose.png",
  "eat-apple": "/assets/items/fruits/fruit_02.png",
  "drink-milk": "/assets/nam-stickers/nam-eat-milk.png",
  "read-book": "/assets/nam-stickers/nam-study-read.png",
  "kick-ball": "/assets/pochacco/sticker-soccer.png",
  "eat-cake": "/assets/nam-stickers/nam-eat-donut.png",
  "wash-hands": "/assets/english/items/act_12_wash_hands.png",
  "raise-hands": "/assets/pochacco/action-hands-up.png",
  "wash-face": "/assets/pochacco/action-hands-up.png",
  "brush-teeth": "/assets/nam-stickers/nam-study-brush.png",
  "draw-picture": "/assets/nam-stickers/nam-study-paint.png",
  "sing-song": "/assets/nam-stickers/nam-stage-star.png",
  "ride-bike": "/assets/english/items/act_13_ride_bike.png",
  "touch-nose": "/assets/pochacco/action-touch-nose.png",
  "comb-hair": "/assets/pochacco/action-touch-nose.png",
  "wear-hat": "/assets/english/items/shop_10_hat_yellow.png",
  "can-swim": "/assets/english/items/act_08_swim.png",
  "can-sing": "/assets/nam-stickers/nam-stage-star.png",
  "can-draw": "/assets/nam-stickers/nam-study-paint.png",
  "can-run": "/assets/english/items/act_04_run.png",
  "can-dance": "/assets/english/items/act_07_dance.png",
  "can-cook": "/assets/nam-stickers/nam-eat-cookies.png",
  "can-read": "/assets/nam-stickers/nam-study-read.png",
  "lets-bike": "/assets/items/vehicles/vehicle_03.png",
  "lets-eat": "/assets/nam-stickers/nam-eat-icecream.png",
  "lets-soccer": "/assets/pochacco/sticker-soccer.png",
  "lets-clean": "/assets/nam-stickers/nam-study-water.png",
  "lets-paint": "/assets/nam-stickers/nam-study-paint.png",

  // 3. Kuromi Pronouns (I, You, He, She, We, They) — ưu tiên hình Bé Nấm thật
  "pronoun-she": "/assets/english/items/act_07_dance.png",
  "pronoun-he": "/assets/english/items/act_15_boy_kick_ball.png",
  "pronoun-they": "/assets/english/items/act_16_friends_play.png",
  "pronoun-i": "/assets/nam-stickers/nam-study-school.png",
  "pronoun-she-mom": "/assets/english/items/act_09_sing.png",
  "pronoun-he-dad": "/assets/pochacco/action-strong-fists.png",
  "pronoun-we": "/assets/nam-stickers/nam-hug-pochacco.png",
  "pronoun-you": "/assets/pochacco/action-wave-hello.png",
  "pronoun-i-nam": "/assets/nam-stickers/nam-study-school.png",
  "pronoun-you-friend": "/assets/nam-stickers/nam-hug-kitty.png",
  "pronoun-she-kitty": "/assets/english/items/act_07_dance.png",
  "pronoun-they-minions": "/assets/pochacco/state-listen-duo.png",
  "pronoun-he-boy": "/assets/nam-stickers/nam-study-read.png",
  "pronoun-she-girl": "/assets/english/items/act_14_paint_draw.png",
  "pronoun-they-play": "/assets/english/items/act_16_friends_play.png",
  "pronoun-i-sing": "/assets/nam-stickers/nam-stage-star.png",
  "she-eating-cake": "/assets/items/lifeskills/lifeskills_16.png",
  "he-eating-banana": "/assets/items/fruits/fruit_03.png",
  "she-drinking-milk": "/assets/nam-stickers/nam-eat-milk.png",
  "they-eating-pizza": "/assets/math/items/pizza-whole.png",
  "he-kicking-ball": "/assets/english/items/act_15_boy_kick_ball.png",
  "she-kicking-ball": "/assets/english/items/color_15_ball_red.png",
  "he-reading-book": "/assets/nam-stickers/nam-study-read.png",
  "we-swimming": "/assets/english/items/act_08_swim.png",
  "we-singing": "/assets/nam-stickers/nam-stage-star.png",
  "he-sleeping": "/assets/english/items/act_03_sleep.png",
  "she-running": "/assets/english/items/act_04_run.png",
  "you-jumping": "/assets/english/items/act_02_jump.png",
  "she-has-bag": "/assets/items/school/school_01.png",
  "he-has-car": "/assets/english/items/color_13_car_blue.png",
  "i-have-teddy": "/assets/nam-stickers/nam-hug-purin.png",
  "they-have-balls": "/assets/english/items/color_16_ball_blue.png",
  "he-likes-bananas": "/assets/items/fruits/fruit_03.png",
  "she-likes-strawberries": "/assets/nam-stickers/nam-eat-strawberry.png",
  "i-like-icecream": "/assets/nam-stickers/nam-eat-icecream.png",
  "we-like-music": "/assets/nam-stickers/nam-stage-star.png",
  "you-are-smart": "/assets/nam-stickers/nam-study-write.png",
  "i-am-hungry": "/assets/nam-stickers/nam-eat-bento.png",
  "she-is-princess": "/assets/english/items/shop_13_dress_pink.png",
  "they-are-tall": "/assets/english/items/act_16_friends_play.png",

  // 4. Mystery Bag & Daily Speaking
  "color-red": "/assets/items/fruits/fruit_02.png",
  "color-blue": "/assets/english/items/color_16_ball_blue.png",
  "color-yellow": "/assets/items/fruits/fruit_03.png",
  "color-green": "/assets/items/fruits/fruit_07.png",
  "ans-name": "/assets/nam-stickers/nam-study-school.png",
  "ans-fine": "/assets/pochacco/action-big-smile.png",
  "ans-sorry": "/assets/pochacco/action-tilt-head.png",
  "ans-bye": "/assets/pochacco/action-wave-hello.png",
  "ans-yes-i-do": "/assets/nam-stickers/nam-eat-icecream.png",
  "ans-good-morning": "/assets/pochacco/action-stretch-high.png",
  "ans-sit-down": "/assets/english/items/act_05_sit.png",
  "ans-im-six": "/assets/nam-stickers/nam-stage-star.png",
  "ans-thank-you": "/assets/nam-stickers/nam-hug-kitty.png",
  "ans-excuse-me": "/assets/pochacco/action-touch-ears.png",
  "ans-stand-up": "/assets/pochacco/action-hands-on-hips.png",
  "ans-wash-hands": "/assets/english/items/act_12_wash_hands.png",
};

function resolve3DKawaiiShopImage(item: EnglishShopItem): {
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
  switch (item.shape) {
    case "apple":
      if (c === "green") {
        return {
          src: "/assets/items/fruits/fruit_02.png",
          filter: "hue-rotate(92deg) saturate(1.18)",
        };
      }
      return {
        src: "/assets/items/fruits/fruit_02.png",
        filter:
          c === "yellow" ? "hue-rotate(48deg) saturate(1.2)" : undefined,
      };
    case "banana":
      return { src: "/assets/items/fruits/fruit_03.png" };
    case "strawberry":
      return { src: "/assets/items/fruits/fruit_01.png" };
    case "milk":
      if (c === "pink") {
        return { src: "/assets/items/sweets/sweet_12.png" };
      }
      return { src: "/assets/items/lifeskills/lifeskills_03.png" };
    case "juice":
      return { src: "/assets/items/lifeskills/lifeskills_23.png" };
    case "cup":
      return { src: "/assets/items/sweets/sweet_13.png" };
    case "icecream":
      if (c === "yellow" || c === "orange") {
        return { src: "/assets/items/sweets/sweet_10.png" };
      }
      if (c === "blue" || c === "green" || c === "white") {
        return { src: "/assets/english/items/shop_07_icecream_blue.png" };
      }
      if (c === "purple") {
        return { src: "/assets/items/sweets/sweet_15.png" };
      }
      return { src: "/assets/items/sweets/sweet_09.png" };
    case "cake":
      if (c === "white" || c === "yellow") {
        return { src: "/assets/items/lifeskills/lifeskills_16.png" };
      }
      if (c === "purple") {
        return { src: "/assets/math/pastries16/pastry16_15.png" };
      }
      return { src: "/assets/items/sweets/sweet_07.png" };
    case "cookie":
      return { src: "/assets/items/sweets/sweet_05.png" };
    case "hat":
    case "cap":
      if (c === "yellow" || c === "orange") {
        return { src: "/assets/english/items/shop_10_hat_yellow.png" };
      }
      if (c === "blue" || c === "green") {
        return {
          src: "/assets/english/items/color_09_hat_blue.png",
          filter: c === "green" ? "hue-rotate(290deg) saturate(1.1)" : undefined,
        };
      }
      if (c === "pink" || c === "purple") {
        return {
          src: "/assets/english/items/color_10_hat_pink.png",
          filter: c === "purple" ? "hue-rotate(290deg)" : undefined,
        };
      }
      return { src: "/assets/english/items/shop_09_hat_red.png" };
    case "bag":
      if (c === "blue") {
        return { src: "/assets/english/items/shop_11_bag_blue.png" };
      }
      if (c === "red" || c === "orange") {
        return { src: "/assets/english/items/color_11_bag_red.png" };
      }
      if (c === "green" || c === "yellow") {
        return { src: "/assets/english/items/color_12_bag_green.png" };
      }
      return { src: "/assets/english/items/shop_12_bag_pink.png" };
    case "dress":
      if (c === "purple" || c === "blue") {
        return {
          src: "/assets/english/items/shop_14_dress_purple.png",
          filter: c === "blue" ? "hue-rotate(320deg)" : undefined,
        };
      }
      if (c === "yellow") {
        return {
          src: "/assets/english/items/shop_13_dress_pink.png",
          filter: "hue-rotate(65deg) brightness(1.06)",
        };
      }
      return { src: "/assets/english/items/shop_13_dress_pink.png" };
    case "car":
      if (c === "blue") {
        return { src: "/assets/english/items/color_13_car_blue.png" };
      }
      if (c === "yellow" || c === "orange") {
        return { src: "/assets/english/items/color_14_car_yellow.png" };
      }
      if (c === "green") {
        return {
          src: "/assets/english/items/color_13_car_blue.png",
          filter: "hue-rotate(290deg) saturate(1.1)",
        };
      }
      return { src: "/assets/english/items/shop_15_car_red.png" };
    case "shoes":
      return {
        src: "/assets/english/items/toy_02_shoes.png",
        filter:
          c === "pink" || c === "red"
            ? "hue-rotate(135deg) saturate(1.15)"
            : undefined,
      };
    case "ball":
      if (c === "red" || c === "pink") {
        return { src: "/assets/english/items/color_15_ball_red.png" };
      }
      if (c === "blue" || c === "purple") {
        return { src: "/assets/english/items/color_16_ball_blue.png" };
      }
      return { src: "/assets/english/items/shop_16_ball_green.png" };
    case "teddy":
      return { src: "/assets/english/items/toy_01_teddy.png" };
    case "book":
      return {
        src: "/assets/english/items/toy_03_book.png",
        filter: c === "blue" ? "hue-rotate(95deg)" : undefined,
      };
    case "star":
      return { src: "/assets/english/items/toy_04_star.png" };
    case "cat":
      return { src: "/assets/english/items/animal_05_cat.png" };
    case "dog":
      return { src: "/assets/english/items/animal_06_dog.png" };
    case "rabbit":
      return { src: "/assets/english/items/animal_07_rabbit.png" };
    case "duck":
      return { src: "/assets/english/items/animal_08_duck.png" };
    default:
      break;
  }

  return { src: "/assets/english/items/toy_04_star.png" };
}

function KawaiiItemVisual({ item }: { item: EnglishShopItem }) {
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

interface LocalEnglishClip {
  id: string;
  filename: string;
  title: string;
  sizeMB: number;
  mediaType: "video" | "audio";
  streamUrl: string;
}

const DEFAULT_ENGLISH_CLIPS: LocalEnglishClip[] = [
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

export function EnglishActivity({
  soundEnabled,
  onComplete,
  onReaction,
  onLessonIndexChange,
}: ActivityProps) {
  const [viewMode, setViewMode] = useState<"menu" | "game" | "videos">("menu");
  const [activeGameId, setActiveGameId] =
    useState<EnglishMiniGameId>("kuromi-shop");
  const [level, setLevel] = useState<EnglishDifficultyLevel>(1);
  const [roundIdx, setRoundIdx] = useState(0);
  const [deckSeed, setDeckSeed] = useState(1);

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hasSpokenAloud, setHasSpokenAloud] = useState(false);
  const [attemptsCount, setAttemptsCount] = useState(0);

  // State riêng cho Bài 1 (Tiệm Tạp Hóa Kuromi — Đếm món nhặt vào Giỏ Hàng)
  const [basketCount, setBasketCount] = useState(0);

  // State riêng cho Bài 3 (Ai Đang Làm Gì? — Nối 2 Cột Ngôi He/She/It/They + Hành động)
  const [selectedLeftPairId, setSelectedLeftPairId] = useState<string | null>(
    null,
  );
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [wrongRightPairId, setWrongRightPairId] = useState<string | null>(null);
  const [shuffledRightPairs, setShuffledRightPairs] = useState<
    PronounMatchPair[]
  >([]);

  // State riêng cho Bài 4 (Chiếc Túi Bí Mật — Mở túi 3 bước: Màu sắc -> Hình dạng -> Đồ vật)
  const [bagStepIdx, setBagStepIdx] = useState<0 | 1 | 2>(0);
  const [bagSelectedOptId, setBagSelectedOptId] = useState<string | null>(null);
  const [bagStepCorrect, setBagStepCorrect] = useState<boolean | null>(null);

  // State cho chế độ "Học Qua Bài Hát & Truyện Ngắn (3-Column Interactive Studio)"
  const [englishClips, setEnglishClips] = useState<LocalEnglishClip[]>(
    DEFAULT_ENGLISH_CLIPS,
  );
  const [activeClipIdx, setActiveClipIdx] = useState(0);
  const [englishFolderPath, setEnglishFolderPath] = useState(
    "D:\\Nấm học\\Nhạc tiếng anh",
  );
  const [loadingClips, setLoadingClips] = useState(false);
  const [showDownloader, setShowDownloader] = useState(false);
  const [downloadUrlInput, setDownloadUrlInput] = useState("");
  const [downloadTitleInput, setDownloadTitleInput] = useState("");
  const [downloadingClip, setDownloadingClip] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState<1 | 0.75>(1);
  const [songStudioTab, setSongStudioTab] = useState<"vocab" | "quiz">("vocab");
  const [learnedVocabIds, setLearnedVocabIds] = useState<Record<string, boolean>>({});
  const [songQuizIdx, setSongQuizIdx] = useState(0);
  const [selectedSongQuizOptionId, setSelectedSongQuizOptionId] = useState<string | null>(null);
  const [songQuizIsCorrect, setSongQuizIsCorrect] = useState<boolean | null>(null);
  const [completedSongClipIds, setCompletedSongClipIds] = useState<Record<string, boolean>>({});

  const completedRef = useRef(false);
  const speech = useSpeech(soundEnabled);

  const fetchEnglishClips = async () => {
    setLoadingClips(true);
    try {
      const res = await fetch("/api/english-videos");
      const ct = res.headers.get("content-type") || "";
      if (res.ok && ct.includes("application/json")) {
        const data = await res.json();
        if (Array.isArray(data.clips) && data.clips.length > 0) {
          setEnglishClips(data.clips);
          setActiveClipIdx(0);
        }
        if (data.folderPath) {
          setEnglishFolderPath(data.folderPath);
        }
      }
    } catch {
      // Dùng danh sách 8 clip tĩnh mặc định trên Vercel
    } finally {
      setLoadingClips(false);
    }
  };

  const handleDownloadFromUrl = async () => {
    const trimmedUrl = downloadUrlInput.trim();
    if (!trimmedUrl || downloadingClip) return;
    setDownloadingClip(true);
    setDownloadMessage("⏳ Đang tải clip HD về thư mục Nhạc tiếng anh...");
    try {
      const res = await fetch("/api/download-english-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: trimmedUrl,
          customTitle: downloadTitleInput.trim(),
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok && Array.isArray(data.clips)) {
        setEnglishClips(data.clips);
        setActiveClipIdx(Math.max(0, data.clips.length - 1));
        setDownloadUrlInput("");
        setDownloadTitleInput("");
        setDownloadMessage("✅ Đã tải xong clip vào App!");
        if (soundEnabled) playRewardTone();
      } else {
        setDownloadMessage(`⚠️ ${data.error || "Không tải được link này"}`);
      }
    } catch (err) {
      setDownloadMessage(`⚠️ Lỗi kết nối: ${String(err)}`);
    } finally {
      setDownloadingClip(false);
    }
  };

  useEffect(() => {
    void fetchEnglishClips();
  }, []);

  const currentGameMeta =
    ENGLISH_MINI_GAMES.find((g) => g.id === activeGameId) ||
    ENGLISH_MINI_GAMES[0];

  const rounds = useMemo(
    () => getEnglishRounds(activeGameId, level).slice(0, 4),
    [activeGameId, level, deckSeed],
  );

  const currentRound = rounds[roundIdx % rounds.length] || rounds[0];

  // Dữ liệu cho Bài 3 (Nối 2 cột) & Bài 4 (Chiếc Túi Bí Mật 3 bước)
  const pronounMatchList =
    PRONOUN_MATCH_ROUNDS[level] || PRONOUN_MATCH_ROUNDS[1];
  const currentPronounMatchRound =
    pronounMatchList[roundIdx % pronounMatchList.length] || pronounMatchList[0];

  const mysteryBagList = useMemo(() => {
    const base =
      MYSTERY_BAG_PROGRESSIVE_ROUNDS[level] ||
      MYSTERY_BAG_PROGRESSIVE_ROUNDS[1];
    const copy = [...base];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }, [level, deckSeed]);
  const currentMysteryBagRound =
    mysteryBagList[roundIdx % mysteryBagList.length] || mysteryBagList[0];
  const currentMysteryStep =
    currentMysteryBagRound?.steps[bagStepIdx] ||
    currentMysteryBagRound?.steps[0];

  // Số lượng món cần nhặt vào Giỏ Hàng ở Bài 1 (Cấp 1 & 2: 1 món, Cấp 3: theo quantity 2-3 món)
  const rightShopItem = currentRound?.items.find(
    (it) => it.id === currentRound.correctItemId,
  );
  const targetBasketQty =
    activeGameId === "kuromi-shop" && level === 3
      ? Math.max(2, Math.min(4, rightShopItem?.quantity || 2))
      : 1;

  // Cố định 1 khung bảng duy nhất suốt 1 bài học Tiếng Anh (chỉ đổi khi sang bài khác hẳn)
  useEffect(() => {
    if (viewMode === "menu") {
      onLessonIndexChange?.(0);
      return;
    }
    if (viewMode === "videos") {
      onLessonIndexChange?.(3);
      return;
    }
    const gameIdx = ENGLISH_MINI_GAMES.findIndex((g) => g.id === activeGameId);
    onLessonIndexChange?.(gameIdx >= 0 ? gameIdx : 0);
  }, [viewMode, activeGameId]);

  useEffect(() => {
    setSelectedItemId(null);
    setIsCorrect(null);
    setHasSpokenAloud(false);
    setBasketCount(0);
    setSelectedLeftPairId(null);
    setMatchedPairIds([]);
    setWrongRightPairId(null);
    setBagStepIdx(0);
    setBagSelectedOptId(null);
    setBagStepCorrect(null);
    completedRef.current = false;

    if (activeGameId === "kuromi-pronouns" && currentPronounMatchRound) {
      const copy = [...currentPronounMatchRound.pairs];
      // Xáo trộn cột phải để không trùng thẳng hàng với cột trái
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      if (copy.every((p, idx) => p.id === currentPronounMatchRound.pairs[idx]?.id) && copy.length > 1) {
        [copy[0], copy[1]] = [copy[1], copy[0]];
      }
      setShuffledRightPairs(copy);
    }

    if (viewMode !== "game") {
      speech.stop();
      return;
    }

    if (soundEnabled) {
      speech.stop();
      if (activeGameId === "kuromi-pronouns" && currentPronounMatchRound) {
        speech.speak(currentPronounMatchRound.titleEn, "en-US");
      } else if (activeGameId === "mystery-bag" && currentMysteryBagRound) {
        speech.speak(currentMysteryBagRound.steps[0].questionEn, "en-US");
      } else if (currentRound) {
        speech.speak(currentRound.kuromiSpeechEn, "en-US");
      }
    }
  }, [
    viewMode,
    activeGameId,
    level,
    roundIdx,
    deckSeed,
    currentRound,
    currentPronounMatchRound,
    currentMysteryBagRound,
  ]);

  const handleOpenGame = (
    gameId: EnglishMiniGameId,
    initialLevel: EnglishDifficultyLevel = 1,
  ) => {
    speech.stop();
    if (soundEnabled) playCardPlaceSound();
    setActiveGameId(gameId);
    setLevel(initialLevel);
    setDeckSeed((s) => s + 1);
    setRoundIdx(0);
    setAttemptsCount(0);
    setViewMode("game");
  };

  const handleOpenVideos = () => {
    if (soundEnabled) playCardPlaceSound();
    speech.stop();
    void fetchEnglishClips();
    setViewMode("videos");
  };

  const handlePickShopItem = (item: EnglishShopItem) => {
    if (isCorrect === true) return;
    setSelectedItemId(item.id);
    setAttemptsCount((c) => c + 1);

    if (item.id === currentRound.correctItemId) {
      if (activeGameId === "kuromi-shop" && targetBasketQty > 1) {
        const nextCount = basketCount + 1;
        setBasketCount(nextCount);
        const countWords = ["One", "Two", "Three", "Four"];
        const countWord = countWords[nextCount - 1] || String(nextCount);
        if (nextCount < targetBasketQty) {
          if (soundEnabled) playCardPlaceSound();
          speech.speak(`${countWord}!`, "en-US");
          onReaction?.(
            "happy",
            `🛒 Đã nhặt ${nextCount}/${targetBasketQty} món vào giỏ! Nấm chạm nhặt thêm ${
              targetBasketQty - nextCount
            } món nữa nhé!`,
          );
          return;
        }
      } else {
        setBasketCount(1);
      }

      setIsCorrect(true);
      if (soundEnabled) playRewardTone();
      onReaction?.(
        "happy",
        `🌟 Awesome! Đúng là "${item.englishName}" (${item.vietnameseName}) rồi! Nấm giỏi quá!`,
      );
      speech.speak(`Awesome! ${item.englishName}!`, "en-US");
    } else {
      setIsCorrect(false);
      if (soundEnabled) playAttentionChime();
      onReaction?.(
        "sad",
        `💡 Món này là "${item.englishName}" (${item.vietnameseName}). ${currentRound.hintVi}`,
      );
      speech.speak(item.englishName, "en-US");
    }
  };

  // Xử lý Nối 2 Cột cho Bài 3 (Ai Đang Làm Gì?)
  const handleSelectLeftPronoun = (pair: PronounMatchPair) => {
    if (matchedPairIds.includes(pair.id)) return;
    if (soundEnabled) playCardPlaceSound();
    setSelectedLeftPairId(pair.id);
    setWrongRightPairId(null);
    speech.speak(pair.pronounEn, "en-US");
  };

  const handleSelectRightAction = (rightPair: PronounMatchPair) => {
    if (matchedPairIds.includes(rightPair.id)) return;
    setAttemptsCount((c) => c + 1);

    if (!selectedLeftPairId) {
      if (soundEnabled) playAttentionChime();
      speech.speak(rightPair.actionEn, "en-US");
      onReaction?.(
        "happy",
        "👆 Nấm chạm chọn 1 nhân vật ở Cột Trái (He, She, It, They) trước rồi nối sang Cột Phải nhé!",
      );
      return;
    }

    if (selectedLeftPairId === rightPair.id) {
      const nextMatched = [...matchedPairIds, rightPair.id];
      setMatchedPairIds(nextMatched);
      setSelectedLeftPairId(null);
      setWrongRightPairId(null);
      if (soundEnabled) playRewardTone();
      speech.speak(rightPair.fullSentenceEn, "en-US");

      const totalPairs = currentPronounMatchRound?.pairs.length || 4;
      if (nextMatched.length >= totalPairs) {
        setIsCorrect(true);
        onReaction?.(
          "happy",
          "🎉 Xuất sắc! Nấm đã nối đúng tất cả các ngôi He, She, It, They rồi!",
        );
      } else {
        onReaction?.(
          "happy",
          `✨ Đúng rồi: "${rightPair.fullSentenceEn}" (${rightPair.fullSentenceVi})! Còn ${
            totalPairs - nextMatched.length
          } cặp nữa nhé!`,
        );
      }
    } else {
      setWrongRightPairId(rightPair.id);
      if (soundEnabled) playAttentionChime();
      speech.speak(rightPair.actionEn, "en-US");
      onReaction?.(
        "sad",
        "💡 Chưa khớp ngôi rồi! Nấm nhìn kỹ nhân vật bên trái (He / She / It / They) để nối lại nhé!",
      );
    }
  };

  // Xử lý Mở Túi 3 Bước cho Bài 4 (Chiếc Túi Bí Mật)
  const handlePickMysteryBagOption = (opt: MysteryBagOption) => {
    if (!currentMysteryStep || bagStepCorrect === true) return;
    setBagSelectedOptId(opt.id);
    setAttemptsCount((c) => c + 1);

    if (opt.id === currentMysteryStep.correctOptionId) {
      setBagStepCorrect(true);
      if (soundEnabled) playRewardTone();
      speech.speak(currentMysteryStep.speakingEn, "en-US");

      if (bagStepIdx < 2) {
        onReaction?.(
          "happy",
          `✨ Chuẩn luôn: "${opt.en}" (${opt.vi})! Chiếc túi đang mở rộng thêm kìa!`,
        );
        window.setTimeout(() => {
          const nextStep = (bagStepIdx + 1) as 0 | 1 | 2;
          setBagStepIdx(nextStep);
          setBagSelectedOptId(null);
          setBagStepCorrect(null);
          const nextStepObj = currentMysteryBagRound.steps[nextStep];
          if (soundEnabled && nextStepObj) {
            speech.speak(nextStepObj.questionEn, "en-US");
          }
        }, 900);
      } else {
        setIsCorrect(true);
        onReaction?.(
          "happy",
          `🎉 BÙM! Túi Bí Mật mở hết rồi: "${currentMysteryBagRound.targetNameEn}" (${currentMysteryBagRound.targetNameVi})!`,
        );
      }
    } else {
      setBagStepCorrect(false);
      if (soundEnabled) playAttentionChime();
      speech.speak(opt.en, "en-US");
      onReaction?.("sad", `💡 ${currentMysteryStep.hintVi}`);
    }
  };

  const handleListenSingleWord = (
    e: React.MouseEvent,
    item: EnglishShopItem,
  ) => {
    e.stopPropagation();
    speech.speak(item.englishName, "en-US");
    onReaction?.(
      "happy",
      `🔊 "${item.englishName}" nghĩa là: ${item.vietnameseName}`,
    );
  };

  const handlePracticeSpeaking = () => {
    setHasSpokenAloud(true);
    if (soundEnabled) playRewardTone();
    const targetText =
      activeGameId === "mystery-bag" && currentMysteryStep
        ? currentMysteryStep.speakingEn
        : activeGameId === "kuromi-pronouns" && currentPronounMatchRound
          ? currentPronounMatchRound.pairs.map((p) => p.fullSentenceEn).join(" ")
          : currentRound.speakingTargetEn;
    speech.speak(targetText, "en-US");
    onReaction?.(
      "happy",
      `🎙️ Giọng Nấm nói tiếng Anh siêu chuẩn luôn! Kuromi tặng Nấm 1 tim tím nhé! 💜`,
    );
  };

  const totalRoundsInCurrentLevel =
    activeGameId === "kuromi-pronouns"
      ? pronounMatchList.length
      : activeGameId === "mystery-bag"
        ? mysteryBagList.length
        : rounds.length;

  const handleNextRoundOrFinish = () => {
    speech.stop();
    if (roundIdx + 1 < totalRoundsInCurrentLevel) {
      setRoundIdx((r) => r + 1);
    } else if (!completedRef.current) {
      completedRef.current = true;
      onComplete({
        attempts: Math.max(1, attemptsCount),
        answers: [
          `Hoàn thành ${currentGameMeta.title} - Cấp ${level}`,
        ],
      });
    }
  };

  const activeClip = englishClips[activeClipIdx] || englishClips[0] || null;
  const activeSongLesson = activeClip
    ? getEnglishSongLessonForClip(
        activeClip.filename,
        activeClip.title,
        activeClipIdx,
      )
    : null;

  const activeSubtitleCue =
    activeSongLesson?.subtitles.find(
      (cue) =>
        videoCurrentTime >= cue.startSec && videoCurrentTime <= cue.endSec,
    ) ||
    activeSongLesson?.subtitles[0] ||
    null;

  const activeSongQuizRound =
    activeSongLesson?.quizRounds[
      songQuizIdx % Math.max(1, activeSongLesson.quizRounds.length)
    ] || null;

  const handleSelectSongClip = (idx: number) => {
    if (soundEnabled) playCardPlaceSound();
    speech.stop();
    setActiveClipIdx(idx);
    setVideoCurrentTime(0);
    setSongStudioTab("vocab");
    setSongQuizIdx(0);
    setSelectedSongQuizOptionId(null);
    setSongQuizIsCorrect(null);
  };

  const handleTogglePlaybackRate = () => {
    const nextRate: 1 | 0.75 = playbackRate === 1 ? 0.75 : 1;
    setPlaybackRate(nextRate);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextRate;
    }
    onReaction?.(
      "happy",
      nextRate === 0.75
        ? "🐢 Đã bật chế độ phát chậm 0.75x để Nấm nghe rõ từng từ tiếng Anh!"
        : "⚡ Đã quay về tốc độ phát chuẩn 1.0x!",
    );
  };

  const handleReplayCurrentCue = () => {
    if (!activeSubtitleCue) return;
    if (videoRef.current) {
      videoRef.current.currentTime = activeSubtitleCue.startSec;
      videoRef.current.play().catch(() => {});
    }
    speech.speak(activeSubtitleCue.en, "en-US");
  };

  const handleTapSongVocabCard = (card: EnglishSongVocabCard) => {
    if (soundEnabled) playCardPlaceSound();
    setLearnedVocabIds((prev) => ({ ...prev, [card.id]: true }));
    if (videoRef.current) {
      videoRef.current.currentTime = card.startSec;
    }
    speech.speak(card.english, "en-US");
    onReaction?.(
      "happy",
      `🔊 "${card.english}" (${card.phonetic}) nghĩa là: ${card.vietnamese}!`,
    );
  };

  const handlePickSongQuizOption = (option: EnglishSongQuizOption) => {
    if (!activeSongQuizRound || songQuizIsCorrect === true) return;
    setSelectedSongQuizOptionId(option.id);
    if (option.id === activeSongQuizRound.correctOptionId) {
      setSongQuizIsCorrect(true);
      if (soundEnabled) playRewardTone();
      speech.speak(`Awesome! ${option.english}!`, "en-US");
      onReaction?.(
        "happy",
        `🌟 Chính xác! "${option.english}" (${option.vietnamese})! Nấm nhớ nội dung clip siêu đỉnh!`,
      );
    } else {
      setSongQuizIsCorrect(false);
      if (soundEnabled) playAttentionChime();
      speech.speak(option.english, "en-US");
      onReaction?.("sad", `💡 ${activeSongQuizRound.hintVi}`);
    }
  };

  const handleNextSongQuizOrFinish = () => {
    if (!activeSongLesson || !activeClip) return;
    speech.stop();
    if (songQuizIdx + 1 < activeSongLesson.quizRounds.length) {
      setSongQuizIdx((i) => i + 1);
      setSelectedSongQuizOptionId(null);
      setSongQuizIsCorrect(null);
      const nextQ = activeSongLesson.quizRounds[songQuizIdx + 1];
      if (soundEnabled && nextQ) {
        speech.speak(nextQ.questionEn, "en-US");
      }
    } else {
      setCompletedSongClipIds((prev) => ({ ...prev, [activeClip.id]: true }));
      if (soundEnabled) playRewardTone();
      onComplete({
        attempts: 1,
        answers: [
          `Hoàn thành bài hát/truyện Tiếng Anh: ${activeSongLesson.displayTitle}`,
        ],
      });
    }
  };

  return (
    <div className="wb-content english-wb kuromi-english-suite">
      {/* =====================================================================
          MÀN HÌNH MENU: CHỌN CẤP ĐỘ Ở BẢNG NGOÀI + 4 BÀI HỌC CÙNG KUROMI / BÀI HÁT
         ===================================================================== */}
      {viewMode === "menu" && (
        <div className="lesson-picker-screen math-minigame-lobby">
          <div className="reading-level-header single-row-level-bar">
            <div className="reading-level-pills">
              <button
                type="button"
                className={`level-switch-pill ${
                  level === 1 ? "active-pink" : ""
                }`}
                onClick={() => setLevel(1)}
              >
                🌱 Cấp 1: Từ Đơn
              </button>
              <button
                type="button"
                className={`level-switch-pill ${
                  level === 2 ? "active-orange" : ""
                }`}
                onClick={() => setLevel(2)}
              >
                ⭐ Cấp 2: Cụm Từ
              </button>
              <button
                type="button"
                className={`level-switch-pill ${
                  level === 3 ? "active-pink" : ""
                }`}
                onClick={() => setLevel(3)}
              >
                👑 Cấp 3: Mẫu Câu
              </button>
            </div>

            <button
              type="button"
              className="chunky-btn chunky-gold btn-sm english-song-header-btn"
              onClick={handleOpenVideos}
              title={`Xem ${englishClips.length} video bài hát tiếng Anh`}
            >
              🎵 Bài Hát
            </button>
          </div>

          <div className="math-minigame-cards-grid coded-3d-cards-grid">
            {ENGLISH_MINI_GAMES.map((game, idx) => (
              <button
                key={game.id}
                type="button"
                className={`math-minigame-card coded-3d-minigame-card theme-card-${idx + 1}`}
                aria-label={`${game.badge}: ${game.title}`}
                onClick={() => handleOpenGame(game.id, level)}
              >
                <div className="coded-3d-thumb-box">
                  <img
                    src={game.heroImage}
                    alt={game.title}
                    className="coded-3d-thumb-img"
                  />
                </div>
                <div className="coded-3d-card-body">
                  <span className="coded-3d-badge">{game.badge}</span>
                  <strong className="coded-3d-title">{game.title}</strong>
                  <span className="coded-3d-sub-mechanic">{game.subtitle}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          MÀN HÌNH CHẾ ĐỘ: HỌC QUA BÀI HÁT (CLIP TIẾNG ANH TRONG D:\Nấm học\Nhạc tiếng anh)
         ===================================================================== */}
      {viewMode === "videos" && (
        <div className="kuromi-shop-stage">
          <div className="kuromi-shop-topbar">
            <div className="kuromi-topbar-left">
              <button
                type="button"
                className="chunky-btn chunky-pink btn-sm"
                onClick={() => setViewMode("menu")}
              >
                <ArrowLeft size={14} /> Chọn bài
              </button>
              <span className="kuromi-game-badge">
                🎵 Học Qua Bài Hát ({englishClips.length} clip)
              </span>
            </div>

            <div className="kuromi-topbar-right">
              <button
                type="button"
                className="chunky-btn chunky-blue btn-sm"
                onClick={() => {
                  setShowDownloader((v) => !v);
                  setDownloadMessage(null);
                }}
              >
                📥 {showDownloader ? "Đóng khung tải" : "Dán link FB/YouTube"}
              </button>
              <button
                type="button"
                className="chunky-btn chunky-green btn-sm"
                onClick={() =>
                  onComplete({
                    attempts: 1,
                    answers: [
                      activeClip
                        ? `Hát Tiếng Anh: ${activeClip.title}`
                        : "Hoàn thành Học Qua Bài Hát Tiếng Anh",
                    ],
                  })
                }
              >
                <Star size={14} fill="currentColor" /> Nhận Sao!
              </button>
            </div>
          </div>

          {/* Hộp dán link Facebook Reel / YouTube Shorts / TikTok cho Ba Mẹ */}
          {showDownloader && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 8,
                padding: "8px 12px",
                borderRadius: 14,
                background: "#f3e8ff",
                border: "2px solid #c084fc",
              }}
            >
              <input
                type="url"
                value={downloadUrlInput}
                onChange={(e) => setDownloadUrlInput(e.target.value)}
                placeholder="Dán link Facebook Reel, YouTube hoặc TikTok vào đây..."
                style={{
                  flex: "2 1 220px",
                  padding: "6px 10px",
                  borderRadius: 10,
                  border: "1.5px solid #a855f7",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              />
              <input
                type="text"
                value={downloadTitleInput}
                onChange={(e) => setDownloadTitleInput(e.target.value)}
                placeholder="Đặt tên bài (tùy chọn, VD: Bài hát Monsters)"
                style={{
                  flex: "1 1 160px",
                  padding: "6px 10px",
                  borderRadius: 10,
                  border: "1.5px solid #d8b4fe",
                  fontSize: "0.85rem",
                }}
              />
              <button
                type="button"
                className="chunky-btn chunky-gold btn-sm"
                onClick={() => void handleDownloadFromUrl()}
                disabled={downloadingClip || !downloadUrlInput.trim()}
              >
                {downloadingClip ? "⏳ Đang tải..." : "⬇️ Tải vào App"}
              </button>
              <button
                type="button"
                className="chunky-btn chunky-blue btn-sm"
                onClick={() => void fetchEnglishClips()}
                disabled={loadingClips}
              >
                🔄 Quét thư mục
              </button>
              {downloadMessage && (
                <span
                  style={{
                    width: "100%",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: "#5b21b6",
                  }}
                >
                  {downloadMessage}
                </span>
              )}
            </div>
          )}

          {englishClips.length === 0 ? (
            <div
              className="kuromi-order-banner"
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
                gap: "10px",
                padding: "20px",
              }}
            >
              <img
                src="/assets/char-kuromi.png"
                alt="Kuromi"
                style={{ width: 72, height: 72, objectFit: "contain" }}
              />
              <strong style={{ fontSize: "1.1rem", color: "#5b21b6" }}>
                🎵 Thư mục Nhạc Tiếng Anh của Nấm đã sẵn sàng!
              </strong>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.92rem",
                  color: "#475569",
                  maxWidth: 580,
                }}
              >
                Ba mẹ bấm <strong>📥 Dán link FB/YouTube</strong> ở góc trên để
                tải tự động, hoặc chép file (<code>.mp4</code>,{" "}
                <code>.mp3</code>) vào thư mục:
              </p>
              <code
                style={{
                  background: "#f3e8ff",
                  color: "#6b21a8",
                  padding: "6px 14px",
                  borderRadius: 12,
                  fontWeight: 800,
                  fontSize: "0.95rem",
                }}
              >
                {englishFolderPath}
              </code>
            </div>
          ) : (
            <div
              className="english-song-studio-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "0.86fr 1.52fr 0.94fr",
                gap: "10px",
                flex: 1,
                minHeight: 0,
                alignItems: "stretch",
              }}
            >
              {/* ===============================================================
                  CỘT 1 (TRÁI): KHUNG VIDEO DỌC 9:16 + PHỤ ĐỀ NHẠY THEO GIÂY + TUA CHẬM
                 =============================================================== */}
              <div
                style={{
                  background:
                    "linear-gradient(180deg, #1e1b4b 0%, #311042 100%)",
                  borderRadius: 16,
                  padding: "8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  minHeight: 0,
                  border: "2px solid #c084fc",
                  boxShadow: "0 6px 16px rgba(91, 33, 182, 0.18)",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    minHeight: 0,
                    borderRadius: 12,
                    overflow: "hidden",
                    background: "#0f0720",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  {activeClip?.mediaType === "audio" ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 10,
                        padding: 16,
                        color: "#fff",
                        textAlign: "center",
                      }}
                    >
                      <img
                        src="/assets/char-kuromi.png"
                        alt="Kuromi"
                        style={{ width: 72, height: 72, objectFit: "contain" }}
                      />
                      <strong>
                        {activeSongLesson?.displayTitle || activeClip.title}
                      </strong>
                      <audio
                        key={activeClip.streamUrl}
                        src={activeClip.streamUrl}
                        controls
                        autoPlay
                        onTimeUpdate={(e) =>
                          setVideoCurrentTime(e.currentTarget.currentTime)
                        }
                        style={{ width: "100%" }}
                      />
                    </div>
                  ) : (
                    <video
                      ref={videoRef}
                      key={activeClip?.streamUrl}
                      src={activeClip?.streamUrl}
                      controls
                      autoPlay
                      playsInline
                      onLoadedMetadata={(e) => {
                        e.currentTarget.playbackRate = playbackRate;
                      }}
                      onTimeUpdate={(e) =>
                        setVideoCurrentTime(e.currentTarget.currentTime)
                      }
                      onEnded={() => {
                        onReaction?.(
                          "happy",
                          "🎉 Nấm xem xong clip rồi! Bấm sang tab '🎮 Thử Thách' ở cột giữa để trả lời câu hỏi cùng Kuromi nhé!",
                        );
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  )}
                </div>

                {/* Hộp Phụ Đề Song Ngữ Nhạy Theo Giây (Bấm để nghe phát âm) */}
                {activeSubtitleCue && (
                  <button
                    type="button"
                    onClick={handleReplayCurrentCue}
                    title="Chạm để nghe lại câu tiếng Anh này"
                    style={{
                      background:
                        "linear-gradient(135deg, #fef08a 0%, #fde047 100%)",
                      border: "2px solid #eab308",
                      borderRadius: 12,
                      padding: "6px 10px",
                      textAlign: "center",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      boxShadow: "0 3px 0 #ca8a04",
                    }}
                  >
                    <strong
                      lang="en"
                      style={{
                        fontSize: "0.9rem",
                        color: "#1e1b4b",
                        lineHeight: 1.2,
                      }}
                    >
                      🎤 "{activeSubtitleCue.en}"
                    </strong>
                    <span
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        color: "#713f12",
                        lineHeight: 1.2,
                      }}
                    >
                      {activeSubtitleCue.vi}
                    </span>
                  </button>
                )}

                {/* Thanh nút điều khiển học tập: Tốc độ 0.75x & Lặp câu */}
                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    type="button"
                    onClick={handleTogglePlaybackRate}
                    style={{
                      flex: 1,
                      padding: "5px 8px",
                      borderRadius: 10,
                      border:
                        playbackRate === 0.75
                          ? "2px solid #fbbf24"
                          : "1.5px solid #a855f7",
                      background:
                        playbackRate === 0.75 ? "#fef3c7" : "#3b0764",
                      color: playbackRate === 0.75 ? "#92400e" : "#f3e8ff",
                      fontWeight: 800,
                      fontSize: "0.76rem",
                      cursor: "pointer",
                    }}
                  >
                    {playbackRate === 0.75
                      ? "🐢 Đang chậm 0.75x"
                      : "🐢 Nghe chậm 0.75x"}
                  </button>
                  <button
                    type="button"
                    onClick={handleReplayCurrentCue}
                    style={{
                      flex: 1,
                      padding: "5px 8px",
                      borderRadius: 10,
                      border: "1.5px solid #a855f7",
                      background: "#4c1d95",
                      color: "#ffffff",
                      fontWeight: 800,
                      fontSize: "0.76rem",
                      cursor: "pointer",
                    }}
                  >
                    🔁 Lặp câu đang hát
                  </button>
                </div>
              </div>

              {/* ===============================================================
                  CỘT 2 (GIỮA): BẢNG HỌC TƯƠNG TÁC (THẺ TỪ VỰNG SÁNG THEO GIÂY + MINI-GAME)
                 =============================================================== */}
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: 16,
                  border: "2.5px solid #d8b4fe",
                  padding: "10px 12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  minHeight: 0,
                  boxShadow: "0 6px 16px rgba(147, 51, 234, 0.08)",
                }}
              >
                {/* Đầu bảng Cột Giữa: Tên bài sư phạm + Chuyển Tab Học Từ / Thử Thách */}
                {activeSongLesson && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                      paddingBottom: 6,
                      borderBottom: "2px dashed #f3e8ff",
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <span style={{ fontSize: "1.2rem" }}>
                          {activeSongLesson.icon}
                        </span>
                        <strong
                          style={{
                            fontSize: "0.98rem",
                            color: "#4c1d95",
                            lineHeight: 1.15,
                          }}
                        >
                          {activeSongLesson.displayTitle}
                        </strong>
                      </div>
                      <span
                        style={{
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          color: "#7e22ce",
                        }}
                      >
                        {activeSongLesson.vietnameseTitle} ·{" "}
                        {activeSongLesson.topicTag}
                      </span>
                    </div>

                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        type="button"
                        onClick={() => {
                          if (soundEnabled) playCardPlaceSound();
                          setSongStudioTab("vocab");
                        }}
                        style={{
                          padding: "6px 11px",
                          borderRadius: 12,
                          border:
                            songStudioTab === "vocab"
                              ? "2px solid #9333ea"
                              : "2px solid #e9d5ff",
                          background:
                            songStudioTab === "vocab"
                              ? "linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)"
                              : "#faf5ff",
                          color:
                            songStudioTab === "vocab" ? "#ffffff" : "#6b21a8",
                          fontWeight: 800,
                          fontSize: "0.8rem",
                          cursor: "pointer",
                        }}
                      >
                        🃏 Từ Vựng ({activeSongLesson.vocabCards.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (soundEnabled) playCardPlaceSound();
                          setSongStudioTab("quiz");
                          setSelectedSongQuizOptionId(null);
                          setSongQuizIsCorrect(null);
                          const firstQ =
                            activeSongLesson.quizRounds[songQuizIdx] ||
                            activeSongLesson.quizRounds[0];
                          if (soundEnabled && firstQ) {
                            speech.speak(firstQ.questionEn, "en-US");
                          }
                        }}
                        style={{
                          padding: "6px 11px",
                          borderRadius: 12,
                          border:
                            songStudioTab === "quiz"
                              ? "2px solid #ea580c"
                              : "2px solid #fed7aa",
                          background:
                            songStudioTab === "quiz"
                              ? "linear-gradient(135deg, #f97316 0%, #ea580c 100%)"
                              : "#fff7ed",
                          color:
                            songStudioTab === "quiz" ? "#ffffff" : "#c2410c",
                          fontWeight: 800,
                          fontSize: "0.8rem",
                          cursor: "pointer",
                        }}
                      >
                        🎮 Thử Thách ({activeSongLesson.quizRounds.length})
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 1: THẺ TỪ VỰNG & MẪU CÂU PHÁT SÁNG THEO GIÂY VIDEO */}
                {activeSongLesson && songStudioTab === "vocab" && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      flex: 1,
                      minHeight: 0,
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          activeSongLesson.vocabCards.length <= 4
                            ? "repeat(2, 1fr)"
                            : "repeat(3, 1fr)",
                        gap: 8,
                        flex: 1,
                        minHeight: 0,
                        overflowY: "auto",
                        padding: "2px",
                      }}
                    >
                      {activeSongLesson.vocabCards.map((card) => {
                        const isCueActive =
                          videoCurrentTime >= card.startSec &&
                          videoCurrentTime <= card.endSec;
                        const isLearned = !!learnedVocabIds[card.id];
                        return (
                          <button
                            key={card.id}
                            type="button"
                            onClick={() => handleTapSongVocabCard(card)}
                            style={{
                              position: "relative",
                              borderRadius: 14,
                              padding: "8px 6px",
                              border: isCueActive
                                ? "3px solid #eab308"
                                : isLearned
                                  ? "2px solid #22c55e"
                                  : "2px solid #e9d5ff",
                              background: isCueActive
                                ? "linear-gradient(180deg, #fef9c3 0%, #fef08a 100%)"
                                : isLearned
                                  ? "#f0fdf4"
                                  : "#faf5ff",
                              boxShadow: isCueActive
                                ? "0 0 0 3px rgba(234, 179, 8, 0.28), 0 6px 12px rgba(202, 138, 4, 0.2)"
                                : "0 3px 0 rgba(147, 51, 234, 0.12)",
                              transform: isCueActive
                                ? "translateY(-2px) scale(1.02)"
                                : "none",
                              transition: "all 0.2s ease",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 4,
                              cursor: "pointer",
                              textAlign: "center",
                            }}
                          >
                            {/* Nhãn trạng thái góc trên */}
                            <span
                              style={{
                                position: "absolute",
                                top: 5,
                                right: 6,
                                fontSize: "0.66rem",
                                fontWeight: 800,
                                padding: "1px 6px",
                                borderRadius: 999,
                                background: isCueActive
                                  ? "#ca8a04"
                                  : isLearned
                                    ? "#16a34a"
                                    : "#e9d5ff",
                                color:
                                  isCueActive || isLearned
                                    ? "#ffffff"
                                    : "#6b21a8",
                              }}
                            >
                              {isCueActive
                                ? "🎤 Đang hát"
                                : isLearned
                                  ? "✓ Đã nghe"
                                  : `0:${String(Math.floor(card.startSec)).padStart(2, "0")}`}
                            </span>

                            <div
                              style={{
                                width: 52,
                                height: 52,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: 8,
                              }}
                            >
                              <img
                                src={card.imageUrl}
                                alt={card.english}
                                style={{
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                  objectFit: "contain",
                                  filter:
                                    "drop-shadow(0 3px 5px rgba(0,0,0,0.12))",
                                }}
                              />
                            </div>

                            <strong
                              lang="en"
                              style={{
                                fontSize: "0.88rem",
                                color: "#3b0764",
                                lineHeight: 1.15,
                              }}
                            >
                              {card.emoji} {card.english}
                            </strong>
                            <span
                              style={{
                                fontSize: "0.74rem",
                                fontWeight: 700,
                                color: "#6b21a8",
                                lineHeight: 1.15,
                              }}
                            >
                              {card.vietnamese}
                            </span>
                            <small
                              style={{
                                fontSize: "0.68rem",
                                color: "#7e22ce",
                                opacity: 0.85,
                              }}
                            >
                              🔊 {card.phonetic}
                            </small>
                          </button>
                        );
                      })}
                    </div>

                    {/* Thanh chân Cột Giữa: Gợi ý học & Nút mở nhanh Thử Thách */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 8,
                        padding: "6px 10px",
                        borderRadius: 12,
                        background: "#f3e8ff",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.76rem",
                          fontWeight: 700,
                          color: "#5b21b6",
                        }}
                      >
                        💡 Chạm thẻ để nghe phát âm & tua video tới đúng câu!
                      </span>
                      <button
                        type="button"
                        className="chunky-btn chunky-gold btn-sm"
                        onClick={() => {
                          if (soundEnabled) playCardPlaceSound();
                          setSongStudioTab("quiz");
                          setSongQuizIdx(0);
                          setSelectedSongQuizOptionId(null);
                          setSongQuizIsCorrect(null);
                          const firstQ = activeSongLesson.quizRounds[0];
                          if (soundEnabled && firstQ) {
                            speech.speak(firstQ.questionEn, "en-US");
                          }
                        }}
                      >
                        🎮 Thử Thách Bài Này →
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 2: MINI-GAME HỎI ĐÁP CÙNG KUROMI THEO NỘI DUNG VIDEO */}
                {activeSongLesson &&
                  songStudioTab === "quiz" &&
                  activeSongQuizRound && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                        flex: 1,
                        minHeight: 0,
                        justifyContent: "space-between",
                      }}
                    >
                      {/* Hộp câu hỏi của Kuromi */}
                      <div
                        onClick={() =>
                          speech.speak(activeSongQuizRound.questionEn, "en-US")
                        }
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "10px 12px",
                          borderRadius: 14,
                          background:
                            "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)",
                          border: "2px solid #c084fc",
                          cursor: "pointer",
                        }}
                      >
                        <img
                          src="/assets/char-kuromi.png"
                          alt="Kuromi"
                          style={{
                            width: 50,
                            height: 50,
                            objectFit: "contain",
                            flexShrink: 0,
                          }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              marginBottom: 2,
                            }}
                          >
                            <span
                              style={{
                                fontSize: "0.72rem",
                                fontWeight: 800,
                                padding: "2px 8px",
                                borderRadius: 999,
                                background: "#9333ea",
                                color: "#fff",
                              }}
                            >
                              Câu {songQuizIdx + 1}/
                              {activeSongLesson.quizRounds.length}
                            </span>
                            <strong
                              lang="en"
                              style={{
                                fontSize: "0.92rem",
                                color: "#4c1d95",
                              }}
                            >
                              🔊 "{activeSongQuizRound.questionEn}"
                            </strong>
                          </div>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "0.82rem",
                              fontWeight: 700,
                              color: "#334155",
                            }}
                          >
                            {activeSongQuizRound.questionVi}
                          </p>
                        </div>
                      </div>

                      {/* 3 Thẻ Đáp Án Hình Ảnh 3D */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(3, 1fr)",
                          gap: 10,
                          flex: 1,
                          minHeight: 0,
                          alignItems: "stretch",
                        }}
                      >
                        {activeSongQuizRound.options.map((opt) => {
                          const isPicked = selectedSongQuizOptionId === opt.id;
                          const isRight =
                            isPicked &&
                            opt.id === activeSongQuizRound.correctOptionId;
                          const isWrong =
                            isPicked &&
                            opt.id !== activeSongQuizRound.correctOptionId;

                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handlePickSongQuizOption(opt)}
                              style={{
                                borderRadius: 16,
                                padding: "10px 8px",
                                border: isRight
                                  ? "3px solid #16a34a"
                                  : isWrong
                                    ? "3px solid #ef4444"
                                    : "2.5px solid #e9d5ff",
                                background: isRight
                                  ? "#dcfce7"
                                  : isWrong
                                    ? "#fee2e2"
                                    : "#ffffff",
                                boxShadow: "0 4px 0 rgba(147, 51, 234, 0.14)",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 6,
                                cursor: "pointer",
                                textAlign: "center",
                              }}
                            >
                              <div
                                style={{
                                  width: 68,
                                  height: 68,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={opt.imageUrl}
                                  alt={opt.english}
                                  style={{
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                    objectFit: "contain",
                                    filter:
                                      "drop-shadow(0 4px 6px rgba(0,0,0,0.14))",
                                  }}
                                />
                              </div>
                              <strong
                                lang="en"
                                style={{
                                  fontSize: "0.92rem",
                                  color: "#3b0764",
                                }}
                              >
                                {opt.emoji} {opt.english}
                              </strong>
                              <span
                                style={{
                                  fontSize: "0.78rem",
                                  fontWeight: 700,
                                  color: "#64748b",
                                }}
                              >
                                {opt.vietnamese}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Thanh trạng thái trả lời & nút Câu tiếp theo / Nhận Sao */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 8,
                          padding: "8px 12px",
                          borderRadius: 12,
                          background:
                            songQuizIsCorrect === true
                              ? "#dcfce7"
                              : songQuizIsCorrect === false
                                ? "#fef3c7"
                                : "#f8fafc",
                          border:
                            songQuizIsCorrect === true
                              ? "2px solid #22c55e"
                              : "1.5px solid #e2e8f0",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.8rem",
                            fontWeight: 800,
                            color:
                              songQuizIsCorrect === true
                                ? "#166534"
                                : songQuizIsCorrect === false
                                  ? "#92400e"
                                  : "#64748b",
                          }}
                        >
                          {songQuizIsCorrect === true
                            ? "🎉 Chính xác! Nấm giỏi quá!"
                            : songQuizIsCorrect === false
                              ? `💡 ${activeSongQuizRound.hintVi}`
                              : "👆 Nấm chạm vào thẻ hình đúng để trả lời Kuromi nhé!"}
                        </span>

                        {songQuizIsCorrect === true && (
                          <button
                            type="button"
                            className="chunky-btn chunky-green btn-sm"
                            onClick={handleNextSongQuizOrFinish}
                          >
                            {songQuizIdx + 1 <
                            activeSongLesson.quizRounds.length
                              ? "Câu tiếp theo →"
                              : "🏆 Hoàn thành & Nhận Sao!"}
                          </button>
                        )}
                      </div>
                    </div>
                  )}
              </div>

              {/* ===============================================================
                  CỘT 3 (PHẢI): DANH SÁCH 8 BÀI HỌC GỌN GÀNG (CHUẨN HÓA TÊN & CHỦ ĐỀ)
                 =============================================================== */}
              <div
                style={{
                  background: "#faf5ff",
                  borderRadius: 16,
                  border: "2px solid #e9d5ff",
                  padding: "8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  minHeight: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "2px 6px 4px",
                    borderBottom: "1.5px solid #e9d5ff",
                  }}
                >
                  <strong style={{ fontSize: "0.82rem", color: "#5b21b6" }}>
                    📚 Danh Sách Bài Học ({englishClips.length})
                  </strong>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: "#7e22ce",
                    }}
                  >
                    Nhạc & Truyện
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    overflowY: "auto",
                    paddingRight: 2,
                    flex: 1,
                    minHeight: 0,
                  }}
                >
                  {englishClips.map((clip, idx) => {
                    const lesson = getEnglishSongLessonForClip(
                      clip.filename,
                      clip.title,
                      idx,
                    );
                    const isSelected = idx === activeClipIdx;
                    const isDone = !!completedSongClipIds[clip.id];

                    return (
                      <button
                        key={clip.id}
                        type="button"
                        className={`wb-lesson-row ${
                          isSelected ? "active" : ""
                        }`}
                        style={{
                          padding: "7px 10px",
                          border: isSelected
                            ? "2.5px solid #9333ea"
                            : isDone
                              ? "2px solid #86efac"
                              : "1.5px solid #e9d5ff",
                          background: isSelected
                            ? "linear-gradient(135deg, #f3e8ff 0%, #fae8ff 100%)"
                            : isDone
                              ? "#f0fdf4"
                              : "#ffffff",
                          borderRadius: 12,
                          textAlign: "left",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                          boxShadow: isSelected
                            ? "0 3px 8px rgba(147, 51, 234, 0.16)"
                            : "none",
                        }}
                        onClick={() => handleSelectSongClip(idx)}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 4,
                          }}
                        >
                          <strong
                            style={{
                              fontSize: "0.82rem",
                              color: "#3b0764",
                              lineHeight: 1.2,
                            }}
                          >
                            {lesson.icon} {lesson.orderLabel} ·{" "}
                            {lesson.displayTitle}
                          </strong>
                          {isDone && (
                            <span
                              style={{
                                fontSize: "0.68rem",
                                fontWeight: 800,
                                color: "#15803d",
                                background: "#dcfce7",
                                padding: "1px 6px",
                                borderRadius: 999,
                                flexShrink: 0,
                              }}
                            >
                              ✓ Đã học
                            </span>
                          )}
                        </div>

                        <span
                          style={{
                            fontSize: "0.73rem",
                            fontWeight: 600,
                            color: "#475569",
                            lineHeight: 1.15,
                          }}
                        >
                          {lesson.vietnameseTitle}
                        </span>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            marginTop: 2,
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.68rem",
                              fontWeight: 800,
                              padding: "1px 7px",
                              borderRadius: 999,
                              background:
                                lesson.clipType === "story"
                                  ? "#ffedd5"
                                  : "#f3e8ff",
                              color:
                                lesson.clipType === "story"
                                  ? "#c2410c"
                                  : "#6b21a8",
                            }}
                          >
                            {lesson.categoryBadge}
                          </span>
                          <span
                            style={{
                              fontSize: "0.68rem",
                              fontWeight: 700,
                              color: "#7e22ce",
                            }}
                          >
                            · {lesson.vocabCards.length} từ
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          MÀN HÌNH TRÒ CHƠI: MỖI LẦN VÀO CHỈ HỌC ĐÚNG 1 CẤP ĐỘ ĐÃ CHỌN Ở BẢNG NGOÀI
         ===================================================================== */}
      {viewMode === "game" && currentRound && (
        <div className="kuromi-shop-stage">
          {/* 1. THANH ĐIỀU KHIỂN ĐỈNH BẢNG: CHỌN BÀI, NHÃN CẤP ĐỘ HIỆN TẠI, NGHE LẠI */}
          <div className="kuromi-shop-topbar">
            <div className="kuromi-topbar-left">
              <button
                type="button"
                className="chunky-btn chunky-pink btn-sm"
                onClick={() => {
                  speech.stop();
                  setViewMode("menu");
                }}
              >
                <ArrowLeft size={14} /> Chọn bài khác
              </button>
              <span className="kuromi-game-badge">
                {currentGameMeta.title} ·{" "}
                {level === 1
                  ? "🌱 Cấp 1 (Từ đơn)"
                  : level === 2
                    ? "⭐ Cấp 2 (Cụm từ)"
                    : "👑 Cấp 3 (Mẫu câu)"}{" "}
                · Màn {(roundIdx % totalRoundsInCurrentLevel) + 1}/
                {totalRoundsInCurrentLevel}
              </span>
            </div>

            <div className="kuromi-topbar-right">
              <button
                type="button"
                className="chunky-btn chunky-blue btn-sm"
                onClick={() => {
                  const textToSpeak =
                    activeGameId === "kuromi-pronouns" && currentPronounMatchRound
                      ? currentPronounMatchRound.titleEn
                      : activeGameId === "mystery-bag" && currentMysteryStep
                        ? currentMysteryStep.questionEn
                        : currentRound.kuromiSpeechEn;
                  speech.speak(textToSpeak, "en-US");
                }}
                title="Nghe lại câu tiếng Anh của Kuromi"
              >
                <Volume2 size={14} /> Nghe lại
              </button>
            </div>
          </div>

          {/* =================================================================
              MODULE 1 & MODULE 2:
              - BÀI 1 (kuromi-shop): Kệ Hàng + Giỏ Mua Hàng Đếm Số Lượng
              - BÀI 2 (kuromi-actions): Sân Khấu Động Từ & Phản Xạ Cơ Thể
             ================================================================= */}
          {(activeGameId === "kuromi-shop" ||
            activeGameId === "kuromi-actions") && (
            <>
              {/* Lời thoại đặt hàng / hiệu lệnh của Kuromi */}
              <div
                className="kuromi-order-banner"
                onClick={() => speech.speak(currentRound.kuromiSpeechEn, "en-US")}
                title="Chạm để nghe Kuromi nói tiếng Anh"
              >
                <div className="kuromi-avatar-pill">
                  <img src="/assets/char-kuromi.png" alt="Kuromi" />
                  <span>
                    {activeGameId === "kuromi-shop"
                      ? "Kuromi mua hàng:"
                      : "Kuromi hô khẩu hiệu:"}
                  </span>
                </div>

                <div className="kuromi-order-bubble-body">
                  <div className="kuromi-order-en-row">
                    <strong className="kuromi-order-en" lang="en">
                      "{currentRound.kuromiSpeechEn}"
                    </strong>
                    <span className="kuromi-grammar-tag">
                      ✨ {currentRound.grammarTag}
                    </span>
                    {activeGameId === "kuromi-actions" && (
                      <span className="kuromi-tpr-action-tag">
                        💃 Đứng dậy làm động tác cùng Kuromi!
                      </span>
                    )}
                  </div>
                  <p className="kuromi-order-vi">{currentRound.kuromiSpeechVi}</p>
                </div>

                <button
                  type="button"
                  className="kuromi-replay-voice-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    speech.speak(currentRound.kuromiSpeechEn, "en-US");
                  }}
                  title="Bấm nghe lại"
                >
                  <Headphones size={16} />
                </button>
              </div>

              {/* Kệ Hàng 4 Món hoặc 4 Thẻ Động Từ */}
              <div className="kuromi-shelf-showcase">
                <button
                  type="button"
                  className="music-slide-arrow"
                  disabled={roundIdx <= 0}
                  onClick={() => setRoundIdx((r) => Math.max(0, r - 1))}
                  title="Câu trước"
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="kuromi-shelf-grid">
                  {currentRound.items.map((item) => {
                    const isSelected = selectedItemId === item.id;
                    const isRightItem = item.id === currentRound.correctItemId;
                    const palette = item.colorKey
                      ? ENGLISH_COLOR_PALETTE[item.colorKey]
                      : null;

                    let stateClass = "";
                    if (isSelected && isCorrect === true) {
                      stateClass = "item-correct";
                    } else if (isSelected && isCorrect === false) {
                      stateClass = "item-wrong";
                    } else if (isCorrect === true && isRightItem) {
                      stateClass = "item-correct";
                    } else if (
                      activeGameId === "kuromi-shop" &&
                      targetBasketQty > 1 &&
                      isRightItem &&
                      basketCount > 0 &&
                      basketCount < targetBasketQty
                    ) {
                      stateClass = "item-picking-multi";
                    }

                    // Khi Cấp 3 của Tiệm Tạp Hóa cần nhặt 2-3 món vào giỏ, hiển thị từng đơn vị trên kệ để bé chạm nhặt từng cái
                    const shelfDisplayItem =
                      activeGameId === "kuromi-shop" &&
                      targetBasketQty > 1 &&
                      isRightItem
                        ? { ...item, quantity: 1 }
                        : item;

                    return (
                      <div
                        key={item.id}
                        role="button"
                        tabIndex={0}
                        className={`kuromi-shelf-card ${stateClass}`}
                        style={
                          palette
                            ? ({
                                "--item-accent": palette.fill,
                                "--item-bg": palette.lightBg,
                                "--item-badge": palette.badgeBg,
                              } as React.CSSProperties)
                            : undefined
                        }
                        onClick={() => handlePickShopItem(item)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handlePickShopItem(item);
                          }
                        }}
                      >
                        <div className="kuromi-card-top-tags">
                          {item.badgeText ? (
                            <span className="kuromi-type-pill">
                              {item.badgeText}
                            </span>
                          ) : palette && level >= 2 ? (
                            <span
                              className="kuromi-color-dot-pill"
                              style={{ backgroundColor: palette.badgeBg }}
                            >
                              <span
                                className="color-dot-circle"
                                style={{ backgroundColor: palette.fill }}
                              />
                              {palette.en}
                            </span>
                          ) : (
                            <span className="kuromi-type-pill">
                              {activeGameId === "kuromi-actions"
                                ? "ACTION"
                                : "SHOP"}
                            </span>
                          )}

                          <button
                            type="button"
                            className="kuromi-item-speaker-mini"
                            onClick={(e) => handleListenSingleWord(e, item)}
                            title={`Nghe phát âm: ${item.englishName}`}
                          >
                            <Volume2 size={13} />
                          </button>
                        </div>

                        <div className="kuromi-card-visual-box">
                          <KawaiiItemVisual item={shelfDisplayItem} />
                        </div>

                        <div className="kuromi-card-label-box">
                          <strong className="kuromi-item-en" lang="en">
                            {item.englishName}
                          </strong>
                          <span className="kuromi-item-vi">
                            {item.vietnameseName}
                          </span>
                        </div>

                        {stateClass === "item-picking-multi" && (
                          <span className="kuromi-multi-pick-stamp">
                            🛒 Đã nhặt {basketCount}/{targetBasketQty} · Chạm tiếp!
                          </span>
                        )}

                        {stateClass === "item-correct" && (
                          <span className="kuromi-correct-stamp">
                            <CheckCircle2 size={18} /> Đúng rồi!
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="music-slide-arrow"
                  disabled={roundIdx >= totalRoundsInCurrentLevel - 1}
                  onClick={() =>
                    setRoundIdx((r) =>
                      Math.min(totalRoundsInCurrentLevel - 1, r + 1),
                    )
                  }
                  title="Câu tiếp theo"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Khay Giỏ Mua Hàng Của Kuromi (Dành riêng cho Bài 1: Tiệm Tạp Hóa) */}
              {activeGameId === "kuromi-shop" && rightShopItem && (
                <div className="kuromi-shopping-basket-bar">
                  <div className="basket-bar-left">
                    <span className="basket-bar-icon">🧺</span>
                    <div className="basket-bar-text">
                      <strong>
                        Giỏ Mua Hàng Kuromi ({basketCount}/{targetBasketQty})
                      </strong>
                      <small>
                        {targetBasketQty > 1
                          ? `👑 Cấp 3: Nấm chạm nhặt đủ ${targetBasketQty} món vào giỏ nhé!`
                          : "Chạm chọn đúng món Kuromi cần mua để bỏ vào giỏ!"}
                      </small>
                    </div>
                  </div>

                  <div className="basket-slots-row">
                    {Array.from({ length: targetBasketQty }).map((_, idx) => {
                      const isFilled = idx < basketCount;
                      const singleItem: EnglishShopItem = {
                        ...rightShopItem,
                        quantity: 1,
                      };
                      return (
                        <div
                          key={idx}
                          className={`basket-item-slot ${
                            isFilled ? "slot-filled" : "slot-empty"
                          }`}
                        >
                          {isFilled ? (
                            <>
                              <div className="basket-slot-visual">
                                <KawaiiItemVisual item={singleItem} />
                              </div>
                              <span className="basket-slot-num">#{idx + 1}</span>
                            </>
                          ) : (
                            <span className="basket-slot-placeholder">
                              +{idx + 1}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}

          {/* =================================================================
              MODULE 3 (kuromi-pronouns):
              BẢNG NỐI 2 CỘT (TRÁI: HE / SHE / IT / THEY ↔ PHẢI: HÀNH ĐỘNG)
             ================================================================= */}
          {activeGameId === "kuromi-pronouns" && currentPronounMatchRound && (
            <>
              <div
                className="kuromi-order-banner"
                onClick={() =>
                  speech.speak(currentPronounMatchRound.titleEn, "en-US")
                }
              >
                <div className="kuromi-avatar-pill">
                  <img src="/assets/char-kuromi.png" alt="Kuromi" />
                  <span>Bảng Nối 2 Cột:</span>
                </div>
                <div className="kuromi-order-bubble-body">
                  <div className="kuromi-order-en-row">
                    <strong className="kuromi-order-en" lang="en">
                      "{currentPronounMatchRound.titleEn}"
                    </strong>
                    <span className="kuromi-grammar-tag">
                      🔗 Đã nối {matchedPairIds.length}/
                      {currentPronounMatchRound.pairs.length} cặp
                    </span>
                  </div>
                  <p className="kuromi-order-vi">
                    {currentPronounMatchRound.titleVi}
                  </p>
                </div>
              </div>

              <div className="pronoun-matching-stage">
                {/* CỘT TRÁI: NHÂN VẬT & ĐẠI TỪ (HE / SHE / IT / THEY) */}
                <div className="pronoun-column pronoun-left-col">
                  <div className="pronoun-col-header">
                    1️⃣ Chạm chọn Nhân Vật (Cột Trái)
                  </div>
                  <div className="pronoun-cards-stack">
                    {currentPronounMatchRound.pairs.map((pair, pIdx) => {
                      const isMatched = matchedPairIds.includes(pair.id);
                      const isSelected = selectedLeftPairId === pair.id;
                      return (
                        <button
                          key={pair.id}
                          type="button"
                          className={`pronoun-match-card left-subject-card pair-color-${
                            pIdx + 1
                          } ${isSelected ? "card-selected" : ""} ${
                            isMatched ? "card-matched" : ""
                          }`}
                          onClick={() => handleSelectLeftPronoun(pair)}
                        >
                          <div className="pronoun-subject-avatar">
                            <img
                              src={pair.subjectImage}
                              alt={pair.pronounEn}
                            />
                          </div>
                          <div className="pronoun-subject-info">
                            <div className="pronoun-word-row">
                              <strong className="pronoun-en-badge" lang="en">
                                {pair.pronounEn}
                              </strong>
                              <span className="pronoun-vi-text">
                                ({pair.pronounVi})
                              </span>
                            </div>
                            <small className="pronoun-char-label">
                              {pair.subjectLabelVi}
                            </small>
                          </div>
                          <span className="pronoun-connector-dot">
                            {isMatched ? "✓" : isSelected ? "👉" : "●"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* CỘT PHẢI: HÀNH ĐỘNG / MẪU CÂU ĐÃ XÁO TRỘN */}
                <div className="pronoun-column pronoun-right-col">
                  <div className="pronoun-col-header">
                    2️⃣ Nối với Hành Động đúng (Cột Phải)
                  </div>
                  <div className="pronoun-cards-stack">
                    {shuffledRightPairs.map((rightPair) => {
                      const isMatched = matchedPairIds.includes(rightPair.id);
                      const isWrong = wrongRightPairId === rightPair.id;
                      const origIdx = currentPronounMatchRound.pairs.findIndex(
                        (p) => p.id === rightPair.id,
                      );

                      return (
                        <button
                          key={rightPair.id}
                          type="button"
                          className={`pronoun-match-card right-action-card pair-color-${
                            origIdx + 1
                          } ${isMatched ? "card-matched" : ""} ${
                            isWrong ? "card-wrong" : ""
                          }`}
                          onClick={() => handleSelectRightAction(rightPair)}
                        >
                          <span className="pronoun-connector-dot left-dot">
                            {isMatched ? "✓" : "○"}
                          </span>
                          <div className="pronoun-action-thumb">
                            <img
                              src={rightPair.actionImage}
                              alt={rightPair.actionEn}
                            />
                          </div>
                          <div className="pronoun-action-info">
                            {isMatched ? (
                              <>
                                <strong
                                  className="pronoun-matched-sentence"
                                  lang="en"
                                >
                                  ✨ {rightPair.fullSentenceEn}
                                </strong>
                                <span className="pronoun-vi-text">
                                  {rightPair.fullSentenceVi}
                                </span>
                              </>
                            ) : (
                              <>
                                <strong className="pronoun-action-en" lang="en">
                                  {rightPair.actionEn}
                                </strong>
                                <span className="pronoun-vi-text">
                                  {rightPair.actionVi}
                                </span>
                              </>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* =================================================================
              MODULE 4 (mystery-bag):
              CHIẾC TÚI BÍ MẬT MỞ DẦN 3 BƯỚC + 9 HÌNH KHỐI 3D PASTEL
             ================================================================= */}
          {activeGameId === "mystery-bag" &&
            currentMysteryBagRound &&
            currentMysteryStep && (
              <div className="mystery-bag-progressive-stage">
                {/* CỘT TRÁI: CHIẾC TÚI TÍM CỦA KUROMI MỞ DẦN THEO 3 BƯỚC */}
                <div className="mystery-bag-visual-panel">
                  <div className="mystery-step-progress-pills">
                    {[
                      { idx: 0, label: "1. Màu sắc 🎨" },
                      { idx: 1, label: "2. Đặc trưng & Tác dụng 🔍" },
                      { idx: 2, label: "3. Mở túi đoán vật 🎁" },
                    ].map((st) => {
                      const isDone =
                        bagStepIdx > st.idx ||
                        (bagStepIdx === 2 && isCorrect === true);
                      const isCurrent = bagStepIdx === st.idx && !isDone;
                      return (
                        <span
                          key={st.idx}
                          className={`mystery-step-pill ${
                            isDone
                              ? "step-done"
                              : isCurrent
                                ? "step-active"
                                : ""
                          }`}
                        >
                          {isDone ? "✓ " : ""}
                          {st.label}
                        </span>
                      );
                    })}
                  </div>

                  <div
                    className={`kuromi-purple-bag-box bag-stage-${bagStepIdx} ${
                      isCorrect ? "bag-opened-100" : ""
                    }`}
                  >
                    <div className="bag-top-ribbon">
                      <img
                        src="/assets/char-kuromi.png"
                        alt="Kuromi"
                        className="bag-kuromi-charm"
                      />
                      <span>
                        {isCorrect
                          ? "🎉 TÚI ĐÃ MỞ 100%!"
                          : bagStepIdx === 0
                            ? "🫣 Bước 1: Hé lộ góc Màu Sắc..."
                            : bagStepIdx === 1
                              ? "🔍 Bước 2: Đặc Trưng & Công Dụng..."
                              : "✨ Bước 3: Mở túi đoán tên món đồ!"}
                      </span>
                    </div>

                    <div className="bag-peek-viewport">
                      <img
                        src={currentMysteryBagRound.targetImage}
                        alt={currentMysteryBagRound.targetNameEn}
                        className={`bag-target-img peek-level-${bagStepIdx} ${
                          isCorrect ? "peek-full" : ""
                        }`}
                      />
                      {!isCorrect && (
                        <div className="bag-mystery-curtain">
                          <span className="bag-question-mark">
                            {bagStepIdx === 0
                              ? "🎨 ?"
                              : bagStepIdx === 1
                                ? "🔍 ?"
                                : "🎁 ?"}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="bag-bottom-caption">
                      {isCorrect ? (
                        <strong lang="en">
                          🌟 {currentMysteryBagRound.targetNameEn} (
                          {currentMysteryBagRound.targetNameVi})
                        </strong>
                      ) : (
                        <span>
                          Trả lời đúng cả 3 bước để mở tung Túi Bí Mật nhé!
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* CỘT PHẢI: CÂU HỎI TỪNG BƯỚC & 3 THẺ ĐÁP ÁN (MÀU SẮC / HÌNH KHỐI 3D / ĐỒ VẬT) */}
                <div className="mystery-bag-question-panel">
                  <div
                    className="mystery-question-bubble"
                    onClick={() =>
                      speech.speak(currentMysteryStep.questionEn, "en-US")
                    }
                  >
                    <div className="mystery-q-header">
                      <span className="mystery-q-step-tag">
                        Bước {bagStepIdx + 1}/3
                      </span>
                      <strong lang="en">
                        🔊 "{currentMysteryStep.questionEn}"
                      </strong>
                    </div>
                    <p>{currentMysteryStep.questionVi}</p>
                  </div>

                  <div className="mystery-options-grid">
                    {currentMysteryStep.options.map((opt) => {
                      const isPicked = bagSelectedOptId === opt.id;
                      const isRight =
                        isPicked &&
                        opt.id === currentMysteryStep.correctOptionId;
                      const isWrong =
                        isPicked &&
                        opt.id !== currentMysteryStep.correctOptionId;

                      return (
                        <button
                          key={opt.id}
                          type="button"
                          className={`mystery-option-card ${
                            isRight
                              ? "opt-correct"
                              : isWrong
                                ? "opt-wrong"
                                : ""
                          }`}
                          onClick={() => handlePickMysteryBagOption(opt)}
                        >
                          <div className="mystery-opt-visual">
                            {opt.colorHex && !opt.image ? (
                              <span
                                className="mystery-color-orb"
                                style={{ backgroundColor: opt.colorHex }}
                              />
                            ) : opt.image ? (
                              <img src={opt.image} alt={opt.en} />
                            ) : (
                              <span className="mystery-opt-emoji">
                                {opt.emoji || "✨"}
                              </span>
                            )}
                          </div>
                          <strong className="mystery-opt-en" lang="en">
                            {opt.en}
                          </strong>
                          <span className="mystery-opt-vi">{opt.vi}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

          {/* 4. GÓC NẤM NÓI CÙNG BA MẸ & NÚT QUA MÀN / TỰ ĐỘNG LÊN CẤP */}
          <div className="kuromi-speaking-footer">
            <div
              className={`kuromi-speaking-coach-box ${
                hasSpokenAloud ? "spoken-done" : ""
              }`}
              onClick={handlePracticeSpeaking}
              title="Chạm để nghe mẫu câu tiếng Anh và nói cùng ba mẹ"
            >
              <div className="speaking-coach-left">
                <span className="speaking-coach-badge">
                  🗣️ Câu Nấm nói cùng ba mẹ:
                </span>
                <div className="speaking-coach-texts">
                  <strong lang="en">
                    "
                    {activeGameId === "mystery-bag" && currentMysteryStep
                      ? currentMysteryStep.speakingEn
                      : activeGameId === "kuromi-pronouns" &&
                          currentPronounMatchRound
                        ? (
                            currentPronounMatchRound.pairs.find(
                              (p) =>
                                p.id ===
                                matchedPairIds[matchedPairIds.length - 1],
                            ) || currentPronounMatchRound.pairs[0]
                          )?.fullSentenceEn
                        : currentRound.speakingTargetEn}
                    "
                  </strong>
                  <small>
                    (
                    {activeGameId === "mystery-bag" && currentMysteryStep
                      ? currentMysteryStep.speakingVi
                      : activeGameId === "kuromi-pronouns" &&
                          currentPronounMatchRound
                        ? (
                            currentPronounMatchRound.pairs.find(
                              (p) =>
                                p.id ===
                                matchedPairIds[matchedPairIds.length - 1],
                            ) || currentPronounMatchRound.pairs[0]
                          )?.fullSentenceVi
                        : currentRound.speakingTargetVi}
                    )
                  </small>
                </div>
              </div>

              <button
                type="button"
                className="chunky-btn chunky-blue btn-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePracticeSpeaking();
                }}
              >
                <Volume2 size={14} /> Nghe mẫu câu
              </button>
            </div>

            <div className="kuromi-footer-actions">
              {(isCorrect === false || bagStepCorrect === false) && (
                <button
                  type="button"
                  className="chunky-btn chunky-orange btn-sm"
                  onClick={() => {
                    const hint =
                      activeGameId === "mystery-bag" && currentMysteryStep
                        ? currentMysteryStep.hintVi
                        : currentRound.hintVi;
                    onReaction?.("happy", `💡 Gợi ý: ${hint}`);
                  }}
                >
                  <Lightbulb size={14} /> Gợi ý
                </button>
              )}

              {isCorrect === true ? (
                <button
                  type="button"
                  className="chunky-btn chunky-green btn-sm kuromi-next-pulse-btn"
                  onClick={handleNextRoundOrFinish}
                >
                  {roundIdx + 1 < totalRoundsInCurrentLevel ? (
                    <>
                      Màn tiếp theo <ChevronRight size={16} />
                    </>
                  ) : (
                    <>
                      <Star size={15} fill="currentColor" /> Nhận 3 Sao!
                    </>
                  )}
                </button>
              ) : roundIdx + 1 < totalRoundsInCurrentLevel ? (
                <button
                  type="button"
                  className="chunky-btn chunky-gold btn-sm"
                  onClick={handleNextRoundOrFinish}
                >
                  Màn tiếp theo <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  className="chunky-btn chunky-gold btn-sm"
                  onClick={handleNextRoundOrFinish}
                >
                  <Sparkles size={14} /> Nhận Sao
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
