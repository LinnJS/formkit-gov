import { z } from 'zod';

export interface TextSchemaOptions {
  /** Minimum length */
  min?: number;
  /** Maximum length */
  max?: number;
  /** Whether the field is required */
  required?: boolean;
  /** Custom error messages */
  messages?: {
    required?: string;
    min?: string;
    max?: string;
  };
}

/**
 * Creates a text input schema with configurable validation
 *
 * @example
 * ```ts
 * const schema = createTextSchema({ min: 1, max: 100 });
 * ```
 */
export function createTextSchema(options: TextSchemaOptions = {}) {
  const { min, max, required = true, messages = {} } = options;

  let schema = z.string();

  if (required) {
    schema = schema.min(1, messages.required ?? 'This field is required');
  }

  if (min !== undefined && min > 0) {
    schema = schema.min(min, messages.min ?? `Must be at least ${min} characters`);
  }

  if (max !== undefined) {
    schema = schema.max(max, messages.max ?? `Must be no more than ${max} characters`);
  }

  if (!required) {
    return schema.optional();
  }

  return schema;
}
