# Focal Docs (Jekyll / GitHub Pages)

Mobile-first, searchable, print-friendly guides for Focal Duo heaters.
Hosted free on GitHub Pages — you write Markdown, GitHub builds and serves it.
No Vercel, no build step you run.

## Turn it on (one time)

1. Create a GitHub repo and commit these files to it.
2. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, pick `main` and `/ (root)`.
3. Set `baseurl` in `_config.yml` to `/your-repo-name` (or leave `""` if you use a custom domain).
4. Wait ~1 minute. Your site is at `https://<you>.github.io/<repo>/`.

## Add a guide (the everyday task)

Create one file in `_guides/`, e.g. `_guides/troubleshooting.md`:

```markdown
---
title: Troubleshooting
audience: [customer, installer]
order: 6
summary: Fixes for the most common issues on site.
version: "1.0"
updated: "2025-11-13"
---

## Heater shows offline

Regular Markdown works: **bold**, tables, lists, ## headings.

{% raw %}{% include warn.html text="Check the rail switch is on before anything else." %}{% endraw %}
```

That's it — the new page and its search entry appear automatically on the next build.

## The building blocks

Everything is plain Markdown **except** these five reusable blocks. Copy-paste and edit:

```liquid
{% raw %}{% include warn.html text="A safety warning." %}

{% include dodont.html
   do="What to do."
   dont="What not to do." %}

{% include diagram.html src="clearances.svg"
   caption="Optional caption." %}

{% include step.html number="1"
   title="Step title"
   body="Step instructions."
   diagram="step-1.svg" %}

{% include checklist.html
   items="First check | Second check | Third check" %}{% endraw %}
```

- `diagram` / `step diagram=` look for files in `assets/diagrams/`.
- A missing diagram shows a "Diagram coming soon" placeholder automatically, so
  you can publish a guide's text before the art is ready.
- `checklist` items are separated by `|`.

## Diagrams

Drop SVG or PNG files in `assets/diagrams/`. Produce them by exporting a view
from Fusion, annotating in Figma/Canva (arrows, ✓/✗, callouts), and exporting as
SVG. Reference them by filename in `diagram`/`step` includes.

## Editing the look

The whole visual identity lives in `assets/style.css` (colors, type, the
do/don't cards, steps, print rules). Edit once; every guide updates.

## Preview locally (optional)

GitHub builds the real site for you, so this is optional. If you want a local
look before committing and have Ruby: `gem install bundler jekyll && jekyll serve`.
A no-Ruby preview renderer is included at `_preview_render.py` (used to generate
the design preview) — run `python3 _preview_render.py` and open `_preview/`.

## Not built yet (deliberate v1 scope)

- Notion authoring (writing Markdown directly for now)
- Per-order PDF assembly / config profiles
- Per-site QR codes
- Formal version control (each guide carries a `version` field as the seed)

Files prefixed with `_preview` are local-preview tooling and are ignored by
GitHub Pages (leading underscore + listed in `.gitignore` note below); they do
no harm if committed, but you can delete them.
