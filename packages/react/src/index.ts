/**
 * @formkit-gov/react
 *
 * React components for government form applications
 * using the VA Design System.
 *
 * @example Basic usage with React Hook Form
 * ```tsx
 * import { useForm, Controller } from 'react-hook-form';
 * import { zodResolver } from '@hookform/resolvers/zod';
 * import { z } from 'zod';
 * import {
 *   Field,
 *   FieldGroup,
 *   FieldLabel,
 *   FieldDescription,
 *   FieldError,
 *   TextInputField,
 * } from '@formkit-gov/react';
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
 *     <form onSubmit={form.handleSubmit(console.log)}>
 *       <FieldGroup>
 *         <Controller
 *           name="email"
 *           control={form.control}
 *           render={({ field, fieldState }) => (
 *             <Field data-invalid={fieldState.invalid}>
 *               <TextInputField
 *                 {...field}
 *                 label="Email"
 *                 error={fieldState.error?.message}
 *               />
 *             </Field>
 *           )}
 *         />
 *       </FieldGroup>
 *       <button type="submit">Submit</button>
 *     </form>
 *   );
 * }
 * ```
 */

// Field layout primitives
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
} from './components/form';

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
} from './components/form';

// Field components (VA Design System wrappers)
export { TextInputField, TextareaField, CheckboxField, SelectField } from './components/fields';

export type {
  TextInputFieldProps,
  TextareaFieldProps,
  CheckboxFieldProps,
  SelectFieldProps,
  SelectOption,
} from './components/fields';

// Re-export all components
export * from './components';

// VA component types
export type * from './types/va-components';
