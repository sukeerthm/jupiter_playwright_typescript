import { expect, type Locator, type Page } from '@playwright/test';
import {faker} from '@faker-js/faker';


export class contactPage {

  readonly page: Page;
  readonly formHeader: Locator;
  readonly forename: Locator;
  readonly surname: Locator;
  readonly email : Locator;
  readonly telephone: Locator;
  readonly message : Locator;
  readonly submitButton : Locator;
  readonly feedbackProcessingBar : Locator;
  readonly FormSubmissionSuccess : Locator;

  readonly header_error: Locator;
  readonly forename_error: Locator;
  readonly email_error: Locator;
  readonly message_error: Locator;

  readonly header_text = "We welcome your feedback - tell it how it is.";
  readonly header_error_text = "We welcome your feedback - but we won't get it unless you complete the form correctly."
  readonly forename_error_text = "Forename is required";
  readonly email_error_text = "Email is required";
  readonly message_error_text = "Message is required";
  readonly feedback_popup_header = "Sending Feedback";


   constructor(page: Page) {
    this.page = page;
    this.formHeader = page.locator("//*[@id='header-message']//strong");
    this.forename = page.locator('#forename');
    this.surname = page.locator('#surname');
    this.email = page.locator('#email');
    this.telephone = page.locator('#telephone');
    this.message = page.getByPlaceholder('Tell us about it..');
    this.submitButton = page.locator('a.btn-contact.btn.btn-primary');
    this.feedbackProcessingBar = page.locator('div.modal-header');
    this.FormSubmissionSuccess = page.locator('div.alert.alert-success');

    this.header_error = page.locator("//*[@id='header-message']//div");
    this.forename_error = page.locator('#forename-err');
    this.email_error = page.locator('#email-err');
    this.message_error = page.locator('#message-err');
  }

  async enterForename(firstname: string) {
   await this.forename.fill(firstname);
  }

  async enterSurname(familyname: string) {
    await this.surname.fill(familyname)
  }

  async enterEmail(useremail: string) {
    await this.email.fill(useremail)
  }

  async enterPhone(userPhoneNum: string) {
    await this.telephone.fill(userPhoneNum);
  }

  async enterMessage(userMessage: string) {
    await this.message.fill(userMessage);
  }

  async clickSubmit() {
    await this.submitButton.click();
  }


  async verifyFormSubmittedSuccessfully(name: string) {
    const successfull_feedback_message = 'Thanks '+name+', we appreciate your feedback.'
    await expect(this.FormSubmissionSuccess).toHaveText(successfull_feedback_message);
  }

  async fillTheFormUsingJsonData(json: Record<string, any>) {
    await this.enterForename(json.forename);
    await this.enterSurname(json.surename);
    await this.enterEmail(json.email);
    await this.enterPhone(json.phone);
    await this.enterMessage(json.message);
  }

  async validateErrorMessages() {
   await expect(this.header_error).toHaveText(this.header_error_text);
   await expect(this.forename_error).toHaveText(this.forename_error_text);
   await expect(this.email_error).toHaveText(this.email_error_text);
   await expect(this.message_error).toHaveText(this.message_error_text);
  }

  async validateIfErrorMessagesAreGone() {
    await expect(this.header_error).toHaveText(this.header_text);
    await expect(this.forename_error).toBeHidden();
    await expect(this.email_error).toBeHidden();
    await expect(this.message_error).toBeHidden();
   }

   async submitTheForm(username : string){
    await this.clickSubmit();
    await expect(this.feedbackProcessingBar).toBeVisible();
    const poupHeader = await this.feedbackProcessingBar.innerText();
    expect(poupHeader).toBe(this.feedback_popup_header);
    await expect(this.feedbackProcessingBar).toBeHidden({timeout: 18000});
    await this.verifyFormSubmittedSuccessfully(username);
   }


}