"use client";

import type { ReactNode } from "react";

import useStaggerReveal from "./useStaggerReveal";

/* The list of "What We Offer" cards, bringing each card in as it scrolls into view. Cards that come into view
   together follow one another. Each card tilts up out of depth and comes into focus, its photo opens from the top,
   the orange arc draws itself, the icon spins in, then the title, text and link rise in turn, and a soft shine
   crosses the photo. Runs once. Nothing moves for people who ask for reduced motion, and without JavaScript the
   cards simply show. The parts it moves carry the co-* classes (see CorporateOffer). */
const CSS = `
.co-list[data-reveal="ready"] > li:not([data-in]) { opacity: 0; }
.co-list[data-reveal="ready"] > li:not([data-in]) :is(.co-photo, .co-icon, .co-rise) { opacity: 0; }
.co-list[data-reveal="ready"] > li:not([data-in]) .co-arc { stroke-dashoffset: 1; }

.co-list > li[data-in] {
  animation: co-card 1s cubic-bezier(0.22, 1, 0.36, 1) var(--reveal-delay, 0ms) both;
  transform-origin: 50% 100%;
}
.co-list > li[data-in] .co-photo {
  animation: co-photo 1.1s cubic-bezier(0.65, 0, 0.35, 1) calc(var(--reveal-delay, 0ms) + 120ms) both;
}
.co-list > li[data-in] .co-arc {
  stroke-dasharray: 1;
  animation: co-arc 0.9s cubic-bezier(0.65, 0, 0.35, 1) calc(var(--reveal-delay, 0ms) + 450ms) both;
}
.co-list > li[data-in] .co-icon {
  animation: co-icon 0.75s cubic-bezier(0.34, 1.56, 0.64, 1) calc(var(--reveal-delay, 0ms) + 650ms) both;
}
.co-list > li[data-in] .co-rise {
  animation: co-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--reveal-delay, 0ms) + 700ms + var(--co-step, 0) * 90ms) both;
}
.co-list > li[data-in] .co-shine::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(115deg, transparent 30%, rgba(255, 255, 255, 0.55) 50%, transparent 70%);
  transform: translateX(-120%);
  animation: co-shine 1.2s ease-out calc(var(--reveal-delay, 0ms) + 1000ms) both;
}

@keyframes co-card {
  0% { opacity: 0; transform: perspective(1100px) translateY(80px) rotateX(24deg) scale(0.9); filter: blur(10px); }
  55% { opacity: 1; filter: blur(0); }
  100% { opacity: 1; transform: perspective(1100px) translateY(0) rotateX(0) scale(1); filter: blur(0); }
}
@keyframes co-photo {
  0% { opacity: 1; clip-path: inset(0 0 100% 0); scale: 1.3; }
  100% { opacity: 1; clip-path: inset(0 0 0 0); scale: 1; }
}
@keyframes co-arc {
  from { stroke-dashoffset: 1; }
  to { stroke-dashoffset: 0; }
}
@keyframes co-icon {
  0% { opacity: 0; scale: 0; rotate: -140deg; }
  100% { opacity: 1; scale: 1; rotate: 0deg; }
}
@keyframes co-rise {
  0% { opacity: 0; translate: 0 16px; filter: blur(4px); }
  100% { opacity: 1; translate: 0 0; filter: blur(0); }
}
@keyframes co-shine {
  to { transform: translateX(120%); }
}

@media (prefers-reduced-motion: reduce) {
  .co-list > li, .co-list > li * { animation: none !important; opacity: 1 !important; stroke-dashoffset: 0 !important; }
}
`;

const OfferReveal = ({ className, children }: { className: string; children: ReactNode }) => {
  const list = useStaggerReveal<HTMLUListElement>();

  return (
    <>
      <style>{CSS}</style>
      <ul ref={list} className={`co-list ${className}`}>
        {children}
      </ul>
    </>
  );
};

export default OfferReveal;
