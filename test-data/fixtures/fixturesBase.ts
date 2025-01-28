import { test as base } from "@playwright/test";
import GaragePage from "../../pom/pages/GaragePage";
import HomePage from "../../pom/pages/HomePage";
import LoginModal from "../../pom/modals/LoginModal";
import AddCarModal from "../../pom/modals/AddCarModal";

let homePage: HomePage;
let loginModal: LoginModal;
let garagePage: GaragePage;
let addCarModal: AddCarModal;

export const test = base.extend({
  garagePageAsLoggedUser: async ({ page }, use) => {
    // await page.goto("/");

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

    await use(addCarModal);
  },
});
