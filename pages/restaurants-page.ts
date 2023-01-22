import { expect, Locator, Page } from "@playwright/test";
import { restaurants } from "../tests/locators/locators";

export class RestaurantsPage {
    readonly page: Page;
    readonly venuePageOrderButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.venuePageOrderButton = page.locator(restaurants.ORDER_BTN);        
    }

   async searchStore(address:string) {
       await this.page.type('locator', address)
   }

   async selectStore() {
    if (!this.venuePageOrderButton.isVisible){
        await this.page.reload()
    }
    await this.venuePageOrderButton.tap()
   }
   
}