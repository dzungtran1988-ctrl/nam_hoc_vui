import { useEffect, useImperativeHandle, forwardRef, useRef } from "react";

export interface ParticleBurstHandle {
  burstAt: (x: number, y: number, theme?: "pink" | "gold" | "rainbow") => void;
}

interface Particle {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  vx: number;
  vy: number;
  gravity: number;
  drag: number;
  size: number;
  targetSize: number;
  rotation: number;
  vRot: number;
  alpha: number;
  life: number;
  maxLife: number;
  twinklePhase: number;
  twinkleSpeed: number;
  kind: "ember" | "starflare" | "glitter";
  color: string;
}

interface ShockRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
  flashAlpha: number;
}

const PALETTES: Record<"pink" | "gold" | "rainbow", string[]> = {
  pink: ["#FF477E", "#FF7096", "#FF9EBB", "#FFD166", "#72EFDD", "#C77DFF"],
  gold: ["#FFD166", "#FFB703", "#FB8500", "#FF5D8F", "#4CC9F0", "#FDE047"],
  rainbow: ["#FF477E", "#FFB703", "#06D6A0", "#38BDF8", "#A855F7", "#FF9F1C"],
};

const MAX_ACTIVE_PARTICLES = 110;
const SPRITE_SIZE = 64;
const HALF_SPRITE = SPRITE_SIZE / 2;

interface CachedSprites {
  orb: HTMLCanvasElement;
  flare: HTMLCanvasElement;
}

const spriteCache = new Map<string, CachedSprites>();

/**
 * Pre-renders a soft glowing orb and a delicate 4-point starflare ONCE per color.
 * Eliminates expensive ctx.shadowBlur and ctx.createRadialGradient calls from the 60fps loop.
 */
function getCachedSprites(color: string): CachedSprites {
  const existing = spriteCache.get(color);
  if (existing) return existing;

  // 1. Soft Glowing Ember Orb (Dual-layer: rich color halo + white-hot core)
  const orb = document.createElement("canvas");
  orb.width = SPRITE_SIZE;
  orb.height = SPRITE_SIZE;
  const oCtx = orb.getContext("2d");
  if (oCtx) {
    const grad = oCtx.createRadialGradient(
      HALF_SPRITE,
      HALF_SPRITE,
      1,
      HALF_SPRITE,
      HALF_SPRITE,
      HALF_SPRITE - 2,
    );
    grad.addColorStop(0, "#FFFFFF");
    grad.addColorStop(0.22, "#FFFDF5");
    grad.addColorStop(0.48, color);
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");
    oCtx.fillStyle = grad;
    oCtx.beginPath();
    oCtx.arc(HALF_SPRITE, HALF_SPRITE, HALF_SPRITE - 2, 0, Math.PI * 2);
    oCtx.fill();
  }

  // 2. Delicate 4-Point Arcade Starflare (Crisp needle rays + soft bloom center)
  const flare = document.createElement("canvas");
  flare.width = SPRITE_SIZE;
  flare.height = SPRITE_SIZE;
  const fCtx = flare.getContext("2d");
  if (fCtx) {
    const halo = fCtx.createRadialGradient(
      HALF_SPRITE,
      HALF_SPRITE,
      1,
      HALF_SPRITE,
      HALF_SPRITE,
      HALF_SPRITE - 4,
    );
    halo.addColorStop(0, "#FFFFFF");
    halo.addColorStop(0.3, color);
    halo.addColorStop(1, "rgba(0, 0, 0, 0)");
    fCtx.fillStyle = halo;
    fCtx.beginPath();
    fCtx.arc(HALF_SPRITE, HALF_SPRITE, HALF_SPRITE - 4, 0, Math.PI * 2);
    fCtx.fill();

    // Slender 4-point diamond star
    fCtx.save();
    fCtx.translate(HALF_SPRITE, HALF_SPRITE);
    fCtx.fillStyle = "#FFFFFF";
    const arm = HALF_SPRITE - 3;
    const waist = 3.2;
    fCtx.beginPath();
    fCtx.moveTo(0, -arm);
    fCtx.quadraticCurveTo(waist, -waist, arm, 0);
    fCtx.quadraticCurveTo(waist, waist, 0, arm);
    fCtx.quadraticCurveTo(-waist, waist, -arm, 0);
    fCtx.quadraticCurveTo(-waist, -waist, 0, -arm);
    fCtx.closePath();
    fCtx.fill();
    fCtx.restore();
  }

  const entry = { orb, flare };
  spriteCache.set(color, entry);
  return entry;
}

export const ParticleBurstCanvas = forwardRef<ParticleBurstHandle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const ringsRef = useRef<ShockRing[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastTrailTimeRef = useRef<number>(0);
  const lastTrailPosRef = useRef<{ x: number; y: number } | null>(null);

  const pushParticle = (p: Particle) => {
    const list = particlesRef.current;
    if (list.length >= MAX_ACTIVE_PARTICLES) {
      // Recycle the oldest particle to guarantee zero lag under rapid multi-touch
      list.shift();
    }
    list.push(p);
  };

  const startLoop = () => {
    if (rafRef.current !== null) return;

    const tick = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        rafRef.current = null;
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        rafRef.current = null;
        return;
      }

      // Retina 2D Engine (capped at dpr = 2 for optimal mobile/tablet fill-rate)
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      const targetW = Math.round(cw * dpr);
      const targetH = Math.round(ch * dpr);
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cw, ch);

      // 1. Update & draw soft expanding shock rings + initial core flash
      const nextRings: ShockRing[] = [];
      for (const ring of ringsRef.current) {
        ring.radius += (ring.maxRadius - ring.radius) * 0.18;
        ring.alpha *= 0.87;
        ring.flashAlpha *= 0.78;

        if (ring.alpha > 0.015) {
          ctx.save();
          // Subtle additive core flash on initial pop
          if (ring.flashAlpha > 0.03) {
            ctx.globalCompositeOperation = "lighter";
            const sprite = getCachedSprites(ring.color).orb;
            const flashSize = ring.radius * 1.35;
            ctx.globalAlpha = ring.flashAlpha * 0.55;
            ctx.drawImage(
              sprite,
              ring.x - flashSize,
              ring.y - flashSize,
              flashSize * 2,
              flashSize * 2,
            );
          }

          // Crisp thin shockwave halo
          ctx.globalCompositeOperation = "source-over";
          ctx.beginPath();
          ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
          ctx.strokeStyle = ring.color;
          ctx.globalAlpha = ring.alpha * 0.55;
          ctx.lineWidth = Math.max(1.2, 3.5 * ring.alpha);
          ctx.stroke();
          ctx.restore();

          nextRings.push(ring);
        }
      }
      ringsRef.current = nextRings;

      // 2. Update & draw fine glowing firework particles (Dual-Pass: contrast base + 'lighter' bloom)
      const nextParticles: Particle[] = [];
      for (const p of particlesRef.current) {
        p.life += 1;
        const progress = p.life / p.maxLife;
        if (progress >= 1) continue;

        p.prevX = p.x;
        p.prevY = p.y;

        // Smooth pop-in during first 12%, then silky taper out
        if (progress < 0.12) {
          const t = progress / 0.12;
          p.size = p.targetSize * (0.4 + t * 0.6);
        } else {
          p.size = p.targetSize * (1 - (progress - 0.12) * 0.78);
        }

        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;

        const fadeOut =
          progress > 0.52 ? Math.max(0, 1 - (progress - 0.52) / 0.48) : 1;
        const twinkle =
          p.kind === "glitter"
            ? 0.45 + 0.55 * Math.sin(p.life * p.twinkleSpeed + p.twinklePhase)
            : 0.78 + 0.22 * Math.sin(p.life * p.twinkleSpeed + p.twinklePhase);
        p.alpha = fadeOut * twinkle;

        const sprites = getCachedSprites(p.color);
        const drawRadius = Math.max(2, p.size);

        // Micro-comet velocity tail for fast-moving firework embers
        const speedSq = p.vx * p.vx + p.vy * p.vy;
        if (p.kind === "ember" && speedSq > 1.8 && progress < 0.65) {
          ctx.save();
          ctx.globalAlpha = p.alpha * 0.42;
          ctx.strokeStyle = p.color;
          ctx.lineWidth = Math.max(1, drawRadius * 0.36);
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 2.1, p.y - p.vy * 2.1);
          ctx.stroke();
          ctx.restore();
        }

        // Pass A: Soft contrast base ('source-over') so colors stay vivid on light Pastel backgrounds
        ctx.save();
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = p.alpha * 0.68;
        ctx.translate(p.x, p.y);
        if (p.kind === "starflare") {
          ctx.rotate(p.rotation);
          ctx.drawImage(
            sprites.flare,
            -drawRadius * 1.45,
            -drawRadius * 1.45,
            drawRadius * 2.9,
            drawRadius * 2.9,
          );
        } else {
          ctx.drawImage(
            sprites.orb,
            -drawRadius * 1.2,
            -drawRadius * 1.2,
            drawRadius * 2.4,
            drawRadius * 2.4,
          );
        }
        ctx.restore();

        // Pass B: Additive Bloom Core ('lighter') for genuine Arcade luminescence
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = p.alpha * 0.62;
        ctx.drawImage(
          sprites.orb,
          p.x - drawRadius * 0.85,
          p.y - drawRadius * 0.85,
          drawRadius * 1.7,
          drawRadius * 1.7,
        );
        ctx.restore();

        nextParticles.push(p);
      }
      particlesRef.current = nextParticles;
      ctx.restore();

      // Sleep-on-Idle: completely stop requestAnimationFrame (0% CPU/GPU) when no particles remain
      if (particlesRef.current.length > 0 || ringsRef.current.length > 0) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  const spawnBurstInternal = (
    x: number,
    y: number,
    theme: "pink" | "gold" | "rainbow" = "pink",
    scale: "full" | "micro" = "full",
  ) => {
    const palette = PALETTES[theme] || PALETTES.pink;

    ringsRef.current.push({
      x,
      y,
      radius: scale === "full" ? 6 : 4,
      maxRadius: scale === "full" ? 78 : 36,
      alpha: scale === "full" ? 0.72 : 0.45,
      color: palette[0],
      flashAlpha: scale === "full" ? 0.75 : 0.35,
    });

    const count = scale === "full" ? 30 : 10;
    for (let i = 0; i < count; i++) {
      // Radial chrysanthemum firework distribution with organic speed layering
      const baseAngle = (i / count) * Math.PI * 2;
      const angle = baseAngle + (Math.random() - 0.5) * 0.28;
      const isInnerLayer = i % 3 === 0;
      const speed =
        scale === "full"
          ? isInnerLayer
            ? 1.8 + Math.random() * 2.8
            : 3.6 + Math.random() * 5.4
          : 1.6 + Math.random() * 3.0;

      const color = palette[i % palette.length];
      const kind: Particle["kind"] =
        i % 6 === 0 ? "starflare" : i % 3 === 1 ? "glitter" : "ember";

      pushParticle({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        prevX: x,
        prevY: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (scale === "full" ? 1.1 : 0.5),
        gravity: kind === "glitter" ? 0.05 : 0.11,
        drag: 0.935,
        size: 1,
        targetSize:
          scale === "full"
            ? kind === "starflare"
              ? 6.2 + Math.random() * 2.8
              : 3.8 + Math.random() * 3.2
            : 2.8 + Math.random() * 2.2,
        rotation: Math.random() * Math.PI,
        vRot: (Math.random() - 0.5) * 0.06,
        alpha: 1,
        life: 0,
        maxLife:
          scale === "full"
            ? 34 + Math.floor(Math.random() * 18)
            : 20 + Math.floor(Math.random() * 10),
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.22 + Math.random() * 0.18,
        kind,
        color,
      });
    }

    startLoop();
  };

  useImperativeHandle(ref, () => ({
    burstAt(x: number, y: number, theme = "pink") {
      spawnBurstInternal(x, y, theme, "full");
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getCanvasLocalCoords = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return null;
      return {
        x: ((clientX - rect.left) / rect.width) * canvas.clientWidth,
        y: ((clientY - rect.top) / rect.height) * canvas.clientHeight,
      };
    };

    // Universal interactive touch/click micro-sparkle & gentle stardust trail
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      // Skip if it's a lobby character or sign that already calls triggerTapBurst directly
      if (
        target.closest(".lobby-char-hitbox") ||
        target.closest(".wooden-sign-banner")
      ) {
        return;
      }
      const interactive = target.closest(
        "button, [role='button'], .game-module-card, .hud-pill",
      );
      if (!interactive) return;

      const pt = getCanvasLocalCoords(e.clientX, e.clientY);
      if (!pt) return;
      spawnBurstInternal(pt.x, pt.y, "gold", "micro");
    };

    const onPointerMove = (e: PointerEvent) => {
      // Only emit gentle stardust trail when dragging or moving swiftly across stage
      const now = performance.now();
      if (now - lastTrailTimeRef.current < 32) return;
      const pt = getCanvasLocalCoords(e.clientX, e.clientY);
      if (!pt) return;

      const prev = lastTrailPosRef.current;
      lastTrailPosRef.current = pt;
      if (!prev) return;

      const dx = pt.x - prev.x;
      const dy = pt.y - prev.y;
      if (dx * dx + dy * dy < 140) return;

      lastTrailTimeRef.current = now;
      const palette = PALETTES.gold;
      const color = palette[Math.floor(Math.random() * palette.length)];

      pushParticle({
        x: pt.x + (Math.random() - 0.5) * 8,
        y: pt.y + (Math.random() - 0.5) * 8,
        prevX: pt.x,
        prevY: pt.y,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -0.35 - Math.random() * 0.55,
        gravity: 0.02,
        drag: 0.95,
        size: 1,
        targetSize: 2.6 + Math.random() * 1.8,
        rotation: Math.random() * Math.PI,
        vRot: 0.04,
        alpha: 0.85,
        life: 0,
        maxLife: 18 + Math.floor(Math.random() * 8),
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.25,
        kind: "glitter",
        color,
      });
      startLoop();
    };

    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-burst-canvas" />;
});
