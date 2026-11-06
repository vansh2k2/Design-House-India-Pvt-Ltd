"use client";

import type { ReactNode } from "react";

import useStaggerReveal from "./useStaggerReveal";

/* The list of "Why Choose Us" cards, bringing each card in as it scrolls into view, one after another. On wide
   screens the left column swings in from the left, the middle one rises from below and the right column swings in
   from the right; on narrower screens they all rise. Each glass card comes into focus, then its gold swoosh draws
   from the corner, the orange glow lights up along its lower-right edge, the icon spins in, the divider grows and
   the title and text rise in turn. Runs once; nothing moves for people who ask for reduced motion. The parts it
   moves carry the bf-* classes (see CorporateBenefits). */
const CSS = `
.bf-list[data-reveal="ready"] > li:not([data-in]) { opacity: 0; }
.bf-list[data-reveal="ready"] > li:not([data-in]) :is(.bf-swoosh, .bf-glow, .bf-icon, .bf-divider, .bf-rise) { opacity: 0; }

.bf-list > li { --bf-x: 0px; --bf-ry: 0deg; }
@media (min-width: 1024px) {
  .bf-list > li:nth-child(3n + 1) { --bf-x: -90px; --bf-ry: 28deg; }
  .bf-list > li:nth-child(3n) { --bf-x: 90px; --bf-ry: -28deg; }
}

.bf-list > li[data-in] {
  animation: bf-card 1.05s cubic-bezier(0.22, 1, 0.36, 1) var(--reveal-delay, 0ms) both;
}
.bf-list > li[data-in] .bf-swoosh {
  animation: bf-swoosh 0.8s cubic-bezier(0.65, 0, 0.35, 1) calc(var(--reveal-delay, 0ms) + 380ms) both;
}
.bf-list > li[data-in] .bf-glow {
  animation: bf-glow 1s ease-out calc(var(--reveal-delay, 0ms) + 520ms) both;
}
.bf-list > li[data-in] .bf-icon {
  animation: bf-icon 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) calc(var(--reveal-delay, 0ms) + 420ms) both;
}
.bf-list > li[data-in] .bf-divider {
  animation: bf-divider 0.6s cubic-bezier(0.65, 0, 0.35, 1) calc(var(--reveal-delay, 0ms) + 600ms) both;
}
.bf-list > li[data-in] .bf-rise {
  animation: bf-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--reveal-delay, 0ms) + 680ms + var(--bf-step, 0) * 110ms) both;
}

@keyframes bf-card {
  0% { opacity: 0; transform: perspective(1200px) translate3d(var(--bf-x), 70px, 0) rotateY(var(--bf-ry)) rotateX(14deg) scale(0.86); filter: blur(12px); }
  60% { opacity: 1; filter: blur(0); }
  100% { opacity: 1; transform: perspective(1200px) translate3d(0, 0, 0) rotateY(0) rotateX(0) scale(1); filter: blur(0); }
}
@keyframes bf-swoosh {
  0% { opacity: 1; clip-path: inset(0 100% 100% 0); }
  100% { opacity: 1; clip-path: inset(0 0 0 0); }
}
@keyframes bf-glow {
  0% { opacity: 0; }
  45% { opacity: 1; filter: brightness(1.35); }
  100% { opacity: 1; filter: brightness(1); }
}
@keyframes bf-icon {
  0% { opacity: 0; scale: 0.2; rotate: -160deg; }
  100% { opacity: 1; scale: 1; rotate: 0deg; }
}
@keyframes bf-divider {
  0% { opacity: 1; scale: 1 0; }
  100% { opacity: 1; scale: 1 1; }
}
@keyframes bf-rise {
  0% { opacity: 0; translate: 0 14px; filter: blur(4px); }
  100% { opacity: 1; translate: 0 0; filter: blur(0); }
}

@media (prefers-reduced-motion: reduce) {
  .bf-list > li, .bf-list > li * { animation: none !important; opacity: 1 !important; }
}
`;

const BenefitsReveal = ({ className, children }: { className: string; children: ReactNode }) => {
  const list = useStaggerReveal<HTMLUListElement>(140);

  return (
    <>
      <style>{CSS}</style>
      <ul ref={list} className={`bf-list ${className}`}>
        {children}
      </ul>
    </>
  );
};

export default BenefitsReveal;
