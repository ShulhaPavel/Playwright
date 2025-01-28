import { test, expect, Locator } from "@playwright/test";
import HomePage from "../../pom/pages/HomePage";
import LoginModal from "../../pom/modals/LoginModal";
import GaragePage from "../../pom/pages/GaragePage";

test.describe("Setup user", () => {
  let homePage: HomePage;
  let loginModal: LoginModal;
  let garagePage: GaragePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginModal = new LoginModal(page);
    garagePage = new GaragePage(page);
    await homePage.openPage();
    await homePage.openLoginModal();
  });

  test("Log in and save state", async ({page}) => {
        await loginModal.emailField.focus();
        await loginModal.enterEmail(process.env.MAIN_USER_EMAIL!);
        await loginModal.passwordField.focus();
        await loginModal.enterPassword(process.env.MAIN_USER_PASSWORD!);
        await loginModal.clickSubmitLoginButton();
        await garagePage.verifyPageIsOpen();
        await page.waitForTimeout(1000);
        await page.context().storageState({path:'./test-data/states/userOne.json'})
  });
});
