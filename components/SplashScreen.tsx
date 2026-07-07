"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Counter } from "./Counter";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [targetValue, setTargetValue] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);

  useEffect(() => {
    // Sequence: 0 -> 52 -> 79 -> 96 -> Finish
    const timeouts = [
      setTimeout(() => setTargetValue(52), 500),
      setTimeout(() => setTargetValue(79), 1500),
      setTimeout(() => setTargetValue(96), 2500),
      setTimeout(() => {
        setIsRevealing(true);
      }, 3500),
    ];

    return () => timeouts.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isRevealing && (
        <motion.div
          key="splash"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white pointer-events-none"
        >
          <motion.div 
            exit={{ scale: 3, opacity: 0, filter: "blur(10px)" }} 
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center space-y-4"
          >
            <Counter end={targetValue} duration={0.8} fontSize={42} />
            <p className="font-pixel text-[9px] text-gray-400 mt-3 tracking-widest uppercase text-center">
              Loading Engine...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
