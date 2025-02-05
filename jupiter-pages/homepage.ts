import { expect, type Locator, type Page } from '@playwright/test';

export class homePage {
  readonly page: Page;
  readonly contactMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactMenu = page.getByRole('link', { name: 'contact' });
  }

  async goto() {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle("Jupiter Toys");
  }

  async clickContactMenu() {
    await this.contactMenu.click();
  }

}