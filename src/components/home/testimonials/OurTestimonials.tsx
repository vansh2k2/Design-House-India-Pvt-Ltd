"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight, ChevronLeft, ChevronRight, Play, Quote, Star } from "lucide-react";

import { api } from "@/lib/api";
import { HOME_SECTION_DEFAULTS, type TestimonialsHeadingContent } from "@/lib/homeSections";
import b1Img from "@/assets/image/b1.webp";
import b2Img from "@/assets/image/b2.webp";
import b3Img from "@/assets/image/b3.webp";
import b4Img from "@/assets/image/b4.webp";
import b5Img from "@/assets/image/b5.webp";
import c1Img from "@/assets/image/c1.webp";
import c2Img from "@/assets/image/c2.webp";
import t4Img from "@/assets/image/t4.webp";

interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  company?: string;
  feedback: string;
  rating: number;
  image?: string; // card photo uploaded in the admin
  imageAlt?: string;
}

// Testimonials have no photo of their own, so each card shows one of our project photos (in turn)
const PHOTOS = [b2Img, b1Img, b4Img, b5Img, b3Img, c2Img, c1Img, t4Img];

// Seconds a card stays in the centre before the carousel turns to the next one
const AUTOPLAY_S = 3;

const initialsOf = (text: string) =>
  text
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/* ── Testimonial Card ──
   Layout: text on the left, project photo on the right (100% intact).
   When isFront is true, enables interactive 3D cursor tilt with dynamic spotlight. */
const TestimonialCard = ({
  t,
  photoIndex,
  isFront = true,
}: {
  t: Testimonial;
  photoIndex: number;
  isFront?: boolean;
}) => {
  const inner = useRef<HTMLDivElement>(null);
  const subtitle = [t.role, t.company].filter(Boolean);

  /* ── 3D interactive cursor tilt (only active on front card) ── */
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isFront) return;
    const el = inner.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, {
      rotationY: px * 10,
      rotationX: -py * 8,
      transformPerspective: 900,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  /* ── Elastic snapback on cursor leave ── */
  const onLeave = () => {
    if (!isFront || !inner.current) return;
    gsap.to(inner.current, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <div
      ref={inner}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group/card relative h-full rounded-md bg-white p-3 grid grid-cols-[1fr_44%] gap-3 border transition-[box-shadow,border-color] duration-500 will-change-transform ${
        isFront
          ? "border-[#fd6e15]/45 shadow-[0_26px_50px_-18px_rgba(10,43,94,0.45)]"
          : "border-[#E3E8F0]/80 shadow-[rgba(0,0,0,0.08)_0px_2px_6px_0px,rgba(0,0,0,0.04)_0px_0px_1px_0px]"
      }`}
    >
      {/* Spotlight that follows the cursor */}
      {isFront && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-md opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-10"
          style={{ background: "radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgba(253,110,21,0.12), transparent 65%)" }}
        />
      )}

      {/* Light sweep that crosses the card as it lands */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-md overflow-hidden z-20">
        <span
          data-anim="shine"
          className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent"
        />
      </span>

      {/* ── Text side ── */}
      <div className="relative flex flex-col min-w-0 z-0">
        <div className="flex items-end gap-2 mb-2">
          <Quote className="w-7 h-7 text-[#D9E1EC] fill-[#D9E1EC] rotate-180 shrink-0" strokeWidth={1} />
          <div className="flex gap-0.5 mb-0.5" aria-label={`${t.rating || 5} out of 5 stars`}>
            {Array.from({ length: t.rating || 5 }, (_, s) => (
              <Star key={s} data-anim="star" className="w-3.5 h-3.5 text-[#fd6e15] fill-[#fd6e15]" />
            ))}
          </div>
        </div>

        <p data-anim="quote" className="text-[12px] text-[#333] leading-[1.55] line-clamp-7 mb-3">
          &ldquo;{t.feedback}&rdquo;
        </p>

        <div data-anim="author" className="mt-auto pt-2.5 border-t border-[#E3E8F0] flex items-center gap-2.5">
          <span className="w-9 h-9 shrink-0 rounded-full bg-[#EEF3FB] text-[#134698] text-[12px] font-bold flex items-center justify-center">
            {initialsOf(t.company || t.name)}
          </span>
          <span className="w-px self-stretch bg-[#E3E8F0]" />
          <div className="min-w-0">
            <p className="text-[12.5px] font-bold text-[#0A2B5E] leading-tight truncate">{t.name}</p>
            {subtitle.map((line) => (
              <p key={line} className="text-[11px] text-[#46658C] leading-snug truncate">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* ── Image side ── */}
      <div data-anim="photo" className="relative min-h-[200px] rounded-md overflow-hidden bg-[#F3F6FB]">
        <div data-anim="photo-zoom" className="absolute inset-0">
          <Image
            src={t.image || PHOTOS[photoIndex % PHOTOS.length]}
            alt={t.image ? t.imageAlt || `${t.name} project` : ""}
            fill
            placeholder={t.image ? "empty" : "blur"}
            sizes="(min-width: 1280px) 15vw, (min-width: 768px) 25vw, 45vw"
            className="object-cover transition-transform duration-700 group-hover/card:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

type TestimonialsVideo = NonNullable<TestimonialsHeadingContent["video"]>;

// YouTube video id from a watch, share, embed or Shorts link
const youtubeId = (url: string) =>
  url.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/))([\w-]{11})/)?.[1];

// Tall video card beside the testimonials: the cover photo with a play button, replaced by the
// player on click (YouTube embed, or the browser's player for an .mp4 link)
const TestimonialVideo = ({ video }: { video: TestimonialsVideo }) => {
  const [playing, setPlaying] = useState(false);
  const ytId = youtubeId(video.url);

  return (
    <div className="relative w-full max-w-[320px] mx-auto xl:max-w-none aspect-[2/3] xl:aspect-auto xl:h-[390px] xl:self-center rounded-xl overflow-hidden bg-[#0A2B5E] ring-4 ring-white shadow-[0_14px_34px_-12px_rgba(10,43,94,0.45)]">
      {playing ? (
        ytId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&playsinline=1`}
            title={video.posterAlt || "Design House India video"}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <video src={video.url} poster={video.poster || undefined} controls autoPlay playsInline className="absolute inset-0 w-full h-full object-cover" />
        )
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label="Play video" className="group absolute inset-0 cursor-pointer">
          {video.poster && (
            <Image
              src={video.poster}
              alt={video.posterAlt || ""}
              fill
              sizes="(min-width: 1280px) 240px, 320px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/10" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-transform group-hover:scale-110">
            <Play className="w-7 h-7 ml-1 text-[#fd6e15] fill-[#fd6e15]" />
          </span>
        </button>
      )}
    </div>
  );
};

/* ── OurTestimonials Section ──
   3D coverflow carousel (GSAP): the active review sits large in the centre; two neighbours
   stand on each side, turned inwards and stepping back in depth, and the rest wait hidden behind them.
   Every AUTOPLAY_S seconds (or on the arrows, a progress bar or a click on a side card) the whole
   ring turns one step: every card glides to its new place in 3D at once, the new centre card's
   stars pop in one by one and a light sweep crosses it. When the section first scrolls into view
   the cards fan out from a stack in the middle. */
const OurTestimonials = ({ data = HOME_SECTION_DEFAULTS.testimonials }: { data?: TestimonialsHeadingContent }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);

  const video = data.video ?? HOME_SECTION_DEFAULTS.testimonials.video;
  const hasVideo = Boolean(video?.url);

  const n = testimonials.length;
  // The ring needs at least five cards (the centre one plus two on each side). With fewer reviews
  // the list goes round more than once, so both sides still show two cards.
  const RING_MIN = 5;
  const ring = n > 1 && n < RING_MIN ? Array.from({ length: Math.ceil(RING_MIN / n) * n }, (_, i) => testimonials[i % n]) : testimonials;
  const ringLen = ring.length;
  const current = n ? active % n : 0; // the review in the centre

  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const autoplay = useRef<gsap.core.Tween | null>(null);
  const entered = useRef(false);

  useEffect(() => {
    api
      .get("/api/testimonials/active")
      .then((res) => {
        if (res.data?.success && Array.isArray(res.data.testimonials)) setTestimonials(res.data.testimonials);
      })
      .catch((err) => console.error("Failed to fetch testimonials:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setActive(0);
  }, [ringLen]);

  // Signed distance of card i from the centre card, the short way round the ring
  const offsetOf = useCallback(
    (i: number) => {
      let off = (((i - active) % ringLen) + ringLen) % ringLen;
      if (off > ringLen / 2) off -= ringLen;
      return off;
    },
    [active, ringLen]
  );

  /* ── Place every card on the ring: "set" jumps, "move" glides, "enter" fans out from a stack ── */
  const layout = useCallback(
    (mode: "set" | "move" | "enter") => {
      const cards = cardRefs.current.slice(0, ringLen).filter((c): c is HTMLDivElement => Boolean(c));
      if (!cards.length) return;
      const w = cards[0].offsetWidth;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Side-card offsets. Cards keep their size; on a narrower stage (smaller laptops) the side cards
      // only move in as far as needed for the outer pair to stay inside the edge, still peeking out
      // from behind the inner pair. On wide stages these work out to the usual 0.62w / 1.08w.
      // (Outer edges after the 3D turn and perspective: inner ≈ 0.85x + 0.367w, outer ≈ 0.745x + 0.273w.)
      const stage = cards[0].parentElement?.offsetWidth ?? 0;
      let near = w * 0.62;
      let far = w * 1.08;
      if (stage >= 768) {
        far = Math.min(far, (stage / 2 - 8 - 0.273 * w) / 0.745);
        near = Math.min(near, (0.745 * far + 0.273 * w - 70 - 0.367 * w) / 0.85);
        near = Math.max(near, (0.133 * w + 100) / 0.85); // the inner card still shows beside the centre one
      }

      cards.forEach((card, i) => {
        const off = offsetOf(i);
        const a = Math.abs(off);
        // Two cards stand on each side of the centre one; anything further round waits hidden behind
        const target = {
          xPercent: -50,
          x: Math.sign(off) * [0, near, far, far + w * 0.22][Math.min(a, 3)],
          z: -a * 240,
          rotationY: -Math.sign(off) * [0, 34, 42, 46][Math.min(a, 3)],
          scale: [1, 0.86, 0.74, 0.66][Math.min(a, 3)],
          opacity: a >= 3 ? 0 : 1,
        };
        // Stacking and clickability switch at once; the card nearest the front is on top
        gsap.set(card, { zIndex: 50 - a, pointerEvents: a >= 3 ? "none" : "auto" });

        if (mode === "set" || reduce) {
          gsap.set(card, target);
        } else if (mode === "enter") {
          gsap.fromTo(
            card,
            { xPercent: -50, x: 0, z: -500, rotationY: 0, scale: 0.7, opacity: 0 },
            { ...target, duration: 1.3, delay: 0.15 + a * 0.15, ease: "expo.out", overwrite: "auto" }
          );
        } else {
          gsap.to(card, { ...target, duration: 0.95, ease: "power3.inOut", overwrite: "auto" });
        }
      });

      // New centre card: stars pop in one by one, then a light sweep crosses it
      const front = cards[active];
      if (!front || mode === "set" || reduce) return;
      const lead = mode === "enter" ? 0.7 : 0.45;
      gsap.fromTo(
        front.querySelectorAll('[data-anim="star"]'),
        { scale: 0, rotation: -140 },
        { scale: 1, rotation: 0, duration: 0.45, ease: "back.out(3)", stagger: 0.06, delay: lead, overwrite: "auto" }
      );
      gsap.fromTo(
        front.querySelectorAll('[data-anim="shine"]'),
        { xPercent: -100 },
        { xPercent: 420, duration: 1.1, ease: "power2.inOut", delay: lead + 0.1, overwrite: "auto" }
      );
    },
    [active, ringLen, offsetOf]
  );

  /* ── Section entrance: the cards fan out when the section scrolls into view ── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || n === 0 || inView) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setInView(true);
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [n, inView]);

  // Turn the ring whenever the centre card changes (before paint, so nothing jumps)
  useLayoutEffect(() => {
    if (!inView || n === 0) return;
    layout(entered.current ? "move" : "enter");
    entered.current = true;
  }, [active, inView, n, layout]);

  // Keep spacing right when the window is resized
  useEffect(() => {
    if (!inView) return;
    const onResize = () => layout("set");
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [inView, layout]);

  const goTo = (i: number) => n > 1 && setActive(((i % ringLen) + ringLen) % ringLen);
  // A progress bar: review d, the copy of it nearest the centre
  const goToReview = (d: number) => goTo(active - current + d);
  const prev = () => goTo(active - 1);
  const next = () => goTo(active + 1);

  // Autoplay: the centre card's bar fills, then the ring turns to the next card
  useEffect(() => {
    if (n < 2 || !inView) return;
    fillRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, { scaleX: i < current ? 1 : 0 });
    });
    const bar = fillRefs.current[current];
    if (!bar) return;
    const tween = gsap.fromTo(
      bar,
      { scaleX: 0 },
      { scaleX: 1, duration: AUTOPLAY_S, ease: "none", onComplete: () => setActive((a) => (a + 1) % ringLen) }
    );
    autoplay.current = tween;
    return () => {
      tween.kill();
    };
  }, [active, current, n, ringLen, inView]);

  useEffect(() => {
    const tween = autoplay.current;
    if (!tween) return;
    if (paused) tween.pause();
    else tween.resume();
  }, [paused, active]);

  if (!loading && n === 0) return null;

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-gradient-to-b from-[#F3F6FB] to-white">
      <div
        className={`relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 lg:pt-5 pb-5 lg:pb-6 grid gap-6 ${
          hasVideo ? "xl:grid-cols-[minmax(0,1fr)_240px]" : ""
        }`}
      >
        <div className="min-w-0">
          {/* ── Header ── */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-6">
            <div className="max-w-[780px]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-[2.5px] bg-[#fd6e15] rounded-full inline-block" />
                <span className="text-[12.5px] sm:text-[14px] font-bold uppercase tracking-[0.2em] text-[#134698]">{data.eyebrow}</span>
              </div>
              <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-serif font-medium leading-[1.08] tracking-tight mb-2.5 text-[#0A2B5E]">
                {data.title} <span className="text-[#fd6e15]">{data.highlight}</span>
              </h2>
              <p className="text-[13.5px] sm:text-[14.5px] text-black leading-relaxed max-w-[640px]">{data.description}</p>
            </div>

            <div className="flex items-center gap-4 lg:gap-6">
              {data.button?.label && (
                <Link
                  href={data.button.href || "/testimonials"}
                  className="group inline-flex items-center gap-2 rounded-md border-[1.5px] border-[#134698] px-4 py-2 text-[11.5px] font-bold uppercase tracking-wide text-[#134698] hover:bg-[#134698] hover:text-white transition-colors"
                >
                  {data.button.label}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={prev}
                  disabled={n < 2}
                  aria-label="Previous testimonial"
                  className="w-11 h-11 rounded-full bg-[#E9EEF6] text-[#0A2B5E] flex items-center justify-center hover:bg-[#DCE4F0] disabled:opacity-40 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  disabled={n < 2}
                  aria-label="Next testimonial"
                  className="w-11 h-11 rounded-full bg-[#0A2B5E] text-white flex items-center justify-center hover:bg-[#134698] disabled:opacity-40 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* ── Coverflow stage ── */}
          <div
            className="relative h-[270px] overflow-hidden [perspective:1400px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {loading ? (
              <div className="absolute left-1/2 top-3 -translate-x-1/2 w-[86vw] max-w-[480px] h-[244px] rounded-md bg-white animate-pulse shadow-[rgba(0,0,0,0.1)_0px_1px_3px_0px,rgba(0,0,0,0.06)_0px_1px_2px_0px]" />
            ) : (
              ring.map((t, i) => {
                const off = offsetOf(i);
                return (
                  <div
                    key={`${t._id}-${i}`}
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    onClick={() => off !== 0 && goTo(i)}
                    className={`absolute left-1/2 top-3 w-[86vw] max-w-[480px] h-[244px] will-change-transform ${off !== 0 ? "cursor-pointer" : ""}`}
                    style={inView ? undefined : { opacity: 0 }}
                  >
                    <TestimonialCard t={t} photoIndex={i % n} isFront={off === 0} />
                  </div>
                );
              })
            )}
          </div>

          {/* ── Progress: one bar per review; the centre one fills until the ring turns ── */}
          {n > 1 && (
            <div className="flex justify-center gap-2 mt-2">
              {testimonials.map((t, d) => (
                <button
                  key={t._id}
                  type="button"
                  onClick={() => d !== current && goToReview(d)}
                  aria-label={`Show testimonial ${d + 1}`}
                  aria-current={d === current}
                  className="py-2"
                >
                  <span className={`block h-[4px] rounded-full bg-[#D5DDEA] overflow-hidden transition-[width] duration-300 ${d === current ? "w-12" : "w-6"}`}>
                    <span
                      ref={(el) => {
                        fillRefs.current[d] = el;
                      }}
                      className="block h-full w-full origin-left scale-x-0 bg-[#fd6e15]"
                    />
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {hasVideo && video && <TestimonialVideo video={video} />}
      </div>
    </section>
  );
};

export default OurTestimonials;
