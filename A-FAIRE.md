# Ce qui demande ton intervention

> Mis à jour le 9 octobre 2026. Tout le reste du chantier est fait et vérifié ;
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

## 3. Déployer l'authentificateur du CMS

**Une correction que je te dois.** Je t'avais annoncé que Sveltia ne demandait
aucun service d'authentification. C'était faux. Trois voies existent, et une
seule convient :

| Voie | À déployer | Pour Julien |
|---|---|---|
| Jeton personnel GitHub | rien | il devrait créer et coller un jeton à droits d'écriture, qui vivrait dans son navigateur — à écarter |
| **Authentificateur sur Cloudflare Workers** | **un Worker** | il clique « se connecter avec GitHub » |
| Netlify | sans objet | vous êtes sur Cloudflare |

C'est un Worker, sur une infrastructure que vous avez déjà, et c'est un simple
relais OAuth sans état ni entretien. Le choix de Sveltia tient toujours —
Decap demande la même chose, Tina exige un backend **et** une base, Keystatic
casse sur Astro 6 — mais ma formule était trop belle.

1. Déployer `sveltia/sveltia-cms-auth` sur Cloudflare Workers
   (le dépôt porte les instructions, c'est un `deploy` et deux variables)
2. Variables d'environnement : `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`
3. Lui donner le domaine **`auth.kigumi.app`** — c'est ce que j'ai déjà écrit
   dans `public/admin/config.yml`

---

## 4. Créer le projet Cloudflare Pages

Les réglages sont déjà documentés dans `DEPLOY.md`. L'essentiel :

| Réglage | Valeur |
|---|---|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | *(vide)* |
| Variable d'environnement | `NODE_VERSION` = `20` |

> **`NODE_VERSION` n'est pas facultatif.** L'image de construction de
> Cloudflare ne fournit pas Node 25 et le build échoue sans cette variable.

Connecte le projet au dépôt, branche `main`. **Ne bascule pas encore le DNS** :
le déploiement produira une URL de prévisualisation, qui suffit pour tout
relire avant que quiconque ne voie quoi que ce soit.

---

## 5. La bascule DNS — quand tout le reste est validé

À faire d'un seul tenant, un matin calme.

1. Cloudflare → DNS de `kigumi.app` : faire pointer l'apex vers Cloudflare
   Pages au lieu de GitHub Pages
2. Me prévenir : je vérifie les routes, les deux redirections 301, le sitemap
   et le flux RSS
3. Je lève alors `noindex` et `robots.txt`, **le même jour** — les lever avant
   ferait indexer `studio.kigumi.app` juste avant qu'on le réaffecte
4. Soumettre le sitemap dans la Search Console (la propriété existe, la clé de
   vérification est déjà dans la zone)

**Retour arrière :** repointer le DNS vers GitHub Pages. L'ancien site reste
intact dans l'historique git. Exposition : le temps de propagation, quelques
minutes derrière Cloudflare.

---

## 6. Après la bascule

- [ ] **Mentions légales** : l'hébergeur devient Cloudflare seul, GitHub doit
      disparaître de la page. C'est le genre de détail qu'on oublie six
      semaines plus tard.
- [ ] `studio.kigumi.app` devient la console client. Sans risque : le site n'a
      jamais été indexé.
- [ ] **DMARC de `p=quarantine` à `p=reject`**, après avoir relu les rapports
      Cloudflare sur deux ou trois semaines.
- [ ] `MX` nul sur les sous-domaines qui n'envoient jamais de courrier.
      Aujourd'hui rien n'empêche d'usurper une adresse en
      `@studio.kigumi.app`.

---

## 7. Deux choses qui t'attendent, sans urgence

**Les quatre essais du lab.** Écrits depuis juin, jamais publiés, tous en
`draft: true` — donc invisibles, le garde-fou fonctionne. Tu voulais les
relire ensemble avant publication.

**Les deux portraits.** L'emplacement 4:5 les attend sur la page À propos, au
cadrage que `brief-photo.md` commande (1600 × 2000). Leur arrivée ne décalera
rien.

---

## Ce que je fais dès que 1 est fait

Je pousse les neuf commits, et je prépare tout ce qui ne dépend plus que de
moi. Le point 2 ne me bloque pas : la configuration du CMS est écrite, le
`base_url` est déjà `auth.kigumi.app`, il ne manque que le Worker derrière.
