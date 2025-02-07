import { test, expect } from '@playwright/test';
import { homePage } from '../jupiter-pages/homepage';
import { contactPage } from '../jupiter-pages/contactpage';
import { userDetailsFromJson } from '../resources/userDetailsToFillTheForm.json'

let homepage;
let contactpage;

test.beforeEach(async ({ page }) => {
    //Declate all the page objects and open Jupiter webpage
    homepage = new homePage(page); 
    contactpage = new contactPage(page);
    await homepage.goto();
  });

test ('TestCase 1 - Verify Error Messages, Fill the mandatory fields and validate errors are gone', async ({ page }) => {
    await homepage.clickContactMenu();  //Navigate to Contact Page
    await contactpage.clickSubmit(); //Click Submit Button
    await contactpage.validateErrorMessages(); //Validate all the Error Messages on the page
    await contactpage.fillTheFormUsingJsonData(userDetailsFromJson[0]); //Fill the form using details from JSON
    await contactpage.validateIfErrorMessagesAreGone(); //Validate all the Error messages are disappeared 
});

//Read the data from JSON file and submit the form for 5 different users
for (const detailsToFillForm of userDetailsFromJson) { 
test(`TestCase 2 - User ${detailsToFillForm.forename} can Submit the feedback form successfully`, async ({ page }) => {
    await homepage.clickContactMenu(); //Navigate to Contact Page
    await contactpage.fillTheFormUsingJsonData(detailsToFillForm); //Fill the Form using details from JSON file
    await contactpage.submitTheForm(detailsToFillForm.forename) // Submit the form and validte the its successfull
    expect(test.info().status).toMatch(test.info().expectedStatus);
});
}

