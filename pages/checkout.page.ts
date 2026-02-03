import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill('[data-test="firstName"]', firstName);
    await this.page.fill('[data-test="lastName"]', lastName);
    await this.page.fill('[data-test="postalCode"]', postalCode);
    await this.page.click('[data-test="continue"]');
    await expect(this.page).toHaveURL('/checkout-step-two.html');
  }

  async finishCheckout() {
    await this.page.click('[data-test="finish"]');
    await expect(this.page).toHaveURL('/checkout-complete.html');
  }
}
