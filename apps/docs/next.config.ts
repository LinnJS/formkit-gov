import nextra from 'nextra';

const withNextra = nextra({
  defaultShowCopyCode: true,
  search: {
    codeblocks: false, // Don't index code blocks for cleaner results
  },
});

export default withNextra({
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
});
