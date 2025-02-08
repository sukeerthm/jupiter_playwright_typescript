import { expect, type Locator, type Page } from '@playwright/test';
import { contactPage } from '../jupiter-pages/contactpage';


export class feedbackForm extends contactPage {
    
    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }


    // Validate Form is successfully submitted and success message contains User Forename
    async verifyFormSubmittedSuccessfully(name: string) {
        const successfull_feedback_message = this.successMessage_Prefix_text +name+ this.successMessage_Postfix_text;
        await expect(this.FormSubmissionSuccess).toHaveText(successfull_feedback_message); 
      }
    
      //Fill the form with Test Data from JSON file
      async fillTheFormUsingJsonData(json: Record<string, any>) {
        await this.enterForename(json.forename);
        await this.enterSurname(json.surename);
        await this.enterEmail(json.email);
        await this.enterPhone(json.phone);
        await this.enterMessage(json.message);
      }
    
      //Validate Error Messages for each field on the form
      async validateAllErrorMessages() {
        await expect(this.header_error).toHaveText(this.header_error_text);
        await expect(this.forename_error).toHaveText(this.forename_error_text);
        await  expect(this.email_error).toHaveText(this.email_error_text);
        await expect(this.message_error).toHaveText(this.message_error_text);
      }
    
      //Verify error messages are gone if the form is filled
      async validateIfErrorMessagesAreGone() {
        await expect(this.header_error).toHaveText(this.header_text);
        await expect(this.forename_error).toBeHidden();
        await expect(this.email_error).toBeHidden();
        await expect(this.message_error).toBeHidden();
       }
    
       //Submit the form and make sure success message shows user name
       async submitTheForm(username : string){
        await this.clickSubmit();
        await expect(this.feedbackProcessingBar).toBeVisible();
        const poupHeader = await this.feedbackProcessingBar.innerText();
        expect(poupHeader).toBe(this.feedback_popup_header);
        await expect(this.feedbackProcessingBar).toBeHidden({timeout: 18000}); //Added conditional timeout to make sure Feedback successfull popup is disappeared 
        await this.verifyFormSubmittedSuccessfully(username);
       }
}