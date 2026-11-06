// End-to-end test for header site search (search.json + assets/search.js).
//
// Needs a built site, since search.json is a Jekyll template:
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
  test.skip(!fs.existsSync(path.join(SITE, 'search.json')),
    'Build the site first: jekyll build --baseurl ""');
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

test('index is valid and has one record per guide section', async () => {
  const docs = JSON.parse(fs.readFileSync(path.join(SITE, 'search.json'), 'utf8'));
  expect(docs.length).toBeGreaterThan(20);
  for (const d of docs) {
    expect(d.url).toMatch(/^\//);
    expect(d.url).not.toMatch(/^\/\//);
    expect(d.heading).not.toMatch(/^on this page$/i);
    expect(d.url).not.toContain('survey-your-patio'); // unlisted guide
  }
  // Every section anchor must point at a real heading id in the built page.
  for (const d of docs.filter((d) => d.url.includes('#'))) {
    const [p, id] = d.url.split('#');
    const html = fs.readFileSync(path.join(SITE, p, 'index.html'), 'utf8');
    expect(html, d.url).toContain(`id="${id}"`);
  }
});

test('finds body text from a guide page and navigates to the section', async ({ page }) => {
  await page.goto(base + '/install-hub/');
  const input = page.locator('#search');
  await input.fill('breaker');
  const first = page.locator('#search-results .search-hit').first();
  await expect(first).toBeVisible();
  await expect(page.locator('#search-results mark').first()).toBeVisible();

  const href = await first.getAttribute('href');
  expect(href).toMatch(/#/);
  await input.press('Enter');
  await expect(page).toHaveURL(new RegExp(href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$'));
});

test('tolerates typos, supports keyboard nav and Escape on the homepage', async ({ page }) => {
  await page.goto(base + '/');
  await page.keyboard.press('/');
  await expect(page.locator('#search')).toBeFocused();
  await page.keyboard.type('clearence');
  await expect(page.locator('#search-results .search-hit').first()).toBeVisible();

  await page.keyboard.press('ArrowDown');
  await expect(page.locator('#search-results li[aria-selected="true"]')).toHaveCount(1);

  await page.keyboard.press('Escape');
  await expect(page.locator('#search-results')).toBeHidden();
});

test('shows an empty state for nonsense', async ({ page }) => {
  await page.goto(base + '/');
  await page.locator('#search').fill('zzqxv');
  await expect(page.locator('#search-results .search-empty')).toHaveText(/No results/);
});
