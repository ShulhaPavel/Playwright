import { Locator, Page } from "playwright/test";

export default class HomePage {
  readonly page: Page;
  readonly signUpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpButton = page.locator(".btn-primary");
  }

  async openSignUpModal() {
    await this.signUpButton.click();
  };

  async openPage(){
    await this.page.goto('/');
  }
}
