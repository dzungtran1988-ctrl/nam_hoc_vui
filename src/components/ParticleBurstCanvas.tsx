import { useEffect, useImperativeHandle, forwardRef, useRef } from "react";

export interface ParticleBurstHandle {
  burstAt: (x: number, y: number, theme?: "pink" | "gold" | "rainbow") => void;
}

interface Particle {
  x: number;
  y: number;
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
  shape: "heart" | "star" | "bubble" | "sparkle";
  color: string;
  glow: string;
}

interface ShockRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

const PALETTES = {
  pink: ["#FF477E", "#FF7096", "#FF85A1", "#FFB3C6", "#FFD166", "#72EFDD"],
  gold: ["#FFD166", "#FFB703", "#FB8500", "#FF4D6D", "#4CC9F0", "#A855F7"],
  rainbow: ["#FF477E", "#FFB703", "#06D6A0", "#118AB2", "#8338EC", "#FF9F1C"],
};

function drawHeart(ctx: CanvasRenderingContext2D, r: number, color: string) {
  ctx.save();
  ctx.beginPath();
  const topCurveHeight = r * 0.3;
  ctx.moveTo(0, topCurveHeight);
  ctx.bezierCurveTo(0, 0, -r, 0, -r, topCurveHeight);
  ctx.bezierCurveTo(-r, (r + topCurveHeight) / 2, 0, (r + topCurveHeight) * 0.85, 0, r * 1.15);
  ctx.bezierCurveTo(0, (r + topCurveHeight) * 0.85, r, (r + topCurveHeight) / 2, r, topCurveHeight);
  ctx.bezierCurveTo(r, 0, 0, 0, 0, topCurveHeight);
  ctx.closePath();

  const grad = ctx.createRadialGradient(-r * 0.28, -r * 0.1, r * 0.1, 0, r * 0.3, r * 1.2);
  grad.addColorStop(0, "#FFFFFF");
  grad.addColorStop(0.28, color);
  grad.addColorStop(1, color);
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.lineWidth = Math.max(1.5, r * 0.14);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
  ctx.stroke();
  ctx.restore();
}

function drawStar(ctx: CanvasRenderingContext2D, r: number, color: string) {
  ctx.save();
  const spikes = 5;
  const outerRadius = r;
  const innerRadius = r * 0.48;
  let rot = (Math.PI / 2) * 3;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(0, -outerRadius);
  for (let i = 0; i < spikes; i++) {
    ctx.lineTo(Math.cos(rot) * outerRadius, Math.sin(rot) * outerRadius);
    rot += step;
    ctx.lineTo(Math.cos(rot) * innerRadius, Math.sin(rot) * innerRadius);
    rot += step;
  }
  ctx.lineTo(0, -outerRadius);
  ctx.closePath();

  const grad = ctx.createRadialGradient(-r * 0.2, -r * 0.2, r * 0.08, 0, 0, r);
  grad.addColorStop(0, "#FFFDF0");
  grad.addColorStop(0.4, color);
  grad.addColorStop(1, color);
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.lineWidth = Math.max(1.5, r * 0.14);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.92)";
  ctx.stroke();
  ctx.restore();
}

function drawBubble(ctx: CanvasRenderingContext2D, r: number, color: string) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  const grad = ctx.createRadialGradient(-r * 0.35, -r * 0.35, r * 0.1, 0, 0, r);
  grad.addColorStop(0, "rgba(255,255,255,0.95)");
  grad.addColorStop(0.5, `${color}88`);
  grad.addColorStop(1, color);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = "rgba(255,255,255,0.85)";
  ctx.stroke();

  // Specular dot
  ctx.beginPath();
  ctx.arc(-r * 0.32, -r * 0.32, r * 0.22, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.fill();
  ctx.restore();
}

function drawSparkle(ctx: CanvasRenderingContext2D, r: number, color: string) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, -r * 1.2);
  ctx.quadraticCurveTo(0, 0, r * 1.2, 0);
  ctx.quadraticCurveTo(0, 0, 0, r * 1.2);
  ctx.quadraticCurveTo(0, 0, -r * 1.2, 0);
  ctx.quadraticCurveTo(0, 0, 0, -r * 1.2);
  ctx.closePath();
  ctx.fillStyle = "#FFFFFF";
  ctx.shadowColor = color;
  ctx.shadowBlur = 10;
  ctx.fill();
  ctx.restore();
}

export const ParticleBurstCanvas = forwardRef<ParticleBurstHandle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const ringsRef = useRef<ShockRing[]>([]);
  const rafRef = useRef<number | null>(null);

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

      if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update & draw shock rings
      const nextRings: ShockRing[] = [];
      for (const ring of ringsRef.current) {
        ring.radius += (ring.maxRadius - ring.radius) * 0.16;
        ring.alpha *= 0.89;
        if (ring.alpha > 0.02) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
          ctx.strokeStyle = ring.color;
          ctx.globalAlpha = ring.alpha;
          ctx.lineWidth = Math.max(2, 8 * ring.alpha);
          ctx.stroke();
          ctx.restore();
          nextRings.push(ring);
        }
      }
      ringsRef.current = nextRings;

      // Update & draw 60fps particles with spring scale-in and gravity
      const nextParticles: Particle[] = [];
      for (const p of particlesRef.current) {
        p.life += 1;
        const progress = p.life / p.maxLife;
        if (progress >= 1) continue;

        // Spring pop-in during first 18% of life, then gentle shrink at end
        if (progress < 0.18) {
          const t = progress / 0.18;
          const overshoot = 1 + Math.sin(t * Math.PI) * 0.35;
          p.size = p.targetSize * t * overshoot;
        } else if (progress > 0.72) {
          p.size = p.targetSize * (1 - (progress - 0.72) / 0.28);
        } else {
          p.size = p.targetSize;
        }

        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;
        p.alpha = progress > 0.68 ? Math.max(0, 1 - (progress - 0.68) / 0.32) : 1;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.shape === "heart") {
          drawHeart(ctx, Math.max(1, p.size), p.color);
        } else if (p.shape === "star") {
          drawStar(ctx, Math.max(1, p.size), p.color);
        } else if (p.shape === "bubble") {
          drawBubble(ctx, Math.max(1, p.size), p.color);
        } else {
          drawSparkle(ctx, Math.max(1, p.size), p.color);
        }
        ctx.restore();

        nextParticles.push(p);
      }
      particlesRef.current = nextParticles;

      if (particlesRef.current.length > 0 || ringsRef.current.length > 0) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  useImperativeHandle(ref, () => ({
    burstAt(x: number, y: number, theme = "pink") {
      const palette = PALETTES[theme] || PALETTES.pink;
      const shapes: Particle["shape"][] = ["heart", "star", "bubble", "sparkle"];

      ringsRef.current.push({
        x,
        y,
        radius: 12,
        maxRadius: 125,
        alpha: 0.85,
        color: palette[0],
      });

      const count = 26;
      for (let i = 0; i < count; i++) {
        // Fan upwards mostly (-PI to 0, with full radial spread)
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.45;
        const speed = 4.2 + Math.random() * 8.5;
        const color = palette[i % palette.length];
        const shape = shapes[i % shapes.length];
        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 24,
          y: y + (Math.random() - 0.5) * 24,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2.2,
          gravity: shape === "bubble" ? -0.05 : 0.22,
          drag: 0.96,
          size: 1,
          targetSize: shape === "sparkle" ? 9 + Math.random() * 6 : 11 + Math.random() * 9,
          rotation: (Math.random() - 0.5) * 0.6,
          vRot: (Math.random() - 0.5) * 0.08,
          alpha: 1,
          life: 0,
          maxLife: 44 + Math.floor(Math.random() * 22),
          shape,
          color,
          glow: color,
        });
      }

      startLoop();
    },
  }));

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-burst-canvas" />;
});
