import { Locator, Page } from "playwright/test";

export default class AddCarModal {
  readonly page: Page;
  readonly brandField: Locator;
  readonly modelField: Locator;
  readonly mileageField: Locator;
  readonly submitButton: Locator;
  readonly lastAddedCarName: Locator;
  readonly addCarButton: Locator;
  readonly editCarButton: Locator;
  readonly saveChangesButton: Locator;
  readonly updatedMileageField: Locator;

  constructor(page: Page) {
    this.page = page;
    this.brandField = page.locator("#addCarBrand");
    this.modelField = page.locator("#addCarModel");
    this.mileageField = page.locator("#addCarMileage");
    this.submitButton = page.locator(".modal-footer .btn-primary");
    this.lastAddedCarName = page.locator("li:nth-of-type(1) p.car_name.h2");
    this.addCarButton = page.locator('//div[@class="panel-page"]//button[contains(@class, "btn-primary")]');
    this.editCarButton = page.locator("li.car-item:nth-of-type(1) button.car_edit");
    this.saveChangesButton = page.locator(".modal-footer_group .btn-primary");
    this.updatedMileageField = page.locator("li.car-item:first-of-type input.update-mileage-form_input");
  }

  // async enterBrand(brand: string) {
  //   await this.brandField.selectOption(brand);
  //   await this.brandField.blur();
  // }

  // async enterModel(model: string) {
  //   await this.modelField.selectOption(model);
  //   await this.modelField.blur();
  // }

  // async enterMileage(mileage: string) {
  //   await this.mileageField.fill(mileage);
  //   await this.mileageField.blur();
  // }

  // async clickSubmitLoginButton() {
  //   await this.submitButton.click();
  // }

  // async clickAddCarButton() {
  //   await this.addCarButton.click();
  // };

  async addCarByBrandAndModel(brand: string, model: string) {
    await this.addCarButton.click();
    await this.brandField.selectOption(brand);
    await this.page.waitForTimeout(300);
    await this.modelField.selectOption(model);
    await this.mileageField.fill("1488");
    await this.submitButton.click();
  }

  async getLastAddedCarName(): Promise<string> {
    await this.page.waitForTimeout(300);
    return await this.lastAddedCarName.innerText();
  }

  async updateCarMileage(mileage: string) {
    await this.editCarButton.click();
    await this.mileageField.fill(mileage);
    await this.saveChangesButton.click();
    await this.page.waitForTimeout(300);
  }

  async getUpdatedMileageField(): Promise<string> {
    return await this.updatedMileageField.inputValue();
  }
}
