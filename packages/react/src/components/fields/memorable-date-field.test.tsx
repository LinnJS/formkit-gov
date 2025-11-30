/**
 * Tests for MemorableDateField component
 *
 * Note: VA Design System web components don't render their internal structure
 * in test environments (happy-dom/jsdom). Tests verify that the component
 * correctly passes props to the underlying web component element.
 */

import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { MemorableDateField } from './memorable-date-field';

describe('MemorableDateField', () => {
  it('renders va-memorable-date element', () => {
    const { container } = render(<MemorableDateField label="Date of birth" />);

    const input = container.querySelector('va-memorable-date');
    expect(input).toBeInTheDocument();
  });

  it('passes label prop to web component', () => {
    const { container } = render(<MemorableDateField label="Date of birth" />);

    const input = container.querySelector('va-memorable-date');
    expect(input).toHaveAttribute('label', 'Date of birth');
  });

  it('passes error prop to web component', () => {
    const { container } = render(
      <MemorableDateField error="Date is required" label="Date of birth" />
    );

    const input = container.querySelector('va-memorable-date');
    expect(input).toHaveAttribute('error', 'Date is required');
  });

  it('passes hint prop to web component', () => {
    const { container } = render(
      <MemorableDateField hint="For example: January 15, 1990" label="Date of birth" />
    );

    const input = container.querySelector('va-memorable-date');
    expect(input).toHaveAttribute('hint', 'For example: January 15, 1990');
  });

  it('passes required prop to web component', () => {
    const { container } = render(<MemorableDateField required label="Date of birth" />);

    const input = container.querySelector('va-memorable-date');
    // React 19: boolean true renders as presence attribute
    expect(input).toHaveAttribute('required');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<MemorableDateField ref={ref} label="Test" />);

    expect(ref).toHaveBeenCalled();
  });

  it('passes value prop to web component', () => {
    const { container } = render(<MemorableDateField label="Date" value="1990-01-15" />);

    const input = container.querySelector('va-memorable-date');
    expect(input).toHaveAttribute('value', '1990-01-15');
  });

  it('passes disabled prop to web component', () => {
    const { container } = render(<MemorableDateField disabled label="Disabled" />);

    const input = container.querySelector('va-memorable-date');
    // React 19: boolean true renders as presence attribute
    expect(input).toHaveAttribute('disabled');
  });

  it('passes name prop to web component', () => {
    const { container } = render(<MemorableDateField label="Field" name="birthDate" />);

    const input = container.querySelector('va-memorable-date');
    expect(input).toHaveAttribute('name', 'birthDate');
  });

  it('passes monthSelect prop to web component', () => {
    const { container } = render(<MemorableDateField monthSelect label="Date" />);

    const input = container.querySelector('va-memorable-date');
    // React 19: boolean true renders as presence attribute
    expect(input).toHaveAttribute('month-select');
  });

  it('passes uswds prop to web component', () => {
    const { container } = render(<MemorableDateField uswds label="Date" />);

    const input = container.querySelector('va-memorable-date');
    // React 19: boolean true renders as presence attribute
    expect(input).toHaveAttribute('uswds');
  });

  it('applies additional props to web component', () => {
    const { container } = render(<MemorableDateField data-testid="test-date" label="Test" />);

    const input = container.querySelector('va-memorable-date');
    expect(input).toHaveAttribute('data-testid', 'test-date');
  });

  describe('date value handling', () => {
    it('accepts YYYY-MM-DD format', () => {
      const { container } = render(<MemorableDateField label="Date" value="1990-01-15" />);

      const input = container.querySelector('va-memorable-date');
      expect(input).toHaveAttribute('value', '1990-01-15');
    });

    it('handles empty value', () => {
      const { container } = render(<MemorableDateField label="Date" value="" />);

      const input = container.querySelector('va-memorable-date');
      expect(input).toHaveAttribute('value', '');
    });
  });

  describe('React Hook Form integration', () => {
    it('accepts React Hook Form field props', () => {
      const handleChange = vi.fn();
      const handleBlur = vi.fn();

      const { container } = render(
        <MemorableDateField
          required
          label="Date of birth"
          name="birthDate"
          value="1990-01-15"
          onBlur={handleBlur}
          onChange={handleChange}
        />
      );

      const input = container.querySelector('va-memorable-date');
      expect(input).toHaveAttribute('name', 'birthDate');
      expect(input).toHaveAttribute('value', '1990-01-15');
      // React 19: boolean true renders as presence attribute
      expect(input).toHaveAttribute('required');
    });

    it('displays validation error from React Hook Form', () => {
      const { container } = render(
        <MemorableDateField error="Enter a valid date" label="Date of birth" />
      );

      const input = container.querySelector('va-memorable-date');
      expect(input).toHaveAttribute('error', 'Enter a valid date');
    });
  });

  describe('default values', () => {
    it('defaults disabled to false', () => {
      const { container } = render(<MemorableDateField label="Test" />);

      const input = container.querySelector('va-memorable-date');
      // React 18: false boolean props render as attribute="false" on custom elements
      expect(input).toHaveAttribute('disabled', 'false');
    });

    it('defaults required to false', () => {
      const { container } = render(<MemorableDateField label="Test" />);

      const input = container.querySelector('va-memorable-date');
      // React 18: false boolean props render as attribute="false" on custom elements
      expect(input).toHaveAttribute('required', 'false');
    });

    it('defaults monthSelect to false', () => {
      const { container } = render(<MemorableDateField label="Test" />);

      const input = container.querySelector('va-memorable-date');
      // React 18: false boolean props render as attribute="false" on custom elements
      expect(input).toHaveAttribute('month-select', 'false');
    });

    it('defaults uswds to false', () => {
      const { container } = render(<MemorableDateField label="Test" />);

      const input = container.querySelector('va-memorable-date');
      // React 18: false boolean props render as attribute="false" on custom elements
      expect(input).toHaveAttribute('uswds', 'false');
    });
  });
});
