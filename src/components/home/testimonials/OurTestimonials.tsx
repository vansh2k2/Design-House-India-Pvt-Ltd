"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

import { api } from "@/lib/api";
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
}

// Testimonials have no photo of their own, so each card shows one of our project photos (in turn)
const PHOTOS = [b2Img, b1Img, b4Img, b5Img, b3Img, c2Img, c1Img, t4Img];

const GAP = 16; // px between cards (matches gap-4)
const AUTOPLAY_MS = 4000;

const initialsOf = (text: string) =>
  text
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

// Cards visible at once: 1 on phones, 2 on tablets/small laptops, 3 from xl
const usePerView = () => {
  const [perView, setPerView] = useState(3);
  useEffect(() => {
    const update = () => setPerView(window.innerWidth >= 1280 ? 3 : window.innerWidth >= 768 ? 2 : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return perView;
};

/* "Testimonials": heading with a "View All" button and prev/next arrows, then a sliding row of
   testimonial cards (text on the left, a project photo on the right) with dots below.
   Testimonials come from the admin panel (/api/testimonials/active); hidden when there are none. */
const OurTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const perView = usePerView();

  useEffect(() => {
    api
      .get("/api/testimonials/active")
      .then((res) => {
        if (res.data?.success && Array.isArray(res.data.testimonials)) setTestimonials(res.data.testimonials);
      })
      .catch((err) => console.error("Failed to fetch testimonials:", err))
      .finally(() => setLoading(false));
  }, []);

  const maxIndex = Math.max(0, testimonials.length - perView);
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  const next = () => setIndex((i) => (i >= maxIndex ? 0 : i + 1));

  // Autoplay: one card forward every AUTOPLAY_MS, wrapping to the start; restarts after any manual move
  useEffect(() => {
    if (maxIndex === 0) return;
    const id = setTimeout(() => setIndex((i) => (i >= maxIndex ? 0 : i + 1)), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, maxIndex]);

  if (!loading && testimonials.length === 0) return null;

  const cardWidth = `calc((100% - ${(perView - 1) * GAP}px) / ${perView})`;

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#F3F6FB] to-white">
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-7 lg:pt-8 pb-4 lg:pb-5">
        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-6">
          <div className="max-w-[780px]">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-[2.5px] bg-[#fd6e15] rounded-full inline-block" />
              <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-[#134698]">Testimonials</span>
            </div>
            <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-serif font-medium leading-[1.08] tracking-tight mb-2.5 text-[#0A2B5E]">
              What Our Clients <span className="text-[#fd6e15]">Say</span>
            </h2>
            <p className="text-[13.5px] sm:text-[14.5px] text-black leading-relaxed max-w-[640px]">
              Our clients trust us for our design expertise, quality execution and commitment to delivering spaces that
              make a difference.
            </p>
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            <Link
              href="/testimonials"
              className="group inline-flex items-center gap-2 rounded-md border-[1.5px] border-[#134698] px-5 py-2.5 text-[12.5px] font-bold uppercase tracking-wide text-[#134698] hover:bg-[#134698] hover:text-white transition-colors"
            >
              View All Testimonials
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={prev}
                disabled={maxIndex === 0}
                aria-label="Previous testimonials"
                className="w-11 h-11 rounded-full bg-[#E9EEF6] text-[#0A2B5E] flex items-center justify-center hover:bg-[#DCE4F0] disabled:opacity-40 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={next}
                disabled={maxIndex === 0}
                aria-label="Next testimonials"
                className="w-11 h-11 rounded-full bg-[#0A2B5E] text-white flex items-center justify-center hover:bg-[#134698] disabled:opacity-40 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Cards ── */}
        <div className="overflow-hidden -m-1.5 p-1.5">
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ gap: GAP, transform: `translateX(calc(-${index} * (100% + ${GAP}px) / ${perView}))` }}
          >
            {loading
              ? Array.from({ length: perView }, (_, i) => (
                  <div key={i} className="shrink-0 h-[280px] rounded-md bg-white animate-pulse shadow-[rgba(0,0,0,0.1)_0px_1px_3px_0px,rgba(0,0,0,0.06)_0px_1px_2px_0px]" style={{ width: cardWidth }} />
                ))
              : testimonials.map((t, i) => {
                  const subtitle = [t.role, t.company].filter(Boolean);
                  return (
                    <article
                      key={t._id}
                      className="shrink-0 rounded-md bg-white p-3.5 sm:p-4 grid grid-cols-[1fr_42%] gap-4 shadow-[rgba(0,0,0,0.1)_0px_1px_3px_0px,rgba(0,0,0,0.06)_0px_1px_2px_0px]"
                      style={{ width: cardWidth }}
                    >
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-end gap-3 mb-3">
                          <Quote className="w-9 h-9 text-[#D9E1EC] fill-[#D9E1EC] rotate-180" strokeWidth={1} />
                          <div className="flex gap-0.5 mb-0.5" aria-label={`${t.rating || 5} out of 5 stars`}>
                            {Array.from({ length: t.rating || 5 }, (_, s) => (
                              <Star key={s} className="w-4 h-4 text-[#fd6e15] fill-[#fd6e15]" />
                            ))}
                          </div>
                        </div>

                        <p className="text-[13px] text-[#333] leading-relaxed line-clamp-8 mb-4">&ldquo;{t.feedback}&rdquo;</p>

                        <div className="mt-auto pt-3 border-t border-[#E3E8F0] flex items-center gap-3">
                          <span className="w-11 h-11 shrink-0 rounded-full bg-[#EEF3FB] text-[#134698] text-[14px] font-bold flex items-center justify-center">
                            {initialsOf(t.company || t.name)}
                          </span>
                          <span className="w-px self-stretch bg-[#E3E8F0]" />
                          <div className="min-w-0">
                            <p className="text-[13.5px] font-bold text-[#0A2B5E] leading-tight truncate">{t.name}</p>
                            {subtitle.map((line) => (
                              <p key={line} className="text-[11.5px] text-[#46658C] leading-snug truncate">
                                {line}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="relative min-h-[240px] rounded-md overflow-hidden">
                        <Image
                          src={PHOTOS[i % PHOTOS.length]}
                          alt=""
                          fill
                          placeholder="blur"
                          sizes="(min-width: 1280px) 40vw, 80vw"
                          className="object-cover"
                        />
                      </div>
                    </article>
                  );
                })}
          </div>
        </div>

        {/* ── Dots ── */}
        {maxIndex > 0 && (
          <div className="flex justify-center gap-0.5 mt-6">
            {Array.from({ length: maxIndex + 1 }, (_, d) => (
              <button
                key={d}
                type="button"
                onClick={() => setIndex(d)}
                aria-label={`Go to slide ${d + 1}`}
                className={`w-6 h-6 p-[7px] bg-clip-content rounded-full transition-colors ${d === index ? "bg-[#fd6e15]" : "bg-[#D5DDEA] hover:bg-[#B9C8DD]"}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OurTestimonials;
