import { test, expect } from '@playwright/test';
import { homePage } from '../jupiter-pages/homepage';
import { shopPage } from '../jupiter-pages/shopepage';
import { cartPage } from '../jupiter-pages/cartpage';
import { productsToPurchase } from '../resources/productsDetails.json';

test ('TestCase 3 - Add products to cart and verify pricing on checkout', async ({ page }) => {
  //Declare all the page objects
   const homepage = new homePage(page);
   const shoppage = new shopPage(page);
   const cartpage = new cartPage(page);

    await homepage.goto(); // Navigate to webpage. 
    await homepage.clickShopMenu(); //Navigate to Shop page
    for (const products of productsToPurchase) {
        await shoppage.addProductsToCart(products); //Read JSON file and products to the cart
    }
     await homepage.clickCartMenu(); //Navigate to cart
     await cartpage.validateCart(productsToPurchase); //Validate productName, Price, subtotal for each product and TOTAL price

});


