"use client";

import { useEffect, useRef, useState } from "react";

/* Counts from 0 up to `end` (easeOutCubic) the first time it scrolls into view. */
const CountUp = ({ end, suffix = "", duration = 2200 }: { end: number; suffix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frameId = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const startTime = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * end));
          if (progress < 1) frameId = requestAnimationFrame(tick);
        };
        frameId = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString("en-US")}
      {suffix}
    </span>
  );
};

export default CountUp;
