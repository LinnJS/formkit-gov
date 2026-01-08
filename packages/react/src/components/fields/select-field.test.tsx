/**
 * Tests for SelectField component
 *
 * Note: VA Design System web components don't render their internal structure
 * in test environments (happy-dom/jsdom). Tests verify that the component
 * correctly passes props to the underlying web component element.
 */

import { render } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';

import { SelectField } from './select-field';

describe('SelectField', () => {
  it('renders va-select element', () => {
    const { container } = render(<SelectField label="Country" />);

    const select = container.querySelector('va-select');
    expect(select).toBeInTheDocument();
  });

  it('passes label prop to web component', () => {
    const { container } = render(<SelectField label="Country" />);

    const select = container.querySelector('va-select');
    expect(select).toHaveAttribute('label', 'Country');
  });

  it('passes error prop to web component', () => {
    const { container } = render(<SelectField error="Country is required" label="Country" />);

    const select = container.querySelector('va-select');
    expect(select).toHaveAttribute('error', 'Country is required');
  });

  it('passes hint prop to web component', () => {
    const { container } = render(
      <SelectField hint="Select your country of residence" label="Country" />
    );

    const select = container.querySelector('va-select');
    expect(select).toHaveAttribute('hint', 'Select your country of residence');
  });

  it('passes required prop to web component', () => {
    const { container } = render(<SelectField required label="Required field" />);

    const select = container.querySelector('va-select');
    expect(select).toHaveAttribute('required');
  });

  it('passes disabled prop to web component', () => {
    const { container } = render(<SelectField disabled label="Disabled field" />);

    const select = container.querySelector('va-select');
    expect(select).toHaveAttribute('disabled');
  });

  it('passes value prop to web component', () => {
    const { container } = render(<SelectField label="State" value="CA" />);

    const select = container.querySelector('va-select');
    expect(select).toHaveAttribute('value', 'CA');
  });

  it('passes name prop to web component', () => {
    const { container } = render(<SelectField label="Country" name="country" />);

    const select = container.querySelector('va-select');
    expect(select).toHaveAttribute('name', 'country');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<SelectField ref={ref} label="Test" />);

    expect(ref).toHaveBeenCalled();
  });

  it('renders options from options array', () => {
    const options = [
      { label: 'California', value: 'CA' },
      { label: 'New York', value: 'NY' },
      { label: 'Texas', value: 'TX' },
    ];

    const { container } = render(<SelectField label="State" options={options} />);

    const select = container.querySelector('va-select');
    const optionElements = select?.querySelectorAll('option');

    expect(optionElements).toHaveLength(3);
    expect(optionElements?.[0]).toHaveTextContent('California');
    expect(optionElements?.[0]).toHaveAttribute('value', 'CA');
    expect(optionElements?.[1]).toHaveTextContent('New York');
    expect(optionElements?.[1]).toHaveAttribute('value', 'NY');
    expect(optionElements?.[2]).toHaveTextContent('Texas');
    expect(optionElements?.[2]).toHaveAttribute('value', 'TX');
  });

  it('renders children when no options provided', () => {
    const { container } = render(
      <SelectField label="Fruit">
        <option value="">-- Select --</option>
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="orange">Orange</option>
      </SelectField>
    );

    const select = container.querySelector('va-select');
    const optionElements = select?.querySelectorAll('option');

    expect(optionElements).toHaveLength(4);
    expect(optionElements?.[0]).toHaveTextContent('-- Select --');
    expect(optionElements?.[0]).toHaveAttribute('value', '');
    expect(optionElements?.[1]).toHaveTextContent('Apple');
    expect(optionElements?.[1]).toHaveAttribute('value', 'apple');
  });

  it('applies additional props to web component', () => {
    const { container } = render(<SelectField data-testid="test-select" label="Test" />);

    const select = container.querySelector('va-select');
    expect(select).toHaveAttribute('data-testid', 'test-select');
  });

  describe('default values', () => {
    it('defaults required to false', () => {
      const { container } = render(<SelectField label="Test" />);

      const select = container.querySelector('va-select');
      expect(select).not.toHaveAttribute('required');
    });

    it('defaults disabled to false', () => {
      const { container } = render(<SelectField label="Test" />);

      const select = container.querySelector('va-select');
      expect(select).not.toHaveAttribute('disabled');
    });

    it('defaults value to empty string', () => {
      const { container } = render(<SelectField label="Test" />);

      const select = container.querySelector('va-select');
      expect(select).toHaveAttribute('value', '');
    });
  });

  describe('event handling', () => {
    it('attaches vaSelect event listener when onChange provided', () => {
      const handleChange = vi.fn();
      const ref = React.createRef<HTMLVaSelectElement>();

      render(<SelectField ref={ref} label="State" onChange={handleChange} />);

      expect(ref.current).toBeTruthy();

      // Simulate vaSelect event
      const event = new Event('vaSelect');
      ref.current?.dispatchEvent(event);

      expect(handleChange).toHaveBeenCalledWith(event);
    });

    it('attaches blur event listener when onBlur provided', () => {
      const handleBlur = vi.fn();
      const ref = React.createRef<HTMLVaSelectElement>();

      render(<SelectField ref={ref} label="State" onBlur={handleBlur} />);

      expect(ref.current).toBeTruthy();

      // Simulate blur event
      const event = new Event('blur');
      ref.current?.dispatchEvent(event);

      expect(handleBlur).toHaveBeenCalledWith(event);
    });

    it('does not attach event listeners when handlers not provided', () => {
      const ref = React.createRef<HTMLVaSelectElement>();

      render(<SelectField ref={ref} label="State" />);

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
      const ref = React.createRef<HTMLVaSelectElement>();

      const { unmount } = render(
        <SelectField ref={ref} label="State" onBlur={handleBlur} onChange={handleChange} />
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
        <SelectField
          required
          label="Country"
          name="country"
          options={options}
          value="US"
          onBlur={handleBlur}
          onChange={handleChange}
        />
      );

      const select = container.querySelector('va-select');
      expect(select).toHaveAttribute('name', 'country');
      expect(select).toHaveAttribute('value', 'US');
      expect(select).toHaveAttribute('required');
    });

    it('displays validation error from React Hook Form', () => {
      const { container } = render(<SelectField error="Please select a country" label="Country" />);

      const select = container.querySelector('va-select');
      expect(select).toHaveAttribute('error', 'Please select a country');
    });

    it('works with register spread pattern', () => {
      const mockRegister = {
        name: 'state',
        onChange: vi.fn(),
        onBlur: vi.fn(),
        ref: vi.fn(),
      };

      const options = [
        { label: 'California', value: 'CA' },
        { label: 'New York', value: 'NY' },
      ];

      const { container } = render(
        <SelectField {...mockRegister} label="State" options={options} />
      );

      const select = container.querySelector('va-select');
      expect(select).toHaveAttribute('name', 'state');
      expect(mockRegister.ref).toHaveBeenCalled();
    });
  });

  describe('options prioritization', () => {
    it('renders options array over children when both provided', () => {
      const options = [
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2' },
      ];

      const { container } = render(
        <SelectField label="Test" options={options}>
          <option value="child1">Child Option 1</option>
          <option value="child2">Child Option 2</option>
        </SelectField>
      );

      const select = container.querySelector('va-select');
      const optionElements = select?.querySelectorAll('option');

      expect(optionElements).toHaveLength(2);
      expect(optionElements?.[0]).toHaveTextContent('Option 1');
      expect(optionElements?.[1]).toHaveTextContent('Option 2');
    });
  });

  describe('empty options array', () => {
    it('handles empty options array', () => {
      const { container } = render(<SelectField label="Test" options={[]} />);

      const select = container.querySelector('va-select');
      const optionElements = select?.querySelectorAll('option');

      expect(optionElements).toHaveLength(0);
    });
  });

  describe('error prop edge cases', () => {
    it('does not set error attribute when error is undefined', () => {
      const { container } = render(<SelectField label="Test" />);

      const select = container.querySelector('va-select');
      expect(select).not.toHaveAttribute('error');
    });

    it('does not set error attribute when error is empty string', () => {
      const { container } = render(<SelectField error="" label="Test" />);

      const select = container.querySelector('va-select');
      expect(select).not.toHaveAttribute('error');
    });
  });
});
