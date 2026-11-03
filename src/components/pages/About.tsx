import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import AboutHero from "@/components/about/AboutHero";
import WhoWeAre from "@/components/about/WhoWeAre";
import OurStory from "@/components/about/OurStory";
import OperationalStrength from "@/components/about/OperationalStrength";
import ExpertTeam from "@/components/about/ExpertTeam";
import TeamExpertise from "@/components/about/TeamExpertise";
import PhilosophyValues from "@/components/about/PhilosophyValues";
import BusinessNetwork from "@/components/about/BusinessNetwork";
import ProjectCta from "@/components/common/ProjectCta";

/* About Us page: hero, who we are, story, operational strength, expert team, team expertise,
   philosophy & values, brands & associates and an enquiry band, between the site header and footer. */
const AboutPage = () => (
  <div className="min-h-screen bg-white flex flex-col">
    <Topbar />
    <Navbar />

    <main className="flex-1">
      <AboutHero />
      <WhoWeAre />
      <OurStory />
      <OperationalStrength />
      <ExpertTeam />
      <TeamExpertise />
      <PhilosophyValues />
      <BusinessNetwork />
      <ProjectCta />
    </main>

    <Footer />
  </div>
);

export default AboutPage;
