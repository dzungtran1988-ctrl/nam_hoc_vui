import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Award,
  Check,
  ChevronRight,
  Film,
  Gift,
  Grid,
  Layers,
  Play,
  Sparkles,
  Square,
  Volume2,
  Zap,
} from "lucide-react";
import {
  CONFUSING_RHYME_PAIRS,
  RHYME_HEAD_GROUPS,
  RHYME_TAIL_GROUPS,
  VIETNAMESE_132_RHYMES,
  type RhymeHeadGroupId,
  type RhymeTailGroupId,
  type VietnameseRhymeItem,
} from "../../data/vietnameseRhymesCatalog";
import {
  playCardPlaceSound,
  playCorrectDingSound,
  playRewardTone,
} from "../../lib/sound";

const COMPLETED_PHONICS_TABLES_KEY = "nam-hoc-vui:phonics-completed-tables:v1";

function loadCompletedTables(): string[] {
  try {
    const raw = window.localStorage.getItem(COMPLETED_PHONICS_TABLES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCompletedTables(ids: string[]): void {
  try {
    window.localStorage.setItem(
      COMPLETED_PHONICS_TABLES_KEY,
      JSON.stringify(ids),
    );
  } catch {
    // ignore storage quota errors
  }
}

// Nhãn rút gọn để 12 bảng luôn nằm gọn trên 1 hàng ngang duy nhất
const COMPACT_HEAD_LABELS: Record<RhymeHeadGroupId, string> = {
  A: "A",
  AW: "Ă",
  AA: "Â",
  O: "O",
  OO: "Ô",
  OW: "Ơ",
  E: "E",
  EE: "Ê",
  I_IE: "I · IÊ",
  U_UO: "U · UÔ",
  UW_UOW: "Ư · ƯƠ",
  OA_OE_UY: "OA · UY",
};

const COMPACT_TAIL_LABELS: Record<RhymeTailGroupId, string> = {
  VOWEL_END: "Đuôi nguyên âm",
  MP_END: "-m / -p",
  NT_END: "-n / -t",
  NGNH_END: "-ng / -nh",
  CCH_END: "-c / -ch",
};

const COMPACT_CONFUSING_LABELS: Record<string, string> = {
  "oe-eo": "oe ↔ eo · oa ↔ ao",
  "oi-ôi-ơi": "oi · ôi · ơi",
  "ep-êp-ăp": "ep · êp · ăp",
  "iêu-uôi-ươi": "iêu · uôi · ươi",
};

interface KittyPhonicsLessonModalProps {
  soundEnabled: boolean;
  speak: (
    text: string,
    lang?: string,
    opts?: { playbackRate?: number; onEnd?: () => void },
  ) => void;
  stopSpeech: () => void;
  onClose: () => void;
  onStartPractice?: () => void;
  onClaimReward?: (tableTitle: string) => void;
  onReaction?: (
    type: "happy" | "sad" | "singing" | "idle",
    message?: string,
  ) => void;
}

export const KittyPhonicsLessonModal: React.FC<KittyPhonicsLessonModalProps> = ({
  soundEnabled,
  speak,
  stopSpeech,
  onClose,
  onClaimReward,
  onReaction,
}) => {
  const [viewTab, setViewTab] = useState<
    "by-head" | "by-tail" | "confusing" | "video"
  >("by-head");
  const [selectedHeadId, setSelectedHeadId] = useState<RhymeHeadGroupId>("I_IE");
  const [selectedTailId, setSelectedTailId] =
    useState<RhymeTailGroupId>("VOWEL_END");
  const [selectedConfusingIdx, setSelectedConfusingIdx] = useState<number>(0);

  const [activeRhyme, setActiveRhyme] = useState<VietnameseRhymeItem>(
    () =>
      VIETNAMESE_132_RHYMES.find((r) => r.rhyme === "ia") ||
      VIETNAMESE_132_RHYMES[0],
  );
  const [readRhymeIds, setReadRhymeIds] = useState<string[]>(["ia"]);
  const [completedTableKeys, setCompletedTableKeys] = useState<string[]>(() =>
    loadCompletedTables(),
  );
  const [justClaimedTableKey, setJustClaimedTableKey] = useState<string | null>(
    null,
  );
  const [isReadingWholeTable, setIsReadingWholeTable] = useState(false);
  const tableReadAbortRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const currentTableKey = useMemo(() => {
    if (viewTab === "by-head") return `head:${selectedHeadId}`;
    if (viewTab === "by-tail") return `tail:${selectedTailId}`;
    if (viewTab === "confusing") {
      const pair =
        CONFUSING_RHYME_PAIRS[selectedConfusingIdx] || CONFUSING_RHYME_PAIRS[0];
      return `confusing:${pair.id}`;
    }
    return "video";
  }, [viewTab, selectedHeadId, selectedTailId, selectedConfusingIdx]);

  const currentTableShortTitle = useMemo(() => {
    if (viewTab === "by-head") {
      return `Bảng ${COMPACT_HEAD_LABELS[selectedHeadId]}`;
    }
    if (viewTab === "by-tail") {
      return `Bảng ${COMPACT_TAIL_LABELS[selectedTailId]}`;
    }
    if (viewTab === "confusing") {
      const pair =
        CONFUSING_RHYME_PAIRS[selectedConfusingIdx] || CONFUSING_RHYME_PAIRS[0];
      return `Nhóm ${COMPACT_CONFUSING_LABELS[pair.id] || pair.title}`;
    }
    return "Clip Đánh Vần";
  }, [viewTab, selectedHeadId, selectedTailId, selectedConfusingIdx]);

  const displayedRhymes = useMemo(() => {
    if (viewTab === "by-head") {
      return VIETNAMESE_132_RHYMES.filter((r) => r.headGroup === selectedHeadId);
    }
    if (viewTab === "by-tail") {
      return VIETNAMESE_132_RHYMES.filter((r) => r.tailGroup === selectedTailId);
    }
    if (viewTab === "confusing") {
      const group =
        CONFUSING_RHYME_PAIRS[selectedConfusingIdx] || CONFUSING_RHYME_PAIRS[0];
      return group.rhymes
        .map((rh) => VIETNAMESE_132_RHYMES.find((item) => item.rhyme === rh))
        .filter((x): x is VietnameseRhymeItem => Boolean(x));
    }
    return [];
  }, [viewTab, selectedHeadId, selectedTailId, selectedConfusingIdx]);

  useEffect(() => {
    setJustClaimedTableKey(null);
    if (displayedRhymes.length > 0) {
      const first = displayedRhymes[0];
      setActiveRhyme(first);
      setReadRhymeIds((prev) =>
        prev.includes(first.id) ? prev : [...prev, first.id],
      );
    }
  }, [selectedHeadId, selectedTailId, selectedConfusingIdx, viewTab]);

  useEffect(() => {
    return () => {
      tableReadAbortRef.current = true;
    };
  }, []);

  const readCountInCurrentTable = useMemo(() => {
    return displayedRhymes.filter((r) => readRhymeIds.includes(r.id)).length;
  }, [displayedRhymes, readRhymeIds]);

  const isAllReadInTable =
    displayedRhymes.length > 0 &&
    readCountInCurrentTable >= displayedRhymes.length;

  const isTableCompleted = completedTableKeys.includes(currentTableKey);

  const markRhymeAsRead = (id: string) => {
    setReadRhymeIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const stopTableReading = () => {
    tableReadAbortRef.current = true;
    setIsReadingWholeTable(false);
    stopSpeech();
  };

  const handleTapRhymeCell = (item: VietnameseRhymeItem) => {
    stopTableReading();
    playCardPlaceSound(1);
    setActiveRhyme(item);
    markRhymeAsRead(item.id);
    if (soundEnabled) {
      speak(item.spokenNorth, "vi-VN-North", { playbackRate: 0.95 });
    }
  };

  const handleClaimCurrentTableReward = () => {
    stopTableReading();
    playCorrectDingSound();
    playRewardTone();
    // Đánh dấu tất cả vần trong bảng là đã học
    const allIds = displayedRhymes.map((r) => r.id);
    setReadRhymeIds((prev) => Array.from(new Set([...prev, ...allIds])));

    if (!completedTableKeys.includes(currentTableKey)) {
      const nextCompleted = [...completedTableKeys, currentTableKey];
      setCompletedTableKeys(nextCompleted);
      saveCompletedTables(nextCompleted);
    }
    setJustClaimedTableKey(currentTableKey);
    onReaction?.(
      "happy",
      `Giỏi quá! Bé vừa hoàn thành ${currentTableShortTitle} và nhận 3 Sao Thưởng!`,
    );
  };

  const handleGoToNextTable = () => {
    stopTableReading();
    setJustClaimedTableKey(null);
    if (viewTab === "by-head") {
      const idx = RHYME_HEAD_GROUPS.findIndex((g) => g.id === selectedHeadId);
      const nextGroup =
        RHYME_HEAD_GROUPS[(idx + 1) % RHYME_HEAD_GROUPS.length];
      setSelectedHeadId(nextGroup.id);
    } else if (viewTab === "by-tail") {
      const idx = RHYME_TAIL_GROUPS.findIndex((g) => g.id === selectedTailId);
      const nextGroup =
        RHYME_TAIL_GROUPS[(idx + 1) % RHYME_TAIL_GROUPS.length];
      setSelectedTailId(nextGroup.id);
    } else if (viewTab === "confusing") {
      setSelectedConfusingIdx(
        (prev) => (prev + 1) % CONFUSING_RHYME_PAIRS.length,
      );
    }
  };

  const handleReadEntireCurrentTable = () => {
    if (isReadingWholeTable) {
      stopTableReading();
      return;
    }
    if (!soundEnabled || displayedRhymes.length === 0) return;

    tableReadAbortRef.current = false;
    setIsReadingWholeTable(true);
    playRewardTone();

    const playStep = (idx: number) => {
      if (tableReadAbortRef.current || idx >= displayedRhymes.length) {
        setIsReadingWholeTable(false);
        return;
      }
      const item = displayedRhymes[idx];
      setActiveRhyme(item);
      markRhymeAsRead(item.id);
      speak(item.spokenNorth, "vi-VN-North", {
        playbackRate: 0.96,
        onEnd: () => {
          if (!tableReadAbortRef.current) {
            window.setTimeout(() => playStep(idx + 1), 260);
          }
        },
      });
    };

    playStep(0);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        height: "100%",
        minHeight: 0,
        padding: "2px 4px",
      }}
    >
      {/* DÒNG 1: THANH CHỌN GỌN NHẸ TRÊN 1 HÀNG DUY NHẤT */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "6px",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}
      >
        <button
          type="button"
          className="back-to-menu-pill"
          onClick={() => {
            stopTableReading();
            onClose();
          }}
        >
          <ArrowLeft size={14} /> Quay lại
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            overflowX: "auto",
            scrollbarWidth: "none",
          }}
        >
          <button
            type="button"
            className={`level-switch-pill ${
              viewTab === "by-head" ? "active-pink" : ""
            }`}
            style={{ padding: "4px 10px", fontSize: "0.78rem" }}
            onClick={() => {
              stopTableReading();
              setViewTab("by-head");
            }}
          >
            <Grid size={12} style={{ marginRight: 4 }} />
            Chữ Đầu
          </button>

          <button
            type="button"
            className={`level-switch-pill ${
              viewTab === "by-tail" ? "active-orange" : ""
            }`}
            style={{ padding: "4px 10px", fontSize: "0.78rem" }}
            onClick={() => {
              stopTableReading();
              setViewTab("by-tail");
            }}
          >
            <Layers size={12} style={{ marginRight: 4 }} />
            Đuôi Vần
          </button>

          <button
            type="button"
            className={`level-switch-pill ${
              viewTab === "confusing" ? "active-pink" : ""
            }`}
            style={{ padding: "4px 10px", fontSize: "0.78rem" }}
            onClick={() => {
              stopTableReading();
              setViewTab("confusing");
            }}
          >
            <Zap size={12} style={{ marginRight: 4 }} />
            Hay Nhầm
          </button>

          <button
            type="button"
            className={`level-switch-pill ${
              viewTab === "video" ? "active-green" : ""
            }`}
            style={{ padding: "4px 10px", fontSize: "0.78rem" }}
            onClick={() => {
              stopTableReading();
              setViewTab("video");
            }}
          >
            <Film size={12} style={{ marginRight: 4 }} />
            Clip
          </button>
        </div>

        {viewTab !== "video" && (
          <button
            type="button"
            className={`chunky-btn ${
              isReadingWholeTable ? "chunky-pink" : "chunky-gold"
            } btn-sm`}
            style={{
              padding: "4px 10px",
              fontSize: "0.76rem",
              flexShrink: 0,
            }}
            onClick={handleReadEntireCurrentTable}
          >
            {isReadingWholeTable ? (
              <>
                <Square size={12} /> Dừng
              </>
            ) : (
              <>
                <Play size={12} /> Đọc cả bảng
              </>
            )}
          </button>
        )}
      </div>

      {/* DÒNG 2: CHỌN CHỮ CÁI / NHÓM TRÊN 1 HÀNG MỎNG (CÓ SAO VÀNG KHI ĐÃ XONG BẢNG) */}
      {viewTab !== "video" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            flexWrap: "wrap",
            flexShrink: 0,
          }}
        >
          {viewTab === "by-head" &&
            RHYME_HEAD_GROUPS.map((g) => {
              const active = g.id === selectedHeadId;
              const done = completedTableKeys.includes(`head:${g.id}`);
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => {
                    stopTableReading();
                    setSelectedHeadId(g.id);
                  }}
                  style={{
                    padding: "3px 10px",
                    borderRadius: "999px",
                    border: active
                      ? `2px solid ${g.border}`
                      : done
                        ? "1.5px solid #F59E0B"
                        : "1px solid #CBD5E1",
                    background: active
                      ? g.bg
                      : done
                        ? "#FEFCE8"
                        : "rgba(255,255,255,0.85)",
                    color: active ? g.color : done ? "#B45309" : "#475569",
                    fontWeight: 900,
                    fontSize: "0.8rem",
                    cursor: "pointer",
                  }}
                >
                  {COMPACT_HEAD_LABELS[g.id] || g.shortLabel}
                  {done ? " ⭐" : ""}
                </button>
              );
            })}

          {viewTab === "by-tail" &&
            RHYME_TAIL_GROUPS.map((tg) => {
              const active = tg.id === selectedTailId;
              const done = completedTableKeys.includes(`tail:${tg.id}`);
              return (
                <button
                  key={tg.id}
                  type="button"
                  onClick={() => {
                    stopTableReading();
                    setSelectedTailId(tg.id);
                  }}
                  style={{
                    padding: "3px 11px",
                    borderRadius: "999px",
                    border: active
                      ? `2px solid ${tg.color}`
                      : done
                        ? "1.5px solid #F59E0B"
                        : "1px solid #CBD5E1",
                    background: active
                      ? "#FDF2F8"
                      : done
                        ? "#FEFCE8"
                        : "rgba(255,255,255,0.85)",
                    color: active ? tg.color : done ? "#B45309" : "#475569",
                    fontWeight: 900,
                    fontSize: "0.8rem",
                    cursor: "pointer",
                  }}
                >
                  {COMPACT_TAIL_LABELS[tg.id] || tg.shortLabel}
                  {done ? " ⭐" : ""}
                </button>
              );
            })}

          {viewTab === "confusing" &&
            CONFUSING_RHYME_PAIRS.map((pair, idx) => {
              const active = idx === selectedConfusingIdx;
              const done = completedTableKeys.includes(`confusing:${pair.id}`);
              return (
                <button
                  key={pair.id}
                  type="button"
                  onClick={() => {
                    stopTableReading();
                    setSelectedConfusingIdx(idx);
                  }}
                  style={{
                    padding: "3px 11px",
                    borderRadius: "999px",
                    border: active
                      ? "2px solid #EC4899"
                      : done
                        ? "1.5px solid #F59E0B"
                        : "1px solid #CBD5E1",
                    background: active
                      ? "#FCE7F3"
                      : done
                        ? "#FEFCE8"
                        : "rgba(255,255,255,0.85)",
                    color: active ? "#BE185D" : done ? "#B45309" : "#475569",
                    fontWeight: 900,
                    fontSize: "0.8rem",
                    cursor: "pointer",
                  }}
                >
                  {COMPACT_CONFUSING_LABELS[pair.id] || pair.title}
                  {done ? " ⭐" : ""}
                </button>
              );
            })}
        </div>
      )}

      {/* =====================================================================
          PHẦN HỌC CHÍNH CHIA 2 CỘT TRÁI – PHẢI (CHIẾM >82% DIỆN TÍCH BẢNG)
         ===================================================================== */}
      {viewTab === "video" ? (
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#090C15",
            borderRadius: "18px",
            padding: "8px 12px",
            gap: "6px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "6px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {[
              { label: "✂️ k + éo = kéo", sec: 0 },
              { label: "🌸 x + òe = xòe", sec: 8.6 },
              { label: "👡 d + ép = dép", sec: 17.4 },
              { label: "🌟 ng + oan = ngoan", sec: 25.5 },
              { label: "🍌 ch + uối = chuối", sec: 33.5 },
            ].map((ch) => (
              <button
                key={ch.label}
                type="button"
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = ch.sec;
                    videoRef.current.play().catch(() => {});
                  }
                }}
                style={{
                  background: "rgba(30, 41, 59, 0.9)",
                  border: "1.5px solid #FF4D94",
                  color: "#F8FAFC",
                  borderRadius: "999px",
                  padding: "3px 11px",
                  fontSize: "0.75rem",
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                {ch.label}
              </button>
            ))}
          </div>

          <video
            ref={videoRef}
            src="/videos/kitty-phonics-lesson.mp4"
            controls
            autoPlay
            playsInline
            style={{
              width: "100%",
              flex: 1,
              minHeight: 0,
              borderRadius: "12px",
              objectFit: "contain",
              background: "#090C15",
            }}
          />
        </div>
      ) : (
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "grid",
            gridTemplateColumns: "1.28fr 1fr",
            gap: "10px",
          }}
        >
          {/* CỘT TRÁI: LƯỚI BẢNG VẦN 3 CỘT TO RÕ */}
          <div
            style={{
              minHeight: 0,
              overflowY: "auto",
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "8px",
              alignContent: "start",
              padding: "4px",
              background: "rgba(255, 255, 255, 0.52)",
              borderRadius: "18px",
              border: "1.5px solid rgba(244, 114, 182, 0.28)",
            }}
          >
            {displayedRhymes.map((item) => {
              const isSelected = item.id === activeRhyme.id;
              const isRead = readRhymeIds.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTapRhymeCell(item)}
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "8px 10px",
                    borderRadius: "16px",
                    background: isSelected
                      ? "#FFF1F2"
                      : isRead
                        ? "#F0FDF4"
                        : "#FFFFFF",
                    border: isSelected
                      ? "2.5px solid #EC4899"
                      : isRead
                        ? "1.5px solid #86EFAC"
                        : "1.5px solid #E2E8F0",
                    boxShadow: isSelected
                      ? "0 4px 12px rgba(236, 72, 153, 0.22)"
                      : "0 2px 5px rgba(15, 23, 42, 0.04)",
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "inherit",
                  }}
                >
                  {isRead && (
                    <span
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "6px",
                        width: "16px",
                        height: "16px",
                        borderRadius: "999px",
                        background: "#22C55E",
                        color: "#FFFFFF",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.65rem",
                        fontWeight: 900,
                      }}
                      title="Đã đọc"
                    >
                      <Check size={11} strokeWidth={3} />
                    </span>
                  )}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      width: "100%",
                      paddingRight: isRead ? "16px" : 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.82rem",
                        fontWeight: 800,
                        color: "#64748B",
                      }}
                    >
                      {item.headPart} + {item.tailPart} =
                    </span>
                    <strong
                      style={{
                        fontSize: "clamp(1.35rem, 1.9vw, 1.68rem)",
                        fontWeight: 900,
                        color: "#BE185D",
                        lineHeight: 1.05,
                      }}
                    >
                      {item.rhyme}
                    </strong>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      marginTop: "4px",
                      paddingTop: "4px",
                      borderTop: "1px dashed #E2E8F0",
                      fontSize: "0.8rem",
                      fontWeight: 800,
                    }}
                  >
                    <span
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <span style={{ color: "#2563EB", fontWeight: 900 }}>
                        {item.anchorOnset}
                      </span>
                      <span style={{ color: "#DB2777", fontWeight: 900 }}>
                        {item.anchorRhymeWithTone}
                      </span>
                      <span
                        style={{
                          color: "#64748B",
                          marginLeft: 3,
                          fontSize: "0.72rem",
                        }}
                      >
                        ({item.anchorPhrase})
                      </span>
                    </span>
                    <span
                      style={{
                        fontSize: "1rem",
                        flexShrink: 0,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "22px",
                        height: "22px",
                      }}
                    >
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.anchorPhrase}
                          style={{
                            width: "22px",
                            height: "22px",
                            objectFit: "contain",
                          }}
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = "none";
                            if (target.parentElement) {
                              target.parentElement.textContent = item.emoji;
                            }
                          }}
                        />
                      ) : (
                        item.emoji
                      )}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* CỘT PHẢI: BẢNG TIÊU ĐIỂM CHỮ ĐANG HỌC + Ô NHẬN THƯỞNG BẢNG */}
          <div
            style={{
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "6px",
              padding: "10px 12px",
              borderRadius: "20px",
              background: "#FFFFFF",
              border: "2.5px solid #F472B6",
              boxShadow: "0 6px 18px rgba(236, 72, 153, 0.12)",
              overflowY: "auto",
            }}
          >
            {/* BƯỚC 1: GHÉP CÔNG THỨC VẦN */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span
                style={{
                  background: "#FCE7F3",
                  color: "#BE185D",
                  fontSize: "0.74rem",
                  fontWeight: 900,
                  padding: "2px 12px",
                  borderRadius: "999px",
                  letterSpacing: "0.02em",
                }}
              >
                🔍 BƯỚC 1: GHÉP CÔNG THỨC VẦN
              </span>

              <div
                onClick={() => handleTapRhymeCell(activeRhyme)}
                style={{
                  width: "100%",
                  background: "#FFF1F2",
                  border: "1.5px solid #F9A8D4",
                  borderRadius: "16px",
                  padding: "8px 12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                      fontWeight: 900,
                      color: "#7E22CE",
                      lineHeight: 1.1,
                    }}
                  >
                    {activeRhyme.headPart}
                  </span>
                  <span
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: 900,
                      color: "#EC4899",
                    }}
                  >
                    +
                  </span>
                  <span
                    style={{
                      fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                      fontWeight: 900,
                      color: "#059669",
                      lineHeight: 1.1,
                    }}
                  >
                    {activeRhyme.tailPart}
                  </span>
                  <span
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: 900,
                      color: "#EC4899",
                    }}
                  >
                    =
                  </span>
                  <strong
                    style={{
                      fontSize: "clamp(1.8rem, 2.9vw, 2.5rem)",
                      fontWeight: 900,
                      color: "#BE185D",
                      background: "#FFFFFF",
                      padding: "2px 14px",
                      borderRadius: "14px",
                      border: "2px solid #EC4899",
                      lineHeight: 1.1,
                    }}
                  >
                    {activeRhyme.rhyme}
                  </strong>
                </div>

                {activeRhyme.bridgeHint && (
                  <div
                    style={{
                      marginTop: "4px",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      color: "#9D174D",
                      background: "rgba(255,255,255,0.8)",
                      padding: "2px 10px",
                      borderRadius: "999px",
                    }}
                  >
                    💡 Bắc cầu: {activeRhyme.bridgeHint}
                  </div>
                )}
              </div>
            </div>

            {/* BƯỚC 2: NHÌN TỪ QUEN ĐỂ NHỚ CÁCH ĐỌC */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span
                style={{
                  background: "#DBEAFE",
                  color: "#1D4ED8",
                  fontSize: "0.74rem",
                  fontWeight: 900,
                  padding: "2px 12px",
                  borderRadius: "999px",
                  letterSpacing: "0.02em",
                }}
              >
                🧠 BƯỚC 2: NHÌN TỪ QUEN ĐỂ NHỚ CÁCH ĐỌC
              </span>

              <div
                onClick={() => handleTapRhymeCell(activeRhyme)}
                style={{
                  width: "100%",
                  background: "#F8FAFC",
                  border: "2px dashed #93C5FD",
                  borderRadius: "16px",
                  padding: "8px 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "14px",
                  cursor: "pointer",
                }}
              >
                {activeRhyme.imageUrl ? (
                  <img
                    src={activeRhyme.imageUrl}
                    alt={activeRhyme.anchorPhrase}
                    style={{
                      width: "58px",
                      height: "58px",
                      objectFit: "contain",
                      flexShrink: 0,
                    }}
                  />
                ) : (
                  <span
                    style={{
                      fontSize: "3.1rem",
                      lineHeight: 1,
                      flexShrink: 0,
                    }}
                  >
                    {activeRhyme.emoji}
                  </span>
                )}

                <div style={{ textAlign: "left" }}>
                  <div
                    style={{
                      fontSize: "0.74rem",
                      fontWeight: 800,
                      color: "#64748B",
                    }}
                  >
                    <span style={{ color: "#2563EB", fontWeight: 900 }}>
                      ■ Âm đầu
                    </span>{" "}
                    +{" "}
                    <span style={{ color: "#DB2777", fontWeight: 900 }}>
                      ■ Vần có dấu
                    </span>
                    :
                  </div>

                  <div
                    style={{
                      fontSize: "clamp(1.5rem, 2.4vw, 2.15rem)",
                      fontWeight: 900,
                      lineHeight: 1.1,
                      margin: "2px 0",
                    }}
                  >
                    {activeRhyme.anchorOnset ? (
                      <>
                        <span style={{ color: "#2563EB" }}>
                          {activeRhyme.anchorOnset}
                        </span>
                        <span
                          style={{
                            color: "#94A3B8",
                            fontSize: "1.2rem",
                            margin: "0 4px",
                          }}
                        >
                          +
                        </span>
                      </>
                    ) : null}
                    <span style={{ color: "#DB2777" }}>
                      {activeRhyme.anchorRhymeWithTone}
                    </span>
                    <span
                      style={{
                        color: "#94A3B8",
                        fontSize: "1.2rem",
                        margin: "0 6px",
                      }}
                    >
                      =
                    </span>
                    <span style={{ color: "#2563EB" }}>
                      {activeRhyme.anchorOnset}
                    </span>
                    <span style={{ color: "#DB2777" }}>
                      {activeRhyme.anchorRhymeWithTone}
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: "0.88rem",
                      fontWeight: 900,
                      color: "#1E293B",
                    }}
                  >
                    👉 Từ mẫu: «{activeRhyme.anchorPhrase}»
                  </div>
                </div>
              </div>
            </div>

            {/* NÚT NGHE CÔ KITTY ĐÁNH VẦN GIỌNG BẮC */}
            <button
              type="button"
              onClick={() => handleTapRhymeCell(activeRhyme)}
              style={{
                width: "100%",
                padding: "9px 14px",
                borderRadius: "999px",
                border: "none",
                background: "linear-gradient(180deg, #38BDF8 0%, #0284C7 100%)",
                boxShadow: "0 4px 0 #0369A1",
                color: "#FFFFFF",
                fontWeight: 900,
                fontSize: "0.88rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              <Volume2 size={17} />
              Nghe Cô Kitty Đánh Vần Giọng Bắc «
              {activeRhyme.rhyme.toUpperCase()}»
            </button>

            {/* Ô NHẬN THƯỞNG KHI HỌC XONG 1 BẢNG */}
            <div
              style={{
                width: "100%",
                borderRadius: "16px",
                padding: "8px 10px",
                background:
                  justClaimedTableKey === currentTableKey || isTableCompleted
                    ? "linear-gradient(135deg, #FEF9C3 0%, #FDE68A 100%)"
                    : isAllReadInTable
                      ? "linear-gradient(135deg, #FEF3C7 0%, #FDE047 100%)"
                      : "#F8FAFC",
                border:
                  justClaimedTableKey === currentTableKey ||
                  isTableCompleted ||
                  isAllReadInTable
                    ? "2px solid #F59E0B"
                    : "1.5px solid #E2E8F0",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "0.78rem",
                  fontWeight: 900,
                  color: "#92400E",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <Gift size={15} color="#D97706" />
                  {currentTableShortTitle}: Đã đọc {readCountInCurrentTable}/
                  {displayedRhymes.length} vần
                </span>
                {isTableCompleted && (
                  <span
                    style={{
                      background: "#F59E0B",
                      color: "#FFFFFF",
                      padding: "1px 8px",
                      borderRadius: "999px",
                      fontSize: "0.7rem",
                    }}
                  >
                    ⭐ Đã thuộc
                  </span>
                )}
              </div>

              {justClaimedTableKey === currentTableKey ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {onClaimReward && (
                    <button
                      type="button"
                      onClick={() => onClaimReward(currentTableShortTitle)}
                      style={{
                        flex: 1,
                        padding: "7px 10px",
                        borderRadius: "999px",
                        border: "none",
                        background:
                          "linear-gradient(180deg, #EC4899 0%, #DB2777 100%)",
                        boxShadow: "0 3px 0 #9D174D",
                        color: "#FFFFFF",
                        fontWeight: 900,
                        fontSize: "0.78rem",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      <Award size={15} /> Mở Quà Sticker (+3 ⭐)
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleGoToNextTable}
                    style={{
                      flex: 1,
                      padding: "7px 10px",
                      borderRadius: "999px",
                      border: "none",
                      background:
                        "linear-gradient(180deg, #22C55E 0%, #16A34A 100%)",
                      boxShadow: "0 3px 0 #15803D",
                      color: "#FFFFFF",
                      fontWeight: 900,
                      fontSize: "0.78rem",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px",
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    Bảng tiếp theo <ChevronRight size={15} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleClaimCurrentTableReward}
                  style={{
                    width: "100%",
                    padding: "7px 12px",
                    borderRadius: "999px",
                    border: "none",
                    background: isAllReadInTable
                      ? "linear-gradient(180deg, #F59E0B 0%, #D97706 100%)"
                      : "linear-gradient(180deg, #FBBF24 0%, #F59E0B 100%)",
                    boxShadow: "0 3px 0 #B45309",
                    color: "#FFFFFF",
                    fontWeight: 900,
                    fontSize: "0.82rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  <Sparkles size={15} />
                  {isAllReadInTable
                    ? `🎉 Đã Đọc Hết ${currentTableShortTitle} — Nhận Thưởng (+3 ⭐)`
                    : `🎁 Học Xong ${currentTableShortTitle} — Nhận Thưởng (+3 ⭐)`}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
