import rss from "@astrojs/rss";
import { getPublishedEssays, essaySlug } from "../../../lib/essays";

export async function GET(context) {
  const essays = await getPublishedEssays();
  return rss({
    title: "Kigumi — Writing",
    description:
      "Essays on the intent gap, behavior infrastructure, and building a category before it has a name.",
    site: context.site,
    items: essays.map((essay) => ({
      title: essay.data.title,
      description: essay.data.description,
      pubDate: essay.data.pubDate,
      link: `/lab/harness/writing/${essaySlug(essay)}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
