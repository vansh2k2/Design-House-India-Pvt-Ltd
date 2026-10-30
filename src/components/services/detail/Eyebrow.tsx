// Small gold-lined uppercase label above section headings
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2 mb-2">
    <span className="w-6 h-[2px] bg-[#E8A64C]" />
    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0A2B5E]">{children}</span>
  </div>
);

export default Eyebrow;
