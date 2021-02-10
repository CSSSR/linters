# Base modern JS

## Syntactic rules

### Principles
1. Using `prettier` for better formating. `eslint-plugin-prettier` is used for intergration `prettier` and `eslint`. `eslint-config-prettier` turns off all rules that are unnecessary or might conflict with. Related rules: `prettier/prettier`
2. Syntactic homogeneity. Semantically identical construction must be implemented by syntactic identical construction, except in cases of using shorthand techniques which help to avoid extra syntactic noise. We fix spacings, paddings, quotes and shorthand techniques. Related rules: `curly`, `dot-notation`, `operator-assignment`, `padding-line-between-statements`, `prefer-const`, `object-shorthand`, `throw-new-error`, `import-index`, `no-useless-undefined`, `no-undef-init`
3. Minimization of git diffs, when code is being changed or refactored. Code changing or extending must change minimal count of symbols which aren't connected with change of logic. Related rules: `padding-line-between-statements`, `prettier/prettier`(`semi`, `trailingComma`, `quoteProps` etc.)
4. Minimization of disabling eslint rules. Rules shouldn't interfere with writing code. Rules should never be permanently switched off. Disabling rules is possible only as an exception and a temporary measure. Because of this, we don't use next rules: `no-mixed-operator`, `prefer-arrow/*`, `prefer-arrow-callback`, `no-useless-return` etc.
5. All kinds of undesirable constructions must be fixed. Because of it, we can't use warnings. Warnings may not be corrected very long time. It adds noise to the result of building project. Warnings can be allowed only in situation of long refactoring as a temporary measure.

### Rules

#### Prettier config

```js
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true,
  "printWidth": 100,
}
```

#### Eslint config

```js
{
    "plugins": ["prettier"],
    "extends": ["prettier", "prettier/unicorn"],
    "rules": {
        "curly": "error",
        "dot-notation": "error",
        "prettier/prettier": "error",
        "operator-assignment": ["error", "never"],
        "padding-line-between-statements": [
            "error",
            { blankLine: "always", prev: "*", next: ["multiline-const", "multiline-let"] },
            { blankLine: "always", prev: ["multiline-const", "multiline-let"], next: "*" },
            { blankLine: "always", prev: "*", next: ["if", "for", "while", "switch", "iife", "do", "throw"] },
            { blankLine: "always", prev: ["if", "for", "while", "switch", "iife", "do", "throw"], next: "*" },
            { blankLine: "always", prev: "*", next: "export" },
            { blankLine: "always", prev: "*", next: "return" },
        ],
        "prefer-const": "error",
        "object-shorthand": "error",
        "no-undef-init": "error",
        "unicorn/filename-case": [
            "error",
            {
                "cases": {
                    "camelCase": true,
                    "kebabCase": true,
                    "pascalCase": true
                }
            }
        ],
        "unicorn/import-index": "error",
        "unicorn/no-useless-undefined": "error",
        "unicorn/throw-new-error": "error"
    }
}
```

## Semantic rules

### Principles
1. Explicit is better than implicit. JS has many implicit defaults. We strictly prefer using explicit semantic construction and prefer not using ambiguous construction. Also, when it can make our code longer. Related rules: `radix`, `no-bitwise`, `no-case-declarations`, `no-implicit-coercion`, `promise/always-return`, `no-promise-executor-return`, `promise/no-return-wrap`, `promise/no-new-statics`, `no-new-wrappers`, `import/no-default-export`, `no-useless-escape`
2. Minimization of possibility of errors. `Javascript` is an interpreted language. Because of it, many incorrect or meaningless constructions can be detected only during execution. We try to minimize the amount of constructions that can lead to runtime errors or can be inpredictable in run-time. Related rules: `constructor-super`, `guard-for-in`, `eqeqeq`, `import/no-cycle`, `import/self-import`, `getter-return`, `no-caller`, `no-cond-assign`, `no-constructor-return`, `no-dupe-args`, `no-dupe-keys`, `no-dupe-else-if`, `no-invalid-regexp`, `no-throw-literal`, `no-unsafe-finally`,  `no-useless-catch`, `no-unsafe-negation`, `no-var`, `promise/catch-or-return`, `use-isnan`, `no-underscore-dangle`, `valid-typeof`
3. Reasonable limitation of the programmer at work. We don't want to restrict the programmer's ability to describe programm logic. We try to restrict semantic constructions which made it extremely difficult to analyze code. We don't use next rules: `complexity`, `max-nested-callbacks`, `max-lines`, `no-loss-of-precision`, `id-length`, `max-depth`, `max-statements`, `no-lonely-if`, `no-negated-condition`, `no-continue`, `unicorn/consistent-destructuring`, `unicorn/consistent-function-scoping`, `no-unsafe-optional-chaining` etc. But we use: `max-params`, `max-classes-per-file`, `no-nested-ternary`, `no-inner-declarations`, `no-unsafe-finally`,  `no-useless-catch` and so on.
4. If code is checked by linter, code will be ready to deployment on production enviroment. Code can't contain temporary or debug construction. Related rules: `no-empty`, `no-eval`, `no-console`, `no-debugger`, `no-unreachable`, `no-unused-expressions`, `no-unused-labels`, `no-unused-var`, `unicorn/no-abusive-eslint-disable` 

### Rules
```js
{
    "rules": {
        "constructor-super": "error",
        "no-case-declarations": "error",
        "eqeqeq": [
            "error",
            "smart"
        ],
        "guard-for-in": "error",
        "getter-return": "error"
        "import/no-default-export": "error",
        "import/no-cycle": "error",
        "import/self-import": "error",
        "max-classes-per-file": [
            "error",
            1
        ],
        "no-nested-ternary": "error",
        "no-bitwise": "error",
        "no-caller": "error",
        "no-cond-assign": "error",
        "no-console": "error",
        "no-constructor-return": "error",
        "no-debugger": "error",
        "no-dupe-args": "error",
        "no-dupe-keys": "error",
        "no-dupe-else-if": "error",
        "no-empty": "error",
        "no-eval": "error",
        "no-invalid-regexp": "error",
        "no-inner-declarations": "error",
        "no-implicit-coercion": "error",
        "no-new-wrappers": "error",
        "no-promise-executor-return": "error",
        "no-throw-literal": "error",
        "no-underscore-dangle": "error",
        "no-unreachable": "error",
        "no-unsafe-finally": "error",
        "no-unsafe-negation": "error",
        "no-unused-expressions": [
        "error",
        {
            "allowShortCircuit": true,
            "allowTernary": true
        }
        ],
        "no-unused-labels": "error",
        "no-unused-vars": ["error", { vars: 'all', args: 'none', ignoreRestSiblings: false }],
        "no-useless-escape": "error",
        "no-useless-catch", "error",
        "no-var": "error",
        "max-params": ["error", 4],
        "radix": "error",
        "promise/always-return": "error",
        "promise/no-return-wrap": "error",
        "promise/catch-or-return": [
            "error",
            {
                "allowThen": true,
                "allowFinally": true
            }
        ],
        "promise/no-new-statics": "error",
        "valid-typeof": "error",
        "use-isnan": "error",
        "unicorn/no-abusive-eslint-disable": "error"
    }
}
```
