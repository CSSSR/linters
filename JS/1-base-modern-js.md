# Base modern JS

## Syntactic rules

### Principles
1. Использование Prettier для лучшего форматирования
2. Однообразие синтаксиса. Одинаковые по смыслу конструкции должны делатся одинаковыми синтаксическими конструкциями, за исключением случаев сокращений которые помогать избегать лишнего синтаксического шума.
3. Минимизация размера диффа при изменениях и рефакторингах. При переписывании кода или его расширении не должно изменятся много синтаксиса не связаного с изменением логики. 
4. Минимизация игнорирований правил. Правила должны быть составлены так чтобы не было штатных ситуаций в которых бы нам было необходимо добавлять игнорирование правила на постоянной основе. Это возможно только в исключениях или как временная мера. Мы доверяем разработчикам в команде и не пытаемся связывать им руки линтером.
5. Все ошибки линтера должны исправлятся. Мы не используем варнинги, так как это создает возможность не исправлять ошибки в результате чего в результах сборку будет становится больше лишнего шума. Варнинги можно использовать только в случае  длительного рефакторинга и перехода с одного подхода на другой, когда нет возможности исправить все сразу.

### Rules

#### Prettier config

```js
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true,
  "printWidth": 100,
  "jsxBracketSameLine": false
}
```

#### Eslint config

```js
{
    "arrow-body-style": "off",
    "arrow-parens": [
      "off",
      "as-needed"
    ],
    "arrow-spacing": ["error", { before: true, after: true }],
    "curly": "error",
    "dot-notation": "error",
    "eol-last": "off",
    "prettier/prettier": "error",
    "keyword-spacing": "error",
    "linebreak-style": "off",
    "max-len": "off",
    "quotes": "off",
    "new-parens": "off",
    "newline-per-chained-call": "off",
    "padded-blocks": ["error", "never"],
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
    "no-extra-semi": "off",
    "no-multi-spaces": "error",
    "no-multiple-empty-lines": "off",
    "no-trailing-spaces": [
        "off",
        { "ignoreComments": true, "skipBlankLines": true }
    ]
    "object-shorthand": "error",
    "object-curly-spacing": ["error", "always"],
    "quote-props": ["error", "as-needed"],
    "space-before-function-paren": "off",
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
    "unicorn/empty-brace-spaces": "error",
    "unicorn/import-index": "error",
    "unicorn/no-useless-undefined": "error",
    "unicorn/throw-new-error": "error"
}
```

## Semantic rules

### Principles
1. Явное лучше неявного. JS содержит много неочевидных конструкций которые могут иметь заданное поведение по умолчанию - мы предпочитаем не опиратся на это и явно прописывать что мы хотим сделать даже в ущерб краткости
2. Минимизация возможных ошибок. JS интерпритируемый язык, и многие некорректные или не имеющеи смысла конструкции определяются только в процессе исполнения, поэтому мы стараемся минимизировать количество конструкций которые могут быть опасны или бессмысленны
3. Разумное ограничение разработчика. Мы не хотим ограничивать разработчика в возможностях по описанию логики, но пытаемся запрещать кейсы которые сильно усложняют анализ кода
4. Проверенный код должен быть готов к деплою на продакшен окружение. В коде не должно оставатся временных или предназначенных для отладки конструкций

### Rules
```js
{
    "complexity": "off",
    "constructor-super": "error",
    "no-case-declarations": "error",
    "eqeqeq": [
      "error",
      "smart"
    ],
    "guard-for-in": "error",
    "import/no-default-export": "error",
    "max-classes-per-file": [
      "error",
      1
    ],
    "no-nested-ternary": "error",
    "no-bitwise": "error",
    "no-caller": "error",
    "no-cond-assign": "error",
    "no-console": "error",
    "no-debugger": "error",
    "no-dupe-keys": "error"
    "no-empty": "error",
    "no-eval": "error",
    "no-new-wrappers": "error",
    "no-throw-literal": "error",
    "no-undef-init": "error",
    "no-underscore-dangle": ["error"],
    "no-unsafe-finally": "error",
    "no-unused-expressions": [
      "error",
      {
        "allowShortCircuit": true,
        "allowTernary": true
      }
    ],
    "no-unused-labels": "error",
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
    "use-isnan": "error",
    "unicorn/no-abusive-eslint-disable": "error"
}
```

## Examples

## Non-exist rules

TODO 
1. Перевести на английский
2. Придумать как сделать в формате литературного программирования - чтобы этий файлы непосредственно могли подключатся к общему eslintrc
3. Обсудить нужно ли еще как то сгруппировать правила 
4. Обсудить нужны ли какие то комментарии к отдельным правилам
5. Написать примеры хорошего и плохого кода
6. Написать блок с правилами которые мы хотели бы иметь но их еще нет или их невозможно написать(обсудить нужно ли - пока не могу придумать такие кейсы для базового жс)