import { test, expect } from '@playwright/test';

test.describe('@smoke Critical flows', () => {

  test('@smoke User can log in', async ({ page }) => {
    await page.goto('/');
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    await expect(page).toHaveURL(/inventory.html/);
  });

  test('@smoke User can add item to cart', async ({ page }) => {
    await page.goto('/inventory.html');
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('@smoke User can start checkout', async ({ page }) => {
    await page.goto('/cart.html');
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();
  });

});
