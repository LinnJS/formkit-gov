/**
 * Tests for FullNameField component
 */

import { render, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { FullNameField } from './full-name-field';

describe('FullNameField', () => {
  it('renders fieldset with legend', () => {
    const { container } = render(
      <FullNameField firstName={{ label: 'First name' }} lastName={{ label: 'Last name' }} />
    );

    const fieldset = container.querySelector('fieldset');
    expect(fieldset).toBeInTheDocument();

    const legend = container.querySelector('legend');
    expect(legend).toBeInTheDocument();
    expect(legend?.textContent).toBe('Name');
  });

  it('renders custom legend', () => {
    const { container } = render(
      <FullNameField
        firstName={{ label: 'First name' }}
        lastName={{ label: 'Last name' }}
        legend="Your full name"
      />
    );

    const legend = container.querySelector('legend');
    expect(legend?.textContent).toBe('Your full name');
  });

  it('renders first name field', () => {
    const { container } = render(
      <FullNameField
        firstName={{ label: 'First name', required: true }}
        lastName={{ label: 'Last name' }}
      />
    );

    const firstNameInput = container.querySelector('va-text-input[name="firstName"]');
    expect(firstNameInput).toBeInTheDocument();
    expect(firstNameInput).toHaveAttribute('label', 'First name');
    expect(firstNameInput).toHaveAttribute('required');
  });

  it('renders last name field', () => {
    const { container } = render(
      <FullNameField
        firstName={{ label: 'First name' }}
        lastName={{ label: 'Last name', required: true }}
      />
    );

    const lastNameInput = container.querySelector('va-text-input[name="lastName"]');
    expect(lastNameInput).toBeInTheDocument();
    expect(lastNameInput).toHaveAttribute('label', 'Last name');
    expect(lastNameInput).toHaveAttribute('required');
  });

  it('uses default labels when not provided', () => {
    const { container } = render(<FullNameField firstName={{}} lastName={{}} />);

    const firstNameInput = container.querySelector('va-text-input[name="firstName"]');
    expect(firstNameInput).toHaveAttribute('label', 'First name');

    const lastNameInput = container.querySelector('va-text-input[name="lastName"]');
    expect(lastNameInput).toHaveAttribute('label', 'Last name');
  });

  it('does not render middle name by default', () => {
    const { container } = render(
      <FullNameField firstName={{ label: 'First name' }} lastName={{ label: 'Last name' }} />
    );

    const middleNameInput = container.querySelector('va-text-input[name="middleName"]');
    expect(middleNameInput).not.toBeInTheDocument();
  });

  it('renders middle name when show is true', () => {
    const { container } = render(
      <FullNameField
        firstName={{ label: 'First name' }}
        lastName={{ label: 'Last name' }}
        middleName={{ label: 'Middle name', show: true }}
      />
    );

    const middleNameInput = container.querySelector('va-text-input[name="middleName"]');
    expect(middleNameInput).toBeInTheDocument();
    expect(middleNameInput).toHaveAttribute('label', 'Middle name');
  });

  it('uses default middle name label when not provided', () => {
    const { container } = render(
      <FullNameField
        firstName={{ label: 'First name' }}
        lastName={{ label: 'Last name' }}
        middleName={{ show: true }}
      />
    );

    const middleNameInput = container.querySelector('va-text-input[name="middleName"]');
    expect(middleNameInput).toHaveAttribute('label', 'Middle name');
  });

  it('does not render suffix by default', () => {
    const { container } = render(
      <FullNameField firstName={{ label: 'First name' }} lastName={{ label: 'Last name' }} />
    );

    const suffixSelect = container.querySelector('va-select[name="suffix"]');
    expect(suffixSelect).not.toBeInTheDocument();
  });

  it('renders suffix when show is true', () => {
    const { container } = render(
      <FullNameField
        firstName={{ label: 'First name' }}
        lastName={{ label: 'Last name' }}
        suffix={{ label: 'Suffix', show: true }}
      />
    );

    const suffixSelect = container.querySelector('va-select[name="suffix"]');
    expect(suffixSelect).toBeInTheDocument();
    expect(suffixSelect).toHaveAttribute('label', 'Suffix');
  });

  it('uses default suffix label when not provided', () => {
    const { container } = render(
      <FullNameField
        firstName={{ label: 'First name' }}
        lastName={{ label: 'Last name' }}
        suffix={{ show: true }}
      />
    );

    const suffixSelect = container.querySelector('va-select[name="suffix"]');
    expect(suffixSelect).toHaveAttribute('label', 'Suffix');
  });

  it('renders suffix with custom options', () => {
    const customOptions = [
      { label: 'Junior', value: 'Jr.' },
      { label: 'Senior', value: 'Sr.' },
    ];

    const { container } = render(
      <FullNameField
        firstName={{ label: 'First name' }}
        lastName={{ label: 'Last name' }}
        suffix={{ show: true, options: customOptions }}
      />
    );

    const suffixSelect = container.querySelector('va-select[name="suffix"]');
    expect(suffixSelect).toBeInTheDocument();

    const options = suffixSelect?.querySelectorAll('option');
    expect(options).toHaveLength(2);
  });

  it('displays error messages', () => {
    const { container } = render(
      <FullNameField
        firstName={{ label: 'First name', error: 'First name is required' }}
        lastName={{ label: 'Last name', error: 'Last name is required' }}
      />
    );

    const firstNameInput = container.querySelector('va-text-input[name="firstName"]');
    expect(firstNameInput).toHaveAttribute('error', 'First name is required');

    const lastNameInput = container.querySelector('va-text-input[name="lastName"]');
    expect(lastNameInput).toHaveAttribute('error', 'Last name is required');
  });

  it('displays hint text', () => {
    const { container } = render(
      <FullNameField
        firstName={{ label: 'First name', hint: 'Enter your legal first name' }}
        lastName={{ label: 'Last name', hint: 'Enter your legal last name' }}
      />
    );

    const firstNameInput = container.querySelector('va-text-input[name="firstName"]');
    expect(firstNameInput).toHaveAttribute('hint', 'Enter your legal first name');

    const lastNameInput = container.querySelector('va-text-input[name="lastName"]');
    expect(lastNameInput).toHaveAttribute('hint', 'Enter your legal last name');
  });

  it('renders with values', () => {
    const values = {
      first: 'John',
      middle: 'William',
      last: 'Doe',
      suffix: 'Jr.',
    };

    const { container } = render(
      <FullNameField
        firstName={{ label: 'First name' }}
        lastName={{ label: 'Last name' }}
        middleName={{ label: 'Middle name', show: true }}
        suffix={{ label: 'Suffix', show: true }}
        values={values}
      />
    );

    const firstNameInput = container.querySelector('va-text-input[name="firstName"]');
    expect(firstNameInput).toHaveAttribute('value', 'John');

    const middleNameInput = container.querySelector('va-text-input[name="middleName"]');
    expect(middleNameInput).toHaveAttribute('value', 'William');

    const lastNameInput = container.querySelector('va-text-input[name="lastName"]');
    expect(lastNameInput).toHaveAttribute('value', 'Doe');

    const suffixSelect = container.querySelector('va-select[name="suffix"]');
    expect(suffixSelect).toHaveAttribute('value', 'Jr.');
  });

  describe('event handling', () => {
    it('calls onChange when first name changes via vaInput event', async () => {
      const handleChange = vi.fn();

      const { container } = render(
        <FullNameField
          firstName={{ label: 'First name' }}
          lastName={{ label: 'Last name' }}
          onChange={handleChange}
        />
      );

      const firstNameInput = container.querySelector('va-text-input[name="firstName"]');
      expect(firstNameInput).toBeInTheDocument();

      // VA web components use vaInput event
      await act(async () => {
        const mockEvent = new CustomEvent('vaInput', { bubbles: true });
        Object.defineProperty(mockEvent, 'target', {
          value: { value: 'John' },
          writable: false,
        });
        firstNameInput?.dispatchEvent(mockEvent);
      });

      expect(handleChange).toHaveBeenCalledWith('first', 'John');
    });

    it('calls onChange when middle name changes via vaInput event', async () => {
      const handleChange = vi.fn();

      const { container } = render(
        <FullNameField
          firstName={{ label: 'First name' }}
          lastName={{ label: 'Last name' }}
          middleName={{ label: 'Middle name', show: true }}
          onChange={handleChange}
        />
      );

      const middleNameInput = container.querySelector('va-text-input[name="middleName"]');

      await act(async () => {
        const mockEvent = new CustomEvent('vaInput', { bubbles: true });
        Object.defineProperty(mockEvent, 'target', {
          value: { value: 'William' },
          writable: false,
        });
        middleNameInput?.dispatchEvent(mockEvent);
      });

      expect(handleChange).toHaveBeenCalledWith('middle', 'William');
    });

    it('calls onChange when last name changes via vaInput event', async () => {
      const handleChange = vi.fn();

      const { container } = render(
        <FullNameField
          firstName={{ label: 'First name' }}
          lastName={{ label: 'Last name' }}
          onChange={handleChange}
        />
      );

      const lastNameInput = container.querySelector('va-text-input[name="lastName"]');

      await act(async () => {
        const mockEvent = new CustomEvent('vaInput', { bubbles: true });
        Object.defineProperty(mockEvent, 'target', {
          value: { value: 'Doe' },
          writable: false,
        });
        lastNameInput?.dispatchEvent(mockEvent);
      });

      expect(handleChange).toHaveBeenCalledWith('last', 'Doe');
    });

    it('calls onChange when suffix changes via vaSelect event', async () => {
      const handleChange = vi.fn();

      const { container } = render(
        <FullNameField
          firstName={{ label: 'First name' }}
          lastName={{ label: 'Last name' }}
          suffix={{ label: 'Suffix', show: true }}
          onChange={handleChange}
        />
      );

      const suffixSelect = container.querySelector('va-select[name="suffix"]');

      await act(async () => {
        const mockEvent = new CustomEvent('vaSelect', { bubbles: true });
        Object.defineProperty(mockEvent, 'target', {
          value: { value: 'Jr.' },
          writable: false,
        });
        suffixSelect?.dispatchEvent(mockEvent);
      });

      expect(handleChange).toHaveBeenCalledWith('suffix', 'Jr.');
    });

    it('does not throw when onChange handler is not provided', () => {
      // Component should render without error when no onChange
      expect(() =>
        render(
          <FullNameField firstName={{ label: 'First name' }} lastName={{ label: 'Last name' }} />
        )
      ).not.toThrow();
    });
  });

  it('renders all fields when fully configured', () => {
    const { container } = render(
      <FullNameField
        firstName={{ label: 'First name', required: true }}
        lastName={{ label: 'Last name', required: true }}
        legend="Full legal name"
        middleName={{ label: 'Middle name', show: true }}
        suffix={{ label: 'Suffix', show: true }}
      />
    );

    expect(container.querySelector('va-text-input[name="firstName"]')).toBeInTheDocument();
    expect(container.querySelector('va-text-input[name="middleName"]')).toBeInTheDocument();
    expect(container.querySelector('va-text-input[name="lastName"]')).toBeInTheDocument();
    expect(container.querySelector('va-select[name="suffix"]')).toBeInTheDocument();
  });
});
