import { Page } from "@playwright/test";
import { getCategory } from "../common/functions";
import { menu } from "../tests/testdata/testdata";

export class MenuPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickCategory(page, category){
        await page.tap('data-testid=' + category)
        await page.waitForLoadState('domcontentloaded')
    }

    async clickBreakfastMenuItem(page){
        const breakfastItems = (await getCategory()).breakfast
        for (const item of breakfastItems){
            const regex = item.match(/([\w]\w+)([\s]?)(&?)([\s]?)/g)
            const menuItem = regex.join("")
            await Promise.all([page.waitForNavigation(), page.tap(`.menu-item.item:has-text("${menuItem}")`)])
            const response = await page.waitForResponse('**/menu/**');
            console.log(JSON.parse(response.body()));
            //await page.pause()
            // await page.on('response', async (response) => { 
            //         if (response.url().includes('items?pruningPointId')){
            //             console.log('XHR response received'); 
            //             console.log(await response.json()); 
            //             var body = await response.json()
            //             let menuItemSize = body.menuItems[0].pruningPointCombo.receiptDescription
            //             console.log(menuItemSize)
            //             // if (menuItemSize.includes('Regular')) {
            //             //     await page.tap('"Regular"')
            //             // } else if (menuItem.includes('Large')) {
            //             //     await page.tap('"Large"')
            //             // }
            //         } 
            //     });
        }
    }

    // async getMenuSize() {
    //     return await this.page.waitForResponse(async (response) => {
    //         const body = await response.text();
    //         console.log(body)
    //         return body.includes('size')
    //     }); 
    // }

    // async clickMenuItem(){
    //     switch(){
    //         case 'Regular':
    //             //do this
    //             break
    //         case 'Small':
    //             //do this
    //             break
    //         case 'Large':
    //             //do this
    //             break
    //         case 'ALC':
    //             //do this
    //             break
    //         case 'Bundle':
    //             //do this
    //             break
    //         default:
    //             break
    //     }
    // }

   
}