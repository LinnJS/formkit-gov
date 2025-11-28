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
    '@testing-library/react',
    '@testing-library/user-event',
    '@testing-library/jest-dom',
    'vitest',
    'axe-core',
  ],
});
