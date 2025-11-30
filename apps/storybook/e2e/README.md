# Storybook E2E Tests

This directory contains end-to-end tests for the FormKit Gov Storybook components using Playwright.

## Test Structure

- `fields.spec.ts` - Tests for individual field components (TextInputField, SelectField)
- `form-integration.spec.ts` - Tests for complete form integration scenarios

## Running Tests

### Prerequisites

Install Playwright browsers (Chromium):

```bash
pnpm --filter @formkit-gov/storybook exec playwright install chromium
```

### Run Tests

From the repository root or the storybook app directory:

```bash
# Run all E2E tests in headless mode
pnpm --filter @formkit-gov/storybook test:e2e

# Run tests in UI mode (interactive)
pnpm --filter @formkit-gov/storybook test:e2e:ui

# Run tests in headed mode (see the browser)
pnpm --filter @formkit-gov/storybook exec playwright test --headed

# Run a specific test file
pnpm --filter @formkit-gov/storybook exec playwright test e2e/fields.spec.ts

# Debug tests
pnpm --filter @formkit-gov/storybook exec playwright test --debug
```

## Test Coverage

### Field Components

- TextInputField
  - Basic rendering
  - Text input interaction
  - Error state display
  - Disabled state
  - Keyboard navigation

- SelectField
  - Basic rendering
  - Option selection
  - Error state display
  - Disabled state
  - Keyboard navigation

### Form Integration

- React Hook Form integration
  - Form submission with valid data
  - Validation error display
  - Individual field validation

- Complete form scenarios
  - Multi-field form filling
  - Form-wide validation
  - Field-level validation on blur

## Configuration

The Playwright configuration is located in `playwright.config.ts` and includes:

- Automatic Storybook server startup
- Chromium browser testing
- HTML report generation
- Retry logic for CI environments

## Adding New Tests

When adding new tests:

1. Follow the existing test structure
2. Use descriptive test names
3. Test both success and error scenarios
4. Include keyboard accessibility tests
5. Verify ARIA attributes where applicable
6. Use the Storybook iframe URL pattern: `/iframe.html?id=story-id&viewMode=story`

## CI Integration

The tests are configured to run automatically on CI:

- Retry failed tests twice
- Generate HTML reports
- Run in parallel mode disabled for stability
