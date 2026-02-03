import { Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async checkout() {
    await this.page.click('[data-test="checkout"]');
    await expect(this.page).toHaveURL('/checkout-step-one.html');
  }
}
