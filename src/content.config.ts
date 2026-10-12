import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Une seule rubrique pour tout le site : les articles du studio et ceux du
// lab, distingués par étiquette (« lab », puis une par chantier : « harness »).
// C'est la collection que le CMS ouvre à Julien, d'où le minimum de champs
// obligatoires — chaque champ requis est une occasion d'être bloqué au moment
// de publier.
//
// La langue est portée par l'article : un texte peut n'exister qu'en une
// langue, et la traduction n'est jamais une condition pour publier.
const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    langue: z.enum(["fr", "en"]).default("fr"),
    etiquettes: z.array(z.string().regex(/^[a-z0-9-]+$/, "minuscules, chiffres et tirets")).default([]),
    image: z.string().optional(),
  }),
});

export const collections = { blog };
