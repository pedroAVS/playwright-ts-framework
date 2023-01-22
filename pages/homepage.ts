import { expect, Locator, Page } from "@playwright/test";
import { homepage } from "../tests/locators/locators";

export class HomePage {
    readonly page: Page;
    readonly getSettingsPage: Locator;
    readonly getCouponsPage: Locator;
    readonly getOrderPage: Locator;
    readonly getRewardsPage: Locator;
    readonly getRestaurantsPage: Locator;
    readonly getEarnPage: Locator;
    readonly venuePageOrderButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.getSettingsPage = page.locator(homepage.HEADER_SETTINGS_BTN)
        this.getCouponsPage = page.locator('')
        this.getOrderPage = page.locator('')
        this.getRewardsPage = page.locator('')
        this.getRestaurantsPage = page.locator(homepage.RESTAURANT_BOTTOM_BTN);
        this.getEarnPage = page.locator('')
    }

    async open() {
        await this.page.goto('localhost:8001');
    }

    async goToSettingsPage() {
        await this.getSettingsPage.tap();
    }

    async goToCouponsPage() {
        await this.getCouponsPage.tap();
    }

    async goToOrderPage() {
        await this.getOrderPage.tap();
    }

    async goToRewardsPage() {
        await this.getRewardsPage.tap();
    }

    async goToRestaurantsPage() {
        await this.getRestaurantsPage.tap();
    }

    async goToEarnPage() {
        await this.getEarnPage.tap();
    }


    
}