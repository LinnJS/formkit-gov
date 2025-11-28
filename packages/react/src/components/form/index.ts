/**
 * Field primitives for building accessible, type-safe forms.
 *
 * These components follow the shadcn/ui composable pattern and work
 * directly with React Hook Form's Controller.
 *
 * @module form
 *
 * @example
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
 *     <form onSubmit={form.handleSubmit(onSubmit)}>
 *       <FieldGroup>
 *         <Controller
 *           name="email"
 *           control={form.control}
 *           render={({ field, fieldState }) => (
 *             <Field data-invalid={fieldState.invalid}>
 *               <FieldLabel htmlFor="email">Email Address</FieldLabel>
 *               <TextInputField {...field} id="email" label="Email" />
 *               <FieldDescription>We'll never share your email</FieldDescription>
 *               {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
