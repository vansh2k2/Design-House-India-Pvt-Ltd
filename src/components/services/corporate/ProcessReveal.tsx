"use client";

import type { ReactNode } from "react";

import useStaggerReveal from "./useStaggerReveal";

/* The "Our Process" steps, coming in one by one, in the order of the process, as they scroll into view. Each card
   swings down from its top edge like a page turning towards you, its photo opens as a circle growing from the
   bottom, the step's icon drops onto the photo's edge with a bounce and a ring of light, the orange bar draws out
   from its middle and the title and text rise in turn. Runs once; nothing moves for people who ask for reduced
   motion, and without JavaScript the cards simply show. The parts it moves carry the pr-* classes (see
   CorporateProcess). */
const CSS = `
.pr-list[data-reveal="ready"] > li:not([data-in]) { opacity: 0; }
.pr-list[data-reveal="ready"] > li:not([data-in]) :is(.pr-photo, .pr-icon, .pr-bar, .pr-rise) { opacity: 0; }

.pr-list > li[data-in] {
  transform-origin: 50% 0;
  animation: pr-card 1.1s cubic-bezier(0.2, 0.9, 0.25, 1) var(--reveal-delay, 0ms) both;
}
.pr-list > li[data-in] .pr-photo {
  animation: pr-photo 1s cubic-bezier(0.65, 0, 0.35, 1) calc(var(--reveal-delay, 0ms) + 200ms) both;
}
.pr-list > li[data-in] .pr-photo img {
  animation: pr-zoom 1.6s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--reveal-delay, 0ms) + 200ms) both;
}
.pr-list > li[data-in] .pr-icon {
  animation: pr-icon 0.85s cubic-bezier(0.34, 1.56, 0.64, 1) calc(var(--reveal-delay, 0ms) + 650ms) both;
}
.pr-list > li[data-in] .pr-icon::after {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: 9999px;
  border: 2px solid #F28C1B;
  pointer-events: none;
  animation: pr-ring 0.9s ease-out calc(var(--reveal-delay, 0ms) + 900ms) both;
}
.pr-list > li[data-in] .pr-bar {
  animation: pr-bar 0.6s cubic-bezier(0.65, 0, 0.35, 1) calc(var(--reveal-delay, 0ms) + 850ms) both;
}
.pr-list > li[data-in] .pr-rise {
  animation: pr-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--reveal-delay, 0ms) + 780ms + var(--pr-step, 0) * 140ms) both;
}

@keyframes pr-card {
  0% { opacity: 0; transform: perspective(1000px) rotateX(-75deg) translateY(-20px) scale(0.92); filter: blur(6px); }
  50% { opacity: 1; filter: blur(0); }
  75% { transform: perspective(1000px) rotateX(6deg) translateY(0) scale(1); }
  100% { opacity: 1; transform: perspective(1000px) rotateX(0) translateY(0) scale(1); filter: blur(0); }
}
@keyframes pr-photo {
  0% { opacity: 1; clip-path: circle(0% at 50% 100%); }
  100% { opacity: 1; clip-path: circle(150% at 50% 100%); }
}
@keyframes pr-zoom {
  0% { scale: 1.35; }
  100% { scale: 1; }
}
@keyframes pr-icon {
  0% { opacity: 0; translate: 0 -70px; scale: 0.4; rotate: -90deg; }
  100% { opacity: 1; translate: 0 0; scale: 1; rotate: 0deg; }
}
@keyframes pr-ring {
  0% { opacity: 0.9; scale: 1; }
  100% { opacity: 0; scale: 1.7; }
}
@keyframes pr-bar {
  0% { opacity: 1; scale: 0 1; }
  100% { opacity: 1; scale: 1 1; }
}
@keyframes pr-rise {
  0% { opacity: 0; translate: 0 14px; filter: blur(4px); }
  100% { opacity: 1; translate: 0 0; filter: blur(0); }
}

@media (prefers-reduced-motion: reduce) {
  .pr-list > li, .pr-list > li *, .pr-list > li *::after { animation: none !important; opacity: 1 !important; }
}
`;

const ProcessReveal = ({ className, children }: { className: string; children: ReactNode }) => {
  const list = useStaggerReveal<HTMLOListElement>(160);

  return (
    <>
      <style>{CSS}</style>
      <ol ref={list} className={`pr-list ${className}`}>
        {children}
      </ol>
    </>
  );
};

export default ProcessReveal;
