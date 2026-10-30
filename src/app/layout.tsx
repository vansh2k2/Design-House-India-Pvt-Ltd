import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import GlobalFooterScripts from "@/components/GlobalFooterScripts";
import { API_URL, fetchLocations } from "@/lib/api";
import { LocationsProvider } from "@/context/LocationsContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
  const locations = await fetchLocations();

  return (
    <html lang="en" className={`${inter.className} ${playfair.variable}`}>
      {/* Browser extensions (e.g. ColorZilla's cz-shortcut-listen) inject
          attributes on <body> before hydration; ignore those mismatches. */}
      <body suppressHydrationWarning>

        <LocationsProvider locations={locations}>
          <Providers>{children}</Providers>

          <GlobalFooterScripts />
        </LocationsProvider>
      </body>
    </html>
  );
}
