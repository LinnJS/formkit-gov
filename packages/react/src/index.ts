/**
 * @formkit-gov/react
 *
 * React components for government form applications
 * using the VA Design System.
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
 *   FormMessage,
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
 */

// Form components (shadcn/ui pattern with context)
export {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormDescription,
  FormMessage,
  useFormContext,
  useFormField,
} from './components/form';

export type {
  FormProps,
  FormFieldProps,
  FormFieldRenderProps,
  FormItemProps,
  FormControlProps,
  FormLabelProps,
  FormDescriptionProps,
  FormMessageProps,
  FormContextValue,
  FormFieldContextValue,
  FormItemContextValue,
} from './components/form';

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

// Molecular components
export { FullNameField } from './components/molecules';

export type {
  FullNameFieldProps,
  NameFieldConfig,
  SuffixFieldConfig,
  FullNameValues,
} from './components/molecules';

// Re-export all components
export * from './components';

// VA component types
export type * from './types/va-components';
