/**
 * Test setup for @formkit-gov/react
 *
 * Configures testing-library matchers, axe-core accessibility matchers,
 * and environment for happy-dom
 */

import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
import * as axeMatchers from 'vitest-axe/matchers';

expect.extend(matchers);
expect.extend(axeMatchers);

// Export axe for use in tests
export { axe, configureAxe } from 'vitest-axe';
