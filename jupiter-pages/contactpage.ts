import { expect, type Locator, type Page } from '@playwright/test';
import { generateRandomValues } from '../resources/generateRandomValues';
const randomValues = new generateRandomValues();

export class contactPage {

  readonly page: Page;
  readonly forename: Locator;
  readonly surname: Locator;
  readonly email : Locator;
  readonly telephone: Locator;
  readonly message : Locator;

  constructor(page: Page) {
    this.page = page;
    this.forename = page.locator('#forename');
    this.surname = page.locator('#surname');
    this.email = page.locator('#email');
    this.telephone = page.locator('#telephone');
    this.message = page.getByPlaceholder('Tell us about it..');
  }

  async enterForename() {
    await this.forename.fill(randomValues.generateRandomName());
  }

  async enterSurname() {
    await this.surname.fill(randomValues.generateRandomName())
  }

  async enterEmail() {
    await this.email.fill(randomValues.generateRandomName()+'@gmail.com')
  }

  async enterPhone() {
    await this.telephone.fill(randomValues.generateRandomNumber());
  }

  async enterMessage() {
    await this.message.fill(randomValues.generateRandomName());
  }

  async fillTheFeedbackForm() {
    await this.enterForename();
    await this.enterSurname();
    await this.enterEmail();
    await this.enterPhone();
    await this.enterMessage();

  }


}