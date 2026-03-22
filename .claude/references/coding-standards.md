# Coding Standards — yasinates.com

## Type Safety
- `strict: true` is enabled in tsconfig — no implicit `any`
- `any` type is **forbidden** — use `unknown` with type guards instead
- Catch clauses must use `catch (e: unknown)` with `instanceof` guard
- No unsafe casts (`as X` without validation)
- All return types must be explicit for public functions and hooks

## Error Handling
```typescript
// ✅ Correct
try {
  await doSomething()
} catch (e: unknown) {
  if (e instanceof Error) {
    console.error(e.message)
  }
}

// ❌ Wrong
try {
  await doSomething()
} catch (e: any) {
  console.error(e.message)
}
```

## Module System
- ESM only (`"type": "module"` in package.json)
- Use `import/export` — never `require()`
- Path aliases: use `~/` for `src/` imports (configured in tsconfig)

## React / Component Standards
- Functional components only — no class components
- Component files: `PascalCase.tsx`
- Utility/hook files: `camelCase.ts`
- Hooks must be in `src/hooks/` with `use` prefix

## Styling — MIGRATION IN PROGRESS
- **Currently:** Tailwind CSS utility classes
- **Target:** tuvix.js styling standards (CSS Modules or tuvix.js design tokens)
- **Rule during migration:** Do NOT add new Tailwind classes. Use tuvix.js patterns for new code.
- Do NOT break existing visual appearance while migrating

## Async Patterns
- All `async` functions must `await` their promises
- No floating promises — always attach `.catch()` or use `await`
- No `new Promise(async (resolve) => {...})` antipattern
- Use TanStack Query hooks for data fetching — do not fetch directly in components

## Naming Conventions
- Components: `PascalCase`
- Functions/variables: `camelCase`
- Constants: `SCREAMING_SNAKE_CASE` for true constants
- Route files: lowercase with `$` prefix for params (TanStack Router convention)

## console.log
- **Banned in production code** — use proper error boundaries and TanStack Query error states
- Allowed only in development-only debug code (guarded by `import.meta.env.DEV`)
