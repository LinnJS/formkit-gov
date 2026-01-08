/**
 * Tests for NumberField component
 *
 * Note: VA Design System web components don't render their internal structure
 * in test environments (happy-dom/jsdom). Tests verify that the component
 * correctly passes props to the underlying web component element.
 */

import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { NumberField } from './number-field';

describe('NumberField', () => {
  it('renders va-text-input element with type="number"', () => {
    const { container } = render(<NumberField label="Age" />);

    const input = container.querySelector('va-text-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'number');
  });

  it('passes label prop to web component', () => {
    const { container } = render(<NumberField label="Age" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('label', 'Age');
  });

  it('passes error prop to web component', () => {
    const { container } = render(<NumberField error="Age is required" label="Age" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('error', 'Age is required');
  });

  it('passes hint prop to web component', () => {
    const { container } = render(
      <NumberField hint="Enter a value between 0 and 120" label="Age" />
    );

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('hint', 'Enter a value between 0 and 120');
  });

  it('passes required prop to web component', () => {
    const { container } = render(<NumberField required label="Age" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('required');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<NumberField ref={ref} label="Test" />);

    expect(ref).toHaveBeenCalled();
  });

  it('passes numeric value as string to web component', () => {
    const { container } = render(<NumberField label="Age" value={25} />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('value', '25');
  });

  it('passes string value to web component', () => {
    const { container } = render(<NumberField label="Age" value="30" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('value', '30');
  });

  it('passes disabled prop to web component', () => {
    const { container } = render(<NumberField disabled label="Age" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('disabled');
  });

  it('passes min prop to web component', () => {
    const { container } = render(<NumberField label="Age" min={0} />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('min', '0');
  });

  it('passes max prop to web component', () => {
    const { container } = render(<NumberField label="Age" max={120} />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('max', '120');
  });

  it('passes step prop to web component', () => {
    const { container } = render(<NumberField label="Amount" step={0.01} />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('step', '0.01');
  });

  it('passes name prop to web component', () => {
    const { container } = render(<NumberField label="Age" name="age" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('name', 'age');
  });

  it('defaults inputmode to decimal', () => {
    const { container } = render(<NumberField label="Amount" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('inputmode', 'decimal');
  });

  it('passes custom inputmode to web component', () => {
    const { container } = render(<NumberField inputmode="numeric" label="Quantity" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('inputmode', 'numeric');
  });

  it('passes success prop to web component', () => {
    const { container } = render(<NumberField label="Age" success="Valid age entered" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('success', 'Valid age entered');
  });

  it('applies additional props to web component', () => {
    const { container } = render(<NumberField data-testid="test-input" label="Test" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('data-testid', 'test-input');
  });

  describe('min/max constraints', () => {
    it('supports min and max together', () => {
      const { container } = render(<NumberField label="Age" max={120} min={0} />);

      const input = container.querySelector('va-text-input');
      expect(input).toHaveAttribute('min', '0');
      expect(input).toHaveAttribute('max', '120');
    });

    it('supports negative min values', () => {
      const { container } = render(<NumberField label="Temperature" min={-273.15} />);

      const input = container.querySelector('va-text-input');
      expect(input).toHaveAttribute('min', '-273.15');
    });

    it('supports decimal step values', () => {
      const { container } = render(<NumberField label="Price" step={0.01} />);

      const input = container.querySelector('va-text-input');
      expect(input).toHaveAttribute('step', '0.01');
    });
  });

  describe('React Hook Form integration', () => {
    it('accepts React Hook Form field props', () => {
      const handleChange = vi.fn();
      const handleBlur = vi.fn();

      const { container } = render(
        <NumberField
          required
          label="Age"
          max={120}
          min={0}
          name="age"
          value={25}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      );

      const input = container.querySelector('va-text-input');
      expect(input).toHaveAttribute('name', 'age');
      expect(input).toHaveAttribute('value', '25');
      expect(input).toHaveAttribute('min', '0');
      expect(input).toHaveAttribute('max', '120');
      expect(input).toHaveAttribute('required');
    });

    it('displays validation error from React Hook Form', () => {
      const { container } = render(
        <NumberField error="Age must be between 0 and 120" label="Age" />
      );

      const input = container.querySelector('va-text-input');
      expect(input).toHaveAttribute('error', 'Age must be between 0 and 120');
    });
  });

  describe('default values', () => {
    it('defaults disabled to false', () => {
      const { container } = render(<NumberField label="Test" />);

      const input = container.querySelector('va-text-input');
      expect(input).not.toHaveAttribute('disabled');
    });

    it('defaults required to false', () => {
      const { container } = render(<NumberField label="Test" />);

      const input = container.querySelector('va-text-input');
      expect(input).not.toHaveAttribute('required');
    });
  });
});
