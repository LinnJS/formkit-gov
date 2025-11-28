import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'components/index': 'src/components/index.ts',
  },
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
    '@radix-ui/react-slot',
  ],
  banner: {
    js: '"use client";',
  },
});
