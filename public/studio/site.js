/* Kigumi — comportements du site.
   Deux choses seulement : la bascule écran ⇄ papier, et l'arrivée de section.
   Tout le reste est du CSS. Voir brand/brief-motion.md. */
(function () {
  var root = document.documentElement;
  // no-js est déjà retiré par le script en ligne du <head>, avant le premier rendu.

  /* ── Bascule écran ⇄ papier ────────────────────────────────────────
     Le sombre est le mode principal : c'est le défaut quel que soit le
     réglage système. Le clair est un choix explicite, retenu d'une visite
     à l'autre. */
  var btn = document.getElementById('modetoggle');
  var minuteur;

  function appliquer(mode, anime) {
    if (anime) {
      // L'attribut n'ouvre la transition longue que le temps du basculement.
      root.setAttribute('data-switching', '');
      clearTimeout(minuteur);
      minuteur = setTimeout(function () {
        root.removeAttribute('data-switching');
      }, 560);
    }
    root.setAttribute('data-mode', mode);
    if (!btn) return;
    var clair = mode === 'light';
    btn.setAttribute('aria-pressed', String(clair));
    btn.setAttribute('aria-label', clair ? 'Passer en mode sombre' : 'Passer en mode clair');
  }

  try {
    var retenu = localStorage.getItem('kigumi-site-mode');
    // Restauration au chargement : sans animation. Arriver n'est pas une action (§2.1).
    if (retenu === 'light' || retenu === 'dark') appliquer(retenu, false);
  } catch (e) {}

  if (btn) {
    btn.addEventListener('click', function () {
      var suivant = root.getAttribute('data-mode') === 'light' ? 'dark' : 'light';
      appliquer(suivant, true);
      try { localStorage.setItem('kigumi-site-mode', suivant); } catch (e) {}
    });
  }

  /* ── Arrivée de section ────────────────────────────────────────────
     Déclenchée par le défilement du lecteur — une action au sens du §2.1,
     contrairement au chargement de page. Jouée une seule fois : on cesse
     d'observer dès que la section est vue. */
  var cibles = document.querySelectorAll('main > section:nth-of-type(n+2)');
  if (!cibles.length) return;

  if (!('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(cibles, function (el) { marquer(el, false); });
    return;
  }
  /* Les explicatifs portent leur propre minutage dans explainers.css, poussé
     depuis brand/. On leur passe le relais de l'observateur plutôt que de
     redéclarer leurs règles ici : redéclarées, elles divergeraient. */
  function marquer(el, anime) {
    el.classList.add('vu');
    if (!anime) el.classList.add('sans-anim');
    Array.prototype.forEach.call(el.querySelectorAll('.kx'), function (svg) {
      svg.classList.add(anime ? 'joue' : 'fixe');
    });
  }

  var obs = new IntersectionObserver(function (entrees) {
    entrees.forEach(function (e) {
      if (!e.isIntersecting) return;
      marquer(e.target, true);
      obs.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

  Array.prototype.forEach.call(cibles, function (el) {
    var r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      // Déjà dans le champ au chargement : on la montre SANS animation.
      // Arriver sur une page n'est pas une action (brief-motion.md §2.1) ;
      // c'est la raison pour laquelle le filet de lampe a été refusé, et la
      // même règle doit valoir ici. Sans ce test, la première section visible
      // s'animait à chaque chargement.
      marquer(el, false);
    } else {
      obs.observe(el);
    }
  });
})();
