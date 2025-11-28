# Project Scope

## Overview

FormKit Gov is a production-grade form system designed for building accessible, government-compliant
forms using modern React patterns.

## Goals

### Primary Goals

1. **Reduce Form Development Time**
   - Pre-built components that work out of the box
   - Sensible defaults with full customization
   - Copy-paste examples for common patterns

2. **Ensure Accessibility Compliance**
   - WCAG 2.1 AA compliance by default
   - Screen reader tested components
   - Keyboard navigation support
   - Proper ARIA attributes

3. **Enable Schema Federation**
   - Generate frontend schemas from OpenAPI specs
   - Type-safe forms with Zod validation
   - Runtime validation matching backend contracts

4. **Support Complex Form Flows**
   - Multi-step wizard forms
   - Save-in-progress functionality
   - Review and confirmation pages
   - Conditional field logic

5. **Framework Flexibility**
   - Works with Next.js (App Router & Pages)
   - Works with Vite/CRA (client-side)
   - Works with Remix
   - SSR and CSR support

### Secondary Goals

1. **Developer Experience**
   - Comprehensive TypeScript support
   - Excellent documentation
   - Storybook for component exploration
   - Testing utilities included

2. **Production Readiness**
   - Battle-tested in real applications
   - Performance optimized
   - Bundle size conscious
   - Security reviewed

3. **Open Source Excellence**
   - Clear contribution guidelines
   - Responsive to issues
   - Regular releases
   - Transparent roadmap

## Non-Goals

The following are explicitly **out of scope**:

1. **Custom Design System**
   - We wrap VA Design System components, not replace them
   - No custom styling or theming (use VA DS tokens)
   - No competing component library

2. **Backend Integration**
   - We provide frontend validation only
   - No form submission handling
   - No API client generation
   - No database integration

3. **Non-React Frameworks**
   - No Vue, Angular, or Svelte support
   - No vanilla JS support
   - React 17+ only

4. **Mobile Native**
   - Web only (responsive)
   - No React Native support
   - No native mobile components

5. **Form Builder UI**
   - No drag-and-drop form builder
   - No WYSIWYG editor
   - Code-first approach only

6. **Analytics/Tracking**
   - No built-in analytics
   - No form completion tracking
   - Users implement their own

## Target Audience

### Primary Users

1. **VA Contractors**
   - Building VA.gov applications
   - Need VA Design System compliance
   - Familiar with React ecosystem

2. **VA Internal Teams**
   - Building internal tools
   - Need consistent form patterns
   - Want to reduce development time

### Secondary Users

1. **Government Contractors (non-VA)**
   - Building other federal/state applications
   - Want accessible form patterns
   - May use USWDS

2. **Open Source Community**
   - Learning accessible form development
   - Contributing improvements
   - Using as reference implementation

## Success Metrics

### Adoption Metrics

- npm downloads per month
- GitHub stars
- Number of production deployments
- Community contributions

### Quality Metrics

- Test coverage > 80%
- Zero accessibility violations
- Bundle size < 50KB (core + react)
- Build time < 30 seconds

### Developer Experience Metrics

- Time to first form < 15 minutes
- Documentation satisfaction > 4/5
- Issue response time < 48 hours

## Package Scope

### @formkit-gov/core

**In Scope:**

- Zod schema factories
- Regex validation patterns
- Validation utility functions
- Type definitions
- Error message formatting

**Out of Scope:**

- React components
- State management
- UI rendering

### @formkit-gov/react

**In Scope:**

- Form context components (Form, FormField, etc.)
- VA component wrappers (TextInputField, SelectField, etc.)
- Review components for displaying submitted data
- Form hooks (useFieldValidation, useFormSection)
- Accessibility features

**Out of Scope:**

- Multi-step wizard logic
- State persistence
- API integration

### @formkit-gov/store

**In Scope:**

- Storage adapters (sessionStorage, localStorage)
- State library adapters (Zustand, Redux, TanStack Query)
- Backend sync utilities
- Auto-save functionality
- Form state persistence

**Out of Scope:**

- Global app state management
- API client implementation
- Authentication

### @formkit-gov/wizard

**In Scope:**

- Multi-step form orchestration
- Progress tracking
- Step navigation
- Review page generation
- Confirmation page
- Save-in-progress integration

**Out of Scope:**

- Routing (uses app's router)
- URL management
- Authentication checks

### @formkit-gov/openapi

**In Scope:**

- OpenAPI 3.x parsing
- Zod schema generation
- TypeScript type generation
- CLI tool
- Watch mode for development
- Schema validation

**Out of Scope:**

- API client generation
- Mock server generation
- API documentation

### @formkit-gov/validators

**In Scope:**

- Government-specific validators
- Extended Zod refinements
- Conditional validation helpers
- Date validators
- File validators

**Out of Scope:**

- Async validation (API calls)
- Database lookups

### @formkit-gov/test-utils

**In Scope:**

- Test render helpers
- Form interaction utilities
- Accessibility testing helpers
- Mock utilities
- Test factories

**Out of Scope:**

- E2E testing framework
- Visual regression tools
- CI/CD integration

## Version Support

### React

- React 18.x: Full support
- React 17.x: Supported with caveats (no useId)
- React 16.x: Not supported

### Node.js

- Node 20.x: Full support (recommended)
- Node 18.x: Supported
- Node 16.x: Not supported

### TypeScript

- TypeScript 5.x: Full support
- TypeScript 4.x: Not supported

### Browsers

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- IE 11: Not supported
