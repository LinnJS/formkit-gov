/**
 * Form context providers and hooks for React Hook Form integration
 *
 * @module @formkit-gov/react/components/form
 */

import * as React from 'react';

import type {
  Control,
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseFormReturn,
  UseFormStateReturn,
} from 'react-hook-form';

/**
 * Form context value providing access to the form instance
 */
export interface FormContextValue<TFieldValues extends FieldValues = FieldValues> {
  /** React Hook Form instance */
  form: UseFormReturn<TFieldValues>;
}

/**
 * FormField context value providing field name for child components
 */
export interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  /** Field name */
  name: TName;
}

/**
 * FormItem context value providing unique IDs for accessibility
 */
export interface FormItemContextValue {
  /** Unique ID for the form item */
  id: string;
}

/**
 * Render props provided to FormField render function
 */
export interface FormFieldRenderProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  /** Field props from Controller */
  field: ControllerRenderProps<TFieldValues, TName>;
  /** Field state from Controller */
  fieldState: ControllerFieldState;
  /** Form state from Controller */
  formState: UseFormStateReturn<TFieldValues>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Generic context requires any
const FormContext = React.createContext<FormContextValue<any> | null>(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Generic context requires any
const FormFieldContext = React.createContext<FormFieldContextValue<any, any> | null>(null);

const FormItemContext = React.createContext<FormItemContextValue | null>(null);

/**
 * Hook to access form context
 *
 * @returns Form context value
 * @throws Error if used outside of Form component
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { form } = useFormContext();
 *   const { formState: { errors } } = form;
 *   return <div>{Object.keys(errors).length} errors</div>;
 * }
 * ```
 */
export function useFormContext<TFieldValues extends FieldValues = FieldValues>() {
  const context = React.useContext(FormContext) as FormContextValue<TFieldValues> | null;

  if (!context) {
    throw new Error('useFormContext must be used within a Form component');
  }

  return context;
}

/**
 * Hook to access form field context and state
 *
 * @returns Object containing field name, id, and state information
 * @throws Error if used outside of FormField or FormItem
 *
 * @example
 * ```tsx
 * function CustomInput() {
 *   const { name, id, error, formItemId, formDescriptionId, formMessageId } = useFormField();
 *   return <input id={formItemId} aria-describedby={formDescriptionId} aria-invalid={!!error} />;
 * }
 * ```
 */
export function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const formContext = React.useContext(FormContext);

  if (!fieldContext) {
    throw new Error('useFormField must be used within a FormField component');
  }

  if (!itemContext) {
    throw new Error('useFormField must be used within a FormItem component');
  }

  const { name } = fieldContext;
  const { id } = itemContext;

  // Get field state from form
  const fieldState = formContext?.form.getFieldState(name, formContext.form.formState);

  return {
    id,
    name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    error: fieldState?.error,
    invalid: fieldState?.invalid ?? false,
    isDirty: fieldState?.isDirty ?? false,
    isTouched: fieldState?.isTouched ?? false,
  };
}

/**
 * Props for FormProvider component
 */
export interface FormProviderProps<TFieldValues extends FieldValues = FieldValues> {
  /** React Hook Form instance */
  form: UseFormReturn<TFieldValues>;
  /** Children */
  children: React.ReactNode;
}

/**
 * Provides form context to child components
 *
 * @internal Used by Form component
 */
export function FormProvider<TFieldValues extends FieldValues = FieldValues>({
  form,
  children,
}: FormProviderProps<TFieldValues>) {
  const value = React.useMemo(() => ({ form }), [form]);
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

/**
 * Props for FormFieldProvider component
 */
export interface FormFieldProviderProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  /** Field name */
  name: TName;
  /** Control from useForm */
  control?: Control<TFieldValues>;
  /** Children */
  children: React.ReactNode;
}

/**
 * Provides field context to child components
 *
 * @internal Used by FormField component
 */
export function FormFieldProvider<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, children }: FormFieldProviderProps<TFieldValues, TName>) {
  const value = React.useMemo(() => ({ name }), [name]);
  return <FormFieldContext.Provider value={value}>{children}</FormFieldContext.Provider>;
}

/**
 * Props for FormItemProvider component
 */
export interface FormItemProviderProps {
  /** Optional custom ID */
  id?: string | undefined;
  /** Children */
  children: React.ReactNode;
}

/**
 * Provides item context with unique ID to child components
 *
 * @internal Used by FormItem component
 */
export function FormItemProvider({ id: providedId, children }: FormItemProviderProps) {
  const generatedId = React.useId();
  const id = providedId ?? generatedId;
  const value = React.useMemo(() => ({ id }), [id]);
  return <FormItemContext.Provider value={value}>{children}</FormItemContext.Provider>;
}

// Export contexts for advanced use cases
export { FormContext, FormFieldContext, FormItemContext };
