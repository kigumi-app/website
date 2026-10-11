# Navigation et cohérence du site — état des lieux

> Relevé du 10 octobre 2026 sur `feat/portage-studio` (commit `5a98171`),
> construit en local et vérifié sur
> `https://kigumi-website.stephane-6a8.workers.dev`. Aucune modification
> apportée : ce document constate et propose.

---

## 1. En une phrase

Le site du studio est un réseau bien maillé ; **le lab produit est une île**.
On entre dans `/lab/harness` depuis le studio, on n'en ressort plus : aucun
lien, ni dans le menu, ni dans le pied de page, ni sur le logo, ne ramène à
l'accueil. À cela s'ajoutent une page d'erreur qui appartient au produit, un
blog que personne ne peut trouver, et un positionnement qui se contredit entre
`/lab` et `/lab/harness`.

---

## 2. La carte, telle qu'elle est

```
                         ┌─────────────────────── SITE DU STUDIO (fr) ───────────────────────┐
                         │  StudioLayout · palette noyer · bascule clair/sombre               │
                         │                                                                    │
  menu (5)  ─────────────┤  /methode  /travailler-ensemble  /cas-usages  /a-propos  /contact  │
                         │                                                                    │
  pied (12) ─────────────┤  + /conseil-ingenierie  /industrie-distribution  /service-client  │
                         │    /confiance  /mentions-legales  /lab/                           │
                         │                                                                    │
  corps de /cas-usages ──┤  7 pages de rôle : /direction-*  /qualite-conformite              │
                         │                   /ressources-humaines                            │
                         │                                                                    │
  aucun lien ────────────┤  /blog/                                    ← orpheline            │
                         └──────────────────────────────┬─────────────────────────────────────┘
                                                        │ une seule carte, dans le corps de /lab/
                                                        ▼
                         ┌─────────────────────────── LAB PRODUIT (en) ───────────────────────┐
                         │  Layout · palette braise · pas de bascule · autre logo             │
                         │                                                                    │
                         │  /lab/harness/  ⇄  /how-it-works  ⇄  /writing  ⇄  #cta (liste)    │
                         │                                                                    │
                         │  sortie vers le studio : AUCUNE                                     │
                         └────────────────────────────────────────────────────────────────────┘

  /404 ─── mise en page du produit, en anglais, pour tout le site
```

### Liens entrants par page

| Page | Pages qui y mènent | Par |
|---|---:|---|
| `/` | 21 | logo du studio, lien de la 404 |
| `/methode`, `/cas-usages`, `/a-propos`, `/contact` | 20 | menu, pied, corps |
| `/travailler-ensemble` | 20 | menu, pied |
| 3 pages de profil, `/confiance` | 20 | pied, corps |
| `/mentions-legales` | 20 | pied |
| `/lab/` | 20 | pied seulement |
| 7 pages de rôle | **1** | corps de `/cas-usages` |
| `/lab/harness/` | 5 | menu du produit, carte de `/lab/` |
| `/lab/harness/how-it-works/` | 4 | menu du produit |
| `/lab/harness/writing/` | 4 | menu et pied du produit |
| `/blog/` | **0** | — |
| `/admin/` | 0 | volontaire |

Aucun lien interne cassé. Un seul lien externe (`support.github.com`, mentions
légales).

---

## 3. Constats

### Bloquants — à régler avant la bascule

**B1 · Le lab est un cul-de-sac.**
Les quatre pages produit (`/lab/harness/`, `/how-it-works/`, `/writing/`, et
la 404) partagent `components/Nav.astro` et `components/Footer.astro`, qui ne
pointent que vers `/lab/harness/*`. Le logo, libellé « Kigumi home », renvoie
à `/lab/harness/`, pas à `/`. Un visiteur arrivé par un essai partagé ne
découvre jamais le studio ; un visiteur venu du studio n'y revient que par le
bouton « précédent ».

**B2 · La page d'erreur est celle du produit.**
`src/pages/404.astro` utilise `Layout` + `Nav` du produit : anglais, palette
braise, menu « How it works / Writing / Request Access ». Un prospect qui
tape mal `/methode` atterrit sur une page qui lui propose de s'inscrire à la
liste d'attente d'un outil pour développeurs. Le seul lien vers `/` est dans le
corps. Sa balise `canonical` vaut `https://kigumi.app/404/`.

**B3 · `/lab` et `/lab/harness` disent le contraire.**
- `/lab` : « Le chantier qu'on mène ici **n'est pas un produit qu'on vous
  vend** ».
- `/lab/harness` : titre « Kigumi — AI made code cheap. Kigumi makes change
  safe. », bouton « Request Access », formulaire de liste d'attente Loops.

Le visiteur lit, à un clic d'écart, que ce n'est pas un produit puis qu'il
peut demander un accès anticipé. Ce n'est pas un problème de navigation, mais
c'est la navigation qui le met en évidence. **À trancher avant d'écrire une
ligne de code** (voir §5).

### Importants

**I1 · Deux identités sous le même nom.**
Les pages produit s'appellent « Kigumi » (« How Kigumi Works », « Kigumi
home »), la carte de `/lab` les appelle « Harness ». Le visiteur ne sait pas si
Kigumi est le studio ou l'outil. Le menu du produit n'indique jamais qu'on est
*dans le lab* d'un studio.

**I2 · Le logo du produit enfreint la règle de marque.**
`Nav.astro` et `Footer.astro` posent le K dessiné (`LogoMark`) suivi de
« igumi » en texte. Le README du site studio l'interdit : *« Ne jamais écrire
"Kigumi" dans une police à cet emplacement, ni poser le K seul à côté du mot
composé. »* Le studio, lui, utilise l'image `lockup-horizontal.svg`.

**I3 · Le blog est introuvable.**
`/blog/` existe, est rédigé (« Ce qu'on apprend en chemin »), figure dans le
sitemap, mais aucune page n'y mène. Il est vide : la collection `blog` n'a
aucun article, et le build l'annonce à chaque fois.

**I4 · Deux pages vides mises en avant.**
`/lab/harness/writing/` affiche « Nothing published yet. Soon. » ; elle est
pourtant dans le menu **et** le pied du produit. `/blog/` est vide aussi. Les
deux sont dans le sitemap : une fois `INDEXABLE` levé, Google indexera deux
pages sans contenu.

**I5 · Trois noms pour la même chose.**
« Blog » (studio), « Writing » (produit), « notes de travail » (texte de
`/lab`). Si `/lab` annonce des notes, le lecteur les cherche sous `/lab` ; elles
sont sous `/lab/harness/writing`, et rien ne les relie depuis `/lab`.

**I6 · Chaque lien interne coûte une redirection.**
Les liens s'écrivent sans barre finale (`/methode`, `/lab/harness/how-it-works`)
alors que le site est construit en répertoires (`/methode/`). Le serveur
répond `307` puis sert la page : un aller-retour réseau de plus à chaque clic,
sur tout le site. Le sitemap et les `canonical` portent bien la barre finale :
seuls les liens divergent.

**I7 · Deux adresses de contact.**
Studio : `contact@kigumi.app` (11 occurrences). Produit : `hello@kigumi.app`
(pied de page). Si les deux sont des alias Workspace, ce n'est qu'une
incohérence ; sinon l'une des deux tombe dans le vide.

### Mineurs

**M1 · Les pages de rôle sont à deux clics, par un seul chemin.** Les 7 pages
de rôle ne sont liées que depuis le corps de `/cas-usages`. Le menu allume bien
« Cas d'usages » quand on y est, mais le pied liste les trois profils et pas
les rôles. Acceptable si c'est voulu ; à confirmer.

**M2 · Deux jeux de favicons.** `/studio/favicon/favicon.svg` côté studio,
`/favicon.svg` côté produit. L'onglet change d'icône quand on passe de l'un à
l'autre.

**M3 · Bascule clair/sombre absente du produit.** Le studio mémorise un mode ;
le produit l'ignore. Un visiteur en mode clair repasse au sombre en un clic.

**M4 · Deux systèmes typographiques.** Le produit charge Inter, Lora,
JetBrains Mono (Google Fonts) et Satoshi (Fontshare) ; le studio a ses propres
tokens. Volontaire d'après le commentaire de `StudioLayout.astro`, mais ça
renforce l'effet « deux sites ».

**M5 · Le RSS n'est annoncé que côté produit.** `<link rel="alternate">` vers
`/lab/harness/rss.xml` dans `Layout`, rien dans `StudioLayout`, et pas de flux
pour `/blog`.

**M6 · Mentions légales.** L'hébergeur est encore « GitHub + Cloudflare ».
Déjà prévu au §6 d'`A-FAIRE.md`. Le site tourne désormais sur un Worker :
« Cloudflare » seul sera exact.

---

## 4. Ce qui va bien

- Le site du studio est cohérent : 20 pages sur 20 partagent le même menu et le
  même pied, le menu allume la bonne entrée, les pages générées depuis
  `cas.json` se rattachent au bon groupe.
- Les 5 redirections 301 de l'ancien site produit fonctionnent.
- Aucun lien cassé, aucune page produite hors du sitemap (hors `/admin/` et la
  404, à raison).
- `/lab` est bien écrit, en français, dans la mise en page du studio, et prévient
  que la suite est en anglais.
- `canonical` et `og:url` sont justes sur toutes les pages (sauf la 404).

---

## 5. Propositions — rien n'est appliqué

### D'abord, une décision : qu'est-ce que `/lab/harness` ?

| Option | Ce que ça implique |
|---|---|
| **A · Un chantier du studio** | On retire « Request Access » et la liste d'attente, ou on les reformule (« suivre le projet »). Le produit perd son nom propre « Kigumi » au profit de « Harness ». `/lab` reste vrai. |
| **B · Un produit à part entière** | On réécrit le passage de `/lab` qui dit le contraire. Le produit garde sa page d'atterrissage, mais avec un fil d'Ariane qui dit « Kigumi Lab › Harness ». |

Ma recommandation : **A**. C'est ce que `/lab` affirme déjà, et c'est ce que le
positionnement du studio soutient : on vend des processus, pas un outil.

### Ensuite, la navigation (indépendant de la décision)

1. **Une barre de retour au studio sur toutes les pages produit.** Une ligne
   fine au-dessus du menu produit, dans la palette du studio :
   `Kigumi › Lab › Harness`, chaque segment cliquable. Le menu produit reste
   intact en dessous. Corrige B1 et I1 d'un coup.
2. **Le logo produit** : remplacer « K + igumi » par le mot-symbole officiel,
   ou par « Harness » en texte. Corrige I2.
3. **La 404 passe au studio** : `StudioLayout`, en français, avec un lien vers
   l'accueil, `/cas-usages` et `/lab`. Sans `canonical`. Corrige B2.
4. **Le pied du produit** reçoit les liens studio essentiels : Studio (`/`),
   Lab (`/lab/`), Contact (`/contact`), Mentions légales. Une seule adresse de
   contact. Corrige I7 et complète 1.
5. **Les notes ont une seule maison.** Soit `/lab` liste directement les
   derniers essais de `/lab/harness/writing`, soit on les déplace sous
   `/lab/notes`. Et `/blog` : on le relie depuis le pied du studio **quand il
   aura un premier article**, pas avant. Corrige I3, I4, I5.
6. **Sortir les pages vides du sitemap** tant qu'elles sont vides : filtre dans
   `astro.config.mjs`, conditionné au nombre d'articles. Corrige I4.
7. **Barre finale sur tous les liens internes** : `/${slug}/` dans les deux
   menus, les deux pieds et les liens du corps. Corrige I6.
8. Mineurs, au passage : un seul favicon (M2), lien RSS dans `StudioLayout`
   (M5).

### Ce qui reste à décider avec toi

- Option A ou B pour `/lab/harness` (bloque les points 1, 2, et le texte du 4).
- `hello@` ou `contact@` : laquelle reste ?
- Les pages de rôle doivent-elles apparaître dans le pied (M1) ?
- Bascule clair/sombre côté produit (M3) : on l'aligne ou le produit reste
  sombre par choix ?

---

## Méthode

- Analyse du HTML construit (`npm run build`, 24 pages) : chaque `<a href>`
  classé selon son conteneur (`header`, `nav`, `main`, `footer`), liens
  normalisés, graphe des liens entrants.
- Vérification sur l'adresse de production workers.dev : statuts, redirections
  301 et 307.
- Lecture de `Nav.astro`, `Footer.astro`, `studio/Nav.astro`, des trois mises en
  page, de `404.astro`, `lab/index.astro`, `blog/index.astro`, du sitemap.
