import { expect, type Locator, type Page } from '@playwright/test';

export abstract class shoppingPage{

    readonly page: Page;
    private readonly productsView: Locator;
    private readonly productsList: Locator;
    private readonly productTitle: Locator;
    private readonly productPrice: Locator;
    private readonly buyNow: Locator
    private totalProductCount: number;
    private titleOfTheProduct: string;
    private priceOfTheProduct: string;
    
  
    constructor(page: Page) { 
      this.page = page;
      //Locator Details
      this.productsView = this.page.locator('div.products.ng-scope');
      this.productsList = this.page.locator('li.product.ng-scope');
      this.productTitle = this.page.locator('h4.product-title');
      this.productPrice = this.page.locator('span.product-price');
      this.buyNow = this.page.locator('a.btn.btn-success');
    }

   
    
    async waitUntilShoppingPageIsLoaded(){
        await expect(this.productsView).toBeVisible({timeout: 5000}); 
    } 
    
    async numberOfProduct(): Promise<number>{
       this.totalProductCount =  await this.productsList.count(); 
        return this.totalProductCount
    }

    async getProductName(productIndex:number): Promise<string>{ 
        this.titleOfTheProduct = await this.productTitle.nth(productIndex).innerText(); 
        return this.titleOfTheProduct
    }

    async getProductPrice(productIndex:number): Promise<string>{ 
        this.priceOfTheProduct = await this.productPrice.nth(productIndex).innerText(); 
        return this.priceOfTheProduct      
    }

    async addProductToCart(productIndex:number){
        await this.buyNow.nth(productIndex).click()
    }


   
}