import { Locator, Page } from "playwright/test";

export default class LoginModal {
    readonly page: Page;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly submitLoginButton: Locator;
  
    constructor(page: Page) {
      this.page = page;
      this.emailField = page.locator('#signinEmail');
      this.passwordField = page.locator('#signinPassword');
      this.submitLoginButton = page.locator('.modal-footer .btn-primary');
    };

    async enterEmail(email: string){
        await this.emailField.fill(email);
      };
    
      async enterPassword(password: string){
        await this.passwordField.fill(password);
      };

      async clickSubmitLoginButton(){
        await this.submitLoginButton.click();
      };
}