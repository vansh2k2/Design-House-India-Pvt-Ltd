"use client";

import { Fragment, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

import manuImg from "@/assets/image/manu.webp";
import { STATS, STEPS } from "./data";

/* Smooth Animated Counter on scroll */
function StatCounter({ value }: { value: string }) {
  const match = value.match(/^([\d,]+)(\+?.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [count, setCount] = useState(0);

  const numericValue = match ? parseInt(match[1].replace(/,/g, ""), 10) : null;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    if (!isInView || numericValue === null) return;

    let frameId: number;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // smooth easeOutCubic curve
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * numericValue));

      if (progress < 1) {
        frameId = requestAnimationFrame(update);
      } else {
        setCount(numericValue);
      }
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, numericValue]);

  if (numericValue === null) {
    return <span>{value}</span>;
  }

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* "Manufacturing & Execution Capabilities": heading and four stat tiles on the left, the factory
   photo on the right with a curved left edge, then the five process steps and a CTA below. */

const Capabilities = () => (
  <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#F7F9FC] to-white">
    {/* ── Top: copy + stats, and the curved factory photo ── */}
    <div className="relative">
      {/* lg+: photo fills the right half of the band; its left edge slants out to the right going
          down and rounds off into the bottom edge */}
      <div className="relative h-[240px] sm:h-[320px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[59%] lg:[clip-path:polygon(0_0,100%_0,100%_100%,17%_100%,15.4%_99.5%,13.9%_97.6%,12.6%_94.5%,11.5%_90.4%,10.6%_85.5%)]">
        <Image
          src={manuImg}
          alt="Design House in-house manufacturing facility with CNC machinery"
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 59vw, 100vw"
          className="object-cover object-[35%_center]"
        />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-8 lg:pt-7 lg:pb-3">
        <div className="lg:w-[46%] xl:w-[44%]">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-[2.5px] bg-[#fd6e15] rounded-full inline-block" />
            <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-[#fd6e15]">
              Manufacturing &amp; Execution Capabilities
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-medium leading-[1.08] tracking-tight mb-2.5">
            <span className="text-[#0A2B5E] block">Built In-House.</span>
            <span className="text-[#fd6e15] block">Delivered with Excellence.</span>
          </h2>
          <p className="text-[13.5px] sm:text-[14.5px] text-[#333] leading-relaxed max-w-[520px] mb-5">
            Our in-house manufacturing facilities, skilled workforce and advanced machinery ensure superior quality, efficient execution and complete control from design to installation.
          </p>

          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {STATS.map(({ icon: Icon, value, label }, i) => (
              <m.li
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center rounded-md bg-white shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px] px-2 py-3"
              >
                <Icon className="w-7 h-7 text-[#fd6e15] mb-1.5" strokeWidth={1.6} />
                <span className="text-[14px] font-bold text-[#0A2B5E] leading-tight">
                  <StatCounter value={value} />
                </span>
                <span className="text-[11px] text-[#46658C] leading-tight mt-0.5">{label}</span>
              </m.li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    {/* ── Process steps ── */}
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-5 lg:pt-6 pb-4 lg:pb-5">
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-3 lg:gap-2">
        {STEPS.map((step, i) => (
          <Fragment key={step.title}>
            {i > 0 && <ArrowRight className="hidden lg:block w-5 h-5 text-[#fd6e15]" aria-hidden="true" />}
            <m.li
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="h-full overflow-hidden rounded-md bg-white shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px]"
            >
              <div className="relative h-[110px] xl:h-[120px] overflow-hidden">
                <Image src={step.img} alt={step.title} fill placeholder="blur" sizes="(min-width: 1024px) 18vw, 50vw" className="object-cover" />
              </div>
              <div className="flex items-start gap-3 px-3 py-3">
                <span className="font-serif text-[28px] leading-none text-[#fd6e15] shrink-0 [font-variant-numeric:lining-nums]">{String(i + 1).padStart(2, "0")}</span>
                <div className="min-w-0">
                  <h3 className="text-[13px] font-semibold text-[#0A2B5E] leading-tight mb-1">{step.title}</h3>
                  <p className="text-[11.5px] text-[#46658C] leading-snug">{step.desc}</p>
                </div>
              </div>
            </m.li>
          </Fragment>
        ))}
      </ol>

      <div className="flex justify-center mt-5">
        <Link
          href="/about/infrastructure"
          className="group inline-flex items-center gap-2.5 rounded-[4px] bg-[#fd6e15] hover:bg-[#e05d0e] px-5 py-2.5 text-white text-[12.5px] font-semibold shadow-[0_6px_16px_rgba(253,110,21,0.3)] transition-colors"
        >
          Explore Our Capabilities
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  </section>
);

export default Capabilities;
