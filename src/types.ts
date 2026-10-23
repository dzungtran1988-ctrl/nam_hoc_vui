export type SubjectId =
  | "reading"
  | "math"
  | "music"
  | "english"
  | "storybook"
  | "coloring"
  | "minigame"
  | "lifeskills";

export type CompletionSource = "system-checked" | "child-confirmed" | "parent-confirmed";

export interface LessonResult {
  attempts: number;
  answers: string[];
  activityId?: string;
  skillIds?: string[];
  hintsUsed?: number;
  independentResult?: "passed" | "assisted" | null;
  completionSource?: CompletionSource;
}

export interface ActivityProps {
  soundEnabled: boolean;
  onComplete: (result: LessonResult) => void;
  onReaction?: (type: "happy" | "sad" | "singing" | "idle", message?: string) => void;
  onLessonIndexChange?: (idx: number) => void;
}
