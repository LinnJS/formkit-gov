import { test, expect } from '@playwright/test';

test.describe('TextInputField', () => {
  test('should render the default story', async ({ page }) => {
    await page.goto('/iframe.html?id=fields-textinputfield--default&viewMode=story');

    // Wait for the web component to be hydrated
    const textInput = page.locator('va-text-input.hydrated');
    await expect(textInput).toBeVisible();

    // Verify the label is displayed
    await expect(textInput.locator('label')).toContainText('Full name');
  });

  test('should allow text input', async ({ page }) => {
    await page.goto('/iframe.html?id=fields-textinputfield--default&viewMode=story');

    const textInput = page.locator('va-text-input');
    const input = textInput.locator('input');

    // Type into the input
    await input.fill('John Doe');

    // Verify the value
    await expect(input).toHaveValue('John Doe');
  });

  test('should display error state', async ({ page }) => {
    await page.goto('/iframe.html?id=fields-textinputfield--with-error&viewMode=story');

    const textInput = page.locator('va-text-input');
    await expect(textInput).toBeVisible();

    // Verify error message is displayed
    await expect(textInput.locator('span[id$="-error-message"]')).toContainText(
      'Please enter a valid email address'
    );
  });

  test('should be disabled when disabled prop is set', async ({ page }) => {
    await page.goto('/iframe.html?id=fields-textinputfield--disabled&viewMode=story');

    const textInput = page.locator('va-text-input');
    await expect(textInput).toBeVisible();

    // VA web components set disabled="true" on the custom element
    await expect(textInput).toHaveAttribute('disabled');
  });

  test('should support keyboard input', async ({ page }) => {
    await page.goto('/iframe.html?id=fields-textinputfield--default&viewMode=story');

    const textInput = page.locator('va-text-input');
    const input = textInput.locator('input');

    // Click to focus (more reliable than Tab in CI)
    await input.click();

    // Type using keyboard
    await page.keyboard.type('Test Input');

    // Verify the value
    await expect(input).toHaveValue('Test Input');
  });
});

test.describe('SelectField', () => {
  test('should render the default story', async ({ page }) => {
    await page.goto('/iframe.html?id=fields-selectfield--default&viewMode=story');

    // Wait for the component to render
    const selectField = page.locator('va-select');
    await expect(selectField).toBeVisible();

    // Verify the label is displayed
    await expect(selectField.locator('label')).toContainText('State');
  });

  test('should allow option selection', async ({ page }) => {
    await page.goto('/iframe.html?id=fields-selectfield--default&viewMode=story');

    const selectField = page.locator('va-select');
    const select = selectField.locator('select');

    // Select an option
    await select.selectOption('CA');

    // Verify the selected value
    await expect(select).toHaveValue('CA');
  });

  test('should display error state', async ({ page }) => {
    await page.goto('/iframe.html?id=fields-selectfield--with-error&viewMode=story');

    const selectField = page.locator('va-select');
    await expect(selectField).toBeVisible();

    // Verify error message is displayed
    await expect(selectField.locator('span[id$="-error-message"]')).toContainText(
      'Please select a state'
    );
  });

  test('should be disabled when disabled prop is set', async ({ page }) => {
    await page.goto('/iframe.html?id=fields-selectfield--disabled&viewMode=story');

    const selectField = page.locator('va-select');
    await expect(selectField).toBeVisible();

    // VA web components set disabled="true" on the custom element
    await expect(selectField).toHaveAttribute('disabled');
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/iframe.html?id=fields-selectfield--default&viewMode=story');

    const selectField = page.locator('va-select');
    const select = selectField.locator('select');

    // Focus the select element
    await select.focus();

    // Verify the select is focused
    await expect(select).toBeFocused();

    // Use keyboard to select an option (type first letter to jump to option)
    await page.keyboard.press('c'); // Jump to California (CA)

    // Verify a value is selected
    await expect(select).toHaveValue('CA');
  });
});
