// The public "Delete your Focal Home account" page (#160): Google Play and the app link to
// /delete-account/, so it must resolve even while the Home choice is off, and be
// listed under All for Home once it is on. Needs both builds:
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

test('resolves with the Home choice off', async ({ page }) => {
  const res = await page.goto(off.url + '/delete-account/');
  expect(res.status()).toBe(200);
  await expect(page.getByRole('heading', { name: 'Delete your Focal Home account', level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: 'support@focalheat.co' })).toBeVisible();
});

test('resolves with the Home choice on', async ({ page }) => {
  const res = await page.goto(on.url + '/delete-account/');
  expect(res.status()).toBe(200);
});

test('is listed under All for Home', async ({ page }) => {
  await page.goto(on.url + '/?product=home');
  const row = page.locator('.guide-row:visible', { hasText: 'Delete your Focal Home account' });
  await expect(row).toHaveAttribute('href', '/delete-account/');
});
