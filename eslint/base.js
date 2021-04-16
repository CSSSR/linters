const { merge } = require('webpack-merge')

/**
 * @Article Base
 * ## Principles
 * ### Syntax
 * 1. Using Prettier for better formatting.
 * 2. Syntactic homogeneity. Semantically identical constructions must use the same syntax. To achieve that we fix spacings, paddings, quotes, shorthand techniques, etc. E.g., `curly` and `dot-notation`.
 * 3. Minimization of git diffs when code is being changed or refactored. Changing or extending code must change minimal count of symbols which aren't connected with the change in logic. By the most part this is achieved by using Prettier.
 * 4. Avoid disabling linting rules. We believe that linting rules shouldn't interfere with writing code. Disabling rules is allowed as an exception and a temporary measure. Because of this, we don't use frequently disabled rules like `no-mixed-operators`, `prefer-arrow-callback`, `no-useless-return`, etc.
 * 5. No warnings. All kinds of undesirable constructions must be fixed. Warning add noise to the result of project building and quickly become being ignored. As an exception warnings are allowed in a situation of a long refactoring but only as a temporary measure.
 */

/**
 * @Article Base
 * ### Semantics
 * 1. Explicit is better than implicit. JS has many implicit defaults so to avoid confusion we prefer being explicit and not using ambiguous constructions. E.g., `no-implicit-coercion`.
 * 2. Minimization of errors. JavaScript is an interpreted language so all the incorrect or meaningless constructions can be detected only during execution. We try to minimize the amount of constructions that can lead to runtime errors. E.g., `guard-for-in` and `eqeqeq`.
 * 3. Make code readable without limiting developers too much. We don't want for linting to be in the way of writing logic so we don't use rules like `complexity` or `max-depth`. But we still try to restrict semantic constructions which make reading code difficult and use rules like `max-params` or `no-nested-ternary`.
 * 4. Make sure code is ready for production environment. Code shouldn't contain temporary or debug construction. E.g., `no-eval`, `no-console`, `no-debugger`, etc.
 */

/**
 * @Article Base
 * ## Rules overview
 */

/**
 * @Article Base
 * ### Prettier
 * [`eslint-plugin-prettier`](https://github.com/prettier/eslint-plugin-prettier) is used for integration of Prettier and ESLint.
 *
 * [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier) turns off all the rules from ESLint and its plugins that might conflict with Prettier.
 */
const prettierConfig = {
  extends: ['plugin:prettier/recommended'],
}

/**
 * @Article Base
 * ### ESLint rules
 * We are using `eslint:recommended` as starting point. You can see list of included rules [here](https://eslint.org/docs/rules/) marked with a check mark.
 */
const baseConfig = {
  extends: ['eslint:recommended'],
  rules: {
    /**
     * @Article Base
     * #### [camelcase](https://eslint.org/docs/rules/camelcase)
     * ```js
     * // Fail
     * const my_var = { prop_name: 1 }
     *
     * // Pass
     * const myVar = { propName: 1 }
     * ```
     * Names starting with `UNSAFE_` are allowed to support React's legacy lifecycle methods:
     * ```js
     * class MyComponent extends React.Component {
     *   UNSAFE_componentWillUpdate() {}
     * }
     * ```
     */
    camelcase: [
      'error',
      {
        allow: ['^UNSAFE_'],
      },
    ],
    /**
     * @Article Base
     * #### [curly](https://eslint.org/docs/rules/curly)
     * ```js
     * // Fail
     * if (true) return null
     *
     * // Pass
     * if (true) { return null }
     * ```
     */
    curly: ['error', 'all'],
    /**
     * @Article Base
     * #### [default-param-last](https://eslint.org/docs/rules/default-param-last)
     * ```js
     * // Fail
     * function f(foo = 0, bar) {}
     *
     * // Pass
     * function f(bar, foo = 0) {}
     * ```
     */
    'default-param-last': 'error',
    /**
     * @Article Base
     * #### [dot-notation](https://eslint.org/docs/rules/dot-notation)
     * ```js
     * // Fail
     * obj['param']
     *
     * // Pass
     * obj.param
     * ```
     */
    'dot-notation': 'error',
    /**
     * @Article Base
     * #### [eqeqeq](https://eslint.org/docs/rules/eqeqeq)
     * Prefer strict equals to avoid implicit checks.
     *  ```js
     *  // Fail
     *  if (x == null) {}
     *
     *  // Pass
     *  const isNil = (v) => v === null || v === undefined
     *
     *  if (isNil(x)) {}
     *  ```
     */
    eqeqeq: ['error', 'always'],
    /**
     * @Article Base
     * #### [guard-for-in](https://eslint.org/docs/rules/guard-for-in)
     * For iterating over object keys use `Object.keys` instead of `for ... in` as it returns object's **own** property names and ignores inherited ones.
     * ```js
     * // Fail
     * for (key in obj) { }
     *
     * // Pass
     * Object.keys(obj).forEach((key) => {})
     * ```
     */
    'guard-for-in': 'error',
    /**
     * @Article Base
     * #### [max-params](https://eslint.org/docs/rules/max-params)
     * Functions may have maximum 3 parameters:
     * ```js
     * // Fail
     * const myFn = (a, b, c, d) => {}
     *
     * // Pass
     * const myFn = ({ a, b, c, d }) => {}
     * ```
     * If you're using [`reselect`](https://github.com/reduxjs/reselect) and errors are reported for `createSelector` with too many params, switch to `createStructuredSelector`.
     */
    'max-params': ['error', 3],
    /**
     * @Article Base
     * #### [no-bitwise](https://eslint.org/docs/rules/no-bitwise)
     * Quite often bitwise operator is just a typo in logical operator:
     * ```js
     * // Fail
     * const x = y | z
     *
     * // Pass
     * const x = y || z
     * ```
     * If you need to use bitwise operators, disable this rule for the lines containing them.
     */
    'no-bitwise': 'error',
    /**
     * @Article Base
     * #### [no-console](https://eslint.org/docs/rules/no-console)
     * Remove `console.log` from production code:
     * ```js
     * // Fail
     * console.log('Debug info')
     *
     * // Pass
     * console.info('Info')
     * console.warn('Warning')
     * console.error('Error')
     * ```
     */
    'no-console': [
      'error',
      {
        allow: ['info', 'warn', 'error'],
      },
    ],
    /**
     * @Article Base
     * #### [no-eval](https://eslint.org/docs/rules/no-eval)
     * Forbid usages of `eval` as potentially dangerous:
     * ```js
     * // Fail
     * eval("var a = 0")
     * ```
     */
    'no-eval': 'error',
    /**
     * @Article Base
     * #### [no-implicit-coercion](https://eslint.org/docs/rules/no-implicit-coercion)
     * All implicit coercions except `!!` are disallowed:
     * ```js
     * // Fail
     * +foo
     * 1 * foo
     * '' + foo
     * `${foo}`
     * ~foo.indexOf(bar)
     *
     * // Pass
     * !!foo
     * ```
     */
    'no-implicit-coercion': [
      'error',
      {
        disallowTemplateShorthand: true,
        allow: ['!!'],
      },
    ],
    /**
     * @Article Base
     * #### [no-nested-ternary](https://eslint.org/docs/rules/no-nested-ternary)
     * ```js
     * // Fail
     * return a ? b ? c : d : e
     *
     * // Pass
     * if (a) {
     *   return b ? c : d
     * } else {
     *   return e
     * }
     * ```
     */
    'no-nested-ternary': 'error',
    /**
     * @Article Base
     * #### [no-new-wrappers](https://eslint.org/docs/rules/no-new-wrappers)
     * ```js
     * // Fail
     * const n = new Number(1)
     *
     * // Pass
     * const n = 1
     * ```
     */
    'no-new-wrappers': 'error',
    /**
     * @Article Base
     * #### [no-param-reassign](https://eslint.org/docs/rules/no-param-reassign)
     * ```js
     * // Fail
     * function f(foo) {
     *   foo++
     * }
     *
     * // Pass
     * function f(foo) {
     *   const bar = foo + 1
     * }
     * ```
     */
    'no-param-reassign': 'error',
    /**
     * @Article Base
     * #### [no-shadow](https://eslint.org/docs/rules/no-shadow)
     * ```js
     * // Fail
     * rows.forEach((item) => {
     *   item.columns.forEach((item) => {
     *     // `item` is shadowed
     *   })
     * })
     *
     * // Pass
     * rows.forEach((row) => {
     *   item.columns.forEach((column) => {
     *   })
     * })
     * ```
     */
    'no-shadow': 'error',
    /**
     * @Article Base
     * #### [no-template-curly-in-string](https://eslint.org/docs/rules/no-template-curly-in-string)
     * ```js
     * // Fail
     * "Hello, ${name}"
     *
     * // Pass
     * `Hello, ${name}`
     * ```
     */
    'no-template-curly-in-string': 'error',
    /**
     * @Article Base
     * #### [no-throw-literal](https://eslint.org/docs/rules/no-throw-literal)
     * ```js
     * // Fail
     * throw 'Error'
     *
     * // Pass
     * throw new Error('Error')
     * ```
     */
    'no-throw-literal': 'error',
    /**
     * @Article Base
     * #### [no-undef-init](https://eslint.org/docs/rules/no-undef-init)
     * ```js
     * // Fail
     * let foo = undefined
     *
     * // Pass
     * let foo
     * ```
     */
    'no-undef-init': 'error',
    /**
     * @Article Base
     * #### [no-underscore-dangle](https://eslint.org/docs/rules/no-underscore-dangle)
     * ```js
     * // Fail
     * const _private = 1
     *
     * // Pass
     * items.map((_item, idx) => idx)
     * ```
     */
    'no-underscore-dangle': [
      'error',
      {
        enforceInMethodNames: true,
      },
    ],
    /**
     * @Article Base
     * #### [no-unneeded-ternary](https://eslint.org/docs/rules/no-unneeded-ternary)
     * ```js
     * // Fail
     * const isYes = answer === 1 ? true : false
     *
     * // Pass
     * const isYes = answer === 1
     * ```
     */
    'no-unneeded-ternary': 'error',
    /**
     * @Article Base
     * #### [no-unused-expressions](https://eslint.org/docs/rules/no-unused-expressions)
     * ```js
     * // Fail
     * a || b
     * (function f() {})
     *
     * // Pass
     * a && b()
     * a ? b() : c()
     * ```
     */
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
        enforceForJSX: true,
      },
    ],
    /**
     * @Article Base
     * #### [no-unused-vars](https://eslint.org/docs/rules/no-unused-vars)
     * ```js
     * // Fail
     * const { foo, bar } = props
     * console.log(foo)
     *
     * // Pass
     * const { foo } = props
     * console.log(foo)
     * ```
     */
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        /**
         * @Article Base
         * Hanging unused parameters in functions are not allowed:
         * ```js
         * // Fail
         * function f(a, b, c, d) {
         *   console.log(b)
         * }
         *
         * // Pass
         * function f(a, b) {
         *   console.log(b)
         * }
         * ```
         */
        args: 'after-used',
        /**
         * @Article Base
         * Omitted params in object destructuring can be left unused:
         * ```js
         * // Pass
         * const { foo, ...rest } = props
         * console.log(rest)
         * ```
         */
        ignoreRestSiblings: true,
      },
    ],
    /**
     * @Article Base
     * #### [no-var](https://eslint.org/docs/rules/no-var)
     * ```js
     * // Fail
     * var foo
     *
     * // Pass
     * let foo
     * ```
     */
    'no-var': 'error',
    /**
     * @Article Base
     * #### [object-shorthand](https://eslint.org/docs/rules/object-shorthand)
     * ```js
     * // Fail
     * const a = { x : x }
     *
     * // Pass
     * const a = { x }
     * ```
     */
    'object-shorthand': 'error',
    /**
     * @Article Base
     * #### [one-var](https://eslint.org/docs/rules/one-var)
     * ```js
     * // Fail
     * let foo, bar
     *
     * // Pass
     * let foo
     * let bar
     * ```
     */
    'one-var': ['error', 'never'],
    /**
     * @Article Base
     * #### [operator-assignment](https://eslint.org/docs/rules/operator-assignment)
     * ```js
     * // Fail
     * x = x + y
     *
     * // Pass
     * x += y
     * ```
     */
    'operator-assignment': ['error', 'always'],
    /**
     * @Article Base
     * #### [padding-line-between-statements](https://eslint.org/docs/rules/padding-line-between-statements)
     * We only configure paddings between exports and other statements to emphasize exported values. You may customize this rule in your project depending on your needs.
     * ```js
     * // Fail
     * const a = 1
     * export const b = 2
     *
     * // Pass
     * const a = 1
     *
     * export const b =2
     * ```
     */
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'export' },
      { blankLine: 'always', prev: 'export', next: '*' },
      { blankLine: 'any', prev: 'export', next: 'export' },
    ],
    /**
     * @Article Base
     * #### [prefer-const](https://eslint.org/docs/rules/prefer-const)
     * ```js
     * // Fail
     * let a = 3
     *
     * // Pass
     * const a = 3
     * ```
     */
    'prefer-const': 'error',
    /**
     * @Article Base
     * #### [radix](https://eslint.org/docs/rules/radix)
     * ES5 no longer treats strings with leading 0 as octal literal, so there's no need to pass the radix 10:
     * ```js
     * // Fail
     * const n = parseInt('071', 10)
     *
     * // Pass
     * const n = parseInt('071')
     * ```
     */
    radix: ['error', 'as-needed'],

    /**
     * @Article Base
     * ### Disabled rules
     */
    /**
     * @Article Base
     * #### [~~no-irregular-whitespace~~](https://eslint.org/docs/rules/no-irregular-whitespace)
     * We disable this rule as it can't properly allow using non-breaking whitespaces inside JSX tags.
     * It forces to use `&nbsp;` instead:
     * ```jsx
     * <>Push the&nbsp;button</>
     * ```
     * Which leads to a problem when converting JSX text node to a string:
     * ```jsx
     * <>{'Push the&nbsp;button'}</>
     * ```
     * If developer don't pay attention or text is too big to look through it properly, `&nbsp;` moves into string without any warning and shows up in UI as a group of symbols, not a whitespace.
     */
    'no-irregular-whitespace': 'off',
    /**
     * @Article Base
     * #### [~~no-use-before-define~~](https://eslint.org/docs/rules/no-use-before-define)
     * We don't enable this rule as it is often more practical to place usages before definitions. E.g., in React component it is better to place component code first and helper functions below. That way the most important thing in the file comes first.
     */
    'no-use-before-define': 'off',
  },
}

/**
 * @Article Base
 * ### Unicorn
 * Additional rules from [`eslint-config-unicorn`](https://github.com/sindresorhus/eslint-plugin-unicorn).
 */
const unicornConfig = {
  plugins: ['unicorn'],
  rules: {
    /**
     * @Article Base
     * #### [unicorn/explicit-length-check](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/explicit-length-check.md)
     * Checking for `.length` of an empty array can lead to rendering `0` instead of not rendering anything. This rule forces to always explicitly check for array length by comparing it:
     * ```jsx
     * // Fail
     * return items.length && <Items />
     *
     * // Pass
     * return items.length > 0 && <Items />
     * ```
     */
    'unicorn/explicit-length-check': 'error',
    /**
     * @Article Base
     * #### [unicorn/filename-case](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/filename-case.md)
     * ```
     * // Fail
     * my-component.js
     * my_component.js
     *
     * // Pass
     * myComponent.js
     * MyComponent.js
     * en-US.js
     * ```
     */
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
        ignore: [
          // en-US and other locale files
          /^[a-z]{2}-[A-Z]{2}\./,
        ],
      },
    ],
    /**
     * @Article Base
     * #### [unicorn/no-abusive-eslint-disable](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-abusive-eslint-disable.md)
     * ```js
     * // Fail
     * // eslint-disable-next-line
     * console.log(message);
     *
     * // Pass
     * // eslint-disable-next-line no-console
     * console.log(message);
     * ```
     */
    'unicorn/no-abusive-eslint-disable': 'error',
    /**
     * @Article Base
     * #### [unicorn/throw-new-error](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/throw-new-error.md)
     * By design `Error(msg)` and `new Error(msg)` can be used interchangeably but for the sake of homogeneity it is better to always use only one form.
     * ```js
     * // Fail
     * throw Error()
     *
     * // Pass
     * throw new Error()
     * ```
     * We prefer `new Error` for consistency with custom subclassed errors which cannot be created without `new`:
     * ```js
     * class MyError extends Error {}
     * throw MyError() // Uncaught TypeError
     * throw new MyError() // OK
     * ```
     */
    'unicorn/throw-new-error': 'error',
  },
}

/**
 * @Article Base
 * ### Rules for asynchronous code
 * Using [`eslint-config-promise`](https://github.com/xjamundx/eslint-plugin-promise).
 */
const promiseConfig = {
  plugins: ['promise'],
  rules: {
    /**
     * @Article Base
     * #### [prefer-promise-reject-errors](https://eslint.org/docs/rules/prefer-promise-reject-errors)
     * ```js
     * // Fail
     * Promise.reject('Error')
     *
     * // Pass
     * Promise.reject(new Error('Error'))
     * ```
     */
    'prefer-promise-reject-errors': 'error',
    /**
     * @Article Base
     * #### [require-await](https://eslint.org/docs/rules/require-await)
     * ```js
     * // Fail
     * async function f() {
     *   doSomethingSynchronously()
     * }
     *
     * // Pass
     * async function f() {
     *   await doSomethingAsynchronously()
     * }
     * ```
     */
    'require-await': 'error',
    /**
     * @Article Base
     * #### [promise/catch-or-return](https://github.com/xjamundx/eslint-plugin-promise/blob/development/docs/rules/catch-or-return.md)
     * ```js
     * // Fail
     * myPromise.then(doSomething)
     *
     * // Pass
     * myPromise.then(doSomething).catch(handleError)
     * ```
     */
    'promise/catch-or-return': [
      'error',
      {
        allowThen: true,
        allowFinally: true,
      },
    ],
    /**
     * @Article Base
     * #### [promise/no-return-in-finally](https://github.com/xjamundx/eslint-plugin-promise/blob/development/docs/rules/no-return-in-finally.md)
     * ```js
     * // Fail
     * myPromise.finally(() => {
     *   return 'done'
     * })
     *
     * // Pass
     * myPromise.finally(() => {
     *   alert('done')
     * })
     * ```
     */
    'promise/no-return-in-finally': 'error',
    /**
     * @Article Base
     * #### [promise/no-return-wrap](https://github.com/xjamundx/eslint-plugin-promise/blob/development/docs/rules/no-return-wrap.md)
     * ```js
     * // Fail
     * myPromise.then((val) => Promise.resolve(val * 2))
     * myPromise.then(() => Promise.reject(new Error()))
     *
     * // Pass
     * myPromise.then((val) => val * 2)
     * myPromise.then(() => {
     *   throw new Error()
     * })
     * ```
     */
    'promise/no-return-wrap': 'error',
    /**
     * @Article Base
     * #### [promise/param-names](https://github.com/xjamundx/eslint-plugin-promise/blob/development/docs/rules/param-names.md)
     * ```js
     * // Fail
     * new Promise((reject, resolve) => {})
     *
     * // Pass
     * new Promise((resolve, reject) => {})
     * ```
     */
    'promise/param-names': 'error',
  },
}

const importConfig = {
  /**
   * @Article Base
   * ### Import rules
   * Using [`eslint-config-import`](https://github.com/benmosher/eslint-plugin-import) and [`eslint-config-unicorn`](https://github.com/sindresorhus/eslint-plugin-unicorn).
   */
  plugins: ['import', 'unicorn'],
  /**
   * @Article Base
   * Extending [`plugin:import/errors`](https://github.com/benmosher/eslint-plugin-import/blob/master/config/errors.js).
   */
  extends: ['plugin:import/errors'],
  rules: {
    /**
     * @Article Base
     * #### [import/no-duplicates](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md)
     * ```js
     * // Fail
     * import { App } from './App'
     * import { SOME_CONST } from './App'
     *
     * // Pass
     * import { App, SOME_CONST } from './App'
     * ```
     */
    'import/no-duplicates': 'error',
    /**
     * @Article Base
     * #### [import/first](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md)
     * ```js
     * // Fail
     * init()
     * import { App } from './App'
     *
     * // Pass
     * import { App } from './App'
     * init()
     * ```
     */
    'import/first': 'error',
    /**
     * @Article Base
     * #### [import/newline-after-import](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/newline-after-import.md)
     * ```js
     * // Fail
     * import { App } from './App'
     * render(App)
     *
     * // Pass
     * import { App } from './App'
     *
     * render(App)
     * ```
     */
    'import/newline-after-import': 'error',
    /**
     * @Article Base
     * #### [import/no-cycle](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-cycle.md)
     * ```js
     * // Fail
     *
     *  // a.js
     * import { b } from './b'
     * export const a = 1
     *
     * // b.js
     * import { a } from './a'
     * export const b = 2
     * ```
     */
    'import/no-cycle': 'error',
    /**
     * @Article Base
     * #### [import/no-default-export](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-default-export.md)
     * ```js
     * // Fail
     * export default function foo() {}
     *
     * // Pass
     * export function foo() {}
     * ```
     */
    'import/no-default-export': 'error',
    /**
     * @Article Base
     * #### [import/order](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md)
     * Group imports by module type and sort them alphabetically inside a group.
     *
     * Order of import groups:
     */
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        groups: [
          /**
           * @Article Base
           * 1. `builtin`
           * ```js
           * import * from 'path'
           * ```
           */
          'builtin',
          /**
           * @Article Base
           * 2. `external`
           * ```js
           * import * from 'lodash'
           * ```
           */
          'external',
          /**
           * @Article Base
           * 3. `internal`
           * ```js
           * import * from 'src/utils'
           * import * from '@/utils'
           * import * from '~/utils'
           * ```
           */
          'internal',
          /**
           * @Article Base
           * 4. `parent`
           * ```js
           * import * from '../'
           * ```
           */
          'parent',
          /**
           * @Article Base
           * 5. `sibling`
           * ```js
           * import * from './sibling'
           * ```
           */
          'sibling',
          /**
           * @Article Base
           * 6. `index`
           * ```js
           * import * from '.'
           * ```
           */
          'index',
        ],
        pathGroups: [
          {
            pattern: '{@,~}/**',
            group: 'internal',
          },
        ],
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md#pathgroupsexcludedimporttypes-array
        // By default both `builtin` and `external` imports are excluded from path groups.
        // All imports starting with `@` (including aliased `@/**` imports) are treated as externals and are ignored from groups.
        // So we don't need to exclude `external` imports to properly group `@/**` alias.
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    /**
     * @Article Base
     * #### [sort-imports](https://eslint.org/docs/rules/sort-imports)
     * Sort import members:
     * ```js
     * // Fail
     * import { c, a, b } from 'module'
     *
     * // Pass
     * import { a, b, c } from 'module'
     * ```
     */
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    /**
     * @Article Base
     * #### [unicorn/import-index](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/import-index.md)
     * ```js
     * // Fail
     * import * from './index'
     *
     * // Pass
     * import * from '.'
     * ```
     */
    'unicorn/import-index': 'error',
  },
}

/**
 * @Article Base
 * ### Rules for regular expressions
 */
const regexConfig = {
  // todo: look through https://github.com/ota-meshi/eslint-plugin-regexp
  // todo: look through https://github.com/BrainMaestro/eslint-plugin-optimize-regex
  plugins: ['unicorn'],
  rules: {
    /**
     * @Article Base
     * #### [prefer-named-capture-group](https://eslint.org/docs/rules/prefer-named-capture-group)
     * We use named capture groups as they are more explicit while matching or replacing:
     * ```js
     * // Fail
     * const regexp = /(ba[rz])/
     * const groupResult = regexp.exec('bar')[1] // 'bar'
     * 'foobar'.replace(regexp, '($1)') // 'foo(bar)'
     *
     * // Pass
     * const regexp = /(?<named>ba[rz])/
     * const groupResult = regexp.exec('bar').groups.named // 'bar'
     * 'foobar'.replace(regexp, '($<named>)') // 'foo(bar)'
     * ```
     * If you don't need the result of capturing, mark group as a non-capturing:
     * ```js
     * // Pass
     * const regexp = /(?:ba[rz])/
     * ```
     */
    'prefer-named-capture-group': 'error',
    /**
     * @Article Base
     * #### [prefer-regex-literals](https://eslint.org/docs/rules/prefer-regex-literals)
     * ```js
     * // Fail
     * new RegExp("abc")
     *
     * // Pass
     * /abc/
     * new RegExp(someVariable)
     * new RegExp(`${prefix}abc`)
     * ```
     */
    'prefer-regex-literals': 'error',
    /**
     * @Article Base
     * #### [unicorn/better-regex](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/better-regex.md)
     * ```js
     * // Fail
     * /[0-9]/
     *
     * // Pass
     * /\d/
     * ```
     */
    'unicorn/better-regex': [
      'error',
      {
        sortCharacterClasses: false,
      },
    ],
  },
}

module.exports = merge(
  {
    env: {
      browser: true, // window, document
      es6: true,
      node: true, // process, module, require
      jest: true, // describe, it, expect
    },
  },
  baseConfig,
  unicornConfig,
  regexConfig,
  promiseConfig,
  importConfig,
  // Prettier config should always go last to override conflicting rules from other configs
  prettierConfig
)
