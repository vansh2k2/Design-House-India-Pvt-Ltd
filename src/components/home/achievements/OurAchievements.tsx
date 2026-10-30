"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { m, useScroll, useTransform } from "framer-motion";
import hero2Bg from "@/assets/banner/hero2.webp";
import s1Img from "@/assets/icon/s1.png";
import s2Img from "@/assets/icon/s2.png";
import s3Img from "@/assets/icon/s3.png";
import s4Img from "@/assets/icon/s4.png";

interface StatItem {
  id: string;
  end: number;
  suffix: string;
  label: string;
  sublabel: string;
  image: StaticImageData;
}

const STATS: StatItem[] = [
  {
    id: "experience",
    end: 21,
    suffix: "+",
    label: "Years Experience",
    sublabel: "Industry leadership since 2004",
    image: s4Img,
  },
  {
    id: "clients",
    end: 500,
    suffix: "+",
    label: "Happy Clients",
    sublabel: "Trusted partnerships nationwide",
    image: s3Img,
  },
  {
    id: "projects",
    end: 5000,
    suffix: "+",
    label: "Projects Completed",
    sublabel: "Delivering excellence every time",
    image: s2Img,
  },
  {
    id: "satisfaction",
    end: 98,
    suffix: "%",
    label: "Client Satisfaction",
    sublabel: "Quality, commitment and trust",
    image: s1Img,
  },
];

/* Smooth Animated Counter */
const AnimatedCounter = ({ end, suffix, isVisible }: { end: number; suffix: string; isVisible: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      return;
    }

    let start = 0;
    const duration = 3500; // ms
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth easeOutCubic curve
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeOut * end);

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(end);
      }
    };

    const frameId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(frameId);
  }, [isVisible, end]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const OurAchievements = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-driven left-to-right reveal for the top border
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.3"],
  });

  const borderScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#03152B] font-inter text-white pt-10 sm:pt-12 lg:pt-14 pb-5 sm:pb-6 lg:pb-8"
    >
      {/* ─── Background Photo: hero2 Reception with illuminated wall logo ─── */}
      <div className="absolute inset-0 z-0">
        <Image
          src={hero2Bg}
          alt="Design House India Corporate Office Reception"
          fill
          sizes="100vw"
          unoptimized
          className="object-cover object-right lg:object-[center_right] scale-110 -translate-x-[4%]"
          priority
        />
      </div>

      {/* Deep Navy Dark Gradient Overlay on the left (balanced width, fades out smoothly around 65%) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#021327] via-[#021327]/95 via-32% md:via-42% to-transparent to-65% pointer-events-none z-[1]" />
      
      {/* Blurred navy band behind the 4 cards; the blur and tint fade out towards the top */}
      <div
        className="absolute inset-x-0 bottom-0 h-[48%] backdrop-blur-md bg-gradient-to-t from-[#061A3D]/95 via-[#061A3D]/80 to-[#061A3D]/0 pointer-events-none z-[1]"
        style={{ maskImage: "linear-gradient(to top, black 55%, transparent)", WebkitMaskImage: "linear-gradient(to top, black 55%, transparent)" }}
      />
      
      {/* Subtle top border shadow for clean separation */}
      <m.div
        style={{ scaleX: borderScaleX }}
        className="absolute inset-x-0 top-0 h-1 origin-left bg-gradient-to-r from-[#fd6e15] via-[#134698] to-transparent opacity-80 z-[2]"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Top Row: Content on Left (Right side open so hero2 wall logo shines) ─── */}
        <div className="mb-8 sm:mb-10 max-w-[680px]">
          {/* Eyebrow with Orange Corner Accent matching reference */}
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-3.5 h-2 border-l-2 border-t-2 border-[#fd6e15]" />
            <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-white/90">
              OUR ACHIEVEMENTS
            </span>
          </div>

          {/* Heading in font-serif font-medium */}
          <h2 className="text-3xl sm:text-[36px] md:text-[40px] lg:text-[45px] xl:text-[48px] font-serif font-medium leading-[1.08] tracking-tight mb-3 sm:mb-4">
            <span className="text-white block">
              Numbers that Reflect
            </span>
            <span className="text-[#fd6e15] block">
              Your Trust in Us
            </span>
          </h2>

          {/* Description Paragraph */}
          <p className="text-[13.5px] sm:text-[14.5px] text-white/80 leading-relaxed font-normal max-w-[660px]">
            Over the years, we have delivered successful interior and exhibition <br className="hidden sm:inline" />
            solutions for leading brands across India. Our focus on quality, <br className="hidden sm:inline" />
            creativity and timely execution has helped us build long-term relationships.
          </p>
        </div>

        {/* ─── Bottom Row: 4 Glassmorphism Stat Cards ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {STATS.map(({ id, end, suffix, label, sublabel, image }, idx) => (
            <div
              key={id}
              className="group relative p-4 sm:p-5 rounded-lg sm:rounded-xl bg-[#082244]/65 hover:bg-[#0B2C59]/80 backdrop-blur-md border border-white/15 hover:border-[#fd6e15]/40 transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:-translate-y-1 flex items-center gap-3.5 sm:gap-4 overflow-hidden"
              style={{ transitionDelay: `${idx * 40}ms` }}
            >
              {/* Subtle Warm Accent Glow on Hover */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#fd6e15]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#fd6e15]/20 transition-all duration-500" />

              {/* 3D Circular Badge Image (s1-s4) */}
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_4px_14px_rgba(24,100,219,0.5)]">
                <Image
                  src={image}
                  alt={label}
                  width={56}
                  height={56}
                  unoptimized
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Number, Label & Subtitle */}
              <div className="min-w-0 flex-1">
                <div className="text-[26px] sm:text-[30px] xl:text-[32px] font-bold text-[#FF7A1F] leading-none mb-1">
                  <AnimatedCounter end={end} suffix={suffix} isVisible={isVisible} />
                </div>
                <div className="text-[13.5px] sm:text-[14.5px] font-medium text-white leading-tight mb-0.5 truncate">
                  {label}
                </div>
                <div className="text-[11px] sm:text-[11.5px] text-white/70 leading-snug font-normal line-clamp-1">
                  {sublabel}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurAchievements;
