import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const essays = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/essays" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    pillar: z.enum([
      "intent-gap",
      "founder-journey",
      "category-creation",
      "builder-notes",
    ]),
    draft: z.boolean().default(false),
    ogImage: z.string().optional(),
    slug: z.string().optional(),
  }),
});

// Le blog du studio. Schéma distinct de celui des essais : « pillar » est un
// découpage propre au produit et n'a aucun sens ici. C'est aussi la collection
// que le CMS ouvrira à Julien, d'où le minimum de champs obligatoires — chaque
// champ requis est une occasion d'être bloqué au moment de publier.
const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    image: z.string().optional(),
  }),
});

export const collections = { essays, blog };
