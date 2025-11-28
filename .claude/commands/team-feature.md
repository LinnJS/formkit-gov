# Team: Feature Development

Orchestrate a multi-agent workflow to develop a new feature end-to-end.

## Task

$ARGUMENTS

## Workflow

Execute this feature development workflow by spawning specialized agents for each phase. Each phase
should complete before moving to the next.

### Phase 1: Exploration

Spawn an **Explore agent** to:

- Search the codebase for related code and patterns
- Identify files that will need changes
- Find similar implementations to reference
- Understand existing architecture in the affected area

Report findings before proceeding.

### Phase 2: Planning

ultrathink

Spawn a **Plan agent** to create a detailed implementation plan:

- List all files to create or modify
- Define the API/interface design
- Identify dependencies between changes
- Note any potential risks or edge cases
- Outline test strategy
- Consider backwards compatibility
- Evaluate architectural impact

Present the plan for approval before proceeding.

### Phase 3: Implementation

megathink

Implement the feature following the plan:

- Create/modify files as specified
- Follow project conventions from `.claude/CLAUDE.md`
- Use existing patterns found in exploration
- Keep changes minimal and focused

### Phase 4: Testing

think hard

Write comprehensive tests:

- Unit tests for new functions/schemas
- Integration tests for components
- Accessibility tests if UI involved
- Edge cases identified in planning

Run tests to verify:

```bash
pnpm test
```

### Phase 5: Review

megathink

Perform self-review using `/review` checklist:

- Code quality
- TypeScript types
- Documentation (JSDoc)
- Accessibility
- No console.log statements

### Phase 6: Documentation

think

Update documentation as needed:

- JSDoc comments on public APIs
- README updates if API changed
- Storybook stories if component

### Phase 7: Changeset

If this is a user-facing change, create a changeset:

```bash
pnpm changeset
```

## Output

After completing all phases, provide:

1. **Summary** - What was built
2. **Files Changed** - List of created/modified files
3. **Testing** - Test results and coverage
4. **Next Steps** - Any follow-up tasks needed

## Example Usage

```text
/team-feature Add EIN (Employer Identification Number) schema to @formkit-gov/core
```

```text
/team-feature Create DateRangeField component that combines two DateField inputs
```

```text
/team-feature Add Zustand adapter to @formkit-gov/store
```
