# Ce qui demande ton intervention

> Mis à jour le 12 octobre 2026. Le site est en ligne sur `kigumi.app` depuis la bascule. Tout le reste du chantier est fait et vérifié ;
> ce document ne liste que ce que je ne peux pas faire depuis le terminal.
> Le plan complet est dans `MIGRATION.md` du dépôt `studio-website`.

---

## 1. ~~Transférer `merlion` vers l'organisation~~ ✅ fait

**Pourquoi maintenant.** Le dépôt est sous ton compte personnel
(`Le-Steph/merlion`). C'est l'actif principal de la société : le site
commercial, le produit et le blog y vivent. Et **neuf commits de portage
attendent en local** — je ne pousse pas dans ton dépôt personnel sans que tu
le dises.

Devenu **`kigumi-app/website`**. Dépôt distant repointé, commits de portage
poussés, et la configuration du CMS nomme désormais le bon dépôt.

> Reste à archiver `kigumi-app/studio-website`, qui portait le site bash.
> À faire seulement après la bascule : c'est lui qui contient la référence
> d'avant-portage, sous le tag `reference-avant-astro`.

---

## 2. ~~Créer l'application OAuth GitHub~~ ✅ fait

Elle permet à Julien de se connecter au CMS d'un clic, sans jamais manipuler
de jeton.

Faite. Le **Client ID** et le **secret** servent au point 3 : ce sont les
deux variables d'environnement du Worker. Garde-les sous la main, le secret
n'est plus affichable.

---

## 3. ~~Déployer l'authentificateur du CMS~~ ✅ fait

`sveltia-cms-auth` tourne sur **`auth.kigumi.app`** : `/auth` renvoie bien
vers GitHub, et un domaine inconnu est refusé (`UNSUPPORTED_DOMAIN`).

Reste une variable : **`ALLOWED_DOMAINS`** doit nommer chaque adresse d'où
l'on ouvre `/cms-dashboard/` :

```
kigumi.app, kigumi-website.stephane-6a8.workers.dev, *-kigumi-website.stephane-6a8.workers.dev
```

---

## 4. ~~Créer le projet Cloudflare~~ ✅ fait

C'est un **Worker à actifs statiques** (`kigumi-website`), pas un projet
Pages. `wrangler.jsonc` à la racine dit quoi servir : `dist/`, avec
`_redirects` et les deux `404.html` (racine et `en/`). Une seule adresse passe
par du code, l'accueil (`worker/index.js`) : un navigateur qui préfère
l'anglais part vers `/en/`, sauf choix déjà fait au sélecteur ou robot.

| Réglage | Valeur |
|---|---|
| Branche de production | `main` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Autres branches | `npx wrangler preview` (exige le bloc `previews` de `wrangler.jsonc`) |
| Variable de build | `NODE_VERSION` = `22` — Astro 6 exige Node ≥ 22.12 |

- Production : `https://kigumi-website.stephane-6a8.workers.dev`
- Prévisualisations : `https://<branche>-kigumi-website.stephane-6a8.workers.dev`

Le site est en **français à la racine et en anglais sous `/en/`**, adresses
traduites. La table des correspondances est dans `src/data/adresses.json` (et
`en.slug` dans `cas.json`) ; le sélecteur, les balises hreflang et le sitemap
la lisent tous.

`INDEXABLE` vaut `true` (`src/lib/indexation.ts`) depuis la bascule : plus
de `noindex`, et `robots.txt` n'interdit que `/cms-dashboard/`. Le repasser à `false`
referme tout le site d'un coup.

---

## 5. ~~La bascule DNS~~ ✅ faite le 11 octobre 2026

À faire d'un seul tenant, un matin calme. **L'ordre compte** : `main` ne
reçoit le portage qu'une fois GitHub Pages débranché. Sinon GitHub Pages
publierait tout le dépôt Astro, notes internes comprises, sur `kigumi.app`.

0. ~~**Avant tout : exporter la liste d'attente Loops.**~~ ✅ fait. Le nouveau site n'a plus
   de formulaire ; l'ancien, encore en ligne, continue de remplir la liste
   jusqu'à la bascule. Les inscrits ont demandé un accès à un produit qui n'en
   sera pas un : un mot pour le leur dire, et certains sont des prospects
1. ✅ Cloudflare → DNS de `kigumi.app` : supprimer les enregistrements de l'apex
   qui pointent vers GitHub Pages
2. ✅ Worker `kigumi-website` → **Settings → Domains & Routes** → ajouter le
   domaine personnalisé **`kigumi.app`**
3. ✅ Me prévenir : je vérifie les routes, les redirections 301, le sitemap et le
   flux RSS
4. ✅ GitHub → `kigumi-app/website` → **Settings → Pages** : dépublié, domaine
   retiré, source sur **None** (« Unpublish » seul laissait la publication depuis
   `main` configurée). L'API répond désormais 404 : Pages est éteint
5. ✅ Fusionner `feat/portage-studio` dans `main`, puis remettre la branche de
   production du Worker sur **`main`**
6. ✅ `INDEXABLE` à `true` (PR #11), **le même jour** — plus tôt, on ferait
   indexer l'adresse workers.dev et `studio.kigumi.app` juste avant qu'on le
   réaffecte
7. ✅ Sitemap soumis dans la Search Console. ⏳ Google affichait « Impossible de
   lire le sitemap » : il gardait en cache l'ancien `robots.txt` (`Disallow: /`).
   Le sitemap et le `robots.txt` en ligne sont valides ; à revérifier dans
   quelques jours, sinon soumettre directement `sitemap-0.xml`
8. ✅ `www.kigumi.app` → règle de redirection Cloudflare, 301 vers l'apex
   (chemin et paramètres conservés). « Always Use HTTPS » activé

**Retour arrière :** retirer le domaine du Worker, recréer les enregistrements
GitHub Pages. Tant que l'étape 4 n'est pas faite, GitHub Pages sert toujours
l'ancien site depuis `main`. Exposition : quelques minutes derrière Cloudflare.

---

## 6. Après la bascule

- [x] **Mentions légales** (PR `feat/indexation-bascule`) : l'hébergeur devient Cloudflare seul, GitHub doit
      disparaître de la page. C'est le genre de détail qu'on oublie six
      semaines plus tard.
- [x] **Carte de partage** (`og:image`) : une par langue,
      `public/studio/partage/og-{fr,en}.png`, générées par
      `Studio/website/livrables/og-cartes.py`.
- [x] **Mesure d'audience** : Cloudflare Web Analytics, sans cookie. Le script
      est injecté par Cloudflare à la diffusion : rien à ajouter dans le code,
      sous peine de compter chaque visite deux fois.
- [ ] `studio.kigumi.app` devient la console client. En attendant, une règle
      Cloudflare le redirige (301) vers `kigumi.app`.
- [ ] **DMARC de `p=quarantine` à `p=reject`**, après avoir relu les rapports
      Cloudflare sur deux ou trois semaines : vers le 1er novembre 2026.
- [ ] `MX` nul sur les sous-domaines qui n'envoient jamais de courrier.
      Aujourd'hui rien n'empêche d'usurper une adresse en
      `@studio.kigumi.app`.

---

## 7. Ce qui t'attend, sans urgence

~~**La relecture de l'anglais.**~~ ✅ faite. Les libellés des diagrammes anglais vivent
dans `brand/` (`copy/methode.en.json`, `copy/autonomie.en.json`, table `T` de
`bin/explainers.py`) : les corriger là, puis `brand/bin/sync_website.sh`.

**Les quatre essais du lab.** Écrits depuis juin, jamais publiés. Ils sont
désormais dans le blog (`src/content/blog/`), en anglais (`/en/blog/…`), étiquetés `lab` et `harness`,
toujours en `draft: true` — donc invisibles. À relire par toi ; deux d'entre eux
parlent encore comme un fondateur de start-up (voir `REFONTE-LAB.md`, §4.4).
Décocher « Brouillon » dans le CMS suffit à publier : le blog entre alors dans
le pied de page et le sitemap, et `/lab` affiche la section « Ce qu'on en
écrit ».

~~**L'adresse contact@kigumi.app.**~~ ✅ créée. Plus de page contact : les boutons
« Prendre rendez-vous » et `/contact/` mènent à l'agenda Google
(`src/lib/contact.ts`, et `public/_redirects` pour l'adresse).

~~**Les deux portraits.**~~ ✅ en ligne (`public/studio/portraits/`, 960 × 1200).

---
