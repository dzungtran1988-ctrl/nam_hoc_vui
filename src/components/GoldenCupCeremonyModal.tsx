import React, { useState } from "react";
import { BookOpen, Gift, Sparkles, Trophy, X } from "lucide-react";
import {
  NAM_MASTER_CUP_IMAGE,
  SUBJECT_CUPS,
  type AwardedNamCupStickerResult,
  type SubjectStickerBoardState,
} from "../data/rewardStickers";
import type { SubjectId } from "../types";
import { playGoldenCupFanfare } from "../lib/sound";

interface GoldenCupCeremonyModalProps {
  subjectId: SubjectId;
  boardState: SubjectStickerBoardState;
  onClose: () => void;
  onHarvestToBook: (subjectId: SubjectId) => AwardedNamCupStickerResult | void;
  onOpenStickerBook: (subjectId: SubjectId) => void;
  onTriggerFireworks: () => void;
  onSpeak: (text: string) => void;
}

export const GoldenCupCeremonyModal: React.FC<GoldenCupCeremonyModalProps> = ({
  subjectId,
  boardState,
  onClose,
  onHarvestToBook,
  onOpenStickerBook,
  onTriggerFireworks,
  onSpeak,
}) => {
  const [phase, setPhase] = useState<"ready" | "merging" | "opened">("ready");
  const [namBonus, setNamBonus] = useState<AwardedNamCupStickerResult | null>(
    null,
  );
  const cup = SUBJECT_CUPS[subjectId];
  const crownLevel = Math.max(1, boardState.completedCycles);

  const handleTapCup = () => {
    if (phase !== "ready") return;
    setPhase("merging");
    playGoldenCupFanfare();
    onTriggerFireworks();

    window.setTimeout(() => {
      const bonusResult = onHarvestToBook(subjectId);
      if (bonusResult) {
        setNamBonus(bonusResult);
      }
      setPhase("opened");
      onTriggerFireworks();
      if (bonusResult?.isHardFoodReward && bonusResult.sticker.momRewardVoucher) {
        onSpeak(
          `Oa! Chúc mừng bé Nấm đã mở ${cup.cupTitle} và trúng Sticker hiếm ${bonusResult.sticker.name}! ${bonusResult.sticker.momRewardVoucher}`,
        );
      } else if (bonusResult) {
        onSpeak(
          `Oa! Chúc mừng bé Nấm đã thắp sáng ${cup.cupTitle}, cất trọn bộ 6 hình dán ${cup.characterName} và nhận thêm Sticker ${bonusResult.sticker.name} vào Quyển Vở Sticker nhé!`,
        );
      } else {
        onSpeak(
          `Oa! Chúc mừng bé Nấm đã thắp sáng ${cup.cupTitle} và cất trọn bộ 6 hình dán ${cup.characterName} vào Quyển Vở Sticker của Nấm nhé!`,
        );
      }
    }, 850);
  };

  return (
    <div className="golden-cup-ceremony-backdrop" onClick={onClose}>
      <div
        className={`golden-cup-ceremony-card phase-${phase}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="ceremony-close-btn"
          onClick={onClose}
          title="Đóng"
        >
          <X size={20} />
        </button>

        <div className="ceremony-header-badge">
          <Trophy size={18} /> NGHI THỨC THẮP SÁNG CÚP VÀNG ĐẠI SỨ{" "}
          <Sparkles size={18} />
        </div>

        <h2 className="ceremony-title">
          {phase === "opened"
            ? `🎉 CHÚC MỪNG NẤM ĐẠT ${cup.cupTitle.toUpperCase()} CẤP ${crownLevel}!`
            : `✨ HỢP NHẤT 6 STICKER VÀO ${cup.cupTitle.toUpperCase()}!`}
        </h2>

        <p className="ceremony-subtitle">
          {phase === "opened" ? (
            <>
              Trọn bộ <strong>6 Sticker {cup.characterName}</strong>{" "}
              {namBonus ? (
                <>
                  và <strong>+1 Sticker {namBonus.sticker.name}</strong>
                </>
              ) : null}{" "}
              đã được cất vào <strong>📒 Quyển Vở Sticker Của Nấm</strong>!
            </>
          ) : (
            <>
              Bé Nấm hãy <strong>chạm vào Chiếc Cúp Vàng</strong> ở giữa để hút
              cả 6 Sticker phát sáng vào Cúp và nhận thêm{" "}
              <strong>1 Sticker Bé Nấm Đặc Biệt</strong> nhé!
            </>
          )}
        </p>

        {/* Sân khấu Cúp Vàng + 6 Sticker xoay quanh */}
        <div className={`ceremony-orbit-stage phase-${phase}`}>
          {/* 6 Sticker xung quanh */}
          <div className="ceremony-orbit-ring">
            {cup.stickers.map((stk, idx) => (
              <div
                key={stk.id}
                className={`ceremony-orbit-sticker slot-${idx} ${
                  phase === "merging" ? "merging-in" : ""
                } ${phase === "opened" ? "merged-done" : ""}`}
              >
                <img src={stk.image} alt={stk.name} />
                <span>{stk.name}</span>
              </div>
            ))}
          </div>

          {/* Chiếc Cúp Vàng Trung Tâm */}
          <button
            type="button"
            className={`ceremony-center-cup-btn ${
              phase === "ready" ? "cup-inviting-shake" : ""
            } ${phase === "opened" ? "cup-grand-glow" : ""}`}
            onClick={handleTapCup}
          >
            <div className="ceremony-cup-halo" />
            <div className="ceremony-cups-pair">
              <img
                src={cup.cupImage}
                alt={cup.cupTitle}
                className="ceremony-main-cup-img"
              />
              {phase === "opened" && (
                <img
                  src={
                    namBonus ? namBonus.sticker.image : NAM_MASTER_CUP_IMAGE
                  }
                  alt={namBonus ? namBonus.sticker.name : "Cúp Bé Nấm"}
                  className="ceremony-nam-cup-img"
                />
              )}
            </div>
            <span className="ceremony-cup-cta-pill">
              {phase === "ready" && "👆 CHẠM VÀO CÚP VÀNG ĐỂ MỞ!"}
              {phase === "merging" && "⚡ ĐANG HỢP NHẤT 6 STICKER..."}
              {phase === "opened" &&
                (namBonus
                  ? `🎁 +1 STICKER: ${namBonus.sticker.name.toUpperCase()} (x${namBonus.newCount})!`
                  : `👑 ĐÃ THẮP SÁNG CÚP VÀNG CẤP ${crownLevel}!`)}
            </span>
          </button>
        </div>

        {/* Thẻ Quà Tặng Kèm Khi Mở Cúp: Sticker Nấm Học Tập hoặc Sticker Hiếm Nấm Ăn + Phiếu Thưởng Mẹ Mua */}
        {phase === "opened" && namBonus && (
          <div
            style={{
              margin: "6px auto 10px",
              maxWidth: 640,
              padding: "10px 14px",
              borderRadius: 18,
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: namBonus.isHardFoodReward
                ? "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 50%, #FBCFE8 100%)"
                : "linear-gradient(135deg, #EFF6FF 0%, #E0E7FF 100%)",
              border: namBonus.isHardFoodReward
                ? "3px solid #F59E0B"
                : "2px solid #60A5FA",
              boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
              textAlign: "left",
            }}
          >
            <img
              src={namBonus.sticker.image}
              alt={namBonus.sticker.name}
              style={{
                width: 68,
                height: 68,
                objectFit: "contain",
                background: "#FFFFFF",
                borderRadius: 14,
                padding: 4,
                border: "2px solid rgba(245, 158, 11, 0.45)",
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontWeight: 900,
                  fontSize: "0.95rem",
                  color: namBonus.isHardFoodReward ? "#B45309" : "#1D4ED8",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  flexWrap: "wrap",
                }}
              >
                <Gift size={16} />
                <span>
                  {namBonus.isHardFoodReward
                    ? `🌟 MỞ TRÚNG STICKER ĐỒ ĂN HIẾM: ${namBonus.sticker.name} (x${namBonus.newCount})`
                    : `📚 THƯỞNG MỞ CÚP: Sticker ${namBonus.sticker.name} (x${namBonus.newCount})`}
                </span>
              </div>
              <div
                style={{
                  fontSize: "0.84rem",
                  fontWeight: 700,
                  color: namBonus.isHardFoodReward ? "#92400E" : "#334155",
                  marginTop: 3,
                  lineHeight: 1.35,
                }}
              >
                {namBonus.isHardFoodReward && namBonus.sticker.momRewardVoucher
                  ? namBonus.sticker.momRewardVoucher
                  : "✨ Đã cất vào Kho Sticker Bé Nấm để con bóc dán lên Sân Khấu & Quyển Vở Sticker nhé!"}
              </div>
            </div>
          </div>
        )}

        {/* Các nút hành động dưới đáy */}
        <div className="ceremony-actions-row">
          {phase === "ready" ? (
            <button
              type="button"
              className="chunky-btn chunky-gold ceremony-main-btn"
              onClick={handleTapCup}
            >
              <Trophy size={20} /> ✨ Chạm Mở Cúp Vàng & Nhận Sticker Bé Nấm!
            </button>
          ) : phase === "opened" ? (
            <>
              <button
                type="button"
                className="chunky-btn chunky-pink ceremony-main-btn"
                onClick={() => onOpenStickerBook(subjectId)}
              >
                <BookOpen size={20} /> 📒 Mở Sân Khấu & Vở Dán Sticker Nấm!
              </button>
              <button
                type="button"
                className="chunky-btn chunky-green"
                onClick={onClose}
              >
                <Sparkles size={18} /> Sưu Tập Vòng Cúp Tiếp Theo
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

