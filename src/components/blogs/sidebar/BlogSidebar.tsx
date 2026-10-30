import BlogSearch from "./BlogSearch";
import NewsletterCard from "./NewsletterCard";
import PopularArticles from "./PopularArticles";
import QuoteCard from "./QuoteCard";
import TrendingTopics from "./TrendingTopics";
import type { ArticleItem } from "../types";

/* Right column of the blogs page: search, trending topics, popular articles, newsletter and quote. */
const BlogSidebar = ({
  search,
  onSearch,
  topics,
  popular,
}: {
  search: string;
  onSearch: (value: string) => void;
  topics: string[];
  popular: ArticleItem[];
}) => (
  <aside className="space-y-5 lg:mt-9">
    <BlogSearch value={search} onChange={onSearch} />
    <TrendingTopics topics={topics} onSelect={onSearch} />
    <PopularArticles items={popular} />
    <NewsletterCard />
    <QuoteCard />
  </aside>
);

export default BlogSidebar;
