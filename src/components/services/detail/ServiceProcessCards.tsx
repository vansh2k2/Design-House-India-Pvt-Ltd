import { Fragment } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import CardImageBadge from "./CardImageBadge";
import Eyebrow from "./Eyebrow";
import { HOME, HomeEyebrow } from "./homeLook";
import type { ServiceDetail } from "./types";

type Process = ServiceDetail["process"];

// Four to six steps are joined by arrows on wide screens, as in the other process layout
const COLUMNS: Record<number, string> = {
  4: "lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]",
  5: "lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr]",
  6: "lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr]",
};

/* "Our Process" as cards: a centred heading, then one card per step with its photo (an empty box until there is one),
   the step's number in the gold-ringed circle of the other process layout on the photo, its title and its text.
   Same sizes, spacing, arrows between the steps, and the projects cards' hover: the photo zooms, the title turns gold.
   look "home": the home page's heading and colours, and its cards' hover (the card lifts, the title turns orange). */
const ServiceProcessCards = ({ process, look }: { process: Process; look?: ServiceDetail["look"] }) => {
  const home = look === "home";
  return (
    <section className={`w-full ${process.tone === "warm" ? "bg-[#FBF5EE]" : "bg-white"}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-6">
        {home ? (
          <>
            <HomeEyebrow center orange>Our Process</HomeEyebrow>
            <h2 className={`text-center mb-2.5 ${HOME.heading}`}>
              {process.title}
              {process.titleAccent && <span className={HOME.accent}> {process.titleAccent}</span>}
            </h2>
            <p className={`text-center mb-5 ${HOME.body}`}>{process.text}</p>
          </>
        ) : (
          <>
            <div className="flex justify-center">
              <Eyebrow>Our Process</Eyebrow>
            </div>
            <h2 className="text-center text-[28px] sm:text-[34px] lg:text-[38px] font-serif font-medium leading-[1.1] text-[#0A2B5E] mb-2">
              {process.title}
              {process.titleAccent && <span className="text-[#F98A0C]"> {process.titleAccent}</span>}
            </h2>
            <p className="text-center text-[13.5px] sm:text-[14.5px] text-[#333] mb-5">{process.text}</p>
          </>
        )}

        <ol className={`grid grid-cols-1 sm:grid-cols-2 items-center gap-5 lg:gap-4 ${COLUMNS[process.steps.length] ?? "lg:grid-cols-4"}`}>
          {process.steps.map(({ title, text, image }, i) => (
            <Fragment key={title}>
              {i > 0 && COLUMNS[process.steps.length] && <ArrowRight className={`hidden lg:block w-5 h-5 ${home ? "text-[#fd6e15]/70" : "text-[#9AA6B8]"}`} aria-hidden="true" />}
              <li className={`group flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_4px_16px_rgba(10,43,94,0.12)] ${home ? HOME.card : ""}`}>
                <div className="relative aspect-[3/2] overflow-hidden bg-[#EEF1F5]">
                  {image && (
                    <Image
                      src={image}
                      alt={title}
                      fill
                      placeholder="blur"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <CardImageBadge color={home ? HOME.orange : "#F98A0C"} circleClassName={home ? "bg-[#FFF5EE] ring-2 ring-[#fd6e15]/50" : "bg-[#FFF8F0] ring-2 ring-[#E8A64C]/60"}>
                    <span className={`font-serif text-[20px] ${home ? "text-[#fd6e15]" : "text-[#D9963B]"}`}>{String(i + 1).padStart(2, "0")}</span>
                  </CardImageBadge>
                </div>
                <div className="px-4 pb-4 pt-1 text-center">
                  <h3 className={`mb-1 ${home ? `${HOME.stepTitle} ${HOME.cardTitle}` : "text-[14px] font-bold text-[#0A2B5E] leading-snug transition-colors group-hover:text-[#D9963B]"}`}>{title}</h3>
                  <p className={home ? HOME.stepText : "text-[12.5px] leading-snug text-[#5B6B82]"}>{text}</p>
                </div>
              </li>
            </Fragment>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ServiceProcessCards;
