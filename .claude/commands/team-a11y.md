# Team: Accessibility Audit

Orchestrate a multi-agent workflow to perform a comprehensive accessibility audit.

## Task

$ARGUMENTS

## Workflow

Execute this accessibility audit workflow with specialized agents for each phase.

### Phase 1: Identify Scope

think

Determine what to audit:

- Specific component(s)
- Entire package
- User flow/journey

Spawn an **Explore agent** to:

- Find all relevant component files
- Identify test files
- Locate Storybook stories
- Find related documentation

### Phase 2: Automated Testing

think hard

Run automated accessibility tests:

```bash
# Run tests with axe-core
pnpm --filter @formkit-gov/react test

# If specific component
pnpm --filter @formkit-gov/react test [component-name]
```

For each component, ensure axe test exists:

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('has no accessibility violations', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

Collect and categorize all violations.

### Phase 3: Code Review

ultrathink

Spawn a **Plan agent** to review source code deeply for accessibility patterns:

**Form Controls:**

- [ ] All inputs have associated labels
- [ ] Labels use `htmlFor` matching input `id`
- [ ] Required fields marked with `aria-required`
- [ ] Error messages associated with `aria-describedby`
- [ ] Invalid state indicated with `aria-invalid`

**Interactive Elements:**

- [ ] All interactive elements are focusable
- [ ] Focus order is logical
- [ ] Focus is visible
- [ ] No keyboard traps

**ARIA:**

- [ ] ARIA roles used correctly
- [ ] ARIA states updated dynamically
- [ ] No redundant ARIA (e.g., `role="button"` on `<button>`)
- [ ] `aria-live` for dynamic content

**Semantic HTML:**

- [ ] Proper heading hierarchy
- [ ] Lists use `<ul>`/`<ol>`/`<li>`
- [ ] Tables have headers
- [ ] Landmarks used appropriately

### Phase 4: Manual Testing

megathink

Create manual testing checklist:

**Keyboard Navigation:**

```markdown
- [ ] Can tab to all interactive elements
- [ ] Tab order matches visual order
- [ ] Can activate buttons with Enter/Space
- [ ] Can escape from dialogs/dropdowns
- [ ] Focus doesn't get lost
- [ ] Skip links work (if applicable)
```

**Screen Reader Testing:**

```markdown
- [ ] All content is announced
- [ ] Form labels are read
- [ ] Error messages are announced
- [ ] State changes are announced
- [ ] Instructions are clear
```

**Visual Testing:**

```markdown
- [ ] Color contrast meets 4.5:1 for text
- [ ] Focus indicators are visible
- [ ] Content readable at 200% zoom
- [ ] No reliance on color alone
```

### Phase 5: Document Issues

think hard

For each issue found:

```markdown
### Issue: [Brief description]

**Severity**: Critical / Serious / Moderate / Minor **WCAG Criterion**: X.X.X [Name] **Component**:
[ComponentName] **File**: path/to/file.tsx:line

**Current Behavior**: [What's happening now]

**Expected Behavior**: [What should happen]

**Code Example**: \`\`\`typescript // Current (problematic) <input type="text" />

// Fixed <label> Name <input type="text" /> </label> \`\`\`

**Impact**: [Who is affected and how]
```

### Phase 6: Implement Fixes

megathink

For each issue, implement the fix:

- Make minimal changes
- Test fix with axe
- Verify keyboard navigation
- Add regression test if missing

### Phase 7: Verify Fixes

think

Re-run all accessibility checks:

```bash
# Automated tests
pnpm --filter @formkit-gov/react test

# Build to catch any issues
pnpm --filter @formkit-gov/react build
```

### Phase 8: Update Documentation

- Add accessibility notes to component docs
- Update Storybook stories to show accessible patterns
- Document any known limitations

## Output

Provide comprehensive audit report:

```markdown
## Accessibility Audit Report

**Scope**: [What was audited] **Date**: YYYY-MM-DD **Standard**: WCAG 2.1 AA

### Summary

| Severity | Count | Fixed |
| -------- | ----- | ----- |
| Critical | X     | X     |
| Serious  | X     | X     |
| Moderate | X     | X     |
| Minor    | X     | X     |

### Issues Found

#### Critical

[List of critical issues with fixes]

#### Serious

[List of serious issues with fixes]

### Tests Added

- [List of new accessibility tests]

### WCAG Checklist

#### Perceivable

- [x] 1.1.1 Non-text Content
- [x] 1.3.1 Info and Relationships
- [ ] 1.4.3 Contrast (Minimum) - [note]

#### Operable

- [x] 2.1.1 Keyboard
- [x] 2.4.3 Focus Order

#### Understandable

- [x] 3.3.1 Error Identification
- [x] 3.3.2 Labels or Instructions

#### Robust

- [x] 4.1.2 Name, Role, Value

### Recommendations

[Any additional recommendations for improving accessibility]
```

## Example Usage

```text
/team-a11y Audit all form components in @formkit-gov/react
```

```text
/team-a11y Audit TextInputField component for screen reader compatibility
```

```text
/team-a11y Audit the multi-step wizard flow for keyboard navigation
```
