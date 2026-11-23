// End-to-end test for the landing page Stage tabs (index.html).
//   jekyll build --baseurl ""
//   npx playwright test
// Skips (with a message) when _site/ isn't there.
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const http = require('http');
const path = require('path');

const SITE = path.resolve(__dirname, '../_site');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png' };

let server;
let base;

test.beforeAll(async () => {
  const built = fs.existsSync(path.join(SITE, 'index.html'));
  if (process.env.CI && !built) throw new Error('_site/index.html missing: run jekyll build first');
  test.skip(!built, 'Build the site first: jekyll build --baseurl ""');
  server = http.createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = path.join(SITE, p);
    if (!file.startsWith(SITE)) { res.writeHead(403); return res.end(); }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file) && fs.existsSync(file + '.html')) file += '.html';
    if (!fs.existsSync(file)) { res.writeHead(404); return res.end('not found'); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  base = 'http://127.0.0.1:' + server.address().port;
});

test.afterAll(async () => { if (server) server.close(); });

const titles = (page) => page.locator('.guide-row:visible h2').allInnerTexts();
const selected = (page) => page.locator('.stage-tab[aria-selected="true"]').innerText();

test('shows Stage tabs, not Role pills', async ({ page }) => {
  await page.goto(base + '/');
  await expect(page.locator('.stage-tab:visible')).toHaveText(['All', 'Install', 'Operate', 'Service']);
  await expect(page.locator('.chip')).toHaveCount(0);
  expect(await selected(page)).toBe('All');
  await expect(page.locator('.fixit-banner')).toBeVisible();
  // The banner sits above the tabs.
  const banner = await page.locator('.fixit-banner').boundingBox();
  const tabs = await page.locator('.stage-tabs').boundingBox();
  expect(banner.y).toBeLessThan(tabs.y);
});

test('each tab filters the list and the address bar follows', async ({ page }) => {
  await page.goto(base + '/');
  const all = await titles(page);
  expect(all).not.toContain('Survey Your Patio'); // unlisted

  await page.getByRole('tab', { name: 'Install' }).click();
  expect(page.url()).toContain('?stage=install');
  const install = await titles(page);
  expect(install[0]).toBe('Installer: Start Here');
  await expect(page.locator('.guide-row--lead .lead-eyebrow')).toBeVisible();
  expect(install).toContain('Install Hub');
  expect(install).not.toContain('Troubleshooting');

  await page.getByRole('tab', { name: 'Operate' }).click();
  expect(page.url()).toContain('?stage=operate');
  expect(await titles(page)).toEqual(
    expect.arrayContaining(['System Setup & Control', 'Individual Heater Control']));
  await expect(page.locator('.guide-row--lead')).toHaveCount(0);

  await page.getByRole('tab', { name: 'Service' }).click();
  expect(page.url()).toContain('?stage=service');
  expect(await titles(page)).toEqual(
    expect.arrayContaining(['Troubleshooting', 'Replace Heaters', 'Maintenance & Care']));

  await page.getByRole('tab', { name: 'All', exact: true }).click();
  expect(page.url()).not.toContain('?');
  expect(await titles(page)).toEqual(all);
});

test('?stage= opens a tab', async ({ page }) => {
  for (const s of ['install', 'operate', 'service']) {
    await page.goto(base + '/?stage=' + s);
    expect((await selected(page)).toLowerCase()).toBe(s);
  }
});

test('old ?a= links open the mapped tab and rewrite the URL', async ({ page }) => {
  const map = { installer: 'install', electrician: 'install', customer: 'operate' };
  for (const [a, s] of Object.entries(map)) {
    await page.goto(base + '/?a=' + a);
    expect((await selected(page)).toLowerCase()).toBe(s);
    expect(page.url()).toContain('?stage=' + s);
  }
});

test('old share-link redirects open the mapped tab', async ({ page }) => {
  const map = { installer: 'install', electrician: 'install', restaurant: 'operate' };
  for (const [r, s] of Object.entries(map)) {
    await page.goto(base + '/' + r + '/');
    await page.waitForURL('**/?stage=' + s);
    expect((await selected(page)).toLowerCase()).toBe(s);
  }
});

test('an empty tab is hidden', async ({ page }) => {
  await page.goto(base + '/');
  // No Stage is empty today, so assert the rule: every visible tab has Guides.
  for (const tab of await page.locator('.stage-tab:visible').all()) {
    await tab.click();
    expect((await titles(page)).length).toBeGreaterThan(0);
  }
});

test('tabs and list fit a 360px screen', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  for (const q of ['', '?stage=install']) {
    await page.goto(base + '/' + q);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    for (const tab of await page.locator('.stage-tab:visible').all()) {
      const box = await tab.boundingBox();
      expect(box.x + box.width).toBeLessThanOrEqual(360);
    }
  }
});
