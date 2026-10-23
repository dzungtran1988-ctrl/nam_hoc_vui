import test from "node:test";
import assert from "node:assert/strict";
import {
  getDifficultWordsForSlide,
  POEM_READING_LIBRARY,
  shuffleArray,
} from "../src/data/readingLessons.ts";
import {
  addCompletion,
  createInitialProgress,
  parseProgress,
  serializeProgress,
} from "../src/lib/progress.ts";

test("POEM_READING_LIBRARY has 10 poems (5 short Level 1, 5 long 3-stanza Level 2) with 3 questions each and difficult words per stanza", () => {
  assert.equal(POEM_READING_LIBRARY.length, 10);

  const level1Poems = POEM_READING_LIBRARY.filter((p) => p.level === 1);
  const level2Poems = POEM_READING_LIBRARY.filter((p) => p.level === 2);

  assert.equal(level1Poems.length, 5);
  assert.equal(level2Poems.length, 5);

  for (const poem of level2Poems) {
    assert.equal(poem.slides.length, 3, `${poem.id} should have 3 stanzas`);
    for (const stanza of poem.slides) {
      assert.equal(stanza.length, 4, `${poem.id} stanzas should have 4 lines`);
    }
  }

  for (const poem of POEM_READING_LIBRARY) {
    for (let sIdx = 0; sIdx < poem.slides.length; sIdx++) {
      const difficult = getDifficultWordsForSlide(poem.id, sIdx);
      assert.ok(
        difficult.length >= 2,
        `${poem.id} slide ${sIdx} should have at least 2 difficult words`,
      );
      for (const dw of difficult) {
        assert.ok(dw.word.length > 0 && dw.tip.length > 0);
      }
    }

    assert.equal(poem.questions.length, 3, `${poem.id} should have 3 questions`);
    const types = poem.questions.map((q) => q.type);
    assert.deepEqual(types, ["comprehension", "fill_blank", "life_skill"]);

    for (const q of poem.questions) {
      assert.ok(
        q.evidenceSlideIndex >= 0 && q.evidenceSlideIndex < poem.slides.length,
        `Valid evidenceSlideIndex for ${q.id}`,
      );
      const stanza = poem.slides[q.evidenceSlideIndex];
      assert.ok(
        q.evidenceLineIndex >= 0 && q.evidenceLineIndex < stanza.length,
        `Valid evidenceLineIndex for ${q.id}`,
      );
      assert.ok(
        q.correctIndex >= 0 && q.correctIndex < q.choices.length,
        `Valid correctIndex for ${q.id}`,
      );
      if (q.type === "fill_blank") {
        assert.ok(
          q.blankLinePreview?.includes("[ ___ ]"),
          `fill_blank question ${q.id} should contain [ ___ ] placeholder`,
        );
      }
    }
  }
});

test("shuffleArray preserves all elements without mutating original array", () => {
  const original = ["A", "B", "C"];
  const mixed = shuffleArray(original, 2);
  assert.deepEqual(original, ["A", "B", "C"]);
  assert.equal(mixed.length, 3);
  assert.deepEqual([...mixed].sort(), ["A", "B", "C"]);
});

test("progress.ts stores and round-trips poem reading metadata (activityId, hintsUsed, independentResult)", () => {
  const day = new Date(2026, 9, 18, 10, 0);
  const { progress } = addCompletion(
    createInitialProgress(),
    "reading-001",
    {
      attempts: 3,
      answers: ["C1: Em mèo", "C2: rửa mặt", "C3: Nói con chào mẹ ạ"],
      activityId: "poem-01",
      skillIds: [
        "poem-line-spotlight",
        "poem-reading-comprehension",
        "poem-fill-blank",
        "poem-life-skill",
      ],
      hintsUsed: 1,
      independentResult: "assisted",
      completionSource: "system-checked",
    },
    day,
  );

  const roundTripped = parseProgress(serializeProgress(progress));
  assert.equal(roundTripped.completions.length, 1);
  assert.equal(roundTripped.completions[0].attempts, 3);
  assert.equal(roundTripped.completions[0].activityId, "poem-01");
  assert.equal(roundTripped.completions[0].hintsUsed, 1);
  assert.equal(roundTripped.completions[0].independentResult, "assisted");
});
