import { expect, type Locator, type Page } from '@playwright/test';


//Class to capture all the locator details realted to HOME page
export class homePage {
  readonly page: Page;
  readonly contactMenu: Locator;
  readonly shopMenu: Locator;
  readonly cartMenu: Locator;
  readonly pageTitle: any;

  constructor(page: Page) {
    this.page = page;
    //Locator Details
    this.contactMenu = page.getByRole('link', { name: 'contact' });
    this.shopMenu = page.locator('#nav-shop');
    this.cartMenu = page.getByRole('link', { name: 'cart' });
    this.pageTitle = "Jupiter Toys"
  }

  //Go to ContactForm
  async clickContactMenu() {
    await this.contactMenu.click()
  }

  //Go to Shopping Page
  async clickShopMenu() {
    await this.shopMenu.click();
  }

  //Go to Cart Page
  async clickCartMenu() {
    await this.cartMenu.click();
  }
}