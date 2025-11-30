/**
 * CheckboxGroupField component wrapping VA Design System checkbox-group
 */

import * as React from 'react';

import { createFocusableRef } from './focus-utils';

import type { HTMLVaCheckboxGroupElement } from '../../types/va-components';

/**
 * Option for CheckboxGroupField
 */
export interface CheckboxGroupOption {
  /**
   * Display label for the option
   */
  label: string;
  /**
   * Value for the option
   */
  value: string;
  /**
   * Optional description text for the option
   */
  description?: string;
  /**
   * Whether this option is disabled
   */
  disabled?: boolean;
}

/**
 * Props for CheckboxGroupField component
 */
export interface CheckboxGroupFieldProps extends Omit<
  React.ComponentPropsWithoutRef<'va-checkbox-group'>,
  'value' | 'onChange' | 'onBlur'
> {
  /**
   * Field label (legend for the fieldset)
   */
  label: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Hint text to display below the label
   */
  hint?: string;
  /**
   * Whether the field is required
   */
  required?: boolean;
  /**
   * Whether the field is disabled
   */
  disabled?: boolean;
  /**
   * Field name
   */
  name: string;
  /**
   * Array of selected values
   */
  value?: string[];
  /**
   * Array of checkbox options
   */
  options: CheckboxGroupOption[];
  /**
   * Change event handler - receives array of selected values
   */
  onChange?: (value: string[]) => void;
  /**
   * Blur event handler
   */
  onBlur?: () => void;
}

/**
 * CheckboxGroupField component wrapping VA Design System va-checkbox-group
 *
 * @example
 * ```tsx
 * import { CheckboxGroupField } from '@formkit-gov/react';
 *
 * function MyForm() {
 *   const options = [
 *     { label: 'Email', value: 'email' },
 *     { label: 'Phone', value: 'phone' },
 *     { label: 'Mail', value: 'mail' },
 *   ];
 *
 *   return (
 *     <CheckboxGroupField
 *       label="Preferred contact methods"
 *       options={options}
 *       name="contactMethods"
 *     />
 *   );
 * }
 * ```
 *
 * @example With React Hook Form
 * ```tsx
 * import { useForm } from 'react-hook-form';
 * import { CheckboxGroupField } from '@formkit-gov/react';
 *
 * function MyForm() {
 *   const { control, formState: { errors } } = useForm();
 *
 *   return (
 *     <FormField
 *       control={control}
 *       name="contactMethods"
 *       render={({ field }) => (
 *         <CheckboxGroupField
 *           {...field}
 *           label="Preferred contact methods"
 *           options={contactOptions}
 *           error={errors.contactMethods?.message}
 *         />
 *       )}
 *     />
 *   );
 * }
 * ```
 *
 * @example With descriptions
 * ```tsx
 * <CheckboxGroupField
 *   label="Services"
 *   options={[
 *     { label: 'Healthcare', value: 'healthcare', description: 'Medical and dental benefits' },
 *     { label: 'Education', value: 'education', description: 'GI Bill and training' },
 *   ]}
 *   name="services"
 * />
 * ```
 *
 * @example With hint
 * ```tsx
 * <CheckboxGroupField
 *   label="Benefits"
 *   hint="Select all that apply"
 *   options={benefitOptions}
 *   name="benefits"
 *   required
 * />
 * ```
 */
export const CheckboxGroupField = React.forwardRef<
  HTMLVaCheckboxGroupElement,
  CheckboxGroupFieldProps
>(
  (
    {
      label,
      error,
      hint,
      required = false,
      disabled = false,
      name,
      value = [],
      options,
      onChange,
      onBlur,
      ...props
    },
    ref
  ) => {
    const handleChange = React.useCallback(
      (event: Event) => {
        if (onChange) {
          const customEvent = event as CustomEvent<{ value: string[] }>;
          const selectedValues = customEvent.detail?.value || [];
          onChange(selectedValues);
        }
      },
      [onChange]
    );

    const handleBlur = React.useCallback(() => {
      if (onBlur) {
        onBlur();
      }
    }, [onBlur]);

    // Create a focusable ref that handles shadow DOM focus
    // For checkbox group, focus the first checkbox's input
    const focusableRef = createFocusableRef(ref, 'va-checkbox input, input[type="checkbox"]');

    // Use a local ref to attach event listeners
    const elementRef = React.useRef<HTMLVaCheckboxGroupElement | null>(null);

    const combinedRef = React.useCallback(
      (element: HTMLVaCheckboxGroupElement | null) => {
        elementRef.current = element;
        focusableRef(element);
      },
      [focusableRef]
    );

    React.useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      if (onChange) {
        element.addEventListener('vaChange', handleChange);
      }
      if (onBlur) {
        element.addEventListener('blur', handleBlur);
      }

      return () => {
        if (onChange) {
          element.removeEventListener('vaChange', handleChange);
        }
        if (onBlur) {
          element.removeEventListener('blur', handleBlur);
        }
      };
    }, [onChange, onBlur, handleChange, handleBlur]);

    // Render checkbox options
    const checkboxElements = options.map(option =>
      React.createElement('va-checkbox', {
        key: option.value,
        label: option.label,
        value: option.value,
        description: option.description,
        disabled: disabled || option.disabled,
        checked: value.includes(option.value),
      })
    );

    return React.createElement(
      'va-checkbox-group',
      {
        ref: combinedRef,
        label,
        error: error || undefined,
        hint,
        required,
        name,
        ...props,
      },
      checkboxElements
    );
  }
);

CheckboxGroupField.displayName = 'CheckboxGroupField';
