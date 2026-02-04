import { test } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page.ts';
import { CheckoutPage } from '../pages/checkout.page.ts';

test('missing first name', async ({ page }) => {
  const inventory = new InventoryPage(page);
  const checkout = new CheckoutPage(page);

  await page.goto('/inventory.html');

  await test.step('Add item to cart', async () => {
    await inventory.addBackpackToCart();
    await inventory.goToCart();
  });

  await test.step('Start checkout', async () => {
    await checkout.startCheckout();
  });

  await test.step('Submit checkout with missing first name', async () => {
    await checkout.fillCheckoutInfo('', 'Doe', '12345');
    await checkout.submit();
  });

  await test.step('Verify error', async () => {
    await checkout.assertError('Error: First Name is required');
  });
});
