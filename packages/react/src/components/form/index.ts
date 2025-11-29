/**
 * Form components for building accessible, type-safe forms.
 *
 * This module provides two patterns for form development:
 *
 * 1. **Field primitives** - Low-level building blocks (Field, FieldLabel, etc.)
 *    that work directly with React Hook Form's Controller.
 *
 * 2. **Form components** - Higher-level components (Form, FormField, FormItem, etc.)
 *    following the shadcn/ui pattern with automatic context management.
 *
 * @module form
 *
 * @example Using Form components (recommended)
 * ```tsx
 * import { useForm } from 'react-hook-form';
 * import { zodResolver } from '@hookform/resolvers/zod';
 * import { z } from 'zod';
 * import {
 *   Form,
 *   FormField,
 *   FormItem,
 *   FormLabel,
 *   FormControl,
 *   FormDescription,
 *   FormMessage,
 * } from '@formkit-gov/react';
 * import { TextInputField } from '@formkit-gov/react';
 *
 * const schema = z.object({
 *   email: z.string().email('Invalid email address'),
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
 *             <FormLabel>Email Address</FormLabel>
 *             <FormControl>
 *               <TextInputField {...field} label="Email" />
 *             </FormControl>
 *             <FormDescription>We'll never share your email</FormDescription>
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
 * @example Using Field primitives (for custom layouts)
 * ```tsx
 * import { useForm, Controller } from 'react-hook-form';
 * import { Field, FieldLabel, FieldDescription, FieldError } from '@formkit-gov/react';
 *
 * function CustomForm() {
 *   const form = useForm({ ... });
 *
 *   return (
 *     <form onSubmit={form.handleSubmit(onSubmit)}>
 *       <Controller
 *         name="email"
 *         control={form.control}
 *         render={({ field, fieldState }) => (
 *           <Field data-invalid={fieldState.invalid}>
 *             <FieldLabel htmlFor="email">Email</FieldLabel>
 *             <TextInputField {...field} id="email" label="Email" />
 *             {fieldState.error && <FieldError errors={[fieldState.error]} />}
 *           </Field>
 *         )}
 *       />
 *     </form>
 *   );
 * }
 * ```
 */

// Form components (shadcn/ui pattern with context)
export { Form } from './form';
export type { FormProps } from './form';

export { FormField } from './form-field';
export type { FormFieldProps, FormFieldRenderProps } from './form-field';

export { FormItem } from './form-item';
export type { FormItemProps } from './form-item';

export { FormControl } from './form-control';
export type { FormControlProps } from './form-control';

export { FormLabel } from './form-label';
export type { FormLabelProps } from './form-label';

export { FormDescription } from './form-description';
export type { FormDescriptionProps } from './form-description';

export { FormMessage } from './form-message';
export type { FormMessageProps } from './form-message';

// Form context hooks
export { useFormContext, useFormField } from './form-context';
export type { FormContextValue, FormFieldContextValue, FormItemContextValue } from './form-context';

// Field primitives (low-level building blocks)
export {
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

export type {
  FieldProps,
  FieldGroupProps,
  FieldSetProps,
  FieldLegendProps,
  FieldLabelProps,
  FieldContentProps,
  FieldTitleProps,
  FieldDescriptionProps,
  FieldErrorProps,
  FieldSeparatorProps,
} from './field';
