import { expect, type Locator, type Page } from '@playwright/test';
import { shoppingPage } from '../jupiter-pages/shoppingpage';


export class productDetails extends shoppingPage {


    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

     //Add Products to the cart based on the required quantity
     async addProductsToCart(json: Record<string, any>) {
        for (let productIndex=0; productIndex< await this.numberOfProduct(); productIndex++)  {
            if((await this.getProductName(productIndex)).match(json.productName)){ // Find the products Stuffed Frog, Fluffy Bunny, Valentine Bear from the products list
                expect(await this.getProductPrice(productIndex)).toBe(json.price); // Validate product price on UI matches price in the JSON file
                for(let quantity=0; quantity<json.Quantity; quantity++)
                    await this.addProductToCart(productIndex);  //Add products to the cart, based on the quantity
                
            }
         } 
    }
}
    