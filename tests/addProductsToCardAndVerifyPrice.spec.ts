import { test, expect } from '@playwright/test';
import { homePage } from '../jupiter-pages/homepage';
import { productsToPurchase } from '../resources/productstobuy.json';
import { productDetails } from '../implementation/productdetails';
import { cartInfo } from '../implementation/cartinfo';


let allProductInfo:any;
let itemsInCart:any;
let homepage:any;

test.beforeEach(async ({ page }) => {
    allProductInfo = new productDetails(page);
    itemsInCart = new cartInfo(page);
    homepage= new homePage(page);
    await homepage.goto(); 
  });


test ('TestCase 3 - Add products to cart and verify pricing on checkout', async ({ page }) => {

   await homepage.clickShopMenu(); //Navigate to Shop page
   await allProductInfo.waitUntilShoppingPageIsLoaded();
    for (const products of productsToPurchase) {
        await allProductInfo.addProductsToCart(products); //Read JSON file and products to the cart
    }
     await homepage.clickCartMenu(); //Navigate to cart
     await itemsInCart.validateCart(productsToPurchase); //Validate productName, Price, subtotal for each product and TOTAL price

});

test.afterEach(async ({}, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`${testInfo.title} did not run as expected!`);
});
