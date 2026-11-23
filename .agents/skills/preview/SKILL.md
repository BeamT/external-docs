---
name: preview
description: Preview the site on a local Jekyll server and post the page URL. Use when the user says "preview", "show me", "let me see it", or asks to view a page or guide locally.
argument-hint: "[page path, e.g. rail-installation]"
---

# Preview the site

"Preview" means the local Jekyll server, never an Artifact.

## Steps

1. Run the script from the repo root, passing the page if you know it:

   ```bash
   _tools/preview.sh [page]      # e.g. _tools/preview.sh rail-installation
   ```

   It reuses a server already running for this checkout, or installs gems (`bundle install` into `vendor/bundle`) and starts one on a free port with `--baseurl ""` and `--livereload`. Other worktrees run their own servers, which is why it matches on working directory. If the build fails it prints the Jekyll log; report that error instead of a URL.

2. **Post the URL it prints.** If the user gave a page, link that page; otherwise the page most recently edited this session, or the root. Never stop the server afterwards. Leave it running.

## Notes

- Guides live in `_guides/` and are served at `/<name>/` (collection permalink is `/:name/`, not `/guides/<name>/`). Top-level pages (`fixit.html`, `electrician.html`, etc.) are served at `/<name>.html`.
- If `bundle` is not found, Ruby is missing or its gem bin dir is not on PATH; see `.ruby-version` and the README.
- Light mode only; there is no dark-mode variant to check.
- Do not take screenshots or open a browser unless the user asks.
