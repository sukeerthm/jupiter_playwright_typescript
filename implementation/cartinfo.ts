import { expect, type Locator, type Page } from '@playwright/test';
import { cartPage } from '../jupiter-pages/cartpage';


export class cartInfo extends cartPage {

    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }


    
    //Validate ProductName, Unit Price, Sub Total and Total
    async validateCart(json: Record<string, any>){
        
        await this.waitUntiCartComponentIsLoaded()//Added conditional timeout to make sure cart page is loaded 
        let cartRowCount = await this.getProductsCount();
        let productNameInCart: any;
        let productPriceInCart: any
        let productSubTotal: any;
        let calCulateSubTotal: any;
        let productIndex = 0;
        let Total = 0;
        for(let jsonIndex = 0; jsonIndex < cartRowCount; jsonIndex++){

            //Get ProductName, ProductPrice and SubTotal for each Item from UI
            productNameInCart = await this.getProductNameFromCart(productIndex);
            productPriceInCart = (await this.getProductPriceFromCart(productIndex+1));
            productSubTotal = await this.getProductSubtotalFromCart(productIndex+2);
            calCulateSubTotal = await productPriceInCart.substring(1) * json[jsonIndex].Quantity ;
            
            Total += calCulateSubTotal;      //Calualte Total price 

            expect(productNameInCart).toMatch(json[jsonIndex].productName); //Validate productName in cart matches the Test Data in JSON
            expect(productPriceInCart).toMatch(json[jsonIndex].price); //Validate Price for the paritcual Product in the cart matches the Test Data in JSON
            expect(productSubTotal).toMatch("$"+calCulateSubTotal); //Validate Subtotal is correctly displayed for each product
            productIndex +=3
            }
            expect(await this.getTotalPrice()).toMatch("Total: "+Total); // Validate Total price is correctly displayed
}
}