'use client';

import { useState, useEffect, useRef } from 'react';

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function useCountUp(end: number, duration: number = 2000, inView: boolean = true): number {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const hasAnimatedRef = useRef(false);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView || hasAnimatedRef.current) return;

    const animate = (time: number) => {
      if (startTimeRef.current === null) startTimeRef.current = time;
      
      const elapsed = time - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      const currentCount = Math.floor(easeOutCubic(progress) * end);
      setCount(currentCount);

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
        hasAnimatedRef.current = true;
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [end, duration, inView]);

  return count;
}
