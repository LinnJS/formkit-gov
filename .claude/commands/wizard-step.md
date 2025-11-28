# Create Wizard Step

Create a new wizard step or template for the @formkit-gov/wizard package.

## Instructions

You are creating a wizard step following the multi-step form patterns.

### Wizard Architecture

````text
FormWizard
├── WizardProgress (step indicators)
├── WizardStep (content wrapper)
│   └── [Step Content]
└── WizardNavigation (prev/next buttons)
```text

### Step Types

1. **Introduction Step**
   - Welcome message
   - Form overview
   - Requirements list
   - Start button

2. **Form Step**
   - Form fields
   - Validation
   - Navigation

3. **Review Step**
   - Summary of all data
   - Edit links
   - Final validation

4. **Confirmation Step**
   - Success message
   - Reference number
   - Next steps

### Step Structure

```typescript
import type { WizardStepConfig } from '@formkit-gov/wizard';

export const stepConfig: WizardStepConfig = {
  id: 'step-id',
  title: 'Step Title',
  path: '/form/step',

  // Optional
  subtitle: 'Additional context',
  chapter: 'Chapter Name',
  required: true,
  hideInProgress: false,

  // Validation schema for this step
  schema: z.object({
    field1: z.string(),
    field2: z.string(),
  }),

  // Fields included in this step
  fields: ['field1', 'field2'],
};
```text

### Step Component

```typescript
import { useWizardStep } from '@formkit-gov/wizard';
import { TextInputField } from '@formkit-gov/react';

export function PersonalInfoStep() {
  const { form, goNext, goPrev } = useWizardStep();

  return (
    <div>
      <h2>Personal Information</h2>

      <FormField
        control={form.control}
        name="firstName"
        render={({ field, fieldState }) => (
          <TextInputField
            {...field}
            label="First name"
            error={fieldState.error?.message}
            required
          />
        )}
      />

      <FormField
        control={form.control}
        name="lastName"
        render={({ field, fieldState }) => (
          <TextInputField
            {...field}
            label="Last name"
            error={fieldState.error?.message}
            required
          />
        )}
      />
    </div>
  );
}
```text

### Wizard Configuration

```typescript
import { createWizard } from '@formkit-gov/wizard';

const wizard = createWizard({
  id: 'benefit-application',
  title: 'Apply for Benefits',

  chapters: [
    {
      id: 'personal',
      title: 'Personal Information',
      steps: [personalInfoStep, contactInfoStep],
    },
    {
      id: 'documents',
      title: 'Documents',
      steps: [documentsStep],
    },
  ],

  review: {
    enabled: true,
    editable: true,
  },

  persistence: {
    adapter: sessionStorageAdapter,
    key: 'benefit-application',
  },
});
```text

### Step Templates

#### Introduction Template

```typescript
export function IntroductionStep() {
  const { goNext } = useWizardStep();

  return (
    <div>
      <h1>Apply for VA Benefits</h1>
      <p>Use this form to apply for...</p>

      <h2>What you'll need</h2>
      <ul>
        <li>Social Security number</li>
        <li>Military service information</li>
      </ul>

      <va-button text="Start Application" onClick={goNext} />
    </div>
  );
}
```text

#### Review Template

```typescript
export function ReviewStep() {
  const { formData, goToStep } = useWizardStep();

  return (
    <div>
      <h2>Review your information</h2>

      <ReviewSection
        title="Personal Information"
        onEdit={() => goToStep('personal-info')}
      >
        <ReviewField label="Name" value={formData.fullName} />
        <ReviewField label="SSN" value={maskSSN(formData.ssn)} />
      </ReviewSection>

      <ReviewSection
        title="Contact Information"
        onEdit={() => goToStep('contact-info')}
      >
        <ReviewAddress address={formData.address} />
      </ReviewSection>
    </div>
  );
}
```text

### Hooks Available

```typescript
// Main step hook
const {
  form,           // React Hook Form instance
  formData,       // Current form data
  goNext,         // Navigate forward
  goPrev,         // Navigate back
  goToStep,       // Navigate to specific step
  isFirstStep,    // Boolean
  isLastStep,     // Boolean
  currentStep,    // Current step config
  progress,       // { current, total, percentage }
} = useWizardStep();

// Wizard context hook
const {
  steps,          // All steps
  currentIndex,   // Current step index
  isComplete,     // All steps complete
  reset,          // Reset wizard
} = useWizard();
```text

## Arguments

$ARGUMENTS - Step type and purpose (e.g., "contact information step with address and phone fields")
````
