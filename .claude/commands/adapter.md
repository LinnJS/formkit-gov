# Create State Adapter

Create a new state management adapter for the @formkit-gov/store package.

## Instructions

You are creating a new state adapter following the adapter pattern used in the project.

### Adapter Interface

All adapters must implement the `FormStoreAdapter` interface:

```typescript
export interface FormStoreAdapter<TData = unknown> {
  /**
   * Get the current form data
   */
  get(): TData | null;

  /**
   * Set form data
   */
  set(data: TData): void;

  /**
   * Update partial form data
   */
  update(data: Partial<TData>): void;

  /**
   * Clear all form data
   */
  clear(): void;

  /**
   * Subscribe to changes
   */
  subscribe(listener: (data: TData | null) => void): () => void;

  /**
   * Check if data exists
   */
  has(): boolean;
}
```

### Steps

1. **Create the Adapter File** Location: `packages/store/src/adapters/[adapter-name].ts`

   ````typescript
   import type { FormStoreAdapter } from '../types';

   export interface [AdapterName]Options {
     // Adapter-specific options
   }

   /**
    * Creates a [description] adapter for form state management
    *
    * @param options - Adapter configuration
    * @returns FormStoreAdapter instance
    *
    * @example
    * ```ts
    * const adapter = create[AdapterName]Adapter({
    *   // options
    * });
    *
    * adapter.set({ name: 'John' });
    * console.log(adapter.get()); // { name: 'John' }
    * ```
    */
   export function create[AdapterName]Adapter<TData>(
     options: [AdapterName]Options = {}
   ): FormStoreAdapter<TData> {
     // Implementation
     return {
       get() {},
       set(data) {},
       update(data) {},
       clear() {},
       subscribe(listener) {},
       has() {},
     };
   }
   ````

2. **Create Tests** Location: `packages/store/src/adapters/[adapter-name].test.ts`

   Test all interface methods:
   - get/set operations
   - update partial data
   - clear data
   - subscribe/unsubscribe
   - has check
   - Edge cases (null, undefined, empty)

3. **Export from Index** Add exports to:
   - `packages/store/src/adapters/index.ts`
   - `packages/store/src/index.ts`

### Existing Adapters

Reference implementations:

- `sessionStorageAdapter` - Browser sessionStorage
- `localStorageAdapter` - Browser localStorage
- `memoryAdapter` - In-memory (testing)
- `zustandAdapter` - Zustand store
- `reduxAdapter` - Redux Toolkit
- `tanstackQueryAdapter` - TanStack Query

### Adapter Requirements

- Implement all interface methods
- Handle initialization properly
- Clean up subscriptions
- Handle serialization/deserialization
- Support TypeScript generics
- Include comprehensive tests

### Common Patterns

#### Subscription Management

```typescript
const listeners = new Set<(data: TData | null) => void>();

function subscribe(listener: (data: TData | null) => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify(data: TData | null) {
  listeners.forEach(listener => listener(data));
}
```

#### Storage Serialization

```typescript
function serialize<T>(data: T): string {
  return JSON.stringify(data);
}

function deserialize<T>(str: string | null): T | null {
  if (!str) return null;
  try {
    return JSON.parse(str) as T;
  } catch {
    return null;
  }
}
```

### Testing Pattern

```typescript
describe('[AdapterName]Adapter', () => {
  let adapter: FormStoreAdapter<TestData>;

  beforeEach(() => {
    adapter = createAdapter();
  });

  afterEach(() => {
    adapter.clear();
  });

  describe('get/set', () => {
    it('stores and retrieves data', () => {
      adapter.set({ name: 'John' });
      expect(adapter.get()).toEqual({ name: 'John' });
    });
  });

  describe('update', () => {
    it('updates partial data', () => {
      adapter.set({ name: 'John', age: 30 });
      adapter.update({ age: 31 });
      expect(adapter.get()).toEqual({ name: 'John', age: 31 });
    });
  });

  describe('subscribe', () => {
    it('notifies listeners on change', () => {
      const listener = vi.fn();
      adapter.subscribe(listener);
      adapter.set({ name: 'John' });
      expect(listener).toHaveBeenCalledWith({ name: 'John' });
    });
  });
});
```

## Arguments

$ARGUMENTS - Adapter name and backing store (e.g., "IndexedDB adapter for offline form storage")
