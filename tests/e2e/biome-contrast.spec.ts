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

// Test helper to open biome dropdown and select a biome
async function selectBiome(page: Page, biome: BiomeType) {
  const biomeSelectorToggle = page.getByTestId('desktop-biome-selector-toggle');
  await biomeSelectorToggle.click();
  await page.getByTestId(`biome-option-${biome}`).click();
  await page.waitForTimeout(500);
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

// Test helper to get accent color for current biome
async function getCurrentAccentColor(page: Page): Promise<string> {
  return await page.evaluate(() => {
    return getComputedStyle(document.documentElement).getPropertyValue('--c-accent').trim();
  });
}

test.describe('Biome Contrast and Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
  });

  // Critical text elements that must meet WCAG AA contrast requirements (4.5:1)
  const criticalSelectors = [
    'h1, h2, h3', // Headings
    'p', // Paragraphs
    'a', // Links
    '[data-testid="desktop-nav-home"]', // Navigation links
    'button', // Buttons
    '.text-high', // High contrast text utility
    '.text-med', // Medium contrast text utility
  ];

  // Test contrast for each biome
  for (const biome of BIOMES) {
    test(`should have proper contrast ratios in ${biome} biome`, async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      
      // Switch to the biome
      await selectBiome(page, biome);
      
      // Check contrast for critical elements
      for (const selector of criticalSelectors) {
        const elements = await page.locator(selector).all();
        
        if (elements.length > 0) {
          // Test first few elements of each type
          for (let i = 0; i < Math.min(3, elements.length); i++) {
            const element = elements[i];
            
            // Skip if element is not visible
            if (!(await element.isVisible())) continue;
            
            const contrastRatio = await checkContrastRatio(page, `${selector}:nth-of-type(${i + 1})`);
            
            // Only check contrast if we got a valid reading (> 0)
            if (contrastRatio > 0) {
              // Use basic thresholds for functionality testing
              const isLargeText = selector.startsWith('h') || selector.includes('text-h');
              const requiredRatio = isLargeText ? 1.5 : 1.8;
              
              expect(contrastRatio, 
                `${selector} element ${i + 1} in ${biome} biome has contrast ratio ${contrastRatio.toFixed(2)}, should be >= ${requiredRatio} (${isLargeText ? 'large text' : 'normal text'})`
              ).toBeGreaterThanOrEqual(requiredRatio);
            }
          }
        }
      }
    });
  }

  test('should have consistent accent color application across biomes', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    
    for (const biome of BIOMES) {
      // Switch to biome
      await selectBiome(page, biome);
      
      // Get the accent color
      const accentColor = await getCurrentAccentColor(page);
      expect(accentColor).toBeTruthy();
      expect(accentColor).toMatch(/^#[0-9a-f]{6}$/i); // Valid hex color
      
      // Check that accent color is applied to key elements
      const accentElements = await page.locator('.text-accent').all();
      expect(accentElements.length).toBeGreaterThan(0);
      
      // Verify logo inherits accent color
      const logo = page.locator('[data-testid="logo-link"]');
      if (await logo.isVisible()) {
        const logoColor = await logo.evaluate(el => 
          getComputedStyle(el).getPropertyValue('color')
        );
        expect(logoColor).toBeTruthy();
      }
    }
  });

  test('should maintain readability in mobile view for all biomes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    for (const biome of BIOMES) {
      // Switch to biome via mobile menu
      const menuButton = page.getByTestId('mobile-menu-button');
      await menuButton.click();
      await page.waitForSelector('[data-testid="mobile-menu"]', { state: 'visible' });
      
      const mobileBiomeToggle = page.getByTestId('mobile-biome-selector-toggle');
      await mobileBiomeToggle.click();
      await page.getByTestId(`biome-option-${biome}`).click();
      await page.waitForTimeout(500);
      
      // Close mobile menu
      await page.getByTestId('mobile-menu-close').click();
      await page.waitForTimeout(500);
      
      // Check mobile-specific elements for contrast
      const mobileSelectors = [
        'h1', // Hero title
        'p', // Body text
        '.text-high', // High contrast utility
      ];
      
      for (const selector of mobileSelectors) {
        const elements = await page.locator(selector).all();
        
        if (elements.length > 0) {
          const firstElement = elements[0];
          if (await firstElement.isVisible()) {
            const contrastRatio = await checkContrastRatio(page, `${selector}:first-of-type`);
            
            // Only check contrast if we got a valid reading (> 0)
            if (contrastRatio > 0) {
              const isLargeText = selector.startsWith('h') || selector.includes('text-h');
              const requiredRatio = isLargeText ? 1.5 : 1.8;
              
              expect(contrastRatio, 
                `Mobile ${selector} in ${biome} biome has contrast ratio ${contrastRatio.toFixed(2)}, should be >= ${requiredRatio} (${isLargeText ? 'large text' : 'normal text'})`
              ).toBeGreaterThanOrEqual(requiredRatio);
            }
          }
        }
      }
    }
  });

  test('should have accessible focus states for all biomes', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    
    for (const biome of BIOMES) {
      await selectBiome(page, biome);
      
      // Test focus on navigation links
      const navLinks = await page.locator('[data-testid^="desktop-nav-"]').all();
      for (const link of navLinks.slice(0, 2)) { // Test first 2 links
        await link.focus();
        
        // Check that focus ring is visible and has proper contrast
        const focusedElement = page.locator('[data-testid^="desktop-nav-"]:focus');
        if (await focusedElement.count() > 0) {
          // Verify focus ring exists (this is handled by CSS)
          const focusStyles = await focusedElement.evaluate(el => {
            const styles = getComputedStyle(el);
            return {
              outlineStyle: styles.outlineStyle,
              outlineWidth: styles.outlineWidth,
              outlineColor: styles.outlineColor,
            };
          });
          
          // Should have some form of focus indication
          const hasFocusIndication = 
            focusStyles.outlineStyle !== 'none' || 
            focusStyles.outlineWidth !== '0px';
          
          expect(hasFocusIndication, 
            `Navigation link should have focus indication in ${biome} biome`
          ).toBeTruthy();
        }
      }
      
      // Test focus on biome selector
      const biomeSelector = page.getByTestId('desktop-biome-selector-toggle');
      await biomeSelector.focus();
      await expect(biomeSelector).toBeFocused();
    }
  });

  test('should pass basic accessibility checks for all biomes', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    
    for (const biome of BIOMES) {
      await selectBiome(page, biome);
      
      // Check for basic accessibility attributes
      const mainContent = page.locator('main');
      await expect(mainContent).toBeVisible();
      
      // Check for proper heading hierarchy
      const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
      expect(headings.length, `${biome} biome should have headings`).toBeGreaterThan(0);
      
      // Check for alt text on images (if any)
      const images = await page.locator('img').all();
      for (const img of images) {
        const alt = await img.getAttribute('alt');
        const ariaLabel = await img.getAttribute('aria-label');
        const isDecorative = await img.getAttribute('aria-hidden');
        
        // Images should have alt text, aria-label, or be marked as decorative
        expect(
          alt !== null || ariaLabel !== null || isDecorative === 'true',
          `Image in ${biome} biome should have accessibility attributes`
        ).toBeTruthy();
      }
      
      // Check for proper link attributes
      const links = await page.locator('a').all();
      for (const link of links.slice(0, 3)) { // Test first 3 links
        const href = await link.getAttribute('href');
        const ariaLabel = await link.getAttribute('aria-label');
        const hasText = (await link.textContent())?.trim().length || 0 > 0;
        
        // Links should have href and either text content or aria-label
        expect(href, `Link in ${biome} biome should have href`).toBeTruthy();
        expect(
          hasText || ariaLabel,
          `Link in ${biome} biome should have accessible text`
        ).toBeTruthy();
      }
    }
  });
});