/**
 * FormItem component that provides context for form field accessibility
 *
 * @module @formkit-gov/react/components/form
 */

import * as React from 'react';

import { FormItemProvider } from './form-context';

/**
 * Props for FormItem component
 */
export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Custom ID for the form item (auto-generated if not provided) */
  id?: string;
}

/**
 * FormItem wraps form field components and provides accessibility context.
 * Generates unique IDs for label, description, and error message associations.
 *
 * @example Basic usage
 * ```tsx
 * <FormField
 *   name="email"
 *   render={({ field }) => (
 *     <FormItem>
 *       <FormLabel>Email</FormLabel>
 *       <FormControl>
 *         <TextInputField {...field} label="Email" />
 *       </FormControl>
 *       <FormDescription>We'll never share your email.</FormDescription>
 *       <FormMessage />
 *     </FormItem>
 *   )}
 * />
 * ```
 *
 * @example With custom styling
 * ```tsx
 * <FormItem className="space-y-2">
 *   <FormLabel>Password</FormLabel>
 *   <FormControl>
 *     <TextInputField type="password" {...field} label="Password" />
 *   </FormControl>
 *   <FormMessage />
 * </FormItem>
 * ```
 */
export const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ id, className, ...props }, ref) => {
    return (
      <FormItemProvider id={id}>
        <div ref={ref} className={className} data-slot="form-item" {...props} />
      </FormItemProvider>
    );
  }
);

FormItem.displayName = 'FormItem';
