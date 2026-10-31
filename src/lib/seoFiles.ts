import { API_URL } from "@/lib/api";

/**
 * Root SEO files (robots.txt, sitemap.xml, verification files) come from the backend: it serves the file
 * uploaded under Advanced SEO in the admin, or generates one when none is uploaded. Fetched on every
 * request so a new upload shows up on the website straight away.
 */
export async function fetchSeoFile(name: string): Promise<Response | null> {
  try {
    const res = await fetch(`${API_URL}/${name}`, { cache: "no-store" });
    if (!res.ok) return null;
    return new Response(await res.text(), {
      headers: {
        "Content-Type": res.headers.get("content-type") || "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch {
    return null;
  }
}
