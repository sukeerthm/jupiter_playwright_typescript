import { test, expect } from '@playwright/test';
import { homePage } from '../jupiter-pages/homepage';
import { contactPage } from '../jupiter-pages/contactpage';
import { userDetailsFromJson } from '../resources/userData.json'

let homepage;
let contactpage;

test.beforeEach(async ({ page }) => {
    homepage = new homePage(page);
    contactpage = new contactPage(page);
    await homepage.goto();
  });

test ('TestCase 1 - Verify Error Messages, Fill the mandatory fields and validate errors are gone', async ({ page }) => {
    await homepage.clickContactMenu();
    await contactpage.clickSubmit();
    await contactpage.validateErrorMessages();
    await contactpage.fillTheFormUsingJsonData(userDetailsFromJson[0]);
    await contactpage.validateIfErrorMessagesAreGone();
});

//Read the data from JSON file and submit the form for 5 different users
for (const detailsToFillForm of userDetailsFromJson) {
test(`TestCase 2 - User ${detailsToFillForm.forename} can Submit the feedback form successfully`, async ({ page }) => {
    await homepage.clickContactMenu();
    await contactpage.fillTheFormUsingJsonData(detailsToFillForm);
    await contactpage.submitTheForm(detailsToFillForm.forename)
   // expect(test.info().status).toMatch(test.info().expectedStatus);
});
}


test.afterEach(async ({ page }) => {
    console.log(`Finished ${test.info().title} with status ${test.info().status}`);
    if (test.info().status !== test.info().expectedStatus)
      console.log(`Did not run as expected`);
  });

