# Le site face aux règles de voix du Studio

Analyse du 11 octobre 2026, sans modification du site. Référentiel :
`Studio/brand/guidelines.md` §0, §10 (anti-patterns) et §11 (passe anti-filler),
`Studio/brand/brief-ia.md` (règles de rédaction, mention obligatoire, prix,
anti-patterns) et `company/studio/voice/VOICE.md` (registre « Operations and
public », preuves).

Périmètre : les 22 pages françaises du build, lues en entier. Les 22 pages
anglaises en sont la traduction, avec la même structure. Tout ce qui est relevé en
français vaut aussi pour l'anglais, sauf mention contraire. Les quatre essais en
brouillon ne sont pas construits et restent hors périmètre.

---

## En bref

Le site respecte le fond de la marque. Il commence par le processus et le
problème, il ne cite aucun prix, il dit non quand il le faut, l'humain garde la
main et la bonne accroche est en tête. Les problèmes sont d'un autre ordre :

1. **Cinq problèmes de vérité ou de texte obligatoire** (§1). Ils passent avant
   le style, parce que la marque vend la preuve.
2. **Un tic d'écriture dominant : l'antithèse « X, pas Y ».** La règle en
   autorise une par texte. Le site en compte souvent cinq ou six par page, et la
   même thèse (« un système qui tourne n'est pas un système qui fait ce qu'on
   attendait ») revient presque mot pour mot sur trois pages.
3. **Des tirets cadratins dans des textes courts**, où la règle n'en tolère
   aucun : environ 22 dans la prose des pages et 21 dans les fiches de
   `cas.json`, répétés sur les pages de rôle.
4. **Des phrases miroirs.** La même idée est redite deux ou trois fois sur une
   même page : « les deux personnes qui vous vendent la mission », « utilisable
   sans nous ».

---

## 1. À corriger en premier : vérité et texte obligatoire

### V1. La mention illustrative est incomplète sur dix pages

Le brief l'impose « dès qu'un chiffre est montré » : *« Exemple illustratif —
construit à partir de situations observées dans le secteur, pas encore d'une
mission réalisée. Les ordres de grandeur sont des hypothèses. »*

| Page | Chiffres montrés | Mention actuelle | Il manque |
|---|---|---|---|
| Les 7 pages de rôle | « trois cents CV pour trois postes », « trois semaines », « trois jours », « six outils », « 48 heures »… | « Ces cas sont construits à partir de situations observées. » | « illustratif », « pas de mission réalisée », « hypothèses » |
| Conseil-ingénierie, Industrie, Service client | « trois ou quatre personnes pendant plusieurs jours », « une commande sur deux » | « construit à partir de situations observées… hypothèses » | « illustratif », « pas encore d'une mission réalisée » |
| Accueil, Fonctionnement, Mentions légales | — | Complète | — |

Le texte de ces pages vit dans `PageRole.astro` et les trois fiches. Une seule
formule commune, reprise mot pour mot, réglerait les dix pages.

### V2. L'appel de 45 minutes promet le livrable du Diagnostic

Plusieurs pages promettent qu'à l'issue des 45 minutes, le prospect repart avec
le classement de ses processus par coût :
- les 7 pages de rôle : « Le pré-diagnostic les classe par ce qu'ils vous
  coûtent — et vous repartez avec ce classement » ;
- le Lab, Fonctionnement et Cas d'usages : « On repart avec la liste de vos
  processus classés par ce qu'ils vous coûtent », et « avec lequel attaquer en
  premier » sur Cas d'usages ;
- l'accueil : « Vous repartez avec ce classement ».

C'est précisément le livrable du Diagnostic payant, sur deux à trois semaines
(méthode, brief). Un appel ne peut pas l'honorer. La promesse étant la preuve,
c'est le texte le plus risqué du site.

Le « on repart » est aussi ambigu : il dit que *nous* repartons avec la liste.

La formule du brief tient, elle : « 45 minutes pour savoir si ça vaut le coup ».

### V3. Du présent sur ce qui n'existe pas encore

La règle de preuve : rien ne doit laisser croire qu'une mission est livrée. Or
plusieurs phrases décrivent au présent des pratiques qui supposent des clients :
- Confiance : « Nous l'appliquons à tous les agents que nous déployons » ;
- Confiance : « Une base de données isolée par client », et l'hébergement « en
  France, chez Scaleway et OVHcloud » ;
- Fonctionnement : « un processus que nous automatisons ». La même page dit
  ensuite « Pas une mission réalisée ».

Si l'infrastructure est déjà en place, l'hébergement peut rester au présent. Les
pratiques par client, elles, sont des engagements : « nous l'appliquerons » ou
« chaque agent que nous déployons est tracé » les énonce comme tels.

À vérifier au passage : **« TypeSafe AI — États-Unis »** dans la liste des
fournisseurs de modèles. Je ne connais pas ce fournisseur, et la liste engage
devant un DSI.

### V4. La métaphore de menuiserie sur À propos

Guidelines §0 : « Pas de vocabulaire de menuiserie, pas de métaphore d'atelier
dans la copie. Il se voit. » La page À propos se termine pourtant par : « Kigumi
est aussi le nom d'une technique japonaise d'assemblage du bois, où les pièces
tiennent entre elles sans clou ni vis. C'est à peu près ce qu'on fait de vos
outils existants. »

C'est exactement ce que la règle exclut. « À peu près » est en plus une précaution
vide.

### V5. Les biographies ne disent plus la même chose

Ta nouvelle présentation dit « j'ai dirigé les équipes de développement ». Deux
endroits disent encore « l'ensemble des équipes » :
- l'accueil (« Stéphane y dirigeait l'ensemble des équipes de développement ») ;
- le bloc « Pourquoi nous deux » d'À propos, qui répète d'ailleurs les deux bios
  juste au-dessus.

« Trente ans de métier, à deux » arrondit vers le haut : 13 ans pour Julien, plus
« près de quinze » pour toi. « Près de trente ans » serait exact.

---

## 2. Anti-patterns (§10)

### 2.1 L'antithèse « X, pas Y » : la règle la plus enfreinte

Règle : une seule par texte, et seulement si la distinction aide le lecteur.

| Page | Nombre | Exemples |
|---|---|---|
| Harness | 6 | « Un système qui tourne n'est pas un système qui fait ce qu'on attendait » · « au lieu de constater qu'ils tournent » · « à partir de ce qui tourne, pas de ce que dit la procédure » · « Harness n'est pas une étape de plus » · « et pas ce que dit la procédure » · « vérifiable plutôt que déclaratif » |
| À propos | 5 | H1 « Deux associés, pas une agence généraliste… » · « un système qui tourne n'est pas… » · « on ne vérifie pas qu'ils tournent, on mesure ce qu'ils produisent » · « ce qui manque rarement… / ce qui manque presque toujours… » · « pas un commercial » |
| Lab | 5 | H2 « Pourquoi ce n'est pas un à-côté » · « au lieu de constater qu'ils tournent » · « Un logiciel qui tourne n'est pas… » · « n'est pas un produit qu'on vous vend : c'est la raison… » · « on mesure au lieu de supposer » |
| Méthode | 5 | « un rapport de priorisation chiffré, pas un prototype » · « vérifiable plutôt que déclaratif » · « les outils changent — ce que vous avez cessé de garder…, non » · « n'est pas un actif : c'est un projet documentaire » · « ce qui sépare un agent qui tient en production d'une démonstration » |
| Accueil | 3 | « Le critère n'est pas votre secteur, c'est la forme du travail » · « jamais un prototype » · « suit le besoin réel, pas l'inverse » |
| Conseil-ingénierie | 2 | H1 « faute de temps, pas faute d'arguments » · « Le gain qui compte n'est pas le temps économisé : c'est le dossier… » |
| Service client | 2 | H1 « Répondre plus vite ne suffit pas. Il faut que… » · « C'est la dernière ligne qui nous intéresse. Les autres… » |
| Cas d'usages | 2 | « ce ne sont pas des produits : ce sont des processus » · « Le critère n'est pas le secteur, c'est la forme du travail » |
| Confiance | 2 | « pas davantage » · « déployable au lieu de risqué » |
| Pages de rôle | 1 à 3 | Dans les fiches `cas.json` : « pas sur ce qui s'est passé », « pas seulement le symptôme », « vérifier plutôt que de croire », « avant l'envoi plutôt qu'après » |

Il y a aussi une répétition entre pages : la thèse « tourner n'est pas faire ce
qu'on attendait / on sait dire qu'il ne plante pas, rarement ce qu'il fait »
apparaît sur **À propos, Lab et Harness**, et deux fois sur Harness. « Mesurer au
lieu de constater qu'ils tournent » apparaît trois fois. Elle est forte une fois,
sur la page où elle compte (à mon sens Harness, ou ta bio). Ailleurs, elle devient
un slogan.

Principe pour corriger : garder sur chaque page l'antithèse qui porte la
distinction la plus utile (souvent le H1). Réécrire les autres en affirmation
directe, par exemple « Le livrable est un rapport de priorisation chiffré. Vous
pouvez vous arrêter là. » au lieu de « …chiffré, pas un prototype ».

### 2.2 Tirets cadratins

Règle : aucun dans un texte court, deux au plus par paragraphe long. Presque tous
les textes du site sont courts.

| Source | Tirets | Nature |
|---|---|---|
| `confiance.astro` | 13 | Surtout des séparateurs de liste (« Mistral AI — France », « Journaux techniques — 6 mois ») |
| `mentions-legales.astro` | 9 | Séparateurs de libellé (« SIREN — … ») |
| `cas.json` (FR, idem EN) | 21 | Prose : « — avec la source de chaque réponse », « — avec la cause probable »… Répétés sur les pages de rôle |
| `PageRole.astro` | 2 | La phrase d'appel finale, répétée sur les 7 pages de rôle |
| Méthode, Conseil, Cas d'usages, Fonctionnement, Industrie, Accueil, À propos | 2 à 4 chacune | Incises en prose (« — prix, quantités, délais, encours — ») |

Les séparateurs de liste (Confiance, Mentions légales) relèvent de la mise en
forme. Deux-points ou une présentation en tableau les remplacent sans réécriture.
Les incises en prose demandent une réécriture : point, virgule ou parenthèse.

### 2.3 Listes de trois par réflexe

Règle : le nombre suit le contenu. Les triades qui sonnent comme du rythme :
- « Vous relisez, vous corrigez, vous validez. » (Conseil-ingénierie)
- « On chiffre avant, on déploie ensuite, on mesure ce que ça a produit. » (À
  propos). La méthode compte quatre temps : la fondation disparaît pour le rythme.
- « répétitif, volumineux, et dépendant d'un savoir que personne n'a écrit »
  (Accueil et Cas d'usages, identique)
- « Chaque étape, chaque règle, chaque exception » (Harness, deux fois, et un H2
  de Fonctionnement)
- « Recruter, intégrer, répondre. » suivi de « Trois travaux à fort volume » (RH)
- « il lit un processus, en dresse la carte, et vérifie » (Harness)

D'autres triades viennent du contenu et sont légitimes : les trois cas de
l'accueil, les trois engagements de « Travailler ensemble » et les trois volets
de Harness (Voir, Changer, Vérifier). Les listes « Ce qu'on mesure » à trois
lignes sont à relire une par une. Si une troisième mesure n'est pas réellement
suivie, elle tombe.

### 2.4 Un motif répété : « le savoir que personne n'a écrit »

L'idée revient **11 fois** dans le texte français : « dans la tête », « écrit
nulle part », « personne n'a écrit », « vit dans… ». C'est l'observation centrale
de l'offre et elle est juste, mais à cette fréquence elle devient un tic de
marque. Elle porte sur la Méthode (« Pourquoi le contexte change tout ») et sur la
fiche Industrie. Ailleurs, un fait précis la remplace : « la table de
correspondance de vos références n'existe que chez votre ADV ».

### 2.5 « Honnête » et « silencieusement »

Une seule occurrence : « un agent les aurait reproduits en silence », en anglais
« silently » (Fonctionnement). L'usage est matériel : l'agent reproduirait l'erreur
sans que personne le voie. Il est conforme, mais c'est le mot exact que la règle
surveille. « sans que personne le voie » le remplacerait sans perte.

### 2.6 Vocabulaire

- **Noms d'outils.** Le brief exclut « CRM, ERP, GED… sauf si le client l'emploie
  lui-même ». Le site emploie « ERP » sept fois (accueil, Industrie,
  Fonctionnement, opérations) et un cas s'intitule « Votre CRM n'est jamais à
  jour ». Pour une ADV ou une direction commerciale, c'est leur propre mot :
  **à toi de trancher** si l'exception s'applique.
- **Anglicismes de métier** : « baseline » (légende de la Méthode),
  « route / routage les demandes » (Service client, AI Act). « Référence de
  départ » et « oriente » disent la même chose.
- Rien de « compile », « knowledge engine », « graphe de contexte », « spine
  ROI », « LLM » ni « RAG ». Conforme.

### 2.7 Les autres règles

- **Questions.** Elles sont toutes en titre d'appel final (« Ce cas ressemble au
  vôtre ? », « Lequel vous coûte le plus ? »), jamais en ouverture. Conforme.
  « Ce qui vous intéresse, c'est le résultat ? » (Harness) et « …c'est plutôt vos
  processus ? » (Lab) sont les plus maniérées.
- **Fausse décontraction, emoji, ponctuation excessive.** Aucun cas. Les flèches
  « → » sont de l'interface.
- **Références décoratives aux décisions internes.** Aucune.

---

## 3. Passe anti-filler (§11)

| Motif | Où | Constat |
|---|---|---|
| Phrase miroir | À propos | La même idée trois fois : le chapeau « Vous aurez les deux en face de vous », la phrase en gras « Les deux personnes qui vous vendent la mission sont les deux qui la font », puis l'appel « Vous aurez les deux associés en face de vous, pas un commercial ». S'y ajoute l'accueil |
| Phrase miroir | À propos, « Pourquoi nous deux » | Redit les deux bios qu'on vient de lire (dates, postes, « R&D et machine learning compris ») |
| Phrase miroir | Méthode | « Vous pouvez vous arrêter là et l'utiliser sans nous » apparaît dans le chapeau, l'étape Diagnostic et l'appel final, soit trois fois |
| Phrase miroir | Harness | Le chapeau énonce la thèse, puis « Pourquoi on le construit » la redit (« On sait dire qu'un programme ne plante pas… ») |
| Connecteur vide | À propos | « C'est pour ça qu'on… Et c'est pour ça qu'on… », deux fois de suite ; en anglais « That's why » deux fois |
| Précaution vide | À propos | « C'est à peu près ce qu'on fait de vos outils » (voir V4) |
| Parenthèse de crédibilité | Accueil | « Trente ans de métier, à deux » : à garder si c'est exact (voir V5), c'est une preuve plus que de l'autopromotion |
| Conclusion adoucie | Service client | « Les autres, beaucoup d'outils savent les améliorer. » redit la phrase d'avant. On peut finir sur « C'est la dernière ligne qui nous intéresse » |
| Vulnérabilité mise en scène | Lab | « Ce qu'on a compris, y compris quand ça nous a coûté. » : à garder seulement si un article le montre |

Ce qui ne doit **pas** tomber à la passe, conformément à la règle : les mentions
illustratives, « les ordres de grandeur sont des hypothèses », les réserves de
Confiance et de l'AI Act, et les « s'il ne le mérite pas, on vous le dira »
(« Dire non fait partie de l'offre », brief).

---

## 4. Ce qui est déjà conforme

- **Accroche.** Le H1 de l'accueil est l'accroche « site » du brief, et l'accroche
  courte n'est mélangée nulle part.
- **Prix.** Aucun sur le site (« Les tarifs sont communiqués à l'issue du premier
  échange »), comme le brief l'exige. Le refus d'une marge cachée sur l'IA est
  bien présent.
- **Promesses chiffrées.** Aucun « jusqu'à 70 % ». Les pages renvoient toutes à
  « on le chiffre chez vous ».
- **L'humain garde la main.** Le principe est rappelé partout où il est question
  d'autonomie (Confiance, fiches, Fonctionnement).
- **Registre.** Phrases courtes, le processus avant la technologie, des mesures
  précises dans chaque fiche. C'est le registre « Operations and public ».
- **Contraste.** Hors du sujet de la voix, mais vérifié : les mentions
  illustratives (`.muted`) sont bien en `--text-secondary`. En revanche, **les
  titres de colonne et la signature du pied de page** sont en `--text-dim`
  (`site.css`, `footer.site h4` et `.legal`). §1 bis l'interdit : un libellé de
  colonne est de l'information, et ce jeton échoue AA (2,89:1). La correction
  tient en deux lignes de CSS.

---

## 5. Proposition d'ordre de correction

1. **V2** : réécrire la promesse de l'appel. Elle tient dans une phrase reprise
   par `PageRole.astro` et 5 pages.
2. **V1** : une formule de mention unique, reprise mot pour mot sur les 10 pages.
3. **V3, V4, V5** : le temps des verbes sur Confiance et Fonctionnement, retirer
   le paragraphe de menuiserie, aligner les bios et « trente ans ». Vérifier
   « TypeSafe AI ».
4. **Antithèses et phrases miroirs**, page par page. Le gros de la réécriture
   porte sur Harness, Lab, À propos et Méthode.
5. **Tirets** : `cas.json` (21) et les incises en prose, puis les séparateurs de
   Confiance et des Mentions légales.
6. **L'anglais suit le français**, page pour page. `cas.json` porte les deux
   langues côte à côte.

Chaque réécriture passe par toi avant publication. La règle de voix le demande
(« Rédiger ne donne pas l'autorisation de publier »), et ce sont des textes que
tu as relus.

## Points à trancher par toi

- Faut-il garder « ERP » et « CRM » parce que ce sont les mots du lecteur ?
- Laquelle des pages garde la thèse « tourner n'est pas faire ce qu'on
  attendait » : ta bio, le Lab ou Harness ?
- Les pages Harness peuvent-elles adopter un registre plus technique, ou restent-
  elles au registre « public » ?
- Mentions légales : la règle des tirets s'applique-t-elle au registre « Neutral
  and formal », ou garde-t-on ces séparateurs de libellé ?
