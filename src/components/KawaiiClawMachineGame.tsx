import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  COST_CLAW_TURN,
  SANRIO_CLAW_PLUSHIES,
  type ClawPlushieInventory,
  type SanrioClawPlushieItem,
  awardClawPlushie,
  getUnlockedClawPlushieIds,
  loadClawPlushieInventory,
} from "../data/goldCoinsEconomy";
import {
  playRewardTone,
  playStickerPeelStickSound,
} from "../lib/sound";
import { useSpeech } from "../hooks/useSpeech";

type PlushieSlotInPit = {
  slotId: string;
  plushie: SanrioClawPlushieItem;
  /** X coordinate inside glass window (27% to 85%) */
  xPercent: number;
  /** Y coordinate inside glass window (58% to 74%) */
  yPercent: number;
  row: "back" | "front";
  tiltDeg: number;
};

type ClawPhase =
  | "idle" // Ready to move claw left/right and press Drop (10 coins charged when dropping or inserting coin)
  | "dropping" // Claw descending straight down at current clawX
  | "grabbing" // Prongs closing at current clawX
  | "lifting" // Lifting plushie up to top rail
  | "returning_chute" // Carrying plushie left to x = 16.5% over prize chute
  | "releasing" // Dropping plushie into prize chute
  | "celebrating"; // Showing caught plushie modal

interface KawaiiClawMachineGameProps {
  goldCoins: number;
  onSpendCoins: (cost: number) => boolean;
  onOpenPlushieShelf?: () => void;
  onBack?: () => void;
  soundEnabled?: boolean;
}

const CHUTE_X_PERCENT = 16.5;
const DEFAULT_CLAW_X = 54;

function pickPitPlushies(inventory: ClawPlushieInventory): PlushieSlotInPit[] {
  const unowned = SANRIO_CLAW_PLUSHIES.filter((p) => !inventory[p.id]);
  const owned = SANRIO_CLAW_PLUSHIES.filter((p) => Boolean(inventory[p.id]));

  const shuffledUnowned = [...unowned].sort(() => Math.random() - 0.5);
  const shuffledOwned = [...owned].sort(() => Math.random() - 0.5);
  const combined = [...shuffledUnowned, ...shuffledOwned];

  const chosen = combined.slice(0, 11);
  const backXs = [31, 44, 57, 70, 82];
  const frontXs = [28, 39, 50, 61, 72, 83];

  const slots: PlushieSlotInPit[] = [];
  chosen.forEach((plushie, idx) => {
    const isBack = idx < 5;
    const xBase = isBack ? backXs[idx] : frontXs[idx - 5];
    const jitterX = (Math.random() - 0.5) * 2.0;
    const yBase = isBack ? 58 + (idx % 2) * 2.5 : 68 + (idx % 2) * 3;
    const tilt = Math.round((Math.random() - 0.5) * 12);
    slots.push({
      slotId: `${plushie.id}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
      plushie,
      xPercent: Math.max(27, Math.min(85, Number((xBase + jitterX).toFixed(1)))),
      yPercent: yBase,
      row: isBack ? "back" : "front",
      tiltDeg: tilt,
    });
  });

  return slots;
}

export function KawaiiClawMachineGame({
  goldCoins,
  onSpendCoins,
  onOpenPlushieShelf,
  soundEnabled = true,
}: KawaiiClawMachineGameProps) {
  const { speak } = useSpeech(soundEnabled);
  const [inventory, setInventory] = useState<ClawPlushieInventory>(() =>
    loadClawPlushieInventory(),
  );
  const [pitSlots, setPitSlots] = useState<PlushieSlotInPit[]>(() =>
    pickPitPlushies(loadClawPlushieInventory()),
  );
  const [targetIds, setTargetIds] = useState<string[]>([]);

  const [clawPhase, setClawPhase] = useState<ClawPhase>("idle");
  const [coinInserted, setCoinInserted] = useState<boolean>(false);
  const [clawX, setClawX] = useState<number>(DEFAULT_CLAW_X);
  const [cableLengthPercent, setCableLengthPercent] = useState<number>(11);
  const [grabbedSlot, setGrabbedSlot] = useState<PlushieSlotInPit | null>(null);
  const [fallingChutePlushie, setFallingChutePlushie] =
    useState<SanrioClawPlushieItem | null>(null);
  const [caughtResult, setCaughtResult] = useState<{
    plushie: SanrioClawPlushieItem;
    newCount: number;
    isFirstTime: boolean;
    wasTargetBonus: boolean;
  } | null>(null);

  const [level, setLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [noCoinShake, setNoCoinShake] = useState<boolean>(false);

  const timersRef = useRef<number[]>([]);
  const moveHoldRef = useRef<number | null>(null);
  const glassRef = useRef<HTMLDivElement | null>(null);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const stopHoldMove = useCallback(() => {
    if (moveHoldRef.current !== null) {
      window.clearInterval(moveHoldRef.current);
      moveHoldRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearAllTimers();
      stopHoldMove();
    };
  }, [clearAllTimers, stopHoldMove]);

  useEffect(() => {
    if (pitSlots.length === 0) return;
    setTargetIds((prev) => {
      const valid = prev.filter((id) => pitSlots.some((s) => s.plushie.id === id));
      if (valid.length >= 3) return valid.slice(0, 3);
      const candidates = pitSlots
        .map((s) => s.plushie.id)
        .filter((id) => !valid.includes(id));
      return [...valid, ...candidates].slice(0, 3);
    });
  }, [pitSlots]);

  const unlockedUniqueCount = useMemo(
    () => getUnlockedClawPlushieIds(inventory).length,
    [inventory],
  );

  // Plushie directly underneath the current clawX ("Cần gắp đứng đâu, thả lấy ở đó")
  const plushieUnderClaw = useMemo(() => {
    if (pitSlots.length === 0) return null;
    let best: PlushieSlotInPit | null = null;
    let bestDist = Infinity;
    for (const slot of pitSlots) {
      const dist = Math.abs(slot.xPercent - clawX) - (slot.row === "front" ? 1.0 : 0);
      if (dist < bestDist) {
        best = slot;
        bestDist = dist;
      }
    }
    // Within 9.5% of clawX is directly under the prongs
    return best && Math.abs(best.xPercent - clawX) <= 9.5 ? best : null;
  }, [pitSlots, clawX]);

  const moveClawBy = useCallback(
    (delta: number) => {
      if (clawPhase !== "idle") return;
      setClawX((prev) =>
        Math.max(26, Math.min(85, Number((prev + delta).toFixed(1)))),
      );
    },
    [clawPhase],
  );

  const startHoldMove = (delta: number) => {
    if (clawPhase !== "idle") return;
    stopHoldMove();
    playStickerPeelStickSound();
    moveClawBy(delta);
    moveHoldRef.current = window.setInterval(() => {
      moveClawBy(delta * 0.75);
    }, 65);
  };

  const handleInsertCoin = () => {
    if (clawPhase !== "idle" || coinInserted) return true;
    if (goldCoins < COST_CLAW_TURN) {
      setNoCoinShake(true);
      window.setTimeout(() => setNoCoinShake(false), 600);
      speak("Bé cần mười xu vàng để gắp thú. Bé học thêm bài để nhận xu nhé!");
      return false;
    }
    const ok = onSpendCoins(COST_CLAW_TURN);
    if (!ok) return false;
    playStickerPeelStickSound();
    setCoinInserted(true);
    return true;
  };

  // Drop claw straight down where it is currently standing (`clawX`)!
  const handleDropClawHere = useCallback(() => {
    if (clawPhase !== "idle") return;
    stopHoldMove();

    if (!coinInserted) {
      if (goldCoins < COST_CLAW_TURN) {
        setNoCoinShake(true);
        window.setTimeout(() => setNoCoinShake(false), 600);
        speak("Bé cần mười xu vàng để gắp thú. Bé học thêm bài để nhận xu nhé!");
        return;
      }
      const ok = onSpendCoins(COST_CLAW_TURN);
      if (!ok) return;
    }

    setCoinInserted(false);
    clearAllTimers();

    const caughtSlot = plushieUnderClaw;
    const dropDepth = caughtSlot
      ? caughtSlot.row === "front"
        ? 45
        : 37
      : 42;

    // 1. Drop straight down at current clawX
    setClawPhase("dropping");
    setCableLengthPercent(dropDepth);
    playStickerPeelStickSound();

    // 2. Close prongs at bottom (620ms)
    const t1 = window.setTimeout(() => {
      setClawPhase("grabbing");
      if (caughtSlot) {
        setGrabbedSlot(caughtSlot);
        setPitSlots((prev) => prev.filter((s) => s.slotId !== caughtSlot.slotId));
      }
    }, 620);

    // 3. Lift straight up to top rail (1150ms)
    const t2 = window.setTimeout(() => {
      setClawPhase("lifting");
      setCableLengthPercent(11);
    }, 1150);

    // 4. Move left to the Prize Chute at x = 16.5% (1750ms)
    const t3 = window.setTimeout(() => {
      setClawPhase("returning_chute");
      setClawX(CHUTE_X_PERCENT);
    }, 1750);

    // 5. Open prongs over the chute (2400ms)
    const t4 = window.setTimeout(() => {
      setClawPhase("releasing");
      if (caughtSlot) {
        setFallingChutePlushie(caughtSlot.plushie);
        setGrabbedSlot(null);
        playRewardTone();
      }
    }, 2400);

    // 6. Finish turn & award plushie if caught (2980ms)
    const t5 = window.setTimeout(() => {
      setFallingChutePlushie(null);
      if (!caughtSlot) {
        setClawPhase("idle");
        setClawX(DEFAULT_CLAW_X);
        return;
      }

      const { inventory: updatedInv, newCount, isFirstTime } = awardClawPlushie(
        caughtSlot.plushie.id,
      );
      setInventory(updatedInv);

      const isBonusTarget = targetIds.includes(caughtSlot.plushie.id);
      setScore((prev) => prev + (isBonusTarget ? 200 : 100));
      if (isBonusTarget) {
        setLevel((prev) => prev + 1);
        setTargetIds((prev) => prev.filter((id) => id !== caughtSlot.plushie.id));
      }

      setPitSlots((prev) =>
        prev.length < 6 ? pickPitPlushies(updatedInv) : prev,
      );

      setCaughtResult({
        plushie: caughtSlot.plushie,
        newCount,
        isFirstTime,
        wasTargetBonus: isBonusTarget,
      });
      setClawPhase("celebrating");
    }, 2980);

    timersRef.current.push(t1, t2, t3, t4, t5);
  }, [
    clearAllTimers,
    clawPhase,
    coinInserted,
    goldCoins,
    onSpendCoins,
    plushieUnderClaw,
    speak,
    stopHoldMove,
    targetIds,
  ]);

  // Keyboard support: ArrowLeft / ArrowRight to move claw, Space / Enter / ArrowDown to drop!
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (clawPhase !== "idle") return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        moveClawBy(-4.5);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        moveClawBy(4.5);
      } else if (e.key === " " || e.key === "Enter" || e.key === "ArrowDown") {
        e.preventDefault();
        handleDropClawHere();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [clawPhase, moveClawBy, handleDropClawHere]);

  const handleShufflePit = () => {
    if (clawPhase !== "idle" && clawPhase !== "celebrating") return;
    playStickerPeelStickSound();
    const fresh = pickPitPlushies(inventory);
    setPitSlots(fresh);
    setTargetIds(fresh.slice(0, 3).map((s) => s.plushie.id));
  };

  // Dragging or tapping inside the glass window moves clawX to that horizontal position
  const handleGlassPointerDownOrMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (clawPhase !== "idle" || !glassRef.current) return;
    if (e.type === "pointermove" && e.buttons === 0) return;
    const rect = glassRef.current.getBoundingClientRect();
    if (rect.width <= 0) return;
    const relX = ((e.clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(26, Math.min(85, Number(relX.toFixed(1))));
    setClawX(clamped);
  };

  const targetPlushies = useMemo(
    () =>
      targetIds
        .map((id) => SANRIO_CLAW_PLUSHIES.find((p) => p.id === id))
        .filter((p): p is SanrioClawPlushieItem => Boolean(p)),
    [targetIds],
  );

  const isProngsClosed =
    clawPhase === "grabbing" ||
    clawPhase === "lifting" ||
    clawPhase === "returning_chute";

  return (
    <div className="sanrio-claw-fullstage">
      {/* Main Machine Stage + Floating Compact Target Bubbles */}
      <div className="sanrio-claw-center-wrap">
        <div className="sanrio-machine-aspect-box">
          <img
            src="/assets/claw-plushies/sanrio-machine-frame.webp"
            alt="Máy Gắp Thú Sanrio"
            className="sanrio-machine-frame-img"
            draggable={false}
          />

          {/* Glass Window Interactive Viewport */}
          <div
            ref={glassRef}
            className="sanrio-glass-viewport"
            onPointerDown={handleGlassPointerDownOrMove}
            onPointerMove={handleGlassPointerDownOrMove}
          >
            <div className="sanrio-claw-top-rail" />

            {/* Vertical Aim Line under Claw */}
            {clawPhase === "idle" && (
              <div
                className="sanrio-aim-laser"
                style={{ left: `${clawX}%` }}
                aria-hidden="true"
              />
            )}

            {/* Animated Pink-Bow 2-Prong Sanrio Claw */}
            <div
              className={`sanrio-claw-assembly phase-${clawPhase}`}
              style={{ left: `${clawX}%` }}
            >
              <div className="sanrio-claw-carriage" />
              <div
                className="sanrio-claw-cable"
                style={{ height: `${cableLengthPercent}%` }}
              />
              <div className={`sanrio-claw-head ${isProngsClosed ? "closed" : "open"}`}>
                <svg
                  viewBox="0 0 120 110"
                  className="sanrio-claw-svg"
                  aria-hidden="true"
                >
                  <path
                    className="claw-prong-left"
                    d={
                      isProngsClosed
                        ? "M 48 36 C 24 52, 26 84, 52 98"
                        : "M 46 36 C 14 50, 12 80, 32 98"
                    }
                    fill="none"
                    stroke="#a5b4fc"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  <path
                    className="claw-prong-right"
                    d={
                      isProngsClosed
                        ? "M 72 36 C 96 52, 94 84, 68 98"
                        : "M 74 36 C 106 50, 108 80, 88 98"
                    }
                    fill="none"
                    stroke="#a5b4fc"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  <circle
                    cx={isProngsClosed ? 52 : 32}
                    cy={98}
                    r="6"
                    fill="#ff85b3"
                    stroke="#e0568c"
                    strokeWidth="2"
                  />
                  <circle
                    cx={isProngsClosed ? 68 : 88}
                    cy={98}
                    r="6"
                    fill="#ff85b3"
                    stroke="#e0568c"
                    strokeWidth="2"
                  />
                  <ellipse
                    cx="42"
                    cy="26"
                    rx="18"
                    ry="13"
                    fill="#ff9ec4"
                    stroke="#d96b98"
                    strokeWidth="2.5"
                  />
                  <ellipse
                    cx="78"
                    cy="26"
                    rx="18"
                    ry="13"
                    fill="#ff9ec4"
                    stroke="#d96b98"
                    strokeWidth="2.5"
                  />
                  <circle
                    cx="60"
                    cy="26"
                    r="9.5"
                    fill="#ffb3d1"
                    stroke="#d96b98"
                    strokeWidth="2.5"
                  />
                </svg>

                {grabbedSlot && (
                  <div className="sanrio-grabbed-plushie-holder">
                    <img
                      src={grabbedSlot.plushie.imageSrc}
                      alt={grabbedSlot.plushie.label}
                      className="sanrio-plushie-3d-img grabbed"
                      draggable={false}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* 3D Plushies inside the Glass Window */}
            <div className="sanrio-plushie-pit">
              {pitSlots.map((slot) => {
                const isAimed =
                  clawPhase === "idle" &&
                  plushieUnderClaw?.slotId === slot.slotId;
                const isBonusTarget = targetIds.includes(slot.plushie.id);

                return (
                  <div
                    key={slot.slotId}
                    className={`sanrio-pit-plushie-btn row-${slot.row} ${
                      isAimed ? "aimed-target" : ""
                    }`}
                    style={{
                      left: `${slot.xPercent}%`,
                      top: `${slot.yPercent}%`,
                      transform: `translate(-50%, -50%) rotate(${slot.tiltDeg}deg)`,
                    }}
                  >
                    <img
                      src={slot.plushie.imageSrc}
                      alt={slot.plushie.label}
                      className="sanrio-plushie-3d-img"
                      draggable={false}
                    />
                    {isBonusTarget && (
                      <span className="sanrio-pit-bonus-tag">⭐x2</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Falling Plushie Animation into Bottom-Left Prize Chute */}
            {fallingChutePlushie && (
              <div className="sanrio-chute-drop-anim">
                <img
                  src={fallingChutePlushie.imageSrc}
                  alt={fallingChutePlushie.label}
                  className="sanrio-plushie-3d-img"
                />
              </div>
            )}
          </div>

          {/* Interactive Lower Arcade Deck Hotspots */}
          <div className="sanrio-control-deck-overlay">
            {/* 1. Coin Slot */}
            <button
              type="button"
              className={`sanrio-deck-coin-slot-btn ${
                !coinInserted && clawPhase === "idle" ? "pulse-invite" : ""
              } ${noCoinShake ? "shake" : ""}`}
              onClick={handleInsertCoin}
              disabled={clawPhase !== "idle"}
              title="Bỏ 10 Xu Vàng"
            >
              <img
                src="/assets/math/items/gold-coin.webp"
                alt=""
                className="inline-coin-3d-icon"
              />
              <span>{coinInserted ? "ĐÃ BỎ 10 XU" : "10 XU / LƯỢT"}</span>
            </button>

            {/* 2. Pink Button: Drop Claw right where it stands! */}
            <button
              type="button"
              className="sanrio-deck-pink-btn ready-glow"
              onClick={handleDropClawHere}
              disabled={clawPhase !== "idle"}
              title="Thả càng gắp ngay tại vị trí đang đứng!"
            >
              <span>GẮP!</span>
            </button>

            {/* 3. Blue Button: Shuffle New Plushies */}
            <button
              type="button"
              className="sanrio-deck-blue-btn"
              onClick={handleShufflePit}
              disabled={clawPhase !== "idle"}
              title="Đổi thú bông mới"
            >
              <span>ĐỔI THÚ</span>
            </button>

            {/* 4. Joystick Left / Right Arrows (Hold or Tap to move Claw) */}
            <div className="sanrio-deck-joystick-group">
              <button
                type="button"
                className="sanrio-joy-arrow left"
                onPointerDown={() => startHoldMove(-3.8)}
                onPointerUp={stopHoldMove}
                onPointerLeave={stopHoldMove}
                onPointerCancel={stopHoldMove}
                disabled={clawPhase !== "idle"}
                aria-label="Sang trái"
              >
                ◀
              </button>
              <button
                type="button"
                className="sanrio-joy-arrow right"
                onPointerDown={() => startHoldMove(3.8)}
                onPointerUp={stopHoldMove}
                onPointerLeave={stopHoldMove}
                onPointerCancel={stopHoldMove}
                disabled={clawPhase !== "idle"}
                aria-label="Sang phải"
              >
                ▶
              </button>
            </div>
          </div>
        </div>

        {/* Floating Compact Right Bubbles (3 Target Plushies + New Doll + Shelf Button) */}
        <div className="sanrio-floating-targets">
          <div className="sanrio-floating-score-pill">
            ⭐ {score} · LV.{level}
          </div>
          {targetPlushies.map((item) => (
            <div
              key={item.id}
              className="sanrio-floating-bubble"
              title={`Thú mục tiêu x2 điểm: ${item.label}`}
            >
              <img src={item.imageSrc} alt={item.label} draggable={false} />
              <span className="bubble-x2-tag">x2</span>
            </div>
          ))}
          <button
            type="button"
            className="sanrio-floating-action-btn blue"
            onClick={handleShufflePit}
            title="Đổi lồng thú mới"
          >
            🔄 Đổi Thú
          </button>
          {onOpenPlushieShelf && (
            <button
              type="button"
              className="sanrio-floating-action-btn pink"
              onClick={onOpenPlushieShelf}
              title="Mở Kệ Thú Bông ở Khu Dán Sticker"
            >
              🧸 Kệ ({unlockedUniqueCount}/72)
            </button>
          )}
        </div>
      </div>

      {/* Celebration Popup When a 3D Plushie is Caught */}
      {clawPhase === "celebrating" && caughtResult && (
        <div className="sanrio-catch-modal-backdrop" role="dialog" aria-modal="true">
          <div className="sanrio-catch-modal-card">
            <div className="sanrio-catch-badge-row">
              <span className="sanrio-catch-series-pill">
                {caughtResult.plushie.seriesLabel}
              </span>
              {caughtResult.isFirstTime ? (
                <span className="sanrio-catch-new-pill">✨ MỚI TINH!</span>
              ) : (
                <span className="sanrio-catch-count-pill">
                  💕 x{caughtResult.newCount}
                </span>
              )}
            </div>

            <div className="sanrio-catch-showcase">
              <div className="sanrio-catch-glow-ring" />
              <img
                src={caughtResult.plushie.imageSrc}
                alt={caughtResult.plushie.label}
                className="sanrio-catch-big-img"
              />
            </div>

            <h3>🎉 Gắp Trúng Rồi!</h3>

            <div className="sanrio-catch-modal-actions">
              {onOpenPlushieShelf && (
                <button
                  type="button"
                  className="sanrio-catch-btn shelf"
                  onClick={() => {
                    setCaughtResult(null);
                    setClawPhase("idle");
                    onOpenPlushieShelf();
                  }}
                >
                  🧸 Đặt Lên Kệ Thú Bông Ngay!
                </button>
              )}
              <button
                type="button"
                className="sanrio-catch-btn again"
                onClick={() => {
                  setCaughtResult(null);
                  setClawPhase("idle");
                  setClawX(DEFAULT_CLAW_X);
                }}
              >
                <span>🕹️ Gắp Tiếp ({COST_CLAW_TURN}</span>
                <img
                  src="/assets/math/items/gold-coin.webp"
                  alt=""
                  className="inline-coin-3d-icon"
                />
                <span>Xu)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
