"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

import type { StaticImageData } from "next/image";

import blogsImg from "@/assets/image/blogs.webp";
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

/* "Blogs": heading + "View All Articles", category filter pills and a sliding row of blog cards with
   side arrows and dots. On xl+ an office photo fills the right edge (diagonal left side) with a navy
   overlay along its bottom carrying a tagline. */
const OurBlogs = () => {
  const [category, setCategory] = useState("All");
  const [index, setIndex] = useState(0);
  const perView = usePerView();

  const shown = category === "All" ? BLOGS : BLOGS.filter((b) => b.category === category);
  const maxIndex = Math.max(0, shown.length - perView);
  useEffect(() => setIndex((i) => Math.min(i, maxIndex)), [maxIndex]);
  useEffect(() => setIndex(0), [category]);

  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  const next = () => setIndex((i) => (i >= maxIndex ? 0 : i + 1));

  const cardWidth = `calc((100% - ${(perView - 1) * GAP}px) / ${perView})`;

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#F3F6FB] to-[#F8FAFD]">
      {/* ── Right photo (xl+): slanted left edge, navy overlay rising from the bottom with the tagline.
           Its width reaches from the viewport's right edge to just past the cards' right edge. ── */}
      <div
        className="hidden xl:block absolute top-0 bottom-0 right-0 [clip-path:polygon(29%_0,100%_0,100%_100%,0_100%)]"
        style={{ width: "calc((100vw - min(100vw, 1440px)) / 2 + 360px)" }}
      >
        <Image src={blogsImg} alt="" fill placeholder="blur" sizes="(min-width: 1280px) 60vw, 100vw" className="object-cover object-[70%_center]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2B5E] via-[#0A2B5E]/80 via-25% to-transparent to-55%" />
        <div className="absolute bottom-0 left-0 pl-[72px] pr-6 pb-8">
          <p className="font-serif text-[30px] 2xl:text-[34px] leading-[1.12] text-white">
            Design Stories
            <br />
            from <span className="text-[#fd6e15]">Real Spaces</span>.
          </p>
          <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.2em] text-white/85 whitespace-nowrap">
            Ideas <span className="mx-2 text-white/50">|</span> Trends <span className="mx-2 text-white/50">|</span> Project Insights
          </p>
        </div>
      </div>

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 lg:pt-5 pb-4 lg:pb-5">
        <div className="xl:pr-[300px]">
          {/* ── Header ── */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 mb-5">
            <div className="max-w-[780px]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-[2.5px] bg-[#fd6e15] rounded-full inline-block" />
                <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-[#fd6e15]">Blogs</span>
              </div>
              <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-serif font-medium leading-[1.08] tracking-tight mb-2.5 text-[#0A2B5E]">
                Insights. Ideas. <span className="text-[#fd6e15]">Inspirations.</span>
              </h2>
              <p className="text-[13.5px] sm:text-[14.5px] text-black leading-relaxed">
                Explore our latest insights on interior design, retail environments, exhibition spaces and branding
                <br className="hidden lg:block" /> to help you create spaces that perform and inspire.
              </p>
            </div>
            <Link
              href="/blogs"
              className="group self-start shrink-0 inline-flex items-center gap-2 rounded-md border-[1.5px] border-[#fd6e15] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#fd6e15] hover:bg-[#fd6e15] hover:text-white transition-colors"
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
                  className={`px-4 py-2 rounded-md border text-[12.5px] font-medium whitespace-nowrap transition-colors ${
                    category === c
                      ? "bg-[#fd6e15] border-[#fd6e15] text-white"
                      : "bg-white border-[#DCE3EE] text-[#1F2D44] hover:border-[#B9C8DD]"
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
                  <p className="w-full py-16 text-center text-[13.5px] text-[#46658C]">New articles in this category are coming soon.</p>
                ) : (
                  shown.map((blog, i) => (
                      // Cards rise and fade in one after another the first time the row scrolls into view
                      <m.article
                        key={blog.title}
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="group shrink-0 rounded-md bg-white overflow-hidden shadow-[rgba(0,0,0,0.1)_0px_1px_3px_0px,rgba(0,0,0,0.06)_0px_1px_2px_0px]"
                        style={{ width: cardWidth }}
                      >
                        <Link href="/blogs" className="flex flex-col h-full">
                          <div className="relative h-[130px] overflow-hidden">
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
                          <div className="flex flex-col flex-1 px-3.5 pt-3 pb-3.5">
                            <p className="flex items-center gap-1.5 text-[11px] text-[#46658C] mb-1.5">
                              <CalendarDays className="w-3.5 h-3.5" />
                              {formatDate(blog.date)}
                            </p>
                            <h3 className="font-serif font-semibold text-[15px] leading-snug text-[#0A2B5E] line-clamp-2 mb-1.5 group-hover:text-[#fd6e15] transition-colors">
                              {blog.title}
                            </h3>
                            <p className="text-[12px] text-[#5B6B82] leading-relaxed line-clamp-3 mb-2.5">{blog.excerpt}</p>
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
                  className="absolute top-1/2 -translate-y-1/2 -left-3 sm:-left-5 w-10 h-10 rounded-full bg-white text-[#0A2B5E] shadow-[0_4px_14px_rgba(10,43,94,0.18)] flex items-center justify-center hover:text-[#fd6e15] transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next articles"
                  className="absolute top-1/2 -translate-y-1/2 -right-3 sm:-right-5 w-10 h-10 rounded-full bg-white text-[#0A2B5E] shadow-[0_4px_14px_rgba(10,43,94,0.18)] flex items-center justify-center hover:text-[#fd6e15] transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* ── Dots ── */}
          {maxIndex > 0 && (
            <div className="flex justify-center gap-2 mt-5">
              {Array.from({ length: maxIndex + 1 }, (_, d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setIndex(d)}
                  aria-label={`Go to slide ${d + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${d === index ? "bg-[#fd6e15]" : "bg-[#D5DDEA] hover:bg-[#B9C8DD]"}`}
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
