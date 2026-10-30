import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HomeHero, WhatWeDo, OurAchievements, OurProjects, WhyChooseUs, Capabilities, Approach, FeaturedProjects, OurStrengths, OurClients, OurTestimonials, OurBlogs, OurFaqs, GetInTouch } from "@/components/home";
import { fetchPageSeo, buildMetadata, AdvancedSeoTags } from "@/lib/seo";

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
  const seo = await fetchPageSeo("/");

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
        <HomeHero />
        <WhatWeDo />
        <OurAchievements />
        <OurProjects />
        <WhyChooseUs />
        <Capabilities />
        <Approach />
        <FeaturedProjects />
        <OurStrengths />
        <OurClients />
        <OurTestimonials />
        <OurBlogs />
        <OurFaqs />
        <GetInTouch />

        <Suspense fallback={<SectionPlaceholder />}><Footer showCta /></Suspense>
      </main>
    </div>
  );
}
