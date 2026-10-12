// Le site en deux langues : le français à la racine, l'anglais sous /en/,
// avec des adresses traduites (/methode/ ↔ /en/method/).
//
// Une seule table relie chaque page à son équivalent (data/adresses.json, plus
// les adresses déclarées dans cas.json). Le sélecteur de langue, les balises
// hreflang et le sitemap la lisent tous : une page ajoutée d'un
// côté sans son pendant n'a simplement pas d'alternative déclarée, au lieu de
// pointer vers une adresse qui n'existe pas.
import { catalogue } from "./cas";
import adresses from "../data/adresses.json";
import type { Langue } from "./cas";

export type { Langue };

const PAIRES: [string, string][] = [
  ...(adresses.paires as [string, string][]),
  // Fiches détaillées et pages de rôle : leurs adresses anglaises vivent
  // dans cas.json, à côté de leur traduction.
  ...catalogue.cas.filter((c) => c.niveau === 1)
    .map((c): [string, string] => [`/${c.id}/`, `/en/${c.en.slug}/`]),
  ...catalogue.roles.map((r): [string, string] => [`/${r.slug}/`, `/en/${r.en.slug}/`]),
];

const VERS_EN = new Map(PAIRES);
const VERS_FR = new Map(PAIRES.map(([fr, en]) => [en, fr]));

export const langueDe = (chemin: string): Langue =>
  chemin === "/en" || chemin.startsWith("/en/") ? "en" : "fr";

/** L'équivalent d'une page dans l'autre langue, ou null s'il n'existe pas. */
export function equivalent(chemin: string): string | null {
  const c = chemin.endsWith("/") ? chemin : `${chemin}/`;
  return (langueDe(c) === "fr" ? VERS_EN.get(c) : VERS_FR.get(c)) ?? null;
}

/** Une page française, dans la langue demandée. Les liens internes s'écrivent
 *  avec l'adresse française : c'est la clé de la table. */
export function lien(cheminFr: string, langue: Langue): string {
  if (langue === "fr") return cheminFr;
  const [chemin, ancre] = cheminFr.split("#");
  const en = VERS_EN.get(chemin);
  if (!en) throw new Error(`Aucune adresse anglaise pour ${chemin} : l'ajouter à data/adresses.json.`);
  return ancre ? `${en}#${ancre}` : en;
}

export const toutesLesPaires = (): readonly [string, string][] => PAIRES;

// ── Textes d'interface ──────────────────────────────────────────────
// Ce qui n'appartient à aucune page : en-tête, pied, fil d'Ariane, listes.
// Le contenu des pages, lui, vit dans les pages de chaque langue.
export const UI = {
  fr: {
    menu: { methode: "Méthode", "travailler-ensemble": "Travailler ensemble", "cas-usages": "Cas d’usages", "a-propos": "À propos" },
    rdv: "Prendre rendez-vous",
    menuPrincipal: "Menu principal",
    menuOuvrir: "Ouvrir le menu",
    menuFermer: "Fermer le menu",
    versClair: "Passer en mode clair",
    versSombre: "Passer en mode sombre",
    autreLangue: { code: "EN", libelle: "English version" },
    filAriane: "Fil d’Ariane",
    pied: {
      cas: "Cas d’usages", tousLesCas: "Tous les cas",
      kigumi: "Kigumi", methode: "Notre méthode", travailler: "Travailler ensemble", aPropos: "À propos", blog: "Blog", lab: "Lab",
      confiance: "Confiance", donnees: "Données et sécurité", aiAct: "AI Act", mentions: "Mentions légales",
      contact: "Contact",
      signature: "Studio d’automatisation de processus par agents IA pour PME et ETI.",
    },
    cas: { voir: "Voir ce cas", fiche: "Voir la fiche détaillée", mesure: "Ce qu’on mesure", processus: (n: number) => `${n} processus pour ce poste` },
    lab: { presentation: "Présentation", fonctionnement: "Fonctionnement", articles: "Articles" },
    blog: { tout: "Tout", etiquettes: "Étiquettes", tousLesArticles: "Tous les articles", autreLangue: "Français" },
  },
  en: {
    menu: { methode: "Method", "travailler-ensemble": "Working together", "cas-usages": "Use cases", "a-propos": "About" },
    rdv: "Book a call",
    menuPrincipal: "Main menu",
    menuOuvrir: "Open menu",
    menuFermer: "Close menu",
    versClair: "Switch to light mode",
    versSombre: "Switch to dark mode",
    autreLangue: { code: "FR", libelle: "Version française" },
    filAriane: "Breadcrumb",
    pied: {
      cas: "Use cases", tousLesCas: "All use cases",
      kigumi: "Kigumi", methode: "Our method", travailler: "Working together", aPropos: "About", blog: "Blog", lab: "Lab",
      confiance: "Trust", donnees: "Data and security", aiAct: "AI Act", mentions: "Legal notice",
      contact: "Contact",
      signature: "Process automation studio using AI agents, for small and mid-sized companies.",
    },
    cas: { voir: "See this case", fiche: "See the full case", mesure: "What we measure", processus: (n: number) => `${n} processes for this role` },
    lab: { presentation: "Overview", fonctionnement: "How it works", articles: "Articles" },
    blog: { tout: "All", etiquettes: "Tags", tousLesArticles: "All articles", autreLangue: "English" },
  },
} as const;

export const ui = (langue: Langue) => UI[langue];
