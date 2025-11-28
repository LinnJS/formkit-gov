import { z } from 'zod';

export interface DateSchemaOptions {
  /** Whether the field is required */
  required?: boolean;
  /** Minimum date (inclusive) */
  minDate?: Date;
  /** Maximum date (inclusive) */
  maxDate?: Date;
  /** Whether the date must be in the past */
  pastOnly?: boolean;
  /** Whether the date must be in the future */
  futureOnly?: boolean;
  /** Custom error messages */
  messages?: {
    required?: string;
    invalid?: string;
    min?: string;
    max?: string;
    past?: string;
    future?: string;
  };
}

/**
 * Creates a date schema with validation
 *
 * @example
 * ```ts
 * const schema = createDateSchema({ pastOnly: true });
 * schema.parse('1990-01-15'); // valid (ISO format)
 * ```
 */
export function createDateSchema(options: DateSchemaOptions = {}) {
  const {
    required = true,
    minDate,
    maxDate,
    pastOnly = false,
    futureOnly = false,
    messages = {},
  } = options;

  const buildRefinements = (base: z.ZodString) => {
    let schema = base.refine(
      (value: string) => {
        if (!value) return !required;
        const date = new Date(value);
        return !isNaN(date.getTime());
      },
      { message: messages.invalid ?? 'Enter a valid date' }
    );

    if (minDate) {
      schema = schema.refine(
        (value: string) => {
          if (!value) return true;
          const date = new Date(value);
          return date >= minDate;
        },
        { message: messages.min ?? `Date must be on or after ${minDate.toLocaleDateString()}` }
      );
    }

    if (maxDate) {
      schema = schema.refine(
        (value: string) => {
          if (!value) return true;
          const date = new Date(value);
          return date <= maxDate;
        },
        { message: messages.max ?? `Date must be on or before ${maxDate.toLocaleDateString()}` }
      );
    }

    if (pastOnly) {
      schema = schema.refine(
        (value: string) => {
          if (!value) return true;
          const date = new Date(value);
          return date < new Date();
        },
        { message: messages.past ?? 'Date must be in the past' }
      );
    }

    if (futureOnly) {
      schema = schema.refine(
        (value: string) => {
          if (!value) return true;
          const date = new Date(value);
          return date > new Date();
        },
        { message: messages.future ?? 'Date must be in the future' }
      );
    }

    return schema;
  };

  if (required) {
    const baseSchema = z.string().min(1, messages.required ?? 'Date is required');
    const schema = buildRefinements(baseSchema);
    return schema;
  }

  const baseSchema = z.string();
  const schema = buildRefinements(baseSchema);
  return schema.optional().or(z.literal(''));
}

/**
 * Memorable date schema (separate month, day, year fields)
 *
 * @example
 * ```ts
 * const schema = createMemorableDateSchema();
 * schema.parse({ month: '01', day: '15', year: '1990' });
 * ```
 */
export function createMemorableDateSchema(options: DateSchemaOptions = {}) {
  const { required = true, messages = {} } = options;

  const baseSchema = z.object({
    month: z.string().regex(/^(0?[1-9]|1[0-2])$/, messages.invalid ?? 'Enter a valid month (1-12)'),
    day: z
      .string()
      .regex(/^(0?[1-9]|[12]\d|3[01])$/, messages.invalid ?? 'Enter a valid day (1-31)'),
    year: z.string().regex(/^(19|20)\d{2}$/, messages.invalid ?? 'Enter a valid 4-digit year'),
  });

  const validatedSchema = baseSchema.refine(
    data => {
      const { month, day, year } = data;
      if (!month || !day || !year) return !required;

      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      return (
        date.getMonth() === parseInt(month) - 1 &&
        date.getDate() === parseInt(day) &&
        date.getFullYear() === parseInt(year)
      );
    },
    { message: messages.invalid ?? 'Enter a valid date' }
  );

  if (!required) {
    return validatedSchema.optional();
  }

  return validatedSchema;
}
