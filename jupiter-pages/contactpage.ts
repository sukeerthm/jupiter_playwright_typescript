import { expect, type Locator, type Page } from '@playwright/test';
import { mandatoryFields} from '../resources/formMandatoryFields';

//Class to capture all the locator details realted to CONTACT page
export abstract class contactPage implements mandatoryFields  {

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

  //Page Titles and Messages
  readonly header_text = "We welcome your feedback - tell it how it is.";
  readonly feedback_popup_header = "Sending Feedback";

  // Form Error Messages
  readonly header_error_text = "We welcome your feedback - but we won't get it unless you complete the form correctly."
  readonly forename_error_text = "Forename is required";
  readonly email_error_text = "Email is required";
  readonly message_error_text = "Message is required";

  //Successfull Form Submission Messages
  readonly successMessage_Prefix_text = "Thanks ";
  readonly successMessage_Postfix_text = ", we appreciate your feedback.";


   constructor(page: Page) {
    this.page = page;

    //Locator details 
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



}