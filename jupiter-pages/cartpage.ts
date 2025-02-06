import { expect, type Locator, type Page } from '@playwright/test';

export class cartPage{

    readonly page: Page;
    readonly cartHeader: Locator;
    readonly columnsInCart: Locator;
    readonly rowsInCart: Locator;
    readonly totalCost : Locator;
  
    constructor(page:Page){
        this.page = page;
        this.cartHeader = this.page.locator('p.cart-msg');
        this.columnsInCart = this.page.locator('td.ng-binding');  
        this.rowsInCart = this.page.locator('tr.cart-item.ng-scope')
        this.totalCost = this.page.locator("//*[@class='total ng-binding']"); 
    }

    async validateCart(json: Record<string, any>){
        await expect(this.cartHeader).toBeVisible({timeout: 5000});
        let cartRowCount = await this.rowsInCart.count();
        let productIndex = 0;
        let subTotal: any;
        let Total = 0;
        for(let jsonIndex = 0; jsonIndex < cartRowCount; jsonIndex++){

            expect(await this.columnsInCart.nth(productIndex).innerText()).toMatch(json[jsonIndex].productName);
            expect(await this.columnsInCart.nth(productIndex+1).innerText()).toMatch("$"+json[jsonIndex].price);
            subTotal = parseFloat(json[jsonIndex].price) * json[jsonIndex].Quantity;
            Total += subTotal;
            expect(await this.columnsInCart.nth(productIndex+2).innerText()).toMatch("$"+subTotal);
            productIndex +=3

            }

            expect(await this.totalCost.innerText()).toMatch("Total: "+Total);
}
}