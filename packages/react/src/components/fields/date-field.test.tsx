/**
 * Tests for DateField component
 *
 * Note: VA Design System web components don't render their internal structure
 * in test environments (happy-dom/jsdom). Tests verify that the component
 * correctly passes props to the underlying web component element.
 */

import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { DateField } from './date-field';

describe('DateField', () => {
  it('renders va-date element', () => {
    const { container } = render(<DateField label="Date of birth" />);

    const dateInput = container.querySelector('va-date');
    expect(dateInput).toBeInTheDocument();
  });

  it('passes label prop to web component', () => {
    const { container } = render(<DateField label="Date of birth" />);

    const dateInput = container.querySelector('va-date');
    expect(dateInput).toHaveAttribute('label', 'Date of birth');
  });

  it('passes error prop to web component', () => {
    const { container } = render(<DateField error="Date is required" label="Date of birth" />);

    const dateInput = container.querySelector('va-date');
    expect(dateInput).toHaveAttribute('error', 'Date is required');
  });

  it('passes hint prop to web component', () => {
    const { container } = render(
      <DateField hint="Enter your date of birth" label="Date of birth" />
    );

    const dateInput = container.querySelector('va-date');
    expect(dateInput).toHaveAttribute('hint', 'Enter your date of birth');
  });

  it('passes required prop to web component', () => {
    const { container } = render(<DateField required label="Required date" />);

    const dateInput = container.querySelector('va-date');
    expect(dateInput).toHaveAttribute('required');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<DateField ref={ref} label="Test" />);

    expect(ref).toHaveBeenCalled();
  });

  it('passes value prop to web component', () => {
    const { container } = render(<DateField label="Date" value="1990-01-15" />);

    const dateInput = container.querySelector('va-date');
    expect(dateInput).toHaveAttribute('value', '1990-01-15');
  });

  it('passes name prop to web component', () => {
    const { container } = render(<DateField label="Date" name="dateOfBirth" />);

    const dateInput = container.querySelector('va-date');
    expect(dateInput).toHaveAttribute('name', 'dateOfBirth');
  });

  it('passes disabled prop to web component', () => {
    const { container } = render(<DateField disabled label="Disabled date" />);

    const dateInput = container.querySelector('va-date');
    expect(dateInput).toHaveAttribute('disabled');
  });

  it('passes monthYearOnly prop to web component', () => {
    const { container } = render(<DateField monthYearOnly label="Month and year" />);

    const dateInput = container.querySelector('va-date');
    expect(dateInput).toHaveAttribute('month-year-only');
  });

  it('passes monthOptional prop to web component', () => {
    const { container } = render(<DateField monthOptional monthYearOnly label="Optional month" />);

    const dateInput = container.querySelector('va-date');
    expect(dateInput).toHaveAttribute('month-optional');
  });

  it('passes invalidDay prop to web component', () => {
    const { container } = render(<DateField invalidDay label="Date" />);

    const dateInput = container.querySelector('va-date');
    expect(dateInput).toHaveAttribute('invalid-day');
  });

  it('passes invalidMonth prop to web component', () => {
    const { container } = render(<DateField invalidMonth label="Date" />);

    const dateInput = container.querySelector('va-date');
    expect(dateInput).toHaveAttribute('invalid-month');
  });

  it('passes invalidYear prop to web component', () => {
    const { container } = render(<DateField invalidYear label="Date" />);

    const dateInput = container.querySelector('va-date');
    expect(dateInput).toHaveAttribute('invalid-year');
  });

  it('passes enableAnalytics prop to web component', () => {
    const { container } = render(<DateField enableAnalytics label="Date" />);

    const dateInput = container.querySelector('va-date');
    expect(dateInput).toHaveAttribute('enable-analytics');
  });

  it('passes uswds prop to web component', () => {
    const { container } = render(<DateField uswds label="Date" />);

    const dateInput = container.querySelector('va-date');
    expect(dateInput).toHaveAttribute('uswds');
  });

  it('applies additional props to web component', () => {
    const { container } = render(<DateField data-testid="test-date" label="Test" />);

    const dateInput = container.querySelector('va-date');
    expect(dateInput).toHaveAttribute('data-testid', 'test-date');
  });

  describe('date value formats', () => {
    it('handles ISO date string format', () => {
      const { container } = render(<DateField label="Date" value="2024-03-15" />);

      const dateInput = container.querySelector('va-date');
      expect(dateInput).toHaveAttribute('value', '2024-03-15');
    });

    it('handles different ISO date formats', () => {
      const { container } = render(<DateField label="Date" value="1990-01-01" />);

      const dateInput = container.querySelector('va-date');
      expect(dateInput).toHaveAttribute('value', '1990-01-01');
    });
  });

  describe('React Hook Form integration', () => {
    it('accepts React Hook Form field props', () => {
      const handleChange = vi.fn();
      const handleBlur = vi.fn();

      const { container } = render(
        <DateField
          required
          label="Date of birth"
          name="dateOfBirth"
          value="1990-01-15"
          onBlur={handleBlur}
          onChange={handleChange}
        />
      );

      const dateInput = container.querySelector('va-date');
      expect(dateInput).toHaveAttribute('name', 'dateOfBirth');
      expect(dateInput).toHaveAttribute('value', '1990-01-15');
      expect(dateInput).toHaveAttribute('required');
    });

    it('displays validation error from React Hook Form', () => {
      const { container } = render(
        <DateField error="Date must be in the past" label="Date of birth" />
      );

      const dateInput = container.querySelector('va-date');
      expect(dateInput).toHaveAttribute('error', 'Date must be in the past');
    });
  });

  describe('default values', () => {
    it('defaults disabled to false', () => {
      const { container } = render(<DateField label="Test" />);

      const dateInput = container.querySelector('va-date');
      expect(dateInput).toHaveAttribute('disabled', 'false');
    });

    it('defaults required to false', () => {
      const { container } = render(<DateField label="Test" />);

      const dateInput = container.querySelector('va-date');
      expect(dateInput).toHaveAttribute('required', 'false');
    });

    it('defaults monthYearOnly to false', () => {
      const { container } = render(<DateField label="Test" />);

      const dateInput = container.querySelector('va-date');
      expect(dateInput).toHaveAttribute('month-year-only', 'false');
    });

    it('defaults monthOptional to false', () => {
      const { container } = render(<DateField label="Test" />);

      const dateInput = container.querySelector('va-date');
      expect(dateInput).toHaveAttribute('month-optional', 'false');
    });

    it('defaults invalidDay to false', () => {
      const { container } = render(<DateField label="Test" />);

      const dateInput = container.querySelector('va-date');
      expect(dateInput).toHaveAttribute('invalid-day', 'false');
    });

    it('defaults invalidMonth to false', () => {
      const { container } = render(<DateField label="Test" />);

      const dateInput = container.querySelector('va-date');
      expect(dateInput).toHaveAttribute('invalid-month', 'false');
    });

    it('defaults invalidYear to false', () => {
      const { container } = render(<DateField label="Test" />);

      const dateInput = container.querySelector('va-date');
      expect(dateInput).toHaveAttribute('invalid-year', 'false');
    });

    it('defaults enableAnalytics to false', () => {
      const { container } = render(<DateField label="Test" />);

      const dateInput = container.querySelector('va-date');
      expect(dateInput).toHaveAttribute('enable-analytics', 'false');
    });

    it('defaults uswds to false', () => {
      const { container } = render(<DateField label="Test" />);

      const dateInput = container.querySelector('va-date');
      expect(dateInput).toHaveAttribute('uswds', 'false');
    });
  });
});
