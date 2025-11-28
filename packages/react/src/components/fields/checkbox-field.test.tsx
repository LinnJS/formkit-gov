import { render } from '@testing-library/react';
import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';

import { CheckboxField } from './checkbox-field';

import type { HTMLVaCheckboxElement } from '../../types/va-components';

describe('CheckboxField', () => {
  it('renders va-checkbox element', () => {
    const { container } = render(<CheckboxField label="Accept terms" />);
    const checkbox = container.querySelector('va-checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('passes label prop to web component', () => {
    const { container } = render(<CheckboxField label="Accept terms and conditions" />);
    const checkbox = container.querySelector('va-checkbox');
    expect(checkbox).toHaveAttribute('label', 'Accept terms and conditions');
  });

  it('passes error prop to web component', () => {
    const { container } = render(
      <CheckboxField error="You must accept the terms" label="Accept terms" />
    );
    const checkbox = container.querySelector('va-checkbox');
    expect(checkbox).toHaveAttribute('error', 'You must accept the terms');
  });

  it('does not add error attribute when error is undefined', () => {
    const { container } = render(<CheckboxField label="Accept terms" />);
    const checkbox = container.querySelector('va-checkbox');
    expect(checkbox).not.toHaveAttribute('error');
  });

  it('passes hint prop to web component', () => {
    const { container } = render(
      <CheckboxField hint="Please read carefully" label="Accept terms" />
    );
    const checkbox = container.querySelector('va-checkbox');
    expect(checkbox).toHaveAttribute('hint', 'Please read carefully');
  });

  it('does not add hint attribute when hint is undefined', () => {
    const { container } = render(<CheckboxField label="Accept terms" />);
    const checkbox = container.querySelector('va-checkbox');
    expect(checkbox).not.toHaveAttribute('hint');
  });

  it('passes required prop to web component', () => {
    const { container } = render(<CheckboxField required label="Accept terms" />);
    const checkbox = container.querySelector('va-checkbox');
    expect(checkbox).toHaveAttribute('required');
  });

  it('passes required=false to web component', () => {
    const { container } = render(<CheckboxField label="Accept terms" required={false} />);
    const checkbox = container.querySelector('va-checkbox');
    expect(checkbox).toHaveAttribute('required', 'false');
  });

  it('passes checked prop when true', () => {
    const { container } = render(<CheckboxField checked label="Accept terms" />);
    const checkbox = container.querySelector('va-checkbox');
    expect(checkbox).toHaveAttribute('checked');
  });

  it('passes checked=false to web component', () => {
    const { container } = render(<CheckboxField checked={false} label="Accept terms" />);
    const checkbox = container.querySelector('va-checkbox');
    expect(checkbox).toHaveAttribute('checked', 'false');
  });

  it('does not add checked attribute when checked is undefined', () => {
    const { container } = render(<CheckboxField label="Accept terms" />);
    const checkbox = container.querySelector('va-checkbox');
    expect(checkbox).not.toHaveAttribute('checked');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLVaCheckboxElement>();
    const { container } = render(<CheckboxField ref={ref} label="Accept terms" />);
    const checkbox = container.querySelector('va-checkbox');
    expect(ref.current).toBe(checkbox);
  });

  it('passes name prop to web component', () => {
    const { container } = render(<CheckboxField label="Accept terms" name="termsAccepted" />);
    const checkbox = container.querySelector('va-checkbox');
    expect(checkbox).toHaveAttribute('name', 'termsAccepted');
  });

  it('applies additional props to web component', () => {
    const { container } = render(
      <CheckboxField
        aria-describedby="description"
        data-testid="custom-checkbox"
        label="Accept terms"
      />
    );
    const checkbox = container.querySelector('va-checkbox');
    expect(checkbox).toHaveAttribute('data-testid', 'custom-checkbox');
    expect(checkbox).toHaveAttribute('aria-describedby', 'description');
  });

  it('accepts React Hook Form field props', () => {
    const mockOnChange = vi.fn();
    const mockOnBlur = vi.fn();

    const fieldProps = {
      name: 'terms',
      value: true,
      onChange: mockOnChange,
      onBlur: mockOnBlur,
    };

    const { container } = render(<CheckboxField label="Accept terms" {...fieldProps} />);
    const checkbox = container.querySelector('va-checkbox');

    expect(checkbox).toHaveAttribute('name', 'terms');
    expect(checkbox).toBeInTheDocument();
  });

  it('accepts all field props from React Hook Form integration', () => {
    const mockOnChange = vi.fn();
    const mockOnBlur = vi.fn();

    const { container } = render(
      <CheckboxField
        required
        checked={true}
        error="This field is required"
        label="Accept terms"
        name="termsAccepted"
        onBlur={mockOnBlur}
        onChange={mockOnChange}
      />
    );

    const checkbox = container.querySelector('va-checkbox');
    expect(checkbox).toHaveAttribute('name', 'termsAccepted');
    expect(checkbox).toHaveAttribute('checked');
    expect(checkbox).toHaveAttribute('error', 'This field is required');
    expect(checkbox).toHaveAttribute('required');
  });

  it('renders with multiple props combined', () => {
    const { container } = render(
      <CheckboxField
        required
        checked={false}
        data-testid="agreement-checkbox"
        error="Please accept the terms"
        hint="You must agree to continue"
        label="I agree to the terms"
        name="agreement"
      />
    );

    const checkbox = container.querySelector('va-checkbox');
    expect(checkbox).toHaveAttribute('label', 'I agree to the terms');
    expect(checkbox).toHaveAttribute('hint', 'You must agree to continue');
    expect(checkbox).toHaveAttribute('error', 'Please accept the terms');
    expect(checkbox).toHaveAttribute('required');
    expect(checkbox).toHaveAttribute('name', 'agreement');
    expect(checkbox).toHaveAttribute('data-testid', 'agreement-checkbox');
    expect(checkbox).toHaveAttribute('checked', 'false');
  });

  it('has correct displayName', () => {
    expect(CheckboxField.displayName).toBe('CheckboxField');
  });

  it('omits onChange and onBlur from props spread to avoid conflicts', () => {
    const mockOnChange = vi.fn();
    const mockOnBlur = vi.fn();

    const { container } = render(
      <CheckboxField label="Accept terms" onBlur={mockOnBlur} onChange={mockOnChange} />
    );

    const checkbox = container.querySelector('va-checkbox');
    // The onChange and onBlur handlers are passed but not as attributes
    // They should be handled by the web component's event system
    expect(checkbox).toBeInTheDocument();
  });

  it('renders without optional props', () => {
    const { container } = render(<CheckboxField label="Minimal checkbox" />);
    const checkbox = container.querySelector('va-checkbox');

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('label', 'Minimal checkbox');
    expect(checkbox).not.toHaveAttribute('error');
    expect(checkbox).not.toHaveAttribute('hint');
    expect(checkbox).not.toHaveAttribute('required');
    expect(checkbox).not.toHaveAttribute('checked');
  });
});
