Here we present some advices regarding further ESLint configuration in your project.

## Recommended rules for manual configuration

There are some helpful ESLint rules and plugins which are too strict to enable for all projects. We recommend to look through them and enable those that fit your project's needs.

### JavaScript
* [`todo-plz/ticket-ref`](https://github.com/sawyerh/eslint-plugin-todo-plz) — require TODOs to contain an associated issue ticket:
  ```js
  // Fail
  // TODO fix that later
  
  // Pass
  // TODO will be fixed in PROJ-123
  ```
* [`import/dynamic-import-chunkname`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/dynamic-import-chunkname.md) — if you are using dynamic imports in webpack.
* [`import/no-extraneous-dependencies`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md) — forbid importing dependencies which are not listed as dependencies in `package.json`.
* [`eslint-plugin-no-unsanitized`](https://github.com/mozilla/eslint-plugin-no-unsanitized) — if you are inserting HTML directly in JS. You'll need to choose a sanitizer library and configure this plugin accordingly.

### TypeScript
* [`@typescript-eslint/no-unnecessary-condition`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-condition.md) — requires TS 4.1 or higher with `noUncheckedIndexedAccess` option enabled. Combination of this TS option and linting rule will provide better type safety but you'll need to write more type guards.
  ```ts
  const items: Item[] = []
  
  // Fail
  // noUncheckedIndexedAccess: false
  const item = items[0] // type: Item
  if (item) {} // no-unnecessary-condition will report error here
  
  // Pass
  // noUncheckedIndexedAccess: true
  const item = items[0] // type: Item | undefined
  if (item) {}
  ```
* [`@typescript-eslint/switch-exhaustiveness-check`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/switch-exhaustiveness-check.md) — it may be overkill to enable this rule globally so you can enable it in specific files and/or use [`UnreachableCaseError` from `ts-essentials`](https://github.com/krzkaczor/ts-essentials#exhaustive-switch-cases)
  
### React
* [`react-hooks/exhaustive-deps`](https://github.com/facebook/react/tree/master/packages/eslint-plugin-react-hooks#advanced-configuration) — we recommend enable this rule only the files which are heavily rely on memoization. In some situations following this rule may lead to breaking logic (e.g. when `useEffect` is used as a watcher). To enable this rule in specific file add this comment at the file start:
  ```js
  /* eslint react-hooks/exhaustive-deps: "error" */
  ```
* [`eslint-plugin-react-perf`](https://github.com/cvazac/eslint-plugin-react-perf) — this plugin has several rules requiring memoization of objects, arrays and functions and JSX passed as props. These rules may be helpful in performance-critical places, but it may be too restrictive to enable them globally. We recommend enabling these rules either via [`overrides` ESLing config field](https://eslint.org/docs/user-guide/configuring/configuration-files#how-do-overrides-work) or by adding this comment in specific files:
  ```js
  /* eslint
      react-perf/jsx-no-new-object-as-prop: "error",
      react-perf/jsx-no-new-array-as-prop: "error",
      react-perf/jsx-no-new-function-as-prop: "error",
      react-perf/jsx-no-jsx-as-prop: "error"
  */
  ```
* [`eslint-plugin-react-redux`](https://github.com/DianaSuvorova/eslint-plugin-react-redux) — for projects using Redux.
* [`plugin:functional/no-mutations`](https://github.com/jonaskello/eslint-plugin-functional#no-mutations-rules) — if you want to enforce usage of readonly data structures and avoid mutations. 

## Linting performance

If you feel that linting your project takes too long you can run ESLint with [`TIMING=1` environment variable](https://eslint.org/docs/developer-guide/working-with-rules-deprecated#per-rule-performance) and it'll show you which rules are taking the most time.
