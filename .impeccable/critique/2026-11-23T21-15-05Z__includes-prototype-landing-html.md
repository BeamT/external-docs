---
target: two-product landing prototype
total_score: 24
max_score: 36
na_heuristics: 10
p0_count: 1
p1_count: 1
target_identity: "file:/home/loren/Orca/external-docs/support-landing-page/_includes/prototype-landing.html"
target_fingerprint: "sha256:c50dfb3ff70206c52228b3c65c17a8e510a6c059e71c8864f94e3afc1b18c3ce"
target_path: /home/loren/Orca/external-docs/support-landing-page/_includes/prototype-landing.html
timestamp: 2026-11-23T21-15-05Z
slug: includes-prototype-landing-html
---
# Critique: two-product landing prototype (A/B/C) + search
Method: dual-agent.
Recommendation: build a C-based mix. Top bar = logo · Restaurant|Home switch · search icon (right). Stage tabs go in the page under the H1 (they only filter the landing list, and the bar doesn't fit them at 390px). Keep from C: product name as H1, 1-2-3 stage order as tabs, compact guide list. Keep from A: first-visit gate and switch in the top bar. Drop from B: dropdown and single long page. Search icon OK if the landing page keeps a hero search field, the opened search shows its scope with a switch, and phones get a full-screen panel.
Scores (C): 3,3,3,2,2,3,3,3,2,n/a = 24/36.
P0 search unusable at 390px in A/B (input 22-23px wide) -> icon + full-screen panel (adapt)
P1 stage list double-counts and repeats shared guides (C 14 vs 13; B lists Safety 3x) -> filter one list, no counts on tabs (distill)
P2 shared rail guides use restaurant wording inside Home (plan rollout step 2) (clarify)
P2 product tags inside a single-product view; same subtitle for both products (clarify)
P3 Planned tag contrast 3.6:1; small targets in B jump links and C's All link (prototype only)
Detector: file scan 0 findings (couldn't read the stylesheet); page scan: 7 low-contrast (Planned tag), cream-palette, thin-border/wide-shadow, cramped-padding on C band (likely false positive).
