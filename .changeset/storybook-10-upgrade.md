---
'@formkit-gov/react': patch
---

Upgrade to Storybook 10 and React 19:

**Storybook 10 Migration:**

- Update addon imports to use `getAbsolutePath()` helper for ESM resolution
- Change a11y configuration from `element` to `context` parameter
- Update type imports from `@storybook/react` to `@storybook/react-vite`
- Migrate `Meta` import to `storybook/blocks` canonical path
- Add `eslint-plugin-storybook` for Storybook-specific linting rules

**React 19 Compatibility:**

- Update boolean attribute tests: React 19 omits false boolean attributes instead of rendering
  `attribute="false"`
- Fix `FormControl` props spreading order to ensure ARIA attributes take precedence
- Update E2E tests to query shadow DOM content instead of component attributes

**Other Dependency Updates:**

- Next.js 15 → 16 (with JSX transform configuration)
- Vite 6 → 7
- @types/node 22 → 24
- GitHub Actions: setup-node v4 → v6, upload-artifact v4 → v6
