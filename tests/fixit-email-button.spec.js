// Regression test for the "email button silently does nothing" bug.
//
// refreshEmailHref() used to update the button's class/aria-disabled to make
// it *look* enabled, but never cleared the onclick="return false;" baked in
// at initial render when the button first appeared disabled. So a real click
// stayed silently blocked even after required fields were filled in and the
// button looked active. DevTools-triggered navigation bypassed the stale
// handler, which is what made it so confusing to diagnose.
//
// Run with: npx playwright test
const { test, expect } = require('@playwright/test');
const path = require('path');

const FIXIT_URL = 'file://' + path.resolve(__dirname, '../fixit.html');

async function emailButtonWouldNavigate(page, selector) {
  // dispatchEvent's return value is false if any handler called
  // preventDefault() — i.e. exactly the bug this test guards against.
  return page.evaluate((sel) => {
    const btn = document.querySelector(sel);
    const ev = new MouseEvent('click', { bubbles: true, cancelable: true });
    return btn.dispatchEvent(ev);
  }, selector);
}

test('email button starts disabled, then becomes clickable once required field is filled', async ({ page }) => {
  await page.goto(FIXIT_URL);
  await page.click('text=Something else');

  const btn = page.locator('#email-btn');
  await expect(btn).toHaveClass(/disabled/);
  expect(await emailButtonWouldNavigate(page, '#email-btn')).toBe(false);

  await page.fill('.issue-textarea', 'test description');
  await page.dispatchEvent('.issue-textarea', 'input');

  await expect(btn).not.toHaveClass(/disabled/);
  expect(await btn.getAttribute('aria-disabled')).toBe('false');

  // The actual regression: class/aria-disabled looking enabled is not
  // enough — a real click must not be swallowed by a stale handler.
  expect(await emailButtonWouldNavigate(page, '#email-btn')).toBe(true);

  const href = await btn.getAttribute('href');
  expect(href).toMatch(/^mailto:support@focalheat\.co\?/);
});

test('heater-ID-required endpoint enables the email button once an ID is entered', async ({ page }) => {
  await page.goto(FIXIT_URL);
  await page.click('text=Heater is damaged');
  // Walk whatever confirmation step precedes the damaged endpoint.
  const yesNo = page.locator('button, a').filter({ hasText: /still works|yes/i }).first();
  if (await yesNo.count()) await yesNo.click();

  const btn = page.locator('#email-btn');
  await expect(btn).toHaveClass(/disabled/);
  expect(await emailButtonWouldNavigate(page, '#email-btn')).toBe(false);

  await page.fill('#heater-id-input-0', 'qr4.ch/12FG3');
  await page.dispatchEvent('#heater-id-input-0', 'input');

  await expect(btn).not.toHaveClass(/disabled/);
  expect(await emailButtonWouldNavigate(page, '#email-btn')).toBe(true);
});
