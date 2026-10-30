import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import ProjectCta from "@/components/common/ProjectCta";

import ServicesHero from "./ServicesHero";
import ServicesIntro from "./ServicesIntro";
import ServicesGrid from "./ServicesGrid";

/* Our Services page: banner, "From Concept to Completion" intro, the service cards, an enquiry band and
   the footer (with its "Let's Build Together" band). */
const ServicesPage = () => (
  <div className="min-h-screen bg-white flex flex-col">
    <Topbar />
    <Navbar />

    <main className="flex-1">
      <ServicesHero />
      <ServicesIntro />
      <ServicesGrid />
      <ProjectCta
        narrow
        eyebrow="Let's Build Together"
        title={
          <>
            Let&apos;s Discuss <span className="text-[#E8A64C]">Your Project</span>
          </>
        }
        subtitle="Get in touch with our team for a customized solution."
      />
    </main>

    <Footer showCta />
  </div>
);

export default ServicesPage;
