import { test, expect } from '@playwright/test';
import { homePage } from '../jupiter-pages/homepage';
import { shopPage } from '../jupiter-pages/shopepage';
import { cartPage } from '../jupiter-pages/cartpage';
import { productsToPurchase } from '../resources/productsDetails.json';

test ('TestCase 3 - Add products to cart and verify pricing on checkout', async ({ page }) => {
   const homepage = new homePage(page);
   const shoppage = new shopPage(page);
   const cartpage = new cartPage(page);
    await homepage.goto();
    await homepage.clickShopMenu();
    for (const products of productsToPurchase) {
        await shoppage.addProductsToCart(products);
    }
     await homepage.clickCartMenu();
     await cartpage.validateCart(productsToPurchase);

});


