import { test, expect } from '@playwright/test';

test.describe('Negative login scenarios', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show error for invalid username', async ({ page }) => {
    await page.fill('[data-test="username"]', 'invalid_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    await expect(page.locator('[data-test="error"]'))
      .toHaveText(/Username and password do not match/);
  });

  test('should show error for invalid password', async ({ page }) => {
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'wrong_password');
    await page.click('[data-test="login-button"]');

    await expect(page.locator('[data-test="error"]'))
      .toBeVisible();
  });

  test('should show error for empty username', async ({ page }) => {
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    await expect(page.locator('[data-test="error"]'))
      .toHaveText(/Username is required/);
  });

  test('should show error for empty password', async ({ page }) => {
    await page.fill('[data-test="username"]', 'standard_user');
    await page.click('[data-test="login-button"]');

    await expect(page.locator('[data-test="error"]'))
      .toHaveText(/Password is required/);
  });

  test('should block locked out user', async ({ page }) => {
    await page.fill('[data-test="username"]', 'locked_out_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    await expect(page.locator('[data-test="error"]'))
      .toHaveText(/locked out/);
  });

});
