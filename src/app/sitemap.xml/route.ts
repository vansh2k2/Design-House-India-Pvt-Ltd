import { fetchSeoFile } from "@/lib/seoFiles";

export const dynamic = "force-dynamic";

export async function GET() {
  const file = await fetchSeoFile("sitemap.xml");
  if (file) return file;

  // Backend unreachable: 503 tells crawlers to try again later rather than dropping the sitemap
  return new Response("Sitemap temporarily unavailable", { status: 503, headers: { "Retry-After": "600" } });
}
