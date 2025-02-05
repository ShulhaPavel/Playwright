import { Locator, Page, expect } from "playwright/test";

export default class GaragePage {
  readonly page: Page;
  readonly addCarButton: Locator;
  readonly fuelExpenses: Locator;
  readonly header: Locator;
  readonly profileButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('h1');
    this.addCarButton = page.locator('//div[@class="panel-page"]//button[contains(@class, "btn-primary")]');
    this.fuelExpenses = page.locator('[routerlink="expenses"]')
    this.profileButton = page.locator('.sidebar_btn-group a:nth-child(1)')

  }

  async clickProfileButton() {
    await this.profileButton.click();
  }

  async clickAddCarButton() {
    await this.addCarButton.click();
  };

  async clickFuelExpensesButton(){
    await this.fuelExpenses.click();
  };

  async verifyPageIsOpen(){
    await expect(this.header).toBeVisible();
  };

  async openPage() {
    await this.page.goto('/panel/garage');
}

}