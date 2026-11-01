import { useEffect, useRef, useState } from "react";

export interface LobbyCharacterDef {
  id: string;
  name: string;
  centerX: number; // 0..1 normalized horizontal center on scene-lobby-pastel.webp
  centerY: number; // 0..1 normalized vertical center on scene-lobby-pastel.webp
  widthPct: number;
  heightPct: number;
  theme: "pink" | "gold" | "rainbow";
  greeting: string;
}

export const LOBBY_CHARACTERS: LobbyCharacterDef[] = [
  {
    id: "kitty",
    name: "Hello Kitty",
    centerX: 0.118,
    centerY: 0.335,
    widthPct: 11.5,
    heightPct: 18.5,
    theme: "pink",
    greeting: "Xin chào bé Nấm! Cùng cô Kitty tập đọc thơ hay nhé!",
  },
  {
    id: "nam",
    name: "Bé Nấm",
    centerX: 0.252,
    centerY: 0.245,
    widthPct: 15.5,
    heightPct: 35.0,
    theme: "rainbow",
    greeting: "Hihi, chào mừng các bạn đến góc học vui pastel của Nấm!",
  },
  {
    id: "cinnamoroll",
    name: "Cinnamoroll",
    centerX: 0.398,
    centerY: 0.338,
    widthPct: 14.5,
    heightPct: 17.5,
    theme: "gold",
    greeting: "Là lá la! Cùng Cinnamoroll hát ca và gõ đàn vui nhộn nhé!",
  },
  {
    id: "kuromi",
    name: "Kuromi",
    centerX: 0.735,
    centerY: 0.315,
    widthPct: 11.8,
    heightPct: 23.0,
    theme: "pink",
    greeting: "Hello Nấm! Cùng Kuromi khám phá từ vựng tiếng Anh siêu dễ nhé!",
  },
  {
    id: "pompompurin",
    name: "Pompompurin",
    centerX: 0.828,
    centerY: 0.352,
    widthPct: 10.2,
    heightPct: 16.0,
    theme: "gold",
    greeting: "Gâu gâu! Cùng Pompompurin vẽ tranh và tô màu pastel thật đẹp nào!",
  },
  {
    id: "mymelody",
    name: "My Melody",
    centerX: 0.916,
    centerY: 0.328,
    widthPct: 11.5,
    heightPct: 20.5,
    theme: "pink",
    greeting: "My Melody chào Nấm! Hôm nay mình học toán và nấu ăn ngon nhé!",
  },
];

interface AmbientMote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  phase: number;
  color: string;
  isStarflare: boolean;
}

const MOTE_SPRITE_SIZE = 48;
const MOTE_HALF = MOTE_SPRITE_SIZE / 2;
const lobbyMoteSpriteCache = new Map<string, HTMLCanvasElement>();

/**
 * Pre-renders glowing ambient mote sprites once per color.
 * Replaces expensive per-frame ctx.shadowBlur with fast GPU drawImage + 'lighter'.
 */
function getMoteSprite(color: string, isStarflare: boolean): HTMLCanvasElement {
  const key = `${color}_${isStarflare ? "star" : "orb"}`;
  const cached = lobbyMoteSpriteCache.get(key);
  if (cached) return cached;

  const off = document.createElement("canvas");
  off.width = MOTE_SPRITE_SIZE;
  off.height = MOTE_SPRITE_SIZE;
  const c = off.getContext("2d");
  if (c) {
    const grad = c.createRadialGradient(
      MOTE_HALF,
      MOTE_HALF,
      1,
      MOTE_HALF,
      MOTE_HALF,
      MOTE_HALF - 2,
    );
    grad.addColorStop(0, "#FFFFFF");
    grad.addColorStop(0.28, color);
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");
    c.fillStyle = grad;
    c.beginPath();
    c.arc(MOTE_HALF, MOTE_HALF, MOTE_HALF - 2, 0, Math.PI * 2);
    c.fill();

    if (isStarflare) {
      c.save();
      c.translate(MOTE_HALF, MOTE_HALF);
      c.fillStyle = "#FFFFFF";
      const arm = MOTE_HALF - 4;
      const w = 2.2;
      c.beginPath();
      c.moveTo(0, -arm);
      c.quadraticCurveTo(w, -w, arm, 0);
      c.quadraticCurveTo(w, w, 0, arm);
      c.quadraticCurveTo(-w, w, -arm, 0);
      c.quadraticCurveTo(-w, -w, 0, -arm);
      c.closePath();
      c.fill();
      c.restore();
    }
  }

  lobbyMoteSpriteCache.set(key, off);
  return off;
}

interface LobbyLiveStageProps {
  onTapCharacter: (
    char: LobbyCharacterDef,
    e: React.MouseEvent<HTMLElement>,
  ) => void;
  onTapSign: (e: React.MouseEvent<HTMLElement>) => void;
}

export function LobbyLiveStage({
  onTapCharacter,
  onTapSign,
}: LobbyLiveStageProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pulseRef = useRef<{ x: number; y: number; radius: number; alpha: number } | null>(
    null,
  );
  const [activeBubble, setActiveBubble] = useState<{
    charId: string;
    name: string;
    text: string;
    centerX: number;
  } | null>(null);

  useEffect(() => {
    if (!activeBubble) return;
    const timer = window.setTimeout(() => setActiveBubble(null), 3200);
    return () => window.clearTimeout(timer);
  }, [activeBubble]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let rafId = 0;
    const startTime = performance.now();

    // Soft pastel floating sparkles across hero & upper-card transition zone
    const palette = ["#FFE066", "#FF8FA3", "#72EFDD", "#A8DADC"];
    const motes: AmbientMote[] = Array.from({ length: 24 }, (_, i) => ({
      x: Math.random(),
      y: 0.04 + Math.random() * 0.48,
      vx: (Math.random() - 0.48) * 0.0002,
      vy: -0.00012 - Math.random() * 0.00016,
      r: 3.5 + (i % 3) * 1.6,
      alpha: 0.38 + Math.random() * 0.42,
      phase: Math.random() * Math.PI * 2,
      color: palette[i % palette.length],
      isStarflare: i % 4 === 0,
    }));

    const render = (now: number) => {
      if (document.hidden) {
        rafId = requestAnimationFrame(render);
        return;
      }

      const t = (now - startTime) * 0.001;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      const targetW = Math.round(cw * dpr);
      const targetH = Math.round(ch * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx || cw === 0 || ch === 0) {
        rafId = requestAnimationFrame(render);
        return;
      }

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cw, ch);

      // 1. Soft warm morning sunbeams from top-left window (Additive Bloom 'lighter')
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (let ray = 0; ray < 2; ray++) {
        const shimmer = 0.032 + 0.016 * Math.sin(t * 1.0 + ray * 1.6);
        const grad = ctx.createLinearGradient(
          cw * (0.08 + ray * 0.12),
          0,
          cw * (0.42 + ray * 0.12),
          ch * 0.46,
        );
        grad.addColorStop(0, `rgba(255, 246, 205, ${shimmer * 1.25})`);
        grad.addColorStop(0.6, `rgba(255, 236, 179, ${shimmer * 0.65})`);
        grad.addColorStop(1, "rgba(255, 236, 179, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(cw * (0.02 + ray * 0.1), 0);
        ctx.lineTo(cw * (0.22 + ray * 0.12), 0);
        ctx.lineTo(cw * (0.52 + ray * 0.12), ch * 0.46);
        ctx.lineTo(cw * (0.28 + ray * 0.1), ch * 0.46);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // 2. Tap ripple halo around tapped character
      if (pulseRef.current && pulseRef.current.alpha > 0.01) {
        const p = pulseRef.current;
        p.radius += 2.8;
        p.alpha *= 0.91;
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.strokeStyle = `rgba(255, 143, 163, ${p.alpha})`;
        ctx.lineWidth = 3.2;
        ctx.beginPath();
        ctx.arc(p.x * cw, p.y * ch, p.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 3. Floating pastel sparkles using pre-rendered Sprite Cache (Zero shadowBlur)
      for (const m of motes) {
        m.x += m.vx + Math.sin(t * 1.1 + m.phase) * 0.00012;
        m.y += m.vy;
        if (m.y < 0.03) {
          m.y = 0.52;
          m.x = Math.random();
        }
        if (m.x < 0.02) m.x = 0.98;
        if (m.x > 0.98) m.x = 0.02;

        const twinkle = 0.42 + 0.58 * (0.5 + 0.5 * Math.sin(t * 2.6 + m.phase));
        // Gentle vertical fade near the card dock so cards stay 100% readable
        const verticalFade = m.y > 0.4 ? Math.max(0, 1 - (m.y - 0.4) / 0.14) : 1;
        const finalAlpha = m.alpha * twinkle * verticalFade;
        if (finalAlpha <= 0.02) continue;

        const px = m.x * cw;
        const py = m.y * ch;
        const sprite = getMoteSprite(m.color, m.isStarflare);
        const drawR = m.r * (m.isStarflare ? 1.85 : 1.45);

        // Pass 1: Soft pastel tint anchor
        ctx.save();
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = finalAlpha * 0.65;
        ctx.drawImage(sprite, px - drawR, py - drawR, drawR * 2, drawR * 2);
        ctx.restore();

        // Pass 2: Additive Bloom core
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = finalAlpha * 0.55;
        ctx.drawImage(
          sprite,
          px - drawR * 0.75,
          py - drawR * 0.75,
          drawR * 1.5,
          drawR * 1.5,
        );
        ctx.restore();
      }

      ctx.restore();
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleCharacterClick = (
    char: LobbyCharacterDef,
    e: React.MouseEvent<HTMLElement>,
  ) => {
    pulseRef.current = {
      x: char.centerX,
      y: char.centerY,
      radius: 18,
      alpha: 0.85,
    };
    setActiveBubble({
      charId: char.id,
      name: char.name,
      text: char.greeting,
      centerX: char.centerX,
    });
    onTapCharacter(char, e);
  };

  return (
    <div className="lobby-live-stage-layer" data-ready="true">
      <canvas ref={canvasRef} className="lobby-live-canvas" />

      {/* Vùng chạm tấm biển đám mây "Nấm học vui - Cùng các bạn mỗi ngày" */}
      <div
        className="wooden-sign-banner"
        title="Chạm để nghe lời chào!"
        onClick={onTapSign}
      />

      {/* 6 vùng chạm tương ứng với 6 bạn ở tầng Hero phía trên */}
      <div className="lobby-char-hitboxes">
        {LOBBY_CHARACTERS.map((char) => (
          <button
            key={char.id}
            type="button"
            className="lobby-char-hitbox"
            style={{
              left: `${char.centerX * 100}%`,
              top: `${char.centerY * 100}%`,
              width: `${char.widthPct}%`,
              height: `${char.heightPct}%`,
              transform: "translate(-50%, -50%)",
            }}
            onClick={(e) => handleCharacterClick(char, e)}
            title={`Chạm vào ${char.name}!`}
            aria-label={`Chạm vào ${char.name}`}
          />
        ))}
      </div>

      {/* Bong bóng lời chào Pastel bật lên khi chạm vào nhân vật */}
      {activeBubble && (
        <div
          key={`${activeBubble.charId}-${activeBubble.text}`}
          className="lobby-char-bubble"
          style={{
            left: `${Math.min(82, Math.max(18, activeBubble.centerX * 100))}%`,
            top: "8.5%",
          }}
        >
          <strong>{activeBubble.name}:</strong> {activeBubble.text}
        </div>
      )}
    </div>
  );
}
