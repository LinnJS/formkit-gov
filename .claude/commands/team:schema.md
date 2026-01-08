# Team: Schema Development

Orchestrate a multi-agent workflow to create a complete Zod schema with validation, tests, and
documentation.

## Team Composition

| Phase | Agent           | Responsibility          |
| ----- | --------------- | ----------------------- |
| 1     | `agent:explore` | Research requirements   |
| 2     | Plan            | Define validation rules |
| 3     | `agent:schema`  | Implement schema        |
| 4     | `agent:test`    | Comprehensive tests     |
| 5     | `agent:docs`    | Documentation           |
| 6     | `agent:review`  | Quality check           |

## Before Starting

ultrathink

**STOP - This team will ask clarifying questions before proceeding:**

1. **What data type does this schema validate?**
   - Personal identifier (SSN, EIN, ITIN)
   - Date/time format
   - Contact info (phone, email)
   - Address data
   - Government-specific format
   - Custom business format

2. **What are the format requirements?**
   - Pattern/regex needed
   - Length constraints
   - Character restrictions
   - Separator requirements

3. **What are valid examples?**
   - Standard format
   - Alternative formats (flexible mode)

4. **What are invalid examples?**
   - Common mistakes to reject
   - Edge cases to handle

5. **Are there official specifications?**
   - Government documentation
   - Standard format definitions
   - Validation business rules

## Workflow

### Phase 1: Research Requirements (agent:explore)

think hard

Spawn an **Explore agent** to research:

- Official format specifications
- Existing validation patterns in codebase
- Similar schema implementations
- Edge cases and special rules

```bash
/agent:explore "Research [data type] format requirements and validation rules"
```

Sources to check:

- Government form specifications (VA, IRS, SSA)
- Existing patterns in `packages/core/src/patterns/`
- Similar schemas in `packages/core/src/schemas/`

### Phase 2: Define Validation Rules

megathink

Document all validation rules comprehensively:

```markdown
## [SchemaName] Validation Rules

**Format:** [Expected format, e.g., XXX-XX-XXXX]

**Rules:**

1. [Rule 1 - e.g., Must be 9 digits]
2. [Rule 2 - e.g., Cannot start with 9]
3. [Rule 3 - e.g., Cannot be all zeros]

**Valid Examples:**

- 123-45-6789 (standard)
- 123 45 6789 (flexible)

**Invalid Examples:**

- 000-12-3456 (invalid area)
- 123-00-6789 (invalid group)

**Edge Cases:**

- [Edge case 1]
- [Edge case 2]
```

**Checkpoint**: Present validation rules for approval.

### Phase 3: Implement Schema (agent:schema)

think hard

Spawn a **Schema agent** to implement:

```bash
/agent:schema "Create [schema name] with [validation rules]"
```

Implementation includes:

- Schema factory function
- Options interface
- Default error messages
- Pattern (if regex-based)

### Phase 4: Comprehensive Testing (agent:test)

think hard

Spawn a **Test agent** to create tests covering:

- All valid format variations
- All invalid format cases
- All options (required, flexible, messages)
- Edge cases and boundaries

```bash
/agent:test "Create comprehensive tests for [schema]"
```

Run tests:

```bash
pnpm --filter @formkit-gov/core test -- [name].test.ts
```

### Phase 5: Documentation (agent:docs)

think

Spawn a **Docs agent** in parallel with testing:

```bash
/agent:docs "Add complete JSDoc to [schema] with examples"
```

Ensure:

- JSDoc with @example
- Options documented
- Error messages documented
- Usage examples

### Phase 6: Export and Verify

Add exports:

```typescript
// packages/core/src/schemas/index.ts
export * from './[schema-name]';
```

### Phase 7: Review (agent:review)

think

Spawn a **Review agent** for final check:

```bash
/agent:review "Review [schema] implementation"
```

### Phase 8: Final Verification

```bash
pnpm --filter @formkit-gov/core lint
pnpm --filter @formkit-gov/core typecheck
pnpm --filter @formkit-gov/core test
pnpm --filter @formkit-gov/core build
```

## Parallel Execution

```text
Phase 1: agent:explore (sequential)
Phase 2: Plan (sequential)
Phase 3: agent:schema (sequential)
Phase 4-5: agent:test + agent:docs (PARALLEL)
Phase 6: Export (sequential)
Phase 7-8: agent:review + Verify (sequential)
```

## Output

````markdown
## Schema Implementation Summary

**Schema:** create[SchemaName]Schema **Package:** @formkit-gov/core

### Validation Rules Implemented

| Rule   | Description           |
| ------ | --------------------- |
| Format | [Pattern description] |
| Length | [Length constraints]  |
| [Rule] | [Description]         |

### Files Created

- `src/schemas/[name].ts` - Schema factory
- `src/schemas/[name].test.ts` - Test suite (X tests)
- `src/patterns/index.ts` - Pattern added (if applicable)

### Test Coverage

| Category       | Tests | Status  |
| -------------- | ----- | ------- |
| Valid inputs   | X     | Passing |
| Invalid inputs | X     | Passing |
| Options        | X     | Passing |
| Edge cases     | X     | Passing |

### Usage

```typescript
import { create[SchemaName]Schema } from '@formkit-gov/core';

// Basic usage
const schema = create[SchemaName]Schema();
schema.parse('[valid-value]');

// With options
const optionalSchema = create[SchemaName]Schema({
  required: false,
  flexible: true,
});
```
````

### Verification Results

- [x] All tests pass
- [x] TypeScript compiles
- [x] Build succeeds
- [x] JSDoc complete

````markdown
## Example Usage

```bash
/team:schema "Create EIN (Employer Identification Number) schema with format XX-XXXXXXX"
```
````

```bash
/team:schema "Create VA file number schema (C-number format)"
```

```bash
/team:schema "Create military service number schema for VA forms"
```

## Task

$ARGUMENTS
