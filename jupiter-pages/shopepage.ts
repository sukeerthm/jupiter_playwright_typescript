import { expect, type Locator, type Page } from '@playwright/test';

export class shopPage{

    readonly page: Page;
    readonly productsList: Locator;
    readonly productTitle: Locator;
    readonly productPrice: Locator;
    readonly buyNow: Locator
  
    constructor(page: Page) {
      this.page = page;
      //Locator Details
      this.productsList = this.page.locator('div.products.ng-scope');
      this.productTitle = this.page.locator('h4.product-title');
      this.productPrice = this.page.locator('span.product-price');
      this.buyNow = this.page.locator('a.btn.btn-success');
    }

    //Add Products to the cart based on the required quantity
    async addProductsToCart(json: Record<string, any>) {
        await expect(this.productsList).toBeVisible({timeout: 5000}); //Added conditional timeout to make sure shopping page is loaded
        const totalProductCount =  await this.productTitle.count(); 
        let priceOftheProduct: any;
        for (let productIndex=0; productIndex<totalProductCount; productIndex++)  {
            if((await this.productTitle.nth(productIndex).innerText()).match(json.productName)){ // Find the products Stuffed Frog, Fluffy Bunny, Valentine Bear from the products list
                priceOftheProduct = await this.productPrice.nth(productIndex).innerText(); 
                expect(priceOftheProduct).toBe("$"+json.price); // Validate product price on UI matches price in the JSON file
                for(let quantity=0; quantity<json.Quantity; quantity++){ 
                    await this.buyNow.nth(productIndex).click();  //Add products to the cart, based on the quantity
                }
            }
         } 
    }
}