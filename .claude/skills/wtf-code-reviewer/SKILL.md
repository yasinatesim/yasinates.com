---
name: wtf-code-reviewer
description: Dispatch the wtf-code-reviewer agent after completing any implementation. Mandatory quality gate before claiming work is done. Loops until VERIFIED (max 3 iterations).
---

After completing any implementation, dispatch the wtf-code-reviewer agent.

Agent({
  subagent_type: 'wtf-code-reviewer',
  description: 'Review [feature] implementation',
  prompt: `Review this implementation:
  Files modified: [list changed files]
  Requirements: [what was built]
  Key concerns: [SSR preservation? Tailwind removal? tuvix.js patterns? type safety?]
  Produce the full Verification Report.`
})

Loop until VERIFIED (max 3 iterations):
1. Run reviewer
2. NEEDS_FIXES or REJECTED → fix ALL listed issues → run again
3. After 3 iterations still failing → stop, tell the user with the blocking issue list
