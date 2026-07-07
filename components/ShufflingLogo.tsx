"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "motion/react";

interface BoxData {
  id: number;
  originX: number;
  originY: number;
  color: string;
}

const BOXES: BoxData[] = [
  { id: 1, originX: 239, originY: 134, color: "#1b1b1bff" },
  { id: 2, originX: 239, originY: 64, color: "#eb2525ff" },
  { id: 3, originX: 359, originY: 155, color: "#fa6093ff" },
  { id: 4, originX: 239, originY: 205, color: "#1b1b1bff" },
  { id: 5, originX: 179, originY: 215, color: "#1b1b1bff" },
  { id: 6, originX: 179, originY: 265, color: "#1b1b1bff" },
  { id: 7, originX: 299, originY: 215, color: "#1b1b1bff" },
  { id: 8, originX: 299, originY: 265, color: "#1b1b1bff" },
  { id: 9, originX: 239, originY: 275, color: "#93fd9cff" },
  { id: 10, originX: 239, originY: 345, color: "#1b1b1bff" },
  { id: 11, originX: 359, originY: 325, color: "#1d4ed8" },
  { id: 12, originX: 119, originY: 155, color: "#1b1b1bff" },
  { id: 13, originX: 119, originY: 325, color: "#1b1b1bff" },
];

export const ShufflingLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [phase, setPhase] = useState<"logo" | "shuffled1" | "square" | "shuffled2">("logo");
  const [isExploded, setIsExploded] = useState(false);

  // Generate target coordinates for the "square" phase (which will be a perfect Diamond)
  // 13 boxes fit perfectly into a 5x5 diamond pattern
  const squarePositions = React.useMemo(() => {
    const positions = [];
    const startX = 166;
    const startY = 166;
    const size = 36;

    const validCells = [
      [0, 2],
      [1, 1], [1, 2], [1, 3],
      [2, 0], [2, 1], [2, 2], [2, 3], [2, 4],
      [3, 1], [3, 2], [3, 3],
      [4, 2]
    ];

    for (const [row, col] of validCells) {
      positions.push({ x: startX + col * size, y: startY + row * size });
    }
    return positions;
  }, []);

  // Generate target coordinates for the "ring" phase (replaces shuffled1)
  const ringPositions = React.useMemo(() => {
    const positions = [];
    const cx = 221; // 238 (center) - 17 (half block)
    const cy = 221;
    const radius = 100;
    for (let i = 0; i < 13; i++) {
      const angle = (i / 13) * Math.PI * 2 - Math.PI / 2; // start at top
      positions.push({
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        rotate: 0,
      });
    }
    return positions;
  }, []);

  // Generate target coordinates for the "cross" phase (replaces shuffled2)
  const crossPositions = React.useMemo(() => {
    const cx = 221;
    const cy = 221;
    const size = 36;
    return [
      { x: cx, y: cy }, // center
      { x: cx, y: cy - size }, { x: cx, y: cy - 2 * size }, { x: cx, y: cy - 3 * size }, // top
      { x: cx, y: cy + size }, { x: cx, y: cy + 2 * size }, { x: cx, y: cy + 3 * size }, // bottom
      { x: cx - size, y: cy }, { x: cx - 2 * size, y: cy }, { x: cx - 3 * size, y: cy }, // left
      { x: cx + size, y: cy }, { x: cx + 2 * size, y: cy }, { x: cx + 3 * size, y: cy }, // right
    ].map(pos => ({ ...pos, rotate: 0 }));
  }, []);

  const [explosion, setExplosion] = useState<{ x: number, y: number, rotate: number }[]>([]);

  useEffect(() => {
    if (isExploded) return;

    const timer = setTimeout(() => {
      setPhase((prev) => {
        if (prev === "logo") return "shuffled1";
        if (prev === "shuffled1") return "square";
        if (prev === "square") return "shuffled2";
        return "logo";
      });
    }, 2000); // slightly faster transitions

    return () => clearTimeout(timer);
  }, [phase, isExploded]);

  const handleExplode = () => {
    if (isExploded) return;
    setIsExploded(true);
    setExplosion(
      BOXES.map(() => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 500 + Math.random() * 500;
        return {
          x: 256 + Math.cos(angle) * distance,
          y: 256 + Math.sin(angle) * distance,
          rotate: (Math.random() - 0.5) * 1000,
        };
      })
    );

    // Revert back to loop after explosion finishes
    setTimeout(() => {
      setIsExploded(false);
      setPhase("logo");
    }, 2000);
  };

  return (
    <div className={`relative cursor-pointer ${className}`} onClick={handleExplode} aria-label="Animated Kontext Logo">
      <svg viewBox="0 0 512 512" className="w-full h-full overflow-visible">
        {BOXES.map((box, i) => {
          let targetX = box.originX;
          let targetY = box.originY;
          let targetRotate = 0;

          if (isExploded) {
            targetX = explosion[i].x;
            targetY = explosion[i].y;
            targetRotate = explosion[i].rotate;
          } else {
            if (phase === "shuffled1") {
              targetX = ringPositions[i].x;
              targetY = ringPositions[i].y;
              targetRotate = ringPositions[i].rotate;
            } else if (phase === "square") {
              targetX = squarePositions[i].x;
              targetY = squarePositions[i].y;
            } else if (phase === "shuffled2") {
              targetX = crossPositions[i].x;
              targetY = crossPositions[i].y;
              targetRotate = crossPositions[i].rotate;
            }
          }

          return (
            <motion.rect
              key={box.id}
              width="34"
              height="34"
              fill={box.color}
              initial={false}
              animate={{
                x: targetX,
                y: targetY,
                rotate: targetRotate,
                scale: isExploded ? 0 : 1, // shrink out of view
                opacity: isExploded ? 0 : 1,
              }}
              transition={{
                duration: isExploded ? 0.8 : 1.2,
                ease: isExploded ? "easeOut" : "easeInOut",
                type: isExploded ? "tween" : "spring",
                bounce: 0.2,
              }}
              style={{ originX: "17px", originY: "17px" }}
            />
          );
        })}
      </svg>
    </div>
  );
};
