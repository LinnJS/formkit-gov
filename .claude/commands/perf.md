# Performance Analysis

Analyze and optimize performance in the FormKit Gov packages.

## Instructions

You are analyzing and improving performance.

### Bundle Size Analysis

```bash
# Check bundle sizes
pnpm size

# Detailed analysis
pnpm --filter @formkit-gov/core size --why
```

### Bundle Size Limits

Configured in `package.json` per package:

```json
{
  "size-limit": [
    {
      "path": "dist/index.js",
      "limit": "10 KB"
    }
  ]
}
```

### Tree Shaking

Ensure exports are tree-shakeable:

```typescript
// Good - named exports
export { createSSNSchema } from './schemas/ssn';
export { createPhoneSchema } from './schemas/phone';

// Bad - barrel re-export of everything
export * from './schemas';
```

### React Performance

#### Memoization

```typescript
// Memoize expensive computations
const expensiveResult = useMemo(() => {
  return heavyComputation(data);
}, [data]);

// Memoize callbacks
const handleChange = useCallback(
  (value: string) => {
    onChange(value);
  },
  [onChange]
);

// Memoize components
const MemoizedComponent = React.memo(Component);
```

#### Avoid Unnecessary Renders

```typescript
// Bad - new object every render
<Component style={{ color: 'red' }} />

// Good - stable reference
const style = useMemo(() => ({ color: 'red' }), []);
<Component style={style} />
```

#### Web Component Integration

```typescript
// Efficient event handling for VA DS web components
useEffect(() => {
  const element = ref.current;
  if (!element) return;

  const handler = (e: CustomEvent) => {
    onChange(e.detail.value);
  };

  element.addEventListener('vaChange', handler);
  return () => element.removeEventListener('vaChange', handler);
}, [onChange]);
```

### Schema Performance

```typescript
// Cache schema instances
const schema = useMemo(() => {
  return createSSNSchema(options);
}, [options.required, options.flexible]);

// Avoid recreating on every render
// Bad
const result = createSSNSchema().safeParse(value);

// Good
const schema = createSSNSchema();
const result = schema.safeParse(value);
```

### Profiling

#### React DevTools

1. Install React DevTools extension
2. Open Profiler tab
3. Record interactions
4. Analyze flame graph

#### Chrome DevTools

```typescript
// Mark performance
performance.mark('validation-start');
const result = schema.parse(data);
performance.mark('validation-end');
performance.measure('validation', 'validation-start', 'validation-end');
```

### Benchmarking

```typescript
import { bench, describe } from 'vitest';

describe('SSN validation', () => {
  bench('createSSNSchema', () => {
    createSSNSchema();
  });

  bench('schema.parse', () => {
    ssnSchema.parse('123-45-6789');
  });
});
```

Run benchmarks:

```bash
pnpm --filter @formkit-gov/core test:bench
```

### Common Issues

#### Large Bundle

- Check for unused imports
- Verify tree shaking works
- Split large modules
- Lazy load where appropriate

#### Slow Validation

- Cache schema instances
- Use early returns in refinements
- Avoid regex in hot paths

#### React Re-renders

- Profile with React DevTools
- Check useEffect dependencies
- Verify memoization is working
- Use React.memo strategically

### Performance Checklist

- [ ] Bundle size within limits
- [ ] No unused dependencies
- [ ] Tree shaking works
- [ ] Schemas are cached
- [ ] React components don't over-render
- [ ] Web component events handled efficiently
- [ ] No memory leaks
- [ ] Lazy loading where appropriate

## Arguments

$ARGUMENTS - Performance task (e.g., "reduce core bundle size" or "optimize form rendering")
