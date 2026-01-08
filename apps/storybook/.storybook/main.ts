import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  staticDirs: [
    // Serve public assets (logo, favicon)
    '../public',
    // Serve VA Design System icons and images (path works for both local and CI)
    {
      from: '../node_modules/@department-of-veterans-affairs/css-library/dist/img',
      to: '/img',
    },
    {
      from: '../node_modules/@department-of-veterans-affairs/css-library/dist/fonts',
      to: '/fonts',
    },
  ],
};

export default config;

/**
 * Resolves the absolute path to a package's directory.
 *
 * Storybook 10 requires absolute paths for addon and framework configurations
 * to support ESM module resolution. This helper uses `import.meta.resolve()`
 * to locate package.json and returns the containing directory path.
 *
 * @param value - The package name to resolve (e.g., '@storybook/addon-docs')
 * @returns The absolute filesystem path to the package directory
 *
 * @example
 * getAbsolutePath('@storybook/addon-docs')
 * // Returns: '/path/to/node_modules/@storybook/addon-docs'
 */
function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
