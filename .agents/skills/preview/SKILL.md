---
name: preview
description: Preview the site on a local Jekyll server and post the page URL. Use when the user says "preview", "show me", "let me see it", or asks to view a page or guide locally.
argument-hint: "[page path, e.g. rail-installation]"
---

# Preview the site

"Preview" means the local Jekyll server, never an Artifact.

## Steps

1. **Reuse a running server for this worktree.** Other worktrees run their own Jekyll servers, so match on working directory, not just process name:

   ```bash
   for pid in $(pgrep -f 'jekyll serve'); do
     [ "$(readlink /proc/$pid/cwd)" = "$PWD" ] && echo "$pid $(tr '\0' ' ' < /proc/$pid/cmdline)"
   done
   ```

   If one is found, read its `--port` and skip to step 3. Jekyll's auto-regeneration picks up edits, so no restart is needed.

2. **Otherwise start one.** Pick a free port (4000-4999 range; check with `ss -ltn`) and run in the background so it survives the turn:

   ```bash
   bundle exec jekyll serve --baseurl "" --port <PORT> --livereload
   ```

   Fall back to plain `jekyll serve` if there is no Gemfile. Always pass `--baseurl ""`; `_config.yml` sets `baseurl: "/"`, which breaks asset paths locally. Wait until the log shows `Server running` (use Monitor or an until-loop) before posting the URL. If the build fails, report the error instead of a URL.

3. **Post the URL.** Always state the full page URL, e.g. `http://localhost:<PORT>/rail-installation/`. If the user gave a page argument, link that page; otherwise link the page most recently edited this session, or the root. Never stop the server afterwards. Leave it running.

## Notes

- Guides live in `_guides/` and are served at `/<name>/` (collection permalink is `/:name/`, not `/guides/<name>/`). Top-level pages (`fixit.html`, `electrician.html`, etc.) are served at `/<name>.html`.
- Light mode only; there is no dark-mode variant to check.
- Do not take screenshots or open a browser unless the user asks.
