import { getData, getCategory } from '../../common/functions';
import { test, expect, Page, Browser } from '@playwright/test';
import { HomePage } from '../../pages/homepage'
import { RestaurantsPage } from '../../pages/restaurants-page'
import { restaurants } from '../locators/locators'
import { category_bknz } from '../testdata/testdata'
import { SettingsPage } from '../../pages/settings-page';
import { MenuPage } from '../../pages/menu-page';
let page: Page;
let menu: MenuPage;

test.describe('Test Menu', () => {
    test.beforeAll(async ({browser}) => {
        const context = await browser.newContext();
        page = await context.newPage();
        await getData(page)
    })
    
    test.beforeEach(async () => {
        const homepage = new HomePage(page)
        await homepage.open();
        await homepage.goToSettingsPage()
        await new SettingsPage(page).loginKnownUser()
        await homepage.goToRestaurantsPage()
        await new RestaurantsPage(page).selectStore()
        await page.tap(restaurants.DINE_IN)
    });

    test.only('check breakfast', async () => {
        await menu.clickCategory(page, category_bknz.breakfast)
        await menu.clickBreakfastMenuItem(page)
    })
})