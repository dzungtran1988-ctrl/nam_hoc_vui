import { useState } from "react";
import { BookOpen, Gift, Home, Sparkles, Trophy } from "lucide-react";
import { getSubject, subjects } from "../../data/subjects";
import {
  NAM_MASTER_CUP_IMAGE,
  NAM_SPECIAL_STICKERS,
  SUBJECT_CUPS,
  getNamRankInfo,
  getPlacedStickerCountMap,
  getSubjectSetStickerEarnedCount,
  getSubjectSetUnlockedCount,
  getSubjectStickerSet,
  getTotalUnlockedInBook,
  getUnlockedNamSpecialCount,
  isSubjectSet2Available,
  loadNamSpecialInventory,
  type DrawerTabId,
  type StickerCollectionStore,
} from "../../data/rewardStickers";
import type { SubjectId } from "../../types";

export interface StarTrophyScreenProps {
  stickerStore: StickerCollectionStore;
  selectedCupSubject: SubjectId;
  onSelectCupSubject: (subject: SubjectId) => void;
  onGoHome: () => void;
  onOpenStickerBook: (initialFilter: DrawerTabId) => void;
  onStartLesson: (subject: SubjectId) => void;
  onOpenDailyChestModal: () => void;
  onResetCupStickers: (subject: SubjectId) => void;
  goldCoins?: number;
  onRedeemCoinSticker?: (subject: SubjectId) => void;
  onOpenClawMachine?: () => void;
}

export function StarTrophyScreen({
  stickerStore,
  selectedCupSubject,
  onSelectCupSubject,
  onGoHome,
  onOpenStickerBook,
  onStartLesson,
  onOpenDailyChestModal,
  onResetCupStickers,
  goldCoins = 20,
  onRedeemCoinSticker,
  onOpenClawMachine,
}: StarTrophyScreenProps) {
  const [selectedStickerSet, setSelectedStickerSet] = useState<1 | 2 | 3 | 4>(
    selectedCupSubject === "storybook" ? 2 : 1,
  );
  const [isViewingNamVipSet, setIsViewingNamVipSet] = useState(false);
  const [namVipPage, setNamVipPage] = useState<1 | 2 | 3 | 4>(1);

  const totalUnlockedInBook = getTotalUnlockedInBook(stickerStore);
  const namRank = getNamRankInfo(stickerStore);

  const activeCup = SUBJECT_CUPS[selectedCupSubject];
  const activeBoard = stickerStore[selectedCupSubject] || {
    litIndices: [],
    completedCycles: 0,
  };
  const isActiveFullLit = activeBoard.litIndices.length === 6;
  const hasSet2 = isSubjectSet2Available(selectedCupSubject);
  const effectiveSet: 1 | 2 | 3 | 4 =
    selectedCupSubject === "lifeskills"
      ? selectedStickerSet
      : selectedStickerSet > 2
        ? 1
        : selectedStickerSet;
  const currentStickers = getSubjectStickerSet(selectedCupSubject, effectiveSet);
  const set1LitCount = getSubjectSetUnlockedCount(
    stickerStore,
    selectedCupSubject,
    1,
  );
  const set2LitCount = getSubjectSetUnlockedCount(
    stickerStore,
    selectedCupSubject,
    2,
  );
  const set3LitCount = getSubjectSetUnlockedCount(
    stickerStore,
    selectedCupSubject,
    3,
  );
  const set4LitCount = getSubjectSetUnlockedCount(
    stickerStore,
    selectedCupSubject,
    4,
  );

  const namInv = loadNamSpecialInventory();
  const unlockedNamCount = getUnlockedNamSpecialCount(namInv);
  const namNonStageList = NAM_SPECIAL_STICKERS.filter((s) => s.tier !== "stage");
  const namPageStickers = namNonStageList.slice(
    (namVipPage - 1) * 6,
    namVipPage * 6,
  );
  const placedMap = getPlacedStickerCountMap();

  return (
    <div
      className="scene-screen achievements-screen"
      style={{
        backgroundImage: `url("/assets/scene-lobby-pastel.webp")`,
      }}
    >
      <header className="garland-hud pastel-trophy-hud">
        <div className="hud-left-group">
          <button
            type="button"
            className="hud-pill hud-pink"
            onClick={onGoHome}
          >
            <Home size={17} /> Về Sảnh Chính
          </button>
          <button
            type="button"
            className="hud-pill hud-purple"
            onClick={() =>
              onOpenStickerBook(
                isViewingNamVipSet ? "nam-special" : selectedCupSubject,
              )
            }
          >
            <BookOpen size={16} /> 📒 Vở Dán Sticker ({totalUnlockedInBook}/48)
          </button>
          <span
            className="hud-pill hud-gold"
            title="Hoàn thành 1 bài học = +5 Xu Vàng • 10 Xu = 1 Sticker / 1 Lượt Gắp Thú / 1 Lần Xem Phim"
          >
            <img
              src="/assets/math/items/gold-coin.webp"
              alt=""
              className="inline-coin-3d-icon"
            />
            <span>{goldCoins} Xu Vàng</span>
          </span>
          {onOpenClawMachine && (
            <button
              type="button"
              className="hud-pill hud-pink"
              onClick={onOpenClawMachine}
            >
              🧸 Máy Gắp Thú (10 Xu)
            </button>
          )}
        </div>

        <div className="hud-stage-title">
          <img
            src={NAM_MASTER_CUP_IMAGE}
            alt="Cúp Bé Nấm"
            className="hud-nam-cup-icon"
          />
          <strong>
            PHÒNG CÚP & STICKER · {namRank.icon} {namRank.title}
          </strong>
        </div>

        <button
          type="button"
          className="hud-pill hud-gold"
          onClick={() => onStartLesson(selectedCupSubject)}
        >
          <Sparkles size={16} /> Học {getSubject(selectedCupSubject).name}
        </button>
      </header>

      <div className="trophy-room-container trophy-split-layout">
        <aside className="trophy-left-cups-panel">
          <button
            type="button"
            className={`nam-vip-cup-banner ${
              isViewingNamVipSet ? "selected-vip" : ""
            }`}
            onClick={() => setIsViewingNamVipSet(true)}
          >
            <div className="nam-vip-banner-icon">
              <img src={NAM_MASTER_CUP_IMAGE} alt="Cúp Sticker Nấm" />
              <span className="nam-vip-crown-tag">VIP</span>
            </div>
            <div className="nam-vip-banner-info">
              <strong>👑 Ô Sticker Bé Nấm (Xịn Nhất)</strong>
              <span>Nhận khi: Xong NV Ngày · Mở 6 ô môn học</span>
            </div>
            <span className="nam-vip-count-pill">
              🌟 {unlockedNamCount}/{NAM_SPECIAL_STICKERS.length}
            </span>
          </button>

          <div className="cups-selector-bar cups-grid-8-fixed">
            {subjects.map((subj) => {
              const cupCfg = SUBJECT_CUPS[subj.id];
              const bState = stickerStore[subj.id] || {
                litIndices: [],
                completedCycles: 0,
              };
              const litCount = bState.litIndices.length;
              const isFull = litCount === 6;
              const isSelected =
                !isViewingNamVipSet && selectedCupSubject === subj.id;

              return (
                <button
                  key={subj.id}
                  type="button"
                  className={`subject-cup-card ${
                    isSelected ? "selected-cup" : ""
                  } ${isFull ? "cup-full-flashing" : ""}`}
                  style={
                    {
                      "--cup-accent": cupCfg.accentColor,
                    } as React.CSSProperties
                  }
                  onClick={() => {
                    setIsViewingNamVipSet(false);
                    onSelectCupSubject(subj.id);
                    if (subj.id === "storybook") setSelectedStickerSet(2);
                    else if (subj.id !== "lifeskills") setSelectedStickerSet(1);
                  }}
                >
                  <div className="cup-card-row">
                    <div className="cup-img-wrap">
                      <img src={cupCfg.cupImage} alt={cupCfg.cupTitle} />
                      {bState.completedCycles > 0 && (
                        <span className="cup-cycle-badge">
                          👑×{bState.completedCycles}
                        </span>
                      )}
                    </div>
                    <div className="cup-card-meta">
                      <strong className="cup-subject-name">{subj.name}</strong>
                      <span className="cup-char-name">
                        {cupCfg.characterName}
                      </span>
                      <span
                        className={`cup-progress-pill ${isFull ? "full" : ""}`}
                      >
                        {isFull ? "🏆 MỞ CÚP!" : `🌟 ${litCount}/6`}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {isViewingNamVipSet ? (
          <section className="selected-cup-sticker-board trophy-right-stickers-panel nam-vip-board-panel">
            <div className="sticker-board-header">
              <div className="board-header-left">
                <img
                  src={NAM_MASTER_CUP_IMAGE}
                  alt="Sticker Bé Nấm"
                  className="board-header-cup-img"
                />
                <div>
                  <h3 className="board-header-title">
                    👑 Kho Sticker Bé Nấm Siêu Cấp ({unlockedNamCount}/
                    {NAM_SPECIAL_STICKERS.length})
                  </h3>
                  <p className="board-header-sub">
                    🎁 Sticker Nấm chỉ nhận được khi:{" "}
                    <strong>(1) Hoàn thành Nhiệm Vụ Ngày (3/3)</strong> hoặc{" "}
                    <strong>(2) Mở đủ 6/6 ô của 1 khu môn học chính</strong>{" "}
                    (trừ Kỹ Năng Sống)!
                  </p>
                </div>
              </div>

              <div className="board-header-actions">
                <div
                  className="sticker-set-tabs"
                  role="tablist"
                  aria-label="Chọn trang Sticker Nấm"
                >
                  {([1, 2, 3, 4] as const).map((pg) => (
                    <button
                      key={pg}
                      type="button"
                      role="tab"
                      aria-selected={namVipPage === pg}
                      className={`sticker-set-tab-btn ${
                        namVipPage === pg ? "active" : ""
                      }`}
                      onClick={() => setNamVipPage(pg)}
                    >
                      👑 Nấm #{pg}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="chunky-btn chunky-gold btn-sm"
                  onClick={onOpenDailyChestModal}
                >
                  <Gift size={15} /> 🗺️ Xem NV Ngày
                </button>
              </div>
            </div>

            <div className="character-sticker-grid-6">
              {namPageStickers.map((stk, i) => {
                const globalIdx = (namVipPage - 1) * 6 + i + 1;
                const earnedQty = namInv[stk.id] || 0;
                const placedQty = placedMap[stk.id] || 0;
                const remainQty = Math.max(0, earnedQty - placedQty);
                const isUnlocked = earnedQty > 0;

                return (
                  <div
                    key={stk.id}
                    className={`sticker-board-slot ${
                      isUnlocked ? "slot-lit" : "slot-unlit"
                    }`}
                  >
                    {isUnlocked ? (
                      <span
                        className={`slot-qty-pill ${
                          remainQty > 0 ? "has-stock" : "out-of-stock"
                        }`}
                      >
                        {remainQty > 0
                          ? `Còn x${remainQty}`
                          : `Đã dán (${earnedQty})`}
                      </span>
                    ) : (
                      <span className="slot-set-badge">
                        🔒 NV Ngày / 6 ô môn học
                      </span>
                    )}
                    <img src={stk.image} alt={stk.name} />
                    <span className="slot-sticker-name">
                      {isUnlocked
                        ? `👑 #${globalIdx}: ${stk.name} (x${earnedQty})`
                        : `🔒 #${globalIdx}: ${stk.name}`}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        ) : (
          <section
            className={`selected-cup-sticker-board trophy-right-stickers-panel ${
              isActiveFullLit ? "board-full-flashing" : ""
            }`}
          >
            <div className="sticker-board-header">
              <div className="board-header-left">
                <img
                  src={activeCup.cupImage}
                  alt={activeCup.cupTitle}
                  className="board-header-cup-img"
                />
                <div>
                  <h3 className="board-header-title">
                    {activeCup.cupTitle} · {activeCup.characterName}
                  </h3>
                  <p className="board-header-sub">
                    {selectedCupSubject === "lifeskills"
                      ? "🍳 Kỹ Năng Sống thưởng trọn bộ 24 Sticker 3D Đầu Bếp & Món Ngon (4 Bộ × 6 hình) từ Kho Dùng Chung!"
                      : isActiveFullLit
                        ? "✨ Đã mở đủ 6/6 ô môn này! Bấm Mở Cúp Vàng để nhận ngay +1 Sticker Bé Nấm xịn nhất nhé!"
                        : effectiveSet === 1
                          ? `Học môn ${getSubject(selectedCupSubject).name} để mở đủ 6/6 ô (${set1LitCount}/6) ➔ Nhận ngay +1 Sticker Bé Nấm xịn nhất!`
                          : selectedCupSubject === "storybook" && effectiveSet === 2
                            ? `🎃 Bộ 2 Khu Giải Trí: Nhận ngay Sticker Nhân Vật Hóa Trang Halloween (${set2LitCount}/6) khi chơi Khu Giải Trí, mở Giỏ Bí Ngô hoặc đổi 10 Xu!`
                            : selectedCupSubject === "reading" ||
                                selectedCupSubject === "math" ||
                                selectedCupSubject === "coloring"
                              ? `👩‍⚕️ Bộ 2 Nghề Nghiệp Đáng Yêu (${set2LitCount}/6): Hoàn thành bài học hoặc đổi 10 Xu để mở khóa thêm Sticker Nghề Nghiệp Sanrio nhé!`
                              : selectedCupSubject === "english" ||
                                  selectedCupSubject === "minigame"
                                ? `🌍 Bộ 2 Quốc Gia Thế Giới (${set2LitCount}/6): Hoàn thành bài học hoặc đổi 10 Xu để mở khóa thêm Sticker Trang Phục Quốc Gia nhé!`
                                : `🎸 Bộ 2 Dàn Nhạc Sanrio (${set2LitCount}/6): Hoàn thành bài học Âm Nhạc hoặc đổi 10 Xu để mở khóa thêm Sticker Nhạc Cụ nhé!`}
                  </p>
                </div>
              </div>

              <div className="board-header-actions">
                <div
                  className="sticker-set-tabs"
                  role="tablist"
                  aria-label="Chọn bộ Sticker"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={effectiveSet === 1}
                    className={`sticker-set-tab-btn ${
                      effectiveSet === 1 ? "active" : ""
                    }`}
                    onClick={() => setSelectedStickerSet(1)}
                  >
                    {selectedCupSubject === "lifeskills"
                      ? `🥣 Bộ 1: Sơ Chế (${set1LitCount}/6)`
                      : `🌟 Bộ 1 (${set1LitCount}/6)`}
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={effectiveSet === 2}
                    className={`sticker-set-tab-btn ${
                      effectiveSet === 2 ? "active" : ""
                    }`}
                    onClick={() => setSelectedStickerSet(2)}
                  >
                    {selectedCupSubject === "lifeskills"
                      ? `🍳 Bộ 2: Đồ Bếp (${set2LitCount}/6)`
                      : selectedCupSubject === "storybook"
                        ? `🎃 Bộ 2: Nhân Vật Halloween (${set2LitCount}/6)`
                        : selectedCupSubject === "reading" ||
                            selectedCupSubject === "math" ||
                            selectedCupSubject === "coloring"
                          ? `👩‍⚕️ Bộ 2: Nghề Nghiệp (${set2LitCount}/6)`
                          : selectedCupSubject === "english" ||
                              selectedCupSubject === "minigame"
                            ? `🌍 Bộ 2: Quốc Gia (${set2LitCount}/6)`
                            : `🎸 Bộ 2: Nhạc Cụ (${set2LitCount}/6)`}
                  </button>
                  {selectedCupSubject === "lifeskills" && (
                    <>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={effectiveSet === 3}
                        className={`sticker-set-tab-btn ${
                          effectiveSet === 3 ? "active" : ""
                        }`}
                        onClick={() => setSelectedStickerSet(3)}
                      >
                        {`🧁 Bộ 3: Làm Bánh (${set3LitCount}/6)`}
                      </button>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={effectiveSet === 4}
                        className={`sticker-set-tab-btn ${
                          effectiveSet === 4 ? "active" : ""
                        }`}
                        onClick={() => setSelectedStickerSet(4)}
                      >
                        {`🍜 Bộ 4: Bữa Cơm (${set4LitCount}/6)`}
                      </button>
                    </>
                  )}
                </div>

                {isActiveFullLit ? (
                  <button
                    type="button"
                    className="chunky-btn chunky-gold btn-sm flashing-reset-btn"
                    onClick={() => onResetCupStickers(selectedCupSubject)}
                  >
                    <Trophy size={15} />{" "}
                    {selectedCupSubject === "lifeskills"
                      ? "🏆 Mở Cúp Bánh Kẹo!"
                      : "🏆 Mở Cúp (+1 Sticker Nấm)!"}
                  </button>
                ) : (
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {onRedeemCoinSticker && (
                      <button
                        type="button"
                        className="chunky-btn chunky-gold btn-sm"
                        onClick={() => onRedeemCoinSticker(selectedCupSubject)}
                        disabled={goldCoins < 10}
                        title="Đổi 10 Xu Vàng lấy ngay +1 Sticker môn này!"
                      >
                        <img
                          src="/assets/math/items/gold-coin.webp"
                          alt=""
                          className="inline-coin-3d-icon"
                        />
                        <span>Đổi 10 Xu = +1 Sticker ({goldCoins} Xu)</span>
                      </button>
                    )}
                    <button
                      type="button"
                      className="chunky-btn chunky-green btn-sm"
                      onClick={() => onStartLesson(selectedCupSubject)}
                    >
                      <Sparkles size={15} /> Chơi Nhận Sticker (+5 Xu)
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div
              className={`character-sticker-grid-6 ${
                isActiveFullLit ? "all-six-disco-glow" : ""
              }`}
              onClick={() => {
                if (isActiveFullLit) {
                  onResetCupStickers(selectedCupSubject);
                }
              }}
              title={
                isActiveFullLit
                  ? "Bấm vào đây để Hợp Nhất Mở Cúp Vàng!"
                  : undefined
              }
            >
              {currentStickers.map((stk) => {
                const isDarkLockedSet2 = effectiveSet >= 2 && !hasSet2;

                const earnedQty = isDarkLockedSet2
                  ? 0
                  : getSubjectSetStickerEarnedCount(
                      stickerStore,
                      selectedCupSubject,
                      effectiveSet,
                      stk.index,
                    );

                const isLit = isDarkLockedSet2
                  ? false
                  : effectiveSet === 1
                    ? activeBoard.litIndices.includes(stk.index) ||
                      (selectedCupSubject === "lifeskills" &&
                        activeBoard.completedCycles >= 1)
                    : earnedQty > 0;

                const placedQty = placedMap[stk.id] || 0;
                const remainQty = Math.max(0, earnedQty - placedQty);

                return (
                  <div
                    key={stk.id}
                    className={`sticker-board-slot ${
                      isDarkLockedSet2
                        ? "slot-unlit slot-dark-locked"
                        : isLit || earnedQty > 0
                          ? "slot-lit"
                          : "slot-unlit"
                    } ${
                      isActiveFullLit && !isDarkLockedSet2
                        ? "slot-flashing"
                        : ""
                    }`}
                  >
                    {isDarkLockedSet2 ? (
                      <span className="slot-set-badge dark-badge">
                        🔒 Bộ 2 · Chờ thêm
                      </span>
                    ) : earnedQty > 0 ? (
                      <span
                        className={`slot-qty-pill ${
                          remainQty > 0 ? "has-stock" : "out-of-stock"
                        }`}
                      >
                        {remainQty > 0
                          ? `Còn x${remainQty}`
                          : `Đã dán (${earnedQty})`}
                      </span>
                    ) : (
                      <span className="slot-set-badge">
                        {selectedStickerSet === 1
                          ? "Bộ 1"
                          : selectedCupSubject === "storybook"
                            ? "🎃 Bộ 2 · Halloween"
                            : "🔒 Xong Bộ 1 để mở"}
                      </span>
                    )}
                    <img src={stk.image} alt={stk.name} />
                    <span className="slot-sticker-name">
                      {isDarkLockedSet2
                        ? `🔒 Ô #${stk.index}: Bộ 2 (Chờ thêm)`
                        : isLit || earnedQty > 0
                          ? `🌟 #${stk.index}: ${stk.name} (x${earnedQty})`
                          : `🔒 #${stk.index}: ${stk.name}`}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
