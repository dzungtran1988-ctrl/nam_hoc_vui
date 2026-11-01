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
  getMysteryBagRounds,
  getPronounMatchRounds,
  type EnglishDifficultyLevel,
  type EnglishMiniGameId,
  type EnglishShopItem,
  type MysteryBagOption,
  type PronounMatchPair,
} from "../data/englishLessons";
import { prefetchSpeech, useSpeech } from "../hooks/useSpeech";
import {
  playAttentionChime,
  playCardPlaceSound,
  playRewardTone,
} from "../lib/sound";
import type { ActivityProps } from "../types";
import {
  DEFAULT_ENGLISH_CLIPS,
  KawaiiItemVisual,
  type LocalEnglishClip,
} from "./english/EnglishItemVisual";
import { EnglishSongStudioView } from "./english/EnglishSongStudioView";

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

  const [basketCount, setBasketCount] = useState(0);

  const [selectedLeftPairId, setSelectedLeftPairId] = useState<string | null>(
    null,
  );
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [wrongRightPairId, setWrongRightPairId] = useState<string | null>(null);
  const [shuffledRightPairs, setShuffledRightPairs] = useState<
    PronounMatchPair[]
  >([]);

  const [bagStepIdx, setBagStepIdx] = useState<0 | 1 | 2>(0);
  const [bagSelectedOptId, setBagSelectedOptId] = useState<string | null>(null);
  const [bagStepCorrect, setBagStepCorrect] = useState<boolean | null>(null);

  const [englishClips, setEnglishClips] = useState<LocalEnglishClip[]>(
    DEFAULT_ENGLISH_CLIPS,
  );
  const [englishFolderPath, setEnglishFolderPath] = useState(
    "D:\\Nấm học\\Nhạc tiếng anh",
  );
  const [loadingClips, setLoadingClips] = useState(false);

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

  useEffect(() => {
    void fetchEnglishClips();
  }, []);

  // Tải ngầm câu hỏi đầu tiên của 4 bài theo cấp độ hiện tại khi đang ở Menu
  useEffect(() => {
    if (!soundEnabled || viewMode !== "menu") return;
    const rShop = getEnglishRounds("kuromi-shop", level)[0];
    const rAct = getEnglishRounds("kuromi-actions", level)[0];
    const rPro = PRONOUN_MATCH_ROUNDS[level]?.[0];
    const rBag = MYSTERY_BAG_PROGRESSIVE_ROUNDS[level]?.[0]?.steps?.[0];
    if (rShop?.kuromiSpeechEn) void prefetchSpeech(rShop.kuromiSpeechEn, "en-US");
    if (rAct?.kuromiSpeechEn) void prefetchSpeech(rAct.kuromiSpeechEn, "en-US");
    if (rPro?.titleEn) void prefetchSpeech(rPro.titleEn, "en-US");
    if (rBag?.questionEn) void prefetchSpeech(rBag.questionEn, "en-US");
  }, [soundEnabled, viewMode, level]);

  const currentGameMeta =
    ENGLISH_MINI_GAMES.find((g) => g.id === activeGameId) ||
    ENGLISH_MINI_GAMES[0];

  const rounds = useMemo(
    () => getEnglishRounds(activeGameId, level).slice(0, 5),
    [activeGameId, level, deckSeed],
  );

  const currentRound = rounds[roundIdx % rounds.length] || rounds[0];

  const pronounMatchList = useMemo(
    () => getPronounMatchRounds(level, 5),
    [level, deckSeed],
  );
  const currentPronounMatchRound =
    pronounMatchList[roundIdx % pronounMatchList.length] || pronounMatchList[0];

  const mysteryBagList = useMemo(
    () => getMysteryBagRounds(level, 5),
    [level, deckSeed],
  );
  const currentMysteryBagRound =
    mysteryBagList[roundIdx % mysteryBagList.length] || mysteryBagList[0];
  const currentMysteryStep =
    currentMysteryBagRound?.steps[bagStepIdx] ||
    currentMysteryBagRound?.steps[0];

  const rightShopItem = currentRound?.items.find(
    (it) => it.id === currentRound.correctItemId,
  );
  const targetBasketQty =
    activeGameId === "kuromi-shop" && level === 3
      ? Math.max(2, Math.min(4, rightShopItem?.quantity || 2))
      : 1;

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
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      if (
        copy.every((p, idx) => p.id === currentPronounMatchRound.pairs[idx]?.id) &&
        copy.length > 1
      ) {
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
        if (currentMysteryBagRound.steps[1]?.questionEn) {
          void prefetchSpeech(currentMysteryBagRound.steps[1].questionEn, "en-US");
        }
      } else if (currentRound) {
        speech.speak(currentRound.kuromiSpeechEn, "en-US");
        const nextR = rounds[(roundIdx + 1) % rounds.length];
        if (nextR?.kuromiSpeechEn) {
          void prefetchSpeech(nextR.kuromiSpeechEn, "en-US");
        }
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
        answers: [`Hoàn thành ${currentGameMeta.title} - Cấp ${level}`],
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
          MÀN HÌNH CHẾ ĐỘ: HỌC QUA BÀI HÁT & TRUYỆN NGẮN (3-COLUMN STUDIO)
         ===================================================================== */}
      {viewMode === "videos" && (
        <EnglishSongStudioView
          soundEnabled={soundEnabled}
          englishClips={englishClips}
          englishFolderPath={englishFolderPath}
          loadingClips={loadingClips}
          onRefreshClips={fetchEnglishClips}
          onUpdateClipsAfterDownload={setEnglishClips}
          onBackToMenu={() => setViewMode("menu")}
          onComplete={onComplete}
          onReaction={onReaction}
          speak={(text, lang = "en-US") => speech.speak(text, lang)}
          stopSpeech={() => speech.stop()}
        />
      )}

      {/* =====================================================================
          MÀN HÌNH TRÒ CHƠI: MỖI LẦN VÀO CHỈ HỌC ĐÚNG 1 CẤP ĐỘ ĐÃ CHỌN Ở BẢNG NGOÀI
         ===================================================================== */}
      {viewMode === "game" && currentRound && (
        <div className="kuromi-shop-stage">
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
                    activeGameId === "kuromi-pronouns" &&
                    currentPronounMatchRound
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

          {(activeGameId === "kuromi-shop" ||
            activeGameId === "kuromi-actions") && (
            <>
              <div
                className="kuromi-order-banner"
                onClick={() => speech.speak(currentRound.kuromiSpeechEn, "en-US")}
                title="Chạm để nghe Kuromi nói tiếng Anh"
              >
                <div className="kuromi-avatar-pill">
                  <img src="/assets/char-kuromi.webp" alt="Kuromi" />
                </div>

                <div className="kuromi-order-bubble-body">
                  <div className="kuromi-order-en-row">
                    <strong className="kuromi-order-en" lang="en">
                      "{currentRound.kuromiSpeechEn}"
                    </strong>
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
                            <span />
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
                            🛒 Đã nhặt {basketCount}/{targetBasketQty} · Chạm
                            tiếp!
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

              {activeGameId === "kuromi-shop" &&
                rightShopItem &&
                targetBasketQty > 1 && (
                <div className="kuromi-shopping-basket-bar">
                  <div className="basket-bar-left">
                    <span className="basket-bar-icon">🧺</span>
                    <div className="basket-bar-text">
                      <strong>
                        Giỏ Mua Hàng ({basketCount}/{targetBasketQty})
                      </strong>
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

          {activeGameId === "kuromi-pronouns" && currentPronounMatchRound && (
            <>
              <div
                className="kuromi-order-banner"
                onClick={() =>
                  speech.speak(currentPronounMatchRound.titleEn, "en-US")
                }
              >
                <div className="kuromi-avatar-pill">
                  <img src="/assets/char-kuromi.webp" alt="Kuromi" />
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

          {activeGameId === "mystery-bag" &&
            currentMysteryBagRound &&
            currentMysteryStep && (
              <div className="mystery-bag-progressive-stage">
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
                        src="/assets/char-kuromi.webp"
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

          <div className="kuromi-speaking-footer">
            <button
              type="button"
              className={`kuromi-speaking-coach-box ${
                hasSpokenAloud ? "spoken-done" : ""
              }`}
              onClick={handlePracticeSpeaking}
              title="Chạm để nghe mẫu câu tiếng Anh và tập nói"
            >
              <Volume2 size={15} />
              <span className="speaking-coach-badge">🎙️ Tập nói:</span>
              <strong lang="en" className="speaking-coach-target-en">
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
            </button>

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
                      Màn tiếp theo ({roundIdx + 2}/{totalRoundsInCurrentLevel}){" "}
                      <ChevronRight size={16} />
                    </>
                  ) : (
                    <>
                      <Star size={15} fill="currentColor" /> Nhận 3 Sao!
                    </>
                  )}
                </button>
              ) : (
                <span
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 800,
                    color: "#7c3aed",
                    padding: "4px 10px",
                    background: "rgba(243, 232, 255, 0.85)",
                    borderRadius: "999px",
                  }}
                >
                  🎯 Màn {roundIdx + 1}/{totalRoundsInCurrentLevel}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
