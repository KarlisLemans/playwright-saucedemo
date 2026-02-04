import { test, expect } from '@playwright/test';

test.describe('@negative Validation scenarios', () => {

  test('Login fails with wrong password', async ({ page }) => {
    await page.goto('/');
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'wrong_password');
    await page.click('[data-test="login-button"]');

    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  test('Checkout fails without first name', async ({ page }) => {
    await page.goto('/cart.html');
    await page.click('[data-test="checkout"]');

    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');

    await expect(page.locator('[data-test="error"]'))
      .toHaveText('Error: First Name is required');
  });

  test('Checkout fails without postal code', async ({ page }) => {
    await page.goto('/cart.html');
    await page.click('[data-test="checkout"]');

    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.click('[data-test="continue"]');

    await expect(page.locator('[data-test="error"]'))
      .toHaveText('Error: Postal Code is required');
  });

});
