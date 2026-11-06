/* A thin line between two sections, fading out at both ends, with a small orange diamond in its middle.
   A little white space above and below keeps it off the edges of photos and coloured sections. */
const SectionSeparator = () => (
  <div aria-hidden="true" className="w-full bg-white py-3">
    <div className="relative mx-auto h-[2px] max-w-[1400px] px-4 sm:px-6 lg:px-8">
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#0A2B5E] to-transparent" />
      <span className="absolute left-1/2 top-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#fd6e15] ring-4 ring-white" />
    </div>
  </div>
);

export default SectionSeparator;
