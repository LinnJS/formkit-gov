/**
 * Type definitions for VA Design System web components
 */

import type * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'va-text-input': React.DetailedHTMLProps<
        Omit<React.HTMLAttributes<HTMLElement>, 'onChange' | 'onBlur'> & {
          label?: string | undefined;
          error?: string | undefined;
          name?: string | undefined;
          value?: string | undefined;
          required?: boolean | undefined;
          type?: string | undefined;
          maxlength?: number | undefined;
          hint?: string | undefined;
        },
        HTMLElement
      >;

      'va-textarea': React.DetailedHTMLProps<
        Omit<React.HTMLAttributes<HTMLElement>, 'onChange' | 'onBlur'> & {
          label?: string | undefined;
          error?: string | undefined;
          name?: string | undefined;
          value?: string | undefined;
          required?: boolean | undefined;
          maxlength?: number | undefined;
          hint?: string | undefined;
        },
        HTMLElement
      >;

      'va-checkbox': React.DetailedHTMLProps<
        Omit<React.HTMLAttributes<HTMLElement>, 'onChange' | 'onBlur'> & {
          label?: string | undefined;
          error?: string | undefined;
          name?: string | undefined;
          checked?: boolean | undefined;
          required?: boolean | undefined;
          hint?: string | undefined;
        },
        HTMLElement
      >;

      'va-select': React.DetailedHTMLProps<
        Omit<React.HTMLAttributes<HTMLElement>, 'onChange' | 'onBlur'> & {
          label?: string | undefined;
          error?: string | undefined;
          name?: string | undefined;
          value?: string | undefined;
          required?: boolean | undefined;
          hint?: string | undefined;
        },
        HTMLElement
      >;
    }
  }
}

/**
 * Reference type for va-text-input element
 */
export interface HTMLVaTextInputElement extends HTMLElement {
  value: string;
}

/**
 * Reference type for va-textarea element
 */
export interface HTMLVaTextareaElement extends HTMLElement {
  value: string;
}

/**
 * Reference type for va-checkbox element
 */
export interface HTMLVaCheckboxElement extends HTMLElement {
  checked: boolean;
}

/**
 * Reference type for va-select element
 */
export interface HTMLVaSelectElement extends HTMLElement {
  value: string;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
}

export {};
