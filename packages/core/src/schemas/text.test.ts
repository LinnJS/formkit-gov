import { describe, it, expect } from 'vitest';

import { createTextSchema } from './text';

describe('createTextSchema', () => {
  describe('required mode (default)', () => {
    const schema = createTextSchema();

    it('accepts non-empty string', () => {
      expect(schema.safeParse('hello').success).toBe(true);
    });

    it('accepts string with spaces', () => {
      expect(schema.safeParse('hello world').success).toBe(true);
    });

    it('accepts single character', () => {
      expect(schema.safeParse('a').success).toBe(true);
    });

    it('rejects empty string', () => {
      const result = schema.safeParse('');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('This field is required');
      }
    });
  });

  describe('optional mode', () => {
    const optionalSchema = createTextSchema({ required: false });

    it('accepts empty string', () => {
      expect(optionalSchema.safeParse('').success).toBe(true);
    });

    it('accepts undefined', () => {
      expect(optionalSchema.safeParse(undefined).success).toBe(true);
    });

    it('accepts non-empty string', () => {
      expect(optionalSchema.safeParse('hello').success).toBe(true);
    });
  });

  describe('minimum length validation', () => {
    const schema = createTextSchema({ min: 5 });

    it('accepts string equal to minimum length', () => {
      expect(schema.safeParse('hello').success).toBe(true);
    });

    it('accepts string longer than minimum length', () => {
      expect(schema.safeParse('hello world').success).toBe(true);
    });

    it('rejects string shorter than minimum length', () => {
      const result = schema.safeParse('hi');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Must be at least 5 characters');
      }
    });

    it('rejects empty string (required + min)', () => {
      const result = schema.safeParse('');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('This field is required');
      }
    });
  });

  describe('maximum length validation', () => {
    const schema = createTextSchema({ max: 10 });

    it('accepts string equal to maximum length', () => {
      expect(schema.safeParse('1234567890').success).toBe(true);
    });

    it('accepts string shorter than maximum length', () => {
      expect(schema.safeParse('hello').success).toBe(true);
    });

    it('rejects string longer than maximum length', () => {
      const result = schema.safeParse('12345678901');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Must be no more than 10 characters');
      }
    });
  });

  describe('combined min and max validation', () => {
    const schema = createTextSchema({ min: 3, max: 10 });

    it('accepts string within range', () => {
      expect(schema.safeParse('hello').success).toBe(true);
    });

    it('accepts string at minimum length', () => {
      expect(schema.safeParse('abc').success).toBe(true);
    });

    it('accepts string at maximum length', () => {
      expect(schema.safeParse('1234567890').success).toBe(true);
    });

    it('rejects string below minimum', () => {
      const result = schema.safeParse('ab');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Must be at least 3 characters');
      }
    });

    it('rejects string above maximum', () => {
      const result = schema.safeParse('12345678901');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Must be no more than 10 characters');
      }
    });
  });

  describe('optional with min/max validation', () => {
    const schema = createTextSchema({ min: 3, max: 10, required: false });

    it('accepts undefined', () => {
      expect(schema.safeParse(undefined).success).toBe(true);
    });

    it('rejects empty string when min is set', () => {
      // When min is set, empty string fails min validation even in optional mode
      expect(schema.safeParse('').success).toBe(false);
    });

    it('validates when value is provided', () => {
      expect(schema.safeParse('hello').success).toBe(true);
    });

    it('still enforces minimum when value is provided', () => {
      const result = schema.safeParse('ab');
      expect(result.success).toBe(false);
    });

    it('still enforces maximum when value is provided', () => {
      const result = schema.safeParse('12345678901');
      expect(result.success).toBe(false);
    });
  });

  describe('optional without min constraint', () => {
    const schema = createTextSchema({ max: 10, required: false });

    it('accepts empty string', () => {
      expect(schema.safeParse('').success).toBe(true);
    });

    it('accepts undefined', () => {
      expect(schema.safeParse(undefined).success).toBe(true);
    });

    it('accepts string within max', () => {
      expect(schema.safeParse('hello').success).toBe(true);
    });

    it('still enforces maximum', () => {
      const result = schema.safeParse('12345678901');
      expect(result.success).toBe(false);
    });
  });

  describe('edge cases for min validation', () => {
    it('ignores min when min is 0', () => {
      const schema = createTextSchema({ min: 0 });
      expect(schema.safeParse('').success).toBe(false); // Still fails because required=true by default
    });

    it('ignores min when min is negative', () => {
      const schema = createTextSchema({ min: -1 });
      expect(schema.safeParse('').success).toBe(false); // Still fails because required=true by default
    });

    it('accepts min: 1 with single character', () => {
      const schema = createTextSchema({ min: 1 });
      expect(schema.safeParse('a').success).toBe(true);
    });
  });

  describe('custom error messages', () => {
    it('allows custom required message', () => {
      const schema = createTextSchema({
        messages: {
          required: 'Please enter a value',
        },
      });
      const result = schema.safeParse('');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Please enter a value');
      }
    });

    it('allows custom min message', () => {
      const schema = createTextSchema({
        min: 5,
        messages: {
          min: 'Too short!',
        },
      });
      const result = schema.safeParse('hi');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Too short!');
      }
    });

    it('allows custom max message', () => {
      const schema = createTextSchema({
        max: 5,
        messages: {
          max: 'Too long!',
        },
      });
      const result = schema.safeParse('hello world');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Too long!');
      }
    });

    it('allows all custom messages together', () => {
      const schema = createTextSchema({
        min: 3,
        max: 10,
        messages: {
          required: 'Custom required',
          min: 'Custom min',
          max: 'Custom max',
        },
      });

      // Test required
      let result = schema.safeParse('');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Custom required');
      }

      // Test min
      result = schema.safeParse('ab');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Custom min');
      }

      // Test max
      result = schema.safeParse('12345678901');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Custom max');
      }
    });
  });

  describe('special characters', () => {
    const schema = createTextSchema();

    it('accepts unicode characters', () => {
      expect(schema.safeParse('Hello 世界').success).toBe(true);
    });

    it('accepts special characters', () => {
      expect(schema.safeParse('!@#$%^&*()').success).toBe(true);
    });

    it('accepts newlines and tabs', () => {
      expect(schema.safeParse('hello\nworld\t!').success).toBe(true);
    });

    it('counts unicode characters correctly for length', () => {
      const schema = createTextSchema({ min: 3, max: 3 });
      expect(schema.safeParse('世界界').success).toBe(true);
    });
  });

  describe('whitespace handling', () => {
    const schema = createTextSchema({ min: 5 });

    it('counts leading whitespace in length', () => {
      expect(schema.safeParse('  hello').success).toBe(true);
    });

    it('counts trailing whitespace in length', () => {
      expect(schema.safeParse('hello  ').success).toBe(true);
    });

    it('counts whitespace-only string as valid if meets min requirement', () => {
      expect(schema.safeParse('     ').success).toBe(true);
    });
  });

  describe('default options', () => {
    it('creates required schema with no options', () => {
      const schema = createTextSchema();
      expect(schema.safeParse('').success).toBe(false);
      expect(schema.safeParse('hello').success).toBe(true);
    });

    it('creates schema with empty options object', () => {
      const schema = createTextSchema({});
      expect(schema.safeParse('').success).toBe(false);
      expect(schema.safeParse('hello').success).toBe(true);
    });
  });

  describe('type validation', () => {
    const schema = createTextSchema();

    it('rejects non-string values', () => {
      expect(schema.safeParse(123).success).toBe(false);
      expect(schema.safeParse(true).success).toBe(false);
      expect(schema.safeParse(null).success).toBe(false);
      expect(schema.safeParse({}).success).toBe(false);
      expect(schema.safeParse([]).success).toBe(false);
    });
  });
});
