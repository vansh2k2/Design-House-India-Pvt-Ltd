import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Eyebrow from "./Eyebrow";
import type { ServiceDetail } from "./types";

/* "Featured Projects": heading with "View All Projects" (gold button on a warm background, or a text link on
   white with an arrow on each card), then four project cards. */
const ServiceProjects = ({ data }: { data: ServiceDetail }) => {
  const { projects } = data;
  const textLink = projects.linkStyle === "text";
  const many = projects.items.length > 4; // six product cards in a row on lg

  return (
    <section id="products" className={`w-full scroll-mt-24 ${textLink ? "bg-white" : "bg-[#FBF5EE]"}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
          <div>
            <Eyebrow>{projects.eyebrow ?? "Featured Projects"}</Eyebrow>
            <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-serif font-medium leading-[1.1] text-[#0A2B5E]">{projects.title}</h2>
            {projects.text && <p className="text-[13.5px] sm:text-[14.5px] text-[#333] mt-2">{projects.text}</p>}
          </div>
          {textLink ? (
            <Link href="/portfolio" className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0A2B5E] hover:text-[#D9963B] transition-colors">
              {projects.linkLabel ?? "View All Projects"}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : (
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 rounded-md bg-[#D9963B] hover:bg-[#C4832D] px-5 py-2.5 text-white text-[13px] font-semibold transition-colors"
            >
              View All Projects
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>

        <ul className={`grid grid-cols-1 sm:grid-cols-2 ${many ? "md:grid-cols-3 lg:grid-cols-6 gap-4" : "lg:grid-cols-4 gap-5"}`}>
          {projects.items.map(({ title, place, image }) => (
            <li key={title}>
              <Link
                href="/portfolio"
                className={`group block ${textLink ? "rounded-md bg-white overflow-hidden shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px]" : ""}`}
              >
                <div className={`relative ${many ? "h-[150px]" : "h-[190px]"} overflow-hidden ${textLink ? "" : "rounded-md mb-3"}`}>
                  <Image
                    src={image}
                    alt={title}
                    fill
                    placeholder="blur"
                    sizes={many ? "(min-width: 1024px) 17vw, (min-width: 768px) 33vw, 50vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className={textLink ? `flex items-center justify-between ${many ? "gap-2 px-3" : "gap-3 px-4"} py-3` : ""}>
                  <div>
                    <h3 className={`${many ? "text-[13px] whitespace-nowrap" : "text-[14.5px]"} font-bold text-[#0A2B5E] leading-snug group-hover:text-[#D9963B] transition-colors`}>{title}</h3>
                    <p className="text-[12.5px] text-[#5B6B82]">{place}</p>
                  </div>
                  {textLink && (
                    <span className={`${many ? "w-7 h-7" : "w-8 h-8"} shrink-0 rounded-full bg-[#E8A64C] text-white flex items-center justify-center group-hover:bg-[#D9963B] transition-colors`}>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ServiceProjects;
