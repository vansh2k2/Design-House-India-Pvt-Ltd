import CorporateBanner from "./CorporateBanner";
import CorporateOverview from "./CorporateOverview";
import CorporateOffer from "./CorporateOffer";
import CorporateBenefits from "./CorporateBenefits";
import CorporateProcess from "./CorporateProcess";
import CorporateFeatured from "./CorporateFeatured";
import CorporateFaqs from "./CorporateFaqs";
import type { ServiceDetail } from "../detail/types";
import type { CorporateDesign } from "./types";

/* Corporate Interiors page of its own design (between the navbar and the enquiry band): banner, overview,
   what we offer, why choose us, process, featured projects and FAQs. */
const CorporatePage = ({ data, design }: { data: ServiceDetail; design: CorporateDesign }) => (
  <>
    <CorporateBanner hero={data.hero} banner={design.banner} />
    <CorporateOverview overview={design.overview} />
    <CorporateOffer offer={design.offer} />
    <CorporateBenefits benefits={design.benefits} />
    <CorporateProcess process={design.process} />
    <CorporateFeatured featured={design.featured} />
    <CorporateFaqs faqs={data.faqs} image={design.faqPhoto} />
  </>
);

export default CorporatePage;
