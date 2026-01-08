import { test, expect } from '@playwright/test';

test.describe('TextInputField Form Integration', () => {
  test('should submit form with valid data', async ({ page }) => {
    await page.goto('/iframe.html?id=fields-textinputfield--with-react-hook-form&viewMode=story');

    // Wait for the form to render
    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Fill in the email field
    const textInput = page.locator('va-text-input');
    const input = textInput.locator('input');
    await input.fill('test@example.com');

    // Set up dialog handler to capture the alert
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('test@example.com');
      await dialog.accept();
    });

    // Submit the form
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
  });

  test('should display validation errors on invalid data', async ({ page }) => {
    await page.goto('/iframe.html?id=fields-textinputfield--with-react-hook-form&viewMode=story');

    // Wait for the form to render
    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Submit without filling the form
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Wait for error to appear
    const textInput = page.locator('va-text-input');

    // Check that error message is displayed
    await expect(textInput.locator('span[id$="-error-message"]')).toBeVisible();
  });
});

test.describe('Complete Form Example', () => {
  test('should fill out complete form successfully', async ({ page }) => {
    await page.goto('/iframe.html?id=fields-textinputfield--complete-form-example&viewMode=story');

    // Wait for the form to render
    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Get all text inputs
    const textInputs = page.locator('va-text-input');

    // Fill in first name
    const firstNameInput = textInputs.nth(0).locator('input');
    await firstNameInput.fill('John');

    // Fill in last name
    const lastNameInput = textInputs.nth(1).locator('input');
    await lastNameInput.fill('Doe');

    // Fill in email
    const emailInput = textInputs.nth(2).locator('input');
    await emailInput.fill('john.doe@example.com');

    // Verify all fields have values
    await expect(firstNameInput).toHaveValue('John');
    await expect(lastNameInput).toHaveValue('Doe');
    await expect(emailInput).toHaveValue('john.doe@example.com');

    // Set up dialog handler to capture the alert
    page.on('dialog', async dialog => {
      const message = dialog.message();
      expect(message).toContain('John');
      expect(message).toContain('Doe');
      expect(message).toContain('john.doe@example.com');
      await dialog.accept();
    });

    // Submit the form
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
  });

  test('should show validation errors for all fields', async ({ page }) => {
    await page.goto('/iframe.html?id=fields-textinputfield--complete-form-example&viewMode=story');

    // Wait for the form to render
    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Submit without filling the form
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Wait a bit for validation to trigger
    await page.waitForTimeout(100);

    // Check that all three inputs have error attributes
    const textInputs = page.locator('va-text-input');

    // All three fields should have error messages displayed
    await expect(textInputs.nth(0).locator('span[id$="-error-message"]')).toBeVisible();
    await expect(textInputs.nth(1).locator('span[id$="-error-message"]')).toBeVisible();
    await expect(textInputs.nth(2).locator('span[id$="-error-message"]')).toBeVisible();
  });

  test('should validate individual fields on blur', async ({ page }) => {
    await page.goto('/iframe.html?id=fields-textinputfield--complete-form-example&viewMode=story');

    // Wait for the form to render
    const form = page.locator('form');
    await expect(form).toBeVisible();

    const textInputs = page.locator('va-text-input');

    // Fill in first name with invalid data (too short)
    const firstNameInput = textInputs.nth(0).locator('input');
    await firstNameInput.fill('J');

    // Move to next field to trigger blur validation
    const lastNameInput = textInputs.nth(1).locator('input');
    await lastNameInput.click();

    // Submit to trigger all validation
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Wait for validation
    await page.waitForTimeout(100);

    // First name should have error message displayed (too short)
    await expect(textInputs.nth(0).locator('span[id$="-error-message"]')).toBeVisible();
  });
});

test.describe('SelectField Form Integration', () => {
  test('should submit form with selected value', async ({ page }) => {
    await page.goto('/iframe.html?id=fields-selectfield--with-react-hook-form&viewMode=story');

    // Wait for the form to render
    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Select a state
    const selectField = page.locator('va-select');
    const select = selectField.locator('select');
    await select.selectOption('CA');

    // Set up dialog handler to capture the alert
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('CA');
      await dialog.accept();
    });

    // Submit the form
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
  });

  test('should display validation error when no option selected', async ({ page }) => {
    await page.goto('/iframe.html?id=fields-selectfield--with-react-hook-form&viewMode=story');

    // Wait for the form to render
    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Submit without selecting
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Wait for error to appear
    const selectField = page.locator('va-select');

    // Check that error message is displayed
    await expect(selectField.locator('span[id$="-error-message"]')).toBeVisible();
  });
});
