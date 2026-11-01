import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Star,
} from "lucide-react";
import type { StoryPage } from "../data/storyBooks";
import {
  generateStoryHiddenRounds,
  type HiddenItemRoundConfig,
  type HiddenItemTarget,
} from "../data/hiddenItemGameData";
import {
  playCardPlaceSound,
  playCorrectDingSound,
  playGoldenCupFanfare,
  playRewardTone,
  playStickerPeelStickSound,
} from "../lib/sound";
import {
  ParticleBurstCanvas,
  type ParticleBurstHandle,
} from "./ParticleBurstCanvas";

export interface HiddenItemGameProps {
  bookTitle: string;
  pages: StoryPage[];
  soundEnabled: boolean;
  onBackToStory: () => void;
  onCompleteGame: (summary: { attempts: number; answers: string[] }) => void;
  onReaction?: (mood: "happy" | "sad", message?: string) => void;
}

interface TapRipple {
  id: number;
  x: number;
  y: number;
}

export function HiddenItemGame({
  bookTitle,
  pages,
  soundEnabled,
  onBackToStory,
  onCompleteGame,
  onReaction,
}: HiddenItemGameProps) {
  const [rounds, setRounds] = useState<HiddenItemRoundConfig[]>(() =>
    generateStoryHiddenRounds(pages),
  );
  const [roundIdx, setRoundIdx] = useState(0);
  const [foundIds, setFoundIds] = useState<string[]>([]);
  const [justFoundId, setJustFoundId] = useState<string | null>(null);
  const [hintActive, setHintActive] = useState(false);
  const [ripples, setRipples] = useState<TapRipple[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [collectedLog, setCollectedLog] = useState<string[]>([]);
  const [praiseText, setPraiseText] = useState<string>(
    "🔍 Nấm tinh mắt tìm đủ 3 đồ vật trốn trong tranh nhé!",
  );

  const burstRef = useRef<ParticleBurstHandle | null>(null);
  const imageBoxRef = useRef<HTMLDivElement | null>(null);
  const autoNextTimerRef = useRef<number | null>(null);

  const currentRound = rounds[roundIdx] || rounds[0];
  const isRoundComplete =
    currentRound && foundIds.length >= currentRound.items.length;
  const isAllComplete =
    roundIdx === rounds.length - 1 && Boolean(isRoundComplete);

  useEffect(() => {
    setFoundIds([]);
    setJustFoundId(null);
    setHintActive(false);
    setPraiseText(
      `🔍 Vòng ${roundIdx + 1}/${rounds.length}: Tìm 3 đồ vật ẩn trong tranh nhé!`,
    );
    return () => {
      if (autoNextTimerRef.current !== null) {
        window.clearTimeout(autoNextTimerRef.current);
      }
    };
  }, [roundIdx, rounds.length]);

  const triggerFireworks = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    burstRef.current?.burstAt(w * 0.35, h * 0.45, "gold");
    window.setTimeout(() => {
      burstRef.current?.burstAt(w * 0.65, h * 0.42, "rainbow");
    }, 180);
    window.setTimeout(() => {
      burstRef.current?.burstAt(w * 0.5, h * 0.35, "pink");
    }, 360);
  };

  const handleNextRoundOrFinish = () => {
    if (autoNextTimerRef.current !== null) {
      window.clearTimeout(autoNextTimerRef.current);
      autoNextTimerRef.current = null;
    }
    if (roundIdx + 1 < rounds.length) {
      setRoundIdx((r) => r + 1);
    } else {
      onCompleteGame({
        attempts: Math.max(1, attempts),
        answers:
          collectedLog.length > 0
            ? collectedLog
            : [`Tìm đủ 9 đồ vật ẩn trong truyện: ${bookTitle}`],
      });
    }
  };

  const handleFindItem = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: HiddenItemTarget,
  ) => {
    e.stopPropagation();
    if (foundIds.includes(item.id)) return;

    const nextFound = [...foundIds, item.id];
    setFoundIds(nextFound);
    setJustFoundId(item.id);
    setAttempts((c) => c + 1);
    setCollectedLog((prev) => [
      ...prev,
      `Vòng ${roundIdx + 1}: Tìm thấy ${item.name}`,
    ]);

    burstRef.current?.burstAt(e.clientX, e.clientY, "gold");

    if (soundEnabled) {
      playCorrectDingSound();
      playStickerPeelStickSound();
    }

    const remaining = currentRound.items.length - nextFound.length;
    if (remaining > 0) {
      const msg = `🌟 Giỏi quá! Nấm tìm thấy "${item.name}"! Còn ${remaining} món nữa!`;
      setPraiseText(msg);
      onReaction?.("happy", msg);
    } else {
      const doneMsg =
        roundIdx + 1 < rounds.length
          ? `🎉 Xuất sắc! Xong Vòng ${roundIdx + 1}! Chuẩn bị sang Vòng ${roundIdx + 2}...`
          : `🏆 Hoan hô! Nấm đã tìm hết cả 9 đồ vật trong 3 bức tranh!`;
      setPraiseText(doneMsg);
      onReaction?.("happy", doneMsg);
      triggerFireworks();
      if (soundEnabled) {
        if (roundIdx + 1 < rounds.length) {
          playRewardTone();
        } else {
          playGoldenCupFanfare();
        }
      }

      // Tự động sang vòng tiếp theo sau 1.5 giây để bé không phải tìm nút bấm
      if (roundIdx + 1 < rounds.length) {
        autoNextTimerRef.current = window.setTimeout(() => {
          setRoundIdx((r) => r + 1);
        }, 1500);
      }
    }
  };

  const handleMissTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageBoxRef.current || isRoundComplete) return;
    const rect = imageBoxRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();
    setRipples((prev) => [...prev.slice(-4), { id, x, y }]);
    if (soundEnabled) {
      playCardPlaceSound(0);
    }
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 650);
  };

  const handleReplayNewRandom = () => {
    if (autoNextTimerRef.current !== null) {
      window.clearTimeout(autoNextTimerRef.current);
      autoNextTimerRef.current = null;
    }
    setRounds(generateStoryHiddenRounds(pages));
    setRoundIdx(0);
    setFoundIds([]);
    setCollectedLog([]);
    setAttempts(0);
  };

  const triggerHint = () => {
    setHintActive(true);
    if (soundEnabled) {
      playCardPlaceSound(2);
    }
    window.setTimeout(() => setHintActive(false), 2200);
  };

  if (!currentRound) return null;

  return (
    <div
      className="bedtime-storybook-stage story-quiz-stage"
      style={{ position: "relative" }}
    >
      <ParticleBurstCanvas ref={burstRef} />

      {/* Thanh công cụ trên cùng */}
      <div className="bedtime-story-toolbar">
        <div className="bedtime-toolbar-left">
          <button
            type="button"
            className="chunky-btn chunky-pink btn-sm"
            onClick={onBackToStory}
          >
            <ArrowLeft size={14} /> Xem lại truyện
          </button>
          <div className="bedtime-page-pill story-quiz-progress-pill">
            <Sparkles size={14} />
            <span>
              Tìm Đồ Vật · Vòng {roundIdx + 1}/{rounds.length}
            </span>
          </div>
        </div>

        <div className="bedtime-toolbar-right">
          {/* 3 ngôi sao tiến độ 3 vòng */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 12px",
              borderRadius: "999px",
              background: "rgba(255, 248, 220, 0.95)",
              border: "2px solid #fbbf24",
            }}
          >
            {rounds.map((r, idx) => {
              const earned =
                idx < roundIdx || (idx === roundIdx && isRoundComplete);
              return (
                <Star
                  key={r.roundIndex}
                  size={18}
                  fill={earned ? "#f59e0b" : "none"}
                  color={earned ? "#d97706" : "#cbd5e1"}
                />
              );
            })}
          </div>

          <button
            type="button"
            className="chunky-btn chunky-blue btn-sm"
            onClick={triggerHint}
            title="Nhấp nháy vị trí đồ vật chưa tìm thấy"
          >
            💡 Gợi ý
          </button>

          <button
            type="button"
            className="chunky-btn chunky-orange btn-sm"
            onClick={handleReplayNewRandom}
            title="Đổi bộ đồ vật ngẫu nhiên khác"
          >
            <RotateCcw size={14} /> Đổi đồ vật
          </button>
        </div>
      </div>

      {/* Thân game: Bên trái (2/3) là Tranh ẩn 3 đồ vật | Bên phải (1/3) là Khay 3 đồ vật cần tìm */}
      <div
        className="story-quiz-body"
        style={{
          display: "grid",
          gridTemplateColumns: "1.65fr 1fr",
          gap: "12px",
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        {/* KHUNG TRANH ẨN ĐỒ VẬT */}
        <div
          ref={imageBoxRef}
          onClick={handleMissTap}
          style={{
            position: "relative",
            borderRadius: "20px",
            overflow: "hidden",
            border: "4px solid #fff",
            boxShadow: "0 10px 26px rgba(236, 72, 153, 0.18)",
            backgroundColor: "#fdf2f8",
            cursor: "pointer",
            userSelect: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 0,
          }}
        >
          <img
            src={currentRound.pageImage}
            alt={currentRound.pageTitle}
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              pointerEvents: "none",
            }}
          />

          {/* Hiệu ứng gợn sóng nhẹ khi chạm vào khoảng trống */}
          {ripples.map((rp) => (
            <span
              key={rp.id}
              style={{
                position: "absolute",
                left: rp.x,
                top: rp.y,
                width: "44px",
                height: "44px",
                marginLeft: "-22px",
                marginTop: "-22px",
                borderRadius: "50%",
                border: "3px solid rgba(255, 255, 255, 0.85)",
                backgroundColor: "rgba(255, 255, 255, 0.25)",
                pointerEvents: "none",
                animation: "ping 0.6s cubic-bezier(0, 0, 0.2, 1) forwards",
              }}
            />
          ))}

          {/* 3 ĐỒ VẬT ẨN TRÊN TRANH */}
          {currentRound.items.map((item) => {
            const isFound = foundIds.includes(item.id);
            const isJustFound = justFoundId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={(e) => handleFindItem(e, item)}
                style={{
                  position: "absolute",
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  width: isFound ? "72px" : "60px",
                  height: isFound ? "72px" : "60px",
                  transform: `translate(-50%, -50%) rotate(${
                    isFound ? 0 : item.rotation
                  }deg) scale(${isJustFound ? 1.25 : isFound ? 1.05 : 1})`,
                  opacity: isFound ? 1 : hintActive ? 0.95 : 0.52,
                  filter: isFound
                    ? "drop-shadow(0 0 12px #fde047) drop-shadow(0 4px 8px rgba(0,0,0,0.35))"
                    : hintActive
                      ? "drop-shadow(0 0 14px #ffffff) brightness(1.15)"
                      : "drop-shadow(0 2px 4px rgba(0,0,0,0.28)) saturate(0.88)",
                  transition: "all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  background: isFound
                    ? "radial-gradient(circle, rgba(254,240,138,0.85) 0%, rgba(255,255,255,0) 72%)"
                    : "transparent",
                  border: hintActive && !isFound ? "3px dashed #fde047" : "none",
                  borderRadius: "50%",
                  padding: "4px",
                  cursor: isFound ? "default" : "pointer",
                  zIndex: isFound ? 6 : 4,
                }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  draggable={false}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    pointerEvents: "none",
                  }}
                />
              </button>
            );
          })}

          {/* Nút lớn nổi ngay giữa tranh khi hoàn thành vòng */}
          {isRoundComplete && (
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(15, 23, 42, 0.32)",
                backdropFilter: "blur(2px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                zIndex: 12,
              }}
            >
              <button
                type="button"
                className="chunky-btn chunky-gold"
                onClick={handleNextRoundOrFinish}
                style={{
                  fontSize: "1.2rem",
                  padding: "12px 26px",
                  boxShadow: "0 12px 28px rgba(0, 0, 0, 0.35)",
                }}
              >
                {roundIdx + 1 < rounds.length ? (
                  <>
                    Sang Vòng {roundIdx + 2}/{rounds.length}{" "}
                    <ChevronRight size={22} />
                  </>
                ) : (
                  <>
                    <Star size={22} fill="currentColor" /> Nhận 3 Sao!
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* KHAY PHẢI: DANH SÁCH 3 ĐỒ VẬT CẦN TÌM & NÚT CHUYỂN VÒNG */}
        <div
          className="story-quiz-question-card"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "6px",
            padding: "10px 12px",
            minHeight: 0,
            overflow: "hidden",
          }}
        >
          <div
            className="story-quiz-prompt-box"
            style={{ cursor: "default", padding: "8px 12px" }}
          >
            <span className="story-quiz-q-badge">
              🎯 Vòng {roundIdx + 1}/{rounds.length} · Tìm 3 đồ vật
            </span>
            <h3
              className="story-quiz-q-title"
              style={{
                fontSize: "0.95rem",
                marginTop: "3px",
                lineHeight: 1.3,
              }}
            >
              {praiseText}
            </h3>
          </div>

          {/* 3 Thẻ đồ vật mục tiêu (gọn gàng, không đẩy tràn khung) */}
          <div
            className="story-quiz-options-list"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              flex: 1,
              justifyContent: "center",
              minHeight: 0,
            }}
          >
            {currentRound.items.map((item) => {
              const isFound = foundIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`story-quiz-option-btn ${isFound ? "correct" : ""}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "5px 12px",
                    minHeight: "48px",
                    cursor: "default",
                    opacity: isFound ? 1 : 0.94,
                  }}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "10px",
                      background: isFound ? "#dcfce7" : "#fff1f2",
                      border: isFound
                        ? "2px solid #22c55e"
                        : "2px solid #fecdd3",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "3px",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  <span
                    className="story-quiz-opt-text"
                    style={{
                      fontWeight: 800,
                      fontSize: "0.98rem",
                      color: isFound ? "#15803d" : "#334155",
                    }}
                  >
                    {item.name}
                  </span>

                  <div style={{ marginLeft: "auto" }}>
                    {isFound ? (
                      <CheckCircle2
                        size={20}
                        color="#16a34a"
                        className="story-quiz-opt-check"
                      />
                    ) : (
                      <span
                        style={{
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          color: "#94a3b8",
                          padding: "3px 8px",
                          borderRadius: "999px",
                          background: "#f1f5f9",
                        }}
                      >
                        Đang trốn...
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Thanh trạng thái cuối cột luôn nằm gọn trong khung */}
          <div className="story-quiz-footer-bar" style={{ marginTop: "2px" }}>
            {isRoundComplete ? (
              <div className="story-quiz-success-row">
                <button
                  type="button"
                  className="chunky-btn chunky-gold btn-sm story-quiz-next-btn"
                  onClick={handleNextRoundOrFinish}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  {roundIdx + 1 < rounds.length ? (
                    <>
                      Sang Vòng {roundIdx + 2}/{rounds.length}{" "}
                      <ChevronRight size={16} />
                    </>
                  ) : (
                    <>
                      <Star size={16} fill="currentColor" /> Nhận 3 Sao!
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div
                className="story-quiz-feedback-pill idle-pill"
                style={{ padding: "5px 12px", fontSize: "0.85rem" }}
              >
                👆 Đã tìm thấy:{" "}
                <strong>
                  {foundIds.length}/{currentRound.items.length}
                </strong>{" "}
                đồ vật
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
