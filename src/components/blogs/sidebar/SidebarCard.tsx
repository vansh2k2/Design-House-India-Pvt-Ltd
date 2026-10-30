import type { ReactNode } from "react";

/* White sidebar box with an orange-barred serif heading. */
const SidebarCard = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="rounded-md bg-white p-4 shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px]">
    <h3 className="border-l-[3px] border-[#fd6e15] pl-2.5 font-serif font-medium text-[18px] text-[#0A2B5E] mb-3.5">{title}</h3>
    {children}
  </div>
);

export default SidebarCard;
