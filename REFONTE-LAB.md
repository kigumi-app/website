# Refonte du lab — Harness devient un outil du studio

> Proposition du 11 octobre 2026. Fait suite à `RAPPORT-NAVIGATION.md`.
> Décision prise : `/lab/harness` est **un chantier du studio**, un outil
> interne ouvert sur sélection. La page sert à montrer une expertise, pas à
> vendre un produit. Rien n'est encore appliqué.

## Décisions du 11 octobre 2026

| # | Question | Réponse |
|---|---|---|
| 1 | Langue | **Tout le site en français et en anglais**, pas seulement le lab (§8) |
| 2 | Nom | **Harness** est conservé : outil interne, et le nom dit ce qu'il fait (*harness engineering*) |
| 3 | Blog et notes | **Fusion.** Une seule rubrique ; les articles du lab y portent une étiquette |
| 4 | Exemple de la page Fonctionnement | **Un processus du studio** : le traitement d'une commande en pièce jointe (§4.3) |
| 5 | Essais de « catégorie » | **Restent en brouillon**, relecture par Stéphane |
| 6 | Ce que reçoit le client | **Rien n'est promis.** La section disparaît : accès sur sélection, la page sert la démonstration d'expertise |


---

## 1. Ce qui change, en une page

| | Aujourd'hui | Après |
|---|---|---|
| **Ce que c'est** | Un produit SaaS, « Kigumi » | Un outil du studio, « Harness » |
| **Pour qui** | CTO de start-up de 5 à 50 ingénieurs, investisseurs | Prospects du studio qui veulent savoir *comment* on vérifie ; lecteurs techniques sensibles à l'expertise |
| **Appel à l'action** | « Request Early Access », liste d'attente Loops | « Voir la méthode », « Prendre rendez-vous » |
| **Mise en page** | Celle du produit : autre logo, autre menu, pas de retour au studio | En-tête et pied du studio, avec un fil d'Ariane `Lab › Harness` |
| **Le nom Kigumi** | Désigne à la fois le studio et l'outil | Désigne le studio, et rien d'autre |
| **Les essais** | Une voix de fondateur de start-up qui crée une catégorie | Les notes de travail d'un studio |

**Le fil conducteur** : la méthode promet de *mesurer ce que les agents
produisent au lieu de constater qu'ils tournent*. Harness, c'est **comment** on
tient cette promesse. Le lab cesse d'être un produit à côté du studio : il
devient la preuve qui étaie la méthode.

---

## 2. Le positionnement

### Ce qu'on dit de Harness

> L'outil avec lequel on vérifie ce que font les systèmes qu'on livre. Il lit
> un système, en dresse la carte de ses comportements (états, décisions,
> règles, flux) et vérifie que chacun fait ce qu'on attendait. On l'utilise sur
> chaque mission ; quelques équipes choisies y ont accès.

### Le lien avec la méthode

Harness intervient à trois moments de la méthode, et chacun peut devenir un
lien depuis `/methode` :

| Bloc | Ce que Harness y fait |
|---|---|
| **Fondation** | Cartographier l'existant avant d'y toucher : ce que fait vraiment le processus, pas ce que dit la procédure |
| **Déploiement** | Montrer ce qu'un changement affecte avant qu'il parte, et le faire relire |
| **Pilotage et vérification** | Vérifier en continu que chaque comportement attendu est tenu, et dire où sont les écarts |

### Ce qu'on ne dit plus

- « AI made code cheap. Kigumi makes change safe. » : un slogan de produit.
- « Request Early Access » et « Join the waiting list ».
- « For technical founders and CTOs ».
- « Import your repo » à l'impératif, comme si le visiteur l'utilisait seul.
  C'est le studio qui s'en sert.

---

## 3. L'arborescence proposée

```
/lab/                              Le lab — ce qu'on construit pour nos missions
├── /lab/harness/                  Harness — présentation
└── /lab/harness/fonctionnement/   Les quatre temps, avec les écrans
/blog/                             Une seule rubrique (ex-/blog + ex-/lab/harness/writing)
├── /blog/<slug>/
└── /blog/etiquette/lab/           Les articles du lab, filtrés par étiquette
```

Version anglaise sous `/en/` (§8).

**Pourquoi tout va dans `/blog`** : décision 3. Une seule collection, une
seule adresse, un seul flux RSS, un seul endroit où écrire dans le CMS. Les
articles du lab portent l'étiquette `lab`, plus une étiquette par chantier
(`harness`). `/lab` et `/lab/harness` listent les derniers articles de leur
étiquette.

**Redirections 301 à ajouter** dans `public/_redirects` :

```
/lab/harness/how-it-works   /lab/harness/fonctionnement/   301
/lab/harness/writing        /blog/etiquette/lab/           301
/lab/harness/writing/*      /blog/:splat                   301
/lab/harness/rss.xml        /blog/rss.xml                  301
```

Les cinq redirections existantes de l'ancien site sont à repointer vers ces
nouvelles cibles, pour éviter une double redirection.

---

## 4. Page par page

### 4.1 `/lab/` — à retoucher

La page existe et elle est juste sur le fond. Trois changements :

- **La carte Harness** dit ce que c'est pour le studio :
  > **Harness** · Outil interne
  > L'outil avec lequel on vérifie ce que font les systèmes qu'on livre.
  > Utilisé sur chaque mission, partagé avec les clients qui le souhaitent.
- **Une section « Ce qu'on en écrit »** liste les trois derniers articles
  étiquetés `lab`, avec un lien vers `/blog/etiquette/lab/`. Elle n'apparaît
  que s'il y en a au moins un publié.
- **La phrase sur l'anglais disparaît** : le site entier devient bilingue.

### 4.2 `/lab/harness/` — à réécrire

Mise en page du studio, en français. Structure proposée :

1. **Fil d'Ariane** : `Lab › Harness`
2. **En-tête**
   > *Lab · Outil interne*
   > **Savoir ce que fait un système, et pouvoir le prouver.**
   > *(en : « Know what a system does, and be able to prove it. »)*
   > Un système qui tourne n'est pas un système qui fait ce qu'on attendait.
   > Harness est l'outil avec lequel on fait la différence, sur chaque mission.
3. **Pourquoi on l'a construit** : un paragraphe qui reprend la promesse de la
   méthode et le constat de `/lab` (« on sait dire qu'un programme ne plante
   pas ; on sait rarement dire ce qu'il fait »).
4. **Ce qu'il fait** : les trois blocs actuels, reformulés :
   - *Voir le système* : la carte de chaque comportement (états, actions,
     conditions, flux de données)
   - *Changer en connaissance de cause* : voir ce qu'un changement affecte
     avant de le faire, et le relire avant qu'il parte
   - *Garder la raison d'être* : chaque comportement garde son pourquoi. Pas
     une documentation qui vieillit, une structure qui se vérifie
5. **Où il intervient dans nos missions** : le tableau Fondation / Déploiement
   / Pilotage du §2, chaque bloc lié à son ancre sur `/methode`.
6. **Statut, dit franchement**
   > Harness n'est pas en vente. On le construit pour nos missions, et on
   > l'ouvre à quelques équipes que nous choisissons.
7. **Ce qu'on en écrit** : les derniers articles étiquetés `harness`.
8. **Appel à l'action du studio** : « Voir la méthode » et « Prendre
   rendez-vous ». Puis un lien discret : « Comment ça marche, écran par écran
   → ».

Le schéma actuel (« kigumi — saas-starter », 38 nœuds, 47 arêtes) peut rester
comme illustration, renommé `harness — exemple`, **avec la mention
illustrative** qu'impose la règle de marque.

### 4.3 `/lab/harness/fonctionnement/` — à adapter

C'est la page la plus solide : les quatre temps (*Import, Reason, Evolve,
Verify*) et leurs écrans sont la meilleure preuve du lab. On garde la
structure.

- **Titres en français** : Lire · Comprendre · Faire évoluer · Vérifier.
- **Le sujet change** : « Point it at your codebase » devient « On l'applique
  au système », et « Tell Kigumi what to build » devient « On décrit le
  changement, Harness propose, quelqu'un relit ».
- **Les écrans** sont renommés de `kigumi - import` en `harness — lecture`, etc.
- **Les chiffres** sont illustratifs : **mention obligatoire**, comme pour les
  fiches de cas.
- **Appel à l'action** : celui du studio, plus un lien vers la fiche de cas
  `/industrie-distribution/`.

#### L'exemple : une commande qui arrive en pièce jointe

Décision 4 : l'application de démonstration (connexion, panier, mot de passe)
est remplacée par **un processus que le studio livre**, celui de la fiche
*« Vos commandes arrivent en désordre »* (`cas.json`, `industrie-distribution`).
Le visiteur qui a lu la fiche retrouve le même processus, cartographié puis
vérifié. Les quatre écrans, dans l'ordre :

**01 · Lire** — *On l'applique au processus tel qu'il tourne.*

```
harness — lecture · commandes-clients
Sources lues
  boîte commandes@            1 240 messages, 6 mois
  ERP                         clients, articles, conditions
  grille de remises           tableur partagé
Relevé
  62  comportements
  18  règles de gestion
   9  exceptions traitées à la main
```

**02 · Comprendre** — *Chaque étape, chaque règle, chaque exception. Visibles.*
La carte du processus, un nœud sélectionné :

```
Identifier le client                               Étape · Agent
  Étant donné  une commande reçue en PDF
  Quand        l'expéditeur n'est pas un contact connu
  Alors        chercher le numéro client dans le document,
               sinon remonter à l'ADV
```

**03 · Faire évoluer** — *On décrit le changement. Harness propose, quelqu'un
relit.*

```
Demande   Au-delà de 20 000 €, une commande passe par la validation
          du responsable ADV avant la saisie.

Proposé   + Seuil de validation          condition
          + Validation ADV               étape humaine · requise
          ~ Saisie dans l'ERP            attend la validation
                                         [ Accepter ]  [ Refuser ]
```

Cet écran montre aussi le réglage d'autonomie de la méthode : une étape
humaine *requise*, posée là où le risque le justifie.

**04 · Vérifier** — *17 comportements sur 19 vérifiés. On sait où sont les
écarts avant qu'ils coûtent.*

```
✓ Client identifié par l'adresse ou le numéro client
✓ Références rapprochées du catalogue
✓ Conditions tarifaires du client appliquées
✓ Cohérence contrôlée avant la saisie
✓ Commande au-delà du seuil validée par l'ADV
✗ Référence inconnue du catalogue : aucun chemin de remontée
✗ Remise exceptionnelle : règle absente de la grille
```

Les deux écarts ont été choisis pour que la démonstration montre une vraie
valeur : ce sont des cas que le processus manuel absorbait sans que personne
ne les ait jamais écrits.

**Le lien avec la mesure** : la fiche promet de mesurer le temps de traitement,
le taux d'erreur de saisie et le coût des avoirs évités. La page peut finir
sur cette phrase : *« Ce qui est vérifié ici, c'est ce qui se mesure ensuite. »*

### 4.4 Les essais — rejoignent `/blog`, restent en brouillon

Les quatre essais passent dans la collection `blog`, étiquetés `lab` et
`harness`, **toujours en `draft: true`** (décision 5) : Stéphane les relit
avant toute publication. Lecture à l'aune du nouveau positionnement, pour
cette relecture :

| Essai | Verdict |
|---|---|
| *The oracle gap* | **Garder.** Décider si une réécriture fait encore ce qu'il faut : c'est exactement le sujet de Harness et de la méthode. |
| *The metric AI coding tools optimize is the wrong one* | **Garder**, en recentrant la conclusion sur la mesure plutôt que sur les outils de code. |
| *Building a category before it has a name* | **Retirer ou réécrire.** Voix de fondateur de start-up (« the hardest part of this company »), c'est le récit d'un produit. |
| *Behavior infrastructure is weird now* | **Retirer ou réécrire.** Un argumentaire de création de catégorie, destiné à des investisseurs. |

- **Le schéma `pillar`** (`category-creation`, `founder-journey`,
  `builder-notes`, `intent-gap`) est une taxonomie de marketing produit. Il
  est remplacé par `etiquettes` (liste libre, avec `lab` et `harness` pour
  commencer), éditable dans le CMS.
- **La mise en page des articles** passe au studio (`StudioLayout` ou une
  variante « article »). Le pied « Code changes. Behavior persists. » et le
  bouton « Request Early Access » disparaissent.

### 4.5 `/blog/` — la rubrique unique

- Une collection `blog` : les articles du studio et ceux du lab, distingués
  par étiquette.
- La page `/blog/` affiche les étiquettes en filtre ; chaque étiquette a sa
  page (`/blog/etiquette/<nom>/`).
- **Le CMS** n'a plus qu'une collection à configurer, avec un champ
  `etiquettes` et un champ de langue (§8).
- `/blog` entre dans le pied du studio **au premier article publié**, pas
  avant.

### 4.6 `404` — à passer au studio

`StudioLayout`, en français, avec trois sorties : accueil, cas d'usages, lab.
Sans `canonical`.

---

## 5. Ce qui change autour

### Navigation

- **Un seul en-tête et un seul pied pour tout le site.** Les composants
  `components/Nav.astro` et `components/Footer.astro` du produit disparaissent
  avec leur logo « K + igumi », qui réglait au passage l'infraction à la règle
  de marque.
- **Le menu du studio reste à quatre entrées.** Le lab est atteignable par le
  pied (déjà en place) et par `/methode` (nouveau, depuis les trois blocs).
- **Une sous-navigation locale** dans le lab, sous le fil d'Ariane :
  `Présentation · Fonctionnement · Articles`.
- **Barre finale** sur tous les liens internes, pour supprimer les
  redirections 307 (constat I6 du rapport).

### Design

- **On retient** les écrans du produit (terminaux, graphe, fausse
  interface) : ils sont l'atout visuel du lab. On les intègre comme
  illustrations dans la palette noyer, en conservant leur caractère « atelier ».
- **On abandonne** `Layout.astro`, `global.css` du produit, la palette braise
  comme fond de page, et la pile Inter / Lora / Satoshi chargée chez Google et
  Fontshare.
- **`PRODUCT.md` et `DESIGN.md`** décrivent le site produit. On les archive, ou
  on les réécrit pour le lab.

### Ce qui disparaît

- **Le formulaire Loops** et la liste d'attente. **Avant de le retirer**,
  exporter la liste. Les inscrits ont demandé un accès à un produit qui n'en
  sera pas un : un mot pour le leur dire est la moindre des choses, et certains
  sont peut-être des prospects pour le studio.
- **`hello@kigumi.app`** : tout passe sur `contact@kigumi.app`.
- **Le flux RSS** déménage sous `/blog/rss.xml` (un par langue) et devient
  annoncé sur tout le site.

---

## 6. Ce qu'il reste à décider

Rien : toutes les décisions sont prises. Reste la relecture des essais et de
la traduction anglaise.

---

## 7. Ordre de réalisation proposé

| Étape | Contenu | Bloquée par | Effort |
|---|---|---|---|
| 1 | Un seul en-tête et un seul pied, 404 au studio, fil d'Ariane, barre finale | rien | ½ journée |
| 2 | Charpente bilingue : routage `/en/`, sélecteur de langue, `hreflang`, sitemap, textes d'interface | choix du §8 | ½ journée |
| 3 | `/lab/harness` réécrit (fr), formulaire Loops retiré après export | étape 1 | ½ journée |
| 4 | `/lab/harness/fonctionnement` (fr), écrans redessinés sur l'exemple de la commande | étape 1 | 1 journée et demie |
| 5 | Fusion blog : collection unique, étiquettes, essais déplacés en brouillon, redirections, CMS | étape 2 | ½ journée |
| 6 | Liens depuis `/methode` | étape 3 | 1 heure |
| 7 | Traduction anglaise des 24 pages (première version par Claude, relecture par vous) | étapes 2 à 5 | 1 à 2 journées, plus relecture |

L'étape 1 peut partir tout de suite : elle règle les trois problèmes bloquants
du rapport de navigation, quel que soit le texte final. Le filet de
non-régression (`npm run verifier`) relèvera les écarts de structure page par
page. Il faudra reprendre la référence après l'étape 2, puisque le contenu
change volontairement.

**Tout se fait avant la bascule DNS.** Rien de ce qui précède n'est visible
tant que `kigumi.app` pointe vers GitHub Pages.

---

## 8. Le site bilingue

Décision 1 : tout le site en français et en anglais. C'est le changement le
plus lourd de la refonte : il double les pages à tenir, et chaque
modification de texte devra être faite deux fois.

### Ce que je propose par défaut

| Choix | Proposition | Pourquoi |
|---|---|---|
| Langue par défaut | **Français à la racine** (`/methode/`), anglais sous **`/en/`** | Les clients sont des PME et ETI françaises, et les URL actuelles ne bougent pas |
| URL anglaises | **Traduites** : `/en/method/`, `/en/working-together/`, `/en/about/` | Une URL lisible dans la langue du lecteur. Coûte une table de correspondance |
| Sélecteur | Dans l'en-tête, `FR · EN`, renvoie vers **la même page** dans l'autre langue | Jamais vers l'accueil : on perd le lecteur |
| Détection | **Sur l'accueil seulement** : premier passage sur `/` avec un navigateur qui préfère l'anglais → redirection `302` vers `/en/`. Choix mémorisé dans un cookie `langue` dès qu'on utilise le sélecteur. Jamais pour les robots. Aucun bandeau sur les autres pages | Le visiteur arrive dans sa langue ; un lien partagé ouvre toujours ce qui a été partagé |
| Référencement | `hreflang` fr / en / x-default sur chaque page, sitemap avec alternatives | Pour que Google serve la bonne langue |
| Articles | **Langue par article**, pas de traduction obligatoire. Un article peut exister en une seule langue | Les essais sont écrits en anglais, les articles de Julien le seront peut-être en français : forcer la traduction freinerait la publication |
| Fiches de cas | `cas.json` reçoit les champs anglais à côté des champs français | Un seul fichier, contrôlé au build : une fiche sans traduction fait échouer la construction |
| Traduction | **Première version par Claude, relecture par vous** | Le registre compte (assertif, sans jargon) ; la relecture n'est pas facultative pour `/confiance` et les mentions légales |

### Ce que ça change ailleurs

- **Règles de marque** : elles valent dans les deux langues. Pas de jargon
  interne en anglais non plus (« context graph », « orchestration »).
- **Mentions légales** : la version française fait foi ; la version anglaise
  le dit.
- **Le filet de non-régression** doit couvrir les deux langues : 24 routes
  deviennent environ 48.
- **Le CMS** : Sveltia gère l'internationalisation. Les articles reçoivent un
  champ `langue`.

### Arrêté le 11 octobre 2026

1. **URL distinctes** : français à la racine, anglais sous `/en/`. Une même URL
   servie dans les deux langues a été écartée : Google n'en indexerait qu'une,
   et `hreflang` deviendrait impossible.
2. **Slugs anglais traduits** (`/en/method/`, `/en/about/`).
3. **Détection sur l'accueil seulement**, sans bandeau ailleurs. Elle demande
   un peu de code côté Worker (`run_worker_first` sur `/`) : le reste du site
   reste servi en fichiers statiques.
4. **Relecture de l'anglais** : Stéphane.
