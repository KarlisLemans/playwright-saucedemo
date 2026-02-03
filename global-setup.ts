import { chromium, FullConfig } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function globalSetup(config: FullConfig) {
  // Ensure storage folder exists
  const storagePath = path.join(__dirname, 'storage');
  if (!fs.existsSync(storagePath)) {
    fs.mkdirSync(storagePath);
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate and login
  await page.goto('https://www.saucedemo.com');
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  // Wait for inventory page to load
  await page.waitForURL('**/inventory.html');

  // Save auth state
  await context.storageState({ path: path.join(storagePath, 'auth.json') });

  await browser.close();
}

export default globalSetup;
