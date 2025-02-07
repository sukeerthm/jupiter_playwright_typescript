import { expect, type Locator, type Page } from '@playwright/test';

export class cartPage{

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

    //Validate ProductName, Unit Price, Sub Total and Total
    async validateCart(json: Record<string, any>){
        await expect(this.cartHeader).toBeVisible({timeout: 5000}); //Added conditional timeout to make sure cart page is loaded 
        let cartRowCount = await this.rowsInCart.count();
        let productIndex = 0;
        let subTotal: any;
        let Total = 0;
        for(let jsonIndex = 0; jsonIndex < cartRowCount; jsonIndex++){

            expect(await this.columnsInCart.nth(productIndex).innerText()).toMatch(json[jsonIndex].productName); //Validate productName in cart matches the Test Data in JSON
            expect(await this.columnsInCart.nth(productIndex+1).innerText()).toMatch("$"+json[jsonIndex].price); //Validate Price for the paritcual Product in the cart matches the Test Data in JSON
            subTotal = parseFloat(json[jsonIndex].price) * json[jsonIndex].Quantity; //Calculate Subtotal for each products based on the quantity from JSON
            Total += subTotal; //Calualte Total price 
            expect(await this.columnsInCart.nth(productIndex+2).innerText()).toMatch("$"+subTotal); //Validate Subtotal is correctly displayed for each product
            productIndex +=3

            }

            expect(await this.totalCost.innerText()).toMatch("Total: "+Total); // Validate Total price is correctly displayed
}
}