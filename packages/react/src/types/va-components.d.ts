/**
 * Type definitions for VA Design System web components
 * Updated for React 19 JSX namespace changes
 */

import type * as React from 'react';

type VATextInputProps = React.DetailedHTMLProps<
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

type VATextareaProps = React.DetailedHTMLProps<
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

type VACheckboxProps = React.DetailedHTMLProps<
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

type VASelectProps = React.DetailedHTMLProps<
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

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'va-text-input': VATextInputProps;
      'va-textarea': VATextareaProps;
      'va-checkbox': VACheckboxProps;
      'va-select': VASelectProps;
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
