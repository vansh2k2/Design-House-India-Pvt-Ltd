import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import ProjectCta from "@/components/common/ProjectCta";

import ServiceHero from "./ServiceHero";
import ServiceWhy from "./ServiceWhy";
import ServiceProcess from "./ServiceProcess";
import ServiceProjects from "./ServiceProjects";
import ServiceIdealFor from "./ServiceIdealFor";
import ServiceFaqs from "./ServiceFaqs";
import type { ServiceDetail } from "./types";

/* A service's page (e.g. /services/corporate-interiors): banner with features, why choose us, process,
   featured projects, ideal for, FAQs, enquiry band and footer. Content comes from ../details. */
const ServiceDetailPage = ({ data }: { data: ServiceDetail }) => (
  <div className="min-h-screen bg-white flex flex-col">
    <Topbar />
    <Navbar />

    <main className="flex-1">
      <ServiceHero data={data} />
      <ServiceWhy data={data} />
      <ServiceProcess data={data} />
      <ServiceProjects data={data} />
      <ServiceIdealFor data={data} />
      <ServiceFaqs name={data.name} faqs={data.faqs} heading={data.faqHeading} numbered={data.faqStyle?.numbered} tone={data.faqStyle?.tone} />
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

    <Footer showCta />
  </div>
);

export default ServiceDetailPage;
