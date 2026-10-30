import { ArrowLeft, ArrowRight } from "lucide-react";

import ArticleCard from "./ArticleCard";
import { ARTICLES_PER_PAGE } from "./constants";
import type { ArticleItem } from "./types";

/* "Latest Articles": 3-column card grid with numbered pagination below (always shown). */
const LatestArticles = ({ items, page, onPageChange }: { items: ArticleItem[]; page: number; onPageChange: (page: number) => void }) => {
  const pages = Math.max(1, Math.ceil(items.length / ARTICLES_PER_PAGE));
  const shown = items.slice((page - 1) * ARTICLES_PER_PAGE, page * ARTICLES_PER_PAGE);

  return (
    <section id="latest-articles" aria-labelledby="latest-articles-title" className="scroll-mt-28">
      <h2 id="latest-articles-title" className="border-l-[3px] border-[#fd6e15] pl-3 font-serif font-medium text-[24px] sm:text-[28px] text-[#0A2B5E] mb-5">
        Latest Articles
      </h2>

      {shown.length === 0 ? (
        <p className="py-16 text-center text-[13.5px] text-[#46658C]">No articles found. Try another category or search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {shown.map((item) => (
            <ArticleCard key={item.key} item={item} />
          ))}
        </div>
      )}

      {shown.length > 0 && (
        <nav aria-label="Pagination" className="flex items-center justify-center gap-2 mt-8">
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
            className="w-9 h-9 rounded-full border border-[#DCE3EE] text-[#46658C] flex items-center justify-center hover:border-[#E9902B] hover:text-[#E9902B] disabled:opacity-40 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => onPageChange(n)}
              aria-current={n === page ? "page" : undefined}
              className={`w-9 h-9 rounded-full text-[13px] font-semibold transition-colors ${
                n === page ? "bg-[#0A2B5E] text-white" : "text-[#1F2D44] hover:text-[#E9902B]"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page === pages}
            aria-label="Next page"
            className="w-9 h-9 rounded-full border border-[#E9902B] text-[#E9902B] flex items-center justify-center hover:bg-[#E9902B] hover:text-white disabled:opacity-40 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </nav>
      )}
    </section>
  );
};

export default LatestArticles;
