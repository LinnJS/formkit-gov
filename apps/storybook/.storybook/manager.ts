import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

const theme = create({
  base: 'light',
  brandTitle: 'FormKit Gov',
  brandUrl: 'https://github.com/linnjs/formkit-gov',
  brandImage: '/formkit-gov.png',
  brandTarget: '_blank',

  // Colors
  colorPrimary: '#112e51',
  colorSecondary: '#0071bc',

  // UI
  appBg: '#f1f1f1',
  appContentBg: '#ffffff',
  appBorderColor: '#d6d7d9',
  appBorderRadius: 4,

  // Text colors
  textColor: '#212121',
  textInverseColor: '#ffffff',

  // Toolbar
  barTextColor: '#5b616b',
  barSelectedColor: '#0071bc',
  barBg: '#ffffff',
});

addons.setConfig({
  theme,
});
