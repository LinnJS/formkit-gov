/**
 * FormField component that wraps React Hook Form's Controller
 *
 * @module @formkit-gov/react/components/form
 */

import * as React from 'react';
import { Controller } from 'react-hook-form';

import { FormFieldProvider, useFormContext } from './form-context';

import type {
  Control,
  ControllerFieldState,
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseFormStateReturn,
} from 'react-hook-form';

/**
 * Render props provided to FormField render function
 */
export interface FormFieldRenderProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  /** Field props to spread on input (name, value, onChange, onBlur, ref) */
  field: ControllerRenderProps<TFieldValues, TName>;
  /** Field state (error, invalid, isDirty, isTouched) */
  fieldState: ControllerFieldState;
  /** Form state (isSubmitting, isValid, errors, etc.) */
  formState: UseFormStateReturn<TFieldValues>;
}

/**
 * Props for FormField component
 */
export interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, 'render'> {
  /** Field name - must match a key in your form schema */
  name: TName;
  /** Control from useForm() - optional if Form wrapper provides context */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Accept any resolver context/transformed values
  control?: Control<TFieldValues, any, any>;
  /** Render function that receives field and state props */
  render: (props: FormFieldRenderProps<TFieldValues, TName>) => React.ReactElement;
}

/**
 * FormField wraps React Hook Form's Controller to provide field context.
 * Use with FormItem, FormLabel, FormControl, and FormMessage for a complete form field.
 *
 * @example Basic usage
 * ```tsx
 * <FormField
 *   control={form.control}
 *   name="email"
 *   render={({ field, fieldState }) => (
 *     <FormItem>
 *       <FormLabel>Email</FormLabel>
 *       <FormControl>
 *         <TextInputField {...field} label="Email" error={fieldState.error?.message} />
 *       </FormControl>
 *       <FormMessage />
 *     </FormItem>
 *   )}
 * />
 * ```
 *
 * @example With validation rules
 * ```tsx
 * <FormField
 *   control={form.control}
 *   name="username"
 *   rules={{
 *     required: 'Username is required',
 *     minLength: { value: 3, message: 'At least 3 characters' },
 *   }}
 *   render={({ field, fieldState }) => (
 *     <FormItem>
 *       <FormControl>
 *         <TextInputField
 *           {...field}
 *           label="Username"
 *           error={fieldState.error?.message}
 *           required
 *         />
 *       </FormControl>
 *     </FormItem>
 *   )}
 * />
 * ```
 *
 * @example Using form context (no explicit control needed)
 * ```tsx
 * <Form form={form} onSubmit={onSubmit}>
 *   <FormField
 *     name="email"
 *     render={({ field }) => (
 *       <TextInputField {...field} label="Email" />
 *     )}
 *   />
 * </Form>
 * ```
 */
export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, control: controlProp, render, ...props }: FormFieldProps<TFieldValues, TName>) {
  // Always try to get context (hooks must be called unconditionally)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Accept any resolver context
  let contextControl: Control<TFieldValues, any, any> | undefined;
  try {
    const context = useFormContext<TFieldValues>();
    contextControl = context.form.control;
  } catch {
    // Context not available - that's ok if control prop is provided
    contextControl = undefined;
  }

  // Use prop if provided, otherwise fall back to context
  const control = controlProp ?? contextControl;

  // Ensure we have a control from either source
  if (!control) {
    throw new Error(
      'FormField requires either a control prop or to be wrapped in a Form component'
    );
  }

  return (
    <FormFieldProvider name={name}>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState, formState }) => render({ field, fieldState, formState })}
        {...props}
      />
    </FormFieldProvider>
  );
}

FormField.displayName = 'FormField';
