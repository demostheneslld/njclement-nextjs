import { test, expect, Page } from '@playwright/test';

// Test helper to wait for navigation and verify page load
async function verifyPageLoad(page: Page, expectedUrl: string, expectedHeading?: string) {
  await page.waitForURL(expectedUrl);
  expect(page.url()).toContain(expectedUrl);
  
  if (expectedHeading) {
    // Wait for main content to load
    await page.waitForSelector('main');
    await expect(page.locator('h1, h2').first()).toContainText(expectedHeading);
  }
}

// Test helper to get desktop biome selector
async function getDesktopBiomeSelector(page: Page) {
  return page.getByTestId('desktop-biome-selector');
}

// Test helper to get mobile biome selector
async function getMobileBiomeSelector(page: Page) {
  return page.getByTestId('mobile-biome-selector');
}

// Test helper to get desktop mobile button
async function getDesktopMobileButton(page: Page) {
  return page.getByTestId('mobile-menu-button').first();
}

// Test helper to get mobile mobile button
async function getMobileMobileButton(page: Page) {
  return page.getByTestId('mobile-menu-button');
}

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Wait for React hydration
    await page.waitForTimeout(1000);
  });

  test.describe('Desktop Navigation', () => {
    test('should display all navigation links in desktop view', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      
      // Check main navigation links from NAV_PAGES
      await expect(page.getByTestId('desktop-nav-home').first()).toContainText('Home');
      await expect(page.getByTestId('desktop-nav-resume').first()).toContainText('Resume');
      await expect(page.getByTestId('desktop-nav-portfolio').first()).toContainText('Portfolio');
      
      // Check contact button in desktop layout
      await expect(page.getByTestId('desktop-contact-button')).toBeVisible();
    });

    test('should navigate to Home page', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      
      await page.getByTestId('desktop-nav-home').first().click();
      await verifyPageLoad(page, '/');
      
      // Check that Home link has current page styling
      await expect(page.getByTestId('desktop-nav-home').first()).toHaveClass(/text-high bg-neutral-sub/);
    });

    test('should navigate to Resume page', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      
      await page.getByTestId('desktop-nav-resume').first().click();
      await verifyPageLoad(page, '/resume');
      
      // Check that Resume link has current page styling
      await expect(page.getByTestId('desktop-nav-resume').first()).toHaveClass(/text-high bg-neutral-sub/);
    });

    test('should navigate to Portfolio page', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      
      await page.getByTestId('desktop-nav-portfolio').first().click();
      await verifyPageLoad(page, '/portfolio');
      
      // Check that Portfolio link has current page styling
      await expect(page.getByTestId('desktop-nav-portfolio').first()).toHaveClass(/text-high bg-neutral-sub/);
    });

    test('should navigate to Contact page via button', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      
      await page.getByTestId('desktop-contact-button').click();
      await verifyPageLoad(page, '/contact');
    });

    test('should navigate to Chat page if it exists', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      
      // Try to navigate to chat page directly
      await page.goto('/chat');
      await page.waitForLoadState('networkidle');
      
      // If chat page exists, test should pass
      expect(page.url()).toContain('/chat');
    });

    test('should handle external links with target="_blank"', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      
      // Look for external links (they should have FiExternalLink icon)
      const externalLinks = page.locator('a[target="_blank"]');
      const count = await externalLinks.count();
      
      if (count > 0) {
        // Check that external links have the external icon
        for (let i = 0; i < count; i++) {
          await expect(externalLinks.nth(i).locator('svg')).toBeVisible();
        }
      }
    });

    test('should show hover effects on navigation links', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      
      const homeLink = page.getByTestId('desktop-nav-home').first();
      
      // Hover over home link
      await homeLink.hover();
      
      // Check that hover classes are applied (hover:text-high hover:bg-neutral-sub)
      await expect(homeLink).toHaveClass(/hover:text-high hover:bg-neutral-sub/);
    });

    test('should hide mobile menu button in desktop view', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      
      // Mobile menu button should not be visible in desktop view
      const mobileButton = await getDesktopMobileButton(page);
      await expect(mobileButton).not.toBeVisible();
    });
  });

  test.describe('Mobile Navigation', () => {
    test('should display mobile menu button in mobile view', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Mobile menu button should be visible
      const mobileButton = await getMobileMobileButton(page);
      await expect(mobileButton).toBeVisible();
      
      // Desktop navigation should be hidden
      await expect(page.getByTestId('desktop-nav-home').first()).not.toBeVisible();
    });

    test('should toggle mobile menu on button click', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const menuButton = await getMobileMobileButton(page);
      
      // Initially menu should be closed
      await expect(menuButton).toBeVisible();
      await expect(page.getByTestId('mobile-menu')).not.toBeVisible();
      
      // Click to open menu
      await menuButton.click();
      
      // Menu should be open with proper z-index
      const mobileMenu = page.getByTestId('mobile-menu');
      await expect(mobileMenu).toBeVisible();
      
      // Check if backdrop is present
      const backdrop = page.getByTestId('mobile-menu-backdrop');
      await expect(backdrop).toBeVisible();
      
      // Click backdrop to close menu
      await backdrop.click();
      
      // Menu should be closed
      await expect(mobileMenu).not.toBeVisible();
    });

    test('should display all navigation links in mobile menu', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Open mobile menu
      const menuButton = await getMobileMobileButton(page);
      await menuButton.click();
      
      // Check that all navigation links are visible in mobile menu
      const mobileMenu = page.getByTestId('mobile-menu');
      await expect(mobileMenu).toBeVisible();
      
      await expect(page.getByTestId('mobile-nav-home')).toContainText('Home');
      await expect(page.getByTestId('mobile-nav-resume')).toContainText('Resume');
      await expect(page.getByTestId('mobile-nav-portfolio')).toContainText('Portfolio');
    });

    test('should navigate and close mobile menu on link click', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Open mobile menu
      const menuButton = await getMobileMobileButton(page);
      await menuButton.click();
      
      // Click on Resume link
      await page.getByTestId('mobile-nav-resume').click();
      
      // Should navigate to resume page
      await verifyPageLoad(page, '/resume');
      
      // Mobile menu should be closed
      await expect(page.getByTestId('mobile-menu')).not.toBeVisible();
    });

    test('should show current page styling in mobile menu', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Navigate to portfolio page first
      await page.goto('/portfolio');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
      
      // Open mobile menu
      const menuButton = await getMobileMobileButton(page);
      await menuButton.click();
      
      // Portfolio link should have current page styling
      const portfolioLink = page.getByTestId('mobile-nav-portfolio');
      await expect(portfolioLink).toHaveClass(/text-high bg-neutral-sub/);
    });

    test('should handle external links in mobile menu', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Open mobile menu
      const menuButton = await getMobileMobileButton(page);
      await menuButton.click();
      
      // Look for external links in mobile menu
      const mobileMenu = page.getByTestId('mobile-menu');
      const externalLinks = mobileMenu.locator('a[target="_blank"]');
      const count = await externalLinks.count();
      
      if (count > 0) {
        // Check that external links have the external icon
        for (let i = 0; i < count; i++) {
          await expect(externalLinks.nth(i).locator('svg')).toBeVisible();
        }
      }
    });

    test('should have proper mobile menu styling', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Open mobile menu
      const menuButton = await getMobileMobileButton(page);
      await menuButton.click();
      
      const mobileMenu = page.getByTestId('mobile-menu');
      
      // Check that mobile menu has proper styling classes
      await expect(mobileMenu).toHaveClass(/fixed top-20 left-0 right-0 z-50 md:hidden/);
      
      // Check that the menu content has glass styling
      const menuContent = mobileMenu.locator('div').first();
      await expect(menuContent).toHaveClass(/bg-glass-elev1 backdrop-blur-xl border-b border-white\/20 shadow-elev2/);
    });
  });

  test.describe('Responsive Navigation Behavior', () => {
    test('should switch between desktop and mobile navigation on viewport change', async ({ page }) => {
      // Start with desktop view
      await page.setViewportSize({ width: 1024, height: 768 });
      
      // Desktop navigation should be visible
      await expect(page.getByTestId('desktop-nav-home').first()).toBeVisible();
      const desktopMobileButton = await getDesktopMobileButton(page);
      await expect(desktopMobileButton).not.toBeVisible();
      
      // Switch to mobile view
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Mobile navigation should be visible
      await expect(page.getByTestId('desktop-nav-home').first()).not.toBeVisible();
      const mobileMobileButton = await getMobileMobileButton(page);
      await expect(mobileMobileButton).toBeVisible();
      
      // Switch back to desktop view
      await page.setViewportSize({ width: 1024, height: 768 });
      
      // Desktop navigation should be visible again
      await expect(page.getByTestId('desktop-nav-home').first()).toBeVisible();
      const desktopMobileButtonAgain = await getDesktopMobileButton(page);
      await expect(desktopMobileButtonAgain).not.toBeVisible();
    });

    test('should close mobile menu when switching to desktop view', async ({ page }) => {
      // Start with mobile view
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Open mobile menu
      const menuButton = await getMobileMobileButton(page);
      await menuButton.click();
      await expect(page.getByTestId('mobile-menu')).toBeVisible();
      
      // Switch to desktop view
      await page.setViewportSize({ width: 1024, height: 768 });
      
      // Mobile menu should be hidden (handled by CSS)
      await expect(page.getByTestId('mobile-menu')).not.toBeVisible();
    });

    test('should maintain navigation state across different viewports', async ({ page }) => {
      // Navigate to resume page in desktop view
      await page.setViewportSize({ width: 1024, height: 768 });
      await page.getByTestId('desktop-nav-resume').first().click();
      await verifyPageLoad(page, '/resume');
      
      // Switch to mobile view
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Open mobile menu
      const menuButton = await getMobileMobileButton(page);
      await menuButton.click();
      
      // Resume link should still have current page styling
      const resumeLink = page.getByTestId('mobile-nav-resume');
      await expect(resumeLink).toHaveClass(/text-high bg-neutral-sub/);
    });
  });
});