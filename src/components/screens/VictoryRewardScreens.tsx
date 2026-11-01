import { BookOpen, Gift, Home, RotateCcw, Trophy } from "lucide-react";
import {
  SUBJECT_CUPS,
  type CharacterStickerItem,
  type DrawerTabId,
  type StickerCollectionStore,
} from "../../data/rewardStickers";
import type { SubjectId } from "../../types";

export interface VictoryVideoScreenProps {
  subject: SubjectId;
  awardedSticker: CharacterStickerItem;
  justCompletedFullSet: boolean;
  onProceedToReward: (
    subject: SubjectId,
    awardedSticker: CharacterStickerItem,
    justCompletedFullSet: boolean,
  ) => void;
}

export function VictoryVideoScreen({
  subject,
  awardedSticker,
  justCompletedFullSet,
  onProceedToReward,
}: VictoryVideoScreenProps) {
  return (
    <div
      className="scene-screen victory-video-screen"
      style={{ backgroundImage: `url("/assets/scene-treasure.webp")` }}
    >
      <div className="victory-video-backdrop">
        <div className="victory-video-card">
          <div className="victory-video-header">
            <span>🏆 CHÚC MỪNG CHIẾN THẮNG! BÉ NẤM GIỎI QUÁ! 🎉</span>
            <button
              type="button"
              className="chunky-btn chunky-gold btn-sm"
              onClick={() =>
                onProceedToReward(subject, awardedSticker, justCompletedFullSet)
              }
            >
              🎁 Nhận Sticker Thưởng Ngay! ➔
            </button>
          </div>
          <video
            src={`/api/local-video-stream?id=${encodeURIComponent(
              "root:chúc mừng chiến thắng.mp4",
            )}`}
            autoPlay
            playsInline
            controls
            className="victory-video-player"
            onEnded={() =>
              onProceedToReward(subject, awardedSticker, justCompletedFullSet)
            }
            onError={() =>
              onProceedToReward(subject, awardedSticker, justCompletedFullSet)
            }
          />
        </div>
      </div>
    </div>
  );
}

export interface StickerRewardScreenProps {
  subject: SubjectId;
  awardedSticker: CharacterStickerItem;
  stickerStore: StickerCollectionStore;
  allThreeQuestsDone: boolean;
  chestClaimed: boolean;
  goldCoins?: number;
  onRedeemCoinSticker?: (subject: SubjectId) => void;
  onOpenClawMachine?: () => void;
  onOpenDailyChestModal: () => void;
  onResetCupStickers: (subject: SubjectId) => void;
  onOpenStickerBook: (initialFilter: DrawerTabId) => void;
  onPlayAgain: (subject: SubjectId) => void;
  onOpenTrophyRoom: (subject: SubjectId) => void;
  onGoHome: () => void;
}

export function StickerRewardScreen({
  subject,
  awardedSticker,
  stickerStore,
  allThreeQuestsDone,
  chestClaimed,
  goldCoins = 20,
  onRedeemCoinSticker,
  onOpenClawMachine,
  onOpenDailyChestModal,
  onResetCupStickers,
  onOpenStickerBook,
  onPlayAgain,
  onOpenTrophyRoom,
  onGoHome,
}: StickerRewardScreenProps) {
  const cup = SUBJECT_CUPS[subject];
  const boardState = stickerStore[subject] || {
    litIndices: [],
    completedCycles: 0,
  };
  const isAllSixLit = boardState.litIndices.length === 6;

  return (
    <div
      className="scene-screen treasure-screen sticker-reward-screen"
      style={{ backgroundImage: `url("/assets/scene-treasure.webp")` }}
    >
      <div
        className={`sticker-reward-modal ${
          isAllSixLit ? "full-set-flashing-board" : ""
        }`}
      >
        <div className="sticker-reward-top">
          <div className="newly-awarded-showcase">
            <img
              src={cup.cupImage}
              alt={cup.cupTitle}
              className="reward-cup-icon"
            />
            <div className="newly-awarded-sticker-frame">
              <img
                src={awardedSticker.image}
                alt={awardedSticker.name}
                className="newly-awarded-sticker-img"
              />
              <span className="new-sticker-badge">MỚI! ✨</span>
            </div>
          </div>

          <div className="sticker-reward-copy">
            <h1 className="sticker-reward-heading">
              {isAllSixLit
                ? `🎉 SÁNG ĐỦ 6/6 STICKER ${cup.characterName.toUpperCase()}!`
                : `🎁 TẶNG NẤM STICKER: ${awardedSticker.name.toUpperCase()}!`}
            </h1>
            <p className="sticker-reward-sub">
              {isAllSixLit ? (
                <>
                  Cả 6 sticker của <strong>{cup.characterName}</strong> đã sáng
                  rực rỡ! Bấm vào bảng hoặc nút{" "}
                  <strong>Mở Cúp Vàng & Cất Vào Vở</strong> để hợp nhất 6 Sticker
                  vào Cúp Vàng nhé!
                </>
              ) : (
                <>
                  Sticker vừa được thắp sáng trên{" "}
                  <strong>{cup.cupTitle}</strong> (
                  <strong>{boardState.litIndices.length}/6</strong> sticker đã
                  sáng) và đã mở khóa trong <strong>📒 Vở Sticker</strong>!
                </>
              )}
            </p>
            <div
              style={{
                marginTop: 6,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "linear-gradient(135deg, #fffbeb, #fef3c7)",
                border: "2px solid #f59e0b",
                borderRadius: 999,
                padding: "4px 14px",
                fontSize: 13,
                fontWeight: 900,
                color: "#92400e",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                <img
                  src="/assets/math/items/gold-coin.webp"
                  alt=""
                  className="inline-coin-3d-icon"
                />
                Thưởng +5 Xu Vàng!
              </span>
              <span>•</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                Ví của Nấm: {goldCoins}
                <img
                  src="/assets/math/items/gold-coin.webp"
                  alt=""
                  className="inline-coin-3d-icon"
                />
                Xu
              </span>
              <span>•</span>
              <span style={{ color: "#be185d" }}>
                10 Xu = 1 Sticker / 1 Lượt Gắp Thú / 1 Lần Xem Phim
              </span>
            </div>
          </div>
        </div>

        <div
          className={`character-sticker-grid-6 ${
            isAllSixLit ? "all-six-disco-glow" : ""
          }`}
          onClick={() => {
            if (isAllSixLit) {
              onResetCupStickers(subject);
            }
          }}
          title={
            isAllSixLit
              ? "Bấm để hợp nhất 6 Sticker vào Cúp Vàng & cất vào Quyển Vở Sticker!"
              : undefined
          }
        >
          {cup.stickers.map((stk) => {
            const isLit = boardState.litIndices.includes(stk.index);
            const isJustWon = stk.id === awardedSticker.id;
            return (
              <div
                key={stk.id}
                className={`sticker-board-slot ${
                  isLit ? "slot-lit" : "slot-unlit"
                } ${isJustWon ? "slot-just-won" : ""} ${
                  isAllSixLit ? "slot-flashing" : ""
                }`}
              >
                <img src={stk.image} alt={stk.name} />
                <span className="slot-sticker-name">
                  {isLit ? `✨ ${stk.name}` : `🔒 ${stk.name}`}
                </span>
              </div>
            );
          })}
        </div>

        <div className="treasure-actions">
          {allThreeQuestsDone && !chestClaimed && (
            <button
              type="button"
              className="chunky-btn chunky-gold daily-chest-cta-btn"
              onClick={onOpenDailyChestModal}
            >
              <Gift size={18} /> 🎁 Mở Rương Kho Báu Ngày Mới (+2 Sticker)!
            </button>
          )}
          {isAllSixLit && (
            <button
              type="button"
              className="chunky-btn chunky-gold daily-chest-cta-btn"
              onClick={() => onResetCupStickers(subject)}
            >
              <Trophy size={18} /> 🏆 Mở Cúp Vàng & Cất 6 Sticker Vào Vở!
            </button>
          )}
          {!isAllSixLit && onRedeemCoinSticker && (
            <button
              type="button"
              className="chunky-btn chunky-gold"
              onClick={() => onRedeemCoinSticker(subject)}
              disabled={goldCoins < 10}
              title="Dùng 10 Xu Vàng để mở thêm 1 Sticker môn học này ngay!"
            >
              <img
                src="/assets/math/items/gold-coin.webp"
                alt=""
                className="inline-coin-3d-icon"
              />
              <span>Đổi 10 Xu = +1 Sticker ({goldCoins} Xu)</span>
            </button>
          )}
          {onOpenClawMachine && (
            <button
              type="button"
              className="chunky-btn chunky-pink"
              onClick={onOpenClawMachine}
            >
              🧸 Máy Gắp Thú Sanrio (10 Xu/lượt)
            </button>
          )}
          <button
            type="button"
            className="chunky-btn chunky-pink"
            onClick={() => onOpenStickerBook(subject)}
          >
            <BookOpen size={18} /> 📒 Mang Vào Vở Dán Sticker Ngay!
          </button>
          <button
            type="button"
            className="chunky-btn chunky-green"
            onClick={() => onPlayAgain(subject)}
          >
            <RotateCcw size={18} /> Chơi Tiếp Để Sáng Thêm Sticker
          </button>
          <button
            type="button"
            className="chunky-btn chunky-gold"
            onClick={() => onOpenTrophyRoom(subject)}
          >
            <Trophy size={18} /> Xem Phòng Cúp & Sticker
          </button>
          <button
            type="button"
            className="chunky-btn chunky-blue"
            onClick={onGoHome}
          >
            <Home size={18} /> Về Sảnh Chính
          </button>
        </div>
      </div>
    </div>
  );
}
