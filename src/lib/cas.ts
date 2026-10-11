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

// Le contenu d'un cas, dans une langue. Le français est à la racine de
// l'objet, l'anglais sous « en » : même forme, mêmes garde-fous.
const ContenuCas = {
  public: txt,
  titre: txt,
  accroche: txt,
  mecanisme: z.string().min(1, "un cas doit nommer son mécanisme").transform(typo),
  // Sans mesure, une fiche n'est qu'une promesse de plus : elle ne vaut pas
  // d'être publiée. C'est la règle la plus importante du catalogue.
  mesure: z.array(txt).min(1, "un cas doit porter au moins une mesure"),
};

const Cas = z.object({
  id: z.string(),
  niveau: z.union([z.literal(1), z.literal(2)]),
  page: z.string().optional(),
  ...ContenuCas,
  // Le site est bilingue : un cas sans traduction fait échouer la
  // construction plutôt que de laisser un trou dans la version anglaise.
  en: z.object({ ...ContenuCas, slug: z.string().optional() }),
}).refine((c) => c.niveau !== 1 || !!c.page, {
  message: "une fiche de niveau 1 doit déclarer sa page",
}).refine((c) => c.niveau !== 1 || !!c.en.slug, {
  message: "une fiche de niveau 1 doit déclarer son adresse anglaise (en.slug)",
});

const ContenuRole = { nom: txt, texte: txt, slug: z.string(), h1: txt, chapo: txt };

const Role = z.object({
  ...ContenuRole,
  cas: z.array(z.string()).min(1),
  en: z.object(ContenuRole),
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

export type Langue = "fr" | "en";

/** Un cas vu dans une langue, avec son adresse quand il a une page. */
export function vueCas(c: Cas, langue: Langue) {
  const t = langue === "fr" ? c : c.en;
  const href = c.niveau !== 1 ? undefined
    : langue === "fr" ? `/${c.id}/` : `/en/${c.en.slug}/`;
  return { id: c.id, niveau: c.niveau, public: t.public, titre: t.titre,
    accroche: t.accroche, mecanisme: t.mecanisme, mesure: t.mesure, href };
}

/** Un rôle vu dans une langue, avec son adresse. */
export function vueRole(r: Role, langue: Langue) {
  const t = langue === "fr" ? r : r.en;
  return { ...t, cas: r.cas, href: langue === "fr" ? `/${r.slug}/` : `/en/${r.en.slug}/` };
}
