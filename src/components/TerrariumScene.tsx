"use client";

import React, { useId, useMemo } from "react";

export type SceneVariant = "console" | "portable" | "micro" | "diy";
export type LightMode = "day" | "grow" | "night";

interface TerrariumSceneProps {
  variant: SceneVariant;
  lightMode?: LightMode;
  /** Fewer elements and no ambient effects, for small product thumbnails. */
  compact?: boolean;
  className?: string;
}

// Deterministic PRNG so server and client render identical markup (no hydration mismatch).
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SEEDS: Record<SceneVariant, number> = { console: 11, portable: 23, micro: 37, diy: 53 };

export function sceneVariantFor(productId: string): SceneVariant {
  if (productId.includes("portable")) return "portable";
  if (productId.includes("micro")) return "micro";
  if (productId.includes("diy")) return "diy";
  return "console";
}

const PALETTE: Record<
  SceneVariant,
  { blades: string[]; moss: string[]; frond: string; frondTip: string; stem: string }
> = {
  console: {
    blades: ["#2f8f3a", "#3fae4a", "#58c35c", "#1f6b2c"],
    moss: ["#14532d", "#166534", "#15803d", "#22c55e"],
    frond: "#22a24a",
    frondTip: "#4ade80",
    stem: "#14532d",
  },
  portable: {
    blades: ["#3b9f55", "#56b96b", "#7ad48a", "#2a7a42"],
    moss: ["#14532d", "#1b6b3a", "#2f8f4e", "#4ade80"],
    frond: "#34b36a",
    frondTip: "#86efac",
    stem: "#14532d",
  },
  micro: {
    blades: ["#2d8f6b", "#3fb58a", "#6ee7b7", "#1f6b52"],
    moss: ["#134e4a", "#0f766e", "#14b8a6", "#5eead4"],
    frond: "#2fb59a",
    frondTip: "#99f6e4",
    stem: "#134e4a",
  },
  diy: {
    blades: ["#5aa02c", "#7cc144", "#a3e635", "#3f7d1d"],
    moss: ["#3f6212", "#4d7c0f", "#65a30d", "#84cc16"],
    frond: "#65a30d",
    frondTip: "#a3e635",
    stem: "#3f6212",
  },
};

interface FrondSpec {
  x: number;
  y: number;
  angle: number;
  len: number;
}

const FRONDS: Record<SceneVariant, FrondSpec[]> = {
  console: [
    { x: 120, y: 498, a: -58, len: 150 },
    { x: 205, y: 496, a: -34, len: 235 },
    { x: 335, y: 496, a: -10, len: 295 },
    { x: 470, y: 496, a: 14, len: 262 },
    { x: 600, y: 496, a: 38, len: 225 },
    { x: 690, y: 498, a: 56, len: 150 },
  ].map(({ a, ...rest }) => ({ ...rest, angle: a })),
  portable: [
    { x: 200, y: 496, a: -30, len: 170 },
    { x: 400, y: 496, a: 0, len: 205 },
    { x: 610, y: 496, a: 30, len: 165 },
  ].map(({ a, ...rest }) => ({ ...rest, angle: a })),
  micro: [
    { x: 250, y: 496, a: -24, len: 140 },
    { x: 560, y: 496, a: 24, len: 135 },
  ].map(({ a, ...rest }) => ({ ...rest, angle: a })),
  diy: [],
};

const MOUNDS = [
  { cx: 90, cy: 492, rx: 105, ry: 34 },
  { cx: 260, cy: 494, rx: 135, ry: 40 },
  { cx: 450, cy: 492, rx: 145, ry: 38 },
  { cx: 640, cy: 494, rx: 135, ry: 40 },
  { cx: 765, cy: 492, rx: 95, ry: 32 },
];

function Frond({
  spec,
  color,
  tip,
  stem,
  delay,
}: {
  spec: FrondSpec;
  color: string;
  tip: string;
  stem: string;
  delay: number;
}) {
  const { x, y, angle, len } = spec;
  const c = len * 0.32 * (angle < 0 ? -1 : 1);
  const p1 = { x: c * 0.4, y: -len * 0.55 };
  const p2 = { x: c, y: -len };
  const n = Math.round(len / 9);
  const leaflets: React.ReactNode[] = [];
  for (let i = 1; i <= n; i++) {
    const t = i / (n + 1);
    const mt = 1 - t;
    const px = 2 * mt * t * p1.x + t * t * p2.x;
    const py = 2 * mt * t * p1.y + t * t * p2.y;
    const rx = len * 0.062 * (1 - t * 0.72) + 3;
    const ry = rx * 0.34;
    const a = 58 + t * 12;
    const fill = i % 2 ? color : tip;
    leaflets.push(
      <g key={i} transform={`translate(${px.toFixed(1)} ${py.toFixed(1)})`}>
        <ellipse cx={rx} cy={0} rx={rx} ry={ry} fill={fill} transform={`rotate(${-a})`} />
        <ellipse cx={-rx} cy={0} rx={rx} ry={ry} fill={fill} transform={`rotate(${a})`} />
      </g>
    );
  }
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <g
        style={{
          transformOrigin: "0px 0px",
          animation: `blade-grow 2.2s cubic-bezier(.2,.8,.3,1) ${delay}s both, frond-sway 6s ease-in-out ${delay + 2.2}s infinite alternate`,
        }}
      >
        <path
          d={`M0 0 Q ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`}
          stroke={stem}
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
        />
        {leaflets}
      </g>
    </g>
  );
}

export function TerrariumScene({
  variant,
  lightMode = "day",
  compact = false,
  className = "",
}: TerrariumSceneProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const pal = PALETTE[variant];

  const scene = useMemo(() => {
    const r = mulberry32(SEEDS[variant]);
    const bladeCount = compact ? 38 : 100;
    const tall = variant === "diy" ? 0.45 : variant === "micro" ? 0.8 : 1;

    const blades = Array.from({ length: bladeCount }, (_, i) => {
      const x = 28 + r() * 744;
      const y = 488 + r() * 8;
      const h = (38 + r() * 112) * tall;
      const lean = (r() - 0.5) * 46;
      const w = 2.2 + r() * 1.9;
      return {
        i,
        x,
        y,
        d: `M${(x - w).toFixed(1)} ${y.toFixed(1)} Q${(x + lean * 0.4 - w * 0.6).toFixed(1)} ${(y - h * 0.55).toFixed(1)} ${(x + lean).toFixed(1)} ${(y - h).toFixed(1)} Q${(x + lean * 0.4 + w * 0.6).toFixed(1)} ${(y - h * 0.55).toFixed(1)} ${(x + w).toFixed(1)} ${y.toFixed(1)}Z`,
        fill: pal.blades[Math.floor(r() * pal.blades.length)],
        // Grass "grows" in a sweep from left to right.
        delay: (x / 800) * 1.4 + r() * 0.5,
        swayDur: 3 + r() * 3,
        front: i % 3 === 0,
      };
    });

    const mossDots = compact
      ? []
      : MOUNDS.flatMap((m, mi) =>
          Array.from({ length: 22 }, (_, k) => {
            const ang = r() * Math.PI * 2;
            const rad = Math.sqrt(r());
            return {
              key: `${mi}-${k}`,
              cx: m.cx + Math.cos(ang) * m.rx * 0.9 * rad,
              cy: m.cy - Math.abs(Math.sin(ang)) * m.ry * 0.85 * rad,
              r: 2 + r() * 3.2,
              fill: pal.moss[Math.floor(r() * pal.moss.length)],
            };
          })
        );

    const pebbles = Array.from({ length: compact ? 16 : 34 }, (_, k) => ({
      k,
      cx: r() * 800,
      cy: 558 + r() * 38,
      r: 5 + r() * 9,
      fill: ["#574838", "#4d3f32", "#5a4d3f", "#6b5a48", "#3f352b"][Math.floor(r() * 5)],
    }));

    const granules = Array.from({ length: compact ? 20 : 60 }, (_, k) => ({
      k,
      cx: r() * 800,
      cy: 533 + r() * 16,
      r: 1.2 + r() * 2,
    }));

    const droplets = Array.from({ length: compact ? 0 : 16 }, (_, k) => ({
      k,
      cx: 40 + r() * 720,
      cy: 40 + r() * 380,
      rx: 2 + r() * 3,
    }));

    const flies = Array.from({ length: compact ? 0 : 12 }, (_, k) => ({
      k,
      cx: 60 + r() * 680,
      cy: 300 + r() * 190,
      delay: r() * 6,
      dur: 5 + r() * 5,
      dx: (r() - 0.5) * 80,
    }));

    const fittonia = Array.from({ length: 9 }, (_, k) => ({
      k,
      x: 230 + r() * 340,
      y: 470 + r() * 18,
      rot: (r() - 0.5) * 70,
      s: 0.8 + r() * 0.6,
      delay: 0.6 + r() * 1.2,
    }));

    const pilea = Array.from({ length: 6 }, (_, k) => ({
      k,
      x: 150 + r() * 500,
      h: 55 + r() * 60,
      rad: 14 + r() * 7,
      lean: (r() - 0.5) * 40,
      delay: 0.8 + r() * 1.2,
    }));

    const sprouts = Array.from({ length: 16 }, (_, k) => ({
      k,
      x: 60 + r() * 680,
      h: 22 + r() * 48,
      lean: (r() - 0.5) * 16,
      delay: 0.3 + r() * 2.2,
    }));

    return { blades, mossDots, pebbles, granules, droplets, flies, fittonia, pilea, sprouts };
  }, [variant, compact, pal]);

  const barColor = lightMode === "grow" ? "#f472b6" : lightMode === "night" ? "#7dd3fc" : "#fef08a";
  const rayColor = lightMode === "grow" ? "#f9a8d4" : lightMode === "night" ? "#93c5fd" : "#fef9c3";
  const skyTop = lightMode === "night" ? "#06141f" : lightMode === "grow" ? "#1b0f26" : "#10261a";
  const skyBottom = lightMode === "night" ? "#030a10" : lightMode === "grow" ? "#0b0610" : "#061109";

  const backBlades = scene.blades.filter((b) => !b.front);
  const frontBlades = scene.blades.filter((b) => b.front);

  const renderBlade = (b: (typeof scene.blades)[number]) => (
    <path
      key={b.i}
      d={b.d}
      fill={b.fill}
      style={{
        transformOrigin: `${b.x.toFixed(1)}px ${b.y.toFixed(1)}px`,
        animation: `blade-grow 1.6s cubic-bezier(.2,.8,.3,1) ${b.delay.toFixed(2)}s both, blade-sway ${b.swayDur.toFixed(1)}s ease-in-out ${(b.delay + 1.6).toFixed(2)}s infinite alternate`,
      }}
    />
  );

  return (
    <svg
      className={`w-full h-full ${className}`}
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMax slice"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Animated ${variant} terrarium with growing grass and ferns`}
    >
      <defs>
        <linearGradient id={`bg${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={skyTop} />
          <stop offset="1" stopColor={skyBottom} />
        </linearGradient>
        <linearGradient id={`ray${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={rayColor} stopOpacity="0.5" />
          <stop offset="1" stopColor={rayColor} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`crystal${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#bae6fd" stopOpacity="0.6" />
        </linearGradient>
        <filter id={`blur${uid}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id={`glow${uid}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Back wall */}
      <rect width="800" height="600" fill={`url(#bg${uid})`} />
      <g filter={`url(#blur${uid})`} opacity="0.7">
        <ellipse cx="140" cy="260" rx="150" ry="120" fill="#14532d" opacity="0.55" />
        <ellipse cx="420" cy="230" rx="190" ry="110" fill="#166534" opacity="0.45" />
        <ellipse cx="680" cy="270" rx="150" ry="130" fill="#15803d" opacity="0.4" />
      </g>

      {/* Light bar + rays */}
      <rect x="230" y="18" width="340" height="12" rx="6" fill={barColor} filter={`url(#glow${uid})`} />
      <g style={{ mixBlendMode: "screen" }}>
        {[0, 1, 2].map((k) => (
          <polygon
            key={k}
            points={`${300 + k * 100},30 ${340 + k * 100},30 ${430 + k * 170 - 160},500 ${210 + k * 170 - 160},500`}
            fill={`url(#ray${uid})`}
            style={{ animation: `ray-pulse ${5 + k * 1.3}s ease-in-out ${k * 0.8}s infinite` }}
            opacity={lightMode === "night" ? 0.25 : 0.5}
          />
        ))}
      </g>

      {/* Hanging vine (console only) */}
      {variant === "console" && !compact && (
        <g
          style={{
            transformOrigin: "95px 0px",
            animation: "frond-sway 7s ease-in-out infinite alternate",
          }}
        >
          <path d="M95 0 C80 80 130 120 108 210 C98 250 120 280 112 320" stroke="#14532d" strokeWidth="3" fill="none" />
          {[40, 90, 140, 190, 240, 290].map((yy, k) => (
            <ellipse
              key={yy}
              cx={k % 2 ? 112 : 84}
              cy={yy}
              rx="14"
              ry="9"
              fill={k % 2 ? "#4ade80" : "#22c55e"}
              transform={`rotate(${k % 2 ? 25 : -25} ${k % 2 ? 112 : 84} ${yy})`}
            />
          ))}
        </g>
      )}

      {/* Driftwood (console only) */}
      {variant === "console" && (
        <g>
          <path d="M215 498 C270 392 360 335 500 325 C545 322 590 336 640 358 L622 386 C580 366 530 357 488 362 C390 376 318 432 285 500 Z" fill="#3b2314" />
          <path d="M392 352 C430 295 490 258 552 238 L560 252 C510 272 452 306 418 360 Z" fill="#4a2e1c" />
          <path d="M240 480 C290 400 370 352 480 342" stroke="#5a3a24" strokeWidth="3" fill="none" opacity="0.7" />
        </g>
      )}

      {/* Back grass */}
      <g>{backBlades.map(renderBlade)}</g>

      {/* Ferns */}
      <g>
        {FRONDS[variant].map((f, i) => (
          <Frond
            key={i}
            spec={f}
            color={pal.frond}
            tip={pal.frondTip}
            stem={pal.stem}
            delay={0.3 + i * 0.25}
          />
        ))}
      </g>

      {/* Variant specifics */}
      {variant === "portable" && (
        <g>
          {scene.pilea.map((p) => (
            <g
              key={p.k}
              style={{
                transformOrigin: `${p.x.toFixed(1)}px 492px`,
                animation: `blade-grow 1.8s ease-out ${p.delay.toFixed(2)}s both, blade-sway 5s ease-in-out ${(p.delay + 1.8).toFixed(2)}s infinite alternate`,
              }}
            >
              <path d={`M${p.x.toFixed(1)} 492 Q${p.x.toFixed(1)} ${(492 - p.h / 2).toFixed(1)} ${(p.x + p.lean).toFixed(1)} ${(492 - p.h).toFixed(1)}`} stroke="#166534" strokeWidth="3" fill="none" />
              <circle cx={p.x + p.lean} cy={492 - p.h} r={p.rad} fill="#7dd3b0" />
              <circle cx={p.x + p.lean} cy={492 - p.h} r={p.rad * 0.55} fill="#a7f3d0" opacity="0.7" />
            </g>
          ))}
          {scene.fittonia.map((f) => (
            <g
              key={f.k}
              transform={`translate(${f.x.toFixed(1)} ${f.y.toFixed(1)}) rotate(${f.rot.toFixed(1)}) scale(${f.s.toFixed(2)})`}
            >
              <g
                style={{
                  transformOrigin: "0px 0px",
                  animation: `blade-grow 1.6s ease-out ${f.delay.toFixed(2)}s both`,
                }}
              >
                <ellipse cx="0" cy="-18" rx="30" ry="21" fill="#166534" />
                <path d="M0 -2 L0 -36 M0 -14 L-16 -26 M0 -14 L16 -26 M0 -24 L-10 -31 M0 -24 L10 -31" stroke="#f472b6" strokeWidth="2.4" strokeLinecap="round" fill="none" />
              </g>
            </g>
          ))}
        </g>
      )}

      {variant === "micro" && (
        <g>
          {[
            { x: 250, r: 62 },
            { x: 395, r: 48 },
            { x: 555, r: 66 },
          ].map((b, i) => (
            <g key={i}>
              <circle cx={b.x} cy={500} r={b.r} fill="#0f766e" />
              <circle cx={b.x - b.r * 0.2} cy={500 - b.r * 0.15} r={b.r * 0.82} fill="#14b8a6" />
              <circle cx={b.x - b.r * 0.3} cy={500 - b.r * 0.3} r={b.r * 0.45} fill="#5eead4" opacity="0.55" />
            </g>
          ))}
          {[
            { x: 450, h: 120, w: 22 },
            { x: 480, h: 84, w: 18 },
            { x: 425, h: 70, w: 16 },
          ].map((c, i) => (
            <g key={i} filter={`url(#glow${uid})`}>
              <polygon
                points={`${c.x - c.w},492 ${c.x - c.w * 0.6},${492 - c.h * 0.8} ${c.x},${492 - c.h} ${c.x + c.w * 0.6},${492 - c.h * 0.8} ${c.x + c.w},492`}
                fill={`url(#crystal${uid})`}
                stroke="#ffffff"
                strokeOpacity="0.7"
                strokeWidth="1"
              />
              <path d={`M${c.x} ${492 - c.h} L${c.x} 492`} stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1" />
            </g>
          ))}
        </g>
      )}

      {variant === "diy" && (
        <g>
          {scene.sprouts.map((s) => (
            <g
              key={s.k}
              style={{
                transformOrigin: `${s.x.toFixed(1)}px 494px`,
                animation: `blade-grow 2s ease-out ${s.delay.toFixed(2)}s both, blade-sway 4s ease-in-out ${(s.delay + 2).toFixed(2)}s infinite alternate`,
              }}
            >
              <path d={`M${s.x.toFixed(1)} 494 Q${s.x.toFixed(1)} ${(494 - s.h / 2).toFixed(1)} ${(s.x + s.lean).toFixed(1)} ${(494 - s.h).toFixed(1)}`} stroke="#84cc16" strokeWidth="3" fill="none" strokeLinecap="round" />
              <ellipse cx={s.x + s.lean - 9} cy={494 - s.h} rx="10" ry="5" fill="#a3e635" transform={`rotate(-25 ${s.x + s.lean - 9} ${494 - s.h})`} />
              <ellipse cx={s.x + s.lean + 9} cy={494 - s.h} rx="10" ry="5" fill="#bef264" transform={`rotate(25 ${s.x + s.lean + 9} ${494 - s.h})`} />
            </g>
          ))}
        </g>
      )}

      {/* Ground: moss line + mounds */}
      <path d="M0 490 Q100 476 200 489 T400 487 T600 489 T800 485 V510 H0 Z" fill={pal.moss[0]} />
      {(variant === "console" || variant === "portable" || variant === "diy") &&
        MOUNDS.map((m, i) => (
          <g key={i}>
            <ellipse cx={m.cx} cy={m.cy + 6} rx={m.rx} ry={m.ry} fill={pal.moss[0]} />
            <ellipse cx={m.cx} cy={m.cy} rx={m.rx * 0.92} ry={m.ry * 0.85} fill={pal.moss[1]} />
            <ellipse cx={m.cx - m.rx * 0.12} cy={m.cy - m.ry * 0.12} rx={m.rx * 0.66} ry={m.ry * 0.55} fill={pal.moss[2]} />
          </g>
        ))}
      {scene.mossDots.map((d) => (
        <circle key={d.key} cx={d.cx} cy={d.cy} r={d.r} fill={d.fill} opacity="0.85" />
      ))}

      {/* Front grass */}
      <g>{frontBlades.map(renderBlade)}</g>

      {/* Substrate strata */}
      <rect x="0" y="505" width="800" height="28" fill="#2a1d15" />
      <rect x="0" y="533" width="800" height="22" fill="#141414" />
      {scene.granules.map((g) => (
        <circle key={g.k} cx={g.cx} cy={g.cy} r={g.r} fill="#2b2b2b" />
      ))}
      <rect x="0" y="555" width="800" height="45" fill="#3a2f26" />
      {scene.pebbles.map((p) => (
        <circle key={p.k} cx={p.cx} cy={p.cy} r={p.r} fill={p.fill} />
      ))}

      {/* Mist */}
      {!compact && (
        <g filter={`url(#blur${uid})`}>
          {[0, 1, 2].map((k) => (
            <ellipse
              key={k}
              cx={160 + k * 240}
              cy={430 - k * 18}
              rx="170"
              ry="26"
              fill="#d1fae5"
              style={{ animation: `mist-drift ${9 + k * 2}s ease-in-out ${k * 1.5}s infinite alternate` }}
            />
          ))}
        </g>
      )}

      {/* Condensation droplets + rain running down the glass */}
      {!compact && (
        <g>
          {scene.droplets.map((d) => (
            <g key={d.k} opacity="0.65">
              <ellipse cx={d.cx} cy={d.cy} rx={d.rx} ry={d.rx * 1.5} fill="#ffffff" fillOpacity="0.28" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="0.8" />
              <circle cx={d.cx - d.rx * 0.3} cy={d.cy - d.rx * 0.5} r={d.rx * 0.28} fill="#ffffff" />
            </g>
          ))}
          {[120, 290, 470, 640, 720].map((x, k) => (
            <ellipse
              key={x}
              cx={x}
              cy={70 + k * 20}
              rx="3"
              ry="5"
              fill="#ffffff"
              fillOpacity="0.75"
              style={{ animation: `drip ${4.5 + k * 0.9}s ease-in ${k * 1.3}s infinite` }}
            />
          ))}
        </g>
      )}

      {/* Fireflies / spores */}
      {!compact && lightMode !== "day" && (
        <g>
          {scene.flies.map((f) => (
            <circle
              key={f.k}
              cx={f.cx}
              cy={f.cy}
              r="3"
              fill={lightMode === "night" ? "#fde68a" : "#fbcfe8"}
              filter={`url(#glow${uid})`}
              style={
                {
                  "--dx": `${f.dx.toFixed(0)}px`,
                  animation: `firefly ${f.dur.toFixed(1)}s ease-in-out ${f.delay.toFixed(1)}s infinite`,
                } as React.CSSProperties
              }
            />
          ))}
        </g>
      )}
    </svg>
  );
}
