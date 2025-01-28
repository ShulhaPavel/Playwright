import HomePage from "../pom/pages/HomePage";
import { test, expect, Locator } from "@playwright/test";
import LoginModal from "../pom/modals/LoginModal";
import { SIGNUP_ERRORS } from "../test-data/constans/errors";
import GaragePage from "../pom/pages/GaragePage";
import AddCarModal from "../pom/modals/AddCarModal";

test.describe("Add Car", () => {
  test.use({storageState: './test-data/states/userOne.json'})
  let homePage: HomePage;
  let loginModal: LoginModal;
  let garagePage: GaragePage;
  let addCarModal: AddCarModal;
  //   let emptyMessage: Locator;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginModal = new LoginModal(page);
    garagePage = new GaragePage(page);
    addCarModal = new AddCarModal(page);
    // await homePage.openPage();
    // await homePage.openLoginModal();
    // await loginModal.enterEmail(process.env.MAIN_USER_EMAIL!);
    // await loginModal.enterPassword(process.env.MAIN_USER_PASSWORD!);
    // await loginModal.clickSubmitLoginButton();
    await garagePage.openPage();
    // emptyMessage = page.locator('.panel-empty_message');
  });

  test.describe("Successful Adding a car", () => {
  //   test("Verify successful adding a Audi car", async () => {
  //     await garagePage.clickAddCarButton();
  //     await addCarModal.brandField.focus();
  //     await addCarModal.enterBrand("Audi");
  //     await addCarModal.modelField.focus();
  //     await addCarModal.enterModel("A8");
  //     await addCarModal.mileageField.focus();
  //     await addCarModal.enterMileage("1488");
  //     await addCarModal.clickSubmitLoginButton();
  //   });

  //   test("Verify successful adding a Porsche car", async () => {
  //     await garagePage.clickAddCarButton();
  //     await addCarModal.brandField.focus();
  //     await addCarModal.enterBrand("Porsche");
  //     await addCarModal.modelField.focus();
  //     await addCarModal.enterModel("911");
  //     await addCarModal.mileageField.focus();
  //     await addCarModal.enterMileage("1488");
  //     await addCarModal.clickSubmitLoginButton();
  //   });

    test('Verify successful adding a Porsche car with 1 method', async () => {
      await addCarModal.addCarByBrandAndModel('Porsche', '911');
      expect('Porsche 911').toBe(await addCarModal.getLastAddedCarName());
     });

     test('Verify successful adding a Audi car with 1 method', async () => {
      await addCarModal.addCarByBrandAndModel('Audi', 'A8');
      expect('Audi A8').toBe(await addCarModal.getLastAddedCarName());
     });
    });
});
