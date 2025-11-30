/**
 * Tests for ComboBoxField component
 *
 * Note: VA Design System web components don't render their internal structure
 * in test environments (happy-dom/jsdom). Tests verify that the component
 * correctly passes props to the underlying web component element.
 */

import { render } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';

import { ComboBoxField } from './combo-box-field';

describe('ComboBoxField', () => {
  it('renders va-combo-box element', () => {
    const { container } = render(<ComboBoxField label="Country" />);

    const comboBox = container.querySelector('va-combo-box');
    expect(comboBox).toBeInTheDocument();
  });

  it('passes label prop to web component', () => {
    const { container } = render(<ComboBoxField label="Country" />);

    const comboBox = container.querySelector('va-combo-box');
    expect(comboBox).toHaveAttribute('label', 'Country');
  });

  it('passes error prop to web component', () => {
    const { container } = render(<ComboBoxField error="Country is required" label="Country" />);

    const comboBox = container.querySelector('va-combo-box');
    expect(comboBox).toHaveAttribute('error', 'Country is required');
  });

  it('passes hint prop to web component', () => {
    const { container } = render(
      <ComboBoxField hint="Select your country of residence" label="Country" />
    );

    const comboBox = container.querySelector('va-combo-box');
    expect(comboBox).toHaveAttribute('hint', 'Select your country of residence');
  });

  it('passes required prop to web component', () => {
    const { container } = render(<ComboBoxField required label="Required field" />);

    const comboBox = container.querySelector('va-combo-box');
    // React 19: boolean true renders as presence attribute
    expect(comboBox).toHaveAttribute('required');
  });

  it('passes disabled prop to web component', () => {
    const { container } = render(<ComboBoxField disabled label="Disabled field" />);

    const comboBox = container.querySelector('va-combo-box');
    // React 19: boolean true renders as presence attribute
    expect(comboBox).toHaveAttribute('disabled');
  });

  it('passes value prop to web component', () => {
    const { container } = render(<ComboBoxField label="Country" value="US" />);

    const comboBox = container.querySelector('va-combo-box');
    expect(comboBox).toHaveAttribute('value', 'US');
  });

  it('passes name prop to web component', () => {
    const { container } = render(<ComboBoxField label="Country" name="country" />);

    const comboBox = container.querySelector('va-combo-box');
    expect(comboBox).toHaveAttribute('name', 'country');
  });

  it('passes placeholder prop to web component', () => {
    const { container } = render(<ComboBoxField label="Country" placeholder="Start typing..." />);

    const comboBox = container.querySelector('va-combo-box');
    expect(comboBox).toHaveAttribute('placeholder', 'Start typing...');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<ComboBoxField ref={ref} label="Test" />);

    expect(ref).toHaveBeenCalled();
  });

  it('renders options from options array', () => {
    const options = [
      { label: 'United States', value: 'US' },
      { label: 'Canada', value: 'CA' },
      { label: 'Mexico', value: 'MX' },
    ];

    const { container } = render(<ComboBoxField label="Country" options={options} />);

    const comboBox = container.querySelector('va-combo-box');
    const optionElements = comboBox?.querySelectorAll('option');

    expect(optionElements).toHaveLength(3);
    expect(optionElements?.[0]).toHaveTextContent('United States');
    expect(optionElements?.[0]).toHaveAttribute('value', 'US');
    expect(optionElements?.[1]).toHaveTextContent('Canada');
    expect(optionElements?.[1]).toHaveAttribute('value', 'CA');
    expect(optionElements?.[2]).toHaveTextContent('Mexico');
    expect(optionElements?.[2]).toHaveAttribute('value', 'MX');
  });

  it('applies additional props to web component', () => {
    const { container } = render(<ComboBoxField data-testid="test-combo" label="Test" />);

    const comboBox = container.querySelector('va-combo-box');
    expect(comboBox).toHaveAttribute('data-testid', 'test-combo');
  });

  describe('default values', () => {
    it('defaults required to false', () => {
      const { container } = render(<ComboBoxField label="Test" />);

      const comboBox = container.querySelector('va-combo-box');
      // React 18: false boolean props render as attribute="false" on custom elements
      expect(comboBox).toHaveAttribute('required', 'false');
    });

    it('defaults disabled to false', () => {
      const { container } = render(<ComboBoxField label="Test" />);

      const comboBox = container.querySelector('va-combo-box');
      // React 18: false boolean props render as attribute="false" on custom elements
      expect(comboBox).toHaveAttribute('disabled', 'false');
    });

    it('defaults value to empty string', () => {
      const { container } = render(<ComboBoxField label="Test" />);

      const comboBox = container.querySelector('va-combo-box');
      expect(comboBox).toHaveAttribute('value', '');
    });
  });

  describe('event handling', () => {
    it('attaches vaSelect event listener when onChange provided', () => {
      const handleChange = vi.fn();
      const ref = React.createRef<HTMLVaComboBoxElement>();

      render(<ComboBoxField ref={ref} label="Country" onChange={handleChange} />);

      expect(ref.current).toBeTruthy();

      // Simulate vaSelect event
      const event = new Event('vaSelect');
      ref.current?.dispatchEvent(event);

      expect(handleChange).toHaveBeenCalledWith(event);
    });

    it('attaches blur event listener when onBlur provided', () => {
      const handleBlur = vi.fn();
      const ref = React.createRef<HTMLVaComboBoxElement>();

      render(<ComboBoxField ref={ref} label="Country" onBlur={handleBlur} />);

      expect(ref.current).toBeTruthy();

      // Simulate blur event
      const event = new Event('blur');
      ref.current?.dispatchEvent(event);

      expect(handleBlur).toHaveBeenCalledWith(event);
    });

    it('does not attach event listeners when handlers not provided', () => {
      const ref = React.createRef<HTMLVaComboBoxElement>();

      render(<ComboBoxField ref={ref} label="Country" />);

      expect(ref.current).toBeTruthy();

      // This should not throw even without event handlers
      const changeEvent = new Event('vaSelect');
      const blurEvent = new Event('blur');

      expect(() => {
        ref.current?.dispatchEvent(changeEvent);
        ref.current?.dispatchEvent(blurEvent);
      }).not.toThrow();
    });

    it('cleans up event listeners on unmount', () => {
      const handleChange = vi.fn();
      const handleBlur = vi.fn();
      const ref = React.createRef<HTMLVaComboBoxElement>();

      const { unmount } = render(
        <ComboBoxField ref={ref} label="Country" onBlur={handleBlur} onChange={handleChange} />
      );

      // Events should work before unmount
      const changeEvent = new Event('vaSelect');
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
        { label: 'United States', value: 'US' },
        { label: 'Canada', value: 'CA' },
      ];

      const { container } = render(
        <ComboBoxField
          required
          label="Country"
          name="country"
          options={options}
          value="US"
          onBlur={handleBlur}
          onChange={handleChange}
        />
      );

      const comboBox = container.querySelector('va-combo-box');
      expect(comboBox).toHaveAttribute('name', 'country');
      expect(comboBox).toHaveAttribute('value', 'US');
      // React 19: boolean true renders as presence attribute
      expect(comboBox).toHaveAttribute('required');
    });

    it('displays validation error from React Hook Form', () => {
      const { container } = render(
        <ComboBoxField error="Please select a country" label="Country" />
      );

      const comboBox = container.querySelector('va-combo-box');
      expect(comboBox).toHaveAttribute('error', 'Please select a country');
    });

    it('works with register spread pattern', () => {
      const mockRegister = {
        name: 'country',
        onChange: vi.fn(),
        onBlur: vi.fn(),
        ref: vi.fn(),
      };

      const options = [
        { label: 'United States', value: 'US' },
        { label: 'Canada', value: 'CA' },
      ];

      const { container } = render(
        <ComboBoxField {...mockRegister} label="Country" options={options} />
      );

      const comboBox = container.querySelector('va-combo-box');
      expect(comboBox).toHaveAttribute('name', 'country');
      expect(mockRegister.ref).toHaveBeenCalled();
    });
  });

  describe('empty options array', () => {
    it('handles empty options array', () => {
      const { container } = render(<ComboBoxField label="Test" options={[]} />);

      const comboBox = container.querySelector('va-combo-box');
      const optionElements = comboBox?.querySelectorAll('option');

      expect(optionElements).toHaveLength(0);
    });
  });

  describe('error prop edge cases', () => {
    it('does not set error attribute when error is undefined', () => {
      const { container } = render(<ComboBoxField label="Test" />);

      const comboBox = container.querySelector('va-combo-box');
      expect(comboBox).not.toHaveAttribute('error');
    });

    it('does not set error attribute when error is empty string', () => {
      const { container } = render(<ComboBoxField error="" label="Test" />);

      const comboBox = container.querySelector('va-combo-box');
      expect(comboBox).not.toHaveAttribute('error');
    });
  });

  describe('options with many items', () => {
    it('renders many options efficiently', () => {
      const manyOptions = Array.from({ length: 100 }, (_, i) => ({
        label: `Option ${i + 1}`,
        value: `opt${i + 1}`,
      }));

      const { container } = render(<ComboBoxField label="Test" options={manyOptions} />);

      const comboBox = container.querySelector('va-combo-box');
      const optionElements = comboBox?.querySelectorAll('option');

      expect(optionElements).toHaveLength(100);
      expect(optionElements?.[0]).toHaveTextContent('Option 1');
      expect(optionElements?.[99]).toHaveTextContent('Option 100');
    });
  });
});
