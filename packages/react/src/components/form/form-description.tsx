/**
 * FormDescription component that provides help text for form fields
 *
 * @module @formkit-gov/react/components/form
 */

import * as React from 'react';

import { useFormField } from './form-context';

/**
 * Props for FormDescription component
 */
export interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Description content */
  children: React.ReactNode;
}

/**
 * FormDescription provides help text or additional context for form fields.
 * Automatically connected to the input via aria-describedby.
 *
 * @example Basic usage
 * ```tsx
 * <FormItem>
 *   <FormLabel>Email</FormLabel>
 *   <FormControl>
 *     <TextInputField {...field} label="Email" />
 *   </FormControl>
 *   <FormDescription>We'll never share your email with anyone.</FormDescription>
 * </FormItem>
 * ```
 *
 * @example With formatting
 * ```tsx
 * <FormItem>
 *   <FormLabel>Password</FormLabel>
 *   <FormControl>
 *     <TextInputField type="password" {...field} label="Password" />
 *   </FormControl>
 *   <FormDescription>
 *     Password must contain:
 *     <ul>
 *       <li>At least 8 characters</li>
 *       <li>One uppercase letter</li>
 *       <li>One number</li>
 *     </ul>
 *   </FormDescription>
 * </FormItem>
 * ```
 */
export const FormDescription = React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  ({ children, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return (
      <p ref={ref} data-slot="form-description" id={formDescriptionId} {...props}>
        {children}
      </p>
    );
  }
);

FormDescription.displayName = 'FormDescription';
