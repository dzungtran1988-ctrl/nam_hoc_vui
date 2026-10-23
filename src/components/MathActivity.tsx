import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Lightbulb,
  Minus,
  Plus,
  RefreshCw,
  RotateCcw,
  Star,
  Volume2,
} from "lucide-react";
import {
  KAWAII_ITEM_IMAGES,
  KAWAII_PASTRY_CATALOG,
  MATH_MINI_GAMES,
  buildArithmeticTable,
  formatMathForSpeech,
  generateBakeryOrders,
  generateCoinMarketRounds,
  generateHiddenTableIndices,
  generatePizzaRounds,
  type ComparisonSign,
  type MathDifficultyLevel,
  type MathMiniGameId,
  type TableOperation,
} from "../data/mathLessons";
import { useSpeech } from "../hooks/useSpeech";
import {
  playAttentionChime,
  playCardPlaceSound,
  playRewardTone,
} from "../lib/sound";
import type { ActivityProps } from "../types";

export function MathActivity({
  soundEnabled,
  onComplete,
  onReaction,
  onLessonIndexChange,
}: ActivityProps) {
  const [viewMode, setViewMode] = useState<"menu" | "game">("menu");
  const [activeGameId, setActiveGameId] =
    useState<MathMiniGameId>("melody-bakery");
  const [level, setLevel] = useState<MathDifficultyLevel>(1);
  const [roundIdx, setRoundIdx] = useState(0);
  const [seedOffset, setSeedOffset] = useState(1);

  // Trạng thái chung
  const [feedbackState, setFeedbackState] = useState<
    "idle" | "correct" | "wrong"
  >("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [attemptsCount, setAttemptsCount] = useState(0);
  const [hintsUsedCount, setHintsUsedCount] = useState(0);
  const completedRef = useRef(false);

  // ---------------------------------------------------------------------------
  // STATE MINI-GAME 1: TIỆM TẠP HÓA ĐẾM & TÍNH (XÁO TRỘN TỪ 91 MÓN KAWAII)
  // ---------------------------------------------------------------------------
  const activeCatalog = KAWAII_PASTRY_CATALOG;
  const bakeryOrders = useMemo(
    () => generateBakeryOrders(level, seedOffset, "all").slice(0, 3),
    [level, seedOffset],
  );
  const currentBakeryOrder =
    bakeryOrders[roundIdx % bakeryOrders.length] || bakeryOrders[0];
  const [trayCountA, setTrayCountA] = useState(
    currentBakeryOrder.initialCountA,
  );
  const [trayCountB, setTrayCountB] = useState(
    currentBakeryOrder.initialCountB || 0,
  );
  const [selectedBakeryNumber, setSelectedBakeryNumber] = useState<
    number | null
  >(null);
  const [selectedBakeryNumberB, setSelectedBakeryNumberB] = useState<
    number | null
  >(null);
  const [activeMissingSlot, setActiveMissingSlot] = useState<"A" | "B">("A");
  const [countedItemIndices, setCountedItemIndices] = useState<number[]>([]);

  // ---------------------------------------------------------------------------
  // STATE MINI-GAME 2: BÀN TIỆC SO SÁNH (<, >, =) & CÂN BẰNG 2 ĐĨA
  // ---------------------------------------------------------------------------
  const pizzaRounds = useMemo(
    () => generatePizzaRounds(level, seedOffset).slice(0, 3),
    [level, seedOffset],
  );
  const currentPizzaRound =
    pizzaRounds[roundIdx % pizzaRounds.length] || pizzaRounds[0];
  const [selectedComparisonSign, setSelectedComparisonSign] =
    useState<ComparisonSign | null>(null);
  const [rightPlateCount, setRightPlateCount] = useState<number>(
    currentPizzaRound.initialRightCount,
  );

  // ---------------------------------------------------------------------------
  // STATE MINI-GAME 3: BẢNG CỬU CHƯƠNG & PHÉP TÍNH (+ - × ÷ TỪ 1 ĐẾN 9)
  // ---------------------------------------------------------------------------
  const [tableOp, setTableOp] = useState<TableOperation>("mul");
  const [tableBase, setTableBase] = useState<number>(2);
  const [selectedRowIdx, setSelectedRowIdx] = useState<number>(1);
  const [solvedTableRows, setSolvedTableRows] = useState<number[]>([]);
  const [wrongGuessChoice, setWrongGuessChoice] = useState<number | null>(null);

  // ---------------------------------------------------------------------------
  // STATE MINI-GAME 4: SIÊU THỊ XU VÀNG (TÍNH TIỀN & THỐI TIỀN THỪA)
  // ---------------------------------------------------------------------------
  const coinRounds = useMemo(
    () => generateCoinMarketRounds(level, seedOffset, "all").slice(0, 3),
    [level, seedOffset],
  );
  const currentCoinRound =
    coinRounds[roundIdx % coinRounds.length] || coinRounds[0];
  const [placedCoins, setPlacedCoins] = useState<number[]>([]);

  const { speak: rawSpeak, prefetch: rawPrefetch, stop, speaking } = useSpeech(soundEnabled);

  // Chuẩn hóa mọi dấu toán học (+, −, -, ×, ÷, =, <, >, ?) sang từ Tiếng Việt trước khi đọc
  const speak = (
    text: string,
    lang = "vi-VN",
    options?: { playbackRate?: number },
  ) => {
    rawSpeak(formatMathForSpeech(text), lang, options);
  };

  const currentGameMeta =
    MATH_MINI_GAMES.find((g) => g.id === activeGameId) || MATH_MINI_GAMES[0];

  // Cố định 1 khung bảng duy nhất suốt 1 bài học Toán (chỉ đổi khi chuyển sang bài Toán khác hẳn)
  useEffect(() => {
    if (viewMode === "menu") {
      onLessonIndexChange?.(0);
      return;
    }
    const gameIdx = MATH_MINI_GAMES.findIndex((g) => g.id === activeGameId);
    onLessonIndexChange?.(gameIdx >= 0 ? gameIdx : 0);
  }, [viewMode, activeGameId]);

  // Khởi tạo lại trạng thái bàn chơi mỗi khi đổi Mini-game / Cấp độ / Đổi đề / Câu
  useEffect(() => {
    setFeedbackState("idle");
    setFeedbackMessage("");
    completedRef.current = false;
    stop();

    if (viewMode === "menu") {
      return;
    }

    if (activeGameId === "melody-bakery") {
      const ord = bakeryOrders[roundIdx % bakeryOrders.length] || bakeryOrders[0];
      setTrayCountA(ord.mode === "single" ? ord.targetCountA : ord.initialCountA);
      setTrayCountB(ord.initialCountB || 0);
      setSelectedBakeryNumber(null);
      setSelectedBakeryNumberB(null);
      setActiveMissingSlot("A");
      setCountedItemIndices([]);
    } else if (activeGameId === "pizza-party") {
      const pRound = pizzaRounds[roundIdx % pizzaRounds.length] || pizzaRounds[0];
      setSelectedComparisonSign(null);
      setRightPlateCount(pRound.initialRightCount);
      if (soundEnabled && pRound?.prompt) {
        void rawPrefetch(formatMathForSpeech(pRound.prompt), "vi-VN");
      }
    } else if (activeGameId === "arithmetic-tables") {
      setSolvedTableRows([]);
      setSelectedRowIdx(1);
      setWrongGuessChoice(null);
      if (soundEnabled) {
        const rows = buildArithmeticTable(tableOp, tableBase);
        for (const r of rows.slice(0, 4)) {
          void rawPrefetch(formatMathForSpeech(r.spokenFull), "vi-VN");
        }
      }
    } else if (activeGameId === "coin-market") {
      setPlacedCoins([]);
      const cRound = coinRounds[roundIdx % coinRounds.length] || coinRounds[0];
      if (soundEnabled && cRound?.prompt) {
        void rawPrefetch(formatMathForSpeech(cRound.prompt), "vi-VN");
      }
    }
  }, [viewMode, activeGameId, level, roundIdx, seedOffset, tableOp, tableBase, bakeryOrders, pizzaRounds, coinRounds, soundEnabled, rawPrefetch]);

  useEffect(() => {
    return () => stop();
  }, []);

  // Phát âm thanh hướng dẫn của màn hiện tại khi bấm nút Loa
  const handleSpeakCurrentInstruction = () => {
    if (speaking) {
      stop();
      return;
    }
    if (activeGameId === "melody-bakery") {
      const ord = currentBakeryOrder;
      const itemName = ord.pastryA.name.toLowerCase();
      if (ord.mode === "single") {
        const y = ord.missingOperand ?? Math.abs(ord.targetCountA - ord.initialCountA);
        const riddle =
          ord.operator === "+"
            ? `Đố Nấm: Kitty có ${ord.initialCountA} ${itemName}, thêm ${y} cái nữa là mấy? Nấm chạm từng hình trong rổ để đếm nhé!`
            : `Đố Nấm: Có ${ord.initialCountA} ${itemName}, ăn bớt ${y} cái còn lại mấy? Nấm chạm từng hình để đếm nhé!`;
        speak(riddle, "vi-VN", { playbackRate: 0.92 });
      } else if (ord.mode === "equation") {
        const opWord = ord.operator === "+" ? "thêm mấy" : "bớt mấy";
        speak(
          `Đố Nấm: Đang có ${ord.initialCountA} ${itemName}, cần ${opWord} để được ${ord.targetCountA}?`,
          "vi-VN",
          { playbackRate: 0.92 },
        );
      } else {
        const expectedTotal =
          ord.totalTargetCount ?? ord.targetCountA + (ord.targetCountB || 0);
        speak(
          `Đố Nấm: Mấy cộng mấy bằng ${expectedTotal}? Nấm chọn 2 số ở dưới nhé!`,
          "vi-VN",
          { playbackRate: 0.92 },
        );
      }
    } else if (activeGameId === "pizza-party") {
      speak(currentPizzaRound.prompt, "vi-VN", { playbackRate: 0.92 });
    } else if (activeGameId === "arithmetic-tables") {
      const rows = buildArithmeticTable(tableOp, tableBase);
      const r = rows[selectedRowIdx - 1] || rows[0];
      const isRowLocked =
        hiddenRowIndices.includes(r.index) && !solvedTableRows.includes(r.index);
      speak(
        isRowLocked
          ? `${r.spokenQuestion} Nấm chạm chọn hộp quà có đáp án đúng nhé!`
          : r.spokenFull,
        "vi-VN",
        { playbackRate: 0.92 },
      );
    } else if (activeGameId === "coin-market") {
      speak(currentCoinRound.prompt, "vi-VN", { playbackRate: 0.92 });
    }
  };

  // ===========================================================================
  // XỬ LÝ MINI-GAME 1: TIỆM TẠP HÓA ĐẾM & TÍNH
  // - Cấp 1 (single):   x + y = ?  (và x − y = ?)
  // - Cấp 2 (equation): x + ? = y  (và x − ? = y)
  // - Cấp 3 (dual):     ? + ? = x
  // ===========================================================================
  const handleSelectBakeryNumber = (num: number) => {
    if (feedbackState === "correct") return;
    setFeedbackState("idle");

    const ord = currentBakeryOrder;

    // Cấp 1: x + y = ?  hoặc  x − y = ? -> Chạm 1 phát chấm điểm luôn!
    if (ord.mode === "single") {
      setSelectedBakeryNumber(num);
      setAttemptsCount((c) => c + 1);
      const y =
        ord.missingOperand ?? Math.abs(ord.targetCountA - ord.initialCountA);
      const opSymbol =
        ord.operator || (ord.targetCountA >= ord.initialCountA ? "+" : "−");

      if (num === ord.targetCountA) {
        setFeedbackState("correct");
        const formulaSummary = `Giỏi quá! ${ord.initialCountA} ${opSymbol} ${y} = ${ord.targetCountA}! Nấm tính chuẩn luôn!`;
        setFeedbackMessage(formulaSummary);
        if (soundEnabled) {
          playRewardTone();
          speak(formulaSummary, "vi-VN", { playbackRate: 0.94 });
        }
        onReaction?.("happy", formulaSummary);
      } else {
        setFeedbackState("wrong");
        setHintsUsedCount((h) => h + 1);
        const hintMsg =
          opSymbol === "+"
            ? `Gần đúng rồi! Nhóm 1 có ${ord.initialCountA} chiếc, gộp thêm nhóm 2 có ${y} chiếc là ${ord.targetCountA} chiếc (${ord.initialCountA} + ${y} = ${ord.targetCountA}). Nấm chọn số ${ord.targetCountA} nhé!`
            : `Gần đúng rồi! Có ${ord.initialCountA} chiếc, bớt đi ${y} chiếc còn lại ${ord.targetCountA} chiếc (${ord.initialCountA} − ${y} = ${ord.targetCountA}). Nấm chọn số ${ord.targetCountA} nhé!`;
        setFeedbackMessage(hintMsg);
        if (soundEnabled) {
          playAttentionChime();
          speak(hintMsg, "vi-VN", { playbackRate: 0.92 });
        }
        onReaction?.("sad", hintMsg);
      }
      return;
    }

    // Cấp 2: x + ? = y  hoặc  x − ? = y
    if (ord.mode === "equation") {
      setSelectedBakeryNumber(num);
      const nextCount =
        ord.operator === "+"
          ? ord.initialCountA + num
          : Math.max(0, ord.initialCountA - num);
      setTrayCountA(nextCount);
      if (soundEnabled) {
        playCardPlaceSound(num);
        const opWord = ord.operator === "+" ? "cộng" : "trừ";
        speak(
          `${ord.initialCountA} ${opWord} ${num} bằng ${nextCount}`,
          "vi-VN",
          { playbackRate: 0.96 },
        );
      }
      return;
    }

    // Cấp 3: ? + ? = x (Chọn 2 con số cho 2 ô dấu chấm hỏi)
    if (activeMissingSlot === "A") {
      setSelectedBakeryNumber(num);
      setTrayCountA(num);
      setActiveMissingSlot("B");
      if (soundEnabled) {
        playCardPlaceSound(num);
        const bVal = selectedBakeryNumberB;
        if (bVal !== null) {
          speak(`${num} cộng ${bVal} bằng ${num + bVal}`, "vi-VN", {
            playbackRate: 0.96,
          });
        } else {
          speak(`Số thứ nhất là ${num}. Giờ chọn số thứ hai nhé!`, "vi-VN", {
            playbackRate: 0.96,
          });
        }
      }
    } else {
      setSelectedBakeryNumberB(num);
      setTrayCountB(num);
      setActiveMissingSlot("A");
      if (soundEnabled) {
        playCardPlaceSound(num);
        const aVal = selectedBakeryNumber;
        if (aVal !== null) {
          speak(`${aVal} cộng ${num} bằng ${aVal + num}`, "vi-VN", {
            playbackRate: 0.96,
          });
        } else {
          speak(`Số thứ hai là ${num}`, "vi-VN", { playbackRate: 0.96 });
        }
      }
    }
  };

  // Cho phép Nấm bấm (+ Thêm 1 / - Bớt 1) trực tiếp trên rổ ở Cấp 2 & Cấp 3 để đếm thêm từng món
  const handleStepBasketItem = (delta: 1 | -1) => {
    if (feedbackState === "correct") return;
    setFeedbackState("idle");
    const ord = currentBakeryOrder;

    if (ord.mode === "equation") {
      const currentMissing = selectedBakeryNumber ?? 0;
      const nextMissing = Math.max(1, Math.min(10, currentMissing + delta));
      setSelectedBakeryNumber(nextMissing);
      const nextCount =
        ord.operator === "+"
          ? ord.initialCountA + nextMissing
          : Math.max(0, ord.initialCountA - nextMissing);
      setTrayCountA(nextCount);
      if (soundEnabled) {
        playCardPlaceSound(nextMissing);
        speak(`${nextMissing}`, "vi-VN", { playbackRate: 0.98 });
      }
      return;
    }

    if (ord.mode === "dual") {
      if (activeMissingSlot === "A") {
        const curA = selectedBakeryNumber ?? 0;
        const nextA = Math.max(1, Math.min(10, curA + delta));
        setSelectedBakeryNumber(nextA);
        setTrayCountA(nextA);
        if (soundEnabled) {
          playCardPlaceSound(nextA);
          speak(`${nextA}`, "vi-VN", { playbackRate: 0.98 });
        }
      } else {
        const curB = selectedBakeryNumberB ?? 0;
        const nextB = Math.max(1, Math.min(10, curB + delta));
        setSelectedBakeryNumberB(nextB);
        setTrayCountB(nextB);
        if (soundEnabled) {
          playCardPlaceSound(nextB);
          speak(`${nextB}`, "vi-VN", { playbackRate: 0.98 });
        }
      }
    }
  };

  const checkBakeryOrder = () => {
    setAttemptsCount((c) => c + 1);
    const ord = currentBakeryOrder;

    // CẤP 1: Giải phép tính tìm kết quả x + y = ? (hoặc x − y = ?)
    if (ord.mode === "single") {
      const y =
        ord.missingOperand ?? Math.abs(ord.targetCountA - ord.initialCountA);
      const opSymbol = ord.operator || (ord.targetCountA >= ord.initialCountA ? "+" : "−");
      if (selectedBakeryNumber === ord.targetCountA) {
        setFeedbackState("correct");
        const formulaSummary = `Giỏi quá! ${ord.initialCountA} ${opSymbol} ${y} = ${ord.targetCountA}! Nấm tính chuẩn luôn!`;
        setFeedbackMessage(formulaSummary);
        if (soundEnabled) {
          playRewardTone();
          speak(formulaSummary, "vi-VN", { playbackRate: 0.94 });
        }
        onReaction?.("happy", formulaSummary);
      } else {
        setFeedbackState("wrong");
        setHintsUsedCount((h) => h + 1);
        const hintMsg =
          selectedBakeryNumber === null
            ? `Nấm hãy chạm chọn một con số từ 1 đến 10 ở khay dưới để điền kết quả cho ${ord.initialCountA} ${opSymbol} ${y} = ? nhé!`
            : opSymbol === "+"
              ? `Có ${ord.initialCountA} chiếc, thêm ${y} chiếc nữa là ${ord.targetCountA} chiếc (${ord.initialCountA} + ${y} = ${ord.targetCountA}). Nấm chọn số ${ord.targetCountA} ở dưới nhé!`
              : `Có ${ord.initialCountA} chiếc, bớt đi ${y} chiếc còn lại ${ord.targetCountA} chiếc (${ord.initialCountA} − ${y} = ${ord.targetCountA}). Nấm chọn số ${ord.targetCountA} ở dưới nhé!`;
        setFeedbackMessage(hintMsg);
        if (soundEnabled) {
          playAttentionChime();
          speak(hintMsg, "vi-VN", { playbackRate: 0.92 });
        }
        onReaction?.("sad", hintMsg);
      }
      return;
    }

    // CẤP 2: Giải phép tính khuyết số ở giữa x + ? = y (hoặc x − ? = y)
    if (ord.mode === "equation") {
      const expectedMissing =
        ord.missingOperand ?? Math.abs(ord.targetCountA - ord.initialCountA);
      if (selectedBakeryNumber === expectedMissing) {
        setFeedbackState("correct");
        const opWord = ord.operator === "+" ? "+" : "−";
        const formulaSummary = `Giỏi quá! ${ord.initialCountA} ${opWord} ${expectedMissing} = ${ord.targetCountA}! Nấm đã tìm đúng con số ${expectedMissing}!`;
        setFeedbackMessage(formulaSummary);
        if (soundEnabled) {
          playRewardTone();
          speak(formulaSummary, "vi-VN", { playbackRate: 0.94 });
        }
        onReaction?.("happy", formulaSummary);
      } else {
        setFeedbackState("wrong");
        setHintsUsedCount((h) => h + 1);
        const hintMsg =
          selectedBakeryNumber === null
            ? `Nấm hãy chạm chọn một con số từ 1 đến 10 ở khay dưới (hoặc bấm + Thêm món trên rổ) để điền vào dấu chấm hỏi (${ord.equationPrompt}) nhé!`
            : ord.operator === "+"
              ? `Rổ có sẵn ${ord.initialCountA}, muốn có ${ord.targetCountA} thì cần thêm ${expectedMissing} (${ord.initialCountA} + ${expectedMissing} = ${ord.targetCountA}). Nấm chọn số ${expectedMissing} nhé!`
              : `Rổ có ${ord.initialCountA}, muốn còn lại ${ord.targetCountA} thì cần bớt đi ${expectedMissing} (${ord.initialCountA} − ${expectedMissing} = ${ord.targetCountA}). Nấm chọn số ${expectedMissing} nhé!`;
        setFeedbackMessage(hintMsg);
        if (soundEnabled) {
          playAttentionChime();
          speak(hintMsg, "vi-VN", { playbackRate: 0.92 });
        }
        onReaction?.("sad", hintMsg);
      }
      return;
    }

    // CẤP 3: Giải phép tính mở ? + ? = x (Bắt buộc mỗi bên >= 1 món và cộng lại bằng tổng x!)
    const expectedTotal =
      ord.totalTargetCount ?? ord.targetCountA + (ord.targetCountB || 0);
    const valA = selectedBakeryNumber ?? 0;
    const valB = selectedBakeryNumberB ?? 0;

    if (valA >= 1 && valB >= 1 && valA + valB === expectedTotal) {
      setFeedbackState("correct");
      const altA = valA === 1 ? Math.min(expectedTotal - 1, 2) : 1;
      const altB = expectedTotal - altA;
      const altNote =
        altA >= 1 && altB >= 1 && altA !== valA
          ? ` (Ngoài ra ${altA} + ${altB} cũng bằng ${expectedTotal} đấy!)`
          : "";
      const formulaSummary = `Cách tách số tuyệt vời! ${valA} + ${valB} = ${expectedTotal}! Nấm đã gộp ${valA} ${ord.pastryA.name} và ${valB} ${ord.pastryB?.name || ord.pastryA.name}!${altNote}`;
      setFeedbackMessage(formulaSummary);
      if (soundEnabled) {
        playRewardTone();
        speak(formulaSummary, "vi-VN", { playbackRate: 0.94 });
      }
      onReaction?.("happy", formulaSummary);
    } else {
      setFeedbackState("wrong");
      setHintsUsedCount((h) => h + 1);
      let hintMsg = "";
      if (valA < 1 || valB < 1) {
        hintMsg = `Mỗi bên dấu cộng (+) cần có ít nhất 1 món đồ vật! Nấm hãy chọn đủ 2 số từ 1 trở lên sao cho ? + ? = ${expectedTotal} (ví dụ: ${ord.targetCountA} + ${ord.targetCountB || expectedTotal - ord.targetCountA} = ${expectedTotal}) nhé!`;
      } else {
        const suggestedB = Math.max(1, expectedTotal - valA);
        const suggestedA = expectedTotal - suggestedB;
        hintMsg = `${valA} + ${valB} đang bằng ${valA + valB}, mà đề bài cần tổng bằng ${expectedTotal}. Nấm thử cách tách ${suggestedA} + ${suggestedB} = ${expectedTotal} nhé!`;
      }
      setFeedbackMessage(hintMsg);
      if (soundEnabled) {
        playAttentionChime();
        speak(hintMsg, "vi-VN", { playbackRate: 0.92 });
      }
      onReaction?.("sad", hintMsg);
    }
  };

  // ===========================================================================
  // XỬ LÝ MINI-GAME 2: BÀN TIỆC SO SÁNH (<, >, =) & CÂN BẰNG 2 ĐĨA
  // - Cấp 1 (choose-sign):        a [?] b -> Chạm chọn <, =, > chấm điểm ngay
  // - Cấp 2 (balance-plate):      a [< / = / >] ? -> Thêm/bớt đồ ở Đĩa Phải cho khớp dấu
  // - Cấp 3 (expression-compare): x ± y [?] z -> Chạm chọn <, =, > chấm điểm ngay
  // ===========================================================================
  const signToVietnameseWord = (s: ComparisonSign) =>
    s === ">" ? "lớn hơn" : s === "<" ? "bé hơn" : "bằng";

  const isRightPlateSatisfyingSign = (
    leftVal: number,
    sign: ComparisonSign,
    rightVal: number,
  ) => {
    if (rightVal < 1) return false;
    if (sign === "=") return leftVal === rightVal;
    if (sign === "<") return leftVal < rightVal;
    return leftVal > rightVal;
  };

  // Chọn dấu <, =, > ở Cấp 1 & Cấp 3 -> Chạm 1 phát chấm điểm luôn!
  const handleSelectComparisonSign = (sign: ComparisonSign) => {
    if (feedbackState === "correct") return;
    setSelectedComparisonSign(sign);
    setAttemptsCount((c) => c + 1);

    const pRound = currentPizzaRound;
    const leftExprSpoken = pRound.leftExprParts
      ? `${pRound.leftExprParts.a} ${
          pRound.leftExprParts.op === "+" ? "cộng" : "trừ"
        } ${pRound.leftExprParts.b} bằng ${pRound.leftCount}, mà ${pRound.leftCount}`
      : `${pRound.leftCount}`;

    if (sign === pRound.expectedSign) {
      setFeedbackState("correct");
      const msg = `Chính xác! ${leftExprSpoken} ${signToVietnameseWord(sign)} ${pRound.rightCount} (${pRound.formulaText})!`;
      setFeedbackMessage(msg);
      if (soundEnabled) {
        playRewardTone();
        speak(msg, "vi-VN", { playbackRate: 0.94 });
      }
      onReaction?.("happy", msg);
    } else {
      setFeedbackState("wrong");
      setHintsUsedCount((h) => h + 1);
      const expectedWord = signToVietnameseWord(pRound.expectedSign);
      const hint = pRound.leftExprParts
        ? `Đĩa Trái có ${pRound.leftExprParts.label} = ${pRound.leftCount} món, Đĩa Phải có ${pRound.rightCount} món. Vì ${pRound.leftCount} ${expectedWord} ${pRound.rightCount} nên Nấm chọn dấu "${pRound.expectedSign}" (${expectedWord}) nhé!`
        : `Đĩa Trái có ${pRound.leftCount} món, Đĩa Phải có ${pRound.rightCount} món. Miệng cá sấu luôn há về bên nhiều hơn: ${pRound.leftCount} ${expectedWord} ${pRound.rightCount}, Nấm chọn dấu "${pRound.expectedSign}" nhé!`;
      setFeedbackMessage(hint);
      if (soundEnabled) {
        playAttentionChime();
        speak(hint, "vi-VN", { playbackRate: 0.92 });
      }
      onReaction?.("sad", hint);
    }
  };

  // Thêm / Bớt đồ vật trên Đĩa Phải ở Cấp 2 (balance-plate)
  const handleAdjustRightPlate = (delta: 1 | -1) => {
    if (feedbackState === "correct") return;
    setFeedbackState("idle");
    setRightPlateCount((prev) => {
      const next = Math.max(1, Math.min(9, prev + delta));
      if (soundEnabled && next !== prev) {
        playCardPlaceSound(next);
        speak(`Đĩa Phải có ${next}`, "vi-VN", { playbackRate: 0.98 });
      }
      return next;
    });
  };

  // Nút gợi ý / làm mẫu cho Bài 2
  const handleDistributeOneRoundHint = () => {
    if (feedbackState === "correct") return;
    setHintsUsedCount((h) => h + 1);
    const pRound = currentPizzaRound;

    if (pRound.comparisonMode === "balance-plate") {
      setRightPlateCount(pRound.rightCount);
      const msg = `Làm mẫu: Đĩa Trái có ${pRound.leftCount}, Đĩa Phải xếp ${pRound.rightCount} thì ${pRound.leftCount} ${signToVietnameseWord(pRound.expectedSign)} ${pRound.rightCount}! Nấm bấm Kiểm tra nhé!`;
      setFeedbackState("idle");
      setFeedbackMessage(msg);
      if (soundEnabled) {
        playAttentionChime();
        speak(msg, "vi-VN", { playbackRate: 0.92 });
      }
    } else {
      handleSelectComparisonSign(pRound.expectedSign);
    }
  };

  const checkPizzaRound = () => {
    const pRound = currentPizzaRound;
    if (pRound.comparisonMode !== "balance-plate") {
      if (selectedComparisonSign) {
        handleSelectComparisonSign(selectedComparisonSign);
      }
      return;
    }

    setAttemptsCount((c) => c + 1);
    const isOk = isRightPlateSatisfyingSign(
      pRound.leftCount,
      pRound.expectedSign,
      rightPlateCount,
    );

    if (isOk) {
      setFeedbackState("correct");
      const msg = `Tuyệt vời! ${pRound.leftCount} ${signToVietnameseWord(
        pRound.expectedSign,
      )} ${rightPlateCount} (${pRound.leftCount} ${pRound.expectedSign} ${rightPlateCount})!`;
      setFeedbackMessage(msg);
      if (soundEnabled) {
        playRewardTone();
        speak(msg, "vi-VN", { playbackRate: 0.94 });
      }
      onReaction?.("happy", msg);
    } else {
      setFeedbackState("wrong");
      setHintsUsedCount((h) => h + 1);
      const hint =
        pRound.expectedSign === "="
          ? `Ở giữa là dấu BẰNG (=). Đĩa Trái có ${pRound.leftCount} món, mà Đĩa Phải đang có ${rightPlateCount} món. Nấm chỉnh Đĩa Phải thành ${pRound.leftCount} món nhé!`
          : pRound.expectedSign === "<"
            ? `Ở giữa là dấu BÉ HƠN (<). Đĩa Trái có ${pRound.leftCount} món nên Đĩa Phải cần NHIỀU HƠN ${pRound.leftCount} món (từ ${pRound.leftCount + 1} món trở lên) nhé!`
            : `Ở giữa là dấu LỚN HƠN (>). Đĩa Trái có ${pRound.leftCount} món nên Đĩa Phải cần ÍT HƠN ${pRound.leftCount} món (từ 1 đến ${pRound.leftCount - 1} món) nhé!`;
      setFeedbackMessage(hint);
      if (soundEnabled) {
        playAttentionChime();
        speak(hint, "vi-VN", { playbackRate: 0.92 });
      }
      onReaction?.("sad", hint);
    }
  };

  // ===========================================================================
  // XỬ LÝ MINI-GAME 3: BẢNG CỬU CHƯƠNG & PHÉP TÍNH (+ - × ÷ TỪ 1 ĐẾN 9)
  // ===========================================================================
  const tableRows = buildArithmeticTable(tableOp, tableBase);
  const hiddenRowIndices = useMemo(
    () => generateHiddenTableIndices(level, seedOffset),
    [level, seedOffset],
  );

  const activeTableRow = tableRows[selectedRowIdx - 1] || tableRows[0];
  const isCurrentRowHidden =
    hiddenRowIndices.includes(activeTableRow.index) &&
    !solvedTableRows.includes(activeTableRow.index);

  // Tạo 4 lựa chọn đáp án cho dòng đang ẩn hộp quà
  const tableQuizChoices = (() => {
    const ans = activeTableRow.answer;
    const set = new Set<number>([ans]);
    const offsets = [-tableBase, tableBase, -1, 1, 2, -2, 3];
    for (const off of offsets) {
      if (set.size >= 4) break;
      const cand = ans + off;
      if (cand >= 0) set.add(cand);
    }
    return Array.from(set).sort((a, b) => a - b);
  })();

  const handleAnswerTableMystery = (choice: number) => {
    setAttemptsCount((c) => c + 1);
    if (choice === activeTableRow.answer) {
      setWrongGuessChoice(null);
      const nextSolved = solvedTableRows.includes(activeTableRow.index)
        ? solvedTableRows
        : [...solvedTableRows, activeTableRow.index];
      setSolvedTableRows(nextSolved);

      if (soundEnabled) {
        playRewardTone();
        speak(`Đúng rồi! ${activeTableRow.spokenFull}`, "vi-VN", {
          playbackRate: 0.95,
        });
      }

      // Tự động nhảy sang hộp quà chưa mở tiếp theo (nếu còn)
      const nextHidden = hiddenRowIndices.find(
        (idx) => !nextSolved.includes(idx),
      );
      if (nextHidden) {
        window.setTimeout(() => {
          setSelectedRowIdx(nextHidden);
        }, 700);
      } else {
        setFeedbackState("correct");
        setFeedbackMessage(
          `Hoan hô! Nấm đã mở hết toàn bộ Hộp Quà Bảng ${tableBase}!`,
        );
      }
    } else {
      setWrongGuessChoice(choice);
      setHintsUsedCount((h) => h + 1);
      if (soundEnabled) {
        playAttentionChime();
        speak(
          `Chưa đúng rồi! ${activeTableRow.spokenQuestion} Nấm đếm số món minh họa bên phải nhé!`,
          "vi-VN",
          { playbackRate: 0.92 },
        );
      }
    }
  };

  // ===========================================================================
  // XỬ LÝ MINI-GAME 4: SIÊU THỊ XU VÀNG CỦA NẤM
  // ===========================================================================
  const currentCoinsSum = placedCoins.reduce((sum, c) => sum + c, 0);

  const handleAddCoin = (coinValue: 1 | 2 | 5) => {
    if (feedbackState === "correct") return;
    if (placedCoins.length >= 10) return;
    setFeedbackState("idle");
    const next = [...placedCoins, coinValue];
    setPlacedCoins(next);
    const nextSum = next.reduce((s, c) => s + c, 0);
    if (soundEnabled) {
      playCardPlaceSound(next.length - 1);
      speak(`${nextSum} xu`, "vi-VN", { playbackRate: 0.96 });
    }
  };

  const handleRemoveCoinAt = (idx: number) => {
    if (feedbackState === "correct") return;
    setFeedbackState("idle");
    const next = placedCoins.filter((_, i) => i !== idx);
    setPlacedCoins(next);
    if (soundEnabled) {
      playCardPlaceSound(Math.max(0, next.length - 1));
    }
  };

  const checkCoinMarketRound = () => {
    setAttemptsCount((c) => c + 1);
    if (currentCoinsSum === currentCoinRound.targetCoinsTotal) {
      setFeedbackState("correct");
      const msg = `Tuyệt vời! ${currentCoinRound.formulaText}!`;
      setFeedbackMessage(msg);
      if (soundEnabled) {
        playRewardTone();
        speak(msg, "vi-VN", { playbackRate: 0.94 });
      }
      onReaction?.("happy", msg);
    } else {
      setFeedbackState("wrong");
      setHintsUsedCount((h) => h + 1);
      const diff = currentCoinRound.targetCoinsTotal - currentCoinsSum;
      const hint =
        diff > 0
          ? `Trong khay mới có ${currentCoinsSum} xu, cần ${currentCoinRound.targetCoinsTotal} xu. Nấm thêm ${diff} xu nữa nhé!`
          : `Trong khay đang có ${currentCoinsSum} xu, dư ${Math.abs(diff)} xu rồi! Nấm chạm vào đồng xu trong khay để lấy bớt ra nhé!`;
      setFeedbackMessage(hint);
      if (soundEnabled) {
        playAttentionChime();
        speak(hint, "vi-VN", { playbackRate: 0.92 });
      }
      onReaction?.("sad", hint);
    }
  };

  // Chuyển câu tiếp theo hoặc hoàn thành nhận sao
  const totalRoundsInCurrentGame =
    activeGameId === "melody-bakery"
      ? bakeryOrders.length
      : activeGameId === "pizza-party"
        ? pizzaRounds.length
        : activeGameId === "coin-market"
          ? coinRounds.length
          : 1;

  const handleNextRoundOrFinish = () => {
    stop();
    if (
      activeGameId !== "arithmetic-tables" &&
      roundIdx + 1 < totalRoundsInCurrentGame
    ) {
      setRoundIdx((r) => r + 1);
    } else if (!completedRef.current) {
      completedRef.current = true;
      onComplete({
        attempts: Math.max(1, attemptsCount),
        answers: [`Hoàn thành ${currentGameMeta.title} - Cấp ${level}`],
        activityId: activeGameId,
        skillIds: currentGameMeta.skillIds,
        hintsUsed: hintsUsedCount,
        independentResult: hintsUsedCount === 0 ? "passed" : "assisted",
        completionSource: "system-checked",
      });
    }
  };

  const visualPastryForTable =
    KAWAII_PASTRY_CATALOG[
      (tableBase * 5 + seedOffset * 7) % KAWAII_PASTRY_CATALOG.length
    ] || KAWAII_PASTRY_CATALOG[0];

  return (
    <div className="wb-content math-wb">
      {/* =====================================================================
          MÀN HÌNH 1: MENU CHỌN 4 BÀI HỌC TOÁN (GỌN GÀNG, ĐƠN GIẢN, KHÔNG RỐI)
         ===================================================================== */}
      {viewMode === "menu" && (
        <div className="lesson-picker-screen math-minigame-lobby">
          <div className="reading-level-header single-row-level-bar">
            <div className="reading-level-pills" style={{ width: "100%", justifyContent: "center" }}>
              <button
                type="button"
                className={`level-switch-pill ${
                  level === 1 ? "active-pink" : ""
                }`}
                onClick={() => setLevel(1)}
              >
                🌱 Cấp 1: Dễ
              </button>
              <button
                type="button"
                className={`level-switch-pill ${
                  level === 2 ? "active-orange" : ""
                }`}
                onClick={() => setLevel(2)}
              >
                ⭐ Cấp 2: Vừa
              </button>
              <button
                type="button"
                className={`level-switch-pill ${
                  level === 3 ? "active-pink" : ""
                }`}
                onClick={() => setLevel(3)}
              >
                👑 Cấp 3: Khó
              </button>
            </div>
          </div>

          <div className="math-minigame-cards-grid coded-3d-cards-grid">
            {MATH_MINI_GAMES.map((game, idx) => (
              <button
                key={game.id}
                type="button"
                className={`math-minigame-card coded-3d-minigame-card theme-card-${idx + 1}`}
                aria-label={`${game.badge}: ${game.title}`}
                onClick={() => {
                  setActiveGameId(game.id);
                  setSeedOffset((s) => s + 1);
                  setRoundIdx(0);
                  setAttemptsCount(0);
                  setHintsUsedCount(0);
                  setViewMode("game");
                }}
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
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          MÀN HÌNH 2: SÂN KHẤU CHƠI BÀI HỌC TOÁN (GỌN GÀNG TRÊN 1 KHUNG NHÌN)
         ===================================================================== */}
      {viewMode === "game" && (
        <div className="clean-lesson-stage math-interactive-stage">
          {/* Thanh điều khiển trên cùng gọn gàng: Chọn bài khác + Tiến trình + Nghe đố */}
          <div className="clean-lesson-header math-game-top-bar">
            <div className="math-game-title-pill">
              <button
                type="button"
                className="chunky-btn chunky-pink btn-sm"
                onClick={() => {
                  stop();
                  setViewMode("menu");
                }}
              >
                <ArrowLeft size={14} /> Chọn bài khác
              </button>
              <span>{currentGameMeta.title}</span>
              {activeGameId !== "arithmetic-tables" && (
                <small className="math-round-counter">
                  Câu {roundIdx + 1}/{totalRoundsInCurrentGame}
                </small>
              )}
            </div>

            <div className="music-slide-right-tools">
              <button
                type="button"
                className="chunky-btn chunky-blue btn-sm"
                onClick={handleSpeakCurrentInstruction}
              >
                <Headphones size={14} /> {speaking ? "Dừng" : "Nghe đố"}
              </button>
            </div>
          </div>

          {/* =================================================================
              MINI-GAME 1: TIỆM TẠP HÓA ĐẾM & TÍNH
              - Cấp 1 (single):   x + y = ?  (và x − y = ?)
              - Cấp 2 (equation): x + ? = y  (và x − ? = y)
              - Cấp 3 (dual):     ? + ? = x
             ================================================================= */}
          {activeGameId === "melody-bakery" && (
            <div className="bakery-minigame-board">
              {/* =============================================================
                  BỐ CỤC CHUNG CHO CẢ 3 CẤP ĐỘ:
                  - HÀNG TRÊN: CỘT TRÁI (BẢNG PHÉP TÍNH SỐ THUẦN KHIẾT) + CỘT PHẢI (RỔ ĐỒ VẬT MINH HỌA LỚN)
                  - HÀNG DƯỚI: DẢI NÚT SỐ TỪ 1 ĐẾN 10 (CHỈ ĐỂ SỐ, KHÔNG ICON GÂY RỐI)
                 ============================================================= */}
              <div className="bakery-equation-level-stage">
                <div className="bakery-equation-top-row">
                  {/* CỘT TRÁI: BẢNG PHÉP TÍNH LỚN THEO CẤP ĐỘ (CHỈ HIỂN THỊ SỐ RÕ RÀNG) */}
                  <div className="bakery-big-equation-card">
                    <button
                      type="button"
                      className="equation-card-level-pill"
                      onClick={handleSpeakCurrentInstruction}
                      title="Chạm để nghe đọc đề bài"
                    >
                      <Volume2 size={14} />
                      <span>
                        {currentBakeryOrder.mode === "single"
                          ? "🎀 Đố vui Cộng Trừ 10 (Chạm để nghe)"
                          : currentBakeryOrder.mode === "equation"
                            ? "🎀 Tìm số ẩn (x ± ? = y)"
                            : "🎀 Tách gộp số (? + ? = x)"}
                      </span>
                    </button>

                    <div
                      className="equation-card-subtitle"
                      onClick={handleSpeakCurrentInstruction}
                      style={{ cursor: "pointer" }}
                    >
                      {currentBakeryOrder.mode === "single"
                        ? currentBakeryOrder.operator === "+"
                          ? `Đố Nấm: Kitty có ${currentBakeryOrder.initialCountA} ${currentBakeryOrder.pastryA.name.toLowerCase()}, thêm ${currentBakeryOrder.missingOperand} cái nữa là mấy?`
                          : `Đố Nấm: Có ${currentBakeryOrder.initialCountA} ${currentBakeryOrder.pastryA.name.toLowerCase()}, ăn bớt ${currentBakeryOrder.missingOperand} cái còn lại mấy?`
                        : currentBakeryOrder.mode === "equation"
                          ? currentBakeryOrder.operator === "+"
                            ? `Đố Nấm: Đang có ${currentBakeryOrder.initialCountA}, thêm mấy để được ${currentBakeryOrder.targetCountA}?`
                            : `Đố Nấm: Đang có ${currentBakeryOrder.initialCountA}, bớt mấy để còn ${currentBakeryOrder.targetCountA}?`
                          : `Chọn 2 số bất kỳ cộng lại bằng ${currentBakeryOrder.totalTargetCount ?? currentBakeryOrder.targetCountA + (currentBakeryOrder.targetCountB || 0)}:`}
                    </div>

                    {/* 3 Ô SỐ CỦA PHÉP TÍNH — CHỈ ĐỂ SỐ THUẦN KHIẾT, KHÔNG ĐỂ ICON */}
                    {currentBakeryOrder.mode === "single" && (
                      <div className="bakery-equation-boxes">
                        <div className="eq-num-box eq-box-initial">
                          <span className="eq-num-val">
                            {currentBakeryOrder.initialCountA}
                          </span>
                        </div>

                        <span className="eq-op-symbol">
                          {currentBakeryOrder.operator || "+"}
                        </span>

                        <div className="eq-num-box eq-box-initial">
                          <span className="eq-num-val">
                            {currentBakeryOrder.missingOperand ??
                              Math.abs(
                                currentBakeryOrder.targetCountA -
                                  currentBakeryOrder.initialCountA,
                              )}
                          </span>
                        </div>

                        <span className="eq-op-symbol">=</span>

                        <div
                          className={`eq-num-box eq-box-missing ${
                            selectedBakeryNumber !== null ? "filled" : ""
                          }`}
                        >
                          <span className="eq-num-val">
                            {selectedBakeryNumber ?? "?"}
                          </span>
                        </div>
                      </div>
                    )}

                    {currentBakeryOrder.mode === "equation" && (
                      <div className="bakery-equation-boxes">
                        <div className="eq-num-box eq-box-initial">
                          <span className="eq-num-val">
                            {currentBakeryOrder.initialCountA}
                          </span>
                        </div>

                        <span className="eq-op-symbol">
                          {currentBakeryOrder.operator}
                        </span>

                        <div
                          className={`eq-num-box eq-box-missing ${
                            selectedBakeryNumber !== null ? "filled" : ""
                          }`}
                        >
                          <span className="eq-num-val">
                            {selectedBakeryNumber ?? "?"}
                          </span>
                        </div>

                        <span className="eq-op-symbol">=</span>

                        <div className="eq-num-box eq-box-target">
                          <span className="eq-num-val">
                            {currentBakeryOrder.targetCountA}
                          </span>
                        </div>
                      </div>
                    )}

                    {currentBakeryOrder.mode === "dual" && (
                      <div className="bakery-equation-boxes">
                        <button
                          type="button"
                          className={`eq-num-box eq-box-missing ${
                            selectedBakeryNumber !== null ? "filled" : ""
                          } ${activeMissingSlot === "A" ? "slot-focused" : ""}`}
                          onClick={() => setActiveMissingSlot("A")}
                          title="Chạm để chọn điền ô số thứ nhất"
                        >
                          <span className="eq-num-val">
                            {selectedBakeryNumber ?? "?"}
                          </span>
                          <small>
                            {activeMissingSlot === "A" ? "👉 Ô 1" : "Ô 1"}
                          </small>
                        </button>

                        <span className="eq-op-symbol">+</span>

                        <button
                          type="button"
                          className={`eq-num-box eq-box-missing ${
                            selectedBakeryNumberB !== null ? "filled" : ""
                          } ${activeMissingSlot === "B" ? "slot-focused" : ""}`}
                          onClick={() => setActiveMissingSlot("B")}
                          title="Chạm để chọn điền ô số thứ hai"
                        >
                          <span className="eq-num-val">
                            {selectedBakeryNumberB ?? "?"}
                          </span>
                          <small>
                            {activeMissingSlot === "B" ? "👉 Ô 2" : "Ô 2"}
                          </small>
                        </button>

                        <span className="eq-op-symbol">=</span>

                        <div className="eq-num-box eq-box-target">
                          <span className="eq-num-val">
                            {currentBakeryOrder.totalTargetCount ??
                              currentBakeryOrder.targetCountA +
                                (currentBakeryOrder.targetCountB || 0)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CỘT PHẢI: RỔ MINH HỌA TRỰC QUAN LỚN RÕ CHO CẢ 3 CẤP ĐỘ */}
                  <div
                    className={`customer-basket-panel equation-basket-preview ${
                      (currentBakeryOrder.mode === "single" &&
                        selectedBakeryNumber ===
                          currentBakeryOrder.targetCountA) ||
                      (currentBakeryOrder.mode === "equation" &&
                        trayCountA === currentBakeryOrder.targetCountA) ||
                      (currentBakeryOrder.mode === "dual" &&
                        (selectedBakeryNumber ?? 0) >= 1 &&
                        (selectedBakeryNumberB ?? 0) >= 1 &&
                        (selectedBakeryNumber ?? 0) +
                          (selectedBakeryNumberB ?? 0) ===
                          (currentBakeryOrder.totalTargetCount ??
                            currentBakeryOrder.targetCountA +
                              (currentBakeryOrder.targetCountB || 0)))
                        ? "basket-match-ready"
                        : ""
                    }`}
                  >
                    <div className="basket-panel-header">
                      <img
                        src={KAWAII_ITEM_IMAGES.bakeryBasket}
                        alt=""
                        className="basket-header-icon-img"
                      />
                      {currentBakeryOrder.mode === "single" ? (
                        <span>
                          👆 Chạm từng hình ({currentBakeryOrder.pastryA.icon}{" "}
                          {currentBakeryOrder.pastryA.name} •{" "}
                          {currentBakeryOrder.pastryA.englishName}) để đếm{" "}
                          <strong>1, 2, 3...</strong> rồi chọn số nhé!
                        </span>
                      ) : currentBakeryOrder.mode === "equation" ? (
                        <span>
                          Rổ Minh Họa: Đang có <strong>{trayCountA}</strong> /{" "}
                          <strong>{currentBakeryOrder.targetCountA}</strong>{" "}
                          {currentBakeryOrder.pastryA.icon}{" "}
                          {currentBakeryOrder.pastryA.name}
                        </span>
                      ) : (
                        <span>
                          Rổ Minh Họa: Đã gộp{" "}
                          <strong>
                            {(selectedBakeryNumber ?? 0) +
                              (selectedBakeryNumberB ?? 0)}
                          </strong>{" "}
                          /{" "}
                          <strong>
                            {currentBakeryOrder.totalTargetCount ??
                              currentBakeryOrder.targetCountA +
                                (currentBakeryOrder.targetCountB || 0)}
                          </strong>{" "}
                          món
                        </span>
                      )}

                      {currentBakeryOrder.mode !== "single" && (
                        <div
                          style={{
                            marginLeft: "auto",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <button
                            type="button"
                            className="chunky-btn chunky-yellow btn-sm"
                            style={{ padding: "3px 8px", fontSize: "0.74rem" }}
                            onClick={() => handleStepBasketItem(-1)}
                            disabled={feedbackState === "correct"}
                            title="Bớt 1 món"
                          >
                            <Minus size={12} /> 1
                          </button>
                          <button
                            type="button"
                            className="chunky-btn chunky-pink btn-sm"
                            style={{ padding: "3px 8px", fontSize: "0.74rem" }}
                            onClick={() => handleStepBasketItem(1)}
                            disabled={feedbackState === "correct"}
                            title="Thêm 1 món vào rổ"
                          >
                            <Plus size={12} /> Thêm 1
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="customer-basket-items-grid">
                      {/* Cấp 1 & Cấp 2: Hiển thị đầy đủ các ô đồ vật + các ô đích cần thêm (viền nét đứt) */}
                      {currentBakeryOrder.mode !== "dual" &&
                        Array.from({
                          length: Math.max(
                            trayCountA,
                            currentBakeryOrder.initialCountA,
                            currentBakeryOrder.targetCountA,
                          ),
                        }).map((_, idx) => {
                          const isTargetEmptySlot =
                            currentBakeryOrder.mode === "equation" &&
                            currentBakeryOrder.operator === "+" &&
                            idx >= trayCountA &&
                            idx < currentBakeryOrder.targetCountA;
                          const isRemoved =
                            idx >= trayCountA && !isTargetEmptySlot;
                          const isAdded =
                            idx >= currentBakeryOrder.initialCountA &&
                            idx < trayCountA;
                          const isCounted = countedItemIndices.includes(idx);
                          return (
                            <div
                              key={`eq-tray-${idx}`}
                              className={`basket-pastry-item ${
                                isAdded
                                  ? "item-added-new"
                                  : isTargetEmptySlot
                                    ? "item-target-slot"
                                    : isRemoved
                                      ? "item-removed-ghost"
                                      : "item-initial"
                              }`}
                              style={
                                isCounted
                                  ? {
                                      border: "2.5px solid #f59e0b",
                                      background: "#fef3c7",
                                      transform: "scale(1.06)",
                                    }
                                  : { cursor: "pointer" }
                              }
                              onClick={() => {
                                if (currentBakeryOrder.mode === "single") {
                                  if (isRemoved) return;
                                  playCardPlaceSound(idx + 1);
                                  setCountedItemIndices((prev) =>
                                    prev.includes(idx) ? prev : [...prev, idx],
                                  );
                                  if (soundEnabled) {
                                    speak(`${idx + 1}`, "vi-VN", {
                                      playbackRate: 1.0,
                                    });
                                  }
                                  return;
                                }
                                if (
                                  currentBakeryOrder.mode === "equation" &&
                                  feedbackState !== "correct"
                                ) {
                                  if (isTargetEmptySlot) {
                                    handleStepBasketItem(1);
                                  } else if (
                                    currentBakeryOrder.operator === "−" &&
                                    !isRemoved &&
                                    idx >= currentBakeryOrder.targetCountA
                                  ) {
                                    handleStepBasketItem(1);
                                  }
                                }
                              }}
                              title={
                                isTargetEmptySlot
                                  ? "Chạm để thêm 1 món vào ô trống này"
                                  : "Chạm để đếm"
                              }
                            >
                              <img
                                src={currentBakeryOrder.pastryA.imageUrl}
                                alt={currentBakeryOrder.pastryA.name}
                                className="basket-pastry-img"
                              />
                              <span className="basket-pastry-count-badge">
                                {isTargetEmptySlot
                                  ? `?`
                                  : isCounted
                                    ? `⭐ ${idx + 1}`
                                    : idx + 1}
                              </span>
                            </div>
                          );
                        })}

                      {/* Cấp 3 (? + ? = x): Luôn hiển thị đủ các ô đồ vật lớn rõ (món A + món B + các ô trống cần điền) */}
                      {currentBakeryOrder.mode === "dual" &&
                        (() => {
                          const countA = selectedBakeryNumber ?? 0;
                          const countB = selectedBakeryNumberB ?? 0;
                          const totalTarget =
                            currentBakeryOrder.totalTargetCount ??
                            currentBakeryOrder.targetCountA +
                              (currentBakeryOrder.targetCountB || 0);
                          const totalSlots = Math.max(
                            totalTarget,
                            countA + countB,
                          );

                          return Array.from({ length: totalSlots }).map(
                            (_, idx) => {
                              const isSlotA = idx < countA;
                              const isSlotB =
                                idx >= countA && idx < countA + countB;
                              const isSlotEmpty = idx >= countA + countB;
                              const slotImg = isSlotA
                                ? currentBakeryOrder.pastryA.imageUrl
                                : isSlotB
                                  ? currentBakeryOrder.pastryB?.imageUrl ||
                                    currentBakeryOrder.pastryA.imageUrl
                                  : activeMissingSlot === "A"
                                    ? currentBakeryOrder.pastryA.imageUrl
                                    : currentBakeryOrder.pastryB?.imageUrl ||
                                      currentBakeryOrder.pastryA.imageUrl;

                              return (
                                <div
                                  key={`dual-slot-${idx}`}
                                  className={`basket-pastry-item ${
                                    isSlotA
                                      ? "item-initial"
                                      : isSlotB
                                        ? "item-initial-b"
                                        : "item-target-slot"
                                  }`}
                                  onClick={() => {
                                    if (feedbackState !== "correct") {
                                      handleStepBasketItem(1);
                                    }
                                  }}
                                  title="Chạm để thêm 1 món vào rổ"
                                >
                                  <img
                                    src={slotImg}
                                    alt=""
                                    className="basket-pastry-img"
                                  />
                                  <span
                                    className={`basket-pastry-count-badge ${
                                      isSlotB
                                        ? "badge-b"
                                        : isSlotEmpty
                                          ? "badge-empty"
                                          : ""
                                    }`}
                                  >
                                    {idx + 1}
                                  </span>
                                </div>
                              );
                            },
                          );
                        })()}
                    </div>
                  </div>
                </div>

                {/* KHAY 10 CON SỐ TỪ 1 ĐẾN 10 Ở DƯỚI CHO CẢ 3 CẤP ĐỘ — CHỈ HIỂN THỊ SỐ, KHÔNG ICON */}
                <div className="numbered-pastries-tray-panel pure-numbers-tray">
                  <div className="numbered-tray-title">
                    {currentBakeryOrder.mode === "dual" ? (
                      <span>
                        Đang điền{" "}
                        <strong>
                          Ô ? thứ {activeMissingSlot === "A" ? "1" : "2"}
                        </strong>{" "}
                        — Chạm chọn số (1–10):
                      </span>
                    ) : (
                      <span>
                        Chạm chọn số đúng (1–10) điền vào ô <strong>?</strong>:
                      </span>
                    )}
                  </div>
                  <div className="numbered-pastries-grid pure-numbers-grid">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                      const isSelected =
                        currentBakeryOrder.mode === "dual"
                          ? (activeMissingSlot === "A" &&
                              selectedBakeryNumber === num) ||
                            (activeMissingSlot === "B" &&
                              selectedBakeryNumberB === num)
                          : selectedBakeryNumber === num;
                      return (
                        <button
                          key={`num-choice-${num}`}
                          type="button"
                          className={`numbered-pastry-choice-btn pure-number-btn ${
                            isSelected ? "selected" : ""
                          }`}
                          onClick={() => handleSelectBakeryNumber(num)}
                          disabled={feedbackState === "correct"}
                        >
                          <span className="pure-number-digit">{num}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              MINI-GAME 2: BÀN TIỆC SO SÁNH (<, >, =) & CÂN BẰNG 2 ĐĨA
              - Cấp 1 (choose-sign):        Đếm 2 đĩa a [?] b -> Chọn dấu <, =, >
              - Cấp 2 (balance-plate):      Cho sẵn dấu <, =, > -> Thêm/bớt đồ ở Đĩa Phải
              - Cấp 3 (expression-compare): Phép tính x ± y [?] z -> Chọn dấu <, =, >
             ================================================================= */}
          {activeGameId === "pizza-party" && (
            <div className="pizza-minigame-board">
              <div
                className="melody-order-ticket pizza-order-ticket"
                onClick={handleSpeakCurrentInstruction}
              >
                <div className="order-ticket-left">
                  <img
                    src={
                      currentPizzaRound.itemImageUrl ||
                      KAWAII_ITEM_IMAGES.pizzaSlice
                    }
                    alt=""
                    className="order-inline-pastry-img"
                  />
                  <strong className="pizza-prompt-text">
                    {currentPizzaRound.prompt}
                  </strong>
                </div>
                <div className="order-live-math-badge">
                  {currentPizzaRound.comparisonMode === "balance-plate" ? (
                    <span>
                      {currentPizzaRound.leftCount}{" "}
                      <strong>{currentPizzaRound.expectedSign}</strong>{" "}
                      <strong>{rightPlateCount}</strong>
                    </span>
                  ) : (
                    <span>
                      {currentPizzaRound.leftExprParts
                        ? currentPizzaRound.leftExprParts.label
                        : currentPizzaRound.leftCount}{" "}
                      <strong>{selectedComparisonSign ?? "?"}</strong>{" "}
                      {currentPizzaRound.rightCount}
                    </span>
                  )}
                </div>
              </div>

              {/* Sân khấu 2 đĩa Trái - Phải và Ô Dấu (<, =, >) ở chính giữa */}
              <div
                className="pizza-plates-grid"
                style={{
                  gridTemplateColumns: "1fr auto 1fr",
                  alignItems: "stretch",
                  gap: "12px",
                }}
              >
                {/* ĐĨA TRÁI */}
                <div
                  className={`pizza-plate-card ${
                    feedbackState === "correct" ? "plate-match-ok" : ""
                  }`}
                >
                  <div className="plate-card-top">
                    <span>
                      Đĩa Trái ({currentPizzaRound.itemName || "Món ăn"})
                    </span>
                    <strong className="plate-count-pill">
                      {currentPizzaRound.leftExprParts
                        ? `${currentPizzaRound.leftExprParts.label}`
                        : currentPizzaRound.leftCount}
                    </strong>
                  </div>

                  <div className="plate-surface-btn" style={{ cursor: "default" }}>
                    <img
                      src={KAWAII_ITEM_IMAGES.pinkPlate}
                      alt=""
                      className="plate-bg-img"
                    />
                    <div className="plate-slices-overlay">
                      {currentPizzaRound.leftExprParts ? (
                        // Cấp 3: Minh họa trực quan phép cộng (a + b) hoặc phép trừ (a − b) trên Đĩa Trái
                        currentPizzaRound.leftExprParts.op === "+" ? (
                          <>
                            {Array.from({
                              length: currentPizzaRound.leftExprParts.a,
                            }).map((_, sIdx) => (
                              <img
                                key={`left-a-${sIdx}`}
                                src={
                                  currentPizzaRound.itemImageUrl ||
                                  KAWAII_ITEM_IMAGES.pizzaSlice
                                }
                                alt=""
                                className="plate-slice-item-img"
                              />
                            ))}
                            {Array.from({
                              length: currentPizzaRound.leftExprParts.b,
                            }).map((_, sIdx) => (
                              <img
                                key={`left-b-${sIdx}`}
                                src={
                                  currentPizzaRound.itemImageUrl ||
                                  KAWAII_ITEM_IMAGES.pizzaSlice
                                }
                                alt=""
                                className="plate-slice-item-img"
                                style={{
                                  filter:
                                    "drop-shadow(0 0 6px rgba(245, 158, 11, 0.85))",
                                  transform: "scale(1.06)",
                                }}
                              />
                            ))}
                          </>
                        ) : (
                          Array.from({
                            length: currentPizzaRound.leftExprParts.a,
                          }).map((_, sIdx) => {
                            const isRemoved =
                              sIdx >= currentPizzaRound.leftCount;
                            return (
                              <img
                                key={`left-sub-${sIdx}`}
                                src={
                                  currentPizzaRound.itemImageUrl ||
                                  KAWAII_ITEM_IMAGES.pizzaSlice
                                }
                                alt=""
                                className="plate-slice-item-img"
                                style={
                                  isRemoved
                                    ? {
                                        opacity: 0.28,
                                        filter: "grayscale(0.8)",
                                      }
                                    : undefined
                                }
                              />
                            );
                          })
                        )
                      ) : (
                        Array.from({
                          length: currentPizzaRound.leftCount,
                        }).map((_, sIdx) => (
                          <img
                            key={`left-s-${sIdx}`}
                            src={
                              currentPizzaRound.itemImageUrl ||
                              KAWAII_ITEM_IMAGES.pizzaSlice
                            }
                            alt=""
                            className="plate-slice-item-img"
                          />
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Ô DẤU SO SÁNH Ở CHÍNH GIỮA (<, =, >) */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    padding: "0 4px",
                  }}
                >
                  <div
                    className={`eq-num-box ${
                      currentPizzaRound.comparisonMode === "balance-plate"
                        ? "eq-box-target"
                        : selectedComparisonSign
                          ? "eq-box-missing filled"
                          : "eq-box-missing"
                    }`}
                    style={{
                      minWidth: "82px",
                      minHeight: "88px",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      className="eq-num-val"
                      style={{ fontSize: "2.3rem", lineHeight: 1 }}
                    >
                      {currentPizzaRound.comparisonMode === "balance-plate"
                        ? currentPizzaRound.expectedSign
                        : selectedComparisonSign ?? "?"}
                    </span>
                    <small>
                      {currentPizzaRound.comparisonMode === "balance-plate"
                        ? currentPizzaRound.expectedSign === "="
                          ? "Bằng nhau"
                          : currentPizzaRound.expectedSign === "<"
                            ? "Bé hơn"
                            : "Lớn hơn"
                        : selectedComparisonSign
                          ? signToVietnameseWord(selectedComparisonSign)
                          : "Điền dấu"}
                    </small>
                  </div>
                </div>

                {/* ĐĨA PHẢI */}
                <div
                  className={`pizza-plate-card ${
                    (currentPizzaRound.comparisonMode === "balance-plate" &&
                      isRightPlateSatisfyingSign(
                        currentPizzaRound.leftCount,
                        currentPizzaRound.expectedSign,
                        rightPlateCount,
                      )) ||
                    feedbackState === "correct"
                      ? "plate-match-ok"
                      : ""
                  }`}
                >
                  <div className="plate-card-top">
                    <span>
                      Đĩa Phải (
                      {currentPizzaRound.rightItemName ||
                        currentPizzaRound.itemName ||
                        "Món ăn"}
                      )
                    </span>
                    <strong className="plate-count-pill">
                      {currentPizzaRound.comparisonMode === "balance-plate"
                        ? rightPlateCount
                        : currentPizzaRound.rightCount}
                    </strong>
                  </div>

                  <button
                    type="button"
                    className="plate-surface-btn"
                    onClick={() => {
                      if (currentPizzaRound.comparisonMode === "balance-plate") {
                        handleAdjustRightPlate(1);
                      }
                    }}
                    style={{
                      cursor:
                        currentPizzaRound.comparisonMode === "balance-plate"
                          ? "pointer"
                          : "default",
                    }}
                    title={
                      currentPizzaRound.comparisonMode === "balance-plate"
                        ? "Chạm để thêm 1 món vào Đĩa Phải"
                        : ""
                    }
                  >
                    <img
                      src={KAWAII_ITEM_IMAGES.pinkPlate}
                      alt=""
                      className="plate-bg-img"
                    />
                    <div className="plate-slices-overlay">
                      {Array.from({
                        length:
                          currentPizzaRound.comparisonMode === "balance-plate"
                            ? rightPlateCount
                            : currentPizzaRound.rightCount,
                      }).map((_, sIdx) => (
                        <img
                          key={`right-s-${sIdx}`}
                          src={
                            currentPizzaRound.rightItemImageUrl ||
                            currentPizzaRound.itemImageUrl ||
                            KAWAII_ITEM_IMAGES.pizzaSlice
                          }
                          alt=""
                          className="plate-slice-item-img"
                        />
                      ))}
                    </div>
                  </button>

                  {currentPizzaRound.comparisonMode === "balance-plate" && (
                    <div className="shelf-quick-btns">
                      <button
                        type="button"
                        className="shelf-mini-btn btn-minus"
                        disabled={
                          rightPlateCount <= 1 || feedbackState === "correct"
                        }
                        onClick={() => handleAdjustRightPlate(-1)}
                      >
                        <Minus size={13} /> Bớt 1
                      </button>
                      <button
                        type="button"
                        className="shelf-mini-btn btn-plus"
                        disabled={
                          rightPlateCount >= 9 || feedbackState === "correct"
                        }
                        onClick={() => handleAdjustRightPlate(1)}
                      >
                        <Plus size={13} /> Thêm 1
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* KHAY CHỌN DẤU (<, =, >) Ở CẤP 1 & CẤP 3 */}
              {currentPizzaRound.comparisonMode !== "balance-plate" && (
                <div className="numbered-pastries-tray-panel">
                  <div className="numbered-tray-title">
                    <span>
                      Chạm chọn dấu <strong>&lt; (Bé hơn)</strong>,{" "}
                      <strong>= (Bằng nhau)</strong> hoặc{" "}
                      <strong>&gt; (Lớn hơn)</strong> điền vào ô <strong>?</strong>{" "}
                      ở giữa nhé:
                    </span>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                      gap: "12px",
                    }}
                  >
                    {(
                      [
                        {
                          sign: "<" as ComparisonSign,
                          title: "< Bé hơn",
                          desc: "Đĩa Trái ít hơn Đĩa Phải",
                        },
                        {
                          sign: "=" as ComparisonSign,
                          title: "= Bằng nhau",
                          desc: "Hai đĩa nhiều bằng nhau",
                        },
                        {
                          sign: ">" as ComparisonSign,
                          title: "> Lớn hơn",
                          desc: "Đĩa Trái nhiều hơn Đĩa Phải",
                        },
                      ]
                    ).map((opt) => {
                      const isSel = selectedComparisonSign === opt.sign;
                      return (
                        <button
                          key={opt.sign}
                          type="button"
                          className={`numbered-pastry-choice-btn ${
                            isSel ? "selected" : ""
                          }`}
                          style={{
                            padding: "8px 12px",
                            minHeight: "60px",
                            flexDirection: "column",
                            gap: "2px",
                          }}
                          disabled={feedbackState === "correct"}
                          onClick={() => handleSelectComparisonSign(opt.sign)}
                        >
                          <strong
                            style={{ fontSize: "1.35rem", color: "#9d174d" }}
                          >
                            {opt.title}
                          </strong>
                          <small
                            style={{
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              color: "#6b7280",
                            }}
                          >
                            {opt.desc}
                          </small>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =================================================================
              MINI-GAME 3: BẢNG TÍNH THẦN KỲ (+ - × ÷ TỪ 1 ĐẾN 9)
             ================================================================= */}
          {activeGameId === "arithmetic-tables" && (
            <div className="tables-minigame-board">
              {/* Thanh chọn Phép tính (+ - × ÷) & Chọn Bảng số (1..9) */}
              <div className="tables-selector-bar">
                <div className="tables-op-group">
                  {(
                    [
                      { id: "add", label: "+ Bảng Cộng", spoken: "Bảng cộng" },
                      { id: "sub", label: "− Bảng Trừ", spoken: "Bảng trừ" },
                      { id: "mul", label: "× Bảng Nhân", spoken: "Bảng nhân" },
                      { id: "div", label: "÷ Bảng Chia", spoken: "Bảng chia" },
                    ] as Array<{
                      id: TableOperation;
                      label: string;
                      spoken: string;
                    }>
                  ).map((opItem) => (
                    <button
                      key={opItem.id}
                      type="button"
                      className={`table-op-btn ${
                        tableOp === opItem.id ? "active" : ""
                      }`}
                      onClick={() => {
                        setTableOp(opItem.id);
                        if (soundEnabled) {
                          speak(`${opItem.spoken} ${tableBase}`, "vi-VN", {
                            playbackRate: 0.95,
                          });
                        }
                      }}
                    >
                      {opItem.label}
                    </button>
                  ))}
                </div>

                <div className="tables-num-group">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                      key={num}
                      type="button"
                      className={`table-num-btn ${
                        tableBase === num ? "active" : ""
                      }`}
                      onClick={() => {
                        setTableBase(num);
                        if (soundEnabled) {
                          const opName =
                            tableOp === "add"
                              ? "Bảng cộng"
                              : tableOp === "sub"
                                ? "Bảng trừ"
                                : tableOp === "mul"
                                  ? "Bảng nhân"
                                  : "Bảng chia";
                          speak(`${opName} ${num}`, "vi-VN", {
                            playbackRate: 0.95,
                          });
                        }
                      }}
                    >
                      Bảng {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Khung 2 cột: Cột trái 9 dòng Bảng tính · Cột phải Minh họa & Mở hộp quà */}
              <div className="tables-split-workspace">
                <div className="tables-rows-grid">
                  {tableRows.map((row) => {
                    const isHidden =
                      hiddenRowIndices.includes(row.index) &&
                      !solvedTableRows.includes(row.index);
                    const isSelected = selectedRowIdx === row.index;

                    return (
                      <button
                        key={row.index}
                        type="button"
                        className={`table-formula-row ${
                          isSelected ? "row-selected-glow" : ""
                        } ${isHidden ? "row-mystery-locked" : "row-revealed"}`}
                        onMouseEnter={() => {
                          if (level === 1) setSelectedRowIdx(row.index);
                        }}
                        onClick={() => {
                          setSelectedRowIdx(row.index);
                          setWrongGuessChoice(null);
                          if (soundEnabled) {
                            speak(
                              isHidden ? row.spokenQuestion : row.spokenFull,
                              "vi-VN",
                              { playbackRate: 0.94 },
                            );
                          }
                        }}
                      >
                        <span className="row-expr-text">
                          {row.expressionText} =
                        </span>
                        {isHidden ? (
                          <span className="row-mystery-gift-tag">
                            <img
                              src={KAWAII_ITEM_IMAGES.mysteryGift}
                              alt="?"
                              className="inline-gift-icon"
                            />
                            <span>?</span>
                          </span>
                        ) : (
                          <strong className="row-ans-num">{row.answer}</strong>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Cột phải: Giải thích bằng hình 3D & Chọn Hộp Quà 3D */}
                <div className="tables-visualizer-panel">
                  <div className="visualizer-header-equation">
                    <img
                      src={visualPastryForTable.imageUrl}
                      alt=""
                      className="visualizer-gift-img"
                    />
                    <span>{activeTableRow.expressionText} = </span>
                    {isCurrentRowHidden ? (
                      <img
                        src={KAWAII_ITEM_IMAGES.mysteryGift}
                        alt="Hộp quà bí ẩn"
                        className="visualizer-gift-img"
                      />
                    ) : (
                      <strong className="visualizer-ans-highlight">
                        {activeTableRow.answer}
                      </strong>
                    )}
                  </div>

                  {/* Nếu dòng đang ẩn Hộp quà (Cấp 2 & Cấp 3): Hiện 4 Hộp Quà 3D mang số để mở */}
                  {isCurrentRowHidden ? (
                    <div className="mystery-gift-quiz-box">
                      <div className="mystery-quiz-prompt">
                        Nấm chạm chọn Hộp Quà có kết quả đúng nhé:
                      </div>
                      <div className="mystery-choices-row">
                        {tableQuizChoices.map((ch) => (
                          <button
                            key={ch}
                            type="button"
                            className={`mystery-gift-choice-card ${
                              wrongGuessChoice === ch ? "wrong" : ""
                            }`}
                            onClick={() => handleAnswerTableMystery(ch)}
                          >
                            <img
                              src={KAWAII_ITEM_IMAGES.mysteryGift}
                              alt=""
                              className="mystery-choice-gift-img"
                            />
                            <span className="mystery-choice-num">{ch}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {/* Minh họa trực quan bằng các món Kawaii 3D */}
                  <div className="visualizer-pastry-groups">
                    <div className="visualizer-caption">
                      {tableOp === "mul"
                        ? `Minh họa: ${activeTableRow.b} đĩa × ${activeTableRow.a} = ${activeTableRow.answer}`
                        : tableOp === "div"
                          ? `Minh họa: ${activeTableRow.a} chia đều ${activeTableRow.b} đĩa = Mỗi đĩa ${activeTableRow.answer}`
                          : `Minh họa kết quả (${activeTableRow.answer} ${visualPastryForTable.name}):`}
                    </div>

                    {(tableOp === "mul" || tableOp === "div") &&
                    activeTableRow.visualGroups <= 6 &&
                    activeTableRow.visualItemsPerGroup <= 6 ? (
                      <div className="visualizer-plated-groups-wrap">
                        {Array.from({
                          length: activeTableRow.visualGroups,
                        }).map((_, gIdx) => (
                          <div
                            key={`vg-${gIdx}`}
                            className="visualizer-plate-group"
                          >
                            <div className="visualizer-plate-items">
                              {Array.from({
                                length: activeTableRow.visualItemsPerGroup,
                              }).map((__, pIdx) => (
                                <img
                                  key={`vg-${gIdx}-p-${pIdx}`}
                                  src={visualPastryForTable.imageUrl}
                                  alt=""
                                  className="visualizer-pastry-img"
                                />
                              ))}
                            </div>
                            <span className="visualizer-plate-tag">
                              Đĩa {gIdx + 1} ({activeTableRow.visualItemsPerGroup})
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="visualizer-pastry-items-wrap">
                        {Array.from({
                          length: Math.min(24, activeTableRow.answer),
                        }).map((_, i) => (
                          <img
                            key={`vis-p-${i}`}
                            src={visualPastryForTable.imageUrl}
                            alt=""
                            className="visualizer-pastry-img"
                          />
                        ))}
                        {activeTableRow.answer > 24 && (
                          <span className="visualizer-more-tag">
                            ... (Tổng {activeTableRow.answer})
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              MINI-GAME 4: SIÊU THỊ XU VÀNG (TÍNH TIỀN & THỐI TIỀN)
             ================================================================= */}
          {activeGameId === "coin-market" && (
            <div className="coin-market-board">
              <div
                className="melody-order-ticket coin-order-ticket"
                onClick={handleSpeakCurrentInstruction}
              >
                <div className="order-ticket-left">
                  <img
                    src={KAWAII_ITEM_IMAGES.cashRegister}
                    alt=""
                    className="order-inline-pastry-img"
                  />
                  <strong>{currentCoinRound.prompt}</strong>
                </div>
                <div className="order-live-math-badge">
                  <span>
                    Khay: <strong>{currentCoinsSum}</strong> /{" "}
                    <strong>{currentCoinRound.targetCoinsTotal} xu</strong>
                  </span>
                </div>
              </div>

              <div className="coin-market-split">
                {/* Cột trái: Các món khách mua & Bảng giá */}
                <div className="market-items-showcase">
                  <div className="shelf-panel-header">
                    <img
                      src={KAWAII_ITEM_IMAGES.bakeryBasket}
                      alt=""
                      className="basket-header-icon-img"
                    />
                    <span>
                      Giỏ Hàng
                      {currentCoinRound.customerPaid
                        ? ` (Khách đưa ${currentCoinRound.customerPaid} xu)`
                        : ""}
                    </span>
                  </div>
                  <div className="market-tagged-items-row">
                    {currentCoinRound.items.map((entry, idx) => (
                      <div key={`mk-${idx}`} className="market-item-price-card">
                        <img
                          src={entry.pastry.imageUrl}
                          alt={entry.pastry.name}
                          className="market-pastry-img"
                        />
                        <span className="market-pastry-name">
                          {entry.pastry.name}
                        </span>
                        <span className="market-price-tag">
                          <img
                            src={KAWAII_ITEM_IMAGES.goldCoin}
                            alt=""
                            className="tiny-coin-img"
                          />
                          {entry.price} xu
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cột phải: Quầy Thu Ngân & Các Đồng Xu Vàng Mệnh Giá 1 xu, 2 xu, 5 xu */}
                <div className="market-cashier-panel">
                  <div className="shelf-panel-header">
                    <img
                      src={KAWAII_ITEM_IMAGES.cashRegister}
                      alt=""
                      className="basket-header-icon-img"
                    />
                    <span>Chạm đồng xu vàng để bỏ vào khay:</span>
                  </div>

                  <div className="coin-denominations-row">
                    {([1, 2, 5] as const).map((val) => {
                      const visualStackCount =
                        val === 1 ? 1 : val === 2 ? 2 : 3;
                      return (
                        <button
                          key={val}
                          type="button"
                          className="gold-coin-pick-btn"
                          disabled={feedbackState === "correct"}
                          onClick={() => handleAddCoin(val)}
                        >
                          <div className="gold-coin-stack-imgs">
                            {Array.from({ length: visualStackCount }).map(
                              (_, cIdx) => (
                                <img
                                  key={cIdx}
                                  src={KAWAII_ITEM_IMAGES.goldCoin}
                                  alt={`${val} xu`}
                                  className="gold-coin-btn-img"
                                />
                              ),
                            )}
                          </div>
                          <span className="gold-coin-val-label">+{val} xu</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Khay chứa các đồng xu bé đã bỏ vào (chạm để lấy bớt ra) */}
                  <div
                    className={`cashier-tray-box ${
                      currentCoinsSum === currentCoinRound.targetCoinsTotal
                        ? "tray-goal-reached"
                        : ""
                    }`}
                  >
                    {placedCoins.length === 0 ? (
                      <span className="cashier-empty-hint">
                        Khay đang có 0 xu — Chạm xu vàng ở trên nhé!
                      </span>
                    ) : (
                      placedCoins.map((cVal, cIdx) => (
                        <button
                          key={`pc-${cIdx}`}
                          type="button"
                          className="placed-coin-chip"
                          onClick={() => handleRemoveCoinAt(cIdx)}
                          title="Chạm để lấy bớt đồng xu này ra"
                        >
                          <img
                            src={KAWAII_ITEM_IMAGES.goldCoin}
                            alt=""
                            className="placed-coin-img"
                          />
                          <strong>{cVal} xu</strong>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* THANH THÔNG BÁO PHẢN HỒI ĐÚNG / GỢI Ý TẠI CHỖ */}
          {feedbackMessage && (
            <div
              className={`math-inline-explanation-pill ${
                feedbackState === "correct" ? "pill-success" : "pill-hint"
              }`}
            >
              {feedbackState === "correct" ? (
                <CheckCircle2 size={16} />
              ) : (
                <Lightbulb size={16} />
              )}
              <span>{feedbackMessage}</span>
            </div>
          )}

          {/* =================================================================
              HÀNG NÚT ĐIỀU KHIỂN DƯỚI CÙNG (GỌN GÀNG, KHÔNG CHỒNG LẤP)
             ================================================================= */}
          <div className="wb-actions-row math-bottom-actions">
            {/* Nút phụ bên trái (Làm lại / Gợi ý / Chuyển câu) */}
            <div className="wb-choices-row">
              {activeGameId === "melody-bakery" &&
                feedbackState !== "correct" && (
                  <button
                    type="button"
                    className="chunky-btn chunky-yellow btn-sm"
                    onClick={() => {
                      setTrayCountA(
                        currentBakeryOrder.mode === "single"
                          ? currentBakeryOrder.targetCountA
                          : currentBakeryOrder.initialCountA,
                      );
                      setTrayCountB(currentBakeryOrder.initialCountB || 0);
                      setSelectedBakeryNumber(null);
                      setSelectedBakeryNumberB(null);
                      setActiveMissingSlot("A");
                      setFeedbackState("idle");
                      setFeedbackMessage("");
                    }}
                  >
                    <RotateCcw size={14} /> Làm lại
                  </button>
                )}

              {activeGameId === "pizza-party" &&
                feedbackState !== "correct" && (
                  <button
                    type="button"
                    className="chunky-btn chunky-yellow btn-sm"
                    onClick={handleDistributeOneRoundHint}
                  >
                    <Lightbulb size={14} /> Gợi ý
                  </button>
                )}

              {activeGameId === "coin-market" &&
                feedbackState !== "correct" && (
                  <button
                    type="button"
                    className="chunky-btn chunky-yellow btn-sm"
                    onClick={() => {
                      setPlacedCoins([]);
                      setFeedbackState("idle");
                      setFeedbackMessage("");
                    }}
                  >
                    <RotateCcw size={14} /> Đếm lại
                  </button>
                )}

              {activeGameId !== "arithmetic-tables" && (
                <div className="math-round-arrows-inline">
                  <button
                    type="button"
                    className="music-slide-arrow"
                    disabled={roundIdx <= 0}
                    onClick={() => setRoundIdx((r) => Math.max(0, r - 1))}
                    title="Câu trước"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    className="music-slide-arrow"
                    disabled={roundIdx >= totalRoundsInCurrentGame - 1}
                    onClick={() =>
                      setRoundIdx((r) =>
                        Math.min(totalRoundsInCurrentGame - 1, r + 1),
                      )
                    }
                    title="Câu tiếp"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>

            {/* MỖI TRẠNG THÁI CHỈ LÀM NỔI BẬT 1 HÀNH ĐỘNG CHÍNH DUY NHẤT */}
            <div className="math-primary-cta-slot">
              {feedbackState === "correct" ? (
                <button
                  type="button"
                  className="chunky-btn chunky-green btn-sm pulse-next-btn math-primary-cta-btn"
                  onClick={handleNextRoundOrFinish}
                >
                  {activeGameId !== "arithmetic-tables" &&
                  roundIdx + 1 < totalRoundsInCurrentGame ? (
                    <>
                      Câu tiếp ({roundIdx + 2}/{totalRoundsInCurrentGame}){" "}
                      <ChevronRight size={17} />
                    </>
                  ) : (
                    <>
                      <Star size={16} fill="currentColor" /> Nhận Sao & Sticker!
                    </>
                  )}
                </button>
              ) : activeGameId === "melody-bakery" ? (
                <button
                  type="button"
                  className="chunky-btn chunky-green btn-sm math-primary-cta-btn"
                  onClick={checkBakeryOrder}
                >
                  <CheckCircle2 size={16} /> Kiểm tra đáp án!
                </button>
              ) : activeGameId === "pizza-party" ? (
                <button
                  type="button"
                  className="chunky-btn chunky-green btn-sm math-primary-cta-btn"
                  onClick={checkPizzaRound}
                >
                  <CheckCircle2 size={16} /> Kiểm tra đáp án!
                </button>
              ) : activeGameId === "coin-market" ? (
                <button
                  type="button"
                  className="chunky-btn chunky-green btn-sm math-primary-cta-btn"
                  onClick={checkCoinMarketRound}
                >
                  <CheckCircle2 size={16} /> Thanh toán!
                </button>
              ) : (
                <button
                  type="button"
                  className="chunky-btn chunky-green btn-sm math-primary-cta-btn"
                  onClick={() =>
                    onComplete({
                      attempts: Math.max(1, attemptsCount || 1),
                      answers: [`Hoàn thành ${currentGameMeta.title}`],
                      activityId: activeGameId,
                      skillIds: currentGameMeta.skillIds,
                      hintsUsed: hintsUsedCount,
                      independentResult:
                        hintsUsedCount === 0 ? "passed" : "assisted",
                      completionSource: "child-confirmed",
                    })
                  }
                >
                  <Star size={16} fill="currentColor" /> Hoàn thành & Nhận Sao!
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
