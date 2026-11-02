import { Suspense, useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Clock,
  Film,
  Gift,
  Home,
  Maximize2,
  Minimize2,
  ShieldCheck,
  Trophy,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useProgress } from "./hooks/useProgress";
import { prefetchSpeech, useSpeech } from "./hooks/useSpeech";
import {
  EYE_REST_BREAK_END_LINE,
  EYE_REST_BREAK_START_LINE,
  EYE_REST_GRACE_REMINDER_LINE,
  useEyeRestTimer,
} from "./hooks/useEyeRestTimer";
import { EyeRestBreakOverlay } from "./components/EyeRestBreakOverlay";
import { subjects, getSubject } from "./data/subjects";
import {
  SUBJECT_CUPS,
  awardNamStickerOnCupOpen,
  awardNamStickerOnDailyQuest,
  awardStickerForSubject,
  getTotalLitStickers,
  getTotalUnlockedInBook,
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
import {
  COST_CINEMA_TICKET,
  COST_STICKER_REDEEM,
  EARN_COINS_DAILY_CHEST,
  EARN_COINS_PER_LESSON,
  addGoldCoins,
  loadGoldCoins,
  spendGoldCoins,
} from "./data/goldCoinsEconomy";
import type { KawaiiPastryAsset } from "./data/mathLessons";
import type { ActivityProps, LessonResult, SubjectId } from "./types";
import { playCharacterTapSound, playRewardTone } from "./lib/sound";
import { getElementLocalRatio } from "./lib/touchCoords";
import { warmupSubjectAudio } from "./lib/lessonAudioWarmup";
import {
  ParticleBurstCanvas,
  type ParticleBurstHandle,
} from "./components/ParticleBurstCanvas";
import { LobbyLiveStage } from "./components/LobbyLiveStage";
import { GoldenCupCeremonyModal } from "./components/GoldenCupCeremonyModal";
import {
  StickerRewardScreen,
  VictoryVideoScreen,
} from "./components/screens/VictoryRewardScreens";
import { StarTrophyScreen } from "./components/screens/StarTrophyScreen";
import { GardenCatCareScreen } from "./components/screens/GardenCatCareScreen";
import { DailyQuestChestModal } from "./components/screens/DailyQuestChestModal";
import {
  VideoTheaterModal,
  type LocalVideoItem,
} from "./components/screens/VideoTheaterModal";

import { ReadingActivity } from "./components/ReadingActivity";
import { MathActivity } from "./components/MathActivity";
import { MusicActivity } from "./components/MusicActivity";
import { EnglishActivity } from "./components/EnglishActivity";
import { StorybookActivity } from "./components/StorybookActivity";
import { ColoringActivity } from "./components/ColoringActivity";
import { PochaccoActivity } from "./components/PochaccoActivity";
import { LifeSkillsActivity } from "./components/LifeSkillsActivity";
import { StickerBookScreen } from "./components/StickerBookScreen";
import { ParentPanel } from "./components/ParentPanel";

const NAM_TAP_LINES = [
  "Hihi, nhột quá! Tớ là Nấm chăm học đây!",
  "Yeh! Hôm nay Nấm sẽ sưu tập thật nhiều sticker!",
  "Đập tay high five với Nấm một cái nào!",
  "Cố lên nào, học bài vui quá đi!",
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
  | { type: "garden-cat" }
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

const BOARD_CLASS_MAP: Record<1 | 2 | 3 | 4, string> = {
  1: "kawaii-board-v2",
  2: "kawaii-board-v3",
  3: "kawaii-board-v4",
  4: "kawaii-board-v1",
};

type UiModePref = "auto" | "kawaii" | "minimal-portrait";
const UI_MODE_STORAGE_KEY = "nam_hoc_vui_ui_mode_v1";

const MINIMAL_SUBJECT_META: Record<
  SubjectId,
  { mascotImg: string; softBg: string; softBorder: string; accentText: string }
> = {
  reading: {
    mascotImg: "/assets/lobby/char-1-kitty.webp",
    softBg: "#F9EEF2",
    softBorder: "#EED7DF",
    accentText: "#A85670",
  },
  math: {
    mascotImg: "/assets/lobby/char-3-mymelody.webp",
    softBg: "#FDF5E6",
    softBorder: "#EFE1C4",
    accentText: "#9E7127",
  },
  english: {
    mascotImg: "/assets/lobby/char-9-kuromi.webp",
    softBg: "#F3EFFA",
    softBorder: "#E0D6F0",
    accentText: "#6F539B",
  },
  music: {
    mascotImg: "/assets/lobby/char-8-cinnamoroll.webp",
    softBg: "#ECF5FC",
    softBorder: "#D2E5F4",
    accentText: "#3E759E",
  },
  coloring: {
    mascotImg: "/assets/lobby/char-5-pompompurin.webp",
    softBg: "#EDF7F0",
    softBorder: "#D2E8D9",
    accentText: "#457E59",
  },
  storybook: {
    mascotImg: "/assets/lobby/char-4-kiki.webp",
    softBg: "#FBF0F5",
    softBorder: "#EDD6E1",
    accentText: "#9B5678",
  },
  minigame: {
    mascotImg: "/assets/lobby/char-7-pochacco.webp",
    softBg: "#EEF7F2",
    softBorder: "#D3E7DC",
    accentText: "#3F7C59",
  },
  lifeskills: {
    mascotImg: "/assets/lobby/char-2-nam.webp",
    softBg: "#EFF5FB",
    softBorder: "#D5E2F0",
    accentText: "#446E9B",
  },
};

function detectNaturalPortraitDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth <= 860 && window.innerHeight >= window.innerWidth;
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
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const particleRef = useRef<ParticleBurstHandle | null>(null);
  const tapLineIdxRef = useRef(0);

  const [uiModePref, setUiModePref] = useState<UiModePref>(() => {
    if (typeof window === "undefined") return "auto";
    const saved = window.localStorage.getItem(UI_MODE_STORAGE_KEY);
    if (saved === "kawaii" || saved === "minimal-portrait" || saved === "auto") {
      return saved;
    }
    return "auto";
  });
  const [isPortraitDevice, setIsPortraitDevice] = useState<boolean>(() =>
    detectNaturalPortraitDevice(),
  );

  const effectiveUiMode: "kawaii" | "minimal-portrait" =
    uiModePref === "auto"
      ? isPortraitDevice
        ? "minimal-portrait"
        : "kawaii"
      : uiModePref;
  const isMinimalPortrait = effectiveUiMode === "minimal-portrait";

  const [isDeviceFullscreen, setIsDeviceFullscreen] = useState(false);
  const [lobbyPage, setLobbyPage] = useState<0 | 1>(0);
  const [uiScale, setUiScale] = useState<number>(() => {
    if (typeof window === "undefined") return 1;
    if (
      detectNaturalPortraitDevice() ||
      window.innerWidth <= 960 ||
      window.innerHeight <= 540
    ) {
      return 1;
    }
    return Number(
      Math.max(
        1,
        Math.min(window.innerWidth / 1180, window.innerHeight / 620),
      ).toFixed(4),
    );
  });

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const body = document.body;
    if (isMinimalPortrait) {
      root.classList.add("ui-mode-minimal-portrait");
      root.classList.remove("ui-mode-kawaii");
      body.classList.add("ui-mode-minimal-portrait");
      body.classList.remove("ui-mode-kawaii");
    } else {
      root.classList.add("ui-mode-kawaii");
      root.classList.remove("ui-mode-minimal-portrait");
      body.classList.add("ui-mode-kawaii");
      body.classList.remove("ui-mode-minimal-portrait");
    }
  }, [isMinimalPortrait]);

  useEffect(() => {
    const updateScale = () => {
      const portraitNow = detectNaturalPortraitDevice();
      setIsPortraitDevice(portraitNow);
      const activeMinimal =
        uiModePref === "minimal-portrait" ||
        (uiModePref === "auto" && portraitNow);
      if (
        activeMinimal ||
        window.innerWidth <= 960 ||
        window.innerHeight <= 540
      ) {
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
  }, [uiModePref]);

  function toggleUiMode() {
    if (progress.soundEnabled) {
      playCharacterTapSound();
    }
    const nextTarget: "kawaii" | "minimal-portrait" = isMinimalPortrait
      ? "kawaii"
      : "minimal-portrait";
    const naturalDefault: "kawaii" | "minimal-portrait" = isPortraitDevice
      ? "minimal-portrait"
      : "kawaii";
    const nextPref: UiModePref =
      nextTarget === naturalDefault ? "auto" : nextTarget;
    setUiModePref(nextPref);
    try {
      window.localStorage.setItem(UI_MODE_STORAGE_KEY, nextPref);
    } catch {
      // ignore storage errors
    }
  }

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
        if (!isMinimalPortrait) {
          const scr = window.screen as Screen & {
            orientation?: { lock?: (mode: string) => Promise<void> };
          };
          scr.orientation?.lock?.("landscape").catch(() => {});
        }
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

  const [stickerStore, setStickerStore] = useState<StickerCollectionStore>(() =>
    loadStickerStore(),
  );
  const [goldCoins, setGoldCoins] = useState<number>(() => loadGoldCoins());
  const [storybookInitialParkMode, setStorybookInitialParkMode] = useState<
    | "lobby"
    | "bedrooms"
    | "claw"
    | "memory"
    | "island-race"
    | "space-defender"
    | "soccer"
  >("lobby");
  const [storybookInitialHubZone, setStorybookInitialHubZone] = useState<
    "hub" | "stories" | "cinema" | "games"
  >("hub");
  const [gardenCatOpenedFromGames, setGardenCatOpenedFromGames] =
    useState(false);
  const [selectedCupSubject, setSelectedCupSubject] =
    useState<SubjectId>("reading");
  const [chestNamBonus, setChestNamBonus] =
    useState<AwardedNamCupStickerResult | null>(null);

  const [dailyQuests, setDailyQuests] = useState<DailyQuestState>(() =>
    loadDailyQuestState(),
  );
  const [questItemInventory, setQuestItemInventory] =
    useState<QuestItemInventory>(() => loadQuestItemInventory());
  const [dailyChestModalOpen, setDailyChestModalOpen] = useState(false);
  const [chestBonusItems, setChestBonusItems] = useState<
    KawaiiPastryAsset[] | null
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

  const isBusyInLesson =
    page.type === "lesson" ||
    page.type === "victory-video" ||
    page.type === "reward" ||
    videoModalOpen ||
    Boolean(ceremonySubject);

  const eyeRest = useEyeRestTimer({
    isBusyInLesson,
    onBreakStart: () => {
      setVideoModalOpen(false);
      speech.stop();
    },
    onBreakEnd: () => {
      if (progress.soundEnabled) {
        playRewardTone();
        speech.speak(EYE_REST_BREAK_END_LINE, "vi-VN");
      }
    },
    onGracePendingStart: () => {
      if (progress.soundEnabled && !speech.speaking) {
        speech.speak(EYE_REST_GRACE_REMINDER_LINE, "vi-VN");
      }
    },
  });

  useEffect(() => {
    if (!progress.soundEnabled) return;
    void prefetchSpeech(EYE_REST_BREAK_START_LINE, "vi-VN");
    void prefetchSpeech(EYE_REST_BREAK_END_LINE, "vi-VN");
    void prefetchSpeech(EYE_REST_GRACE_REMINDER_LINE, "vi-VN");
  }, [progress.soundEnabled]);

  const totalLitStickers = getTotalLitStickers(stickerStore);
  const totalUnlockedInBook = getTotalUnlockedInBook(stickerStore);
  const doneQuestCount = dailyQuests.quests.filter((q) => q.done).length;
  const allThreeQuestsDone = doneQuestCount === 3;

  function handleSpendGoldCoins(cost: number): boolean {
    const res = spendGoldCoins(cost);
    setGoldCoins(res.balance);
    return res.ok;
  }

  function handleRedeemCoinSticker(subject: SubjectId) {
    if (goldCoins < COST_STICKER_REDEEM) {
      if (progress.soundEnabled) {
        speech.speak(
          "Bé cần đủ mười xu vàng để đổi một sticker mới nhé!",
          "vi-VN",
        );
      }
      return;
    }
    const ok = handleSpendGoldCoins(COST_STICKER_REDEEM);
    if (!ok) return;
    const outcome = awardStickerForSubject(stickerStore, subject);
    setStickerStore(outcome.updatedStore);
    setSelectedCupSubject(subject);
    if (progress.soundEnabled) {
      playRewardTone();
      speech.speak(
        `Đã đổi mười xu vàng! Bé nhận được sticker ${outcome.awardedSticker.name}!`,
        "vi-VN",
      );
    }
    launchFullScreenFireworks();
    if (page.type === "reward") {
      setPage({
        type: "reward",
        subject,
        awardedSticker: outcome.awardedSticker,
        justCompletedFullSet: outcome.justCompletedFullSet,
      });
    }
  }

  function handleOpenClawMachine() {
    setStorybookInitialParkMode("claw");
    speech.stop();
    setStorybookInitialHubZone("games");
    setAttemptKey((k) => k + 1);
    setDailyChestModalOpen(false);
    setCeremonySubject(null);
    setPage({ type: "lesson", subject: "storybook" });
  }

  function handleOpenPlushieShelf() {
    speech.stop();
    setDailyChestModalOpen(false);
    setCeremonySubject(null);
    setPage({
      type: "sticker-book",
      initialFilter: "claw-plushies",
      initialPageId: "plushie-shelf",
    });
  }

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
    setChestNamBonus(namAward);
    setGoldCoins(addGoldCoins(EARN_COINS_DAILY_CHEST));
    if (progress.soundEnabled) {
      playRewardTone();
      speech.speak(
        `Oa! Chúc mừng bé Nấm đã hoàn thành đủ ba nhiệm vụ hôm nay! Con nhận được thêm mười xu vàng, một Sticker Bé Nấm xịn nhất: ${namAward.sticker.name} cùng bốn Sticker Đồ Vật để dán vào Vở nhé!`,
        "vi-VN",
      );
    }
    launchFullScreenFireworks();
  }

  function handleStartNewQuestRound() {
    const next = startNewQuestRound(dailyQuests);
    setDailyQuests(next);
    setChestBonusItems(null);
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
    if (!videoModalOpen) {
      if (goldCoins < COST_CINEMA_TICKET) {
        if (progress.soundEnabled) {
          speech.speak(
            "Vé vào Rạp Chiếu Phim là mười xu vàng. Bé hãy hoàn thành bài học để nhận thêm xu vàng nhé!",
            "vi-VN",
          );
        }
        return;
      }
      handleSpendGoldCoins(COST_CINEMA_TICKET);
    }
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
    }
  }

  useEffect(() => {
    if (reaction.type === "idle") return;
    const timer = window.setTimeout(() => {
      setReaction({ type: "idle", message: "" });
    }, 3500);
    return () => window.clearTimeout(timer);
  }, [reaction]);

  function startLesson(subject: SubjectId) {
    if (eyeRest.pendingBreak || eyeRest.isResting) {
      eyeRest.triggerBreakNow();
      return;
    }
    rewarded.current = false;
    setStorybookInitialHubZone("hub");
    setStorybookInitialParkMode("lobby");
    setGardenCatOpenedFromGames(false);
    warmupSubjectAudio(subject, progress.soundEnabled);
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
          `Tuyệt vời quá! Bé Nấm vừa nhận được năm xu vàng, sticker ${awardedSticker.name} và thắp sáng đủ cả sáu sticker của ${cup.characterName}! Nấm bấm mở Cúp Vàng để cất cả sáu sticker vào Quyển Vở Sticker nhé!`,
          "vi-VN",
        );
      } else {
        speech.speak(
          `Hoan hô! Bé Nấm giỏi quá, con được thưởng năm xu vàng và tặng sticker ${awardedSticker.name} của bạn ${cup.characterName}!`,
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
    setGoldCoins(addGoldCoins(EARN_COINS_PER_LESSON));

    const outcome = awardStickerForSubject(stickerStore, subject);
    setStickerStore(outcome.updatedStore);
    setSelectedCupSubject(subject);

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
      className={`game-viewport ${
        isMinimalPortrait ? "ui-mode-minimal-portrait" : "ui-mode-kawaii"
      }`}
      style={
        !isMinimalPortrait && uiScale > 1.01
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
          1A. MÀN HÌNH SẢNH DỌC TINH GỌN (KEM SỮA & PASTEL DỊU - MUJI / DUOLINGO)
         ===================================================================== */}
      {page.type === "home" && isMinimalPortrait && (
        <div className="scene-screen minimal-portrait-lobby">
          <header className="minimal-top-bar">
            <button
              type="button"
              className="minimal-brand-chip"
              onClick={(e) => {
                triggerTapBurst(e, "gold");
                const line =
                  NAM_TAP_LINES[tapLineIdxRef.current % NAM_TAP_LINES.length];
                tapLineIdxRef.current += 1;
                speech.speak(line, "vi-VN");
              }}
              title="Chạm để nghe Bé Nấm chào!"
            >
              <span className="minimal-brand-avatar">
                <img src="/assets/lobby/char-2-nam.webp" alt="Bé Nấm" />
              </span>
              <span className="minimal-brand-text">
                <strong>Nấm Học Vui</strong>
                <small>Giao diện Kem Sữa Dịu Mắt</small>
              </span>
            </button>

            <nav
              className="minimal-top-nav-links"
              aria-label="Menu điều hướng ngang bản tối giản"
            >
              <button
                type="button"
                className="minimal-top-nav-pill active"
                onClick={() => setPage({ type: "home" })}
              >
                <Home size={15} />
                <span>Học bài</span>
              </button>
              <button
                type="button"
                className="minimal-top-nav-pill"
                onClick={() => setDailyChestModalOpen(true)}
              >
                <Gift size={15} />
                <span>Nhiệm vụ ({doneQuestCount}/3)</span>
              </button>
              <button
                type="button"
                className="minimal-top-nav-pill"
                onClick={() =>
                  setPage({ type: "sticker-book", initialFilter: "unlocked" })
                }
              >
                <BookOpen size={15} />
                <span>Vở Sticker ({totalUnlockedInBook})</span>
              </button>
              <button
                type="button"
                className="minimal-top-nav-pill"
                onClick={() => setPage({ type: "stars" })}
              >
                <Trophy size={15} />
                <span>Phòng Cúp ({totalLitStickers}/48)</span>
              </button>
              <button
                type="button"
                className="minimal-top-nav-pill"
                onClick={() => setPage({ type: "parents" })}
              >
                <ShieldCheck size={15} />
                <span>Ba Mẹ</span>
              </button>
            </nav>

            <div className="minimal-top-actions">
              <button
                type="button"
                className="minimal-pill-btn minimal-coin-btn"
                onClick={handleOpenClawMachine}
                title="Xu vàng của Nấm • Bấm để vào Máy Gắp Thú"
              >
                <img
                  src="/assets/math/items/gold-coin.webp"
                  alt=""
                  className="minimal-coin-icon"
                />
                <span>{goldCoins} Xu</span>
              </button>

              <button
                type="button"
                className="minimal-pill-btn minimal-icon-only"
                onClick={() => setSoundEnabled(!progress.soundEnabled)}
                title={progress.soundEnabled ? "Tắt âm thanh" : "Bật âm thanh"}
              >
                {progress.soundEnabled ? (
                  <Volume2 size={16} />
                ) : (
                  <VolumeX size={16} />
                )}
              </button>

              <button
                type="button"
                className="minimal-pill-btn minimal-switch-mode-btn"
                onClick={toggleUiMode}
                title="Chuyển sang giao diện Sân Khấu Kawaii Đầy Đủ (Ngang)"
              >
                <span>🌈 Bản Kawaii</span>
              </button>
            </div>
          </header>

          <div className="minimal-lobby-scroll">
            {/* Thẻ Nhiệm vụ hôm nay & Nhịp nghỉ mắt */}
            <section className="minimal-quest-card">
              <div className="minimal-quest-top">
                <div className="minimal-quest-title-wrap">
                  <span className="minimal-quest-eyebrow">
                    ✨ MỤC TIÊU HÔM NAY ({doneQuestCount}/3)
                  </span>
                  <h2>
                    {allThreeQuestsDone && !dailyQuests.chestClaimed
                      ? "Nấm đã xong đủ 3 bài! Mở rương nhận quà thôi!"
                      : "Hoàn thành 3 môn để mở Rương Kho Báu"}
                  </h2>
                </div>
                <button
                  type="button"
                  className={`minimal-quest-open-btn ${
                    allThreeQuestsDone && !dailyQuests.chestClaimed
                      ? "is-ready"
                      : ""
                  }`}
                  onClick={() => setDailyChestModalOpen(true)}
                >
                  <Gift size={15} />
                  <span>
                    {allThreeQuestsDone && !dailyQuests.chestClaimed
                      ? "Mở Rương!"
                      : "Xem Rương"}
                  </span>
                </button>
              </div>

              <div className="minimal-quest-pills-row">
                {dailyQuests.quests.map((q) => {
                  const qSubj = getSubject(q.subjectId);
                  return (
                    <button
                      key={q.subjectId}
                      type="button"
                      className={`minimal-quest-subject-chip ${
                        q.done ? "is-done" : "is-pending"
                      }`}
                      onClick={() =>
                        q.done
                          ? setDailyChestModalOpen(true)
                          : startLesson(q.subjectId)
                      }
                    >
                      <span>{q.done ? "✅" : qSubj.icon}</span>
                      <span>{qSubj.name}</span>
                    </button>
                  );
                })}
                {eyeRest.studyLimitMinutes > 0 && (
                  <button
                    type="button"
                    className="minimal-eye-rest-chip"
                    onClick={() => {
                      const minsLeft = Math.max(
                        1,
                        Math.ceil(eyeRest.remainingStudySeconds / 60),
                      );
                      if (progress.soundEnabled) {
                        speech.speak(
                          `Còn khoảng ${minsLeft} phút học nữa là đến giờ nghỉ mắt mười phút nhé!`,
                          "vi-VN",
                        );
                      }
                    }}
                  >
                    <Clock size={13} />
                    <span>
                      Nghỉ mắt: {Math.ceil(eyeRest.remainingStudySeconds / 60)}p
                    </span>
                  </button>
                )}
              </div>
            </section>

            {/* Tiêu đề danh sách 8 môn học */}
            <div className="minimal-section-heading">
              <h3>📚 8 Môn Học Của Nấm</h3>
              <span>Chạm vào môn học để bắt đầu</span>
            </div>

            {/* Lưới 2 cột dọc gọn nhẹ cho 8 môn học */}
            <div className="minimal-subjects-grid">
              {subjects.map((subj) => {
                const meta = MINIMAL_SUBJECT_META[subj.id];
                const questItem = dailyQuests.quests.find(
                  (q) => q.subjectId === subj.id,
                );
                const litCount = stickerStore[subj.id]?.litIndices.length || 0;
                return (
                  <button
                    key={subj.id}
                    type="button"
                    className={`minimal-subject-card ${
                      questItem && !questItem.done ? "has-active-quest" : ""
                    }`}
                    style={
                      {
                        "--min-soft-bg": meta.softBg,
                        "--min-soft-border": meta.softBorder,
                        "--min-accent-text": meta.accentText,
                      } as React.CSSProperties
                    }
                    onPointerDown={() =>
                      warmupSubjectAudio(subj.id, progress.soundEnabled)
                    }
                    onClick={() => startLesson(subj.id)}
                  >
                    <div className="minimal-card-top-row">
                      <span className="minimal-card-skill-tag">
                        {subj.icon} {subj.skill}
                      </span>
                      {questItem ? (
                        <span
                          className={`minimal-card-quest-dot ${
                            questItem.done ? "done" : "pending"
                          }`}
                        >
                          {questItem.done ? "✓ Xong" : "★ Hôm nay"}
                        </span>
                      ) : (
                        <span className="minimal-card-cup-count">
                          🏆 {litCount}/6
                        </span>
                      )}
                    </div>

                    <div className="minimal-card-mascot-wrap">
                      <div className="minimal-card-mascot-circle">
                        <img src={meta.mascotImg} alt={subj.teacher} />
                      </div>
                    </div>

                    <div className="minimal-card-info">
                      <strong>{subj.name}</strong>
                      <small>Cùng {subj.teacher}</small>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Góc Vườn Mèo, Gắp Thú & Xem Phim thu gọn */}
            <div className="minimal-section-heading">
              <h3>🌿 Góc Thư Giãn & Phần Thưởng</h3>
              <span>Dùng xu vàng & chăm sóc thú cưng</span>
            </div>

            <div className="minimal-utilities-row">
              <button
                type="button"
                className="minimal-utility-card"
                onClick={() => {
                  speech.stop();
                  if (progress.soundEnabled) playCharacterTapSound();
                  setGardenCatOpenedFromGames(false);
                  setPage({ type: "garden-cat" });
                }}
              >
                <span className="minimal-util-emoji">🌱🐱</span>
                <div className="minimal-util-text">
                  <strong>Vườn Cây & Mèo</strong>
                  <small>Tưới cây & nuôi mèo Kawaii</small>
                </div>
              </button>

              <button
                type="button"
                className="minimal-utility-card"
                onClick={handleOpenClawMachine}
              >
                <span className="minimal-util-emoji">🧸</span>
                <div className="minimal-util-text">
                  <strong>Máy Gắp Thú</strong>
                  <small>Đổi xu gắp gấu bông ({goldCoins} xu)</small>
                </div>
              </button>

              <button
                type="button"
                className="minimal-utility-card"
                onClick={openVideoTheater}
              >
                <span className="minimal-util-emoji">🎬</span>
                <div className="minimal-util-text">
                  <strong>Rạp Hoạt Hình</strong>
                  <small>Xem clip & nhạc thiếu nhi</small>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          1B. MÀN HÌNH SẢNH CHÍNH PASTEL (8 MÔN HỌC 4x2 TRÊN KHAY KEM SỮA - PC)
         ===================================================================== */}
      {page.type === "home" && !isMinimalPortrait && (
        <div
          className="scene-screen lobby-screen pastel-lobby-screen"
          style={{
            backgroundImage: `url("/assets/scene-lobby-pastel.webp")`,
          }}
        >
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
                className="hud-pill hud-gold"
                onClick={() => {
                  speech.stop();
                  if (progress.soundEnabled) playCharacterTapSound();
                  setGardenCatOpenedFromGames(false);
                  setPage({ type: "garden-cat" });
                }}
                style={{
                  background: "linear-gradient(135deg, #20C997, #12B886)",
                  color: "#FFFFFF",
                  borderColor: "#FFE066",
                }}
                title="Vào Vườn Cây Thần Kỳ & Phòng Nuôi Mèo Kawaii của Nấm!"
              >
                <span>🌱🐱 Vườn Cây & Mèo</span>
              </button>
              <button
                type="button"
                className="hud-pill hud-gold"
                onClick={handleOpenClawMachine}
                title="Hoàn thành 1 bài học = +5 Xu Vàng • Bấm để vào Máy Gắp Thú Sanrio (10 Xu/lượt)"
              >
                <img
                  src="/assets/math/items/gold-coin.webp"
                  alt=""
                  className="inline-coin-3d-icon"
                />
                <span>{goldCoins} Xu · 🧸 Gắp Thú</span>
              </button>
              <button
                type="button"
                className={`hud-pill quest-compact-trigger ${
                  allThreeQuestsDone && !dailyQuests.chestClaimed
                    ? "ready-pulse"
                    : ""
                }`}
                onClick={() => setDailyChestModalOpen(true)}
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
                className="hud-pill hud-minimal-mode-trigger"
                onClick={toggleUiMode}
                title="Chuyển sang giao diện Kem Sữa Tối Giản (Hỗ trợ cả Web Ngang & Mobile Dọc)"
              >
                <span>🌿 Bản Tối Giản</span>
              </button>
              {eyeRest.studyLimitMinutes > 0 && (
                <button
                  type="button"
                  className="hud-pill hud-purple"
                  onClick={() => {
                    const minsLeft = Math.max(
                      1,
                      Math.ceil(eyeRest.remainingStudySeconds / 60),
                    );
                    if (progress.soundEnabled) {
                      speech.speak(
                        `Còn khoảng ${minsLeft} phút học nữa là đến giờ ra chơi nghỉ mắt mười phút nhé!`,
                        "vi-VN",
                      );
                    }
                  }}
                  title={`Nhịp nghỉ mắt: Còn ${Math.ceil(eyeRest.remainingStudySeconds / 60)} phút nữa đến giờ ra chơi`}
                >
                  <Clock size={15} />
                  <span>{Math.ceil(eyeRest.remainingStudySeconds / 60)}&apos;</span>
                </button>
              )}
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

          <div
            className={`lobby-dock-container pastel-grid-8 page-${lobbyPage}`}
          >
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
                    onPointerDown={() =>
                      warmupSubjectAudio(subj.id, progress.soundEnabled)
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
          2. MÀN HÌNH BẢNG HỌC PASTEL TOÀN MÀN HÌNH (CSS THUẦN LOAD 0MS)
         ===================================================================== */}
      {page.type === "lesson" &&
        (() => {
          const subject = getSubject(page.subject);
          const Activity = activities[page.subject];
          const isStorybook = page.subject === "storybook";
          const cupState = stickerStore[page.subject];
          const kawaiiBoardClass = BOARD_CLASS_MAP[poseVariant];

          return (
            <div
              className={`scene-screen ${
                isStorybook
                  ? "bedtime-story-screen"
                  : `classroom-stage-screen reaction-${reaction.type} has-fullscreen-board css-pastel-stage ${kawaiiBoardClass}`
              }`}
            >
              <header className="garland-hud hud-in-active-lesson">
                <div className="hud-left-group">
                  <button
                    type="button"
                    className="hud-pill hud-pink"
                    onClick={() => {
                      speech.stop();
                      setPage({ type: "home" });
                    }}
                  >
                    <Home size={18} /> Về Sảnh
                  </button>
                  {!isStorybook && (
                    <span className="hud-pill hud-subject-badge">
                      <span>{subject.icon}</span>
                      <strong>{subject.name}</strong>
                    </span>
                  )}
                </div>

                <div className="hud-right-group">
                  <button
                    type="button"
                    className="hud-pill hud-minimal-mode-trigger"
                    onClick={toggleUiMode}
                    title={
                      isMinimalPortrait
                        ? "Chuyển sang giao diện Sân Khấu Kawaii"
                        : "Chuyển sang giao diện Kem Sữa Tối Giản"
                    }
                  >
                    <span>
                      {isMinimalPortrait ? "🌈 Bản Kawaii" : "🌿 Bản Tối Giản"}
                    </span>
                  </button>

                  {(page.subject === "music" || isStorybook) && (
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
                    <Trophy size={17} /> {cupState?.litIndices.length || 0}/6 ·{" "}
                    <img
                      src="/assets/math/items/gold-coin.webp"
                      alt=""
                      className="inline-coin-3d-icon"
                    />{" "}
                    {goldCoins}
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
                  {!isMinimalPortrait && (
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
                  )}
                </div>
              </header>

              {!isStorybook && reaction.message && (
                <div
                  className="kawaii-top-characters-hotspot"
                  style={{ pointerEvents: "none" }}
                >
                  <div className={`kawaii-top-speech-bubble ${reaction.type}`}>
                    {reaction.message}
                  </div>
                </div>
              )}

              <main
                className={
                  isStorybook
                    ? "bedtime-story-zone"
                    : `whiteboard-frame-zone fullscreen-decorated-board css-pastel-board-frame ${kawaiiBoardClass}`
                }
              >
                <div className="board-activity-inner">
                  <Suspense fallback={null}>
                    {isStorybook ? (
                      <StorybookActivity
                        key={`${page.subject}-${attemptKey}`}
                        soundEnabled={progress.soundEnabled}
                        onComplete={(result) => finishLesson(page.subject, result)}
                        onReaction={handleReaction}
                        goldCoins={goldCoins}
                        onSpendCoins={handleSpendGoldCoins}
                        onOpenPlushieShelf={handleOpenPlushieShelf}
                        onOpenGardenCat={() => {
                          speech.stop();
                          setGardenCatOpenedFromGames(true);
                          setPage({ type: "garden-cat" });
                        }}
                        initialHubZone={storybookInitialHubZone}
                        initialParkGameMode={storybookInitialParkMode}
                        onAddCoins={(amount) => {
                          const updated = addGoldCoins(amount);
                          setGoldCoins(updated);
                          setStickerStore(loadStickerStore());
                        }}
                      />
                    ) : (
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
                    )}
                  </Suspense>
                </div>
              </main>
            </div>
          );
        })()}

      {/* =====================================================================
          2B. MÀN HÌNH CLIP CHÚC MỪNG CHIẾN THẮNG TRƯỚC KHI NHẬN STICKER
         ===================================================================== */}
      {page.type === "victory-video" && (
        <VictoryVideoScreen
          subject={page.subject}
          awardedSticker={page.awardedSticker}
          justCompletedFullSet={page.justCompletedFullSet}
          onProceedToReward={proceedToReward}
        />
      )}

      {/* =====================================================================
          3. MÀN HÌNH TẶNG STICKER & THẮP SÁNG BẢNG STICKER NHÂN VẬT
         ===================================================================== */}
      {page.type === "reward" && (
        <StickerRewardScreen
          subject={page.subject}
          awardedSticker={page.awardedSticker}
          stickerStore={stickerStore}
          allThreeQuestsDone={allThreeQuestsDone}
          chestClaimed={dailyQuests.chestClaimed}
          goldCoins={goldCoins}
          onRedeemCoinSticker={handleRedeemCoinSticker}
          onOpenClawMachine={handleOpenClawMachine}
          onOpenDailyChestModal={() => setDailyChestModalOpen(true)}
          onResetCupStickers={handleResetCupStickers}
          onOpenStickerBook={(filter) =>
            setPage({ type: "sticker-book", initialFilter: filter })
          }
          onPlayAgain={startLesson}
          onOpenTrophyRoom={(subj) => {
            setSelectedCupSubject(subj);
            setPage({ type: "stars", initialSubject: subj });
          }}
          onGoHome={() => setPage({ type: "home" })}
        />
      )}

      {/* =====================================================================
          4. MÀN HÌNH PHÒNG CÚP VÀNG & STICKER
         ===================================================================== */}
      {page.type === "stars" && (
        <StarTrophyScreen
          stickerStore={stickerStore}
          selectedCupSubject={selectedCupSubject}
          onSelectCupSubject={setSelectedCupSubject}
          onGoHome={() => setPage({ type: "home" })}
          onOpenStickerBook={(filter) =>
            setPage({ type: "sticker-book", initialFilter: filter })
          }
          onStartLesson={startLesson}
          onOpenDailyChestModal={() => setDailyChestModalOpen(true)}
          onResetCupStickers={handleResetCupStickers}
          goldCoins={goldCoins}
          onRedeemCoinSticker={handleRedeemCoinSticker}
          onOpenClawMachine={handleOpenClawMachine}
        />
      )}

      {/* =====================================================================
          4B. QUYỂN VỞ DÁN STICKER CỦA NẤM
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
            onOpenClawMachine={handleOpenClawMachine}
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
      {page.type === "garden-cat" && (
        <GardenCatCareScreen
          goldCoins={goldCoins}
          onSpendCoins={handleSpendGoldCoins}
          onAddCoins={(amount) => {
            const next = addGoldCoins(amount);
            setGoldCoins(next);
          }}
          questItemInventory={questItemInventory}
          onUpdateQuestItemInventory={(nextInv) => setQuestItemInventory(nextInv)}
          completedLessonsCount={progress.completions.length}
          soundEnabled={progress.soundEnabled}
          onSpeak={(text) => {
            if (progress.soundEnabled) {
              speech.speak(text, "vi-VN");
            }
          }}
          onGoHome={() => {
            speech.stop();
            if (gardenCatOpenedFromGames) {
              setGardenCatOpenedFromGames(false);
              setStorybookInitialHubZone("games");
              setStorybookInitialParkMode("lobby");
              setAttemptKey((k) => k + 1);
              setPage({ type: "lesson", subject: "storybook" });
              return;
            }
            setPage({ type: "home" });
          }}
          onStartLesson={(subj) => startLesson(subj)}
          onOpenStickerBook={(filter) =>
            setPage({ type: "sticker-book", initialFilter: filter })
          }
        />
      )}

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
              studyLimitMinutes={eyeRest.studyLimitMinutes}
              todayStudySeconds={eyeRest.todayStudySeconds}
              remainingStudySeconds={eyeRest.remainingStudySeconds}
              onChangeStudyLimitMinutes={eyeRest.setStudyLimitMinutes}
              onTriggerBreakNow={() => {
                setPage({ type: "home" });
                eyeRest.triggerBreakNow();
              }}
            />
          </Suspense>
        </div>
      )}

      {/* =====================================================================
          6. MODAL 3 NHIỆM VỤ NGÀY & RƯƠNG KHO BÁU
         ===================================================================== */}
      {dailyChestModalOpen && (
        <DailyQuestChestModal
          dailyQuests={dailyQuests}
          questItemInventory={questItemInventory}
          chestBonusItems={chestBonusItems}
          chestNamBonus={chestNamBonus}
          onClose={() => setDailyChestModalOpen(false)}
          onStartLesson={startLesson}
          onOpenDailyChest={handleOpenDailyChest}
          onStartNewQuestRound={handleStartNewQuestRound}
          onOpenSupermarketStickerBook={() => {
            setDailyChestModalOpen(false);
            setPage({
              type: "sticker-book",
              initialFilter: "quest-unlocked",
              initialPageId: "supermarket",
            });
          }}
        />
      )}

      {/* =====================================================================
          7. MODAL RẠP CHIẾU PHIM HOẠT HÌNH CỦA NẤM
         ===================================================================== */}
      {videoModalOpen && (
        <VideoTheaterModal
          localVideos={localVideos}
          activeVideoId={activeVideoId}
          onSelectVideo={setActiveVideoId}
          onClose={() => setVideoModalOpen(false)}
          onStartLesson={startLesson}
        />
      )}

      {/* =====================================================================
          8. NHẮC NHẸ SẮP ĐẾN GIỜ RA CHƠI (CHỜ NẤM LÀM NỐT BÀI ĐANG DỞ)
         ===================================================================== */}
      {eyeRest.pendingBreak && !eyeRest.isResting && (
        <div className="eye-rest-grace-banner" role="status" aria-live="polite">
          <span>
            🌙 Sắp đến giờ ra chơi rồi! Nấm hoàn thành nốt bài này rồi mình nghỉ mắt 10 phút nhé!
          </span>
          <button
            type="button"
            className="eye-rest-grace-now-btn"
            onClick={() => eyeRest.triggerBreakNow()}
          >
            Nghỉ ngay
          </button>
        </div>
      )}

      {/* =====================================================================
          9. MÀN HÌNH GIỜ RA CHƠI NGHỈ MẮT 10 PHÚT (CÓ KHÓA MẸ)
         ===================================================================== */}
      {eyeRest.isResting && (
        <EyeRestBreakOverlay
          remainingBreakSeconds={eyeRest.remainingBreakSeconds}
          breakDurationMinutes={eyeRest.breakDurationMinutes}
          onSpeak={(text) => {
            if (progress.soundEnabled) {
              speech.speak(text, "vi-VN");
            }
          }}
          onUnlockReset={() => {
            speech.stop();
            eyeRest.unlockAndResetCycle();
          }}
          onSnooze={(extraMins) => {
            speech.stop();
            eyeRest.snoozeBreak(extraMins);
          }}
        />
      )}
      {/* =====================================================================
          10. THANH ĐIỀU HƯỚNG ĐÁY CHO GIAO DIỆN DỌC TINH GỌN (MINIMAL PORTRAIT)
         ===================================================================== */}
      {isMinimalPortrait && page.type !== "victory-video" && (
        <nav
          className="minimal-bottom-nav"
          aria-label="Điều hướng chính bản tinh gọn"
        >
          <button
            type="button"
            className={`minimal-nav-tab ${
              page.type === "home" || page.type === "lesson" ? "active" : ""
            }`}
            onClick={() => {
              speech.stop();
              setPage({ type: "home" });
            }}
          >
            <Home size={18} />
            <span>Học bài</span>
          </button>

          <button
            type="button"
            className={`minimal-nav-tab ${dailyChestModalOpen ? "active" : ""}`}
            onClick={() => setDailyChestModalOpen(true)}
          >
            <Gift size={18} />
            <span>Nhiệm vụ ({doneQuestCount}/3)</span>
          </button>

          <button
            type="button"
            className={`minimal-nav-tab ${
              page.type === "sticker-book" ? "active" : ""
            }`}
            onClick={() => {
              speech.stop();
              setPage({ type: "sticker-book", initialFilter: "unlocked" });
            }}
          >
            <BookOpen size={18} />
            <span>Sticker ({totalUnlockedInBook})</span>
          </button>

          <button
            type="button"
            className={`minimal-nav-tab ${page.type === "stars" ? "active" : ""}`}
            onClick={() => {
              speech.stop();
              setPage({ type: "stars" });
            }}
          >
            <Trophy size={18} />
            <span>Cúp ({totalLitStickers})</span>
          </button>

          <button
            type="button"
            className={`minimal-nav-tab ${
              page.type === "parents" ? "active" : ""
            }`}
            onClick={() => {
              speech.stop();
              setPage({ type: "parents" });
            }}
          >
            <ShieldCheck size={18} />
            <span>Ba Mẹ</span>
          </button>
        </nav>
      )}
    </div>
  );
}

export default App;
