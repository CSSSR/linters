const { merge } = require('webpack-merge')

// todo актуализировать списки правил, не указывать все правила, а оставить только несколько для примера
/**
 * @Article Base modern JS
 * ## Syntactic rules
 * ### Principles
 * 1. Using `prettier` for better formating. `eslint-plugin-prettier` is used for intergration `prettier` and `eslint`. `eslint-config-prettier` turns off all rules that are unnecessary or might conflict with. Related rules: `prettier/prettier`
 * 2. Syntactic homogeneity. Semantically identical construction must be implemented by syntactic identical construction, except in cases of using shorthand techniques which help to avoid extra syntactic noise. We fix spacings, paddings, quotes and shorthand techniques. Related rules: `curly`, `dot-notation`, `operator-assignment`, `padding-line-between-statements`, `prefer-const`, `object-shorthand`, `throw-new-error`, `import-index`
 * Иногда этот принцип может конфликтовать с explicitness (no-undef-init, no-useless-undefined), в таком случае предпочтение отдаётся explicitness
 * 3. Minimization of git diffs, when code is being changed or refactored. Code changing or extending must change minimal count of symbols which aren't connected with change of logic. Related rules: `padding-line-between-statements`, `prettier/prettier`(`semi`, `trailingComma`, `quoteProps` etc.)
 * 4. Minimization of disabling eslint rules. Rules shouldn't interfere with writing code. Rules should never be permanently switched off. Disabling rules is possible only as an exception and a temporary measure. Because of this, we don't use next rules: `no-mixed-operators`, `prefer-arrow/*`, `prefer-arrow-callback`, `no-useless-return` etc.
 * 5. All kinds of undesirable constructions must be fixed. Because of it, we can't use warnings. Warnings may not be corrected very long time. It adds noise to the result of building project. Warnings can be allowed only in situation of long refactoring as a temporary measure.
 *
 * ## Semantic rules
 * ### Principles
 * 1. Explicit is better than implicit. JS has many implicit defaults. We strictly prefer using explicit semantic construction and prefer not using ambiguous construction. Also, when it can make our code longer. Related rules: `radix`, `no-bitwise`, `no-case-declarations`, `no-implicit-coercion`, `promise/always-return`, `no-promise-executor-return`, `promise/no-return-wrap`, `promise/no-new-statics`, `no-new-wrappers`, `import/no-default-export`, `no-useless-escape`
 * 2. Minimization of possibility of errors. `Javascript` is an interpreted language. Because of it, many incorrect or meaningless constructions can be detected only during execution. We try to minimize the amount of constructions that can lead to runtime errors or can be inpredictable in run-time. Related rules: `constructor-super`, `guard-for-in`, `eqeqeq`, `import/no-cycle`, `import/no-self-import`, `getter-return`, `no-caller`, `no-cond-assign`, `no-constructor-return`, `no-dupe-args`, `no-dupe-keys`, `no-dupe-else-if`, `no-invalid-regexp`, `no-throw-literal`, `no-unsafe-finally`,  `no-useless-catch`, `no-unsafe-negation`, `no-var`, `promise/catch-or-return`, `use-isnan`, `no-underscore-dangle`, `valid-typeof`
 * 3. Reasonable limitation of the programmer at work. We don't want to restrict the programmer's ability to describe programm logic. We try to restrict semantic constructions which made it extremely difficult to analyze code. We don't use next rules: `complexity`, `max-nested-callbacks`, `max-lines`, `no-loss-of-precision`, `id-length`, `max-depth`, `max-statements`, `no-lonely-if`, `no-negated-condition`, `no-continue`, `unicorn/consistent-destructuring`, `unicorn/consistent-function-scoping`, `no-unsafe-optional-chaining` etc. But we use: `max-params`, `no-nested-ternary`, `no-inner-declarations`, `no-unsafe-finally`,  `no-useless-catch` and so on.
 * 4. If code is checked by linter, code will be ready to deployment on production enviroment. Code can't contain temporary or debug construction. Related rules: `no-empty`, `no-eval`, `no-console`, `no-debugger`, `no-unreachable`, `no-unused-expressions`, `no-unused-labels`, `no-unused-var`, `unicorn/no-abusive-eslint-disable`
 */

const prettierConfig = {
  extends: ['prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
}

const baseConfig = {
  extends: ['eslint:recommended'],
  rules: {
    /*
     * https://eslint.org/docs/rules/curly
     * error: if (true) return null
     * prefer: if (true) { return null }
     * */
    curly: ['error', 'all'],
    /*
     * https://eslint.org/docs/rules/dot-notation
     * error: obj['param']
     * prefer: obj.param
     * */
    'dot-notation': 'error',
    /*
     * https://eslint.org/docs/rules/operator-assignment
     * prefer: x += y
     * error: x = x + y
     * */
    'operator-assignment': ['error', 'always'],
    /*
     * https://eslint.org/docs/rules/padding-line-between-statements
     * */
    'padding-line-between-statements': [
      'error',
      // Кажется полезным отделять экспорты от других объяалений, чтобы более явно было, что файл экспортирует
      // В остальных случаях пустые строки могут излишне раздувать небольшие методы и компоненты, поэтому решайте и донастраивайте на уровне команды
      { blankLine: 'always', prev: '*', next: 'export' },
      { blankLine: 'always', prev: 'export', next: '*' },
      { blankLine: 'any', prev: 'export', next: 'export' },
    ],
    /*
     * https://eslint.org/docs/rules/prefer-const
     * error: let a = 3 без переназначения потом
     * prefer: const a = 3
     * */
    'prefer-const': 'error',
    /*
     * https://eslint.org/docs/rules/object-shorthand
     * error: const a = { x : x }
     * prefer: const a = { x }
     * */
    'object-shorthand': 'error',
    /*
     * https://eslint.org/docs/rules/init-declarations
     * заменил no-undef-init на init-declarations, чтобы наоборот всегда указывали начальное состояние
     * это позволило найти потенциальную ошибку в коде, где было: `let str: string` (TS думал что там string, хотя по факту лежал undefined)
     * */
    'init-declarations': 'error',
    /*
     * https://eslint.org/docs/rules/eqeqeq
     * в том числе запрещаем `x == null`, т.к. это implicit проверка
     *  лучше иметь общий утил-метод isNil, который будет сравнивать с undefined и с null
     * */
    eqeqeq: ['error', 'always'],
    /*
     * https://eslint.org/docs/rules/guard-for-in
     * Bad: ```for (key in obj) { ... }```
     * Good: ```Object.keys(obj).forEach( ... )```
     * Use `Object.keys` instead as it returns object's **own** property names and ignores inherited ones.
     * */
    'guard-for-in': 'error',
    /*
     * https://eslint.org/docs/rules/no-nested-ternary
     * */
    'no-nested-ternary': 'error',
    /*
     * https://eslint.org/docs/rules/no-unneeded-ternary
     * */
    'no-unneeded-ternary': 'error',
    /*
     * https://eslint.org/docs/rules/no-bitwise
     * */
    'no-bitwise': 'error',
    'no-console': [
      'error',
      {
        allow: ['info', 'warn', 'error'],
      },
    ],
    /*
     * https://eslint.org/docs/rules/no-constructor-return
     * */
    'no-constructor-return': 'error',
    'no-useless-constructor': 'error',
    /*
     * https://eslint.org/docs/rules/no-eval
     * */
    'no-eval': 'error',
    /*
     * https://eslint.org/docs/rules/no-implicit-coercion
     */
    'no-implicit-coercion': [
      'error',
      {
        // !! слишком часто используется, чтобы запрещать
        allow: ['!!'],
      },
    ],
    /*
     * https://eslint.org/docs/rules/no-new-wrappers
     * error: const s = new String('hello')
     * */
    'no-new-wrappers': 'error',
    /*
     * https://eslint.org/docs/rules/no-throw-literal
     * */
    'no-throw-literal': 'error',
    /*
     * https://eslint.org/docs/rules/no-underscore-dangle
     * */
    'no-underscore-dangle': 'error',
    /*
     * https://eslint.org/docs/rules/no-unused-expressions
     * */
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
        enforceForJSX: true,
      },
    ],
    /*
     * https://eslint.org/docs/rules/no-unused-vars
     * */
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        // в функции указывать ровно столько параметров, сколько нужно
        args: 'after-used',
        // чтобы можно было делать omit через спред `const { omitted, ...rest } = props`
        ignoreRestSiblings: true,
      },
    ],
    /*
     * https://eslint.org/docs/rules/no-var
     * */
    'no-var': 'error',
    /*
     * https://eslint.org/docs/rules/max-params
     * Начиная с 4 - делайте объект
     * аналог: именованные параметры
     * показать пример, объяснить проблему порядка, обязательности, boolean-флаги `fn(true, true, false)`
     * */
    'max-params': ['error', 3],
    /*
     * https://eslint.org/docs/rules/radix
     * */
    radix: 'error',
    /*
     * https://eslint.org/docs/rules/camelcase
     * */
    camelcase: 'error',
    /*
     * https://eslint.org/docs/rules/no-template-curly-in-string
     * bad: "Hello, ${name}"
     * good: `Hello, ${name}`
     * */
    'no-template-curly-in-string': 'error',
    /*
     * https://eslint.org/docs/rules/default-param-last
     * */
    'default-param-last': 'error',
    /*
     * https://eslint.org/docs/rules/no-param-reassign
     * */
    'no-param-reassign': 'error',
    'no-shadow': 'error',

    // Отключения
    /*
     * TS хорошо сам с этим справляется и позволяет размещать функции ниже их использования. Это полезно для организации кода, т.к. файл начинается с самой верхнеуровневой функции (например, компонента).
     *  но в JS такой проверки нет и можно получить проблемы с использованием неопределённой переменной
     *  отключить и объяснить, почему выключили
     *  если у вас много таких ошибок, то включите
     * */
    'no-use-before-define': 'off',
    /*
     * We disable this rule as it can't properly allow using non-breaking whitespaces inside JSX.
     * It forces to use `&nbsp;` instead:
     * ```<>Push the&nbsp;button</>```
     * Which leads to a problem when converting JSX text node to a string:
     * ```<>{'Push the&nbsp;button'}</>```
     * If developer don't pay attention or text is too big to look throgh it properly, `&nbsp;` moves into string without any warning and shows up in interface as a group of symbols, not a whitespace.
     * */
    'no-irregular-whitespace': 'off',
  },
}

const unicornConfig = {
  plugins: ['unicorn'],
  rules: {
    /*
     * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/filename-case.md
     * Запрещаем только snakeCase: my_component.ts
     * */
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          kebabCase: true,
          pascalCase: true,
        },
      },
    ],
    /*
     * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/throw-new-error.md
     * By design `Error(msg)` and `new Error(msg)` can be used interchangeably:
     * > the function call Error(…) is equivalent to the object creation expression new Error(…) with the same arguments.
     * Source: https://262.ecma-international.org/7.0/#sec-error-constructor
     * But for the sake of homogeneity it is better to always use only one form.
     * We prefer `new Error` for consistency with custom subclassed errors which cannot be created without `new`. E.g.
     * ```
     * class MyError extends Error {}
     * throw MyError() // Uncaught TypeError: Class constructor MyError cannot be invoked without 'new'
     * ```
     */
    'unicorn/throw-new-error': 'error',
    /*
     * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/explicit-length-check.md
     * error: arr.length && ...
     * prefer: arr.length > 0 && ...
     * Позволит избежать рендеринга `0` на странице из-за `<>{items.length && items.map(...)}</>`
     * Даёт много срабатываний, т.к. привыкли к быстрым проверкам, но оно fixable в большинстве случаев
     *  помогло отловить случаи, когда при выведении типа у стэйта был тип boolean | number вместо boolean:
     *  `useState(isFlag && items.length)`
     * */
    'unicorn/explicit-length-check': 'error',
    /*
     * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-abusive-eslint-disable.md
     * чтобы отрубали только конкретное правило eslint, а не целиком
     * */
    'unicorn/no-abusive-eslint-disable': 'error',
  },
}

const promiseConfig = {
  plugins: ['promise'],
  rules: {
    /*
     * https://eslint.org/docs/rules/no-promise-executor-return
     * */
    'no-promise-executor-return': 'error',
    /*
     * https://eslint.org/docs/rules/prefer-promise-reject-errors
     * */
    'prefer-promise-reject-errors': 'error',
    /*
     * https://eslint.org/docs/rules/require-await
     * */
    'require-await': 'error',
    /*
     * https://github.com/xjamundx/eslint-plugin-promise/blob/development/docs/rules/catch-or-return.md
     * */
    'promise/catch-or-return': [
      'error',
      {
        allowThen: true,
        allowFinally: true,
      },
    ],
    /*
     * https://github.com/xjamundx/eslint-plugin-promise/blob/development/docs/rules/no-return-in-finally.md
     * */
    'promise/no-return-in-finally': 'error',
    'promise/no-return-wrap': 'error',
    'promise/param-names': 'error',
    'promise/no-new-statics': 'error',
  },
}

const importConfig = {
  plugins: ['import', 'unicorn'],
  extends: ['plugin:import/errors'],
  rules: {
    /*
     * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/import-index.md
     * error: import * from './index'
     * prefer: import * from '.'
     * */
    'unicorn/import-index': 'error',

    'import/no-self-import': 'error',
    'import/no-cycle': 'error',
    'import/no-default-export': 'error',
    'import/first': 'error',
    'import/no-duplicates': 'error',
    'import/newline-after-import': 'error',

    /*
     * Sort import declarations
     * ```
     * import a from 'a'
     * import b from 'b'
     * ```
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
          // import * from 'path'
          'builtin',
          // import * from 'lodash'
          'external',
          // import * from 'src/utils'
          // import * from '@/utils'
          // import * from '~/utils'
          'internal',
          // import * from '../'
          'parent',
          // import * from './sibling'
          'sibling',
          // import * from '.'
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
    // Sort import members: `import { a, b, c } from 'module`
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
  },
}

const regexConfig = {
  // todo: look through https://github.com/ota-meshi/eslint-plugin-regexp
  // todo: look through https://github.com/BrainMaestro/eslint-plugin-optimize-regex
  plugins: ['unicorn'],
  rules: {
    /*
     * https://eslint.org/docs/rules/prefer-named-capture-group
     * пример: в регекспе HEX-цвета было $1,$2,$3 - стало $<R>,$<G>,$<B>
     * */
    'prefer-named-capture-group': 'error',
    /*
     * https://eslint.org/docs/rules/prefer-regex-literals
     * */
    'prefer-regex-literals': 'error',
    /*
     * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/better-regex.md
     * error: /[^\d]/
     * prefer: /\D/
     * */
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
      browser: true, // window, document и т.д.
      es6: true,
      node: true, // process, module, require и т.д.
      jest: true, // describe, it, expect
    },
  },
  baseConfig,
  unicornConfig,
  regexConfig,
  promiseConfig,
  importConfig,
  // обязательно последний, т.к. отключает правила из eslint, unicorn, react и других конфигов
  prettierConfig
)
