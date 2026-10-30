import { Search } from "lucide-react";

/* Search box; filters the article list as you type. */
const BlogSearch = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
  <div className="rounded-md bg-white p-3 shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px]">
    <label className="relative block">
      <span className="sr-only">Search blogs</span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search blogs..."
        className="w-full rounded-md border border-[#DCE3EE] bg-white pl-3 pr-9 py-2.5 text-[13px] text-[#1F2D44] placeholder:text-[#8C9BAE] outline-none focus:border-[#134698] transition-colors"
      />
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0A2B5E] pointer-events-none" />
    </label>
  </div>
);

export default BlogSearch;
