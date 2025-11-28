---
'@formkit-gov/core': patch
'@formkit-gov/react': patch
---

Update dependencies to latest reliable versions:

- **Zod**: 3.23.8 → 4.1.13 (major version upgrade with Zod 4 compatibility fixes)
- **Vitest**: 2.1.8 → 4.0.14 (major version upgrade)
- **Prettier**: 3.4.2 → 3.7.2 (patch update)
- **react-hook-form**: 7.54.1 → 7.67.0 (minor update)
- **React**: 19.2.0 → 18.3.1 (downgrade to latest stable React 18)

Code changes for Zod 4 compatibility:

- Replace deprecated `z.ZodTypeAny` with `z.ZodType`
- Replace deprecated `.merge()` with spread syntax in `combineSchemas`
- Filter symbols from validation error paths for backward compatibility
- Simplify date schema type constraints

Test updates for React 18:

- Update boolean attribute tests to expect `attribute="false"` behavior
