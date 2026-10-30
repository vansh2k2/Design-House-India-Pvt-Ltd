import SidebarCard from "./SidebarCard";

/* "#topic" chips; clicking one searches for it. */
const TrendingTopics = ({ topics, onSelect }: { topics: string[]; onSelect: (topic: string) => void }) => {
  if (topics.length === 0) return null;
  return (
    <SidebarCard title="Trending Topics">
      <ul className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <li key={topic}>
            <button
              type="button"
              onClick={() => onSelect(topic)}
              className="rounded-[4px] border border-[#F3D9C2] bg-[#FFF8F2] px-2.5 py-1 text-[11.5px] text-[#1F2D44] hover:border-[#E9902B] hover:text-[#E9902B] transition-colors"
            >
              #{topic}
            </button>
          </li>
        ))}
      </ul>
    </SidebarCard>
  );
};

export default TrendingTopics;
