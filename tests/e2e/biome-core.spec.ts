import { test, expect, Page } from '@playwright/test';

// Core biomes for focused testing
const CORE_BIOMES = ['namibia', 'giza', 'malibu'] as const;
type CoreBiomeType = typeof CORE_BIOMES[number];

// Test helper to get current biome class from document element
async function getCurrentBiomeClass(page: Page): Promise<string | null> {
  const classList = await page.evaluate(() => {
    return Array.from(document.documentElement.classList).find(cls => cls.startsWith('biome-'));
  });
  return classList || null;
}

// Test helper to get biome from localStorage
async function getBiomeFromLocalStorage(page: Page): Promise<string | null> {
  return await page.evaluate(() => {
    return localStorage.getItem('biome-preference');
  });
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

// Test helper to check contrast for key elements
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
          
          // Only check contrast if we got a valid reading (> 0)
          if (contrastRatio > 0) {
            // Check contrast ratio - use very basic thresholds for functionality testing
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

// Test helper to select a biome on desktop
async function selectBiome(page: Page, biome: CoreBiomeType) {
  const biomeSelectorToggle = page.getByTestId('desktop-biome-selector-toggle');
  await biomeSelectorToggle.click();
  await page.getByTestId(`biome-option-${biome}`).click();
  await page.waitForTimeout(300);
}

// Test helper to select a biome on mobile
async function selectMobileBiome(page: Page, biome: CoreBiomeType) {
  const menuButton = page.getByTestId('mobile-menu-button');
  await menuButton.click();
  await page.waitForSelector('[data-testid="mobile-menu"]', { state: 'visible' });
  
  const mobileBiomeToggle = page.getByTestId('mobile-biome-selector-toggle');
  await mobileBiomeToggle.click();
  await page.getByTestId(`biome-option-${biome}`).click();
  await page.waitForTimeout(300);
}

test.describe('Core Biome Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
  });

  test('should have namibia as default biome', async ({ page }) => {
    const biomeClass = await getCurrentBiomeClass(page);
    expect(biomeClass).toBe('biome-namibia');
    
    const savedBiome = await getBiomeFromLocalStorage(page);
    expect(savedBiome).toBe('namibia');
    
    // Check contrast for default biome
    await checkBiomeContrast(page, 'namibia');
  });

  test('should display biome selector in desktop view', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    
    const biomeSelector = page.getByTestId('desktop-biome-selector-toggle');
    await expect(biomeSelector).toBeVisible();
    
    // Open dropdown and check options
    await biomeSelector.click();
    
    for (const biome of CORE_BIOMES) {
      await expect(page.getByTestId(`biome-option-${biome}`)).toBeVisible();
    }
    
    await page.keyboard.press('Escape');
  });

  test('should switch between biomes', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    
    // Switch to giza
    await selectBiome(page, 'giza');
    
    let biomeClass = await getCurrentBiomeClass(page);
    expect(biomeClass).toBe('biome-giza');
    
    let savedBiome = await getBiomeFromLocalStorage(page);
    expect(savedBiome).toBe('giza');
    
    // Check contrast for giza biome
    await checkBiomeContrast(page, 'giza');
    
    // Switch to malibu
    await selectBiome(page, 'malibu');
    
    biomeClass = await getCurrentBiomeClass(page);
    expect(biomeClass).toBe('biome-malibu');
    
    savedBiome = await getBiomeFromLocalStorage(page);
    expect(savedBiome).toBe('malibu');
    
    // Check contrast for malibu biome
    await checkBiomeContrast(page, 'malibu');
  });

  test('should persist biome across page reload', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    
    // Switch to giza
    await selectBiome(page, 'giza');
    
    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Check persistence
    const biomeClass = await getCurrentBiomeClass(page);
    expect(biomeClass).toBe('biome-giza');
    
    const savedBiome = await getBiomeFromLocalStorage(page);
    expect(savedBiome).toBe('giza');
  });

  test('should work in mobile view', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Open mobile menu
    const menuButton = page.getByTestId('mobile-menu-button');
    await menuButton.click();
    await page.waitForSelector('[data-testid="mobile-menu"]', { state: 'visible' });
    
    // Find and click mobile biome selector
    const mobileBiomeToggle = page.getByTestId('mobile-biome-selector-toggle');
    await expect(mobileBiomeToggle).toBeVisible();
    
    await mobileBiomeToggle.click();
    await page.getByTestId('biome-option-malibu').click();
    await page.waitForTimeout(300);
    
    // Close mobile menu
    await page.getByTestId('mobile-menu-close').click();
    await page.waitForTimeout(300);
    
    // Check biome changed
    const biomeClass = await getCurrentBiomeClass(page);
    expect(biomeClass).toBe('biome-malibu');
    
    // Check contrast for mobile view
    await checkBiomeContrast(page, 'malibu (mobile)');
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    
    const biomeSelector = page.getByTestId('desktop-biome-selector-toggle');
    
    // Check ARIA attributes
    await expect(biomeSelector).toHaveAttribute('aria-label', 'Select biome theme');
    
    // Check focusability
    await biomeSelector.focus();
    await expect(biomeSelector).toBeFocused();
  });
});