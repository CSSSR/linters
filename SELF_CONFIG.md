Отдельно упомяну правила, которые не стоит включать глобально, но стоит включать точечно:
* exhaustive-deps стоит включать в файлах, где это действительно нужно. Включение везде может привести к багам при автофиксинге. Для этого в шапке файла укажите:
  ```ts
  /* eslint react-hooks/exhaustive-deps: "error" */
  ```
* todo-plz/ticket-ref можно настроить на уровне проекта, чтобы со всеми тудушками шёл тикет в джире
* padding-line-between-statements — кажется каждой команде лучше самим выбирать
* import/dynamic-import-chunkname — если используете webpack
* import/no-extraneous-dependencies — если в проекте часто возникает ситуация, что используются зависимости, не указанные явно в package.json. В сочетании с TS может давать больше ложных срабатываний из-за импортов из именованных глобальных модулей.
* @typescript-eslint/no-unnecessary-condition — требует TS 4.1 с включённым флагом noUncheckedIndexedAccess. Эта комбинация ужесточает проверки получения элементов из массива по индексу и из объекта по ключу, что приводит к большей type safety, но придётся сильнее тайпгардить.
* @typescript-eslint/switch-exhaustiveness-check - если в проекте много switch-проверок, которые требуют обхода всех вариантов, советую включить это правило, а для default использовать [UnreachableCaseError из ts-essentials](https://github.com/krzkaczor/ts-essentials#exhaustive-switch-cases)
* eslint-plugin-react-redux - если в проекте активно используется Redux

Если линтинг занимает слишком много времени:
* TIMING=1
* Отделить форматирование от линтинга (отключить правило `prettier/prettier`, если не стоит `process.env.CI` или другая переменная, указывающая на запуск тестов в CI)

