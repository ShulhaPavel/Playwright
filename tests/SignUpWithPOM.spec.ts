import SignUpModal from '../pom/modals/SignUpModal';
import HomePage from '../pom/pages/HomePage';
import  { test, expect, Locator } from '@playwright/test';
import { SIGNUP_ERRORS } from '../test-data/constans/errors';

test.describe(('Sign Up tests with PoM'), () => {
    let homePage : HomePage;
    let signUpModal: SignUpModal;
    let invalidErrorMessage: Locator;
    let emptyMessage: Locator;
    
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signUpModal = new SignUpModal(page);
        invalidErrorMessage = page.locator('.invalid-feedback p');
        emptyMessage = page.locator('.panel-empty_message');
        await homePage.openPage();
        await homePage.openSignUpModal();
    });

    test.describe('Validation for "Name" field', () => {
        test.beforeEach(async () => {
            await signUpModal.triggerEmptyErrorsByField('name');
        });

        test('Verify "Name required" error message for empty "Name" field', async () => {
            await expect(invalidErrorMessage).toContainText(SIGNUP_ERRORS.EMPTY.NAME);
            await signUpModal.verifyBorderColorWithErrorForNameField();
            signUpModal.verifyRegisterButtonIsDisabled();
        });

        test('Verify "Name is invalid" message for "Name" field with number input', async () => {
            await signUpModal.enterName('2222');
            await expect(invalidErrorMessage).toContainText(SIGNUP_ERRORS.INCORRECT.NAME);
            await signUpModal.verifyBorderColorWithErrorForNameField();
            signUpModal.verifyRegisterButtonIsDisabled();
        });

        test('Verify "Name is invalid" message for "Name" field with Cyrillic alphabet', async () => {
            await signUpModal.enterName('ффффф');
            await expect(invalidErrorMessage).toContainText(SIGNUP_ERRORS.INCORRECT.NAME);
            await signUpModal.verifyBorderColorWithErrorForNameField();
            signUpModal.verifyRegisterButtonIsDisabled();
        });

        test('Verify error "Name has to be from 2 to 20 characters long" for 1 character', async () => {
            await signUpModal.enterName('a');
            await expect(invalidErrorMessage).toContainText(SIGNUP_ERRORS.LENGTH.NAME);
            await signUpModal.verifyBorderColorWithErrorForNameField();
            signUpModal.verifyRegisterButtonIsDisabled();
        });

        test('Verify that both errors display for "Name" at once', async () => {
            await signUpModal.enterName('2');
            await expect(invalidErrorMessage.nth(0)).toContainText(SIGNUP_ERRORS.INCORRECT.NAME);
            await expect(invalidErrorMessage.nth(1)).toContainText(SIGNUP_ERRORS.LENGTH.NAME);
            await signUpModal.verifyBorderColorWithErrorForNameField();
            signUpModal.verifyRegisterButtonIsDisabled();
        });
    });

    test.describe('Validation for "Last name" field', () => {
        test.beforeEach(async () => {
            await signUpModal.triggerEmptyErrorsByField('lastName');
        });


        test('Verify error message for empty "Last name" field', async () => {
            await expect(invalidErrorMessage).toHaveText(SIGNUP_ERRORS.EMPTY.LAST_NAME);
            await signUpModal.verifyBorderColorWithErrorForLastNameField();
            signUpModal.verifyRegisterButtonIsDisabled();
        });

        test('Verify error "Last name is invalid" for number input', async () => {
            await signUpModal.enterLastName('2222');
            await expect(invalidErrorMessage).toContainText(SIGNUP_ERRORS.INCORRECT.LAST_NAME);
            await signUpModal.verifyBorderColorWithErrorForLastNameField();
            signUpModal.verifyRegisterButtonIsDisabled();
        });

	    test('Verify error "Last name is invalid" for Cyrillic input', async () => {
            await signUpModal.enterLastName('ффффф');
            await expect(invalidErrorMessage).toContainText(SIGNUP_ERRORS.INCORRECT.LAST_NAME);
            await signUpModal.verifyBorderColorWithErrorForLastNameField();
            signUpModal.verifyRegisterButtonIsDisabled();
        });

        test('Verify error "Last name is invalid" for empty spaces', async () => {
            await signUpModal.enterLastName('    ');
            await expect(invalidErrorMessage).toContainText(SIGNUP_ERRORS.INCORRECT.LAST_NAME);
            await signUpModal.verifyBorderColorWithErrorForLastNameField();
            signUpModal.verifyRegisterButtonIsDisabled();
        });

        test('Verify error "Last name has to be from 2 to 20 characters long" for 1 character', async () => {
            await signUpModal.enterLastName('a');
            await expect(invalidErrorMessage).toContainText(SIGNUP_ERRORS.LENGTH.LAST_NAME);
            await signUpModal.verifyBorderColorWithErrorForLastNameField();
            signUpModal.verifyRegisterButtonIsDisabled();
        });

        test('Verify error "Last name has to be from 2 to 20 characters long" for 21 characters', async () => {
            await signUpModal.enterLastName('abcdefghijklmnopqrstu');
            await expect(invalidErrorMessage).toContainText(SIGNUP_ERRORS.LENGTH.LAST_NAME);
            await signUpModal.verifyBorderColorWithErrorForLastNameField();
            signUpModal.verifyRegisterButtonIsDisabled();
        });

        test('Verify that both errors display for "Last name" at once', async () => {
            await signUpModal.enterLastName('2');
            await expect(invalidErrorMessage.nth(0)).toContainText(SIGNUP_ERRORS.INCORRECT.LAST_NAME);
            await expect(invalidErrorMessage.nth(1)).toContainText(SIGNUP_ERRORS.LENGTH.LAST_NAME);
            await signUpModal.verifyBorderColorWithErrorForLastNameField();
            signUpModal.verifyRegisterButtonIsDisabled();
        });
    });

    test.describe('Validation for "Email" field', () => {
        test.beforeEach(async () => {
            await signUpModal.triggerEmptyErrorsByField('email');
        });

        test('Verify "Email required" error for empty email', async () => {
            await expect(invalidErrorMessage).toHaveText(SIGNUP_ERRORS.EMPTY.EMAIL);
            await signUpModal.verifyBorderColorWithErrorForEmailField();
            signUpModal.verifyRegisterButtonIsDisabled();
        });

        test('Verify error for invalid email format', async () => {
            await signUpModal.enterEmail('invalid@');
            await expect(invalidErrorMessage).toHaveText(SIGNUP_ERRORS.INCORRECT.EMAIL);
            await signUpModal.verifyBorderColorWithErrorForEmailField();
            signUpModal.verifyRegisterButtonIsDisabled();
        });
    });

    test.describe('Validation for "Password" field', () => {
        test.beforeEach(async () => {
            await signUpModal.triggerEmptyErrorsByField('password');
        });

        test('Verify "Password required" error message for empty "Password" field', async () => {
            await expect(invalidErrorMessage).toHaveText(SIGNUP_ERRORS.EMPTY.PASSWORD);
            await signUpModal.verifyBorderColorWithErrorForPasswordField();
            signUpModal.verifyRegisterButtonIsDisabled();
        });

        test('Verify error for password with 1 character', async () => {
            await signUpModal.enterPassword('a');
            await expect(invalidErrorMessage).toHaveText(SIGNUP_ERRORS.INCORRECT.PASSWORD);
            await signUpModal.verifyBorderColorWithErrorForPasswordField();
            signUpModal.verifyRegisterButtonIsDisabled();
        });

        test('Verify error for password with 21 characters', async () => {
            await signUpModal.enterPassword('abcdefghijklmnopqrstu');
            await expect(invalidErrorMessage).toHaveText(SIGNUP_ERRORS.INCORRECT.PASSWORD);
            await signUpModal.verifyBorderColorWithErrorForPasswordField();
            signUpModal.verifyRegisterButtonIsDisabled();
        });

        test('Verify error for password without capital letter', async () => {
            await signUpModal.enterPassword('passwo@1');
            await expect(invalidErrorMessage).toHaveText(SIGNUP_ERRORS.INCORRECT.PASSWORD);
            await signUpModal.verifyBorderColorWithErrorForPasswordField();
            signUpModal.verifyRegisterButtonIsDisabled();
        });

        test('Verify error for password without small letter', async () => {
            await signUpModal.enterPassword('PASSWO@1');
            await expect(invalidErrorMessage).toHaveText(SIGNUP_ERRORS.INCORRECT.PASSWORD);
            await signUpModal.verifyBorderColorWithErrorForPasswordField();
            signUpModal.verifyRegisterButtonIsDisabled();
        });

        test('Verify error for password without integer', async () => {
            await signUpModal.enterPassword('Passwo@q');
            await expect(invalidErrorMessage).toHaveText(SIGNUP_ERRORS.INCORRECT.PASSWORD);
            await signUpModal.verifyBorderColorWithErrorForPasswordField();
            signUpModal.verifyRegisterButtonIsDisabled();
        });
    });

    test.describe('Validation for "Re-enter password" field', () => {
        test.beforeEach(async () => {
            await signUpModal.triggerEmptyErrorsByField('reEnterPassword');
        });

        test('Verify "Re-enter password required" error message for empty "Re-enter password" field', async () => {
            await expect(invalidErrorMessage).toHaveText(SIGNUP_ERRORS.EMPTY.RE_ENTER_PASSWORD);
            await signUpModal.verifyBorderColorWithErrorForReEnterPasswordField();
            signUpModal.verifyRegisterButtonIsDisabled();
        });

        test('Verify "Passwords do not match" error message', async () => {
            await signUpModal.enterPassword('Passwo@1');
            await signUpModal.enterReEnterPassword('Passwo@2');
            await expect(invalidErrorMessage).toHaveText(SIGNUP_ERRORS.INCORRECT.RE_ENTER_PASSWORD);
            await signUpModal.verifyBorderColorWithErrorForReEnterPasswordField();
            signUpModal.verifyRegisterButtonIsDisabled();
        });
    });

    test.describe('Successful sign up', () => {
        test('Verify successful sign up flow', async ({ page }) => {
            const randomPrefix = Math.floor(Math.random() * 100000);
            const email = `shulga.pavlo98+${randomPrefix}@gmail.com`;
            await signUpModal.nameField.focus();
            await signUpModal.enterName('Pavel');
            await signUpModal.lastNameField.focus();
            await signUpModal.enterLastName('Shulga');
            await signUpModal.emailField.focus();
            await signUpModal.enterEmail(email);
            await signUpModal.passwordField.focus();
            await signUpModal.enterPassword('Passwo@1');
            await signUpModal.reEnterPasswordField.focus();
            await signUpModal.enterReEnterPassword('Passwo@1');
            await signUpModal.registerButton.click();
            await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
            await expect(emptyMessage).toHaveText(SIGNUP_ERRORS.EMPTY.GARAGE_PAGE);
        });
    });
});