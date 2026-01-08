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

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
