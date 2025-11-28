import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { TextareaField } from './textarea-field';

describe('TextareaField', () => {
  it('renders va-textarea element', () => {
    const { container } = render(<TextareaField label="Description" />);
    const textarea = container.querySelector('va-textarea');
    expect(textarea).toBeInTheDocument();
  });

  it('passes label prop to web component', () => {
    const { container } = render(<TextareaField label="Description" />);
    const textarea = container.querySelector('va-textarea');
    expect(textarea).toHaveAttribute('label', 'Description');
  });

  it('passes error prop to web component', () => {
    const { container } = render(
      <TextareaField error="This field is required" label="Description" />
    );
    const textarea = container.querySelector('va-textarea');
    expect(textarea).toHaveAttribute('error', 'This field is required');
  });

  it('passes hint prop to web component', () => {
    const { container } = render(
      <TextareaField hint="Enter a detailed description" label="Description" />
    );
    const textarea = container.querySelector('va-textarea');
    expect(textarea).toHaveAttribute('hint', 'Enter a detailed description');
  });

  it('passes required prop to web component', () => {
    const { container } = render(<TextareaField required label="Description" />);
    const textarea = container.querySelector('va-textarea');
    expect(textarea).toHaveAttribute('required');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<TextareaField ref={ref} label="Description" />);
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLElement);
  });

  it('passes maxlength prop to web component', () => {
    const { container } = render(<TextareaField label="Description" maxlength={500} />);
    const textarea = container.querySelector('va-textarea');
    expect(textarea).toHaveAttribute('maxlength', '500');
  });

  it('passes value prop to web component', () => {
    const { container } = render(<TextareaField label="Description" value="Test value" />);
    const textarea = container.querySelector('va-textarea');
    expect(textarea).toHaveAttribute('value', 'Test value');
  });

  it('passes name prop to web component', () => {
    const { container } = render(<TextareaField label="Description" name="description" />);
    const textarea = container.querySelector('va-textarea');
    expect(textarea).toHaveAttribute('name', 'description');
  });

  it('applies additional props to web component', () => {
    const { container } = render(
      <TextareaField data-testid="custom-textarea" label="Description" />
    );
    const textarea = container.querySelector('va-textarea');
    expect(textarea).toHaveAttribute('data-testid', 'custom-textarea');
  });

  it('accepts React Hook Form field props', () => {
    const mockOnChange = vi.fn();
    const mockOnBlur = vi.fn();
    const { container } = render(
      <TextareaField
        label="Description"
        name="description"
        value="Form value"
        onBlur={mockOnBlur}
        onChange={mockOnChange}
      />
    );
    const textarea = container.querySelector('va-textarea');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('name', 'description');
    expect(textarea).toHaveAttribute('value', 'Form value');
  });

  it('renders without error when error prop is not provided', () => {
    const { container } = render(<TextareaField label="Description" />);
    const textarea = container.querySelector('va-textarea');
    expect(textarea).not.toHaveAttribute('error');
  });

  it('renders without hint when hint prop is not provided', () => {
    const { container } = render(<TextareaField label="Description" />);
    const textarea = container.querySelector('va-textarea');
    expect(textarea).not.toHaveAttribute('hint');
  });

  it('renders without required attribute when required prop is not provided', () => {
    const { container } = render(<TextareaField label="Description" />);
    const textarea = container.querySelector('va-textarea');
    expect(textarea).not.toHaveAttribute('required');
  });

  it('has correct displayName', () => {
    expect(TextareaField.displayName).toBe('TextareaField');
  });

  it('passes multiple props simultaneously', () => {
    const { container } = render(
      <TextareaField
        required
        data-testid="multi-prop-textarea"
        error="Error message"
        hint="Hint message"
        label="Description"
        maxlength={1000}
        name="fieldName"
        value="Current value"
      />
    );
    const textarea = container.querySelector('va-textarea');
    expect(textarea).toHaveAttribute('label', 'Description');
    expect(textarea).toHaveAttribute('error', 'Error message');
    expect(textarea).toHaveAttribute('hint', 'Hint message');
    expect(textarea).toHaveAttribute('required');
    expect(textarea).toHaveAttribute('maxlength', '1000');
    expect(textarea).toHaveAttribute('value', 'Current value');
    expect(textarea).toHaveAttribute('name', 'fieldName');
    expect(textarea).toHaveAttribute('data-testid', 'multi-prop-textarea');
  });
});
