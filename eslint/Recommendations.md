Here we present some advices regarding further ESLint configuration in you project.

## Recommended rules for manual configuration

There are some helpful ESLint rules and plugins which are too strict to enable for all projects. We recommend to look through them and enable those that fit your project's needs.

### JavaScript
* `todo-plz/ticket-ref` можно настроить на уровне проекта, чтобы со всеми тудушками шёл тикет в джире
* `padding-line-between-statements` — кажется каждой команде лучше самим выбирать
* `import/dynamic-import-chunkname` — если используете webpack
* `import/no-extraneous-dependencies` — если в проекте часто возникает ситуация, что используются зависимости, не указанные явно в package.json. В сочетании с TS может давать больше ложных срабатываний из-за импортов из именованных глобальных модулей.
* `https://github.com/mozilla/eslint-plugin-no-unsanitized` — если в проекте есть работа со вставкой HTML-кода, нужно выбрать сантизайзер и настроить соответствующим образом плагин

### TypeScript
* `@typescript-eslint/no-unnecessary-condition` — требует TS 4.1 с включённым флагом noUncheckedIndexedAccess. Эта комбинация ужесточает проверки получения элементов из массива по индексу и из объекта по ключу, что приводит к большей type safety, но придётся сильнее тайпгардить.
* `@typescript-eslint/switch-exhaustiveness-check` - если в проекте много switch-проверок, которые требуют обхода всех вариантов, советую включить это правило, а для default использовать [UnreachableCaseError из ts-essentials](https://github.com/krzkaczor/ts-essentials#exhaustive-switch-cases)
  
### React
* `react-hooks/exhaustive-deps` стоит включать в файлах, где это действительно нужно. Включение везде может привести к багам при автофиксинге. Для этого в шапке файла укажите:
  ```js
  /* eslint react-hooks/exhaustive-deps: "error" */
  ```
* `eslint-plugin-react-perf` — если в проекте есть чувствительные к производительности места. Рекомендую включать не целиком на всём проекте, а точечно. Либо указать нужные места в `overrides`, либо в конкретных файлах включать правила:
  ```js
  /* eslint
      react-perf/jsx-no-new-object-as-prop: "error",
      react-perf/jsx-no-new-array-as-prop: "error",
      react-perf/jsx-no-new-function-as-prop: "error",
      react-perf/jsx-no-jsx-as-prop: "error"
  */
  ```
* `eslint-plugin-react-redux` - если в проекте активно используется Redux

## Linting performance

Если линтинг занимает слишком много времени, можно запустить с переменной `TIMING=1` и посмотреть, какие правила отнимают больше всего времени.
