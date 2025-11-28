import { describe, it, expect } from 'vitest';

import { createPhoneSchema } from './phone';

describe('createPhoneSchema', () => {
  describe('US phone numbers (default)', () => {
    const schema = createPhoneSchema();

    describe('valid US phone numbers', () => {
      it('accepts phone with parentheses and space', () => {
        expect(schema.safeParse('(555) 123-4567').success).toBe(true);
      });

      it('accepts phone with parentheses without space', () => {
        expect(schema.safeParse('(555)123-4567').success).toBe(true);
      });

      it('accepts phone with dashes', () => {
        expect(schema.safeParse('555-123-4567').success).toBe(true);
      });

      it('accepts different area codes', () => {
        expect(schema.safeParse('(212) 555-0100').success).toBe(true);
        expect(schema.safeParse('415-555-0199').success).toBe(true);
        expect(schema.safeParse('(800) 123-4567').success).toBe(true);
      });
    });

    describe('invalid US phone numbers', () => {
      it('rejects phone without formatting', () => {
        expect(schema.safeParse('5551234567').success).toBe(false);
      });

      it('rejects phone with wrong format', () => {
        expect(schema.safeParse('555.123.4567').success).toBe(false);
      });

      it('rejects phone with spaces only', () => {
        expect(schema.safeParse('555 123 4567').success).toBe(false);
      });

      it('rejects phone with too few digits', () => {
        expect(schema.safeParse('(555) 123-456').success).toBe(false);
      });

      it('rejects phone with too many digits', () => {
        expect(schema.safeParse('(555) 123-45678').success).toBe(false);
      });

      it('rejects phone with letters', () => {
        expect(schema.safeParse('(555) ABC-DEFG').success).toBe(false);
      });

      it('rejects empty string', () => {
        expect(schema.safeParse('').success).toBe(false);
      });

      it('rejects international format in US mode', () => {
        expect(schema.safeParse('+1 555 123 4567').success).toBe(false);
      });
    });
  });

  describe('international phone numbers', () => {
    const schema = createPhoneSchema({ international: true });

    describe('valid international phone numbers', () => {
      it('accepts phone with + prefix', () => {
        expect(schema.safeParse('+15551234567').success).toBe(true);
      });

      it('accepts phone without + prefix', () => {
        expect(schema.safeParse('15551234567').success).toBe(true);
      });

      it('accepts UK phone numbers', () => {
        expect(schema.safeParse('+442071234567').success).toBe(true);
      });

      it('accepts Germany phone numbers', () => {
        expect(schema.safeParse('+4930123456').success).toBe(true);
      });

      it('accepts Japan phone numbers', () => {
        expect(schema.safeParse('+81312345678').success).toBe(true);
      });

      it('accepts short international numbers', () => {
        expect(schema.safeParse('+123').success).toBe(true);
      });

      it('accepts long international numbers', () => {
        expect(schema.safeParse('+123456789012345').success).toBe(true);
      });
    });

    describe('invalid international phone numbers', () => {
      it('rejects phone starting with 0', () => {
        expect(schema.safeParse('+0123456789').success).toBe(false);
      });

      it('rejects phone starting with + and 0', () => {
        expect(schema.safeParse('+0').success).toBe(false);
      });

      it('rejects phone with too many digits', () => {
        expect(schema.safeParse('+1234567890123456').success).toBe(false);
      });

      it('rejects phone with spaces', () => {
        expect(schema.safeParse('+1 555 123 4567').success).toBe(false);
      });

      it('rejects phone with dashes', () => {
        expect(schema.safeParse('+1-555-123-4567').success).toBe(false);
      });

      it('rejects phone with letters', () => {
        expect(schema.safeParse('+1555CALLME').success).toBe(false);
      });

      it('rejects empty string', () => {
        expect(schema.safeParse('').success).toBe(false);
      });
    });
  });

  describe('optional mode', () => {
    const optionalSchema = createPhoneSchema({ required: false });

    it('accepts empty string', () => {
      expect(optionalSchema.safeParse('').success).toBe(true);
    });

    it('accepts undefined', () => {
      expect(optionalSchema.safeParse(undefined).success).toBe(true);
    });

    it('still validates when value is provided', () => {
      expect(optionalSchema.safeParse('invalid').success).toBe(false);
    });

    it('accepts valid phone when provided', () => {
      expect(optionalSchema.safeParse('(555) 123-4567').success).toBe(true);
    });
  });

  describe('optional mode with international', () => {
    const optionalInternationalSchema = createPhoneSchema({
      required: false,
      international: true,
    });

    it('accepts empty string', () => {
      expect(optionalInternationalSchema.safeParse('').success).toBe(true);
    });

    it('accepts undefined', () => {
      expect(optionalInternationalSchema.safeParse(undefined).success).toBe(true);
    });

    it('accepts valid international phone when provided', () => {
      expect(optionalInternationalSchema.safeParse('+15551234567').success).toBe(true);
    });
  });

  describe('error messages', () => {
    describe('US phone error messages', () => {
      const schema = createPhoneSchema();

      it('provides user-friendly error message for invalid format', () => {
        const result = schema.safeParse('invalid');
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0]?.message).toBe('Enter a valid 10-digit phone number');
        }
      });

      it('provides required error message for empty string', () => {
        const result = schema.safeParse('');
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0]?.message).toBe('Phone number is required');
        }
      });

      it('allows custom invalid message', () => {
        const customSchema = createPhoneSchema({
          messages: {
            invalid: 'Custom phone error',
          },
        });
        const result = customSchema.safeParse('invalid');
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0]?.message).toBe('Custom phone error');
        }
      });

      it('allows custom required message', () => {
        const customSchema = createPhoneSchema({
          messages: {
            required: 'Custom required error',
          },
        });
        const result = customSchema.safeParse('');
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0]?.message).toBe('Custom required error');
        }
      });
    });

    describe('international phone error messages', () => {
      const schema = createPhoneSchema({ international: true });

      it('provides user-friendly error message for invalid format', () => {
        const result = schema.safeParse('invalid');
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0]?.message).toBe('Enter a valid phone number');
        }
      });

      it('allows custom invalid message', () => {
        const customSchema = createPhoneSchema({
          international: true,
          messages: {
            invalid: 'Custom international phone error',
          },
        });
        const result = customSchema.safeParse('invalid');
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0]?.message).toBe('Custom international phone error');
        }
      });
    });
  });

  describe('edge cases', () => {
    const schema = createPhoneSchema();

    it('rejects null', () => {
      expect(schema.safeParse(null).success).toBe(false);
    });

    it('rejects number type', () => {
      expect(schema.safeParse(5551234567).success).toBe(false);
    });

    it('rejects object', () => {
      expect(schema.safeParse({ phone: '555-123-4567' }).success).toBe(false);
    });

    it('rejects array', () => {
      expect(schema.safeParse(['555-123-4567']).success).toBe(false);
    });

    it('rejects whitespace only', () => {
      expect(schema.safeParse('   ').success).toBe(false);
    });

    it('rejects partial phone numbers', () => {
      expect(schema.safeParse('(555)').success).toBe(false);
      expect(schema.safeParse('555-').success).toBe(false);
    });
  });
});
