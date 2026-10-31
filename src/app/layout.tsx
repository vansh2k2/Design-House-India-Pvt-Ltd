import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/Providers";
import GlobalFooterScripts from "@/components/GlobalFooterScripts";
import { API_URL, fetchLocations } from "@/lib/api";
import { LocationsProvider } from "@/context/LocationsContext";
import { SocialLinksProvider } from "@/context/SocialLinksContext";
import { fetchSocialLinks, socialProfiles } from "@/lib/socialLinks";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.designhouse.co.in").replace(/\/+$/, "");

// Self-hosted: Turbopack's next/font/google breaks on Google's `/l/font?kit=…&skey=…` file URLs
const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  weight: "100 900",
  display: "swap",
});

const playfair = localFont({
  src: "../../node_modules/@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2",
  weight: "400 900",
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Design House India",
  verification: {
    google: "mqnOE06iopOGw64MqLF8dbJAkRgBtecavtI_1OKzlFQ",
  },
  icons: {
    icon: "/favicon.png",
  },
  manifest: "/site.webmanifest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [locations, socialLinks] = await Promise.all([fetchLocations(), fetchSocialLinks()]);

  // Tells search engines which social profiles belong to the company (Advanced SEO → Social Media Links)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Design House India Pvt. Ltd.",
    url: SITE_URL,
    logo: `${SITE_URL}/logotransparent.png`,
    // Only real outside profiles: no duplicates, and no links back to this website
    sameAs: [...new Set(socialProfiles(socialLinks).map((p) => p.url))].filter(
      (url) => !url.toLowerCase().includes(new URL(SITE_URL).hostname.replace(/^www\./, "")),
    ),
  };

  return (
    <html lang="en" className={`${inter.className} ${playfair.variable}`}>
      {/* Browser extensions (e.g. ColorZilla's cz-shortcut-listen) inject
          attributes on <body> before hydration; ignore those mismatches. */}
      <body suppressHydrationWarning>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c") }}
        />
        <LocationsProvider locations={locations}>
          <SocialLinksProvider links={socialLinks}>
            <Providers>{children}</Providers>
          </SocialLinksProvider>

          <GlobalFooterScripts />
        </LocationsProvider>
      </body>
    </html>
  );
}
