// Source unique des cas d'usages, et ses garde-fous.
//
// blocs.py vérifiait ces règles à la génération. En schéma Zod, elles sont
// vérifiées au build : un cas sans mesure fait échouer la construction au lieu
// d'attendre qu'on pense à lancer un script.
import { z } from "astro:schema";
import brut from "../data/cas.json";

/** L'apostrophe typographique est la bonne en français, et c'est ce que
 *  rendait blocs.py. On l'applique ici, une fois, plutôt que dans chaque
 *  composant : oubliée à un seul endroit, elle produirait une page au
 *  caractère différent des autres sans que personne ne le remarque.
 *  Les champs d'identité — id, slug, page — n'y passent pas : ce sont des
 *  URL, pas de la prose. */
const typo = (s: string) => s.replace(/'/g, "\u2019");
const txt = z.string().transform(typo);

const Cas = z.object({
  id: z.string(),
  niveau: z.union([z.literal(1), z.literal(2)]),
  page: z.string().optional(),
  public: txt,
  titre: txt,
  accroche: txt,
  mecanisme: z.string().min(1, "un cas doit nommer son mécanisme").transform(typo),
  // Sans mesure, une fiche n'est qu'une promesse de plus : elle ne vaut pas
  // d'être publiée. C'est la règle la plus importante du catalogue.
  mesure: z.array(txt).min(1, "un cas doit porter au moins une mesure"),
}).refine((c) => c.niveau !== 1 || !!c.page, {
  message: "une fiche de niveau 1 doit déclarer sa page",
});

const Role = z.object({
  nom: txt,
  texte: txt,
  cas: z.array(z.string()).min(1),
  slug: z.string(),
  h1: txt,
  chapo: txt,
});

const Catalogue = z.object({ cas: z.array(Cas), roles: z.array(Role) })
  .superRefine((d, ctx) => {
    const ids = new Set(d.cas.map((c) => c.id));
    for (const r of d.roles)
      for (const i of r.cas)
        if (!ids.has(i))
          ctx.addIssue({ code: "custom", message: `rôle « ${r.nom} » : cas inconnu « ${i} »` });
    // Un cas qu'aucun rôle ne porte est injoignable : les fiches de niveau 2
    // ne vivent que sur les pages de rôle.
    const portes = new Set(d.roles.flatMap((r) => r.cas));
    for (const c of d.cas)
      if (c.niveau === 2 && !portes.has(c.id))
        ctx.addIssue({ code: "custom", message: `cas « ${c.id} » rattaché à aucun rôle` });
  });

export const catalogue = Catalogue.parse(brut);
export const parId = new Map(catalogue.cas.map((c) => [c.id, c]));
export const niveau1 = catalogue.cas.filter((c) => c.niveau === 1);
export type Cas = z.infer<typeof Cas>;
export type Role = z.infer<typeof Role>;
