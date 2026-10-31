import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HomeHero, WhatWeDo, OurAchievements, OurProjects, WhyChooseUs, Capabilities, Approach, FeaturedProjects, OurStrengths, OurClients, OurTestimonials, OurBlogs, OurFaqs, GetInTouch } from "@/components/home";
import { fetchPageSeo, buildMetadata, AdvancedSeoTags } from "@/lib/seo";
import { fetchHomeHero } from "@/lib/homeHero";
import { fetchHomeWhatWeDo } from "@/lib/homeWhatWeDo";
import { fetchHomeAchievements } from "@/lib/homeAchievements";
import { fetchHomeProjects } from "@/lib/homeProjects";
import { fetchHomeSection } from "@/lib/homeSections";

const Topbar = dynamic(() => import("@/components/layout/Topbar"));
const Navbar = dynamic(() => import("@/components/layout/Navbar"));
const Footer = dynamic(() => import("@/components/sections/Footer"));

const SectionPlaceholder = () => (
  <div className="min-h-[300px] bg-slate-50 animate-pulse" aria-hidden="true" />
);

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("/");
  return buildMetadata(seo);
}

export default async function Index() {
  const [seo, hero, whatWeDo, achievements, projects, whyChooseUs, capabilities, approach, featuredProjects, strengths, testimonials, faqs, getInTouch] = await Promise.all([
    fetchPageSeo("/"),
    fetchHomeHero(),
    fetchHomeWhatWeDo(),
    fetchHomeAchievements(),
    fetchHomeProjects(),
    fetchHomeSection("why-choose-us"),
    fetchHomeSection("capabilities"),
    fetchHomeSection("approach"),
    fetchHomeSection("featured-projects"),
    fetchHomeSection("strengths"),
    fetchHomeSection("testimonials"),
    fetchHomeSection("faqs"),
    fetchHomeSection("get-in-touch"),
  ]);

  return (
    <div className="min-h-screen bg-background">
      <AdvancedSeoTags seo={seo} />
      <Suspense fallback={null}>
        <Topbar />
      </Suspense>

      <Suspense fallback={null}>
        <Navbar />
      </Suspense>

      <main>
        <HomeHero data={hero} />
        <WhatWeDo data={whatWeDo} />
        <OurAchievements data={achievements} />
        <OurProjects data={projects} />
        <WhyChooseUs data={whyChooseUs} />
        <Capabilities data={capabilities} />
        <Approach data={approach} />
        <FeaturedProjects data={featuredProjects} />
        <OurStrengths data={strengths} />
        <OurClients />
        <OurTestimonials data={testimonials} />
        <OurBlogs />
        <OurFaqs data={faqs} />
        <GetInTouch data={getInTouch} />

        <Suspense fallback={<SectionPlaceholder />}><Footer showCta /></Suspense>
      </main>
    </div>
  );
}
