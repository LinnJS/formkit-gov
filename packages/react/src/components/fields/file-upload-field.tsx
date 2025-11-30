/**
 * FileUploadField component wrapping VA Design System file input
 *
 * @module @formkit-gov/react/components/fields
 */

import * as React from 'react';

import { createFocusableRef } from './focus-utils';

/**
 * VA Design System file input element
 */
interface HTMLVaFileInputElement extends HTMLElement {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  name?: string;
  disabled?: boolean;
  accept?: string;
  multiple?: boolean;
}

/**
 * Props for FileUploadField component
 */
export interface FileUploadFieldProps {
  /**
   * Field label
   */
  label: string;
  /**
   * Hint text to display below the label
   */
  hint?: string;
  /**
   * Error message to display
   */
  error?: string;
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
   * Accepted file types (e.g., ".pdf,.jpg,.png" or "image/*")
   */
  accept?: string;
  /**
   * Whether to allow multiple file selection
   */
  multiple?: boolean;
  /**
   * Change event handler
   */
  onChange?: (files: FileList | null) => void;
  /**
   * Blur event handler
   */
  onBlur?: () => void;
  /**
   * Message aria-describedby ID
   */
  messageAriaDescribedby?: string;
  /**
   * Message aria-labelledby ID
   */
  messageAriaLabelledby?: string;
  /**
   * Whether to use forms pattern
   */
  useFormsPattern?: string;
  /**
   * Whether to enable analytics
   */
  enableAnalytics?: boolean;
}

/**
 * FileUploadField component wrapping VA Design System va-file-input
 *
 * @example
 * ```tsx
 * import { FileUploadField } from '@formkit-gov/react';
 *
 * function MyForm() {
 *   return (
 *     <FileUploadField
 *       label="Upload document"
 *       name="document"
 *       required
 *     />
 *   );
 * }
 * ```
 *
 * @example With React Hook Form
 * ```tsx
 * import { useForm } from 'react-hook-form';
 * import { FileUploadField } from '@formkit-gov/react';
 *
 * function MyForm() {
 *   const { register, formState: { errors } } = useForm();
 *
 *   return (
 *     <FileUploadField
 *       {...register('document')}
 *       label="Upload document"
 *       error={errors.document?.message}
 *       required
 *     />
 *   );
 * }
 * ```
 *
 * @example With file type restrictions
 * ```tsx
 * <FileUploadField
 *   label="Upload image"
 *   name="image"
 *   accept=".jpg,.jpeg,.png"
 *   hint="Accepted formats: JPG, PNG"
 *   required
 * />
 * ```
 *
 * @example Multiple file upload
 * ```tsx
 * <FileUploadField
 *   label="Upload documents"
 *   name="documents"
 *   multiple
 *   hint="You can select multiple files"
 * />
 * ```
 */
export const FileUploadField = React.forwardRef<HTMLVaFileInputElement, FileUploadFieldProps>(
  (
    {
      label,
      hint,
      error,
      required = false,
      disabled = false,
      name,
      accept,
      multiple = false,
      onChange,
      onBlur,
      messageAriaDescribedby,
      messageAriaLabelledby,
      useFormsPattern,
      enableAnalytics,
      ...props
    },
    ref
  ) => {
    const handleChange = React.useCallback(
      (event: Event) => {
        if (onChange) {
          const customEvent = event as CustomEvent;
          const files = customEvent.detail?.files || null;
          onChange(files);
        }
      },
      [onChange]
    );

    const handleBlur = React.useCallback(
      (_event: Event) => {
        if (onBlur) {
          onBlur();
        }
      },
      [onBlur]
    );

    // Create a focusable ref that handles shadow DOM focus
    const focusableRef = createFocusableRef(ref, 'input[type="file"], input');

    // Use a local ref to attach event listeners
    const elementRef = React.useRef<HTMLVaFileInputElement | null>(null);

    const combinedRef = React.useCallback(
      (element: HTMLVaFileInputElement | null) => {
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

    return React.createElement('va-file-input', {
      ref: combinedRef,
      label,
      hint,
      error: error || undefined,
      required,
      disabled,
      name,
      accept,
      multiple,
      'message-aria-describedby': messageAriaDescribedby,
      'message-aria-labelledby': messageAriaLabelledby,
      'use-forms-pattern': useFormsPattern,
      'enable-analytics': enableAnalytics,
      ...props,
    });
  }
);

FileUploadField.displayName = 'FileUploadField';
