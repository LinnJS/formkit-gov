/**
 * FormControl component that wraps input elements with accessibility attributes
 *
 * @module @formkit-gov/react/components/form
 */

import * as React from 'react';

import { useFormField } from './form-context';

/**
 * Props for FormControl component
 */
export interface FormControlProps {
  /** Input element to wrap */
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
}

/**
 * FormControl wraps the input element and provides accessibility attributes.
 * Connects the input to its label, description, and error message via ARIA attributes.
 *
 * @example Basic usage
 * ```tsx
 * <FormItem>
 *   <FormLabel>Email</FormLabel>
 *   <FormControl>
 *     <TextInputField {...field} label="Email" />
 *   </FormControl>
 *   <FormMessage />
 * </FormItem>
 * ```
 *
 * @example With description
 * ```tsx
 * <FormItem>
 *   <FormLabel>Password</FormLabel>
 *   <FormControl>
 *     <TextInputField type="password" {...field} label="Password" />
 *   </FormControl>
 *   <FormDescription>Must be at least 8 characters.</FormDescription>
 *   <FormMessage />
 * </FormItem>
 * ```
 */
export const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ children }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

    // Clone the child element and add accessibility attributes
    const child = React.Children.only(children);

    const clonedChild = React.cloneElement(child, {
      ...child.props,
      id: formItemId,
      'aria-describedby': error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId,
      'aria-invalid': !!error,
    });

    return (
      <div ref={ref} data-slot="form-control">
        {clonedChild}
      </div>
    );
  }
);

FormControl.displayName = 'FormControl';
