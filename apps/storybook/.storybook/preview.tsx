// Import and register VA Design System web components
import {
  applyPolyfills,
  defineCustomElements,
} from '@department-of-veterans-affairs/web-components/loader';
import React from 'react';

import type { Preview } from '@storybook/react';

// Suppress React act() warnings in Storybook environment
// @ts-expect-error React internals
globalThis.IS_REACT_ACT_ENVIRONMENT = false;

// Import VA CSS Library base styles (typography, utilities, core)
import '@department-of-veterans-affairs/css-library/dist/stylesheets/core.css';
import '@department-of-veterans-affairs/css-library/dist/stylesheets/uswds-typography.css';
import '@department-of-veterans-affairs/css-library/dist/stylesheets/utilities.css';

// Import VA Design System component styles
import '@department-of-veterans-affairs/component-library/dist/main.css';

// Register all VADS web components
applyPolyfills().then(() => {
  defineCustomElements();
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      element: '#storybook-root',
      config: {
        rules: [
          // VA Design System web components may have known accessibility patterns
          // that differ from standard HTML
        ],
      },
    },
  },
  decorators: [
    Story => (
      <div className="vads-u-padding--3">
        <Story />
      </div>
    ),
  ],
};

export default preview;
