// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import fs from "node:fs";

// Le blog n'entre au sitemap qu'avec un premier article publié : une rubrique
// vide indexée, c'est une page sans contenu dans les résultats de recherche.
// Lecture directe des fichiers, la configuration n'a pas accès aux collections.
const dossierBlog = "./src/content/blog";
const blogPublie = fs.existsSync(dossierBlog) && fs.readdirSync(dossierBlog)
  .filter((f) => /\.mdx?$/.test(f))
  .some((f) => !/^draft:\s*true\s*$/m.test(fs.readFileSync(`${dossierBlog}/${f}`, "utf8")));

// https://astro.build/config
export default defineConfig({
  site: "https://kigumi.app",
  output: "static",
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes("/404") && (blogPublie || !page.includes("/blog/")),
    }),
  ],
  build: {
    format: "directory",
  },
});
