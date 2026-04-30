import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroContent, stats } from '@/data/siteData';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════
   CINEMATIC 3D NETWORK CANVAS
   Starts in settled state with center cleared for headline.
   Ambient animations: idle rotation, pulses, scanning line.
   On scroll exit (70-100%): network fades out.
   ═══════════════════════════════════════════════════════════════ */

interface NetworkNode {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  size: number;
  pulsePhase: number;
  type: 'hub' | 'node' | 'sensor';
}

interface DataPulse {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
  color: string;
}

function createNetworkNodes(): NetworkNode[] {
  const nodes: NetworkNode[] = [];
  const layers = [
    { z: -3, count: 45, spread: 3.0 },
    { z: -1.8, count: 40, spread: 2.5 },
    { z: -0.6, count: 35, spread: 2.0 },
    { z: 0.4, count: 30, spread: 1.6 },
    { z: 1.2, count: 25, spread: 1.2 },
    { z: 2.0, count: 20, spread: 0.8 },
  ];

  layers.forEach((layer) => {
    for (let i = 0; i < layer.count; i++) {
      const angle = (i / layer.count) * Math.PI * 2 + layer.z * 0.4;
      const radius = 0.15 + Math.random() * layer.spread;
      const jX = (Math.random() - 0.5) * 0.5;
      const jY = (Math.random() - 0.5) * 0.5;
      const isHub = Math.random() < 0.12;
      const isSensor = !isHub && Math.random() < 0.18;
      const x = Math.cos(angle) * radius + jX;
      const y = Math.sin(angle) * radius + jY;
      const z = layer.z + (Math.random() - 0.5) * 0.8;
      nodes.push({
        x, y, z,
        baseX: x, baseY: y, baseZ: z,
        size: isHub ? 3.8 : isSensor ? 2.4 : 1.3,
        pulsePhase: Math.random() * Math.PI * 2,
        type: isHub ? 'hub' : isSensor ? 'sensor' : 'node',
      });
    }
  });
  return nodes;
}

function CinematicNetworkCanvas({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<NetworkNode[]>(createNetworkNodes());
  const pulsesRef = useRef<DataPulse[]>([]);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef(0);
  const connectionsRef = useRef<[number, number][]>([]);

  useEffect(() => {
    const nodes = nodesRef.current;
    const conns: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].baseX - nodes[j].baseX;
        const dy = nodes[i].baseY - nodes[j].baseY;
        const dz = nodes[i].baseZ - nodes[j].baseZ;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 1.0) conns.push([i, j]);
      }
    }
    connectionsRef.current = conns;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    const progress = scrollProgress.current;
    timeRef.current += 0.006;
    const t = timeRef.current;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const nodes = nodesRef.current;
    const connections = connectionsRef.current;

    /* ── Network starts in settled state ──
       No dramatic scroll-driven expansion at the beginning.
       Expansion and zoom are fixed at the "settled" values.
       Only idle ambient rotation + scanning line animate.
       At 70-100% scroll: network fades out for exit.
    */
    const idleRot = t * 0.06;

    // Fixed settled rotation (no scroll-driven rotation at start)
    const settledScrollRot = 0.35 * 2.5 + 0.25 * 0.4; // The locked value
    const rotY = idleRot + settledScrollRot * Math.PI * 0.5;
    const rotX = Math.sin(t * 0.12) * 0.08 + 0.35 * Math.PI * 0.15;

    // Fixed settled expansion (what was at progress=0.35)
    const expansion = 1.7;

    // Fixed settled zoom
    const camZoom = 0.85 + 0.35 * 1.2 + 0.25 * 0.3; // ~1.345

    const camShiftX = 0.35 * 0.15; // Fixed settled shift
    const camShiftY = 0;

    // Scanning line (ambient animation)
    const scanY = ((t * 0.25 + progress * 1.5) % 2.0) - 1.0;

    // Network alpha: full until 70%, then fade out during exit
    const networkAlpha = progress < 0.70 ? 1.0 : Math.max(0, 1.0 - (progress - 0.70) / 0.30);

    // Center clearing: always active from the start (nodes pushed away from center)
    const centerClear = 1.0;

    /* ── Project 3D → 2D ── */
    const projected = nodes.map((n, idx) => {
      let x = n.baseX * expansion + camShiftX;
      let y = n.baseY * expansion + camShiftY;
      let z = n.baseZ * expansion;

      // Push nodes away from center (always active)
      if (centerClear > 0) {
        const dist2d = Math.sqrt(x * x + y * y);
        if (dist2d < 0.8 && dist2d > 0.01) {
          const pushStrength = (1 - dist2d / 0.8) * centerClear * 0.35;
          x += (x / dist2d) * pushStrength;
          y += (y / dist2d) * pushStrength;
        }
      }

      // Rotate Y
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;
      x = x1; z = z1;

      // Rotate X
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y1 = y * cosX - z * sinX;
      const z2 = y * sinX + z * cosX;
      y = y1; z = z2;

      // Perspective
      const fov = 4.0;
      const perspective = fov / (fov + z * camZoom);
      const scale = Math.min(w, h) * 0.3;
      const px = w / 2 + x * scale * perspective * camZoom;
      const py = h / 2 + y * scale * perspective * camZoom;
      const sz = n.size * perspective * camZoom;

      const pulse = 0.6 + 0.4 * Math.sin(t * 2.5 + n.pulsePhase);
      const scanDist = Math.abs(y - scanY);
      const scanGlow = scanDist < 0.18 ? (1 - scanDist / 0.18) * 0.9 : 0;
      const alpha = (0.25 + perspective * 0.55) * networkAlpha * pulse;

      return { px, py, sz, alpha, z, scanGlow, type: n.type, idx, y3d: y };
    });

    projected.sort((a, b) => a.z - b.z);

    /* ── Hexagonal grid overlay ── */
    ctx.globalAlpha = 0.012 * networkAlpha;
    const hexSize = 55;
    for (let row = -2; row < h / hexSize + 2; row++) {
      for (let col = -2; col < w / hexSize + 2; col++) {
        const offsetX = (row % 2) * hexSize * 0.5;
        const hx = col * hexSize + offsetX + (t * 4) % hexSize;
        const hy = row * hexSize * 0.866;
        ctx.beginPath();
        for (let s = 0; s < 6; s++) {
          const angle = (Math.PI / 3) * s + Math.PI / 6;
          const vx = hx + Math.cos(angle) * hexSize * 0.38;
          const vy = hy + Math.sin(angle) * hexSize * 0.38;
          if (s === 0) ctx.moveTo(vx, vy);
          else ctx.lineTo(vx, vy);
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(90,164,177,1)';
        ctx.lineWidth = 0.4;
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;

    /* ── Connections ── */
    connections.forEach(([i, j]) => {
      const a = projected.find((p) => p.idx === i)!;
      const b = projected.find((p) => p.idx === j)!;
      if (!a || !b) return;
      const lineAlpha = Math.min(a.alpha, b.alpha) * 0.22 * networkAlpha;
      if (lineAlpha < 0.004) return;

      const scanBoost = Math.max(a.scanGlow, b.scanGlow);
      const r = 90 + scanBoost * 70;
      const g = 164 + scanBoost * 50;
      const bVal = 177 + scanBoost * 35;

      const grad = ctx.createLinearGradient(a.px, a.py, b.px, b.py);
      grad.addColorStop(0, `rgba(${r},${g},${bVal},${lineAlpha + scanBoost * 0.35})`);
      grad.addColorStop(1, `rgba(${r},${g},${bVal},${lineAlpha * 0.4 + scanBoost * 0.2})`);
      ctx.beginPath();
      ctx.moveTo(a.px, a.py);
      ctx.lineTo(b.px, b.py);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 0.5 + scanBoost * 1.8;
      ctx.stroke();
    });

    /* ── Data pulses ── */
    if (Math.random() < 0.1 && connections.length > 0) {
      const conn = connections[Math.floor(Math.random() * connections.length)];
      pulsesRef.current.push({
        fromIdx: conn[0],
        toIdx: conn[1],
        progress: 0,
        speed: 0.006 + Math.random() * 0.012,
        color: Math.random() > 0.5 ? 'rgba(253,105,9,' : 'rgba(90,164,177,',
      });
    }
    if (pulsesRef.current.length > 40) pulsesRef.current = pulsesRef.current.slice(-30);

    pulsesRef.current = pulsesRef.current.filter((pulse) => {
      pulse.progress += pulse.speed;
      if (pulse.progress > 1) return false;
      const a = projected.find((p) => p.idx === pulse.fromIdx);
      const b = projected.find((p) => p.idx === pulse.toIdx);
      if (!a || !b) return false;
      const px = a.px + (b.px - a.px) * pulse.progress;
      const py = a.py + (b.py - a.py) * pulse.progress;
      const pulseAlpha = Math.sin(pulse.progress * Math.PI) * networkAlpha;
      const grd = ctx.createRadialGradient(px, py, 0, px, py, 7);
      grd.addColorStop(0, `${pulse.color}${pulseAlpha * 0.85})`);
      grd.addColorStop(1, `${pulse.color}0)`);
      ctx.beginPath();
      ctx.arc(px, py, 7, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
      return true;
    });

    /* ── Scanning line ── */
    const scanScreenY = h / 2 + scanY * Math.min(w, h) * 0.3;
    const scanGrad = ctx.createLinearGradient(0, scanScreenY - 40, 0, scanScreenY + 40);
    scanGrad.addColorStop(0, 'rgba(90,164,177,0)');
    scanGrad.addColorStop(0.5, `rgba(90,164,177,${0.05 * networkAlpha})`);
    scanGrad.addColorStop(1, 'rgba(90,164,177,0)');
    ctx.fillStyle = scanGrad;
    ctx.fillRect(0, scanScreenY - 40, w, 80);

    /* ── Nodes ── */
    projected.forEach((p) => {
      if (p.alpha < 0.008) return;

      const glowSize = p.sz * (p.type === 'hub' ? 9 : p.type === 'sensor' ? 7 : 4.5);
      const glow = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, glowSize);
      if (p.type === 'hub') {
        glow.addColorStop(0, `rgba(253,105,9,${p.alpha * 0.35 + p.scanGlow * 0.45})`);
        glow.addColorStop(1, 'rgba(253,105,9,0)');
      } else if (p.type === 'sensor') {
        glow.addColorStop(0, `rgba(90,164,177,${p.alpha * 0.3 + p.scanGlow * 0.5})`);
        glow.addColorStop(1, 'rgba(90,164,177,0)');
      } else {
        glow.addColorStop(0, `rgba(90,164,177,${p.alpha * 0.18 + p.scanGlow * 0.3})`);
        glow.addColorStop(1, 'rgba(90,164,177,0)');
      }
      ctx.beginPath();
      ctx.arc(p.px, p.py, glowSize, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(p.px, p.py, p.sz, 0, Math.PI * 2);
      if (p.type === 'hub') {
        ctx.fillStyle = `rgba(253,105,9,${p.alpha * 0.95})`;
      } else if (p.type === 'sensor') {
        ctx.fillStyle = `rgba(90,164,177,${p.alpha * 0.9})`;
      } else {
        ctx.fillStyle = `rgba(180,200,210,${p.alpha * 0.65})`;
      }
      ctx.fill();

      if (p.type === 'hub') {
        ctx.beginPath();
        ctx.arc(p.px, p.py, p.sz * 2.8, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(253,105,9,${p.alpha * 0.12})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    });

    ctx.restore();
    animFrameRef.current = requestAnimationFrame(draw);
  }, [scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resize();
    window.addEventListener('resize', resize);
    animFrameRef.current = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [draw]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

/* ═══════════════════════════════════════════════════════════════
   HERO SECTION
   Pinned for 300vh.
   
   Headline is VISIBLE from the start (no reveal animation).
   Network background starts in settled state.
   
   GSAP Timeline phases:
   ─────────────────────────────────────────────────
   0%  – 25%  : Subtitle, CTA, Stats animate in (staggered)
   25% – 70%  : HOLD — full composition visible, nothing animates
   70% – 100% : Exit — content moves up/fades, next section slides over
   ═══════════════════════════════════════════════════════════════ */

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    /* Grab elements */
    const headline = content.querySelector('.hero-headline');
    const sub = content.querySelector('.hero-sub');
    const ctas = content.querySelector('.hero-ctas');
    const statsEl = content.querySelector('.hero-stats');

    /* Initial state: Headline VISIBLE from start, others hidden */
    gsap.set(headline, { opacity: 1, y: 0, scale: 1 });
    gsap.set([sub, ctas, statsEl], { opacity: 0, y: 40, scale: 0.8 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;
        },
      },
    });

    /* ═══════════════════════════════════════════════════
       PHASE 1: 0% → 25% — Subtitle + CTA + Stats animate in
       Headline is already visible. Supporting content staggers in.
       ═══════════════════════════════════════════════════ */
    tl.to(sub, {
      opacity: 1, y: 0, scale: 1,
      duration: 0.12,
      ease: 'power2.out',
    }, 0.0);

    tl.to(ctas, {
      opacity: 1, y: 0, scale: 1,
      duration: 0.10,
      ease: 'power2.out',
    }, 0.08);

    tl.to(statsEl, {
      opacity: 1, y: 0, scale: 1,
      duration: 0.10,
      ease: 'power2.out',
    }, 0.15);

    /* ═══════════════════════════════════════════════════
       PHASE 2: 25% → 70% — HOLD
       Full composition visible. NOTHING animates.
       ═══════════════════════════════════════════════════ */
    // No tweens — intentional hold phase

    /* ═══════════════════════════════════════════════════
       PHASE 3: 70% → 100% — Exit
       Content moves upward and fades out.
       Next section slides over the hero.
       ═══════════════════════════════════════════════════ */
    tl.to(headline, { opacity: 0, y: -120, scale: 1.02, duration: 0.10 }, 0.70);
    tl.to(sub, { opacity: 0, y: -80, duration: 0.08 }, 0.74);
    tl.to(ctas, { opacity: 0, y: -60, duration: 0.08 }, 0.78);
    tl.to(statsEl, { opacity: 0, y: -40, duration: 0.08 }, 0.82);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, #0f1535 0%, #0a0e27 50%, #060820 100%)' }}
    >
      {/* Cinematic 3D Network — settled state */}
      <CinematicNetworkCanvas scrollProgress={scrollProgressRef} />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 25%, rgba(6,8,32,0.75) 100%)',
        }}
      />

      {/* Content — centered, layered above canvas */}
      <div
        ref={contentRef}
        className="relative z-[2] flex flex-col items-center justify-center h-full px-4 sm:px-6 pt-16 sm:pt-0 text-center"
      >
        {/* Headline — VISIBLE from start */}
        <h1 className="hero-headline text-3xl sm:text-5xl md:text-7xl lg:text-[92px] font-black text-white leading-[1.02] max-w-5xl mb-4 sm:mb-6 md:mb-8">
          <span className="bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent">
            {heroContent.headline}
          </span>
        </h1>

        {/* Subtitle — animates in on scroll */}
        <p className="hero-sub text-sm sm:text-lg md:text-xl text-white/55 max-w-2xl mb-6 sm:mb-8 md:mb-12 leading-relaxed font-light">
          {heroContent.subheadline}
        </p>

        {/* CTAs — animate in on scroll */}
        <div className="hero-ctas flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-14 md:mb-20">
          <a
            href="#contact"
            className="group relative px-10 py-4 bg-gradient-to-r from-[#fd6909] to-[#FF8A3D] text-white font-semibold rounded-full overflow-hidden transition-all hover:scale-105"
          >
            <span className="relative z-10">{heroContent.primaryCta}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF8A3D] to-[#fd6909] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -inset-1 bg-gradient-to-r from-[#fd6909] to-[#FF8A3D] rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
          </a>
          <a
            href="https://www.arab-security.com/solutions"
            className="px-10 py-4 border border-white/15 text-white/90 font-semibold rounded-full hover:border-white/30 hover:text-white transition-all !bg-transparent"
          >
            {heroContent.secondaryCta}
          </a>
        </div>

        {/* Stats — animate in on scroll */}
        <div className="hero-stats grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 md:gap-20">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                {s.value}
                <span className="text-[#fd6909]">{s.suffix}</span>
              </p>
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-white/35 mt-1 sm:mt-2 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
