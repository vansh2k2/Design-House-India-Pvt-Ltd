import CorporateBanner from "./CorporateBanner";
import CorporateOverview from "./CorporateOverview";
import CorporateOffer from "./CorporateOffer";
import CorporateBenefits from "./CorporateBenefits";
import CorporateProcess from "./CorporateProcess";
import CorporateFeatured from "./CorporateFeatured";
import CorporateFaqs from "./CorporateFaqs";
import SectionSeparator from "../detail/SectionSeparator";
import type { ServiceDetail } from "../detail/types";
import type { CorporateDesign } from "./types";

/* Corporate Interiors page of its own design (between the navbar and the enquiry band): banner, overview,
   what we offer, why choose us, process, featured projects and FAQs, with a thin line between the sections after
   the banner and before the enquiry band, as on the Retail Showrooms page. */
const CorporatePage = ({ data, design }: { data: ServiceDetail; design: CorporateDesign }) => (
  <>
    <CorporateBanner hero={data.hero} banner={design.banner} />
    <CorporateOverview overview={design.overview} />
    <SectionSeparator />
    <CorporateOffer offer={design.offer} />
    <SectionSeparator />
    <CorporateBenefits benefits={design.benefits} />
    <SectionSeparator />
    <CorporateProcess process={design.process} />
    <SectionSeparator />
    <CorporateFeatured featured={design.featured} />
    <SectionSeparator />
    <CorporateFaqs faqs={data.faqs} image={design.faqPhoto} />
    <SectionSeparator />
  </>
);

export default CorporatePage;
