import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  treeshake: true,
  clean: true,
  sourcemap: true,
  external: [
    'react',
    'react-dom',
    'zod',
    'react-hook-form',
    '@hookform/resolvers',
    '@department-of-veterans-affairs/component-library',
    '@formkit-gov/core',
    '@formkit-gov/react',
    '@formkit-gov/store',
  ],
  banner: {
    js: '"use client";',
  },
});
