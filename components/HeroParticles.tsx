"use client";

import { useEffect, useRef, useState } from "react";

// 8-bit palette matching the Kontext logo
const COLORS = [
  "#000000", "#000000", "#000000", "#000000", // mostly black, weighted heavily
  "#ff0000", "#5aff00", "#ff00f0", "#0600ff",
];
const NUM = 55;

interface Particle {
  id: number;
  bx: number; // base position in % of container
  by: number;
  size: number;
  color: string;
  opacity: number;
}

export const HeroParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number | null>(null);

  // Generate on client only to avoid hydration mismatch
  useEffect(() => {
    const ps: Particle[] = Array.from({ length: NUM }, (_, i) => ({
      id: i,
      bx: Math.random() * 96 + 2,
      by: Math.random() * 96 + 2,
      size: [4, 4, 6, 6, 8, 10, 12][Math.floor(Math.random() * 7)],
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: 0.06 + Math.random() * 0.14,
    }));
    setParticles(ps);
    setPositions(ps.map((p) => ({ x: p.bx, y: p.by })));
  }, []);

  // RAF loop: compute repulsion from mouse
  useEffect(() => {
    if (!particles.length) return;
    const REPEL_R = 12; // percent units
    const MAX_PUSH = 8;

    const loop = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      setPositions(
        particles.map((p) => {
          const dx = mx - p.bx;
          const dy = my - p.by;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < REPEL_R && dist > 0) {
            const force = (REPEL_R - dist) / REPEL_R;
            return {
              x: p.bx - (dx / dist) * force * MAX_PUSH,
              y: p.by - (dy / dist) * force * MAX_PUSH,
            };
          }
          return { x: p.bx, y: p.by };
        })
      );
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [particles]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -9999, y: -9999 };
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {particles.map((p, i) => {
        const pos = positions[i] ?? { x: p.bx, y: p.by };
        return (
          <div
            key={p.id}
            className="absolute"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              opacity: p.opacity,
              transition: "left 0.25s ease-out, top 0.25s ease-out",
              transform: "translate(-50%,-50%)",
            }}
          />
        );
      })}
    </div>
  );
};
