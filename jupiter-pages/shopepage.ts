import { expect, type Locator, type Page } from '@playwright/test';

export class shopPage{

    readonly page: Page;
    readonly productsList: Locator;
    readonly productTitle: Locator;
    readonly productPrice: Locator;
    readonly buyNow: Locator
  
    constructor(page: Page) {
      this.page = page;
      this.productsList = this.page.locator('div.products.ng-scope');
      this.productTitle = this.page.locator('h4.product-title');
      this.productPrice = this.page.locator('span.product-price');
      this.buyNow = this.page.locator('a.btn.btn-success');
    }

    async addProductsToCart(json: Record<string, any>) {
        await expect(this.productsList).toBeVisible({timeout: 5000});
        const totalProductCount =  await this.productTitle.count(); 
        let priceOftheProduct: any;
        for (let productIndex=0; productIndex<totalProductCount; productIndex++)  {
            if((await this.productTitle.nth(productIndex).innerText()).match(json.productName)){
                priceOftheProduct = await this.productPrice.nth(productIndex).innerText();
                expect(priceOftheProduct).toBe("$"+json.price);
                for(let quantity=0; quantity<json.Quantity; quantity++){
                    await this.buyNow.nth(productIndex).click();
                }
            }
         } 
    }
}