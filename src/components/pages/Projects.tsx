import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import ProjectsHero from "@/components/projects/ProjectsHero";
import ProjectsExplorer from "@/components/projects/ProjectsExplorer";
import DiverseSpaces from "@/components/projects/DiverseSpaces";
import OurImpact from "@/components/projects/OurImpact";
import OurProcess from "@/components/projects/OurProcess";
import ProjectsCta from "@/components/projects/ProjectsCta";

/* Projects page: hero, category filter, featured project, filterable project grid, impact figures, process and an
   enquiry band, between the site header and footer. */
const ProjectsPage = () => (
  <div className="min-h-screen bg-white flex flex-col">
    <Topbar />
    <Navbar />

    <main className="flex-1">
      <ProjectsHero />
      <ProjectsExplorer />
      <DiverseSpaces />
      <OurImpact />
      <OurProcess />
      <ProjectsCta />
    </main>

    <Footer />
  </div>
);

export default ProjectsPage;
