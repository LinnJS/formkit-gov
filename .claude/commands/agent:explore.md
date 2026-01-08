# Codebase Exploration Agent

Explore and understand code patterns in the FormKit Gov monorepo.

## Before Starting

think hard

**STOP - Ask clarifying questions before exploring:**

1. **What are you looking for?**
   - Specific file or function
   - Pattern or implementation approach
   - How something works
   - Architecture understanding

2. **Which package(s) are relevant?**
   - `@formkit-gov/core` - Zod schemas, patterns
   - `@formkit-gov/react` - React components
   - `@formkit-gov/wizard` - Multi-step forms
   - `@formkit-gov/store` - State adapters
   - `@formkit-gov/validators` - Extended validation
   - `@formkit-gov/openapi` - OpenAPI generation

3. **What's the context?**
   - Building something new
   - Debugging an issue
   - Understanding existing code
   - Finding similar implementations

4. **How deep should the exploration go?**
   - Surface level (file names, structure)
   - Medium (function signatures, exports)
   - Deep (implementation details, patterns)

## Exploration Process

### 1. Understand the Request

think

Clarify:

- What specifically needs to be found?
- What will this information be used for?
- Are there known starting points?

### 2. Search Strategy

megathink

Use appropriate search techniques:

```bash
# Find files by pattern
pnpm --filter @formkit-gov/[package] exec find src -name "*.ts"

# Search for code patterns
grep -r "pattern" packages/[package]/src/

# Find exports
grep -r "export" packages/[package]/src/index.ts
```

### 3. Analyze Findings

think hard

For each relevant file found:

- Read the file content
- Understand the purpose
- Note patterns and conventions
- Identify dependencies
- Check test files for usage examples

### 4. Map Relationships

think

Create a mental map:

```text
[Entry Point]
├── [Dependency 1]
│   └── [Sub-dependency]
├── [Dependency 2]
└── [Related Pattern]
```

## Package Structure Reference

```text
packages/
├── core/src/
│   ├── schemas/     # Zod schema factories
│   ├── patterns/    # Regex patterns
│   └── validators/  # Validation utilities
├── react/src/
│   ├── components/  # VA DS wrappers
│   │   ├── fields/  # Form field components
│   │   └── form/    # Form components
│   └── hooks/       # React hooks
├── wizard/src/
│   └── components/  # Multi-step form
├── store/src/
│   └── adapters/    # State management
└── validators/src/
    └── rules/       # Extended validators
```

## Output Format

````markdown
## Exploration Results

**Query:** [What was searched for] **Packages:** [Packages explored]

### Findings

**Primary Pattern Found:**

- Location: `packages/[pkg]/src/[path]`
- Purpose: [What it does]
- Pattern: [How it works]

**Related Files:** | File | Purpose | | ---- | ------- | | path/to/file.ts | [description] |

**Key Code Patterns:**

```typescript
// Example of pattern found
```
````

### Recommendations

- [How to use this information]
- [Similar patterns to reference]
- [Potential approaches]

````markdown
## Example Usage

```bash
/agent:explore "How are Zod schemas structured in core?"
```
````

```bash
/agent:explore "Find all VA DS component wrappers in react package"
```

```bash
/agent:explore "How does the wizard handle step navigation?"
```

## Task

$ARGUMENTS
