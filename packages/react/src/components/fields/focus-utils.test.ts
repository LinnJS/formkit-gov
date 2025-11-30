/**
 * Tests for focus-utils
 *
 * These tests verify the createFocusableRef utility which enables focus delegation
 * to shadow DOM elements in VA Design System web components.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

import { createFocusableRef } from './focus-utils';

describe('createFocusableRef', () => {
  let mockElement: HTMLElement;
  let mockShadowRoot: ShadowRoot;
  let mockInput: HTMLInputElement;
  let originalFocus: () => void;

  beforeEach(() => {
    // Create mock input inside shadow DOM
    mockInput = document.createElement('input');
    mockInput.focus = vi.fn();

    // Create mock shadow root
    mockShadowRoot = {
      querySelector: vi.fn().mockReturnValue(mockInput),
    } as unknown as ShadowRoot;

    // Create mock element with shadow root
    originalFocus = vi.fn();
    mockElement = document.createElement('div');
    mockElement.focus = originalFocus;
    Object.defineProperty(mockElement, 'shadowRoot', {
      value: mockShadowRoot,
      writable: true,
      configurable: true,
    });
  });

  describe('focus delegation', () => {
    it('focuses the internal input in shadow DOM when focus() is called', () => {
      const ref = createFocusableRef<HTMLElement>(null, 'input');
      ref(mockElement);

      mockElement.focus();

      expect(mockShadowRoot.querySelector).toHaveBeenCalledWith('input');
      expect(mockInput.focus).toHaveBeenCalled();
    });

    it('uses custom selector to find focusable element', () => {
      const customSelector = 'textarea';
      const mockTextarea = document.createElement('textarea');
      mockTextarea.focus = vi.fn();
      (mockShadowRoot.querySelector as ReturnType<typeof vi.fn>).mockReturnValue(mockTextarea);

      const ref = createFocusableRef<HTMLElement>(null, customSelector);
      ref(mockElement);

      mockElement.focus();

      expect(mockShadowRoot.querySelector).toHaveBeenCalledWith(customSelector);
      expect(mockTextarea.focus).toHaveBeenCalled();
    });

    it('passes focus options to the internal input', () => {
      const ref = createFocusableRef<HTMLElement>(null, 'input');
      ref(mockElement);

      const focusOptions: FocusOptions = { preventScroll: true };
      mockElement.focus(focusOptions);

      expect(mockInput.focus).toHaveBeenCalledWith(focusOptions);
    });

    it('defaults to input selector when not specified', () => {
      const ref = createFocusableRef<HTMLElement>(null);
      ref(mockElement);

      mockElement.focus();

      expect(mockShadowRoot.querySelector).toHaveBeenCalledWith('input');
    });
  });

  describe('fallback behavior', () => {
    it('falls back to element focus when no shadow root exists', () => {
      Object.defineProperty(mockElement, 'shadowRoot', {
        value: null,
        writable: true,
        configurable: true,
      });

      const ref = createFocusableRef<HTMLElement>(null, 'input');
      ref(mockElement);

      mockElement.focus();

      expect(originalFocus).toHaveBeenCalled();
    });

    it('falls back to element focus when input not found in shadow DOM', () => {
      (mockShadowRoot.querySelector as ReturnType<typeof vi.fn>).mockReturnValue(null);

      const ref = createFocusableRef<HTMLElement>(null, 'input');
      ref(mockElement);

      mockElement.focus();

      expect(mockShadowRoot.querySelector).toHaveBeenCalledWith('input');
      expect(originalFocus).toHaveBeenCalled();
    });

    it('passes focus options to fallback focus', () => {
      Object.defineProperty(mockElement, 'shadowRoot', {
        value: null,
        writable: true,
        configurable: true,
      });

      const ref = createFocusableRef<HTMLElement>(null, 'input');
      ref(mockElement);

      const focusOptions: FocusOptions = { preventScroll: true };
      mockElement.focus(focusOptions);

      expect(originalFocus).toHaveBeenCalledWith(focusOptions);
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to callback ref', () => {
      const callbackRef = vi.fn();

      const ref = createFocusableRef<HTMLElement>(callbackRef, 'input');
      ref(mockElement);

      expect(callbackRef).toHaveBeenCalledWith(mockElement);
    });

    it('forwards ref to object ref', () => {
      const objectRef = { current: null as HTMLElement | null };

      const ref = createFocusableRef<HTMLElement>(objectRef, 'input');
      ref(mockElement);

      expect(objectRef.current).toBe(mockElement);
    });

    it('handles null forwarded ref', () => {
      const ref = createFocusableRef<HTMLElement>(null, 'input');

      // Should not throw
      expect(() => ref(mockElement)).not.toThrow();
    });

    it('forwards null element to callback ref on unmount', () => {
      const callbackRef = vi.fn();

      const ref = createFocusableRef<HTMLElement>(callbackRef, 'input');
      ref(null);

      expect(callbackRef).toHaveBeenCalledWith(null);
    });

    it('forwards null element to object ref on unmount', () => {
      const objectRef = { current: mockElement as HTMLElement | null };

      const ref = createFocusableRef<HTMLElement>(objectRef, 'input');
      ref(null);

      expect(objectRef.current).toBeNull();
    });
  });

  describe('null element handling', () => {
    it('does not modify focus when element is null', () => {
      const ref = createFocusableRef<HTMLElement>(null, 'input');

      // Should not throw
      expect(() => ref(null)).not.toThrow();
    });

    it('still forwards null to callback ref', () => {
      const callbackRef = vi.fn();
      const ref = createFocusableRef<HTMLElement>(callbackRef, 'input');

      ref(null);

      expect(callbackRef).toHaveBeenCalledWith(null);
    });
  });

  describe('multiple focus calls', () => {
    it('correctly focuses shadow DOM input on repeated calls', () => {
      const ref = createFocusableRef<HTMLElement>(null, 'input');
      ref(mockElement);

      mockElement.focus();
      mockElement.focus();
      mockElement.focus();

      expect(mockInput.focus).toHaveBeenCalledTimes(3);
    });
  });

  describe('different element types', () => {
    it('works with select elements in shadow DOM', () => {
      const mockSelect = document.createElement('select');
      mockSelect.focus = vi.fn();
      (mockShadowRoot.querySelector as ReturnType<typeof vi.fn>).mockReturnValue(mockSelect);

      const ref = createFocusableRef<HTMLElement>(null, 'select');
      ref(mockElement);

      mockElement.focus();

      expect(mockShadowRoot.querySelector).toHaveBeenCalledWith('select');
      expect(mockSelect.focus).toHaveBeenCalled();
    });

    it('works with complex selectors', () => {
      const mockNestedInput = document.createElement('input');
      mockNestedInput.focus = vi.fn();
      (mockShadowRoot.querySelector as ReturnType<typeof vi.fn>).mockReturnValue(mockNestedInput);

      const ref = createFocusableRef<HTMLElement>(null, '.form-group input[type="text"]');
      ref(mockElement);

      mockElement.focus();

      expect(mockShadowRoot.querySelector).toHaveBeenCalledWith('.form-group input[type="text"]');
      expect(mockNestedInput.focus).toHaveBeenCalled();
    });
  });
});
