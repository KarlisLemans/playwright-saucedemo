import { Page, expect } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyCompletion() {
    await expect(
      this.page.getByText('Thank you for your order!')
    ).toBeVisible();
  }
}
