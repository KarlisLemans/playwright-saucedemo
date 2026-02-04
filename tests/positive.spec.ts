import { test, expect } from '@playwright/test';

test.describe('@regression Positive scenarios', () => {

  test('Successful login redirects to inventory', async ({ page }) => {
    await page.goto('/');
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Cart badge increases after adding item', async ({ page }) => {
    await page.goto('/inventory.html');
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('Successful checkout completes', async ({ page }) => {
    await page.goto('/cart.html');
    await page.click('[data-test="checkout"]');

    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');
    await page.click('[data-test="finish"]');

    await expect(page.locator('.complete-header'))
      .toHaveText('Thank you for your order!');
  });

});
