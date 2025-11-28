import { describe, it, expect } from 'vitest';

import { createNameSchema, createFullNameSchema, NAME_SUFFIXES } from './name';

describe('createNameSchema', () => {
  const schema = createNameSchema();

  describe('valid names', () => {
    it('accepts simple name', () => {
      expect(schema.safeParse('John').success).toBe(true);
    });

    it('accepts name with spaces', () => {
      expect(schema.safeParse('Mary Jane').success).toBe(true);
    });

    it('accepts name with hyphen', () => {
      expect(schema.safeParse('Jean-Pierre').success).toBe(true);
    });

    it('accepts name with apostrophe', () => {
      expect(schema.safeParse("O'Brien").success).toBe(true);
    });

    it('accepts name with multiple hyphens', () => {
      expect(schema.safeParse('Anna-Marie-Louise').success).toBe(true);
    });

    it('accepts name with multiple apostrophes', () => {
      expect(schema.safeParse("O'Neil's").success).toBe(true);
    });

    it('accepts name with spaces and hyphens', () => {
      expect(schema.safeParse('Mary-Anne Smith').success).toBe(true);
    });

    it('accepts name with spaces and apostrophes', () => {
      expect(schema.safeParse("Mary O'Brien Smith").success).toBe(true);
    });

    it('accepts name with all allowed characters', () => {
      expect(schema.safeParse("Jean-Pierre D'Artagnan Smith").success).toBe(true);
    });

    it('accepts single letter name', () => {
      expect(schema.safeParse('X').success).toBe(true);
    });

    it('accepts uppercase name', () => {
      expect(schema.safeParse('JOHN').success).toBe(true);
    });

    it('accepts lowercase name', () => {
      expect(schema.safeParse('john').success).toBe(true);
    });

    it('accepts mixed case name', () => {
      expect(schema.safeParse('McDonald').success).toBe(true);
    });

    it('accepts long name within default max', () => {
      const longName = 'A'.repeat(100);
      expect(schema.safeParse(longName).success).toBe(true);
    });
  });

  describe('invalid names', () => {
    it('rejects empty string', () => {
      expect(schema.safeParse('').success).toBe(false);
    });

    it('rejects name with numbers', () => {
      expect(schema.safeParse('John123').success).toBe(false);
    });

    it('rejects name with special characters', () => {
      expect(schema.safeParse('John@Doe').success).toBe(false);
    });

    it('rejects name with underscores', () => {
      expect(schema.safeParse('John_Doe').success).toBe(false);
    });

    it('rejects name with periods', () => {
      expect(schema.safeParse('John.Doe').success).toBe(false);
    });

    it('rejects name with commas', () => {
      expect(schema.safeParse('John,Doe').success).toBe(false);
    });

    it('rejects name starting with space', () => {
      expect(schema.safeParse(' John').success).toBe(false);
    });

    it('rejects name starting with hyphen', () => {
      expect(schema.safeParse('-John').success).toBe(false);
    });

    it('rejects name starting with apostrophe', () => {
      expect(schema.safeParse("'John").success).toBe(false);
    });

    it('rejects name with only spaces', () => {
      expect(schema.safeParse('   ').success).toBe(false);
    });

    it('rejects name with only hyphens', () => {
      expect(schema.safeParse('---').success).toBe(false);
    });

    it('rejects name with only apostrophes', () => {
      expect(schema.safeParse("'''").success).toBe(false);
    });

    it('rejects name exceeding max length', () => {
      const tooLongName = 'A'.repeat(101);
      expect(schema.safeParse(tooLongName).success).toBe(false);
    });
  });

  describe('custom min length', () => {
    const minSchema = createNameSchema({ min: 3 });

    it('accepts name meeting minimum length', () => {
      expect(minSchema.safeParse('Joe').success).toBe(true);
    });

    it('accepts name exceeding minimum length', () => {
      expect(minSchema.safeParse('Joseph').success).toBe(true);
    });

    it('rejects name below minimum length', () => {
      expect(minSchema.safeParse('Jo').success).toBe(false);
    });
  });

  describe('custom max length', () => {
    const maxSchema = createNameSchema({ max: 10 });

    it('accepts name at max length', () => {
      expect(maxSchema.safeParse('A'.repeat(10)).success).toBe(true);
    });

    it('accepts name below max length', () => {
      expect(maxSchema.safeParse('John').success).toBe(true);
    });

    it('rejects name exceeding max length', () => {
      expect(maxSchema.safeParse('A'.repeat(11)).success).toBe(false);
    });
  });

  describe('optional mode', () => {
    const optionalSchema = createNameSchema({ required: false });

    it('accepts empty string', () => {
      expect(optionalSchema.safeParse('').success).toBe(true);
    });

    it('accepts undefined', () => {
      expect(optionalSchema.safeParse(undefined).success).toBe(true);
    });

    it('still validates format when value is provided', () => {
      expect(optionalSchema.safeParse('John123').success).toBe(false);
    });

    it('still enforces max length when value is provided', () => {
      const optionalMaxSchema = createNameSchema({ required: false, max: 10 });
      expect(optionalMaxSchema.safeParse('A'.repeat(11)).success).toBe(false);
    });

    it('accepts valid name when provided', () => {
      expect(optionalSchema.safeParse('John').success).toBe(true);
    });
  });

  describe('custom error messages', () => {
    it('uses custom required message', () => {
      const customSchema = createNameSchema({
        messages: {
          required: 'Please enter your name',
        },
      });
      const result = customSchema.safeParse('');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Please enter your name');
      }
    });

    it('uses custom invalid message', () => {
      const customSchema = createNameSchema({
        messages: {
          invalid: 'Name contains invalid characters',
        },
      });
      const result = customSchema.safeParse('John123');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Name contains invalid characters');
      }
    });

    it('uses custom max message', () => {
      const customSchema = createNameSchema({
        max: 10,
        messages: {
          max: 'Name is too long',
        },
      });
      const result = customSchema.safeParse('A'.repeat(11));
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Name is too long');
      }
    });

    it('provides default invalid message when not customized', () => {
      const result = schema.safeParse('John123');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toContain(
          'letters, spaces, hyphens, and apostrophes'
        );
      }
    });
  });

  describe('edge cases', () => {
    it('accepts name with trailing spaces', () => {
      expect(schema.safeParse('John Doe').success).toBe(true);
    });

    it('accepts name with multiple consecutive spaces', () => {
      expect(schema.safeParse('John  Doe').success).toBe(true);
    });

    it('accepts name with multiple consecutive hyphens', () => {
      expect(schema.safeParse('John--Doe').success).toBe(true);
    });

    it('accepts name with multiple consecutive apostrophes', () => {
      expect(schema.safeParse("O''Brien").success).toBe(true);
    });
  });
});

describe('createFullNameSchema', () => {
  const schema = createFullNameSchema();

  describe('valid full names', () => {
    it('accepts full name with all required fields', () => {
      const result = schema.safeParse({
        first: 'John',
        middle: 'William',
        last: 'Doe',
      });
      expect(result.success).toBe(true);
    });

    it('accepts full name without middle name', () => {
      const result = schema.safeParse({
        first: 'John',
        middle: '',
        last: 'Doe',
      });
      expect(result.success).toBe(true);
    });

    it('accepts full name with suffix', () => {
      const result = schema.safeParse({
        first: 'John',
        middle: 'William',
        last: 'Doe',
        suffix: 'Jr.',
      });
      expect(result.success).toBe(true);
    });

    it('accepts full name without suffix', () => {
      const result = schema.safeParse({
        first: 'John',
        middle: 'William',
        last: 'Doe',
        suffix: '',
      });
      expect(result.success).toBe(true);
    });

    it('accepts all valid suffixes', () => {
      NAME_SUFFIXES.forEach(suffix => {
        const result = schema.safeParse({
          first: 'John',
          last: 'Doe',
          suffix: suffix,
        });
        expect(result.success).toBe(true);
      });
    });

    it('accepts names with hyphens', () => {
      const result = schema.safeParse({
        first: 'Mary-Anne',
        middle: 'Jean-Pierre',
        last: 'Smith-Jones',
      });
      expect(result.success).toBe(true);
    });

    it('accepts names with apostrophes', () => {
      const result = schema.safeParse({
        first: 'Sean',
        middle: "D'Angelo",
        last: "O'Brien",
      });
      expect(result.success).toBe(true);
    });

    it('accepts names with spaces', () => {
      const result = schema.safeParse({
        first: 'Mary Anne',
        middle: 'De La',
        last: 'Von Smith',
      });
      expect(result.success).toBe(true);
    });

    it('accepts middle name as undefined', () => {
      const result = schema.safeParse({
        first: 'John',
        middle: undefined,
        last: 'Doe',
      });
      expect(result.success).toBe(true);
    });

    it('accepts suffix as undefined', () => {
      const result = schema.safeParse({
        first: 'John',
        last: 'Doe',
        suffix: undefined,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('invalid full names', () => {
    it('rejects missing first name', () => {
      const result = schema.safeParse({
        middle: 'William',
        last: 'Doe',
      });
      expect(result.success).toBe(false);
    });

    it('rejects empty first name', () => {
      const result = schema.safeParse({
        first: '',
        middle: 'William',
        last: 'Doe',
      });
      expect(result.success).toBe(false);
    });

    it('rejects missing last name', () => {
      const result = schema.safeParse({
        first: 'John',
        middle: 'William',
      });
      expect(result.success).toBe(false);
    });

    it('rejects empty last name', () => {
      const result = schema.safeParse({
        first: 'John',
        middle: 'William',
        last: '',
      });
      expect(result.success).toBe(false);
    });

    it('rejects first name with numbers', () => {
      const result = schema.safeParse({
        first: 'John123',
        last: 'Doe',
      });
      expect(result.success).toBe(false);
    });

    it('rejects last name with numbers', () => {
      const result = schema.safeParse({
        first: 'John',
        last: 'Doe456',
      });
      expect(result.success).toBe(false);
    });

    it('rejects middle name with numbers', () => {
      const result = schema.safeParse({
        first: 'John',
        middle: 'William789',
        last: 'Doe',
      });
      expect(result.success).toBe(false);
    });

    it('rejects invalid suffix', () => {
      const result = schema.safeParse({
        first: 'John',
        last: 'Doe',
        suffix: 'Esquire',
      });
      expect(result.success).toBe(false);
    });

    it('rejects first name exceeding max length', () => {
      const result = schema.safeParse({
        first: 'A'.repeat(51),
        last: 'Doe',
      });
      expect(result.success).toBe(false);
    });

    it('rejects last name exceeding max length', () => {
      const result = schema.safeParse({
        first: 'John',
        last: 'A'.repeat(51),
      });
      expect(result.success).toBe(false);
    });

    it('rejects middle name exceeding max length', () => {
      const result = schema.safeParse({
        first: 'John',
        middle: 'A'.repeat(51),
        last: 'Doe',
      });
      expect(result.success).toBe(false);
    });

    it('rejects first name with special characters', () => {
      const result = schema.safeParse({
        first: 'John@',
        last: 'Doe',
      });
      expect(result.success).toBe(false);
    });

    it('rejects last name with special characters', () => {
      const result = schema.safeParse({
        first: 'John',
        last: 'Doe#',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('optional mode', () => {
    const optionalSchema = createFullNameSchema({ required: false });

    it('accepts empty first name', () => {
      const result = optionalSchema.safeParse({
        first: '',
        middle: '',
        last: '',
      });
      expect(result.success).toBe(true);
    });

    it('accepts undefined first name', () => {
      const result = optionalSchema.safeParse({
        first: undefined,
        middle: undefined,
        last: undefined,
      });
      expect(result.success).toBe(true);
    });

    it('still validates format when first name is provided', () => {
      const result = optionalSchema.safeParse({
        first: 'John123',
        last: '',
      });
      expect(result.success).toBe(false);
    });

    it('still validates format when last name is provided', () => {
      const result = optionalSchema.safeParse({
        first: '',
        last: 'Doe456',
      });
      expect(result.success).toBe(false);
    });

    it('accepts partial data with valid first name', () => {
      const result = optionalSchema.safeParse({
        first: 'John',
        last: '',
      });
      expect(result.success).toBe(true);
    });

    it('accepts partial data with valid last name', () => {
      const result = optionalSchema.safeParse({
        first: '',
        last: 'Doe',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('suffix enumeration', () => {
    it('includes Jr.', () => {
      expect(NAME_SUFFIXES).toContain('Jr.');
    });

    it('includes Sr.', () => {
      expect(NAME_SUFFIXES).toContain('Sr.');
    });

    it('includes Roman numerals II through V', () => {
      expect(NAME_SUFFIXES).toContain('II');
      expect(NAME_SUFFIXES).toContain('III');
      expect(NAME_SUFFIXES).toContain('IV');
      expect(NAME_SUFFIXES).toContain('V');
    });

    it('has exactly 6 suffix options', () => {
      expect(NAME_SUFFIXES).toHaveLength(6);
    });
  });

  describe('edge cases', () => {
    it('accepts single letter first name', () => {
      const result = schema.safeParse({
        first: 'X',
        last: 'Doe',
      });
      expect(result.success).toBe(true);
    });

    it('accepts single letter last name', () => {
      const result = schema.safeParse({
        first: 'John',
        last: 'X',
      });
      expect(result.success).toBe(true);
    });

    it('accepts single letter middle name', () => {
      const result = schema.safeParse({
        first: 'John',
        middle: 'Q',
        last: 'Doe',
      });
      expect(result.success).toBe(true);
    });

    it('accepts names at exactly max length', () => {
      const result = schema.safeParse({
        first: 'A'.repeat(50),
        middle: 'B'.repeat(50),
        last: 'C'.repeat(50),
      });
      expect(result.success).toBe(true);
    });

    it('accepts complex name combinations', () => {
      const result = schema.safeParse({
        first: "Mary-Anne O'Connor",
        middle: "Jean-Pierre D'Angelo",
        last: "Smith-Jones O'Brien",
        suffix: 'III',
      });
      expect(result.success).toBe(true);
    });
  });
});
