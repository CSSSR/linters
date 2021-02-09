# Node JS

> NOTE: We don't use special syntactic limitations for Node enviroment, because we prefer to use same syntax for all enviroments.

## Semantic rules

### Principles

1. Поддержанием согласованности версии engine и кодовой базы. Node.js проекты в меньшей степени нуждаются в транспилерах поэтому мы можем на уровне eslint проверять соотвествие кодовой базы и версии engine в package.json. Related rules: `node/no-unsupported-features/es-syntax`, `node/no-unsupported-features/es-builtins`, `node/no-unsupported-features/node-builtins`, `node/no-deprecated-api`
2. Поддержание согласованности используемых зависимостей и возможности использовать наш проект как зависимость. Мы стараемся избегать использование не описанных в package.json завимостей или несуществующих файлов. Related rules: `node/no-unpublished-require`, `node/no-unpublished-import`, `node/no-unpublished-bin`, `node/no-extraneous-import`, `node/no-extraneous-require`, `node/no-missing-import`, `node/no-missing-require`
2. Не используем правила фиксированные на конвенцииях по именованию. Это создает определенные магические имена, и может создавать путаницу в коде. Если необходимо конкретные правила могут определять на уровне проекта. Поэтому мы не используем: `node/callback-return`, `node/handle-callback-err`, `node/no-callback-literal`
3. Минимизируем способы использования nodejs api. Node.js имеет множество возможностей и зачастую эти возможности очень гибкие и имеют много вариантов использованию. Это может порождать ошибки и сложность в анализе коде. Мы ограничиваем варианты использования node.js api. Также мы запрещаем использовать некотрые возможности которые могут быть опасны в долгоживущих серверных приложений. Related rules: `exports-style`, `node/file-extension-in-import`, `node/global-require`, `node/no-exports-assign`, `node/no-mixed-requires`, `node/no-new-require`, `node/no-path-concat`, `node/no-process-env`, `node/no-process-exit`, `node/no-sync`, `node/no-process-exit`, 
4. Ограничиваем небезопасные апи и способы их использования. Серверный среда крайне уязвима для разных векторов атак. Мы не можем полностью при помощи статического анализа гарантировать отсуствие проблем с безопасностью но стараемся закрывать самые распространненные базовые вектора атак. We use `eslint-plugin-security-node` rules: `detect-buffer-unsafe-allocation`, `detect-child-process`, `detect-insecure-randomness`, `detect-non-literal-require-calls`, `detect-dangerous-redirects`, `detect-option-rejectunauthorized-in-nodejs-httpsrequest`, `detect-runinthiscontext-method-in-nodes-vm`, `disable-ssl-across-node-server`, `non-literal-reg-expr`

### Rules
