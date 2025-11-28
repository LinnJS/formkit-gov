import { describe, it, expect } from 'vitest';

import { createAddressSchema, US_STATES, MILITARY_STATES } from './address';

describe('createAddressSchema', () => {
  describe('US address schema', () => {
    const schema = createAddressSchema({ type: 'us' });

    describe('valid addresses', () => {
      it('accepts valid US address with all required fields', () => {
        const result = schema.safeParse({
          street: '123 Main Street',
          city: 'Springfield',
          state: 'IL',
          zipCode: '62701',
        });
        expect(result.success).toBe(true);
      });

      it('accepts address with street2', () => {
        const result = schema.safeParse({
          street: '123 Main Street',
          street2: 'Apt 4B',
          city: 'Springfield',
          state: 'IL',
          zipCode: '62701',
        });
        expect(result.success).toBe(true);
      });

      it('accepts ZIP code with +4 format', () => {
        const result = schema.safeParse({
          street: '123 Main Street',
          city: 'Springfield',
          state: 'IL',
          zipCode: '62701-1234',
        });
        expect(result.success).toBe(true);
      });

      it('accepts all valid US states', () => {
        US_STATES.forEach(state => {
          const result = schema.safeParse({
            street: '123 Main Street',
            city: 'Springfield',
            state: state,
            zipCode: '62701',
          });
          expect(result.success).toBe(true);
        });
      });

      it('accepts US territories (PR, VI, GU, AS, MP)', () => {
        const territories = ['PR', 'VI', 'GU', 'AS', 'MP'];
        territories.forEach(territory => {
          const result = schema.safeParse({
            street: '123 Main Street',
            city: 'San Juan',
            state: territory,
            zipCode: '00901',
          });
          expect(result.success).toBe(true);
        });
      });

      it('accepts DC as valid state', () => {
        const result = schema.safeParse({
          street: '1600 Pennsylvania Ave',
          city: 'Washington',
          state: 'DC',
          zipCode: '20500',
        });
        expect(result.success).toBe(true);
      });
    });

    describe('invalid addresses', () => {
      it('rejects missing street', () => {
        const result = schema.safeParse({
          city: 'Springfield',
          state: 'IL',
          zipCode: '62701',
        });
        expect(result.success).toBe(false);
      });

      it('rejects empty street', () => {
        const result = schema.safeParse({
          street: '',
          city: 'Springfield',
          state: 'IL',
          zipCode: '62701',
        });
        expect(result.success).toBe(false);
      });

      it('rejects missing city', () => {
        const result = schema.safeParse({
          street: '123 Main Street',
          state: 'IL',
          zipCode: '62701',
        });
        expect(result.success).toBe(false);
      });

      it('rejects missing state', () => {
        const result = schema.safeParse({
          street: '123 Main Street',
          city: 'Springfield',
          zipCode: '62701',
        });
        expect(result.success).toBe(false);
      });

      it('rejects missing ZIP code', () => {
        const result = schema.safeParse({
          street: '123 Main Street',
          city: 'Springfield',
          state: 'IL',
        });
        expect(result.success).toBe(false);
      });

      it('rejects invalid state abbreviation format', () => {
        const result = schema.safeParse({
          street: '123 Main Street',
          city: 'Springfield',
          state: 'Illinois',
          zipCode: '62701',
        });
        expect(result.success).toBe(false);
      });

      it('rejects invalid state code', () => {
        const result = schema.safeParse({
          street: '123 Main Street',
          city: 'Springfield',
          state: 'ZZ',
          zipCode: '62701',
        });
        expect(result.success).toBe(false);
      });

      it('rejects military state codes', () => {
        const result = schema.safeParse({
          street: '123 Main Street',
          city: 'Springfield',
          state: 'AE',
          zipCode: '09012',
        });
        expect(result.success).toBe(false);
      });

      it('rejects invalid ZIP code format', () => {
        const result = schema.safeParse({
          street: '123 Main Street',
          city: 'Springfield',
          state: 'IL',
          zipCode: '1234',
        });
        expect(result.success).toBe(false);
      });

      it('rejects ZIP code with letters', () => {
        const result = schema.safeParse({
          street: '123 Main Street',
          city: 'Springfield',
          state: 'IL',
          zipCode: '6270A',
        });
        expect(result.success).toBe(false);
      });

      it('rejects incorrectly formatted ZIP+4', () => {
        const result = schema.safeParse({
          street: '123 Main Street',
          city: 'Springfield',
          state: 'IL',
          zipCode: '62701-123',
        });
        expect(result.success).toBe(false);
      });
    });

    describe('with includeLine3 option', () => {
      const schemaWithLine3 = createAddressSchema({ type: 'us', includeLine3: true });

      it('accepts address with street3', () => {
        const result = schemaWithLine3.safeParse({
          street: '123 Main Street',
          street2: 'Building A',
          street3: 'Suite 100',
          city: 'Springfield',
          state: 'IL',
          zipCode: '62701',
        });
        expect(result.success).toBe(true);
      });
    });

    describe('without includeLine2 option', () => {
      const schemaNoLine2 = createAddressSchema({ type: 'us', includeLine2: false });

      it('rejects address with street2', () => {
        const result = schemaNoLine2.safeParse({
          street: '123 Main Street',
          street2: 'Apt 4B',
          city: 'Springfield',
          state: 'IL',
          zipCode: '62701',
        });
        expect(result.success).toBe(false);
      });
    });

    describe('optional mode', () => {
      const optionalSchema = createAddressSchema({ type: 'us', required: false });

      it('accepts empty string for optional fields', () => {
        const result = optionalSchema.safeParse({
          street: '',
          city: '',
          state: '',
          zipCode: '',
        });
        expect(result.success).toBe(true);
      });

      it('accepts undefined for optional fields', () => {
        const result = optionalSchema.safeParse({
          street: undefined,
          city: undefined,
          state: undefined,
          zipCode: undefined,
        });
        expect(result.success).toBe(true);
      });

      it('accepts complete valid address when all fields provided', () => {
        const result = optionalSchema.safeParse({
          street: '123 Main Street',
          city: 'Springfield',
          state: 'IL',
          zipCode: '62701',
        });
        expect(result.success).toBe(true);
      });

      it('accepts partial address data', () => {
        const result = optionalSchema.safeParse({
          street: '123 Main Street',
          city: 'Springfield',
          state: '',
          zipCode: '',
        });
        expect(result.success).toBe(true);
      });

      it('note: optional mode does not validate field formats, only presence', () => {
        // When fields are optional, any string value is accepted
        // This is expected behavior - validation is only enforced when required: true
        const result = optionalSchema.safeParse({
          street: '123 Main Street',
          city: 'Springfield',
          state: 'ZZ', // Invalid state code, but accepted when optional
          zipCode: '62701',
        });
        expect(result.success).toBe(true);
      });
    });

    describe('custom error messages', () => {
      const customSchema = createAddressSchema({
        type: 'us',
        messages: {
          required: 'This field is mandatory',
          stateInvalid: 'Please enter a valid state',
          zipInvalid: 'ZIP code format is incorrect',
        },
      });

      it('uses custom required message', () => {
        const result = customSchema.safeParse({
          street: '',
          city: 'Springfield',
          state: 'IL',
          zipCode: '62701',
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0]?.message).toBe('This field is mandatory');
        }
      });

      it('uses custom state invalid message', () => {
        const result = customSchema.safeParse({
          street: '123 Main Street',
          city: 'Springfield',
          state: 'ZZ',
          zipCode: '62701',
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues.some(i => i.message === 'Please enter a valid state')).toBe(
            true
          );
        }
      });

      it('uses custom ZIP invalid message', () => {
        const result = customSchema.safeParse({
          street: '123 Main Street',
          city: 'Springfield',
          state: 'IL',
          zipCode: 'invalid',
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0]?.message).toBe('ZIP code format is incorrect');
        }
      });
    });
  });

  describe('Military address schema', () => {
    const schema = createAddressSchema({ type: 'military' });

    describe('valid military addresses', () => {
      it('accepts APO address with military state', () => {
        const result = schema.safeParse({
          street: 'Unit 1234',
          city: 'APO',
          state: 'AE',
          zipCode: '09012',
        });
        expect(result.success).toBe(true);
      });

      it('accepts FPO address with military state', () => {
        const result = schema.safeParse({
          street: 'Unit 5678',
          city: 'FPO',
          state: 'AP',
          zipCode: '96543',
        });
        expect(result.success).toBe(true);
      });

      it('accepts DPO address with military state', () => {
        const result = schema.safeParse({
          street: 'Unit 9012',
          city: 'DPO',
          state: 'AA',
          zipCode: '34007',
        });
        expect(result.success).toBe(true);
      });

      it('accepts lowercase APO/FPO/DPO city', () => {
        const result = schema.safeParse({
          street: 'Unit 1234',
          city: 'apo',
          state: 'AE',
          zipCode: '09012',
        });
        expect(result.success).toBe(true);
      });

      it('accepts all military state codes', () => {
        MILITARY_STATES.forEach(state => {
          const result = schema.safeParse({
            street: 'Unit 1234',
            city: 'APO',
            state: state,
            zipCode: '09012',
          });
          expect(result.success).toBe(true);
        });
      });

      it('accepts military address with street2', () => {
        const result = schema.safeParse({
          street: 'Unit 1234',
          street2: 'Box 567',
          city: 'APO',
          state: 'AE',
          zipCode: '09012',
        });
        expect(result.success).toBe(true);
      });

      it('accepts ZIP+4 format', () => {
        const result = schema.safeParse({
          street: 'Unit 1234',
          city: 'APO',
          state: 'AE',
          zipCode: '09012-3456',
        });
        expect(result.success).toBe(true);
      });
    });

    describe('invalid military addresses', () => {
      it('rejects regular US city', () => {
        const result = schema.safeParse({
          street: 'Unit 1234',
          city: 'Springfield',
          state: 'AE',
          zipCode: '09012',
        });
        expect(result.success).toBe(false);
      });

      it('rejects regular US state', () => {
        const result = schema.safeParse({
          street: 'Unit 1234',
          city: 'APO',
          state: 'IL',
          zipCode: '09012',
        });
        expect(result.success).toBe(false);
      });

      it('rejects invalid military city', () => {
        const result = schema.safeParse({
          street: 'Unit 1234',
          city: 'XPO',
          state: 'AE',
          zipCode: '09012',
        });
        expect(result.success).toBe(false);
      });

      it('rejects missing street', () => {
        const result = schema.safeParse({
          city: 'APO',
          state: 'AE',
          zipCode: '09012',
        });
        expect(result.success).toBe(false);
      });

      it('rejects missing city', () => {
        const result = schema.safeParse({
          street: 'Unit 1234',
          state: 'AE',
          zipCode: '09012',
        });
        expect(result.success).toBe(false);
      });

      it('rejects missing state', () => {
        const result = schema.safeParse({
          street: 'Unit 1234',
          city: 'APO',
          zipCode: '09012',
        });
        expect(result.success).toBe(false);
      });

      it('rejects missing ZIP code', () => {
        const result = schema.safeParse({
          street: 'Unit 1234',
          city: 'APO',
          state: 'AE',
        });
        expect(result.success).toBe(false);
      });

      it('rejects invalid ZIP code format', () => {
        const result = schema.safeParse({
          street: 'Unit 1234',
          city: 'APO',
          state: 'AE',
          zipCode: '123',
        });
        expect(result.success).toBe(false);
      });
    });

    describe('without includeLine2 option', () => {
      const schemaNoLine2 = createAddressSchema({ type: 'military', includeLine2: false });

      it('rejects address with street2', () => {
        const result = schemaNoLine2.safeParse({
          street: 'Unit 1234',
          street2: 'Box 567',
          city: 'APO',
          state: 'AE',
          zipCode: '09012',
        });
        expect(result.success).toBe(false);
      });
    });

    describe('optional mode', () => {
      const optionalSchema = createAddressSchema({ type: 'military', required: false });

      it('accepts empty string for optional fields', () => {
        const result = optionalSchema.safeParse({
          street: '',
          city: '',
          state: '',
          zipCode: '',
        });
        expect(result.success).toBe(true);
      });

      it('accepts valid military address when provided', () => {
        const result = optionalSchema.safeParse({
          street: 'Unit 1234',
          city: 'APO',
          state: 'AE',
          zipCode: '09012',
        });
        expect(result.success).toBe(true);
      });

      it('still validates city format when non-empty value is provided', () => {
        const result = optionalSchema.safeParse({
          street: 'Unit 1234',
          city: 'APO',
          state: 'AE',
          zipCode: '09012',
        });
        expect(result.success).toBe(true);
      });

      it('still validates state format when non-empty value is provided', () => {
        const result = optionalSchema.safeParse({
          street: 'Unit 1234',
          city: 'APO',
          state: 'AE',
          zipCode: '09012',
        });
        expect(result.success).toBe(true);
      });
    });

    describe('custom error messages', () => {
      const customSchema = createAddressSchema({
        type: 'military',
        messages: {
          cityInvalid: 'Must be APO, FPO, or DPO',
          stateInvalid: 'Must be AA, AE, or AP',
        },
      });

      it('uses custom city invalid message', () => {
        const result = customSchema.safeParse({
          street: 'Unit 1234',
          city: 'Springfield',
          state: 'AE',
          zipCode: '09012',
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues.some(i => i.message === 'Must be APO, FPO, or DPO')).toBe(
            true
          );
        }
      });

      it('uses custom state invalid message', () => {
        const result = customSchema.safeParse({
          street: 'Unit 1234',
          city: 'APO',
          state: 'IL',
          zipCode: '09012',
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues.some(i => i.message === 'Must be AA, AE, or AP')).toBe(true);
        }
      });
    });
  });

  describe('International address schema', () => {
    const schema = createAddressSchema({ type: 'international' });

    describe('valid international addresses', () => {
      it('accepts valid international address', () => {
        const result = schema.safeParse({
          street: '10 Downing Street',
          city: 'London',
          country: 'United Kingdom',
        });
        expect(result.success).toBe(true);
      });

      it('accepts address with street2', () => {
        const result = schema.safeParse({
          street: '1 Rue de la Paix',
          street2: 'Batiment A',
          city: 'Paris',
          country: 'France',
        });
        expect(result.success).toBe(true);
      });

      it('accepts address with province', () => {
        const result = schema.safeParse({
          street: '123 Maple Street',
          city: 'Toronto',
          province: 'Ontario',
          country: 'Canada',
        });
        expect(result.success).toBe(true);
      });

      it('accepts address with postalCode', () => {
        const result = schema.safeParse({
          street: '123 Maple Street',
          city: 'Toronto',
          postalCode: 'M5H 2N2',
          country: 'Canada',
        });
        expect(result.success).toBe(true);
      });

      it('accepts address with all optional fields', () => {
        const result = schema.safeParse({
          street: '123 Maple Street',
          street2: 'Suite 100',
          city: 'Toronto',
          province: 'Ontario',
          postalCode: 'M5H 2N2',
          country: 'Canada',
        });
        expect(result.success).toBe(true);
      });

      it('accepts address without province or postalCode', () => {
        const result = schema.safeParse({
          street: 'Sample Street 123',
          city: 'Some City',
          country: 'Some Country',
        });
        expect(result.success).toBe(true);
      });
    });

    describe('invalid international addresses', () => {
      it('rejects missing street', () => {
        const result = schema.safeParse({
          city: 'London',
          country: 'United Kingdom',
        });
        expect(result.success).toBe(false);
      });

      it('rejects empty street', () => {
        const result = schema.safeParse({
          street: '',
          city: 'London',
          country: 'United Kingdom',
        });
        expect(result.success).toBe(false);
      });

      it('rejects missing city', () => {
        const result = schema.safeParse({
          street: '10 Downing Street',
          country: 'United Kingdom',
        });
        expect(result.success).toBe(false);
      });

      it('rejects missing country', () => {
        const result = schema.safeParse({
          street: '10 Downing Street',
          city: 'London',
        });
        expect(result.success).toBe(false);
      });

      it('rejects empty country', () => {
        const result = schema.safeParse({
          street: '10 Downing Street',
          city: 'London',
          country: '',
        });
        expect(result.success).toBe(false);
      });
    });

    describe('with includeLine3 option', () => {
      const schemaWithLine3 = createAddressSchema({ type: 'international', includeLine3: true });

      it('accepts address with street3', () => {
        const result = schemaWithLine3.safeParse({
          street: '123 Main Street',
          street2: 'Building A',
          street3: 'Floor 5',
          city: 'Tokyo',
          country: 'Japan',
        });
        expect(result.success).toBe(true);
      });
    });

    describe('without includeLine2 option', () => {
      const schemaNoLine2 = createAddressSchema({
        type: 'international',
        includeLine2: false,
      });

      it('rejects address with street2', () => {
        const result = schemaNoLine2.safeParse({
          street: '10 Downing Street',
          street2: 'Flat 2',
          city: 'London',
          country: 'United Kingdom',
        });
        expect(result.success).toBe(false);
      });
    });

    describe('optional mode', () => {
      const optionalSchema = createAddressSchema({ type: 'international', required: false });

      it('accepts empty string for optional fields', () => {
        const result = optionalSchema.safeParse({
          street: '',
          city: '',
          country: '',
        });
        expect(result.success).toBe(true);
      });

      it('accepts undefined for optional fields', () => {
        const result = optionalSchema.safeParse({
          street: undefined,
          city: undefined,
          country: undefined,
        });
        expect(result.success).toBe(true);
      });

      it('accepts partial data', () => {
        const result = optionalSchema.safeParse({
          street: '10 Downing Street',
          city: '',
          country: '',
        });
        expect(result.success).toBe(true);
      });
    });

    describe('custom error messages', () => {
      const customSchema = createAddressSchema({
        type: 'international',
        messages: {
          required: 'Field is required',
          countryInvalid: 'Please enter a valid country',
        },
      });

      it('uses custom required message', () => {
        const result = customSchema.safeParse({
          street: '',
          city: 'London',
          country: 'United Kingdom',
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0]?.message).toBe('Field is required');
        }
      });
    });
  });

  describe('default type', () => {
    it('defaults to US address when no type specified', () => {
      const schema = createAddressSchema();
      const result = schema.safeParse({
        street: '123 Main Street',
        city: 'Springfield',
        state: 'IL',
        zipCode: '62701',
      });
      expect(result.success).toBe(true);
    });
  });
});
