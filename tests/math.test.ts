import test from "node:test";
import assert from "node:assert/strict";
import {
  COIN_MARKET_ROUNDS,
  KAWAII_ITEM_IMAGES,
  KAWAII_PASTRY_CATALOG,
  MATH_MINI_GAMES,
  PIZZA_ROUNDS_BY_LEVEL,
  buildArithmeticTable,
  formatMathForSpeech,
  generateBakeryOrders,
  generateCoinMarketRounds,
  generateHiddenTableIndices,
  generatePizzaRounds,
  type MathDifficultyLevel,
  type TableOperation,
} from "../src/data/mathLessons.ts";
import {
  getEnglishRounds,
  MYSTERY_BAG_PROGRESSIVE_ROUNDS,
} from "../src/data/englishLessons.ts";
import { STORY_BOOKS } from "../src/data/storyBooks.ts";

test("KAWAII_PASTRY_CATALOG has 131 cleanly extracted 3D kawaii item PNGs (with Vietnamese name, English name, and icon) and 4 mini-games", () => {
  assert.equal(KAWAII_PASTRY_CATALOG.length, 131);
  const lifeskillsItems = KAWAII_PASTRY_CATALOG.filter(
    (p) => p.themeGroup === "lifeskills",
  );
  assert.equal(lifeskillsItems.length, 24);
  for (const pastry of KAWAII_PASTRY_CATALOG) {
    assert.ok(pastry.name && pastry.name.trim().length > 0, `Missing Vietnamese name for ${pastry.id}`);
    assert.ok(pastry.englishName && pastry.englishName.trim().length > 0, `Missing English name for ${pastry.id}`);
    assert.ok(pastry.icon && pastry.icon.trim().length > 0, `Missing icon for ${pastry.id}`);
    assert.ok(
      pastry.imageUrl.startsWith("/assets/items/") ||
        pastry.imageUrl.startsWith("/assets/math/pastries16/pastry16_"),
    );
    assert.ok(pastry.imageUrl.endsWith(".png"));
  }
  assert.equal(MATH_MINI_GAMES.length, 4);
  assert.ok(KAWAII_ITEM_IMAGES.pizzaSlice.endsWith(".png"));
  assert.ok(KAWAII_ITEM_IMAGES.bakeryBasket.endsWith(".png"));
  assert.ok(KAWAII_ITEM_IMAGES.goldCoin.endsWith(".png"));
});

test("generateBakeryOrders produces Level 1 counting, Level 2 missing-operand equations (3 + ? = 5, 10 − ? = 4), and Level 3 dual order + total sum", () => {
  const l1 = generateBakeryOrders(1, 0);
  assert.equal(l1.length, 6);
  assert.equal(l1[0].mode, "single");
  assert.equal(l1.some((o) => o.targetCountA > o.initialCountA), true);
  assert.equal(l1.some((o) => o.targetCountA < o.initialCountA), true);

  const l2 = generateBakeryOrders(2, 0);
  assert.ok(l2.length >= 6, `L2 should have at least 6 orders, got ${l2.length}`);
  assert.equal(l2[0].mode, "equation");
  // Dữ liệu L2 giờ random nên chỉ kiểm tra cấu trúc, không hard-code prompt
  assert.ok(l2[0].equationPrompt && l2[0].equationPrompt.includes("?"));
  assert.ok(l2[0].missingOperand >= 1 && l2[0].missingOperand <= 10);
  assert.ok(l2[1].equationPrompt && l2[1].equationPrompt.includes("?"));
  assert.ok(l2[1].missingOperand >= 1 && l2[1].missingOperand <= 10);
  for (const ord of l2) {
    assert.ok(ord.missingOperand && ord.missingOperand >= 1 && ord.missingOperand <= 10);
  }

  const l3 = generateBakeryOrders(3, 0);
  assert.ok(l3.length >= 5, `L3 should have at least 5 orders, got ${l3.length}`);
  for (const ord of l3) {
    assert.equal(ord.mode, "dual");
    assert.ok(ord.pastryB);
    assert.equal(ord.totalTargetCount, ord.targetCountA + (ord.targetCountB || 0));
    assert.ok(ord.totalTargetCount >= 1 && ord.totalTargetCount <= 10);
  }
});

test("PIZZA_ROUNDS_BY_LEVEL (Comparison < > =) and COIN_MARKET_ROUNDS have mathematically valid rounds", () => {
  const levels: MathDifficultyLevel[] = [1, 2, 3];
  for (const lvl of levels) {
    for (const pz of PIZZA_ROUNDS_BY_LEVEL[lvl]) {
      if (pz.expectedSign === "=") {
        assert.equal(pz.leftCount, pz.rightCount);
      } else if (pz.expectedSign === "<") {
        assert.ok(pz.leftCount < pz.rightCount);
      } else {
        assert.ok(pz.leftCount > pz.rightCount);
      }
      if (pz.leftExprParts) {
        const computed =
          pz.leftExprParts.op === "+"
            ? pz.leftExprParts.a + pz.leftExprParts.b
            : pz.leftExprParts.a - pz.leftExprParts.b;
        assert.equal(computed, pz.leftCount);
      }
    }
    for (const cm of COIN_MARKET_ROUNDS[lvl]) {
      const sumPrices = cm.items.reduce((s, item) => s + item.price, 0);
      if (cm.mode === "pay") {
        assert.equal(cm.targetCoinsTotal, sumPrices);
      } else {
        assert.equal(cm.targetCoinsTotal, (cm.customerPaid || 0) - sumPrices);
      }
    }
  }
});

test("buildArithmeticTable generates 9 accurate rows for +, -, ×, ÷ from 1 to 9 and formatMathForSpeech normalizes Vietnamese operators", () => {
  const ops: TableOperation[] = ["add", "sub", "mul", "div"];
  for (const op of ops) {
    for (let base = 1; base <= 9; base++) {
      const rows = buildArithmeticTable(op, base);
      assert.equal(rows.length, 9);
      for (const r of rows) {
        if (op === "add") {
          assert.equal(r.a + r.b, r.answer);
          assert.ok(r.spokenFull.includes("cộng"));
        }
        if (op === "sub") {
          assert.equal(r.a - r.b, r.answer);
          assert.ok(r.spokenFull.includes("trừ"));
        }
        if (op === "mul") {
          assert.equal(r.a * r.b, r.answer);
          assert.ok(r.spokenFull.includes("nhân"));
        }
        if (op === "div") {
          assert.equal(r.a / r.b, r.answer);
          assert.ok(r.spokenFull.includes("chia"));
        }
      }
    }
  }
  assert.equal(formatMathForSpeech("5 − 2 = 3"), "5 trừ 2 bằng 3");
  assert.equal(formatMathForSpeech("2 × 4 = 8"), "2 nhân 4 bằng 8");
  assert.equal(formatMathForSpeech("6 ÷ 2 = 3"), "6 chia 2 bằng 3");
  assert.equal(formatMathForSpeech("5 > 3"), "5 lớn hơn 3");
  assert.equal(formatMathForSpeech("2 < 6"), "2 bé hơn 6");
});

test("Math and English dynamic session generators shuffle rounds & items and avoid consecutive duplicates", () => {
  const bakeryS1 = generateBakeryOrders(1, 1);
  const bakeryS2 = generateBakeryOrders(1, 2);
  assert.equal(bakeryS1.length, 6);
  assert.equal(bakeryS2.length, 6);
  assert.notDeepEqual(
    bakeryS1.map((o) => `${o.id}:${o.pastryA.id}`),
    bakeryS2.map((o) => `${o.id}:${o.pastryA.id}`),
  );

  const pizzaS1 = generatePizzaRounds(1, 1);
  const pizzaS2 = generatePizzaRounds(1, 2);
  assert.equal(pizzaS1.length, 6);
  assert.equal(pizzaS2.length, 6);
  assert.notDeepEqual(
    pizzaS1.map((p) => `${p.id}:${p.itemName}`),
    pizzaS2.map((p) => `${p.id}:${p.itemName}`),
  );

  const coinS1 = generateCoinMarketRounds(1, 1);
  const coinS2 = generateCoinMarketRounds(1, 2);
  assert.equal(coinS1.length, 6);
  assert.equal(coinS2.length, 6);
  assert.notDeepEqual(
    coinS1.map((c) => `${c.id}:${c.items[0].pastry.id}`),
    coinS2.map((c) => `${c.id}:${c.items[0].pastry.id}`),
  );

  const hiddenL2 = generateHiddenTableIndices(2, 1);
  assert.ok(hiddenL2.length >= 4, `Hidden indices L2 should have at least 4, got ${hiddenL2.length}`);

  const engS1 = getEnglishRounds("kuromi-shop", 1);
  const engS2 = getEnglishRounds("kuromi-shop", 1);
  assert.equal(engS1.length, 8);
  assert.equal(engS2.length, 8);
  assert.notDeepEqual(
    engS1.map((r) => r.id),
    engS2.map((r) => r.id),
  );
  for (let i = 1; i < engS1.length; i++) {
    assert.notEqual(engS1[i].correctItemId, engS1[i - 1].correctItemId);
  }
});

import fs from "node:fs";
import path from "node:path";
import {
  NAM_SPECIAL_STICKERS,
  LIFESKILLS_STICKER_SETS,
  awardNamStickerOnCupOpen,
  createDefaultStickerStore,
} from "../src/data/rewardStickers.ts";
import {
  SHARED_ASSET_CATALOG,
  LIFESKILLS_SHARED_ASSETS,
  REUSABLE_FRAME_AND_SCENE_VAULT,
  querySharedAssets,
  getSharedAssetById,
  recommendAssetsForIdea,
} from "../src/data/sharedAssetCatalog.ts";
import {
  PICTURE_WORD_FLASHCARD_SETS,
  drawRandomFlashcardsForSet,
} from "../src/data/readingLessons.ts";

test("STORY_BOOKS includes Frozen story (9 pages) and 3 comprehension questions per story", () => {
  assert.equal(STORY_BOOKS.length, 10);
  const frozen = STORY_BOOKS.find((b) => b.id === "nam-frozen-elsa");
  assert.ok(frozen);
  assert.equal(frozen.pages.length, 9);
  assert.equal(frozen.questions.length, 3);

  for (const story of STORY_BOOKS) {
    assert.ok(story.questions.length >= 2 && story.questions.length <= 3);
    for (const q of story.questions) {
      assert.equal(q.options.length, 3);
      assert.ok(q.options.includes(q.answer), `Answer "${q.answer}" missing in options for ${story.id}`);
      if (q.pageRef !== undefined) {
        assert.ok(q.pageRef >= 1 && q.pageRef <= story.pages.length);
      }
    }
  }
});

test("NAM_SPECIAL_STICKERS has 38 extracted Bé Nấm PNGs on disk, enforces Hard Food Voucher Cup milestone, and injects Bé Nấm into English rounds", () => {
  assert.equal(NAM_SPECIAL_STICKERS.length, 39);
  for (const stk of NAM_SPECIAL_STICKERS) {
    const cleanRelPath = stk.image.split("?")[0];
    const absPath = path.join(process.cwd(), "public", cleanRelPath);
    assert.ok(fs.existsSync(absPath), `Missing sticker file: ${absPath}`);
    if (stk.tier === "food") {
      assert.ok(stk.momRewardVoucher && stk.momRewardVoucher.length > 10);
    }
  }

  // Cúp Vàng đầu tiên (completedCycles = 1, totalCups = 1) -> luôn tặng Sticker Nấm Học Tập (study), chưa mở đồ ăn hiếm
  const store1 = createDefaultStickerStore();
  store1.reading.completedCycles = 1;
  const res1 = awardNamStickerOnCupOpen(store1, "reading");
  assert.equal(res1.isHardFoodReward, false);
  assert.equal(res1.sticker.tier, "study");

  // Cúp Vàng cấp 2 (completedCycles = 2): trong Node test env không có localStorage
  // → unlockedStudyCount = 0 → chưa đạt mốc 6 study stickers → vẫn nhận study, chưa mở food
  const store2 = createDefaultStickerStore();
  store2.reading.completedCycles = 2;
  const res2 = awardNamStickerOnCupOpen(store2, "reading");
  assert.equal(res2.isHardFoodReward, false);
  assert.equal(res2.sticker.tier, "study");

  // Kiểm tra câu hỏi Tiếng Anh Cấp 3 có mẫu câu Bé Nấm, và Tiệm Tạp Hóa Kuromi phân tách 3 Cấp độ chuẩn xác
  const shopLv1 = getEnglishRounds("kuromi-shop", 1);
  for (const r of shopLv1) {
    assert.equal(r.level, 1);
    for (const it of r.items) {
      // Cho phép dấu ngoặc chỉ khi chứa tên tiếng Anh gốc (VD: "Cối xay gió Hà Lan (Windmill)", "Đất nước Mỹ (America / USA)")
      const hasParens = it.vietnameseName.includes("(");
      const parensIsEnglishGloss = /\([A-Za-z][A-Za-z\s/]+\)/.test(it.vietnameseName);
      assert.ok(
        !hasParens || parensIsEnglishGloss,
        `Level 1 shop item should not have redundant parentheses: ${it.vietnameseName}`,
      );
      // "Orange" is also a fruit/food name, not just a color — exclude "Orange juice" etc.
      const hasColorPrefix = /^(Red|Yellow|Blue|Pink|Green|Purple|Orange)\s+/i.test(it.englishName);
      const isOrangeFoodItem = /^Orange\s+(juice|cake|candy|jam|jelly|soda|ice cream)/i.test(it.englishName);
      assert.ok(
        !hasColorPrefix || isOrangeFoodItem,
        `Level 1 shop item should be a core noun without color prefix: ${it.englishName}`,
      );
    }
  }

  const shopLv2 = getEnglishRounds("kuromi-shop", 2);
  for (const r of shopLv2) {
    assert.equal(r.level, 2);
    const right = r.items.find((it) => it.id === r.correctItemId);
    assert.ok(right);
    assert.ok(
      right.englishName.trim().split(/\s+/).length >= 2,
      `Level 2 shop item should be an Adjective + Noun phrase: ${right.englishName}`,
    );
  }

  for (const lv of [1, 2, 3] as const) {
    const bagRounds = MYSTERY_BAG_PROGRESSIVE_ROUNDS[lv];
    assert.equal(bagRounds.length, 6, `Mystery bag level ${lv} should have 6 rounds`);
    for (const mb of bagRounds) {
      assert.ok(
        mb.targetImage.startsWith("/assets/items/"),
        `Mystery bag targetImage should be a real 3D object, not a flat shape: ${mb.targetImage}`,
      );
      assert.equal(mb.steps.length, 3);
    }
  }

  const shopLv3 = getEnglishRounds("kuromi-shop", 3);
  for (const r of shopLv3) {
    assert.equal(r.level, 3);
    const right = r.items.find((it) => it.id === r.correctItemId);
    assert.ok(right);
    // Bỏ qua thematic rounds (Bé Nấm / Pochacco sentence) không có quantity
    if (r.id.startsWith("thm-round-")) continue;
    assert.ok(
      (right.quantity || 1) >= 2,
      `Level 3 shop target item should have quantity >= 2: ${right.englishName}`,
    );
    assert.ok(
      /^(Two|Three)\s+/i.test(right.englishName),
      `Level 3 shop target item should start with Two/Three: ${right.englishName}`,
    );
  }
});

test("SHARED_ASSET_CATALOG provides unified rich metadata for all 115 3D items and powers LifeSkills Stickers, Reading Flashcards, English Actions, and Math", () => {
  assert.equal(SHARED_ASSET_CATALOG.length, 131);
  assert.equal(LIFESKILLS_SHARED_ASSETS.length, 24);

  for (const item of SHARED_ASSET_CATALOG) {
    assert.ok(item.readingWordVi.length >= 2, `Missing readingWordVi for ${item.id}`);
    assert.ok(item.syllablesVi.length >= 1, `Missing syllablesVi for ${item.id}`);
    assert.ok(item.pronunciationIpa.startsWith("/"), `Invalid IPA for ${item.id}`);
    assert.ok(item.activityLabelVi.length > 0, `Missing activityLabelVi for ${item.id}`);
    assert.ok(item.activityPhraseEn.length > 0, `Missing activityPhraseEn for ${item.id}`);
    assert.ok(item.soundLabelVi.length > 0, `Missing soundLabelVi for ${item.id}`);
    assert.ok(item.usedInSubjects.length >= 3, `Missing usedInSubjects for ${item.id}`);
    assert.ok(item.searchKeywords.length >= 5, `Missing searchKeywords for ${item.id}`);
  }

  // Kiểm tra truy vấn đa chiều (tiếng Việt, tiếng Anh, màu sắc, hoạt động)
  const ramenMatches = querySharedAssets({
    themeGroup: "lifeskills",
    searchText: "ramen",
  });
  assert.ok(ramenMatches.some((a) => a.id === "ls-ramen-bowl"));

  const cuttingBoard = getSharedAssetById("ls-cutting-board");
  assert.ok(cuttingBoard);
  assert.equal(cuttingBoard.readingWordVi, "THỚT GỖ");

  // Kiểm tra 4 Bộ Sticker Kỹ Năng Sống (4 × 6 = 24 đồ bếp & món ngon 3D mới)
  assert.equal(LIFESKILLS_STICKER_SETS[1].length, 6);
  assert.equal(LIFESKILLS_STICKER_SETS[2].length, 6);
  assert.equal(LIFESKILLS_STICKER_SETS[3].length, 6);
  assert.equal(LIFESKILLS_STICKER_SETS[4].length, 6);

  // Kiểm tra Học Đọc Tiếng Việt có 10 chủ đề Thẻ Chữ lớn (mỗi chủ đề rút 5 thẻ ngang từ kho >= 15 ảnh 3D)
  assert.equal(PICTURE_WORD_FLASHCARD_SETS.length, 10);
  const kitchenSet = PICTURE_WORD_FLASHCARD_SETS.find(
    (s) => s.id === "fc-kitchen",
  );
  assert.ok(kitchenSet);
  assert.equal(kitchenSet.cardPool.length, 24);
  for (const set of PICTURE_WORD_FLASHCARD_SETS) {
    assert.equal(set.cards.length, 5);
    assert.ok(set.cardPool.length >= 10, `Expected cardPool >= 10 for ${set.id}`);
    const firstDraw = drawRandomFlashcardsForSet(set.id, 5);
    assert.equal(firstDraw.length, 5);
    const secondDraw = drawRandomFlashcardsForSet(
      set.id,
      5,
      firstDraw.map((c) => c.id),
    );
    assert.equal(secondDraw.length, 5);
    for (const card of secondDraw) {
      assert.ok(
        !firstDraw.some((prev) => prev.id === card.id),
        `Expected non-overlapping draw for ${set.id}`,
      );
      assert.ok(card.imageUrl?.startsWith("/assets/"));
      assert.ok(card.englishName && card.pronunciationIpa);
    }
  }

  // Kiểm tra Tiếng Anh kuromi-actions Cấp 2 tích hợp câu hỏi cụm động từ từ 24 Đồ Bếp 3D
  const actionRoundsLv2 = Array.from({ length: 6 }, () =>
    getEnglishRounds("kuromi-actions", 2),
  ).flat();
  assert.ok(actionRoundsLv2.some((r) => r.id.startsWith("dyn-act-all-l2-ls-")));

  // Kiểm tra Kho Khung Bảng & Bối Cảnh Tái Sử Dụng (cả active & archived_reusable đều tồn tại trên ổ đĩa)
  assert.ok(REUSABLE_FRAME_AND_SCENE_VAULT.length >= 14);
  assert.ok(
    REUSABLE_FRAME_AND_SCENE_VAULT.some((f) => f.status === "archived_reusable"),
  );
  for (const frame of REUSABLE_FRAME_AND_SCENE_VAULT) {
    const absFramePath = path.join(process.cwd(), "public", frame.imageUrl);
    assert.ok(
      fs.existsSync(absFramePath),
      `Missing frame/scene file on disk: ${absFramePath}`,
    );
  }

  // Kiểm tra hàm gợi ý tài nguyên tự động khi lên ý tưởng mới (recommendAssetsForIdea)
  const rec = recommendAssetsForIdea("kho báu siêu thị bánh ngọt");
  assert.ok(rec.matchingFramesAndScenes.length > 0);
  assert.ok(rec.matchingItems3D.length > 0);
});

import {
  ENGLISH_SONG_LESSONS,
  getEnglishSongLessonForClip,
} from "../src/data/englishSongLessons.ts";

test("ENGLISH_SONG_LESSONS provides ground-truth song/story lessons with synced subtitles, vocab cards, and valid 3D images", () => {
  assert.ok(ENGLISH_SONG_LESSONS.length >= 8);

  for (const lesson of ENGLISH_SONG_LESSONS) {
    assert.ok(lesson.subtitles.length >= 5, `Too few subtitles in ${lesson.filenameKey}`);
    assert.ok(lesson.vocabCards.length >= 4, `Too few vocabCards in ${lesson.filenameKey}`);
    assert.ok(lesson.quizRounds.length >= 2, `Too few quizRounds in ${lesson.filenameKey}`);

    for (const card of lesson.vocabCards) {
      const absImg = path.join(process.cwd(), "public", card.imageUrl);
      assert.ok(fs.existsSync(absImg), `Missing vocab image ${absImg} in ${lesson.filenameKey}`);
      assert.ok(card.endSec > card.startSec, `Invalid cue timing in ${card.id}`);
    }

    for (const round of lesson.quizRounds) {
      assert.ok(
        round.options.some((opt) => opt.id === round.correctOptionId),
        `Missing correctOptionId ${round.correctOptionId} in ${round.id}`,
      );
      for (const opt of round.options) {
        const absImg = path.join(process.cwd(), "public", opt.imageUrl);
        assert.ok(fs.existsSync(absImg), `Missing quiz option image ${absImg} in ${round.id}`);
      }
    }
  }

  // Kiểm tra ánh xạ clip 07 và 08 là truyện hội thoại ("story")
  const clip7 = getEnglishSongLessonForClip(
    "07 - Bài hát Tiếng Anh Vui Nhộn (Tập 3).mp4",
    "07",
    6,
  );
  assert.equal(clip7.clipType, "story");
  assert.equal(clip7.displayTitle, "Truyện: Open The Door!");

  const clip8 = getEnglishSongLessonForClip(
    "08 - Kể chuyện Tiếng Anh Hay Cho Bé.mp4",
    "08",
    7,
  );
  assert.equal(clip8.clipType, "story");
  assert.equal(clip8.displayTitle, "Truyện: Do You Like Carrots?");
});




