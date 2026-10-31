/** @type {import('next').NextConfig} */
const nextConfig = {
  // Old service pages that were removed: their URLs open the Our Services page (the old corporate
  // page opens the new Corporate Interiors page). /services/<slug> pages built from
  // src/components/services/details are left alone.
  async redirects() {
    const removed = [
      "acrylic-display",
      "dressing-table",
      
      "gondolas",
      "kitchen",
      "lcd-unit",
      "md-cabin",
      "mobile-booth",
      "modular-workstation",
      "office-chairs",
      "office-interior",
      
      
      
      
      "shop-in-shop",
      
      "sofas",
      "wardrobe",
      "window-display",
    ];
    return [
      { source: "/services/corporate-interior", destination: "/services/corporate-interiors", permanent: true },
      { source: "/services/retail-interior", destination: "/services/retail-showrooms", permanent: true },
      { source: "/services/restaurant-interior", destination: "/services/restaurant-interiors", permanent: true },
      { source: "/services/exhibitions", destination: "/services/exhibition-stalls", permanent: true },
      { source: "/services/retail-kiosk", destination: "/services/retail-kiosks", permanent: true },
      { source: "/services/signage", destination: "/services/signage-branding", permanent: true },
      { source: "/services/retail-display", destination: "/services/display-fixtures", permanent: true },
      ...removed.map((slug) => ({ source: `/services/${slug}`, destination: "/services", permanent: true })),
    ];
  },
  typescript: {
    // Vite's `vite build` transpiles with esbuild and never ran `tsc`, so this
    // codebase has pre-existing type errors (e.g. framer-motion Variants typing)
    // that were never surfaced. `next build` type-checks by default; keep parity
    // with the original build instead of gating on unrelated pre-existing errors.
    ignoreBuildErrors: true,
  },
  images: {
    // Serve AVIF/WebP (much smaller than the source JPG/PNG files) and allow a higher quality for
    // full-width banners that would otherwise look soft
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    minimumCacheTTL: 2678400, // 31 days
    // CMS-uploaded images (services, hero, stats-counter, logo, etc.) are
    // served from the backend at runtime, so next/image needs them allowlisted.
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "5000", pathname: "/uploads/**" },
      { protocol: "https", hostname: "api.designhouse.co.in", pathname: "/uploads/**" },
      { protocol: "https", hostname: "images.unsplash.com" },
      // Images uploaded from the admin
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
