"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ── Raw logo data (positions from Kontext-light.svg, colors from kontext_animation_1.md) ──
const RAW_CUBES = [
  { id: 1,  ox: 239, oy: 134, color: "#000000", fillDelay: 0.80 },
  { id: 2,  ox: 239, oy: 64,  color: "#ff0000", fillDelay: 0.93 },
  { id: 3,  ox: 359, oy: 155, color: "#5aff00", fillDelay: 1.06 },
  { id: 4,  ox: 239, oy: 205, color: "#000000", fillDelay: 1.19 },
  { id: 5,  ox: 179, oy: 215, color: "#000000", fillDelay: 1.32 },
  { id: 6,  ox: 179, oy: 265, color: "#000000", fillDelay: 1.45 },
  { id: 7,  ox: 299, oy: 215, color: "#000000", fillDelay: 1.58 },
  { id: 8,  ox: 299, oy: 265, color: "#000000", fillDelay: 1.71 },
  { id: 9,  ox: 239, oy: 275, color: "#ff00f0", fillDelay: 1.84 },
  { id: 10, ox: 239, oy: 345, color: "#000000", fillDelay: 1.97 },
  { id: 11, ox: 359, oy: 325, color: "#0600ff", fillDelay: 2.10 },
  { id: 12, ox: 119, oy: 155, color: "#000000", fillDelay: 2.23 },
  { id: 13, ox: 119, oy: 325, color: "#000000", fillDelay: 2.36 },
];

const ACCENT = ["#ff0000", "#5aff00", "#ff00f0", "#0600ff"];
const AMBIENT_N = 42;
type Phase = "filling" | "settling" | "scattered";

interface Cube {
  id: number; color: string; fillDelay: number;
  sx: number; sy: number;
  gx: number; gy: number;
  size: number;
}
interface ScatterPt { x: number; y: number; }

// ── Layout computation ──────────────────────────────────────────────────────
function computeCubes(w: number, h: number): { cubes: Cube[]; cubeSize: number } {
  const logoSize = Math.min(w * 0.3, h * 0.65, 300);
  const scale    = logoSize / 512;
  const logoLeft = w * 0.58;
  const logoTop  = (h - logoSize) / 2;

  const cubeSize = Math.max(8, Math.round(34 * scale));
  const step     = cubeSize + 2;
  const gridW    = 4 * step - 2;
  const gridX    = logoLeft + (logoSize - gridW) / 2;
  const gridY    = logoTop  + (logoSize - gridW) / 2;

  const cubes = RAW_CUBES.map((c, i) => ({
    id: c.id, color: c.color, fillDelay: c.fillDelay,
    sx: logoLeft + c.ox * scale,
    sy: logoTop  + c.oy * scale,
    gx: gridX + (i % 4) * step,
    gy: gridY + Math.floor(i / 4) * step,
    size: cubeSize,
  }));

  return { cubes, cubeSize };
}

// ── Component ───────────────────────────────────────────────────────────────
export const KontextLogoAnimated = ({ className = "" }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [dims,    setDims   ] = useState({ w: 0, h: 0 });
  const [cubes,   setCubes  ] = useState<Cube[]>([]);
  const [scatter, setScatter] = useState<ScatterPt[]>([]);
  const [ambient, setAmbient] = useState<
    Array<{ x: number; y: number; size: number; color: string; opacity: number }>
  >([]);
  const [phase,   setPhase  ] = useState<Phase>("filling");
  const [ready,   setReady  ] = useState(false);

  // Measure + initialise layout once on mount
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const { width: w, height: h } = el.getBoundingClientRect();
    const { cubes: c } = computeCubes(w, h);
    setDims({ w, h });
    setCubes(c);
    setScatter(RAW_CUBES.map(() => ({
      x: Math.random() * (w - 30) + 10,
      y: Math.random() * (h - 30) + 10,
    })));
    setAmbient(Array.from({ length: AMBIENT_N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: [4, 5, 6, 8, 10][Math.floor(Math.random() * 5)],
      color: Math.random() < 0.75 ? "#000000" : ACCENT[Math.floor(Math.random() * 4)],
      opacity: 0.04 + Math.random() * 0.11,
    })));
    setReady(true);
  }, []);

  // Phase timeline — starts after layout is ready
  useEffect(() => {
    if (!ready) return;
    // fill → settle at 3.4s, settle → scatter at 6.2s
    const t1 = setTimeout(() => setPhase("settling"),  3400);
    const t2 = setTimeout(() => setPhase("scattered"), 6200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [ready]);

  // Resize
  useEffect(() => {
    const onResize = () => {
      const el = containerRef.current;
      if (!el) return;
      const { width: w, height: h } = el.getBoundingClientRect();
      const { cubes: c } = computeCubes(w, h);
      setDims({ w, h });
      setCubes(c);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (!ready || dims.w === 0) {
    return <div ref={containerRef} className={`absolute inset-0 ${className}`} />;
  }

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none ${className}`}>
      <svg
        viewBox={`0 0 ${dims.w} ${dims.h}`}
        width="100%" height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        {/* Ambient particles — fade in when scattered */}
        {phase === "scattered" && ambient.map((p, i) => (
          <motion.rect
            key={`a-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: p.opacity }}
            transition={{ duration: 0.6, delay: i * 0.02 }}
            x={p.x} y={p.y}
            width={p.size} height={p.size}
            fill={p.color}
          />
        ))}

        {/* Logo cubes */}
        {cubes.map((cube, i) => {
          const sp = scatter[i];
          const isScattered = phase === "scattered" && sp;

          return (
            <motion.rect
              key={cube.id}
              width={cube.size}
              height={cube.size}
              // x/y as CSS transform via Framer Motion
              initial={{ x: cube.sx, y: cube.sy, opacity: 0, fill: "transparent" }}
              animate={
                phase === "filling"
                  ? { x: cube.sx, y: cube.sy, opacity: 1,    fill: cube.color }
                  : phase === "settling"
                  ? { x: cube.gx, y: cube.gy, opacity: 1,    fill: cube.color }
                  : /* scattered */
                    { x: sp?.x ?? cube.gx, y: sp?.y ?? cube.gy, opacity: 0.18, fill: cube.color }
              }
              transition={
                phase === "filling"
                  ? {
                      opacity: { delay: cube.fillDelay, duration: 0.5, ease: "easeOut" },
                      fill:    { delay: cube.fillDelay, duration: 0.5, ease: "easeOut" },
                      x: { duration: 0 }, y: { duration: 0 },
                    }
                  : phase === "settling"
                  ? {
                      x: { duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 },
                      y: { duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 },
                      fill: { duration: 0 }, opacity: { duration: 0 },
                    }
                  : {
                      x: { duration: 0.9, ease: [0.4, 0, 0.2, 1], delay: i * 0.05 },
                      y: { duration: 0.9, ease: [0.4, 0, 0.2, 1], delay: i * 0.05 },
                      opacity: { duration: 0.6, ease: "easeOut", delay: i * 0.05 },
                    }
              }
            />
          );
        })}
      </svg>
    </div>
  );
};
