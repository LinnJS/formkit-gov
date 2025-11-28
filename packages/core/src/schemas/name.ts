import { z } from 'zod';

import { NAME_PATTERN } from '../patterns';

export interface NameSchemaOptions {
  /** Minimum length */
  min?: number;
  /** Maximum length */
  max?: number;
  /** Whether the field is required */
  required?: boolean;
  /** Custom error messages */
  messages?: {
    required?: string;
    invalid?: string;
    min?: string;
    max?: string;
  };
}

/**
 * Creates a name schema (first name, last name, etc.)
 *
 * @example
 * ```ts
 * const schema = createNameSchema({ max: 50 });
 * schema.parse('John'); // valid
 * schema.parse("O'Brien"); // valid
 * ```
 */
export function createNameSchema(options: NameSchemaOptions = {}) {
  const { min = 1, max = 100, required = true, messages = {} } = options;

  let schema = z
    .string()
    .regex(
      NAME_PATTERN,
      messages.invalid ?? 'Name can only contain letters, spaces, hyphens, and apostrophes'
    );

  if (required) {
    schema = z
      .string()
      .min(min, messages.required ?? 'Name is required')
      .max(max, messages.max ?? `Name must be no more than ${max} characters`)
      .regex(
        NAME_PATTERN,
        messages.invalid ?? 'Name can only contain letters, spaces, hyphens, and apostrophes'
      );
  } else {
    schema = schema.max(max, messages.max ?? `Name must be no more than ${max} characters`);
  }

  if (!required) {
    return schema.optional().or(z.literal(''));
  }

  return schema;
}

/**
 * Suffix options for name schemas
 */
export const NAME_SUFFIXES = ['Jr.', 'Sr.', 'II', 'III', 'IV', 'V'] as const;

/**
 * Creates a full name schema with first, middle, last, and suffix
 *
 * @example
 * ```ts
 * const schema = createFullNameSchema();
 * schema.parse({
 *   first: 'John',
 *   middle: 'William',
 *   last: 'Doe',
 *   suffix: 'Jr.'
 * });
 * ```
 */
export function createFullNameSchema(options: { required?: boolean } = {}) {
  const { required = true } = options;

  return z.object({
    first: createNameSchema({ required, max: 50 }),
    middle: createNameSchema({ required: false, max: 50 }),
    last: createNameSchema({ required, max: 50 }),
    suffix: z.enum(NAME_SUFFIXES).optional().or(z.literal('')),
  });
}
