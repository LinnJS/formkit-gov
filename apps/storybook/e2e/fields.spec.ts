import { test, expect } from '@playwright/test';

test.describe('TextInputField', () => {
  test('should render the default story', async ({ page }) => {
    await page.goto('/iframe.html?id=fields-textinputfield--default&viewMode=story');

    // Wait for the component to render
    const textInput = page.locator('va-text-input');
    await expect(textInput).toBeVisible();

    // Verify the label
    await expect(textInput).toHaveAttribute('label', 'Full name');
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

    // Verify error attribute is present
    await expect(textInput).toHaveAttribute('error', 'Please enter a valid email address');
  });

  test('should be disabled when disabled prop is set', async ({ page }) => {
    await page.goto('/iframe.html?id=fields-textinputfield--disabled&viewMode=story');

    const textInput = page.locator('va-text-input');
    const input = textInput.locator('input');

    // Verify the input is disabled
    await expect(input).toBeDisabled();
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/iframe.html?id=fields-textinputfield--default&viewMode=story');

    const textInput = page.locator('va-text-input');
    const input = textInput.locator('input');

    // Tab to the input
    await page.keyboard.press('Tab');

    // Verify the input is focused
    await expect(input).toBeFocused();

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

    // Verify the label
    await expect(selectField).toHaveAttribute('label', 'State');
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

    // Verify error attribute is present
    await expect(selectField).toHaveAttribute('error', 'Please select a state');
  });

  test('should be disabled when disabled prop is set', async ({ page }) => {
    await page.goto('/iframe.html?id=fields-selectfield--disabled&viewMode=story');

    const selectField = page.locator('va-select');
    const select = selectField.locator('select');

    // Verify the select is disabled
    await expect(select).toBeDisabled();
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/iframe.html?id=fields-selectfield--default&viewMode=story');

    const selectField = page.locator('va-select');
    const select = selectField.locator('select');

    // Tab to the select
    await page.keyboard.press('Tab');

    // Verify the select is focused
    await expect(select).toBeFocused();

    // Navigate with arrow keys
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');

    // Press Enter to select
    await page.keyboard.press('Enter');

    // Verify a value is selected (will be the second option after the placeholder)
    const value = await select.inputValue();
    expect(value).toBeTruthy();
  });
});
