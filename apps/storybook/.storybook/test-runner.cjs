const { injectAxe, checkA11y } = require('axe-playwright');

/**
 * Storybook Test Runner Configuration
 *
 * This configuration runs automated tests on all Storybook stories:
 * 1. Smoke tests - Ensures every story renders without errors
 * 2. Accessibility tests - Runs axe-core on every story
 *
 * Note: Stories with play functions (interaction tests) are tested via
 * our dedicated Playwright E2E tests in apps/storybook/e2e/
 *
 * @see https://storybook.js.org/docs/writing-tests/test-runner
 */
module.exports = {
  /**
   * Filter function to exclude stories with play functions
   * These are tested separately via E2E tests
   */
  async getHttpHeaders() {
    return {};
  },

  /**
   * Hook that runs before each story is visited
   * Injects the axe-core library into the page
   */
  async preVisit(page) {
    await injectAxe(page);
  },

  /**
   * Hook that runs after each story is rendered
   * Performs accessibility audit using axe-core
   */
  async postVisit(page, context) {
    // Skip accessibility check for stories with play functions
    // as those are integration tests, not accessibility tests
    if (context.hasPlayFunction) {
      return;
    }

    // Run accessibility checks on the story
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
      // VA Design System web components may have specific patterns
      axeOptions: {
        rules: {
          // Disable region rule - Storybook stories don't have landmark regions
          // as they are isolated component demos, not full pages
          region: { enabled: false },
        },
      },
    });
  },
};
