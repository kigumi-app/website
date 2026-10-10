import type { APIRoute } from "astro";
import { INDEXABLE } from "../lib/indexation";

export const GET: APIRoute = ({ site }) => {
  const corps = INDEXABLE
    ? `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${new URL("/sitemap-index.xml", site)}\n`
    : "User-agent: *\nDisallow: /\n";
  return new Response(corps, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
