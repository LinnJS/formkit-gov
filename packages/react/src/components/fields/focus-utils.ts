/**
 * Focus utilities for VA Design System web components
 *
 * VA web components use Shadow DOM, which means the internal input element
 * is not directly accessible. This utility creates a ref that intercepts
 * focus() calls and delegates them to the internal input element.
 *
 * @module @formkit-gov/react/components/fields/focus-utils
 */

import type * as React from 'react';

/**
 * Creates a ref callback that wraps the element with focus support.
 * VA web components don't expose a focus() method that delegates to the internal input,
 * so we create a proxy that queries the shadow DOM to focus the internal input.
 *
 * This enables React Hook Form's `shouldFocusError` to work correctly with
 * VA web components - when validation fails, the first invalid field will
 * receive focus automatically.
 *
 * @param forwardedRef - The ref forwarded from the parent component
 * @param inputSelector - CSS selector to find the focusable input in the shadow DOM
 * @returns A ref callback that sets up focus delegation
 *
 * @example
 * ```tsx
 * const MyField = React.forwardRef<HTMLElement, MyFieldProps>((props, ref) => {
 *   const focusableRef = createFocusableRef(ref, 'input');
 *
 *   return React.createElement('va-text-input', {
 *     ref: focusableRef,
 *     ...props,
 *   });
 * });
 * ```
 */
export function createFocusableRef<T extends HTMLElement>(
  forwardedRef: React.ForwardedRef<T>,
  inputSelector = 'input'
): React.RefCallback<T> {
  return (element: T | null) => {
    if (element) {
      // Create a proxy that intercepts focus() calls
      const originalFocus = element.focus.bind(element);
      element.focus = function (options?: FocusOptions) {
        // Try to find and focus the internal input in the shadow DOM
        const shadowRoot = this.shadowRoot;
        if (shadowRoot) {
          const input = shadowRoot.querySelector(inputSelector) as HTMLElement | null;
          if (input) {
            input.focus(options);
            return;
          }
        }
        // Fall back to focusing the element itself
        originalFocus(options);
      };
    }

    // Forward the ref
    if (typeof forwardedRef === 'function') {
      forwardedRef(element);
    } else if (forwardedRef) {
      forwardedRef.current = element;
    }
  };
}
