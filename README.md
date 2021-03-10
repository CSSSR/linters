## ESLint configuration

```js
// File: .eslintrc.js
module.exports = {
  extends: [
    require.resolve('csssr-base-lint/eslintrc/base'),
    require.resolve('csssr-base-lint/eslintrc/typescript'),
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
