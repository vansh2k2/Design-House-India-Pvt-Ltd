import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ChevronRight, Clock, Eye } from "lucide-react";

import heroBg from "@/assets/banner/blogsdetails.webp";
import { HERO_ACCENT_SHADOW, HERO_BANNER_CSS, HERO_DESC_SHADOW, HERO_TITLE_SHADOW } from "@/components/common/heroBannerEffects";
import type { ArticleDetail } from "../types";
import { formatDate, splitTitle } from "../utils";

// 1234 -> "1.2K"
const formatViews = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K` : String(n));

/* Banner: breadcrumb, category, two-colour title, excerpt and date / read time / views over the navy side
   of the office artwork; same entrance effects as the other inner-page banners. */
const BlogDetailHero = ({ article }: { article: ArticleDetail }) => {
  const title = splitTitle(article.title);

  return (
    <section className="hero-banner relative w-full bg-[#0A2050] pt-[56px] sm:pt-[68px]">
      <style>{HERO_BANNER_CSS}</style>
      <div className="relative min-h-[380px] lg:min-h-[420px] overflow-hidden flex items-center">
        <Image src={heroBg} alt="" fill priority placeholder="blur" sizes="100vw" className="object-cover object-left sm:object-center" />

        <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-[640px]">
            <nav aria-label="Breadcrumb" className="hb-blur-in flex items-center gap-1.5 text-[11.5px] text-white/80 mb-4" style={{ animationDelay: "0.1s" }}>
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              <Link href="/blogs" className="hover:text-white">Blogs</Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              <span className="text-white truncate">{article.title}</span>
            </nav>

            <div className="hb-blur-in flex items-center gap-3 mb-3" style={{ animationDelay: "0.15s" }}>
              <span className="w-8 h-[2px] bg-[#fd6e15]" />
              <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.25em] text-white">{article.category}</span>
            </div>

            <h1
              className="text-[28px] sm:text-[36px] lg:text-[42px] font-serif font-medium leading-[1.12] text-white mb-3 [perspective:800px]"
              style={{ textShadow: HERO_TITLE_SHADOW }}
            >
              <span className="block overflow-hidden">
                <span className="hb-title-line" style={{ animationDelay: "0.2s" }}>
                  {title.lead}{" "}
                  <span className="text-[#fd6e15]" style={{ textShadow: HERO_ACCENT_SHADOW }}>
                    {title.accent}
                  </span>
                </span>
              </span>
            </h1>

            <p
              className="hb-desc-in text-[13.5px] sm:text-[15px] text-white/90 leading-relaxed max-w-[520px] mb-5"
              style={{ animationDelay: "0.45s", textShadow: HERO_DESC_SHADOW }}
            >
              {article.excerpt}
            </p>

            <ul className="hb-blur-in flex flex-wrap items-center gap-x-6 gap-y-2 text-[12.5px] text-white" style={{ animationDelay: "0.6s" }}>
              <li className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-[#F39A3D]" />
                {formatDate(article.date)}
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F39A3D]" />
                {article.readTime} Min Read
              </li>
              {article.views !== undefined && (
                <li className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#F39A3D]" />
                  {formatViews(article.views)} Views
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailHero;
