[CSSSR](https://csssr.com)'s linting configs for Prettier and ESLint.

## [Documentation](https://csssr.github.io/linters/)

## Installation

First install `@csssr/linters` itself:
```bash
npm i -D @csssr/linters

yarn add -D @csssr/linters
```

Then install peer dependencies (Prettier, ESLint and its plugins):
```bash
npx install-peerdeps -D @csssr/linters
```

## Prettier configuration

You may use your own Prettier config or use predefined one:

```js
// File: .prettierrc.js
module.exports = {
  ...require('@csssr/linters/prettier.config'),
}
```

## ESLint configuration

There are several predefined configurations, which you may include in your project based on your project needs:
* `eslint/base` - basic JavaScript rules including Prettier rule
* `exlint/react` - React and JSX rules
* `eslint/typescript` - TS-specific rules

## Linting Babel project

Install [`@babel/eslint-parser`](https://github.com/babel/babel/tree/main/eslint/babel-eslint-parser#installation) and add it as a parser to ESLint config:
```js
// File: .eslintrc.js
module.exports = {
  parser: "@babel/eslint-parser",
  extends: [
    require.resolve('@csssr/linters/eslint/base'),
    require.resolve('@csssr/linters/eslint/react'),
  ],
}
```

## Linting TypeScript project

```js
// File: .eslintrc.js
module.exports = {
  extends: [
    require.resolve('@csssr/linters/eslint/base'),
    require.resolve('@csssr/linters/eslint/react'),
    require.resolve('@csssr/linters/eslint/typescript'),
  ],
}
```

`tsconfig.json` from root of the project will be used for gathering type info for some rules. If your TS config is located elsewhere, configure its path in [`parserOptions.project`](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser#parseroptionsproject) field of ESLint config.

Only files specified in `include` section of `tsconfig.json` will be linted. Because of that configs located in the root folder (`.eslintrc.js`, `.prettierrc.js`, etc.) will not be linted but can still be formatted with Prettier.

## Linting mixed project (JS and TS)

```js
module.exports = {
  extends: [
    require.resolve('@csssr/linters/eslint/base'),
  ],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: [require.resolve('@csssr/linters/eslint/typescript')],
    },
  ],
}

```

## Customization

Feel free to add new plugins and rules and disable existing rules which are not suitable for your project's needs:

```js
// File: .eslintrc.js
module.exports = {
  extends: [
    require.resolve('@csssr/linters/eslint/base'),
    require.resolve('@csssr/linters/eslint/react'),
    require.resolve('@csssr/linters/eslint/typescript'),
  ],
  plugins: ['todo-plz'],
  rules: {
    // Disabling for Next project
    'jsx-a11y/anchor-is-valid': 'off',
    
    // New rule for linting todos
    'todo-plz/ticket-ref': [
      'error',
      {
        pattern: 'PROJ-[0-9]+',
        terms: ['TODO', 'todo'],
      },
    ],
  },
  overrides: [
    {
      // Storybook's CSF requires usage of default exports
      files: ['./src/**/index.stories.tsx'],
      rules: {
        'import/no-default-export': ['off'],
      },
    },
  ],
}
```

You can find more recommendations for manual configuration [here](https://csssr.github.io/linters/recommendations.html).

## [Contributing](CONTRIBUTING.md)
