import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  staticDirs: [
    // Serve public assets (logo, favicon)
    '../public',
    // Serve VA Design System icons and images
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
