import { useCallback, useEffect, useRef, useState } from "react";
import { localDateKey } from "../lib/progress";

const EYE_REST_STORAGE_KEY = "nam-hoc-vui.eye-rest.v1";
const IDLE_THRESHOLD_MS = 3 * 60 * 1000; // 3 phút không tương tác sẽ tạm dừng đếm giờ học
const MAX_GRACE_PERIOD_MS = 3 * 60 * 1000; // Tối đa 3 phút chờ Nấm hoàn thành nốt bài đang làm dở

export const EYE_REST_BREAK_START_LINE =
  "Nấm ơi đến giờ ra chơi rồi, Nấm nghỉ giải lao rồi quay lại sau nhé!";

export const EYE_REST_BREAK_END_LINE =
  "Hết giờ ra chơi rồi! Mắt xinh của Nấm đã khỏe chưa? Mình cùng học tiếp nhé!";

export const EYE_REST_GRACE_REMINDER_LINE =
  "Sắp đến giờ ra chơi rồi, Nấm hoàn thành nốt bài này rồi mình nghỉ giải lao nhé!";

export interface EyeRestPersistedState {
  studyLimitMinutes: number; // 0 = Tắt, mặc định 30 phút
  breakDurationMinutes: number; // Mặc định 10 phút
  accumulatedStudySeconds: number;
  todayStudySeconds: number;
  todayDateKey: string;
  breakEndsAt: number | null; // Timestamp (ms) kết thúc giờ nghỉ
}

export interface ParentMathChallenge {
  questionText: string;
  expectedAnswer: number;
}

export function generateParentMathChallenge(): ParentMathChallenge {
  const templates: Array<() => ParentMathChallenge> = [
    () => {
      const a = 12 + Math.floor(Math.random() * 17); // 12..28
      const b = 6 + Math.floor(Math.random() * 9); // 6..14
      return {
        questionText: `${a} + ${b} = ?`,
        expectedAnswer: a + b,
      };
    },
    () => {
      const a = 24 + Math.floor(Math.random() * 15); // 24..38
      const b = 7 + Math.floor(Math.random() * 9); // 7..15
      return {
        questionText: `${a} - ${b} = ?`,
        expectedAnswer: a - b,
      };
    },
    () => {
      const a = 6 + Math.floor(Math.random() * 4); // 6..9
      const b = 3 + Math.floor(Math.random() * 4); // 3..6
      return {
        questionText: `${a} × ${b} = ?`,
        expectedAnswer: a * b,
      };
    },
  ];
  const pick = templates[Math.floor(Math.random() * templates.length)];
  return pick();
}

function createDefaultEyeRestState(): EyeRestPersistedState {
  return {
    studyLimitMinutes: 30,
    breakDurationMinutes: 10,
    accumulatedStudySeconds: 0,
    todayStudySeconds: 0,
    todayDateKey: localDateKey(),
    breakEndsAt: null,
  };
}

function loadEyeRestState(): EyeRestPersistedState {
  if (typeof window === "undefined") return createDefaultEyeRestState();
  try {
    const raw = window.localStorage.getItem(EYE_REST_STORAGE_KEY);
    if (!raw) return createDefaultEyeRestState();
    const parsed = JSON.parse(raw) as Partial<EyeRestPersistedState>;
    const today = localDateKey();
    const isSameDay = parsed.todayDateKey === today;

    const studyLimitMinutes =
      typeof parsed.studyLimitMinutes === "number" &&
      [0, 15, 20, 30, 45].includes(parsed.studyLimitMinutes)
        ? parsed.studyLimitMinutes
        : 30;

    const breakDurationMinutes =
      typeof parsed.breakDurationMinutes === "number" &&
      parsed.breakDurationMinutes >= 1 &&
      parsed.breakDurationMinutes <= 30
        ? parsed.breakDurationMinutes
        : 10;

    const now = Date.now();
    const validBreakEndsAt =
      typeof parsed.breakEndsAt === "number" && parsed.breakEndsAt > now
        ? parsed.breakEndsAt
        : null;

    const wasBreakExpired =
      typeof parsed.breakEndsAt === "number" && parsed.breakEndsAt <= now;

    const accumulatedStudySeconds = wasBreakExpired
      ? 0
      : typeof parsed.accumulatedStudySeconds === "number" &&
          parsed.accumulatedStudySeconds >= 0
        ? Math.floor(parsed.accumulatedStudySeconds)
        : 0;

    const todayStudySeconds =
      isSameDay &&
      typeof parsed.todayStudySeconds === "number" &&
      parsed.todayStudySeconds >= 0
        ? Math.floor(parsed.todayStudySeconds)
        : 0;

    return {
      studyLimitMinutes,
      breakDurationMinutes,
      accumulatedStudySeconds,
      todayStudySeconds,
      todayDateKey: today,
      breakEndsAt: validBreakEndsAt,
    };
  } catch {
    return createDefaultEyeRestState();
  }
}

function saveEyeRestState(state: EyeRestPersistedState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(EYE_REST_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage errors
  }
}

export interface UseEyeRestTimerOptions {
  /** Có đang ở trong bài học / màn hình nhận thưởng chưa nên ngắt ngang hay không */
  isBusyInLesson: boolean;
  onBreakStart?: () => void;
  onBreakEnd?: () => void;
  onGracePendingStart?: () => void;
}

export function useEyeRestTimer({
  isBusyInLesson,
  onBreakStart,
  onBreakEnd,
  onGracePendingStart,
}: UseEyeRestTimerOptions) {
  const [state, setState] = useState<EyeRestPersistedState>(() =>
    loadEyeRestState(),
  );
  const [nowMs, setNowMs] = useState<number>(() => Date.now());
  const [pendingBreak, setPendingBreak] = useState<boolean>(false);
  const [isIdlePaused, setIsIdlePaused] = useState<boolean>(false);

  const lastInteractionRef = useRef<number>(Date.now());
  const graceStartedAtRef = useRef<number | null>(null);
  const busyRef = useRef<boolean>(isBusyInLesson);
  busyRef.current = isBusyInLesson;

  const onBreakStartRef = useRef(onBreakStart);
  onBreakStartRef.current = onBreakStart;
  const onBreakEndRef = useRef(onBreakEnd);
  onBreakEndRef.current = onBreakEnd;
  const onGracePendingStartRef = useRef(onGracePendingStart);
  onGracePendingStartRef.current = onGracePendingStart;

  const isResting =
    state.breakEndsAt !== null && state.breakEndsAt > nowMs;

  const remainingBreakSeconds = isResting
    ? Math.max(0, Math.ceil((state.breakEndsAt! - nowMs) / 1000))
    : 0;

  const studyLimitSeconds = state.studyLimitMinutes * 60;
  const remainingStudySeconds =
    state.studyLimitMinutes > 0
      ? Math.max(0, studyLimitSeconds - state.accumulatedStudySeconds)
      : 0;

  // Lắng nghe thao tác chạm/chuột/phím để nhận diện bé đang thực sự dùng máy (chống đếm ảo khi để máy không)
  useEffect(() => {
    const markActive = () => {
      lastInteractionRef.current = Date.now();
      setIsIdlePaused(false);
    };
    window.addEventListener("pointerdown", markActive, { passive: true });
    window.addEventListener("keydown", markActive, { passive: true });
    window.addEventListener("touchstart", markActive, { passive: true });
    window.addEventListener("click", markActive, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", markActive);
      window.removeEventListener("keydown", markActive);
      window.removeEventListener("touchstart", markActive);
      window.removeEventListener("click", markActive);
    };
  }, []);

  // Nếu vừa vào app mà đang trong giờ nghỉ (do F5 trang khi đang nghỉ), phát thông báo nhẹ
  const initialBreakNotifiedRef = useRef(false);
  useEffect(() => {
    if (!initialBreakNotifiedRef.current) {
      initialBreakNotifiedRef.current = true;
      if (state.breakEndsAt !== null && state.breakEndsAt > Date.now()) {
        onBreakStartRef.current?.();
      }
    }
  }, [state.breakEndsAt]);

  const startBreakInternal = useCallback((durationMin?: number) => {
    const now = Date.now();
    setNowMs(now);
    setPendingBreak(false);
    graceStartedAtRef.current = null;
    setState((prev) => {
      const mins = durationMin ?? prev.breakDurationMinutes;
      const next: EyeRestPersistedState = {
        ...prev,
        accumulatedStudySeconds: 0,
        breakEndsAt: now + mins * 60 * 1000,
      };
      saveEyeRestState(next);
      return next;
    });
    onBreakStartRef.current?.();
  }, []);

  // Khi đang ở chế độ chờ hoàn thành nốt bài (pendingBreak) mà bé vừa thoát ra Sảnh hoặc xong bài -> kích hoạt nghỉ ngay
  useEffect(() => {
    if (pendingBreak && !isBusyInLesson && !isResting) {
      startBreakInternal();
    }
  }, [pendingBreak, isBusyInLesson, isResting, startBreakInternal]);

  // Vòng lặp 1 giây kiểm tra bộ đếm học & đếm ngược giờ ra chơi
  useEffect(() => {
    const timer = window.setInterval(() => {
      const now = Date.now();
      setNowMs(now);

      setState((prev) => {
        const today = localDateKey();
        const resetDay = prev.todayDateKey !== today;
        const baseTodaySeconds = resetDay ? 0 : prev.todayStudySeconds;

        // 1. Nếu đang trong Giờ Ra Chơi (breakEndsAt !== null)
        if (prev.breakEndsAt !== null) {
          if (now >= prev.breakEndsAt) {
            // Đã hết 10 phút nghỉ mắt!
            const finishedState: EyeRestPersistedState = {
              ...prev,
              todayDateKey: today,
              todayStudySeconds: baseTodaySeconds,
              accumulatedStudySeconds: 0,
              breakEndsAt: null,
            };
            saveEyeRestState(finishedState);
            window.setTimeout(() => {
              setPendingBreak(false);
              graceStartedAtRef.current = null;
              onBreakEndRef.current?.();
            }, 0);
            return finishedState;
          }
          return prev;
        }

        // 2. Nếu phụ huynh tắt chế độ hẹn giờ nghỉ mắt (studyLimitMinutes === 0)
        if (prev.studyLimitMinutes <= 0) {
          return prev;
        }

        // 3. Kiểm tra tab ẩn hoặc không chạm quá 3 phút (Idle Pause)
        const isTabHidden =
          typeof document !== "undefined" &&
          document.visibilityState !== "visible";
        const isIdle = now - lastInteractionRef.current > IDLE_THRESHOLD_MS;

        if (isTabHidden || isIdle) {
          setIsIdlePaused(true);
          return prev;
        }
        setIsIdlePaused(false);

        const nextAccumulated = prev.accumulatedStudySeconds + 1;
        const nextToday = baseTodaySeconds + 1;
        const limitSec = prev.studyLimitMinutes * 60;

        // Kiểm tra chạm mốc 30 phút (limitSec)
        if (nextAccumulated >= limitSec) {
          if (!busyRef.current) {
            // Đang ở ngoài Sảnh -> Bật màn hình Giờ Ra Chơi ngay
            const breakState: EyeRestPersistedState = {
              ...prev,
              todayDateKey: today,
              todayStudySeconds: nextToday,
              accumulatedStudySeconds: 0,
              breakEndsAt: now + prev.breakDurationMinutes * 60 * 1000,
            };
            saveEyeRestState(breakState);
            window.setTimeout(() => {
              setPendingBreak(false);
              graceStartedAtRef.current = null;
              onBreakStartRef.current?.();
            }, 0);
            return breakState;
          }

          // Đang làm dở bài học -> Graceful Break (chờ xong bài hoặc tối đa 3 phút)
          if (graceStartedAtRef.current === null) {
            graceStartedAtRef.current = now;
            window.setTimeout(() => {
              setPendingBreak(true);
              onGracePendingStartRef.current?.();
            }, 0);
          } else if (now - graceStartedAtRef.current >= MAX_GRACE_PERIOD_MS) {
            // Đã quá 3 phút gia hạn -> Bật màn hình Giờ Ra Chơi để bảo vệ mắt
            const breakState: EyeRestPersistedState = {
              ...prev,
              todayDateKey: today,
              todayStudySeconds: nextToday,
              accumulatedStudySeconds: 0,
              breakEndsAt: now + prev.breakDurationMinutes * 60 * 1000,
            };
            saveEyeRestState(breakState);
            window.setTimeout(() => {
              setPendingBreak(false);
              graceStartedAtRef.current = null;
              onBreakStartRef.current?.();
            }, 0);
            return breakState;
          }
        }

        const updated: EyeRestPersistedState = {
          ...prev,
          todayDateKey: today,
          todayStudySeconds: nextToday,
          accumulatedStudySeconds: nextAccumulated,
        };
        // Lưu localStorage mỗi 5 giây để nhẹ hiệu năng nhưng vẫn chống F5
        if (nextAccumulated % 5 === 0) {
          saveEyeRestState(updated);
        }
        return updated;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  /** Mẹ mở khóa để học tiếp luôn (Reset chu kỳ 30 phút mới) */
  const unlockAndResetCycle = useCallback(() => {
    lastInteractionRef.current = Date.now();
    graceStartedAtRef.current = null;
    setPendingBreak(false);
    setNowMs(Date.now());
    setState((prev) => {
      const next: EyeRestPersistedState = {
        ...prev,
        accumulatedStudySeconds: 0,
        breakEndsAt: null,
      };
      saveEyeRestState(next);
      return next;
    });
  }, []);

  /** Mẹ cho phép chơi thêm X phút (mặc định +10 phút) trước khi nhắc nghỉ lại */
  const snoozeBreak = useCallback((extraMinutes = 10) => {
    lastInteractionRef.current = Date.now();
    graceStartedAtRef.current = null;
    setPendingBreak(false);
    setNowMs(Date.now());
    setState((prev) => {
      const limitSec = (prev.studyLimitMinutes || 30) * 60;
      const targetAccumulated = Math.max(0, limitSec - extraMinutes * 60);
      const next: EyeRestPersistedState = {
        ...prev,
        accumulatedStudySeconds: targetAccumulated,
        breakEndsAt: null,
      };
      saveEyeRestState(next);
      return next;
    });
  }, []);

  /** Mẹ bấm bật Giờ Ra Chơi ngay lập tức */
  const triggerBreakNow = useCallback(() => {
    startBreakInternal();
  }, [startBreakInternal]);

  /** Mẹ đổi cấu hình số phút học mỗi chu kỳ (15 / 20 / 30 / 45 / 0 = Tắt) */
  const setStudyLimitMinutes = useCallback((minutes: number) => {
    graceStartedAtRef.current = null;
    setPendingBreak(false);
    setState((prev) => {
      const next: EyeRestPersistedState = {
        ...prev,
        studyLimitMinutes: minutes,
        accumulatedStudySeconds:
          minutes === 0 ? 0 : Math.min(prev.accumulatedStudySeconds, minutes * 60 - 60),
        breakEndsAt: minutes === 0 ? null : prev.breakEndsAt,
      };
      saveEyeRestState(next);
      return next;
    });
  }, []);

  return {
    studyLimitMinutes: state.studyLimitMinutes,
    breakDurationMinutes: state.breakDurationMinutes,
    accumulatedStudySeconds: state.accumulatedStudySeconds,
    todayStudySeconds: state.todayStudySeconds,
    remainingStudySeconds,
    isResting,
    remainingBreakSeconds,
    pendingBreak,
    isIdlePaused,
    unlockAndResetCycle,
    snoozeBreak,
    triggerBreakNow,
    setStudyLimitMinutes,
  };
}
