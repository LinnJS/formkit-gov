import nextra from 'nextra';

const withNextra = nextra({
  defaultShowCopyCode: true,
  search: false, // Disabled until pagefind is properly configured
});

export default withNextra({
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
});
