/**
 * Tests for RadioField component
 *
 * Note: VA Design System web components don't render their internal structure
 * in test environments (happy-dom/jsdom). Tests verify that the component
 * correctly passes props to the underlying web component element.
 */

import { render } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';

import { RadioField } from './radio-field';

describe('RadioField', () => {
  const defaultOptions = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
  ];

  it('renders va-radio element', () => {
    const { container } = render(<RadioField label="Choose one" options={defaultOptions} />);

    const radio = container.querySelector('va-radio');
    expect(radio).toBeInTheDocument();
  });

  it('passes label prop to web component', () => {
    const { container } = render(<RadioField label="Contact method" options={defaultOptions} />);

    const radio = container.querySelector('va-radio');
    expect(radio).toHaveAttribute('label', 'Contact method');
  });

  it('passes error prop to web component', () => {
    const { container } = render(
      <RadioField error="Please select an option" label="Choose one" options={defaultOptions} />
    );

    const radio = container.querySelector('va-radio');
    expect(radio).toHaveAttribute('error', 'Please select an option');
  });

  it('passes hint prop to web component', () => {
    const { container } = render(
      <RadioField hint="Select your preferred method" label="Contact" options={defaultOptions} />
    );

    const radio = container.querySelector('va-radio');
    expect(radio).toHaveAttribute('hint', 'Select your preferred method');
  });

  it('passes required prop to web component', () => {
    const { container } = render(
      <RadioField required label="Required field" options={defaultOptions} />
    );

    const radio = container.querySelector('va-radio');
    // React 19: boolean true renders as presence attribute
    expect(radio).toHaveAttribute('required');
  });

  it('passes name prop to web component', () => {
    const { container } = render(
      <RadioField label="Contact" name="contactMethod" options={defaultOptions} />
    );

    const radio = container.querySelector('va-radio');
    expect(radio).toHaveAttribute('name', 'contactMethod');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<RadioField ref={ref} label="Test" options={defaultOptions} />);

    expect(ref).toHaveBeenCalled();
  });

  it('renders radio options from options array', () => {
    const options = [
      { label: 'Email', value: 'email' },
      { label: 'Phone', value: 'phone' },
      { label: 'Mail', value: 'mail' },
    ];

    const { container } = render(<RadioField label="Contact method" options={options} />);

    const radio = container.querySelector('va-radio');
    const optionElements = radio?.querySelectorAll('va-radio-option');

    expect(optionElements).toHaveLength(3);
    expect(optionElements?.[0]).toHaveAttribute('label', 'Email');
    expect(optionElements?.[0]).toHaveAttribute('value', 'email');
    expect(optionElements?.[1]).toHaveAttribute('label', 'Phone');
    expect(optionElements?.[1]).toHaveAttribute('value', 'phone');
    expect(optionElements?.[2]).toHaveAttribute('label', 'Mail');
    expect(optionElements?.[2]).toHaveAttribute('value', 'mail');
  });

  it('renders options with descriptions', () => {
    const options = [
      { label: 'Email', value: 'email', description: 'Fastest response' },
      { label: 'Phone', value: 'phone', description: 'Available 9am-5pm' },
    ];

    const { container } = render(<RadioField label="Contact method" options={options} />);

    const radio = container.querySelector('va-radio');
    const optionElements = radio?.querySelectorAll('va-radio-option');

    expect(optionElements?.[0]).toHaveAttribute('description', 'Fastest response');
    expect(optionElements?.[1]).toHaveAttribute('description', 'Available 9am-5pm');
  });

  it('marks selected option as checked', () => {
    const { container } = render(
      <RadioField label="Contact method" options={defaultOptions} value="opt2" />
    );

    const radio = container.querySelector('va-radio');
    const optionElements = radio?.querySelectorAll('va-radio-option');

    // React 19: boolean false renders as attribute="false"
    expect(optionElements?.[0]).toHaveAttribute('checked', 'false');
    // React 19: boolean true renders as presence attribute
    expect(optionElements?.[1]).toHaveAttribute('checked');
    expect(optionElements?.[2]).toHaveAttribute('checked', 'false');
  });

  it('disables individual options when specified', () => {
    const options = [
      { label: 'Option 1', value: 'opt1', disabled: false },
      { label: 'Option 2', value: 'opt2', disabled: true },
      { label: 'Option 3', value: 'opt3', disabled: false },
    ];

    const { container } = render(<RadioField label="Choose" options={options} />);

    const radio = container.querySelector('va-radio');
    const optionElements = radio?.querySelectorAll('va-radio-option');

    // React 19: boolean false renders as attribute="false"
    expect(optionElements?.[0]).toHaveAttribute('disabled', 'false');
    // React 19: boolean true renders as presence attribute
    expect(optionElements?.[1]).toHaveAttribute('disabled');
    expect(optionElements?.[2]).toHaveAttribute('disabled', 'false');
  });

  it('disables all options when disabled prop is true', () => {
    const { container } = render(
      <RadioField disabled label="Disabled field" options={defaultOptions} />
    );

    const radio = container.querySelector('va-radio');
    const optionElements = radio?.querySelectorAll('va-radio-option');

    // All options should be disabled
    optionElements?.forEach(option => {
      expect(option).toHaveAttribute('disabled');
    });
  });

  it('applies additional props to web component', () => {
    const { container } = render(
      <RadioField data-testid="test-radio" label="Test" options={defaultOptions} />
    );

    const radio = container.querySelector('va-radio');
    expect(radio).toHaveAttribute('data-testid', 'test-radio');
  });

  describe('default values', () => {
    it('defaults required to false', () => {
      const { container } = render(<RadioField label="Test" options={defaultOptions} />);

      const radio = container.querySelector('va-radio');
      // React 18: false boolean props render as attribute="false" on custom elements
      expect(radio).toHaveAttribute('required', 'false');
    });

    it('defaults disabled to false', () => {
      const { container } = render(<RadioField label="Test" options={defaultOptions} />);

      const radio = container.querySelector('va-radio');
      const optionElements = radio?.querySelectorAll('va-radio-option');

      // Options should have disabled="false"
      optionElements?.forEach(option => {
        expect(option).toHaveAttribute('disabled', 'false');
      });
    });
  });

  describe('event handling', () => {
    it('attaches vaValueChange event listener when onChange provided', () => {
      const handleChange = vi.fn();
      const ref = React.createRef<HTMLVaRadioElement>();

      render(
        <RadioField ref={ref} label="Contact" options={defaultOptions} onChange={handleChange} />
      );

      expect(ref.current).toBeTruthy();

      // Simulate vaValueChange event
      const event = new Event('vaValueChange');
      ref.current?.dispatchEvent(event);

      expect(handleChange).toHaveBeenCalledWith(event);
    });

    it('attaches blur event listener when onBlur provided', () => {
      const handleBlur = vi.fn();
      const ref = React.createRef<HTMLVaRadioElement>();

      render(<RadioField ref={ref} label="Contact" options={defaultOptions} onBlur={handleBlur} />);

      expect(ref.current).toBeTruthy();

      // Simulate blur event
      const event = new Event('blur');
      ref.current?.dispatchEvent(event);

      expect(handleBlur).toHaveBeenCalledWith(event);
    });

    it('does not attach event listeners when handlers not provided', () => {
      const ref = React.createRef<HTMLVaRadioElement>();

      render(<RadioField ref={ref} label="Contact" options={defaultOptions} />);

      expect(ref.current).toBeTruthy();

      // This should not throw even without event handlers
      const changeEvent = new Event('vaValueChange');
      const blurEvent = new Event('blur');

      expect(() => {
        ref.current?.dispatchEvent(changeEvent);
        ref.current?.dispatchEvent(blurEvent);
      }).not.toThrow();
    });

    it('cleans up event listeners on unmount', () => {
      const handleChange = vi.fn();
      const handleBlur = vi.fn();
      const ref = React.createRef<HTMLVaRadioElement>();

      const { unmount } = render(
        <RadioField
          ref={ref}
          label="Contact"
          options={defaultOptions}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      );

      // Events should work before unmount
      const changeEvent = new Event('vaValueChange');
      ref.current?.dispatchEvent(changeEvent);
      expect(handleChange).toHaveBeenCalledTimes(1);

      unmount();

      // Events should not be handled after unmount
      ref.current?.dispatchEvent(changeEvent);
      expect(handleChange).toHaveBeenCalledTimes(1); // Still 1, not 2
    });
  });

  describe('React Hook Form integration', () => {
    it('accepts React Hook Form field props', () => {
      const handleChange = vi.fn();
      const handleBlur = vi.fn();

      const options = [
        { label: 'Email', value: 'email' },
        { label: 'Phone', value: 'phone' },
      ];

      const { container } = render(
        <RadioField
          required
          label="Contact method"
          name="contactMethod"
          options={options}
          value="email"
          onBlur={handleBlur}
          onChange={handleChange}
        />
      );

      const radio = container.querySelector('va-radio');
      expect(radio).toHaveAttribute('name', 'contactMethod');
      // React 19: boolean true renders as presence attribute
      expect(radio).toHaveAttribute('required');

      const optionElements = radio?.querySelectorAll('va-radio-option');
      // First option should be checked
      expect(optionElements?.[0]).toHaveAttribute('checked');
    });

    it('displays validation error from React Hook Form', () => {
      const { container } = render(
        <RadioField
          error="Please select a contact method"
          label="Contact"
          options={defaultOptions}
        />
      );

      const radio = container.querySelector('va-radio');
      expect(radio).toHaveAttribute('error', 'Please select a contact method');
    });

    it('works with register spread pattern', () => {
      const mockRegister = {
        name: 'contactMethod',
        onChange: vi.fn(),
        onBlur: vi.fn(),
        ref: vi.fn(),
      };

      const options = [
        { label: 'Email', value: 'email' },
        { label: 'Phone', value: 'phone' },
      ];

      const { container } = render(
        <RadioField {...mockRegister} label="Contact method" options={options} />
      );

      const radio = container.querySelector('va-radio');
      expect(radio).toHaveAttribute('name', 'contactMethod');
      expect(mockRegister.ref).toHaveBeenCalled();
    });
  });

  describe('error prop edge cases', () => {
    it('does not set error attribute when error is undefined', () => {
      const { container } = render(<RadioField label="Test" options={defaultOptions} />);

      const radio = container.querySelector('va-radio');
      expect(radio).not.toHaveAttribute('error');
    });

    it('does not set error attribute when error is empty string', () => {
      const { container } = render(<RadioField error="" label="Test" options={defaultOptions} />);

      const radio = container.querySelector('va-radio');
      expect(radio).not.toHaveAttribute('error');
    });
  });

  describe('empty options array', () => {
    it('renders no options when options array is empty', () => {
      const { container } = render(<RadioField label="Test" options={[]} />);

      const radio = container.querySelector('va-radio');
      const optionElements = radio?.querySelectorAll('va-radio-option');

      expect(optionElements).toHaveLength(0);
    });
  });
});
