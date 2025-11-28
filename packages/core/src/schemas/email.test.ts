import { describe, expect, it } from 'vitest';

import { createEmailSchema } from './email';

describe('createEmailSchema', () => {
  describe('required mode (default)', () => {
    const schema = createEmailSchema();

    it('accepts valid email address', () => {
      expect(schema.safeParse('user@example.com').success).toBe(true);
    });

    it('accepts email with subdomain', () => {
      expect(schema.safeParse('user@mail.example.com').success).toBe(true);
    });

    it('accepts email with plus sign', () => {
      expect(schema.safeParse('user+tag@example.com').success).toBe(true);
    });

    it('accepts email with dots in local part', () => {
      expect(schema.safeParse('first.last@example.com').success).toBe(true);
    });

    it('accepts email with numbers', () => {
      expect(schema.safeParse('user123@example456.com').success).toBe(true);
    });

    it('accepts email with hyphens in domain', () => {
      expect(schema.safeParse('user@my-domain.com').success).toBe(true);
    });

    it('accepts email with underscores', () => {
      expect(schema.safeParse('user_name@example.com').success).toBe(true);
    });

    it('accepts short top-level domain', () => {
      expect(schema.safeParse('user@example.co').success).toBe(true);
    });

    it('accepts long top-level domain', () => {
      expect(schema.safeParse('user@example.travel').success).toBe(true);
    });

    it('rejects empty string', () => {
      const result = schema.safeParse('');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Email address is required');
      }
    });

    it('rejects email without @ symbol', () => {
      const result = schema.safeParse('userexample.com');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Enter a valid email address');
      }
    });

    it('rejects email without domain', () => {
      const result = schema.safeParse('user@');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Enter a valid email address');
      }
    });

    it('rejects email without local part', () => {
      const result = schema.safeParse('@example.com');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Enter a valid email address');
      }
    });

    it('rejects email without TLD', () => {
      const result = schema.safeParse('user@example');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Enter a valid email address');
      }
    });

    it('rejects email with spaces', () => {
      const result = schema.safeParse('user @example.com');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Enter a valid email address');
      }
    });

    it('rejects email with multiple @ symbols', () => {
      const result = schema.safeParse('user@@example.com');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Enter a valid email address');
      }
    });

    it('accepts email starting with dot (simple pattern)', () => {
      // Note: The EMAIL_PATTERN is simplified and allows this
      expect(schema.safeParse('.user@example.com').success).toBe(true);
    });

    it('accepts email ending with dot before @ (simple pattern)', () => {
      // Note: The EMAIL_PATTERN is simplified and allows this
      expect(schema.safeParse('user.@example.com').success).toBe(true);
    });
  });

  describe('optional mode', () => {
    const optionalSchema = createEmailSchema({ required: false });

    it('accepts empty string', () => {
      expect(optionalSchema.safeParse('').success).toBe(true);
    });

    it('accepts undefined', () => {
      expect(optionalSchema.safeParse(undefined).success).toBe(true);
    });

    it('accepts valid email when provided', () => {
      expect(optionalSchema.safeParse('user@example.com').success).toBe(true);
    });

    it('still validates invalid email when value is provided', () => {
      const result = optionalSchema.safeParse('invalid-email');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Enter a valid email address');
      }
    });

    it('rejects email without @ when value is provided', () => {
      expect(optionalSchema.safeParse('userexample.com').success).toBe(false);
    });

    it('rejects email without TLD when value is provided', () => {
      expect(optionalSchema.safeParse('user@example').success).toBe(false);
    });
  });

  describe('custom error messages', () => {
    it('allows custom required message', () => {
      const schema = createEmailSchema({
        messages: {
          required: 'Please provide your email',
        },
      });
      const result = schema.safeParse('');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Please provide your email');
      }
    });

    it('allows custom invalid message', () => {
      const schema = createEmailSchema({
        messages: {
          invalid: 'That is not a valid email',
        },
      });
      const result = schema.safeParse('invalid');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('That is not a valid email');
      }
    });

    it('allows both custom messages', () => {
      const schema = createEmailSchema({
        messages: {
          required: 'Custom required',
          invalid: 'Custom invalid',
        },
      });

      // Test required
      let result = schema.safeParse('');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Custom required');
      }

      // Test invalid
      result = schema.safeParse('not-an-email');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Custom invalid');
      }
    });

    it('uses custom invalid message in optional mode', () => {
      const schema = createEmailSchema({
        required: false,
        messages: {
          invalid: 'Invalid email format',
        },
      });
      const result = schema.safeParse('bad-email');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Invalid email format');
      }
    });
  });

  describe('edge cases', () => {
    const schema = createEmailSchema();

    it('accepts single character local part', () => {
      expect(schema.safeParse('a@example.com').success).toBe(true);
    });

    it('accepts single character domain', () => {
      expect(schema.safeParse('user@a.com').success).toBe(true);
    });

    it('accepts very long email', () => {
      const longEmail = 'a'.repeat(50) + '@' + 'b'.repeat(50) + '.com';
      expect(schema.safeParse(longEmail).success).toBe(true);
    });

    it('rejects email with only spaces', () => {
      expect(schema.safeParse('   ').success).toBe(false);
    });

    it('rejects email with trailing spaces', () => {
      expect(schema.safeParse('user@example.com ').success).toBe(false);
    });

    it('rejects email with leading spaces', () => {
      expect(schema.safeParse(' user@example.com').success).toBe(false);
    });

    it('rejects just @ symbol', () => {
      expect(schema.safeParse('@').success).toBe(false);
    });

    it('rejects just domain', () => {
      expect(schema.safeParse('example.com').success).toBe(false);
    });
  });

  describe('special characters in email', () => {
    const schema = createEmailSchema();

    it('accepts hyphen in local part', () => {
      expect(schema.safeParse('first-last@example.com').success).toBe(true);
    });

    it('accepts numbers in local part', () => {
      expect(schema.safeParse('user123@example.com').success).toBe(true);
    });

    it('accepts numbers in domain', () => {
      expect(schema.safeParse('user@example123.com').success).toBe(true);
    });

    it('accepts some special characters (simple pattern)', () => {
      // Note: The EMAIL_PATTERN is simplified - it only checks for basic structure
      expect(schema.safeParse('user#name@example.com').success).toBe(true);
    });

    it('rejects spaces in email', () => {
      expect(schema.safeParse('user@exam ple.com').success).toBe(false);
    });

    it('accepts consecutive dots (simple pattern)', () => {
      // Note: The EMAIL_PATTERN is simplified and allows this
      expect(schema.safeParse('user@example..com').success).toBe(true);
    });
  });

  describe('type validation', () => {
    const schema = createEmailSchema();

    it('rejects non-string values', () => {
      expect(schema.safeParse(123).success).toBe(false);
      expect(schema.safeParse(true).success).toBe(false);
      expect(schema.safeParse(null).success).toBe(false);
      expect(schema.safeParse({}).success).toBe(false);
      expect(schema.safeParse([]).success).toBe(false);
    });
  });

  describe('default options', () => {
    it('creates required schema with no options', () => {
      const schema = createEmailSchema();
      expect(schema.safeParse('').success).toBe(false);
      expect(schema.safeParse('user@example.com').success).toBe(true);
    });

    it('creates schema with empty options object', () => {
      const schema = createEmailSchema({});
      expect(schema.safeParse('').success).toBe(false);
      expect(schema.safeParse('user@example.com').success).toBe(true);
    });
  });

  describe('common valid email formats', () => {
    const schema = createEmailSchema();

    it('accepts standard email', () => {
      expect(schema.safeParse('john.doe@company.com').success).toBe(true);
    });

    it('accepts email with subdomain', () => {
      expect(schema.safeParse('user@mail.company.com').success).toBe(true);
    });

    it('accepts government email', () => {
      expect(schema.safeParse('veteran@va.gov').success).toBe(true);
    });

    it('accepts military email', () => {
      expect(schema.safeParse('soldier@army.mil').success).toBe(true);
    });

    it('accepts education email', () => {
      expect(schema.safeParse('student@university.edu').success).toBe(true);
    });

    it('accepts international domain', () => {
      expect(schema.safeParse('user@example.co.uk').success).toBe(true);
    });
  });

  describe('common invalid email formats', () => {
    const schema = createEmailSchema();

    it('rejects plaintext', () => {
      expect(schema.safeParse('plaintext').success).toBe(false);
    });

    it('rejects missing domain name', () => {
      expect(schema.safeParse('user@.com').success).toBe(false);
    });

    it('accepts double dots (simple pattern)', () => {
      // Note: The EMAIL_PATTERN is simplified and allows this
      expect(schema.safeParse('user@example..com').success).toBe(true);
    });

    it('rejects comma instead of dot', () => {
      expect(schema.safeParse('user@example,com').success).toBe(false);
    });

    it('rejects incomplete domain', () => {
      expect(schema.safeParse('user@example.').success).toBe(false);
    });
  });
});
