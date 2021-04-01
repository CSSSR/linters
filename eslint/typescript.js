module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/typescript',
    // Чтобы перебить правила из typescript-eslint
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    // Делаем warn-правила из 'plugin:@typescript-eslint/recommended' ошибками

    /*
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md
     * Exported functions should have return type declared explicitly
     * In case you want all functions to have return type specified, use rule `@typescript-eslint/explicit-function-return-type`
     * */
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    /*
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-explicit-any.md
     * Disallow usage of any
     * */
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',

    // Рекомендованные правила, требующие тайпчекинг (пояснения)

    /*
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-floating-promises.md
     * если промис не используется, его надо помечать с помощью void — более явно, что это функция возвращает промис, который мы умышленно игнорим
     * */
    '@typescript-eslint/no-floating-promises': 'error',
    /*
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/restrict-template-expressions.md
     * Позволяет избежать вывода null или undefined в template literal
     * */
    '@typescript-eslint/restrict-template-expressions': 'error',

    // Рекомендованные правила, требующие тайпчекинг (отключения)

    /*
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-assignment.md
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-call.md
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-member-access.md
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-return.md
     * Отключил, т.к. слишком усложняют работу с типами сторонних библиотек, в которых есть any
     * */
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    /*
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/unbound-method.md
     * Отключил, т.к. мешает использованию lodash-методов (например, _.noop)
     * */
    '@typescript-eslint/unbound-method': 'off',

    // Другие правила

    /*
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/array-type.md#array-simple
     * Простые типы: T[], сложные: Array<T>
     * */
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    /*
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-indexed-object-style.md
     * Prefer `Record<K, V>` to `{ [key: K]: V }`
     * */
    '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
    /*
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-assertions.md
     * Prefer `myVar as T` to `<T>myVar` to prevent conflitcs with JSX
     * */
    '@typescript-eslint/consistent-type-assertions': 'error',
    /*
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-definitions.md
     * Prefer `type` to `interface`:
     * * `type` can be used for any type combinations while `interface` is only for object shapes. So for the sake of consistency it is better to use `type` everywhere and not mix it with `interface`.
     * * `type` can only be defined once, while `interface` can be defined multiple times and these definitions will merge
     * If you have strong need to use both `type` and `interface` you can disable this rule
     * */
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    /*
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-imports.md
     * Prefer type imports: `import type { T } from 'lib'`
     * https://devblogs.microsoft.com/typescript/announcing-typescript-3-8-beta/#type-only-imports-exports
     * There are some cases when you might not want to use this rule: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-imports.md#when-not-to-use-it (e.g. with NestJS)
     * */
    '@typescript-eslint/consistent-type-imports': 'error',
    /*
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/method-signature-style.md
     * Prefer `{ param: () => void }` to `{ param(): void }`
     * */
    '@typescript-eslint/method-signature-style': ['error', 'property'],
    /*
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
     * The only common naming convention we use is PascalCase for types.
     * You may add more naming conventions based on your project needs.
     * */
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
    /*
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-nullish-coalescing.md
     * Prefer `??` to `!!` when dealing with `null` or `undefined`
     * Using `??` provides more safety as it will not fallback if value is falsy (`0`, `''`, false) and only if it is `null` or `undefined`
     * ```
     * const a = 0
     * const b = a ?? 999 // 0
     * const c = a || 999 // 999
     * ```
     * */
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    /*
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-optional-chain.md
     * Prefer optional chaining to group of logical AND's
     * bad: `a && a.b && a.b.c()`
     * good: `a?.b?.c()`
     * */
    '@typescript-eslint/prefer-optional-chain': 'error',
    /*
     * https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
     * Provide result type for Array.reduce when reducing to object or array
     * */
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    /*
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-ts-expect-error.md
     * */
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    /*
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/require-array-sort-compare.md
     * Provide sort function when sorting non-string arrays
     * */
    '@typescript-eslint/require-array-sort-compare': [
      'error',
      {
        ignoreStringArrays: true,
      },
    ],

    // TS-альтернативы es-правилам

    /*
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/default-param-last.md
     * */
    'default-param-last': 'off',
    '@typescript-eslint/default-param-last': 'error',
    /*
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/dot-notation.md
     * */
    'dot-notation': 'off',
    '@typescript-eslint/dot-notation': 'error',
    /*
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/init-declarations.md
     * заменил no-undef-init на init-declarations, чтобы наоборот всегда указывали начальное состояние
     * это позволило найти потенциальную ошибку в коде, где было: `let str: string` (TS думал что там string, хотя по факту лежал undefined)
     * */
    'no-undef-init': 'off',
    'init-declarations': 'off',
    '@typescript-eslint/init-declarations': 'error',
    /*
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-duplicate-imports.md
     * */
    'no-duplicate-imports': 'off',
    'import/no-duplicates': 'off',
    '@typescript-eslint/no-duplicate-imports': 'error',
    /*
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-shadow.md
     * */
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    /*
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-throw-literal.md
     * */
    'no-throw-literal': 'off',
    '@typescript-eslint/no-throw-literal': 'error',
    /*
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-expressions.md
     * */
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
    /*
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-useless-constructor.md
     * */
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        // в функции указывать ровно столько параметров, сколько нужно
        args: 'after-used',
        // чтобы можно было делать omit через спред `const { omitted, ...rest } = props`
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
        /*
         * TS сам хорошо справляется
         * */
        'import/no-unresolved': 'off',
      },
    },
  ],
}
