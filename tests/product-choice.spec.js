// End-to-end test for the Product choice setting (site.product_choice).
// Needs both builds:
//   jekyll build --baseurl ""                                   -> _site (setting off)
//   jekyll build --baseurl "" --config _config.yml,tests/product-choice.yml -d _site_choice  (on)
//   npx playwright test
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const http = require('http');
const path = require('path');

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png' };

function serve(dir) {
  const root = path.resolve(__dirname, '..', dir);
  const server = http.createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = path.join(root, p);
    if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file) && fs.existsSync(file + '.html')) file += '.html';
    if (!fs.existsSync(file)) { res.writeHead(404); return res.end('not found'); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((r) => server.listen(0, '127.0.0.1', () =>
    r({ server, url: 'http://127.0.0.1:' + server.address().port })));
}

let on, off;
test.beforeAll(async () => {
  for (const d of ['_site', '_site_choice']) {
    const built = fs.existsSync(path.resolve(__dirname, '..', d, 'index.html'));
    if (process.env.CI && !built) throw new Error(d + '/index.html missing: run both jekyll builds first');
    test.skip(!built, 'Build the site first (see header of this file)');
  }
  on = await serve('_site_choice');
  off = await serve('_site');
});
test.afterAll(async () => { if (on) on.server.close(); if (off) off.server.close(); });

const titles = (page) => page.locator('.guide-row:visible h2').allInnerTexts();
const overflow = (page) => page.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth);

test.describe('setting on', () => {
  test('first visit shows the choice and nothing else', async ({ page }) => {
    await page.goto(on.url + '/');
    await expect(page.getByRole('heading', { name: 'Which Focal do you have?' })).toBeVisible();
    await expect(page.locator('.choice')).toHaveText([/Focal for Restaurants/, /Focal for Homes/]);
    await expect(page.getByPlaceholder('Search all guides')).toBeVisible();
    await expect(page.locator('.guide-row:visible')).toHaveCount(0);
    await expect(page.locator('.stage-tabs')).toBeHidden();
    await expect(page.locator('.product-tab[aria-current]')).toHaveCount(0);
  });

  test('top bar has the Product tabs and a search icon, no search box', async ({ page }) => {
    await page.goto(on.url + '/');
    await expect(page.locator('.product-tab')).toHaveText(['Restaurant', 'Home']);
    await expect(page.locator('#search-toggle')).toBeVisible();
    await expect(page.locator('#searchbox')).toBeHidden();
    const logo = await page.locator('.brand-logo').boundingBox();
    expect(Math.round(logo.height)).toBe(28);
  });

  test('choosing Home shows only Home and shared Guides, and survives a reload', async ({ page }) => {
    await page.goto(on.url + '/');
    await page.locator('.choice[data-product="home"]').click();
    await expect(page.getByRole('heading', { name: 'Focal for Homes', exact: true })).toBeVisible();
    await expect(page.locator('#banner-home')).toBeVisible();
    await expect(page.locator('#banner-home h2')).toHaveText('Set up your Duo');
    await expect(page.locator('#banner-restaurant')).toBeHidden();
    await expect(page.locator('.product-tab[data-product="home"]')).toHaveAttribute('aria-current', 'page');
    const home = await titles(page);
    expect(home).toContain('Electrical & Power Requirements'); // tagged both
    expect(home).not.toContain('Troubleshooting');             // Restaurant only
    await page.goto(on.url + '/');
    await expect(page.getByRole('heading', { name: 'Focal for Homes', exact: true })).toBeVisible();
    expect(await titles(page)).toEqual(home);
  });

  test('?product= sets the saved choice', async ({ page }) => {
    await page.goto(on.url + '/?product=restaurant');
    await expect(page.getByRole('heading', { name: 'Focal for Restaurants', exact: true })).toBeVisible();
    await expect(page.locator('#banner-restaurant h2')).toHaveText('Troubleshoot now');
    expect(await titles(page)).toContain('Troubleshooting');
    await page.goto(on.url + '/?product=home');
    await expect(page.getByRole('heading', { name: 'Focal for Homes', exact: true })).toBeVisible();
    await page.goto(on.url + '/');
    await expect(page.getByRole('heading', { name: 'Focal for Homes', exact: true })).toBeVisible();
  });

  test('Product tabs link to the landing page and save the choice', async ({ page }) => {
    await page.goto(on.url + '/?product=restaurant');
    await page.locator('.product-tab[data-product="home"]').click();
    await expect(page.getByRole('heading', { name: 'Focal for Homes', exact: true })).toBeVisible();
    await page.goto(on.url + '/');
    await expect(page.getByRole('heading', { name: 'Focal for Homes', exact: true })).toBeVisible();
  });

  test('opening a Guide never changes the choice; both-tagged Guide shows the saved choice', async ({ page }) => {
    await page.goto(on.url + '/?product=home');
    await page.goto(on.url + '/troubleshooting/'); // Restaurant-only Guide
    await expect(page.locator('.product-tab[data-product="restaurant"]')).toHaveAttribute('aria-current', 'page');
    await expect(page.locator('.product-tab[data-product="home"]')).not.toHaveAttribute('aria-current', 'page');
    await page.goto(on.url + '/');
    await expect(page.getByRole('heading', { name: 'Focal for Homes', exact: true })).toBeVisible();
    await page.goto(on.url + '/electrical-power/');
    await expect(page.locator('.product-tab[data-product="home"]')).toHaveAttribute('aria-current', 'page');
  });

  test('works with storage blocked', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', { get() { throw new Error('blocked'); } });
      Object.defineProperty(document, 'cookie', { get() { return ''; }, set() {} });
    });
    await page.goto(on.url + '/?product=home');
    await expect(page.getByRole('heading', { name: 'Focal for Homes', exact: true })).toBeVisible();
    // The address bar keeps the choice, so a reload still works.
    expect(page.url()).toContain('product=home');
    await page.reload();
    await expect(page.getByRole('heading', { name: 'Focal for Homes', exact: true })).toBeVisible();
  });

  test('the search icon and the landing field open search', async ({ page }) => {
    await page.goto(on.url + '/?product=restaurant');
    await page.locator('#search-toggle').click();
    await expect(page.locator('#search')).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(page.locator('#searchbox')).toBeHidden();
    await expect(page.locator('#search-toggle')).toBeFocused();
    await page.getByPlaceholder('Search guides', { exact: true }).last().click();
    await expect(page.locator('#search')).toBeFocused();
  });

  test('top bar fits one row at 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    for (const q of ['', '?product=home', '?product=restaurant']) {
      await page.goto(on.url + '/' + q);
      expect(await overflow(page)).toBeLessThanOrEqual(0);
      const bar = await page.locator('.topbar').boundingBox();
      expect(bar.height).toBeLessThan(70);
      const logo = await page.locator('.brand-logo').boundingBox();
      expect(Math.round(logo.height)).toBe(24);
      const icon = await page.locator('#search-toggle').boundingBox();
      expect(icon.x + icon.width).toBeLessThanOrEqual(360);
    }
  });
});

test.describe('setting off', () => {
  test('behaves as Restaurant only', async ({ page }) => {
    await page.goto(off.url + '/');
    await expect(page.getByRole('heading', { name: 'Focal Support' })).toBeVisible();
    await expect(page.getByText('Which Focal do you have?')).toHaveCount(0);
    await expect(page.locator('.product-tab')).toHaveCount(0);
    await expect(page.locator('#search-toggle')).toHaveCount(0);
    await expect(page.locator('#searchbox')).toBeVisible();
    expect(await titles(page)).toContain('Troubleshooting');
  });

  test('?product= is ignored', async ({ page }) => {
    await page.goto(off.url + '/?product=home');
    await expect(page.getByRole('heading', { name: 'Focal Support' })).toBeVisible();
    expect(await titles(page)).toContain('Troubleshooting');
  });

  test('top bar logo stays 24px and fits 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(off.url + '/');
    const logo = await page.locator('.brand-logo').boundingBox();
    expect(Math.round(logo.height)).toBe(24);
    expect(await overflow(page)).toBeLessThanOrEqual(0);
  });
});
