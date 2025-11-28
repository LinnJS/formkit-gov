# Architecture Decisions

This document records significant architectural decisions made in the FormKit Gov project.

## ADR-001: Monorepo Structure

### Context

Need to manage multiple related packages with shared tooling.

### Decision

Use Turborepo with pnpm workspaces.

### Rationale

- Turborepo provides excellent caching and parallel execution
- pnpm is faster and more disk-efficient than npm/yarn
- Monorepo enables atomic changes across packages
- Shared tooling reduces maintenance burden

### Consequences

- All packages versioned together (linked changesets)
- Single CI/CD pipeline for all packages
- Contributors need pnpm installed

## ADR-002: Form Library Choice

### Context

Need a form state management library for React.

### Decision

Use React Hook Form with Zod resolver.

### Rationale

- React Hook Form is the most popular React form library
- Excellent performance (uncontrolled components)
- First-class TypeScript support
- Zod integration via @hookform/resolvers
- Large ecosystem and community

### Alternatives Considered

- **Formik**: Slower, larger bundle, less maintained
- **Final Form**: Less TypeScript support
- **Custom solution**: Too much effort, reinventing wheel

### Consequences

- Users must install react-hook-form as peer dependency
- Component API follows RHF patterns
- Limited to React (no other frameworks)

## ADR-003: Validation Library Choice

### Context

Need a schema validation library with TypeScript inference.

### Decision

Use Zod for all schema definitions.

### Rationale

- TypeScript-first with excellent type inference
- Runtime validation matches compile-time types
- Composable schema builders
- Active development and community
- Works well with React Hook Form

### Alternatives Considered

- **Yup**: Less TypeScript support, older API
- **io-ts**: Steeper learning curve
- **Superstruct**: Smaller community

### Consequences

- Users must install zod as peer dependency
- Schema factories return Zod types
- Tight coupling to Zod API

## ADR-004: Component Library Approach

### Context

Need to provide form components that use VA Design System.

### Decision

Wrap @department-of-veterans-affairs/component-library web components.

### Rationale

- VA DS provides accessible, tested components
- Web components work with any framework
- Consistent with VA.gov applications
- No need to reimplement accessibility

### Alternatives Considered

- **Build from scratch**: Too much effort, accessibility risk
- **Use Radix/Headless UI**: Not VA DS compliant
- **Fork VA DS**: Maintenance burden

### Consequences

- Dependency on VA component library
- Must handle web component integration in React
- Limited to VA DS component set

## ADR-005: State Management Architecture

### Context

Need pluggable state management for form persistence.

### Decision

Create adapter pattern supporting multiple state libraries.

### Rationale

- Different teams use different state libraries
- Avoid forcing specific state management choice
- Enable gradual migration paths
- Support various persistence strategies

### Adapters Supported

1. sessionStorage (default, zero dependencies)
2. localStorage
3. Zustand
4. Redux Toolkit
5. TanStack Query
6. Custom adapters

### Consequences

- More complex internal architecture
- Users choose their adapter
- Testing requires multiple adapter tests

## ADR-006: Component API Design

### Context

Need consistent, composable component API.

### Decision

Follow shadcn/ui Form pattern (composable components).

### Rationale

- Proven pattern from popular library
- Maximum flexibility for customization
- Clear separation of concerns
- Familiar to many React developers

### Pattern

```tsx
<Form>
  <FormField
    name="field"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Label</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</Form>
```

### Consequences

- More verbose than magic components
- Better for complex customization
- Learning curve for new pattern

## ADR-007: Build Tooling

### Context

Need to build packages for npm publishing.

### Decision

Use tsup for all package builds.

### Rationale

- Zero-config for most cases
- Outputs ESM and CJS
- Generates TypeScript declarations
- Tree-shakeable output
- Fast builds with esbuild

### Alternatives Considered

- **tsc only**: No bundling, larger output
- **Rollup**: More configuration needed
- **Webpack**: Overkill for libraries
- **Vite library mode**: Less mature

### Consequences

- Dual package output (ESM + CJS)
- Source maps included
- Consistent build across packages

## ADR-008: Testing Strategy

### Context

Need comprehensive testing approach.

### Decision

Multi-layer testing with Vitest, RTL, Playwright.

### Layers

1. **Unit tests (Vitest)**: Schema validation, utilities
2. **Integration tests (RTL)**: Component behavior
3. **E2E tests (Playwright)**: User flows
4. **Accessibility tests (axe-core)**: A11y compliance
5. **Visual regression (Chromatic)**: UI consistency

### Rationale

- Vitest is faster than Jest
- RTL encourages accessible queries
- Playwright for real browser testing
- axe-core is industry standard
- Chromatic integrates with Storybook

### Consequences

- Multiple test frameworks to maintain
- CI runs all test types
- High confidence in releases

## ADR-009: Documentation Approach

### Context

Need comprehensive documentation.

### Decision

Nextra for docs site + Storybook for components.

### Rationale

- Nextra: MDX-based, Next.js powered
- Storybook: Interactive component docs
- Separation of guides vs components
- Both deploy to Vercel

### Alternatives Considered

- **Docusaurus**: More complex setup
- **Storybook only**: Poor for guides
- **VitePress**: Less React integration

### Consequences

- Two documentation systems to maintain
- Clear separation of concerns
- More comprehensive coverage

## ADR-010: Release Strategy

### Context

Need automated, reliable releases.

### Decision

Use Changesets with GitHub Actions.

### Rationale

- Changesets manages multi-package versioning
- Generates changelogs automatically
- Creates release PRs
- Publishes to npm on merge

### Workflow

1. Contributors add changesets with PRs
2. Release PR accumulates changesets
3. Merge release PR triggers publish
4. GitHub release created automatically

### Consequences

- Requires changeset for user-facing changes
- Automated, less manual work
- Clear changelog history
