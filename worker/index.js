// Détection de langue, sur l'accueil seulement.
//
// Le reste du site est servi en fichiers statiques, sans passer par ici :
// wrangler.jsonc ne fait passer que « / » par ce code (run_worker_first).
//
// Règles :
//   - un choix déjà fait (cookie « langue », posé par le sélecteur) l'emporte ;
//   - sinon, un navigateur qui préfère l'anglais au français part vers /en/ ;
//   - les robots ne sont jamais redirigés : ils doivent pouvoir indexer les
//     deux versions, chacune à son adresse ;
//   - aucune autre page n'est concernée : un lien partagé ouvre toujours ce
//     qui a été partagé.
const ROBOT = /bot|crawl|spider|slurp|facebookexternalhit|embedly|preview|lighthouse/i;

/** Poids de la langue dans Accept-Language (fr-FR;q=0.9 compte pour fr). */
export function poids(entete, langue) {
  let max = 0;
  for (const partie of (entete || "").split(",")) {
    const [tag, ...params] = partie.trim().toLowerCase().split(";");
    if (tag !== langue && !tag.startsWith(`${langue}-`)) continue;
    const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
    const valeur = q ? Number.parseFloat(q.slice(2)) : 1;
    if (!Number.isNaN(valeur)) max = Math.max(max, valeur);
  }
  return max;
}

export function langueVoulue(requete) {
  const cookie = requete.headers.get("Cookie") || "";
  const choix = cookie.match(/(?:^|;\s*)langue=(fr|en)\b/);
  if (choix) return choix[1];
  if (ROBOT.test(requete.headers.get("User-Agent") || "")) return "fr";
  const entete = requete.headers.get("Accept-Language");
  return poids(entete, "en") > poids(entete, "fr") ? "en" : "fr";
}

export default {
  async fetch(requete, env) {
    const url = new URL(requete.url);
    if (url.pathname === "/" && langueVoulue(requete) === "en") {
      return new Response(null, {
        status: 302,
        headers: {
          Location: `/en/${url.search}`,
          // La réponse dépend de la personne : aucun cache partagé ne doit la
          // resservir à quelqu'un d'autre.
          "Cache-Control": "private, no-store",
          Vary: "Accept-Language, Cookie",
        },
      });
    }
    return env.ASSETS.fetch(requete);
  },
};
