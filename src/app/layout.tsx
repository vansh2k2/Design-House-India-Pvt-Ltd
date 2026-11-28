import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import Providers from "@/components/Providers";
import GlobalFooterScripts from "@/components/GlobalFooterScripts";
import SiteAnalyticsTracker from "@/components/analytics/SiteAnalyticsTracker";
import HeadCode from "@/components/seo/HeadCode";
import { API_URL, fetchLocations, fetchAdvancedSeo } from "@/lib/api";
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
  const [locations, socialLinks, advancedSeo] = await Promise.all([
    fetchLocations(),
    fetchSocialLinks(),
    fetchAdvancedSeo(),
  ]);

  // Dynamic SEO & Analytics configuration directly from CMS database (falling back to env / default if empty or unreachable)
  const defaultGa4Id = (process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "G-YN241B64T9").trim();
  const configuredGa4Id = (
    advancedSeo?.ga4MeasurementId?.trim() ||
    advancedSeo?.advancedSeo?.ga4MeasurementId?.trim() ||
    defaultGa4Id
  ).trim();
  const ga4MeasurementId = /^G-[A-Z0-9]+$/i.test(configuredGa4Id) ? configuredGa4Id : undefined;

  const configuredGtmId = (
    advancedSeo !== null && advancedSeo !== undefined
      ? (advancedSeo.gtmContainerId ?? "")
      : (process.env.NEXT_PUBLIC_GTM_CONTAINER_ID || "")
  ).trim();
  const gtmContainerId = /^GTM-[A-Z0-9]+$/i.test(configuredGtmId) ? configuredGtmId : undefined;

  const gscVerification = (
    advancedSeo !== null && advancedSeo !== undefined
      ? (advancedSeo.googleSearchConsoleVerification ?? "")
      : (process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "mqnOE06iopOGw64MqLF8dbJAkRgBtecavtI_1OKzlFQ")
  ).trim();

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
      <head>
        {/* Google Tag Manager - in <head> */}
        {gtmContainerId && (
          <Script
            id="google-tag-manager"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmContainerId}');`,
            }}
          />
        )}

        {/* Google Analytics (gtag.js) - in <head> */}
        {ga4MeasurementId && (
          <>
            <Script
              id="google-analytics-src"
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ga4MeasurementId}', { send_page_view: true });`,
              }}
            />
          </>
        )}

        {/* Google Search Console Verification */}
        {gscVerification && (
          <meta name="google-site-verification" content={gscVerification} />
        )}
      </head>
      {/* Browser extensions (e.g. ColorZilla's cz-shortcut-listen) inject
          attributes on <body> before hydration; ignore those mismatches. */}
      <body suppressHydrationWarning>
        {advancedSeo?.headerScripts && <HeadCode code={advancedSeo.headerScripts} />}

        {/* Google Tag Manager (noscript) - immediately after opening <body> */}
        {gtmContainerId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmContainerId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c") }}
        />
        <LocationsProvider locations={locations}>
          <SocialLinksProvider links={socialLinks}>
            <Providers>{children}</Providers>
          </SocialLinksProvider>

          <GlobalFooterScripts scripts={advancedSeo?.footerScripts} />
          <SiteAnalyticsTracker />
        </LocationsProvider>
      </body>
    </html>
  );
}
