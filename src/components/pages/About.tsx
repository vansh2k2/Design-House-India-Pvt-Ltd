import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutHighlights from "@/components/about/AboutHighlights";
import MdMessage from "@/components/about/MdMessage";
import OurStory from "@/components/about/OurStory";
import AboutApproach from "@/components/about/AboutApproach";
import OurValues from "@/components/about/OurValues";
import BrandsAssociates from "@/components/about/BrandsAssociates";
import AboutProjects from "@/components/about/AboutProjects";
import ProjectCta from "@/components/common/ProjectCta";

/* About Us page: hero, key facts, MD's message, story, approach, values, brands, projects and an
   enquiry band, between the site header and footer. */
const AboutPage = () => (
  <div className="min-h-screen bg-white flex flex-col">
    <Topbar />
    <Navbar />

    <main className="flex-1">
      <AboutHero />
      <AboutHighlights />
      <MdMessage />
      <OurStory />
      <AboutApproach />
      <OurValues />
      <BrandsAssociates />
      <AboutProjects />
      <ProjectCta />
    </main>

    <Footer />
  </div>
);

export default AboutPage;
