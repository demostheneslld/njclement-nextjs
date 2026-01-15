import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('home page loads and shows primary nav', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('main', { timeout: 15000 });
    await expect(page.locator('main')).toBeVisible();
    await expect(page.getByTestId('desktop-nav-home').first()).toBeVisible();
  });

  test('navigation works for core pages', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('main', { timeout: 15000 });
    await page.getByTestId('desktop-nav-resume').first().click();
    await expect(page).toHaveURL(/\/resume/);
    await page.waitForSelector('main', { timeout: 15000 });

    await page.getByTestId('desktop-nav-portfolio').first().click();
    await expect(page).toHaveURL(/\/portfolio/);
    await page.waitForSelector('main', { timeout: 15000 });

    await page.getByTestId('desktop-contact-button').click();
    await expect(page).toHaveURL(/\/contact/);
    await page.waitForSelector('main', { timeout: 15000 });
  });

  test('biome selector updates cookie', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('[data-testid="desktop-biome-selector-toggle"]', { timeout: 15000 });
    const toggle = page.getByTestId('desktop-biome-selector-toggle');
    await toggle.click();
    await page.getByTestId('biome-option-giza').click();

    const cookie = await page.context().cookies();
    const biomeCookie = cookie.find((c) => c.name === 'biome-preference');
    expect(biomeCookie?.value).toBe('giza');
  });
});
