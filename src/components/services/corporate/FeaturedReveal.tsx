"use client";

import { useEffect, useRef, type ReactNode } from "react";

/* The featured project cards, pulling in from the left like a train as they scroll into view. Each row of cards is
   one train: the right-most card leads and the cards to its left follow close behind, so they run in with gaps
   that close up as the train brakes. Each card leans back on its bottom edge while it runs, lurches forward as it
   stops and settles; its round icon turns like a wheel on the way, then the orange bar draws out and the title and
   keywords slide in. Rows that come into view together follow one another. Runs once; nothing moves for people who
   ask for reduced motion, and without JavaScript the cards simply show. The parts it moves carry the cf-* classes
   (see CorporateFeatured). */
const CSS = `
.cf-list[data-reveal="ready"] > li:not([data-in]) { opacity: 0; }
.cf-list[data-reveal="ready"] > li:not([data-in]) :is(.cf-bar, .cf-rise) { opacity: 0; }

.cf-list > li[data-in] {
  transform-origin: 50% 100%;
  animation:
    cf-train 1.5s ease-in-out var(--reveal-delay, 0ms) both,
    cf-sway 1.5s ease-in-out var(--reveal-delay, 0ms) both;
}
.cf-list > li[data-in] .cf-wheel {
  animation: cf-wheel 1.5s ease-in-out var(--reveal-delay, 0ms) both;
}
.cf-list > li[data-in] .cf-bar {
  transform-origin: 0 50%;
  animation: cf-bar 0.6s cubic-bezier(0.65, 0, 0.35, 1) calc(var(--reveal-delay, 0ms) + 1050ms) both;
}
.cf-list > li[data-in] .cf-rise {
  animation: cf-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--reveal-delay, 0ms) + 950ms + var(--cf-step, 0) * 120ms) both;
}

@keyframes cf-train {
  0% { opacity: 0; translate: -110vw 0; filter: blur(5px); animation-timing-function: cubic-bezier(0.16, 0.84, 0.3, 1); }
  10% { opacity: 1; }
  65% { translate: 16px 0; filter: blur(0); }
  82% { translate: -5px 0; }
  100% { opacity: 1; translate: none; filter: none; }
}
@keyframes cf-sway {
  0% { transform: skewX(14deg); }
  45% { transform: skewX(6deg); }
  68% { transform: skewX(-7deg); }
  84% { transform: skewX(2.5deg); }
  100% { transform: none; }
}
@keyframes cf-wheel {
  0% { rotate: -600deg; animation-timing-function: cubic-bezier(0.16, 0.84, 0.3, 1); }
  65% { rotate: 20deg; }
  82% { rotate: -6deg; }
  100% { rotate: 0deg; }
}
@keyframes cf-bar {
  0% { opacity: 1; scale: 0 1; }
  100% { opacity: 1; scale: 1 1; }
}
@keyframes cf-rise {
  0% { opacity: 0; translate: -18px 0; filter: blur(4px); }
  100% { opacity: 1; translate: 0 0; filter: blur(0); }
}

@media (prefers-reduced-motion: reduce) {
  .cf-list > li, .cf-list > li * { animation: none !important; opacity: 1 !important; }
}
`;

// Delay between the cards of one train, and between trains (rows) that come into view together
const CAR = 90;
const ROW = 380;

const FeaturedReveal = ({ className, children }: { className: string; children: ReactNode }) => {
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = list.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = [...el.querySelectorAll<HTMLElement>(":scope > li")];
    el.dataset.reveal = "ready";

    const observer = new IntersectionObserver(
      (entries) => {
        // Cards coming in together, grouped by the row they sit in
        const rows = new Map<number, HTMLElement[]>();
        entries
          .filter((e) => e.isIntersecting)
          .forEach(({ target }) => {
            const card = target as HTMLElement;
            rows.set(card.offsetTop, [...(rows.get(card.offsetTop) ?? []), card]);
          });

        [...rows.keys()]
          .sort((a, b) => a - b)
          .forEach((top, r) => {
            rows
              .get(top)!
              .sort((a, b) => cards.indexOf(b) - cards.indexOf(a))
              .forEach((card, i) => {
                card.style.setProperty("--reveal-delay", `${r * ROW + i * CAR}ms`);
                card.dataset.in = "";
                observer.unobserve(card);
              });
          });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <ul ref={list} className={`cf-list ${className}`}>
        {children}
      </ul>
    </>
  );
};

export default FeaturedReveal;
