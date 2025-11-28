/**
 * Test setup for @formkit-gov/react
 *
 * Configures testing-library matchers and environment for happy-dom
 */

import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

expect.extend(matchers);
