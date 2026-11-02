"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

/* "Testimonials": heading with a "View All" button and prev/next arrows, then a sliding row of
   testimonial cards (text on the left, a project photo on the right) with dots below, and a
   video on the right from xl (below the cards on smaller screens).
   Testimonials come from the admin panel (/api/testimonials/active); hidden when there are none. */
// Heading: edited in the admin (Pages & CMS → Home → Testimonials); reviews: Testimonials Management
const OurTestimonials = ({ data = HOME_SECTION_DEFAULTS.testimonials }: { data?: TestimonialsHeadingContent }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const perView = usePerView();
  // Sections saved before the video was added have none: use the default one
  const video = data.video ?? HOME_SECTION_DEFAULTS.testimonials.video;
  const hasVideo = Boolean(video?.url);

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
      <div
        className={`relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 lg:pt-5 pb-3 lg:pb-4 grid gap-6 ${
          hasVideo ? "xl:grid-cols-[minmax(0,1fr)_240px]" : ""
        }`}
      >
        <div className="min-w-0">
        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-6">
          <div className="max-w-[780px]">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-[2.5px] bg-[#fd6e15] rounded-full inline-block" />
              <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-[#134698]">{data.eyebrow}</span>
            </div>
            <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-serif font-medium leading-[1.08] tracking-tight mb-2.5 text-[#0A2B5E]">
              {data.title} <span className="text-[#fd6e15]">{data.highlight}</span>
            </h2>
            <p className="text-[13.5px] sm:text-[14.5px] text-black leading-relaxed max-w-[640px]">
              {data.description}
            </p>
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
                  <div key={i} className="shrink-0 h-[230px] rounded-md bg-white animate-pulse shadow-[rgba(0,0,0,0.1)_0px_1px_3px_0px,rgba(0,0,0,0.06)_0px_1px_2px_0px]" style={{ width: cardWidth }} />
                ))
              : testimonials.map((t, i) => {
                  const subtitle = [t.role, t.company].filter(Boolean);
                  return (
                    <article
                      key={t._id}
                      className="shrink-0 rounded-md bg-white p-3 grid grid-cols-[1fr_44%] gap-3 shadow-[rgba(0,0,0,0.1)_0px_1px_3px_0px,rgba(0,0,0,0.06)_0px_1px_2px_0px]"
                      style={{ width: cardWidth }}
                    >
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-end gap-2 mb-2">
                          <Quote className="w-7 h-7 text-[#D9E1EC] fill-[#D9E1EC] rotate-180" strokeWidth={1} />
                          <div className="flex gap-0.5 mb-0.5" aria-label={`${t.rating || 5} out of 5 stars`}>
                            {Array.from({ length: t.rating || 5 }, (_, s) => (
                              <Star key={s} className="w-3.5 h-3.5 text-[#fd6e15] fill-[#fd6e15]" />
                            ))}
                          </div>
                        </div>

                        <p className="text-[12px] text-[#333] leading-[1.55] line-clamp-7 mb-3">&ldquo;{t.feedback}&rdquo;</p>

                        <div className="mt-auto pt-2.5 border-t border-[#E3E8F0] flex items-center gap-2.5">
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

                      <div className="relative min-h-[200px] rounded-md overflow-hidden">
                        {/* The review's own photo from the admin, or one of our project photos (in turn) */}
                        <Image
                          src={t.image || PHOTOS[i % PHOTOS.length]}
                          alt={t.image ? t.imageAlt || `${t.name} project` : ""}
                          fill
                          placeholder={t.image ? "empty" : "blur"}
                          sizes="(min-width: 1280px) 15vw, (min-width: 768px) 25vw, 45vw"
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
          <div className="flex justify-center gap-0.5 mt-3">
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

        {hasVideo && video && <TestimonialVideo video={video} />}
      </div>
    </section>
  );
};

export default OurTestimonials;
