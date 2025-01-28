import { Locator, Page } from "playwright/test";

export default class HomePage {
  readonly page: Page;
  readonly signUpButton: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpButton = page.locator(".btn-primary");
    this.loginButton = page.locator(".header_signin");
  }

  async openSignUpModal() {
    await this.signUpButton.click();
  };

  async openPage(){
    await this.page.goto('/');
  };

  async openLoginModal(){
    await this.loginButton.click();
  }
}
