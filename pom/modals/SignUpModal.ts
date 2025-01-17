import { Locator, Page, expect } from "playwright/test";

export default class SignUpModal {
  readonly page: Page;
  readonly nameField: Locator;
  readonly lastNameField: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly reEnterPasswordField: Locator;
  readonly registerButton: Locator;
  readonly emptyMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameField = page.locator('#signupName');
    this.lastNameField = page.locator('#signupLastName');
    this.emailField = page.locator('#signupEmail');
    this.passwordField = page.locator('#signupPassword');
    this.reEnterPasswordField = page.locator('#signupRepeatPassword');
    this.registerButton = page.locator('.modal-footer .btn-primary');
    this.emptyMessage = page.locator('.panel-empty_message');
  }

  async triggerEmptyErrorsByField(fieldName: string): Promise<void> {
    let field;
  
    switch (fieldName) {
      case 'name':
        field = this.nameField;
        break;
      case 'lastName':
        field = this.lastNameField;
        break;
      case 'email':
        field = this.emailField;
        break;
      case 'password':
        field = this.passwordField;
        break;
      case 'reEnterPassword':
        field = this.reEnterPasswordField;
        break;
      default:
        throw new Error(`Unknown field name: ${fieldName}`);
    };
  
    await field.focus();
    await field.blur();
  };

  async enterName(name: string){
    await this.nameField.fill(name);
  };

  async enterLastName(lastName: string){
    await this.lastNameField.fill(lastName);
  };

  async enterEmail(email: string){
    await this.emailField.fill(email);
  };

  async enterPassword(password: string){
    await this.passwordField.fill(password);
  };

  async enterReEnterPassword(reEnterPassword: string){
    await this.reEnterPasswordField.fill(reEnterPassword);
  };

  async cliclRegisterButton(){
    await this.registerButton.click();
  };

  async verifyBorderColorWithErrorForNameField(): Promise<void> {
    const expectedColor = 'rgb(220, 53, 69)';
    await expect(this.nameField).toHaveCSS('border-color', expectedColor, {
      timeout: 3000,
    });
  };

  async verifyBorderColorWithErrorForLastNameField(): Promise<void>{
    const expectedColor = 'rgb(220, 53, 69)';
    await expect(this.lastNameField).toHaveCSS('border-color', expectedColor, {
      timeout: 3000,
    });
  };

  async verifyBorderColorWithErrorForEmailField(): Promise<void>{
    const expectedColor = 'rgb(220, 53, 69)';
    await expect(this.emailField).toHaveCSS('border-color', expectedColor, {
      timeout: 3000,
    });
  };

  async verifyBorderColorWithErrorForPasswordField(): Promise<void>{
    const expectedColor = 'rgb(220, 53, 69)';
    await expect(this.passwordField).toHaveCSS('border-color', expectedColor, {
      timeout: 3000,
    });
  };

  async verifyBorderColorWithErrorForReEnterPasswordField(): Promise<void>{
    const expectedColor = 'rgb(220, 53, 69)';
    await expect(this.reEnterPasswordField).toHaveCSS('border-color', expectedColor, {
      timeout: 3000,
    });
  };

  async verifyRegisterButtonIsDisabled() {
    await expect(this.registerButton).toBeDisabled();
  }

}
