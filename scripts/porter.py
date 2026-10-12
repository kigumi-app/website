# -*- coding: utf-8 -*-
"""Porte une page rédigée du site bash vers Astro.

    python3 scripts/porter.py <slug> [slug…]

On extrait le corps du <main> du HTML *construit*, pas du build.sh : les
marqueurs de diagrammes et d'icônes y sont déjà remplacés et les SVG insérés
en ligne. Le portage est donc fidèle par construction — ce qu'on recopie est
exactement ce qui est servi aujourd'hui.

Ne convient qu'aux pages rédigées. Les pages engendrées depuis cas.json sont
reconstruites en Astro, pas recopiées : les figer en HTML perdrait le lien
avec les données.
"""
import html
import os
import re
import sys

BASH = "/Users/stephanemarin/Projects/Studio/website"
ICI = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def corps(src):
    m = re.search(r"<main>(.*)</main>", src, re.S)
    if not m:
        raise SystemExit("pas de <main> — page inattendue")
    return m.group(1).strip()


def liens(s):
    """« contact.html » devient « /contact », les ancres sont conservées."""
    return re.sub(r'href="([a-z0-9-]+)\.html(#[a-z0-9-]+)?"',
                  lambda m: f'href="/{m.group(1)}{m.group(2) or ""}"', s)


def entete(src, cle):
    if cle == "titre":
        t = re.search(r"<title>(.*?)</title>", src, re.S).group(1)
        return html.unescape(t.split("&mdash;")[0].strip())
    m = re.search(r'<meta name="description" content="([^"]*)"', src)
    return html.unescape(m.group(1)) if m else ""


def porte(slug):
    src = open(os.path.join(BASH, slug + ".html"), encoding="utf-8").read()
    t, d = entete(src, "titre"), entete(src, "description")
    a = slug
    out = (
        '---\nimport StudioLayout from "../layouts/StudioLayout.astro";\n---\n'
        f'<StudioLayout\n  titre={{{t!r}}}\n  description={{{d!r}}}\n  actif="{a}">\n'
        + liens(corps(src)) + "\n</StudioLayout>\n"
    ).replace("'", '"', 0)
    # Astro interprète les accolades : celles d'un style en ligne doivent être
    # protégées, sinon elles sont lues comme une expression JavaScript.
    out = out.replace("{", "{").replace("}", "}")
    chemin = os.path.join(ICI, "src", "pages", slug + ".astro")
    open(chemin, "w", encoding="utf-8").write(out)
    print(f"  {slug:<24} {len(corps(src)):>7} octets   actif={a or '—'}")


if __name__ == "__main__":
    for s in sys.argv[1:]:
        porte(s)
