import { test } from '@playwright/test';
import { CheckoutPage } from '../pages/checkout.page';

test.describe('Negative checkout scenarios', () => {

  test('missing first name', async ({ page }) => {
    const checkout = new CheckoutPage(page);

    await test.step('Start checkout', async () => {
      await checkout.startCheckout();
    });

    await test.step('Leave first name empty', async () => {
      await checkout.fillCheckoutInfo('', 'Doe', '12345');
    });

    await test.step('Submit checkout', async () => {
      await checkout.submit();
    });

    await test.step('Verify error message', async () => {
      await checkout.assertError('First Name is required');
    });
  });

  test('missing last name', async ({ page }) => {
    const checkout = new CheckoutPage(page);

    await checkout.startCheckout();
    await checkout.fillCheckoutInfo('John', '', '12345');
    await checkout.submit();
    await checkout.assertError('Last Name is required');
  });

  test('missing postal code', async ({ page }) => {
    const checkout = new CheckoutPage(page);

    await checkout.startCheckout();
    await checkout.fillCheckoutInfo('John', 'Doe', '');
    await checkout.submit();
    await checkout.assertError('Postal Code is required');
  });

});
