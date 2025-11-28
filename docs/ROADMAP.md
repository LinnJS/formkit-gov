# Development Roadmap

## Current Status

**Version**: 0.0.0 (Pre-release) **Phase**: Foundation

## Release Timeline

### Phase 1: Foundation (Current)

**Target**: v0.1.0 **Status**: In Progress

#### Completed

- [x] Monorepo setup (Turborepo + pnpm)
- [x] Shared configurations (TypeScript, ESLint, Prettier)
- [x] CI/CD pipelines (GitHub Actions)
- [x] Open source files (LICENSE, CONTRIBUTING, etc.)
- [x] Core package scaffolding
- [x] Zod schema factories (SSN, phone, address, date, etc.)
- [x] Validation patterns and utilities

#### In Progress

- [ ] @formkit-gov/react Form context components
- [ ] @formkit-gov/react atomic components (TextInputField, etc.)
- [ ] Storybook setup
- [ ] Initial documentation site

#### Remaining

- [ ] @formkit-gov/react review components
- [ ] @formkit-gov/react molecular components
- [ ] Unit tests for all components
- [ ] Accessibility tests

### Phase 2: Core Components (v0.2.0)

**Target**: v0.2.0 **Status**: Planned

#### Goals

- Complete all 19 atomic form components
- Complete review component variants
- Full Storybook documentation
- 80%+ test coverage
- Accessibility audit pass

#### Tasks

- [ ] TextInputField component
- [ ] TextareaField component
- [ ] SelectField component
- [ ] ComboBoxField component
- [ ] CheckboxField component
- [ ] CheckboxGroupField component
- [ ] RadioField component
- [ ] DateField component
- [ ] MemorableDateField component
- [ ] PhoneField component
- [ ] SSNField component
- [ ] FileUploadField component
- [ ] CurrencyField component
- [ ] NumberField component
- [ ] SignatureField component
- [ ] PrivacyAgreementField component
- [ ] ReviewField component
- [ ] ReviewAddressField component
- [ ] ReviewDateField component
- [ ] ReviewFullNameField component
- [ ] FullNameField (molecular)
- [ ] AddressField (molecular)
- [ ] NavigationButtons component

### Phase 3: State Management (v0.3.0)

**Target**: v0.3.0 **Status**: Planned

#### Goals

- Pluggable state management
- Persistence adapters
- Backend sync capability
- Save-in-progress functionality

#### Tasks

- [ ] Core store factory
- [ ] sessionStorage adapter
- [ ] localStorage adapter
- [ ] Memory adapter
- [ ] Zustand adapter
- [ ] Redux adapter
- [ ] TanStack Query adapter
- [ ] Backend sync adapter
- [ ] useFormPersistence hook
- [ ] useSaveInProgress hook
- [ ] useAutoSave hook
- [ ] Conflict resolution strategies
- [ ] Offline support utilities

### Phase 4: Wizard & Templates (v0.4.0)

**Target**: v0.4.0 **Status**: Planned

#### Goals

- Multi-step form wizard
- VA form template pages
- Review page generation
- Confirmation handling

#### Tasks

- [ ] FormWizard component
- [ ] WizardStep component
- [ ] WizardProgress component
- [ ] WizardNavigation component
- [ ] LandingPage template
- [ ] IntroductionPage template
- [ ] FormStepPage template
- [ ] ReviewPage component
- [ ] ConfirmationPage component
- [ ] useWizard hook
- [ ] useWizardStep hook
- [ ] useWizardNavigation hook
- [ ] Step validation
- [ ] Chapter organization

### Phase 5: OpenAPI Integration (v0.5.0)

**Target**: v0.5.0 **Status**: Planned

#### Goals

- OpenAPI to Zod schema generation
- TypeScript type generation
- CLI tool
- Runtime validation

#### Tasks

- [ ] OpenAPI 3.0 parser
- [ ] OpenAPI 3.1 parser
- [ ] Zod schema generator
- [ ] TypeScript type generator
- [ ] CLI implementation
- [ ] Watch mode
- [ ] Schema validation command
- [ ] Custom schema extensions
- [ ] Reference ($ref) resolution
- [ ] Circular reference handling

### Phase 6: Documentation & Polish (v1.0.0)

**Target**: v1.0.0 **Status**: Planned

#### Goals

- Production-ready release
- Complete documentation
- Example applications
- Visual regression testing

#### Tasks

- [ ] Nextra documentation site
- [ ] Getting started guide
- [ ] Component API docs
- [ ] Pattern guides
- [ ] Example: Next.js TypeScript
- [ ] Example: Next.js JavaScript
- [ ] Example: Vite TypeScript
- [ ] Example: Multi-step wizard
- [ ] Chromatic visual regression
- [ ] Performance benchmarks
- [ ] Security audit
- [ ] Accessibility audit
- [ ] npm publishing setup

## Future Considerations (Post v1.0)

### Potential Features

1. **Form Analytics Integration**
   - Optional analytics adapter
   - Field interaction tracking
   - Completion funnel analysis

2. **AI-Assisted Forms**
   - Auto-fill suggestions
   - Error correction hints
   - Form completion assistance

3. **Advanced Validation**
   - Cross-field validation helpers
   - Async validation patterns
   - Server-side validation sync

4. **Internationalization**
   - Multi-language error messages
   - RTL support
   - Date/number formatting

5. **More State Adapters**
   - Jotai adapter
   - Recoil adapter
   - MobX adapter

### Community Requests

Track feature requests at: <https://github.com/LinnJS/formkit-gov/discussions/categories/ideas>

## Version Policy

### Semantic Versioning

- **Major (X.0.0)**: Breaking changes
- **Minor (0.X.0)**: New features, no breaking changes
- **Patch (0.0.X)**: Bug fixes only

### Breaking Changes

Before v1.0.0:

- Breaking changes may occur in minor versions
- Documented in CHANGELOG.md
- Migration guides provided

After v1.0.0:

- Breaking changes only in major versions
- Deprecation warnings before removal
- Long deprecation cycles

### Support Policy

| Version | Status      | Support      |
| ------- | ----------- | ------------ |
| 1.x     | Current     | Full support |
| 0.x     | Pre-release | Best effort  |

## Contributing to Roadmap

### Proposing Features

1. Check existing issues and discussions
2. Open a discussion in Ideas category
3. Provide use case and examples
4. Participate in community feedback

### Prioritization Criteria

1. **Impact**: How many users benefit?
2. **Effort**: How complex to implement?
3. **Alignment**: Does it fit project scope?
4. **Community**: Is there demand?

### Roadmap Updates

- Reviewed monthly
- Updated after each release
- Community input considered
- Transparent decision-making
