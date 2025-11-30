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

type VACheckboxGroupProps = React.DetailedHTMLProps<
  Omit<React.HTMLAttributes<HTMLElement>, 'onChange' | 'onBlur'> & {
    label?: string | undefined;
    error?: string | undefined;
    name?: string | undefined;
    required?: boolean | undefined;
    hint?: string | undefined;
  },
  HTMLElement
>;

type VAComboBoxProps = React.DetailedHTMLProps<
  Omit<React.HTMLAttributes<HTMLElement>, 'onChange' | 'onBlur'> & {
    label?: string | undefined;
    error?: string | undefined;
    name?: string | undefined;
    value?: string | undefined;
    required?: boolean | undefined;
    hint?: string | undefined;
    placeholder?: string | undefined;
    disabled?: boolean | undefined;
  },
  HTMLElement
>;

type VARadioProps = React.DetailedHTMLProps<
  Omit<React.HTMLAttributes<HTMLElement>, 'onChange' | 'onBlur'> & {
    label?: string | undefined;
    error?: string | undefined;
    name?: string | undefined;
    value?: string | undefined;
    required?: boolean | undefined;
    hint?: string | undefined;
    checked?: boolean | undefined;
    disabled?: boolean | undefined;
    'enable-analytics'?: boolean | undefined;
  },
  HTMLElement
>;

type VARadioOptionProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement> & {
    label?: string | undefined;
    value?: string | undefined;
    description?: string | undefined;
    disabled?: boolean | undefined;
    checked?: boolean | undefined;
  },
  HTMLElement
>;

type VAPrivacyAgreementProps = React.DetailedHTMLProps<
  Omit<React.HTMLAttributes<HTMLElement>, 'onChange' | 'onBlur'> & {
    checked?: boolean | undefined;
    showError?: boolean | undefined;
    name?: string | undefined;
    'enable-analytics'?: boolean | undefined;
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
      'va-checkbox-group': VACheckboxGroupProps;
      'va-combo-box': VAComboBoxProps;
      'va-radio': VARadioProps;
      'va-radio-option': VARadioOptionProps;
      'va-privacy-agreement': VAPrivacyAgreementProps;
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

/**
 * Reference type for va-checkbox-group element
 */
export interface HTMLVaCheckboxGroupElement extends HTMLElement {
  value: string[];
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

/**
 * Reference type for va-combo-box element
 */
export interface HTMLVaComboBoxElement extends HTMLElement {
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

/**
 * Reference type for va-radio element
 */
export interface HTMLVaRadioElement extends HTMLElement {
  value: string;
  checked: boolean;
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

/**
 * Reference type for va-privacy-agreement element
 */
export interface HTMLVaPrivacyAgreementElement extends HTMLElement {
  checked: boolean;
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
