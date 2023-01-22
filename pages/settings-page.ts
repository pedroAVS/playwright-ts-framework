import { expect, Locator, Page } from "@playwright/test";
import { settings } from "../tests/locators/locators"
import { user } from "../tests/testdata/testdata"

export class SettingsPage {
    readonly page: Page;
    readonly getLoginBtn: Locator;
    readonly getEmailTextBox: Locator;
    readonly getPasswordTextBox: Locator;
    readonly getSubmitBtn: Locator;
    readonly getAccountInfoBtn: Locator;
    readonly getSignOutBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.getLoginBtn = page.locator(settings.LOGIN_BTN)
        this.getEmailTextBox = page.locator(settings.EMAIL_TXT)
        this.getPasswordTextBox = page.locator(settings.PWD_TXT)
        this.getSubmitBtn = page.locator(settings.SUBMIT)
        this.getAccountInfoBtn = page.locator(settings.ACCOUNT_INFO)
        this.getSignOutBtn = page.locator(settings.SIGN_OUT)
    }

    async loginKnownUser() {
        await this.getLoginBtn.tap()
        await this.getEmailTextBox.fill(user.email)
        await this.getPasswordTextBox.fill(user.password)
        await Promise.all([this.page.waitForNavigation(), this.getSubmitBtn.tap()])
    }

    async signOut() {
        await this.getAccountInfoBtn.tap()
        await this.getSignOutBtn.tap()
    }
}