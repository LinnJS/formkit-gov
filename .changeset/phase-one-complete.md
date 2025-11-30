---
'@formkit-gov/react': minor
'@formkit-gov/storybook': minor
---

Phase One: React components, Storybook, and comprehensive testing

## @formkit-gov/react

### Form Components (shadcn/ui pattern)

- Form, FormField, FormItem, FormControl, FormLabel, FormDescription, FormMessage
- Full React Hook Form integration with Zod v4 resolver support

### Field Components (15 total)

- TextInputField, TextareaField, NumberField, CurrencyField
- PhoneField, SSNField, DateField, MemorableDateField
- SelectField, ComboBoxField, CheckboxField, CheckboxGroupField
- RadioField, FileUploadField, PrivacyAgreementField

### Molecular Components

- FullNameField (first, middle, last, suffix composition)
- AddressField (street, city, state, zip composition)

### Review Components

- ReviewSection, ReviewItem, ReviewList

### Accessibility

- Focus first invalid field on submit via shadow DOM focus delegation
- All field components support React Hook Form's `shouldFocusError`
- New `onValidationError` callback prop on Form component

### Testing

- 87% overall test coverage
- All source files meet 80% per-file coverage threshold
- Comprehensive unit tests for all components

## @formkit-gov/storybook

### Configuration

- VA Design System web components with defineCustomElements
- VA CSS Library for typography and utility classes
- Google Fonts for Source Sans Pro
- VA icons and fonts via staticDirs

### Stories

- Complete stories for all field components
- Form integration examples with validation
- Molecule component stories (AddressField, FullNameField)
- Accessibility testing with axe-core addon

### E2E Testing

- Playwright integration for component testing
- Field interaction tests (text input, select, keyboard navigation)
- Form integration tests with validation flows
