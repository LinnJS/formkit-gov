/**
 * Utility functions for form handling
 */

import { z, type ZodError } from 'zod';

import { type ValidationError, type ValidationResult } from '../types';

/**
 * Converts Zod errors to a flat error object
 */
export function flattenZodErrors(error: ZodError): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const issue of error.issues) {
    const path = issue.path.join('.');
    if (!errors[path]) {
      errors[path] = issue.message;
    }
  }

  return errors;
}

/**
 * Converts Zod errors to an array of ValidationError objects
 */
export function zodToValidationErrors(error: ZodError): ValidationError[] {
  return error.issues.map(issue => ({
    path: issue.path.filter((p): p is string | number => typeof p !== 'symbol'),
    message: issue.message,
    code: issue.code,
  }));
}

/**
 * Validates data against a schema and returns a ValidationResult
 */
export function validateWithSchema<T extends z.ZodType>(
  schema: T,
  data: unknown
): ValidationResult<z.infer<T>> {
  const result = schema.safeParse(data);

  if (result.success) {
    return {
      success: true,
      data: result.data,
    };
  }

  return {
    success: false,
    errors: zodToValidationErrors(result.error),
  };
}

/**
 * Combines multiple Zod schemas into one
 */
export function combineSchemas<T extends z.ZodRawShape[]>(
  ...schemas: { [K in keyof T]: z.ZodObject<T[K]> }
): z.ZodObject<T[number]> {
  const combinedShape = schemas.reduce(
    (acc, schema) => ({ ...acc, ...schema.shape }),
    {} as T[number]
  );
  return z.object(combinedShape) as z.ZodObject<T[number]>;
}

/**
 * Creates error constants for consistent messaging
 */
export function createErrorMessages(overrides: Record<string, string> = {}) {
  const defaults = {
    required: 'This field is required',
    invalidEmail: 'Enter a valid email address',
    invalidPhone: 'Enter a valid 10-digit phone number',
    invalidSSN: 'Enter a valid Social Security number',
    invalidDate: 'Enter a valid date',
    invalidZip: 'Enter a valid ZIP code',
    invalidCurrency: 'Enter a valid dollar amount',
    fileTooLarge: 'File is too large',
    invalidFileType: 'File type is not allowed',
    ...overrides,
  };

  return defaults;
}

/**
 * Debounce function for validation
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: number | NodeJS.Timeout | undefined;

  return (...args: Parameters<T>) => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Deep clones an object (simple implementation)
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as T;
  }

  const cloned = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }

  return cloned;
}

/**
 * Checks if a value is empty (null, undefined, empty string, empty array, empty object)
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Removes empty values from an object
 */
export function removeEmptyValues<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const result: Partial<T> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && !isEmpty(obj[key])) {
      result[key] = obj[key];
    }
  }

  return result;
}
