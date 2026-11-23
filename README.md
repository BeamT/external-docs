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
product: restaurant
stage: [service]
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

## Tag every guide: Product, Stage, Mount

Every guide carries `product` and `stage` front matter. The terms are defined in
`GLOSSARY.md`.

- **`product`**: `restaurant`, `home` or `both`. A guide with no `product` is
  treated as Restaurant, so untagged content keeps today's behaviour. Tag
  every new guide explicitly anyway.
- **`stage`**: a list of `install`, `operate` and `service`, for example
  `stage: [install, operate]`. A guide can sit in several Stages. An empty list
  (`stage: []`) means the guide appears under All only. Stages are the same for
  every Product.
- **Order**: `install_order` and `operate_order` give the position of the guide
  within that Stage, one number per Product:
  `install_order: {restaurant: 40, home: 40}`. A guide tagged `both` gets a
  number for each Product; a guide with a single Product needs only that one.
  Leave a key out when the guide isn't in that Product's order. Service has no
  required order. Electrical & Power has an Install number but stays out of the
  "Next" chain and the print packet for now.
- **Mount**: the way a rail attaches (Overhead, and later Freestanding, Wall
  and Self-mount). Mount is not front matter. Mount-specific steps live in one
  clearly headed section of the guide, for example "Overhead mount" in
  Install Rails, so a new Mount means moving a section, not rewriting a guide.

`stage`, `install_order` and `operate_order` are data only for now: nothing
reads them yet (only `product` is read, by the guide layout, see below), so the "Next" chain and print packet still follow the
old fields. `audience` and `audience_order` are those old per-role fields. The
landing page, search index, "Next" link and print packet read them until the
Stage tabs replace them; keep them on existing guides and leave them off new
ones.

## Product-only content and the Guide Product tag

Wrap content for one Product in `productonly.html`. Capture the text first so
Markdown renders inside it, and put the block under the section's heading:

```liquid
{% raw %}{% capture hub %}Plug the Hub into the outlet.{% endcapture %}
{% include productonly.html for="restaurant" content=hub %}{% endraw %}
```

- `for` is `restaurant` or `home`. On screen the block shows only when it matches
  the Guide page's Product: the Guide's own Product, or for a guide tagged
  `both`, the saved choice (`focal-product` in `localStorage`, see `assets/product.js`), else Restaurant.
  In print both Products' blocks show, each with its label.
- The search index marks a section holding a block with `only` (`restaurant` or
  `home`), so Product-scoped search can skip it.
- Each guide header gets one line: "For Restaurants. View for Homes instead".
  On a guide tagged `both` the link flips the page in place; on a single-Product
  guide it goes to the other Product's version, set with `equivalent: /other-guide/`
  in front matter (no link without it). Opening a guide only reads the saved
  choice; clicking the link saves it. `assets/product.js` holds the read and write.
  The line does not print.
- All of this stays hidden until
  `home_enabled: true` in `_config.yml`. Until then the site is Restaurant only.
- `tests/guide-product.spec.js` builds its own copy of the site with the setting
  on. It needs Ruby and Bundler.

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

## Search

Search opens in one panel from the top-bar icon, the landing-page search
field, or the `/` key (on every page except `/fixit/`). On desktop it drops
below the top bar; on phones it fills the screen. Escape, Cancel or a click
outside closes it and returns focus to whatever opened it. A scope line under
the input says what is searched ("Searching all guides" while the Product
setting is off). It does full-text search over every guide, in the browser,
with no external service:

- `search.json` is a Liquid template. Jekyll builds it into a
  pre-computed index on every Pages build. It holds one record per `##`
  section of each guide, linked to that section's anchor, plus one hand-written
  record for the `/fixit/` wizard. New guides are indexed automatically.
  Guides with `unlisted: true` are left out, and so are "On this page" TOC
  sections.
- `assets/search.js` fetches the index the first time the panel opens,
  then searches it with [MiniSearch](https://github.com/lucaong/minisearch),
  which is vendored at `assets/vendor/minisearch.min.js` (MIT, ~6 KB gzipped).
  Search matches prefixes and tolerates typos ("clearence" finds
  "clearance"). Headings rank above body text. 
- To upgrade MiniSearch: `npm pack minisearch@<version>`, minify
  `dist/umd/index.js` (e.g. `npx terser -c -m`), and replace the vendored
  file, keeping the version/license header comment.
- `tests/search.spec.js` covers it. Run `jekyll build --baseurl ""` first,
  because the test reads `_site/` (it skips if `_site/` is missing).

## The homepage and the troubleshooting tool

`index.html` is the landing page. It organizes guides **by Stage**
(All / Install / Operate / Service) as tabs over a compact guide list, using
each guide's `product` and `stage` front matter, ordered by `install_order` /
`operate_order` (falling back to `order`). A tab with no Guides is hidden, and
the lead Guide (`lead: true`) is marked "Start here" on a Stage tab. The
address bar follows the current tab (`?stage=install|operate|service`). Old
`?a=installer|electrician` links open Install and `?a=customer` opens Operate;
the `/installer/`, `/electrician/` and `/restaurant/` redirect pages at the
repo root follow the same map (Restaurant opens Operate).

Above the tabs sits a featured banner (not a guide card) linking to
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
Ruby by default now need installing explicitly. The `Gemfile` pins them, so the
one-time setup is just bundler:

```
gem install --user-install bundler
export PATH="$HOME/.local/share/gem/ruby/3.4.0/bin:$PATH"   # match your ruby -v
_tools/preview.sh [page]        # e.g. _tools/preview.sh rail-installation
```

The script installs the gems into `vendor/bundle` on first run, starts Jekyll
on a free port (from 4000 up) with `--baseurl ""` and `--livereload`, reuses a
server already running for your checkout, and prints the page URL. The page
auto-regenerates and refreshes when you save. AI agents can run the same thing
with the `/preview` skill (`.agents/skills/preview/`).

⚠️ Real Jekyll uses kramdown for Markdown, which is stricter than it looks:
a raw HTML block (like `{% raw %}{% include %}{% endraw %}` output, or inline
HTML pasted into a `.md` file) that nests **block-level** tags (`<div>`,
`<h2>`, `<p>`) inside a single-line `<a>` gets mangled — kramdown escapes the
inner tags as literal text instead of parsing them. Inline-level tags
(`<span>`) inside that same `<a>` are fine. See `_includes/nextlink.html` and
`_includes/fixitbanner.html` for the working span-only pattern.

## Tests

`fixit.html` is a hand-rolled single-page app with no build step, but its
send-email button logic has bitten us once already (a stale `onclick`
silently blocked real clicks after a required field was filled in — looked
fine in the DOM, worked from DevTools, did nothing on a real tap). There's a
Playwright regression test for exactly that in `tests/`:

```
npm install
npx playwright install chromium
npx playwright test
```

It loads `fixit.html` directly (`file://`, no server needed), walks a
description-required and a heater-ID-required endpoint, and asserts the email
button is genuinely clickable (not just visually enabled) once its required
field is filled. Run it after touching `refreshEmailHref`, `buildEmailBody`,
`buildSubject`, or the `support`/`resolved` endpoint rendering in `render()`.

## Roadmap

Agreed but not yet done, in roughly the order they unblock each other:

1. **Bring `fixit.html` into the site's shared layout/chrome** (header/nav/
   footer via `_layouts/default.html` or similar), instead of it staying a
   bare standalone page. This is the central blocking item — the item below
   depends on it.
2. ~~Shrink `_guides/troubleshooting.md` into a short stub that forwards to
   `/fixit/`~~ — not planned any more; the guide keeps its full content (the two
   coexist, see above).
3. **Move to a custom domain**, `support.focalheat.co`, for the whole site
   (guides + wizard together).When this happens, update `url` and
   `baseurl` in `_config.yml` together (see the comments already in that
   file).
4. **Add page analytics** (Google Analytics or similar) to the homepage —
   nothing is wired up yet. Tool choice (GA4 vs. a lighter option like
   Plausible/Fathom) hasn't been decided.
5. ~~Update the support email address to `support@focalheat.co`, replacing
   `hello@focalheat.co`~~ — done, across `fixit.html`, `_includes/
   contact.html`, `_guides/troubleshooting.md`, and `_preview_render.py`.
   Confirm the new address is live/monitored before shipping the change.

## Not built yet (deliberate v1 scope)

- Notion authoring (writing Markdown directly for now)
- Per-order PDF assembly / config profiles
- Per-site QR codes
- Formal version control (each guide carries a `version` field as the seed)

`_site/` (Jekyll build output) is listed in `.gitignore` and ignored by GitHub
Pages regardless (leading underscore); it does no harm if committed, but
there's no need to.
