import { expect, type Locator, type Page } from '@playwright/test';

export class homePage {
  readonly page: Page;
  readonly contactMenu: Locator;
  readonly shopMenu: Locator
  readonly cartMenu: Locator

  constructor(page: Page) {
    this.page = page;
    this.contactMenu = page.getByRole('link', { name: 'contact' });
    this.shopMenu = page.locator('#nav-shop');
    this.cartMenu = page.getByRole('link', { name: 'cart' });
  }

  async goto() {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle("Jupiter Toys");
  }

  async clickContactMenu() {
    await this.contactMenu.click();
  }

  async clickShopMenu() {
    await this.shopMenu.click();
  }

  async clickCartMenu() {
    await this.cartMenu.click();
  }

}