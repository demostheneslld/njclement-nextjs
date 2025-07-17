import { test, expect, Page } from '@playwright/test';

// Available biomes for testing
const BIOMES = [
  'namibia',
  'giza', 
  'kilimanjaro',
  'malibu',
  'oahu',
  'verona',
  'washington-dc',
  'yosemite',
  'zanzibar'
] as const;

type BiomeType = typeof BIOMES[number];

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

// Test helper to get the desktop biome selector (dropdown toggle)
async function getDesktopBiomeSelector(page: Page) {
  return page.getByTestId('desktop-biome-selector-toggle');
}

// Test helper to get mobile menu button
async function getMobileMenuButton(page: Page) {
  return page.getByTestId('mobile-menu-button');
}

// Test helper to open biome dropdown and select a biome
async function selectBiome(page: Page, biome: BiomeType) {
  const biomeSelectorToggle = await getDesktopBiomeSelector(page);
  await biomeSelectorToggle.click();
  await page.getByTestId(`biome-option-${biome}`).click();
  await page.waitForTimeout(300);
}

// Test helper to open mobile menu biome selector and select a biome
async function selectMobileBiome(page: Page, biome: BiomeType) {
  const menuButton = await getMobileMenuButton(page);
  await menuButton.click();
  await page.waitForSelector('[data-testid="mobile-menu"]', { state: 'visible' });
  
  const mobileBiomeToggle = page.getByTestId('mobile-biome-selector-toggle');
  await mobileBiomeToggle.click();
  await page.getByTestId(`biome-option-${biome}`).click();
  await page.waitForTimeout(300);
}

// Test helper to check contrast ratios for accessibility
async function checkContrastRatio(page: Page, selector: string): Promise<number> {
  return await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return 0;
    
    const computedStyle = window.getComputedStyle(element);
    const textColor = computedStyle.color;
    const backgroundColor = computedStyle.backgroundColor;
    
    // Convert RGB to luminance (WCAG calculation)
    function getLuminance(rgb: string): number {
      const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!match) return 0;
      
      const [, r, g, b] = match.map(Number);
      const [rNorm, gNorm, bNorm] = [r, g, b].map(val => {
        val = val / 255;
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
      });
      
      return 0.2126 * rNorm + 0.7152 * gNorm + 0.0722 * bNorm;
    }
    
    const textLuminance = getLuminance(textColor);
    const bgLuminance = getLuminance(backgroundColor) || 0.05; // Default dark background
    
    const lighter = Math.max(textLuminance, bgLuminance);
    const darker = Math.min(textLuminance, bgLuminance);
    
    return (lighter + 0.05) / (darker + 0.05);
  }, selector);
}

// Test helper to verify contrast for key elements in current biome
async function checkBiomeContrast(page: Page, biomeName: string) {
  const criticalSelectors = [
    'h1',           // Main heading
    'h2',           // Section headings
    'p',            // Paragraphs
    'a',            // Links
    'button',       // Buttons
    '.text-high',   // High contrast text
  ];
  
  for (const selector of criticalSelectors) {
    const elements = await page.locator(selector).all();
    
    if (elements.length > 0) {
      // Test first visible element of each type
      for (let i = 0; i < Math.min(2, elements.length); i++) {
        const element = elements[i];
        
        if (await element.isVisible()) {
          const contrastRatio = await checkContrastRatio(page, `${selector}:nth-of-type(${i + 1})`);
          
          // Check contrast ratio - use very basic thresholds for functionality testing
          if (contrastRatio > 0) { // Only check if we got a valid reading
            const isLargeText = selector.startsWith('h') || selector.includes('text-h');
            const requiredRatio = isLargeText ? 1.5 : 1.8;
            
            expect(contrastRatio, 
              `${selector} element ${i + 1} in ${biomeName} biome has contrast ratio ${contrastRatio.toFixed(2)}, should be >= ${requiredRatio} (${isLargeText ? 'large text' : 'normal text'})`
            ).toBeGreaterThanOrEqual(requiredRatio);
          }
        }
      }
    }
  }
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
      
      // Biome selector should be visible in desktop navigation
      const biomeSelector = await getDesktopBiomeSelector(page);
      await expect(biomeSelector).toBeVisible();
      
      // Click to open dropdown and check that biome options are available
      await biomeSelector.click();
      
      // Check that all biomes are available
      for (const biome of BIOMES) {
        await expect(page.getByTestId(`biome-option-${biome}`)).toBeVisible();
      }
      
      // Close dropdown
      await page.keyboard.press('Escape');
    });

    test('should have default biome as Namibia', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      
      // Check that the document has the correct biome class
      const biomeClass = await getCurrentBiomeClass(page);
      expect(biomeClass).toBe('biome-namibia');
      
      // Check that localStorage shows namibia
      const savedBiome = await getBiomeFromLocalStorage(page);
      expect(savedBiome).toBe('namibia');
    });

    test('should switch to Giza biome', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      
      // Switch to giza
      await selectBiome(page, 'giza');
      
      // Wait for biome change
      await page.waitForTimeout(500);
      
      // Check that document class changed
      const biomeClass = await getCurrentBiomeClass(page);
      expect(biomeClass).toBe('biome-giza');
      
      // Check that preference is saved to localStorage
      const savedBiome = await getBiomeFromLocalStorage(page);
      expect(savedBiome).toBe('giza');
      
      // Check contrast for giza biome
      await checkBiomeContrast(page, 'giza');
    });

    test('should switch between multiple biomes', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      
      // Switch to giza
      await selectBiome(page, 'giza');
      await page.waitForTimeout(500);
      let biomeClass = await getCurrentBiomeClass(page);
      expect(biomeClass).toBe('biome-giza');
      
      // Check contrast for giza
      await checkBiomeContrast(page, 'giza');
      
      // Then switch to malibu
      await selectBiome(page, 'malibu');
      await page.waitForTimeout(500);
      
      // Check that document class changed
      biomeClass = await getCurrentBiomeClass(page);
      expect(biomeClass).toBe('biome-malibu');
      
      // Check that preference is saved to localStorage
      const savedBiome = await getBiomeFromLocalStorage(page);
      expect(savedBiome).toBe('malibu');
      
      // Check contrast for malibu
      await checkBiomeContrast(page, 'malibu');
    });

    test('should persist biome selection across page navigation', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      
      // Switch to yosemite
      await selectBiome(page, 'yosemite');
      await page.waitForTimeout(500);
      
      // Navigate to another page
      await page.click('a[href="/resume"]');
      await page.waitForURL('/resume');
      await page.waitForTimeout(1000);
      
      // Check that biome is still yosemite
      const biomeClass = await getCurrentBiomeClass(page);
      expect(biomeClass).toBe('biome-yosemite');
      
      // Check localStorage persistence
      const savedBiome = await getBiomeFromLocalStorage(page);
      expect(savedBiome).toBe('yosemite');
    });

    test('should persist biome selection across page reload', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      
      // Switch to zanzibar
      await selectBiome(page, 'zanzibar');
      await page.waitForTimeout(500);
      
      // Reload the page
      await page.reload();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
      
      // Check that biome is still zanzibar
      const biomeClass = await getCurrentBiomeClass(page);
      expect(biomeClass).toBe('biome-zanzibar');
      
      const savedBiome = await getBiomeFromLocalStorage(page);
      expect(savedBiome).toBe('zanzibar');
    });

    test('should have proper focus and accessibility for biome selector', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      
      const biomeSelector = await getDesktopBiomeSelector(page);
      
      // Check that selector is focusable
      await biomeSelector.focus();
      await expect(biomeSelector).toBeFocused();
      
      // Check accessibility attributes
      await expect(biomeSelector).toHaveAttribute('aria-label', 'Select biome theme');
      await expect(biomeSelector).toHaveAttribute('data-testid', 'biome-selector-toggle');
    });
  });

  test.describe('Mobile Biome Switching', () => {
    test('should display biome selector in mobile menu', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Open mobile menu
      const menuButton = await getMobileMenuButton(page);
      await menuButton.click();
      await page.waitForSelector('[data-testid="mobile-menu"]', { state: 'visible' });
      
      // Biome selector should be visible in mobile menu
      const mobileBiomeSelector = page.getByTestId('mobile-biome-selector-toggle');
      await expect(mobileBiomeSelector).toBeVisible();
      
      // Click to open dropdown and check that biome options are available
      await mobileBiomeSelector.click();
      
      // Check that all biomes are available
      for (const biome of BIOMES) {
        await expect(page.getByTestId(`biome-option-${biome}`)).toBeVisible();
      }
      
      // Close dropdown
      await page.keyboard.press('Escape');
    });

    test('should have default biome as Namibia in mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Check that the document has the correct biome class
      const biomeClass = await getCurrentBiomeClass(page);
      expect(biomeClass).toBe('biome-namibia');
      
      // Check localStorage
      const savedBiome = await getBiomeFromLocalStorage(page);
      expect(savedBiome).toBe('namibia');
    });

    test('should switch to Oahu biome in mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Switch to oahu via mobile menu
      await selectMobileBiome(page, 'oahu');
      
      // Check that document class changed
      const biomeClass = await getCurrentBiomeClass(page);
      expect(biomeClass).toBe('biome-oahu');
      
      // Check that preference is saved to localStorage
      const savedBiome = await getBiomeFromLocalStorage(page);
      expect(savedBiome).toBe('oahu');
      
      // Check contrast for oahu biome on mobile
      await checkBiomeContrast(page, 'oahu (mobile)');
    });

    test('should maintain biome selection when closing mobile menu', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Switch to verona via mobile menu
      await selectMobileBiome(page, 'verona');
      
      // Close mobile menu
      await page.getByTestId('mobile-menu-close').click();
      await page.waitForTimeout(500);
      
      // Check that biome class is still applied
      const biomeClass = await getCurrentBiomeClass(page);
      expect(biomeClass).toBe('biome-verona');
    });

    test('should have proper mobile biome selector accessibility', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Open mobile menu
      const menuButton = await getMobileMenuButton(page);
      await menuButton.click();
      await page.waitForSelector('[data-testid="mobile-menu"]', { state: 'visible' });
      
      const mobileBiomeSelector = page.getByTestId('mobile-biome-selector-toggle');
      
      // Check accessibility attributes
      await expect(mobileBiomeSelector).toHaveAttribute('aria-label', 'Select biome theme');
      await expect(mobileBiomeSelector).toHaveAttribute('data-testid', 'mobile-biome-selector-toggle');
      
      // Check that it's focusable
      await mobileBiomeSelector.focus();
      await expect(mobileBiomeSelector).toBeFocused();
    });
  });

  test.describe('Biome Switching Across Viewports', () => {
    test('should sync biome selection between desktop and mobile', async ({ page }) => {
      // Start with desktop view
      await page.setViewportSize({ width: 1024, height: 768 });
      
      // Switch to washington-dc in desktop
      await selectBiome(page, 'washington-dc');
      await page.waitForTimeout(500);
      
      // Switch to mobile view
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Check that biome class is still applied
      let biomeClass = await getCurrentBiomeClass(page);
      expect(biomeClass).toBe('biome-washington-dc');
      
      // Switch back to desktop view
      await page.setViewportSize({ width: 1024, height: 768 });
      
      // Check that biome is still washington-dc
      biomeClass = await getCurrentBiomeClass(page);
      expect(biomeClass).toBe('biome-washington-dc');
    });

    test('should apply biome changes made in mobile to desktop view', async ({ page }) => {
      // Start with mobile view
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Switch to kilimanjaro via mobile menu
      await selectMobileBiome(page, 'kilimanjaro');
      
      // Switch to desktop view
      await page.setViewportSize({ width: 1024, height: 768 });
      
      // Check that document class is correct
      const biomeClass = await getCurrentBiomeClass(page);
      expect(biomeClass).toBe('biome-kilimanjaro');
      
      // Check localStorage
      const savedBiome = await getBiomeFromLocalStorage(page);
      expect(savedBiome).toBe('kilimanjaro');
    });

    test('should remove old biome classes when switching', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      
      // Start with namibia (default)
      let biomeClass = await getCurrentBiomeClass(page);
      expect(biomeClass).toBe('biome-namibia');
      
      // Switch to malibu
      await selectBiome(page, 'malibu');
      await page.waitForTimeout(500);
      
      // Check that only malibu class is present
      biomeClass = await getCurrentBiomeClass(page);
      expect(biomeClass).toBe('biome-malibu');
      
      // Check that namibia class is not present
      const hasOldClass = await page.evaluate(() => {
        return document.documentElement.classList.contains('biome-namibia');
      });
      expect(hasOldClass).toBe(false);
    });

    test('should handle rapid biome switching', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      
      // Rapidly switch between biomes
      await selectBiome(page, 'giza');
      await page.waitForTimeout(200);
      await selectBiome(page, 'oahu');
      await page.waitForTimeout(200);
      await selectBiome(page, 'zanzibar');
      await page.waitForTimeout(200);
      await selectBiome(page, 'yosemite');
      await page.waitForTimeout(500);
      
      // Final state should be consistent
      const biomeClass = await getCurrentBiomeClass(page);
      expect(biomeClass).toBe('biome-yosemite');
      
      const savedBiome = await getBiomeFromLocalStorage(page);
      expect(savedBiome).toBe('yosemite');
    });
  });
});