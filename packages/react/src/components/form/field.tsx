/**
 * Field primitives for form layout
 * Following shadcn/ui composable patterns for use with React Hook Form
 *
 * @module @formkit-gov/react/components/form
 */

import * as React from 'react';

import type { FieldError as RHFFieldError } from 'react-hook-form';

/**
 * Props for Field component
 */
export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Field orientation
   * @default 'vertical'
   */
  orientation?: 'horizontal' | 'vertical';
}

/**
 * Field container component for form fields.
 * Use with Controller from react-hook-form.
 *
 * @example
 * ```tsx
 * <Controller
 *   name="email"
 *   control={form.control}
 *   render={({ field, fieldState }) => (
 *     <Field data-invalid={fieldState.invalid}>
 *       <FieldLabel htmlFor="email">Email</FieldLabel>
 *       <TextInputField {...field} id="email" />
 *       <FieldDescription>We'll never share your email.</FieldDescription>
 *       {fieldState.error && <FieldError errors={[fieldState.error]} />}
 *     </Field>
 *   )}
 * />
 * ```
 */
export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ orientation = 'vertical', ...props }, ref) => {
    return <div ref={ref} data-orientation={orientation} data-slot="field" {...props} />;
  }
);
Field.displayName = 'Field';

/**
 * Props for FieldGroup component
 */
export interface FieldGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Groups multiple Field components together.
 *
 * @example
 * ```tsx
 * <form onSubmit={form.handleSubmit(onSubmit)}>
 *   <FieldGroup>
 *     <Field>...</Field>
 *     <Field>...</Field>
 *   </FieldGroup>
 * </form>
 * ```
 */
export const FieldGroup = React.forwardRef<HTMLDivElement, FieldGroupProps>((props, ref) => {
  return <div ref={ref} data-slot="field-group" {...props} />;
});
FieldGroup.displayName = 'FieldGroup';

/**
 * Props for FieldSet component
 */
export interface FieldSetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {}

/**
 * Fieldset element for grouping related form fields.
 * Use with FieldLegend for accessible grouping.
 *
 * @example
 * ```tsx
 * <FieldSet>
 *   <FieldLegend>Contact Information</FieldLegend>
 *   <Field>...</Field>
 *   <Field>...</Field>
 * </FieldSet>
 * ```
 */
export const FieldSet = React.forwardRef<HTMLFieldSetElement, FieldSetProps>((props, ref) => {
  return <fieldset ref={ref} data-slot="fieldset" {...props} />;
});
FieldSet.displayName = 'FieldSet';

/**
 * Props for FieldLegend component
 */
export interface FieldLegendProps extends React.HTMLAttributes<HTMLLegendElement> {
  /**
   * Visual variant for the legend
   * @default 'default'
   */
  variant?: 'default' | 'label';
}

/**
 * Legend element for FieldSet.
 *
 * @example
 * ```tsx
 * <FieldSet>
 *   <FieldLegend>Subscription Plan</FieldLegend>
 *   ...
 * </FieldSet>
 * ```
 */
export const FieldLegend = React.forwardRef<HTMLLegendElement, FieldLegendProps>(
  ({ variant = 'default', ...props }, ref) => {
    return <legend ref={ref} data-slot="legend" data-variant={variant} {...props} />;
  }
);
FieldLegend.displayName = 'FieldLegend';

/**
 * Props for FieldLabel component
 */
export interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

/**
 * Label element for form fields.
 *
 * @example
 * ```tsx
 * <Field>
 *   <FieldLabel htmlFor="firstName">First Name</FieldLabel>
 *   <TextInputField id="firstName" {...field} />
 * </Field>
 * ```
 */
export const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>((props, ref) => {
  // eslint-disable-next-line jsx-a11y/label-has-associated-control -- This is a primitive; htmlFor is provided by the consumer
  return <label ref={ref} data-slot="label" {...props} />;
});
FieldLabel.displayName = 'FieldLabel';

/**
 * Props for FieldContent component
 */
export interface FieldContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Content wrapper within a Field.
 * Useful for horizontal layouts with label/description on one side.
 *
 * @example
 * ```tsx
 * <Field orientation="horizontal">
 *   <FieldContent>
 *     <FieldTitle>Email Notifications</FieldTitle>
 *     <FieldDescription>Receive updates via email</FieldDescription>
 *   </FieldContent>
 *   <Switch {...field} />
 * </Field>
 * ```
 */
export const FieldContent = React.forwardRef<HTMLDivElement, FieldContentProps>((props, ref) => {
  return <div ref={ref} data-slot="field-content" {...props} />;
});
FieldContent.displayName = 'FieldContent';

/**
 * Props for FieldTitle component
 */
export interface FieldTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Title within FieldContent.
 *
 * @example
 * ```tsx
 * <FieldContent>
 *   <FieldTitle>Basic Plan</FieldTitle>
 *   <FieldDescription>For individuals and small teams</FieldDescription>
 * </FieldContent>
 * ```
 */
export const FieldTitle = React.forwardRef<HTMLDivElement, FieldTitleProps>((props, ref) => {
  return <div ref={ref} data-slot="field-title" {...props} />;
});
FieldTitle.displayName = 'FieldTitle';

/**
 * Props for FieldDescription component
 */
export interface FieldDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

/**
 * Description text for a form field.
 *
 * @example
 * ```tsx
 * <Field>
 *   <FieldLabel htmlFor="email">Email</FieldLabel>
 *   <TextInputField id="email" {...field} />
 *   <FieldDescription>We'll never share your email.</FieldDescription>
 * </Field>
 * ```
 */
export const FieldDescription = React.forwardRef<HTMLParagraphElement, FieldDescriptionProps>(
  (props, ref) => {
    return <p ref={ref} data-slot="description" {...props} />;
  }
);
FieldDescription.displayName = 'FieldDescription';

/**
 * Props for FieldError component
 */
export interface FieldErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Array of field errors from react-hook-form
   */
  errors?: (RHFFieldError | undefined)[];
}

/**
 * Error message display for form fields.
 * Accepts errors array from react-hook-form's fieldState.
 *
 * @example
 * ```tsx
 * <Controller
 *   name="email"
 *   control={form.control}
 *   render={({ field, fieldState }) => (
 *     <Field>
 *       <TextInputField {...field} />
 *       {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
 *     </Field>
 *   )}
 * />
 * ```
 */
export const FieldError = React.forwardRef<HTMLParagraphElement, FieldErrorProps>(
  ({ errors, children, ...props }, ref) => {
    const errorMessages = errors
      ?.filter((error): error is RHFFieldError => !!error?.message)
      .map(error => error.message);

    const body = children || errorMessages?.join(', ');

    if (!body) {
      return null;
    }

    return (
      <p ref={ref} aria-live="polite" data-slot="error" role="alert" {...props}>
        {body}
      </p>
    );
  }
);
FieldError.displayName = 'FieldError';

/**
 * Props for FieldSeparator component
 */
export interface FieldSeparatorProps extends React.HTMLAttributes<HTMLHRElement> {}

/**
 * Visual separator between form sections.
 *
 * @example
 * ```tsx
 * <FieldGroup>
 *   <Field>...</Field>
 *   <FieldSeparator />
 *   <Field>...</Field>
 * </FieldGroup>
 * ```
 */
export const FieldSeparator = React.forwardRef<HTMLHRElement, FieldSeparatorProps>((props, ref) => {
  return <hr ref={ref} data-slot="separator" {...props} />;
});
FieldSeparator.displayName = 'FieldSeparator';
