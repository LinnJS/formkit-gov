import React from 'react';

import type { Preview } from '@storybook/react';

// Import VA Design System styles
import '@department-of-veterans-affairs/component-library/dist/main.css';

// Define custom components for VA Design System web components
if (typeof window !== 'undefined') {
  // Dynamically import VA web components
  import('@department-of-veterans-affairs/component-library');
}

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
