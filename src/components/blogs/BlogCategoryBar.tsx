import { BLOG_CATEGORIES } from "./constants";

/* Row of category tiles (icon + label); the active one is filled navy. */
const BlogCategoryBar = ({ active, onSelect }: { active: string; onSelect: (category: string) => void }) => (
  <section className="w-full bg-white border-b border-[#E8EDF4]">
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
      <ul className="flex lg:grid lg:grid-cols-8 gap-3 overflow-x-auto scrollbar-none">
        {BLOG_CATEGORIES.map(({ label, icon: Icon }) => {
          const isActive = active === label;
          return (
            <li key={label} className="shrink-0 w-[104px] lg:w-auto">
              <button
                type="button"
                onClick={() => onSelect(label)}
                aria-pressed={isActive}
                className="group w-full flex flex-col items-center gap-2 rounded-md bg-white px-2 pt-3 pb-2.5 shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px] hover:shadow-[0_6px_16px_-8px_rgba(10,43,94,0.35)] transition-shadow"
              >
                <span
                  className={`w-14 h-14 rounded-md flex items-center justify-center transition-colors ${
                    isActive ? "bg-[#0A2B5E] text-white" : "bg-[#FFF4EC] text-[#0A2B5E] group-hover:text-[#fd6e15]"
                  }`}
                >
                  <Icon className="w-6 h-6" strokeWidth={1.6} />
                </span>
                <span className={`text-[12px] font-semibold leading-tight text-center ${isActive ? "text-[#0A2B5E]" : "text-[#1F2D44]"}`}>
                  {label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

export default BlogCategoryBar;
