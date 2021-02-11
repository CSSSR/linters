const { makeEslintrcConfig } = require('../utils')

/**
 * @Article Node JS
 * 
 * > NOTE: We don't use special syntactic limitations for Node enviroment, because we prefer to use same syntax for all enviroments.
 * ## Semantic rules
 * ### Principles
 * 
 * 1. Maintaining correspondence between engine version and codebase. NodeJS's projects require less using transpilers. Because of it we can check correspondence between engine version and features used. Related rules: `node/no-unsupported-features/es-syntax`, `node/no-unsupported-features/es-builtins`, `node/no-unsupported-features/node-builtins`, `node/no-deprecated-api`
 * 2. Maintaining correspondence between dependencies in package.json and codebase. We check correct usage dependencies for publising our project as npm package. We restrict to use unexist files or undefined at package.json modules. Related rules: `node/no-unpublished-require`, `node/no-unpublished-import`, `node/no-unpublished-bin`, `node/no-extraneous-import`, `node/no-extraneous-require`, `node/no-missing-import`, `node/no-missing-require`
 * 3. Restricting usage rules which are assumed naming conventions. Fixing some naming conventions on linter level may create "magic" names which can complicate analyzing of code. If you want to use namming convention, you can use this rules on your project level. We don't use next rules: `node/callback-return`, `node/handle-callback-err`, `node/no-callback-literal`
 * 4. Minimization amount of ways to use of Node.js API. Node.js has big methods of API, and often this methods have many ways of using. It can lead to errors or can complicate to analyze of code. We limit amount of ways to use API node.js. Also we restrict API which may be dangerous for longliving server application. Related rules: `exports-style`, `node/file-extension-in-import`, `node/global-require`, `node/no-exports-assign`, `node/no-mixed-requires`, `node/no-new-require`, `node/no-path-concat`, `node/no-process-env`, `node/no-process-exit`, `node/no-sync`
 * 5. Resticting unsafe API and unsafe ways to use them. Server enviroment are highly vulnerable to many wasys to attack. We can't guarantee absent vulnerabilities, but we try to block base ways of attack. We use `eslint-plugin-security-node` rules: `detect-buffer-unsafe-allocation`, `detect-child-process`, `detect-insecure-randomness`, `detect-non-literal-require-calls`, `detect-dangerous-redirects`, `detect-option-rejectunauthorized-in-nodejs-httpsrequest`, `detect-runinthiscontext-method-in-nodes-vm`, `disable-ssl-across-node-server`, `non-literal-reg-expr`
 */

const semanticConfig = {
  "rules": {
    "node/no-unsupported-features/es-syntax": "error",
    "node/no-unsupported-features/es-builtins": "error",
    "node/no-unsupported-features/node-builtins": "error",
    "node/no-deprecated-api": "error",
    "node/no-unpublished-require": "error",
    "node/no-unpublished-import": "error",
    "node/no-unpublished-bin": "error",
    "node/no-extraneous-import": "error",
    "node/no-extraneous-require": "error",
    "node/no-missing-import": "error",
    "node/no-missing-require": "error",
    "node/exports-style": "error",
    "node/file-extension-in-import": "error",
    "node/global-require": "error",
    "node/no-exports-assign": "error",
    "node/no-mixed-requires": "error",
    "node/no-new-require": "error",
    "node/no-path-concat": "error",
    "node/no-process-env": "error",
    "node/no-process-exit": "error",
    "node/no-sync": "error",
    "security-node/detect-buffer-unsafe-allocation": "error",
    "security-node/detect-child-process": "error",
    "security-node/detect-insecure-randomness": "error",
    "security-node/detect-non-literal-require-calls": "error",
    "security-node/detect-dangerous-redirects": "error",
    "security-node/detect-option-rejectunauthorized-in-nodejs-httpsrequest": "error",
    "security-node/detect-runinthiscontext-method-in-nodes-vm": "error",
    "security-node/disable-ssl-across-node-server": "error",
    "security-node/non-literal-reg-expr": "error"
  }
}

module.exports = {
  "plugins": ["node", "security-node"], // TODO добавить `eslint-plugin-security`
  ...makeEslintrcConfig({}, semanticConfig)
}

