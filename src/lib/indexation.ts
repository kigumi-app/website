// Interrupteur unique d'indexation, pour tout le site : studio, lab, blog.
//
// Tant qu'il vaut false, chaque page porte `noindex, nofollow` et robots.txt
// interdit tout. On le passe à true le jour de la bascule DNS, pas avant :
// lever l'interdiction plus tôt ferait indexer l'adresse workers.dev, puis
// studio.kigumi.app juste avant qu'on le réaffecte à la console.
export const INDEXABLE = false;
