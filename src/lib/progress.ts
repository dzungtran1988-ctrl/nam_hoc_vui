export const STORAGE_KEY = "nam-hoc-vui:progress:v1";
export const CORRUPT_BACKUP_KEY = `${STORAGE_KEY}:backup`;
export const LESSON_IDS = [
  "reading-001",
  "math-001",
  "music-001",
  "english-001",
  "story-001",
  "color-001",
  "minigame-001",
  "lifeskills-001",
] as const;

export type CompletionSource =
  | "system-checked"
  | "child-confirmed"
  | "parent-confirmed";

export interface Completion {
  lessonId: string;
  completedAt: string;
  localDate: string;
  stars: number;
  attempts: number;
  answers: string[];
  activityId?: string;
  skillIds?: string[];
  hintsUsed?: number;
  independentResult?: "passed" | "assisted" | null;
  completionSource?: CompletionSource;
}

export interface Progress {
  version: 1;
  completions: Completion[];
  soundEnabled: boolean;
}

export interface LessonResult {
  attempts: number;
  answers: string[];
  activityId?: string;
  skillIds?: string[];
  hintsUsed?: number;
  independentResult?: "passed" | "assisted" | null;
  completionSource?: CompletionSource;
}

export interface ProgressStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export const createInitialProgress = (): Progress => ({
  version: 1,
  completions: [],
  soundEnabled: true,
});

/** A child's learning day follows the computer's local timezone, not UTC. */
export function localDateKey(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validLocalDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value))
    return false;
  const date = new Date(`${value}T12:00:00Z`);
  return (
    Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
  );
}

function validAnswers(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.length <= 1000 &&
    value.every((answer) => typeof answer === "string" && answer.length <= 1000)
  );
}

export function validateProgress(value: unknown): Progress {
  if (!isRecord(value) || value.version !== 1)
    throw new Error("Tệp cần là dữ liệu Nấm Học Vui phiên bản 1.");
  if (
    typeof value.soundEnabled !== "boolean" ||
    !Array.isArray(value.completions)
  ) {
    throw new Error("Tệp thiếu cài đặt âm thanh hoặc lịch sử học hợp lệ.");
  }
  if (value.completions.length > 10000)
    throw new Error("Tệp quá lớn: chỉ hỗ trợ tối đa 10.000 lượt học.");
  const awards = new Set<string>();
  const completions = value.completions.map((entry, index): Completion => {
    const invalid = () =>
      new Error(
        `Lượt học số ${index + 1} không hợp lệ. Dữ liệu hiện tại vẫn được giữ nguyên.`,
      );
    if (!isRecord(entry)) throw invalid();
    if (
      typeof entry.lessonId !== "string" ||
      !LESSON_IDS.some((id) => id === entry.lessonId)
    )
      throw invalid();
    if (
      typeof entry.completedAt !== "string" ||
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(
        entry.completedAt,
      ) ||
      !Number.isFinite(Date.parse(entry.completedAt))
    )
      throw invalid();
    if (new Date(entry.completedAt).toISOString() !== entry.completedAt)
      throw invalid();
    if (!validLocalDate(entry.localDate)) throw invalid();
    if (entry.stars !== 0 && entry.stars !== 3) throw invalid();
    if (
      typeof entry.attempts !== "number" ||
      !Number.isInteger(entry.attempts) ||
      entry.attempts < 1 ||
      entry.attempts > 10000
    )
      throw invalid();
    if (!validAnswers(entry.answers)) throw invalid();
    if (entry.stars > 0) {
      const award = `${entry.lessonId}:${entry.localDate}`;
      if (awards.has(award))
        throw new Error(
          "Tệp có sao trùng cho cùng một bài trong ngày. Dữ liệu hiện tại vẫn được giữ nguyên.",
        );
      awards.add(award);
    }

    const item: Completion = {
      lessonId: entry.lessonId,
      completedAt: entry.completedAt,
      localDate: entry.localDate,
      stars: entry.stars,
      attempts: entry.attempts,
      answers: [...entry.answers],
    };

    if (typeof entry.activityId === "string" && entry.activityId.length <= 120) {
      item.activityId = entry.activityId;
    }
    if (
      Array.isArray(entry.skillIds) &&
      entry.skillIds.length <= 50 &&
      entry.skillIds.every((s) => typeof s === "string" && s.length <= 120)
    ) {
      item.skillIds = [...entry.skillIds];
    }
    if (
      typeof entry.hintsUsed === "number" &&
      Number.isInteger(entry.hintsUsed) &&
      entry.hintsUsed >= 0 &&
      entry.hintsUsed <= 1000
    ) {
      item.hintsUsed = entry.hintsUsed;
    }
    if (
      entry.independentResult === "passed" ||
      entry.independentResult === "assisted" ||
      entry.independentResult === null
    ) {
      item.independentResult = entry.independentResult;
    }
    if (
      entry.completionSource === "system-checked" ||
      entry.completionSource === "child-confirmed" ||
      entry.completionSource === "parent-confirmed"
    ) {
      item.completionSource = entry.completionSource;
    }

    return item;
  });
  return { version: 1, soundEnabled: value.soundEnabled, completions };
}

export function parseProgress(json: string): Progress {
  if (json.length > 5_000_000)
    throw new Error(
      "Tệp dữ liệu vượt quá 5 MB. Vui lòng chọn một bản xuất nhỏ hơn.",
    );
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    throw new Error(
      "Không đọc được JSON. Vui lòng chọn tệp xuất từ Nấm Học Vui.",
    );
  }
  return validateProgress(parsed);
}

export function serializeProgress(progress: Progress): string {
  return JSON.stringify(validateProgress(progress), null, 2);
}

export function addCompletion(
  progress: Progress,
  lessonId: string,
  result: LessonResult,
  now = new Date(),
): { progress: Progress; awardedStars: number } {
  if (!LESSON_IDS.some((id) => id === lessonId))
    throw new Error("Bài học không hợp lệ.");
  if (!Number.isFinite(now.getTime()))
    throw new Error("Thời gian hoàn thành không hợp lệ.");
  if (
    !Number.isInteger(result.attempts) ||
    result.attempts < 1 ||
    result.attempts > 10000 ||
    !validAnswers(result.answers)
  )
    throw new Error("Kết quả bài học không hợp lệ.");
  const localDate = localDateKey(now);
  const awardedStars = progress.completions.some(
    (entry) =>
      entry.lessonId === lessonId &&
      entry.localDate === localDate &&
      entry.stars > 0,
  )
    ? 0
    : 3;
  const completion: Completion = {
    lessonId,
    completedAt: now.toISOString(),
    localDate,
    stars: awardedStars,
    attempts: result.attempts,
    answers: [...result.answers],
  };

  if (result.activityId) completion.activityId = result.activityId;
  if (result.skillIds) completion.skillIds = [...result.skillIds];
  if (typeof result.hintsUsed === "number") completion.hintsUsed = result.hintsUsed;
  if (result.independentResult !== undefined) {
    completion.independentResult = result.independentResult;
  }
  if (result.completionSource) {
    completion.completionSource = result.completionSource;
  }

  return {
    progress: {
      ...progress,
      completions: [...progress.completions, completion],
    },
    awardedStars,
  };
}

export function getProgressStats(progress: Progress, date = localDateKey()) {
  const today = progress.completions.filter(
    (entry) => entry.localDate === date,
  );
  return {
    totalStars: progress.completions.reduce(
      (sum, entry) => sum + entry.stars,
      0,
    ),
    todayStars: today.reduce((sum, entry) => sum + entry.stars, 0),
    totalSessions: progress.completions.length,
    todaySessions: today.length,
    lessonsToday: new Set(today.map((entry) => entry.lessonId)).size,
    activeDays: new Set(progress.completions.map((entry) => entry.localDate))
      .size,
  };
}

export function loadProgress(storage: ProgressStorage): {
  progress: Progress;
  error: string | null;
} {
  let raw: string | null;
  try {
    raw = storage.getItem(STORAGE_KEY);
  } catch {
    return {
      progress: createInitialProgress(),
      error:
        "Trình duyệt không cho đọc bộ nhớ. Tiến độ chỉ được giữ trong lần mở này.",
    };
  }
  if (raw === null) return { progress: createInitialProgress(), error: null };
  try {
    return { progress: parseProgress(raw), error: null };
  } catch {
    try {
      // Keep the first damaged original, including across development StrictMode reads.
      if (storage.getItem(CORRUPT_BACKUP_KEY) === null)
        storage.setItem(CORRUPT_BACKUP_KEY, raw);
      return {
        progress: createInitialProgress(),
        error:
          "Dữ liệu cũ bị lỗi nên app mở với tiến độ mới. Bản dữ liệu lỗi được giữ dự phòng trong bộ nhớ trình duyệt.",
      };
    } catch {
      return {
        progress: createInitialProgress(),
        error:
          "Dữ liệu cũ bị lỗi và chưa thể tạo bản dự phòng. Tiến độ mới chỉ được giữ trong lần mở này; dữ liệu cũ chưa bị thay đổi.",
      };
    }
  }
}

export function saveProgress(
  storage: ProgressStorage,
  progress: Progress,
): string | null {
  try {
    storage.setItem(STORAGE_KEY, serializeProgress(progress));
    return null;
  } catch {
    return "Chưa lưu được vào trình duyệt. Con vẫn học tiếp được, nhưng tiến độ mới có thể mất khi tải lại trang. Phụ huynh có thể xuất JSON để giữ lại.";
  }
}
