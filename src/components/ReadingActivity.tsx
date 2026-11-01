import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Check,
  HelpCircle,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Volume2,
} from "lucide-react";
import {
  drawQuestionsForPoem,
  drawRandomFlashcardsForSet,
  drawRandomPoemByLevel,
  getDifficultWordsForSlide,
  PICTURE_WORD_FLASHCARD_SETS,
  POEM_READING_LIBRARY,
  shuffleArray,
  type PictureWordCard,
  type PictureWordFlashcardSet,
  type PoemDifficultWord,
  type PoemQuizItem,
  type PoemReadingItem,
} from "../data/readingLessons";
import { useSpeech } from "../hooks/useSpeech";
import { playCardPlaceSound, playRewardTone } from "../lib/sound";
import type { ActivityProps } from "../types";
import { KittyPhonicsLessonModal } from "./reading/KittyPhonicsLessonModal";
import { WordBlendQuizModal } from "./reading/WordBlendQuizModal";

function normalizeCleanWord(raw: string): string {
  return raw
    .replace(/[.,!?;:"'«»()[\]]/g, "")
    .trim()
    .toLowerCase();
}

// Bảng màu chữ trang trí tươi sáng, độ tương phản tốt, bắt mắt cho bé
const WORD_COLOR_PALETTE = [
  "#D63384", // Hồng dâu đậm
  "#2563EB", // Xanh dương tươi
  "#0D9488", // Xanh ngọc lục bảo
  "#D97706", // Cam mật ong
  "#7C3AED", // Tím oải hương
  "#E11D48", // Đỏ hồng ruby
];

const AUTO_GLOW_LINE_INTERVAL_MS = 4500;

export function ReadingActivity({
  soundEnabled,
  onComplete,
  onReaction,
  onLessonIndexChange,
}: ActivityProps) {
  const [viewMode, setViewMode] = useState<
    "menu" | "poem" | "flashcards" | "phonics" | "blend-quiz"
  >("menu");
  const [menuTab, setMenuTab] = useState<"flashcards" | 1 | 2>("flashcards");
  const [selectedPoemLevel, setSelectedPoemLevel] = useState<1 | 2>(1);
  const [poemId, setPoemId] = useState<string>(POEM_READING_LIBRARY[0].id);
  const [slideIdx, setSlideIdx] = useState(0);

  // State cho chế độ "Lật 5 Thẻ Từ Khóa Có Hình 3D (Tự đổi ảnh mới mỗi lần vào)"
  const [activeFlashcardSetId, setActiveFlashcardSetId] = useState<string>(
    PICTURE_WORD_FLASHCARD_SETS[0].id,
  );
  const [activeFlashcards, setActiveFlashcards] = useState<PictureWordCard[]>(
    () => drawRandomFlashcardsForSet(PICTURE_WORD_FLASHCARD_SETS[0].id, 5),
  );
  const [revealedCardIds, setRevealedCardIds] = useState<string[]>([]);
  const [flashcardStage, setFlashcardStage] = useState<
    "cards" | "quiz" | "done"
  >("cards");
  const [flashcardQuizQueue, setFlashcardQuizQueue] = useState<
    PictureWordCard[]
  >(() => PICTURE_WORD_FLASHCARD_SETS[0].cards.slice(0, 5));
  const [flashcardQuizStep, setFlashcardQuizStep] = useState(0);
  const [quizTargetCard, setQuizTargetCard] = useState<PictureWordCard>(
    PICTURE_WORD_FLASHCARD_SETS[0].cards[0],
  );
  const [flashcardQuizWrongId, setFlashcardQuizWrongId] = useState<
    string | null
  >(null);

  // Dòng đang sáng viền (chạy tự động theo nhịp thời gian hoặc sáng ngay khi di chuột vào)
  const [glowLineIdx, setGlowLineIdx] = useState(0);
  const [autoPaceRunning, setAutoPaceRunning] = useState(true);
  const [isHoveringLine, setIsHoveringLine] = useState(false);
  const [speakingWholeSlide, setSpeakingWholeSlide] = useState(false);

  const [activeWordHelp, setActiveWordHelp] = useState<{
    word: string;
    tip?: string;
  } | null>(null);

  // Trạng thái 5 Câu Hỏi Nhanh Cuối Bài Thơ (rút không trùng lặp từ kho 6 câu của bài)
  const [activePoemQuestions, setActivePoemQuestions] = useState<
    PoemQuizItem[]
  >(() => drawQuestionsForPoem(POEM_READING_LIBRARY[0], 5));
  const [poemStage, setPoemStage] = useState<"reading" | "question" | "correct">(
    "reading",
  );
  const [questionIdx, setQuestionIdx] = useState(0);
  const [shuffledChoices, setShuffledChoices] = useState<
    { text: string; isCorrect: boolean }[]
  >([]);
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState<number | null>(
    null,
  );
  const [showEvidencePeek, setShowEvidencePeek] = useState(false);
  const [poemFeedback, setPoemFeedback] = useState<{
    type: "success" | "retry";
    text: string;
  } | null>(null);

  const [attemptsCount, setAttemptsCount] = useState(0);
  const [hintsUsedCount, setHintsUsedCount] = useState(0);
  const [collectedAnswers, setCollectedAnswers] = useState<string[]>([]);

  const completedSessionRef = useRef(false);
  const { speak, stop, speaking, progressRatio } = useSpeech(soundEnabled, {
    trackProgress: true,
  });

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  // Cố định 1 khung bảng duy nhất suốt 1 bài đọc (chỉ đổi khi chuyển sang bài khác)
  useEffect(() => {
    if (viewMode === "menu") {
      onLessonIndexChange?.(0);
      return;
    }
    if (viewMode === "flashcards") {
      const fIdx = PICTURE_WORD_FLASHCARD_SETS.findIndex(
        (f) => f.id === activeFlashcardSetId,
      );
      onLessonIndexChange?.(fIdx >= 0 ? fIdx : 0);
      return;
    }
    const pIdx = POEM_READING_LIBRARY.findIndex((p) => p.id === poemId);
    onLessonIndexChange?.(pIdx >= 0 ? pIdx : 0);
  }, [viewMode, poemId, activeFlashcardSetId]);

  const currentFlashcardSet: PictureWordFlashcardSet = useMemo(
    () =>
      PICTURE_WORD_FLASHCARD_SETS.find((f) => f.id === activeFlashcardSetId) ||
      PICTURE_WORD_FLASHCARD_SETS[0],
    [activeFlashcardSetId],
  );

  const currentPoem: PoemReadingItem = useMemo(
    () =>
      POEM_READING_LIBRARY.find((p) => p.id === poemId) ||
      POEM_READING_LIBRARY[0],
    [poemId],
  );

  const filteredPoems = useMemo(
    () =>
      POEM_READING_LIBRARY.filter((item) => item.level === selectedPoemLevel),
    [selectedPoemLevel],
  );

  const currentPoemLines =
    currentPoem.slides[slideIdx] || currentPoem.slides[0];
  const poemWordsPerLine = useMemo(
    () => currentPoemLines.map((line) => line.split(" ")),
    [currentPoemLines],
  );
  const totalPoemWords = useMemo(
    () => poemWordsPerLine.reduce((sum, words) => sum + words.length, 0),
    [poemWordsPerLine],
  );

  // Danh sách từ khó trong khổ thơ hiện tại để hỗ trợ bé khi vấp
  const currentDifficultWords: PoemDifficultWord[] = useMemo(
    () => getDifficultWordsForSlide(currentPoem.id, slideIdx),
    [currentPoem.id, slideIdx],
  );

  // Map các tiếng nằm trong cụm từ khó để gạch chân nhẹ gợi ý trên dòng thơ
  const difficultTokenMap = useMemo(() => {
    const map = new Map<string, PoemDifficultWord>();
    for (const item of currentDifficultWords) {
      const tokens = item.word.split(/\s+/).map(normalizeCleanWord);
      for (const token of tokens) {
        if (token) {
          map.set(token, item);
        }
      }
    }
    return map;
  }, [currentDifficultWords]);

  // Tính chữ đang sáng khi bấm nút "Nghe cô đọc khổ này"
  const activeGlobalWordIdx = useMemo(() => {
    if (!speaking || !speakingWholeSlide || totalPoemWords === 0) return -1;
    return Math.min(
      totalPoemWords - 1,
      Math.floor(progressRatio * totalPoemWords),
    );
  }, [speaking, speakingWholeSlide, progressRatio, totalPoemWords]);

  // Khi cô đang đọc cả khổ, sáng viền dòng theo câu cô đang đọc
  useEffect(() => {
    if (!speaking || !speakingWholeSlide || activeGlobalWordIdx < 0) return;
    let acc = 0;
    for (let lIdx = 0; lIdx < poemWordsPerLine.length; lIdx++) {
      const lineLen = poemWordsPerLine[lIdx].length;
      if (activeGlobalWordIdx < acc + lineLen) {
        setGlowLineIdx(lIdx);
        break;
      }
      acc += lineLen;
    }
  }, [speaking, speakingWholeSlide, activeGlobalWordIdx, poemWordsPerLine]);

  // Tự động di chuyển khung viền sáng từng câu theo nhịp thời gian nhất định
  // (Tạm dừng khi bé đang di chuột vào 1 dòng hoặc khi cô đang đọc mẫu)
  useEffect(() => {
    if (
      viewMode !== "poem" ||
      poemStage !== "reading" ||
      !autoPaceRunning ||
      isHoveringLine ||
      speaking
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setGlowLineIdx((prev) => (prev + 1) % currentPoemLines.length);
    }, AUTO_GLOW_LINE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [
    viewMode,
    poemStage,
    autoPaceRunning,
    isHoveringLine,
    speaking,
    currentPoemLines.length,
  ]);

  const currentQuestion: PoemQuizItem = useMemo(
    () =>
      activePoemQuestions[questionIdx] ||
      activePoemQuestions[0] ||
      currentPoem.questions[0] ||
      currentPoem.comprehensionQuestion,
    [activePoemQuestions, currentPoem, questionIdx],
  );

  const setupQuestion = (questionsList: PoemQuizItem[], qIndex: number) => {
    const q = questionsList[qIndex] || questionsList[0];
    const rawChoices = q.choices.map((text, idx) => ({
      text,
      isCorrect: idx === q.correctIndex,
    }));
    setQuestionIdx(qIndex);
    setShuffledChoices(shuffleArray(rawChoices, qIndex + 1));
    setSelectedChoiceIdx(null);
    setShowEvidencePeek(false);
    setPoemFeedback(null);
    setPoemStage("question");
  };

  const startPoemLesson = (poem: PoemReadingItem) => {
    stop();
    const drawnQuestions = drawQuestionsForPoem(poem, 5);
    setPoemId(poem.id);
    setActivePoemQuestions(drawnQuestions);
    setSlideIdx(0);
    setGlowLineIdx(0);
    setAutoPaceRunning(true);
    setIsHoveringLine(false);
    setSpeakingWholeSlide(false);
    setActiveWordHelp(null);
    setPoemStage("reading");
    setQuestionIdx(0);
    setSelectedChoiceIdx(null);
    setShowEvidencePeek(false);
    setPoemFeedback(null);
    setAttemptsCount(0);
    setHintsUsedCount(0);
    setCollectedAnswers([]);
    completedSessionRef.current = false;
    setViewMode("poem");
    onReaction?.(
      "idle",
      `Mình cùng đọc bài thơ «${poem.title}» rồi trả lời 5 câu hỏi nhận Sticker nhé!`,
    );
  };

  const goToSlide = (nextSlideIndex: number) => {
    stop();
    setSlideIdx(nextSlideIndex);
    setGlowLineIdx(0);
    setSpeakingWholeSlide(false);
    setActiveWordHelp(null);
  };

  // Bấm vào bất kỳ chữ đơn nào -> đọc riêng chữ đó (hỗ trợ từ khó)
  const handleSpeakSingleWord = (rawWord: string, lineIdx: number) => {
    const clean = rawWord.replace(/[.,!?;:"'«»()[\]]/g, "").trim();
    if (!clean) return;
    setSpeakingWholeSlide(false);
    setGlowLineIdx(lineIdx);

    const matchedDifficult = difficultTokenMap.get(normalizeCleanWord(clean));
    if (matchedDifficult) {
      setActiveWordHelp({
        word: `${clean} (trong từ «${matchedDifficult.word}»)`,
        tip: matchedDifficult.tip,
      });
    } else {
      setActiveWordHelp({
        word: clean,
        tip: "Nấm nghe phát âm chữ này rồi đọc tiếp câu thơ nhé!",
      });
    }

    if (soundEnabled) {
      speak(clean, "vi-VN", { playbackRate: 0.88 });
    }
  };

  // Bấm vào chip "Từ khó" bên dưới -> đọc cụm từ khó + hiện giải nghĩa
  const handleSpeakDifficultPhrase = (item: PoemDifficultWord) => {
    setSpeakingWholeSlide(false);
    setActiveWordHelp({
      word: item.word,
      tip: item.tip,
    });
    if (soundEnabled) {
      speak(item.word, "vi-VN", { playbackRate: 0.88 });
    }
  };

  // Nút phụ: Nghe cô đọc mẫu cả dòng hoặc cả khổ khi cần kiểm tra
  const handleSpeakSlideCheck = () => {
    setSpeakingWholeSlide(true);
    if (soundEnabled) {
      speak(currentPoemLines.join(". "), "vi-VN", {
        onEnd: () => {
          setSpeakingWholeSlide(false);
        },
      });
    }
  };

  const handleNextSlideOrQuiz = () => {
    stop();
    setSpeakingWholeSlide(false);
    if (slideIdx + 1 < currentPoem.slides.length) {
      goToSlide(slideIdx + 1);
      onReaction?.(
        "happy",
        `Giỏi lắm! Mình đọc tiếp Khổ ${slideIdx + 2} nhé!`,
      );
      return;
    }

    // Sang chuỗi 5 câu hỏi cuối bài
    const drawnQuestions =
      activePoemQuestions.length >= 5
        ? activePoemQuestions
        : drawQuestionsForPoem(currentPoem, 5);
    setActivePoemQuestions(drawnQuestions);
    setupQuestion(drawnQuestions, 0);
    const firstQ = drawnQuestions[0];
    onReaction?.(
      "happy",
      `Nấm đọc hết bài thơ giỏi quá! Giờ mình trả lời ${drawnQuestions.length} câu hỏi nhỏ để nhận Sao & Sticker nhé!`,
    );
    if (soundEnabled && firstQ) {
      speak(firstQ.question, "vi-VN");
    }
  };

  const handlePickQuizChoice = (choiceIdx: number) => {
    if (poemStage === "correct") return;
    const picked = shuffledChoices[choiceIdx];
    if (!picked) return;

    playCardPlaceSound(choiceIdx);
    setSelectedChoiceIdx(choiceIdx);

    const nextAttempts = attemptsCount + 1;
    setAttemptsCount(nextAttempts);
    const nextAnswers = [
      ...collectedAnswers,
      `C${questionIdx + 1}: ${picked.text}`,
    ];
    setCollectedAnswers(nextAnswers);

    if (picked.isCorrect) {
      playRewardTone();
      setPoemStage("correct");
      setShowEvidencePeek(false);
      setPoemFeedback({
        type: "success",
        text: `🌟 ${currentQuestion.feedback}`,
      });
      onReaction?.("happy", currentQuestion.feedback);
      if (soundEnabled) {
        speak(currentQuestion.feedback, "vi-VN");
      }
    } else {
      setHintsUsedCount((h) => h + 1);
      setShowEvidencePeek(true);
      setPoemFeedback({
        type: "retry",
        text: `💡 ${currentQuestion.hint}`,
      });
      onReaction?.("sad", currentQuestion.hint);
      if (soundEnabled) {
        speak(currentQuestion.hint, "vi-VN");
      }
    }
  };

  const handleSubmitQuizAnswer = () => {
    if (selectedChoiceIdx === null) return;
    handlePickQuizChoice(selectedChoiceIdx);
  };

  const handleNextQuestion = () => {
    stop();
    const nextQIdx = questionIdx + 1;
    if (nextQIdx < activePoemQuestions.length) {
      setupQuestion(activePoemQuestions, nextQIdx);
      const nextQ = activePoemQuestions[nextQIdx];
      if (soundEnabled && nextQ) {
        speak(nextQ.question, "vi-VN");
      }
    } else if (!completedSessionRef.current) {
      completedSessionRef.current = true;
      onComplete({
        attempts: Math.max(1, attemptsCount),
        answers: collectedAnswers,
        activityId: currentPoem.id,
        skillIds: [
          "poem-self-reading",
          "poem-difficult-words",
          "poem-reading-comprehension",
          "poem-fill-blank",
          "poem-life-skill",
        ],
        hintsUsed: hintsUsedCount,
        independentResult: hintsUsedCount > 0 ? "assisted" : "passed",
        completionSource: "system-checked",
      });
    }
  };

  // Tự động chuyển sang câu hỏi tiếp theo (hoặc hoàn thành bài) sau ~1.6s khi Nấm chọn ĐÚNG
  useEffect(() => {
    if (viewMode !== "poem" || poemStage !== "correct") return;
    const timer = window.setTimeout(() => {
      handleNextQuestion();
    }, 1600);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode, poemStage, questionIdx]);

  const startFlashcardSet = (fcSet: PictureWordFlashcardSet) => {
    stop();
    const drawnCards = drawRandomFlashcardsForSet(
      fcSet.id,
      5,
      activeFlashcards.map((c) => c.id),
    );
    setActiveFlashcardSetId(fcSet.id);
    setActiveFlashcards(drawnCards);
    setRevealedCardIds([]);
    setFlashcardStage("cards");
    setFlashcardQuizWrongId(null);
    const quizPool = shuffleArray(drawnCards).slice(0, 5);
    setFlashcardQuizQueue(quizPool);
    setFlashcardQuizStep(0);
    setQuizTargetCard(quizPool[0] || drawnCards[0]);
    completedSessionRef.current = false;
    setViewMode("flashcards");
    onReaction?.(
      "happy",
      `Mỗi lần vào là 5 thẻ chữ mới tinh! Nấm lật mở 5 thẻ rồi trả lời 5 câu đố vui để nhận Sticker nhé!`,
    );
  };

  const handleRefreshFiveCards = () => {
    stop();
    playCardPlaceSound(2);
    const newCards = drawRandomFlashcardsForSet(
      currentFlashcardSet.id,
      5,
      activeFlashcards.map((c) => c.id),
    );
    setActiveFlashcards(newCards);
    setRevealedCardIds([]);
    setFlashcardStage("cards");
    setFlashcardQuizWrongId(null);
    const quizPool = shuffleArray(newCards).slice(0, 5);
    setFlashcardQuizQueue(quizPool);
    setFlashcardQuizStep(0);
    setQuizTargetCard(quizPool[0] || newCards[0]);
    completedSessionRef.current = false;
    onReaction?.(
      "happy",
      `✨ Đã đổi 5 thẻ chữ 3D mới tinh trong chủ đề «${currentFlashcardSet.title.replace(/^Thẻ Từ:\s*/i, "")}»! Nấm đọc thử xem nào!`,
    );
  };

  const handleTapFlashcard = (card: PictureWordCard) => {
    playCardPlaceSound(1);
    setRevealedCardIds((prev) =>
      prev.includes(card.id) ? prev : [...prev, card.id],
    );
    if (soundEnabled) {
      speak(card.spokenTip, "vi-VN", { playbackRate: 0.92 });
    }
    onReaction?.("happy", `🔊 «${card.word}» — ${card.spokenTip}`);
  };

  const handleStartFlashcardQuiz = () => {
    stop();
    const cardsToQuiz =
      activeFlashcards.length > 0
        ? activeFlashcards
        : currentFlashcardSet.cards;
    const quizQueue = shuffleArray(cardsToQuiz).slice(0, 5);
    const firstTarget = quizQueue[0] || cardsToQuiz[0];
    setFlashcardQuizQueue(quizQueue);
    setFlashcardQuizStep(0);
    setQuizTargetCard(firstTarget);
    setFlashcardQuizWrongId(null);
    setFlashcardStage("quiz");
    if (soundEnabled) {
      speak(`Câu 1 trên 5: Chữ ${firstTarget.word} là hình nào nhỉ?`, "vi-VN", {
        playbackRate: 0.92,
      });
    }
  };

  const handlePickFlashcardQuiz = (card: PictureWordCard) => {
    if (flashcardStage === "done") return;
    if (card.id === quizTargetCard.id) {
      playRewardTone();
      setFlashcardQuizWrongId(null);
      const nextStep = flashcardQuizStep + 1;
      if (nextStep < flashcardQuizQueue.length) {
        const nextTarget = flashcardQuizQueue[nextStep];
        setFlashcardQuizStep(nextStep);
        setQuizTargetCard(nextTarget);
        const stepMsg = `Đúng rồi «${card.word}»! Câu ${nextStep + 1}: Chữ «${nextTarget.word}» là hình nào nhỉ?`;
        onReaction?.("happy", stepMsg);
        if (soundEnabled) {
          speak(
            `Giỏi lắm! Câu tiếp theo: Chữ ${nextTarget.word} là hình nào nhỉ?`,
            "vi-VN",
            { playbackRate: 0.93 },
          );
        }
      } else {
        setFlashcardStage("done");
        const msg = `Giỏi quá! Nấm đã đọc đúng cả ${flashcardQuizQueue.length} thẻ chữ và nhớ mặt chữ siêu đỉnh!`;
        onReaction?.("happy", msg);
        if (soundEnabled) {
          speak(msg, "vi-VN", { playbackRate: 0.94 });
        }
        if (!completedSessionRef.current) {
          completedSessionRef.current = true;
          window.setTimeout(() => {
            onComplete({
              attempts: 1,
              answers: [`Đọc & Nhớ 5 Thẻ Chữ: ${currentFlashcardSet.title}`],
              activityId: currentFlashcardSet.id,
            });
          }, 1200);
        }
      }
    } else {
      playCardPlaceSound(0);
      setFlashcardQuizWrongId(card.id);
      const hint = `Hình này là «${card.word}». Nấm tìm hình của chữ «${quizTargetCard.word}» nhé!`;
      onReaction?.("sad", hint);
      if (soundEnabled) {
        speak(hint, "vi-VN", { playbackRate: 0.92 });
      }
    }
  };

  const evidenceStanzaLines =
    currentPoem.slides[currentQuestion.evidenceSlideIndex] ||
    currentPoem.slides[0];

  let wordRunningCursor = 0;

  return (
    <div className="wb-content reading-wb">
      {viewMode === "phonics" ? (
        <KittyPhonicsLessonModal
          soundEnabled={soundEnabled}
          speak={speak}
          stopSpeech={stop}
          onClose={() => setViewMode("menu")}
          onStartPractice={() => setViewMode("blend-quiz")}
          onReaction={onReaction}
          onClaimReward={(tableTitle) => {
            onComplete({
              attempts: 1,
              answers: [`Thuộc bảng vần ghép: ${tableTitle}`],
              activityId: `phonics-${tableTitle}`,
              skillIds: ["phonics-blending"],
            });
          }}
        />
      ) : viewMode === "blend-quiz" ? (
        <WordBlendQuizModal
          soundEnabled={soundEnabled}
          speak={speak}
          stopSpeech={stop}
          onClose={() => setViewMode("menu")}
          onReaction={onReaction}
          onCompleteRound={(answers, attempts) => {
            onComplete({
              attempts,
              answers,
              activityId: "blend-quiz-5q",
              skillIds: ["phonics-blending", "word-recognition"],
            });
          }}
        />
      ) : viewMode === "menu" ? (
        <div className="lesson-picker-screen">
          <div className="reading-level-header single-row-level-bar">
            <div className="reading-level-pills" style={{ width: "100%", justifyContent: "center" }}>
              <button
                type="button"
                className="level-switch-pill active-green"
                style={{
                  background: "linear-gradient(135deg, #FCE7F3 0%, #FDE68A 100%)",
                  borderColor: "#EC4899",
                  color: "#BE185D",
                  fontWeight: 900,
                }}
                onClick={() => {
                  stop();
                  setViewMode("phonics");
                }}
              >
                🎀 Bảng 132 Vần Ghép
              </button>
              <button
                type="button"
                className="level-switch-pill active-green"
                style={{
                  background: "linear-gradient(135deg, #DBEAFE 0%, #F3E8FF 100%)",
                  borderColor: "#2563EB",
                  color: "#1D4ED8",
                  fontWeight: 900,
                }}
                onClick={() => {
                  stop();
                  setViewMode("blend-quiz");
                }}
              >
                🧩 Ghép Chữ (5 Câu)
              </button>
              <button
                type="button"
                className={`level-switch-pill ${
                  menuTab === "flashcards" ? "active-pink" : ""
                }`}
                onClick={() => setMenuTab("flashcards")}
              >
                🃏 Thẻ Chữ
              </button>
              <button
                type="button"
                className={`level-switch-pill ${
                  menuTab === 1 ? "active-pink" : ""
                }`}
                onClick={() => {
                  setMenuTab(1);
                  setSelectedPoemLevel(1);
                }}
              >
                🌱 Thơ Ngắn
              </button>
              <button
                type="button"
                className={`level-switch-pill ${
                  menuTab === 2 ? "active-orange" : ""
                }`}
                onClick={() => {
                  setMenuTab(2);
                  setSelectedPoemLevel(2);
                }}
              >
                🌸 Thơ Dài
              </button>
            </div>
          </div>

          <div className="wb-lesson-list flashcard-menu-grid">
            {menuTab === "flashcards"
              ? PICTURE_WORD_FLASHCARD_SETS.map((fcSet, idx) => (
                  <button
                    key={fcSet.id}
                    type="button"
                    className="wb-lesson-row"
                    style={
                      { "--cluster-accent": fcSet.color } as React.CSSProperties
                    }
                    onClick={() => startFlashcardSet(fcSet)}
                  >
                    <span className="wb-row-icon">
                      <img
                        src={fcSet.heroImage}
                        alt={fcSet.title}
                        className="wb-row-icon-img"
                      />
                    </span>
                    <span className="wb-row-badge">
                      Chủ đề {idx + 1} • {fcSet.cardPool.length} từ
                    </span>
                    <strong className="wb-row-title">
                      {fcSet.title.replace(/^Thẻ Từ:\s*/i, "")}
                    </strong>
                    <span className="wb-row-go">▶</span>
                  </button>
                ))
              : filteredPoems.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    className="wb-lesson-row"
                    style={
                      { "--cluster-accent": item.color } as React.CSSProperties
                    }
                    onClick={() => startPoemLesson(item)}
                  >
                    <span className="wb-row-icon">
                      {item.heroImage ? (
                        <img
                          src={item.heroImage}
                          alt={item.title}
                          className="wb-row-icon-img"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = "none";
                            if (target.parentElement) {
                              target.parentElement.textContent = item.icon;
                            }
                          }}
                        />
                      ) : (
                        item.icon
                      )}
                    </span>
                    <span className="wb-row-badge">Bài {idx + 1}</span>
                    <strong className="wb-row-title">{item.title}</strong>
                    <span className="wb-row-go">▶</span>
                  </button>
                ))}
          </div>
        </div>
      ) : viewMode === "flashcards" ? (
        <div className="clean-lesson-stage">
          <div className="clean-lesson-header">
            <button
              type="button"
              className="chunky-btn chunky-pink btn-sm"
              onClick={() => {
                stop();
                setViewMode("menu");
              }}
            >
              <ArrowLeft size={14} /> Chọn chủ đề
            </button>

            <span className="clean-lesson-badge">
              {currentFlashcardSet.icon} {currentFlashcardSet.title} (Kho{" "}
              {currentFlashcardSet.cardPool.length} từ 3D)
            </span>

            <div style={{ display: "inline-flex", gap: "8px" }}>
              <button
                type="button"
                className="chunky-btn chunky-orange btn-sm"
                onClick={handleRefreshFiveCards}
                title="Đổi 5 thẻ chữ 3D mới tinh trong chủ đề này"
              >
                <RotateCcw size={14} /> Đổi 5 từ mới
              </button>

              <button
                type="button"
                className="chunky-btn chunky-blue btn-sm"
                onClick={() => {
                  if (flashcardStage === "cards") {
                    speak(
                      activeFlashcards.map((c) => c.word).join(". "),
                      "vi-VN",
                      { playbackRate: 0.9 },
                    );
                  } else {
                    speak(
                      `Chữ ${quizTargetCard.word} là hình nào nhỉ?`,
                      "vi-VN",
                      { playbackRate: 0.92 },
                    );
                  }
                }}
              >
                <Volume2 size={14} /> Nghe đọc
              </button>
            </div>
          </div>

          {flashcardStage === "cards" ? (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                  gap: "10px",
                  flex: 1,
                  minHeight: 0,
                  alignItems: "stretch",
                  padding: "4px 0",
                }}
              >
                {activeFlashcards.map((card, idx) => {
                  const isRevealed = revealedCardIds.includes(card.id);
                  const accent =
                    WORD_COLOR_PALETTE[idx % WORD_COLOR_PALETTE.length];
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => handleTapFlashcard(card)}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        background: isRevealed
                          ? "rgba(255, 251, 235, 0.9)"
                          : "rgba(255, 255, 255, 0.88)",
                        border: isRevealed
                          ? "2px solid #fbbf24"
                          : "1.5px solid rgba(244, 114, 182, 0.25)",
                        borderRadius: "20px",
                        padding: "10px 6px",
                        cursor: "pointer",
                        boxShadow: "0 4px 12px rgba(15, 23, 42, 0.05)",
                        transition: "transform 0.18s ease, background 0.18s ease",
                        minWidth: 0,
                      }}
                    >
                      {isRevealed ? (
                        <img
                          src={card.imageUrl}
                          alt={card.word}
                          style={{
                            width: "clamp(64px, 14.5vh, 104px)",
                            height: "clamp(64px, 14.5vh, 104px)",
                            objectFit: "contain",
                            filter:
                              "drop-shadow(0 6px 10px rgba(15,23,42,0.14))",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "clamp(56px, 12vh, 86px)",
                            height: "clamp(56px, 12vh, 86px)",
                            borderRadius: "50%",
                            background: "rgba(253, 242, 248, 0.85)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.5rem",
                          }}
                        >
                          👀
                        </div>
                      )}

                      <strong
                        style={{
                          fontSize: "clamp(1.1rem, 1.95vw, 1.5rem)",
                          color: accent,
                          letterSpacing: "0.02em",
                          fontWeight: 900,
                          textAlign: "center",
                          lineHeight: 1.18,
                          wordBreak: "break-word",
                        }}
                      >
                        {card.word}
                      </strong>

                      {isRevealed && card.englishName && (
                        <span
                          style={{
                            fontSize: "0.72rem",
                            fontWeight: 800,
                            color: "#0284c7",
                            background: "rgba(224, 242, 254, 0.75)",
                            padding: "2px 8px",
                            borderRadius: "999px",
                            maxWidth: "100%",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {card.icon} {card.englishName}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="wb-actions-row">
                <span
                  style={{
                    fontSize: "0.84rem",
                    fontWeight: 700,
                    color: "#64748b",
                  }}
                >
                  💡 Chạm vào thẻ chữ để lật mở hình 3D và nghe phát âm
                </span>

                <button
                  type="button"
                  className="chunky-btn chunky-green btn-sm spotlight-main-btn"
                  style={{ marginLeft: "auto" }}
                  onClick={handleStartFlashcardQuiz}
                >
                  <Sparkles size={16} /> Đố vui 5 câu Nhận Sao ▶
                </button>
              </div>
            </>
          ) : (
            <div
              className="wb-quiz-box"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flex: 1,
                minHeight: 0,
              }}
            >
              <div style={{ textAlign: "center" }}>
                <span
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 800,
                    color: "#7c3aed",
                  }}
                >
                  🎯 Câu {flashcardQuizStep + 1}/
                  {Math.max(1, flashcardQuizQueue.length)} — Đố Nấm đọc chữ và
                  chạm đúng hình 3D:
                </span>
                <div
                  style={{
                    fontSize: "clamp(1.5rem, 3.2vw, 2.2rem)",
                    fontWeight: 900,
                    color: "#e11d48",
                    margin: "2px 0",
                    letterSpacing: "0.04em",
                  }}
                >
                  « {quizTargetCard.word} »
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                  gap: "10px",
                  flex: 1,
                  minHeight: 0,
                  alignItems: "stretch",
                  margin: "6px 0",
                }}
              >
                {activeFlashcards.map((card) => {
                  const isRight =
                    flashcardStage === "done" && card.id === quizTargetCard.id;
                  const isWrong = flashcardQuizWrongId === card.id;
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => handlePickFlashcardQuiz(card)}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        background: isRight
                          ? "#dcfce7"
                          : isWrong
                            ? "#fee2e2"
                            : "#ffffff",
                        border: isRight
                          ? "3px solid #22c55e"
                          : isWrong
                            ? "3px solid #ef4444"
                            : "3px solid #e2e8f0",
                        borderRadius: "18px",
                        padding: "8px 6px",
                        cursor: "pointer",
                        minWidth: 0,
                      }}
                    >
                      <img
                        src={card.imageUrl}
                        alt={card.word}
                        style={{
                          width: "clamp(60px, 14vh, 102px)",
                          height: "clamp(60px, 14vh, 102px)",
                          objectFit: "contain",
                          filter:
                            "drop-shadow(0 6px 10px rgba(15,23,42,0.15))",
                        }}
                      />
                      {isRight && (
                        <strong
                          style={{
                            color: "#15803d",
                            fontSize: "0.82rem",
                            textAlign: "center",
                          }}
                        >
                          🌟 Đúng: {card.word}!
                        </strong>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="wb-actions-row">
                <button
                  type="button"
                  className="chunky-btn chunky-orange btn-sm"
                  onClick={() => setFlashcardStage("cards")}
                >
                  <RotateCcw size={14} /> Xem lại 5 thẻ chữ
                </button>

                {flashcardStage === "done" && (
                  <div
                    style={{
                      marginLeft: "auto",
                      display: "inline-flex",
                      gap: "8px",
                    }}
                  >
                    <button
                      type="button"
                      className="chunky-btn chunky-blue btn-sm"
                      onClick={handleRefreshFiveCards}
                    >
                      <RotateCcw size={14} /> Đổi 5 từ mới học tiếp 🔄
                    </button>
                    <button
                      type="button"
                      className="chunky-btn chunky-green btn-sm"
                      onClick={() => setViewMode("menu")}
                    >
                      <Check size={16} /> Chọn chủ đề khác 🌟
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="clean-lesson-stage">
          <div className="clean-lesson-header">
            <span
              className="clean-lesson-badge"
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              {currentPoem.heroImage ? (
                <img
                  src={currentPoem.heroImage}
                  alt={currentPoem.title}
                  style={{
                    width: 28,
                    height: 28,
                    objectFit: "contain",
                    filter: "drop-shadow(0 2px 4px rgba(15, 23, 42, 0.15))",
                  }}
                />
              ) : (
                currentPoem.icon
              )}{" "}
              {currentPoem.title}
              {poemStage === "reading"
                ? ` · Khổ ${slideIdx + 1}/${currentPoem.slides.length}`
                : ` · ${currentQuestion.badgeLabel}`}
            </span>

            {poemStage === "reading" ? (
              <div className="music-slide-right-tools">
                <button
                  type="button"
                  className={`pace-toggle-pill ${autoPaceRunning ? "running" : "paused"}`}
                  onClick={() => setAutoPaceRunning((prev) => !prev)}
                  title="Bật/tắt tự động chuyển viền sáng theo nhịp đọc"
                >
                  {autoPaceRunning ? <Pause size={13} /> : <Play size={13} />}
                  {autoPaceRunning
                    ? `Nhịp sáng: Câu ${glowLineIdx + 1}/${currentPoemLines.length}`
                    : "Đã giữ viền câu"}
                </button>

                {currentPoem.slides.length > 1 && (
                  <div className="music-slide-dots">
                    {currentPoem.slides.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`music-slide-dot ${
                          idx === slideIdx ? "active" : ""
                        }`}
                        onClick={() => goToSlide(idx)}
                        title={`Khổ ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="quiz-step-pills">
                {activePoemQuestions.map((q, idx) => (
                  <span
                    key={q.id}
                    className={`quiz-step-pill ${
                      idx === questionIdx
                        ? "active"
                        : idx < questionIdx
                          ? "done"
                          : ""
                    }`}
                  >
                    {idx < questionIdx ? "✓ " : ""}Câu {idx + 1}/
                    {activePoemQuestions.length}
                  </span>
                ))}
              </div>
            )}
          </div>

          {poemStage === "reading" ? (
            <>
              <div className="wb-poem-box colorful-poem-box open-book-poem-canvas">
                {poemWordsPerLine.map((words: string[], lineIdx: number) => {
                  const isGlowActive = glowLineIdx === lineIdx;

                  return (
                    <div
                      key={lineIdx}
                      className={`wb-poem-line colorful-line-row ${
                        isGlowActive ? "line-glow-active" : ""
                      }`}
                      onMouseEnter={() => {
                        setIsHoveringLine(true);
                        setGlowLineIdx(lineIdx);
                      }}
                      onMouseLeave={() => {
                        setIsHoveringLine(false);
                      }}
                      onClick={() => setGlowLineIdx(lineIdx)}
                    >
                      <span className="colorful-line-words">
                        {words.map((word: string, wIdx: number) => {
                          const globalIdx = wordRunningCursor++;
                          const isWordActive =
                            speaking &&
                            speakingWholeSlide &&
                            globalIdx === activeGlobalWordIdx;
                          const isDifficultToken = difficultTokenMap.has(
                            normalizeCleanWord(word),
                          );

                          return (
                            <button
                              key={`${lineIdx}-${wIdx}-${word}`}
                              type="button"
                              className={`wb-word decorated-poem-word ${
                                isDifficultToken ? "difficult-word-badge" : ""
                              } ${isWordActive ? "active" : ""}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSpeakSingleWord(word, lineIdx);
                              }}
                              title="Chạm vào chữ để nghe phát âm"
                            >
                              {word}
                            </button>
                          );
                        })}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Dòng giải nghĩa từ khó gọn nhẹ không viền (chỉ hiện nhẹ nhàng dưới khổ thơ) */}
              <div className="difficult-words-support-bar">
                {activeWordHelp ? (
                  <div className="difficult-word-tip-box">
                    <strong>🔊 «{activeWordHelp.word}»:</strong>{" "}
                    <span>{activeWordHelp.tip}</span>
                  </div>
                ) : (
                  <div className="difficult-words-pills-group">
                    <span className="difficult-bar-label">
                      <HelpCircle size={13} /> Chạm chữ bất kỳ để nghe · Từ khó:
                    </span>
                    {currentDifficultWords.map((item) => (
                      <button
                        key={item.word}
                        type="button"
                        className="difficult-word-chip"
                        onClick={() => handleSpeakDifficultPhrase(item)}
                      >
                        <Volume2 size={12} /> {item.word}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="wb-actions-row">
                <button
                  type="button"
                  className="chunky-btn chunky-pink btn-sm"
                  onClick={() => {
                    stop();
                    setViewMode("menu");
                  }}
                >
                  <ArrowLeft size={15} /> Bài đọc khác
                </button>

                <button
                  type="button"
                  className="chunky-btn chunky-blue btn-sm"
                  onClick={handleSpeakSlideCheck}
                  title="Nghe cô đọc mẫu kiểm tra khổ thơ này"
                >
                  <Volume2 size={16} />
                  {speaking && speakingWholeSlide
                    ? "Cô đang đọc..."
                    : "Nghe cô đọc kiểm tra"}
                </button>

                <button
                  type="button"
                  className="chunky-btn chunky-orange btn-sm"
                  onClick={() => {
                    const nextPoem = drawRandomPoemByLevel(
                      currentPoem.level,
                      currentPoem.id,
                    );
                    startPoemLesson(nextPoem);
                  }}
                  title="Đổi sang 1 bài thơ mới chưa đọc"
                >
                  <RotateCcw size={15} /> Đổi bài thơ mới
                </button>

                {slideIdx > 0 && (
                  <button
                    type="button"
                    className="chunky-btn chunky-orange btn-sm"
                    onClick={() => goToSlide(slideIdx - 1)}
                  >
                    ◀ Khổ {slideIdx}
                  </button>
                )}

                <button
                  type="button"
                  className="chunky-btn chunky-green btn-sm spotlight-main-btn"
                  onClick={handleNextSlideOrQuiz}
                >
                  <Sparkles size={16} />{" "}
                  {slideIdx + 1 < currentPoem.slides.length
                    ? `Sang Khổ ${slideIdx + 2}/${currentPoem.slides.length} ▶`
                    : `Vào trả lời ${activePoemQuestions.length} câu hỏi 🎯`}
                </button>
              </div>
            </>
          ) : (
            <div className="wb-quiz-box">
              <div className="quiz-question-top-row">
                <h3 className="wb-quiz-question">
                  <Sparkles size={20} color="#F59E0B" />
                  <span>{currentQuestion.question}</span>
                </h3>
                <button
                  type="button"
                  className="peek-stanza-toggle-btn"
                  onClick={() => {
                    const nextPeek = !showEvidencePeek;
                    setShowEvidencePeek(nextPeek);
                    if (nextPeek) {
                      setHintsUsedCount((h) => h + 1);
                      const targetLine =
                        evidenceStanzaLines[
                          currentQuestion.evidenceLineIndex
                        ] || "";
                      if (soundEnabled && targetLine) {
                        speak(targetLine, "vi-VN");
                      }
                    }
                  }}
                >
                  <BookOpen size={15} />
                  {showEvidencePeek
                    ? `Ẩn Khổ ${currentQuestion.evidenceSlideIndex + 1}`
                    : `Mở xem Khổ ${currentQuestion.evidenceSlideIndex + 1}`}
                </button>
              </div>

              {/* Nếu là Câu 2/3 Điền từ khuyết: hiển thị câu thơ có ô trống [ ___ ] */}
              {currentQuestion.blankLinePreview && (
                <div className="fill-blank-poem-preview">
                  <span className="fill-blank-quote-icon">📜</span>
                  <strong className="fill-blank-text">
                    {poemStage === "correct" && selectedChoiceIdx !== null
                      ? currentQuestion.blankLinePreview.replace(
                          "[ ___ ]",
                          `«${shuffledChoices[selectedChoiceIdx]?.text || ""}»`,
                        )
                      : currentQuestion.blankLinePreview}
                  </strong>
                </div>
              )}

              {/* Hộp trích dẫn đúng khổ thơ chứa đáp án ngay trên màn hình câu hỏi */}
              {showEvidencePeek && (
                <div className="inline-evidence-stanza-box">
                  <div className="inline-evidence-header">
                    <strong>
                      📖 Trích Khổ {currentQuestion.evidenceSlideIndex + 1} của
                      bài thơ (dòng màu vàng có đáp án):
                    </strong>
                    <button
                      type="button"
                      className="inline-evidence-speak-btn"
                      onClick={() => {
                        const targetLine =
                          evidenceStanzaLines[
                            currentQuestion.evidenceLineIndex
                          ] || evidenceStanzaLines.join(". ");
                        speak(targetLine, "vi-VN");
                      }}
                    >
                      <Volume2 size={14} /> Nghe câu thơ gợi ý
                    </button>
                  </div>
                  <div className="inline-evidence-lines">
                    {evidenceStanzaLines.map((line, lIdx) => {
                      const isEvidenceLine =
                        lIdx === currentQuestion.evidenceLineIndex;
                      return (
                        <div
                          key={lIdx}
                          className={`inline-evidence-line ${
                            isEvidenceLine ? "evidence-highlight" : ""
                          }`}
                          onClick={() => speak(line, "vi-VN")}
                        >
                          {isEvidenceLine ? "⭐ " : ""}
                          {line}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="wb-choices-row">
                {shuffledChoices.map((choice, idx) => {
                  const isPicked = selectedChoiceIdx === idx;
                  const showState =
                    poemStage === "correct" && isPicked
                      ? "correct"
                      : isPicked
                        ? "selected-pending"
                        : "";
                  return (
                    <button
                      key={choice.text}
                      type="button"
                      className={`chunky-choice-btn ${showState}`}
                      onClick={() => handlePickQuizChoice(idx)}
                    >
                      {choice.text}
                    </button>
                  );
                })}
              </div>

              {poemFeedback && (
                <div className={`focus-feedback-banner ${poemFeedback.type}`}>
                  {poemFeedback.text}
                </div>
              )}

              <div className="wb-actions-row">
                <button
                  type="button"
                  className="chunky-btn chunky-pink btn-sm"
                  onClick={() => {
                    stop();
                    setViewMode("menu");
                  }}
                >
                  <ArrowLeft size={14} /> Bài đọc khác
                </button>
                <button
                  type="button"
                  className="chunky-btn chunky-orange btn-sm"
                  onClick={() => {
                    stop();
                    setPoemStage("reading");
                    goToSlide(currentQuestion.evidenceSlideIndex);
                  }}
                >
                  <RotateCcw size={14} /> Đọc lại Khổ{" "}
                  {currentQuestion.evidenceSlideIndex + 1}
                </button>

                {poemStage !== "correct" ? (
                  <button
                    type="button"
                    className="chunky-btn chunky-green btn-sm"
                    disabled={selectedChoiceIdx === null}
                    onClick={handleSubmitQuizAnswer}
                  >
                    <Check size={16} /> Con chọn xong ✅
                  </button>
                ) : questionIdx + 1 < activePoemQuestions.length ? (
                  <button
                    type="button"
                    className="chunky-btn chunky-green btn-sm"
                    onClick={handleNextQuestion}
                  >
                    <Sparkles size={16} /> Sang Câu {questionIdx + 2}/
                    {activePoemQuestions.length} ▶
                  </button>
                ) : (
                  <button
                    type="button"
                    className="chunky-btn chunky-green btn-sm"
                    onClick={() => {
                      const nextPoem = drawRandomPoemByLevel(
                        currentPoem.level,
                        currentPoem.id,
                      );
                      startPoemLesson(nextPoem);
                    }}
                  >
                    <Check size={16} /> Đọc tiếp Bài Thơ Mới 🌟
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
