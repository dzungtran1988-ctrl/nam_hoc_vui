import { useEffect, useMemo, useRef, useState } from "react";
import {
  Minus,
  Plus,
  RefreshCw,
  Star,
  Trash2,
  Volume2,
  Wand2,
  X,
} from "lucide-react";
import {
  BASE_COLOR_MAP,
  BASE_MIX_COLORS,
  computeMixedColor,
  SPECIAL_RECIPES,
  type BaseMixColorId,
  type MixDropSlot,
  type MixedColorResult,
} from "../data/colorMixingData";
import { useSpeech } from "../hooks/useSpeech";
import {
  playCardPlaceSound,
  playCharacterTapSound,
  playCorrectDingSound,
  playRewardTone,
} from "../lib/sound";

interface ColorMixingStudioProps {
  soundEnabled: boolean;
  onComplete: (payload: { attempts: number; answers: string[] }) => void;
}

interface MixHistoryEntry {
  id: string;
  slots: MixDropSlot[];
  result: MixedColorResult;
}

const INITIAL_SLOTS: MixDropSlot[] = [
  { colorId: "blue", drops: 2 },
  { colorId: "yellow", drops: 2 },
  { colorId: "pink", drops: 1 },
];

export function ColorMixingStudio({
  soundEnabled,
  onComplete,
}: ColorMixingStudioProps) {
  const [slots, setSlots] = useState<MixDropSlot[]>(INITIAL_SLOTS);
  // Lưu đúng bộ giọt đã tạo ra kết quả hiện tại ở "Bảng màu pha" để không bị lệch khi bé đang sửa khay trên
  const [mixedSlots, setMixedSlots] = useState<MixDropSlot[]>(INITIAL_SLOTS);
  const [mixedResult, setMixedResult] = useState<MixedColorResult>(() =>
    computeMixedColor(INITIAL_SLOTS),
  );

  // Cho phép chạm chọn trực tiếp ô số 1, 2 hoặc 3 trên khay để đổi màu đúng ô đó
  const [selectedSlotIdx, setSelectedSlotIdx] = useState<number | null>(null);
  // Con trỏ xoay vòng (0 -> 1 -> 2) khi khay đã đầy 3 màu mà bé bấm chọn màu mới liên tiếp
  const replaceCursorRef = useRef<number>(0);

  const [isSwirling, setIsSwirling] = useState(false);
  const [needsMixPulse, setNeedsMixPulse] = useState(false);
  const [activeChallengeIdx, setActiveChallengeIdx] = useState(0);
  const [solvedRecipeIds, setSolvedRecipeIds] = useState<string[]>(["mint-pastel"]);
  const [justSolvedBanner, setJustSolvedBanner] = useState<string | null>(null);

  const [history, setHistory] = useState<MixHistoryEntry[]>(() => [
    {
      id: "init-mint",
      slots: INITIAL_SLOTS,
      result: computeMixedColor(INITIAL_SLOTS),
    },
  ]);

  const speech = useSpeech(soundEnabled);
  const activeChallenge = SPECIAL_RECIPES[activeChallengeIdx % SPECIAL_RECIPES.length];

  useEffect(() => {
    if (soundEnabled) {
      speech.speak(
        "Chào mừng Nấm đến phòng Trộn Màu Sáng Tạo! Nấm hãy chọn các giọt màu và bấm Trộn Màu nhé!",
        "vi-VN",
      );
    }
  }, []);

  const totalDrops = useMemo(
    () => slots.reduce((sum, s) => sum + s.drops, 0),
    [slots],
  );

  const mixedTotalDrops = useMemo(
    () => mixedSlots.reduce((sum, s) => sum + s.drops, 0),
    [mixedSlots],
  );

  const handleSelectBaseColor = (colorId: BaseMixColorId) => {
    const base = BASE_COLOR_MAP[colorId];
    setJustSolvedBanner(null);

    setSlots((prev) => {
      const existingIdx = prev.findIndex((s) => s.colorId === colorId);

      // 1. Nếu màu này đã có sẵn trên khay -> tăng thêm 1 giọt (tối đa 5 giọt, quá 5 quay về 1)
      if (existingIdx >= 0) {
        const next = [...prev];
        const currentDrops = next[existingIdx].drops;
        next[existingIdx] = {
          ...next[existingIdx],
          drops: currentDrops < 5 ? currentDrops + 1 : 1,
        };
        setSelectedSlotIdx(existingIdx);
        return next;
      }

      // 2. Nếu người dùng đang chủ động chọn 1 ô trên khay (ô 1, ô 2 hoặc ô 3) để đổi màu
      if (selectedSlotIdx !== null && selectedSlotIdx < prev.length) {
        const next = [...prev];
        next[selectedSlotIdx] = { colorId, drops: 1 };
        // Tự động dời con trỏ sang ô kế tiếp để lần bấm sau thuận tay
        replaceCursorRef.current = (selectedSlotIdx + 1) % 3;
        return next;
      }

      // 3. Nếu khay chưa đủ 3 màu -> thêm vào ô trống tiếp theo
      if (prev.length < 3) {
        const next = [...prev, { colorId, drops: 1 }];
        setSelectedSlotIdx(next.length - 1);
        return next;
      }

      // 4. Nếu khay đã có đủ 3 màu -> xoay vòng thay thế lần lượt từ Ô 1 -> Ô 2 -> Ô 3
      const targetIdx = replaceCursorRef.current % 3;
      replaceCursorRef.current = (targetIdx + 1) % 3;
      const next = [...prev];
      next[targetIdx] = { colorId, drops: 1 };
      setSelectedSlotIdx(targetIdx);
      return next;
    });

    setNeedsMixPulse(true);
    if (soundEnabled) {
      playCardPlaceSound(slots.length);
      speech.speak(base.name, "vi-VN");
    }
  };

  const handleRemoveSlot = (slotIdx: number) => {
    setJustSolvedBanner(null);
    setSlots((prev) => prev.filter((_, idx) => idx !== slotIdx));
    setSelectedSlotIdx(null);
    setNeedsMixPulse(true);
    if (soundEnabled) {
      playCardPlaceSound(0);
    }
  };

  const handleAdjustDrops = (colorId: BaseMixColorId, delta: number) => {
    setJustSolvedBanner(null);
    setSlots((prev) => {
      const next = prev
        .map((s) =>
          s.colorId === colorId
            ? { ...s, drops: Math.max(0, Math.min(5, s.drops + delta)) }
            : s,
        )
        .filter((s) => s.drops > 0);
      return next;
    });
    setNeedsMixPulse(true);
    if (soundEnabled) {
      playCardPlaceSound(delta > 0 ? 2 : 0);
    }
  };

  const handleClearTray = () => {
    setSlots([]);
    setMixedSlots([]);
    setSelectedSlotIdx(null);
    replaceCursorRef.current = 0;
    setJustSolvedBanner(null);
    setNeedsMixPulse(false);
    setMixedResult(computeMixedColor([]));
    if (soundEnabled) {
      playCardPlaceSound(0);
      speech.speak("Đã rửa sạch khay màu! Nấm chọn màu mới nhé!", "vi-VN");
    }
  };

  const triggerMixColors = (customSlots?: MixDropSlot[]) => {
    const targetSlots = customSlots ?? slots;
    if (targetSlots.length === 0) {
      if (soundEnabled) {
        speech.speak("Nấm hãy chạm chọn ít nhất 2 màu ở bên trái trước nhé!", "vi-VN");
      }
      return;
    }

    setIsSwirling(true);
    setNeedsMixPulse(false);
    if (soundEnabled) {
      playCharacterTapSound();
    }

    window.setTimeout(() => {
      const snapshot = targetSlots.map((s) => ({ ...s }));
      const res = computeMixedColor(snapshot);
      setMixedSlots(snapshot);
      setMixedResult(res);
      setIsSwirling(false);

      // Lưu vào bộ sưu tập màu đã pha (không trùng lặp màu liên tiếp)
      if (snapshot.length >= 2) {
        setHistory((prev) => {
          const filtered = prev.filter((item) => item.result.name !== res.name);
          return [
            {
              id: `${res.id}-${Date.now()}`,
              slots: snapshot,
              result: res,
            },
            ...filtered,
          ].slice(0, 6);
        });
      }

      // Kiểm tra xem có trúng thử thách Sanrio hoặc mở khóa công thức đặc biệt không
      const matchedRecipe = SPECIAL_RECIPES.find(
        (r) => r.id === res.id || r.targetName === res.name,
      );

      if (matchedRecipe) {
        setSolvedRecipeIds((prev) =>
          prev.includes(matchedRecipe.id) ? prev : [...prev, matchedRecipe.id],
        );
      }

      if (
        res.id === activeChallenge.id ||
        res.name.toLowerCase() === activeChallenge.targetName.toLowerCase()
      ) {
        setJustSolvedBanner(`🎉 Tuyệt quá! Nấm đã pha đúng màu ${res.name}!`);
        if (soundEnabled) {
          playRewardTone();
          speech.speak(activeChallenge.successSpeech, "vi-VN");
        }
      } else {
        if (soundEnabled) {
          playCorrectDingSound();
          speech.speak(res.spokenDesc, "vi-VN");
        }
      }
    }, 440);
  };

  const handleLoadRecipeToTray = (recipeIdx: number) => {
    const recipe = SPECIAL_RECIPES[recipeIdx];
    const nextSlots = recipe.ingredients.map((ing) => ({
      colorId: ing.colorId,
      drops: ing.drops,
    }));
    setActiveChallengeIdx(recipeIdx);
    setSlots(nextSlots);
    setSelectedSlotIdx(null);
    replaceCursorRef.current = 0;
    setJustSolvedBanner(null);
    triggerMixColors(nextSlots);
  };

  const handleNextChallenge = () => {
    const nextIdx = (activeChallengeIdx + 1) % SPECIAL_RECIPES.length;
    setActiveChallengeIdx(nextIdx);
    setJustSolvedBanner(null);
    const nextChallenge = SPECIAL_RECIPES[nextIdx];
    if (soundEnabled) {
      playCardPlaceSound(nextIdx);
      speech.speak(nextChallenge.challengePrompt, "vi-VN");
    }
  };

  return (
    <div className="pastel-mix-studio-wrap">
      {/* =====================================================================
          BANNER TIÊU ĐỀ PASTEL SANRIO (ĐƯỜNG DẪN ẢNH CHUẨN /assets/...)
         ===================================================================== */}
      <div className="pastel-mix-hero-header">
        <div className="pastel-mix-hero-mascot-left">
          <img
            src="/assets/char-kitty.webp"
            alt="Hello Kitty"
            className="pastel-mix-hero-char"
          />
        </div>

        <div className="pastel-mix-hero-ribbon">
          <span className="ribbon-sparkle left">✦</span>
          <div className="ribbon-text-box">
            <h2 className="pastel-mix-main-title">Trộn Màu Sáng Tạo</h2>
            <p className="pastel-mix-sub-title">
              Khám phá sắc màu – Tạo nên điều kỳ diệu!
            </p>
          </div>
          <span className="ribbon-sparkle right">✦</span>
        </div>

        <div className="pastel-mix-hero-mascots-right">
          <img src="/assets/char-mymelody.webp" alt="My Melody" title="My Melody" />
          <img
            src="/assets/char-cinnamoroll.webp"
            alt="Cinnamoroll"
            title="Cinnamoroll"
          />
          <img src="/assets/char-kuromi.webp" alt="Kuromi" title="Kuromi" />
          <img
            src="/assets/lobby/char-5-pompompurin.webp"
            alt="Pompompurin"
            title="Pompompurin"
          />
        </div>
      </div>

      {/* =====================================================================
          BỐ CỤC 3 CỘT PASTEL DỄ NHÌN, ÍT CHỮ
         ===================================================================== */}
      <div className="pastel-mix-three-cols">
        {/* -------------------------------------------------------------------
            CỘT 1 (TRÁI): KHAY 9 MÀU GỐC (JELLY BLOBS 3D)
           ------------------------------------------------------------------- */}
        <section className="pastel-mix-card col-base-colors">
          <div className="pastel-section-header">
            <span className="section-icon-circle pink">🎨</span>
            <div>
              <h3>Màu gốc</h3>
              <small>Chạm để thêm / đổi màu</small>
            </div>
          </div>

          <div className="base-colors-3x3-grid">
            {BASE_MIX_COLORS.map((color) => {
              const slotIndex = slots.findIndex((s) => s.colorId === color.id);
              const activeSlot = slotIndex >= 0 ? slots[slotIndex] : undefined;
              const dropCount = activeSlot?.drops || 0;
              return (
                <button
                  key={color.id}
                  type="button"
                  className={`base-jelly-card ${dropCount > 0 ? "is-picked" : ""}`}
                  onClick={() => handleSelectBaseColor(color.id)}
                  title={`Chạm để thêm giọt màu ${color.name}`}
                >
                  {dropCount > 0 && (
                    <span className="picked-drop-badge">
                      Ô {slotIndex + 1} · {dropCount} giọt
                    </span>
                  )}
                  <div
                    className="jelly-paint-orb base-orb"
                    style={{
                      backgroundColor: color.hex,
                      boxShadow: `inset 0 -6px 0 ${color.shadowHex}, 0 5px 10px ${color.hex}55`,
                    }}
                  >
                    <span className="jelly-shine-large" />
                    <span className="jelly-shine-dot" />
                  </div>
                  <strong className="base-color-label">{color.name}</strong>
                </button>
              );
            })}
          </div>

          {/* Mascot Cinnamoroll cầm cọ hướng dẫn ngắn gọn ở góc trái dưới */}
          <button
            type="button"
            className="cinna-helper-footer"
            onClick={() => {
              if (soundEnabled) {
                playCharacterTapSound();
                speech.speak(
                  "Nấm chạm vào giọt màu trên khay nếu muốn đổi màu ở ô đó, hoặc bấm dấu nhân để bỏ bớt màu nhé!",
                  "vi-VN",
                );
              }
            }}
          >
            <img
              src="/assets/char-cinnamoroll.webp"
              alt="Cinnamoroll"
              className="cinna-helper-img"
            />
            <div className="cinna-speech-bubble">
              <span>Chạm ô trên khay để đổi màu, hoặc bấm × để bỏ bớt! 🖌️</span>
            </div>
          </button>
        </section>

        {/* -------------------------------------------------------------------
            CỘT 2 (GIỮA): KHAY TRỘN GIỌT MÀU + BẢNG MÀU KẾT QUẢ + LỊCH SỬ
           ------------------------------------------------------------------- */}
        <section className="pastel-mix-center-col">
          {/* KHUNG TRÊN: CHỌN MÀU TRỘN (ĐẾM SỐ GIỌT TRỰC QUAN + ĐỔI Ô DỄ DÀNG) */}
          <div className="pastel-mix-card tray-selection-card">
            <div className="pastel-pill-header blue">
              <span>🖌️ Chọn màu trộn (Chạm ô để đổi màu)</span>
              {totalDrops > 0 && (
                <small className="tray-total-drops-tag">
                  Tổng: {totalDrops} giọt
                </small>
              )}
            </div>

            <div className="wooden-pastel-palette-tray">
              {[0, 1, 2].map((slotIdx) => {
                const slot = slots[slotIdx];
                const isSlotSelected = selectedSlotIdx === slotIdx;

                if (!slot) {
                  return (
                    <button
                      key={`empty-${slotIdx}`}
                      type="button"
                      className={`palette-slot-empty ${
                        isSlotSelected ? "slot-focused" : ""
                      }`}
                      onClick={() => setSelectedSlotIdx(slotIdx)}
                      title={`Chọn màu cho ô số ${slotIdx + 1}`}
                    >
                      <div className="empty-blob-outline">
                        <span>+</span>
                      </div>
                      <small>Ô màu {slotIdx + 1}</small>
                    </button>
                  );
                }

                const color = BASE_COLOR_MAP[slot.colorId];
                const pct =
                  totalDrops > 0
                    ? Math.round((slot.drops / totalDrops) * 100)
                    : 0;
                const blobScale = 0.84 + slot.drops * 0.075;

                return (
                  <div
                    key={`${slot.colorId}-${slotIdx}`}
                    className={`palette-slot-item ${
                      isSlotSelected ? "slot-focused" : ""
                    }`}
                    onClick={() => setSelectedSlotIdx(slotIdx)}
                    title={`Chạm để chọn đổi Ô màu ${slotIdx + 1} (${color.name})`}
                  >
                    {/* Nhãn số thứ tự Ô + Nút × xóa nhanh màu này */}
                    <span className="slot-order-tag">Ô {slotIdx + 1}</span>
                    <button
                      type="button"
                      className="slot-remove-x-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveSlot(slotIdx);
                      }}
                      title={`Bỏ màu ${color.name} khỏi khay`}
                    >
                      <X size={11} strokeWidth={3} />
                    </button>

                    <div className="palette-blob-stage">
                      <div
                        className="jelly-paint-orb tray-blob"
                        style={{
                          backgroundColor: color.hex,
                          transform: `scale(${blobScale})`,
                          boxShadow: `inset 0 -8px 0 ${color.shadowHex}, 0 8px 16px ${color.hex}66`,
                        }}
                      >
                        <span className="jelly-shine-large" />
                        <span className="jelly-shine-dot" />
                      </div>
                    </div>

                    {/* Hàng chấm giọt trực quan + tỷ lệ */}
                    <div className="slot-drop-Count-pill">
                      <div className="drop-dots-row">
                        {Array.from({ length: slot.drops }).map((_, i) => (
                          <span
                            key={i}
                            className="mini-drop-dot"
                            style={{ backgroundColor: color.hex }}
                          />
                        ))}
                      </div>
                      <strong>
                        {slot.drops} giọt <small>({pct}%)</small>
                      </strong>
                    </div>

                    {/* Nút [-] [+] tròn to */}
                    <div
                      className="slot-plus-minus-row"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        className="round-step-btn minus"
                        style={{
                          backgroundColor: color.hex,
                          boxShadow: `0 2px 0 ${color.shadowHex}`,
                        }}
                        onClick={() => handleAdjustDrops(slot.colorId, -1)}
                        title="Bớt 1 giọt"
                      >
                        <Minus size={14} strokeWidth={3.5} />
                      </button>
                      <button
                        type="button"
                        className="round-step-btn plus"
                        style={{
                          backgroundColor: color.hex,
                          boxShadow: `0 2px 0 ${color.shadowHex}`,
                        }}
                        onClick={() => handleAdjustDrops(slot.colorId, 1)}
                        disabled={slot.drops >= 5}
                        title="Thêm 1 giọt"
                      >
                        <Plus size={14} strokeWidth={3.5} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* KHUNG GIỮA: BẢNG MÀU PHA (GIỌT THẠCH LỚN KẾT QUẢ) */}
          <div className="pastel-mix-card result-showcase-card">
            <div className="pastel-pill-header sky">
              <span>🎨 Bảng màu pha</span>
              {justSolvedBanner ? (
                <span className="solved-inline-tag">{justSolvedBanner}</span>
              ) : (
                needsMixPulse && (
                  <span className="solved-inline-tag">
                    ✨ Bấm &ldquo;Trộn màu&rdquo; để xem kết quả mới!
                  </span>
                )
              )}
            </div>

            <div className="result-stage-body">
              <div className="result-giant-blob-zone">
                <span className="sparkle-deco s1">✦</span>
                <span className="sparkle-deco s2">✦</span>
                <button
                  type="button"
                  className={`jelly-paint-orb giant-result-blob ${
                    isSwirling ? "swirling-mix" : ""
                  }`}
                  style={{
                    backgroundColor: mixedResult.hex,
                    boxShadow: `inset 0 -11px 0 ${mixedResult.shadowHex}, 0 12px 24px ${mixedResult.hex}77`,
                  }}
                  onClick={() => {
                    if (soundEnabled) {
                      playCharacterTapSound();
                      speech.speak(
                        `${mixedResult.name}! ${mixedResult.spokenDesc}`,
                        "vi-VN",
                      );
                    }
                  }}
                  title="Chạm để nghe tên màu"
                >
                  <span className="jelly-shine-large" />
                  <span className="jelly-shine-dot" />
                </button>
              </div>

              {/* Bóng thoại bên phải hiển thị tên màu + đúng công thức giọt đã pha ra màu đó */}
              <div className="result-callout-bubble">
                <div className="result-color-title-row">
                  <span className="result-badge-emoji">
                    {mixedResult.badgeIcon}
                  </span>
                  <strong className="result-color-name">
                    {mixedResult.name}
                  </strong>
                  <button
                    type="button"
                    className="result-speak-mini-btn"
                    onClick={() =>
                      speech.speak(
                        `${mixedResult.name}. ${mixedResult.spokenDesc}`,
                        "vi-VN",
                      )
                    }
                    title="Nghe đọc tên màu"
                  >
                    <Volume2 size={14} />
                  </button>
                </div>

                {mixedSlots.length > 0 && (
                  <div className="result-formula-mini-row">
                    {mixedSlots.map((s, idx) => {
                      const c = BASE_COLOR_MAP[s.colorId];
                      const pct =
                        mixedTotalDrops > 0
                          ? Math.round((s.drops / mixedTotalDrops) * 100)
                          : 0;
                      return (
                        <div key={s.colorId} className="formula-mini-group">
                          {idx > 0 && <span className="formula-plus">+</span>}
                          <div className="formula-mini-item">
                            <span
                              className="formula-mini-dot"
                              style={{ backgroundColor: c.hex }}
                            />
                            <small>{s.drops} giọt</small>
                            <span className="formula-pct-sub">{pct}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Thanh nút lớn: [Trộn màu] và [Xóa] */}
            <div className="result-action-buttons-row">
              <button
                type="button"
                className={`pastel-mix-main-cta ${
                  needsMixPulse ? "pulse-attention" : ""
                }`}
                onClick={() => triggerMixColors()}
              >
                <RefreshCw
                  size={18}
                  className={isSwirling ? "spin-fast" : ""}
                />
                <span>Trộn màu</span>
              </button>

              <button
                type="button"
                className="pastel-mix-clear-btn"
                onClick={handleClearTray}
              >
                <Trash2 size={16} />
                <span>Xóa</span>
              </button>
            </div>
          </div>

          {/* KHUNG DƯỚI: CÁC MÀU ĐÃ DÙNG / BỘ SƯU TẬP MÀU CỦA NẤM */}
          <div className="pastel-mix-card history-strip-card">
            <div className="history-strip-header">
              <span>💬 Các màu Nấm đã pha ({history.length})</span>
              <button
                type="button"
                className="mix-finish-star-pill"
                onClick={() =>
                  onComplete({
                    attempts: 1,
                    answers: [
                      `Khám phá và pha được ${history.length} màu kỳ diệu (${history
                        .map((h) => h.result.name)
                        .join(", ")})`,
                    ],
                  })
                }
              >
                <Star size={13} fill="currentColor" /> Nhận Sao!
              </button>
            </div>

            <div className="history-items-scroll">
              {history.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="history-recipe-pill"
                  onClick={() => {
                    setSlots(item.slots);
                    setMixedSlots(item.slots);
                    setMixedResult(item.result);
                    setNeedsMixPulse(false);
                    if (soundEnabled) {
                      playCardPlaceSound(1);
                      speech.speak(item.result.name, "vi-VN");
                    }
                  }}
                  title={`Xem lại công thức màu ${item.result.name}`}
                >
                  <div className="history-ing-dots">
                    {item.slots.map((s, i) => (
                      <span key={s.colorId} className="history-dot-wrap">
                        {i > 0 && <small>+</small>}
                        <span
                          className="h-dot"
                          style={{
                            backgroundColor: BASE_COLOR_MAP[s.colorId].hex,
                          }}
                        />
                      </span>
                    ))}
                  </div>
                  <span className="history-arrow">➔</span>
                  <span
                    className="h-dot result"
                    style={{ backgroundColor: item.result.hex }}
                  />
                  <strong className="history-result-name">
                    {item.result.name}
                  </strong>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------------
            CỘT 3 (PHẢI): THỬ THÁCH SANRIO + GỢI Ý MỘT SỐ MÀU ĐẶC BIỆT (ÍT CHỮ)
           ------------------------------------------------------------------- */}
        <section className="pastel-mix-card col-recipes-guide">
          {/* KHỐI 1: THỬ THÁCH ĐỐ VUI NGẮN GỌN CÙNG BẠN SANRIO */}
          <div className="sanrio-challenge-box">
            <div className="challenge-top-row">
              <span className="challenge-badge-tag">
                <Wand2 size={13} /> Đố vui pha màu
              </span>
              <button
                type="button"
                className="challenge-next-btn"
                onClick={handleNextChallenge}
              >
                Đổi màu khác ↻
              </button>
            </div>

            <div
              className="challenge-mascot-card"
              onClick={() => {
                if (soundEnabled) {
                  playCharacterTapSound();
                  speech.speak(activeChallenge.challengePrompt, "vi-VN");
                }
              }}
            >
              <img
                src={activeChallenge.mascotAvatar}
                alt={activeChallenge.mascotName}
                className="challenge-mascot-img"
              />
              <div className="challenge-prompt-content">
                <p className="challenge-short-text">
                  {activeChallenge.challengePrompt}
                </p>
                <div className="challenge-target-preview">
                  <span
                    className="challenge-target-blob"
                    style={{
                      backgroundColor: activeChallenge.targetHex,
                      boxShadow: `inset 0 -3px 0 ${activeChallenge.targetShadowHex}`,
                    }}
                  />
                  <strong>
                    {activeChallenge.badgeIcon} {activeChallenge.targetName}
                  </strong>
                  <Volume2 size={13} className="challenge-speaker-icon" />
                </div>
              </div>
            </div>
          </div>

          {/* KHỐI 2: GỢI Ý MỘT SỐ MÀU ĐẶC BIỆT (TRỰC QUAN BẰNG HÌNH GIỌT MÀU) */}
          <div className="special-recipes-box">
            <div className="special-recipes-header">
              <span>🌈 Gợi ý một số màu đặc biệt</span>
              <small>Chạm để thử ngay!</small>
            </div>

            <div className="special-recipes-list">
              {SPECIAL_RECIPES.map((recipe, idx) => {
                const isSolved = solvedRecipeIds.includes(recipe.id);
                const totalR = recipe.ingredients.reduce(
                  (s, ing) => s + ing.drops,
                  0,
                );

                return (
                  <button
                    key={recipe.id}
                    type="button"
                    className={`special-recipe-row-card ${
                      activeChallenge.id === recipe.id ? "active-challenge" : ""
                    }`}
                    onClick={() => handleLoadRecipeToTray(idx)}
                    title={`Chạm để pha thử màu ${recipe.targetName}`}
                  >
                    <div className="recipe-ingredients-side">
                      {recipe.ingredients.map((ing, i) => {
                        const c = BASE_COLOR_MAP[ing.colorId];
                        const pct = Math.round((ing.drops / totalR) * 100);
                        return (
                          <div key={ing.colorId} className="recipe-ing-unit">
                            {i > 0 && (
                              <span className="recipe-plus-sign">+</span>
                            )}
                            <div className="recipe-ing-col">
                              <span
                                className="recipe-mini-jelly"
                                style={{
                                  backgroundColor: c.hex,
                                  boxShadow: `inset 0 -3px 0 ${c.shadowHex}`,
                                }}
                              />
                              <small className="recipe-drop-txt">
                                {ing.drops} giọt
                              </small>
                              <span className="recipe-pct-tiny">{pct}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <span className="recipe-arrow-icon">➔</span>

                    <div className="recipe-result-side">
                      <div
                        className="recipe-result-jelly"
                        style={{
                          backgroundColor: recipe.targetHex,
                          boxShadow: `inset 0 -4px 0 ${recipe.targetShadowHex}`,
                        }}
                      >
                        <span className="jelly-shine-dot" />
                        {isSolved && <span className="recipe-solved-star">★</span>}
                      </div>
                      <strong className="recipe-target-label">
                        {recipe.targetName}
                      </strong>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mascot Hello Kitty cầm bảng màu góc phải dưới */}
          <div className="kitty-corner-cheer">
            <div className="kitty-corner-bubble">
              <span>Thử trộn thêm màu nữa nhé! ✨</span>
            </div>
            <img
              src="/assets/char-kitty.webp"
              alt="Hello Kitty"
              className="kitty-corner-img"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
