/**
 * Tests for CheckboxGroupField component
 *
 * Note: VA Design System web components don't render their internal structure
 * in test environments (happy-dom/jsdom). Tests verify that the component
 * correctly passes props to the underlying web component element.
 */

import { render } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';

import { CheckboxGroupField } from './checkbox-group-field';

const mockOptions = [
  { label: 'Email', value: 'email' },
  { label: 'Phone', value: 'phone' },
  { label: 'Mail', value: 'mail' },
];

describe('CheckboxGroupField', () => {
  it('renders va-checkbox-group element', () => {
    const { container } = render(
      <CheckboxGroupField label="Contact Methods" name="contactMethods" options={mockOptions} />
    );

    const checkboxGroup = container.querySelector('va-checkbox-group');
    expect(checkboxGroup).toBeInTheDocument();
  });

  it('passes label prop to web component', () => {
    const { container } = render(
      <CheckboxGroupField label="Contact Methods" name="contactMethods" options={mockOptions} />
    );

    const checkboxGroup = container.querySelector('va-checkbox-group');
    expect(checkboxGroup).toHaveAttribute('label', 'Contact Methods');
  });

  it('passes error prop to web component', () => {
    const { container } = render(
      <CheckboxGroupField
        error="Please select at least one option"
        label="Contact Methods"
        name="contactMethods"
        options={mockOptions}
      />
    );

    const checkboxGroup = container.querySelector('va-checkbox-group');
    expect(checkboxGroup).toHaveAttribute('error', 'Please select at least one option');
  });

  it('passes hint prop to web component', () => {
    const { container } = render(
      <CheckboxGroupField
        hint="Select all that apply"
        label="Contact Methods"
        name="contactMethods"
        options={mockOptions}
      />
    );

    const checkboxGroup = container.querySelector('va-checkbox-group');
    expect(checkboxGroup).toHaveAttribute('hint', 'Select all that apply');
  });

  it('passes required prop to web component', () => {
    const { container } = render(
      <CheckboxGroupField
        required
        label="Contact Methods"
        name="contactMethods"
        options={mockOptions}
      />
    );

    const checkboxGroup = container.querySelector('va-checkbox-group');
    expect(checkboxGroup).toHaveAttribute('required');
  });

  it('passes name prop to web component', () => {
    const { container } = render(
      <CheckboxGroupField label="Contact Methods" name="contactMethods" options={mockOptions} />
    );

    const checkboxGroup = container.querySelector('va-checkbox-group');
    expect(checkboxGroup).toHaveAttribute('name', 'contactMethods');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<CheckboxGroupField ref={ref} label="Test" name="test" options={mockOptions} />);

    expect(ref).toHaveBeenCalled();
  });

  it('renders checkbox options from options array', () => {
    const { container } = render(
      <CheckboxGroupField label="Contact Methods" name="contactMethods" options={mockOptions} />
    );

    const checkboxGroup = container.querySelector('va-checkbox-group');
    const checkboxElements = checkboxGroup?.querySelectorAll('va-checkbox');

    expect(checkboxElements).toHaveLength(3);
    expect(checkboxElements?.[0]).toHaveAttribute('label', 'Email');
    expect(checkboxElements?.[0]).toHaveAttribute('value', 'email');
    expect(checkboxElements?.[1]).toHaveAttribute('label', 'Phone');
    expect(checkboxElements?.[1]).toHaveAttribute('value', 'phone');
    expect(checkboxElements?.[2]).toHaveAttribute('label', 'Mail');
    expect(checkboxElements?.[2]).toHaveAttribute('value', 'mail');
  });

  it('renders checkbox options with descriptions', () => {
    const optionsWithDescriptions = [
      { label: 'Healthcare', value: 'healthcare', description: 'Medical and dental benefits' },
      { label: 'Education', value: 'education', description: 'GI Bill and training' },
    ];

    const { container } = render(
      <CheckboxGroupField label="Services" name="services" options={optionsWithDescriptions} />
    );

    const checkboxGroup = container.querySelector('va-checkbox-group');
    const checkboxElements = checkboxGroup?.querySelectorAll('va-checkbox');

    expect(checkboxElements?.[0]).toHaveAttribute('description', 'Medical and dental benefits');
    expect(checkboxElements?.[1]).toHaveAttribute('description', 'GI Bill and training');
  });

  it('marks selected values as checked', () => {
    const { container } = render(
      <CheckboxGroupField
        label="Contact Methods"
        name="contactMethods"
        options={mockOptions}
        value={['email', 'phone']}
      />
    );

    const checkboxGroup = container.querySelector('va-checkbox-group');
    const checkboxElements = checkboxGroup?.querySelectorAll('va-checkbox');

    expect(checkboxElements?.[0]).toHaveAttribute('checked'); // email
    expect(checkboxElements?.[1]).toHaveAttribute('checked'); // phone
    expect(checkboxElements?.[2]).not.toHaveAttribute('checked'); // mail
  });

  it('disables all options when disabled prop is true', () => {
    const { container } = render(
      <CheckboxGroupField
        disabled
        label="Contact Methods"
        name="contactMethods"
        options={mockOptions}
      />
    );

    const checkboxGroup = container.querySelector('va-checkbox-group');
    const checkboxElements = checkboxGroup?.querySelectorAll('va-checkbox');

    expect(checkboxElements?.[0]).toHaveAttribute('disabled');
    expect(checkboxElements?.[1]).toHaveAttribute('disabled');
    expect(checkboxElements?.[2]).toHaveAttribute('disabled');
  });

  it('disables individual options when option.disabled is true', () => {
    const optionsWithDisabled = [
      { label: 'Email', value: 'email' },
      { label: 'Phone', value: 'phone', disabled: true },
      { label: 'Mail', value: 'mail' },
    ];

    const { container } = render(
      <CheckboxGroupField
        label="Contact Methods"
        name="contactMethods"
        options={optionsWithDisabled}
      />
    );

    const checkboxGroup = container.querySelector('va-checkbox-group');
    const checkboxElements = checkboxGroup?.querySelectorAll('va-checkbox');

    expect(checkboxElements?.[0]).not.toHaveAttribute('disabled');
    expect(checkboxElements?.[1]).toHaveAttribute('disabled');
    expect(checkboxElements?.[2]).not.toHaveAttribute('disabled');
  });

  it('applies additional props to web component', () => {
    const { container } = render(
      <CheckboxGroupField
        data-testid="test-checkbox-group"
        label="Test"
        name="test"
        options={mockOptions}
      />
    );

    const checkboxGroup = container.querySelector('va-checkbox-group');
    expect(checkboxGroup).toHaveAttribute('data-testid', 'test-checkbox-group');
  });

  describe('default values', () => {
    it('defaults required to false', () => {
      const { container } = render(
        <CheckboxGroupField label="Test" name="test" options={mockOptions} />
      );

      const checkboxGroup = container.querySelector('va-checkbox-group');
      expect(checkboxGroup).not.toHaveAttribute('required');
    });

    it('defaults disabled to false', () => {
      const { container } = render(
        <CheckboxGroupField label="Test" name="test" options={mockOptions} />
      );

      const checkboxGroup = container.querySelector('va-checkbox-group');
      const checkboxElements = checkboxGroup?.querySelectorAll('va-checkbox');

      expect(checkboxElements?.[0]).not.toHaveAttribute('disabled');
    });

    it('defaults value to empty array', () => {
      const { container } = render(
        <CheckboxGroupField label="Test" name="test" options={mockOptions} />
      );

      const checkboxGroup = container.querySelector('va-checkbox-group');
      const checkboxElements = checkboxGroup?.querySelectorAll('va-checkbox');

      expect(checkboxElements?.[0]).not.toHaveAttribute('checked');
      expect(checkboxElements?.[1]).not.toHaveAttribute('checked');
      expect(checkboxElements?.[2]).not.toHaveAttribute('checked');
    });
  });

  describe('event handling', () => {
    it('attaches vaChange event listener when onChange provided', () => {
      const handleChange = vi.fn();
      const ref = React.createRef<HTMLVaCheckboxGroupElement>();

      render(
        <CheckboxGroupField
          ref={ref}
          label="Test"
          name="test"
          options={mockOptions}
          onChange={handleChange}
        />
      );

      expect(ref.current).toBeTruthy();

      // Simulate vaChange event with detail value
      const event = new CustomEvent('vaChange', {
        detail: { value: ['email', 'phone'] },
      });
      ref.current?.dispatchEvent(event);

      expect(handleChange).toHaveBeenCalledWith(['email', 'phone']);
    });

    it('attaches blur event listener when onBlur provided', () => {
      const handleBlur = vi.fn();
      const ref = React.createRef<HTMLVaCheckboxGroupElement>();

      render(
        <CheckboxGroupField
          ref={ref}
          label="Test"
          name="test"
          options={mockOptions}
          onBlur={handleBlur}
        />
      );

      expect(ref.current).toBeTruthy();

      // Simulate blur event
      const event = new Event('blur');
      ref.current?.dispatchEvent(event);

      expect(handleBlur).toHaveBeenCalled();
    });

    it('does not attach event listeners when handlers not provided', () => {
      const ref = React.createRef<HTMLVaCheckboxGroupElement>();

      render(<CheckboxGroupField ref={ref} label="Test" name="test" options={mockOptions} />);

      expect(ref.current).toBeTruthy();

      // This should not throw even without event handlers
      const changeEvent = new CustomEvent('vaChange', {
        detail: { value: ['email'] },
      });
      const blurEvent = new Event('blur');

      expect(() => {
        ref.current?.dispatchEvent(changeEvent);
        ref.current?.dispatchEvent(blurEvent);
      }).not.toThrow();
    });

    it('cleans up event listeners on unmount', () => {
      const handleChange = vi.fn();
      const handleBlur = vi.fn();
      const ref = React.createRef<HTMLVaCheckboxGroupElement>();

      const { unmount } = render(
        <CheckboxGroupField
          ref={ref}
          label="Test"
          name="test"
          options={mockOptions}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      );

      // Events should work before unmount
      const changeEvent = new CustomEvent('vaChange', {
        detail: { value: ['email'] },
      });
      ref.current?.dispatchEvent(changeEvent);
      expect(handleChange).toHaveBeenCalledTimes(1);

      unmount();

      // Events should not be handled after unmount
      ref.current?.dispatchEvent(changeEvent);
      expect(handleChange).toHaveBeenCalledTimes(1); // Still 1, not 2
    });

    it('handles vaChange event with empty detail value', () => {
      const handleChange = vi.fn();
      const ref = React.createRef<HTMLVaCheckboxGroupElement>();

      render(
        <CheckboxGroupField
          ref={ref}
          label="Test"
          name="test"
          options={mockOptions}
          onChange={handleChange}
        />
      );

      // Simulate vaChange event with empty value
      const event = new CustomEvent('vaChange', {
        detail: { value: [] },
      });
      ref.current?.dispatchEvent(event);

      expect(handleChange).toHaveBeenCalledWith([]);
    });
  });

  describe('React Hook Form integration', () => {
    it('accepts React Hook Form field props', () => {
      const handleChange = vi.fn();
      const handleBlur = vi.fn();

      const { container } = render(
        <CheckboxGroupField
          required
          label="Contact Methods"
          name="contactMethods"
          options={mockOptions}
          value={['email']}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      );

      const checkboxGroup = container.querySelector('va-checkbox-group');
      expect(checkboxGroup).toHaveAttribute('name', 'contactMethods');
      expect(checkboxGroup).toHaveAttribute('required');

      const checkboxElements = checkboxGroup?.querySelectorAll('va-checkbox');
      expect(checkboxElements?.[0]).toHaveAttribute('checked'); // email is selected
    });

    it('displays validation error from React Hook Form', () => {
      const { container } = render(
        <CheckboxGroupField
          error="Please select at least one contact method"
          label="Contact Methods"
          name="contactMethods"
          options={mockOptions}
        />
      );

      const checkboxGroup = container.querySelector('va-checkbox-group');
      expect(checkboxGroup).toHaveAttribute('error', 'Please select at least one contact method');
    });

    it('works with controller pattern', () => {
      const mockField = {
        name: 'contactMethods',
        value: ['email', 'mail'],
        onChange: vi.fn(),
        onBlur: vi.fn(),
        ref: vi.fn(),
      };

      const { container } = render(
        <CheckboxGroupField {...mockField} label="Contact Methods" options={mockOptions} />
      );

      const checkboxGroup = container.querySelector('va-checkbox-group');
      expect(checkboxGroup).toHaveAttribute('name', 'contactMethods');
      expect(mockField.ref).toHaveBeenCalled();

      const checkboxElements = checkboxGroup?.querySelectorAll('va-checkbox');
      expect(checkboxElements?.[0]).toHaveAttribute('checked'); // email
      expect(checkboxElements?.[1]).not.toHaveAttribute('checked'); // phone
      expect(checkboxElements?.[2]).toHaveAttribute('checked'); // mail
    });
  });

  describe('empty options array', () => {
    it('handles empty options array', () => {
      const { container } = render(<CheckboxGroupField label="Test" name="test" options={[]} />);

      const checkboxGroup = container.querySelector('va-checkbox-group');
      const checkboxElements = checkboxGroup?.querySelectorAll('va-checkbox');

      expect(checkboxElements).toHaveLength(0);
    });
  });

  describe('error prop edge cases', () => {
    it('does not set error attribute when error is undefined', () => {
      const { container } = render(
        <CheckboxGroupField label="Test" name="test" options={mockOptions} />
      );

      const checkboxGroup = container.querySelector('va-checkbox-group');
      expect(checkboxGroup).not.toHaveAttribute('error');
    });

    it('does not set error attribute when error is empty string', () => {
      const { container } = render(
        <CheckboxGroupField error="" label="Test" name="test" options={mockOptions} />
      );

      const checkboxGroup = container.querySelector('va-checkbox-group');
      expect(checkboxGroup).not.toHaveAttribute('error');
    });
  });
});
