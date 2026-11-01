import { prefetchSpeech } from "../hooks/useSpeech";
import type { SubjectId } from "../types";

const warmedSubjects = new Set<SubjectId>();

/**
 * Tải ngầm trước (Warm-up) cả dữ liệu bài học (Code chunk) lẫn các câu thoại mở đầu (TTS Audio)
 * vào RAM ngay khi bé chạm tay vào thẻ môn học ở Sảnh Chính (onPointerDown) để mở bài ra là phát tiếng 0ms
 * mà không làm nặng gói tải trang ban đầu (Initial Bundle).
 */
export function warmupSubjectAudio(subject: SubjectId, soundEnabled: boolean) {
  if (!soundEnabled || warmedSubjects.has(subject)) return;
  warmedSubjects.add(subject);

  if (subject === "english") {
    void import("../data/englishLessons").then(
      ({
        getEnglishRounds,
        PRONOUN_MATCH_ROUNDS,
        MYSTERY_BAG_PROGRESSIVE_ROUNDS,
      }) => {
        const r1 = getEnglishRounds("kuromi-shop", 1)[0];
        const r2 = getEnglishRounds("kuromi-actions", 1)[0];
        const p1 = PRONOUN_MATCH_ROUNDS[1]?.[0];
        const m1 = MYSTERY_BAG_PROGRESSIVE_ROUNDS[1]?.[0]?.steps?.[0];
        if (r1?.kuromiSpeechEn) void prefetchSpeech(r1.kuromiSpeechEn, "en-US");
        if (r2?.kuromiSpeechEn) void prefetchSpeech(r2.kuromiSpeechEn, "en-US");
        if (p1?.titleEn) void prefetchSpeech(p1.titleEn, "en-US");
        if (m1?.questionEn) void prefetchSpeech(m1.questionEn, "en-US");
      },
    );
  } else if (subject === "math") {
    void import("../data/mathLessons").then(
      ({
        formatMathForSpeech,
        generateCoinMarketRounds,
        generatePizzaRounds,
      }) => {
        const pz = generatePizzaRounds(1, 1)[0];
        const cn = generateCoinMarketRounds(1, 1, "all")[0];
        if (pz?.prompt)
          void prefetchSpeech(formatMathForSpeech(pz.prompt), "vi-VN");
        if (cn?.prompt)
          void prefetchSpeech(formatMathForSpeech(cn.prompt), "vi-VN");
      },
    );
  } else if (subject === "reading") {
    void import("../data/readingLessons").then(
      ({ PICTURE_WORD_FLASHCARD_SETS, POEM_READING_LIBRARY }) => {
        const firstPoem = POEM_READING_LIBRARY[0];
        if (firstPoem?.slides?.[0]) {
          void prefetchSpeech(
            `${firstPoem.title}. ${firstPoem.slides[0].join(". ")}`,
            "vi-VN",
          );
        }
        const firstCards =
          PICTURE_WORD_FLASHCARD_SETS[0]?.cards?.slice(0, 3) || [];
        for (const c of firstCards) {
          void prefetchSpeech(c.word, "vi-VN");
        }
      },
    );
  } else if (subject === "lifeskills") {
    [
      "Con chọn 3 nguyên liệu đúng nhé!",
      "Con chạm vào từng món để sơ chế nhé!",
      "Bấm nút nấu chín và bày ra đĩa nào!",
      "Con chọn 3 đồ dùng cần chuẩn bị nhé!",
      "Con xếp các bước theo thứ tự 1, 2, 3 nhé!",
      "Giỏi quá! Nấm đã hoàn thành xuất sắc!",
    ].forEach((line) => {
      void prefetchSpeech(line, "vi-VN");
    });
  }
}
