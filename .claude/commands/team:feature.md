# Team: Feature Development

Orchestrate a multi-agent workflow to implement a complete feature end-to-end.

## Team Composition

| Phase | Agent                              | Responsibility            |
| ----- | ---------------------------------- | ------------------------- |
| 1     | `agent:explore`                    | Find existing patterns    |
| 2     | Plan                               | Design implementation     |
| 3     | `agent:schema` / `agent:component` | Build the feature         |
| 4     | `agent:test`                       | Write comprehensive tests |
| 5     | `agent:a11y`                       | Verify accessibility      |
| 6     | `agent:docs`                       | Add documentation         |
| 7     | `agent:review`                     | Code quality check        |

## Before Starting

ultrathink

**STOP - This team will ask clarifying questions before proceeding:**

1. **What is the feature?**
   - New Zod schema
   - New React component
   - New wizard functionality
   - State adapter
   - Validation utility

2. **Which package(s) are involved?**
   - `@formkit-gov/core` - Schemas, patterns
   - `@formkit-gov/react` - Components
   - `@formkit-gov/wizard` - Multi-step forms
   - `@formkit-gov/store` - State management
   - `@formkit-gov/validators` - Extended validation

3. **What are the requirements?**
   - Functional requirements
   - Validation rules
   - Accessibility needs
   - Integration points

4. **Are there similar features to reference?**
   - Existing patterns in codebase
   - Components to reuse
   - Schemas to extend

5. **What is the expected API/interface?**
   - Function signature
   - Component props
   - Configuration options

## Workflow

Execute this workflow with specialized agents for each phase.

### Phase 1: Context Gathering (agent:explore)

think hard

Spawn an **Explore agent** to:

- Search codebase for similar implementations
- Identify existing patterns to follow
- Find components/schemas to reuse
- Understand integration points

```bash
/agent:explore "Find patterns for [feature type] in the codebase"
```

Report findings before proceeding.

### Phase 2: Design (Plan)

megathink

Based on exploration, design:

- File structure and locations
- API interface (props, options)
- Integration with existing code
- Test strategy

**Checkpoint**: Present design plan for approval before proceeding.

### Phase 3: Implementation

think hard

Implement based on feature type:

#### For Schemas

```bash
/agent:schema "Create [schema name] with [rules]"
```

#### For Components

```bash
/agent:component "Create [component name] wrapping [VA DS component]"
```

### Phase 4: Testing (agent:test)

think hard

Spawn **Test agent** to create:

- Unit tests for all functionality
- Edge case coverage
- Integration tests if needed

```bash
/agent:test "Create tests for [feature]"
```

Run tests to verify:

```bash
pnpm --filter @formkit-gov/[package] test
```

### Phase 5: Accessibility (agent:a11y)

think

Spawn **A11y agent** to verify (for components):

- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader compatibility
- Error message accessibility

```bash
/agent:a11y "Audit [feature] for accessibility"
```

### Phase 6: Documentation (agent:docs)

think

Spawn **Docs agent** to add:

- JSDoc with @example
- Storybook stories (for components)
- README updates if needed

```bash
/agent:docs "Document [feature] with JSDoc and examples"
```

### Phase 7: Review (agent:review)

think

Spawn **Review agent** to:

- Check code conventions
- Verify TypeScript types
- Ensure documentation
- Auto-fix minor issues

```bash
/agent:review "Review [feature implementation]"
```

### Phase 8: Final Verification

```bash
pnpm --filter @formkit-gov/[package] lint
pnpm --filter @formkit-gov/[package] typecheck
pnpm --filter @formkit-gov/[package] test
pnpm --filter @formkit-gov/[package] build
```

## Parallel Execution

```text
Phase 1: agent:explore (sequential - need context first)
Phase 2: Plan (sequential - need exploration)
Phase 3: Implement (sequential - needs plan)
Phase 4-6: agent:test + agent:a11y + agent:docs (PARALLEL - independent)
Phase 7-8: agent:review + Verify (sequential)
```

## Output

After completing all phases, provide:

````markdown
## Feature Implementation Summary

**Feature:** [Description] **Package:** @formkit-gov/[package]

### Files Created/Modified

**Source:**

- `src/[path]/[name].ts` - [description]

**Tests:**

- `src/[path]/[name].test.ts` - [X tests]

**Documentation:**

- JSDoc added to all public APIs
- Storybook stories (if component)

### API

```typescript
// Usage example
```
````

### Verification Results

- [x] All tests pass
- [x] TypeScript compiles
- [x] Build succeeds
- [x] Lint passes
- [x] Accessibility verified
- [x] Documentation complete

### Manual Testing Checklist

1. [Step 1]
2. [Step 2]
3. [Verify expected behavior]

### Next Steps

[Any follow-up actions needed]

````markdown
## Example Usage

```bash
/team:feature "Add EIN (Employer Identification Number) schema to core package"
```
````

```bash
/team:feature "Create SelectField component wrapping va-select"
```

```bash
/team:feature "Add phone number validation with US format support"
```

## Task

$ARGUMENTS
