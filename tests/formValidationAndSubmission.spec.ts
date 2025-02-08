import { test, expect } from '@playwright/test';
import { homePage } from '../jupiter-pages/homepage';
import { feedbackForm } from '../implementation/feedbackform';
import { userDetailsFromJson } from '../resources/userDetailsToFillTheForm.json'

let homepage:any;
let feedbackform:any;

test.beforeEach(async ({ page }) => {
    //Declare all the page objects and open Jupiter webpage
    homepage= new homePage(page);
    feedbackform = new feedbackForm(page);
    await homepage.goto(); 
  });

test ('TestCase 1 - Verify Error Messages, Fill the mandatory fields and validate errors are gone', async ({ page }) => {
    await homepage.clickContactMenu();  //Navigate to Contact Page
    await feedbackform.clickSubmit(); //Click Submit Button
    await feedbackform.validateAllErrorMessages(); //Validate all the Error Messages on the page
    await feedbackform.fillTheFormUsingJsonData(userDetailsFromJson[0]); //Fill the form using details from JSON
    await feedbackform.validateIfErrorMessagesAreGone(); //Validate all the Error messages are disappeared 
});

//Read the data from JSON file and submit the form for 5 different users
for (const detailsToFillForm of userDetailsFromJson) { 
test(`TestCase 2 - User ${detailsToFillForm.forename} can Submit the feedback form successfully`, async ({ page }) => {
    await homepage.clickContactMenu(); //Navigate to Contact Page
    await feedbackform.fillTheFormUsingJsonData(detailsToFillForm); //Fill the Form using details from JSON file
    await feedbackform.submitTheForm(detailsToFillForm.forename) // Submit the form and validte the its successfull
    expect(test.info().status).toMatch(test.info().expectedStatus);
});
}

