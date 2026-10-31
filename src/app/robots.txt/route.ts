import { fetchSeoFile } from "@/lib/seoFiles";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.designhouse.co.in";

export async function GET() {
  const file = await fetchSeoFile("robots.txt");
  if (file) return file;

  // Backend unreachable: crawlers treat a failing robots.txt as "crawl nothing", so allow everything instead
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=60" },
  });
}
