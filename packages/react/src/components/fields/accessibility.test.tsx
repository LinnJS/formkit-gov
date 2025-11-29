/**
 * Accessibility tests for field components using axe-core
 *
 * Tests WCAG 2.1 AA compliance for all field components in various states.
 * Note: VA Design System web components don't render their internal structure
 * in test environments (happy-dom), so we test the component wrappers and
 * verify they pass correct props to maintain accessibility.
 */

import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { axe } from '../../test-setup';

import { CheckboxField } from './checkbox-field';
import { CheckboxGroupField } from './checkbox-group-field';
import { ComboBoxField } from './combo-box-field';
import { CurrencyField } from './currency-field';
import { DateField } from './date-field';
import { FileUploadField } from './file-upload-field';
import { MemorableDateField } from './memorable-date-field';
import { NumberField } from './number-field';
import { PhoneField } from './phone-field';
import { PrivacyAgreementField } from './privacy-agreement-field';
import { RadioField } from './radio-field';
import { SelectField } from './select-field';
import { SSNField } from './ssn-field';
import { TextInputField } from './text-input-field';
import { TextareaField } from './textarea-field';

describe('Field Components Accessibility', () => {
  describe('TextInputField', () => {
    it('should have no accessibility violations in default state', async () => {
      const { container } = render(<TextInputField label="First name" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with error', async () => {
      const { container } = render(<TextInputField error="Email is required" label="Email" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when required', async () => {
      const { container } = render(<TextInputField required label="Required field" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when disabled', async () => {
      const { container } = render(<TextInputField disabled label="Disabled field" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with hint', async () => {
      const { container } = render(
        <TextInputField hint="Must be at least 8 characters" label="Password" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with value', async () => {
      const { container } = render(<TextInputField label="Name" value="John Doe" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('TextareaField', () => {
    it('should have no accessibility violations in default state', async () => {
      const { container } = render(<TextareaField label="Comments" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with error', async () => {
      const { container } = render(
        <TextareaField error="Description is required" label="Description" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when required', async () => {
      const { container } = render(<TextareaField required label="Required comments" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when disabled', async () => {
      const { container } = render(<TextareaField disabled label="Disabled textarea" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('CheckboxField', () => {
    it('should have no accessibility violations in default state', async () => {
      const { container } = render(<CheckboxField label="I agree to terms" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when checked', async () => {
      const { container } = render(<CheckboxField checked label="I agree" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with error', async () => {
      const { container } = render(
        <CheckboxField error="You must accept the terms" label="Accept terms" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when required', async () => {
      const { container } = render(<CheckboxField required label="Required checkbox" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('SelectField', () => {
    const options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ];

    it('should have no accessibility violations in default state', async () => {
      const { container } = render(<SelectField label="Select an option" options={options} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with error', async () => {
      const { container } = render(
        <SelectField error="State is required" label="State" options={options} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when required', async () => {
      const { container } = render(<SelectField required label="Country" options={options} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when disabled', async () => {
      const { container } = render(
        <SelectField disabled label="Disabled select" options={options} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with value', async () => {
      const { container } = render(<SelectField label="State" options={options} value="2" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('NumberField', () => {
    it('should have no accessibility violations in default state', async () => {
      const { container } = render(<NumberField label="Age" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with error', async () => {
      const { container } = render(
        <NumberField error="Quantity must be positive" label="Quantity" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when required', async () => {
      const { container } = render(<NumberField required label="Required number" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when disabled', async () => {
      const { container } = render(<NumberField disabled label="Disabled number" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('PhoneField', () => {
    it('should have no accessibility violations in default state', async () => {
      const { container } = render(<PhoneField label="Phone number" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with error', async () => {
      const { container } = render(
        <PhoneField error="Invalid phone format" label="Contact number" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when required', async () => {
      const { container } = render(<PhoneField required label="Required phone" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when disabled', async () => {
      const { container } = render(<PhoneField disabled label="Disabled phone" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('SSNField', () => {
    it('should have no accessibility violations in default state', async () => {
      const { container } = render(<SSNField label="Social Security Number" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with error', async () => {
      const { container } = render(<SSNField error="Invalid SSN format" label="SSN" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when required', async () => {
      const { container } = render(<SSNField required label="Required SSN" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when disabled', async () => {
      const { container } = render(<SSNField disabled label="Disabled SSN" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('CurrencyField', () => {
    it('should have no accessibility violations in default state', async () => {
      const { container } = render(<CurrencyField label="Amount" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with error', async () => {
      const { container } = render(
        <CurrencyField error="Invalid currency format" label="Salary" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when required', async () => {
      const { container } = render(<CurrencyField required label="Required amount" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when disabled', async () => {
      const { container } = render(<CurrencyField disabled label="Disabled currency" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('DateField', () => {
    it('should have no accessibility violations in default state', async () => {
      const { container } = render(<DateField label="Date of birth" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with error', async () => {
      const { container } = render(<DateField error="Invalid date" label="Start date" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when required', async () => {
      const { container } = render(<DateField required label="Required date" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when disabled', async () => {
      const { container } = render(<DateField disabled label="Disabled date" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('MemorableDateField', () => {
    it('should have no accessibility violations in default state', async () => {
      const { container } = render(<MemorableDateField label="Memorable date" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with error', async () => {
      const { container } = render(<MemorableDateField error="Invalid date" label="Date" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when required', async () => {
      const { container } = render(<MemorableDateField required label="Required date" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('RadioField', () => {
    const options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ];

    it('should have no accessibility violations in default state', async () => {
      const { container } = render(<RadioField label="Choose one" options={options} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with error', async () => {
      const { container } = render(
        <RadioField error="Selection required" label="Select option" options={options} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when required', async () => {
      const { container } = render(
        <RadioField required label="Required choice" options={options} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with value', async () => {
      const { container } = render(<RadioField label="Choose one" options={options} value="2" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('CheckboxGroupField', () => {
    const options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ];

    it('should have no accessibility violations in default state', async () => {
      const { container } = render(
        <CheckboxGroupField label="Select all that apply" options={options} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with error', async () => {
      const { container } = render(
        <CheckboxGroupField
          error="At least one option required"
          label="Choose options"
          options={options}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when required', async () => {
      const { container } = render(
        <CheckboxGroupField required label="Required choices" options={options} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ComboBoxField', () => {
    const options = [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Cherry', value: 'cherry' },
    ];

    it('should have no accessibility violations in default state', async () => {
      const { container } = render(<ComboBoxField label="Search fruits" options={options} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with error', async () => {
      const { container } = render(
        <ComboBoxField error="Fruit required" label="Select fruit" options={options} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when required', async () => {
      const { container } = render(
        <ComboBoxField required label="Required combo" options={options} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('FileUploadField', () => {
    it('should have no accessibility violations in default state', async () => {
      const { container } = render(<FileUploadField label="Upload document" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with error', async () => {
      const { container } = render(<FileUploadField error="File required" label="Upload file" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when required', async () => {
      const { container } = render(<FileUploadField required label="Required upload" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with accepted types', async () => {
      const { container } = render(<FileUploadField accept=".pdf" label="Upload PDF" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('PrivacyAgreementField', () => {
    it('should have no accessibility violations in default state', async () => {
      const { container } = render(
        <PrivacyAgreementField
          href="https://example.com/privacy"
          label="I agree to the privacy policy"
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when checked', async () => {
      const { container } = render(
        <PrivacyAgreementField
          checked
          href="https://example.com/privacy"
          label="Accept privacy terms"
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with error', async () => {
      const { container } = render(
        <PrivacyAgreementField
          error="You must accept the privacy policy"
          href="https://example.com/privacy"
          label="Privacy agreement"
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
