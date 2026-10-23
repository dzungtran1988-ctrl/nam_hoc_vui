import test from "node:test";
import assert from "node:assert/strict";
import {
  addCompletion,
  CORRUPT_BACKUP_KEY,
  createInitialProgress,
  getProgressStats,
  loadProgress,
  localDateKey,
  parseProgress,
  saveProgress,
  serializeProgress,
  STORAGE_KEY,
} from "../src/lib/progress.ts";

const result = { attempts: 2, answers: ["6", "7"] };
const day = new Date(2026, 9, 12, 1, 30);

test("awards 3 stars once per local day; repeats preserve attempts and answers", () => {
  const first = addCompletion(createInitialProgress(), "math-001", result, day);
  const repeated = addCompletion(
    first.progress,
    "math-001",
    { attempts: 1, answers: ["7"] },
    day,
  );
  assert.equal(first.awardedStars, 3);
  assert.equal(repeated.awardedStars, 0);
  assert.equal(repeated.progress.completions.length, 2);
  assert.deepEqual(repeated.progress.completions[0].answers, ["6", "7"]);
  assert.equal(repeated.progress.completions[0].attempts, 2);
  assert.equal(
    getProgressStats(repeated.progress, localDateKey(day)).totalStars,
    3,
  );
  assert.equal(first.progress.completions.length, 1);
});

test("different lessons and a new local day each earn stars", () => {
  let progress = addCompletion(
    createInitialProgress(),
    "math-001",
    result,
    day,
  ).progress;
  progress = addCompletion(
    progress,
    "reading-001",
    { attempts: 1, answers: ["Vui vẻ"] },
    day,
  ).progress;
  progress = addCompletion(
    progress,
    "math-001",
    result,
    new Date(2026, 9, 13, 1, 0),
  ).progress;
  assert.deepEqual(getProgressStats(progress, "2026-10-12"), {
    totalStars: 9,
    todayStars: 6,
    totalSessions: 3,
    todaySessions: 2,
    lessonsToday: 2,
    activeDays: 2,
  });
  assert.equal(localDateKey(day), "2026-10-12");
});

test("export/import round trip includes preferences and lesson results", () => {
  const progress = {
    ...addCompletion(createInitialProgress(), "math-001", result, day).progress,
    soundEnabled: false,
  };
  assert.deepEqual(parseProgress(serializeProgress(progress)), progress);
});

test("invalid imports reject malformed JSON, inflated/duplicate stars and invalid records", () => {
  assert.throws(() => parseProgress("{oops"), /JSON/);
  assert.throws(() => parseProgress('{"version":2}'), /phiên bản/);
  assert.throws(
    () =>
      parseProgress(
        JSON.stringify({ version: 1, completions: [], soundEnabled: "yes" }),
      ),
    /âm thanh/,
  );
  const valid = addCompletion(
    createInitialProgress(),
    "math-001",
    result,
    day,
  ).progress;
  const invalidFields = [
    { stars: 100 },
    { attempts: -1 },
    { localDate: "2026-02-30" },
    { completedAt: "tomorrow" },
    { lessonId: "unknown" },
    { answers: [42] },
  ];
  for (const invalid of invalidFields) {
    assert.throws(
      () =>
        parseProgress(
          JSON.stringify({
            ...valid,
            completions: [{ ...valid.completions[0], ...invalid }],
          }),
        ),
      /không hợp lệ/,
    );
  }
  assert.throws(
    () =>
      parseProgress(
        JSON.stringify({
          ...valid,
          completions: [...valid.completions, ...valid.completions],
        }),
      ),
    /sao trùng/,
  );
});

test("corrupt stored data is backed up without overwriting an older backup", () => {
  const memory = new Map<string, string>([[STORAGE_KEY, "{broken"]]);
  const storage = {
    getItem: (key: string) => memory.get(key) ?? null,
    setItem: (key: string, value: string) => {
      memory.set(key, value);
    },
  };
  const loaded = loadProgress(storage);
  assert.deepEqual(loaded.progress, createInitialProgress());
  assert.match(loaded.error ?? "", /dự phòng/);
  assert.equal(memory.get(CORRUPT_BACKUP_KEY), "{broken");
  memory.set(STORAGE_KEY, "another broken value");
  loadProgress(storage);
  assert.equal(memory.get(CORRUPT_BACKUP_KEY), "{broken");
});

test("storage quota failures give a truthful notice, without changing progress", () => {
  const storage = {
    getItem: () => null,
    setItem: () => {
      throw new Error("QuotaExceededError");
    },
  };
  const progress = addCompletion(
    createInitialProgress(),
    "math-001",
    result,
    day,
  ).progress;
  assert.match(saveProgress(storage, progress) ?? "", /Chưa lưu được/);
  assert.equal(progress.completions[0].stars, 3);
  const unavailable = {
    getItem: () => {
      throw new Error("SecurityError");
    },
    setItem: () => {},
  };
  assert.match(loadProgress(unavailable).error ?? "", /không cho đọc/);
});
