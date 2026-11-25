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
  build(src, path.join(tmp, 'off'), ['tests/product-off.yml']);

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

test('a Guide tagged both says which Product it shows and offers the other', async ({ page }) => {
  await page.goto(`${on}/fixture-both-guide/`);
  const line = page.locator('.product-line');
  await expect(line).toContainText('For Restaurants.');
  await expect(line.getByRole('link', { name: 'View for Homes instead' })).toBeVisible();
  await expect(line.getByRole('link', { name: 'View for Restaurants instead' })).toBeHidden();
  await page.evaluate((k) => localStorage.setItem(k, 'home'), KEY);
  await page.reload();
  await expect(line).toContainText('For Homes.');
  await expect(line.getByRole('link', { name: 'View for Restaurants instead' })).toBeVisible();
});

test('a single-Product Guide says so and links to the equivalent', async ({ page }) => {
  await page.goto(`${on}/fixture-home-guide/`);
  const line = page.locator('.product-line');
  await expect(line).toContainText('For Homes.');
  await expect(line.locator('a')).toHaveAttribute('href', '/fixture-both-guide/');
  await expect(line.locator('a')).toHaveText('View for Restaurants instead');
});

test('the line has no link when there is no equivalent', async ({ page }) => {
  await page.goto(`${on}/fixture-restaurant-guide/`);
  const line = page.locator('.product-line');
  await expect(line).toContainText('For Restaurants.');
  await expect(line.locator('a')).toHaveCount(0);
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
  await expect(page.locator('.product-line')).toContainText('For Homes.');
  expect(await page.evaluate((k) => localStorage.getItem(k), KEY)).toBe('restaurant');
});

test('clicking View for Homes instead flips the page and saves Home', async ({ page }) => {
  await page.goto(`${on}/fixture-both-guide/`);
  await page.evaluate((k) => localStorage.setItem(k, 'restaurant'), KEY);
  await page.reload();
  await page.getByRole('link', { name: 'View for Homes instead' }).click();
  await expect(page.getByText('App text for homes.')).toBeVisible();
  await expect(page.getByText('Hub text for restaurants.')).toBeHidden();
  await expect(page.locator('.product-line')).toContainText('For Homes.');
  expect(await page.evaluate((k) => localStorage.getItem(k), KEY)).toBe('home');
  await page.reload();
  await expect(page.getByText('App text for homes.')).toBeVisible();
});

test('clicking the link to the equivalent Guide saves that Product', async ({ page }) => {
  await page.goto(`${on}/fixture-home-guide/`);
  await page.evaluate((k) => localStorage.setItem(k, 'home'), KEY);
  await page.getByRole('link', { name: 'View for Restaurants instead' }).click();
  await expect(page).toHaveURL(/fixture-both-guide/);
  expect(await page.evaluate((k) => localStorage.getItem(k), KEY)).toBe('restaurant');
});

test('the line does not print', async ({ page }) => {
  await page.goto(`${on}/fixture-both-guide/`);
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.product-line')).toBeHidden();
});

test('with the setting off nothing new is visible', async ({ page }) => {
  await page.goto(`${off}/fixture-both-guide/`);
  await expect(page.locator('.product-line')).toHaveCount(0);
  await expect(page.getByText('Hub text for restaurants.')).toBeVisible();
  await expect(page.getByText('App text for homes.')).toBeHidden();
  await page.evaluate((k) => localStorage.setItem(k, 'home'), KEY);
  await page.reload();
  await expect(page.getByText('App text for homes.')).toBeHidden();
  await page.goto(`${off}/fixture-home-guide/`);
  await expect(page.locator('.product-line')).toHaveCount(0);
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

// "Next" links follow the Guide page's Product and that Product's Install order.
const nextOf = async (page, base, slug) => {
  await page.goto(`${base}/${slug}/`);
  const link = page.locator('a.next-link:visible');
  return (await link.count()) ? new URL(await link.first().getAttribute('href'), base).pathname.replace(/\//g, '') : null;
};
const follow = async (page, base, start) => {
  const seen = [start];
  for (let next = await nextOf(page, base, start); next && seen.length < 20; next = await nextOf(page, base, next)) seen.push(next);
  return seen;
};
const RESTAURANT_PATH = ['start-here', 'safety-and-clearances', 'install-hub', 'rail-installation',
  'install-heaters', 'register-assign-heaters', 'troubleshooting'];

test('the Restaurant Next path is unchanged, with the setting on or off', async ({ page }) => {
  expect(await follow(page, off, 'start-here')).toEqual(RESTAURANT_PATH);
  expect(await follow(page, on, 'start-here')).toEqual(RESTAURANT_PATH);
});

test('with Home saved, Next on a Guide tagged both follows the Home Install order', async ({ page }) => {
  await page.goto(`${on}/safety-and-clearances/`);
  await page.evaluate((k) => localStorage.setItem(k, 'home'), KEY);
  const path = await follow(page, on, 'safety-and-clearances');
  expect(path).toEqual(['safety-and-clearances', 'rail-installation', 'install-heaters']);
  expect(path).not.toContain('install-hub');
  expect(path).not.toContain('register-assign-heaters');
});

test('a Guide tagged both falls back to Restaurant when nothing is saved', async ({ page }) => {
  expect(await nextOf(page, on, 'install-heaters')).toBe('register-assign-heaters');
});

test('Electrical & Power is out of the Next chain', async ({ page }) => {
  expect(await nextOf(page, on, 'electrical-power')).toBeNull();
  expect(RESTAURANT_PATH).not.toContain('electrical-power');
});

test('the Restaurant print packet follows the Restaurant Install order', async ({ page }) => {
  await page.goto(`${on}/print/installer/`);
  const titles = await page.locator('.packet-guide h1').allTextContents();
  expect(titles).toEqual(['Safety & Clearances', 'Install Hub', 'Install Rails', 'Install Heaters',
    'Assign Heaters', 'Troubleshooting']);
});
