"use client";

import Image, { type StaticImageData } from "next/image";
import { m } from "framer-motion";

import showroomImg from "@/assets/image/AB3.png";
import iconCorporate from "@/assets/icon/ah1.png";
import iconRetail from "@/assets/icon/ah2.png";
import iconExhibition from "@/assets/icon/ah3.png";
import iconKiosk from "@/assets/icon/ah4.png";
import iconFitOut from "@/assets/icon/ah5.png";
import iconSignage from "@/assets/icon/ah6.png";
import iconExpertise from "@/assets/icon/ha1.png";
import iconMultiSector from "@/assets/icon/ha2.png";
import iconPresence from "@/assets/icon/ha3.png";
import iconTeam from "@/assets/icon/ha4.png";

const SERVICES: { icon: StaticImageData; label: [string, string] }[] = [
  { icon: iconCorporate, label: ["Corporate", "Office Interiors"] },
  { icon: iconRetail, label: ["Luxury Retail", "Showrooms"] },
  { icon: iconExhibition, label: ["Turnkey", "Exhibition Stalls"] },
  { icon: iconKiosk, label: ["Customized", "Kiosks"] },
  { icon: iconFitOut, label: ["Commercial", "Fit-Outs"] },
  { icon: iconSignage, label: ["Architectural", "Signage"] },
];

const STRENGTHS: { icon: StaticImageData; title: string; text: string }[] = [
  { icon: iconExpertise, title: "20+ Years of Expertise", text: "Proven experience in design, build and delivery" },
  { icon: iconMultiSector, title: "Multi-Sector Capability", text: "Interiors, retail, hospitality, exhibitions and experiential spaces" },
  { icon: iconPresence, title: "Operational Presence", text: "Delhi-NCR & Mumbai with pan-India project execution" },
  { icon: iconTeam, title: "Experienced Team", text: "A skilled, multidisciplinary team focused on quality and timelines" },
];

const Para = ({ children }: { children: React.ReactNode }) => (
  <p className="border-l-[3px] border-[#fd6e15] pl-3.5 text-[13.5px] sm:text-[14px] text-[#1F2D44] leading-relaxed">{children}</p>
);

const Strong = ({ children }: { children: React.ReactNode }) => <strong className="font-bold text-[#0A2B5E]">{children}</strong>;

/* "Who We Are": the company introduction (three paragraphs, each with an orange bar) beside a showroom
   photo (AB3: the photo already carries its rounded, slanted left edge and orange curve); below, a strip of the services and a navy band of key strengths. */
const WhoWeAre = () => (
  <section className="relative w-full overflow-hidden bg-white">
    <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-10 pb-0">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-8 lg:gap-10 items-center">
        {/* ── Text ── */}
        <div>
          <p className="text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.22em] text-[#0A2B5E]">Who We Are</p>
          <span className="block w-[110px] h-[3px] bg-[#fd6e15] rounded-full mt-2 mb-4" />
          <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-serif font-medium leading-[1.1] tracking-tight text-[#0A2B5E] mb-5">
            Pioneering Architectural Interiors &amp;
            <br />
            <span className="text-[#fd6e15]">Experiential Brand Spaces</span>
          </h2>
          <div className="flex flex-col gap-4">
            <Para>
              <Strong>Design House India Pvt. Ltd.</Strong> is a premier turnkey interior design, retail infrastructure, and
              exhibition stall design agency headquartered in Ghaziabad (NCR), India. We specialize in complete spatial
              transformations — delivering end-to-end solutions from conceptual design and 3D visualization to
              manufacturing and final on-site structural execution.
            </Para>
            <Para>
              Over the years, we have partnered with forward-thinking enterprises, retail brands, and industry leaders to
              build commercial environments that combine prestige, functionality, and brand impact. Our domain expertise
              encompasses{" "}
              <Strong>
                Corporate Office Interiors, Luxury Retail Showrooms, Turnkey Exhibition Stalls, Customized Kiosks, Commercial
                Fit-Outs, and Architectural Signage.
              </Strong>
            </Para>
            <Para>
              Powered by state-of-the-art in-house manufacturing facilities and a dedicated team of architects, interior
              designers, fabricators, and project managers, <Strong>Design House India Pvt. Ltd.</Strong> executes complex,
              multi-city commercial projects with uncompromised precision, speed, and quality standards across India.
            </Para>
          </div>
        </div>

        {/* ── Photo (its curved, slanted left edge and orange curve are part of the image) ── */}
        {/* lg+: the photo runs out to the page's right edge */}
        <div className="relative lg:mr-[calc(-1*((100vw_-_min(100vw,1440px))/2_+_2rem))]">
          {/* Reveal when it scrolls into view: a curtain opens from right to left, out of a blur, while the
              photo settles from a zoom; an orange light sweeps across at the curtain's edge. The trigger is
              this outer box (always visible), not the clipped layer inside it. */}
          <m.div
            className="relative aspect-[1629/965] lg:aspect-auto lg:h-[500px] lg:-translate-x-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <m.div
              className="absolute inset-0"
              variants={{
                hidden: { clipPath: "inset(0% 0% 0% 100%)", filter: "blur(8px)" },
                show: { clipPath: "inset(0% 0% 0% 0%)", filter: "blur(0px)", transition: { duration: 1.3, ease: [0.77, 0, 0.175, 1] } },
              }}
            >
              <m.div
                className="absolute inset-0"
                variants={{ hidden: { scale: 1.18 }, show: { scale: 1, transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] } } }}
              >
                <Image
                  src={showroomImg}
                  alt="Mattress and bedding showroom designed and built by Design House India"
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-contain object-right"
                />
              </m.div>
            </m.div>
            <m.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 w-[6px] bg-gradient-to-b from-transparent via-[#fd6e15] to-transparent shadow-[0_0_24px_6px_rgba(253,110,21,0.45)]"
              variants={{
                hidden: { right: "0%", opacity: 0 },
                show: {
                  right: "100%",
                  opacity: [0, 1, 1, 0],
                  transition: { duration: 1.3, ease: [0.77, 0, 0.175, 1], opacity: { duration: 1.3, times: [0, 0.1, 0.85, 1] } },
                },
              }}
            />
          </m.div>
        </div>
      </div>

      {/* ── Services ── */}
      <ul className="relative z-10 mt-2 lg:mt-0 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-4 rounded-xl border border-[#E6EBF2] bg-white px-4 py-4 shadow-[0_6px_22px_-12px_rgba(10,43,94,0.25)]">
        {SERVICES.map(({ icon, label }, i) => (
          <li key={label.join(" ")} className={`flex items-center gap-3 px-2 lg:px-4 ${i > 0 ? "lg:border-l lg:border-[#E3E8F0]" : ""}`}>
            <Image src={icon} alt="" width={36} height={36} className="w-9 h-9 shrink-0 object-contain" />
            <span className="text-[13px] font-semibold text-[#0A2B5E] leading-tight">
              {label[0]}
              <br />
              {label[1]}
            </span>
          </li>
        ))}
      </ul>

      {/* ── Key strengths ── */}
      <ul className="relative z-10 mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-5 rounded-2xl lg:rounded-full bg-[#0A2B5E] px-5 sm:px-6 lg:px-10 py-3 lg:py-2 shadow-[0_12px_30px_-14px_rgba(10,43,94,0.6)]">
        {STRENGTHS.map(({ icon, title, text }, i) => (
          <li
            key={title}
            // Each fact centred in its column; a short divider (not full height) before all but the first
            className={`relative flex items-center gap-3 lg:justify-center lg:px-4 ${
              i > 0
                ? "lg:before:content-[''] lg:before:absolute lg:before:left-0 lg:before:top-1/2 lg:before:-translate-y-1/2 lg:before:h-10 lg:before:w-px lg:before:bg-white/50"
                : ""
            }`}
          >
            <Image src={icon} alt="" width={40} height={40} className="w-9 h-9 lg:w-10 lg:h-10 shrink-0 object-contain" />
            <div>
              <p className="text-[14px] lg:text-[15px] font-semibold text-white leading-tight mb-0.5">{title}</p>
              <p className="text-[11.5px] lg:text-[12px] text-white/85 leading-snug max-w-[240px]">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>

    {/* Navy and orange wave along the bottom, full width */}
    <Image src="/curve.png" alt="" aria-hidden="true" width={2172} height={123} sizes="100vw" className="relative block w-full h-auto -mt-3 sm:-mt-5 lg:-mt-8" />
  </section>
);

export default WhoWeAre;
