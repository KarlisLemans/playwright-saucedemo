import { test } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { CheckoutCompletePage } from '../pages/checkoutComplete.page';

test('User can successfully complete checkout', async ({ page }) => {
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);
  const complete = new CheckoutCompletePage(page);

  await page.goto('/inventory.html');

  await inventory.addBackpackToCart();
  await inventory.goToCart();

  await cart.checkout();

  await checkout.fillCheckoutInfo('John', 'Doe', '12345');
  await checkout.submit();

  await complete.verifyCompletion();
});
