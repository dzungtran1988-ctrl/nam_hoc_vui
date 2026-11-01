import { BookOpen, Check, RotateCcw, X } from "lucide-react";
import { getSubject } from "../../data/subjects";
import type { DailyQuestState, QuestItemInventory } from "../../data/dailyQuests";
import type { KawaiiPastryAsset } from "../../data/mathLessons";
import type { AwardedNamCupStickerResult } from "../../data/rewardStickers";
import type { SubjectId } from "../../types";

export interface DailyQuestChestModalProps {
  dailyQuests: DailyQuestState;
  questItemInventory: QuestItemInventory;
  chestBonusItems: KawaiiPastryAsset[] | null;
  chestNamBonus: AwardedNamCupStickerResult | null;
  onClose: () => void;
  onStartLesson: (subject: SubjectId) => void;
  onOpenDailyChest: () => void;
  onStartNewQuestRound: () => void;
  onOpenSupermarketStickerBook: () => void;
}

export function DailyQuestChestModal({
  dailyQuests,
  questItemInventory,
  chestBonusItems,
  chestNamBonus,
  onClose,
  onStartLesson,
  onOpenDailyChest,
  onStartNewQuestRound,
  onOpenSupermarketStickerBook,
}: DailyQuestChestModalProps) {
  const doneQuestCount = dailyQuests.quests.filter((q) => q.done).length;
  const allThreeQuestsDone = doneQuestCount === 3;

  return (
    <div
      className="video-modal-backdrop daily-quest-backdrop"
      onClick={onClose}
    >
      <div
        className="daily-quest-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="daily-quest-modal-header">
          <div className="dq-header-title">
            <span className="dq-title-icon">🎁</span>
            <h2>Nhiệm Vụ ({doneQuestCount}/3)</h2>
            <div className="dq-star-dots" aria-hidden="true">
              {dailyQuests.quests.map((q, i) => (
                <span
                  key={i}
                  className={`dq-star-dot ${q.done ? "lit" : ""}`}
                >
                  ⭐
                </span>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="dq-close-circle-btn"
            onClick={onClose}
            aria-label="Đóng"
          >
            <X size={18} />
          </button>
        </div>

        <div className="dq-three-cards-row">
          {dailyQuests.quests.map((q, idx) => {
            const subj = getSubject(q.subjectId);
            return (
              <button
                key={q.subjectId}
                type="button"
                className={`dq-quest-card ${q.done ? "is-done" : "is-pending"}`}
                onClick={() => onStartLesson(q.subjectId)}
              >
                <div className="dq-quest-thumb">
                  <img src={`/assets/${subj.image}`} alt={subj.name} />
                  <span className="dq-quest-num-badge">
                    {q.done ? "✅" : `${idx + 1}`}
                  </span>
                </div>
                <strong className="dq-quest-name">
                  {q.icon} {subj.name}
                </strong>
                {q.done ? (
                  <span className="dq-done-pill">
                    <Check size={13} /> Xong
                  </span>
                ) : (
                  <span className="dq-play-pill">▶ Chơi</span>
                )}
              </button>
            );
          })}
        </div>

        <div
          className={`dq-treasure-chest-box ${
            allThreeQuestsDone && !dailyQuests.chestClaimed
              ? "chest-ready-glow"
              : ""
          }`}
        >
          {chestBonusItems && chestBonusItems.length > 0 ? (
            <div className="dq-bonus-result">
              <div className="dq-bonus-stickers-row">
                {chestNamBonus && (
                  <div className="dq-bonus-sticker-card nam-vip-bonus-card">
                    <img
                      src={chestNamBonus.sticker.image}
                      alt={chestNamBonus.sticker.name}
                      className="dq-bonus-sticker-img"
                    />
                    <span className="dq-bonus-qty-tag">
                      👑 x{chestNamBonus.newCount}
                    </span>
                  </div>
                )}
                {chestBonusItems.map((item, i) => (
                  <div key={`${item.id}-${i}`} className="dq-bonus-sticker-card">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="dq-bonus-sticker-img"
                    />
                    <span className="dq-bonus-qty-tag">
                      x{questItemInventory[item.id] || 1}
                    </span>
                  </div>
                ))}
              </div>
              <div className="dq-bonus-actions">
                <button
                  type="button"
                  className="chunky-btn chunky-gold btn-sm"
                  onClick={onOpenSupermarketStickerBook}
                >
                  <BookOpen size={15} /> Dán Sticker
                </button>
                <button
                  type="button"
                  className="chunky-btn chunky-green btn-sm"
                  onClick={onStartNewQuestRound}
                >
                  <RotateCcw size={15} /> 3 Bài Mới
                </button>
              </div>
            </div>
          ) : allThreeQuestsDone && !dailyQuests.chestClaimed ? (
            <button
              type="button"
              className="dq-chest-ready-btn"
              onClick={onOpenDailyChest}
            >
              <span className="dq-ready-gift-icon">🎁✨</span>
              <strong>Mở Rương Nhận Quà! (3/3)</strong>
            </button>
          ) : dailyQuests.chestClaimed ? (
            <div className="dq-chest-claimed-area">
              <span className="dq-claimed-badge">🏆 Đã mở (3/3)</span>
              <div className="dq-bonus-actions">
                <button
                  type="button"
                  className="chunky-btn chunky-gold btn-sm"
                  onClick={onOpenSupermarketStickerBook}
                >
                  <BookOpen size={15} /> Dán Sticker
                </button>
                <button
                  type="button"
                  className="chunky-btn chunky-green btn-sm"
                  onClick={onStartNewQuestRound}
                >
                  <RotateCcw size={15} /> 3 Bài Mới
                </button>
              </div>
            </div>
          ) : (
            <div className="dq-chest-locked-area">
              <div className="dq-locked-left">
                <span className="dq-locked-chest-icon">🎁</span>
                <strong>Rương Quà ({doneQuestCount}/3)</strong>
              </div>
              <div className="dq-locked-progress-track">
                <div
                  className="dq-locked-progress-fill"
                  style={{ width: `${(doneQuestCount / 3) * 100}%` }}
                />
              </div>
              <span className="dq-locked-preview-icons">🍰 🍎 🚗</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
