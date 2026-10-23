import { Suspense, lazy, useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Check,
  Film,
  Gift,
  Home,
  Maximize2,
  Minimize2,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Trophy,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useProgress } from "./hooks/useProgress";
import { useSpeech } from "./hooks/useSpeech";
import { subjects, getSubject } from "./data/subjects";
import {
  NAM_MASTER_CUP_IMAGE,
  NAM_SPECIAL_STICKERS,
  SUBJECT_CUPS,
  awardNamStickerOnCupOpen,
  awardNamStickerOnDailyQuest,
  awardStickerForSubject,
  getCharacterStickerEarnedCount,
  getNamRankInfo,
  getPlacedStickerCountMap,
  getSubjectSetStickerEarnedCount,
  getSubjectSetUnlockedCount,
  getSubjectStickerSet,
  getTotalLitStickers,
  getTotalUnlockedInBook,
  getUnlockedNamSpecialCount,
  isSubjectSet2Available,
  loadNamSpecialInventory,
  loadStickerStore,
  resetSubjectStickerBoard,
  type AwardedNamCupStickerResult,
  type CharacterStickerItem,
  type DrawerTabId,
  type StickerCollectionStore,
} from "./data/rewardStickers";
import {
  claimDailyTreasureChest,
  loadDailyQuestState,
  loadQuestItemInventory,
  markDailyQuestSubjectDone,
  startNewQuestRound,
  type DailyQuestState,
  type QuestItemInventory,
} from "./data/dailyQuests";
import type { KawaiiPastryAsset } from "./data/mathLessons";
import type { ActivityProps, LessonResult, SubjectId } from "./types";
import { playCharacterTapSound, playRewardTone } from "./lib/sound";
import { getElementLocalRatio } from "./lib/touchCoords";
import {
  ParticleBurstCanvas,
  type ParticleBurstHandle,
} from "./components/ParticleBurstCanvas";
import { LobbyLiveStage } from "./components/LobbyLiveStage";
import {
  Kitty25DTeacher,
  type KittyActionMode,
} from "./components/Kitty25DTeacher";
import { GoldenCupCeremonyModal } from "./components/GoldenCupCeremonyModal";

const ReadingActivity = lazy(() =>
  import("./components/ReadingActivity").then((m) => ({
    default: m.ReadingActivity,
  })),
);
const MathActivity = lazy(() =>
  import("./components/MathActivity").then((m) => ({
    default: m.MathActivity,
  })),
);
const MusicActivity = lazy(() =>
  import("./components/MusicActivity").then((m) => ({
    default: m.MusicActivity,
  })),
);
const EnglishActivity = lazy(() =>
  import("./components/EnglishActivity").then((m) => ({
    default: m.EnglishActivity,
  })),
);
const StorybookActivity = lazy(() =>
  import("./components/StorybookActivity").then((m) => ({
    default: m.StorybookActivity,
  })),
);
const ColoringActivity = lazy(() =>
  import("./components/ColoringActivity").then((m) => ({
    default: m.ColoringActivity,
  })),
);
const PochaccoActivity = lazy(() =>
  import("./components/PochaccoActivity").then((m) => ({
    default: m.PochaccoActivity,
  })),
);
const LifeSkillsActivity = lazy(() =>
  import("./components/LifeSkillsActivity").then((m) => ({
    default: m.LifeSkillsActivity,
  })),
);
const StickerBookScreen = lazy(() =>
  import("./components/StickerBookScreen").then((m) => ({
    default: m.StickerBookScreen,
  })),
);
const ParentPanel = lazy(() =>
  import("./components/ParentPanel").then((m) => ({
    default: m.ParentPanel,
  })),
);

const NAM_TAP_LINES = [
  "Hihi, nhột quá! Tớ là Nấm chăm học đây!",
  "Yeh! Hôm nay Nấm sẽ sưu tập thật nhiều sticker!",
  "Đập tay high five với Nấm một cái nào!",
  "Cố lên nào, học bài vui quá đi!",
];

const TEACHER_TAP_LINES = [
  "Hoan hô bé Nấm! Con học siêu quá đi!",
  "Hihi, cô thưởng cho Nấm thật nhiều tim hồng nhé!",
  "Nấm ơi cố lên, sắp nhận được sticker mới rồi!",
  "Giỏi lắm! Đập tay với cô một cái nào!",
];

type Page =
  | { type: "home" }
  | { type: "lesson"; subject: SubjectId }
  | {
      type: "victory-video";
      subject: SubjectId;
      awardedSticker: CharacterStickerItem;
      justCompletedFullSet: boolean;
    }
  | {
      type: "reward";
      subject: SubjectId;
      awardedSticker: CharacterStickerItem;
      justCompletedFullSet: boolean;
    }
  | { type: "stars"; initialSubject?: SubjectId }
  | {
      type: "sticker-book";
      initialFilter?: DrawerTabId;
      initialPageId?: string;
    }
  | { type: "parents" };

const activities: Record<SubjectId, React.ComponentType<ActivityProps>> = {
  reading: ReadingActivity,
  math: MathActivity,
  music: MusicActivity,
  english: EnglishActivity,
  storybook: StorybookActivity,
  coloring: ColoringActivity,
  minigame: PochaccoActivity,
  lifeskills: LifeSkillsActivity,
};

interface LocalVideoItem {
  id: string;
  filename: string;
  title: string;
  sourceDir: "video-nam" | "root";
  sizeMB: number;
  duration?: string;
  thumbUrl?: string;
}

function App() {
  const [page, setPage] = useState<Page>({ type: "home" });
  const [attemptKey, setAttemptKey] = useState(0);
  const [poseVariant, setPoseVariant] = useState<1 | 2 | 3 | 4>(1);
  const [reaction, setReaction] = useState<{
    type: "happy" | "sad" | "singing" | "idle";
    message: string;
  }>({ type: "idle", message: "" });
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [localVideos, setLocalVideos] = useState<LocalVideoItem[]>([]);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const videoStripRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const mainBoardRef = useRef<HTMLElement | null>(null);
  const particleRef = useRef<ParticleBurstHandle | null>(null);
  const tapLineIdxRef = useRef(0);

  // Trạng thái nhận diện đang ở Menu chọn bài học hay đã vào trong bài học (để mở Bảng Học Full Screen)
  const [isInLessonPicker, setIsInLessonPicker] = useState(true);
  const [isBoardFullscreen, setIsBoardFullscreen] = useState(true);
  const [isDeviceFullscreen, setIsDeviceFullscreen] = useState(false);
  const [lobbyPage, setLobbyPage] = useState<0 | 1>(0);
  const [uiScale, setUiScale] = useState<number>(() => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth <= 960 || window.innerHeight <= 540) return 1;
    return Number(
      Math.max(
        1,
        Math.min(window.innerWidth / 1180, window.innerHeight / 620),
      ).toFixed(4),
    );
  });

  useEffect(() => {
    const updateScale = () => {
      if (window.innerWidth <= 960 || window.innerHeight <= 540) {
        setUiScale(1);
        return;
      }
      const next = Math.max(
        1,
        Math.min(window.innerWidth / 1180, window.innerHeight / 620),
      );
      setUiScale(Number(next.toFixed(4)));
    };
    const onFsChange = () => {
      setIsDeviceFullscreen(Boolean(document.fullscreenElement));
      updateScale();
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => {
      window.removeEventListener("resize", updateScale);
      document.removeEventListener("fullscreenchange", onFsChange);
    };
  }, []);

  async function toggleDeviceFullscreen() {
    try {
      const docEl = document.documentElement as HTMLElement & {
        webkitRequestFullscreen?: () => Promise<void>;
      };
      const doc = document as Document & {
        webkitExitFullscreen?: () => Promise<void>;
      };
      if (!document.fullscreenElement) {
        if (docEl.requestFullscreen) {
          await docEl.requestFullscreen();
        } else if (docEl.webkitRequestFullscreen) {
          await docEl.webkitRequestFullscreen();
        } else {
          window.alert(
            "📱 Trên iPhone (Safari): Hãy bấm nút Chia sẻ [⬆️] ở thanh dưới trình duyệt ➔ Chọn 'Thêm vào Màn hình chính' (Add to Home Screen), sau đó mở biểu tượng Nấm Học Vui ngoài màn hình chính để chơi Toàn Màn Hình 100% nhé!",
          );
          return;
        }
        const scr = window.screen as Screen & {
          orientation?: { lock?: (mode: string) => Promise<void> };
        };
        scr.orientation?.lock?.("landscape").catch(() => {});
      } else if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (doc.webkitExitFullscreen) {
        await doc.webkitExitFullscreen();
      }
    } catch {
      window.alert(
        "📱 Trên iPhone (Safari): Hãy bấm nút Chia sẻ [⬆️] ở thanh dưới trình duyệt ➔ Chọn 'Thêm vào Màn hình chính' (Add to Home Screen) để mở App Toàn Màn Hình 100% nhé!",
      );
    }
  }

  // Lưu trữ bộ sưu tập Cúp & 6 Sticker của từng môn học
  const [stickerStore, setStickerStore] = useState<StickerCollectionStore>(() =>
    loadStickerStore(),
  );
  const [selectedCupSubject, setSelectedCupSubject] =
    useState<SubjectId>("reading");
  const [selectedStickerSet, setSelectedStickerSet] = useState<1 | 2 | 3 | 4>(1);
  const [isViewingNamVipSet, setIsViewingNamVipSet] = useState(false);
  const [namVipPage, setNamVipPage] = useState<1 | 2 | 3 | 4>(1);
  const [chestNamBonus, setChestNamBonus] =
    useState<AwardedNamCupStickerResult | null>(null);

  // Bản đồ 3 Nhiệm Vụ Hàng Ngày & Kho Sticker Đồ Vật Nhiệm Vụ (3D Kawaii Items)
  const [dailyQuests, setDailyQuests] = useState<DailyQuestState>(() =>
    loadDailyQuestState(),
  );
  const [questItemInventory, setQuestItemInventory] =
    useState<QuestItemInventory>(() => loadQuestItemInventory());
  const [dailyChestModalOpen, setDailyChestModalOpen] = useState(false);
  const [chestBonusItems, setChestBonusItems] = useState<
    KawaiiPastryAsset[] | null
  >(null);
  const [chestBonusStickers, setChestBonusStickers] = useState<
    { subjectId: SubjectId; sticker: CharacterStickerItem }[] | null
  >(null);
  const [ceremonySubject, setCeremonySubject] = useState<SubjectId | null>(
    null,
  );

  const {
    progress,
    completeLesson,
    setSoundEnabled,
    resetProgress,
    importProgress,
  } = useProgress();
  const speech = useSpeech(progress.soundEnabled);
  const rewarded = useRef(false);

  const totalLitStickers = getTotalLitStickers(stickerStore);
  const totalUnlockedInBook = getTotalUnlockedInBook(stickerStore);
  const namRank = getNamRankInfo(stickerStore);
  const doneQuestCount = dailyQuests.quests.filter((q) => q.done).length;
  const allThreeQuestsDone = doneQuestCount === 3;

  function triggerTapBurst(
    e: React.MouseEvent<HTMLElement>,
    theme: "pink" | "gold" | "rainbow" = "pink",
  ) {
    if (progress.soundEnabled) {
      playCharacterTapSound();
    }
    const vp = viewportRef.current;
    if (vp && particleRef.current) {
      const { ratioX, ratioY } = getElementLocalRatio(
        e.clientX,
        e.clientY,
        vp,
      );
      particleRef.current.burstAt(
        ratioX * vp.clientWidth,
        ratioY * vp.clientHeight,
        theme,
      );
    }
  }

  function launchFullScreenFireworks() {
    const vp = viewportRef.current;
    if (!vp || !particleRef.current) return;
    const w = vp.clientWidth;
    const h = vp.clientHeight;
    const points: [number, number, "pink" | "gold" | "rainbow"][] = [
      [w * 0.5, h * 0.42, "rainbow"],
      [w * 0.24, h * 0.36, "gold"],
      [w * 0.76, h * 0.36, "pink"],
      [w * 0.35, h * 0.25, "rainbow"],
      [w * 0.65, h * 0.25, "gold"],
      [w * 0.5, h * 0.3, "pink"],
    ];
    points.forEach(([px, py, theme], idx) => {
      window.setTimeout(() => {
        if (progress.soundEnabled && idx % 2 === 0) {
          playCharacterTapSound();
        }
        particleRef.current?.burstAt(px, py, theme);
      }, idx * 240);
    });
  }

  function handleOpenDailyChest() {
    if (dailyQuests.chestClaimed) return;
    const outcome = claimDailyTreasureChest(
      dailyQuests,
      stickerStore,
      questItemInventory,
    );
    const namAward = awardNamStickerOnDailyQuest(dailyQuests.round);
    setDailyQuests(outcome.updatedQuestState);
    setStickerStore(outcome.updatedStickerStore);
    setQuestItemInventory(outcome.updatedQuestItemInventory);
    setChestBonusItems(outcome.bonusItems);
    setChestBonusStickers(outcome.bonusStickers);
    setChestNamBonus(namAward);
    if (progress.soundEnabled) {
      playRewardTone();
      speech.speak(
        `Oa! Chúc mừng bé Nấm đã hoàn thành đủ ba nhiệm vụ hôm nay! Con nhận được một Sticker Bé Nấm xịn nhất: ${namAward.sticker.name} cùng bốn Sticker Đồ Vật để dán vào Vở nhé!`,
        "vi-VN",
      );
    }
    launchFullScreenFireworks();
  }

  function handleStartNewQuestRound() {
    const next = startNewQuestRound(dailyQuests);
    setDailyQuests(next);
    setChestBonusItems(null);
    setChestBonusStickers(null);
    setChestNamBonus(null);
    if (progress.soundEnabled) {
      playCharacterTapSound();
      speech.speak(
        "Cô Kitty đã giao ba nhiệm vụ mới cho bé Nấm rồi đây! Mình cùng bắt đầu nào!",
        "vi-VN",
      );
    }
  }

  async function openVideoTheater() {
    speech.stop();
    setActiveVideoId(null);
    setVideoModalOpen(true);
    try {
      const res = await fetch("/api/local-videos");
      const ct = res.headers.get("content-type") || "";
      if (!res.ok || !ct.includes("application/json")) {
        setLocalVideos([]);
        if (progress.soundEnabled) {
          speech.speak(
            "Kho phim hoạt hình dài đang cất trong máy tính của Ba Mẹ. Khi mở máy tính ở nhà, Nấm sẽ xem được đầy đủ phim nhé! Bây giờ Nấm có thể hát Karaoke hoặc xem Bài Hát Tiếng Anh luôn nha!",
            "vi-VN",
          );
        }
        return;
      }
      const data = await res.json();
      const list: LocalVideoItem[] = data.videos || [];
      setLocalVideos(list);
      if (list.length === 0 && progress.soundEnabled) {
        speech.speak(
          "Kho phim hoạt hình dài đang cất trong máy tính của Ba Mẹ. Khi mở máy tính ở nhà, Nấm sẽ xem được đầy đủ phim nhé! Bây giờ Nấm có thể hát Karaoke hoặc xem Bài Hát Tiếng Anh luôn nha!",
          "vi-VN",
        );
      }
    } catch (e) {
      console.error("Failed to load local videos", e);
      setLocalVideos([]);
      if (progress.soundEnabled) {
        speech.speak(
          "Kho phim hoạt hình dài đang cất trong máy tính của Ba Mẹ. Khi mở máy tính ở nhà, Nấm sẽ xem được đầy đủ phim nhé! Bây giờ Nấm có thể hát Karaoke hoặc xem Bài Hát Tiếng Anh luôn nha!",
          "vi-VN",
        );
      }
    }
  }

  useEffect(() => {
    if (reaction.type === "idle") return;
    const timer = window.setTimeout(() => {
      setReaction({ type: "idle", message: "" });
    }, 3500);
    return () => window.clearTimeout(timer);
  }, [reaction]);

  const [isMusicModuleIdle, setIsMusicModuleIdle] = useState(true);

  // Tự động phát hiện khi bé đang ở Menu chọn bài học hay đã vào trong Bài học thực sự
  useEffect(() => {
    if (page.type !== "lesson") return;
    const el = mainBoardRef.current;
    if (!el) return;

    let prevHasPicker = true;
    const checkPickerState = () => {
      const hasPicker = Boolean(
        el.querySelector(
          ".lesson-picker-screen, .coloring-menu-screen, .coloring-gallery-screen, .select-board-window",
        ),
      );
      const hasMusicIdle = Boolean(
        el.querySelector(".music-module-select-only"),
      );
      setIsInLessonPicker(hasPicker);
      setIsMusicModuleIdle(hasMusicIdle);
      // Khi vừa bấm chọn bài học (từ Menu -> vào Bài), tự động mở Bảng Học Full Screen
      if (prevHasPicker && !hasPicker) {
        setIsBoardFullscreen(true);
      }
      prevHasPicker = hasPicker;
    };

    checkPickerState();
    const observer = new MutationObserver(checkPickerState);
    observer.observe(el, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [page, attemptKey]);

  function startLesson(subject: SubjectId) {
    rewarded.current = false;
    setAttemptKey((k) => k + 1);
    const defaultVariantBySubject: Record<SubjectId, 1 | 2 | 3 | 4> = {
      reading: 1,
      math: 1,
      music: 2,
      minigame: 2,
      english: 3,
      coloring: 4,
      storybook: 1,
      lifeskills: 4,
    };
    setPoseVariant(defaultVariantBySubject[subject] || 1);
    setIsInLessonPicker(subject !== "lifeskills");
    setIsMusicModuleIdle(subject === "music");
    setIsBoardFullscreen(true);
    setReaction({ type: "idle", message: "" });
    setDailyChestModalOpen(false);
    setCeremonySubject(null);
    setPage({ type: "lesson", subject });
  }

  function proceedToReward(
    subject: SubjectId,
    awardedSticker: CharacterStickerItem,
    justCompletedFullSet: boolean,
  ) {
    const cup = SUBJECT_CUPS[subject];
    if (progress.soundEnabled) {
      playRewardTone();
      if (justCompletedFullSet) {
        speech.speak(
          `Tuyệt vời quá! Bé Nấm vừa nhận được sticker ${awardedSticker.name} và thắp sáng đủ cả sáu sticker của ${cup.characterName}! Nấm bấm mở Cúp Vàng để cất cả sáu sticker vào Quyển Vở Sticker nhé!`,
          "vi-VN",
        );
      } else {
        speech.speak(
          `Hoan hô! Bé Nấm giỏi quá, con được tặng sticker ${awardedSticker.name} của bạn ${cup.characterName}!`,
          "vi-VN",
        );
      }
    }
    setSelectedCupSubject(subject);
    setPage({
      type: "reward",
      subject,
      awardedSticker,
      justCompletedFullSet,
    });
  }

  function finishLesson(subject: SubjectId, result: LessonResult) {
    if (rewarded.current) return;
    rewarded.current = true;
    speech.stop();
    completeLesson(getSubject(subject).lessonId, result);

    // Tặng 1 Sticker nhân vật tương ứng với môn học (thắp sáng trên bảng 6 sticker)
    const outcome = awardStickerForSubject(stickerStore, subject);
    setStickerStore(outcome.updatedStore);
    setSelectedCupSubject(subject);

    // Đánh dấu hoàn thành Nhiệm Vụ Hôm Nay nếu môn này nằm trong 3 nhiệm vụ
    const questOutcome = markDailyQuestSubjectDone(dailyQuests, subject);
    if (questOutcome.wasQuestSubject) {
      setDailyQuests(questOutcome.updatedQuestState);
    }

    setPage({
      type: "victory-video",
      subject,
      awardedSticker: outcome.awardedSticker,
      justCompletedFullSet: outcome.justCompletedFullSet,
    });
  }

  function handleResetCupStickers(subject: SubjectId) {
    setCeremonySubject(subject);
  }

  function handleHarvestCupToBook(subject: SubjectId) {
    const nextStore = resetSubjectStickerBoard(stickerStore, subject);
    setStickerStore(nextStore);
    return awardNamStickerOnCupOpen(nextStore, subject);
  }

  function handleReaction(
    type: "happy" | "sad" | "singing" | "idle",
    message = "",
  ) {
    setReaction({ type, message });
    if (type === "happy" && viewportRef.current && particleRef.current) {
      const w = viewportRef.current.clientWidth;
      const h = viewportRef.current.clientHeight;
      particleRef.current.burstAt(w * 0.14, h * 0.52, "pink");
      particleRef.current.burstAt(w * 0.86, h * 0.52, "gold");
    }
  }

  return (
    <div
      ref={viewportRef}
      className="game-viewport"
      style={
        uiScale > 1.01
          ? ({
              "--ui-scale": uiScale,
              width: `${100 / uiScale}vw`,
              height: `${100 / uiScale}vh`,
              transform: `scale(${uiScale})`,
              transformOrigin: "top left",
            } as React.CSSProperties)
          : undefined
      }
    >
      <ParticleBurstCanvas ref={particleRef} />
      {/* =====================================================================
          1. MÀN HÌNH SẢNH CHÍNH PASTEL (8 MÔN HỌC 4x2 TRÊN KHAY KEM SỮA)
         ===================================================================== */}
      {page.type === "home" && (
        <div
          className="scene-screen lobby-screen pastel-lobby-screen"
          style={{
            backgroundImage: `url("/assets/scene-lobby-pastel.png")`,
          }}
        >
          {/* Thanh điều khiển Kính Mờ Kem Pastel gọn ở 2 góc trên (không che bảng mây ở giữa) */}
          <header className="garland-hud pastel-lobby-hud">
            <div className="hud-left-group">
              <button
                type="button"
                className="hud-pill hud-gold"
                onClick={() => setPage({ type: "stars" })}
                title="Phòng Cúp Vàng & Bảng 6 Sticker"
              >
                <Trophy size={16} />
                <span>Cúp: {totalLitStickers}/48</span>
              </button>
              <button
                type="button"
                className="hud-pill hud-pink"
                onClick={() =>
                  setPage({ type: "sticker-book", initialFilter: "unlocked" })
                }
                title="Mở Quyển Vở Dán Sticker Của Nấm"
              >
                <BookOpen size={16} />
                <span>📒 Vở Sticker ({totalUnlockedInBook})</span>
              </button>
              <button
                type="button"
                className={`hud-pill quest-compact-trigger ${
                  allThreeQuestsDone && !dailyQuests.chestClaimed
                    ? "ready-pulse"
                    : ""
                }`}
                onClick={() => {
                  setChestBonusStickers(null);
                  setDailyChestModalOpen(true);
                }}
                title="Mở Bản Đồ 3 Nhiệm Vụ & Rương Kho Báu Hôm Nay"
              >
                <Gift size={16} />
                <span>
                  {allThreeQuestsDone && !dailyQuests.chestClaimed
                    ? "🎁 Mở Rương!"
                    : `🗺️ Nhiệm vụ (${doneQuestCount}/3)`}
                </span>
              </button>
            </div>

            <div className="hud-right-group">
              <button
                type="button"
                className="hud-pill hud-blue"
                onClick={() => setSoundEnabled(!progress.soundEnabled)}
                title={progress.soundEnabled ? "Tắt âm thanh" : "Bật âm thanh"}
              >
                {progress.soundEnabled ? (
                  <Volume2 size={17} />
                ) : (
                  <VolumeX size={17} />
                )}
              </button>
              <button
                type="button"
                className="hud-pill hud-pink"
                onClick={toggleDeviceFullscreen}
                title="Bật/Tắt Toàn Màn Hình"
              >
                {isDeviceFullscreen ? (
                  <Minimize2 size={16} />
                ) : (
                  <Maximize2 size={16} />
                )}
              </button>
              <button
                type="button"
                className="hud-pill hud-orange"
                onClick={() => setPage({ type: "parents" })}
              >
                <ShieldCheck size={16} /> Ba Mẹ
              </button>
            </div>
          </header>

          {/* Sân khấu Live 60fps: Nắng mai lấp lánh & chạm vào 6 bạn ở tầng trên để nghe lời chào */}
          <LobbyLiveStage
            onTapCharacter={(char, e) => {
              triggerTapBurst(e, char.theme);
              speech.speak(char.greeting, "vi-VN");
            }}
            onTapSign={(e) => {
              triggerTapBurst(e, "rainbow");
              const line =
                NAM_TAP_LINES[tapLineIdxRef.current % NAM_TAP_LINES.length];
              tapLineIdxRef.current += 1;
              speech.speak(line, "vi-VN");
            }}
          />

          {/* Khay 8 Môn Học Pastel (4 cột × 2 hàng) nằm gọn trong lòng bảng kem sữa */}
          <div className={`lobby-dock-container pastel-grid-8 page-${lobbyPage}`}>
            <button
              type="button"
              className="lobby-page-arrow prev"
              onClick={() => setLobbyPage((p) => (p === 0 ? 1 : 0))}
              aria-label="Trang môn học trước"
            >
              ◀
            </button>

            <div className="lobby-cards-dock pastel-8-cards-grid">
              {subjects.map((subj, idx) => {
                const questItem = dailyQuests.quests.find(
                  (q) => q.subjectId === subj.id,
                );
                const cardPage = idx < 4 ? 0 : 1;
                const isHiddenOnMobilePage = cardPage !== lobbyPage;
                return (
                  <button
                    key={subj.id}
                    type="button"
                    className={`game-module-card pastel-art-card ${
                      questItem && !questItem.done ? "quest-highlight-card" : ""
                    } ${isHiddenOnMobilePage ? "mobile-page-hidden" : "mobile-page-visible"}`}
                    style={
                      { "--card-accent": subj.colorTheme } as React.CSSProperties
                    }
                    onClick={() => startLesson(subj.id)}
                    aria-label={`${subj.name} cùng ${subj.teacher}`}
                  >
                    <div className="module-card-thumb pastel-full-art-thumb">
                      <img src={`/assets/${subj.image}`} alt={subj.name} />
                      {questItem && (
                        <span
                          className={`card-quest-badge ${
                            questItem.done ? "done" : "pending"
                          }`}
                          title={
                            questItem.done
                              ? "Đã hoàn thành nhiệm vụ hôm nay!"
                              : "Nhiệm vụ hôm nay!"
                          }
                        >
                          {questItem.done ? "✅" : "⭐"}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="lobby-page-arrow next"
              onClick={() => setLobbyPage((p) => (p === 0 ? 1 : 0))}
              aria-label="Trang môn học tiếp theo"
            >
              ▶
            </button>

            <div className="lobby-page-dots">
              <button
                type="button"
                className={`lobby-page-pill ${lobbyPage === 0 ? "active" : ""}`}
                onClick={() => setLobbyPage(0)}
              >
                📚 Trang 1 (4 môn)
              </button>
              <button
                type="button"
                className={`lobby-page-pill ${lobbyPage === 1 ? "active" : ""}`}
                onClick={() => setLobbyPage(1)}
              >
                🍳 Trang 2 (4 môn)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          2. MÀN HÌNH SÂN KHẤU LỚP HỌC 16:9 (CLASSROOM STAGE)
         ===================================================================== */}
      {page.type === "lesson" &&
        (() => {
          const subject = getSubject(page.subject);
          const Activity = activities[page.subject];
          const isStorybook = page.subject === "storybook";
          const cupState = stickerStore[page.subject];
          const showFullscreenBoard =
            !isStorybook &&
            (page.subject === "lifeskills" ||
              (!isInLessonPicker && isBoardFullscreen));

          // Bộ 4 khung dây kẹo dẻo xoắn 3D pastel siêu mỏng đính Nơ / Item đặc trưng nhân vật (lòng trắng >91%)
          const BOARD_BG_MAP: Record<1 | 2 | 3 | 4, string> = {
            1: "board-candy-pink.png",
            2: "board-candy-mint.png",
            3: "board-candy-lilac.png",
            4: "board-candy-butter.png",
          };
          const BOARD_CLASS_MAP: Record<1 | 2 | 3 | 4, string> = {
            1: "kawaii-board-v2",
            2: "kawaii-board-v3",
            3: "kawaii-board-v4",
            4: "kawaii-board-v1",
          };

          const bgFile = showFullscreenBoard
            ? BOARD_BG_MAP[poseVariant]
            : poseVariant % 2 === 1
              ? subject.stageBg1
              : subject.stageBg2;

          // Tọa độ lòng bảng trắng chính xác theo từng ảnh nền lớp học (đo trực tiếp từ pixel ảnh gốc)
          const STAGE_BOARD_RECT_MAP: Record<
            string,
            { left: string; top: string; width: string; height: string }
          > = {
            "stage-reading-no-kitty.png": {
              left: "27.3%",
              top: "10.0%",
              width: "46.2%",
              height: "48.6%",
            },
            "stage-math-1.png": {
              left: "30.0%",
              top: "12.8%",
              width: "41.0%",
              height: "42.0%",
            },
            "stage-math-2.png": {
              left: "23.2%",
              top: "13.7%",
              width: "56.3%",
              height: "50.4%",
            },
            "stage-english-1.png": {
              left: "31.1%",
              top: "12.3%",
              width: "39.6%",
              height: "43.1%",
            },
            "stage-english-2.png": {
              left: "23.9%",
              top: "16.2%",
              width: "53.1%",
              height: "49.0%",
            },
            "stage-music-1.png": {
              left: "30.0%",
              top: "10.1%",
              width: "41.5%",
              height: "44.2%",
            },
            "stage-music-2.png": {
              left: "20.5%",
              top: "11.3%",
              width: "58.8%",
              height: "52.8%",
            },
            "stage-coloring-1.png": {
              left: "23.9%",
              top: "10.2%",
              width: "52.3%",
              height: "52.3%",
            },
            "stage-minigame-1.jpg": {
              left: "22.8%",
              top: "12.6%",
              width: "54.4%",
              height: "60.8%",
            },
          };

          const stageBoardRectStyle =
            !isStorybook && !showFullscreenBoard
              ? STAGE_BOARD_RECT_MAP[bgFile]
              : undefined;

          const kawaiiBoardClass = BOARD_CLASS_MAP[poseVariant];

          return (
            <div
              className={`scene-screen ${
                isStorybook
                  ? "bedtime-story-screen"
                  : `classroom-stage-screen reaction-${reaction.type} ${
                      showFullscreenBoard
                        ? `has-fullscreen-board ${kawaiiBoardClass}`
                        : ""
                    }`
              }`}
              style={
                isStorybook
                  ? undefined
                  : { backgroundImage: `url("/assets/${bgFile}")` }
              }
            >
              <header
                className={`garland-hud ${
                  !isInLessonPicker ? "hud-in-active-lesson" : ""
                }`}
              >
                <button
                  type="button"
                  className="hud-pill hud-pink"
                  onClick={() => {
                    speech.stop();
                    setPage({ type: "home" });
                  }}
                >
                  <Home size={18} /> Về Sảnh Chính
                </button>

                {!isStorybook &&
                  !showFullscreenBoard &&
                  page.subject !== "music" && (
                    <div className="hud-stage-title">
                      <span>{subject.icon}</span>
                      <strong>{`${subject.name} cùng ${subject.teacher}`}</strong>
                    </div>
                  )}

                <div className="hud-right-group">
                  {/* Chỉ hiện nút Video khi đang ở ngoài màn chọn bài (Lesson Picker) để không gây xao nhãng khi đang học */}
                  {isInLessonPicker && (
                    <button
                      type="button"
                      className="hud-pill hud-purple"
                      onClick={openVideoTheater}
                    >
                      <Film size={16} /> Video
                    </button>
                  )}

                  <button
                    type="button"
                    className="hud-pill hud-gold"
                    onClick={() => {
                      setSelectedCupSubject(page.subject);
                      setPage({ type: "stars", initialSubject: page.subject });
                    }}
                    title="Xem Cúp & Bộ Sticker của môn này"
                  >
                    <Trophy size={17} /> {cupState?.litIndices.length || 0}/6
                    Sticker
                  </button>
                  <button
                    type="button"
                    className="hud-pill hud-blue"
                    onClick={() => setSoundEnabled(!progress.soundEnabled)}
                    title="Bật / Tắt âm thanh"
                  >
                    {progress.soundEnabled ? (
                      <Volume2 size={18} />
                    ) : (
                      <VolumeX size={18} />
                    )}
                  </button>
                  <button
                    type="button"
                    className="hud-pill hud-pink"
                    onClick={toggleDeviceFullscreen}
                    title="Bật / Tắt Toàn Màn Hình"
                  >
                    {isDeviceFullscreen ? (
                      <Minimize2 size={16} />
                    ) : (
                      <Maximize2 size={16} />
                    )}
                  </button>
                </div>
              </header>

              {/* Bong bóng khen ngợi nhỏ gọn ở mép trên khi đang mở Bảng Lớn (không chặn vùng bấm) */}
              {showFullscreenBoard && reaction.message && (
                <div className="kawaii-top-characters-hotspot" style={{ pointerEvents: "none" }}>
                  <div className={`kawaii-top-speech-bubble ${reaction.type}`}>
                    {reaction.message}
                  </div>
                </div>
              )}

              {!isStorybook && !showFullscreenBoard && (
                <>
                  <div
                    className="character-hotspot hotspot-left"
                    onClick={(e) => {
                      triggerTapBurst(e, "pink");
                      const line =
                        NAM_TAP_LINES[
                          tapLineIdxRef.current % NAM_TAP_LINES.length
                        ];
                      tapLineIdxRef.current += 1;
                      setReaction({ type: "happy", message: line });
                      speech.speak(line, "vi-VN");
                    }}
                    title="Chạm vào Nấm!"
                  >
                    {reaction.type === "singing" && (
                      <div className="singing-character-badge left-singer">
                        <div className="singing-floating-notes">
                          <span>🎵</span>
                          <span>🎤</span>
                          <span>🎶</span>
                          <span>✨</span>
                        </div>
                        <div className="singing-pill-tag">🎤 Nấm đang hát~</div>
                      </div>
                    )}
                  </div>

                  {page.subject === "reading" ? (
                    <Kitty25DTeacher
                      reactionType={reaction.type}
                      reactionMessage={reaction.message}
                      onTapKitty={(e, forcedAction?: KittyActionMode) => {
                        triggerTapBurst(
                          e,
                          forcedAction === "cheer" ? "rainbow" : "pink",
                        );
                        let line = "";
                        if (forcedAction === "wave") {
                          line =
                            "Xin chào bé Nấm! Cô Kitty vẫy tay chào con nè!";
                        } else if (forcedAction === "wink") {
                          line =
                            "Hihi, cô Kitty nháy mắt khen Nấm ngoan quá đi!";
                        } else if (forcedAction === "cheer") {
                          line = "Hoan hô bé Nấm! Con đọc thơ siêu quá đi!";
                        } else {
                          line =
                            TEACHER_TAP_LINES[
                              tapLineIdxRef.current % TEACHER_TAP_LINES.length
                            ];
                          tapLineIdxRef.current += 1;
                        }
                        setReaction({
                          type: "happy",
                          message: line,
                        });
                        speech.speak(line, "vi-VN");
                      }}
                    />
                  ) : (
                    <div
                      className="character-hotspot hotspot-right"
                      onClick={(e) => {
                        triggerTapBurst(e, "gold");
                        const line =
                          TEACHER_TAP_LINES[
                            tapLineIdxRef.current % TEACHER_TAP_LINES.length
                          ];
                        tapLineIdxRef.current += 1;
                        setReaction({ type: "happy", message: line });
                        speech.speak(line, "vi-VN");
                      }}
                      title={`Chạm vào ${subject.teacher}!`}
                    >
                      {reaction.type === "singing" && (
                        <div className="singing-character-badge right-singer">
                          <div className="singing-floating-notes">
                            <span>🎶</span>
                            <span>🎼</span>
                            <span>🎵</span>
                            <span>🎹</span>
                          </div>
                          <div className="singing-pill-tag">
                            🎶 {subject.teacher} hát cùng!
                          </div>
                        </div>
                      )}
                      {reaction.message && (
                        <div
                          className={`character-speech-bubble ${reaction.type}`}
                        >
                          {reaction.message}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              <main
                ref={mainBoardRef}
                className={
                  isStorybook
                    ? "bedtime-story-zone"
                    : showFullscreenBoard
                      ? `whiteboard-frame-zone fullscreen-decorated-board ${kawaiiBoardClass}`
                      : page.subject === "minigame"
                        ? "whiteboard-frame-zone minigame-frame-zone"
                        : "whiteboard-frame-zone"
                }
                style={stageBoardRectStyle}
              >
                {!isStorybook && !isInLessonPicker && !isBoardFullscreen && (
                  <button
                    type="button"
                    className="mini-board-floating-zoom-btn"
                    onClick={() => setIsBoardFullscreen(true)}
                    title="Phóng to Bảng Học Kawaii toàn màn hình"
                  >
                    <Maximize2 size={14} /> Phóng to bảng học
                  </button>
                )}

                <div className="board-activity-inner">
                  <Suspense fallback={null}>
                    <Activity
                      key={`${page.subject}-${attemptKey}`}
                      soundEnabled={progress.soundEnabled}
                      onComplete={(result) => finishLesson(page.subject, result)}
                      onReaction={handleReaction}
                      onLessonIndexChange={(idx) => {
                        const baseMap: Record<SubjectId, number> = {
                          reading: 0,
                          math: 0,
                          music: 1,
                          minigame: 1,
                          english: 2,
                          coloring: 3,
                          storybook: 0,
                          lifeskills: 3,
                        };
                        const base = baseMap[page.subject] ?? 0;
                        setPoseVariant(
                          ((((base + idx) % 4) + 1) as 1 | 2 | 3 | 4),
                        );
                      }}
                    />
                  </Suspense>
                </div>
              </main>

              {!showFullscreenBoard && !isStorybook && (
                <nav
                  className="carpet-toy-dock"
                  aria-label="Chuyển nhanh môn học"
                >
                  {[
                    { id: "reading" as SubjectId, label: "Học Đọc", icon: "📖" },
                    { id: "math" as SubjectId, label: "Học Toán", icon: "🧮" },
                    {
                      id: "english" as SubjectId,
                      label: "Tiếng Anh",
                      icon: "🔤",
                    },
                    { id: "music" as SubjectId, label: "Âm Nhạc", icon: "🎹" },
                    {
                      id: "coloring" as SubjectId,
                      label: "Mỹ Thuật",
                      icon: "🎨",
                    },
                    {
                      id: "storybook" as SubjectId,
                      label: "Giải Trí",
                      icon: "📚",
                    },
                    {
                      id: "minigame" as SubjectId,
                      label: "Thể Dục",
                      icon: "⚽",
                    },
                    {
                      id: "lifeskills" as SubjectId,
                      label: "Kỹ Năng Sống",
                      icon: "🍳",
                    },
                  ].map((toy) => (
                    <button
                      key={toy.id}
                      type="button"
                      className={`toy-dock-btn ${
                        page.subject === toy.id ? "active" : ""
                      }`}
                      onClick={() => startLesson(toy.id)}
                    >
                      <span className="toy-dock-emoji">{toy.icon}</span>
                      <span className="toy-dock-label">{toy.label}</span>
                    </button>
                  ))}
                </nav>
              )}
            </div>
          );
        })()}

      {/* =====================================================================
          2B. MÀN HÌNH CLIP CHÚC MỪNG CHIẾN THẮNG TRƯỚC KHI NHẬN STICKER
         ===================================================================== */}
      {page.type === "victory-video" && (
        <div
          className="scene-screen victory-video-screen"
          style={{ backgroundImage: `url("/assets/scene-treasure.png")` }}
        >
          <div className="victory-video-backdrop">
            <div className="victory-video-card">
              <div className="victory-video-header">
                <span>🏆 CHÚC MỪNG CHIẾN THẮNG! BÉ NẤM GIỎI QUÁ! 🎉</span>
                <button
                  type="button"
                  className="chunky-btn chunky-gold btn-sm"
                  onClick={() =>
                    proceedToReward(
                      page.subject,
                      page.awardedSticker,
                      page.justCompletedFullSet,
                    )
                  }
                >
                  🎁 Nhận Sticker Thưởng Ngay! ➔
                </button>
              </div>
              <video
                src={`/api/local-video-stream?id=${encodeURIComponent(
                  "root:chúc mừng chiến thắng.mp4",
                )}`}
                autoPlay
                playsInline
                controls
                className="victory-video-player"
                onEnded={() =>
                  proceedToReward(
                    page.subject,
                    page.awardedSticker,
                    page.justCompletedFullSet,
                  )
                }
                onError={() =>
                  proceedToReward(
                    page.subject,
                    page.awardedSticker,
                    page.justCompletedFullSet,
                  )
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          3. MÀN HÌNH TẶNG STICKER & THẮP SÁNG BẢNG STICKER NHÂN VẬT
         ===================================================================== */}
      {page.type === "reward" &&
        (() => {
          const cup = SUBJECT_CUPS[page.subject];
          const boardState = stickerStore[page.subject] || {
            litIndices: [],
            completedCycles: 0,
          };
          const isAllSixLit = boardState.litIndices.length === 6;

          return (
            <div
              className="scene-screen treasure-screen sticker-reward-screen"
              style={{ backgroundImage: `url("/assets/scene-treasure.png")` }}
            >
              <div
                className={`sticker-reward-modal ${
                  isAllSixLit ? "full-set-flashing-board" : ""
                }`}
              >
                {/* Phần tiêu đề + Sticker vừa được tặng */}
                <div className="sticker-reward-top">
                  <div className="newly-awarded-showcase">
                    <img
                      src={cup.cupImage}
                      alt={cup.cupTitle}
                      className="reward-cup-icon"
                    />
                    <div className="newly-awarded-sticker-frame">
                      <img
                        src={page.awardedSticker.image}
                        alt={page.awardedSticker.name}
                        className="newly-awarded-sticker-img"
                      />
                      <span className="new-sticker-badge">MỚI! ✨</span>
                    </div>
                  </div>

                  <div className="sticker-reward-copy">
                    <h1 className="sticker-reward-heading">
                      {isAllSixLit
                        ? `🎉 SÁNG ĐỦ 6/6 STICKER ${cup.characterName.toUpperCase()}!`
                        : `🎁 TẶNG NẤM STICKER: ${page.awardedSticker.name.toUpperCase()}!`}
                    </h1>
                    <p className="sticker-reward-sub">
                      {isAllSixLit ? (
                        <>
                          Cả 6 sticker của <strong>{cup.characterName}</strong> đã
                          sáng rực rỡ! Bấm vào bảng hoặc nút{" "}
                          <strong>Mở Cúp Vàng & Cất Vào Vở</strong> để hợp nhất 6
                          Sticker vào Cúp Vàng nhé!
                        </>
                      ) : (
                        <>
                          Sticker vừa được thắp sáng trên{" "}
                          <strong>{cup.cupTitle}</strong> (
                          <strong>{boardState.litIndices.length}/6</strong>{" "}
                          sticker đã sáng) và đã mở khóa trong{" "}
                          <strong>📒 Vở Sticker</strong>!
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {/* Bảng 6 Sticker của nhân vật ngay trên màn hình thưởng */}
                <div
                  className={`character-sticker-grid-6 ${
                    isAllSixLit ? "all-six-disco-glow" : ""
                  }`}
                  onClick={() => {
                    if (isAllSixLit) {
                      handleResetCupStickers(page.subject);
                    }
                  }}
                  title={
                    isAllSixLit
                      ? "Bấm để hợp nhất 6 Sticker vào Cúp Vàng & cất vào Quyển Vở Sticker!"
                      : undefined
                  }
                >
                  {cup.stickers.map((stk) => {
                    const isLit = boardState.litIndices.includes(stk.index);
                    const isJustWon = stk.id === page.awardedSticker.id;
                    return (
                      <div
                        key={stk.id}
                        className={`sticker-board-slot ${
                          isLit ? "slot-lit" : "slot-unlit"
                        } ${isJustWon ? "slot-just-won" : ""} ${
                          isAllSixLit ? "slot-flashing" : ""
                        }`}
                      >
                        <img src={stk.image} alt={stk.name} />
                        <span className="slot-sticker-name">
                          {isLit ? `✨ ${stk.name}` : `🔒 ${stk.name}`}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Hàng nút hành động */}
                <div className="treasure-actions">
                  {allThreeQuestsDone && !dailyQuests.chestClaimed && (
                    <button
                      type="button"
                      className="chunky-btn chunky-gold daily-chest-cta-btn"
                      onClick={() => {
                        setChestBonusStickers(null);
                        setDailyChestModalOpen(true);
                      }}
                    >
                      <Gift size={18} /> 🎁 Mở Rương Kho Báu Ngày Mới (+2 Sticker)!
                    </button>
                  )}
                  {isAllSixLit && (
                    <button
                      type="button"
                      className="chunky-btn chunky-gold daily-chest-cta-btn"
                      onClick={() => handleResetCupStickers(page.subject)}
                    >
                      <Trophy size={18} /> 🏆 Mở Cúp Vàng & Cất 6 Sticker Vào Vở!
                    </button>
                  )}
                  <button
                    type="button"
                    className="chunky-btn chunky-pink"
                    onClick={() =>
                      setPage({
                        type: "sticker-book",
                        initialFilter: page.subject,
                      })
                    }
                  >
                    <BookOpen size={18} /> 📒 Mang Vào Vở Dán Sticker Ngay!
                  </button>
                  <button
                    type="button"
                    className="chunky-btn chunky-green"
                    onClick={() => startLesson(page.subject)}
                  >
                    <RotateCcw size={18} /> Chơi Tiếp Để Sáng Thêm Sticker
                  </button>
                  <button
                    type="button"
                    className="chunky-btn chunky-gold"
                    onClick={() => {
                      setSelectedCupSubject(page.subject);
                      setPage({ type: "stars", initialSubject: page.subject });
                    }}
                  >
                    <Trophy size={18} /> Xem Phòng Cúp & Sticker
                  </button>
                  <button
                    type="button"
                    className="chunky-btn chunky-blue"
                    onClick={() => setPage({ type: "home" })}
                  >
                    <Home size={18} /> Về Sảnh Chính
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

      {/* =====================================================================
          4. MÀN HÌNH BẢNG THÀNH TÍCH: CHIA ĐÔI TRÁI (Ô VIP STICKER NẤM + 8 CÚP CỨNG 2x4) - PHẢI (6 Ô STICKER 3x2)
         ===================================================================== */}
      {page.type === "stars" &&
        (() => {
          const activeCup = SUBJECT_CUPS[selectedCupSubject];
          const activeBoard = stickerStore[selectedCupSubject] || {
            litIndices: [],
            completedCycles: 0,
          };
          const isActiveFullLit = activeBoard.litIndices.length === 6;
          const hasSet2 = isSubjectSet2Available(selectedCupSubject);
          const effectiveSet: 1 | 2 | 3 | 4 =
            selectedCupSubject === "lifeskills"
              ? selectedStickerSet
              : selectedStickerSet > 2
                ? 1
                : selectedStickerSet;
          const currentStickers = getSubjectStickerSet(
            selectedCupSubject,
            effectiveSet,
          );
          const set1LitCount = getSubjectSetUnlockedCount(
            stickerStore,
            selectedCupSubject,
            1,
          );
          const set2LitCount = getSubjectSetUnlockedCount(
            stickerStore,
            selectedCupSubject,
            2,
          );
          const set3LitCount = getSubjectSetUnlockedCount(
            stickerStore,
            selectedCupSubject,
            3,
          );
          const set4LitCount = getSubjectSetUnlockedCount(
            stickerStore,
            selectedCupSubject,
            4,
          );

          const namInv = loadNamSpecialInventory();
          const unlockedNamCount = getUnlockedNamSpecialCount(namInv);
          const namNonStageList = NAM_SPECIAL_STICKERS.filter(
            (s) => s.tier !== "stage",
          );
          const namPageStickers = namNonStageList.slice(
            (namVipPage - 1) * 6,
            namVipPage * 6,
          );
          const placedMap = getPlacedStickerCountMap();

          return (
            <div
              className="scene-screen achievements-screen"
              style={{
                backgroundImage: `url("/assets/scene-lobby-pastel.png")`,
              }}
            >
              <header className="garland-hud pastel-trophy-hud">
                <div className="hud-left-group">
                  <button
                    type="button"
                    className="hud-pill hud-pink"
                    onClick={() => setPage({ type: "home" })}
                  >
                    <Home size={17} /> Về Sảnh Chính
                  </button>
                  <button
                    type="button"
                    className="hud-pill hud-purple"
                    onClick={() =>
                      setPage({
                        type: "sticker-book",
                        initialFilter: isViewingNamVipSet
                          ? "nam-special"
                          : selectedCupSubject,
                      })
                    }
                  >
                    <BookOpen size={16} /> 📒 Vở Dán Sticker ({totalUnlockedInBook}/48)
                  </button>
                </div>

                <div className="hud-stage-title">
                  <img
                    src={NAM_MASTER_CUP_IMAGE}
                    alt="Cúp Bé Nấm"
                    className="hud-nam-cup-icon"
                  />
                  <strong>
                    PHÒNG CÚP & STICKER · {namRank.icon} {namRank.title}
                  </strong>
                </div>

                <button
                  type="button"
                  className="hud-pill hud-gold"
                  onClick={() => startLesson(selectedCupSubject)}
                >
                  <Sparkles size={16} /> Học {getSubject(selectedCupSubject).name}
                </button>
              </header>

              <div className="trophy-room-container trophy-split-layout">
                {/* CỘT TRÁI (CỨNG): Ô VIP STICKER NẤM XỊN NHẤT + LƯỚI 8 CÚP MÔN HỌC (2 CỘT x 4 HÀNG) */}
                <aside className="trophy-left-cups-panel">
                  {/* Ô STICKER XỊN NHẤT: BỘ STICKER BÉ NẤM SIÊU CẤP */}
                  <button
                    type="button"
                    className={`nam-vip-cup-banner ${
                      isViewingNamVipSet ? "selected-vip" : ""
                    }`}
                    onClick={() => setIsViewingNamVipSet(true)}
                  >
                    <div className="nam-vip-banner-icon">
                      <img src={NAM_MASTER_CUP_IMAGE} alt="Cúp Sticker Nấm" />
                      <span className="nam-vip-crown-tag">VIP</span>
                    </div>
                    <div className="nam-vip-banner-info">
                      <strong>👑 Ô Sticker Bé Nấm (Xịn Nhất)</strong>
                      <span>Nhận khi: Xong NV Ngày · Mở 6 ô môn học</span>
                    </div>
                    <span className="nam-vip-count-pill">
                      🌟 {unlockedNamCount}/{NAM_SPECIAL_STICKERS.length}
                    </span>
                  </button>

                  <div className="cups-selector-bar cups-grid-8-fixed">
                    {subjects.map((subj) => {
                      const cupCfg = SUBJECT_CUPS[subj.id];
                      const bState = stickerStore[subj.id] || {
                        litIndices: [],
                        completedCycles: 0,
                      };
                      const litCount = bState.litIndices.length;
                      const isFull = litCount === 6;
                      const isSelected =
                        !isViewingNamVipSet && selectedCupSubject === subj.id;

                      return (
                        <button
                          key={subj.id}
                          type="button"
                          className={`subject-cup-card ${
                            isSelected ? "selected-cup" : ""
                          } ${isFull ? "cup-full-flashing" : ""}`}
                          style={
                            {
                              "--cup-accent": cupCfg.accentColor,
                            } as React.CSSProperties
                          }
                          onClick={() => {
                            setIsViewingNamVipSet(false);
                            setSelectedCupSubject(subj.id);
                          }}
                        >
                          <div className="cup-card-row">
                            <div className="cup-img-wrap">
                              <img src={cupCfg.cupImage} alt={cupCfg.cupTitle} />
                              {bState.completedCycles > 0 && (
                                <span className="cup-cycle-badge">
                                  👑×{bState.completedCycles}
                                </span>
                              )}
                            </div>
                            <div className="cup-card-meta">
                              <strong className="cup-subject-name">
                                {subj.name}
                              </strong>
                              <span className="cup-char-name">
                                {cupCfg.characterName}
                              </span>
                              <span
                                className={`cup-progress-pill ${
                                  isFull ? "full" : ""
                                }`}
                              >
                                {isFull
                                  ? "🏆 MỞ CÚP!"
                                  : `🌟 ${litCount}/6`}
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </aside>

                {/* CỘT PHẢI: BẢNG 6 Ô STICKER (3 CỘT x 2 HÀNG) */}
                {isViewingNamVipSet ? (
                  <section className="selected-cup-sticker-board trophy-right-stickers-panel nam-vip-board-panel">
                    <div className="sticker-board-header">
                      <div className="board-header-left">
                        <img
                          src={NAM_MASTER_CUP_IMAGE}
                          alt="Sticker Bé Nấm"
                          className="board-header-cup-img"
                        />
                        <div>
                          <h3 className="board-header-title">
                            👑 Kho Sticker Bé Nấm Siêu Cấp ({unlockedNamCount}/
                            {NAM_SPECIAL_STICKERS.length})
                          </h3>
                          <p className="board-header-sub">
                            🎁 Sticker Nấm chỉ nhận được khi:{" "}
                            <strong>(1) Hoàn thành Nhiệm Vụ Ngày (3/3)</strong>{" "}
                            hoặc{" "}
                            <strong>
                              (2) Mở đủ 6/6 ô của 1 khu môn học chính
                            </strong>{" "}
                            (trừ Kỹ Năng Sống)!
                          </p>
                        </div>
                      </div>

                      <div className="board-header-actions">
                        <div
                          className="sticker-set-tabs"
                          role="tablist"
                          aria-label="Chọn trang Sticker Nấm"
                        >
                          {([1, 2, 3, 4] as const).map((pg) => (
                            <button
                              key={pg}
                              type="button"
                              role="tab"
                              aria-selected={namVipPage === pg}
                              className={`sticker-set-tab-btn ${
                                namVipPage === pg ? "active" : ""
                              }`}
                              onClick={() => setNamVipPage(pg)}
                            >
                              👑 Nấm #{pg}
                            </button>
                          ))}
                        </div>

                        <button
                          type="button"
                          className="chunky-btn chunky-gold btn-sm"
                          onClick={() => {
                            setChestBonusStickers(null);
                            setDailyChestModalOpen(true);
                          }}
                        >
                          <Gift size={15} /> 🗺️ Xem NV Ngày
                        </button>
                      </div>
                    </div>

                    <div className="character-sticker-grid-6">
                      {namPageStickers.map((stk, i) => {
                        const globalIdx = (namVipPage - 1) * 6 + i + 1;
                        const earnedQty = namInv[stk.id] || 0;
                        const placedQty = placedMap[stk.id] || 0;
                        const remainQty = Math.max(0, earnedQty - placedQty);
                        const isUnlocked = earnedQty > 0;

                        return (
                          <div
                            key={stk.id}
                            className={`sticker-board-slot ${
                              isUnlocked ? "slot-lit" : "slot-unlit"
                            }`}
                          >
                            {isUnlocked ? (
                              <span
                                className={`slot-qty-pill ${
                                  remainQty > 0 ? "has-stock" : "out-of-stock"
                                }`}
                              >
                                {remainQty > 0
                                  ? `Còn x${remainQty}`
                                  : `Đã dán (${earnedQty})`}
                              </span>
                            ) : (
                              <span className="slot-set-badge">
                                🔒 NV Ngày / 6 ô môn học
                              </span>
                            )}
                            <img src={stk.image} alt={stk.name} />
                            <span className="slot-sticker-name">
                              {isUnlocked
                                ? `👑 #${globalIdx}: ${stk.name} (x${earnedQty})`
                                : `🔒 #${globalIdx}: ${stk.name}`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                ) : (
                  <section
                    className={`selected-cup-sticker-board trophy-right-stickers-panel ${
                      isActiveFullLit ? "board-full-flashing" : ""
                    }`}
                  >
                    <div className="sticker-board-header">
                      <div className="board-header-left">
                        <img
                          src={activeCup.cupImage}
                          alt={activeCup.cupTitle}
                          className="board-header-cup-img"
                        />
                        <div>
                          <h3 className="board-header-title">
                            {activeCup.cupTitle} · {activeCup.characterName}
                          </h3>
                          <p className="board-header-sub">
                            {selectedCupSubject === "lifeskills"
                              ? "🍳 Kỹ Năng Sống thưởng trọn bộ 24 Sticker 3D Đầu Bếp & Món Ngon (4 Bộ × 6 hình) từ Kho Dùng Chung!"
                              : isActiveFullLit
                                ? "✨ Đã mở đủ 6/6 ô môn này! Bấm Mở Cúp Vàng để nhận ngay +1 Sticker Bé Nấm xịn nhất nhé!"
                                : effectiveSet === 1
                                  ? `Học môn ${getSubject(selectedCupSubject).name} để mở đủ 6/6 ô (${set1LitCount}/6) ➔ Nhận ngay +1 Sticker Bé Nấm xịn nhất!`
                                  : "🔒 Bộ 2 của môn này đang để tối, chờ mẹ thêm bộ hình mới vào sau nhé!"}
                          </p>
                        </div>
                      </div>

                      <div className="board-header-actions">
                        {/* Bộ chọn Tab Sticker: Bộ 1..4 cho Kỹ Năng Sống hoặc Bộ 1/2 cho môn khác */}
                        <div
                          className="sticker-set-tabs"
                          role="tablist"
                          aria-label="Chọn bộ Sticker"
                        >
                          <button
                            type="button"
                            role="tab"
                            aria-selected={effectiveSet === 1}
                            className={`sticker-set-tab-btn ${
                              effectiveSet === 1 ? "active" : ""
                            }`}
                            onClick={() => setSelectedStickerSet(1)}
                          >
                            {selectedCupSubject === "lifeskills"
                              ? `🥣 Bộ 1: Sơ Chế (${set1LitCount}/6)`
                              : `🌟 Bộ 1 (${set1LitCount}/6)`}
                          </button>
                          <button
                            type="button"
                            role="tab"
                            aria-selected={effectiveSet === 2}
                            className={`sticker-set-tab-btn ${
                              effectiveSet === 2 ? "active" : ""
                            }`}
                            onClick={() => setSelectedStickerSet(2)}
                          >
                            {selectedCupSubject === "lifeskills"
                              ? `🍳 Bộ 2: Đồ Bếp (${set2LitCount}/6)`
                              : `🔒 Bộ 2 (Chờ mở)`}
                          </button>
                          {selectedCupSubject === "lifeskills" && (
                            <>
                              <button
                                type="button"
                                role="tab"
                                aria-selected={effectiveSet === 3}
                                className={`sticker-set-tab-btn ${
                                  effectiveSet === 3 ? "active" : ""
                                }`}
                                onClick={() => setSelectedStickerSet(3)}
                              >
                                {`🧁 Bộ 3: Làm Bánh (${set3LitCount}/6)`}
                              </button>
                              <button
                                type="button"
                                role="tab"
                                aria-selected={effectiveSet === 4}
                                className={`sticker-set-tab-btn ${
                                  effectiveSet === 4 ? "active" : ""
                                }`}
                                onClick={() => setSelectedStickerSet(4)}
                              >
                                {`🍜 Bộ 4: Bữa Cơm (${set4LitCount}/6)`}
                              </button>
                            </>
                          )}
                        </div>

                        {isActiveFullLit ? (
                          <button
                            type="button"
                            className="chunky-btn chunky-gold btn-sm flashing-reset-btn"
                            onClick={() =>
                              handleResetCupStickers(selectedCupSubject)
                            }
                          >
                            <Trophy size={15} />{" "}
                            {selectedCupSubject === "lifeskills"
                              ? "🏆 Mở Cúp Bánh Kẹo!"
                              : "🏆 Mở Cúp (+1 Sticker Nấm)!"}
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="chunky-btn chunky-green btn-sm"
                            onClick={() => startLesson(selectedCupSubject)}
                          >
                            <Sparkles size={15} /> Chơi Nhận Sticker
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Lưới 6 Ô Sticker (3 cột x 2 hàng cố định) */}
                    <div
                      className={`character-sticker-grid-6 ${
                        isActiveFullLit ? "all-six-disco-glow" : ""
                      }`}
                      onClick={() => {
                        if (isActiveFullLit) {
                          handleResetCupStickers(selectedCupSubject);
                        }
                      }}
                      title={
                        isActiveFullLit
                          ? "Bấm vào đây để Hợp Nhất Mở Cúp Vàng!"
                          : undefined
                      }
                    >
                      {currentStickers.map((stk) => {
                        const isDarkLockedSet2 =
                          effectiveSet >= 2 && !hasSet2;

                        const earnedQty = isDarkLockedSet2
                          ? 0
                          : getSubjectSetStickerEarnedCount(
                              stickerStore,
                              selectedCupSubject,
                              effectiveSet,
                              stk.index,
                            );

                        const isLit = isDarkLockedSet2
                          ? false
                          : effectiveSet === 1
                            ? activeBoard.litIndices.includes(stk.index) ||
                              (selectedCupSubject === "lifeskills" &&
                                activeBoard.completedCycles >= 1)
                            : earnedQty > 0;

                        const placedQty = placedMap[stk.id] || 0;
                        const remainQty = Math.max(0, earnedQty - placedQty);

                        return (
                          <div
                            key={stk.id}
                            className={`sticker-board-slot ${
                              isDarkLockedSet2
                                ? "slot-unlit slot-dark-locked"
                                : isLit || earnedQty > 0
                                  ? "slot-lit"
                                  : "slot-unlit"
                            } ${
                              isActiveFullLit && !isDarkLockedSet2
                                ? "slot-flashing"
                                : ""
                            }`}
                          >
                            {isDarkLockedSet2 ? (
                              <span className="slot-set-badge dark-badge">
                                🔒 Bộ 2 · Chờ thêm
                              </span>
                            ) : earnedQty > 0 ? (
                              <span
                                className={`slot-qty-pill ${
                                  remainQty > 0 ? "has-stock" : "out-of-stock"
                                }`}
                              >
                                {remainQty > 0
                                  ? `Còn x${remainQty}`
                                  : `Đã dán (${earnedQty})`}
                              </span>
                            ) : (
                              <span className="slot-set-badge">
                                {selectedStickerSet === 1
                                  ? "Bộ 1"
                                  : "🔒 Xong Bộ 1 để mở"}
                              </span>
                            )}
                            <img src={stk.image} alt={stk.name} />
                            <span className="slot-sticker-name">
                              {isDarkLockedSet2
                                ? `🔒 Ô #${stk.index}: Bộ 2 (Chờ thêm)`
                                : isLit || earnedQty > 0
                                  ? `🌟 #${stk.index}: ${stk.name} (x${earnedQty})`
                                  : `🔒 #${stk.index}: ${stk.name}`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}
              </div>
            </div>
          );
        })()}

      {/* =====================================================================
          4B. QUYỂN VỞ DÁN STICKER CỦA NẤM (PEEL & STICK INTERACTIVE BOOK)
         ===================================================================== */}
      {page.type === "sticker-book" && (
        <Suspense fallback={null}>
          <StickerBookScreen
            stickerStore={stickerStore}
            questItemInventory={questItemInventory}
            initialSubjectFilter={page.initialFilter || "unlocked"}
            initialPageId={page.initialPageId}
            onGoHome={() => setPage({ type: "home" })}
            onGoTrophyRoom={() => setPage({ type: "stars" })}
            onOpenDailyQuests={() => {
              setChestBonusItems(null);
              setDailyChestModalOpen(true);
            }}
            onStartSubjectLesson={(subj) => startLesson(subj)}
            onBurstAt={(x, y, theme = "pink") => {
              const vp = viewportRef.current;
              if (vp && particleRef.current) {
                const rect = vp.getBoundingClientRect();
                particleRef.current.burstAt(
                  x - rect.left,
                  y - rect.top,
                  theme,
                );
              }
            }}
            onSpeak={(text) => {
              if (progress.soundEnabled) {
                speech.speak(text, "vi-VN");
              }
            }}
          />
        </Suspense>
      )}

      {/* =====================================================================
          4C. MODAL NGHI THỨC HỢP NHẤT 6 STICKER MỞ CÚP VÀNG ĐẠI SỨ
         ===================================================================== */}
      {ceremonySubject && (
        <GoldenCupCeremonyModal
          subjectId={ceremonySubject}
          boardState={
            stickerStore[ceremonySubject] || {
              litIndices: [],
              completedCycles: 0,
              everUnlockedIndices: [],
            }
          }
          onClose={() => setCeremonySubject(null)}
          onHarvestToBook={(subj) => handleHarvestCupToBook(subj)}
          onOpenStickerBook={() => {
            setCeremonySubject(null);
            setPage({
              type: "sticker-book",
              initialFilter: "nam-special",
              initialPageId: "nam-stage",
            });
          }}
          onTriggerFireworks={launchFullScreenFireworks}
          onSpeak={(text) => {
            if (progress.soundEnabled) {
              speech.speak(text, "vi-VN");
            }
          }}
        />
      )}

      {/* =====================================================================
          5. GÓC PHỤ HUYNH (PARENTS)
         ===================================================================== */}
      {page.type === "parents" && (
        <div className="parents-modal-wrapper">
          <div className="parents-top-back">
            <button
              type="button"
              className="chunky-btn chunky-pink"
              onClick={() => setPage({ type: "home" })}
            >
              <Home size={18} /> Quay Về Sảnh Chính Của Nấm
            </button>
          </div>
          <Suspense fallback={null}>
            <ParentPanel
              progress={progress}
              onImport={importProgress}
              onReset={resetProgress}
              onSoundChange={setSoundEnabled}
            />
          </Suspense>
        </div>
      )}

      {/* =====================================================================
          6. MODAL 3 NHIỆM VỤ NGÀY GỌN GÀNG, TRỰC QUAN BẰNG HÌNH ẢNH (0/3)
         ===================================================================== */}
      {dailyChestModalOpen && (
        <div
          className="video-modal-backdrop daily-quest-backdrop"
          onClick={() => setDailyChestModalOpen(false)}
        >
          <div
            className="daily-quest-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="daily-quest-modal-header">
              <div className="dq-header-title">
                <span className="dq-title-icon">🎁</span>
                <h2>Nhiệm Vụ ({doneQuestCount}/3)</h2>
                <div className="dq-star-dots" aria-hidden="true">
                  {dailyQuests.quests.map((q, i) => (
                    <span
                      key={i}
                      className={`dq-star-dot ${q.done ? "lit" : ""}`}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
              <button
                type="button"
                className="dq-close-circle-btn"
                onClick={() => setDailyChestModalOpen(false)}
                aria-label="Đóng"
              >
                <X size={18} />
              </button>
            </div>

            {/* 3 Thẻ Hình Ảnh Nhiệm Vụ Gọn Gàng (Chạm trực tiếp vào ảnh để học) */}
            <div className="dq-three-cards-row">
              {dailyQuests.quests.map((q, idx) => {
                const subj = getSubject(q.subjectId);
                return (
                  <button
                    key={q.subjectId}
                    type="button"
                    className={`dq-quest-card ${q.done ? "is-done" : "is-pending"}`}
                    onClick={() => startLesson(q.subjectId)}
                  >
                    <div className="dq-quest-thumb">
                      <img src={`/assets/${subj.image}`} alt={subj.name} />
                      <span className="dq-quest-num-badge">
                        {q.done ? "✅" : `${idx + 1}`}
                      </span>
                    </div>
                    <strong className="dq-quest-name">
                      {q.icon} {subj.name}
                    </strong>
                    {q.done ? (
                      <span className="dq-done-pill">
                        <Check size={13} /> Xong
                      </span>
                    ) : (
                      <span className="dq-play-pill">▶ Chơi</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Thanh Rương Quà Ngắn Gọn (0/3 -> Mở Rương) */}
            <div
              className={`dq-treasure-chest-box ${
                allThreeQuestsDone && !dailyQuests.chestClaimed
                  ? "chest-ready-glow"
                  : ""
              }`}
            >
              {chestBonusItems && chestBonusItems.length > 0 ? (
                <div className="dq-bonus-result">
                  <div className="dq-bonus-stickers-row">
                    {chestNamBonus && (
                      <div className="dq-bonus-sticker-card nam-vip-bonus-card">
                        <img
                          src={chestNamBonus.sticker.image}
                          alt={chestNamBonus.sticker.name}
                          className="dq-bonus-sticker-img"
                        />
                        <span className="dq-bonus-qty-tag">
                          👑 x{chestNamBonus.newCount}
                        </span>
                      </div>
                    )}
                    {chestBonusItems.map((item, i) => (
                      <div key={`${item.id}-${i}`} className="dq-bonus-sticker-card">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="dq-bonus-sticker-img"
                        />
                        <span className="dq-bonus-qty-tag">
                          x{questItemInventory[item.id] || 1}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="dq-bonus-actions">
                    <button
                      type="button"
                      className="chunky-btn chunky-gold btn-sm"
                      onClick={() => {
                        setDailyChestModalOpen(false);
                        setPage({
                          type: "sticker-book",
                          initialFilter: "quest-unlocked",
                          initialPageId: "supermarket",
                        });
                      }}
                    >
                      <BookOpen size={15} /> Dán Sticker
                    </button>
                    <button
                      type="button"
                      className="chunky-btn chunky-green btn-sm"
                      onClick={handleStartNewQuestRound}
                    >
                      <RotateCcw size={15} /> 3 Bài Mới
                    </button>
                  </div>
                </div>
              ) : allThreeQuestsDone && !dailyQuests.chestClaimed ? (
                <button
                  type="button"
                  className="dq-chest-ready-btn"
                  onClick={handleOpenDailyChest}
                >
                  <span className="dq-ready-gift-icon">🎁✨</span>
                  <strong>Mở Rương Nhận Quà! (3/3)</strong>
                </button>
              ) : dailyQuests.chestClaimed ? (
                <div className="dq-chest-claimed-area">
                  <span className="dq-claimed-badge">🏆 Đã mở (3/3)</span>
                  <div className="dq-bonus-actions">
                    <button
                      type="button"
                      className="chunky-btn chunky-gold btn-sm"
                      onClick={() => {
                        setDailyChestModalOpen(false);
                        setPage({
                          type: "sticker-book",
                          initialFilter: "quest-unlocked",
                          initialPageId: "supermarket",
                        });
                      }}
                    >
                      <BookOpen size={15} /> Dán Sticker
                    </button>
                    <button
                      type="button"
                      className="chunky-btn chunky-green btn-sm"
                      onClick={handleStartNewQuestRound}
                    >
                      <RotateCcw size={15} /> 3 Bài Mới
                    </button>
                  </div>
                </div>
              ) : (
                <div className="dq-chest-locked-area">
                  <div className="dq-locked-left">
                    <span className="dq-locked-chest-icon">🎁</span>
                    <strong>Rương Quà ({doneQuestCount}/3)</strong>
                  </div>
                  <div className="dq-locked-progress-track">
                    <div
                      className="dq-locked-progress-fill"
                      style={{ width: `${(doneQuestCount / 3) * 100}%` }}
                    />
                  </div>
                  <span className="dq-locked-preview-icons">🍰 🍎 🚗</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal Rạp Chiếu Phim Hoạt Hình Local */}
      {videoModalOpen && (
        <div
          className="video-modal-backdrop"
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            className="video-modal-box yt-kids-theater"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="video-modal-header">
              <div className="yt-header-left">
                {activeVideoId && (
                  <button
                    type="button"
                    className="chunky-btn chunky-orange btn-sm"
                    onClick={() => setActiveVideoId(null)}
                  >
                    ⬅ Tất cả clip ({localVideos.length})
                  </button>
                )}
                <strong>
                  🎬{" "}
                  {activeVideoId
                    ? localVideos.find((v) => v.id === activeVideoId)?.title ||
                      "Rạp Chiếu Phim Của Nấm"
                    : `Rạp Chiếu Phim Hoạt Hình Của Nấm (${localVideos.length} tập)`}
                </strong>
              </div>
              <button
                type="button"
                className="chunky-btn chunky-pink btn-sm"
                onClick={() => setVideoModalOpen(false)}
              >
                <X size={16} /> Đóng
              </button>
            </div>

            {!activeVideoId ? (
              localVideos.length === 0 ? (
                <div
                  style={{
                    padding: "28px 24px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "16px",
                    background: "linear-gradient(180deg, #fff9fc 0%, #fff0f6 100%)",
                    borderRadius: "24px",
                    border: "3px dashed #f472b6",
                    margin: "12px",
                  }}
                >
                  <div style={{ fontSize: "3.2rem", lineHeight: 1 }}>🎬💻✨</div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "1.35rem",
                      color: "#be185d",
                      fontWeight: 900,
                    }}
                  >
                    Kho Phim Dài Đang Cất Trong Máy Tính Của Ba Mẹ
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      maxWidth: "560px",
                      fontSize: "1.05rem",
                      lineHeight: 1.55,
                      color: "#4b5563",
                      fontWeight: 700,
                    }}
                  >
                    Các bộ phim hoạt hình dài có dung lượng lớn nên chỉ mở khi bật máy tính ở nhà.
                    Trong lúc đó, Nấm có thể hát <strong>Karaoke</strong> hoặc xem{" "}
                    <strong>8 Bài Hát & Truyện Tiếng Anh</strong> trực tuyến ngay bây giờ nhé!
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "12px",
                      justifyContent: "center",
                      marginTop: "6px",
                    }}
                  >
                    <button
                      type="button"
                      className="chunky-btn chunky-pink"
                      onClick={() => {
                        setVideoModalOpen(false);
                        startLesson("music");
                      }}
                    >
                      🎤 Vào Phòng Hát Karaoke
                    </button>
                    <button
                      type="button"
                      className="chunky-btn chunky-blue"
                      onClick={() => {
                        setVideoModalOpen(false);
                        startLesson("english");
                      }}
                    >
                      🔤 Xem Nhạc & Truyện Tiếng Anh
                    </button>
                  </div>
                </div>
              ) : (
                <div className="yt-thumbnail-grid">
                  {localVideos.map((vid) => (
                    <button
                      key={vid.id}
                      type="button"
                      className="yt-video-card"
                      onClick={() => setActiveVideoId(vid.id)}
                    >
                      <div className="yt-thumb-wrap">
                        {vid.thumbUrl ? (
                          <img
                            src={vid.thumbUrl}
                            alt={vid.title}
                            loading="lazy"
                          />
                        ) : (
                          <div className="yt-thumb-fallback">🎬</div>
                        )}
                        <div className="yt-play-overlay">▶</div>
                        {vid.duration && (
                          <span className="yt-duration-badge">
                            {vid.duration}
                          </span>
                        )}
                      </div>
                      <div className="yt-card-info">
                        <strong>{vid.title}</strong>
                        <span>▶ Bấm để xem phim ({vid.sizeMB} MB)</span>
                      </div>
                    </button>
                  ))}
                </div>
              )
            ) : (
              <div className="yt-player-stage-2col">
                <div className="yt-main-video-box">
                  <video
                    key={activeVideoId}
                    src={`/api/local-video-stream?id=${encodeURIComponent(
                      activeVideoId,
                    )}`}
                    controls
                    autoPlay
                    playsInline
                    className="local-video-player yt-expanded-video"
                  />
                </div>

                <div className="yt-upnext-sidebar">
                  <div className="yt-upnext-header">
                    🎞️ Danh sách tập phim ({localVideos.length})
                  </div>
                  <div className="yt-upnext-list" ref={videoStripRef}>
                    {localVideos.map((vid) => {
                      const isPlaying = activeVideoId === vid.id;
                      return (
                        <button
                          key={vid.id}
                          type="button"
                          className={`yt-upnext-item ${
                            isPlaying ? "active" : ""
                          }`}
                          onClick={() => setActiveVideoId(vid.id)}
                        >
                          <div className="yt-upnext-thumb">
                            {vid.thumbUrl ? (
                              <img
                                src={vid.thumbUrl}
                                alt={vid.title}
                                loading="lazy"
                              />
                            ) : (
                              <span>🎬</span>
                            )}
                            <span className="yt-mini-play">
                              {isPlaying ? "🔊" : "▶"}
                            </span>
                          </div>
                          <div className="yt-upnext-meta">
                            <strong className="yt-upnext-title">
                              {vid.title}
                            </strong>
                            <small className="yt-upnext-sub">
                              {isPlaying
                                ? "🌟 Đang phát..."
                                : `${vid.duration || "Clip"} · ${vid.sizeMB} MB`}
                            </small>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
