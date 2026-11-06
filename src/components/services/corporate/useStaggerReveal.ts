"use client";

import { useEffect, useRef } from "react";

/* For a list whose cards come in as they scroll into view: marks the list data-reveal="ready" (so its CSS can hide
   the cards until then), and each card data-in once it is in view. Cards that come into view together go one
   after another in their order on the page, each --reveal-delay (ms) after the one before. Does nothing for people
   who ask for reduced motion, and without JavaScript the cards simply show. */
const useStaggerReveal = <T extends HTMLElement>(step = 130) => {
  const list = useRef<T>(null);

  useEffect(() => {
    const el = list.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = [...el.querySelectorAll<HTMLElement>(":scope > li")];
    el.dataset.reveal = "ready";

    const observer = new IntersectionObserver(
      (entries) => {
        const coming = entries.filter((e) => e.isIntersecting).map((e) => e.target as HTMLElement);
        coming.sort((a, b) => cards.indexOf(a) - cards.indexOf(b));
        coming.forEach((card, i) => {
          card.style.setProperty("--reveal-delay", `${i * step}ms`);
          card.dataset.in = "";
          observer.unobserve(card);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [step]);

  return list;
};

export default useStaggerReveal;
