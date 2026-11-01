import test from "node:test";
import assert from "node:assert/strict";
import {
  buildCommandCard,
  completeListeningPhase,
  createInitialPochaccoStats,
  createPochaccoSession,
  generatePochaccoDeck,
  getPublicPromptView,
  loadPochaccoStats,
  nextPochaccoRound,
  POCHACCO_STORAGE_KEY,
  recordCompletedPochaccoGame,
  retryCurrentRound,
  skipPochaccoRound,
  startPochaccoSession,
  submitPochaccoChoice,
  togglePausePochacco,
  TOTAL_POCHACCO_ROUNDS,
} from "../src/lib/pochaccoGame.ts";
import { POCHACCO_ACTION_BANK } from "../src/data/pochaccoCommands.ts";

test("generatePochaccoDeck creates 10 commands and guarantees both command types appear", () => {
  for (let seed = 1; seed <= 10; seed++) {
    let s = seed;
    const deterministicRng = () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
    const deck = generatePochaccoDeck(
      POCHACCO_ACTION_BANK,
      TOTAL_POCHACCO_ROUNDS,
      deterministicRng,
    );
    assert.equal(deck.length, 10);

    const pochaccoSaysCount = deck.filter(
      (c) => c.commandType === "pochacco_says",
    ).length;
    const directCommandCount = deck.filter(
      (c) => c.commandType === "direct_command",
    ).length;

    assert.ok(pochaccoSaysCount >= 3, "Must have at least 3 'Pochacco bảo' commands");
    assert.ok(directCommandCount >= 3, "Must have at least 3 direct commands");

    for (const card of deck) {
      if (card.commandType === "pochacco_says") {
        assert.match(card.spokenText, /^Pochacco bảo:/);
        assert.equal(card.expectedChoice, "do");
      } else {
        assert.doesNotMatch(card.spokenText, /^Pochacco bảo:/);
        assert.equal(card.expectedChoice, "freeze");
      }
    }
  }
});

test("getPublicPromptView hides expectedChoice and commandType before child selects", () => {
  const session = startPochaccoSession(createPochaccoSession());
  const publicView = getPublicPromptView(session) as Record<string, unknown>;

  assert.equal(publicView.roundNumber, 1);
  assert.equal(publicView.totalRounds, 10);
  assert.equal(typeof publicView.spokenText, "string");
  assert.equal("expectedChoice" in publicView, false);
  assert.equal("commandType" in publicView, false);
});

test("requires listening period before allowing confirmation", () => {
  const cardDo = buildCommandCard(POCHACCO_ACTION_BANK[0], "pochacco_says", 0);
  let state = startPochaccoSession(createPochaccoSession([cardDo]));

  // While still in listening phase, clicking confirm should be ignored
  assert.equal(state.phase, "listening");
  const premature = submitPochaccoChoice(state, "do");
  assert.equal(premature.score, 0);
  assert.equal(premature.phase, "listening");

  // Unlock after listening period completes
  state = completeListeningPhase(state);
  assert.equal(state.phase, "awaiting_choice");

  const confirmed = submitPochaccoChoice(state, "do");
  assert.equal(confirmed.score, 1);
  assert.equal(confirmed.phase, "feedback_correct");
});

test("wrong choice gives gentle hint, never deducts stars, and never eliminates the child", () => {
  const card1 = buildCommandCard(POCHACCO_ACTION_BANK[0], "pochacco_says", 0);
  const card2 = buildCommandCard(POCHACCO_ACTION_BANK[1], "direct_command", 1);

  let state = startPochaccoSession(createPochaccoSession([card1, card2]));
  state = completeListeningPhase(state);

  // Round 1: answer correctly -> score = 1
  state = submitPochaccoChoice(state, "do");
  assert.equal(state.score, 1);
  state = nextPochaccoRound(state);
  state = completeListeningPhase(state);

  // Round 2: command is direct_command ("freeze"), child mistakenly clicks "do"
  const wrongAttempt = submitPochaccoChoice(state, "do");
  assert.equal(wrongAttempt.phase, "feedback_hint");
  assert.equal(wrongAttempt.score, 1, "Score must not be deducted");
  assert.equal(wrongAttempt.status, "playing", "Child must not be eliminated");
  assert.match(wrongAttempt.lastFeedback ?? "", /đứng im/);

  // Child retries Round 2 and chooses "freeze" -> earns +1 star!
  const retried = retryCurrentRound(wrongAttempt);
  assert.equal(retried.phase, "awaiting_choice");
  const corrected = submitPochaccoChoice(retried, "freeze");
  assert.equal(corrected.phase, "feedback_correct");
  assert.equal(corrected.score, 2);
});

test("pause/resume, skip, and completing 10 rounds unlocks Pochacco Sticker and saves stats", () => {
  const deck = generatePochaccoDeck(POCHACCO_ACTION_BANK, 10, () => 0.42);
  let state = startPochaccoSession(createPochaccoSession(deck));

  // Pause blocks confirmation
  state = completeListeningPhase(state);
  state = togglePausePochacco(state);
  assert.equal(state.status, "paused");
  const blockedWhilePaused = submitPochaccoChoice(state, deck[0].expectedChoice);
  assert.equal(blockedWhilePaused.score, 0);

  // Resume restores playing state
  state = togglePausePochacco(state);
  assert.equal(state.status, "playing");

  // Play through all 10 rounds (mix of correct answers and 1 skip)
  for (let i = 0; i < 10; i++) {
    if (i === 4) {
      state = skipPochaccoRound(state);
      continue;
    }
    state = completeListeningPhase(state);
    const expected = state.deck[state.roundIndex].expectedChoice;
    state = submitPochaccoChoice(state, expected);
    state = nextPochaccoRound(state);
  }

  assert.equal(state.status, "completed");
  assert.equal(state.stickerEarned, true);
  assert.equal(state.score, 9);

  // Persist to storage adapter
  const memory = new Map<string, string>();
  const storage = {
    getItem: (key: string) => memory.get(key) ?? null,
    setItem: (key: string, val: string) => {
      memory.set(key, val);
    },
  };

  assert.deepEqual(loadPochaccoStats(storage), createInitialPochaccoStats());
  const saved = recordCompletedPochaccoGame(
    storage,
    state,
    new Date("2026-10-16T10:00:00.000Z"),
  );
  assert.equal(saved.gamesCompleted, 1);
  assert.equal(saved.bestScore, 9);
  assert.equal(saved.totalStarsEarned, 9);
  assert.equal(saved.stickerUnlocked, true);
  assert.equal(saved.stickerUnlockedAt, "2026-10-16T10:00:00.000Z");
  assert.ok(memory.has(POCHACCO_STORAGE_KEY));
  assert.deepEqual(loadPochaccoStats(storage), saved);
});

test("Pochacco Memory Match generates paired high-contrast object decks across levels 1, 2, 3", async () => {
  const {
    generateMemoryDeck,
    MEMORY_LEVEL_CONFIGS,
    MEMORY_OBJECT_POOL,
  } = await import("../src/lib/pochaccoMemoryGame.ts");

  assert.equal(
    MEMORY_OBJECT_POOL.length,
    115,
    "Should have 115 distinct 3D object icons excluding similar bunny pastries",
  );

  for (const level of [1, 2, 3] as const) {
    const cfg = MEMORY_LEVEL_CONFIGS[level];
    const deck = generateMemoryDeck(level, "all");
    assert.equal(deck.length, cfg.pairCount * 2);

    // Every itemId must appear exactly twice (-a and -b)
    const counts = new Map<string, number>();
    for (const card of deck) {
      counts.set(card.itemId, (counts.get(card.itemId) ?? 0) + 1);
      assert.ok(card.imageUrl.startsWith("/assets/items/"));
    }
    assert.equal(counts.size, cfg.pairCount);
    for (const [, c] of counts) {
      assert.equal(c, 2);
    }
  }
});

