---
'@formkit-gov/store': patch
'@formkit-gov/wizard': patch
'@formkit-gov/validators': patch
'@formkit-gov/test-utils': patch
'@formkit-gov/openapi': patch
---

Add stub packages and example apps for npm and Vercel hosting setup

## Package Stubs

All future packages now export VERSION and COMING_SOON constants as placeholders:

- `@formkit-gov/store` - State management adapters (Phase 3)
- `@formkit-gov/wizard` - Multi-step wizard components (Phase 4)
- `@formkit-gov/validators` - Extended validation rules (Phase 2)
- `@formkit-gov/test-utils` - Testing utilities (Phase 2)
- `@formkit-gov/openapi` - OpenAPI to Zod generation with CLI stub (Phase 5)

## Example Apps

New Vercel-deployable applications with custom domains:

- `@formkit-gov/landing` - Landing page (formkit-gov.org)
- `@formkit-gov/docs` - Documentation placeholder (docs.formkit-gov.org)
- `@formkit-gov/demo-nextjs` - Next.js 15 example (nextjs-demo.formkit-gov.org)
- `@formkit-gov/demo-vite` - Vite + React example (vite-demo.formkit-gov.org)
