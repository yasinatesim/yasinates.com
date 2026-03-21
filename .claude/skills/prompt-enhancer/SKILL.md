---
name: prompt-enhancer
description: Generate a BRAID reasoning graph (Mermaid flowchart TD, arxiv.org/abs/2512.15959v1) for any complex task. Use before planning non-trivial features, debugging sessions, or architecture decisions. Hand the graph to braid-solver.
---

Generate a BRAID task graph in Mermaid flowchart TD format.

**When to use:** complex features, micro frontend migration tasks, multi-file refactors, debugging, architecture decisions.
**When NOT to use:** single-file fixes, straightforward questions, simple content updates.

## Graph Construction Rules

1. **Constraint nodes first** — extract all rules/limits (SSR, SEO, no Tailwind, tuvix.js patterns)
2. **Fact nodes second** — enumerate all knowns (existing component, hooks used, routes affected)
3. **Step nodes** — one atomic action each, < 15 token labels
4. **Check nodes** — one explicit validation per critical assumption
   - Two outgoing edges: Pass → next Step, Fail → revision Step
   - No numeric max_retry — the loop structure IS the retry mechanism
5. **End node** — terminal output

## Output

Generate ONLY the Mermaid code block, then hand to braid-solver:

```
flowchart TD;
  C1[Constraint: Read .claude/references/]
  C2[Constraint: Preserve SSR and SEO]
  C3[Constraint: No new Tailwind classes]
  F1[Fact: List files to create or modify]
  F2[Fact: Identify tuvix.js packages needed]
  S1[Step: Design CSS Module structure]
  S2[Step: Implement component migration]
  S3[Step: Write Vitest tests]
  D1[Check: TypeScript compiles?]
  S4[Step: Fix type errors]
  D2[Check: SSR renders without errors?]
  S5[Step: Fix SSR issues]
  D3[Check: Visual matches original?]
  End([End: Run wtf-code-reviewer])

  C1 --> F1
  C2 --> F1
  C3 --> F1
  F1 --> F2 --> S1 --> S2 --> S3 --> D1
  D1 -- "Pass" --> D2
  D1 -- "Fail" --> S4 --> D1
  D2 -- "Pass" --> D3
  D2 -- "Fail" --> S5 --> D2
  D3 -- "Pass" --> End
  D3 -- "Fail" --> S2
```

Then hand the graph to the braid-solver agent.
