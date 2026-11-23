// Guide Product tag, one-line note and the conditional Product block.
//
// The Home setting (`home_enabled`) is off on main, so this spec builds its own
// copy of the site with the setting on and two fixture Guides (one Home, one
// both). It needs Ruby and Bundler; in CI the workflow has already set them up.
const { test, expect } = require('@playwright/test');
const { execFileSync } = require('child_process');
const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');

const REPO = path.resolve(__dirname, '..');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png' };
const KEY = 'focal-product';

const HOME_GUIDE = `---
title: Fixture Home Guide
product: home
stage: [operate]
equivalent: /fixture-both-guide/
summary: Fixture.
version: "1.0"
updated: "2026-11-23"
unlisted: true
---

Home intro.
`;

const BOTH_GUIDE = `---
title: Fixture Both Guide
product: both
stage: [install]
summary: Fixture.
version: "1.0"
updated: "2026-11-23"
---

## Shared section

Shared text.

## Hub section

{% capture hub %}Hub text for restaurants.{% endcapture %}
{% include productonly.html for="restaurant" content=hub %}

## App section

{% capture app %}App text for homes.{% endcapture %}
{% include productonly.html for="home" content=app %}
`;

const RESTAURANT_GUIDE = `---
title: Fixture Restaurant Guide
product: restaurant
stage: [install]
summary: Fixture.
version: "1.0"
updated: "2026-11-23"
unlisted: true
---

Restaurant intro.
`;

let servers = [];
let on;
let off;
let tmp;

function build(source, dest, extraConfig) {
  const env = { ...process.env,
    PATH: process.env.PATH,
    BUNDLE_GEMFILE: path.join(REPO, 'Gemfile') };
  const config = ['_config.yml'].concat(extraConfig || []).join(',');
  execFileSync('bundle', ['exec', 'jekyll', 'build', '--baseurl', '', '--source', source,
    '--destination', dest, '--config', config], { cwd: source, env, stdio: 'pipe' });
}

test.beforeAll(async () => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-product-'));
  const src = path.join(tmp, 'src');
  fs.cpSync(REPO, src, { recursive: true, filter: (p) => {
    const rel = path.relative(REPO, p);
    return !/^(\.git|node_modules|vendor|_site|\.jekyll-cache|test-results|playwright-report)(\/|$)/.test(rel);
  } });
  fs.writeFileSync(path.join(src, '_guides/fixture-home-guide.md'), HOME_GUIDE);
  fs.writeFileSync(path.join(src, '_guides/fixture-both-guide.md'), BOTH_GUIDE);
  fs.writeFileSync(path.join(src, '_guides/fixture-restaurant-guide.md'), RESTAURANT_GUIDE);
  fs.writeFileSync(path.join(src, 'on.yml'), 'home_enabled: true\n');
  build(src, path.join(tmp, 'on'), ['on.yml']);
  build(src, path.join(tmp, 'off'));

  servers = [];
  const serve = async (root) => {
    const srv = http.createServer((req, res) => {
      let file = path.join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
      if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
      if (!fs.existsSync(file)) { res.writeHead(404); return res.end('not found'); }
      res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
      fs.createReadStream(file).pipe(res);
    });
    await new Promise((r) => srv.listen(0, '127.0.0.1', r));
    servers.push(srv);
    return 'http://127.0.0.1:' + srv.address().port;
  };
  on = await serve(path.join(tmp, 'on'));
  off = await serve(path.join(tmp, 'off'));
});

test.afterAll(async () => {
  servers.forEach((srv) => srv.close());
  if (tmp) fs.rmSync(tmp, { recursive: true, force: true });
});

test.setTimeout(120000);

test('a Guide tagged both shows the Restaurant · Home tag', async ({ page }) => {
  await page.goto(`${on}/fixture-both-guide/`);
  await expect(page.locator('.product-tag')).toHaveText('Restaurant · Home');
  await expect(page.locator('.product-note')).toHaveCount(0);
});

test('a single-Product Guide shows the note with a link to the equivalent', async ({ page }) => {
  await page.goto(`${on}/fixture-home-guide/`);
  const note = page.locator('.product-note');
  await expect(note).toContainText('This guide is for Focal Home');
  await expect(note.locator('a')).toHaveAttribute('href', '/fixture-both-guide/');
  await expect(page.locator('.product-tag')).toHaveCount(0);
});

test('the note has no link when there is no equivalent', async ({ page }) => {
  await page.goto(`${on}/fixture-restaurant-guide/`);
  const note = page.locator('.product-note');
  await expect(note).toContainText('This guide is for Focal Restaurant');
  await expect(note.locator('a')).toHaveCount(0);
});

test('conditional content follows the Guide page Product', async ({ page }) => {
  await page.goto(`${on}/fixture-both-guide/`);
  await expect(page.getByText('Hub text for restaurants.')).toBeVisible();
  await expect(page.getByText('App text for homes.')).toBeHidden();
  await page.evaluate((k) => localStorage.setItem(k, 'home'), KEY);
  await page.reload();
  await expect(page.getByText('Hub text for restaurants.')).toBeHidden();
  await expect(page.getByText('App text for homes.')).toBeVisible();
});

test('print shows both Products with labels', async ({ page }) => {
  await page.goto(`${on}/fixture-both-guide/`);
  await page.emulateMedia({ media: 'print' });
  await expect(page.getByText('Hub text for restaurants.')).toBeVisible();
  await expect(page.getByText('App text for homes.')).toBeVisible();
  const labels = await page.locator('.product-block').evaluateAll((els) =>
    els.map((e) => getComputedStyle(e, '::before').content));
  expect(labels).toEqual(['"Restaurant"', '"Home"']);
});

test('opening a Home Guide with Restaurant saved leaves the saved choice unchanged', async ({ page }) => {
  await page.goto(`${on}/fixture-restaurant-guide/`);
  await page.evaluate((k) => localStorage.setItem(k, 'restaurant'), KEY);
  await page.goto(`${on}/fixture-home-guide/`);
  await expect(page.locator('.product-note')).toBeVisible();
  expect(await page.evaluate((k) => localStorage.getItem(k), KEY)).toBe('restaurant');
});

test('with the setting off nothing new is visible', async ({ page }) => {
  await page.goto(`${off}/fixture-both-guide/`);
  await expect(page.locator('.product-tag')).toHaveCount(0);
  await expect(page.locator('.product-note')).toHaveCount(0);
  await expect(page.getByText('Hub text for restaurants.')).toBeVisible();
  await expect(page.getByText('App text for homes.')).toBeHidden();
  await page.evaluate((k) => localStorage.setItem(k, 'home'), KEY);
  await page.reload();
  await expect(page.getByText('App text for homes.')).toBeHidden();
  await page.goto(`${off}/fixture-home-guide/`);
  await expect(page.locator('.product-note')).toHaveCount(0);
});

test('search index marks a section that holds a Product-only block', async () => {
  const idx = JSON.parse(fs.readFileSync(path.join(tmp, 'on/search.json'), 'utf8'));
  const only = (heading) => idx.find((r) => r.guide === 'Fixture Both Guide' && r.heading === heading).only;
  expect(only('Shared section')).toBe('');
  expect(only('Hub section')).toBe('restaurant');
  expect(only('App section')).toBe('home');
  // The block's label is CSS-only, so it does not leak into the searchable text.
  const hub = idx.find((r) => r.heading === 'Hub section');
  expect(hub.body).toBe('Hub text for restaurants.');
});
