import { getCollection, type CollectionEntry } from "astro:content";

export type Article = CollectionEntry<"blog">;

// Les brouillons se voient avec `astro dev`, jamais dans le build de
// production : c'est ce qui laisse écrire sans publier avant d'être prêt.
export async function articlesPublies(etiquette?: string): Promise<Article[]> {
  const tous = await getCollection("blog", ({ data }) =>
    (import.meta.env.DEV || !data.draft) &&
    (!etiquette || data.etiquettes.includes(etiquette)));
  return tous.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function etiquettesPubliees(): Promise<string[]> {
  const articles = await articlesPublies();
  return [...new Set(articles.flatMap((a) => a.data.etiquettes))].sort();
}

// Libellés affichés. Une étiquette absente de la table s'affiche telle quelle :
// en ajouter une dans le CMS ne casse rien.
const LIBELLES: Record<string, string> = { lab: "Lab", harness: "Harness" };
export const libelle = (e: string) => LIBELLES[e] ?? e;

export const dateArticle = (a: Article) =>
  a.data.pubDate.toLocaleDateString(a.data.langue === "en" ? "en-GB" : "fr-FR",
    { year: "numeric", month: "long", day: "numeric" });
