import { useCallback, useRef, useState } from "react";
import {
  addCompletion,
  createInitialProgress,
  loadProgress,
  parseProgress,
  saveProgress,
} from "../lib/progress";
import type { LessonResult, Progress } from "../lib/progress";

function initialState(): {
  progress: Progress;
  error: string | null;
  canPersist: boolean;
} {
  try {
    const loaded = loadProgress(window.localStorage);
    return {
      ...loaded,
      canPersist:
        !loaded.error?.includes("chưa thể tạo bản dự phòng") &&
        !loaded.error?.includes("không cho đọc"),
    };
  } catch {
    return {
      progress: createInitialProgress(),
      error:
        "Trình duyệt không cho dùng bộ nhớ. Tiến độ chỉ được giữ trong lần mở này; hãy xuất JSON để giữ lại.",
      canPersist: false,
    };
  }
}

export function useProgress() {
  const [initial] = useState(initialState);
  const [progress, setProgress] = useState<Progress>(initial.progress);
  const [error, setError] = useState<string | null>(initial.error);
  const current = useRef(initial.progress);

  const commit = useCallback(
    (next: Progress) => {
      current.current = next;
      setProgress(next);
      if (!initial.canPersist) return;
      try {
        const saveError = saveProgress(window.localStorage, next);
        setError(saveError ?? initial.error);
      } catch {
        setError(
          "Chưa lưu được vào trình duyệt. Tiến độ mới chỉ được giữ trong lần mở này; hãy xuất JSON để giữ lại.",
        );
      }
    },
    [initial],
  );

  const completeLesson = useCallback(
    (lessonId: string, result: LessonResult) => {
      const completed = addCompletion(current.current, lessonId, result);
      commit(completed.progress);
      return completed.awardedStars;
    },
    [commit],
  );

  const setSoundEnabled = useCallback(
    (enabled: boolean) => commit({ ...current.current, soundEnabled: enabled }),
    [commit],
  );
  const resetProgress = useCallback(
    () =>
      commit({
        ...createInitialProgress(),
        soundEnabled: current.current.soundEnabled,
      }),
    [commit],
  );
  const importProgress = useCallback(
    (json: string) => commit(parseProgress(json)),
    [commit],
  );

  return {
    progress,
    error,
    completeLesson,
    setSoundEnabled,
    resetProgress,
    importProgress,
  };
}
