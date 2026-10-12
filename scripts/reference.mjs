// Filet de non-régression du site, contre lui-même.
//
//   npm run reference    fige l'état courant dans reference/
//   npm run verifier     compare le build à cette référence
//
// Il remplace celui qui gardait le portage depuis le dépôt bash : celui-là
// comparait deux implémentations, celui-ci compare deux états de la même.
//
// Deux formes de référence, parce qu'aucune ne suffit. Les images montrent à
// un humain une grille cassée ou un chevauchement, qu'aucun diff de texte ne
// verrait. Le relevé de structure repère une mesure disparue ou un menu qui
// cesse de surligner, sans le bruit qu'une comparaison de pixels produit au
// moindre décalage de police.
import { chromium } from "playwright";
import { createHash } from "crypto";
import { createServer } from "http";
import fs from "fs/promises";
import path from "path";

const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const DIST = path.join(RACINE, "dist");
const REF = path.join(RACINE, "reference");
const VERIFIE = process.argv.includes("--verifier");
const CIBLE = VERIFIE ? path.join(RACINE, "reference-courante") : REF;
const PORT = 8789;

const LARGEURS = [{ nom: "large", width: 1280, height: 900 },
                  { nom: "etroit", width: 390, height: 844 }];
const MODES = ["dark", "light"];
const somme = (s) => createHash("sha256").update(s).digest("hex").slice(0, 16);

// La page d'administration est une application tierce chargée depuis un CDN :
// son contenu ne nous appartient pas et change sans nous. La relever
// produirait un écart à chaque montée de version de Sveltia.
const HORS_FILET = [/^\/admin\//];

/** Toutes les routes du build, en chemins servis. */
async function routes(dir = DIST, base = "/") {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    if (e.isDirectory()) out.push(...await routes(path.join(dir, e.name), base + e.name + "/"));
    else if (e.name === "index.html") out.push(base);
    else if (e.name.endsWith(".html")) out.push(base + e.name);
  }
  return out.filter((r) => !HORS_FILET.some((m) => m.test(r))).sort();
}

function releve() {
  const t = (document.body.innerText || "").replace(/ /g, " ")
    .split("\n").map((l) => l.trim()).filter(Boolean).join("\n");
  const pris = (s) => [...document.querySelectorAll(s)].map((e) => e.textContent.trim());
  return {
    titre: document.title,
    description: document.querySelector('meta[name="description"]')?.content ?? null,
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
    h1: pris("h1"), h2: pris("h2"), h3: pris("h3"),
    menuActif: document.querySelector("header nav a.on")?.textContent?.trim() ?? null,
    liens: [...document.querySelectorAll("main a, footer a")].map((a) => a.getAttribute("href")),
    compte: {
      sections: document.querySelectorAll("main > section").length,
      cartes: document.querySelectorAll(".card").length,
      fiches: document.querySelectorAll(".fiches > li").length,
      mesures: document.querySelectorAll(".mesure li").length,
      svg: document.querySelectorAll("main svg").length,
    },
    // Empreinte du balisage des SVG. Le relevé de texte ne les voit pas : deux
    // variantes d'un même schéma portent souvent le même texte, si bien qu'un
    // échange entre elles passait inaperçu. C'est arrivé au portage.
    svg: [...document.querySelectorAll("main svg")]
      .map((e) => e.outerHTML.length + ":" + (e.querySelector("title")?.textContent ?? ""))
      .join("|"),
    texte: t,
  };
}

const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript",
                ".svg": "image/svg+xml", ".png": "image/png", ".xml": "application/xml",
                ".json": "application/json", ".woff2": "font/woff2" };
const srv = createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (p.endsWith("/")) p += "index.html";
  try {
    const buf = await fs.readFile(path.join(DIST, p));
    res.writeHead(200, { "content-type": types[path.extname(p)] ?? "application/octet-stream" });
    res.end(buf);
  } catch { res.writeHead(404); res.end("404"); }
});
await new Promise((r) => srv.listen(PORT, "127.0.0.1", r));

const b = await chromium.launch();
// Tout est régénéré à chaque passe : on vide d'abord, sinon le relevé d'une
// route supprimée survit dans la référence et passe pour une page existante.
for (const d of ["img", "text"]) {
  await fs.rm(path.join(CIBLE, d), { recursive: true, force: true });
  await fs.mkdir(path.join(CIBLE, d), { recursive: true });
}

const liste = await routes();
const manifeste = {};
process.stdout.write(`${liste.length} routes\n`);

for (const route of liste) {
  const slug = route === "/" ? "index" : route.replace(/^\//, "").replace(/\/$/, "").replace(/\//g, "-");
  let r = null;
  const combinaisons = VERIFIE ? [[LARGEURS[0], "dark"]]
                               : LARGEURS.flatMap((l) => MODES.map((m) => [l, m]));
  for (const [l, mode] of combinaisons) {
    const p = await b.newPage({ viewport: { width: l.width, height: l.height },
                                reducedMotion: "reduce" });
    await p.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: "networkidle" });
    await p.evaluate((m) => document.documentElement.setAttribute("data-mode", m), mode);
    await p.evaluate(() => document.fonts.ready);
    await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await p.waitForTimeout(600);
    await p.evaluate(() => window.scrollTo(0, 0));
    await p.waitForTimeout(300);
    if (!VERIFIE)
      await p.screenshot({ path: path.join(CIBLE, "img", `${slug}-${mode}-${l.nom}.png`), fullPage: true });
    if (!r) { r = await p.evaluate(releve);
              r.deborde = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth); }
    await p.close();
  }
  await fs.writeFile(path.join(CIBLE, "text", `${slug}.txt`), r.texte + "\n");
  const { texte, svg, ...reste } = r;
  manifeste[route] = { ...reste, empreinteTexte: somme(texte), empreinteSvg: somme(svg) };
  process.stdout.write(`  ${route}\n`);
}
await fs.writeFile(path.join(CIBLE, "manifest.json"), JSON.stringify(manifeste, null, 2) + "\n");
await b.close();
srv.close();

if (!VERIFIE) {
  console.log(`\nRéférence figée — ${liste.length} routes.`);
} else {
  const ref = JSON.parse(await fs.readFile(path.join(REF, "manifest.json"), "utf8"));
  let n = 0;
  for (const r of new Set([...Object.keys(ref), ...Object.keys(manifeste)])) {
    const a = ref[r], z = manifeste[r];
    if (!a) { console.log(`+ ${r} — route nouvelle`); n++; continue; }
    if (!z) { console.log(`- ${r} — route disparue`); n++; continue; }
    for (const c of ["titre", "description", "canonical", "empreinteTexte",
                     "empreinteSvg", "menuActif"])
      if (a[c] !== z[c]) { console.log(`≠ ${r} · ${c}`); n++; }
    for (const c of Object.keys(a.compte))
      if (a.compte[c] !== z.compte[c])
        { console.log(`≠ ${r} · ${c} : ${a.compte[c]} → ${z.compte[c]}`); n++; }
    if (z.deborde && !a.deborde) { console.log(`≠ ${r} · débordement horizontal apparu`); n++; }
  }
  console.log(n ? `\n${n} écart(s).` : "\nAucun écart.");
}
