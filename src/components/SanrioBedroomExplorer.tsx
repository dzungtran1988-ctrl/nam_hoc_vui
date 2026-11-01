import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Check,
  Map as MapIcon,
  RefreshCw,
  RotateCcw,
  Sparkles,
  Volume2,
  X,
} from "lucide-react";
import {
  SANRIO_BEDROOMS,
  generateDynamicQuestionForHotspot,
  type BedroomHotspotConfig,
  type BedroomOptionCard,
  type BedroomQuestionItem,
  type SanrioBedroomConfig,
} from "../data/bedroomExplorerData";
import {
  awardHalloweenCandyChestBundle,
  awardStickerForSubject,
  loadStickerStore,
  type AwardedHalloweenBundleResult,
  type CharacterStickerItem,
} from "../data/rewardStickers";
import { useSpeech } from "../hooks/useSpeech";
import {
  playCardPlaceSound,
  playCorrectDingSound,
  playGoldenCupFanfare,
  playRewardTone,
  playStickerPeelStickSound,
  playWrongBuzzSound,
} from "../lib/sound";
import {
  ParticleBurstCanvas,
  type ParticleBurstHandle,
} from "./ParticleBurstCanvas";

export interface SanrioBedroomExplorerProps {
  soundEnabled: boolean;
  onBack?: () => void;
  onEarnReward?: (
    coins: number,
    roomTitle: string,
    awardedSticker?: CharacterStickerItem,
  ) => void;
  onReaction?: (mood: "happy" | "sad", message?: string) => void;
}

type ExplorerStage =
  | "overview"       // Toàn cảnh căn phòng với 5 ngôi sao nhẹ nhàng
  | "question"       // Cận cảnh góc phòng + Bóng thoại nhân vật + Thẻ bài học sáng tạo
  | "star-reward"    // Thẻ khen thưởng "+1 Sao" + nút "Tiếp tục"
  | "chest-victory"; // Màn hình mở Rương 5 Ngôi Sao + Nhận 1 Sticker Mới

const STARS_REQUIRED_FOR_CHEST = 5;

/**
 * Biểu tượng Ngôi Sao 5 Cánh Bầu Bĩnh 3D (Plump Kawaii Star SVG)
 */
function PlumpStarSvg({
  size = 28,
  filled = true,
  className = "",
}: {
  size?: number;
  filled?: boolean;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="plumpStarGrad" x1="32" y1="4" x2="32" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF394" />
          <stop offset="45%" stopColor="#FFD23F" />
          <stop offset="100%" stopColor="#F59F00" />
        </linearGradient>
        <linearGradient id="emptyStarGrad" x1="32" y1="4" x2="32" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D0DDF0" />
          <stop offset="100%" stopColor="#9BB0CD" />
        </linearGradient>
      </defs>
      <path
        d="M35.5 7.2C34.1 4.3 29.9 4.3 28.5 7.2L21.9 20.6C21.3 21.8 20.2 22.6 18.9 22.8L4.1 24.9C0.9 25.4 -0.4 29.3 1.9 31.6L12.6 42.0C13.5 42.9 14.0 44.2 13.7 45.5L11.2 60.2C10.7 63.4 14.0 65.8 16.9 64.3L30.1 57.3C31.3 56.7 32.7 56.7 33.9 57.3L47.1 64.3C50.0 65.8 53.3 63.4 52.8 60.2L50.3 45.5C50.0 44.2 50.5 42.9 51.4 42.0L62.1 31.6C64.4 29.3 63.1 25.4 59.9 24.9L45.1 22.8C43.8 22.6 42.7 21.8 42.1 20.6L35.5 7.2Z"
        fill={filled ? "url(#plumpStarGrad)" : "url(#emptyStarGrad)"}
        stroke={filled ? "#E68A00" : "#8AA0BE"}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {filled && (
        <ellipse
          cx="25"
          cy="19"
          rx="5.5"
          ry="3"
          transform="rotate(-28 25 19)"
          fill="#FFFFFF"
          fillOpacity="0.65"
        />
      )}
    </svg>
  );
}

/**
 * Ngôi Sao Phát Sáng Nhẹ Nhàng Trên Phòng Ngủ:
 * - Bình thường: bán trong suốt dịu mắt, không che đồ vật, không nhảy vị trí
 * - Khi đưa chuột đến gần (:hover): sáng rực rỡ tại chỗ
 */
function GentleRoomStarSvg({ isDone }: { isDone: boolean }) {
  return (
    <svg
      width="68"
      height="68"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="bedroom-gentle-star-svg"
    >
      <defs>
        <radialGradient id="starSoftCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFDF0" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#FFE066" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#FFB800" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="starRimGrad" x1="40" y1="10" x2="40" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#FFE066" />
          <stop offset="100%" stopColor="#F59F00" />
        </linearGradient>
      </defs>

      {/* Vòng hào quang dịu ở tâm */}
      <circle cx="40" cy="40" r="28" fill="url(#starSoftCore)" className="star-halo-circle" />

      {/* Đường viền ngôi sao 5 cánh bầu bĩnh, bên trong trong suốt để nhìn xuyên thấy đồ vật */}
      <path
        d="M43.2 14.5C41.9 11.8 38.1 11.8 36.8 14.5L31.4 25.4C30.9 26.4 29.9 27.1 28.8 27.3L16.8 29.0C13.8 29.5 12.6 33.1 14.8 35.3L23.5 43.7C24.3 44.5 24.7 45.7 24.5 46.8L22.4 58.8C21.9 61.8 25.0 64.0 27.7 62.6L38.4 57.0C39.4 56.5 40.6 56.5 41.6 57.0L52.3 62.6C55.0 64.0 58.1 61.8 57.6 58.8L55.5 46.8C55.3 45.7 55.7 44.5 56.5 43.7L65.2 35.3C67.4 33.1 66.2 29.5 63.2 29.0L51.2 27.3C50.1 27.1 49.1 26.4 48.6 25.4L43.2 14.5Z"
        fill={isDone ? "rgba(255, 224, 102, 0.38)" : "rgba(255, 248, 214, 0.16)"}
        stroke="url(#starRimGrad)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="star-outline-path"
      />

      {/* Đốm sáng nhỏ ở tâm sao */}
      <circle cx="40" cy="40" r="3.5" fill="#FFFDF2" className="star-center-spark" />
    </svg>
  );
}

/**
 * Biểu tượng Viên Kẹo Halloween 3D Bầu Bĩnh (Plump Kawaii Candy SVG)
 */
function PlumpCandySvg({
  size = 28,
  filled = true,
  className = "",
}: {
  size?: number;
  filled?: boolean;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="candyBodyGrad" x1="16" y1="14" x2="48" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFEDD5" />
          <stop offset="35%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        <linearGradient id="candyWingGrad" x1="4" y1="16" x2="60" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id="candyEmptyGrad" x1="16" y1="14" x2="48" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
      </defs>
      {/* Hai đầu giấy xoắn kẹo */}
      <path
        d="M18 26L6 16C4 14.5 2 16.5 3 19L7 29L3 39C2 41.5 4 43.5 6 42L18 32V26Z"
        fill={filled ? "url(#candyWingGrad)" : "url(#candyEmptyGrad)"}
        stroke={filled ? "#5B21B6" : "#64748B"}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M46 26L58 16C60 14.5 62 16.5 61 19L57 29L61 39C62 41.5 60 43.5 58 42L46 32V26Z"
        fill={filled ? "url(#candyWingGrad)" : "url(#candyEmptyGrad)"}
        stroke={filled ? "#5B21B6" : "#64748B"}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Viên kẹo tròn ở giữa */}
      <circle
        cx="32"
        cy="30"
        r="15.5"
        fill={filled ? "url(#candyBodyGrad)" : "url(#candyEmptyGrad)"}
        stroke={filled ? "#9A3412" : "#64748B"}
        strokeWidth="2.5"
      />
      {filled && (
        <>
          <path
            d="M24 18C28 24 28 36 24 42"
            stroke="#FEF08A"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M40 18C36 24 36 36 40 42"
            stroke="#DDD6FE"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <ellipse
            cx="27"
            cy="23"
            rx="4.5"
            ry="2.5"
            transform="rotate(-25 27 23)"
            fill="#FFFFFF"
            fillOpacity="0.75"
          />
        </>
      )}
    </svg>
  );
}

/**
 * Viên Kẹo Halloween Phát Sáng Nhẹ Nhàng Trên Map Đêm Hội (Đứng im không nhảy vị trí)
 */
function GentleRoomCandySvg({ isDone }: { isDone: boolean }) {
  return (
    <svg
      width="70"
      height="70"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="bedroom-gentle-star-svg"
    >
      <defs>
        <radialGradient id="candySoftCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF7ED" stopOpacity="0.92" />
          <stop offset="55%" stopColor="#FB923C" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="candyRimGrad" x1="16" y1="18" x2="64" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="50%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#C084FC" />
        </linearGradient>
      </defs>

      <circle cx="40" cy="40" r="30" fill="url(#candySoftCore)" className="star-halo-circle" />

      {/* Hai cánh giấy xoắn của viên kẹo */}
      <path
        d="M25 35L13 25C11 23.5 9 25.5 10 28L14 39L10 50C9 52.5 11 54.5 13 53L25 43V35Z"
        fill={isDone ? "rgba(192, 132, 252, 0.55)" : "rgba(192, 132, 252, 0.28)"}
        stroke="url(#candyRimGrad)"
        strokeWidth="2.8"
        strokeLinejoin="round"
        className="star-outline-path"
      />
      <path
        d="M55 35L67 25C69 23.5 71 25.5 70 28L66 39L70 50C71 52.5 69 54.5 67 53L55 43V35Z"
        fill={isDone ? "rgba(192, 132, 252, 0.55)" : "rgba(192, 132, 252, 0.28)"}
        stroke="url(#candyRimGrad)"
        strokeWidth="2.8"
        strokeLinejoin="round"
        className="star-outline-path"
      />

      {/* Viên kẹo tròn ở tâm */}
      <circle
        cx="40"
        cy="39"
        r="15"
        fill={isDone ? "rgba(251, 146, 60, 0.52)" : "rgba(255, 237, 213, 0.22)"}
        stroke="url(#candyRimGrad)"
        strokeWidth="3.2"
        className="star-outline-path"
      />
      <path
        d="M34 29C37 35 37 43 34 49M46 29C43 35 43 43 46 49"
        stroke="#FEF08A"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="40" cy="39" r="3.5" fill="#FFFDF2" className="star-center-spark" />
    </svg>
  );
}

export function SanrioBedroomExplorer({
  soundEnabled,
  onEarnReward,
  onReaction,
}: SanrioBedroomExplorerProps) {
  const speech = useSpeech(soundEnabled);
  const burstRef = useRef<ParticleBurstHandle | null>(null);

  const [selectedRoomId, setSelectedRoomId] = useState<string>("halloween");
  const [stage, setStage] = useState<ExplorerStage>("overview");
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<BedroomQuestionItem | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [wrongOptionIds, setWrongOptionIds] = useState<string[]>([]);
  const [mapModalOpen, setMapModalOpen] = useState<boolean>(false);

  // Tiến độ 5 ngôi sao / viên kẹo mỗi phòng
  const [completedByRoom, setCompletedByRoom] = useState<Record<string, string[]>>({});
  const [chestClaimedByRoom, setChestClaimedByRoom] = useState<Record<string, boolean>>({});
  // Bộ đếm lượt mở để mỗi lần bấm vào sao/kẹo đều sinh câu hỏi mới khác hẳn lần trước
  const [visitCounter, setVisitCounter] = useState<number>(1);
  // Sticker vừa nhận được khi hoàn thành 5/5 sao ở phòng thường
  const [unlockedSticker, setUnlockedSticker] = useState<CharacterStickerItem | null>(null);
  // Gói 2 Sticker Halloween (1 Nhân Vật + 1 Đồ Chơi/Bánh Kẹo) khi hoàn thành 5/5 Kẹo ở Map Halloween
  const [unlockedHalloweenBundle, setUnlockedHalloweenBundle] =
    useState<AwardedHalloweenBundleResult | null>(null);

  const currentRoom: SanrioBedroomConfig = useMemo(
    () =>
      SANRIO_BEDROOMS.find((r) => r.id === selectedRoomId) ?? SANRIO_BEDROOMS[0],
    [selectedRoomId],
  );

  const completedHotspotIds = useMemo(
    () => completedByRoom[currentRoom.id] ?? [],
    [completedByRoom, currentRoom.id],
  );

  const starsCollected = completedHotspotIds.length;
  const isChestClaimed = Boolean(chestClaimedByRoom[currentRoom.id]);
  const isHalloween = Boolean(currentRoom.isHalloweenTheme);
  const tokenUnitLabel = isHalloween ? "viên kẹo" : "ngôi sao";
  const tokenShortLabel = isHalloween ? "Kẹo" : "Sao";

  const activeHotspot: BedroomHotspotConfig | null = useMemo(
    () =>
      currentRoom.hotspots.find((h) => h.id === activeHotspotId) ?? null,
    [currentRoom.hotspots, activeHotspotId],
  );

  useEffect(() => {
    setStage("overview");
    setActiveHotspotId(null);
    setActiveQuestion(null);
    setSelectedOptionId(null);
    setWrongOptionIds([]);
    setMapModalOpen(false);
    setUnlockedSticker(null);
    setUnlockedHalloweenBundle(null);
    speech.speak(currentRoom.welcomeSpeech);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoom.id]);

  const triggerFireworks = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    burstRef.current?.burstAt(w * 0.35, h * 0.45, "gold");
    window.setTimeout(() => {
      burstRef.current?.burstAt(w * 0.65, h * 0.42, "rainbow");
    }, 180);
    window.setTimeout(() => {
      burstRef.current?.burstAt(w * 0.5, h * 0.35, "pink");
    }, 360);
  };

  /**
   * Mở một ngôi sao trong phòng -> Sinh động câu hỏi mới tinh mỗi lần bấm!
   */
  const handleOpenHotspot = (hotspot: BedroomHotspotConfig) => {
    if (soundEnabled) playCardPlaceSound();
    setMapModalOpen(false);

    const nextSeed = visitCounter + Math.floor(Math.random() * 3) + 1;
    setVisitCounter(nextSeed);

    const generated = generateDynamicQuestionForHotspot(
      currentRoom,
      hotspot,
      nextSeed,
    );

    setActiveHotspotId(hotspot.id);
    setActiveQuestion(generated);
    setSelectedOptionId(generated.skill === "poem" ? "poem-read-done" : null);
    setWrongOptionIds([]);
    setStage("question");

    if (generated.skill === "poem" && generated.poemVisual) {
      speech.speak(
        `${generated.bubblePrompt} ${generated.poemVisual.lines.join(" ")}`,
        "vi-VN",
      );
    } else {
      speech.speak(generated.bubblePrompt, "vi-VN");
    }
  };

  /**
   * Đổi sang câu hỏi / bài thơ mới ngay tại trạm đang mở
   */
  const handleShuffleNewQuestionInStation = () => {
    if (!activeHotspot) return;
    if (soundEnabled) playCardPlaceSound();
    const nextSeed = visitCounter + 1;
    setVisitCounter(nextSeed);
    const freshQuestion = generateDynamicQuestionForHotspot(
      currentRoom,
      activeHotspot,
      nextSeed,
    );
    setActiveQuestion(freshQuestion);
    setSelectedOptionId(
      freshQuestion.skill === "poem" ? "poem-read-done" : null,
    );
    setWrongOptionIds([]);

    if (freshQuestion.skill === "poem" && freshQuestion.poemVisual) {
      speech.speak(
        `${freshQuestion.poemVisual.title}. ${freshQuestion.poemVisual.lines.join(" ")}`,
        "vi-VN",
      );
    } else {
      speech.speak(freshQuestion.bubblePrompt, "vi-VN");
    }
  };

  /**
   * Khi bé chạm chọn 1 ô đáp án
   */
  const handleSelectOption = (option: BedroomOptionCard) => {
    if (wrongOptionIds.includes(option.id)) return;
    if (soundEnabled) playCardPlaceSound();
    setSelectedOptionId(option.id);

    speech.speak(
      option.ttsText || option.label,
      option.ttsLang || "vi-VN",
    );
  };

  /**
   * Khi bé bấm nút "Chọn" (hoặc "Nhận Sao Đọc Sách" ở trạm đọc thơ)
   */
  const handleConfirmAnswer = () => {
    if (!activeQuestion || !activeHotspot || !selectedOptionId) return;

    if (selectedOptionId === activeQuestion.correctOptionId) {
      if (soundEnabled) {
        playCorrectDingSound();
        playStickerPeelStickSound();
      }
      triggerFireworks();

      const alreadyDone = completedHotspotIds.includes(activeHotspot.id);
      if (!alreadyDone) {
        setCompletedByRoom((prev) => ({
          ...prev,
          [currentRoom.id]: [...(prev[currentRoom.id] ?? []), activeHotspot.id],
        }));
      }

      setStage("star-reward");
      speech.speak(
        `${activeQuestion.praiseTitle} ${activeQuestion.praiseSubtitle}`,
        "vi-VN",
      );
      onReaction?.("happy", activeQuestion.praiseTitle);
    } else {
      if (soundEnabled) playWrongBuzzSound();
      setWrongOptionIds((prev) =>
        prev.includes(selectedOptionId) ? prev : [...prev, selectedOptionId],
      );
      setSelectedOptionId(null);
      speech.speak("Chưa đúng rồi, Nấm thử chọn đáp án khác nhé!", "vi-VN");
      onReaction?.("sad", "Nấm thử chọn lại nhé!");
    }
  };

  /**
   * Mở Rương 5 Sao (hoặc Giỏ Bí Ngô 5 Kẹo ở Map Halloween) & Trao thưởng Sticker vào Sổ Sticker
   */
  const openVictoryChestWithSticker = () => {
    if (soundEnabled) playGoldenCupFanfare();
    triggerFireworks();

    if (currentRoom.isHalloweenTheme) {
      const bundle = awardHalloweenCandyChestBundle();
      setUnlockedHalloweenBundle(bundle);
      setUnlockedSticker(null);
      setStage("chest-victory");
      speech.speak(
        `${currentRoom.chestVictorySpeech} Bé nhận được Sticker ${bundle.characterSticker.name} và ${bundle.itemSticker.name}!`,
        "vi-VN",
      );
      return;
    }

    // Mở khóa 1 Sticker thật thuộc bộ của nhân vật chủ phòng
    const store = loadStickerStore();
    const outcome = awardStickerForSubject(store, currentRoom.rewardSubjectId);
    setUnlockedSticker(outcome.awardedSticker);
    setUnlockedHalloweenBundle(null);

    setStage("chest-victory");
    speech.speak(
      `${currentRoom.chestVictorySpeech} Bé nhận được Sticker ${outcome.awardedSticker.name}!`,
      "vi-VN",
    );
  };

  /**
   * Khi bé bấm "Tiếp tục" ở màn hình +1 Sao
   */
  const handleContinueAfterStar = () => {
    if (soundEnabled) playCardPlaceSound();
    const updatedCount = completedByRoom[currentRoom.id]?.length ?? 0;

    if (updatedCount >= STARS_REQUIRED_FOR_CHEST && !isChestClaimed) {
      openVictoryChestWithSticker();
      return;
    }

    setStage("overview");
    setActiveHotspotId(null);
    setActiveQuestion(null);
    setSelectedOptionId(null);
  };

  /**
   * Khi bé bấm "Nhận thưởng" ở màn hình Rương 5 Sao + Sticker
   */
  const handleClaimTreasureChest = () => {
    if (soundEnabled) {
      playGoldenCupFanfare();
      playRewardTone();
    }
    triggerFireworks();

    setChestClaimedByRoom((prev) => ({
      ...prev,
      [currentRoom.id]: true,
    }));

    onEarnReward?.(
      currentRoom.isHalloweenTheme ? 20 : 15,
      currentRoom.roomTitle,
      unlockedSticker ?? undefined,
    );

    setStage("overview");
    setActiveHotspotId(null);
    setActiveQuestion(null);
    setSelectedOptionId(null);
  };

  /**
   * Chơi lại căn phòng với toàn bộ câu hỏi mới
   */
  const handleResetRoom = () => {
    if (soundEnabled) playCardPlaceSound();
    setCompletedByRoom((prev) => ({
      ...prev,
      [currentRoom.id]: [],
    }));
    setChestClaimedByRoom((prev) => ({
      ...prev,
      [currentRoom.id]: false,
    }));
    setUnlockedSticker(null);
    setVisitCounter((c) => c + 1);
    setStage("overview");
    setActiveHotspotId(null);
    setActiveQuestion(null);
    setSelectedOptionId(null);
    speech.speak(
      `Chúng mình cùng khám phá lại ${currentRoom.roomTitle} với những thử thách mới nhé!`,
      "vi-VN",
    );
  };

  const { palette } = currentRoom;
  const isZoomed =
    (stage === "question" || stage === "star-reward") && activeHotspot !== null;

  // Từ đang được bé chọn thử ở Trạm 3 (Điền chữ khuyết)
  const selectedReadingPreview = useMemo(() => {
    if (
      !activeQuestion?.readingVisual ||
      !selectedOptionId ||
      !selectedOptionId.startsWith("rhyme-")
    ) {
      return null;
    }
    const chosenRhyme = selectedOptionId.replace("rhyme-", "");
    return `${activeQuestion.readingVisual.stemBeforeBlank}${chosenRhyme}`;
  }, [activeQuestion, selectedOptionId]);

  return (
    <div
      className="sanrio-bedroom-stage"
      style={
        {
          "--room-primary": palette.primaryHex,
          "--room-soft-tint": palette.softTintHex,
          "--room-star-hex": palette.starHex,
          "--room-btn-grad": palette.btnGradient,
          "--room-btn-shadow": palette.btnShadow,
          "--room-btn-border": palette.btnBorder,
          "--room-card-bg": palette.cardBg,
          "--room-card-border": palette.cardBorder,
          "--room-title-color": palette.titleColor,
          "--room-sub-color": palette.subTextColor,
          "--room-sel-border": palette.selectedBorder,
          "--room-sel-glow": palette.selectedGlow,
          "--room-sel-bg": palette.selectedBg,
        } as React.CSSProperties
      }
    >
      <ParticleBurstCanvas ref={burstRef} />

      {/* =====================================================================
          THANH ĐIỀU KHIỂN NẰM NGOÀI BỨC TRANH (KHÔNG ĐÈ LÊN TRANH PHÒNG NGỦ)
          ===================================================================== */}
      <div className="bedroom-outside-toolbar">
        <div
          className="bedroom-switcher-bar"
          role="tablist"
          aria-label="Chọn phòng ngủ các bạn"
        >
          {SANRIO_BEDROOMS.map((room) => {
            const active = room.id === currentRoom.id;
            const doneCount = completedByRoom[room.id]?.length ?? 0;
            return (
              <button
                key={room.id}
                type="button"
                className={`bedroom-room-chip ${active ? "active" : ""}`}
                style={
                  active
                    ? {
                        background: room.palette.btnGradient,
                        borderColor: room.palette.btnBorder,
                        boxShadow: room.palette.btnShadow,
                        color: "#FFFFFF",
                      }
                    : undefined
                }
                onClick={() => {
                  if (soundEnabled) playCardPlaceSound();
                  setSelectedRoomId(room.id);
                }}
              >
                <img
                  src={room.mascotAskImage}
                  alt={room.characterName}
                  className="room-chip-avatar"
                />
                <span className="room-chip-name">
                  {room.isHalloweenTheme ? "🎃 Halloween" : room.characterName}
                </span>
                {doneCount > 0 && (
                  <span className="room-chip-star-tag">
                    {room.isHalloweenTheme ? "🍬" : "★"}
                    {doneCount}/{STARS_REQUIRED_FOR_CHEST}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="bedroom-hud-right">
          {stage !== "overview" && (
            <button
              type="button"
              className="bedroom-toolbar-pill-btn"
              onClick={() => {
                if (soundEnabled) playCardPlaceSound();
                setStage("overview");
                setActiveHotspotId(null);
                setActiveQuestion(null);
                setSelectedOptionId(null);
              }}
              title="Quay lại ngắm toàn cảnh phòng"
            >
              <ArrowLeft size={16} strokeWidth={2.8} />
              <span>Về phòng</span>
            </button>
          )}

          <button
            type="button"
            className="bedroom-porcelain-circle-btn toolbar-mini-circle"
            onClick={() => speech.speak(currentRoom.welcomeSpeech, "vi-VN")}
            title={
              isHalloween
                ? "Nghe hướng dẫn đêm hội Halloween"
                : "Nghe hướng dẫn khám phá phòng"
            }
          >
            <Volume2 size={17} strokeWidth={2.6} />
          </button>

          <button
            type="button"
            className="bedroom-toolbar-pill-btn"
            onClick={() => {
              if (soundEnabled) playCardPlaceSound();
              setMapModalOpen(true);
              speech.speak(currentRoom.chestPrompt, "vi-VN");
            }}
            title="Xem bản đồ 5 trạm bí mật"
          >
            <MapIcon size={15} strokeWidth={2.5} />
            <span>Bản đồ</span>
          </button>

          {starsCollected > 0 && stage === "overview" && (
            <button
              type="button"
              className="bedroom-porcelain-circle-btn toolbar-mini-circle"
              onClick={handleResetRoom}
              title="Làm mới 5 ngôi sao với bộ câu hỏi mới"
            >
              <RotateCcw size={16} strokeWidth={2.6} />
            </button>
          )}

          <button
            type="button"
            className={`bedroom-star-counter-pill ${
              starsCollected >= STARS_REQUIRED_FOR_CHEST ? "ready-chest" : ""
            }`}
            onClick={() => {
              if (starsCollected >= STARS_REQUIRED_FOR_CHEST) {
                openVictoryChestWithSticker();
              } else {
                setMapModalOpen(true);
              }
            }}
            title={
              isHalloween
                ? "Số viên kẹo đã thu thập (Đủ 5 kẹo mở Giỏ Bí Ngô nhận Bộ Sticker Halloween)"
                : "Số ngôi sao đã thu thập (Đủ 5 sao tặng 1 Sticker)"
            }
          >
            {isHalloween ? (
              <PlumpCandySvg size={22} filled />
            ) : (
              <PlumpStarSvg size={22} filled />
            )}
            <span className="star-counter-numbers">
              {Math.min(starsCollected, STARS_REQUIRED_FOR_CHEST)}/
              {STARS_REQUIRED_FOR_CHEST}
            </span>
          </button>
        </div>
      </div>

      {/* =====================================================================
          KHUNG TRANH PHÒNG NGỦ 3D SẠCH 100% (KHÔNG DÍNH THẺ BÊN TRONG)
          ===================================================================== */}
      <div className="sanrio-bedroom-viewport">
        <div
          className={`sanrio-bedroom-canvas ${isZoomed ? "is-zoomed" : ""}`}
          style={{
            transformOrigin: activeHotspot
              ? `${activeHotspot.zoomOriginX}% ${activeHotspot.zoomOriginY}%`
              : "50% 50%",
            transform: isZoomed
              ? `scale(${activeHotspot?.zoomScale ?? 1.75})`
              : "scale(1)",
          }}
        >
          <img
            src={currentRoom.roomImage}
            alt={currentRoom.roomTitle}
            className="sanrio-bedroom-bg-img"
            draggable={false}
          />

          {/* 5 NGÔI SAO / KẸO PHÁT SÁNG DỊU NHẸ TRONG PHÒNG (CHỈ HIỆN Ở TOÀN CẢNH) */}
          {stage === "overview" &&
            currentRoom.hotspots.map((spot) => {
              const isDone = completedHotspotIds.includes(spot.id);
              return (
                <button
                  key={spot.id}
                  type="button"
                  className={`bedroom-hotspot-btn ${isDone ? "is-done" : ""}`}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  onClick={() => handleOpenHotspot(spot)}
                  aria-label={isHalloween ? "Viên kẹo bí mật" : "Ngôi sao bí mật"}
                >
                  {isHalloween ? (
                    <GentleRoomCandySvg isDone={isDone} />
                  ) : (
                    <GentleRoomStarSvg isDone={isDone} />
                  )}
                  {isDone && (
                    <span className="hotspot-mini-done-tick">
                      <Check size={11} strokeWidth={3.5} />
                    </span>
                  )}
                </button>
              );
            })}
        </div>

        {stage !== "overview" && <div className="bedroom-stage-vignette" />}

        {/* CHỈ HIỆN NÚT MỞ GIỎ BÍ NGÔ / MỞ RƯƠNG KHI ĐÃ ĐỦ 5/5 KẸO/SAO */}
        {stage === "overview" && starsCollected >= STARS_REQUIRED_FOR_CHEST && (
          <div className="bedroom-bottom-dock">
            <button
              type="button"
              className="bedroom-candy-cta-btn chest-floating-cta"
              onClick={openVictoryChestWithSticker}
            >
              <Sparkles size={18} />
              <span>
                {isHalloween
                  ? "Mở Giỏ Bí Ngô Nhận Sticker Halloween! 🎃"
                  : "Mở Rương Nhận Sticker! 🎁"}
              </span>
            </button>
          </div>
        )}

      {/* =====================================================================
          MÀN HÌNH GIẢI ĐỐ 5 TRẠM SÁNG TẠO (HÌNH DẠNG / TOÁN / ĐỌC / ANH / THƠ)
          ===================================================================== */}
      {stage === "question" && activeHotspot && activeQuestion && (
        <div className="bedroom-interaction-overlay">
          {/* Cột trái: Ngắm góc phòng đang zoom + Nút đổi câu hỏi khác */}
          <div className="bedroom-zoom-Pinpoint">
            <div className="zoom-spot-badge">
              <span className="zoom-spot-icon">{activeHotspot.icon}</span>
              <span className="zoom-skill-pill">{activeQuestion.skillLabel}</span>
              <button
                type="button"
                className="zoom-refresh-question-btn"
                onClick={handleShuffleNewQuestionInStation}
                title="Đổi câu hỏi / bài thơ khác"
              >
                <RefreshCw size={13} /> Đổi bài khác
              </button>
            </div>
          </div>

          {/* Cột phải: Bóng câu hỏi cùng nhân vật + Thẻ trắng sứ */}
          <div className="bedroom-question-panel">
            <div className="bedroom-mascot-speech-row">
              <div className="bedroom-mascot-float-wrap">
                <img
                  src={currentRoom.mascotAskImage}
                  alt={currentRoom.characterName}
                  className="bedroom-mascot-float-img"
                />
              </div>
              <button
                type="button"
                className="bedroom-speech-bubble-card"
                onClick={() => {
                  if (
                    activeQuestion.skill === "poem" &&
                    activeQuestion.poemVisual
                  ) {
                    speech.speak(
                      `${activeQuestion.poemVisual.title}. ${activeQuestion.poemVisual.lines.join(" ")}`,
                      "vi-VN",
                    );
                  } else {
                    speech.speak(activeQuestion.bubblePrompt, "vi-VN");
                  }
                }}
              >
                <p className="speech-bubble-text">{activeQuestion.bubblePrompt}</p>
                <span className="speech-bubble-audio-tag">
                  <Volume2 size={15} /> Chạm để nghe đọc
                </span>
              </button>
            </div>

            {/* Thẻ Trắng Sứ Mềm (Soft Porcelain Card) */}
            <div className="bedroom-porcelain-question-card">
              {/* -------------------------------------------------------------
                  TRẠM 5: TRANG SÁCH ĐỌC THƠ & QUOTE ĐÁNG YÊU HÀNG NGÀY
                 ------------------------------------------------------------- */}
              {activeQuestion.skill === "poem" && activeQuestion.poemVisual ? (
                <div className="bedroom-poem-storybook-view">
                  <div className="poem-book-top-bar">
                    <span className="poem-daily-badge">
                      {activeQuestion.poemVisual.badge}
                    </span>
                    <button
                      type="button"
                      className="poem-change-btn"
                      onClick={handleShuffleNewQuestionInStation}
                    >
                      <RefreshCw size={13} /> Đổi trang thơ khác
                    </button>
                  </div>

                  <div className="poem-open-pages-box">
                    <div className="poem-illustration-side">
                      <div className="poem- big-icon-halo">
                        {activeQuestion.poemVisual.imageSrc ? (
                          <img
                            src={activeQuestion.poemVisual.imageSrc}
                            alt={activeQuestion.poemVisual.title}
                            className="poem-cutout-img"
                          />
                        ) : (
                          <span className="poem-big-emoji">
                            {activeQuestion.poemVisual.icon}
                          </span>
                        )}
                      </div>
                      <strong className="poem-book-title">
                        {activeQuestion.poemVisual.title}
                      </strong>
                      <button
                        type="button"
                        className="poem-listen-pill-btn"
                        onClick={() =>
                          speech.speak(
                            `${activeQuestion.poemVisual?.title}. ${activeQuestion.poemVisual?.lines.join(" ")}`,
                            "vi-VN",
                          )
                        }
                      >
                        <Volume2 size={15} /> Nghe đọc mẫu
                      </button>
                    </div>

                    <div className="poem-verses-side">
                      {activeQuestion.poemVisual.lines.map((line, idx) => (
                        <p key={idx} className="poem-verse-line">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="poem-quote-footer-box">
                    {activeQuestion.poemVisual.moralQuote}
                  </div>

                  <div className="porcelain-card-footer">
                    <button
                      type="button"
                      className="bedroom-candy-cta-btn"
                      onClick={handleConfirmAnswer}
                    >
                      {isHalloween
                        ? "Con đã đọc xong! Nhận Kẹo 🍬"
                        : "Con đã đọc xong! Nhận Sao ⭐"}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="porcelain-question-title">
                    {activeQuestion.questionTitle}
                  </h3>

                  {/* ---------------------------------------------------------
                      MINH HỌA TRẠM 2: ĐĨA BÁNH TOÁN TÌNH HUỐNG (THÊM / ĂN BỚT / ĐẾM)
                     --------------------------------------------------------- */}
                  {activeQuestion.mathVisual && (
                    <div className="bedroom-math-tray-showcase">
                      <div className="math-plate-group">
                        {Array.from({
                          length: activeQuestion.mathVisual.initialCount,
                        }).map((_, idx) => {
                          const isEaten =
                            activeQuestion.mathVisual?.mode === "subtract" &&
                            idx >=
                              activeQuestion.mathVisual.initialCount -
                                activeQuestion.mathVisual.deltaCount;
                          return (
                            <span
                              key={idx}
                              className={`math-plate-treat-item ${
                                isEaten ? "is-eaten" : ""
                              }`}
                            >
                              {activeQuestion.mathVisual?.itemImageSrc ? (
                                <img
                                  src={activeQuestion.mathVisual.itemImageSrc}
                                  alt=""
                                  className="math-plate-treat-img"
                                />
                              ) : (
                                activeQuestion.mathVisual?.itemIcon
                              )}
                              {isEaten && (
                                <span className="eaten-cross-tag">Đã ăn</span>
                              )}
                            </span>
                          );
                        })}
                      </div>

                      {activeQuestion.mathVisual.mode === "add" && (
                        <>
                          <span className="math-tray-operator">+</span>
                          <div className="math-plate-group bonus-plate">
                            {Array.from({
                              length: activeQuestion.mathVisual.deltaCount,
                            }).map((_, idx) => (
                              <span key={idx} className="math-plate-treat-item">
                                {activeQuestion.mathVisual?.itemImageSrc ? (
                                  <img
                                    src={activeQuestion.mathVisual.itemImageSrc}
                                    alt=""
                                    className="math-plate-treat-img"
                                  />
                                ) : (
                                  activeQuestion.mathVisual?.itemIcon
                                )}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* ---------------------------------------------------------
                      MINH HỌA TRẠM 3: HỌC ĐỌC ĐIỀN NỐT CHỮ (ICON MÂY -> M...)
                     --------------------------------------------------------- */}
                  {activeQuestion.readingVisual && (
                    <div className="bedroom-reading-blank-showcase">
                      <div className="reading-blank-icon-box">
                        {activeQuestion.readingVisual.imageSrc ? (
                          <img
                            src={activeQuestion.readingVisual.imageSrc}
                            alt={activeQuestion.readingVisual.fullWord}
                            className="reading-blank-cutout-img"
                          />
                        ) : (
                          <span>{activeQuestion.readingVisual.icon}</span>
                        )}
                      </div>
                      <div className="reading-blank-word-board">
                        <span className="reading-masked-word">
                          {selectedReadingPreview ? (
                            <span className="reading-filled-preview">
                              {selectedReadingPreview}
                            </span>
                          ) : (
                            activeQuestion.readingVisual.maskedPrefix
                          )}
                        </span>
                        <span className="reading-phonics-sub">
                          💡 Gợi ý đánh vần:{" "}
                          {activeQuestion.readingVisual.phonicsHint}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* ---------------------------------------------------------
                      MINH HỌA TRẠM 4: HỘP ĐỒ VẬT TIẾNG ANH
                     --------------------------------------------------------- */}
                  {activeQuestion.englishVisual && (
                    <div className="bedroom-english-box-showcase">
                      <div className="english-pop-icon-circle">
                        {activeQuestion.englishVisual.imageSrc ? (
                          <img
                            src={activeQuestion.englishVisual.imageSrc}
                            alt={activeQuestion.englishVisual.vietnameseName}
                            className="english-pop-cutout-img"
                          />
                        ) : (
                          <span>{activeQuestion.englishVisual.icon}</span>
                        )}
                      </div>
                      <div className="english-pop-info">
                        <strong>
                          {activeQuestion.englishVisual.vietnameseName}
                        </strong>
                        <button
                          type="button"
                          className="english-listen-hint-btn"
                          onClick={() =>
                            speech.speak(
                              activeQuestion.englishVisual?.englishWord || "",
                              "en-US",
                            )
                          }
                        >
                          <Volume2 size={14} /> Nghe phát âm mẫu
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Lưới 4 Đáp Án (4 quyển sách / 4 con số / 4 vần / 4 từ Tiếng Anh) */}
                  <div
                    className={`porcelain-options-grid style-${activeQuestion.options[0]?.visualStyle ?? "number"}`}
                  >
                    {activeQuestion.options.map((opt) => {
                      const isSelected = selectedOptionId === opt.id;
                      const isEliminated = wrongOptionIds.includes(opt.id);

                      return (
                        <button
                          key={opt.id}
                          type="button"
                          disabled={isEliminated}
                          className={`porcelain-option-tile visual-${opt.visualStyle} ${
                            isSelected ? "is-selected" : ""
                          } ${isEliminated ? "kawaii-answer-eliminated" : ""}`}
                          onClick={() => handleSelectOption(opt)}
                        >
                          {opt.visualStyle === "book" ? (
                            <div
                              className="demo-book-cover"
                              style={{
                                background: opt.cardBg,
                                borderColor: opt.cardBorder,
                              }}
                            >
                              <div className="demo-book-spine" />
                              <div className="demo-book-emblem">{opt.icon}</div>
                            </div>
                          ) : opt.visualStyle === "number" ? (
                            <div className="demo-number-box">
                              <span className="demo-number-confetti c1" />
                              <span className="demo-number-confetti c2" />
                              <span className="demo-number-digit">
                                {opt.label}
                              </span>
                            </div>
                          ) : (
                            <div className="demo-rich-option-content">
                              {opt.imageSrc && (
                                <img
                                  src={opt.imageSrc}
                                  alt={opt.label}
                                  className="demo-rich-option-cutout"
                                />
                              )}
                              <strong className="demo-rich-label">
                                {opt.label}
                              </strong>
                              {opt.subLabel && (
                                <span className="demo-rich-sub">
                                  {opt.subLabel}
                                </span>
                              )}
                            </div>
                          )}

                          {opt.visualStyle === "book" && (
                            <span className="demo-book-caption">
                              {opt.label}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Nút "Chọn" phong cách Candy Glossy Pill */}
                  <div className="porcelain-card-footer">
                    <button
                      type="button"
                      className="bedroom-candy-cta-btn"
                      disabled={!selectedOptionId}
                      onClick={handleConfirmAnswer}
                    >
                      Chọn
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MÀN HÌNH KHEN THƯỞNG "+1 NGÔI SAO / +1 VIÊN KẸO" + NÚT "TIẾP TỤC"
          ===================================================================== */}
      {stage === "star-reward" && activeQuestion && (
        <div className="bedroom-center-modal-backdrop">
          <div className="bedroom-star-reward-showcase">
            <div className="star-reward-hero-top">
              <div className="star-reward-halo-glow" />
              <div className="star-reward-giant-star">
                {isHalloween ? (
                  <PlumpCandySvg size={94} filled />
                ) : (
                  <PlumpStarSvg size={92} filled />
                )}
              </div>
              <img
                src={currentRoom.mascotHappyImage}
                alt={currentRoom.characterName}
                className="star-reward-mascot-img"
              />
            </div>

            <div className="star-reward-white-card">
              <h3 className="star-reward-title">{activeQuestion.praiseTitle}</h3>
              <p className="star-reward-subtitle">
                {activeQuestion.praiseSubtitle}
              </p>

              <div className="star-plus-one-pill">
                {isHalloween ? (
                  <PlumpCandySvg size={34} filled />
                ) : (
                  <PlumpStarSvg size={34} filled />
                )}
                <span className="plus-one-text">+1</span>
                <span className="plus-one-progress">
                  ({Math.min(starsCollected, STARS_REQUIRED_FOR_CHEST)}/
                  {STARS_REQUIRED_FOR_CHEST} {tokenShortLabel})
                </span>
              </div>
            </div>

            <button
              type="button"
              className="bedroom-candy-cta-btn large-continue-btn"
              onClick={handleContinueAfterStar}
            >
              Tiếp tục
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          MÀN HÌNH MỞ RƯƠNG 5 SAO / GIỎ BÍ NGÔ 5 KẸO & NHẬN STICKER MỚI
          ===================================================================== */}
      {stage === "chest-victory" && (
        <div className="bedroom-center-modal-backdrop victory-backdrop">
          <div className="bedroom-chest-victory-card">
            <div className="chest-victory-ribbon">
              <span>
                {isHalloween
                  ? `🎃 Bạn đã thu thập đủ ${STARS_REQUIRED_FOR_CHEST} Viên Kẹo Halloween!`
                  : `🎉 Bạn đã thu thập đủ ${STARS_REQUIRED_FOR_CHEST} ngôi sao!`}
              </span>
            </div>

            <div className="chest-victory-stage-box">
              <div className="chest-sunburst-rays" />
              {isHalloween && unlockedHalloweenBundle ? (
                <div className="halloween-double-reward-showcase">
                  <div className="halloween-reward-card">
                    <img
                      src={unlockedHalloweenBundle.characterSticker.image}
                      alt={unlockedHalloweenBundle.characterSticker.name}
                      className="halloween-reward-img"
                    />
                    <span className="halloween-reward-badge">
                      🧙‍♂️ {unlockedHalloweenBundle.characterSticker.name}
                    </span>
                  </div>
                  <div className="halloween-reward-card">
                    <img
                      src={unlockedHalloweenBundle.itemSticker.image}
                      alt={unlockedHalloweenBundle.itemSticker.name}
                      className="halloween-reward-img"
                    />
                    <span className="halloween-reward-badge">
                      🎃 {unlockedHalloweenBundle.itemSticker.name}
                    </span>
                  </div>
                </div>
              ) : (
                <img
                  src={
                    unlockedSticker?.image || currentRoom.mascotHappyImage
                  }
                  alt={unlockedSticker?.name || currentRoom.characterName}
                  className="chest-mascot-pop-img"
                />
              )}
              <div className="chest-stars-cluster">
                {isHalloween ? (
                  <>
                    <PlumpCandySvg size={36} filled className="cluster-star s1" />
                    <PlumpCandySvg size={44} filled className="cluster-star s2" />
                    <PlumpCandySvg size={52} filled className="cluster-star s3" />
                    <PlumpCandySvg size={44} filled className="cluster-star s4" />
                    <PlumpCandySvg size={36} filled className="cluster-star s5" />
                  </>
                ) : (
                  <>
                    <PlumpStarSvg size={36} filled className="cluster-star s1" />
                    <PlumpStarSvg size={44} filled className="cluster-star s2" />
                    <PlumpStarSvg size={52} filled className="cluster-star s3" />
                    <PlumpStarSvg size={44} filled className="cluster-star s4" />
                    <PlumpStarSvg size={36} filled className="cluster-star s5" />
                  </>
                )}
              </div>
              {isHalloween ? (
                <img
                  src="/assets/halloween/toy-pumpkin-basket.webp"
                  alt="Giỏ Bí Ngô Halloween"
                  className="halloween-victory-basket-img"
                />
              ) : (
                <div className="kawaii-treasure-chest-box">
                  <div className="chest-lid-gold" />
                  <div className="chest-body-wood">
                    <div className="chest-lock-shield">
                      <PlumpStarSvg size={22} filled />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {isHalloween && unlockedHalloweenBundle ? (
              <div className="chest-unlocked-sticker-pill">
                🎃 Mở khóa Bộ Sticker Halloween:{" "}
                <strong>{unlockedHalloweenBundle.characterSticker.name}</strong>{" "}
                + <strong>{unlockedHalloweenBundle.itemSticker.name}</strong>{" "}
                (+20 Xu Vàng 🪙)
              </div>
            ) : (
              unlockedSticker && (
                <div className="chest-unlocked-sticker-pill">
                  ✨ Phần thưởng Sticker mới:{" "}
                  <strong>{unlockedSticker.name}</strong> (+15 Xu Vàng 🪙)
                </div>
              )
            )}

            <p className="chest-victory-desc">
              {currentRoom.chestVictorySpeech}
            </p>

            <button
              type="button"
              className="bedroom-candy-cta-btn large-continue-btn"
              onClick={handleClaimTreasureChest}
            >
              {isHalloween
                ? "Cất Vào Sổ Sticker Halloween 🎃"
                : "Nhận Sticker & Quà Thưởng"}
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL "BẢN ĐỒ KHÁM PHÁ 5 NGÔI SAO"
          ===================================================================== */}
      {mapModalOpen && (
        <div
          className="bedroom-center-modal-backdrop"
          onClick={() => setMapModalOpen(false)}
        >
          <div
            className="bedroom-discovery-map-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="discovery-map-left-card">
              <div className="discovery-map-header">
                <h4>Bản đồ 5 {tokenUnitLabel} khám phá</h4>
                <button
                  type="button"
                  className="discovery-map-close-btn"
                  onClick={() => setMapModalOpen(false)}
                  aria-label="Đóng bản đồ"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="discovery-map-spots-grid five-spots">
                {currentRoom.hotspots.map((spot) => {
                  const isDone = completedHotspotIds.includes(spot.id);
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      className={`discovery-spot-item ${isDone ? "is-done" : ""}`}
                      onClick={() => handleOpenHotspot(spot)}
                    >
                      <div className="discovery-spot-thumb-circle">
                        <div
                          className="discovery-spot-thumb-crop"
                          style={{
                            backgroundImage: `url("${currentRoom.roomImage}")`,
                            backgroundPosition: `${spot.x}% ${spot.y}%`,
                          }}
                        />
                        <span
                          className={`discovery-spot-check-badge ${
                            isDone ? "done" : ""
                          }`}
                        >
                          <Check size={12} strokeWidth={3} />
                        </span>
                      </div>

                      <strong className="discovery-spot-name">{spot.name}</strong>

                      <span
                        className={`discovery-spot-status-pill ${
                          isDone ? "done" : ""
                        }`}
                      >
                        {isDone ? (
                          <>
                            <span>1/1</span>
                            <Check
                              size={13}
                              strokeWidth={3}
                              className="status-green-tick"
                            />
                          </>
                        ) : (
                          <>
                            <span>0/1</span>
                            {isHalloween ? (
                              <PlumpCandySvg size={14} filled />
                            ) : (
                              <PlumpStarSvg size={14} filled />
                            )}
                          </>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="discovery-map-right-card">
              <img
                src={currentRoom.mascotAskImage}
                alt={currentRoom.characterName}
                className="discovery-map-mascot"
              />
              <div className="discovery-map-speech-box">
                <p>{currentRoom.chestPrompt}</p>
              </div>

              <div className="discovery-map-progress-row">
                <div className="discovery-stars-trio">
                  {[0, 1, 2, 3, 4].map((idx) =>
                    isHalloween ? (
                      <PlumpCandySvg
                        key={idx}
                        size={26}
                        filled={starsCollected > idx}
                      />
                    ) : (
                      <PlumpStarSvg
                        key={idx}
                        size={26}
                        filled={starsCollected > idx}
                      />
                    ),
                  )}
                </div>
                <button
                  type="button"
                  className={`discovery-mini-chest-btn ${
                    starsCollected >= STARS_REQUIRED_FOR_CHEST ? "unlocked" : ""
                  }`}
                  onClick={() => {
                    if (starsCollected >= STARS_REQUIRED_FOR_CHEST) {
                      setMapModalOpen(false);
                      openVictoryChestWithSticker();
                    } else {
                      speech.speak(currentRoom.chestPrompt, "vi-VN");
                    }
                  }}
                >
                  {isHalloween ? "🎃" : "🎁"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
