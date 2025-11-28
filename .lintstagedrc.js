export default {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,yml,yaml}': ['prettier --write'],
  '*.{md,mdx}': ['markdownlint-cli2 --fix', 'prettier --write'],
};
