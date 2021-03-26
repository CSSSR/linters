## Installation

Install `csssr-base-lint` and its' peer dependencies:
```
todo
```

## ESLint configuration

```js
// File: .eslintrc.js
module.exports = {
  extends: [
    require.resolve('csssr-base-lint/eslint/base'),
    require.resolve('csssr-base-lint/eslint/typescript'),
  ],
}
```

## Prettier configuration

```js
// File: .prettierrc.js
module.exports = {
  ...require('csssr-base-lint/prettier.config'),
}
```

## Linting TypeScript project

`tsconfig.json` from root of the project will be used for gathering type info for some rules. If your TS config is located elsewhere, configure its path in [`parserOptions.project`](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser#parseroptionsproject) field of ESLint config.

Only files specified in `include` section of `tsconfig.json` will be linted. Because of that configs located in the root folder (`.eslintrc.js`, `.prettierrc.js`, etc.) will not be linted but can still be formatted with Prettier.
