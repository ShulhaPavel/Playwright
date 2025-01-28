import HomePage from "../pom/pages/HomePage";
import { test, expect, Locator } from "@playwright/test";
import LoginModal from "../pom/modals/LoginModal";
import { SIGNUP_ERRORS } from '../test-data/constans/errors';

test.describe("Login tests with PoM", () => {
  let homePage: HomePage;
  let loginModal: LoginModal;
  let emptyMessage: Locator;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginModal = new LoginModal(page);
    await homePage.openPage();
    await homePage.openLoginModal();
    emptyMessage = page.locator('.panel-empty_message');
  });

  test.describe('Successful Login', () => {
          test('Verify successful login flow', async ({page}) => {
              await loginModal.emailField.focus();
              await loginModal.enterEmail(process.env.MAIN_USER_EMAIL!);
              await loginModal.passwordField.focus();
              await loginModal.enterPassword(process.env.MAIN_USER_PASSWORD!);
              await loginModal.clickSubmitLoginButton();
              await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
              await expect(emptyMessage).toHaveText(SIGNUP_ERRORS.EMPTY.GARAGE_PAGE);
          });
      });
});
