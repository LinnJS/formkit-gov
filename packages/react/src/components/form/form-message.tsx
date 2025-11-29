/**
 * FormMessage component that displays validation error messages
 *
 * @module @formkit-gov/react/components/form
 */

import * as React from 'react';

import { useFormField } from './form-context';

/**
 * Props for FormMessage component
 */
export interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Custom message to display (overrides field error) */
  children?: React.ReactNode;
}

/**
 * FormMessage displays validation error messages for form fields.
 * Automatically displays the error message from React Hook Form validation.
 *
 * @example Basic usage (auto-displays field error)
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
 * @example With custom message
 * ```tsx
 * <FormItem>
 *   <FormControl>
 *     <TextInputField {...field} label="Email" />
 *   </FormControl>
 *   <FormMessage>Please enter a valid email address.</FormMessage>
 * </FormItem>
 * ```
 *
 * @example Conditional rendering
 * ```tsx
 * <FormItem>
 *   <FormControl>
 *     <TextInputField {...field} label="Email" />
 *   </FormControl>
 *   {fieldState.error && (
 *     <FormMessage className="text-red-600" />
 *   )}
 * </FormItem>
 * ```
 */
export const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();

    const message = children ?? error?.message;

    if (!message) {
      return null;
    }

    return (
      <p
        ref={ref}
        aria-live="polite"
        data-slot="form-message"
        id={formMessageId}
        role="alert"
        {...props}
      >
        {message}
      </p>
    );
  }
);

FormMessage.displayName = 'FormMessage';
