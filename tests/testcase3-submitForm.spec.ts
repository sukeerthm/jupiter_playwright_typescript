import { test, expect } from '@playwright/test';
import { homePage } from '../jupiter-pages/homepage';
import { contactPage } from '../jupiter-pages/contactpage';

test('User can Submit the feedback form', async ({ page }) => {
    const homepage = new homePage(page);
    const contactpage = new contactPage(page);
    for (let i = 0; i < 3; i++) {
    await homepage.goto();
    await homepage.clickContactMenu();
    await contactpage.fillTheFeedbackForm();
    }
});

