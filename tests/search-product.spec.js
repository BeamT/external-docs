// End-to-end test for Product-scoped search (#158): the rules in the #136 spec.
// Needs both builds (see tests/product-choice.spec.js):
//   jekyll build --baseurl ""                                   -> _site (setting off)
//   jekyll build --baseurl "" --config _config.yml,tests/product-choice.yml -d _site_choice  (on)
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
    const built = fs.existsSync(path.resolve(__dirname, '..', d, 'search.json'));
    if (process.env.CI && !built) throw new Error(d + '/search.json missing: run both jekyll builds first');
    test.skip(!built, 'Build the site first (see header of this file)');
  }
  on = await serve('_site_choice');
  off = await serve('_site');
});
test.afterAll(async () => { if (on) on.server.close(); if (off) off.server.close(); });

// Open a page, optionally with a saved Product choice, search, and wait for results.
async function search(page, q, { saved, at = '/', site = on } = {}) {
  if (saved) await page.addInitScript((v) => localStorage.setItem('focal-product', v), saved);
  await page.goto(site.url + at);
  await page.locator('.search-icon').click();
  await page.locator('#search').fill(q);
  await expect(page.locator('#search-results li').first()).toBeVisible();
}
const hits = (page) => page.locator('#search-results .search-hit');
const urls = (page) => hits(page).evaluateAll((as) => as.map((a) => a.getAttribute('href')));
const scope = (page) => page.locator('#search-scope');
const more = (page) => page.locator('.search-more');

test.describe('rule 1: no Product chosen', () => {
  test('"wifi" returns more than one Guide, each tagged with its Product', async ({ page }) => {
    await search(page, 'wifi');
    const guides = new Set((await urls(page)).map((u) => u.split('#')[0]));
    expect(guides.size).toBeGreaterThan(1);
    await expect(scope(page)).toHaveText('Searching all guides');
    await expect(page.locator('.search-scope-link')).toHaveCount(0);
    await expect(page.locator('#search-results .search-hit-tag').first()).toBeVisible();
    await expect(more(page)).toHaveCount(0);
  });

  test('Guides tagged both show "Restaurant · Home"', async ({ page }) => {
    await search(page, 'clearance');
    await expect(page.locator('#search-results .search-hit-tag', { hasText: 'Restaurant · Home' }).first()).toBeVisible();
  });

  test('Fix it appears in the results', async ({ page }) => {
    await search(page, 'troubleshooter');
    expect(await urls(page)).toContain('/fixit/');
  });
});

test.describe('rule 2 and 3: a Product chosen', () => {
  test('Home shows shared Guides first; Restaurant results collapse into one final line', async ({ page }) => {
    await search(page, 'rail', { saved: 'home' });
    await expect(scope(page)).toContainText('Searching Home guides');
    const before = await urls(page);
    expect(before.length).toBeGreaterThan(0);
    // Home results are only Guides tagged both.
    for (const u of before) expect(u).toMatch(/rail-installation|safety-and-clearances|electrical-power|install-heaters|maintenance|warranty/);
    await expect(page.locator('#search-results .search-hit-tag')).toHaveCount(0);
    const line = more(page);
    await expect(line).toHaveText(/^\d+ more in Restaurant guides ›$/);
    // The line is last, and expands in place.
    await expect(page.locator('#search-results > li').last()).toHaveClass(/search-more-row/);
    const n = Number((await line.textContent()).match(/^(\d+)/)[1]);
    await line.click();
    await expect(more(page)).toHaveCount(0);
    expect((await urls(page)).length).toBe(before.length + n);
    expect((await urls(page)).slice(0, before.length)).toEqual(before);
  });

  test('Restaurant shows Restaurant and shared Guides, and collapses nothing for Home-only content', async ({ page }) => {
    await search(page, 'hub', { saved: 'restaurant' });
    await expect(scope(page)).toContainText('Searching Restaurant guides');
    expect((await urls(page)).some((u) => u.startsWith('/wifi-requirements/'))).toBe(true);
    await expect(more(page)).toHaveCount(0); // no Home-only content exists yet
  });

  test('the "more" line works from the keyboard', async ({ page }) => {
    await search(page, 'rail', { saved: 'home' });
    const before = (await urls(page)).length;
    await page.locator('#search').press('End');
    for (let i = 0; i <= before; i++) await page.keyboard.press('ArrowDown'); // none is active at first
    await expect(page.locator('.search-more-row')).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('Enter');
    await expect(more(page)).toHaveCount(0);
    expect((await urls(page)).length).toBeGreaterThan(before);
  });
});

test.describe('Restaurant-only sections are left out of Home results', () => {
  // [Guide path, section anchor, a query only that section matches well]
  const sections = [
    ['/electrical-power/', 'hub-outlet', 'outlet on a light switch'],
    ['/install-heaters/', 'final-checks', 'assigned to its slot'],
    ['/maintenance/', 'daily-power-check-for-staff', 'Rail switch is on'],
  ];
  for (const [guide, anchor, q] of sections) {
    test(guide + '#' + anchor, async ({ page }) => {
      await search(page, q, { saved: 'home' });
      // Not among Home's results: either collapsed behind the "more" line, or (when Home
      // has no match at all) listed under "From Restaurant guides:".
      if (await page.locator('.search-note').count()) {
        await expect(page.locator('.search-note')).toHaveText('No Home guides match. From Restaurant guides:');
      } else {
        expect(await urls(page)).not.toContain(guide + '#' + anchor);
        await more(page).click();
      }
      expect(await urls(page)).toContain(guide + '#' + anchor);
    });
    test(guide + '#' + anchor + ' is in Restaurant results', async ({ page }) => {
      await search(page, q, { saved: 'restaurant' });
      expect(await urls(page)).toContain(guide + '#' + anchor);
    });
  }
});

test.describe('rule 4: nothing in the Product', () => {
  test('shows the other Product\'s results under the "No Home guides match" line', async ({ page }) => {
    await search(page, 'Hub Location', { saved: 'home' });
    await expect(page.locator('.search-note')).toHaveText('No Home guides match. From Restaurant guides:');
    await expect(more(page)).toHaveCount(0);
    expect((await urls(page)).length).toBeGreaterThan(0);
  });
});

test.describe('rule 5: Fix it', () => {
  test('is never shown in Home scope, collapsed or expanded', async ({ page }) => {
    await search(page, 'troubleshooter', { saved: 'home' });
    if (await more(page).count()) await more(page).click();
    expect(await urls(page)).not.toContain('/fixit/');
  });
  test('is shown in Restaurant scope', async ({ page }) => {
    await search(page, 'troubleshooter', { saved: 'restaurant' });
    expect(await urls(page)).toContain('/fixit/');
  });
});

test.describe('the scope line', () => {
  test('its link switches to all guides for this search, and back', async ({ page }) => {
    await search(page, 'wifi', { saved: 'home' });
    const homeList = await urls(page);
    expect(homeList.some((u) => u.startsWith('/wifi-requirements/'))).toBe(false);
    await page.locator('.search-scope-link').click();
    await expect(scope(page)).toContainText('Searching all guides');
    await expect(page.locator('.search-scope-link')).toHaveText('Search Home guides');
    await expect(more(page)).toHaveCount(0);
    await expect(page.locator('#search-results .search-hit-tag').first()).toBeVisible();
    expect((await urls(page)).some((u) => u.startsWith('/wifi-requirements/'))).toBe(true);
    await page.locator('.search-scope-link').click();
    await expect(scope(page)).toContainText('Searching Home guides');
    expect(await urls(page)).toEqual(homeList);
  });

  test('switching is for this search only: the saved choice is untouched', async ({ page }) => {
    await search(page, 'rail', { saved: 'home' });
    await page.locator('.search-scope-link').click();
    expect(await page.evaluate(() => localStorage.getItem('focal-product'))).toBe('home');
    await page.keyboard.press('Escape'); // clear results
    await page.keyboard.press('Escape'); // clear input
    await page.keyboard.press('Escape'); // close
    await page.locator('.search-icon').click();
    await expect(scope(page)).toContainText('Searching Home guides');
  });
});

test.describe('on a Guide page', () => {
  test('uses the saved choice', async ({ page }) => {
    await search(page, 'rail', { saved: 'home', at: '/install-hub/' }); // a Restaurant Guide
    await expect(scope(page)).toContainText('Searching Home guides');
  });
  test('uses the Guide\'s Product when nothing is saved', async ({ page }) => {
    await search(page, 'rail', { at: '/install-hub/' });
    await expect(scope(page)).toContainText('Searching Restaurant guides');
  });
  test('a Guide tagged both with nothing saved searches everything', async ({ page }) => {
    await search(page, 'rail', { at: '/rail-installation/' });
    await expect(scope(page)).toHaveText('Searching all guides');
  });
});

test.describe('at most two matches per Guide', () => {
  test('"heater" in either scope', async ({ page }) => {
    for (const saved of ['restaurant', 'home']) {
      await search(page, 'heater', { saved });
      const perGuide = (list) => {
        const counts = {};
        for (const u of list) counts[u.split('#')[0]] = (counts[u.split('#')[0]] || 0) + 1;
        return Math.max(...Object.values(counts));
      };
      const shown = await urls(page);
      expect(perGuide(shown)).toBeLessThanOrEqual(2);
      if (await more(page).count()) { // the other Product's group has its own best two
        await more(page).click();
        expect(perGuide((await urls(page)).slice(shown.length))).toBeLessThanOrEqual(2);
      }
    }
  });
});

test.describe('setting off', () => {
  test('search is unscoped and untagged', async ({ page }) => {
    await search(page, 'wifi', { site: off });
    await expect(scope(page)).toHaveText('Searching all guides');
    await expect(page.locator('.search-hit-tag')).toHaveCount(0);
    await expect(more(page)).toHaveCount(0);
    expect(await urls(page)).toContain('/wifi-requirements/#' + (await urls(page)).find((u) => u.startsWith('/wifi-requirements/#')).split('#')[1]);
  });
});
