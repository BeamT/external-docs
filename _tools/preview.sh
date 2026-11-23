#!/usr/bin/env bash
# Serve the site locally with Jekyll and print the page URL.
# Usage: _tools/preview.sh [page-path]   e.g. _tools/preview.sh rail-installation
# Reuses a server already running for this checkout; otherwise starts one on a free port.
set -euo pipefail

cd "$(dirname "$0")/.."
ROOT="$PWD"
PAGE="${1:-}"
PAGE="${PAGE#/}"
[ -n "$PAGE" ] && [[ "$PAGE" != *.* ]] && PAGE="$PAGE/"

url() { echo "http://localhost:$1/$PAGE"; }

# 1. Reuse a server already running from this checkout.
for pid in $(pgrep -f 'jekyll serve' || true); do
  if [ "$(readlink "/proc/$pid/cwd" 2>/dev/null)" = "$ROOT" ]; then
    port=$(tr '\0' ' ' < "/proc/$pid/cmdline" | sed -n 's/.*--port[ =]\([0-9]*\).*/\1/p')
    if [ -n "$port" ]; then
      echo "Already running: $(url "$port")"
      exit 0
    fi
  fi
done

# 2. Otherwise start one on a free port.
command -v bundle >/dev/null || { echo "bundler not found. Install Ruby (see .ruby-version), then run: gem install bundler" >&2; exit 1; }
# Install gems into the project (system Ruby gem dirs are often not writable).
bundle config set --local path vendor/bundle >/dev/null
bundle check >/dev/null 2>&1 || bundle install

port=4000
while (echo >"/dev/tcp/127.0.0.1/$port") 2>/dev/null; do port=$((port + 1)); done

log="$(mktemp -t jekyll-preview.XXXXXX)"
# --baseurl "" is required: _config.yml sets baseurl "/", which breaks asset paths locally.
nohup bundle exec jekyll serve --baseurl "" --port "$port" --livereload >"$log" 2>&1 &

for _ in $(seq 1 60); do
  grep -q "Server running" "$log" && { echo "Started: $(url "$port")  (log: $log)"; exit 0; }
  kill -0 $! 2>/dev/null || break
  sleep 1
done
echo "Jekyll failed to start. Log:" >&2
cat "$log" >&2
exit 1
