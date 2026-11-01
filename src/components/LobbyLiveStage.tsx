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

    // Soft pastel floating sparkles in the top hero area
    const motes: AmbientMote[] = Array.from({ length: 22 }, (_, i) => ({
      x: Math.random(),
      y: 0.05 + Math.random() * 0.38,
      vx: (Math.random() - 0.45) * 0.00022,
      vy: -0.00014 - Math.random() * 0.00018,
      r: 2.0 + (i % 3) * 1.0,
      alpha: 0.3 + Math.random() * 0.42,
      phase: Math.random() * Math.PI * 2,
      color: i % 3 === 0 ? "#FFF4BD" : i % 3 === 1 ? "#FFD6E0" : "#CDE8FF",
    }));

    const render = (now: number) => {
      const t = (now - startTime) * 0.001;
      if (
        canvas.width !== canvas.clientWidth ||
        canvas.height !== canvas.clientHeight
      ) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
      }
      const W = canvas.width;
      const H = canvas.height;
      const ctx = canvas.getContext("2d");
      if (!ctx || W === 0 || H === 0) {
        rafId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, W, H);

      // 1. Soft warm morning sunbeams from top-left window
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (let ray = 0; ray < 2; ray++) {
        const shimmer = 0.035 + 0.018 * Math.sin(t * 1.0 + ray * 1.6);
        const grad = ctx.createLinearGradient(
          W * (0.08 + ray * 0.12),
          0,
          W * (0.42 + ray * 0.12),
          H * 0.44,
        );
        grad.addColorStop(0, `rgba(255, 248, 214, ${shimmer * 1.3})`);
        grad.addColorStop(0.6, `rgba(255, 240, 195, ${shimmer * 0.7})`);
        grad.addColorStop(1, "rgba(255, 240, 195, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(W * (0.02 + ray * 0.1), 0);
        ctx.lineTo(W * (0.22 + ray * 0.12), 0);
        ctx.lineTo(W * (0.52 + ray * 0.12), H * 0.44);
        ctx.lineTo(W * (0.28 + ray * 0.1), H * 0.44);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // 2. Tap ripple halo around tapped character
      if (pulseRef.current && pulseRef.current.alpha > 0.01) {
        const p = pulseRef.current;
        p.radius += 2.6;
        p.alpha *= 0.92;
        ctx.save();
        ctx.strokeStyle = `rgba(255, 182, 193, ${p.alpha})`;
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 3. Floating pastel sparkles in the hero stage
      for (const m of motes) {
        m.x += m.vx + Math.sin(t * 1.1 + m.phase) * 0.00012;
        m.y += m.vy;
        if (m.y < 0.03) {
          m.y = 0.41;
          m.x = Math.random();
        }
        if (m.x < 0.02) m.x = 0.98;
        if (m.x > 0.98) m.x = 0.02;

        const twinkle = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(t * 2.8 + m.phase));
        const px = m.x * W;
        const py = m.y * H;

        ctx.save();
        ctx.globalAlpha = m.alpha * twinkle;
        ctx.fillStyle = m.color;
        ctx.shadowColor = m.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(px, py, m.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

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
