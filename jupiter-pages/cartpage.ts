import { expect, type Locator, type Page } from '@playwright/test';


//Class to capture all the locator details realted to CART page
export abstract class cartPage {

    readonly page: Page;
    readonly cartHeader: Locator;
    readonly columnsInCart: Locator;
    readonly rowsInCart: Locator;
    readonly totalCost : Locator;
  
    constructor(page:Page){
        this.page = page;
        //Locator details 
        this.cartHeader = this.page.locator('p.cart-msg');
        this.columnsInCart = this.page.locator('td.ng-binding');  
        this.rowsInCart = this.page.locator('tr.cart-item.ng-scope')
        this.totalCost = this.page.locator("//*[@class='total ng-binding']"); 
    }


    async waitUntiCartComponentIsLoaded(){
        await expect(this.cartHeader).toBeVisible({timeout: 5000});
    }

    async getProductsCount(): Promise<number>{
        return await this.rowsInCart.count()
    }

    async getProductNameFromCart(productIndex:number): Promise<string>{ 
        return await this.columnsInCart.nth(productIndex).innerText();
    }

    async getProductPriceFromCart(productIndex:number): Promise<string>{ 
        return await this.columnsInCart.nth(productIndex).innerText();
    }

    async getProductSubtotalFromCart(productIndex:number): Promise<string>{ 
        return await this.columnsInCart.nth(productIndex).innerText();
    }

    async getTotalPrice(): Promise<string>{ 
        return await this.totalCost.innerText();
    }
   

}
