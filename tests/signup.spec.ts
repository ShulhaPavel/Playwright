import { test, expect, Locator } from '@playwright/test';

test.describe('Validation for Sign Up modal', () => {
    let signUpButton: Locator;
    let nameField: Locator;
    let lastNameField: Locator;
    let emailField: Locator;
    let passwordField: Locator;
    let reEnterPasswordField: Locator;
    let invalidErrorMessage: Locator;
    let registerButton: Locator;
    let emptyMessage: Locator;

    test.beforeEach(async ({ page }) => {
        signUpButton = page.locator('.btn-primary');
        nameField = page.locator('#signupName');
        lastNameField = page.locator('#signupLastName');
        emailField = page.locator('#signupEmail');
        passwordField = page.locator('#signupPassword');
        reEnterPasswordField = page.locator('#signupRepeatPassword');
        registerButton = page.locator('.modal-footer .btn-primary');
        invalidErrorMessage = page.locator('.invalid-feedback p');
        emptyMessage = page.locator('.panel-empty_message');
        await page.goto('https://guest:welcome2qauto@qauto.forstudy.space');
        await signUpButton.click();
    });

    test.describe('Validation for "Name" field', () => {
        test.beforeEach(async () => {
            await nameField.focus();
        });

        test('Verify "Name required" error message for empty "Name" field', async () => {
            await nameField.blur();
            await expect(invalidErrorMessage).toContainText('Name required');
            await expect(nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(registerButton).toBeDisabled();
        });

        test('Verify "Name is invalid" message for "Name" field with number input', async () => {
            await nameField.fill('2222');
            await nameField.blur();
            await expect(invalidErrorMessage).toContainText('Name is invalid');
            await expect(nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(registerButton).toBeDisabled();
        });

        test('Verify "Name is invalid" message for "Name" field with Cyrillic alphabet', async () => {
            await nameField.fill('ффффф');
            await nameField.blur();
            await expect(invalidErrorMessage).toContainText('Name is invalid');
            await expect(nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(registerButton).toBeDisabled();
        });

        test('Verify error "Name has to be from 2 to 20 characters long" for 1 character', async () => {
            await nameField.fill('a');
            await nameField.blur();
            await expect(invalidErrorMessage).toContainText('Name has to be from 2 to 20 characters long');
            await expect(nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(registerButton).toBeDisabled();
        });

        test('Verify that both errors display for "Name" at once', async () => {
            await nameField.fill('2');
            await nameField.blur();
            await expect(invalidErrorMessage.nth(0)).toContainText('Name is invalid');
            await expect(invalidErrorMessage.nth(1)).toContainText('Name has to be from 2 to 20 characters long');
            await expect(nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(registerButton).toBeDisabled();
        });
    });
    test.describe('Validation for "Last name" field', () => {
        test.beforeEach(async () => {
            await lastNameField.focus();
        });
        test('Verify error message for empty "Last name" field', async () => {
            await lastNameField.blur();
            await expect(invalidErrorMessage).toHaveText('Last name required');
            await expect(lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(registerButton).toBeDisabled();
        });

        test('Verify error "Last name is invalid" for number input', async () => {
            await lastNameField.fill('2222');
            await lastNameField.blur();
            await expect(invalidErrorMessage).toContainText('Last name is invalid');
            await expect(lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(registerButton).toBeDisabled();
        });

	    test('Verify error "Last name is invalid" for Cyrillic input', async () => {
            await lastNameField.fill('ффффф');
            await lastNameField.blur();
            await expect(invalidErrorMessage).toContainText('Last name is invalid');
            await expect(lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(registerButton).toBeDisabled();
        });

        test('Verify error "Last name is invalid" for empty spaces', async () => {
            await lastNameField.fill('    ');
            await lastNameField.blur();
            await expect(invalidErrorMessage).toContainText('Last name is invalid');
            await expect(lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(registerButton).toBeDisabled();
        });

        test('Verify error "Last name has to be from 2 to 20 characters long" for 1 character', async () => {
            await lastNameField.fill('a');
            await lastNameField.blur();
            await expect(invalidErrorMessage).toContainText('Last name has to be from 2 to 20 characters long');
            await expect(lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(registerButton).toBeDisabled();
        });

        test('Verify error "Last name has to be from 2 to 20 characters long" for 21 characters', async () => {
            await lastNameField.fill('abcdefghijklmnopqrstu');
            await lastNameField.blur();
            await expect(invalidErrorMessage).toContainText('Last name has to be from 2 to 20 characters long');
            await expect(lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(registerButton).toBeDisabled();
        });

        test('Verify that both errors display for "Last name" at once', async () => {
            await lastNameField.fill('2');
            await lastNameField.blur();
            await expect(invalidErrorMessage.nth(0)).toContainText('Last name is invalid');
            await expect(invalidErrorMessage.nth(1)).toContainText('Last name has to be from 2 to 20 characters long');
            await expect(lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(registerButton).toBeDisabled();
        });
    });

    test.describe('Validation for "Email" field', () => {
        test.beforeEach(async () => {
            await emailField.focus();
        });
        test('Verify "Email required" error for empty email', async () => {
            await emailField.blur();
            await expect(invalidErrorMessage).toHaveText('Email required');
            await expect(emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(registerButton).toBeDisabled();
        });

        test('Verify error for invalid email format', async () => {
            await emailField.fill('invalid@');
            await emailField.blur();
            await expect(invalidErrorMessage).toHaveText('Email is incorrect');
            await expect(emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(registerButton).toBeDisabled();
        });
    });

    test.describe('Validation for "Password" field', () => {
        test.beforeEach(async () => {
            await passwordField.focus();
        });
        test('Verify "Password required" error message for empty "Password" field', async () => {
            await passwordField.blur();
            await expect(invalidErrorMessage).toHaveText('Password required');
            await expect(passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(registerButton).toBeDisabled();
        });

        test('Verify error for password with 1 character', async () => {
            await passwordField.fill('a');
            await passwordField.blur();
            await expect(invalidErrorMessage).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            await expect(passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(registerButton).toBeDisabled();
        });

        test('Verify error for password with 21 characters', async () => {
            await passwordField.fill('abcdefghijklmnopqrstu');
            await passwordField.blur();
            await expect(invalidErrorMessage).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            await expect(passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(registerButton).toBeDisabled();
        });

        test('Verify error for password without capital letter', async () => {
            await passwordField.fill('passwo@1');
            await passwordField.blur();
            await expect(invalidErrorMessage).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            await expect(passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(registerButton).toBeDisabled();
        });

        test('Verify error for password without small letter', async () => {
            await passwordField.fill('PASSWO@1');
            await passwordField.blur();
            await expect(invalidErrorMessage).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            await expect(passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(registerButton).toBeDisabled();
        });

        test('Verify error for password without integer', async () => {
            await passwordField.fill('Passwo@q');
            await passwordField.blur();
            await expect(invalidErrorMessage).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            await expect(passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(registerButton).toBeDisabled();
        });
    });


    test.describe('Validation for "Re-enter password" field', () => {
        test.beforeEach(async () => {
            await reEnterPasswordField.focus();
        });
        test('Verify "Re-enter password required" error message for empty "Re-enter password" field', async () => {
            await reEnterPasswordField.blur();
            await expect(invalidErrorMessage).toHaveText('Re-enter password required');
            await expect(reEnterPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(registerButton).toBeDisabled();
        });

        test('Verify "Passwords do not match" error message', async () => {
            await passwordField.fill('Passwo@1');
            await reEnterPasswordField.fill('Passwo@2');
            await reEnterPasswordField.blur();
            await expect(invalidErrorMessage).toHaveText('Passwords do not match');
            await expect(reEnterPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(registerButton).toBeDisabled();
        });
    });

    test.describe('Successful sign up', () => {
        test('Verify successful sign up flow', async ({ page }) => {
            const randomPrefix = Math.floor(Math.random() * 100000);
            const email = `shulga.pavlo98+${randomPrefix}@gmail.com`;
            await nameField.focus();
            await nameField.fill('Pavel');
            await lastNameField.focus();
            await lastNameField.fill('Shulga');
            await emailField.focus();
            await emailField.fill(email);
            await passwordField.focus();
            await passwordField.fill('Passwo@1');
            await reEnterPasswordField.focus();
            await reEnterPasswordField.fill('Passwo@1');
            await expect(registerButton).toBeEnabled();
            await registerButton.click();
            await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
            await expect(emptyMessage).toHaveText('You don’t have any cars in your garage');
        });
    });
})