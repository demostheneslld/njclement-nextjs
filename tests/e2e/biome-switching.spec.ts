import { test, expect, Page } from '@playwright/test';

// Test helper to get current biome class from document element
async function getCurrentBiomeClass(page: Page): Promise<string | null> {
  const classList = await page.evaluate(() => {
    return Array.from(document.documentElement.classList).find(cls => cls.startsWith('biome-'));
  });
  return classList || null;
}

// Test helper to check if biome is persisted in localStorage
async function getBiomeFromLocalStorage(page: Page): Promise<string | null> {
  return await page.evaluate(() => {
    return localStorage.getItem('biome-preference');
  });
}

// Test helper to get the desktop biome selector
async function getDesktopBiomeSelector(page: Page) {
  return page.locator('select').first();
}

// Test helper to get the mobile biome selector (inside mobile menu)
async function getMobileBiomeSelector(page: Page) {
  return page.locator('.absolute.top-0.inset-x-0 select');
}

// Test helper to get mobile mobile button
async function getMobileMobileButton(page: Page) {
  return page.locator('button:has-text("Open main menu")').nth(1);
}

test.describe('Biome Switching Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Wait for React hydration and biome initialization
    await page.waitForTimeout(1000);
  });

  test.describe('Desktop Biome Switching', () => {
    test('should display biome selector in desktop view', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      
      // Biome selector should be visible in desktop navigation (first selector)
      const biomeSelector = await getDesktopBiomeSelector(page);
      await expect(biomeSelector).toBeVisible();
      
      // Check that both biome options are available
      await expect(biomeSelector.locator('option[value="misty-lava-forest"]')).toContainText('Misty Lava Forest');
      await expect(biomeSelector.locator('option[value="desert-oasis"]')).toContainText('Desert Oasis');
    });

    test('should have default biome as Misty Lava Forest', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      
      const biomeSelector = await getDesktopBiomeSelector(page);
      await expect(biomeSelector).toHaveValue('misty-lava-forest');
      
      // Check that the document has the correct biome class
      const biomeClass = await getCurrentBiomeClass(page);
      expect(biomeClass).toBe('biome-misty-lava-forest');
    });

    test('should switch to Desert Oasis biome', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      
      const biomeSelector = await getDesktopBiomeSelector(page);
      
      // Switch to desert oasis
      await biomeSelector.selectOption('desert-oasis');
      
      // Wait for biome change
      await page.waitForTimeout(500);
      
      // Check that selector value changed
      await expect(biomeSelector).toHaveValue('desert-oasis');
      
      // Check that document class changed
      const biomeClass = await getCurrentBiomeClass(page);
      expect(biomeClass).toBe('biome-desert-oasis');
      
      // Check that preference is saved to localStorage
      const savedBiome = await getBiomeFromLocalStorage(page);
      expect(savedBiome).toBe('desert-oasis');
    });

    test('should switch back to Misty Lava Forest biome', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      
      const biomeSelector = await getDesktopBiomeSelector(page);
      
      // First switch to desert oasis
      await biomeSelector.selectOption('desert-oasis');
      await page.waitForTimeout(500);
      await expect(biomeSelector).toHaveValue('desert-oasis');
      
      // Then switch back to misty lava forest
      await biomeSelector.selectOption('misty-lava-forest');
      await page.waitForTimeout(500);
      
      // Check that selector value changed back
      await expect(biomeSelector).toHaveValue('misty-lava-forest');
      
      // Check that document class changed back
      const biomeClass = await getCurrentBiomeClass(page);
      expect(biomeClass).toBe('biome-misty-lava-forest');
      
      // Check that preference is saved to localStorage
      const savedBiome = await getBiomeFromLocalStorage(page);
      expect(savedBiome).toBe('misty-lava-forest');
    });

    test('should persist biome selection across page navigation', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      
      // Switch to desert oasis
      const biomeSelector = await getDesktopBiomeSelector(page);
      await biomeSelector.selectOption('desert-oasis');
      await page.waitForTimeout(500);
      
      // Navigate to another page
      await page.click('a[href="/resume"]');
      await page.waitForURL('/resume');
      await page.waitForTimeout(1000);
      
      // Check that biome is still desert oasis
      const resumeBiomeSelector = await getDesktopBiomeSelector(page);
      await expect(resumeBiomeSelector).toHaveValue('desert-oasis');
      
      const biomeClass = await getCurrentBiomeClass(page);
      expect(biomeClass).toBe('biome-desert-oasis');
    });

    test('should persist biome selection across page reload', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      
      // Switch to desert oasis
      const biomeSelector = await getDesktopBiomeSelector(page);
      await biomeSelector.selectOption('desert-oasis');
      await page.waitForTimeout(500);
      
      // Reload the page
      await page.reload();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
      
      // Check that biome is still desert oasis
      const reloadedBiomeSelector = await getDesktopBiomeSelector(page);
      await expect(reloadedBiomeSelector).toHaveValue('desert-oasis');
      
      const biomeClass = await getCurrentBiomeClass(page);
      expect(biomeClass).toBe('biome-desert-oasis');
    });

    test('should have proper focus and accessibility for biome selector', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      
      const biomeSelector = await getDesktopBiomeSelector(page);
      
      // Check that selector is focusable
      await biomeSelector.focus();
      await expect(biomeSelector).toBeFocused();
      
      // Check that selector has proper styling classes
      await expect(biomeSelector).toHaveClass(/focus:outline-none focus:ring-2 focus:ring-accent/);
    });
  });

  test.describe('Mobile Biome Switching', () => {
    test('should display biome selector in mobile menu', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Open mobile menu
      const menuButton = await getMobileMobileButton(page);
      await menuButton.click();
      await page.waitForSelector('.absolute.top-0.inset-x-0', { state: 'visible' });
      
      // Biome selector should be visible in mobile menu
      const mobileBiomeSelector = await getMobileBiomeSelector(page);
      await expect(mobileBiomeSelector).toBeVisible();
      
      // Check that both biome options are available
      await expect(mobileBiomeSelector.locator('option[value="misty-lava-forest"]')).toContainText('Misty Lava Forest');
      await expect(mobileBiomeSelector.locator('option[value="desert-oasis"]')).toContainText('Desert Oasis');
    });

    test('should have default biome as Misty Lava Forest in mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Open mobile menu
      const menuButton = await getMobileMobileButton(page);
      await menuButton.click();
      await page.waitForSelector('.absolute.top-0.inset-x-0', { state: 'visible' });
      
      const mobileBiomeSelector = await getMobileBiomeSelector(page);
      await expect(mobileBiomeSelector).toHaveValue('misty-lava-forest');
      
      // Check that the document has the correct biome class
      const biomeClass = await getCurrentBiomeClass(page);
      expect(biomeClass).toBe('biome-misty-lava-forest');
    });

    test('should switch to Desert Oasis biome in mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Open mobile menu
      const menuButton = await getMobileMobileButton(page);
      await menuButton.click();
      await page.waitForSelector('.absolute.top-0.inset-x-0', { state: 'visible' });
      
      const mobileBiomeSelector = await getMobileBiomeSelector(page);
      
      // Switch to desert oasis
      await mobileBiomeSelector.selectOption('desert-oasis');
      await page.waitForTimeout(500);
      
      // Check that selector value changed
      await expect(mobileBiomeSelector).toHaveValue('desert-oasis');
      
      // Check that document class changed
      const biomeClass = await getCurrentBiomeClass(page);
      expect(biomeClass).toBe('biome-desert-oasis');
      
      // Check that preference is saved to localStorage
      const savedBiome = await getBiomeFromLocalStorage(page);
      expect(savedBiome).toBe('desert-oasis');
    });

    test('should maintain biome selection when closing mobile menu', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Open mobile menu
      const menuButton = await getMobileMobileButton(page);
      await menuButton.click();
      await page.waitForSelector('.absolute.top-0.inset-x-0', { state: 'visible' });
      
      const mobileBiomeSelector = await getMobileBiomeSelector(page);
      
      // Switch to desert oasis
      await mobileBiomeSelector.selectOption('desert-oasis');
      await page.waitForTimeout(500);
      
      // Close mobile menu by force clicking the button
      await menuButton.click({ force: true });
      await page.waitForTimeout(500);
      
      // Check that biome class is still applied
      const biomeClass = await getCurrentBiomeClass(page);
      expect(biomeClass).toBe('biome-desert-oasis');
    });

    test('should have proper mobile biome selector styling', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Open mobile menu
      const menuButton = await getMobileMobileButton(page);
      await menuButton.click();
      await page.waitForSelector('.absolute.top-0.inset-x-0', { state: 'visible' });
      
      const mobileBiomeSelector = await getMobileBiomeSelector(page);
      
      // Check that mobile selector has proper styling classes
      await expect(mobileBiomeSelector).toHaveClass(/block w-full px-3 py-2 rounded-md text-base font-medium text-med bg-neutral-sub border border-text-low/);
    });
  });

  test.describe('Biome Switching Across Viewports', () => {
    test('should sync biome selection between desktop and mobile', async ({ page }) => {
      // Start with desktop view
      await page.setViewportSize({ width: 1024, height: 768 });
      
      // Switch to desert oasis in desktop
      const desktopBiomeSelector = await getDesktopBiomeSelector(page);
      await desktopBiomeSelector.selectOption('desert-oasis');
      await page.waitForTimeout(500);
      
      // Switch to mobile view
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Open mobile menu
      const menuButton = await getMobileMobileButton(page);
      await menuButton.click();
      await page.waitForSelector('.absolute.top-0.inset-x-0', { state: 'visible' });
      
      // Check that mobile selector shows desert oasis
      const mobileBiomeSelector = await getMobileBiomeSelector(page);
      await expect(mobileBiomeSelector).toHaveValue('desert-oasis');
      
      // Switch back to desktop view
      await page.setViewportSize({ width: 1024, height: 768 });
      
      // Check that desktop selector still shows desert oasis
      const desktopBiomeSelectorAgain = await getDesktopBiomeSelector(page);
      await expect(desktopBiomeSelectorAgain).toHaveValue('desert-oasis');
    });

    test('should apply biome changes made in mobile to desktop view', async ({ page }) => {
      // Start with mobile view
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Open mobile menu and switch to desert oasis
      const menuButton = await getMobileMobileButton(page);
      await menuButton.click();
      await page.waitForSelector('.absolute.top-0.inset-x-0', { state: 'visible' });
      
      const mobileBiomeSelector = await getMobileBiomeSelector(page);
      await mobileBiomeSelector.selectOption('desert-oasis');
      await page.waitForTimeout(500);
      
      // Switch to desktop view
      await page.setViewportSize({ width: 1024, height: 768 });
      
      // Check that desktop selector shows desert oasis
      const desktopBiomeSelector = await getDesktopBiomeSelector(page);
      await expect(desktopBiomeSelector).toHaveValue('desert-oasis');
      
      // Check that document class is correct
      const biomeClass = await getCurrentBiomeClass(page);
      expect(biomeClass).toBe('biome-desert-oasis');
    });

    test('should remove old biome classes when switching', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      
      const biomeSelector = await getDesktopBiomeSelector(page);
      
      // Start with misty lava forest
      await expect(biomeSelector).toHaveValue('misty-lava-forest');
      let biomeClass = await getCurrentBiomeClass(page);
      expect(biomeClass).toBe('biome-misty-lava-forest');
      
      // Switch to desert oasis
      await biomeSelector.selectOption('desert-oasis');
      await page.waitForTimeout(500);
      
      // Check that only desert oasis class is present
      biomeClass = await getCurrentBiomeClass(page);
      expect(biomeClass).toBe('biome-desert-oasis');
      
      // Check that misty lava forest class is not present
      const hasOldClass = await page.evaluate(() => {
        return document.documentElement.classList.contains('biome-misty-lava-forest');
      });
      expect(hasOldClass).toBe(false);
    });

    test('should handle rapid biome switching', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      
      const biomeSelector = await getDesktopBiomeSelector(page);
      
      // Rapidly switch between biomes
      await biomeSelector.selectOption('desert-oasis');
      await page.waitForTimeout(200);
      await biomeSelector.selectOption('misty-lava-forest');
      await page.waitForTimeout(200);
      await biomeSelector.selectOption('desert-oasis');
      await page.waitForTimeout(200);
      await biomeSelector.selectOption('misty-lava-forest');
      await page.waitForTimeout(500);
      
      // Final state should be consistent
      await expect(biomeSelector).toHaveValue('misty-lava-forest');
      const biomeClass = await getCurrentBiomeClass(page);
      expect(biomeClass).toBe('biome-misty-lava-forest');
      
      const savedBiome = await getBiomeFromLocalStorage(page);
      expect(savedBiome).toBe('misty-lava-forest');
    });
  });
});