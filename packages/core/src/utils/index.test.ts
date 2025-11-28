import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { z, type ZodError } from 'zod';

import {
  flattenZodErrors,
  zodToValidationErrors,
  validateWithSchema,
  combineSchemas,
  createErrorMessages,
  debounce,
  deepClone,
  isEmpty,
  removeEmptyValues,
} from './index';

describe('flattenZodErrors', () => {
  it('converts single error to flat object', () => {
    // Arrange
    const schema = z.object({ name: z.string() });
    const result = schema.safeParse({ name: 123 });

    // Act
    const errors = flattenZodErrors(result.error as ZodError);

    // Assert
    expect(errors).toHaveProperty('name');
    expect(typeof errors.name).toBe('string');
  });

  it('converts nested errors to dot notation paths', () => {
    // Arrange
    const schema = z.object({
      user: z.object({
        email: z.string().email(),
      }),
    });
    const result = schema.safeParse({ user: { email: 'invalid' } });

    // Act
    const errors = flattenZodErrors(result.error as ZodError);

    // Assert
    expect(errors).toHaveProperty('user.email');
    expect(errors['user.email']).toContain('email');
  });

  it('converts array errors with numeric indices', () => {
    // Arrange
    const schema = z.object({
      items: z.array(z.string()),
    });
    const result = schema.safeParse({ items: [123, 'valid', 456] });

    // Act
    const errors = flattenZodErrors(result.error as ZodError);

    // Assert
    expect(errors).toHaveProperty('items.0');
    expect(errors).toHaveProperty('items.2');
  });

  it('handles multiple errors for same field by keeping first error', () => {
    // Arrange
    const schema = z.object({
      password: z.string().min(8).max(20),
    });
    const result = schema.safeParse({ password: 'short' });

    // Act
    const errors = flattenZodErrors(result.error as ZodError);

    // Assert
    expect(errors).toHaveProperty('password');
    expect(Object.keys(errors)).toHaveLength(1);
  });

  it('handles empty path for root level errors', () => {
    // Arrange
    const schema = z.string();
    const result = schema.safeParse(123);

    // Act
    const errors = flattenZodErrors(result.error as ZodError);

    // Assert
    expect(errors).toHaveProperty('');
  });
});

describe('zodToValidationErrors', () => {
  it('converts Zod errors to ValidationError array', () => {
    // Arrange
    const schema = z.object({ name: z.string() });
    const result = schema.safeParse({ name: 123 });

    // Act
    const errors = zodToValidationErrors(result.error as ZodError);

    // Assert
    expect(Array.isArray(errors)).toBe(true);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toHaveProperty('path');
    expect(errors[0]).toHaveProperty('message');
    expect(errors[0]).toHaveProperty('code');
  });

  it('preserves path as array', () => {
    // Arrange
    const schema = z.object({
      user: z.object({
        email: z.string().email(),
      }),
    });
    const result = schema.safeParse({ user: { email: 'invalid' } });

    // Act
    const errors = zodToValidationErrors(result.error as ZodError);

    // Assert
    expect(errors[0].path).toEqual(['user', 'email']);
  });

  it('includes error code from Zod', () => {
    // Arrange
    const schema = z.string();
    const result = schema.safeParse(123);

    // Act
    const errors = zodToValidationErrors(result.error as ZodError);

    // Assert
    expect(errors[0].code).toBe('invalid_type');
  });

  it('handles multiple errors', () => {
    // Arrange
    const schema = z.object({
      email: z.string().email(),
      age: z.number().positive(),
    });
    const result = schema.safeParse({ email: 'invalid', age: -5 });

    // Act
    const errors = zodToValidationErrors(result.error as ZodError);

    // Assert
    expect(errors.length).toBeGreaterThanOrEqual(2);
  });
});

describe('validateWithSchema', () => {
  it('returns success result with data when validation passes', () => {
    // Arrange
    const schema = z.object({
      name: z.string(),
      age: z.number(),
    });
    const data = { name: 'John', age: 30 };

    // Act
    const result = validateWithSchema(schema, data);

    // Assert
    expect(result.success).toBe(true);
    expect(result.data).toEqual(data);
    expect(result.errors).toBeUndefined();
  });

  it('returns failure result with errors when validation fails', () => {
    // Arrange
    const schema = z.object({
      name: z.string(),
      age: z.number(),
    });
    const data = { name: 'John', age: 'thirty' };

    // Act
    const result = validateWithSchema(schema, data);

    // Assert
    expect(result.success).toBe(false);
    expect(result.data).toBeUndefined();
    expect(result.errors).toBeDefined();
    expect(Array.isArray(result.errors)).toBe(true);
  });

  it('transforms data according to schema', () => {
    // Arrange
    const schema = z.object({
      age: z.string().transform(val => parseInt(val, 10)),
    });
    const data = { age: '30' };

    // Act
    const result = validateWithSchema(schema, data);

    // Assert
    expect(result.success).toBe(true);
    expect(result.data).toEqual({ age: 30 });
  });

  it('works with primitive schemas', () => {
    // Arrange
    const schema = z.string().email();
    const data = 'test@example.com';

    // Act
    const result = validateWithSchema(schema, data);

    // Assert
    expect(result.success).toBe(true);
    expect(result.data).toBe(data);
  });

  it('includes all errors in failure result', () => {
    // Arrange
    const schema = z.object({
      email: z.string().email(),
      phone: z.string().regex(/^\d{10}$/),
    });
    const data = { email: 'invalid', phone: 'invalid' };

    // Act
    const result = validateWithSchema(schema, data);

    // Assert
    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors!.length).toBeGreaterThanOrEqual(2);
  });
});

describe('combineSchemas', () => {
  it('merges two schemas into one', () => {
    // Arrange
    const schema1 = z.object({ name: z.string() });
    const schema2 = z.object({ age: z.number() });

    // Act
    const combined = combineSchemas(schema1, schema2);
    const result = combined.parse({ name: 'John', age: 30 });

    // Assert
    expect(result).toEqual({ name: 'John', age: 30 });
  });

  it('merges multiple schemas', () => {
    // Arrange
    const schema1 = z.object({ name: z.string() });
    const schema2 = z.object({ age: z.number() });
    const schema3 = z.object({ email: z.string().email() });

    // Act
    const combined = combineSchemas(schema1, schema2, schema3);
    const result = combined.parse({
      name: 'John',
      age: 30,
      email: 'john@example.com',
    });

    // Assert
    expect(result).toEqual({
      name: 'John',
      age: 30,
      email: 'john@example.com',
    });
  });

  it('later schemas override earlier ones for same keys', () => {
    // Arrange
    const schema1 = z.object({ value: z.string() });
    const schema2 = z.object({ value: z.number() });

    // Act
    const combined = combineSchemas(schema1, schema2);
    const result = combined.parse({ value: 42 });

    // Assert
    expect(result.value).toBe(42);
  });

  it('validates all fields from combined schemas', () => {
    // Arrange
    const schema1 = z.object({ name: z.string().min(3) });
    const schema2 = z.object({ age: z.number().min(18) });

    // Act
    const combined = combineSchemas(schema1, schema2);
    const result = combined.safeParse({ name: 'Jo', age: 15 });

    // Assert
    expect(result.success).toBe(false);
  });

  it('handles empty schema merge', () => {
    // Arrange
    const schema1 = z.object({});
    const schema2 = z.object({ name: z.string() });

    // Act
    const combined = combineSchemas(schema1, schema2);
    const result = combined.parse({ name: 'John' });

    // Assert
    expect(result).toEqual({ name: 'John' });
  });
});

describe('createErrorMessages', () => {
  it('returns default error messages', () => {
    // Arrange & Act
    const messages = createErrorMessages();

    // Assert
    expect(messages.required).toBe('This field is required');
    expect(messages.invalidEmail).toBe('Enter a valid email address');
    expect(messages.invalidPhone).toBe('Enter a valid 10-digit phone number');
    expect(messages.invalidSSN).toBe('Enter a valid Social Security number');
    expect(messages.invalidDate).toBe('Enter a valid date');
    expect(messages.invalidZip).toBe('Enter a valid ZIP code');
    expect(messages.invalidCurrency).toBe('Enter a valid dollar amount');
    expect(messages.fileTooLarge).toBe('File is too large');
    expect(messages.invalidFileType).toBe('File type is not allowed');
  });

  it('overrides specific messages', () => {
    // Arrange & Act
    const messages = createErrorMessages({
      required: 'Custom required message',
      invalidEmail: 'Custom email message',
    });

    // Assert
    expect(messages.required).toBe('Custom required message');
    expect(messages.invalidEmail).toBe('Custom email message');
    expect(messages.invalidPhone).toBe('Enter a valid 10-digit phone number');
  });

  it('adds custom messages', () => {
    // Arrange & Act
    const messages = createErrorMessages({
      customField: 'Custom field error',
    });

    // Assert
    expect(messages.customField).toBe('Custom field error');
    expect(messages.required).toBe('This field is required');
  });

  it('overrides all messages', () => {
    // Arrange
    const overrides = {
      required: 'Required override',
      invalidEmail: 'Email override',
      invalidPhone: 'Phone override',
      invalidSSN: 'SSN override',
      invalidDate: 'Date override',
      invalidZip: 'ZIP override',
      invalidCurrency: 'Currency override',
      fileTooLarge: 'File size override',
      invalidFileType: 'File type override',
    };

    // Act
    const messages = createErrorMessages(overrides);

    // Assert
    expect(messages.required).toBe('Required override');
    expect(messages.invalidEmail).toBe('Email override');
    expect(messages.invalidPhone).toBe('Phone override');
    expect(messages.invalidSSN).toBe('SSN override');
    expect(messages.invalidDate).toBe('Date override');
    expect(messages.invalidZip).toBe('ZIP override');
    expect(messages.invalidCurrency).toBe('Currency override');
    expect(messages.fileTooLarge).toBe('File size override');
    expect(messages.invalidFileType).toBe('File type override');
  });

  it('handles empty overrides object', () => {
    // Arrange & Act
    const messages = createErrorMessages({});

    // Assert
    expect(messages.required).toBe('This field is required');
  });
});

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('delays function execution', () => {
    // Arrange
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 1000);

    // Act
    debouncedFn();

    // Assert
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('cancels previous calls when called multiple times', () => {
    // Arrange
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 1000);

    // Act
    debouncedFn();
    vi.advanceTimersByTime(500);
    debouncedFn();
    vi.advanceTimersByTime(500);
    debouncedFn();
    vi.advanceTimersByTime(1000);

    // Assert
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('passes arguments to debounced function', () => {
    // Arrange
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 1000);

    // Act
    debouncedFn('arg1', 'arg2', 123);
    vi.advanceTimersByTime(1000);

    // Assert
    expect(fn).toHaveBeenCalledWith('arg1', 'arg2', 123);
  });

  it('uses latest arguments when called multiple times', () => {
    // Arrange
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 1000);

    // Act
    debouncedFn('first');
    debouncedFn('second');
    debouncedFn('third');
    vi.advanceTimersByTime(1000);

    // Assert
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('third');
  });

  it('executes immediately after delay period', () => {
    // Arrange
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 500);

    // Act
    debouncedFn();
    vi.advanceTimersByTime(499);
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);

    // Assert
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('handles zero delay', () => {
    // Arrange
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 0);

    // Act
    debouncedFn();
    vi.advanceTimersByTime(0);

    // Assert
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('deepClone', () => {
  it('clones primitive values', () => {
    // Arrange & Act & Assert
    expect(deepClone(42)).toBe(42);
    expect(deepClone('string')).toBe('string');
    expect(deepClone(true)).toBe(true);
    expect(deepClone(null)).toBe(null);
    expect(deepClone(undefined)).toBe(undefined);
  });

  it('clones simple objects', () => {
    // Arrange
    const obj = { name: 'John', age: 30 };

    // Act
    const cloned = deepClone(obj);

    // Assert
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
  });

  it('clones nested objects', () => {
    // Arrange
    const obj = {
      user: {
        name: 'John',
        address: {
          city: 'New York',
          zip: '10001',
        },
      },
    };

    // Act
    const cloned = deepClone(obj);

    // Assert
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.user).not.toBe(obj.user);
    expect(cloned.user.address).not.toBe(obj.user.address);
  });

  it('clones arrays', () => {
    // Arrange
    const arr = [1, 2, 3, 4, 5];

    // Act
    const cloned = deepClone(arr);

    // Assert
    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
  });

  it('clones nested arrays', () => {
    // Arrange
    const arr = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];

    // Act
    const cloned = deepClone(arr);

    // Assert
    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
    expect(cloned[0]).not.toBe(arr[0]);
  });

  it('clones objects with arrays', () => {
    // Arrange
    const obj = {
      name: 'John',
      scores: [85, 90, 95],
    };

    // Act
    const cloned = deepClone(obj);

    // Assert
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.scores).not.toBe(obj.scores);
  });

  it('clones arrays with objects', () => {
    // Arrange
    const arr = [
      { id: 1, name: 'First' },
      { id: 2, name: 'Second' },
    ];

    // Act
    const cloned = deepClone(arr);

    // Assert
    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
    expect(cloned[0]).not.toBe(arr[0]);
  });

  it('maintains modifications independence', () => {
    // Arrange
    const original = { name: 'John', nested: { value: 10 } };
    const cloned = deepClone(original);

    // Act
    cloned.name = 'Jane';
    cloned.nested.value = 20;

    // Assert
    expect(original.name).toBe('John');
    expect(original.nested.value).toBe(10);
  });

  it('handles empty objects and arrays', () => {
    // Arrange & Act & Assert
    expect(deepClone({})).toEqual({});
    expect(deepClone([])).toEqual([]);
  });

  it('clones objects with null values', () => {
    // Arrange
    const obj = { name: 'John', value: null };

    // Act
    const cloned = deepClone(obj);

    // Assert
    expect(cloned).toEqual(obj);
    expect(cloned.value).toBe(null);
  });
});

describe('isEmpty', () => {
  it('returns true for null', () => {
    // Arrange & Act & Assert
    expect(isEmpty(null)).toBe(true);
  });

  it('returns true for undefined', () => {
    // Arrange & Act & Assert
    expect(isEmpty(undefined)).toBe(true);
  });

  it('returns true for empty string', () => {
    // Arrange & Act & Assert
    expect(isEmpty('')).toBe(true);
  });

  it('returns true for whitespace-only string', () => {
    // Arrange & Act & Assert
    expect(isEmpty('   ')).toBe(true);
    expect(isEmpty('\t\n')).toBe(true);
  });

  it('returns false for non-empty string', () => {
    // Arrange & Act & Assert
    expect(isEmpty('hello')).toBe(false);
    expect(isEmpty(' hello ')).toBe(false);
  });

  it('returns true for empty array', () => {
    // Arrange & Act & Assert
    expect(isEmpty([])).toBe(true);
  });

  it('returns false for non-empty array', () => {
    // Arrange & Act & Assert
    expect(isEmpty([1])).toBe(false);
    expect(isEmpty([1, 2, 3])).toBe(false);
  });

  it('returns true for empty object', () => {
    // Arrange & Act & Assert
    expect(isEmpty({})).toBe(true);
  });

  it('returns false for non-empty object', () => {
    // Arrange & Act & Assert
    expect(isEmpty({ key: 'value' })).toBe(false);
    expect(isEmpty({ a: 1, b: 2 })).toBe(false);
  });

  it('returns false for number zero', () => {
    // Arrange & Act & Assert
    expect(isEmpty(0)).toBe(false);
  });

  it('returns false for boolean false', () => {
    // Arrange & Act & Assert
    expect(isEmpty(false)).toBe(false);
  });

  it('returns false for numbers', () => {
    // Arrange & Act & Assert
    expect(isEmpty(42)).toBe(false);
    expect(isEmpty(-1)).toBe(false);
  });

  it('returns false for boolean true', () => {
    // Arrange & Act & Assert
    expect(isEmpty(true)).toBe(false);
  });
});

describe('removeEmptyValues', () => {
  it('removes null values', () => {
    // Arrange
    const obj = { name: 'John', value: null };

    // Act
    const result = removeEmptyValues(obj);

    // Assert
    expect(result).toEqual({ name: 'John' });
  });

  it('removes undefined values', () => {
    // Arrange
    const obj = { name: 'John', value: undefined };

    // Act
    const result = removeEmptyValues(obj);

    // Assert
    expect(result).toEqual({ name: 'John' });
  });

  it('removes empty strings', () => {
    // Arrange
    const obj = { name: 'John', description: '' };

    // Act
    const result = removeEmptyValues(obj);

    // Assert
    expect(result).toEqual({ name: 'John' });
  });

  it('removes whitespace-only strings', () => {
    // Arrange
    const obj = { name: 'John', description: '   ' };

    // Act
    const result = removeEmptyValues(obj);

    // Assert
    expect(result).toEqual({ name: 'John' });
  });

  it('removes empty arrays', () => {
    // Arrange
    const obj = { name: 'John', items: [] };

    // Act
    const result = removeEmptyValues(obj);

    // Assert
    expect(result).toEqual({ name: 'John' });
  });

  it('removes empty objects', () => {
    // Arrange
    const obj = { name: 'John', metadata: {} };

    // Act
    const result = removeEmptyValues(obj);

    // Assert
    expect(result).toEqual({ name: 'John' });
  });

  it('keeps non-empty values', () => {
    // Arrange
    const obj = {
      name: 'John',
      age: 30,
      active: true,
      items: [1, 2, 3],
      metadata: { key: 'value' },
    };

    // Act
    const result = removeEmptyValues(obj);

    // Assert
    expect(result).toEqual(obj);
  });

  it('keeps zero values', () => {
    // Arrange
    const obj = { name: 'John', count: 0 };

    // Act
    const result = removeEmptyValues(obj);

    // Assert
    expect(result).toEqual({ name: 'John', count: 0 });
  });

  it('keeps false values', () => {
    // Arrange
    const obj = { name: 'John', active: false };

    // Act
    const result = removeEmptyValues(obj);

    // Assert
    expect(result).toEqual({ name: 'John', active: false });
  });

  it('handles mixed empty and non-empty values', () => {
    // Arrange
    const obj = {
      name: 'John',
      email: null,
      age: 30,
      description: '',
      items: [],
      metadata: {},
      active: true,
      count: 0,
    };

    // Act
    const result = removeEmptyValues(obj);

    // Assert
    expect(result).toEqual({
      name: 'John',
      age: 30,
      active: true,
      count: 0,
    });
  });

  it('returns empty object when all values are empty', () => {
    // Arrange
    const obj = {
      a: null,
      b: undefined,
      c: '',
      d: [],
      e: {},
    };

    // Act
    const result = removeEmptyValues(obj);

    // Assert
    expect(result).toEqual({});
  });

  it('does not modify original object', () => {
    // Arrange
    const obj = { name: 'John', value: null };
    const original = { ...obj };

    // Act
    removeEmptyValues(obj);

    // Assert
    expect(obj).toEqual(original);
  });

  it('handles empty input object', () => {
    // Arrange
    const obj = {};

    // Act
    const result = removeEmptyValues(obj);

    // Assert
    expect(result).toEqual({});
  });
});
