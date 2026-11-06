import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import CardImageBadge from "./CardImageBadge";
import Eyebrow from "./Eyebrow";
import { HOME, HomeEyebrow } from "./homeLook";
import type { ServiceDetail } from "./types";

type Projects = ServiceDetail["projects"];

const COLUMNS: Record<number, string> = { 4: "lg:grid-cols-4", 5: "lg:grid-cols-5", 6: "lg:grid-cols-6" };

/* "Featured Projects" as cards: the heading with its text beside it, then a row of cards with the photo, an icon on it,
   the project's name and place, and an arrow. Same sizes and spacing as the other projects layout.
   look "home": the home page's heading and colours, and its cards' hover (the card lifts, the title turns orange). */
const ServiceProjectCards = ({ projects, look }: { projects: Projects; look?: ServiceDetail["look"] }) => {
  const home = look === "home";
  return (
    <section id="products" className="w-full scroll-mt-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-6">
        <div className="flex flex-col gap-3 mb-5 lg:flex-row lg:items-end lg:gap-8">
          <div className="shrink-0">
            {home ? <HomeEyebrow>{projects.eyebrow ?? "Featured Projects"}</HomeEyebrow> : <Eyebrow>{projects.eyebrow ?? "Featured Projects"}</Eyebrow>}
            <h2 className={home ? HOME.heading : "text-[28px] sm:text-[34px] lg:text-[38px] font-serif font-medium leading-[1.1] text-[#0A2B5E]"}>
              {projects.title}
              {projects.titleAccent && <span className={home ? HOME.accent : "text-[#F98A0C]"}> {projects.titleAccent}</span>}
            </h2>
          </div>
          {projects.text && (
            <p className={`lg:border-l lg:border-[#D9DEE7] lg:pl-8 lg:max-w-[560px] ${home ? HOME.body : "text-[13.5px] sm:text-[14.5px] text-[#333]"}`}>{projects.text}</p>
          )}
        </div>

        <ul className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ${COLUMNS[projects.items.length] ?? "lg:grid-cols-4"}`}>
          {projects.items.map(({ title, place, image, icon }) => (
            <li key={title}>
              <Link href="/portfolio" className={`group flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_4px_16px_rgba(10,43,94,0.12)] ${home ? HOME.card : ""}`}>
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    placeholder={typeof image !== "string" ? "blur" : undefined}
                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {icon && <CardImageBadge icon={icon} color={home ? HOME.orange : "#F98A0C"} />}
                </div>
                <div className="flex flex-1 items-center justify-between gap-2 px-4 py-3">
                  <div className="min-w-0">
                    <h3 className={home ? `${HOME.projectTitle} ${HOME.cardTitle}` : "text-[14.5px] font-bold text-[#0A2B5E] leading-snug transition-colors group-hover:text-[#D9963B]"}>{title}</h3>
                    <p className={home ? HOME.projectPlace : "text-[12.5px] text-[#5B6B82]"}>{place}</p>
                  </div>
                  <span className={`w-8 h-8 shrink-0 rounded-full text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5 ${home ? "bg-[#fd6e15]" : "bg-[#F98A0C]"}`}>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ServiceProjectCards;
