import { expect, Page } from '@playwright/test';
import { menu } from '../tests/testdata/testdata'
let categoryList = []
let breakfast = []
let lto = []
let kingsCollection = []
export let apiData = []

export async function asyncForEach<T>(array: Array<T>, callback: (item: T, index: number) => void) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index);
    }
}

export async function getData(page) {
    const resp = await page.request.get(menu.bknzMenuApi, {headers: {'tenant': menu.bknzTenant}});
    expect(resp.status()).toBe(200);
    const body = JSON.parse(await resp.text());
    apiData = body.layoutRoots[0].root.elems
    return apiData
}

export async function getCategory() {
    const data = apiData
    data.forEach(elem => {
        const categoryPath = elem.elems
        const categoryName = elem.menuItemName
        categoryList.push(categoryName)
        categoryPath.forEach(menuItem => {
            switch (categoryName){
                case 'Breakfast':
                    breakfast.push(menuItem.menuItemName)
                    break
                case 'Limited Time':
                    if(menuItem != null){
                        lto.push(menuItem.menuItemName)
                    }
                    break
                case 'King’s Collection':
                    if(menuItem != null){
                        kingsCollection.push(menuItem.menuItemName)
                    }
                    break
                default:
                    break
            }
        })
    });
    return {
        categoryList, 
        breakfast,
        lto,
        kingsCollection
    }
    
}
