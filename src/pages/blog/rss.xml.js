import rss from "@astrojs/rss";
import { articlesPublies } from "../../lib/blog";

export async function GET(context) {
  const articles = await articlesPublies();
  return rss({
    title: "Kigumi — Blog",
    description: "Ce qu'on apprend en automatisant des processus chez des PME et des ETI, et ce qu'on construit au lab pour le vérifier.",
    site: context.site,
    items: articles.map((a) => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.pubDate,
      link: `/blog/${a.id}/`,
      categories: a.data.etiquettes,
    })),
    customData: `<language>fr-fr</language>`,
  });
}
