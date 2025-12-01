/**
 * Form component that integrates with React Hook Form
 *
 * @module @formkit-gov/react/components/form
 */

import * as React from 'react';

import { FormProvider } from './form-context';

import type { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form';

/**
 * Props for Form component
 */
export interface FormProps<TFieldValues extends FieldValues = FieldValues> extends Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  'onSubmit'
> {
  /** React Hook Form instance from useForm() */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Accept any resolver context/transformed values
  form: UseFormReturn<TFieldValues, any, any>;
  /** Form submit handler - receives validated data */
  onSubmit?: (data: TFieldValues) => void | Promise<void>;
  /**
   * Callback when form submission fails due to validation errors.
   * Note: React Hook Form's `shouldFocusError: true` (default) automatically
   * focuses the first invalid field. Configure this in useForm() options.
   */
  onValidationError?: (errors: FieldErrors<TFieldValues>) => void;
  /** Children */
  children: React.ReactNode;
}

/**
 * Form wrapper component that integrates with React Hook Form.
 * Provides form context to child components and handles form submission.
 *
 * @example Basic usage
 * ```tsx
 * import { useForm } from 'react-hook-form';
 * import { zodResolver } from '@hookform/resolvers/zod';
 * import { z } from 'zod';
 * import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@formkit-gov/react';
 * import { TextInputField } from '@formkit-gov/react';
 *
 * const schema = z.object({
 *   email: z.string().email('Invalid email'),
 * });
 *
 * function MyForm() {
 *   const form = useForm({
 *     resolver: zodResolver(schema),
 *     defaultValues: { email: '' },
 *   });
 *
 *   return (
 *     <Form form={form} onSubmit={(data) => console.log(data)}>
 *       <FormField
 *         control={form.control}
 *         name="email"
 *         render={({ field, fieldState }) => (
 *           <FormItem>
 *             <FormLabel>Email</FormLabel>
 *             <FormControl>
 *               <TextInputField {...field} label="Email" />
 *             </FormControl>
 *             <FormMessage />
 *           </FormItem>
 *         )}
 *       />
 *       <button type="submit">Submit</button>
 *     </Form>
 *   );
 * }
 * ```
 *
 * @example With error handling
 * ```tsx
 * function MyForm() {
 *   const form = useForm({ ... });
 *
 *   const onSubmit = async (data) => {
 *     try {
 *       await submitToServer(data);
 *     } catch (error) {
 *       form.setError('root', { message: 'Submission failed' });
 *     }
 *   };
 *
 *   return (
 *     <Form form={form} onSubmit={onSubmit}>
 *       ...
 *       {form.formState.errors.root && (
 *         <p role="alert">{form.formState.errors.root.message}</p>
 *       )}
 *     </Form>
 *   );
 * }
 * ```
 *
 * @example With real-time validation (errors clear when input becomes valid)
 * ```tsx
 * function MyForm() {
 *   // Use mode: 'onChange' or 'onBlur' to clear errors when input becomes valid
 *   const form = useForm({
 *     resolver: zodResolver(schema),
 *     mode: 'onBlur', // Validate on blur - clears error when field becomes valid
 *     // or mode: 'onChange' for instant validation as user types
 *   });
 *
 *   return (
 *     <Form form={form} onSubmit={onSubmit}>
 *       ...
 *     </Form>
 *   );
 * }
 * ```
 *
 * @example Handling validation errors
 * ```tsx
 * function MyForm() {
 *   const form = useForm({
 *     // shouldFocusError: true is the default - focuses first invalid field
 *     shouldFocusError: true,
 *   });
 *
 *   return (
 *     <Form
 *       form={form}
 *       onSubmit={onSubmit}
 *       onValidationError={(errors) => {
 *         console.log('Validation failed:', errors);
 *       }}
 *     >
 *       ...
 *     </Form>
 *   );
 * }
 * ```
 */
function FormInner<TFieldValues extends FieldValues = FieldValues>(
  { form, onSubmit, onValidationError, children, ...props }: FormProps<TFieldValues>,
  ref: React.ForwardedRef<HTMLFormElement>
) {
  const handleSubmit = React.useMemo(() => {
    if (!onSubmit) return undefined;
    // React Hook Form's handleSubmit accepts an optional onInvalid callback
    // Note: shouldFocusError (default: true) handles focusing the first error field
    return form.handleSubmit(onSubmit, onValidationError);
  }, [form, onSubmit, onValidationError]);

  return (
    <FormProvider form={form}>
      <form ref={ref} data-slot="form" onSubmit={handleSubmit} {...props}>
        {children}
      </form>
    </FormProvider>
  );
}

/**
 * Form wrapper component with React Hook Form integration
 */
export const Form = React.forwardRef(FormInner) as <TFieldValues extends FieldValues = FieldValues>(
  props: FormProps<TFieldValues> & { ref?: React.ForwardedRef<HTMLFormElement> }
) => React.ReactElement;

// Add displayName for debugging
(Form as React.FC).displayName = 'Form';
