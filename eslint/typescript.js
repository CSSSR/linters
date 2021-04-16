/**
 * @Article TypeScript
 * We are using [TypeScript ESLint](https://github.com/typescript-eslint/typescript-eslint) and its [recommended configs](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#recommended-configs) as a starting point.
 */
module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/typescript',
    // To override typescript-eslint rules
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  /**
   * @Article TypeScript
   * ## Rules overview
   */
  rules: {
    /**
     * @Article TypeScript
     * ### Upgrading warnings from recommended config to errors
     */

    /**
     * @Article TypeScript
     * #### [@typescript-eslint/explicit-module-boundary-types](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md)
     * Exported functions should have return type declared explicitly to avoid unexpected changes in return type.
     * In case you want all functions to have return type specified, use rule `@typescript-eslint/explicit-function-return-type`.
     * ```ts
     * // Fail
     * export const getString = () => 'string'
     *
     * // Pass
     * export const getString = (): string => 'string'
     * const getString = () => 'string'
     * ```
     */
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    /**
     * @Article TypeScript
     * #### [@typescript-eslint/no-explicit-any](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-explicit-any.md)
     * ```ts
     * // Fail
     * let a: any
     *
     * // Pass
     * let a: unknown
     * ```
     */
    '@typescript-eslint/no-explicit-any': 'error',
    /**
     * @Article TypeScript
     * #### [@typescript-eslint/no-non-null-assertion](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-non-null-assertion.md)
     * ```ts
     * // Fail
     * return foo!.bar
     *
     * // Pass
     * return foo?.bar
     * ```
     */
    '@typescript-eslint/no-non-null-assertion': 'error',

    /**
     * @Article TypeScript
     * ### Clarifying recommended rules
     */

    /**
     * @Article TypeScript
     * #### [@typescript-eslint/no-floating-promises](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-floating-promises.md)
     * If function returns promise but we want to ignore this promise it should be explicitly shown that this is an async function call. Add `void` before such function calls to distinguish them from synchronous ones.
     * ```ts
     * const asyncSideEffect = async () => { await doSomething() }
     *
     * // Fail
     * asyncSideEffect()
     *
     * // Pass
     * await asyncSideEffect() // wait for result
     * void asyncSideEffect() // ignore and don't wait
     * ```
     */
    '@typescript-eslint/no-floating-promises': 'error',
    /**
     * @Article TypeScript
     * #### [@typescript-eslint/restrict-template-expressions](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/restrict-template-expressions.md)
     * Avoid `null` or `undefined` being included in a string:
     * ```ts
     * // Fail
     * const print = (a?: string | null) => `a: ${a}`
     *
     * // Pass
     * const print = (a?: string | null) => `a: ${a ?? 'empty'}`
     * ```
     */
    '@typescript-eslint/restrict-template-expressions': 'error',

    /**
     * @Article TypeScript
     * ### Disabling recommended rules
     */

    /**
     * @Article TypeScript
     * #### [~~@typescript-eslint/no-unsafe-assignment~~](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-assignment.md)
     * #### [~~@typescript-eslint/no-unsafe-call~~](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-call.md)
     * #### [~~@typescript-eslint/no-unsafe-member-access~~](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-member-access.md)
     * #### [~~@typescript-eslint/no-unsafe-return~~](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-return.md)
     * Disabled this group of rules as they flag usages of external libraries which typings contain `any.`
     */
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    /**
     * @Article TypeScript
     * #### [~~@typescript-eslint/unbound-method~~](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/unbound-method.md)
     * Disabled as it flags usages of unbound methods from external libraries (e.g., `_.noop` from Lodash)
     */
    '@typescript-eslint/unbound-method': 'off',

    /**
     * @Article TypeScript
     * ### Enabling new rules
     */

    /**
     * @Article TypeScript
     * #### [@typescript-eslint/array-type.md](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/array-type.md#array-simple)
     * Use `T[]` for primitives and type references and `Array<T>` for other cases:
     * ```ts
     * // Fail
     * type A = Array<string>
     * type B = { param: string }[]
     * type C = (string | number)[]
     *
     * // Pass
     * type A = string[]
     * type B = Array<{ param: string }>
     * type C = Array<string | number>
     * ```
     */
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    /**
     * @Article TypeScript
     * #### [@typescript-eslint/consistent-indexed-object-style](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-indexed-object-style.md)
     * ```ts
     * // Fail
     * type A = { [key: Key]: Value }
     *
     * // Pass
     * type A = Record<Key, Value>
     * ```
     */
    '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
    /**
     * @Article TypeScript
     * #### [@typescript-eslint/consistent-type-assertions](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-assertions.md)
     * To prevent conflicts with JSX:
     * ```ts
     * // Fail
     * const a = <T>b
     *
     * // Pass
     * const a = b as T
     * ```
     */
    '@typescript-eslint/consistent-type-assertions': 'error',
    /**
     * @Article TypeScript
     * #### [@typescript-eslint/consistent-type-definitions](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-definitions.md)
     * Prefer `type` to `interface`:
     * * `type` can be used for any type variations (objects, arrays, unions, primitives and so on) while `interface` is only for object shapes. So for the sake of consistency it is better to use `type` everywhere and not mix it with `interface`.
     * * `type` can only be defined once, while `interface` can be defined multiple times and these definitions [will merge](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces).
     * ```ts
     * // Fail
     * interface A {
     *   foo: string
     * }
     *
     * // Pass
     * type A = {
     *   foo: string
     * }
     * ```
     */
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    /**
     * @Article TypeScript
     * #### [@typescript-eslint/consistent-type-imports](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-imports.md)
     * Prefer [type imports](https://devblogs.microsoft.com/typescript/announcing-typescript-3-8-beta/#type-only-imports-exports): it helps to better distinguish types from similarly named variables and avoid `import/no-cycle` errors when importing types.
     * `import type { T } from 'lib'`
     * ```ts
     * // Fail
     * import { T } from 'lib'
     *
     * // Pass
     * import type { T } from 'lib'
     * ```
     * There are [some cases](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-imports.md#when-not-to-use-it) when you might need to disable this rule (e.g. with NestJS).
     */
    '@typescript-eslint/consistent-type-imports': 'error',
    /**
     * @Article TypeScript
     * #### [@typescript-eslint/method-signature-style](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/method-signature-style.md)
     * ```ts
     * // Fail
     * type A = {
     *   method(): void
     * }
     *
     * // Pass
     * type A = {
     *   method: () => void
     * }
     * ```
     */
    '@typescript-eslint/method-signature-style': ['error', 'property'],
    /**
     * @Article TypeScript
     * #### [@typescript-eslint/naming-convention](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md)
     * The only common naming convention we enforce is PascalCase for types.
     * You may add more naming conventions based on your project needs.
     * ```ts
     * // Fail
     * type myType = {}
     *
     * // Pass
     * type MyType = {}
     * ```
     */
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
    /**
     * @Article TypeScript
     * #### [@typescript-eslint/prefer-nullish-coalescing](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-nullish-coalescing.md)
     * Prefer `??` to `!!` as `??` will not fallback if value is falsy (`0`, `''`, false, etc.):
     * ```ts
     * const a: number | null | undefined = 0
     *
     * // Fail
     * const b = a || 999 // result: 999
     *
     * // Pass
     * const b = a ?? 999 // result: 0
     * ```
     */
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    /**
     * @Article TypeScript
     * #### [@typescript-eslint/prefer-optional-chain](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-optional-chain.md)
     * ```ts
     * const a: {
     *   b? : Array<{
     *     c?: () => void
     *   }>
     * } | undefined = {}
     *
     * // Fail
     * a && a.b && a.b[0] && a.b[0].c && a.b[0].c()
     *
     * // Pass
     * a?.b?.[0]?.c?.()
     * ```
     */
    '@typescript-eslint/prefer-optional-chain': 'error',
    /**
     * @Article TypeScript
     * #### [@typescript-eslint/prefer-reduce-type-parameter](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-reduce-type-parameter.md)
     * Provide result type for `Array#reduce` calls when it can't be properly inferred from initial value.
     * ```ts
     * // Fail
     * [1, 2, 3].reduce((arr, num) => arr.concat(num * 2), [] as number[])
     *
     * // Pass
     * [1, 2, 3].reduce<number[]>((arr, num) => arr.concat(num * 2), [])
     * ```
     */
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    /**
     * @Article TypeScript
     * #### [@typescript-eslint/prefer-ts-expect-error](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-ts-expect-error.md)
     * ```ts
     * // Fail
     * // @ts-ignore
     * const str: string = 1
     *
     * // Pass
     * // @ts-expect-error: I know what I'm doing
     * const str: string = 1
     * ```
     */
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    /**
     * @Article TypeScript
     * #### [@typescript-eslint/require-array-sort-compare](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/require-array-sort-compare.md)
     * ```ts
     * // Fail
     * [1, 5, 10].sort() // [1, 10, 5]
     *
     * // Pass
     * [1, 5, 10].sort((a, b) => a - b) // [1, 5, 10]
     * ['c', 'a', 'b'].sort()
     * ```
     */
    '@typescript-eslint/require-array-sort-compare': [
      'error',
      {
        ignoreStringArrays: true,
      },
    ],

    /**
     * @Article TypeScript
     * ### TS alternatives to JS rules
     * Some ESLint rules have better alternatives in `@typescript-eslint` so we enable them instead of ESLint rules.
     */

    /**
     * @Article TypeScript
     * #### [@typescript-eslint/default-param-last](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/default-param-last.md)
     */
    'default-param-last': 'off',
    '@typescript-eslint/default-param-last': 'error',
    /**
     * @Article TypeScript
     * #### [@typescript-eslint/dot-notation](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/dot-notation.md)
     */
    'dot-notation': 'off',
    '@typescript-eslint/dot-notation': 'error',
    /**
     * @Article TypeScript
     * #### [@typescript-eslint/init-declarations](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/init-declarations.md)
     * In TS instead of `no-undef-init` we enable opposite rule `init-declarations` to avoid runtime errors with `let` variables:
     * ```ts
     * // Fail
     * let str: string // Actually it's `undefined`, but TS sees it as a `string`
     *
     * // Pass
     * let str: string | undefined = undefined
     * ```
     */
    'no-undef-init': 'off',
    'init-declarations': 'off',
    '@typescript-eslint/init-declarations': 'error',
    /**
     * @Article TypeScript
     * #### [@typescript-eslint/no-duplicate-imports](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-duplicate-imports.md)
     */
    'no-duplicate-imports': 'off',
    'import/no-duplicates': 'off',
    '@typescript-eslint/no-duplicate-imports': 'error',
    /**
     * @Article TypeScript
     * #### [@typescript-eslint/no-shadow](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-shadow.md)
     */
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    /**
     * @Article TypeScript
     * #### [@typescript-eslint/no-throw-literal](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-throw-literal.md)
     */
    'no-throw-literal': 'off',
    '@typescript-eslint/no-throw-literal': 'error',
    /**
     * @Article TypeScript
     * #### [@typescript-eslint/no-unused-expressions](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-expressions.md)
     */
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
        enforceForJSX: true,
      },
    ],
    /**
     * @Article TypeScript
     * #### [@typescript-eslint/no-useless-constructor](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-useless-constructor.md)
     */
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    /**
     * @Article TypeScript
     * #### [@typescript-eslint/no-unused-vars](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md)
     * */
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        // To not report usages of `require` in config files
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // TS successfully checks these cases by itself
        'import/no-unresolved': 'off',
      },
    },
  ],
}
