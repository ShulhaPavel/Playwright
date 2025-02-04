import { test, expect, Locator } from "@playwright/test";
import GaragePage from "../../pom/pages/GaragePage";
import HomePage from "../../pom/pages/HomePage";
import LoginModal from "../../pom/modals/LoginModal";
import AddCarModal from "../../pom/modals/AddCarModal";

test.describe("Intercept request for updating profile", async () => {
  let homePage: HomePage;
  let loginModal: LoginModal;
  let garagePage: GaragePage;
  let addCarModal: AddCarModal;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginModal = new LoginModal(page);
    garagePage = new GaragePage(page);
    addCarModal = new AddCarModal(page);

    await homePage.openPage();
    await homePage.openLoginModal();
    await loginModal.enterEmail(process.env.MAIN_USER_EMAIL!);
    await loginModal.enterPassword(process.env.MAIN_USER_PASSWORD!);
    await loginModal.clickSubmitLoginButton();
    await page.waitForLoadState("networkidle");
    await garagePage.openPage();
  });

  test("Update user name in Profile page", async ({ page }) => {
    const profile = {
      status: "ok",
      data: {
        userId: 165177,
        photoFilename: "default-user.png",
        name: "Polar",
        lastName: "Bear",
      },
    };

    await page.route("**/api/users/profile", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(profile),
      });
    });
    
    await garagePage.clickProfileButton();
    await page.reload({ waitUntil: "networkidle" });
    const profileName = page.locator('.profile_name')
    await expect(profileName).toHaveText('Polar Bear');
  });
});
