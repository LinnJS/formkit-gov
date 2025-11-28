/**
 * Tests for Field primitives
 *
 * These are simple layout components following shadcn/ui patterns.
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import {
  Field,
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldLabel,
  FieldContent,
  FieldTitle,
  FieldDescription,
  FieldError,
  FieldSeparator,
} from './field';

describe('Field', () => {
  it('renders div element', () => {
    render(<Field data-testid="field">Content</Field>);
    expect(screen.getByTestId('field')).toBeInTheDocument();
  });

  it('has data-slot attribute', () => {
    render(<Field data-testid="field">Content</Field>);
    expect(screen.getByTestId('field')).toHaveAttribute('data-slot', 'field');
  });

  it('defaults to vertical orientation', () => {
    render(<Field data-testid="field">Content</Field>);
    expect(screen.getByTestId('field')).toHaveAttribute('data-orientation', 'vertical');
  });

  it('accepts horizontal orientation', () => {
    render(
      <Field data-testid="field" orientation="horizontal">
        Content
      </Field>
    );
    expect(screen.getByTestId('field')).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Field ref={ref}>Content</Field>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('passes additional props', () => {
    render(
      <Field data-invalid data-testid="field">
        Content
      </Field>
    );
    expect(screen.getByTestId('field')).toHaveAttribute('data-invalid', 'true');
  });

  it('has correct displayName', () => {
    expect(Field.displayName).toBe('Field');
  });
});

describe('FieldGroup', () => {
  it('renders div element', () => {
    render(<FieldGroup data-testid="group">Content</FieldGroup>);
    expect(screen.getByTestId('group')).toBeInTheDocument();
  });

  it('has data-slot attribute', () => {
    render(<FieldGroup data-testid="group">Content</FieldGroup>);
    expect(screen.getByTestId('group')).toHaveAttribute('data-slot', 'field-group');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<FieldGroup ref={ref}>Content</FieldGroup>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('has correct displayName', () => {
    expect(FieldGroup.displayName).toBe('FieldGroup');
  });
});

describe('FieldSet', () => {
  it('renders fieldset element', () => {
    render(<FieldSet data-testid="fieldset">Content</FieldSet>);
    const element = screen.getByTestId('fieldset');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('FIELDSET');
  });

  it('has data-slot attribute', () => {
    render(<FieldSet data-testid="fieldset">Content</FieldSet>);
    expect(screen.getByTestId('fieldset')).toHaveAttribute('data-slot', 'fieldset');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<FieldSet ref={ref}>Content</FieldSet>);
    expect(ref.current).toBeInstanceOf(HTMLFieldSetElement);
  });

  it('has correct displayName', () => {
    expect(FieldSet.displayName).toBe('FieldSet');
  });
});

describe('FieldLegend', () => {
  it('renders legend element', () => {
    render(
      <FieldSet>
        <FieldLegend data-testid="legend">Title</FieldLegend>
      </FieldSet>
    );
    const element = screen.getByTestId('legend');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('LEGEND');
  });

  it('has data-slot attribute', () => {
    render(
      <FieldSet>
        <FieldLegend data-testid="legend">Title</FieldLegend>
      </FieldSet>
    );
    expect(screen.getByTestId('legend')).toHaveAttribute('data-slot', 'legend');
  });

  it('defaults to default variant', () => {
    render(
      <FieldSet>
        <FieldLegend data-testid="legend">Title</FieldLegend>
      </FieldSet>
    );
    expect(screen.getByTestId('legend')).toHaveAttribute('data-variant', 'default');
  });

  it('accepts label variant', () => {
    render(
      <FieldSet>
        <FieldLegend data-testid="legend" variant="label">
          Title
        </FieldLegend>
      </FieldSet>
    );
    expect(screen.getByTestId('legend')).toHaveAttribute('data-variant', 'label');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(
      <FieldSet>
        <FieldLegend ref={ref}>Title</FieldLegend>
      </FieldSet>
    );
    expect(ref.current).toBeInstanceOf(HTMLLegendElement);
  });

  it('has correct displayName', () => {
    expect(FieldLegend.displayName).toBe('FieldLegend');
  });
});

describe('FieldLabel', () => {
  it('renders label element', () => {
    render(<FieldLabel htmlFor="test">Label text</FieldLabel>);
    expect(screen.getByText('Label text').tagName).toBe('LABEL');
  });

  it('has data-slot attribute', () => {
    render(
      <FieldLabel data-testid="label" htmlFor="test">
        Label text
      </FieldLabel>
    );
    expect(screen.getByTestId('label')).toHaveAttribute('data-slot', 'label');
  });

  it('passes htmlFor attribute', () => {
    render(
      <FieldLabel data-testid="label" htmlFor="my-input">
        Label text
      </FieldLabel>
    );
    expect(screen.getByTestId('label')).toHaveAttribute('for', 'my-input');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<FieldLabel ref={ref}>Label text</FieldLabel>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });

  it('has correct displayName', () => {
    expect(FieldLabel.displayName).toBe('FieldLabel');
  });
});

describe('FieldContent', () => {
  it('renders div element', () => {
    render(<FieldContent data-testid="content">Content</FieldContent>);
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('has data-slot attribute', () => {
    render(<FieldContent data-testid="content">Content</FieldContent>);
    expect(screen.getByTestId('content')).toHaveAttribute('data-slot', 'field-content');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<FieldContent ref={ref}>Content</FieldContent>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('has correct displayName', () => {
    expect(FieldContent.displayName).toBe('FieldContent');
  });
});

describe('FieldTitle', () => {
  it('renders div element', () => {
    render(<FieldTitle data-testid="title">Title</FieldTitle>);
    expect(screen.getByTestId('title')).toBeInTheDocument();
  });

  it('has data-slot attribute', () => {
    render(<FieldTitle data-testid="title">Title</FieldTitle>);
    expect(screen.getByTestId('title')).toHaveAttribute('data-slot', 'field-title');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<FieldTitle ref={ref}>Title</FieldTitle>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('has correct displayName', () => {
    expect(FieldTitle.displayName).toBe('FieldTitle');
  });
});

describe('FieldDescription', () => {
  it('renders paragraph element', () => {
    render(<FieldDescription>Description text</FieldDescription>);
    expect(screen.getByText('Description text').tagName).toBe('P');
  });

  it('has data-slot attribute', () => {
    render(<FieldDescription data-testid="desc">Description text</FieldDescription>);
    expect(screen.getByTestId('desc')).toHaveAttribute('data-slot', 'description');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<FieldDescription ref={ref}>Description text</FieldDescription>);
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
  });

  it('has correct displayName', () => {
    expect(FieldDescription.displayName).toBe('FieldDescription');
  });
});

describe('FieldError', () => {
  it('renders error message from errors array', () => {
    render(<FieldError errors={[{ message: 'This field is required' }]} />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('renders multiple error messages', () => {
    render(<FieldError errors={[{ message: 'Error 1' }, { message: 'Error 2' }]} />);
    expect(screen.getByText('Error 1, Error 2')).toBeInTheDocument();
  });

  it('renders children if provided', () => {
    render(<FieldError>Custom error message</FieldError>);
    expect(screen.getByText('Custom error message')).toBeInTheDocument();
  });

  it('returns null when no errors and no children', () => {
    const { container } = render(<FieldError />);
    expect(container.firstChild).toBeNull();
  });

  it('returns null for undefined errors', () => {
    const { container } = render(<FieldError errors={[undefined]} />);
    expect(container.firstChild).toBeNull();
  });

  it('filters out undefined errors', () => {
    render(<FieldError errors={[undefined, { message: 'Valid error' }, undefined]} />);
    expect(screen.getByText('Valid error')).toBeInTheDocument();
  });

  it('has data-slot attribute', () => {
    render(<FieldError data-testid="error" errors={[{ message: 'Error' }]} />);
    expect(screen.getByTestId('error')).toHaveAttribute('data-slot', 'error');
  });

  it('has role=alert attribute', () => {
    render(<FieldError data-testid="error" errors={[{ message: 'Error' }]} />);
    expect(screen.getByTestId('error')).toHaveAttribute('role', 'alert');
  });

  it('has aria-live=polite attribute', () => {
    render(<FieldError data-testid="error" errors={[{ message: 'Error' }]} />);
    expect(screen.getByTestId('error')).toHaveAttribute('aria-live', 'polite');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<FieldError ref={ref}>Error</FieldError>);
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
  });

  it('has correct displayName', () => {
    expect(FieldError.displayName).toBe('FieldError');
  });
});

describe('FieldSeparator', () => {
  it('renders hr element', () => {
    render(<FieldSeparator data-testid="separator" />);
    const element = screen.getByTestId('separator');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('HR');
  });

  it('has data-slot attribute', () => {
    render(<FieldSeparator data-testid="separator" />);
    expect(screen.getByTestId('separator')).toHaveAttribute('data-slot', 'separator');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<FieldSeparator ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLHRElement);
  });

  it('has correct displayName', () => {
    expect(FieldSeparator.displayName).toBe('FieldSeparator');
  });
});

describe('Component composition', () => {
  it('composes Field with FieldLabel and FieldDescription', () => {
    render(
      <Field data-testid="field">
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <input id="email" type="email" />
        <FieldDescription>Enter your email address</FieldDescription>
      </Field>
    );

    expect(screen.getByTestId('field')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Enter your email address')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'email');
  });

  it('composes FieldGroup with multiple Fields', () => {
    render(
      <FieldGroup data-testid="group">
        <Field>
          <FieldLabel htmlFor="first">First name</FieldLabel>
          <input id="first" type="text" />
        </Field>
        <Field>
          <FieldLabel htmlFor="last">Last name</FieldLabel>
          <input id="last" type="text" />
        </Field>
      </FieldGroup>
    );

    expect(screen.getByTestId('group')).toBeInTheDocument();
    expect(screen.getByText('First name')).toBeInTheDocument();
    expect(screen.getByText('Last name')).toBeInTheDocument();
  });

  it('composes FieldSet with FieldLegend', () => {
    render(
      <FieldSet data-testid="fieldset">
        <FieldLegend>Contact Information</FieldLegend>
        <Field>
          <FieldLabel htmlFor="phone">Phone</FieldLabel>
          <input id="phone" type="tel" />
        </Field>
      </FieldSet>
    );

    expect(screen.getByTestId('fieldset')).toBeInTheDocument();
    expect(screen.getByText('Contact Information')).toBeInTheDocument();
  });

  it('composes horizontal Field with FieldContent', () => {
    render(
      <Field data-testid="field" orientation="horizontal">
        <FieldContent>
          <FieldTitle>Email Notifications</FieldTitle>
          <FieldDescription>Receive updates via email</FieldDescription>
        </FieldContent>
        <input type="checkbox" />
      </Field>
    );

    expect(screen.getByTestId('field')).toHaveAttribute('data-orientation', 'horizontal');
    expect(screen.getByText('Email Notifications')).toBeInTheDocument();
    expect(screen.getByText('Receive updates via email')).toBeInTheDocument();
  });
});
