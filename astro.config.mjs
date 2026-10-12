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

// Les paires d'adresses français ↔ anglais, lues aux mêmes sources que
// src/lib/i18n.ts : chaque page du sitemap déclare son équivalent.
const site = "https://kigumi.app";
const lire = (f) => JSON.parse(fs.readFileSync(new URL(f, import.meta.url), "utf8"));
const cas = lire("./src/data/cas.json");
const paires = [
  ...lire("./src/data/adresses.json").paires,
  ...cas.cas.filter((c) => c.niveau === 1).map((c) => [`/${c.id}/`, `/en/${c.en.slug}/`]),
  ...cas.roles.map((r) => [`/${r.slug}/`, `/en/${r.en.slug}/`]),
];
const alternatives = new Map();
for (const [fr, en] of paires) {
  const liens = [{ lang: "fr", url: site + fr }, { lang: "en", url: site + en }];
  alternatives.set(site + fr, liens);
  alternatives.set(site + en, liens);
}

// Cloudflare sert, pour une adresse introuvable, le 404.html le plus proche
// dans l'arborescence. Astro n'écrit 404.html qu'à la racine : la page d'erreur
// anglaise sortirait en en/404/index.html, et /en/… retomberait sur la française.
const page404Anglaise = {
  name: "page-404-anglaise",
  hooks: {
    "astro:build:done": ({ dir }) => {
      const source = new URL("en/404/index.html", dir);
      if (!fs.existsSync(source)) return;
      fs.renameSync(source, new URL("en/404.html", dir));
      fs.rmdirSync(new URL("en/404/", dir));
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site,
  output: "static",
  integrations: [
    mdx(),
    page404Anglaise,
    sitemap({
      filter: (page) => !page.includes("/404") && (blogPublie || !page.includes("/blog/")),
      serialize: (item) => {
        const liens = alternatives.get(item.url);
        return liens ? { ...item, links: liens } : item;
      },
    }),
  ],
  build: {
    format: "directory",
  },
});
