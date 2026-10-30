import Image from "next/image";

import { PHOTOS } from "./data";
import { BODY, CONTAINER, CtaButton, HEADING, RuledBlock } from "./ui";

/* The background image is the whole band: cream sketched panel on the left, a gold diagonal, and the lounge photo on
   the right (the diagonal sits at about 38–48% across once the image is cropped to the band's height). The text stays
   on the cream panel. */
const DiverseSpaces = () => (
  <section className="relative overflow-hidden bg-[#FFF9EF]">
    <Image src={PHOTOS.diverseBanner} alt="" fill sizes="100vw" className="hidden lg:block object-cover" />

    <div className={`relative ${CONTAINER} py-8 sm:py-9 lg:py-0 lg:min-h-[300px] lg:flex lg:items-center`}>
      <div className="lg:w-[38%]">
        <RuledBlock className="mb-6">
          <h2 className={`${HEADING} mb-2.5`}>
            Diverse Spaces.
            <br />
            Endless <span className="text-[#fd6e15]">Possibilities</span>.
          </h2>
          <p className={`${BODY} max-w-[470px]`}>
            From corporate offices to retail environments, restaurants to residential spaces, we create environments that
            reflect your vision and deliver lasting impact.
          </p>
        </RuledBlock>
        <div className="pl-6 sm:pl-8">
          <CtaButton href="/contact">Start a Conversation</CtaButton>
        </div>
      </div>

      {/* Phones/tablets: just the photo part of the image */}
      <div className="lg:hidden relative aspect-[16/9] mt-8 rounded-md overflow-hidden">
        <Image src={PHOTOS.diverseBanner} alt="Lounge with a city view" fill sizes="100vw" className="object-cover object-[85%_center]" />
      </div>
    </div>
  </section>
);

export default DiverseSpaces;
