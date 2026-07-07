"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

const SHAPES = [
  "M 5 1 L 11 1 L 11 5 L 15 5 L 15 11 L 11 11 L 11 15 L 5 15 L 5 11 L 1 11 L 1 5 L 5 5 Z", // cross
  "M 5 1 L 11 1 L 13 3 L 15 5 L 15 11 L 13 13 L 11 15 L 5 15 L 3 13 L 1 11 L 1 5 L 3 3 Z", // circle
  "M 8 1 L 11 4 L 13 6 L 15 8 L 13 10 L 11 12 L 8 15 L 5 12 L 3 10 L 1 8 L 3 6 L 5 4 Z", // diamond
  "M 3 3 L 6 3 L 10 3 L 13 3 L 13 6 L 13 10 L 13 13 L 10 13 L 6 13 L 3 13 L 3 10 L 3 6 Z", // square
  "M 7 1 L 9 1 L 10 6 L 15 7 L 15 9 L 10 10 L 9 15 L 7 15 L 6 10 L 1 9 L 1 7 L 6 6 Z"  // star
];

export const PixelCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [shapeIndex, setShapeIndex] = useState(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => {
      setClicking(true);
      setShapeIndex((prev) => (prev + 1) % SHAPES.length);
    };
    const onUp = () => setClicking(false);

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [visible]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999]"
      animate={{
        x: pos.x - 12, // center the 24x24 svg
        y: pos.y - 12,
        opacity: visible ? 1 : 0,
        scale: clicking ? 0.75 : 1,
      }}
      transition={{ type: "spring", stiffness: 800, damping: 40, mass: 0.2 }}
      style={{ transformOrigin: "center center" }}
    >
      {/* 8-bit morphing cursor */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          imageRendering: "pixelated",
          filter: "drop-shadow(2px 2px 0px rgba(0,0,0,0.2))",
        }}
      >
        <motion.path
          animate={{ d: SHAPES[shapeIndex] }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          fill={clicking ? "#2563eb" : "#3b82f6"}
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinejoin="miter"
          shapeRendering="crispEdges"
        />
      </svg>
    </motion.div>
  );
};
