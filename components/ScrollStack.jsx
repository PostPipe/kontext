"use client";

import { useLayoutEffect, useRef, useCallback } from 'react';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100, // Distance between cards in document flow
  itemScale = 0.05,
  itemStackDistance = 30, // How many pixels each card stacks below the previous
  stackPosition = '15%',
  scaleEndPosition = '5%',
  baseScale = 0.9,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete = () => {}
}) => {
  const scrollerRef = useRef(null);
  const rafRef = useRef(null);
  const ticking = useRef(false);
  const cardsRef = useRef([]);
  const initialTopsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const updateCardTransforms = useCallback(() => {
    const scrollTop = window.scrollY;
    const containerHeight = window.innerHeight;

    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = initialTopsRef.current[i];
      // triggerStart is when the card reaches its sticky position
      const triggerStart = cardTop - stackPositionPx - (itemStackDistance * i);
      
      // Calculate scale progress based on how far we scrolled PAST the trigger
      // Wait, we want the card to start scaling down when the NEXT card hits it!
      // But the original math uses triggerEnd.
      const triggerEnd = cardTop - scaleEndPositionPx;

      let scaleProgress = 0;
      if (scrollTop > triggerStart && scrollTop <= triggerEnd) {
        scaleProgress = (scrollTop - triggerStart) / (triggerEnd - triggerStart);
      } else if (scrollTop > triggerEnd) {
        scaleProgress = 1;
      }

      // We only scale down cards that are BEHIND the current top card
      // Let's find which card is currently the active top card
      let activeCardIndex = 0;
      for (let j = 0; j < cardsRef.current.length; j++) {
        const jTriggerStart = initialTopsRef.current[j] - stackPositionPx - (itemStackDistance * j);
        if (scrollTop >= jTriggerStart) {
          activeCardIndex = j;
        }
      }

      // Instead of the complex progress math, let's just scale down cards based on their distance from the active card!
      // This is much more reliable.
      let depth = 0;
      if (i < activeCardIndex) {
        // This card is pinned behind the active card
        depth = activeCardIndex - i;
        // Add a continuous fraction based on how far the active card has scrolled past its pin point
        const activeTriggerStart = initialTopsRef.current[activeCardIndex] - stackPositionPx - (itemStackDistance * activeCardIndex);
        const nextTriggerStart = (activeCardIndex + 1 < cardsRef.current.length) 
          ? (initialTopsRef.current[activeCardIndex + 1] - stackPositionPx - (itemStackDistance * (activeCardIndex + 1)))
          : (activeTriggerStart + itemDistance); // Fake next distance if it's the last card
        
        let fraction = (scrollTop - activeTriggerStart) / (nextTriggerStart - activeTriggerStart);
        fraction = Math.max(0, Math.min(1, fraction));
        
        depth += fraction;
      }

      // Calculate smooth scale and blur based on depth
      const scale = Math.max(baseScale, 1 - (depth * itemScale));
      const blur = Math.max(0, depth * blurAmount);
      const rotation = depth * rotationAmount;

      const lastT = lastTransformsRef.current.get(i);
      const changed =
        !lastT ||
        Math.abs(lastT.scale - scale) > 0.0001 ||
        Math.abs(lastT.blur - blur) > 0.01 ||
        Math.abs(lastT.rotation - rotation) > 0.01;

      if (changed) {
        // Apply transform. Note: NO translateY! CSS position: sticky handles the physical pinning perfectly without jitter.
        card.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
        card.style.filter = blur > 0 ? `blur(${blur}px)` : '';
        lastTransformsRef.current.set(i, { scale, blur, rotation });
      }
    });
  }, [
    itemScale, itemStackDistance, stackPosition, scaleEndPosition,
    baseScale, rotationAmount, blurAmount, parsePercentage, itemDistance
  ]);

  const onScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    rafRef.current = requestAnimationFrame(() => {
      updateCardTransforms();
      ticking.current = false;
    });
  }, [updateCardTransforms]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll('.scroll-stack-card'));
    cardsRef.current = cards;
    initialTopsRef.current = [];

    const containerHeight = window.innerHeight;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);

    cards.forEach((card, i) => {
      // Record initial absolute Y position before applying sticky
      const rect = card.getBoundingClientRect();
      initialTopsRef.current[i] = rect.top + window.scrollY;

      // Apply CSS sticky
      card.style.position = 'sticky';
      card.style.top = `${stackPositionPx + (itemStackDistance * i)}px`;
      
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Initial render
    updateCardTransforms();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      cardsRef.current = [];
      initialTopsRef.current = [];
      lastTransformsRef.current.clear();
    };
  }, [
    itemDistance, itemStackDistance, stackPosition,
    onScroll, updateCardTransforms, parsePercentage
  ]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
      </div>
    </div>
  );
};

export default ScrollStack;
