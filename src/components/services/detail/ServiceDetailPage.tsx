import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import ProjectCta from "@/components/common/ProjectCta";

import ServiceBannerHero from "./ServiceBannerHero";
import ServiceHero from "./ServiceHero";
import ServiceShowcaseHero from "./ServiceShowcaseHero";
import ServiceWhy from "./ServiceWhy";
import ServiceOffer from "./ServiceOffer";
import ServiceBenefits from "./ServiceBenefits";
import ServiceProcess from "./ServiceProcess";
import ServiceProcessCards from "./ServiceProcessCards";
import ServiceProjects from "./ServiceProjects";
import ServiceProjectCards from "./ServiceProjectCards";
import ServiceIdealFor from "./ServiceIdealFor";
import ServiceFaqs from "./ServiceFaqs";
import ServiceFaqsImage from "./ServiceFaqsImage";
import SectionSeparator from "./SectionSeparator";
import ResidentialPage from "../residential/ResidentialPage";
import CorporatePage from "../corporate/CorporatePage";
import type { ServiceDetail } from "./types";

/* A service's page (e.g. /services/corporate-interiors): banner with features, why choose us, process,
   featured projects, ideal for, FAQs, enquiry band and footer. Content comes from ../details. */
const ServiceDetailPage = ({ data }: { data: ServiceDetail }) => {
  const line = data.separators ? <SectionSeparator /> : null;
  return (
  <div className="min-h-screen bg-white flex flex-col">
    <Topbar />
    <Navbar />

    <main className="flex-1">
      {/* Residential Interiors has a page of its own design */}
      {data.slug === "residential-interiors" ? (
        <ResidentialPage data={data} />
      ) : data.corporate ? (
        /* So does Corporate Interiors (../corporate) */
        <CorporatePage data={data} design={data.corporate} />
      ) : (
        <>
          {data.hero.banner ? (
            <ServiceBannerHero hero={data.hero} banner={data.hero.banner} look={data.look} />
          ) : data.hero.showcase ? (
            <ServiceShowcaseHero hero={data.hero} showcase={data.hero.showcase} />
          ) : (
            <ServiceHero data={data} />
          )}
          <ServiceWhy data={data} />
          {data.offer && (
            <>
              {line}
              <ServiceOffer offer={data.offer} look={data.look} />
            </>
          )}
          {data.benefits && (
            <>
              {line}
              <ServiceBenefits benefits={data.benefits} look={data.look} />
            </>
          )}
          {line}
          {data.process.layout === "cards" ? <ServiceProcessCards process={data.process} look={data.look} /> : <ServiceProcess data={data} />}
          {line}
          {data.projects.layout === "cards" ? <ServiceProjectCards projects={data.projects} look={data.look} /> : <ServiceProjects data={data} />}
          {!data.hideIdealFor && (
            <>
              {line}
              <ServiceIdealFor data={data} />
            </>
          )}
          {line}
          {data.faqStyle?.image ? (
            <ServiceFaqsImage name={data.name} faqs={data.faqs} heading={data.faqHeading} numbered={data.faqStyle.numbered} image={data.faqStyle.image} textFrom={data.faqStyle.textFrom} compact={data.faqStyle.compact} look={data.look} />
          ) : (
            <ServiceFaqs name={data.name} faqs={data.faqs} heading={data.faqHeading} numbered={data.faqStyle?.numbered} tone={data.faqStyle?.tone} />
          )}
          {line}
        </>
      )}
      <ProjectCta
        narrow
        eyebrow={data.ctaEyebrow ?? "Let's Build Together"}
        title={
          <>
            {data.ctaTitle[0]} <span className="text-[#E8A64C]">{data.ctaTitle[1]}</span>
          </>
        }
        subtitle={data.ctaSubtitle ?? "Get in touch with our team for a customized solution."}
      />
    </main>

    <Footer />
  </div>
  );
};

export default ServiceDetailPage;
