/**
 * FormLabel component that provides accessible label for form fields
 *
 * @module @formkit-gov/react/components/form
 */

import * as React from 'react';

import { useFormField } from './form-context';

/**
 * Props for FormLabel component
 */
export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Whether the field is required */
  required?: boolean;
}

/**
 * FormLabel provides an accessible label for form fields.
 * Automatically associates with the input via the FormItem context.
 *
 * @example Basic usage
 * ```tsx
 * <FormItem>
 *   <FormLabel>Email Address</FormLabel>
 *   <FormControl>
 *     <TextInputField {...field} label="Email" />
 *   </FormControl>
 * </FormItem>
 * ```
 *
 * @example Required field
 * ```tsx
 * <FormItem>
 *   <FormLabel required>Full Name</FormLabel>
 *   <FormControl>
 *     <TextInputField {...field} label="Full Name" required />
 *   </FormControl>
 * </FormItem>
 * ```
 *
 * @example With custom styling on error
 * ```tsx
 * <FormItem>
 *   <FormLabel className={fieldState.error ? 'text-red-500' : ''}>
 *     Username
 *   </FormLabel>
 *   <FormControl>
 *     <TextInputField {...field} label="Username" />
 *   </FormControl>
 * </FormItem>
 * ```
 */
export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ required, children, ...props }, ref) => {
    const { error, formItemId } = useFormField();

    return (
      <label
        ref={ref}
        data-error={error ? '' : undefined}
        data-required={required ? '' : undefined}
        data-slot="form-label"
        htmlFor={formItemId}
        {...props}
      >
        {children}
        {required && (
          <span aria-hidden="true" data-slot="required-indicator">
            {' '}
            *
          </span>
        )}
      </label>
    );
  }
);

FormLabel.displayName = 'FormLabel';
