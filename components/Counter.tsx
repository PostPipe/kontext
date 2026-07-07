"use client"

import * as React from "react"
import { MotionValue, motion, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const cn = (...args: any[]) => {
  return twMerge(clsx(args));
};

const fontSizeConst = 40;
const padding = 10;
const height = fontSizeConst + padding;

interface CounterProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  start?: number;
  end: number;
  duration?: number;
  className?: string;
  fontSize?: number;
}

export const Counter = ({
  start = 0,
  end,
  duration = 2,
  className,
  fontSize = 30,
  ...rest
}: CounterProps) => {
  const [value, setValue] = useState(start);

  useEffect(() => {
    if (value === end) return;
    const isCountingUp = end > value;
    const diff = Math.abs(end - value);
    
    // Fallback to prevent divide by zero
    const stepTime = diff === 0 ? 1000 : (duration / diff) * 1000;

    const interval = setInterval(() => {
      setValue((prev) => {
        if (isCountingUp) {
          if (prev < end) return prev + 1;
          return prev;
        } else {
          if (prev > end) return prev - 1;
          return prev;
        }
      });
    }, stepTime);

    return () => clearInterval(interval);
  }, [end, duration]); // We only restart interval if end or duration changes

  const displayHeight = fontSize + padding;

  return (
    <div
      style={{ fontSize }}
      {...rest}
      className={cn(
        "flex overflow-hidden rounded px-2 leading-none text-black font-bold font-pixel",
        className
      )}
    >
      {value >= 100000 && <Digit place={100000} value={value} height={displayHeight} />}
      {value >= 10000 && <Digit place={10000} value={value} height={displayHeight} />}
      {value >= 1000 && <Digit place={1000} value={value} height={displayHeight} />}
      {value >= 100 && <Digit place={100} value={value} height={displayHeight} />}
      {value >= 10 && <Digit place={10} value={value} height={displayHeight} />}
      <Digit place={1} value={value} height={displayHeight} />
    </div>
  );
};

function Digit({ place, value, height }: { place: number; value: number, height: number }) {
  let valueRoundedToPlace = Math.floor(value / place);
  let animatedValue = useSpring(valueRoundedToPlace, { stiffness: 120, damping: 20 });

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div style={{ height }} className="relative w-[1ch] tabular-nums">
      {[...Array(10)].map((_, i) => (
        <Number key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </div>
  );
}

function Number({ mv, number, height }: { mv: MotionValue; number: number; height: number }) {
  let y = useTransform(mv, (latest) => {
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;

    let memo = offset * height;

    if (offset > 5) {
      memo -= 10 * height;
    }

    return memo;
  });

  return (
    <motion.span
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {number}
    </motion.span>
  );
}
