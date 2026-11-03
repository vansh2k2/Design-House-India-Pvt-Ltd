"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

import type { StaticImageData } from "next/image";

import blogsImg from "@/assets/banner/bloghome.webp";
import corporateImg from "@/assets/image/b2.webp";
import retailImg from "@/assets/image/b1.webp";
import exhibitionImg from "@/assets/image/b4.webp";
import restaurantImg from "@/assets/image/b3.webp";

interface Blog {
  title: string;
  excerpt: string;
  image: StaticImageData;
  category: string;
  date: string;
}

const CATEGORIES = [
  "Corporate Interiors",
  "Retail Showrooms",
  "Restaurant Interiors",
  "Exhibition Stalls",
  "Kiosks",
  "Signage & Branding",
  "Design Trends",
];

// Fixed articles shown on the home page; every card links to the Blogs page
const BLOGS: Blog[] = [
  {
    title: "How Thoughtful Office Interiors Boost Productivity",
    excerpt: "Discover how well-designed workspaces enhance employee focus, collaboration and overall performance.",
    image: corporateImg,
    category: "Corporate Interiors",
    date: "2026-10-15",
  },
  {
    title: "Key Elements of a Successful Retail Showroom Design",
    excerpt: "From layout to lighting, explore what makes a retail space attractive, functional and sales-driven.",
    image: retailImg,
    category: "Retail Showrooms",
    date: "2026-09-28",
  },
  {
    title: "Tips for an Impactful Exhibition Stall Design",
    excerpt: "Learn how to create engaging exhibition spaces that attract visitors and strengthen brand presence.",
    image: exhibitionImg,
    category: "Exhibition Stalls",
    date: "2026-09-12",
  },
  {
    title: "Restaurant Interior Design Trends for 2026",
    excerpt: "Explore the latest design trends shaping modern dining spaces and elevating customer experiences.",
    image: restaurantImg,
    category: "Restaurant Interiors",
    date: "2026-09-05",
  },
];

const GAP = 16; // px between cards

// Tag colours on the card photo, one per category (falls back to blue)
const TAG_STYLES: Record<string, string> = {
  "Corporate Interiors": "bg-[#E8EFFC] text-[#134698]",
  "Retail Showrooms": "bg-[#FFEEE3] text-[#E0600F]",
  "Exhibition Stalls": "bg-[#E6F0FF] text-[#1D4ED8]",
  "Restaurant Interiors": "bg-[#EEF6E2] text-[#4D7A1F]",
};
const tagStyle = (category: string) => TAG_STYLES[category] ?? "bg-[#E8EFFC] text-[#134698]";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

// Cards visible at once: 1 on phones, 2 on tablets, 3 on laptops, 4 from xl
const usePerView = () => {
  const [perView, setPerView] = useState(4);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setPerView(w >= 1280 ? 4 : w >= 1024 ? 3 : w >= 768 ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return perView;
};

/* "Blogs": a dark section over the office lounge photo (darkened, deepest on the left). Heading +
   "View All Articles", glass category pills and a sliding row of frosted-glass blog cards with side
   arrows and dots. On xl+ a tagline sits at the bottom right, over the lit part of the photo. */
const OurBlogs = () => {
  const [category, setCategory] = useState("All");
  const [index, setIndex] = useState(0);
  const perView = usePerView();

  const shown = category === "All" ? BLOGS : BLOGS.filter((b) => b.category === category);
  const maxIndex = Math.max(0, shown.length - perView);
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);
  useEffect(() => {
    setIndex(0);
  }, [category]);

  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  const next = () => setIndex((i) => (i >= maxIndex ? 0 : i + 1));

  const cardWidth = `calc((100% - ${(perView - 1) * GAP}px) / ${perView})`;

  return (
    <section className="relative w-full overflow-hidden bg-[#070d18]">
      {/* ── Background: the dark lobby banner (lit lounge on the right), a little darker behind the text ── */}
      <Image
        src={blogsImg}
        alt=""
        fill
        placeholder="blur"
        sizes="100vw"
        className="object-cover object-right"
      />
      {/* Dark overlay: deepest behind the heading and cards, clearing towards the lit lounge on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050a12]/90 via-[#050a12]/65 via-55% to-transparent to-85%" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050a12]/55 via-transparent to-transparent" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-7 pb-5 lg:pb-6">
        {/* ── Tagline (xl+), bottom right over the lit part of the photo ── */}
        <div className="hidden xl:block absolute right-6 lg:right-8 bottom-8 w-[270px]">
          <p className="font-serif text-[30px] 2xl:text-[34px] leading-[1.12] text-white">
            Design Stories
            <br />
            from <span className="text-[#fd6e15]">Real Spaces</span>.
          </p>
          <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.2em] text-white/85 whitespace-nowrap">
            Ideas <span className="mx-2 text-white/50">|</span> Trends <span className="mx-2 text-white/50">|</span> Project Insights
          </p>
          <span className="block w-12 h-[3px] bg-[#fd6e15] rounded-full mt-3" />
        </div>

        <div className="xl:pr-[300px]">
          {/* ── Header ── */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 mb-5">
            <div className="max-w-[780px]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-[2.5px] bg-[#fd6e15] rounded-full inline-block" />
                <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-[#fd6e15]">Blogs</span>
              </div>
              <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-serif font-medium leading-[1.08] tracking-tight mb-2.5 text-white">
                Insights. Ideas. <span className="text-[#fd6e15]">Inspirations.</span>
              </h2>
              <p className="text-[13.5px] sm:text-[14.5px] text-white/80 leading-relaxed">
                Explore our latest insights on interior design, retail environments, exhibition spaces and branding
                <br className="hidden lg:block" /> to help you create spaces that perform and inspire.
              </p>
            </div>
            <Link
              href="/blogs"
              className="group self-start shrink-0 inline-flex items-center gap-2 rounded-lg bg-[#fd6e15] px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_8px_22px_-6px_rgba(253,110,21,0.6)] hover:bg-[#e05d0e] transition-colors"
            >
              View All Articles
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* ── Category pills ── */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
              {["All", ...CATEGORIES].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`px-4 py-2 rounded-lg border text-[12.5px] font-medium whitespace-nowrap backdrop-blur-sm transition-colors ${
                    category === c
                      ? "bg-[#fd6e15] border-[#fd6e15] text-white shadow-[0_6px_18px_-6px_rgba(253,110,21,0.6)]"
                      : "bg-white/[0.06] border-white/25 text-white/90 hover:bg-white/[0.12] hover:border-white/40"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

          {/* ── Cards, with arrows on either side ── */}
          <div className="relative">
            <div className="overflow-hidden -m-1.5 p-1.5">
              <div
                className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ gap: GAP, transform: `translateX(calc(-${index} * (100% + ${GAP}px) / ${perView}))` }}
              >
                {shown.length === 0 ? (
                  <p className="w-full py-16 text-center text-[13.5px] text-white/70">New articles in this category are coming soon.</p>
                ) : (
                  shown.map((blog, i) => (
                      // Cards rise and fade in one after another the first time the row scrolls into view
                      <m.article
                        key={blog.title}
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                        // Clean white glass: crisp white rim with a soft white glow, light frosted fill, bright top edge
                        className="group relative shrink-0 rounded-xl overflow-hidden border border-white/50 bg-gradient-to-b from-white/[0.14] to-white/[0.05] backdrop-blur-lg shadow-[0_0_20px_rgba(255,255,255,0.08),0_18px_40px_-14px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.55),inset_0_0_24px_rgba(255,255,255,0.06)] hover:border-white/70 transition-colors"
                        style={{ width: cardWidth }}
                      >
                        {/* Soft light from the top edge of the glass */}
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 rounded-xl bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_40%)]"
                        />
                        <Link href="/blogs" className="relative flex flex-col h-full p-2">
                          <div className="relative h-[130px] overflow-hidden rounded-lg">
                            <Image
                              src={blog.image}
                              alt={blog.title}
                              fill
                              placeholder="blur"
                              sizes="(min-width: 1280px) 18vw, (min-width: 768px) 33vw, 100vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className={`absolute top-2.5 left-2.5 rounded-full px-2.5 py-1 text-[10.5px] font-semibold ${tagStyle(blog.category)}`}>
                              {blog.category}
                            </span>
                          </div>
                          <div className="flex flex-col flex-1 px-1.5 pt-3 pb-1.5">
                            <p className="flex items-center gap-1.5 text-[11px] text-white/80 mb-1.5">
                              <CalendarDays className="w-3.5 h-3.5" />
                              {formatDate(blog.date)}
                            </p>
                            <h3 className="font-semibold text-[15px] leading-snug text-white line-clamp-2 mb-1.5 group-hover:text-[#fd6e15] transition-colors">
                              {blog.title}
                            </h3>
                            <p className="text-[12px] text-white/70 leading-relaxed line-clamp-3 mb-2.5">{blog.excerpt}</p>
                            <span className="mt-auto inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#fd6e15]">
                              Read More
                              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </span>
                          </div>
                        </Link>
                      </m.article>
                    ))
                )}
              </div>
            </div>

            {maxIndex > 0 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous articles"
                  className="absolute top-1/2 -translate-y-1/2 -left-3 sm:-left-5 w-10 h-10 rounded-full border border-white/25 bg-white/10 backdrop-blur-md text-white shadow-[0_6px_18px_rgba(0,0,0,0.35)] flex items-center justify-center hover:bg-[#fd6e15] hover:border-[#fd6e15] transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next articles"
                  className="absolute top-1/2 -translate-y-1/2 -right-3 sm:-right-5 w-10 h-10 rounded-full border border-white/25 bg-white/10 backdrop-blur-md text-white shadow-[0_6px_18px_rgba(0,0,0,0.35)] flex items-center justify-center hover:bg-[#fd6e15] hover:border-[#fd6e15] transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* ── Dots ── */}
          {maxIndex > 0 && (
            <div className="flex justify-center gap-0.5 mt-5">
              {Array.from({ length: maxIndex + 1 }, (_, d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setIndex(d)}
                  aria-label={`Go to slide ${d + 1}`}
                  className={`w-6 h-6 p-[7px] bg-clip-content rounded-full transition-colors ${d === index ? "bg-[#fd6e15]" : "bg-white/35 hover:bg-white/60"}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OurBlogs;
