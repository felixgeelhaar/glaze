import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function captureScreenshots() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set viewport for consistent screenshots
  await page.setViewportSize({ width: 1200, height: 800 });
  
  try {
    // Navigate to the demo app
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Create screenshots directory
    const screenshotsDir = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir);
    }
    
    // Screenshot 1: Main hero section
    await page.screenshot({
      path: path.join(screenshotsDir, 'hero.png'),
      clip: { x: 0, y: 0, width: 1200, height: 600 }
    });
    console.log('✓ Captured hero screenshot');
    
    // Screenshot 2: Full page screenshot
    await page.screenshot({
      path: path.join(screenshotsDir, 'full-page.png'),
      fullPage: true
    });
    console.log('✓ Captured full page screenshot');
    
    // Try to navigate to different pages and capture if they exist
    try {
      await page.click('a[href="/react"]');
      await page.waitForLoadState('networkidle');
      await page.screenshot({
        path: path.join(screenshotsDir, 'react-components.png'),
        clip: { x: 0, y: 0, width: 1200, height: 800 }
      });
      console.log('✓ Captured React components screenshot');
    } catch (e) {
      console.log('! React page not found, skipping');
    }
    
    try {
      await page.goto('http://localhost:3000/vue');
      await page.waitForLoadState('networkidle');
      await page.screenshot({
        path: path.join(screenshotsDir, 'vue-components.png'),
        clip: { x: 0, y: 0, width: 1200, height: 800 }
      });
      console.log('✓ Captured Vue components screenshot');
    } catch (e) {
      console.log('! Vue page not found, skipping');
    }
    
    // Go back to home and try to capture any visible components
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Try to capture individual components if they exist
    const buttons = page.locator('button, glz-button');
    if (await buttons.count() > 0) {
      await buttons.first().screenshot({
        path: path.join(screenshotsDir, 'button-component.png')
      });
      console.log('✓ Captured button component screenshot');
    }
    
    const cards = page.locator('[class*="card"], glz-card');
    if (await cards.count() > 0) {
      await cards.first().screenshot({
        path: path.join(screenshotsDir, 'card-component.png')
      });
      console.log('✓ Captured card component screenshot');
    }
    
  } catch (error) {
    console.error('Error capturing screenshots:', error);
  } finally {
    await browser.close();
  }
}

captureScreenshots();