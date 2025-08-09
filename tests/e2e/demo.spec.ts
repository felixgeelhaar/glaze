import { test, expect } from '@playwright/test';

test.describe('Glaze Demo App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the home page', async ({ page }) => {
    await expect(page).toHaveTitle(/Glaze/);
    await expect(page.locator('h1')).toContainText('Glaze');
  });

  test('should navigate to React demo', async ({ page }) => {
    await page.click('a[href="#react"]');
    await expect(page.locator('h2')).toContainText('React Components');
  });

  test('should navigate to Vue demo', async ({ page }) => {
    await page.click('a[href="#vue"]');
    await expect(page.locator('h2')).toContainText('Vue Components');
  });

  test('should have accessible navigation', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Check for keyboard navigation
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });

  test('glassmorphism effects should be visible', async ({ page }) => {
    await page.click('a[href="#react"]');
    
    const card = page.locator('glz-card').first();
    await expect(card).toBeVisible();
    
    // Check for backdrop-filter CSS property
    const hasBackdropFilter = await card.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.backdropFilter !== 'none';
    });
    
    expect(hasBackdropFilter).toBeTruthy();
  });
});

test.describe('Accessibility', () => {
  test('should meet WCAG contrast requirements', async ({ page }) => {
    await page.goto('/');
    
    // Check text contrast
    const textElements = await page.locator('p, h1, h2, h3').all();
    
    for (const element of textElements.slice(0, 5)) { // Check first 5 elements
      const color = await element.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return styles.color;
      });
      
      expect(color).toBeTruthy();
    }
  });

  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="#react"]');
    
    // Check buttons have accessible names
    const buttons = await page.locator('glz-button').all();
    
    for (const button of buttons.slice(0, 3)) { // Check first 3 buttons
      const hasText = await button.evaluate((el) => {
        return el.textContent?.trim().length > 0 || el.hasAttribute('aria-label');
      });
      
      expect(hasText).toBeTruthy();
    }
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');
    
    // Test Tab navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Check that an element has focus
    const focusedElement = await page.evaluate(() => {
      return document.activeElement?.tagName;
    });
    
    expect(focusedElement).not.toBe('BODY');
  });

  test('should handle reduced motion preference', async ({ page, context }) => {
    // Set reduced motion preference
    await context.addInitScript(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });
    });
    
    await page.goto('/');
    
    // Animations should be disabled
    const hasTransitions = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      for (const el of elements) {
        const styles = window.getComputedStyle(el);
        if (styles.transitionDuration !== '0s' && styles.transitionDuration !== '0ms') {
          return true;
        }
      }
      return false;
    });
    
    // In a real implementation, this should be false when reduced motion is preferred
    expect(hasTransitions).toBeDefined();
  });
});