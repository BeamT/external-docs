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

Everything is plain Markdown **except** a set of reusable blocks in `_includes/`.
The most commonly used ones:

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
- The rest live in `_includes/` — `nextlink.html` (chains one guide to the
  next, e.g. end of the installer sequence), `fixitbanner.html` (links to the
  troubleshooting tool, see below), `contact.html`, `serial.html`,
  `video.html`, `railtable.html`, and a few more. Check the directory listing
  rather than assuming this list is exhaustive.
- ⚠️ Any include (or raw HTML in a `.md` file) that nests block-level tags
  (`<div>`, `<h2>`) inside a single-line `<a>` will get mangled by real
  Jekyll's kramdown parser, even though the no-Ruby preview won't show the
  bug. Use `<span>`s instead, following `nextlink.html` / `fixitbanner.html`.
  See "Preview locally" below for how to catch this before it ships.

## Diagrams

Drop SVG or PNG files in `assets/diagrams/`. Produce them by exporting a view
from Fusion, annotating in Figma/Canva (arrows, ✓/✗, callouts), and exporting as
SVG. Reference them by filename in `diagram`/`step` includes.

## Editing the look

The whole visual identity lives in `assets/style.css` (colors, type, the
do/don't cards, steps, print rules). Edit once; every guide updates.

## The homepage and the troubleshooting tool

`index.html` is the landing page. It organizes guides **by audience**
(Electrician / Installer / Restaurant / All), not by topic — a filter-chip
row plus client-side JS re-sorts and re-filters the `site.guides` collection
using each guide's `audience` / `audience_order` front matter. It also
supports deep-linking a specific audience view via `?a=installer` (used by
the printed packet's QR code and the `/installer/`, `/electrician/`,
`/restaurant/` share-link redirect pages at the repo root).

Above that filtered grid sits a featured banner (not a guide card) linking to
`/fixit/` — the interactive troubleshooting wizard. `fixit.html` is a
standalone, self-contained page (own inline `<style>`/`<script>`, a small
decision-tree JS engine, no shared site chrome) that walks a customer through
diagnosing an issue step by step and ends in a prefilled `mailto:` link to
Focal Support, tagged with a machine-readable issue code for later reporting.
It deliberately shares no header/nav with the rest of the site today — see
"Roadmap" below for why, and what's planned to change that.

`_guides/troubleshooting.md` (the static, full step-by-step reference guide)
and `/fixit/` (the interactive wizard) intentionally coexist — the guide links
to the wizard near the top and again in its "Still stuck?" section, but keeps
its own full content rather than becoming a stub, at least for now.

## Preview locally (optional)

GitHub builds the real site for you, so this is optional.

**Real Jekyll (exact parity with GitHub Pages)** — the most reliable option,
since it's the same renderer GitHub Pages uses. Needs Ruby (already on most
systems: `ruby -v`). On Ruby 3.4+, a couple of gems that used to ship with
Ruby by default now need installing explicitly:

```
gem install --user-install jekyll bundler erb webrick
export PATH="$HOME/.local/share/gem/ruby/3.4.0/bin:$PATH"   # match your ruby -v
jekyll serve --host 127.0.0.1 --port 4000 --baseurl ""
```

Then open `http://127.0.0.1:4000/`. Auto-regenerates on file changes; refresh
your browser to see them (add `--livereload` plus the `jekyll-livereload` gem
for auto-refresh).

⚠️ Real Jekyll uses kramdown for Markdown, which is stricter than it looks:
a raw HTML block (like `{% raw %}{% include %}{% endraw %}` output, or inline
HTML pasted into a `.md` file) that nests **block-level** tags (`<div>`,
`<h2>`, `<p>`) inside a single-line `<a>` gets mangled — kramdown escapes the
inner tags as literal text instead of parsing them. Inline-level tags
(`<span>`) inside that same `<a>` are fine. See `_includes/nextlink.html` and
`_includes/fixitbanner.html` for the working span-only pattern. This bug is
real on GitHub Pages but **won't show up** in the no-Ruby preview below, since
that's a simplified emulation, not real kramdown — always sanity-check new
raw-HTML includes with real Jekyll before trusting the Python preview alone.

**No-Ruby preview (approximate, faster to start)** — a hand-rolled emulator
included at `_preview_render.py` (handles front matter, `{% include %}`,
kramdown-ish markdown, both layouts). Needs `python3 -m pip install markdown`
(or your OS package, e.g. `pacman -S python-markdown`) for guide bodies to
render at all — without it, guide pages fall back to showing raw text. Run
`python3 _preview_render.py`, then serve `_preview/` over HTTP rather than
opening it via `file://` (the stylesheet is linked with an absolute path and
won't load otherwise): `python3 -m http.server 8000 --directory _preview`.

## Roadmap

Agreed but not yet done, in roughly the order they unblock each other:

1. **Bring `fixit.html` into the site's shared layout/chrome** (header/nav/
   footer via `_layouts/default.html` or similar), instead of it staying a
   bare standalone page. This is the central blocking item — the two below
   depend on it.
2. **Once #1 happens:** shrink `_guides/troubleshooting.md` into a short stub
   that forwards to `/fixit/`, instead of keeping the full step-by-step
   content duplicated in two places.
3. **"Help" vs. "Guides" naming** — once there's a shared nav/domain to label,
   decide whether the umbrella term for this part of the site is "Help"
   (covers both the wizard and the reference guides) or "Guides" (the term
   `_guides/` already uses).
4. **Move to a custom domain**, `support.focalheat.co`, for the whole site
   (guides + wizard together) — not a separate `help.` subdomain just for the
   wizard. No `CNAME` file exists yet. When this happens, update `url` and
   `baseurl` in `_config.yml` together (see the comments already in that
   file).
5. **Add page analytics** (Google Analytics or similar) to the homepage —
   nothing is wired up yet. Tool choice (GA4 vs. a lighter option like
   Plausible/Fathom) hasn't been decided.
6. **Update the support email address to `support@focalheat.co`**,
   replacing `hello@focalheat.co`, across `fixit.html`, `_includes/
   contact.html`, and `_guides/troubleshooting.md` (grep for the old address
   before changing it — this list can drift). Confirm the new address is
   live/monitored before shipping the change.

## Not built yet (deliberate v1 scope)

- Notion authoring (writing Markdown directly for now)
- Per-order PDF assembly / config profiles
- Per-site QR codes
- Formal version control (each guide carries a `version` field as the seed)

`_preview/` and `_site/` (local-preview and Jekyll build output) are listed in
`.gitignore` and ignored by GitHub Pages regardless (leading underscore); they
do no harm if committed, but there's no need to.
